/* 21/10/2026 — Fabrique hype-cours-sommaire.js : la LISTE des chapitres de chaque Galop (identifiant, icône, titre
   dans toutes les langues), sans leur contenu. L'appli s'en sert pour la bibliothèque des Galops, les statistiques et le
   profil, et ne télécharge un Galop que quand on l'ouvre (voir hypeChargerGalop dans index.html).
   Lancé à CHAQUE publication Netlify (netlify.toml) à partir des 8 fichiers de cours : la liste ne peut donc jamais être
   en retard sur les cours. Jamais bloquant : en cas d'erreur, le fichier du dépôt reste tel quel (et l'appli sait se
   passer du sommaire : elle charge alors le Galop, comme avant). Pour le refaire à la main : node outils/sommaire-cours.cjs */
const fs = require("fs"), path = require("path"), vm = require("vm");
const RACINE = path.join(__dirname, "..");
const log = (...a) => console.log("[sommaire-cours]", ...a);
try {
  const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
  ctx.HYPE_IMGS = ctx.window.HYPE_IMGS = new Proxy({}, { get: () => undefined });
  vm.createContext(ctx);
  const fichiers = ["hype-cours-baby.js", "hype-cours-galop1.js", "hype-cours-galop2.js", "hype-cours-galop3.js", "hype-cours-galop4.js", "hype-cours-galop5.js", "hype-cours-galop6.js", "hype-cours-galop7.js"];
  for (const f of fichiers) vm.runInContext(fs.readFileSync(path.join(RACINE, f), "utf8"), ctx, { filename: f, timeout: 20000 });
  const w = ctx.window;
  const tables = { baby: w.COURS_BABY_I18N, 1: w.COURS_GALOP1_I18N, 2: w.COURS_GALOP2_FR, 3: w.COURS_GALOP3_FR, 4: w.COURS_GALOP4_FR, 5: w.COURS_GALOP5_FR, 6: w.COURS_GALOP6_FR, 7: w.COURS_GALOP7_FR };
  const som = {};
  let n = 0;
  for (const k of Object.keys(tables)) {
    if (!Array.isArray(tables[k])) throw new Error("table absente : " + k);
    som[k] = tables[k].map(c => ({ id: c.id, icone: c.icone, titre: c.titre }));
    n += som[k].length;
  }
  if (n < 50) throw new Error("trop peu de chapitres (" + n + ")");
  const sortie = "/* FABRIQUÉ par outils/sommaire-cours.cjs — ne pas modifier à la main. Liste des chapitres de chaque Galop. */\n" +
    "window.HYPE_COURS_SOMMAIRE = " + JSON.stringify(som) + ";\n";
  fs.writeFileSync(path.join(RACINE, "hype-cours-sommaire.js"), sortie);
  log("OK", n, "chapitres,", Math.round(sortie.length / 1024), "Ko");
} catch (e) {
  log("NON FAIT, le fichier du dépôt reste tel quel :", String(e).slice(0, 200));
}
