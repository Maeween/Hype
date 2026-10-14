// Fabrique supabase/functions/hey-baby-vision/prompts.js À PARTIR de netlify/functions/assistant.js,
// pour que les deux routes de Hey Baby utilisent EXACTEMENT les mêmes consignes (une seule source).
// À relancer après toute modification des consignes dans assistant.js :  node outils/generer-prompts-supabase.cjs
const fs = require("fs"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "../netlify/functions/assistant.js"), "utf8");
function bloc(debut, fin) {
  const a = src.indexOf(debut); if (a < 0) throw new Error("introuvable : " + debut);
  const b = src.indexOf(fin, a); if (b < 0) throw new Error("fin introuvable : " + fin);
  return src.slice(a, b);
}
const parties = [
  bloc("const HEYBABY_PROMPT_PERCEPTION =", "\nconst CONSIGNES_OUTILS"),
  bloc("function getSystemPrompt(", "\n// ═══ CONSIGNE DE LA MÉMOIRE"),
  bloc("function contexteSur(", "\nexport default async"),
];
const sortie = "// supabase/functions/hey-baby-vision/prompts.js — FICHIER FABRIQUÉ, NE PAS MODIFIER À LA MAIN.\n"
  + "// Source unique : netlify/functions/assistant.js (outils/generer-prompts-supabase.cjs).\n"
  + "// Mêmes consignes que la route principale de Hey Baby.\n\n"
  + "export var HB_CORRECTIONS = [];\nexport function reglerCorrections(liste) { HB_CORRECTIONS = Array.isArray(liste) ? liste : []; }\n\n"
  + parties.join("\n")
  + "\nexport { HEYBABY_PROMPT_PERCEPTION, HEYBABY_CONSIGNES_PEDAGOGIE, getSystemPrompt, contexteSur };\n";
fs.writeFileSync(path.join(__dirname, "../supabase/functions/hey-baby-vision/prompts.js"), sortie);
console.log("prompts.js fabriqué :", sortie.length, "caractères");
