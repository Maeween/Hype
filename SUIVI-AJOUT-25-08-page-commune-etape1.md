# HYPE ▸ VERSION 25/08/2026 · PAGE COMMUNAUTAIRE CHEVAL — ÉTAPE 1 CODÉE DANS L'INDEX

## Ce qui a été fait
Nouvel écran **`cheval-commun`** (composant `EcranChevalCommun`) intégré dans `index.html` par **3 greffes** :
1. **CIBLE_DIRECTE** : clé d'aperçu `chevalcommun` (page en mode DÉMO, zéro requête réseau) et motif `chevalcommun-<id>` (ouvre la page commune d'un vrai cheval par son id).
2. **Définition du composant** (après le bloc CIBLE_DIRECTE) : CSS injecté une seule fois (id `hycc-css`, préfixe `.hycc-` — aucun style existant touché) + la fonction `EcranChevalCommun`.
3. **Branche de rendu** ajoutée juste après `ecran === "cheval"` : `ecran === "cheval-commun"`.

## Contenu de la page (V1, cahier validé)
- **Hero** : photo du cheval **sans aucun voile** (les textes vivent SOUS la photo), sourcil « HYPE ✦ PAGE COMMUNE », couronne or, nom Cinzel, ligne race · discipline · âge, pedigree Cormorant italique « par Père · et Mère » (depuis `origines`).
- **Pilule EN CONCOURS** : sorties / victoires / podiums calculées depuis les données réelles (fusion table `resultats` par `cheval_id` + JSON `chevaux.palmares`, lecture tolérante des champs). **« Classés » volontairement omis** (le Quart FFE ne se recalcule jamais). Pilule masquée s'il n'y a aucun résultat.
- **Ses histoires** : constellation — cristal central (photo du cheval, clip-path) relié par fils turquoise à 4 avatars max (propriétaire + `chevaux_liens`), `@pseudo` sinon prénom, chip `+N cavalières` au-delà. Tap avatar → profil de la cavalière.
- **Le mur des souvenirs** : photos des **albums `albums_cheval` PUBLICS uniquement** (`visibilite === "public"`), cadres papier/polaroid + scotch (exception charte autorisée sur ce mur seulement), rotations/décalages précalculés, annotation = nom d'album. 10 photos max.
- **Ses vidéos** : rail horizontal (`data-hscroll="1"` pour ne pas se battre avec le swipe de navigation) alimenté par les URLs vidéo des albums publics. **Masqué si vide.**
- **En concours** : les 4 meilleurs classements, pastille dorée si top 3, pastille neutre sinon.
- **Son indice** : bijou or avec le premier indice de `origines.indices` (IPO…). **Masqué si absent.**
- **Partager un moment** : visible **uniquement pour les cavalières liées** (session locale + liste des liées) ; les deux boutons verre fumé renvoient vers la fiche du cheval où le flux d'ajout existe déjà. Aucun bouton rempli.
- États vides §15 partout (constellation / mur / concours) en encarts doux.
- `scrollTop = 0` à chaque ouverture (règle), `overflow-x: clip` (jamais `hidden` seul), turquoise fixe pour tous (exception validée), fond #060709.

## Chargement
Toutes les requêtes se font **à l'ouverture de la page seulement** — zéro poids au boot de l'app (priorité 1 de la passation respectée). Requêtes : `chevaux` (1), `chevaux_liens` (1), `profiles` (1), `albums_cheval` (1), `resultats` (1), session locale.

## Aperçus
- `…/index.html#chevalcommun` → la page en **mode démo** (cheval « Orphée (démo) », données fictives, aucune requête).
- `…/index.html#chevalcommun-<id>` → la page commune d'un **vrai cheval**.
- Copie `DEV_OUVRIR_PAGE-chevalcommun.html` fournie (s'ouvre directement sur la démo).

## Vérifications faites
- `node --check` du composant isolé : OK.
- Les **16 scripts inline** de l'index modifié revérifiés : 0 erreur de syntaxe.
- **Playwright complet** (Chromium, hors-ligne avec bouchon supabase-js) : `#chevalcommun` s'affiche, 0 erreur de page, 0 écran « Un caillou dans le sabot ». Captures 390 px et 820 px jointes. NB : dans le bac à sable les fichiers `hype-images-*.js` n'existent pas → polaroids/hero vides sur les captures ; en ligne, les vraies photos s'affichent.

## Ce qui n'est PAS branché (étapes suivantes, à ta validation)
- **Étape 2** : cristal + chiffre sur les vignettes de la grille « chevaux du club » (EcranGuilde) → point d'entrée réel vers la page commune.
- **Étape 3** : pont « Toutes ses histoires → » sur la fiche privée.
- **V2** : rapprochement des doublons non liés (§14) + garanties non-régressives fiche (§13).
Aujourd'hui la page n'est accessible que par les aperçus : **aucun changement visible pour les cavalières.**

## Réserve signalée
- Les **politiques RLS** de `albums_cheval` / `chevaux_liens` / `profiles` doivent permettre la lecture inter-comptes pour que la page commune d'un cheval d'une AUTRE cavalière se remplisse. À vérifier sur un vrai id après mise en ligne ; si une section reste vide à tort, c'est la première piste.

## À pousser
- **`index.html` uniquement.** Aucun module externe modifié, aucun `?v=` à incrémenter, aucun SQL.
- Marqueur vérifié : le fichier livré est bien **Hype** (jamais Linguae à la racine).

---

# HYPE ▸ VERSION 25/08/2026 (2e livraison de la session) · 🟥 LA SORTIE DE LA BARRE DU BAS MARCHE ENFIN

## Le constat (au banc, preuve à l'appui)
Le correctif de la **session 160** (barre du bas sortie du Router par `ReactDOM.createPortal` vers le `body`) était **inopérant en production** : au rendu réel, la barre restait rendue DANS `#root` (chaîne mesurée : `DIV < DIV < DIV < DIV < DIV#root < BODY`). Cause : le pont global fabrique `window.ReactDOM` à partir du module `react-dom-client`, qui n'exporte que `createRoot`/`hydrateRoot`/`version`. **`createPortal` n'y est pas** — il vit dans le module de base `react-dom` (pourtant bundlé et enregistré via `__def("react-dom")`). La condition de la session 160 échouait donc silencieusement et prenait son repli « rendu sur place, comme avant ». Le bug intermittent de la barre plantée au milieu pouvait toujours se produire.

## Le correctif (1 ligne, dans le pont ReactDOM)
Dans le petit script d'amorçage (`window.ReactDOM = { createRoot, hydrateRoot, version }`), ajout guardé :
`ReactDOM.createPortal = __require("react-dom").createPortal` (try/catch : si le module manquait, rien ne casse, on retombe sur l'ancien comportement).

## Preuve au banc (Playwright, 3 écrans : page commune, mon club, accueil)
- `ReactDOM.createPortal` : **présent** (était absent avant le correctif).
- La barre du bas est **enfant directe de `<body>`** sur les 3 écrans (était dans `#root` avant).
- Position : 765→844 sur un écran de 844 (collée au bord bas). 0 erreur de page, 0 écran caillou.

## Honnêteté sur le bug d'origine
Le défaut « barre plantée au milieu » est **intermittent** : le banc prouve que la sortie du Router est enfin **active**, pas encore que le symptôme a disparu — ça, seule ton utilisation sur plusieurs jours le dira. Mais l'hypothèse de la session 160 (aucun ancêtre rogné ne peut plus la retenir) est maintenant réellement en place.

## À pousser
- **`index.html` uniquement** (contient page commune étape 1 + ce correctif). Rien d'autre.
