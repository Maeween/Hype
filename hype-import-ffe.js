/* ============================================================================
   HYPE — IMPORT DES RÉSULTATS FFE
   Fichier détaché, chargé par index.html à la demande.
   Écrit le 22/08/2026 (session 152).

   Ce qu'il fait :
     · ouvre un PDF telemat choisi par la cavalière
     · le lit AVEC LES POSITIONS des mots, pas dans l'ordre du flux
     · reconstruit les fiches, ligne par ligne
     · rend une liste à relire — RIEN n'est enregistré sans validation

   Ce qu'il ne fait PAS :
     · il ne calcule JAMAIS le quart. La FFE le donne, on le lit.
     · il n'écrit rien en base tout seul.

   🔴 LE PIÈGE, écrit au SUIVI et vérifié ici :
   dans un PDF, les mots arrivent dans l'ordre où ils ont été DESSINÉS,
   pas dans l'ordre où on les lit. « 38e / 47 » ressort en « 38 / 47 e ».
   On regroupe donc les fragments par LIGNE (leur hauteur à l'écran),
   puis on les trie de gauche à droite. Sans ça, tout se mélange.
   ========================================================================== */

(function () {
  "use strict";

  var PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
  var PDFJS_WORKER = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  var chargement = null;

  /* ==== 1. CHARGER PDF.js — seulement quand on en a besoin =============
     Un mégaoctet : hors de question de l'imposer à toutes les cavalières
     au démarrage. Même méthode que l'app pour OpenCV.                  */
  function chargerPdfJs() {
    if (typeof window !== "undefined" && window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (chargement) return chargement;
    chargement = new Promise(function (ok, non) {
      var s = document.createElement("script");
      s.src = PDFJS_URL;
      s.onload = function () {
        try {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
          ok(window.pdfjsLib);
        } catch (e) { non(e); }
      };
      s.onerror = function () { non(new Error("PDF.js n'a pas pu être chargé")); };
      document.head.appendChild(s);
    });
    return chargement;
  }

  /* ==== 2. LIRE LE PDF EN GARDANT LES POSITIONS ========================
     Chaque fragment porte ses coordonnées. On les range par ligne
     (même hauteur à 2,5 points près), puis de gauche à droite.        */
  function texteDuPdf(fichier) {
    return chargerPdfJs().then(function (pdfjsLib) {
      return fichier.arrayBuffer();
    }).then(function (buf) {
      return window.pdfjsLib.getDocument({ data: buf }).promise;
    }).then(function (doc) {
      var pages = [];
      for (var i = 1; i <= doc.numPages; i++) pages.push(i);
      return pages.reduce(function (chaine, n) {
        return chaine.then(function (acc) {
          return doc.getPage(n).then(function (page) {
            return page.getTextContent();
          }).then(function (tc) {
            return acc + "\n" + lignesDePage(tc.items);
          });
        });
      }, Promise.resolve(""));
    });
  }

  var MOJI_CP1252 = { 8364:128, 8218:130, 402:131, 8222:132, 8230:133, 8224:134, 8225:135, 710:136, 8240:137, 352:138, 8249:139, 338:140, 381:142, 8216:145, 8217:146, 8220:147, 8221:148, 8226:149, 8211:150, 8212:151, 732:152, 8482:153, 353:154, 8250:155, 339:156, 382:158, 376:159 };
  function reparerMojibake(t) {
    /* 26/08 : certains telemat sortent leurs accents en UTF-8 relu en Windows-1252
       (parfois DEUX fois) : « Préparatoire » devient « PrÃ©paratoire » puis
       « PrÃƒÂ©paratoire ». On inverse la faute octet par octet, et on ne garde le
       résultat QUE si le décodage UTF-8 strict réussit — sinon on ne touche rien.
       « Âge », « À bientôt » et tout texte sain échouent au décodage strict et
       ressortent intacts. Au plus 2 tours. */
    var tR = String(t || ""), tours = 0;
    if (typeof TextDecoder === "undefined") return tR;
    while (tours < 2 && /[\u00c2\u00c3]/.test(tR)) {
      var octs = [];
      for (var iM = 0; iM < tR.length; iM++) {
        var cM = tR.charCodeAt(iM);
        if (cM < 256) octs.push(cM);
        else if (MOJI_CP1252[cM] !== undefined) octs.push(MOJI_CP1252[cM]);
        else { octs = null; break; }
      }
      if (!octs) break;
      try {
        var tD = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(octs));
        if (!tD || tD === tR) break;
        tR = tD; tours++;
      } catch (eMj) { break; }
    }
    return tR;
  }
  function lignesDePage(items) {
    var lignes = [];
    items.forEach(function (it) {
      var t = reparerMojibake(String(it.str || ""));
      t = t.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, ""); /* 26/08 : Postgres refuse \u0000 et consorts (« unsupported Unicode escape sequence ») — l'erreur enfin VISIBLE de Blandine, 08h34. On purge apres reparation (elle a besoin des octets 80-9F). */
      if (!t.trim()) return;
      var y = Math.round((it.transform ? it.transform[5] : 0) * 10) / 10;
      var x = it.transform ? it.transform[4] : 0;
      /* on cherche une ligne déjà ouverte à la même hauteur (± 2,5 pts) */
      var l = null;
      for (var i = 0; i < lignes.length; i++) {
        if (Math.abs(lignes[i].y - y) <= 2.5) { l = lignes[i]; break; }
      }
      if (!l) { l = { y: y, mots: [] }; lignes.push(l); }
      l.mots.push({ x: x, t: t });
    });
    lignes.sort(function (a, b) { return b.y - a.y; });   /* de haut en bas */
    return lignes.map(function (l) {
      l.mots.sort(function (a, b) { return a.x - b.x; }); /* de gauche à droite */
      return reparerMojibake(l.mots.map(function (m) { return m.t; }).join(" "))
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
        .replace(/\s+/g, " ").trim(); /* 26/08 : reparation AUSSI sur la ligne assemblee — « PrÃ©paratoire » arrivait coupe en fragments, la reparation par fragment le ratait */
    }).join("\n");
  }

  /* ==== 3. LE LECTEUR — repris du banc d'essai, éprouvé sur 7 saisons == */

  var ETIQUETTES = [
    { cle: "date",       lib: "Date" },
    { cle: "epreuve",    lib: "Épreuve" },
    { cle: "concours",   lib: "Concours" },
    { cle: "classement", lib: "Classement" },
    { cle: "monteur",    lib: "Monté par" },
    { cle: "points",     lib: "Pts qualif. Chpt" },
    { cle: "quart",      lib: "Quart" }
  ];

  /* 02/09 (Blandine) : « pourquoi plusieurs Margot apparaissent alors que c'est la
     meme ? » — constate en base : « MARGOT KHOURY Note/Score » (15 lignes) a cote de
     « MARGOT KHOURY » (14 lignes). CAUSE TROUVEE ICI : « Note/Score » est un EN-TETE
     DE COLONNE du telemat. Il n'est pas dans ETIQUETTES, il tombe donc dans la regle
     de continuation (« ce qui suit prolonge le dernier champ ») et se colle au nom du
     monteur. Meme defaut deja consigne sur « THELMA VANDEVILLE Note/Score ».
     Ces lignes ne sont ni une etiquette ni une valeur : on les saute purement. */
  var ENTETES_COLONNE = /^(Note\s*\/\s*Score|Note|Score|Pts|Points|Gains|Rang|Dossard|Partants|Places?)$/i;

  function etiquetteDe(ligne) {
    for (var i = 0; i < ETIQUETTES.length; i++) {
      var lib = ETIQUETTES[i].lib;
      if (ligne === lib) return { cle: ETIQUETTES[i].cle, valeur: "" };
      if (ligne.indexOf(lib + " ") === 0)
        return { cle: ETIQUETTES[i].cle, valeur: ligne.slice(lib.length).trim() };
    }
    return null;
  }

  function nb(x) { var n = parseInt(String(x || "").replace(/[^\d]/g, ""), 10); return isNaN(n) ? null : n; }

  /* Le classement et tous ses visages, vus en vrai dans tes sept PDF :
     « 38e / 47 » · « 1er / 3 » · « 12e / 26 - SF » · « El. / 42 »
     · « Epreuve annulee » · « Non Partant - Forfait » · « Ab. / 3 »   */
  function lireClassement(txt) {
    var t = String(txt || "").replace(/\s+/g, " ").trim();
    if (!t) return { statut: "absent" };
    if (/^[ÉE]preuve\s+annul/i.test(t))  return { statut: "annulee" };
    if (/^(El\.?|Elim)/i.test(t))        return { statut: "elimine", partants: nb(t.split("/")[1]) };
    if (/^(NP|Non\s*Part)/i.test(t))     return { statut: "non_partant" };
    if (/^(Ab\.?|Aband)/i.test(t))       return { statut: "abandon", partants: nb(t.split("/")[1]) };
    var m = t.match(/^(\d+)\s*(?:er|ère|e)?\s*\/\s*(\d+)\s*(?:-\s*(.+))?$/i);
    if (m) return { statut: "classe", place: nb(m[1]), partants: nb(m[2]), mention: (m[3] || "").trim() };
    /* forme déformée : le suffixe ordinal rejeté en fin de ligne */
    m = t.match(/^(\d+)\s*\/\s*(\d+)\s*(?:-\s*(.+?))?\s+(?:er|ère|e)$/i);
    if (m) return { statut: "classe", place: nb(m[1]), partants: nb(m[2]),
                    mention: (m[3] || "").trim(), deforme: true };
    return { statut: "illisible", brut: t };
  }

  function lireQuart(txt) { var m = String(txt || "").match(/(\d)\s*(?:er|ère|e)?/i); return m ? parseInt(m[1], 10) : null; }
  function lireDate(txt) {
    var m = String(txt || "").match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return m ? m[3] + "-" + m[2] + "-" + m[1] : null;
  }
  /* Sert UNIQUEMENT de contrôle : on n'écrit jamais ce quart-là.
     Règle retrouvée avec Blandine, vérifiée 21 fois sur 21 :
     taille d'un quart = partants ÷ 4, ARRONDI AU SUPÉRIEUR.          */
  function quartAttendu(place, partants) {
    if (!place || !partants) return null;
    return Math.min(4, Math.ceil(place / Math.ceil(partants / 4)));
  }

  function extraireOrigines(lignes) {
    /* 26/08 : l'EN-TETE du telemat porte l'identite officielle du cheval.
       Motifs valides sur le PDF reel de Vallieres (Vallieres_2024.pdf) :
         « Selle Francais né le 15/03/2009 »
         « Robe : Bai | Sexe : Femelle | Taille : Catégorie F »
         « Père : → Nighthawk Mère : → Maelia Varennes »
         « Naisseur : LES VALLIERES »                                    */
    var o = {};
    (lignes || []).forEach(function (t) {
      var mR;
      if (!o.pere && (mR = t.match(/^P[e\u00e8]re\s*:\s*\u2192?\s*(.+?)\s+M[e\u00e8]re\s*:\s*\u2192?\s*(.+)$/i))) { o.pere = mR[1].trim(); o.mere = mR[2].trim(); }
      /* 02/09 (Ecolo Louvo, « origine CONSTATEE ») : l'app affichait « Qif Elmy × — ».
         Le motif ci-dessus exige que le pere ET la mere tiennent sur UNE SEULE ligne,
         avec la fleche exactement a sa place. Des que le telemat coupe la ligne en
         deux, ou glisse un separateur, la mere est perdue en silence. Deux motifs
         separes en secours : chacun se lit tout seul, dans n'importe quel ordre.
         ⚠️ Ne pas confondre les deux mentions FFE : « origine NON constatee » =
         filiation inconnue, il n'y a rien a recuperer (cas de Dakota CA, l'app est
         alors juste) ; « origine constatee » = filiation connue, un manque est un
         vrai defaut. */
      else if (!o.pere && (mR = t.match(/^P[e\u00e8]re\s*:\s*\u2192?\s*([^|]+?)\s*$/i))) { o.pere = mR[1].trim(); }
      else if (!o.mere && (mR = t.match(/^M[e\u00e8]re\s*:\s*\u2192?\s*([^|]+?)\s*$/i))) { o.mere = mR[1].trim(); }
      else if (!o.robe && (mR = t.match(/^Robe\s*:\s*([^|]+)\|\s*Sexe\s*:\s*([^|]+)\|\s*Taille\s*:\s*(.+)$/i))) { o.robe = mR[1].trim(); o.sexe = mR[2].trim(); o.taille = mR[3].trim(); }
      else if (!o.naissance && (mR = t.match(/^([A-Za-z\u00c0-\u00ff' -]{3,40})\s+n[e\u00e9]e?\s+le\s+(\d{2}\/\d{2}\/\d{4})$/i))) { o.race = mR[1].trim(); o.naissance = mR[2]; }
      else if (!o.naisseur && (mR = t.match(/^Naisseur\s*:\s*(.+)$/i))) { o.naisseur = mR[1].trim(); }
    });
    return (o.pere || o.mere || o.robe || o.naissance) ? o : null;
  }
  function lireFiches(texte) {
    var lignes = String(texte).split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    try { if (typeof window !== "undefined") window.__hypeOriginesFFE = extraireOrigines(lignes); } catch (eOx) { try { window.__hypeOriginesFFE = null; } catch (eOx2) { } } /* 26/08 (corrige 12h05) : le lecteur vit dans le BLOC 1, sans la variable d etat E du bloc 2 — la premiere greffe y referencait E et cassait TOUTE lecture (« Can't find variable: E », capture Blandine 12h02). Pont par window. */
    try { /* 26/08 soir : VERROU D'IDENTITE — on lit AUSSI le nom du cheval dans l'en-tete du telemat (la ligne juste au-dessus de « … né le JJ/MM/AAAA ») ; l'ecrivain refusera un telemat qui ne correspond pas a la fiche ouverte (72 lignes de Rizotto ont ete retrouvees sur Vallieres). */
      var nomPdfX = null;
      for (var iN = 0; iN + 1 < lignes.length; iN++) {
        if (/n[e\u00e9]e?\s+le\s+\d{2}\/\d{2}\/\d{4}/i.test(lignes[iN + 1]) && /^[A-Z\u00c0-\u00dc0-9' .-]{2,40}$/.test(lignes[iN].trim()) && !/^(Robe|P[e\u00e8]re|Naisseur|Date|Selle|Poney)\b/i.test(lignes[iN].trim())) { nomPdfX = lignes[iN].trim(); break; }
      }
      if (typeof window !== "undefined") window.__hypeNomPdfFFE = nomPdfX;
    } catch (eNp) { }
    var fiches = [], cour = null, derniere = null;
    for (var i = 0; i < lignes.length; i++) {
      var ligne = lignes[i];
      if (ligne === "+") continue;
      if (ENTETES_COLONNE.test(ligne)) continue; /* 02/09 : en-tete de colonne, jamais une valeur */
      var e = etiquetteDe(ligne);
      if (e && e.cle === "date" && /\d{2}\/\d{2}\/\d{4}/.test(e.valeur)) {
        if (cour) fiches.push(cour);
        cour = { date: e.valeur }; derniere = "date"; continue;
      }
      if (!cour) continue;
      if (e) {
        /* Piège vu en vrai : quand le nom de l'épreuve tient sur deux
           lignes, l'étiquette « Épreuve » arrive APRÈS sa valeur.    */
        if (e.cle === "epreuve" && e.valeur === "" && cour.attente) {
          cour.epreuve = cour.attente; delete cour.attente;
        } else { cour[e.cle] = e.valeur; }
        derniere = e.cle; continue;
      }
      /* La date, le quart et les points ne se poursuivent JAMAIS sur
         deux lignes : ce qui suit est le début d'une épreuve.        */
      var suite = derniere && ["date", "quart", "points"].indexOf(derniere) === -1;
      if (suite && cour[derniere] !== undefined && cour[derniere] !== "")
        cour[derniere] = (cour[derniere] + " " + ligne).trim();
      else cour.attente = (cour.attente ? cour.attente + " " : "") + ligne;
    }
    if (cour) fiches.push(cour);
    return fiches.filter(function (f) {
      return f.classement !== undefined || f.concours !== undefined;
    });
  }

  function lire(texte) {
    var sorties = [], alertes = [];
    lireFiches(texte).forEach(function (f, rang) {
      var c = lireClassement(f.classement);
      var q = lireQuart(f.quart);
      var r = {
        rang: rang + 1,
        date: lireDate(f.date),
        epreuve: (f.epreuve || f.attente || "").replace(/^CSO\s+/i, "").replace(/\s+/g, " ").trim(),
        /* 22/08 : le suffixe ordinal de la forme déformée « 1 / 13 er »
           restait collé au nom du concours (« MAGNANVILLE er »).      */
        concours: (f.concours || "").replace(/\s+/g, " ").trim()
                    .replace(/\s+(er|ère|e)$/i, "").trim(),
        cavalier: (f.monteur || "").replace(/\s+/g, " ").trim()
                    /* 02/09 : ceinture. Meme si un en-tete inconnu se collait au nom,
                       il ne part plus en base. On ne coupe jamais s'il resterait moins
                       de deux mots, pour ne pas amputer un vrai patronyme. */
                    .replace(/\s+(Note\s*\/\s*Score|Note|Score|Pts|Points|Gains|Rang|Dossard|Partants|Places?)$/i,
                             function (tout, mot, pos, chaine) {
                               var reste = chaine.slice(0, pos).trim();
                               return reste.split(" ").filter(Boolean).length >= 2 ? "" : tout;
                             }).trim(),
        place: c.place || null,
        partants: c.partants || null,
        quart: q,
        statut: c.statut,
        garder: c.statut === "classe"
      };
      if (c.statut === "illisible") { r.doute = "classement illisible : « " + c.brut + " »"; r.garder = false; }
      if (c.deforme)                  r.doute = "classement lu en forme déformée";
      if (!r.date)                  { r.doute = "date absente"; r.garder = false; }
      if (!r.epreuve)                 r.doute = "épreuve absente";
      var att = quartAttendu(r.place, r.partants);
      if (att && r.quart && att !== r.quart)
        r.doute = "quart incohérent : la FFE dit " + r.quart + "e, le calcul donne " + att + "e";
      if (att && !r.quart && c.statut === "classe")
        r.doute = "quart absent — à confirmer";
      if (r.doute) alertes.push(r);
      /* Un forfait ou une epreuve annulee : le cheval n a pas couru.
         On ne les propose meme pas.                                   */
      if (c.statut !== "non_partant" && c.statut !== "annulee") sorties.push(r);
    });
    return { lignes: sorties, alertes: alertes };
  }

  /* ==== 3bis. LES QUATRE NIVEAUX ======================================
     🟥 Le filtre N'EFFACE RIEN. Decision de Blandine (22/08) : on
     enregistre TOUT, le filtre ne fait que decider ce qui s'affiche
     — colonne `visible`. Elle pourra changer d avis sans reimporter.
     🟥 Eliminés et abandons COMPTENT dans le palmarès. On ne dit jamais
     l inverse a l ecran. Ils arrivent seulement decoches, en gris
     italique, pour qu elle decide.                                     */
  function estPodium(r){ return r.statut === "classe" && r.place != null && r.place <= 3; }
  function estTop8(r){ return r.statut === "classe" && r.place != null && r.place <= 8; }
  function estClasse(r){ return r.statut === "classe" && r.quart === 1; }
  function aUnRang(r){ return r.statut === "classe" && r.place != null; }

  var NIVEAUX = [
    { c:"podiums", t:"Ses podiums",        s:"1er, 2e, 3e",                 f:estPodium },
    { c:"top8",    t:"Son top 8",          s:"les huit premières places",   f:estTop8 },
    { c:"classe",  t:"Ses classements",    s:"le premier quart",            f:estClasse },
    { c:"tous",    t:"Tous ses résultats", s:"éliminés et abandons compris", f:function(){ return true; } }
  ];

  function compter(lignes){
    return NIVEAUX.map(function (n) {
      return { c:n.c, t:n.t, s:n.s, n: lignes.filter(n.f).length };
    });
  }
  /* Applique le choix : coche ce qui entre, decoche le reste.
     Tout reste enregistre — `garder` ne pilote que `visible`.          */
  function appliquer(lignes, cle){
    var niv = NIVEAUX.filter(function (n) { return n.c === cle; })[0] || NIVEAUX[2];
    lignes.forEach(function (r) { r.garder = !!niv.f(r); });
    return lignes;
  }

  /* ==== 4. LE TRI PAR CAVALIER =========================================
     Un telemat contient les lignes de TOUS les cavaliers du cheval.    */
  function cavaliers(lignes) {
    var m = {};
    lignes.forEach(function (r) { if (r.cavalier) m[r.cavalier] = (m[r.cavalier] || 0) + 1; });
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a]; })
      .map(function (n) { return { nom: n, n: m[n] }; });
  }

  /* ==== 5. CE QU'ON EXPOSE ============================================ */
  var API = {
    chargerPdfJs: chargerPdfJs,
    texteDuPdf: texteDuPdf,
    lignesDePage: lignesDePage,
    lire: lire,
    cavaliers: cavaliers,
    compter: compter,
    appliquer: appliquer,
    NIVEAUX: NIVEAUX,
    lireClassement: lireClassement,
    quartAttendu: quartAttendu
  };
  if (typeof window !== "undefined") window.HYPE_IMPORT = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})();

/* ═══════════════ L'ÉCRAN DE RELECTURE ═══════════════ */

(function () {
  "use strict";

  var STYLE = [
'.hi{--t:32,217,245;--or:217,181,108;--tx:242,246,248;background:#06070A;position:relative;z-index:1;min-height:100svh;'  /* 26/08 : fond OPAQUE — les cartes en pointilles de la fiche restee montee derriere transparaissaient sur le bord gauche (capture Blandine 12h01) */,
'  font-family:Montserrat,-apple-system,system-ui,sans-serif;color:rgb(var(--tx))}',
'.hi *{box-sizing:border-box}',
'.hi sup{font-size:9px}',

/* 🟥 25/08 — LE TITRE SE COGNAIT A LA BARRE D ETAT DE L IPHONE.
   « IMPORTER MES RESULTATS » passait SOUS l heure et la batterie
   (capture de Blandine, 03h19). Cause : padding haut fixe a 16 px,
   sans marge de securite. On respire au-dessus ET en dessous. */
'.hi-h{padding:calc(env(safe-area-inset-top) + 26px) 16px 4px;text-align:center} /* 26/08 : tout l en-tete recentre (demande Blandine, capture 08h34) */',
'.hi-k{font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;',
'  color:rgba(var(--t),.85);font-weight:800}',
'.hi-h h2{margin:6px 0 0;font-family:Cinzel,Georgia,serif;font-size:19px;font-weight:600;line-height:1.2}',
'.hi-h p{margin:10px 0 0;font-size:11.5px;line-height:1.6;color:#8A929C}',

'.hi-etapes{display:flex;gap:6px;padding:24px 16px 0}',
'.hi-etapes i{flex:1;height:3px;border-radius:2px;background:rgba(var(--tx),.12)}',
'.hi-etapes i.on{background:rgb(var(--t))}',

'.hi-zone{margin:26px 16px 16px;padding:26px 18px;border-radius:16px;text-align:center;',
'  border:1.5px dashed rgba(var(--t),.35);background:rgba(var(--t),.035);cursor:pointer;',
'  -webkit-tap-highlight-color:transparent}',
'.hi-zone .ic{font-size:26px;line-height:1}',
'.hi-zone b{display:block;font-size:13px;font-weight:700;margin-top:11px;color:rgba(var(--t),.95)}',
'.hi-zone span{display:block;font-size:11px;color:#8A929C;margin-top:7px;line-height:1.6}',
'.hi-zone input{display:none}',

'.hi-aide{margin:0 auto;max-width:calc(100% - 32px);padding:13px 14px;border-radius:12px;font-size:11px;line-height:1.7;',
'  color:#8A929C;background:rgba(var(--tx),.03);border:1px solid rgba(var(--tx),.08)}',
'.hi-aide b{color:rgba(var(--tx),.85);font-weight:700}',
'.hi-aide ol{margin:8px 0 0;padding-left:18px}',
'.hi-aide li{margin-bottom:5px}',
'.hi-film-t{display:flex;align-items:center;gap:11px;margin:26px 16px 0}',
'.hi-film-t i{flex:1;height:1px;background:rgba(var(--t),.25)}',
'.hi-film-t b{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;',
'  color:rgba(var(--tx),.5);font-weight:700}',
'.hi-film{margin:13px auto 0;width:280px;max-width:calc(100% - 32px);border-radius:14px;',
'  overflow:hidden;position:relative;cursor:pointer;background:#04070A;',
'  border:1px solid rgba(var(--t),.2);box-shadow:0 10px 30px rgba(0,0,0,.45)}',
'.hi-loupe{position:absolute;right:10px;bottom:10px;width:32px;height:32px;border-radius:50%;',
'  display:flex;align-items:center;justify-content:center;pointer-events:none;font-size:14px;',
'  color:rgba(var(--tx),.9);background:rgba(4,7,10,.62);border:1px solid rgba(255,255,255,.16)}',
'.hi-film-l{margin:10px auto 4px;text-align:center;font-size:10.5px;color:rgba(var(--tx),.4)}',

'.hi-att{margin:16px;padding:22px 18px;text-align:center;border-radius:16px;',
'  background:rgba(var(--tx),.03);border:1px solid rgba(var(--tx),.08)}',
'.hi-att b{display:block;font-size:13px;font-weight:700}',
'.hi-att span{display:block;font-size:11px;color:#8A929C;margin-top:8px}',

'.hi-err{margin:16px;padding:15px 16px;border-radius:14px;font-size:12px;line-height:1.6;',
'  color:#FFB4BC;background:rgba(255,90,110,.08);border:1px solid rgba(255,90,110,.32)}',
'.hi-err b{display:block;font-weight:700;margin-bottom:5px;color:#FF9AA6}',
'.hi-note{margin:11px 2px 13px;font-size:11px;line-height:1.55;color:rgba(240,246,250,.52)}',

'.hi-bilan{display:flex;gap:7px;padding:16px 16px 0}',
'.hi-bi{flex:1;text-align:center;padding:12px 3px;border-radius:13px;',
'  background:rgba(var(--tx),.03);border:1px solid rgba(var(--tx),.08)}',
'.hi-bi b{display:block;font-family:Cinzel,Georgia,serif;font-size:22px;line-height:1}',
'.hi-bi span{display:block;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;',
'  color:#8A929C;margin-top:5px;font-weight:700}',
'.hi-bi.ok b{color:rgba(var(--t),.95)}',
'.hi-bi.dt b{color:rgba(var(--or),.95)}',
'.hi-bi.no b{color:rgba(var(--tx),.4)}',

'.hi-st{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#8A929C;font-weight:800;',
'  margin:24px 18px 10px;text-indent:.2em;display:flex;align-items:baseline;justify-content:space-between}',
'.hi-st em{font-style:normal;font-size:10px;letter-spacing:.02em;text-transform:none;color:#5E6771}',

'.hi-cavs{display:flex;gap:6px;padding:0 16px;overflow-x:auto;scrollbar-width:none}',
'.hi-cavs::-webkit-scrollbar{display:none}',
'.hi-cav{flex:0 0 auto;font-size:10.5px;font-weight:700;padding:9px 13px;border-radius:20px;',
'  cursor:pointer;-webkit-tap-highlight-color:transparent;white-space:nowrap;',
'  background:rgba(var(--tx),.03);border:1px solid rgba(var(--tx),.1);color:#8A929C}',
'.hi-cav.on{border-color:rgba(var(--t),.55);color:rgba(var(--t),.95)}',

'.hi-liste{padding:0 16px}',
'.hi-l{display:flex;align-items:flex-start;gap:11px;padding:11px 12px;margin-bottom:7px;',
'  border-radius:13px;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  background:rgba(var(--tx),.028);border:1px solid rgba(var(--tx),.08)}',
'.hi-l{background:rgba(10,13,17,.92)}',
'.hi-l.off{opacity:1;background:rgba(10,13,17,.86)}',
'.hi-l.off .hi-co b{color:rgba(var(--tx),.62)}',
'.hi-l.off .hi-co .li,.hi-l.off .hi-co .qd{color:rgba(var(--tx),.42)}',
'.hi-l.off .hi-rg{color:rgba(var(--tx),.45)}',
'.hi-liste{background:rgba(4,7,10,.72);border-radius:14px;padding:10px 16px}',
'.hi-l.dt{border-color:rgba(var(--or),.34);background:rgba(var(--or),.04)}',
'.hi-case{flex:0 0 20px;height:20px;border-radius:6px;margin-top:2px;display:flex;',
'  align-items:center;justify-content:center;font-size:12px;font-weight:800;',
'  border:1.5px solid rgba(var(--tx),.25);color:transparent}',
'.hi-l:not(.off) .hi-case{background:rgba(var(--t),.9);border-color:rgba(var(--t),.9);color:#04252A}',
'.hi-rg{flex:0 0 46px;text-align:center;font-family:Cinzel,Georgia,serif;font-size:15px;',
'  color:rgba(var(--tx),.55);line-height:1.15}',
'.hi-rg.v{color:rgba(var(--or),.95)}',
'.hi-rg small{display:block;font-family:Montserrat,sans-serif;font-size:9px;font-weight:600;',
'  color:#6E7780;margin-top:2px}',
'.hi-co{flex:1;min-width:0}',
'.hi-co b{display:block;font-size:12px;font-weight:600;line-height:1.3}',
'.hi-co .li{display:block;font-size:10.5px;color:#8A929C;margin-top:3px}',
'.hi-co .qd{display:block;font-size:10px;color:#6E7780;margin-top:3px}',
'.hi-doute{display:block;margin-top:7px;font-size:10px;line-height:1.5;',
'  color:rgba(var(--or),.95);padding:6px 9px;border-radius:9px;',
'  background:rgba(var(--or),.09);border:1px solid rgba(var(--or),.26)}',
'.hi-hors{display:block;margin-top:7px;font-size:10px;color:#6E7780}',

'.hi-nv{margin-top:17px}',
'.hi-n{display:flex;align-items:center;gap:12px;padding:13px 13px;margin-bottom:8px;',
'  border-radius:13px;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  background:rgba(var(--tx),.025);border:1px solid rgba(var(--tx),.09)}',
'.hi-n.on{border-color:rgba(var(--t),.55);background:rgba(var(--t),.06)}',
'.hi-rd{flex:0 0 18px;height:18px;border-radius:50%;border:1.5px solid rgba(var(--tx),.28);',
'  display:flex;align-items:center;justify-content:center}',
'.hi-n.on .hi-rd{border-color:rgb(var(--t))}',
'.hi-n.on .hi-rd::after{content:"";width:9px;height:9px;border-radius:50%;background:rgb(var(--t))}',
'.hi-n .co{flex:1;min-width:0}',
'.hi-n .co b{display:block;font-size:12.5px;font-weight:600}',
'.hi-n .co span{display:block;font-size:10.5px;color:#8A929C;margin-top:3px}',
'.hi-n .nb{flex:0 0 auto;font-family:Cinzel,Georgia,serif;font-size:16px;color:rgba(var(--tx),.55)}',
'.hi-n.on .nb{color:rgb(var(--t))}',
'.hi-l.hors .hi-co b,.hi-l.hors .hi-co .li{font-style:italic;color:rgba(var(--tx),.42)}',
'.hi-l.hors .hi-rg{font-style:italic;color:rgba(var(--tx),.34)}',
'.hi-l.quart .hi-co b{font-weight:700}',
'.hi-pied{position:relative;padding:16px 16px 120px;',
'  background:none}',
'.hi-bt{display:block;width:100%;padding:15px;border-radius:14px;font-size:13px;font-weight:700;',
'  letter-spacing:.03em;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  color:#04252A;background:rgba(var(--t),.9);border:1px solid rgba(var(--t),.9)}',
'.hi-bt[disabled]{opacity:.45;cursor:default}',
'.hi-bt2{display:block;width:100%;margin-top:8px;padding:13px;border-radius:14px;font-size:12px;',
'  font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent;color:#8A929C;',
'  background:none;border:1px solid rgba(var(--tx),.13)}',
'.hi-fin{margin:16px;padding:26px 20px;border-radius:16px;text-align:center;',
'  background:rgba(var(--t),.05);border:1px solid rgba(var(--t),.26)}',
'.hi-fin .ic{font-size:30px}',
'.hi-fin b{display:block;font-family:Cinzel,Georgia,serif;font-size:17px;margin-top:12px}',
'.hi-fin span{display:block;font-size:11.5px;color:#8A929C;margin-top:9px;line-height:1.6}'
  ].join("");

  function poserStyle() {
    if (typeof document === "undefined" || document.getElementById("hype-import-css")) return;
    var s = document.createElement("style");
    s.id = "hype-import-css"; s.textContent = STYLE;
    document.head.appendChild(s);
  }

  /* ==== l'état de l'écran ============================================== */
  var E = { etape: "choix", lignes: [], cavalier: "", err: null, nomFichier: "", occupe: false, niveau: "classe" };

  function ech(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function suff(p) { return Number(p) === 1 ? "er" : "e"; }
  function jour(d) { if (!d) return "date inconnue"; var p = d.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function joli(s) {
    if (!s) return "";
    if (s !== s.toUpperCase()) return s;
    var petits = ["de","du","des","la","le","les","en","et","sur","d","l","aux","au"];
    return s.toLowerCase().split(/\s+/).map(function (m, i) {
      return (i > 0 && petits.indexOf(m) >= 0) ? m : m.charAt(0).toUpperCase() + m.slice(1);
    }).join(" ");
  }

  /* ==== 1 · CHOISIR LE FICHIER ========================================= */
  function vueChoix() {
    var h = '<div class="hi-h"><div class="hi-k">Importer mes résultats</div>' +
      '<h2>Ton telemat FFE</h2>' +
      '<p>Une saison par fichier. L\'app lit, tu relis, et rien ne s\'enregistre sans toi.</p>' +
      (E.nomCheval ? '<p style="margin:8px 0 0;font-size:12.5px">Rattach\u00e9 \u00e0 : <b style="color:rgb(var(--t))">' + ech(E.nomCheval) + '</b></p>' : '') + '</div>' +
      '<div class="hi-etapes"><i class="on"></i><i></i><i></i></div>';
    h += '<label class="hi-zone"><div class="ic">⤓</div>' +
      '<b>Choisir un PDF</b>' +
      '<span>Depuis Fichiers, sur ton téléphone</span>' +
      '<input type="file" accept="application/pdf,.pdf" data-hi="fichier"></label>';
    h += '<div class="hi-aide"><b>Comment obtenir ce PDF</b>' +
      '<ol><li>Ouvre ton telemat FFE <b>dans Safari</b></li>' +
      '<li>Fais une capture d\'écran, puis <b>appuie sur la vignette</b> avant qu\'elle disparaisse</li>' +
      '<li>Choisis l\'onglet <b>« Page entière »</b></li>' +
      '<li><b>Enregistrer le PDF dans Fichiers</b></li></ol>' +
      '⚠️ Il faut bien un <b>PDF</b> : une capture en image ne se lit pas.</div>';
    /* 🟥 23/08 session 158 — LA VIDÉO D AIDE, TOUT EN BAS.
       Maquette validee par Blandine : centree, 280 px, couverture E (le poney
       et la coupe), muette et en boucle. Muette EXPRES : avec du son, iOS et
       Android bloquent le demarrage automatique et on ne verrait qu une image
       figee. Un tap la passe en plein ecran et rend le son.
       `preload="none"` : elle ne se telecharge QUE si cet ecran s ouvre.
       🟥 Les deux fichiers doivent etre pousses a la racine du depot.
       ⚠️ 25/08 session 163 — NOUVELLE VIDEO. `aide-import.mp4` est remplacee
       par `aide-import-2.mp4` (la mascotte au telephone), fournie par
       Blandine le 24/08 au soir. 11,8 Mo -> 0,93 Mo, HEVC -> H.264 (le HEVC
       ne se lit pas hors Safari), muette, filigrane « Ai » efface.
       🟥 NOM DE FICHIER NEUF, PAS UN REMPLACEMENT SOUS LE MEME NOM : garder
       `aide-import.mp4` aurait laisse Safari servir sa copie en cache, et la
       nouvelle video ne serait jamais arrivee sur le telephone. C est ce qui
       a coute deux jours les 21 et 22/08. L ancienne peut rester en ligne,
       elle n est plus appelee.
       🟥 A pousser a la racine : aide-import-2.mp4 et aide-import-2.jpg. */
    h += '<div class="hi-film-t"><i></i><b>En images</b><i></i></div>' +
      '<div class="hi-film" data-hi="film">' +
      '<video id="hiFilm" src="aide-import-2.mp4?v=1" poster="aide-import-2.jpg?v=1" ' +
      'autoplay muted loop playsinline preload="none" ' +
      'style="display:block;width:76%;max-width:340px;height:auto;margin:0 auto;border-radius:14px"></video>' +
      '<span class="hi-loupe">⤢</span></div>' +
      '<div class="hi-film-l">15 secondes, sans le son</div>';
    if (E.err) h += '<div class="hi-err"><b>Ça n\'a pas marché</b>' + ech(E.err) + '</div>';
    return h;
  }

  /* ==== 2 · LA LECTURE EN COURS ======================================== */
  function vueLecture() {
    return '<div class="hi-h"><div class="hi-k">Importer mes résultats</div>' +
      '<h2>Lecture en cours…</h2></div>' +
      '<div class="hi-etapes"><i class="on"></i><i class="on"></i><i></i></div>' +
      '<div class="hi-att"><b>' + ech(E.nomFichier) + '</b>' +
      '<span>Quelques secondes. Rien n\'est enregistré pour l\'instant.</span></div>';
  }

  /* ==== 2bis · QUE VEUT-ELLE VOIR ? ===================================
     Posé AVANT d'afficher 27 lignes à relire. Le filtre n'efface rien :
     tout sera enregistré, il décide seulement de ce qui s'affiche.    */
  function vueChoixNiveau() {
    var n = window.HYPE_IMPORT.compter(E.lignes);
    var h = '<div class="hi-h"><div class="hi-k">' + ech(E.nomFichier) + '</div>' +
      '<h2>Que souhaites-tu voir apparaître ?</h2>' +
      '<p>Tout sera enregistré de toute façon — tu pourras changer d\'avis ' +
      'plus tard sans réimporter.</p></div>' +
      '<div class="hi-etapes"><i class="on"></i><i class="on"></i><i></i></div>';
    h += '<div class="hi-nv">';
    n.forEach(function (o) {
      h += '<div class="hi-n' + (E.niveau === o.c ? " on" : "") + '" data-hi-nv="' + o.c + '">' +
        '<span class="hi-rd"></span><span class="co"><b>' + o.t + '</b>' +
        '<span>' + o.s + '</span></span><span class="nb">' + o.n + '</span></div>';
    });
    h += '</div><div class="hi-pied">' +
      '<button class="hi-bt" data-hi="versrelecture">Continuer</button>' +
      '<button class="hi-bt2" data-hi="annuler">Annuler</button></div>';
    return h;
  }

  /* ==== 3 · LA RELECTURE — le cœur ===================================== */
  function vueRelecture() {
    var toutes = E.lignes;
    var vis = E.cavalier ? toutes.filter(function (r) { return r.cavalier === E.cavalier; }) : toutes;
    var gardees = vis.filter(function (r) { return r.garder; }).length;
    var doutes = vis.filter(function (r) { return r.doute; }).length;
    var horsPiste = vis.length - vis.filter(function (r) { return r.statut === "classe"; }).length;

    var h = '<div class="hi-h"><div class="hi-k">Étape 3 sur 3</div>' +
      '<h2>Relis avant d\'enregistrer</h2>' +
      '<p>Coche ce que tu veux voir apparaître. Les lignes en doré demandent ' +
      'ton œil : l\'app n\'est pas sûre d\'elle.</p>' +
      (E.nomCheval ? '<p style="margin:8px 0 0;font-size:12.5px">Ces r\u00e9sultats iront sur la fiche de <b style="color:rgb(var(--t))">' + ech(E.nomCheval) + '</b></p>' : '') + '</div>' +
      '<div class="hi-etapes"><i class="on"></i><i class="on"></i><i class="on"></i></div>';

    h += '<div class="hi-bilan">' +
      '<div class="hi-bi ok"><b>' + gardees + '</b><span>à garder</span></div>' +
      '<div class="hi-bi dt"><b>' + doutes + '</b><span>à vérifier</span></div>' +
      '<div class="hi-bi no"><b>' + horsPiste + '</b><span>hors piste</span></div></div>';

    var cavs = (window.HYPE_IMPORT ? window.HYPE_IMPORT.cavaliers(toutes) : []);
    if (cavs.length > 1) {
      h += '<div class="hi-st">Qui montait<em>garde seulement tes lignes</em></div><div class="hi-cavs">';
      h += '<div class="hi-cav' + (E.cavalier === "" ? " on" : "") + '" data-hi-cav="">Tous · ' + toutes.length + '</div>';
      cavs.forEach(function (c) {
        h += '<div class="hi-cav' + (E.cavalier === c.nom ? " on" : "") + '" data-hi-cav="' + ech(c.nom) + '">' +
          ech(joli(c.nom)) + ' · ' + c.n + '</div>';
      });
      h += '</div>';
    }

    h += '<div class="hi-st">Les lignes lues<em>' + vis.length + '</em></div><div class="hi-liste">';
    vis.forEach(function (r) {
      var classe = r.statut === "classe";
      h += '<div class="hi-l' + (r.garder ? "" : " off") + (r.doute ? " dt" : "") +
        (classe ? (r.quart === 1 ? " quart" : "") : " hors") +
        '" data-hi-l="' + r.rang + '">' +
        '<span class="hi-case">✓</span>' +
        '<span class="hi-rg' + (r.place === 1 ? " v" : "") + '">' +
        (classe ? (r.place + "<sup>" + suff(r.place) + "</sup>" +
          (r.partants ? "<small>sur " + r.partants + "</small>" : ""))
                : "—<small>" + ech(motStatut(r.statut)) + "</small>") + "</span>" +
        '<span class="hi-co"><b>' + ech(r.epreuve || "épreuve inconnue") + "</b>" +
        '<span class="li">' + ech(joli(r.concours)) + "</span>" +
        '<span class="qd">' + jour(r.date) +
        (r.quart ? " · quart " + r.quart + "e" : " · quart non donné") +
        (r.cavalier ? " · " + ech(joli(r.cavalier)) : "") + "</span>" +
        (r.doute ? '<span class="hi-doute">⚠️ ' + ech(r.doute) + "</span>" : "") +
        "</span></div>";
    });
    h += "</div>";

    /* 🟥 23/08 : le bouton disait « Enregistrer N résultats » avec N = les
       lignes COCHÉES. Or on enregistre TOUT ce qui a été couru, les
       décochées comprises (elles arrivent en visible = false). Le bouton
       annonçait donc moins que ce qu il faisait. Il dit maintenant le
       vrai total, et une phrase sous lui explique le rôle des coches. */
    var aEcrire = E.lignes.filter(function (r) {
      return r && r.date && r.statut !== "non_partant" && r.statut !== "annulee";
    }).length;
    var caches = aEcrire - E.lignes.filter(function (r) { return r.garder; }).length;
    if (E.err) h += '<div class="hi-err" style="margin:0 16px 12px"><b>L\'enregistrement a \u00e9chou\u00e9 : </b>' + ech(E.err) + "</div>"; /* 26/08 : l'erreur s'affiche AU-DESSUS du bouton — elle \u00e9tait rendue sous le pied, hors de l'\u00e9cran, et Blandine ne voyait \u00ab rien se passer \u00bb */
    h += '<div class="hi-pied">' +
      '<button class="hi-bt" data-hi="enregistrer"' + (aEcrire ? "" : " disabled") + '>' +
      (E.occupe ? "…" : "Enregistrer " + aEcrire + " résultat" + (aEcrire > 1 ? "s" : "")) + "</button>" +
      '<div class="hi-note">' +
      (caches > 0
        ? ("Tout est enregistré. " + caches + " ligne" + (caches > 1 ? "s" : "") +
           " décochée" + (caches > 1 ? "s" : "") + " " + (caches > 1 ? "seront" : "sera") +
           " gardée" + (caches > 1 ? "s" : "") + " sans être affichée" + (caches > 1 ? "s" : "") +
           " — tu pourras changer d'avis sans réimporter.")
        : "Tout est enregistré. Les coches ne décident que de ce qui s'affiche.") +
      "</div>" +
      '<button class="hi-bt2" data-hi="annuler">Annuler, ne rien enregistrer</button></div>';
    return h;
  }

  function motStatut(s) {
    return s === "non_partant" ? "forfait"
      : s === "elimine" ? "éliminé"
      : s === "abandon" ? "abandon"
      : s === "annulee" ? "annulée"
      : s === "illisible" ? "illisible" : "—";
  }

  /* ==== 4 · C'EST FAIT ================================================= */
  /* 🟥 24/08 — CET ÉCRAN DISAIT « 0 résultat enregistré » PUIS « Son palmarès
     vient de grandir », ce qui est contradictoire, et surtout il ne disait pas
     POURQUOI zéro. Deux causes opposées se cachaient derrière le même mot :
     tout était déjà en base, ou rien n était passé. Il le dit maintenant. */
  function vueFin(n, doublons, envoyees) {
    doublons = doublons || 0; envoyees = envoyees || 0;
    var titre, phrase;
    if (n > 0) {
      titre = n + " résultat" + (n > 1 ? "s enregistrés" : " enregistré");
      phrase = "Son palmarès vient de grandir.";
      if (doublons > 0) phrase += " " + doublons + " ligne" + (doublons > 1 ? "s étaient" : " était")
        + " déjà là, " + (doublons > 1 ? "elles ont" : "elle a") + " été ignorée"
        + (doublons > 1 ? "s" : "") + ".";
      phrase += " Tu peux importer une autre saison quand tu veux.";
    } else if (doublons > 0) {
      titre = "Cette saison était déjà là";
      phrase = "Les " + doublons + " ligne" + (doublons > 1 ? "s de ce fichier étaient" : " de ce fichier était")
        + " déjà dans son palmarès. Rien n'a été ajouté, et rien n'a été perdu.";
    } else if (envoyees === 0) {
      titre = "Rien à enregistrer";
      phrase = "Ce fichier ne contient aucune épreuve courue — que des forfaits "
        + "ou des épreuves annulées.";
    } else {
      titre = "Rien n'a été écrit";
      phrase = envoyees + " ligne" + (envoyees > 1 ? "s ont" : " a") + " été envoyée"
        + (envoyees > 1 ? "s" : "") + " mais la base n'en a accepté aucune. "
        + "Ce n'est pas normal — signale-le.";
    }
    var blocOg = "";
    var ogV = (typeof window !== "undefined" && window.__hypeOriginesFFE) || null;
    if (E.originesInfo && E.originesInfo.etat === "posees") {
      blocOg = '<div class="hi-aide" style="margin-top:12px">\u2713 <b>Origines officielles ajout\u00e9es \u00e0 sa fiche</b>'
        + (ogV && ogV.pere ? "<br>P\u00e8re : <b>" + ech(ogV.pere) + "</b> \u00b7 M\u00e8re : <b>" + ech(ogV.mere || "\u2014") + "</b>" : "") + "</div>";
    } else if (E.originesInfo && E.originesInfo.etat === "conflit") {
      blocOg = '<div class="hi-aide" style="margin-top:12px"><b>Les origines officielles diff\u00e8rent de ta saisie.</b>'
        + "<br>Officiel : P\u00e8re <b>" + ech((ogV && ogV.pere) || "\u2014") + "</b> \u00b7 M\u00e8re <b>" + ech((ogV && ogV.mere) || "\u2014") + "</b>"
        + '<div style="display:flex;gap:8px;margin-top:10px">'
        + '<button class="hi-bt" data-hi="ogRemplacer" style="flex:1">Prendre l\'officiel</button>'
        + '<button class="hi-bt2" data-hi="ogGarder" style="flex:1">Garder ma saisie</button></div></div>';
    } else if (E.originesInfo && E.originesInfo.etat === "gardees") {
      blocOg = '<div class="hi-aide" style="margin-top:12px">\u2713 Ta saisie est conserv\u00e9e.</div>';
    } else if (E.originesInfo && E.originesInfo.etat === "remplacees") {
      blocOg = '<div class="hi-aide" style="margin-top:12px">\u2713 Origines officielles pos\u00e9es sur sa fiche.</div>';
    }
    return '<div class="hi-fin"><div class="ic">' + (n > 0 ? "🏆" : "✓") + '</div>' +
      "<b>" + titre + "</b><span>" + phrase + "</span></div>" + blocOg +
      '<div class="hi-pied"><button class="hi-bt" data-hi="encore">Importer une autre saison</button>' +
      '<button class="hi-bt2" data-hi="fermer">Revenir à sa fiche</button></div>';
  }

  /* ==== LE RENDU ======================================================== */
  function rendre(hote, options) {
    if (!hote) return;
    options = options || {};
    E.nomCheval = options.nomCheval || E.nomCheval || null; /* 26/08 : la cible affichable voyage par E (les vues ne voient pas options) */
    poserStyle();
    if (hote.className.indexOf("hi") < 0) hote.className += " hi";

    var h = E.etape === "choix" ? vueChoix()
      : E.etape === "lecture" ? vueLecture()
      : E.etape === "niveau" ? vueChoixNiveau()
      : E.etape === "relecture" ? vueRelecture()
      : vueFin(E.enregistres || 0, E.doublons || 0, E.envoyees || 0);
    hote.innerHTML = h;
    brancher(hote, options);
  }

  /* ==== LES GESTES ======================================================
     🟥 22/08 : les écouteurs étaient posés sur CHAQUE bouton, et
     réattachés à chaque redessin. Le bouton « Enregistrer » ne répondait
     pas — même pas le « … » — et aucune trace ne partait : l'écouteur
     n'était jamais appelé. Cause exacte non identifiée (timing du
     redessin, ou nœud remplacé entre l'attache et le tap).

     On supprime la cause entière : UN SEUL écouteur, posé une fois sur le
     conteneur, qui lit la cible au moment du tap. Il survit à tous les
     redessins et ne peut plus se détacher.                             */
  function brancher(hote, options) {
    function refaire() { rendre(hote, options); }

    /* le champ de fichier ne se délègue pas : il change, il ne se tape pas */
    var f = hote.querySelector('[data-hi="fichier"]');
    if (f && !f.__hiBranche) {
      f.__hiBranche = true;
      f.addEventListener("change", function () {
        var fic = f.files && f.files[0];
        if (!fic) return;
        E.err = null; E.nomFichier = fic.name; E.etape = "lecture"; refaire();
        window.HYPE_IMPORT.texteDuPdf(fic).then(function (txt) {
          var o = window.HYPE_IMPORT.lire(txt);
          if (!o.lignes.length) {
            E.err = "Aucun résultat trouvé dans ce PDF. Vérifie que c'est bien la page " +
                    "entière de ton telemat, et non une capture en image.";
            E.etape = "choix"; refaire(); return;
          }
          E.lignes = o.lignes; E.cavalier = ""; E.niveau = "classe";
          window.HYPE_IMPORT.appliquer(E.lignes, E.niveau);
          E.etape = "niveau"; refaire();
        }).catch(function (e) {
          E.err = "Le fichier n'a pas pu être lu. " + (e && e.message ? e.message : "");
          E.etape = "choix"; refaire();
        });
      });
    }

    if (hote.__hiGestes) return;   /* un seul écouteur, pour toujours */
    hote.__hiGestes = true;

    hote.addEventListener("click", function (ev) {
      var el = ev.target;
      /* on remonte jusqu'à l'élément porteur d'une action */
      var cible = null;
      while (el && el !== hote) {
        if (el.getAttribute && (el.getAttribute("data-hi") ||
            el.getAttribute("data-hi-l") || el.getAttribute("data-hi-cav") ||
            el.getAttribute("data-hi-nv"))) { cible = el; break; }
        el = el.parentNode;
      }
      if (!cible) return;

      var nv = cible.getAttribute("data-hi-nv");
      if (nv) {
        E.niveau = nv;
        window.HYPE_IMPORT.appliquer(E.lignes, E.niveau);
        refaire(); return;
      }
      var lg = cible.getAttribute("data-hi-l");
      if (lg) {
        var n = Number(lg);
        E.lignes.forEach(function (r) { if (r.rang === n) r.garder = !r.garder; });
        refaire(); return;
      }
      var cv = cible.getAttribute("data-hi-cav");
      if (cv !== null) { E.cavalier = cv || ""; refaire(); return; }

      var act = cible.getAttribute("data-hi");
      if (act === "film") {
        /* iOS n expose pas requestFullscreen sur un <video> mais
           webkitEnterFullscreen ; Chrome/Android l inverse. On tente les deux,
           et on retombe sur les controles natifs si aucun ne repond. */
        var vd = hote.querySelector("#hiFilm");
        if (vd) {
          try {
            vd.muted = false;
            if (vd.webkitEnterFullscreen) { vd.webkitEnterFullscreen(); return; }
            if (vd.requestFullscreen) { vd.requestFullscreen(); return; }
            vd.controls = true;
          } catch (eV) { try { vd.controls = true; } catch (eV2) { } }
        }
        return;
      }
      if (act === "versrelecture") { E.etape = "relecture"; refaire(); return; }
      if (act === "annuler" || act === "fermer") {
        reinitialiser();
        if (typeof options.onFermer === "function") options.onFermer(); else refaire();
        return;
      }
      if (act === "ogRemplacer" || act === "ogGarder") { /* 26/08 : le cavalier tranche le conflit d origines */
        if (act === "ogGarder") { E.originesInfo = { etat: "gardees" }; refaire(); return; }
        var ogP = (typeof window !== "undefined" && window.__hypeOriginesFFE) || null;
        if (typeof options.onOrigines !== "function" || !ogP) { E.originesInfo = { etat: "gardees" }; refaire(); return; }
        E.originesInfo = { etat: "encours" };
        refaire();
        Promise.resolve(options.onOrigines(ogP)).then(function (rOk) {
          E.originesInfo = { etat: (rOk && rOk.error) ? "conflit" : "remplacees" };
          if (rOk && rOk.error) E.err = String(rOk.error);
          refaire();
        }).catch(function (eOc) { E.originesInfo = { etat: "conflit" }; E.err = String((eOc && eOc.message) || eOc); refaire(); });
        return;
      }
      if (act === "encore") { reinitialiser(); refaire(); return; }
      if (act === "enregistrer") { enregistrer(hote, options, refaire); return; }
    }, false);
  }

  function enregistrer(hote, options, refaire) {
    if (E.occupe) return;
    /* 🟥 23/08 session 156 — ON ENVOIE TOUT. C EST LA REGLE DE BLANDINE,
       elle etait ecrite en commentaire au-dessus des NIVEAUX et le code
       faisait l inverse depuis le debut.

       AVANT, deux entonnoirs vidaient l envoi :
         · le filtre cavalier : si une pastille etait allumee, seules les
           lignes de ce cavalier partaient ;
         · `r.garder`, pose par l ecran de choix : avec « Ses classements »
           seules les lignes de quart 1 partaient, le reste etait JETE.
       Mesure du 23/08 sur les sept telemat de Rizotto d Emery : le lecteur
       lit 178 lignes, la base n en avait que 85.

       Desormais `garder` ne pilote QUE la colonne `visible`. Le filtre
       cavalier ne pilote QUE l affichage a l ecran. Rien n est perdu,
       Blandine peut changer d avis sans reimporter.
       Ne sont ecartes que forfaits et epreuves annulees : le cheval n a
       pas couru. E.lignes ne les contient deja pas, on redouble ici.   */
    var aGarder = E.lignes.filter(function (r) {
      return r && r.date && r.statut !== "non_partant" && r.statut !== "annulee";
    });
    if (!aGarder.length) {
      E.err = "aucune ligne à enregistrer."; refaire(); return;
    }
    if (typeof options.onEnregistrer !== "function") {
      E.err = "l'app n'a pas fourni de quoi enregistrer."; refaire(); return;
    }
    E.err = null; E.occupe = true; refaire();
    var p;
    try { p = options.onEnregistrer(aGarder, ((typeof window !== "undefined" && window.__hypeOriginesFFE) || null), ((typeof window !== "undefined" && window.__hypeNomPdfFFE) || null)); } /* 26/08 : origines + NOM DU CHEVAL voyagent avec les resultats (ponts window, voir bloc 1) */
    catch (eS) {
      E.occupe = false; E.err = (eS && eS.message) ? eS.message : String(eS);
      refaire(); return;
    }
    var pGardee = Promise.race([Promise.resolve(p), new Promise(function (resG) { setTimeout(function () { resG({ __gardeModule: true }); }, 35000); })]); /* 26/08 : ceinture du module — même si l'app ne répond JAMAIS, l'écran se libère et le dit */
    pGardee.then(function (rep) {
      if (rep && rep.__gardeModule) { E.occupe = false; E.err = "Pas de r\u00e9ponse au bout de 35 secondes \u2014 rien n'a \u00e9t\u00e9 confirm\u00e9. V\u00e9rifie le r\u00e9seau et r\u00e9essaie."; E.etape = "relecture"; refaire(); return; }
      E.occupe = false;
      /* 🟥 24/08 : on retient AUSSI les doublons et le total lu, pour que
         l ecran de fin puisse dire POURQUOI c est zero. */
      if (rep && typeof rep === "object") {
        E.enregistres = Number(rep.n) || 0;
        E.doublons = Number(rep.doublons) || 0;
      } else {
        E.enregistres = (typeof rep === "number") ? rep : aGarder.length;
        E.doublons = 0;
      }
      E.envoyees = aGarder.length;
      E.originesInfo = (rep && typeof rep === "object" && rep.origines) ? rep.origines : null; /* 26/08 */
      E.etape = "fin"; refaire();
    }).catch(function (e) {
      E.occupe = false;
      E.err = (e && e.message) ? e.message : String(e);
      E.etape = "relecture"; refaire();
    });
  }

  function reinitialiser() {
    E = { etape: "choix", lignes: [], cavalier: "", err: null, nomFichier: "", occupe: false, niveau: "classe" };
  }

  /* ==== ce qu'on ajoute à HYPE_IMPORT ================================== */
  if (typeof window !== "undefined" && window.HYPE_IMPORT) {
    window.HYPE_IMPORT.rendre = rendre;
    window.HYPE_IMPORT.reinitialiser = reinitialiser;
    window.HYPE_IMPORT.etat = function () { return E; };
  }
  /* ⚠️ Ce fichier contient DEUX blocs. Le second ne doit pas ecraser les
     exports du premier, sinon le banc d essai ne voit plus la lecture. */
  if (typeof module !== "undefined" && module.exports) {
    module.exports.rendre = rendre;
    module.exports.reinitialiser = reinitialiser;
    module.exports.etat = function () { return E; };
  }
})();
