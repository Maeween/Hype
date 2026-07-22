# SUIVI HYPE

> Ce fichier n'est mis à jour que dans deux cas : une tâche est terminée, ou une conversation est pleine et doit s'arrêter (elle note alors ce qu'il reste à faire). Jamais de nouveau fichier créé — toujours celui-ci modifié, remplacé dans les fichiers du projet.

**État au 22/07/2026 (26) — REQUALIFICATION des verdicts par Blandine : pipeline photo NON validable en l'état, perception v2 BLOQUANTE. L'index.html actuel reste celui de la (25).**

⚠️ **Décision de Blandine (référence métier, fait foi)** : toute affirmation positionnelle FAUSSE est éliminatoire, au même titre qu'une jambe inversée. Le round `low` a produit "le bassin paraît centré au-dessus de la selle" — validation à tort d'un défaut réel (cavalier assis en arrière de ses pieds, "cul dans la boîte") → **round low : ÉCHEC**. Rétroactivement, le round `medium` n'était pas un vrai 5/5 (lectures du bassin contradictoires dont des fausses, comptées à tort comme simple "variance") → **bilan réel des deux rounds : jambe 100 % fiable, phase 100 % fiable, vocabulaire propre, MAIS assiette non fiable → interdiction de mise en prod de l'analyse photo tant que l'assiette n'est pas fiabilisée.**

**Chantier BLOQUANT — perception v2** (recette prouvée par la jambe : repère géométrique défini = stabilité totale) : remplacer le champ "bassin" par 3 champs définis :
1. **contact_selle** : assis_dans_la_selle ("cul dans la boîte") / effleure / en_suspension — repère : espace visible entre la culotte et le siège de la selle.
2. **masse_fessiere_vs_verticale_etriers** : au_dessus / en_arriere ("en arrière de ses pieds") / en_avant.
3. **fermeture_buste** : angle hanche-épaule, séparé du reste.
+ Grille éliminatoire corrigée : ajouter noir sur blanc "toute affirmation positionnelle fausse = éliminatoire". Puis protocole complet à refaire (5 envois par réglage, assiette scorée aussi sévèrement que la jambe).

**Signal positif à conserver** : mention spontanée de l'alignement épaule-bassin-talon par l'étape pédagogie (culture propre du modèle, absent des prompts) — validé par Blandine comme "la base de tout", à ancrer comme fil rouge récurrent dans le futur lexique pédagogique.

**Plantages techniques** : 2 échecs "Petit souci de connexion" pendant le round low (~11:13 et ~11:30) — codes d'erreur PAS ENCORE relevés dans les logs Netlify (soupçon : rate limit OpenAI sur envois rapprochés ; parade provisoire : espacer d'une minute). À relever en priorité à la reprise.

**⚠️ En attente de Blandine à la reprise** : (1) son lexique/validation des 3 champs — **deux documents envoyés sont arrivés VIDES** dans la conversation, à renvoyer en COLLANT LE TEXTE directement dans le message ; (2) les codes d'erreur des 2 plantages ; (3) son feu vert pour coder la v2.

