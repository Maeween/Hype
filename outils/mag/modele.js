/* HYPE ▸ 31/10/2026 — Page « Le Mag / Culture équestre » (EcranArticles) — REFONTE d'après la maquette validée « MIX 2 + 3 »
   (pack HYPE_CULTURE_MAGAZINE : 01_DESKTOP_MIX_2_3.png + 03_MOBILE_ACCUEIL.png), reproduite au plus près avec le VRAI contenu.
   FICHIER GÉNÉRÉ par outils/mag/generer.py : textes déjà en ligne repris TELS QUELS de l'ancienne page (outils/mag/ancienne-page.js),
   nouveaux textes dans outils/mag/textes.json + textes2.json (14 langues).
   Contenu conservé (rien retiré) : tous les ARTICLES, les 4 grandes écoles (mêmes verrous Premium), La théorie des Galops + Galop 1 à 7,
   Lamotte-Beuvron en direct, Bien-être & Santé, Hey Baby, Bibliothèque vidéo, fil d'annonces, panneau des conseils Hey Baby.
   Pas d'auteur, de « j'aime », de commentaires ni de favoris : ces fonctions n'existent pas pour les articles (la maquette en montrait de faux).
   Classes CSS « mag- » (aucun effet sur les autres pages). */
(function () {
var NV = @@NV@@;
function EcranArticles() {
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, premium = app.premium, tr = app.tr, setGalopOuvert = app.setGalopOuvert;
    var lg = app.langue || "fr";
    var rtl = lg === "ar";
    function N(k) { return tr(NV[k]); }
    var lectureLabel = @@OLD:0@@;
    var nouveauLabel = @@OLD:1@@;
    var stMtP = React.useState(false); var mtPan = stMtP[0], setMtPan = stMtP[1];
    React.useEffect(function () { try { if (window.__rouvrirConseils === "articles") { window.__rouvrirConseils = null; setMtPan(true); } } catch (eRo) { } }, []);
    var stT = React.useState("une"); var tab = stT[0], setTab = stT[1];
    var stF = React.useState(0); var vedette = stF[0], setVedette = stF[1];
    var stQ = React.useState(""); var q = stQ[0], setQ = stQ[1];
    var stS = React.useState(false); var rechOuverte = stS[0], setRechOuverte = stS[1];
    var refs = { une: React.useRef(null), derniers: React.useRef(null), ecoles: React.useRef(null), loin: React.useRef(null), galops: React.useRef(null), sante: React.useRef(null) };
    function aller(cle) {
        var el = refs[cle] && refs[cle].current; if (!el) return;
        try {
            var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 16, behavior: reduit ? "auto" : "smooth" });
        } catch (eS) { try { el.scrollIntoView(); } catch (e2) { } }
    }
    var fleche = rtl ? "←" : "→";
    var chev = rtl ? "←" : "→";
    function titreDe(a) { return (typeof a.titre === "object") ? tr(a.titre) : a.titre; }
    function extraitDe(a) { return (typeof a.extrait === "object") ? tr(a.extrait) : (a.extrait || ""); }
    function ouvrirArticle(a) {
        if (a.ecran) { setEcran(a.ecran); return; }
        if (a.premium && !premium) { setEcran("premium"); return; }
        try { window.__articleOuvert = a.id; } catch (e) { }
        setEcran("article-detail");
    }
    function estTech(a) { return a.categorie === "Technique équestre"; }
    var aCso = null; for (var iU = 0; iU < ARTICLES.length; iU++) { if (ARTICLES[iU].ecran) { aCso = ARTICLES[iU]; break; } }
    var IMG_ART = { "article-cso": "images/article-cso-virage.webp" };
    function imgDe(a) { return IMG_ART[a.ecran] || a.tuile; }
    function catDe(a) { return estTech(a) ? N("rub_technique") : N("tab_competition"); }
    function WIKI(nom) { return "https://commons.wikimedia.org/wiki/Special:FilePath/" + nom + "?width=1100"; }
    var ECOLES = [
        { ecran: "cadre-noir", libre: true, img: WIKI("Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg"), pos: "center 40%", dr: "🇫🇷", sur: @@OLD:22@@, titre: @@OLD:23@@, sous: @@OLD:24@@ },
        { ecran: "ecole-portugaise", img: WIKI("Queluz%20Solo%20Picador%20%289181009668%29%20%28cropped%29.jpg"), pos: "center 26%", dr: "🇵🇹", sur: @@OLD:25@@, titre: @@OLD:26@@, sous: @@OLD:27@@ },
        { ecran: "ecole-vienne", img: WIKI("Spanische%20Hofreitschule%20Wien%20Vienna%20Winter%20riding%20manege%201.jpg"), pos: "center 34%", dr: "🇦🇹", sur: @@OLD:28@@, titre: @@OLD:29@@, sous: @@OLD:30@@ },
        { ecran: "ecole-jerez", img: WIKI("Jerez-Real%20Escuela%20Andaluza%20del%20Arte%20Equestre-Palacio%20Duque%20de%20Abrantes-20110914.jpg"), pos: "center 40%", dr: "🇪🇸", sur: @@OLD:31@@, titre: @@OLD:32@@, sous: @@OLD:33@@ }
    ];
    function ouvrirEcole(e) { if (!e.libre && !premium) { setEcran("premium"); return; } setEcran(e.ecran); }
    function horloge() { return h("svg", { width: 13, height: 13, viewBox: "0 0 16 16", "aria-hidden": "true" }, h("circle", { cx: 8, cy: 8, r: 6.5, fill: "none", stroke: "currentColor", strokeWidth: 1.3 }), h("path", { d: "M8 4.5V8l2.5 1.6", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" })); }
    function rond(etiquette) { return h("span", { className: "mag-rond", "aria-hidden": etiquette ? null : "true", "aria-label": etiquette || null }, chev); }
    function badgePremium(bloque) { return bloque ? h("span", { className: "mag-badge" }, "Premium") : null; }
    function enTete(titre, lien, action) {
        return h("div", { className: "mag-eh" },
            h("h2", null, titre), h("span", { className: "mag-eh-l", "aria-hidden": "true" }),
            lien ? h("button", { type: "button", className: "mag-voir", onClick: action }, lien, " ", h("span", { "aria-hidden": "true" }, fleche)) : null);
    }

    /* ---------- 1. Couverture + recherche (vraie : articles et grandes écoles) ---------- */
    var couverture = h("header", { className: "mag-hero" },
        h("img", { className: "mag-hero-img", src: "images/cheval-defaut-alezan.webp", alt: "", decoding: "async", fetchpriority: "high" }),
        h("div", { className: "mag-hero-voile", "aria-hidden": "true" }),
        h("button", { type: "button", className: "mag-loupe-m", "aria-label": N("rechercher"), "aria-expanded": rechOuverte ? "true" : "false", onClick: function () { setRechOuverte(!rechOuverte); } }, loupe()),
        h("div", { className: "mag-hero-tx" },
            h("span", { className: "mag-hero-bar", "aria-hidden": "true" }),
            h("h1", null, N("hero_titre")),
            h("p", null, N("hero_sous")),
            h("label", { className: "mag-rech" + (rechOuverte ? " ouverte" : "") },
                h("input", { type: "search", value: q, placeholder: N("rechercher"), "aria-label": N("rechercher"), onChange: function (e) { setQ(e.target.value); if (e.target.value) { setTimeout(function () { aller("derniers"); }, 60); } } }),
                loupe())),
        h("div", { className: "mag-vague", "aria-hidden": "true" }));
    function loupe() { return h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": "true" }, h("circle", { cx: 10.5, cy: 10.5, r: 6.5, fill: "none", stroke: "currentColor", strokeWidth: 1.6 }), h("path", { d: "M15.5 15.5L20 20", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" })); }

    /* ---------- 2. Onglets (vrais : filtrent les derniers articles ou mènent à la partie) ---------- */
    var TABS = [
        ["une", @@OLD:14@@, function () { setQ(""); aller("une"); }],
        ["technique", N("tab_technique"), function () { setQ(""); aller("derniers"); }],
        ["galops", N("rub_galops"), function () { setEcran("galops"); }],
        ["culture", N("tab_culture"), function () { aller("ecoles"); }],
        ["soins", N("tab_soins"), function () { aller("sante"); }],
        ["competition", N("tab_competition"), function () { setQ(""); aller("derniers"); }]
    ];
    var onglets = h("nav", { className: "mag-tabs", "aria-label": N("rubriques") },
        TABS.map(function (t) { return h("button", { key: t[0], type: "button", className: tab === t[0] ? "on" : "", "aria-current": tab === t[0] ? "true" : null, onClick: function () { setTab(t[0]); t[2](); } }, t[1]); }));

    /* ---------- 3. À la une (3 vrais contenus, flèche = suivant) ---------- */
    var UNE = [];
    if (aCso) UNE.push({ cat: N("rub_technique"), titre: dore(tr(@@ARTRAW:titre@@)), sous: extraitDe(aCso), img: "images/article-cso-virage.webp", pos: "60% 50%", duree: aCso.duree, bloque: aCso.premium && !premium, action: function () { ouvrirArticle(aCso); } });
    if (ARTICLES[0] && ARTICLES[0] !== aCso) UNE.push({ cat: N("tab_competition"), titre: titreDe(ARTICLES[0]), sous: extraitDe(ARTICLES[0]), img: ARTICLES[0].tuile, pos: "center 40%", duree: ARTICLES[0].duree, action: function () { ouvrirArticle(ARTICLES[0]); } });
    UNE.push({ cat: N("tab_culture"), titre: ECOLES[0].titre, sous: ECOLES[0].sous, img: ECOLES[0].img, pos: ECOLES[0].pos, action: function () { ouvrirEcole(ECOLES[0]); } });
    var v = UNE[vedette % UNE.length];
    function dore(txt) { return String(txt).split(/(\*[^*]+\*)/g).map(function (m, i) { return /^\*[^*]+\*$/.test(m) ? h("em", { key: i }, m.slice(1, -1)) : m; }); }
    function deux(n) { return (n < 10 ? "0" : "") + n; }
    var une = h("section", { ref: refs.une, className: "mag-une-s" },
        h("div", { className: "mag-une" },
            h("img", { key: "i" + vedette, className: "mag-une-img", src: v.img, alt: "", decoding: "async", style: { objectPosition: v.pos } }),
            h("div", { className: "mag-une-voile", "aria-hidden": "true" }),
            h("div", { className: "mag-une-tx" },
                h("div", { className: "mag-cat" }, h("span", { "aria-hidden": "true" }), v.cat),
                h("h2", null, v.titre),
                v.sous ? h("p", null, v.sous) : null,
                h("button", { type: "button", className: "mag-btn", onClick: v.action }, tr(@@LIRE@@), " ", h("span", { "aria-hidden": "true" }, fleche)),
                h("div", { className: "mag-une-meta" }, v.duree ? h("span", null, horloge(), " ", v.duree) : null, v.bloque ? h("span", { className: "mag-badge-in" }, "Premium") : null)),
            UNE.length > 1 ? h("div", { className: "mag-une-nav" },
                h("div", { className: "mag-compteur", "aria-live": "polite" }, h("b", null, deux((vedette % UNE.length) + 1)), h("i", { "aria-hidden": "true" }), deux(UNE.length)),
                h("button", { type: "button", className: "mag-rond mag-rond-g", "aria-label": N("suivant"), onClick: function () { setVedette((vedette + 1) % UNE.length); } }, chev)) : null),
        h("div", { className: "mag-vague mag-vague-b", "aria-hidden": "true" }));

    /* ---------- 4. À explorer selon tes envies ---------- */
    function theme(cls, img, pos, titre, sous, action) {
        return h("button", { type: "button", className: "mag-th " + cls, onClick: action },
            h("img", { src: img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: pos || "center" } }),
            h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
            h("span", { className: "mag-th-tx" }, h("b", null, titre), h("small", null, sous)),
            rond());
    }
    var explorer = h("section", { className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(N("explorer2"), N("voir_themes"), function () { aller("loin"); }),
        h("div", { className: "mag-themes" },
            theme("t1", "images/article-cso-appel.webp", "55% 40%", N("rub_technique"), N("d_technique"), function () { setTab("technique"); setQ(""); aller("derniers"); }),
            theme("t2", "images/galop5-c08-equilibre.webp", "60% 40%", N("rub_galops"), @@OLD:18@@, function () { setEcran("galops"); }),
            theme("t3", "images/cours-pansage-01_couverture_hero.webp", "60% 40%", N("tab_culture"), N("d_culture"), function () { setTab("culture"); aller("ecoles"); }),
            theme("t4", "images/cours-pansage-09_gestes_brossage.webp", "50% 50%", N("tab_soins"), N("d_soins"), function () { setEcran("sante"); }),
            theme("t5", "images/article-cso-saut.webp", "50% 40%", N("tab_competition"), N("d_competition"), function () { setTab("competition"); setQ(""); aller("derniers"); }))));

    /* ---------- 5. Derniers articles (filtrés par l'onglet ou la recherche) ---------- */
    function norm(s) { try { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch (e) { return String(s || "").toLowerCase(); } }
    var qn = norm(q.trim());
    var liste = ARTICLES.filter(function (a) { return tab === "technique" ? estTech(a) : tab === "competition" ? !estTech(a) : true; });
    var resultatsEcoles = [];
    if (qn) {
        liste = ARTICLES.filter(function (a) { return norm(titreDe(a) + " " + extraitDe(a)).indexOf(qn) >= 0; });
        resultatsEcoles = ECOLES.filter(function (e) { return norm(e.titre + " " + e.sous).indexOf(qn) >= 0; });
    }
    function carteArticle(a) {
        return h("button", { key: "a" + a.id, type: "button", className: "mag-ca", onClick: function () { ouvrirArticle(a); } },
            h("span", { className: "mag-ca-ph" }, imgDe(a) ? h("img", { src: imgDe(a), alt: "", loading: "lazy", decoding: "async" }) : null, a.nouveau ? h("span", { className: "mag-nouv" }, nouveauLabel) : null, badgePremium(a.premium && !premium)),
            h("span", { className: "mag-ca-tx" },
                h("small", { className: "mag-ca-cat" }, catDe(a)),
                h("b", null, titreDe(a)),
                h("span", { className: "mag-ca-bas" }, h("span", { className: "mag-ca-t" }, a.duree ? [horloge(), " ", a.duree] : null), rond())));
    }
    function carteEcole(e) {
        var bloque = !e.libre && !premium;
        return h("button", { key: e.ecran, type: "button", className: "mag-ca", onClick: function () { ouvrirEcole(e); } },
            h("span", { className: "mag-ca-ph" }, h("img", { src: e.img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: e.pos } }), badgePremium(bloque)),
            h("span", { className: "mag-ca-tx" },
                h("small", { className: "mag-ca-cat" }, e.dr + " " + e.sur),
                h("b", null, e.titre),
                h("span", { className: "mag-ca-bas" }, h("span", { className: "mag-ca-t mag-ca-s" }, e.sous), rond())));
    }
    var derniers = h("section", { ref: refs.derniers, className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(qn ? N("resultats") : N("derniers")),
        (liste.length + resultatsEcoles.length) ? h("div", { className: "mag-grille" }, liste.map(carteArticle), resultatsEcoles.map(carteEcole))
            : h("p", { className: "mag-vide" }, N("aucun"))));

    /* ---------- 6. Les grandes écoles (mêmes destinations et verrous Premium) ---------- */
    var ecoles = h("section", { ref: refs.ecoles, className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(@@OLD:21@@),
        h("p", { className: "mag-intro" }, N("ecoles_sous")),
        h("div", { className: "mag-grille" }, ECOLES.map(carteEcole))));

    /* ---------- 7. Pour aller plus loin : Galops, Lamotte en direct, Santé, Hey Baby, vidéos ---------- */
    var loin = h("section", { ref: refs.loin, className: "mag-s mag-loin" }, h("div", { className: "mag-w" },
        enTete(N("plus_loin")),
        /* 31/10 03h : bloc Galops retiré (Blandine, choix A) — l'onglet Galops ouvre directement l'écran Galops. */
        h("button", { type: "button", className: "mag-live", onClick: function () { setEcran("evenement"); } },
            h("span", { className: "mag-live-d" }, h("i", { "aria-hidden": "true" }), @@OLD:35@@),
            h("span", { className: "mag-live-t" }, h("b", null, "Lamotte-Beuvron"), @@OLD:36@@),
            rond()),
        h("div", { ref: refs.sante, className: "mag-duo" },
            h("button", { type: "button", className: "mag-th mag-duo-c", onClick: function () { setEcran("sante"); } },
                h("img", { src: "images/cours-pansage-09_gestes_brossage.webp", alt: "", loading: "lazy", decoding: "async" }),
                h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
                h("span", { className: "mag-th-tx" }, h("small", { className: "mag-cat-s" }, @@OLD:38@@), h("b", null, @@OLD:39@@), h("small", null, @@OLD:40@@)), rond()),
            h("button", { type: "button", className: "mag-th mag-duo-c", onClick: function () { setEcran("assistant"); } },
                h("img", { src: "images/cours-pansage-03_observer_approcher.webp", alt: "", loading: "lazy", decoding: "async", style: { objectPosition: "50% 40%" } }),
                h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
                h("span", { className: "mag-th-tx" }, h("b", null, @@OLD:41@@), h("small", null, @@OLD:42@@)), rond())),
        h("div", { className: "mag-vid" }, h(EncartBibliothequeVideo, { compact: true })),
        h("div", { className: "mag-fil" }, h(FilAnnoncesC, null))));

    return h("div", { className: "mag", dir: rtl ? "rtl" : "ltr", lang: lg },
        h("style", null, CSS),
        couverture, onglets, une, explorer, derniers, ecoles, loin,
        mtPan ? h(PanneauConseilsHB, { depuis: "articles", onFermer: function () { setMtPan(false); } }) : null);
}

