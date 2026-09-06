/* ============================================================================
   HYPE — RÉSULTATS EN CONCOURS
   Fichier détaché, chargé par index.html. S'il plante, l'app tourne quand même.
   Écrit le 22/08/2026 (session 152). Aucune dépendance : ni React, ni jQuery.

   Ce que ce fichier fait :
     · groupe les résultats en CONCOURS (même lieu, jours qui se suivent)
     · reconnaît les grands rendez-vous et les rebaptise de leur vrai nom
     · classe par force — L'ENJEU PRIME SUR LA HAUTEUR (règle de Blandine)
     · dessine la page dans un conteneur fourni par l'index

   Ce qu'il ne fait PAS :
     · il ne calcule JAMAIS le quart. La FFE le donne, on le lit.
     · il n'écrit rien en base.

   Point d'entrée :  HYPE_RESULTATS.rendre(hote, options)

   ⚠️ VERSION : 2  (01/09/2026)
   index.html charge ce fichier avec une clé `?v=`. À CHAQUE livraison de ce
   fichier, incrémenter le numéro ci-dessus ET le `?v=` de la balise dans
   index.html — sinon le navigateur et la PWA servent l'ancienne version quoi
   qu'on pousse. (Leçon de la soirée du 31/08, perdue sur hype-stories.js.)
   ========================================================================== */

