/* HYPE ▸ 30/10/2026 — Page DÉTAIL D'UNE SÉANCE DU CARNET (EcranCarnetDetail), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~109 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranCarnetDetail() {
  var h = React.createElement;
  var ctx = (typeof useApp === "function") ? useApp() : {};
  var tr = ctx.tr || function (o) { return (o && (o.fr || "")) || ""; };
  var setEcran = ctx.setEcran || function () { };
  var retourEcran = ctx.retourEcran, peutReculer = ctx.peutReculer;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (409) : 7e langue, l arabe */
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var OR = "#E8B84B", TQL = "#CFE3E8";

  var paq = null;
  try { paq = window.__carnet || null; } catch (e1) { paq = null; }
  /* 15/09 (179) : le cas « conseil » est rendu par son propre composant, et on sort AVANT
     d appeler le moindre hook - sinon l ordre des hooks changerait selon le cas, ce que React
     interdit. C est pour cela que VueConseilCarnet est un composant a part. */
  if (paq && paq.quoi === "conseil") return React.createElement(VueConseilCarnet, { conseil: paq.conseil || null });
  var nouvelle = !paq || paq.quoi === "nouvelle";
  var seance0 = (paq && paq.seance) || null;

  function aujISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  var stMode = React.useState(nouvelle ? "edition" : "lecture");
  var mode = stMode[0], setMode = stMode[1];
  var stD = React.useState((seance0 && seance0.date_seance) || aujISO()); var dateS = stD[0], setDateS = stD[1];
  var stC = React.useState((seance0 && seance0.cheval_id) || ""); var chevalId = stC[0], setChevalId = stC[1];
  var stDi = React.useState((seance0 && seance0.discipline) || ""); var disc = stDi[0], setDisc = stDi[1];
  var stNo = React.useState((seance0 && seance0.note) || ""); var note = stNo[0], setNote = stNo[1];
  /* 27/09 (407) : JOURNAL DE PROGRESSION, ETAPE 3 - quatre champs facultatifs, colonnes passees en base
     le 27/09 a 00 h 17 (theme, lieu, ressenti_cle, a_retenir). Ressenti = cle fixe, jamais un score :
     bonnes / mitigees / difficile (decision de Blandine). Aucun affichage en lecture a cette etape. */
  var stTh = React.useState((seance0 && seance0.theme) || ""); var theme = stTh[0], setTheme = stTh[1];
  var stLi = React.useState((seance0 && seance0.lieu) || ""); var lieu = stLi[0], setLieu = stLi[1];
  var stRs = React.useState((seance0 && seance0.ressenti_cle) || ""); var ressenti = stRs[0], setRessenti = stRs[1];
  var stAr = React.useState((seance0 && seance0.a_retenir) || ""); var aRetenir = stAr[0], setARetenir = stAr[1];
  /* 27/09 (423) : « A retenir » reste affiche une fois apparu. ETAT React (remplace le useRef du 419,
     qui etait modifie pendant le rendu). Visibilite JAMAIS stockee dans le brouillon : elle se deduit
     du contenu (ancienne seance ici, brouillon restaure ou saisie via l effet ci-dessous). */
  var stArV = React.useState(String((seance0 && seance0.a_retenir) || "").trim().length > 0); var aRetenirVisible = stArV[0], setARetenirVisible = stArV[1];
  React.useEffect(function () { if (String(aRetenir || "").trim()) setARetenirVisible(true); }, [aRetenir]);
  var stTph = React.useState(false); var toutPh = stTph[0], setToutPh = stTph[1];   /* 27/09 (422) : « +N » deplie la galerie des souvenirs */
  /* 27/09 (423) : SENS DES CHAMPS DE SAISIE. Vide : sens de l interface (placeholder arabe a droite) ;
     rempli : « auto », le navigateur suit le texte reellement tape (francais en LTR, arabe en RTL). */
  var hjDirChamp = function (valeur) {
    if (!String(valeur || "").trim()) return (ctx.langue === "ar") ? "rtl" : "ltr";
    return "auto";
  };
  /* 27/09 (408) : REFONTE DU FORMULAIRE (creation / modification) aux couleurs du journal - brief de
     Blandine du 27/09 : palette petrole / bronze / ivoire, selecteur de cheval en panneau avec recherche
     (regle 207 + « Cheval sans fiche »), disciplines en CLES FIXES, date qui ne deborde plus, barre
     d onglets cachee sur cet ecran, plus AUCUN nouvel envoi de photo (anciennes photos conservees). */
  /* 27/09 (439) : meme palette ravivee que la page du journal (431) - petrole plus vif, dore plus franc, textes plus lumineux. */
  var HJ = { fond: "#080A0B", carte: "#131819", pet: "#2E6A80", petA: "#37788F", reflet: "#7DB6C3", bronze: "#C29B5C", champ: "#D6B676", ivoire: "#F2EDE4", gris: "#BFC3C5" };
  function hjNorm(v) { try { return String(v || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); } catch (eN) { return String(v || "").toLowerCase().trim(); } }
  var HJ_DISC = ["plat", "dressage", "saut", "exterieur", "travail_a_pied", "autre"];
  var HJ_DISC_FR = { plat: "Plat", dressage: "Dressage", saut: "Saut", exterieur: "Extérieur", travail_a_pied: "Travail à pied", autre: "Autre" };
  function hjLibDisc(k) {
    if (k === "plat") return T("Plat", "Flatwork", "Plano", "Piano", "馬場", "Flacharbeit", "\u0627\u0644\u062a\u062f\u0631\u064a\u0628 \u0627\u0644\u0645\u0633\u0637\u062d", "平地", "Binnenwerk", "Plano", "Plan ridning", "Работа на плацу", "Ujeżdżenie na płaskim", "평지");
    if (k === "dressage") return T("Dressage", "Dressage", "Doma", "Dressage", "馬術", "Dressur", "\u0627\u0644\u062a\u0631\u0648\u064a\u0636", "盛装舞步", "Dressuur", "Adestramento", "Dressyr", "Выездка", "Ujeżdżenie", "마장마술");
    if (k === "saut") return T("Saut", "Jumping", "Salto", "Salto", "障害", "Springen", "\u0642\u0641\u0632 \u0627\u0644\u062d\u0648\u0627\u062c\u0632", "跳跃", "Springen", "Salto", "Hoppning", "Конкур", "Skoki", "장애물");
    if (k === "exterieur") return T("Extérieur", "Outdoor", "Exterior", "Esterno", "外乗", "Ausritt", "\u0646\u0632\u0647\u0629 \u062e\u0627\u0631\u062c\u064a\u0629", "户外", "Buiten", "Externo", "Utomhus", "Прогулка", "Teren", "야외");
    if (k === "travail_a_pied") return T("Travail à pied", "Groundwork", "Trabajo a pie", "Lavoro da terra", "地上作業", "Bodenarbeit", "\u0627\u0644\u0639\u0645\u0644 \u0645\u0646 \u0627\u0644\u0623\u0631\u0636", "地面训练", "Grondwerk", "Trabalho a pé", "Arbete från marken", "Работа с земли", "Praca z ziemi", "지상 훈련");
    if (k === "autre") return T("Autre", "Other", "Otro", "Altro", "その他", "Andere", "\u0623\u062e\u0631\u0649", "其他", "Anders", "Outro", "Annat", "Другое", "Inne", "기타");
    return "";
  }
  /* Reconnaissance TOLERANTE des anciennes valeurs (libelles des anciennes pastilles, dans les 6
     langues). « Dressur » est ambigu (l ancien bouton Plat ET Dressage l ecrivaient en allemand) :
     non reconnu, donc conserve tel quel. « Theorie » : non reconnu, conserve tel quel. */
  function hjReconnaitre(v) {
    var n = hjNorm(v); if (!n) return "";
    var M2 = {
      plat: ["plat", "flat", "flatwork", "plano", "piano", "馬場"],
      saut: ["saut", "obstacle", "jumping", "salto", "springen", "障害"],
      dressage: ["dressage", "doma", "馬術"],
      exterieur: ["exterieur", "outdoor", "exterior", "esterno", "ausritt", "外乗"],
      travail_a_pied: ["travail a pied", "groundwork", "trabajo a pie", "lavoro da terra", "bodenarbeit", "地上作業"],
      autre: ["autre"]
    };
    for (var k in M2) { if (M2[k].indexOf(n) >= 0) return k; }
    return "";
  }
  var hjCle0 = (seance0 && seance0.discipline_cle && HJ_DISC.indexOf(seance0.discipline_cle) >= 0) ? seance0.discipline_cle : hjReconnaitre(seance0 && seance0.discipline);
  var hjHist = (seance0 && seance0.discipline && !hjCle0) ? String(seance0.discipline) : "";
  var stDk = React.useState(hjCle0 || ""); var discCle = stDk[0], setDiscCle = stDk[1];
  var stDa = React.useState((hjCle0 === "autre" && seance0 && seance0.discipline && hjNorm(seance0.discipline) !== "autre") ? String(seance0.discipline) : ""); var discAutre = stDa[0], setDiscAutre = stDa[1];
  var stDt = React.useState(false); var discTouche = stDt[0], setDiscTouche = stDt[1];
  var stCl = React.useState((seance0 && !seance0.cheval_id && seance0.cheval_nom) ? String(seance0.cheval_nom) : ""); var chevalLibre = stCl[0], setChevalLibre = stCl[1];
  var stPc = React.useState(false); var panCheval = stPc[0], setPanCheval = stPc[1];
  var stRc = React.useState(""); var rechCh = stRc[0], setRechCh = stRc[1];
  var stSl = React.useState(false); var saisieLibre = stSl[0], setSaisieLibre = stSl[1];
  var stLt = React.useState(""); var libreTmp = stLt[0], setLibreTmp = stLt[1];
  var stEc = React.useState(null); var chvEc = stEc[0], setChvEc = stEc[1];
  /* La barre d onglets est cachee tant que cet ecran est ouvert (meme mecanique que le 402 :
     classe hb-sans-barre sur <body>, compteur partage window.__hbSansBarre). */
  React.useEffect(function () {
    try { window.__hbSansBarre = (window.__hbSansBarre || 0) + 1; document.body.classList.add("hb-sans-barre"); } catch (eSB) { }
    return function () {
      try {
        window.__hbSansBarre = Math.max(0, (window.__hbSansBarre || 1) - 1);
        if (!window.__hbSansBarre) document.body.classList.remove("hb-sans-barre");
      } catch (eSB2) { }
    };
  }, []);
  /* Panneau des chevaux ouvert : le fond est verrouille (body fixed + decalage restitue). */
  React.useEffect(function () {
    if (!panCheval) return;
    var y = 0;
    try { y = window.scrollY || 0; document.body.style.position = "fixed"; document.body.style.top = (-y) + "px"; document.body.style.left = "0"; document.body.style.right = "0"; } catch (eLk) { }
    return function () {
      try { document.body.style.position = ""; document.body.style.top = ""; document.body.style.left = ""; document.body.style.right = ""; window.scrollTo(0, y); } catch (eLk2) { }
    };
  }, [panCheval]);
  var stCh = React.useState([]); var chevaux = stCh[0], setChevaux = stCh[1];
  var stEnv = React.useState(false); var envoi = stEnv[0], setEnvoi = stEnv[1];
  var stEr = React.useState(""); var err = stEr[0], setErr = stEr[1];
  var stSe = React.useState(seance0); var seance = stSe[0], setSeance = stSe[1];
  /* 27/09 (423) : la galerie se replie quand une autre seance est ouverte dans la meme instance.
     Pose APRES l etat `seance` (declare ici) : plus haut, `seance` vaudrait encore undefined. */
  var cleSeanceHJ = (seance && seance.id) ? String(seance.id) : "nouvelle";
  React.useEffect(function () { setToutPh(false); }, [cleSeanceHJ]);
  /* 16/09 (180) - LES CONSEILS TRAVAILLES D UNE SEANCE (etape H7). C est le lien N-N de la
     table carnet_seance_conseils, le coeur du chantier : un conseil peut etre relie a plusieurs
     seances SANS jamais etre duplique.
     Les choix sont tenus en memoire pendant la saisie, puis ecrits a l enregistrement - on ne
     touche pas la base a chaque coche. */
  /* 16/09 (186) - LES PHOTOS D UNE SEANCE. Derniere brique du carnet.
     ⚠️ PIPELINE EXISTANT, AUCUN SYSTEME PARALLELE - la consigne ecrite de Blandine : le choix
     passe par hypePhotoDirecte (meme compression, meme absence de recadrage que partout) et
     l envoi par envoyerPhoto, la porte qui porte deja les quotas, le stockage et les gardes de
     session et d upload (8 s et 2 min, posees le 27/08 apres un envoi fige sans message).
     ⚠️ PHOTOS SEULEMENT, ET C EST UN CHOIX EXPLIQUE : envoyerPhoto est RESERVEE aux photos -
     son propre commentaire dit qu une video ne doit JAMAIS l atteindre, les trois chemins video
     de l app (album, commentaires, souvenirs) routant vers Mux AVANT. Ajouter la video ici
     demanderait de tracer ce routage Mux proprement ; je ne l improvise pas. Le bouton video
     n est donc PAS pose - on ne promet pas ce qui n est pas branche.
     ⚠️ LES URL VONT DANS `carnet_seances.medias` (jsonb), comme albums_cheval.photos et
     commentaires.medias : un media EST son URL dans Hype, il n est jamais duplique. */
  var stMd = React.useState([]); var medias = stMd[0], setMedias = stMd[1];
  var stNv = React.useState([]); var nouvelles = stNv[0], setNouvelles = stNv[1];
  var refFicM = React.useRef(null);
  /* 27/09 (434) : adresses temporaires des photos du coffre prive (une seule demande pour toutes). */
  var stUc = React.useState({}); var urlsHJ = stUc[0], setUrlsHJ = stUc[1];
  var clesCarnetHJ = JSON.stringify([].concat(Array.isArray(medias) ? medias : [], (seance && Array.isArray(seance.medias)) ? seance.medias : []).filter(hjEstCarnet));
  React.useEffect(function () {
    var refs = []; try { refs = JSON.parse(clesCarnetHJ); } catch (eJ) { refs = []; }
    if (!refs.length) return;
    var vif = true;
    hypeCarnetSigner(refs).then(function (mp) { if (vif) setUrlsHJ(function (o) { return Object.assign({}, o, mp); }); });
    return function () { vif = false; };
  }, [clesCarnetHJ]);
  var stEnvM = React.useState(false); var envoiM = stEnvM[0], setEnvoiM = stEnvM[1];
  React.useEffect(function () {
    try { setMedias(Array.isArray(seance0 && seance0.medias) ? seance0.medias : []); } catch (eM0) { setMedias([]); }
  }, []);
  function choisirPhotosCarnet(e) {
    var fs = e.target.files ? Array.prototype.slice.call(e.target.files) : [];
    e.target.value = "";
    if (!fs.length) return;
    var reste = 8 - (medias.length + nouvelles.length);
    if (reste <= 0) { setErr(T("8 photos au maximum par s\u00e9ance.", "8 photos per session at most.", "M\u00e1ximo 8 fotos.", "Massimo 8 foto.", "\u6700\u59278\u679a\u3067\u3059\u3002", "H\u00f6chstens 8 Fotos.", "8 \u0635\u0648\u0631 \u0643\u062d\u062f \u0623\u0642\u0635\u0649 \u0644\u0643\u0644 \u062d\u0635\u0629.", "每次训练课最多 8 张照片。", "Maximaal 8 foto's per training.", "No máximo 8 fotos por sessão.", "Högst 8 foton per ridpass.", "Не больше 8 фото на тренировку.", "Maksymalnie 8 zdjęć na trening.", "훈련당 사진은 최대 8장이에요.")); return; }
    if (fs.length > reste) setErr(T("Seules les " + reste + " premi\u00e8res ont \u00e9t\u00e9 ajout\u00e9es \u2014 8 au maximum.", "Only the first " + reste + " were added \u2014 8 max.", "Solo las " + reste + " primeras \u2014 m\u00e1ximo 8.", "Solo le prime " + reste + " \u2014 massimo 8.", "\u6700\u521d\u306e" + reste + "\u679a\u306e\u307f\u3002", "Nur die ersten " + reste + " \u2014 max. 8.", "\u0623\u0636\u064a\u0641\u062a \u0623\u0648\u0644 " + reste + " \u0635\u0648\u0631 \u0641\u0642\u0637 \u2014 8 \u0643\u062d\u062f \u0623\u0642\u0635\u0649.", "只添加了前 " + reste + " 张——最多 8 张。", "Alleen de eerste " + reste + " zijn toegevoegd — maximaal 8.", "Só os primeiros " + reste + " foram adicionados — máximo de 8.", ("Bara de " + reste + " första lades till — högst 8."), ("Добавлены только первые " + reste + " — максимум 8."), ("Dodano tylko pierwsze " + reste + " — maksymalnie 8."), ("처음 " + reste + "장만 추가했어요 — 최대 8장이에요.")));
    fs = fs.slice(0, reste);
    (function suite(iF) {
      if (iF >= fs.length) return;
      var f = fs[iF];
      if (!f) { suite(iF + 1); return; }
      if (typeof hypePhotoDirecte === "function") {
        hypePhotoDirecte(f).then(function (res) {
          if (res) setNouvelles(function (l) { return (l || []).concat([res]); });
          suite(iF + 1);
        });
      } else { setNouvelles(function (l) { return (l || []).concat([{ fichier: f, dataUrl: URL.createObjectURL(f) }]); }); suite(iF + 1); }
    })(0);
  }
  /* L envoi, une fois la seance enregistree : en parallele, ordre conserve, chaque photo
     independante - le motif du build 166. Un echec ne perd pas la seance, elle est deja en
     base, et il se DIT. */
  async function envoyerPhotosCarnet() {
    if (!nouvelles.length) return medias;
    setEnvoiM(true);
    var urls = [];
    try {
      urls = (await Promise.all(nouvelles.map(function (m) {
        return (async function () {
          try { var r = await hypeCarnetEnvoyerPhoto(m.fichier); return (r && r.ref) ? r.ref : null; } catch (eEp) { return null; }   /* 27/09 (434) : coffre prive « carnet », plus jamais le dossier public */
        })();
      }))).filter(function (u) { return !!u; });
    } catch (eAll) { }
    setEnvoiM(false);
    if (urls.length < nouvelles.length) setErr(T("Certaines photos n\u2019ont pas pu \u00eatre envoy\u00e9es \u2014 la s\u00e9ance est bien enregistr\u00e9e.", "Some photos could not be uploaded \u2014 the session is saved.", "Algunas fotos no se enviaron \u2014 la sesi\u00f3n est\u00e1 guardada.", "Alcune foto non sono state inviate \u2014 la sessione \u00e8 salvata.", "\u4e00\u90e8\u306e\u5199\u771f\u3092\u9001\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Einige Fotos konnten nicht gesendet werden.", "\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0628\u0639\u0636 \u0627\u0644\u0635\u0648\u0631 \u2014 \u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u062d\u0635\u0629.", "有些照片没能发送——训练课已正常保存。\n", "Sommige foto's konden niet worden verstuurd — de training is wel opgeslagen.", "Algumas fotos não puderam ser enviadas — a sessão foi salva normalmente.", "Vissa foton kunde inte skickas — ridpasset är sparat.", "Некоторые фото не удалось отправить — тренировка сохранена.", "Nie udało się wysłać niektórych zdjęć — trening został zapisany.", "일부 사진을 보내지 못했어요. 훈련은 잘 저장됐어요."));
    return medias.concat(urls);
  }
  /* 27/09 (436) : UNE VIDEO DANS UNE SEANCE DEJA ENREGISTREE. Meme chemin Mux que les commentaires :
     reservation (quota serveur, cible « carnet:<uid> ») -> trace videos_mux enrichie (destination
     « seance ») -> envoi du fichier -> attente Mux -> ajout ATOMIQUE a carnet_seances.medias par la
     fonction SQL carnet_seance_ajouter_media (passee par Blandine le 27/09 a 20 h 47) -> trace ready.
     Jamais de reecriture du tableau entier pour une video. L etat local est mis a jour ensuite, pour
     qu un « Enregistrer » ulterieur garde la video. L envoi continue si on change de page (pas si
     l appli est fermee : rattrapage prevu plus tard). */
  var stVidHJ = React.useState(null); var vidHJ = stVidHJ[0], setVidHJ = stVidHJ[1];   /* null | { etape: "envoi" | "prepa", pct } */
  var refFicV = React.useRef(null);
  var refVifHJ = React.useRef(true);
  React.useEffect(function () { refVifHJ.current = true; return function () { refVifHJ.current = false; }; }, []);
  /* 28/09 (490) — LA VIDEO AVANT MEME D ENREGISTRER. Blandine (enregistrement d ecran) : « ca nous oblige a
     enregistrer et revenir ». Sur une seance NOUVELLE, la video choisie est gardee de cote (vidAttente) et
     part toute seule juste apres « Enregistrer », des que la seance a son identifiant. */
  var stVA = React.useState(null); var vidAttente = stVA[0], setVidAttente = stVA[1];   /* null | { f, nom } */
  async function ajouterVideoCarnet(e) {
    var f = (e && e.target && e.target.files && e.target.files[0]) || null;
    try { e.target.value = ""; } catch (eV0) { }
    if (!f || vidHJ) return;
    var idSe = (seance && seance.id) ? String(seance.id) : "";
    if (!idSe) { setErr(""); setVidAttente({ f: f, nom: String(f.name || "") }); return; }
    return envoyerVideoCarnetFichier(f, idSe);
  }
  async function envoyerVideoCarnetFichier(f, idSe) {
    if (!f || !idSe) return;
    var vif = function () { return refVifHJ.current; };
    var dire = function (txt) { if (vif()) setErr(txt); };
    setErr("");
    if (medias.length + nouvelles.length >= 8) { dire(T("8 photos ou vidéos au maximum par séance.", "8 photos or videos per session at most.", "Máximo 8 fotos o vídeos por sesión.", "Massimo 8 foto o video per sessione.", "1回のセッションにつき写真・動画は最大8件です。", "Höchstens 8 Fotos oder Videos pro Einheit.", "8 صور أو فيديوهات كحد أقصى لكل حصة.", "每次训练最多 8 张照片或视频。", "Maximaal 8 foto's of video's per training.", "No máximo 8 fotos ou vídeos por sessão.", "Högst 8 foton eller videor per ridpass.", "Не больше 8 фото или видео на тренировку.", "Maksymalnie 8 zdjęć lub filmów na trening.", "훈련당 사진이나 영상은 최대 8개예요.")); return; }
    var dV = 0;
    try { if (typeof dureeVideoFichier === "function") dV = await dureeVideoFichier(f); } catch (eDu) { }
    var maxS = (typeof HYPE_MUX_DUREE_MAX_S === "number") ? HYPE_MUX_DUREE_MAX_S : 180;
    if (dV > maxS + 1) { dire(T("Vidéo trop longue : 3 minutes au maximum.", "Video too long: 3 minutes at most.", "Vídeo demasiado largo: 3 minutos como máximo.", "Video troppo lungo: massimo 3 minuti.", "動画が長すぎます（最大3分）。", "Video zu lang: höchstens 3 Minuten.", "الفيديو طويل جدًا: 3 دقائق كحد أقصى.", "视频太长：最长 3 分钟。", "Video te lang: maximaal 3 minuten.", "Vídeo longo demais: no máximo 3 minutos.", "Videon är för lång: högst 3 minuter.", "Видео слишком длинное: не больше 3 минут.", "Film jest za długi: maksymalnie 3 minuty.", "영상이 너무 길어요. 최대 3분이에요.")); return; }
    setVidHJ({ etape: "envoi", pct: 0 });
    var echec = T("La vidéo n’a pas pu être envoyée. Réessaie dans un moment.", "The video could not be uploaded. Try again in a moment.", "No se pudo enviar el vídeo. Inténtalo de nuevo en un momento.", "Impossibile inviare il video. Riprova tra poco.", "動画を送信できませんでした。しばらくしてからもう一度お試しください。", "Das Video konnte nicht gesendet werden. Versuch es gleich noch einmal.", "تعذر إرسال الفيديو. حاولي مرة أخرى بعد قليل.", "视频发送失败，请稍后再试。", "De video kon niet worden verstuurd. Probeer het over een poosje opnieuw.", "Não foi possível enviar o vídeo. Tente de novo daqui a pouco.", "Videon kunde inte skickas. Försök igen om en stund.", "Не удалось отправить видео. Попробуй ещё раз чуть позже.", "Nie udało się wysłać filmu. Spróbuj ponownie za chwilę.", "영상을 보내지 못했어요. 잠시 후 다시 시도해 주세요.");
    var upId = "";
    try {
      var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
      if (!u || !u.id) { dire(T("Tu n’es plus connectée.", "You are no longer signed in.", "Ya no estás conectada.", "Non sei più connessa.", "ログインが切れています。", "Du bist nicht mehr angemeldet.", "لم تعودي متصلة.", "你已退出登录。", "Je bent niet meer ingelogd.", "Você não está mais conectada.", "Du är inte längre inloggad.", "Сессия завершена: войди в аккаунт снова.", "Sesja wygasła — zaloguj się ponownie.", "로그인이 해제됐어요.")); return; }
      var rCr = await hypeMuxAppel({ cible: "carnet:" + u.id }, 25);
      if (!rCr || rCr.error || !rCr.data || !rCr.data.url || !rCr.data.upload_id) {
        var msgR = String((rCr && rCr.error) || "");
        try { console.warn("[carnet] video refusee :", msgR); } catch (eC) { }
        dire(/quota|limit|plafond|place|429/i.test(msgR)
          ? T("Tu as atteint ton nombre maximum de vidéos. Supprime une vidéo pour en ajouter une autre.", "You have reached your maximum number of videos. Delete one to add another.", "Has alcanzado tu número máximo de vídeos. Borra uno para añadir otro.", "Hai raggiunto il numero massimo di video. Eliminane uno per aggiungerne un altro.", "動画の上限に達しました。追加するには1本削除してください。", "Du hast die maximale Anzahl an Videos erreicht. Lösche eins, um ein neues hinzuzufügen.", "وصلتِ إلى الحد الأقصى من الفيديوهات. احذفي فيديو لإضافة آخر.", "你的视频数量已达上限。请先删除一个视频，再添加新的。", "Je hebt je maximale aantal video's bereikt. Verwijder een video om een andere toe te voegen.", "Você atingiu o número máximo de vídeos. Exclua um vídeo para adicionar outro.", "Du har nått ditt maxantal videor. Ta bort en video för att lägga till en ny.", "Ты достигла максимального числа видео. Удали одно видео, чтобы добавить другое.", "Osiągnięto maksymalną liczbę filmów. Usuń jeden film, aby dodać kolejny.", "영상을 최대 개수까지 올렸어요. 하나를 지우고 다른 영상을 추가해 주세요.")
          : echec);
        return;
      }
      upId = String(rCr.data.upload_id);
      var rTr = await hypeVideoTraceMaj(upId, { destination_type: "seance", destination_id: idSe, nom: f.name || null, duree: (dV > 0 ? Math.round(dV * 10) / 10 : null) }, null);
      if (!rTr || rTr.error) { try { console.warn("[carnet] trace video :", rTr && rTr.error); } catch (eC2) { } dire(echec); return; }
      var rUp = await hypeMuxEnvoyerFichier(rCr.data.url, f, function (pc) { if (vif()) setVidHJ({ etape: "envoi", pct: pc }); });
      if (rUp && rUp.error) {
        try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: "envoi : " + rUp.error }, "pasReady"); } catch (eT1) { }
        dire(echec); return;
      }
      try { await hypeVideoTraceMaj(upId, { statut: "processing" }, "pasReady"); } catch (eT2) { }
      if (vif()) setVidHJ({ etape: "prepa", pct: 100 });
      var rSt = null;
      for (var tour = 0; tour < 3; tour++) {   /* jusqu a ~6 min tant que l appli reste ouverte */
        rSt = await hypeMuxAttendrePret(upId);
        if (!rSt || !rSt.pasEncore) break;
      }
      if (rSt && rSt.playback_id) {
        var urlV = "https://stream.mux.com/" + String(rSt.playback_id) + ".m3u8";
        var rA = await supa.rpc("carnet_seance_ajouter_media", { p_seance: idSe, p_url: urlV });
        if (rA && rA.error) {
          try { await hypeVideoTraceMaj(upId, { erreur: "seance : " + ((rA.error && rA.error.message) || rA.error) }, "pasReady"); } catch (eT3) { }
          dire(echec); return;
        }
        try { await hypeVideoTraceMaj(upId, { statut: "ready", playback_id: String(rSt.playback_id), duree: (typeof rSt.duree === "number" && isFinite(rSt.duree)) ? Math.round(rSt.duree * 10) / 10 : null, erreur: null }, "pasReady"); } catch (eT4) { }
        if (vif()) {
          setMedias(function (l) { l = Array.isArray(l) ? l : []; return l.indexOf(urlV) >= 0 ? l : l.concat([urlV]); });
          setSeance(function (s) {
            if (!s || String(s.id) !== idSe) return s;
            var lm = Array.isArray(s.medias) ? s.medias : [];
            return lm.indexOf(urlV) >= 0 ? s : Object.assign({}, s, { medias: lm.concat([urlV]) });
          });
        }
        return;
      }
      if (rSt && rSt.errored) {
        try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: String(rSt.error || "Mux : errored") }, "pasReady"); } catch (eT5) { }
        dire(T("Cette vidéo n’a pas pu être préparée. Essaie avec une autre.", "This video could not be prepared. Try another one.", "No se pudo preparar este vídeo. Prueba con otro.", "Non è stato possibile preparare questo video. Provane un altro.", "この動画を準備できませんでした。別の動画でお試しください。", "Dieses Video konnte nicht vorbereitet werden. Versuch ein anderes.", "تعذر تجهيز هذا الفيديو. جربي فيديو آخر.", "这个视频无法处理，换一个试试吧。", "Deze video kon niet worden voorbereid. Probeer een andere.", "Não foi possível preparar este vídeo. Tente com outro.", "Videon kunde inte förberedas. Prova med en annan.", "Не удалось подготовить это видео. Попробуй другое.", "Nie udało się przygotować tego filmu. Spróbuj z innym.", "이 영상을 준비하지 못했어요. 다른 영상으로 시도해 주세요."));
        return;
      }
      dire(T("La vidéo est encore en préparation. Elle n’a pas encore pu être ajoutée à la séance.", "The video is still being prepared. It could not be added to the session yet.", "El vídeo aún se está preparando. Todavía no se ha podido añadir a la sesión.", "Il video è ancora in preparazione. Non è ancora stato aggiunto alla sessione.", "動画はまだ準備中です。まだセッションに追加できていません。", "Das Video wird noch vorbereitet. Es konnte der Einheit noch nicht hinzugefügt werden.", "الفيديو لا يزال قيد التجهيز. لم تتم إضافته إلى الحصة بعد.", "视频还在处理中，暂时无法添加到这次训练。", "De video wordt nog voorbereid. Hij kon nog niet aan de training worden toegevoegd.", "O vídeo ainda está sendo preparado. Ainda não foi possível adicioná-lo à sessão.", "Videon förbereds fortfarande. Den kunde inte läggas till i ridpasset ännu.", "Видео ещё готовится. Пока его не получилось добавить к тренировке.", "Film jest jeszcze w przygotowaniu. Nie udało się go jeszcze dodać do treningu.", "영상을 아직 준비 중이에요. 아직 훈련에 추가할 수 없어요."));
    } catch (eG) {
      try { console.warn("[carnet] video :", (eG && eG.message) || eG); } catch (eC3) { }
      if (upId) { try { await hypeVideoTraceMaj(upId, { erreur: "client : " + String((eG && eG.message) || eG) }, "pasReady"); } catch (eT6) { } }
      dire(echec);
    } finally {
      if (vif()) setVidHJ(null);
    }
  }
  /* L encart pendant l envoi : meme habit que le fil (432) - bandeau en couleur + Titi. */
  var encartVidHJ = function () {
    if (!vidHJ) return null;
    var prepa = vidHJ.etape === "prepa";
    return h("div", { key: "encv", style: { marginBottom: 12, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(127,163,173,0.30)", background: "linear-gradient(165deg, rgba(16,40,52,0.85), rgba(8,12,16,0.95))" } },
      h("div", { style: { padding: "10px 14px", background: "rgba(127,163,173,0.14)", borderBottom: "1px solid rgba(127,163,173,0.22)", textAlign: "center", fontFamily: "'Montserrat',sans-serif", fontSize: 13.5, fontWeight: 700, color: "#7FE7F2", lineHeight: 1.35 } },
        prepa
          ? T("Préparation de la vidéo…", "Preparing the video…", "Preparando el vídeo…", "Preparazione del video…", "動画を準備中…", "Video wird vorbereitet…", "جارٍ تجهيز الفيديو…", "正在处理视频…", "Video voorbereiden…", "Preparando o vídeo…", "Förbereder videon…", "Подготовка видео…", "Przygotowywanie filmu…", "영상 준비 중…")
          : (T("Téléchargement en cours, merci de patienter", "Uploading, please wait", "Subiendo, espera un momento", "Caricamento in corso, attendi", "アップロード中です。しばらくお待ちください", "Wird hochgeladen, bitte warten", "جارٍ التحميل، يرجى الانتظار", "正在上传，请稍等", "Bezig met uploaden, even geduld", "Enviando, aguarde um instante", "Laddar upp, vänta ett ögonblick", "Идёт загрузка, подожди немного", "Trwa wysyłanie, poczekaj chwilę", "업로드 중이에요. 잠시만 기다려 주세요") + ((vidHJ.pct > 0) ? " · " + vidHJ.pct + " %" : ""))),
      h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", padding: 14 } },
        h("video", { src: "images/titi-envoi-video.mp4", autoPlay: true, muted: true, playsInline: true, preload: "auto",
          onError: function (eTi) { try { eTi.target.style.display = "none"; } catch (eTi2) { } },
          style: { width: 132, height: 176, objectFit: "cover", borderRadius: 14, display: "block", boxShadow: "0 8px 22px rgba(0,0,0,0.45)" } }),
        h("div", { style: { marginTop: 10, textAlign: "center", fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.5, color: "#B9C4C9" } },
          prepa
            ? T("Elle va apparaître ici d’elle-même d’ici une minute ou deux.", "It will appear here on its own within a minute or two.", "Aparecerá aquí sola en uno o dos minutos.", "Apparirà qui da solo entro un minuto o due.", "1〜2分ほどで自動的にここに表示されます。", "Es erscheint hier von selbst in ein bis zwei Minuten.", "سيظهر هنا تلقائيًا خلال دقيقة أو دقيقتين.", "一两分钟后它会自动出现在这里。", "Hij verschijnt hier vanzelf binnen een minuut of twee.", "Ela vai aparecer aqui sozinha em um ou dois minutos.", "Den dyker upp här av sig själv inom en minut eller två.", "Оно появится здесь само через минуту-две.", "Pojawi się tutaj sam za minutę lub dwie.", "1~2분 안에 여기에 저절로 나타나요.")
            : T("Garde Hype ouverte jusqu’à la fin (tu peux changer de page, mais ne quitte pas l’appli).", "Keep Hype open until it’s done (you can switch pages, but don’t leave the app).", "Mantén Hype abierta hasta el final (puedes cambiar de página, pero no salgas de la app).", "Tieni Hype aperta fino alla fine (puoi cambiare pagina, ma non uscire dall’app).", "完了までHypeを開いたままにしてください（ページ移動はOK、アプリは閉じないでください）。", "Lass Hype bis zum Ende geöffnet (Seitenwechsel ist ok, aber verlass die App nicht).", "أبقي Hype مفتوحًا حتى النهاية (يمكنك تغيير الصفحة، لكن لا تغلقي التطبيق).", "请保持 Hype 开启直到完成（你可以切换页面，但不要退出应用）。", "Houd Hype open tot het klaar is (je kunt van pagina wisselen, maar sluit de app niet af).", "Mantenha o Hype aberto até o fim (você pode trocar de página, mas não saia do app).", "Låt Hype vara öppen tills det är klart (du kan byta sida, men lämna inte appen).", "Не закрывай Hype, пока всё не закончится (можно переходить между страницами, но не выходи из приложения).", "Zostaw Hype otwartą do końca (możesz zmieniać strony, ale nie wychodź z aplikacji).", "끝날 때까지 Hype를 켜 두세요. 다른 페이지로 이동해도 되지만 앱을 나가지는 마세요."))));
  };
  var stCo = React.useState([]); var conseils = stCo[0], setConseils = stCo[1];
  var stPan2 = React.useState(false); var panChoix = stPan2[0], setPanChoix = stPan2[1];
  var dejaChoisis = {};
  try { conseils.forEach(function (c) { dejaChoisis[String(c.id)] = 1; }); } catch (eDj) { }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!seance || !seance.id || typeof supa === "undefined" || !supa) return;
        var rl = await supa.from("carnet_seance_conseils").select("epingle_id").eq("seance_id", seance.id).limit(60);
        if (!vif || !rl || rl.error) return;
        var ids = ((rl && rl.data) || []).map(function (x) { return x.epingle_id; }).filter(function (v) { return v != null; });
        if (!ids.length) { setConseils([]); return; }
        var rp = await supa.from("echanges_heybaby_epingles").select("id, reponse, cheval_nom").in("id", ids);
        var re = await supa.from("carnet_conseils_etat").select("epingle_id, titre_court").in("epingle_id", ids);
        var parT = {};
        ((re && re.data) || []).forEach(function (x) { parT[String(x.epingle_id)] = x; });
        if (!vif) return;
        setConseils(((rp && rp.data) || []).map(function (ep) {
          return { id: ep.id, titre: (typeof hypeTitreConseil === "function") ? hypeTitreConseil(ep, parT[String(ep.id)] || null) : "", cheval: ep.cheval_nom || "" };
        }));
      } catch (eL) { }
    })();
    return function () { vif = false; };
  }, [seance && seance.id]);

  /* L ecriture des liens : on ajoute ce qui manque, on retire ce qui a ete decoche. Chaque
     ligne est independante, et un echec sur l une n emporte pas les autres - la seance, elle,
     est deja enregistree a ce stade. */
  async function ecrireLiens(idSeance, uid) {
    try {
      var rl = await supa.from("carnet_seance_conseils").select("id, epingle_id").eq("seance_id", idSeance).limit(60);
      var avant = {};
      ((rl && rl.data) || []).forEach(function (x) { avant[String(x.epingle_id)] = x.id; });
      var vises = {};
      conseils.forEach(function (c) { vises[String(c.id)] = 1; });
      var aAjouter = conseils.filter(function (c) { return !avant[String(c.id)]; });
      var aRetirer = Object.keys(avant).filter(function (k) { return !vises[k]; });
      if (aAjouter.length) {
        await supa.from("carnet_seance_conseils").insert(aAjouter.map(function (c) {
          return { user_id: uid, seance_id: idSeance, epingle_id: c.id };
        }));
      }
      for (var i = 0; i < aRetirer.length; i++) {
        try { await supa.from("carnet_seance_conseils").delete().eq("id", avant[aRetirer[i]]); } catch (eD) { }
      }
    } catch (eEl) { }
  }

  /* La note en cours, gardee sur l appareil (seulement pour une nouvelle seance). */
  /* 27/09 (408) : BROUILLON v2. L ancien brouillon ne gardait que la note (texte brut) ; il garde
     desormais tout le formulaire en JSON { v: 2, ... }. Un ancien brouillon (texte) est relu comme
     une note - repli defensif, rien ne plante. Seulement pour une NOUVELLE seance jamais enregistree. */
  var CLE = "hype_brouillon_carnet";
  var stBr = React.useState(false); var brPret = stBr[0], setBrPret = stBr[1];
  React.useEffect(function () {
    if (!nouvelle) { setBrPret(true); return; }
    try {
      var d = localStorage.getItem(CLE);
      if (d) {
        var o = null;
        try { o = JSON.parse(d); } catch (eJ) { o = null; }
        if (o && typeof o === "object" && o.v === 2) {
          if (o.date) setDateS(String(o.date));
          if (o.chevalId) setChevalId(String(o.chevalId));
          if (o.chevalLibre) setChevalLibre(String(o.chevalLibre));
          if (o.discCle && HJ_DISC.indexOf(o.discCle) >= 0) { setDiscCle(String(o.discCle)); setDiscTouche(true); }
          if (o.discAutre) setDiscAutre(String(o.discAutre));
          if (o.theme) setTheme(String(o.theme));
          if (o.lieu) setLieu(String(o.lieu));
          if (o.ressenti) setRessenti(String(o.ressenti));
          if (o.aRetenir) setARetenir(String(o.aRetenir));
          if (o.note) setNote(String(o.note));
          if (Array.isArray(o.conseils)) setConseils(o.conseils.filter(function (c) { return c && c.id != null; }).map(function (c) { return { id: c.id, titre: String(c.titre || ""), cheval: String(c.cheval || "") }; }));
        } else if (!(o && typeof o === "object") && String(d).trim()) {
          setNote(String(d));
        }
      }
    } catch (eB) { }
    setBrPret(true);
  }, []);
  React.useEffect(function () {
    if (!nouvelle || !brPret || mode !== "edition" || (seance && seance.id)) return;
    try {
      var vide = !(chevalId || chevalLibre || discCle || discAutre || theme || lieu || ressenti || aRetenir || (note && note.trim()) || conseils.length);
      if (vide) { localStorage.removeItem(CLE); return; }
      localStorage.setItem(CLE, JSON.stringify({ v: 2, date: dateS, chevalId: chevalId || "", chevalLibre: chevalLibre || "", discCle: discTouche ? discCle : "", discAutre: discAutre || "", theme: theme || "", lieu: lieu || "", ressenti: ressenti || "", aRetenir: aRetenir || "", note: note || "", conseils: conseils.map(function (c) { return { id: c.id, titre: c.titre || "", cheval: c.cheval || "" }; }) }));
    } catch (eB2) { }
  }, [brPret, mode, dateS, chevalId, chevalLibre, discCle, discAutre, discTouche, theme, lieu, ressenti, aRetenir, note, conseils]);
  function ecrireNote(v) { setNote(v); }
  /* Les chevaux des ecuries (regle 207 - meme requete que les conseils Hey Baby), charges une fois,
     en EDITION seulement. Les siens et les lies restent charges plus bas, comme avant. */
  React.useEffect(function () {
    if (mode !== "edition" || chvEc !== null) return;
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (vif) setChvEc([]); return; }
        var pf = ctx.profil || {};
        var clubs = [];
        var c1 = String(pf.club || pf.ecurie || "").trim();
        var c2 = String(pf.club2 || pf.ecurie2 || "").trim();
        if (c1) clubs.push(c1);
        if (c2 && c2.toLowerCase() !== c1.toLowerCase()) clubs.push(c2);
        if (!clubs.length || typeof hypeCavaliersDuClub !== "function") { if (vif) setChvEc([]); return; }
        var vusP = {}, ids = [];
        for (var i = 0; i < clubs.length; i++) {
          var l = await hypeCavaliersDuClub(clubs[i], "id, pseudo, ecurie, ecurie2");
          ((l) || []).forEach(function (pr) { if (!pr || !pr.id || vusP[pr.id]) return; vusP[pr.id] = true; ids.push(pr.id); });
        }
        if (!ids.length) { if (vif) setChvEc([]); return; }
        var rc = await supa.from("chevaux").select("id, nom, photo_url").in("user_id", ids)   /* 27/09 (420) : + photo_url (meme requete) */
       .is("supprime_le", null).limit(500);
        if (!vif) return;
        if (rc && rc.error) { setChvEc([]); return; }
        var l2 = ((rc && rc.data) || []).filter(function (cv) { return cv && cv.id && cv.nom; }).map(function (cv) { return { id: cv.id, nom: cv.nom, photo_url: cv.photo_url || "" }; });
        l2.sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
        setChvEc(l2);
      } catch (eE) { if (vif) setChvEc([]); }
    })();
    return function () { vif = false; };
  }, [mode]);
  function hjChevalParId(id) {
    if (!id) return null;
    var tous = (chevaux || []).concat(chvEc || []);
    for (var i = 0; i < tous.length; i++) { if (String(tous[i].id) === String(id)) return tous[i]; }
    return null;
  }


  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        var a = (typeof mesChevaux === "function") ? await mesChevaux() : { data: [] };
        var b = (typeof mesChevauxLies === "function") ? await mesChevauxLies() : { data: [] };
        if (!vif) return;
        var tous = (((a && a.data) || [])).concat(((b && b.data) || []));
        var vus = {}, propres = [];
        tous.forEach(function (c) { if (c && c.id && !vus[c.id]) { vus[c.id] = 1; propres.push(c); } });
        propres.sort(function (x, y) { return String(x.nom || "").localeCompare(String(y.nom || ""), "fr"); });
        setChevaux(propres);
      } catch (eC) { if (vif) setChevaux([]); }
    })();
    return function () { vif = false; };
  }, []);

  function retour() { if (peutReculer && retourEcran) { retourEcran(); } else { setEcran("carnet"); } }

  var MOIS = [T("janvier", "January", "enero", "gennaio", "1\u6708", "Januar", "\u064a\u0646\u0627\u064a\u0631", "一月", "januari", "janeiro", "januari", "январь", "styczeń", "1월"), T("f\u00e9vrier", "February", "febrero", "febbraio", "2\u6708", "Februar", "\u0641\u0628\u0631\u0627\u064a\u0631", "二月", "februari", "fevereiro", "februari", "февраль", "luty", "2월"), T("mars", "March", "marzo", "marzo", "3\u6708", "M\u00e4rz", "\u0645\u0627\u0631\u0633", "3月", "mrt", "mar", "mars", "мар", "mar", "3월"), T("avril", "April", "abril", "aprile", "4\u6708", "April", "\u0623\u0628\u0631\u064a\u0644", "四月", "april", "abril", "april", "апрель", "kwiecień", "4월"), T("mai", "May", "mayo", "maggio", "5\u6708", "Mai", "\u0645\u0627\u064a\u0648", "5月", "mei", "mai", "maj", "мая", "maj", "5월"), T("juin", "June", "junio", "giugno", "6\u6708", "Juni", "\u064a\u0648\u0646\u064a\u0648", "6月", "jun", "jun", "juni", "июн", "cze", "6월"), T("juillet", "July", "julio", "luglio", "7\u6708", "Juli", "\u064a\u0648\u0644\u064a\u0648", "七月", "juli", "julho", "juli", "июль", "lipiec", "7월"), T("ao\u00fbt", "August", "agosto", "agosto", "8\u6708", "August", "\u0623\u063a\u0633\u0637\u0633", "8月", "aug", "ago", "aug", "авг", "sie", "8월"), T("septembre", "September", "septiembre", "settembre", "9\u6708", "September", "\u0633\u0628\u062a\u0645\u0628\u0631", "九月", "september", "setembro", "september", "сентябрь", "wrzesień", "9월"), T("octobre", "October", "octubre", "ottobre", "10\u6708", "Oktober", "\u0623\u0643\u062a\u0648\u0628\u0631", "十月", "oktober", "outubro", "oktober", "октябрь", "październik", "10월"), T("novembre", "November", "noviembre", "novembre", "11\u6708", "November", "\u0646\u0648\u0641\u0645\u0628\u0631", "十一月", "november", "novembro", "november", "ноябрь", "listopad", "11월"), T("d\u00e9cembre", "December", "diciembre", "dicembre", "12\u6708", "Dezember", "\u062f\u064a\u0633\u0645\u0628\u0631", "十二月", "december", "dezembro", "december", "декабрь", "grudzień", "12월")];
  function enClair(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? (Number(m[3]) + " " + MOIS[Number(m[2]) - 1] + " " + m[1]) : String(s || "");
  }

  async function enregistrer() {
    if (envoi) return;
    setErr("");
    if (!dateS) { setErr(T("Choisis d\u2019abord une date.", "Pick a date first.", "Elige una fecha.", "Scegli una data.", "\u65e5\u4ed8\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002", "W\u00e4hle ein Datum.", "\u0627\u062e\u062a\u0627\u0631\u064a \u062a\u0627\u0631\u064a\u062e\u0627 \u0623\u0648\u0644\u0627.", "请先选择日期。", "Kies eerst een datum.", "Escolha uma data primeiro.", "Välj först ett datum.", "Сначала выбери дату.", "Najpierw wybierz datę.", "먼저 날짜를 선택해 주세요.")); return; }
    setEnvoi(true);
    try {
      var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
      if (!u || !u.id) { setErr(T("Tu n\u2019es plus connect\u00e9e.", "You are no longer signed in.", "Ya no est\u00e1s conectada.", "Non sei pi\u00f9 connessa.", "\u30ed\u30b0\u30a4\u30f3\u304c\u5207\u308c\u3066\u3044\u307e\u3059\u3002", "Du bist nicht mehr angemeldet.", "\u0644\u0645 \u062a\u0639\u0648\u062f\u064a \u0645\u062a\u0635\u0644\u0629.", "你已退出登录。", "Je bent niet meer ingelogd.", "Você não está mais conectada.", "Du är inte längre inloggad.", "Сессия завершена: войди в аккаунт снова.", "Sesja wygasła — zaloguj się ponownie.", "로그인이 해제됐어요.")); setEnvoi(false); return; }
      var ch = null;
      ch = hjChevalParId(chevalId);   /* 27/09 (408) : siens, lies ET chevaux des ecuries */
      /* 16/09 (186) : les photos sont envoyees AVANT l ecriture de la seance, pour que leurs
         URL partent avec elle - une seule ecriture en base au lieu de deux. */
      var urlsFinales = await envoyerPhotosCarnet();   /* 27/09 (434) : envoi REACTIVE, vers le coffre prive « carnet » */
      /* 27/09 (408) : plus AUCUN envoi de photo (decision du 27/09) - seules les anciennes URL restent. */
      var champs = {
        date_seance: dateS,
        cheval_id: chevalId || null,
        cheval_nom: chevalId
          ? (ch ? (ch.nom || null) : ((seance0 && String(seance0.cheval_id) === String(chevalId)) ? (seance0.cheval_nom || null) : null))
          : ((chevalLibre || "").trim() || null),   /* 27/09 (408) : cheval sans fiche = nom tape, cheval_id null */
        note: (note || "").trim() || null,
        theme: (theme || "").trim() || null,          /* 27/09 (407) */
        lieu: (lieu || "").trim() || null,
        ressenti_cle: ressenti || null,
        a_retenir: (aRetenir || "").trim() || null,
        medias: urlsFinales
      };
      /* 27/09 (408) : DISCIPLINE EN CLE FIXE. Ecrite pour une nouvelle seance, ou si la cavaliere a
         touche a la discipline. Sinon l ancienne valeur (Theorie, Dressur...) reste intacte en base. */
      if (!(seance && seance.id) || discTouche) {
        if (!discCle) { champs.discipline = null; champs.discipline_cle = null; }
        else if (discCle === "autre") { champs.discipline_cle = "autre"; champs.discipline = (discAutre || "").trim() || "Autre"; }
        else { champs.discipline_cle = discCle; champs.discipline = HJ_DISC_FR[discCle] || null; }
      }
      var r;
      if (seance && seance.id) {
        champs.updated_at = new Date().toISOString();
        r = await supa.from("carnet_seances").update(champs).eq("id", seance.id).select().single();
      } else {
        champs.user_id = u.id;
        r = await supa.from("carnet_seances").insert(champs).select().single();
      }
      if (r && r.error) { setErr(String((r.error && r.error.message) || r.error)); setEnvoi(false); return; }
      /* 16/09 (180) : les liens vers les conseils, ecrits une fois la seance enregistree -
         il faut son identifiant. Un echec ici ne perd JAMAIS la seance : elle est deja en
         base a ce moment-la, comme pour les identifications d une publication. */
      try { var idS = (r && r.data && r.data.id) || (seance && seance.id); if (idS) await ecrireLiens(idS, u.id); } catch (eLi) { }
      try { localStorage.removeItem(CLE); } catch (eB3) { }
      /* 27/09 (438) : les photos du coffre retirees de CETTE seance sont effacees pour de bon, une fois la
         seance bien enregistree (en arriere-plan). Reference = l etat en base avant l enregistrement. */
      try {
        var avantHJ = (seance && seance.id && Array.isArray(seance.medias)) ? seance.medias : [];
        var retireesHJ = avantHJ.filter(function (x) { return hjEstCarnet(x) && urlsFinales.indexOf(x) < 0; });
        if (retireesHJ.length) hypeCarnetSupprimerPhotos(retireesHJ);
      } catch (eRet) { }
      setSeance((r && r.data) || null);
      setMedias(urlsFinales); setNouvelles([]);
      setMode("lecture");
      setEnvoi(false);
      /* 28/09 (490) : la video gardee de cote part maintenant que la seance existe */
      try { if (vidAttente && vidAttente.f && r && r.data && r.data.id) { var fA = vidAttente.f; setVidAttente(null); envoyerVideoCarnetFichier(fA, String(r.data.id)); } } catch (eVA) { }
    } catch (eE) { setErr(String(eE)); setEnvoi(false); }
  }

  var stSup = React.useState(false); var confSup = stSup[0], setConfSup = stSup[1];
  var stVuP = React.useState(null); var vuP = stVuP[0], setVuP = stVuP[1];   /* 16/09 (186) : la visionneuse, calque existant */
  async function supprimer() {
    if (!seance || !seance.id) return;
    if (!confSup) { setConfSup(true); return; }
    setErr(""); setEnvoi(true);
    try {
      var r = await supa.from("carnet_seances").delete().eq("id", seance.id);
      if (r && r.error) { setErr(String((r.error && r.error.message) || r.error)); setEnvoi(false); return; }
      /* 27/09 (438) : seance supprimee -> ses photos du coffre aussi (photo + vignette). */
      try { var refsSup = Array.isArray(seance.medias) ? seance.medias : []; if (refsSup.some(hjEstCarnet)) await hypeCarnetSupprimerPhotos(refsSup); } catch (eSp) { }
      setEcran("carnet");
    } catch (eS) { setErr(String(eS)); setEnvoi(false); }
  }

  /* 27/09 (408) : champs a la palette du journal ; 16 px minimum (pas de zoom iOS) ; largeur bornee
     (width / maxWidth 100 %, minWidth 0, block) - c est ce qui empeche la date de deborder. */
  var stChamp = { display: "block", width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(242,237,228,0.12)", background: HJ.carte, color: HJ.ivoire, fontFamily: M, fontSize: 16, minHeight: 48, outline: "none", WebkitAppearance: "none", appearance: "none" };
  function etiquette(txt, facult) {
    return h("div", { style: { fontFamily: M, fontSize: 10.5, letterSpacing: 1.8, textTransform: "uppercase", color: HJ.champ, fontWeight: 600, margin: "0 0 8px" } }, txt);
  }
  function pastilleHJ(pris) {
    return { padding: "6px 8px", minHeight: 44, minWidth: 0, borderRadius: 10, border: "1px solid " + (pris ? HJ.reflet : "rgba(242,237,228,0.12)"), background: pris ? HJ.pet : "transparent", color: pris ? HJ.ivoire : HJ.gris, fontFamily: M, fontSize: 13.5, fontWeight: pris ? 600 : 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1.2, boxSizing: "border-box" };
  }
  function grandir(el) { try { if (!el) return; el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight + 2, 640) + "px"; } catch (eG) { } }


  var corps;
  /* 27/09 (421) : les aides visuelles du journal (419) sont desormais PARTAGEES par l edition et la
     lecture : meme bandeau, memes pictogrammes, memes titres de section. */
  var rtlHJ = (ctx.langue === "ar");
  var ESP = rtlHJ ? 0 : 2;   /* 27/09 (424) : 2.4 -> 2, ecriture jugee un peu grosse */   /* pas d espacement de lettres en arabe : il casse la liaison des lettres. Les chevrons ‹ › ne sont PAS inverses a la main : en RTL le navigateur les retourne lui-meme (caracteres « miroir »). */
  var SURF = "#111617", LIGNE = "rgba(242,237,228,0.13)";
  var icoHJ = function (nom, taille, coul) {
    var p = {
      cal: ["M4 6.5h16v13H4z", "M4 10.5h16", "M8.5 4v4", "M15.5 4v4"],
      tag: ["M3.5 12.2V4.5h7.7l9 9-7.7 7.7z", "M8 8.5h.01"],
      pin: ["M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z", "M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"],
      livre: ["M3 6.5c3-1.3 6-1.3 9 .6v12.4c-3-1.9-6-1.9-9-.6z", "M21 6.5c-3-1.3-6-1.3-9 .6v12.4c3-1.9 6-1.9 9-.6z"],
      cheval: ["M7 21v-2.6c0-2.2.9-3.9 2.4-5.4L8 10.6 5.6 12.1 3.8 10.4l4-5.6.6-2.6 2.2 2.1c3.6.2 6.6 2.9 7.5 7.1l1.2 9.6", "M12.6 8.6h.01"],
      cible: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z", "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"]
    }[nom] || [];
    return h.apply(null, ["svg", { width: taille, height: taille, viewBox: "0 0 24 24", fill: "none", stroke: coul, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "0 0 auto", display: "block" } }]
      .concat(p.map(function (d, i) { return h("path", { key: "p" + i, d: d }); })));
  };
  var etiqHJ = function (txt) {
    return h("div", { style: { fontFamily: M, fontSize: 10.5, letterSpacing: ESP, textTransform: "uppercase", color: "rgba(242,237,228,0.86)", fontWeight: 500, margin: "0 0 10px" } }, txt);
  };
  var sectionHJ = function (cle, enfants, mb) { return h.apply(null, ["div", { key: cle, style: { marginBottom: (mb == null ? 26 : mb), minWidth: 0 } }].concat(enfants)); };

  /* 27/09 (422) : LA GALERIE DES SOUVENIRS (anciennes photos), commune a l edition et a la lecture.
     Chaque media est une vignette SEPAREE (coins arrondis, espace reel de 8 px), jamais une mosaique.
     1 media : grande vignette horizontale ; 2 : deux vignettes cote a cote ; 3 et plus : une grande
     + deux petites, le « +N » pose SUR la troisieme ; un toucher sur « +N » deplie tout (grille de 2).
     Ordre stable (celui de la seance). Recadrage « cover » centre un peu haut (tetes preservees).
     Un toucher ouvre la visionneuse EXISTANTE. Une video (le cas n existe pas encore) aurait un
     symbole lecture. En edition, chaque vignette garde son bouton de retrait. */
  var estVidHJ = function (u) { try { return ((typeof estUrlVideo === "function") && estUrlVideo(u)) || ((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(u)); } catch (eV) { return false; } };
  var galerieHJ = function (liste, retirer) {
    var n = (liste || []).length;
    if (!n) return null;
    var replie = n > 3 && !toutPh;
    var vus = replie ? liste.slice(0, 3) : liste;
    var tuile = function (u, i, style, plus) {
      var vid = estVidHJ(u);
      return h("div", { key: "g" + i + "_" + String(u).slice(-24), role: "button",
        onClick: function () { if (plus) { setToutPh(true); } else { setVuP(hjEstCarnet(u) ? ((urlsHJ[u] || {}).grand || null) : u); } },
        style: Object.assign({ position: "relative", minWidth: 0, borderRadius: 12, overflow: "hidden", background: "#111617", cursor: "pointer" }, style) },
        vid
          ? ((typeof hypeMiniatureVideo === "function")   /* 27/09 (436) : image de la video (Mux), le ▶ reste celui de la galerie */
              ? hypeMiniatureVideo(u, { largeur: (n === 1 || i === 0) ? 640 : 320, picto: false, posterLegacy: false, style: { position: "absolute", inset: 0, background: "#0B0E10" }, objectPosition: "50% 30%" })
              : h("div", { style: { position: "absolute", inset: 0, background: "#0B0E10" } }))
          : h("img", { src: hjEstCarnet(u) ? (((urlsHJ[u] || {})[(n >= 3 && i > 0) ? "vignette" : "grand"]) || undefined) : ((typeof grandeImageHype === "function") ? grandeImageHype(u, 900) : u), alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block" } }),
        vid ? h("span", { "aria-hidden": "true", style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", border: "1.5px solid rgba(242,237,228,0.85)", background: "rgba(8,10,11,0.45)", color: HJ.ivoire, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, paddingLeft: 3, boxSizing: "border-box" } }, "▶") : null,
        plus ? h("div", { style: { position: "absolute", inset: 0, background: "rgba(8,10,11,0.58)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: M, fontSize: 22, fontWeight: 600, color: HJ.ivoire } }, "+" + plus) : null,
        (retirer && !plus) ? h("button", { type: "button", onClick: function (ev) { try { ev.preventDefault(); ev.stopPropagation(); } catch (eSp) { } retirer(u); }, "aria-label": T("Retirer", "Remove", "Quitar", "Rimuovi", "外す", "Entfernen", "إزالة", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제"),
          /* 27/09 (423) : zone tactile REELLE de 44 x 44 px, pastille visible de 32 px a l interieur. Retire
             seulement de l etat : rien n est ecrit ni supprime avant « Enregistrer ma seance ». */
          style: { position: "absolute", top: 0, right: 0, width: 44, height: 44, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", border: 0, background: "transparent", cursor: "pointer", padding: 0 } },
          h("span", { "aria-hidden": "true", style: { width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(242,237,228,0.35)", background: "rgba(8,10,11,0.78)", color: HJ.ivoire, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" } }, "✕")) : null);
    };
    if (n === 1) return h("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr)" } }, tuile(liste[0], 0, { aspectRatio: "16 / 10" }));
    if (n === 2) return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 } },
      liste.map(function (u, i) { return tuile(u, i, { aspectRatio: "4 / 5" }); }));
    if (replie || n === 3) return h("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gridTemplateRows: "repeat(2, minmax(0, 1fr))", gap: 8, aspectRatio: "3 / 2" } },
      tuile(vus[0], 0, { gridRow: "1 / span 2" }),
      tuile(vus[1], 1, {}),
      tuile(vus[2], 2, {}, replie ? (n - 3) : 0));
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 } },
      liste.map(function (u, i) { return tuile(u, i, { aspectRatio: "1 / 1" }); }));
  };

  /* LE BANDEAU. Edition : la ligne du cheval ouvre le panneau, la date est l input reel.
     Lecture : cheval et date de la seance ENREGISTREE, rien de cliquable (on passe par Modifier). */
  var lectureHJ = (mode !== "edition");
  var nomAffiche = "";
  var sansFiche = false;
  var chSel = null;
  if (!lectureHJ) {
    if (chevalId) {
      chSel = hjChevalParId(chevalId);
      nomAffiche = chSel ? (chSel.nom || "") : ((seance0 && String(seance0.cheval_id) === String(chevalId)) ? (seance0.cheval_nom || "") : "…");
    } else if (chevalLibre) { nomAffiche = chevalLibre; sansFiche = true; }
  } else {
    var seB = seance || {};
    if (seB.cheval_id) { chSel = hjChevalParId(seB.cheval_id); nomAffiche = seB.cheval_nom || (chSel ? (chSel.nom || "") : ""); }
    else if (seB.cheval_nom) { nomAffiche = String(seB.cheval_nom); sansFiche = true; }
  }
  /* La photo du cheval : seulement si elle est deja dans les donnees chargees (aucune requete). */
  var photoCh = (chSel && chSel.photo_url) ? String(chSel.photo_url) : "";
  var ouvrirChevaux = function () { setRechCh(""); setSaisieLibre(false); setLibreTmp(chevalLibre || ""); setPanCheval(true); };
  var dateTxt = lectureHJ
    ? enClair((seance && seance.date_seance) || dateS)
    : (enClair(dateS) || T("Choisir la date", "Choose the date", "Elegir la fecha", "Scegli la data", "日付を選ぶ", "Datum wählen", "اختيار التاريخ", "选择日期", "Kies de datum", "Escolher a data", "Välj datum", "Выбрать дату", "Wybierz datę", "날짜 선택"));
  var nomVide = lectureHJ
    ? T("Aucun cheval", "No horse", "Ningún caballo", "Nessun cavallo", "馬なし", "Kein Pferd", "بدون حصان", "没有马", "Geen paard", "Nenhum cavalo", "Ingen häst", "Нет лошади", "Brak konia", "말 없음")
    : T("Choisir un cheval", "Choose a horse", "Elegir un caballo", "Scegli un cavallo", "馬を選ぶ", "Pferd wählen", "اختيار حصان", "选择一匹马", "Kies een paard", "Escolher um cavalo", "Välj en häst", "Выбрать лошадь", "Wybierz konia", "말 선택");

  var bandeauHJ = h("div", { style: { position: "relative", overflow: "hidden", backgroundColor: HJ.fond, backgroundImage: "url(images/JOURNAL_SEANCE_FOND.webp)", backgroundSize: "cover", backgroundPosition: "68% 28%", backgroundRepeat: "no-repeat" } },
    /* voile lateral cote texte + degrade progressif vers le fond #080A0B (pas de coupure) */
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlHJ ? "270deg" : "90deg") + ", rgba(8,10,11,0.78) 0%, rgba(8,10,11,0.45) 45%, rgba(8,10,11,0.05) 80%)" } }),
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,10,11,0.45) 0%, rgba(8,10,11,0.10) 30%, rgba(8,10,11,0.55) 68%, rgba(8,10,11,0.92) 88%, #080A0B 100%)" } }),
    h("button", { onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
      style: Object.assign({ position: "absolute", top: "calc(env(safe-area-inset-top) + 12px)", zIndex: 2, width: 44, height: 44, borderRadius: "50%", background: "rgba(8,10,11,0.45)", border: "1px solid rgba(242,237,228,0.22)", color: HJ.ivoire, fontSize: 20, lineHeight: 1, cursor: "pointer", padding: 0 }, rtlHJ ? { right: 14 } : { left: 14 }) }, "‹"),
    h("div", { style: { position: "relative", zIndex: 1, padding: "calc(env(safe-area-inset-top) + 76px) 18px 6px", minWidth: 0 } },
      h("div", { style: { fontFamily: M, fontSize: 10.5, letterSpacing: rtlHJ ? 0 : 3, textTransform: "uppercase", color: HJ.ivoire, opacity: 0.88, fontWeight: 500, marginBottom: 14 } },
        T("Journal de progression", "Progress journal", "Diario de progreso", "Diario dei progressi", "上達ジャーナル", "Fortschrittstagebuch", "مذكرات التقدّم", "成长日志", "Voortgangsdagboek", "Diário de progresso", "Utvecklingsdagbok", "Дневник прогресса", "Dziennik postępów", "진행 일지")),
      /* le cheval : en edition toute la ligne ouvre le panneau EXISTANT ; en lecture, simple affichage */
      h("div", lectureHJ ? { style: { display: "flex", alignItems: "center", gap: 14, minHeight: 72, minWidth: 0 } } : { role: "button", onClick: ouvrirChevaux, style: { display: "flex", alignItems: "center", gap: 14, minHeight: 72, minWidth: 0, cursor: "pointer" } },
        h("div", { style: { position: "relative", flex: "0 0 auto", width: 68, height: 68, borderRadius: "50%", border: "1px solid rgba(242,237,228,0.8)", background: "rgba(8,10,11,0.35)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" } },
          icoHJ("cheval", 34, HJ.champ),
          photoCh ? h("img", { key: photoCh, src: (typeof vignetteHype === "function") ? vignetteHype(photoCh, 136, 136) : photoCh, alt: "", decoding: "async",
            onError: function (e) { try { e.target.style.display = "none"; } catch (eIm) { } },
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 30, fontWeight: 700, lineHeight: 1.08, color: (nomAffiche || !lectureHJ) ? HJ.ivoire : "rgba(242,237,228,0.84)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere", textShadow: "0 1px 12px rgba(0,0,0,0.45)" } },
            nomAffiche || nomVide),
          sansFiche ? h("span", { style: { display: "inline-block", marginTop: 6, fontFamily: M, fontSize: 11, color: HJ.champ, border: "1px solid rgba(214,182,118,0.75)", borderRadius: 999, padding: "2px 8px" } }, T("sans fiche", "no profile", "sin ficha", "senza scheda", "未登録", "ohne Profil", "بلا ملف", "无档案", "zonder profiel", "sem ficha", "utan hästprofil", "без карточки", "bez karty", "등록 정보 없음")) : null),
        lectureHJ ? null : h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: HJ.ivoire, opacity: 0.75, fontSize: 26, lineHeight: 1, padding: "0 2px" } }, "›")),
      /* la date : discrete, sous le cheval. En edition, l input date REEL couvre toute la ligne
         (transparent, borne a l ecran) ; l affichage decoupe toujours la chaine AAAA-MM-JJ. */
      h("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 10, minHeight: 46, minWidth: 0, maxWidth: "100%", overflow: "hidden", marginTop: 14, borderTop: "1px solid " + LIGNE } },
        icoHJ("cal", 18, "rgba(242,237,228,0.84)"),
        h("span", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 13, color: "rgba(242,237,228,0.82)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, dateTxt),
        lectureHJ ? null : h("input", { type: "date", className: "hj-date", value: dateS, onChange: function (e) { setDateS(e.target.value); }, "aria-label": T("Choisir la date de la séance", "Choose the session date", "Elegir la fecha de la sesión", "Scegli la data della sessione", "セッションの日付を選択", "Datum der Trainingseinheit auswählen", "اختيار تاريخ الحصة", "选择训练日期", "Kies de datum van de training", "Escolher a data da sessão", "Välj datum för ridpasset", "Выбрать дату тренировки", "Wybierz datę treningu", "훈련 날짜 선택"),
          style: { position: "absolute", top: 0, left: 0, height: "100%", display: "block", width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", margin: 0, padding: 0, border: 0, background: "transparent", color: "transparent", fontSize: 16, opacity: 0.01, cursor: "pointer", WebkitAppearance: "none", appearance: "none" } }))));

  if (mode === "edition") {
    /* 27/09 (419) : REFONTE VISUELLE DU MODE EDITION (etape 1 sur 4) d apres la troisieme maquette.
       HABIT SEULEMENT : memes etats, memes ecritures (enregistrer inchange), meme brouillon v2, memes
       conseils, meme panneau des chevaux, meme visionneuse. (420 : miniatures ; 421 : lecture.) */
    /* A RETENIR : visible des que l etat contient reellement du texte, quelle que soit son origine
       (ancienne seance, brouillon restaure, saisie), puis reste affiche jusqu a la sortie de l ecran
       (aRetenirVisible, 423). Masque, il n est JAMAIS force a null : enregistrer() ecrit l etat tel quel. */
    var afficherARetenir = aRetenirVisible || String(aRetenir || "").trim().length > 0;

    var champLigne = function (cle, ico, valeur, setVal, maxL, ph, aria) {
      return h("div", { key: cle, style: { display: "flex", alignItems: "center", gap: 10, minHeight: 48, minWidth: 0, maxWidth: "100%", boxSizing: "border-box", padding: "0 14px", borderRadius: 12, border: "1px solid " + LIGNE, background: SURF, marginBottom: 10 } },
        icoHJ(ico, 18, "rgba(242,237,228,0.8)"),
        h("input", { type: "text", className: "hj-in", dir: hjDirChamp(valeur), value: valeur, maxLength: maxL, onChange: function (e) { setVal(e.target.value); }, placeholder: ph, "aria-label": aria,
          style: { flex: 1, minWidth: 0, width: "100%", height: 46, border: 0, outline: "none", background: "transparent", color: HJ.ivoire, fontFamily: M, fontSize: 16, padding: 0, WebkitAppearance: "none", appearance: "none" } }));
    };
    var nbCons = conseils.length;

    corps = h("div", { style: { padding: "8px 16px 24px", minWidth: 0 } },
      /* DISCIPLINES : rail compact defilable. En arabe, le rail suit le sens de la page (debut a droite). */
      sectionHJ("disc", [
        hjHist && !discTouche ? h("div", { key: "hist", style: { fontFamily: M, fontSize: 13, color: HJ.gris, margin: "0 0 8px" } },
          T("Enregistrée : ", "Saved as: ", "Guardada: ", "Salvata: ", "保存済み：", "Gespeichert: ", "محفوظ: ", "已保存为：", "Opgeslagen: ", "Salva: ", "Sparat: ", "Сохранено: ", "Zapisano: ", "저장됨: "), h("span", { style: { color: HJ.ivoire } }, hjHist)) : null,
        h("div", { key: "rail", className: "hj-rail", "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain", scrollbarWidth: "none", minWidth: 0, maxWidth: "100%", paddingBottom: 2 } },
          HJ_DISC.map(function (k) {
            var pris = discCle === k;
            return h("div", { key: "dc" + k, role: "button", "aria-pressed": pris ? "true" : "false", onClick: function () { setDiscCle(pris ? "" : k); setDiscTouche(true); },
              style: { flex: "0 0 auto", display: "flex", alignItems: "center", minHeight: 44, padding: "0 15px", borderRadius: 12, border: "1px solid " + (pris ? HJ.reflet : "rgba(242,237,228,0.15)"), background: pris ? "rgba(46,106,128,0.62)" : SURF, color: pris ? HJ.ivoire : "rgba(242,237,228,0.86)", fontFamily: M, fontSize: 14, fontWeight: pris ? 600 : 500, whiteSpace: "nowrap", cursor: "pointer", boxSizing: "border-box" } }, hjLibDisc(k));
          })),
        discCle === "autre" ? h("input", { key: "autre", type: "text", className: "hj-in", dir: hjDirChamp(discAutre), value: discAutre, maxLength: 60, onChange: function (e) { setDiscAutre(e.target.value); setDiscTouche(true); },
          placeholder: T("Précise (ex. longe, poney games…)", "Specify (e.g. lunging…)", "Precisa (p. ej. cuerda…)", "Specifica (es. longia…)", "内容を入力", "Genauer (z. B. Longe…)", "حددي (مثلا: الحبل الطويل، ألعاب المهور…)", "请注明（如：长绳、小马游戏…）", "Specificeer (bijv. longeren, pony games…)", "Especifique (ex.: guia, pônei games…)", "Förtydliga (t.ex. longering, ponnygames…)", "Уточни (напр. корда, пони-игры…)", "Doprecyzuj (np. lonża, poney games…)", "자세히 적어 주세요 (예: 론지, 포니 게임…)"),
          style: Object.assign({}, stChamp, { marginTop: 10, background: SURF, border: "1px solid " + LIGNE }) }) : null], 18),

      /* THEME et LIEU : une ligne chacun */
      sectionHJ("thli", [
        champLigne("th", "tag", theme, setTheme, 120,
          T("Ajouter un thème", "Add a theme", "Añadir un tema", "Aggiungi un tema", "テーマを追加", "Thema hinzufügen", "إضافة موضوع", "添加主题", "Thema toevoegen", "Adicionar um tema", "Lägg till ett tema", "Добавить тему", "Dodaj temat", "주제 추가"),
          T("Thème", "Theme", "Tema", "Tema", "テーマ", "Thema", "الموضوع", "主题", "Thema", "Tema", "Tema", "Тема", "Temat", "주제")),
        champLigne("li", "pin", lieu, setLieu, 80,
          T("Ajouter un lieu", "Add a place", "Añadir un lugar", "Aggiungi un luogo", "場所を追加", "Ort hinzufügen", "إضافة مكان", "添加地点", "Plek toevoegen", "Adicionar um local", "Lägg till en plats", "Добавить место", "Dodaj miejsce", "장소 추가"),
          T("Lieu", "Place", "Lugar", "Luogo", "場所", "Ort", "المكان", "地点", "Plaats", "Local", "Plats", "Место", "Miejsce", "장소"))], 16),

      /* RESSENTI : trois choix sobres, aucun par defaut */
      sectionHJ("rs", [
        etiqHJ(T("Ressenti", "How it felt", "Sensaciones", "Sensazioni", "感覚", "Gefühl", "الإحساس", "感受", "Hoe het voelde", "Como foi", "Hur det kändes", "Ощущения", "Odczucia", "느낌")),
        h("div", { key: "rsg", style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 } },
          [["bonnes", T("Bonnes sensations", "Good feelings", "Buenas sensaciones", "Buone sensazioni", "良い感覚", "Gutes Gefühl", "إحساس جيد", "感觉很好", "Goed gevoel", "Boas sensações", "Bra känsla", "Хорошие ощущения", "Dobre odczucia", "좋은 느낌")],
           ["mitigees", T("Sensations mitigées", "Mixed feelings", "Sensaciones mixtas", "Sensazioni contrastanti", "まあまあ", "Gemischtes Gefühl", "إحساس متفاوت", "感觉一般", "Wisselend gevoel", "Sensações mistas", "Blandade känslor", "Смешанные ощущения", "Mieszane odczucia", "그저 그런 느낌")],
           ["difficile", T("Séance difficile", "Tough session", "Sesión difícil", "Sessione difficile", "難しい稽古", "Schwierige Einheit", "حصة صعبة", "艰难的训练", "Zware training", "Sessão difícil", "Tufft ridpass", "Тяжёлая тренировка", "Trudny trening", "힘든 훈련")]].map(function (r) {
            var pris = ressenti === r[0];
            return h("div", { key: "rs" + r[0], role: "button", "aria-pressed": pris ? "true" : "false", onClick: function () { setRessenti(pris ? "" : r[0]); },
              style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, minHeight: 66, minWidth: 0, padding: "8px 6px", borderRadius: 12, border: "1px solid " + (pris ? "rgba(214,182,118,0.8)" : "transparent"), background: pris ? "rgba(46,106,128,0.30)" : "transparent", cursor: "pointer", boxSizing: "border-box" } },
              h("span", { "aria-hidden": "true", style: { width: 16, height: 16, borderRadius: "50%", border: "1.5px solid " + (pris ? HJ.champ : "rgba(242,237,228,0.72)"), display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" } },
                pris ? h("span", { style: { width: 7, height: 7, borderRadius: "50%", background: HJ.champ } }) : null),
              h("span", { style: { fontFamily: M, fontSize: 12.5, lineHeight: 1.25, textAlign: "center", color: pris ? HJ.ivoire : "rgba(242,237,228,0.86)", fontWeight: pris ? 600 : 400, overflowWrap: "anywhere" } }, r[1]));
          }))]),

      /* RESUME DE LA SEANCE : la zone principale, ecrit dans `note` (logique inchangee) */
      sectionHJ("res", [
        etiqHJ(T("Résumé de la séance", "Session summary", "Resumen de la sesión", "Riepilogo della sessione", "稽古のまとめ", "Zusammenfassung der Einheit", "ملخّص الحصة", "训练小结", "Samenvatting van de training", "Resumo da sessão", "Sammanfattning av ridpasset", "Итоги тренировки", "Podsumowanie treningu", "훈련 요약")),
        h("textarea", { key: "no", className: "hj-ta", dir: hjDirChamp(note), value: note, rows: 5, ref: function (el) { if (el && !el.__hjG) { el.__hjG = 1; grandir(el); } }, onChange: function (e) { ecrireNote(e.target.value); grandir(e.target); },
          placeholder: T("Comment s’est passée la séance ?\nUne sensation, un progrès, quelque chose à retravailler…", "How did the session go?\nA feeling, some progress, something to work on again…", "¿Cómo fue la sesión?\nUna sensación, un progreso, algo que volver a trabajar…", "Com’è andata la sessione?\nUna sensazione, un progresso, qualcosa da rilavorare…", "稽古はどうでしたか？\n感覚、上達、もう一度取り組みたいこと…", "Wie lief die Einheit?\nEin Gefühl, ein Fortschritt, etwas zum Weiterüben…", "كيف جرت الحصة؟\nإحساس، تقدّم، شيء يجب العمل عليه من جديد…", "这次训练怎么样？\n一种感觉、一点进步、还需要再练的地方…", "Hoe ging de training?\nEen gevoel, vooruitgang, iets om opnieuw aan te werken…", "Como foi a sessão?\nUma sensação, um progresso, algo para trabalhar de novo…", "Hur gick ridpasset?\nEn känsla, ett framsteg, något att jobba mer med…", "Как прошла тренировка?\nОщущение, прогресс, что-то, над чем стоит ещё поработать…", "Jak poszedł trening?\nOdczucie, postęp, coś do dopracowania…", "훈련은 어땠나요?\n느낌, 발전한 점, 다시 연습할 점…"),
          style: Object.assign({}, stChamp, { minHeight: 150, padding: "14px 15px", borderRadius: 14, background: SURF, border: "1px solid " + LIGNE, resize: "none", lineHeight: 1.55, overflow: "hidden" }) }),
        afficherARetenir ? h("div", { key: "arw", style: { marginTop: 14 } },
          etiqHJ(T("À retenir", "To remember", "Para recordar", "Da ricordare", "覚えておくこと", "Merken", "للتذكر", "要点", "Om te onthouden", "Para lembrar", "Att komma ihåg", "Запомнить", "Do zapamiętania", "기억할 점")),
          h("textarea", { className: "hj-ta", dir: hjDirChamp(aRetenir), value: aRetenir, rows: 2, maxLength: 300, ref: function (el) { if (el && !el.__hjG) { el.__hjG = 1; grandir(el); } }, onChange: function (e) { setARetenir(e.target.value); grandir(e.target); },
            style: Object.assign({}, stChamp, { minHeight: 72, background: SURF, border: "1px solid " + LIGNE, resize: "none", lineHeight: 1.45, overflow: "hidden" }) })) : null]),

      /* SOUVENIRS : photos (434, coffre prive) et video (436, seance deja enregistree). */
      sectionHJ("souv", [
        etiqHJ(T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "思い出", "Erinnerungen", "ذكريات", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억")),
        /* 27/09 (434) : PHOTOS REACTIVEES, dans le coffre prive. Les nouvelles (pas encore envoyees)
           s affichent a la suite des anciennes ; elles partent a l enregistrement. 8 au maximum. */
        (medias.length || nouvelles.length) ? h("div", { key: "ph", style: { marginBottom: 12 } }, galerieHJ(medias.concat(nouvelles.map(function (nv) { return nv && nv.dataUrl; }).filter(Boolean)), function (u) {
          if (/^(data|blob):/.test(String(u))) setNouvelles(nouvelles.filter(function (nv) { return nv.dataUrl !== u; }));
          else setMedias(medias.filter(function (x) { return x !== u; }));
        })) : null,
        h("input", { key: "fic", ref: refFicM, type: "file", accept: "image/*", multiple: true, onChange: choisirPhotosCarnet, style: { display: "none" } }),
        h("input", { key: "ficv", ref: refFicV, type: "file", accept: "video/*", onChange: ajouterVideoCarnet, style: { display: "none" } }),   /* 27/09 (436) */
        encartVidHJ(),
        vidAttente ? h("div", { key: "vatt", style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(127,163,173,0.30)", background: "rgba(16,40,52,0.6)" } },
          h("span", { style: { fontSize: 18 } }, "\ud83c\udfac"),
          h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 13, lineHeight: 1.4, color: HJ.ivoire } },
            h("div", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, vidAttente.nom || T("Vid\u00e9o", "Video", "V\u00eddeo", "Video", "\u52d5\u753b", "Video", "\u0641\u064a\u062f\u064a\u0648", "视频", "Video", "Vídeo", "Video", "Видео", "Wideo", "동영상")),
            h("div", { style: { fontSize: 11.5, color: "rgba(242,237,228,0.7)" } }, T("Elle partira d\u00e8s que tu enregistres la s\u00e9ance.", "It will be uploaded as soon as you save the session.", "Se enviar\u00e1 en cuanto guardes la sesi\u00f3n.", "Verr\u00e0 inviato appena salvi la sessione.", "\u7a3d\u53e4\u3092\u4fdd\u5b58\u3059\u308b\u3068\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002", "Es wird hochgeladen, sobald du die Einheit speicherst.", "\u0633\u064a\u064f\u0631\u0633\u0644 \u0628\u0645\u062c\u0631\u062f \u062d\u0641\u0638 \u0627\u0644\u062d\u0635\u0629.", "保存训练后，它会立即上传。", "Hij wordt verstuurd zodra je de training opslaat.", "Ela será enviada assim que você salvar a sessão.", "Den skickas så fort du sparar ridpasset.", "Оно отправится, как только ты сохранишь тренировку.", "Zostanie wysłane, gdy tylko zapiszesz trening.", "훈련을 저장하면 바로 전송돼요."))),
          h("button", { onClick: function () { setVidAttente(null); }, "aria-label": T("Retirer", "Remove", "Quitar", "Rimuovi", "\u524a\u9664", "Entfernen", "\u0625\u0632\u0627\u0644\u0629", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제"), style: { flex: "0 0 auto", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: HJ.ivoire, fontSize: 14, cursor: "pointer" } }, "\u00d7")) : null,
        (medias.length + nouvelles.length < 8)
          ? h("div", { key: "addrow", style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 } },
            h("div", { key: "addph", role: "button", onClick: function () { try { if (refFicM.current) refFicM.current.click(); } catch (eCk) { } },
              style: { display: "inline-flex", alignItems: "center", gap: 9, minHeight: 44, padding: "0 16px", borderRadius: 12, border: "1px solid " + HJ.reflet, background: "rgba(46,106,128,0.45)", color: HJ.ivoire, fontFamily: M, fontSize: 14, fontWeight: 600, cursor: "pointer", boxSizing: "border-box" } },
              h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: HJ.ivoire, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { display: "block", flex: "0 0 auto" } },
                h("path", { d: "M4 8h3l2-2.5h6L17 8h3v11H4z" }), h("path", { d: "M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" })),
              T("Ajouter des photos", "Add photos", "Añadir fotos", "Aggiungi foto", "写真を追加", "Fotos hinzufügen", "إضافة صور", "添加照片", "Foto's toevoegen", "Adicionar fotos", "Lägg till foton", "Добавить фото", "Dodaj zdjęcia", "사진 추가")),
            /* 27/09 (436) : la video, seulement sur une seance deja enregistree (il faut son identifiant). */
            (true)   /* 28/09 (490) : aussi sur une seance pas encore enregistree (la video partira apres) */
              ? h("div", { key: "addvid", role: "button", "aria-disabled": (vidHJ || vidAttente) ? "true" : "false", onClick: function () { if (vidHJ || vidAttente) return; try { if (refFicV.current) refFicV.current.click(); } catch (eCv) { } },
                  style: { display: "inline-flex", alignItems: "center", gap: 9, minHeight: 44, padding: "0 16px", borderRadius: 12, border: "1px solid " + HJ.reflet, background: "rgba(46,106,128,0.45)", color: HJ.ivoire, fontFamily: M, fontSize: 14, fontWeight: 600, cursor: vidHJ ? "default" : "pointer", opacity: vidHJ ? 0.5 : 1, boxSizing: "border-box" } },
                  h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: HJ.ivoire, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { display: "block", flex: "0 0 auto" } },
                    h("path", { d: "M3.5 6.5h12v11h-12z" }), h("path", { d: "M15.5 10.5l5-3v9l-5-3" })),
                  T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "영상 추가"))
              : null)
          : h("div", { key: "max8", style: { fontFamily: M, fontSize: 12.5, color: "rgba(242,237,228,0.84)", marginBottom: 8 } },
              T("8 photos au maximum par séance.", "8 photos per session at most.", "Máximo 8 fotos.", "Massimo 8 foto.", "最大8枚です。", "Höchstens 8 Fotos.", "8 صور كحد أقصى لكل حصة.", "每次训练课最多 8 张照片。", "Maximaal 8 foto's per training.", "No máximo 8 fotos por sessão.", "Högst 8 foton per ridpass.", "Не больше 8 фото на тренировку.", "Maksymalnie 8 zdjęć na trening.", "훈련당 사진은 최대 8장이에요.")),
        h("div", { key: "souvtxt", style: { fontFamily: M, fontSize: 12.5, lineHeight: 1.5, color: "rgba(242,237,228,0.76)" } },
          T("Tes photos sont privées : toi seule peux les voir.", "Your photos are private: only you can see them.", "Tus fotos son privadas: solo tú puedes verlas.", "Le tue foto sono private: solo tu puoi vederle.", "写真は非公開です。あなただけが見られます。", "Deine Fotos sind privat: nur du kannst sie sehen.", "صورك خاصة: أنتِ فقط من يمكنه رؤيتها.", "你的照片是私密的：只有你自己能看到。", "Je foto's zijn privé: alleen jij kunt ze zien.", "Suas fotos são privadas: só você pode vê-las.", "Dina foton är privata: bara du kan se dem.", "Твои фото личные: видишь их только ты.", "Twoje zdjęcia są prywatne: tylko ty możesz je zobaczyć.", "사진은 비공개예요. 나만 볼 수 있어요."),
          " ",
          (seance && seance.id)
            ? T("Vidéos : 3 minutes maximum. Elles n’apparaissent que dans ton carnet, mais elles ne sont pas dans le coffre privé : une personne qui aurait leur lien pourrait les voir.", "Videos: 3 minutes max. They only appear in your journal, but they are not in the private vault: anyone with their link could watch them.", "Vídeos: 3 minutos máximo. Solo aparecen en tu cuaderno, pero no están en el espacio privado: alguien con su enlace podría verlos.", "Video: massimo 3 minuti. Appaiono solo nel tuo diario, ma non sono nello spazio privato: chi avesse il loro link potrebbe vederli.", "動画は最大3分。あなたのノートにだけ表示されますが、非公開の保管庫には入りません。リンクを知っている人は見ることができます。", "Videos: höchstens 3 Minuten. Sie erscheinen nur in deinem Tagebuch, liegen aber nicht im privaten Tresor: Wer ihren Link hat, könnte sie ansehen.", "الفيديوهات: 3 دقائق كحد أقصى. تظهر في دفترك فقط، لكنها ليست في الخزنة الخاصة: من لديه رابطها يمكنه مشاهدتها.", "视频：最长 3 分钟。它们只会出现在你的日志里，但不在私密保险库中：拿到链接的人可以看到。", "Video's: maximaal 3 minuten. Ze verschijnen alleen in je logboek, maar ze staan niet in de privékluis: iemand met de link zou ze kunnen bekijken.", "Vídeos: no máximo 3 minutos. Eles aparecem só no seu caderno, mas não ficam no cofre privado: quem tiver o link poderá vê-los.", "Videor: högst 3 minuter. De visas bara i din anteckningsbok, men de ligger inte i det privata valvet: den som har länken kan se dem.", "Видео: не больше 3 минут. Они появляются только в твоём дневнике, но не лежат в закрытом хранилище: тот, у кого есть ссылка на них, сможет их посмотреть.", "Filmy: maksymalnie 3 minuty. Pojawiają się tylko w twoim notesie, ale nie są w prywatnym sejfie: osoba, która ma do nich link, mogłaby je zobaczyć.", "영상은 최대 3분이에요. 내 노트에만 표시되지만 비공개 보관함에는 들어 있지 않아요. 링크를 아는 사람은 볼 수 있어요.")
            : T("Pour ajouter une vidéo, enregistre d’abord ta séance.", "To add a video, save your session first.", "Para añadir un vídeo, guarda primero tu sesión.", "Per aggiungere un video, salva prima la sessione.", "動画を追加するには、まずセッションを保存してください。", "Um ein Video hinzuzufügen, speichere zuerst deine Einheit.", "لإضافة فيديو، احفظي حصتك أولًا.", "想添加视频，请先保存你的训练。", "Om een video toe te voegen, sla eerst je training op.", "Para adicionar um vídeo, salve primeiro a sua sessão.", "Spara först ditt ridpass för att lägga till en video.", "Чтобы добавить видео, сначала сохрани тренировку.", "Aby dodać film, najpierw zapisz trening.", "영상을 추가하려면 먼저 훈련을 저장해 주세요."))]),

      /* CONSEILS HEY BABY : une ligne compacte ; logique INCHANGEE (memes etats, meme panneau,
         memes ecritures a l enregistrement, retrait possible). */
      sectionHJ("cons", [
        h("div", { key: "csr", role: "button", onClick: function () { setPanChoix(true); },
          style: { display: "flex", alignItems: "center", gap: 14, minHeight: 68, minWidth: 0, padding: "10px 0", borderTop: "1px solid " + LIGNE, borderBottom: nbCons ? "none" : "1px solid " + LIGNE, cursor: "pointer", boxSizing: "border-box" } },
          icoHJ("livre", 26, "rgba(242,237,228,0.85)"),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: M, fontSize: 11, letterSpacing: rtlHJ ? 0 : 1.8, textTransform: "uppercase", color: HJ.ivoire, fontWeight: 500 } },
              T("Conseils Hey Baby", "Hey Baby tips", "Consejos Hey Baby", "Consigli Hey Baby", "Hey Babyのアドバイス", "Hey-Baby-Tipps", "نصائح Hey Baby", "Hey Baby 建议", "Tips van Hey Baby", "Dicas do Hey Baby", "Hey Baby-tips", "Советы Hey Baby", "Porady Hey Baby", "Hey Baby 조언")),
            h("div", { style: { fontFamily: M, fontSize: 13, color: "rgba(242,237,228,0.8)", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
              !nbCons
                ? T("Associer un conseil travaillé", "Link a tip you worked on", "Asociar un consejo trabajado", "Associa un consiglio lavorato", "取り組んだアドバイスを紐づける", "Einen bearbeiteten Tipp verknüpfen", "ربط نصيحة تم العمل عليها", "关联一条练过的建议", "Koppel een tip waaraan je hebt gewerkt", "Associar uma dica trabalhada", "Koppla ett tips du jobbat med", "Привязать проработанный совет", "Powiąż poradę, nad którą pracowałaś", "연습한 조언 연결하기")
                : (nbCons === 1
                  ? T("1 conseil associé", "1 linked tip", "1 consejo asociado", "1 consiglio associato", "1件のアドバイス", "1 verknüpfter Tipp", "نصيحة واحدة مرتبطة", "已关联 1 条建议", "1 gekoppelde tip", "1 dica associada", "1 kopplat tips", "1 привязанный совет", "1 powiązana porada", "조언 1개 연결됨")
                  : T(nbCons + " conseils associés", nbCons + " linked tips", nbCons + " consejos asociados", nbCons + " consigli associati", nbCons + "件のアドバイス", nbCons + " verknüpfte Tipps", nbCons + " نصائح مرتبطة", nbCons + " 条已关联建议", nbCons + " gekoppelde tips", nbCons + " dicas associadas", (nbCons + " kopplade tips"), (nbCons + " " + (nbCons % 10 === 1 && nbCons % 100 !== 11 ? "привязанный совет" : (nbCons % 10 >= 2 && nbCons % 10 <= 4 && (nbCons % 100 < 10 || nbCons % 100 >= 20)) ? "привязанных совета" : "привязанных советов")), ("Powiązane porady: " + nbCons), (nbCons + "개의 조언 연결됨"))))),
          h("span", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 6, fontFamily: M, fontSize: 14, color: HJ.ivoire } },
            T("Choisir", "Choose", "Elegir", "Scegli", "選ぶ", "Wählen", "اختيار", "选择", "Kiezen", "Escolher", "Välj", "Выбрать", "Wybierz", "선택"),
            h("span", { "aria-hidden": "true", style: { fontSize: 22, lineHeight: 1, opacity: 0.8 } }, "›"))),
        nbCons ? h("div", { key: "csl", style: { display: "flex", flexDirection: "column", borderBottom: "1px solid " + LIGNE, paddingBottom: 6 } },
          conseils.map(function (c) {
            return h("div", { key: "cs" + c.id, style: { display: "flex", alignItems: "center", gap: 8, minHeight: 44, paddingInlineStart: 40 } },
              h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 13.5, color: "rgba(242,237,228,0.86)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, c.titre),
              h("button", { onClick: function () { setConseils(conseils.filter(function (x) { return String(x.id) !== String(c.id); })); }, "aria-label": T("Retirer", "Remove", "Quitar", "Rimuovi", "外す", "Entfernen", "إزالة", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제"),
                style: { flex: "0 0 auto", width: 44, height: 44, borderRadius: "50%", background: "transparent", border: 0, color: "rgba(242,237,228,0.72)", fontSize: 14, cursor: "pointer", padding: 0 } }, "✕"));
          })) : null], 22),

      err ? h("div", { style: { margin: "0 0 14px", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 13, lineHeight: 1.5 } }, err) : null,

      h("div", { role: "button", onClick: enregistrer,
        style: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 56, padding: "0 12px", borderRadius: 14, border: "1px solid " + HJ.reflet, background: "linear-gradient(180deg, #37788F 0%, " + HJ.pet + " 100%)", boxShadow: "0 6px 18px rgba(46,106,128,0.28)", color: HJ.ivoire, fontFamily: M, fontSize: 13.5, fontWeight: 600, letterSpacing: rtlHJ ? 0 : 2.2, textTransform: "uppercase", textAlign: "center", cursor: envoi ? "default" : "pointer", opacity: envoi ? 0.6 : 1, marginTop: 4, boxSizing: "border-box" } },
        envoi ? T("Enregistrement…", "Saving…", "Guardando…", "Salvataggio…", "保存中…", "Speichern…", "جار الحفظ…", "保存中…", "Opslaan…", "Salvando…", "Sparar…", "Сохранение…", "Zapisywanie…", "저장하는 중…") : T("Enregistrer ma séance", "Save my session", "Guardar mi sesión", "Salva la sessione", "保存する", "Einheit speichern", "حفظ حصتي", "保存我的训练", "Mijn training opslaan", "Salvar minha sessão", "Spara mitt ridpass", "Сохранить мою тренировку", "Zapisz mój trening", "훈련 저장")),

      (seance && seance.id) ? h("div", { role: "button", onClick: function () { setMode("lecture"); setErr(""); },
        style: { margin: "10px auto 0", width: "fit-content", fontFamily: M, fontSize: 13, color: HJ.gris, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", padding: "10px 14px", minHeight: 44, boxSizing: "border-box" } },
        T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")) : null);
  } else {
    /* 27/09 (421) : LE MODE LECTURE, meme langage visuel que le formulaire. RIEN n est ecrit ici :
       les anciennes valeurs sont seulement TRADUITES A L AFFICHAGE (« Obstacle » se lit « Saut »,
       une discipline inconnue s affiche telle quelle). note et a_retenir s affichent TOUS LES DEUX. */
    var se = seance || {};
    var cleL = (se.discipline_cle && HJ_DISC.indexOf(se.discipline_cle) >= 0) ? se.discipline_cle : hjReconnaitre(se.discipline);
    var discL = cleL
      ? ((cleL === "autre" && se.discipline && hjNorm(se.discipline) !== "autre") ? String(se.discipline) : hjLibDisc(cleL))
      : (se.discipline ? String(se.discipline) : "");
    var RESS_L = {
      bonnes: T("Bonnes sensations", "Good feelings", "Buenas sensaciones", "Buone sensazioni", "良い感覚", "Gutes Gefühl", "إحساس جيد", "感觉很好", "Goed gevoel", "Boas sensações", "Bra känsla", "Хорошие ощущения", "Dobre odczucia", "좋은 느낌"),
      mitigees: T("Sensations mitigées", "Mixed feelings", "Sensaciones mixtas", "Sensazioni contrastanti", "まあまあ", "Gemischtes Gefühl", "إحساس متفاوت", "感觉一般", "Wisselend gevoel", "Sensações mistas", "Blandade känslor", "Смешанные ощущения", "Mieszane odczucia", "그저 그런 느낌"),
      difficile: T("Séance difficile", "Tough session", "Sesión difícil", "Sessione difficile", "難しい稽古", "Schwierige Einheit", "حصة صعبة", "艰难的训练", "Zware training", "Sessão difícil", "Tufft ridpass", "Тяжёлая тренировка", "Trudny trening", "힘든 훈련")
    };
    var ressL = se.ressenti_cle ? (RESS_L[se.ressenti_cle] || String(se.ressenti_cle)) : "";
    var noteL = String(se.note || "").trim() ? String(se.note) : "";
    var arL = String(se.a_retenir || "").trim() ? String(se.a_retenir) : "";
    /* dir auto sur les textes ECRITS par la cavaliere : un texte francais reste lisible en arabe (point final a sa place). */
    var infoL = function (cle, ico, txt, coul) {
      return h("div", { key: cle, style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, maxWidth: "100%", minHeight: 28 } },
        ico,
        h("span", { dir: "auto", style: { minWidth: 0, fontFamily: M, fontSize: 14.5, lineHeight: 1.35, color: coul || "rgba(242,237,228,0.88)", overflowWrap: "anywhere" } }, txt));
    };
    var pastilleL = h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" } },
      h("span", { style: { width: 7, height: 7, borderRadius: "50%", background: HJ.champ } }));
    var infos = [];
    if (discL) infos.push(infoL("d", pastilleL, discL));
    if (se.lieu) infos.push(infoL("l", icoHJ("pin", 18, "rgba(242,237,228,0.84)"), String(se.lieu)));
    if (se.theme) infos.push(infoL("t", icoHJ("cible", 18, HJ.reflet), String(se.theme), "#8ECBD8"));

    corps = h("div", { style: { padding: "8px 16px 40px", minWidth: 0 } },
      /* discipline, lieu, theme : compacts, ils passent a la ligne plutot que de deborder */
      infos.length ? h("div", { style: { display: "flex", flexWrap: "wrap", columnGap: 18, rowGap: 8, paddingBottom: 16, marginBottom: 18, borderBottom: "1px solid " + LIGNE, minWidth: 0 } }, infos) : null,

      ressL ? sectionHJ("rsL", [
        h("div", { key: "r", style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, minWidth: 0 } },
          h("span", { style: { fontFamily: M, fontSize: 11, letterSpacing: ESP, textTransform: "uppercase", color: "rgba(242,237,228,0.86)", fontWeight: 500 } },
            T("Ressenti", "How it felt", "Sensaciones", "Sensazioni", "感覚", "Gefühl", "الإحساس", "感受", "Hoe het voelde", "Como foi", "Hur det kändes", "Ощущения", "Odczucia", "느낌")),
          h("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(214,182,118,0.72)", background: "rgba(46,106,128,0.28)", fontFamily: M, fontSize: 14, color: HJ.ivoire } },
            h("span", { "aria-hidden": "true", style: { width: 7, height: 7, borderRadius: "50%", background: HJ.champ, flex: "0 0 auto" } }), ressL))], 24) : null,

      /* RESUME : la note, puis « A retenir » a la suite, separe discretement - aucun des deux n est cache */
      sectionHJ("resL", [
        etiqHJ(T("Résumé de la séance", "Session summary", "Resumen de la sesión", "Riepilogo della sessione", "稽古のまとめ", "Zusammenfassung der Einheit", "ملخّص الحصة", "训练小结", "Samenvatting van de training", "Resumo da sessão", "Sammanfattning av ridpasset", "Итоги тренировки", "Podsumowanie treningu", "훈련 요약")),
        noteL ? h("div", { key: "n", dir: "auto", style: { fontFamily: M, fontSize: 16, lineHeight: 1.62, color: "#ECE8E0", whiteSpace: "pre-wrap", overflowWrap: "anywhere" } }, noteL) : null,
        arL ? h("div", { key: "a", style: noteL ? { marginTop: 18, paddingTop: 14, borderTop: "1px solid " + LIGNE } : {} },
          etiqHJ(T("À retenir", "To remember", "Para recordar", "Da ricordare", "覚えておくこと", "Merken", "للتذكر", "要点", "Om te onthouden", "Para lembrar", "Att komma ihåg", "Запомнить", "Do zapamiętania", "기억할 점")),
          h("div", { dir: "auto", style: { fontFamily: M, fontSize: 15.5, lineHeight: 1.6, color: "#ECE8E0", whiteSpace: "pre-wrap", overflowWrap: "anywhere" } }, arL)) : null,
        (!noteL && !arL) ? h("div", { key: "v", style: { fontFamily: M, fontSize: 14, color: "rgba(242,237,228,0.7)", fontStyle: "italic" } },
          T("Pas de note pour cette séance.", "No note for this session.", "Sin nota.", "Nessuna nota.", "メモなし。", "Keine Notiz.", "لا توجد ملاحظة لهذه الحصة.", "这次训练没有备注。", "Geen notitie bij deze training.", "Sem anotação para esta sessão.", "Ingen anteckning för det här ridpasset.", "Нет заметки к этой тренировке.", "Brak notatki do tego treningu.", "이 훈련에는 메모가 없어요.")) : null]),

      /* 27/09 (422) : les photos, en LECTURE - la galerie des souvenirs (vignettes separees, 8 px). */
      ((Array.isArray(seance && seance.medias) && seance.medias.length) || vidHJ) ? sectionHJ("souvL", [
        etiqHJ(T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "思い出", "Erinnerungen", "ذكريات", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억")),
        encartVidHJ(),   /* 27/09 (436) : l envoi continue apres « Enregistrer » */
        h("div", { key: "g" }, galerieHJ((seance && seance.medias) || [], null))]) : null,

      /* CONSEILS : chacun ouvre son conseil (logique inchangee) */
      conseils.length ? sectionHJ("consL", [
        h("div", { key: "t", style: { display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid " + LIGNE, marginBottom: 4 } },
          icoHJ("livre", 24, "rgba(242,237,228,0.85)"),
          h("div", { style: { fontFamily: M, fontSize: 11, letterSpacing: rtlHJ ? 0 : 1.8, textTransform: "uppercase", color: HJ.ivoire, fontWeight: 500 } },
            T("Conseils Hey Baby", "Hey Baby tips", "Consejos Hey Baby", "Consigli Hey Baby", "Hey Babyのアドバイス", "Hey-Baby-Tipps", "نصائح Hey Baby", "Hey Baby 建议", "Tips van Hey Baby", "Dicas do Hey Baby", "Hey Baby-tips", "Советы Hey Baby", "Porady Hey Baby", "Hey Baby 조언"))),
        h("div", { key: "l", style: { display: "flex", flexDirection: "column", borderBottom: "1px solid " + LIGNE } },
          conseils.map(function (c) {
            return h("div", { key: "cl" + c.id, role: "button",
              onClick: function () {
                try { window.__carnet = { quoi: "conseil", conseil: { ep: { id: c.id, reponse: "", cheval_nom: c.cheval }, etat: "a_travailler", priorite: false, titreSaisi: c.titre } }; } catch (eOo) { }
                setEcran("carnet-detail");
              },
              style: { display: "flex", alignItems: "center", gap: 10, minHeight: 52, paddingInlineStart: 36, cursor: "pointer" } },
              h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 14.5, color: "rgba(242,237,228,0.9)", lineHeight: 1.35 } }, c.titre),
              h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: HJ.ivoire, opacity: 0.7, fontSize: 22, lineHeight: 1 } }, "›"));
          }))], 24) : null,

      err ? h("div", { style: { margin: "0 0 16px", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5 } }, err) : null,

      h("div", { role: "button", onClick: function () { setMode("edition"); setConfSup(false); },
        style: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 54, padding: "0 12px", borderRadius: 14, border: "1px solid " + HJ.reflet, background: "rgba(46,106,128,0.22)", color: HJ.ivoire, fontFamily: M, fontSize: 13.5, fontWeight: 600, letterSpacing: rtlHJ ? 0 : 2.2, textTransform: "uppercase", textAlign: "center", cursor: "pointer", boxSizing: "border-box" } },
        T("Modifier ma séance", "Edit my session", "Modificar mi sesión", "Modifica la sessione", "編集する", "Einheit bearbeiten", "تعديل حصتي", "修改我的训练", "Mijn training aanpassen", "Editar minha sessão", "Redigera mitt ridpass", "Изменить мою тренировку", "Edytuj mój trening", "훈련 수정")),

      h("div", { role: "button", onClick: supprimer,
        style: { margin: "14px auto 0", width: "fit-content", fontFamily: M, fontSize: 12.5, color: confSup ? "#FF9B9B" : "rgba(242,237,228,0.7)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", padding: "10px 14px", minHeight: 44, boxSizing: "border-box" } },
        confSup
          ? T("Confirmer la suppression ?", "Confirm deletion?", "¿Confirmar la eliminación?", "Confermare l’eliminazione?", "削除しますか？", "Löschen bestätigen?", "تأكيد الحذف؟", "确认删除？", "Verwijderen bevestigen?", "Confirmar a exclusão?", "Bekräfta borttagningen?", "Подтвердить удаление?", "Potwierdzić usunięcie?", "삭제할까요?")
          : T("Supprimer cette séance", "Delete this session", "Eliminar esta sesión", "Elimina questa sessione", "この稽古を削除", "Diese Einheit löschen", "حذف هذه الحصة", "删除这次训练", "Deze training verwijderen", "Excluir esta sessão", "Ta bort det här ridpasset", "Удалить эту тренировку", "Usuń ten trening", "이 훈련 삭제")));
  }
  return h("div", { dir: (ctx.langue === "ar") ? "rtl" : undefined, lang: ctx.langue || undefined, style: { minHeight: "100vh", background: HJ.fond, color: HJ.ivoire, paddingBottom: 8 } },
    /* 27/09 (408) : barre d onglets cachee sur cet ecran ; date iOS alignee et bornee. */
    h("style", null, "body.hb-sans-barre .hype-barre-onglets{display:none !important} .hj-date{-webkit-appearance:none;appearance:none;min-width:0;max-width:100%} .hj-date::-webkit-date-and-time-value{text-align:left;min-height:1.3em} .hj-date::-webkit-calendar-picker-indicator{filter:invert(0.8)} .hj-rail::-webkit-scrollbar{display:none} .hj-in::placeholder,.hj-ta::placeholder{color:rgba(242,237,228,0.42);opacity:1;font-size:14px}"),
    /* 27/09 (421) : le bandeau photographique, en edition COMME en lecture. */
    bandeauHJ,
    corps,
    /* 16/09 (180) : le panneau qui sert a CHOISIR des conseils - le meme composant que celui
       de Mon carnet, avec la prop `onChoisir`. */
    hypeCalquePhoto(vuP, function () { setVuP(null); }),
    /* 27/09 (408) : LE PANNEAU DES CHEVAUX. Plein ecran, recherche locale, lignes de 50 px (56 px et miniatures au 420).
       Ordre : Aucun cheval, Cheval sans fiche, puis mes chevaux (siens + lies, charges comme avant),
       puis les chevaux de mes ecuries (regle 207), dedoublonnes par id. Aucune fiche n est jamais creee. */
    panCheval ? (function () {
      var q = hjNorm(rechCh);
      function garde(c) { return !q || hjNorm(c.nom).indexOf(q) >= 0; }
      var vus = {};
      var miens = (chevaux || []).filter(function (c) { if (!c || !c.id || vus[c.id]) return false; vus[c.id] = 1; return true; }).filter(garde);
      var ecurie = (chvEc || []).filter(function (c) { if (!c || !c.id || vus[c.id]) return false; vus[c.id] = 1; return true; }).filter(garde);
      function fermer() { setPanCheval(false); setSaisieLibre(false); }
      /* 27/09 (420) : MINIATURE RONDE a gauche de chaque ligne (a droite en arabe). Photo si la fiche
         en a une (object-fit cover, jamais deformee), sinon pictogramme neutre. « Aucun cheval » :
         rond vide barre ; « Cheval sans fiche » : pictogramme sur bord pointille. */
      function mini(vis) {
        if (!vis) return null;
        var pointille = vis === "libre";
        var photo = (vis && typeof vis === "object" && vis.photo) ? String(vis.photo) : "";
        return h("div", { "aria-hidden": "true", style: { position: "relative", flex: "0 0 auto", width: 40, height: 40, borderRadius: "50%", border: "1px " + (pointille ? "dashed" : "solid") + " rgba(242,237,228,0.30)", background: "#111617", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxSizing: "border-box" } },
          vis === "aucun"
            ? h("span", { style: { display: "block", width: 18, height: 1.5, background: "rgba(242,237,228,0.45)", transform: "rotate(-45deg)" } })
            : h("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: HJ.champ, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: { display: "block" } },
                h("path", { d: "M7 21v-2.6c0-2.2.9-3.9 2.4-5.4L8 10.6 5.6 12.1 3.8 10.4l4-5.6.6-2.6 2.2 2.1c3.6.2 6.6 2.9 7.5 7.1l1.2 9.6" }),
                h("path", { d: "M12.6 8.6h.01" })),
          photo ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(photo, 80, 80) : photo, alt: "", loading: "lazy", decoding: "async",
            onError: function (e) { try { e.target.style.display = "none"; } catch (eIm) { } },
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null);
      }
      function ligne(cle, txt, pris, onClick, sousTxt, vis) {
        return h("div", { key: cle, role: "button", onClick: onClick, style: { display: "flex", alignItems: "center", gap: 12, minHeight: 56, padding: "7px 4px", borderBottom: "1px solid rgba(242,237,228,0.07)", cursor: "pointer" } },
          mini(vis),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: M, fontSize: 16, color: pris ? HJ.ivoire : "#DCDDD9", fontWeight: pris ? 600 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, txt),
            sousTxt ? h("div", { style: { fontFamily: M, fontSize: 12, color: HJ.gris, marginTop: 2 } }, sousTxt) : null),
          pris ? h("span", { style: { flex: "0 0 auto", color: HJ.reflet, fontSize: 18 } }, "✓") : null);
      }
      function titreSec(txt) { return h("div", { key: "t" + txt, style: { fontFamily: M, fontSize: 10.5, letterSpacing: 1.8, textTransform: "uppercase", color: HJ.champ, fontWeight: 600, margin: "18px 4px 4px" } }, txt); }
      return h("div", { "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 9000, background: HJ.fond, display: "flex", flexDirection: "column" } },
        h("div", { style: { flex: "0 0 auto", padding: "calc(env(safe-area-inset-top) + 12px) 16px 10px", borderBottom: "1px solid rgba(242,237,228,0.08)" } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } },
            h("div", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 19, fontWeight: 600, color: HJ.ivoire } }, T("Choisir un cheval", "Choose a horse", "Elegir un caballo", "Scegli un cavallo", "馬を選ぶ", "Pferd wählen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u062d\u0635\u0627\u0646", "选择一匹马", "Kies een paard", "Escolher um cavalo", "Välj en häst", "Выбрать лошадь", "Wybierz konia", "말 선택")),
            h("button", { onClick: fermer, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { flex: "0 0 auto", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(242,237,228,0.16)", background: "transparent", color: HJ.ivoire, fontSize: 16, cursor: "pointer", padding: 0 } }, "✕")),
          h("input", { type: "search", dir: hjDirChamp(rechCh), value: rechCh, onChange: function (e) { setRechCh(e.target.value); }, placeholder: T("Rechercher un cheval", "Search a horse", "Buscar un caballo", "Cerca un cavallo", "馬を検索", "Pferd suchen", "\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u062d\u0635\u0627\u0646", "搜索马", "Een paard zoeken", "Procurar um cavalo", "Sök efter en häst", "Найти лошадь", "Wyszukaj konia", "말 검색"), style: stChamp })),
        h("div", { style: { flex: "1 1 0", minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", padding: "4px 16px calc(env(safe-area-inset-bottom) + 28px)" } },
          ligne("aucun", T("Aucun cheval", "No horse", "Ningún caballo", "Nessun cavallo", "馬なし", "Kein Pferd", "\u0628\u062f\u0648\u0646 \u062d\u0635\u0627\u0646", "没有马", "Geen paard", "Nenhum cavalo", "Ingen häst", "Нет лошади", "Brak konia", "말 없음"), !chevalId && !chevalLibre, function () { setChevalId(""); setChevalLibre(""); fermer(); }, null, "aucun"),
          ligne("libre", T("Cheval sans fiche…", "Horse without a profile…", "Caballo sin ficha…", "Cavallo senza scheda…", "未登録の馬…", "Pferd ohne Profil…", "\u062d\u0635\u0627\u0646 \u0628\u0644\u0627 \u0645\u0644\u0641\u2026", "没有档案的马…", "Paard zonder profiel…", "Cavalo sem ficha…", "Häst utan profil…", "Лошадь без карточки…", "Koń bez karty…", "등록 정보 없는 말…"), !!chevalLibre, function () { setSaisieLibre(!saisieLibre); },
            T("Tape son nom, aucune fiche n’est créée", "Type its name, no profile is created", "Escribe su nombre, no se crea ficha", "Scrivi il nome, nessuna scheda creata", "名前を入力（登録はしません）", "Namen eingeben, kein Profil wird angelegt", "\u0627\u0643\u062a\u0628\u064a \u0627\u0633\u0645\u0647\u060c \u0644\u0646 \u064a\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0623\u064a \u0645\u0644\u0641", "输入它的名字，不会创建档案", "Typ de naam, er wordt geen profiel aangemaakt", "Digite o nome dele, nenhuma ficha é criada", "Skriv dess namn, ingen profil skapas", "Введи её кличку, карточка не создаётся", "Wpisz jego imię, żadna karta nie zostanie utworzona", "이름을 입력하세요. 등록 정보는 만들어지지 않아요"), "libre"),
          saisieLibre ? h("div", { key: "saisie", style: { display: "flex", gap: 8, padding: "10px 0 6px", minWidth: 0 } },
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("input", { type: "text", dir: hjDirChamp(libreTmp), value: libreTmp, maxLength: 60, onChange: function (e) { setLibreTmp(e.target.value); }, placeholder: T("Nom du cheval", "Horse name", "Nombre del caballo", "Nome del cavallo", "馬の名前", "Name des Pferdes", "\u0627\u0633\u0645 \u0627\u0644\u062d\u0635\u0627\u0646", "马的名字", "Naam van het paard", "Nome do cavalo", "Hästens namn", "Кличка лошади", "Imię konia", "말 이름"), style: stChamp })),
            h("div", { role: "button", onClick: function () { var v = (libreTmp || "").trim(); if (!v) return; setChevalId(""); setChevalLibre(v); fermer(); },
              style: { flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "0 16px", borderRadius: 12, background: (libreTmp || "").trim() ? HJ.pet : "transparent", border: "1px solid " + HJ.reflet, color: HJ.ivoire, fontFamily: M, fontSize: 15, fontWeight: 600, cursor: "pointer", opacity: (libreTmp || "").trim() ? 1 : 0.5 } },
              T("Valider", "OK", "Aceptar", "OK", "決定", "OK", "\u062a\u0623\u0643\u064a\u062f", "确定", "OK", "OK", "OK", "ОК", "OK", "확인"))) : null,
          miens.length ? titreSec(T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "私の馬", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들")) : null,
          miens.map(function (c) { return ligne("m" + c.id, c.nom || "", String(chevalId) === String(c.id), function () { setChevalId(c.id); setChevalLibre(""); fermer(); }, null, { photo: c.photo_url || "" }); }),
          (chvEc === null || ecurie.length) ? titreSec(T("Chevaux de mes écuries", "Horses of my stables", "Caballos de mis cuadras", "Cavalli delle mie scuderie", "厩舎の馬", "Pferde meiner Ställe", "\u062e\u064a\u0648\u0644 \u0625\u0633\u0637\u0628\u0644\u0627\u062a\u064a", "我的马厩里的马", "Paarden van mijn stallen", "Cavalos das minhas cocheiras", "Hästar i mina stall", "Лошади моих конюшен", "Konie z moich stajni", "내 마구간의 말")) : null,
          chvEc === null ? h("div", { key: "chg", style: { fontFamily: M, fontSize: 13, color: HJ.gris, padding: "10px 4px" } }, T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Lädt…", "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…")) : null,
          ecurie.map(function (c) { return ligne("e" + c.id, c.nom || "", String(chevalId) === String(c.id), function () { setChevalId(c.id); setChevalLibre(""); fermer(); }, null, { photo: c.photo_url || "" }); }),
          (q && !miens.length && !ecurie.length) ? h("div", { key: "rien", style: { fontFamily: M, fontSize: 13.5, color: HJ.gris, padding: "16px 4px" } }, T("Aucun cheval ne correspond.", "No matching horse.", "Ningún caballo coincide.", "Nessun cavallo corrisponde.", "該当する馬はありません。", "Kein passendes Pferd.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u062d\u0635\u0627\u0646 \u0645\u0637\u0627\u0628\u0642.", "没有匹配的马。", "Geen passend paard.", "Nenhum cavalo encontrado.", "Ingen häst matchar.", "Подходящих лошадей нет.", "Żaden koń nie pasuje.", "일치하는 말이 없어요.")) : null));
    })() : null,
    panChoix ? h(PanneauConseilsHB, {
      onFermer: function () { setPanChoix(false); },
      dejaChoisis: dejaChoisis,
      onChoisir: function (x) {
        var deja = !!dejaChoisis[String(x.ep.id)];
        if (deja) setConseils(conseils.filter(function (c) { return String(c.id) !== String(x.ep.id); }));
        else setConseils(conseils.concat([{ id: x.ep.id, titre: x.titre, cheval: (x.ep && x.ep.cheval_nom) || "" }]));
      }
    }) : null);
}
window.HypeCarnetDetail = { CarnetDetail: EcranCarnetDetail };
})();
