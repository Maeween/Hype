/* HYPE ▸ 30/10/2026 — Page MESSAGERIE (EcranMessagerie), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~68 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranMessagerie() {
  var h = React.createElement;
  var ctx = useApp(); var tr = ctx.tr; var lg = ctx.langue || "fr"; var setEcran = ctx.setEcran;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (413) : arabe */

  var stVue = React.useState("liste"); var vue = stVue[0], setVue = stVue[1];
  var stOnglet = React.useState("dm"); var onglet = stOnglet[0], setOnglet = stOnglet[1];
  var stConvs = React.useState([]); var convs = stConvs[0], setConvs = stConvs[1];
  var stChargement = React.useState(true); var chargement = stChargement[0], setChargement = stChargement[1];
  var stConvActive = React.useState(null); var convActive = stConvActive[0], setConvActive = stConvActive[1];
  var stMessages = React.useState([]); var messages = stMessages[0], setMessages = stMessages[1];
  var stSaisie = React.useState(""); var saisie = stSaisie[0], setSaisie = stSaisie[1];
  var stMoi = React.useState(null); var moiId = stMoi[0], setMoiId = stMoi[1];
  var stMenu = React.useState(false); var menuOuvert = stMenu[0], setMenuOuvert = stMenu[1];
  var stConfBloc = React.useState(false); var confBlocage = stConfBloc[0], setConfBlocage = stConfBloc[1];
  var stEnvoi = React.useState(false); var envoiEnCours = stEnvoi[0], setEnvoiEnCours = stEnvoi[1];
  var stNouveau = React.useState(false); var nouveauOuvert = stNouveau[0], setNouveauOuvert = stNouveau[1];
  /* 19/09 (254) — « ÉCRIRE À… ». Blandine, apres avoir tape son message dans la case de
     RECHERCHE : « on comprend meme pas qu on doit aller le chercher ». Cette feuille n a
     qu UN champ, celui du nom, et rien ne le disait. Desormais : un titre qui appelle un
     nom, et la LISTE DE SES CAVALIERES AFFICHEE TOUT DE SUITE (ses ecuries d abord, les
     autres ensuite) - la recherche ne sert plus qu a filtrer une longue liste.
     ⚠️ Aucune requete d ecriture, aucun droit touche : on ne fait que proposer. */
  var stSugg = React.useState(null); var suggestions = stSugg[0], setSuggestions = stSugg[1];
  /* 19/09 (266) : quand la video se termine, sa derniere image S ATTENUE doucement au lieu de
     rester en pleine lumiere. Blandine : « juste apres quand la video se termine ca fait un peu
     charge visuellement ». Le bandeau GARDE sa place (rien ne remonte sous les doigts). */
  var stVidFin = React.useState(false); var vidFinie = stVidFin[0], setVidFinie = stVidFin[1];
  /* 19/09 (255) — SELECTION MULTIPLE : effacer POUR MOI, ou ecrire a plusieurs d un coup.
     Sa demande : « qu on puisse selectionner plusieurs conversations en meme temps pour les
     effacer ou envoyer un message groupe », option A des deux cotes (masquer chez elle
     seulement ; un envoi SEPARE dans chaque conversation privee, pas de groupe).
     ⚠️ RIEN A PASSER EN BASE : la colonne conversations_participants.historique_masque et la
     fonction masquerConversation() existent deja et ne masquent QUE ma propre ligne.
     ⚠️ Chaque envoi et chaque masquage est VERIFIE ; ce qui echoue est recompte et affiche.
     ⚠️ La barre d actions est EN HAUT de la liste (lecon du 226 : la barre du bas cache tout
     ce qu on met en bas). */
  var stModeSel = React.useState(false); var modeSel = stModeSel[0], setModeSel = stModeSel[1];
  var stSel = React.useState({}); var selConv = stSel[0], setSelConv = stSel[1];
  var stEnvGr = React.useState(false); var envoiGroupeOuvert = stEnvGr[0], setEnvoiGroupeOuvert = stEnvGr[1];
  var stTxtGr = React.useState(""); var texteGroupe = stTxtGr[0], setTexteGroupe = stTxtGr[1];
  var stBusyGr = React.useState(false); var busyGroupe = stBusyGr[0], setBusyGroupe = stBusyGr[1];
  var stInfoSel = React.useState(""); var infoSel = stInfoSel[0], setInfoSel = stInfoSel[1];
  function nbSel() { return Object.keys(selConv || {}).filter(function (k) { return selConv[k]; }).length; }
  function basculerSel(id) {
    setInfoSel("");
    setSelConv(function (m) { var n = Object.assign({}, m); if (n[id]) delete n[id]; else n[id] = true; return n; });
  }
  function quitterSelection() { setModeSel(false); setSelConv({}); setInfoSel(""); setEnvoiGroupeOuvert(false); setTexteGroupe(""); }
  async function effacerSelection() {
    var ids = Object.keys(selConv || {}).filter(function (k) { return selConv[k]; });
    if (!ids.length || busyGroupe) return;
    var ok = true;
    try {
      if (window.confirm) ok = window.confirm(T("Effacer " + ids.length + " conversation(s) de TA liste ? L\u2019autre personne garde la sienne.", "Remove " + ids.length + " conversation(s) from YOUR list? The other person keeps theirs.", "\u00bfQuitar " + ids.length + " conversacion(es) de TU lista?", "Rimuovere " + ids.length + " conversazioni dalla TUA lista?", ids.length + "\u4ef6\u3092\u81ea\u5206\u306e\u4e00\u89a7\u304b\u3089\u6d88\u3057\u307e\u3059\u304b\uff1f", ids.length + " Unterhaltung(en) aus DEINER Liste entfernen?", "\u062d\u0630\u0641 " + ids.length + " \u0645\u062d\u0627\u062f\u062b\u0629 (\u0645\u062d\u0627\u062f\u062b\u0627\u062a) \u0645\u0646 \u0642\u0627\u0626\u0645\u062a\u0643\u061f \u064a\u062d\u062a\u0641\u0638 \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0622\u062e\u0631 \u0628\u0642\u0627\u0626\u0645\u062a\u0647.", "从你的列表中清除 " + ids.length + " 个对话？对方的列表不受影响。", "Wil je " + ids.length + " gesprek(ken) van JOUW lijst wissen? De ander houdt zijn of haar eigen lijst.", "Apagar " + ids.length + " conversa(s) da SUA lista? A outra pessoa mantém a dela.", ("Ta bort " + ids.length + " konversation(er) från DIN lista? Den andra personen behåller sin."), ("Удалить диалоги (" + ids.length + ") из ТВОЕГО списка? У собеседника они останутся."), ("Usunąć rozmowy (" + ids.length + ") z TWOJEJ listy? Druga osoba zachowa swoją."), ("내 목록에서 대화 " + ids.length + "개를 삭제할까요? 상대방의 목록에는 그대로 남아요.")));
    } catch (eC) { }
    if (!ok) return;
    setBusyGroupe(true); setInfoSel("");
    var rates = 0;
    for (var i = 0; i < ids.length; i++) {
      try { var r = await masquerConversation(ids[i]); if (r && r.error) rates++; } catch (eM) { rates++; }
    }
    setBusyGroupe(false);
    if (rates) setInfoSel(T("La base a refus\u00e9 ", "The database refused ", "La base rechaz\u00f3 ", "Il database ha rifiutato ", "\u62d2\u5426\uff1a", "Abgelehnt: ", "\u0631\u0641\u0636\u062a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a ", "数据库拒绝了", "De database heeft het geweigerd: ", "O banco de dados recusou ", "Databasen nekade ", "База отклонила ", "Baza odmówiła ", "데이터베이스가 거부했어요: ") + rates + " / " + ids.length + ".");
    else quitterSelection();
    rafraichirListe();
  }
  async function envoyerASelection() {
    var ids = Object.keys(selConv || {}).filter(function (k) { return selConv[k]; });
    var tx = String(texteGroupe || "").trim();
    if (!ids.length || !tx || busyGroupe) return;
    setBusyGroupe(true); setInfoSel("");
    var rates = 0;
    for (var i = 0; i < ids.length; i++) {
      try { var r = await envoyerMessagePrive(ids[i], tx); if (!r || r.error || !r.data) rates++; } catch (eE) { rates++; }
    }
    setBusyGroupe(false);
    if (rates) { setInfoSel(T("Non envoy\u00e9 \u00e0 ", "Not sent to ", "No enviado a ", "Non inviato a ", "\u9001\u4fe1\u3067\u304d\u305a\uff1a", "Nicht gesendet an ", "\u0644\u0645 \u064a\u0631\u0633\u0644 \u0625\u0644\u0649 ", "未发送给 ", "Niet verstuurd naar ", "Não enviado para ", "Ej skickat till ", "Не отправлено: ", "Nie wysłano do ", "전송 실패: ") + rates + " / " + ids.length + "."); return; }
    setTexteGroupe(""); setEnvoiGroupeOuvert(false); quitterSelection(); rafraichirListe();
  }
  React.useEffect(function () {
    if (!nouveauOuvert || suggestions !== null) return;
    var vifS = true;
    (async function () {
      try {
        var u = null; try { u = await utilisateurActuel(); } catch (eU0) { }
        var pf = (ctx && ctx.profil) || {};
        var clubs = [];
        var c1 = String(pf.club || pf.ecurie || "").trim();
        var c2 = String(pf.club2 || pf.ecurie2 || "").trim();
        if (c1) clubs.push(c1);
        if (c2 && c2.toLowerCase() !== c1.toLowerCase()) clubs.push(c2);
        var vus = {}, mien = [], autres = [];
        if (u && u.id) vus[u.id] = true;
        for (var i = 0; i < clubs.length && typeof hypeCavaliersDuClub === "function"; i++) {
          var l = await hypeCavaliersDuClub(clubs[i], "id, pseudo, avatar_url, ecurie, ecurie2");
          ((l) || []).forEach(function (pr) {
            if (!pr || !pr.id || vus[pr.id]) return;
            vus[pr.id] = true; mien.push({ id: pr.id, pseudo: pr.pseudo, avatar_url: pr.avatar_url, club: clubs[i] });
          });
        }
        try {
          var rA = await supa.from("profiles").select("id, pseudo, avatar_url").order("pseudo").limit(60);
          ((rA && rA.data) || []).forEach(function (pr) {
            if (!pr || !pr.id || vus[pr.id] || !pr.pseudo) return;
            vus[pr.id] = true; autres.push(pr);
          });
        } catch (eA2) { }
        if (vifS) setSuggestions({ mien: mien, autres: autres });
      } catch (eS) { if (vifS) setSuggestions({ mien: [], autres: [] }); }
    })();
    return function () { vifS = false; };
  }, [nouveauOuvert]);
  var stRech = React.useState(""); var recherche = stRech[0], setRecherche = stRech[1];
  var stResRech = React.useState([]); var resultatsRech = stResRech[0], setResultatsRech = stResRech[1];
  var stRechEnCours = React.useState(false); var rechEnCours = stRechEnCours[0], setRechEnCours = stRechEnCours[1];
  var stGroupeOuvert = React.useState(false); var groupeOuvert = stGroupeOuvert[0], setGroupeOuvert = stGroupeOuvert[1];
  var stNomGroupe = React.useState(""); var nomGroupe = stNomGroupe[0], setNomGroupe = stNomGroupe[1];
  var stMembresChoisis = React.useState([]); var membresChoisis = stMembresChoisis[0], setMembresChoisis = stMembresChoisis[1];
  var stCreationEnCours = React.useState(false); var creationEnCours = stCreationEnCours[0], setCreationEnCours = stCreationEnCours[1];
  var stProfilsGroupe = React.useState({}); var profilsGroupe = stProfilsGroupe[0], setProfilsGroupe = stProfilsGroupe[1];
  var refFin = React.useRef(null);

  React.useEffect(function () {
    if (!nouveauOuvert && !groupeOuvert) return;
    var q = recherche.trim();
    if (q.length < 2) { setResultatsRech([]); return; }
    setRechEnCours(true);
    var actif = true;
    var t = setTimeout(function () {
      utilisateurActuel().then(function (moi) {
        supa.from("profiles").select("id, pseudo, avatar_url, handle").ilike("pseudo", "%" + q + "%").neq("id", moi ? moi.id : "").limit(20).then(function (r) {
          if (actif) { setResultatsRech((r && r.data) || []); setRechEnCours(false); }
        });
      });
    }, 350);
    return function () { actif = false; clearTimeout(t); };
  }, [recherche, nouveauOuvert, groupeOuvert]);

  function demarrerAvec(p) {
    if (!p || !p.id) return;
    demarrerConversationDM(p.id).then(function (r) {
      if (r && r.error) { alert(r.error); return; }
      if (r && r.data) {
        setNouveauOuvert(false); setRecherche(""); setResultatsRech([]);
        ouvrirConversation({ id: r.data, type: "dm", autreId: p.id, autrePseudo: p.pseudo, autreAvatar: p.avatar_url });
      }
    });
  }

  function rafraichirListe() {
    setChargement(true);
    listerMesConversations().then(function (r) { setConvs(r.data || []); setChargement(false); });
  }

  React.useEffect(function () {
    utilisateurActuel().then(function (u) { setMoiId(u ? u.id : null); });
    rafraichirListe();
    var cibleDirecte = null;
    try { cibleDirecte = window.__conversationOuverte || null; window.__conversationOuverte = null; } catch (e) { }
    if (cibleDirecte) { ouvrirConversation(cibleDirecte); }
  }, []);

  function toggleMembreChoisi(p) {
    setMembresChoisis(function (m) {
      if (m.some(function (x) { return x.id === p.id; })) return m.filter(function (x) { return x.id !== p.id; });
      return m.concat([p]);
    });
  }

  function creerGroupe() {
    if (creationEnCours) return;
    setCreationEnCours(true);
    demarrerGroupe(nomGroupe, membresChoisis.map(function (m) { return m.id; })).then(function (r) {
      setCreationEnCours(false);
      if (r && r.error) { alert(r.error); return; }
      if (r && r.data) {
        var profils = {}; membresChoisis.forEach(function (m) { profils[m.id] = m; });
        setGroupeOuvert(false); setNomGroupe(""); setMembresChoisis([]); setRecherche(""); setResultatsRech([]);
        rafraichirListe();
        ouvrirConversation({ id: r.data, type: "groupe", club: nomGroupe.trim() }, profils);
      }
    });
  }

  function ouvrirConversation(convResume, profilsConnus) {
    var conv = (typeof convResume === "string") ? { id: convResume } : convResume;
    setConvActive(conv);
    setVue("fil");
    try { setEcran("messagerie-fil"); } catch (eSe) { }
    setMessages([]);
    setProfilsGroupe(profilsConnus || {});
    if (conv.type && conv.type !== "dm") {
      supa.from("conversations_participants").select("utilisateur_id").eq("conversation_id", conv.id).then(function (rp) {
        var ids = ((rp && rp.data) || []).map(function (x) { return x.utilisateur_id; });
        if (!ids.length) return;
        supa.from("profiles").select("id, pseudo, avatar_url, handle").in("id", ids).then(function (rpr) {
          var profils = {}; ((rpr && rpr.data) || []).forEach(function (p) { profils[p.id] = p; });
          setProfilsGroupe(function (prev) { return Object.assign({}, prev, profils); });
        });
      });
    }
    chargerMessagesConversation(conv.id).then(function (r) { setMessages(r.data || []); setTimeout(function () { try { refFin.current && refFin.current.scrollIntoView({ block: "end" }); } catch (e) { } }, 60); });
    marquerConversationLue(conv.id).catch(function () { });
  }

  // Abonnement temps réel sur la conversation ouverte
  React.useEffect(function () {
    if (vue !== "fil" || !convActive || typeof supa === "undefined") return;
    var canal = null;
    try {
      canal = supa.channel("msgconv_" + convActive.id).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages_prives", filter: "conversation_id=eq." + convActive.id }, function (payload) {
        setMessages(function (m) { return m.some(function (x) { return x.id === payload.new.id; }) ? m : m.concat([payload.new]); });
        setTimeout(function () { try { refFin.current && refFin.current.scrollIntoView({ block: "end" }); } catch (e) { } }, 60);
      }).subscribe();
    } catch (e) { }
    return function () { try { canal && supa.removeChannel(canal); } catch (e) { } };
  }, [vue, convActive && convActive.id]);

  function envoyer() {
    var texte = saisie.trim();
    if (!texte || !convActive || envoiEnCours) return;
    setEnvoiEnCours(true); setSaisie("");
    envoyerMessagePrive(convActive.id, texte).then(function (r) {
      setEnvoiEnCours(false);
      if (r && !r.error && r.data) {
        setMessages(function (m) { return m.some(function (x) { return x.id === r.data.id; }) ? m : m.concat([r.data]); });
        setTimeout(function () { try { refFin.current && refFin.current.scrollIntoView({ block: "end" }); } catch (e) { } }, 60);
      } else {
        setSaisie(texte);
        alert("Envoi impossible : " + (r && r.error ? r.error : "erreur inconnue"));
      }
    });
  }

  function retourListe() { setVue("liste"); setConvActive(null); setMenuOuvert(false); setConfBlocage(false); try { setEcran("messagerie"); } catch (eSe) { } rafraichirListe(); }

  function confirmerBlocage(masquerHistorique) {
    if (!convActive || !convActive.autreId) return;
    bloquerUtilisateur(convActive.autreId, masquerHistorique, convActive.id).then(function () { retourListe(); });
  }

  function signaler() {
    if (!messages.length) return;
    var dernier = messages[messages.length - 1];
    signalerMessage(dernier.id, "signalement depuis la messagerie").then(function () {
      setMenuOuvert(false);
      alert(T("Signalement envoyé aux modérateurs. Merci.", "Report sent to moderators. Thank you.", "Denuncia enviada a los moderadores. Gracias.", "Segnalazione inviata ai moderatori. Grazie.", "モデレーターに報告しました。ありがとうございます。", "Meldung an die Moderatoren gesendet. Danke.", "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0644\u0627\u063a \u0625\u0644\u0649 \u0627\u0644\u0645\u0634\u0631\u0641\u064a\u0646. \u0634\u0643\u0631\u0627.", "举报已发送给管理员。谢谢。", "Melding verstuurd naar de moderators. Bedankt.", "Denúncia enviada aos moderadores. Obrigado.", "Anmälan skickad till moderatorerna. Tack.", "Жалоба отправлена модераторам. Спасибо.", "Zgłoszenie wysłane do moderatorów. Dziękujemy.", "운영진에게 신고를 보냈어요. 고마워요."));
    });
  }

  var convsFiltrees = convs.filter(function (c) { return onglet === "dm" ? c.type === "dm" : c.type !== "dm"; });

  // ---------- VUE LISTE ----------
  if (vue === "liste") {
    return h("div", { style: { minHeight: "100vh", background: MSG_COL.fond, display: "flex", flexDirection: "column", paddingBottom: 100 } },
      /* 05/08 (choix Blandine) : bandeau video en tete de la messagerie — le poney facteur qui
         apporte la lettre. Version courte de 2 s, coupee avant que le mot MESSAGERIE s incruste
         dans l image, sinon il ferait doublon avec le titre juste dessous.
         La video est en object-fit cover dans un bandeau de 120 px : le format presque carre du
         fichier est donc rogne en haut et en bas, c est assume — le poney reste centre.
         Repli : si le fichier manque, le bandeau disparait entierement (height 0) au lieu de
         laisser un rectangle noir. IntersectionObserver : pause des que le bandeau sort de
         l ecran, pour ne pas cumuler les decodeurs actifs (memoire iOS). */
      /* 19/09 (255) — LE BANDEAU JOUE ENFIN LA VIDEO ENTIERE, ET PLUS HAUT.
         Blandine : « il faut laisser la video tourner en entier, elle s arrete avant meme qu il
         arrive a la boite aux lettres » et « le haut est coupe ».
         TROUVE : le bandeau appelait `hype-messagerie-poney.mp4`, une version COURTE de 2 s
         coupee volontairement le 05/08. La version complete existe deja en ligne, dans sa
         videotheque, sous `images/heybaby-messagerie` (.webm et .mp4) - trouve dans son
         fichier hype-video.js, pas suppose. Rien de plus a pousser.
         SES CHOIX : version complete, bandeau 190 px (au lieu de 120) pour ne plus rogner le
         poney, et ARRET sur la derniere image apres un passage (pas de boucle).
         ⚠️ Si les deux fichiers manquaient, le bandeau disparait (hauteur 0) comme avant. */
      /* 19/09 (261) : LA VIDEO EST MONTREE EN ENTIER. Blandine : « la video est toujours
         coupee en haut, faut franchement la redescendre ». Le bandeau avait une hauteur FIXE
         (190 px) alors que la video fait 560x416 : etiree en pleine largeur elle mesure ~290 px
         de haut, donc la tete du poney passait au-dessus du cadre.
         DESORMAIS : le bandeau prend les proportions EXACTES de la video (aspect-ratio) et la
         video est en `contain` : plus rien n est rogne, ni en haut ni en bas (la boite aux
         lettres reste visible).
         ⚠️ Consequence assumee : le bandeau est plus haut, la liste commence donc plus bas. */
      /* 19/09 (264) : LE BANDEAU DESCEND SOUS L HORLOGE (« il faudrait descendre encore la
         video ») : il commencait a y = 0, donc le haut de l image passait derriere l heure et
         les icones de l iPhone. */
      /* 19/09 (266) : bandeau un peu PLUS PETIT (78 % de la largeur, centre) et de l air en
         dessous avant la liste (son choix C : plus petite + fondu a la fin). */
      /* 19/09 (267) : elle la veut PLUS GRANDE (78 % -> 94 %) et l image finale PLUS VISIBLE
         (0,22 -> 0,6). L air en dessous et le fondu de 2 s restent. */
      h("div", { style: { position: "relative", width: "94%", margin: "calc(env(safe-area-inset-top) + 26px) auto 14px", aspectRatio: "560 / 416", overflow: "hidden", flex: "0 0 auto" } },
        /* 19/09 (259) - LE BANDEAU NE DISPARAIT PLUS JAMAIS, ET REVIENT A LA VIDEO QUI EXISTE.
           Ce qui s est passe : j ai fait pointer le bandeau vers images/heybaby-messagerie.mp4,
           trouve dans sa videotheque (hype-video.js). VERIFIE PAR ELLE EN LIGNE : ce fichier
           renvoie « Page not found » - il est reference mais n a jamais ete pousse. Mon repli
           mettait alors la hauteur a 0 : plus de bandeau, et tout l ecran remontait sous
           l horloge (« c est encore pire »).
           DESORMAIS : source = hype-messagerie-poney.mp4 (celle qui s affiche vraiment chez
           elle), et en cas d echec on CACHE SEULEMENT LA VIDEO, jamais le bandeau : il garde
           ses 190 px et son fond sombre, rien ne bouge a l ecran.
           ⚠️ Ne plus jamais mettre un repli qui modifie la hauteur d un bloc de mise en page.
           ⚠️ La version longue du poney reste a pousser dans images/ si elle la veut. */
        /* 19/09 (264) - LA VRAIE VIDEO LONGUE, ENFIN. Mon script du 260 s est arrete sur une
           erreur AVANT d ecrire : le fichier n a jamais pointe vers images/heybaby-messagerie.mp4,
           et elle jouait donc toujours l ancienne de 2 s. D ou son « la video s arrete avant la
           fin » : c etait la version courte. Verifier le resultat d un script, toujours.
           Repli : si le fichier manque, on retombe sur hype-messagerie-poney.mp4 (2 s, en
           ligne), et si elle manque aussi on cache la video sans toucher au bandeau.
           `preload: auto` + relance unique si iOS coupe la lecture avant la fin. */
        h("video", { src: "images/heybaby-messagerie.mp4", muted: true, loop: false, playsInline: true, autoPlay: true, preload: "auto", "aria-hidden": "true",
          onError: function (eEr) {
            try {
              var el = eEr.target;
              if (!el.__repliFait) { el.__repliFait = 1; el.src = "hype-messagerie-poney.mp4"; try { el.load(); } catch (eL) { } var pr2 = el.play(); if (pr2 && pr2.catch) pr2.catch(function () { }); return; }
              el.style.display = "none";
            } catch (e0) { }
          },
          onEnded: function () { try { setVidFinie(true); } catch (eF) { } },
          ref: function (elM) {
            try {
              if (!elM || elM.__animMsg) return; elM.__animMsg = 1;
              var lireM = function () { try { var pr = elM.play(); if (pr && pr.catch) pr.catch(function () { }); } catch (e1) { } };
              lireM();
              elM.addEventListener("pause", function () { try { if (!elM.ended && !elM.__relance) { elM.__relance = 1; lireM(); } } catch (e2) { } });
            } catch (e3) { }
          },
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", background: "transparent",
            /* 19/09 (266) : fondu de 2 s a la fin, jusqu a une trace discrete (0,22), pas
               jusqu a disparaitre — l image finale reste reconnaissable. */
            opacity: vidFinie ? 0.6 : 1, transition: "opacity 2s ease" } }),
        h("div", { style: { position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(0deg, " + MSG_COL.fond + " 4%, rgba(6,7,9,0.24) 58%, rgba(6,7,9,0) 100%)" } })
      ),
      h("div", { style: { padding: "10px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h("button", { onClick: function () { setEcran("dashboard"); }, "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid " + MSG_COL.carteBord, color: MSG_COL.blanc, fontSize: 20, cursor: "pointer" } }, "\u2039"),
        /* 19/09 (260) : titre retire — « MESSAGERIE » est deja ecrit dans la video du bandeau. */
        h("div", { style: { flex: 1 } }),
        /* 19/09 (255) : entrer/sortir du mode selection, a gauche du crayon. */
        h("button", { onClick: function () { if (modeSel) quitterSelection(); else { setModeSel(true); setSelConv({}); } }, style: { background: "none", border: "none", color: modeSel ? MSG_COL.turquoise : MSG_COL.gris, fontSize: 11.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", padding: "6px 8px", marginRight: 2 } },
          modeSel ? T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소") : T("S\u00e9lectionner", "Select", "Seleccionar", "Seleziona", "\u9078\u629e", "Ausw\u00e4hlen", "\u062a\u062d\u062f\u064a\u062f", "选择", "Selecteren", "Selecionar", "Välj", "Выбрать", "Wybierz", "선택")),
        h("button", { onClick: function () { if (onglet === "groupes") { setGroupeOuvert(true); } else { setNouveauOuvert(true); } }, "aria-label": onglet === "groupes" ? "Nouveau groupe" : "Nouveau message", style: { width: 38, height: 38, borderRadius: "50%", background: "rgba(201,166,107,0.14)", border: "1px solid rgba(201,166,107,0.4)", color: MSG_COL.turquoise, fontSize: 17, cursor: "pointer" } }, "\u270E")),
      /* 19/09 (257) - LES DEUX ONGLETS GEANTS. Blandine les signale depuis le 19/09 ; sur son
         enregistrement de 22 h 26 ils prennent la moitie de l ecran. CAUSE : les deux pastilles
         etaient des enfants DIRECTS de la colonne principale (display flex, direction column) ;
         avec leur `flex: 1` elles ne s etiraient pas en largeur mais EN HAUTEUR. Elles sont
         desormais dans une vraie rangee (flex row) de hauteur fixe. Bug anterieur a mes
         builds : present aussi dans le 249.
         ⚠️ Rien d autre ne change : memes libelles, memes couleurs, meme comportement. */
      h("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "0 14px 10px", flex: "0 0 auto" } },
        h("div", { onClick: function () { setOnglet("dm"); }, style: { flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 14, fontSize: 12.5, letterSpacing: 0.4, cursor: "pointer", color: onglet === "dm" ? "#F3EEE4" : MSG_COL.gris, background: onglet === "dm" ? "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)" : MSG_COL.carte, boxShadow: onglet === "dm" ? "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)" : "none", border: "1px solid " + (onglet === "dm" ? "rgba(201,166,107,0.5)" : MSG_COL.carteBord), fontWeight: onglet === "dm" ? 700 : 500 } }, T("Messages", "Messages", "Mensajes", "Messaggi", "メッセージ", "Nachrichten", "\u0627\u0644\u0631\u0633\u0627\u0626\u0644", "消息", "Berichten", "Mensagens", "Meddelanden", "Сообщения", "Wiadomości", "메시지")),
        h("div", { onClick: function () { setOnglet("groupes"); }, style: { flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 14, fontSize: 12.5, letterSpacing: 0.4, cursor: "pointer", color: onglet === "groupes" ? "#F3EEE4" : MSG_COL.gris, background: onglet === "groupes" ? "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)" : MSG_COL.carte, boxShadow: onglet === "groupes" ? "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)" : "none", border: "1px solid " + (onglet === "groupes" ? "rgba(201,166,107,0.5)" : MSG_COL.carteBord), fontWeight: onglet === "groupes" ? 700 : 500 } }, T("Écuries & clubs", "Stables & clubs", "Cuadras y clubes", "Scuderie e club", "厩舎とクラブ", "St\u00e4lle & Vereine", "\u0627\u0644\u0625\u0633\u0637\u0628\u0644\u0627\u062a \u0648\u0627\u0644\u0646\u0648\u0627\u062f\u064a", "马厩与俱乐部", "Stallen & manèges", "Cocheiras e clubes", "Stall & klubbar", "Конюшни и клубы", "Stajnie i kluby", "마구간 & 클럽"))),
      /* 19/09 (255) : barre d actions de la selection, EN HAUT (jamais en bas : barre de menu). */
      (modeSel ? h("div", { style: { margin: "0 14px 8px", padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.35)", background: "rgba(201,166,107,0.07)" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } },
          h("div", { style: { flex: 1, minWidth: 90, fontSize: 12, color: MSG_COL.blanc, fontFamily: "'Montserrat',sans-serif" } },
            nbSel() + " " + T("s\u00e9lectionn\u00e9e(s)", "selected", "seleccionada(s)", "selezionate", "\u9078\u629e\u4e2d", "ausgew\u00e4hlt", "\u0645\u062d\u062f\u062f\u0629", "已选择", "geselecteerd", "selecionada(s)", "markerade", "выбрано", "zaznaczone", "개 선택됨")),
          h("button", { onClick: function () { if (nbSel()) { setEnvoiGroupeOuvert(true); setInfoSel(""); } }, style: { minHeight: 40, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.5)", background: "transparent", color: MSG_COL.turquoise, fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: nbSel() ? 1 : 0.45 } },
            T("\u00c9crire", "Write", "Escribir", "Scrivi", "\u9001\u308b", "Schreiben", "\u0643\u062a\u0627\u0628\u0629", "写点什么", "Schrijven", "Escrever", "Skriv", "Написать", "Napisz", "쓰기")),
          h("button", { onClick: function () { if (nbSel()) effacerSelection(); }, style: { minHeight: 40, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(240,92,116,0.45)", background: "rgba(240,92,116,0.08)", color: "#F0A0AE", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: nbSel() ? 1 : 0.45 } },
            busyGroupe ? "\u2026" : T("Effacer pour moi", "Remove for me", "Quitar para m\u00ed", "Rimuovi per me", "\u81ea\u5206\u304b\u3089\u6d88\u3059", "F\u00fcr mich entfernen", "\u062d\u0630\u0641 \u0644\u062f\u064a", "仅为我清除", "Voor mij wissen", "Apagar para mim", "Ta bort för mig", "Удалить у меня", "Usuń u mnie", "나에게서만 삭제"))),
        infoSel ? h("div", { style: { marginTop: 8, fontSize: 11.5, color: "#FF9B9B", lineHeight: 1.5 } }, infoSel) : null,
        envoiGroupeOuvert ? h("div", { style: { marginTop: 10 } },
          h("textarea", { value: texteGroupe, onChange: function (e) { setTexteGroupe(e.target.value); }, rows: 3, placeholder: T("Ton message \u00e0 chacune\u2026", "Your message to each\u2026", "Tu mensaje\u2026", "Il tuo messaggio\u2026", "\u30e1\u30c3\u30bb\u30fc\u30b8\u2026", "Deine Nachricht\u2026", "\u0631\u0633\u0627\u0644\u062a\u0643 \u0625\u0644\u0649 \u0643\u0644 \u0648\u0627\u062d\u062f\u0629\u2026", "你想对每位说的话……", "Jouw bericht aan iedereen…", "Sua mensagem para cada uma…", "Ditt meddelande till var och en…", "Твоё сообщение каждой…", "Twoja wiadomość do każdej…", "각자에게 보낼 메시지…"),
            style: { width: "100%", boxSizing: "border-box", borderRadius: 12, border: "1px solid " + MSG_COL.bord, background: "rgba(255,255,255,0.03)", color: MSG_COL.blanc, fontSize: 13, padding: 10, fontFamily: "'Montserrat',sans-serif" } }),
          h("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 } },
            h("div", { style: { flex: 1, fontSize: 11, color: MSG_COL.gris, lineHeight: 1.45 } },
              T("Chacune le re\u00e7oit dans SA conversation. Elles ne se voient pas entre elles.", "Each gets it in HER own conversation.", "Cada una lo recibe en su conversaci\u00f3n.", "Ognuna lo riceve nella sua conversazione.", "\u500b\u5225\u306b\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002", "Jede erh\u00e4lt sie einzeln.", "\u062a\u062a\u0644\u0642\u0627\u0647\u0627 \u0643\u0644 \u0648\u0627\u062d\u062f\u0629 \u0641\u064a \u0645\u062d\u0627\u062f\u062b\u062a\u0647\u0627 \u0627\u0644\u062e\u0627\u0635\u0629. \u0648\u0644\u0627 \u062a\u0631\u0649 \u0628\u0639\u0636\u0647\u0646 \u0628\u0639\u0636\u0627.", "每位都会在她自己的对话里收到，她们彼此看不到对方。", "Iedereen ontvangt het in HAAR eigen gesprek. Ze zien elkaar niet.", "Cada uma recebe na SUA conversa. Elas não se veem entre si.", "Alla får det i SIN egen konversation. De ser inte varandra.", "Каждая получит его в СВОЁМ диалоге. Они друг друга не видят.", "Każda dostanie ją w SWOJEJ rozmowie. Nie widzą się nawzajem.", "각자 자신의 대화로 받아요. 서로의 대화는 보이지 않아요.")),
            h("button", { onClick: envoyerASelection, style: { minHeight: 42, padding: "0 18px", borderRadius: 999, border: "none", background: MSG_COL.turquoise, color: MSG_COL.fond, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: (busyGroupe || !texteGroupe.trim()) ? 0.5 : 1 } },
              busyGroupe ? "\u2026" : T("Envoyer", "Send", "Enviar", "Invia", "\u9001\u4fe1", "Senden", "\u0625\u0631\u0633\u0627\u0644", "发送", "Versturen", "Enviar", "Skicka", "Отправить", "Wyślij", "보내기")))) : null) : null),
      h("div", { style: { flex: 1, overflowY: "auto", padding: "2px 14px", position: "relative" } },
        /* 19/09 (262) : APY RESTE EN PLACE QUAND ON FAIT DEFILER. Blandine : « le poney en
           fond reste en bas du coup quand il y a beaucoup de messages on ne le voit pas ».
           Avant, l image etait posee AU FOND DU CONTENU : avec 20 conversations elle se
           retrouvait tres loin sous l ecran. Elle est desormais calee sur l ECRAN (position
           fixed), juste au-dessus de la barre du bas, et ne bouge plus quand la liste defile.
           ⚠️ Toujours derriere les cartes (zIndex 0 contre 1) et insensible au toucher. */
        h("img", { src: "images/APY_MESSAGES.png", alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async",
          onError: function (eIf) { try { eIf.target.style.display = "none"; } catch (eI3) { } },
          style: { position: "fixed", right: -6, bottom: "calc(92px + env(safe-area-inset-bottom))", width: 210, height: "auto", opacity: 0.3, pointerEvents: "none", zIndex: 0 } }), /* 19/09 (264) : elle « se voit tres mal » : opacite 0,1 -> 0,3 et un peu plus grande, maintenant que les cartes sont transparentes a droite */
        chargement ? h("div", { style: { textAlign: "center", padding: "60px 10px", color: MSG_COL.gris, fontSize: 13 } }, T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "L\u00e4dt\u2026", "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…")) :
        !convsFiltrees.length ? h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "70px 24px 20px", gap: 10 } },
          /* 19/09 (254) : APY sur l ecran vide (son choix 1). L image est dans images/,
             pas en base64 : si le fichier manque, l ancien rond turquoise revient. */
          h("img", { src: "images/APY_MESSAGES.png", alt: "Apy", loading: "lazy", decoding: "async",
            onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (eI2) { } },
            style: { width: 132, height: "auto", display: "block", marginBottom: 2 } }),
          h("div", { style: { fontSize: 13, color: MSG_COL.gris, lineHeight: 1.5, maxWidth: 260 } }, onglet === "dm" ? T("Aucune conversation pour le moment.", "No conversations yet.", "Aún no hay conversaciones.", "Ancora nessuna conversazione.", "まだ会話はありません。", "Noch keine Unterhaltungen.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u062d\u0627\u062f\u062b\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", "暂时没有对话。", "Nog geen gesprekken.", "Nenhuma conversa por enquanto.", "Inga konversationer ännu.", "Пока нет диалогов.", "Na razie brak rozmów.", "아직 대화가 없어요.") : T("Aucun groupe pour le moment.", "No groups yet.", "Aún no hay grupos.", "Ancora nessun gruppo.", "まだグループはありません。", "Noch keine Gruppen.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u062c\u0645\u0648\u0639\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", "暂时没有群组。", "Nog geen groepen.", "Nenhum grupo por enquanto.", "Inga grupper ännu.", "Пока нет групп.", "Na razie brak grup.", "아직 그룹이 없어요.")),
          h("button", { onClick: function () { if (onglet === "groupes") { setGroupeOuvert(true); } else { setEcran("communaute"); } }, style: { marginTop: 6, padding: "10px 20px", borderRadius: 999, background: "rgba(201,166,107,0.12)", border: "1px solid rgba(201,166,107,0.4)", color: MSG_COL.turquoise, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, onglet === "groupes" ? T("Créer un groupe", "Create a group", "Crear un grupo", "Crea un gruppo", "グループを作成", "Gruppe erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0645\u062c\u0645\u0648\u0639\u0629", "创建群组", "Groep maken", "Criar um grupo", "Skapa en grupp", "Создать группу", "Utwórz grupę", "그룹 만들기") : T("Découvrir la communauté", "Discover the community", "Descubrir la comunidad", "Scopri la community", "コミュニティを見る", "Community entdecken", "\u0627\u0643\u062a\u0634\u0627\u0641 \u0627\u0644\u0645\u062c\u062a\u0645\u0639", "发现社区", "De community ontdekken", "Descobrir a comunidade", "Upptäck communityn", "Открыть сообщество", "Odkryj społeczność", "커뮤니티 둘러보기"))) :
        convsFiltrees.map(function (c) {
          var titre = c.type === "dm" ? (c.autrePseudo || T("Cavalier", "Rider", "Jinete", "Cavaliere", "騎手", "Reiter", "\u0641\u0627\u0631\u0633", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수")) : (c.ecurie || c.club || T("Groupe", "Group", "Grupo", "Gruppo", "グループ", "Gruppe", "\u0645\u062c\u0645\u0648\u0639\u0629", "群组", "Groep", "Grupo", "Grupp", "Группа", "Grupa", "그룹"));
          return h("div", { key: c.id, onClick: function () { if (modeSel) { basculerSel(c.id); return; } ouvrirConversation(c); } /* 19/09 (258) : MON OUBLI DU 255 - en mode selection, toucher une ligne la COCHE au lieu d ouvrir la conversation ; sans ca, la selection etait impossible (elle : « quand je clique sur une conversation pour la selectionner elle s ouvre en grand »). */, style: { display: "flex", alignItems: "center", gap: 12, padding: 12, marginBottom: 8, position: "relative", zIndex: 1, background: c.nonLus ? "linear-gradient(90deg, rgba(201,166,107,0.16) 0%, rgba(201,166,107,0.09) 55%, rgba(201,166,107,0.02) 100%)" : "linear-gradient(90deg, rgba(22,27,32,0.92) 0%, rgba(22,27,32,0.62) 55%, rgba(22,27,32,0.12) 100%)" /* 19/09 (264) : carte en DEGRADE, tres transparente a droite, pour laisser voir Apy en fond (sa demande) */ /* 19/09 (254) : la ligne d un message non lu est surlignee (comme sur la maquette 4) */, border: "1px solid " + (c.nonLus ? "rgba(201,166,107,0.28)" : MSG_COL.carteBord), borderRadius: 20, cursor: "pointer" } },
            /* 19/09 (258) : case a cocher visible, seulement en mode selection. */
            modeSel ? h("span", { style: { flex: "0 0 auto", width: 24, height: 24, borderRadius: 7, boxSizing: "border-box", border: "1px solid " + (selConv[c.id] ? MSG_COL.turquoise : "rgba(255,255,255,0.28)"), background: selConv[c.id] ? "rgba(201,166,107,0.22)" : "transparent", color: MSG_COL.turquoise, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, lineHeight: 1 } }, selConv[c.id] ? "\u2713" : "") : null,
            c.type === "dm" ? h("img", { src: (typeof avSrc === "function" ? avSrc(c.autreAvatar) : c.autreAvatar) || "", style: { width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(244,247,250,0.10)", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }) :
              h("div", { style: { width: 52, height: 52, borderRadius: 16, background: "#20262B", border: "1.5px solid rgba(201,166,107,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", color: MSG_COL.turquoise, fontSize: 18, flexShrink: 0 } }, (titre || "?").charAt(0).toUpperCase()),
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 } },
                h("div", { style: { fontSize: 14.5, fontWeight: 600, color: MSG_COL.blanc, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, titre),
                h("div", { style: { fontSize: 10.5, color: MSG_COL.gris, flexShrink: 0, marginLeft: 8 } }, tempsRelatifMsg(c.dernierLe, lg))),
              h("div", { style: { fontSize: 12.5, color: c.nonLus ? MSG_COL.blanc : MSG_COL.gris, fontWeight: c.nonLus ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, c.dernierMessage || T("Dites bonjour \u{1F44B}", "Say hello \u{1F44B}", "Saluda \u{1F44B}", "Saluta \u{1F44B}", "挨拶しよう \u{1F44B}", "Sag hallo \ud83d\udc4b", "\u0642\u0648\u0644\u064a \u0645\u0631\u062d\u0628\u0627 \ud83d\udc4b", "打个招呼吧 👋", "Zeg hallo 👋", "Diga oi 👋", "Säg hej 👋", "Поздоровайтесь 👋", "Przywitaj się 👋", "인사를 나눠 보세요 👋"))),
            c.nonLus ? h("div", { style: { minWidth: 19, height: 19, borderRadius: 10, background: MSG_COL.turquoise, color: MSG_COL.fond, fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", flexShrink: 0, marginLeft: 8 } }, c.nonLus) : null);
        })),
      nouveauOuvert ? h("div", { onClick: function () { setNouveauOuvert(false); setRecherche(""); setResultatsRech([]); }, style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-end" } },
        h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", maxHeight: "72vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, rgba(20,24,28,0.98), rgba(9,11,15,0.99))", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "18px 18px calc(18px + env(safe-area-inset-bottom))", border: "1px solid " + MSG_COL.carteBord } },
          h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, color: MSG_COL.blanc, textAlign: "center", marginBottom: 14 } }, T("\u00c9crire \u00e0\u2026", "Write to\u2026", "Escribir a\u2026", "Scrivi a\u2026", "\u5b9b\u5148\u3092\u9078\u3076", "Schreiben an\u2026", "\u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0625\u0644\u0649\u2026", "写给……", "Schrijf naar…", "Escrever para…", "Skriv till…", "Написать…", "Napisz do…", "받는 사람…")),
          h("input", { autoFocus: true, value: recherche, onChange: function (e) { setRecherche(e.target.value); }, placeholder: T("Chercher un cavalier par pseudo…", "Search a rider by name…", "Buscar un jinete por nombre…", "Cerca un cavaliere per nome…", "騎手の名前で検索…", "Reiter nach Benutzername suchen\u2026", "\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0641\u0627\u0631\u0633 \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u2026", "按昵称搜索骑手……", "Zoek een ruiter op gebruikersnaam…", "Procurar um cavaleiro pelo apelido…", "Sök efter en ryttare via användarnamn…", "Найти всадника по нику…", "Szukaj jeźdźca po pseudonimie…", "닉네임으로 기수 검색…"), style: { width: "100%", background: MSG_COL.carte, border: "1px solid " + MSG_COL.carteBord, borderRadius: 16, padding: "12px 16px", color: MSG_COL.blanc, fontSize: 16, outline: "none", marginBottom: 12 } }),
          h("div", { style: { overflowY: "auto", flex: 1 } },
            rechEnCours ? h("div", { style: { textAlign: "center", padding: "20px 10px", color: MSG_COL.gris, fontSize: 13 } }, T("Recherche…", "Searching…", "Buscando…", "Ricerca…", "検索中…", "Suche\u2026", "\u062c\u0627\u0631 \u0627\u0644\u0628\u062d\u062b\u2026", "搜索中…", "Zoeken…", "Buscando…", "Söker…", "Поиск…", "Szukam…", "검색 중…")) :
            (recherche.trim().length >= 2 && !resultatsRech.length) ? h("div", { style: { textAlign: "center", padding: "20px 10px", color: MSG_COL.gris, fontSize: 13, fontStyle: "italic" } }, T("Aucun cavalier trouvé.", "No rider found.", "Ningún jinete encontrado.", "Nessun cavaliere trovato.", "見つかりませんでした。", "Kein Reiter gefunden.", "\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0623\u064a \u0641\u0627\u0631\u0633.", "没有找到骑手。", "Geen ruiter gevonden.", "Nenhum cavaleiro encontrado.", "Ingen ryttare hittades.", "Всадники не найдены.", "Nie znaleziono jeźdźca.", "기수를 찾지 못했어요.")) :
            /* 19/09 (254) : sans recherche, on propose SA LISTE. Avec recherche, l ancien
               comportement (resultats de la base) reste exactement le meme. */
            (recherche.trim().length < 2) ? ((suggestions === null)
              ? h("div", { style: { textAlign: "center", padding: "20px 10px", color: MSG_COL.gris, fontSize: 13 } }, T("Chargement\u2026", "Loading\u2026", "Cargando\u2026", "Caricamento\u2026", "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026", "L\u00e4dt\u2026", "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
              : h("div", null,
                  (suggestions.mien || []).length ? h("div", { style: { fontSize: 9.5, letterSpacing: 1.6, color: MSG_COL.gris, padding: "2px 2px 8px" } }, T("MES \u00c9CURIES", "MY STABLES", "MIS CUADRAS", "LE MIE SCUDERIE", "\u99ac\u5c4b", "MEINE ST\u00c4LLE", "\u0625\u0633\u0637\u0628\u0644\u0627\u062a\u064a", "我的马厩", "MIJN STALLEN", "MINHAS COCHEIRAS", "MINA STALL", "МОИ КОНЮШНИ", "MOJE STAJNIE", "내 마구간")) : null,
                  (suggestions.mien || []).map(function (p) {
                    return h("div", { key: "s" + p.id, onClick: function () { demarrerAvec(p); }, style: { display: "flex", alignItems: "center", gap: 12, padding: 10, marginBottom: 6, background: MSG_COL.carte, border: "1px solid " + MSG_COL.bord, borderRadius: 14, cursor: "pointer" } },
                      h("img", { src: (typeof avSrc === "function" ? avSrc(p.avatar_url) : p.avatar_url) || "", style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }),
                      h("div", { style: { minWidth: 0 } },
                        h("div", { style: { fontSize: 14, color: MSG_COL.blanc, fontWeight: 600 } }, p.pseudo || "?"),
                        p.club ? h("div", { style: { fontSize: 11, color: MSG_COL.gris, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.club) : null));
                  }),
                  (suggestions.autres || []).length ? h("div", { style: { fontSize: 9.5, letterSpacing: 1.6, color: MSG_COL.gris, padding: "10px 2px 8px" } }, T("AUTRES CAVALI\u00c8RES", "OTHER RIDERS", "OTROS JINETES", "ALTRI CAVALIERI", "\u305d\u306e\u4ed6", "ANDERE REITERINNEN", "\u0641\u0627\u0631\u0633\u0627\u062a \u0623\u062e\u0631\u064a\u0627\u062a", "其他骑手", "ANDERE RUITERS", "OUTRAS AMAZONAS", "ANDRA RYTTARE", "ДРУГИЕ ВСАДНИЦЫ", "INNE AMAZONKI", "다른 기수들")) : null,
                  (suggestions.autres || []).map(function (p) {
                    return h("div", { key: "a" + p.id, onClick: function () { demarrerAvec(p); }, style: { display: "flex", alignItems: "center", gap: 12, padding: 10, marginBottom: 6, background: MSG_COL.carte, border: "1px solid " + MSG_COL.bord, borderRadius: 14, cursor: "pointer" } },
                      h("img", { src: (typeof avSrc === "function" ? avSrc(p.avatar_url) : p.avatar_url) || "", style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }),
                      h("div", { style: { fontSize: 14, color: MSG_COL.blanc, fontWeight: 600 } }, p.pseudo || "?"));
                  })))
            : resultatsRech.map(function (p) {
              return h("div", { key: p.id, onClick: function () { demarrerAvec(p); }, style: { display: "flex", alignItems: "center", gap: 12, padding: 10, marginBottom: 6, background: MSG_COL.carte, border: "1px solid " + MSG_COL.carteBord, borderRadius: 16, cursor: "pointer" } },
                h("img", { src: (typeof avSrc === "function" ? avSrc(p.avatar_url) : p.avatar_url) || "", style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }),
                h("div", { style: { fontSize: 14, color: MSG_COL.blanc, fontWeight: 600 } }, p.pseudo || "?"));
            })))) : null,
      groupeOuvert ? h("div", { onClick: function () { setGroupeOuvert(false); setNomGroupe(""); setMembresChoisis([]); setRecherche(""); setResultatsRech([]); }, style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-end" } },
        h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", maxHeight: "82vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, rgba(20,24,28,0.98), rgba(9,11,15,0.99))", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "18px 18px calc(18px + env(safe-area-inset-bottom))", border: "1px solid " + MSG_COL.carteBord } },
          h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, color: MSG_COL.blanc, textAlign: "center", marginBottom: 14 } }, T("Nouveau groupe", "New group", "Nuevo grupo", "Nuovo gruppo", "新しいグループ", "Neue Gruppe", "\u0645\u062c\u0645\u0648\u0639\u0629 \u062c\u062f\u064a\u062f\u0629", "新群组", "Nieuwe groep", "Novo grupo", "Ny grupp", "Новая группа", "Nowa grupa", "새 그룹")),
          h("input", { value: nomGroupe, onChange: function (e) { setNomGroupe(e.target.value); }, placeholder: T("Nom du groupe (ex. Écurie Feinn)…", "Group name (e.g. Feinn Stable)…", "Nombre del grupo (ej. Cuadra Feinn)…", "Nome del gruppo (es. Scuderia Feinn)…", "グループ名（例：フェイン厩舎）…", "Gruppenname (z. B. \u00c9curie Feinn)\u2026", "\u0627\u0633\u0645 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 (\u0645\u062b\u0644\u0627: \u00c9curie Feinn)\u2026", "群组名称（例如 Écurie Feinn）……", "Naam van de groep (bijv. Écurie Feinn)…", "Nome do grupo (ex.: Écurie Feinn)…", "Gruppnamn (t.ex. Écurie Feinn)…", "Название группы (напр. Écurie Feinn)…", "Nazwa grupy (np. Écurie Feinn)…", "그룹 이름 (예: Écurie Feinn)…"), style: { width: "100%", background: MSG_COL.carte, border: "1px solid " + MSG_COL.carteBord, borderRadius: 16, padding: "12px 16px", color: MSG_COL.blanc, fontSize: 16, outline: "none", marginBottom: 10 } }),
          membresChoisis.length ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 } },
            membresChoisis.map(function (m) {
              return h("div", { key: m.id, onClick: function () { toggleMembreChoisi(m); }, style: { display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 6px", borderRadius: 999, background: "rgba(201,166,107,0.14)", border: "1px solid rgba(201,166,107,0.4)", cursor: "pointer" } },
                h("img", { src: (typeof avSrc === "function" ? avSrc(m.avatar_url) : m.avatar_url) || "", style: { width: 20, height: 20, borderRadius: "50%", objectFit: "cover", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }),
                h("span", { style: { fontSize: 12, color: MSG_COL.blanc, fontWeight: 600 } }, m.pseudo || "?"),
                h("span", { style: { fontSize: 13, color: MSG_COL.turquoise } }, "\u00D7"));
            })) : null,
          h("input", { value: recherche, onChange: function (e) { setRecherche(e.target.value); }, placeholder: T("Ajouter un cavalier par pseudo…", "Add a rider by name…", "Añadir un jinete por nombre…", "Aggiungi un cavaliere per nome…", "騎手を名前で追加…", "Reiter nach Benutzername hinzuf\u00fcgen\u2026", "\u0625\u0636\u0627\u0641\u0629 \u0641\u0627\u0631\u0633 \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u2026", "按昵称添加骑手……", "Een ruiter toevoegen op gebruikersnaam…", "Adicionar um cavaleiro pelo apelido…", "Lägg till en ryttare via användarnamn…", "Добавить всадника по нику…", "Dodaj jeźdźca po pseudonimie…", "닉네임으로 기수 추가…"), style: { width: "100%", background: MSG_COL.carte, border: "1px solid " + MSG_COL.carteBord, borderRadius: 16, padding: "12px 16px", color: MSG_COL.blanc, fontSize: 16, outline: "none", marginBottom: 12 } }),
          h("div", { style: { overflowY: "auto", flex: 1 } },
            rechEnCours ? h("div", { style: { textAlign: "center", padding: "20px 10px", color: MSG_COL.gris, fontSize: 13 } }, T("Recherche…", "Searching…", "Buscando…", "Ricerca…", "検索中…", "Suche\u2026", "\u062c\u0627\u0631 \u0627\u0644\u0628\u062d\u062b\u2026", "搜索中…", "Zoeken…", "Buscando…", "Söker…", "Поиск…", "Szukam…", "검색 중…")) :
            (recherche.trim().length >= 2 && !resultatsRech.length) ? h("div", { style: { textAlign: "center", padding: "20px 10px", color: MSG_COL.gris, fontSize: 13, fontStyle: "italic" } }, T("Aucun cavalier trouvé.", "No rider found.", "Ningún jinete encontrado.", "Nessun cavaliere trovato.", "見つかりませんでした。", "Kein Reiter gefunden.", "\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0623\u064a \u0641\u0627\u0631\u0633.", "没有找到骑手。", "Geen ruiter gevonden.", "Nenhum cavaleiro encontrado.", "Ingen ryttare hittades.", "Всадники не найдены.", "Nie znaleziono jeźdźca.", "기수를 찾지 못했어요.")) :
            resultatsRech.map(function (p) {
              var choisi = membresChoisis.some(function (x) { return x.id === p.id; });
              return h("div", { key: p.id, onClick: function () { toggleMembreChoisi(p); }, style: { display: "flex", alignItems: "center", gap: 12, padding: 10, marginBottom: 6, background: choisi ? "rgba(201,166,107,0.10)" : MSG_COL.carte, border: "1px solid " + (choisi ? "rgba(201,166,107,0.5)" : MSG_COL.carteBord), borderRadius: 16, cursor: "pointer" } },
                h("img", { src: (typeof avSrc === "function" ? avSrc(p.avatar_url) : p.avatar_url) || "", style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover", background: "#20262B" }, onError: function (e) { e.target.style.visibility = "hidden"; } }),
                h("div", { style: { flex: 1, fontSize: 14, color: MSG_COL.blanc, fontWeight: 600 } }, p.pseudo || "?"),
                choisi ? h("span", { style: { color: MSG_COL.turquoise, fontSize: 16 } }, "\u2713") : null);
            })),
          h("button", { onClick: creerGroupe, disabled: creationEnCours || !nomGroupe.trim() || !membresChoisis.length, style: { marginTop: 12, width: "100%", padding: "13px", borderRadius: 16, background: MSG_COL.turquoise, color: MSG_COL.fond, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", opacity: (creationEnCours || !nomGroupe.trim() || !membresChoisis.length) ? 0.45 : 1 } }, creationEnCours ? T("Création…", "Creating…", "Creando…", "Creazione…", "作成中…", "Wird erstellt\u2026", "\u062c\u0627\u0631 \u0627\u0644\u0625\u0646\u0634\u0627\u0621\u2026", "创建中…", "Aanmaken…", "Criando…", "Skapar…", "Создаём…", "Tworzenie…", "만드는 중…") : T("Créer le groupe", "Create group", "Crear grupo", "Crea gruppo", "グループを作成", "Gruppe erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629", "创建群组", "Groep maken", "Criar o grupo", "Skapa gruppen", "Создать группу", "Utwórz grupę", "그룹 만들기")))) : null
      );
  }

  // ---------- VUE FIL ----------
  var titreFil = convActive ? (convActive.type === "dm" ? (convActive.autrePseudo || T("Cavalier", "Rider", "Jinete", "Cavaliere", "騎手", "Reiter", "\u0641\u0627\u0631\u0633", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수")) : (convActive.ecurie || convActive.club || T("Groupe", "Group", "Grupo", "Gruppo", "グループ", "Gruppe", "\u0645\u062c\u0645\u0648\u0639\u0629", "群组", "Groep", "Grupo", "Grupp", "Группа", "Grupa", "그룹"))) : "";

  return h("div", { style: { height: "100dvh", maxHeight: "100dvh", width: "100%", maxWidth: "100vw", boxSizing: "border-box", background: MSG_COL.fond, display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "hidden", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 } },

    /* ---- 1. En-tête fixe ---- */
    h("div", { style: { flexShrink: 0, boxSizing: "border-box", width: "100%", maxWidth: "100%", padding: "calc(env(safe-area-inset-top) + 16px) 16px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(244,247,250,0.05)" } },
      h("button", { onClick: retourListe, "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: MSG_COL.turquoise, fontSize: 24, background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0, WebkitTapHighlightColor: "transparent" } }, "\u2039"),
      convActive && convActive.type === "dm" ? h("img", { src: (typeof avSrc === "function" ? avSrc(convActive.autreAvatar) : convActive.autreAvatar) || "", style: { width: 38, height: 38, borderRadius: "50%", objectFit: "cover", background: "#20262B", flexShrink: 0 } }) :
        h("div", { style: { width: 38, height: 38, borderRadius: 12, background: "#20262B", border: "1.5px solid rgba(201,166,107,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", color: MSG_COL.turquoise, fontSize: 15, flexShrink: 0 } }, (titreFil || "?").charAt(0).toUpperCase()),
      h("div", { style: { minWidth: 0 } }, h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, color: MSG_COL.blanc, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, titreFil)),
      convActive && convActive.type === "dm" ? h("div", { style: { position: "relative", flexShrink: 0 } },
        h("button", { onClick: function () { setMenuOuvert(!menuOuvert); }, "aria-label": "Options", style: { width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid " + MSG_COL.carteBord, color: MSG_COL.blanc, fontSize: 16, cursor: "pointer" } }, "\u22EF"),
        menuOuvert ? h("div", { style: { position: "absolute", top: 40, right: 0, minWidth: 200, background: "#1B2126", border: "1px solid " + MSG_COL.carteBord, borderRadius: 14, padding: 6, zIndex: 20, boxShadow: "0 14px 34px rgba(0,0,0,0.5)" } },
          h("button", { onClick: signaler, style: { display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", color: MSG_COL.blanc, fontSize: 13, borderRadius: 10, cursor: "pointer" } }, T("Signaler", "Report", "Denunciar", "Segnala", "報告する", "Melden", "\u0625\u0628\u0644\u0627\u063a", "举报", "Melden", "Denunciar", "Anmäl", "Пожаловаться", "Zgłoś", "신고")),
          h("button", { onClick: function () { setMenuOuvert(false); setConfBlocage(true); }, style: { display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", color: "#FF8A93", fontSize: 13, borderRadius: 10, cursor: "pointer" } }, T("Bloquer", "Block", "Bloquear", "Blocca", "ブロック", "Blockieren", "\u062d\u0638\u0631", "屏蔽", "Blokkeren", "Bloquear", "Blockera", "Заблокировать", "Zablokuj", "차단"))) : null) : null),

    /* ---- 2. Zone des messages : seule zone qui défile ---- */
    h("div", { style: { flex: "1 1 auto", minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "16px 14px 10px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 } },
      !messages.length ? h("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 30px", gap: 10 } },
        h("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(201,166,107,0.08)", border: "1px solid rgba(201,166,107,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 4 } }, "\uD83D\uDCAC"),
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, color: MSG_COL.blanc, fontWeight: 600 } }, T("Commence la conversation", "Start the conversation", "Empieza la conversación", "Inizia la conversazione", "会話をはじめよう", "Beginne die Unterhaltung", "\u0627\u0628\u062f\u0626\u064a \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629", "开始聊天吧", "Begin het gesprek", "Comece a conversa", "Starta konversationen", "Начни разговор", "Zacznij rozmowę", "대화를 시작해 보세요")),
        h("div", { style: { fontSize: 12.5, color: MSG_COL.gris, lineHeight: 1.5 } }, T("Écris un premier message à " + titreFil + ".", "Write a first message to " + titreFil + ".", "Escribe un primer mensaje a " + titreFil + ".", "Scrivi un primo messaggio a " + titreFil + ".", titreFil + "\u3078\u6700\u521d\u306e\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u66f8\u3053\u3046\u3002", "Schreib " + titreFil + " eine erste Nachricht.", "\u0627\u0643\u062a\u0628\u064a \u0623\u0648\u0644 \u0631\u0633\u0627\u0644\u0629 \u0625\u0644\u0649 " + titreFil + ".", "给 " + titreFil + " 发第一条消息吧。", "Schrijf een eerste bericht aan " + titreFil + ".", "Escreva uma primeira mensagem para " + titreFil + ".", ("Skriv ett första meddelande till " + titreFil + "."), ("Напиши первое сообщение: " + titreFil + "."), ("Napisz pierwszą wiadomość do " + titreFil + "."), (titreFil + "에게 첫 메시지를 보내 보세요.")))) :
        /* 19/09 (256) — ETAPE 3 : SEPARATEURS DE JOUR ET HEURE SOUS CHAQUE BULLE.
           Les bulles etaient deja alignees (moi a droite, elle a gauche) : il manquait de
           savoir QUAND. Un intertitre « Aujourd hui / Hier / 12 sept. » apparait quand on
           change de jour, et l heure s affiche sous chaque message.
           ⚠️ Aucune requete en plus : envoye_le est deja charge avec chaque message. */
        messages.map(function (m, iM) {
          var mien = m.expediteur_id === moiId;
          var estGroupe = convActive && convActive.type && convActive.type !== "dm";
          var expediteurNom = (!mien && estGroupe && profilsGroupe[m.expediteur_id]) ? (profilsGroupe[m.expediteur_id].pseudo || "?") : null;
          var dJour = null, heureM = "";
          try {
            var dM = m.envoye_le ? new Date(m.envoye_le) : null;
            if (dM && !isNaN(dM.getTime())) {
              heureM = dM.toLocaleTimeString(lg === "fr" ? "fr-FR" : lg, { hour: "2-digit", minute: "2-digit" });
              var prec = iM > 0 ? messages[iM - 1] : null;
              var dP = (prec && prec.envoye_le) ? new Date(prec.envoye_le) : null;
              var memeJour = dP && !isNaN(dP.getTime()) && dP.toDateString() === dM.toDateString();
              if (!memeJour) {
                var auj = new Date(), hier = new Date(); hier.setDate(auj.getDate() - 1);
                if (dM.toDateString() === auj.toDateString()) dJour = T("Aujourd\u2019hui", "Today", "Hoy", "Oggi", "\u4eca\u65e5", "Heute", "\u0627\u0644\u064a\u0648\u0645", "今天", "Vandaag", "Hoje", "Idag", "Сегодня", "Dziś", "오늘");
                else if (dM.toDateString() === hier.toDateString()) dJour = T("Hier", "Yesterday", "Ayer", "Ieri", "\u6628\u65e5", "Gestern", "\u0623\u0645\u0633", "昨天", "Gisteren", "Ontem", "Igår", "Вчера", "Wczoraj", "어제");
                else dJour = dM.toLocaleDateString(lg === "fr" ? "fr-FR" : lg, { day: "numeric", month: "short", year: (dM.getFullYear() === auj.getFullYear()) ? undefined : "numeric" });
              }
            }
          } catch (eD) { }
          return h("div", { key: m.id, style: { display: "flex", flexDirection: "column", alignSelf: "stretch" } },
            dJour ? h("div", { style: { alignSelf: "center", margin: "6px 0 10px", padding: "3px 12px", borderRadius: 999, background: "rgba(255,255,255,0.05)", fontSize: 10.5, color: MSG_COL.gris, letterSpacing: 0.3 } }, dJour) : null,
            h("div", { style: { display: "flex", flexDirection: "column", alignSelf: mien ? "flex-end" : "flex-start", maxWidth: "75%" } },
              expediteurNom ? h("div", { style: { fontSize: 10.5, color: MSG_COL.turquoise, fontWeight: 700, margin: "0 4px 3px" } }, expediteurNom) : null,
              h("div", { style: { padding: "11px 14px", borderRadius: 20, borderBottomRightRadius: mien ? 6 : 20, borderBottomLeftRadius: mien ? 20 : 6, fontSize: 13.5, lineHeight: 1.4, color: MSG_COL.blanc, background: mien ? MSG_COL.bulleMoi : MSG_COL.bulleEux, wordBreak: "break-word" } }, m.contenu),
              heureM ? h("div", { style: { fontSize: 9.5, color: MSG_COL.gris, margin: "3px 6px 0", alignSelf: mien ? "flex-end" : "flex-start" } }, heureM) : null));
        }),
      h("div", { ref: refFin })),

    /* ---- 3. Barre de rédaction fixe ---- */
    h("div", { style: { flexShrink: 0, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px calc(10px + env(safe-area-inset-bottom))", borderTop: "1px solid rgba(244,247,250,0.05)", boxSizing: "border-box", width: "100%", maxWidth: "100%", background: MSG_COL.fond } },
      h("button", { onClick: function () { try { alert(T("Bientôt disponible", "Coming soon", "Próximamente", "Presto disponibile", "近日公開", "Bald verf\u00fcgbar", "\u0645\u062a\u0627\u062d \u0642\u0631\u064a\u0628\u0627", "即将上线", "Binnenkort beschikbaar", "Em breve", "Kommer snart", "Скоро будет доступно", "Wkrótce dostępne", "곧 만나요")); } catch (eT) { } }, "aria-label": hypeT7("Ajouter une photo", "Add a photo", "A\u00f1adir una foto", "Aggiungi una foto", "\u5199\u771f\u3092\u8ffd\u52a0", "Foto hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0635\u0648\u0631\u0629", "添加照片", "Een foto toevoegen", "Adicionar uma foto", "Lägg till ett foto", "Добавить фото", "Dodaj zdjęcie", "사진 추가"), style: { width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid " + MSG_COL.carteBord, color: MSG_COL.gris, fontSize: 17, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, "+"),
      h("input", { value: saisie, onChange: function (e) { setSaisie(e.target.value); }, onKeyDown: function (e) { if (e.key === "Enter") envoyer(); }, placeholder: T("Écrire un message…", "Write a message…", "Escribe un mensaje…", "Scrivi un messaggio…", "メッセージを書く…", "Nachricht schreiben\u2026", "\u0627\u0643\u062a\u0628\u064a \u0631\u0633\u0627\u0644\u0629\u2026", "写一条消息……", "Schrijf een bericht…", "Escrever uma mensagem…", "Skriv ett meddelande…", "Написать сообщение…", "Napisz wiadomość…", "메시지 쓰기…"), style: { flex: "1 1 auto", minWidth: 0, boxSizing: "border-box", background: MSG_COL.carte, border: "1px solid " + MSG_COL.carteBord, borderRadius: 22, padding: "11px 16px", color: MSG_COL.blanc, fontSize: 16, outline: "none" } }),
      h("button", { onClick: envoyer, disabled: envoiEnCours || !saisie.trim(), "aria-label": hypeT7("Envoyer", "Send", "Enviar", "Invia", "\u9001\u4fe1", "Senden", "\u0625\u0631\u0633\u0627\u0644", "发送", "Versturen", "Enviar", "Skicka", "Отправить", "Wyślij", "보내기"), style: { width: 40, height: 40, borderRadius: "50%", background: MSG_COL.turquoise, display: "flex", alignItems: "center", justifyContent: "center", color: MSG_COL.fond, fontSize: 16, flexShrink: 0, border: "none", cursor: "pointer", opacity: (envoiEnCours || !saisie.trim()) ? 0.4 : 1, transition: "opacity .15s ease" } }, "\u27A4")),

    confBlocage ? h("div", { onClick: function () { setConfBlocage(false); }, style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-end" } },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", background: "linear-gradient(180deg, rgba(20,24,28,0.98), rgba(9,11,15,0.99))", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "20px 20px calc(20px + env(safe-area-inset-bottom))", border: "1px solid " + MSG_COL.carteBord } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, color: MSG_COL.blanc, textAlign: "center", marginBottom: 16 } }, T("Bloquer " + titreFil, "Block " + titreFil, "Bloquear a " + titreFil, "Blocca " + titreFil, titreFil + "\u3092\u30d6\u30ed\u30c3\u30af", titreFil + " blockieren", "\u062d\u0638\u0631 " + titreFil, "屏蔽 " + titreFil, "Blokkeer " + titreFil, "Bloquear " + titreFil, ("Blockera " + titreFil), ("Заблокировать " + titreFil), ("Zablokuj " + titreFil), (titreFil + " 차단"))),
        h("button", { onClick: function () { confirmerBlocage(false); }, style: { display: "block", width: "100%", textAlign: "center", padding: "13px", borderRadius: 14, background: "rgba(255,255,255,0.06)", color: MSG_COL.blanc, fontSize: 13.5, fontWeight: 600, marginBottom: 10, border: "none", cursor: "pointer" } }, T("Bloquer et garder l'historique", "Block and keep history", "Bloquear y conservar el historial", "Blocca e mantieni la cronologia", "ブロックして履歴を残す", "Blockieren und Verlauf behalten", "\u0627\u0644\u062d\u0638\u0631 \u0645\u0639 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0627\u0644\u0633\u062c\u0644", "屏蔽并保留聊天记录", "Blokkeren en de geschiedenis bewaren", "Bloquear e manter o histórico", "Blockera och behåll historiken", "Заблокировать и сохранить историю", "Zablokuj i zachowaj historię", "차단하고 기록은 남기기")),
        h("button", { onClick: function () { confirmerBlocage(true); }, style: { display: "block", width: "100%", textAlign: "center", padding: "13px", borderRadius: 14, background: "rgba(255,138,147,0.12)", color: "#FF8A93", fontSize: 13.5, fontWeight: 600, marginBottom: 10, border: "1px solid rgba(255,138,147,0.3)", cursor: "pointer" } }, T("Bloquer et masquer la conversation", "Block and hide conversation", "Bloquear y ocultar la conversación", "Blocca e nascondi la conversazione", "ブロックして会話を非表示", "Blockieren und Unterhaltung ausblenden", "\u0627\u0644\u062d\u0638\u0631 \u0648\u0625\u062e\u0641\u0627\u0621 \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629", "屏蔽并隐藏对话", "Blokkeren en het gesprek verbergen", "Bloquear e ocultar a conversa", "Blockera och dölj konversationen", "Заблокировать и скрыть диалог", "Zablokuj i ukryj rozmowę", "차단하고 대화 숨기기")),
        h("button", { onClick: function () { setConfBlocage(false); }, style: { display: "block", width: "100%", textAlign: "center", padding: "12px", background: "none", color: MSG_COL.gris, fontSize: 13, border: "none", cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")))) : null);
}
window.HypeMessagerie = { Messagerie: EcranMessagerie };
})();
