/* HYPE ▸ 30/10/2026 — Article Hype Magazine « Pourquoi éviter la longue après un virage serré ? » (CSO, conseil du coach).
   Écran « article-cso », chargé seulement à l'ouverture (hypeEcranDiffere dans index.html). Réservé aux abonnés Premium.
   FICHIER GÉNÉRÉ par outils/article-cso/generer.py à partir de outils/article-cso/modele.js + les 14 fichiers de langue
   outils/article-cso/<langue>.json : pour corriger un texte, modifier le .json puis relancer le générateur.
   Photos : images/article-cso-*.webp (fichiers, jamais de base64). Schémas : géométrie reprise À L'IDENTIQUE des 3 SVG
   validés (images/article-cso/*.svg) ; seuls les libellés sont traduits. Toutes les classes CSS commencent par « acso- ». */
(function () {
var TXT = __TXT__;
var ETAPES = __ETAPES__;
var IMG = { hero: "images/article-cso-hero.webp", virage: "images/article-cso-virage.webp", appel: "images/article-cso-appel.webp", saut: "images/article-cso-saut.webp" };

var CSS = [
  ".acso{--bg:#070A08;--pe:#0E1110;--pe2:#141816;--or:#C9A66B;--iv:#F3EEE4;--tx:#D1D9D3;--mu:#AEB8B3;--se:'Cormorant Garamond',Georgia,serif;--sa:'Montserrat',Arial,sans-serif;",
  "container-type:inline-size;background:var(--bg);color:var(--iv);font-family:var(--sa);-webkit-font-smoothing:antialiased;overflow-x:clip;min-height:100vh}",
  ".acso *{box-sizing:border-box}",
  ".acso-w{max-width:1180px;margin:0 auto;padding:0 22px}",
  ".acso-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:calc(env(safe-area-inset-top) + 10px) 16px 10px;border-bottom:1px solid #2d3b38;background:#070b09;position:relative;z-index:5}",
  ".acso-back{width:40px;height:40px;border-radius:50%;border:1px solid rgba(201,166,107,.45);background:transparent;color:var(--or);font-size:24px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto}",
  ".acso-logo{font-family:var(--se);font-size:28px;line-height:.8;letter-spacing:.01em;text-align:center;color:var(--iv)}",
  ".acso-logo span{display:block;font-family:var(--sa);font-size:7.5px;letter-spacing:.42em;margin-top:7px;color:var(--or);text-transform:uppercase}",
  ".acso-hero{position:relative;background:radial-gradient(circle at 70% 50%,#162626 0%,#08120e 58%,#070a08 100%)}",
  ".acso-hero-ph{position:relative;width:100%;height:min(118vw,560px);overflow:hidden}",
  ".acso-hero-ph img{width:100%;height:100%;object-fit:cover;object-position:50% 100%;display:block;filter:saturate(.9)}",
  ".acso-hero-ph:before{content:'';position:absolute;inset:0 0 auto 0;height:22%;background:linear-gradient(180deg,rgba(7,10,8,.55),transparent);z-index:1;pointer-events:none}",
  ".acso-hero-tx{position:relative;padding:28px 22px 46px}",
  ".acso-eye{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--or);font-weight:600}",
  ".acso-fil{font-size:11px;color:#aeb9b1;margin-top:9px}",
  ".acso h1{font-family:var(--se);font-weight:500;font-size:clamp(36px,11vw,48px);line-height:1;letter-spacing:-.02em;margin:18px 0 22px;color:var(--iv);overflow-wrap:break-word;hyphens:manual}",
  ".acso em{color:var(--or);font-style:italic;font-weight:500}",
  ".acso-bar{width:52px;height:2px;background:var(--or);margin:0 0 20px}",
  ".acso-chapo{font-family:var(--se);font-size:21px;line-height:1.38;color:#e4e8e1;margin:0 0 20px;font-weight:500}",
  ".acso-by{font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:#b6c1bb;line-height:1.9}",
  ".acso-by i{color:var(--or);font-style:normal;margin:0 8px}",
  ".acso-wave{height:30px;margin-top:-15px;position:relative;z-index:2;background:var(--pe);clip-path:polygon(0 52%,9% 35%,20% 23%,36% 27%,49% 59%,62% 80%,75% 67%,90% 24%,100% 30%,100% 100%,0 100%)}",
  ".acso-s{padding:44px 0}",
  ".acso-pe{background:var(--pe)}.acso-no{background:var(--bg)}.acso-li{border-top:1px solid #1f2420}",
  ".acso-ch{display:flex;align-items:center;gap:14px;margin-bottom:22px}",
  ".acso-num{font-family:var(--se);font-size:32px;color:var(--or);line-height:1;font-weight:500}",
  ".acso-sep{height:1px;background:var(--or);width:42px;opacity:.82;flex:0 0 auto}",
  ".acso-cat{font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:#c9b58f}",
  ".acso h2{font-family:var(--se);font-size:clamp(27px,8vw,34px);line-height:1.08;font-weight:500;letter-spacing:-.015em;margin:0 0 24px;color:var(--iv);overflow-wrap:break-word;hyphens:manual}",
  ".acso p{font-size:15px;line-height:1.65;color:var(--tx);margin:0 0 14px}",
  ".acso p strong,.acso-res strong{color:var(--iv);font-weight:600}",
  ".acso p.acso-lead{font-family:var(--se);font-size:20px;line-height:1.35;color:#eee9df;font-weight:500}",
  ".acso-2{display:grid;grid-template-columns:1fr;gap:26px}",
  ".acso-fig{margin:4px 0 0;position:relative;background:#1c2827}",
  ".acso-fig img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;filter:saturate(.85)}",
  ".acso-fig figcaption{font-size:11.5px;color:#c1c9c0;letter-spacing:.04em;line-height:1.55;padding:14px 0;border-bottom:1px solid #3b504c;background:var(--sbg,transparent)}",
  ".acso-fig figcaption b{color:var(--or);font-weight:600;letter-spacing:.14em;text-transform:uppercase;font-size:10.5px}",
  ".acso-pull{font-family:var(--se);font-weight:500;font-size:22px;line-height:1.3;color:var(--iv);padding-inline-start:18px;border-inline-start:2px solid var(--or);margin:24px 0}",
  ".acso-mech{margin-top:30px;display:grid;grid-template-columns:1fr;background:#121614;border-top:1px solid #2c312d;border-bottom:1px solid #4e5c50}",
  ".acso-mech-in{padding:24px 22px 8px}",
  ".acso h3.acso-k{font-family:var(--sa);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--or);margin:0 0 15px;font-weight:600;line-height:1.5}",
  ".acso-mech p{font-size:14.5px;line-height:1.75}",
  ".acso p.acso-note{font-size:12px;line-height:1.7;color:#9fb0ac}",
  ".acso-svg{direction:ltr;padding:6px 10px 14px}",
  ".acso-svg svg{display:block;width:100%;height:auto}",
  ".acso-risk{display:grid;grid-template-columns:1fr;gap:4px;margin-top:24px}",
  ".acso-rk{border-top:1px solid #415450;padding:14px 0 6px;display:flex;gap:13px;font-size:14.5px;line-height:1.65;color:#d6dfd8}",
  ".acso-rk b{color:var(--or);font-size:15px;font-weight:500;font-family:var(--se);flex:0 0 auto}",
  ".acso-full{padding:24px 22px;background:rgba(201,166,107,.08);border-inline-start:2px solid var(--or);font-family:var(--se);font-size:24px;line-height:1.3;color:#f0e1c9;margin:38px 0 0;font-weight:500}",
  ".acso-cmp{margin-top:32px;display:grid;grid-template-columns:1fr;gap:20px}",
  ".acso-pan{background:#0b1516;border:1px solid #32443e;padding:18px 14px 22px}",
  ".acso-lab{font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;display:flex;align-items:center;gap:12px;color:#d4d2ca;line-height:1.45}",
  ".acso-dot{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:1px solid #ba9674;font-size:15px;color:#c8a780;flex:0 0 auto}",
  ".acso-ok .acso-dot{border-color:var(--or);color:var(--or)}",
  ".acso-crs{margin:16px 0 16px;background:#112427;border:1px solid #243936;padding:4px 2px 8px}",
  ".acso h3.acso-pt{font-family:var(--se);font-size:23px;line-height:1.12;font-weight:500;margin:0 0 13px;color:var(--iv)}",
  ".acso-pan p{font-size:14px;line-height:1.8;margin:0}",
  ".acso-pan h3.acso-pt{margin-top:22px}",
  ".acso-res{margin:18px 0 0;border-top:1px solid #3d4a41;padding-top:15px;color:#c5d0c6;font-size:13px;line-height:1.6}",
  ".acso-band{background:#121614;padding:28px 0;border-top:1px solid #2c312d;border-bottom:1px solid #2c312d}",
  ".acso-band .acso-w{display:flex;gap:20px;align-items:center}",
  ".acso-sign{font-size:38px;font-family:var(--se);color:var(--or);flex:0 0 auto;line-height:1}",
  ".acso-band-t{font-family:var(--se);font-size:19px;line-height:1.32;color:var(--iv);font-weight:500}",
  ".acso-steps{display:grid;grid-template-columns:1fr;gap:20px;margin:40px 0 0}",
  ".acso-st{border-top:1px solid #4b5b53;padding-top:15px}",
  ".acso-st .acso-num{display:block;margin-bottom:7px;font-size:34px}",
  ".acso-st strong{display:block;font-family:var(--se);font-size:23px;font-weight:500;line-height:1.12;margin-bottom:9px;color:var(--iv)}",
  ".acso-st p{font-size:13.5px;line-height:1.68;margin:0}",
  ".acso-coach{background:transparent;border-inline-start:2px solid var(--or);padding:4px 0 4px 20px}",
  ".acso-qm{display:none}",
  ".acso-coach blockquote{font-family:var(--se);font-size:20px;line-height:1.4;font-weight:500;margin:0 0 12px;color:var(--iv)}",
  ".acso-sig{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--or)}",
  ".acso-take{display:grid;grid-template-columns:1fr;gap:14px;margin:6px 0 0}",
  ".acso-tk{display:flex;gap:12px;color:#d4ddd5;line-height:1.55;font-size:14.5px;align-items:flex-start}",
  ".acso-tk span{color:var(--or);font-size:16px;flex:0 0 auto;line-height:1.5}",
  ".acso-fin{margin-top:44px;display:grid;gap:14px}",
  ".acso-hb{display:flex;align-items:center;gap:16px;justify-content:space-between;width:100%;text-align:start;background:#121614;border:1px solid #2c312d;color:var(--tx);padding:18px 20px;cursor:pointer;font:inherit;font-size:14px;line-height:1.5}",
  ".acso-hb strong{display:block;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv);margin-bottom:2px}",
  ".acso-hb i{font-style:normal;color:var(--or);font-size:20px;flex:0 0 auto}",
  ".acso-mag{justify-self:start;background:transparent;border:1px solid var(--or);color:var(--or);border-radius:999px;padding:12px 22px;font-family:var(--sa);font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}",
  ".acso-hb:focus-visible,.acso-mag:focus-visible{outline:2px solid var(--or);outline-offset:2px}",
  ".acso-lock{min-height:100vh;position:relative;overflow:hidden;background:#060709;color:var(--iv)}",
  /* tablette : un peu plus d'air, toujours une colonne pour le texte */
  ".acso-et{margin-top:40px;border-top:1px solid #2c312d;padding-top:26px}",
  ".acso-et-g{display:grid;grid-template-columns:1fr;gap:18px;margin-top:20px}",
  ".acso-et-svg{direction:ltr;background:#121614;border:1px solid #2c312d;padding:6px 4px 10px}",
  ".acso-et-svg svg{display:block;width:100%;height:auto}",
  ".acso-et-svg path.seg{transition:stroke-opacity .35s ease,stroke-width .35s ease}",
  "@media (prefers-reduced-motion:reduce){.acso-et-svg path.seg{transition:none}}",
  ".acso-et-b{display:grid;gap:10px}",
  ".acso-et-b button{display:flex;gap:14px;align-items:flex-start;width:100%;text-align:start;background:transparent;border:1px solid #32443e;color:var(--tx);padding:14px 14px;cursor:pointer;font:inherit}",
  ".acso-et-b button[aria-pressed=true]{border-color:var(--or);background:rgba(201,166,107,.07)}",
  ".acso-et-b button:focus-visible{outline:2px solid var(--or);outline-offset:2px}",
  ".acso-et-b b{flex:0 0 auto;width:30px;height:30px;border-radius:50%;border:1px solid var(--or);color:var(--or);display:inline-flex;align-items:center;justify-content:center;font-family:var(--se);font-size:17px;font-weight:500}",
  ".acso-et-b strong{display:block;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv);margin-bottom:4px}",
  ".acso-et-b span{font-size:13.5px;line-height:1.6}",
  "@container (min-width:900px){.acso-et-g{grid-template-columns:1.25fr 1fr;align-items:center;gap:32px}}",
  "@container (min-width:640px){.acso-w{padding:0 40px}.acso-hero-tx{padding:34px 40px 54px}.acso-cmp{grid-template-columns:1fr 1fr}.acso-steps{grid-template-columns:repeat(3,1fr)}.acso-take{grid-template-columns:1fr 1fr;gap:16px 34px}.acso-risk{grid-template-columns:1fr 1fr;gap:6px 18px}.acso-s{padding:60px 0}.acso-mech{grid-template-columns:1.1fr .9fr}.acso-mech-in{padding:28px 30px 18px}.acso-svg{display:flex;align-items:center}.acso-coach blockquote{font-size:23px}.acso-band-t{font-size:22px}.acso-band{padding:36px 0}.acso-sign{font-size:46px}}",
  /* ordinateur : mise en page éditoriale, deux colonnes, photo du haut à droite */
  "@container (min-width:900px){.acso-w{padding:0 42px}.acso-top{padding:12px 42px}.acso-logo{font-size:36px}.acso-logo span{font-size:8.5px;margin-top:10px}",
  ".acso-hero{display:flex;min-height:600px}.acso-hero-ph{position:absolute;top:0;bottom:0;inset-inline-end:0;width:48%;height:auto}",
  ".acso-hero-ph:before{inset:0;height:auto;width:45%;background:linear-gradient(90deg,#070a08 0%,rgba(7,10,8,0) 100%)}",
  ".acso[dir=rtl] .acso-hero-ph:before{inset:0 0 0 auto;background:linear-gradient(270deg,#070a08 0%,rgba(7,10,8,0) 100%)}",
  ".acso-hero-tx{width:56%;padding:76px 42px 74px;z-index:2;align-self:center}",
  ".acso h1{font-size:clamp(52px,6.2cqw,72px);line-height:.98;margin:26px 0 26px}.acso-chapo{font-size:23px}.acso-eye{font-size:11px}.acso-by{font-size:10.5px}",
  ".acso-s{padding:72px 0}.acso h2{font-size:clamp(34px,3.6cqw,42px)}.acso p{font-size:16px;line-height:1.75}.acso p.acso-lead{font-size:22px}",
  ".acso-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(40px,6cqw,80px);align-items:start}",
  ".acso-pull{font-size:26px}.acso-full{font-size:24px;padding:28px 32px;margin-top:36px}.acso h3.acso-pt{font-size:26px}.acso-pan{padding:25px 28px 31px}",
  ".acso-coach blockquote{font-size:25px}.acso-band-t{font-size:24px}.acso-sign{font-size:50px}.acso-band{padding:40px 0}}"
].join("");

function polices() {
  try {
    if (document.getElementById("acso-polices")) return;
    var l = document.createElement("link"); l.id = "acso-polices"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap";
    document.head.appendChild(l);
  } catch (e) { }
}

function Article() {
  var h = React.createElement;
  var app = useApp();
  var lg = app.langue || "fr";
  var L = TXT[lg] || TXT.fr;
  var rtl = (lg === "ar");
  var appRef = React.useRef(app); appRef.current = app;
  var stEt = React.useState(1); var etape = stEt[0], setEtape = stEt[1];
  React.useEffect(function () { polices(); try { if (typeof hypeMarquerVue === "function") hypeMarquerVue("article", 8); } catch (e) { } try { if (typeof hypeQueteMarquer === "function") hypeQueteMarquer("article"); } catch (e2) { } }, []);
  function t(k) { return (L[k] != null && L[k] !== "") ? L[k] : (TXT.fr[k] || ""); }
  /* **gras** et *doré italique* ; en français, espace insécable avant ? ! : ; */
  function riche(k) {
    var s = t(k);
    if (lg === "fr") s = s.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
    var morceaux = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return morceaux.map(function (m, i) {
      if (/^\*\*[^*]+\*\*$/.test(m)) return h("strong", { key: i }, m.slice(2, -2));
      if (/^\*[^*]+\*$/.test(m)) return h("em", { key: i }, m.slice(1, -1));
      return m;
    });
  }
  function retour() { var a = appRef.current; if (a.histLen && a.histLen > 0 && a.retourEcran) { a.retourEcran(); } else { a.setEcran("articles"); } }
  var flecheRetour = rtl ? "›" : "‹";
  var barre = h("div", { className: "acso-top" },
    h("button", { type: "button", className: "acso-back", onClick: retour, "aria-label": t("retour") }, flecheRetour),
    h("div", { className: "acso-logo" }, "HYPE", h("span", null, t("magazine"))),
    (typeof HypeDrapeauLangue === "function") ? h(HypeDrapeauLangue, { inline: true }) : h("span", { style: { width: 40 } }));

  /* ---------- verrou Premium ---------- */
  if (!app.premium) {
    return h("div", { className: "acso", dir: rtl ? "rtl" : "ltr", lang: lg },
      h("style", null, CSS),
      h("div", { className: "acso-lock" },
        h("div", { style: { position: "absolute", inset: 0, backgroundImage: "url(" + IMG.saut + ")", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "blur(9px) brightness(0.5)", transform: "scale(1.08)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,8,0.5) 0%, rgba(7,10,8,0.9) 60%, #070A08 100%)" } }),
        h("div", { style: { position: "relative", zIndex: 2 } }, barre),
        h("div", { style: { position: "relative", zIndex: 2, minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px", textAlign: "center" } },
          h("div", { style: { fontSize: 32, marginBottom: 16 } }, "🔒"),
          h("div", { className: "acso-eye", style: { marginBottom: 14 } }, t("verrou_cle")),
          h("h1", { style: { fontSize: 34, margin: "0 0 16px", maxWidth: 520 } }, riche("titre")),
          h("p", { style: { color: "#AEB8B3", fontSize: 14.5, lineHeight: 1.65, maxWidth: 360, margin: "0 0 26px" } }, t("verrou_texte")),
          h("button", { type: "button", onClick: function () { app.setEcran("premium"); }, style: { padding: "14px 26px", borderRadius: 999, border: "1px solid #C9A66B", background: "transparent", color: "#C9A66B", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer" } }, t("verrou_bouton")))));
  }

  /* ---------- schémas : géométrie identique aux 3 SVG validés, libellés traduits ---------- */
  var latin = !/^(ja|zh|ko|ar)$/.test(lg);
  function etiq(x, y, k, base, vbW, ls) {
    var maxW = vbW - x - 6;
    var txt = t(k); var n = Math.max(1, txt.length);
    var parCar = latin ? (0.66 * base + ls) : (rtl ? 0.62 * base : 1.02 * base);
    var fs = base * Math.min(1, maxW / (n * parCar));
    return h("text", { x: x, y: y, fontSize: fs.toFixed(1), letterSpacing: latin ? ls : 0 }, txt);
  }
  function marqueur(id, w) { return h("defs", null, h("marker", { id: id, viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: w, markerHeight: w, orient: "auto-start-reverse" }, h("path", { d: "M0 0 L10 5 L0 10 Z", fill: "#C9A66B" }))); }
  function rond(cx, cy, r, f, k) { return h("circle", { key: k, cx: cx, cy: cy, r: r, fill: f }); }
  var svgVirage = h("svg", { viewBox: "0 0 530 280", role: "img", "aria-label": t("svg1_aria") },
    marqueur("acsoA1", 6),
    h("g", { opacity: ".33", stroke: "#52716c", strokeWidth: 1 }, h("path", { d: "M33 43 H497 M33 245 H497", strokeDasharray: "3 10" })),
    h("path", { d: "M54 210 L265 210 Q302 210 333 179 L425 87", fill: "none", stroke: "#C9A66B", strokeWidth: 4, strokeLinecap: "round", strokeDasharray: "8 9", markerEnd: "url(#acsoA1)" }),
    h("path", { d: "M390 35 L469 114 M402 23 L481 102", stroke: "#F3EEE4", strokeWidth: 7, strokeLinecap: "square" }),
    h("g", { fill: "#F3EEE4" }, [84, 130, 176, 222].map(function (x, i) { return rond(x, 210, 5, "#F3EEE4", i); })),
    h("g", { fill: "#C9A66B" }, rond(267, 210, 7, "#C9A66B", "a"), rond(306, 197, 6, "#C9A66B", "b"), rond(345, 167, 5, "#C9A66B", "c"), rond(382, 130, 5, "#C9A66B", "d")),
    h("g", { fontFamily: "Arial,sans-serif", fill: "#b8c8c2" }, etiq(62, 181, "svg_entree", 18, 260, 1.2), etiq(215, 258, "svg_un_seul_virage", 18, 530, 1.2), etiq(397, 152, "svg_obstacle", 18, 530, 1.2)),
    h("path", { d: "M266 191 Q281 155 322 162", stroke: "#a3b5ab", strokeWidth: 1.5, fill: "none", strokeDasharray: "4 6" }));
  function svgParcours(id, bon) {
    var blancs = bon ? [69, 116, 163, 210, 255] : [69, 132, 196];
    var dores = bon ? [[293, 163, 4.5], [330, 145, 4.5], [368, 108, 4.5]] : [[256, 165, 4.5], [315, 155, 6], [374, 102, 4.5]];
    return h("svg", { viewBox: "0 0 500 205", role: "img", "aria-label": t(bon ? "svg3_aria" : "svg2_aria") },
      marqueur(id, 5),
      h("path", { d: "M48 165 L267 165 Q305 165 333 137 L420 50", stroke: "#C9A66B", strokeWidth: 3, strokeDasharray: "7 8", fill: "none", strokeLinecap: "round", markerEnd: "url(#" + id + ")" }),
      h("path", { d: "M387 20 L454 87 M398 9 L465 76", stroke: "#F3EEE4", strokeWidth: 6, strokeLinecap: "square" }),
      blancs.map(function (x, i) { return rond(x, 165, 4.5, "#F3EEE4", "w" + i); }),
      dores.map(function (p, i) { return rond(p[0], p[1], p[2], "#C9A66B", "g" + i); }),
      bon ? h("path", { d: "M273 191 L347 120", stroke: "#C9A66B", strokeWidth: 1.1, strokeDasharray: "3 6", opacity: ".55" })
          : h("path", { d: "M287 137 L387 106", stroke: "#b59c83", strokeWidth: 1.2, strokeDasharray: "4 5", opacity: ".7" }),
      h("g", { fill: "#a5b5ad", fontFamily: "Arial,sans-serif" }, etiq(52, 137, "svg_entree", 16, 230, 1.3), etiq(234, 195, "svg_virage", 16, 400, 1.3), etiq(389, 118, "svg_vertical", 16, 500, 1.3)));
  }

  function chap(n, k) { return h("div", { className: "acso-ch" }, h("span", { className: "acso-num" }, t(n)), h("span", { className: "acso-sep" }), h("span", { className: "acso-cat" }, t(k))); }
  function P(k, cls) { return h("p", { className: cls || null }, riche(k)); }
  function fig(src, alt, leg, cle) {
    return h("figure", { className: "acso-fig" },
      h("img", { src: src, alt: t(alt), loading: "lazy", decoding: "async" }),
      h("figcaption", null, cle ? [h("b", { key: "c" }, t(cle)), " — "] : null, t(leg)));
  }

  var hero = h("header", { className: "acso-hero" },
    h("div", { className: "acso-hero-ph" }, h("img", { src: IMG.hero, alt: "", decoding: "async", fetchpriority: "high" })),
    h("div", { className: "acso-hero-tx" },
      h("h1", null, riche("titre")),
      h("div", { className: "acso-bar" }),
      h("p", { className: "acso-chapo" }, riche("chapo")),
      h("div", { className: "acso-by" }, t("by_rub"), h("i", null, "·"), t("by_duree"))));

  var s1 = h("section", { className: "acso-s acso-pe" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-2" },
      h("div", null, chap("s1_num", "s1_cat"), h("h2", null, riche("s1_titre")), P("s1_lead", "acso-lead"), P("s1_p1"), P("s1_p2"), P("s1_p3")),
      h("div", null, fig(IMG.virage, "s1_photo_alt", "s1_legende", "s1_legende_cle"))),
    /* 31/10 03h : le schéma interactif remplace le schéma fixe + l'encadré « zoom » (redites). */
    /* 31/10 — schéma INTERACTIF (pack « Culture équestre ») : même tracé que le schéma validé n° 1 (un seul virage serré, une seule main),
       3 étapes activables (boutons, clavier) : 1 courbe serrée, 2 sortie de courbe, 3 amplitude ensuite. À FAIRE VALIDER par Blandine. */
    (function () {
      var E = ETAPES[lg] || ETAPES.fr; function e(k) { return E[k] || ETAPES.fr[k]; }
      var SEG = { 1: "M222 210 L265 210 Q302 210 333 179", 2: "M333 179 L372 140", 3: "M372 140 L425 87" };
      var BADGE = { 1: [300, 236], 2: [322, 130], 3: [366, 90] };
      return h("div", { className: "acso-et" },
        h("div", { className: "acso-eye" }, e("etapes_cle")),
        h("h3", { className: "acso-pt", style: { marginTop: 10 } }, e("etapes_titre")),
        h("p", { className: "acso-note", style: { margin: "6px 0 0" } }, e("etapes_intro")),
        h("div", { className: "acso-et-g" },
          h("div", { className: "acso-et-svg" },
            h("svg", { viewBox: "0 0 530 280", role: "img", "aria-label": e("e" + etape + "_t") + " : " + e("e" + etape + "_d") },
              marqueur("acsoEt", 6),
              h("path", { d: "M54 210 L265 210 Q302 210 333 179 L425 87", fill: "none", stroke: "#C9A66B", strokeOpacity: .28, strokeWidth: 3, strokeLinecap: "round", strokeDasharray: "8 9", markerEnd: "url(#acsoEt)" }),
              [1, 2, 3].map(function (n) { return h("path", { key: n, className: "seg", d: SEG[n], fill: "none", stroke: "#C9A66B", strokeOpacity: etape === n ? 1 : 0, strokeWidth: etape === n ? 6 : 3, strokeLinecap: "round" }); }),
              h("path", { d: "M390 35 L469 114 M402 23 L481 102", stroke: "#F3EEE4", strokeWidth: 7, strokeLinecap: "square" }),
              [84, 130, 176, 222].map(function (x, i) { return rond(x, 210, 5, "#F3EEE4", "b" + i); }),
              rond(267, 210, 7, "#C9A66B", "c1"), rond(306, 197, 6, "#C9A66B", "c2"), rond(345, 167, 5, "#C9A66B", "c3"), rond(382, 130, 5, "#C9A66B", "c4"),
              [1, 2, 3].map(function (n) { var p = BADGE[n]; var on = etape === n; return h("g", { key: "n" + n, style: { cursor: "pointer" }, onClick: function () { setEtape(n); } },
                h("circle", { cx: p[0], cy: p[1], r: 15, fill: on ? "#C9A66B" : "#0b1516", stroke: "#C9A66B", strokeWidth: 1.5 }),
                h("text", { x: p[0], y: p[1] + 5, textAnchor: "middle", fontSize: 15, fontFamily: "Georgia,serif", fill: on ? "#070A08" : "#C9A66B" }, String(n))); }),
              h("g", { fontFamily: "Arial,sans-serif", fill: "#b8c8c2" }, etiq(62, 181, "svg_entree", 18, 260, 1.2), etiq(397, 152, "svg_obstacle", 18, 530, 1.2)))),
          h("div", { className: "acso-et-b" }, [1, 2, 3].map(function (n) {
            return h("button", { key: n, type: "button", "aria-pressed": etape === n ? "true" : "false", onClick: function () { setEtape(n); } },
              h("b", null, String(n)), h("span", null, h("strong", null, e("e" + n + "_t")), e("e" + n + "_d")));
          }))),
        h("p", { className: "acso-note", style: { marginTop: 14 } }, e("etapes_note")));
    })()));

  var s2 = h("section", { className: "acso-s acso-no acso-li" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-2" },
      h("div", null, chap("s2_num", "s2_cat"), h("h2", null, riche("s2_titre")), P("s2_lead", "acso-lead"), P("s2_p1"), P("s2_p2"), P("s2_p3")),
      h("div", null, fig(IMG.appel, "s2_photo_alt", "s2_legende"),
        h("div", { className: "acso-risk" }, ["s2_r1", "s2_r2", "s2_r3", "s2_r4"].map(function (k, i) { return h("div", { key: k, className: "acso-rk" }, h("b", null, "0" + (i + 1)), h("span", null, t(k))); })))),
    /* 31/10 02h40 : encadré « La mauvaise longue… » retiré (Blandine : phrase bizarre, redite de la partie 02). */
    null));

  function panneau(bon) {
    var p = bon ? "s3_b_" : "s3_a_";
    return h("article", { className: "acso-pan" + (bon ? " acso-ok" : "") },
      h("div", { className: "acso-lab" }, h("span", { className: "acso-dot" }, bon ? "✓" : "×"), t(p + "label")),
      /* 31/10 02h30 : dessins de la comparaison retirés (Blandine : « virer au moins ces deux dessins ») — même tracé répété. */
      h("h3", { className: "acso-pt" }, t(p + "titre")),
      h("div", { className: "acso-res" }, riche(p + "res")));
  }
  var s3 = h("section", { className: "acso-s acso-pe acso-li" }, h("div", { className: "acso-w" },
    chap("s3_num", "s3_cat"), h("h2", null, riche("s3_titre")),
    h("p", { className: "acso-lead", style: { maxWidth: 920 } }, riche("s3_lead")),
    h("div", { className: "acso-cmp" }, panneau(false), panneau(true))));

  var s4 = h("section", { className: "acso-s acso-no acso-li" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-2" },
      h("div", null, chap("s4_num", "s4_cat"), h("h2", null, riche("s4_titre")), P("s4_p1"), P("s4_p3"), h("div", { className: "acso-pull" }, riche("s4_citation"))),
      h("div", null, fig(IMG.saut, "s4_photo_alt", "s4_legende")))));

  var bande = h("section", { className: "acso-band" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-sign", "aria-hidden": "true" }, "≠"),
    h("div", { className: "acso-band-t" }, h("span", { style: { color: "#C9A66B" } }, t("attention_mot")), " ", riche("attention"))));

  var s56 = h("section", { className: "acso-s acso-pe" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-2" },
      h("div", null, chap("s5_num", "s5_cat"), h("h2", null, riche("s5_titre")), P("s5_p1"), P("s5_p3")),
      h("div", null, chap("s6_num", "s6_cat"), h("h2", null, riche("s6_titre")), P("s6_p1"), P("s6_p2")))));

  var s7 = h("section", { className: "acso-s acso-no acso-li" }, h("div", { className: "acso-w" },
    h("div", { className: "acso-coach" },
      h("blockquote", null, riche("coach_citation")),
      h("div", { className: "acso-sig" }, t("coach_sig"))),
    h("div", { className: "acso-2", style: { marginTop: 56 } },
      h("div", null, h("h2", null, riche("s7_titre")), P("s7_p1"), P("s7_p2")),
      h("div", null,
        h("div", { className: "acso-ch" }, h("span", { className: "acso-num" }, "✓"), h("span", { className: "acso-sep" }), h("span", { className: "acso-cat" }, t("retenir"))),
        h("div", { className: "acso-take" }, ["r1", "r3", "r4", "r6"].map(function (k) { return h("div", { key: k, className: "acso-tk" }, h("span", { "aria-hidden": "true" }, "✦"), riche(k)); })))),
    /* 31/10 03h : fin d'article — Hey Baby + retour au Mag */
    h("div", { className: "acso-fin" },
      h("button", { type: "button", className: "acso-hb", onClick: function () { app.setEcran("assistant"); } },
        h("span", null, h("strong", null, t("fin_hb_titre")), t("fin_hb_texte")), h("i", { "aria-hidden": "true" }, rtl ? "←" : "→")),
      h("button", { type: "button", className: "acso-mag", onClick: function () { app.setEcran("articles"); } }, t("fin_mag")))));

  return h("div", { className: "acso", dir: rtl ? "rtl" : "ltr", lang: lg },
    h("style", null, CSS),
    barre, hero, h("div", { className: "acso-wave" }), s1, s2, s3, s4, bande, s56, s7);
}
window.HypeArticleCso = { Article: Article, TXT: TXT };
})();
