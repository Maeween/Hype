/* HYPE ▸ 30/10/2026 — Page ÉCURIE DU CLUB (EcranGuilde), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~153 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranGuilde() {
  var h = React.createElement;
  var ctx = useApp();
  /* 01/09 (Blandine : « ma photo d'écurie Feinn apparaît sur les autres
     écuries ») — LA BANNIERE N'EST PLUS GARDEE SOUS UNE CLE GLOBALE.
     Elle l'etait sous `hype_club_banniere`, SANS le nom du club : la derniere
     banniere chargee s'affichait donc sur la page de n'importe quel club. Et
     l'effet ne remplacait l'image QUE s'il en trouvait une — un club sans
     banniere gardait donc celle du club precedent.
     ⚠️ L'ETAT DEMARRE A NULL et c'est l'effet, qui connait le club, qui le
     remplit — depuis le cache PROPRE A CE CLUB puis depuis la base.
     ⚠️ NE JAMAIS REVENIR A UNE CLE SANS LE NOM DU CLUB. */
  var banSt = React.useState(null);
  var banniere = banSt[0], setBanniere = banSt[1];
  var banRef = React.useRef(null);
  function choisirBanniere(e) {
    var f = e.target.files && e.target.files[0]; e.target.value = "";
    if (!f) return;
    var ancienneBan = banniere || null;
    /* ⚠️ 17/08 (session 138) — DEUX MANQUES ICI, meme cause que sur l avatar.
       (a) la teinte n etait pas transmise : cadre turquoise en dur, insensible au
       theme. (b) l original n etait pas conserve, alors que les trois autres
       ecrans le font (`hype_avatar_original`, `hype_ecurie_photo_orig`,
       `hype_cheval_photo_orig_<id>`).
       ⚠️ HONNETE : (b) n a AUCUN EFFET VISIBLE AUJOURD HUI. La banniere de club n a
       pas de bouton « Modifier » — zero occurrence dans le fichier — elle n est
       donc jamais reprise depuis sa source, seulement posee depuis un fichier
       neuf. On garde l original pour que le jour ou ce bouton existe, et pour
       l unification des six appels en une fonction commune, la brique soit la. */
    /* 30/08 (Blandine, option 2) — PLUS AUCUN RECADRAGE A L'ENVOI. La banniere
       etait forcee en 16:10 par `hypeRecadrer(f, 16/10, …)` : une photo verticale
       etait rognee AVANT enregistrement, et plus aucun reglage d'affichage ne
       pouvait recuperer ce qui avait ete jete. Elle part desormais dans ses
       proportions d'origine, comme les photos publiees depuis le 06/08.
       L'affichage sait deja gerer n'importe quelle proportion (contain + plafond
       de 720 px). Consequence assumee : chaque club aura une banniere de hauteur
       differente, de la panoramique au portrait.
       ⚠️ Les bannieres DEJA envoyees restent rognees en base — il faut les
       renvoyer pour en profiter. */
    hypePhotoDirecte(f).then(function (res) {
      if (!res) return;
      setBanniere(res.dataUrl);
      try { localStorage.setItem("hype_club_banniere:" + clefBanniereClub, res.dataUrl); } catch (eB) { }
      /* 17/08 : original conserve, sur le modele exact des trois autres ecrans. */
      try { if (res.original) localStorage.setItem("hype_club_banniere_orig", res.original); if (res.dataUrl) localStorage.setItem("hype_club_banniere_orig_pour", String(res.dataUrl).slice(0, 100)); } catch (eBo) { }
      if (typeof hypeEnregistrerPhoto === "function") {
        hypeEnregistrerPhoto("club", clefBanniereClub, res, ancienneBan).then(function (urlFinale) {
          setBanniere(urlFinale);
          try { localStorage.setItem("hype_club_banniere:" + clefBanniereClub, urlFinale); } catch (eB3) { }
        }).catch(function (err) {
          console.error("Echec enregistrement banniere de club", err);
          /* 14/08 : dire CE QUI a echoue. Le message passe-partout envoyait
             Blandine verifier une connexion qui marchait tres bien. */
          var raison = "";
          try { raison = (err && (err.__detail || err.message)) ? String(err.__detail || err.message) : ""; } catch (eR) { raison = ""; }
          try {
            window.alert(hypeT7("La bannière est bien affichée ici, mais elle n'a pas pu être enregistrée pour tout le club.", "The banner shows here, but it could not be saved for the whole club.", "El banner se muestra aqu\u00ed, pero no se pudo guardar para todo el club.", "Il banner appare qui, ma non \u00e8 stato possibile salvarlo per tutto il club.", "\u30d0\u30ca\u30fc\u306f\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u3066\u3044\u307e\u3059\u304c\u3001\u30af\u30e9\u30d6\u5168\u4f53\u306b\u306f\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Das Banner wird hier angezeigt, konnte aber nicht f\u00fcr den ganzen Verein gespeichert werden.", "\u062a\u0638\u0647\u0631 \u0627\u0644\u0644\u0627\u0641\u062a\u0629 \u0647\u0646\u0627\u060c \u0644\u0643\u0646 \u062a\u0639\u0630\u0631 \u062d\u0641\u0638\u0647\u0627 \u0644\u0644\u0646\u0627\u062f\u064a \u0643\u0644\u0647.", "横幅在这里显示正常，但没能为整个俱乐部保存下来。", "De banner wordt hier getoond, maar kon niet voor de hele manege opgeslagen worden.", "O banner aparece aqui, mas não foi possível salvá-lo para o clube todo.", "Bannern visas här, men den kunde inte sparas för hela klubben.", "Баннер отображается здесь, но его не удалось сохранить для всего клуба.", "Baner jest tu wyświetlany, ale nie udało się zapisać go dla całego klubu.", "배너는 여기에 잘 표시되지만, 클럽 전체에는 저장하지 못했어요.")
              + (raison ? ("\n\nRaison exacte : " + raison) : "")
              + hypeT7("\n\nElle reste visible sur ton téléphone.", "\n\nIt stays visible on your phone.", "\n\nSigue visible en tu tel\u00e9fono.", "\n\nResta visibile sul tuo telefono.", "\n\n\u3042\u306a\u305f\u306e\u7aef\u672b\u3067\u306f\u8868\u793a\u3055\u308c\u305f\u307e\u307e\u3067\u3059\u3002", "\n\nAuf deinem Handy bleibt es sichtbar.", "\n\n\u062a\u0628\u0642\u0649 \u0638\u0627\u0647\u0631\u0629 \u0639\u0644\u0649 \u0647\u0627\u062a\u0641\u0643.", "\n\n它仍会显示在你的手机上。", "\n\nHij blijft zichtbaar op je telefoon.", "\n\nEle continua visível no seu celular.", "\n\nDen förblir synlig på din telefon.", "\n\nОн остаётся виден на твоём телефоне.", "\n\nNadal jest widoczny na twoim telefonie.", "\n\n휴대폰에서는 계속 보여요."));
          } catch (eAl) { }
        });
      }
    });
  }
  var profil = ctx.profil, setEcran = ctx.setEcran, tr = ctx.tr;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (411) : arabe */
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var __thh = (typeof teinteHypeActive === "function") ? teinteHypeActive() : null;
  var TURQ = (__thh && __thh.principal) || "#7FA3AD", TURQL = (__thh && __thh.lumineux) || "#CFE3E8";
  function niveauGuilde(xp) { var n = 1, r = xp || 0, b = 200; while (r >= b) { r -= b; n++; b = Math.round(b * 1.4); } return { niveau: n, pct: Math.round(r / b * 100), reste: r, besoin: b }; }
  var _r = React.useState(null), reel = _r[0], setReel = _r[1];
  React.useEffect(function () { (async function () { try { if (typeof classementEcuries === "function") { var c = await classementEcuries(); if (c && c.data && c.data.length) setReel(c.data); } } catch (e) {} })(); }, []);
  var GUILDES_DEMO = [
    { nom: "Soci\u00e9t\u00e9 d'\u00c9quitation de Paris", membres: 26, hf: 58, res: 44, pod: 25 },
    { nom: "Haras de Jardy", membres: 31, hf: 63, res: 51, pod: 29 },
    { nom: "\u00c9trier de Paris", membres: 22, hf: 47, res: 38, pod: 20 },
    { nom: "Club Hippique du Touring", membres: 19, hf: 41, res: 33, pod: 18 },
    { nom: "Centre \u00c9questre de Chantilly", membres: 17, hf: 38, res: 29, pod: 16 },
    { nom: "UCPA Bois de Vincennes", membres: 24, hf: 40, res: 27, pod: 13 },
    { nom: "Poney Club de Rambouillet", membres: 14, hf: 28, res: 19, pod: 9 }
  ];
  var ecuriePrincipale = ((profil.club || profil.ecurie || "").trim()) || T("Mon \u00e9curie", "My stable", "Mi cuadra", "La mia scuderia", "\u99ac\u5c4b", "Mein Stall", "\u0625\u0633\u0637\u0628\u0644\u064a", "我的马厩", "Mijn stal", "Minha cocheira", "Mitt stall", "Моя конюшня", "Moja stajnia", "내 마구간") /* 27/07 : simple affichage (classement), meme repli neutre que le titre de l'ecran Ecurie. */;
  var _e2B = React.useState(""); var ecurie2Base = _e2B[0], setEcurie2Base = _e2B[1]; /* (343) */
  React.useEffect(function () {
    var vifE2 = true;
    (async function () {
      try {
        var uE2 = await utilisateurActuel();
        if (!uE2 || typeof supa === "undefined" || !supa) return;
        var rE2 = await supa.from("profiles").select("ecurie2").eq("id", uE2.id).maybeSingle();
        if (vifE2 && rE2 && rE2.data && rE2.data.ecurie2) setEcurie2Base(String(rE2.data.ecurie2).trim());
      } catch (eE2) { }
    })();
    return function () { vifE2 = false; };
  }, []);
  var ecurieSecondaire = ((profil.club2 || profil.ecurie2 || ecurie2Base || "").trim());
  /* 10/10 (792) : L'ÉCURIE CHOISIE EST RETENUE pendant la session (window.__hypeEcurieCourante, en mémoire seulement,
     remise à zéro à la fermeture de l'appli). Avant : choix gardé dans la page seulement, perdu dès qu'on en sortait —
     au retour d'une fiche cheval on retombait sur l'écurie du profil (Feinn) au lieu de la SEP. */
  /* 10/10 (830) Blandine : « je suis encore regulierement changee d ecurie quand je change de page ». CAUSE : chaque passage
     PAR UN LIEN (rendez-vous ou ecurie ouverts depuis la Communaute, une notification, la fiche d un cheval, la Team…)
     ouvrait la page Ecurie de ce club ET l enregistrait comme « mon ecurie du moment » : au prochain toucher sur l onglet
     Ecurie, on restait sur ce club. Desormais seul le CHOIX FAIT ICI (le selecteur d ecurie) est retenu ; une visite par
     lien est une visite, l onglet Ecurie revient ensuite a l ecurie choisie. */
  var visiteParLienRef = React.useRef(false);
  var _mcG = React.useState(function () { try { var o = (typeof window !== "undefined") && window.__guildeEcurie; if (o) { window.__guildeEcurie = null; visiteParLienRef.current = true; window.__hypeEcurieVisite = String(o).trim(); return String(o).trim(); } var ov = (typeof window !== "undefined") && window.__hypeEcurieVisite; if (ov) { visiteParLienRef.current = true; return String(ov).trim(); }   /* (830) retour d une page ouverte pendant la visite : on reste sur le club visite */ var oc = ((typeof window !== "undefined") && window.__hypeEcurieCourante) || hypeMemEc("courante"); if (oc) return String(oc).trim(); } catch (eO) { } return null; });
  var clubForce = _mcG[0], setClubForce = _mcG[1];
  React.useEffect(function () { if (visiteParLienRef.current) { visiteParLienRef.current = false; return; } try { window.__hypeEcurieCourante = clubForce || null; window.__hypeEcurieVisite = null; hypeMemEc("courante", clubForce || null); } catch (eEc) { } }, [clubForce]);   /* (830) la 1re valeur venue d un lien n est pas retenue */
  var monClub = clubForce || ecuriePrincipale;
  var clefBanniereClub = (typeof clefClubG === "function") ? clefClubG(monClub) : (monClub || "").toLowerCase().trim();
  /* Nettoyage de l'ancienne cle globale : sans ca, elle resterait sur les
     telephones qui l'ont deja, sans plus jamais servir. */
  React.useEffect(function () { try { localStorage.removeItem("hype_club_banniere"); } catch (eOld) { } }, []);
  var _moiBan = React.useState(null); var moiBanniere = _moiBan[0], setMoiBanniere = _moiBan[1];
  React.useEffect(function () { (async function () { try { var u = await utilisateurActuel(); setMoiBanniere(u || null); } catch (e) { } })(); }, []);
  var peutEditerBanniere = !!(moiBanniere && typeof clubRevendiquePar === "function" && clubRevendiquePar(monClub, moiBanniere));
  /* ── 01/10 (534) — LA COULEUR DE L'ECURIE. Demande de Blandine : comme la fiche cheval (bleu / dore / bordeaux /
     vert), mais la couleur APPARTIENT A L'ECURIE affichee (elle change quand on passe d'une ecurie a l'autre) et se
     choisit par ses responsables (proprietaire ou gestionnaire ; la base tranche : hype_peut_gerer_club).
     Table club_teintes (cle = clefClubG du nom). Dore = le dore doux de la page Team (#D6B676).
     Cache local PAR ECURIE (affichage immediat) ; la base fait foi. ── */
  var TEINTES_ECURIE = [["", "#7FA3AD"], ["#D6B676", "#D6B676"], ["#C64B5C", "#C64B5C"], ["#5C7A5E", "#5C7A5E"]];
  var _tcG = React.useState(function () { try { return localStorage.getItem("hype_club_teinte:" + clefBanniereClub) || ""; } catch (eTc) { return ""; } });
  var teinteClub = _tcG[0], setTeinteClub = _tcG[1];
  var _tgG = React.useState(false); var gereTeinte = _tgG[0], setGereTeinte = _tgG[1];
  var _tbG = React.useState(""); var errTeinte = _tbG[0], setErrTeinte = _tbG[1];
  var _mpG = React.useState(false); var menuPhotoG = _mpG[0], setMenuPhotoG = _mpG[1];   /* (535) menu photo, comme la fiche cheval */
  React.useEffect(function () {
    var vifT = true;
    try { setTeinteClub(localStorage.getItem("hype_club_teinte:" + clefBanniereClub) || ""); } catch (eT0) { setTeinteClub(""); }
    setErrTeinte("");
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !clefBanniereClub) return;
        var rT = await supa.from("club_teintes").select("teinte").eq("club_clef", clefBanniereClub).maybeSingle();
        if (!vifT || !rT || rT.error) return;
        var tT = (rT.data && rT.data.teinte) || "";
        setTeinteClub(tT);
        try { if (tT) localStorage.setItem("hype_club_teinte:" + clefBanniereClub, tT); else localStorage.removeItem("hype_club_teinte:" + clefBanniereClub); } catch (eT1) { }
      } catch (eT2) { }
    })();
    return function () { vifT = false; };
  }, [clefBanniereClub]);
  React.useEffect(function () {
    var vifG = true;
    (async function () {
      try {
        if (!moiBanniere || !moiBanniere.id) { setGereTeinte(false); return; }
        if (peutEditerBanniere) { setGereTeinte(true); return; }
        var rGs = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", clefBanniereClub).eq("user_id", moiBanniere.id).limit(1);
        if (vifG) setGereTeinte(!!(rGs && rGs.data && rGs.data.length));
      } catch (eGs) { if (vifG) setGereTeinte(false); }
    })();
    return function () { vifG = false; };
  }, [clefBanniereClub, moiBanniere && moiBanniere.id, peutEditerBanniere]);
  async function choisirTeinteClub(val) {
    var avant = teinteClub;
    setTeinteClub(val); setErrTeinte("");
    try {
      var rS = await supa.from("club_teintes").upsert({ club_clef: clefBanniereClub, teinte: val || null }, { onConflict: "club_clef" }).select("teinte");
      if (rS && rS.error) throw rS.error;
      if (!rS || !rS.data || !rS.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base de datos", "rifiutato dal database", "データベースに拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      try { if (val) localStorage.setItem("hype_club_teinte:" + clefBanniereClub, val); else localStorage.removeItem("hype_club_teinte:" + clefBanniereClub); } catch (eT3) { }
    } catch (eS) { setTeinteClub(avant); setErrTeinte(String((eS && eS.message) || eS)); }
  }
  if (teinteClub) { TURQ = teinteClub; TURQL = (typeof teinteClaire === "function") ? teinteClaire(teinteClub) : teinteClub; }
  function rgbDeG(hx) { try { var h9 = String(hx).replace("#", ""); return parseInt(h9.substr(0, 2), 16) + "," + parseInt(h9.substr(2, 2), 16) + "," + parseInt(h9.substr(4, 2), 16); } catch (eR) { return "32,217,245"; } }
  var RGBT = rgbDeG(TURQ), RGBTL = rgbDeG(TURQL);
  /* (536) REGLE SOBRE (validee par Blandine) : sur cette page, les transparences de couleur (contours, lueurs,
     fonds legers) deviennent NEUTRES ; la couleur pleine (TURQ / TURQL) reste sur quelques touches. */
  var RGBA_ACC = RGBT; RGBT = "255,255,255"; RGBTL = "255,255,255";
  try { window.__teinteEcurieActive = { c: TURQ, cl: TURQL, rgb: RGBA_ACC }; } catch (eTa) { }
  React.useEffect(function () { return function () { try { window.__teinteEcurieActive = null; } catch (eTz) { } }; }, []);
  React.useEffect(function () {
    (async function () {
      try {
        if (!clefBanniereClub) { setBanniere(null); return; }
        /* Cache propre a ce club : affichage immediat, sans attendre la base. */
        try { setBanniere(localStorage.getItem("hype_club_banniere:" + clefBanniereClub) || null); } catch (eCache) { setBanniere(null); }
        if (typeof supa === "undefined" || !supa) return;
        var rB = await supa.from("tableaux_clubs").select("contenu").eq("cle", "club-banniere:" + clefBanniereClub).maybeSingle();
        var contenuB = (rB && rB.data && rB.data.contenu) || null;
        if (!contenuB && typeof noyauEcurie === "function") { /* 06/08 : la banniere posee sous une autre variante du nom ("Ecurie Feinn" vs "Feinn") est retrouvee par noyau */
          try { var nyB = noyauEcurie(monClub); var rB2 = await supa.from("tableaux_clubs").select("cle, contenu").ilike("cle", "club-banniere:%").limit(50);
            (((rB2 && rB2.data) || [])).some(function (lB) { if (lB && lB.contenu && noyauEcurie(String(lB.cle || "").slice("club-banniere:".length)) === nyB) { contenuB = lB.contenu; return true; } return false; });
          } catch (eBn) { } }
        /* ⚠️ ON POSE LE RESULTAT MEME QUAND IL EST VIDE : un club sans banniere
           doit en avoir AUCUNE, pas celle du club regarde juste avant. */
        setBanniere(contenuB || null);
        try {
          if (contenuB) localStorage.setItem("hype_club_banniere:" + clefBanniereClub, contenuB);
          else localStorage.removeItem("hype_club_banniere:" + clefBanniereClub);
        } catch (eB2) { }
      } catch (eBc) { }
    })();
  }, [clefBanniereClub]);
  var _mb = React.useState(null), membres = _mb[0], setMembres = _mb[1];
  var _pc = React.useState(null), photosClub = _pc[0], setPhotosClub = _pc[1];
  var _cvc = React.useState(null), chevauxClub = _cvc[0], setChevauxClub = _cvc[1];
  var _lcl = React.useState({}), liensClub = _lcl[0], setLiensClub = _lcl[1]; /* etape 2 : nb de cavalieres par cheval */
  var _rsc = React.useState(null), resultatsClub = _rsc[0], setResultatsClub = _rsc[1];
  /* 30/08 — le rail aux coupes et l'etat d'epinglage. railClub est CALCULE, jamais
     saisi : il vient du classement automatique, l'epinglage ne fait que le devancer. */
  var _rl = React.useState(null), railClub = _rl[0], setRailClub = _rl[1];
  /* 01/09 : la table des chevaux du rail — { id: { nom, photo } }. */
  var _chr = React.useState({}), chevauxRail = _chr[0], setChevauxRail = _chr[1];
  /* 31/08 — declare ICI, dans EcranGuilde. Il etait par erreur dans EcranCheval :
     ReferenceError au rendu de la page club. MEME FAUTE QUE `moi` le 30/08 —
     verifier le composant reel avant d'ajouter un identifiant, pas la ligne
     voisine qui a l'air proche. */
  var BADGE_CHEMINS = ["images/hype-club-officiel.png", "hype-club-officiel.png"];
  var _bi = React.useState(0), badgeIdx = _bi[0], setBadgeIdx = _bi[1];
  var badgeKo = badgeIdx >= BADGE_CHEMINS.length;
  var _epE = React.useState(null), epErr = _epE[0], setEpErr = _epE[1];
  async function basculerEpingle(gg) {
    try {
      var cible = (gg.places || []).filter(function (pp) { return pp.id && !pp.saisi; })[0];
      if (!cible) { setEpErr(T("Ce r\u00e9sultat a \u00e9t\u00e9 saisi \u00e0 la main : il ne peut pas encore \u00eatre \u00e9pingl\u00e9.", "This result was typed by hand: it can't be pinned yet.", "Este resultado fue escrito a mano: a\u00fan no puede fijarse.", "Questo risultato \u00e8 stato inserito a mano: non pu\u00f2 ancora essere fissato.", "\u624b\u5165\u529b\u306e\u7d50\u679c\u306f\u307e\u3060\u56fa\u5b9a\u3067\u304d\u307e\u305b\u3093\u3002", "Dieses Ergebnis wurde manuell erfasst und kann noch nicht angeheftet werden.", "\u0623\u062f\u062e\u0644\u062a \u0647\u0630\u0647 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u064a\u062f\u0648\u064a\u0627: \u0644\u0627 \u064a\u0645\u0643\u0646 \u062a\u062b\u0628\u064a\u062a\u0647\u0627 \u0628\u0639\u062f.", "这个成绩是手动录入的，暂时还不能置顶。", "Dit resultaat is met de hand ingevoerd: het kan nog niet vastgepind worden.", "Este resultado foi digitado à mão: ainda não pode ser fixado.", "Det här resultatet har skrivits in för hand: det går inte att fästa än.", "Этот результат введён вручную: его пока нельзя закрепить.", "Ten wynik został wpisany ręcznie: na razie nie można go przypiąć.", "이 결과는 직접 입력한 것이라 아직 고정할 수 없어요.")); return; }
      var r5 = await supa.from("resultats").update({ epingle: !gg.epingle }).eq("id", cible.id);
      if (r5 && r5.error) { setEpErr(String(r5.error.message || r5.error)); return; }
      setEpErr(null);
      try { window.dispatchEvent(new Event("hype-souvenirs-maj")); } catch (eEv2) { }
    } catch (eB) { setEpErr(String((eB && eB.message) || eB)); }
  }
  /* 22/09 (385) - LA COURSE ENTRE DEUX CHARGEMENTS. Ses deux videos de 20 h 47 : bascule vers la
     SEP juste apres l arrivee sur la page -> en-tete et cavaliers de la SEP, mais CHEVAUX et RESULTATS
     de Feinn (l inverse en la laissant charger d abord : tout juste). CAUSE : ce chargement (long,
     plusieurs lectures) ne s annulait pas quand monClub changeait ; celui de Feinn, parti le premier,
     finissait APRES celui de la SEP et ECRASAIT ses chevaux et ses resultats. CORRECTIF : un jeton par
     chargement ; un chargement depasse par un plus recent ne pose plus rien (setters gardes). */
  var _setChevauxClubBrut = setChevauxClub, _setChevauxRailBrut = setChevauxRail, _setLiensClubBrut = setLiensClub, _setMembresBrut = setMembres, _setPhotosClubBrut = setPhotosClub, _setRailClubBrut = setRailClub, _setResultatsClubBrut = setResultatsClub;
  var jetonClubRef = React.useRef(0);
  React.useEffect(function () { (async function () {
    var jetonG = (jetonClubRef.current = (jetonClubRef.current || 0) + 1);
    var vifG = function () { return jetonClubRef.current === jetonG; };
    var setChevauxClub = function (v) { if (vifG()) _setChevauxClubBrut(v); };
    var setChevauxRail = function (v) { if (vifG()) _setChevauxRailBrut(v); };
    var setLiensClub = function (v) { if (vifG()) _setLiensClubBrut(v); };
    var setMembres = function (v) { if (vifG()) _setMembresBrut(v); };
    var setPhotosClub = function (v) { if (vifG()) _setPhotosClubBrut(v); };
    var setRailClub = function (v) { if (vifG()) _setRailClubBrut(v); };
    var setResultatsClub = function (v) { if (vifG()) _setResultatsClubBrut(v); };
    var idsMembres = [];
    try { if (typeof supa !== "undefined" && supa) {
      var mm = [];
      /* 03/09 : la fonction unique remplace les deux ILIKE, aveugles aux accents. */
      try { mm = await hypeCavaliersDuClub(monClub, "id, pseudo, avatar_url, ville, ecurie, ecurie2"); } catch (eHc) { mm = []; }
      /* Filet de secours si la requete large echoue (RLS, plafond) : les deux
         anciens ILIKE, mais leur resultat passe MAINTENANT par hypeMemeClub —
         un motif seul ne decide plus de rien. */
      if (!mm.length) {
        var motifClubG = (typeof motifEcurie === "function") ? motifEcurie(monClub) : ("%" + (((typeof noyauEcurie === "function") && noyauEcurie(monClub)) || monClub) + "%");
        var brut = [];
        try { var r = await supa.from("profiles").select("id, pseudo, avatar_url, ville, ecurie, ecurie2").ilike("ecurie", motifClubG).limit(40); if (r && r.data) brut = brut.concat(r.data); } catch (eM1) { }
        try { var r2b = await supa.from("profiles").select("id, pseudo, avatar_url, ville, ecurie, ecurie2").ilike("ecurie2", motifClubG).limit(40); if (r2b && r2b.data) brut = brut.concat(r2b.data); } catch (eM2) { }
        mm = brut.filter(function (pB) {
          if (!pB) return false;
          var b1 = String(pB.ecurie || "").trim(), b2 = String(pB.ecurie2 || "").trim();
          return (!!b1 && hypeMemeClub(b1, monClub)) || (!!b2 && hypeMemeClub(b2, monClub));
        });
      }
      var vusM = {}; mm = mm.filter(function (p) { if (!p || !p.id || vusM[p.id]) return false; vusM[p.id] = true; return true; });
      /* 🟩 06/09 (Blandine) — les cavaliers retires de cette ecurie disparaissent ici,
   AVANT tout le monde (setMembres alimente aussi bien la grille des membres que la liste
   qui sert de source aux chevaux affiches). Aucun profil n'est modifie, seule la presence
   dans CETTE liste change. */
      try {
        var exclusR = await cavaliersExclusEcurie(monClub);
        var idsExclus = {}; ((exclusR && exclusR.data) || []).forEach(function (idX) { idsExclus[idX] = true; });
        mm = mm.filter(function (pX) { return pX && !idsExclus[pX.id]; });
      } catch (eExR) { }
      if (mm.length) { setMembres(mm); idsMembres = mm.map(function (p) { return p.id; }); }
    } } catch (eM) { }
    /* (546) lancee SANS attendre : les resultats ne patientent plus derriere */ (async function () { try { if (typeof supa !== "undefined" && supa) { var m = await supa.from("mur_evenement").select("photo_url, auteur, created_at").eq("evenement", "club:" + monClub).order("created_at", { ascending: false }).limit(60); if (m && m.data) { var ph = m.data.filter(function (p) { return p && p.photo_url; }).slice(0, 12); if (ph.length) setPhotosClub(ph); } } } catch (eP) { } })();
    /* 10/10 (854) Blandine (choix 2A) : la page montre AUSSI les chevaux rattaches a cette ecurie (colonne club)
       meme si leur proprietaire n en est pas (encore) membre — ex. un cheval installe depuis l invitation
       « Un box virtuel chez Hype ? » d une ecurie visitee. */
    var chevauxRattaches = [];
    try { var motifCl = String(monClub || "").trim().replace(/[\\%_]/g, function (cE) { return "\\" + cE; }); if (motifCl && typeof supa !== "undefined" && supa) { var rRat = await supa.from("chevaux").select("id, user_id, nom, race, discipline, photo_url, palmares, club").ilike("club", motifCl).is("supprime_le", null).order("created_at", { ascending: false }).limit(300); chevauxRattaches = (rRat && rRat.data) || []; } } catch (eRat) { }
    if (!idsMembres.length) setChevauxClub(chevauxRattaches);   /* 10/10 (852) ecurie sans membre (la plupart des 3 145 pages publiques) : on montre seulement ses chevaux rattaches, sinon la liste VIDE (invitation) */
    if (idsMembres.length) {
      try { var cv = await supa.from("chevaux").select("id, user_id, nom, race, discipline, photo_url, palmares, club").in("user_id", idsMembres).is("supprime_le", null).order("created_at", { ascending: false }).limit(500);
      try { if (cv && cv.data && chevauxRattaches.length) { var vusRat = {}; cv.data.forEach(function (cR) { vusRat[cR.id] = 1; }); cv = { data: cv.data.concat(chevauxRattaches.filter(function (cR) { return !vusRat[cR.id]; })), error: cv.error }; } } catch (eMr) { }   /* (854) + chevaux rattaches */
      /* 01/09 — LE FILTRE PAR ECURIE. Un cheval paraît sur cette page si son
         `club` designe CE club, ou s'il n'en a AUCUN.
         ⚠️ LE VIDE PASSE TOUJOURS : les chevaux crees avant cette colonne ne
         doivent pas disparaitre le jour de la livraison. Ne jamais durcir ce
         filtre sans avoir renseigne toute la table.
         ⚠️ COMPARAISON PAR NOYAU, comme la recherche des membres : « Feinn »,
         « Ecurie Feinn » et « Écurie Feinn » designent le meme club. */
      /* 03/09 : fonction unique. ⚠️ Cette version-ci comparait les noyaux par EGALITE
         STRICTE alors que les quatre autres ecrans toleraient l'inclusion — deux
         regles differentes pour la meme question. hypeMemeClub tranche pour tous. */
      try { if (cv && cv.data) cv = { data: hypeChevauxDuClub(cv.data, monClub), error: cv.error }; } catch (eFc) { } if (cv && cv.data && cv.data.length) { /* 01/09 (Blandine : « les chevaux avaient disparu et ils sont revenus d'un coup ») — AFFICHER D'ABORD, CLASSER ENSUITE. Le classement XP lance cinq requetes : tant qu'elles tournaient, la liste restait vide — grille du club sans rien, et sur la page Cavalier le vide faisait remonter les fiches de DEMONSTRATION. La liste est donc posee immediatement dans l'ordre de la base, puis reposee classee quand le classement revient. Ne jamais remettre le tri AVANT le premier affichage. */ setChevauxClub(cv.data); try { /* (546) sans attendre : 5 requetes qui retardaient les resultats */ Promise.resolve(classerChevauxParXp(cv.data)).then(function (cvTri) { if (cvTri && cvTri.length) setChevauxClub(cvTri); }, function () { }); } catch (eXg) { } /* 28/08 : plafond 24 -> 500 (demande Blandine, "tous les chevaux de l'ecurie") -- l'ecurie Feinn a deja 27 chevaux, 3 etaient invisibles */
        /* (546) lancee SANS attendre */ (async function () { try { /* etape 2 : proprietaire (1) + liens — meme table que la page commune */
          var idsCv = cv.data.map(function (c) { return c.id; });
          var rLi = await supa.from("chevaux_liens").select("cheval_id").in("cheval_id", idsCv);
          var cptes = {}; cv.data.forEach(function (c) { cptes[c.id] = 1; });
          ((rLi && rLi.data) || []).forEach(function (l) { if (cptes[l.cheval_id] != null) cptes[l.cheval_id] += 1; });
          setLiensClub(cptes);
        } catch (eLi) { } })(); } else if (cv && !cv.error) { setChevauxClub([]); /* 10/10 (852) aucun cheval : la liste devient VIDE (avant : restait « … » pour toujours, l invitation ne s affichait jamais) */ } } catch (eCv) { }
      /* 02/08 : les resultats vivent a DEUX endroits qui ne se parlaient pas — la table
         resultats (fil, communaute) et la colonne JSON chevaux.palmares (saisie depuis la fiche
         cheval). La page club ne lisait que la premiere : tout ce que Blandine ajoutait sur la
         fiche d un cheval n apparaissait jamais dans le palmares du club. On lit desormais les
         deux et on fusionne. Rien n est ecrit, rien n est supprime : lecture seule.
         NB : la table resultats n a pas de colonne cheval_id, on ne peut donc PAS faire
         l inverse (rattacher un resultat de la table a un cheval precis). Ce point attend une
         decision de schema. */
      try {
        var rs = await supa.from("resultats").select("id, user_id, cheval_id, concours, epreuve, partants, date_epreuve, cavalier, classement, photo_url, created_at, visible, quart") /* 30/08 : epreuve + partants + date ajoutes pour REGROUPER les classes du club sur une meme epreuve (choix de Blandine sur maquette) */.in("user_id", idsMembres).order("date_epreuve", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false }).limit(300); /* 30/08 : vivier 200 -> 300 (demande Blandine) */
        /* 30/08 (Blandine : « pourquoi que des resultats de 2023 ») — LA CAUSE ETAIT ICI.
           La requete triait par created_at (date d'IMPORT) et ne prenait que 24 lignes :
           la base renvoyait donc les 24 derniers IMPORTS, tous portant sur des concours
           2023. Mon tri par date reelle, fait ensuite en JavaScript, n'avait plus que du
           2023 a classer. Desormais c'est la BASE qui trie par date_epreuve, et le vivier
           passe a 200 lignes — necessaire car le regroupement par epreuve reduit beaucoup.
           Lecon : un tri cote client ne repare jamais un mauvais tri cote serveur, il ne
           reorganise que ce que le serveur a bien voulu envoyer. */
        /* 30/08 (Blandine : « faut ajouter le cheval ») — un meme cavalier peut courir
           la MEME epreuve avec DEUX chevaux : « 5e Evan Roux » puis « 9e Evan Roux »
           etait juste, mais illisible. `resultats.cheval_id` existe (la note du 02/08
           qui disait le contraire est perimee) et les chevaux du club sont deja
           charges dans `cv` : on construit la table des noms, aucune requete de plus. */
        var nomsChevaux = {};
        /* 01/09 (Blandine) — LE PORTRAIT DU CHEVAL SUR LES CARTES DU PALMARES.
           `cv` porte deja `photo_url` : on construit la meme table que les noms,
           sans une requete de plus. Les chevaux HORS du club sont cherches plus
           bas, une seule fois, et seulement s'il en manque. */
        var chevauxRail = {};
        try {
          ((cv && cv.data) || []).forEach(function (cN) {
            if (!cN || !cN.id) return;
            nomsChevaux[cN.id] = cN.nom || "";
            chevauxRail[cN.id] = { nom: cN.nom || "", photo: cN.photo_url || "" };
          });
        } catch (eNc) { }
        var fusionR = [];
        /* 30/08 (Blandine : « ca c'est pas les derniers resultats ») — le tri se faisait
           sur created_at, la date d'IMPORT, pas sur la date du concours. On trie
           desormais sur date_epreuve quand elle existe, created_at sinon. */
        /* 02/09 (Blandine : « sur la page de la SEP les derniers resultats sont ceux des
           cavaliers Feinn ») — CAUSE ETABLIE, requete de controle a l'appui : la liste des
           membres est JUSTE (15 profils, tous reellement SEP). Mais Blandine appartient aux
           DEUX clubs, donc TOUS ses resultats remontaient ici, y compris ceux de ses chevaux
           de Feinn — avec le nom du cavalier ecrit sur la ligne FFE, d'ou « Evan Roux » et
           « Ilona Hugot » sur la page SEP.
           Les CHEVAUX etaient deja filtres par club depuis le 01/09 ; les RESULTATS, non.
           On applique le meme filtre : une ligne rattachee a un cheval d'un AUTRE club est
           ecartee. ⚠️ Une ligne sans cheval identifie passe toujours — on ne fait pas
           disparaitre une saisie qu'on ne sait pas rattacher. */
        /* 02/09 (corrige apres retour de Blandine : « s'ils n'avaient pas de club ils
           s'afficheraient non ») — elle a raison, et ma premiere version s'appuyait sur
           `cv` en SUPPOSANT qu'il etait deja filtre par club. On ne suppose plus : la
           regle est appliquee ICI, explicitement, cheval par cheval. */
        var chevauxDuClubR = {};
        try { hypeChevauxDuClub((cv && cv.data) || [], monClub).forEach(function (cR) { if (cR && cR.id) chevauxDuClubR[cR.id] = 1; }); } catch (eCr) { }
        var filtreClubR = function (rr) {
          if (!rr || !rr.cheval_id) return true;
          return !!chevauxDuClubR[rr.cheval_id];
        };
        hypeReparerLignes(((rs && rs.data) || []).filter(estResultatAffichableEnFil).filter(filtreClubR)).forEach(function (rr) { /* 02/09 : accents FFE */
          var tps = 0;
          try { if (rr.date_epreuve) tps = new Date(rr.date_epreuve).getTime() || 0; } catch (eT1) { }
          if (!tps) { try { tps = new Date(rr.created_at).getTime() || 0; } catch (eT0) { } }
          fusionR.push(Object.assign({}, rr, { __tri: tps }));
        });
        try {
          ((cv && cv.data) || []).forEach(function (chC) {
            var pl = null; try { pl = (typeof chC.palmares === "string") ? JSON.parse(chC.palmares) : chC.palmares; } catch (ePc) { }
            (((pl && pl.length) ? pl : [])).forEach(function (pr, iPr) {
              if (!pr || !pr.event) return;
              var an = parseInt(pr.annee, 10);
              fusionR.push({ id: "pl-" + chC.id + "-" + iPr, user_id: chC.user_id, concours: pr.event, classement: pr.rang || "", photo_url: null, created_at: null, dateLabel: String(pr.annee || ""), cheval: chC.nom || "", cheval_id: chC.id, __saisi: true, __tri: (an ? Math.min(Date.UTC(an, 11, 31), Date.now()) : 0) }); /* 30/08 : plafonne a aujourd hui — une saisie « 2026 » etait datee du 31/12/2026 et passait devant tous les vrais resultats */ /* 30/08 : __saisi marque les resultats ecrits a la main sur une fiche cheval — ils ne portent AUCUN nom de cavalier, on ne doit donc jamais leur en inventer un */
            });
          });
        } catch (ePl) { }
        /* 30/08 (regle de Blandine) : « les donnees rentrees a la main ne s'affichent
           que si pas de resultat officiel rentre ». Des qu'un seul resultat importe
           existe pour le club, les saisies manuelles disparaissent du palmares — elles
           n'ont ni epreuve, ni partants, ni cavalier, et faisaient des cartes pauvres
           au milieu des vraies. Rien n'est supprime en base : lecture seule. */
        var aOfficiel = fusionR.some(function (x9) { return !x9.__saisi; });
        if (aOfficiel) fusionR = fusionR.filter(function (x9) { return !x9.__saisi; });
        fusionR.sort(function (aF, bF) { return (bF.__tri || 0) - (aF.__tri || 0); });
        /* 30/08 — REGROUPEMENT PAR EPREUVE (demande Blandine : « s'il y a plusieurs
           classes ça affiche tous les classements sur la meme ligne ? genre 1er Liam,
           2e Daphnee, 3e Elea »). La cle inclut l'EPREUVE : sans elle, deux epreuves
           du meme jour au meme concours se melangeraient, ce qui serait faux. */
        var grp = {}, ordreG = [];
        fusionR.forEach(function (rr) {
          var anG = String(rr.dateLabel || "");
          if (!anG && rr.date_epreuve) anG = String(rr.date_epreuve).slice(0, 4);
          if (!anG && rr.created_at) { try { anG = String(new Date(rr.created_at).getFullYear()); } catch (eA1) { } }
          var cle = [String(rr.concours || ""), String(rr.epreuve || ""), String(rr.date_epreuve || anG || "")].join("|");
          if (!grp[cle]) {
            /* 19/09 (246) : la DATE entre dans le groupe. Sa demande : « rajouter la date
               sur les deux pour pas qu on confonde les epreuves ». Deux epreuves du meme
               nom au meme concours la meme annee etaient indistinguables. */
            grp[cle] = { cle: cle, an: anG, d: rr.date_epreuve || "", concours: rr.concours || "", epreuve: rr.epreuve || "", partants: rr.partants || null, photo_url: rr.photo_url || null, __tri: rr.__tri || 0, places: [] };
            ordreG.push(cle);
          }
          var gg = grp[cle];
          if (!gg.partants && rr.partants) gg.partants = rr.partants;
          if (!gg.photo_url && rr.photo_url) gg.photo_url = rr.photo_url;
          var rangG = parseInt(String(rr.classement || "").match(/\d+/), 10) || 0;
          gg.places.push({ id: rr.id, rang: rangG, brut: rr.classement || "", user_id: rr.user_id, cavalier: rr.cavalier || "", cheval: rr.cheval || (rr.cheval_id ? (nomsChevaux[rr.cheval_id] || "") : ""), cheval_id: rr.cheval_id || null, saisi: !!rr.__saisi, quart: rr.quart });
        });
        var groupes = ordreG.map(function (k2) { return grp[k2]; });
        groupes.forEach(function (gg) {
          gg.places.sort(function (a2, b2) { return (a2.rang || 999) - (b2.rang || 999); });
          var vusP = {}; gg.places = gg.places.filter(function (pp) { var k3 = pp.rang + "|" + (pp.user_id || pp.cavalier); if (vusP[k3]) return false; vusP[k3] = true; return true; });
        });
        /* 30/08 — LE RAIL AUX COUPES. Classement AUTOMATIQUE, memes regles que les
           moments forts de la fiche cheval, dictees par Blandine : les concours a
           TITRES d'abord, puis le NIVEAU d'epreuve, puis les PARTANTS, puis le rang.
           L'EPINGLAGE passe devant tout le reste. */
        function poidsTitreG(g2) {
          var tT = ((g2.concours || "") + " " + (g2.epreuve || "")).toLowerCase();
          if (/open de france|championnat|\bchpt?\b|finale|coupe de france|crit\u00e9rium|criterium/.test(tT)) return 3;
          if (/international|salon|grand prix|gp\b/.test(tT)) return 2;
          return 1;
        }
        function poidsNiveauG(g2) {
          var eN = (g2.epreuve || "").toLowerCase();
          if (/\u00e9lite|elite/.test(eN)) return 5;
          var mN = eN.match(/\b([1-4])\b/);
          return mN ? (5 - Number(mN[1])) : 0;
        }
        function meilleurRangG(g2) { var r2 = 99; (g2.places || []).forEach(function (pp) { if (pp.rang && pp.rang < r2) r2 = pp.rang; }); return r2; }
        /* Les epingles vivent dans resultats.epingle. La colonne peut ne pas exister
           encore : requete SEPAREE et gardee, jamais melangee au select principal —
           une colonne absente ferait echouer TOUTE la requete (lecon du 30/08, cf.
           l'affaire `robe` qui a vide l'Ecurie Hype pendant trois jours). */
        var idsEpingles = {};
        try {
          var rEp = await supa.from("resultats").select("id").in("user_id", idsMembres).eq("epingle", true).limit(50);
          if (rEp && rEp.data) rEp.data.forEach(function (x) { idsEpingles[x.id] = true; });
        } catch (eEp) { }
        groupes.forEach(function (g2) {
          g2.epingle = (g2.places || []).some(function (pp) { return pp.id && idsEpingles[pp.id]; });
          g2.__score = [g2.epingle ? 1 : 0, poidsTitreG(g2), poidsNiveauG(g2), Number(g2.partants || 0), 100 - meilleurRangG(g2)];
        });
        /* 01/09 (Blandine, apres analyse de ses vraies donnees) — LA PAGE CLUB
           MONTRE LES DERNIERES VICTOIRES, PAS LES PLUS BELLES.
           Le rail classait par IMPORTANCE (titres > niveau > partants > rang) :
           d'ou du 2024 en tete — « Chp des Territoires » pese plus lourd qu'un
           1er sur 6 de mai 2026. Elle attendait les derniers resultats.
           ⚠️ LE CLASSEMENT PAR IMPORTANCE N'EST PAS SUPPRIME : il reste tel quel
           sur les FICHES CHEVAUX (page de Rizotto). Seule la page Club change.
           ⚠️ VICTOIRES SEULEMENT (rang 1), son choix contre ma recommandation des
           podiums : « au pire on pourra toujours modifier par la suite ». Pour
           revenir aux podiums, remplacer `=== 1` par `<= 3` ci-dessous.
           ⚠️ LES PREPARATOIRES SONT ECARTEES : un 1er en preparatoire n'est pas
           une victoire en epreuve, meme regle que le compteur des victoires.
           ⚠️ Les epingles restent devant : un resultat epingle a la main passe
           avant la chronologie, c'est tout l'interet de l'epinglage.
           ⚠️ Un club qui gagne peu verra ce bloc court, voire vide. C'est assume. */
        function estPrepaG(g2) { return /pr[ée]pa/i.test(String(g2 && g2.epreuve || "")); }
        var railG = groupes.slice()
          .filter(function (g2) { return meilleurRangG(g2) === 1 && !estPrepaG(g2); })
          .sort(function (x2, y2) {
            if (!!y2.epingle !== !!x2.epingle) return (y2.epingle ? 1 : 0) - (x2.epingle ? 1 : 0);
            return (y2.__tri || 0) - (x2.__tri || 0);
          }).slice(0, 10);
        /* 01/09 — LES CHEVAUX HORS DU CLUB. Blandine : « si le cheval existe
           ailleurs tu peux quand meme mettre sa photo ou tu en mets rien tant
           pis si t'en as pas ». On ne cherche donc QUE les identifiants encore
           inconnus, et seulement ceux des cartes du rail -- pas de requete sur
           tout le palmares.
           ⚠️ REQUETE GARDEE ET SEPAREE, jamais melangee au select principal :
           une table ou une colonne qui repond mal ne doit pas vider le rail
           (lecon du 30/08, l'affaire `robe`). En cas d'echec, la carte
           s'affiche simplement sans portrait. */
        try {
          var manquants = [];
          railG.forEach(function (g3) {
            var mb = (g3.places || []).slice().sort(function (a6, b6) { return (a6.rang || 99) - (b6.rang || 99); })[0];
            var idC = mb && mb.cheval_id;
            if (idC && !chevauxRail[idC] && manquants.indexOf(idC) < 0) manquants.push(idC);
          });
          if (manquants.length) {
            var rCh = await supa.from("chevaux").select("id, nom, photo_url").in("id", manquants.slice(0, 20));
            ((rCh && rCh.data) || []).forEach(function (cH) {
              if (cH && cH.id) chevauxRail[cH.id] = { nom: cH.nom || "", photo: cH.photo_url || "" };
            });
          }
        } catch (eChR) { }
        setChevauxRail(chevauxRail);
        setRailClub(railG);
        if (groupes.length) setResultatsClub(groupes.slice(0, 5)); /* 30/08 (Blandine) : 5 derniers, plus 8 */
      } catch (eRs) { setRailClub([]); }
    } else { setRailClub([]); }   /* (546) aucun membre : rien a attendre */
  })(); }, [monClub]);
  function ouvrirCavalierClub(p) { try { window.__cavalierPublic = { id: (p.id || p.user_id || null), pseudo: p.pseudo || "Cavalier", photo: ((typeof avSrc === "function") ? avSrc(p.avatar_url) : p.avatar_url) || null, ecurie: monClub, club: (p.club || monClub || ""), ville: p.ville || "" }; window.__cavalierOuvert = "__public"; } catch (eC) { } setEcran("cavalier"); }
  /* --- Communauté idéale : cavaliers choisis par le propriétaire de l'écurie --- */
  var _mo = React.useState(null), moiG = _mo[0], setMoiG = _mo[1];
  var _mcc = React.useState(null), mesChevauxClub = _mcc[0], setMesChevauxClub = _mcc[1];
  var _cx = React.useState(null), choisis = _cx[0], setChoisis = _cx[1];
  var _so = React.useState(false), selCav = _so[0], setSelCav = _so[1];
  /* 19/09 (247) : la cavaliere dont le retrait attend confirmation (deux touchers). */
  var _xd = React.useState(null), exDemande = _xd[0], setExDemande = _xd[1];
  var _rq = React.useState(""), rechQ = _rq[0], setRechQ = _rq[1];
  var _rr = React.useState(null), rechRes = _rr[0], setRechRes = _rr[1];
  var _sg = React.useState(null), suggestions = _sg[0], setSuggestions = _sg[1];
  /* 01/09 — LE TRI XP SUR LA PAGE CLUB. La 20bt l'avait branche sur
     `EcranEcurie` (encart « Cavaliers du club »), PAS sur cette page-ci
     (`EcranGuilde`, encart « Cavaliers de l'ecurie ») — celle que Blandine
     regarde, et la seule atteignable depuis que « Mon ecurie » redirige vers
     le club. D'ou « le tri des cavaliers ne marche pas » : il n'etait pas la.
     Meme fonction, memes garanties que sur l'autre page :
     ⚠️ LE TRI NE FILTRE RIEN — un cavalier absent de la reponse garde sa place
     a la SUITE des classes, il ne disparait pas.
     ⚠️ ECHEC = ORDRE D'AVANT, aucun ecran vide, aucun message.
     ⚠️ Les FIGURANTS n'ont pas d'identifiant : ils ne sont jamais envoyes a la
     fonction et restent en fin de liste, ou ils sont deja.
     ⚠️ Hook pose ICI, avec les autres etats, AVANT toute sortie
     conditionnelle du composant (regle du fichier). */
  var _gXp = React.useState(null), ordreXpG = _gXp[0], setOrdreXpG = _gXp[1];
  React.useEffect(function () {
    var vivantXpG = true;
    (async function () {
      try {
        var tousG = (membres || []).concat(choisis || []);
        if (moiG && moiG.id) tousG = tousG.concat([{ id: moiG.id }]);
        var vusG = {}, idsG = [];
        tousG.forEach(function (p) {
          var i = p && p.id ? String(p.id) : "";
          if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(i)) return;
          if (vusG[i]) return; vusG[i] = true; idsG.push(i);
        });
        if (idsG.length < 2 || typeof supa === "undefined" || !supa) { if (vivantXpG) setOrdreXpG(null); return; }
        var rG = await supa.rpc("hype_ordre_cavaliers_xp", { ids: idsG });
        if (!vivantXpG) return;
        if (rG && rG.error) { setOrdreXpG(null); return; }
        var carteG = {};
        (rG && rG.data ? rG.data : []).forEach(function (l) {
          if (l && l.user_id != null && l.rang != null) carteG[String(l.user_id)] = Number(l.rang);
        });
        setOrdreXpG(Object.keys(carteG).length ? carteG : null);
      } catch (eXpG) { if (vivantXpG) setOrdreXpG(null); }
    })();
    return function () { vivantXpG = false; };
  }, [
    (membres || []).map(function (p) { return p && p.id; }).join(","),
    (choisis || []).map(function (p) { return p && p.id; }).join(","),
    (moiG && moiG.id) || ""
  ]);
  React.useEffect(function () { (async function () {
    try {
      var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
      setMoiG(u || null);
      if (u) { try { var rMc = await mesChevaux(); var tousMc = (rMc && rMc.data) ? rMc.data.slice() : []; try { var rMl = await mesChevauxLies(); if (rMl && rMl.data && rMl.data.length) tousMc = tousMc.concat(rMl.data); } catch (eMl) { } /* 01/09 : garde par identifiant, comme sur la page Cavalier depuis le 02/08 — c'est CETTE liste qui montrait Yum en double. */ var vusMc = {}; tousMc = tousMc.filter(function (cM) { if (!cM || !cM.id || vusMc[cM.id]) return false; vusMc[cM.id] = true; return true; });
        /* 02/09 (Blandine : « Ecolo et Dakota apparaissent toujours sur ecurie Feinn ») —
           CETTE liste-ci est celle de SES chevaux a elle, et elle ne regardait pas le club
           du cheval. (Mon premier correctif portait sur chevauxDeLEcurie, qui EXCLUT
           volontairement le compte courant : il ne pouvait donc rien changer ici.)
           ⚠️ Regle de Blandine respectee : un cheval SANS club apparait PARTOUT ; seul un
           cheval explicitement rattache a un AUTRE club sort de la grille. */
        tousMc = hypeChevauxDuClub(tousMc, monClub); /* 03/09 : fonction unique */
/* 28/08 : "Mes chevaux" etait trie par richesse en PHOTOS seulement (comptage de albums_cheval.photos). 01/09 (Blandine, « partout ») : ce tri partiel est remplace par le classement XP complet, le meme que les trois autres grilles — photos ET videos, likes, resultats, cavaliers rattaches, champs remplis. L'ancien comptage est retire : il faisait double emploi et donnait un ordre different des autres pages. */ /* 01/09 (Blandine : « les chevaux avaient disparu et ils sont revenus d'un coup ») — AFFICHER D'ABORD, CLASSER ENSUITE. Le classement XP lance cinq requetes : tant qu'elles tournaient, la liste restait vide — grille du club sans rien, et sur la page Cavalier le vide faisait remonter les fiches de DEMONSTRATION. La liste est donc posee immediatement dans l'ordre de la base, puis reposee classee quand le classement revient. Ne jamais remettre le tri AVANT le premier affichage. */ setMesChevauxClub(tousMc); try { var triMc = await classerChevauxParXp(tousMc); if (triMc && triMc.length) tousMc = triMc; } catch (eXm) { } setMesChevauxClub(tousMc); } catch (eMc) { setMesChevauxClub([]); } }
      if (u && typeof cavaliersChoisisEcurie === "function") { var rc = await cavaliersChoisisEcurie(monClub); setChoisis((rc && rc.data) || []); }
      else if (!u) { setTimeout(async function () { try { var u2 = await utilisateurActuel(); if (u2) { var rc2 = await cavaliersChoisisEcurie(monClub); setChoisis((rc2 && rc2.data) || []); } } catch (eG2) { } }, 2500); }
      else setChoisis([]);
    } catch (eG) { setChoisis([]); }
  })(); }, [(ctx.profil && ctx.profil.id) || ""]);
  function ouvrirSelecteurCav() {
    setSelCav(true);
    if (suggestions === null) {
      try { derniersCavaliers(15).then(function (r) { setSuggestions((r && r.data) || []); }).catch(function () { setSuggestions([]); }); } catch (eSg) { setSuggestions([]); }
    }
  }
  function majRechercheCav(v) {
    setRechQ(v);
    if (v.trim().length >= 2) {
      try { rechercherCavaliersHype(v, 12).then(function (r) { setRechRes((r && r.data) || []); }).catch(function () { setRechRes([]); }); } catch (eR) { setRechRes([]); }
    } else setRechRes(null);
  }
  function basculerChoisi(p) {
    var deja = (choisis || []).some(function (x) { return x.id === p.id; });
    if (deja) { setChoisis((choisis || []).filter(function (x) { return x.id !== p.id; })); try { retirerCavalierChoisi(p.id); } catch (e1) { } }
    else {
      setChoisis((choisis || []).concat([{ id: p.id, pseudo: p.pseudo, avatar_url: p.avatar_url || null, ville: p.ville || "", ecurie: p.ecurie || "", statut: "en_attente" }]));
      /* 03/09 (Blandine : « on me propose d ajouter un cavalier a l ecurie quand
         je suis sur la SEP et ca l ajoute a Feinn ») — LA CAUSE ETAIT CE PARAMETRE
         MANQUANT : sans nom d ecurie, `ajouterCavalierChoisi` se rabat sur
         `monEcurieNom()`, c est-a-dire la PREMIERE ecurie du profil. La page
         Ecurie, elle, passait bien son club depuis toujours. */
      try { ajouterCavalierChoisi(p.id, monClub).then(function (rA) { if (rA && rA.error) { setChoisis(function (cs) { return (cs || []).filter(function (x) { return x.id !== p.id; }); }); try { alert(T("Invitation non enregistr\u00e9e \u2014 v\u00e9rifie ta connexion.", "Invitation not saved \u2014 check your connection.", "Invitaci\u00f3n no guardada.", "Invito non salvato.", "\u62db\u5f85\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Einladung nicht gespeichert \u2013 pr\u00fcfe deine Verbindung.", "\u0644\u0645 \u062a\u062d\u0641\u0638 \u0627\u0644\u062f\u0639\u0648\u0629 \u2014 \u062a\u062d\u0642\u0642\u064a \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644.", "邀请未保存——请检查你的网络连接。", "Uitnodiging niet opgeslagen — controleer je verbinding.", "Convite não salvo — verifique sua conexão.", "Inbjudan sparades inte — kontrollera din anslutning.", "Приглашение не сохранено — проверь подключение.", "Zaproszenie nie zostało zapisane — sprawdź połączenie.", "초대가 저장되지 않았어요. 연결 상태를 확인해 주세요.")); } catch (eT) { } } }); } catch (e2) { }
    }
  }
  var FIGURANTS_CLUB = [
    { pseudo: "Camille", ville: "Itteville" },
    { pseudo: "Margaux", ville: "Ballancourt" },
    { pseudo: "\u00c9lise", ville: "La Fert\u00e9-Alais" },
    { pseudo: "Hugo", ville: "Mennecy" },
    { pseudo: "Chlo\u00e9", ville: "Lardy" },
    { pseudo: "Manon", ville: "Cerny" },
    { pseudo: "Th\u00e9o", ville: "Baulne" },
    { pseudo: "Jade", ville: "Vert-le-Petit" }
  ];
  var CLUBS_REVENDIQUES = { "ecurie feinn": { email: "feinn@live.fr", ville: "Itteville (Essonne)" } };
  function clefClub(n) { try { return (n || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim(); } catch (eK) { return (n || "").toLowerCase().trim(); } }
  var revendique = CLUBS_REVENDIQUES[clefClub(monClub)] || null;
  if (!revendique) { try { if (typeof noyauEcurie === "function") { var nyRv = noyauEcurie(monClub); for (var kRv in CLUBS_REVENDIQUES) { if (noyauEcurie(kRv) === nyRv) { revendique = CLUBS_REVENDIQUES[kRv]; break; } } } } catch (eRv) { } } /* 06/08 : le tag Club officiel survit aux variantes du nom */
  var infosClub = null;
  try { var _bdC = (typeof window !== "undefined" && window.HYPE_CLUBS && window.HYPE_CLUBS.length) ? window.HYPE_CLUBS : null; if (_bdC) { var _kC = clefClub(monClub); for (var _iC = 0; _iC < _bdC.length; _iC++) { if (clefClub(_bdC[_iC].nom) === _kC) { infosClub = _bdC[_iC]; break; } } } } catch (eIC) { }
  var villeClub = (revendique && revendique.ville) || (infosClub && (infosClub.ville ? (infosClub.ville + (infosClub.departement ? " (" + infosClub.departement + ")" : "")) : infosClub.departement)) || "";
  var CAVALIERS_FEINN = [
    { pseudo: "Liam", ville: "Itteville" },
    { pseudo: "Evan", ville: "Itteville" },
    { pseudo: "El\u00e9a", ville: "Itteville" },
    { pseudo: "Filou", ville: "Itteville" }
  ];
  var figurantsBase = (clefClub(monClub) === "ecurie feinn") ? CAVALIERS_FEINN : FIGURANTS_CLUB;
  var pseudosReels = {};
  (membres || []).forEach(function (p) { pseudosReels[clefClub(p.pseudo)] = true; });
  (choisis || []).forEach(function (p) { pseudosReels[clefClub(p.pseudo)] = true; });
  var idsReels = {};
  (membres || []).forEach(function (p) { idsReels[p.id] = true; });
  var choisisAff = (choisis || []).filter(function (p) { return p && !idsReels[p.id]; }).map(function (p) { return Object.assign({}, p, { __choisi: true }); });
  var figurantsFiltres = figurantsBase.filter(function (f) { return !pseudosReels[clefClub(f.pseudo)]; });
  var reelsEtChoisis = (membres || []).concat(choisisAff);
  var cavaliersAff = reelsEtChoisis.concat(figurantsFiltres.slice(0, Math.max(0, 8 - reelsEtChoisis.length)));
  if (moiG && moiG.id && !cavaliersAff.some(function (cMoi) { return cMoi && cMoi.id === moiG.id; })) { cavaliersAff = [{ id: moiG.id, pseudo: (profil && (profil.pseudo || profil.prenom)) || ((moiG.email || "").split("@")[0]) || "Moi", avatar_url: (profil && profil.avatar_url) || null, ville: (profil && profil.ville) || "" }].concat(cavaliersAff); }
  /* 01/09 : le classement XP, quand il est arrive. `slice()` d'abord — `sort`
     trie SUR PLACE et `cavaliersAff` est reconstruit a chaque rendu. */
  if (ordreXpG) {
    cavaliersAff = cavaliersAff.slice().sort(function (a, b) {
      var ra = ordreXpG[a && a.id], rb = ordreXpG[b && b.id];
      if (ra == null && rb == null) return 0;   /* non classes : ordre d'origine */
      if (ra == null) return 1;
      if (rb == null) return -1;
      return ra - rb;
    });
  }
  var monRes = 0, monPod = 0;
  for (var hid in CHEVAUX_FICHE) { var ch = CHEVAUX_FICHE[hid]; if (ch && ch.palmares) { for (var k = 0; k < ch.palmares.length; k++) { monRes++; if (/^(1|2|3)/.test(ch.palmares[k].rang)) monPod++; } } }
  var liste;
  if (reel && reel.length) {
    liste = reel.map(function (g) { return { nom: g.ecurie, membres: g.membres, hf: g.hauts_faits, res: g.resultats, pod: g.podiums, xp: g.xp }; });
    /* 🟥 19/09 (248) — POURQUOI LE NOMBRE DE MEMBRES ETAIT FAUX, PUIS ABSENT.
       Son signalement : le compteur affichait 16 au lieu de 20, puis plus rien du tout.
       MESURE EN BASE : `classement_ecuries()` renvoie bien 20 pour Ecurie Feinn — elle
       compte DEJA les deux ecuries (cross join sur ecurie/ecurie2, avec distinct). Le
       chiffre etait donc juste en base.
       LA CAUSE ETAIT ICI : la ligne etait retrouvee par une egalite STRICTE
       (`g.nom === monClub`). La fonction renvoie des noms DETRIMES ; un espace de fin ou
       une casse differente dans le profil, et la ligne n etait pas trouvee — l app en
       fabriquait alors une a ZERO, d ou un compteur faux puis vide.
       ⚠️ C EST LE SEUL ENDROIT DE CETTE PAGE QUI COMPARAIT AU CARACTERE PRES : la grille
       des membres, elle, utilise `hypeMemeClub` (tolerant aux espaces et aux accents), ce
       qui explique l incoherence — 20 cavalieres affichees, « 16 membres » ecrit dessous.
       On utilise donc la MEME comparaison tolerante ici. */
    var memeClub = function (a, b) {
      if (typeof hypeMemeClub === "function") { try { if (hypeMemeClub(a, b)) return true; } catch (eMc) { } }
      return String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
    };
    var trouvee = liste.filter(function (g) { return memeClub(g.nom, monClub); })[0];
    if (trouvee) { trouvee.nom = monClub; }
    else { liste.push({ nom: monClub, membres: 0, hf: 0, res: 0, pod: 0, xp: 0 }); }
  } else {
    liste = GUILDES_DEMO.map(function (g) { return Object.assign({}, g); });
    if (!liste.some(function (g) { return g.nom === monClub; })) liste.push({ nom: monClub, membres: 24, hf: 52, res: Math.max(monRes, 38), pod: Math.max(monPod, 22) });
    liste.forEach(function (g) { g.xp = g.membres * 10 + g.hf * 5 + g.res * 3 + g.pod * 8; });
  }
  liste.sort(function (a, b) { return b.xp - a.xp; });
  var monRang = liste.map(function (g) { return g.nom; }).indexOf(monClub) + 1;
  var maG = liste.filter(function (g) { return g.nom === monClub; })[0];
  var niv = niveauGuilde(maG.xp);
  function cristal(niveau) {
    return h("div", { style: { position: "relative", width: 66, height: 66, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" } },
      h("svg", { viewBox: "0 0 64 64", width: 66, height: 66, style: { position: "absolute", inset: 0 } }, h("path", { d: "M32 4 L52 24 L32 60 L12 24 Z", fill: "rgba(" + RGBT + ",0.259)", stroke: TURQ, strokeWidth: 1.6 }), h("path", { d: "M32 4 L52 24 L32 32 Z", fill: "rgba(" + RGBT + ",0.444)" }), h("path", { d: "M12 24 L32 32 L32 60 Z", fill: "rgba(" + RGBT + ",0.148)" })),
      h("div", { style: { position: "relative", fontFamily: C, fontSize: 22, fontWeight: 700, color: "#EAFBFD", textShadow: "0 0 10px rgba(" + RGBT + ",0.6)" } }, niveau));
  }
  function statMini(v, l, col) { return h("div", { style: { flex: 1, textAlign: "center", minWidth: 0 } }, h("div", { style: { fontFamily: C, fontSize: 19, fontWeight: 700, color: col || "#EDF2F5" } }, v), h("div", { style: { fontSize: 9, letterSpacing: 0.8, textTransform: "uppercase", color: "#8A929C", marginTop: 3, fontFamily: M } }, l)); }
  /* 27/09 (458) - BANDEAU POUR LES VISITEURS NON CONNECTES. Blandine : « quand la personne va dessus on
     met un message pour qu il se connecte ou cree un compte » (arrivee par un lien partage, souvent
     depuis le navigateur de WhatsApp, ou personne n est connecte). null = on ne sait pas encore,
     true = visiteur, false = connecte. Rien n est ouvert aux visiteurs : la page reste vide pour eux. */
  var _invG = React.useState(null); var visiteurG = _invG[0], setVisiteurG = _invG[1];
  React.useEffect(function () {
    var vifI = true;
    (async function () { try { var uI = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (vifI) setVisiteurG(!(uI && uI.id)); } catch (eI) { } })();
    return function () { vifI = false; };
  }, []);
  function allerAuthG(mode) { try { AUTH_MODE_SPECTRAL = mode; } catch (eAm) { } setEcran("connexion"); }

  /* (539) PAGE ECURIE V2 : memes donnees, memes droits, memes routes, nouveau dessin. HYPE_ECURIE_V2 = false
     ramene l ancienne page ci-dessous (conservee intacte). */
  if (typeof HYPE_ECURIE_V2 !== "undefined" && HYPE_ECURIE_V2 && !(typeof window !== "undefined" && window.__ecurieAncienne) && typeof EcranEcurieV2 === "function") {   /* (548) sauf demande de l ancienne page */
    try { window.__teinteEcurieActive = null; } catch (eTn) { }
    return h(EcranEcurieV2, { d: {
      T: T, lg: (ctx && ctx.langue) || "fr", setEcran: setEcran, moiG: moiG, visiteurG: visiteurG, allerAuthG: allerAuthG, infosClub: infosClub /* (861) coordonnees de la base des clubs */,
      monClub: monClub, ecuriePrincipale: ecuriePrincipale, ecurieSecondaire: ecurieSecondaire, setClubForce: setClubForce, clefClub: clefClub,
      banniere: banniere, peutEditerBanniere: peutEditerBanniere, banRef: banRef, choisirBanniere: choisirBanniere,
      couvertureDefaut: ((__thh && __thh.id === "crimson" && typeof IMG_BANDEAU_CRIMSON !== "undefined") ? IMG_BANDEAU_CRIMSON : (typeof UV3_H2 !== "undefined" ? UV3_H2 : "")),   /* (541) meme repli que l ancienne page */
      villeClub: villeClub, nbMembres: (maG && maG.membres) ? Number(maG.membres) : 0,
      chevauxClub: chevauxClub, liensClub: liensClub, railClub: railClub, membres: membres, chevauxRail: chevauxRail,
      citationProps: { mode: "club", nomClub: monClub, sansHistoire: true, editable: (typeof clubRevendiquePar === "function" && clubRevendiquePar(monClub, moiG)),
        titreCourt: { fr: "La philosophie du club", en: "The club's philosophy", es: "La filosof\u00eda del club", it: "La filosofia del club", ja: "\u30af\u30e9\u30d6\u306e\u54f2\u5b66", de: "Die Philosophie des Vereins", ar: "\u0641\u0644\u0633\u0641\u0629 \u0627\u0644\u0646\u0627\u062f\u064a", zh: "俱乐部理念", nl: "De filosofie van de manege", pt: "A filosofia do clube", sv: "Klubbens filosofi", ru: "Философия клуба", pl: "Filozofia klubu", ko: "클럽의 철학" },
        noteModale: { fr: "Visible par tous les membres du club.", en: "Visible to all club members.", es: "Visible para todos los miembros del club.", it: "Visibile a tutti i membri del club.", ja: "\u30af\u30e9\u30d6\u306e\u5168\u30e1\u30f3\u30d0\u30fc\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", de: "F\u00fcr alle Vereinsmitglieder sichtbar.", ar: "\u0638\u0627\u0647\u0631 \u0644\u0643\u0644 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0646\u0627\u062f\u064a.", zh: "俱乐部所有成员都能看到。", nl: "Zichtbaar voor alle leden van de manege.", pt: "Visível para todos os membros do clube.", sv: "Synlig för alla klubbens medlemmar.", ru: "Видно всем участникам клуба.", pl: "Widoczne dla wszystkich członków klubu.", ko: "클럽 멤버 모두에게 보여요." },
        /* citation par defaut choisie par Blandine (02/10), attribuee a Nuno Oliveira par les recueils */
        defautVoix: { fr: "Faites du cheval un compagnon et non un esclave, vous verrez quel ami extraordinaire il est.", en: "Make the horse a companion, not a slave, and you will see what an extraordinary friend he is.", es: "Haz del caballo un compa\u00f1ero y no un esclavo, y ver\u00e1s qu\u00e9 amigo extraordinario es.", it: "Fate del cavallo un compagno e non uno schiavo, e vedrete che amico straordinario \u00e8.", ja: "\u99ac\u3092\u5974\u96b7\u3067\u306f\u306a\u304f\u4ef2\u9593\u306b\u3057\u306a\u3055\u3044\u3002\u3069\u308c\u307b\u3069\u7d20\u6674\u3089\u3057\u3044\u53cb\u3067\u3042\u308b\u304b\u304c\u308f\u304b\u308b\u3067\u3057\u3087\u3046\u3002", de: "Macht das Pferd zum Gef\u00e4hrten und nicht zum Sklaven, und ihr werdet sehen, was f\u00fcr ein au\u00dfergew\u00f6hnlicher Freund es ist.", ar: "\u0627\u062c\u0639\u0644 \u0627\u0644\u062d\u0635\u0627\u0646 \u0631\u0641\u064a\u0642\u064b\u0627 \u0644\u0627 \u0639\u0628\u062f\u064b\u0627\u060c \u0648\u0633\u062a\u0631\u0649 \u0623\u064a \u0635\u062f\u064a\u0642 \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a \u0647\u0648.", zh: "把马当成伙伴，而不是奴隶，你会发现它是多么了不起的朋友。", nl: "Maak van het paard een maatje en geen slaaf, dan zul je zien wat een geweldige vriend hij is.", pt: "Faça do cavalo um companheiro e não um escravo, e você verá que amigo extraordinário ele é.", sv: "Gör hästen till en kamrat och inte en slav, så får du se vilken enastående vän han är.", ru: "Сделай из лошади друга, а не раба, и ты увидишь, каким замечательным другом она может быть.", pl: "Uczyń z konia towarzysza, a nie niewolnika, a zobaczysz, jakim niezwykłym przyjacielem jest.", ko: "말을 노예가 아닌 동반자로 대해 보세요. 얼마나 멋진 친구인지 알게 될 거예요." },
        auteurDefaut: "Nuno Oliveira" },
      ouvrirOnglet: function (k) {
        var nC = String(monClub || "").trim();
        try {
          if (k === "cavaliers") { window.__cavaliersClub = { nom: nC }; setEcran("cavaliers-club"); }
          else if (k === "chevaux") { window.__ecurieHypeClub = nC || null; window.__ecurieHypePiquet = null; try { hypeMemEc("piquet", null); } catch (eMp) { } setEcran("ecurie-hype"); }   /* (897) Blandine : « Chevaux » ouvre TOUJOURS « Tous les chevaux », plus le dernier onglet/piquet vu ; le retour depuis une fiche cheval garde, lui, l onglet */
          else if (k === "agenda") { window.__agendaClub = monClub || ""; setEcran("agenda-club"); }
          else if (k === "actus") { window.__filEcurieCible = "ecurie:" + nC.toLowerCase(); window.__filEcurieNom = nC; setEcran("actualites-ecurie"); }
          else if (k === "souvenirs") { window.__souvenirsClub = { clef: nC.toLowerCase(), nom: nC }; setEcran("souvenirs-club"); }
          else if (k === "sante") { window.__santeClub = { nom: nC }; setEcran("sante-club"); }
        } catch (eOg) { }
      }
    } });
  }
  return h("div", { className: "hype-ec-sobre", style: { minHeight: "100vh", background: "#060709", color: "#EDF2F5", paddingBottom: 96 } },
    /* (536) agenda du club en mode sobre, SUR CETTE PAGE seulement (classe parente) */
    h("style", null, ".hype-ec-sobre .agc-kicker{color:#F4F1EA!important}.hype-ec-sobre .agc-top{border-bottom-color:rgba(255,255,255,0.08)!important}.hype-ec-sobre .agc-glow{background:linear-gradient(160deg,#15191d,#070a0d)!important}.hype-ec-sobre .agc-date{border-color:rgba(255,255,255,0.14)!important}.hype-ec-sobre .agc-pill{color:#C9CED3!important;background:rgba(255,255,255,0.05)!important;border-color:rgba(255,255,255,0.12)!important}.hype-ec-sobre .agc-add{border-color:rgba(255,255,255,0.18)!important;background:rgba(255,255,255,0.02)!important}.hype-ec-sobre .agc-addc{background:" + TURQ + "!important;box-shadow:none!important}.hype-ec-sobre .agc-ok{background:" + TURQ + "!important;color:#0B0F13!important;box-shadow:none!important}"),
    h(HypeDrapeauLangue, { right: 64 }),   /* (491) */
    h(HypeBoutonPartagerPage, { right: 110, obtenir: function () { var nC = String(monClub || "").trim(); return nC ? { fam: "eg", val: nC, titre: nC } : null; } }),   /* (493) « eg » : la page Ecurie de CE club */   /* (492) */
    visiteurG === true ? h("div", { style: { margin: "calc(env(safe-area-inset-top) + 66px) 16px 14px", padding: "16px 16px 14px", borderRadius: 16, border: "1px solid rgba(" + RGBTL + ",0.35)", background: "linear-gradient(160deg, rgba(12,26,32,0.96), rgba(6,9,12,0.98))", textAlign: "center" } },
      h("div", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: 16, fontWeight: 700, color: "#EDF2F5", letterSpacing: 0.5 } },
        T("Bienvenue sur Hype", "Welcome to Hype", "Te damos la bienvenida a Hype", "Benvenuto su Hype", "Hype\u3078\u3088\u3046\u3053\u305d", "Willkommen bei Hype", "\u0645\u0631\u062d\u0628\u0627 \u0628\u0643 \u0641\u064a Hype", "欢迎来到 Hype", "Welkom bij Hype", "Boas-vindas ao Hype", "Välkommen till Hype", "Добро пожаловать в Hype", "Witaj w Hype", "Hype에 오신 걸 환영해요")),
      h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, color: "#B7C1C8", lineHeight: 1.55, marginTop: 7 } },
        T("Connecte-toi ou cr\u00e9e ton compte pour retrouver ton \u00e9curie, ses rendez-vous et ses moments.", "Sign in or create your account to find your stable, its events and its moments.", "Inicia sesi\u00f3n o crea tu cuenta para encontrar tu cuadra, sus citas y sus momentos.", "Accedi o crea il tuo account per ritrovare la tua scuderia, i suoi eventi e i suoi momenti.", "\u30ed\u30b0\u30a4\u30f3\u307e\u305f\u306f\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u3057\u3066\u3001\u3042\u306a\u305f\u306e\u53a9\u820e\u306e\u4e88\u5b9a\u3084\u601d\u3044\u51fa\u3092\u898b\u3064\u3051\u3088\u3046\u3002", "Melde dich an oder erstelle dein Konto, um deinen Stall, seine Termine und Momente zu finden.", "\u0633\u062c\u0644\u064a \u0627\u0644\u062f\u062e\u0648\u0644 \u0623\u0648 \u0623\u0646\u0634\u0626\u064a \u062d\u0633\u0627\u0628\u0643 \u0644\u062a\u062c\u062f\u064a \u0625\u0633\u0637\u0628\u0644\u0643 \u0648\u0645\u0648\u0627\u0639\u064a\u062f\u0647 \u0648\u0644\u062d\u0638\u0627\u062a\u0647.", "登录或创建账户，找回你的马厩、日程和美好时刻。", "Log in of maak een account aan om je stal, de afspraken en de mooiste momenten terug te vinden.", "Entre ou crie sua conta para encontrar sua cocheira, seus compromissos e seus momentos.", "Logga in eller skapa ditt konto för att hitta ditt stall, dess evenemang och dess stunder.", "Войди или создай аккаунт, чтобы найти свою конюшню, её события и важные моменты.", "Zaloguj się lub załóż konto, aby odnaleźć swoją stajnię, jej wydarzenia i chwile.", "로그인하거나 계정을 만들어 내 마구간과 일정, 소중한 순간들을 만나 보세요.")),
      h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
        h("button", { type: "button", onClick: function () { allerAuthG("connexion"); }, style: { flex: 1, minWidth: 0, minHeight: 44, borderRadius: 999, border: "1px solid rgba(" + RGBTL + ",0.55)", background: "transparent", color: TURQL, fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", padding: "0 8px" } },
          T("Se connecter", "Sign in", "Iniciar sesi\u00f3n", "Accedi", "\u30ed\u30b0\u30a4\u30f3", "Anmelden", "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644", "登录", "Inloggen", "Entrar", "Logga in", "Войти", "Zaloguj się", "로그인")),
        h("button", { type: "button", onClick: function () { allerAuthG("inscription"); }, style: { flex: 1, minWidth: 0, minHeight: 44, borderRadius: 999, border: "none", background: "linear-gradient(90deg," + TURQ + "," + TURQL + ")", color: "#04252A", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer", padding: "0 8px" } },
          T("Cr\u00e9er un compte", "Create an account", "Crear una cuenta", "Crea un account", "\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210", "Konto erstellen", "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628", "创建账户", "Account aanmaken", "Criar uma conta", "Skapa ett konto", "Создать аккаунт", "Załóż konto", "계정 만들기")))) : null,
    /* 30/08 (choix de Blandine, maquette B) — LA BANNIERE N'EST PLUS RECADREE.
       Avant : un bloc de hauteur fixe en `center/cover`, donc la photo etait
       rognee en haut, en bas et sur les cotes. Desormais la photo est affichee
       ENTIERE, reduite, centree, avec du noir sur les QUATRE cotes (marges 34 px
       laterales, 26 px en haut), coins arrondis 14 px. Le texte passe DESSOUS :
       le nom du club reste lisible quelle que soit la photo envoyee.
       maxHeight 460 px pour qu'une photo verticale ne fasse pas un bandeau sans fin. */
    h("div", { style: { position: "relative", margin: "0 0 4px", background: "#060709" } }, /* 02/09 : etait #000 (noir pur) alors que le reste de la page et l accueil sont en #060709 — la cassure se voyait franchement sous le badge OFFICIAL. */
      h("div", { style: { position: "relative", padding: "calc(12px + env(safe-area-inset-top)) 8px 0" } },
        /* 30/08 (Blandine) : la pastille « Club officiel » quitte le bas du bloc et
           devient un petit badge pose EN HAUT A DROITE de la photo. Decale vers la
           gauche quand le bouton appareil photo est la, pour ne pas le recouvrir. */
 /* 30/08 (Blandine : « agrandis plus que ca ») : marges 34 -> 16 px */ /* 30/08 : la marge etait fixe, la photo passait sous l'encoche */
        h("img", { src: (banniere || ((__thh && __thh.id === "crimson" && typeof IMG_BANDEAU_CRIMSON !== "undefined") ? IMG_BANDEAU_CRIMSON : UV3_H2)), alt: "", /* 30/08 : l'ancienne expression produisait `url(https://...)` — la syntaxe d'un FOND CSS, pas l'adresse nue qu'attend une balise img. Image cassee. */ style: { display: "block", width: "100%", height: "auto", minHeight: "min(74vw, 430px)", maxHeight: 560, objectFit: "cover", objectPosition: "center", margin: "0 auto", borderRadius: 14 } /* 06/09 (Blandine : « l image de l ecurie un peu plus profonde ») — LE BANDEAU A DESORMAIS UNE HAUTEUR MINIMALE. Depuis le 30/08 la photo etait affichee ENTIERE (contain) : une photo large donnait une bande fine, impossible a grandir sans la recadrer. Elle revient donc sur ce choix : minHeight 74vw plafonne a 430 px, et `cover` rogne les COTES pour remplir. ⚠️ Vaut pour TOUS les clubs, pas seulement le sien. ⚠️ Une photo tres verticale est desormais rognee en haut et en bas au-dela de 560 px, la ou elle etait entiere avant. Pour revenir en arriere : minHeight retire, objectFit contain, maxHeight 720. */ })),
      h("div", { style: { padding: "16px 22px 14px", textAlign: "center" } },
        /* 13/09 (74) — LE CRISTAL XP SUR LA LIGNE DU NOM, A DROITE, PETIT (demande de Blandine).
           Le nom reste centre : une colonne fantome de la meme largeur a gauche equilibre la rangee.
           Le rang s'inscrit au centre du cristal ; le tout ouvre Communaute. Classement Competition
           non affiche pour l'instant (decision du 13/09, sujet dans SUIVI.md). */
        h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } },
          h("div", { "aria-hidden": "true", style: { width: 44, flex: "0 0 auto" } }),
          h("div", { style: { fontFamily: C, fontSize: 24, fontWeight: 700, letterSpacing: 1.4, color: "#F2F7F9", minWidth: 0 } }, monClub),
          (monRang > 0)   /* (498) cristal du rang REMIS (Blandine : « laisse la petite icone sur la page de l ecurie ») */
            ? h("button", { onClick: function () { try { window.__communauteCible = "classement"; } catch (eCc) { } setEcran("communaute"); }, "aria-label": T("Voir le classement des clubs", "See club ranking", "Ver el ranking de clubes", "Vedi la classifica dei club", "\u30af\u30e9\u30d6\u30e9\u30f3\u30ad\u30f3\u30b0\u3092\u898b\u308b", "Vereinsrangliste ansehen", "\u0639\u0631\u0636 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0646\u0648\u0627\u062f\u064a", "查看俱乐部排名", "Bekijk het klassement van de manege’s", "Ver a classificação dos clubes", "Se klubbrankningen", "Смотреть рейтинг клубов", "Zobacz klasyfikację klubów", "클럽 순위 보기"), title: ((maG && maG.xp) || 0) + " XP",
                style: { background: "none", border: "none", padding: 0, cursor: "pointer", position: "relative", width: 44, height: 44, flex: "0 0 auto" } },
                h("img", { src: "hype-badge-xp.png", alt: "", draggable: false, style: { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" } }),
                h("div", { style: { position: "absolute", left: 0, right: 0, top: "37%", textAlign: "center", fontFamily: C, fontSize: 11.5, fontWeight: 700, color: "#F4EBD3", textShadow: "0 0 6px rgba(232,200,135,0.6), 0 1px 2px rgba(0,0,0,0.9)", pointerEvents: "none", lineHeight: 1 } },
                  "#" + String(monRang)))
            : h("div", { "aria-hidden": "true", style: { width: 44, flex: "0 0 auto" } })),
        h("div", { style: { fontFamily: M, fontSize: 11.5, fontWeight: 700, color: "rgba(234,247,250,0.85)", marginTop: 5 } },
          (villeClub ? ("\ud83d\udccd " + villeClub + " \u00b7 ") : "") + maG.membres + " " + T("membres", "members", "miembros", "membri", "\u30e1\u30f3\u30d0\u30fc", "Mitglieder", "\u0623\u0639\u0636\u0627\u0621", "成员", "leden", "membros", "medlemmar", "участников", "członków", "멤버")),
        /* 30/08 (Blandine : « on ne voit pas le club officiel, mets-le là où l'autre
           était avant ») — pose en haut a droite de la photo, le badge se perdait sur
           une image chargee. Il reprend EXACTEMENT la place de l'ancienne pastille :
           sous le nom et la ville, centre. */
        (revendique && !badgeKo) ? h("img", { key: "badge" + badgeIdx, src: BADGE_CHEMINS[badgeIdx], alt: "", onError: function () { setBadgeIdx(badgeIdx + 1); }, style: { display: "block", width: 88, height: "auto", margin: "10px auto 0" } /* 31/08 (Blandine) : 150 -> 88 px */ }) : null,
        (revendique && badgeKo) ? h("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, marginTop: 11, padding: "4px 12px", borderRadius: 999, border: "1px solid " + TURQ + "8C", background: "rgba(6,7,9,0.5)" } },
          h("span", { style: { width: 13, height: 13, borderRadius: "50%", background: TURQ, color: "#04252B", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" } }, "\u2713"),
          h("span", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: TURQL } }, T("Club officiel", "Official club", "Club oficial", "Club ufficiale", "\u516c\u5f0f\u30af\u30e9\u30d6", "Offizieller Club", "\u0646\u0627\u062f \u0631\u0633\u0645\u064a", "官方俱乐部", "Officiële manege", "Clube oficial", "Officiell klubb", "Официальный клуб", "Oficjalny klub", "공식 클럽"))) : null),
      (peutEditerBanniere || gereTeinte) ? h("button", { onClick: function () { setErrTeinte(""); setMenuPhotoG(true); }, "aria-label": hypeT7("Changer la photo du club", "Change the club photo", "Cambiar la foto del club", "Cambia la foto del club", "\u30af\u30e9\u30d6\u306e\u5199\u771f\u3092\u5909\u66f4", "Vereinsfoto \u00e4ndern", "\u062a\u063a\u064a\u064a\u0631 \u0635\u0648\u0631\u0629 \u0627\u0644\u0646\u0627\u062f\u064a", "更换俱乐部照片", "Foto van de manege wijzigen", "Trocar a foto do clube", "Byt klubbens foto", "Сменить фото клуба", "Zmień zdjęcie klubu", "클럽 사진 바꾸기"), style: { position: "absolute", right: 14, top: "calc(14px + env(safe-area-inset-top))", width: 42, height: 42, borderRadius: "50%", border: "none", background: "rgba(6,7,9,0.6)", color: "#EDF2F5", fontSize: 17, cursor: "pointer", zIndex: 4 } }, "\ud83d\udcf7") : null,
      peutEditerBanniere ? h("input", { ref: banRef, type: "file", accept: "image/*", onChange: choisirBanniere, style: { display: "none" } }) : null),
    /* 22/09 (343) - LA BASCULE ENTRE LES DEUX ECURIES, SOUS LE BANDEAU DU CLUB. Sa capture de 11 h 01 :
       « c est push mais je vois pas ou changer d ecurie ». Au 341 elle etait posee APRES le mur « A la
       une » - bien plus bas que ce que je lui avais annonce (« juste sous les stories ») : MON ERREUR.
       Elle est maintenant juste sous le nom du club, visible sans descendre. Et l ecurie secondaire
       ne depend plus seulement du profil garde sur le telephone (vide sur une nouvelle adresse) :
       elle est relue en base (ecurie2Base). */
    (ecurieSecondaire && clefClub(ecurieSecondaire) !== clefClub(ecuriePrincipale)) ? h("div", { style: { display: "flex", justifyContent: "center", gap: 8, padding: "14px 16px 2px" } },
      [ecuriePrincipale, ecurieSecondaire].map(function (nomE, iE) {
        var actifE = clefClub(monClub) === clefClub(nomE);
        return h("button", { key: "ecw" + iE, onClick: function () { setClubForce(iE === 0 ? null : nomE); }, style: { maxWidth: "46%", padding: "8px 15px", borderRadius: 999, border: "1px solid " + (actifE ? "rgba(" + RGBT + ",0.65)" : "rgba(255,255,255,0.14)"), background: actifE ? "rgba(" + RGBT + ",0.1)" : "rgba(255,255,255,0.035)", color: actifE ? TURQL : "#9AA5AD", fontSize: 11.5, fontWeight: 700, fontFamily: M, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer", boxShadow: actifE ? "0 0 14px rgba(" + RGBT + ",0.15)" : "none" } }, nomE);
      })) : null,
    /* (535) MENU PHOTO de l ecurie (choix de Blandine : « comme sur la page cheval ») : changer la photo
       (proprietaire) + « Couleur » 4 pastilles (proprietaire ou gestionnaire). Remplace la ligne de pastilles du 534. */
    menuPhotoG ? h("div", { onClick: function () { setMenuPhotoG(false); }, style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(4,6,9,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (eM) { eM.stopPropagation(); }, style: { width: "100%", maxWidth: 480, background: "#0C1016", borderRadius: "22px 22px 0 0", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 16px calc(16px + env(safe-area-inset-bottom))" } },
        peutEditerBanniere ? h("button", { type: "button", onClick: function () { setMenuPhotoG(false); if (banRef.current) banRef.current.click(); }, style: { width: "100%", textAlign: "start", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#EDF2F5", fontSize: 15, fontFamily: M, cursor: "pointer" } },
          "\ud83d\udcf7 " + T("Changer la photo", "Change photo", "Cambiar foto", "Cambia foto", "写真を変更", "Foto ändern", "تغيير الصورة", "更换照片", "Foto wijzigen", "Trocar a foto", "Byt foto", "Сменить фото", "Zmień zdjęcie", "사진 변경")) : null,
        gereTeinte ? h("div", { style: { padding: "13px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 } },
          h("span", { style: { color: "#EDF2F5", fontSize: 15, fontFamily: M } }, "\ud83c\udfa8 " + T("Couleur de l’écurie", "Stable colour", "Color de la cuadra", "Colore della scuderia", "厩舎のカラー", "Farbe des Stalls", "لون الإسطبل", "马厩颜色", "Kleur van de stal", "Cor da cocheira", "Stallets färg", "Цвет конюшни", "Kolor stajni", "마구간 색상")),
          h("div", { style: { display: "flex", gap: 10, marginInlineStart: "auto" } }, TEINTES_ECURIE.map(function (tC) {
            var actifT = (teinteClub || "") === tC[0];
            return h("button", { key: "tcl" + tC[1], type: "button", "aria-label": tC[1], onClick: function () { if (!actifT) choisirTeinteClub(tC[0]); }, style: { width: 26, height: 26, padding: 0, borderRadius: "50%", background: tC[1], cursor: "pointer", border: actifT ? "2px solid #F4F7FA" : "1px solid rgba(255,255,255,0.18)", boxShadow: actifT ? "0 0 0 2px rgba(6,7,9,0.9) inset" : "none" } });
          }))) : null,
        errTeinte ? h("div", { style: { padding: "8px", color: "#E08A8A", fontFamily: M, fontSize: 12 } }, T("Impossible : ", "Not possible: ", "Imposible: ", "Impossibile: ", "できません：", "Nicht möglich: ", "غير ممكن: ", "无法操作：", "Niet mogelijk: ", "Não é possível: ", "Det går inte: ", "Невозможно: ", "Niemożliwe: ", "할 수 없어요: ") + errTeinte) : null,
        h("button", { type: "button", onClick: function () { setMenuPhotoG(false); }, style: { width: "100%", textAlign: "center", marginTop: 10, padding: "12px 8px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 12, color: "#EDF2F5", fontSize: 14, fontFamily: M, cursor: "pointer" } },
          T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))) : null,
    /* 12/08 (114) : bandeau des stories. */
    /* 01/09 (Blandine) : deux bandes grises au-dessus et en dessous du bandeau
       des stories, a l identique de la page Cavalier (Club), pour couper la
       page. Meme bloc gris #15181C, 18 px, arrondi 6, marge laterale 16. */
    (typeof window !== "undefined" && window.BandeauStories)
      ? h("div", { style: { margin: "12px 0 0" } },
          h("span", { style: { display: "block", height: 18, background: "#15181C", borderRadius: 6, margin: "0 16px" } }),
          h(window.BandeauStories, { forme: "libre", padding: "10px 0 10px" }),
          h("span", { style: { display: "block", height: 18, background: "#15181C", borderRadius: 6, margin: "0 16px" } }))
      : null,
    /* 12/08 (116) : rail des A LA UNE. Sur une page dont le sujet n est pas une
       personne, ce sont celles du cavalier CONNECTE (deduction a valider). */
    /* 30/08 (Blandine : « pour les à la une tu peux réutiliser la même chose que
         sur la page cavalier ? ») — le MUR IMMERSIF remplace le rail sur la page club.
         Vérifié dans hype-stories.js : `MurImmersif` n'accepte que `userId`, et
         `hsListerALaUne` construit toujours une cible `cavalier:<id>` — il n'existe
         AUCUN mode club. Or `RailALaUne` était ici appelé SANS paramètre, donc il
         montrait déjà les à la une du cavalier connecté : le contenu est identique,
         seul l'habillage change. Repli sur le rail si le module n'est pas charge. */
      (typeof window !== "undefined" && window.MurImmersif)
        ? h(window.MurImmersif, null)
        : ((typeof window !== "undefined" && window.RailALaUne) ? h(window.RailALaUne, null) : null),
    /* (343) : la bascule entre les deux ecuries a ete REMONTEE sous le bandeau du club. */
    /* 14/09 (138) - LES SIX RACCOURCIS DU CLUB : DESSIN DE LA FICHE CHEVAL, ET REMONTES.
       Blandine, capture du 136 : « le visuel des mosaiques est pas du tout le meme que sur la
       page cheval, reprends le meme ! Et il est tres mal place la ».
       DEUX CORRECTIONS. (1) PLACE : la grille etait posee APRES un bloc qui ne contient que la
       fleche de retour, avec un padding « safe-area + 24 px » pour un bouton en position
       absolue - donc un grand vide juste au-dessus d elle. Elle est desormais JUSTE SOUS LE NOM
       DU CLUB, avant ce bloc. (2) DESSIN : c est maintenant celui de carteR de la fiche cheval,
       repris trait pour trait - hauteur 104, pastille ronde de 36 px a bord teinte avec un
       pictogramme TRACE (plus aucun emoji), titre en Cinzel 12.5, et en pied un libelle en
       petites capitales de 8 px avec sa fleche, separe par un filet. Une carte sans page
       (Prochainement) garde le meme dessin a 50 % d opacite, comme sur la fiche.
       ⚠️ Aucune image passee aux cartes : sur la fiche, une carte sans photo (« Sante ») retombe
       sur un degrade radial teinte - c est ce cas-la qui est utilise ici, pour les six. La meme
       banniere repetee six fois aurait ete illisible.
       ⚠️ NE PAS pointer « Sante » vers l ecran `sante` : celui-la est le MAGAZINE sante. */
    (function () {
      /* 14/09 (154) - LES SIX CARRES PRENNENT LA TEINTE DE L ENCART « PHILOSOPHIE DU CLUB ».
         Blandine : « adapte la couleur des onglets a celle de la philosophie du club en dessous
         et descends-les un peu qu elles empietent pas sur le mur immersif ».
         MEME SOURCE, pas une couleur copiee : la palette HYPE_PAL_CIT choisie par le lien
         « Teinte de l encart », gardee sur CET APPAREIL dans localStorage sous
         « hype_teinte_citation » (defaut « lagune2 »). Si elle change la teinte de la citation,
         les carres suivent tout seuls. Repli sur la teinte turquoise si palette introuvable. */
      var PALC = (function () {
        var idP = "lagune2";
        try { idP = window.localStorage.getItem("hype_teinte_citation") || "lagune2"; } catch (eP1) { }
        try {
          if (typeof HYPE_PAL_CIT !== "undefined" && HYPE_PAL_CIT && HYPE_PAL_CIT.length) {
            for (var iP = 0; iP < HYPE_PAL_CIT.length; iP++) { if (HYPE_PAL_CIT[iP].id === idP) return HYPE_PAL_CIT[iP]; }
            return HYPE_PAL_CIT[2];
          }
        } catch (eP2) { }
        return null;
      })();
      function tAg(aG) {
        var hG = String(TURQ || "#7FA3AD").replace("#", "");
        return "rgba(" + parseInt(hG.substr(0, 2), 16) + "," + parseInt(hG.substr(2, 2), 16) + "," + parseInt(hG.substr(4, 2), 16) + "," + aG + ")";
      }
      function carteG(icG, tiG, ctaG, actG, kG) {
        var fermeG = !actG;
        var fondG = PALC ? PALC.f : "linear-gradient(170deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))";
        var bordG = PALC ? (PALC.mb || PALC.b) : "rgba(255,255,255,0.12)";   /* (536) sobre : contour neutre */
        var traitG = PALC ? (PALC.mc || PALC.t) : TURQL;
        var titreG = PALC ? (PALC.x || "#F4F6F7") : "#F4F6F7";
        var halG = PALC ? (PALC.g || "transparent") : tAg(0.07);
        var filetG = PALC ? (PALC.b || "rgba(255,255,255,0.10)") : "rgba(255,255,255,0.08)";
        return h("div", { key: kG, role: fermeG ? null : "button", onClick: actG || null,
          style: { position: "relative", borderRadius: 15, overflow: "hidden", border: "1px solid " + (fermeG ? "rgba(255,255,255,0.10)" : bordG), background: fondG, cursor: fermeG ? "default" : "pointer", height: 104, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "9px 4px 7px", boxShadow: "0 8px 22px rgba(0,0,0,0.35)", opacity: fermeG ? 0.5 : 1 } },
          h("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(90% 90% at 50% 0%, " + halG + ", transparent 70%)" } }),
          h("div", { style: { position: "relative", zIndex: 2, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid " + bordG, background: "rgba(8,12,16,0.45)", display: "flex", alignItems: "center", justifyContent: "center" } },
            h("svg", { viewBox: "0 0 24 24", style: { width: 20, height: 20, stroke: traitG, fill: "none", strokeWidth: 1.6, strokeLinecap: "round" } }, icG)),
          h("div", { style: { position: "relative", zIndex: 2, fontFamily: C, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, color: titreG, marginTop: 9, whiteSpace: "nowrap" } }, tiG),
          h("div", { style: { position: "relative", zIndex: 2, marginTop: "auto", paddingTop: 5, borderTop: "1px solid " + filetG, width: "86%", textAlign: "center", fontSize: 8, letterSpacing: "0.08em", fontWeight: 800, color: traitG, textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ctaG + " \u2192"));
      }
      var BIENTOT = T("Bient\u00f4t", "Soon", "Pronto", "Presto", "\u6e96\u5099\u4e2d", "Bald", "\u0642\u0631\u064a\u0628\u0627", "即将推出", "Binnenkort", "Em breve", "Snart", "Скоро", "Wkrótce", "곧 공개");
      var OUVRIR = T("Ouvrir", "Open", "Abrir", "Apri", "\u958b\u304f", "\u00d6ffnen", "\u0641\u062a\u062d", "打开", "Openen", "Abrir", "Öppna", "Открыть", "Otwórz", "열기");
      /* 14/09 (154) : marge du haut 10 -> 34 px, pour degager le mur immersif. */
      return h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, margin: "34px 16px 30px" } },   /* 28/09 (496) : 2 -> 30 px sous les 6 onglets (Blandine : « laisse plus d espace ») */
        carteG(h("g", null, h("circle", { cx: 9, cy: 8, r: 3.2 }), h("circle", { cx: 16.5, cy: 9.5, r: 2.4 }), h("path", { d: "M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 14.5c2.6.3 4.5 2.2 4.5 4.5" })),
          T("Cavaliers", "Riders", "Jinetes", "Cavalieri", "\u30e9\u30a4\u30c0\u30fc", "Reiter", "\u0627\u0644\u0641\u0631\u0633\u0627\u0646", "骑手", "Ruiters", "Cavaleiros", "Ryttare", "Всадники", "Jeźdźcy", "기수"), OUVRIR,
          /* 15/09 (163) : la page des cavaliers du club. Le club vise passe par
             window.__cavaliersClub, sur le modele de window.__agendaClub. */
          function () {
            try { window.__cavaliersClub = { nom: String(monClub || "").trim() }; } catch (eA4) { }
            setEcran("cavaliers-club");
          }, "gc"),
        carteG(h("g", null, h("path", { d: "M4 18c0-4 2.5-7 6-8l1.5-3 2 2.5c2.5.4 4.5 2.4 4.5 5.5 0 1.5-.6 2.8-1.5 3.8", strokeLinejoin: "round" }), h("path", { d: "M8 18v2m8-2v2" })),
          T("Chevaux", "Horses", "Caballos", "Cavalli", "\u99ac", "Pferde", "\u0627\u0644\u062e\u064a\u0648\u0644", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말"), OUVRIR,
          /* 14/09 (143) : la page existait deja - EcranEcurieHype, ecran « ecurie-hype ».
             15/09 (164) - CORRECTIF : cette page a DEUX MODES et il faut lui dire lequel AVANT
             d y aller. Sans contexte, elle affiche la galerie GLOBALE « L ecurie Hype » : tous
             les chevaux ayant accepte le partage, tous clubs confondus (28 sur sa capture de
             19 h 14). Avec window.__ecurieHypeClub pose avant la navigation, elle bascule sur
             le ROSTER DU CLUB et prend le nom de l ecurie - c est le mode que le bouton « Voir
             les X chevaux » de la page Club utilise depuis le 28/08, et celui qu elle attend
             ici. Mon lien du 143 ne posait pas ce contexte : d ou « L ECURIE HYPE » au lieu de
             « LES CHEVAUX DE ECURIE FEINN ». Blandine : « normalement on avait abandonne ce
             projet et la page avait ete renommee au nom de l ecurie concernee avec ses chevaux
             a chaque fois ». */
          function () {
            try { window.__ecurieHypeClub = String(monClub || "").trim() || null; } catch (eEh) { }
            setEcran("ecurie-hype");
          }, "gh"),
        carteG(h("g", null, h("rect", { x: 3.5, y: 5, width: 17, height: 15, rx: 2.5 }), h("path", { d: "M3.5 10h17M8 3.5v3m8-3v3" })),
          T("Agenda", "Agenda", "Agenda", "Agenda", "\u4e88\u5b9a", "Termine", "\u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f", "日程", "Agenda", "Agenda", "Kalender", "Календарь", "Kalendarz", "일정"), OUVRIR,
          function () { try { window.__agendaClub = monClub || ""; } catch (eA1) { } setEcran("agenda-club"); }, "ga"),
        carteG(h("g", null, h("rect", { x: 3.5, y: 5.5, width: 17, height: 13, rx: 2 }), h("path", { d: "M7 9.5h6M7 13h10M7 15.5h7" })),
          T("Actualit\u00e9s", "News", "Novedades", "Novit\u00e0", "\u6d3b\u52d5", "News", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"), OUVRIR,
          function () {
            try {
              window.__filEcurieCible = "ecurie:" + String(monClub || "").trim().toLowerCase();
              window.__filEcurieNom = String(monClub || "").trim();
            } catch (eA2) { }
            setEcran("actualites-ecurie");
          }, "gn"),
        carteG(h("g", null, h("rect", { x: 3.5, y: 5, width: 17, height: 14, rx: 2 }), h("circle", { cx: 9, cy: 10, r: 1.6 }), h("path", { d: "M4 17l4.5-4 3.5 3 3-2.5 4.5 4", strokeLinejoin: "round" })),
          T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "\u601d\u3044\u51fa", "Erinnerungen", "\u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억"), OUVRIR,
          function () {
            try { window.__souvenirsClub = { clef: String(monClub || "").trim().toLowerCase(), nom: String(monClub || "").trim() }; } catch (eA3) { }
            setEcran("souvenirs-club");
          }, "gs"),
        carteG(h("g", null, h("path", { d: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3.5a4.5 4.5 0 0 0 9 0V14" }), h("circle", { cx: 19, cy: 11.5, r: 2.2 })),
          T("Sant\u00e9", "Health", "Salud", "Salute", "\u5065\u5eb7", "Gesundheit", "\u0627\u0644\u0635\u062d\u0629", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강"), OUVRIR,
          /* 15/09 (170) : la sante de tous les chevaux de l ecurie. Le club vise passe par
             window.__santeClub, sur le modele de window.__agendaClub. */
          function () {
            try { window.__santeClub = { nom: String(monClub || "").trim() }; } catch (eA5) { }
            setEcran("sante-club");
          }, "gt"));
    })(),
    h("div", { style: { position: "relative", padding: "calc(env(safe-area-inset-top) + 24px) 18px 8px", textAlign: "center" } },
      /* 02/08 : le retour flottait AU MILIEU de l ecran, au-dessus de la carte de niveau
         (signale par Blandine). Il etait en position absolute dans ce conteneur, place APRES la
         banniere et les onglets — donc en plein milieu de page — alors que son decalage
         env(safe-area-inset-top) supposait qu il soit en haut. Passe en position fixed, coin
         haut-gauche, avec le verre fume de la fiche cheval (modele retenu par Blandine).
         Meme action, meme apparence : seule la position change.
         NB : l autre bouton retour au code identique (ecran de gestion de l ecurie) est
         volontairement laisse tel quel — son conteneur est bien en haut de page. */
      h("button", { onClick: function () { setEcran("moncavalier"); }, "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { position: "fixed", top: "calc(env(safe-area-inset-top) + 14px)", left: 14, zIndex: 60, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: "#fff", fontSize: 20, cursor: "pointer" } }, "\u2039")),
    AFFICHER_GAMIF_CLUB ? h("div", { style: { padding: "12px 16px 0" } },
      h("div", { style: { background: "linear-gradient(135deg, rgba(" + RGBT + ",0.222), rgba(7,9,12,0.92))", border: "1px solid rgba(" + RGBT + ",0.555)", borderRadius: 20, padding: "18px", display: "flex", alignItems: "center", gap: 16 } },
        cristal(niv.niveau),
        h("div", { style: { minWidth: 0 } },
          h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between" } },
            h("div", { style: { fontFamily: M, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#B9C6CC" } }, T("Niveau", "Level", "Nivel", "Livello", "\u30ec\u30d9\u30eb", "Stufe", "\u0627\u0644\u0645\u0633\u062a\u0648\u0649", "等级", "Niveau", "Nível", "Nivå", "Уровень", "Poziom", "레벨") + " " + niv.niveau),
            h("div", { style: { fontFamily: M, fontSize: 12, color: TURQL, fontWeight: 700 } }, "#" + monRang + " / " + liste.length)),
          h("div", { style: { height: 10, borderRadius: 6, background: "rgba(255,255,255,0.08)", overflow: "hidden", margin: "9px 0 6px" } },
            h("div", { style: { height: "100%", width: niv.pct + "%", background: "linear-gradient(90deg," + TURQL + "," + TURQ + ")", borderRadius: 6 } })),
          h("div", { style: { fontSize: 11.5, color: "#8A929C", fontFamily: M } }, maG.xp + " XP \u00b7 " + niv.reste + "/" + niv.besoin + " " + T("vers niv.", "to lvl", "a niv.", "a liv.", "\u6b21", "bis Stufe", "\u0646\u062d\u0648 \u0627\u0644\u0645\u0633\u062a\u0648\u0649", "升至等级", "naar niv.", "para o nív.", "mot nivå", "до ур.", "do poz.", "다음 레벨까지") + " " + (niv.niveau + 1))))) : null,
    AFFICHER_GAMIF_CLUB ? h("button", { onClick: function () { setEcran("quetes"); }, style: { display: "flex", alignItems: "center", gap: 6, margin: "10px 16px 0", padding: "7px 13px", borderRadius: 999, border: "1px solid rgba(" + RGBT + ",0.35)", background: "rgba(" + RGBT + ",0.08)", color: TURQL, fontSize: 11, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, "\ud83c\udfc6 " + T("Voir les qu\u00eates du club", "See club quests", "Ver misiones del club", "Vedi le missioni del club", "\u30ad\u30fc\u30af\u30b9\u3092\u898b\u308b", "Vereinsquests ansehen", "\u0639\u0631\u0636 \u0645\u0647\u0627\u0645 \u0627\u0644\u0646\u0627\u062f\u064a", "查看俱乐部任务", "Bekijk de quests van de manege", "Ver as missões do clube", "Se klubbens uppdrag", "Смотреть задания клуба", "Zobacz zadania klubu", "클럽 퀘스트 보기") + " \u203a") : null,
    /* 28/08 : le compteur MEMBRES est retire d ici, deplace a droite du nom du club
       dans le bandeau du haut (demande Blandine : « retire le au milieu, affiche-le
       a droite de l ecurie »). Le bloc restait ici uniquement pour lui tant que
       AFFICHER_GAMIF_CLUB est false ; plus rien a afficher a cet endroit desormais. */
    AFFICHER_GAMIF_CLUB ? h("div", { style: { padding: "14px 16px 0" } },
      h("div", { style: { display: "flex", gap: 6, padding: "14px 8px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" } },
        statMini(maG.membres, T("Membres", "Members", "Miembros", "Membri", "\u30e1\u30f3\u30d0\u30fc", "Mitglieder", "\u0627\u0644\u0623\u0639\u0636\u0627\u0621", "成员", "Leden", "Membros", "Medlemmar", "Участники", "Członkowie", "멤버")),
        statMini(maG.hf, T("Hauts faits", "Feats", "Logros", "Imprese", "\u5b9f\u7e3e", "Erfolge", "\u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a", "成就", "Prestaties", "Conquistas", "Bedrifter", "Достижения", "Osiągnięcia", "하이라이트")),
        statMini(maG.res, T("R\u00e9sultats", "Results", "Result.", "Risult.", "\u6210\u7e3e", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")),
        statMini(maG.pod, T("Podiums", "Podiums", "Podios", "Podi", "\u8868\u5f70\u53f0", "Podestpl\u00e4tze", "\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u062a\u062a\u0648\u064a\u062c", "领奖台", "Podiums", "Pódios", "Prispallsplaceringar", "Пьедесталы", "Podia", "시상대"), "#E8C887"))) : null,
    AFFICHER_GAMIF_CLUB ? h("div", { style: { padding: "8px 20px 0", fontSize: 10.5, color: "#6B7580", fontFamily: M, fontStyle: "italic", textAlign: "center" } }, T("XP = membres\u00d710 + hauts faits\u00d75 + r\u00e9sultats\u00d73 + podiums\u00d78", "XP = members\u00d710 + feats\u00d75 + results\u00d73 + podiums\u00d78", "", "", "", "XP = Mitglieder\u00d710 + Erfolge\u00d75 + Ergebnisse\u00d73 + Podestpl\u00e4tze\u00d78", "XP = \u0627\u0644\u0623\u0639\u0636\u0627\u0621\u00d710 + \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a\u00d75 + \u0627\u0644\u0646\u062a\u0627\u0626\u062c\u00d73 + \u0645\u0646\u0635\u0627\u062a \u0627\u0644\u062a\u062a\u0648\u064a\u062c\u00d78", "XP = 成员×10 + 成就×5 + 成绩×3 + 领奖台×8", "XP = leden×10 + prestaties×5 + resultaten×3 + podiumplaatsen×8", "XP = membros×10 + conquistas×5 + resultados×3 + pódios×8", "XP = medlemmar×10 + bedrifter×5 + resultat×3 + prispallsplatser×8", "XP = участники×10 + достижения×5 + результаты×3 + пьедесталы×8", "XP = członkowie×10 + osiągnięcia×5 + wyniki×3 + podia×8", "XP = 멤버×10 + 업적×5 + 결과×3 + 시상대×8")) : null,
    h("div", { style: { padding: "0 16px 0", marginTop: -18 } }, /* 30/08 (Blandine : « remonte un peu la citation ») */
      h(TableauxSpectralHype, { mode: "club", sansHistoire: true /* (536) « un seul endroit ou ecrire suffit » */, nomClub: monClub, titreCourt: { fr: "La philosophie du club", en: "The club's philosophy", es: "La filosofía del club", it: "La filosofia del club", ja: "クラブの哲学", de: "Die Philosophie des Vereins", ar: "\u0641\u0644\u0633\u0641\u0629 \u0627\u0644\u0646\u0627\u062f\u064a", zh: "俱乐部理念", nl: "De filosofie van de manege", pt: "A filosofia do clube", sv: "Klubbens filosofi", ru: "Философия клуба", pl: "Filozofia klubu", ko: "클럽의 철학" }, titreLong: { fr: "L'histoire du club", en: "The club's story", es: "La historia del club", it: "La storia del club", ja: "クラブの物語", de: "Die Geschichte des Vereins", ar: "\u0642\u0635\u0629 \u0627\u0644\u0646\u0627\u062f\u064a", zh: "俱乐部的故事", nl: "Het verhaal van de manege", pt: "A história do clube", sv: "Klubbens historia", ru: "История клуба", pl: "Historia klubu", ko: "클럽 이야기" }, defautVoix: { fr: "Rassembler des cavaliers autour d'une même passion : le cheval, le progrès et le plaisir de monter ensemble.", en: "Bringing riders together around one shared passion: the horse, progress and the joy of riding together.", es: "Reunir a jinetes en torno a una misma pasión: el caballo, el progreso y el placer de montar juntos.", it: "Riunire i cavalieri attorno a una stessa passione: il cavallo, il progresso e il piacere di cavalcare insieme.", ja: "馬、上達、そして共に乗る喜び — ひとつの情熱のもとに騎手が集う場所。", de: "Reiter um eine gemeinsame Leidenschaft versammeln: das Pferd, den Fortschritt und die Freude, zusammen zu reiten.", ar: "\u062c\u0645\u0639 \u0627\u0644\u0641\u0631\u0633\u0627\u0646 \u062d\u0648\u0644 \u0634\u063a\u0641 \u0648\u0627\u062d\u062f: \u0627\u0644\u062d\u0635\u0627\u0646\u060c \u0648\u0627\u0644\u062a\u0642\u062f\u0645\u060c \u0648\u0645\u062a\u0639\u0629 \u0627\u0644\u0631\u0643\u0648\u0628 \u0645\u0639\u0627.", zh: "让骑手们因为同一份热爱聚在一起：热爱马，热爱进步，热爱一起骑马的快乐。", nl: "Ruiters samenbrengen rond één gedeelde passie: het paard, vooruitgang en het plezier van samen rijden.", pt: "Reunir cavaleiros em torno de uma mesma paixão: o cavalo, a evolução e o prazer de montar juntos.", sv: "Samla ryttare kring en gemensam passion: hästen, framstegen och glädjen i att rida tillsammans.", ru: "Объединять всадников вокруг одной страсти: лошади, прогресса и радости совместной езды.", pl: "Łączyć jeźdźców wokół wspólnej pasji: konia, postępów i radości wspólnej jazdy.", ko: "말, 성장, 함께 타는 즐거움이라는 같은 열정으로 기수들을 하나로 모아요." }, defautHist: { fr: "L'histoire de ce club s'écrit à chaque foulée, concours après concours, amitié après amitié.", en: "This club's story is written stride after stride, show after show, friendship after friendship.", es: "La historia de este club se escribe a cada tranco, concurso tras concurso, amistad tras amistad.", it: "La storia di questo club si scrive falcata dopo falcata, concorso dopo concorso, amicizia dopo amicizia.", ja: "このクラブの物語は、一歩ごとに、大会ごとに、友情ごとに紡がれていく。", de: "Die Geschichte dieses Vereins schreibt sich Tritt für Tritt, Turnier für Turnier, Freundschaft für Freundschaft.", ar: "\u062a\u0643\u062a\u0628 \u0642\u0635\u0629 \u0647\u0630\u0627 \u0627\u0644\u0646\u0627\u062f\u064a \u0645\u0639 \u0643\u0644 \u062e\u0637\u0648\u0629\u060c \u0645\u0633\u0627\u0628\u0642\u0629 \u0628\u0639\u062f \u0645\u0633\u0627\u0628\u0642\u0629\u060c \u0648\u0635\u062f\u0627\u0642\u0629 \u0628\u0639\u062f \u0635\u062f\u0627\u0642\u0629.", zh: "这个俱乐部的故事，每一步都在书写：一场又一场比赛，一份又一份友谊。", nl: "Het verhaal van deze manege wordt geschreven met elke galopsprong, wedstrijd na wedstrijd, vriendschap na vriendschap.", pt: "A história deste clube é escrita a cada passada, competição após competição, amizade após amizade.", sv: "Den här klubbens historia skrivs språng för språng, tävling efter tävling, vänskap efter vänskap.", ru: "История этого клуба пишется с каждым шагом, соревнование за соревнованием, дружба за дружбой.", pl: "Historia tego klubu pisze się z każdym krokiem, zawody po zawodach, przyjaźń po przyjaźni.", ko: "이 클럽의 이야기는 한 보 한 보, 대회마다, 우정이 쌓일 때마다 쓰이고 있어요." }, editable: (typeof clubRevendiquePar === "function" && clubRevendiquePar(monClub, moiG)), noteModale: { fr: "Visible par tous les membres du club.", en: "Visible to all club members.", es: "Visible para todos los miembros del club.", it: "Visibile a tutti i membri del club.", ja: "クラブの全メンバーに表示されます。", de: "Für alle Vereinsmitglieder sichtbar.", ar: "\u0638\u0627\u0647\u0631 \u0644\u0643\u0644 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0646\u0627\u062f\u064a.", zh: "俱乐部所有成员都能看到。", nl: "Zichtbaar voor alle leden van de manege.", pt: "Visível para todos os membros do clube.", sv: "Synlig för alla klubbens medlemmar.", ru: "Видно всем участникам клуба.", pl: "Widoczne dla wszystkich członków klubu.", ko: "클럽 멤버 모두에게 보여요." } }),
      /* 19/09 (248) : LE NOMBRE TOTAL DE CAVALIERES, passe a l encart. Sa demande : « le
         nombre de cavaliers de l ecurie ne s affiche plus donc je sais pas combien il y en
         a », puis « nombre de cavaliers total oui », « y compris celles en seconde ecurie ».
         On prend `maG.membres`, qui vient de `classement_ecuries()` : cette fonction compte
         DEJA les deux ecuries, avec un distinct pour ne compter personne deux fois. */
      /* (536) Blandine : « on peut retirer l encart avec les cavaliers du club, on les retrouve sur leur page ».
         Inviter / retirer un cavalier passent sur la page Cavaliers (EcranCavaliersClub). */
      false ? h(EncartCavaliersSpectral, { titre: T("Cavaliers de l'\u00e9curie", "Riders of the stable", "Jinetes del club", "Cavalieri della scuderia", "\u30af\u30e9\u30d6\u306e\u30e9\u30a4\u30c0\u30fc", "Reiter des Stalls", "\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的骑手", "Ruiters van de stal", "Cavaleiros da cocheira", "Stallets ryttare", "Всадники конюшни", "Jeźdźcy stajni", "마구간 기수들"), nomTeam: monClub || "", total: (maG && maG.membres) ? Number(maG.membres) : 0, cavaliers: cavaliersAff || [], reglable: (typeof clubRevendiquePar === "function" && clubRevendiquePar(monClub, moiG)), onOuvrir: ouvrirCavalierClub, onRetirer: moiG ? basculerChoisi : null, onAjouter: moiG ? ouvrirSelecteurCav : null,
        /* \U0001f7e9 06/09 (Blandine) \u2014 retirer un cavalier de l'ecurie : reserve a la
           proprietaire de l'ecurie (clubRevendiquePar) ou aux moderatrices Hype. Le retrait
           est global (visible de tout le monde), pas juste un retrait de sa liste perso. */
        /* 🟥 19/09 (247) — LA CROIX DEMANDE CONFIRMATION. Son signalement : « je crois que
           j ai retiré des cavaliers de l écurie en cliquant par mégarde sur la petite croix,
           aucun élément de confirmation rien », puis « faudrait faire confirmer là, j ai
           miss clic et paf ». Verifie en base : Chloe avait bien ete exclue par erreur.
           ⚠️ CE RETRAIT EST GLOBAL, visible de tout le monde — il ne s agit pas d un
           masquage perso. Un seul toucher ne peut pas suffire.
           MECANIQUE : DEUX TOUCHERS, la meme que pour retirer une epingle (build 199,
           validee par elle). Le premier ARME et affiche un bandeau nommant la cavaliere ;
           le second, sur la MEME croix, execute. N importe quel autre geste annule.
           PAS DE CARTE A BOUTONS : sa regle, elle clique dessus par accident. */
        onExclure: ((typeof clubRevendiquePar === "function" && clubRevendiquePar(monClub, moiG)) || estModerateurHype(moiG)) ? function (p) {
          if (!p || !p.id) return;
          if (!exDemande || exDemande.id !== p.id) { setExDemande({ id: p.id, pseudo: p.pseudo || "" }); return; }
          setExDemande(null);
          setMembres(function (mm) { return (mm || []).filter(function (m) { return m && m.id !== p.id; }); });
          setChoisis(function (cs) { return (cs || []).filter(function (c) { return c && c.id !== p.id; }); });
          try { exclureCavalierEcurie(p.id, monClub); } catch (eEx) { }
        } : null }) : null,
      /* Le bandeau de confirmation. Il NOMME la cavaliere : c est ce qui manquait pour
         qu un toucher par megarde se voie avant d etre execute. */
      exDemande ? h("div", { style: { position: "fixed", left: 12, right: 12, bottom: "calc(env(safe-area-inset-bottom) + 84px)", zIndex: 8300, padding: "13px 15px", borderRadius: 16, background: "rgba(12,16,22,0.97)", border: "1px solid rgba(255,154,168,0.45)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" } },
        h("div", { style: { fontFamily: M, fontSize: 12.5, color: "#FFD3D9", lineHeight: 1.5 } },
          T("Retirer ", "Remove ", "Quitar ", "Rimuovere ", "", "", "\u0625\u0632\u0627\u0644\u0629 ", "移除", "Verwijder ", "Tirar ", "Ta bort ", "Убрать ", "Usunąć ", " ")
            + (exDemande.pseudo || T("cette cavali\u00e8re", "this rider", "esta jinete", "questa amazzone", "", "", "\u0647\u0630\u0647 \u0627\u0644\u0641\u0627\u0631\u0633\u0629", "这位骑手", "deze ruiter", "esta amazona", "den här ryttaren", "эту всадницу", "tę amazonkę", "이 기수"))
            + T(" de l\u2019\u00e9curie ? Touche la croix une seconde fois pour confirmer.",
                " from the stable? Tap the cross again to confirm.",
                " de la cuadra? Toca la cruz otra vez para confirmar.",
                " dalla scuderia? Tocca di nuovo la croce per confermare.",
                "\u3092\u53d6\u308a\u6d88\u3057\u307e\u3059\u304b\uff1f\u3082\u3046\u4e00\u5ea6\u30d0\u30c4\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
                " aus dem Stall entfernen? Kreuz erneut tippen.", " \u0645\u0646 \u0627\u0644\u0625\u0633\u0637\u0628\u0644\u061f \u0627\u0644\u0645\u0633\u064a \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0645\u0631\u0629 \u062b\u0627\u0646\u064a\u0629 \u0644\u0644\u062a\u0623\u0643\u064a\u062f.", " 出马厩吗？再点一次叉号确认。", " uit de stal? Tik nog een keer op het kruisje om te bevestigen.", " da cocheira? Toque na cruz mais uma vez para confirmar.", " från stallet? Tryck på krysset en gång till för att bekräfta.", " из конюшни? Нажми на крестик ещё раз, чтобы подтвердить.", " ze stajni? Dotknij krzyżyka jeszcze raz, aby potwierdzić.", " 를 마구간에서 뺄까요? 확인하려면 X를 한 번 더 눌러 주세요.")),
        h("div", { role: "button", onClick: function () { setExDemande(null); },
          style: { marginTop: 9, display: "inline-block", padding: "7px 15px", minHeight: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", color: "#EDF2F5", fontFamily: M, fontSize: 12, fontWeight: 700, cursor: "pointer" } },
          T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"))) : null,
      selCav ? h("div", { style: { position: "fixed", inset: 0, zIndex: 8200, background: "rgba(4,6,9,0.72)", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }, onClick: function () { setSelCav(false); } },
        h("div", { onClick: function (eSh) { eSh.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "78vh", display: "flex", flexDirection: "column", background: "#0C1016", borderRadius: "22px 22px 0 0", border: "1px solid rgba(" + RGBT + ",0.3)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
          h("div", { style: { fontFamily: C, fontSize: 15, letterSpacing: 1.8, color: "#EDF2F5", textAlign: "center", textTransform: "uppercase" } }, T("Compose ton \u00e9curie", "Build your stable", "Compone tu cuadra", "Componi la tua scuderia", "\u53a9\u820e\u3092\u30c7\u30b6\u30a4\u30f3", "Stell deinen Stall zusammen", "\u0643\u0648\u0646\u064a \u0625\u0633\u0637\u0628\u0644\u0643", "组建你的马厩", "Stel je stal samen", "Monte sua cocheira", "Skapa ditt stall", "Собери свою конюшню", "Stwórz swoją stajnię", "내 마구간 꾸리기")),
          h("div", { style: { fontSize: 11.5, color: "#8A929C", fontFamily: M, textAlign: "center", margin: "6px 0 14px", lineHeight: 1.5 } }, T("Choisis les cavaliers de ta communaut\u00e9 id\u00e9ale \u2014 ils appara\u00eetront sur ta page.", "Pick the riders of your ideal community \u2014 they'll appear on your page.", "Elige los jinetes de tu comunidad ideal.", "Scegli i cavalieri della tua comunit\u00e0 ideale.", "\u7406\u60f3\u306e\u30b3\u30df\u30e5\u30cb\u30c6\u30a3\u3092\u9078\u3082\u3046", "W\u00e4hle die Reiter deiner idealen Gemeinschaft \u2013 sie erscheinen auf deiner Seite.", "\u0627\u062e\u062a\u0627\u0631\u064a \u0641\u0631\u0633\u0627\u0646 \u0645\u062c\u062a\u0645\u0639\u0643 \u0627\u0644\u0645\u062b\u0627\u0644\u064a \u2014 \u0633\u064a\u0638\u0647\u0631\u0648\u0646 \u0641\u064a \u0635\u0641\u062d\u062a\u0643.", "选出你理想社区中的骑手——他们会出现在你的页面上。", "Kies de ruiters van je ideale community — ze verschijnen op je pagina.", "Escolha os cavaleiros da sua comunidade ideal — eles vão aparecer na sua página.", "Välj ryttarna i din drömcommunity — de visas på din sida.", "Выбери всадников своего идеального сообщества — они появятся на твоей странице.", "Wybierz jeźdźców swojej wymarzonej społeczności — pojawią się na twojej stronie.", "이상적인 커뮤니티의 기수들을 골라 보세요. 내 페이지에 표시돼요.")),
          h("input", { value: rechQ, onChange: function (eQ) { majRechercheCav(eQ.target.value); }, placeholder: T("Rechercher un cavalier\u2026", "Search a rider\u2026", "Buscar un jinete\u2026", "Cerca un cavaliere\u2026", "\u30e9\u30a4\u30c0\u30fc\u3092\u691c\u7d22\u2026", "Reiter suchen\u2026", "\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0641\u0627\u0631\u0633\u2026", "搜索骑手…", "Zoek een ruiter…", "Procurar um cavaleiro…", "Sök en ryttare…", "Найти всадника…", "Szukaj jeźdźca…", "기수 검색…"), style: { width: "100%", padding: "12px 15px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(" + RGBT + ",0.3)", color: "#EDF2F5", fontSize: 16, fontFamily: M, outline: "none" } }),
          h("div", { style: { overflowY: "auto", marginTop: 10, WebkitOverflowScrolling: "touch", minHeight: 120 } },
            (function () {
              var src = (rechQ.trim().length >= 2) ? rechRes : suggestions;
              if (src === null) return h("div", { style: { color: "#5B646E", fontSize: 12.5, fontFamily: M, textAlign: "center", padding: "22px 0" } }, "\u2026");
              var lst = (src || []).filter(function (p) { return p && p.id && (!moiG || p.id !== moiG.id); });
              if (!lst.length) return h("div", { style: { color: "#5B646E", fontSize: 12.5, fontFamily: M, fontStyle: "italic", textAlign: "center", padding: "22px 0" } }, T("Aucun cavalier trouv\u00e9.", "No rider found.", "Ning\u00fan jinete encontrado.", "Nessun cavaliere trovato.", "\u30e9\u30a4\u30c0\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093", "Kein Reiter gefunden.", "\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0623\u064a \u0641\u0627\u0631\u0633.", "没有找到骑手。", "Geen ruiter gevonden.", "Nenhum cavaleiro encontrado.", "Ingen ryttare hittades.", "Всадники не найдены.", "Nie znaleziono jeźdźca.", "기수를 찾지 못했어요."));
              return lst.map(function (p) {
                var deja = (choisis || []).some(function (x) { return x.id === p.id; });
                var iniP = ((p.pseudo || "?").trim().charAt(0) || "?").toUpperCase();
                return h("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 11, padding: "10px 2px", borderBottom: "1px solid rgba(255,255,255,0.05)" } },
                  h("div", { style: { width: 40, height: 40, borderRadius: "50%", flexShrink: 0, overflow: "hidden", border: "1px solid rgba(" + RGBT + ",0.35)", background: "#10161C", display: "flex", alignItems: "center", justifyContent: "center" } },
                    p.avatar_url ? h("img", { src: p.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : h("span", { style: { fontFamily: C, fontSize: 16, fontWeight: 700, color: TURQL } }, iniP)),
                  h("div", { style: { minWidth: 0 } },
                    h("div", { style: { fontSize: 13, fontWeight: 700, color: "#EDF2F5", fontFamily: M, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.pseudo || "Cavalier"),
                    h("div", { style: { fontSize: 10.5, color: "#6B7580", fontFamily: M, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [p.ecurie, p.ville].filter(Boolean).join(" \u00b7 ") || "\u00a0")),
                  h("button", { onClick: function () { basculerChoisi(p); }, style: deja
                    ? { flexShrink: 0, padding: "7px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(237,242,245,0.55)", fontSize: 11, fontWeight: 800, fontFamily: M, cursor: "pointer" }
                    : { flexShrink: 0, padding: "7px 14px", borderRadius: 999, border: "none", background: "linear-gradient(90deg," + TURQ + "," + TURQL + ")", color: "#04252A", fontSize: 11, fontWeight: 800, fontFamily: M, cursor: "pointer" } },
                    deja ? T("Retirer", "Remove", "Quitar", "Rimuovi", "\u524a\u9664", "Entfernen", "\u0625\u0632\u0627\u0644\u0629", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제") : T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가")));
              });
            })()),
          h("button", { onClick: function () { setSelCav(false); }, style: { marginTop: 12, width: "100%", padding: "13px 0", borderRadius: 14, border: "1px solid rgba(" + RGBT + ",0.4)", background: "rgba(" + RGBT + ",0.08)", color: TURQL, fontSize: 13.5, fontWeight: 800, fontFamily: M, cursor: "pointer" } }, T("Termin\u00e9", "Done", "Hecho", "Fatto", "\u5b8c\u4e86", "Fertig", "\u062a\u0645", "已完成", "Beëindigd", "Encerrado", "Avslutad", "Завершено", "Zakończono", "완료")))) : null),
    h("div", { style: { padding: "46px 16px 0" } },
      h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 } },
        /* 01/09 (Blandine) : le titre « CHEVAUX DU CLUB » est RETIRE — la carte
           centrale de la mosaique le porte desormais, il etait ecrit deux fois.
           La rangee est conservee pour le compteur et « + Ajouter », qui
           restent a droite comme avant. */
        null,
        h("div", { style: { display: "flex", alignItems: "baseline", gap: 12 } },
          (chevauxClub && chevauxClub.length) ? h("div", { style: { fontFamily: M, fontSize: 12, fontWeight: 700, color: TURQL } }, chevauxClub.length) : null,
          h("button", { onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { background: "none", border: "none", color: TURQL, fontSize: 12, fontWeight: 700, fontFamily: M, cursor: "pointer", padding: 0 } }, "+ " + T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가")))),
      /* 14/08 (demande de Blandine) : « les chevaux du club c'est LA pour le
         coup ou ils doivent apparaitre en grand ! Reprends l'encodage que tu
         as sur la page cavalier ». Le rail defilant de vignettes 108 px (qui
         n'en montrait que trois sur dix-huit) devient la MEME GRILLE que
         Mes chevaux : 3 colonnes, cartes 4/5, tous les chevaux visibles.
         28/08 (nouvelle demande, doc « MODIFICATION PAGE CLUB HYPE — CHEVAUX
         DU CLUB ») : la grille se plafonne desormais a 9 (3x3, priorite photo,
         plus de race/discipline en dessous du nom -- "pas un catalogue
         administratif"). Au-dela de 9, un bouton "Voir les X chevaux" apparait
         SOUS la grille et renvoie vers l'ECURIE HYPE (ecran "ecurie-hype") --
         PAS vers l'ancienne page ecurie perso (#ancienne-ecurie) : Blandine a
         explicitement corrige son propre document sur ce point avant de
         l'envoyer. Aucune autre fonctionnalite de la page touchee. */
      /* 01/09 (Blandine, maquette a l'appui : « une presentation similaire avec
         les encarts des chevaux autour et ecrit LES CHEVAUX DE L'ECURIE au
         milieu ») — LA CARTE CENTRALE. Option A, son choix : la carte occupe la
         CASE DU MILIEU de la grille 3x3, elle ne se pose PAS par-dessus. Aucun
         cheval n'est masque ni rendu intapable : la grille montre 8 chevaux au
         lieu de 9, et la 5e case est la carte.
         ⚠️ La carte est inseree A L'INDEX 4 : en flux de grille, la 5e cellule
         tombe exactement en ligne 2, colonne 2. Avec moins de 5 chevaux elle est
         simplement ajoutee a la suite — pas de case vide fabriquee.
         ⚠️ Elle porte le MEME gabarit que les cartes chevaux (rapport 4/5 + une
         ligne de nom vide dessous), sinon la rangee du milieu serait plus courte
         que les autres et la grille se decalerait. */
      (chevauxClub && chevauxClub.length) ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, paddingBottom: 4 } },
        (function () {
          var cellules = chevauxClub.slice(0, 8).map(function (cv, i) {
          return h("button", { key: cv.id || i, onClick: function () {
            /* 29/08 (demande Blandine : « quand je clique sur une fiche cheval dans
               l'ecurie je m'attends a voir SA fiche, pas la fiche communautaire ») —
               cette grille ouvrait TOUJOURS la page publique, ce qui se defendait quand
               elle ne montrait que les chevaux des autres membres. Pour SES PROPRES
               chevaux, c'est la vraie fiche qu'on attend (celle qui permet de gerer
               photos, histoire, palmares). On aiguille donc selon le proprietaire ;
               les chevaux des autres membres gardent la page publique. */
            /* 29/08 (regle posee par Blandine) : depuis la page Ecurie / Club, TOUS les
               chevaux ouvrent LEUR FICHE — la sienne comme celle des autres membres.
               La page communautaire ne s'atteint QUE par le lien « Decouvrir l'histoire
               de X a travers N autres aventures » en bas d'une fiche (PontChevalCommun),
               qui lui est deja branche correctement. Cette grille l'ouvrait pour tout le
               monde : c'etait la porte d'entree en trop. */
            try {
              if (typeof window === "undefined" || !cv || !cv.id) return;
              window.__chevalOuvert = cv.id; setEcran("cheval");
            } catch (eOc) { } }, style: { background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", minWidth: 0 } },
            h("div", { style: { position: "relative", width: "100%", aspectRatio: "4 / 5", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(" + RGBT + ",0.28)", background: "#10161C", display: "flex", alignItems: "center", justifyContent: "center" } },
              cv.photo_url ? h("img", { src: cv.photo_url, alt: cv.nom || "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : h(PortraitChevalSpectral, { compact: true }),
              (liensClub && liensClub[cv.id] > 1) ? h("div", { style: { position: "absolute", bottom: 6, right: 6, width: 26, height: 30, clipPath: "polygon(50% 0%,93% 20%,100% 58%,74% 97%,50% 100%,26% 97%,0% 58%,7% 20%)", background: "linear-gradient(160deg,#1A1E22,#0B0E11)" /* (536) sobre */, display: "grid", placeItems: "center", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: TURQ, filter: "drop-shadow(0 0 6px rgba(0,0,0,.6))" } }, String(liensClub[cv.id])) : null),
            h("div", { style: { marginTop: 6, fontSize: 12, fontFamily: C, fontWeight: 700, color: "#EDF2F5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, cv.nom || hypeT7("Cheval", "Horse", "Caballo", "Cavallo", "\u99ac", "Pferd", "\u062d\u0635\u0627\u0646", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말")));
          });
          var carteCentre = h("button", { key: "__carteCentreChevaux", onClick: function () { try { window.__ecurieHypeClub = monClub; } catch (eCc) { } setEcran("ecurie-hype"); }, style: { background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", minWidth: 0 } },
            h("div", { style: { width: "100%", aspectRatio: "4 / 5", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(" + RGBT + ",0.34)", background: "linear-gradient(160deg, rgba(12,18,24,0.96), rgba(6,7,9,0.98))", boxShadow: "0 10px 26px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 7px" } },
              h("div", { style: { fontFamily: C, fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#EDF2F5", textAlign: "center", lineHeight: 1.35 } },
                T("Les chevaux de l'\u00e9curie", "The stable's horses", "Los caballos de la cuadra", "I cavalli della scuderia", "\u53a9\u820e\u306e\u99ac", "Die Pferde des Stalls", "\u062e\u064a\u0648\u0644 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말들")),
              h("div", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, color: TURQL, textAlign: "center" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "\u3059\u3079\u3066", "Alle ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + " \u2192")),
            /* Ligne vide au gabarit du nom : garde les rangees alignees. */
            h("div", { style: { marginTop: 6, fontSize: 12, fontFamily: C, fontWeight: 700, color: "transparent", whiteSpace: "nowrap" } }, "\u00a0"));
          return hypePlacerAuMilieu(cellules, carteCentre, "__videCentreChevaux");   /* 27/09 (449) : avant, au centre des 5 chevaux, sinon a la fin */
        })())
        : h("div", { style: { fontSize: 11.5, color: "#6B7580", fontFamily: M, fontStyle: "italic" } }, T("Les chevaux des cavaliers du club appara\u00eetront ici.", "Horses of the club's riders will appear here.", "Los caballos de los jinetes del club aparecer\u00e1n aqu\u00ed.", "I cavalli dei cavalieri del club appariranno qui.", "\u30af\u30e9\u30d6\u306e\u30e9\u30a4\u30c0\u30fc\u306e\u99ac\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Die Pferde der Vereinsreiter erscheinen hier.", "\u0633\u062a\u0638\u0647\u0631 \u0647\u0646\u0627 \u062e\u064a\u0648\u0644 \u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0646\u0627\u062f\u064a.", "俱乐部骑手的马会显示在这里。", "De paarden van de ruiters van de manege verschijnen hier.", "Os cavalos dos cavaleiros do clube vão aparecer aqui.", "Hästarna som tillhör klubbens ryttare visas här.", "Лошади всадников клуба появятся здесь.", "Tutaj pojawią się konie jeźdźców z klubu.", "클럽 기수들의 말이 여기에 표시돼요.")),
      /* 29/08 : seuil « > 9 chevaux » retire (demande Blandine) — un club plus petit
         n'avait aucun acces a l'Ecurie Hype depuis sa page. Le bouton s'affiche des
         qu'il y a au moins un cheval. */
      /* 27/09 (445) : bouton « Voir les N chevaux » RETIRE (doublon de la carte du milieu « Les chevaux
         de l ecurie · Voir tout », meme destination ecurie-hype). Blandine : « on peut le retirer ? » */
      null),

      /* 03/09 (Blandine) : « les derniers resultats devraient remonter avant la
         gestion de mes chevaux — on garde ce qui est propre a l ecurie en haut et
         ce qui est plus perso en bas ». Le bloc passe donc AVANT le separateur
         « Ma gestion ». Les paddings d origine sont conserves tels quels. */
            /* 02/09 (Blandine) : le bloc des derniers resultats REMONTE juste sous
               « Mes chevaux ». L agenda, la clinique, la sellerie et l album de
               l ecurie descendent chacun d un cran. */
    h("div", { style: { padding: "46px 16px 0" } },
      h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12, padding: "0 4px" } },
        /* 01/09 (decision de Blandine) : LE TITRE OUVRE LA PAGE, et un lien
           « Voir tout » a cote fait la meme chose. Les deux mènent au meme
           endroit — elle voulait les deux, pas l'un ou l'autre. */
        /* 01/09 : « Palmares » ne convient plus a un bloc trie par date — le mot
           reste libre pour la partie « grands resultats passes » a venir. */
        h("div", { role: "button", onClick: function () { try { window.__perfClub = monClub; } catch (ePc) { } setEcran("perf-concours"); }, style: { fontFamily: C, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" } }, T("Derniers r\u00e9sultats", "Latest results", "\u00daltimos resultados", "Ultimi risultati", "\u6700\u65b0\u306e\u7d50\u679c", "Neueste Ergebnisse", "\u0622\u062e\u0631 \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "最近成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Ostatnie wyniki", "최근 결과")),
        h("div", { role: "button", onClick: function () { try { window.__perfClub = monClub; } catch (ePc2) { } setEcran("perf-concours"); }, style: { fontFamily: M, fontSize: 11.5, fontWeight: 700, color: TURQL, cursor: "pointer", whiteSpace: "nowrap" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "\u3059\u3079\u3066", "Alle", "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + " \u2192")),
      /* 30/08 — LE RAIL AUX COUPES, au-dessus du fil. Rempli AUTOMATIQUEMENT par les
         regles de Blandine (titres > niveau > partants > rang) ; un resultat epingle
         passe devant. Podium seulement : un rail de coupes ne montre pas des 12es. */
      /* 20/09 (293) : LES CARTES NE S ETIRENT PLUS. Blandine : « les derniers resultats sont
         super longs comparé à avant et aux autres encarts ». Dans une rangee flex, les cartes
         prenaient toutes la hauteur de la PLUS HAUTE (celle dont le texte revient a la ligne),
         d ou le grand vide sous les autres. `alignItems: flex-start` : chaque carte s arrete a
         son contenu. */
      /* 21/09 (304) : LES CARTES DE RESULTATS PRENNENT LA MESURE DES CARTES DE RENDEZ-VOUS.
         Blandine : « aligne les encoches des rendez-vous et des resultats, meme taille meme
         alignement », puis « la meme modif partout ou il y a les cartes ». Largeur 158 px ->
         46 % (la regle de .agc-cell), coins 14 -> 20 (.agc-c2), nom du concours limite a 2
         lignes, et la rangee ETIREE : toutes les cartes ont la meme hauteur. ⚠️ C EST
         L INVERSE DU 293 (flex-start), ASSUME : elle demande la meme taille ; la limite a
         2 lignes borne la carte la plus haute. Meme changement sur la page cavaliere
         (BlocResultatsCavaliere) et la fiche cheval (rail du bas), dont les rangees etaient
         deja etirees. Le rail du HAUT de la fiche cheval, neutralise au 116, n est pas touche. */
      (railClub && railClub.length) ? h("div", { style: { display: "flex", alignItems: "stretch", gap: 10, overflowX: "auto", padding: "0 0 10px", marginBottom: 4, WebkitOverflowScrolling: "touch" }, "data-hscroll": "1" },
        railClub.map(function (gr, iR) {
          var meilleur = (gr.places || []).slice().sort(function (a5, b5) { return (a5.rang || 99) - (b5.rang || 99); })[0] || {};
          var coup = meilleur.rang === 1 ? "\ud83c\udfc6" : meilleur.rang === 2 ? "\ud83e\udd48" : "\ud83e\udd49";
          var qui = meilleur.saisi ? (meilleur.cavalier || meilleur.cheval || "") : (meilleur.cavalier || (((membres || []).filter(function (p6) { return p6.id === meilleur.user_id; })[0] || {}).pseudo) || "");
          /* 01/09 (maquette validee par Blandine, variante "medaillon rond") —
             LA CARTE VERTICALE DU PALMARES.
             Ordre voulu par elle, corrige en seance : medaille et annee,
             PUIS le portrait, PUIS la phrase « 1er LIAM ROUX sur Rizotto »
             posee exactement la ou se trouvait le nom du cheval, PUIS le
             concours et l'epreuve.
             ⚠️ LE CHEVAL N'EST NOMME QU'UNE FOIS. La premiere maquette portait
             son nom sous le portrait ET dans la phrase : « t'as ecrit Rizotto
             deux fois ». Ne pas remettre un titre avec le nom du cheval.
             ⚠️ SANS PHOTO, PAS DE TROU : le medaillon n'est pas dessine du tout
             et le reste remonte (« ou tu en mets rien tant pis si t'en as
             pas »). Pas de portrait generique — c'est ce qui a fait ecarter la
             maquette de droite. */
          var infoCh = (meilleur.cheval_id && chevauxRail[meilleur.cheval_id]) ? chevauxRail[meilleur.cheval_id] : null;
          var nomCh = (infoCh && infoCh.nom) || meilleur.cheval || "";
          var photoCh = (infoCh && infoCh.photo) || "";
          var rangTxt = meilleur.rang ? (String(meilleur.rang) + (meilleur.rang === 1 ? "er" : "e")) : "";
          /* Les rangs gardent leurs couleurs de metal : elles portent une
             information que le fond ne porte pas (regle du 30/08). */
          var metal = meilleur.rang === 1 ? "#E8C77A" : meilleur.rang === 2 ? "#C9D3DA" : "#D19A6A";
          return h("div", { key: "rl" + iR, style: { flex: "0 0 46%", height: 240, boxSizing: "border-box", overflow: "hidden", padding: "12px 13px 14px", borderRadius: 20, background: "rgba(16,21,24,0.86)", border: "1px solid rgba(" + RGBT + ",0.32)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } },
            h("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" } },
              h("span", { style: { fontSize: 18, lineHeight: 1 } }, coup),
              gr.epingle ? h("span", { style: { fontSize: 11 } }, "\ud83d\udccc") : null,
              /* 19/09 (246) : la date COMPLETE remplace l annee seule, au meme endroit et
                 dans le meme petit corps : discret, et deux epreuves du meme nom ne se
                 confondent plus. Sans date connue, l annee reste. */
              (gr.d || gr.an) ? h("span", { style: { marginLeft: "auto", fontSize: 9, color: TURQL, letterSpacing: ".08em", fontFamily: M } },
                gr.d ? gr.d.slice(8, 10) + "/" + gr.d.slice(5, 7) + "/" + gr.d.slice(0, 4) : gr.an) : null),
            photoCh
              ? h("img", { src: photoCh, alt: "", loading: "lazy", onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (e9) { } }, style: { width: 56, height: 56, borderRadius: "50%", objectFit: "cover", marginTop: 10, border: "1px solid rgba(255,255,255,0.16)" } })
              : null,
            h("div", { style: { fontSize: 11.5, fontFamily: M, fontWeight: 700, color: "#F1F6F8", marginTop: 8, lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } },
              (rangTxt ? (rangTxt + " ") : "") + (qui || ""),
              nomCh ? h("span", { style: { color: TURQL, fontWeight: 600 } }, " sur " + nomCh) : null),
            h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 700, color: "#E4EAEE", marginTop: 10, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } }, gr.concours || "\u2014"),
            /* 21/09 (316) : epreuve et partants sur UNE ligne, coupee proprement - la carte a une hauteur FIXE. */
            (gr.epreuve || gr.partants) ? h("div", { style: { fontSize: 9.5, color: "#A9B2BA", fontFamily: M, marginTop: 3, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" } }, [gr.epreuve || "", gr.partants ? ("/ " + gr.partants) : ""].filter(Boolean).join("  \u00b7  ")) : null,
            null,
            /* 01/09 (Blandine) — LES AUTRES CLASSES DU CLUB SUR LA MEME EPREUVE.
               « Victoire de Rizotto, et troisieme place de Crumble, c'est pas mal. »
               Le regroupement les collectait DEJA (`gr.places`) ; les cartes
               verticales du matin n'affichaient que le meilleur. Ils reviennent,
               en petit, sous la ligne principale.
               ⚠️ LE CHEVAL N'EST NOMME QU'UNE FOIS PAR LIGNE — la faute du matin
               (« t'as ecrit Rizotto deux fois ») ne doit pas revenir par ici.
               ⚠️ Trois de plus au maximum : au-dela, la carte s'allonge et la
               victoire se noie dans la liste. */
            (function () {
              /* 21/09 (316) : la liste des autres classees (jusqu a trois lignes) etirait toute la
                 rangee. Carte a HAUTEUR FIXE : elle devient UNE ligne « + N autres classees ».
                 Les noms restent dans « Voir tout » (page des resultats du club). */
              var nAutres = Math.max(0, (gr.places || []).length - 1);
              if (!nAutres) return null;
              return h("div", { style: { marginTop: 7, paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: 9.5, color: "#98A2AA", fontFamily: M, lineHeight: 1.35, width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                "+ " + nAutres + " " + (nAutres === 1 ? hypeT7("autre class\u00e9e", "other placed", "otra clasificada", "altra classificata", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierung", "\u0645\u0635\u0646\u0641\u0629 \u0623\u062e\u0631\u0649", "位其他获得名次者", "andere geplaatst", "outra classificada", "annan placerad", "другой призёр", "inne miejsce w klasyfikacji", "기타 입상 1건") : hypeT7("autres class\u00e9es", "others placed", "otras clasificadas", "altre classificate", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierungen", "\u0645\u0635\u0646\u0641\u0627\u062a \u0623\u062e\u0631\u064a\u0627\u062a", "位其他获得名次者", "andere geplaatsten", "outras classificadas", "andra placerade", "других призёров", "inne miejsca w klasyfikacji", "기타 입상")));
            })());
        })) : null,
      epErr ? h("div", { style: { margin: "0 0 10px", padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.5)", fontSize: 11.5, color: "#FFD3D9", fontFamily: M, lineHeight: 1.5 } },
        epErr,
        h("div", { role: "button", onClick: function () { setEpErr(null); }, style: { marginTop: 7, display: "inline-block", padding: "6px 13px", borderRadius: 999, border: "1px solid rgba(255,154,168,0.5)", color: "#FF9AA8", fontSize: 11, fontWeight: 700, cursor: "pointer" } },
          T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))) : null,
      /* 30/08 — PALMARES DU CLUB, FIL GROUPE PAR EPREUVE, ARDOISE EN FUME TURQUOISE.
         Maquette validee par Blandine. Une carte par epreuve, tous les classes du club
         alignes dessous. Le verre fume reprend a l'identique le style des boutons
         d'inscription. Les RANGS gardent leurs couleurs de metal : elles portent une
         information que le fond ne porte pas. */
      /* 30/08 (Blandine : « retire les résultats en dessous du rail, on fera la page
         plus tard ») — LA LISTE SOUS LE RAIL EST RETIREE. Il ne reste que le rail aux
         coupes. Le regroupement, l'epinglage et le tri restent calcules : `railClub`
         alimente le rail, `resultatsClub` n'alimente plus rien a l'ecran mais reste
         calcule pour la future page.
         ⚠️ Le rail ne montre QUE les podiums : un club sans podium n'a donc plus rien
         ici. La phrase d'attente est conservee dans ce cas — jamais de section nue. */
      (railClub && railClub.length)
        ? null
        : h("div", { style: { fontSize: 11.5, color: "#6B7580", fontFamily: M, fontStyle: "italic" } }, T("Les r\u00e9sultats des cavaliers du club appara\u00eetront ici.", "Results from the club's riders will appear here.", "Los resultados de los jinetes del club aparecer\u00e1n aqu\u00ed.", "I risultati dei cavalieri del club appariranno qui.", "\u30af\u30e9\u30d6\u306e\u9a0e\u624b\u306e\u7d50\u679c\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Die Ergebnisse der Reiter des Clubs erscheinen hier.", "\u0633\u062a\u0638\u0647\u0631 \u0647\u0646\u0627 \u0646\u062a\u0627\u0626\u062c \u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0646\u0627\u062f\u064a.", "俱乐部骑手的成绩会显示在这里。", "De resultaten van de ruiters van de manege verschijnen hier.", "Os resultados dos cavaleiros do clube vão aparecer aqui.", "Resultaten från klubbens ryttare visas här.", "Результаты всадников клуба появятся здесь.", "Tutaj pojawią się wyniki jeźdźców z klubu.", "클럽 기수들의 결과가 여기에 표시돼요."))),

      /* Repere visuel entre "tous les chevaux de l'ecurie" (au-dessus, vue commune)
         et "mes chevaux" (ci-dessous, gestion perso) : liseré dore + libelle, meme
         codage que le chapitre "En concours" plus bas sur la page. */

    /* 15/09 (174) - LE BLOC « MA GESTION / MES CHEVAUX » EST RETIRE DE LA PAGE DU CLUB.
       Blandine : « au final je pense qu on peut retirer mes chevaux de la page de l ecurie
       non ? ca fait doublon », puis « 1 » (option 1 : tout le bloc, titre + rail + Ajouter +
       Voir mon fil).
       C EST BIEN UN DOUBLON depuis le build 143 : le carre « Chevaux » de la grille ouvre le
       roster de l ecurie, ce rail faisait la meme chose juste en dessous, et le mot « Ma
       gestion » n a plus de sens maintenant que les six carres SONT la gestion.
       ⚠️ VERIFIE AVANT DE RETIRER, parce que c est exactement le piege du 22/08 (un bloc retire
       qui emporte le seul chemin vers une action) : « + Ajouter » appelle
       window.__ouvrirCreationCheval, present a SEPT autres endroits - dont la page des chevaux
       de l ecurie et l onglet Cavalier - donc la creation d un cheval reste atteignable. Et
       « Voir mon fil » n apparaissait qu au-dela de 6 chevaux, alors que l onglet Cavalier mene
       au meme endroit.
       ⚠️ CONSEQUENCE DITE A BLANDINE ET ACCEPTEE : le rail montrait SES chevaux, le carre
       Chevaux montre ceux de l ECURIE. Ses chevaux perso hors ecurie ne sont donc plus visibles
       depuis cette page ; ils restent sur l onglet Cavalier.
       Rien n est supprime ailleurs : mesChevauxClub et son chargement restent en place, non
       nettoyes, et remettre ce bloc serait un copier-coller depuis l historique. */

    h("div", { style: { padding: "16px 16px 0" } }, h(AgendaClubHype, { nomClub: monClub, moiG: moiG })),

    /* 14/09 (145) : l encart « Clinique veterinaire » est RETIRE de la page du club (demande
       de Blandine, croix sur sa capture). Sa photo et ses mots sont reserves au bandeau de la
       future page Sante du club : HYPE_IMGS.encartVeto (ou cliniqueEncart), sur-titre
       « Sante », titre « Clinique veterinaire », sous-titre « Soins & conseils ».
       ⚠ CONSEQUENCE DITE : plus rien n ouvre l ecran « clinique » (EcranCliniqueEquine, une
       simple image d apercu). Le composant EncartCliniqueVeto reste dans le fichier, non
       nettoye. */
    /* 15/09 (174) : l encart SELLERIE a quitte cet endroit - il est desormais EN BAS de la
       page, juste avant les mentions. Blandine : « passe l onglet sellerie en bas de la page ».
       C est un encart partenaire : il n a rien a faire au milieu de ce qui concerne le club. */
        /* 14/09 (145) : l encart « L album de l ecurie » est RETIRE (demande de Blandine). Il
           etait grise « Prochainement » et n ouvrait rien depuis le 26/07, et il promettait
           la meme chose que la page Souvenirs du club, qui existe depuis le build 137. Sa
           photo et ses mots sont repris tels quels dans le bandeau de cette page.
           EncartAlbumEcurie reste dans le fichier, non nettoye. */
    /* 15/09 (162) - LE BLOC « SOUVENIRS DU CLUB » EST RETIRE DE LA PAGE DU CLUB. C etait le
       DERNIER des trois endroits qui promettaient la meme chose : les deux encarts (Clinique
       veterinaire, L album de l ecurie) sont partis au build 145, et la page Souvenirs du club
       - build 137, bande d annees + mosaique + albums publics des chevaux - fait le travail
       depuis, atteignable par le carre « Souvenirs » de la grille.
       ATTENTION, CORRECTION D UNE AFFIRMATION FAUSSE DE MA PART AU BUILD 137 : son chargement
       EXISTE bien (j avais ecrit qu il n y en avait aucun, c etait faux), mais il lit la table
       `mur_evenement` avec la cle « club:<nom du club> », et RIEN n ecrit jamais cette cle :
       les deux seuls appels de publierMurEvenement utilisent l identifiant d un evenement et
       « ecole:<slug> ». Le bloc etait donc vide PAR CONSTRUCTION, quel que soit le nombre de
       photos publiees sur le mur juste en dessous. Aucune donnee perdue en le retirant : les
       photos, elles, sont dans `commentaires` et s affichent dans la page Souvenirs.
       L etat photosClub et son chargement restent en place, non nettoyes. */
    /* 01/09 (Blandine, asset fourni) : les 3 cartes a emojis placeholder du
       28/08 sont remplacees par le PODIUM. Le titre et la pilule « Voir le
       classement » disparaissent aussi : le composant porte les deux. La carte
       pleine largeur du club de la page, juste dessous, est CONSERVEE — elle
       n'etait pas dans la demande. */
    /* 13/09 (72) — LE CLASSEMENT QUITTE LA PAGE DU CLUB (decision de Blandine : « que ce classement
       soit retire tel qu'il est actuellement depuis la page du club », remplace par « juste une
       icone avec l'ordre de classement du club sur sa page, discrete », cliquable, avec les points).
       Le podium et sa suite (PodiumClubsHype, avec « Voir le classement complet ») sont RETIRES
       d'ici : ils vivent sur Communaute, ou la liste se replie desormais. A la place, UNE marque :
       la place du club et ses XP, qui ouvre le classement de Communaute. Elle DESSINERA la marque ;
       en attendant, du texte, dans un seul endroit facile a remplacer. monRang et maG existaient
       deja (calcules pour le cristal), rien de nouveau a lire. */
    /* 13/09 (74) : le cristal XP a quitte cet endroit — il est sur la ligne du nom de l'ecurie,
       a droite, en petit (demande de Blandine : « pas trop grosse, sur la ligne avec le nom de
       l'ecurie a droite »). Rien d'autre ici. */
    /* 01/09 (Blandine, capture annotee : « on peut retirer la premiere place ») :
       la carte pleine largeur du club de la page est SUPPRIMEE. Elle repetait ce
       que le podium montre deja juste au-dessus — Ecurie Feinn, 1re, 6291 XP.
       Le rang, le niveau et le nombre de membres restent lisibles ailleurs sur
       la page (en-tete du club et encart cavaliers). */
    /* 12/09 (40) — UN SEUL FIL POUR L'ECURIE (decision de Blandine : « oui oui un seul fil bien
       sur »). Cette page (le club : classement + PUBLICATIONS) avait SA cible « club:<nom> »,
       differente de celle de la page Ecurie (« ecurie:<nom en minuscules> ») : deux fils portant
       le MEME nom a l'ecran, on publiait dans l'un ou dans l'autre sans le savoir, et « les
       messages des autres » semblaient disparus. Constate en base : club:Ecurie Feinn (1 message)
       et ecurie:ecurie feinn (1 message). Les deux pages lisent desormais la meme cle, exactement
       celle du build 72. Les messages ont ete fusionnes par sql-12-09-un-seul-fil.sql. */
    /* 13/09 (125) - LE DESSIN ARRIVE SUR LA PAGE DU CLUB, CELLE QUE L ONGLET OUVRE VRAIMENT.
       NavBar fait setEcran(item.id === "ecurie" ? "guilde" : item.id) : l onglet Ecurie ouvre
       CET ecran. EcranEcurie, modifie aux builds 120, 122 et 123, est du CODE MORT (ancienne
       ecurie perso, retiree de la navigation, gardee le temps d etre effacee - confirme par
       Blandine). Memes props qu a ces builds, posees ici. */
    /* 22/09 (384) - LA BASCULE ENTRE DEUX ECURIES MELANGEAIT LES FILS. Blandine, captures de 20 h 36 :
       l en-tete affichait bien « Societe d Equitation de Paris (SEP) » mais « Actualites de l ecurie »
       montrait les publications d Ecurie Feinn. CAUSE : MurHype garde sa cible dans un ETAT initialise
       UNE SEULE FOIS (cibleInitiale) et sa lecture ne tourne qu au montage (dependances vides) : changer
       de club changeait la prop, jamais l etat. CORRECTIF SUR CETTE PAGE (sans toucher MurHype, qui sert
       partout) : une « key » liee a la cible -> React remonte le mur quand on change d ecurie, donc il
       relit la bonne cible. ⚠️ Le meme defaut peut exister ailleurs si une page change la cible sans
       remonter le composant (page Actualites a verifier). */
    h(MurHype, {
      teinte: TURQ, /* (536) */
      key: "mur-" + String(monClub || "").trim().toLowerCase(),
      cible: "ecurie:" + String(monClub || "").trim().toLowerCase(), membresSeuls: true,
      /* 15/09 (176) : DEUX messages au lieu de trois, et le champ de publication SOUS eux -
         demande de Blandine. Le « Tout voir » de l entete mene toujours a la page Actualites,
         donc rien n est cache : on montre moins ici, pas moins en tout. */
      vignette: true, photosEnHaut: true, limite: 2, composerEnBas: true, composerDansSuite: true, /* 27/09 (446) */
      entete: { titre: T("Actualit\u00e9s de l\u2019\u00e9curie", "Stable news", "Novedades de la cuadra", "Novit\u00e0 della scuderia", "\u53a9\u820e\u306e\u6d3b\u52d5", "Stall-Neuigkeiten", "\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩动态", "Nieuws uit de stal", "Novidades da cocheira", "Nyheter från stallet", "Новости конюшни", "Aktualności stajni", "마구간 소식"), ic: "\ud83d\udc0e" },
      /* 14/09 (150) : sur le mur du club, une publication peut etre rattachee a un
         rendez-vous de l agenda. Les autres murs ne passent pas cette prop. */
      rattachementAgenda: true,
      /* Cette page peut montrer UNE AUTRE ecurie que la sienne (clubForce) : la page
         Actualites doit recevoir la cible REELLE affichee ici, jamais la recalculer. */
      onVoirTout: function () {
        try {
          window.__filEcurieCible = "ecurie:" + String(monClub || "").trim().toLowerCase();
          window.__filEcurieNom = String(monClub || "").trim();
        } catch (eVT) { }
        setEcran("actualites-ecurie");
      }
    }),
    /* 15/09 (174) : la SELLERIE, descendue ici depuis le milieu de page. */
    h("div", { style: { padding: "46px 16px 0" } }, h(EncartSellerie, null)),
    h("div", { style: { padding: "18px 20px 0", fontSize: 11, color: "#5B646E", fontFamily: M, fontStyle: "italic", textAlign: "center" } }, ((reel && reel.length) ? T("Classement en temps r\u00e9el.", "Live ranking.", "Clasificaci\u00f3n en vivo.", "Classifica live.", "\u30e9\u30a4\u30d6\u30e9\u30f3\u30ad\u30f3\u30b0", "Rangliste in Echtzeit.", "\u062a\u0631\u062a\u064a\u0628 \u0645\u0628\u0627\u0634\u0631.", "实时排名。", "Klassement in realtime.", "Classificação em tempo real.", "Rankning i realtid.", "Рейтинг в реальном времени.", "Klasyfikacja na żywo.", "실시간 순위.") : T("Donn\u00e9es de d\u00e9monstration \u2014 connect\u00e9es \u00e0 Supabase avec les comptes.", "Demo data \u2014 connected to Supabase with accounts.", "", "", "", "Demodaten \u2013 mit den Konten an Supabase angebunden.", "\u0628\u064a\u0627\u0646\u0627\u062a \u062a\u062c\u0631\u064a\u0628\u064a\u0629 \u2014 \u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0640 Supabase \u0645\u0639 \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a.", "演示数据——登录账户后会连接到 Supabase。", "Demogegevens — gekoppeld aan Supabase met accounts.", "Dados de demonstração — conectados ao Supabase com as contas.", "Demodata — kopplas till Supabase med kontona.", "Демонстрационные данные — подключены к Supabase при наличии аккаунтов.", "Dane demonstracyjne — połączone z Supabase przy kontach.", "데모 데이터예요. 계정과 함께 Supabase에 연결돼요."))),
    revendique
      ? h("div", { style: { textAlign: "center", padding: "18px 20px 0", fontSize: 10.5, color: "#5B646E", fontFamily: M, fontStyle: "italic" } }, T("Page officielle g\u00e9r\u00e9e par le club.", "Official page managed by the club.", "P\u00e1gina oficial gestionada por el club.", "Pagina ufficiale gestita dal club.", "\u30af\u30e9\u30d6\u304c\u7ba1\u7406\u3059\u308b\u516c\u5f0f\u30da\u30fc\u30b8", "Offizielle, vom Verein verwaltete Seite.", "\u0635\u0641\u062d\u0629 \u0631\u0633\u0645\u064a\u0629 \u064a\u062f\u064a\u0631\u0647\u0627 \u0627\u0644\u0646\u0627\u062f\u064a.", "由俱乐部管理的官方页面。", "Officiële pagina, beheerd door de manege.", "Página oficial gerenciada pelo clube.", "Officiell sida som hanteras av klubben.", "Официальная страница, которую ведёт клуб.", "Oficjalna strona prowadzona przez klub.", "클럽이 관리하는 공식 페이지예요."))
      : h("a", { href: "mailto:feinn@live.fr?subject=" + encodeURIComponent("Revendication club Hype : " + monClub), style: { display: "block", textAlign: "center", padding: "18px 20px 0", fontSize: 10.5, color: "#5B646E", fontFamily: M, textDecoration: "underline", textUnderlineOffset: 3 } }, T("Vous g\u00e9rez ce club ? Revendiquez sa page officielle", "You run this club? Claim its official page", "\u00bfGestionas este club? Reclama su p\u00e1gina oficial", "Gestisci questo club? Rivendica la sua pagina ufficiale", "\u3053\u306e\u30af\u30e9\u30d6\u306e\u904b\u55b6\u8005\u3067\u3059\u304b\uff1f\u516c\u5f0f\u30da\u30fc\u30b8\u3092\u7533\u8acb", "Sie leiten diesen Verein? Beanspruchen Sie seine offizielle Seite", "\u0647\u0644 \u062a\u062f\u064a\u0631\u064a\u0646 \u0647\u0630\u0627 \u0627\u0644\u0646\u0627\u062f\u064a\u061f \u0637\u0627\u0644\u0628\u064a \u0628\u0635\u0641\u062d\u062a\u0647 \u0627\u0644\u0631\u0633\u0645\u064a\u0629", "你在管理这个俱乐部吗？认领它的官方页面", "Beheer je deze manege? Claim de officiële pagina", "Você administra este clube? Reivindique a página oficial dele", "Driver du den här klubben? Gör anspråk på dess officiella sida", "Ты управляешь этим клубом? Заяви права на его официальную страницу", "Prowadzisz ten klub? Przejmij jego oficjalną stronę", "이 클럽을 운영하시나요? 공식 페이지를 신청하세요")));
}
window.HypeGuilde = { Guilde: EcranGuilde };
})();
