/* t_19b.js — assertions structurelles des correctifs 19b.
   NOTE : ce n'est PAS smoke.js (absent de la conversation, signalé à Blandine).
   Il vérifie uniquement ce que la session 135 a touché, plus les garde-fous. */
var fs = require("fs");
var st = fs.readFileSync("hype-stories.js", "utf8");
var ix = fs.readFileSync("index.html", "utf8");
var ok = 0, ko = [];
function a(nom, cond) { if (cond) ok++; else ko.push(nom); }

/* Versions et livraison */
a("VERSION 19r", /var HYPE_STORIES_VERSION = "19r";/.test(st));
a("index ?v=19r", ix.indexOf('hype-stories.js?v=19r') > -1);
a("index ne garde pas l'ancien ?v=", ix.indexOf('hype-stories.js?v=19q') === -1 && ix.indexOf('hype-stories.js?v=19p') === -1);
a("modeles-db monte a ?v=5", ix.indexOf('hype-modeles-db.js?v=5') > -1);
var db = fs.readFileSync("hype-modeles-db.js", "utf8");
a("catalogue a 27 modeles", (db.match(/"modele-[a-z0-9-]+": \{"taille"/g) || []).length === 28);
a("modele-24 present", db.indexOf('"modele-24"') > -1);
a("modele-25 present", db.indexOf('"modele-25"') > -1);
a("db sans code", db.indexOf("function") === -1);
a("modele-24 a 2 fenetres", (function(){ global.window={}; delete require.cache[require.resolve("./hype-modeles-db.js")]; require("./hype-modeles-db.js"); return global.window.HYPE_MODELES["modele-24"].fenetres.length === 2; })());
a("modele-25 a 1 fenetre", global.window.HYPE_MODELES["modele-25"].fenetres.length === 1);
a("modele-26 a 5 fenetres", global.window.HYPE_MODELES["modele-26"].fenetres.length === 5);
a("modele-27 a 2 fenetres", global.window.HYPE_MODELES["modele-27"].fenetres.length === 2);
a("concours-4 intact a 4 fenetres", global.window.HYPE_MODELES["modele-concours-4"].fenetres.length === 4);
a("la 5e fenetre est horizontale", (function(){ var f = global.window.HYPE_MODELES["modele-26"].fenetres[4].bbox; return f[2] > f[3] * 3; })());
a("toutes les fenetres ont contour+bbox", Object.keys(global.window.HYPE_MODELES).every(function(k){ return global.window.HYPE_MODELES[k].fenetres.every(function(f){ return f.contour && f.contour.length >= 3 && f.bbox && f.bbox.length === 4; }); }));

/* 1. Vignettes fabriquées au canvas, une par une */
a("hsVignetteFichier existe", /function hsVignetteFichier\(fichier, cote\)/.test(st));
a("canvas + drawImage", st.indexOf("ctx.drawImage(img, 0, 0, c.width, c.height)") > -1);
a("original relache (revokeObjectURL)", /revokeObjectURL\(brut\)/.test(st));
a("img.src vide apres usage", /img\.src = ""/.test(st));
a("canvas ramene a 1x1", (st.match(/c\.width = 1; c\.height = 1;/g) || []).length >= 2);
a("aucun createObjectURL direct pour les miniatures", st.indexOf("urls = fichiers.map(function (f) { try { return window.URL.createObjectURL(f)") === -1);
a("miniatures sequentielles (await dans la boucle)", /for \(var i = 0; i < fichiersBruts\.length; i\+\+\)[\s\S]{0,220}await hsVignetteFichier\(fichiersBruts\[i\], 200\)/.test(st));
a("apercu reduit a la taille d'ecran", /await hsVignetteFichier\(f, hsCoteEcran\(\)\)/.test(st));
a("hsCoteEcran plafonne a 1600", /return Math\.min\(1600,/.test(st));
a("hsLibererUrl ne revoque que des blob:", /indexOf\("blob:"\) === 0/.test(st));

/* 2. Visionneuse en veille pendant le composeur d'ajout */
a("enVeille defini", /var enVeille = !!ajout;/.test(st));
a("composition en veille", /!erreur && !enVeille && !estAlbum && hsAvecDecor\(story\)/.test(st));
a("zoom en veille", /chargee && !erreur && !enVeille\)\s*\n?\s*\? h\(PhotoZoomHype/.test(st.replace(/\r/g, "")));
a("img de chargement en veille", /enVeille \? null : h\("img", \{/.test(st));

/* 3. Plein ecran d'une composition : composition demontee */
a("sortie anticipee si plein", /if \(plein\) return h\("div", \{ style: \{ position: "relative", width: "100%", height: "100%" \} \}, cadres, surcouche\);/.test(st));
a("PhotoZoomHype toujours utilise en plein ecran", st.indexOf('h(PhotoZoomHype, { src: plein })') > -1);

/* 4. Publier dans l'en-tete collant, Annuler en bas */
a("en-tete collant", /position: "sticky", top: 0, zIndex: 6/.test(st));
a("un seul bouton publier dans le composeur", (st.match(/onClick: publier, disabled: busy/g) || []).length === 1);
a("Annuler toujours present", st.indexOf('hsT("annuler", lg)') > -1);

/* 5. Composition en mode ajout + absorption */
a("compoPossible calcule", /var compoPossible = !!\(HS_COMPO_ACTIF && nTotalCompo >= 2 && nTotalCompo <= HS_COMPO_MAX\);/.test(st));
a("plafond 5 inchange", /var HS_COMPO_MAX = 5;/.test(st));
a("presentation plus bloquee en mode ajout", st.indexOf("HS_COMPO_ACTIF && !props.origine && fichiersOrdonnes.length >= 2") === -1);
a("presentation pilotee par compoPossible", /\n        compoPossible\n          \? h\("div", null,/.test(st));
a("la bande montre tout le catalogue", (st.match(/bandeModeles\(/g) || []).length === 3);
a("hsRattacherAuGroupe existe", /async function hsRattacherAuGroupe\(ids, groupe, disposition\)/.test(st));
a("absorption bornee a l'auteur", /\.eq\("user_id", user\.id\)/.test(st));
a("disposition sur la couverture seule", /\.update\(\{ disposition: String\(disposition\) \}\)\.eq\("id", liste\[0\]\)/.test(st));
a("echec d'absorption = aucune insertion", /if \(rAbs && rAbs\.error\) \{ setBusy\(false\); if \(props\.onEchec\) props\.onEchec\(\); return; \}/.test(st));
a("groupe existant reutilise", /\(props\.origine && props\.origine\.groupe\) \? props\.origine\.groupe : hsUuid\(\)/.test(st));
a("nouvelles photos sans disposition en ajout", /grpId\n\s*\? \(\(!props\.origine\) \? compoChoix : null\)/.test(st));
a("origine porte ids et n", /ids: \(story\.compo && story\.compo\.length \? story\.compo : \[story\]\)/.test(st));

/* Textes : 6 langues pour chaque nouveau libelle */
["compoAbsorbe", "compoLegende"].forEach(function (cle) {
  var m = st.match(new RegExp("\\n  " + cle + ": \\{([^\\n]*)\\}"));
  a(cle + " present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) {
    a(cle + "." + lg, new RegExp("\\b" + lg + ": \"").test(m[1]));
  });
});

/* Garde-fous du projet */
a("scrollTop=0 conserve", st.indexOf("corpsRef.current.scrollTop = 0") > -1);
a("pas d'overflow-x:hidden seul", !/overflowX: "hidden"/.test(st));
a("aucun appel setPointerCapture", st.indexOf(".setPointerCapture(") === -1);
a("immersif rallume", /var HS_FOND_IMMERSIF_ACTIF = true;/.test(st));
a("le flou ne touche que le calque de fond", /HS_FOND_IMMERSIF_ACTIF && story\.fond === "immersif"/.test(st));
a("aucune suppression de story ajoutee", (st.match(/\.delete\(\)/g) || []).length === 1);
a("insert toujours unique", (st.match(/from\("hype_stories"\)\.insert/g) || []).length === 2);

/* --- 19c --- */
a("premium transmis (bandeau)", /fichier: fichier, langue: lg, premium: premium,/.test(st));
a("premium transmis (mode ajout)", /fichier: ajout, langue: lg, dessus: true, premium: !!props\.premium,/.test(st));
a("repli ne jette plus le groupe", st.indexOf("delete ligne.groupe;") === -1);
a("composition refusee = rien publie", /if \(ligne\.groupe\) return \{ data: null, error: res\.error, compoRefusee: true \};/.test(st));
a("ligne revenue verifiee", /if \(ligne\.groupe && res && res\.data && !res\.data\.groupe\)/.test(st));
a("publier s'arrete net", /if \(rI && rI\.compoRefusee\)/.test(st));
a("message d'echec porte jusqu'au bandeau", /onEchec: function \(msg\) \{ setComposer\(false\)/.test(st));
a("message precis dans la visionneuse", /noteLibre \|\| messages\[action\]/.test(st));
a("apercu H+D present", /compoChoix === "hd"/.test(st));
a("apercu H+D utilise les vraies vignettes", /urlsMini\.filter\(function \(u\) \{ return !!u; \}\)/.test(st));
a("recadrage 9\/16", /var HS_CADRE_RATIO = 9 \/ 16;/.test(st));
a("recadrage plafonne a 2000 px", /var HS_CADRE_HMAX = 2000;/.test(st));
a("recadrage : repli sur l'original", (st.match(/resolve\(r \|\| fichier\)/g) || []).length === 1);
a("recadrage applique avant l'envoi", /if \(cad && cad\.actif\) fEnvoi = await hsRecadrerFichier\(fEnvoi, cad\.cx\);/.test(st));
a("cadrage reserve aux photos larges", /var photoLarge = !!\(dimPhoto && dimPhoto\.w > dimPhoto\.hh\);/.test(st));
a("cadrage facultatif (photo entiere par defaut)", /puce\(!\(cadrageVue && cadrageVue\.actif\), hsT\("photoEntiere", lg\)/.test(st));
a("apercu du cadrage sans filtre", /objectPosition: \(Math\.round\(cadrageVue\.cx \* 100\)/.test(st));
a("flou servi par une vignette 220", /return vignetteHype\(u, 220, 330\);/.test(st));
a("photo nette sur sa couche", /position: "relative", zIndex: 1, width: "100%", height: "100%"/.test(st));
a("calque de fond en zIndex 0", /position: "absolute", inset: -24, zIndex: 0/.test(st));
a("zone photo protegee du geste systeme", /overflow: "hidden", touchAction: "none"/.test(st));
a("garde retour doublee (index)", ix.indexOf("if (t - (popTsRef.current || 0) < 450)") > -1);
a("rail stories toujours consulte avant retourEcran", ix.indexOf("window.__hsStoriesRetour && window.__hsStoriesRetour()") > -1);
["compoImpossible", "apercuCompo", "cadrer", "photoEntiere", "remplirEcran", "cadrageCoupe"].forEach(function (cle) {
  var m = st.match(new RegExp("\\n  " + cle + ": \\{([^\\n]*)\\}"));
  a(cle + " present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) {
    a(cle + "." + lg, new RegExp("\\b" + lg + ": \"").test(m[1]));
  });
});

/* --- 19d : le decor des UNE photo --- */
a("bloc Decor a 1 photo", /HS_COMPO_ACTIF && !props\.origine && fichiersOrdonnes\.length === 1/.test(st));
a("Decor pioche tout le catalogue", /bandeModeles\(1, decorChoix/.test(st));
a("Decor reserve au premium", /props\.premium\n\s*\? bandeModeles\(1, decorChoix/.test(st));
a("puce Aucun presente", /hsT\("aucunDecor", lg\)/.test(st));
a("decor publie sur une photo seule", /fichiersOrdonnes\.length === 1 && iF === 0\) \? decorChoix : null/.test(st));
a("decor jamais jete en silence", /if \(ligne\.disposition\) return \{ data: null, error: res\.error, decorRefuse: true \};/.test(st));
a("disposition revenue verifiee", /if \(ligne\.disposition && res && res\.data && !res\.data\.disposition\)/.test(st));
a("publier s'arrete sur decor refuse", /if \(rI && rI\.decorRefuse\)/.test(st));
a("hsAvecDecor existe", /function hsAvecDecor\(st\)/.test(st));
a("visionneuse rend le decor d'une story seule", /!estAlbum && hsAvecDecor\(story\)/.test(st));
a("CompositionStory tolere un seul membre", /var membres = \(story\.compo && story\.compo\.length \? story\.compo : \[story\]\);/.test(st));
["decor", "aucunDecor", "decorImpossible"].forEach(function (cle) {
  var m = st.match(new RegExp("\\n  " + cle + ": \\{([^\\n]*)\\}"));
  a(cle + " present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) {
    a(cle + "." + lg, new RegExp("\\b" + lg + ": \"").test(m[1]));
  });
});

/* --- 19e : le h manquant, et la garde generale --- */
a("CompositionStory declare son h", /function CompositionStory\(props\)[\s\S]{0,900}?var h = React\.createElement;/.test(st));
a("aucune variable de rendu non declaree (h, M, C, tn, tnL, tA, th, lg)", require("./audit_vars.js")("hype-stories.js").length === 0);
a("CompositionStory declare son M", /function CompositionStory\(props\)[\s\S]{0,1200}?var M = "'Montserrat'/.test(st));

a("repli propre des vignettes", /function hsVignetteCassee\(ev, brut\)/.test(st));
a("les 4 vignettes passent par le repli", (st.match(/hsVignetteCassee\(ev,/g) || []).length === 5);
a("replierVignette toujours tente en premier", /if \(!dejaTente && typeof replierVignette === "function"\)/.test(st));

a("hsTousModeles existe", /function hsTousModeles\(n\)/.test(st));
a("compatibles en tete", /if \(\(na === n\) !== \(nb === n\)\) return na === n \? -1 : 1;/.test(st));
a("aucun decor grise", !/opacity: compatible/.test(st) && !/grayscale\(1\)/.test(st));
a("incompatible non selectionnable", /if \(!compatible\) \{ setRefuse\(nf\); return; \}/.test(st));
a("chiffre des photos affiche", /\}, String\(nf\)\)\);/.test(st));
["decorDemande", "decorDemande1"].forEach(function (cle) {
  var m = st.match(new RegExp("\\n  " + cle + ": \\{([^\\n]*)\\}"));
  a(cle + " present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) { a(cle + "." + lg, new RegExp("\\b" + lg + ": \"").test(m[1])); });
});

a("tap photo : les trois gestes arretes", /onTouchEnd: function \(ev\) \{ if \(ev && ev\.stopPropagation\) ev\.stopPropagation\(\); \},\n\s*onPointerDown/.test(st));
a("clip-path prefixe Safari", /WebkitClipPath: pc \? \("polygon\("/.test(st));

a("vignette de decor sur fond clair", /background: "linear-gradient\(155deg, #F4F7FA 0%, #C9D3D8 55%, #8A929C 100%\)"/.test(st));
a("plus de vignette de decor sur fond noir", !/src: ref \+ "\.webp"[\s\S]{0,400}background: "#111417"/.test(st));

a("la pastille reste le seul reperage", /background: compatible \? tA\(0\.9\) : "rgba\(10,12,14,0\.85\)"/.test(st));

a("vignettes agrandies", (st.match(/width: 84, height: 132/g) || []).length === 2);
a("plus de vignette en 52x82", !/width: 52, height: 82/.test(st));

a("toute bande horizontale porte data-hscroll", st.split("\n").filter(function (l) { return l.indexOf('overflowX: "auto"') > -1 && l.indexOf("data-hscroll") === -1; }).length === 0);

a("le + ferme la marche", /groupes\.map\(function \(g, i\) \{ return rond\(g, i\); \}\),\n\s*rondAjout\(\)\)/.test(st));
a("le + n'ouvre plus le rail", !/rondAjout\(\),\n\s*groupes\.map/.test(st));

a("retrait d'une photo possible", /function ecarterPhoto\(f\)/.test(st));
a("jamais la derniere photo", /if \(fichiers\.length <= 1\) return;/.test(st));
a("croix seulement a partir de 2", /\(fichiersOrdonnes\.length > 1\)\n\s*\? h\("button", \{\n\s*onClick: function \(ev\) \{ if \(ev && ev\.stopPropagation\)/.test(st));
a("vignettes indexees sur la selection d'origine", /var posBrut = fichiersBruts\.indexOf\(f\)/.test(st));
a("cadrage et ordre remis a zero au retrait", /setOrdre\(null\); setVue\(0\); setCadrages\(\{\}\);/.test(st));
(function () {
  var m = st.match(/\n  retirerPhoto: \{([^\n]*)\}/);
  a("retirerPhoto present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) { a("retirerPhoto." + lg, new RegExp("\\b" + lg + ": \"").test(m[1])); });
})();

a("ajout de photos depuis le composeur", /function surPhotosEnPlus\(ev\)/.test(st));
a("entree fichier multiple dans le composeur", /ref: entreePlusRef, type: "file", accept: "image\/\*", multiple: true/.test(st));
a("bouton cache au plafond", /\(fichiers\.length < HS_MULTI_MAX\)/.test(st));
a("bande visible des une photo", /\(fichiers\.length >= 1 \|\| props\.origine\)/.test(st));
(function () {
  var m = st.match(/\n  ajouterPhotos: \{([^\n]*)\}/);
  a("ajouterPhotos present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) { a("ajouterPhotos." + lg, new RegExp("\\b" + lg + ": \"").test(m[1])); });
})();

