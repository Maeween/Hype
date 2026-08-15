/* t_19ab.js — controle des fonctions pures de la 19ab */
global.window = { HYPE_MODELES: {
  "modele-A": { taille:[941,1672], fenetres:[{bbox:[0,0,800,450]},{bbox:[0,500,800,450]}] },   /* 2 fenetres COUCHEES */
  "modele-B": { taille:[941,1672], fenetres:[{bbox:[0,0,400,800]},{bbox:[450,0,400,800]}] },   /* 2 fenetres DEBOUT  */
  "modele-C": { taille:[941,1672], fenetres:[{bbox:[0,0,800,800]}] },                          /* 1 fenetre carree   */
  "modele-D": { taille:[941,1672], fenetres:[{bbox:[0,0,300,300]},{bbox:[0,0,300,300]},{bbox:[0,0,300,300]}] }
}};
global.document = { createElement: function(){ return { getContext:function(){return {drawImage:function(){}};} }; } };
global.React = { useState:function(v){return [v,function(){}];}, useRef:function(v){return {current:v};}, useEffect:function(){} };
var src = require("fs").readFileSync("hype-stories.js","utf8");
eval(src);

var n=0, ko=0;
function t(nom, cond){ n++; if(!cond){ ko++; console.log("  ECHEC : "+nom); } }

/* --- hsPertePhoto --- */
t("formes identiques = aucune perte", hsPertePhoto(1.5,1.5) === 0);
t("couchee dans debout = grosse perte", hsPertePhoto(1.78,0.56) > 0.6);
t("perte symetrique", Math.abs(hsPertePhoto(1.78,0.56)-hsPertePhoto(0.56,1.78)) < 1e-9);
t("perte bornee 0..1", hsPertePhoto(10,0.1) < 1 && hsPertePhoto(10,0.1) > 0.9);
t("valeurs absentes = 0", hsPertePhoto(null,1.5) === 0 && hsPertePhoto(1.5,0) === 0);

/* --- hsModelesPourN : le filtre par nombre --- */
t("2 photos -> seulement les decors a 2 fenetres", JSON.stringify(hsModelesPourN(2)) === JSON.stringify(["modele-A","modele-B"]));
t("1 photo -> un seul decor", JSON.stringify(hsModelesPourN(1)) === JSON.stringify(["modele-C"]));
t("3 photos -> un seul decor", JSON.stringify(hsModelesPourN(3)) === JSON.stringify(["modele-D"]));
t("compte absent -> liste vide (le repli prendra le relais)", hsModelesPourN(4).length === 0);

/* --- hsAccordModele : le classement par forme --- */
var deuxCouchees = [16/9, 16/9];
var deuxDebout   = [9/16, 9/16];
t("2 couchees : A (fenetres couchees) meilleur que B", hsAccordModele("modele-A",deuxCouchees) < hsAccordModele("modele-B",deuxCouchees));
t("2 debout : B meilleur que A", hsAccordModele("modele-B",deuxDebout) < hsAccordModele("modele-A",deuxDebout));
t("formes inconnues : aucune penalite", hsAccordModele("modele-A",[null,null]) === 0);
t("une seule forme connue : on juge sur elle", hsAccordModele("modele-A",[16/9,null]) === hsAccordModele("modele-A",[16/9]));
t("decor inconnu = pire score", hsAccordModele("modele-ZZZ",deuxCouchees) === 1);

/* --- le classement complet, tel que la bande l'appliquera --- */
function classer(nCible, formes){
  var l = hsModelesPourN(nCible); var s={};
  l.forEach(function(k){ s[k]=hsAccordModele(k,formes); });
  return l.slice().sort(function(a,b){ return s[a]!==s[b] ? s[a]-s[b] : (a<b?-1:1); });
}
t("2 photos couchees -> A en tete", classer(2,deuxCouchees)[0] === "modele-A");
t("2 photos debout -> B en tete", classer(2,deuxDebout)[0] === "modele-B");
t("le classement ne perd aucun decor", classer(2,deuxCouchees).length === 2);

console.log((n-ko)+"/"+n+" verifications passees.");
process.exit(ko?1:0);
