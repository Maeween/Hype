/* audit_vars.js — 14/08/2026, apres les plantages du `h` (19e) et du `M` (19i).
   Verifie que CHAQUE fonction du module declare les variables de rendu qu'elle
   utilise. Les commentaires et les chaines sont retires avant analyse, sinon un
   « M » dans une phrase francaise passe pour un identifiant.
   Declarations acceptees : `var X =` et les cascades `var A = 1, X = 2;`. */
var fs = require("fs");
var VARS = ["h", "M", "C", "tn", "tnL", "tA", "th", "lg"];

function nettoyer(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, "``");
}

function auditer(chemin) {
  var lignes = fs.readFileSync(chemin, "utf8").split("\n");
  var deb = [];
  lignes.forEach(function (l, i) { if (/^(async )?function [A-Za-z0-9_]+\(/.test(l)) deb.push(i); });
  deb.push(lignes.length);
  var manques = [];
  for (var k = 0; k < deb.length - 1; k++) {
    var brut = lignes.slice(deb[k], deb[k + 1]).join("\n");
    var nom = (brut.match(/function ([A-Za-z0-9_]+)/) || [])[1];
    var corps = nettoyer(brut);
    VARS.forEach(function (v) {
      var utilise = new RegExp("(^|[^A-Za-z0-9_$.])" + v + "(?![A-Za-z0-9_$:])").test(corps);
      var declare = new RegExp("(var|,)\\s*" + v + "\\s*=").test(corps)
        || new RegExp("function\\s+" + v + "\\s*\\(").test(corps);   /* tA est une fonction locale */
      var parametre = new RegExp("function [A-Za-z0-9_]+\\([^)]*\\b" + v + "\\b").test(corps);
      if (utilise && !declare && !parametre) manques.push(v + " dans " + nom);
    });
  }
  return manques;
}

if (require.main === module) {
  var m = auditer(process.argv[2] || "hype-stories.js");
  if (m.length) { console.log("\u2717 " + m.length + " variable(s) non declaree(s) :\n  - " + m.join("\n  - ")); process.exit(1); }
  console.log("\u2713 audit variables : h, M, C, tn, tnL, tA, th, lg declares partout ou ils servent");
}
module.exports = auditer;
