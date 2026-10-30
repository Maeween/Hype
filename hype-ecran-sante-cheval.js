/* HYPE ▸ 30/10/2026 — Écran SANTÉ DU CHEVAL (EcranSanteCheval), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~202 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranSanteCheval() {
  var h = React.createElement;
  var ctx = (typeof useApp === "function") ? useApp() : {};
  var tr = ctx.tr || function (o) { return (o && (o.fr || "")) || ""; };
  var setEcran = ctx.setEcran || function () { };
  var retourEcran = ctx.retourEcran, peutReculer = ctx.peutReculer;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (414) : arabe */
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var TQ = "#C9A66B";

  /* Le cheval vise arrive par window.__santeCheval, sur le modele de window.__agendaClub. */
  var chId = "", chNom = "";
  try { chId = String((window.__santeCheval && window.__santeCheval.id) || ""); } catch (e1) { }
  try { chNom = String((window.__santeCheval && window.__santeCheval.nom) || ""); } catch (e2) { }

  var stS = React.useState(null); var soins = stS[0], setSoins = stS[1];
  var stE = React.useState(""); var err = stE[0], setErr = stE[1];
  /* 14/09 (A1) — l'en-tete LIT LA FICHE EN BASE plutot que de se fier a
     window.__santeCheval, qui ne porte que { id, nom } : la page peut etre ouverte
     d'ailleurs que de la fiche cheval, et il faut la photo, le sexe, l'age, la race.
     Le surnom PERSO et la photo perso viennent de chevaux_histoires, comme sur la
     fiche (priorite : surnom perso > alias FFE > nom officiel). Le nom OFFICIEL
     n'est jamais reecrit : il sert de cle au verrou d'identite de l'import FFE. */
  var stF = React.useState(null); var fiche = stF[0], setFiche = stF[1];
  var stP = React.useState(null); var perso = stP[0], setPerso = stP[1];
  var stM = React.useState(null); var moi = stM[0], setMoi = stM[1];
  var stJ = React.useState(0); var maj = stJ[0], setMaj = stJ[1];
  /* null = fermee ; { soin: null } = nouveau ; { soin: <ligne> } = modification */
  /* (930) Blandine : « remplir quoi que ce soit sur la page : reserve Premium ». Tout le monde VOIT la page et ses boutons ;
     sans abonnement, toucher un bouton qui ouvre un formulaire (ajouter, modifier un soin, un pro) ouvre la fenetre Premium.
     Fermer un formulaire (valeur null) passe toujours. Moderatrices : jamais bloquees. */
  var stVp = React.useState(false); var voilePremium = stVp[0], setVoilePremium = stVp[1];
  var largeS = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : ((typeof useHypeLarge === "function") ? useHypeLarge() : false);   /* (942) version ordinateur (>= 1024 px) ; (1018) aussi tablette (>= 768 px) */
  function premiumSanteOk() { try { return !!ctx.premium || !!(typeof estModerateurHype === "function" && moi && estModerateurHype(moi)); } catch (eP) { return !!ctx.premium; } }
  var stO = React.useState(null); var feuille = stO[0], setFeuilleBrut = stO[1];
  function setFeuille(v) { if (v && !premiumSanteOk()) { setVoilePremium(true); return; } setFeuilleBrut(v); }
  /* 14/09 (Blandine : « la page veto est tjs pas en carres ») — la famille de
     soins ouverte en plein ecran depuis un carre. null = aucune. */
  var stFa = React.useState(null); var famille = stFa[0], setFamille = stFa[1];
  /* L'equipe de soins : les pros rattaches a ce cheval. null = pas encore lu. */
  var stPr = React.useState(null); var pros = stPr[0], setPros = stPr[1];
  var stEp = React.useState(""); var errPro = stEp[0], setErrPro = stEp[1];
  /* null = fermee ; { role: "...", pro: <ligne>|null } */
  var stFp = React.useState(null); var feuillePro = stFp[0], setFeuilleProBrut = stFp[1];
  function setFeuillePro(v) { if (v && !premiumSanteOk()) { setVoilePremium(true); return; } setFeuilleProBrut(v); }   /* (930) */
  /* Les observations Hey Baby epinglees sur ce cheval. null = pas encore lu. */
  var stHb = React.useState(null); var epingles = stHb[0], setEpingles = stHb[1];
  var stHo = React.useState(null); var epingleVue = stHo[0], setEpingleVue = stHo[1];

  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (actif) { setErr(T("Connexion \u00e0 la base indisponible.", "Database unavailable.", "Base de datos no disponible.", "Base dati non disponibile.", "\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306b\u63a5\u7d9a\u3067\u304d\u307e\u305b\u3093\u3002", "Datenbank nicht verf\u00fcgbar.", "\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d.", "无法连接数据库。", "Databaseverbinding niet beschikbaar.", "Conexão com o banco de dados indisponível.", "Anslutningen till databasen är inte tillgänglig.", "Соединение с базой недоступно.", "Połączenie z bazą jest niedostępne.", "데이터베이스에 연결할 수 없어요.")); setSoins([]); } return; }
        if (!chId) { if (actif) setSoins([]); return; }
        var r = await supa.from("soins_cheval").select("*").eq("cheval_id", chId).order("date_intervention", { ascending: false }).limit(200);
        if (!actif) return;
        /* l echec se DIT : pas de liste vide silencieuse */
        if (r && r.error) { setErr(String((r.error && r.error.message) || r.error)); setSoins([]); return; }
        setErr(""); setSoins((r && r.data) || []);
      } catch (e3) { if (actif) { setErr(String(e3)); setSoins([]); } }
    })();
    return function () { actif = false; };
  }, [chId, maj]);

  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !chId) return;
        var rc = await supa.from("chevaux").select("*").eq("id", chId).maybeSingle();
        if (!actif) return;
        if (rc && !rc.error && rc.data) setFiche(rc.data);
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (actif && u) setMoi(u);
        if (!actif || !u || !u.id) return;
        var rp = await supa.from("chevaux_histoires").select("*").eq("cheval_id", chId).eq("user_id", u.id).maybeSingle();
        if (!actif) return;
        if (rp && !rp.error && rp.data) setPerso(rp.data);
      } catch (eF) { /* en-tete seulement : un echec ici allege l'en-tete, il ne cache aucun soin */ }
    })();
    return function () { actif = false; };
  }, [chId]);

  /* L'equipe de soins. DEUX requetes plutot qu'une jointure : les colonnes
     nommees d'une jointure echouent en silence si l'une manque (doctrine
     Supabase de la maison), et on veut pouvoir DIRE l'echec. */
  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !chId) { if (actif) setPros([]); return; }
        var rl = await supa.from("cheval_professionnels").select("*").eq("cheval_id", chId).limit(50);
        if (!actif) return;
        if (rl && rl.error) { setErrPro(String((rl.error && rl.error.message) || rl.error)); setPros([]); return; }
        var ids = ((rl && rl.data) || []).map(function (x) { return x.professionnel_id; }).filter(Boolean);
        if (!ids.length) { setErrPro(""); setPros([]); return; }
        var rp = await supa.from("professionnels").select("*").in("id", ids);
        if (!actif) return;
        if (rp && rp.error) { setErrPro(String((rp.error && rp.error.message) || rp.error)); setPros([]); return; }
        setErrPro(""); setPros((rp && rp.data) || []);
      } catch (eEq) { if (actif) { setErrPro(String(eEq)); setPros([]); } }
    })();
    return function () { actif = false; };
  }, [chId, maj]);

  /* Les epingles Hey Baby de ce cheval. La table existe depuis longtemps : on la
     REUTILISE, aucune deuxieme table. `cheval_id` y est du TEXT et non un uuid —
     on compare donc en texte. \u26a0 Les epingles posees avant le 14/09 portent un
     surnom de demo (heybaby, rizotto, idao) et non un identifiant : elles ne
     remonteront ici qu'apres le rapatriement en base. */
  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !chId) { if (actif) setEpingles([]); return; }
        var r = await supa.from("echanges_heybaby_epingles").select("*").eq("cheval_id", String(chId)).order("created_at", { ascending: false }).limit(20);
        if (!actif) return;
        setEpingles((r && !r.error && r.data) ? r.data : []);
      } catch (eHb) { if (actif) setEpingles([]); }
    })();
    return function () { actif = false; };
  }, [chId, maj]);
  /* (940) CONSIGNES DU CHEVAL (refonte Sante, etape 5 ; table cheval_consignes passee par Blandine le 11/10) :
     enrenement, materiel particulier, soins specifiques. Une ligne par cheval. null = pas encore lu ; {} = rien. */
  var stCg = React.useState(null); var consignes = stCg[0], setConsignes = stCg[1];
  var stCo = React.useState(false); var consOuvert = stCo[0], setConsOuvert = stCo[1];
  var stCf = React.useState("tous"); var carnetFiltre = stCf[0], setCarnetFiltre = stCf[1];   /* (941) */
  var stCe = React.useState(null); var consEdit = stCe[0], setConsEdit = stCe[1];   /* { enrenement, materiel, soins, busy, err } */
  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !chId) { if (actif) setConsignes({}); return; }
        var r = await supa.from("cheval_consignes").select("*").eq("cheval_id", chId).maybeSingle();
        if (!actif) return;
        setConsignes((r && !r.error && r.data) ? r.data : {});
      } catch (eCg) { if (actif) setConsignes({}); }
    })();
    return function () { actif = false; };
  }, [chId, maj]);
  /* (944) DOCUMENTS DU CARNET (table cheval_documents + stockage prive « sante », SQL passe par Blandine le 11/10).
     null = pas lu ; [] = rien ou table absente (jamais d erreur affichee pour une simple lecture vide). */
  var stDo = React.useState(null); var docs = stDo[0], setDocs = stDo[1];
  var stDa = React.useState(null); var docAjout = stDa[0], setDocAjout = stDa[1];   /* fenetre d ajout */
  var stDv = React.useState(null); var docVu = stDv[0], setDocVu = stDv[1];   /* fenetre d un document */
  React.useEffect(function () {
    var actif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !chId) { if (actif) setDocs([]); return; }
        var r = await supa.from("cheval_documents").select("*").eq("cheval_id", chId).order("date_doc", { ascending: false }).limit(200);
        if (!actif) return;
        setDocs((r && !r.error && r.data) ? r.data : []);
      } catch (eDo) { if (actif) setDocs([]); }
    })();
    return function () { actif = false; };
  }, [chId, maj]);

  /* Regle maison : tout ecran qui defile s'ouvre en haut. */
  React.useEffect(function () { try { if (typeof hypeDefilerHaut === "function") hypeDefilerHaut(); } catch (eD) { } }, []);

  function retour() { if (peutReculer && retourEcran) { retourEcran(); } else { setEcran("moncavalier"); } }

  /* ---------- IDENTITE AFFICHEE : ce qui manque ne s'affiche pas, rien n'est invente ---------- */
  var og = (fiche && fiche.origines) || {};
  var nomOffi = String((fiche && fiche.nom) || chNom || "");
  var surnom = String((perso && perso.surnom) || (fiche && fiche.alias) || "").trim();
  var nomVu = surnom || nomOffi;
  var montrerOffi = !!(surnom && surnom.toLowerCase() !== nomOffi.toLowerCase());
  var photoVue = String((perso && perso.photo_url) || (fiche && fiche.photo_url) || "");
  /* 14/09 (A1b) — « BOREALIS DE FEI... » : le nom etait force sur UNE ligne et se
     coupait. La fiche cheval sait deja separer le nom de son AFFIXE (« de Feinn »,
     « d'Amour », « du Rozel », « des Bruyeres ») : on reprend sa coupe, nom en
     grand et affixe en petit dessous. Aucune troncature. */
  /* AFFICHAGE SEULEMENT. L'autorite reste la base (hype_peut_ecrire_sante) :
     proprietaire du cheval OU moderatrice. Une cavaliere rattachee lit et ne voit
     donc aucun geste d'ecriture ; si la base refusait malgre tout, la feuille le
     dirait au lieu d'echouer en silence. */
  var peutEcrire = !!(moi && ((fiche && fiche.user_id && fiche.user_id === moi.id)
    || ((typeof estModerateurHype === "function") && estModerateurHype(moi))));

  var mAff = nomVu.match(/^(.*?)\s+(de\s.+|d\u2019.+|d'.+|du\s.+|des\s.+)$/i);
  var nomCourt = mAff ? mAff[1] : nomVu;
  var affixe = mAff ? mAff[2] : "";

  var MOIS = [T("janv.", "Jan", "ene.", "genn.", "1\u6708", "Jan.", "\u064a\u0646\u0627\u064a\u0631", "1月", "jan.", "jan.", "jan.", "янв.", "sty", "1월"), T("f\u00e9vr.", "Feb", "feb.", "febbr.", "2\u6708", "Feb.", "\u0641\u0628\u0631\u0627\u064a\u0631", "2月", "feb.", "fev.", "feb.", "февр.", "lut", "2월"), T("mars", "Mar", "mar.", "mar.", "3\u6708", "M\u00e4rz", "\u0645\u0627\u0631\u0633", "3月", "mrt", "mar", "mars", "мар", "mar", "3월"), T("avril", "Apr", "abr.", "apr.", "4\u6708", "Apr.", "\u0623\u0628\u0631\u064a\u0644", "四月", "april", "abril", "april", "апрель", "kwiecień", "4월"), T("mai", "May", "may.", "magg.", "5\u6708", "Mai", "\u0645\u0627\u064a\u0648", "5月", "mei", "mai", "maj", "мая", "maj", "5월"), T("juin", "Jun", "jun.", "giu.", "6\u6708", "Juni", "\u064a\u0648\u0646\u064a\u0648", "6月", "jun", "jun", "juni", "июн", "cze", "6월"), T("juil.", "Jul", "jul.", "lug.", "7\u6708", "Juli", "\u064a\u0648\u0644\u064a\u0648", "7月", "jul.", "jul.", "juli", "июл.", "lip", "7월"), T("ao\u00fbt", "Aug", "ago.", "ag.", "8\u6708", "Aug.", "\u0623\u063a\u0633\u0637\u0633", "8月", "aug", "ago", "aug", "авг", "sie", "8월"), T("sept.", "Sep", "sept.", "sett.", "9\u6708", "Sept.", "\u0633\u0628\u062a\u0645\u0628\u0631", "9月", "sep.", "set.", "sep.", "сент.", "wrz", "9월"), T("oct.", "Oct", "oct.", "ott.", "10\u6708", "Okt.", "\u0623\u0643\u062a\u0648\u0628\u0631", "10月", "okt.", "out.", "okt.", "окт.", "paź", "10월"), T("nov.", "Nov", "nov.", "nov.", "11\u6708", "Nov.", "\u0646\u0648\u0641\u0645\u0628\u0631", "11月", "nov.", "nov.", "nov.", "нояб.", "lis", "11월"), T("d\u00e9c.", "Dec", "dic.", "dic.", "12\u6708", "Dez.", "\u062f\u064a\u0633\u0645\u0628\u0631", "12月", "dec.", "dez.", "dec.", "дек.", "gru", "12월")];
  function jourDe(s) {
    if (!s) return null;
    var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  function enClair(s) {
    var d = jourDe(s); if (!d) return "";
    return d.getDate() + " " + MOIS[d.getMonth()] + " " + d.getFullYear();
  }
  /* precision_prochaine = « mois » : la date n'a pas de jour sur ce soin, on
     n'en invente pas un. L'ancien affichage ecrivait le mot « jour » tel quel a
     cote de chaque date. */
  function enClairP(iso, precision) {
    var d = jourDe(iso); if (!d) return "";
    if (String(precision || "") === "mois") return MOIS[d.getMonth()] + " " + d.getFullYear();
    return enClair(iso);
  }
  function joursAvant(s) {
    var d = jourDe(s); if (!d) return null;
    var auj = new Date(); auj.setHours(0, 0, 0, 0);
    return Math.round((d.getTime() - auj.getTime()) / 86400000);
  }
  function sexeEnClair(v) {
    var k = String(v || "").toLowerCase().trim();
    if (!k) return "";
    if (k === "f" || k.indexOf("jument") === 0 || k.indexOf("femelle") === 0 || k.indexOf("pouliche") === 0)
      return T("Jument", "Mare", "Yegua", "Cavalla", "\u7287\u99ac", "Stute", "\u0641\u0631\u0633", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말");
    if (k === "h" || k.indexOf("hongre") === 0)
      return T("Hongre", "Gelding", "Castrado", "Castrone", "\u305b\u3093\u99ac", "Wallach", "\u062d\u0635\u0627\u0646 \u0645\u062e\u0635\u064a", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마");
    if (k === "m" || k.indexOf("entier") === 0 || k.indexOf("etalon") === 0 || k.indexOf("\u00e9talon") === 0 || k.indexOf("male") === 0 || k.indexOf("m\u00e2le") === 0)
      return T("Entier", "Stallion", "Entero", "Stallone", "\u7287\u99ac", "Hengst", "\u0641\u062d\u0644", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마");
    return String(v); /* valeur inconnue : affichee telle quelle, jamais devinee */
  }
  function ageEnClair(v) {
    var a = String(v == null ? "" : v).trim(); if (!a) return "";
    var n = a.match(/^(\d{1,2})$/);
    if (!n) return a;
    return n[1] + " " + (n[1] === "1"
      ? T("an", "yr", "a\u00f1o", "anno", "\u6b73", "Jahr", "\u0633\u0646\u0629", "年", "jr", "ano", "år", "г.", "r.", "년")
      : T("ans", "yrs", "a\u00f1os", "anni", "\u6b73", "Jahre", "\u0633\u0646\u0648\u0627\u062a", "岁", "jaar", "anos", "år", "лет", "lat", "세"));
  }
  var identite = [sexeEnClair(og.sexe), ageEnClair(fiche && fiche.age), String((fiche && fiche.race) || "").trim()]
    .filter(function (x) { return !!x; }).join("  \u00b7  ");

  /* Les libelles connus ; un type inattendu s affiche tel quel plutot que d etre masque. */
  /* 14/09 (A3) — les cles etaient marechal / osteo / veto, qui n'existent PAS dans
     la contrainte de soins_cheval : « veterinaire », « ferrure » et « osteopathe »
     retombaient sur le repli et restaient en francais dans les 5 autres langues.
     Source unique desormais partagee avec la feuille de saisie. */
  var LIB = hypeSoinsLibelles(T);
  function libelle(s) {
    var k = String(s || "").toLowerCase().trim();
    if (LIB[k]) return LIB[k];
    if (!k) return T("Soin", "Care", "Cuidado", "Cura", "\u30b1\u30a2", "Pflege", "\u0639\u0646\u0627\u064a\u0629", "护理", "Verzorging", "Cuidado", "Vård", "Уход", "Opieka", "케어");
    return k.charAt(0).toUpperCase() + k.slice(1);
  }

  function ligne(s, cle) {
    var j = s.date_prochaine ? joursAvant(s.date_prochaine) : null;
    /* Ambre a 15 jours, rouge des que c est depasse (decision de Blandine). */
    var etat = (j === null) ? null : (j < 0 ? "rouge" : (j <= 15 ? "ambre" : "vert"));
    var COUL = { rouge: "#FF6B81", ambre: "#E8C887", vert: TQ };
    var coul = etat ? COUL[etat] : "rgba(255,255,255,0.14)";
    var mot = null;
    if (etat === "rouge") mot = (j === -1)
      ? T("en retard d\u2019un jour", "1 day overdue", "1 d\u00eda de retraso", "1 giorno di ritardo", "1\u65e5\u904e\u304e", "1 Tag \u00fcberf\u00e4llig", "\u0645\u062a\u0623\u062e\u0631 \u0628\u064a\u0648\u0645", "逾期 1 天", "1 dag te laat", "1 dia de atraso", "en dag försenad", "просрочено на день", "opóźnienie o 1 dzień", "하루 늦었어요")
      : T("en retard de " + Math.abs(j) + " jours", Math.abs(j) + " days overdue", Math.abs(j) + " d\u00edas de retraso", Math.abs(j) + " giorni di ritardo", Math.abs(j) + "\u65e5\u904e\u304e", "seit " + Math.abs(j) + " Tagen f\u00e4llig", "\u0645\u062a\u0623\u062e\u0631 \u0628\u0640 " + Math.abs(j) + " \u0623\u064a\u0627\u0645", "逾期 " + Math.abs(j) + " 天", Math.abs(j) + " dagen te laat", "com " + Math.abs(j) + " dias de atraso", ("försenad med " + Math.abs(j) + " dagar"), ("просрочено на " + Math.abs(j) + " " + (Math.abs(j) % 10 === 1 && Math.abs(j) % 100 !== 11 ? "день" : (Math.abs(j) % 10 >= 2 && Math.abs(j) % 10 <= 4 && (Math.abs(j) % 100 < 10 || Math.abs(j) % 100 >= 20)) ? "дня" : "дней")), ("opóźnienie o " + Math.abs(j) + " " + (Math.abs(j) === 1 ? "dzień" : "dni")), ("기한이 " + Math.abs(j) + "일 지났어요"));
    else if (etat === "ambre") mot = (j === 0)
      ? T("aujourd\u2019hui", "today", "hoy", "oggi", "\u4eca\u65e5", "heute", "\u0627\u0644\u064a\u0648\u0645", "今天", "vandaag", "hoje", "idag", "сегодня", "dzisiaj", "오늘")
      : (j === 1 ? T("demain", "tomorrow", "ma\u00f1ana", "domani", "\u660e\u65e5", "morgen", "\u063a\u062f\u0627", "明天", "morgen", "amanhã", "imorgon", "завтра", "jutro", "내일")
        : T("dans " + j + " jours", "in " + j + " days", "en " + j + " d\u00edas", "tra " + j + " giorni", j + "\u65e5\u5f8c", "in " + j + " Tagen", "\u0628\u0639\u062f " + j + " \u0623\u064a\u0627\u0645", "还有 " + j + " 天", "over " + j + " dagen", "em " + j + " dias", ("om " + j + " dagar"), ("через " + j + " " + (j % 10 === 1 && j % 100 !== 11 ? "день" : (j % 10 >= 2 && j % 10 <= 4 && (j % 100 < 10 || j % 100 >= 20)) ? "дня" : "дней")), ("za " + j + " " + (j === 1 ? "dzień" : "dni")), (j + "일 후")));
    return h("div", { key: cle, onClick: peutEcrire ? function () { setFeuille({ soin: s }); } : null, role: peutEcrire ? "button" : null, style: { display: "flex", gap: 12, padding: "13px 14px", borderRadius: 14, border: "1px solid " + (etat && etat !== "vert" ? coul : "rgba(255,255,255,0.07)"), background: "#0B1014", boxShadow: "0 8px 24px rgba(0,0,0,0.40)", marginBottom: 10, cursor: peutEcrire ? "pointer" : "default" } },
      h("div", { style: { flex: "0 0 4px", width: 4, borderRadius: 4, background: coul } }),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { display: "flex", alignItems: "baseline", gap: 8 } },
          h("div", { style: { fontFamily: M, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TQ, fontWeight: 700 } }, libelle(s.type)),
          h("div", { style: { marginLeft: "auto", fontFamily: M, fontSize: 10.5, color: "#6D7681", whiteSpace: "nowrap" } }, enClair(s.date_intervention)),
          peutEcrire ? h("span", { style: { fontFamily: M, fontSize: 11, color: "rgba(201,166,107,0.55)", flexShrink: 0 } }, "\u270e") : null),
        (s.titre || zoneEnClair(s)) ? h("div", { style: { fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#EDF2F5", marginTop: 4, lineHeight: 1.35 } },
          [zoneEnClair(s), s.titre || ""].filter(function (x) { return !!x; }).join(" \u00b7 ")) : null,
        s.notes ? h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(220,227,232,0.62)", marginTop: 3, lineHeight: 1.5, whiteSpace: "pre-wrap" } }, s.notes) : null,
        s.date_prochaine ? h("div", { style: { marginTop: 8, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" } },
          h("span", { style: { fontFamily: M, fontSize: 11.5, fontWeight: 700, color: coul } },
            T("Prochain", "Next", "Pr\u00f3ximo", "Prossimo", "\u6b21\u56de", "N\u00e4chste", "\u0627\u0644\u0642\u0627\u062f\u0645", "下一次", "Volgende", "Próximo", "Nästa", "Следующий", "Następny", "다음") + " \u00b7 " + enClairP(s.date_prochaine, s.precision_prochaine)),
          mot ? h("span", { style: { fontFamily: M, fontSize: 10.5, fontWeight: 700, color: coul, padding: "3px 9px", borderRadius: 999, border: "1px solid " + coul, background: (etat === "rouge" ? "rgba(255,107,129,0.10)" : "rgba(232,200,135,0.10)") } }, mot) : null) : null,
        /* La base est la source de verite : si la ligne a bouge depuis l'export,
           on le dit d'une ligne grise, sans bandeau d'alerte. */
        (s.ics_exporte_le && s.updated_at && String(s.updated_at) > String(s.ics_exporte_le))
          ? h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C", marginTop: 6, lineHeight: 1.5 } },
              T("\u00c9ch\u00e9ance modifi\u00e9e depuis ton export \u00b7 \u00e0 r\u00e9exporter", "Due date changed since your export \u00b7 re-export", "Fecha cambiada desde tu exportaci\u00f3n \u00b7 reexportar", "Scadenza modificata dopo l'export \u00b7 da riesportare", "\u66f8\u304d\u51fa\u3057\u5f8c\u306b\u5909\u66f4\u3055\u308c\u307e\u3057\u305f\u30fb\u518d\u51fa\u529b", "Seit dem Export ge\u00e4ndert \u00b7 erneut exportieren", "\u062a\u063a\u064a\u0631 \u0627\u0644\u0645\u0648\u0639\u062f \u0645\u0646\u0630 \u0627\u0644\u062a\u0635\u062f\u064a\u0631 \u00b7 \u064a\u062c\u0628 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0635\u062f\u064a\u0631", "到期日自你导出后已修改 · 请重新导出", "Vervaldatum gewijzigd sinds je export · opnieuw exporteren", "Data alterada desde a sua exportação · exporte de novo", "Förfallodatumet har ändrats sedan din export · exportera på nytt", "Срок изменён после твоего экспорта · экспортируй заново", "Termin zmieniony od twojego eksportu · wyeksportuj ponownie", "내보낸 뒤 기한이 바뀌었어요 · 다시 내보내 주세요")) : null));
  }

  /* Zone des pieds telle qu'elle a ete enregistree ; une valeur inconnue n'est
     pas devinee, elle ne s'affiche pas. */
  function zoneEnClair(soin) {
    var z = "";
    try { z = String((soin && soin.details && soin.details.zone) || ""); } catch (eZ) { z = ""; }
    if (z === "avant") return T("Avant seulement", "Front only", "Solo delante", "Solo anteriori", "\u524d\u306e\u307f", "Nur vorne", "\u0627\u0644\u0623\u0645\u0627\u0645\u064a\u0629 \u0641\u0642\u0637", "仅前蹄", "Alleen voor", "Só os dianteiros", "Bara fram", "Только передние", "Tylko przód", "앞발만");
    if (z === "arriere") return T("Arri\u00e8re seulement", "Hind only", "Solo detr\u00e1s", "Solo posteriori", "\u5f8c\u306e\u307f", "Nur hinten", "\u0627\u0644\u062e\u0644\u0641\u064a\u0629 \u0641\u0642\u0637", "仅后蹄", "Alleen achter", "Só os traseiros", "Bara bak", "Только задние", "Tylko tył", "뒷발만");
    if (z === "quatre") return T("Les quatre", "All four", "Los cuatro", "Tutti e quattro", "\u56db\u672c", "Alle vier", "\u0627\u0644\u0623\u0631\u0628\u0639\u0629", "四只都有", "Alle vier", "Os quatro", "Alla fyra", "Все четыре", "Wszystkie cztery", "네 발 모두");
    return "";
  }

  function delaiCourt(j) {
    if (j === null) return T("\u00c0 pr\u00e9voir", "To plan", "Por prever", "Da pianificare", "\u4e88\u5b9a", "Zu planen", "\u0644\u0644\u062a\u062e\u0637\u064a\u0637", "待安排", "Te plannen", "A programar", "Att planera", "Запланировать", "Do zaplanowania", "예정");
    if (j < 0) return T("En retard", "Overdue", "Atrasado", "In ritardo", "\u671f\u9650\u5207\u308c", "\u00dcberf\u00e4llig", "\u0645\u062a\u0623\u062e\u0631", "已逾期", "Te laat", "Atrasado", "Försenad", "Просрочено", "Spóźnione", "지남");
    if (j === 0) return T("Aujourd\u2019hui", "Today", "Hoy", "Oggi", "\u4eca\u65e5", "Heute", "\u0627\u0644\u064a\u0648\u0645", "今天", "Vandaag", "Hoje", "Idag", "Сегодня", "Dziś", "오늘");
    if (j === 1) return T("Demain", "Tomorrow", "Ma\u00f1ana", "Domani", "\u660e\u65e5", "Morgen", "\u063a\u062f\u0627", "明天", "Morgen", "Amanhã", "Imorgon", "Завтра", "Jutro", "내일");
    return T("Dans " + j + " j", "In " + j + " d", "En " + j + " d", "Tra " + j + " g", j + "\u65e5\u5f8c", "In " + j + " T", "\u0628\u0639\u062f " + j + " \u064a", "还有 " + j + " 天", "Over " + j + " d", "Em " + j + " d", ("Om " + j + " d"), ("Через " + j + " дн."), ("Za " + j + " d"), ("" + j + "일 후"));
  }
  /* Le gros carre de date, repris de sa maquette (« 18 / JUIN »). Quand la
     precision est le MOIS, le carre porte le mois et l'annee : on n'invente pas
     un jour qui n'a pas ete saisi. */
  function carreDate(iso, precision, coul) {
    var d = jourDe(iso);
    var haut = d ? String(d.getDate()) : "\u2014";
    var bas = d ? MOIS[d.getMonth()] : "";
    if (String(precision || "") === "mois" && d) { haut = MOIS[d.getMonth()]; bas = String(d.getFullYear()); }
    return h("div", { style: { flex: "0 0 auto", width: 56, minHeight: 58, borderRadius: 14, border: "1px solid " + coul + "55", background: coul + "14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6px 2px" } },
      h("div", { style: { fontFamily: C, fontSize: (String(haut).length > 3 ? 14 : 20), fontWeight: 700, color: "#EDF2F5", lineHeight: 1.05, textAlign: "center" } }, haut),
      h("div", { style: { fontFamily: M, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: coul, marginTop: 3, textAlign: "center" } }, bas));
  }
  function chipEtat(j, coul) {
    return h("span", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 10.5, fontWeight: 700, color: coul, padding: "5px 11px", borderRadius: 999, border: "1px solid " + coul + "66", background: coul + "14", whiteSpace: "nowrap" } }, delaiCourt(j));
  }
  /* « A surveiller » : une CARTE opaque avec une ligne par echeance, sur le
     modele du bloc « Prochains rendez-vous » de sa maquette. Les anciennes tuiles
     horizontales sont retirees : a 390 px, une rangee qui defile cache la moitie
     de ce qu'elle contient. Ce bloc REMPLACE toujours l'ancienne liste
     « Echeances » ; le detail de chaque soin reste dans le Carnet dessous. */
  function tuiles() {
    if (!soins || !soins.length) return null;
    var av = soins.filter(function (s) { return !!s.date_prochaine; })
      .sort(function (a, b) { return String(a.date_prochaine).localeCompare(String(b.date_prochaine)); })
      .slice(0, 5);
    if (!av.length) return null;
    return h("div", { style: { padding: "0 16px 24px" } },
      carte([
        titreModule("\ud83d\udd14", T("\u00c0 surveiller", "To watch", "A vigilar", "Da seguire", "\u8981\u6ce8\u610f", "Im Blick", "\u0644\u0644\u0645\u0631\u0627\u0642\u0628\u0629", "需留意", "In de gaten houden", "Em observação", "Att hålla koll på", "Следить", "Do obserwowania", "주의"), null),
        h("div", { key: "lst" }, av.map(function (s, i) {
          var j = joursAvant(s.date_prochaine);
          var etat = (j === null) ? null : (j < 0 ? "rouge" : (j <= 15 ? "ambre" : "vert"));
          var coul = (etat === "rouge") ? "#FF6B81" : ((etat === "ambre") ? "#E8C887" : TQ);
          return h("div", { key: "t" + (s.id || i), onClick: peutEcrire ? function () { setFeuille({ soin: s }); } : null, role: peutEcrire ? "button" : null,
            style: { display: "flex", alignItems: "center", gap: 12, padding: i ? "12px 0 0" : "2px 0 0", marginTop: i ? 12 : 0, borderTop: i ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: peutEcrire ? "pointer" : "default" } },
            carreDate(s.date_prochaine, s.precision_prochaine, coul),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: coul } }, libelle(s.type)),
              h("div", { style: { fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#EDF2F5", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.titre || enClairP(s.date_prochaine, s.precision_prochaine)),
              s.titre ? h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#7C858D", marginTop: 2 } }, enClairP(s.date_prochaine, s.precision_prochaine)) : null),
            chipEtat(j, coul));
        }))
      ], "masurveiller"));
  }

  /* ---------- BRIQUES COMMUNES AUX MODULES ---------- */
  function titreModule(icone, txt, typePlus) {
    return h("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 11 } },
      h("span", { style: { fontSize: 13 } }, icone),
      h("div", { style: { fontFamily: C, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D9C7A3" } }, txt),
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(217,199,163,0.28), transparent)" } }),
      (peutEcrire && typePlus) ? h("span", { role: "button", onClick: function () { setFeuille({ soin: null, type: typePlus }); }, "aria-label": T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"), style: { flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.34)", background: "rgba(201,166,107,0.08)", color: "#D2B07A", fontSize: 15, lineHeight: "26px", textAlign: "center", cursor: "pointer" } }, "+") : null);
  }
  var FOND_CARTE = "#0B1014";
  function carte(contenu, cle) {
    return h("div", { key: cle, style: { padding: "15px 15px 16px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: FOND_CARTE, boxShadow: "0 10px 30px rgba(0,0,0,0.45)", marginBottom: 14 } }, contenu);
  }
  function pastilleEtat(iso) {
    if (!iso) return null;
    var j = joursAvant(iso);
    var etat = (j === null) ? null : (j < 0 ? "rouge" : (j <= 15 ? "ambre" : "vert"));
    var coul = (etat === "rouge") ? "#FF6B81" : ((etat === "ambre") ? "#E8C887" : TQ);
    return h("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, flexShrink: 0, fontFamily: M, fontSize: 10.5, fontWeight: 700, color: coul, whiteSpace: "nowrap" } },
      h("span", { style: { width: 7, height: 7, borderRadius: "50%", background: coul, flexShrink: 0 } }),
      (etat === "vert")
        ? T("\u00c0 jour", "Up to date", "Al d\u00eda", "In regola", "\u6700\u65b0", "Aktuell", "\u0645\u062d\u062f\u062b", "已是最新", "Up-to-date", "Em dia", "Uppdaterad", "Всё в порядке", "Na bieżąco", "최신 상태")
        : delaiCourt(j));
  }
  function vide(txt) {
    return h("div", { style: { fontFamily: M, fontSize: 12, color: "#6D7681", lineHeight: 1.55, paddingBottom: 2 } }, txt);
  }
  /* Le dernier soin FAIT d'un type : on ignore les lignes sans date d'intervention,
     qui sont des echeances a prevoir et non des interventions passees. */
  function dernierFait(types) {
    var l = (soins || []).filter(function (x) { return types.indexOf(String(x.type)) >= 0 && x.date_intervention; })
      .sort(function (a, b) { return String(b.date_intervention).localeCompare(String(a.date_intervention)); });
    return l.length ? l[0] : null;
  }
  function prochaineDe(types) {
    var l = (soins || []).filter(function (x) { return types.indexOf(String(x.type)) >= 0 && x.date_prochaine; })
      .sort(function (a, b) { return String(a.date_prochaine).localeCompare(String(b.date_prochaine)); });
    return l.length ? l[0] : null;
  }

  /* ---------- MODULE FERRURE / PIEDS ----------
     Alimente par soins_cheval (types ferrure + parage) : AUCUNE table dediee, comme
     demande. « Avant + arriere » et « ferre / pare » vivent pour l'instant dans
     l'intitule de la ligne ; des champs dedies (details jsonb) restent a decider. */
  function moduleFerrure() {
    var TY = ["ferrure", "parage"];
    var d = dernierFait(TY), p = prochaineDe(TY);
    var nb = (soins || []).filter(function (x) { return TY.indexOf(String(x.type)) >= 0; }).length;
    return carte([
      titreModule("\ud83d\udc0e", T("Ferrure / pieds", "Shoeing / feet", "Herrado / pies", "Ferratura / piedi", "\u8e44\u9244\u30fb\u8e44", "Beschlag / Hufe", "\u0627\u0644\u062a\u0646\u0639\u064a\u0644 / \u0627\u0644\u062d\u0648\u0627\u0641\u0631", "钉蹄铁 / 马蹄", "Beslag / hoeven", "Ferrageamento / cascos", "Skoning / hovar", "Ковка / копыта", "Kucie / kopyta", "장제 / 발"), "ferrure"),
      d ? h("div", { key: "f1" },
            h("div", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C858D" } },
              T("Derni\u00e8re intervention", "Last visit", "\u00daltima intervenci\u00f3n", "Ultimo intervento", "\u524d\u56de", "Letzter Termin", "\u0622\u062e\u0631 \u062a\u062f\u062e\u0644", "最近一次处理", "Laatste behandeling", "Última intervenção", "Senaste besöket", "Последний визит", "Ostatnia wizyta", "마지막 처치")),
            h("div", { style: { fontFamily: C, fontSize: 18, fontWeight: 700, color: "#EDF2F5", marginTop: 3 } }, enClair(d.date_intervention)),
            h("div", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(220,227,232,0.72)", marginTop: 2 } },
              [(LIB[String(d.type)] || d.type), zoneEnClair(d), d.titre || ""].filter(function (x) { return !!x; }).join(" \u00b7 ")),
            d.notes ? h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(220,227,232,0.55)", marginTop: 5, lineHeight: 1.5, whiteSpace: "pre-wrap" } }, d.notes) : null)
        : h("div", { key: "f1" }, vide(T("Aucune ferrure ni parage enregistr\u00e9.", "No shoeing or trimming recorded.", "Sin herrado ni recorte registrado.", "Nessuna ferratura n\u00e9 pareggio registrato.", "\u8a18\u9332\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Kein Beschlag erfasst.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u062a\u0646\u0639\u064a\u0644 \u0648\u0644\u0627 \u062a\u0642\u0644\u064a\u0645 \u0645\u0633\u062c\u0644.", "没有钉蹄铁或修蹄记录。", "Geen beslag of hoefbekapping geregistreerd.", "Nenhum ferrageamento ou casqueamento registrado.", "Ingen skoning eller verkning registrerad.", "Нет записей о ковке или обработке копыт.", "Brak zapisanego kucia ani korekty kopyt.", "기록된 장제나 발굽 손질이 없어요."))),
      p ? h("div", { key: "f2", style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12, paddingTop: 11, borderTop: "1px solid rgba(255,255,255,0.07)" } },
            h("div", { style: { minWidth: 0, flex: 1 } },
              h("div", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C858D" } },
                T("Prochaine \u00e9ch\u00e9ance", "Next due", "Pr\u00f3xima", "Prossima", "\u6b21\u56de", "N\u00e4chste", "\u0627\u0644\u0645\u0648\u0639\u062f \u0627\u0644\u0642\u0627\u062f\u0645", "下一次到期日", "Volgende vervaldatum", "Próximo vencimento", "Nästa förfallodag", "Следующий срок", "Następny termin", "다음 예정일")),
              h("div", { style: { fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#EDF2F5", marginTop: 2 } }, enClairP(p.date_prochaine, p.precision_prochaine))),
            pastilleEtat(p.date_prochaine)) : null,
      nb > 1 ? h("div", { key: "f3", style: { fontFamily: M, fontSize: 10.5, color: "#5B646E", marginTop: 10 } },
        nb + " " + T("interventions au carnet ci-dessous", "entries in the record below", "intervenciones en el historial", "interventi nel libretto qui sotto", "\u4ef6\u306e\u8a18\u9332\uff08\u4e0b\u8a18\uff09", "Eintr\u00e4ge im Verlauf unten", "\u062a\u062f\u062e\u0644\u0627\u062a \u0641\u064a \u0627\u0644\u062f\u0641\u062a\u0631 \u0623\u062f\u0646\u0627\u0647", "次处理，详见下方记录", "behandelingen in het logboek hieronder", "intervenções no caderno abaixo", "besök i journalen nedan", "визитов в журнале ниже", "wizyt w książeczce poniżej", "아래 노트의 처치 기록")) : null
    ], "mferrure");
  }

  /* ---------- MODULE VACCINS & VERMIFUGES ----------
     Hype affiche ce qui a ete enregistre. Aucun protocole, aucun rappel impose. */
  function moduleVaccins() {
    function bloc(ty, titreTxt) {
      var l = (soins || []).filter(function (x) { return String(x.type) === ty; })
        .sort(function (a, b) { return String(b.date_intervention || b.date_prochaine || "").localeCompare(String(a.date_intervention || a.date_prochaine || "")); })
        .slice(0, 5);
      return h("div", { key: "b" + ty, style: { marginTop: ty === "vermifuge" ? 13 : 0, paddingTop: ty === "vermifuge" ? 12 : 0, borderTop: ty === "vermifuge" ? "1px solid rgba(255,255,255,0.07)" : "none" } },
        h("div", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C858D", marginBottom: 8 } }, titreTxt),
        l.length ? h("div", null, l.map(function (x, i) {
          return h("div", { key: "v" + (x.id || i), onClick: peutEcrire ? function () { setFeuille({ soin: x }); } : null, role: peutEcrire ? "button" : null, style: { display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderTop: i ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: peutEcrire ? "pointer" : "default" } },
            h("div", { style: { minWidth: 0, flex: 1, fontFamily: M, fontSize: 13, fontWeight: 600, color: "#EDF2F5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, x.titre || (LIB[String(x.type)] || x.type)),
            h("div", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 10.5, color: "#7C858D", whiteSpace: "nowrap" } }, enClair(x.date_intervention)),
            pastilleEtat(x.date_prochaine));
        })) : vide(ty === "vaccin"
          ? T("Aucun vaccin enregistr\u00e9.", "No vaccine recorded.", "Sin vacunas registradas.", "Nessun vaccino registrato.", "\u8a18\u9332\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Keine Impfung erfasst.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0644\u0642\u0627\u062d \u0645\u0633\u062c\u0644.", "没有疫苗记录。", "Geen vaccin geregistreerd.", "Nenhuma vacina registrada.", "Inget vaccin registrerat.", "Нет записей о прививках.", "Brak zapisanej szczepionki.", "기록된 백신이 없어요.")
          : T("Aucun vermifuge enregistr\u00e9.", "No deworming recorded.", "Sin verm\u00edfugos registrados.", "Nessun vermifugo registrato.", "\u8a18\u9332\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Keine Wurmkur erfasst.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0636\u0627\u062f \u062f\u064a\u062f\u0627\u0646 \u0645\u0633\u062c\u0644.", "没有驱虫记录。", "Geen ontworming geregistreerd.", "Nenhum vermífugo registrado.", "Ingen avmaskning registrerad.", "Нет записей о глистогонном.", "Brak zapisanego odrobaczania.", "기록된 구충제가 없어요.")));
    }
    return carte([
      titreModule("\ud83d\udc89", T("Vaccins & vermifuges", "Vaccines & deworming", "Vacunas y verm\u00edfugos", "Vaccini e vermifughi", "\u30ef\u30af\u30c1\u30f3\u30fb\u99c6\u866b", "Impfungen & Wurmkuren", "\u0627\u0644\u0644\u0642\u0627\u062d\u0627\u062a \u0648\u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646", "疫苗与驱虫", "Vaccins & ontwormen", "Vacinas & vermífugos", "Vaccin & avmaskning", "Прививки и глистогонное", "Szczepionki i odrobaczanie", "백신 & 구충제"), "vaccin"),
      bloc("vaccin", T("Vaccins", "Vaccines", "Vacunas", "Vaccini", "\u30ef\u30af\u30c1\u30f3", "Impfungen", "\u0627\u0644\u0644\u0642\u0627\u062d\u0627\u062a", "疫苗", "Vaccins", "Vacinas", "Vaccin", "Прививки", "Szczepionki", "백신")),
      bloc("vermifuge", T("Vermifuges", "Deworming", "Verm\u00edfugos", "Vermifughi", "\u99c6\u866b", "Wurmkuren", "\u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646", "驱虫", "Ontwormingen", "Vermífugos", "Avmaskningar", "Глистогонные", "Odrobaczanie", "구충제"))
    ], "mvaccins");
  }

  /* ---------- LES QUATRE CARRES ----------
     Demande de Blandine : des CARRES, deux par ligne, pas des cartes larges
     empilees. Tenir a deux par ligne sur 390 px impose UNE SEULE information par
     carre : une icone, un titre, la derniere date, un etat. Le detail (la liste
     des lignes) passe donc derriere un toucher — c'est le prix assume du format.
     Les anciennes fonctions moduleFerrure / moduleVaccins ne sont plus appelees
     mais restent dans le fichier : revenir aux cartes larges = deux lignes. */
  var FAMILLES = [
    { cle: "pieds", ic: "\ud83d\udc0e", types: ["ferrure", "parage"], neuf: "ferrure",
      titre: T("Ferrure / pieds", "Shoeing / feet", "Herrado / pies", "Ferratura / piedi", "\u8e44\u9244\u30fb\u8e44", "Beschlag / Hufe", "\u0627\u0644\u062a\u0646\u0639\u064a\u0644 / \u0627\u0644\u062d\u0648\u0627\u0641\u0631", "钉蹄铁 / 马蹄", "Beslag / hoeven", "Ferrageamento / cascos", "Skoning / hovar", "Ковка / копыта", "Kucie / kopyta", "장제 / 발") },
    { cle: "vaccin", ic: "\ud83d\udc89", types: ["vaccin"], neuf: "vaccin",
      titre: T("Vaccins", "Vaccines", "Vacunas", "Vaccini", "\u30ef\u30af\u30c1\u30f3", "Impfungen", "\u0627\u0644\u0644\u0642\u0627\u062d\u0627\u062a", "疫苗", "Vaccins", "Vacinas", "Vaccin", "Прививки", "Szczepionki", "백신") },
    { cle: "vermifuge", ic: "\ud83c\udf3f", types: ["vermifuge"], neuf: "vermifuge",
      titre: T("Vermifuges", "Deworming", "Verm\u00edfugos", "Vermifughi", "\u99c6\u866b", "Wurmkuren", "\u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646", "驱虫", "Ontwormingen", "Vermífugos", "Avmaskningar", "Глистогонные", "Odrobaczanie", "구충제") },
    { cle: "soins", ic: "\ud83e\ude7a", types: ["veterinaire", "dentiste", "osteopathe", "locomotion", "imagerie", "traitement", "autre"], neuf: "veterinaire",
      titre: T("Interventions", "Visits", "Intervenciones", "Interventi", "\u51e6\u7f6e", "Behandlungen", "\u0627\u0644\u062a\u062f\u062e\u0644\u0627\u062a", "处理记录", "Behandelingen", "Intervenções", "Besök", "Визиты", "Wizyty", "처치") }
  ];
  /* Le SEUL bouton d'ajout de la page. Avant : un « + » rond dans les carres de
     soins, et un gros « + Ajouter » turquoise dans ceux de l'equipe — meme geste,
     deux apparences. */
  function bouttonPlus(onTap, cle) {
    return h("span", { key: cle || "plus", role: "button", onClick: onTap, "aria-label": T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"),
      style: { flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.34)", background: "rgba(201,166,107,0.08)", color: "#D2B07A", fontSize: 15, fontWeight: 400, lineHeight: "26px", textAlign: "center", cursor: "pointer" } }, "+");
  }
  /* (932) SUIVI (refonte Sante, etape 2, maquette validee) : 4 cartes Vermifuge / Vaccin / Ferrure / Dentiste equin, avec la
     derniere date et la prochaine echeance (retard en rouge). Remplace « A surveiller » et « En un coup d'oeil ». Les autres soins
     (veterinaire, osteo, traitements...) : dans « Voir tout » et dans le Carnet. Rien n est efface. */
  var FAM_SUIVI = [
    { cle: "s-vermifuge", img: "images/sante-suivi-vermifuge.webp", ic: "🌿", picto: "pilule", types: ["vermifuge"], neuf: "vermifuge", titre: T("Vermifuge", "Deworming", "Vermífugo", "Vermifugo", "駆虫", "Wurmkur", "مضاد الديدان", "驱虫", "Ontwormen", "Vermífugo", "Avmaskning", "Глистогонное", "Odrobaczanie", "구충제") },
    { cle: "s-vaccin", img: "images/sante-suivi-vaccin.webp", ic: "💉", picto: "seringue", types: ["vaccin"], neuf: "vaccin", titre: T("Vaccin", "Vaccine", "Vacuna", "Vaccino", "ワクチン", "Impfung", "لقاح", "疫苗", "Vaccin", "Vacina", "Vaccin", "Прививка", "Szczepionka", "백신") },
    { cle: "s-ferrure", img: "images/sante-suivi-ferrure.webp", ic: "🐎", picto: "fer", types: ["ferrure", "parage"], neuf: "ferrure", titre: T("Ferrure", "Shoeing", "Herrado", "Ferratura", "蹄鉄", "Beschlag", "التنعيل", "钉蹄铁", "Beslag", "Ferrageamento", "Skoning", "Ковка", "Kucie", "장제") },
    { cle: "s-dentiste", img: "images/sante-suivi-dentiste.webp", ic: "🦷", picto: "dent", types: ["dentiste"], neuf: "dentiste", titre: T("Dentiste équin", "Equine dentist", "Dentista equino", "Dentista equino", "馬の歯科", "Pferdezahnarzt", "طبيب أسنان الخيل", "马牙医", "Paardentandarts", "Dentista equino", "Hästtandläkare", "Лошадиный стоматолог", "Dentysta koński", "말 치과") }
  ];
  var FAM_TOUT = { cle: "s-tout", ic: "📖", types: ["veterinaire", "ferrure", "parage", "vaccin", "vermifuge", "dentiste", "osteopathe", "locomotion", "imagerie", "traitement", "autre"], neuf: "veterinaire", titre: T("Tous les soins", "All care", "Todos los cuidados", "Tutte le cure", "すべてのケア", "Alle Einträge", "كل العنايات", "所有护理", "Alle verzorging", "Todos os cuidados", "All vård", "Весь уход", "Cała opieka", "모든 케어") };
  function pictoSuivi(nom) {
    var st = { width: 30, height: 30, display: "block" };
    var p = { fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    if (nom === "seringue") return h("svg", { viewBox: "0 0 24 24", style: st }, h("path", Object.assign({ d: "M18 2l4 4M20 4l-9.5 9.5M14 4l6 6M15.5 8.5l-9 9-3 1 1-3 9-9M7 13l4 4M3 21l2.5-2.5" }, p)));
    if (nom === "fer") return h("svg", { viewBox: "0 0 24 24", style: st }, h("path", Object.assign({ d: "M6 20H4.5C3.5 15 3 12 3.5 9 4.5 4.5 8 2.5 12 2.5S19.5 4.5 20.5 9c.5 3 0 6-1 11H18c.6-4 1-6.8.5-9C17.8 7.5 15.5 6 12 6S6.2 7.5 5.5 11C5 13.2 5.4 16 6 20z" }, p)), h("circle", { cx: 6, cy: 10.5, r: 0.6, fill: TQ }), h("circle", { cx: 18, cy: 10.5, r: 0.6, fill: TQ }), h("circle", { cx: 5.6, cy: 14.5, r: 0.6, fill: TQ }), h("circle", { cx: 18.4, cy: 14.5, r: 0.6, fill: TQ }));
    if (nom === "dent") return h("svg", { viewBox: "0 0 24 24", style: st }, h("path", Object.assign({ d: "M12 5.5C10.5 4 8.8 3.5 7 3.5 4.5 3.5 3 5.5 3 8c0 2.5 1 4 1.6 6 .6 2.2.9 6.5 2.6 6.5 1.6 0 1.8-3.5 2.4-5.2.4-1 .9-1.3 1.4-1.3h2c.5 0 1 .3 1.4 1.3.6 1.7.8 5.2 2.4 5.2 1.7 0 2-4.3 2.6-6.5C20 12 21 10.5 21 8c0-2.5-1.5-4.5-4-4.5-1.8 0-3.5.5-5 2z" }, p)));
    return h("svg", { viewBox: "0 0 24 24", style: st }, h("path", Object.assign({ d: "M10.5 20.5l10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7zM8.5 8.5l7 7" }, p)));
  }
  function dateCourte(iso, precision) {
    var d = jourDe(iso); if (!d) return "—";
    if (String(precision || "") === "mois") return MOIS[d.getMonth()] + " " + d.getFullYear();
    var jj = ("0" + d.getDate()).slice(-2), mm = ("0" + (d.getMonth() + 1)).slice(-2);
    return jj + "/" + mm + "/" + d.getFullYear();
  }
  function carteSuivi(f) {
    var d = dernierFait(f.types), pr = prochaineDe(f.types);
    var j = pr ? joursAvant(pr.date_prochaine) : null;
    var retard = (j !== null && j < 0);
    var coulP = retard ? "#FF6B6B" : TQ;
    var lib = { fontFamily: M, fontSize: 11.5, color: "rgba(243,238,228,0.62)" };
    return h("div", { key: f.cle, role: "button", onClick: function () { setFamille(f.cle); },
      style: { position: "relative", overflow: "hidden", minWidth: 0, padding: "14px 14px 14px", borderRadius: 16, border: "1px solid " + (retard ? "rgba(255,107,107,0.45)" : "rgba(201,166,107,0.28)"), background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025)", cursor: "pointer", display: "flex", flexDirection: "column" } },
      /* (933) photo sombre de Blandine en fond (sujet a droite ; en arabe, photo retournee pour laisser le texte sur le sombre) */
      f.img ? h("img", { src: f.img, alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center", transform: (function () { try { return document.documentElement.dir === "rtl" ? "scaleX(-1)" : "none"; } catch (eD) { return "none"; } })(), opacity: 1, pointerEvents: "none" } }) : null,
      f.img ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(" + ((function () { try { return document.documentElement.dir === "rtl"; } catch (eD) { return false; } })() ? "270deg" : "90deg") + ", rgba(8,11,13,0.72) 0%, rgba(8,11,13,0.38) 45%, rgba(8,11,13,0) 75%)" } }) : null,   /* (933) voile allege : la couleur des photos reste */
      h("div", { style: { position: "relative" } }, pictoSuivi(f.picto)),
      h("div", { style: { position: "relative", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 19, fontWeight: 600, color: "#F3EEE4", marginTop: 9, lineHeight: 1.15, textShadow: "0 1px 8px rgba(0,0,0,0.7)" } }, f.titre),
      h("div", { style: { position: "relative", marginTop: 8, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 6, rowGap: 3, alignItems: "baseline", paddingInlineEnd: 14 } },
        h("span", { style: lib }, T("Dernier", "Last", "Último", "Ultimo", "前回", "Zuletzt", "الأخير", "最近", "Laatste", "Último", "Senaste", "Последний", "Ostatni", "마지막")),
        h("span", { style: { fontFamily: M, fontSize: 12, color: "#EDE6D8", fontVariantNumeric: "tabular-nums" } }, d ? dateCourte(d.date_intervention, "jour") : "—"),
        h("span", { style: lib }, T("Prochain", "Next", "Próximo", "Prossimo", "次回", "Nächster", "القادم", "下一次", "Volgende", "Próximo", "Nästa", "Следующий", "Następny", "다음")),
        h("span", { style: { fontFamily: M, fontSize: 12, fontWeight: 600, color: pr ? coulP : "rgba(243,238,228,0.45)", fontVariantNumeric: "tabular-nums" } }, pr ? dateCourte(pr.date_prochaine, pr.precision_prochaine) : "—")),
      h("span", { "aria-hidden": "true", style: { position: "absolute", insetInlineEnd: 12, bottom: 14, color: TQ, fontSize: 18, lineHeight: 1 } }, (function () { try { return document.documentElement.dir === "rtl" ? "‹" : "›"; } catch (eD) { return "›"; } })()));
  }
  function suivi() {
    var large = !!largeS;   /* (942) 4 cartes sur une ligne seulement sur ordinateur : sous 1024 px la page garde sa colonne de telephone */
    return h("div", { style: { marginBottom: 30 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } },
        h("svg", { viewBox: "0 0 24 24", style: { width: 20, height: 20, display: "block", flexShrink: 0 } }, h("rect", { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2, fill: "none", stroke: TQ, strokeWidth: 1.6 }), h("path", { d: "M3.5 10h17M8 3v4M16 3v4", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round" })),
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F3EEE4", flex: 1 } }, T("Suivi", "Follow-up", "Seguimiento", "Monitoraggio", "フォロー", "Verlauf", "المتابعة", "已关注", "Volgend", "Seguindo", "Följer", "В подписках", "Obserwujesz", "팔로잉")),
        h("span", { role: "button", onClick: function () { setFamille(FAM_TOUT.cle); }, style: { fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.8)", cursor: "pointer", whiteSpace: "nowrap" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + ((function () { try { return document.documentElement.dir === "rtl"; } catch (eD) { return false; } })() ? " ‹" : " ›"))),
      h("div", { style: { display: "grid", gridTemplateColumns: large ? "repeat(4, minmax(0, 1fr))" : "1fr 1fr", gap: 12 } },
        FAM_SUIVI.map(function (f) { return carteSuivi(f); })));
  }
  function familleDe(cle) { for (var i = 0; i < FAMILLES.length; i++) { if (FAMILLES[i].cle === cle) return FAMILLES[i]; } for (var k = 0; k < FAM_SUIVI.length; k++) { if (FAM_SUIVI[k].cle === cle) return FAM_SUIVI[k]; } if (cle === FAM_TOUT.cle) return FAM_TOUT; return null; }
  function lignesDe(f) {
    return (soins || []).filter(function (x) { return f.types.indexOf(String(x.type)) >= 0; })
      .sort(function (a, b) { return String(b.date_intervention || b.date_prochaine || "").localeCompare(String(a.date_intervention || a.date_prochaine || "")); });
  }
  function carreFamille(f) {
    var d = dernierFait(f.types), p = prochaineDe(f.types);
    var nb = lignesDe(f).length;
    var j = p ? joursAvant(p.date_prochaine) : null;
    var etat = (j === null) ? null : (j < 0 ? "rouge" : (j <= 15 ? "ambre" : "vert"));
    var coul = (etat === "rouge") ? "#FF6B81" : ((etat === "ambre") ? "#E8C887" : TQ);
    var dj = d ? jourDe(d.date_intervention) : null;
    return h("div", { key: "cf" + f.cle, onClick: function () { setFamille(f.cle); }, role: "button",
      style: { minWidth: 0, padding: "13px 14px 15px", borderRadius: 18, border: "1px solid " + (etat && etat !== "vert" ? coul + "55" : "rgba(255,255,255,0.07)"), background: FOND_CARTE, boxShadow: "0 10px 30px rgba(0,0,0,0.45)", cursor: "pointer" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
        h("span", { style: { fontSize: 17, lineHeight: 1 } }, f.ic),
        h("span", { style: { flex: 1 } }),
        peutEcrire ? bouttonPlus(function (e) { try { e.stopPropagation(); } catch (eS) { } setFeuille({ soin: null, type: f.neuf }); }) : null),
      h("div", { style: { fontFamily: C, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#D9C7A3", marginTop: 10, lineHeight: 1.25 } }, f.titre),
      dj
        ? h("div", { style: { marginTop: 10, display: "flex", alignItems: "baseline", gap: 7 } },
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { fontFamily: C, fontSize: 19, fontWeight: 700, color: "#EDF2F5", lineHeight: 1.1 } }, dj.getDate() + " " + MOIS[dj.getMonth()]),
              h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#7C858D", marginTop: 2 } }, String(dj.getFullYear()))),
            /* Un simple point de couleur : le mot (« Demain », « En retard »)
               est dit une seule fois, dans « A surveiller ». */
            p ? h("span", { "aria-label": delaiCourt(j), style: { flex: "0 0 auto", width: 7, height: 7, borderRadius: "50%", background: coul, boxShadow: "0 0 8px " + coul + "88" } }) : null)
        : h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12, color: "#6D7681", lineHeight: 1.4 } },
            T("Rien d'enregistr\u00e9", "Nothing recorded", "Nada registrado", "Nulla registrato", "\u8a18\u9332\u306a\u3057", "Nichts erfasst", "\u0644\u0627 \u0634\u064a\u0621 \u0645\u0633\u062c\u0644", "没有记录", "Niets geregistreerd", "Nada registrado", "Inget registrerat", "Ничего не записано", "Nic nie zapisano", "기록 없음")),
      (dj && nb > 1) ? h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#5B646E", marginTop: 8 } },
        nb + " " + T("au carnet", "in record", "en historial", "nel libretto", "\u4ef6", "im Verlauf", "\u0641\u064a \u0627\u0644\u062f\u0641\u062a\u0631", "已记录", "in het logboek", "no caderno", "i journalen", "в журнале", "w książeczce", "노트에")) : null);
  }
  function titreGroupe(icone, txt) {
    return h("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 12 } },
      h("span", { style: { fontSize: 13 } }, icone),
      h("div", { style: { fontFamily: C, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D9C7A3" } }, txt),
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(217,199,163,0.28), transparent)" } }));
  }
  function grilleCarres() {
    return h("div", { style: { marginBottom: 24 } },
      titreGroupe("\ud83d\udcd6", T("En un coup d'\u0153il", "At a glance", "De un vistazo", "A prima vista", "\u3072\u3068\u76ee\u3067", "Auf einen Blick", "\u0628\u0646\u0638\u0631\u0629 \u0633\u0631\u064a\u0639\u0629", "一目了然", "In één oogopslag", "De relance", "I korthet", "С первого взгляда", "W skrócie", "한눈에 보기")),
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
        FAMILLES.map(function (f) { return carreFamille(f); })));
  }
  /* Le panneau d'une famille : detache vers <body> pour passer au-dessus de la
     barre d'onglets, et termine par la cale de l'encoche. Les lignes y sont les
     memes que celles du Carnet (elles ouvrent la feuille de saisie). */
  function panneauFamille() {
    if (!famille) return null;
    var f = familleDe(famille); if (!f) return null;
    var l = lignesDe(f);
    var voile = h("div", { onClick: function () { setFamille(null); }, style: { position: "fixed", inset: 0, zIndex: 9400, background: "rgba(4,6,9,0.84)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (e) { try { e.stopPropagation(); } catch (eS) { } }, style: { width: "100%", maxWidth: 560, maxHeight: "86vh", overflowY: "auto", WebkitOverflowScrolling: "touch", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.28)", borderBottom: "none", background: "linear-gradient(180deg, rgba(12,18,24,0.99), rgba(7,10,13,1))", padding: "18px 16px calc(env(safe-area-inset-bottom) + 20px)" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
          h("span", { style: { fontSize: 18 } }, f.ic),
          h("div", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 14, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "#EDF2F5" } }, f.titre),
          peutEcrire ? h("span", { role: "button", onClick: function () { setFeuille({ soin: null, type: f.neuf }); }, style: { flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.34)", background: "rgba(201,166,107,0.08)", color: "#D2B07A", fontSize: 16, lineHeight: "28px", textAlign: "center", cursor: "pointer" } }, "+") : null),
        (f.types.indexOf("vaccin") >= 0) ? protocoleVaccinal() : null,   /* 11/10 (968) Blandine : « qu on le voie quand on clique sur vaccin, pas en plein milieu de la page » */
        (function () {   /* (944) les documents lies a ces soins (ou certificats pour les vaccins) : les memes que dans le carnet, sans copie */
          var ids = {}; l.forEach(function (x) { ids[x.id] = 1; });
          var dl = (docs || []).filter(function (d) { return (d.soin_id && ids[d.soin_id]) || (f.types.indexOf("vaccin") >= 0 && typeDoc(d.type).f === "vaccins"); });
          var bAj = peutEcrire ? h("span", { role: "button", onClick: function () { setFamille(null); ouvrirDocAjout(f.types.indexOf("vaccin") >= 0 ? "carnet_vaccin" : "autre", ""); }, style: { display: "inline-block", marginBottom: 10, padding: "7px 13px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", color: "#E9D9B8", fontFamily: M, fontSize: 12, cursor: "pointer" } }, "+ " + T("Joindre un document", "Attach a document", "Adjuntar un documento", "Allega un documento", "書類を添付", "Dokument anhängen", "إرفاق مستند", "附上文件", "Een document toevoegen", "Anexar um documento", "Bifoga ett dokument", "Прикрепить документ", "Dołącz dokument", "문서 첨부")) : null;
          if (!dl.length) return bAj;
          return h("div", { style: { marginBottom: 12 } }, h("div", { style: { borderRadius: 14, border: "1px solid rgba(201,166,107,0.25)", overflow: "hidden", marginBottom: 8 } }, dl.map(function (d, i) { return ligneDoc(d, i); })), bAj);
        })(),
        l.length
          ? h("div", null, l.map(function (x, i) { return ligne(x, "fam" + (x.id || i)); }))
          : h("div", { style: { fontFamily: M, fontSize: 12.5, color: "#6D7681", lineHeight: 1.6, padding: "6px 2px 10px" } },
              T("Rien d'enregistr\u00e9 pour l'instant.", "Nothing recorded yet.", "Nada registrado por ahora.", "Nulla registrato per ora.", "\u307e\u3060\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002", "Noch nichts erfasst.", "\u0644\u0627 \u0634\u064a\u0621 \u0645\u0633\u062c\u0644 \u062d\u0627\u0644\u064a\u0627.", "暂时没有记录。", "Nog niets geregistreerd.", "Nada registrado por enquanto.", "Inget registrerat ännu.", "Пока ничего не записано.", "Na razie nic nie zapisano.", "아직 기록된 것이 없어요.")),
        h("button", { onClick: function () { setFamille(null); }, style: { width: "100%", marginTop: 12, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.20)", background: "transparent", color: "#C9D3D8", fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } },
          T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))));
    return (typeof hypePortailBody === "function") ? hypePortailBody(voile) : voile;
  }

  /* ---------- L'EQUIPE DE SOINS ----------
     Quatre carres, deux par ligne, comme les familles de soins. Appeler et
     ecrire restent ouverts a tout le monde (une cavaliere rattachee doit pouvoir
     joindre le veto) ; seule la MODIFICATION demande le droit d'ecriture.
     AUCUNE coordonnee n'est inventee : un role sans pro affiche « Ajouter ». */
  var ROLES_EQ = hypeRolesSoins(T);
  function proDuRole(r) {
    var l = (pros || []).filter(function (x) { return String(x.role) === r; });
    return l.length ? l[0] : null;
  }
  function boutonRond(ico, href, cle, aria) {
    return h("a", { key: cle, href: href, "aria-label": aria, onClick: function (e) { try { e.stopPropagation(); } catch (e0) { } },
      style: { flex: "0 0 auto", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.34)", background: "rgba(201,166,107,0.08)", color: "#D2B07A", fontSize: 13, lineHeight: "30px", textAlign: "center", textDecoration: "none" } }, ico);
  }
  function carreRole(r) {
    var p = proDuRole(r);
    var vide = !p;
    return h("div", { key: "cr" + r, onClick: peutEcrire ? function () { setFeuillePro({ role: r, pro: p }); } : null, role: peutEcrire ? "button" : null,
      style: { minWidth: 0, padding: "13px 14px 15px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: FOND_CARTE, boxShadow: "0 10px 30px rgba(0,0,0,0.45)", cursor: peutEcrire ? "pointer" : "default" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
        h("span", { style: { fontSize: 17, lineHeight: 1 } }, HYPE_ROLES_ICONES[r] || "\ud83e\ude7a"),
        h("span", { style: { flex: 1 } }),
        (peutEcrire && vide) ? bouttonPlus(function (e) { try { e.stopPropagation(); } catch (eS) { } setFeuillePro({ role: r, pro: null }); }) : null),
      h("div", { style: { fontFamily: C, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#D9C7A3", marginTop: 10, lineHeight: 1.25 } }, ROLES_EQ[r] || r),
      vide
        ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12, color: "#6D7681", lineHeight: 1.4 } },
            T("Rien d'enregistr\u00e9", "Nothing recorded", "Nada registrado", "Nulla registrato", "\u8a18\u9332\u306a\u3057", "Nichts erfasst", "\u0644\u0627 \u0634\u064a\u0621 \u0645\u0633\u062c\u0644", "没有记录", "Niets geregistreerd", "Nada registrado", "Inget registrerat", "Ничего не записано", "Nic nie zapisano", "기록 없음"))
        : h("div", null,
            h("div", { style: { fontFamily: M, fontSize: 13, fontWeight: 700, color: "#EDF2F5", marginTop: 10, lineHeight: 1.3, overflowWrap: "anywhere" } }, p.nom),
            p.structure ? h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#7C858D", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.structure) : null,
            (p.tel || p.email) ? h("div", { style: { display: "flex", gap: 8, marginTop: 11 } },
              p.tel ? boutonRond("\ud83d\udcde", "tel:" + String(p.tel).replace(/\s+/g, ""), "t", T("Appeler", "Call", "Llamar", "Chiama", "\u96fb\u8a71", "Anrufen", "\u0627\u062a\u0635\u0627\u0644", "拨打电话", "Bellen", "Ligar", "Ring", "Позвонить", "Zadzwoń", "전화하기")) : null,
              p.email ? boutonRond("\u2709", "mailto:" + String(p.email).trim(), "m", T("\u00c9crire", "Email", "Escribir", "Scrivi", "\u30e1\u30fc\u30eb", "E-Mail", "\u0643\u062a\u0627\u0628\u0629", "写点什么", "Schrijven", "Escrever", "Skriv", "Написать", "Napisz", "쓰기")) : null) : null));
  }
  /* (934) L EQUIPE DE SOINS EN LIGNES (maquette validee, etape 3) : une carte, une ligne par intervenant —
     initiales en medaillon, nom, specialite (+ structure), boutons ronds telephone / e-mail, chevron (fiche, pour qui peut modifier).
     Les roles vides ne s affichent qu a qui peut modifier (ligne discrete « Ajouter »). Rien d autre ne change (memes donnees, memes droits). */
  function icoEq(nom) {
    var pr = { fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    if (nom === "tel") return h("svg", { viewBox: "0 0 24 24", style: { width: 17, height: 17, display: "block" } }, h("path", Object.assign({ d: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" }, pr)));
    return h("svg", { viewBox: "0 0 24 24", style: { width: 17, height: 17, display: "block" } }, h("rect", Object.assign({ x: 3, y: 5.5, width: 18, height: 13, rx: 2 }, pr)), h("path", Object.assign({ d: "M3.5 6.5l8.5 6.5 8.5-6.5" }, pr)));
  }
  function rondEq(type, href, cle, aria) {
    return h("a", { key: cle, href: href, "aria-label": aria, onClick: function (e) { try { e.stopPropagation(); } catch (e0) { } },
      style: { flex: "0 0 auto", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.7)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" } }, icoEq(type));
  }
  function initialesEq(nom) {
    var m = String(nom || "").replace(/^(dr\.?|docteur)\s+/i, "").trim().split(/\s+/).filter(Boolean);
    return ((m[0] || "?").charAt(0) + (m.length > 1 ? m[m.length - 1].charAt(0) : "")).toUpperCase();
  }
  function ligneEq(r, i) {
    var p = proDuRole(r);
    var rtlE = false; try { rtlE = document.documentElement.dir === "rtl"; } catch (eD) { }
    var bord = i ? "1px solid rgba(255,255,255,0.06)" : "none";
    if (!p) {
      return h("div", { key: "le" + r, role: "button", onClick: function () { setFeuillePro({ role: r, pro: null }); }, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: bord, cursor: "pointer" } },
        h("span", { style: { width: 44, height: 44, flex: "0 0 auto", borderRadius: "50%", border: "1px dashed rgba(201,166,107,0.45)", display: "flex", alignItems: "center", justifyContent: "center", color: TQ, fontSize: 18 } }, "+"),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: M, fontSize: 13, color: "rgba(243,238,228,0.7)" } }, ROLES_EQ[r] || r),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(201,166,107,0.8)", marginTop: 2 } }, T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"))));
    }
    return h("div", { key: "le" + r, onClick: peutEcrire ? function () { setFeuillePro({ role: r, pro: p }); } : null, role: peutEcrire ? "button" : null,
      style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderTop: bord, cursor: peutEcrire ? "pointer" : "default" } },
      /* (936) idee de Blandine : une image du metier dans le medaillon (stethoscope, sabot ferre, dents, main sur l encolure) ; initiales si role inconnu */
      ({ veterinaire: 1, marechal: 1, dentiste: 1, osteopathe: 1 })[r]
        ? h("img", { src: "images/sante-pro-" + r + ".webp", alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async", style: { width: 46, height: 46, flex: "0 0 auto", borderRadius: "50%", border: "1px solid rgba(201,166,107,0.6)", objectFit: "cover", display: "block" } })
        : h("span", { style: { width: 44, height: 44, flex: "0 0 auto", borderRadius: "50%", border: "1px solid rgba(201,166,107,0.55)", background: "radial-gradient(circle at 30% 25%, rgba(201,166,107,0.22), rgba(16,21,24,0.9) 70%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 600, color: "#E9D9B8", letterSpacing: 0.5 } }, initialesEq(p.nom)),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.nom),
        h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.6)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, (ROLES_EQ[r] || r) + (p.structure ? " · " + p.structure : ""))),
      p.tel ? rondEq("tel", "tel:" + String(p.tel).replace(/\s+/g, ""), "t", T("Appeler", "Call", "Llamar", "Chiama", "電話", "Anrufen", "اتصال", "拨打电话", "Bellen", "Ligar", "Ring", "Позвонить", "Zadzwoń", "전화하기")) : null,
      p.email ? rondEq("mail", "mailto:" + String(p.email).trim(), "m", T("Écrire", "Email", "Escribir", "Scrivi", "メール", "E-Mail", "كتابة", "写点什么", "Schrijven", "Escrever", "Skriv", "Написать", "Napisz", "쓰기")) : null,
      peutEcrire ? h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: TQ, fontSize: 20, lineHeight: 1, marginInlineStart: 2 } }, rtlE ? "‹" : "›") : null);
  }
  function equipeLignes() {
    var roles = HYPE_ROLES_ORDRE.filter(function (r) { return !!proDuRole(r) || peutEcrire; });
    if (!roles.length && !errPro) return null;
    return h("div", { style: { marginBottom: 30 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } },
        h("svg", { viewBox: "0 0 24 24", style: { width: 21, height: 21, display: "block", flexShrink: 0 } }, h("circle", { cx: 12, cy: 8, r: 3.5, fill: "none", stroke: TQ, strokeWidth: 1.6 }), h("path", { d: "M5 20c.8-3.8 3.6-5.5 7-5.5s6.2 1.7 7 5.5M5.5 11a2.5 2.5 0 1 1 0-.1M18.5 11a2.5 2.5 0 1 1 0-.1", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round" })),
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F3EEE4", flex: 1 } }, T("L'équipe de soins", "The care team", "El equipo de cuidados", "L'équipe di cura", "ケアチーム", "Das Pflegeteam", "فريق العناية", "护理团队", "Het verzorgingsteam", "A equipe de cuidados", "Vårdteamet", "Команда по уходу", "Zespół opieki", "케어 팀"))),
      errPro ? h("div", { style: { marginBottom: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12, lineHeight: 1.5 } }, T("L'équipe n'a pas pu être lue : ", "The team could not load: ", "No se pudo cargar el equipo: ", "Impossibile caricare l'équipe: ", "チームを読み込めません：", "Team nicht geladen: ", "تعذرت قراءة الفريق: ", "团队无法读取：", "Het team kon niet worden geladen: ", "Não foi possível ler a equipe: ", "Teamet kunde inte läsas: ", "Не удалось загрузить команду: ", "Nie udało się wczytać zespołu: ", "팀을 불러오지 못했어요: ") + errPro) : null,
      roles.length ? h("div", { style: { borderRadius: 16, border: "1px solid rgba(201,166,107,0.28)", background: "linear-gradient(165deg, rgba(17,27,31,0.55) 0%, rgba(11,18,21,0.45) 100%)" /* (937) moins opaque (Blandine) : le fond de page transparait */, WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", overflow: "hidden" } },
        roles.map(function (r, i) { return ligneEq(r, i); })) : null);
  }
  function grilleEquipe() {
    return h("div", { style: { marginBottom: 24 } },
      titreGroupe("\ud83d\udc65", T("L'\u00e9quipe de soins", "The care team", "El equipo de cuidados", "L'\u00e9quipe di cura", "\u30b1\u30a2\u30c1\u30fc\u30e0", "Das Pflegeteam", "\u0641\u0631\u064a\u0642 \u0627\u0644\u0639\u0646\u0627\u064a\u0629", "护理团队", "Het verzorgingsteam", "A equipe de cuidados", "Vårdteamet", "Команда по уходу", "Zespół opieki", "케어 팀")),
      errPro ? h("div", { style: { marginBottom: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12, lineHeight: 1.5 } },
        T("L'\u00e9quipe n'a pas pu \u00eatre lue : ", "The team could not load: ", "No se pudo cargar el equipo: ", "Impossibile caricare l'\u00e9quipe: ", "\u30c1\u30fc\u30e0\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\uff1a", "Team nicht geladen: ", "\u062a\u0639\u0630\u0631\u062a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0641\u0631\u064a\u0642: ", "团队无法读取：", "Het team kon niet worden geladen: ", "Não foi possível ler a equipe: ", "Teamet kunde inte läsas: ", "Не удалось загрузить команду: ", "Nie udało się wczytać zespołu: ", "팀을 불러오지 못했어요: ") + errPro) : null,
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
        HYPE_ROLES_ORDRE.map(function (r) { return carreRole(r); })));
  }

  /* ---------- « A LIRE » ----------
     Une SEULE carte qui ouvre le magazine Sante existant (route "sante", ses
     6 vrais articles). Aucun mock, et surtout aucun titre recopie.
     \u26a0 POURQUOI PAS TROIS CARTES, UNE PAR ARTICLE : le tableau des articles est
     declare DANS EcranSante (79 Ko, 254 lignes) et n'est pas lisible d'ici. Le
     sortir au niveau global est faisable mais c'est un chantier a part — et il y a
     un piege : un `const ARTICLES` GLOBAL existe deja (les actualites, CSIO La
     Baule). Reutiliser ce nom tuerait l'appli entiere par redeclaration. Le nom
     reserve pour le jour ou on le fera : HYPE_ARTICLES_SANTE. */
  function blocALire() {
    var img = (typeof IMG_SANTE_SIGNAUX !== "undefined") ? IMG_SANTE_SIGNAUX : "";
    return h("div", { style: { marginBottom: 6 } },
      titreGroupe("\ud83d\udcd6", T("\u00c0 lire", "Read", "Para leer", "Da leggere", "\u8aad\u3080", "Zum Lesen", "\u0644\u0644\u0642\u0631\u0627\u0621\u0629", "阅读", "Lezen", "Para ler", "Att läsa", "Почитать", "Do przeczytania", "읽을거리")),
      h("div", { role: "button", onClick: function () { setEcran("sante"); },
        style: { display: "flex", alignItems: "stretch", overflow: "hidden", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: FOND_CARTE, boxShadow: "0 10px 30px rgba(0,0,0,0.45)", cursor: "pointer" } },
        img ? h("div", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 104, backgroundImage: "url(" + img + ")", backgroundSize: "cover", backgroundPosition: "center" } }) : null,
        h("div", { style: { flex: 1, minWidth: 0, padding: "14px 15px 15px" } },
          h("div", { style: { fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: TQ } },
            T("Magazine Hype", "Hype magazine", "Revista Hype", "Rivista Hype", "Hype \u30de\u30ac\u30b8\u30f3", "Hype Magazin", "\u0645\u062c\u0644\u0629 Hype", "Hype 杂志", "Hype-magazine", "Revista Hype", "Hype-magasinet", "Журнал Hype", "Magazyn Hype", "Hype 매거진")),
          h("div", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: "#EDF2F5", marginTop: 5, lineHeight: 1.25 } },
            T("Sant\u00e9 et bien-\u00eatre du cheval", "Horse health and wellbeing", "Salud y bienestar del caballo", "Salute e benessere del cavallo", "\u99ac\u306e\u5065\u5eb7\u3068\u5e78\u305b", "Gesundheit und Wohl des Pferdes", "\u0635\u062d\u0629 \u0627\u0644\u062d\u0635\u0627\u0646 \u0648\u0631\u0641\u0627\u0647\u064a\u062a\u0647", "马的健康与养护", "Gezondheid en welzijn van het paard", "Saúde e bem-estar do cavalo", "Hästens hälsa och välmående", "Здоровье и благополучие лошади", "Zdrowie i dobre samopoczucie konia", "말의 건강과 웰빙")),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(220,227,232,0.62)", marginTop: 5, lineHeight: 1.5 } },
            T("Coliques, boiteries, fortes chaleurs, plaies, vermifuges, bien-\u00eatre.", "Colic, lameness, heat, wounds, deworming, wellbeing.", "C\u00f3licos, cojeras, calor, heridas, verm\u00edfugos, bienestar.", "Coliche, zoppie, caldo, ferite, vermifughi, benessere.", "\u75c7\u72b6\u5225\u306e\u89e3\u8aac\u8a18\u4e8b\u3002", "Kolik, Lahmheit, Hitze, Wunden, Wurmkur, Wohlbefinden.", "\u0627\u0644\u0645\u063a\u0635\u060c \u0627\u0644\u0639\u0631\u062c\u060c \u0627\u0644\u062d\u0631 \u0627\u0644\u0634\u062f\u064a\u062f\u060c \u0627\u0644\u062c\u0631\u0648\u062d\u060c \u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646\u060c \u0627\u0644\u0631\u0641\u0627\u0647\u064a\u0629.", "疝痛、跛行、高温、伤口、驱虫、养护。", "Koliek, kreupelheid, hitte, wonden, ontwormen, welzijn.", "Cólicas, claudicações, calor forte, feridas, vermífugos, bem-estar.", "Kolik, hälta, stark värme, sår, avmaskning, välmående.", "Колики, хромота, жара, раны, глистогонные, благополучие.", "Kolki, kulawizny, upały, rany, odrobaczanie, dobre samopoczucie.", "산통, 절뚝거림, 폭염, 상처, 구충제, 웰빙.")),
          h("div", { style: { fontFamily: M, fontSize: 11.5, fontWeight: 700, color: TQ, marginTop: 9 } },
            T("Ouvrir le magazine \u2192", "Open the magazine \u2192", "Abrir la revista \u2192", "Apri la rivista \u2192", "\u958b\u304f \u2192", "Magazin \u00f6ffnen \u2192", "\u0641\u062a\u062d \u0627\u0644\u0645\u062c\u0644\u0629 \u2192", "打开杂志 →", "Het magazine openen →", "Abrir a revista →", "Öppna magasinet →", "Открыть журнал →", "Otwórz magazyn →", "매거진 열기 →")))));
  }

  /* ---------- HEY BABY : OBSERVATIONS EPINGLEES ----------
     La table ne garde que la question et la reponse : PAS de vignette, PAS de
     titre court. On n'en invente aucun en base — le titre est la premiere ligne
     de la question, le resume le debut de la reponse. Un vrai titre ou une
     vignette demanderaient des colonnes, donc une decision de Blandine.
     Le disclaimer est obligatoire et ne dit jamais un diagnostic. */
  function couper(txt, n) {
    var v = String(txt || "").replace(/\s+/g, " ").trim();
    return (v.length > n) ? (v.slice(0, n - 1) + "\u2026") : v;
  }
  /* (935) BANDEAUX DE BAS DE PAGE (maquette validee, etape 4) : « Demander a Hey Baby » puis « Le magazine sante », images de
     Blandine (cadre dessine retire : le liseré est trace par l appli, net sur tous les ecrans). Hey Baby s ouvre avec une phrase
     de depart sur la sante du cheval (son nom seulement — aucune donnee medicale transmise). Les observations epinglees : une
     ligne depliable sous le bandeau, seulement s il y en a. */
  function bandeauSante(cle, img, ico, titre, sous, onTap) {
    var rtlB = false; try { rtlB = document.documentElement.dir === "rtl"; } catch (eD) { }
    return h("div", { key: cle, role: "button", onClick: onTap, style: { position: "relative", overflow: "hidden", height: 104, borderRadius: 16, border: "1px solid rgba(201,166,107,0.55)", background: "#080B0D", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, padding: "0 16px" } },
      h("img", { src: img, alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center", transform: rtlB ? "scaleX(-1)" : "none", pointerEvents: "none" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(" + (rtlB ? "270deg" : "90deg") + ", rgba(8,11,13,0.82) 0%, rgba(8,11,13,0.55) 45%, rgba(8,11,13,0) 80%)" } }),
      h("span", { style: { position: "relative", flex: "0 0 auto", width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.75)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,11,13,0.35)" } }, ico),
      h("div", { style: { position: "relative", flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.15, textShadow: "0 1px 8px rgba(0,0,0,0.7)" } }, titre),
        h("div", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.82)", marginTop: 4, lineHeight: 1.35, textShadow: "0 1px 8px rgba(0,0,0,0.7)" } }, sous)),
      h("span", { "aria-hidden": "true", style: { position: "relative", flex: "0 0 auto", color: TQ, fontSize: 24, lineHeight: 1 } }, rtlB ? "‹" : "›"));
  }
  var stOb = React.useState(false); var obsOuvert = stOb[0], setObsOuvert = stOb[1];
  function blocHeyBaby() {
    var pr = { fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    var icoHB = h("svg", { viewBox: "0 0 24 24", style: { width: 22, height: 22, display: "block" } }, h("path", Object.assign({ d: "M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17.5H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5z" }, pr)), h("circle", { cx: 8, cy: 11.5, r: 0.9, fill: TQ }), h("circle", { cx: 12, cy: 11.5, r: 0.9, fill: TQ }), h("circle", { cx: 16, cy: 11.5, r: 0.9, fill: TQ }));
    var nb = (epingles || []).length;
    return h("div", { style: { marginBottom: 16 } },
      bandeauSante("bhb", "images/sante-bandeau-heybaby.webp", icoHB,
        T("Demander à Hey Baby", "Ask Hey Baby", "Preguntar a Hey Baby", "Chiedi a Hey Baby", "Hey Baby に聞く", "Hey Baby fragen", "اسألي Hey Baby", "问问 Hey Baby", "Vraag het aan Hey Baby", "Perguntar ao Hey Baby", "Fråga Hey Baby", "Спросить Hey Baby", "Zapytaj Hey Baby", "Hey Baby에게 물어보기"),
        T("Une question sur la santé de ton cheval ?" /* (971) tutoiement, comme partout dans Hype */, "A question about your horse's health?", "¿Una pregunta sobre la salud de tu caballo?", "Una domanda sulla salute del tuo cavallo?", "馬の健康について質問がありますか？", "Eine Frage zur Gesundheit deines Pferdes?", "سؤال عن صحة حصانك؟", "对你的马的健康有疑问吗？", "Een vraag over de gezondheid van je paard?", "Uma dúvida sobre a saúde do seu cavalo?", "En fråga om din hästs hälsa?", "Вопрос о здоровье твоей лошади?", "Masz pytanie o zdrowie swojego konia?", "말의 건강에 대해 궁금한 점이 있나요?"),
        function () { try { window.__hbPrefill = T("J'ai une question sur la santé de ", "I have a question about the health of ", "Tengo una pregunta sobre la salud de ", "Ho una domanda sulla salute di ", "", "Ich habe eine Frage zur Gesundheit von ", "لدي سؤال عن صحة ", "我有一个关于这匹马健康的问题：", "Ik heb een vraag over de gezondheid van ", "Tenho uma dúvida sobre a saúde de ", "Jag har en fråga om hälsan hos ", "У меня вопрос о здоровье ", "Mam pytanie o zdrowie konia: ", "건강에 대해 질문이 있어요: ") + nomVu + T(" : ", ": ", ": ", ": ", " の健康について質問があります：", ": ", ": ", ": ", ": ", ": ", ": ", ": ", ": ", ": "); } catch (eP) { } setEcran("assistant"); }),
      nb ? h("div", { style: { marginTop: 10, borderRadius: 14, border: "1px solid rgba(201,166,107,0.22)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", overflow: "hidden" } },
        h("div", { role: "button", onClick: function () { setObsOuvert(!obsOuvert); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" } },
          h("span", { style: { color: TQ, fontSize: 13 } }, "✨"),
          h("span", { style: { flex: 1, fontFamily: M, fontSize: 13, color: "#EDE6D8" } }, T("Observations de Hey Baby", "Hey Baby notes", "Observaciones de Hey Baby", "Osservazioni di Hey Baby", "Hey Baby の所見", "Notizen von Hey Baby", "ملاحظات Hey Baby", "Hey Baby 的观察", "Opmerkingen van Hey Baby", "Observações do Hey Baby", "Hey Babys observationer", "Наблюдения Hey Baby", "Obserwacje Hey Baby", "Hey Baby의 관찰") + " (" + nb + ")"),
          h("span", { style: { color: TQ, fontSize: 16, transform: obsOuvert ? "rotate(90deg)" : "none", transition: "transform .2s" } }, "›")),
        obsOuvert ? h("div", { style: { padding: "0 12px 12px" } },
          epingles.slice(0, 6).map(function (e, i) {
            return h("div", { key: "hb" + (e.id || i), role: "button", onClick: function () { setEpingleVue(e); },
              style: { padding: "11px 12px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(6,7,9,0.45)", marginTop: i ? 8 : 0, cursor: "pointer" } },
              h("div", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TQ } }, enClair(String(e.created_at || "").slice(0, 10))),
              h("div", { style: { fontFamily: M, fontSize: 12.5, fontWeight: 700, color: "#EDF2F5", marginTop: 4, lineHeight: 1.35 } }, couper(e.question, 70)),
              h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(220,227,232,0.58)", marginTop: 4, lineHeight: 1.5 } }, couper(e.reponse, 110)));
          }),
          h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#6D7681", lineHeight: 1.55, marginTop: 8 } },
            T("Hey Baby fournit des observations assistées par IA et ne remplace pas l'avis d'un vétérinaire.", "Hey Baby provides AI-assisted observations and does not replace a vet's opinion.", "Hey Baby ofrece observaciones asistidas por IA y no sustituye la opinión de un veterinario.", "Hey Baby fornisce osservazioni assistite dall'IA e non sostituisce il parere di un veterinario.", "Hey Baby は AI による所見であり、獣医師の判断の代わりにはなりません。", "Hey Baby liefert KI-gestützte Beobachtungen und ersetzt keinen Tierarzt.", "يقدم Hey Baby ملاحظات بمساعدة الذكاء الاصطناعي ولا يغني عن رأي الطبيب البيطري.", "Hey Baby 提供由 AI 辅助的观察，不能代替兽医的意见。", "Hey Baby geeft door AI ondersteunde observaties en vervangt het oordeel van een dierenarts niet.", "O Hey Baby oferece observações assistidas por IA e não substitui a opinião de um veterinário.", "Hey Baby ger AI-stödda observationer och ersätter inte en veterinärs bedömning.", "Hey Baby даёт наблюдения с помощью ИИ и не заменяет мнение ветеринара.", "Hey Baby dostarcza obserwacji wspieranych przez AI i nie zastępuje opinii weterynarza.", "Hey Baby는 AI의 도움을 받은 관찰을 제공하며 수의사의 소견을 대신하지 않아요.")) ) : null) : null);
  }
  function blocMagazine() {
    var icoMag = h("svg", { viewBox: "0 0 24 24", style: { width: 22, height: 22, display: "block" } }, h("path", { d: "M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinejoin: "round" }));
    return h("div", { style: { marginBottom: 6 } },
      bandeauSante("bmag", "images/sante-bandeau-magazine.webp", icoMag,
        T("Le magazine santé", "The health magazine", "La revista de salud", "La rivista salute", "健康マガジン", "Das Gesundheitsmagazin", "مجلة الصحة", "健康杂志", "Het gezondheidsmagazine", "A revista de saúde", "Hälsomagasinet", "Журнал о здоровье", "Magazyn o zdrowiu", "건강 매거진"),
        T("Nos articles et conseils", "Our articles and advice", "Nuestros artículos y consejos", "I nostri articoli e consigli", "記事とアドバイス", "Unsere Artikel und Tipps", "مقالاتنا ونصائحنا", "我们的文章与建议", "Onze artikelen en tips", "Nossos artigos e dicas", "Våra artiklar och råd", "Наши статьи и советы", "Nasze artykuły i porady", "기사와 조언"),
        function () { setEcran("sante"); }));
  }
  function panneauEpingle() {
    if (!epingleVue) return null;
    var e = epingleVue;
    var voile = h("div", { onClick: function () { setEpingleVue(null); }, style: { position: "fixed", inset: 0, zIndex: 9400, background: "rgba(4,6,9,0.86)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (ev) { try { ev.stopPropagation(); } catch (e0) { } }, style: { width: "100%", maxWidth: 560, maxHeight: "86vh", overflowY: "auto", WebkitOverflowScrolling: "touch", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.28)", borderBottom: "none", background: "linear-gradient(180deg, rgba(12,18,24,0.99), rgba(7,10,13,1))", padding: "18px 16px calc(env(safe-area-inset-bottom) + 20px)" } },
        h("div", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TQ, textAlign: "center" } },
          T("Observation Hey Baby", "Hey Baby note", "Observaci\u00f3n Hey Baby", "Osservazione Hey Baby", "Hey Baby \u306e\u6240\u898b", "Hey-Baby-Notiz", "\u0645\u0644\u0627\u062d\u0638\u0629 Hey Baby", "Hey Baby 观察", "Opmerking van Hey Baby", "Observação do Hey Baby", "Hey Baby-observation", "Наблюдение Hey Baby", "Obserwacja Hey Baby", "Hey Baby 관찰")),
        h("div", { style: { fontFamily: M, fontSize: 11, color: "#8A99A1", textAlign: "center", marginTop: 4 } }, enClair(String(e.created_at || "").slice(0, 10))),
        h("div", { style: { fontFamily: M, fontSize: 13, fontWeight: 700, color: "#EDF2F5", marginTop: 16, lineHeight: 1.45, whiteSpace: "pre-wrap" } }, String(e.question || "")),
        h("div", { style: { height: 1, background: "rgba(255,255,255,0.08)", margin: "14px 0" } }),
        h("div", { style: { fontFamily: M, fontSize: 13, color: "rgba(226,233,238,0.86)", lineHeight: 1.65, whiteSpace: "pre-wrap" } }, String(e.reponse || "")),
        h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#6D7681", lineHeight: 1.55, marginTop: 16 } },
          T("Hey Baby fournit des observations assist\u00e9es par IA et ne remplace pas l'avis d'un v\u00e9t\u00e9rinaire.", "Hey Baby provides AI-assisted observations and does not replace a vet's opinion.", "Hey Baby ofrece observaciones asistidas por IA y no sustituye la opini\u00f3n de un veterinario.", "Hey Baby fornisce osservazioni assistite dall'IA e non sostituisce il parere di un veterinario.", "Hey Baby \u306e\u6240\u898b\u306f AI \u652f\u63f4\u306b\u3088\u308b\u3082\u306e\u3067\u3042\u308a\u3001\u7363\u533b\u306e\u8a3a\u65ad\u306b\u4ee3\u308b\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Hey Baby liefert KI-gest\u00fctzte Beobachtungen und ersetzt keine tier\u00e4rztliche Beurteilung.", "\u064a\u0642\u062f\u0645 Hey Baby \u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0628\u0645\u0633\u0627\u0639\u062f\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0644\u0627 \u064a\u063a\u0646\u064a \u0639\u0646 \u0631\u0623\u064a \u0627\u0644\u0637\u0628\u064a\u0628 \u0627\u0644\u0628\u064a\u0637\u0631\u064a.", "Hey Baby 提供由 AI 辅助的观察，不能代替兽医的意见。", "Hey Baby geeft door AI ondersteunde observaties en vervangt het oordeel van een dierenarts niet.", "O Hey Baby oferece observações assistidas por IA e não substitui a opinião de um veterinário.", "Hey Baby ger AI-stödda observationer och ersätter inte en veterinärs bedömning.", "Hey Baby даёт наблюдения с помощью ИИ и не заменяет мнение ветеринара.", "Hey Baby dostarcza obserwacji wspieranych przez AI i nie zastępuje opinii weterynarza.", "Hey Baby는 AI의 도움을 받은 관찰을 제공하며 수의사의 소견을 대신하지 않아요.")),
        h("button", { onClick: function () { setEpingleVue(null); }, style: { width: "100%", marginTop: 14, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.20)", background: "transparent", color: "#C9D3D8", fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } },
          T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))));
    return (typeof hypePortailBody === "function") ? hypePortailBody(voile) : voile;
  }

  /* (938) proposer d ajouter un veto / marechal a ses autres chevaux ; (976) la fenetre est desormais FenetreProChevaux
     (chevaux ranges par ecurie, annulation juste apres, et mode « retirer de plusieurs chevaux »). */
  var stPp = React.useState(null); var partagePro = stPp[0], setPartagePro = stPp[1];
  function ouvrirPartagePro(pro) { if (moi && pro && pro.id) setPartagePro({ mode: "ajouter", pro: pro }); }
  function fenetrePartagePro() {
    if (!partagePro) return null;
    return h(FenetreProChevaux, { mode: partagePro.mode, pro: partagePro.pro, moi: moi, chevalId: chId, club: String((fiche && fiche.club) || "").trim(), dejaLies: [],
      onFin: function (change) { setPartagePro(null); if (change) setMaj(maj + 1); } });
  }

  /* (938) Blandine : « on ferme la page comme d habitude avec la fin de page Hype » — copie de finPageCh (fiche cheval) */
  function finPageSante() {
    return h("div", { "aria-hidden": "true", style: { paddingTop: 56 } },
      h("div", { style: { position: "relative", height: 118, overflow: "hidden" } },
        h("img", { src: "images/accueil_v2_fin_de_page_v1.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, #05080B 0%, rgba(5,8,11,0) 12%, rgba(5,8,11,0) 88%, #05080B 100%)" } })),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "6px 24px 0" } },
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "270deg" : "90deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } }),
        h("span", { dir: "ltr", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 13, letterSpacing: 4, paddingInlineStart: 4, color: "#C5AA78" } }, "HYPE"),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "90deg" : "270deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } })));
  }
  /* (940) Bandeau « Consignes du cheval » (maquette validee) : une carte compacte, depliable ; rien d affiche aux autres si vide. */
  var RUB_CONS = [
    { k: "enrenement", t: T("Enrênement", "Training aids", "Riendas auxiliares", "Redini ausiliarie", "補助手綱", "Hilfszügel", "اللجام المساعد", "辅助缰具", "Hulpteugels en hulpmiddelen", "Rédeas auxiliares", "Hjälpmedel vid träning", "Вспомогательные поводья", "Wodze pomocnicze", "보조 고삐"),
      chips: [T("Chambon", "Chambon", "Chambon", "Chambon", "シャンボン", "Chambon", "شامبون", "Chambon 辅助绳", "Chambon", "Chambon", "Chambon", "Шамбон", "Chambon", "샹봉"), T("Gogue", "De Gogue", "Gogue", "Gogue", "ゴーグ", "Gogue", "غوغ", "De Gogue 辅助缰", "Gogue", "Gogue", "De Gogue", "Гог", "Gogue", "고그"), T("Élastiques", "Elastic reins", "Elásticos", "Elastici", "ゴム手綱", "Gummizügel", "أشرطة مطاطية", "弹力缰", "Elastieken", "Elásticos", "Elastiska tyglar", "Резиновые поводья", "Gumy", "고무 고삐"), T("Martingale", "Martingale", "Martingala", "Martingala", "マルチンゲール", "Martingal", "مارتينغال", "马丁格尔", "Martingaal", "Martingale", "Martingal", "Мартингал", "Martingał", "마틴게일"), T("Rênes allemandes", "Draw reins", "Riendas alemanas", "Redini di ritorno", "ドローレイン", "Schlaufzügel", "لجام ألماني", "德式辅助缰", "Duitse hulpteugels", "Rédeas alemãs", "Tyska tyglar", "Немецкие поводья", "Wodze niemieckie", "독일식 고삐"), T("Longe seule", "Lunge only", "Solo a la cuerda", "Solo alla longe", "調馬索のみ", "Nur Longe", "حبل التدريب فقط", "仅长绳", "Alleen longeerlijn", "Só a guia", "Bara longerlina", "Только корда", "Tylko lonża", "론지만")] },
    { k: "materiel", t: T("Matériel particulier", "Specific tack", "Material específico", "Attrezzatura specifica", "専用馬具", "Besondere Ausrüstung", "معدات خاصة", "特殊装备", "Speciaal materiaal", "Equipamento específico", "Särskild utrustning", "Особая амуниция", "Specjalny sprzęt", "특별 장구"),
      chips: [T("Bandes de polo", "Polo wraps", "Vendas de polo", "Fasce da polo", "ポロバンテージ", "Bandagen", "أربطة بولو", "马球绷带", "Polobandages", "Ataduras de polo", "Polobandage", "Бинты", "Owijki polo", "폴로 랩"), T("Guêtres", "Boots", "Protectores", "Paratendini", "ブーツ", "Gamaschen", "واقيات الأرجل", "护腿", "Beenbeschermers", "Botas de proteção", "Benskydd", "Ногавки", "Ochraniacze", "보호대"), T("Cloches", "Bell boots", "Campanas", "Paraglomi", "ベルブーツ", "Springglocken", "أجراس الحوافر", "钟形护蹄", "Klokkenlaarsjes", "Sinos de proteção", "Hovklockor", "Колокола", "Kaloszki", "벨 부츠"), T("Protège-boulets", "Fetlock boots", "Protectores de menudillo", "Paranocche", "フェットロックブーツ", "Streichkappen", "واقيات الرسغ", "球节护具", "Kogelbeschermers", "Protetores de boleto", "Kotskydd", "Путовые ногавки", "Ochraniacze pęcin", "구절 보호대"), T("Bonnet", "Ear bonnet", "Orejeras", "Cuffietta", "イヤーネット", "Fliegenhaube", "غطاء الأذنين", "耳罩", "Oormuts", "Capuz", "Öronhuva", "Чепрак на уши", "Nauszniki", "귀마개"), T("Filet simple", "Snaffle bridle", "Filete simple", "Filetto semplice", "スナフル", "Trense", "لجام بسيط", "单水勒", "Gewone trens", "Filete simples", "Enkel trens", "Простой трензель", "Zwykłe wędzidło", "단순 재갈"), T("Muserolle croisée", "Figure-eight noseband", "Muserola cruzada", "Capezzina incrociata", "フィギュアエイト", "Englisch-kombiniertes Reithalfter", "شكيمة متقاطعة", "交叉鼻带", "Gekruiste neusriem", "Focinheira cruzada", "Korsad nosgrimma", "Перекрёстный нахрапник", "Nachrapnik krzyżowy", "크로스 노즈밴드")] },
    { k: "soins", t: T("Soins spécifiques", "Specific care", "Cuidados específicos", "Cure specifiche", "特別なケア", "Besondere Pflege", "عناية خاصة", "特殊护理", "Speciale verzorging", "Cuidados específicos", "Särskild vård", "Особый уход", "Specjalna pielęgnacja", "특별 케어"),
      chips: [T("Douche des membres", "Hose legs", "Duchar las patas", "Doccia agli arti", "脚のシャワー", "Beine abspritzen", "غسل الأرجل", "冲洗四肢", "Benen douchen", "Banho nos membros", "Spola benen", "Обливание ног", "Polewanie nóg wodą", "다리 샤워"), T("Graisser les pieds", "Hoof oil", "Engrasar los cascos", "Ingrassare gli zoccoli", "蹄油", "Hufe fetten", "تشحيم الحوافر", "给马蹄涂油", "Hoeven invetten", "Passar óleo nos cascos", "Smörja hovarna", "Смазывать копыта", "Smarowanie kopyt", "발굽에 기름 바르기"), T("Argile", "Clay", "Arcilla", "Argilla", "クレイ", "Lehm", "طين", "泥敷", "Klei", "Argila", "Lera", "Глина", "Glinka", "점토"), T("Glace après le travail", "Ice after work", "Hielo tras el trabajo", "Ghiaccio dopo il lavoro", "運動後にアイシング", "Kühlen nach der Arbeit", "ثلج بعد العمل", "工作后冰敷", "IJs na het werk", "Gelo depois do trabalho", "Is efter arbetet", "Лёд после работы", "Lód po pracy", "운동 후 얼음찜질"), T("Couverture", "Rug", "Manta", "Coperta", "馬用ブランケット", "Decke", "غطاء", "封面", "Omslag", "Capa", "Omslag", "Обложка", "Okładka", "커버"), T("Ne pas attacher court", "Do not tie short", "No atar corto", "Non legare corto", "短く繋がない", "Nicht kurz anbinden", "لا يُربط قصيرًا", "不要拴得太短", "Niet kort aanbinden", "Não amarrar curto", "Binda inte kort", "Не привязывать коротко", "Nie wiązać krótko", "짧게 묶지 않기")] }
  ];
  function ouvrirConsEdit() {
    if (!premiumSanteOk()) { setVoilePremium(true); return; }
    var c0 = consignes || {};
    setConsEdit({ enrenement: String(c0.enrenement || ""), materiel: String(c0.materiel || ""), soins: String(c0.soins || ""), busy: false, err: "" });
  }
  async function enregistrerCons() {
    var e = consEdit; if (!e || e.busy) return;
    setConsEdit(Object.assign({}, e, { busy: true, err: "" }));
    try {
      var lig = { cheval_id: chId, enrenement: e.enrenement.trim() || null, materiel: e.materiel.trim() || null, soins: e.soins.trim() || null, updated_at: new Date().toISOString() };
      var r = await supa.from("cheval_consignes").upsert(lig, { onConflict: "cheval_id" }).select();
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(T("La base a refusé l’enregistrement (droits).", "The database refused the save (permissions).", "La base rechazó el guardado (permisos).", "Il database ha rifiutato il salvataggio (permessi).", "保存が拒否されました（権限）。", "Speichern abgelehnt (Rechte).", "رفضت قاعدة البيانات الحفظ (الصلاحيات).", "数据库拒绝了保存（权限）。", "De database heeft het opslaan geweigerd (rechten).", "O banco de dados recusou o salvamento (permissões).", "Databasen nekade att spara (behörighet).", "База отклонила сохранение (права доступа).", "Baza odrzuciła zapis (uprawnienia).", "데이터베이스가 저장을 거부했어요 (권한)."));
      setConsignes(r.data[0]); setConsEdit(null); setConsOuvert(true);
    } catch (eE) { setConsEdit(Object.assign({}, e, { busy: false, err: String((eE && eE.message) || eE) })); }
  }
  function blocConsignes() {
    if (consignes === null) return null;
    var c0 = consignes || {};
    var nb = RUB_CONS.filter(function (r) { return String(c0[r.k] || "").trim(); }).length;
    var rtlC = false; try { rtlC = document.documentElement.dir === "rtl"; } catch (eD) { }
    if (!nb) {
      if (!peutEcrire) return null;
      return h("div", { role: "button", onClick: ouvrirConsEdit, style: { margin: "0 0 30px", padding: "14px 16px", borderRadius: 16, border: "1px dashed rgba(201,166,107,0.5)", background: "rgba(14,26,24,0.3)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" } },
        h("span", { style: { color: TQ, fontSize: 20, lineHeight: 1 } }, "+"),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, color: "#F3EEE4" } }, T("Ajouter ses consignes", "Add instructions", "Añadir sus consignas", "Aggiungi le istruzioni", "注意事項を追加", "Hinweise hinzufügen", "إضافة التعليمات", "添加注意事项", "Zijn/haar instructies toevoegen", "Adicionar as instruções dele", "Lägg till instruktioner", "Добавить указания", "Dodaj jego wskazówki", "지침 추가")),
          h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.6)", marginTop: 2 } }, T("Enrênement, matériel, soins spécifiques", "Training aids, tack, specific care", "Riendas, material, cuidados", "Redini, attrezzatura, cure", "補助手綱・馬具・ケア", "Hilfszügel, Ausrüstung, Pflege", "اللجام، المعدات، العناية", "辅助缰具、装备、特殊护理", "Hulpmiddelen, materiaal, speciale verzorging", "Rédeas auxiliares, equipamento, cuidados específicos", "Hjälpmedel, utrustning, särskild vård", "Вспомогательные поводья, амуниция, особый уход", "Wodze pomocnicze, sprzęt, specjalna pielęgnacja", "보조 고삐, 장구, 특별 케어"))));
    }
    var icoDoc = h("svg", { viewBox: "0 0 24 24", style: { width: 26, height: 26, display: "block" } }, h("path", { d: "M7 3h7l4 4v14H7zM14 3v4h4M9.5 11h6M9.5 14.5h6M9.5 18h4", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }));
    return h("div", { style: { margin: "0 0 30px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.4)", background: "linear-gradient(165deg, rgba(17,27,31,0.7) 0%, rgba(11,18,21,0.6) 100%)", overflow: "hidden" } },
      h("div", { role: "button", onClick: function () { setConsOuvert(!consOuvert); }, style: { position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "16px 16px", cursor: "pointer", overflow: "hidden" } },
        h("img", { src: "images/sante-bandeau-heybaby.webp", alt: "", "aria-hidden": "true", loading: "lazy", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "right center", opacity: 0.55, transform: rtlC ? "scaleX(-1)" : "none", WebkitMaskImage: "linear-gradient(" + (rtlC ? "270deg" : "90deg") + ", transparent 0%, #000 70%)", maskImage: "linear-gradient(" + (rtlC ? "270deg" : "90deg") + ", transparent 0%, #000 70%)", pointerEvents: "none" } }),
        h("span", { style: { position: "relative", flex: "0 0 auto" } }, icoDoc),
        h("div", { style: { position: "relative", flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.15 } }, T("Consignes du cheval", "Horse instructions", "Consignas del caballo", "Istruzioni del cavallo", "馬の注意事項", "Hinweise zum Pferd", "تعليمات الحصان", "马的注意事项", "Instructies voor het paard", "Instruções do cavalo", "Hästens instruktioner", "Указания по лошади", "Wskazówki dla konia", "말의 지침")),
          h("div", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.7)", marginTop: 3 } }, nb + " " + (nb > 1 ? T("consignes renseignées", "instructions filled in", "consignas indicadas", "istruzioni indicate", "件の注意事項", "Hinweise eingetragen", "تعليمات مُدخلة", "条注意事项已填写", "instructies ingevuld", "instruções preenchidas", "ifyllda instruktioner", "указаний заполнено", "uzupełnione wskazówki", "지침 입력됨") : T("consigne renseignée", "instruction filled in", "consigna indicada", "istruzione indicata", "件の注意事項", "Hinweis eingetragen", "تعليمة مُدخلة", "条注意事项已填写", "instructie ingevuld", "instrução preenchida", "ifylld instruktion", "указание заполнено", "uzupełniona wskazówka", "지침 입력됨")))),
        h("span", { "aria-hidden": "true", style: { position: "relative", flex: "0 0 auto", color: TQ, fontSize: 22, lineHeight: 1, transform: consOuvert ? "rotate(90deg)" : "none", transition: "transform .2s" } }, rtlC ? "‹" : "›")),
      consOuvert ? h("div", { style: { padding: "2px 16px 14px" } },
        RUB_CONS.map(function (r, i) {
          var v = String(c0[r.k] || "").trim();
          return h("div", { key: r.k, style: { padding: "11px 0", borderTop: "1px solid rgba(255,255,255,0.06)" } },
            h("div", { style: { fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TQ } }, r.t),
            h("div", { style: { fontFamily: M, fontSize: 13.5, lineHeight: 1.55, color: v ? "#EDE6D8" : "rgba(243,238,228,0.4)", marginTop: 4, whiteSpace: "pre-wrap" } }, v || "—"));
        }),
        peutEcrire ? h("div", { role: "button", onClick: ouvrirConsEdit, style: { display: "inline-flex", alignItems: "center", marginTop: 6, minHeight: 38, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", color: "#E9D9B8", fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, T("Modifier", "Edit", "Modificar", "Modifica", "編集", "Bearbeiten", "تعديل", "修改", "Bewerken", "Editar", "Redigera", "Изменить", "Edytuj", "수정")) : null) : null);
  }
  function fenetreConsignes() {
    var e = consEdit; if (!e) return null;
    function maj(k, v) { setConsEdit(function (o) { var n = Object.assign({}, o); n[k] = v; return n; }); }
    function ajoutChip(k, mot) { setConsEdit(function (o) { var n = Object.assign({}, o); var t = String(n[k] || "").trim(); n[k] = t ? (t.replace(/[\s,]+$/, "") + ", " + mot) : mot; return n; }); }
    var fen = h("div", { "data-noswipe": "true", onClick: function () { if (!e.busy) setConsEdit(null); }, style: { position: "fixed", inset: 0, zIndex: 9600, background: "rgba(4,6,9,0.84)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (eS) { try { eS.stopPropagation(); } catch (e0) { } }, style: { width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", WebkitOverflowScrolling: "touch", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", padding: "20px 16px calc(env(safe-area-inset-bottom) + 18px)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 600, color: "#F3EEE4", textAlign: "center" } }, T("Consignes du cheval", "Horse instructions", "Consignas del caballo", "Istruzioni del cavallo", "馬の注意事項", "Hinweise zum Pferd", "تعليمات الحصان", "马的注意事项", "Instructies voor het paard", "Instruções do cavalo", "Hästens instruktioner", "Указания по лошади", "Wskazówki dla konia", "말의 지침")),
        h("div", { style: { fontFamily: M, fontSize: 11.5, color: "#8A99A1", textAlign: "center", marginTop: 3 } }, nomVu),
        RUB_CONS.map(function (r) {
          return h("div", { key: r.k, style: { marginTop: 16 } },
            h("div", { style: { fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TQ } }, r.t),
            h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, r.chips.map(function (cp) {
              return h("span", { key: cp, role: "button", onClick: function () { ajoutChip(r.k, cp); }, style: { padding: "6px 11px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.4)", color: "#E9D9B8", fontFamily: M, fontSize: 12, cursor: "pointer" } }, "+ " + cp);
            })),
            h("textarea", { value: e[r.k], onChange: function (ev) { maj(r.k, ev.target.value); }, rows: 2, style: { width: "100%", boxSizing: "border-box", marginTop: 8, padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)", color: "#EDF2F5", fontFamily: M, fontSize: 16, lineHeight: 1.45, resize: "vertical" } }));
        }),
        e.err ? h("div", { style: { marginTop: 12, fontFamily: M, fontSize: 12, color: "#F0A05F", lineHeight: 1.5 } }, e.err) : null,
        h("div", { style: { display: "flex", gap: 8, marginTop: 18 } },
          h("button", { type: "button", disabled: e.busy, onClick: function () { setConsEdit(null); }, style: { flex: 1, minHeight: 46, borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", disabled: e.busy, onClick: enregistrerCons, style: { flex: 1, minHeight: 46, borderRadius: 999, border: "1px solid #C9A66B", background: "rgba(201,166,107,0.14)", color: "#C9A66B", fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } }, e.busy ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))));
    return (typeof hypePortailBody === "function") ? hypePortailBody(fen) : fen;
  }

  /* (941) CARNET DE SANTE (maquette validee, etape 6) : lignes compactes (pictogramme, intitule, detail, date, chevron) + filtres
     qui filtrent vraiment : Tous / Soins / Vaccins / Ordonnances / Evenements / Protocoles. Un filtre sans aucune ligne ne s affiche
     pas (Protocoles et Ordonnances viendront avec les documents, etape 7). Toucher une ligne ouvre sa fiche comme avant. */
  var FILTRES_CARNET = [
    { k: "tous", t: T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체"), types: null },
    { k: "soins", t: T("Soins", "Care", "Cuidados", "Cure", "ケア", "Pflege", "العناية", "护理", "Verzorging", "Cuidados", "Vård", "Уход", "Opieka", "케어"), types: ["ferrure", "parage", "vermifuge", "dentiste", "osteopathe", "autre"] },
    { k: "vaccins", t: T("Vaccins", "Vaccines", "Vacunas", "Vaccini", "ワクチン", "Impfungen", "اللقاحات", "疫苗", "Vaccins", "Vacinas", "Vaccin", "Прививки", "Szczepionki", "백신"), types: ["vaccin"] },
    { k: "ordonnances", t: T("Ordonnances", "Prescriptions", "Recetas", "Ricette", "処方箋", "Rezepte", "الوصفات", "处方", "Recepten", "Receitas", "Recept", "Рецепты", "Recepty", "처방전"), types: ["traitement"] },
    { k: "evenements", t: T("Événements", "Events", "Eventos", "Eventi", "出来事", "Ereignisse", "الأحداث", "活动", "Evenementen", "Eventos", "Evenemang", "События", "Wydarzenia", "이벤트"), types: ["veterinaire", "locomotion", "imagerie"] },
    { k: "protocoles", t: T("Protocoles", "Protocols", "Protocolos", "Protocolli", "プロトコル", "Protokolle", "البروتوكولات", "方案", "Protocollen", "Protocolos", "Protokoll", "Протоколы", "Protokoły", "프로토콜"), types: [] }
  ];
  function pictoCarnet(type) {
    var m = { vaccin: "seringue", vermifuge: "pilule", ferrure: "fer", parage: "fer", dentiste: "dent" };
    if (m[type]) return h("span", { style: { display: "block", transform: "scale(0.8)" } }, pictoSuivi(m[type]));
    var p = { fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    var d = type === "traitement" ? "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M12.5 9.5v5"
      : (type === "osteopathe" ? "M6 13c2-4 4-6 7-6s4 2 4 4-2 3-4 3h-2l-3 5M8 11l-2-2"
      : (type === "imagerie" ? "M4 6h16v12H4zM8 10l2 3 2-2 4 4"
      : (type === "autre" ? "M12 5v14M5 12h14" : "M6 3v6a4 4 0 0 0 8 0V3M10 13v3a4 4 0 0 0 8 0v-2M18 14a2 2 0 1 0 0-.1")));
    return h("svg", { viewBox: "0 0 24 24", style: { width: 24, height: 24, display: "block" } }, h("path", Object.assign({ d: d }, p)));
  }
  function ligneCarnet(s, i) {
    var j = s.date_prochaine ? joursAvant(s.date_prochaine) : null;
    var retard = (j !== null && j < 0);
    var rtlL = false; try { rtlL = document.documentElement.dir === "rtl"; } catch (eD) { }
    var detail = s.notes ? String(s.notes).split("\n")[0] : (s.date_prochaine ? T("Prochain", "Next", "Próximo", "Prossimo", "次回", "Nächster", "القادم", "下一次", "Volgende", "Próximo", "Nästa", "Следующий", "Następny", "다음") + " · " + enClairP(s.date_prochaine, s.precision_prochaine) : "");
    var titre = [zoneEnClair(s), s.titre || ""].filter(function (x) { return !!x; }).join(" · ") || libelle(s.type);
    return h("div", { key: "lc" + (s.id || i), onClick: peutEcrire ? function () { setFeuille({ soin: s }); } : null, role: peutEcrire ? "button" : null,
      style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: i ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: peutEcrire ? "pointer" : "default" } },
      h("span", { style: { flex: "0 0 auto", width: 28, display: "flex", justifyContent: "center" } }, pictoCarnet(String(s.type))),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16.5, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, titre),
        h("div", { style: { fontFamily: M, fontSize: 11.5, color: retard ? "#FF6B6B" : "rgba(243,238,228,0.6)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
          (s.titre ? libelle(s.type) + (detail ? " · " : "") : "") + detail + (retard ? " · " + T("en retard", "overdue", "atrasado", "in ritardo", "期限切れ", "überfällig", "متأخر", "已逾期", "te laat", "atrasado", "försenade", "просрочено", "spóźnione", "지남") : ""))),
      h("span", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.75)", fontVariantNumeric: "tabular-nums" } }, s.date_intervention ? dateCourte(s.date_intervention, "jour") : (s.date_prochaine ? dateCourte(s.date_prochaine, s.precision_prochaine) : "")),
      peutEcrire ? h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: TQ, fontSize: 18, lineHeight: 1 } }, rtlL ? "‹" : "›") : null);
  }
  function carnetSante() {
    var l = soins || [];
    var ld = docs || [];   /* (944) documents */
    function docDansFiltre(d, fk) { return fk === "tous" || typeDoc(d.type).f === fk; }
    var cpt = {}; FILTRES_CARNET.forEach(function (f) { cpt[f.k] = (f.types ? l.filter(function (x) { return f.types.indexOf(String(x.type)) >= 0; }).length : l.length) + ld.filter(function (d) { return docDansFiltre(d, f.k); }).length; });
    var fAct = FILTRES_CARNET.filter(function (f) { return f.k === carnetFiltre; })[0] || FILTRES_CARNET[0];
    if (fAct.k !== "tous" && !cpt[fAct.k]) fAct = FILTRES_CARNET[0];
    var vis = fAct.types ? l.filter(function (x) { return fAct.types.indexOf(String(x.type)) >= 0; }) : l;
    var visD = ld.filter(function (d) { return docDansFiltre(d, fAct.k); });
    var lignesM = vis.map(function (x) { return { d: String(x.date_intervention || x.date_prochaine || ""), soin: x }; }).concat(visD.map(function (x) { return { d: String(x.date_doc || x.created_at || ""), doc: x }; }))
      .sort(function (p1, p2) { return p2.d.localeCompare(p1.d); });
    return h("div", { style: { marginBottom: 6 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } },
        h("svg", { viewBox: "0 0 24 24", style: { width: 21, height: 21, display: "block", flexShrink: 0 } }, h("path", { d: "M3.5 6.5h6l2 2h9v11h-17zM12 17.5s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6z", fill: "none", stroke: TQ, strokeWidth: 1.5, strokeLinejoin: "round" })),
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F3EEE4", flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" /* (969) sur une ligne */ } }, T("Carnet de sant\u00e9", "Health record", "Cartilla de salud", "Libretto sanitario", "健康手帳", "Gesundheitsheft", "السجل الصحي", "健康档案", "Gezondheidsboekje", "Caderneta de saúde", "Hälsojournal", "Ветеринарная книжка", "Książeczka zdrowia", "건강 수첩"))),
      h("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 /* (974) air sous le trait */ } }, /* (969) les petits onglets + « Ajouter un document » a droite, sur la meme ligne */
        h("div", { style: { flex: "1 1 auto", minWidth: 0, display: "flex", gap: 20, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 2px" } },   /* 11/10 (974) maquette A choisie par Blandine : onglets SOULIGNES (comme les pages chevaux) */
        FILTRES_CARNET.filter(function (f) { return f.k === "tous" || cpt[f.k] > 0 || !(l.length + ld.length); /* (983) carnet vide : tous les onglets restent visibles */ }).map(function (f) {
          var on = f.k === fAct.k;
          return h("span", { key: f.k, role: "button", onClick: function () { setCarnetFiltre(f.k); }, style: { position: "relative", flex: "0 0 auto", padding: "8px 0 9px", color: on ? "#E9D9B8" : "rgba(243,238,228,0.6)", fontFamily: M, fontSize: 13, fontWeight: on ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap" } },
            f.t, cpt[f.k] ? h("span", { style: { marginInlineStart: 5, fontSize: 11, fontWeight: 500, color: "rgba(201,166,107,0.8)" } }, cpt[f.k]) : null,
            on ? h("span", { "aria-hidden": "true", style: { position: "absolute", left: 0, right: 0, bottom: 0, height: 2, borderRadius: 2, background: "#C9A66B" } }) : null);
        })),
        null /* (972) « + Ajouter un document » quitte la ligne des filtres : il devient la ligne-carte sous les filtres */),
      /* 11/10 (972) maquette validee par Blandine : ligne-carte « Ajouter un document » juste sous les filtres, avant le fil
         (meme largeur et memes coins que la liste, fond petrole sombre transparent, fin liseré champagne, icone document +,
         chevron). Ouvre EXACTEMENT l outil existant (ouvrirDocAjout) ; visible meme sans document ; pour qui peut modifier. */
      peutEcrire ? h("div", { role: "button", tabIndex: 0, onClick: function () { ouvrirDocAjout(); }, style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 8, padding: "12px 14px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(165deg, rgba(17,27,31,0.6) 0%, rgba(11,18,21,0.5) 100%)", cursor: "pointer" } },
        h("span", { style: { flex: "0 0 auto", width: 46, height: 46, borderRadius: "50%", background: "rgba(5,8,11,0.7)", border: "1px solid rgba(201,166,107,0.25)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", style: { width: 24, height: 24, display: "block" } }, h("path", { d: "M7 3h7l4 4v14H7zM14 3v4h4M9.5 12.5h6M9.5 16h4", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }),
            h("circle", { cx: 18, cy: 18, r: 4.3, fill: "#0B1215", stroke: TQ, strokeWidth: 1.3 }), h("path", { d: "M18 16.2v3.6M16.2 18h3.6", stroke: TQ, strokeWidth: 1.4, strokeLinecap: "round" }))),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, color: "#E9D9B8", lineHeight: 1.15 } }, T("Ajouter un document", "Add a document", "A\u00f1adir un documento", "Aggiungi un documento", "\u66f8\u985e\u3092\u8ffd\u52a0", "Dokument hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062a\u0646\u062f", "添加文件", "Een document toevoegen", "Adicionar um documento", "Lägg till ett dokument", "Добавить документ", "Dodaj dokument", "문서 추가")),
          h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.6)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, T("Ordonnances, r\u00e9sultats, analyses\u2026", "Prescriptions, results, tests\u2026", "Recetas, resultados, an\u00e1lisis\u2026", "Ricette, risultati, analisi\u2026", "\u51e6\u65b9\u7b8b\u3001\u7d50\u679c\u3001\u691c\u67fb\u2026", "Rezepte, Ergebnisse, Analysen\u2026", "\u0648\u0635\u0641\u0627\u062a\u060c \u0646\u062a\u0627\u0626\u062c\u060c \u062a\u062d\u0627\u0644\u064a\u0644\u2026", "处方、结果、检查…", "Recepten, uitslagen, onderzoeken…", "Receitas, resultados, exames…", "Recept, resultat, analyser…", "Рецепты, результаты, анализы…", "Recepty, wyniki, badania…", "처방전, 결과, 검사…"))),
        h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: TQ, fontSize: 22, lineHeight: 1 } }, (function () { try { return document.documentElement.dir === "rtl" ? "\u2039" : "\u203a"; } catch (eR) { return "\u203a"; } })())) : null,
      h("div", { style: { borderRadius: 16, border: "1px solid rgba(201,166,107,0.28)", background: "linear-gradient(165deg, rgba(17,27,31,0.6) 0%, rgba(11,18,21,0.5) 100%)", overflow: "hidden" } },
        lignesM.length ? lignesM.map(function (m, i) { return m.doc ? ligneDoc(m.doc, i) : ligneCarnet(m.soin, i); })
          : h("div", { style: { padding: "22px 18px", textAlign: "center", fontFamily: M, fontSize: 13, color: "#8A929C", lineHeight: 1.6 } },   /* (983) carnet vide : le carnet reste affiche (titre, onglets, « Ajouter un document ») avec ce message */
              T("Aucun soin enregistr\u00e9 pour l\u2019instant.", "No care recorded yet.", "A\u00fan no hay cuidados registrados.", "Nessuna cura registrata.", "\u307e\u3060\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002", "Noch keine Eintr\u00e4ge.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0646\u0627\u064a\u0629 \u0645\u0633\u062c\u0644\u0629 \u062d\u0627\u0644\u064a\u0627.", "暂时没有护理记录。", "Nog geen verzorging geregistreerd.", "Nenhum cuidado registrado por enquanto.", "Ingen vård registrerad ännu.", "Пока нет записей об уходе.", "Na razie nie zapisano żadnej opieki.", "아직 기록된 케어가 없어요."))),
      !lignesM.length ? null : h("div", { style: { textAlign: "center", fontSize: 11, color: "#5B646E", fontFamily: M, marginTop: 8 } },
        lignesM.length + " " + (lignesM.length === 1
          ? T("soin", "entry", "cuidado", "cura", "件", "Eintrag", "عناية", "条", "behandeling", "cuidado", "vårdpost", "запись", "zabieg", "케어")
          : T("soins", "entries", "cuidados", "cure", "件", "Einträge", "عنايات", "条", "behandelingen", "cuidados", "vårdposter", "записей", "zabiegi", "케어"))));
  }

  /* (944) Documents : types, filtres du carnet, ajout (photo ou PDF, type, date, soin associe), ouverture par lien temporaire, suppression. */
  var TYPES_DOC = [
    { k: "ordonnance", f: "ordonnances", t: T("Ordonnance", "Prescription", "Receta", "Ricetta", "処方箋", "Rezept", "وصفة طبية", "处方", "Recept", "Receita", "Recept", "Рецепт", "Recepta", "처방전") },
    { k: "compte_rendu", f: "evenements", t: T("Compte rendu", "Report", "Informe", "Referto", "報告書", "Befund", "تقرير", "报告", "Verslag", "Relatório", "Rapport", "Отчёт", "Sprawozdanie", "진료 기록") },
    { k: "certificat_vaccin", f: "vaccins", t: T("Certificat de vaccination", "Vaccination certificate", "Certificado de vacunación", "Certificato di vaccinazione", "ワクチン証明書", "Impfbescheinigung", "شهادة تلقيح", "疫苗接种证明", "Vaccinatiebewijs", "Atestado de vacinação", "Vaccinationsintyg", "Сертификат о вакцинации", "Zaświadczenie o szczepieniu", "백신 접종 증명서") },
    { k: "carnet_vaccin", f: "vaccins", t: T("Page du carnet de vaccination", "Vaccination record page", "Página de la cartilla de vacunas", "Pagina del libretto vaccinale", "ワクチン手帳のページ", "Seite des Impfpasses", "صفحة دفتر التلقيح", "疫苗接种本页面", "Pagina uit het vaccinatieboekje", "Página da caderneta de vacinação", "Sida i vaccinationsboken", "Страница книжки прививок", "Strona książeczki szczepień", "백신 수첩 페이지") },
    { k: "protocole", f: "protocoles", t: T("Protocole (remise au travail…)", "Protocol (return to work…)", "Protocolo (vuelta al trabajo…)", "Protocollo (ripresa del lavoro…)", "プロトコル（運動再開…）", "Protokoll (Wiederaufbau…)", "بروتوكول (العودة للعمل…)", "方案（恢复训练…）", "Protocol (weer aan het werk…)", "Protocolo (retomada do trabalho…)", "Protokoll (återgång till arbete…)", "Протокол (возвращение к работе…)", "Protokół (powrót do pracy…)", "프로토콜 (운동 재개 등)") },
    { k: "facture", f: "soins", t: T("Facture", "Invoice", "Factura", "Fattura", "請求書", "Rechnung", "فاتورة", "发票", "Factuur", "Fatura", "Faktura", "Счёт", "Faktura", "청구서") },
    { k: "autre", f: "soins", t: T("Autre document", "Other document", "Otro documento", "Altro documento", "その他の書類", "Anderes Dokument", "مستند آخر", "其他文件", "Ander document", "Outro documento", "Annat dokument", "Другой документ", "Inny dokument", "기타 문서") }
  ];
  function typeDoc(k) { for (var i = 0; i < TYPES_DOC.length; i++) if (TYPES_DOC[i].k === k) return TYPES_DOC[i]; return TYPES_DOC[TYPES_DOC.length - 1]; }
  function ouvrirDocAjout(typeInit, soinInit) {
    if (!premiumSanteOk()) { setVoilePremium(true); return; }
    var d = new Date(); var iso = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    setDocAjout({ fichier: null, type: typeInit || "ordonnance", titre: "", date: iso, soin: soinInit || "", busy: false, err: "" });
  }
  var MSG_REFUS_DOC = T("La base a refusé l’enregistrement (droits).", "The database refused the save (permissions).", "La base rechazó el guardado (permisos).", "Il database ha rifiutato il salvataggio (permessi).", "保存が拒否されました（権限）。", "Speichern abgelehnt (Rechte).", "رفضت قاعدة البيانات الحفظ (الصلاحيات).", "数据库拒绝了保存（权限）。", "De database heeft het opslaan geweigerd (rechten).", "O banco de dados recusou o salvamento (permissões).", "Databasen nekade att spara (behörighet).", "База отклонила сохранение (права доступа).", "Baza odrzuciła zapis (uprawnienia).", "데이터베이스가 저장을 거부했어요 (권한).");
  async function enregistrerDoc() {
    var a = docAjout; if (!a || a.busy) return;
    if (!a.fichier) { setDocAjout(Object.assign({}, a, { err: T("Choisis d’abord une photo ou un PDF.", "Choose a photo or PDF first.", "Elige primero una foto o un PDF.", "Scegli prima una foto o un PDF.", "写真かPDFを選んでください。", "Wähle zuerst ein Foto oder PDF.", "اختر صورة أو PDF أولًا.", "请先选择一张照片或一个 PDF。", "Kies eerst een foto of een pdf.", "Escolha primeiro uma foto ou um PDF.", "Välj först ett foto eller en PDF.", "Сначала выбери фото или PDF.", "Najpierw wybierz zdjęcie lub plik PDF.", "먼저 사진이나 PDF를 선택해 주세요.") })); return; }
    setDocAjout(Object.assign({}, a, { busy: true, err: "" }));
    try {
      var f = a.fichier;
      if (f.size > 15 * 1024 * 1024) throw new Error(T("Fichier trop lourd (15 Mo au plus).", "File too large (15 MB max).", "Archivo demasiado grande (15 MB máx.).", "File troppo grande (max 15 MB).", "ファイルが大きすぎます（15MBまで）。", "Datei zu groß (max. 15 MB).", "الملف كبير جدًا (15 ميغابايت كحد أقصى).", "文件太大（最大 15 MB）。", "Bestand te groot (maximaal 15 MB).", "Arquivo pesado demais (máximo de 15 MB).", "Filen är för stor (högst 15 MB).", "Файл слишком большой (не больше 15 МБ).", "Plik jest za duży (maksymalnie 15 MB).", "파일이 너무 커요 (최대 15MB)."));
      var ext = (String(f.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (String(f.type).indexOf("pdf") >= 0 ? "pdf" : "jpg");
      var chemin = String(chId) + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
      var up = await supa.storage.from("sante").upload(chemin, f, { contentType: f.type || undefined, upsert: false });
      if (up && up.error) throw up.error;
      var lig = { cheval_id: chId, type: a.type, titre: String(a.titre || "").trim() || null, date_doc: a.date || null, chemin: chemin, mime: f.type || null, taille: f.size || null, soin_id: a.soin || null };
      var r = await supa.from("cheval_documents").insert(lig).select();
      if ((r && r.error) || !r || !r.data || !r.data.length) {
        try { await supa.storage.from("sante").remove([chemin]); } catch (eRm) { }
        throw (r && r.error) || new Error(MSG_REFUS_DOC);
      }
      setDocAjout(null); setDocs(function (o) { return [r.data[0]].concat(o || []); });
    } catch (eE) { setDocAjout(Object.assign({}, a, { busy: false, err: String((eE && eE.message) || eE) })); }
  }
  async function ouvrirDoc(d) {
    try {
      var r = await supa.storage.from("sante").createSignedUrl(d.chemin, 600);
      if (r && r.error) throw r.error;
      var u = r && r.data && (r.data.signedUrl || r.data.signedURL);
      if (u) window.open(u, "_blank");
    } catch (eO) { setDocVu(Object.assign({}, d, { err: String((eO && eO.message) || eO) })); }
  }
  async function supprimerDoc(d) {
    try {
      var r = await supa.from("cheval_documents").delete().eq("id", d.id).select();
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(T("Rien n’a été supprimé (droits).", "Nothing deleted (permissions).", "No se eliminó nada (permisos).", "Nulla eliminato (permessi).", "削除されませんでした（権限）。", "Nichts gelöscht (Rechte).", "لم يُحذف شيء (الصلاحيات).", "没有删除任何内容（权限）。", "Er is niets verwijderd (rechten).", "Nada foi excluído (permissões).", "Inget har tagits bort (behörighet).", "Ничего не удалено (права доступа).", "Nic nie zostało usunięte (uprawnienia).", "아무것도 삭제되지 않았어요 (권한)."));
      try { await supa.storage.from("sante").remove([d.chemin]); } catch (eRm) { }
      setDocVu(null); setDocs(function (o) { return (o || []).filter(function (x) { return x.id !== d.id; }); });
    } catch (eS) { setDocVu(Object.assign({}, d, { err: String((eS && eS.message) || eS) })); }
  }
  function ligneDoc(d, i) {
    var td = typeDoc(d.type);
    var rtlL = false; try { rtlL = document.documentElement.dir === "rtl"; } catch (eD) { }
    var pr = { fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    var soinLie = d.soin_id ? (soins || []).filter(function (x) { return x.id === d.soin_id; })[0] : null;
    return h("div", { key: "ld" + d.id, role: "button", onClick: function () { setDocVu(d); },
      style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: i ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: "pointer" } },
      h("span", { style: { flex: "0 0 auto", width: 28, display: "flex", justifyContent: "center" } }, h("svg", { viewBox: "0 0 24 24", style: { width: 24, height: 24, display: "block" } }, h("path", Object.assign({ d: "M7 3h7l4 4v14H7zM14 3v4h4M9.5 12.5h6M9.5 16h6" }, pr)))),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16.5, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, d.titre || td.t),
        h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(243,238,228,0.6)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, "📎 " + td.t + (soinLie ? " · " + (soinLie.titre || libelle(soinLie.type)) : ""))),
      h("span", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.75)", fontVariantNumeric: "tabular-nums" } }, d.date_doc ? dateCourte(d.date_doc, "jour") : ""),
      h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: TQ, fontSize: 18, lineHeight: 1 } }, rtlL ? "‹" : "›"));
  }
  function fenetreDocs() {
    var a = docAjout, v = docVu, btn = { flex: 1, minHeight: 46, borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontFamily: M, fontSize: 13, cursor: "pointer" };
    var or9 = Object.assign({}, btn, { border: "1px solid #C9A66B", background: "rgba(201,166,107,0.14)", color: "#C9A66B", fontWeight: 700 });
    var lab = function (t, k) { return h("div", { key: k, style: { fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TQ, marginTop: 16 } }, t); };
    var champ = { width: "100%", boxSizing: "border-box", marginTop: 8, padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)", color: "#EDF2F5", fontFamily: M, fontSize: 16 };
    var feuilleBas = function (fermer, contenu) {
      var fen = h("div", { "data-noswipe": "true", onClick: fermer, style: { position: "fixed", inset: 0, zIndex: 9600, background: "rgba(4,6,9,0.84)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
        h("div", { onClick: function (eS) { try { eS.stopPropagation(); } catch (e0) { } }, style: { width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", WebkitOverflowScrolling: "touch", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", padding: "20px 16px calc(env(safe-area-inset-bottom) + 18px)" } }, contenu));
      return (typeof hypePortailBody === "function") ? hypePortailBody(fen) : fen;
    };
    if (a) {
      var soinsOpt = (soins || []).slice(0, 40);
      return feuilleBas(function () { if (!a.busy) setDocAjout(null); }, [
        h("div", { key: "t", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 600, color: "#F3EEE4", textAlign: "center" } }, T("Ajouter un document", "Add a document", "Añadir un documento", "Aggiungi un documento", "書類を追加", "Dokument hinzufügen", "إضافة مستند", "添加文件", "Een document toevoegen", "Adicionar um documento", "Lägg till ett dokument", "Добавить документ", "Dodaj dokument", "문서 추가")),
        h("label", { key: "f", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, minHeight: 52, borderRadius: 14, border: "1px dashed rgba(201,166,107,0.6)", color: "#E9D9B8", fontFamily: M, fontSize: 13.5, cursor: "pointer", padding: "0 12px", textAlign: "center" } },
          h("input", { type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: function (ev) { var fi = ev.target.files && ev.target.files[0]; if (fi) setDocAjout(function (o) { return Object.assign({}, o, { fichier: fi, err: "" }); }); } }),
          a.fichier ? ("✓ " + String(a.fichier.name || "").slice(0, 40)) : ("📷 " + T("Choisir une photo ou un PDF", "Choose a photo or PDF", "Elegir una foto o un PDF", "Scegli una foto o un PDF", "写真かPDFを選ぶ", "Foto oder PDF wählen", "اختر صورة أو PDF", "选择一张照片或一个 PDF", "Kies een foto of een pdf", "Escolher uma foto ou um PDF", "Välj ett foto eller en PDF", "Выбрать фото или PDF", "Wybierz zdjęcie lub plik PDF", "사진이나 PDF 선택"))),
        lab(T("Type", "Type", "Tipo", "Tipo", "種類", "Art", "النوع", "类型", "Type", "Tipo", "Typ", "Тип", "Typ", "유형"), "lt"),
        h("div", { key: "ty", style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, TYPES_DOC.map(function (td) {
          var on = a.type === td.k;
          return h("span", { key: td.k, role: "button", onClick: function () { setDocAjout(function (o) { return Object.assign({}, o, { type: td.k }); }); }, style: { padding: "7px 12px", borderRadius: 999, border: "1px solid " + (on ? "#C9A66B" : "rgba(201,166,107,0.35)"), background: on ? "rgba(201,166,107,0.18)" : "transparent", color: on ? "#E9D9B8" : "rgba(243,238,228,0.75)", fontFamily: M, fontSize: 12, fontWeight: on ? 700 : 500, cursor: "pointer" } }, td.t);
        })),
        lab(T("Intitulé (facultatif)", "Title (optional)", "Título (opcional)", "Titolo (facoltativo)", "タイトル（任意）", "Titel (optional)", "العنوان (اختياري)", "标题（选填）", "Titel (optioneel)", "Título (opcional)", "Rubrik (valfritt)", "Название (необязательно)", "Tytuł (opcjonalnie)", "제목 (선택)"), "li"),
        h("input", { key: "ti", type: "text", value: a.titre, onChange: function (ev) { var v2 = ev.target.value; setDocAjout(function (o) { return Object.assign({}, o, { titre: v2 }); }); }, style: champ }),
        lab(T("Date", "Date", "Fecha", "Data", "日付", "Datum", "التاريخ", "日期", "Datum", "Data", "Datum", "Дата", "Data", "날짜"), "ld"),
        h("input", { key: "da", type: "date", value: a.date, onChange: function (ev) { var v3 = ev.target.value; setDocAjout(function (o) { return Object.assign({}, o, { date: v3 }); }); }, style: champ }),
        soinsOpt.length ? lab(T("Associer à un soin (facultatif)", "Link to a care entry (optional)", "Asociar a un cuidado (opcional)", "Collega a una cura (facoltativo)", "ケアに紐付け（任意）", "Mit Eintrag verknüpfen (optional)", "ربط بعناية (اختياري)", "关联到一条护理记录（选填）", "Koppelen aan een behandeling (optioneel)", "Associar a um cuidado (opcional)", "Koppla till en vårdpost (valfritt)", "Привязать к записи об уходе (необязательно)", "Powiąż z zabiegiem (opcjonalnie)", "케어에 연결 (선택)"), "ls") : null,
        soinsOpt.length ? h("select", { key: "so", value: a.soin, onChange: function (ev) { var v4 = ev.target.value; setDocAjout(function (o) { return Object.assign({}, o, { soin: v4 }); }); }, style: champ },
          [h("option", { key: "0", value: "" }, "—")].concat(soinsOpt.map(function (x) { return h("option", { key: x.id, value: x.id }, libelle(x.type) + (x.titre ? " · " + x.titre : "") + (x.date_intervention ? " · " + dateCourte(x.date_intervention, "jour") : "")); }))) : null,
        a.err ? h("div", { key: "e", style: { marginTop: 12, fontFamily: M, fontSize: 12, color: "#F0A05F", lineHeight: 1.5 } }, a.err) : null,
        h("div", { key: "b", style: { display: "flex", gap: 8, marginTop: 18 } },
          h("button", { type: "button", disabled: a.busy, onClick: function () { setDocAjout(null); }, style: btn }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", disabled: a.busy, onClick: enregistrerDoc, style: or9 }, a.busy ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))]);
    }
    if (v) {
      var tdv = typeDoc(v.type);
      return feuilleBas(function () { setDocVu(null); }, [
        h("div", { key: "t", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 21, fontWeight: 600, color: "#F3EEE4", textAlign: "center" } }, v.titre || tdv.t),
        h("div", { key: "s", style: { fontFamily: M, fontSize: 12, color: "#8A99A1", textAlign: "center", marginTop: 4 } }, tdv.t + (v.date_doc ? " · " + dateCourte(v.date_doc, "jour") : "")),
        v.err ? h("div", { key: "e", style: { marginTop: 12, fontFamily: M, fontSize: 12, color: "#F0A05F", lineHeight: 1.5, textAlign: "center" } }, v.err) : null,
        h("div", { key: "b", style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 18 } },
          h("button", { type: "button", onClick: function () { ouvrirDoc(v); }, style: or9 }, T("Ouvrir le document", "Open the document", "Abrir el documento", "Apri il documento", "書類を開く", "Dokument öffnen", "فتح المستند", "打开文件", "Het document openen", "Abrir o documento", "Öppna dokumentet", "Открыть документ", "Otwórz dokument", "문서 열기")),
          (peutEcrire && !v.confSup) ? h("button", { type: "button", onClick: function () { setDocVu(Object.assign({}, v, { confSup: true })); }, style: Object.assign({}, btn, { color: "#F0A0A0", border: "1px solid rgba(240,120,120,0.4)" }) }, T("Supprimer", "Delete", "Eliminar", "Elimina", "削除", "Löschen", "حذف", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제")) : null,
          (peutEcrire && v.confSup) ? h("button", { type: "button", onClick: function () { supprimerDoc(v); }, style: Object.assign({}, btn, { color: "#FF6B6B", border: "1px solid #FF6B6B", fontWeight: 700 }) }, T("Confirmer la suppression", "Confirm deletion", "Confirmar la eliminación", "Conferma l'eliminazione", "削除を確認", "Löschen bestätigen", "تأكيد الحذف", "确认删除", "Verwijderen bevestigen", "Confirmar a exclusão", "Bekräfta borttagningen", "Подтвердить удаление", "Potwierdź usunięcie", "삭제 확인")) : null,
          h("button", { type: "button", onClick: function () { setDocVu(null); }, style: btn }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))]);
    }
    return null;
  }
  /* (945) « Lire le carnet de vaccination » : photo(s) ou PDF -> liste des injections (date, vaccin, maladies) a verifier,
     puis enregistrement en soins « vaccin » (+ la photo gardee comme document « page du carnet » si coche). */
  var stLc = React.useState(null); var lectCarnet = stLc[0], setLectCarnet = stLc[1];
  function ouvrirLectCarnet() {
    if (!premiumSanteOk()) { setVoilePremium(true); return; }
    setLectCarnet({ etape: "choix", lignes: [], err: "", garder: true, fichier: null, busy: false });
  }
  function aujIso() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  async function lireCarnetFichier(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    try { e.target.value = ""; } catch (eV) { }
    if (!f) return;
    setLectCarnet(function (o) { return Object.assign({}, o, { etape: "lecture", err: "", fichier: f }); });
    try {
      var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
      var imgs = estPdf ? (await hypePdfEnImages(f, 4, 1800)).images : [await hypeImageEnJpeg(f, 1800)];
      var res = await hypeLireCarnetVaccins(imgs, aujIso());
      var deja = {}; (soins || []).forEach(function (x) { if (String(x.type) === "vaccin" && x.date_intervention) deja[String(x.date_intervention).slice(0, 10)] = 1; });
      var lignes = ((res && res.lignes) || []).map(function (l, i) {
        var mal = Array.isArray(l.maladies) ? l.maladies.map(function (x) { return String(x).toLowerCase(); }) : [];
        var d = /^\d{4}-\d{2}-\d{2}$/.test(String(l.date || "")) ? String(l.date) : "";
        return { cle: "l" + i, date: d, vaccin: String(l.vaccin || ""), g: mal.indexOf("grippe") >= 0, r: mal.indexOf("rhino") >= 0, t: mal.indexOf("tetanos") >= 0, texte: String(l.texte || ""), deja: !!(d && deja[d]), coche: !!d && !(d && deja[d]) };
      }).sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
      setLectCarnet(function (o) { return Object.assign({}, o, { etape: "resultat", lignes: lignes }); });
    } catch (eL) { setLectCarnet(function (o) { return Object.assign({}, o, { etape: "choix", err: T("La lecture n’a pas abouti : ", "Reading failed: ", "La lectura falló: ", "Lettura non riuscita: ", "読み取り失敗：", "Lesen fehlgeschlagen: ", "فشلت القراءة: ", "读取未成功：", "Het lezen is mislukt: ", "A leitura não deu certo: ", "Avläsningen lyckades inte: ", "Не удалось прочитать: ", "Nie udało się odczytać: ", "읽기에 실패했어요: ") + String((eL && eL.message) || eL) }); }); }
  }
  function titreVaccin(l) {
    var m = [];
    if (l.g) m.push(T("Grippe", "Flu", "Gripe", "Influenza", "インフルエンザ", "Influenza", "إنفلونزا", "流感", "Griep", "Gripe", "Influensa", "Грипп", "Grypa", "독감"));
    if (l.r) m.push(T("Rhinopneumonie", "Rhinopneumonitis", "Rinoneumonía", "Rinopolmonite", "鼻肺炎", "Rhinopneumonitis", "الرينو", "马鼻肺炎", "Rhinopneumonie", "Rinopneumonite", "Rhinopneumoni", "Ринопневмония", "Rynopneumonia", "리노뉴모니티스"));
    if (l.t) m.push(T("Tétanos", "Tetanus", "Tétanos", "Tetano", "破傷風", "Tetanus", "الكزاز", "破伤风", "Tetanus", "Tétano", "Tetanus", "Столбняк", "Tężec", "파상풍"));
    return (m.join(" + ") + (l.vaccin ? " (" + l.vaccin + ")" : "")).trim() || l.vaccin || T("Vaccin", "Vaccine", "Vacuna", "Vaccino", "ワクチン", "Impfung", "لقاح", "疫苗", "Vaccin", "Vacina", "Vaccin", "Прививка", "Szczepionka", "백신");
  }
  async function enregistrerLectCarnet() {
    var lc = lectCarnet; if (!lc || lc.busy) return;
    var sel = lc.lignes.filter(function (l) { return l.coche && /^\d{4}-\d{2}-\d{2}$/.test(l.date); });
    if (!sel.length && !lc.garder) { setLectCarnet(null); return; }
    setLectCarnet(Object.assign({}, lc, { busy: true, err: "" }));
    var ok = 0, refus = 0, derniere = sel.map(function (l) { return l.date; }).sort().pop();
    for (var i = 0; i < sel.length; i++) {
      var l = sel[i];
      try {
        var lig = { cheval_id: chId, type: "vaccin", titre: titreVaccin(l), date_intervention: l.date, details: { import: "carnet", ligne: l.texte } };
        if (l.date === derniere) lig.date_prochaine = hypeImportProchaine("vaccin", l.date);
        var r = await supa.from("soins_cheval").insert(lig).select("id");
        if (r && !r.error && r.data && r.data.length) ok++; else refus++;
      } catch (eI) { refus++; }
    }
    var docOk = false;
    if (lc.garder && lc.fichier) {
      try {
        var f = lc.fichier, ext = (String(f.name || "").split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
        var chemin = String(chId) + "/" + Date.now() + "-carnet." + ext;
        var up = await supa.storage.from("sante").upload(chemin, f, { contentType: f.type || undefined, upsert: false });
        if (!(up && up.error)) {
          var rd = await supa.from("cheval_documents").insert({ cheval_id: chId, type: "carnet_vaccin", date_doc: aujIso(), chemin: chemin, mime: f.type || null, taille: f.size || null }).select();
          docOk = !!(rd && !rd.error && rd.data && rd.data.length);
          if (!docOk) { try { await supa.storage.from("sante").remove([chemin]); } catch (eRm) { } }
        }
      } catch (eD) { docOk = false; }
    }
    setLectCarnet(Object.assign({}, lc, { busy: false, etape: "bilan", bilan: { ok: ok, refus: refus, doc: docOk } }));
    setMaj(maj + 1);
  }
  function fenetreLectCarnet() {
    var lc = lectCarnet; if (!lc) return null;
    var btn = { flex: 1, minHeight: 46, borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontFamily: M, fontSize: 13, cursor: "pointer" };
    var or9 = Object.assign({}, btn, { border: "1px solid #C9A66B", background: "rgba(201,166,107,0.14)", color: "#C9A66B", fontWeight: 700 });
    function majL(cle, ch) { setLectCarnet(function (o) { return Object.assign({}, o, { lignes: o.lignes.map(function (x) { return x.cle === cle ? Object.assign({}, x, ch) : x; }) }); }); }
    function puce(on, txt, f) { return h("span", { role: "button", onClick: f, style: { padding: "5px 10px", borderRadius: 999, border: "1px solid " + (on ? "#C9A66B" : "rgba(201,166,107,0.3)"), background: on ? "rgba(201,166,107,0.18)" : "transparent", color: on ? "#E9D9B8" : "rgba(243,238,228,0.6)", fontFamily: M, fontSize: 11.5, cursor: "pointer" } }, (on ? "✓ " : "") + txt); }
    var contenu;
    if (lc.etape === "lecture") {
      contenu = h("div", { style: { textAlign: "center", padding: "26px 6px" } },
        h("div", { style: { fontSize: 30 } }, "📖"),
        h("div", { style: { fontFamily: M, fontSize: 13.5, color: "#EDE6D8", marginTop: 10 } }, T("Lecture du carnet en cours…", "Reading the record…", "Leyendo la cartilla…", "Lettura del libretto…", "手帳を読み取り中…", "Impfpass wird gelesen…", "جارٍ قراءة الدفتر…", "正在读取疫苗本…", "Het boekje wordt gelezen…", "Lendo a caderneta…", "Läser journalen…", "Читаем книжку…", "Odczytywanie książeczki…", "수첩 읽는 중…")),
        h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(243,238,228,0.55)", marginTop: 6 } }, T("Compte 1 à 2 minutes. Reste sur l’appli.", "Allow 1 to 2 minutes. Stay in the app.", "Cuenta 1 a 2 minutos. Quédate en la app.", "Ci vogliono 1-2 minuti. Resta nell'app.", "1〜2分かかります。アプリを開いたままに。", "Dauert 1 bis 2 Minuten. Bleib in der App.", "يستغرق دقيقة إلى دقيقتين. ابقَ في التطبيق.", "大约需要 1 到 2 分钟，请停留在应用内。", "Reken op 1 tot 2 minuten. Blijf in de app.", "Leva de 1 a 2 minutos. Fique no app.", "Räkna med 1 till 2 minuter. Stanna kvar i appen.", "Это займёт 1–2 минуты. Оставайся в приложении.", "Zajmie to 1–2 minuty. Zostań w aplikacji.", "1~2분 걸려요. 앱에 머물러 주세요.")));
    } else if (lc.etape === "bilan") {
      var b = lc.bilan || {};
      contenu = h("div", { style: { textAlign: "center", padding: "20px 6px" } },
        h("div", { style: { fontFamily: M, fontSize: 14, color: b.refus ? "#F0A05F" : "#8FE3A8", lineHeight: 1.6 } },
          b.ok + T(" vaccin(s) ajouté(s) au carnet", " vaccine(s) added", " vacuna(s) añadida(s)", " vaccino/i aggiunto/i", "件追加", " Impfung(en) hinzugefügt", " لقاح/لقاحات أُضيفت", " 针疫苗已添加到记录", " vaccin(s) toegevoegd aan het boekje", " vacina(s) adicionada(s) à caderneta", " vaccin tillagda i journalen", " прив. добавлено в книжку", " szczepionek dodano do książeczki", "개의 백신을 노트에 추가했어요") + (b.refus ? " · " + b.refus + T(" refusé(s) par la base", " refused by the database", " rechazada(s)", " rifiutato/i", "件拒否", " abgelehnt", " مرفوض", " 个被数据库拒绝", " geweigerd door de database", " recusado(s) pelo banco de dados", " nekades av databasen", " отклонено базой", " odrzucone przez bazę", "건은 데이터베이스가 거부했어요") : "") + (b.doc ? " · " + T("photo gardée dans les documents", "photo kept in documents", "foto guardada en documentos", "foto salvata nei documenti", "写真を書類に保存", "Foto bei den Dokumenten", "حُفظت الصورة في المستندات", "照片已保存在文件中", "foto bewaard in de documenten", "foto guardada nos documentos", "foto sparat bland dokumenten", "фото сохранено в документах", "zdjęcie zachowane w dokumentach", "사진은 문서에 보관했어요") : "")),
        h("div", { style: { display: "flex", marginTop: 16 } }, h("button", { type: "button", onClick: function () { setLectCarnet(null); }, style: or9 }, "✓ " + T("Terminé", "Done", "Hecho", "Fatto", "完了", "Fertig", "تم", "已完成", "Beëindigd", "Encerrado", "Avslutad", "Завершено", "Zakończono", "완료"))));
    } else if (lc.etape === "resultat") {
      contenu = h("div", null,
        h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.65)", lineHeight: 1.5, marginTop: 4, textAlign: "center" } }, lc.lignes.length
          ? T("Vérifie chaque ligne avant d’enregistrer. Les dates déjà dans le carnet sont décochées.", "Check each line before saving. Dates already recorded are unticked.", "Revisa cada línea antes de guardar.", "Controlla ogni riga prima di salvare.", "保存前に各行を確認してください。", "Prüfe jede Zeile vor dem Speichern.", "تحقق من كل سطر قبل الحفظ.", "保存前请检查每一行。记录中已有的日期默认不勾选。", "Controleer elke regel voordat je opslaat. Data die al in het boekje staan, zijn niet aangevinkt.", "Confira cada linha antes de salvar. As datas que já estão na caderneta vêm desmarcadas.", "Kontrollera varje rad innan du sparar. Datum som redan finns i journalen är avmarkerade.", "Проверь каждую строку перед сохранением. Даты, которые уже есть в книжке, не отмечены.", "Sprawdź każdą linijkę przed zapisaniem. Daty, które już są w książeczce, są odznaczone.", "저장하기 전에 각 줄을 확인해 주세요. 노트에 이미 있는 날짜는 체크가 해제돼 있어요.")
          : T("Aucune injection lue sur ce document.", "No injection read on this document.", "No se leyó ninguna inyección.", "Nessuna iniezione letta.", "接種は読み取れませんでした。", "Keine Impfung gelesen.", "لم تُقرأ أي حقنة.", "这份文件上没有读到注射记录。", "Geen injectie gelezen op dit document.", "Nenhuma aplicação lida neste documento.", "Ingen vaccination hittades i det här dokumentet.", "В этом документе не найдено ни одной прививки.", "Nie odczytano żadnego szczepienia z tego dokumentu.", "이 문서에서 읽은 접종 기록이 없어요.")),
        lc.lignes.map(function (l) {
          return h("div", { key: l.cle, style: { marginTop: 10, padding: "11px 12px", borderRadius: 14, border: "1px solid " + (l.coche ? "rgba(201,166,107,0.5)" : "rgba(255,255,255,0.1)"), background: "rgba(255,255,255,0.03)", opacity: l.coche ? 1 : 0.7 } },
            h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
              h("span", { role: "button", onClick: function () { majL(l.cle, { coche: !l.coche }); }, style: { width: 22, height: 22, flex: "0 0 auto", borderRadius: 6, border: "1.5px solid " + (l.coche ? "#C9A66B" : "rgba(201,166,107,0.45)"), background: l.coche ? "rgba(201,166,107,0.2)" : "transparent", color: "#C9A66B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" } }, l.coche ? "✓" : ""),
              h("input", { type: "date", value: l.date, onChange: function (ev) { majL(l.cle, { date: ev.target.value }); }, style: { flex: 1, minWidth: 0, padding: "8px 10px", borderRadius: 10, border: "1px solid " + (l.date ? "rgba(255,255,255,0.14)" : "#FF6B6B"), background: "rgba(255,255,255,0.04)", color: "#EDF2F5", fontFamily: M, fontSize: 16 } })),
            h("input", { type: "text", value: l.vaccin, placeholder: T("Nom du vaccin", "Vaccine name", "Nombre de la vacuna", "Nome del vaccino", "ワクチン名", "Impfstoff", "اسم اللقاح", "疫苗名称", "Naam van het vaccin", "Nome da vacina", "Vaccinets namn", "Название прививки", "Nazwa szczepionki", "백신 이름"), onChange: function (ev) { majL(l.cle, { vaccin: ev.target.value }); }, style: { width: "100%", boxSizing: "border-box", marginTop: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)", color: "#EDF2F5", fontFamily: M, fontSize: 16 } }),
            h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } },
              puce(l.g, T("Grippe", "Flu", "Gripe", "Influenza", "インフルエンザ", "Influenza", "إنفلونزا", "流感", "Griep", "Gripe", "Influensa", "Грипп", "Grypa", "독감"), function () { majL(l.cle, { g: !l.g }); }),
              puce(l.r, T("Rhino", "EHV", "Rino", "Rino", "鼻肺炎", "Rhino", "الرينو", "马疱疹", "Rhino", "Rinopneumonite", "Rhino", "Ринопневмония", "Herpes", "리노"), function () { majL(l.cle, { r: !l.r }); }),
              puce(l.t, T("Tétanos", "Tetanus", "Tétanos", "Tetano", "破傷風", "Tetanus", "الكزاز", "破伤风", "Tetanus", "Tétano", "Tetanus", "Столбняк", "Tężec", "파상풍"), function () { majL(l.cle, { t: !l.t }); })),
            l.deja ? h("div", { style: { fontFamily: M, fontSize: 11, color: "#E8C887", marginTop: 6 } }, T("Déjà un vaccin à cette date dans le carnet.", "Already a vaccine on this date.", "Ya hay una vacuna en esta fecha.", "Già un vaccino in questa data.", "この日付には既に記録があります。", "An diesem Datum schon erfasst.", "يوجد لقاح بهذا التاريخ.", "记录中这个日期已有一针疫苗。", "Er staat al een vaccin op deze datum.", "Já há uma vacina nesta data.", "Det finns redan ett vaccin med det här datumet i journalen.", "На эту дату в книжке уже есть прививка.", "W tym dniu w książeczce jest już szczepionka.", "이 날짜에 이미 노트에 백신이 있어요.")) : null);
        }),
        h("div", { role: "button", onClick: function () { setLectCarnet(function (o) { return Object.assign({}, o, { garder: !o.garder }); }); }, style: { display: "flex", alignItems: "center", gap: 10, marginTop: 14, cursor: "pointer" } },
          h("span", { style: { width: 22, height: 22, borderRadius: 6, border: "1.5px solid #C9A66B", background: lc.garder ? "rgba(201,166,107,0.2)" : "transparent", color: "#C9A66B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 } }, lc.garder ? "✓" : ""),
          h("span", { style: { fontFamily: M, fontSize: 12.5, color: "#EDE6D8" } }, T("Garder la photo dans les documents du carnet", "Keep the photo in the record documents", "Guardar la foto en los documentos", "Salva la foto nei documenti", "写真を書類に保存", "Foto bei den Dokumenten behalten", "احفظ الصورة في المستندات", "把照片保存在记录文件中", "De foto bewaren in de documenten van het boekje", "Guardar a foto nos documentos da caderneta", "Spara fotot bland journalens dokument", "Сохранить фото в документах книжки", "Zachowaj zdjęcie w dokumentach książeczki", "사진을 노트의 문서에 보관하기"))),
        lc.err ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12, color: "#F0A05F" } }, lc.err) : null,
        h("div", { style: { display: "flex", gap: 8, marginTop: 16 } },
          h("button", { type: "button", disabled: lc.busy, onClick: function () { setLectCarnet(null); }, style: btn }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", disabled: lc.busy, onClick: enregistrerLectCarnet, style: or9 }, lc.busy ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))));
    } else {
      contenu = h("div", null,
        h("div", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.7)", lineHeight: 1.55, marginTop: 6, textAlign: "center" } }, T("Prends en photo les pages vaccins du livret (ou un certificat). Hype lit les dates et les vaccins ; tu vérifies avant d’enregistrer.", "Photograph the vaccination pages (or a certificate). Hype reads dates and vaccines; you check before saving.", "Fotografía las páginas de vacunas. Hype lee fechas y vacunas; tú revisas antes de guardar.", "Fotografa le pagine dei vaccini. Hype legge date e vaccini; controlli prima di salvare.", "ワクチンのページを撮影。Hypeが日付とワクチンを読み、保存前に確認できます。", "Fotografiere die Impfseiten. Hype liest Daten und Impfstoffe; du prüfst vor dem Speichern.", "صوّر صفحات اللقاحات. يقرأ Hype التواريخ واللقاحات، وتتحقق قبل الحفظ.", "拍下疫苗本的疫苗页面（或一张证明）。Hype 会读取日期和疫苗；保存前由你来核对。", "Maak een foto van de vaccinatiepagina's van het paspoort (of van een certificaat). Hype leest de data en de vaccins; jij controleert voordat je opslaat.", "Fotografe as páginas de vacinas da caderneta (ou um atestado). O Hype lê as datas e as vacinas; você confere antes de salvar.", "Fotografera vaccinsidorna i vaccinationsboken (eller ett intyg). Hype läser av datum och vaccin, och du kontrollerar innan du sparar.", "Сфотографируй страницы с прививками из паспорта (или сертификат). Hype считывает даты и прививки, а ты проверяешь перед сохранением.", "Zrób zdjęcie stron ze szczepieniami w paszporcie (lub zaświadczenia). Hype odczyta daty i szczepionki, a ty sprawdzasz przed zapisaniem.", "백신 수첩 페이지(또는 증명서)를 사진으로 찍어 주세요. Hype가 날짜와 백신을 읽고, 저장하기 전에 확인할 수 있어요.")),
        h("label", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, minHeight: 52, borderRadius: 14, border: "1px dashed rgba(201,166,107,0.6)", color: "#E9D9B8", fontFamily: M, fontSize: 13.5, cursor: "pointer" } },
          h("input", { type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: lireCarnetFichier }),
          "📷 " + T("Choisir une photo ou un PDF", "Choose a photo or PDF", "Elegir una foto o un PDF", "Scegli una foto o un PDF", "写真かPDFを選ぶ", "Foto oder PDF wählen", "اختر صورة أو PDF", "选择一张照片或一个 PDF", "Kies een foto of een pdf", "Escolher uma foto ou um PDF", "Välj ett foto eller en PDF", "Выбрать фото или PDF", "Wybierz zdjęcie lub plik PDF", "사진이나 PDF 선택")),
        lc.err ? h("div", { style: { marginTop: 12, fontFamily: M, fontSize: 12, color: "#F0A05F", lineHeight: 1.5 } }, lc.err) : null,
        h("div", { style: { display: "flex", marginTop: 16 } }, h("button", { type: "button", onClick: function () { setLectCarnet(null); }, style: btn }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))));
    }
    var fen = h("div", { "data-noswipe": "true", onClick: function () { if (lc.etape !== "lecture" && !lc.busy) setLectCarnet(null); }, style: { position: "fixed", inset: 0, zIndex: 9600, background: "rgba(4,6,9,0.84)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (eS) { try { eS.stopPropagation(); } catch (e0) { } }, style: { width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", WebkitOverflowScrolling: "touch", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", padding: "20px 16px calc(env(safe-area-inset-bottom) + 18px)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 600, color: "#F3EEE4", textAlign: "center" } }, T("Lire le carnet de vaccination", "Read the vaccination record", "Leer la cartilla de vacunación", "Leggi il libretto vaccinale", "ワクチン手帳を読む", "Impfpass lesen", "قراءة دفتر التلقيح", "读取疫苗接种记录", "Het vaccinatieboekje lezen", "Ler a caderneta de vacinação", "Läs vaccinationsboken", "Прочитать книжку прививок", "Odczytaj książeczkę szczepień", "백신 수첩 읽기")),
        contenu));
    return (typeof hypePortailBody === "function") ? hypePortailBody(fen) : fen;
  }
  function boutonLireCarnet() {
    if (!peutEcrire) return null;
    return h("span", { role: "button", onClick: ouvrirLectCarnet, style: { display: "inline-flex", alignItems: "center", gap: 7, marginTop: 12, padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.7)", color: "#E9D9B8", fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, "📷 " + T("Lire le carnet de vaccination", "Read the vaccination record", "Leer la cartilla de vacunación", "Leggi il libretto vaccinale", "ワクチン手帳を読む", "Impfpass lesen", "قراءة دفتر التلقيح", "读取疫苗接种记录", "Het vaccinatieboekje lezen", "Ler a caderneta de vacinação", "Läs vaccinationsboken", "Прочитать книжку прививок", "Odczytaj książeczkę szczepień", "백신 수첩 읽기"));
  }
  /* (943) CONTROLE DU PROTOCOLE VACCINAL (sa demande du 11/10), calcule sur les vaccins deja enregistres. Regles verifiees le 11/10 :
     FFE grippe : 1re -> 2e injection 21 a 92 jours, 1er rappel <= 6 mois, puis <= 12 mois ; FFE rhinopneumonie (Pro depuis 2024,
     Amateur depuis 01/2026) : 21 a 60 jours, 120 a 180 jours, puis annuel ; SHF : grippe + rhino, 2 premieres injections a 21-60 jours,
     plus de 14 mois sans vaccin = disqualification ; FEI : en plus, un rappel de moins de 6 mois + 21 jours avant le concours ;
     partout : aucune injection dans les 7 jours avant un concours. La maladie est lue dans l intitule ou la note du vaccin
     (grippe, influenza, rhino, EHV, herpes, noms de vaccins courants). Un carnet incomplet (moins de 3 injections) est dit tel quel. */
  function maladiesDuVaccin(x) {
    var t = (String(x.titre || "") + " " + String(x.notes || "")).toLowerCase();
    var g = /grippe|influenza|flu|prequenza|proteq|resequin|calvenza|equip\s*f/.test(t);
    var r = /rhino|ehv|herp|pneumequine|duvaxyn|equip\s*ehv/.test(t);
    return { g: g, r: r };
  }
  function analyseMaladie(dates, maxPrimo) {
    var l = dates.slice().sort();
    if (!l.length) return { etat: "aucun" };
    var auj = new Date(); auj.setHours(0, 0, 0, 0);
    function jd(a, b) { return Math.round((jourDe(b).getTime() - jourDe(a).getTime()) / 86400000); }
    var der = l[l.length - 1], depuis = Math.round((auj.getTime() - jourDe(der).getTime()) / 86400000);
    var res = { etat: "ok", dernier: der, depuis: depuis, nb: l.length, incomplet: l.length < 3, sept: depuis < 7 };
    var lim = new Date(jourDe(der).getTime()); 
    if (l.length === 2 && jd(l[0], l[1]) >= 21 && jd(l[0], l[1]) <= maxPrimo) { lim.setMonth(lim.getMonth() + 6); res.motif = "rappel1"; }
    else lim.setFullYear(lim.getFullYear() + 1);
    res.limite = lim;
    if (auj.getTime() > lim.getTime()) res.etat = "retard";
    if (l.length >= 2) { for (var i = 1; i < l.length; i++) { var d = jd(l[i - 1], l[i]); if (i === 1 && l.length <= 3 && (d < 21 || d > maxPrimo) && d < 300) { res.ecart = true; } } }
    res.mois14 = depuis > 426;
    res.fei = depuis <= 202;
    return res;
  }
  function protocoleVaccinal() {
    var vac = (soins || []).filter(function (x) { return String(x.type) === "vaccin" && x.date_intervention; });
    if (!vac.length) {   /* (945) aucun vaccin : seulement l invitation a lire le carnet, pour qui peut modifier */
      if (!peutEcrire) return null;
      return h("div", { style: { marginTop: 0, marginBottom: 14 /* (968) dans la fenetre Vaccin */, padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.2)", background: "linear-gradient(165deg, rgba(17,27,31,0.6) 0%, rgba(11,18,21,0.5) 100%)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, fontWeight: 600, color: "#F3EEE4" } }, T("Protocole vaccinal", "Vaccination protocol", "Protocolo de vacunaci\u00f3n", "Protocollo vaccinale", "\u30ef\u30af\u30c1\u30f3\u63a5\u7a2e\u30d7\u30ed\u30c8\u30b3\u30eb", "Impfprotokoll", "\u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644 \u0627\u0644\u062a\u0644\u0642\u064a\u062d", "疫苗方案", "Vaccinatieprotocol", "Protocolo de vacinação", "Vaccinationsprotokoll", "Протокол вакцинации", "Schemat szczepień", "백신 프로토콜")),
        h("div", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.65)", marginTop: 4, lineHeight: 1.5 } }, T("Aucun vaccin enregistr\u00e9. Lis le carnet pour v\u00e9rifier s\u2019il est \u00e0 jour (FFE, SHF, FEI).", "No vaccine recorded. Read the record to check it is up to date (FFE, SHF, FEI).", "Ninguna vacuna registrada. Lee la cartilla para comprobarla.", "Nessun vaccino registrato. Leggi il libretto per verificarlo.", "\u30ef\u30af\u30c1\u30f3\u306e\u8a18\u9332\u306a\u3057\u3002\u624b\u5e33\u3092\u8aad\u3093\u3067\u78ba\u8a8d\u3002", "Keine Impfung erfasst. Impfpass lesen, um ihn zu pr\u00fcfen.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0644\u0642\u0627\u062d \u0645\u0633\u062c\u0644. \u0627\u0642\u0631\u0623 \u0627\u0644\u062f\u0641\u062a\u0631 \u0644\u0644\u062a\u062d\u0642\u0642.", "没有疫苗记录。读取疫苗本，看看是否已是最新（FFE、SHF、FEI）。", "Geen vaccin geregistreerd. Lees het boekje om te controleren of het up-to-date is (FFE, SHF, FEI).", "Nenhuma vacina registrada. Leia a caderneta para verificar se está em dia (FFE, SHF, FEI).", "Inget vaccin registrerat. Läs boken för att se om den är uppdaterad (FFE, SHF, FEI).", "Нет записей о прививках. Прочитай книжку, чтобы проверить, всё ли в порядке (FFE, SHF, FEI).", "Brak zapisanej szczepionki. Odczytaj książeczkę, aby sprawdzić, czy jest aktualna (FFE, SHF, FEI).", "기록된 백신이 없어요. 수첩을 읽어서 최신 상태인지 확인해 보세요 (FFE, SHF, FEI).")),
        boutonLireCarnet());
    }
    var dg = [], dr = [], inconnus = 0;
    vac.forEach(function (x) { var m = maladiesDuVaccin(x); if (m.g) dg.push(String(x.date_intervention).slice(0, 10)); if (m.r) dr.push(String(x.date_intervention).slice(0, 10)); if (!m.g && !m.r) inconnus++; });
    var G = analyseMaladie(dg, 92), R = analyseMaladie(dr, 60);
    var okG = G.etat === "ok", okR = R.etat === "ok";
    var VERT = "#A9CDB4", ROUGE = "#D9A85C", AMBRE = "#CDBB98";   /* (968) plus discret : plus de rouge vif ; « a faire » en ambre doux, « a jour » vert pale */
    function ligneM(nom, A) {
      var txt, coul;
      if (A.etat === "aucun") { txt = T("aucun vaccin enregistré", "no vaccine recorded", "ninguna vacuna registrada", "nessun vaccino registrato", "記録なし", "keine Impfung erfasst", "لا يوجد لقاح مسجل", "没有疫苗记录", "geen vaccin geregistreerd", "nenhuma vacina registrada", "inget vaccin registrerat", "нет записей о прививках", "brak zapisanej szczepionki", "기록된 백신 없음"); coul = ROUGE; }
      else if (A.etat === "retard") { txt = T("rappel dépassé depuis le ", "booster overdue since ", "refuerzo vencido desde el ", "richiamo scaduto dal ", "追加接種期限切れ：", "Auffrischung überfällig seit ", "الجرعة المعززة متأخرة منذ ", "加强针已逾期，自 ", "herhaling te laat sinds ", "reforço vencido desde ", "boostern är försenad sedan ", "ревакцинация просрочена с ", "przypominające po terminie od ", "추가 접종 기한이 지났어요: ") + (("0" + A.limite.getDate()).slice(-2) + "/" + ("0" + (A.limite.getMonth() + 1)).slice(-2) + "/" + A.limite.getFullYear()); coul = ROUGE; }
      else { txt = T("à jour — prochain rappel avant le ", "up to date — next booster before ", "al día — próximo refuerzo antes del ", "in regola — prossimo richiamo entro il ", "最新 — 次回の追加接種：", "aktuell — nächste Auffrischung vor dem ", "محدّث — الجرعة التالية قبل ", "已是最新——下次加强针须在以下日期前 ", "up-to-date — volgende herhaling vóór ", "em dia — próximo reforço antes de ", "uppdaterad — nästa booster före ", "всё в порядке — следующая ревакцинация до ", "aktualne — kolejne przypominające przed ", "최신 상태 — 다음 추가 접종 기한: ") + (("0" + A.limite.getDate()).slice(-2) + "/" + ("0" + (A.limite.getMonth() + 1)).slice(-2) + "/" + A.limite.getFullYear()); coul = VERT; }
      return h("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "6px 0" } },
        h("span", { style: { width: 6, height: 6, borderRadius: "50%", background: coul, flex: "0 0 auto", transform: "translateY(-1px)" } }),
        h("span", { style: { fontFamily: M, fontSize: 13, fontWeight: 700, color: "#EDE6D8", flex: "0 0 auto" } }, nom),
        h("span", { style: { fontFamily: M, fontSize: 12, color: coul } }, txt));
    }
    function niveau(nom, ok, pourquoi) {
      return h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 999, border: "1px solid " + (ok ? "rgba(169,205,180,0.35)" : "rgba(255,255,255,0.12)"), color: ok ? VERT : "rgba(243,238,228,0.55)", fontFamily: M, fontSize: 11, fontWeight: 500 /* (968) pastilles discretes */ } }, (ok ? "✓ " : "✕ ") + nom + (!ok && pourquoi ? " · " + pourquoi : ""));
    }
    var rhinoManque = T("rhino", "EHV", "rino", "rino", "鼻肺炎", "Rhino", "الرينو", "马疱疹", "rhino", "rinopneumonite", "rhino", "ринопневмония", "herpes", "리노");
    var notes = [];
    if (G.sept || R.sept) notes.push(T("Injection de moins de 7 jours : pas de concours avant le ", "Injection less than 7 days ago: no competition before ", "Inyección de hace menos de 7 días: sin concurso antes del ", "Iniezione di meno di 7 giorni: niente gare prima del ", "接種から7日未満：競技会は次の日以降：", "Impfung vor weniger als 7 Tagen: kein Turnier vor dem ", "حقنة منذ أقل من 7 أيام: لا مسابقات قبل ", "距离上次注射不满 7 天：在此日期前不能参赛 ", "Injectie minder dan 7 dagen geleden: geen wedstrijd vóór ", "Aplicação há menos de 7 dias: sem competição antes de ", "Vaccination för mindre än 7 dagar sedan: ingen tävling före ", "Прививка сделана меньше 7 дней назад: на соревнования нельзя до ", "Szczepienie sprzed mniej niż 7 dni: brak zawodów przed ", "접종한 지 7일 미만이에요. 다음 날짜 전에는 대회에 나갈 수 없어요: ") + (function () { var d = jourDe([G.dernier, R.dernier].filter(Boolean).sort().pop()); d.setDate(d.getDate() + 7); return d.getDate() + " " + MOIS[d.getMonth()]; })() + ".");
    if ((G.nb && G.incomplet) || (R.nb && R.incomplet)) notes.push(T("Carnet incomplet dans Hype (moins de 3 injections) : la primo-vaccination n’est pas visible, le contrôle suppose qu’elle a été faite.", "Incomplete record in Hype (fewer than 3 injections): the primary course is not visible; the check assumes it was done.", "Historial incompleto en Hype (menos de 3 inyecciones): la primovacunación no es visible; se supone hecha.", "Libretto incompleto in Hype (meno di 3 iniezioni): la vaccinazione primaria non è visibile; si presume fatta.", "Hypeの記録が不完全（3回未満）：初回接種は実施済みと仮定。", "Unvollständiger Verlauf in Hype (weniger als 3 Impfungen): Grundimmunisierung nicht sichtbar, wird angenommen.", "سجل غير مكتمل في Hype (أقل من 3 حقن): التلقيح الأولي غير ظاهر ويُفترض أنه تم.", "Hype 中的记录不完整（不足 3 针）：看不到基础免疫，检查默认已经完成。", "Onvolledig boekje in Hype (minder dan 3 injecties): de basisvaccinatie is niet zichtbaar, de controle gaat ervan uit dat die is gedaan.", "Caderneta incompleta no Hype (menos de 3 aplicações): a primovacinação não aparece, e a verificação supõe que ela foi feita.", "Ofullständig journal i Hype (färre än 3 vaccinationer): grundvaccinationen syns inte, kontrollen utgår från att den är gjord.", "Книжка в Hype неполная (меньше 3 прививок): первичная вакцинация не видна, проверка исходит из того, что она была сделана.", "Niekompletna książeczka w Hype (mniej niż 3 szczepienia): pierwsze szczepienie podstawowe nie jest widoczne, kontrola zakłada, że zostało wykonane.", "Hype의 수첩이 불완전해요 (접종 3회 미만). 기초 접종이 보이지 않아서 이미 마쳤다고 가정하고 확인해요."));
    if (G.ecart || R.ecart) notes.push(T("Écart inhabituel entre les deux premières injections : à vérifier avec le vétérinaire.", "Unusual gap between the first two injections: check with the vet.", "Intervalo inusual entre las dos primeras inyecciones: consultar al veterinario.", "Intervallo insolito tra le prime due iniezioni: verificare con il veterinario.", "最初の2回の間隔が通常と異なります：獣医師に確認。", "Ungewöhnlicher Abstand zwischen den ersten beiden Impfungen: mit dem Tierarzt prüfen.", "فاصل غير معتاد بين الحقنتين الأوليين: يُرجى التحقق مع الطبيب.", "前两针的间隔不寻常：请向兽医核实。", "Ongebruikelijke tussentijd tussen de eerste twee injecties: laat het controleren door de dierenarts.", "Intervalo incomum entre as duas primeiras aplicações: confira com o veterinário.", "Ovanligt långt mellanrum mellan de två första vaccinationerna: kontrollera med veterinären.", "Необычный интервал между первыми двумя прививками: проверь с ветеринаром.", "Nietypowy odstęp między dwoma pierwszymi szczepieniami: sprawdź to z weterynarzem.", "첫 두 접종 사이의 간격이 평소와 달라요. 수의사에게 확인해 보세요."));
    if (inconnus) notes.push(inconnus + T(" vaccin(s) sans maladie précisée (grippe ? rhino ?) : ajoute-la dans l’intitulé pour qu’il compte.", " vaccine(s) with no disease named (flu? EHV?): add it to the title so it counts.", " vacuna(s) sin enfermedad indicada (¿gripe? ¿rino?): añádela al título.", " vaccino/i senza malattia indicata (influenza? rino?): aggiungila al titolo.", "件のワクチンに病名がありません：タイトルに追加してください。", " Impfung(en) ohne Krankheit (Influenza? Rhino?): im Titel ergänzen.", " لقاح بدون ذكر المرض (إنفلونزا؟ رينو؟): أضفه إلى العنوان.", " 针疫苗未注明疾病（流感？马疱疹？）：请在标题中补充，才会被计入。", " vaccin(s) zonder genoemde ziekte (griep? rhino?): voeg die toe in de titel zodat het meetelt.", " vacina(s) sem doença especificada (gripe? rinopneumonite?): adicione no título para que ela conte.", " vaccin utan angiven sjukdom (influensa? rhino?): lägg till den i rubriken så att det räknas.", " прив. без указанной болезни (грипп? ринопневмония?): добавь её в название, чтобы прививка учитывалась.", " szczepionek bez podanej choroby (grypa? herpes?): dodaj ją w tytule, żeby się liczyła.", "개의 백신에 질병이 적혀 있지 않아요 (독감? 리노?). 제목에 추가해야 계산에 포함돼요."));
    return h("div", { style: { marginTop: 0, marginBottom: 14 /* (968) dans la fenetre Vaccin */, padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.2)", background: "linear-gradient(165deg, rgba(17,27,31,0.6) 0%, rgba(11,18,21,0.5) 100%)" } },
      h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, fontWeight: 600, color: "#F3EEE4", marginBottom: 6 } }, T("Protocole vaccinal", "Vaccination protocol", "Protocolo de vacunación", "Protocollo vaccinale", "ワクチン接種プロトコル", "Impfprotokoll", "بروتوكول التلقيح", "疫苗方案", "Vaccinatieprotocol", "Protocolo de vacinação", "Vaccinationsprotokoll", "Протокол вакцинации", "Schemat szczepień", "백신 프로토콜")),
      ligneM(T("Grippe", "Flu", "Gripe", "Influenza", "インフルエンザ", "Influenza", "الإنفلونزا", "流感", "Griep", "Gripe", "Influensa", "Грипп", "Grypa", "독감"), G),
      ligneM(T("Rhinopneumonie", "EHV (rhino)", "Rinoneumonía", "Rinopolmonite", "鼻肺炎", "Rhinopneumonitis", "الالتهاب الأنفي الرئوي", "马鼻肺炎", "Rhinopneumonie", "Rinopneumonite", "Rhinopneumoni", "Ринопневмония", "Rynopneumonia", "리노뉴모니티스"), R),
      h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 } },
        niveau(T("Club / Poney", "Club / Pony", "Club / Poni", "Club / Pony", "クラブ/ポニー", "Club / Pony", "نادٍ / مهر", "俱乐部 / 小马", "Manege / Pony", "Clube / Pônei", "Klubb / Ponny", "Клуб / Пони", "Klub / Kucyk", "클럽 / 포니"), okG, null),
        niveau(T("Amateur / Pro", "Amateur / Pro", "Amateur / Pro", "Amateur / Pro", "アマ/プロ", "Amateur / Profi", "هاوٍ / محترف", "业余 / 职业", "Amateur / Prof", "Amador / Profissional", "Amatör / Proffs", "Любитель / Профессионал", "Amator / Zawodowiec", "아마추어 / 프로"), okG && okR, okG ? rhinoManque : null),
        niveau("SHF", okG && okR && !G.mois14 && !R.mois14, okG ? rhinoManque : null),
        niveau("FEI", okG && G.fei, okG ? T("rappel < 6 mois + 21 j", "booster < 6 months + 21 d", "refuerzo < 6 meses + 21 d", "richiamo < 6 mesi + 21 g", "6か月21日以内の追加", "Auffrischung < 6 Mon. + 21 T.", "جرعة < 6 أشهر + 21 يومًا", "加强针 < 6 个月 + 21 天", "herhaling < 6 maanden + 21 d", "reforço < 6 meses + 21 d", "booster < 6 månader + 21 d", "ревакцинация < 6 месяцев + 21 дн.", "przypominające < 6 miesięcy + 21 dni", "추가 접종 6개월 미만 + 21일") : null)),
      notes.map(function (n, i) { return h("div", { key: "n" + i, style: { fontFamily: M, fontSize: 11.5, lineHeight: 1.5, color: AMBRE, marginTop: 8 } }, n); }),
      boutonLireCarnet(),   /* (945) */
      h("div", { style: { fontFamily: M, fontSize: 10.5, lineHeight: 1.5, color: "rgba(243,238,228,0.45)", marginTop: 10 } }, T("D’après les vaccins enregistrés dans Hype et les règlements FFE / SHF / FEI. Ne remplace pas le livret ni l’avis du vétérinaire.", "Based on the vaccines recorded in Hype and FFE / SHF / FEI rules. Does not replace the passport or the vet's advice.", "Según las vacunas registradas en Hype y las normas FFE / SHF / FEI. No sustituye el pasaporte ni al veterinario.", "In base ai vaccini registrati in Hype e alle regole FFE / SHF / FEI. Non sostituisce il libretto né il veterinario.", "Hypeの記録とFFE/SHF/FEIの規則に基づく。手帳や獣医師の判断の代わりにはなりません。", "Nach den in Hype erfassten Impfungen und den Regeln von FFE / SHF / FEI. Ersetzt weder Pass noch Tierarzt.", "حسب اللقاحات المسجلة في Hype وقواعد FFE / SHF / FEI. لا يغني عن الجواز أو رأي الطبيب.", "依据 Hype 中已记录的疫苗以及 FFE / SHF / FEI 的规定。不能代替疫苗本，也不能代替兽医的意见。", "Gebaseerd op de vaccins die in Hype zijn geregistreerd en de reglementen van FFE / SHF / FEI. Vervangt het paspoort en het advies van de dierenarts niet.", "Com base nas vacinas registradas no Hype e nos regulamentos FFE / SHF / FEI. Não substitui a caderneta nem a opinião do veterinário.", "Baserat på vaccinen som registrerats i Hype och FFE:s / SHF:s / FEI:s regler. Ersätter inte hästpasset eller veterinärens råd.", "По прививкам, записанным в Hype, и правилам FFE / SHF / FEI. Не заменяет паспорт и мнение ветеринара.", "Na podstawie szczepionek zapisanych w Hype oraz przepisów FFE / SHF / FEI. Nie zastępuje paszportu ani opinii weterynarza.", "Hype에 기록된 백신과 FFE / SHF / FEI 규정에 따랐어요. 수첩이나 수의사의 소견을 대신하지 않아요.")));
  }
  /* (942) MISE EN PAGE : iPhone = rubriques a la suite (Suivi, Carnet, Equipe, Hey Baby, Magazine).
     Ordinateur (>= 1024 px, maquette validee) : Suivi sur une ligne ; Carnet (gauche, ~62 %) et Equipe (droite) en deux colonnes
     alignees en haut ; bandeaux Hey Baby et Magazine cote a cote, meme hauteur. Memes fonctions, memes donnees. */
  function mepSante(blocCarnet) {
    if (!largeS) return h("div", { style: { padding: "0 16px 30px" } },
      suivi(), null /* (968) protocole vaccinal deplace dans la fenetre « Vaccin » */, blocCarnet,
      h("div", { style: { marginTop: 30 } }, equipeLignes(), blocHeyBaby(), blocMagazine()));
    return h("div", { style: { padding: "0 32px 40px" } },
      suivi(), null /* (968) protocole vaccinal deplace dans la fenetre « Vaccin » */,
      h("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", gap: 24, alignItems: "start" } },
        h("div", { style: { minWidth: 0 } }, blocCarnet),
        h("div", { style: { minWidth: 0 } }, equipeLignes())),
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 30, alignItems: "start" } },
        h("div", { style: { minWidth: 0 } }, blocHeyBaby()),
        h("div", { style: { minWidth: 0 } }, blocMagazine())));
  }
  var corps;
  if (soins === null) {
    corps = h("div", { style: { padding: "40px 20px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#6D7681" } }, "\u2026");
  } else if (!soins.length) {
    var boiteVide =       h("div", { style: { margin: "18px 0 4px", padding: "22px 20px 24px", textAlign: "center", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: "#0B1014", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" } },
      h("div", { style: { fontSize: 30 } }, "\ud83e\ude7a"),
      h("div", { style: { fontFamily: M, fontSize: 13, color: "#8A929C", marginTop: 10, lineHeight: 1.6 } },
        T("Aucun soin enregistr\u00e9 pour l\u2019instant.", "No care recorded yet.", "A\u00fan no hay cuidados registrados.", "Nessuna cura registrata.", "\u307e\u3060\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002", "Noch keine Eintr\u00e4ge.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0646\u0627\u064a\u0629 \u0645\u0633\u062c\u0644\u0629 \u062d\u0627\u0644\u064a\u0627.", "暂时没有护理记录。", "Nog geen verzorging geregistreerd.", "Nenhum cuidado registrado por enquanto.", "Ingen vård registrerad ännu.", "Пока нет записей об уходе.", "Na razie nie zapisano żadnej opieki.", "아직 기록된 케어가 없어요.")));
    corps = mepSante(carnetSante());   /* (983) Blandine : « laisse au moins ecrit Carnet de sante, les onglets et la proposition d en ajouter un » — le carnet (titre, onglets, Ajouter un document, documents deja la) s affiche aussi sans soin ; avant : boiteVide seule */
  } else {
    var titreSec = function (txt) {
      return h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "0 0 11px" } },
        h("div", { style: { fontFamily: C, fontSize: 14, fontWeight: 700, color: "#D9C7A3", letterSpacing: 0.6, textTransform: "uppercase" } }, txt),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(217,199,163,0.35), transparent)" } }));
    };
    corps = mepSante(carnetSante());   /* (942) */
  }

  /* FOND — UN SEUL calque fixe (image + deux voiles dans le meme background) :
     pas de parallaxe, pas d'empilement de couches fixes, Safari iOS prioritaire.
     Le cheval du fond vit a droite, les voiles gardent la colonne de texte lisible. */
  var fond = h("div", {
    "aria-hidden": "true",
    style: {
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", transform: "translateZ(0)", WebkitTransform: "translateZ(0)", willChange: "transform" /* (1003) */, backgroundColor: "#060709",
      backgroundImage: "linear-gradient(180deg, rgba(6,7,9,0.80) 0%, rgba(6,7,9,0.14) 28%, rgba(6,7,9,0.22) 60%, rgba(6,7,9,0.92) 100%), linear-gradient(90deg, rgba(6,7,9,0.90) 0%, rgba(6,7,9,0.52) 48%, rgba(6,7,9,0.24) 100%), url('images/FOND_SANTE.webp')",
      backgroundSize: "cover, cover, cover",
      backgroundPosition: "center, center, center right",
      backgroundRepeat: "no-repeat, no-repeat, no-repeat"
    }
  });

  return h("div", { style: { position: "relative", minHeight: "100vh", background: "radial-gradient(ellipse 130% 420px at 50% 0%, rgba(127,163,173,0.22), rgba(127,163,173,0.07) 55%, transparent 80%) local, #060709" /* (899) lueur de l accueil */, color: "#EDF2F5", paddingBottom: 120 } },
    fond,
    h("div", { style: { position: "relative", zIndex: 1, maxWidth: largeS ? 1240 : "none", margin: "0 auto" } },   /* (942) ordinateur : largeur de lecture confortable */
      /* ---------- EN-TETE CHEVAL : PORTRAIT FONDU DANS LE NOIR ----------
         Demande de Blandine (« la photo en portrait fondu dans le noir, un peu
         comme sur la page de Rizotto »). On reprend EXACTEMENT le principe du
         degrade .hv de l'en-tete de la fiche cheval, mais eteint sur le noir
         #060709 du fond de page : la photo n'a ni cadre ni bord franc, elle se
         dissout dans la page.
         \u26a0 La photo est CADREE ici (object-fit cover, meme cadrage 50% 22% que
         la fiche) : c'est ce qu'impose un bandeau. La regle « photo jamais
         rognee » continue de valoir sur la FICHE, qui elle epouse le format reel.
         Sans photo, l'en-tete redevient compact plutot que de montrer un trou. */
      /* (931) HERO DE LA MAQUETTE VALIDEE (refonte Sante, etape 1) : photo du cheval a droite, degrade sombre vers la gauche,
         « SANTE & SOINS », nom en grand, phrase, bouton « + Ajouter un soin » a contour champagne DANS le hero.
         ~40 px plus haut que la maquette (consigne), plus d air avant la premiere rubrique. Sans photo : meme texte sur le fond de page.
         Arabe : tout est en miroir (photo a gauche, degrade vers la droite). */
      (function () {
        var rtlS = false; try { rtlS = document.documentElement.dir === "rtl"; } catch (eR) { }
        var lgN = String(nomCourt || "").length;
        var tailleNom = (lgN <= 10 ? 40 : (lgN <= 16 ? 34 : (lgN <= 24 ? 29 : 25))) * (largeS ? 1.4 : 1);
        var blocNom = h("div", { style: { minWidth: 0, maxWidth: photoVue ? "50%" : "100%" } },   /* (937) le titre reste sur le cote sombre, jamais sur la tete du cheval */
          h("div", { style: { fontFamily: M, fontSize: 11, fontWeight: 600, letterSpacing: 3.6, textTransform: "uppercase", color: TQ, textShadow: "0 1px 10px rgba(0,0,0,0.7)" } },
            T("Santé & soins", "Health & care", "Salud y cuidados", "Salute e cure", "健康とケア", "Gesundheit & Pflege", "الصحة والعناية", "健康与护理", "Gezondheid & verzorging", "Saúde & cuidados", "Hälsa & vård", "Здоровье и уход", "Zdrowie i opieka", "건강 & 케어")),
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: tailleNom, fontWeight: 600, lineHeight: 1.04, marginTop: 6, color: "#F6F1E7", overflowWrap: "normal", wordBreak: "keep-all", textShadow: "0 2px 18px rgba(0,0,0,0.6)" } }, nomCourt),
          affixe ? h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, color: TQ, marginTop: 2, textShadow: "0 2px 14px rgba(0,0,0,0.6)" } }, affixe) : null,
          montrerOffi ? h("div", { style: { fontFamily: M, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3AB", marginTop: 4 } }, nomOffi) : null,
          null /* (937) phrase et bouton sortis du hero (Blandine) */);
        var retourFlottant = h("button", { key: "ret", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { position: "absolute", zIndex: 3, top: "calc(env(safe-area-inset-top) + 10px)", insetInlineStart: 16, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.75)", background: "rgba(6,7,9,0.35)", color: "#C9A66B", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } }, rtlS ? "›" : "‹");
        if (!photoVue) {
          return h("div", { style: { position: "relative", padding: "calc(env(safe-area-inset-top) + 66px) 20px 4px", marginBottom: 4 } }, retourFlottant, blocNom);
        }
        return h("div", { style: { position: "relative", width: "100%", height: largeS ? 358 : "calc(env(safe-area-inset-top) + 360px)" /* 29/10 : +58 px, photo descendue sous la ligne des boutons comme Histoire / Photos */, overflow: "hidden", marginBottom: 4 } },
          /* fondu par masque (pas de voile noir plein) : la photo se dissout dans le fond de page, sans bord visible en bas */
          h("div", { style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 58px)", bottom: 0, insetInlineEnd: 0, width: largeS ? "68%" : "80%",   /* (937) 62 % ; (941) 80 % + fondu court : la tete du cheval n est plus coupee (Blandine) ; (942) 68 % ordinateur */ WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 90%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 90%, rgba(0,0,0,0) 100%)" } },
            h("img", { src: photoVue, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtlS ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 12%, #000 26%)", maskImage: "linear-gradient(" + (rtlS ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 12%, #000 26%)" } })),
          h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, left: 0, right: 0, height: 90, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,7,9,0.5) 0%, rgba(6,7,9,0) 100%)" } }),
          /* (941) voile seulement derriere le titre (coin bas, cote texte) : le reste de la photo reste net */
          h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 75% 45% at " + (rtlS ? "100%" : "0%") + " 100%, rgba(6,7,9,0.88) 0%, rgba(6,7,9,0.55) 45%, rgba(6,7,9,0) 100%)" } }),
          retourFlottant,
          h("div", { style: { position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, bottom: 0, zIndex: 2, padding: largeS ? "0 32px 26px" : "0 20px 18px" } }, blocNom));
      })(),
      /* (937) Blandine : la petite phrase en italique revient SOUS le titre, a droite (comme avant le 931), puis « + Ajouter un soin » centre en dessous. */
      /* 11/10 (980) Blandine : « ajoute le petit menu qu on a sur les autres pages » — memes onglets que Histoire / Photos /
         Resultats / Videos (meme style, plus transparents depuis le 978), Sante allume. Un onglet ouvre la fiche du cheval
         directement sur la page choisie (window.__hypePanneauReprise, lu une fois a l ouverture de la fiche). */
      (function () {
        var lstS = [["souvenirs", T("Histoire", "Story", "Historia", "Storia", "\u7269\u8a9e", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기")],
          ["photos", T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진")],
          ["palmares", T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")],
          ["videos", T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상")],
          ["sante", T("Sant\u00e9", "Health", "Salud", "Salute", "\u5065\u5eb7", "Gesundheit", "\u0627\u0644\u0635\u062d\u0629", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")]];
        if (!chId) return null;
        /* 12/10 (1062) Blandine (capture 21 h 56) : « aere un peu le haut de cette page, on clique partout sans le vouloir » ->
           onglets plus hauts (zone de toucher 44 px) et plus d espace entre onglets, phrase et cartes. */
        return h("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, margin: largeS ? "34px 32px 6px" : "34px 16px 6px" /* (1062) Blandine 21 h 57 : « descends les premiers onglets et le reste de la page » */, borderBottom: "1px solid rgba(255,255,255,0.05)" } },
          lstS.map(function (tb) {
            var onTb = tb[0] === "sante";
            return h("button", { key: "tbs" + tb[0], type: "button", onClick: function () { if (onTb) return; try { window.__chevalOuvert = chId; window.__hypePanneauReprise = tb[0]; } catch (eTb) { } setEcran("cheval"); }, style: { flex: "0 0 auto", padding: "12px 4px 12px", minHeight: 44, border: "none", borderBottom: "1.5px solid " + (onTb ? "rgba(201,166,107,0.85)" : "transparent"), marginBottom: -1, background: "none", cursor: onTb ? "default" : "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: onTb ? 600 : 500, letterSpacing: "0.02em", color: onTb ? "rgba(217,190,140,0.95)" : "rgba(237,242,245,0.42)", textShadow: "0 1px 8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" } }, tb[1]);
          }));
      })(),
      h("div", { style: { padding: "24px 22px 10px 16px", textAlign: "end", fontFamily: "'Snell Roundhand','Brush Script MT',cursive", fontWeight: 600, fontSize: 19, lineHeight: 1.25, color: "#D2B07A", textShadow: "0 0 14px rgba(201,166,107,0.42)", opacity: 0.92 } },
        T("Prendre soin, c’est déjà aimer.", "Caring is already loving.", "Cuidar ya es querer.", "Prendersi cura è già amare.", "気づかうことは、愛すること。", "Fürsorge ist schon Liebe.", "الاعتناء هو بالفعل حب.", "悉心照料，本身就是爱。", "Zorgen is al houden van.", "Cuidar já é amar.", "Att ta hand om är redan att älska.", "Заботиться — значит уже любить.", "Dbać to już kochać.", "돌본다는 건 이미 사랑하는 거예요.")),
      /* 11/10 (973) Blandine (capture 22 h 21) : « Ajouter un soin, change-le en un onglet similaire a Ajouter ses consignes » —
         le bouton rond devient la meme carte en pointilles que « Ajouter ses consignes » (+, titre Cormorant, sous-titre).
         Meme action (feuille de saisie d un soin), meme verrou Premium. */
      /* 11/10 (980) Blandine : « mets plutot les deux onglets cote a cote, Ajouter un soin et des consignes ». Quand le cheval n a
         encore AUCUNE consigne, les deux cartes en pointilles se partagent la ligne (2 colonnes). Des qu il a des consignes, le bandeau
         « Consignes du cheval » (depliable) reprend toute la largeur sous « Ajouter un soin », comme avant. */
      (function () {
        var consVides = consignes !== null && !RUB_CONS.some(function (r) { return String((consignes || {})[r.k] || "").trim(); });
        var pad = largeS ? "18px 32px 0" : "18px 16px 0";   /* (1062) 12 -> 18 */
        function carteDuo(titre, sous, agir) {
          return h("div", { role: "button", onClick: agir, style: { minWidth: 0, padding: "13px 12px", borderRadius: 16, border: "1px dashed rgba(201,166,107,0.5)", background: "rgba(14,26,24,0.3)", cursor: "pointer" } },
            h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.2 } }, h("span", { style: { color: TQ, marginInlineEnd: 6, fontFamily: M, fontWeight: 400 } }, "+"), titre),
            h("div", { style: { fontFamily: M, fontSize: 10.5, color: "rgba(243,238,228,0.6)", marginTop: 3, lineHeight: 1.35 } }, sous));
        }
        if (peutEcrire && consVides) {
          return h("div", { style: { padding: pad } },
            h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 /* (1062) 10 -> 14 */, margin: "0 0 30px" } },
              carteDuo(T("Ajouter un soin", "Add a care entry", "A\u00f1adir un cuidado", "Aggiungi una cura", "\u30b1\u30a2\u3092\u8ffd\u52a0", "Eintrag hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0631\u0639\u0627\u064a\u0629", "添加护理记录", "Verzorging toevoegen", "Adicionar um cuidado", "Lägg till en vårdpost", "Добавить запись об уходе", "Dodaj zabieg", "케어 추가"),
                T("Vaccin, vermifuge, ferrure, dentiste\u2026", "Vaccine, deworming, shoeing, dentist\u2026", "Vacuna, desparasitaci\u00f3n, herrado, dentista\u2026", "Vaccino, vermifugo, ferratura, dentista\u2026", "\u30ef\u30af\u30c1\u30f3\u3001\u99c6\u866b\u3001\u88c5\u8e44\u3001\u6b6f\u79d1\u2026", "Impfung, Entwurmung, Beschlag, Zahnarzt\u2026", "\u0644\u0642\u0627\u062d\u060c \u062a\u062e\u0644\u064a\u0635 \u0645\u0646 \u0627\u0644\u062f\u064a\u062f\u0627\u0646\u060c \u062a\u0646\u0639\u064a\u0644\u060c \u0637\u0628\u064a\u0628 \u0623\u0633\u0646\u0627\u0646\u2026", "疫苗、驱虫、钉蹄铁、牙医…", "Vaccin, ontwormen, beslag, tandarts…", "Vacina, vermífugo, ferrageamento, dentista…", "Vaccin, avmaskning, skoning, tandläkare…", "Прививка, глистогонное, ковка, стоматолог…", "Szczepionka, odrobaczanie, kucie, dentysta…", "백신, 구충제, 장제, 치과…"),
                function () { setFeuille({ soin: null }); }),
              carteDuo(T("Ses consignes", "Instructions", "Sus consignas", "Le istruzioni", "\u6ce8\u610f\u4e8b\u9805", "Hinweise", "\u062a\u0639\u0644\u064a\u0645\u0627\u062a\u0647", "注意事项", "Zijn/haar instructies", "Instruções dele", "Hans/hennes instruktioner", "Её указания", "Jego wskazówki", "말의 지침"),
                T("Enrênement, matériel, soins spécifiques", "Training aids, tack, specific care", "Riendas, material, cuidados", "Redini, attrezzatura, cure", "補助具、馬具、特別なケア", "Hilfszügel, Ausrüstung, Pflege", "أدوات، معدات، عناية خاصة", "辅助缰具、装备、特殊护理", "Hulpmiddelen, materiaal, speciale verzorging", "Rédeas auxiliares, equipamento, cuidados específicos", "Hjälpmedel, utrustning, särskild vård", "Вспомогательные поводья, амуниция, особый уход", "Wodze pomocnicze, sprzęt, specjalna pielęgnacja", "보조 고삐, 장구, 특별 케어"),
                ouvrirConsEdit)));
        }
        return h(React.Fragment, null,
      peutEcrire ? h("div", { style: { padding: largeS ? "12px 32px 0" : "12px 16px 0" } },
        h("div", { role: "button", onClick: function () { setFeuille({ soin: null }); }, style: { margin: "0 0 14px", padding: "14px 16px", borderRadius: 16, border: "1px dashed rgba(201,166,107,0.5)", background: "rgba(14,26,24,0.3)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" } },
          h("span", { style: { color: TQ, fontSize: 20, lineHeight: 1 } }, "+"),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600, color: "#F3EEE4" } }, T("Ajouter un soin", "Add a care entry", "A\u00f1adir un cuidado", "Aggiungi una cura", "\u30b1\u30a2\u3092\u8ffd\u52a0", "Eintrag hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0627\u064a\u0629", "添加护理记录", "Verzorging toevoegen", "Adicionar um cuidado", "Lägg till en vårdpost", "Добавить запись об уходе", "Dodaj zabieg", "케어 추가")),
            h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.6)", marginTop: 2 } }, T("Vaccin, vermifuge, ferrure, dentiste\u2026", "Vaccine, deworming, shoeing, dentist\u2026", "Vacuna, desparasitaci\u00f3n, herrado, dentista\u2026", "Vaccino, vermifugo, ferratura, dentista\u2026", "\u30ef\u30af\u30c1\u30f3\u3001\u99c6\u866b\u3001\u88c5\u8e44\u3001\u6b6f\u79d1\u2026", "Impfung, Wurmkur, Beschlag, Zahnarzt\u2026", "\u0644\u0642\u0627\u062d\u060c \u0637\u0627\u0631\u062f \u062f\u064a\u062f\u0627\u0646\u060c \u062a\u0646\u0639\u064a\u0644\u060c \u0637\u0628\u064a\u0628 \u0623\u0633\u0646\u0627\u0646\u2026", "疫苗、驱虫、钉蹄铁、牙医…", "Vaccin, ontwormen, beslag, tandarts…", "Vacina, vermífugo, ferrageamento, dentista…", "Vaccin, avmaskning, skoning, tandläkare…", "Прививка, глистогонное, ковка, стоматолог…", "Szczepionka, odrobaczanie, kucie, dentysta…", "백신, 구충제, 장제, 치과…"))))) : h("div", { style: { height: 24 } }),
          h("div", { style: { padding: largeS ? "0 32px" : "0 16px" } }, blocConsignes()));
      })(),   /* (940) consignes avant le SUIVI (maquette) */
      fenetreConsignes(),
      null /* (932) « A surveiller » remplace par SUIVI */,
    err ? h("div", { style: { margin: "0 16px 14px", padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5, lineHeight: 1.5 } },
      T("Les soins n\u2019ont pas pu \u00eatre lus : ", "Care records could not load: ", "No se pudieron cargar los cuidados: ", "Impossibile caricare le cure: ", "\u8a18\u9332\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\uff1a", "Eintr\u00e4ge nicht geladen: ", "\u062a\u0639\u0630\u0631\u062a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u0646\u0627\u064a\u0627\u062a: ", "护理记录无法读取：", "De verzorging kon niet worden geladen: ", "Não foi possível ler os cuidados: ", "Vården kunde inte läsas: ", "Не удалось прочитать записи об уходе: ", "Nie udało się wczytać zabiegów: ", "케어 기록을 불러오지 못했어요: ") + err) : null,
      corps,
      finPageSante()),   /* (938) */
    panneauFamille(),
    panneauEpingle(),
    feuillePro ? h(FeuillePro, {
      chevalId: chId,
      nomCheval: nomVu,
      role: feuillePro.role,
      pro: feuillePro.pro,
      club: (function () { try { var pf = ctx.profil || {}; return String(pf.club || pf.ecurie || "").trim(); } catch (ePf) { return ""; } })(),
      dejaLies: (pros || []).map(function (x) { return String(x.id); }),
      onFermer: function () { setFeuillePro(null); },
      onChange: function (info) { setFeuillePro(null); setMaj(maj + 1); if (info && info.rattache && info.rattache.id) ouvrirPartagePro(info.rattache); }   /* (938) */
      , onRetirerPlusieurs: function (proR) { setFeuillePro(null); if (moi && proR && proR.id) setPartagePro({ mode: "retirer", pro: proR }); }   /* (976) C */
    }) : null,
    fenetrePartagePro(),
    fenetreDocs(),   /* (944) */
    fenetreLectCarnet(),   /* (945) */
    feuille ? h(FeuilleSoin, {
      chevalId: chId,
      nomCheval: nomVu,
      soin: feuille.soin,
      typeInitial: feuille.type || null,
      onFermer: function () { setFeuille(null); },
      onEnregistre: function () { setFeuille(null); setMaj(maj + 1); },
      onExporte: function () { setMaj(maj + 1); }
    }) : null,
    /* (930) fenetre Premium : remplir la page Sante est reserve aux abonnes */
    voilePremium ? (function () {
      var fenP = h("div", { "data-noswipe": "true", onClick: function () { setVoilePremium(false); }, style: { position: "fixed", inset: 0, zIndex: 9600, background: "rgba(4,6,9,0.84)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
        h("div", { onClick: function (eS) { try { eS.stopPropagation(); } catch (e0) { } }, style: { width: "100%", maxWidth: 380, borderRadius: 20, border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", padding: "24px 20px 18px", textAlign: "center" } },
          h("div", { style: { fontSize: 26, marginBottom: 8 } }, "✦"),
          h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 600, color: "#F3EEE4", marginBottom: 8 } }, T("Réservé aux abonnés Premium", "For Premium subscribers", "Reservado a los suscriptores Premium", "Riservato agli abbonati Premium", "プレミアム会員限定", "Nur für Premium-Abonnenten", "مخصّص لمشتركي بريميوم", "仅限 Premium 订阅用户", "Alleen voor Premium-abonnees", "Reservado a assinantes Premium", "Endast för Premium-prenumeranter", "Только для подписчиков Premium", "Tylko dla subskrybentów Premium", "Premium 구독자 전용")),
          h("div", { style: { fontFamily: M, fontSize: 12.5, lineHeight: 1.55, color: "rgba(243,238,228,0.72)", marginBottom: 18 } }, T("Tout le monde peut consulter la page Santé. Ajouter ou modifier des soins, des pros et des informations est réservé aux abonnés.", "Everyone can view the Health page. Adding or editing care, professionals and information is for subscribers.", "Todos pueden ver la página Salud. Añadir o modificar cuidados, profesionales e información está reservado a los suscriptores.", "Tutti possono consultare la pagina Salute. Aggiungere o modificare cure, professionisti e informazioni è riservato agli abbonati.", "健康ページは誰でも見られます。ケア・専門家・情報の追加や編集は会員限定です。", "Alle können die Gesundheitsseite ansehen. Pflege, Fachleute und Infos hinzufügen oder ändern ist Abonnenten vorbehalten.", "يمكن للجميع الاطلاع على صفحة الصحة. إضافة أو تعديل العناية والمختصين والمعلومات مخصّص للمشتركين.", "所有人都可以查看健康页面。添加或修改护理、专业人士和信息仅限订阅用户。", "Iedereen kan de Gezondheidspagina bekijken. Verzorging, professionals en informatie toevoegen of aanpassen is voorbehouden aan abonnees.", "Todo mundo pode ver a página de Saúde. Adicionar ou editar cuidados, profissionais e informações é reservado a assinantes.", "Alla kan se Hälsosidan. Att lägga till eller ändra vård, yrkespersoner och information är förbehållet prenumeranter.", "Страницу «Здоровье» может смотреть каждый. Добавлять и изменять записи об уходе, специалистов и информацию могут только подписчики.", "Każdy może przeglądać stronę Zdrowie. Dodawanie lub edytowanie zabiegów, specjalistów i informacji jest zarezerwowane dla subskrybentów.", "건강 페이지는 누구나 볼 수 있어요. 케어, 전문가, 정보를 추가하거나 수정하는 건 구독자 전용이에요.")),
          h("button", { type: "button", onClick: function () { setVoilePremium(false); setEcran("premium"); }, style: { width: "100%", minHeight: 46, borderRadius: 999, border: "1px solid #C9A66B", background: "rgba(201,166,107,0.16)", color: "#C9A66B", fontFamily: M, fontSize: 13.5, fontWeight: 700, cursor: "pointer" } }, T("Découvrir Premium", "Discover Premium", "Descubrir Premium", "Scopri Premium", "プレミアムを見る", "Premium entdecken", "اكتشفي بريميوم", "了解 Premium", "Ontdek Premium", "Conheça o Premium", "Upptäck Premium", "Узнать о Premium", "Poznaj Premium", "Premium 알아보기")),
          h("button", { type: "button", onClick: function () { setVoilePremium(false); }, style: { width: "100%", marginTop: 8, minHeight: 42, borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "rgba(243,238,228,0.75)", fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, T("Plus tard", "Later", "Más tarde", "Più tardi", "あとで", "Später", "لاحقًا", "以后再说", "Later", "Mais tarde", "Senare", "Позже", "Później", "나중에"))));
      return (typeof hypePortailBody === "function") ? hypePortailBody(fenP) : fenP;
    })() : null);
}
window.HypeSanteCheval = { SanteCheval: EcranSanteCheval };
})();
