/* hype-lingo.js — Hype Lingo · moteur autonome
   ==================================================================
   AUTONOMIE : ce fichier ne connait pas Hype. Il ne parle qu'a
   window.HYPE_LINGO_HOST (voir index.html). Aucun appel direct vers une
   fonction de l'index de Hype, aucune dependance React, aucun CDN.
   Verifiable au grep : le mot "HYPE_LINGO_HOST" est le SEUL pont.
   ================================================================== */
(function () {
  "use strict";

  var HOST = window.HYPE_LINGO_HOST;
  var LEX = window.HYPE_LINGO_LEX;

  /* ---------- petit constructeur de DOM (remplace JSX) ---------- */
  function e(tag, attrs) {
    var n = document.createElement(tag), i, k;
    if (attrs) for (k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (k === "style") n.setAttribute("style", attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    for (i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c === null || c === undefined || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) n.appendChild(x); });
      else n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return n;
  }

  /* ---------- langues ---------- */
  var VOIX = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", de: "de-DE", ja: "ja-JP" };
  var PAYS = {
    en: { nom: { fr: "Royaume-Uni", en: "United Kingdom" }, drapeau: "🇬🇧" },
    fr: { nom: { fr: "France", en: "France" }, drapeau: "🇫🇷" },
    es: { nom: { fr: "Espagne", en: "Spain" }, drapeau: "🇪🇸" },
    it: { nom: { fr: "Italie", en: "Italy" }, drapeau: "🇮🇹" },
    de: { nom: { fr: "Allemagne", en: "Germany" }, drapeau: "🇩🇪" },
    ja: { nom: { fr: "Japon", en: "Japan" }, drapeau: "🇯🇵" }
  };

  /* ---------- textes d'interface (fr / en) ---------- */
  var T = {
    ou: { fr: "Où veux-tu aller ?", en: "Where do you want to go ?" },
    chapitre: { fr: "Chapitre", en: "Chapter" },
    commencer: { fr: "Commencer la leçon", en: "Start the lesson" },
    continuer: { fr: "Continuer", en: "Continue" },
    verifier: { fr: "Vérifier", en: "Check" },
    ecoute: { fr: "Écoute et choisis", en: "Listen and choose" },
    rejouer: { fr: "Réécouter", en: "Play again" },
    quelmot: { fr: "Quel est ce mot ?", en: "Which word is it ?" },
    ecris: { fr: "Écris le mot", en: "Type the word" },
    ordre: { fr: "Remets la phrase dans l'ordre", en: "Put the sentence in order" },
    bravo: { fr: "C'est ça", en: "That's it" },
    presque: { fr: "Pas encore", en: "Not yet" },
    reponse: { fr: "La réponse", en: "The answer" },
    fini: { fr: "Leçon terminée", en: "Lesson complete" },
    tampon: { fr: "Nouveau tampon sur ton passeport", en: "A new stamp in your passport" },
    cartes: { fr: "cartes ajoutées à ta collection", en: "cards added to your collection" },
    voircol: { fr: "Voir ma collection", en: "See my collection" },
    refaire: { fr: "Refaire la leçon", en: "Play again" },
    retour: { fr: "Retour", en: "Back" },
    collection: { fr: "Ma collection", en: "My collection" },
    maitrise: { fr: "Maîtrise", en: "Mastery" },
    verrou: { fr: "Pas encore débloquée", en: "Not unlocked yet" },
    prononce: { fr: "Écouter", en: "Listen" },
    passeport: { fr: "Passeport", en: "Passport" },
    ecuriedu: { fr: "L'écurie", en: "The yard" }
  };

  /* ---------- etat ---------- */
  var S = null;
  var racine = null;

  function langueUI() { var l = HOST.langue(); return (l === "en") ? "en" : "fr"; }
  function t(cle) { return T[cle][langueUI()] || T[cle].fr; }

  function etatVide() {
    return { cible: null, maitrise: {}, xp: 0, tampons: [] };
  }

  function sauver() { HOST.sauver(S); }

  /* ---------- voix ---------- */
  var voixPretes = false;
  function dire(texte, langue) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texte);
      u.lang = VOIX[langue] || "en-GB";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (err) { /* pas de voix disponible : l'exercice reste jouable */ }
  }
  /* iOS refuse de parler si le tout premier appel ne vient pas d'un geste.
     On "amorce" donc la synthese au premier tap de l'utilisateur. */
  function amorcerVoix() {
    if (voixPretes || !("speechSynthesis" in window)) return;
    try {
      var u = new SpeechSynthesisUtterance(" ");
      u.volume = 0; window.speechSynthesis.speak(u);
      voixPretes = true;
    } catch (err) { /* rien */ }
  }

  /* ---------- utilitaires ---------- */
  function melanger(tab) {
    var a = tab.slice(), i, j, x;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  function motNu(s) {
    return s.toLowerCase()
      .replace(/^(le |la |les |l'|the |el |la |los |las |il |i |der |die |das )/, "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9fff]/g, "").trim();
  }
  function vider(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function afficher(noeud) { vider(racine); racine.appendChild(noeud); racine.scrollTop = 0; }

  /* =================================================================
     ECRAN 1 — LE DEPART
     Pas encore le globe : une liste de destinations tres soignee.
     Le globe viendra remplacer cette carte, l'ecran ne changera pas.
     ================================================================= */
  function ecranDepart() {
    var ui = langueUI();
    var cibles = Object.keys(PAYS).filter(function (l) { return l !== ui; });

    var vue = e("div", { class: "lg-ecran lg-depart" },
      e("div", { class: "lg-ciel" }),
      e("img", { class: "lg-apy-grand", src: "apy.webp", alt: "Apy", width: "180" }),
      e("p", { class: "lg-sur", text: "Hype Lingo" }),
      e("h1", { class: "lg-h1", text: t("ou") }),
      e("div", { class: "lg-pays" },
        cibles.map(function (l) {
          return e("button", { class: "lg-pays-b" + (S.cible === l ? " est-actif" : ""), onclick: function () {
            amorcerVoix(); S.cible = l; sauver(); afficher(ecranDepart());
          } },
            e("span", { class: "lg-drapeau", text: PAYS[l].drapeau }),
            e("span", { class: "lg-pays-nom", text: PAYS[l].nom[ui] || PAYS[l].nom.fr }),
            e("span", { class: "lg-pays-lg", text: l.toUpperCase() })
          );
        })
      )
    );

    if (S.cible) {
      var ch = LEX.ecurie;
      vue.appendChild(
        e("div", { class: "lg-chapitre" },
          e("p", { class: "lg-eyebrow", text: t("chapitre") + " 1 · " + (PAYS[S.cible].nom[ui] || "") }),
          e("h2", { class: "lg-h2", text: ch.titre[S.cible] + "  ·  " + ch.titre[ui] }),
          e("p", { class: "lg-note", text: ch.concepts.filter(function (c) { return c.niveau === 1; }).length + " " + (ui === "fr" ? "mots · 6 étapes" : "words · 6 steps") }),
          e("button", { class: "lg-cta", onclick: function () { amorcerVoix(); lancerLecon(); } }, t("commencer"))
        )
      );
    }

    vue.appendChild(e("button", { class: "lg-lien", onclick: function () { afficher(ecranCollection()); } }, t("voircol")));
    return vue;
  }

  /* =================================================================
     LA LECON — construction du plan d'exercices
     ================================================================= */
  var L = null; /* lecon en cours */

  function lancerLecon() {
    var mots = LEX.ecurie.concepts.filter(function (c) { return c.niveau === 1; });
    var plan = [];
    mots.forEach(function (c) { plan.push({ type: "decouverte", c: c }); });

    var types = ["choix", "ecoute", "ecrire", "choix", "ecoute", "ecrire"];
    melanger(mots).forEach(function (c, i) {
      var ty = types[i % types.length];
      /* On ne demande pas d'ecrire en japonais depuis un clavier latin :
         l'exercice devient un choix. */
      if (ty === "ecrire" && S.cible === "ja") ty = "choix";
      plan.push({ type: ty, c: c });
    });
    plan.push({ type: "phrase", p: LEX.ecurie.phrases[0] });

    L = { plan: plan, i: 0, justes: 0, nouvelles: [], pool: mots };
    etape();
  }

  function etape() {
    if (L.i >= L.plan.length) return ecranFin();
    var ex = L.plan[L.i];
    var f = { decouverte: exDecouverte, choix: exChoix, ecoute: exEcoute, ecrire: exEcrire, phrase: exPhrase }[ex.type];
    afficher(coquille(f(ex)));
  }

  function coquille(contenu) {
    var segs = e("div", { class: "lg-jauge" },
      L.plan.map(function (x, i) {
        return e("i", { class: "lg-seg" + (i < L.i ? " est-fait" : (i === L.i ? " est-ici" : "")) });
      })
    );
    return e("div", { class: "lg-ecran lg-lecon" },
      e("div", { class: "lg-barre" },
        e("button", { class: "lg-fermer", "aria-label": t("retour"), onclick: function () { afficher(ecranDepart()); } }, "✕"),
        segs
      ),
      contenu
    );
  }

  function suivant(juste, ref) {
    if (juste) {
      L.justes++;
      if (ref) {
        var n = (S.maitrise[ref] || 0);
        if (n === 0) L.nouvelles.push(ref);
        S.maitrise[ref] = Math.min(5, n + 1);
      }
      S.xp += 10; HOST.xpAjouter(10);
    }
    sauver();
    L.i++; etape();
  }

  /* ---------- verdict commun ---------- */
  function verdict(zone, juste, bonneRep, apres) {
    zone.className = "lg-verdict " + (juste ? "est-juste" : "est-faux");
    vider(zone);
    zone.appendChild(e("p", { class: "lg-verdict-t", text: juste ? t("bravo") : t("presque") }));
    if (!juste && bonneRep) zone.appendChild(e("p", { class: "lg-verdict-r", text: t("reponse") + " : " + bonneRep }));
    zone.appendChild(e("button", { class: "lg-cta", onclick: apres }, t("continuer")));
  }

  /* ---------- 1. decouverte : la carte de mot ---------- */
  function exDecouverte(ex) {
    var c = ex.c, ui = langueUI(), cible = S.cible;
    var mc = c.mots[cible], mu = c.mots[ui];
    return e("div", { class: "lg-corps" },
      e("div", { class: "lg-carte" },
        e("div", { class: "lg-halo" }),
        e("p", { class: "lg-carte-mot", text: mc.m }),
        e("p", { class: "lg-carte-phon", text: "[ " + mc.p + " ]" }),
        mc.var ? e("p", { class: "lg-carte-var", text: mc.var }) : null,
        e("div", { class: "lg-fil" }),
        e("p", { class: "lg-carte-trad", text: mu.m }),
        e("button", { class: "lg-son", onclick: function () { dire(mc.m, cible); } }, "♪  " + t("prononce"))
      ),
      e("p", { class: "lg-def", text: c.def[ui] || c.def.fr }),
      e("button", { class: "lg-cta", onclick: function () { dire(mc.m, cible); setTimeout(function () { suivant(false, null); }, 260); } }, t("continuer"))
    );
  }

  /* ---------- 2. choix parmi quatre ---------- */
  function exChoix(ex) {
    var c = ex.c, ui = langueUI(), cible = S.cible;
    var versCible = Math.random() < 0.5; /* les deux sens, toujours */
    var srcL = versCible ? ui : cible, dstL = versCible ? cible : ui;
    var bonne = c.mots[dstL].m;
    var leurres = melanger(L.pool.filter(function (x) { return x.ref !== c.ref; })).slice(0, 3)
      .map(function (x) { return x.mots[dstL].m; });
    var options = melanger([bonne].concat(leurres));
    var zone = e("div", { class: "lg-verdict" });

    var corps = e("div", { class: "lg-corps" },
      e("p", { class: "lg-consigne", text: t("quelmot") }),
      e("p", { class: "lg-invite", text: c.mots[srcL].m }),
      e("div", { class: "lg-options" },
        options.map(function (o) {
          return e("button", { class: "lg-opt", onclick: function () {
            var juste = (o === bonne);
            this.classList.add(juste ? "est-juste" : "est-faux");
            Array.prototype.forEach.call(corps.querySelectorAll(".lg-opt"), function (b) { b.disabled = true; });
            if (dstL === cible) dire(bonne, cible);
            verdict(zone, juste, bonne, function () { suivant(juste, c.ref); });
          } }, o);
        })
      ),
      zone
    );
    return corps;
  }

  /* ---------- 3. ecoute puis choisis ---------- */
  function exEcoute(ex) {
    var c = ex.c, cible = S.cible;
    var bonne = c.mots[cible].m;
    var leurres = melanger(L.pool.filter(function (x) { return x.ref !== c.ref; })).slice(0, 3)
      .map(function (x) { return x.mots[cible].m; });
    var options = melanger([bonne].concat(leurres));
    var zone = e("div", { class: "lg-verdict" });
    setTimeout(function () { dire(bonne, cible); }, 380);

    var corps = e("div", { class: "lg-corps" },
      e("p", { class: "lg-consigne", text: t("ecoute") }),
      e("button", { class: "lg-hautparleur", onclick: function () { dire(bonne, cible); } }, "♪"),
      e("p", { class: "lg-rejouer", text: t("rejouer") }),
      e("div", { class: "lg-options" },
        options.map(function (o) {
          return e("button", { class: "lg-opt", onclick: function () {
            var juste = (o === bonne);
            this.classList.add(juste ? "est-juste" : "est-faux");
            Array.prototype.forEach.call(corps.querySelectorAll(".lg-opt"), function (b) { b.disabled = true; });
            verdict(zone, juste, bonne, function () { suivant(juste, c.ref); });
          } }, o);
        })
      ),
      zone
    );
    return corps;
  }

  /* ---------- 4. ecrire ---------- */
  function exEcrire(ex) {
    var c = ex.c, ui = langueUI(), cible = S.cible;
    var bonne = c.mots[cible].m;
    var zone = e("div", { class: "lg-verdict" });
    var champ = e("input", { class: "lg-champ", type: "text", autocapitalize: "none",
      autocomplete: "off", spellcheck: "false", placeholder: "…" });

    function valider() {
      var juste = motNu(champ.value) === motNu(bonne);
      champ.disabled = true;
      champ.classList.add(juste ? "est-juste" : "est-faux");
      if (juste) dire(bonne, cible);
      verdict(zone, juste, bonne, function () { suivant(juste, c.ref); });
    }

    return e("div", { class: "lg-corps" },
      e("p", { class: "lg-consigne", text: t("ecris") }),
      e("p", { class: "lg-invite", text: c.mots[ui].m }),
      champ,
      e("button", { class: "lg-cta", onclick: valider }, t("verifier")),
      zone
    );
  }

  /* ---------- 5. remettre la phrase dans l'ordre ---------- */
  function exPhrase(ex) {
    var cible = S.cible, ui = langueUI();
    var attendue = ex.p[cible];
    var tuiles = attendue.split(" ").filter(function (x) { return x.length; });
    var zone = e("div", { class: "lg-verdict" });
    var choisies = [];

    var ligne = e("div", { class: "lg-ligne" });
    var banc = e("div", { class: "lg-banc" });

    function redessiner() {
      vider(ligne); vider(banc);
      choisies.forEach(function (mot, idx) {
        ligne.appendChild(e("button", { class: "lg-tuile est-posee", onclick: function () {
          choisies.splice(idx, 1); redessiner();
        } }, mot));
      });
      if (!choisies.length) ligne.appendChild(e("span", { class: "lg-ligne-vide", text: "· · ·" }));
      dispo.forEach(function (mot, idx) {
        if (utilisees[idx]) return;
        banc.appendChild(e("button", { class: "lg-tuile", onclick: function () {
          utilisees[idx] = true; choisies.push(mot); redessiner();
        } }, mot));
      });
    }

    var dispo = melanger(tuiles), utilisees = {};
    redessiner();

    return e("div", { class: "lg-corps" },
      e("p", { class: "lg-consigne", text: t("ordre") }),
      e("p", { class: "lg-invite lg-invite-petit", text: ex.p[ui] }),
      ligne, banc,
      e("button", { class: "lg-cta", onclick: function () {
        var juste = choisies.join(" ") === attendue;
        if (juste) dire(attendue, cible);
        verdict(zone, juste, attendue, function () { suivant(juste, null); });
      } }, t("verifier")),
      zone
    );
  }

  /* =================================================================
     FIN DE LECON — le tampon sur le passeport (element signature)
     ================================================================= */
  function ecranFin() {
    var ui = langueUI(), cible = S.cible;
    var nom = PAYS[cible].nom[ui] || PAYS[cible].nom.fr;
    if (S.tampons.indexOf(cible + ":ecurie") < 0) S.tampons.push(cible + ":ecurie");
    sauver();

    var page = e("div", { class: "lg-passeport" },
      e("p", { class: "lg-pp-titre", text: t("passeport") }),
      e("div", { class: "lg-pp-page" },
        e("p", { class: "lg-pp-pays", text: PAYS[cible].drapeau + "  " + nom }),
        e("div", { class: "lg-pp-lignes" },
          [1, 2, 3, 4].map(function () { return e("i", { class: "lg-pp-l" }); })),
        e("div", { class: "lg-tampon" },
          e("span", { class: "lg-tampon-h", text: LEX.ecurie.titre[ui] || LEX.ecurie.titre.fr }),
          e("span", { class: "lg-tampon-b", text: nom.toUpperCase() })
        )
      )
    );

    var vue = e("div", { class: "lg-ecran lg-fin" },
      e("div", { class: "lg-ciel" }),
      e("img", { class: "lg-apy-fete", src: "apy.webp", alt: "Apy", width: "120" }),
      e("h1", { class: "lg-h1", text: t("fini") }),
      e("p", { class: "lg-score", text: "+ " + (L.justes * 10) + " XP" }),
      page,
      e("p", { class: "lg-note", text: t("tampon") }),
      L.nouvelles.length ? e("p", { class: "lg-note lg-note-or", text: L.nouvelles.length + " " + t("cartes") }) : null,
      e("button", { class: "lg-cta", onclick: function () { afficher(ecranCollection()); } }, t("voircol")),
      e("button", { class: "lg-lien", onclick: function () { lancerLecon(); } }, t("refaire"))
    );
    return vue;
  }

  /* =================================================================
     COLLECTION — la carte se retourne sur sa definition
     ================================================================= */
  function ecranCollection() {
    var ui = langueUI(), cible = S.cible || "en";
    var grille = e("div", { class: "lg-grille" },
      LEX.ecurie.concepts.map(function (c) {
        var n = S.maitrise[c.ref] || 0;
        var carte = e("button", { class: "lg-mini" + (n ? "" : " est-verrouille") });
        var face = e("div", { class: "lg-mini-face" },
          e("p", { class: "lg-mini-mot", text: n ? c.mots[cible].m : "?" }),
          n ? e("p", { class: "lg-mini-trad", text: c.mots[ui].m }) : e("p", { class: "lg-mini-trad", text: t("verrou") }),
          e("div", { class: "lg-points" }, [1, 2, 3, 4, 5].map(function (i) {
            return e("i", { class: "lg-pt" + (i <= n ? " est-plein" : "") });
          }))
        );
        var dos = e("div", { class: "lg-mini-dos" },
          e("p", { class: "lg-mini-def", text: c.def[ui] || c.def.fr }));
        carte.appendChild(face); carte.appendChild(dos);
        if (n) carte.addEventListener("click", function () {
          carte.classList.toggle("est-retourne");
          if (!carte.classList.contains("est-retourne")) dire(c.mots[cible].m, cible);
        });
        return carte;
      })
    );

    var faites = Object.keys(S.maitrise).length;
    return e("div", { class: "lg-ecran lg-col" },
      e("div", { class: "lg-barre" },
        e("button", { class: "lg-fermer", onclick: function () { afficher(ecranDepart()); } }, "←"),
        e("p", { class: "lg-barre-t", text: t("collection") })
      ),
      e("p", { class: "lg-eyebrow", text: LEX.ecurie.titre[ui] + " · " + faites + " / " + LEX.ecurie.concepts.length }),
      grille
    );
  }

  /* =================================================================
     DEMARRAGE
     ================================================================= */
  function demarrer(cible) {
    racine = cible;
    S = HOST.charger() || etatVide();
    if (!S.maitrise) S = etatVide();
    afficher(ecranDepart());
  }

  window.HypeLingo = { demarrer: demarrer, version: "0.1" };
})();