**⚠️ Note de passation** : la conversation Directeur Technique du 21-22/07 SATURE (envoi d'images refusé, documents joints arrivant vides). **Prochaine session = NOUVELLE conversation**, repartir de : ce SUIVI (26) + index.html (25) + assistant.js v5 + test-heybaby.html (version avec barre en bas + anti-récitation + limites plafonnées — livrée, pas encore poussée au moment de cette note).

**Version actuelle de l'index.html : session du 22/07/2026 (32) — Mémory : tirage aléatoire de 6 paires max par partie, conversation Baby Jeux**

⚠️ Cette version part de la (30) EN LIGNE (la migration .jpg (31) reste reportée, décision Blandine — toujours ne pas l'utiliser).

**Tirage à 6 paires (décision déléguée à Claude par Blandine, motivée par la difficulté du niveau "La vie du poney" : 9 paires = 18 cartes dès le 2ᵉ niveau, capture à l'appui 13 erreurs)** : `MemoryPoneyGrille` pioche désormais au hasard **6 paires maximum** par partie quand un niveau en compte davantage (`pairesJeu`, mélange Fisher-Yates + slice). Grille plafonnée à 12 cartes partout, rejouabilité accrue (chaque partie pioche des cartes différentes), et les thèmes peuvent s'enrichir sans limite sans grossir la grille. Concernés aujourd'hui : La vie du poney (9), Robes (7), Friandises (7). Le compteur "X / Y paires" et les fiches de niveaux affichent le nombre réellement joué (6). Les niveaux à ≤ 6 paires sont inchangés.

⚠️ Note technique : un autre mini-jeu partage un code de grille quasi identique (`cartesInit`/`forEach` en double dans le fichier) — toutes les retouches ont été strictement délimitées au bloc `MemoryPoneyGrille`, l'autre jeu est intact (vérifié).

✅ Vérification exhaustive faite le 22/07 : 803 fonctions + 304 const identiques (30)→(32), retouches confinées au composant + 1 ligne d'affichage des fiches, syntaxe JS validée (node --check).

⚠️ **Pour la suite, repartir de CETTE version (32)**. Restent au Mémory : Saut 3 images, Allures 1 (porte-bonheur). Réserve : câlin fond uni, "Scène 3 Samuel" (gardées de côté, décision Claude validée).

**Ancienne version 22/07/2026 (30) — Mémory : encart leçons réparé + 15 nouvelles scènes (5 thèmes complétés) (Baby Jeux)**

📌 **Décision de Blandine (22/07 soir) : la (30) est la version poussée et de référence.** Une migration (31) des scènes Mémory vers de vrais fichiers .jpg avait été préparée et livrée, mais Blandine avait déjà poussé la (30) avec les fichiers hype-images-114.js à 118.js — la migration est **reportée, ne pas utiliser le ZIP (31)**. Les fichiers 114-118.js restent donc actifs et nécessaires. **Convention à partir de maintenant : toute NOUVELLE image (k547+) sera livrée en vrai fichier `images/kXXX.jpg`, plus jamais en base64** ; la migration des fichiers existants se fera plus tard, par lots, quand Blandine aura moins de chantiers en parallèle.

⚠️ Cette version part de la (29) et complète la fusion (28) qui était partielle : le bloc de données `MEMORY_PONEY_NIVEAUX` avait bien été fusionné, mais **deux morceaux situés hors de ce bloc manquaient** — l'encart d'affichage "Le savais-tu du Poney" dans la vue résultat de `MemoryPoneyJeu` (sans lui, les 10 leçons existaient en données mais ne s'affichaient jamais à l'écran) et le raccourci d'aperçu `memory` dans CIBLE_DIRECTE. Les deux sont réinjectés. **Leçon pour les prochaines fusions Mémory : le périmètre = bloc de données + encart vue résultat + raccourci, pas seulement le bloc.**

**15 nouvelles scènes intégrées (validées par Blandine)** — 3 nouveaux fichiers ⚠️ **à pousser avec l'index** : `hype-images-116.js` (k531-k536), `117.js` (k537-k543), `118.js` (k544-k546). Prochaine clé libre : **k547**.
- **Friandises** : "La main bien à plat" (k531) → **complet 7/7**.
- **Pansage** : "Mon meilleur pote" (k532) → **complet 6/6**.
- **Premier contact** : "Le sourire" (k533), "Merci" (k534) → **complet 6/6**.
- **Allures** : "La balade au pas" (k535), "En selle !" (k536) → 5/6, reste le porte-bonheur.
- **Robes** : 7 scènes (k537-k543 : Pie, Alezan crins lavés, Gris, Noir, Bai, Alezan, Blanc gris très clair) — le niveau passe de 6 à **7 paires, complet**. Noms de robes allemands officiels (Fuchs, Rappe, Schimmel, Schecke, Brauner, Lichtfuchs).
- **Sécurité** : "Le cure-pied" (k544), "Je m'arrête" (k545), "Chaussures fermées" (k546) → **complet 6/6**.

**Mémory — état : 8 thèmes complets sur 10.** Restent 4 images : Saut 3 (barre, cavaletti, réception), Allures 1 (porte-bonheur). En réserve non intégrées : câlin fond uni, "Scène 3 Samuel conduit Apy" (texte incrusté, plutôt pour un cours Baby).

✅ Vérification exhaustive faite le 22/07 : 803 fonctions + 304 const identiques (29)→(30) (correctif PuzzleGalop de la (29), Hey Baby 2 étapes, conversation_id, âge/note : tous vérifiés intacts). Diff = 11 hunks confinés (balises script, CIBLE_DIRECTE, 8 zones de paires, encart résultat). k531-k546 : exactement 1 occurrence chacune. Recomptage des 10 niveaux : 63 paires dont 59 en image. Syntaxe JS validée (node --check).

⚠️ **Pour la suite, repartir de CETTE version (30)**.

**Ancienne version 22/07/2026 (29) — Correctif crash mémoire iOS sur PuzzleGalop (vue agrandie) (Directeur Technique)**

⚠️ Cette version part de la (28) et corrige le bug remonté par la branche Baby Jeux : crash mémoire iOS "Un problème récurrent est survenu" à l'agrandissement du 3ᵉ puzzle Baby (Poney d'Or, image k517).

**Correctif appliqué (refonte de la vue agrandie, option retenue parmi les 2 proposées)** : dans `PuzzleGalop`, la vue agrandie (`ouvert && ...`) créait, tant que le puzzle n'était pas complet, **9 instances distinctes de `background-image` en CSS**, chacune zoomée à 300 % sur la même image source — ce qui forçait iOS à décoder l'image source 9 fois simultanément en pleine résolution, d'où le pic mémoire. Remplacé par **une seule balise `<img>`** (un seul décodage) surmontée d'une grille de 9 caches en `position: absolute` (opaques avec "?" pour les pièces non débloquées, transparents pour les pièces débloquées, laissant apparaître l'image en dessous). Rendu visuel strictement identique, un seul décodage d'image au lieu de neuf.

⚠️ **Non traité** : la recompression du fichier image `k517` lui-même (2ᵉ piste proposée par la branche Baby Jeux) — fichier `hype-images-113.js` non fourni, pas nécessaire avec ce correctif mais peut rester une optimisation future si le problème persistait.

✅ Vérification exhaustive faite le 22/07 : diff confiné à la seule fonction `PuzzleGalop` (9 lignes remplacées par 9 lignes, structure changée). 803 fonctions + 304 const identiques (28)→(29). Syntaxe JS validée (2 erreurs de parenthèses corrigées en cours de rédaction avant validation finale).

⚠️ **Pour la suite, repartir de CETTE version (29)**. À tester par Blandine sur le 3ᵉ puzzle Baby (Poney d'Or) avant de considérer le bug résolu.

**Ancienne version (28) — FUSION du Mémory du Poney enrichi (branche Baby Jeux) dans la (27), conversation Directeur Technique**

⚠️ Cette version part de la (27) et fusionne le travail Mémory du Poney reçu de Blandine (branche "Baby Jeux", numérotée (23) de son côté — divergente de cette conversation depuis la session 20, jamais fusionnée avant aujourd'hui). **Fusion chirurgicale du seul bloc `MEMORY_PONEY_NIVEAUX`** : la branche Baby Jeux n'avait ni la refonte de l'analyse photo/vidéo en 2 étapes (perception/pédagogie, sessions 23-24 ici), ni la réécriture des cours Baby (session 27 ici) — seul le Mémory a été récupéré, tout le reste de cette branche ignoré car déjà obsolète par rapport à cette conversation-ci.

**Contenu Mémory réellement enrichi (vérifié thème par thème, pas seulement d'après le SUIVI de Blandine)** :
- Tous les 10 thèmes du Mémory ont grandi (pas seulement les 3 annoncés) — contenu descriptif enrichi partout.
- Clés image ajoutées sans aucune perte : `copains-ecurie` 1→7 clés, `friandises` 3→7 clés, `pansage` 3→6 clés. Les 7 autres thèmes gardent le même nombre de clés mais avec un contenu plus riche (correspond aux 10 leçons "Le savais-tu du Poney" mentionnées par Blandine).
- Fichiers `hype-images-114.js` et `hype-images-115.js` ajoutés aux balises `<script>` (clés k518-k530).

✅ Vérification exhaustive faite le 22/07 : 803 fonctions + 304 const identiques (27)→(28) (aucune perte, y compris `HEYBABY_ANALYSE_VISUELLE`/`HEYBABY_PROMPT_PERCEPTION`/`HEYBABY_CONSIGNES_PEDAGOGIE` de la session 24, confirmés intacts). Diff complet du fichier : toutes les autres zones où la branche Baby Jeux divergeait (Hey Baby, cours Baby) correspondaient à une **perte** de mon travail plus récent côté Baby Jeux — non reprises, uniquement la vraie nouveauté (Mémory) a été extraite. Aucune clé image du Mémory perdue (vérifié clé par clé, thème par thème). Syntaxe JS validée.

⚠️ **Pour la suite, repartir de CETTE version (28)**. Fichiers à pousser : `index.html` + `hype-images-114.js` + `hype-images-115.js`.

⚠️ **Mémory — images encore manquantes (repris du SUIVI Baby Jeux, non vérifié ici)** : Robes 6, Allures 3, Sécurité 3, Saut 3, Premier contact 2, Friandises 1, Pansage 1.

⚠️ **Bug ouvert signalé par la branche Baby Jeux (non traité ici, à reprendre)** : crash mémoire iOS à l'agrandissement du 3ᵉ puzzle Baby (Poney d'Or, image k517). Diagnostic : pic mémoire (9 copies de l'image en arrière-plan). Correctifs proposés en attente de validation : recompression de k517, ou refonte de la vue agrandie de `PuzzleGalop`.

**Ancienne version (27) — Réécriture complète des cours Baby c6 à c9 (nouvel univers narratif Liam/Apy/Elea/Samuel), conversation Directeur Technique**

⚠️ Cette version part de la (25) et remplace intégralement le contenu des cours `baby-c6` à `baby-c9` par une réécriture complète, cohérente avec l'univers narratif déjà utilisé sur `baby-c10` à `baby-c19` (personnages récurrents : Liam, Apy le poney, Elea, Samuel). Les 4 cours changent aussi de niveau (`poney_argent` → `poney_bronze`) et de type pour certains.

**Nouveau contenu de ces 4 cours (résumé)** :
- `baby-c6` — "Je découvre le pas sur Apy" (remplace l'ancien "À pied et à cheval")
- `baby-c7` — "Je descends d'Apy avec de l'aide"
- `baby-c8` — "Je me repère au poney-club" → devient un cours pratique niveau Bronze différent
- `baby-c9` — "Je prépare mon poney pour monter"

Chaque cours est traduit intégralement dans les 6 langues (fr/en/es/it/de/ja), quiz inclus.

✅ Vérification exhaustive faite le 22/07 : diff complet du fichier confiné à **exactement 4 hunks** — 1 correctif allemand récurrent (`cheval_age_ph`, déjà vu sur plusieurs sessions précédentes) + 3 hunks contigus couvrant la réécriture de `baby-c6` à `baby-c9`. Rien d'autre modifié dans les 37 136 lignes du fichier (fonctions, const, tous les autres écrans strictement identiques). Comptage fr:/de: dans `COURS_BABY_I18N` : 624/624, aucun trou de traduction. Syntaxe JS validée.

⚠️ **Pour la suite, repartir de CETTE version (27)**.

**Ancienne version (25) — Verdicts des tests de raisonnement + refonte de la barre d'écriture Hey Baby, conversation Directeur Technique** *(l'index.html actuel est celui-ci)*

**Résultats du protocole (photo de référence du cheval gris, pipeline perception/pédagogie, gpt-5.6-sol, detail original) :**
- **`medium` : VALIDÉ 5/5.** Jambe correcte 5/5 ("pied nettement devant la verticale du genou", repère cité à chaque fois), phase correcte 5/5 (début de phase descendante), 0 expression interdite, 0 invention (cadence/réception/abord jamais affirmées), limites honnêtes systématiques. Seul point flottant : le **bassin** (3 lectures différentes sur 5 — arrière/avant/centré), non éliminatoire.
- **`high` : DISQUALIFIÉ** — timeout ("Petit souci de connexion"), la réflexion dépasse les 51s du serveur, comme en (19). Pistes long terme si on veut le réactiver un jour : perception en streaming (maintien de la connexion pendant la réflexion), fonction Netlify en tâche de fond + interrogation périodique du résultat, ou allongement du timeout serveur si la plateforme le permet. Aucune urgente : medium suffit.
- **`low` : round en cours** (variable basculée, déploiement 11:16). Si 5/5 → réglage de prod (plus rapide, moins cher) ; sinon medium officiel.

**Diagnostic de Blandine sur la variance du bassin (à intégrer au prompt perception v2)** : le modèle confond bassin et masse fessière — sur cette photo les deux réalités coexistent (fesses qui reculent + ceinture pelvienne qui bascule en avant avec le buste). Champs à décomposer dans la v2 : (1) **contact selle** : assis_dans_la_selle ("le cul dans la boîte") / effleure / en_suspension — repère : espace visible entre la culotte et le siège ; (2) **masse fessière vs verticale des étriers** : au_dessus / en_arriere ("en arrière de ses pieds") / en_avant ; (3) **fermeture du buste** : angle hanche-épaule, séparé. La jambe est stable 5/5 parce qu'elle est définie géométriquement ; le bassin flottait parce qu'il ne l'était pas.

**index.html (25) — refonte de la barre d'écriture (retour de Blandine : barre trop haute, masquait les réponses)** : l'écran Hey Baby passe en vraie mise en page chat — hauteur fixe 100dvh, les messages défilent DANS la zone centrale, l'avatar/titre défilent avec eux (comme avant), l'en-tête garde les boutons (retour, historique, ✚, compteur), et la barre d'écriture est ancrée en bas de l'écran juste au-dessus de la barre de navigation, en permanence. Cause racine du comportement erratique de la v24 : `overflow: hidden` sur la racine désactivait le `position: sticky` des enfants. Syntaxe validée, non-régression OK.

**Limitation actée (demande de Blandine sur le menu photo)** : le menu qui s'ouvre sur 📷 (Google Drive / Choisir un fichier / Prendre une photo / Bibliothèque photo) est le **menu natif iOS** — son ordre n'est pas modifiable côté web, et Google Drive y figure parce que l'app Drive est installée sur l'iPhone comme fournisseur de fichiers. Rien à coder ; seule voie : une feuille de choix maison en amont (bouton "Bibliothèque" vs "Caméra"), mais iOS rouvrirait de toute façon son menu pour la bibliothèque — sans intérêt.

**Ajustement pédagogie (retour de Blandine sur le 1er envoi low, "blabla")** : consigne ajoutée à `HEYBABY_CONSIGNES_PEDAGOGIE` — ne jamais mentionner les champs techniques internes des observations (direction du cheval dans l'image, angle de prise de vue, valeurs de confiance) ni les réciter champ par champ : synthèse en langage de moniteur. N'affecte pas les faits mesurés par le protocole (jambe/phase), seulement la rédaction.

⚠️ **Pour la suite, repartir de CETTE version (25)**. Fichiers : index.html (analyse masquée, prod), index-preview-heybaby.html et test-heybaby.html (analyse active, test).

**Ancienne version (24) — Passage contrôlé à GPT-5.6 Sol pour l'analyse photo (pipeline perception/pédagogie) + correctif composeur, conversation Directeur Technique**

⚠️ Exécution de la spec de Blandine "Passage contrôlé de Hey Baby à GPT-5.6 Sol". Bascule des modèles déjà faite par Blandine dans Netlify (`OPENAI_TEXT_MODEL` et `OPENAI_VISION_MODEL` → `gpt-5.6-sol`, vérifié sur captures). Contexte : première analyse vidéo CORRECTE observée à 06:27 (jambe identifiée dans le bon sens, timestamp 14.6s cité) sous 5.5+low — le passage en `low` a déjà nettement amélioré ; 5.6 doit consolider.

**AUDIT `assistant.js` v4 (demandé en préalable, confirmé)** : endpoint `/v1/chat/completions` ; `OPENAI_VISION_MODEL` lu au routage avec **repli silencieux vers gpt-4o** si absente (interdit par la spec → corrigé) ; `OPENAI_REASONING` lu uniquement pour les modèles "gpt-5*", envoyé dans `reasoning_effort` ; **detail forcé à "high" pour toutes les images** (→ corrigé) ; texte et vision partageaient raisonnement et budget ; photos et vidéos même configuration ; modèle journalisé (v4).

**`assistant.js` v5 (nouveau, à déployer)** :
- Nouveau **mode "perception"** : non-streamé, `response_format: json_object`, 1200 tokens max, `detail` = `OPENAI_VISION_DETAIL` (défaut "original"), raisonnement = `OPENAI_VISION_REASONING` (repli `OPENAI_REASONING`), modèle = `OPENAI_VISION_MODEL` **obligatoire, aucun repli silencieux** (erreur explicite sinon).
- Mode standard **strictement identique à la v4** (texte, vidéos, détail "high") ; replis gpt-4o désormais journalisés avec ⚠.
- Nouvelles erreurs distinctes : `OPENAI_MODEL_NOT_FOUND` (modèle indisponible/non autorisé), `OPENAI_REASONING_PARAM`, `OPENAI_DETAIL_PARAM`.
- Logs : + `mode` et `detailImage` réellement utilisés. Toujours rien de sensible.

**`index.html` (24)** :
- **Analyse photo en 2 étapes** (uniquement photo seule ; vidéo inchangée) : Étape 1 = appel perception isolé (photo + `HEYBABY_PROMPT_PERCEPTION` + question du cavalier, SANS historique/carnet/profil/ton) → JSON structuré (phase, direction du cheval, angle de vue, pied vs verticale du genou avec confiance et justification, bassin, épaules, regard, cheval, éléments non déterminables). Étape 2 = appel pédagogique streamé : system Hey Baby habituel (sans règles visuelles) + bloc "OBSERVATIONS VALIDÉES à ne jamais contredire" + consignes (structure, expressions interdites : "traîner les pieds", "engagé dans son geste", "encolure sortie", "poids qui descend dans les mains", pas d'exercice si confiance faible).
- Si le JSON de perception est invalide : texte brut transmis tel quel à l'étape 2 (journalisé), pas d'échec.
- Délai client réarmé entre les 2 étapes (65s chacune).
- **Correctif composeur** ("gère ça" de Blandine) : barre de saisie passée en `position: sticky` (bottom 56px + safe-area, fond opacifié 0.86) — toujours visible, plus besoin de défiler pour écrire/envoyer.
- `HEYBABY_ANALYSE_VISUELLE` reste `false` dans l'index principal (prod protégée) ; **la preview de test a l'interrupteur à `true`**.

**Variables Netlify à créer par Blandine (pour le test)** : `OPENAI_VISION_REASONING=medium` (config principale spec) puis `low` (comparative) ; `OPENAI_VISION_DETAIL=original`. Retour arrière complet = remettre `OPENAI_VISION_MODEL=gpt-5.5` (+ supprimer/ignorer les 2 nouvelles variables) : aucun ancien réglage supprimé.

**Procédure de test (spec §8-9)** : déployer assistant.js v5 + variables → ouvrir la preview → photo de référence du cheval gris, 5 envois minimum en `medium`, puis 5 en `low` (changer la variable + Trigger deploy entre les deux) — relever pour chaque : reqId, modèle/raisonnement/detail (logs Netlify), durée avant 1er token, durée totale, direction de la jambe (attendu : DEVANT), phase (attendu : fin planer/début descente), expressions interdites absentes, non-déterminables respectés. Éliminatoire : jambe "reculée", antérieurs "en train de monter", cadence/réception inventées.

⚠️ Note d'honnêteté : le déploiement d'`assistant.js` v5 passe par la prod Netlify (pas de branche dans le flux GitHub actuel de Blandine), mais le mode standard étant inchangé au comportement près, la prod actuelle n'est pas affectée tant qu'aucun appel "perception" n'est émis (seule la preview en émet).

⚠️ **Pour la suite, repartir de CETTE version (24)**.

**Ancienne version (23) — Masquage temporaire de l'analyse photo/vidéo de Hey Baby + bilan du diagnostic nocturne, conversation Directeur Technique**

⚠️ **Décision de Blandine (nuit du 21 au 22/07)** : l'analyse photo/vidéo de Hey Baby ne peut pas rester en ligne en l'état (erreurs factuelles de perception + vocabulaire non équestre). Masquage temporaire, le reste de Hey Baby (questions, cours, théorie — qui fonctionne bien) reste actif.

**Changements dans index.html** :
- Nouvel interrupteur global `HEYBABY_ANALYSE_VISUELLE = false` (à côté de `HEYBABY_TIMEOUT_MS`) — **repasser à `true` pour tout réactiver, une seule ligne**.
- Bouton 📷 de Hey Baby masqué quand l'interrupteur est à false.
- Filet de sécurité dans `choisirImage` : si un média arrivait quand même (app pas à jour, cache), message honnête en 6 langues ("analyse en cours d'amélioration, revient bientôt") au lieu d'un envoi. Aucun média ne peut plus partir vers le serveur.
- Rien d'autre touché : `EcranEvenement` (bouton photo du mur communauté, ligne ~20834) vérifié hors périmètre, non modifié.

✅ Syntaxe validée, non-régression vérifiée (âge/note, structure rigide, timeout 65s tous OK).

---

**Bilan du diagnostic nocturne (21-22/07, sessions 22-23)** — ce qui a été prouvé par les logs et les tests :

1. **Fournisseur réel confirmé : OpenAI, PAS Claude.** `assistant.js` retrouvé et audité : appelle `api.openai.com/chat/completions`, modèle vision = `gpt-5.5` (variable `OPENAI_VISION_MODEL`), images en `detail:"high"`, streaming SSE réel.
2. **`OPENAI_REASONING` était sur `high` en production** → GPT-5.5 "ruminait" 16-40s avant d'écrire. Vidéo 14 frames : timeout serveur 51s atteint SANS aucun token produit (log reqId 4fdcd253). Photo : 33s dont ~16 avant le 1er token (reqId 1159da41). **Passé en `low` par Blandine + redéployé.**
3. **Test post-`low` (photo zoomée)** : l'inversion de la jambe PERSISTE, vocabulaire toujours défaillant → **le reasoning est éliminé comme cause racine**. Réserve : test fait sur un zoom recompressé (pire cas image) ; à refaire sur la photo originale complète.
4. **Comparaison de référence** : ChatGPT (app), même modèle déclaré, même photo → analyse parfaite AVEC repères géométriques cités ("le pied devant la verticale du genou"). Hey Baby → inversion + expressions non équestres ("traîner les pieds", "poids qui descend dans les mains") + remplissage hors sujet. **Conclusion : le modèle est capable ; c'est la méthode/le contexte de l'appel qui fait défaut.** Suspects restants : contexte trop volumineux (system prompt 4400-5500 car. + historique + carnet qui "noient" l'image), compression du média, éventuelle variante de modèle app vs API.
5. **Incident sécurité réglé** : la clé API OpenAI a été exposée en clair sur une capture d'écran → révoquée, remplacée ("Hype 2"), Netlify mis à jour, redéployé. Dépense vérifiée avant révocation : 3,88 $/mois (aucun abus).
6. **Timeouts corrigés et fonctionnels** : serveur 51s (abandon propre avant la limite Netlify ~60s), client 65s. Le message "Petit souci de connexion" des vidéos = timeout serveur confirmé par les logs.
7. Note produit : le libellé de l'app affiche "📷 Photo envoyée" même pour une vidéo — petit bug d'étiquette relevé, sans gravité, à corriger un jour.

**⚠️ Plan de reconstruction de l'analyse visuelle (étape 2, AVANT toute réactivation)** :
- Isoler l'appel d'analyse : photo + question seules, sans historique ni carnet, system prompt minimal dédié.
- Méthode par repères géométriques OBLIGATOIRE dans le prompt (verticale depuis l'assiette, position du pied vs sangle, alignement épaule-hanche-talon) — aucune affirmation directionnelle sans repère cité. Modèle : l'analyse de référence ChatGPT.
- Lexique équestre de référence à construire avec Blandine (40 ans d'expérience) — interdiction de paraphrase en langage courant. Écarté du vocabulaire déjà relevé : "traîner les pieds", "sortir l'encolure vers l'avant" (au lieu de "déplier son encolure"), "poids qui descend dans les mains".
- Questionnaire préparé pour extraire la démarche pas-à-pas de ChatGPT (à faire passer par Blandine dans la conversation où il a réussi).
- Test de validation sur la photo de référence originale + les 12 tests du protocole initial AVANT de repasser `HEYBABY_ANALYSE_VISUELLE` à `true`.
- Si même la méthode reconstruite ne fiabilise pas les verdicts géométriques : redimensionner honnêtement le périmètre (description de phase + attitude générale + questions au cavalier, SANS verdicts directionnels).

**⚠️ Point de vigilance non résolu** : Blandine signale l'app lente à l'ouverture (~40s au lieu d'instantané) dans la nuit. Hypothèse : reconstruction du cache PWA après 3 déploiements en 3h sur réseau faible — à revérifier à tête reposée (test : 2 ouvertures successives + comparaison Safari vs app installée). Rien dans les changements du jour ne touche au chargement de l'app.

⚠️ **Pour la suite, repartir de CETTE version (23)**.

**Ancienne version (22) — Étape 1 du correctif timeouts/diagnostic (partie frontend), conversation Directeur Technique**

⚠️ Fait suite à `assistant.js` v4 (déjà livré séparément). Étape 1 uniquement, comme cadré par Blandine : alignement des délais + erreurs structurées + diagnostic. **Rien d'autre changé** (pas de modèle, pas de reasoning, pas de detail image, pas de nombre de frames, pas de limite de sortie, pas de nouvelles règles d'analyse — tout ça reste pour l'étape 2, après les tests réels).

**Changements** :
- `HEYBABY_TIMEOUT_MS` : 60000 → **65000** (65s), cohérent avec le nouveau timeout serveur de 51s dans `assistant.js` (le serveur a le temps d'abandonner proprement et de répondre avant que le client ne coupe).
- Détection des erreurs structurées renvoyées par `assistant.js` (`{ ok:false, code, message, reqId }`) : sur un `!response.ok`, le corps JSON est lu et le code/reqId sont journalisés via `hbLog` (console), sans changer le message affiché au cavalier (`souci_connexion`, reste simple et rassurant).
- Détection du **marqueur de coupure de flux** (`\u0000HEYBABY_ERROR:CODE:reqId\u0000`) ajouté par `assistant.js` en fin de texte streamé si l'appel OpenAI est interrompu en cours de route : le marqueur est retiré avant affichage (le cavalier ne le voit jamais), et le code + reqId sont journalisés (`hbLog`) avec le nombre de caractères déjà reçus avant la coupure.
- Cas JSON `ok:false` (mode non-streaming) également géré : log du code/reqId, message simple affiché.

✅ Vérification faite le 21/07 : syntaxe JS validée (`node --check`), 0 occurrence résiduelle du bug âge/note, 0 occurrence de la structure rigide. Rien d'autre modifié dans le fichier (pas de diff en dehors du bloc `envoyer()` et de `HEYBABY_TIMEOUT_MS`).

⚠️ **Contexte pris en compte pour les prochains tests** : un incident OpenAI concernant la génération d'images (ChatGPT/API) a été signalé par Blandine le 21/07 en soirée. Ce service est distinct de ceux utilisés par Hey Baby (texte + analyse d'image/vision, pas de génération). Les futurs tests devront noter l'heure exacte pour pouvoir croiser avec le statut des services OpenAI si besoin — aucune conclusion tirée sur Hey Baby à partir de cet incident à ce stade.

⚠️ **Prochaine étape, pas encore faite** : Blandine doit déployer en environnement de test (pas en production directe), puis vérifier elle-même :
- les variables d'environnement réelles (`OPENAI_TEXT_MODEL`, `OPENAI_VISION_MODEL`, `OPENAI_REASONING`) dans Netlify,
- les logs Netlify Functions (recherchables désormais par `reqId`, visible dans la console navigateur ET dans les logs serveur pour recouper),
- exécuter les 4 tests de base (texte minimal, question courte, photo, vidéo courte) et rapporter statut/durée/erreur/complétude.

Seulement après ces résultats réels : étape 2 (ajustement modèle, reasoning, detail image, nombre de frames, limite de sortie).

⚠️ **Pour la suite, repartir de CETTE version (22)**.

**Ancienne version (21) — Correctif poids des frames vidéo (bug "Petit souci de connexion" en prod), conversation Directeur Technique**

⚠️ **Bug remonté par Blandine en conditions réelles**, après mise en ligne de la (20) : envoi d'une vidéo → "Petit souci de connexion. Réessayez dans un instant." Diagnostic (pas confirmé par les logs serveur, toujours pas d'accès à `assistant.js`) : la requête envoyée au serveur Netlify contient toutes les frames vidéo encodées en base64 directement dans le corps de la requête. Avec l'augmentation de qualité/résolution faite en session (19) (1280px / JPEG 0.8) et 8 frames sur cette vidéo, le paquet total dépasse probablement la limite de taille de requête de la fonction Netlify (généralement ~6 Mo).

✅ **Correctif codé (fait)** — `extraireFramesVideo` réécrite :
- **Nombre de frames cible augmenté** (demande de Blandine, décision prise dans une autre conversation avec Claude : privilégier la qualité d'analyse) : 6/8/10/12 → **10/14/18/24** selon la durée de la vidéo (≤8s / ≤20s / ≤45s / plus). Plafond de captures brutes remonté de 20 à 36 pour laisser de la marge au filtrage flou/doublons.
- **Nouveau garde-fou en cascade** (`_hbReencoderFrame`) : au lieu de sacrifier des frames en premier dès que le paquet dépasse ~4 Mo, le système réduit d'abord la **qualité JPEG** (0.8 → 0.6 → 0.5 → 0.4) puis la **résolution** (1280 → 960 → 768 → 640px) de toutes les frames déjà capturées, en les ré-encodant sans repasser par la vidéo. Sacrifier des frames (comme avant) reste le tout dernier recours, seulement si même en qualité/résolution minimales le paquet reste trop lourd.
- **Délai de sécurité de capture élargi** : avec plus de frames à capturer, le délai global (`gardeFou`) est maintenant calculé dynamiquement (20s de base + 3s par frame visée, plafonné à 90s) au lieu d'un délai fixe de 20s — évite un nouveau risque de timeout introduit par l'augmentation du nombre de frames.

✅ Vérification faite le 21/07 : syntaxe JS validée (`node --check`), 0 occurrence résiduelle du bug âge/note (session 20), 0 occurrence de la structure rigide (session 19). Fonction `_hbReencoderFrame` ajoutée, aucune fonction existante supprimée.

⚠️ **Point de vigilance à surveiller par Blandine après mise en ligne** : ce correctif réduit le risque mais ne l'élimine pas à 100 % pour des vidéos très longues ou très riches en détails (le seuil de 4 Mo reste une limite théorique côté client, pas une garantie absolue côté serveur tant que la vraie limite de la fonction Netlify n'est pas confirmée). Si le bug revient, le tester avec la durée exacte de la vidéo en cause.

💡 **Chantier futur noté, PAS pour maintenant** : passer à un stockage des frames vidéo dans Supabase Storage (upload temporaire → analyse par lien → suppression automatique juste après lecture de la réponse) pour lever la limite de taille de requête de façon durable. **Bloqué tant que Blandine n'a pas fourni la fonction serveur Netlify (`netlify/functions/assistant.js` ou équivalent)**.

⚠️ **Pour la suite, repartir de CETTE version (21)**.

**Ancienne version (20) — Correctif fiche cheval (âge séparé de la note libre), conversation Directeur Technique**

⚠️ Cette version part de la (19) fournie par Blandine (déjà vérifiée exhaustivement conforme au récapitulatif Hey Baby). Un seul sujet traité cette session : un bug repéré en conversation lors d'une discussion sur l'utilisation du profil du cheval par Hey Baby.

**Bug corrigé** : dans le flux d'ajout rapide d'un cheval côté "assistant personnel" (`ModaleAjoutCheval` → `ajouterChevalPerso`), le champ libre "note" (ex. "Jument de club, en or à l'obstacle.") était enregistré **dans la colonne `age`** de la table `chevaux` au lieu d'une colonne dédiée. Un vrai âge numérique et une note descriptive ne pouvaient donc pas coexister sur cette fiche.

**Changements** :
- Nouveau champ **Âge** ajouté au formulaire `ModaleAjoutCheval` (distinct du champ Note déjà existant), avec placeholder traduit fr/en/es/it/ja (`cheval_age_ph`).
- `ajouterChevalPerso` réécrite pour accepter `age` et `note` séparément et les écrire chacun dans sa colonne.
- Mapping de lecture (`mesChevauxPerso` → état local) corrigé : n'écrase plus `note` avec la valeur d'`age`.
- Contexte transmis à Hey Baby (`getContexteHeyBaby`) enrichi : la ligne "Chevaux enregistrés" inclut désormais l'âge réel **et** la note libre, séparément, pour chaque cheval (jusqu'à 5).
- Le flux principal de la fiche écurie (`ModaleCreationCheval` / `ajouterCheval` / `modifierCheval`) n'était **pas concerné** par ce bug — il a toujours eu un vrai champ âge séparé, sans champ note. Non modifié.

⚠️ **Fichier SQL `chevaux_age_note.sql`** : ajoute la colonne `note` (texte) à la table `chevaux`, idempotent, non destructif. Récupère automatiquement dans `note` tout ce qui était stocké par erreur dans `age` mais n'était pas un vrai âge numérique (regex de détection), puis vide `age` pour ces lignes-là. Aucune ligne supprimée. ✅ **Exécuté par Blandine le 21/07 dans Supabase (SQL Editor) — confirmé "Success. No rows returned".**

✅ Vérification faite le 21/07 : syntaxe JS validée (`node --check`), 0 occurrence résiduelle de l'ancien bug (`age: note` / `note: c.age`), 0 occurrence de la structure rigide "2 points forts / 2 axes / 1 exercice" (déjà supprimée en (19), toujours absente).

⚠️ **En attente de Blandine (inchangé depuis la (19), toujours valable)** :
- ✅ `conversation_id.sql` exécuté dans Supabase le 21/07 — fait.
- ✅ `chevaux_age_note.sql` exécuté dans Supabase le 21/07 — fait.
- Retrouver et fournir la fonction serveur Netlify (probablement `netlify/functions/assistant.js`) pour auditer le fournisseur/modèle IA réel utilisé côté serveur.
- Tester Hey Baby en conditions réelles (protocole de 10-12 tests déjà défini, pas encore exécuté).
- Mettre en ligne (branche GitHub + déploiement Netlify) une fois testé et les deux scripts SQL exécutés.

⚠️ **Pour la suite, repartir de CETTE version (20)**.

**Ancienne version (19) — Refonte Hey Baby (analyse photo/vidéo + cloisonnement des conversations), conversation Directeur Technique**

⚠️ Cette version part de la (18) et fusionne le travail reçu de Blandine sur Hey Baby (branche encore plus ancienne que celle des tarifs Stripe — sans allemand ni aucun des ajouts des sessions 12 à 18). **Fusion chirurgicale, pas un remplacement de fichier** : seuls les éléments réellement nouveaux ont été extraits et réinjectés dans la (18), avec réinjection automatique de l'allemand partout où le texte français existait déjà ailleurs dans le fichier (dictionnaire de 319 traductions déjà validées, utilisé pour recoller l'allemand y compris sur quelques chaînes situées hors du périmètre Hey Baby, ex. la robe "Noir" → "Rappe").

**Changements fonctionnels (repris du récapitulatif de Blandine, vérifiés présents après fusion)** :
- Structure rigide "2 points forts / 2 axes / 1 exercice" supprimée entièrement de l'analyse photo/vidéo.
- Nouvelles règles d'analyse visuelle dans `getSystemPrompt` (fr/en/es/it/ja **+ de ajouté par Claude**), actives uniquement si photo/vidéo jointe : structure libre, distinction fait/probable/incertain, interdiction d'inventer un nom/niveau/discipline/détail absent, priorité sécurité/équilibre, pas de compliment/emoji automatique.
- Règles vidéo (comparaison temporelle, phases du saut, distinction défaut ponctuel/récurrent) traduites dans les 5 langues **+ allemand ajouté par Claude** (avant : uniquement en français, en dur).
- Flags `avecPhoto`/`avecVideo`/`nbFrames`/`avecTimestamps` corrigés et transmis à `getSystemPrompt`.
- Photos : correction orientation EXIF (`traiterPhotoHeyBaby`), résolution jusqu'à 2048px (pas de miniature), JPEG q0.92, diagnostic loggé (`hbLog`).
- Vidéos : résolution 1280px (avant 1024), qualité JPEG 0.8 (avant 0.65), timestamp par frame, filtre anti-flou (`_hbAnalyseFrame`), dédoublonnage par empreinte (`_hbHashDistance`), début/fin toujours conservés.
- `conversation_id` implémenté : génération/persistance locale (`obtenirConversationHB`/`nouvelleConversationHB`), chargement et sauvegarde des messages filtrés par conversation, bouton "Nouvelle conversation" avec confirmation dans l'en-tête de Hey Baby (allemand ajouté par Claude sur ce bouton et sa confirmation).

⚠️ **Bug corrigé en cours de fusion** : lors de l'extraction du bloc `extraireFramesVideo`, les définitions de `_hbAnalyseFrame`/`_hbHashDistance` avaient été omises par erreur de bornage — repéré immédiatement (fonctions appelées mais non définies) et corrigé avant validation finale.

⚠️ **Fichier SQL `conversation_id.sql`** : ajoute la colonne `conversation_id` (uuid, nullable) et un index sur `conversations_heybaby`, idempotent, non destructif. Les anciens messages sans `conversation_id` restent en base mais ne sont plus chargés dans aucun fil (archivage de fait, sans perte de données). ✅ **Exécuté par Blandine le 21/07 dans Supabase (SQL Editor) — confirmé "Success. No rows returned".**

⚠️ **En attente de Blandine (repris du récapitulatif fourni)** :
- ✅ `conversation_id.sql` exécuté dans Supabase le 21/07 — fait.
- Retrouver et fournir la fonction serveur Netlify (probablement `netlify/functions/assistant.js`) pour auditer le fournisseur/modèle IA réel utilisé côté serveur (le format des messages suggère Claude, non confirmé côté serveur).
- Tester Hey Baby en conditions réelles (protocole de 10-12 tests déjà défini, pas encore exécuté).
- Mettre en ligne (branche GitHub + déploiement Netlify) une fois testé.

✅ Vérification exhaustive faite le 21/07 : 802 fonctions + 301 const top-level (5 fonctions + 1 const nouvelles, exactement celles attendues du système de conversation). Diff complet contre la (18) : toutes les modifications hors du bloc Hey Baby sont de purs ajouts du champ `de:` (27 hunks vérifiés un par un, chacun strictement plus long, rien retiré). Syntaxe JS validée à chaque étape de la fusion.

⚠️ **Pour la suite, repartir de CETTE version (19)**.

**Ancienne version (18) — Fusion des 4 tarifs Hype Pro sur vrais liens Stripe**

⚠️ Cette version part de la (17) et y fusionne le travail réel de paiement Stripe fait sur une branche parallèle et bien plus ancienne ("Jeux Baby Poney (suite)", session locale 11 de cette branche, 20/07). **Fusion chirurgicale manuelle**, pas un remplacement de fichier : la branche Stripe reçue datait d'avant la fusion (11) de cette conversation-ci et n'avait ni l'allemand, ni les badges de niveau (`HYPE_NIVEAU_BADGES`), ni la fonctionnalité Reprises FFE (`EcranReprisesFiches`, `BlocReprisesGalop`, `REPRISES_FFE`), ni `CHASSE_ERREURS_CARTES`, ni `FinCheminBabyCarte`. Seule la carte Hype Pro (4 boutons de tarifs + vrais liens Stripe) a été extraite de cette branche et réinjectée dans la (17), en conservant tout l'allemand déjà présent et en le complétant sur les 2 nouveaux tarifs.

**Changements concrets** :
- Liens Stripe factices (`REMPLACER_PRO_SANS_IA`/`REMPLACER_PRO_AVEC_IA`) remplacés par les vrais.
- Tarif Sans IA changé : 7,99 €/mois → **9,99 €/mois** (vrai prix Stripe, différent de l'ancien prix prévisionnel).
- Nouveau tarif **Sans IA annuel** : 79,99 €/an (`HYPE_STRIPE_PRO_SANS_IA_ANNUEL`).
- Nouveau tarif **Duo Pro** : 15,90 €/mois (`HYPE_STRIPE_PRO_DUO`) — formule pas encore documentée en détail par Blandine (probablement 2 comptes pro liés, à clarifier si besoin).
- Carte Hype Pro passée de 2 à **4 boutons de prix** (grille flexible `flex-wrap`).
- Allemand ajouté par Claude sur les 2 nouveaux tarifs (`/Jahr`, `Ohne KI · jährlich`, `Duo Pro`, `/Monat`) — à valider si besoin, cohérent avec le reste du glossaire allemand déjà en place.

⚠️ **Essai gratuit 30 jours (Sans IA) — toujours pas fait.** Config Stripe pure (pas de code) : l'option n'existe pas dans l'appli mobile Stripe, Blandine doit passer par dashboard.stripe.com en navigateur (Safari mode "site bureau" si besoin) pour l'ajouter sur le prix Sans IA une fois qu'elle y a accès.

✅ Vérification exhaustive faite le 21/07 : diff (17)→(18) confiné à 3 zones (constantes Stripe, carte Hype Pro, `DEV_OUVRIR_PAGE` entre index/preview). Fonctions et const top-level de la (17) toutes préservées (Reprises FFE, badges de niveau, Chasse aux erreurs, Fin Chemin Baby confirmés intacts). Syntaxe JS validée.

⚠️ **Pour la suite, repartir de CETTE version (18)**.

**Ancienne version (17) — Bandeau navigation Quêtes sur EcranMonCavalier**

⚠️ Cette version part de la (16) et ajoute un **nouveau bandeau** dans `EcranMonCavalier` : bouton pleine largeur avec badge de niveau illustré, barre de progression XP et libellé "Tes quêtes" cliquable vers l'écran Quêtes (masqué en mode visite `__estVisite`).

⚠️ **Fusion réalisée manuellement, pas une simple insertion de fichier reçu** : le fichier reçu de Blandine pour cette session était parti d'une branche antérieure à la (16) — il n'avait pas l'allemand sur `EcranCheval`/`EcranPremium`/`PV5_TXT`/`EcranBibliothequeGalops`. Plutôt que d'écraser la (16), le nouveau bandeau (seule vraie nouveauté du fichier reçu) a été extrait et réinséré à la main dans la (16), pour ne perdre ni l'allemand de la (16) ni ce nouvel ajout.

⚠️ **Traduction allemande ajoutée par Claude, à valider** : la chaîne "Tes quêtes" de ce nouveau bandeau n'avait pas de version allemande dans le fichier reçu. `de: "Deine Quests"` a été ajouté par cohérence avec la traduction déjà utilisée pour le même libellé dans `EcranQuetes` — à confirmer avec Blandine si besoin.

✅ Vérification exhaustive faite le 21/07 : diff (16)→(17) = strictement les 9 lignes du nouveau bandeau, rien d'autre modifié. 797 fonctions + 298 const identiques. Syntaxe JS validée.

⚠️ **Pour la suite, repartir de CETTE version (17)**.

**Ancienne version (16) — Allemand sur EcranCheval, EcranPremium, PV5_TXT et EcranBibliothequeGalops**

⚠️ **Note de numérotation** : le SUIVI reçu de Blandine pour cette livraison utilisait le numéro "(15)", mais dans le fil de travail ici c'était déjà pris (allemand EcranQuetes/EcranAssistantIA). Contenu différent, aucune collision réelle — juste deux branches numérotées en parallèle. Renommé (16) pour lever toute ambiguïté.

⚠️ Cette version part de la (15) et ajoute l'allemand sur :
- `EcranCheval` (fiche d'un cheval) : ~67 chaînes traduites (identification/statistiques, partage vers l'Écurie Hype, récit/histoire du cheval, toasts). **⚠️ Non mentionné dans le SUIVI reçu de Blandine — repéré et ajouté ici après vérification exhaustive du fichier réel (81 hunks de diff au total, dont 67 rien que sur cet écran).**
- `EcranPremium` : 7 chaînes traduites (libellés de statut d'abonnement : annuel/mensuel/duo/IA/membre d'honneur/accès actif + bandeau "TU FAIS PARTIE DU CERCLE").
- `PV5_TXT` : dictionnaire complet de la page Premium (53 clés) — n'avait aucune version allemande, en a désormais une complète, insérée comme 5ᵉ langue du dictionnaire (`{"fr":..., "en":..., "es":..., "it":..., "ja":..., "de":...}`).
- `EcranBibliothequeGalops` : 15 chaînes traduites (Parcours fédéral, Chemin du Poney, encart Hype Pro, tarifs, etc.).

✅ Vérification exhaustive faite le 21/07 : 797 `function` + 298 `const` top-level identiques (15)→(16), diff = 81 hunks / 138 lignes supprimées / 138 ajoutées (équilibre parfait), chaque ligne modifiée est un pur ajout du champ `de:` (ou paramètre `de` de `T()`/`TXT()`), aucune perte. Syntaxe JS validée.

⚠️ **Rappel du point technique d'encodage (toujours valable, confirmé une fois de plus sur cette session)** : le mélange d'encodages (`\u00e9` littéral vs UTF-8 réel, parfois même avec des emoji en `\uD83D\uDC1D` littéral au sein d'une chaîne par ailleurs en UTF-8 réel) continue d'exiger une vérification systématique sur le fichier brut avant remplacement.

⚠️ **Pour la suite, repartir de CETTE version (16)**.

⚠️ **Mini-jeux volontairement exclus du chantier allemand** (à la demande de Blandine, car pas encore définitifs) : `ChasseErreursGalop` (~80 appels), `MemoryPoneyJeu` (~13), `VraiFauxApyJeu` (~5), et les composants de jeux Baby associés (`RemetsOrdreGalop`, `PuzzleGalop`, `QuizEclairGalop`, `ReprisePlanJeu`, `PalierBabyCarte`, `FinCheminBabyCarte`, `BadgesThemeGalop`) — à reprendre seulement quand ces jeux seront stabilisés.

⚠️ **Attention fichiers images** : toujours besoin de `hype-images-110.js` à `hype-images-112.js` (clés k503-k516, jeu Vrai/Faux) en plus des fichiers habituels.

⚠️ **Point d'attention Hype Pro (toujours valable, inchangé depuis la session 10)** :
- ~~Les 2 liens de paiement Stripe sont encore factices~~ **Corrigé en session (18)** : les 4 liens Stripe (Sans IA, Sans IA annuel, Avec IA, Duo Pro) sont désormais réels et fonctionnels.
- `HYPE_PRO_AUTODEBLOQUE = true` — **à repasser à `false` vers le 20/09/2026**.
- Email de contact temporaire : `feinn@live.fr`, à remplacer quand Blandine aura une adresse définitive.
- `EcranParcours`/`EcranProfilSetup` = code mort, ne pas y toucher. Le vrai écran d'inscription est `EcranPersonnalisation`.

---

## 🔴 À FAIRE

### Reprises anciennes, toujours en attente
- [ ] **Page Cavalier — mise en page à finaliser avec Blandine** (carte photo/prénom/icônes).
- [ ] **Badge "Premium" sur la page Cavalier** — position à vérifier après la refonte de la carte photo.
- [ ] **Messagerie — groupes d'écurie/club** — pas implémentés (seuls les DM fonctionnent).
- [ ] **Messagerie — bouton "+" (pièce jointe)** — pas d'envoi réel.
- [ ] Confirmer l'affichage de la vraie photo d'un ami visité.
- [ ] Nettoyer en base les 3 albums mal rattachés (`cible: cheval:rizotto`).
- [ ] Surveiller le quota Supabase — période de grâce jusqu'au 14 août 2026.
- [ ] Relire/valider le quiz brouillon (10 questions) de g1-c19.
- [ ] **UI page Cavalier** : déplacer "L'Album de l'écurie" vers Hype Memories ; vérifier l'encart Hey Baby.
- [ ] **Traduction Galop 3** : confirmer g4-galop-qualite, g3-c13, g3-c14 (g3-c2 à g3-c12 sont faits).
- [ ] **Quêtes** : valeurs d'XP toujours provisoires à valider ; défis hebdomadaires toujours non codés (juste maquettés).
- [ ] **Mémory du Poney — niveaux incomplets** : Robes, Copains de l'écurie, Sécurité, Obstacles, Friandises, Pansage.
- [ ] **Poney d'Or** : niveau toujours vide (0 cours), bloque le test du palier Argent → Or.
- [ ] **Couverture `baby-c7`** : image dupliquée, pas d'image dédiée.
- [ ] **Couvertures manquantes `baby-c11` à `baby-c15`** : couverture provisoire `GALOPS_HERO`.
- [ ] **Chemin Baby — écran de fin après le Poney d'Or** : pas fait.
- [ ] Décider du sort de `EcranProfil` vs `EcranMonCompte`.
- [ ] **Remplacer les 2 liens Stripe factices** de Hype Pro.
- [ ] **Repasser `HYPE_PRO_AUTODEBLOQUE` à `false`** vers le 20/09/2026.
- [ ] **Remplacer l'email `feinn@live.fr`** par l'adresse définitive.
- [ ] Si Blandine veut une vraie persistance/visibilité admin du statut Pro : colonne Supabase + sync (non fait).
- [ ] Jeu "Vrai ou Faux avec Apy" : peut être complété si Blandine envoie de nouvelles photos.
- [ ] **Allemand — chantier de fond restant** : au-delà des blocs traités (32 écrans principaux + 11 quêtes + EcranArticles/EcranProfil/EcranQuetes/EcranAssistantIA/EcranCheval/EcranPremium/PV5_TXT/EcranBibliothequeGalops), il reste des composants secondaires non recensés précisément — mini-jeux volontairement laissés de côté (voir avertissement ci-dessus) jusqu'à stabilisation. **Point de vigilance** : au moins un écran (`EcranCheval`) était absent du SUIVI alors que le travail avait bien été fait — toujours vérifier le fichier réel en plus du SUIVI avant de conclure qu'un écran n'est pas traité.

---

## 🟢 FAIT (session du 22/07/2026 (32) — Tirage 6 paires, conversation Baby Jeux)

- [x] **Tirage aléatoire de 6 paires max** par partie dans `MemoryPoneyGrille` (La vie du poney passe de 18 à 12 cartes). Compteurs et fiches de niveaux alignés.
- [x] Retouches strictement délimitées au composant (un autre jeu partage le même motif de code — intact).
- [x] Vérification exhaustive (30)→(32) : 803 fonctions + 304 const identiques, syntaxe validée.

## 🟢 FAIT (session du 22/07/2026 (30) — Encart leçons réparé + 15 scènes, conversation Baby Jeux)

- [x] **Encart "Le savais-tu du Poney" réinjecté** (manquait dans la fusion (28) — les leçons ne s'affichaient pas) + raccourci `#memory`.
- [x] **15 scènes intégrées** (k531-k546, fichiers hype-images-116/117/118) : Friandises, Pansage, Premier contact, Sécurité et Robes complets ; Allures 5/6.
- [x] Robes étendu à 7 paires (ajout Alezan crins lavés + Blanc gris très clair — pédagogiquement exact).
- [x] Vérification exhaustive (29)→(30) : 803 fonctions + 304 const identiques, 11 hunks confinés, syntaxe validée.

## 🟢 FAIT (session du 21/07/2026 (16) — Allemand EcranCheval (non documenté initialement), EcranPremium, PV5_TXT, EcranBibliothequeGalops, Directeur Technique)

- [x] **`EcranCheval`** : ~67 chaînes traduites en allemand (identification/statistiques du cheval, partage Écurie Hype, récit/histoire, toasts). Repéré via vérification exhaustive du fichier reçu, absent du SUIVI fourni.
- [x] **`EcranPremium`** : 7 chaînes de statut d'abonnement traduites en allemand.
- [x] **`PV5_TXT`** : dictionnaire complet de la page Premium (53 clés) traduit et inséré comme nouvelle langue `de`.
- [x] **`EcranBibliothequeGalops`** : 15 chaînes traduites en allemand.
- [x] Vérification exhaustive : 797 fonctions + 298 const identiques, 81 hunks / 138 lignes supprimées / 138 ajoutées (équilibre parfait), toutes les modifications sont des ajouts purs. Syntaxe JS validée.

## 🟢 FAIT (session du 21/07/2026 (15) — Allemand EcranAssistantIA et EcranQuetes, Directeur Technique)

- [x] **`EcranAssistantIA`** (Hey Baby) : 16 chaînes traduites (accueils contextuels, wrapper `TXT()` étendu de 5 à 6 paramètres, toasts, épinglage de conseils, limite Cercle Crystal).
- [x] **`EcranQuetes`** : 9 chaînes traduites (titre, kicker niveau, stats quêtes terminées/en cours/XP restant, en-têtes de section).
- [x] Vérification exhaustive : 797 fonctions + 298 const identiques (14)→(15), diff confiné aux 2 écrans, 22 hunks, chaque hunk = ajout pur. Syntaxe JS validée.

## 🟢 FAIT (session du 21/07/2026 (14) — Allemand sur EcranArticles et EcranProfil, Directeur Technique)

- [x] **`EcranArticles`** (+ sous-composant `menuDeroulant`) : 28 appels `tr({...})` traduits en allemand.
- [x] **`EcranProfil`** : 7 appels `tr({...})` complétés en allemand (corrigé après vérification exhaustive : 7 réels, pas 8 comme annoncé initialement).
- [x] Diff exhaustif vérifié : rien perdu côté jeux Baby / Hype Pro / badges / cours. Syntaxe JS validée à chaque étape.
- [x] Repéré et documenté : le mélange d'encodage (`\u` littéral vs UTF-8 réel) peut varier au sein d'un même écran.

## 🟢 FAIT (session du 21/07/2026 (13) — Allemand sur les 3 derniers écrans principaux, Directeur Technique)

- [x] **`EcranCavalier`** : 9 appels `T()` traduits en allemand ; 2 traductions es/it/ja manquantes complétées au passage.
- [x] **`EcranEvenement`** : 23 appels `T()` traduits en allemand ; fonction `tempsRelatif` complétée avec une branche allemande dédiée.
- [x] **`EcranCommunaute`** : 46 appels `T()` traduits en allemand, + 2 objets `trh()`.
- [x] Les 3 fonctions locales `T()` de ces écrans mises à jour pour gérer l'allemand.

## 🟢 FAIT (session du 21/07/2026 (12) — Allemand approfondi, Directeur Technique)

- [x] **4 écrans complétés en allemand réel** : `EcranConnexionSpectral`, `EcranAlbumInvite`, `EcranMemoiresCavalier`, `TableauxSpectralHype`.

## 🟢 FAIT (session du 21/07/2026 (11) — Fusion Jeux Baby/Hype Pro × Allemand/Badges, Directeur Technique)

- [x] **Fusion exhaustive vérifiée fonction par fonction** entre la branche Jeux Baby (session 10) et la branche Directeur Technique (allemand 29 écrans + 11 quêtes, 100 badges de niveau) — aucune fonction perdue.
- [x] **Bug corrigé** : bandeau "Niveau X" de l'accueil, navigation vers l'écran Quêtes restaurée.
- [x] Table des 100 badges de niveau (`HYPE_NIVEAU_BADGES`) et fonction `hypeBadgeNiveau` réintégrées.
- [x] Les 11 quêtes découverte ont retrouvé l'allemand.

## 🟢 FAIT (session du 20/07/2026 (10) — Jeu Vrai/Faux + Hype Pro)

### Nouveau jeu Baby : "Vrai ou Faux avec Apy"
- [x] Composant `VraiFauxApyJeu` créé de zéro : image + affirmation, boutons Vrai/Faux, explication, score final, rejouer.
- [x] 14 cartes construites à partir des photos fournies par Blandine.
- [x] Ajouté au menu "Jeux du Galop" de la page Baby, après le Mémory.
- [x] 3 fichiers `hype-images-110.js` à `112.js` livrés (clés k503 à k516).

### Encart "Hype Pro" (professionnels/enseignants)
- [x] Encart visuel esprit "Cercle Crystal", 2 tarifs côte à côte (7,99 €/16,99 € avec IA).
- [x] Caché par défaut, conditionné à `profil.estPro`.
- [x] Système anti-abus simplifié puis basculé en auto-déblocage temporaire (~2 mois, décision Blandine).
- [x] Demande branchée à 3 endroits : `EcranPersonnalisation`, `EcranProfil`, `EcranMonCompte`.
- [x] Popups en cascade retirées (un seul `window.prompt`).
- [x] Email de contact corrigé → `feinn@live.fr` (temporaire).
- [x] Découverte documentée : `EcranParcours`/`EcranProfilSetup` = code mort.

### Bugs corrigés en session (10)
- [x] Plusieurs erreurs de parenthèses lors de la construction de l'encart Hype Pro — détectées et corrigées via `node --check` avant chaque livraison.
- [x] Bug de collision de variable (`nom_pren`/`nom`) dans "Mon compte" — corrigé.

---

## 💡 Idées notées (pas encore validées pour implémentation)

- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal) — distincte des Quêtes (⚡)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond)
- Page "Nos Ambassadeurs"
- Défis hebdomadaires (Quêtes) avec reset chaque lundi

---

## 📝 Historique

| Date | Résumé |
|------|--------|
| 17/07 | Recréation du fichier (nettoyage des doublons) |
| 18/07 | Grosse session nocturne : ~18 bugs corrigés sur la visite de profil, crash Galop 3, durcissement du cache PWA |
| 18/07 (2) | Volet images/cours : affiches multilingues, nouveau cours g1-c19, affiche "La sécurité avant tout". |
| 18/07 (3) | Compléments de cours Galop 1 (g1-c4, g1-c3) + 10 QCM chacun, badges NEW. |
| 18/07 (4) | Galop 2 traduit intégralement (12 cours). Traduction Galop 3 en cours (g3-c2 à g3-c4). Messagerie privée V1 codée. |
| 18/07 (5) | g1-c7 scindé en g1-c7 (robes) + g1-c20 (physiologie). Fusion vérifiée avec la branche traduction. |
| 18/07 (6) | Coachmarks (4 points) + Système de Quêtes/XP complet (écran dédié, 10 quêtes découverte, bandeau niveau). |
| 18/07 (7) | Messagerie rendue réellement fonctionnelle (2 bugs RLS corrigés). Refonte photo de couverture Cavalier (pas validée). |
| 19/07 (8) | Mémory du Poney construit de zéro (11 niveaux). Chemin Baby refondu en 3 paliers. Bug critique quiz corrigé. |
| 20/07 (9) | Traduction cours Baby restés en FR (baby-c8, baby-c9). 6 nouveaux cours Poney d'Argent (baby-c10 à c15), traduits dès la création. |
| 20/07 (10) | Nouveau jeu Baby "Vrai ou Faux avec Apy" (14 cartes). Encart "Hype Pro" (2 tarifs), auto-déblocage temporaire (~2 mois). Code mort onboarding documenté. |
| 20/07 — en parallèle | (Branche Directeur Technique, fusionnée en (11)) : allemand ajouté sur 29 écrans + 11 quêtes découverte ; 100 badges de niveau illustrés créés et intégrés. |
| 21/07 (11) | **Fusion** des deux branches ci-dessus, vérifiée exhaustivement fonction par fonction. Bug de navigation du bandeau Niveau corrigé au passage. |
| 21/07 (12) | **Fusion** d'un allemand plus approfondi sur 4 écrans (connexion, album invité, récit cavalier, tableaux spectraux). |
| 21/07 (13) | **Allemand ajouté sur les 3 derniers écrans principaux** (EcranCavalier, EcranEvenement, EcranCommunaute) — 78 appels + 2 objets `trh()`. Les 32 écrans principaux + 11 quêtes ont maintenant l'allemand. |
| 21/07 (14) | **Allemand ajouté sur EcranArticles et EcranProfil** — 35 appels traduits (28+7). |
| 21/07 (15) | **Allemand ajouté sur EcranAssistantIA et EcranQuetes** — 25 appels traduits (16+9). |
| 21/07 (16) | **Allemand ajouté sur EcranCheval (non documenté par erreur dans le SUIVI fourni), EcranPremium, PV5_TXT (53 clés), EcranBibliothequeGalops** — vérification exhaustive du fichier réel a révélé le travail non listé sur EcranCheval (~67 chaînes) en plus des 3 écrans annoncés (22 chaînes). Diff = 81 hunks, 138 lignes ajoutées, équilibre parfait, rien perdu. |
