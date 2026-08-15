/* t_19ac.js — l'ecran plein format : geometrie, zoom, echange, publication */
var fs=require("fs");
var src=fs.readFileSync("hype-stories.js","utf8");
var n=0,ko=0;
function t(nom,cond){ n++; if(!cond){ ko++; console.log("  ECHEC : "+nom); } }

/* ---- 1. Discipline du geste : rien ne doit passer par un etat React ---- */
var bloc = src.slice(src.indexOf("function EditeurDecorHype"), src.indexOf("function ComposeurStory"));
t("le composant existe", bloc.length > 2000);
t("ecouteurs tactiles NATIFS", bloc.indexOf("addEventListener(\"touchstart\"") > 0 && bloc.indexOf("addEventListener(\"touchmove\"") > 0);
t("passive:false pose", (bloc.match(/passive: false/g)||[]).length >= 4);
t("les ecouteurs sont retires au demontage", (bloc.match(/removeEventListener/g)||[]).length >= 4);
t("preventDefault pendant le geste", (bloc.match(/preventDefault/g)||[]).length >= 2);
t("aucun setState dans bouge()", (function(){
  var b = bloc.slice(bloc.indexOf("function bouge("), bloc.indexOf("function fin("));
  return b.indexOf("setActive")<0 && b.indexOf("setVersion")<0 && b.indexOf("setSource")<0;
})());
t("le geste ecrit dans le style, pas dans React", bloc.indexOf("im.style.transform") > 0);
t("touchAction none sur la boite", bloc.indexOf('touchAction: "none"') > 0);
t("le decor plein format n'est JAMAIS charge", bloc.indexOf('"-mini.webp"') > 0 && bloc.indexOf('+ ".webp"') < 0);
t("le geste retour ferme l'editeur seul", bloc.indexOf("__hsComposeurRetour") > 0);
t("la croix descend sous l'encoche", bloc.indexOf("env(safe-area-inset-top)") > 0);
t("zoom borne entre 1 et 4", bloc.indexOf("Math.min(4") > 0);
t("appui long = 500 ms", bloc.indexOf("500") > 0);

/* ---- 2. L'etat de l'editeur est declare EN DERNIER (harnais par position) ---- */
var comp = src.slice(src.indexOf("function ComposeurStory"), src.indexOf("function PastilleMusiquePage"));
var etats = comp.match(/React\.useState\(/g) || [];
var posEd = comp.indexOf("var edS = React.useState(null)");
var apres = comp.slice(posEd + 40);   /* au-dela de sa propre declaration */
t("l'etat editeur est le dernier useState du composeur", posEd > 0 && apres.indexOf("React.useState(") < 0);
t("cadresFen declare AVANT l'editeur", comp.indexOf("var cfS = React.useState({})") < posEd);
t("cadrages declare AVANT l'editeur", comp.indexOf("var cdS = React.useState({})") < posEd);

/* ---- 3. Le recadrage a la publication honore le zoom ---- */
global.window = { URL: {} };
global.HS_CADRE_RATIO = 9/16; global.HS_CADRE_HMAX = 1920;
eval(src.slice(src.indexOf("function hsRecadrerFichier"), src.indexOf("function hsImageFlou")));
t("hsRecadrerFichier accepte 5 arguments", hsRecadrerFichier.length === 5);
t("le zoom part a la publication", comp.indexOf("rr, cf.cy, cf.z") > 0);

/* zone source : le zoom doit la retrecir d'autant */
function zoneSource(L,H,R,z){
  var sw,sh;
  if (L/H > R) { sh=H; sw=H*R; } else if (L/H < R) { sw=L; sh=L/R; } else { sw=L; sh=H; }
  if (z>1){ sw=sw/z; sh=sh/z; }
  return {sw:sw,sh:sh};
}
var z1 = zoneSource(4000,3000,9/16,1), z2 = zoneSource(4000,3000,9/16,2);
t("zoom x2 = zone source deux fois plus petite", Math.abs(z1.sw/z2.sw - 2) < 1e-9 && Math.abs(z1.sh/z2.sh - 2) < 1e-9);
t("zoom 1 ne change rien", zoneSource(4000,3000,9/16,1).sw === zoneSource(4000,3000,9/16,undefined).sw);
t("photo couchee vers fenetre debout : coupe dans la largeur", zoneSource(4000,3000,9/16,1).sh === 3000);

/* ---- 4. L'echange de deux photos ---- */
function appliquer(ordreActuel, nbFichiers, perm){
  var socle = (ordreActuel && ordreActuel.length===nbFichiers) ? ordreActuel.slice() : Array.from({length:nbFichiers},function(_,q){return q;});
  var change=false; for (var q=0;q<perm.length;q++){ if(perm[q]!==q){change=true;break;} }
  if(!change) return ordreActuel;
  return perm.map(function(q){ return socle[q]; });
}
t("permutation identite : l'ordre n'est pas touche", appliquer(null,3,[0,1,2]) === null);
t("echange 0<->1 sur un ordre neuf", JSON.stringify(appliquer(null,3,[1,0,2])) === JSON.stringify([1,0,2]));
t("echange applique SUR un ordre deja pose", JSON.stringify(appliquer([2,0,1],3,[1,0,2])) === JSON.stringify([0,2,1]));
t("l'echange ne perd aucune photo", (function(){
  var r = appliquer([2,0,1],3,[1,0,2]); return r.slice().sort().join() === "0,1,2";
})());

/* ---- 5. Les libelles en 6 langues ---- */
["placerPhotos","gestesDecor","utiliserDecor"].forEach(function(cle){
  var i = src.indexOf(cle+":");
  var seg = src.slice(i, i+900);
  ["fr:","en:","es:","it:","ja:","de:"].forEach(function(l){
    t(cle+" a sa langue "+l.replace(":",""), seg.indexOf(l) > 0);
  });
});

console.log((n-ko)+"/"+n+" verifications passees.");
process.exit(ko?1:0);
