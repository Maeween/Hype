/* HYPE ▸ 30/10/2026 — Page PROFIL (EcranProfilInterne), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~66 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranProfilInterne() {
    const { profil, setProfil, premium, estAbonne, planAbo, setEcran, xp, t, tr, coursTermines, quizResultats, langue, setMerciVIP, setImpression, chevaux, setChevaux, famillePremium } = useApp();
    const [edition, setEdition] = useState(false);
    const [ajoutCheval, setAjoutCheval] = useState(false);
    const [limiteCheval, setLimiteCheval] = useState(false);
    /* 07/08 : le role decide du quota. estAmbassadeurHype inclut deja les
       moderateurs. Lecture asynchrone : avant la reponse on traite le compte
       comme non-ambassadeur, c est-a-dire le cas le plus restrictif — jamais
       l inverse, pour ne pas ouvrir un acces par erreur. */
    const [ambassadeurCav, setAmbassadeurCav] = useState(false);
    /* 04/09 (demande de Blandine : « oui plus simple ») — L ABONNEMENT LISIBLE
       DEPUIS MON COMPTE, sans passer par l onglet Premium.
       ⚠️ Cette tuile lit la TABLE, pas l etat de l application. Elle dit donc
       la verite meme quand l interrupteur d administratrice force le mode
       Premium — c est justement l interet.
       Trois etats distincts, jamais confondus : undefined = lecture en cours,
       false = lecture IMPOSSIBLE (on le dit, on n affiche pas « aucun »),
       null = aucune ligne. */
    /* 21/10 (tests Blandine, probleme 8) — L ADRESSE E-MAIL « NON RENSEIGNEE » ALORS QU ON EST CONNECTE.
       Cause : la tuile lisait SEULEMENT profil.email (profil garde sur le telephone), jamais le compte connecte.
       On lit d abord l adresse du compte connecte (Supabase Auth), le profil ne sert qu en complement ;
       tant que la session n a pas repondu on affiche « … » (jamais « Non renseignee » trop tot), et on
       relit a chaque changement de compte pour ne jamais montrer l adresse d un compte precedent. */
    const [emailAuth, setEmailAuth] = useState(undefined);   /* undefined = lecture en cours, null = pas d adresse */
    useEffect(() => {
      let vifEm = true, aboEm = null;
      const lireEm = () => { utilisateurActuel().then((uEm) => { if (vifEm) setEmailAuth((uEm && uEm.email) || null); }).catch(() => { if (vifEm) setEmailAuth(null); }); };
      lireEm();
      try { const rEm = supa.auth.onAuthStateChange((ev, sess) => { if (!vifEm) return; if (sess && sess.user) setEmailAuth(sess.user.email || null); else lireEm(); }); aboEm = rEm && rEm.data && rEm.data.subscription; } catch (eEm) { }
      return () => { vifEm = false; try { if (aboEm) aboEm.unsubscribe(); } catch (eU) { } };
    }, []);
    const [aboMoi, setAboMoi] = useState(undefined);
    useEffect(() => {
      let vifAb = true;
      (async () => {
        try {
          const uAb = await utilisateurActuel();
          if (!uAb || typeof supa === "undefined" || !supa) { if (vifAb) setAboMoi(false); return; }
          const rAb = await supa.from("abonnements_premium").select("plan,statut,expire_le").eq("user_id", uAb.id);
          if (!vifAb) return;
          if (rAb && rAb.error) { setAboMoi(false); return; }
          /* meme tri que lireAbo : la ligne active la plus lointaine */
          const lignesAb = (rAb && rAb.data) || [];
          const choisi = lignesAb.slice().sort(function (a, b) {
            const ea = (a.statut === "actif") ? 1 : 0, eb = (b.statut === "actif") ? 1 : 0;
            if (ea !== eb) return eb - ea;
            return String(b.expire_le || "").localeCompare(String(a.expire_le || ""));
          })[0];
          setAboMoi(choisi || null);
        } catch (eAb) { if (vifAb) setAboMoi(false); }
      })();
      return () => { vifAb = false; };
    }, []);
    useEffect(() => {
      let vif = true;
      (async () => {
        try {
          const uAmb = await utilisateurActuel();
          if (vif && typeof estAmbassadeurHype === "function") setAmbassadeurCav(estAmbassadeurHype(uAmb));
        } catch (eAmb) { }
      })();
      return () => { vif = false; };
    }, []);
    const [chevalVu, setChevalVu] = useState(null);
    /* 15/08 — RÉGLAGE DE POSITION. Idée de Blandine, qui donne enfin un sens à la
       ligne du lieu : « le lieu par contre on pouvait le garder, c'était l'endroit
       où choisir de le rendre public ou non ».
       ⚠️ Sa correction, à respecter mot pour mot : désactiver ne retire PAS la
       cavalière des membres de son écurie — « elle reste comptée dans les
       cavaliers de l'écurie mais sa position n'apparaît pas c'est tout ».
       Colonne attendue : `profiles.sur_carte` (booléen, défaut true). Le SQL est
       livré à part ; sans la colonne, l'interrupteur s'affiche et l'écriture
       échoue en silence — donc À PASSER AVANT de pousser. */
    const [surCarte, setSurCarte] = useState(profil.sur_carte !== false);
    const [local, setLocal] = useState(profil);
    /* 🟥 15/08 : droit d'accès au back-office. Lu une fois au montage, comme
       l'ambassadeur juste au-dessus. Voir la ligne du menu plus bas. */
    const [estModAdmin, setEstModAdmin] = useState(false);
    useEffect(() => {
        let vif = true;
        (async () => {
            try {
                const uM = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
                if (vif && typeof estModerateurHype === "function") setEstModAdmin(estModerateurHype(uM));
            } catch (eM) { }
        })();
        return () => { vif = false; };
    }, []);
    const niveau = Math.floor(xp / 200) + 1;
    const scoreCl = calculerScoreCavalier(profil, planAbo);
    const rangCl = rangCavalier(profil, planAbo);
    const galopMot = t("nav_galops").replace(/s$/, "");
    const galopSuivant = Math.min(profil.galopActuel + 1, 7);
    const coursDuGalopP = obtenirSommaireGalop(profil.galopActuel, langue);
    const terminesP = coursDuGalopP.filter((c) => coursTermines.includes(c.id)).length;
    const pctCours = coursDuGalopP.length ? Math.round((terminesP / coursDuGalopP.length) * 100) : 0;
    const quizDuGalopP = coursDuGalopP.map((c) => quizResultats[c.id]).filter((v) => typeof v === "number");
    const pctQuiz = quizDuGalopP.length ? Math.round(quizDuGalopP.reduce((a, b) => a + b, 0) / quizDuGalopP.length) : 0;
    const fileRef = useRef(null);
    const choisirPhoto = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f)
            return;
        const lecteur = new FileReader();
        lecteur.onload = () => {
            /* affichage immediat, pour que le cavalier voie sa photo tout de suite */
            setProfil((p) => ({ ...p, avatar: lecteur.result }));
            /* 28/07 : AVANT, cette ligne appelait syncProfilDistant({ avatar: ... }) — mauvais nom
               de colonne (la vraie est « avatar_url ») + erreur avalee par un catch vide, donc la
               photo ne quittait JAMAIS le telephone et les autres cavaliers voyaient la silhouette
               par defaut. On passe maintenant par hypeEnregistrerPhoto, qui fait un vrai upload
               dans le bucket puis ecrit avatar_url. Les echecs sont remontes a l ecran. */
            try {
                if (typeof hypeEnregistrerPhoto === "function" && typeof supa !== "undefined") {
                    hypeEnregistrerPhoto("avatar", null, { fichier: f, dataUrl: lecteur.result }, (profil && (profil.avatar_url || profil.avatar)) || null)
                        .then(function (r) {
                            if (r && r.url) setProfil((p) => ({ ...p, avatar: r.url, avatar_url: r.url }));
                        })
                        .catch(function (err) {
                            console.error("choisirPhoto: echec enregistrement avatar", err);
                            try { alert(hypeT7("Ta photo n a pas pu etre enregistree sur le serveur : les autres cavaliers ne la verront pas. Reessaie quand la connexion est meilleure.", "Your photo could not be saved on the server: other riders will not see it. Try again when the connection is better.", "No se pudo guardar tu foto en el servidor: los dem\u00e1s jinetes no la ver\u00e1n. Vuelve a intentarlo con mejor conexi\u00f3n.", "Impossibile salvare la tua foto sul server: gli altri cavalieri non la vedranno. Riprova con una connessione migliore.", "\u5199\u771f\u3092\u30b5\u30fc\u30d0\u30fc\u306b\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u4ed6\u306e\u30e9\u30a4\u30c0\u30fc\u306b\u306f\u8868\u793a\u3055\u308c\u307e\u305b\u3093\u3002\u63a5\u7d9a\u304c\u826f\u3044\u3068\u304d\u306b\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Dein Foto konnte nicht auf dem Server gespeichert werden: Andere Reiter sehen es nicht. Versuche es bei besserer Verbindung erneut.", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0635\u0648\u0631\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u062e\u0627\u062f\u0645: \u0644\u0646 \u064a\u0631\u0627\u0647\u0627 \u0627\u0644\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0622\u062e\u0631\u0648\u0646. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0639\u0646\u062f\u0645\u0627 \u064a\u0643\u0648\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0623\u0641\u0636\u0644.", "你的照片没能保存到服务器：其他骑手看不到它。请在网络更好时重试。", "Je foto kon niet op de server worden opgeslagen: de andere ruiters zien hem niet. Probeer het opnieuw als de verbinding beter is.", "Sua foto não pôde ser salva no servidor: os outros cavaleiros não vão vê-la. Tente novamente quando a conexão estiver melhor.", "Ditt foto kunde inte sparas på servern: de andra ryttarna kommer inte att se det. Försök igen när anslutningen är bättre.", "Твоё фото не удалось сохранить на сервере: другие всадники его не увидят. Попробуй снова, когда связь будет лучше.", "Nie udało się zapisać twojego zdjęcia na serwerze: inni jeźdźcy go nie zobaczą. Spróbuj ponownie, gdy połączenie będzie lepsze.", "사진을 서버에 저장하지 못해서 다른 기수들에게는 보이지 않아요. 연결이 좋아지면 다시 시도해 주세요.")); } catch (eA) { }
                        });
                }
            } catch (e) { console.error("choisirPhoto:", e); }
        };
        lecteur.readAsDataURL(f);
    };
    const chevalRef = useRef(null);
    const choisirCheval = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f)
            return;
        const lecteur = new FileReader();
        /* 28/07 : on ecrivait la dataUrl base64 directement dans la colonne cheval_photo — seule
           photo du projet a ne pas passer par le bucket. Une image de 2 Mo devenait ~2,7 Mo de texte
           dans la ligne de profil, rechargee a chaque lecture. On envoie desormais le fichier et on
           ne stocke que son URL, comme toutes les autres photos. */
        lecteur.onload = () => {
            setProfil((p) => ({ ...p, chevalPhoto: lecteur.result }));   /* affichage immediat */
            try {
                if (typeof envoyerPhoto === "function" && typeof supa !== "undefined") {
                    envoyerPhoto(f).then(function (up) {
                        if (up && up.url) {
                            setProfil((p) => ({ ...p, chevalPhoto: up.url }));
                            if (typeof syncProfilDistant === "function") syncProfilDistant({ cheval_photo: up.url });
                        } else {
                            console.error("choisirCheval: echec envoi", up && up.error);
                            try { alert(tr(HYPE_TXT_PHOTO_NON_ENVOYEE)); } catch (eA) { }
                        }
                    }).catch(function (err) {
                        console.error("choisirCheval: echec envoi", err);
                        try { alert(tr(HYPE_TXT_PHOTO_NON_ENVOYEE)); } catch (eA2) { }
                    });
                }
            } catch (e) { }
        };
        lecteur.readAsDataURL(f);
    };
    const fondCheval = profil.chevalPhoto || (typeof CHEVAL_DEFAUT !== "undefined" ? CHEVAL_DEFAUT : PHOTOS.hero_dashboard);
    const avatarSrc = profil.avatar || (typeof LOGO_DATA !== "undefined" ? LOGO_DATA : null);
    /* ═══════════════════════════════════════════════════════════════════
       15/08 — LA PAGE CAVALIER REDEVIENT UN ÉCRAN DE RÉGLAGES.
       Report de la maquette validée par Blandine (maquette-mon-compte-v3).

       CE QU'ELLE A DIT, ET QUI COMMANDE TOUT :
         « juste les réglages de compte changer email éventuellement
           signaler un bug ou faire une suggestion et basta »
       La page vendait trois fois — abonnement, Crystal, offre Pro — alors
       qu'un onglet Premium existe dans la barre du bas et que c'est son
       métier. Ses mots : « raison de plus pour que ce qui devrait vraiment
       être dessus y soit, et pas renvoyer vers une autre page pour ça ».

       PHOTO DU CHEVAL : Blandine a choisi l'option 2 — bande EN HAUT,
       plein cadre, NETTE, le contenu commence DESSOUS. Aucun voile, aucun
       vignettage (règle absolue). L'avatar n'est PAS posé dessus : il vit
       dans le pavé identité, en dessous. La règle « jamais d'image derrière
       l'avatar » est donc respectée.

       RIEN N'EST SUPPRIMÉ : Crystal, l'offre Pro, la ligne Premium et la
       version imprimable sont conservées ci-dessous, neutralisées par
       `false &&`. Retirer le `false &&` les fait revenir telles quelles.
       ⚠️ Version imprimable n'a PLUS AUCUNE PORTE tant qu'elle n'est pas
          posée dans les Galops — signalé à Blandine, tracé au SUIVI.
       ═══════════════════════════════════════════════════════════════════ */
    const CY = "#7FA3AD", GRIS = "#8B96A0", GRIS_S = "#5E6871", LIGNE = "rgba(244,247,250,0.08)";
    const styleTuile = (large) => ({
        position: "relative", overflow: "hidden", display: "flex",
        flexDirection: large ? "row" : "column",
        alignItems: large ? "center" : "flex-start",
        justifyContent: large ? "flex-start" : "space-between",
        gap: large ? 15 : 0, minHeight: large ? 0 : 112,
        padding: large ? "17px 16px" : 15, borderRadius: 20, cursor: "pointer",
        background: "linear-gradient(158deg, #151A20 0%, #10151A 52%, #0C1116 100%)",
        border: "1px solid rgba(244,247,250,0.055)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.045), 0 1px 3px rgba(0,0,0,0.35)",
        textAlign: "left", color: COLORS.blanc,
        gridColumn: large ? "1 / -1" : "auto", width: "100%", boxSizing: "border-box",
    });
    const styleIco = (accent) => ({
        flex: "0 0 auto", width: 36, height: 36, borderRadius: 12,
        background: accent ? "rgba(127,163,173,0.13)" : "rgba(244,247,250,0.055)",
        border: "1px solid " + (accent ? "rgba(127,163,173,0.30)" : "rgba(244,247,250,0.07)"),
        display: "flex", alignItems: "center", justifyContent: "center",
    });
    const svgTuile = (accent, enfants) => React.createElement("svg", {
        viewBox: "0 0 24 24", width: 17, height: 17, fill: "none",
        stroke: accent ? CY : GRIS, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
    }, enfants);
    const eyebrow = (texte) => React.createElement("div", {
        style: { fontSize: 9.5, letterSpacing: "0.26em", textTransform: "uppercase", color: GRIS_S, fontWeight: 700, margin: "30px 20px 12px" },
    }, texte);
    const grille = (cle, enfants) => React.createElement("div", {
        key: cle, style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, padding: "0 20px" },
    }, enfants);
    /* Une tuile. `large` = pleine largeur. `accent` = la seule qui porte le turquoise. */
    const tuile = (o) => React.createElement("button", {
        key: o.cle, onClick: o.onClick || null, disabled: !o.onClick,
        style: Object.assign(styleTuile(o.large), o.style || {}),
    },
        React.createElement("span", { style: styleIco(o.accent) }, svgTuile(o.accent, o.ico)),
        React.createElement("span", { style: { flex: 1, minWidth: 0, marginTop: o.large ? 0 : "auto" } },
            React.createElement("b", { style: { display: "block", fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: o.couleur || COLORS.blanc } }, o.titre),
            o.sous ? React.createElement("span", { style: { display: "block", fontSize: 11, color: o.accent ? CY : GRIS_S, marginTop: 4, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: o.multi ? "normal" : "nowrap" } }, o.sous) : null),
        o.pastille ? React.createElement("span", { style: { flex: "0 0 auto", alignSelf: "center", padding: "6px 12px", borderRadius: 999, border: "1px solid " + LIGNE, background: "rgba(255,255,255,0.03)", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GRIS_S } }, o.pastille) : null,
        (o.large && o.onClick) ? React.createElement("span", { style: { flex: "0 0 auto", color: GRIS_S, fontSize: 16, lineHeight: 1 } }, "\u203A") : null);

    return (React.createElement("div", { className: "pi-page", style: { padding: "0 0 8px" } },
        /* 21/10 (tests Blandine, probleme 8) : grand ecran — identite et modification a gauche (360 px, reste visible en defilant),
           rubriques de reglages a droite ; la bande photo et le pied traversent. Telephone : une colonne, inchange. */
        React.createElement("style", null, "@media (min-width:1024px){.pi-page{display:grid;grid-template-columns:360px minmax(0,1fr);column-gap:28px;align-items:start;padding-left:20px !important;padding-right:20px !important}" +
          ".pi-page>*{grid-column:2;min-width:0}.pi-page>.pi-bande{grid-column:1 / -1;margin-left:-20px;margin-right:-20px;width:auto !important}" +
          ".pi-page>.pi-gauche{grid-column:1;grid-row:2 / span 40;position:sticky;top:16px;align-self:start}.pi-gauche>div{margin-left:0 !important;margin-right:0 !important;padding-left:0 !important;padding-right:0 !important}" +
          ".pi-page>.pi-pied{grid-column:1 / -1}}"),
        /* ---------- 1. LA BANDE PHOTO ---------- */
        React.createElement("div", { className: "pi-bande", style: { position: "relative", width: "100%", height: "33vh", minHeight: 205, maxHeight: 280, overflow: "hidden", background: COLORS.nuitElevee } },
            React.createElement("img", { src: fondCheval, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
            /* le filet turquoise qui referme la bande — sur le bord, jamais sur la photo */
            React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: `linear-gradient(90deg, transparent, ${CY}, transparent)`, opacity: 0.5 } }),
            /* ⚠️ SAFE AREA : le titre passait sous l'heure de l'iPhone (signalé par
               Blandine, capture de 22h17). Le bloc n'avait aucun env(safe-area-inset-top),
               contrairement au reste de l'app. */
            React.createElement("div", { style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 10px)", left: 18, right: 18, display: "flex", alignItems: "center", justifyContent: "space-between" } },
                React.createElement("span", { style: { fontFamily: "'Cinzel', serif", fontSize: 11.5, letterSpacing: "0.30em", color: "rgba(244,247,250,0.94)", textShadow: "0 1px 10px rgba(0,0,0,0.7)" } }, t("mon_cavalier"))),
            React.createElement("input", { ref: chevalRef, type: "file", accept: "image/*", onChange: choisirCheval, style: { display: "none" } })),

        /* ---------- 2. LE PAVÉ IDENTITÉ ----------
           ⚠️ minHeight 270 RETIRÉ. L'ancien en-tête réservait cette hauteur pour la
           rangée Indice · Ton rang · Points, vidée hier : il restait un grand trou
           sous le prénom (« il y a un vide énorme »). */
        React.createElement("div", { className: "pi-gauche" },   /* 21/10 : simple enveloppe (colonne gauche sur grand ecran) */
        React.createElement("div", { style: { padding: "24px 20px 0", display: "flex", alignItems: "center", gap: 16 } },
            React.createElement("div", { style: { position: "relative", flexShrink: 0 } },
                React.createElement("button", { onClick: () => fileRef.current && fileRef.current.click(), title: t("changer_photo"), style: { width: 88, height: 88, borderRadius: "50%", overflow: "hidden", padding: 0, background: COLORS.nuitElevee, color: COLORS.blanc, fontSize: 34, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 1px ${CY}73, 0 0 24px ${CY}29` } }, avatarSrc ? React.createElement("img", { src: avatarSrc, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : React.createElement(AvatarRond)),
                React.createElement("div", { onClick: () => fileRef.current && fileRef.current.click(), style: { position: "absolute", right: -1, bottom: -1, width: 27, height: 27, borderRadius: "50%", background: "rgba(6,7,9,0.94)", border: `1px solid ${CY}52`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
                    React.createElement("svg", { viewBox: "0 0 24 24", width: 12, height: 12, fill: "none", stroke: CY, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
                        React.createElement("path", { d: "M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" }),
                        React.createElement("circle", { cx: "12", cy: "13", r: "3.2" }))),
                React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: choisirPhoto, style: { display: "none" } })),
            React.createElement("div", { style: { minWidth: 0 } },
                React.createElement("p", { style: { margin: 0, fontSize: 27, fontWeight: 700, letterSpacing: "-0.02em", color: COLORS.blanc, lineHeight: 1.05 } }, profil.prenom || t("cavalier_defaut")),
                React.createElement("p", { style: { margin: "7px 0 0", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GRIS } }, profil.club || t("non_renseigne")),
                React.createElement("button", { onClick: () => { if (edition) setProfil(local); setEdition(!edition); }, style: { display: "inline-flex", alignItems: "center", gap: 5, margin: "12px 0 0", background: "none", border: 0, padding: 0, cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: CY } },
                    edition ? t("enregistrer_modifs") : t("modifier_profil"),
                    React.createElement("svg", { viewBox: "0 0 24 24", width: 10, height: 10, fill: "none", stroke: CY, strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" },
                        React.createElement("path", { d: "M9 6l6 6-6 6" }))))),

        /* ---------- LE FORMULAIRE D'ÉDITION, inchangé ---------- */
        edition ? React.createElement("div", { style: { margin: "18px 20px 0", background: COLORS.nuitClaire, border: `1px solid ${COLORS.ligne}`, borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12 } },
            React.createElement(ChampTexte, { placeholder: t("prenom_placeholder"), value: local.prenom, onChange: (v) => setLocal({ ...local, prenom: v }), fond: "rgba(255,255,255,0.07)", bordure: "rgba(255,255,255,0.22)" }),
            React.createElement(ChampTexte, { placeholder: t("club_placeholder"), value: local.club, onChange: (v) => setLocal({ ...local, club: v }), fond: "rgba(255,255,255,0.07)", bordure: "rgba(255,255,255,0.22)" })) : null),

        /* ---------- COMPTE ---------- */
        eyebrow(tr({ fr: "Compte", en: "Account", es: "Cuenta", it: "Account", ja: "アカウント", de: "Konto", ar: "\u0627\u0644\u062d\u0633\u0627\u0628", zh: "账户", nl: "Account", pt: "Conta", sv: "Konto", ru: "Аккаунт", pl: "Konto", ko: "계정" })),
        grille("g-compte", [
            /* 04/09 — MON ABONNEMENT, en tete de la section COMPTE. */
            (function () {
                const dateLisible = (d) => { try { return new Date(d).toLocaleDateString(); } catch (eD) { return String(d || ""); } };
                const nomPlan = (pl) => pl === "annuel" ? tr({ fr: "Abonnement annuel", en: "Annual plan", es: "Plan anual", it: "Piano annuale", ja: "年間プラン", de: "Jahresabo", ar: "\u0627\u0634\u062a\u0631\u0627\u0643 \u0633\u0646\u0648\u064a", zh: "年度订阅", nl: "Jaarabonnement", pt: "Assinatura anual", sv: "Årsprenumeration", ru: "Годовая подписка", pl: "Subskrypcja roczna", ko: "연간 구독" })
                    : pl === "mensuel" ? tr({ fr: "Abonnement mensuel", en: "Monthly plan", es: "Plan mensual", it: "Piano mensile", ja: "月間プラン", de: "Monatsabo", ar: "\u0627\u0634\u062a\u0631\u0627\u0643 \u0634\u0647\u0631\u064a", zh: "月度订阅", nl: "Maandabonnement", pt: "Assinatura mensal", sv: "Månadsprenumeration", ru: "Месячная подписка", pl: "Subskrypcja miesięczna", ko: "월간 구독" })
                    : pl === "duo" ? tr({ fr: "Formule Duo", en: "Duo plan", es: "Plan Dúo", it: "Piano Duo", ja: "Duoプラン", de: "Duo-Paket", ar: "\u0628\u0627\u0642\u0629 Duo", zh: "Duo 套餐", nl: "Duo-formule", pt: "Plano Duo", sv: "Duo-paket", ru: "Тариф Duo", pl: "Pakiet Duo", ko: "Duo 요금제" })
                    : pl === "ai" ? tr({ fr: "Formule Hype IA", en: "Hype AI plan", es: "Plan Hype IA", it: "Piano Hype IA", ja: "Hype AIプラン", de: "Hype-KI-Paket", ar: "\u0628\u0627\u0642\u0629 Hype IA", zh: "Hype IA 套餐", nl: "Hype AI-formule", pt: "Plano Hype IA", sv: "Hype AI-paket", ru: "Тариф Hype IA", pl: "Pakiet Hype AI", ko: "Hype AI 요금제" })
                    : String(pl || "");
                let sousLigne, pastille = null;
                if (aboMoi === undefined) {
                    sousLigne = tr({ fr: "Lecture en cours…", en: "Loading…", es: "Cargando…", it: "Caricamento…", ja: "読み込み中…", de: "Wird geladen…", ar: "\u062c\u0627\u0631 \u0627\u0644\u0642\u0631\u0627\u0621\u0629\u2026", zh: "正在识别…", nl: "Lezen…", pt: "Lendo…", sv: "Läser…", ru: "Чтение…", pl: "Odczytywanie…", ko: "읽는 중…" });
                } else if (aboMoi === false) {
                    sousLigne = tr({ fr: "Lecture impossible — réessaie plus tard.", en: "Couldn't read — try again later.", es: "No se pudo leer — inténtalo más tarde.", it: "Lettura impossibile — riprova più tardi.", ja: "読み込めませんでした。あとでお試しください。", de: "Nicht lesbar — versuche es später.", ar: "\u062a\u0639\u0630\u0631\u062a \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0644\u0627\u062d\u0642\u0627.", zh: "无法读取——请稍后再试。", nl: "Lezen niet mogelijk — probeer het later opnieuw.", pt: "Não foi possível ler — tente novamente mais tarde.", sv: "Kunde inte läsas – försök igen senare.", ru: "Не удалось прочитать — попробуй позже.", pl: "Nie można odczytać — spróbuj później.", ko: "읽을 수 없어요. 나중에 다시 시도해 주세요." });
                } else if (aboMoi === null && famillePremium) {
                    /* Premium Famille : pas de ligne personnelle, mais Premium via la famille (détail juste en dessous) */
                    pastille = tr({ fr: "Actif", en: "Active", es: "Activa", it: "Attivo", ja: "有効", de: "Aktiv", ar: "\u0646\u0634\u0637", zh: "有效", nl: "Actief", pt: "Ativo", sv: "Aktiv", ru: "Активна", pl: "Aktywna", ko: "활성" });
                    sousLigne = famT(langue, "titre");
                } else if (aboMoi === null) {
                    sousLigne = tr({ fr: "Aucun abonnement", en: "No subscription", es: "Sin suscripción", it: "Nessun abbonamento", ja: "サブスクリプションなし", de: "Kein Abo", ar: "\u0644\u0627 \u064a\u0648\u062c\u062f \u0627\u0634\u062a\u0631\u0627\u0643", zh: "没有订阅", nl: "Geen abonnement", pt: "Nenhuma assinatura", sv: "Ingen prenumeration", ru: "Нет подписки", pl: "Brak subskrypcji", ko: "구독 없음" });
                } else {
                    /* meme regle d actif que l application entiere */
                    const actifAb = aboMoi.statut === "actif" && (!aboMoi.expire_le || new Date(aboMoi.expire_le).getTime() > Date.now());
                    if (actifAb) {
                        pastille = tr({ fr: "Actif", en: "Active", es: "Activa", it: "Attivo", ja: "有効", de: "Aktiv", ar: "\u0646\u0634\u0637", zh: "有效", nl: "Actief", pt: "Ativo", sv: "Aktiv", ru: "Активна", pl: "Aktywna", ko: "활성" });
                        sousLigne = nomPlan(aboMoi.plan) + (aboMoi.expire_le ? tr({ fr: " · jusqu'au ", en: " · until ", es: " · hasta el ", it: " · fino al ", ja: " · ", de: " · bis ", ar: " \u00b7 \u062d\u062a\u0649 ", zh: " · 至 ", nl: " · tot ", pt: " · até ", sv: " · till och med ", ru: " · до ", pl: " · do ", ko: " · 만료: " }) + dateLisible(aboMoi.expire_le) : "");
                    } else {
                        pastille = tr({ fr: "Terminé", en: "Ended", es: "Terminada", it: "Terminato", ja: "終了", de: "Beendet", ar: "\u0645\u0646\u062a\u0647", zh: "已完成", nl: "Beëindigd", pt: "Encerrado", sv: "Avslutad", ru: "Завершено", pl: "Zakończono", ko: "완료" });
                        sousLigne = nomPlan(aboMoi.plan) + (aboMoi.expire_le ? tr({ fr: " · terminé le ", en: " · ended on ", es: " · terminada el ", it: " · terminato il ", ja: " · 終了日 ", de: " · beendet am ", ar: " \u00b7 \u0627\u0646\u062a\u0647\u0649 \u0641\u064a ", zh: " · 结束于 ", nl: " · beëindigd op ", pt: " · encerrada em ", sv: " · avslutades ", ru: " · завершена ", pl: " · zakończono ", ko: " · 종료: " }) + dateLisible(aboMoi.expire_le) : "");
                    }
                }
                return tuile({
                    cle: "abo", large: true, multi: true, pastille: pastille,
                    titre: tr({ fr: "Mon abonnement", en: "My subscription", es: "Mi suscripción", it: "Il mio abbonamento", ja: "マイサブスクリプション", de: "Mein Abo", ar: "\u0627\u0634\u062a\u0631\u0627\u0643\u064a", zh: "我的订阅", nl: "Mijn abonnement", pt: "Minha assinatura", sv: "Min prenumeration", ru: "Моя подписка", pl: "Moja subskrypcja", ko: "내 구독" }),
                    sous: sousLigne,
                    onClick: () => setEcran("premium"),
                    ico: [React.createElement("path", { key: "a", d: "M12 3l4.2 5.2L12 21 7.8 8.2z" }), React.createElement("path", { key: "b", d: "M7.8 8.2h8.4" })],
                });
            })(),
            /* Premium Famille (étape 3) : n'apparaît que si le compte a une famille */
            React.createElement(BlocFamille, { key: "famille" }),
            /* 15/10/2026 : « Gérer mon abonnement » (portail Stripe : résilier en ligne, changer de carte, factures).
               Seulement pour les abonnements qui se renouvellent (mensuel, Duo, Hype IA) ; le Cercle Crystal se paie une fois. */
            (HYPE_PORTAIL_STRIPE && aboMoi && typeof aboMoi === "object" && ["mensuel", "duo", "ai"].indexOf(aboMoi.plan) !== -1 && aboMoi.statut !== "annule") ? tuile({
                cle: "gerer-abo", large: true,
                titre: tr({ fr: "Gérer mon abonnement", en: "Manage my subscription", es: "Gestionar mi suscripción", it: "Gestisci il mio abbonamento", ja: "サブスクリプションを管理", de: "Mein Abo verwalten", ar: "\u0625\u062f\u0627\u0631\u0629 \u0627\u0634\u062a\u0631\u0627\u0643\u064a", zh: "管理我的订阅", nl: "Mijn abonnement beheren", pt: "Gerenciar minha assinatura", sv: "Hantera min prenumeration", ru: "Управлять подпиской", pl: "Zarządzaj subskrypcją", ko: "내 구독 관리" }),
                sous: tr({ fr: "Résilier, changer de carte, voir mes factures", en: "Cancel, change card, see my invoices", es: "Cancelar, cambiar de tarjeta, ver mis facturas", it: "Disdire, cambiare carta, vedere le fatture", ja: "解約・カード変更・請求書の確認", de: "Kündigen, Karte ändern, Rechnungen ansehen", ar: "\u0627\u0644\u0625\u0644\u063a\u0627\u0621\u060c \u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0628\u0637\u0627\u0642\u0629\u060c \u0639\u0631\u0636 \u0641\u0648\u0627\u062a\u064a\u0631\u064a", zh: "取消订阅、更换银行卡、查看账单", nl: "Opzeggen, van kaart wisselen, mijn facturen bekijken", pt: "Cancelar, trocar de cartão, ver minhas faturas", sv: "Säga upp, byta kort, se mina fakturor", ru: "Отменить, сменить карту, посмотреть счета", pl: "Anuluj, zmień kartę, zobacz faktury", ko: "해지, 카드 변경, 결제 내역 보기" }),
                onClick: () => { try { window.hypeOuvrirPortail(); } catch (e) { } },
                ico: [React.createElement("rect", { key: "a", x: "3.5", y: "6", width: "17", height: "12", rx: "2" }), React.createElement("path", { key: "b", d: "M3.5 10h17" })],
            }) : null,

            /* 22/09 (345) : la tuile « Ma licence FFE » (340) est RETIREE de Mon compte, sur sa decision :
               elle doublonnait « Relier les resultats FFE » (EcranRattacherFFE, 13/09) et n etait reliee
               a rien. Le composant BlocLicenceFFE reste dans le fichier, inerte (aucun nettoyage) ;
               la table noms_ffe reste en base, inutilisee. */

            /* LA POSITION — tuile large, avec son interrupteur.
               ⚠️ Correction de Blandine à respecter mot pour mot : désactiver ne
               retire PAS la cavalière des membres de son écurie. */
            React.createElement("div", { key: "pos", style: Object.assign(styleTuile(true), { cursor: "default" }) },
                React.createElement("span", { style: styleIco(surCarte) },
                    React.createElement("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: surCarte ? CY : GRIS_S, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
                        React.createElement("path", { d: "M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" }),
                        React.createElement("circle", { cx: "12", cy: "10", r: "2.6" }))),
                React.createElement("span", { style: { flex: 1, minWidth: 0 } },
                    React.createElement("b", { style: { display: "block", fontSize: 14, fontWeight: 600 } }, profil.club || profil.ville || tr({ fr: "Lieu non renseigné", en: "No place set", es: "Sin lugar", it: "Nessun luogo", ja: "場所未設定", de: "Kein Ort", ar: "\u0627\u0644\u0645\u0643\u0627\u0646 \u063a\u064a\u0631 \u0645\u062d\u062f\u062f", zh: "未填写地点", nl: "Plaats niet ingevuld", pt: "Local não informado", sv: "Ingen plats angiven", ru: "Место не указано", pl: "Brak miejsca", ko: "장소가 설정되지 않았어요" })),
                    React.createElement("span", { style: { display: "block", fontSize: 11, color: GRIS, marginTop: 4, lineHeight: 1.4 } },
                        surCarte
                            ? tr({ fr: "Ta position apparaît sur la carte de la communauté.", en: "Your location appears on the community map.", es: "Tu ubicación aparece en el mapa de la comunidad.", it: "La tua posizione appare sulla mappa della community.", ja: "コミュニティのマップに表示されます。", de: "Dein Ort erscheint auf der Community-Karte.", ar: "\u064a\u0638\u0647\u0631 \u0645\u0648\u0642\u0639\u0643 \u0639\u0644\u0649 \u062e\u0631\u064a\u0637\u0629 \u0627\u0644\u0645\u062c\u062a\u0645\u0639.", zh: "你的位置会显示在社区地图上。", nl: "Je locatie verschijnt op de kaart van de community.", pt: "Sua localização aparece no mapa da comunidade.", sv: "Din position visas på communityns karta.", ru: "Твоё местоположение отображается на карте сообщества.", pl: "Twoja lokalizacja widnieje na mapie społeczności.", ko: "내 위치가 커뮤니티 지도에 표시돼요." })
                            : tr({ fr: "Ta position n'apparaît pas sur la carte. Tu restes membre de ton écurie.", en: "Your location is hidden from the map. You remain a member of your stable.", es: "Tu ubicación no aparece en el mapa. Sigues siendo miembro de tu cuadra.", it: "La tua posizione non appare sulla mappa. Resti membro della tua scuderia.", ja: "マップには表示されません。厩舎のメンバーであることは変わりません。", de: "Dein Ort erscheint nicht auf der Karte. Du bleibst Mitglied deines Stalls.", ar: "\u0644\u0627 \u064a\u0638\u0647\u0631 \u0645\u0648\u0642\u0639\u0643 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629. \u062a\u0628\u0642\u064a\u0646 \u0639\u0636\u0648\u0629 \u0641\u064a \u0625\u0633\u0637\u0628\u0644\u0643.", zh: "你的位置不会显示在地图上。你仍然是你所在马厩的成员。", nl: "Je locatie verschijnt niet op de kaart. Je blijft lid van je stal.", pt: "Sua localização não aparece no mapa. Você continua membro da sua cocheira.", sv: "Din position visas inte på kartan. Du är fortfarande medlem i ditt stall.", ru: "Твоё местоположение не отображается на карте. Ты остаёшься участником своей конюшни.", pl: "Twoja lokalizacja jest ukryta na mapie. Nadal jesteś członkiem swojej stajni.", ko: "내 위치가 지도에 표시되지 않아요. 마구간 구성원은 그대로예요." }))),
                React.createElement("button", {
                    onClick: () => { const v = !surCarte; setSurCarte(v); setProfil((pr) => ({ ...pr, sur_carte: v })); try { syncProfilDistant({ sur_carte: v }).catch(function () { }); } catch (e) { } },
                    "aria-label": tr({ fr: "Apparaître sur la carte", en: "Appear on the map", es: "Aparecer en el mapa", it: "Apparire sulla mappa", ja: "マップに表示", de: "Auf der Karte erscheinen", ar: "\u0627\u0644\u0638\u0647\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629", zh: "显示在地图上", nl: "Op de kaart verschijnen", pt: "Aparecer no mapa", sv: "Visa mig på kartan", ru: "Показываться на карте", pl: "Pokaż się na mapie", ko: "지도에 표시하기" }),
                    style: { flex: "0 0 auto", width: 46, height: 27, borderRadius: 999, cursor: "pointer", position: "relative", border: "1px solid " + (surCarte ? "rgba(127,163,173,0.7)" : "rgba(255,255,255,0.16)"), background: surCarte ? "rgba(127,163,173,0.22)" : "rgba(255,255,255,0.05)", transition: "background 160ms ease-out" },
                },
                    React.createElement("span", { style: { position: "absolute", top: 2, left: surCarte ? 21 : 2, width: 21, height: 21, borderRadius: "50%", background: surCarte ? CY : "rgba(255,255,255,0.42)", boxShadow: surCarte ? `0 0 10px ${CY}80` : "none", transition: "left 160ms ease-out" } }))),

            /* ADRESSE E-MAIL et MOT DE PASSE.
               ⚠️ DÉDUCTION DE CLAUDE — À VALIDER PAR BLANDINE.
               En branchant ces deux tuiles j'ai découvert que l'écran `moncompte`
               n'est PAS un écran de réglages : c'est l'écran de connexion et
               d'inscription. AUCUN flux de changement d'e-mail n'existe dans Hype,
               et le mot de passe ne se change que par lien de réinitialisation.
               Blandine a tranché le principe sur les tuiles de statut : quand une
               mécanique n'existe pas, on met « Prochainement » plutôt qu'une
               promesse creuse. J'applique la même règle ici, à valider. */
            tuile({
                cle: "mail", large: true, accent: true,
                titre: tr({ fr: "Adresse e-mail", en: "Email address", es: "Correo electrónico", it: "Indirizzo email", ja: "メールアドレス", de: "E-Mail-Adresse", ar: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a", zh: "电子邮箱", nl: "E-mailadres", pt: "Endereço de e-mail", sv: "E-postadress", ru: "Адрес электронной почты", pl: "Adres e-mail", ko: "이메일 주소" }),
                sous: emailAuth === undefined ? "\u2026" : (emailAuth || (profil && profil.email)) || tr({ fr: "Non renseignée", en: "Not set", es: "Sin definir", it: "Non impostata", ja: "未設定", de: "Nicht angegeben", ar: "\u063a\u064a\u0631 \u0645\u062d\u062f\u062f", zh: "未填写", nl: "Niet ingevuld", pt: "Não informado", sv: "Inte angiven", ru: "Не указан", pl: "Nie podano", ko: "입력 안 됨" }),
                pastille: tr({ fr: "Prochainement", en: "Coming soon", es: "Próximamente", it: "Prossimamente", ja: "近日公開", de: "Demnächst", ar: "\u0642\u0631\u064a\u0628\u0627", zh: "即将到来", nl: "Binnenkort", pt: "Em breve", sv: "Kommer snart", ru: "Скоро", pl: "Wkrótce", ko: "곧 공개" }),
                ico: [React.createElement("rect", { key: "a", x: "3", y: "5.5", width: "18", height: "13", rx: "2" }), React.createElement("path", { key: "b", d: "M3.4 7l8.6 6 8.6-6" })],
            }),
            tuile({
                cle: "mdp",
                titre: tr({ fr: "Mot de passe", en: "Password", es: "Contraseña", it: "Password", ja: "パスワード", de: "Passwort", ar: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631", zh: "密码", nl: "Wachtwoord", pt: "Senha", sv: "Lösenord", ru: "Пароль", pl: "Hasło", ko: "비밀번호" }),
                sous: tr({ fr: "Recevoir un lien", en: "Get a reset link", es: "Recibir un enlace", it: "Ricevi un link", ja: "リンクを受け取る", de: "Link erhalten", ar: "\u062a\u0644\u0642\u064a \u0631\u0627\u0628\u0637", zh: "接收链接", nl: "Een link ontvangen", pt: "Receber um link", sv: "Få en länk", ru: "Получить ссылку", pl: "Otrzymaj link", ko: "링크 받기" }),
                onClick: () => setEcran("moncompte"),
                ico: [React.createElement("rect", { key: "a", x: "4.5", y: "10.5", width: "15", height: "9.5", rx: "2.2" }), React.createElement("path", { key: "b", d: "M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" })],
            }),
            /* 13/09 (114) : la seconde porte de rattachement, celle des cavalieres.
               Ouverte a TOUT LE MONDE (contrairement a la tuile moderatrice du
               113) : la fonction SQL hype_revendiquer_cavalier accepte toute
               personne connectee, et le rattachement reel reste soumis a
               l accord d une moderatrice. */
            tuile({
                cle: "mesresultatsffe",
                titre: tr({ fr: "Mes r\u00e9sultats de concours", en: "My competition results", es: "Mis resultados de concurso", it: "I miei risultati di concorso", ja: "\u7af6\u6280\u6210\u7e3e", de: "Meine Turnierergebnisse", ar: "\u0646\u062a\u0627\u0626\u062c\u064a \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062a", zh: "我的比赛成绩", nl: "Mijn wedstrijdresultaten", pt: "Meus resultados de competições", sv: "Mina tävlingsresultat", ru: "Мои результаты соревнований", pl: "Moje wyniki zawodów", ko: "내 대회 결과" }),
                sous: tr({ fr: "Relier ton nom FFE \u00e0 ton compte", en: "Link your FFE name to your account", es: "Vincular tu nombre FFE a tu cuenta", it: "Collega il tuo nome FFE al tuo account", ja: "FFE\u306e\u6c0f\u540d\u3092\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u7d10\u3065\u3051\u308b", de: "FFE-Namen mit deinem Konto verkn\u00fcpfen", ar: "\u0631\u0628\u0637 \u0627\u0633\u0645\u0643 \u0641\u064a FFE \u0628\u062d\u0633\u0627\u0628\u0643", zh: "把你的 FFE 姓名关联到账户", nl: "Je FFE-naam koppelen aan je account", pt: "Vincular seu nome FFE à sua conta", sv: "Koppla ditt FFE-namn till ditt konto", ru: "Привязать твоё имя FFE к аккаунту", pl: "Połącz swoje imię i nazwisko FFE z kontem", ko: "FFE 이름을 내 계정에 연결하기" }),
                onClick: () => setEcran("mes-resultats-ffe"),
                ico: [React.createElement("path", { key: "a", d: "M7 4h10v5a5 5 0 0 1-10 0z" }), React.createElement("path", { key: "b", d: "M9.5 14h5l.8 6h-6.6z" })],
            }),
            tuile({
                cle: "journalsession",
                titre: tr({ fr: "Journal de session", en: "Session log", es: "Registro de sesión", it: "Registro di sessione", ja: "セッションログ", de: "Sitzungsprotokoll", ar: "سجل الجلسات", zh: "会话日志", nl: "Sessielogboek", pt: "Registro de sessão", sv: "Sessionslogg", ru: "Журнал сессий", pl: "Dziennik sesji", ko: "세션 기록" }),
                sous: tr({ fr: "Voir les dernières connexions/déconnexions sur cet appareil", en: "See the latest sign-ins/sign-outs on this device", es: "Ver las últimas conexiones/desconexiones en este dispositivo", it: "Vedi gli ultimi accessi/disconnessioni su questo dispositivo", ja: "このデバイスでの最近のログイン/ログアウトを見る", de: "Letzte An- und Abmeldungen auf diesem Gerät ansehen", ar: "عرض آخر عمليات تسجيل الدخول/الخروج على هذا الجهاز", zh: "查看此设备上最近的登录/退出记录", nl: "Bekijk de laatste in- en uitlogmomenten op dit apparaat", pt: "Veja as últimas conexões/desconexões neste aparelho", sv: "Se de senaste inloggningarna/utloggningarna på den här enheten", ru: "Посмотреть последние входы и выходы на этом устройстве", pl: "Zobacz ostatnie logowania i wylogowania na tym urządzeniu", ko: "이 기기의 최근 로그인/로그아웃 기록 보기" }),
                onClick: () => setEcran("journal-session"),
                ico: [React.createElement("circle", { key: "a", cx: "12", cy: "12", r: "8.5" }), React.createElement("path", { key: "b", d: "M12 7.5V12l3 2" })],
            }),
            /* 28/08 (demande Blandine, generalisee a tous les outils de verification
               crees en session) : plus de lien tape a la main dans la barre d adresse
               -- une tuile ici suffit. Reservee aux moderateurs (estModAdmin) : c est
               un outil de relecture interne, pas quelque chose qu une cavaliere doit
               croiser sur son compte. */
                        estModAdmin ? tuile({
                cle: "scorevitrine",
                titre: "Score vitrine des chevaux",
                sous: "Classement interne (remplissage du profil, photos/vidéos) — jamais visible des cavalières",
                onClick: () => setEcran("score-vitrine"),
                ico: [React.createElement("path", { key: "a", d: "M4 20V10M12 20V4M20 20v-7" })],
            }) : null,
            /* 13/09 (113) : relier un nom FFE des resultats a un compte Hype.
               Reservee aux moderatrices : la fonction SQL exige
               hype_est_moderatrice(), l ecran n ouvre donc rien de plus. */
            estModAdmin ? tuile({
                cle: "rattacherffe",
                titre: "Relier les r\u00e9sultats FFE",
                sous: "Donner \u00e0 une cavali\u00e8re les r\u00e9sultats de son nom FFE, et ses points de la saison",
                onClick: () => setEcran("rattacher-ffe"),
                ico: [React.createElement("path", { key: "a", d: "M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1" }), React.createElement("path", { key: "b", d: "M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1" })],
            }) : null,
            tuile({
                cle: "deco", couleur: COLORS.corail,
                titre: t("se_deconnecter"),
                sous: tr({ fr: "Sur cet appareil", en: "On this device", es: "En este dispositivo", it: "Su questo dispositivo", ja: "この端末で", de: "Auf diesem Gerät", ar: "\u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u0647\u0627\u0632", zh: "在此设备上", nl: "Op dit apparaat", pt: "Neste aparelho", sv: "På den här enheten", ru: "На этом устройстве", pl: "To urządzenie", ko: "이 기기" }),
                onClick: () => { hypeSeDeconnecter([function () { try { if (typeof setProfil === "function") setProfil(null); } catch (eP) { } }]).then(function () { setEcran("connexion"); }); },
                ico: [React.createElement("path", { key: "a", d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), React.createElement("path", { key: "b", d: "M16 17l5-5-5-5" }), React.createElement("path", { key: "c", d: "M21 12H9" })],
            }),
        ]),

        /* ---------- TARIF RÉDUIT ----------
           Demande de Blandine : deux tuiles côte à côte, étudiante et
           professionnelle. Le DÉPÔT DU JUSTIFICATIF dans l'app (table,
           bucket privé, écran de modération, suppression après décision)
           est un chantier à part — d'où « Prochainement », son choix, pour
           ne pas ouvrir un envoi de diplômes vers une boîte mail perso.
           ⚠️ Les MONTANTS des tarifs réduits ne sont pas décidés. */
        eyebrow(tr({ fr: "Tarif réduit", en: "Reduced rate", es: "Tarifa reducida", it: "Tariffa ridotta", ja: "割引料金", de: "Ermäßigter Tarif", ar: "\u0633\u0639\u0631 \u0645\u062e\u0641\u0636", zh: "优惠价", nl: "Gereduceerd tarief", pt: "Tarifa reduzida", sv: "Reducerat pris", ru: "Льготный тариф", pl: "Cena obniżona", ko: "할인 요금" })),
        grille("g-tarif", [
            tuile({
                cle: "etu",
                titre: tr({ fr: "Étudiante", en: "Student", es: "Estudiante", it: "Studente", ja: "学生", de: "Studierend", ar: "\u0637\u0627\u0644\u0628\u0629", zh: "学生", nl: "Studente", pt: "Estudante", sv: "Studerande", ru: "Студентка", pl: "Studentka", ko: "학생" }),
                sous: tr({ fr: "Prochainement", en: "Coming soon", es: "Próximamente", it: "Prossimamente", ja: "近日公開", de: "Demnächst", ar: "\u0642\u0631\u064a\u0628\u0627", zh: "即将到来", nl: "Binnenkort", pt: "Em breve", sv: "Kommer snart", ru: "Скоро", pl: "Wkrótce", ko: "곧 공개" }),
                ico: [React.createElement("path", { key: "a", d: "M12 4L2.8 8.4 12 12.8l9.2-4.4z" }), React.createElement("path", { key: "b", d: "M6.4 10.6v4.6c0 1.6 2.5 2.9 5.6 2.9s5.6-1.3 5.6-2.9v-4.6" })],
            }),
            tuile({
                cle: "pro",
                titre: tr({ fr: "Professionnelle", en: "Professional", es: "Profesional", it: "Professionista", ja: "プロ", de: "Profi", ar: "\u0645\u0647\u0646\u064a\u0629", zh: "专业人士", nl: "Professional", pt: "Profissional", sv: "Yrkesverksam", ru: "Профессионал", pl: "Profesjonalistka", ko: "전문가" }),
                sous: tr({ fr: "Prochainement", en: "Coming soon", es: "Próximamente", it: "Prossimamente", ja: "近日公開", de: "Demnächst", ar: "\u0642\u0631\u064a\u0628\u0627", zh: "即将到来", nl: "Binnenkort", pt: "Em breve", sv: "Kommer snart", ru: "Скоро", pl: "Wkrótce", ko: "곧 공개" }),
                ico: [React.createElement("path", { key: "a", d: "M4 8.5h16v11.5H4z" }), React.createElement("path", { key: "b", d: "M9 8.5V6.2A1.7 1.7 0 0 1 10.7 4.5h2.6A1.7 1.7 0 0 1 15 6.2v2.3" }), React.createElement("path", { key: "c", d: "M4 13h16" })],
            }),
        ]),

        /* ---------- AIDE ---------- */
        eyebrow(tr({ fr: "Aide", en: "Help", es: "Ayuda", it: "Aiuto", ja: "ヘルプ", de: "Hilfe", ar: "\u0645\u0633\u0627\u0639\u062f\u0629", zh: "帮助", nl: "Hulp", pt: "Ajuda", sv: "Hjälp", ru: "Помощь", pl: "Pomoc", ko: "도움말" })),
        grille("g-aide", [
            tuile({
                cle: "bug",
                titre: tr({ fr: "Signaler un bug", en: "Report a bug", es: "Informar de un error", it: "Segnala un bug", ja: "不具合を報告", de: "Fehler melden", ar: "\u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u062e\u0644\u0644", zh: "报告问题", nl: "Een bug melden", pt: "Reportar um bug", sv: "Rapportera en bugg", ru: "Сообщить об ошибке", pl: "Zgłoś błąd", ko: "버그 신고" }),
                sous: tr({ fr: "Quelque chose cloche", en: "Something's wrong", es: "Algo no funciona", it: "Qualcosa non va", ja: "うまく動かない", de: "Etwas stimmt nicht", ar: "\u0647\u0646\u0627\u0643 \u0634\u064a\u0621 \u0644\u0627 \u064a\u0639\u0645\u0644", zh: "有些地方不对劲", nl: "Er klopt iets niet", pt: "Algo não está certo", sv: "Något är fel", ru: "Что-то пошло не так", pl: "Coś nie działa", ko: "뭔가 이상해요" }),
                onClick: () => { try { window.hypeOuvrirLien("mailto:feinn@live.fr?subject=" + encodeURIComponent("Hype — signalement de bug")); } catch (e) { } },
                ico: [React.createElement("path", { key: "a", d: "M12 3.5l9 15.5H3z" }), React.createElement("path", { key: "b", d: "M12 10v4" }), React.createElement("path", { key: "c", d: "M12 16.6v.1" })],
            }),
            tuile({
                cle: "sug",
                titre: tr({ fr: "Faire une suggestion", en: "Make a suggestion", es: "Hacer una sugerencia", it: "Fai un suggerimento", ja: "提案する", de: "Vorschlag machen", ar: "\u062a\u0642\u062f\u064a\u0645 \u0627\u0642\u062a\u0631\u0627\u062d", zh: "提出建议", nl: "Een suggestie doen", pt: "Fazer uma sugestão", sv: "Komma med ett förslag", ru: "Предложить идею", pl: "Zgłoś sugestię", ko: "제안하기" }),
                sous: tr({ fr: "Une idée pour la suite", en: "An idea for what's next", es: "Una idea para el futuro", it: "Un'idea per il futuro", ja: "今後のアイデア", de: "Eine Idee für später", ar: "\u0641\u0643\u0631\u0629 \u0644\u0644\u0645\u0633\u062a\u0642\u0628\u0644", zh: "对未来的一个想法", nl: "Een idee voor later", pt: "Uma ideia para o futuro", sv: "En idé för framtiden", ru: "Идея для будущего", pl: "Pomysł na przyszłość", ko: "앞으로를 위한 아이디어" }),
                onClick: () => { try { if (typeof ouvrirSuggestions === "function") ouvrirSuggestions(); else window.hypeOuvrirLien("mailto:feinn@live.fr?subject=" + encodeURIComponent("Hype — suggestion")); } catch (e) { } },
                ico: [React.createElement("path", { key: "a", d: "M12 3a6 6 0 0 1 3.6 10.8c-.6.5-1 1.2-1.1 2H9.5c-.1-.8-.5-1.5-1.1-2A6 6 0 0 1 12 3z" }), React.createElement("path", { key: "b", d: "M9.6 19h4.8" })],
            }),
            /* 22/10 (Blandine) : DEMANDER LE RETRAIT D UNE PHOTO. Un seul endroit, ici (pas un bouton sur chaque photo).
               Comme « Signaler un bug » : un e-mail tout pret vers feinn@live.fr, dans la langue de la cavaliere, avec son
               compte deja rempli ; Blandine est donc prevenue a chaque demande. Les CGV (section 10) renvoient ici. */
            tuile({
                cle: "retrait-photo",
                titre: tr({ fr: "Demander le retrait d'une photo", en: "Request a photo removal", es: "Pedir que se retire una foto", it: "Chiedi di rimuovere una foto", ja: "写真の削除を依頼", de: "Entfernung eines Fotos beantragen", ar: "طلب حذف صورة", zh: "申请删除照片", nl: "Verwijdering van een foto aanvragen", pt: "Pedir a remoção de uma foto", sv: "Begär borttagning av ett foto", ru: "Запросить удаление фото", pl: "Poproś o usunięcie zdjęcia", ko: "사진 삭제 요청" }),
                sous: tr({ fr: "Une photo de toi à retirer", en: "A photo of you to remove", es: "Una foto tuya que retirar", it: "Una tua foto da rimuovere", ja: "あなたが写った写真", de: "Ein Foto von dir entfernen", ar: "صورة لك تريد حذفها", zh: "有你的照片需要删除", nl: "Een foto van jou laten verwijderen", pt: "Uma foto sua para remover", sv: "Ett foto på dig som ska bort", ru: "Фото с тобой, которое нужно удалить", pl: "Twoje zdjęcie do usunięcia", ko: "삭제할 내 사진" }),
                onClick: () => {
                    try {
                        const CR = { fr: ["Bonjour, je souhaite le retrait d'une photo (ou d'une vidéo) sur Hype.", "Où se trouve-t-elle (page, cheval, album, date) :", "Pourquoi :", "Mon compte Hype :"], en: ["Hello, I would like a photo (or video) removed from Hype.", "Where is it (page, horse, album, date):", "Why:", "My Hype account:"], es: ["Hola, quiero que se retire una foto (o un vídeo) de Hype.", "Dónde está (página, caballo, álbum, fecha):", "Por qué:", "Mi cuenta Hype:"], it: ["Ciao, vorrei che una foto (o un video) fosse rimossa da Hype.", "Dove si trova (pagina, cavallo, album, data):", "Perché:", "Il mio account Hype:"], ja: ["こんにちは。Hype上の写真（または動画）の削除をお願いします。", "場所（ページ、馬、アルバム、日付）：", "理由：", "私のHypeアカウント："], de: ["Hallo, ich möchte, dass ein Foto (oder Video) von Hype entfernt wird.", "Wo ist es (Seite, Pferd, Album, Datum):", "Warum:", "Mein Hype-Konto:"], ar: ["مرحبا، أرغب في حذف صورة (أو فيديو) من Hype.", "أين توجد (الصفحة، الحصان، الألبوم، التاريخ):", "السبب:", "حسابي على Hype:"], zh: ["你好，我希望删除 Hype 上的一张照片（或一个视频）。", "在哪里（页面、马匹、相册、日期）：", "原因：", "我的 Hype 账户："], nl: ["Hallo, ik wil graag dat een foto (of video) van Hype wordt verwijderd.", "Waar staat hij (pagina, paard, album, datum):", "Waarom:", "Mijn Hype-account:"], pt: ["Olá, gostaria que uma foto (ou vídeo) fosse removida do Hype.", "Onde está (página, cavalo, álbum, data):", "Por quê:", "Minha conta Hype:"], sv: ["Hej, jag vill att ett foto (eller en video) tas bort från Hype.", "Var finns det (sida, häst, album, datum):", "Varför:", "Mitt Hype-konto:"], ru: ["Здравствуйте, я хочу, чтобы фото (или видео) удалили из Hype.", "Где оно (страница, лошадь, альбом, дата):", "Почему:", "Мой аккаунт Hype:"], pl: ["Dzień dobry, chcę, aby zdjęcie (lub film) zostało usunięte z Hype.", "Gdzie się znajduje (strona, koń, album, data):", "Dlaczego:", "Moje konto Hype:"], ko: ["안녕하세요, Hype에 있는 사진(또는 동영상)을 삭제해 주세요.", "위치 (페이지, 말, 앨범, 날짜):", "이유:", "내 Hype 계정:"] };
                        const c = CR[langue] || CR.fr;
                        const qui = ((profil && (profil.pseudo || profil.prenom)) || "") + ((emailAuth || (profil && profil.email)) ? " (" + (emailAuth || profil.email) + ")" : "");
                        const corpsMail = c[0] + "\n\n" + c[1] + "\n\n\n" + c[2] + "\n\n\n" + c[3] + " " + qui;
                        window.hypeOuvrirLien("mailto:feinn@live.fr?subject=" + encodeURIComponent("Hype — " + tr({ fr: "Demander le retrait d'une photo", en: "Request a photo removal", es: "Pedir que se retire una foto", it: "Chiedi di rimuovere una foto", ja: "写真の削除を依頼", de: "Entfernung eines Fotos beantragen", ar: "طلب حذف صورة", zh: "申请删除照片", nl: "Verwijdering van een foto aanvragen", pt: "Pedir a remoção de uma foto", sv: "Begär borttagning av ett foto", ru: "Запросить удаление фото", pl: "Poproś o usunięcie zdjęcia", ko: "사진 삭제 요청" })) + "&body=" + encodeURIComponent(corpsMail));
                    } catch (e) { }
                },
                ico: [React.createElement("rect", { key: "a", x: "3.5", y: "5", width: "17", height: "14", rx: "2" }), React.createElement("circle", { key: "b", cx: "9", cy: "10", r: "1.6" }), React.createElement("path", { key: "c", d: "M20.5 15.5l-4.5-4.5-7.5 7.5" }), React.createElement("path", { key: "d", d: "M15 3l6 6M21 3l-6 6" })],
            }),
        ]),

        /* ---------- MODÉRATION ----------
           🟥 Le verrou du 15/08 est conservé : la ligne ne s'affiche qu'aux
           modératrices, et EcranAdmin refuse de se monter pour les autres. */
        estModAdmin ? React.createElement(React.Fragment, null,
            eyebrow(tr({ fr: "Modération", en: "Moderation", es: "Moderación", it: "Moderazione", ja: "モデレーション", de: "Moderation", ar: "\u0627\u0644\u0625\u0634\u0631\u0627\u0641", zh: "管理", nl: "Moderatie", pt: "Moderação", sv: "Moderering", ru: "Модерация", pl: "Moderacja", ko: "운영" })),
            grille("g-mod", [
                tuile({
                    cle: "bo", large: true,
                    titre: t("acces_admin"),
                    sous: tr({ fr: "Signalements et modération", en: "Reports and moderation", es: "Informes y moderación", it: "Segnalazioni e moderazione", ja: "通報と管理", de: "Meldungen und Moderation", ar: "\u0627\u0644\u0628\u0644\u0627\u063a\u0627\u062a \u0648\u0627\u0644\u0625\u0634\u0631\u0627\u0641", zh: "举报与管理", nl: "Meldingen en moderatie", pt: "Denúncias e moderação", sv: "Anmälningar och moderering", ru: "Жалобы и модерация", pl: "Zgłoszenia i moderacja", ko: "신고 및 운영" }),
                    onClick: () => setEcran("admin"),
                    ico: [React.createElement("path", { key: "a", d: "M12 3l7.5 3v5.5c0 4.4-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5.1-7.5-9.5V6z" }), React.createElement("path", { key: "b", d: "M9.4 12.2l1.9 1.9 3.6-3.8" })],
                }),
                /* 09/10 (765) : abonnes + historique des notifications d abonnement. La base refuse
                   la lecture a tout autre compte que feinn@live.fr (hype_admin_abonnements). */
                tuile({
                    cle: "abo",
                    titre: tr({ fr: "Abonnements", en: "Subscriptions", es: "Suscripciones", it: "Abbonamenti", ja: "サブスクリプション", de: "Abonnements", ar: "الاشتراكات", zh: "订阅", nl: "Abonnementen", pt: "Assinaturas", sv: "Prenumerationer", ru: "Подписки", pl: "Subskrypcje", ko: "구독" }),
                    sous: tr({ fr: "Abonnés et historique des notifications", en: "Subscribers and notification history", es: "Suscriptores e historial de notificaciones", it: "Abbonati e cronologia delle notifiche", ja: "加入者と通知履歴", de: "Abonnenten und Benachrichtigungsverlauf", ar: "المشتركون وسجل الإشعارات", zh: "订阅用户与通知记录", nl: "Abonnees en notificatiegeschiedenis", pt: "Assinantes e histórico de notificações", sv: "Prenumeranter och notishistorik", ru: "Подписчики и история уведомлений", pl: "Subskrybenci i historia powiadomień", ko: "구독자 및 알림 기록" }),
                    onClick: () => setEcran("abonnements-hype"),
                    ico: [React.createElement("rect", { key: "a", x: "3.5", y: "6", width: "17", height: "12", rx: "2" }), React.createElement("path", { key: "b", d: "M3.5 10h17" }), React.createElement("path", { key: "c", d: "M7 14.5h4" })],
                }),
            ])) : null,

        /* ---------- PIED ---------- */
        /* 04/10 (644) — LA VERSION EN LIGNE, LISIBLE ICI. Blandine : « je vois plus ou on trouve les versions en
           ligne ». La ligne « Quoi de neuf · reprise … · index 20261004-xxx » n existait que sur l ancien ecran
           Mon compte (accessible seulement via « Supprimer mon compte ») et sur l ancien accueil. Le meme lien
           (LienQuoiDeNeuf) est pose au pied de cette page, au-dessus de « Supprimer mon compte ». */
        React.createElement("div", { className: "pi-pied" }, React.createElement(LienQuoiDeNeuf, { compte: true })),
        /* 15/10/2026 : lien vers les CGV (7 langues) */
        React.createElement("div", { className: "pi-pied", style: { margin: "6px 20px 0", textAlign: "center" } },
            React.createElement("button", { onClick: () => { const u = window.location.origin + "/" + (["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"].indexOf(langue) !== -1 ? langue : "fr") + "/cgv/"; try { if (window.hypeOuvrirLien) window.hypeOuvrirLien(u); else window.open(u, "_blank"); } catch (e) { } }, style: { background: "none", border: 0, padding: 8, cursor: "pointer", fontSize: 11.5, color: GRIS_S, textDecoration: "underline", textUnderlineOffset: 3 } },
                tr({ fr: "Conditions générales de vente", en: "Terms of sale", es: "Condiciones generales de venta", it: "Condizioni generali di vendita", ja: "販売条件", de: "Allgemeine Verkaufsbedingungen", ar: "\u0627\u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0628\u064a\u0639", zh: "销售条款", nl: "Algemene verkoopvoorwaarden", pt: "Condições gerais de venda", sv: "Allmänna försäljningsvillkor", ru: "Общие условия продажи", pl: "Regulamin sprzedaży", ko: "판매 약관" }))),
        React.createElement("div", { className: "pi-pied", style: { margin: "10px 20px 0", textAlign: "center" } },
            React.createElement("button", { onClick: () => setEcran("moncompte"), style: { background: "none", border: 0, padding: 8, cursor: "pointer", fontSize: 11.5, color: GRIS_S, textDecoration: "underline", textUnderlineOffset: 3 } },
                tr({ fr: "Supprimer mon compte", en: "Delete my account", es: "Eliminar mi cuenta", it: "Elimina il mio account", ja: "アカウントを削除", de: "Mein Konto löschen", ar: "\u062d\u0630\u0641 \u062d\u0633\u0627\u0628\u064a", zh: "删除我的账户", nl: "Mijn account verwijderen", pt: "Excluir minha conta", sv: "Radera mitt konto", ru: "Удалить мой аккаунт", pl: "Usuń moje konto", ko: "계정 삭제" }))),

        /* ═══ CONSERVÉ, NEUTRALISÉ — retirer le `false &&` pour rallumer ═══ */
        false && React.createElement(MenuLigne, { icone: "\uD83D\uDDA8\uFE0F", texte: t("impr_bouton"), onClick: () => setImpression(true) }),
        false && React.createElement(MenuLigne, { icone: "\u2605", texte: t("gerer_abonnement"), onClick: () => setEcran("premium") }),
        false && React.createElement("button", { onClick: ouvrirDonVIP, style: { width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 13, padding: "15px 15px", borderRadius: 18, margin: "0 0 10px", background: `linear-gradient(135deg, ${COLORS.acier}26, ${COLORS.nuitElevee})`, border: `1px solid ${COLORS.acier}66` } },
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("p", { style: { margin: 0, fontSize: 16.5, fontWeight: 800, color: COLORS.blanc } }, t("don_vip_titre")),
                React.createElement("p", { style: { margin: "3px 0 0", fontSize: 12.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.35 } }, t("don_vip_sous")))),
        false && React.createElement("button", { onClick: () => { setProfil({ ...profil, vip: true }); try { localStorage.setItem("augalop_vip", "1"); } catch (e) { } setMerciVIP(true); }, style: { width: "100%", textAlign: "left", padding: "10px 4px 6px", color: COLORS.grisDoux, fontSize: 12.5 } }, t("don_vip_deja")),
        false && React.createElement(MenuLigne, { icone: "\uD83C\uDF93", texte: tr({ fr: "Professionnel ou enseignant", en: "Professional or instructor", es: "Profesional o profesor", it: "Professionista o istruttore", de: "Profi oder Ausbilder", ja: "プロ・指導者", ar: "\u0645\u0647\u0646\u064a \u0623\u0648 \u0645\u062f\u0631\u0628", zh: "专业人士或教练", nl: "Professional of instructeur", pt: "Profissional ou professor", sv: "Yrkesverksam eller lärare", ru: "Профессионал или преподаватель", pl: "Profesjonalista lub instruktor", ko: "전문가 또는 강사" }), sousTexte: tr({ fr: "Accès à l'offre Hype Pro sur vérification (club, SIRET...)", en: "Access to Hype Pro after verification (club, business ID...)", es: "Acceso a Hype Pro tras verificación (club, NIF...)", it: "Accesso a Hype Pro dopo verifica (club, P.IVA...)", de: "Zugang zu Hype Pro nach Prüfung (Verein, Gewerbe...)", ja: "確認後にHype Proへアクセス可能（クラブ・登録番号など）", ar: "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0639\u0631\u0636 Hype Pro \u0628\u0639\u062f \u0627\u0644\u062a\u062d\u0642\u0642 (\u0627\u0644\u0646\u0627\u062f\u064a\u060c SIRET...)", zh: "经审核（俱乐部、SIRET 等）可使用 Hype Pro 套餐", nl: "Toegang tot het Hype Pro-aanbod na verificatie (manege, SIRET...)", pt: "Acesso à oferta Hype Pro após verificação (clube, SIRET...)", sv: "Tillgång till Hype Pro efter verifiering (klubb, organisationsnummer...)", ru: "Доступ к предложению Hype Pro после проверки (клуб, SIRET...)", pl: "Dostęp do oferty Hype Pro po weryfikacji (klub, numer firmy...)", ko: "확인 후 Hype Pro 이용 가능(클럽, 사업자 번호 등)" }) }),
        false && React.createElement(LigneInfo, { label: t("club_label"), valeur: profil.club || t("non_renseigne") }),

        /* ---------- LES MODALES, inchangées ---------- */
        chevalVu && React.createElement(ModaleFicheCheval, { cheval: chevalVu, onClose: () => setChevalVu(null) }),
        limiteCheval && React.createElement("div", { onClick: () => setLimiteCheval(false), style: { position: "fixed", inset: 0, zIndex: 8500, background: "rgba(4,6,9,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } },
            React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 340, borderRadius: 22, border: "1px solid rgba(127,163,173,0.45)", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "26px 22px", textAlign: "center" } },
                React.createElement("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 17, fontWeight: 700, color: "#EDF2F5", letterSpacing: 0.8, marginBottom: 8 } }, tr({ fr: "Un cheval, puis Premium", en: "One horse, then Premium", es: "Un caballo, luego Premium", it: "Un cavallo, poi Premium", ja: "1頭目は無料", de: "Ein Pferd, dann Premium", ar: "\u062d\u0635\u0627\u0646\u060c \u062b\u0645 Premium", zh: "先养一匹马，再升级 Premium", nl: "Eerst een paard, dan Premium", pt: "Um cavalo, depois Premium", sv: "En häst, sedan Premium", ru: "Сначала лошадь, потом Premium", pl: "Jeden koń, potem Premium", ko: "말 한 마리, 그다음 Premium" })),
                React.createElement("button", { onClick: () => { setLimiteCheval(false); setEcran("premium"); }, style: { width: "100%", border: "none", borderRadius: 999, padding: "13px 0", fontSize: 14, fontWeight: 800, background: "linear-gradient(90deg,#7FA3AD,#CFE3E8)", color: "#04252A", cursor: "pointer" } }, tr({ fr: "Découvrir Premium", en: "Discover Premium", es: "Descubrir Premium", it: "Scopri Premium", ja: "Premiumを見る", de: "Premium entdecken", ar: "\u0627\u0643\u062a\u0634\u0627\u0641 Premium", zh: "了解 Premium", nl: "Ontdek Premium", pt: "Conheça o Premium", sv: "Upptäck Premium", ru: "Узнать о Premium", pl: "Poznaj Premium", ko: "Premium 알아보기" })),
                React.createElement("button", { onClick: () => setLimiteCheval(false), style: { marginTop: 12, background: "none", border: "none", color: "#5B646E", fontSize: 12.5, cursor: "pointer", textDecoration: "underline" } }, tr({ fr: "Plus tard", en: "Later", es: "Más tarde", it: "Più tardi", ja: "後で", de: "Später", ar: "\u0644\u0627\u062d\u0642\u0627", zh: "以后再说", nl: "Later", pt: "Mais tarde", sv: "Senare", ru: "Позже", pl: "Później", ko: "나중에" }))))));
}
window.HypeProfilInterne = { ProfilInterne: EcranProfilInterne };
})();
