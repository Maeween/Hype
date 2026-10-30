/* HYPE ▸ 31/10/2026 — Page « Le Mag / Culture équestre » (EcranArticles) — REFONTE magazine (pack « HYPE_CULTURE_MAGAZINE », mélange 2 + 3).
   FICHIER GÉNÉRÉ par outils/mag/generer.py (modèle outils/mag/modele.js) : les textes déjà en ligne sont repris TELS QUELS de
   l'ancienne page (outils/mag/ancienne-page.js), les nouveaux textes viennent de outils/mag/textes.json (14 langues).
   Contenu conservé (rien retiré) : tous les ARTICLES (dont « À la une » = premier article qui a sa propre page), les 4 grandes écoles
   (mêmes verrous Premium), La théorie des Galops (page Galops + accès direct Galop 1 à 7), Lamotte-Beuvron en direct, Bien-être & Santé,
   Hey Baby, la Bibliothèque vidéo (EncartBibliothequeVideo), le fil d'annonces (FilAnnoncesC), le panneau des conseils Hey Baby
   (retour depuis un conseil). Nouveauté : rubrique « Technique équestre » = articles de catégorie « Technique équestre ».
   Rubriques en haut = vrais liens vers chaque partie de la page. Classes CSS « mag- » (aucun effet sur les autres pages). */
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
    var stR = React.useState("une"); var rubrique = stR[0], setRubrique = stR[1];
    var refs = { une: React.useRef(null), technique: React.useRef(null), actus: React.useRef(null), ecoles: React.useRef(null), galops: React.useRef(null), sante: React.useRef(null) };
    function aller(cle) {
        setRubrique(cle);
        var el = refs[cle] && refs[cle].current;
        if (!el) return;
        try {
            var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var y = el.getBoundingClientRect().top + window.pageYOffset - 24;
            window.scrollTo({ top: y, behavior: reduit ? "auto" : "smooth" });
        } catch (eS) { try { el.scrollIntoView(); } catch (e2) { } }
    }
    var fleche = rtl ? "←" : "→";
    var chev = rtl ? "‹" : "›";

    function titreDe(a) { return (typeof a.titre === "object") ? tr(a.titre) : a.titre; }
    function extraitDe(a) { return (typeof a.extrait === "object") ? tr(a.extrait) : (a.extrait || ""); }
    function ouvrirArticle(a) {
        if (a.ecran) { setEcran(a.ecran); return; }
        if (a.premium && !premium) { setEcran("premium"); return; }
        try { window.__articleOuvert = a.id; } catch (e) { }
        setEcran("article-detail");
    }
    var aLaUne = null; for (var iU = 0; iU < ARTICLES.length; iU++) { if (ARTICLES[iU].ecran) { aLaUne = ARTICLES[iU]; break; } }
    var techniques = ARTICLES.filter(function (a) { return a.categorie === "Technique équestre"; });
    var actus = ARTICLES.filter(function (a) { return a.categorie !== "Technique équestre"; });
    var IMG_UNE = { "article-cso": "images/article-cso-virage.webp" };
    var IMG_TECH = { "article-cso": "images/article-cso-appel.webp" };

    function badgePremium(a) { return (a.premium && !premium) ? h("span", { className: "mag-badge" }, "Premium") : null; }
    function surtitre(txt) { return h("div", { className: "mag-sur" }, txt); }
    function section(cle, numero, titre, enfants, cls) {
        return h("section", { ref: cle ? refs[cle] : null, className: "mag-s " + (cls || ""), "data-rubrique": cle || null },
            h("div", { className: "mag-w" },
                h("header", { className: "mag-sh" },
                    numero ? h("span", { className: "mag-num" }, numero) : null,
                    numero ? h("span", { className: "mag-sep" }) : null,
                    h("h2", null, titre)),
                enfants));
    }

    /* ---------- 1. Couverture ---------- */
    var couverture = h("header", { className: "mag-cov" },
        h("div", { className: "mag-cov-ph" }, h("img", { src: "images/cheval-defaut-alezan.webp", alt: "", decoding: "async", fetchpriority: "high" })),
        h("div", { className: "mag-cov-tx" },
            surtitre(@@OLD:11@@),
            h("h1", null, @@OLD:12@@),
            h("span", { className: "mag-bar" }),
            h("p", null, @@OLD:13@@)));

    /* ---------- 2. Rubriques (vrais liens vers les parties de la page) ---------- */
    var listeRub = [["une", @@OLD:14@@], ["technique", N("rub_technique")], ["actus", @@OLD:20@@], ["ecoles", @@OLD:21@@], ["galops", N("rub_galops")], ["sante", @@OLD:37@@]];
    var rubriques = h("nav", { className: "mag-rub", "aria-label": N("rubriques") },
        listeRub.map(function (r) {
            return h("button", { key: r[0], type: "button", className: "mag-chip" + (rubrique === r[0] ? " on" : ""), "aria-current": rubrique === r[0] ? "true" : null, onClick: function () { aller(r[0]); } }, r[1]);
        }));

    /* ---------- 3. À la une ---------- */
    var une = aLaUne ? h("section", { ref: refs.une, className: "mag-s mag-une-s", "data-rubrique": "une" },
        h("div", { className: "mag-w" },
            h("button", { type: "button", className: "mag-une", "data-a-la-une": "1", onClick: function () { ouvrirArticle(aLaUne); } },
                h("div", { className: "mag-une-ph" }, h("img", { src: IMG_UNE[aLaUne.ecran] || aLaUne.tuile, alt: "", loading: "lazy", decoding: "async" }), badgePremium(aLaUne)),
                h("div", { className: "mag-une-tx" },
                    surtitre(@@OLD:14@@ + " · " + tr(@@ART:rubrique@@)),
                    h("h3", null, titreDe(aLaUne)),
                    h("p", null, extraitDe(aLaUne)),
                    h("div", { className: "mag-cta" }, h("span", null, tr(@@LIRE@@)), h("span", { "aria-hidden": "true" }, fleche)),
                    h("div", { className: "mag-meta" }, N("rub_technique") + (aLaUne.duree ? " · " + aLaUne.duree + " " + lectureLabel : "")))))) : null;

    /* ---------- 4. Technique équestre (nouvelle rubrique) ---------- */
    var technique = section("technique", "01", N("rub_technique"), [
        h("p", { key: "i", className: "mag-intro" }, N("tech_intro")),
        h("div", { key: "l", className: "mag-tech" }, techniques.map(function (a) {
            return h("button", { key: a.id, type: "button", className: "mag-tech-a", onClick: function () { ouvrirArticle(a); } },
                h("div", { className: "mag-tech-ph" }, h("img", { src: IMG_TECH[a.ecran] || a.tuile, alt: "", loading: "lazy", decoding: "async" }), badgePremium(a)),
                h("div", { className: "mag-tech-tx" },
                    surtitre(tr(@@ART:rubrique@@)),
                    h("h3", null, titreDe(a)),
                    h("div", { className: "mag-meta" }, (a.duree ? a.duree + " " + lectureLabel : "")),
                    h("div", { className: "mag-cta mag-cta-l" }, h("span", null, tr(@@LIRE@@)), h("span", { "aria-hidden": "true" }, fleche))));
        })),
        h("button", { key: "hb", type: "button", className: "mag-hb", onClick: function () { setEcran("assistant"); } },
            h("span", null, h("b", null, N("tech_hb_titre")), N("tech_hb_texte")),
            h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))
    ], "mag-pe");

    /* ---------- 5. Explorer par univers (mosaïque asymétrique) ---------- */
    function tuile(cls, img, sur, titre, sous, action, extra) {
        return h("button", { type: "button", className: "mag-t " + cls, onClick: action },
            h("div", { className: "mag-t-ph" }, img ? h("img", { src: img, alt: "", loading: "lazy", decoding: "async" }) : null, extra || null),
            h("div", { className: "mag-t-tx" },
                sur ? surtitre(sur) : null,
                h("h3", null, titre),
                sous ? h("p", null, sous) : null,
                h("span", { className: "mag-rond", "aria-hidden": "true" }, chev)));
    }
    var IMG_CN = "https://commons.wikimedia.org/wiki/Special:FilePath/Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg?width=900";
    var explorer = h("section", { ref: refs.galops, className: "mag-s", "data-rubrique": "galops" },
        h("div", { className: "mag-w" },
            h("header", { className: "mag-sh" }, h("span", { className: "mag-num" }, "02"), h("span", { className: "mag-sep" }), h("h2", null, N("explorer"))),
            h("div", { className: "mag-mos" },
                tuile("mag-t-galops", "images/galop5-c08-equilibre.webp", null, @@OLD:16@@, @@OLD:18@@, function () { setEcran("galops"); }),
                tuile("mag-t-ecoles", IMG_CN, null, @@OLD:21@@, N("ecoles_sous"), function () { aller("ecoles"); }),
                tuile("mag-t-sante", "images/cours-pansage-01_couverture_hero.webp", @@OLD:38@@, @@OLD:39@@, @@OLD:40@@, function () { setEcran("sante"); }),
                tuile("mag-t-hb", (typeof IMG_HEYBABY_AVATAR !== "undefined") ? IMG_HEYBABY_AVATAR : "", null, @@OLD:41@@, @@OLD:42@@, function () { setEcran("assistant"); })),
            h("div", { className: "mag-gal" },
                h("div", { className: "mag-sur" }, N("galops_ouvrir")),
                h("div", { className: "mag-gal-l" }, [1, 2, 3, 4, 5, 6, 7].map(function (g) {
                    return h("button", { key: g, type: "button", className: "mag-chip", onClick: function () { setGalopOuvert(g); setEcran("galop-detail"); } }, @@GALOP@@);
                })))));

    /* ---------- 6. Respiration : citation du coach (texte de l'article publié) ---------- */
    var respiration = aLaUne && aLaUne.ecran === "article-cso" ? h("section", { className: "mag-s mag-cit-s" },
        h("div", { className: "mag-wave", "aria-hidden": "true" }),
        h("div", { className: "mag-w mag-cit" },
            h("div", { className: "mag-cit-ph" }, h("img", { src: "images/article-cso-hero.webp", alt: "", loading: "lazy", decoding: "async" })),
            h("figure", { className: "mag-cit-tx" },
                h("span", { className: "mag-qm", "aria-hidden": "true" }, rtl ? "”" : "“"),
                h("blockquote", null, tr(@@ART:s4_citation@@)),
                h("figcaption", null, tr(@@ART:coach_sig@@)),
                h("button", { type: "button", className: "mag-cta", onClick: function () { ouvrirArticle(aLaUne); } }, h("span", null, tr(@@LIRE@@)), h("span", { "aria-hidden": "true" }, fleche))))) : null;

    /* ---------- 7. Articles (actualités) + Lamotte en direct ---------- */
    var articles = section("actus", "03", @@OLD:20@@, [
        h("div", { key: "fil", className: "mag-fil" }, h(FilAnnoncesC, null)),
        h("div", { key: "l", className: "mag-art" }, actus.map(function (a, i) {
            return h("button", { key: a.id, type: "button", className: "mag-a mag-a" + i, onClick: function () { ouvrirArticle(a); } },
                h("div", { className: "mag-a-ph" },
                    a.tuile ? h("img", { src: a.tuile, alt: "", loading: "lazy", decoding: "async" }) : null,
                    a.nouveau ? h("span", { className: "mag-nouv" }, nouveauLabel) : null, badgePremium(a)),
                h("div", { className: "mag-a-tx" },
                    h("h3", null, titreDe(a)),
                    i === 0 ? h("p", null, extraitDe(a)) : null,
                    h("div", { className: "mag-meta" }, (a.duree ? a.duree + " " + lectureLabel : ""))));
        })),
        h("button", { key: "lam", type: "button", className: "mag-live", onClick: function () { setEcran("evenement"); } },
            h("span", { className: "mag-live-d" }, h("i", { "aria-hidden": "true" }), @@OLD:35@@),
            h("span", { className: "mag-live-t" }, h("b", null, "Lamotte-Beuvron"), @@OLD:36@@),
            h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))
    ], "mag-pe");

    /* ---------- 8. Les grandes écoles (mêmes destinations et verrous Premium qu'avant) ---------- */
    function WIKI(nom) { return "https://commons.wikimedia.org/wiki/Special:FilePath/" + nom + "?width=1100"; }
    var ECOLES = [
        { cls: "mag-e0", ecran: "cadre-noir", libre: true, img: WIKI("Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg"), pos: "center 40%", dr: "🇫🇷", sur: @@OLD:22@@, titre: @@OLD:23@@, sous: @@OLD:24@@ },
        { cls: "mag-e1", ecran: "ecole-portugaise", img: WIKI("Queluz%20Solo%20Picador%20%289181009668%29%20%28cropped%29.jpg"), pos: "center 26%", dr: "🇵🇹", sur: @@OLD:25@@, titre: @@OLD:26@@, sous: @@OLD:27@@ },
        { cls: "mag-e2", ecran: "ecole-vienne", img: WIKI("Spanische%20Hofreitschule%20Wien%20Vienna%20Winter%20riding%20manege%201.jpg"), pos: "center 34%", dr: "🇦🇹", sur: @@OLD:28@@, titre: @@OLD:29@@, sous: @@OLD:30@@ },
        { cls: "mag-e3", ecran: "ecole-jerez", img: WIKI("Jerez-Real%20Escuela%20Andaluza%20del%20Arte%20Equestre-Palacio%20Duque%20de%20Abrantes-20110914.jpg"), pos: "center 40%", dr: "🇪🇸", sur: @@OLD:31@@, titre: @@OLD:32@@, sous: @@OLD:33@@ }
    ];
    var ecoles = section("ecoles", "04", @@OLD:21@@, [
        h("p", { key: "i", className: "mag-intro" }, N("ecoles_sous")),
        h("div", { key: "g", className: "mag-eco" }, ECOLES.map(function (e) {
            var bloque = !e.libre && !premium;
            return h("button", { key: e.ecran, type: "button", className: "mag-e " + e.cls, onClick: function () { if (bloque) { setEcran("premium"); return; } setEcran(e.ecran); } },
                h("div", { className: "mag-e-ph" }, h("img", { src: e.img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: e.pos } }), bloque ? h("span", { className: "mag-badge" }, "Premium") : null),
                h("div", { className: "mag-e-tx" },
                    surtitre(e.dr + " " + e.sur),
                    h("h3", null, e.titre),
                    h("p", null, e.sous)));
        }))
    ]);

    /* ---------- 9. Santé, vidéos ---------- */
    var sante = section("sante", "05", @@OLD:37@@, [
        h("button", { key: "s", type: "button", className: "mag-sante", onClick: function () { setEcran("sante"); } },
            h("div", { className: "mag-sante-ph" }, h("img", { src: "images/cours-pansage-09_gestes_brossage.webp", alt: "", loading: "lazy", decoding: "async" })),
            h("div", { className: "mag-sante-tx" }, surtitre(@@OLD:38@@), h("h3", null, @@OLD:39@@), h("p", null, @@OLD:40@@), h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))),
        h("div", { key: "v", className: "mag-vid" }, h(EncartBibliothequeVideo, { compact: true })),
        h("button", { key: "hb", type: "button", className: "mag-hb", onClick: function () { setEcran("assistant"); } },
            h("span", null, h("b", null, @@OLD:41@@), @@OLD:42@@),
            h("span", { className: "mag-cta mag-cta-l" }, h("span", null, @@OLD:43@@), h("span", { "aria-hidden": "true" }, fleche)))
    ], "mag-pe");

    return h("div", { className: "mag", dir: rtl ? "rtl" : "ltr", lang: lg },
        h("style", null, CSS),
        couverture, rubriques, une, technique, explorer, respiration, articles, ecoles, sante,
        mtPan ? h(PanneauConseilsHB, { depuis: "articles", onFermer: function () { setMtPan(false); } }) : null);
}

