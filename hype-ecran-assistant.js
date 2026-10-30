/* HYPE ▸ 30/10/2026 — Écran ASSISTANT IA / Hey Baby (EcranAssistantIA), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~202 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranAssistantIA() {
    const { premium, planAbo, setEcran, retourEcran, peutReculer, setCoursOuvert, setGalopOuvert, t, tr, langue, profil, chevaux, xp, serie, galopOuvert, coursOuvert } = useApp();
    const [coursCtx] = useState(() => { try { const c = (typeof window !== "undefined" && window.__hbCoursCtx) ? window.__hbCoursCtx : null; if (typeof window !== "undefined") window.__hbCoursCtx = null; return (c && c.titre) ? c : null; } catch (e) { return null; } });
    // Retour contextuel : si on vient du quiz, on renvoie sur la DERNIÈRE page du cours (pour passer à la suite sans refaire le quiz) ; sinon on revient à l'écran précédent (la page du cours).
    const retourAssistant = () => {
        try {
            var cc = coursCtx;
            /* 19/08/2026 (feu vert de Blandine : « retour en arriere indispensable
               sinon on les sort des galops ») — le retour precis existait deja mais
               etait reserve a l'arrivee depuis le QCM. Il suffit d'un coursId pour
               savoir ou revenir : la condition s'ouvre donc a toute arrivee depuis
               un cours (pastilles de questions comprises). Le cas du QCM ne change
               pas : lui seul saute au dernier bloc, les autres reviennent au debut
               du chapitre, la ou la cavaliere lisait. */
            if (cc && cc.coursId) {
                try {
                    var gid = cc.galop || galopOuvert;
                    var liste = obtenirCoursParGalop(gid, langue) || [];
                    var cObj = liste.filter(function (c) { return c && c.id === cc.coursId; })[0];
                    var dernier = (cObj && cObj.blocs && cObj.blocs.length) ? (cObj.blocs.length - 1) : 0;
                    SAUT_BLOC_INITIAL = cc.depuisQuiz ? dernier : 0;
                    if (typeof setGalopOuvert === "function" && gid) setGalopOuvert(gid);
                    if (typeof setCoursOuvert === "function") setCoursOuvert(cc.coursId);
                    setEcran("cours");
                    return;
                } catch (eLP) { setEcran("cours"); return; }
            }
            if (peutReculer) { retourEcran(); return; }
        } catch (eR) { }
        if (coursOuvert) { setEcran("cours"); } else { setEcran("galops"); }
    };
    const [messages, setMessages] = useState(() => {
        if (coursCtx) {
            let accueil;
            if (coursCtx.depuisQuiz && typeof coursCtx.score === "number" && coursCtx.score >= 100) {
                accueil = tr({ fr: "Bravo pour ce sans-faute ! On peut approfondir une notion, ou je te propose un exercice \u00e0 cheval pour ancrer tout \u00e7a.", en: "Well done on that clean run! We can dig into a concept, or I can suggest an exercise in the saddle to lock it in.", es: "\u00a1Enhorabuena por el pleno! Podemos profundizar en una noci\u00f3n, o te propongo un ejercicio a caballo para afianzarlo.", it: "Complimenti per il punteggio pieno! Possiamo approfondire una nozione, o ti propongo un esercizio in sella per fissare tutto.", ja: "\u6e80\u70b9\u304a\u3081\u3067\u3068\u3046\uff01\u6982\u5ff5\u3092\u6df1\u3081\u308b\u3053\u3068\u3082\u3001\u5b9a\u7740\u306e\u305f\u3081\u306e\u9a0e\u4e57\u7df4\u7fd2\u3092\u63d0\u6848\u3059\u308b\u3053\u3068\u3082\u3067\u304d\u307e\u3059\u3002" , de: "Gl\u00fcckwunsch zu diesem fehlerfreien Ergebnis! Wir k\u00f6nnen ein Konzept vertiefen, oder ich schlage dir eine \u00dcbung im Sattel vor, um es zu festigen.", ar: "\u0623\u062d\u0633\u0646\u062a \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0623\u062f\u0627\u0621 \u0627\u0644\u062e\u0627\u0644\u064a \u0645\u0646 \u0627\u0644\u0623\u062e\u0637\u0627\u0621! \u064a\u0645\u0643\u0646\u0646\u0627 \u0627\u0644\u062a\u0639\u0645\u0642 \u0641\u064a \u0641\u0643\u0631\u0629 \u0645\u0627\u060c \u0623\u0648 \u0623\u0642\u062a\u0631\u062d \u0639\u0644\u064a\u0643 \u062a\u0645\u0631\u064a\u0646\u0627 \u0639\u0644\u0649 \u0627\u0644\u062d\u0635\u0627\u0646 \u0644\u062a\u0631\u0633\u064a\u062e \u0643\u0644 \u0630\u0644\u0643.", zh: "零罚分，太棒了！我们可以深入讲解某个知识点，或者我给你安排一个骑乘练习来巩固这些内容。", nl: "Gefeliciteerd met je foutloze ronde! We kunnen een onderwerp verder uitdiepen, of ik stel je een oefening te paard voor om dit goed te laten bezinken.", pt: "Parabéns por essa prova sem faltas! Podemos aprofundar uma noção, ou posso sugerir um exercício a cavalo para fixar tudo isso.", sv: "Bra jobbat med den felfria rundan! Vi kan fördjupa oss i något begrepp, eller så föreslår jag en övning till häst för att få allt att sitta.", ru: "Браво, без штрафных очков! Можем углубить какую-нибудь тему, или я предложу тебе упражнение в седле, чтобы всё это закрепить.", pl: "Brawo za bezbłędny przejazd! Możemy pogłębić jakieś zagadnienie albo zaproponuję ci ćwiczenie w siodle, żeby to utrwalić.", ko: "무결점 라운드 축하해요! 개념 하나를 더 깊이 살펴봐도 되고, 말 위에서 해 볼 운동을 제안해 줄 수도 있어요."});
            } else if (coursCtx.depuisQuiz) {
                accueil = tr({ fr: "Pas de souci, on reprend ensemble ce qui a coinc\u00e9. Dis-moi la notion qui t'a paru la plus floue, ou choisis ci-dessous.", en: "No worries, let's go back over what tripped you up. Tell me the concept that felt fuzziest, or pick one below.", es: "Sin problema, repasamos juntos lo que se atasc\u00f3. D\u00edme la noci\u00f3n que te result\u00f3 m\u00e1s confusa, o elige abajo.", it: "Nessun problema, riprendiamo insieme ci\u00f2 che ti ha bloccato. Dimmi la nozione che ti \u00e8 sembrata pi\u00f9 confusa, o scegli qui sotto.", ja: "\u5927\u4e08\u592b\u3001\u3064\u307e\u305a\u3044\u305f\u3068\u3053\u308d\u3092\u4e00\u7dd2\u306b\u898b\u76f4\u3057\u307e\u3057\u3087\u3046\u3002\u6700\u3082\u66d6\u6627\u3060\u3063\u305f\u70b9\u3092\u6559\u3048\u3066\u304f\u3060\u3055\u3044\u3002" , de: "Kein Problem, wir gehen gemeinsam durch, was nicht geklappt hat. Sag mir, welches Konzept am unklarsten war, oder w\u00e4hle unten.", ar: "\u0644\u0627 \u0628\u0623\u0633\u060c \u0633\u0646\u0631\u0627\u062c\u0639 \u0645\u0639\u0627 \u0645\u0627 \u0643\u0627\u0646 \u0635\u0639\u0628\u0627. \u0623\u062e\u0628\u0631\u064a\u0646\u064a \u0628\u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u062a\u064a \u0628\u062f\u062a \u0644\u0643 \u0623\u0642\u0644 \u0648\u0636\u0648\u062d\u0627\u060c \u0623\u0648 \u0627\u062e\u062a\u0627\u0631\u064a \u0623\u062f\u0646\u0627\u0647.", zh: "没关系，我们一起把卡住的地方再过一遍。告诉我哪个知识点你觉得最模糊，或者在下面选择。", nl: "Geen zorgen, we lopen samen door wat er mis ging. Vertel me welk onderwerp je het meest onduidelijk vond, of kies hieronder.", pt: "Sem problema, vamos rever juntos o que travou. Diga qual noção te pareceu mais confusa, ou escolha abaixo.", sv: "Ingen fara, vi går igenom det som tog stopp tillsammans. Berätta vilket begrepp som kändes mest luddigt, eller välj nedan.", ru: "Не переживай, давай вместе разберём то, что не получилось. Скажи, какая тема показалась тебе самой туманной, или выбери ниже.", pl: "Nic się nie stało, razem wrócimy do tego, co sprawiło trudność. Powiedz mi, które zagadnienie wydało ci się najmniej jasne, albo wybierz poniżej.", ko: "괜찮아요, 막혔던 부분을 같이 다시 짚어 봐요. 가장 헷갈렸던 개념을 말해 주거나 아래에서 골라 보세요."});
            } else {
                accueil = tr({ fr: "Je peux t'aider \u00e0 approfondir ce chapitre, te proposer un exercice ou r\u00e9pondre \u00e0 une question.", en: "I can help you go deeper into this chapter, suggest an exercise or answer a question.", es: "Puedo ayudarte a profundizar en este cap\u00edtulo, proponerte un ejercicio o responder a una pregunta.", it: "Posso aiutarti ad approfondire questo capitolo, proporti un esercizio o rispondere a una domanda.", ja: "\u3053\u306e\u7ae0\u3092\u6df1\u3081\u305f\u308a\u3001\u7df4\u7fd2\u3092\u63d0\u6848\u3057\u305f\u308a\u3001\u8cea\u554f\u306b\u7b54\u3048\u305f\u308a\u3067\u304d\u307e\u3059\u3002" , de: "Ich kann dir helfen, dieses Kapitel zu vertiefen, eine \u00dcbung vorzuschlagen oder eine Frage zu beantworten.", ar: "\u064a\u0645\u0643\u0646\u0646\u064a \u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u062a\u0639\u0645\u0642 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u0635\u0644\u060c \u0623\u0648 \u0627\u0642\u062a\u0631\u0627\u062d \u062a\u0645\u0631\u064a\u0646\u060c \u0623\u0648 \u0627\u0644\u0625\u062c\u0627\u0628\u0629 \u0639\u0646 \u0633\u0624\u0627\u0644.", zh: "我可以帮你深入理解这一章节、给你安排一个练习，或者回答一个问题。", nl: "Ik kan je helpen dit hoofdstuk verder uit te diepen, een oefening voorstellen of een vraag beantwoorden.", pt: "Posso te ajudar a aprofundar este capítulo, sugerir um exercício ou responder a uma pergunta.", sv: "Jag kan hjälpa dig att fördjupa dig i det här kapitlet, föreslå en övning eller svara på en fråga.", ru: "Я могу помочь тебе углубить эту главу, предложить упражнение или ответить на вопрос.", pl: "Mogę ci pomóc pogłębić ten rozdział, zaproponować ćwiczenie albo odpowiedzieć na pytanie.", ko: "이 챕터를 더 깊이 이해하도록 돕거나, 운동을 제안하거나, 질문에 답해 줄 수 있어요."});
            }
            return [{ role: "assistant", contenu: "\uD83D\uDCD6 " + coursCtx.titre + "\n\n" + accueil, intro: true }];
        }
        return [{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }];
    });
    const [langueInit, setLangueInit] = useState(langue);
    const [saisie, setSaisie] = useState(() => { try { return (coursCtx && coursCtx.question) ? String(coursCtx.question) : ""; } catch (e) { return ""; } });
    useEffect(function () { try { if (typeof window !== "undefined" && window.__hbPrefill != null) { setSaisie(String(window.__hbPrefill)); window.__hbPrefill = null; } } catch (e) { } }, []);
    const [enCours, setEnCours] = useState(false);
    const [questionsPosees, setQuestionsPosees] = useState(() => {
        try {
            const q = JSON.parse(localStorage.getItem("hype_heybaby_quota") || "null");
            const jour = new Date().toISOString().slice(0, 10);
            return (q && q.d === jour) ? (q.n || 0) : 0;
        } catch (e) { return 0; }
    });
    /* 14/10 (livraison A) : LE SERVEUR EST L'AUTORITÉ. quotaIA = { utilisees, limite } lu en base
       (hype_ia_mon_compteur) et après chaque réponse (en-têtes). Le compteur du téléphone ne sert
       plus qu'à l'affichage immédiat tant que le serveur n'a pas répondu (jamais pour bloquer). */
    const [quotaIA, setQuotaIA] = useState(null);
    const rafraichirQuotaIA = () => {
        try {
            if (typeof supa === "undefined" || !supa) return;
            supa.rpc("hype_ia_mon_compteur").then((r) => {
                if (r && !r.error && r.data && typeof r.data.questions === "number") setQuotaIA({ utilisees: r.data.questions, limite: (r.data.limite == null ? null : r.data.limite) });
            }).catch(() => { });
        } catch (e) { }
    };
    useEffect(() => {
        rafraichirQuotaIA();
        const ecoute = (e) => { try { if (e && e.detail) setQuotaIA({ utilisees: e.detail.utilisees, limite: e.detail.limite }); } catch (x) { } };
        window.addEventListener("hype-quota-ia", ecoute);
        return () => window.removeEventListener("hype-quota-ia", ecoute);
    }, []);
    const compterQuestion = () => {
        setQuotaIA((q) => q ? { utilisees: q.utilisees + 1, limite: q.limite } : q);
        setQuestionsPosees((n) => {
            const v = n + 1;
            try { localStorage.setItem("hype_heybaby_quota", JSON.stringify({ d: new Date().toISOString().slice(0, 10), n: v })); } catch (e) { }
            return v;
        });
    };
    const finRef = useRef(null);
    const abortRef = useRef(null);
    const messagesRef = useRef(messages);
    useEffect(() => { messagesRef.current = messages; }, [messages]);
    // Synthèse discrète des fiches en fin de conversation (jamais pendant une réponse).
    // Réutilise le relais assistant.js. Silencieuse, en arrière-plan, sans jamais bloquer l'UI.
    const syntheseFaiteRef = useRef(false);
    const synthetiserFiches = () => {
        try {
            if (syntheseFaiteRef.current) return;
            const msgs = (messagesRef.current || []).filter((m) => !m.intro && (m.contenu || "").trim());
            const echangesUtiles = msgs.filter((m) => m.role === "user").length;
            if (echangesUtiles < 2) return; // pas assez de matière pour apprendre quoi que ce soit
            /* 15/10 : la synthèse partait DEUX fois pour la même conversation (constaté en base le 14/10 :
               23:13:24 et 23:13:31) — chaque passage sur l'écran Hey Baby la relançait en le quittant, même
               sans nouvel échange. On retient la dernière conversation résumée (dernier message du cavalier
               + nombre d'échanges) : sans nouvel échange, pas de nouvel appel. */
            /* signature indépendante de l'ordre d'affichage (l'historique rechargé peut arriver dans un autre ordre) */
            const signature = echangesUtiles + "|" + msgs.filter((m) => m.role === "user").map((m) => String(m.contenu || "").replace(/\s+/g, " ").slice(0, 80)).sort().join("\u241e").slice(0, 1500);
            let dejaFaite = false;
            try { dejaFaite = sessionStorage.getItem("hype_hb_synthese_sig") === signature; } catch (eS) { dejaFaite = window.__hbSyntheseSig === signature; }
            if (dejaFaite) { syntheseFaiteRef.current = true; hbLog("synthèse fiches : déjà faite pour cette conversation"); return; }
            try { sessionStorage.setItem("hype_hb_synthese_sig", signature); } catch (eS) { }
            window.__hbSyntheseSig = signature;
            syntheseFaiteRef.current = true;
            const conv = msgs.slice(-16).map((m) => (m.role === "user" ? "Cavalier" : "Hey Baby") + " : " + String(m.contenu || "").replace(/\s+/g, " ").slice(0, 600)).join("\n");
            const nomsChevaux = (chevaux || []).map((c) => c && c.nom).filter(Boolean).slice(0, 8);
            const ficheCavActuelle = (fichesEcurie && fichesEcurie.cavalier) ? fichesEcurie.cavalier : "(aucune fiche cavalier pour l'instant)";
            /* 14/10 (livraison A) : la consigne de mémoire est écrite par le serveur ; on n'envoie que les données (fiche, noms des chevaux, conversation). */
            const memoireIA = { ficheCavalier: (fichesEcurie && fichesEcurie.cavalier) ? String(fichesEcurie.cavalier) : "", chevaux: nomsChevaux, conversation: msgs.slice(-16).map((m) => ({ role: m.role === "user" ? "user" : "assistant", texte: String(m.contenu || "").replace(/\s+/g, " ").slice(0, 600) })) };
            hypeAppelIA({ operation: "memoire", langue: langue, memoire: memoireIA })
                .then((r) => r.json())
                .then((data) => {
                    let txt = "";
                    try { txt = (data && data.content) ? data.content.map((b) => (b.type === "text" ? b.text : "")).filter(Boolean).join("\n") : (data && data.text) || ""; } catch (eT) { txt = ""; }
                    if (!txt) return;
                    let obj = null;
                    try { const clean = txt.replace(/```json/gi, "").replace(/```/g, "").trim(); const a = clean.indexOf("{"), b = clean.lastIndexOf("}"); obj = JSON.parse(a >= 0 && b > a ? clean.slice(a, b + 1) : clean); } catch (eP) { obj = null; }
                    if (!obj) { hbLog("synthèse fiches : JSON illisible"); return; }
                    if (obj.cavalier && String(obj.cavalier).trim()) { enregistrerFicheCavalier(String(obj.cavalier).trim()).then(() => hbLog("fiche cavalier mise à jour")).catch(() => { }); }
                    if (Array.isArray(obj.chevaux)) {
                        obj.chevaux.forEach((c) => {
                            if (!c || !c.nom || !c.fiche || !String(c.fiche).trim()) return;
                            const match = (chevaux || []).filter((cv) => cv && cv.nom && String(cv.nom).toLowerCase() === String(c.nom).toLowerCase())[0];
                            const slug = match ? (match.id || match.nom) : c.nom;
                            enregistrerFicheCheval(slug, c.nom, String(c.fiche).trim()).then(() => hbLog("fiche cheval mise à jour :", c.nom)).catch(() => { });
                        });
                    }
                })
                .catch((e) => { hbLog("synthèse fiches échouée :", e && e.message); });
        } catch (e) { }
    };
    const [imageJointe, setImageJointe] = useState(null);
    const [histoOuvert, setHistoOuvert] = useState(false);
    const [epingleCible, setEpingleCible] = useState(null);
    /* 26/09 (396) - BOUTON « CORRIGER », ETAPE 3 : reserve aux moderatrices (fonction SQL
       hype_est_moderatrice, la meme que la base utilise pour autoriser l ecriture ; repli sur le
       compte de Blandine si l appel echoue). La correction est ecrite dans heybaby_corrections et
       ajoutee tout de suite a HB_CORRECTIONS : elle s applique des la question suivante. */
    const [estModoHB, setEstModoHB] = useState(false);
    const [corrCible, setCorrCible] = useState(null);
    /* 26/09 (397) - ETAPE 4 : LA LISTE DES CORRECTIONS, dans la meme fenetre (lien « Toutes les corrections »).
       Desactiver / reactiver (colonne actif) et supprimer (deux touchers). Apres chaque changement,
       HB_CORRECTIONS est relue : l effet est immediat pour la suite de la conversation. */
    const [corrListe, setCorrListe] = useState(null);
    const chargerListeCorrections = async () => {
        setCorrListe({ chargement: true, lignes: [], erreur: "", aSupprimer: null });
        try {
            const r = await supa.from("heybaby_corrections").select("id, texte, actif, created_at").order("created_at", { ascending: false }).limit(100);
            if (r && r.error) { setCorrListe({ chargement: false, lignes: [], erreur: "Lecture impossible : " + (r.error.message || "erreur inconnue"), aSupprimer: null }); return; }
            setCorrListe({ chargement: false, lignes: (r && r.data) || [], erreur: "", aSupprimer: null });
        } catch (eL) { setCorrListe({ chargement: false, lignes: [], erreur: "Lecture impossible : " + ((eL && eL.message) || String(eL)), aSupprimer: null }); }
    };
    const basculerCorrection = async (ligne) => {
        try {
            const r = await supa.from("heybaby_corrections").update({ actif: !ligne.actif }).eq("id", ligne.id).select("id");
            if (r && r.error) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non modifiée : " + (r.error.message || "erreur inconnue") })); return; }
            if (!r || !r.data || !r.data.length) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non modifiée : droits de modératrice refusés par la base." })); return; }
            await chargerCorrectionsHB(); await chargerListeCorrections();
        } catch (eB) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non modifiée : " + ((eB && eB.message) || String(eB)) })); }
    };
    const supprimerCorrection = async (ligne) => {
        try {
            const r = await supa.from("heybaby_corrections").delete().eq("id", ligne.id).select("id");
            if (r && r.error) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non supprimée : " + (r.error.message || "erreur inconnue"), aSupprimer: null })); return; }
            if (!r || !r.data || !r.data.length) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non supprimée : droits de modératrice refusés par la base.", aSupprimer: null })); return; }
            await chargerCorrectionsHB(); await chargerListeCorrections();
        } catch (eS) { setCorrListe((l) => ({ ...(l || {}), erreur: "Non supprimée : " + ((eS && eS.message) || String(eS)), aSupprimer: null })); }
    };
    useEffect(() => {
        let vif = true;
        (async () => {
            try {
                const r = await supa.rpc("hype_est_moderatrice");
                if (vif && r && !r.error && r.data === true) { setEstModoHB(true); return; }
            } catch (eM) { }
            try {
                const sM = await supa.auth.getSession();
                const uM = sM && sM.data && sM.data.session && sM.data.session.user;
                if (vif && typeof estCompteFeinnHype === "function" && estCompteFeinnHype(uM)) setEstModoHB(true);
            } catch (eM2) { }
        })();
        return () => { vif = false; };
    }, []);
    const ouvrirCorrection = (i) => {
        let q = "";
        for (let j = i - 1; j >= 0; j--) { if (messages[j] && messages[j].role === "user") { q = messages[j].contenu || ""; break; } }
        setCorrCible({ question: q, reponse: String((messages[i] && messages[i].contenu) || ""), texte: "", envoi: false, erreur: "", ok: false });
    };
    const enregistrerCorrection = async () => {
        const c = corrCible; if (!c) return;
        const texte = String(c.texte || "").trim();
        if (texte.length < 3) { setCorrCible({ ...c, erreur: "Écris au moins quelques mots." }); return; }
        if (texte.length > 500) { setCorrCible({ ...c, erreur: "500 caractères au maximum (" + texte.length + ")." }); return; }
        setCorrCible({ ...c, envoi: true, erreur: "" });
        try {
            const r = await supa.from("heybaby_corrections").insert({ texte: texte, question: String(c.question || "").slice(0, 1000), reponse_extrait: String(c.reponse || "").replace(/\u0000HEYBABY_ERROR:[^\u0000]*\u0000/g, "").slice(0, 1500) });
            if (r && r.error) { setCorrCible({ ...c, envoi: false, erreur: "Non enregistrée : " + (r.error.message || "erreur inconnue") }); return; }
            try { HB_CORRECTIONS.push(texte); } catch (eP) { }
            setCorrCible({ ...c, envoi: false, ok: true, erreur: "" });
        } catch (eI) { setCorrCible({ ...c, envoi: false, erreur: "Non enregistrée : " + ((eI && eI.message) || String(eI)) }); }
    };
    /* 16/09 (206) : les cavalieres de ses DEUX ecuries, pour la seconde etape de l epinglage.
       Chargees UNE SEULE FOIS, et seulement quand cette etape s ouvre : poser une question a
       Hey Baby ne doit rien couter de plus. Meme helper et meme liste de colonnes EXPLICITE
       que l ecran d un conseil (son defaut renvoyait une liste vide en silence). */
    const [cavEpListe, setCavEpListe] = useState(null);
    /* 16/09 (207) : LES CHEVAUX DE L ECURIE, PAS SEULEMENT LES SIENS. Ses mots : « il faut
       que je puisse epingler sur d autres chevaux que les miens en tant que coach », puis
       « les gens ne montent pas que le cheval dont ils sont proprietaires sinon les clubs
       n existeraient pas ». C est vrai pour TOUTE cavaliere, pas seulement pour elle.
       AUCUNE REGLE DE SECURITE TOUCHEE : la page du club montre deja ces chevaux a ses
       membres. Le chantier du PARTAGE des epingles (epingle visible par tous, epingle taguee
       qui apparait chez la cavaliere) est un AUTRE chantier, non commence : il demande
       d ouvrir les politiques de lecture, et quatre decisions lui ont ete posees.
       Meme chemin que la page du club : les cavalieres des ecuries, puis les chevaux
       enregistres sous leurs comptes. Charge SEULEMENT quand la fenetre d epinglage s ouvre. */
    const [chevauxEcurie, setChevauxEcurie] = useState(null);
    /* 16/09 (211) : LES THEMES. Liste FERMEE, et ce qui part en base est la CLE
       (« travail_pied »), jamais le libelle traduit - c est exactement l erreur de
       `discipline` dans les seances, enregistree dans la langue de saisie et donc
       inexploitable comme filtre. L interface traduit la cle a l affichage.
       AUCUNE CLASSIFICATION AUTOMATIQUE : le theme ne vient que d un toucher. */

    /* 16/09 (213) : PLUSIEURS THEMES par epingle, sa demande. Un tableau, pas une valeur. */
    const [themesEp, setThemesEp] = useState([]);
    const basculerTheme = (cle) => {
        setThemesEp((av) => {
            const l = (av || []).slice();
            const i = l.indexOf(cle);
            if (i === -1) l.push(cle); else l.splice(i, 1);
            return l;
        });
    };
    useEffect(() => {
        if (!epingleCible || epingleCible.paywall || epingleCible.limite || chevauxEcurie !== null) return;
        let vif = true;
        (async () => {
            try {
                if (typeof supa === "undefined" || !supa) { if (vif) setChevauxEcurie([]); return; }
                const pf = profil || {};
                const clubs = [];
                const c1 = String(pf.club || pf.ecurie || "").trim();
                const c2 = String(pf.club2 || pf.ecurie2 || "").trim();
                if (c1) clubs.push(c1);
                if (c2 && c2.toLowerCase() !== c1.toLowerCase()) clubs.push(c2);
                if (!clubs.length || typeof hypeCavaliersDuClub !== "function") { if (vif) setChevauxEcurie([]); return; }
                /* ⚠️ LA LISTE DE COLONNES DOIT CONTENIR CE DONT LE HELPER A BESOIN POUR
                   FILTRER : il lit `ecurie` ET `ecurie2` pour decider qui est du club. Les
                   omettre renvoie une liste VIDE, en silence - le piege exact du 189. */
                const vusP = {}; const ids = [];
                for (let i = 0; i < clubs.length; i++) {
                    const l = await hypeCavaliersDuClub(clubs[i], "id, pseudo, ecurie, ecurie2");
                    (l || []).forEach((pr) => { if (!pr || !pr.id || vusP[pr.id]) return; vusP[pr.id] = true; ids.push(pr.id); });
                }
                if (!ids.length) { if (vif) setChevauxEcurie([]); return; }
                const rc = await supa.from("chevaux").select("id, nom").in("user_id", ids).is("supprime_le", null).limit(500);
                if (!vif) return;
                if (rc && rc.error) { setChevauxEcurie([]); return; }
                const miens = {};
                (chevaux || []).forEach((cv) => { if (cv && cv.id) miens[String(cv.id)] = true; });
                const autres = ((rc && rc.data) || [])
                    .filter((cv) => cv && cv.id && cv.nom && !miens[String(cv.id)])
                    .map((cv) => ({ id: cv.id, nom: cv.nom }));
                autres.sort((a, b) => String(a.nom || "").localeCompare(String(b.nom || "")));
                setChevauxEcurie(autres);
            } catch (eCe2) { if (vif) setChevauxEcurie([]); }
        })();
        return () => { vif = false; };
    }, [!!epingleCible]);
    useEffect(() => {
        if (!epingleCible || !epingleCible.etapeCav || cavEpListe !== null) return;
        let vif = true;
        (async () => {
            try {
                const pf = profil || {};
                const clubs = [];
                const c1 = String(pf.club || pf.ecurie || "").trim();
                const c2 = String(pf.club2 || pf.ecurie2 || "").trim();
                if (c1) clubs.push(c1);
                if (c2 && c2.toLowerCase() !== c1.toLowerCase()) clubs.push(c2);
                if (!clubs.length || typeof hypeCavaliersDuClub !== "function") { if (vif) setCavEpListe([]); return; }
                const vus = {}, tous = [];
                for (let i = 0; i < clubs.length; i++) {
                    const l = await hypeCavaliersDuClub(clubs[i], "id, pseudo, avatar_url");
                    (l || []).forEach((pr) => { if (!pr || !pr.id || vus[pr.id]) return; vus[pr.id] = true; tous.push(pr); });
                }
                tous.sort((a, b) => String(a.pseudo || "").localeCompare(String(b.pseudo || "")));
                if (vif) setCavEpListe(tous);
            } catch (eCe) { if (vif) setCavEpListe([]); }
        })();
        return () => { vif = false; };
    }, [epingleCible && epingleCible.etapeCav]);
    const [conversationId, setConversationId] = useState(() => obtenirConversationHB());
    const [toastHB, setToastHB] = useState(null);
    const fichierRef = useRef(null);
    const [memoireHB, setMemoireHB] = useState("");
    const [fichesEcurie, setFichesEcurie] = useState({ cavalier: "", chevaux: {} });
    /* 26/09 (401) : la memoire d ecurie lue AU MOMENT de la redaction (une reprise juste apres l ouverture
       de l ecran partait sinon avec une memoire encore vide). */
    const contexteHBRef = useRef({ memoireHB: "", fichesEcurie: null });
    contexteHBRef.current = { memoireHB: memoireHB, fichesEcurie: fichesEcurie };
    const envoyerRef = useRef(null);
    const rechargerMemoireHB = () => { try { chargerMemoireChevaux(30).then((r) => { if (!r || !r.data || !r.data.length) return; const lg = r.data.map((m) => "\u2022 [" + String(m.created_at || "").slice(0, 10) + "] " + (m.cheval_nom || m.cheval_slug) + " (" + m.type + ") : " + String(m.contenu || "").replace(/\s+/g, " ").slice(0, 350)).join("\n"); setMemoireHB(lg); }).catch(() => { }); } catch (e) { } };
    const rechargerFichesEcurie = () => { try { chargerFichesEcurie().then((f) => { if (f) setFichesEcurie(f); }).catch(() => { }); } catch (e) { } };
    useEffect(() => { rechargerMemoireHB(); rechargerFichesEcurie(); try { chargerCorrectionsHB(); } catch (eCo) { } }, []);
    const [framesVideo, setFramesVideo] = useState(null);
    const [extractionVideo, setExtractionVideo] = useState(false);
    // Corrige l'orientation EXIF, limite la résolution seulement si nécessaire (assez grande pour
    // voir mains/jambes/étriers/regard/attitude du cheval), et journalise le diagnostic avant/après.
    const traiterPhotoHeyBaby = (fichier) => new Promise(async (resoudre, rejeter) => {
        try {
            const poidsOrigine = fichier.size;
            let bitmap;
            try { bitmap = await createImageBitmap(fichier, { imageOrientation: "from-image" }); }
            catch (e1) { try { bitmap = await createImageBitmap(fichier); } catch (e2) { rejeter(e2); return; } }
            const lo = bitmap.width, ho = bitmap.height;
            const MAX_COTE = 2048; // résolution suffisante pour l'analyse technique, pas une miniature
            const grand = Math.max(lo, ho);
            const echelle = Math.min(1, MAX_COTE / grand);
            const w = Math.max(1, Math.round(lo * echelle)), h = Math.max(1, Math.round(ho * echelle));
            const canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            const cctx = canvas.getContext("2d");
            cctx.drawImage(bitmap, 0, 0, w, h);
            try { bitmap.close(); } catch (e3) { }
            const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
            hbLog("photo traitée", { dimensionsOrigine: lo + "x" + ho, dimensionsEnvoyees: w + "x" + h, poidsOrigineKo: Math.round(poidsOrigine / 1024), poidsEnvoyeKo: Math.round(dataUrl.length * 0.75 / 1024), redimensionnee: echelle < 1, orientationExifCorrigee: true });
            resoudre(dataUrl);
        } catch (e) { rejeter(e); }
    });
    const choisirImage = (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!f) return;
        if (!HEYBABY_ANALYSE_VISUELLE) {
            // Analyse photo/vidéo temporairement désactivée : message honnête, aucun envoi.
            setMessages((prev) => [...prev, { role: "assistant", contenu: tr({ fr: "L'analyse photo et vidéo est en cours d'amélioration — elle revient bientôt, encore plus précise ! En attendant, pose-moi toutes tes questions sur les Galops, le matériel, les soins ou la théorie. 🐴", en: "Photo and video analysis is being improved — it'll be back soon, even more accurate! In the meantime, ask me anything about the Galops, tack, horse care or theory. 🐴", es: "El análisis de fotos y vídeos está en proceso de mejora — ¡volverá pronto, aún más preciso! Mientras tanto, pregúntame lo que quieras sobre los Galopes, el material, los cuidados o la teoría. 🐴", it: "L'analisi di foto e video è in fase di miglioramento — tornerà presto, ancora più precisa! Nel frattempo, chiedimi tutto quello che vuoi sui Galoppi, l'attrezzatura, le cure o la teoria. 🐴", ja: "写真・動画分析は現在改善中です——まもなく、より正確になって戻ってきます！それまでは、ギャロップ、馬具、お手入れ、理論について何でも聞いてください。🐴", de: "Die Foto- und Videoanalyse wird gerade verbessert — sie kommt bald zurück, noch präziser! Frag mich in der Zwischenzeit alles über die Galops, die Ausrüstung, die Pflege oder die Theorie. 🐴", ar: "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0642\u064a\u062f \u0627\u0644\u062a\u062d\u0633\u064a\u0646 \u2014 \u0633\u064a\u0639\u0648\u062f \u0642\u0631\u064a\u0628\u0627 \u0628\u062f\u0642\u0629 \u0623\u0643\u0628\u0631! \u0641\u064a \u0627\u0644\u0623\u062b\u0646\u0627\u0621\u060c \u0627\u0637\u0631\u062d\u064a \u0639\u0644\u064a \u0643\u0644 \u0623\u0633\u0626\u0644\u062a\u0643 \u0639\u0646 \u0627\u0644\u063a\u0627\u0644\u0648\u0628 \u0648\u0627\u0644\u0645\u0639\u062f\u0627\u062a \u0648\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0648\u0627\u0644\u0646\u0638\u0631\u064a\u0629. \ud83d\udc34", zh: "照片和视频分析正在改进中——很快就会回来，而且会更精准！在此期间，你可以向我提问任何关于 Galop 等级、装备、护理或理论的问题。🐴", nl: "De foto- en video-analyse wordt verbeterd — hij komt snel terug, nog nauwkeuriger! Stel me in de tussentijd al je vragen over de Galop-niveaus, materiaal, verzorging of theorie. 🐴", pt: "A análise de foto e vídeo está sendo aprimorada — ela volta em breve, ainda mais precisa! Enquanto isso, pergunte o que quiser sobre os Galops, o equipamento, os cuidados ou a teoria. 🐴", sv: "Foto- och videoanalysen förbättras just nu — den kommer snart tillbaka, ännu mer exakt! Under tiden kan du ställa alla dina frågor om Galop-nivåerna, utrustning, skötsel eller teori. 🐴", ru: "Анализ фото и видео сейчас дорабатывается — он скоро вернётся, ещё точнее! А пока задавай мне любые вопросы об уровнях Galop, снаряжении, уходе или теории. 🐴", pl: "Analiza zdjęć i wideo jest w trakcie ulepszania — wkrótce wróci, jeszcze dokładniejsza! Tymczasem zadawaj mi wszystkie pytania o poziomy Galop, sprzęt, opiekę nad koniem albo teorię. 🐴", ko: "사진과 영상 분석을 개선하는 중이에요. 더 정확해져서 곧 돌아올게요! 그동안은 Galop 단계, 장구, 케어, 이론에 대해 뭐든 물어보세요. 🐴" }) }]);
            return;
        }
        if (typeof estFichierVideo === "function" && estFichierVideo(f)) {
            setImageJointe(null); setFramesVideo(null); setExtractionVideo(true);
            hbLog("vidéo choisie", { nom: f.name, taille: f.size, type: f.type });
            extraireFramesVideo(f, { maxCote: 1280, qualite: 0.8 })
                .then((frames) => { setFramesVideo(frames); setImageJointe(frames[0].data); hbLog("images extraites de la vidéo :", frames.length, frames.map((fr) => fr.t)); })
                .catch((err) => { hbLog("échec extraction vidéo :", err && err.message); setToastHB(tr({ fr: "Impossible de lire cette vidéo 😕", en: "Couldn't read this video 😕", es: "No se pudo leer este vídeo 😕", it: "Impossibile leggere questo video 😕", ja: "この動画を読み込めませんでした 😕" , de: "Dieses Video konnte nicht gelesen werden 😕", ar: "\u062a\u0639\u0630\u0631 \u062a\u0634\u063a\u064a\u0644 \u0647\u0630\u0627 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \ud83d\ude15", zh: "无法读取这段视频 😕", nl: "Deze video kan niet worden gelezen 😕", pt: "Não foi possível ler este vídeo 😕", sv: "Det gick inte att läsa den här videon 😕", ru: "Не удалось прочитать это видео 😕", pl: "Nie można odczytać tego wideo 😕", ko: "이 영상을 읽을 수 없어요 😕"})); setTimeout(() => setToastHB(null), 2600); })
                .finally(() => setExtractionVideo(false));
            return;
        }
        setFramesVideo(null);
        const poursuivrePhoto = () => {
            traiterPhotoHeyBaby(f)
                .then((dataUrl) => setImageJointe(dataUrl))
                .catch((err) => {
                    hbLog("traitement photo échoué, envoi brut en repli :", err && err.message);
                    const r = new FileReader(); r.onload = () => setImageJointe(r.result); r.readAsDataURL(f);
                });
        };
        if (HEYBABY_PHOTO_MAINTENANCE) {
            /* 26/09 (392) : maintenance des photos, sauf pour le compte de Blandine (essais). */
            const annoncerMaintenance = () => setMessages((prev) => [...prev, { role: "assistant", contenu: tr({ fr: "L'analyse de photos est momentanément en maintenance : on la rend plus précise. En attendant, pose-moi toutes tes questions sur les Galops, le matériel, les soins ou la théorie. \uD83D\uDC34", en: "Photo analysis is temporarily under maintenance while we make it more accurate. In the meantime, ask me anything about the Galops, tack, care or theory. \uD83D\uDC34", es: "El an\u00e1lisis de fotos est\u00e1 moment\u00e1neamente en mantenimiento: lo estamos haciendo m\u00e1s preciso. Mientras tanto, preg\u00fantame lo que quieras sobre los Galops, el equipo, los cuidados o la teor\u00eda. \uD83D\uDC34", it: "L'analisi delle foto \u00e8 momentaneamente in manutenzione: la stiamo rendendo pi\u00f9 precisa. Nel frattempo, chiedimi tutto sui Galop, l'attrezzatura, le cure o la teoria. \uD83D\uDC34", ja: "\u5199\u771f\u5206\u6790\u306f\u73fe\u5728\u30e1\u30f3\u30c6\u30ca\u30f3\u30b9\u4e2d\u3067\u3059\u3002\u3088\u308a\u6b63\u78ba\u306b\u306a\u308b\u3088\u3046\u6539\u826f\u3057\u3066\u3044\u307e\u3059\u3002\u305d\u306e\u9593\u3001\u30ae\u30e3\u30ed\u30c3\u30d7\u3001\u99ac\u5177\u3001\u30b1\u30a2\u3001\u7406\u8ad6\u306b\u3064\u3044\u3066\u4f55\u3067\u3082\u805e\u3044\u3066\u306d\u3002 \uD83D\uDC34", de: "Die Fotoanalyse ist vor\u00fcbergehend in Wartung, damit sie genauer wird. Frag mich in der Zwischenzeit alles zu den Galops, zur Ausr\u00fcstung, zur Pflege oder zur Theorie. \uD83D\uDC34", ar: "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0635\u0648\u0631 \u0642\u064a\u062f \u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0645\u0624\u0642\u062a\u0627 \u0644\u062c\u0639\u0644\u0647 \u0623\u062f\u0642. \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0623\u062b\u0646\u0627\u0621\u060c \u0627\u0633\u0623\u0644\u064a\u0646\u064a \u0645\u0627 \u062a\u0634\u0627\u0626\u064a\u0646 \u0639\u0646 \u0627\u0644\u063a\u0627\u0644\u0648\u0628 \u0648\u0627\u0644\u0645\u0639\u062f\u0627\u062a \u0648\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0648\u0627\u0644\u0646\u0638\u0631\u064a\u0629. \uD83D\uDC34", zh: "照片分析暂时在维护中：我们正在让它更精准。在此期间，你可以向我提问任何关于 Galop 等级、装备、护理或理论的问题。🐴", nl: "De foto-analyse is tijdelijk in onderhoud: we maken hem nauwkeuriger. Stel me in de tussentijd al je vragen over de Galop-niveaus, materiaal, verzorging of theorie. 🐴", pt: "A análise de fotos está temporariamente em manutenção: estamos deixando ela mais precisa. Enquanto isso, pergunte o que quiser sobre os Galops, o equipamento, os cuidados ou a teoria. 🐴", sv: "Fotoanalysen är tillfälligt under underhåll: vi gör den mer exakt. Under tiden kan du ställa alla dina frågor om Galop-nivåerna, utrustning, skötsel eller teori. 🐴", ru: "Анализ фото временно на обслуживании: мы делаем его точнее. А пока задавай мне любые вопросы об уровнях Galop, снаряжении, уходе или теории. 🐴", pl: "Analiza zdjęć jest chwilowo w konserwacji: robimy ją dokładniejszą. Tymczasem zadawaj mi wszystkie pytania o poziomy Galop, sprzęt, opiekę nad koniem albo teorię. 🐴", ko: "사진 분석은 더 정확하게 만드는 동안 잠시 점검 중이에요. 그동안은 Galop 단계, 장구, 케어, 이론에 대해 뭐든 물어보세요. 🐴" }) }]);
            try {
                if (typeof supa === "undefined" || !supa || !supa.auth || typeof estCompteFeinnHype !== "function") { annoncerMaintenance(); return; }
                supa.auth.getSession().then((r) => {
                    const u = r && r.data && r.data.session && r.data.session.user;
                    if (estCompteFeinnHype(u)) poursuivrePhoto(); else annoncerMaintenance();
                }).catch(() => annoncerMaintenance());
            } catch (eMt) { annoncerMaintenance(); }
            return;
        }
        poursuivrePhoto();
    };
    // Réinitialise le message d'intro si la langue change avant toute question posée
    useEffect(() => {
        if (!coursCtx && langue !== langueInit && messages.length === 1) {
            setMessages([{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }]);
            setLangueInit(langue);
        }
    }, [langue]);
    // Coupe proprement la requête en cours si on quitte l'écran
    useEffect(() => { return () => { try { synthetiserFiches(); } catch (e) { } try { if (abortRef.current) { abortRef.current.hbUnmount = true; /* 26/09 (401) : on quitte l ecran, le job reste note pour la reprise */ abortRef.current.abort("unmount"); } } catch (e) { } }; }, []);
    /* 26/09 (401) : reprise d une analyse photo laissee en attente (appelee apres le chargement de l historique,
       pour que la bulle « J analyse » se pose a la fin de la conversation). */
    /* 21/10 (option A) : renvoie la question restee sur le telephone faute de reseau (une seule, la derniere, 24 h max). */
    const renvoyerAttenteHB = () => {
        try {
            if (typeof navigator !== "undefined" && navigator.onLine === false) return;
            const brut = localStorage.getItem(HEYBABY_ENVOI_CLE); if (!brut) return;
            const q = JSON.parse(brut);
            if (!q || !q.question || Date.now() - (Number(q.t0) || 0) > 24 * 3600 * 1000) { localStorage.removeItem(HEYBABY_ENVOI_CLE); return; }
            if (q.conversationId && conversationId && String(q.conversationId) !== String(conversationId)) return;
            if (envoyerRef.current) envoyerRef.current(String(q.question), { renvoi: q });
        } catch (eRv) { }
    };
    const renvoyerAttenteRef = useRef(renvoyerAttenteHB); renvoyerAttenteRef.current = renvoyerAttenteHB;
    useEffect(() => {
        const f = () => { try { if (!document.hidden) renvoyerAttenteRef.current(); } catch (e) { } };
        window.addEventListener("online", f); document.addEventListener("visibilitychange", f);
        return () => { window.removeEventListener("online", f); document.removeEventListener("visibilitychange", f); };
    }, []);
    const reprendreJobHB = () => {
        try {
            const brut = localStorage.getItem(HEYBABY_JOB_CLE);
            if (!brut) return;
            const job = JSON.parse(brut);
            if (!job || !job.jobId) { localStorage.removeItem(HEYBABY_JOB_CLE); return; }
            if (Date.now() - (Number(job.t0) || 0) > HEYBABY_REPRISE_MAX_MS) { hbLog("analyse en attente trop ancienne, abandonnee :", job.jobId); localStorage.removeItem(HEYBABY_JOB_CLE); return; }
            if (job.conversationId && conversationId && String(job.conversationId) !== String(conversationId)) { hbLog("analyse en attente d une autre conversation, ignoree :", job.jobId); return; }
            hbLog("reprise de l analyse en attente :", job.jobId);
            if (envoyerRef.current) envoyerRef.current(String(job.question || ""), { reprise: job });
        } catch (eRj) { }
    };
    // Historique : recharge la conversation depuis Supabase \u00e0 l'ouverture
    useEffect(() => {
        let actif = true;
        const suite = () => { if (!actif) return; try { reprendreJobHB(); } catch (eS) { } try { setTimeout(renvoyerAttenteHB, 800); } catch (eRa) { } }; /* 26/09 (401) ; 21/10 : + question en attente d envoi */
        if (coursCtx && !hbChoixRef.current) { suite(); return () => { actif = false; }; } // arrivée depuis un cours : accueil + suggestions du chapitre restent visibles
        try {
            chargerConversationHB(30, conversationId).then((r) => {
                if (!actif) return;
                if (r && r.data && r.data.length) {
                    const anciens = r.data.map((m) => ({ role: m.role, contenu: m.contenu || "", imageMarque: !!m.avec_image, imageVue: m.image_url || null }));   /* 21/10 : photo gardee */
                    setMessages((prev) => (prev.length <= 1 ? [prev[0], ...anciens] : prev));
                }
                suite();
            }).catch(() => { suite(); });
        } catch (e) { suite(); }
        return () => { actif = false; };
    }, [conversationId]);
    const LIMITE_JOUR = planAbo === "duo" ? 20 : planAbo === "ai" ? 15 : (premium ? 4 : 1); /* questions Hey Baby par jour : 1 gratuit, 4 Premium, 15 Hype IA, 20 Duo */
    const limiteAffichee = (quotaIA && quotaIA.limite != null) ? quotaIA.limite : LIMITE_JOUR;
    const questionsUtilisees = quotaIA ? quotaIA.utilisees : questionsPosees;
    const limiteAtteinte = !estModoHB && (quotaIA ? (quotaIA.limite != null && quotaIA.utilisees >= quotaIA.limite) : questionsPosees >= LIMITE_JOUR); /* 26/09 (399) : aucune limite pour les moderatrices */
    /* 21/10 : le défilement vers le bas se fait dans la zone des messages (voir hbScrollRef) */
    const arreter = () => { try { if (abortRef.current) { hbLog("arrêt demandé par le cavalier"); abortRef.current.abort("stop"); } } catch (e) { } };
    const TXT = (fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) => tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko });
    /* 19/08/2026 (décision de Blandine) — PLAFONDS D'ÉPINGLES RELEVÉS.
       Avant : 4 à vie pour un Premium, aucun plafond pour ai/duo. Le 4 était
       hors de proportion (un Premium pose ~120 questions par mois) et ne
       protégeait rien : une épingle est une ligne de texte, la réponse IA est
       déjà générée et payée au moment de la question. Les plans ai et duo
       reçoivent un plafond haut là où ils n'en avaient aucun — volontaire,
       pour garder une borne. Ce sont des totaux À VIE, pas des quotas
       périodiques : compterEpinglesHB ne filtre sur aucune date. */
    const PLAFOND_DUO = 80;
    const LIMITE_EPINGLES = planAbo === "duo" ? PLAFOND_DUO : planAbo === "ai" ? 50 : 20;
    /* 🟥 14/09 — LA LISTE PROPOSEE A L'EPINGLAGE ETAIT CELLE DES CHEVAUX DE DEMO.
       Elle etait construite sur CHEVAUX_FICHE, la vieille liste en dur : les VRAIS
       chevaux n'ont jamais ete proposes, et `cheval_id` a donc enregistre des
       surnoms de demo pendant des mois. Releve en base le 14/09 :
       heybaby 44, rizotto 3, idao 3, null 5 — AUCUN identifiant reel.
       Consequence : la page Sante, qui cherche par identifiant, ne trouvait rien.
       Desormais on propose `chevaux` (les lignes reelles de la table, servies par
       useApp, donc avec leur id uuid). Le repli sur CHEVAUX_FICHE est SUPPRIME et
       non remplace : si la liste n'est pas encore chargee, on ne propose aucun
       cheval plutot que de reecrire un faux identifiant. Le bouton « sans cheval »
       existe deja a cote. */
    const chevauxCibles = (chevaux || [])
        .filter((cv) => cv && cv.id && cv.nom)
        .map((cv) => ({ id: cv.id, nom: cv.nom }));
    const ouvrirEpingle = (i) => {
        if (!premium && planAbo !== "ai" && planAbo !== "duo") { setEpingleCible({ paywall: true }); return; }
        let q = "";
        for (let j = i - 1; j >= 0; j--) { if (messages[j] && messages[j].role === "user") { q = messages[j].contenu || ""; break; } }
        setEpingleCible({ question: q, reponse: messages[i].contenu || "" });
    };
    /* 16/09 (206) : APRES le cheval, ON DEMANDE POUR QUI. Sa demande : elle est monitrice et
       epingle des conseils POUR ses cavalieres. Le choix du cheval ne change pas d un pouce ;
       il mene maintenant a une seconde etape au lieu d ecrire tout de suite. Cette etape est
       FACULTATIVE : « Personne » epingle comme avant. */
    const choisirChevalEpingle = (chevalId, chevalNom) => {
        /* 16/09 (211) : le theme repart A VIDE a chaque epinglage. Garder le dernier choisi
           ferait enregistrer « Saut » sur un conseil de sante sans qu elle s en apercoive. */
        setThemesEp([]);
        const cible = epingleCible || {};
        setEpingleCible({ question: cible.question, reponse: cible.reponse, chevalId: chevalId || null, chevalNom: chevalNom || null, etapeCav: true });
    };
    const validerEpingle = async (chevalId, chevalNom, cavalierId, cavalierNom) => {
        try {
            const r0 = await compterEpinglesHB();
            if ((r0.count || 0) >= LIMITE_EPINGLES) { setEpingleCible({ limite: true, plafond: LIMITE_EPINGLES }); return; }
            const cible = epingleCible || {};
            const r = await epinglerEchangeHB({ question: cible.question, reponse: cible.reponse, chevalId: chevalId, chevalNom: chevalNom, cavalierId: cavalierId, cavalierNom: cavalierNom });
            /* 16/09 (211) : LE THEME EST ECRIT APRES L EPINGLE, ET SON ECHEC NE PERD JAMAIS
               L EPINGLE - meme regle que le lien conseil/seance du carnet. Un theme vide
               n ecrit RIEN : pas de ligne d etat inutile, et l epingle restera dans « Tous ». */
            try {
                const idEp = (r && r.data && r.data.id) ? r.data.id : null;
                if (idEp && themesEp && themesEp.length) {
                    const u2 = await utilisateurActuel();
                    if (u2 && u2.id) {
                        /* La colonne est un tableau depuis le 16/09 : on envoie le tableau tel
                           quel. Aucun theme choisi => on n ecrit RIEN, pas de ligne inutile. */
                        await supa.from("carnet_conseils_etat")
                            .upsert({ user_id: u2.id, epingle_id: idEp, theme: themesEp }, { onConflict: "user_id,epingle_id" });
                    }
                }
            } catch (eTh) { }
            setEpingleCible(null);
            /* 19/08/2026 (demande de Blandine) — AVERTISSEMENT AVANT LE PLAFOND.
               Le compte est déjà fait juste au-dessus (r0) : aucune requête en
               plus. À partir de 5 épingles restantes, le bandeau annonce le
               décompte et, pour tout plan sous Duo, l'existence d'un plafond
               plus haut. Un abonné Duo étant au sommet, il ne voit que le
               décompte. Le bandeau passe alors à deux lignes et reste 4 s au
               lieu de 2,4 s, sinon la seconde ligne n'a pas le temps d'être lue. */
            var restantes = LIMITE_EPINGLES - ((r0.count || 0) + 1);
            if (r && r.error) {
                setToastHB(TXT("Connecte-toi pour \u00e9pingler", "Sign in to pin", "Con\u00e9ctate para fijar", "Accedi per fissare", "\u30d4\u30f3\u7559\u3081\u306b\u306f\u30ed\u30b0\u30a4\u30f3\u304c\u5fc5\u8981\u3067\u3059", "Zum Anheften bitte anmelden", "سجلي الدخول للتثبيت", "登录后才能置顶", "Log in om vast te zetten", "Entre para fixar", "Logga in för att fästa", "Войди, чтобы закрепить", "Zaloguj się, aby przypiąć", "고정하려면 로그인하세요"));
                setTimeout(() => setToastHB(null), 2400);
            } else if (restantes <= 5) {
                var l1 = restantes <= 0
                    ? TXT("Conseil \u00e9pingl\u00e9 \u2713 \u2014 c'\u00e9tait la derni\u00e8re sur " + LIMITE_EPINGLES, "Advice pinned \u2713 \u2014 that was the last of " + LIMITE_EPINGLES, "Consejo fijado \u2713 \u2014 era el \u00faltimo de " + LIMITE_EPINGLES, "Consiglio fissato \u2713 \u2014 era l'ultimo su " + LIMITE_EPINGLES, "\u30a2\u30c9\u30d0\u30a4\u30b9\u3092\u30d4\u30f3\u7559\u3081\u3057\u307e\u3057\u305f \u2713 \u2014 " + LIMITE_EPINGLES + "\u4ef6\u4e2d\u306e\u6700\u5f8c\u306e1\u4ef6\u3067\u3059", "Rat angeheftet \u2713 \u2014 das war der letzte von " + LIMITE_EPINGLES, "تم تثبيت النصيحة ✓ — كانت الأخيرة من أصل " + LIMITE_EPINGLES, "建议已置顶 ✓ ——这是 " + LIMITE_EPINGLES + " 条中的最后一条", "Tip vastgepind ✓ — dit was de laatste van " + LIMITE_EPINGLES, "Conselho fixado ✓ — era o último de " + LIMITE_EPINGLES, ("Råd fäst ✓ — det var det sista av " + LIMITE_EPINGLES), ("Совет закреплён ✓ — это был последний из " + LIMITE_EPINGLES), ("Wskazówka przypięta ✓ — to była ostatnia z " + LIMITE_EPINGLES), ("조언을 고정했어요 ✓ — " + LIMITE_EPINGLES + "개 중 마지막이에요"))
                    : TXT("Conseil \u00e9pingl\u00e9 \u2713 \u2014 plus que " + restantes + " sur " + LIMITE_EPINGLES, "Advice pinned \u2713 \u2014 " + restantes + " left of " + LIMITE_EPINGLES, "Consejo fijado \u2713 \u2014 quedan " + restantes + " de " + LIMITE_EPINGLES, "Consiglio fissato \u2713 \u2014 ne restano " + restantes + " su " + LIMITE_EPINGLES, "\u30a2\u30c9\u30d0\u30a4\u30b9\u3092\u30d4\u30f3\u7559\u3081\u3057\u307e\u3057\u305f \u2713 \u2014 " + LIMITE_EPINGLES + "\u4ef6\u4e2d\u6b8b\u308a" + restantes + "\u4ef6", "Rat angeheftet \u2713 \u2014 noch " + restantes + " von " + LIMITE_EPINGLES, "تم تثبيت النصيحة ✓ — بقي " + restantes + " من أصل " + LIMITE_EPINGLES, "建议已置顶 ✓ ——" + LIMITE_EPINGLES + " 条中还剩 " + restantes + " 条", "Tip vastgepind ✓ — nog " + restantes + " van " + LIMITE_EPINGLES, "Conselho fixado ✓ — restam " + restantes + " de " + LIMITE_EPINGLES, ("Råd fäst ✓ — bara " + restantes + " kvar av " + LIMITE_EPINGLES), ("Совет закреплён ✓ — осталось " + restantes + " из " + LIMITE_EPINGLES), ("Wskazówka przypięta ✓ — zostało jeszcze " + restantes + " z " + LIMITE_EPINGLES), ("조언을 고정했어요 ✓ — " + LIMITE_EPINGLES + "개 중 " + restantes + "개 남았어요"));
                var l2 = planAbo === "duo" ? null
                    : TXT("N'h\u00e9site pas \u00e0 passer \u00e0 un abonnement sup\u00e9rieur : l'abonnement Duo en propose " + PLAFOND_DUO + ".", "Feel free to move up a plan: the Duo plan offers " + PLAFOND_DUO + ".", "No dudes en pasar a una suscripci\u00f3n superior: la Duo ofrece " + PLAFOND_DUO + ".", "Puoi passare a un abbonamento superiore: il Duo ne offre " + PLAFOND_DUO + ".", "\u4e0a\u4f4d\u30d7\u30e9\u30f3\u3078\u306e\u5909\u66f4\u3082\u3054\u691c\u8a0e\u304f\u3060\u3055\u3044\u3002Duo\u30d7\u30e9\u30f3\u306a\u3089" + PLAFOND_DUO + "\u4ef6\u3067\u3059\u3002", "Du kannst jederzeit auf ein höheres Abo wechseln: das Duo-Abo bietet " + PLAFOND_DUO + ".", "لا تترددي في الانتقال إلى اشتراك أعلى: يتيح لك اشتراك Duo " + PLAFOND_DUO + ".", "欢迎升级到更高级的订阅：Duo 订阅可置顶 " + PLAFOND_DUO + " 条。", "Aarzel niet om over te stappen op een hoger abonnement: het Duo-abonnement biedt er " + PLAFOND_DUO + ".", "Fique à vontade para mudar para uma assinatura superior: a assinatura Duo oferece " + PLAFOND_DUO + ".", ("Tveka inte att byta till en högre prenumeration: Duo-prenumerationen ger dig " + PLAFOND_DUO + "."), ("Не стесняйся перейти на подписку повыше: в подписке Duo лимит — " + PLAFOND_DUO + "."), ("Śmiało przejdź na wyższą subskrypcję: subskrypcja Duo oferuje " + PLAFOND_DUO + "."), ("더 높은 구독으로 바꿔 보는 것도 좋아요. Duo 구독은 " + PLAFOND_DUO + "개까지 제공해요."));
                setToastHB(l2 ? [l1, l2] : [l1]);
                setTimeout(() => setToastHB(null), 4000);
            } else {
                setToastHB(TXT("Conseil \u00e9pingl\u00e9 \u2713", "Advice pinned \u2713", "Consejo fijado \u2713", "Consiglio fissato \u2713", "\u30a2\u30c9\u30d0\u30a4\u30b9\u3092\u30d4\u30f3\u7559\u3081\u3057\u307e\u3057\u305f \u2713", "Rat angeheftet \u2713", "تم تثبيت النصيحة ✓", "建议已置顶 ✓", "Tip vastgezet ✓", "Conselho fixado ✓", "Råd fäst ✓", "Совет закреплён ✓", "Wskazówka przypięta ✓", "조언을 고정했어요 ✓"));
                setTimeout(() => setToastHB(null), 2400);
            }
        } catch (e) { setEpingleCible(null); }
    };
    const envoyer = async (texte, opts) => {
        var _a;
        /* 26/09 (401) : `reprise` = job differe note sur le telephone (jobId, question, t0). La question a deja
           ete comptee et enregistree a l envoi : on ne la recompte pas, on n ajoute pas de bulle utilisateur
           (l historique la porte), on pose seulement la bulle « J analyse » et on va chercher le resultat. */
        const reprise = (opts && opts.reprise && opts.reprise.jobId) ? opts.reprise : null;
        /* 21/10 (option A) : `renvoi` = question ecrite restee sur le telephone faute de reseau ; renvoyee toute seule
           au retour du reseau ou a la reouverture de Hey Baby. Pas de nouveau decompte local, pas de nouvelle bulle. */
        const renvoi = (!reprise && opts && opts.renvoi && opts.renvoi.question) ? opts.renvoi : null;
        let jobCourant = reprise ? reprise.jobId : null;
        const question = reprise ? String(reprise.question || "").trim() : (texte !== null && texte !== void 0 ? texte : saisie).trim();
        if (reprise) { if (enCours) return; }
        else if ((!question && !imageJointe) || enCours || (limiteAtteinte && !renvoi) || extractionVideo)   /* 21/10 : un renvoi a deja ete compte sur le telephone ; le serveur tranche */
            return;
        if (!reprise) hypeQueteMarquer("hey-baby");
        const imgEnvoyee = (reprise || renvoi) ? null : imageJointe;
        const framesEnvoyees = (!reprise && !renvoi && framesVideo && framesVideo.length) ? framesVideo : null;
        const baseMsgsHB = renvoi ? messages.filter((m) => !m.attenteEnvoi) : messages;
        const dejaAfficheeHB = !!(renvoi && baseMsgsHB.length && baseMsgsHB[baseMsgsHB.length - 1].role === "user" && baseMsgsHB[baseMsgsHB.length - 1].contenu === question);
        if (renvoi) { try { localStorage.removeItem(HEYBABY_ENVOI_CLE); } catch (eRv) { } hbLog("renvoi de la question restée en attente"); }
        const nouveauxMessages = reprise ? [...messages] : (dejaAfficheeHB ? [...baseMsgsHB] : [...baseMsgsHB, { role: "user", contenu: question, image: imgEnvoyee, frames: framesEnvoyees }]);
        // Affichage immédiat : bulle « J'analyse… » en attendant le premier fragment
        if (reprise) setMessages((prev) => [...prev, { role: "assistant", contenu: "", pending: true }]);
        else setMessages([...nouveauxMessages, { role: "assistant", contenu: "", pending: true }]);
        if (!reprise && !renvoi) { setSaisie(""); setImageJointe(null); setFramesVideo(null); }
        setEnCours(true);
        if (!reprise && !renvoi) compterQuestion();
        let promSauveHB = Promise.resolve(!!(renvoi && renvoi.sauve));
        if (!reprise && !(renvoi && renvoi.sauve)) { try { promSauveHB = (async () => { const chP = imgEnvoyee ? await rangerPhotoHB(imgEnvoyee) : null; const rS = await sauverMessageHB("user", question, !!imgEnvoyee, conversationId, chP); return !(rS && rS.error); })().catch(() => false); } catch (e) { } }   /* 21/10 : la photo (ou la 1re image d une video) est gardee */
        const t0 = Date.now();
        hbLog("envoi", { image: !!imgEnvoyee, video: !!framesEnvoyees, nbFrames: framesEnvoyees ? framesEnvoyees.length : 0, caracteres: question.length, langue: langue });
        const ctrl = new AbortController();
        abortRef.current = ctrl;
        /* 26/09 (393) : voie Supabase pour une PHOTO, compte de Blandine seulement.
           04/10 (637) : LA VIDEO AUSSI. Sa capture du 04/10 19 h 39 : « [Netlify] envoi — HTTP 504 — apres 39 s ».
           Les images cles d une video partaient encore vers le relais Netlify, qui coupe vers 30 s (la raison
           meme du deplacement des photos le 26/09). La fonction Supabase hey-baby-vision (index.ts relu le
           04/10) convertit deja TOUTES les images d un message (journal « video/plusieurs images »), 5 min de
           marge, 8 Mo par envoi. Seule la condition ci-dessous excluait les videos. Meme garde-fou que la
           photo : compte de Blandine (estCompteFeinnHype). La video reste en UN appel en flux (pas de
           differe en base) : si l appli est quittee pendant l analyse, le resultat peut se perdre. */
        let voieSupa = null;
        if (HEYBABY_VOIE_SUPABASE && (imgEnvoyee || reprise || framesEnvoyees)) {
            try {
                const sessV = await supa.auth.getSession();
                const sV = sessV && sessV.data && sessV.data.session;
                if (sV && sV.access_token && typeof estCompteFeinnHype === "function" && estCompteFeinnHype(sV.user)) {
                    voieSupa = { url: String(SUPABASE_URL).replace(/\/+$/, "") + "/functions/v1/hey-baby-vision", entetes: { "Content-Type": "application/json", "apikey": CLE_PUBLISHABLE, "Authorization": "Bearer " + sV.access_token } };
                }
            } catch (eV) { voieSupa = null; }
        }
        hbLog("voie", voieSupa ? "Supabase (hey-baby-vision)" : "Netlify (assistant)");
        const delaiClient = voieSupa ? HEYBABY_TIMEOUT_SUPA_MS : HEYBABY_TIMEOUT_MS;
        const armerMinuteur = () => setTimeout(() => { hbLog("timeout client après " + delaiClient + " ms"); try { ctrl.abort("timeout"); } catch (e) { } }, delaiClient);
        let minuteur = armerMinuteur();
        const majDerniere = (fn) => setMessages((prev) => { const c = prev.slice(); const d = { ...c[c.length - 1] }; fn(d); c[c.length - 1] = d; return c; });
        /* 23/09 (386) - FAIRE PARLER HEY BABY, SUR LE SEUL COMPTE DE BLANDINE. Decision de
           Blandine (« fais parler l appli ») : toute photo echoue avec « Petit souci de connexion »
           alors que le relais renvoie une raison que l ecran cachait (elle n allait que dans la
           console, invisible sur iPhone). Sous le message habituel, une ligne de diagnostic :
           l etape, le code HTTP, ce que le relais a repondu, la duree. RESERVE A
           estCompteFeinnHype (feinn@live.fr), les cavalieres ne voient rien de change. Session
           lue en LOCAL (getSession, pas getUser). POUR LE RETIRER : faire de diagHB une fonction
           vide - ses quatre appels deviennent inertes. Le message affiche aux autres est inchange. */
        const diagHB = (etape, detail) => {
            try {
                if (typeof supa === "undefined" || !supa || !supa.auth || typeof estCompteFeinnHype !== "function") return;
                supa.auth.getSession().then((r) => {
                    const u = r && r.data && r.data.session && r.data.session.user;
                    if (!estCompteFeinnHype(u)) return;
                    const ligne = "\n\n\u2699\uFE0F Diagnostic (visible par toi seule) : " + (voieSupa ? "[Supabase] " : "[Netlify] ") + etape + " \u2014 " + String(detail || "sans d\u00e9tail") + " \u2014 apr\u00e8s " + Math.round((Date.now() - t0) / 1000) + " s";
                    majDerniere((d) => { d.contenu = String(d.contenu || "") + ligne; });
                }).catch(() => { });
            } catch (eDg) { }
        };
        // Mémorise l'analyse vidéo dans le carnet du cheval concerné (détecté par son nom)
        const memoriserAnalyse = (texteRep) => {
            if (!framesEnvoyees || !texteRep) return;
            try {
                const dansTexte = (txt) => { const t2 = String(txt || "").toLowerCase(); return (chevaux || []).filter((cv) => cv && cv.nom && String(cv.nom).length >= 3 && t2.indexOf(String(cv.nom).toLowerCase()) >= 0)[0] || null; };
                const chDet = dansTexte(question) || dansTexte(nouveauxMessages.slice(-8).map((m) => m.contenu || "").join(" ")) || dansTexte(texteRep);
                if (!chDet) { hbLog("analyse vidéo non mémorisée : aucun cheval identifié"); return; }
                ajouterMemoireCheval({ slug: chDet.id || chDet.nom, nom: chDet.nom, type: "analyse", contenu: "Analyse vidéo" + (question ? " — question : " + question.slice(0, 200) : "") + "\n" + texteRep.slice(0, 1500) })
                    .then(() => { hbLog("analyse mémorisée dans le carnet de", chDet.nom); rechargerMemoireHB(); })
                    .catch(() => { });
            } catch (e) { }
        };
        /* 21/10 (Blandine : « ajoute ça dans supabase ») — REPONSE GARDEE EN BASE. Le relais Netlify ecrit chaque reponse
           ecrite dans heybaby_analyses (ligne = reservation), meme si le telephone est parti. On la relit ici :
           - au retour sur Hey Baby (reprise notee « texte ») ;
           - quand la connexion coupe pendant la lecture (avant toute relance). */
        const lireReponseGardeeHB = async (idJob, delaiMax, signal) => {
            const fin = Date.now() + Math.max(0, delaiMax || 0);
            while (true) {
                if (signal && signal.aborted) return null;
                try {
                    const rj = await supa.from("heybaby_analyses").select("statut, resultat, erreur_code").eq("id", idJob).maybeSingle();
                    if (rj && !rj.error && rj.data && rj.data.statut !== "en_cours") return rj.data;
                    if (rj && !rj.error && !rj.data && Date.now() > fin - Math.max(0, (delaiMax || 0) - 6000)) return { statut: "absente" };
                } catch (eL) { }
                if (Date.now() >= fin) return { statut: "en_cours" };
                await new Promise((ok) => setTimeout(ok, 2000));
            }
        };
        if (reprise && reprise.texte) {
            const ctrlR = ctrl;
            try {
                hbLog("reprise d une réponse écrite gardée en base :", reprise.jobId);
                const age = Date.now() - (Number(reprise.t0) || Date.now());
                const fin = await lireReponseGardeeHB(reprise.jobId, Math.max(15000, (reprise.photo ? 180000 : 120000) - age), ctrlR.signal);   /* 25/10 : une photo = 2 etapes, plus long */
                if (ctrlR.signal.aborted) return;
                if (fin && fin.statut === "termine" && fin.resultat) {
                    majDerniere((d) => { d.contenu = fin.resultat; d.pending = false; });
                    try { sauverMessageHB("assistant", fin.resultat, false, conversationId); } catch (eS) { }
                    hbLog("réponse retrouvée en base — " + fin.resultat.length + " caractères");
                } else {
                    majDerniere((d) => { d.pending = false; d.contenu = (fin && fin.resultat) ? fin.resultat : t("souci_connexion"); });
                    if (fin && fin.resultat) { try { sauverMessageHB("assistant", fin.resultat, false, conversationId); } catch (eS2) { } }
                    diagHB("reprise de la réponse gardée", (fin && fin.statut) + (fin && fin.erreur_code ? " " + fin.erreur_code : ""));
                }
            } finally {
                clearTimeout(minuteur);
                abortRef.current = null;
                setEnCours(false);
                if (!ctrlR.hbUnmount) { try { const jN = JSON.parse(localStorage.getItem(HEYBABY_JOB_CLE) || "null"); if (jN && jN.jobId === reprise.jobId) localStorage.removeItem(HEYBABY_JOB_CLE); } catch (eF) { } }
            }
            return;
        }
        /* 21/10 (Blandine, capture 21 h 58 : reponse coupee net, « [Netlify] envoi — Load failed — apres 91 s ») :
           le journal Netlify montre que le serveur avait ENTIEREMENT repondu en 13 s (1 438 caracteres). C est le
           telephone qui a perdu la connexion pendant la lecture (appli quittee ou ecran verrouille : iOS coupe le
           telechargement ; ou reseau faible). On garde ici de quoi relancer UNE fois la meme question, sans la
           recompter : le serveur accepte une « suite » rattachee a la reservation de l envoi coupe (meme regle
           que la 2e etape d une photo, 15 min max, une seule fois). Voie Netlify, texte, hors 2e etape photo. */
        let relanceHB = null, texteFluxHB = "";
        let jobPhotoHB = null;   /* 25/10 (Blandine : « 5 ») : photo des cavalieres (voie Netlify) gardee en base - ligne notee sur le telephone */
        try {
            const API_ASSISTANT = voieSupa ? voieSupa.url : (typeof window !== "undefined" && (window.HYPE_API || window.AUGALOP_API)) ? (window.HYPE_API || window.AUGALOP_API) : "/.netlify/functions/assistant" /* 23/09 (387) : adresse RELATIVE - l app parle au relais de l adresse ou elle se trouve (2hype.fr bloquait l appel vers 2hype.netlify.app) */;
            // --- Construction de l'appel principal (comportement historique, inchangé pour texte et vidéo) ---
            let systemEnvoye = getSystemPrompt(langue, { profil: profil, chevaux: chevaux, premium: premium, planAbo: planAbo, xp: xp, serie: serie, galopOuvert: galopOuvert, coursOuvert: coursOuvert, memoire: memoireHB, fiches: fichesEcurie, coursCtx: coursCtx, avecPhoto: !!imgEnvoyee, avecVideo: Array.isArray(framesEnvoyees) && framesEnvoyees.length > 0, nbFrames: Array.isArray(framesEnvoyees) ? framesEnvoyees.length : 0, avecTimestamps: !!(Array.isArray(framesEnvoyees) && framesEnvoyees.length && framesEnvoyees[0] && typeof framesEnvoyees[0] === "object") });
            /* 14/10 (livraison A) : voie Netlify = le serveur écrit les consignes ; on lui envoie seulement le CONTEXTE (données).
               systemEnvoye reste utilisé pour la voie Supabase (hey-baby-vision, compte de Blandine), inchangée. */
            let ctxIA = { memoire: memoireHB, fiches: fichesEcurie, coursCtx: coursCtx, avecPhoto: !!imgEnvoyee, avecVideo: Array.isArray(framesEnvoyees) && framesEnvoyees.length > 0, nbFrames: Array.isArray(framesEnvoyees) ? framesEnvoyees.length : 0, avecTimestamps: !!(Array.isArray(framesEnvoyees) && framesEnvoyees.length && framesEnvoyees[0] && typeof framesEnvoyees[0] === "object") };
            let suiteIA = null, obsIA = null;
            const entetesIA = voieSupa ? null : await hypeEntetesIA();
            let messagesEnvoyes = (function () { const fenetre = nouveauxMessages.filter((m) => !m.intro && (m.contenu || m.image)).slice(-10); return fenetre.map((m, iM) => { const dernier = iM === fenetre.length - 1; if (dernier && m.frames && m.frames.length) { const blocs = m.frames.map(function (fr) { const data = (fr && typeof fr === "object") ? fr.data : fr; const t = (fr && typeof fr === "object" && typeof fr.t === "number") ? fr.t : null; const v = data.indexOf(","); const mt = data.slice(5, data.indexOf(";")) || "image/jpeg"; const img = { type: "image", source: { type: "base64", media_type: mt, data: data.slice(v + 1) } }; return t !== null ? [{ type: "text", text: "t=" + t + "s" }, img] : [img]; }).flat(); blocs.push({ type: "text", text: (m.contenu ? m.contenu : tr({ fr: "Analyse cette vid\u00e9o.", en: "Analyse this video.", es: "Analiza este v\u00eddeo.", it: "Analizza questo video.", ja: "\u3053\u306e\u52d5\u753b\u3092\u5206\u6790\u3057\u3066\u304f\u3060\u3055\u3044\u3002", de: "Analysiere dieses Video.", ar: "\u062d\u0644\u0644\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u064a\u062f\u064a\u0648.", zh: "分析这段视频。", nl: "Analyseer deze video.", pt: "Analise este vídeo.", sv: "Analysera den här videon.", ru: "Проанализируй это видео.", pl: "Przeanalizuj to wideo.", ko: "이 영상을 분석해 주세요." }) ) }); return { role: m.role, content: blocs }; } if (dernier && m.image) { const v = m.image.indexOf(","); const mt = m.image.slice(5, m.image.indexOf(";")) || "image/jpeg"; const blocs = [{ type: "image", source: { type: "base64", media_type: mt, data: m.image.slice(v + 1) } }]; if (m.contenu) blocs.push({ type: "text", text: m.contenu }); return { role: m.role, content: blocs }; } return { role: m.role, content: m.contenu || "(photo envoy\u00e9e pr\u00e9c\u00e9demment)" }; }); })();
            /* 04/10 (655) — VIDEO EN DIFFERE (voie Supabase, compte de Blandine ; son « oui pour les videos en differe »).
               Meme securite que la photo depuis le 26/09 : un seul appel qui CREE UN JOB (differe: true, sans flux), puis
               l appli relit la ligne heybaby_analyses toutes les 3 s jusqu au resultat ; le job est note sur le telephone
               (video: true) et repris a la prochaine ouverture si l appli a ete quittee pendant l analyse. Si la fonction
               en ligne n est pas encore en differe pour ce mode (index.ts pas redeploye), elle repond directement et la
               reponse est affichee telle quelle : rien ne casse, quel que soit l ordre des deux livraisons. */
            if (voieSupa && (framesEnvoyees || (reprise && reprise.video))) {
                const t1v = Date.now();
                let jobV = reprise ? reprise.jobId : null;
                let directV = null;
                if (!reprise) {
                    const optV = { method: "POST", headers: voieSupa.entetes, body: JSON.stringify({ stream: false, differe: true, system: systemEnvoye, messages: messagesEnvoyes }) };
                    let repV;
                    try { repV = await fetch(API_ASSISTANT, { ...optV, signal: ctrl.signal }); }
                    catch (eV1) { const cloneErrV = eV1 && (eV1.name === "DataCloneError" || String(eV1.message || "").toLowerCase().indexOf("cloned") !== -1); if (cloneErrV && !ctrl.signal.aborted) { repV = await fetch(API_ASSISTANT, optV); } else { throw eV1; } }
                    let dataV = null; try { dataV = await repV.json(); } catch (eV2) { }
                    if (repV.ok && dataV && dataV.ok && dataV.differe && dataV.jobId) {
                        jobV = dataV.jobId; jobCourant = jobV;
                        try { localStorage.setItem(HEYBABY_JOB_CLE, JSON.stringify({ jobId: jobV, question: question, conversationId: conversationId, t0: Date.now(), video: true })); } catch (eV3) { }
                        hbLog("vidéo : différé, job " + jobV);
                    } else if (repV.ok && dataV && dataV.ok && dataV.content) {
                        directV = ((dataV.content || []).map((b) => (b && b.text) || "").join("") || "");
                        hbLog("vidéo : réponse directe (fonction sans différé) en " + (Date.now() - t1v) + " ms");
                    } else {
                        const codeV = (dataV && (dataV.code || dataV.error)) || ("HTTP " + repV.status);
                        hbLog("vidéo : échec de création du job — " + codeV + " — après " + (Date.now() - t1v) + " ms");
                        majDerniere((d) => { d.pending = false; d.contenu = t("souci_connexion"); });
                        diagHB("vid\u00e9o, cr\u00e9ation du job", "HTTP " + repV.status + " \u2014 " + (dataV ? (((dataV.code || "") + " " + (dataV.message || dataV.error || "")).trim() || "r\u00e9ponse sans d\u00e9tail") : "r\u00e9ponse illisible (pas du JSON)"));
                        return;
                    }
                } else { hbLog("vidéo : reprise du job " + jobV + " (noté il y a " + Math.round((Date.now() - (Number(reprise.t0) || Date.now())) / 1000) + " s)"); }
                let texteV = directV;
                if (texteV === null) {
                    let finiV = null;
                    while (!finiV && !ctrl.signal.aborted) {
                        await new Promise((res) => setTimeout(res, 3000));
                        if (ctrl.signal.aborted) break;
                        try {
                            const rjV = await supa.from("heybaby_analyses").select("statut, resultat, erreur_code, erreur_message").eq("id", jobV).single();
                            if (rjV && !rjV.error && rjV.data && rjV.data.statut !== "en_cours") finiV = rjV.data;
                        } catch (eJV) { /* lecture ratee (arriere-plan, reseau) : on reessaie */ }
                    }
                    if (!finiV || finiV.statut !== "termine") {
                        const codeV2 = finiV ? (finiV.erreur_code || "ERREUR") : (ctrl.signal.aborted ? "DELAI_DEPASSE" : "SANS_RESULTAT");
                        hbLog("vidéo : différé terminé en échec — " + codeV2 + " — après " + (Date.now() - t1v) + " ms");
                        majDerniere((d) => { d.pending = false; if (!d.contenu) d.contenu = ctrl.signal.aborted ? t("heybaby_interrompu") : t("souci_connexion"); });
                        diagHB("vid\u00e9o, analyse diff\u00e9r\u00e9e", codeV2 + " " + ((finiV && finiV.erreur_message) || "") + " (job " + jobV + ")");
                        return;
                    }
                    texteV = String(finiV.resultat || "");
                    hbLog("vidéo : différé terminé — ok — après " + (Date.now() - t1v) + " ms");
                }
                if (!texteV) { majDerniere((d) => { d.pending = false; d.contenu = t("souci_connexion"); }); diagHB("vid\u00e9o", "r\u00e9ponse vide (job " + jobV + ")"); return; }
                clearTimeout(minuteur);
                majDerniere((d) => { d.contenu = texteV; d.pending = false; });
                try { sauverMessageHB("assistant", texteV, false, conversationId); } catch (eV4) { }
                try { memoriserAnalyse(texteV); } catch (eV5) { }
                return;
            }
            // --- PHOTO SEULE : analyse en 2 étapes (spec 22/07/2026) ---
            // Étape 1 : perception isolée — la photo, la méthode d'observation et la question du
            // cavalier, RIEN d'autre (pas d'historique, pas de carnet, pas de profil, pas de ton).
            // Étape 2 : la rédaction Hey Baby s'appuie sur les observations validées, sans les contredire.
            if ((imgEnvoyee || (reprise && !reprise.video)) && !framesEnvoyees) {   /* (655) une reprise video est traitee plus haut */
                const t1 = Date.now();
                let repPerc, dataPerc = null;
                /* 15/10 : photo COMPLÈTE côté serveur (voie Supabase) — le serveur fait observation + rédaction et
                   enregistre lui-même la réponse dans la conversation ; l'appli n'a plus qu'à l'afficher. */
                let photoCompleteJob = !!(reprise && reprise.complet);
                if (reprise) {
                    /* 26/09 (401) : le job existe deja en base, on repart de son identifiant. */
                    repPerc = { ok: true, status: 200 };
                    dataPerc = { differe: true, jobId: reprise.jobId };
                    hbLog("perception : reprise du job " + reprise.jobId + " (note il y a " + Math.round((Date.now() - (Number(reprise.t0) || Date.now())) / 1000) + " s)");
                } else {
                const vIdx = imgEnvoyee.indexOf(",");
                const mtImg = imgEnvoyee.slice(5, imgEnvoyee.indexOf(";")) || "image/jpeg";
                const blocImage = { type: "image", source: { type: "base64", media_type: mtImg, data: imgEnvoyee.slice(vIdx + 1) } };
                hbLog("perception : appel d'observation isolé (photo seule, sans historique ni carnet)");
                const optPerc = voieSupa
                    ? { method: "POST", headers: voieSupa.entetes, body: JSON.stringify({ mode: "photo_complete", langue: langue, contexte: ctxIA, question: question || "", image: blocImage, conversationId: conversationId || null }) }
                    : { method: "POST", headers: entetesIA, body: JSON.stringify({ operation: "perception", langue: langue, image: blocImage, question: question || "",
                        /* 25/10 : de quoi faire la 2e etape cote serveur si le telephone part pendant l observation */
                        etape2: { contexte: { memoire: contexteHBRef.current.memoireHB, fiches: contexteHBRef.current.fichesEcurie, coursCtx: coursCtx, avecPhoto: false, avecVideo: false, nbFrames: 0, avecTimestamps: false },
                            texte: tr({ fr: "Analyse cette photo.", en: "Analyse this photo.", es: "Analiza esta foto.", it: "Analizza questa foto.", ja: "\u3053\u306e\u5199\u771f\u3092\u5206\u6790\u3057\u3066\u304f\u3060\u3055\u3044\u3002", de: "Analysiere dieses Foto.", ar: "\u062d\u0644\u0644\u064a \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629.", zh: "分析这张照片。", nl: "Analyseer deze foto.", pt: "Analise esta foto.", sv: "Analysera det här fotot.", ru: "Проанализируй это фото.", pl: "Przeanalizuj to zdjęcie.", ko: "이 사진을 분석해 주세요." }) } }) };
                try { repPerc = await fetch(API_ASSISTANT, { ...optPerc, signal: ctrl.signal }); }
                catch (eP) { const cloneErr = eP && (eP.name === "DataCloneError" || String(eP.message || "").toLowerCase().indexOf("cloned") !== -1); if (cloneErr && !ctrl.signal.aborted) { repPerc = await fetch(API_ASSISTANT, optPerc); } else { throw eP; } }
                /* 25/10 : la ligne de l analyse est notee des l envoi accepte ; si l appli est quittee, la reponse y sera relue au retour. */
                try { const resaP = !voieSupa && repPerc && repPerc.ok && repPerc.headers.get("X-Reservation"); if (resaP) { jobPhotoHB = resaP; jobCourant = resaP; localStorage.setItem(HEYBABY_JOB_CLE, JSON.stringify({ jobId: resaP, question: question, conversationId: conversationId, t0: Date.now(), texte: true, photo: true })); hbLog("photo : analyse notée (" + resaP + "), reprise possible si l appli est quittée"); } } catch (eNp) { }
                try { dataPerc = await repPerc.json(); } catch (e) { }
                if (jobPhotoHB && !dataPerc && !ctrl.signal.aborted) throw new TypeError("observation coupée (connexion perdue)");   /* 25/10 : lue en base plus bas */
                }
                /* 26/09 (399) - MODE DIFFERE : la fonction Supabase repond tout de suite { differe, jobId } et range
                   le resultat dans heybaby_analyses. On relit la ligne toutes les 3 s jusqu au resultat, dans la
                   limite du delai client (5 min). Si l appli passe en arriere-plan, une lecture ratee est simplement
                   refaite au tour suivant : le resultat attend en base. */
                if (repPerc && repPerc.ok && dataPerc && dataPerc.differe && dataPerc.jobId) {
                    const jobId = dataPerc.jobId;
                    jobCourant = jobId;
                    if (dataPerc.complet) photoCompleteJob = true;
                    if (!reprise) { try { localStorage.setItem(HEYBABY_JOB_CLE, JSON.stringify({ jobId: jobId, question: question, conversationId: conversationId, t0: Date.now(), complet: photoCompleteJob })); } catch (eN) { } } /* 26/09 (401) */
                    hbLog("perception : différé, job " + jobId);
                    /* 15/10 : le résultat attend en base, le délai « réseau » de 5 min ne s'applique plus ici.
                       Cas réel du 14/10 23:50 : observation prête en 80 s, mais l'iPhone avait mis l'appli en pause ;
                       au retour, le minuteur de 5 min a coupé AVANT la lecture suivante → « Réponse interrompue ».
                       Désormais : seul le bouton stop (ou la fermeture de l'écran) arrête l'attente ; plafond 9 min ;
                       et une DERNIÈRE lecture est toujours faite avant d'abandonner. */
                    clearTimeout(minuteur);
                    const lireJob = async () => {
                        try {
                            const rj = await supa.from("heybaby_analyses").select("statut, resultat, erreur_code, erreur_message").eq("id", jobId).single();
                            if (rj && !rj.error && rj.data && rj.data.statut !== "en_cours") return rj.data;
                        } catch (eJ) { /* lecture ratee (arriere-plan, reseau) : on reessaie */ }
                        return null;
                    };
                    let fini = null;
                    while (!fini && !ctrl.signal.aborted && Date.now() - t1 < 540000) {
                        await new Promise((res) => setTimeout(res, 3000));
                        if (ctrl.signal.aborted) break;
                        fini = await lireJob();
                    }
                    if (!fini && !ctrl.hbUnmount) fini = await lireJob();
                    if (!fini) ctrl.hbGarderJob = true;   /* toujours en cours : on le garde pour la reprise */
                    if (fini && fini.statut === "termine") dataPerc = { ok: true, reqId: jobId, content: [{ type: "text", text: String(fini.resultat || "") }] };
                    else if (fini) dataPerc = { ok: false, code: fini.erreur_code || "ERREUR", message: fini.erreur_message || "", reqId: jobId };
                    else dataPerc = { ok: false, code: ctrl.signal.aborted ? "DELAI_DEPASSE" : "SANS_RESULTAT", message: "Pas de résultat après " + Math.round((Date.now() - t1) / 1000) + " s (job " + jobId + ")", reqId: jobId };
                    hbLog("perception : différé terminé — " + (dataPerc.ok ? "ok" : dataPerc.code) + " — après " + (Date.now() - t1) + " ms");
                }
                if (!repPerc.ok || !dataPerc || dataPerc.ok === false) {
                    const codeP = (dataPerc && dataPerc.code) || ("HTTP " + repPerc.status);
                    hbLog("perception : échec — " + codeP + (dataPerc && dataPerc.reqId ? " — reqId " + dataPerc.reqId : "") + " — après " + (Date.now() - t1) + " ms" + (dataPerc && dataPerc.message ? " — " + dataPerc.message : ""));
                    majDerniere((d) => { d.pending = false; d.contenu = hypeMessageIA(dataPerc && dataPerc.code, langue) || t("souci_connexion"); });
                    diagHB("photo, \u00e9tape observation", "HTTP " + repPerc.status + " \u2014 " + (dataPerc ? (dataPerc.error || ((dataPerc.code || "") + " " + (dataPerc.message || "")).trim() || "r\u00e9ponse sans d\u00e9tail") : "r\u00e9ponse illisible (pas du JSON)"));
                    return;
                }
                if (photoCompleteJob) {
                    /* 15/10 : la réponse est déjà rédigée ET enregistrée par le serveur : on l'affiche, sans la ré-enregistrer. */
                    const texteFinal = ((dataPerc.content || []).map((b) => (b && b.text) || "").join("") || "").trim();
                    clearTimeout(minuteur);
                    if (reprise && texteFinal && (messagesRef.current || []).some((m) => m && m.role === "assistant" && !m.pending && m.contenu === texteFinal)) {
                        setMessages((prev) => prev.filter((m) => !m.pending));   /* déjà affichée par l'historique : pas de doublon */
                    } else {
                        majDerniere((d) => { d.contenu = texteFinal || t("souci_connexion"); d.pending = false; });
                        if (texteFinal) { try { memoriserAnalyse(texteFinal); } catch (eM) { } }
                    }
                    hbLog("photo complète : réponse reçue (" + texteFinal.length + " caractères, enregistrée par le serveur) en " + (Date.now() - t1) + " ms");
                    return;
                }
                let texteObs = ((dataPerc.content || []).map((b) => (b && b.text) || "").join("") || "").replace(/```json|```/g, "").trim();
                let obsValides = texteObs;
                try { obsValides = JSON.stringify(JSON.parse(texteObs)); hbLog("perception : observations JSON valides en " + (Date.now() - t1) + " ms — reqId " + (dataPerc.reqId || "?")); }
                catch (e) { hbLog("perception : JSON invalide — texte brut transmis à l'étape pédagogie — reqId " + (dataPerc.reqId || "?")); }
                /* 14/10 (livraison A) : la 2e étape renvoie la réservation de la 1re (ne compte pas une 2e fois) et les observations. */
                if (!voieSupa) { hypeNoterQuotaIA(repPerc); suiteIA = dataPerc.reservation || null; obsIA = obsValides; ctxIA = { memoire: contexteHBRef.current.memoireHB, fiches: contexteHBRef.current.fichesEcurie, coursCtx: coursCtx, avecPhoto: false, avecVideo: false, nbFrames: 0, avecTimestamps: false }; }
                clearTimeout(minuteur); minuteur = armerMinuteur(); // budget dédié pour la 2e étape
                systemEnvoye = getSystemPrompt(langue, { profil: profil, chevaux: chevaux, premium: premium, planAbo: planAbo, xp: xp, serie: serie, galopOuvert: galopOuvert, coursOuvert: coursOuvert, memoire: contexteHBRef.current.memoireHB, fiches: contexteHBRef.current.fichesEcurie, coursCtx: coursCtx, avecPhoto: false, avecVideo: false, nbFrames: 0, avecTimestamps: false }) + HEYBABY_CONSIGNES_PEDAGOGIE.replace("{OBS}", obsValides); /* 26/09 (401) : memoire lue via contexteHBRef */
                messagesEnvoyes = [{ role: "user", content: question || tr({ fr: "Analyse cette photo.", en: "Analyse this photo.", es: "Analiza esta foto.", it: "Analizza questa foto.", ja: "\u3053\u306e\u5199\u771f\u3092\u5206\u6790\u3057\u3066\u304f\u3060\u3055\u3044\u3002", de: "Analysiere dieses Foto.", ar: "\u062d\u0644\u0644\u064a \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629.", zh: "分析这张照片。", nl: "Analyseer deze foto.", pt: "Analise esta foto.", sv: "Analysera det här fotot.", ru: "Проанализируй это фото.", pl: "Przeanalizuj to zdjęcie.", ko: "이 사진을 분석해 주세요." }) }];
            }
            const optionsFetch = voieSupa
                ? { method: "POST", headers: voieSupa.entetes, body: JSON.stringify({ stream: true, system: systemEnvoye, messages: messagesEnvoyes }) }
                : { method: "POST", headers: entetesIA, body: JSON.stringify({ operation: "question", stream: true, langue: langue, contexte: ctxIA, messages: messagesEnvoyes, suite: suiteIA || undefined, observations: suiteIA ? obsIA : undefined }) };
            let response;
            try {
                response = await fetch(API_ASSISTANT, { ...optionsFetch, signal: ctrl.signal });
            }
            catch (ePremier) {
                // Certains environnements d'aperçu ne savent pas transmettre un AbortSignal
                // (erreur « The object can not be cloned ») : on retente sans signal.
                const msg = (ePremier && (ePremier.name === "DataCloneError" || String(ePremier.message || "").toLowerCase().indexOf("cloned") !== -1));
                if (msg && !ctrl.signal.aborted) {
                    hbLog("environnement sans AbortSignal — nouvel essai sans signal");
                    response = await fetch(API_ASSISTANT, optionsFetch);
                } else { throw ePremier; }
            }
            if (!voieSupa) hypeNoterQuotaIA(response);
            try { const resaHB = response.headers.get("X-Reservation"); if (!voieSupa && !suiteIA && resaHB) relanceHB = { url: API_ASSISTANT, reservation: resaHB, corps: { operation: "question", stream: true, langue: langue, contexte: ctxIA, messages: messagesEnvoyes } }; } catch (eRz) { }   /* 21/10 */
            /* 21/10 (reponse gardee en base) : la question est notee sur le telephone ; si l appli ou la page est quittee,
               la reponse sera relue dans heybaby_analyses au retour sur Hey Baby (jusqu a 24 h). Effacee des que la reponse est affichee. */
            try { if (!voieSupa && response.ok && relanceHB && relanceHB.reservation && (response.headers.get("content-type") || "").indexOf("application/json") === -1) { jobCourant = relanceHB.reservation; localStorage.setItem(HEYBABY_JOB_CLE, JSON.stringify({ jobId: relanceHB.reservation, question: question, conversationId: conversationId, t0: Date.now(), texte: true })); } } catch (eJn) { }
            if (!response.ok) {
                let detailErr = null;
                try { detailErr = await response.clone().json(); } catch (e) { }
                const err = new Error("HTTP " + response.status);
                if (detailErr && detailErr.code) { err.hbCode = detailErr.code; err.hbReqId = detailErr.reqId; err.hbMessage = detailErr.message; }
                if (detailErr && detailErr.error) { err.hbErreur = detailErr.error; } /* 23/09 (386) : le relais en ligne (v3) repond { error: "OpenAI 400" } */
                throw err;
            }
            const ctype = (response.headers.get("content-type") || "");
            if (ctype.indexOf("application/json") !== -1 || !response.body || !response.body.getReader) {
                // Compatibilité : ancien relais Netlify non-streaming (format JSON { content: [...] })
                // ou nouveau format d'erreur structurée { ok:false, code, message, reqId }.
                const data = await response.json();
                if (data && data.ok === false) {
                    hbLog("erreur structurée reçue", { code: data.code, reqId: data.reqId, message: data.message, apres_ms: Date.now() - t0 });
                    majDerniere((d) => { d.pending = false; d.contenu = hypeMessageIA(data.code, langue) || t("souci_connexion"); });
                    diagHB("r\u00e9ponse", (data.code || "") + " " + (data.message || ""));
                    return;
                }
                const texteReponse = ((_a = data === null || data === void 0 ? void 0 : data.content) === null || _a === void 0 ? void 0 : _a.map((block) => (block.type === "text" ? block.text : "")).filter(Boolean).join("\n")) || (data && data.text) || t("souci_connexion");
                hbLog("réponse JSON complète en " + (Date.now() - t0) + " ms — " + texteReponse.length + " caractères" + (data && data.reqId ? " — reqId " + data.reqId : ""));
                majDerniere((d) => { d.contenu = texteReponse; d.pending = false; });
                try { if (texteReponse) sauverMessageHB("assistant", texteReponse, false, conversationId); } catch (e) { }
                try { memoriserAnalyse(texteReponse); } catch (e) { }
            }
            else {
                // Streaming : la réponse s'affiche mot à mot
                const reader = response.body.getReader();
                const dec = new TextDecoder();
                let total = "", premier = true;
                while (true) {
                    const lu = await reader.read();
                    if (lu.done) break;
                    const morceau = dec.decode(lu.value, { stream: true });
                    if (!morceau) continue;
                    if (premier) { hbLog("premier fragment en " + (Date.now() - t0) + " ms"); premier = false; }
                    total += morceau;
                    texteFluxHB = total;   /* 21/10 : ce qui est deja arrive, pour la relance si la connexion coupe */
                    majDerniere((d) => { d.contenu = total.replace(/\u0000HEYBABY_ERROR:[^\u0000]*\u0000/, ""); d.pending = false; });
                }
                // Le serveur signale une coupure en cours de flux par un marqueur invisible en fin
                // de texte (voir assistant.js) : on le détecte, on le retire de l'affichage, et on
                // journalise le code/reqId pour le diagnostic — le cavalier voit juste la réponse
                // (tronquée) sans le marqueur technique.
                const marqueur = total.match(/\u0000HEYBABY_ERROR:([A-Z_]+):([^\u0000]*)\u0000/);
                if (marqueur) {
                    total = total.replace(marqueur[0], "");
                    hbLog("flux interrompu côté serveur — code " + marqueur[1] + " — reqId " + marqueur[2] + " — après " + (Date.now() - t0) + " ms — " + total.length + " caractères reçus avant coupure");
                    majDerniere((d) => { d.contenu = total; d.pending = false; });
                }
                if (!total) { majDerniere((d) => { d.contenu = t("souci_connexion"); d.pending = false; }); diagHB("r\u00e9ponse", "flux vide (le relais n a rien renvoy\u00e9)"); hbLog("stream vide en " + (Date.now() - t0) + " ms"); }
                else { hbLog("réponse complète en " + (Date.now() - t0) + " ms — " + total.length + " caractères"); try { sauverMessageHB("assistant", total, false, conversationId); } catch (e) { } try { memoriserAnalyse(total); } catch (e) { } }
            }
        }
        catch (err) {
            const interrompu = ctrl.signal.aborted;
            /* 21/10 (option A) : la question n a meme pas pu partir (pas de reseau) -> elle reste sur le telephone et partira
               toute seule au retour du reseau / a la reouverture de Hey Baby. Questions ecrites seulement (une photo est trop
               lourde pour etre gardee ainsi). */
            if (!interrompu && !relanceHB && !voieSupa && !imgEnvoyee && !framesEnvoyees && !reprise && question && !(err && err.hbCode) && ((err && err.name === "TypeError") || (typeof navigator !== "undefined" && navigator.onLine === false))) {
                let sauveQ = false; try { sauveQ = await Promise.race([promSauveHB, new Promise((ok) => setTimeout(() => ok(false), 3000))]); } catch (eSq) { }
                try { localStorage.setItem(HEYBABY_ENVOI_CLE, JSON.stringify({ question: question, conversationId: conversationId, t0: Date.now(), sauve: !!sauveQ })); } catch (eQs) { }
                hbLog("pas de réseau : question gardée sur le téléphone, renvoi automatique au retour du réseau");
                majDerniere((d) => { d.pending = false; d.attenteEnvoi = true; d.contenu = tr({ fr: "\u23f3 Pas de r\u00e9seau : ta question partira toute seule d\u00e8s que la connexion revient.", en: "\u23f3 No connection: your question will be sent automatically as soon as you're back online.", es: "\u23f3 Sin conexi\u00f3n: tu pregunta se enviar\u00e1 sola en cuanto vuelva la conexi\u00f3n.", it: "\u23f3 Nessuna connessione: la tua domanda partir\u00e0 da sola appena torna la rete.", ja: "\u23f3 \u63a5\u7d9a\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u63a5\u7d9a\u304c\u623b\u3063\u305f\u3089\u8cea\u554f\u306f\u81ea\u52d5\u3067\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002", de: "\u23f3 Keine Verbindung: Deine Frage wird automatisch gesendet, sobald die Verbindung zur\u00fcck ist.", ar: "\u23f3 \u0644\u0627 \u064a\u0648\u062c\u062f \u0627\u062a\u0635\u0627\u0644: \u0633\u064a\u064f\u0631\u0633\u0644 \u0633\u0624\u0627\u0644\u0643\u0650 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627 \u0641\u0648\u0631 \u0639\u0648\u062f\u0629 \u0627\u0644\u0627\u062a\u0635\u0627\u0644.", zh: "\u23f3 \u6ca1\u6709\u7f51\u7edc\uff1a\u7f51\u7edc\u6062\u590d\u540e\uff0c\u4f60\u7684\u95ee\u9898\u4f1a\u81ea\u52a8\u53d1\u9001\u3002", nl: "\u23f3 Geen verbinding: je vraag wordt vanzelf verstuurd zodra de verbinding terug is.", pt: "\u23f3 Sem conex\u00e3o: sua pergunta ser\u00e1 enviada automaticamente assim que a conex\u00e3o voltar.", sv: "\u23f3 Ingen anslutning: din fr\u00e5ga skickas automatiskt s\u00e5 fort anslutningen \u00e4r tillbaka.", ru: "\u23f3 \u041d\u0435\u0442 \u0441\u0435\u0442\u0438: \u0442\u0432\u043e\u0439 \u0432\u043e\u043f\u0440\u043e\u0441 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u0441\u0430\u043c, \u043a\u0430\u043a \u0442\u043e\u043b\u044c\u043a\u043e \u0441\u0432\u044f\u0437\u044c \u0432\u0435\u0440\u043d\u0451\u0442\u0441\u044f.", pl: "\u23f3 Brak po\u0142\u0105czenia: twoje pytanie wy\u015ble si\u0119 samo, gdy tylko wr\u00f3ci po\u0142\u0105czenie.", ko: "⏳ 네트워크 연결이 없어요: 연결이 돌아오면 질문이 자동으로 전송돼요." }); });
                return;
            }
            /* 21/10 : coupure de connexion PENDANT une reponse deja commencee -> relance automatique, une fois, sans la
               recompter. Si l appli est en arriere-plan, on attend qu elle revienne au premier plan. En cas d echec,
               on garde le debut de reponse et le diagnostic habituel s affiche plus bas. */
            if (!interrompu && relanceHB) {   /* 21/10 : aussi quand la coupure arrive avant le premier mot (appli quittee juste apres l envoi) */
                let relanceOk = false;
                try {
                    hbLog("connexion coupée après " + (Date.now() - t0) + " ms — " + (texteFluxHB || "").length + " caractères reçus — relance (suite " + relanceHB.reservation + ")");
                    await new Promise((ok) => setTimeout(ok, 1500));   /* laisse le serveur clore l envoi coupe */
                    if (typeof document !== "undefined" && document.hidden) {
                        await new Promise((ok) => { const f = () => { if (!document.hidden) { document.removeEventListener("visibilitychange", f); ok(); } }; document.addEventListener("visibilitychange", f); });
                    }
                    /* 21/10 (reponse gardee en base) : le serveur a souvent fini sans nous - on relit d abord la base (gratuit, immediat). */
                    const finB = await lireReponseGardeeHB(relanceHB.reservation, Math.max(4000, 75000 - (Date.now() - t0)), null);
                    if (finB && finB.statut === "termine" && finB.resultat) {
                        majDerniere((d) => { d.contenu = finB.resultat; d.pending = false; });
                        hbLog("réponse retrouvée en base après coupure — " + finB.resultat.length + " caractères");
                        try { sauverMessageHB("assistant", finB.resultat, false, conversationId); } catch (e) { }
                        try { memoriserAnalyse(finB.resultat); } catch (e) { }
                        return;
                    }
                    const ctrl2 = new AbortController(); abortRef.current = ctrl2;
                    clearTimeout(minuteur); minuteur = setTimeout(() => { try { ctrl2.abort("timeout"); } catch (e) { } }, HEYBABY_TIMEOUT_MS);
                    const corps2 = Object.assign({}, relanceHB.corps, { suite: relanceHB.reservation });
                    const rep2 = await fetch(relanceHB.url, { method: "POST", headers: await hypeEntetesIA(), body: JSON.stringify(corps2), signal: ctrl2.signal });
                    try { hypeNoterQuotaIA(rep2); } catch (eQ2) { }
                    const ctype2 = rep2.headers.get("content-type") || "";
                    if (rep2.ok && ctype2.indexOf("application/json") === -1 && rep2.body && rep2.body.getReader) {
                        const rd2 = rep2.body.getReader(); const dec2 = new TextDecoder(); let t2 = "";
                        while (true) {
                            const lu2 = await rd2.read(); if (lu2.done) break;
                            t2 += dec2.decode(lu2.value, { stream: true });
                            const vis2 = t2.replace(/\u0000HEYBABY_ERROR:[^\u0000]*\u0000/, "");
                            if (vis2.length > texteFluxHB.length) majDerniere((d) => { d.contenu = vis2; d.pending = false; });
                        }
                        const m2 = t2.match(/\u0000HEYBABY_ERROR:([A-Z_]+):([^\u0000]*)\u0000/);
                        t2 = t2.replace(/\u0000HEYBABY_ERROR:[^\u0000]*\u0000/, "");
                        if (t2 && !m2) {
                            relanceOk = true;
                            majDerniere((d) => { d.contenu = t2; d.pending = false; });
                            hbLog("relance réussie en " + (Date.now() - t0) + " ms — " + t2.length + " caractères");
                            try { sauverMessageHB("assistant", t2, false, conversationId); } catch (e) { }
                            try { memoriserAnalyse(t2); } catch (e) { }
                        }
                    } else {
                        let d2 = null; try { d2 = await rep2.json(); } catch (eJ) { }
                        hbLog("relance refusée — HTTP " + rep2.status + (d2 && d2.code ? " — " + d2.code : ""));
                    }
                } catch (eRel) { hbLog("relance impossible : " + ((eRel && eRel.message) || String(eRel))); }
                if (relanceOk) return;
                /* Echec de la relance : la reponse partielle reste affichee, on la garde aussi dans l historique. */
                if (texteFluxHB) { try { sauverMessageHB("assistant", texteFluxHB, false, conversationId); } catch (e) { } }
            }
            /* 25/10 (Blandine : « 5 ») : photo des cavalieres coupee (appli quittee, ecran verrouille, reseau) -> le serveur finit
               l analyse sans le telephone et range la reponse dans la ligne notee : on la relit des que l appli revient. */
            if (!interrompu && !relanceHB && jobPhotoHB) {
                try {
                    hbLog("photo : connexion coupée après " + (Date.now() - t0) + " ms — lecture de la réponse gardée (" + jobPhotoHB + ")");
                    if (typeof document !== "undefined" && document.hidden) {
                        await new Promise((ok) => { const f = () => { if (!document.hidden) { document.removeEventListener("visibilitychange", f); ok(); } }; document.addEventListener("visibilitychange", f); });
                    }
                    const finP = await lireReponseGardeeHB(jobPhotoHB, (err && err.hbCode && err.hbCode !== "SUITE_INVALIDE") ? 8000 : Math.max(10000, 150000 - (Date.now() - t0)), null);
                    if (finP && finP.statut === "termine" && finP.resultat) {
                        majDerniere((d) => { d.contenu = finP.resultat; d.pending = false; });
                        hbLog("photo : réponse retrouvée en base — " + finP.resultat.length + " caractères");
                        try { sauverMessageHB("assistant", finP.resultat, false, conversationId); } catch (e) { }
                        return;
                    }
                    if (finP && finP.statut === "en_cours") {
                        ctrl.hbGarderJob = true;   /* encore en route : reprise a la prochaine ouverture */
                        majDerniere((d) => { d.pending = false; d.contenu = tr({ fr: "⏳ Hey Baby termine encore son analyse. Reviens sur Hey Baby dans un moment : ta réponse t'attendra.", en: "⏳ Hey Baby is still finishing its analysis. Come back to Hey Baby in a moment: your answer will be waiting.", es: "⏳ Hey Baby todavía está terminando su análisis. Vuelve a Hey Baby en un momento: tu respuesta te estará esperando.", it: "⏳ Hey Baby sta ancora finendo la sua analisi. Torna su Hey Baby tra poco: la tua risposta ti aspetterà.", ja: "⏳ Hey Babyはまだ分析中です。少ししてからHey Babyに戻ってね。答えが待っています。", de: "⏳ Hey Baby ist noch mit der Analyse beschäftigt. Komm gleich zu Hey Baby zurück: Deine Antwort wartet auf dich.", ar: "⏳ ما زالت Hey Baby تُنهي تحليلها. عودي إلى Hey Baby بعد قليل: ستكون إجابتكِ بانتظاركِ.", zh: "⏳ Hey Baby 还在完成分析。稍后回到 Hey Baby：你的回答会在那里等你。", nl: "⏳ Hey Baby is nog bezig met de analyse. Kom zo terug naar Hey Baby: je antwoord wacht op je.", pt: "⏳ A Hey Baby ainda está terminando a análise. Volte à Hey Baby daqui a pouco: sua resposta estará esperando por você.", sv: "⏳ Hey Baby håller fortfarande på med analysen. Kom tillbaka till Hey Baby om en stund: ditt svar väntar på dig.", ru: "⏳ Hey Baby ещё заканчивает анализ. Вернись в Hey Baby чуть позже: ответ будет тебя ждать.", pl: "⏳ Hey Baby wciąż kończy analizę. Wróć do Hey Baby za chwilę: odpowiedź będzie na ciebie czekać.", ko: "⏳ Hey Baby가 아직 분석을 마무리하고 있어요. 잠시 후 Hey Baby로 돌아와 주세요: 답변이 기다릴 거예요." }); });
                        return;
                    }
                } catch (eLp) { }
            }
            const detailTech = err && err.hbCode ? (" — code " + err.hbCode + (err.hbReqId ? " — reqId " + err.hbReqId : "")) : "";
            hbLog(interrompu ? "requête interrompue" : "erreur", (err && err.message) ? err.message : String(err), "après " + (Date.now() - t0) + " ms" + detailTech);
            majDerniere((d) => { d.pending = false; if (!d.contenu) d.contenu = interrompu ? t("heybaby_interrompu") : (hypeMessageIA(err && err.hbCode, langue) || t("souci_connexion")); });
            diagHB(interrompu ? "interrompu (d\u00e9lai de " + Math.round(HEYBABY_TIMEOUT_MS / 1000) + " s d\u00e9pass\u00e9 ou bouton stop)" : "envoi", ((err && err.message) ? err.message : String(err)) + (err && err.hbErreur ? " \u2014 " + err.hbErreur : "") + (err && err.hbCode ? " \u2014 " + err.hbCode + (err.hbMessage ? " " + err.hbMessage : "") : ""));
        }
        finally {
            clearTimeout(minuteur);
            abortRef.current = null;
            setEnCours(false);
            try { rafraichirQuotaIA(); } catch (eQ) { }   /* 14/10 (livraison A) : le compteur affiché revient à la valeur du serveur (question rendue, etc.) */
            /* 26/09 (401) : le job note est efface des que l analyse a une issue (reponse, erreur, arret, delai) -
               SAUF si on a quitte l ecran : il reste note pour etre repris a la prochaine ouverture. */
            if (jobCourant && !ctrl.hbUnmount && !ctrl.hbGarderJob) { try { const jN = JSON.parse(localStorage.getItem(HEYBABY_JOB_CLE) || "null"); if (jN && jN.jobId === jobCourant) localStorage.removeItem(HEYBABY_JOB_CLE); } catch (eF) { } }
        }
    };
    envoyerRef.current = envoyer; /* 26/09 (401) : la reprise appelle toujours la derniere version de envoyer */
    /* ===== 21/10 — HEY BABY RESPONSIVE (brief « Claude-Hype-Hey-Baby-responsive ») =====
       Ordinateur ≥ 1024 px : colonne Historique permanente (260 px) ; tablette 768-1023 : colonne de 205 px ;
       téléphone : une colonne, bouton « Historique » qui ouvre un panneau à 85 %.
       Conversations = lignes de conversations_heybaby groupées par conversation_id (aucun second stockage).
       Palette : #070A08, pétrole #101D22 / #101A1D, ivoire #F3EEE4, champagne #C9A66B — plus aucun cyan ici. */
    const HBR = (k, x) => hbRTxt(langue, k, x);
    const hbBureau = (typeof useHypeLarge === "function") ? useHypeLarge() : false;
    const hbTabletteMq = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;
    const hbVue = hbBureau ? "bureau" : (hbTabletteMq ? "tablette" : "tel");
    const hbRtl = langue === "ar";
    const hbColW = hbVue === "bureau" ? 260 : (hbVue === "tablette" ? 205 : 0);
    const hbMainRef = useRef(null);
    const hbScrollRef = useRef(null);
    const [hbTaille, setHbTaille] = useState({ w: 0, h: 0 });
    useEffect(() => {
        const el = hbMainRef.current; if (!el) return;
        const lire = () => { try { const r = el.getBoundingClientRect(); setHbTaille((p) => (Math.abs(p.w - r.width) < 1 && Math.abs(p.h - r.height) < 1) ? p : { w: r.width, h: r.height }); } catch (e) { } };
        lire();
        let ro = null;
        try { if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(lire); ro.observe(el); } } catch (e) { ro = null; }
        window.addEventListener("resize", lire);
        return () => { try { if (ro) ro.disconnect(); } catch (e) { } window.removeEventListener("resize", lire); };
    }, [hbVue]);
    useEffect(() => { if (hbVue !== "tel" && histoOuvert) setHistoOuvert(false); }, [hbVue]);
    const [hbConvs, setHbConvs] = useState(null);          /* null = chargement */
    const [hbConvsErr, setHbConvsErr] = useState(false);
    const [hbMeta, setHbMeta] = useState(false);
    const [hbMenu, setHbMenu] = useState(null);            /* { type: "entete"|"ligne"|"echange", id, idx, rect } */
    const [hbConfirm, setHbConfirm] = useState(null);      /* { type: "echange"|"vider"|"supprimer"|"occupe", id, idx, envoi, erreur } */
    const [hbRenom, setHbRenom] = useState(null);          /* { id, valeur, envoi, erreur } */
    const [hbVoirPlus, setHbVoirPlus] = useState(false);
    const hbOpenerRef = useRef(null);
    const hbMenuRef = useRef(null);
    const hbDialogRef = useRef(null);
    const hbPanneauRef = useRef(null);
    const hbHistoBtnRef = useRef(null);
    const hbChoixRef = useRef(false);
    const hbRendreFocus = () => { const el = hbOpenerRef.current; hbOpenerRef.current = null; setTimeout(() => { try { if (el && document.body.contains(el)) el.focus(); } catch (e) { } }, 0); };
    const hbChargerConvs = () => {
        setHbConvsErr(false);
        try {
            listerConversationsHB().then((r) => {
                if (r.error || !r.data) { setHbConvsErr(true); setHbConvs((p) => p || []); return; }
                setHbMeta(!!r.meta);
                setHbConvs((p) => {
                    /* une conversation vidée reste listée tant que l'écran est ouvert, même sans la table des noms */
                    const ids = {}; r.data.forEach((c) => { ids[c.id] = 1; });
                    const gardees = (p || []).filter((c) => c.garder && !ids[c.id]);
                    return r.data.concat(gardees).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
                });
            }).catch(() => { setHbConvsErr(true); setHbConvs((p) => p || []); });
        } catch (e) { setHbConvsErr(true); setHbConvs((p) => p || []); }
    };
    useEffect(() => { hbChargerConvs(); }, [conversationId]);
    /* 22/10 — CATEGORIES (voir le bloc HB_CAT_TABLE) */
    const [hbCats, setHbCats] = useState({});
    const [hbCatsOk, setHbCatsOk] = useState(false);
    const [hbChevauxNoms, setHbChevauxNoms] = useState(null);
    const [hbFiltre, setHbFiltre] = useState(null);
    const [hbChevOuvert, setHbChevOuvert] = useState(false);
    const [hbCatDlg, setHbCatDlg] = useState(null);       /* { id, sel: [], envoi, erreur } */
    const hbCatsRef = useRef({});
    hbCatsRef.current = hbCats;
    const hbCatUserRef = useRef(null);
    useEffect(() => {
        let vivant = true;
        (async () => {
            try {
                const user = await utilisateurActuel(); if (!user || !vivant) return;
                hbCatUserRef.current = user;
                const lues = await hbCatLire(user);
                const noms = await hbNomsChevaux();
                if (!vivant) return;
                setHbChevauxNoms(noms);
                if (!lues) return;                        /* table absente : tout marche sans */
                let tout = lues;
                const cleFait = "hb_cat_passe_v1_" + user.id;
                let fait = false; try { fait = localStorage.getItem(cleFait) === "1"; } catch (e) { }
                if (!fait) {
                    const ajout = await hbCatClasserAnciens(user, noms, lues);
                    if (ajout) {
                        tout = Object.assign({}, lues);
                        ajout.forEach((l) => { tout[l[0]] = (tout[l[0]] || []).concat([l[1]]); });
                        try { localStorage.setItem(cleFait, "1"); } catch (e) { }
                    }
                }
                if (vivant) { setHbCats(tout); setHbCatsOk(true); }
            } catch (e) { }
        })();
        return () => { vivant = false; };
    }, []);
    /* une conversation qui vient de recevoir une réponse : on repère les chevaux et thèmes cités dans les questions */
    useEffect(() => {
        if (enCours || !hbCatsOk || !conversationId || hbChevauxNoms === null) return;
        const qs = messages.filter((m) => m.role === "user" && m.contenu).map((m) => String(m.contenu));
        if (!qs.length) return;
        const user = hbCatUserRef.current; if (!user) return;
        const deja = hbCatsRef.current[conversationId] || [];
        const retires = _hbRetires();
        const neufs = hbCatDetecter(qs, hbChevauxNoms).filter((c) => deja.indexOf(c) < 0 && retires.indexOf(conversationId + "|" + c) < 0);
        if (!neufs.length) return;
        hbCatAjouter(user, neufs.map((c) => [conversationId, c]), true).then((ok) => {
            if (ok) setHbCats((p) => { const n = Object.assign({}, p); n[conversationId] = (n[conversationId] || []).concat(neufs.filter((c) => (n[conversationId] || []).indexOf(c) < 0)); return n; });
        });
    }, [enCours, messages.length, conversationId, hbCatsOk, hbChevauxNoms]);
    const hbCatsDe = (id) => (hbCats[id] || []);
    const hbOuvrirCat = (id) => { setHbMenu(null); setHbCatDlg({ id: id, sel: hbCatsDe(id).slice(), envoi: false, erreur: "" }); };
    const hbValiderCat = async () => {
        const d = hbCatDlg; if (!d || d.envoi) return;
        const user = hbCatUserRef.current; if (!user) { setHbCatDlg(Object.assign({}, d, { erreur: HBR("catErr") })); return; }
        const avant = hbCatsDe(d.id);
        const ajouts = d.sel.filter((c) => avant.indexOf(c) < 0);
        const retraits = avant.filter((c) => d.sel.indexOf(c) < 0);
        setHbCatDlg(Object.assign({}, d, { envoi: true, erreur: "" }));
        const ok1 = await hbCatAjouter(user, ajouts.map((c) => [d.id, c]), false);
        const ok2 = ok1 ? await hbCatRetirer(user, d.id, retraits) : false;
        if (!ok1 || !ok2) { setHbCatDlg(Object.assign({}, d, { envoi: false, erreur: HBR("catErr") })); return; }
        const ret = _hbRetires(); retraits.forEach((c) => { const k = d.id + "|" + c; if (ret.indexOf(k) < 0) ret.push(k); });
        ajouts.forEach((c) => { const k = d.id + "|" + c; const i = ret.indexOf(k); if (i >= 0) ret.splice(i, 1); }); _hbRetiresSauver(ret);
        setHbCats((p) => { const n = Object.assign({}, p); n[d.id] = d.sel.slice(); return n; });
        setHbCatDlg(null); hbRendreFocus();
    };
    const hbEnCoursAvant = useRef(false);
    useEffect(() => {
        if (hbEnCoursAvant.current && !enCours) { const tm = setTimeout(hbChargerConvs, 1500); hbEnCoursAvant.current = enCours; return () => clearTimeout(tm); }
        hbEnCoursAvant.current = enCours;
    }, [enCours]);
    /* l'écran défile dans sa propre zone : plus de scrollIntoView, qui faisait aussi glisser la page entière (en-tête caché sur téléphone) */
    useEffect(() => { try { const sc = hbScrollRef.current; if (sc && messages.length > 1) sc.scrollTo({ top: sc.scrollHeight, behavior: "smooth" }); } catch (e) { } }, [messages, enCours]);
    const hbQuestionsUI = messages.filter((m) => m.role === "user");
    const hbListe = (() => {
        const l = (hbConvs || []).slice();
        if (conversationId && !l.some((c) => c.id === conversationId) && hbQuestionsUI.length) {
            const q0 = hbQuestionsUI[0];
            l.unshift({ id: conversationId, titre: "", titreAuto: _hbTitreAuto(q0.contenu), photo: !String(q0.contenu || "").trim(), date: new Date().toISOString(), nb: hbQuestionsUI.length });
        }
        return l;
    })();
    const hbConvActive = hbListe.find((c) => c.id === conversationId) || null;
    const hbNom = (c) => (c && (c.titre || c.titreAuto)) || (c && c.photo ? HBR("photo") : HBR("sansTitre"));
    const hbDate = (iso) => {
        try {
            const d = new Date(iso); if (isNaN(d.getTime())) return "";
            const jours = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(d.getTime()).setHours(0, 0, 0, 0)) / 86400000);
            if (jours < 7 && typeof Intl !== "undefined" && Intl.RelativeTimeFormat) return new Intl.RelativeTimeFormat(langue, { numeric: "auto" }).format(-jours, "day");
            return d.toLocaleDateString(langue, { day: "numeric", month: "short" });
        } catch (e) { return ""; }
    };
    const hbOuvrirMenu = (e, menu) => {
        try { e.stopPropagation(); } catch (eS) { }
        const btn = e.currentTarget; hbOpenerRef.current = btn;
        let rect = null; try { rect = btn.getBoundingClientRect(); } catch (eR) { }
        setHbMenu(Object.assign({ rect: rect }, menu));
    };
    const hbFermerMenu = (rendre) => { setHbMenu(null); if (rendre) hbRendreFocus(); };
    /* fermer le menu AVANT d'ouvrir la confirmation (le focus reviendra au bouton « ⋯ » d'origine) */
    const hbDemander = (conf) => { setHbMenu(null); setHbConfirm(Object.assign({ envoi: false, erreur: "" }, enCours ? { type: "occupe" } : conf)); };
    const hbFermerConfirm = () => { setHbConfirm((c) => (c && c.envoi) ? c : null); hbRendreFocus(); };
    const hbOuvrirConv = (id) => {
        if (enCours) { hbDemander({ type: "occupe" }); return; }
        setHistoOuvert(false);
        if (id === conversationId) return;
        try { localStorage.setItem(CLE_CONV_HB, id); } catch (e) { }
        hbChoixRef.current = true;
        setMessages([{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }]);
        setHbVoirPlus(false);
        setConversationId(id);
    };
    const hbNouvelle = () => {
        if (enCours) { hbDemander({ type: "occupe" }); return; }
        if (hbQuestionsUI.length) {
            const msg = tr({ fr: "Démarrer une nouvelle conversation ? L'historique actuel restera consultable mais Hey Baby ne s'en souviendra plus.", en: "Start a new conversation? The current history stays available, but Hey Baby won't remember it anymore.", es: "¿Iniciar una nueva conversación? El historial actual seguirá disponible, pero Hey Baby ya no lo recordará.", it: "Avviare una nuova conversazione? La cronologia attuale resterà consultabile, ma Hey Baby non se ne ricorderà più.", ja: "新しい会話を始めますか？現在の履歴は閲覧できますが、Hey Babyはそれを覚えなくなります。", de: "Eine neue Konversation starten? Der aktuelle Verlauf bleibt einsehbar, aber Hey Baby wird sich nicht mehr daran erinnern.", ar: "بدء محادثة جديدة؟ سيبقى السجل الحالي متاحا للاطلاع لكن Hey Baby لن يتذكره.", zh: "要开始新的对话吗？当前的历史记录仍可查看，但 Hey Baby 将不再记得它。", nl: "Een nieuw gesprek starten? De huidige geschiedenis blijft te raadplegen, maar Hey Baby zal zich er niets meer van herinneren.", pt: "Iniciar uma nova conversa? O histórico atual continuará disponível para consulta, mas a Hey Baby não vai mais se lembrar dele.", sv: "Starta en ny konversation? Den nuvarande historiken finns kvar att läsa, men Hey Baby kommer inte att minnas den längre.", ru: "Начать новый разговор? Текущая история останется доступной, но Hey Baby больше не будет её помнить.", pl: "Rozpocząć nową rozmowę? Obecna historia nadal będzie dostępna, ale Hey Baby już jej nie zapamięta.", ko: "새 대화를 시작할까요? 지금까지의 기록은 계속 볼 수 있지만 Hey Baby는 더 이상 기억하지 못해요." });
            if (!window.confirm(msg)) return;
        }
        setHistoOuvert(false);
        const id = nouvelleConversationHB();
        hbChoixRef.current = true;
        setConversationId(id);
        setHbVoirPlus(false);
        setMessages([{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }]);
    };
    const hbToast = (txt) => { setToastHB(txt); setTimeout(() => setToastHB(null), 2400); };
    const hbValider = async () => {
        const c = hbConfirm; if (!c || c.envoi) return;
        if (c.type === "occupe") { arreter(); setHbConfirm(null); hbRendreFocus(); return; }
        if (enCours) { setHbConfirm({ type: "occupe", envoi: false, erreur: "" }); return; }
        setHbConfirm(Object.assign({}, c, { envoi: true, erreur: "" }));
        let r = { error: "?" };
        try {
            if (c.type === "echange") {
                const i = c.idx; const m = messages[i];
                if (!m || m.role !== "user") throw new Error("echange");
                let rang = 0; for (let k = i + 1; k < messages.length; k++) if (messages[k].role === "user" && String(messages[k].contenu || "") === String(m.contenu || "")) rang++;
                r = await supprimerEchangeHB(conversationId, m.contenu, rang);
                if (!r.error) {
                    setMessages((prev) => { if (prev[i] !== m) return prev; let j = i + 1; while (j < prev.length && prev[j].role !== "user") j++; return prev.slice(0, i).concat(prev.slice(j)); });
                    hbToast(HBR("toastEch"));
                }
            } else if (c.type === "vider") {
                const conv = hbListe.find((x) => x.id === c.id);
                r = await viderConversationHB(c.id, conv ? (conv.titre || conv.titreAuto || null) : null);
                if (!r.error) {
                    setHbConvs((p) => { const l = (p || []).slice(); const ix = l.findIndex((x) => x.id === c.id); const base = conv || { id: c.id, titre: "", titreAuto: "", photo: false }; const nv = Object.assign({}, base, { titre: hbMeta ? (base.titre || base.titreAuto || "") : base.titre, nb: 0, garder: true, date: new Date().toISOString() }); if (ix >= 0) l[ix] = nv; else l.unshift(nv); return l; });
                    if (c.id === conversationId) { setMessages([{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }]); setHbVoirPlus(false); }
                    hbToast(HBR("toastVid"));
                }
            } else if (c.type === "supprimer") {
                r = await supprimerConversationHB(c.id);
                if (!r.error) {
                    setHbConvs((p) => (p || []).filter((x) => x.id !== c.id));
                    if (c.id === conversationId) { const id = nouvelleConversationHB(); hbChoixRef.current = true; setConversationId(id); setMessages([{ role: "assistant", contenu: t("assistant_msg_intro"), intro: true }]); setHbVoirPlus(false); }
                    hbToast(HBR("toastSup"));
                }
            }
        } catch (e) { r = { error: String(e) }; }
        if (r.error) { setHbConfirm(Object.assign({}, c, { envoi: false, erreur: HBR("erreur") })); return; }
        setHbConfirm(null);
        /* le bouton d'origine a pu disparaître (ligne supprimée) : on rend le focus au bouton Historique ou au champ */
        hbRendreFocus();
    };
    const hbOuvrirRenom = (id) => { const c = hbListe.find((x) => x.id === id); setHbMenu(null); setHbRenom({ id: id, valeur: (c && (c.titre || c.titreAuto)) || "", envoi: false, erreur: "" }); };
    const hbValiderRenom = async () => {
        const rn = hbRenom; if (!rn || rn.envoi) return;
        setHbRenom(Object.assign({}, rn, { envoi: true, erreur: "" }));
        let r; try { r = await renommerConversationHB(rn.id, rn.valeur); } catch (e) { r = { error: String(e) }; }
        if (r && r.error) { setHbRenom(Object.assign({}, rn, { envoi: false, erreur: HBR("erreurNom") })); return; }
        const t2 = String(rn.valeur || "").replace(/\s+/g, " ").trim().slice(0, HB_TITRE_MAX);
        setHbConvs((p) => { const l = (p || []).slice(); const ix = l.findIndex((x) => x.id === rn.id); if (ix >= 0) l[ix] = Object.assign({}, l[ix], { titre: t2 }); else { const c = hbListe.find((x) => x.id === rn.id); if (c) l.unshift(Object.assign({}, c, { titre: t2 })); } return l; });
        setHbRenom(null); hbToast(HBR("toastNom")); hbRendreFocus();
    };
    /* Échap ferme menu, confirmation, renommage ou panneau ; Tab reste dans la fenêtre ouverte */
    useEffect(() => {
        const ouvert = hbMenu || hbConfirm || hbRenom || hbCatDlg || histoOuvert;
        if (!ouvert) return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                if (hbMenu) hbFermerMenu(true);
                else if (hbRenom) { if (!hbRenom.envoi) { setHbRenom(null); hbRendreFocus(); } }
                else if (hbConfirm) hbFermerConfirm();
                else if (histoOuvert) { setHistoOuvert(false); setTimeout(() => { try { hbHistoBtnRef.current && hbHistoBtnRef.current.focus(); } catch (eF) { } }, 0); }
                return;
            }
            if (e.key === "Tab") {
                const boite = hbMenu ? hbMenuRef.current : ((hbConfirm || hbRenom) ? hbDialogRef.current : (histoOuvert ? hbPanneauRef.current : null));
                if (!boite) return;
                const f = Array.prototype.slice.call(boite.querySelectorAll("button:not([disabled]), input, [tabindex='0']"));
                if (!f.length) return;
                const premier = f[0], dernier = f[f.length - 1];
                if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
                else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
                else if (!boite.contains(document.activeElement)) { e.preventDefault(); premier.focus(); }
            }
            if (hbMenu && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                const f = Array.prototype.slice.call((hbMenuRef.current || document).querySelectorAll("[role='menuitem']"));
                if (!f.length) return; e.preventDefault();
                const ix = f.indexOf(document.activeElement);
                f[(ix + (e.key === "ArrowDown" ? 1 : -1) + f.length) % f.length].focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [hbMenu, hbConfirm, hbRenom, histoOuvert]);
    useEffect(() => { if (!hbMenu) return; const tm = setTimeout(() => { try { const b = hbMenuRef.current && hbMenuRef.current.querySelector("[role='menuitem']"); if (b) b.focus(); } catch (e) { } }, 0); return () => clearTimeout(tm); }, [hbMenu]);
    useEffect(() => { if (!hbConfirm && !hbRenom) return; const tm = setTimeout(() => { try { const d = hbDialogRef.current; if (!d || d.contains(document.activeElement)) return; const b = d.querySelector("input") || d.querySelector("button:not([disabled])"); if (b) b.focus(); } catch (e) { } }, 0); return () => clearTimeout(tm); }, [!!hbConfirm, !!hbRenom]);
    useEffect(() => { if (!histoOuvert) return; const tm = setTimeout(() => { try { const b = hbPanneauRef.current && hbPanneauRef.current.querySelector("button"); if (b) b.focus(); } catch (e) { } }, 30); return () => clearTimeout(tm); }, [histoOuvert]);
    const suggestions = coursCtx ? [
        coursCtx.cheval ? ("\uD83D\uDC34 " + tr({ fr: "Comment appliquer ce cours avec " + coursCtx.cheval + " ?", en: "How can I apply this lesson with " + coursCtx.cheval + "?", es: "\u00bfC\u00f3mo aplicar este curso con " + coursCtx.cheval + "?", it: "Come applicare questo corso con " + coursCtx.cheval + "?", ja: coursCtx.cheval + "\u3068\u3053\u306e\u30ec\u30c3\u30b9\u30f3\u3092\u3069\u3046\u5b9f\u8df5\u3067\u304d\u307e\u3059\u304b\uff1f", de: "Wie wende ich diesen Kurs bei " + coursCtx.cheval + " an?", ar: "\u0643\u064a\u0641 \u0623\u0637\u0628\u0642 \u0647\u0630\u0627 \u0627\u0644\u062f\u0631\u0633 \u0645\u0639 " + coursCtx.cheval + "\u061f", zh: ("怎样和 " + coursCtx.cheval + " 一起应用这节课？"), nl: ("Hoe pas ik deze les toe met " + coursCtx.cheval + "?"), pt: ("Como aplicar esta aula com " + coursCtx.cheval + "?"), sv: ("Hur kan jag tillämpa den här lektionen med " + coursCtx.cheval + "?"), ru: ("Как применить этот урок с " + coursCtx.cheval + "?"), pl: ("Jak zastosować tę lekcję w pracy z koniem (" + coursCtx.cheval + ")?"), ko: (coursCtx.cheval + "와(과) 이 레슨을 어떻게 적용할 수 있을까요?") })) : null,
        tr({ fr: "Explique-moi ce chapitre autrement", en: "Explain this chapter another way", es: "Expl\u00edcame este cap\u00edtulo de otra manera", it: "Spiegami questo capitolo in un altro modo", ja: "\u3053\u306e\u7ae0\u3092\u5225\u306e\u8a00\u3044\u65b9\u3067\u8aac\u660e\u3057\u3066" , de: "Erkl\u00e4re mir dieses Kapitel anders", ar: "\u0627\u0634\u0631\u062d\u064a \u0644\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u0635\u0644 \u0628\u0637\u0631\u064a\u0642\u0629 \u0623\u062e\u0631\u0649", zh: "换一种方式给我讲讲这一章", nl: "Leg dit hoofdstuk op een andere manier uit", pt: "Explique este capítulo de outro jeito", sv: "Förklara det här kapitlet på ett annat sätt", ru: "Объясни мне эту главу по-другому", pl: "Wyjaśnij mi ten rozdział inaczej", ko: "이 챕터를 다르게 설명해 줘"}),
        tr({ fr: "Donne-moi un exercice", en: "Give me an exercise", es: "Dame un ejercicio", it: "Dammi un esercizio", ja: "\u7df4\u7fd2\u3092\u51fa\u3057\u3066" , de: "Gib mir eine \u00dcbung", ar: "\u0623\u0639\u0637\u064a\u0646\u064a \u062a\u0645\u0631\u064a\u0646\u0627", zh: "给我一个练习", nl: "Geef me een oefening", pt: "Me dê um exercício", sv: "Ge mig en övning", ru: "Дай мне упражнение", pl: "Daj mi ćwiczenie", ko: "운동 하나 알려 주세요"}),
        tr({ fr: "R\u00e9sume-moi ce chapitre", en: "Summarise this chapter for me", es: "Res\u00fameme este cap\u00edtulo", it: "Riassumimi questo capitolo", ja: "\u3053\u306e\u7ae0\u3092\u8981\u7d04\u3057\u3066" , de: "Fasse mir dieses Kapitel zusammen", ar: "\u0644\u062e\u0635\u064a \u0644\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u0635\u0644", zh: "帮我总结这一章节", nl: "Vat dit hoofdstuk voor me samen", pt: "Resuma este capítulo para mim", sv: "Sammanfatta det här kapitlet åt mig", ru: "Перескажи мне эту главу кратко", pl: "Podsumuj mi ten rozdział", ko: "이 챕터를 요약해 주세요"})
    ].filter(Boolean) : [t("suggestion_1"), t("suggestion_2"), t("suggestion_3"), t("suggestion_4")];
    /* ----- rendu Hey Baby responsive ----- */
    const HB_C = { fond: "#070A08", petrole: "#101D22", petrole2: "#101A1D", ivoire: "#F3EEE4", champ: "#C9A66B", doux: "rgba(243,238,228,0.62)", filet: "rgba(201,166,107,0.22)", rouge: "#E08A80" };
    const HB_SERIF = "'Cormorant Garamond', Georgia, serif";
    const HB_SANS = "'Montserrat', 'Inter', sans-serif";
    const hbDebut = hbRtl ? "right" : "left";
    const hbFin = hbRtl ? "left" : "right";
    const hbIconeBulles = (taille) => React.createElement("svg", { width: taille || 18, height: taille || 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flexShrink: 0, transform: hbRtl ? "scaleX(-1)" : "none" } },
        React.createElement("path", { d: "M14.5 4H5.5A2.5 2.5 0 0 0 3 6.5v5A2.5 2.5 0 0 0 5.5 14H6v3l3.5-3h5a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 14.5 4z" }),
        React.createElement("path", { d: "M17 8.5h1.5A2.5 2.5 0 0 1 21 11v4.5a2.5 2.5 0 0 1-2.5 2.5H18v2.5L15 18h-3.5a2.5 2.5 0 0 1-2-1" }));
    const hbIconeCorbeille = () => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flexShrink: 0 } }, React.createElement("path", { d: "M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6" }));
    const hbIconeBalai = () => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flexShrink: 0 } }, React.createElement("path", { d: "M5 12h14M7 12l1 8h8l1-8M10 12V4h4v8" }));
    const hbIconeCrayon = () => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flexShrink: 0 } }, React.createElement("path", { d: "M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3" }));
    const hbBtnRond = (props, contenu) => React.createElement("button", Object.assign({ type: "button" }, props, { style: Object.assign({ width: 44, height: 44, borderRadius: "50%", background: "rgba(7,10,8,0.55)", border: "1px solid " + HB_C.filet, color: HB_C.ivoire, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", fontFamily: HB_SANS, padding: 0, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }, props.style || {}) }), contenu);
    const hbAPoser = hbQuestionsUI.length > 0;
    const hbCompteur = React.createElement("span", { role: "status", "aria-label": tr({ fr: "Questions restantes aujourd'hui", en: "Questions left today", es: "Preguntas restantes hoy", it: "Domande rimaste oggi", ja: "今日の残り質問数", de: "Heute verbleibende Fragen", ar: "الأسئلة المتبقية اليوم", zh: "今日剩余提问次数", nl: "Resterende vragen vandaag", pt: "Perguntas restantes hoje", sv: "Frågor kvar i dag", ru: "Осталось вопросов на сегодня", pl: "Pytania pozostałe na dziś", ko: "오늘 남은 질문" }) + " : " + Math.max(0, limiteAffichee - questionsUtilisees), style: { fontSize: 14, fontWeight: 700, fontFamily: HB_SANS, color: HB_C.champ, background: "rgba(7,10,8,0.55)", border: "1.5px solid " + HB_C.champ, width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxSizing: "border-box" } }, Math.max(0, limiteAffichee - questionsUtilisees));
    const hbBoutonsFin = React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 } },
        (hbAPoser || hbConvActive) ? hbBtnRond({ onClick: (e) => hbOuvrirMenu(e, { type: "entete", id: conversationId }), "aria-label": HBR("optConv"), "aria-haspopup": "menu", "aria-expanded": !!(hbMenu && hbMenu.type === "entete") }, React.createElement("span", { "aria-hidden": "true", style: { fontSize: 18, lineHeight: 1, letterSpacing: 1, marginTop: -6 } }, "…")) : null,
        hbBtnRond({ onClick: hbNouvelle, "aria-label": HBR("nouvelle"), title: HBR("nouvelle") }, React.createElement("span", { "aria-hidden": "true", style: { fontSize: 22, fontWeight: 300, lineHeight: 1 } }, "+")),
        hbCompteur);
    const hbBoutonRetour = (extra) => React.createElement("button", { type: "button", onClick: retourAssistant, "aria-label": tr({ fr: "Retour", en: "Back", es: "Volver", it: "Indietro", ja: "戻る", de: "Zurück", ar: "رجوع", zh: "返回", nl: "Terug", pt: "Voltar", sv: "Tillbaka", ru: "Назад", pl: "Wróć", ko: "뒤로" }), style: Object.assign({ height: 40, padding: "0 14px", borderRadius: 12, background: "rgba(7,10,8,0.55)", border: "1px solid " + HB_C.filet, color: HB_C.ivoire, fontSize: 13, fontWeight: 600, fontFamily: HB_SANS, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0 }, extra || {}) },
        React.createElement("span", { "aria-hidden": "true", style: { fontSize: 17, lineHeight: 1, marginTop: -2 } }, hbRtl ? "›" : "‹"),
        React.createElement("span", null, tr({ fr: "Retour", en: "Back", es: "Volver", it: "Indietro", ja: "戻る", de: "Zurück", ar: "رجوع", zh: "返回", nl: "Terug", pt: "Voltar", sv: "Tillbaka", ru: "Назад", pl: "Wróć", ko: "뒤로" })));
    /* 22/10 : l'accès « Mes conseils Hey Baby » (ajouté le 21/10 au soir dans la colonne de droite) passe dans l'Historique */
    const hbBoutonConseils = () => React.createElement("button", { type: "button", onClick: () => { setHistoOuvert(false); setHbPanCote(true); }, style: { minHeight: 44, padding: "10px 14px", borderRadius: 12, background: "rgba(16,29,34,0.7)", border: "1px solid " + HB_C.filet, color: HB_C.ivoire, fontFamily: HB_SANS, fontSize: hbVue === "tablette" ? 12.5 : 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, cursor: "pointer", textAlign: "start", lineHeight: 1.25 } },
        React.createElement("span", null, "\uD83D\uDCCC " + tr({ fr: "Mes conseils Hey Baby", en: "My Hey Baby tips", es: "Mis consejos Hey Baby", it: "I miei consigli Hey Baby", ja: "\u30a2\u30c9\u30d0\u30a4\u30b9", de: "Meine Hey-Baby-Tipps", ar: "\u0646\u0635\u0627\u0626\u062d\u064a \u0645\u0646 Hey Baby", zh: "我的 Hey Baby 建议", nl: "Mijn Hey Baby-tips", pt: "Minhas dicas do Hey Baby", sv: "Mina Hey Baby-tips", ru: "Мои советы Hey Baby" , pl: "Moje porady Hey Baby", ko: "내 Hey Baby 조언" })),
        React.createElement("span", { "aria-hidden": "true", style: { color: HB_C.champ, fontSize: 18 } }, hbRtl ? "\u2039" : "\u203a"));
    /* 22/10 — catégories : filtre, pastilles, étiquettes */
    const hbListeF = hbFiltre ? hbListe.filter((c) => hbCatsDe(c.id).indexOf(hbFiltre) >= 0) : hbListe;
    const hbCompteCats = (() => { const n = {}; hbListe.forEach((c) => { hbCatsDe(c.id).forEach((k) => { n[k] = (n[k] || 0) + 1; }); }); return n; })();
    const hbCatsPresentes = Object.keys(hbCompteCats);
    const hbThemesPresents = HB_THEMES.filter((k) => hbCompteCats["t:" + k]).map((k) => "t:" + k);
    const hbChevauxPresents = hbCatsPresentes.filter((k) => k.indexOf("c:") === 0).sort();
    const hbPuce = (cle, texte, nb, actif, onClick, extra) => React.createElement("button", { key: cle, type: "button", onClick: onClick, "aria-pressed": actif, style: Object.assign({ minHeight: 34, padding: "5px 11px", borderRadius: 999, border: "1px solid " + (actif ? HB_C.champ : "rgba(243,238,228,0.22)"), background: actif ? "rgba(201,166,107,0.20)" : "rgba(7,10,8,0.4)", color: HB_C.ivoire, fontSize: 12.5, fontWeight: actif ? 700 : 500, fontFamily: HB_SANS, cursor: "pointer", whiteSpace: "nowrap" }, extra || {}) }, texte + (nb != null ? " · " + nb : ""));
    const hbPuces = hbCatsPresentes.length ? React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, margin: "0 6px 10px" } },
        hbPuce("tout", HBR("catToutes"), null, !hbFiltre, () => setHbFiltre(null)),
        hbThemesPresents.map((k) => hbPuce(k, hbCatNom(langue, k), hbCompteCats[k], hbFiltre === k, () => setHbFiltre(hbFiltre === k ? null : k))),
        hbChevauxPresents.length ? hbPuce("chevaux", "🐴 " + HBR("catChevaux") + (hbChevOuvert || (hbFiltre && hbFiltre.indexOf("c:") === 0) ? " ▴" : " ▾"), hbChevauxPresents.length, false, () => setHbChevOuvert(!hbChevOuvert), { borderStyle: "dashed" }) : null,
        (hbChevOuvert || (hbFiltre && hbFiltre.indexOf("c:") === 0)) ? hbChevauxPresents.map((k) => hbPuce(k, hbCatNom(langue, k), hbCompteCats[k], hbFiltre === k, () => setHbFiltre(hbFiltre === k ? null : k))) : null) : null;
    const hbTagsConv = (id) => { const l = hbCatsDe(id); if (!l.length) return null; const vus = l.slice(0, 2).map((k) => hbCatNom(langue, k)); return React.createElement("span", { style: { fontSize: 10.5, color: HB_C.champ, opacity: 0.85, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, vus.join(" · ") + (l.length > 2 ? " +" + (l.length - 2) : "")); };
    /* liste de l'historique : colonne permanente (ordinateur, tablette) ou panneau (téléphone) */
    const hbRendreHistorique = (panneau) => React.createElement("nav", { "aria-label": HBR("historique"), style: { display: "flex", flexDirection: "column", height: "100%", minHeight: 0, boxSizing: "border-box", fontFamily: HB_SANS } },
        React.createElement("div", { style: { padding: panneau ? "calc(env(safe-area-inset-top) + 18px) 16px 12px" : "18px 14px 12px", display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 } },
            panneau
                ? React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } },
                    React.createElement("h2", { style: { margin: 0, fontFamily: HB_SERIF, fontWeight: 600, fontSize: 28, color: HB_C.ivoire, letterSpacing: 0.3 } }, HBR("historique")),
                    hbBtnRond({ onClick: () => { setHistoOuvert(false); setTimeout(() => { try { hbHistoBtnRef.current && hbHistoBtnRef.current.focus(); } catch (e) { } }, 0); }, "aria-label": HBR("fermer") }, React.createElement("span", { "aria-hidden": "true", style: { fontSize: 15 } }, "✕")))
                : React.createElement(React.Fragment, null,
                    React.createElement("div", null, hbBoutonRetour()),
                    React.createElement("h2", { style: { margin: "6px 0 0", fontFamily: HB_SERIF, fontWeight: 600, fontSize: hbVue === "bureau" ? 30 : 26, color: HB_C.ivoire, letterSpacing: 0.3 } }, HBR("historique"))),
            React.createElement("button", { type: "button", onClick: hbNouvelle, style: { minHeight: 44, padding: "10px 14px", borderRadius: 12, background: "rgba(7,10,8,0.5)", border: "1px solid " + HB_C.champ, color: HB_C.ivoire, fontFamily: HB_SANS, fontSize: hbVue === "tablette" ? 12.5 : 13.5, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", textAlign: "center", lineHeight: 1.25 } },
                React.createElement("span", { "aria-hidden": "true", style: { fontSize: 19, fontWeight: 300, lineHeight: 1, color: HB_C.champ } }, "+"), HBR("nouvelle")),
            hbBoutonConseils()),
        React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", overscrollBehavior: "contain", padding: (hbVue === "tablette" && !panneau) ? "4px 8px calc(env(safe-area-inset-bottom) + 84px)" : "4px 8px calc(env(safe-area-inset-bottom) + 16px)" } },
            hbConvs === null && !hbListe.length
                ? React.createElement("p", { style: { color: HB_C.doux, fontSize: 13, textAlign: "center", margin: "18px 0" } }, "…")
                : null,
            hbConvsErr ? React.createElement("div", { style: { margin: "6px 6px 10px", fontSize: 12.5, color: HB_C.doux, lineHeight: 1.45 } }, HBR("chargeErr"), " ",
                React.createElement("button", { type: "button", onClick: hbChargerConvs, style: { background: "none", border: "none", color: HB_C.champ, textDecoration: "underline", fontSize: 12.5, padding: "6px 2px", cursor: "pointer", fontFamily: HB_SANS } }, HBR("reessayer"))) : null,
            (hbConvs !== null && !hbListe.length && !hbConvsErr) ? React.createElement("p", { style: { color: HB_C.doux, fontSize: 13, textAlign: "center", margin: "18px 8px", lineHeight: 1.5 } }, HBR("vide")) : null,
            hbPuces,
            (hbFiltre && !hbListeF.length) ? React.createElement("p", { style: { color: HB_C.doux, fontSize: 13, textAlign: "center", margin: "14px 8px", lineHeight: 1.5 } }, HBR("catVide")) : null,
            React.createElement("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 } },
                hbListeF.map((c) => {
                    const actif = c.id === conversationId; const nom = hbNom(c);
                    return React.createElement("li", { key: c.id, style: { position: "relative", display: "flex", alignItems: "stretch", borderRadius: 10, background: actif ? "rgba(26,45,52,0.92)" : "transparent", boxShadow: actif ? ("inset " + (hbRtl ? "-2px" : "2px") + " 0 0 " + HB_C.champ) : "none" } },
                        React.createElement("button", { type: "button", onClick: () => hbOuvrirConv(c.id), "aria-current": actif ? "true" : undefined, title: nom, style: { flex: 1, minWidth: 0, minHeight: 48, padding: "9px 6px 9px 12px", paddingInlineStart: 12, paddingInlineEnd: 4, background: "none", border: "none", color: actif ? HB_C.ivoire : "rgba(243,238,228,0.84)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textAlign: "start", fontFamily: HB_SANS } },
                            React.createElement("span", { style: { color: actif ? HB_C.champ : "rgba(201,166,107,0.7)", display: "flex" } }, hbIconeBulles(17)),
                            React.createElement("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 } },
                                React.createElement("span", { style: { fontSize: hbVue === "tablette" ? 12.5 : 13, fontWeight: actif ? 600 : 500, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "anywhere", unicodeBidi: "plaintext" } }, nom),
                                c.date ? React.createElement("span", { style: { fontSize: 11, color: "rgba(243,238,228,0.5)" } }, hbDate(c.date), actif ? React.createElement("span", { style: { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" } }, " · " + HBR("active")) : null) : null,
                                hbTagsConv(c.id))),
                        React.createElement("button", { type: "button", onClick: (e) => hbOuvrirMenu(e, { type: "ligne", id: c.id }), "aria-label": HBR("optLigne", nom), "aria-haspopup": "menu", "aria-expanded": !!(hbMenu && hbMenu.type === "ligne" && hbMenu.id === c.id), style: { width: 40, minHeight: 44, background: "none", border: "none", color: "rgba(243,238,228,0.7)", cursor: "pointer", fontSize: 18, lineHeight: 1, flexShrink: 0, borderRadius: 8, padding: 0 } }, React.createElement("span", { "aria-hidden": "true", style: { display: "block", marginTop: -6 } }, "…")));
                }))));
    /* image du cheval : telle quelle (21/10, Blandine : « on n'est pas obligés de retirer le turquoise » ; jamais de filtre sur une photo de cheval) ; visage jamais recouvert — quand la place manque, l'image ne s'affiche pas plutôt que d'être voilée */
    const hbVide = messages.length <= 1;
    const hbMainW = hbTaille.w || (typeof window !== "undefined" ? (window.innerWidth - hbColW) : 390);
    const hbMainH = hbTaille.h || (typeof window !== "undefined" ? window.innerHeight : 800);
    const hbGrand = hbVue !== "tel";
    const hbSplit = hbGrand && hbVide && hbMainW >= 860;
    const hbImgH = !hbGrand ? 0 : (hbSplit ? hbMainH : Math.round(hbMainH * (hbVide ? 0.58 : 0.72)));
    const hbImgW = Math.round(hbImgH * 0.707);
    const hbVisageDebut = Math.round(hbImgW * 0.58);          /* le visage occupe 28 % à 55 % de la largeur, côté fin */
    const hbVisageBas = Math.round(hbImgH * 0.48);            /* et 8 % à 46 % de la hauteur */
    const hbEnteteH = hbGrand ? 68 : 0;
    const hbLecture = (() => { if (!hbGrand) return null; const libre = hbMainW - hbVisageDebut - 64; return libre >= 480 ? Math.min(720, libre) : Math.min(720, hbMainW - 56); })();
    const hbAssombrir = hbGrand && !hbVide && (hbMainW - hbVisageDebut - 64) < 480;
    const hbFondCheval = hbGrand
        ? React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, zIndex: 0, background: HB_C.fond, overflow: "hidden", pointerEvents: "none" } },
            React.createElement("div", { style: { position: "absolute", top: 0, [hbFin]: 0, width: hbImgW, height: hbImgH, backgroundImage: `url(${IMG_HEYBABY_FOND})`, backgroundSize: "cover", backgroundPosition: "center top", transform: hbRtl ? "scaleX(-1)" : "none", display: hbAssombrir ? "none" : "block" } }),
            hbAssombrir ? null : React.createElement("div", { style: { position: "absolute", top: 0, [hbFin]: 0, width: hbImgW, height: hbImgH, background: `linear-gradient(to ${hbDebut}, rgba(7,10,8,0) 55%, ${HB_C.fond} 100%), linear-gradient(to bottom, rgba(7,10,8,0) 60%, ${HB_C.fond} 100%)` } }))
        : React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, zIndex: 0, background: HB_C.fond, overflow: "hidden", pointerEvents: "none" } },
            React.createElement("div", { style: { position: "absolute", inset: 0, background: `url(${IMG_HEYBABY_FOND}) center/cover no-repeat`, transform: hbRtl ? "scaleX(-1)" : "none" } }),
            React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(rgba(7,10,8,0.58), rgba(7,10,8,0.74))" } }));
    const hbIdentite = (aligne) => React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: aligne === "debut" ? "flex-start" : "center", textAlign: aligne === "debut" ? "start" : "center", flexShrink: 0 } },
        React.createElement("div", { style: { width: hbGrand ? 132 : 128, height: hbGrand ? 132 : 128, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid " + HB_C.champ, boxShadow: "0 0 26px rgba(201,166,107,0.28)", marginTop: 4, background: HB_C.petrole } },
            React.createElement("img", { src: IMG_HEYBABY_AVATAR, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })),
        React.createElement("h1", { style: { margin: "12px 0 0", fontFamily: HB_SERIF, fontWeight: 600, fontSize: hbGrand ? 40 : 34, letterSpacing: 0.5, color: HB_C.ivoire, lineHeight: 1.05, textShadow: "0 2px 14px rgba(0,0,0,0.6)" } }, t("assistant_titre")),
        React.createElement("p", { style: { margin: "6px 0 0", fontSize: 13, color: HB_C.champ, fontWeight: 600, fontFamily: HB_SANS, display: "flex", alignItems: "center", gap: 6 } }, React.createElement("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: HB_C.champ, boxShadow: "0 0 8px rgba(201,166,107,0.7)" } }), t("en_ligne")),
        React.createElement("p", { style: { margin: "8px 0 0", fontFamily: HB_SERIF, fontStyle: "italic", fontWeight: 500, color: "rgba(243,238,228,0.92)", fontSize: hbGrand ? 20 : 18, lineHeight: 1.3, maxWidth: 320, textShadow: "0 1px 10px rgba(0,0,0,0.6)" } }, t("heybaby_phrase")));
    const hbSuggestionsBase = coursCtx ? suggestions : [HBR("s1"), HBR("s2"), HBR("s3"), HBR("s4"), HBR("s5"), HBR("s6")];
    const hbCarteSugg = (s) => React.createElement("button", { key: s, type: "button", onClick: () => envoyer(s), style: { display: "flex", alignItems: "center", gap: 10, textAlign: "start", minHeight: 52, padding: "12px 14px", borderRadius: 12, background: "rgba(16,29,34,0.86)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(201,166,107,0.42)", fontSize: 13.5, lineHeight: 1.4, color: HB_C.ivoire, fontWeight: 500, fontFamily: HB_SANS, cursor: "pointer", width: "100%", boxSizing: "border-box", overflowWrap: "anywhere" } },
        React.createElement("span", { style: { flex: 1, minWidth: 0 } }, s),
        React.createElement("span", { "aria-hidden": "true", style: { color: HB_C.champ, fontSize: 18, lineHeight: 1, flexShrink: 0 } }, hbRtl ? "‹" : "›"));
    const hbBlocSuggestions = (colonnes) => {
        if (limiteAtteinte) return null;
        const tel = !hbGrand && !coursCtx;
        const liste = (tel && !hbVoirPlus) ? hbSuggestionsBase.slice(0, 4) : hbSuggestionsBase;
        return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: colonnes === 2 ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)", gap: hbGrand ? 12 : 8 } }, liste.map(hbCarteSugg)),
            (tel && hbSuggestionsBase.length > 4) ? React.createElement("button", { type: "button", onClick: () => setHbVoirPlus(!hbVoirPlus), "aria-expanded": hbVoirPlus, style: { alignSelf: "center", background: "none", border: "none", color: HB_C.champ, fontSize: 13, fontWeight: 600, fontFamily: HB_SANS, padding: "10px 12px", minHeight: 44, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 } },
                hbVoirPlus ? HBR("masquer") : HBR("voirPlus"), React.createElement("span", { "aria-hidden": "true", style: { display: "inline-block", transform: hbVoirPlus ? "rotate(180deg)" : "none", fontSize: 11 } }, "▾")) : null);
    };
    const hbIntro = messages[0] && messages[0].intro ? React.createElement(BulleMessage, { key: "intro", role: "assistant", contenu: messages[0].contenu, intro: true }) : null;
    const hbBlocLimite = limiteAtteinte ? React.createElement("div", { style: { background: "linear-gradient(135deg, #14262C, " + HB_C.petrole + ")", border: "1px solid rgba(201,166,107,0.45)", borderRadius: 16, padding: 18, textAlign: "center", marginTop: 8, fontFamily: HB_SANS } },
        React.createElement("p", { style: { color: HB_C.ivoire, fontWeight: 700, fontSize: 15, margin: "0 0 6px" } }, t("limite_atteinte_titre")),
        React.createElement("p", { style: { color: "rgba(243,238,228,0.75)", fontSize: 13, margin: "0 0 16px" } }, t(planAbo === "duo" ? "limite_atteinte_texte_duo" : planAbo === "ai" ? "limite_atteinte_texte_ia" : premium ? "limite_atteinte_texte_premium" : "limite_atteinte_texte")),
        (planAbo === "ai" || planAbo === "duo") ? null : React.createElement(BoutonPrincipal, { texte: t(premium ? "decouvrir_pack_duo" : "decouvrir_premium"), couleur: HB_C.champ, secondaire: true, onClick: () => setEcran("premium") })) : null;
    const hbBulles = messages.map((m, i) => {
        if (i === 0 && m.intro) return null;
        const bulle = React.createElement(BulleMessage, { key: "b" + i, role: m.role, contenu: m.contenu, image: m.image || m.imageVue, imageMarque: m.imageMarque, intro: m.intro, enCours: m.pending, onEpingler: (m.role === "assistant" && !m.intro && !m.pending && m.contenu) ? (() => ouvrirEpingle(i)) : null, onCorriger: (estModoHB && m.role === "assistant" && !m.intro && !m.pending && m.contenu) ? (() => ouvrirCorrection(i)) : null, onClasser: (hbCatsOk && m.role === "assistant" && !m.intro && !m.pending && m.contenu && conversationId) ? (() => hbOuvrirCat(conversationId)) : null });
        if (m.role !== "user") return bulle;
        /* le « ⋯ » d'un échange se pose juste à côté de la question (prop `avant` de BulleMessage) */
        return React.createElement(BulleMessage, { key: "b" + i, role: m.role, contenu: m.contenu, image: m.image || m.imageVue, imageMarque: m.imageMarque, avant: React.createElement("button", { type: "button", onClick: (e) => hbOuvrirMenu(e, { type: "echange", idx: i }), "aria-label": HBR("optEch"), "aria-haspopup": "menu", "aria-expanded": !!(hbMenu && hbMenu.type === "echange" && hbMenu.idx === i), style: { width: 36, height: 44, flexShrink: 0, background: "none", border: "none", color: "rgba(243,238,228,0.55)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0, borderRadius: 8 } }, React.createElement("span", { "aria-hidden": "true", style: { display: "block", marginTop: -6 } }, "…")) });
    });
    const hbContenu = (() => {
        if (hbSplit) {
            /* ordinateur, conversation vide : identité à gauche, six suggestions en 2 × 3 sous le visage du cheval */
            return React.createElement("div", { style: { display: "flex", gap: 36, minHeight: "100%", boxSizing: "border-box", padding: "0 28px 20px" } },
                React.createElement("div", { style: { width: 330, flexShrink: 0, display: "flex", flexDirection: "column", gap: 18 } }, hbIdentite("centre"), hbIntro),
                React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: Math.max(0, hbVisageBas - hbEnteteH), maxWidth: 640 } }, hbBlocSuggestions(2), hbBlocLimite));
        }
        if (hbGrand) {
            const idMax = Math.max(240, hbMainW - hbVisageDebut - 40);
            return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, padding: "0 28px 20px", maxWidth: hbVide ? 760 : (hbLecture + 56), boxSizing: "border-box" } },
                React.createElement("div", { style: { maxWidth: idMax, minHeight: Math.max(0, hbVisageBas - hbEnteteH), display: "flex", flexDirection: "column", justifyContent: "flex-start" } }, hbIdentite("debut")),
                hbIntro,
                hbBulles,
                hbVide ? hbBlocSuggestions(hbMainW >= 520 ? 2 : 1) : null,
                hbVide ? null : hbBlocLimite,
                React.createElement("div", { ref: finRef }));
        }
        return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: "8px 16px 16px" } },
            hbIdentite("centre"), hbIntro, hbBulles,
            hbVide ? hbBlocSuggestions(1) : null,
            hbBlocLimite,
            React.createElement("div", { ref: finRef }));
    })();
    const hbBarreSaisie = React.createElement("div", { style: { position: "relative", zIndex: 2, flexShrink: 0, padding: hbBureau ? "12px 28px calc(14px + env(safe-area-inset-bottom, 0px))" : (hbGrand ? "10px 24px calc(12px + 58px + env(safe-area-inset-bottom, 0px))" : "10px 14px calc(12px + 58px + env(safe-area-inset-bottom, 0px))"), borderTop: "1px solid rgba(201,166,107,0.12)", background: "rgba(7,10,8,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", fontFamily: HB_SANS } },
        React.createElement("div", { style: { maxWidth: hbGrand ? (hbVide ? 900 : (hbLecture + 0)) : "none", marginInlineStart: hbGrand && !hbVide ? 0 : undefined } },
            React.createElement("input", { ref: fichierRef, type: "file", accept: "image/*,video/*", onChange: choisirImage, style: { display: "none" } }),
            extractionVideo ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } },
                React.createElement("div", { style: { width: 54, height: 54, borderRadius: 10, background: "rgba(243,238,228,0.06)", border: "1px solid " + HB_C.filet, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 } }, "🎬"),
                React.createElement("span", { style: { flex: 1, fontSize: 12.5, color: HB_C.doux } }, TXT("Lecture de la vid\u00e9o\u2026", "Reading the video\u2026", "Leyendo el v\u00eddeo\u2026", "Lettura del video\u2026", "\u52d5\u753b\u3092\u8aad\u307f\u8fbc\u307f\u4e2d\u2026", "Video wird gelesen\u2026", "جارٍ قراءة الفيديو…", "正在读取视频……", "Video wordt gelezen…", "Lendo o vídeo…", "Läser videon…", "Загрузка видео…", "Wczytywanie wideo…", "동영상을 읽는 중…"))) : null,
            imageJointe ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } },
                React.createElement("div", { style: { position: "relative", flexShrink: 0, width: 54, height: 54 } },
                    React.createElement("img", { src: imageJointe, alt: "", style: { width: 54, height: 54, borderRadius: 10, objectFit: "cover", display: "block" } }),
                    framesVideo ? React.createElement("span", { style: { position: "absolute", right: -5, bottom: -5, fontSize: 12, lineHeight: 1, background: "rgba(6,7,9,0.88)", borderRadius: 8, padding: "3px 4px", border: "1px solid rgba(243,238,228,0.22)" } }, "🎬") : null),
                React.createElement("span", { style: { flex: 1, fontSize: 12.5, color: HB_C.doux } }, framesVideo ? TXT("Vid\u00e9o jointe \u00b7 " + framesVideo.length + " images cl\u00e9s", "Video attached \u00b7 " + framesVideo.length + " key frames", "V\u00eddeo adjunto \u00b7 " + framesVideo.length + " fotogramas", "Video allegato \u00b7 " + framesVideo.length + " fotogrammi", "\u52d5\u753b\u3092\u6dfb\u4ed8 \u00b7 \u30ad\u30fc\u30d5\u30ec\u30fc\u30e0" + framesVideo.length + "\u679a", "Video angehängt \u00b7 " + framesVideo.length + " Keyframes", "تم إرفاق فيديو · " + framesVideo.length + " إطارات رئيسية", "已附视频 · " + framesVideo.length + " 张关键帧", "Video bijgevoegd · " + framesVideo.length + " sleutelbeelden", "Vídeo anexado · " + framesVideo.length + " quadros-chave", ("Video bifogad · " + framesVideo.length + " nyckelbilder"), ("Видео прикреплено · ключевых кадров: " + framesVideo.length), ("Dołączono wideo · " + framesVideo.length + " " + (framesVideo.length === 1 ? "kluczowa klatka" : (framesVideo.length % 10 >= 2 && framesVideo.length % 10 <= 4 && (framesVideo.length % 100 < 10 || framesVideo.length % 100 >= 20)) ? "kluczowe klatki" : "kluczowych klatek")), ("동영상 첨부 · 핵심 프레임 " + framesVideo.length + "개")) : t("photo_jointe")),
                React.createElement("button", { type: "button", onClick: () => { setImageJointe(null); setFramesVideo(null); }, "aria-label": HBR("supprimer"), style: { width: 44, height: 44, borderRadius: "50%", background: "rgba(243,238,228,0.08)", border: "1px solid " + HB_C.filet, color: HB_C.ivoire, fontSize: 14, flexShrink: 0, cursor: "pointer" } }, "✕")) : null,
            React.createElement("div", { style: { display: "flex", gap: 9, alignItems: "center" } },
                HEYBABY_ANALYSE_VISUELLE ? React.createElement("button", { type: "button", onClick: () => fichierRef.current && fichierRef.current.click(), disabled: limiteAtteinte || extractionVideo, "aria-label": t("joindre_photo"), style: { width: 48, height: 48, borderRadius: 14, background: "rgba(7,10,8,0.6)", border: "1px solid " + HB_C.filet, color: HB_C.champ, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: extractionVideo ? 0.5 : 1, cursor: "pointer" } },
                    React.createElement("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, React.createElement("path", { d: "M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" }), React.createElement("circle", { cx: 12, cy: 13, r: 3.5 }))) : null,
                React.createElement("input", { value: saisie, onChange: (e) => setSaisie(e.target.value), onKeyDown: (e) => e.key === "Enter" && !enCours && envoyer(), placeholder: limiteAtteinte ? t("limite_atteinte_court") : t("poser_question_placeholder"), "aria-label": t("poser_question_placeholder"), disabled: limiteAtteinte, style: { flex: 1, minWidth: 0, padding: "13px 16px", borderRadius: 14, border: "1px solid rgba(243,238,228,0.16)", fontSize: 16 /* 20/08 s145 : sous 16px iOS zoome sur le champ */, color: HB_C.ivoire, background: "rgba(16,29,34,0.7)", fontFamily: HB_SANS, boxSizing: "border-box" } }),
                enCours ? React.createElement("button", { type: "button", onClick: arreter, "aria-label": t("heybaby_stop"), title: t("heybaby_stop"), style: { width: 48, height: 48, borderRadius: 14, background: "rgba(7,10,8,0.6)", border: "1px solid " + HB_C.champ, color: HB_C.champ, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" } }, "■")
                    : React.createElement("button", { type: "button", onClick: () => envoyer(), disabled: limiteAtteinte || (!saisie.trim() && !imageJointe), "aria-label": tr({ fr: "Envoyer", en: "Send", es: "Enviar", it: "Invia", ja: "送信", de: "Senden", ar: "إرسال", zh: "发送", nl: "Versturen", pt: "Enviar", sv: "Skicka", ru: "Отправить", pl: "Wyślij", ko: "보내기" }), style: { width: 48, height: 48, borderRadius: 14, background: (limiteAtteinte || (!saisie.trim() && !imageJointe)) ? "rgba(243,238,228,0.06)" : HB_C.petrole, border: "1px solid " + ((limiteAtteinte || (!saisie.trim() && !imageJointe)) ? "rgba(243,238,228,0.12)" : HB_C.champ), color: (limiteAtteinte || (!saisie.trim() && !imageJointe)) ? "rgba(243,238,228,0.4)" : HB_C.ivoire, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" } },
                        React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { transform: hbRtl ? "scaleX(-1)" : "none" } }, React.createElement("path", { d: "M4 12l16-8-6 16-2.5-6.5z" }))))));
    /* menus « ⋯ », confirmations et renommage (sortis dans <body> pour ne jamais être coupés) */
    const hbItem = (props, icone, texte, danger) => React.createElement("button", Object.assign({ type: "button", role: "menuitem" }, props, { style: { display: "flex", alignItems: "center", gap: 10, width: "100%", minHeight: 44, padding: "10px 14px", background: "none", border: "none", borderRadius: 8, color: danger ? HB_C.rouge : HB_C.ivoire, fontSize: 13.5, fontWeight: 500, fontFamily: HB_SANS, cursor: "pointer", textAlign: "start" } }), icone, React.createElement("span", null, texte));
    const hbMenuRendu = hbMenu ? hypePortailBody(React.createElement("div", { "data-noswipe": "true", style: { position: "fixed", inset: 0, zIndex: 400 }, onMouseDown: () => hbFermerMenu(false), onTouchStart: () => hbFermerMenu(false) },
        React.createElement("div", { ref: hbMenuRef, role: "menu", "aria-label": hbMenu.type === "echange" ? HBR("optEch") : HBR("optConv"), dir: hbRtl ? "rtl" : "ltr", onMouseDown: (e) => e.stopPropagation(), onTouchStart: (e) => e.stopPropagation(), style: (() => {
            const r = hbMenu.rect || { top: 60, bottom: 100, left: 20, right: 60 }; const vw = window.innerWidth, vh = window.innerHeight; const W = 250;
            const st = { position: "absolute", width: W, maxWidth: "calc(100vw - 24px)", padding: 6, boxSizing: "border-box", background: HB_C.petrole2, border: "1px solid rgba(201,166,107,0.3)", borderRadius: 12, boxShadow: "0 14px 34px rgba(0,0,0,0.6)", fontFamily: HB_SANS };
            const bas = r.bottom + 6; if (bas + 150 > vh) st.bottom = Math.max(12, vh - r.top + 6); else st.top = bas;
            /* le menu s'ouvre vers l'intérieur de l'écran */
            const gauche = (hbMenu.type === "ligne") ? (hbRtl ? r.right - W : r.left) : (hbRtl ? r.left : r.right - W);
            st.left = Math.max(12, Math.min(vw - W - 12, gauche)); return st; })() },
            hbMenu.type === "entete" ? React.createElement(React.Fragment, null,
                hbCatsOk ? hbItem({ onClick: () => hbOuvrirCat(conversationId) }, React.createElement("span", { "aria-hidden": "true", style: { fontSize: 15, width: 16, textAlign: "center", flexShrink: 0 } }, "\uD83C\uDFF7\uFE0F"), HBR("classer")) : null,
                hbItem({ onClick: () => hbDemander({ type: "vider", id: conversationId }) }, hbIconeBalai(), HBR("viderConv")),
                hbItem({ onClick: () => hbDemander({ type: "supprimer", id: conversationId }) }, hbIconeCorbeille(), HBR("supprimerConv"), true))
            : hbMenu.type === "ligne" ? React.createElement(React.Fragment, null,
                hbMeta ? hbItem({ onClick: () => hbOuvrirRenom(hbMenu.id) }, hbIconeCrayon(), HBR("renommer")) : null,
                hbCatsOk ? hbItem({ onClick: () => hbOuvrirCat(hbMenu.id) }, React.createElement("span", { "aria-hidden": "true", style: { fontSize: 15, width: 16, textAlign: "center", flexShrink: 0 } }, "\uD83C\uDFF7\uFE0F"), HBR("classer")) : null,
                hbItem({ onClick: () => hbDemander({ type: "supprimer", id: hbMenu.id }) }, hbIconeCorbeille(), HBR("supprimer"), true))
            : hbItem({ onClick: () => hbDemander({ type: "echange", idx: hbMenu.idx }) }, hbIconeCorbeille(), HBR("supprimerEch"), true)))) : null;
    const hbFenetre = (titre, enfants, fermer) => hypePortailBody(React.createElement("div", { "data-noswipe": "true", onMouseDown: fermer, style: { position: "fixed", inset: 0, zIndex: 410, background: "rgba(4,6,5,0.74)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, fontFamily: HB_SANS } },
        React.createElement("div", { ref: hbDialogRef, role: "alertdialog", "aria-modal": "true", "aria-labelledby": "hb-dlg-titre", "aria-describedby": "hb-dlg-texte", dir: hbRtl ? "rtl" : "ltr", onMouseDown: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 400, background: HB_C.petrole, border: "1px solid rgba(201,166,107,0.32)", borderRadius: 16, padding: "20px 18px 16px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", color: HB_C.ivoire, boxSizing: "border-box", textAlign: "start" } },
            React.createElement("h2", { id: "hb-dlg-titre", style: { margin: "0 0 8px", fontFamily: HB_SERIF, fontWeight: 600, fontSize: 24, lineHeight: 1.2, color: HB_C.ivoire } }, titre),
            enfants)));
    const hbBoutonsDlg = (annuler, valider, texteValider, danger, envoi) => React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end", flexWrap: "wrap" } },
        React.createElement("button", { type: "button", onClick: annuler, disabled: envoi, style: { minHeight: 44, padding: "0 18px", borderRadius: 12, background: "transparent", border: "1px solid rgba(243,238,228,0.22)", color: HB_C.ivoire, fontSize: 14, fontWeight: 600, fontFamily: HB_SANS, cursor: "pointer", opacity: envoi ? 0.5 : 1 } }, HBR("annuler")),
        React.createElement("button", { type: "button", onClick: valider, disabled: envoi, "aria-busy": envoi ? "true" : undefined, style: { minHeight: 44, padding: "0 18px", borderRadius: 12, background: danger ? "rgba(224,138,128,0.10)" : "rgba(7,10,8,0.5)", border: "1px solid " + (danger ? "rgba(224,138,128,0.6)" : HB_C.champ), color: danger ? HB_C.rouge : HB_C.ivoire, fontSize: 14, fontWeight: 700, fontFamily: HB_SANS, cursor: envoi ? "default" : "pointer", display: "inline-flex", alignItems: "center", gap: 8 } },
            texteValider));
    const hbConfirmRendu = hbConfirm ? (() => {
        const c = hbConfirm;
        const T2 = c.type === "echange" ? ["echT", "echX", "supprimer", true] : c.type === "vider" ? ["vidT", "vidX", "vider", false] : c.type === "supprimer" ? ["supT", "supX", "supprimer", true] : ["occT", "occX", "arreter", false];
        const enCoursTxt = c.type === "vider" ? HBR("videEnCours") : HBR("suppEnCours");
        return hbFenetre(HBR(T2[0]), React.createElement(React.Fragment, null,
            React.createElement("p", { id: "hb-dlg-texte", style: { margin: 0, fontSize: 14, lineHeight: 1.5, color: "rgba(243,238,228,0.8)" } }, HBR(T2[1])),
            c.erreur ? React.createElement("p", { role: "alert", style: { margin: "12px 0 0", fontSize: 13, lineHeight: 1.45, color: HB_C.rouge } }, c.erreur) : null,
            hbBoutonsDlg(hbFermerConfirm, hbValider, c.envoi ? enCoursTxt : HBR(T2[2]), T2[3], c.envoi)), () => { if (!c.envoi) hbFermerConfirm(); });
    })() : null;
    const hbRenomRendu = hbRenom ? hbFenetre(HBR("renT"), React.createElement(React.Fragment, null,
        React.createElement("label", { id: "hb-dlg-texte", htmlFor: "hb-renom", style: { display: "block", fontSize: 12.5, color: HB_C.doux, margin: "0 0 6px" } }, HBR("nomLabel")),
        React.createElement("input", { id: "hb-renom", value: hbRenom.valeur, maxLength: HB_TITRE_MAX, disabled: hbRenom.envoi, onChange: (e) => setHbRenom(Object.assign({}, hbRenom, { valeur: e.target.value, erreur: "" })), onKeyDown: (e) => { if (e.key === "Enter") { e.preventDefault(); hbValiderRenom(); } }, style: { width: "100%", boxSizing: "border-box", minHeight: 46, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(201,166,107,0.4)", background: "rgba(7,10,8,0.5)", color: HB_C.ivoire, fontSize: 16, fontFamily: HB_SANS, unicodeBidi: "plaintext" } }),
        React.createElement("div", { style: { fontSize: 11, color: "rgba(243,238,228,0.45)", textAlign: "end", marginTop: 4 } }, String(hbRenom.valeur || "").length + " / " + HB_TITRE_MAX),
        hbRenom.erreur ? React.createElement("p", { role: "alert", style: { margin: "10px 0 0", fontSize: 13, color: HB_C.rouge, lineHeight: 1.45 } }, hbRenom.erreur) : null,
        hbBoutonsDlg(() => { if (!hbRenom.envoi) { setHbRenom(null); hbRendreFocus(); } }, hbValiderRenom, hbRenom.envoi ? HBR("enregEnCours") : HBR("enregistrer"), false, hbRenom.envoi)), () => { if (!hbRenom.envoi) { setHbRenom(null); hbRendreFocus(); } }) : null;
    const hbCatRendu = hbCatDlg ? (() => {
        const d = hbCatDlg;
        const chev = (hbChevauxNoms || []).map((n) => "c:" + n);
        hbCatsDe(d.id).concat(d.sel).forEach((k) => { if (k.indexOf("c:") === 0 && chev.indexOf(k) < 0) chev.push(k); });
        const themes = HB_THEMES.map((k) => "t:" + k);
        const bascule = (k) => setHbCatDlg(Object.assign({}, d, { erreur: "", sel: d.sel.indexOf(k) >= 0 ? d.sel.filter((x) => x !== k) : d.sel.concat([k]) }));
        const ligne = (k) => React.createElement("label", { key: k, style: { display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: "6px 4px", cursor: "pointer", fontSize: 14.5, color: HB_C.ivoire } },
            React.createElement("input", { type: "checkbox", checked: d.sel.indexOf(k) >= 0, disabled: d.envoi, onChange: () => bascule(k), style: { width: 22, height: 22, accentColor: "#C9A66B", flexShrink: 0 } }),
            React.createElement("span", { style: { minWidth: 0, overflowWrap: "anywhere" } }, hbCatNom(langue, k)));
        return hbFenetre(HBR("classerT"), React.createElement(React.Fragment, null,
            React.createElement("p", { id: "hb-dlg-texte", style: { margin: "0 0 8px", fontSize: 13.5, lineHeight: 1.5, color: "rgba(243,238,228,0.8)" } }, HBR("classerX")),
            React.createElement("div", { style: { maxHeight: "46vh", overflowY: "auto" } },
                themes.map(ligne),
                chev.length ? React.createElement("p", { style: { margin: "10px 0 2px", fontSize: 12, fontWeight: 700, letterSpacing: 0.4, color: HB_C.champ } }, "🐴 " + HBR("catChevaux")) : null,
                chev.map(ligne)),
            d.erreur ? React.createElement("p", { role: "alert", style: { margin: "10px 0 0", fontSize: 13, color: HB_C.rouge, lineHeight: 1.45 } }, d.erreur) : null,
            hbBoutonsDlg(() => { if (!d.envoi) { setHbCatDlg(null); hbRendreFocus(); } }, hbValiderCat, d.envoi ? HBR("enregEnCours") : HBR("enregistrer"), false, d.envoi)), () => { if (!d.envoi) { setHbCatDlg(null); hbRendreFocus(); } });
    })() : null;
    const hbPanneau = (!hbGrand && histoOuvert) ? React.createElement("div", { onClick: () => { setHistoOuvert(false); setTimeout(() => { try { hbHistoBtnRef.current && hbHistoBtnRef.current.focus(); } catch (e) { } }, 0); }, "data-noswipe": "true", style: { position: "fixed", inset: 0, zIndex: 60, background: "rgba(4,6,5,0.6)", animation: "fadeIn 0.2s ease-out" } },
        React.createElement("div", { ref: hbPanneauRef, role: "dialog", "aria-modal": "true", "aria-label": HBR("historique"), onClick: (e) => e.stopPropagation(), style: { position: "absolute", [hbDebut]: 0, top: 0, height: "100%", width: "85%", maxWidth: 360, background: HB_C.petrole2, [hbRtl ? "borderLeft" : "borderRight"]: "1px solid rgba(201,166,107,0.2)", boxShadow: "0 0 40px rgba(0,0,0,0.6)", boxSizing: "border-box", animation: "fadeIn 0.25s ease-out" } }, hbRendreHistorique(true))) : null;
    /* 21/10 (tests Blandine, probleme 4) : la liste des questions posees, une seule fonction pour le tiroir (telephone)
       et la colonne de droite (ordinateur). */
    const listeHistoHB = () => (() => { const qs = messages.filter((m) => m.role === "user" && m.contenu).map((m) => m.contenu); return qs.length ? qs.map((q, i) => React.createElement("button", { key: i, onClick: () => { setHistoOuvert(false); envoyer(q); }, style: { textAlign: "left", padding: "11px 13px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.86)", fontSize: 13, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, q)) : React.createElement("p", { style: { color: COLORS.encreDoux, fontSize: 13, textAlign: "center", marginTop: 20 } }, t("historique_vide")); })();
    const [hbPanCote, setHbPanCote] = useState(() => { try { if (window.__rouvrirConseils === "assistant") { window.__rouvrirConseils = null; return true; } } catch (eRo) { } return false; });   /* au retour d un conseil ouvert depuis ici, le panneau se rouvre (meme regle que le carnet) */
    const HB_CSS = ".hb-cote{display:none}" +
      /* grand ecran : la conversation et la saisie gardent une largeur de lecture (780 px) centree ; plus de cale de barre d onglets en bas */
      "@media (min-width:1024px){.hb-fil{padding-left:max(18px,calc((100% - 780px) / 2)) !important;padding-right:max(18px,calc((100% - 780px) / 2)) !important}" +
      ".hb-saisie{padding-left:max(16px,calc((100% - 780px) / 2)) !important;padding-right:max(16px,calc((100% - 780px) / 2)) !important;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px)) !important}}" +
      /* tres grand ecran : colonne laterale (historique + conseils epingles) */
      "@media (min-width:1280px){.hb-page .hb-fil,.hb-page .hb-saisie{margin-inline-end:320px}" +
      ".hb-cote{display:flex;flex-direction:column;gap:14px;position:absolute;z-index:3;top:138px;bottom:0;inset-inline-end:0;width:320px;padding:18px 18px 22px;border-inline-start:1px solid rgba(127,163,173,.18);background:rgba(7,11,13,.78);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);overflow-y:auto;box-sizing:border-box}" +
      ".hb-cote-t{margin:6px 0 2px;font-family:'Cinzel',serif;font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#F3EEE4}" +
      ".hb-cote-b{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:52px;padding:0 14px;border-radius:14px;border:1px solid rgba(127,163,173,.45);background:rgba(16,29,34,.7);color:#F3EEE4;font:600 13.5px 'Montserrat',sans-serif;cursor:pointer;text-align:start}" +
      ".hb-cote-b:hover{border-color:#8FB3BC}.hb-cote-l{display:flex;flex-direction:column;gap:8px}}";
    return (React.createElement("div", { dir: hbRtl ? "rtl" : "ltr", style: { height: "100dvh", display: "flex", flexDirection: "row", position: "relative", overflow: "hidden", background: HB_C.fond, fontFamily: HB_SANS, color: HB_C.ivoire } },
        hbGrand ? React.createElement("aside", { style: { width: hbColW, flexShrink: 0, height: "100%", boxSizing: "border-box", background: HB_C.petrole2, borderInlineEnd: "1px solid rgba(201,166,107,0.14)", position: "relative", zIndex: 4 } }, hbRendreHistorique(false)) : null,
        React.createElement("div", { ref: hbMainRef, style: { flex: 1, minWidth: 0, height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" } },
            hbFondCheval,
            hbGrand
                ? React.createElement("div", { style: { position: "relative", zIndex: 3, height: hbEnteteH, boxSizing: "border-box", padding: "12px 28px 0", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", flexShrink: 0 } }, hbBoutonsFin)
                : React.createElement("div", { style: { position: "relative", zIndex: 3, padding: "12px 14px 10px", display: "flex", flexDirection: "column", gap: 8, borderBottom: "1px solid rgba(201,166,107,0.10)", background: "rgba(7,10,8,0.42)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", flexShrink: 0 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } }, hbBoutonRetour(), hbBoutonsFin),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", ref: hbHistoBtnRef, onClick: () => setHistoOuvert(true), "aria-haspopup": "dialog", "aria-expanded": !!histoOuvert, style: { minHeight: 40, padding: "0 14px", borderRadius: 12, background: "rgba(7,10,8,0.55)", border: "1px solid " + HB_C.filet, color: HB_C.ivoire, fontSize: 13, fontWeight: 600, fontFamily: HB_SANS, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" } },
                            React.createElement("span", { style: { color: HB_C.champ, display: "flex" } }, hbIconeBulles(18)), HBR("historique")))),
            React.createElement("div", { ref: hbScrollRef, style: { position: "relative", zIndex: 2, flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" } }, hbContenu),
            hbBarreSaisie),
        hbPanneau,
        hbPanCote ? React.createElement(PanneauConseilsHB, { depuis: "assistant", onFermer: () => setHbPanCote(false) }) : null,
        corrCible ? hypePortailBody(React.createElement("div", { onClick: () => { if (!corrCible.envoi) { setCorrCible(null); setCorrListe(null); } }, "data-noswipe": "true", style: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(8,10,13,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } },
            React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 420, maxHeight: "86dvh", overflowY: "auto", background: "#12161C", border: "1px solid rgba(232,194,122,0.45)", borderRadius: 18, padding: 18, color: COLORS.blanc, boxSizing: "border-box" } },
                React.createElement("p", { style: { margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#E8C27A" } }, corrListe ? "\u270F\uFE0F Toutes les corrections" : "\u270F\uFE0F Corriger Hey Baby"),
                corrListe ? React.createElement(React.Fragment, null,
                    React.createElement("p", { style: { margin: "0 0 10px", fontSize: 12.5, color: "rgba(255,255,255,0.7)" } }, "Hey Baby applique les corrections actives, pour toutes les cavalières. Une correction en pause est gardée mais ignorée."),
                    corrListe.erreur ? React.createElement("p", { style: { margin: "0 0 10px", fontSize: 13, color: "#FF8A80" } }, corrListe.erreur) : null,
                    corrListe.chargement ? React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.6)" } }, "Chargement\u2026") :
                    (!corrListe.lignes.length ? React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.6)" } }, "Aucune correction pour l'instant.") :
                    corrListe.lignes.map((lg) => React.createElement("div", { key: lg.id, style: { padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: lg.actif ? 1 : 0.55 } },
                        React.createElement("div", { style: { fontSize: 14, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, lg.texte),
                        React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.45)", margin: "4px 0 8px" } }, (lg.actif ? "Active" : "En pause") + " \u00b7 " + String(lg.created_at || "").slice(0, 10).split("-").reverse().join("/")),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("button", { onClick: () => basculerCorrection(lg), style: { fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: COLORS.blanc, border: "1px solid rgba(255,255,255,0.2)" } }, lg.actif ? "Mettre en pause" : "Réactiver"),
                            corrListe.aSupprimer === lg.id
                                ? React.createElement("button", { onClick: () => supprimerCorrection(lg), style: { fontSize: 12, fontWeight: 800, padding: "6px 12px", borderRadius: 999, background: "#C62828", color: "#fff", border: "none" } }, "Confirmer la suppression")
                                : React.createElement("button", { onClick: () => setCorrListe({ ...corrListe, aSupprimer: lg.id }), style: { fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: "rgba(198,40,40,0.12)", color: "#FF8A80", border: "1px solid rgba(255,138,128,0.45)" } }, "Supprimer"))))),
                    React.createElement("button", { onClick: () => setCorrListe(null), style: { width: "100%", marginTop: 14, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: COLORS.blanc, fontWeight: 700, fontSize: 15, border: "1px solid rgba(255,255,255,0.18)" } }, "\u2190 Retour")) :
                corrCible.ok ? React.createElement(React.Fragment, null,
                    React.createElement("p", { style: { margin: "8px 0 14px", fontSize: 14, lineHeight: 1.5 } }, "Enregistrée. Hey Baby en tient compte dès la prochaine question, pour toutes les cavalières."),
                    React.createElement("button", { onClick: () => setCorrCible(null), style: { width: "100%", padding: "12px", borderRadius: 12, background: "rgba(7,10,8,0.5)", color: "#F3EEE4", boxShadow: "inset 0 0 0 1px #C9A66B", fontWeight: 800, fontSize: 15, border: "none" } }, "Fermer")) : React.createElement(React.Fragment, null,
                    React.createElement("p", { style: { margin: "0 0 10px", fontSize: 12.5, lineHeight: 1.45, color: "rgba(255,255,255,0.7)" } }, "Écris ce qui ne va pas, avec tes mots. Hey Baby s'en servira comme d'une règle pour toutes les cavalières, et la reformulera toujours proprement. Visible par les modératrices seulement."),
                    React.createElement("div", { style: { fontSize: 11.5, color: "rgba(255,255,255,0.5)", margin: "0 0 10px", maxHeight: 90, overflow: "hidden", borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: 8 } }, String(corrCible.reponse || "").slice(0, 280) + (String(corrCible.reponse || "").length > 280 ? "\u2026" : "")),
                    React.createElement("textarea", { value: corrCible.texte, autoFocus: true, rows: 5, maxLength: 500, placeholder: "Ex. : ne dis jamais « dos neutre », ça ne veut rien dire.", onChange: (e) => setCorrCible({ ...corrCible, texte: e.target.value, erreur: "" }), style: { width: "100%", boxSizing: "border-box", fontSize: 16, lineHeight: 1.4, padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.06)", color: COLORS.blanc, border: "1px solid rgba(255,255,255,0.18)", resize: "vertical" } }),
                    React.createElement("div", { style: { fontSize: 11, textAlign: "right", color: "rgba(255,255,255,0.45)", margin: "4px 0 8px" } }, String(corrCible.texte || "").length + " / 500"),
                    corrCible.erreur ? React.createElement("p", { style: { margin: "0 0 10px", fontSize: 13, color: "#FF8A80" } }, corrCible.erreur) : null,
                    React.createElement("button", { onClick: chargerListeCorrections, style: { display: "block", margin: "0 0 12px", padding: 0, background: "none", border: "none", color: "#E8C27A", fontSize: 13, fontWeight: 700, textDecoration: "underline" } }, "Toutes les corrections \u2192"),
                    React.createElement("div", { style: { display: "flex", gap: 10 } },
                        React.createElement("button", { onClick: () => { setCorrCible(null); setCorrListe(null); }, disabled: corrCible.envoi, style: { flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: COLORS.blanc, fontWeight: 700, fontSize: 15, border: "1px solid rgba(255,255,255,0.18)" } }, "Annuler"),
                        React.createElement("button", { onClick: enregistrerCorrection, disabled: corrCible.envoi, style: { flex: 1, padding: "12px", borderRadius: 12, background: "rgba(7,10,8,0.5)", color: "#F3EEE4", boxShadow: "inset 0 0 0 1px #C9A66B", fontWeight: 800, fontSize: 15, border: "none", opacity: corrCible.envoi ? 0.6 : 1 } }, corrCible.envoi ? "Envoi\u2026" : "Enregistrer")))))) : null,
        epingleCible ? React.createElement("div", { onClick: () => setEpingleCible(null), "data-noswipe": "true", style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(8,10,13,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, animation: "fadeIn 0.2s ease-out" } },
            React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 360, background: COLORS.nuitClaire, border: `1px solid ${COLORS.ligne}`, borderRadius: 20, padding: "20px 18px" } },
                epingleCible.paywall ? React.createElement(React.Fragment, null,
                    React.createElement("p", { style: { margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: COLORS.encre, textAlign: "center" } }, "\uD83D\uDCCC " + TXT("\u00c9pingler ce conseil", "Pin this advice", "Fijar este consejo", "Fissa questo consiglio", "\u3053\u306e\u30a2\u30c9\u30d0\u30a4\u30b9\u3092\u30d4\u30f3\u7559\u3081", "Diesen Rat anheften", "ثبّتي هذه النصيحة", "置顶这条建议", "Deze tip vastzetten", "Fixar este conselho", "Fäst det här rådet", "Закрепить этот совет", "Przypnij tę wskazówkę", "이 조언 고정하기")),
                    React.createElement("p", { style: { margin: "0 0 14px", fontSize: 13, color: COLORS.encreDoux, textAlign: "center", lineHeight: 1.5 } }, TXT("R\u00e9serv\u00e9 aux membres du Cercle Crystal : garde tes meilleurs conseils sur ta page cavalier et tes fiches chevaux.", "Reserved for Crystal Circle members: keep your best advice on your rider page and horse profiles.", "Reservado a los miembros del C\u00edrculo Crystal: guarda tus mejores consejos en tu p\u00e1gina y tus fichas de caballos.", "Riservato ai membri del Cerchio Crystal: conserva i migliori consigli sulla tua pagina e sulle schede dei tuoi cavalli.", "Crystal\u30b5\u30fc\u30af\u30eb\u4f1a\u54e1\u9650\u5b9a\uff1a\u304a\u6c17\u306b\u5165\u308a\u306e\u30a2\u30c9\u30d0\u30a4\u30b9\u3092\u30da\u30fc\u30b8\u306b\u4fdd\u5b58\u3067\u304d\u307e\u3059\u3002", "Nur für Mitglieder des Crystal-Kreises: bewahre deine besten Ratschläge auf deiner Reiterseite und den Seiten deiner Pferde auf.", "مخصص لأعضاء Cercle Crystal: احتفظي بأفضل نصائحك في صفحتك كفارسة وفي بطاقات خيولك.", "仅限 Crystal 圈会员：把你最好的建议保存在你的骑手主页和马的档案里。", "Alleen voor leden van de Crystal-kring: bewaar je beste tips op je ruiterpagina en je paardenprofielen.", "Reservado aos membros do Círculo Crystal: guarde seus melhores conselhos na sua página de cavaleiro e nas fichas dos seus cavalos.", "Förbehållet medlemmar i Crystal-cirkeln: spara dina bästa råd på din ryttarsida och dina hästprofiler.", "Только для участников Crystal: сохраняй свои лучшие советы на странице всадника и в карточках лошадей.", "Tylko dla członków Cercle Crystal: zachowaj swoje najlepsze wskazówki na stronie jeźdźca i w kartach koni.", "Crystal 서클 회원 전용: 최고의 조언을 기수 페이지와 말 프로필에 보관하세요.")),
                    React.createElement(BandeauDejaAbonne, { marge: "0 0 12px", onAvant: () => setEpingleCible(null) }),
                    React.createElement(BoutonPrincipal, { texte: t("decouvrir_premium"), couleur: "#C9A66B", secondaire: true, onClick: () => { setEpingleCible(null); setEcran("premium"); } }))
                : epingleCible.limite ? React.createElement(React.Fragment, null,
                    /* 19/08/2026 (choix de Blandine, maquette A) — LA MASCOTTE.
                       Fichier à la racine du dépôt, appelé en chemin direct :
                       pas d'entrée dans HYPE_IMGS, donc rien à défaire si elle
                       change. WebP obligatoire ici, la transparence est ce qui
                       la détache du fond sombre — un JPEG poserait un carré
                       blanc. ⚠️ si le fichier n'est pas poussé, onError efface
                       simplement l'image : la modale reste entière. */
                    React.createElement("img", { src: "mascotte-abo.webp", alt: "", onError: (e) => { try { e.target.style.display = "none"; } catch (eI) { } }, style: { display: "block", width: 104, height: "auto", margin: "0 auto 6px", filter: "drop-shadow(0 6px 20px rgba(201,166,107,0.28))" } }),
                    React.createElement("p", { style: { margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: COLORS.encre, textAlign: "center" } }, "\uD83D\uDCCC " + TXT("Limite atteinte", "Limit reached", "L\u00edmite alcanzado", "Limite raggiunto", "\u4e0a\u9650\u306b\u9054\u3057\u307e\u3057\u305f", "Limit erreicht", "تم بلوغ الحد الأقصى", "已达上限", "Limiet bereikt", "Limite atingido", "Gränsen nådd", "Лимит исчерпан", "Limit osiągnięty", "한도 도달")),
                    React.createElement("p", { style: { margin: "0 0 4px", fontSize: 13, color: COLORS.encreDoux, textAlign: "center", lineHeight: 1.5 } }, TXT("Tu as d\u00e9j\u00e0 " + (epingleCible.plafond || 20) + " conseils \u00e9pingl\u00e9s, le maximum de ton abonnement.", "You already have " + (epingleCible.plafond || 20) + " pinned pieces of advice, your plan's maximum.", "Ya tienes " + (epingleCible.plafond || 20) + " consejos fijados, el m\u00e1ximo de tu suscripci\u00f3n.", "Hai gi\u00e0 " + (epingleCible.plafond || 20) + " consigli fissati, il massimo del tuo abbonamento.", (epingleCible.plafond || 20) + "\u4ef6\u3092\u3059\u3067\u306b\u30d4\u30f3\u7559\u3081\u3057\u3066\u3044\u307e\u3059\u3002\u3054\u5951\u7d04\u306e\u4e0a\u9650\u3067\u3059\u3002", "Du hast bereits " + (epingleCible.plafond || 20) + " Ratschläge angeheftet, das Maximum deines Abos.", "لديكِ بالفعل " + (epingleCible.plafond || 20) + " نصيحة مثبّتة، وهو الحد الأقصى لاشتراكك.", "你已经置顶了 " + (epingleCible.plafond || 20) + " 条建议，已达到你当前订阅的上限。", "Je hebt al " + (epingleCible.plafond || 20) + " vastgepinde tips, het maximum van je abonnement.", "Você já tem " + (epingleCible.plafond || 20) + " conselhos fixados, o máximo da sua assinatura.", ("Du har redan " + (epingleCible.plafond || 20) + " fästa råd, maxgränsen för din prenumeration."), ("У тебя уже " + (epingleCible.plafond || 20) + " закреплённых советов — это максимум для твоей подписки."), ("Masz już " + (epingleCible.plafond || 20) + " przypiętych wskazówek — to maksimum w twojej subskrypcji."), ("이미 고정한 조언이 " + (epingleCible.plafond || 20) + "개로, 구독에서 허용하는 최대치예요."))),
                    planAbo === "duo" ? null : React.createElement("p", { style: { margin: "0 0 12px", fontSize: 12.5, color: "#C9A66B", textAlign: "center", fontWeight: 700, lineHeight: 1.5 } }, TXT("Souhaites-tu passer \u00e0 l'abonnement sup\u00e9rieur ? L'abonnement Duo en propose " + PLAFOND_DUO + ".", "Would you like to move up a plan? The Duo plan offers " + PLAFOND_DUO + ".", "\u00bfQuieres pasar a la suscripci\u00f3n superior? La suscripci\u00f3n Duo ofrece " + PLAFOND_DUO + ".", "Vuoi passare all'abbonamento superiore? L'abbonamento Duo ne offre " + PLAFOND_DUO + ".", "\u4e0a\u4f4d\u30d7\u30e9\u30f3\u306b\u5909\u66f4\u3057\u307e\u3059\u304b\uff1fDuo\u30d7\u30e9\u30f3\u306a\u3089" + PLAFOND_DUO + "\u4ef6\u307e\u3067\u53ef\u80fd\u3067\u3059\u3002", "Möchtest du auf das höhere Abo wechseln? Das Duo-Abo bietet " + PLAFOND_DUO + ".", "هل ترغبين في الانتقال إلى الاشتراك الأعلى؟ يتيح اشتراك Duo " + PLAFOND_DUO + ".", "想升级到更高级的订阅吗？Duo 订阅可置顶 " + PLAFOND_DUO + " 条。", "Wil je overstappen op een hoger abonnement? Het Duo-abonnement biedt er " + PLAFOND_DUO + ".", "Quer mudar para uma assinatura superior? A assinatura Duo oferece " + PLAFOND_DUO + ".", ("Vill du byta till nästa prenumerationsnivå? Duo-prenumerationen ger dig " + PLAFOND_DUO + "."), ("Хочешь перейти на подписку повыше? В подписке Duo лимит — " + PLAFOND_DUO + "."), ("Chcesz przejść na wyższą subskrypcję? Subskrypcja Duo oferuje " + PLAFOND_DUO + "."), ("더 높은 구독으로 올려 볼까요? Duo 구독은 최대 " + PLAFOND_DUO + "개까지 가능해요."))),
                    /* 19/08/2026 (demande de Blandine) — LE MESSAGE MÈNE À L'OFFRE.
                       Même bouton et mêmes libellés que la limite de questions
                       quotidiennes (ligne ~43285) : on recopie le mécanisme en
                       place plutôt que d'en inventer un. ⚠️ setEcran("premium")
                       ouvre la page générale des formules, il n'existe aucun
                       moyen d'atterrir directement sur l'offre Duo. */
                    planAbo === "duo" ? null : React.createElement("div", { style: { marginBottom: 10 } }, React.createElement(BoutonPrincipal, { texte: t(premium ? "decouvrir_pack_duo" : "decouvrir_premium"), couleur: "#C9A66B", secondaire: true, onClick: () => { setEpingleCible(null); setEcran("premium"); } })),
                    React.createElement("button", { onClick: () => setEpingleCible(null), style: { width: "100%", padding: "12px 0", borderRadius: 14, background: COLORS.creme, color: COLORS.encre, fontWeight: 700, fontSize: 14, border: "none" } }, TXT("Compris", "Got it", "Entendido", "Capito", "\u4e86\u89e3", "Verstanden", "فهمت", "知道了", "Begrepen", "Entendi", "Uppfattat", "Понятно", "Rozumiem", "알겠어요")))
                : epingleCible.etapeCav
                ? React.createElement(React.Fragment, null,
                    /* 16/09 (206) : SECONDE ETAPE - POUR QUI ? Facultative : « Personne »
                       epingle exactement comme avant le 206. Aucun retour en arriere a
                       inventer : le bouton Annuler ferme tout, comme sur la premiere etape. */
                    React.createElement("p", { style: { margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: COLORS.encre, textAlign: "center" } }, TXT("Pour qui\u00a0?", "For whom?", "\u00bfPara qui\u00e9n?", "Per chi?", "\u5bfe\u8c61", "F\u00fcr wen?", "لمن؟", "给谁？", "Voor wie?", "Para quem?", "För vem?", "Для кого?", "Dla kogo?", "누구를 위한 건가요?")),
                    React.createElement("p", { style: { margin: "0 0 12px", fontSize: 12.5, color: COLORS.encreDoux, textAlign: "center", lineHeight: 1.5 } }, TXT("Tu pourras le changer plus tard.", "You can change it later.", "Podr\u00e1s cambiarlo luego.", "Potrai cambiarlo dopo.", "\u3042\u3068\u3067\u5909\u66f4\u3067\u304d\u307e\u3059\u3002", "Sp\u00e4ter \u00e4nderbar.", "يمكنك تغييره لاحقا.", "你之后可以再修改。", "Je kunt dit later nog wijzigen.", "Você poderá mudar isso depois.", "Du kan ändra det senare.", "Ты сможешь изменить это позже.", "Będziesz mogć to później zmienić.", "나중에 바꿀 수 있어요.")),
                    /* 16/09 (211) : LE THEME, au-dessus des cavalieres (son choix : option 1).
                       FACULTATIF - on touche une cavaliere et c est epingle, theme ou pas. Le
                       rail porte data-hscroll et overscroll-behavior : sans eux un glissement
                       horizontal change d onglet et entraine la page. */
                    React.createElement("p", { style: { margin: "0 0 7px 2px", fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: COLORS.encreDoux } },
                        TXT("Th\u00e8mes (facultatif, plusieurs possibles)", "Themes (optional, several allowed)", "Temas (opcional, varios)", "Temi (facoltativo, pi\u00f9 di uno)", "\u30c6\u30fc\u30de\uff08\u4efb\u610f\u30fb\u8907\u6570\u53ef\uff09", "Themen (optional, mehrere)", "المواضيع (اختياري، يمكن اختيار عدة مواضيع)", "主题（可选，可多选）", "Thema's (optioneel, meerdere mogelijk)", "Temas (opcional, vários possíveis)", "Teman (valfritt, du kan välja flera)", "Темы (необязательно, можно выбрать несколько)", "Tematy (opcjonalnie, można wybrać kilka)", "테마 (선택 사항, 여러 개 선택 가능)")),
                    React.createElement("div", { "data-hscroll": "1", style: { display: "flex", gap: 7, overflowX: "auto", overscrollBehavior: "contain", paddingBottom: 2, marginBottom: 14 } },
                        /* 16/09 (217) : PANNE DU 216 CORRIGEE ICI. La liste etait calculee en
                           haut du composant, AVANT la definition de TXT : « Cannot access
                           'TXT' before initialization », ecran Hey Baby mort. On l appelle
                           donc AU MOMENT DU RENDU, ou TXT existe.
                           ⚠️ REGLE : ne jamais appeler une fonction de traduction depuis le
                           corps d un composant si elle y est declaree en `const` plus bas. */
                        hypeThemesHB(TXT).map((th) => { const pris = (themesEp || []).indexOf(th[0]) !== -1; return React.createElement("button", { key: th[0], onClick: () => basculerTheme(th[0]),
                            style: { flex: "0 0 auto", padding: "9px 14px", borderRadius: 999, minHeight: 42, border: `1px solid ${pris ? "#C9A66B" + "88" : "rgba(255,255,255,0.14)"}`, background: pris ? `${"#C9A66B"}18` : "transparent", color: pris ? "#C9A66B" : COLORS.encreDoux, fontWeight: pris ? 800 : 500, fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap" } }, th[1]); })),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9, maxHeight: "46vh", overflowY: "auto", overscrollBehavior: "contain" } },
                        React.createElement("button", { onClick: () => validerEpingle(epingleCible.chevalId, epingleCible.chevalNom, null, null), style: { width: "100%", padding: "13px 14px", borderRadius: 14, background: `${"#C9A66B"}14`, border: `1px solid ${"#C9A66B"}55`, color: "#C9A66B", fontWeight: 800, fontSize: 14, cursor: "pointer", textAlign: "left" } },
                            TXT("Personne", "Nobody", "Nadie", "Nessuno", "\u306a\u3057", "Niemand", "لا أحد", "无人", "Niemand", "Ninguém", "Ingen", "Никого", "Nikt", "없음")),
                        (cavEpListe === null)
                            ? React.createElement("p", { style: { margin: "4px 0", fontSize: 12.5, color: COLORS.encreDoux, textAlign: "center" } }, "\u2026")
                            : ((!cavEpListe.length)
                                ? React.createElement("p", { style: { margin: "4px 0", fontSize: 12.5, color: COLORS.encreDoux, textAlign: "center", lineHeight: 1.5 } }, TXT("Aucune cavali\u00e8re dans tes \u00e9curies.", "No rider in your stables.", "Ning\u00fan jinete en tus cuadras.", "Nessun cavaliere nelle tue scuderie.", "\u8a72\u5f53\u306a\u3057\u3002", "Keine Reiterin gefunden.", "لا توجد أي فارسة في إسطبلاتك.", "你的马厩里没有骑手。", "Geen ruiters in jouw stallen.", "Nenhuma amazona nas suas cocheiras.", "Ingen ryttare i dina stall.", "В твоих конюшнях нет всадниц.", "Brak amazonek w twoich stajniach.", "내 마구간에 기수가 없어요."))
                                : cavEpListe.map((pr) => React.createElement("button", { key: pr.id, onClick: () => validerEpingle(epingleCible.chevalId, epingleCible.chevalNom, pr.id, pr.pseudo || null), style: { width: "100%", padding: "11px 14px", borderRadius: 14, background: COLORS.nuit, border: "1px solid rgba(255,255,255,0.10)", color: COLORS.encre, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 11 } },
                                    pr.avatar_url
                                        ? React.createElement("img", { src: pr.avatar_url, alt: "", loading: "lazy", decoding: "async", style: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flex: "0 0 auto", display: "block" } })
                                        : React.createElement("span", { style: { width: 32, height: 32, borderRadius: "50%", flex: "0 0 auto", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: COLORS.encreDoux } }, String(pr.pseudo || "?").trim().slice(0, 1).toUpperCase()),
                                    React.createElement("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, pr.pseudo || "\u2014"))))),
                    React.createElement("button", { onClick: () => setEpingleCible(null), style: { width: "100%", marginTop: 12, padding: "11px 0", borderRadius: 14, background: "transparent", color: COLORS.encreDoux, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer" } },
                        TXT("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")))
                : React.createElement(React.Fragment, null,
                    React.createElement("p", { style: { margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: COLORS.encre, textAlign: "center" } }, "\uD83D\uDCCC " + TXT("\u00c9pingler sur\u2026", "Pin to\u2026", "Fijar en\u2026", "Fissa su\u2026", "\u30d4\u30f3\u7559\u3081\u5148\u2026", "Anheften an\u2026", "ثبّتي في…", "置顶到…", "Vastzetten op…", "Fixar em…", "Fäst på…", "Закрепить в…", "Przypnij do…", "여기에 고정…")),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9, maxHeight: "46vh", overflowY: "auto", overscrollBehavior: "contain" } },
                        React.createElement("button", { onClick: () => choisirChevalEpingle(null, null), style: { width: "100%", padding: "13px 14px", borderRadius: 14, background: `${"#C9A66B"}14`, border: `1px solid ${"#C9A66B"}55`, color: COLORS.encre, fontWeight: 700, fontSize: 14, textAlign: "left" } }, "\uD83C\uDFC7 " + TXT("Ma page cavalier", "My rider page", "Mi p\u00e1gina de jinete", "La mia pagina cavaliere", "\u30de\u30a4\u9a0e\u624b\u30da\u30fc\u30b8", "Meine Reiterseite", "صفحتي كفارسة", "我的骑手主页", "Mijn ruiterpagina", "Minha página de cavaleiro", "Min ryttarsida", "Моя страница всадника", "Moja strona jeźdźca", "내 기수 페이지")),
                        /* 16/09 (207) : SES chevaux d abord - elle les trouve sans chercher. */
                        chevauxCibles.map((cv) => React.createElement("button", { key: cv.id, onClick: () => choisirChevalEpingle(cv.id, cv.nom), style: { width: "100%", padding: "13px 14px", borderRadius: 14, background: COLORS.nuit, border: `1px solid ${COLORS.ligne}`, color: COLORS.encre, fontWeight: 700, fontSize: 14, textAlign: "left" } }, "\uD83D\uDC34 " + cv.nom))),
                        /* 16/09 (207) : PUIS les chevaux de l ecurie, sous un intertitre, pour
                           qu on sache d un coup d oeil qu on sort de ses propres chevaux. */
                        (chevauxEcurie && chevauxEcurie.length)
                            ? React.createElement("p", { style: { margin: "6px 2px 0", fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: COLORS.encreDoux } },
                                TXT("Les chevaux de l\u2019\u00e9curie", "The stable\u2019s horses", "Los caballos de la cuadra", "I cavalli della scuderia", "\u30af\u30e9\u30d6\u306e\u99ac", "Die Pferde des Stalls", "خيول الإسطبل", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말들"))
                            : null,
                        (chevauxEcurie || []).map((cv) => React.createElement("button", { key: "ec" + cv.id, onClick: () => choisirChevalEpingle(cv.id, cv.nom), style: { width: "100%", padding: "13px 14px", borderRadius: 14, background: "transparent", border: `1px solid ${COLORS.ligne}`, color: COLORS.encre, fontWeight: 600, fontSize: 14, textAlign: "left", cursor: "pointer" } }, cv.nom)),
                    React.createElement("button", { onClick: () => setEpingleCible(null), style: { width: "100%", marginTop: 12, padding: "11px 0", borderRadius: 14, background: "transparent", color: COLORS.encreDoux, fontWeight: 700, fontSize: 13, border: "none" } }, TXT("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"))))) : null,
        toastHB ? React.createElement("div", { style: { position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)", zIndex: 99, background: "rgba(18,24,32,0.92)", border: `1px solid ${"#C9A66B"}66`, color: COLORS.blanc, borderRadius: Array.isArray(toastHB) ? 16 : 999, padding: Array.isArray(toastHB) ? "10px 18px" : "9px 18px", fontSize: 13, fontWeight: 600, whiteSpace: Array.isArray(toastHB) ? "normal" : "nowrap", maxWidth: Array.isArray(toastHB) ? "78vw" : undefined, textAlign: "center", lineHeight: 1.45 } }, Array.isArray(toastHB) ? toastHB.map((ln, i) => React.createElement("div", { key: i, style: i ? { fontSize: 12, fontWeight: 500, color: "#C9A66B", marginTop: 3 } : null }, ln)) : toastHB) : null,
        hbMenuRendu, hbConfirmRendu, hbRenomRendu, hbCatRendu));
}
window.HypeAssistant = { Assistant: EcranAssistantIA };
})();