(function () {
  "use strict";


  /* ==== 0. LA FEUILLE DE STYLE ===========================================
     Posée par le module lui-même, une seule fois. Toutes les couleurs sont
     des variables : changer la palette = changer ces cinq lignes.        */
  var STYLE = [
'.hr-zone{--hr-acc:32,217,245;--hr-met:232,200,135;--hr-tx:244,247,250;',
'  --hr-sf:255,255,255;--hr-c1:#0c1116;--hr-c2:#080b0e;',
'  --hr-mg:linear-gradient(150deg,#F0DDB0 0%,#E8C887 46%,#C9A468 100%);',
'  font-family:Montserrat,-apple-system,system-ui,sans-serif;padding:18px 0 8px;',
'  margin-top:14px;border-top:1px solid rgba(var(--hr-tx),.07)}',
'.hr-zone *{box-sizing:border-box}',
'.hr-rien{padding:10px 16px 18px;text-align:center;font-size:12.5px;color:rgba(var(--hr-tx),.42)}',

'.hr-totaux{display:flex;gap:7px;padding:4px 16px 0}',
'.hr-tot{flex:1;text-align:center;padding:13px 3px;border-radius:13px;',
'  background:rgba(var(--hr-acc),.05);border:1px solid rgba(var(--hr-acc),.14)}',
'.hr-tot .hr-n{font-family:Cinzel,Georgia,serif;font-size:25px;line-height:1;',
'  color:rgba(var(--hr-tx),.92);font-variant-numeric:tabular-nums}',
'.hr-tot .hr-l{font-size:8px;letter-spacing:.12em;text-transform:uppercase;',
'  color:rgba(var(--hr-tx),.45);margin-top:6px}',
'.hr-tot.hr-or{background:rgba(var(--hr-met),.06);border-color:rgba(var(--hr-met),.2)}',
'.hr-tot.hr-or .hr-n{background-image:var(--hr-mg);-webkit-background-clip:text;',
'  background-clip:text;-webkit-text-fill-color:transparent;color:transparent}',
'.hr-tot.hr-gris{background:rgba(var(--hr-sf),.022);border-color:rgba(var(--hr-tx),.08)}',
'.hr-tot.hr-gris .hr-n{color:rgba(var(--hr-tx),.6)}',

'.hr-mot{display:flex;align-items:center;margin:14px 16px 0;padding:4px 15px;',
'  border-radius:16px;background:linear-gradient(105deg,rgba(var(--hr-acc),.07),rgba(var(--hr-acc),.015));',
'  border:1px solid rgba(var(--hr-acc),.18)}',
'.hr-dit{flex:1;min-width:0;padding:11px 0}',
'.hr-mot p{margin:0;font-size:12.5px;line-height:1.5;color:rgba(var(--hr-tx),.84)}',
'.hr-tete{font-size:13.5px;padding-bottom:11px;margin-bottom:11px;',
'  border-bottom:1px solid rgba(var(--hr-acc),.14)}',
'.hr-tete b{background-image:var(--hr-mg);-webkit-background-clip:text;background-clip:text;',
'  -webkit-text-fill-color:transparent;color:transparent;font-weight:700}',
'.hr-ml{display:flex;flex-direction:column;gap:2px;margin-bottom:10px}',
'.hr-ml:last-child{margin-bottom:0}',
'.hr-lb{font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--hr-acc),.7)}',
'.hr-vl{font-size:12px;line-height:1.45;color:rgba(var(--hr-tx),.6)}',
'.hr-vl b{color:rgba(var(--hr-met),.95);font-weight:700}',

'.hr-st{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--hr-tx),.32);',
'  margin:28px 18px 11px;text-indent:.2em;display:flex;align-items:baseline;justify-content:space-between}',
'.hr-st em{font-style:normal;letter-spacing:.06em;color:rgba(var(--hr-tx),.24);',
'  text-transform:none;font-size:10px}',

'.hr-rail{display:flex;gap:11px;overflow-x:auto;padding:2px 16px 6px;scrollbar-width:none;',
'  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}',
'.hr-rail::-webkit-scrollbar{display:none}',
'.hr-aff{flex:0 0 auto;width:166px;border-radius:16px;overflow:hidden;cursor:pointer;',
'  scroll-snap-align:center;-webkit-tap-highlight-color:transparent;',
'  background:linear-gradient(var(--hr-c1),var(--hr-c2));border:1px solid rgba(var(--hr-tx),.09);',
'  transition:border-color .2s,transform .2s}',
'.hr-aff.hr-on{border-color:rgba(var(--hr-acc),.55);transform:translateY(-3px)}',
'.hr-aff.hr-d{border-color:rgba(var(--hr-met),.3)}',
'.hr-ab{padding:12px 12px 13px}',
'.hr-kick{font-size:7.5px;letter-spacing:.16em;text-transform:uppercase;',
'  color:rgba(var(--hr-acc),.85);margin-bottom:5px}',
'.hr-aff.hr-d .hr-kick{color:rgba(var(--hr-met),.9)}',
'.hr-ttl{font-family:Cinzel,Georgia,serif;font-size:12.5px;line-height:1.25;font-weight:500;min-height:31px}',
'.hr-an{font-size:9.5px;color:rgba(var(--hr-tx),.38);margin-top:5px;white-space:nowrap;',
'  overflow:hidden;text-overflow:ellipsis}',
'.hr-an b{color:rgba(var(--hr-met),.85);font-weight:700}',
'.hr-occs{margin-top:8px;padding-top:8px;border-top:1px solid rgba(var(--hr-tx),.08)}',
'.hr-o{display:flex;align-items:baseline;gap:7px;padding:2px 0}',
'.hr-y{font-family:Cinzel,serif;font-size:10.5px;color:rgba(var(--hr-tx),.4);flex:0 0 auto}',
'.hr-r{flex:1;min-width:0;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.hr-r i{font-style:normal;font-family:Cinzel,serif;font-size:11.5px;font-weight:600;',
'  color:rgba(var(--hr-tx),.62)}',
'.hr-r i.hr-v{background-image:var(--hr-mg);-webkit-background-clip:text;background-clip:text;',
'  -webkit-text-fill-color:transparent;color:transparent}',
'.hr-r i.hr-p{color:rgba(var(--hr-acc),.9)}',
'.hr-r u{text-decoration:none;font-size:9px;color:rgba(var(--hr-tx),.3)}',
'.hr-r em{font-style:normal;color:rgba(var(--hr-tx),.22);margin:0 3px}',
'.hr-encore{font-size:9px;color:rgba(var(--hr-acc),.75);padding-top:6px;font-weight:600}',

'.hr-detail{margin:12px 16px 0;border-radius:16px;overflow:hidden;',
'  background:rgba(var(--hr-sf),.028);border:1px solid rgba(var(--hr-tx),.09)}',
'.hr-dh{padding:14px 15px 12px;border-bottom:1px solid rgba(var(--hr-tx),.07)}',
'.hr-dh b{font-family:Cinzel,serif;font-size:14.5px;font-weight:500;display:block}',
'.hr-dh span{display:block;font-size:10.5px;color:rgba(var(--hr-tx),.42);margin-top:4px}',
'.hr-occ{padding:13px 15px 9px;border-bottom:1px solid rgba(var(--hr-tx),.07)}',
'.hr-occ:last-child{border-bottom:0;padding-bottom:15px}',
'.hr-oa{font-family:Cinzel,serif;font-size:16px;line-height:1;',
'  background-image:var(--hr-mg);-webkit-background-clip:text;background-clip:text;',
'  -webkit-text-fill-color:transparent;color:transparent}',
'.hr-oq{font-size:10px;color:rgba(var(--hr-tx),.38);margin:5px 0 2px}',

'.hr-cavs{display:flex;flex-direction:column;gap:8px;padding:0 16px}',
'.hr-cav{display:flex;align-items:center;gap:12px;padding:12px 13px;border-radius:14px;',
'  background:rgba(var(--hr-sf),.022);border:1px solid rgba(var(--hr-tx),.07);cursor:pointer;',
'  -webkit-tap-highlight-color:transparent;transition:border-color .18s}',
'.hr-cav.hr-on{border-color:rgba(var(--hr-acc),.5);background:rgba(var(--hr-acc),.045)}',
'.hr-ini{width:38px;height:38px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;',
'  justify-content:center;font-family:Cinzel,serif;font-size:13px;',
'  background:linear-gradient(140deg,#18242c,#0b1014);border:1px solid rgba(var(--hr-acc),.22);',
'  color:rgba(var(--hr-acc),.85)}',
'.hr-nm{flex:1;min-width:0}',
'.hr-nm b{display:block;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;',
'  text-overflow:ellipsis}',
'.hr-ca{font-size:9.5px;color:rgba(var(--hr-tx),.36);margin-top:3px}',
'.hr-ch{font-size:10.5px;margin-top:6px;color:rgba(var(--hr-tx),.4);line-height:1.5}',
'.hr-ch i{font-style:normal;font-weight:700;font-family:Cinzel,serif;font-size:12.5px}',
'.hr-ch i.hr-v{color:rgba(var(--hr-met),.95)}',
'.hr-ch i.hr-p{color:rgba(var(--hr-acc),.9)}',
'.hr-ch i.hr-c{color:rgba(var(--hr-tx),.72)}',
'.hr-fl{color:rgba(var(--hr-tx),.24);font-size:16px;flex:0 0 auto}',

'.hr-tri{display:flex;gap:6px;padding:0 16px 2px}',
'.hr-tri b{flex:1;text-align:center;font-weight:600;font-size:10.5px;letter-spacing:.03em;',
'  padding:9px 6px;border-radius:10px;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  background:rgba(var(--hr-sf),.03);border:1px solid rgba(var(--hr-tx),.1);',
'  color:rgba(var(--hr-tx),.5)}',
'.hr-tri b.hr-on{border-color:rgba(var(--hr-acc),.5);color:rgba(var(--hr-acc),.95)}',
'.hr-liste{padding:0 16px}',
'.hr-at{margin:22px 0 10px;padding:11px 13px;border-radius:13px;background:rgba(var(--hr-sf),.03);',
'  border:1px solid rgba(var(--hr-tx),.08);display:flex;align-items:center;gap:11px;cursor:pointer;',
'  -webkit-tap-highlight-color:transparent}',
'.hr-yy{font-family:Cinzel,serif;font-size:19px;color:rgba(var(--hr-acc),.9);line-height:1;flex:0 0 auto}',
'.hr-rs{flex:1;font-size:10.5px;color:rgba(var(--hr-tx),.45);line-height:1.5}',
'.hr-rs i{font-style:normal;font-family:Cinzel,serif;font-size:12px;font-weight:700;',
'  color:rgba(var(--hr-met),.95)}',
'.hr-ch2{font-size:13px;color:rgba(var(--hr-tx),.3);flex:0 0 auto;transition:transform .2s}',
'.hr-at.hr-ferme .hr-ch2{transform:rotate(-90deg)}',
'.hr-ac{display:flex;flex-direction:column;gap:9px}',
'.hr-ac.hr-ferme{display:none}',

'.hr-enc{border-radius:16px;overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  background:linear-gradient(var(--hr-c1),var(--hr-c2));border:1px solid rgba(var(--hr-tx),.08);',
'  transition:border-color .2s}',
'.hr-enc.hr-d{border-color:rgba(var(--hr-met),.34)}',
'.hr-enc.hr-e{border-color:rgba(var(--hr-met),.15)}',
'.hr-enc.hr-ouv{border-color:rgba(var(--hr-acc),.5)}',
'.hr-eh{display:flex;align-items:flex-start;gap:13px;padding:13px 14px}',
'.hr-gros{font-family:Cinzel,serif;font-size:26px;line-height:.95;flex:0 0 auto;width:46px;',
'  text-align:center;color:rgba(var(--hr-tx),.42);padding-top:2px}',
'.hr-gros sup{font-size:11px}',
'.hr-gros.hr-v{background-image:var(--hr-mg);-webkit-background-clip:text;background-clip:text;',
'  -webkit-text-fill-color:transparent;color:transparent}',
'.hr-gros.hr-p{color:rgba(var(--hr-acc),.9)}',
'.hr-sur{display:block;font-family:Montserrat,sans-serif;font-size:10px;font-weight:600;',
'  color:rgba(var(--hr-tx),.34);margin-top:3px;-webkit-text-fill-color:rgba(var(--hr-tx),.34)}',
'.hr-co{flex:1;min-width:0}',
'.hr-nom{font-family:Cinzel,serif;font-size:14px;font-weight:500;line-height:1.25}',
'.hr-sacre{font-family:Cinzel,serif;font-size:14.5px;font-weight:600;text-transform:uppercase;',
'  letter-spacing:.11em;line-height:1.3;background-image:var(--hr-mg);',
'  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;',
'  color:transparent}',
'.hr-nom.hr-sous{font-size:11.5px;font-weight:400;margin-top:5px;color:rgba(var(--hr-tx),.52)}',
'.hr-qd{font-size:10px;color:rgba(var(--hr-tx),.38);margin-top:4px}',
'.hr-ets{margin-top:8px;display:flex;flex-wrap:wrap;gap:5px}',
'.hr-etq{display:inline-block;padding:2.5px 8px 3px;border-radius:20px;font-size:8px;font-weight:700;',
'  letter-spacing:.11em;text-transform:uppercase;color:rgba(var(--hr-met),.95);',
'  background:rgba(var(--hr-met),.11);border:1px solid rgba(var(--hr-met),.3)}',
'.hr-etq.hr-pale{color:rgba(var(--hr-tx),.5);background:rgba(var(--hr-sf),.045);',
'  border-color:rgba(var(--hr-tx),.13)}',
'.hr-vg{flex:0 0 auto;width:56px;height:56px;border-radius:12px;display:flex;align-items:center;',
'  justify-content:center;border:1px dashed rgba(var(--hr-tx),.13);background:rgba(var(--hr-sf),.014)}',
'.hr-vg span{font-size:17px;color:rgba(var(--hr-tx),.24);line-height:1}',
'.hr-ind{flex:0 0 auto;display:flex;align-items:center;padding-top:20px;margin-left:2px}',
'.hr-enc.hr-ouv .hr-ind .hr-ch2{transform:rotate(90deg)}',

'.hr-epr{padding:0 14px 12px}',
'.hr-li{display:flex;align-items:flex-start;gap:10px;padding:9px 0 9px 60px;',
'  border-top:1px solid rgba(var(--hr-tx),.05)}',
'.hr-rg{font-family:Cinzel,serif;font-size:12.5px;color:rgba(var(--hr-tx),.42);width:32px;flex:0 0 auto}',
'.hr-rg.hr-v{color:rgba(var(--hr-met),.95)}',
'.hr-rg.hr-p{color:rgba(var(--hr-acc),.9)}',
'.hr-e{flex:1;min-width:0}',
'.hr-ep{display:block;font-size:11.5px;color:rgba(var(--hr-tx),.7);font-weight:500}',
'.hr-nb{display:block;font-size:10.5px;color:rgba(var(--hr-tx),.4);margin-top:3px}',
'.hr-nb b{color:rgba(var(--hr-tx),.72);font-weight:600}',

/* 01/09 — LA PLUME DES SAISIES MANUELLES. Choix de Blandine : un signe, pas
   un mot. Turquoise pale, pose devant le nom de l'epreuve et devant la date
   quand TOUT le concours est manuel. Aucune ligne ajoutee a l'ecran. */
'.hr-mn{font-size:9.5px;color:rgba(var(--hr-acc),.6);margin-right:5px}',

/* 01/09 — LES PREPAS ENTRE PARENTHESES sur la case Victoires, et la note
   qui l'explique AU TOUCHER (option C, choix de Blandine : « ils trouveront
   par eux memes si curieux »). La note est fermee par defaut. */
'.hr-par{font-family:Montserrat,sans-serif;font-size:12px;font-weight:600;',
'  color:rgba(var(--hr-acc),.62);margin-left:3px;-webkit-text-fill-color:rgba(32,217,245,.62)}',
'.hr-tot.hr-tap{cursor:pointer}',
'.hr-note{display:none;margin:8px 16px 0;padding:9px 12px;border-radius:11px;',
'  background:rgba(var(--hr-sf),.03);border:1px solid rgba(var(--hr-tx),.08);',
'  font-size:11px;line-height:1.45;color:rgba(var(--hr-tx),.55)}',
'.hr-note.hr-on{display:block}',

'.hr-album{display:none;border-top:1px solid rgba(var(--hr-acc),.18);',
'  background:radial-gradient(ellipse at 50% 0%,rgba(var(--hr-acc),.06),transparent 70%)}',
'.hr-enc.hr-ouv .hr-album{display:block}',
'.hr-vierge{padding:16px 20px 18px;text-align:center;font-size:11.5px;',
'  color:rgba(var(--hr-tx),.4);line-height:1.6}',
'.hr-vierge b{color:rgba(var(--hr-acc),.9);font-weight:600}',

'.hr-bt{display:block;width:calc(100% - 32px);margin:16px 16px 0;padding:16px;border-radius:14px;',
'  font-family:Montserrat,sans-serif;font-size:13px;font-weight:600;letter-spacing:.03em;',
'  cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  color:rgba(var(--hr-met),.95);background:rgba(var(--hr-met),.045);',
'  border:1.5px dashed rgba(var(--hr-met),.32)}',
'.hr-bt:active{background:rgba(var(--hr-met),.09)}'
  ].join("");

  function poserStyle() {
    if (typeof document === "undefined") return;
    if (document.getElementById("hype-resultats-css")) return;
    var s = document.createElement("style");
    s.id = "hype-resultats-css";
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  /* ==== 1. LES RÉFÉRENTIELS ==============================================
     Tout ce qui suit vient de Blandine, jamais d'une ressemblance de mots.
     Ajouter une entrée = une décision d'elle, pas une déduction.          */

  /* Les grands rendez-vous.
     rang 1 = salons et rendez-vous nationaux
     rang 2 = très grosse échéance                                        */
  var RDV = [
    { nom: "Jumping International de Bordeaux", rang: 1, cles: [/bordeaux/i] },
    { nom: "Equita Lyon",                       rang: 1, cles: [/equita\s*lyon/i, /eurexpo/i] },
    { nom: "Salon du Cheval de Paris",          rang: 1, cles: [/salon du cheval/i] },
    { nom: "Salon du Cheval de Nancy",          rang: 1, cles: [/nancy/i] },
    { nom: "Sologn'Pony",                       rang: 1, cles: [/sologn/i] },
    { nom: "Europoney",                         rang: 1, cles: [/rosi[eè]res/i, /euro\s*poney/i] },
    { nom: "Open de France",                    rang: 2, cles: [/open de france/i, /open region/i] },
    { nom: "BIP",                               rang: 2, cles: [/\bbip\b/i] },
    { nom: "Grand Parquet",                     rang: 2, cles: [/grand parqu/i] },
    { nom: "Classic Summer Tour",               rang: 2, cles: [/summer tour/i, /fontainebleau grandprix/i] }
  ];

  /* Les mêmes lieux sous plusieurs écritures. Confirmé par Blandine. */
  var MEMES_LIEUX = [
    { nom: "Milly-la-Forêt", cles: [/milly/i] }
  ];

  /* L'échelle des hauteurs d'épreuve.
     As Élite > As 1 > As 2 > Amateur > Poney Élite > Poney 1 > 2 > 3 > 4
     Poney 1 D = Poney 1.  Amateur 3 : même hauteur que Poney Élite mais
     concurrence plus dure, donc au-dessus.  Club : en bas, à confirmer.  */
  var HAUTEURS = [
    [/as\s*[ée]lite/i, 12], [/as\s*1/i, 11], [/as\s*2/i, 10],
    [/amateur\s*1/i, 9], [/amateur\s*2/i, 8], [/amateur\s*3/i, 7],
    [/poney\s*[ée]lite/i, 6], [/poney\s*1/i, 5], [/poney\s*2/i, 4],
    [/poney\s*3/i, 3], [/poney\s*4/i, 2], [/club/i, 1]
  ];

  /* La force d'un fait. L'ENJEU PRIME SUR LA HAUTEUR. */
  var FORCE = { titre: 5000, rdv1: 4000, chelem: 3000, rdv2: 2500,
                victoire: 2000, podium: 1000, classement: 500 };

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
              "août", "septembre", "octobre", "novembre", "décembre"];
  var PETITS = ["de", "du", "des", "la", "le", "les", "en", "et", "sur", "d", "l", "aux", "au"];

  /* ==== 2. LES PETITS OUTILS ============================================ */

  function rdvObj(lieu) {
    lieu = lieu || "";
    for (var i = 0; i < RDV.length; i++)
      for (var j = 0; j < RDV[i].cles.length; j++)
        if (RDV[i].cles[j].test(lieu)) return RDV[i];
    return null;
  }
  function rdvNom(lieu)  { var r = rdvObj(lieu); return r ? r.nom : null; }
  function rdvRang(lieu) { var r = rdvObj(lieu); return r ? r.rang : 0; }

  function lieuNormal(lieu) {
    lieu = lieu || "";
    for (var i = 0; i < MEMES_LIEUX.length; i++)
      for (var j = 0; j < MEMES_LIEUX[i].cles.length; j++)
        if (MEMES_LIEUX[i].cles[j].test(lieu)) return MEMES_LIEUX[i].nom;
    return lieu;
  }
  function memeLieu(a, b) { return lieuNormal(a) === lieuNormal(b); }

  function hauteur(ep) {
    for (var i = 0; i < HAUTEURS.length; i++)
      if (HAUTEURS[i][0].test(ep || "")) return HAUTEURS[i][1];
    return 0;
  }

  /* Le telemat écrit en capitales. On adoucit à l'affichage seulement :
     la donnée brute n'est jamais modifiée.                              */
  function joli(s) {
    if (!s) return "";
    if (s !== s.toUpperCase()) return s;
    return s.toLowerCase().split(/\s+/).map(function (m, i) {
      return (i > 0 && PETITS.indexOf(m) >= 0) ? m : m.charAt(0).toUpperCase() + m.slice(1);
    }).join(" ");
  }

  function ech(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function nb(x) { var n = parseInt(x, 10); return isNaN(n) ? null : n; }
  function suff(p) { return Number(p) === 1 ? "er" : "e"; }
  function enJours(d) { var t = new Date(d).getTime(); return isNaN(t) ? 0 : Math.floor(t / 86400000); }

  function dateLongue(d1, d2) {
    if (!d1) return "";
    var a = d1.split("-"), b = (d2 || d1).split("-");
    if (d1 === d2 || !d2) return Number(a[2]) + " " + MOIS[Number(a[1]) - 1] + " " + a[0];
    if (a[1] === b[1] && a[0] === b[0])
      return Number(a[2]) + " et " + Number(b[2]) + " " + MOIS[Number(a[1]) - 1] + " " + a[0];
    return Number(a[2]) + " " + MOIS[Number(a[1]) - 1] + " — " +
           Number(b[2]) + " " + MOIS[Number(b[1]) - 1] + " " + b[0];
  }
  function prenom(n) { return String(n || "").trim().split(/\s+/)[0] || ""; }
  function initiales(n) {
    return String(n || "?").trim().split(/\s+/)
      .map(function (m) { return m.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  /* ==== 3. LA LECTURE D'UNE LIGNE ========================================
     Une ligne de la table `resultats`. Les colonnes anciennes (concours,
     classement) restent lues : les saisies d'avant ne se perdent pas.    */

  function normaliser(r) {
    var place = nb(r.place), partants = nb(r.partants);
    /* Repli sur l'ancien champ texte quand les nouvelles cases sont vides */
    if (place === null && r.classement) {
      var m = String(r.classement).match(/(\d+)\s*(?:er|ère|e)?\s*\/\s*(\d+)/i);
      if (m) { place = nb(m[1]); partants = nb(m[2]); }
      else { var m2 = String(r.classement).match(/^\s*(\d+)/); if (m2) place = nb(m2[1]); }
    }
    return {
      id: r.id,
      date: r.date_epreuve || (r.created_at ? String(r.created_at).slice(0, 10) : null),
      ep: r.epreuve || r.classement || "",
      lieu: r.concours || "",
      place: place,
      partants: partants,
      quart: nb(r.quart),
      /* 06/09 : la mention du telemat (« SF ») et les points de qualification
         voyagent desormais jusqu'ici. Colonnes neuves : absentes = null, rien
         ne casse sur une base qui ne les a pas encore. */
      mention: r.mention || "",
      points: nb(r.points),
      cavalier: r.cavalier || "",
      origine: r.origine || "main",
      cheval_id: r.cheval_id || null,
      photo: r.photo_url || null,
      media: r.media_url || null,
      brut: r
    };
  }

  function estPrepa(x) { return /pr[ée]pa/i.test(x.ep || ""); }
  /* Saisie a la main = tout ce qui ne vient pas de l'import FFE. La colonne
     `origine` existait deja et n'etait lue nulle part a l'ecran. */
  function estMain(x) { return x.origine !== "import"; }
  /* Une victoire en preparatoire n'est pas une victoire en epreuve : elle se
     compte A PART, jamais dans le chiffre principal. */
  function estVPrepa(x) { return estPrepa(x) && x.place === 1; }
  function estV(x) { return !estPrepa(x) && x.place === 1; }
  function estP(x) { return !estPrepa(x) && x.place !== null && x.place <= 3; }
  /* Classé = premier quart. Le quart est DONNÉ par la FFE. */
  function estClasse(x) { return !estPrepa(x) && x.quart === 1; }
  /* 06/09 (Blandine) : un sans-faute compte, meme hors du premier quart. */
  function estSansFaute(x) {
    var t = String(x && x.mention || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!t) return false;
    return /(^|[^a-z])sf([^a-z]|$)/.test(t) || /sans\s*-?\s*faute/.test(t);
  }

  /* 01/09 (regle de Blandine, rectifiee en seance) : UNE SORTIE = UN CONCOURS.
     Le compteur additionnait les LIGNES : un week-end a cinq epreuves valait
     cinq sorties. Il compte desormais les rendez-vous, par le meme regroupement
     que la liste (meme lieu, jours qui se suivent a trois pres) — les prepas y
     entrent comme les autres epreuves, elles n'ajoutent donc pas de sortie
     quand elles tombent un jour deja compte.
     ⚠️ VICTOIRES, PODIUMS, CLASSEMENTS restent comptes LIGNE PAR LIGNE :
     trois victoires le meme week-end font trois victoires en une sortie.
     ⚠️ CETTE FONCTION N'APPELLE PAS `concours()` : `concours()` appelle
     `compte()`, l'appel croise ferait une recursion infinie. Le regroupement
     est donc refait ici, en plus court, et SANS filtre — un concours ou l'on
     n'a pas ete classe reste une sortie. */
  function nbSorties(ls) {
    var tri = ls.slice().sort(function (a, b) { return (a.date || "") < (b.date || "") ? -1 : 1; });
    var nb = 0, ident = null, fin = null;
    tri.forEach(function (x) {
      var id = rdvNom(x.lieu) || lieuNormal(x.lieu);
      if (ident !== null && id === ident && enJours(x.date) - enJours(fin) <= 3) { fin = x.date; return; }
      ident = id; fin = x.date; nb++;
    });
    return nb;
  }

  function compte(ls) {
    var v = 0, p = 0, c = 0, vp = 0;
    ls.forEach(function (x) {
      if (estV(x)) v++; if (estP(x)) p++; if (estClasse(x)) c++;
      if (estVPrepa(x)) vp++;
    });
    return { s: nbSorties(ls), v: v, p: p, c: c, vp: vp };
  }

  /* ==== 4. LES CONCOURS ==================================================
     Un concours = même rendez-vous (ou même lieu), jours qui se suivent
     à trois jours près. Le week-end de Bordeaux tient en un bloc.        */

  /* Une ligne saisie à la main n'a pas de quart : la FFE ne l'a pas donnée.
     Elle DOIT rester visible — sinon la cavalière l'enregistre et ne la
     revoit jamais. Elle ne compte pas dans les Classements pour autant. */
  function aMontrer(x) {
    return estClasse(x) || estSansFaute(x) || estPrepa(x) || (x.origine !== "import" && x.quart === null);
  }

  function concours(lignes, titres) {
    var tri = lignes.filter(aMontrer)
      .slice().sort(function (a, b) { return (a.date || "") < (b.date || "") ? -1 : 1; });

    var gr = [], cour = null;
    tri.forEach(function (x) {
      var ident = rdvNom(x.lieu) || lieuNormal(x.lieu);
      if (cour && cour.ident === ident && enJours(x.date) - enJours(cour.fin) <= 3) {
        cour.l.push(x); cour.fin = x.date;
      } else {
        cour = { lieu: x.lieu, ident: ident, deb: x.date, fin: x.date, l: [x] };
        gr.push(cour);
      }
    });

    gr.forEach(function (g) {
      g.l.sort(function (a, b) { return (a.place || 999) - (b.place || 999); });
      g.meilleur = g.l[0];
      g.rdv = rdvNom(g.lieu);
      g.rang = rdvRang(g.lieu);
      g.titre = titreDe(g, titres);
      g.cle = g.deb + "|" + g.ident;
      g.t = compte(g.l);
      g.ou = g.rdv || joli(lieuNormal(g.lieu));
    });
    return gr.reverse();
  }

  /* Les abréviations de la FFE ne sont pas constantes : « Championnat »
     ici, « Chp » là. On rabote avant de comparer.                        */
  function rabote(s) {
    return String(s || "").toLowerCase()
      .replace(/championnat/g, "chp").replace(/r[ée]gional/g, "reg")
      .replace(/d[ée]partemental/g, "dpt").replace(/circuit/g, "")
      .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function memeEpreuve(a, b) {
    var x = rabote(a), y = rabote(b);
    if (!x || !y) return false;
    return x === y || x.indexOf(y) === 0 || y.indexOf(x) === 0;
  }
  /* Le titre se rattache à une ÉPREUVE précise, pas au lieu ni à l'année :
     sinon un titre se collait à tous les concours du même endroit.       */
  function titreDe(g, titres) {
    if (!titres || !titres.length) return null;
    var an = (g.deb || "").slice(0, 4);
    var t = titres.filter(function (t) {
      if (String(t.an) !== an) return false;
      return g.l.some(function (r) {
        return memeLieu(t.lieu, r.lieu) && memeEpreuve(t.ep, r.ep);
      });
    })[0];
    return t ? t.titre : null;
  }

  function force(g) {
    var m = g.meilleur;
    var rang = g.titre ? FORCE.titre
      : (g.rang === 1 ? FORCE.rdv1
      : (g.rang === 2 ? FORCE.rdv2
      : (estV(m) ? FORCE.victoire : (estP(m) ? FORCE.podium : FORCE.classement))));
    return rang + hauteur(m.ep) * 20 + Math.min(99, m.partants || 0) / 100;
  }

  /* ==== 5. LES GRANDS MOMENTS ============================================
     UNE carte par concours, son fait le plus fort seulement.
     Cumul : même titre au même lieu, ou même rendez-vous. Les doubles et
     triples se cumulent tous ensemble — sinon neuf cartes identiques.    */

  function grandsMoments(gr) {
    var cartes = [];
    gr.forEach(function (g) {
      var nv = g.l.filter(estV).length, np = g.l.filter(estP).length, c = null;
      if (g.titre)          c = { genre: "titre",     kick: g.titre,               cle: "titre|" + g.titre + "|" + g.ou };
      else if (g.rang === 1) c = { genre: "rdv",       kick: "Grand rendez-vous",   cle: "rdv|" + g.rdv };
      else if (g.rang === 2) c = { genre: "echeance",  kick: "Très grosse échéance", cle: "rdv|" + g.rdv };
      else if (nv >= 3)      c = { genre: "triple-v",  kick: "Triple victoire",     cle: "tv" };
      else if (nv === 2)     c = { genre: "double-v",  kick: "Double victoire",     cle: "dv" };
      else if (np >= 3)      c = { genre: "triple-p",  kick: "Triple podium",       cle: "tp" };
      else if (np === 2)     c = { genre: "double-p",  kick: "Double podium",       cle: "dp" };
      if (!c) return;
      c.g = g; cartes.push(c);
    });

    var par = {}, ordre = [];
    cartes.forEach(function (c) {
      if (!par[c.cle]) { par[c.cle] = { modele: c, occ: [] }; ordre.push(c.cle); }
      par[c.cle].occ.push(c.g);
    });

    return ordre.map(function (k) {
      var b = par[k], c = b.modele;
      var occ = b.occ.slice().sort(function (x, y) { return x.deb < y.deb ? 1 : -1; });
      var ans = occ.map(function (g) { return (g.deb || "").slice(0, 4); });
      var uniq = ans.filter(function (a, i) { return ans.indexOf(a) === i; });
      var g0 = occ[0];
      var lx = {}; occ.forEach(function (g) { lx[g.ou] = 1; });
      var kl = Object.keys(lx);
      var ttl = c.genre === "titre" ? c.kick
        : c.genre === "triple-v" ? "Trois victoires"
        : c.genre === "double-v" ? "Deux victoires"
        : c.genre === "triple-p" ? "Trois podiums"
        : c.genre === "double-p" ? "Deux podiums"
        : g0.ou;
      return {
        genre: c.genre, kick: c.kick, occ: occ, nb: occ.length, ttl: ttl,
        doree: ["titre", "rdv", "echeance", "triple-v"].indexOf(c.genre) >= 0,
        lieu: kl.length === 1 ? kl[0] : kl.length + " concours",
        an: uniq.length > 1 ? uniq.slice().reverse().join(" · ") : uniq[0],
        force: Math.max.apply(null, occ.map(force))
      };
    }).sort(function (a, b) { return b.force - a.force; });
  }

  /* ==== 6. CE QUE LE PONEY DIT ==========================================
     Des phrases calculées sur les chiffres. Rien n'est inventé.          */

  function meilleur(ls, filtre, titres) {
    var v = ls.filter(filtre);
    if (!v.length) return null;
    return v.slice().sort(function (a, b) { return forceLigne(b, titres) - forceLigne(a, titres); })[0];
  }
  function forceLigne(x, titres) {
    var t = titreLigne(x, titres);
    var rg = rdvRang(x.lieu);
    return (t ? FORCE.titre : 0) + (rg === 1 ? FORCE.rdv1 : (rg === 2 ? FORCE.rdv2 : 0)) +
           hauteur(x.ep) * 20 + Math.min(99, x.partants || 0) / 100;
  }
  function titreLigne(x, titres) {
    if (!titres || !titres.length) return null;
    var t = titres.filter(function (t) {
      return String(t.an) === (x.date || "").slice(0, 4) &&
             memeLieu(t.lieu, x.lieu) && memeEpreuve(t.ep, x.ep);
    })[0];
    return t ? t.titre : null;
  }
  function ditRang(x) {
    if (x.place === null) return "classé";
    return x.place + suff(x.place) + (x.partants ? " sur " + x.partants : "");
  }
  function ditOu(x) { return rdvNom(x.lieu) || joli(lieuNormal(x.lieu)); }

  /* ==== 7. LE DESSIN ===================================================== */

  function blocTotaux(t) {
    function c(cl, n, l, sup) {
      return '<div class="hr-tot ' + cl + (sup ? " hr-tap\" data-hr-note=\"prepa" : "") +
             '"><div class="hr-n">' + n + (sup || "") +
             '</div><div class="hr-l">' + l + "</div></div>";
    }
    /* Les victoires en preparatoire s'affichent entre parentheses A COTE du
       chiffre, jamais dedans. Rien n'apparait quand il n'y en a aucune. */
    var par = t.vp ? '<span class="hr-par">(' + t.vp + ")</span>" : "";
    return '<div class="hr-totaux">' + c("hr-gris", t.s, "Sorties") +
           c("hr-or", t.v, "Victoires", par) +
           c("", t.p, "Podiums") + c("", t.c, "Classements") + "</div>" +
           (t.vp ? '<div class="hr-note" data-hr-note-corps="prepa">Entre parenth\u00e8ses : ' +
                   'les victoires en \u00e9preuve pr\u00e9paratoire. Elles comptent \u00e0 part, ' +
                   'jamais dans le chiffre des victoires.</div>' : "");
  }

  function blocMot(ls, titres, filtre) {
    var t = compte(ls);
    var v = meilleur(ls, estV, titres);
    var p = meilleur(ls, function (x) { return estP(x) && x.place !== 1; }, titres);
    var c = meilleur(ls, function (x) { return estClasse(x) && !estP(x); }, titres);

    /* Quand plusieurs podiums tombent au même concours, on les annonce
       tous : ne montrer que le 3e ferait croire qu'il n'a fait que 3e.  */
    function rangsDuConcours(x) {
      var meme = ls.filter(function (o) {
        return o.lieu === x.lieu && Math.abs(enJours(o.date) - enJours(x.date)) <= 3 && estP(o);
      }).sort(function (a, b) { return a.place - b.place; });
      if (meme.length < 2) return ditRang(x);
      var r = meme.map(function (o) { return o.place + suff(o.place); });
      return r.slice(0, -1).join(", ") + " et " + r[r.length - 1];
    }
    function ligne(lb, val, ou) {
      return '<p class="hr-ml"><span class="hr-lb">' + ech(lb) + "</span>" +
             '<span class="hr-vl"><b>' + ech(val) + "</b> — " + ech(ou) + "</span></p>";
    }
    var h = '<div class="hr-mot"><div class="hr-dit">';
    h += '<p class="hr-tete"><b>' + t.v + " victoire" + (t.v > 1 ? "s" : "") + "</b> en " +
         t.s + " sortie" + (t.s > 1 ? "s" : "") +
         (filtre ? " avec " + ech(prenom(filtre)) : "") + "</p>";
    if (v) h += ligne("Sa plus belle", titreLigne(v, titres) || ditRang(v), ditOu(v));
    if (p) h += ligne("Son plus beau podium", rangsDuConcours(p), ditOu(p));
    if (c) h += ligne("Son plus beau classement", ditRang(c), ditOu(c));
    return h + "</div></div>";
  }

  function blocRail(gm, choisi) {
    if (!gm.length) return "";
    var h = '<div class="hr-st">Ses grands moments<em>' + gm.length + "</em></div>" +
            '<div class="hr-rail">';
    gm.forEach(function (x, i) {
      h += '<div class="hr-aff' + (x.doree ? " hr-d" : "") + (choisi === i ? " hr-on" : "") +
        '" data-hr-aff="' + i + '"><div class="hr-ab">' +
        '<div class="hr-kick">' + ech(x.kick) + "</div>" +
        '<div class="hr-ttl">' + ech(x.ttl) + "</div>" +
        '<div class="hr-an">' + (x.nb > 1 ? "<b>à " + x.nb + " occasions</b>" : ech(x.lieu)) + "</div>" +
        blocOccs(x) + "</div></div>";
    });
    h += "</div>";
    if (choisi === null || !gm[choisi]) return h;

    var x = gm[choisi];
    h += '<div class="hr-detail"><div class="hr-dh"><div class="hr-kick">' + ech(x.kick) + "</div>" +
      "<b>" + ech(x.ttl) + "</b><span>" + (x.nb > 1 ? "à " + x.nb + " occasions · " : "") +
      ech(x.lieu) + "</span></div>";
    x.occ.forEach(function (g) {
      h += '<div class="hr-occ"><div class="hr-oa">' + (g.deb || "").slice(0, 4) + "</div>" +
        '<div class="hr-oq">' + ech(dateLongue(g.deb, g.fin)) + " · " + ech(g.ou) + "</div>";
      g.l.forEach(function (r) { h += ligneEpreuve(r, true); });
      h += "</div>";
    });
    return h + "</div>";
  }

  function blocOccs(x) {
    var vus = x.occ.slice(0, 3), reste = x.occ.length - vus.length;
    var h = '<div class="hr-occs">';
    vus.forEach(function (g) {
      var rangs = g.l.slice().sort(function (a, b) { return (a.place || 999) - (b.place || 999); })
        .map(function (r) {
          return '<i class="' + (estV(r) ? "hr-v" : (estP(r) ? "hr-p" : "")) + '">' +
            (r.place === null ? "—" : r.place + suff(r.place)) + "</i>" +
            (r.partants ? "<u>/" + r.partants + "</u>" : "");
        }).join('<em>·</em>');
      h += '<div class="hr-o"><span class="hr-y">' + (g.deb || "").slice(0, 4) + "</span>" +
           '<span class="hr-r">' + rangs + "</span></div>";
    });
    if (reste > 0) h += '<div class="hr-o hr-encore">▾ dérouler les ' + x.occ.length + "</div>";
    return h + "</div>";
  }

  function ligneEpreuve(r, nu) {
    var cl = estPrepa(r) ? "" : (estV(r) ? "hr-v" : (estP(r) ? "hr-p" : ""));
    return '<div class="hr-li"><span class="hr-rg ' + cl + '">' +
      (r.place === null ? "—" : r.place + suff(r.place)) + "</span>" +
      '<span class="hr-e"><span class="hr-ep">' +
      (estMain(r) ? '<span class="hr-mn">\u270E</span>' : "") + ech(r.ep) +
      (estPrepa(r) ? '<span class="hr-etq hr-pale">Préparatoire</span>' : "") + "</span>" +
      '<span class="hr-nb"><b>' +
      (r.partants ? (r.place === null ? "" : r.place + suff(r.place) + " sur ") + r.partants
                  : "partants non donnés") + "</b>" +
      (r.cavalier ? " · " + ech(joli(r.cavalier)) : "") + "</span></span></div>";
  }

  function blocCavaliers(ls, filtre) {
    var m = {};
    ls.forEach(function (x) { if (x.cavalier) (m[x.cavalier] = m[x.cavalier] || []).push(x); });
    var cles = Object.keys(m);
    if (cles.length < 2) return "";
    function bloc(cle, nom, lst) {
      var t = compte(lst);
      var a = lst.map(function (x) { return (x.date || "").slice(0, 4); }).sort();
      var per = a.length ? (a[0] === a[a.length - 1] ? a[0] : a[0] + " — " + a[a.length - 1]) : "";
      return '<div class="hr-cav' + (filtre === cle ? " hr-on" : "") + '" data-hr-cav="' + ech(cle) + '">' +
        '<span class="hr-ini">' + initiales(nom) + '</span><div class="hr-nm"><b>' + ech(joli(nom)) + "</b>" +
        '<div class="hr-ca">' + t.s + " sorties · " + per + "</div>" +
        '<div class="hr-ch"><i class="hr-v">' + t.v + "</i> victoires &nbsp;·&nbsp; " +
        '<i class="hr-p">' + t.p + "</i> podiums &nbsp;·&nbsp; " +
        '<i class="hr-c">' + t.c + "</i> classements</div></div>" +
        '<span class="hr-fl">›</span></div>';
    }
    var h = '<div class="hr-st">Ses cavaliers</div><div class="hr-cavs">';
    h += bloc("", "Tous ses cavaliers", ls);
    cles.sort(function (a, b) { return m[b].length - m[a].length; })
      .forEach(function (c) { h += bloc(c, c, m[c]); });
    return h + "</div>";
  }

  function blocEncart(g, ouvert) {
    var m = g.meilleur;
    var cl = "hr-enc" + (g.titre || g.rang === 1 ? " hr-d" : (g.rang === 2 ? " hr-e" : "")) +
             (ouvert ? " hr-ouv" : "");
    var h = '<div class="' + cl + '" data-hr-enc="' + ech(g.cle) + '">';
    h += '<div class="hr-eh"><div class="hr-gros ' +
      (estV(m) ? "hr-v" : (estP(m) ? "hr-p" : "")) + '">' +
      (m.place === null ? "—" : m.place + "<sup>" + suff(m.place) + "</sup>") +
      (m.partants ? '<span class="hr-sur">/' + m.partants + "</span>" : "") + "</div>";
    h += '<div class="hr-co">';
    if (g.titre) {
      h += '<div class="hr-sacre">' + ech(g.titre) + "</div>";
      h += '<div class="hr-nom hr-sous">' + ech(g.ou) + "</div>";
    } else {
      h += '<div class="hr-nom">' + ech(g.ou) + "</div>";
    }
    /* Carte fermee : la plume n'apparait que si TOUT le concours est manuel.
       Sinon elle mentirait sur les lignes officielles cachees dessous. */
    var toutMain = g.l.length > 0 && g.l.every(estMain);
    h += '<div class="hr-qd">' + (toutMain ? '<span class="hr-mn">\u270E</span>' : "") +
      ech(dateLongue(g.deb, g.fin)) +
      (g.l.length > 1 ? " · " + g.l.length + " épreuves" : "") + "</div>";
    if (g.rdv) h += '<div class="hr-ets"><span class="hr-etq' +
      (g.rang === 2 ? " hr-pale" : "") + '">' + ech(g.rdv) + "</span></div>";
    h += "</div>";
    h += '<div class="hr-vg" data-hr-vis="' + ech(g.cle) + '"><span>+</span></div>';
    h += '<div class="hr-ind"><span class="hr-ch2">›</span></div></div>';

    h += '<div class="hr-epr">';
    g.l.forEach(function (r) { h += ligneEpreuve(r); });
    h += "</div>";

    h += '<div class="hr-album"><div class="hr-vierge">Rien de gardé de ce concours.<br>' +
      "<b>+ ajouter des photos, une vidéo, un souvenir</b></div></div>";
    return h + "</div>";
  }

    /* force · date · hauteur — le cavalier choisit. */
  function comparer(tri) {
    if (tri === "date")
      return function (x, y) { return x.deb < y.deb ? 1 : -1; };
    if (tri === "hauteur")
      return function (x, y) {
        var d = hauteur(y.meilleur.ep) - hauteur(x.meilleur.ep);
        if (d !== 0) return d;
        var p = (y.meilleur.partants || 0) - (x.meilleur.partants || 0);
        return p !== 0 ? p : (x.deb < y.deb ? 1 : -1);
      };
    return function (x, y) {
      var d = force(y) - force(x);
      return d !== 0 ? d : (x.deb < y.deb ? 1 : -1);
    };
  }

  function blocSelecteurTri(tri) {
    var opts = [["force", "Les plus forts"], ["date", "Par date"], ["hauteur", "Par hauteur"]];
    return '<div class="hr-tri">' + opts.map(function (o) {
      return '<b class="' + (tri === o[0] ? "hr-on" : "") + '" data-hr-tri="' + o[0] + '">' +
             o[1] + "</b>";
    }).join("") + "</div>";
  }

function blocListe(gr, fermees, ouverts, filtre, tri) {
    var m = {};
    gr.forEach(function (g) { var a = (g.deb || "").slice(0, 4); (m[a] = m[a] || []).push(g); });
    var h = '<div class="hr-st">' + (filtre ? "Ses concours avec " + ech(prenom(filtre)) : "Ses concours") +
            "<em>" + gr.length + "</em></div>";
    h += blocSelecteurTri(tri) + '<div class="hr-liste">';
    Object.keys(m).sort().reverse().forEach(function (a) {
      var gs = m[a], f = fermees[a] ? " hr-ferme" : "";
      var tous = []; gs.forEach(function (g) { tous = tous.concat(g.l); });
      var t = compte(tous);
      h += '<div class="hr-at' + f + '" data-hr-an="' + a + '"><span class="hr-yy">' + a + "</span>" +
        '<span class="hr-rs"><i>' + t.v + "</i> victoire" + (t.v > 1 ? "s" : "") +
        " &nbsp;·&nbsp; " + t.p + " podium" + (t.p > 1 ? "s" : "") +
        " &nbsp;·&nbsp; " + gs.length + " concours</span><span class=\"hr-ch2\">▾</span></div>";
      h += '<div class="hr-ac' + f + '" data-hr-corps="' + a + '">';
      /* Le tri joue DANS chaque année : le groupement par année reste,
         sinon on perd le repère du temps.  (Blandine, 22/08)            */
      gs.slice().sort(comparer(tri)).forEach(function (g) {
        h += blocEncart(g, !!ouverts[g.cle]);
      });
      h += "</div>";
    });
    return h + "</div>";
  }

  /* ==== 8. LE POINT D'ENTRÉE ============================================
     hote    : l'élément où dessiner
     options : { lignes, titres, proprietaire, onAjout, onImport }        */

  var CLE_TRI = "hype_res_tri";
  function triRetenu() {
    try { return window.localStorage.getItem(CLE_TRI) || "force"; } catch (e) { return "force"; }
  }
  function retenirTri(t) {
    try { window.localStorage.setItem(CLE_TRI, t); } catch (e) { }
  }
  var ETAT = { filtre: "", choisi: null, fermees: {}, ouverts: {}, tri: triRetenu() };

  function rendre(hote, options) {
    if (!hote) return;
    poserStyle();
    if (hote.className.indexOf("hr-zone") < 0) hote.className += " hr-zone";
    options = options || {};
    var titres = options.titres || [];
    var toutes = (options.lignes || []).map(normaliser);
    var ls = ETAT.filtre
      ? toutes.filter(function (x) { return x.cavalier === ETAT.filtre; })
      : toutes;

    if (!toutes.length) {
      hote.innerHTML = '<div class="hr-rien">Aucun résultat pour l\'instant.</div>' +
        (options.proprietaire ? '<button class="hr-bt" data-hr="import">⤓ Importer mes résultats</button>' : "");
      brancher(hote, options);
      return;
    }

    var gr = concours(ls, titres);
    var gm = grandsMoments(gr);
    var h = blocTotaux(compte(ls));
    h += blocMot(ls, titres, ETAT.filtre);
    h += blocRail(gm, ETAT.choisi);
    h += blocCavaliers(toutes, ETAT.filtre);
    h += blocListe(gr, ETAT.fermees, ETAT.ouverts, ETAT.filtre, ETAT.tri);
    /* Un seul bouton : « Ajouter » existe deja dans l index, juste dessous.
       En poser un second faisait doublon a l ecran (vu le 22/08).       */
    if (options.proprietaire) {
      h += '<button class="hr-bt" data-hr="import">⤓ Importer mes résultats</button>';
    }
    hote.innerHTML = h;
    brancher(hote, options);
  }

  function brancher(hote, options) {
    function refaire() { rendre(hote, options); }

    hote.querySelectorAll("[data-hr-aff]").forEach(function (el) {
      el.addEventListener("click", function () {
        var i = Number(el.getAttribute("data-hr-aff"));
        ETAT.choisi = (ETAT.choisi === i) ? null : i;
        refaire();
      });
    });
    hote.querySelectorAll("[data-hr-cav]").forEach(function (el) {
      el.addEventListener("click", function () {
        ETAT.filtre = el.getAttribute("data-hr-cav") || "";
        ETAT.choisi = null; ETAT.fermees = {}; ETAT.ouverts = {};
        refaire();
        if (hote.scrollTop !== undefined) hote.scrollTop = 0;
      });
    });
    hote.querySelectorAll("[data-hr-an]").forEach(function (el) {
      el.addEventListener("click", function () {
        var a = el.getAttribute("data-hr-an");
        ETAT.fermees[a] = !ETAT.fermees[a];
        el.classList.toggle("hr-ferme");
        var c = hote.querySelector('[data-hr-corps="' + a + '"]');
        if (c) c.classList.toggle("hr-ferme");
      });
    });
    hote.querySelectorAll("[data-hr-enc]").forEach(function (el) {
      el.addEventListener("click", function () {
        var c = el.getAttribute("data-hr-enc");
        ETAT.ouverts[c] = !ETAT.ouverts[c];
        el.classList.toggle("hr-ouv");
      });
    });
    hote.querySelectorAll("[data-hr-vis]").forEach(function (el) {
      el.addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (typeof options.onSouvenirs === "function") options.onSouvenirs(el.getAttribute("data-hr-vis"));
      });
    });
    hote.querySelectorAll("[data-hr-tri]").forEach(function (el) {
      el.addEventListener("click", function () {
        ETAT.tri = el.getAttribute("data-hr-tri");
        retenirTri(ETAT.tri);
        refaire();
      });
    });
    /* La note des prepas s'ouvre au toucher de la case Victoires. Pas de
       nouveau rendu : on bascule une classe, l'etat des autres blocs ne bouge
       pas et rien ne clignote. */
    hote.querySelectorAll("[data-hr-note]").forEach(function (el) {
      el.addEventListener("click", function () {
        var c = hote.querySelector('[data-hr-note-corps="' + el.getAttribute("data-hr-note") + '"]');
        if (c) c.classList.toggle("hr-on");
      });
    });
    hote.querySelectorAll('[data-hr="import"]').forEach(function (el) {
      el.addEventListener("click", function () {
        if (typeof options.onImport === "function") options.onImport();
      });
    });
    hote.querySelectorAll('[data-hr="ajout"]').forEach(function (el) {
      el.addEventListener("click", function () {
        if (typeof options.onAjout === "function") options.onAjout();
      });
    });
  }

  /* 01/09 — TRI IMPOSE A L'OUVERTURE. « Performances en concours » doit ouvrir
     PAR DATE (decision de Blandine), alors que le tri est retenu dans le
     localStorage et PARTAGE avec la page resultats d'un cheval. L'appelant
     passe donc son tri ici : reinitialiser("date").
     ⚠️ On n'ecrit PAS dans le localStorage : le choix de Blandine sur une fiche
     cheval n'est pas ecrase, et la page club rouvrira toujours par date.
     ⚠️ Le selecteur reste actif : elle peut changer de tri une fois entree. */
  function reinitialiser(tri) {
    ETAT = { filtre: "", choisi: null, fermees: {}, ouverts: {}, tri: tri || triRetenu() };
  }

  /* ==== 9. CE QU'ON EXPOSE =============================================== */
  var API = {
    rendre: rendre,
    reinitialiser: reinitialiser,
    /* utilitaires exposés pour les bancs d'essai et l'import */
    normaliser: normaliser, compte: compte, concours: concours,
    grandsMoments: grandsMoments, force: force, hauteur: hauteur,
    rdvNom: rdvNom, rdvRang: rdvRang, lieuNormal: lieuNormal,
    estClasse: estClasse, aMontrer: aMontrer, estV: estV, estP: estP, estPrepa: estPrepa,
    estSansFaute: estSansFaute,
    estMain: estMain, estVPrepa: estVPrepa, nbSorties: nbSorties,
    joli: joli, dateLongue: dateLongue,
    RDV: RDV, MEMES_LIEUX: MEMES_LIEUX, HAUTEURS: HAUTEURS
  };

  if (typeof window !== "undefined") window.HYPE_RESULTATS = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})();