a("feuille du composeur en border-box", /width: "100%", boxSizing: "border-box", maxWidth: 520, maxHeight: "88vh"/.test(st));
a("reserve basse pour la barre d'onglets", /padding: "18px 16px calc\(env\(safe-area-inset-bottom\) \+ 104px\)"/.test(st));
a("toutes les feuilles defilantes en border-box", (st.match(/maxHeight: "\\d+vh", overflowY: "auto"/g) || []).length === (st.match(/boxSizing: "border-box", maxWidth: 520, maxHeight: "\\d+vh", overflowY: "auto"/g) || []).length);
a("croix de sortie dans l'en-tete", /onClick: function \(\) \{ if \(!busy && props\.onFermer\) props\.onFermer\(\); \},\n\s*"aria-label": hsT\("annuler", lg\)/.test(st));

a("croix de sortie dans l'en-tete", /onClick: function \(\) \{ if \(!busy && props\.onFermer\) props\.onFermer\(\); \},\n\s*"aria-label": hsT\("annuler", lg\)/.test(st));

a("apercu dans le vrai decor", /L'APERCU DANS LE VRAI DECOR/.test(st));
a("fenetres a l'echelle du modele", /var LARG = 168, ech = LARG \/ \(mod\.taille\[0\] \|\| 941\);/.test(st));
a("decoupe au contour dans l'apercu", /clipPath: pc \? \("polygon\(" \+ pc \+ "\)"\) : "none",\n\s*WebkitClipPath/.test(st));
a("cadrage par fenetre", /var cfS = React\.useState\(\{\}\), cadresFen/.test(st));
a("ratio de fenetre calcule sur la bbox", /return \(f && f\.bbox && f\.bbox\[3\]\) \? \(f\.bbox\[2\] \/ f\.bbox\[3\]\) : 1;/.test(st));
a("recadrage au format de la fenetre a l'envoi", /if \(rr > 0\) fEnvoi = await hsRecadrerFichier\(fEnvoi, cf\.cx, rr, cf\.cy\);/.test(st));
a("recadrage generalise (ratio + centre vertical)", /function hsRecadrerFichier\(fichier, cx, ratioVoulu, cy\)/.test(st));
a("coupe dans la largeur OU la hauteur", /if \(L \/ H > R\) \{ sh = H; sw = H \* R;/.test(st));
a("aucun doublon de cle de texte", (function () {
  var cles = (st.match(/\n  [a-zA-Z0-9_]+: \{ fr: /g) || []).map(function (x) { return x.trim().split(":")[0]; });
  return cles.length === (new Set(cles)).size;
})());
(function () {
  var m = st.match(/\n  cadrerFenetre: \{([^\n]*)\}/);
  a("cadrerFenetre present", !!m);
  if (m) ["fr", "en", "es", "it", "ja", "de"].forEach(function (lg) { a("cadrerFenetre." + lg, new RegExp("\\b" + lg + ": \"").test(m[1])); });
})();

console.log((ko.length ? "\u2717 " : "\u2713 ") + ok + " assertions vertes" + (ko.length ? (", " + ko.length + " ROUGES :\n  - " + ko.join("\n  - ")) : ""));
process.exit(ko.length ? 1 : 0);
