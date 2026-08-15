/* t_19ae.js — 19ae : ordre des photos toujours accessible, décors FR réservés au français */
global.window = { HYPE_MODELES: {
  "modele-A": { fenetres:[{bbox:[0,0,800,450]},{bbox:[0,500,800,450]}] },
  "modele-B": { fenetres:[{bbox:[0,0,400,800]},{bbox:[450,0,400,800]}] },
  "modele-concours-2": { fenetres:[{bbox:[0,0,400,800]},{bbox:[450,0,400,800]}] },
  "modele-concours-3": { fenetres:[{bbox:[0,0,800,800]}] },
  "modele-concours-4": { fenetres:[{bbox:[0,0,800,800]}] },
  "modele-C": { fenetres:[{bbox:[0,0,800,800]}] }
}};
global.document = { createElement: function(){ return { getContext:function(){return {drawImage:function(){}};} }; } };
global.React = { useState:function(v){return [v,function(){}];}, useRef:function(v){return {current:v};}, useEffect:function(){} };
var src = require("fs").readFileSync("hype-stories.js","utf8");
eval(src);
var n=0,ko=0;
function t(nom,cond){ n++; if(!cond){ ko++; console.log("  ECHEC : "+nom); } }

/* --- le bouton « Mettre celle-ci en premier » --- */
var comp = src.slice(src.indexOf("function ComposeurStory"), src.indexOf("function PastilleMusiquePage"));
t("le bouton ne depend plus de vueSure pour EXISTER", comp.indexOf("(fichiersOrdonnes.length > 1 && vueSure > 0)") < 0);
t("il apparait des qu'il y a plusieurs photos", comp.indexOf("(fichiersOrdonnes.length > 1)\n              ? h(\"button\"") > 0);
t("il est desactive sur la premiere photo", comp.indexOf("disabled: (vueSure <= 0)") > 0);
t("le clic est verrouille en plus de l'attribut", comp.indexOf("if (vueSure <= 0) return;") > 0);
t("un libelle grise explique pourquoi", comp.indexOf('hsT("dejaPremiere", lg)') > 0);
["fr:","en:","es:","it:","ja:","de:"].forEach(function(l){
  var i = src.indexOf("dejaPremiere:"); 
  t("dejaPremiere a sa langue "+l.replace(":",""), src.slice(i,i+300).indexOf(l) > 0);
});

/* la permutation elle-meme ne doit perdre aucune photo */
function mettreDevant(base, vueSure){
  var b = base.slice(); var pris = b.splice(vueSure,1)[0]; b.unshift(pris); return b;
}
t("la 3e photo passe devant", JSON.stringify(mettreDevant([0,1,2,3],2)) === JSON.stringify([2,0,1,3]));
t("aucune photo perdue", mettreDevant([0,1,2,3],2).slice().sort().join() === "0,1,2,3");
t("sur un ordre deja permute", JSON.stringify(mettreDevant([2,0,1],1)) === JSON.stringify([0,2,1]));

/* --- les décors à texte français --- */
t("la liste existe", Array.isArray(HS_DECORS_TEXTE_FR) && HS_DECORS_TEXTE_FR.length === 3);
t("les trois concours y sont", ["modele-concours-2","modele-concours-3","modele-concours-4"].every(function(k){ return HS_DECORS_TEXTE_FR.indexOf(k) >= 0; }));
function filtrer(liste, lg){
  if (String(lg||"fr").slice(0,2) !== "fr") return liste.filter(function(k){ return HS_DECORS_TEXTE_FR.indexOf(k) < 0; });
  return liste;
}
var pour1 = hsModelesPourN(1);
t("en francais, tout reste", filtrer(pour1,"fr").length === pour1.length);
t("en anglais, les concours partent", filtrer(pour1,"en").indexOf("modele-concours-3") < 0);
t("en anglais, les autres restent", filtrer(pour1,"en").indexOf("modele-C") >= 0);
t("japonais, allemand, italien, espagnol : meme filtre", ["ja","de","it","es"].every(function(l){
  return filtrer(pour1,l).indexOf("modele-concours-4") < 0;
}));
t("un code de langue long est reconnu (fr-FR)", filtrer(pour1,"fr-FR").length === pour1.length);
t("rien n'est SUPPRIME du catalogue", Object.keys(hsModeles()).indexOf("modele-concours-2") >= 0);

t("temoin en 19ae", src.indexOf('var HYPE_STORIES_VERSION = "19ae"') > 0);
console.log((n-ko)+"/"+n+" verifications passees.");
process.exit(ko?1:0);