var CSS = [
".mag{--bg:#070A08;--pe:#101D22;--or:#C9A66B;--iv:#F3EEE4;--tx:#C9D2CC;--mu:#9FB0AC;--se:'Cormorant Garamond',Georgia,serif;--sa:'Montserrat',Arial,sans-serif;container-type:inline-size;background:var(--bg);color:var(--iv);font-family:var(--sa);min-height:100vh;overflow-x:clip;padding-bottom:24px}",
".mag *{box-sizing:border-box}:where(.mag) button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:start}",
".mag button:focus-visible{outline:2px solid var(--or);outline-offset:3px}",
".mag-w{max-width:1180px;margin:0 auto;padding:0 22px}",
".mag-sur{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--or);font-weight:600;line-height:1.5}",
".mag h1,.mag h2,.mag h3{font-family:var(--se);font-weight:500;color:var(--iv);margin:0;overflow-wrap:break-word}",
".mag-meta{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mu);margin-top:12px}",
".mag-badge{position:absolute;top:12px;inset-inline-end:12px;padding:3px 9px;border-radius:999px;background:rgba(7,8,10,.75);border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-nouv{position:absolute;top:12px;inset-inline-start:12px;padding:3px 9px;border-radius:999px;background:rgba(7,10,8,.7);border:1px solid rgba(201,166,107,.45);color:var(--iv);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600}",
".mag-cta{display:inline-flex;align-items:center;gap:14px;margin-top:22px;padding:13px 22px;border:1px solid var(--or);border-radius:999px;color:var(--iv);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;background:rgba(7,10,8,.4)}",
".mag-cta span:last-child{color:var(--or);font-size:15px}",
".mag-cta-l{padding:0;border:0;background:none;margin-top:16px;color:var(--or)}",
".mag-rond{width:34px;height:34px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(201,166,107,.6);color:var(--or);display:inline-flex;align-items:center;justify-content:center;font-size:17px;line-height:1}",
/* couverture */
".mag-cov{position:relative;background:radial-gradient(circle at 70% 40%,#15241f 0%,#08100c 60%,#070a08 100%)}",
".mag-cov-ph{height:min(78vw,380px);overflow:hidden;position:relative}",
".mag-cov-ph img{width:100%;height:100%;object-fit:cover;object-position:72% 40%;display:block}",
".mag-cov-ph:after{content:'';position:absolute;inset:auto 0 0 0;height:45%;background:linear-gradient(180deg,rgba(7,10,8,0),#070A08)}",
".mag-cov-tx{position:relative;padding:4px 24px 44px}",
".mag-cov h1{font-size:clamp(40px,12vw,54px);line-height:.98;margin:14px 0 18px;letter-spacing:-.01em}",
".mag-bar{display:block;width:46px;height:2px;background:var(--or);margin-bottom:16px}",
".mag-cov p{font-family:var(--se);font-size:20px;line-height:1.4;color:#e4e8e1;margin:0;max-width:30ch}",
/* rubriques */
".mag-rub{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:22px;padding:16px 22px 18px;border-top:1px solid #1f2b28;border-bottom:1px solid #1f2b28;background:#08100d;scrollbar-width:none;-webkit-overflow-scrolling:touch}",
".mag-rub::-webkit-scrollbar{display:none}",
".mag-chip{flex:0 0 auto;scroll-snap-align:start;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid #34463f;color:#d6ded8;font-size:12.5px;letter-spacing:.04em;white-space:nowrap;display:inline-flex;align-items:center}",
".mag-chip.on{border-color:var(--or);color:var(--or);background:rgba(201,166,107,.08)}",
/* sections */
".mag-s{padding:84px 0 0}",
".mag-pe{background:var(--pe);padding-bottom:84px;margin-top:84px}",
".mag-sh{display:flex;align-items:center;gap:14px;margin-bottom:26px;flex-wrap:wrap}",
".mag-num{font-family:var(--se);font-size:30px;color:var(--or);line-height:1}",
".mag-sep{width:40px;height:1px;background:var(--or);flex:0 0 auto}",
".mag-sh h2{font-size:clamp(30px,8.6vw,40px);line-height:1.05;flex:1 1 100%}",
".mag-intro{color:var(--tx);font-size:15px;line-height:1.75;margin:-6px 0 30px;max-width:56ch}",
/* à la une */
".mag-une-s{padding-top:56px}",
".mag-une{display:block;width:100%;position:relative}",
".mag-une-ph{position:relative;margin:0 -22px;aspect-ratio:4/3;overflow:hidden}",
".mag-une-ph img{width:100%;height:100%;object-fit:cover;object-position:40% 55%;display:block}",
".mag-une-tx{position:relative;margin:-38px 0 0 18px;padding:26px 22px 28px;background:linear-gradient(160deg,#101D22,#0a1210);border:1px solid rgba(201,166,107,.28);border-inline-end:0}",
".mag[dir=rtl] .mag-une-tx{margin:-38px 18px 0 0;border-inline-end:1px solid rgba(201,166,107,.28);border-inline-start:0}",
".mag-une-tx h3{font-size:clamp(30px,8.4vw,38px);line-height:1.06;margin:14px 0 14px}",
".mag-une-tx p{font-family:var(--se);font-size:19px;line-height:1.42;color:#e1e6df;margin:0}",
/* technique */
".mag-tech{display:grid;gap:34px}",
".mag-tech-a{display:block;width:100%}",
".mag-tech-ph{position:relative;width:86%;margin-inline-start:auto;aspect-ratio:3/2;overflow:hidden}",
".mag-tech-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-tech-tx{padding:22px 0 0;width:92%}",
".mag-tech-tx h3{font-size:27px;line-height:1.12;margin-top:10px}",
".mag-hb{display:flex;flex-direction:column;align-items:flex-start;gap:14px;width:100%;margin-top:44px;padding:22px 20px;border:1px solid rgba(201,166,107,.32);color:var(--tx);font-size:13.5px;line-height:1.5}",
".mag-hb b{display:block;font-family:var(--se);font-size:22px;font-weight:500;color:var(--iv);margin-bottom:4px}",
/* mosaïque */
".mag-mos{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}",
".mag-t{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;background:#0c1514;border:1px solid #22312d}",
".mag-t-ph{position:relative;flex:1 1 auto;min-height:110px;overflow:hidden;background:#0f1a19}",
".mag-t-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}",
".mag-t-tx{position:relative;padding:14px 14px 16px;background:#0c1514}",
".mag-t-tx h3{font-size:21px;line-height:1.1}",
".mag-t-tx p{font-size:12px;line-height:1.5;color:var(--mu);margin:6px 0 0}",
".mag-t-tx .mag-rond{margin-top:12px}",
".mag-t-galops{grid-row:span 2}.mag-t-galops .mag-t-ph{min-height:250px}",
".mag-t-ecoles .mag-t-ph{min-height:96px}",
".mag-t-sante{grid-column:1 / -1;flex-direction:row}.mag-t-sante .mag-t-ph{flex:0 0 42%;min-height:150px}.mag-t-sante .mag-t-tx{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center}",
".mag-t-hb{grid-column:1 / -1;flex-direction:row;margin-inline-start:12%;width:auto}.mag-t-hb .mag-t-ph{flex:0 0 96px;min-height:96px}.mag-t-hb .mag-t-ph img{object-position:center 20%}.mag-t-hb .mag-t-tx{flex:1 1 auto}",
".mag-gal{margin-top:44px}",
".mag-gal-l{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}",
/* citation */
".mag-cit-s{padding-top:0;margin-top:84px;background:linear-gradient(180deg,#0b1513,#070A08)}",
".mag-wave{height:30px;background:var(--bg);clip-path:polygon(0 0,100% 0,100% 30%,90% 24%,75% 67%,62% 80%,49% 59%,36% 27%,20% 23%,9% 35%,0 52%)}",
".mag-cit{display:grid;gap:30px;padding-top:56px !important;padding-bottom:84px !important}",
".mag-cit-ph{width:78%;aspect-ratio:4/5;overflow:hidden}",
".mag-cit-ph img{width:100%;height:100%;object-fit:cover;object-position:50% 50%;display:block}",
".mag-cit-tx{margin:0;margin-inline-start:10%}",
".mag-qm{font-family:var(--se);font-size:84px;line-height:.5;color:var(--or);display:block;height:32px}",
".mag-cit blockquote{font-family:var(--se);font-size:clamp(28px,7.6vw,36px);line-height:1.2;margin:0 0 18px;color:var(--iv)}",
".mag-cit figcaption{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--or)}",
/* articles */
".mag-fil{margin:0 -22px 30px}",
".mag-art{display:grid;gap:30px}",
".mag-a{display:flex;gap:16px;width:100%;align-items:center}",
".mag-a-ph{position:relative;flex:0 0 40%;aspect-ratio:4/3;overflow:hidden;background:#0f1a19}",
".mag-a-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-a-tx{flex:1 1 auto;min-width:0}",
".mag-a-tx h3{font-size:21px;line-height:1.15}",
".mag-a-tx p{font-size:13.5px;line-height:1.6;color:var(--tx);margin:10px 0 0}",
".mag-a0{flex-direction:column;align-items:stretch}.mag-a0 .mag-a-ph{flex:none;width:100%;aspect-ratio:16/10}.mag-a0 .mag-a-tx h3{font-size:28px}",
".mag-a2{flex-direction:row-reverse}",
".mag-live{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;width:100%;margin-top:44px;padding:18px 0;border-top:1px solid #2a3a36;border-bottom:1px solid #2a3a36}",
".mag-live-d{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#E8A08C;font-weight:600}",
".mag-live-d i{width:7px;height:7px;border-radius:50%;background:#E8A08C;display:inline-block}",
".mag-live-t{flex:1 1 200px;min-width:0;font-size:12.5px;line-height:1.5;color:var(--mu)}",
".mag-live-t b{display:block;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv)}",
/* écoles */
".mag-eco{display:grid;grid-template-columns:1fr 1fr;gap:28px 14px}",
".mag-e{display:block;width:100%}",
".mag-e-ph{position:relative;aspect-ratio:3/4;overflow:hidden;background:#0f1a19}",
".mag-e-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-e-tx{padding-top:14px}",
".mag-e-tx h3{font-size:21px;line-height:1.12;margin-top:6px}",
".mag-e-tx p{font-size:12.5px;line-height:1.55;color:var(--mu);margin:6px 0 0}",
".mag-e0{grid-column:1 / -1}.mag-e0 .mag-e-ph{aspect-ratio:4/3}.mag-e0 .mag-e-tx h3{font-size:28px}",
".mag-e2{margin-top:40px}",
".mag-e3{grid-column:1 / -1;width:84%;margin-inline-start:auto}.mag-e3 .mag-e-ph{aspect-ratio:16/9}",
/* santé */
".mag-sante{display:block;width:100%;position:relative}",
".mag-sante-ph{aspect-ratio:16/10;overflow:hidden;width:92%}",
".mag-sante-ph img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.8)}",
".mag-sante-tx{position:relative;margin:-30px 0 0 auto;width:88%;padding:22px 20px 24px;padding-inline-end:60px;background:#0b1513;border:1px solid rgba(201,166,107,.25)}",
".mag[dir=rtl] .mag-sante-tx{margin:-30px auto 0 0}",
".mag-sante-tx h3{font-size:26px;margin-top:8px}.mag-sante-tx p{font-size:13px;line-height:1.55;color:var(--mu);margin:8px 0 0}",
".mag-sante-tx .mag-rond{position:absolute;inset-inline-end:16px;bottom:18px}",
".mag-vid{margin-top:48px}",
/* tablette */
"@container (min-width:640px){.mag-w{padding:0 40px}.mag-rub{padding:16px 40px 18px;scroll-padding-inline:40px}.mag-t-tx{padding-inline-end:58px}.mag-t-tx .mag-rond{position:absolute;bottom:14px;inset-inline-end:12px;margin:0}.mag-hb{flex-direction:row;align-items:center;justify-content:space-between}.mag-cov-ph{height:420px}.mag-cov-tx{padding:0 40px 56px;margin-top:-120px}.mag-cov-ph:after{height:60%}",
".mag-une-ph{margin:0}.mag-une-tx{width:72%;margin:-90px 0 0 auto}.mag[dir=rtl] .mag-une-tx{margin:-90px auto 0 0}",
".mag-mos{grid-template-columns:repeat(12,1fr);gap:18px}.mag-t-galops{grid-column:1 / 6;grid-row:1 / 3}.mag-t-ecoles{grid-column:6 / 13}.mag-t-ecoles .mag-t-ph{min-height:170px}.mag-t-sante{grid-column:6 / 13;flex-direction:column}.mag-t-sante .mag-t-ph{flex:1 1 auto;min-height:150px}.mag-t-hb{grid-column:3 / 11;margin:12px 0 0}",
".mag-art{grid-template-columns:repeat(12,1fr);gap:40px 26px}.mag-a0{grid-column:1 / 13}.mag-a0{flex-direction:row}.mag-a0 .mag-a-ph{width:58%;flex:0 0 58%}.mag-a1{grid-column:1 / 8;flex-direction:column;align-items:stretch}.mag-a1 .mag-a-ph{flex:none;width:100%}.mag-a2{grid-column:8 / 13;margin-top:70px;flex-direction:column;align-items:stretch}.mag-a2 .mag-a-ph{flex:none;width:100%;aspect-ratio:3/4}",
".mag-cit{grid-template-columns:5fr 6fr;align-items:center;gap:56px}.mag-cit-ph{width:100%}.mag-cit-tx{margin:0}",
".mag-eco{grid-template-columns:repeat(12,1fr);gap:40px 22px}.mag-e0{grid-column:1 / 8}.mag-e1{grid-column:8 / 13;margin-top:90px}.mag-e2{grid-column:2 / 6;margin-top:0}.mag-e3{grid-column:7 / 13;width:auto;margin-top:60px}.mag-e3 .mag-e-ph{aspect-ratio:4/3}",
".mag-tech{grid-template-columns:1fr}.mag-tech-a{display:grid;grid-template-columns:7fr 5fr;gap:34px;align-items:end}.mag-tech-ph{width:100%}.mag-tech-tx{width:auto;padding-bottom:10px}",
".mag-sante{display:grid;grid-template-columns:7fr 5fr;align-items:center}.mag-sante-ph{width:100%}.mag-sante-tx{width:auto;margin:0 0 0 -60px}.mag[dir=rtl] .mag-sante-tx{margin:0 -60px 0 0}",
".mag-hb{max-width:640px}}",
/* ordinateur */
"@container (min-width:960px){.mag-w{padding:0 56px}.mag-rub{justify-content:center;padding:18px 56px 20px}",
".mag-cov{min-height:560px;display:flex;align-items:flex-end}.mag-cov-ph{position:absolute;inset:0;height:auto}.mag-cov-ph img{object-position:70% 45%}.mag-cov-ph:after{inset:0;height:auto;background:linear-gradient(90deg,#070A08 0%,rgba(7,10,8,.78) 34%,rgba(7,10,8,0) 66%),linear-gradient(0deg,#070A08 0%,rgba(7,10,8,0) 30%)}",
".mag[dir=rtl] .mag-cov-ph:after{background:linear-gradient(270deg,#070A08 0%,rgba(7,10,8,.78) 34%,rgba(7,10,8,0) 66%),linear-gradient(0deg,#070A08 0%,rgba(7,10,8,0) 30%)}",
".mag-cov-tx{margin:0;padding:120px 56px 84px;max-width:640px}.mag-cov h1{font-size:76px}.mag-cov p{font-size:23px}",
".mag-s{padding-top:136px}.mag-pe{margin-top:136px;padding-bottom:136px}.mag-cit-s{margin-top:136px}.mag-cit{padding-top:96px !important;padding-bottom:136px !important}",
".mag-une-s{padding-top:96px}.mag-une{display:grid;grid-template-columns:repeat(12,1fr);align-items:center}.mag-une-ph{grid-column:1 / 9;grid-row:1;aspect-ratio:16/10}.mag-une-tx{grid-column:8 / 13;grid-row:1;width:auto;margin:120px 0 0}.mag[dir=rtl] .mag-une-tx{margin:120px 0 0}.mag-une-tx h3{font-size:42px}",
".mag-sh h2{font-size:46px}.mag-intro{font-size:16px;margin-bottom:40px}",
".mag-mos{grid-auto-rows:minmax(150px,auto)}.mag-t-galops{grid-column:1 / 5;grid-row:1 / 3}.mag-t-galops .mag-t-ph{min-height:420px}.mag-t-ecoles{grid-column:5 / 13;margin-top:40px}.mag-t-ecoles .mag-t-ph{min-height:220px}.mag-t-sante{grid-column:5 / 9;flex-direction:column}.mag-t-hb{grid-column:9 / 13;flex-direction:column;margin:60px 0 0}.mag-t-hb .mag-t-ph{flex:1 1 auto;min-height:150px}",
".mag-a0 .mag-a-tx h3{font-size:36px}.mag-a-tx h3{font-size:24px}",
".mag-cit blockquote{font-size:44px}.mag-cit-s{padding-top:0}}"
].join("");

window.HypeArticles = { Articles: EcranArticles };
})();
