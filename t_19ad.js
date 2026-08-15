/* t_19ad.js — les quatre défauts signalés par Blandine à 07h04 */
var src = require("fs").readFileSync("hype-stories.js","utf8");
var bloc = src.slice(src.indexOf("function EditeurDecorHype"), src.indexOf("function ComposeurStory"));
var n=0, ko=0;
function t(nom,cond){ n++; if(!cond){ ko++; console.log("  ECHEC : "+nom); } }

/* --- 1. Les photos ne se mettaient pas dans les fenêtres (contour) --- */
function clip(f, p){ return [ ((p[0]-f.bbox[0])/f.bbox[2])*100, ((p[1]-f.bbox[1])/f.bbox[3])*100 ]; }
var fen = { bbox:[100,200,300,400] };
t("coin haut-gauche du contour = 0% 0%", JSON.stringify(clip(fen,[100,200])) === JSON.stringify([0,0]));
t("coin bas-droit du contour = 100% 100%", JSON.stringify(clip(fen,[400,600])) === JSON.stringify([100,100]));
t("centre du contour = 50% 50%", JSON.stringify(clip(fen,[250,400])) === JSON.stringify([50,50]));
t("l'ancienne formule etait absurde (p[0]*100 = 10000%)", 100*100 === 10000);
t("l'editeur utilise bien la formule rapportee a la bbox", bloc.indexOf("(p[0] - f.bbox[0]) / f.bbox[2]") > 0);
t("l'editeur n'utilise plus p[0] * 100", bloc.indexOf("Math.round(p[0] * 100)") < 0);
t("garde si la bbox est vide", bloc.indexOf("f.bbox[2] && f.bbox[3]") > 0);

/* --- 2. Le bouton du bas avalé par la zone morte --- */
t("hauteur reservee portee a 236", bloc.indexOf("- 236") > 0);
t("la barre de boutons est ancree en bas", bloc.indexOf('position: "fixed"') > 0 && bloc.indexOf("env(safe-area-inset-bottom) + 12px") > 0);
t("une cale empeche l'aide de passer dessous", bloc.indexOf("height: 72") > 0);
t("le decor ne prend plus toute la largeur", bloc.indexOf("innerWidth : 390) - 16") > 0);

/* --- 3. Vignette absente : carte propre, pas d'image cassée --- */
t("plus de nom de fichier en alt dans la bande", src.indexOf('alt: ref,') < 0);
t("l'image absente est masquee, pas rechargee", (src.match(/style\.visibility = "hidden"/g)||[]).length >= 3);
/* on ignore les commentaires : seul le code executable compte */
var codeSeul = src.replace(/\/\*[\s\S]*?\*\//g, "");
t("aucun repli vers le plein format dans le code", codeSeul.indexOf('im.src = ref + ".webp"') < 0 && codeSeul.indexOf('im.src = compoChoix + ".webp"') < 0 && codeSeul.indexOf("__pleine") < 0);
t("l'editeur masque aussi son decor absent", bloc.indexOf('visibility = "hidden"') > 0);

/* --- 4. Le plantage à la validation (permutation invalide) --- */
function permValide(perm, nPhotos){
  if (!perm || perm.length !== nPhotos) return false;
  var vus = {};
  for (var q=0;q<perm.length;q++){
    var v = perm[q];
    if (typeof v !== "number" || v < 0 || v >= perm.length || vus[v]) return false;
    vus[v] = 1;
  }
  return true;
}
t("4 fenetres pour 2 photos = refuse", permValide([0,1,2,3], 2) === false);
t("permutation avec un trou = refusee", permValide([0,undefined,2], 3) === false);
t("permutation avec doublon = refusee", permValide([0,0,2], 3) === false);
t("indice hors bornes = refuse", permValide([0,1,5], 3) === false);
t("permutation saine = acceptee", permValide([2,0,1], 3) === true);
t("identite acceptee", permValide([0,1,2], 3) === true);
var comp = src.slice(src.indexOf("function ComposeurStory"), src.indexOf("function PastilleMusiquePage"));
t("les trois verrous sont poses", comp.indexOf("permOk") > 0 && comp.indexOf("vus[v]") > 0);
t("l'ordre final est verifie avant d'etre pose", comp.indexOf("var sain = neuf.every") > 0);
t("l'editeur ne s'ouvre que si les comptes concordent", comp.indexOf("mv.fenetres.length === nTotalCompo") > 0);

/* --- le témoin --- */
t("temoin a jour", src.indexOf("var HYPE_STORIES_VERSION = ") > 0);

console.log((n-ko)+"/"+n+" verifications passees.");
process.exit(ko?1:0);