var CSS = [
".mag{--bg:#070A08;--bg2:#0B1311;--pe:#101D22;--or:#C9A66B;--iv:#F3EEE4;--tx:#C9D2CC;--mu:#9FB0AC;--li:rgba(201,166,107,.22);--se:'Cormorant Garamond',Georgia,serif;--sa:'Montserrat',Arial,sans-serif;container-type:inline-size;background:var(--bg);color:var(--iv);font-family:var(--sa);min-height:100vh;overflow-x:clip;padding-bottom:30px}",
".mag *{box-sizing:border-box}:where(.mag) button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:start}",
".mag button:focus-visible,.mag input:focus-visible{outline:2px solid var(--or);outline-offset:3px}",
".mag h1,.mag h2,.mag h3{font-family:var(--se);font-weight:500;color:var(--iv);margin:0;overflow-wrap:break-word}",
".mag-w{max-width:1180px;margin:0 auto;padding:0 20px}",
".mag-rond{width:34px;height:34px;flex:0 0 auto;border-radius:50%;border:1px solid var(--or);color:var(--or);display:inline-flex;align-items:center;justify-content:center;font-size:15px;line-height:1;background:rgba(7,10,8,.35)}",
".mag-badge{position:absolute;top:10px;inset-inline-end:10px;padding:3px 9px;border-radius:999px;background:rgba(7,8,10,.75);border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-nouv{position:absolute;top:10px;inset-inline-start:10px;padding:3px 9px;border-radius:999px;background:rgba(7,10,8,.7);border:1px solid rgba(201,166,107,.45);color:var(--iv);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600}",
".mag-btn{display:inline-flex;align-items:center;gap:12px;margin-top:20px;padding:12px 22px;border:1px solid var(--or);border-radius:999px;color:var(--iv);font-size:13.5px;background:rgba(7,10,8,.35)}",
".mag-btn span{color:var(--or)}",
/* couverture */
".mag-hero{position:relative;min-height:470px;display:flex;align-items:flex-end;overflow:hidden}",
".mag-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:76% 40%}",
".mag-hero-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.15) 0%,rgba(7,10,8,.25) 40%,rgba(7,10,8,.92) 100%),linear-gradient(90deg,rgba(7,10,8,.55),rgba(7,10,8,0) 70%)}",
".mag[dir=rtl] .mag-hero-voile{background:linear-gradient(180deg,rgba(7,10,8,.15) 0%,rgba(7,10,8,.25) 40%,rgba(7,10,8,.92) 100%),linear-gradient(270deg,rgba(7,10,8,.55),rgba(7,10,8,0) 70%)}",
".mag-hero-tx{position:relative;z-index:2;padding:0 22px 58px;max-width:640px}",
".mag-hero-bar{display:block;width:34px;height:2px;background:var(--or);margin-bottom:18px}",
".mag-hero h1{font-size:clamp(46px,13.5vw,58px);line-height:.98;letter-spacing:-.01em}",
".mag-hero p{font-size:15px;line-height:1.55;color:#e8ebe6;margin:16px 0 0;max-width:30ch}",
".mag-loupe-m{position:absolute;top:14px;inset-inline-end:14px;z-index:3;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--iv);background:rgba(7,10,8,.4)}",
".mag-rech{display:none;align-items:center;gap:10px;margin-top:22px;max-width:360px;padding:0 16px;height:48px;border:1px solid var(--or);border-radius:10px;background:rgba(7,10,8,.55);color:var(--iv)}",
".mag-rech.ouverte{display:flex}",
".mag-rech input{flex:1;min-width:0;background:none;border:0;color:var(--iv);font:inherit;font-size:14px;outline:none}",
".mag-rech input::placeholder{color:#c9cfca}",
".mag-vague{position:absolute;left:0;right:0;bottom:-1px;height:34px;background:var(--bg2);z-index:2;clip-path:polygon(0 70%,12% 52%,26% 46%,42% 58%,58% 74%,74% 66%,88% 40%,100% 34%,100% 100%,0 100%)}",
/* onglets */
".mag-tabs{display:flex;gap:26px;overflow-x:auto;padding:6px 22px 0;background:var(--bg2);scrollbar-width:none;border-bottom:1px solid #1d2a27;scroll-snap-type:x proximity;scroll-padding-inline:22px}",
".mag-tabs::-webkit-scrollbar{display:none}",
".mag-tabs button{flex:0 0 auto;scroll-snap-align:start;padding:12px 0 14px;font-size:14px;color:#dde3de;white-space:nowrap;border-bottom:2px solid transparent;min-height:44px}",
".mag-tabs button.on{color:var(--or);border-bottom-color:var(--or)}",
/* à la une */
".mag-une-s{position:relative;padding:28px 20px 0;background:var(--bg2)}",
".mag-une{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--li);min-height:330px;display:flex;align-items:center;max-width:1180px;margin:0 auto}",
".mag-une-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
".mag-une-voile{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.7) 45%,rgba(7,10,8,.1) 80%)}",
".mag[dir=rtl] .mag-une-voile{background:linear-gradient(270deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.7) 45%,rgba(7,10,8,.1) 80%)}",
".mag-une-tx{position:relative;z-index:2;padding:26px 20px 30px;width:72%}",
".mag-cat{display:flex;align-items:center;gap:10px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--or);font-weight:600}",
".mag-cat span{width:2px;height:14px;background:var(--or)}",
".mag-une-tx h2{font-size:clamp(27px,7.6vw,32px);line-height:1.08;margin:12px 0 0}",
".mag-une-tx p{font-size:13.5px;line-height:1.55;color:#e1e6df;margin:10px 0 0}",
".mag-une-meta{display:flex;align-items:center;gap:14px;margin-top:16px;font-size:12px;color:#d6dcd6}",
".mag-une-meta span{display:inline-flex;align-items:center;gap:6px}",
".mag-badge-in{padding:3px 9px;border-radius:999px;border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-une-nav{position:absolute;z-index:3;inset-inline-end:14px;bottom:14px;display:flex;align-items:center;gap:10px;padding:8px;border-radius:999px;background:rgba(7,10,8,.62)}",
".mag-une-tx h2 em{color:var(--or);font-style:italic}",
".mag-compteur{display:none;flex-direction:column;align-items:center;font-family:var(--se);font-size:15px;color:#cdd3ce;line-height:1.2}",
".mag-compteur b{color:var(--or);font-weight:500}.mag-compteur i{width:16px;height:1px;background:var(--or);margin:3px 0}",
".mag-rond-g{width:44px;height:44px;font-size:18px}",
".mag-vague-b{position:relative;bottom:auto;height:30px;margin-top:22px;background:var(--bg);clip-path:polygon(0 60%,14% 40%,30% 38%,46% 56%,62% 72%,78% 60%,92% 36%,100% 30%,100% 100%,0 100%)}",
/* sections */
".mag-s{padding-top:72px}",
".mag-eh{display:flex;align-items:center;flex-wrap:wrap;gap:8px 16px;margin-bottom:22px}",
".mag-eh h2{font-size:clamp(26px,7vw,30px);flex:0 1 auto}",
".mag-eh-l{flex:1 1 auto;height:1px;background:linear-gradient(90deg,var(--or),rgba(201,166,107,0));min-width:24px;max-width:200px}",
".mag[dir=rtl] .mag-eh-l{background:linear-gradient(270deg,var(--or),rgba(201,166,107,0))}",
".mag-voir{margin-inline-start:auto;flex:0 0 auto;font-size:12.5px;color:var(--or);white-space:nowrap}",
".mag-intro{color:var(--tx);font-size:14px;line-height:1.7;margin:-8px 0 22px;max-width:60ch}",
/* thèmes : grande verticale + deux horizontales, puis deux */
".mag-themes{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:110px;gap:12px}",
".mag-th{position:relative;display:block;width:100%;height:100%;border-radius:14px;overflow:hidden;border:1px solid var(--li);min-height:110px}",
".mag-th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
".mag-th-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 30%,rgba(7,10,8,.9) 100%)}",
".mag-th-tx{position:absolute;left:14px;right:56px;bottom:14px;display:flex;flex-direction:column;gap:4px}",
".mag[dir=rtl] .mag-th-tx{left:56px;right:14px}",
".mag-th-tx b{font-family:var(--se);font-weight:500;font-size:21px;line-height:1.1;color:var(--iv)}",
".mag-th-tx small{font-size:11.5px;line-height:1.4;color:#d4dad5;display:none}",
".mag-th>.mag-rond{position:absolute;bottom:12px;inset-inline-end:12px}",
".mag-th.t1{grid-row:span 2}.mag-th.t1 .mag-th-tx b{font-size:24px}",
".mag-th.t4,.mag-th.t5{grid-row:span 1}",
/* derniers articles : liste au téléphone */
".mag-grille{display:grid;gap:14px}",
".mag-ca{display:flex;gap:14px;align-items:center;width:100%;padding:10px;border-radius:14px;border:1px solid var(--li);background:#0B1311}",
".mag-ca-ph{position:relative;flex:0 0 112px;height:84px;border-radius:10px;overflow:hidden;background:#122326}",
".mag-ca-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-ca-ph .mag-nouv,.mag-ca-ph .mag-badge{display:none}",
".mag-ca-tx{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:5px}",
".mag-ca-cat{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--or);font-weight:600}",
".mag-ca-tx b{font-family:var(--se);font-weight:500;font-size:19px;line-height:1.15;color:var(--iv)}",
".mag-ca-bas{display:flex;align-items:center;justify-content:space-between;gap:10px}",
".mag-ca-t{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:#cfd5d0;min-width:0}",
".mag-ca-s{display:block;font-size:11.5px;line-height:1.45;color:var(--mu)}",
".mag-ca .mag-rond{width:30px;height:30px;font-size:13px}",
".mag-vide{color:var(--mu);font-size:14px}",
/* plus loin */
".mag-bloc{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--li);min-height:360px;display:flex;align-items:flex-end}",
".mag-bloc>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 35%}",
".mag-bloc .mag-th-voile{background:linear-gradient(180deg,rgba(7,10,8,.1) 0%,rgba(7,10,8,.92) 70%)}",
".mag-bloc-tx{position:relative;z-index:2;padding:22px 20px 24px}",
".mag-bloc-tx h3{font-size:30px;margin-top:10px}.mag-bloc-tx p{font-size:13.5px;line-height:1.55;color:#dde2dd;margin:8px 0 0}",
".mag-gal{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}",
".mag-gal button{min-height:38px;padding:0 14px;border-radius:999px;border:1px solid rgba(243,238,228,.28);font-size:12.5px;color:var(--iv);background:rgba(7,10,8,.45)}",
".mag-live{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:'d r' 't r';align-items:center;gap:8px 16px;text-align:start;width:100%;margin-top:0;padding:16px;border-radius:14px;border:1px solid var(--li);background:#0B1311}",
".mag-live-d{grid-area:d;justify-self:start;display:inline-flex;align-items:center;gap:8px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#E8A08C;font-weight:600}",
".mag-live-d i{width:7px;height:7px;border-radius:50%;background:#E8A08C;display:inline-block}",
".mag-live-t{grid-area:t;min-width:0;font-size:12.5px;line-height:1.5;color:var(--mu)}",
".mag-live>:last-child{grid-area:r}",
".mag-live-t b{display:block;margin-bottom:2px;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv)}",
".mag-duo{display:grid;grid-template-columns:1fr;gap:14px;margin-top:18px}",
".mag-duo-c{min-height:190px}.mag-duo-c .mag-th-tx small{display:block}",
".mag-cat-s{font-size:9.5px !important;letter-spacing:.18em;text-transform:uppercase;color:var(--or) !important;font-weight:600}",
".mag-vid{margin-top:18px}.mag-fil{margin:26px -20px 0}",
/* tablette */
"@container (min-width:640px){.mag-w{padding:0 36px}.mag-tabs{padding:6px 36px 0;gap:34px}.mag-une-s{padding:30px 36px 0}.mag-hero-tx{padding:0 36px 70px}.mag-hero{min-height:500px}.mag-loupe-m{display:none}.mag-rech{display:flex}",
".mag-une{min-height:400px}.mag-une-tx{width:58%;padding:36px 36px 40px}.mag-compteur{display:flex}.mag-une-nav{flex-direction:column;gap:18px;bottom:24px;inset-inline-end:24px}",
".mag-themes{grid-template-columns:repeat(6,1fr);grid-auto-rows:150px;gap:14px}.mag-th.t1{grid-column:span 2;grid-row:span 2}.mag-th.t2,.mag-th.t3{grid-column:span 4}.mag-th.t4,.mag-th.t5{grid-column:span 3}.mag-th-tx small{display:block}",
".mag-grille{grid-template-columns:repeat(2,1fr);gap:18px}.mag-ca{flex-direction:column;align-items:stretch;padding:0;overflow:hidden}.mag-ca-ph{flex:none;width:100%;height:auto;aspect-ratio:4/3;border-radius:0}.mag-ca-ph .mag-nouv,.mag-ca-ph .mag-badge{display:inline-block}.mag-ca-tx{padding:14px 16px 16px;flex:1 1 auto;gap:8px}.mag-ca-tx b{font-size:21px}.mag-ca-bas{margin-top:auto;padding-top:6px}",
".mag-duo{grid-template-columns:1fr 1fr}.mag-bloc{min-height:380px}.mag-bloc-tx{max-width:560px;padding:30px 32px 32px}}",
/* ordinateur : maquette MIX 2+3 */
"@container (min-width:1000px){.mag-w{padding:0 48px}.mag-hero{min-height:520px;align-items:center}.mag-hero-voile{background:linear-gradient(90deg,rgba(7,10,8,.88) 0%,rgba(7,10,8,.55) 38%,rgba(7,10,8,0) 66%),linear-gradient(0deg,rgba(7,10,8,.6),rgba(7,10,8,0) 30%)}",
".mag[dir=rtl] .mag-hero-voile{background:linear-gradient(270deg,rgba(7,10,8,.88) 0%,rgba(7,10,8,.55) 38%,rgba(7,10,8,0) 66%),linear-gradient(0deg,rgba(7,10,8,.6),rgba(7,10,8,0) 30%)}",
".mag-hero-tx{padding:70px 64px 90px}.mag-hero-bar{display:none}.mag-hero h1{font-size:76px}.mag-hero p{font-size:21px;font-family:var(--se);max-width:24ch;line-height:1.35}.mag-rech{margin-top:30px}",
".mag-tabs{justify-content:space-between;padding:8px 64px 0;gap:30px}.mag-tabs button{font-size:16px;font-family:var(--se)}",
".mag-une-s{padding:0}.mag-une{border-radius:0;border:0;min-height:460px;max-width:none}.mag-une-tx{width:46%;padding:60px 64px 64px}.mag-une-tx h2{font-size:48px}.mag-une-tx p{font-size:19px;font-family:var(--se);line-height:1.4}.mag-une-nav{inset-inline-end:40px;bottom:40px}.mag-vague-b{margin-top:-30px;z-index:3}",
".mag-s{padding-top:110px}.mag-eh h2{font-size:38px}.mag-eh{margin-bottom:30px}",
".mag-themes{grid-template-columns:repeat(5,1fr);grid-auto-rows:auto}.mag-th.t1,.mag-th.t2,.mag-th.t3,.mag-th.t4,.mag-th.t5{grid-column:auto;grid-row:auto;aspect-ratio:3/5;height:auto}.mag-th.t2,.mag-th.t4{margin-top:0}.mag-th-tx b{font-size:24px !important}.mag-th-tx{bottom:62px;right:16px;left:16px}.mag[dir=rtl] .mag-th-tx{left:16px;right:16px}.mag-th>.mag-rond{bottom:16px}",
".mag-grille{grid-template-columns:repeat(4,1fr);gap:22px}",
".mag-bloc{min-height:440px;align-items:center}.mag-bloc .mag-th-voile{background:linear-gradient(90deg,rgba(7,10,8,.9) 0%,rgba(7,10,8,.6) 40%,rgba(7,10,8,0) 70%)}.mag-bloc-tx{padding:48px 56px}.mag-bloc-tx h3{font-size:40px}",
".mag-duo-c{min-height:260px}}",
/* 31/10 03h — Blandine : « pas d'écriture sur les photos ». Les textes passent sous (ou à côté de) chaque photo, plus aucun voile. */
".mag-hero{display:block;min-height:0}.mag-hero-img{position:relative;inset:auto;display:block;width:100%;height:clamp(230px,64vw,380px);-webkit-mask-image:linear-gradient(180deg,#000 72%,transparent);mask-image:linear-gradient(180deg,#000 72%,transparent)}",
".mag-hero-voile,.mag-une-voile,.mag-th-voile{display:none}",
".mag-hero-tx{padding:8px 22px 56px;max-width:none}",
".mag-une{display:block;min-height:0;background:#0B1311}.mag-une-img{position:relative;inset:auto;display:block;width:100%;height:auto;aspect-ratio:16/10}",
".mag-une-tx{width:auto;padding:20px 20px 84px}",
".mag-themes{grid-auto-rows:auto}",
".mag-th{display:flex;flex-direction:column;height:auto;min-height:0;background:#0B1311;text-align:start}",
".mag-th img{position:relative;inset:auto;display:block;width:100%;height:104px;flex:0 0 auto}",
".mag-th-tx{position:static;padding:12px 52px 14px 14px}.mag[dir=rtl] .mag-th-tx{padding:12px 14px 14px 52px}",
".mag-th.t1,.mag-th.t2,.mag-th.t3,.mag-th.t4,.mag-th.t5{grid-row:auto}.mag-th.t1{grid-column:span 2}.mag-th.t1 img{height:170px}",
".mag-th>.mag-rond{bottom:12px}.mag-th:not(.t1) .mag-th-tx b{font-size:19px}",
".mag-duo-c{min-height:0}.mag-duo-c img{height:170px}",
".mag-ca-ph .mag-nouv,.mag-ca-ph .mag-badge{display:none !important}",
".mag-vid>button>div:first-child{position:relative !important;inset:auto !important;height:150px;background-position:center 30% !important}.mag-vid>button>div:nth-child(2){display:none !important}.mag-vid>button>div:nth-child(3)>div{max-width:none !important}",
"@container (min-width:640px){.mag-hero-tx{padding:10px 36px 70px}",
".mag-une{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}.mag-une-img{grid-column:2;grid-row:1;height:100%;min-height:400px;aspect-ratio:auto}.mag-une-tx{grid-column:1;grid-row:1;width:auto;padding:36px 36px 96px}",
".mag-une-nav{inset-inline-end:calc(50% + 24px)}",
".mag-themes{grid-template-columns:repeat(6,1fr)}.mag-th.t1,.mag-th.t2,.mag-th.t3{grid-column:span 2}.mag-th.t4,.mag-th.t5{grid-column:span 3}.mag-th img,.mag-th.t1 img{height:150px}.mag-duo-c img{height:190px}}",
"@container (min-width:1000px){.mag-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);align-items:center}.mag-hero-img{grid-column:2;grid-row:1;height:540px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 28%);mask-image:linear-gradient(90deg,transparent,#000 28%)}.mag[dir=rtl] .mag-hero-img{-webkit-mask-image:linear-gradient(270deg,transparent,#000 28%);mask-image:linear-gradient(270deg,transparent,#000 28%)}.mag-hero-tx{grid-column:1;grid-row:1;padding:60px 24px 90px 64px}.mag[dir=rtl] .mag-hero-tx{padding:60px 64px 90px 24px}",
".mag-une-img{min-height:460px}.mag-une-tx{padding:60px 64px 110px}.mag-une-nav{inset-inline-end:calc(50% + 40px)}",
".mag-themes{grid-template-columns:repeat(5,1fr)}.mag-th.t1,.mag-th.t2,.mag-th.t3,.mag-th.t4,.mag-th.t5{grid-column:auto;aspect-ratio:auto}.mag-th img,.mag-th.t1 img{height:auto;aspect-ratio:4/5}.mag-th-tx{position:static}.mag-th>.mag-rond{bottom:14px}.mag-duo-c img{height:240px}}"
].join("");

window.HypeArticles = { Articles: EcranArticles };
})();
