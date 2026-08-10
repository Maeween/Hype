// ============================================================
//  HYPE — Purge automatique des comptes supprimés
//  Fichier à placer dans :  netlify/functions/purge-planifiee.js
//
//  ORDRE DE BLANDINE (10/08/2026) : « on continue et planification pour
//  la purge ».
//
//  CE QUI MANQUAIT, ET POURQUOI C'ÉTAIT GRAVE
//  `supprimer-compte.js` savait déjà tout faire : désactiver un compte à
//  J+60, puis le purger définitivement. Mais la purge n'était appelée
//  PAR PERSONNE : aucune planification n'existait dans netlify.toml
//  (vérifié le 10/08 — le fichier ne contenait que des règles de cache),
//  et les seules fonctions déployées étaient assistant, stripe-webhook et
//  supprimer-compte. Autrement dit : les comptes étaient bien marqués
//  « supprimé, prévu le … » et ne l'étaient JAMAIS pour de bon. C'est
//  exactement le genre de promesse non tenue qu'un examinateur App Store
//  peut refuser.
//
//  CE FICHIER EST LA MOITIÉ MANQUANTE. Il tourne chaque nuit et appelle
//  `purgerEchus`, le MÊME code que l'appel manuel — donc jamais deux
//  listes de tables qui divergent.
//
//  ⚠️ LA PLANIFICATION NE SE DÉCLARE PAS ICI mais dans `netlify.toml`,
//  section [functions."purge-planifiee"], ligne `schedule`. Sans cette
//  section, ce fichier existe mais ne se déclenche jamais.
//
//  ⚠️ AUCUNE CLÉ N'EST NÉCESSAIRE. `HYPE_CLE_PURGE` protège l'appel
//  manuel exposé sur Internet ; une fonction planifiée est déclenchée par
//  Netlify lui-même. Elle a seulement besoin de SUPABASE_URL et de la clé
//  service_role, déjà présentes.
//
//  À VÉRIFIER APRÈS LE PREMIER DÉPLOIEMENT (je n'ai pas d'accès réseau,
//  je n'ai pas pu l'essayer) : dans Netlify → Functions, `purge-planifiee`
//  doit apparaître et porter la mention d'une planification. Ses journaux
//  affichent une ligne par exécution, avec le nombre de comptes purgés.
// ============================================================

//  ⛔ AUCUNE DÉPENDANCE NPM ICI NON PLUS. Le 10/08, `supprimer-compte.js`
//  plantait au chargement sur `Cannot find module '@supabase/supabase-js'`
//  — il n'y a pas de `package.json` dans le dépôt. Comme cette fonction le
//  require, elle plantait avec lui. Les deux sont maintenant écrites avec de
//  simples appels réseau. Ne jamais réintroduire un paquet externe.
const { purgerEchus, config } = require("./supprimer-compte");

exports.handler = async () => {
  const debut = new Date().toISOString();
  const cfg = config();

  if (!cfg) {
    console.error("[purge " + debut + "] CONFIGURATION MANQUANTE : SUPABASE_URL ou la cle service_role absente dans Netlify. Aucun compte purge.");
    // On répond 200 : une erreur de configuration ne doit pas faire réessayer
    // la planification en boucle. Le journal porte la cause.
    return { statusCode: 200, body: JSON.stringify({ ok: false, raison: "configuration" }) };
  }

  try {
    const r = await purgerEchus(cfg);

    if (r.purges === 0) {
      console.log("[purge " + debut + "] aucun compte echu, rien a faire.");
    } else {
      console.log("[purge " + debut + "] " + r.purges + " compte(s) purge(s) definitivement.");
      // On ne journalise QUE les échecs, jamais les identifiants purgés
      // avec succès : inutile de garder une trace de qui a été supprimé.
      (r.details || []).forEach(function (d) {
        if (d.echecs && d.echecs.length) {
          console.error("[purge " + debut + "] echecs sur un compte : " + d.echecs.join(" | "));
        }
      });
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, purges: r.purges }) };
  } catch (e) {
    console.error("[purge " + debut + "] ERREUR : " + String(e && e.message ? e.message : e));
    return { statusCode: 200, body: JSON.stringify({ ok: false, erreur: String(e && e.message ? e.message : e) }) };
  }
};
