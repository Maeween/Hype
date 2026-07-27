# SUIVI HYPE

> Ce fichier circule entre les pages de travail. Chaque page qui arrive le lit, chaque page qui repart le met à jour avant de le refaire circuler. Objectif : que Blandine n'ait rien à retenir par cœur.

**Règle d'or : une seule page "codeuse" à la fois.** Les autres pages peuvent réfléchir, lister, préparer des maquettes — mais ne livrent pas de fichier index.html tant que ce n'est pas leur tour, pour éviter d'écraser le travail d'une autre page.

**Version actuelle de l'index.html : session du 27/07/2026 (9) — Tracé animé : coach de dressage, bibliothèque centralisée, + 2 correctifs de lecture**

⚠️ Base de la (9) = fichier renvoyé par Blandine après passage d'une autre page (qui a ajouté `SectionCommentaires` sur les posts de résultat, fait lire `p.data.club` avant `p.data.ecurie`, et **retiré les 2 encarts d'accès à Hey Baby**). Mon `EcranTraceAnime` était intact au bit près dans ce fichier.

⚠️ **Livré sous le nom `index_v44.html`** (+ `preview_trace_v44.html` qui ouvre directement sur l'écran) : à renommer `index.html` au moment du push. Base = fichier reçu de Blandine le 27/07 à 17h11 (838 fonctions + 313 const), vérifié avant toute modification : `allerVersGalop` intact (3×), `MEVO_CSS`, badges de niveau, Chasse aux erreurs, Fin Chemin Baby intacts, et **moteur du tracé strictement identique** à ma copie (`LETTER_POINTS` → `arreterNappeAmbiante`, 18 959 octets au bit près ; `REPRISES_FFE` inchangé, 45 417 octets, 10/20/20/20/22/22 figures). Fusion **chirurgicale** : seul `EcranTraceAnime` a été remplacé, plus une balise `<script>` et 3 clés de raccourci.

🔴 **NOUVEAU FICHIER À POUSSER AVEC L'INDEX : `hype-dressage-conseils.js`** (129 Ko, **version 1.4** — lot 1 de traductions inclus ; 111 Ko en — 75 fiches, 450 conseils, les 114 figures des 6 reprises rattachées sans aucune approximation).

**Consigne permanente de Blandine (27/07)** : dès qu'une figure d'une reprise Club, Amateur ou Pro n'existe pas dans la bibliothèque, créer sa fiche directement en conservant la même architecture. Objectif : couvrir à terme 100 % des figures des reprises françaises. Ne jamais rattacher « à peu près ».

**Fiches ajoutées en v1.3 (8)** : `circle_12m` (texte de Blandine), puis 7 rédigées par Claude et à relire — `curved_line_x` (ligne courbe par X, G6), `half_circle_20m` (G5/G7/Club Elite), `half_circle_10m` (Club Elite), `release_contact` (rênes longues / rupture de contact), `change_diagonal` (G3), `stirrups_out_in` (déchausser-rechausser, G3), `lengthen_few_strides` (quelques foulées de développement, G6). Chaque fiche porte un champ **`source`** pour distinguer les textes de Blandine de ceux de Claude. Sans lui, l'écran fonctionne toujours (tracé, cheval, lettres, immersion) mais aucune carte de conseil n'apparaît — le code teste `window.HYPE_DRESSAGE` avant de s'en servir, il n'y a donc aucun risque de plantage. La balise est déjà ajoutée dans l'index, juste après `hype-images-121.js`.

**Ce que contient la bibliothèque** (source : document « Bibliothèque Hype Dressage — Conseils du coach v1 » de Blandine, textes repris **mot pour mot**) :
- 67 fiches, 402 conseils, 201 observables « œil du juge » (ceux-là écrits par Claude, 3 par fiche).
- Ajouté par Claude sur validation de Blandine : `obs`, `phase`, `type` faire/eviter, `prio` 1-3, `galopMin` numérique, `difficulty`, `timing` (déclenchement), `relatedFigures`, et les champs réservés `video`/`illustration`/`courseId` (à `null`).
- `figuresIds` : rattachement figure → identifiants, **fait pour les 6 reprises, 114 figures, aucun trou** (v1.2 du 27/07). Le message « L'œil du juge et les conseils arrivent bientôt sur cette reprise » (6 langues) reste dans le code : il ne s'affichera que si une future reprise est ajoutée sans être rattachée.
- ⚠️ **Bug corrigé dans la bibliothèque** : les fiches dont le niveau est écrit « Amateur » seul (pirouettes, changements de pied au temps, rassembler…) tombaient à `galopMin: 1` faute de « Galop N » dans la ligne source — un Galop 2 aurait reçu des conseils de pirouette. Elles sont désormais à `galopMin: 8`. « Tous niveaux » reste bien à 1.
- ⚠️ `prio` est déduite de l'**ordre** des conseils dans le document de Blandine (les 2 premiers = prio 1, etc.), et `relatedFigures` est **proposé automatiquement** (même famille, niveau le plus proche). Les deux sont des amorces à relire, pas des vérités pédagogiques.

**Changements dans `EcranTraceAnime`** :
1. **Cartes hors du rectangle** : plus aucun encart par-dessus la carrière. Une **seule** carte (👁️ œil du juge + 💡 conseil du coach réunis), sous le plan, dans une réserve de hauteur fixe de 104 px pour que son apparition ne décale jamais la page. Verre fumé, contour turquoise, ombre douce, fondu + montée de 8 px en 260 ms, `pointer-events:none`.
2. **Déclenchement temporel réel** : aucune carte avant le lancement ; la carte sort selon le `timing` de la fiche (`anticipe` = annoncée avant que la figure commence, pour les arrêts/départs au galop/saluts ; sinon `debut`/`milieu`/`fin`), reste 4,8 à 5,2 s puis se replie seule ; à la figure suivante la nouvelle remplace l'ancienne.
3. **Le cheval remplace le point** : silhouette vue du dessus, orientée par la direction réelle de marche, avec lissage à 25 % par frame (elle ne pivote jamais d'un coup).
4. **Lettres vivantes** : la lettre s'allume en turquoise (+ halo, taille 8,5 → 11) au passage du cheval et retombe en 1,1 s.
5. **Barre de progression par familles** au-dessus du rectangle (ex. G3 : Entrée → Cercle → Transition → Cercle → Transition → Cercle → Arrêt), famille en cours mise en évidence. Libellés des 11 familles en 6 langues (`TRACE_PHASES_TR`).
6. **Nom court de la figure en cours** (« Figure actuelle / Entrée sur la ligne du milieu »), tiré du champ `label` de la fiche.
7. **Tracé vivant** : tout le parcours déjà fait reste allumé en turquoise à 42 % avec un halo léger jusqu'à la fin de la reprise ; la fenêtre récente (340) garde la couleur de l'allure, plus vive.
8. **Mode 🏇 Immersion** : le même SVG basculé en perspective CSS (`rotateX(54deg)`, `scale(1.38)`) avec caméra qui suit le cheval et fondu de horizon en haut. Aucun canvas, aucune 3D réelle : une seule propriété `transform` par frame.
9. **Interrupteur « Afficher les conseils »**, actif par défaut, 6 langues.
10. **Niveau du cavalier** : les conseils sont filtrés par `profil.galopActuel`. Si aucun conseil n'est accessible à son niveau, repli automatique sur un principe général de la section 13 de la bibliothèque (rectitude / incurvation / équilibre / régularité) — le cavalier n'a jamais de carte vide.

⚠️ **Bug préexistant corrigé au passage** : `pointADistance` renvoie le `figIndex` du point **suivant**. Sur une figure qui ne pose qu'un seul point (G4 figure 1, « Avant R — entrée · arrêt · salut »), cette figure était comptée comme terminée dès le départ : jamais affichée, jamais annoncée par la voix, jamais mise en évidence dans la progression. L'écran lit désormais le figIndex du point **déjà atteint**. Effet visible : à l'arrêt, l'écran affiche bien la figure 1 et non la 2.

✅ **Vérifications faites le 27/07** : 838 → 839 fonctions et 313 → 316 const, diff des noms = exactement `traceBornesFigures` + `TRACE_PHASES_TR` + `TRACE_ANTICIPE_UNITES` + `TRACE_SEUILS`, rien perdu. Syntaxe validée sur les **14 blocs `<script>` inline**. **Rendu réel Playwright sur l'app complète** (Supabase bouchonné, 390×844) : écran monté sans erreur JS, bibliothèque chargée (v1.1), carte qui apparaît puis se replie seule, lettres qui s'allument, immersion, interrupteur, et les 6 onglets de reprise parcourus.

⚠️ **La bibliothèque est en français seul pour l'instant.** L'interface de l'écran est bien en 6 langues, mais le contenu des fiches (labels, observables, conseils) retombe sur le français dans les autres langues via `tr()`. C'est le lot suivant.

**Correctifs de la session (9) — lecture du tracé (retours de Blandine sur l'app en ligne)** :
1. ⚠️ **Le tracé ne s'arrête plus pour laisser parler la voix.** J'avais mis une attente explicite : à chaque figure, le cheval se figeait le temps de l'annonce, ce qui hachait complètement la lecture. La voix parle désormais par-dessus un mouvement continu.
2. ⚠️ **« Passe au rouge avant la lettre » — vraie cause trouvée.** Ce n'était pas un décalage d'index (mesuré : le basculement tombait au bon endroit). Le tracé récent était dessiné comme **un seul trait d'une seule couleur** sur une fenêtre de 340 unités : au départ au galop, tout le trait déjà parcouru derrière le cheval repassait en rouge d'un coup, donc bien avant la lettre concernée — et inversement au retour au trot. Le trait est maintenant **découpé en tronçons monochromes**, la couleur d'un tronçon étant celle du point de DEPART du segment (l'allure demandée à une lettre ne colore que ce qui suit cette lettre). Vérifié en rendu réel : jusqu'à 3 couleurs coexistent sur le tracé (vert / bleu / rouge) et les basculements ne repeignent plus le passé.
3. Par cohérence, l'allure courante (couleur du cheval et de la traînée) est lue elle aussi sur le point déjà atteint, comme la figure courante.

✅ Vérifications : 839 fonctions et 316 const **identiques** avant/après (diff des noms vide), `allerVersGalop` intact, syntaxe validée sur les 14 blocs inline, rendu réel Playwright (progression continue voix activée, tronçons de couleur contrôlés à 5 positions du curseur, aucune erreur JS).

⚠️ **Pour la suite, repartir de CETTE version (9)**.

**Ancienne version (7) — Reconstruction complète de "L'École Portugaise d'Art Équestre"**

⚠️ **Cette version part d'un fichier reçu de Blandine qui avait déjà évolué depuis ma dernière livraison** (d'autres pages avaient retouché l'écran d'accueil ET certains détails de l'article Cadre Noir lui-même). Vérification exhaustive faite avant tout ajout : 830 fonctions + 313 const top-level identiques (diffs vides), `allerVersGalop` intact (3×). Rien n'a été écrasé — je suis parti de cet état reçu, pas de mon ancienne copie.

**Changements observés faits par une autre page depuis ma dernière livraison (non documentés, repérés par diff exhaustif du fichier réel — je les liste ici pour la traçabilité)** :
- Accueil (`EcranAccueil`) : carte "Communauté équestre" remise dans "Mon monde" (grande carte, style identique à "Mon Écurie") — commentaire dans le code indique qu'elle avait été retirée par erreur puis remise à la demande de Blandine. Section "Découvrir" remontée au-dessus de l'actualité, contenu réordonné (IA → Galops → Culture équestre → Santé). Carte "Culture équestre" remontée dans "Actualité" (grande carte style Lamotte). Cartes des chevaux (`hcard`) réduites (150px→112px de large).
- Article Cadre Noir : les 4 principes de philosophie sont maintenant dépliés en permanence (accordéons supprimés, tout le texte visible directement — commentaire dans le code indique une demande explicite de Blandine). Le bloc "Bonus Hype" (adresse/parking/hôtels/etc.) est passé en carrousel horizontal (`cnx-visite-rail`, `data-hscroll`) au lieu d'une grille fixe. L'album participatif a été remonté juste après "Les spectacles"/"Le savais-tu ?", avant le bloc "Visiter" (au lieu d'être en toute fin de page).

**Mes 3 ajouts de cette session (validés par Blandine avant codage)** :
1. **"Continuer l'exploration" allégée** : les 5 cartes stub redondantes (Nuno Oliveira, Baucher, La Guérinière, Lusitanien, Lipizzan — doublons avec la vraie section "Bibliothèque" plus haut) ont été retirées. Il ne reste que les 3 grandes écoles restantes (Vienne 🇦🇹 / Lisbonne 🇵🇹 / Jerez 🇪🇸), affichées en carrousel horizontal (réutilise le style `cnx-visite-rail` déjà présent dans l'article).
2. **Encart "Marquer ma visite"** (version simple validée par Blandine, sans le mode "live" qui a été mis de côté — voir Idées) : placé juste après le bloc "Visiter". Bouton "J'ai visité le Cadre Noir" → compteur permanent visible par tous ("X cavaliers Hype ont déjà visité le Cadre Noir"), passe en "✓ Visité" une fois cliqué (pas de double comptage, une ligne par cavalier en base). **Nécessite la table Supabase `visites_articles` — fichier `visites_articles.sql` livré à côté, pas encore exécuté par Blandine.**
3. **Encart "Partager cet article"** en fin de page (après "Les meilleures vidéos"/bibliothèque/sites officiels/continuer l'exploration/bonus Hype, juste avant le pied de page crédits Wikimedia) : bouton utilisant l'API Web Share native (`navigator.share`, cohérent avec les patterns déjà utilisés ailleurs dans le fichier) avec repli "Copier le lien" (`navigator.clipboard`) si l'API n'est pas dispo. Lien construit à partir de `LIEN_APP + "#cadrenoir"`.

✅ **Vérification exhaustive faite le 27/07 (session 2)** : 830 fonctions top-level et 313 const identiques au fichier reçu (mes 3 fonctions ajoutées — `texteCompteurVisites`, `marquerVisite`, `partagerArticleCN` — sont locales à `EcranCadreNoir`, pas top-level, donc n'apparaissent pas dans ce compte, comme attendu). `allerVersGalop` toujours 3×. Diff confiné à exactement 6 zones, toutes dans `EcranCadreNoir` (nouveaux hooks/fonctions, CSS `.cnx-checkin`/`.cnx-share`, remplacement de la grille par le carrousel des 3 écoles, insertion des 2 nouveaux encarts). Syntaxe JS validée sur les 14 blocs `<script>` inline (1 erreur de parenthèse manquante détectée et corrigée avant validation finale — comptage exact des parenthèses vérifié ligne par ligne).

⚠️ **Pour la suite, repartir de CETTE version.**

---

## 27/07/2026 (suite) — Titre au-dessus des dépliants + réinjection de 2 correctifs

⚠️ **Le fichier renvoyé par Blandine pour cette session datait d'avant mes 2 derniers correctifs** (repéré par diff : `galopsVus`/`marquerGalopVu` absents, espacement Mon Évolution encore à l'ancienne valeur). Les deux ont donc été **réinjectés à l'identique** avant d'ajouter le reste — rien d'autre n'a été écrasé (aucune fonction perdue, 313 const inchangés).

### Nouveau titre au-dessus de la liste des dépliants
- **« Découvre le contenu de chaque Galop »** en 6 langues, placé juste avant la liste (donc sous les cartes Crystal / Reprises / Chemin des poneys).
- Style **option C** validée sur maquette (`maquette-titre-liste-galops.html`, 4 options proposées) : réutilise la classe `.mevo-invit` (italique Cormorant argenté + reflet qui balaie) avec deux étoiles turquoise scintillantes, **mais en beaucoup plus grand : 23px** au lieu de 16,5px (demande explicite de Blandine). Le contraste de taille évite le doublon visuel avec la phrase magique du haut de page.

### Rappels des 2 correctifs réinjectés
- Ruban « Nouveau » qui disparaît une fois le Galop consulté (`hype_galops_vus` en localStorage, prop `estNouveau`).
- Espacement Mon Évolution : `.mevo-invit` marge 34px au-dessus / 2px en dessous, cheval et courbe remontés du même delta (`.mevo-hero` 556px, `.mevo-hero-img` −69px, `.mevo-traj` 306px). **Ne jamais bouger l'une de ces trois valeurs sans les deux autres.**

✅ Vérifié : 14/14 scripts, rendu Playwright réel (titre présent, mesuré à 23px vs 16,5px pour la phrase du haut, zéro erreur JS), aucune fonction perdue.

**⚠️ Pour la suite, repartir de CETTE version.**

## 🔴 À FAIRE

### Tracé animé / bibliothèque de dressage (session 8)
- [ ] **Pousser `hype-dressage-conseils.js`** en même temps que l'index (sinon : pas de cartes).
- [x] **Rattacher les 84 figures restantes** — FAIT le 27/07 (bibliothèque **v1.2**) : g5 (20), g6 (20), g7 (22), Club Elite (22). **Les 114 figures des 6 reprises sont désormais rattachées, aucun trou.** Seul le `.js` change, l'`index.html` livré plus haut n'a pas besoin d'être retouché.
- [x] **`circle_12m` créée** (texte de Blandine, mot pour mot) — bibliothèque **v1.3**.
- [x] **Rattachements approximatifs supprimés** : plus une seule figure rattachée par défaut. Nouvelle consigne de Blandine appliquée — dès qu'une figure est réellement différente, on crée sa fiche.
- [ ] **Relire les 7 fiches rédigées par Claude** (champ `source: "Claude"` sur chacune, celles de Blandine portent `source: "Blandine"` ou aucun champ) : `curved_line_x`, `half_circle_20m`, `half_circle_10m`, `release_contact`, `change_diagonal`, `stirrups_out_in`, `lengthen_few_strides`.
- [ ] **Traduire la bibliothèque** en en/es/it/de/ja — **en cours, par lots de fiches**. Fait : **lot 1 (8 fiches)** = `entry_centerline`, `halt_at_x`, `salute`, `final_halt`, `walk_working`, `walk_medium`, `walk_free`, `walk_extended` (v1.4). Reste **67 fiches sur 75**. Chaque lot est contrôlé par assertion à la génération : autant de traductions que de chaînes françaises, sinon le fichier n'est pas produit. Une fiche non traduite retombe simplement sur le français via `tr()`, donc livrer par lots ne casse rien.
- [ ] **Relire les `prio`** (déduites de l'ordre du document) et les `relatedFigures` (proposés automatiquement).
- [ ] **Graduer les conseils à l'intérieur d'une fiche** : aujourd'hui un Galop 4 et un Amateur voient la même chose sur la plupart des figures, le filtre ne sait qu'écarter les figures trop avancées.
- [ ] Remplir les champs réservés `video` / `illustration` / `courseId` quand les contenus existeront.

- [ ] **Images Wikimedia des 4 articles — rapatriement en local validé** (Blandine, 27/07, décision valable pour toute la série "grandes écoles") : Cadre Noir (16 photos), École Portugaise (9 photos), École Espagnole de Vienne (8 photos), École Royale Andalouse (6 photos) sont toutes chargées depuis `commons.wikimedia.org` en externe — à télécharger/encoder en `hype-images-NNN.js`, puis remplacer les URLs `WIKI(...)` de chaque composant par les clés `HYPE_IMGS` correspondantes. Toutes vérifiées existantes et sous licence Creative Commons.
- [x] **Roadmap "Les grandes écoles" — TERMINÉE** : les 4 écoles (Cadre Noir gratuit + École Portugaise/Vienne/Jerez Premium) sont livrées. Plus aucun stub "Bientôt sur Hype" dans l'app.
- [ ] **Album participatif — décisions tranchées, à coder** : Blandine a validé le 27/07 : **sans modération** + **limite de 5 photos/vidéos par personne**. SQL + upload à coder — un album par école (Cadre Noir, École Portugaise, École Espagnole de Vienne, École Royale Andalouse), mêmes règles partout.
- [ ] **Cartes "Voix contemporaines"** (Carde/Henriquet/Karl) dans l'article Cadre Noir : affichées en "Bientôt : son article →", pas encore de fiche/article dédié à brancher derrière.
- [ ] **Si le blocage scroll Android revient** : redemander d'abord un redémarrage complet de l'appli (fermeture depuis le multitâche, pas juste retour en arrière) avant toute autre investigation — c'est ce qui a résolu le cas de Gabrielle.
- [ ] **Coller le bloc SQL des 4 annonces en 6 langues** — après déploiement (rappel des sessions précédentes).
- [ ] **Localiser et appliquer l'image d'accueil Baby et l'image du puzzle**.
- [ ] **~49 images encore en réserve** — décider de leur usage.
- [ ] **Fiche Elea** à créer dans la Bible visuelle.
- [ ] **GRAND QUIZZ transversal** (Bronze+Argent+Or) : pas commencé.
- [ ] **Animation de fin de Poney** : en attente du choix de Blandine.
- [ ] **Bouton "Vidéos"** : toujours retiré, à replacer.
- [ ] **QCM général** : toast "prochainement" uniquement.
- [ ] **Album écurie non-cliquable** : à réactiver une fois prêt.
- [ ] Analyse vidéo Premium (Hey Baby), offre abonnement AI Stripe, post fantôme Supabase, pastilles Hey Baby, carte partage Instagram, traduction G2, fiche mémo GitHub/Supabase.

## 🟢 FAIT RÉCEMMENT

- [x] **Reconstruction complète de "L'École Portugaise d'Art Équestre"** — Blandine a jugé le premier jet (livré plus tôt dans la journée) mauvais ("tout" à revoir, sans détail précis) en le comparant à l'École Royale Andalouse ("bien"). Plutôt que de rafistoler, **remplacement intégral de la fonction `EcranEcolePortugaise`** en la reconstruisant sur le squelette exact de `EcranEcoleJerez` (dernier article livré, validé par Blandine) : même discipline de code, mêmes helpers, même CSS partagée, mêmes patterns de fermeture de parenthèses (2 bugs de parenthèses trouvés et corrigés pendant la reconstruction, comme sur les articles précédents). **Contenu factuel conservé à l'identique** (déjà vérifié lors de la première version, aucune nouvelle recherche nécessaire) : Picaria Real (XVIIIᵉ s., D. João V), Coudelaria de Alter (1748), fondation 1979 par des élèves de Nuno Oliveira, installation à Queluz (1996), Picadeiro Henrique Calado à Belém (2015), UNESCO décembre 2024 (art équestre au Portugal dans son ensemble, pas l'École isolément), hiérarchie Aspirant→Picador-Ajudante→Picador→Mestre-Picador-Chefe. Mêmes 9 photos Wikimedia + 2 vidéos déjà vérifiées, réutilisées à l'identique. Les 3 liens croisés (Cadre Noir, Vienne, Jerez) sont tous réels dans "Continuer l'exploration" — aucun stub.
- [x] **Fusion avec le travail d'une autre conversation en parallèle** : le fichier reçu contenait une refonte importante de la page "Mon Évolution"/courbe des Galops faite ailleurs (nouveau composant `GalopDepliant` + `langueDepliant`, cartes dépliantes avec étoiles de score, changement de `obtenirCoursParGalop`). **Rien de ce travail n'a été touché** — vérifié par diff exhaustif : les 13 hunks de modification sont tous confinés strictement à la fonction `EcranEcolePortugaise`, zéro fuite ailleurs. Fonctions/const top-level identiques au fichier reçu (même liste, `GalopDepliant`/`langueDepliant` bien présents), `allerVersGalop` intact.

- [x] **🎉 Nouvel article "L'École Royale Andalouse" — DERNIER des 4 grandes écoles, série complète.** (`EcranEcoleJerez`, ~395 lignes, même modèle, Premium dès la construction). Comme pour Vienne, Blandine n'a fourni que le plan de sections — recherche factuelle complète faite par Claude : fondation mai 1973 (Álvaro Domecq Romero présente « Cómo bailan los caballos andaluces » devant le futur roi Juan Carlos Ier en recevant le « Caballo de Oro »), rachat du palais du Recreo de las Cadenas par le ministère du Tourisme en 1976, École rachetée par son patronat en 1983 (Domecq nommé directeur technique), titre « Real » accordé par le roi Juan Carlos Ier en juin 1987 (parrainage royal, pas de distinction UNESCO propre à cette école contrairement aux 3 autres — vérifié, non fabriqué), Domecq revenu comme directeur honorifique en 2019, manège principal rebaptisé « Picadero Álvaro Domecq » en 2021, 50 ans de l'École en 2023. **Point de vigilance traité avec soin** : le fondateur Álvaro Domecq Romero est décédé le 18 novembre 2025 (fait vérifié par recherche web, récent) — mentionné avec respect et sobriété (dates de naissance/mort, sans citation inventée). Contenu : hero, carte d'identité, histoire + documentaire vidéo, timeline, galerie (4 photos du palais/école), le cheval (Pure Race Espagnole/Cartujano — avec l'histoire des moines chartreux cachant les chevaux pendant l'invasion napoléonienne de 1810), formation des cavaliers (6 élèves/an seulement, 16-24 ans, doma vaquera + doma clásica), philosophie (Casta/Élégance/Tradition/Complicité — adaptée à l'identité espagnole plutôt que redite des 3 autres écoles), spectacle "Cómo bailan los caballos andaluces" (90 min, ~150 000 visiteurs/an), savais-tu (**fait unificateur** : le cheval espagnol est l'ancêtre direct du Lipizzan ET du Lusitanien — relie les 4 articles entre eux), visiter + Marquer ma visite, sites officiels (realescuela.org), citation + regard de Hype, partager, album participatif, sélecteur de langue. Sources : **6 photos Wikimedia Commons + 2 vidéos YouTube officielles (chaîne FREAAE), toutes vérifiées individuellement**.
- [x] **Tous les liens croisés mis à jour — plus AUCUN stub "Bientôt sur Hype" dans toute l'app.** Les 3 stubs Jerez (dans Cadre Noir, École Portugaise, École Vienne) sont devenus des liens réels. La section "Les grandes écoles" dans Le Mag affiche désormais **les 4 grandes cartes cliquables** (Cadre Noir gratuit + École Portugaise/Vienne/Jerez Premium) — la rangée de stubs a été entièrement retirée, elle ne servait plus à rien.
- [x] **Petite retouche accueil** : espacement entre la carte "Théorie des Galops" et la carte "Culture équestre" réduit pour matcher celui entre "Coach virtuel" et "Théorie des Galops" — une marge CSS fixe de 24px qui traînait sur `.uv3 .culture` en plus du style inline a été neutralisée (source du grand vide signalé par Blandine).

- [x] **Nouvel article "L'École Espagnole de Vienne"** — 3ᵉ article de la série "Les grandes écoles" (`EcranEcoleVienne`, ~430 lignes, même modèle que les 2 précédents, **Premium dès la construction** cette fois, pas ajouté après-coup). Cette fois, Blandine n'a fourni qu'un plan de sections (pas de dossier éditorial rempli) — recherche factuelle complète faite par Claude : fondation officielle 1565 (première pierre de la Stallburg), élevage andalou dès 1562, haras impérial de Lipica fondé 1580, Winterreitschule construite 1729-1735 par Fischer von Erlach sous Charles VI, transfert du haras à Piber en 1920 (après la Première Guerre mondiale, Lipica restant en Italie), Opération Cowboy 1945, société de droit public 2001, UNESCO 2015 (450ᵉ anniversaire — bien la liste internationale, distincte de la reconnaissance nationale autrichienne de 2010), femmes admises dès 2008. Contenu : hero, carte d'identité, histoire + documentaire vidéo, timeline, galerie (5 photos Hofburg/Stallburg/écuries), le cheval Lipizzan (né noir, blanchit entre 6 et 10 ans), les 6 lignées fondatrices (Pluto/Conversano/Neapolitano/Favory/Maestoso/Siglavy avec origines exactes), le haras de Piber, formation chevaux + cavaliers fusionnée (parcours Eleve→Bereiter-Anwärter→Bereiter→Oberbereiter, 8 à 12 ans), philosophie (patience/harmonie/légèreté/respect), spectacles + costumes (Schulquadrille, tenue quotidienne vs tenue de gala), savais-tu (sauts d'école sans étriers ni rênes), visiter + Marquer ma visite, 3 vidéos officielles/presse, sites officiels (srs.at + UNESCO), citation + regard de Hype, partager, album participatif, sélecteur de langue. Sources : **8 photos Wikimedia Commons + 3 vidéos YouTube, toutes vérifiées individuellement** (dont 2 reportages KURIER 2023-2024 et les impressions du 450ᵉ anniversaire).
- [x] **Liens croisés mis à jour** : les 2 stubs "École Espagnole de Vienne · Bientôt sur Hype" (dans l'article Cadre Noir et dans l'article École Portugaise) sont devenus des liens réels. La section "Les grandes écoles" dans Le Mag affiche désormais **3 grandes cartes cliquables** (Cadre Noir gratuit + École Portugaise Premium + École Espagnole de Vienne Premium) + Jerez seul en Prochainement.

- [x] **Article "École Portugaise d'Art Équestre" passé en Premium** (demandé par Blandine le 27/07 : "les autres articles" grandes écoles, hors Cadre Noir qui reste gratuit). Double protection : (1) `EcranEcolePortugaise` vérifie `premium` en tout début de fonction et affiche un écran teaser (hero flouté, cadenas, résumé, bouton "Découvrir Premium") si le cavalier n'est pas abonné — protège même un accès direct par lien/hash ; (2) la carte de l'article dans Le Mag affiche désormais un badge 🔒 Premium et redirige directement vers l'écran d'abonnement au clic si non-premium (photo légèrement grisée). Le Cadre Noir n'est pas touché, reste en accès libre. **Point pour Blandine** : pour prévisualiser l'article complet sans être abonnée, utiliser le bouton "Mode Premium (admin)" (visible pour les modérateurs) ou vérifier que le compte de test a bien `premium: true`.

- [x] **Nouvel article "L'École Portugaise d'Art Équestre"** — 2ᵉ article de la série "Les grandes écoles", même modèle que le Cadre Noir (écran dédié `EcranEcolePortugaise`, ~400 lignes, CSS `.cnx-` réutilisé). Dossier éditorial de 23 sections fourni par Blandine, réduit à l'essentiel sans perdre l'information clé : Hero, carte d'identité (Portugal/Queluz/1979/UNESCO 2024), documentaire + galerie (2 vidéos réelles YouTube dont la Gala 45 ans/sept. 2024, 9 photos Wikimedia Commons toutes vérifiées une par une), histoire + timeline (Picaria Real XVIIIᵉ → 1748 Coudelaria de Alter → 1979 fondation → 1996 Queluz → 2015 Picadeiro Henrique Calado → 2024 UNESCO), 4 principes de philosophie (harmonie/équilibre/légèreté/respect), le cheval Alter Real, cavaliers (hiérarchie Aspirant→Picador-Ajudante→Picador→Mestre-Picador-Chefe), costumes + galas fusionnés en un seul bloc, "Le savais-tu ?", visiter (Picadeiro Henrique Calado, Belém), sites officiels (parquesdesintra.pt, UNESCO), citation + regard de Hype, "Marquer ma visite" (même pattern que Cadre Noir, table `visites_articles` déjà prête à réutiliser), partager, album participatif en Prochainement, sélecteur de langue standard (`SelecteurLangue`). "Continuer l'exploration" pointe vers le Cadre Noir (lien réel) + Vienne/Jerez (Prochainement).
- [x] **Liens croisés mis à jour** : la section "Continuer l'exploration" de l'article Cadre Noir pointe maintenant vers l'École Portugaise (lien réel au lieu d'un stub "Bientôt"). La section "Les grandes écoles" dans Le Mag (`EcranArticles`) affiche désormais 2 grandes cartes cliquables (Cadre Noir + École Portugaise) + Vienne/Jerez en Prochainement (au lieu d'1 carte + 3 stubs).
- [x] **Point de vigilance respecté** : contrairement au Cadre Noir, les photos/vidéos ne sont pas autorisées pendant les présentations publiques au Picadeiro (règle du site officiel) — la galerie est donc orientée bâtiment/chevaux/portraits plutôt qu'action de piste, conformément à la consigne de prudence sur les crédits donnée par Blandine dans le dossier source.
- [x] **`visites_articles.sql` exécuté dans Supabase** par Blandine le 27/07 — table + policies créées avec succès. Le compteur "Marquer ma visite" est fonctionnel.
- [x] **Article Cadre Noir — sélecteur de langue** : corrigé pour utiliser le composant standard `SelecteurLangue` (compact) — un seul drapeau en haut à droite qui ouvre un menu déroulant, exactement comme sur toutes les autres pages de l'app. (Première version avec 6 drapeaux côte à côte remplacée à la demande de Blandine, pas cohérente avec le reste.)
- [x] **Article Cadre Noir — carrousel des 3 écoles restantes** (retrait des 5 cartes stub redondantes de "Continuer l'exploration").
- [x] **Article Cadre Noir — encart "Marquer ma visite"** (compteur permanent, version simple). SQL livré, pas encore exécuté.
- [x] **Article Cadre Noir — encart "Partager cet article"** (Web Share API + repli copier-lien).
- [x] **Article premium "Le Cadre Noir de Saumur"** intégré (session précédente) — écran dédié, 6 langues, 2 galeries photo, 4 vidéos, timeline, philosophie, bibliothèque, bonus Hype pratique.
- [x] **Bug scroll Android résolu** : état figé côté appareil, pas un bug de code. Confirmé stable après redémarrage complet de l'appli.
- [x] Correctif nom d'écurie (`monClubEc`) — toujours actif.
- [x] Historique complet des sessions précédentes (voir plus bas).

---

## 💡 Idées notées (pas encore validées)

- **Article Cadre Noir — check-in "live"** : en plus du compteur permanent (fait), une version temps réel "3 cavaliers Hype sont ici maintenant" avec avatars empilés, expiration auto ~8h ou bouton "Je suis parti". Mis de côté au profit de la version simple. Point de vigilance si repris un jour : éviter d'afficher des prénoms/photos réelles en direct (public mineur inclus parmi les cavaliers Hype) — préférer compteur + avatars génériques anonymisés.
- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond)
- Page "Nos Ambassadeurs"
- GRAND QUIZZ transversal Bronze/Argent/Or, mode entraînement libre permanent

---

## 📝 Historique

| Date | Page/session | Résumé |
|------|--------------|--------|
| 17/07 → 26/07 | Claude | "Mon Évolution", Poney d'Or (9/9), écran "Quoi de neuf", réorganisation accueil, bugfixes session/scroll, parrainage. |
| Session suivante | Claude (Directeur Technique) | Correctif nom d'écurie (`monClubEc`) au lieu du texte en dur "Écurie Feinn". |
| Session suivante | Claude (Directeur Technique) | **Bug scroll Android** résolu via outil de debug intégré révélant un état figé côté appareil (pas un bug de code). |
| 27/07 | Claude (page "Articles 4 écoles") | **Article premium "Le Cadre Noir de Saumur"** — maquette validée v1→v6 puis intégration complète dans index.html (écran dédié, 6 langues). |
| 27/07 (2) | Autre page | Accueil : carte Communauté équestre remise dans Mon monde, section Découvrir réordonnée, carte Culture équestre remontée dans Actualité. Article Cadre Noir : philosophie dépliée en permanence, bonus Hype passé en carrousel, album participatif remonté avant "Visiter". |
| 27/07 (3) | Claude (page "Articles 4 écoles") | **Article Cadre Noir** : carrousel des 3 écoles restantes (retrait des 5 cartes stub), encart "Marquer ma visite" (compteur permanent + SQL), encart "Partager cet article". |
