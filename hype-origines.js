/* ============================================================
   HYPE — LIRE L'IDENTITÉ ET LES ORIGINES D'UN CHEVAL
   ------------------------------------------------------------
   25/08/2026 · session 162 · première pierre

   Ce fichier ne fait QUE LIRE. Il n'écrit rien, ne touche à aucune base,
   ne connaît ni React ni le DOM. Une seule entrée : le texte brut d'un
   PDF. Une seule sortie : un objet.
   C'est volontaire — même gabarit que les sept fonctions pures de la
   session 160, pour que la frontière Données existe le jour du passage
   à Flutter.

   🟥 UNE SOURCE PAR LECTEUR, ET AUCUN LECTEUR ÉCRIT AU JUGÉ.
   `ffe-cavalerie` est le seul format dont j'ai de VRAIS fichiers
   (Rizotto d'Émery 2020, Tully Blue Moon 2022, vérifiés ligne à ligne).
   Les autres — FFE SIF, FFE Compet, Haras SIRE (IFCE), bases
   internationales — sont DÉCLARÉS mais VIDES : ils renvoient null tant
   qu'un vrai fichier n'a pas été lu. Écrire leurs motifs sans échantillon
   reviendrait à inventer, et un lecteur qui invente est pire qu'un
   lecteur absent : il remplit la fiche avec des bêtises silencieuses.

   🟥 CE LECTEUR NE DÉCIDE JAMAIS. Il rend ce qu'il a lu, avec le degré de
   confiance de chaque champ. C'est l'écran de relecture qui montre, et
   c'est la cavalière qui valide — comme pour les résultats.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- outils ---------- */

  /* PDF.js déforme : espaces doublés, lettres collées, tirets exotiques.
     On normalise AVANT de chercher, jamais l'inverse. */
  function propre(t) {
    return String(t == null ? "" : t)
      .replace(/\u00A0/g, " ")
      .replace(/[\u2010-\u2015\u2212]/g, "-")
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  /* Un nom propre lu par reconnaissance de texte : on garde la casse
     d'origine, on retire seulement les flèches et la ponctuation de
     navigation que la page FFE colle devant les ascendants. */
  function nomPropre(t) {
    var s = propre(t).replace(/^[\u2192>\-\s:]+/, "").replace(/[\s:]+$/, "");
    return s;
  }

  /* jj/mm/aaaa -> aaaa-mm-jj, et rien du tout si la date est absurde. */
  function versISO(j, m, a) {
    var J = Number(j), M = Number(m), A = Number(a);
    if (!(J >= 1 && J <= 31 && M >= 1 && M <= 12 && A >= 1950 && A <= 2100)) return null;
    return A + "-" + String(M).padStart(2, "0") + "-" + String(J).padStart(2, "0");
  }

  /* 🟥 L'ÂGE N'EST JAMAIS LU, IL EST CALCULÉ.
     Un âge écrit en dur est faux quelques mois plus tard et personne ne
     le voit. La date de naissance, elle, reste juste pour toujours. */
  function ageAu(dateISO, quand) {
    if (!dateISO) return null;
    var n = new Date(dateISO + "T00:00:00Z");
    var d = quand ? new Date(quand) : new Date();
    if (isNaN(n.getTime())) return null;
    var a = d.getUTCFullYear() - n.getUTCFullYear();
    var m = d.getUTCMonth() - n.getUTCMonth();
    if (m < 0 || (m === 0 && d.getUTCDate() < n.getUTCDate())) a--;
    return a >= 0 ? a : null;
  }

  /* ---------- source 1 : FFE, page cavalerie Club/Poney ----------
     ÉPROUVÉE sur deux vrais fichiers. Forme de l'en-tête :

        TULLY BLUE MOON
        Poney Francais De Selle né le
        19/05/2007                    Changer
        Robe : Gris | Sexe : Femelle | Taille : Catégorie D
        Père : → Kooihuster Teake Mère : → Leila De L'Aubier
        Naisseurs : CLAUDE BILLAT–ANNE-MIEKE SCHOL
        Référent déclaré à la FFE : HARAS D AMBREVAL (2026)

     ⚠️ « né le » et la date sont sur DEUX LIGNES. « Père » et « Mère »
     sont sur la MÊME. Les deux pièges sont tenus ici.
     ⚠️ « Naisseur » ou « Naisseurs », avec ou sans s. »Propriétaire » est
     présent sur certains fichiers et absent sur d'autres.            */

  function lireFFECavalerie(texte) {
    var t = String(texte == null ? "" : texte).replace(/\u00A0/g, " ");
    var out = { source: "ffe-cavalerie" }, doutes = [];

    /* race + date de naissance : « <race> né(e) le \n jj/mm/aaaa » */
    var mNe = t.match(/([A-Za-zÀ-ÿ'’\- ]{3,60}?)\s*n[ée]{1,2}\s+le\s*[\r\n ]+\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
    if (mNe) {
      out.race = nomPropre(mNe[1]);
      out.naissance = versISO(mNe[2], mNe[3], mNe[4]);
    }

    /* robe · sexe · taille, sur une seule ligne séparée par des barres */
    var mR = t.match(/Robe\s*:\s*([^|\r\n]+)/i);       if (mR) out.robe = nomPropre(mR[1]);
    var mS = t.match(/Sexe\s*:\s*([^|\r\n]+)/i);       if (mS) out.sexe = nomPropre(mS[1]);
    var mT = t.match(/Taille\s*:\s*([^|\r\n]+)/i);     if (mT) out.taille = nomPropre(mT[1]);

    /* père ET mère sur la même ligne : on coupe à « Mère » */
    var mPM = t.match(/P[èe]re\s*:\s*([^\r\n]*?)\s*M[èe]re\s*:\s*([^\r\n]+)/i);
    if (mPM) {
      out.pere = nomPropre(mPM[1]);
      out.mere = nomPropre(mPM[2]);
    } else {
      var mP = t.match(/P[èe]re\s*:\s*([^\r\n|]+)/i);  if (mP) out.pere = nomPropre(mP[1]);
      var mM = t.match(/M[èe]re\s*:\s*([^\r\n|]+)/i);  if (mM) out.mere = nomPropre(mM[1]);
    }

    var mN = t.match(/Naisseurs?\s*:\s*([^\r\n]+)/i);        if (mN) out.naisseur = nomPropre(mN[1]);
    var mPr = t.match(/Propri[ée]taire\s*:\s*([^\r\n]+?)\s*(?:Naisseurs?\s*:|$)/im);
    if (mPr) out.proprietaire = nomPropre(mPr[1]);

    /* 🟥 CE QUE CE FORMAT NE CONTIENT PAS : le numéro SIRE.
       Vérifié sur les deux fichiers, zéro occurrence. Ne pas l'inventer,
       ne pas le déduire d'autre chose. */
    out.sire = null;

    /* les doutes, pour que l'écran de relecture les mette en avant */
    if (!out.naissance) doutes.push("date de naissance introuvable");
    ["pere", "mere"].forEach(function (k) {
      var v = out[k];
      if (!v) { doutes.push((k === "pere" ? "père" : "mère") + " introuvable"); return; }
      /* un nom d'ascendant déformé par PDF.js : chiffres, ou trop court */
      if (/\d/.test(v) || v.length < 3) doutes.push("nom à relire : « " + v + " »");
    });
    out.doutes = doutes;
    return out;
  }

  /* ---------- les autres sources : DÉCLARÉES, PAS ÉCRITES ----------
     🟥 Chacune attend UN vrai fichier avant d'exister. Elles renvoient
     null, et l'appelant le voit : c'est un « je ne sais pas lire ça »
     honnête, jamais un objet à moitié rempli. */

  var SOURCES = {
    "ffe-cavalerie": { nom: "FFE · ma cavalerie", lire: lireFFECavalerie, prete: true },
    "ffe-sif":       { nom: "FFE SIF",            lire: null, prete: false },
    "ffe-compet":    { nom: "FFE Compet",         lire: null, prete: false },
    "haras-sire":    { nom: "Haras SIRE (IFCE)",  lire: null, prete: false },
    "international": { nom: "base internationale", lire: null, prete: false }
  };

  /* ---------- reconnaître la source ----------
     On ne demande rien à la cavalière : on regarde ce qu'il y a dans le
     fichier. Si rien ne correspond, on le DIT au lieu de tenter. */

  function reconnaitre(texte) {
    var t = String(texte == null ? "" : texte);
    if (/Cavalerie\s+Club\/Poney/i.test(t) || /R[ée]sultats concours\s+Qualification/i.test(t))
      return "ffe-cavalerie";
    if (/\bSIF\b/i.test(t) && /FFE/i.test(t))            return "ffe-sif";
    if (/ffecompet/i.test(t))                            return "ffe-compet";
    if (/haras[- ]?nationaux|IFCE|SIRE/i.test(t))        return "haras-sire";
    return null;
  }

  /* ---------- l'entrée unique ---------- */

  function lireIdentite(texte) {
    var cle = reconnaitre(texte);
    if (!cle) return { ok: false, raison: "source inconnue", source: null };
    var s = SOURCES[cle];
    if (!s || !s.prete || typeof s.lire !== "function")
      return { ok: false, raison: "lecteur pas encore écrit", source: cle, nomSource: s ? s.nom : null };
    var d = s.lire(texte);
    d.age = ageAu(d.naissance);
    d.ok = !!(d.naissance || d.pere || d.mere);
    d.nomSource = s.nom;
    return d;
  }

  /* ---------- ce qui change sur la fiche ----------
     🟥 NE REMPLIT QUE LES CASES VIDES. Écraser une saisie faite à la main
     serait la même faute que les trois lignes en dur corrigées le 24/08.
     Rend deux listes : ce qui s'ajoute, et ce qui DIFFÈRE — à montrer
     côte à côte, jamais à trancher tout seul. */

  function comparerAFiche(lu, fiche) {
    fiche = fiche || {};
    var champs = ["race", "naissance", "robe", "sexe", "taille", "pere", "mere", "naisseur"];
    var ajouts = [], conflits = [];
    champs.forEach(function (k) {
      var neuf = lu && lu[k], vieux = fiche[k];
      if (!neuf) return;
      if (vieux == null || String(vieux).trim() === "") { ajouts.push({ champ: k, valeur: neuf }); return; }
      if (String(vieux).trim().toLowerCase() !== String(neuf).trim().toLowerCase())
        conflits.push({ champ: k, actuel: vieux, propose: neuf });
    });
    return { ajouts: ajouts, conflits: conflits };
  }

  var API = {
    lireIdentite: lireIdentite,
    reconnaitre: reconnaitre,
    comparerAFiche: comparerAFiche,
    ageAu: ageAu,
    sources: SOURCES,
    _lireFFECavalerie: lireFFECavalerie
  };

  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (typeof window !== "undefined") window.HYPE_ORIGINES = API;
})();
