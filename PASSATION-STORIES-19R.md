# PASSATION — STORIES 19r · CATALOGUE 28 DÉCORS
Écrite le 14/08/2026 en fin de session (sessions 135 → 140f d'un trait).

## ÉTAT LIVRÉ (à pousser ou déjà poussé — vérifier le témoin)
Témoin attendu en bas de page : `reprise 1.8 · baby 112 · memo 4 · stories 19r`

Fichiers, **dans cet ordre** :
1. `index.html` — porte `hype-stories.js?v=19r` **et** `hype-modeles-db.js?v=5`
2. `hype-stories.js` — `VERSION "19r"`
3. `hype-modeles-db.js` — 28 modèles
4. `modele-24.webp`, `modele-25.webp`, `modele-26.webp`, `modele-27.webp`, `modele-28.webp` — **à la racine**

md5 de la dernière livraison : index `56db2669554b6926bf0a0d3f4d0e1d97` · stories `3d434175fbe001c945a94616615131b6` · db `4a75f4787959ec30deb9fcd7d0b13d06`

Outils livrés à côté : `decoupe.py` (découpe d'un décor), `planche.py` (découpe d'une planche — **inutilisable en pratique**, voir plus bas), `audit_vars.js` (audit des variables de rendu).

## CE QUI A ÉTÉ RÉPARÉ CETTE NUIT (ne pas défaire)
- **19b** — plantage à l'ajout de photos : les miniatures décodaient les fichiers d'iPhone en pleine résolution. Vignettes fabriquées au canvas, une par une (`hsVignetteFichier`), aperçu à la taille d'écran, visionneuse mise en veille pendant le composeur, composition démontée pendant le plein écran.
- **19c** — `premium` n'était **jamais** transmis à `ComposeurStory` (la bande des modèles ne pouvait s'afficher pour personne) · le repli de `hsPublierStory` jetait la composition **en silence** (5 stories séparées) : il refuse désormais franchement (`compoRefusee`) · aperçu du H+D · fond immersif réparé (la photo nette a sa propre couche) et cadrage à l'envoi.
- **19d** — le décor devient sa propre question, dès **une** photo (`hsAvecDecor`).
- **19e** — `h` n'était pas déclaré dans `CompositionStory` : **le composant n'avait jamais fonctionné** depuis la 134.
- **19i** — `M` manquait au même endroit (plantait seulement si la story portait une légende). `audit_vars.js` couvre maintenant h, M, C, tn, tnL, tA, th, lg.
- **19j → 19o** — vignettes de décors sur fond clair, plus aucun grisé, 84 × 132, `data-hscroll` (la bande ne défilait pas), le + en fin de rail, croix de retrait sur chaque photo.
- **19p → 19r** — bouton « + Ajouter des photos » dans le composeur · **croix de sortie** dans l'en-tête (on restait coincée : `boxSizing` manquant + réserve du bas trop courte) · **aperçu dans les vraies fenêtres du décor** avec cadrage au doigt par fenêtre, et découpe au format exact de la fenêtre à l'envoi.

## GARDE-FOUS DU HARNAIS (243 assertions, `t_19r.js`)
- `audit_vars.js` : aucune fonction n'utilise une variable de rendu sans la déclarer.
- Aucune bande `overflowX: auto` sans `data-hscroll`.
- 6 langues obligatoires sur chaque nouveau libellé, et **aucune clé de texte en double**.
- Toute feuille défilante en `boxSizing: border-box`.
- Aucune suppression ajoutée, un seul `.delete()` dans le fichier.
- **Le harnais du projet (`smoke.js`, `t_mention.js`) n'a jamais été fourni** dans cette conversation : les ~320 assertions historiques n'ont pas été rejouées depuis la 134. À faire dès que possible.

## EN ATTENTE DE BLANDINE
1. **Bannière du club** : la nouvelle alerte affiche le **code Postgres exact**. Attendre qu'elle le remonte. Hypothèse n°1 : contrainte `UNIQUE` manquante sur `tableaux_clubs.cle` (42P10) → SQL d'une ligne. Hypothèse n°2 : règle RLS.
2. **Décor de sa capture de 06h15** (lune, mer, deux cadres inclinés) : les photos débordent des cadres — la géométrie enregistrée ne correspond pas à l'image en ligne. Il faut identifier lequel c'est et récupérer son `.webp` pour relancer `decoupe.py`.
3. **Fond par défaut d'une photo large** : toujours « Noir », donc il faut choisir « Immersif » à chaque fois. Faut-il inverser ?
4. **Décor grisé non sélectionnable** (déduction de Claude, à valider) : il informe (« Ce décor demande 3 photos ») au lieu de se laisser choisir.
5. **Le cadrage vertical de la bannière de club** (forcée en 16/10) et le **fond studio** en général : « tout le studio photo est déconnant depuis le début » — chantier non ouvert, à cadrer avec elle.

## LES DÉCORS — MODE D'EMPLOI
Blandine envoie les images, la chaîne fait le reste : `python3 decoupe.py modele-XX.webp` → JSON (contour, coins, bbox, aire_pct) → entrée dans `hype-modeles-db.js` → monter `?v=` dans `index.html`.
- **Toujours faire un rendu de contrôle** avec de fausses photos avant d'intégrer : c'est ce qui a rattrapé `modele-28` (le blanc des arches était un **voile semi-transparent**, pas un trou franc — la première détection mordait trop court).
- Règle de détection : *fenêtre = trou franc (alpha nul) **ou** voile clair*, puis fermeture morphologique et bouchage des trous.
- **Les planches sont inutilisables** : leurs panneaux font 230 × 573 ou 298 × 478 px contre 941 × 1672 pour un décor réel. Mesuré, pas supposé.
- Numérotation à poursuivre : `modele-29`, `30`, …
- Le catalogue manque de décors à **4** et **5** fenêtres (un seul de chaque).

## RÈGLES DE CONDUITE (inchangées)
Feu vert explicite avant tout code · `index.html` livré EN PREMIER, `?v=` monté à chaque livraison · signaler tout incident immédiatement · « décision de Blandine » = ses mots exacts, sinon « déduction de Claude — à valider » · section « À l'écran : + / − » à chaque livraison · scrollTop=0 sur tout nouvel écran · interdits CSS Android · seul le Safari de Blandine juge le domaine · terminer sur le travail · SUIVI : section par session + Préparation Flutter.

## ORDRE CONSEILLÉ DE LA PROCHAINE SESSION
1. Vérifier le témoin (`stories 19o`) avant toute autre chose — plusieurs faux diagnostics cette nuit venaient d'une version pas encore en ligne.
2. Récupérer le code d'erreur de la bannière de club → correctif ciblé.
3. Découper les décors que Blandine envoie (rendu de contrôle systématique).
4. Reprendre le décor dont les photos débordent.
5. Poser les décisions 3 et 4 ci-dessus.
