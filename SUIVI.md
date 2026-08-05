# SUIVI HYPE

> Ce fichier circule entre les pages de travail. Chaque page qui arrive le lit, chaque page qui repart le met à jour avant de le refaire circuler. Objectif : que Blandine n'ait rien à retenir par cœur.

**Règle d'or : une seule page "codeuse" à la fois.** Les autres pages peuvent réfléchir, lister, préparer des maquettes — mais ne livrent pas de fichier index.html tant que ce n'est pas leur tour, pour éviter d'écraser le travail d'une autre page.

**Règle de numérotation : lire le numéro en tête de CE fichier avant d'en attribuer un.** La nouvelle session prend le numéro suivant, jamais un numéro déjà utilisé. C'est arrivé deux fois : en session 16, et le 28/07 où trois pages ont utilisé 22, 23 et 24 en parallèle — la section du mode « M'entraîner à tracer » a disparu du SUIVI alors que son code était bien dans l'index.

**Règle de reprise : ne jamais conclure qu'un travail n'est pas fait sur la seule lecture du SUIVI.** Le SUIVI peut avoir perdu une section (voir ci-dessus). Vérifier dans l'index réel : comptage exhaustif des noms de fonctions et de const, et recherche des marqueurs du travail concerné — en comptant TOUTES les occurrences, jamais en s'arrêtant aux 2 ou 3 premiers résultats.

**Règle de base de travail : partir du fichier que Blandine fournit au moment de la session**, jamais d'une copie gardée d'une session précédente. Elle fait tourner plusieurs pages en parallèle : son fichier contient souvent le travail d'une autre. On réapplique ses correctifs par-dessus SON fichier, marqueur par marqueur — jamais l'inverse.

**Version actuelle de l'index.html : 05/08/2026 (session 90) — Vidéo d'accueil verticale, Lamotte masqué, quête philosophie réparée — md5 `d744dac5f75a1299c5d616ce61ff7203`, 10 499 969 octets. Part du fichier fourni par Blandine `70a0c0d1` (9 791 253 o).**

## 🎬 SESSION 90 (05/08) — VIDÉO D'ACCUEIL, LAMOTTE, QUÊTE PHILOSOPHIE

**Page codeuse unique sur l'index.** Part du fichier fourni par Blandine `70a0c0d1` (9 791 253 o) → sortie **`d744dac5f75a1299c5d616ce61ff7203`** (10 499 969 o).
Livrés : `index.html`, `hype-accueil-video.mp4` (nouveau), `hype-accueil-poster.jpg` (nouveau).

### 🔴 ALERTE — NE PAS DÉPLOYER LE `lingo.html` DE CETTE SESSION
Blandine a fourni en cours de session un `lingo.html` de **77 495 octets**. La session 89 a produit un fichier de **186 511 octets** (globe, 18 villes). Le fichier fourni était donc **une branche bien antérieure**, et le `lingo.html` livré ici (md5 `b89224276434e9746d36a4ee2d11c384`, renommage « Hype Lingua ») **régresserait massivement** : perte du globe, des 8 villes ajoutées et des correctifs du bug bloquant.
⚠️ **Ce fichier est à jeter.** Le renommage éventuel du module doit être réappliqué sur la version 186 Ko, et il ne représente que 2 lignes (`<title>` et `<p class="sur">`).

### ✅ La vidéo de la bannière d'accueil
Blandine a fourni un `.mov` **HEVC 480×854, 5,1 s, 1,89 Mo**. Deux problèmes : le HEVC n'est lu **que par Safari**, et le `.mov` n'est pas un format web.
**Transcodé en H.264/MP4, yuv420p, CRF 24, `+faststart`, piste audio supprimée → 324 Ko** (÷5,8). Poster JPEG extrait de la première frame pour éviter le flash noir.
- La source du `<video>` du `<header className="hero">` passe à `hype-accueil-video.mp4`.
- ⚠️ **`hype-anim-cheval.mp4` est conservé et toujours utilisé** par la carte Grand Prix (ligne ~31187). C'est pourquoi le nouveau fichier porte un nom distinct au lieu d'écraser l'ancien : une vidéo verticale casserait cette carte. **3 occurrences de `hype-anim-cheval.mp4` doivent rester dans l'index.**
- **Hauteur plafonnée à 66vh** (demande : « max les 2/3 de l'écran »), avec `width: auto`, `maxWidth: 100%`, `margin: 0 auto`. Les deux contraintes s'appliquent, le format natif est conservé : vidéo **entière, dézoomée, centrée**, aucun rognage, aucune bande noire dans l'image. Sans ce plafond, un 9:16 en `width:100%` donnait ~690 px de haut sur un iPhone de 390 px.

### ✅ Lamotte retiré de l'accueil
`AFFICHER_ACTU_LAMOTTE = false`, nouvelle constante. **Rien n'est supprimé** : la carte est intacte dans le fichier, repasser à `true` la fait revenir.
⚠️ **Le titre de section « L'actualité » est masqué avec elle** : la section ne contenait QUE cette carte, l'intitulé serait resté seul au-dessus de rien.

### ✅ Quête « Écris la philosophie de ton écurie » — diagnostic et correctif
Blandine signalait une quête **qui redemandait une chose déjà faite** et **ne se mettait pas à jour**.
**Cause trouvée dans `TableauxSpectralHype`** : la sauvegarde appelle bien `majProfil({ecurie_voix: …})`, mais ne mettait à jour que son **état local** (`setProf`). Le `profil` du contexte applicatif restait périmé, or la condition de la quête est `fait: ctx.profil.ecurie_voix`. La quête restait donc affichée indéfiniment.
**Second problème : l'échec était totalement muet** — `.catch(function () { })` vide. Si la colonne n'existait pas en base, rien ne le signalait.
**Correctif appliqué sur les deux champs (`champVoix` et `champHistoire`)** :
- rafraîchissement de `ctx.setProfil` après enregistrement réussi → la quête disparaît immédiatement, sans rechargement ;
- `console.warn` avec l'erreur au lieu du catch vide.
**SQL passé par Blandine pendant la session** (idempotent) : `alter table profiles add column if not exists ecurie_voix text;` et `ecurie_histoire text;`. ⚠️ Avec `if not exists`, le « Success » ne dit **pas** si les colonnes manquaient. Si elles manquaient, le texte précédent n'a jamais été enregistré et doit être réécrit une fois.

### ✅ Quêtes en double sur l'accueil — déjà corrigé, à ne pas refaire
Blandine voyait la même quête en haut (`BandeauSuiteHype`, `liste[0]`) et en bas (`BlocProchainesQuetes`). **Le fichier fourni contenait déjà `slice(1, 4)`** : le correctif avait été appliqué par une session antérieure. Le doublon venait de la **version déployée**, pas du code. Ce déploiement le règle.

### 📌 Constaté dans l'index, non modifié
L'encart **« Hype Linguae »** (240 px, fond `lingo-accueil.webp`) et le bouton **« Le Sprint · 60 secondes »** vers `lingo.html#sprint` sont **déjà en place**, datés du 04/08.
⚠️ **`lingo.html#sprint` ne mène nulle part** dans la version fournie : le mot « sprint » y apparaît **0 fois**. À vérifier contre la version 186 Ko.
⚠️ **`lingo-accueil.webp`** est appelé par l'encart — vérifier sa présence au dépôt, sinon fond noir uni.
⚠️ **Nom du module non tranché.** Blandine a écarté « Hype Lingua » (« ça me choque »), hésité sur « Linguae ». Décision de séance : **on garde « Linguae » tel qu'il est dans l'index**, à revoir plus tard. Pistes évoquées et non retenues : Le Carnet, La Traversée, Koinē, Passus, Iter.

### ✅ Vérifications de livraison
907 fonctions top-level identiques dans les deux sens · 390 `const` inchangés · **un seul `var` de plus** (`AFFICHER_ACTU_LAMOTTE`) · `allerVersGalop` = **3 occurrences** · **15 blocs `<script>` inline validés** par `node --check` · contrôles ciblés sur chaque marqueur inséré.

### 🔴 Laissé ouvert, avec diagnostic
- **Compression photo — le chantier le plus rentable qui reste.** Cause racine de la lenteur à l'ajout de photo, des crashs mémoire iOS **et** désormais d'un coût réel : Blandine est passée en **Supabase Pro** (8 Go base, 100 Go fichiers, 250 Go egress, puis 0,09 $/Go — 0,03 $/Go si mis en cache). Une photo de 4 Mo servie 1 000 fois = 4 Go. Cible : redimensionner à ~1200 px, JPEG 0,8, avec gestion de l'orientation EXIF. **La surveillance de quota du 14 août n'a plus d'objet.**
- **Décalage horizontal après la visionneuse photo.** Toute la page part vers la gauche à la fermeture (titre débordant, onglets coupés). Hypothèse : `scrollLeft` non remis à zéro — iOS Safari le conserve, contrairement aux navigateurs de bureau. **Test à faire par Blandine avant tout code** : sur l'écran cassé, glisser vers la droite ; si tout se remet en place, l'hypothèse est confirmée et le correctif tient en deux lignes à la fermeture.
- **Vidéos de Linguae en format panoramique.** `ajusterCadrage()` met `object-fit: contain` dès qu'une vidéo est plus large que haute → bande horizontale avec du noir. Rien à corriger dans le code : il suffit que les fichiers soient **verticaux**. Priorité : `ouverture.mp4`, puis `depart.mp4` (un seul fichier répare 10 écrans), puis les arrivées déjà produites. Format cible **720×1280, MP4 H.264, muette, sans texte**, 3 s pour les arrivées.
- **Chapitre 10 de Linguae (Les dialogues, Édimbourg)** — pas écrit. Périmètre arbitré : **situations pratiques** (réserver une reprise, se présenter, dire son niveau, demander un cheval calme, payer, remercier), pas de la révision. Structure arbitrée : garder `concepts` + `phrases`, ajouter deux champs **optionnels** `scene` et `role` — additif, aucun changement obligatoire du moteur. Registre arbitré : **vouvoiement** et forme polie japonaise, et on en fait du contenu (en japonais le registre décide de la réponse obtenue). Reste **Premium**, le freemium n'est pas rouvert.
- **Hey Baby depuis Linguae** — idée validée par Blandine : inviter à poser ses questions dans sa langue. Trois paramètres à transmettre : **langue d'interface** (elle donne le pays sans rien détecter), **langue cible du voyage**, **chapitre en cours**. Règle : répondre **dans la langue de la question**, pas celle de l'interface, et toujours donner le terme dans la langue cible. Blocage : `HYPE_LINGO_HOST` n'existe pas dans le code. Option simple : appeler directement `assistant.js` sans toucher à `index.html`.

## 🌍 SESSION 89 (05/08) — LE GLOBE, LES 18 VILLES, ET UN BUG BLOQUANT DÉCOUVERT

**Page codeuse unique, Blandine seule sur le projet, feu vert complet.** Part du `lingo.html` MD5 `2642d726` (171 235 o) → sortie 186 511 o.
Livrés : `lingo.html`, `lingo-preview-02.html`, **`lingo-globe.html`** (nouveau), **`hype-lingo-lex-poney.js`** (nouveau).

### 🔴 BUG BLOQUANT PRÉEXISTANT — le moteur de leçon ne tournait PAS
Découvert au premier rendu Playwright du fichier reçu, **confirmé sur la version d'origine non modifiée** : `lingo.html` levait une `TypeError` pendant son initialisation et **le script s'arrêtait à la ligne 1302**. Tout ce qui est déclaré après restait `undefined` : `CHAPITRE_DE`, `TXT`, `MAITRISE`, `UI`, `VOIX`, `COLL_NOM`. Les fonctions existaient (hissage) mais le moteur de vocabulaire ne pouvait rien faire.

**Cause :** le bloc qui construit le carnet appelle `T()` puis `langueUI()`, or `UI` et `LANGUES_UI` sont déclarées **bien plus bas dans le même script** — `var` est hissé, pas sa valeur. Introduit avec le travail des six langues (session 86).
**Correction :** deux gardes, une dans `T()`, une dans `langueUI()`. On retombe sur vide / français au lieu de planter ; les éléments portent `data-t`, donc `appliquerLangue()` les remplit correctement juste après.
⚠️ **C'est la troisième fois que ce motif frappe** (déjà `etatChapitre` en session 85). **Ne jamais appeler une fonction de traduction depuis un bloc d'initialisation situé avant la déclaration des tables.**

### ✅ Le globe remplace le chemin
Nouveau fichier **`lingo-globe.html`**, 40 Ko, chargé en iframe depuis `lingo.html` — même motif que `GLOBE_HTML_HYPE` dans l'app. **Aucune bibliothèque, aucun WebGL, aucun réseau** : projection orthographique sur canvas 2D. Le nuage de terres `LAND` (2215 points, grille 2,5°) est **repris du globe de l'app**, pour que les deux montrent la même Terre.
- Une étape faite porte **une étoile d'or** et une ligne de grand cercle depuis le départ : la constellation perdue avec le chemin renaît là.
- **Vol d'approche** : le globe s'ouvre sur la Terre entière puis se rapproche seul sur l'Europe en 1,1 s (arbitrage : les deux cadrages au lieu d'en choisir un). Toute action l'interrompt.
- Glisser pour tourner, pincer pour zoomer, toucher une ville pour sa fiche, « Partir » renvoie la destination au parent.
- ⚠️ **Anti-collision des étiquettes** : à 18 villes dans 600 km, tout afficher revient à ne rien lire. Seules les faites, les ouvertes et celle qu'on touche s'affichent, et une étiquette qui en chevauche une autre s'efface.
- ⚠️ **Moiré polaire corrigé** : la grille régulière en degrés forme des arcs près des pôles ; la maille est éclaircie selon la latitude et coupée au-delà de 78°.
- **Départ = Paris par défaut** (décision de Blandine). `departDuJoueur()` lira `HYPE_LINGO_HOST.ecurie()` **quand le pont l'exposera — il ne l'expose pas encore.**

### ✅ Les 18 villes sont branchées et jouables
`ETAPES` passe de 10 à 18 : + Saumur, Lamotte, Jerez, Séville, Vejer, Oliva, Warendorf, Aix-la-Chapelle. Nations (France, Espagne, Allemagne) et heures traduites dans les 6 langues, `ETAPES_I18N` complété pour les 8 (chapitre, nom, souvenir).
**Vérifié en ouvrant les 18 leçons une par une dans un vrai navigateur : 18/18 jouables, 0 erreur.** 20 à 30 mots chacune.
✅ **Tous les `10` en dur du chemin remplacés** par `ETAPES.length` (géométrie, jalons, points, compteur). Le libellé « Chapitre n sur 10 » devient `{t}` et est traduit.

### ✅ Nouveau chapitre `poney` (Lamotte)
`hype-lingo-lex-poney.js` : 10 concepts + 3 phrases. **6 rappels** partageant le `ref` d'entrées de `cheval.js` — voulu, la maîtrise est par `ref`. **4 entrées neuves** dans les 6 langues (la toise, le poney-club, la catégorie de taille, le shetland), **à faire relire par un natif**, `das Stockmaß` et `測尺` en premier.
⚠️ La `def` de « catégorie de taille » précise que **les lettres A à E sont une convention FFE française** qui ne veut rien dire à l'étranger.

### ✅ Cinq collections n'avaient aucun nom
`corps`, `etat`, `cheval-urg`, `jour-j`, `races` existaient dans les lexiques depuis le 4 août mais n'étaient pas dans `COLL_NOM` : leurs leçons s'affichaient **« Leçon 2 »**. Repéré en ouvrant les 18 villes une par une. Nommées et traduites dans les 6 langues.

### ⚠️ Trou de contenu repéré
**Saumur n'a AUCUNE phrase** (0), parce que les leçons 2 et 3 du chapitre dressage n'en contiennent pas. Sa leçon n'aura donc pas d'exercice de phrase. Vejer n'en a que 2. À combler côté contenu.

### Contrôles passés
Syntaxe JS validée à chaque étape · **diff exhaustif dans les deux sens : aucune fonction perdue, aucune `var` perdue** (ajouts : `chapVirtuel`, `recopier`, `ouvrirGlobe`, `fermerGlobe`, `etatPourGlobe`, `departDuJoueur`, `ETAPE_SRC`, `ACCUEIL_VILLE`, `DEPART_DEFAUT`) · rendu Playwright réel : 0 erreur console, globe ouvert, pont vérifié, un exercice lancé jusqu'à l'affichage.

### ✅ Ajouté après le premier test de Blandine
**Le bouton « Continuer » de la première page était bloqué** — Blandine l'a signalé, et c'était le même bug bloquant : le gestionnaire de `#inSuite` était dans la partie morte du script. Vérifié par comparaison avant/après : sur la version d'origine le bouton **n'était même pas visible**, sur la corrigée il passe.
**Titre sombre sur ciel clair** : classe `.pface.clair` + table `TITRE_SOMBRE` (8 villes : warendorf, jerez, golega, oliva, lamotte, saumur, aachen, vejer), appliquée par `appliquerTeinteTitre(ref)` au moment où la carte est posée. Les images restent intactes. Séville (tiers haut à 78) garde le titre crème.

### ✅ Les 8 villes neuves ont enfin leurs textes dans le code
Nouveau fichier **`hype-lingo-villes-monde.js`** (50 Ko). Il **complète** `hype-lingo-villes.js` au lieu de le remplacer : chargé après lui, il ajoute ses 8 clés **une par une, sans jamais écraser** une ville existante. Les 10 britanniques et irlandaises restent dans leur fichier, intactes.
**Généré automatiquement depuis `hype-linguae-villes-nouvelles.md`** plutôt que retapé — zéro perte à la recopie. Les 8 villes ont lettre + 3 volets **dans les six langues**.
⚠️ **Les volets deviennent traduisibles** : les 10 premières villes portent des chaînes, les 8 nouvelles un objet par langue. `tx()` accepte les deux, donc **rien à migrer** dans le fichier existant. Deux lignes changées dans l'affichage des dépliants.
✅ Vérifié en rendu réel : la **lettre suit la langue étudiée** (elle est écrite dans la langue qu'on apprend) et les **volets suivent la langue d'interface** — testé fr/en/de/ja sur Saumur et Warendorf, correct dans les quatre.

### ⚠️ Reste à faire Les 8 neuves n'ont donc **ni lettre au verso de la carte postale, ni volets « Prolonge ton voyage »** — les textes existent, traduits en 6 langues, dans `hype-linguae-villes-nouvelles.md`, mais **ne sont pas dans le fichier**. Le fichier n'a jamais été fourni à cette page : **à envoyer pour que je l'injecte.**
- **Le chemin côtier est encore là**, fonctionnel mais condamné. Le bouton « Le globe » est la nouvelle entrée. Le retirer est un chantier à part.
- **Le choix libre en fin de chapitre** (3 sorties : rester au pays / suivre le sujet / le globe) : préparé dans `hype-linguae-repartition-v2.md`, pas codé.
- **Titre clair ou sombre selon la ville** : 15 cartes sur 18 ont un tiers haut au-dessus de 100 de luminance. Le titre sombre devient la règle, pas l'exception. Pas codé.
- Les récits courts des 8 villes (pris ailleurs par Blandine) et la relecture native des 220 mots.

---

## 🗺️ SESSION 87 (05/08) — LINGUAE : RÉPARTITION DU VOCABULAIRE + HUIT VILLES ÉCRITES

**Aucun code. `index.html` et `lingo.html` non modifiés.** Étape 3 de `hype-linguae-structure-v2.md`.
Documents livrés : **`hype-linguae-repartition-v2.md`** et **`hype-linguae-villes-nouvelles.md`**.

⚠️ **Numérotation** : le numéro 86 était déjà pris par la session « les six langues » du même jour. Numéro suivant pris, conformément à la règle en tête de fichier.

### La découverte qui simplifie tout
Les chapitres ne sont pas des blocs de 42 mots à démonter à la main : **chaque chapitre est déjà découpé en 4 collections d'environ 10 concepts** (champ `coll`). Neuf chapitres = **36 collections, 378 mots**. Une destination = **deux collections = vingt mots** → **dix-huit villes, aucune collection orpheline**. Vérifié par calcul : 36 placées, 36 uniques, 0 manquante, 0 doublon.

⚠️ **Le chiffre de 336 était faux à deux titres.** Il ne comptait que 8 chapitres (le pansage était cru absent) et seulement les *concepts* : chaque chapitre porte en plus 7-8 *phrases* sans `coll`, qui suivent leur leçon d'origine et voyagent avec elle.

⚠️ **CORRECTION D'UNE ERREUR DE MA PART** : j'avais conclu que `hype-lingo-lex-pansage.js` n'existait pas dans le dépôt, et donc que **Lambourn se retirait tout seul**. Faux — le fichier existe (42 concepts, 13 marqueurs `// ??`). **Lambourn est réintégré** avec son pansage entier, et son retrait redevient une décision ouverte, pas une évidence.

### Ce qui est arrêté
**18 villes**, dont 8 neuves : Saumur, Jerez, Warendorf (prioritaires), + Séville, Oliva Nova, Vejer, Aix-la-Chapelle, Lamotte-Beuvron. **L'Espagne passe à quatre villes** (décision de Blandine).

⚠️ **Windsor reprend la notation du dressage** (`rectangle` + `notation`) — mon premier découpage lui avait pris le dressage pour le donner à Saumur, ce que Blandine a relevé. Windsor = le dressage **qu'on juge** (protocole, coefficient, pourcentage) ; Saumur = celui **qu'on enseigne** (`mouvements` + `qualites`). Plus aucune collection en réserve.

⚠️ **Édimbourg est sauvé sans écrire le chapitre dialogues** : `urgences/mots` + `cours/deroule` — les deux seules collections du module qui sont de la parole vive et non des objets.

**Décision de Blandine : toutes les villes ont une leçon**, quitte à ce que le rapport au lieu soit plus lointain. Le vocabulaire de compétition (8 collections entre obstacle et concours) est **détourné sur plusieurs spots** : Hickstead, Badminton, Oliva Nova, Aix-la-Chapelle. L'option « villes-étapes sans leçon » est écartée.

### Trois niveaux de difficulté (idée de Blandine)
**1 nommer** · **2 situer** · **3 dire** (phrases entières et notions abstraites : Saumur, Édimbourg). Le niveau est porté par **la ville**, pas par le mot, s'affiche sur le globe et **ne verrouille rien**. La matière existe déjà : les ~70 phrases sans `coll` et le champ `dit` des chapitres cours et urgences.

### Les fils de sortie
Trois sorties en fin de chapitre : **rester au pays · suivre le sujet · choisir sur le globe**. Nommées par ce qu'elles promettent, jamais par leur mécanique. Le fil thématique existe une fois par paire de villes puis s'éteint — personne ne peut faire le tour du monde en ne voyant que du dressage.
⚠️ **Deux règles à tenir** : le fil « même pays » n'existe pas partout (Aberystwyth et Édimbourg sont seules) → le bouton **disparaît** et une destination libre prend sa place, jamais de bouton mort. Et **au moins une proposition doit être accessible** → filtrer sur ce qui est ouvert avant de proposer, sinon le joueur se prend un mur juste après le chapitre offert.

### Trois conséquences techniques à trancher AVANT de coder
- **Le bloc `races` doit changer d'index** : rangé par *voyage* (`races[voyageCourant]`), héritage de « une langue = un pays ». En v2 il doit être indexé **par ville**.
- **Le champ `chapitre` change de sens** : il désignera l'étape, plus le thème. Recenser tout ce qui le lit, `lingo.html` compris.
- **Le niveau est une donnée nouvelle** portée par la ville.

### Textes écrits ce jour
**Les huit villes neuves ont leur lettre + 3 volets, écrits en français ET traduits dans les six langues** (fr/en/es/it/de/ja), gabarit identique aux dix villes existantes. **Cinq marqueurs `// ??`** posés sur les faits à vérifier (datation du Cadre Noir, intitulé du spectacle de Jerez, rôle exact de la Deutsche Reitschule, période de la Feria, durée du parcours d'Aix). Un chiffre inventé a été retiré au passage (capacité du stade d'Aix-la-Chapelle) : **on n'écrit pas un nombre qu'on n'a pas vérifié.**
➡️ Ces textes vont dans `hype-lingo-villes.js`, précisément le fichier que la session 86 n'avait pas pu traduire.
⚠️ **Les récits courts (`RECITS` de `lingo.html`) ne sont PAS écrits ici** — Blandine les prend en charge dans une autre conversation. Ne pas les produire depuis cette page.
⚠️ **Décision de Blandine : aucune ville n'est retirée**, Lambourn comprise. Les cartes postales et vidéos représentent des heures de travail déjà faites. La mention « Lambourn candidate au retrait » de `hype-linguae-structure-v2.md` est **caduque**.

### ✅ Décision de fin de session : les RAPPELS sont autorisés
Blandine : « on s'en fout, on peut avoir des rappels en plus d'une ville à l'autre ». **Un mot peut donc appartenir à deux villes.** Ce n'est pas un doublon mais de la révision espacée gratuite — la maîtrise est stockée **par concept**, pas par ville, donc un mot déjà croisé ailleurs arrive à moitié acquis.
⚠️ **CONSÉQUENCE DE STRUCTURE, à faire AVANT la migration** : le champ `chapitre` ne peut plus porter une valeur unique par concept, il devient **une liste d'étapes**. C'est le seul vrai changement que cette décision entraîne, mais il conditionne tout le reste.

### ✅ Nouvelle collection `poney` (Lamotte-Beuvron)
Remarque de Blandine, juste : Lamotte c'est d'abord des milliers de poneys, pas le tracé de manège. **`cours/figures` remonte à Aberystwyth** (qui devient la seule étape à trois collections, 30 mots — les trois disent « monter ») et Lamotte reçoit **`poney` + `urgences/cavalier`**.
La collection = **6 rappels** (le poney, la taille au garrot, le poulain, le cheval d'école, le caractère, calme — déjà écrits et traduits) + **4 concepts neufs traduits dans les 6 langues** : la toise (`das Stockmaß` / `測尺`), le poney-club, la catégorie de taille, le poney shetland.
⚠️ **Piège de contenu documenté** : les catégories poney **A à E sont une convention FFE française**, inexistante en GB, en Allemagne et au Japon, qui classent par taille au garrot sans lettres. Le concept est écrit « catégorie de taille », jamais les lettres — sinon on enseigne une notion qui ne veut rien dire dans le pays où le cavalier s'en servira. La `def` doit le préciser.
⚠️ **Les 4 nouvelles entrées vont au fichier des doutes** : aucune n'a été relue par un natif.
⚠️ **NON APPLIQUÉ dans les fichiers** — voir ci-dessous.

### 🎬 Vidéos d'arrivée converties (Saumur, Jerez)
Toutes les sources fournies sont en **HEVC dans un `.mov` avec piste audio** — le cas du 2 août : Safari les lit, Chrome et Firefox souvent pas. Traitement appliqué : H.264 profil Main + faststart, **audio retiré** (sans ça iOS refuse la lecture auto), recadrage `crop=456:810:12:42` qui enlève le filigrane « Ai » du haut-gauche **et** deux bandes noires de 2 px sur les bords. Sortie **456×810** (9:16 exact), ~500 Ko chacune.
- **`arrivee-saumur.mp4`** — 5,0 s. Panneau SAUMUR présent et entier (il monte de 4,3 s à 4,7 s puis tient jusqu'à la fin).
- **`arrivee-jerez.mp4`** — 5,1 s, la vue de la ville dans la brume au-dessus des oliviers. **Choisie par Blandine.** Cohérente avec la règle des arrivées : la ville se découvre depuis le paysage.
- **`arrivee-jerez-variante-portrait.mp4`** — le portrait du gris à contre-jour, écartée comme arrivée (gros plan, ne montre pas le lieu) mais **gardée pour la carte postale** : elle colle mot pour mot à la lettre de la ville.
⚠️ **Le source ne fait que 480 px de large** alors que les autres arrivées sont annoncées à 720. **Pas agrandi volontairement** — un upscale n'ajoute aucun détail, juste du flou et du poids. Réexporter en 720 ou 1080 si possible.
⚠️ **Erreur de ma part corrigée en séance** : j'avais annoncé à Blandine que le panneau était coupé à mi-transition et que ma livraison ne le contenait pas. **Faux dans les deux cas** — mes numéros d'image ne correspondaient pas au montage réel, et la mesure a confirmé que le panneau était bien là, entier. Leçon : vérifier le fichier LIVRÉ, pas le fichier source.

### ⛔ Ce que cette page n'a PAS appliqué, et pourquoi
Les fichiers `hype-lingo-lex-*.js` **n'ont pas été modifiés**. La session 86 les attend pour poser ses huit corrections de vocabulaire, et la collection `poney` doit y entrer aussi. **Une seule page codeuse** : elle appliquera les deux d'un même geste. Deux pages qui éditent les mêmes fichiers en parallèle, c'est l'incident du 3 août.

### Sur le rapport de corrections du vocabulaire
⚠️ **Ne pas l'appliquer en bloc.** Plusieurs entrées sont inexploitables : le chandelier espagnol se contredit dans sa propre ligne, « la réception » y est validée en français, le talus italien est traduit par « il talus ». Il contredit aussi la première relecture sur l'amortisseur espagnol. **Aucun cavalier natif n'a encore relu quoi que ce soit** — cinq revues, cinq IA. Trou le plus net : **36 mots allemands vus par une seule source**.

---

## 🌐 SESSION 86 (05/08) — HYPE LINGUAE : LES SIX LANGUES

**Fichier touché : `lingo.html` uniquement.** `index.html` n'a pas été modifié — inutile de le repousser.

### Ce qui a été fait

**Tout le contenu français de `lingo.html` est passé en six langues** (FR/EN/ES/IT/DE/JA) :

- **`RECITS`** — les neuf villes qui n'avaient que le français. Newmarket était déjà fait, il n'a pas été touché. Trente récits ajoutés, trois blocs chacun.
- **`POURQUOI`** — les dix lignes du carnet de route.
- **`COLL_NOM`** — les trente-deux familles de mots.
- **`ACCUEIL_CHAP`** — il manquait ES/IT/DE/JA sur les dix chapitres.
- **`DESTINATIONS`** — les six voyages, nom et description.
- **Les étapes** — titres de chapitres, nations, heures, souvenirs, et les noms de villes en japonais.
- **L'interface** — soixante-quinze clés : présentation, destinations, carnet, traversée, arrivée, leçon, écran de départ.

**`langueUI()` accepte désormais les six langues.** Elle ne renvoyait que `fr` ou `en` : aucune traduction ne se serait affichée sans ça.

**Trois textes corrigés au passage :**
- Le récit d'Édimbourg disait « cinq nations » alors que l'itinéraire en compte quatre — Angleterre, Irlande, pays de Galles, Écosse. Corrigé dans les six langues, français compris.
- « trois épreuves » (Badminton) devient *phases* en anglais et *Prüfungen* en allemand : en concours complet ce sont trois phases d'une même épreuve.
- « une piste » (Windsor) devient *il rettangolo* en italien et *ein Viereck* en allemand, les noms propres du rectangle de dressage dans ces langues.

### Vérifications

`node --check` sur le bloc script après chaque patch. Test fonctionnel des tables : les six langues parcourues sur les dix étapes × cinq champs, plus récits, pourquoi, familles, accueils, destinations et clés d'interface. **Aucun trou.** Les récits ont bien trois blocs dans les six langues.

### Ce qui n'a PAS été fait, et pourquoi

⚠️ **Les lettres manuscrites des villes** vivent dans `hype-lingo-villes.js`, qui n'était pas fourni. Elles restent en français.
Un commentaire du code prévient : *« on ne traduit qu'une fois les dix villes validées, sinon on traduit des textes qu'on va réécrire »*. À faire quand les villes seront figées.

⚠️ **Les huit corrections du lexique** (`Lammfell` → `Sattelpad`, `der` → `das Vorderzeug`, `神経質` → `気性難`, `推進` → `推進力`, `el cordón` → `la lista`, `il cuscinetto` → `ammortizzatore`…) vivent dans `hype-lingo-lex-*.js`, non fournis. Elles attendent.

⚠️ **Le champ `p` (lecture) des entrées japonaises** — même fichier, même attente. C'est la correction la plus importante du lexique : sans elle, la synthèse vocale `ja-JP` prononce 前橋 *Maebashi* (une ville) au lieu de *zenkyō*, et 長靴 *nagagutsu* (bottes en caoutchouc) au lieu de *chōka* (bottes de monte).

### Décisions qui attendent Blandine

1. **Chapitre 5** : le titre dit « En selle », la clé et le mot d'accueil parlent de la reprise. Soit le titre devient « La reprise », soit le mot d'accueil s'élargit. Traduit « En selle » tel quel en attendant.
2. **Entrées françaises ambiguës** : « l'amortisseur » et « les guêtres » ne disent pas la matière ni le type, alors que l'allemand, l'espagnol, l'italien et le japonais les nomment. Tant que l'entrée source est floue, aucune des six langues n'est décidable. C'est le vrai correctif de fond du lexique.
3. **Pansage en italien** : *La pulizia* (comprise tout de suite) ou *Il governo* (le terme technique) ? J'ai mis *La pulizia*.

### État des relectures du lexique

Cinq revues d'IA sur les 220 mots incertains, fusionnées dans `hype-linguae-tableau-de-bord.md` : **113 mots confirmés par au moins deux sources, 38 vus une seule fois** (dont 36 en allemand, chapitres 7 à 9 — la revue allemande s'était arrêtée en route), 48 à préciser, 8 à corriger, 8 verdicts inexploitables. Aucun cavalier natif n'a encore relu quoi que ce soit. Les cinq revues le disent elles-mêmes, chacune à sa manière.

À ne pas refaire : relancer une IA sur les 113 lignes déjà confirmées. Les cinq revues ont produit huit corrections utilisables — et huit erreurs. Le rendement s'est inversé.

### Correctifs de fin de session

**`NOM_MODULE`** — le nom affiché du module était écrit en dur à quinze endroits (titre de l'onglet, deux écrans statiques, deux écrans construits en JS, les six langues de `voyage1`, le message de partage WhatsApp, le titre de `navigator.share`). Tout passe désormais par une constante unique en tête de la table d'interface, propagée par `{nom}` dans `T()`. Le jour où le nom change, c'est **une ligne**.
⚠️ Le **nom de fichier** reste `lingo.html`. Le renommer casserait les liens déjà poussés et le raccourci depuis l'app.

**La synthèse vocale japonaise lit enfin la bonne chose.** `dire()` passait le mot écrit à `SpeechSynthesisUtterance` : la voix `ja-JP` prononçait 前橋 *Maebashi* (une ville) au lieu de *zenkyō* (le pommeau), et 長靴 *nagagutsu* (botte en caoutchouc) au lieu de *chōka* (botte de monte). `dire()` consulte maintenant une table de lectures construite une seule fois depuis le lexique chargé, et donne le champ `p` à la synthèse. Aucun fichier de lexique n'a eu besoin d'être modifié pour ça.

**Deux corrections dans `hype-lingo-lex-cheval.js`** — les seules des huit qui étaient dans un fichier fourni :
- `liste` · espagnol : `el cordón` → **`la lista`** (`el cordón` passe en variante). La phrase d'exemple suit : *« Es una yegua torda con una gran lista. »*
- `chaud` · japonais : `神経質` → **`気性難`** (*kishōnan*), `神経質` conservé en variante avec sa vraie valeur (« nerveux »). La phrase d'exemple suit. Les trois revues étaient d'accord sur ce point.
Les deux marqueurs `// ??` correspondants ont été retirés. Il en reste **dix** dans ce fichier.

**❗ Une affirmation fausse de ma part, corrigée.** J'ai écrit plus haut dans cette session que « le champ `p` manque aux entrées japonaises ». **C'est faux.** Les deux fichiers fournis ont 92 entrées japonaises sur 92 avec leur lecture. J'avais conclu de l'absence de `p` dans le tableau de bord — qui listait des mots *douteux*, pas la structure du lexique — à son absence dans les fichiers, que je n'avais pas. Le problème réel était ailleurs et il est corrigé ci-dessus : c'est `dire()` qui n'utilisait pas `p`.

**Reste à faire côté fichiers non fournis :**
- Six corrections sur huit vivent dans `hype-lingo-lex-materiel.js` et `hype-lingo-lex-dressage.js` : `das Lammfell` → `das Sattelpad`, `der` → `das Vorderzeug`, `der Ansager` → `der Kommandant`, `推進` → `推進力`, `il cuscinetto` → `ammortizzatore`, et la lecture `ちょうか` à vérifier sur 長靴.
- `hype-lingo-villes.js` : le dernier volet d'Édimbourg dit encore *« Dix villes, cinq nations, une langue »* — il y en a **quatre**. Un seul mot à changer, cherchable sur « cinq nations ». Le fichier n'a pas pu être livré corrigé : il n'est arrivé qu'en texte dans la conversation, et le réécrire de mémoire aurait fait courir un risque de coquille sur dix villes.

### ⚠️ Impact de la structure v2 sur ce travail

La session 85 bis a été lue **après** coup : les traductions livrées ici ont été faites sur la structure v1. Ce qui reste valable et ce qui ne l'est plus :

**Toujours valable — les villes restent :**
- Les 9 récits en six langues, les 10 lignes `POURQUOI`, les noms de villes, nations, heures et souvenirs.
- Toute l'interface de leçon, le Sprint, le Duel, `NOM_MODULE`, le correctif `dire()`, les corrections du lexique.

**À refaire quand la v2 sera codée :**
- **`DESTINATIONS`** — l'écran des six voyages (Les Îles / La Péninsule / La Botte / Le Rhin / L'Archipel / Le Lexique) servait à choisir un **pays**. En v2 il sert à choisir une **langue** : même écran, autre sens. Les six noms poétiques et leurs descriptions restent utilisables, mais les descriptions parlent de pays (« Andalousie, Jerez, Lisbonne ») alors qu'elles devront parler de langue — à réécrire, pas à jeter.

⚠️ **Correction d'une erreur de ma part (Blandine, 05/08) : LES PAYS SONT CONSERVÉS.** J'avais écrit qu'ils disparaîtraient. Non : à la fin de chaque ville, le cavalier choisit s'il **continue dans le même pays** ou s'il **change de pays**. Le pays reste donc une notion vivante du jeu — il cesse seulement d'enfermer le joueur. Conséquences :
  - `I18N_NAT` reste utile et devra **grandir** : il n'a que Angleterre, Irlande, Pays de Galles, Écosse. Saumur, Jerez et Warendorf demandent France, Espagne et Allemagne dans les six langues.
  - L'écran de fin de chapitre aura besoin de nouvelles clés d'interface — « Continuer en {pays} », « Changer de pays », « Retourner au globe » — à écrire en six langues quand il sera codé.
  - Le champ `nat` de chaque étape garde tout son sens ; ne pas le retirer.
- **Le carnet de route** — « Angleterre · Irlande · Pays de Galles · Écosse », « — anglais — », « Dix chapitres, dix villes », et les trois règles dont « on voyage la nuit, on arrive à l'aube » : tout cela décrit le chemin côtier, abandonné.
- **`ACCUEIL_CHAP`** — les dix mots d'accueil suivent les huit chapitres thématiques actuels. La v2 les redistribue en douze étapes d'environ vingt mots, et **le chapitre 3 « Le cheval » se dissout**. Ces dix textes seront donc réécrits.
- **La querelle « cinq nations »** devient sans objet : en v2 le voyage traverse bien plus de quatre pays. La correction reste juste pour la v1 et ne gêne pas.

**Ce que ça ne remet pas en cause :** la couche de traduction elle-même. `tx()`, `T()`, `data-t` et les tables `I18N_*` sont indépendantes de la navigation — la v2 s'y branche sans rien réécrire. C'est précisément ce que la doctrine visait.

### Préparation Flutter

**Améliorations d'architecture réalisées :**
- **Une couche de traduction unique** posée dans `lingo.html` : `tx(objet)` pour les données, `tx2(table, secours)` pour les champs d'étape, `T(clé, variables)` pour l'interface. Une seule porte d'entrée au lieu de ternaires `ui==="en"?…:…` éparpillés dans le fichier. C'est un contrat, pas une rustine : Flutter le réimplémentera à l'identique.
- **Séparation données / présentation** : les données restent écrites en français dans `ETAPES`, les traductions vivent dans des tables séparées (`I18N_NAT`, `I18N_H`, `ETAPES_I18N`) rangées par référence de ville. La structure d'origine n'a pas été alourdie et reste lisible.
- **Repli en cascade par construction** : `tx()` accepte aussi bien une chaîne nue qu'un objet multilingue, et retombe toujours sur le français. Une langue non écrite n'a jamais pu casser l'affichage — c'est ce qui a permis de patcher par étapes sans écran blanc.
- **Interface pilotée par attributs** (`data-t` texte, `data-th` html, `data-ta` aria) et une fonction `appliquerLangue()` unique, rappelable si la langue change en cours de route. Les chaînes ne sont plus en dur dans le HTML.
- **Textes à variables nommées** : `T("vSurN", {v:…, a:…, n:…})` au lieu de concaténations. L'ordre des mots peut changer d'une langue à l'autre sans toucher au code — ce que la concaténation interdisait.

**Dépendances supprimées :** les ternaires de langue dans `montrerAccueilChapitre`, `montrerLecon` et l'affichage des libellés de traversée.

- **Le nom du module sorti en constante** (`NOM_MODULE`) : une seule source de vérité, propagée par `{nom}`. Un renommage ne se fait plus à quinze endroits.
- **Les lectures japonaises centralisées** (`LECTURES_JA`) : construites une fois depuis le lexique, sans toucher aux fichiers de données. `dire()` a maintenant un contrat clair — on lui donne un mot et une langue, il sait quoi prononcer.

**Ce qui reste à moderniser dans `lingo.html` :**
- Les textes du Sprint et du Duel utilisent encore des ternaires `ui==="en"` : ils n'ont pas été convertis cette session (les traductions existent, elles attendent dans le document de traductions).
- `VILLES` dépend d'un fichier global (`window.HYPE_LINGO_VILLES`) sans contrat déclaré.
- Les lexiques sont chargés par nom de fichier deviné (`hype-lingo-lex-<lg>.js`) sans registre.

**Risques :** aucun changement de comportement ni de mise en page. En français, l'affichage est identique au fichier d'origine — les accesseurs renvoient la valeur française telle quelle. Le seul chemin nouveau s'active quand `langueUI()` renvoie autre chose que `fr`, ce qui ne se produit que si le pont hôte fournit une de ces langues.

---

## 🧭 SESSION 85 bis (04/08, fin de soirée) — CHANGEMENT DE STRUCTURE

⚠️ **DÉCISION DE STRUCTURE, à lire avant toute reprise de Linguae.** Document complet : **`hype-linguae-structure-v2.md`**.

**L'organisation « une langue = un pays = dix villes » est ABANDONNÉE.** Toute conversation qui reprend le module doit partir de la v2, sinon elle produit du contenu pour une structure morte.

### Pourquoi

Quatre problèmes constatés en testant :

- **42 mots par chapitre, personne n'en vient à bout** — donc le souvenir de la ville ne se gagne jamais et la récompense finale est décorative.
- **Le parcours imposé verrouille** : tant qu'un chapitre n'est pas fini, la ville suivante reste fermée. En pratique **neuf villes sur dix ne sont jamais vues**.
- Chaque joueur ne découvrait qu'un seul pays.
- **Le travail de création ne profitait qu'à une partie des utilisateurs** : dix villes britanniques pour les seuls anglicistes. Soixante villes à produire au total.

### La v2

**Le joueur choisit UNE langue, puis fait le tour du monde équestre.** Newmarket, le Connemara, Jerez, Saumur, Warendorf : le décor change, la langue étudiée jamais. Un anglophone visite l'Espagne et le Japon — en anglais.

**Les villes ne sont produites qu'une fois et servent aux six langues.** ⚠️ L'architecture est déjà prête : le lexique est stocké par concept avec ses six langues côte à côte. **Rien à réécrire, seulement à ranger autrement.**

**Choix libre à la fin de chaque chapitre** : trois ou quatre destinations proposées (dont une dans le même pays), ou retour au globe pour choisir soi-même. ⚠️ **Proposer, pas étaler** — un débutant devant soixante destinations ne choisit rien.

**LE GLOBE remplace le chemin côtier.** Le voyage part de l'écurie du joueur, à sa vraie ville ; chaque destination trace une ligne depuis ce point. Le globe devient le passeport : pas une liste, une carte. Hype a déjà `GLOBE_HTML_HYPE` intégré par iframe, même motif que Linguae.

⚠️ **LE CHEMIN CÔTIER EST ABANDONNÉ** — construit le jour même. Il ne tient que si les villes sont voisines : Newmarket → Doha n'a aucun sens le long d'une falaise. Le garder imposerait deux modes de déplacement. La constellation peut renaître sur le globe, une étoile par destination.

### Ce qui ne bouge pas

Les leçons et leurs six exercices, les vagues de trois, la révision espacée, le Sprint, le Duel, les cartes postales, les vidéos, les récits, les lettres, les souvenirs, le stockage par concept, et les décisions de gratuité. **C'est la navigation qui change, pas le jeu.**

### Les douze premières destinations

**Neuf déjà produites** : Newmarket, Connemara, Aberystwyth, Windsor, Badminton, Hickstead, Kildare, Walsall, Édimbourg.
**Trois à produire en priorité** : **Saumur** (Cadre Noir), **Jerez** (école andalouse, PRE), **Warendorf** (formation allemande).
⚠️ **Lambourn est candidate au retrait** : doublon avec Newmarket, deux villages d'entraînement anglais à quinze minutes l'un de l'autre. Sa carte et sa vidéo restent utilisables en destination secondaire.

⚠️ **Douze, pas soixante.** La liste de la vision est le réservoir, pas le lot de départ.

### Le vrai travail restant

**Redistribuer les 336 mots** : de huit chapitres de 42 à douze étapes d'environ vingt. Le principe : **le lieu enseigne ce qu'on y fait** — Walsall la sellerie, Saumur le dressage, Jerez les races, Kildare les urgences, Newmarket l'écurie.

⚠️ **Le chapitre 3 « Le cheval » se dissout** : chaque destination a sa race (Connemara, PRE, Lusitanien, Hanovrien). Les races ne sont plus un chapitre mais **un mot par ville**.

**Vingt mots par étape** au lieu de 42 : c'est ce qui rend le souvenir réellement gagnable.

### Ordre de travail

1. ~~Écrire la structure~~ — fait, voir `hype-linguae-structure-v2.md`
2. Arrêter les douze destinations (décision, pas code)
3. **Redistribuer le vocabulaire** — le gros du travail
4. Le globe, en remplacement du chemin
5. Produire Saumur, Jerez, Warendorf

---

## 🎮 SESSION 85 (04/08, soir) — HYPE LINGUAE : LE JEU

⚠️ **Le module s'appelle désormais HYPE LINGUAE.** Troisième nom en une soirée : Lingo → Lingua → **Linguae** (pluriel latin de *lingua*, les langues). C'est le nom retenu. Ne pas le réécrire en Lingo.

⚠️ **Le fichier reste `lingo.html`** à la racine — renommer le fichier casserait les liens déjà poussés et le raccourci depuis l'app. Seul le nom affiché change.

### Ce qui a été fait

**La leçon est branchée** (elle n'existait pas avant cette session) : cinq exercices — carte de découverte, choix dans les deux sens, écoute, écriture, phrase à remettre en ordre — plus un sixième, le vocal. Réponses en **plaques de verre 2×2** sur la carte postale de la ville ; jamais de liste verticale de pilules.

**Vagues de trois**, sur les conseils d'un retour extérieur et vérification de la méthode Duolingo : trois mots découverts, trois exercices, une phrase, puis les trois suivants. Avant : dix découvertes d'affilée puis dix exercices — au premier exercice on avait oublié le premier mot. La leçon commence par jusqu'à **trois exercices de révision** tirés des mots du chapitre dont la maîtrise est la plus basse.

**LE SPRINT** — soixante secondes, le plus de mots possible, combo ×2 à trois bonnes d'affilée, ×3 à six, ×4 à neuf. Puise dans les 336 mots des huit chapitres, en priorité ceux déjà croisés. Record, parties et mots gardés en local. **Accessible en deux taps depuis l'accueil de Hype** via `lingo.html#sprint`.

**LE DUEL, sans serveur.** Une graine de six caractères dans le lien détermine les dix mots, leur ordre, le sens de chaque question et la disposition des quatre réponses : les deux joueurs jouent exactement la même partie. Le lien porte le score du défiant (`#duel=abc123-23`). Aucune table Supabase, ça passe par WhatsApp. Testé entre deux onglets.

**Trois écrans en amont** : présentation (« Échanger avec les cavaliers du monde entier »), choix de la destination — Les Îles ouvert, La Péninsule / La Botte / Le Rhin / L'Archipel / Le Lexique français annoncés —, puis le carnet de route avec les dix villes en dépliants.

**Le chemin ne contient plus aucun dessin.** Montagnes en triangles, cabanes géométriques, mer en traits, lune grise, herbes : tout supprimé, remplacé par les dix cartes postales en plein écran avec parallaxe. La bibliothèque `FORMES` a été retirée.

**Récompenses conditionnées** : la carte postale s'affiche en **aperçu assombri** avec « encore N mots », ne se retourne pas et n'entre pas au passeport tant que le chapitre n'est pas fait. Le souvenir demande **tous** les mots. Le tampon reste acquis à l'arrivée.

**Entrée dans l'app** : carte HYPE LINGUAE dans « Mon apprentissage » de l'accueil, image tirée de la vidéo d'arrivée de Newmarket, plus un bouton « Le Sprint · 60 secondes ». ⚠️ **L'`index.html` n'avait toujours pas été déployé au moment d'écrire ces lignes** — c'est pourquoi la carte n'apparaissait pas.

**Doublon de quêtes corrigé** : `.slice(0, 3)` → `.slice(1, 4)`.

### ⚠️ Bugs corrigés — à ne pas réintroduire

**PLANTAGE MÉMOIRE iOS.** Le chemin chargeait la carte 900×1200 de chaque ville approchée et **ne la déchargeait jamais** : après dix villes, une quarantaine de mégaoctets décodés, et un pincement pour zoomer tuait l'onglet. Maintenant **trois cartes nettes au maximum**, les autres repassent au fond de 1 Ko.

**VOCAL QUI BLOQUE TOUT.** La reconnaissance ne répondait jamais sur iPhone et le verrou anti-double-validation bloquait **aussi** le bouton de sortie : session perdue. Corrigé par un délai de 6 s, un bouton de sortie sans verrou, et surtout **le vocal n'est plus le mode par défaut** — on écoute, on répète, on se juge (méthode Pimsleur). Le micro est un bouton secondaire. **Ne jamais noter l'accent** : on vérifie que le bon mot a été dit.

**COLLISION DE NOMS `melange`.** Ma fonction de brassage de tableau écrasait celle qui mélangeait deux couleurs : le ciel du chemin restait figé sur sa première teinte. Renommée `brasser`.

**COLLISION DE CLASSE `.cv`.** Les cartes du chemin et les lignes du carnet partageaient la classe : l'itinéraire disparaissait et le titre s'empilait. Les cartes sont passées à `.chc`.

**BOUTON VERROUILLÉ QUI ENFERME.** Sur une ville non atteinte, le bouton ne faisait rien et le seul recours était un glissement horizontal, que Safari interprète comme son geste de retour. Il **ramène désormais à l'étape en cours**. Les points du bas sont devenus une navigation, avec une zone tactile de 26 px (un point de 5 px est inatteignable au doigt).

**VIDÉO DANS UN CONTENEUR DÉFILANT.** L'ouverture se positionnait par rapport à la hauteur du carnet et non de l'écran, et son `z-index` la faisait passer par-dessus les boutons : le tap n'atteignait jamais « Entrer ». Elle a son propre calque fixe `#ouvFilm`.

**RACCOURCI D'ANCRE IGNORÉ.** Ouvrir un lien de duel quand on est **déjà** sur la page ne changeait que l'ancre : le script ne se relançait pas. Écouté sur `hashchange`.

**PRÉSENTATION PAR-DESSUS LE JEU.** Le garde-fou ne testait que `#sprint` ; avec `#duel=…` la présentation se réaffichait et interceptait les taps.

**ÉTAT DES CHAPITRES LU TROP TÔT.** `etatChapitre` était appelée par le chemin avant l'initialisation des tables du moteur de leçon (`var` hissé mais pas sa valeur) : plantage silencieux. La fonction répond prudemment et l'affichage se rafraîchit après chargement.

**CADRAGE DES VIDÉOS.** Choisi par le code selon les dimensions réelles : portrait → `cover`, paysage → `contain`.

**RECADRAGE DU FILIGRANE.** Couper à gauche mange la première lettre des noms longs (« ABERYSTWYT »). **Recadrer par le haut uniquement.**

### Décisions à ne pas défaire

- **Une ville, une vidéo**, qui rejoue à chaque passage. Le système à deux niveaux (arrivée longue puis reprise courte) est supprimé : il répondait à des vidéos de 15 s, elles font moins de 5 s.
- **L'ouverture rejoue à chaque lancement** (constellations, tracé, Îles). Bouton « Passer » toujours présent.
- **`VOYAGE_LANGUE` ≠ `langue`** : la première est la langue enseignée, la seconde celle dans laquelle on lit les cartes postales. Bug corrigé : la leçon apprenait le français à une francophone.
- **Le flou des fonds est cuit dans l'image** (1 à 2 Ko), jamais calculé en direct.
- **Aucun mur d'énergie, jamais.** Duolingo en a un ; près de la moitié de plus de onze mille utilisateurs sondés le détestent. Sur une communauté de club, ça se retourne contre nous. On crée de la tension par le combo et le duel, pas par le blocage.
- **XP via le pont `HYPE_LINGO_HOST.xpAjouter`**, jamais un compteur à part. 2 par mot, 10 par chapitre, score/3 au sprint — provisoire, le barème de Hype n'est pas validé.

### 🔴 À FAIRE ensuite

- [ ] **Grille de vignettes** à la place du carnet en liste : dix cartes postales en petit, trois par ligne, un écran sans défilement. Demandé, pas fait.
- [ ] **Sprint par ville** (record par chapitre) + garder le sprint général comme épreuve finale, façon grand quiz.
- [ ] **Records visibles ailleurs que dans le sprint** : sur la carte de l'accueil et dans le carnet.
- [ ] **Classement du club** : table Supabase `linguae_scores` (pseudo, chapitre, score, date), top 3. À maquetter en faux d'abord. SQL à fournir.
- [ ] **`hype-lingo-lex-pansage.js`** : appelé par `lingo.html`, absent du dépôt. Le chapitre 2 affiche un message explicite.
- [ ] **Chapitre 10 « Les dialogues »** : pas écrit.
- [ ] **220 mots à faire vérifier** par des natifs — voir `hype-linguae-doutes.md`. Allemand 90, japonais 88, espagnol 21, italien 21.
- [ ] **Traduction des textes de ville** (lettres et volets) : confiée à une conversation parallèle.
- [ ] Passeport, globe, collection, mode Lexique : décidés, pas construits.

---

## 🗺️ SESSION 84 (04/08) — HYPE LINGO : LE VOYAGE 1 EST JOUABLE

⚠️ **L'`index.html` de Hype n'a PAS été touché.** Tout se passe dans `lingo.html` et ses fichiers, à la racine. Seule exception de la journée : un correctif d'une ligne sur l'accueil (voir plus bas).

### Ce qui est en ligne

**Le voyage 1 s'appelle « LES ÎLES »** — Angleterre · Irlande · Pays de Galles · Écosse, mention *anglais* en petit. ⚠️ **Ne jamais écrire « Îles Britanniques » seul** : le terme est contesté en Irlande et Kildare est en République d'Irlande. Formule retenue après discussion : titre = la destination, la langue en sous-titre. Gabarit pour la suite : La Péninsule (es), La Botte (it), L'Archipel (ja).

**Un carnet de route** ouvre le module : le pourquoi des dix villes (« pas les capitales politiques, les capitales du cheval »), l'itinéraire avec une ligne par ville expliquant son choix, et les trois règles du jeu. Fond vivant derrière, bouton « Partir ».

**La Traversée** : chemin côtier défilable au doigt, sept couches à vitesses différentes, la nuit qui avance d'une ville à l'autre, la lune et son reflet sur la mer, une étoile par étape, la constellation qui se dessine derrière le cavalier.

**Dix villes, dix chapitres** : Newmarket (écurie) · Lambourn (pansage) · Connemara (cheval) · Walsall (matériel) · Aberystwyth (cours) · Windsor (dressage) · Hickstead (obstacle) · Badminton (concours) · Kildare (urgences) · Édimbourg (dialogues).

**L'arrivée en ville** : vidéo, récit court, **carte postale qui se retourne** sur une lettre manuscrite signée Hype, trois volets dépliants, souvenir à collectionner.

**LA LEÇON EST BRANCHÉE** (c'était le trou depuis le 3/08). Cinq exercices : carte de découverte, choix dans les deux sens, écoute, écriture, phrase à remettre en ordre. Réponses en plaques de verre 2×2 sur la carte postale — **jamais de liste verticale de pilules**, c'est ce qui faisait Duolingo. Maîtrise de 1 à 5 par mot, en `localStorage` (`hype_lingo_maitrise`).

### Les fichiers, tous à la racine

| Quoi | Combien | Poids |
|---|---|---|
| `lingo.html` | 1 | 79 Ko |
| `hype-lingo-villes.js` | 1 | 14 Ko |
| `hype-lingo-lex-*.js` | 8 chapitres | ~260 Ko |
| `carte-*.webp` + vignettes | 20 | 1,0 Mo |
| `fond-*.webp` | 10 | 19 Ko |
| vidéos `.mp4` | 13 | 5,5 Mo |
| `cheval.webp` | 1 | 2 Ko |

⚠️ **`index.html` est le SEUL nom de fichier interdit à la racine** — l'app Hype a déjà été écrasée une fois par un dépôt de `lingo/index.html`.

### Décisions techniques à ne pas défaire

**Le lexique est stocké par CONCEPT, jamais par paire de langues.** Une entrée = un objet équestre avec ses 6 langues côte à côte (`m` mot, `p` prononciation pour EN/DE/JA seulement, `var` variante régionale, `def` définition, `dit` pour les ordres criés). Bidirectionnel gratuit ; une paire FR→EN imposerait 30 combinaisons.

**`VOYAGE_LANGUE` ≠ `langue`.** `VOYAGE_LANGUE` est la langue enseignée (« en ») ; `langue` est celle dans laquelle on lit les cartes postales. Bug corrigé en séance : la leçon apprenait le français à une francophone.

**Le flou des fonds est CUIT DANS L'IMAGE**, jamais calculé en direct. `filter:blur()` sur une image plein écran animée fait chuter Safari iOS à 30 i/s. Bonus : une image floue et sombre pèse **1 Ko au lieu de 100**. À l'exécution, on n'anime que `transform` et `opacity`.

**Pas de voile noir sur les cartes** : la charte l'interdit sur les chevaux. L'assombrissement fait partie de l'image, plus un dégradé qui monte du bas.

**Une seule vidéo à l'écran, jamais deux.** Créée à l'ouverture, et à la fermeture : `pause()` + retrait de `src` + `load()` — un simple `pause()` ne libère pas la mémoire sur iOS. Aucune vidéo sur le chemin qui défile : elle se battrait avec le défilement en profondeur.

**Le cadrage des vidéos est choisi par le code** selon les dimensions réelles du fichier : portrait → `cover`, paysage → `contain`. Trois vidéos sont en paysage (ouverture, reprises de Newmarket et Lambourn) et étaient massivement rognées.

**Format des vidéos à produire** : verticales 9:16, 4-5 s, muettes, sans texte incrusté (sauf un panneau réel de la ville), sans écran de fin CapCut, export au plus haut débit — la conversion est faite ici. **Recadrer le filigrane par le HAUT seulement** : couper à gauche mange la première lettre des noms longs (« ABERYSTWYT »).

**Prompt d'image, gabarit figé** : vertical 3:4, un seul sujet, tiers haut et bas volontairement sombres pour recevoir le titre et le tampon, aucun texte, aucun visage reconnaissable, aucun bâtiment contemporain. Vue de haut en premier plan de vidéo (l'arrivée se découvre depuis le paysage).

### Tarifs — décidés, à peaufiner plus tard

**Gratuit** : le chapitre 1 de chaque pays, **plus le chapitre Urgences partout, dans les six langues**. Aucun mur d'énergie à la Duolingo — leur système d'énergie est détesté par près de la moitié des utilisateurs sondés, et sur une communauté de club ça coûterait plus en bouche-à-oreille que ça ne rapporterait.
**Premium** : chapitres 2 à 9, exercice vocal, mode trilingue, hors ligne, cosmétiques. **Le cours reste payant** malgré son utilité : c'est la valeur du module.

### ⚠️ Ce qui manque, précisément

- **`hype-lingo-lex-pansage.js`** : appelé par `lingo.html`, absent du dépôt. Le chapitre 2 affiche un message explicite au lieu de planter.
- **`hype-lingo-lex-dialogues.js`** : chapitre 10, pas écrit, pas appelé.
- **Huit `reprise-<ville>.mp4`** : seules Newmarket et Lambourn en ont. Sans elles, la grande arrivée rejoue à chaque retour. Une seule reprise générique suffirait.
- **Le vocal** : décidé en Premium, pas prototypé. Ne jamais noter l'accent — on vérifie que le bon mot a été dit. Ne marche pas hors ligne.
- **L'écriture en japonais** bascule en choix (clavier latin). À terme : tuiles kana.
- **Le passeport, le globe, la collection, le mode Lexique** : décidés, pas construits.
- **115 entrées de lexique marquées `// ??`** — voir plus bas.

### ⚠️ RELECTURE NATIVE : le vrai chantier restant

**Répartition des doutes** : allemand 90, japonais 88, espagnol 21, italien 21. Les chapitres les plus techniques sont les plus incertains (obstacle 30, dressage 26, matériel 22, concours 21).

**Avertissement d'expérience** : sur le chapitre Écurie, **trois termes japonais sur six vérifiés étaient faux**, dont un purement inventé (`係留リング`). ChatGPT et Gemini les ont corrigés — mais deux IA qui s'accordent ne valent pas un cavalier natif. Fichier `hype-lingo-doutes-a-verifier.md` à compléter, pas à recréer.

**Trouvaille à conserver comme contenu** : les langues ne découpent pas le monde pareil. Le japonais nomme *l'endroit où l'on attache* (繋ぎ場) là où le français nomme *l'anneau*, et distingue trois gestes — asperger d'eau, refroidir les membres, laver au shampooing — là où le français dit « doucher ». C'est ce qui rendra le module crédible.

### Correctif sur l'app Hype

- [x] **Doublon sur l'accueil corrigé** : `hypeQuetesASuivre(ctx, amis).slice(0, 3)` → `.slice(1, 4)` à la ligne 28460. Le bandeau « La suite pour toi » prend `liste[0]`, le bloc « Tes prochaines quêtes » repartait de zéro : la même quête apparaissait deux fois, tous les jours. Vérifié : 15 blocs script valides, `allerVersGalop` = 3, 901 fonctions, aucune perte.

### 🐌 Diagnostic du démarrage (mesuré, NON corrigé)

Rappel de la session 81, toujours valable et toujours le problème le plus grave de l'app : **119 fichiers `hype-images-*.js` chargés d'un coup en scripts bloquants**, 580 Ko par image en base64, en 1024×1536 pour des cartes de 400 px. **Mais `hype-images-1.js` prouve que le bon pattern existait** : les clés k0 à k191 sont de vrais fichiers (`images/k12.png`). Ordre proposé : WebP 1024 q82 (−85 %), retour aux vrais fichiers, puis un service worker sobre. Le `sw.js` actuel est un **worker de retrait** : aucun hors-ligne aujourd'hui.

---

## 🤝 SESSION 83 (03/08) — LE PARRAINAGE EST CODÉ (18 familles)

**Part de la 82.** Livré : 10 494 529 octets, md5 `7143bc1c`. ⚠️ **`hype-parrainage.sql` à exécuter.** `allerVersGalop` = 3 · 388 const · 6 nouvelles fonctions + 1 composant, 0 perdue · chaque identifiant défini une fois · toutes les icônes de familles existent · 15 blocs inline valides · rendu Playwright sans nouvelle erreur.

### Deux tables, et une règle de confiance
- `hype_parrain_codes` : le code personnel, **une ligne par cavalier**, créé à la première ouverture du bloc. Format lisible `HYPE-XXXXXX`, alphabet **sans caractères ambigus** (ni `0/O`, ni `1/I/L`) — un code se dicte à l'écurie.
- `hype_filleuls` : **une ligne par filleul maximum** (clé primaire sur `filleul_id`), contrainte `filleul_id <> parrain_id` en base.

⚠️ **Le champ `valide` et pourquoi c'est le FILLEUL qui le bascule** : un filleul ne compte qu'après avoir ajouté un cheval ou terminé un cours (décision de Blandine, pour éliminer les faux comptes sans policer personne). Or **le parrain n'a aucun droit de lecture sur les données de son filleul** — et c'est très bien ainsi. C'est donc le filleul lui-même qui écrit `valide = true` depuis son appareil, à l'ouverture des Quêtes (`hypeValiderMonParrainage`). Seule solution propre sans fonction serveur.

⚠️ **Choix de confidentialité assumé** : `hype_parrain_codes` est **lisible par tout cavalier connecté**. Sans ça, personne ne pourrait retrouver le parrain à partir d'un code saisi. Ça n'expose qu'une correspondance code → uuid, aucun nom, aucun email.

### Ce que voit le cavalier
Bloc **« Ramène tes amis »** sous la grille du rayon **Ma communauté** uniquement : son code en gros (tap = copié), un champ pour saisir un code reçu, et la mention « à 3 filleuls, un mois offert ».
**Refus explicites**, jamais d'échec muet : code vide · tu as déjà un parrain · ce code n'existe pas · c'est ton propre code · pas de connexion. Traduits en 6 langues.
Famille **Parrainage** : 1 · 3 · 5 · 10 · 25 filleuls → badge **Bâtisseur**.

### ⚠️ CE QUI RESTE À LA MAIN — POUR BLANDINE
Les récompenses sont des **codes promo Stripe remis à la main** (décision du 03/08). Rien ne les envoie automatiquement. **Requête à exécuter de temps en temps** :
```sql
SELECT parrain_id, count(*) AS filleuls FROM hype_filleuls WHERE valide
GROUP BY parrain_id HAVING count(*) >= 3 ORDER BY filleuls DESC;
```
Puis créer un code promotionnel à usage unique dans Stripe et le transmettre. ⚠️ **Vérifier dans Stripe qu'un coupon « 1 mois » ne devienne pas « 1 an » sur l'abonnement annuel.**
Automatiser demanderait une fonction Netlify avec la clé secrète Stripe — la même qu'il faudra pour la suppression de compte. À faire seulement si le volume arrive.

### 🐛 INCIDENT DU JOUR — À RETENIR ABSOLUMENT
L'`index.html` de **Hype Lingo** (application autonome, 13,6 Ko) a été poussé **par-dessus l'index de l'app** sur GitHub : site hors service. Rien n'était perdu (Netlify garde les déploiements, GitHub garde l'historique), mais **la cause reste ouverte** :
➡️ **Le fichier autonome de Lingo NE DOIT PAS s'appeler `index.html`.** À renommer `lingo.html` ou à placer dans un dossier `lingo/`. **À dire à la conversation qui travaille sur Lingo**, sinon l'accident se reproduira au prochain envoi.
➡️ Rappel : sur GitHub, **se fier à la TAILLE affichée, jamais à l'horodatage**. C'est la taille (13,6 Ko au lieu de 9,99 Mo) qui a révélé l'écrasement.

### Reste sur les quêtes
Assiduité (**semaines vs jours, toujours non tranché**) · Fidélité (date d'abonnement inexistante) · déclaratifs (concours, sellerie ×2, lieux élargis aux événements) · Passeport · jeux Baby (**clé de stockage du Mémory introuvable dans l'index**) · Distinctions (fondateur numéroté, Premier Cercle, Bienfaiteur) · rebrancher `EcranBadges` sur `hype_paliers`.

### Préparation Flutter
`hypeFabriquerCode`, `hypeUtiliserCodeParrain` et `hypeCompterFilleuls` sont indépendants de React (sauf le composant d'affichage) : transposables tels quels. La règle « c'est le filleul qui valide » restera vraie en Flutter, elle découle des politiques RLS, pas du client.

---

## 🩹 SESSION 82 (03/08) — LES QUÊTES : ICÔNES MANQUANTES, COMPTEUR ILLISIBLE, DEUX BUGS DE COMPTAGE

**Part de l'index en ligne (10 476 370 octets — celui-là même que la session « démarrage lent » a mesuré, donc bien le fichier réel).** Livré : 10 480 736 octets. Aucun SQL. `allerVersGalop` = 3 · 388 const · 15 blocs inline valides · rendu Playwright sans nouvelle erreur.
⚠️ **Note d'aiguillage** : l'`index.html` déposé dans cette conversation à 14 h 59 était celui de **Hype Lingo** (application autonome, 10 Ko), pas l'index de l'app. Vérifié par la taille avant de travailler.

### 1 · Cinq icônes n'existaient pas → hexagones vides (bug introduit en session 77)
`qIcone` ne connaissait que 18 noms. J'avais demandé `coupe`, `message`, `coeur`, `piste`, `main`, `video` — inexistants, donc **hexagones vides** sur « Messages envoyés » et « Encouragements » (et bientôt Palmarès, Reprises, Vidéothèque). **12 icônes ajoutées** à `qIcone` : `coupe`, `flot`, `message`, `coeur`, `piste`, `main`, `video`, `carte`, `flamme`, `cristal`, `panier`, `jeu` — les six dernières par avance pour les familles à venir.
✅ **Contrôle automatisé ajouté au protocole** : comparer l'ensemble des `icone: "…"` demandés à l'ensemble des `case "…"` de `qIcone`. (Restent `user` et `ville`, qui appartiennent à `ChampOr`, pas aux quêtes.)

### 2 · Le compteur se lisait à l'envers
« Prochaine marche : 25 amis · 11 » → devenu **« 11 / 25 amis »** en gras, puis « prochaine marche : … » en dessous. La valeur d'abord, l'objectif ensuite.

### 3 · 🐛 Les visites de grandes écoles comptaient comme des résultats de concours
`annoncerVisiteEcole` écrit la visite dans la table **`resultats`** (classement « Visite · … ») pour la faire apparaître dans le fil. La famille **Palmarès** comptait donc Saumur comme un résultat de compétition. Nouveau compteur `hypeCompterPalmares()` avec `.not("classement","ilike","Visite%")`.

### 4 · 🐛 « Encouragements » restait à 0
La table `likes` ne porte **que sur les résultats** (`resultat_id`) — pas sur les publications du fil — et les **commentaires sont une autre table**. La famille compte désormais **les deux gestes** (`likes` + `commentaires`).

### 5 · Famille « J'y étais » ajoutée (17 familles)
Elle était **déjà calculable** : `annoncerVisiteEcole` mémorise les visites dans `visites_articles` depuis le 27/07. Marches 1 · 3 · 5 · 10 · 20 lieux → badge **Grand voyageur**. Aucune table, aucun SQL.

### ⛔ Ce que je n'ai PAS fait, et pourquoi (malgré « fais tout »)
Livrer ces familles aurait produit des **cartes mortes**, que Blandine a explicitement refusées le 02/08 :
- **Assiduité** — décision semaines vs jours **toujours non tranchée** ; rien ne peut être compté avant.
- **Fidélité** — la date de début d'abonnement n'existe pas côté Hype ; seule la marche 1 serait atteignable.
- **Concours (participation)**, **J'y étais élargi aux événements**, **Achats en sellerie**, **Produits identifiés** — tous **déclaratifs** : ils demandent un formulaire de saisie, pas un compteur. C'est un vrai lot d'interface.
- **Parrainage** — aucun code de parrainage n'existe ; dépend aussi de la décision Stripe (codes promo).
- **Passeport de cavalier** — chantier à part, reporté par Blandine.
- **Jeux Hype Baby** — la clé de stockage de la progression du Mémory **est introuvable** dans l'index (aucun `hype_memory*`, aucun `MEMORY_CLE`). Je n'ai pas voulu deviner. **À retrouver avant de coder cette famille.**

### Préparation Flutter
Rien de neuf. `hypeCompterPalmares` reste une fonction pure au-dessus du client Supabase, transposable.

---

## 🌍 SESSION 81 (03/08) — HYPE LINGO, PREMIÈRE LEÇON JOUABLE (application séparée)

⚠️ **L'`index.html` de Hype n'a PAS été touché.** Rien à pousser côté app. Livraison = un dossier `/lingo/` autonome.

### Décision d'architecture : Lingo est une application à part
Blandine : « constitue Hype Lingo comme si c'était une appli à part qu'on puisse lancer indépendamment, on la reliera ensuite ». Livré tel quel :
```
/lingo/index.html                coquille + CSS + le pont HYPE_LINGO_HOST
/lingo/hype-lingo.js             moteur, écrans, 5 mini-jeux (vanilla JS, pas de React)
/lingo/hype-lingo-lex-ecurie.js  12 concepts × 6 langues + définitions
/lingo/img/apy.webp              107 Ko
```
Testable sur `…netlify.app/lingo/` sans aucun risque pour l'app. **Le pont `HYPE_LINGO_HOST` est le SEUL point de contact** (6 fonctions : `langue` `charger` `sauver` `xpAjouter` `estPremium` `quitter`). Vérifiable au grep : aucun appel de Lingo vers une fonction de l'index. Au branchement, l'index remplace ces 6 fonctions, rien d'autre ne bouge dans Lingo.
⚠️ **Piste de branchement privilégiée : une iframe**, exactement comme `GLOBE_HTML_HYPE` et `FRANCE_MAP_HTML` déjà en place (pattern validé chez Blandine, passage de la langue par `postMessage`). C'est pour ça que Lingo est en JS natif et pas en React.

### Le lexique est stocké par CONCEPT, jamais par paire de langues
Une entrée = un objet équestre avec ses 6 langues côte à côte (`m` mot, `p` prononciation simplifiée, `var` variante régionale, `def` définition). Conséquences acquises :
- **Bidirectionnel gratuit** : un cavalier japonais apprend le français avec le même fichier. La France est donc un pays du globe, il y en a 6.
- Une paire FR→EN aurait imposé **30 combinaisons** à produire.
- La `def` sert trois fois : mode Lexique, verso de carte, indice de jeu.
- `var` traite structurellement le problème `headcollar` (GB) / `halter` (US), `trot enlevé` = *rising* (BHS) / *posting* (US).

### Deux modes décidés, un seul moteur
- **Le Voyage** : globe, pays, chapitres, tampons de passeport. Apprendre une langue.
- **Le Lexique** : pas de drapeau, pas de traduction. Un francophone apprend le jargon FFE (paturon, incurvation, garrot). Jeux différents : mot↔définition, pointer sur un schéma, intrus. **C'est le vestibule des Galops** : un cavalier bloqué sur un cours a un endroit où chercher les mots.
⚠️ **Le mode Lexique ne doit PAS écrire de vue `langue` dans `hype_vues`** — sinon le badge Polyglotte se gagne sans une seule langue étrangère. Il lui faut son propre type `lexique`.

### Ce qui est jouable dans cette livraison
Choix du pays (5 destinations, la même leçon se joue dans les 5 langues instantanément) · chapitre « L'écurie » · 13 étapes : 6 cartes de découverte + 6 exercices + 1 phrase à remettre en ordre · 5 types de mini-jeux (découverte, choix dans les deux sens, écoute, écriture, ordre de phrase) · tampon animé sur la page de passeport · collection de 12 cartes qui se retournent sur leur définition · maîtrise en 5 points par mot.
- Voix par `speechSynthesis` (aucun fichier audio, zéro bande passante). **Amorçage au premier tap** pour contourner le blocage iOS.
- **L'exercice d'écriture bascule en choix quand la cible est le japonais** (clavier latin). À terme : tuiles kana.
- Progression en `localStorage` (`hype_lingo_v1`). Pas de compte, pas de social, pas de premium en autonome — tout ça arrive au branchement.

### Décisions produit prises et à ne pas réouvrir sans raison
- **Nom : Hype Lingo.** Apy reste le guide et **n'est pas renommé** : « Apy » apparaît 3 381 fois dans l'index, y compris **comme sous-chaîne de blocs base64** (`UAJmlzSYoxQAUopKWgApyt`) — un remplacement global corromprait des images.
- ⚠️ **Contradiction de continuité non tranchée** : la Bible Baby v1.3 décrit Apy **alezan à grande liste blanche**, les visuels fournis pour Lingo montrent le **poney spectral turquoise**. Blandine : « on garde Apy ». À écrire dans la Bible (v1.4) pour que les sessions futures ne produisent pas le mauvais Apy.
- **Chapitre Urgences gratuit à vie, pour tout le monde** (dire « il boite », « colique », « appelez le vétérinaire » n'est pas du contenu premium).
- **Une seule série/flamme pour tout Hype**, jamais une propre à Lingo (conflit avec la question du jour + l'assiduité des Quêtes). Prévoir des jours de pardon.
- **Mode « on m'accueille »** : des exercices où le cavalier *répond* à un étranger qui débarque au club, au lieu de traduire. N'existe chez personne.
- Images de Lingo : **vrais fichiers WebP 512 px, 25 Ko, jamais de base64.** Illustrations réservées aux ~300 objets concrets ; « incurvation » ou « impulsion » ne s'illustrent pas, elles se définissent.

### ⚠️ Relecture native obligatoire avant publication
Le lexique technique n'est pas du vocabulaire courant. Deux points marqués `// ??` dans le fichier : **`longhina`** (it, longe) et **`ハルター / 無口`** (ja, licol). Le reste des 12 mots × 6 langues demande une relecture par un cavalier natif — on ne peut pas enseigner du faux à quelqu'un qui va s'en servir en concours.

### Reste à faire sur Lingo
Globe spectral (remplacera la liste de destinations, l'écran ne changera pas) · passeport feuilletable complet · packs spéciaux · mode trilingue Premium · social (au branchement) · production du contenu : ~1 250 concepts × 6 langues, **c'est le vrai chantier, des mois, pas le code**.

---

## 🐌 SESSION 81 (03/08) — DIAGNOSTIC DU DÉMARRAGE À 15-20 SECONDES (mesuré, non corrigé)

Blandine : « des fois 15/20 secondes » avant l'écran d'accueil. Cause trouvée, **rien n'a été modifié**.

### Ce qui a été mesuré
- L'`index.html` fait **10 476 370 octets**, dont **4,4 Mo de cours** (`COURS_BABY_I18N` 1 603 Ko · `COURS_GALOP3_FR` 838 · `COURS_GALOP1_I18N` 764 · `COURS_GALOP4_FR` 634 · `COURS_GALOP2_FR` 479) + `HYPE_NIVEAU_BADGES` 477 Ko. **Le détachement des cours n'a jamais abouti.**
- L'index charge **119 fichiers `hype-images-*.js` d'un coup, en scripts bloquants**, plus 10 autres fichiers.
- Poids réel mesuré : **580 Ko par image en base64** (k359 · k610→k614), en résolution **1 024×1 536 à 1 122×1 402**, affichées dans des cartes de 300-400 px → **9 fois plus de pixels que l'écran**. Le base64 seul coûte **+33 %**.
- **`sw.js` est un service worker de RETRAIT** (26/07) : il vide les caches, se désinscrit, n'installe aucun `fetch`. **Il n'y a donc aucun hors-ligne aujourd'hui**, et le cache HTTP d'iOS Safari se vide seul → le démarrage lent **revient régulièrement**, ce n'est pas un coût de premier lancement.

### 🎁 La bonne nouvelle : le bon pattern existe déjà
`hype-images-1.js` ne contient **pas** de base64 : les clés **k0 à k191 sont de vrais fichiers** (`images/k12.png`). Le navigateur ne les charge qu'à l'affichage. C'est le pattern d'origine, abandonné en route. Et le code sait déjà afficher un repli quand un fichier manque (`"hype-images-6.js manquant"`).

### Ordre d'intervention proposé (aucun geste posé)
1. Réencoder en WebP 1 024 px q82 → **60-80 Ko** au lieu de 580, soit **-85 %**. Livrer un avant/après côte à côte avant de toucher à quoi que ce soit.
2. Revenir aux vrais fichiers pour les clés en base64 → chargement à la demande.
3. Seulement ensuite : un service worker **sobre** (le sujet a déjà coûté des pages blanches ; le fichier de retrait doit rester en place plusieurs semaines).
4. Le détachement des cours : chantier **seul**, jamais mêlé à une livraison de fonctionnalité.

---

## 👁️ SESSION 80 (03/08) — LA TABLE DES VUES : CINQ FAMILLES DE PLUS

**Deux fichiers à pousser ensemble : `index.html` ET `hype-video.js`.** Plus `hype-vues.sql` à exécuter avant.
**16 familles au total** désormais (11 + 5).

### La table `hype_vues`, volontairement générique
Une ligne = « ce cavalier a vu ceci, de ce type ». Types actuels : `article` · `langue` · `reprise-voir` · `reprise-tracer` · `video`. **Hype Lingo entrera dedans sans migration ni ligne de code supplémentaire.**
Elle **remplace les marqueurs `localStorage`** (`hypeQueteVue`), qui disparaissaient quand le cavalier changeait de téléphone. Les anciens marqueurs sont conservés en parallèle : rien n'est cassé pour les quêtes de découverte.

### Les 5 nouvelles familles (rayon Mon savoir)
| Famille | Marches | Badge |
|---|---|---|
| Articles lus | 1·5·15·30·50 | Grand lecteur |
| Polyglotte | 2·3·4·5·6 langues | Polyglotte |
| Reprises visualisées | 1·2·3·4·6 | L'œil du juge |
| Reprises tracées | 1·2·3·4·6 | Par cœur |
| Vidéothèque | 1·3·5·10·20 | L'œil exercé |

⚠️ **Vidéothèque en nombres absolus, JAMAIS « toutes les vidéos ».** Blandine : « il y aura beaucoup plus de vidéos par la suite ». Un palier « les 7 » se serait dévalué à chaque ajout et aurait **rendu incomplet un badge déjà gagné**. Même raison pour les jeux Baby. Règle à tenir pour toute famille adossée à un catalogue qui grandit.
Catalogue actuel vérifié dans `hype-video.js` : **7 vidéos pédagogiques** (3 contact IFCE + incurvation + 3 aides), plus la réserve d'animations réservée aux modérateurs, exclue du compte.

### Le minuteur d'une minute (décision de Blandine)
`hypeMinuteDeVue(type, ref)` : la vue s'écrit après **60 secondes d'écran ACTIF**. Le décompte **s'arrête** si l'app passe en arrière-plan ou si le téléphone se verrouille (`document.visibilityState`) — poser son iPhone sur la table ne compte pas.
⚠️ **Limite assumée et documentée** : YouTube ne dit pas à Hype si la lecture tourne vraiment (il faudrait leur API, une dépendance externe pour un badge). **On mesure le temps de présence sur la page, pas la lecture.** Rien n'est affiché à l'écran : un chronomètre visible transformerait l'apprentissage en épreuve.

### Où c'est branché
- **Articles** : `EcranArticleDetail` → vue `article` (id de l'article) + vue `langue` à chaque changement de langue, immédiat (lire n'a pas besoin de minuteur).
- **Reprises visualisées** : `EcranTraceAnime`, une minute, ref = le niveau (`g3`…`g7`, `clubelite`).
- **Reprises tracées** : `EcranEntrainerTracer`, une minute.
- **Vidéos** : `hype-video.js` → `window.EcranVideoLecture`, une minute. ⚠️ Ce fichier vit dans un **IIFE séparé** : `hypeMarquerVue` est donc **exposée sur `window`** par l'index (`window.hypeMarquerVue = hypeMarquerVue`). Si un jour la fonction est renommée, **les deux fichiers doivent bouger ensemble**.

### Vérifications
`allerVersGalop` = 3 · 388 const · 3 fonctions nouvelles, 0 perdue · chaque identifiant défini exactement une fois · fusion `HYPE_FAMILLES.concat(HYPE_FAMILLES_VUES)` présente une seule fois · 15 blocs inline valides + `hype-video.js` validé séparément · rendu Playwright sans nouvelle erreur.

### Décisions produit arrêtées ce jour (non codées)
- **Parrainage → récompense par CODE PROMO Stripe**, pas par un mois offert géré par Hype. Raison : un mois maison exigerait une colonne de date et un accès Premium hors Stripe, donc **deux sources de vérité sur qui est abonné** — le schisme du 02/08 à nouveau. Avec un coupon Stripe, le cavalier reste un abonné normal dont la première période est gratuite, et le code se garde dans la poche. Paliers proposés : 1 filleul = badge, 3 = 1 mois, 5 = 1 mois, 10 = 1 mois Duo. ⚠️ **Vérifier dans Stripe qu'un coupon « 1 mois » ne devienne pas « 1 an » sur l'abonnement annuel.** Génération des codes **à la main** au début (2-3 cas), automatisation seulement si le volume arrive.
- **Un filleul ne doit compter qu'une fois qu'il a FAIT quelque chose** (cheval ajouté, cours terminé), jamais à l'inscription : élimine les faux comptes sans policer personne.
- **Vérification d'email à l'inscription : décidée, REPORTÉE.** ⚠️ **Ne pas activer l'interrupteur Supabase (Authentication → Email → Confirm email) avant que le code d'inscription soit adapté** : un nouveau compte ne pourrait plus se connecter avant d'avoir cliqué dans le mail, et l'enchaînement inscription→connexion actuel se casserait sans message. À faire dans l'ordre : adapter le code (écran « Vérifie ta boîte mail » + renvoi du lien), pousser, PUIS activer. Vérifier aussi que les comptes existants sont marqués confirmés dans `auth.users`, et prévoir un vrai service d'envoi (le domaine Supabase par défaut est limité à quelques mails/heure) — ce qui réglera au passage le `feinn@live.fr` temporaire.

### Reste à faire sur les quêtes
Déclaratifs (J'y étais / concours / sellerie) · parrainage · fidélité · **assiduité (semaines vs jours, toujours non tranché)** · passeport · jeux Baby (clé de stockage du Mémory non vérifiée) · Distinctions · rebrancher `EcranBadges` sur `hype_paliers`.

---

## ⚡ SESSION 79 (03/08) — L'XP DES MARCHES SE VERSE ENFIN AU FIL DE L'EAU

Dernière pièce manquante de la refonte : jusqu'ici seul le **rattrapage initial** versait de l'XP. Désormais **chaque marche franchie verse la sienne** (10 · 20 · 40 · 70 · 120 ; Galops 40 → 300), au même moment que la cérémonie.

### La règle de sûreté appliquée partout
`hypeEnregistrerPalier` **renvoie maintenant `true`/`false`** selon que la base a réellement accepté l'écriture. L'XP n'est versée **que si le palier a été mémorisé**, et la cérémonie ne se déclenche **que dans ce cas** aussi. Une écriture qui échoue (réseau coupé en plein geste, RLS) ne donne donc ni XP ni annonce — elle sera simplement rejouée à la prochaine ouverture, une seule fois.
⚠️ **Règle générale du projet, désormais explicite** : *une récompense ne se verse jamais avant que sa trace soit écrite en base.* Sans ça, une même marche paie deux fois.

### Détail technique
La boucle de l'effet **attend** (`await`) chaque enregistrement avant de compter l'XP — l'effet était déjà `async`, la garde `if (!actif) return;` est reposée après chaque attente pour ne rien écrire sur un écran démonté.

### Vérifications
`allerVersGalop` = 3 · 388 const · aucune fonction nouvelle ni perdue · 15 blocs inline valides · rendu Playwright sans nouvelle erreur.

### État de la refonte des quêtes après ce lot
✅ 11 familles branchées sur de vrais compteurs · ✅ paliers persistés en base · ✅ cérémonie du haut fait · ✅ annonce dans le fil de la communauté · ✅ rattrapage d'XP initial · ✅ XP au fil de l'eau · ✅ « La suite pour toi » + « Tes prochaines quêtes » sur l'accueil.
❌ Restent : la table des vues (articles, reprises, vidéothèque, Polyglotte) · les déclaratifs (J'y étais, concours, sellerie) · parrainage · fidélité · assiduité (**décision semaines/jours toujours non tranchée**) · passeport · jeux Baby (clé de stockage du Mémory non vérifiée) · les Distinctions (fondateur numéroté, Premier Cercle, Bienfaiteur) · rebrancher l'ancien `EcranBadges` sur `hype_paliers`.

---

## 💎 SESSION 78 (03/08) — RATTRAPAGE D'XP POUR LES CAVALIERS DÉJÀ AVANCÉS

**Décision de Blandine**, et elle est juste : « ce n'est pas très fair-play pour ceux qui étaient là en premier ». Dominique a lu beaucoup de cours avant que le système de familles existe — il ne doit ni les relire, ni y perdre.

**Rien n'avait été remis à zéro** (le moteur d'XP n'a jamais été touché, et `coursTermines` garde tout l'historique). Ce qui manquait, c'était l'inverse : **verser l'XP des marches déjà acquises**.

### Comment c'est fait
Au **premier passage** d'un cavalier (aucune ligne dans `hype_paliers`), l'app additionne l'XP de toutes les marches déjà franchies, la verse **une seule fois** via `setXp`, et affiche `CeremonieRattrapage` : « Tes quêtes ont changé · Tout ce que tu avais déjà accompli a été compté. Tu ne recommences rien. » + le total d'XP + le nombre de marches.
**Aucune diffusion dans le fil pour le rattrapage** (décision de Blandine) : onze annonces d'un coup tueraient l'effet des vraies cérémonies.

### ⚠️ CORRECTIF D'UN BUG QUE J'AVAIS INTRODUIT EN SESSION 77
`premierPassage` valait `true` quand `hypeChargerPaliers()` renvoyait `null` — c'est-à-dire **table injoignable** (hors ligne, RLS, SQL pas encore passé). Sans XP en jeu c'était inoffensif ; **avec le rattrapage, l'XP aurait été reversée à chaque ouverture hors ligne.** Corrigé : si la lecture échoue, l'app ne sème rien et ne verse rien. **Le verrou d'unicité, c'est la base — jamais le téléphone.** Vaut comme règle générale : toute récompense unique doit être gardée par une ligne en base, pas par un état local.

### Conséquence attendue
Un cavalier avancé va **prendre plusieurs niveaux d'un coup** à sa première ouverture des Quêtes. C'est voulu, et l'écran de bienvenue l'explique au lieu de le laisser deviner.

### Vérifications
`allerVersGalop` = 3 · 388 const · 1 fonction nouvelle (`CeremonieRattrapage`), 0 perdue · 15 blocs inline valides · rendu Playwright sans nouvelle erreur.

### Reste ouvert sur l'XP
L'XP des marches **futures** n'est toujours pas versée automatiquement à chaque franchissement — seul le rattrapage initial l'est. À brancher dans un lot dédié (au même endroit que la cérémonie), une fois l'écran validé en ligne.

---

## 🏅 SESSION 77 (03/08) — LES FAMILLES À PALIERS SONT EN PLACE (11 familles + cérémonie + annonce)

**Part de la 76.** L'ancien `EcranQuetes` (9 344 caractères) est **supprimé et réécrit** à sa place — méthode par ancres de texte, jamais de déplacement de bloc. `allerVersGalop` = 3, 388 const, **aucune fonction perdue**, 15 blocs inline valides, chaque nouvel identifiant défini **exactement une fois** (vérifié un par un). Rendu Playwright : mêmes 2 erreurs hors ligne qu'avant, aucune nouvelle.
⚠️ **`hype-paliers.sql` À EXÉCUTER AVANT DE POUSSER** (ou juste après) : sans la table, l'écran s'affiche et compte correctement, mais **aucune cérémonie ne se déclenche et rien ne part dans le fil**.

### Ce qui remplace les 11 quêtes plates
**11 familles, 4 rayons en onglets** (Mon cavalier · Mes chevaux · Ma communauté · Mon savoir). Chaque carte **se retourne** au toucher sur ses marches, avec l'XP de chacune et le badge au bout. Marche franchie en or, suivante cerclée de turquoise.

| Rayon | Famille | Marches | Compteur réel |
|---|---|---|---|
| Cavalier | Les 7 Galops | 1→7, un badge par Galop | `profil.galop` |
| Chevaux | Mon écurie | 1·2·3·5·10 | `ctx.chevaux` (hors `ch-demo`) |
| Chevaux | Fiches complètes | 1·2·3·5·10 | photo + robe + âge + un parent |
| Chevaux | Souvenirs | 1·5·15·30·60 | table `souvenirs` |
| Chevaux | Palmarès | 1·3·5·10·25 | table `resultats` |
| Communauté | Amis | 1·5·10·25·50 | `mesAmis()` |
| Communauté | Messages envoyés | 1·10·30·100·250 | `messages_prives.expediteur_id` |
| Communauté | Encouragements | 1·10·50·150·400 | table `likes` |
| Savoir | Cours terminés | 1·5·15·30·60 | `ctx.coursTermines` |
| Savoir | Quiz sans faute | 1·5·10·25·50 | `quizResultats` ≥ 100 |
| Savoir | Hey Baby | 1·10·30·50·100 | `conversations_heybaby` (role user) |

XP affiché par marche : **10 · 20 · 40 · 70 · 120** (Galops : 40 → 300).

### La cérémonie et l'annonce
`CeremonieHautFait` : sceau doré qui tombe, halo qui respire, nom du haut fait, XP, « tes amis le verront dans leur fil », bouton Continuer. Elle se déclenche **au moment exact** où une marche est franchie, jamais avant.
Diffusion via `hypeDiffusionEcurie("haut_fait", nom, null)` → onglet « Ta communauté » de la cloche pour les cavaliers de l'écurie.

⚠️ **GARDE-FOU IMPORTANT — le premier passage est SILENCIEUX.** Un cavalier existant a déjà des dizaines de marches acquises : si on comparait à zéro, **11 hauts faits partiraient d'un coup dans le fil**. Donc à la première ouverture (aucune ligne en base pour ce cavalier), tous les paliers sont enregistrés **sans cérémonie ni annonce**. Les suivants seuls sont fêtés. Une seule cérémonie à la fois, même si deux marches tombent ensemble.

### ⚠️ Ce que ce lot ne fait PAS
- **L'XP n'est pas encore versée.** Les valeurs sont affichées, mais le moteur d'XP n'est **pas** touché — y brancher 11 familles d'un coup pouvait dérégler les niveaux existants. À faire dans un lot dédié, avec une décision : est-ce qu'on rattrape l'XP des marches déjà acquises, ou seulement les futures ?
- **14 familles de la spec (session 74) ne sont pas là** : celles qui demandent la table des vues (articles, reprises vues/tracées, vidéothèque, Polyglotte), les déclaratifs (J'y étais, concours, sellerie), le parrainage, la fidélité, l'assiduité, le passeport, les jeux Baby. Une ligne discrète en bas de l'écran annonce que d'autres familles arrivent — **pas de cartes grises « Bientôt »**, conformément à la décision du 02/08 (« je ne veux plus que ça pourrisse les pages »).
- **Assiduité toujours non tranchée** (semaines vs jours) : rien codé.
- **Distinctions** (Membre fondateur numéroté, Premier Cercle, Bienfaiteur) : maquettées, pas codées.

### Points de vigilance pour la suite
- Les compteurs passent par `hypeCompter()` qui fait un `count exact head` et **renvoie 0 en cas d'erreur** : une famille qui resterait à 0 sans raison = nom de colonne à revérifier, pas un bug d'affichage.
- **Les jeux Hype Baby ont été volontairement écartés** de ce lot : la clé de stockage de la progression du Mémory n'a pas été vérifiée, et j'ai refusé de deviner.
- L'ancien `EcranBadges` est **intact** et toujours masqué. Ses `palierAtteint` restent écrits en dur : à rebrancher sur `hype_paliers` quand cet écran-ci sera validé en ligne.

### Préparation Flutter
`hypeMarcheAtteinte`, `hypeFicheComplete` et `HYPE_FAMILLES` sont des données et des fonctions **pures** — transposables en Dart sans réécriture. La persistance en base (et non en `localStorage`) était de toute façon un prérequis Flutter.

---

## 🧭 SESSION 76 (03/08) — « LA SUITE POUR TOI » + « TES PROCHAINES QUÊTES » SUR L'ACCUEIL

**Part de la 75 (les 4 correctifs).** Diff = **3 hunks, purement additifs** : +149 lignes de code neuf avant `EcranUnivers`, +1 ligne d'appel en haut de l'accueil, +1 ligne d'appel en bas. **Aucune ligne existante modifiée. Aucun SQL. Aucune image.**
✅ 5 nouvelles fonctions (`BandeauSuiteHype`, `BlocProchainesQuetes`, `hypeQuetesASuivre`, `hypeJourIndex`, `hypeUtiliserAmis`), **0 fonction perdue**, 388 const inchangés, `allerVersGalop` = 3, 15 blocs inline valides. Rendu Playwright : mêmes 2 erreurs hors ligne qu'avant (fichiers images absents + réseau coupé), aucune nouvelle.

### Le manque comblé
Blandine : « quand ils se connectent, voir quoi faire après ». L'accueil ne donnait **aucune direction** — il fallait ouvrir les Quêtes et chercher soi-même. Et l'écran des Quêtes n'affichait de toute façon que 3 quêtes en cours sur les restantes.

### Ce qui est ajouté
1. **En haut de l'accueil, sous les annonces** : une **seule ligne** « La suite pour toi » = hexagone + la quête la plus pertinente + son XP + chevron. Un tap mène à l'écran exact où l'accomplir (`q.cible`).
2. **En bas de l'accueil, avant What's up** : « Tes prochaines quêtes » = 3 lignes cliquables + **« Voir toutes tes quêtes »**, qui est désormais le **deuxième chemin vers l'écran Quêtes** depuis l'accueil (il n'y avait que le bandeau de niveau de la page Cavalier).

### Les deux règles de tri (décidées avec Blandine)
- **Uniquement les quêtes faisables depuis le canapé.** Constante `HYPE_QUETES_MAISON`. Les familles qui dépendent de la vraie vie (concours, lieux, Galop passé) ne proposeront **jamais** rien : elles se rempliront quand ça arrivera, et le haut fait tombera avec sa cérémonie. Blandine : « quelqu'un va pas en concours tous les jours ».
- **Rotation quotidienne.** `hypeJourIndex()` (numéro du jour) fait tourner la liste : la proposition change chaque jour et **jamais deux jours de suite la même**. Vérifié par test : `cours → notifs → ami → cours → notifs → ami`.
- **Écran vide traité** : si tout est accompli, le bloc ne se vide pas, il invite à ouvrir un chapitre non lu.

### Notes techniques
- **Lecture seule, zéro base** : tout est calculé depuis `HYPE_QUETES_DECOUVERTE` (déjà traduit en 6 langues, donc **3 chaînes nouvelles seulement** : le kicker, le titre du bloc, le lien). Une seule requête réseau ajoutée, `mesAmis()`, via `hypeUtiliserAmis()`.
- Les composants sont définis **juste avant `EcranUnivers`** (disponibles au rendu) et **n'écrasent rien**.
- Teinte respectée (`teinteHypeActive` / `teinteRGBA`), icônes réutilisées de `qIcone`, hexagones cohérents avec l'écran Quêtes.

### ⚠️ Ce que ce lot ne fait PAS (et pourquoi)
La **refonte en 25 familles à 5 marches** (spec complète en session 74) n'est **pas** dans cette livraison. Elle demande les deux tables (`hype_paliers`, `hype_vues`), la cérémonie du haut fait, l'annonce dans le fil et ~300 chaînes de traduction. Livrer les deux ensemble aurait mélangé un ajout sûr et un gros chantier dans le même fichier — la règle de Blandine. **Prochaine livraison = ce chantier, avec son SQL.**
⚠️ **Point de vigilance pour cette suite** : le déclencheur de l'annonce (« Blandine vient d'accomplir le haut fait X ») **exige** de persister les paliers en base. Les quêtes sont recalculées à chaque rendu : sans persistance, le haut fait serait réannoncé à chaque affichage.

### Préparation Flutter
Rien de spécifique. `hypeQuetesASuivre(ctx, amisCount)` est une fonction **pure** (aucun accès DOM, aucun React) : elle se transpose telle quelle en Dart, et c'est volontaire.

---

## 🔧 SESSION 75 (03/08) — QUATRE CORRECTIFS CIBLÉS (albums + 2 quêtes) · md5 à relever après push

**Part de l'index en ligne fourni par Blandine : md5 `c7ecb4f2`, 10 432 470 octets.** Diff final = **exactement 4 lignes modifiées, 4 hunks**, aucune ligne ajoutée ni supprimée. 895 fonctions + 388 const identiques avant/après. `allerVersGalop` = 3. Les 15 blocs script inline valides (`node --check`). Rendu Playwright : erreurs identiques au fichier d'origine (⚠️ le rendu hors ligne échoue de la même façon avant ET après — fichiers `hype-images-*.js` absents du bac à sable et réseau coupé, donc le test ne prouve que l'absence de régression, pas que la page s'affiche).

**Livraison volontairement SANS aperçu** : la modifier aurait ajouté un 5ᵉ hunk (`DEV_OUVRIR_PAGE`) et cassé la propriété « diff de 4 lignes exactement ». Test direct dans l'app.

### 1 · Albums de chevaux : la visibilité mentait (signalé par Blandine — « le mien est en privé par défaut »)
Ce n'était **pas** un désaccord avec la décision du 02/08, mais une **incohérence entre deux lectures de la même donnée** :
- `creerAlbumCheval` (ligne 703) n'écrivait **pas** la colonne `visibilite` → l'album naissait à `NULL`.
- Le **filtrage en lecture** (ligne 694) traite `NULL` comme **public** → la règle opt-out était respectée.
- Le **panneau de réglages** (ligne 30797) traitait `NULL` comme **privé** (`albOuvert.visibilite || "prive"`) → Blandine voyait « Privé » allumé.

➡️ **L'album était donc réellement public alors que l'interface affichait Privé** — plus dangereux qu'un bug de visibilité franc. Deux correctifs : `visibilite: "public"` écrit explicitement à la création, et le panneau aligné sur `|| "public"`.
⚠️ **Les albums déjà créés restent à `NULL` en base** : ils s'afficheront correctement, mais `albums-visibilite.sql` (livré, non destructif, idempotent) les aligne sur `public` et pose la valeur par défaut de la colonne. **Pas encore exécuté par Blandine.**

### 2 · Quête « Mets une photo sur un de tes chevaux » ne se validait jamais
Elle testait `c.photo_url`. Or les chevaux du **contexte applicatif** portent le champ **`photo`** — `photo_url` est le nom de la **colonne en base**, pas celui de l'objet côté app. La propriété testée n'existait jamais. Corrigé en `(c.photo_url || c.photo)` pour couvrir les deux formes.

### 3 · Quête « Écris la philosophie de ton écurie » ne se validait jamais
Elle teste `ctx.profil.ecurie_voix`. Mais l'hydratation du profil du contexte à la connexion (ligne 24368) recopie une **liste blanche de champs** — pseudo, ecurie, ecurie2, email, avatar, histoire, ville — et **`ecurie_voix` n'y était pas**. Le texte était bien en base (`TableauxSpectralHype` relit son propre profil), simplement invisible du contexte. `ecurie_voix` et `ecurie_histoire` ajoutés à la liste blanche.
⚠️ **Leçon générale** : toute quête / tout compteur qui lira un champ du profil doit vérifier que ce champ est bien dans cette liste blanche, sinon il restera éteint pour toujours sans erreur visible.

### Préparation Flutter
Rien fait. Note utile quand même : les trois bugs de cette session viennent de la **même famille de causes** que ceux du 02/08 — une donnée lue par deux chemins qui ne l'interprètent pas pareil, ou un champ renommé entre la base et l'objet client. Un modèle de données typé (Flutter/Dart) rendrait ces trois bugs impossibles à écrire.

### Prochaine livraison
**Lot 1 de la refonte des quêtes** (spécification complète en session 74) : les 13 familles calculables, les paliers persistés en base, la cérémonie du haut fait, l'annonce dans le fil, « La suite pour toi » sur l'accueil + « Tes prochaines quêtes » en bas de l'accueil. Nécessite le SQL des deux tables (`hype_paliers`, `hype_vues`) — **feu vert de Blandine pas encore donné**. Découpé exprès en deux livraisons pour ne jamais mélanger un correctif et un gros chantier dans le même fichier (règle de Blandine).

---

## 🏅 SESSION 74 (03/08) — REFONTE DES QUÊTES EN FAMILLES À 5 MARCHES · SPÉCIFICATION VALIDÉE + MAQUETTE

**Aucun code livré. Aucune modification de `index.html`.** Session de conception avec Blandine : la spécification ci-dessous est arrêtée avec elle, la maquette autonome `maquette-quetes-familles.html` est livrée pour validation visuelle. Rien n'est intégré avant son accord.

### Le constat de départ
Blandine : « on ne voit s'afficher que celles déjà réalisées, ça ne donne pas d'objectifs ». Vérifié dans l'index :
- `HYPE_QUETES_DECOUVERTE` contient **11 quêtes plates**, booléennes, non répétables. Blandine en a 9 sur 11.
- `EcranQuetes` n'affiche **jamais plus de 3 quêtes en cours** (1 vedette + 2 minis) — le reste est résumé par une ligne « +N autres ». Avec 2 quêtes restantes, la section est minuscule et les 9 cartes dorées mangent l'écran.
- **Total des 11 quêtes = 150 XP, alors qu'un niveau coûte 200 XP.** Le système ne peut structurellement pas faire monter d'un niveau.
- ⚠️ **Bug à vérifier** : les 2 quêtes non validées chez elle (`photo-cheval`, `philosophie-ecurie`) devraient probablement l'être — ses chevaux ont des photos et elle a écrit la devise de l'écurie. Soit `ctx.profil` n'est pas rafraîchi après écriture, soit la photo est rangée ailleurs que `photo_url`. **Non diagnostiqué, à reprendre.**

### Découverte majeure : le système existe déjà à moitié
`BADGES_I18N` (ligne ~19457) contient 13 badges dont **10 déjà construits en paliers** avec exactement la mécanique demandée (« Sans faute » 1/10/25 quiz, « Grand lecteur » 5/15/30 articles, « Esprit curieux » 10/30/100 questions), chaque palier ayant ses points. **Mais `palierAtteint` est écrit EN DUR dans la table (`-1` ou `0`) et jamais recalculé : ces badges sont décoratifs.** Et l'écran `EcranBadges` est masqué depuis le 02/08 avec les 4 sections « Prochainement » (`AFFICHER_SECTIONS_BIENTOT = false`).

➡️ **Décision d'architecture : on ne crée pas un troisième système, on marie les deux existants.** Une famille de quête = un badge à paliers. Les 11 quêtes actuelles deviennent la **marche 1** de leur famille. Rien n'est jeté, rien ne fait doublon.

### La structure arrêtée
- **5 marches par famille**, XP **10 · 20 · 40 · 70 · 120** (une famille complète = 260 XP, un peu plus d'un niveau).
- **Un badge nommé au bout de chaque famille.**
- **25 familles rangées en 4 rayons** (onglets) : Mon cavalier · Mes chevaux · Ma communauté · Mon savoir. Le rangement est nécessaire : 25 cartes à plat sur iPhone = un mur illisible.
- **La carte se retourne** (flip) pour montrer ses 5 marches, la marche atteinte allumée en or, la suivante cerclée de turquoise.
- **Les 7 Galops = 7 badges, un par Galop**, déclenchés sur le changement de `profil.galop` (le champ existe, et `majProfil` sait déjà comparer l'ancienne et la nouvelle valeur — c'est le mécanisme de « a rejoint l'écurie »). 150 à 250 XP par Galop. Idée d'une famille « % du Galop en cours » **abandonnée** par Blandine : doublon avec « Cours terminés ».
- **Distinctions hors familles, non progressives, non rattrapables** : Membre fondateur numéroté (rang calculable depuis `created_at`, **à figer** une fois attribué), Premier Cercle (seuil à annoncer publiquement), Bienfaiteur (le libellé « membre d'honneur » existe déjà en 6 langues dans `EcranPremium`).

### Les 25 familles
| Rayon | Famille | Marches | Badge |
|---|---|---|---|
| Cavalier | Les 7 Galops | un par Galop | 7 badges |
| Cavalier | Fidélité | 1 mois · 3 · 6 · 1 an · 2 ans | Pilier du Cercle |
| Cavalier | Assiduité | 2 · 4 · 12 · 50 · 100 **semaines** | Flamme cristal |
| Cavalier | Passeport de cavalier | par section | Mémoire vive |
| Chevaux | Mon écurie | 1 · 2 · 3 · 5 · 10 chevaux | Grande écurie |
| Chevaux | Fiches complètes | 1 · 2 · 3 · 5 · 10 | Généalogiste |
| Chevaux | Souvenirs | 1 · 5 · 15 · 30 · 60 | Gardien des souvenirs |
| Chevaux | Concours (participation) | 1 · 3 · 5 · 10 · 25 | Grand compétiteur |
| Chevaux | Palmarès (classements) | 1 · 3 · 5 · 10 · 25 | Collectionneur de flots |
| Chevaux | Achats en sellerie | 1 · 3 · 5 · 10 · 20 | Ambassadeur de la sellerie |
| Chevaux | Produits identifiés | 1 · 3 · 5 · 10 · 20 | Fan de mode |
| Communauté | Amis | 1 · 5 · 10 · 25 · 50 | Populaire |
| Communauté | Messages | 1 · 10 · 30 · 100 · 250 **cavaliers différents** | Toujours un mot |
| Communauté | Likes & commentaires | 1 · 10 · 50 · 150 · 400 **publications différentes** | Bonne compagnie |
| Communauté | J'y étais | 1 · 3 · 5 · 10 · 20 lieux | Grand voyageur |
| Communauté | Cavalier sans frontières | 1 · 2 · 3 · 5 · 10 pays | Sans frontières |
| Communauté | Parrainage | 1 · 3 · 5 · 10 · 25 filleuls | Bâtisseur |
| Savoir | Cours terminés | 1 · 5 · 15 · 30 · 60 | Élève studieux |
| Savoir | Quiz sans faute | 1 · 5 · 10 · 25 · 50 | Sans faute |
| Savoir | Articles lus | 1 · 5 · 15 · 30 · 50 | Grand lecteur |
| Savoir | Hey Baby | 1 · 10 · 30 · 50 · 100 | Esprit curieux |
| Savoir | Polyglotte | 2 · 3 · 4 · 5 · 6 langues | Polyglotte |
| Savoir | Reprises visualisées | 1 · 2 · 3 · 4 · les 6 | L'œil du juge |
| Savoir | Reprises tracées à la main | 1 · 2 · 3 · 4 · les 6 | Par cœur |
| Savoir | Jeux Hype Baby | 1 · 5 · 15 · 30 · 60 parties | Le compagnon d'Apy |

### Ce qui est calculable AUJOURD'HUI sans rien créer
`amis` (mesAmis) · chevaux · fiches complètes · souvenirs · palmarès (`resultats`) · messages (`messages_prives`) · likes (`likes`) · commentaires (`commentaires`) · cours terminés · quiz 100 % · Hey Baby (`conversations_heybaby`) · jeux Baby (progression Mémory déjà sauvegardée et synchronisée) · Galops (`profil.galop`).

### Ce qui demande un compteur qui n'existe pas
- **Articles lus** : aujourd'hui un simple booléen `localStorage` (`hypeQueteVue`), pas un compteur.
- **Polyglotte** : idem, booléen local.
- **Assiduité** : rien n'est stocké. Compter en **semaines de présence**, pas en jours d'affilée (un cavalier monte le samedi, une série en jours se casse et décourage).
- **Reprises vues / tracées** : les 4 modes existent (`voir`, `tracer`, `challenge`, `immersion`) et le catalogue fait **6 reprises** (g3, g4, g5, g6, g7, clubelite), mais aucune trace n'est enregistrée. ➡️ Réutiliser la forme de `visites_articles` : une ligne par « reprise + mode ».
- **J'y étais / pays / événements** : `annoncerVisiteEcole` fait déjà exactement ce geste (mémorise + diffuse un haut fait dans le fil). À étendre avec un champ lieu/pays et un bouton « J'y étais » sur les fiches `EVENEMENTS` (Lamotte).
- **Fidélité** : la date de début d'abonnement n'est pas enregistrée côté Hype (statut Stripe sans historique). Version 1 : n'allumer que la marche 1.
- **Passeport de cavalier** : n'existe pas, chantier à part. Blandine : « on le fera après ».
- **Parrainage + Achats en sellerie** : voir ci-dessous.

### Annonce dans le fil (demande explicite de Blandine)
« Blandine vient d'accomplir le haut fait Populaire », visible par ses amis. **La plomberie existe** : `hypeDiffusionEcurie(type, extrait, cible)` + table `notifications` + onglet « Ta communauté » de la cloche + les bulles dorées « haut-fait » du fil. ⚠️ **Mais le déclencheur manque** : les quêtes sont recalculées à chaque rendu (`fait(ctx)`), il n'existe aucun *moment* de complétion. ➡️ **Il faut persister l'état de chaque famille/palier** (table ou colonne Supabase) pour détecter la transition une seule fois et ne pas re-annoncer à chaque affichage. C'est la même brique que les paliers : à faire une fois, elle sert aux deux.

### Décisions produit encore ouvertes
- **Le Galop est déclaratif** : on annonce le Galop déclaré tel quel (un enfant peut cocher Galop 7 le premier jour), ou seulement ce que l'app a vraiment vu ? **Non tranché.**
- **« J'y étais » est déclaratif** : recommandation = demander une photo pour valider (crédible sans police, et ça nourrit les albums). **Non tranché.**
- **Parrainage** : n'existe pas du tout. Demande un **code unique par compte** + attribution à l'inscription + une règle anti-abus (le filleul doit avoir fait quelque chose). Récompense à décider — attention, offrir du Premium a un coût Stripe réel.
- **Sellerie / Demi Volte** : Hype ne verra **jamais** un code promo utilisé sur un site tiers. Deux chemins : déclaratif (version 1), ou **code personnel par cavalier** chez Demi Volte, qui rend le badge vérifié et permet de savoir qui rapporte quoi. ➡️ **Question posée à Blandine, sans réponse : Demi Volte accepte-t-il plusieurs codes, et y a-t-il un tableau de bord d'affiliation ?** Même plomberie que le parrainage, à construire d'un coup.
- **Un seul champ** sur la photo en version 1 (« acheté chez », liste fermée). **Jamais de champ libre** — c'est exactement comme ça qu'est né le problème d'identification des écuries.
- **Dons** : encaisser via Stripe est simple, mais un versement à une société n'est pas un don au sens fiscal en France, aucun reçu. À vérifier avec la comptable avant d'employer le mot « don ».

### Règle à ne pas oublier à l'implémentation
**Les objectifs des jeux et des vidéos doivent être écrits en RELATIF** (« tous les niveaux disponibles », « toutes les vidéos »), jamais en absolu (« les 10 niveaux »). Le Mémory a des niveaux incomplets, le Poney d'Or est vide, la bibliothèque vidéo grandit : un badge déjà gagné redeviendrait incomplet chez tous les enfants le jour d'un ajout.

### Livré cette session
- `maquette-quetes-familles.html` — maquette autonome : hero de niveau, rail des Distinctions, 4 rayons en onglets, grille des 25 familles, **carte qui se retourne** sur ses 5 marches, exemple de la phrase du fil. Interrupteur « seules les familles calculables aujourd'hui » pour voir d'un coup ce qui marcherait sans plomberie. Design Hype Spectral, échelle de marches en hexagones (reprise de `.qte-hex`).
- ⚠️ `hype-video.js` **non fourni** cette session : la famille « Vidéos de démonstration » n'a pas pu être chiffrée et n'est pas dans la maquette.

### Préparation Flutter
Rien fait cette session (aucun code produit). À noter pour plus tard : la structure « une famille = une ligne de données (nom, badge, 5 seuils, source du compteur) » est portable telle quelle, et le fait de persister les paliers en base plutôt qu'en `localStorage` est un prérequis Flutter de toute façon.

---

## 🎬 SESSION 73 (02/08) — LA BIBLIOTHÈQUE VIDÉO EST ENFIN ATTEIGNABLE

🔴 **À pousser** : `index.html` · `hype-video.js` · `SUIVI.md` · **`images/hype-encart-video.jpg`** (nouveau, 139 Ko) · et pour la Réserve : `images/hype-anim-rideaux.mp4` + `.webm` + `-poster.jpg`, `images/hype-anim-cheval.*`, `images/hype-accueil-01..12.mp4` + leurs 12 affiches.

⚠️ **DÉFAUT MAJEUR TROUVÉ ET CORRIGÉ : la Bibliothèque vidéo n'était atteignable par AUCUN bouton.** La route `ecran === "videos"` existait, l'écran était monté, mais la seule carte 🎬 qui y menait vivait dans `EcranDashboard` — un composant **jamais appelé** (code mort, comme `EcranParcours`/`EcranProfilSetup`). La page était donc invisible depuis sa création.
- **Correctif** : nouveau composant `EncartBibliothequeVideo({ compact })`, déclaré juste avant `EcranBibliothequeGalops`, **appelé à deux endroits** (choix de Blandine) : bas de la page Galops, après les dépliants ; bas de Culture équestre (`EcranArticles`), après l'encart Hey Baby.
- **Aucun 8ᵉ onglet dans la NavBar** : elle en a déjà 7, un huitième écraserait les libellés.
- Visuel : cheval blanc dans les cristaux, `images/hype-encart-video.jpg` (fourni par Blandine, PNG 2,2 Mo → JPG 139 Ko). **La gauche de l'image est volontairement sombre et vide** pour recevoir le texte — règle 18 de la Bible. Dégradé horizontal par-dessus pour garantir la lisibilité.
- Le compteur de vidéos est lu dynamiquement dans `window.HYPE_VIDEO` ; si `hype-video.js` n'est pas chargé, l'encart s'affiche sans compteur au lieu de planter.

## ⚠️ `hype-video.js` — FUSION AVEC LA VERSION EN LIGNE, À POUSSER AUSSI
Le fichier livré **repart de la version en ligne (7 vidéos, `v-incurvation-01`)** et n'écrase rien :
- Les 7 vidéos conservées **dans leur ordre exact**, `v-incurvation-01` avant `v-aides-01` — cet ordre décide de la vidéo principale d'un chapitre (`parCours` respecte l'ordre du tableau). Vérifié : `parCours("g4-incurvation")` → `v-incurvation-01` en premier.
- 🐛 **Bug corrigé** : `"g4-incurvation"` était absent de la table `CHAPITRES` → la bibliothèque affichait l'identifiant brut « g4-incurvation » sous les vignettes au lieu du titre. Ajouté dans les 6 langues.
- ➕ **RÉSERVE D'ANIMATIONS** (visible **uniquement** pour `HYPE_MODERATEURS` via `estModerateurHype`) : 20 animations en 4 familles (Accueil, Bibliothèque, Palmarès ×4, Mascotte ×2, + 12 scènes « à trier »). Vignette, destination, durée, poids, état réel. Boutons **Télécharger**, **Écarter**, **Réafficher tout**.
  - ⚠️ « Écarter » masque la ligne en **localStorage**, il ne supprime PAS le fichier : un bouton dans l'app n'a aucun droit d'écriture sur GitHub. La suppression réelle se fera au push suivant.
- ➕ **Lecteur de fichiers locaux** (`src.type === "fichier"`) : `<video controls>` WebM + MP4, pour lire les animations depuis `images/`.
- ➕ **Animation des portes en fond de l'en-tête** de la bibliothèque (provisoire, « on peaufinera plus tard »). Lue **une seule fois, sans boucle**, muette (sinon iOS refuse la lecture auto), `playsInline`, voile assombri. `prefers-reduced-motion` → image fixe. Replis : affiche JPG puis dégradés.

## 🎞️ ANIMATIONS — RÉENCODAGE ET DÉFAUTS TROUVÉS
- **Tous les fichiers fournis étaient en HEVC (H.265) dans des `.mov` avec piste audio** : Safari les lit, Chrome et Firefox souvent pas. Réencodés en **H.264 profil Main + faststart, audio retiré** (obligatoire pour la lecture auto) : les 12 scènes passent de **31 Mo à 4 Mo**, la tête de cheval de 1,88 Mo à 202 Ko, les portes de 1,46 Mo à 388 Ko.
- ✅ **`palmares-vert/dore/bordeaux/crystal.mp4` et `heybaby-dodo/messagerie.mp4` étaient DÉJÀ propres** (H.264, sans audio). ⚠️ **Correction d'une affirmation fausse de ma part** : j'ai prétendu plusieurs fois que la verte en ligne était en HEVC et invisible sur Android — **c'était faux**, seule la source `.mov` l'était. Rien à réparer.
- ✅ **FAUTE D'ORTHOGRAPHE INCRUSTÉE — RÉGLÉE PAR MASQUAGE** (02/08). Les deux animations finissaient sur le logo HYPE suivi d'un slogan fauté : « TON UNIVERS **ÉQUESREE** » (cheval) et « TON UNIVERS **ÉQUESTIEE** » (portes). Les portes étant en fond de l'en-tête, la faute allait être visible en ligne.
  - **Méthode retenue, meilleure qu'une coupe** : le slogan apparaît sur fond noir en fin d'animation → `drawbox` noir sur la seule ligne du slogan, activé à partir de l'image où le fond devient noir (`enable='gte(n,112)'` pour les portes, `gte(n,130)` pour le cheval). **Le mot HYPE et le monogramme sont conservés** (Blandine : « le H ou Hype seul ne me dérangent pas ») et **la durée complète de 5,1 s est gardée** — aucune seconde perdue.
  - **Contrôlé par mesure de luminosité, pas à l'œil** (les images extraites ne sont pas relisibles ici) : portes → bande du slogan 219 → **16**, bande du mot HYPE **255** (intacte), rien de modifié avant l'image 112. Cheval → slogan 196 → **37**, HYPE **245**. ⚠️ Le premier cache posé sur le cheval laissait dépasser du texte (mesure à 231 sur la bande élargie) : coordonnées corrigées à `x=470 y=318 w=370 h=58`, deuxième essai validé. Affiches JPG refaites depuis les versions nettoyées.
  - Coordonnées du cache, si un réexport oblige à refaire : portes (864×496) `x=240 y=334 w=390 h=36` ; cheval (854×480) `x=470 y=318 w=370 h=58`.
- 🟡 **RESTE À CORRIGER : le filigrane « Ai » / « 03 »** de l'outil de génération, en haut à gauche des deux animations. **Volontairement PAS masqué** : contrairement au slogan, il se trouve sur la scène elle-même et non sur du noir, donc un cache se verrait. **Blandine refera les animations plus tard** (décision du 02/08 : « laisse-le avec sa faute, on verra plus tard, je la referai »).
  - Fichiers concernés : **`hype-anim-rideaux`** (les portes qui s'ouvrent — celle EN USAGE, en fond de l'en-tête de la Bibliothèque vidéo) et **`hype-anim-cheval`** (tête de cheval sur ciel étoilé — en réserve, pas encore placée). Chacune en `.mp4` + `.webm` + `-poster.jpg`.
  - ⚠️ Au réexport : demander l'animation **sans aucun texte incrusté**, ni slogan ni filigrane. Le titre et le slogan seront posés en HTML par-dessus — c'est la règle 18 de la Bible, et c'est indispensable sur une app en 6 langues (un slogan gravé en français s'afficherait tel quel pour un cavalier japonais ou allemand).
- Les 12 scènes sont nommées `hype-accueil-01..12` **provisoirement** : toutes dans le même registre turquoise sombre (mesuré), ce ne sont pas des variantes d'un même visuel mais des scènes différentes (silhouettes, saut, dressage, jambes, pansage). **Blandine doit les visualiser et les renommer** ; celles qui relèvent du saut partiront ailleurs.

✅ **Vérifs session 73** : `node --check` sur les 14 blocs script inline + sur `hype-video.js` · **diff exhaustif des fonctions ET des const top-level dans les deux sens** : aucune perdue, une seule ajoutée (`EncartBibliothequeVideo`) · **`allerVersGalop` = exactement 3 occurrences** (régression historique n°1) · rendu simulé de l'encart **dans les 6 langues**, variantes normale et compacte, aucun `undefined` · repli testé sans `hype-video.js` chargé (pas de plantage, compteur masqué) · rendu simulé des 2 écrans de la bibliothèque dans les 6 langues (258 nœuds) · `parCours` vérifié sur les 4 chapitres.

⚠️ **Pas de rendu Playwright** : il faudrait les 120+ fichiers `hype-images-*.js`. **À ouvrir sur iPhone après le push.**

⚠️ **Pour la suite, repartir de CETTE version (73)**.

---

**Version actuelle de l'index.html : 02/08/2026 (session 72) — md5 c7ecb4f2 — 9,28 Mo, UN SEUL FICHIER (le découpage des Galops a été annulé, voir INCIDENT). Saine : 142 blocs script sur 142 valides. 29 correctifs cumulés. **En ligne et fonctionnelle.** ⚠️ QUOTA SUPABASE : projet restreint le 04/08 si l'organisation reste au-dessus du quota.**

**Version précédente : 31/07/2026 (nuit, session 71) — md5 7ce45f5d, 10 361 735 octets. Saine : 14 blocs script sur 14 valides, 1 525 fonctions, 0 erreur JS au rendu.**

## 🟠 SESSION 72 (02/08) — VISIONNEUSE ZOOMABLE + TITRES DE CHAPITRE + PLAN DE DÉCOUPAGE

**Livré, à pousser :** `index-lot2.html` — md5 `63c9d591`, 10 370 942 octets. 14 blocs script sur 14 valides.
Sur GitHub, le fichier doit s'appeler **`index.html`** : les noms `index-lot2`, `index-visionneuse` ne servent qu'à distinguer les versions dans le fil de discussion.

**Chaîne des livraisons de la session (chacune contient la précédente) :**
| Fichier | md5 | Contenu |
|---|---|---|
| index.html | `31a55258` | Vidéo Performances seule — filet de sécurité |
| index-visionneuse.html | `93c64486` | + zoom des photos |
| index-lot2.html | `63c9d591` | + titre « Liens & partage » — **version à pousser** |

### Corrigé
1. **Vidéo de cérémonie figée** sur la page Performances (panneau `palmares`). `autoPlay` était absent sur ce panneau alors qu'il était présent sur la fiche : la vidéo restait sur sa première image avec les contrôles natifs par-dessus. Ajout `autoPlay` + `preload: "auto"` + `ref` de secours relançant `.play()` (2e tentative à 120 ms si iOS refuse au montage) ; `controls` retiré pour rester sur une boucle pure identique à la fiche.
2. **Plantage au zoom sur photo** (sortie complète de l'appli). Cause trouvée : il n'y avait **aucun zoom** — un simple `<img>` sans gestionnaire. Le calque de balayage posé par-dessus lisait `changedTouches` **sans compter les doigts** : un pincement passait pour un balayage et déclenchait le chargement d'une AUTRE photo pleine résolution pendant que la première se décodait encore → pic mémoire → iOS tue l'onglet. Nouveau composant `PhotoZoomHype`, **sans état React** (transform écrit directement sur l'élément, zéro re-rendu pendant le geste) : pincement, double-tap, déplacement à un doigt, bornage à l'écran, verrou multi-touch (plus aucun balayage dès qu'un 2e doigt touche, jusqu'à ce que tous soient levés). Ancien calque supprimé. **À l'échelle 1, rendu identique au pixel.**
3. **Titre vertical « Liens & partage » superposé à un autre chapitre.** Son bloc était en `position: absolute` sans conteneur `position: relative`, contrairement à Performances / Médias / Le fil / Santé : il s'ancrait à un ancêtre lointain et remontait en haut de page. Conteneur manquant ajouté, une ligne.

### Diagnostiqué, PAS corrigé (bloqué sur décision)
- **Mise en page des vidéos / vignettes à moitié noires.** Ce n'est pas du CSS : ce sont des images en cours de téléchargement, rendues progressivement. Le rail charge **chaque photo en résolution d'origine** dans une case de 108 × 132 px, et **double la liste** (`lR.concat(lR)`) dès 4 médias pour boucler le défilement. Plusieurs dizaines de Mo tirés d'un coup. Même famille de cause que le plantage au zoom. Correctif retenu : vignettes redimensionnées côté serveur Supabase (~320 px), avec repli automatique sur l'original — donc sans risque si le plan n'est pas encore Pro.

### ⚠️ EN ATTENTE CÔTÉ BLANDINE
- **Passer Supabase en plan Pro — 25 $/mois** par organisation (1er projet inclus, crédit compute 10 $ = instance Micro ; **laisser le Spend Cap activé**). Elle a validé le principe le 02/08 mais n'était pas disponible pour le faire. **À lui rappeler en début de session tant que ce n'est pas fait.** Nécessaire pour les transformations d'image, et de toute façon inévitable : le Free plafonne à 1 Go de stockage de fichiers, 5 Go d'egress/mois, et met le projet en pause après 7 jours sans requête. Vigilance long terme : l'egress est le compteur qui surprend (0,09 $/Go au-delà de 250 Go) — servir des originaux de 4 Mo dans des cases de 108 px est exactement ce qui le fera exploser.
- **Bug « virer onglet vidéo »** : formulation mangée par l'autocorrect. Supprimer l'onglet Vidéos de la seconde page, ou l'encart « Ses vidéos » de la fiche ? Non tranché, donc non touché.
- **Bugs Boréalis (lecture vidéo, agrandissement, image en ligne)** : savoir si ça touche d'autres chevaux. Cas isolé = donnée en base ; général = code.

### 🔴 LES 16 BUGS DE BLANDINE — ÉTAT
**Fiche cheval :** 1 titres verticaux ✅ · 2 mise en page vidéos ⏸ (attend Pro) · 3 onglet vidéo en doublon ⏸ (attend formulation) · 4 masquer « Toutes ses photos » dès 2 albums ⬜ · 5 choisir les photos/vidéos mises en avant ⬜ *(fonctionnalité, maquette à faire)* · 6 plantage au zoom ✅ · 7 résultats qui ne s'affichent pas ⬜ · 8 lecture vidéo Boréalis ⏸ · 9 agrandissement vidéo Boréalis ⏸ · 10 image en ligne Boréalis ⏸
**Écurie :** 11 chevaux fantômes ⬜ · 12 publication sur le fil ⬜
**Club :** 13 palmarès pas à jour ⬜ · 14 cadre photo persistant ⬜ · 15 image validée ≠ image affichée ⬜ · 16 carré jaune non fonctionnel ⬜

### 🏗️ CHANTIER ARCHITECTURE (préparation Flutter) — ÉTAPE 1 FAITE, RESTE EN ATTENTE
Décision prise avec Blandine le 02/08 : **les bugs d'abord, l'extraction ensuite.** Raison : chaque extraction déplace des blocs ; corriger des bugs par-dessus rendrait impossible d'attribuer une régression.

Inventaire mesuré de l'index (9,21 Mo) :
| Section | Poids |
|---|---|
| contenu_galop1_i18n | 2,34 Mo |
| 02_donnees_complementaires | 2,05 Mo |
| 04_dashboard | 1,65 Mo |
| 05_ecrans_galops | 0,75 Mo |
| 06_quiz_examen | 0,57 Mo |
| 07_articles_videos_stats | 0,40 Mo |
| 08_assistant_ia | 0,20 Mo |
| 01_contexte | 0,18 Mo |
| 09_profil + 03_auth + 00_core + 10_admin | 0,35 Mo |

**Constat : plus de la moitié du monolithe n'est pas du code, c'est du contenu** (cours, QCM, traductions). C'est là qu'il faut commencer, et c'est **la seule partie dont une future migration Flutter héritera vraiment** — découper les composants React en `/features` n'apporterait rien à un portage Dart, où tout serait réécrit. Ce qui traverse la migration : le contenu, le schéma Supabase, les tokens de design.

Argument concret supplémentaire : à 9,21 Mo, **GitHub refuse d'ouvrir l'index dans son éditeur web**. Chaque sortie de contenu rend une part du projet réellement éditable depuis l'iPhone.

**Première extraction prête à lancer :** `contenu_galop1_i18n` → `/content/hype-contenu-galop1.js`. 2,34 Mo qui sortent d'un coup. Même motif que les 129 `<script src>` déjà en place (variable globale, chargée avant usage) : aucun bundler, rien à installer, déplacement pur, rollback en recollant le bloc. **En attente de la fin des bugs.**

### Règle de travail adoptée le 02/08
Jamais un correctif et une extraction dans le même fichier. Sinon on ne peut plus attribuer une casse à l'un ou à l'autre, et on perd la sécurité qui justifie le chantier. Les deux fronts avancent en alternance, chaque livraison isolée.

---

### 🔄 SUITE DE LA SESSION 72 — 7 BUGS CORRIGÉS

**Fichier à pousser : md5 `79dcd33f`** (dossier `a-pousser/index.html`, déjà nommé correctement).
Chaîne cumulative : chaque livraison contient les précédentes.

| # | Bug | Cause trouvée |
|---|---|---|
| — | Vidéo Performances figée | `autoPlay` absent sur le panneau `palmares` |
| 1 | Titres verticaux superposés | `chapPartage` en `absolute` sans conteneur `relative` |
| 2 | Vignettes à moitié noires | photos chargées en résolution d'origine dans des cases 108×132, liste doublée pour la boucle |
| 6 | Plantage au zoom | **aucun zoom n'existait** ; le calque de balayage lisait `changedTouches` sans compter les doigts → un pincement chargeait une autre photo pleine résolution pendant le décodage de la première → OOM, iOS tue l'onglet |
| 11 | Chevaux fantômes Écurie | 7 fiches démo `CHEVAUX_FICHE` affichées alors qu'elles sont migrées en base → doublons ; + `mesChevaux` ∪ `mesChevauxLies` sans dédoublonnage |
| 12 | Publication fil Écurie figée | cible passée à `ecurie:<profil.id>` le 27/07, mais `estMembreEcurie()` compare des NOMS → toujours faux → `publier()` sortait en silence |
| 13 | Palmarès club périmé | la page ne lisait que la table `resultats`, jamais `chevaux.palmares` |
| 17 | Histoire du cheval inécrivable | `window.prompt` natif d'une ligne ; Safari a durci l'accès au presse-papiers ; 3 sorties silencieuses |

**Nouveaux éléments dans l'index :** `PhotoZoomHype` (zoom sans état React), `vignetteHype` + `replierVignette` (transformations Supabase avec repli), `ouvrirEditHistoire` / `sauverHistoireCheval` / `collerDansHistoire` (éditeur d'histoire).

### 🔴 BLOQUÉ SUR DÉCISION DE BLANDINE
1. **Supabase Pro (25 $/mois)** — validé sur le principe, pas encore fait. Le code des vignettes fonctionne quand même (repli sur l'original). **À redemander chaque session.**
2. **SQL `cheval_id` sur `resultats`** — sans cette colonne, impossible d'afficher sur la fiche d'un cheval un résultat de la table. C'est le bug 7. Script à préparer avant tout code.
3. **Bug 3** — formulation mangée par l'autocorrect : supprimer l'onglet Vidéos de la seconde page, ou l'encart « Ses vidéos » de la fiche ?
4. **Bugs 8/9/10 (Boréalis)** — cas isolé (donnée en base) ou général (code) ?
5. **Bugs 14/15 (club)** — recherche à l'aveugle abandonnée, il faut une repro précise.

### 📌 DÉCISIONS D'ARCHITECTURE PRISES LE 02/08
- **Un seul point d'écriture par donnée.** L'histoire du cheval s'édite depuis la fiche Cheval uniquement ; les autres pages l'affichent sans jamais l'écrire. Motif : les bugs 7/13 et 12 viennent tous d'une donnée à deux chemins d'écriture désynchronisés.
- **Jamais un correctif et une extraction dans le même fichier.**
- **Les bugs d'abord, l'extraction ensuite.**

### ⚠️ DETTE REPÉRÉE, NON TRAITÉE (hors périmètre des 16 bugs)
- **`window.prompt` subsiste 9 fois** ailleurs dans l'index. Même piège qu'au bug 17 : champ natif d'une ligne, inutilisable pour de la saisie longue. À auditer.
- **Les flots et coupes sont écrits EN DUR** dans `CHEVAUX_FICHE`, récupérés par un secours qui cherche **par nom**. C'est ce qui les avait fait disparaître le 31/07. Ils s'évanouiront à nouveau si un nom change d'une lettre, et aucun cavalier autre que Blandine ne peut en ajouter. **Méritent leur propre table**, comme le palmarès.
- **Le rail double la liste des médias** (`lR.concat(lR)`) dès 4 éléments pour boucler le défilement : le coût réseau est doublé. Les vignettes réduites atténuent, ne suppriment pas.
- **Les grilles Souvenirs / club / Écurie** chargent probablement encore des originaux. `vignetteHype` n'a été appliqué qu'au rail de la fiche, un endroit à la fois.

---

### 🚨 URGENT — QUOTA SUPABASE, ÉCHÉANCE 04/08/2026
Bannière constatée le 02/08 à 12h07 : *« Organization exceeded its quota in the previous billing cycle. Projects will be restricted from 04 Aug, 2026 if your organization remains over quota. »*
**Un projet restreint = API muette = Hype à l'arrêt** (connexion, photos, résultats, fil). Le passage en Pro (25 $/mois) n'est plus une optimisation, c'est une échéance : il fait passer le stockage de 1 Go à 100 Go et l'egress de 5 Go à 250 Go.
**En attente :** le détail de « Review usage » pour savoir quel compteur est en cause. Si c'est l'egress, c'est bien le diagnostic des vignettes — mais le correctif ne réduit que la consommation À VENIR, pas celle déjà comptée sur le cycle écoulé.

### ✅ BASE DE DONNÉES — MIGRATIONS PASSÉES LE 02/08
`resultats` compte désormais **11 colonnes** (vérifié) :
`id`, `user_id`, `concours`, `classement`, `photo_url`, `media_url`, `created_at`, **`cheval_id`** (uuid, FK chevaux, on delete set null), **`cavalier_id`** (uuid, FK profiles, on delete set null), **`cavalier_statut`** (text, default `attente`), **`annee`** (text).
`albums_cheval` a reçu **`visibilite`** (text, default `public`).
Index créés : `resultats_cheval_id_idx`, `resultats_cavalier_idx`.

### ✅ BUG 7 CORRIGÉ — LE SCHISME DES RÉSULTATS EST REFERMÉ
Fichier md5 `fe46ce63` (10 correctifs cumulés).
- La fiche cheval **lit** les deux sources : table `resultats` filtrée sur `cheval_id`, + anciennes entrées `chevaux.palmares`. Rien n'est perdu.
- Elle **n'écrit plus que dans la table**. On arrête d'alimenter la colonne JSON, sinon le schisme se recrée.
- Conséquence : un résultat saisi sur une fiche apparaît maintenant aussi sur la page club et dans le fil.
- 3 sorties silencieuses remplacées par des messages explicites (fiche non en base, pas connecté, échec).
- `annee` écrite avec repli automatique sur `created_at` si la colonne manque.
- Nouveaux éléments : état `resDb`, liste fusionnée `palmTous`, `sauverResultat()` réécrit. `prow()` inchangé (même forme d'objet).

### 📋 MODÈLE DE CONSENTEMENT ARRÊTÉ LE 02/08
Après discussion : **opt-in pour désigner quelqu'un, opt-out pour ses propres albums.**
Règle retenue : *ton contenu, ton choix — le nom de quelqu'un d'autre, son accord.*
- **Albums** : publics par défaut, l'auteur peut basculer en privé. Colonne `visibilite`.
- **Désignation d'un cavalier sur un résultat** : `cavalier_statut = 'attente'` jusqu'à acceptation. Réutilise le mécanisme `identifications` existant (déjà en opt-in) — **aucune bascule, donc zéro régression sur les tags photo déjà posés**.
- Piste ouverte par Blandine, à exploiter plus tard : les résultats portent déjà un champ `auth` (`officiel` / `confirme` / `declare` / `perso`). Un résultat `officiel` venu de la FFE est un fait public vérifié et pourrait s'afficher sans accord ; un résultat saisi à la main reste `perso` et demande l'accord. Le vrai critère est la **provenance**, pas le consentement.

### ⏭️ LIVRAISONS PRÉVUES (dans cet ordre)
1. **Finir les bugs** — 3, 8, 9, 10, 14, 15, 16 (tous bloqués sur une info de Blandine, cf. plus haut).
2. **Désigner le cavalier monté** — opt-in, notification, acceptation.
3. **Visibilité des albums** — public par défaut, bascule en privé.
4. **Bug 5** — choisir les photos/vidéos mises en avant (fonctionnalité, maquette d'abord).
5. **Extraction `/content/hype-contenu-galop1.js`** — 2,34 Mo.

Recommandation donnée à Blandine : finir les bugs avant les fonctionnalités. Le SQL est en place et ne se périme pas ; un bug se voit tous les jours par les ambassadeurs.

---

### 🔄 FIN DE SESSION 72 — 13 CORRECTIFS · md5 `c3e0eae0`

| # | Bug | Cause / décision |
|---|---|---|
| 3 | Onglet vidéo « en doublon » | **Faux doublon.** L'encart « Ses vidéos / Le voir en mouvement » est une carte-porte dont la destination EST l'onglet Vidéos. Ce n'était pas une redondance mais un chemin incomplet : les vidéos ne pouvaient pas s'agrandir à l'arrivée. Rien supprimé. |
| 8·9 | Vidéos Boréalis : lecture et agrandissement | Le plein écran était **désactivé volontairement** dans les DEUX visionneuses (`controlsList: "nofullscreen"` + `disablePictureInPicture`). Retiré. Et l'onglet Vidéos lisait les vidéos dans leur petite case sans jamais ouvrir la visionneuse : la vignette devient un bouton qui l'ouvre en plein écran, avec navigation. |
| 18 | Animation mal cadrée sur la bannière d'accueil | *(nouveau, signalé le 02/08)* En `cover` elle était rognée à droite ; passée en `contain` le 01/08 elle flottait dans une boîte de 432 px qui n'a pas son format. **La bannière prend désormais la forme de la vidéo** : format lu au chargement des métadonnées, hauteur de l'en-tête ajustée, recalculée à chaque rotation. Repli sur la hauteur CSS + `hero-img` si le fichier ne charge pas. |
| — | Wordmark HYPE en doublon sur l'accueil | L'animation de Blandine contient déjà le mot. Wordmark retiré (Design Bible : le texte ne répète pas l'image). La baseline « Bienvenue dans l'univers **de** » restait en suspens sans lui → remplacée par **TON UNIVERS ÉQUESTRE**, baseline autonome déjà validée sur la page de connexion, 6 langues, interlettrage ouvert à 3,4. |

**À savoir sur l'animation :** `hype-anim-cheval.mp4` est un fichier **créé par Blandine** (ChatGPT + CapCut). Ce n'est PAS un placeholder à remplacer — c'est un élément de sa direction artistique. Utilisée à deux endroits : bannière d'accueil et carte-porte « Ses vidéos » de la fiche cheval.

**Trace laissée volontairement :** l'animation CSS `hypeGlow` (halo turquoise pulsant) était attachée au mot HYPE retiré. Elle est encore déclarée mais plus utilisée — 3 lignes inoffensives, non supprimées faute de demande.

### 🎯 RÈGLE PRODUIT FIXÉE LE 02/08
**Toute photo et toute vidéo chargée par un utilisateur doit pouvoir s'afficher en grand.** C'est le minimum exigé par Blandine.
État réel : tenu sur la fiche cheval et les albums nommés. **PAS tenu** ailleurs — le fil, l'Écurie, le club, la communauté utilisent trois mécanismes distincts (`PhotoZoomHype`, `PhotoZoomable`, `setZoomImg` × 18 sites) ou aucun.
**Obstacle identifié :** la visionneuse est écrite À L'INTÉRIEUR de `FicheCheval`. Les autres écrans ne peuvent pas l'appeler. Pour appliquer la règle partout il faut **l'extraire en composant autonome** — c'est le premier morceau vraiment utile du chantier d'architecture, et le même remède que pour les résultats, l'histoire et le mur : un seul chemin par besoin.

### 🔴 ENCORE OUVERT
1. **Quota Supabase — 04/08.** Toujours en attente du détail de « Review usage ».
2. **Bugs 14 et 15 (club)** — cadre photo persistant, image validée ≠ image affichée. Recherche à l'aveugle abandonnée deux fois : **il faut une repro précise**.
3. **Bug 10** — image en ligne de Boréalis anormale. Isolé ou général ?
4. **Bug 16** — carré jaune. Recommandation : le supprimer. En attente de validation.
5. **Bug 5** — photos/vidéos mises en avant. Fonctionnalité, maquette d'abord.
6. **Désignation du cavalier** (opt-in) et **visibilité des albums** (opt-out) — SQL en place, code à écrire.
7. **Extraction de la visionneuse**, puis `/content/hype-contenu-galop1.js`.

---

### 🔄 SUITE SESSION 72 — 22 CORRECTIFS · md5 `be04e691`

| Sujet | Cause / décision |
|---|---|
| Résultats repliés au chargement | L'onglet par défaut était figé sur `coupes`, même pour un cheval sans coupe — la pilule n'était alors pas affichée et la bande restait vide jusqu'au premier tap. S'ouvre désormais sur ce que le cheval possède : coupes s'il en a, sinon résultats. Bascule unique si les coupes arrivent de la base après le 1er rendu. |
| Mise en page de l'histoire perdue | Sans règle `white-space`, les retours à la ligne du textarea sont repliés par le navigateur → pavé. `pre-wrap` les conserve. |
| Histoire tronquée | `-webkit-line-clamp: 12` coupait les textes longs sans moyen de les dérouler. Affichage complet dans le panneau Souvenirs. |
| Texte coupé à droite + page décalée latéralement | Même cause : un élément dépassait la largeur de l'écran, rendant la fiche scrollable horizontalement. Garde-fous de confinement (`overflow-x`, `min-width:0`, coupure des mots longs — une URL collée dans l'histoire suffisait). **L'élément fautif n'a pas été identifié nommément.** |
| Bloc IPO / race / âge | Déplacé dans la carte Origines, une ligne discrète sous le pedigree. Bloc dédié supprimé (2 710 octets) → l'histoire remonte. Le crayon de l'indice n'ouvre plus un `window.prompt` mais un panneau à deux champs (sigle + valeur). **Un `window.prompt` de moins, il en reste 8.** |
| Bannière d'accueil entassée | Hauteur fixe de 432 px retirée : la vidéo passe dans le flux (`width:100%` + `height:auto`), le navigateur applique son format natif — **le calcul JS ajouté plus tôt dans la session a pu être supprimé**. 30 px en haut, 30 px avant Mon profil. |
| Ancienne photo aperçue au chargement | L'image de secours `hero-img` était visible par défaut alors que son seul rôle est de couvrir un échec. Opacité 0, révélée uniquement sur `onError` (où la hauteur 432 px revient aussi). |

### 🔒 TROUVAILLE IMPORTANTE — LES ALBUMS PRIVÉS N'ÉTAIENT PAS PRIVÉS
Le système de visibilité existait **déjà** (`public` / `partage` / `prive`, icône, libellé, panneau de membres dans l'en-tête de l'album ouvert). Mais `listerAlbumsCheval` **ne regardait pas la visibilité** : un album passé en privé restait visible par tout le monde. Le réglage existait et ne servait à rien.
Filtrage ajouté **à la source** (seul point de lecture des albums → toutes les surfaces en héritent). Un album privé n'est visible que par son auteur.
**⚠️ Reste ouvert :** le statut `partage` n'est toujours pas appliqué — les règles d'appartenance ne sont pas connues, elles n'ont pas été devinées. Un album « partagé » reste visible par tous, comme avant. **Question à Blandine : qui doit voir un album partagé ?**

### ⚠️ INCIDENT DE MÉTHODE — DOUBLON ÉVITÉ DE JUSTESSE
Une bascule public/privé a été écrite puis **retirée** : le système existait déjà. Un commentaire a été laissé à sa place dans le code pour éviter qu'une prochaine session recrée le doublon. **Leçon : chercher l'existant avant d'ajouter, y compris quand la fonctionnalité semble absente à l'usage — elle peut exister mais ne pas être appliquée.**

### 🔍 BUG 19 (nouveau, non corrigé)
Verso de la carte Origines : grand vide sous les informations. Le verso est en `position: absolute; inset: 0` dans une carte dont la hauteur ne suit pas son contenu. **Confirmé par Blandine comme antérieur à cette session.** Le verso lui-même est correct : la grille passe à une colonne quand il n'y a aucun grand-parent, donc « PÈRE — / MÈRE — » signifie simplement que le cheval n'a pas d'origines renseignées.

### 🔍 PISTE NON VÉRIFIÉE
Le crayon « Modifier les origines » n'apparaît que si `!CHEVAUX_FICHE[id]`. Les 7 chevaux de démonstration étant **migrés en base** depuis le 30/07, la condition pourrait bloquer l'édition sur de vrais chevaux possédés. Même famille que les chevaux fantômes. **À vérifier avant de corriger** — le crayon était bien visible sur une capture de My Dream, donc la condition n'est peut-être pas celle qui s'applique.

---




## 🏗️ PRÉPARATION FLUTTER — SESSION 72 (02/08/2026)


### 🔄 SESSION 72 — DERNIÈRE SÉRIE · md5 `15c20971` (27 correctifs)

| Sujet | Cause / décision |
|---|---|
| **Décalage latéral au retour sur l'appli** | Indice décisif : la barre de navigation du bas se décalait aussi — elle est fixée à l'écran, donc c'était **la page entière** qui glissait, pas un conteneur intérieur. Deux causes cumulées, deux correctifs : **ceinture** (`overflow-x:hidden` + `max-width:100%` sur `html`/`body`) et **bretelle** (remise à zéro du défilement horizontal à chaque fois que la page redevient visible — Safari **mémorise** cette position et la rejoue au réveil, il suffit d'avoir glissé une fois pour que le décalage revienne indéfiniment). Défilement vertical volontairement intact : la position de lecture est préservée. |
| **Bouton retour de Mon Club au milieu de l'écran** | Il était en `position: absolute` dans un conteneur placé APRÈS la bannière et les onglets — donc en plein milieu de page — alors que son décalage `env(safe-area-inset-top)` supposait qu'il soit en haut. Passé en `position: fixed`, coin haut-gauche, verre fumé de la fiche cheval. **Un second bouton au code identique (écran de gestion de l'écurie) volontairement NON touché : son conteneur est bien en haut de page.** |
| **Sections « Prochainement » de la page Cavalier** | Masquées à la demande de Blandine (« je ne veux plus que ça pourrisse les pages »). Elles n'étaient visibles que par les modérateurs, d'où le fait qu'elle les voyait et pas les cavaliers. Constante unique `AFFICHER_SECTIONS_BIENTOT = false` — **rien n'est supprimé**, une ligne à repasser à `true`. **L'XP et la montée de niveau ne sont PAS touchés**, ils continuent en arrière-plan comme demandé. |
| **Baseline d'accueil superposée à la vidéo** | Sortie du bandeau, placée SOUS la bannière. Motif de Blandine : superposée, sa position dépendait du contenu de la vidéo — au prochain changement d'animation elle tomberait sur l'encolure ou par-dessus un texte du fichier. Ombre portée retirée (inutile hors image), opacité 0,78 → 0,72. **Le bandeau superposé a entièrement disparu de l'accueil.** |

---

### 🔎 TROUVAILLE — LES POINTS DE LA PAGE ÉCURIE N'EXISTENT PAS
Blandine : « pourquoi Mon Club a si peu de points comparé à Mon Écurie ? »
**Réponse : « 1 560 POINTS HYPE », « 18 VICTOIRES », « 27 CLASSEMENTS », « NIVEAU ÉLITE » ne sont nulle part dans le code.** Chaque libellé a été cherché, aucun n'y figure. **Ces chiffres sont imprimés dans l'image elle-même** (poster spectral du cheval). Ce sont des pixels, pas des données.

**Conséquences :**
1. **Risque réel :** un cavalier va les croire vrais. Il verra « 18 victoires » et pensera que l'appli les compte ; le jour où il en gagne une et que rien ne bouge, il croira à un bug. Pire, **ces chiffres sont identiques pour tous les chevaux qui utilisent ce visuel.**
2. **Il n'y a donc qu'UN seul système de points réel** : l'XP de Mon Club (130/200, niveau 1). La question des deux systèmes concurrents ne se pose pas.
3. **Les vrais chiffres sont désormais calculables** : depuis le correctif du bug 7, les résultats sont reliés aux chevaux via `resultats.cheval_id`. On peut compter pour de vrai victoires et classements.
**À proposer avec maquette :** remplacer les chiffres peints par les chiffres calculés.

---

### 📄 INVENTAIRE LIVRÉ — `INVENTAIRE-portes-ecurie-club.md`
11 portes recensées vers `ecurie` et `guilde`. **Seules 3 posent problème** ; les 8 autres ne nomment même pas leur destination et ne doivent pas être touchées.

🔴 **La collision principale, trouvée :** sur la page Écurie, le badge **« Club officiel » n'est pas un badge, c'est un lien vers Mon Club.** Pilule turquoise, coche, libellé descriptif — rien n'indique qu'il change de page, et il porte le même texte que le badge de Mon Club. **C'est la cause directe de la confusion**, pas seulement la ressemblance des deux pages. À trancher : vrai bouton assumé (« Voir le club → ») ou badge non cliquable.

Les deux autres : les libellés « Mon écurie » / « Gérer mon écurie » de l'écran Partager, et l'encart d'accueil (titre + sous-ligne « Ton univers », qui reste le doublon avec la baseline).

**⏸️ Tout est en pause à la demande de Blandine** : « touche à rien, j'ai encore du mal avec ces deux pages, j'ai l'impression d'avoir tout en double ». Elle a raison, et l'inventaire le confirme.

---

### 💡 FONCTIONNALITÉS CONÇUES AVEC BLANDINE — MAQUETTE AVANT CODE

**1. « Passeport équestre » → une page « Mon parcours ».**
Idée de Blandine : le bloc vide devient une page à part, avec **le retour du globe** (3 100 clubs OSM déjà en base) et, en dessous, le parcours décrit. Son exemple : *« 6 mois cavalière chez France Sloothaak, Dortmund »*.
**Ce n'est pas une carte d'épingles, c'est un CV équestre** — ça se montre à un employeur, à un propriétaire, à un club. Probablement la fonctionnalité la plus concrètement utile évoquée ce jour.
Structure : durée · rôle · écurie · lieu · catégorie. **Catégories retenues : travail, concours, vacances** (Blandine a maintenu « travail » malgré son ambiguïté possible — « ils comprendront »).
**Résumé sur la page Cavalier, sous le titre :** une ligne de drapeaux des pays + nombre d'écuries, façon `🇫🇷 🇩🇪 🇧🇪 · 7 écuries`, avec dépassement `+2`. La page Cavalier montre **où**, la page Parcours raconte **quoi**.
**Confidentialité — solution trouvée par Blandine, meilleure que les 3 que j'avais proposées :** ne pas arbitrer un défaut, **poser la question au moment où le cavalier remplit sa carte**. Le consentement est demandé quand il a du sens, personne ne subit un réglage qu'il n'a pas compris, et **le problème de l'âge disparaît** (l'appli ne connaît pas l'âge de façon fiable — champ déclaratif souvent vide). Le libellé devra dire ce qui est visible, pas être une formule vague, et la réponse devra être modifiable à tout moment depuis la carte.
**Réserve maintenue :** le nom « Passeport » désigne déjà le document du cheval (onglet Santé de la fiche cheval). Deux passeports pour deux choses sans rapport, c'est le mécanisme exact qui a fait perdre ses repères à Blandine entre Écurie et Club. Proposition : **« Mon parcours »**. Non tranché.
**Point sensible à prévoir :** écrire « 6 mois chez France Sloothaak » engage le nom d'un tiers qui n'a rien validé. À terme, distinguer les passages confirmés par l'écurie des passages déclarés — comme le champ `auth` le fait déjà pour les résultats.

**2. « Dernières performances » avec choix du cavalier.**
Blandine : « certains cavaliers n'aiment pas la compétition ». La section revient, mais chacun choisit de la remplir ou de la masquer de sa page. Masquée pour l'instant avec les autres.

---


## 🧊 À FAIRE À FROID — DISSOLUTION DE LA PAGE ÉCURIE
> Décidé par Blandine le 02/08 en fin de session, **volontairement remis à plus tard**.
> Rien n'a été codé. Ne pas entamer sans relire cette section en entier.

### La décision
Blandine, après avoir fait elle-même l'inventaire : *« En vrai on a déjà tout sur le profil et sur les pages chevaux, non ? Qu'est-ce qu'elle apporte de plus ? »*
**Réponse : rien.** Chaque élément de la page Écurie a déjà une maison ailleurs — bannière et philosophie → la structure ; chevaux → leurs fiches ; fil → le cavalier ; badge « Club officiel » → Mon Club. **La page se dissout.** Plus besoin de la renommer « Ma vie équestre », plus besoin de trancher le badge : les deux problèmes disparaissent avec elle.

### 🔴 LA PREUVE QUE LE PROBLÈME ÉTAIT RÉEL
Blandine a écrit la devise du club **en croyant être sur la page du club**. Elle était sur la page Écurie.
Ce n'est pas une étourderie : c'est la démonstration que les deux pages sont indiscernables, et que la confusion **produit déjà des données mal rangées**. Si ça arrive à celle qui a conçu l'appli, ça arrivera à tous les cavaliers.

### ⚠️ PIÈGE TROUVÉ AVANT DE SUPPRIMER — À NE PAS OUBLIER
Blandine pensait avoir déjà remis sa philosophie sur Mon Club. **Ce n'est probablement pas le cas.** Un commentaire du code dit textuellement :
> « Colonnes profil `club_voix` / `club_histoire` **inutilisées désormais** (laissées en place) » · la page Club affiche « une PHRASE PAR DÉFAUT visible par tous ».

Donc : le texte de Blandine est dans **`ecurie_voix` / `ecurie_histoire`**, et Mon Club affiche une **devise générique**, pas la sienne. Les colonnes `club_voix` / `club_histoire` existent mais ne sont plus lues.

**Retirer l'onglet maintenant rendrait son texte inaccessible** — pas supprimé, il reste en base, mais plus affiché et plus modifiable.

### L'ORDRE OBLIGATOIRE
1. **Vérifier** : ouvrir Mon Club et regarder si la philosophie affichée est bien « Faites du cheval un compagnon et non un esclave ». Si c'est un autre texte, le piège est confirmé.
2. **Brancher** Mon Club sur les bons champs (`club_voix` / `club_histoire`), ou faire lire `ecurie_*` par la page Club. Trois lignes, pas un chantier.
3. **Migrer** le texte existant de `ecurie_voix` → `club_voix` (SQL court, à préparer et à lire avant de lancer).
4. **Vérifier à l'écran** que le texte de Blandine s'affiche bien sur Mon Club.
5. **Alors seulement** retirer l'onglet Écurie de la barre du bas.

> **On branche, on vérifie, on migre, puis on retire. Jamais dans un autre ordre.**

### Ce qui devient inutile une fois la page dissoute
- Le renommage « Ma vie équestre » / « Ma vie » (6 langues) — annulé.
- L'arbitrage du badge « Club officiel » (information ou porte) — annulé, il ne reste que sur Mon Club.
- Le télescopage avec la baseline d'accueil « TON UNIVERS ÉQUESTRE » — annulé.
- La question « l'écurie privée compte-t-elle ? » reste ouverte, **mais** la réponse retenue est : si oui, ce sera **la même page que Mon Club avec un état « privée »**, jamais une seconde page.
- Un onglet de moins dans une barre où « Communauté » est déjà tronqué en « Communaut ».

### Restent à reloger avant suppression
| Contenu | Destination |
|---|---|
| Bannière de l'écurie (`ecurie_photo`) | Mon Club |
| Philosophie (`ecurie_voix`) | Mon Club (`club_voix`) |
| Histoire (`ecurie_histoire`) | Mon Club (`club_histoire`) |
| Chevaux | déjà sur leurs fiches — rien à faire |
| Fil (`ecurie:<profil.id>`, mur **personnel**) | page Cavalier — **à trancher**, c'est le seul point non résolu |
| Bouton « Anciennes bannières » | suit la bannière |

---


## 🚨 INCIDENT DU 02/08 — PANNE DE L'APPLI, ~30 MINUTES · CAUSE : MOI

**Ce qui s'est passé.** L'extraction du contenu des Galops vers `hype-galops.js` a mis l'application hors service. Erreur remontée par l'écran maison « Un caillou dans le sabot » :
```
global code@.../hype-galops.js:195:532
```
Ligne 195, colonne 532 : `"src": GALOPS_HERO`.

**La cause, et c'est une erreur de conception de ma part.** J'ai traité le contenu des Galops comme des **données pures**. Il ne l'est pas : il référence des constantes définies **dans l'index**, qui se charge APRÈS le fichier extrait. La variable n'existait donc pas au moment de l'exécution → arrêt net.

**Ampleur mesurée après coup — 17 constantes externes référencées :**
`HYPE_IMGS` **159 fois**, `GALOPS_HERO` 10 fois, `GALOPS_I18N` 2 fois, plus 14 constantes d'infographies et de couvertures (`INFOG_*`, `COUV_*`, `PHOTO_ROBES_G2`).

**Pourquoi mes contrôles ne l'ont pas vu.** `node --check` valide la **grammaire** d'un fichier, pas l'**existence** des variables qu'il appelle. Les 142 blocs étaient syntaxiquement parfaits. **À AJOUTER AUX CONTRÔLES : avant toute extraction, vérifier que le code déplacé ne référence aucun identifiant défini ailleurs.**

**Déroulé, pour mémoire.** Fausses pistes explorées avant de trouver : nom/emplacement du fichier (il était bon), fichier tronqué (3,06 Mo, complet), service worker (il n'intercepte AUCUNE requête et se désinscrit — innocent). Ce qui a fait perdre du temps : le premier envoi de l'index de secours n'a pas remplacé le fichier (GitHub affichait encore 6,89 Mo). **Repère fiable retenu : la TAILLE du fichier sur GitHub, pas l'horodatage.** Version à un seul fichier ≈ 9,95 Mo · version découpée ≈ 6,89 Mo.

**Résolution.** Retour à l'index à un seul fichier, md5 `e8d7131c`, 28 correctifs. **L'appli remarche.** `hype-galops.js` reste sur GitHub, ignoré.

**Le découpage reste faisable, mais autrement :** sortir les constantes d'images en même temps, OU charger le fichier après elles, OU remplacer les références par des chaînes résolues au rendu. **À reprendre à froid, jamais en fin de session.**

**Point révélé au passage :** Blandine n'a **aucun moyen de forcer une mise à jour** chez ses utilisateurs. Le service worker actuel (`sw.js`, dit « de retrait ») n'intercepte rien — c'était volontaire après un incident du 26/07 — mais du coup, si une version casse, on ne peut rien pousser à distance. À traiter un jour.

---

## 💡 PARTAGE & PARRAINAGE — état réel et pistes

### Ce qui existe
- **Écran `partager`** complet : lien public `LIEN_APP`, bouton de partage natif, et **QR code généré dans l'appli** (`qrHype`, encodeur autonome, aucun appel externe). Bien fait.
- Accessible depuis **deux endroits** : un bouton d'en-tête à côté du profil, et une cellule de raccourcis de l'accueil (aux côtés de Classement, Hauts faits, Installer).
- Cet écran masque la barre de navigation du bas (il figure dans `ecransSansNav`).

### ❌ Ce qui n'existe PAS : le parrainage
Les deux seules occurrences du mot « parrainage » dans tout le code concernent le **patronage royal de l'École Andalouse**. Aucun mécanisme de filleul, aucun lien nominatif, aucune récompense.

**La différence, et elle compte :** un lien de partage est le même pour tous — on ne sait pas qui a amené qui. Un lien de parrainage porte l'identifiant du parrain : l'appli sait qui a amené ce cavalier et peut le récompenser.

**Levier de croissance réel avec les ambassadeurs.** Mégane, Evan et Liam amenant chacun cinq cavaliers, ça change l'échelle.
**À construire :** une colonne notant qui a parrainé qui, un lien de la forme `#p=<identifiant>`, et la règle de récompense — **décision produit, pas technique** (mois de Premium ? badge ? classement ?).

### 🎯 DEMANDE DE BLANDINE — accès au partage depuis la Communauté
« C'était prévu mais un rollback l'a retiré. » Le code a disparu, il faut le **reconstruire**, pas le retrouver.
**Décision : les deux formes**, elles ne servent pas au même moment.
1. **Ligne discrète** — « Inviter des cavaliers », mène à l'écran `partager` existant. Une ligne, aucun risque, aucune image. **À faire en premier.** Pour celui qui a déjà décidé d'inviter.
2. **Encart image façon affiche** — celui qui donne envie, vu en défilant. **Bloqué sur deux éléments :**
   - **✅ L'IMAGE EST VALIDÉE (02/08).** Blandine a fourni **deux versions d'un QR code cristal** (turquoise néon dans un cristal taillé, étoile centrale) :
     · **fond noir avec socle de pierre, fumée et éclats de cristal en suspension** → **c'est celle-ci pour l'encart Communauté.** Elle a un décor, une profondeur, une mise en scène : elle tient seule dans une carte et passe le test Porsche.
     · **fond transparent** → outil pratique, se pose sur n'importe quel fond (bannière, story). Contraste légèrement plus faible entre les modules et le fond du code : **à revérifier après compression Instagram** si elle est mise en story.
     · QR code testé et fonctionnel par Blandine. **Garder `qrHype` (générateur intégré) en parallèle** : il produit un code toujours lisible, sans habillage — secours si le lien change ou si un cavalier n'arrive pas à scanner la version cristal.
   - **✅ LE TEXTE EST ARRÊTÉ (02/08).** Deux formulations distinctes, parce que les deux supports ne s'adressent pas à la même personne :
     · **Le lien qu'on envoie → « REJOINS HYPE »** — s'adresse à celui qui REÇOIT. Même formule que sur les fiches chevaux partagées : cohérence entre les deux.
     · **L'encart à scanner → « PARTAGE HYPE »** — s'adresse à celui qui MONTRE. Avec une courte ligne en dessous : *« Ils scannent, ils te rejoignent. »*
     · Hiérarchie habituelle respectée : petit label → grand titre → courte phrase.
     · **Écartées :** « Partage Hype à tes amis » (on partage AVEC en français, et « à tes amis » alourdit un titre qui doit tenir en 2-5 mots) ; « Montre, ils scannent » ; « Fais entrer les tiens » (joli et très équestre — à garder en réserve).
   - **Maquette avant code**, comme l'exige la règle de travail — et à juger à l'œil frais.

### 🐛 Nouveau bug relevé le 02/08 (non corrigé)
**Carte « À la une » de la page vidéos** : le titre se superpose au texte **gravé dans la vignette IFCE** (« WEBCONFÉRENCE », « LE CONTACT : ÉLÉMENT PHYSIQUE… »). Ce n'est pas un doublon de code — ces vignettes contiennent déjà leur titre en pixels. Assombrir ne suffirait pas : on aurait deux titres lisibles au lieu de deux illisibles.
**Correctif : la carte adopte la disposition des rails** — vignette entière en haut sans rien dessus, puis titre, description, étiquettes et bouton en dessous. Les cartes des rails sont déjà impeccables, le modèle existe.
**⚠️ Cette page ne vit PAS dans l'index : elle est dans `hype-video.js`.** Fichier à demander à Blandine.

---

### 🔇 MON CLUB — GAMIFICATION MASQUÉE (02/08) · md5 `c7ecb4f2`
Constante unique `AFFICHER_GAMIF_CLUB = false`. **Rien n'est supprimé, l'XP continue de se calculer en arrière-plan.**

**Masqué :** carte Niveau/XP · bouton « Voir les quêtes du club » · compteurs Hauts faits / Résultats / Podiums · ligne de formule XP · **rangée d'onglets entre les deux clubs**.
**Conservé à sa demande explicite :** le compteur **MEMBRES** — seule donnée vraie de la bande (13, les trois autres à zéro) et cohérent avec son souhait de montrer davantage les cavaliers.

**Raisonnement de Blandine sur les onglets, à conserver :**
> *« Elle a du sens sur mon profil perso car je suis dans deux clubs, mais aucun sens sur la page club elle-même. »*

C'est juste, et c'est le principe « une page, un sujet » appliqué : choisir entre ses clubs appartient au **cavalier**. Une fois sur la page d'un club, celui-ci ne connaît qu'un seul sujet — lui-même. Un club ne propose pas de basculer vers un autre club, pas plus qu'une fiche cheval ne propose de basculer vers un autre cheval. **Le choix du club devra remonter sur le profil.**

### 🎯 LES TROIS DEMANDES À TRAITER ENSEMBLE, DANS UNE SEULE PASSE
Blandine, 02/08 : *« Garde le compteur oui et ça serait juste d'afficher en fonction de leur XP les cavaliers les plus haut en premier, et d'afficher beaucoup plus de chevaux, ne pas les laisser sur le rail défilant mais plutôt copier la présentation de ma vie équestre pour les chevaux. »*

1. **Mon Club reprend la mise en page de la page Écurie.** Décision confirmée : *« j'ai peaufiné ma page Écurie en croyant que c'était ma page Club »* → la page Écurie **est** la maquette validée. Du déplacement, pas de la création.
2. **Cavaliers classés par XP décroissant.** À vérifier : la page charge les membres, mais récupère-t-elle leur XP ? Peut-être une requête de plus.
3. **Chevaux en grille au lieu du rail défilant**, sur le modèle de la page Écurie.

**⚠️ LES TROIS DANS LA MÊME PASSE.** Poser une grille maintenant puis déplacer la mise en page plus tard = deux fois le même travail.

---
## 🧭 LA GRANDE CLARIFICATION DU 02/08 — À REPRENDRE À FROID

> **Décision de Blandine : « je veux faire ça à froid ».** Rien n'a été codé. Tout est ici.

### Ce qui s'est passé, et c'est la clé de tout
> *« En vrai j'ai peaufiné ma page Écurie en croyant que c'était ma page Club. »*
> *« Dans le cas précis c'est la devise du club, car je croyais être dessus. »*

**Blandine a écrit la devise du club sur la page Écurie, en croyant être sur Mon Club.** Ce n'est pas une étourderie : c'est la démonstration que les deux pages sont indiscernables, et que la confusion produit déjà **des données mal rangées**. Si ça arrive à celle qui a conçu l'appli, ça arrivera à tous les cavaliers.

### La décision qui en découle
**La page Écurie se dissout. Mon Club reprend sa mise en page.**
Une page, une identité, zéro doublon. Plus besoin du renommage « Ma vie équestre », plus besoin d'arbitrer le badge « Club officiel », plus besoin de trancher l'écurie privée.

**Et il n'y a rien à concevoir :** la page Écurie *est* la maquette validée de ce que Mon Club doit être. Blandine l'a peaufinée, elle lui plaît. C'est du déplacement, pas de la création.

### ✅ RECTIFICATION (02/08, fin de soirée) — LE PIÈGE N'EXISTE PAS
J'avais alerté sur un risque de perte du texte de Blandine, en me fiant à un **commentaire du code** disant que `club_voix`/`club_histoire` étaient « inutilisées désormais ». **Vérification faite dans le code réel :**

- `club_voix` et `club_histoire` ne sont effectivement **jamais lues** — elles n'apparaissent que dans `majProfil` (l'enregistrement), jamais dans un affichage. Le commentaire disait vrai sur ce point.
- **MAIS** ce que Blandine voit sur Mon Club, c'est **`ecurie_voix`** : le composant partagé `TableauxSpectralHype` est appelé avec les champs de l'écurie, avec seulement un titre différent (« la philosophie de l'écurie » / « du club »).

**Conséquence : les deux pages affichent le même texte, tiré du même champ.** Ce n'est pas un doublon de contenu mais un doublon d'affichage. Blandine avait raison de croire l'avoir mis sur Mon Club — dans un sens, c'est vrai.

**➡️ IL N'Y A DONC RIEN À REBRANCHER.** Quand la page Écurie disparaîtra, Mon Club continuera d'afficher le texte sans qu'on touche à quoi que ce soit. Le chantier est plus simple que prévu : seule la mise en page est à déplacer.

**Leçon de méthode :** un commentaire décrit le passé, pas le présent. Vérifier le code, pas les commentaires.

### ORDRE IMPÉRATIF DES OPÉRATIONS
1. **Vérifier** ce que Mon Club affiche réellement (texte de Blandine ou phrase par défaut).
2. **Brancher** Mon Club sur les bons champs. Probablement **aucun SQL** : les 4 colonnes existent déjà (`ecurie_voix`, `ecurie_histoire`, `club_voix`, `club_histoire`), elles sont juste inutilisées. Décider si on lit `ecurie_*` (le texte existe déjà) ou si on recopie vers `club_*`.
3. **Reprendre la mise en page** de Mon Club sur le modèle de la page Écurie.
4. **Vérifier** que tout s'affiche.
5. **Retirer l'onglet Écurie en dernier.**

**On ne supprime pas une page avant d'avoir relogé ce qu'elle contient.**

### Ce qui devient inutile grâce à cette décision
- ~~Renommage « Ma vie équestre » / « Ma vie »~~ — la page disparaît.
- ~~Arbitrage du badge « Club officiel »~~ — il n'y a plus qu'une page à qualifier.
- ~~Question de l'écurie privée~~ — sans objet.
- ~~Encart d'accueil « MON ÉCURIE »~~ — à repointer vers Mon Club.
- L'inventaire `INVENTAIRE-portes-ecurie-club.md` reste utile : il liste les 11 portes à repointer.

### Rappel du cadre qui a permis de trancher (`ARCHITECTURE-pages-hype.md`)
Trois sujets seulement : **le cavalier** (une personne), **le cheval** (un animal), **la structure** (un lieu collectif). Une page = un sujet. Une donnée = un seul propriétaire, un seul lieu d'écriture.
La page Écurie n'avait **aucun sujet propre** — chacun de ses contenus avait déjà une maison ailleurs. D'où l'impression de Blandine d'« avoir tout en double » : elle était mathématiquement exacte.
**Test appliqué à la devise :** « Faites du cheval un compagnon » resterait vraie si Blandine ne montait plus → elle appartient au lieu, pas à la personne. Donc à Mon Club, pas au profil.

---
### ✅ BUG 16 FERMÉ — le « carré jaune » · md5 `e8d7131c` (28 correctifs)
« Des fois ça amène vers rien, et quand ça y amène il est vide. »
**Le bouton n'était pas cassé** — il faisait exactement ce pour quoi il avait été écrit, mais pas ce qu'on en attendait. Deux causes distinctes :
1. **« Ça n'amène vers rien »** — l'écran s'ouvrait avec `userId: moiIdEc2`, chargé de façon asynchrone au montage. Le toucher avant la fin du chargement ouvrait l'album sans identifiant, donc sans rien interroger. Une course entre le doigt et la base.
2. **« Il est vide »** — ce n'est **pas** un bug. L'album lit `photos_historique`, alimentée uniquement quand une photo est **remplacée** : c'est un album des **anciennes** bannières, pas de la bannière actuelle. Légitimement vide tant qu'on n'en a jamais changé, et vide pour tout nouveau cavalier.

**Choix de Blandine :** le bouton ne s'affiche que si l'identifiant est chargé **et** que l'historique contient au moins une photo. Il se révèle de lui-même le jour où il a du sens.
**Libellé corrigé :** « Album » → **« Anciennes bannières »** (6 langues). « Album » laissait croire à une galerie de la bannière actuelle — c'est ce malentendu qui a produit le signalement.

---

### 💡 « MON PARCOURS » — CONCEPTION ÉTENDUE AU CHEVAL (02/08)
Blandine : *« Le passeport équestre, en vrai on pourrait l'appliquer pareillement à un cheval comme à un cavalier, non ? Juste que ça ramène sur la map monde en ondulant les endroits déjà visités. »*

**Un seul mécanisme, deux cibles.** La table porte un type et un identifiant — `cavalier` ou `cheval` — exactement comme le font déjà les albums, les identifications et les souvenirs. Une écriture, une lecture, un composant. **C'est la bonne architecture au sens de la doctrine** : pas deux systèmes qui divergeront dans six mois.

**Nature différente selon la cible :**
- Pour un **cavalier** : un CV équestre. Ça se montre à un employeur, à un propriétaire, à un club.
- Pour un **cheval** : une biographie. Trois écuries, deux pays, quelques concours — sa carte raconte sa vie mieux qu'un texte, et un acheteur y lit quelque chose d'utile.

**⚠️ Question de fond à trancher — la propriété de l'écriture.**
Le parcours d'un cavalier lui appartient : il le remplit, il en est responsable. Le parcours d'un **cheval** est écrit par son **propriétaire actuel** — donc il décrit aussi des périodes où le cheval était chez quelqu'un d'autre. Deux décisions en découlent :
- Qui peut écrire quoi ?
- Que devient l'historique quand le cheval change de mains ? **Recommandation : le nouveau propriétaire en hérite** — c'est l'histoire du cheval, pas celle du propriétaire — **mais l'auteur de chaque étape est conservé**, sur le modèle du champ `auth` des résultats.

**Rendu visuel :** le globe existe déjà avec ses halos turquoise ; une **pulsation lente** sur les lieux du parcours est dans la Design Bible (la lumière guide le regard, rien n'est parfaitement statique). **Vigilance :** éviter que trois épingles voisines ne fassent clignoter la moitié de la France.

**Reste à faire : la maquette** — globe avec lieux pulsants + liste en dessous, la même page servant au cavalier comme au cheval. À valider avant toute ligne de code.

---
### 🧱 DOCTRINE AFFINÉE APRÈS ARBITRAGE (02/08, fin de session)
Un second avis a été confronté au mien. Trois points en sont ressortis, tous adoptés.

**1. Correction que je devais faire.** J'avais dit « le découpage React ne se portera pas en Flutter ». Vrai du **code**, faux de l'**architecture métier**. Les frontières entre domaines (Horse / Academy / Community…), leurs noms, ce qui appartient à qui : ce travail de pensée traverse la migration **intact**, même si chaque ligne est réécrite en Dart.
> **Règle du projet :** on ne prépare pas Flutter en préparant les composants React, on le prépare en préparant l'architecture métier. Les Repository fixent les contrats de données que Flutter réimplémentera à l'identique.

**2. Ordre des chantiers révisé — remplace l'ordre initial :**
1. Finir les bugs.
2. **Créer les Repository** — meilleur retour sur investissement, et ils traversent la migration.
3. **Design System** — réutilisable à 100 %.
4. Extraire les Services progressivement.
5. **Découper les modules SEULEMENT quand on touche déjà au code pour une autre raison.** Jamais de chantier dédié à cela.

**3. Réserve assumée : pas d'indicateur « Préparation Flutter (%) ».**
Un pourcentage serait un chiffre inventé — impossible à calculer honnêtement (40 %, ça voudrait dire quoi ?), et il deviendrait un objectif qu'on gonflerait en créant des couches inutiles, exactement ce que la doctrine interdit. **À la place : la liste nommée de ce qui reste à moderniser**, qui se vérifie et ne se gonfle pas. Dans six mois, la liste aura raccourci — c'est mesurable, un score ne l'est pas.

---

### Doctrine posée par Blandine ce jour
Modernisation **progressive**, jamais de réécriture. Toute nouvelle fonctionnalité s'écrit plus propre que l'existant ; toute correction de bug est l'occasion de simplifier **si et seulement si** le risque est nul. Aucun refactoring massif, aucun changement visuel ou de comportement sans demande explicite, aucun code nouveau qui augmente la dette.
**Priorités :** modules métiers → Services → Repository Supabase → NavigationService → composants mutualisés → Design System → réduction des dépendances.
**Interdits :** lancer la migration Flutter ; refaire Horse, Academy, Community, Hey Baby ; déplacer du code sans bénéfice réel ; casser une fonctionnalité pour « faire plus propre ».

### Améliorations d'architecture réalisées
- **`PhotoZoomHype`** — composant isolé, **sans état React** (transform écrit directement sur l'élément, zéro re-rendu pendant le geste). Remplace un bloc écrit en ligne dans `FicheCheval`. Premier pas vers une visionneuse autonome.
- **`vignetteHype` / `replierVignette`** — première brique de service média : une seule fonction décide de la taille servie, avec repli automatique. Appliquée au rail de la fiche uniquement (un endroit à la fois, volontairement).
- **`marquerCadre` / `cadreDeUrl` / `urlNue`** — trio de helpers isolant la convention de marquage du cadre. Le reste du code n'a plus à connaître le format.
- **Filtrage de visibilité des albums centralisé dans `listerAlbumsCheval`** — seul point de lecture des albums, donc toutes les surfaces en héritent. Exemple exact de ce que doit être un Repository.
- **Suppression de calcul JS devenu inutile** : la hauteur de la bannière d'accueil était calculée en JavaScript ; `width:100%` + `height:auto` suffit. Du code retiré, pas ajouté.
- **`ouvrirEditIndice` / `sauverIndice`** — remplacement d'un `window.prompt` par un vrai panneau. Un de moins, **il en reste 8**.

### Services créés
Aucun Service formel. Les helpers ci-dessus en sont les prémices, mais aucun n'a encore été promu en couche nommée.

### Repository créés
Aucun Repository formel. **`listerAlbumsCheval` est le meilleur candidat** : il est déjà le point de lecture unique des albums et porte désormais la règle de visibilité. À promouvoir en premier.

### Composants mutualisés
Aucun encore. **Décidé, non commencé : `EnteteHype`**, sur le modèle de la fiche cheval (préférence explicite de Blandine). Méthode imposée : **un écran par livraison, inventaire des boutons avant de toucher.** Refus assumé de faire les 7 écrans d'un coup.

### Dépendances supprimées
- L'ancien calque de balayage de la visionneuse, qui couplait navigation et gestes : supprimé, son rôle repris par `PhotoZoomHype`.
- La fiche cheval n'écrit plus dans `chevaux.palmares` : un seul chemin d'écriture des résultats (la table `resultats`).
- Une bascule public/privé d'album a été écrite puis **retirée** : le système existait déjà. Commentaire laissé dans le code pour éviter la récidive.

### Éléments restant à moderniser
1. **Extraction du contenu** — `contenu_galop1_i18n` (2,34 Mo) vers `/content/`. Plus de la moitié du monolithe n'est pas du code mais du contenu, **et c'est la seule partie dont Flutter héritera vraiment**. À faire en premier.
2. **Visionneuse enfermée dans `FicheCheval`** — le fil, l'Écurie, le club, la communauté ne peuvent pas l'appeler. Trois mécanismes de zoom coexistent (`PhotoZoomHype`, `PhotoZoomable`, `setZoomImg` × 18 sites).
3. **En-têtes écrits sur place sur chaque écran** — aucun composant commun.
4. **8 `window.prompt` restants**.
5. **Flots et coupes codés en dur** dans `CHEVAUX_FICHE`, retrouvés **par nom de cheval**. Ils ont déjà disparu une fois le 31/07. Aucun cavalier autre que Blandine ne peut en ajouter. Méritent leur propre table.
6. **Dessin du cadre à l'affichage** — non branché : les cadres ne sont temporairement plus visibles.
7. **Statut `partage` des albums** non appliqué à la lecture.
8. **Confinement de la largeur au niveau racine** (`html`/`body`), et remise à zéro du défilement horizontal au réveil.

### Risques
- **Le point aveugle du jour :** un calque parasite affiche la photo une seconde fois dans l'en-tête de la fiche cheval. **Sa source n'a pas été identifiée** — ni dans le balisage, ni dans les deux feuilles de style. Le symptôme a été supprimé en retirant l'espace vide où il se voyait. S'il réapparaît ailleurs, il faudra une inspection du DOM en direct.
- **L'authentification reste intouchée, volontairement.** Code vérifié ligne par ligne et sain. Un jeton longue durée serait la vraie solution mais c'est le seul endroit où une erreur verrouille l'accès pour tous. **Chantier isolé, avec version de secours prête à repousser avant d'y toucher.**
- **23 correctifs livrés et non vérifiés en ligne.** Tant qu'ils ne sont pas poussés et observés, chaque livraison supplémentaire allonge la chaîne à démêler en cas de régression.
- **Quota Supabase** — restriction annoncée au 04/08. Un projet restreint, c'est l'appli à l'arrêt : ce risque domine tous les autres.

---
### 🏷️ RENOMMAGE ARRÊTÉ — 02/08 (à appliquer, pas encore fait)
Blandine : le problème n'était pas la page mais **son nom**. « Mon Écurie » et « Mon Club » désignent la même chose dans la tête d'un cavalier — un lieu, avec des boxes et des gens. D'où la collision, dans laquelle Blandine s'est elle-même perdue.

**DÉCISION FINALE : « Mon Écurie » → « MA VIE ÉQUESTRE ».**
- **Titre de la page :** « Ma vie équestre »
- **Libellé dans la barre du bas :** « Ma vie » — trois mots n'y tiendraient pas, « Communauté » y est déjà tronqué en « Communaut ». « Ma vie » seul, en petites capitales, est court et intime.
- **« Mon Club » garde son nom** : c'est la source de vérité, celle que les cavaliers rejoignent, elle doit conserver le vocabulaire le plus attendu.

**Pourquoi ce nom :** « vie » porte une émotion qu'« univers » et « domaine » n'ont pas — il parle de ce qu'on vit, pas de ce qu'on possède. Et c'est ce que la page contient réellement : philosophie, histoire, fil, chevaux. Pas un inventaire, un récit. Le nom est plus large que le contenu actuel, ce qui laisse de la place pour demain.

**Traductions (6 langues) :** FR « Ma vie équestre » · EN « My equestrian life » · ES « Mi vida ecuestre » · IT « La mia vita equestre » · JA « 私の馬術ライフ » · DE « Mein Reitleben ». Barre du bas : variante courte à décliner de la même façon.

**Alternatives écartées et pourquoi :**
- « Mon univers équestre » → télescopage avec la baseline d'accueil « TON UNIVERS ÉQUESTRE », qui désigne l'appli **entière**. Utiliser la même formule pour un onglet réduirait la promesse globale.
- « Mon environnement équestre » → écarté par Blandine, mot d'administration, froid et technique. Contraire à la Design Bible (*luxueux, silencieux, apaisant*).
- « Mes chevaux » → précis mais plus étroit que le contenu réel.
- « Mon domaine », « Chez moi », « Mon écrin » → proposés, non retenus.
- Renommer « Mon Club » → mauvais candidat, c'est la page de référence.

**PÉRIMÈTRE, à inventorier avant de toucher :**
1. Libellé de l'onglet dans la barre du bas (variante courte).
2. Titre de la page.
3. **Encart de l'accueil** « MON ÉCURIE / Ton univers. Tes chevaux. Ta passion. » — porte l'ancien nom, à reprendre. ⚠️ Sa sous-ligne commence par « Ton univers », qui entrait déjà en concurrence avec la baseline : à revoir en même temps.
4. **Badge « Club officiel » à retirer de cette page** — il n'a de sens que sur Mon Club, et c'est lui qui rendait les deux pages indiscernables.
5. Les 6 langues.

**Ouvert :** faire tester le nom à Mégane, Evan et Liam. Leur hésitation dira plus que le raisonnement.

---

### 🧭 DÉCISION PRODUIT MAJEURE — 02/08 : QUI EST LA SOURCE DE VÉRITÉ
Blandine a tranché : **« Mon Club » est la page de référence.** C'est celle que les cavaliers rejoignent à l'inscription comme étant leur club — elle rattache à une structure réelle.
**La page « Écurie » est autre chose** : l'espace personnel d'écurie (bannière, philosophie, histoire, ses chevaux, son fil). **Ce ne sont pas des doublons, ce sont deux rôles distincts.**

**Le problème n'est pas laquelle garder, c'est que rien ne les distingue.** Les deux affichent le badge « Club officiel », aucun titre ne dit où l'on se trouve. Blandine elle-même s'y est perdue — un cavalier qui arrive n'a aucune chance.

**Ce que cette décision éclaire rétrospectivement :** le mur Écurie cible `ecurie:<profil.id>` (mur PERSONNEL), le mur Club cible `club:<nom>` (partagé par tous les membres). Deux murs, deux portées — cohérent avec la décision, mais l'interface ne l'exprime nulle part. C'est ce qui rendait le bug 12 si difficile à lire.

**À faire, dans cet ordre :**
1. **Nommer chaque page** — un titre distinct en haut. Le badge « Club officiel » n'a de sens que sur Mon Club ; sur la page Écurie il induit en erreur.
2. **Réparer Mon Club** — le bouton retour flotte au milieu de l'écran, très bas, au-dessus de la carte de niveau. Aucun en-tête. C'est la page de référence pour tous les cavaliers, elle doit être la mieux tenue.
3. **En-tête unique** (modèle fiche cheval) — réglera les deux d'un coup.

---

### 🐛 DEUX BUGS DE MISE EN PAGE DIAGNOSTIQUÉS, NON CORRIGÉS
**Décalage latéral au retour sur l'appli.** Indice décisif : **la barre de navigation du bas est décalée aussi.** Elle est fixée à l'écran, donc elle ne suit pas le défilement d'un conteneur intérieur — c'est **la page entière** qui glisse, pas la fiche cheval. Les garde-fous posés plus tôt confinaient la fiche, pas la racine du document. Et Safari **restaure la position de défilement horizontale** à la reprise : il suffit qu'un élément ait dépassé une fois pour que la position soit mémorisée puis rejouée à chaque retour, même après correction de l'élément fautif.
**Correctif préparé, non livré :** (1) interdire le défilement horizontal sur `html` et `body`, pas seulement sur la fiche ; (2) forcer la position horizontale à zéro à chaque fois que l'appli redevient visible. Aucune logique touchée, uniquement du confinement.

**Bouton retour perdu au milieu de Mon Club.** Voir le chantier en-tête unique.

---

### ⏸️ DÉCISION DE MÉTHODE — FIN DE SESSION 72
23 correctifs livrés et **non encore vérifiés en ligne**. Recommandation donnée à Blandine, et assumée : **arrêter d'empiler.**
1. Pousser `5ab5655b`.
2. Régler le quota Supabase (échéance 04/08).
3. Retéléverser la bannière de l'Écurie Feinn depuis l'original (liseré rouge gravé dans les pixels).
4. Observer ce qui tient réellement en ligne.
Puis reprendre à froid sur trois sujets : décalage latéral, en-tête unique, distinction Écurie / Mon Club.

---
### 🔄 FIN DE SESSION 72 (suite) — md5 `5ab5655b`
Base : index rapporté par Blandine après le passage d'une autre page sur la partie média.
**141 blocs script vérifiés, tous valides** — le travail de l'autre page est intact.

#### Le cadre n'est plus cuit dans le fichier
Le recadreur calculait déjà **deux** versions — l'image nue (`srcNue`) et l'image habillée — et renvoyait les deux. Mais les écrans appelants n'envoyaient que l'habillée et **jetaient la nue** : le cadre était gravé dans le fichier stocké, définitivement.
Conséquences constatées : la bannière de l'Écurie Feinn porte un liseré **rouge Crimson indélébile** (cadre appliqué alors que la teinte Crimson était active), impossible à retirer ou changer de teinte, et recuit à chaque recadrage.
**Correctif :** c'est l'image NUE qui part sur le serveur ; le choix voyage dans le fragment de l'URL (`#cadre=spectral|halo`), jamais transmis au serveur → aucune migration sur les 4 tables. Helpers `marquerCadre` / `cadreDeUrl` / `urlNue`. `vignetteHype` travaille désormais sur l'URL nue.
**Fond Studio reste cuit** : transformation réelle (détourage + fond), pas une décoration.
**⚠️ RESTE À FAIRE : le dessin du cadre à l'affichage n'est pas branché — les cadres ne sont donc temporairement plus visibles.** Le choix est enregistré, rien n'est perdu.
**⚠️ Action Blandine :** retéléverser la bannière de l'Écurie Feinn depuis l'original. Aucun code ne peut retirer un liseré déjà gravé dans les pixels.

#### Hypothèse écartée en cours de route
J'ai d'abord annoncé que l'option de cadre « persistait d'une photo à l'autre ». **Faux, vérifié :** `setFiltre("aucun")` est bien appelé à chaque nouvelle photo. La cause était uniquement la cuisson dans le fichier.

---

### 🔐 ENQUÊTE SESSION / « SE RAPPELER DE MOI » — CODE INNOCENTÉ
Blandine signale rester déconnectée. **Avertissement de sa part : un gros rollback a déjà eu lieu sur ce sujet.** Aucun code touché.

**Vérifié, tout est sain :**
- `stockageHype` écrit dans `localStorage`, relit `sessionStorage` en secours. `persistSession: true`, `autoRefreshToken: true`.
- La purge du `localStorage` à la connexion n'efface que `hype_*`, `hypeBaby*`, `hypeMemory*`, `augalop_*` — **jamais** le jeton `sb-…-auth-token`.
- Le service worker est hors de cause **par nature** : un SW n'a aucun accès au `localStorage`.

**Trouvaille :** la case « Se rappeler de moi » est **décorative depuis le 27/07**. Elle écrit `hype_rappeler`, mais une ligne au démarrage remet la valeur à `"1"` de force. C'était le prix du correctif qui a suivi le rollback. Une case qui promet ce qu'elle ne fait pas est pire qu'une case absente → **proposition de la retirer, en attente de décision.**

**Hypothèses testées et écartées :**
- Plafond iOS de 7 jours sur le stockage écrit par script → **ne s'applique pas** : Blandine ouvre l'appli depuis l'icône de l'écran d'accueil, pas un onglet Safari.
- Premier test proposé (langue + teinte comme témoins) → **invalide**, relevé par Blandine : le français est sa langue par défaut et une seule teinte est disponible. Aucun des deux ne mesure quoi que ce soit.

**➡️ OBSERVATION À FAIRE PAR BLANDINE la prochaine fois qu'elle est déconnectée, AVANT de se reconnecter :**
**l'écran « Quoi de neuf » se réaffiche-t-il ?**
C'est le seul témoin binaire fiable : il ne s'affiche qu'une fois par version via `hype_maj_vue`, clé volontairement exclue de la purge.
- Il réapparaît → le stockage a été vidé, c'est iOS, le code n'y peut rien.
- Il ne réapparaît pas → le stockage est intact, le jeton a été refusé ou a expiré côté Supabase. **Réparable**, avec un plan de retour arrière écrit avant de commencer.

**Piste non explorée volontairement :** jeton de reconnexion longue durée côté Supabase. C'est la vraie solution, mais elle touche l'authentification — le seul endroit où une erreur ne casse pas une page mais verrouille l'accès pour tous. **Chantier isolé, avec version de secours prête à repousser avant d'y toucher.**

---

### 🎯 CHANTIER VALIDÉ, PAS COMMENCÉ — EN-TÊTE UNIQUE
Constat de Blandine : chaque écran a son propre en-tête, écrit sur place. Aucun composant commun n'a jamais existé. Visible sur l'Écurie : le bouton appareil photo **recouvre la fin de « MEMBRE PREMIUM »**, trois boutons ronds s'empilent à droite sans hiérarchie.
**Modèle retenu : celui de la fiche cheval** (préférence explicite de Blandine) — retour rond à gauche, langue à droite, actions derrière les trois points.
**Méthode imposée : un écran par livraison, avec inventaire des boutons AVANT de toucher.** Refus explicite de faire les 7 écrans d'un coup : c'est le scénario du rollback.
**Garantie donnée :** aucune fonctionnalité perdue — les actions sont déplacées, pas supprimées. Le seul coût est **un tap** sur les actions aujourd'hui visibles. À signaler avant, pas après, sur tout écran où l'action est fréquente.
**Prochaine étape : inventaire de l'en-tête Écurie, à montrer à Blandine avant de coder.**

---
## 🟢 SESSION 71 (31/07, nuit) — FICHE CHEVAL : les vides et les blocs fantômes, trouvés PAR MESURE

### 🔬 LA MÉTHODE QUI A TOUT DÉBLOQUÉ (à réutiliser systématiquement)
Le banc d'essai réclamé par le SUIVI a été monté et il fonctionne : **Playwright + faux client Supabase**.
- Faux client injecté par `addInitScript` **avant** les scripts de l'app : un `Proxy` où toute propriété renvoie le proxy et où `then` résout `{data:[],error:null}` (couvre `from().select().eq()...`), plus `auth`, `channel`, `storage`, `functions`. Supprime le « Cannot destructure createClient ».
- `page.route('**/*')` : le document passe, tout le reste est servi vide (les `hype-images-*.js` n'existent pas hors ligne).
- `DEV_OUVRIR_PAGE` réglé sur la page à mesurer (`cheval-rizotto`). Pour l'accueil, ajouter dans le fichier de TEST une clé `"accueil": { ecran: "dashboard" }` dans `MAP` (elle n'existe pas dans `CIBLE_DIRECTE`).
- Données factices injectées dans le fichier de test uniquement, en préfixant `chargerPhotosSouvenirs`, `listerAlbumsCheval`, `listerCommentaires` par un `return` — **jamais dans le fichier livré** (vérifier `grep -c faux.test` = 0 avant livraison).
- On mesure ensuite avec `getBoundingClientRect()` + `getComputedStyle()`. Plus une seule estimation à l'œil.

### ✅ CORRIGÉ, AVEC LA PREUVE CHIFFRÉE
1. **LE GRAND VIDE (5 échecs précédents) — 171 px mesurés, ramenés à 0.** Ce n'était pas une marge. `.app` portait `min-height:100dvh` + `padding-bottom:92px` et `.chvr .scroll` un `padding-bottom:120px` ajouté pour la barre de chapitres — or **tout le contenu à partir de l'IPO est en dehors de `.scroll`** (parenthèse fermée trop tôt, jamais corrigée). Ces réserves prévues pour le bas de page tombaient donc en plein milieu. Correctif : `.chvr .app{min-height:0;padding-bottom:0}` + `.chvr .scroll{padding:0}` + garde reportée sur `.chv.chvr` (96 px). **Effet secondaire gratuit** : la carte des origines était rentrée de 34 px au lieu de 16, elle est maintenant alignée sur le reste.
2. **CARTE IPO — elle n'avait jamais disparu, elle était ENFERMÉE.** Analyse syntaxique : le bloc se trouvait **à l'intérieur de la branche « état vide »** (celle qui ne s'affiche que si le cheval n'a ni coupe ni résultat, sinon `null`). Pour Rizotto elle n'était donc jamais évaluée. Sortie de là et réécrite **sous les coupes** (`ongletPerf === "coupes"`), marge haute 30 px. Vérifié : « 1 sur 100 000 » apparaît maintenant 2 fois (badge + carte), « 161 » 2 fois. Avant : 0.
3. **CARTE ORIGINES qui « lisait les origines à l'envers ».** Le conteneur du flip portait `transform-style:preserve-3d` **et** `overflow:hidden` : un `overflow` autre que `visible` **aplatit le contexte 3D**, donc le dos n'était jamais composité et on voyait la face avant en miroir. `overflow` retiré. Vérifié après clic : rotation appliquée, le dos passe devant, SIRE + naisseur + mère présents, hauteur dépliée 490 px.
4. **LE FIL ne montrait pas les publications.** `momentsSeuls: true` ne gardait **que** les posts AYANT un texte : toutes les publications photo seule étaient écartées, d'où l'état vide. Filtre retiré (décision Blandine : afficher aussi sans texte). Vérifié avec 3 posts de test (photo seule / texte seul / les deux) : les trois s'affichent.
5. **Carte « Tout le fil → » (porte vers les souvenirs).** Elle existait et était bien câblée sur `setPanneau("souvenirs")`, mais le rail entier ne se dessinait que `if (props.rail && liste.length)` : sans aucun moment, la porte disparaissait. Condition passée à `(liste.length || props.onVoirTout)` et libellé sans « 0 ».

### ✅ MAQUETTE ET MISE EN PAGE
6. **3 cartes raccourcis remontées sous le badge**, en grille de 3 colonnes égales (113 px chacune) ; le carrousel qui débordait est supprimé. Destinations inchangées : Histoire → Souvenirs, Carrière → Palmarès, Santé → Passeport.
7. **Barre de chapitres fixée en bas RETIRÉE** (remplacée par les 3 cartes du haut, comme prévu). Vérifié : plus aucun élément `position:fixed` contenant Origines/Performances.
8. **Albums en rail** : 2 visibles (174 px), aimantation, `data-hscroll`, jusqu'à 10 albums de la page souvenirs.
9. **Carte vidéo dés-écrasée** : `aspect-ratio 16/9` (356 × 200 mesuré) au lieu de 150 px fixes ; les libellés « Ses vidéos » / « Le voir en mouvement » **sortis de l'image** (fini le télescopage avec le texte incrusté de GrandPrix) ; voile sombre retiré de la vidéo.
10. **Rail de photos** : le retour en arrière visible (`scrollTo` fluide vers 0) est remplacé par une **boucle invisible** — liste doublée dès 4 photos, retour au point identique à mi-course. `data-hscroll` ajouté. **3 vignettes par écran** (108 px, écart 15). Écart de **26 px partout dans Médias**, et `paddingBottom` du rail albums passé de 4 à 0 : c'était l'asymétrie de 4 px repérée à l'œil par Blandine (30 au-dessus de la carte vidéo contre 26 en dessous).
11. **Cristaux 48 px symétriques** de part et d'autre + **un cristal ajouté avant le bloc IPO/histoire** (vérifié entre les 3 cartes à y=662 et le bloc IPO à y=873). Titre **« Liens & partage » passé à la verticale** dans la marge comme les autres chapitres. **Encarts Clinique / Sellerie à 200 px** avec zone de titre de hauteur fixe alignée sur le bas, pour que les deux titres partent de la même ligne.
12. **Bandeau de verre derrière le fil** (`panFil` : fond #0D1013, coins 26 px, marge haute 0 pour que ce soit le cristal qui donne l'écart).

### 🎬 ANIMATION DU HÉRO DE L'ACCUEIL
- Fichier **`hype-anim-cheval.mp4`** fourni par Blandine (CapCut) : H.264, **854 × 480, 5,1 s, 200 Ko**. Plus léger qu'une seule affiche de cours.
- Posé **en couche de fond du héros de l'accueil** (`.uv3 .hero`, 432 px), **sous** `hero-pulse` / `hero-side` / `hero-grad` : le nom, la cloche et les boutons restent lisibles. Cadrage `cover` / `center 22%`, identique à l'image fixe.
- **`hero-img` conservée dessous en filet de sécurité** + `onError` qui masque la vidéo : si le fichier manque ou ne décode pas, on voit l'image, jamais un rectangle noir.
- Muette, `loop`, `playsInline`, `preload="metadata"`, et **`IntersectionObserver` qui met en pause dès que le héros sort de l'écran**.
- **CONVENTION À RETENIR** : l'index ne contient que le **nom du fichier**. Pour changer l'animation, pousser un autre fichier **sous le même nom** — aucune modification de l'index. Inversement l'index peut évoluer sans toucher la vidéo. Si CapCut exporte sous un autre nom, **renommer avant de pousser**.
- Vérifié en rendu : lecture au chargement, **pause au défilement**, reprise au retour en haut, 0 erreur JS. Et le repli `onError` validé au passage.

### ⚠️ PIÈGES APPRIS CETTE NUIT
- **Le Chromium de Playwright ne décode pas le H.264** (build Chromium, pas Chrome). Pour valider la logique d'une vidéo, convertir une copie en WebM (`ffmpeg -c:v libvpx-vp9`) et pointer le test dessus. Le mp4 reste inchangé côté livraison.
- **Ne jamais conclure d'une mesure faite avec un jeu de test qui ne colle pas à la configuration réelle.** Les « 234 px sous la vidéo » annoncés à Blandine venaient d'une vidéo injectée dans mon stub, absente de sa fiche. Recaler le stub sur sa configuration avant d'affirmer quoi que ce soit.
- **L'arbre des chapitres est EMBOÎTÉ** : `chapMedias`, `chapFil` et `chapSante` sont tous **à l'intérieur de `chapPerf`**, et `chapMedias` / `chapFil` existent **en double**. Tout traitement « un panneau par chapitre » doit en tenir compte : donner un panneau à Performances envelopperait toute la page.
- **Vérifier l'état du fichier avant de patcher.** Plusieurs correctifs demandés étaient déjà en place (cristaux 48 px, titre vertical, encarts agrandis) : les assertions « 1 seule occurrence attendue » ont évité de les appliquer deux fois. Toujours faire échouer le script plutôt que d'écrire à l'aveugle.

### 🧪 FICHIER D'ESSAI `c.html` (à pousser À CÔTÉ de l'index, pas à la place)
Version **A + C** : les 6 cristaux **et** trois bandeaux de verre (Médias, Le fil, Santé & sellerie). Se consulte sur `/c.html`, invisible pour les cavalières puisque ce n'est pas `index.html`. Sert à trancher la question posée par Blandine : le heurt entre le rail léger du fil et les gros posters Clinique/Sellerie. Si A+C est retenu, il faudra dénouer l'emboîtement des chapitres (voir pièges) pour que Performances ait aussi son panneau.

### 🎨 MAQUETTES LIVRÉES, CHOIX EN ATTENTE
- **`maquette-fil-fiche.html`** — 3 directions pour le fil : **A Moments encadrés** (rail de rectangles verticaux + carte « Tout le fil »), **B La colonne** (moments en grand empilés), **C Le carnet** (date verticale dans la marge, moments alternés). **Blandine penche pour A**, en signalant que le fil « détonne » avec ce qui suit — d'où le bandeau (point 12).
- **`maquette-separations-chapitres.html`** — 3 façons de départager les parties : **A Cristal respiré**, **B Le seuil nommé** (la partie s'annonce par son nom + compteur, le titre vertical devient inutile), **C Le panneau**.

### 🔴 RESTE À FAIRE (ordre inchangé, moins ce qui est fait)
1. **Photo d'écurie** : le choix d'une nouvelle image ne passe pas par le recadreur (appliquée brute) — seul « Ajuster » l'ouvre. À aligner sur la fiche cheval.
2. **Accueil** : carrousel « Mon monde » encore sur `CHEVAUX_FICHE` (Rizotto y affiche « 12 ans » au lieu de 21) → charger depuis la base, âge calculé, photo réelle.
3. Teinte du **profil cavalier** + **stockage des teintes en base** (aujourd'hui localStorage → invisible pour les visiteurs).
4. **Compression des photos à l'upload** (fond du crash mémoire iOS + quota Supabase avant le 14 août).
5. Dénouer l'emboîtement des chapitres **si A+C est retenu**.
6. Trancher la direction du fil (maquettes livrées).

## 🆕 AJOUTS DE FIN DE SESSION 31/07 (tous validés 141/141, aucune fonction perdue)
## 🔵 ÉTAT FIN DE JOURNÉE 31/07 (dernier index livré : md5 dcd4ff37)
## 🔵 FIN DE SESSION 31/07 — ÉTAT RÉEL (md5 8900dff3)
**En ligne et vérifié** : carte d'identité en tête de fiche — « Origines » écrit DANS la carte, elle **se retourne** (flip 3D) pour pedigree + naisseur + consanguinité + SIRE · **barre de chapitres FIXÉE EN BAS** de l'écran (au-dessus de la NavBar, marge basse 120px ajoutée au scroll) · titres de chapitres **verticaux en surimpression** (Performances, Médias, Le fil, Santé) — aucune largeur prise · cristaux 34px symétriques · **pilules Coupes/Résultats** · **carte IPO autonome** en fin de Performances · **albums en 2 colonnes égales** (grille, plus de rail 220px) · likes + commentaires dans la visionneuse de la fiche · **une seule vidéo en autoplay** + pause de toutes les vidéos à l'ouverture d'un média · formulaire de résultats complet (1-2-3 + 4-8 + « Classé ») · épreuves abrégées « Finale JC 4 ans » · espaces 22px badge↔carte↔chiffres.

## 🔴 RESTE À FAIRE — ORDRE DE PRIORITÉ
1. **Remonter les 3 cartes raccourcis** (Histoire/Carrière/Santé + Sellerie + Vidéos) sous le badge, en **grille compacte de 3**, chacune cliquable vers SA page. Déplacement structurel → à faire seul, en début de session. Maquette de référence : `maquette-plan-fiche.html` (zone 3).
2. **LE GRAND VIDE** entre la carte des origines et les chiffres IPO/PFS : cause NON identifiée après 5 tentatives à l'estime. **Méthode imposée** : monter un rendu Playwright avec un **faux client Supabase** (sinon l'app ne démarre pas hors ligne : « Cannot destructure createClient ») et **mesurer** les boîtes. Ne plus deviner.
3. **Photo d'écurie** : le choix d'une nouvelle image ne passe PAS par le recadreur (appliquée brute) — seul « Ajuster » l'ouvre. À aligner sur la fiche cheval.
4. **Accueil** : carrousel « Mon monde » encore sur CHEVAUX_FICHE (Rizotto y affiche « 12 ans » au lieu de 21) → charger depuis la base, âge calculé, photo réelle.
5. Teinte du **profil cavalier** + **stockage des teintes en base** (aujourd'hui localStorage → invisible pour les visiteurs).
6. Compression des photos à l'upload (fond du crash mémoire iOS + quota Supabase avant le 14 août).

## ⚠️ PIÈGES APPRIS À LA DURE (31/07) — À RESPECTER
- **Ne JAMAIS déplacer un bloc par équilibrage de parenthèses** : une apostrophe dans une regex (`d'.+`) fait dériver le scanner → 1 M de caractères et 80 fonctions emportés (2 incidents). Supprimer par **bornes textuelles** puis **réécrire** une version courte au bon endroit (méthode suggérée par Blandine, seule qui a marché).
- **Après tout retour en arrière, relister les correctifs perdus** : l'extraction de l'IPO et l'espacement Médias ont disparu DEUX fois par rollback silencieux.
- **`node --check` ne prouve pas que la page s'affiche** : vérifier aussi que chaque état est déclaré DANS le bon composant (un `ongletPerf` orphelin a planté toute la fiche ; une insertion dans AlbumsCheval au lieu d'EcranCheval a failli recommencer).
- **Crash sans écran d'erreur = mémoire iOS**, pas un bug de code (5 vidéos en autoplay + image pleine résolution).
- Le SUIVI est **cumulatif multi-branches** : il ne prouve pas qu'un index est « en retard ».

- **CARTE D'IDENTITÉ UNIQUE** en tête de fiche (maquette A validée) : IPO en grand + race/âge/robe/discipline, filet, puis « père × père de mère ». **Elle se retourne** (flip 3D) pour livrer pedigree complet, naisseur, consanguinité, SIRE. L'ancien bandeau IPO/PFS séparé et l'ancien chapitre Origines plus bas ont disparu.
- ⚠️ **MÉTHODE QUI MARCHE** (3 échecs aujourd'hui avant de trouver) : pour fusionner deux blocs, **ne pas déplacer** le code existant — supprimer l'ancien avec des **bornes textuelles** (jamais l'équilibrage de parenthèses : une apostrophe dans une regex `d'.+` fait dériver le scanner et a emporté 1 M de caractères / 80 fonctions) puis **réécrire** une version neuve courte au bon endroit. Idée de Blandine, à appliquer systématiquement.
- Autres ajouts du jour : likes ❤ + commentaires dans la visionneuse de la fiche (les fonctions existaient mais n'étaient câblées que dans l'ancienne visionneuse des albums) · pilules **Coupes/Résultats** dans Performances · **teinte de la page écurie** (4 pastilles en bas du bandeau, cadre + accents + recadreur, stockée en localStorage) · titres verticaux en surimpression (plus de décalage) et agrandis à 15px Cinzel · titres en double supprimés (`sansTitre` transmis à MurHype et AlbumsPromus) · diptyque Médias réduit à la seule vidéo en grand · carrousel accéléré · espace de 26px sous la photo · nom + affixe sur la même ligne · ligne italique retirée (doublonnait) · libellés d'épreuve abrégés (« Finale JC 4 ans ») · cadre overlay thématisé + `srcNue` (fin des cadres cuits qui s'empilent).

## 🔴 PRIORITÉS IMMÉDIATES (préparées, à appliquer sur le prochain index)
1. **ACCUEIL — carrousel « Mon monde » NON MIGRÉ** (repéré par Blandine 31/07) : il lit encore les fiches en dur (Rizotto y affiche « Poney · 12 ans » au lieu de 21 ans / 2005). À faire : charger les chevaux **depuis la base** filtrés sur le compte, vraie photo avec repli sur l'affiche de secours, **âge calculé** depuis la date de naissance, navigation par identifiant base, « + Ajouter » conservé.
2. **Teinte pour le PROFIL CAVALIER** + héritage de la teinte par les **pages secondes** (souvenirs / performances / vidéos / albums) pour supprimer tout turquoise orphelin.
3. **Rendre les teintes publiques** : aujourd'hui en localStorage (donc invisibles pour les visiteurs et non synchronisées entre appareils). Nécessite une colonne Supabase + requête SQL à préparer.
4. Reste de la maquette fiche : pilules Photos/Vidéos/Albums dans Médias, titre vertical pour Liens & partage, cristaux solidaires des chapitres.
5. Vidéo sur bandeau écurie/club : **bibliothèque de 3-4 vidéos au choix** (solution retenue avec Blandine, remplace l'upload libre).

- **Diptyque Médias** : photo vedette + **vidéo vedette côte à côte** (autoplay muet, badge ▶ VIDÉO) ; replis gérés (pas de vidéo → photo pleine largeur, et inversement) ; les deux médias promus sont retirés du rail.
- **Titres de chapitres** agrandis (8.5→10.5px vertical, 10.5→11.5px horizontal), passés en **relief** (textShadow noir + halo teinte, brightness 1.18) car illisibles sur fond sombre.
- **Libellés d'épreuve abrégés** : helper `abrEpreuve()` — « Finale jeunes chevaux poney · obstacle 4 ans » → « **Finale JC 4 ans** » (règle générique tous âges ; sinon « obstacle » → « obst. »).
- **Cadre spectral en OVERLAY sur le héro** : double trait fin posé par-dessus la photo, **suit la teinte en direct**, photo jamais modifiée.
- **Cadre/Halo du recadreur aux couleurs du thème** : la teinte de la fiche est transmise au recadreur (`job.teinte`, helper `hbA()`), le cadre et le halo se dessinent dans cette couleur.
- ⚠️ **BUG DU CADRE CUIT — CORRIGÉ** : le recadreur conservait comme « original » la version **déjà habillée** → « Aucun » ne retirait rien et les cadres s'empilaient. Désormais `srcNue` (image recadrée NUE, capturée avant tout habillage) sert d'original. **Motif connu à surveiller partout** (cf. règle des filtres empilés). Les photos dont l'original stocké contient déjà un cadre doivent être re-choisies une fois depuis la pellicule.
- Décalage du contenu par les titres verticaux : **maquette-titres-sans-decalage** livrée (A surimpression dans la marge = recommandé / B colonne 14px / C horizontal minuscule) — **choix de Blandine en attente**.

## ✅ VALIDÉ PAR BLANDINE, À CONSTRUIRE EN PRIORITÉ (session suivante)
1. **Carte Origines qui SE RETOURNE** (flip 3D validé sur maquette-origines-flip) : face avant = « père × père de mère » seul ; dos = pedigree complet, naisseur, consanguinité, SIRE. ⚠️ Nécessite l'extraction du gros bloc pedigree — **échec précédent sur équilibre de parenthèses, découper en morceaux**. État `origOuv/setOrigOuv` déjà en place.
2. **Teinte pour le profil CAVALIER et la page ÉCURIE/CLUB** (validé 31/07) : aujourd'hui elles n'ont aucune teinte, donc leur recadreur reste turquoise. À faire : stockage (JSON profil), pastilles dans le menu, application aux couleurs de la page + transmission au recadreur.
3. Sommaire collant : **coupé à gauche** sur certains écrans (premières pilules tronquées) — à corriger.
4. Ligne italique sous le titre : l'**IPO y apparaît en double** avec l'encart PFS juste dessous — arbitrer.
5. Reste de la maquette : pilules Coupes/Résultats et Photos/Vidéos/Albums, titre vertical pour Liens & partage, cristaux solidaires des chapitres (éviter les orphelins).

---
## ✅ SESSION 70 (31/07) — CE QUI EST DÉSORMAIS CODÉ ET EN LIGNE
## 🚧 REFONTE FICHE (maquette 5+6+volets) — ÉTAT AU 31/07 FIN DE SESSION
**FAIT et validé (141/141, aucune fonction perdue)** : ligne de clés italique sous le titre · **sommaire collant** 6 pilules avec ancrages (chvInfos, chapPerf, chapMedias, chapFil, chapSante, chapPartage) et défilement doux · **cristaux séparateurs** (helper `cristal(k)`, 5 appels) · respiration `.eyebrow2` 30→46px · **titres verticaux** (writingMode vertical-rl, colonne 30px) sur Performances, Médias, Le fil, Santé & sellerie · **IPO rapatrié dans Performances** (sous coupes/résultats).

**RESTE À FAIRE sur la fiche** :
1. ⚠️ **Volet Origines** (père × père de mère en une ligne, tout au déroulé) — TENTÉ puis ANNULÉ : l'extraction du bloc pedigree (11 730 caractères) casse l'équilibre des parenthèses. **Méthode à suivre** : découper le pedigree en morceaux plutôt qu'en un seul bloc, état `origOuv/setOrigOuv` DÉJÀ posé dans le code (prêt à l'emploi).
2. Titre vertical pour **Liens & partage** (borne de fin = fin du scroll, à délimiter à la main).
3. **Pilules Coupes/Résultats** (Performances) et **Photos/Vidéos/Albums** (Médias) avec compteurs + « + ».
4. **Diptyque photo + vidéo** dans Médias (garantit une vidéo visible ; repli en photo pleine largeur si aucune vidéo).
5. Durcir les cristaux : les rendre solidaires du chapitre pour qu'ils disparaissent avec une section vide (risque de cristal orphelin sur fiche peu remplie).
6. **Santé = passeport + clinique fusionnés** (info Blandine 31/07) : faire converger les deux entrées actuelles du code vers une seule destination.

## ⚠️ VIDÉO SUR PROFIL CLUB/ÉCURIE — N'EXISTE PAS ENCORE (question Blandine 31/07)
Le sélecteur de la photo d'écurie n'accepte que des images et le bandeau ne sait afficher qu'une `<img>` : rien n'est cassé, la fonctionnalité n'a jamais été construite. À faire : accepter `video/*` dans le sélecteur, compresser à l'upload (3-5 s, sans son, ~300-500 Ko), stocker dans le bucket, et rendre `<video>` (boucle, muet, pause en arrière-plan) quand l'URL est une vidéo. Même chantier que les profils vidéo Premium (E.6) — à traiter ensemble.

- **Menu unique** : crayon fondu dans le ⋮ (📷 Changer photo · ✂️ Ajuster · 🏷️ Identifier · 🎨 Teinte propriétaire · ✏️ Modifier · 🗑️ Supprimer). Plus aucun bouton flottant sur la photo.
- **Titres SORTIS de la photo héro** : héro = photo pure (chevron + drapeau seulement) ; bloc titre dédié dessous (nom Cinzel dégradé, affixe en teinte, badge Légende en pilule, ⋮ aligné à droite).
- **FIL direction 3** : rail de 6 encadrés verticaux 208px (média dominant, légende 2 lignes, auteur·date, citation Cormorant si texte seul), départ varié, carte « Tout le fil → (n) ». Fil doublon retiré du panneau souvenirs.
- **Page seconde à ONGLETS** : Souvenirs | Performances | **Vidéos** (pilules sous le titre). Onglet Vidéos = grille de toutes les vidéos du cheval → l'encart « Le voir en mouvement » a enfin une destination.
- **Swipe retour** sur le panneau : geste depuis le bord gauche (≤28px, dx>70, dy<60) ferme le panneau sans gêner les rails.
- **IPO** : déplacé, puis **remonté AU-DESSUS des Origines** (demande du 31/07).
- **Bande « Ses photos » = proposition 1** : vedette large (218px, pleine largeur, vidéo en autoplay muet) + rail de vignettes 104×126 qui **défile seul** (pause au doigt). Les **vedettes choisies ouvrent la séquence** (chargerPhotosSouvenirs lit souvenirs_vedette en premier).
- **Tap = plein écran** : photos de la bande ET cartes du fil ouvrent la visionneuse au lieu de renvoyer en haut des souvenirs.
- **Encart « Ses vidéos » lisible** : vidéo à 92% d'opacité, voile réduit à un dégradé bas, textes petits en bas à gauche.
- **Partage de fiche avec image** : navigator.share embarque la photo du cheval (fetch→blob→File, canShare) ; repli lien seul puis presse-papiers. Routage `#cheval-<id>` générique (identifiants base ET vitrine).
- **Formulaire de résultats complet** : 1/2/3 + champ 4-8 + « Classé » ; sauvegarde qui ne ferme que sur succès ; médaillons masqués si coupes SAUF entrées perso ; coupes sans image masquées ; état vide seulement si rien.

## 🎨 MAQUETTES EN ATTENTE DE TON CHOIX
1. **maquette-respiration-chapitres** : 1 grands blancs / 2 filet lumineux / 3 chapitres en cartes / 4 numérotés + fond alterné (combinables 2+4, 1+4).
2. **maquette-cadre-photos** : A liseré / B coins / C double trait (toujours en attente).
3. **Cadre Spectral 4 teintes en overlay** : à maquetter (auto + pastilles + « Auto »).

## 🔴 RESTE À CONSTRUIRE (inchangé)
Chapitre Performances + carte « Partager sa fiche » sur la page CAVALIER · encart Résultats du CLUB (spécifier qui publie/validation/saisons) · bouton « Faire découvrir Hype » en Communauté · grille ordonnée des posts dans l'onglet Souvenirs · vidéos à fournir (bandeau Écurie Feinn, accueil « cheval en liberté », couverture g3-saut, profils vidéo Premium, poulain messagerie déjà dans le bucket) · décision « + Ajouter un flot » (construire l'upload ou retirer) · albums collaborateurs · quota Supabase avant le 14 août · déplacer les vidéos hors de « Untitled folder » · « Six instants » à harmoniser dans les 5 autres langues.


## 🎯 PILE SESSION 70 — RÉCAP EXÉCUTABLE (consolidé 31/07 matin, tout le reste de la 69 est FAIT et en ligne)

**Maquette n°1 (un seul écran, tout ensemble) — LA GRANDE FICHE CHEVAL :**
1. Titres (nom/affixe/badge) SORTIS de la photo héro → bloc titre dessous.
2. Menu UNIQUE : crayon fondu dans ⋮ (📷 Changer photo · ✂️ Ajuster · 🏷️ Identifier · 🎨 Teinte · ✏️ Modifier · 🗑️ Supprimer).
3. Cadre Spectral 4 TEINTES en OVERLAY (auto = suit la teinte ; pastilles + « Auto » pour forcer). Le cadre actuel est cuit dans l'image → à re-recadrer pour nettoyer.
4. FIL direction 3 : rail 6 encadrés verticaux + carte « Tout le fil », départ varié.
5. IPO déplacé sous/avec Origines.
6. ⚠️ Choix Blandine EN ATTENTE : variante du cadre photo simple (A liseré / B coins / C double trait — maquette-cadre-photos livrée).

**Maquette n°2 — PAGE SECONDE UNIQUE À ONGLETS (Souvenirs | Performances | Vidéos ?)** : fusionne les panneaux, grille ordonnée des posts (onglet Souvenirs), règle le swipe-retour mort (#panneauCheval data-noswipe) et l'encart « Ses vidéos » sans destination. Retrait du fil doublon.

**Cavalier & Club** : chapitre Performances sur la page cavalier + carte « Partager sa fiche » cavalier (n'existe pas) ; encart Résultats du club (spécifier : qui publie, validation modérateur, saisons).

**Communauté** : bouton « Faire découvrir Hype » (partage de l'app — n'existe pas).

**Vidéos en attente de fichiers/maquettes** : bandeau Écurie Feinn (vidéo à fournir) ; accueil « cheval en liberté » (Blandine génère) ; couverture vidéo du cours g3-saut ; profils vidéo Premium (compression auto à l'upload, vignette fixe en liste) ; poulain messagerie dodo→galop (vidéos déjà dans le bucket).

**Décisions à prendre** : « + Ajouter un flot » (construire l'upload d'image de flot OU retirer le bouton) ; albums collaborateurs (table + policy).

**Ménage/technique** : quota Supabase AVANT le 14 août ; déplacer les 6 vidéos hors de « Untitled folder » (+ 1 ligne d'index) ; « Six instants » à harmoniser dans les 5 autres langues de la scène ; chasse aux « Bientôt disponible » restants ; purge de CHEVAUX_FICHE dans quelques semaines.

**Fond ancien (inchangé, mémoire longue)** : Chemin Baby Poney d'Or à valider ; titre baby-c18 doublon ; vidéo Premium Hey Baby (livraison 2) ; offre Stripe « abonnement IA » ; Fond Studio (intégration + teintes) ; Hype Lingo (en attente réf. page poneys) ; idées validées à maquetter (export Instagram, certificat Galop, rétrospective annuelle, anniversaire cheval, question du jour, révision Premium, concours photo mensuel).


---

## SESSION 69 · 30/07/2026 (journée marathon — migration + scène + vidéos)

🔴 **À pousser** : `index.html` (10 318 504 octets, md5 52edeac2) — contient TOUT ce qui suit. Les 6 vidéos sont DÉJÀ uploadées dans Supabase Storage.

### A. MIGRATION DES 7 CHEVAUX DÉMO → BASE (fait, en ligne, vérifié)
Les fiches codées en dur (CHEVAUX_FICHE) ne sont plus que des SECOURS. Chaque cheval vit en base sous son vrai propriétaire :
- **Blandine (feinn@live.fr)** : My Dream, Rizotto d'Emery, Elfe de Feinn, Cooltax, Boréalis de Feinn.
- **Liam (liamroux0@gmail.com)** : ses fiches réelles préexistantes **« Tully Blue moon »** (m minuscule !) et **« Hey Baby Please »** — créées par lui le 26/07. Les coquilles vides créées par erreur lors de la migration ont été supprimées (delete ciblé date+photo null).
- SQL passés par Blandine : colonne `chevaux.palmares jsonb` ajoutée ; INSERT des 5 ; raccord des cibles `commentaires`, `souvenirs_vedette` ET `albums_cheval` de `cheval:<slug>` vers `cheval:<uuid>` (par jointure sur nom). Contrôle 0 rows sur les anciens slugs : OK.
- Index : `NOMS_MIGRES` (slug→nom réel) dans EcranCheval — un slug démo déclenche la recherche base par nom ; `var c = chevalDyn || CHEVAUX_FICHE[id]` (la base PRIME) ; `cibleCh = "cheval:" + (c.dbId || id)` sur les 9 accès souvenirs/albums/mur ; palmarès/origines lus depuis la base (JSON) avec secours code ; photos du code en secours si `photo_url` vide (personne n'a rien recréé) ; liste écurie : liste démo supprimée, `AFFICHES_SECOURS` par nom (fin du doublon Tully).
- ⚠️ La vitrine EcranEcurieHype garde ses cartes en dur (slugs) → elles ouvrent désormais les fiches base. CHEVAUX_FICHE pourra être purgé dans quelques semaines une fois la bascule éprouvée.

### B. SCÈNE « LES PHASES DU SAUT » → 6 PHASES OFFICIELLES FFE (fait)
Vérifié sur sources (dont PDF ffe.com) : battue des antérieurs, battue des postérieurs, ascendante, planer, DESCENDANTE, réception. L'abord/l'appel = noms familiers des deux battues.
- PHASES passe de 5 à 6 (phase descendante insérée, textes cheval/cavalier écrits, glyphe SVG) ; « sur 06 » ; sous-titre « Six instants » (FR seulement, autres langues à harmoniser un jour).
- **Rail compact** : les 6 cartes tiennent à l'écran (flex 1 1 0, nom en 7.5px 2 lignes, scrollTo neutralisé — attention au `if (f) { }` réparé).
- Carte « À retenir » RETIRÉE de la fin de la scène → elle vit sur la page du cours.
- **Page scène repensée (maquette validée)** : BlocLienPhasesSaut = carte « ⭐ À retenir » (3 points, 6 langues) + encart scène compact + bouton pilule discret. Réinséré dans g3-saut ET g4-obstacles-equilibre.
- **Vocabulaire d'examen (FR uniquement)** : cartes du cours « 1. La battue des antérieurs (l'abord) »… « 5. La phase descendante » ; bonne réponse + explication du quiz alignées. Autres langues : noms naturels conservés (l'examen est français).
- **Flèche ← sur toutes les pages de cours** (pied du lecteur EcranCours) + boutons Suivant/← passés en style discret (maquette validée : verre fumé liseré, fini le pavé fluo).

### C. COIN COMPÉTITION — VIDÉOS PAR TEINTE (fait, câblé)
- Panneau Performances : bandeau vidéo en tête (ratio 966/720, max 44svh, dégradé, onError→masqué). La vidéo suit `teinte` : #D9B56C→dorée, #5C7A5E→verte, #C64B5C→bordeaux, sinon Crystal.
- **6 vidéos optimisées** (delogo du filigrane « Ai » sans recadrage, son retiré, H.264 ~200-370 Ko) et **UPLOADÉES** par Blandine dans Storage. ⚠️ CHEMIN RÉEL : bucket `photos`, dossier **`Untitled folder/Ui/`** (dossier Untitled créé par accident, assumé pour l'instant — l'index pointe sur `.../public/photos/Untitled%20folder/Ui/`). Fichiers : heybaby-dodo.mp4, heybaby-messagerie.mp4, palmares-crystal.mp4, palmares-dore.mp4, palmares-vert.mp4, palmares-bordeaux.mp4.
- 📌 Ménage futur : déplacer vers un vrai dossier propre + rebasculer le préfixe (1 ligne).

### D. CORRECTIFS FICHE CHEVAL (faits)
- **Identifier** : retiré du haut du héro ; réinséré dans la **visionneuse** (pilule discrète) + entrée menu ⋮ « 🏷️ Identifier dans la photo ». (Historique : le bouton était un bloc visionneuse tombé hors condition, réparé en début de session.)
- **Teinte en un tap** : rangée « 🎨 Teinte » avec 4 pastilles directement dans le menu ⋮ (propriétaire, update `chevaux.teinte` + setChevalDyn immédiat).
- **Photo fantôme** (bug signalé : recadreur proposait un vieil original — profil/cheval/écurie-club) : empreinte `*_orig_pour*` (100 premiers caractères de la photo produite) enregistrée à côté de chaque original ; à l'ouverture, original servi SEULEMENT si l'empreinte correspond à la photo en place, sinon purge. 3 chemins corrigés.
- **« Partager sur l'Écurie Hype »** remonté DANS la carte Liens & partage (entre Générer un lien et FFE).
- **Héro** : photo entière (contain) sur hauteur fixe 50svh ; recadrage accessible via ⋮ « ✂️ Ajuster / recadrer » (toutes fiches). Carrés Clinique/Sellerie : images de couverture remises (clés encartVeto/cliniqueEncart/sellerieEncart, dégradé, icône en repli). Albums : rail 220px aligné sur les vignettes photos.

### E. VALIDÉ, PAS ENCORE CODÉ (prochaine session — maquettes d'abord)
1. **FIL DIRECTION 3 (« Moments encadrés »)** — CHOIX DÉFINITIF (31/07 au matin, confirmé face à l'option Cinéma sur maquette-fil-finalistes) : rail horizontal de **6** encadrés max (média dominant, légende 2 lignes, auteur) + carte « Tout le fil → (n) » ; **supprimer le fil doublon du panneau souvenirs** (fiche = vitrine + fil, souvenirs = photos/albums purs, décision actée). Plan proposé, maquette d'intégration sur vraie fiche À FAIRE avant code.
2. **Poulain messagerie** : dodo (94 Ko) en boucle près de l'entrée quand rien, galop (219 Ko) + pastille à l'arrivée d'un message. Vidéos prêtes et uploadées. Maquette de l'enchaînement à faire.
3. **Couverture vidéo du cours g3-saut** (boucle lente, fondu au raccord) — vidéo à choisir (Blandine veut regénérer mieux).
4. **Accueil** : bandeau vidéo — Blandine veut un sujet UNIVERSEL (cheval en liberté, pas de compétition pour ne pas exclure dresseurs etc.) ; elle génère. Maquette technique prête (blob iOS, poster, voile).
5. **Bandeau vidéo Écurie Feinn** (club en dur) : accepté, vidéo à fournir.
6. **Profils vidéo Premium** (écurie/cheval/cavalier) : accepté dans le principe — compression AUTO à l'upload (3-5 s, sans son, ~300-500 Ko), vignette fixe dans les listes, lecture uniquement sur la page ouverte, réservé Premium.
7. **Albums collaboratifs** : table `albums_collaborateurs` + policy, à maquetter avec le redécoupage Ses albums / Ses photos.
8. **Question ouverte** : sur la fiche, section Son palmarès — médaillons (actuels) vs flots de Blandine en direct. Ses flots sont INTACTS dans le panneau Performances (rubanCard/rbstrip).

### G. FIN DE SESSION — CHAPITRE PERFORMANCES & SIRE (faits, dans l'index final 0650450a)
- **Chapitre « Performances » sur la fiche** (remplace Aptitude + Son palmarès, plus de doublon) : eyebrow Performances → **vidéo cérémonie** (suit la teinte, tap → panneau détail) → **rail de médaillons** → carte **IPO rendue discrète** (police/photo réduites, sans titre de section). L'ancien « Son palmarès » du bas est supprimé. Blandine a VU les vidéos en ligne : tout fonctionne.
- **« + Ajouter un résultat » FONCTIONNEL** (propriétaire uniquement) : état vide → modale (année préremplie, pastilles or/argent/bronze, épreuve, discipline·cavalier) → append dans `chevaux.palmares` (jsonb) + toast ; pastille **+** en fin de rail quand des résultats existent. Visiteurs : lecture seule.
- **Champ SIRE** : saisi dans « Modifier » de la carte Origines (stocké dans le JSON `origines.sire`, AUCUNE colonne SQL à ajouter) ; affiché tappable sur la carte → ouvre https://infochevaux.ifce.fr/fr/info-chevaux (page officielle de recherche — PAS de lien profond par numéro, format non documenté/fragile).
- **Ligne FFE « Connecter » RETIRÉE** (promesse sans backend — décision Blandine : « ça sert à rien de promettre des trucs qu'on peut pas faire »). ⚠️ RÈGLE PRODUIT ACTÉE : plus aucune promesse d'interface sans backend. Chasse aux autres « Bientôt disponible » à faire (tâche ouverte).
- **⚠️ PAS DE REMPLISSAGE AUTOMATIQUE via SIRE** : pas d'API publique IFCE/FFE. Formule de communication validée : « Renseigne le SIRE de ton cheval et retrouve sa fiche officielle IFCE en un tap. » Rien de plus. Le vrai automatique = dossier partenariat IFCE/FFE (chantier fondatrice ; trame à préparer si Blandine le demande).
- **Recadreur écurie : ratio réel** — le cadre proposé épouse désormais les dimensions mesurées du bandeau (`.hero` clientWidth/Height) au lieu d'un 16/9 arbitraire → fini le zoom surprise entre ce qu'on cadre et ce qui s'affiche. (À généraliser un jour aux autres recadrages si même symptôme.)

### H. ARCHITECTURE CIBLE ACTÉE (Blandine, fin de session — MAQUETTES À FAIRE avant code)
**« La vitrine sur les pages principales, le détail sur une seule page seconde. »**
- Fiche CHEVAL : chapitre Performances (FAIT ce soir).
- Page CAVALIER : même chapitre Performances (vidéo + résultats principaux) — à maquetter.
- **Page seconde unique avec onglets « Souvenirs | Performances »** : le panneau souvenirs et le panneau palmarès fusionnent en UNE page à onglets (fin de la multiplication des panneaux) — à maquetter.
- Page CLUB : encart renvoyant vers les résultats collectifs (cf. maquette-resultats-club) — à maquetter/spécifier (qui publie, validation modérateur, saisons).
- Maquette « cadre des photos » livrée (3 variantes A liseré / B coins passe-partout / C double trait) — **choix de Blandine en attente**.

### I. DERNIERS AJOUTS (index final 7fe7e4bc)
- **Coupes/flots en vitrine sur la fiche** (demande Blandine : « les coupes que je m'étais fait chier à faire ») : rail des `c.flots` (cartes image 108×132, bord doré) AVANT les médaillons ; **tap = zoom dans la visionneuse** (ce que les médailles ne faisaient pas). Les médaillons restent à la suite pour les résultats sans image (saisis au formulaire). Fallback trophée/médaille emoji si flot sans image.
- **« + Ajouter un résultat » du PANNEAU Performances branché** (était un bientot()) : ferme le panneau et ouvre la modale (propriétaire), bientot() sinon.
- ⚠️ **« + Ajouter un flot » du panneau = encore un bientot()** — l'upload d'image de flot n'existe pas. DÉCISION À PRENDRE (règle anti-promesse) : construire le vrai upload de flots (photo du flot de concours par le cavalier — serait très Hype) OU retirer le bouton. Blandine tranchera.

### J. TÊTE DE PILE PROCHAINE SESSION (décisions de fin de soirée)
1. **SORTIR LES TITRES DE LA PHOTO HÉRO** (fiche cheval) — « ça casse tout » sur les vraies photos : RIZOTTO/affixe/badge écrasent l'image. Cible : photo entière intouchée en haut → bloc titre dédié DESSOUS (nom Cinzel, affixe, badge, crayon + ⋮ alignés) → IPO → histoire. À maquetter AVEC le fil direction 3 (même écran, une seule maquette de fiche).
2. **Fil direction 3** (rail 6 encadrés + carte Tout le fil, retrait du doublon souvenirs) — déjà spécifié en E.1.
3. **Cadre Spectral en 4 teintes autour de la photo de profil** — DÉCISION ACTÉE : il **suit la teinte de la fiche automatiquement** par défaut, MAIS le recadreur garde les 4 pastilles + une option « Auto » (choix manuel respecté tant qu'on ne revient pas sur Auto). Maquette des 4 déclinaisons sur le même portrait d'abord (vigilance : le doré ne doit pas virer clinquant). Vérifier d'abord comment le Cadre Spectral actuel est construit (dessiné dans l'image au recadrage vs overlay). **CONFIRMÉ 31/07 (capture Blandine : cadre bleu figé sur fiche dorée)** : le cadre actuel est DESSINÉ DANS L'IMAGE au recadrage → la version 4 teintes devra être un OVERLAY UI posé par-dessus la photo (photo intacte, couleur qui suit la teinte en direct, conforme à la règle « jamais de filtre dans les photos »). Les photos au cadre bleu cuit dedans se nettoient en re-recadrant une fois (original conservé). Rappel lié : menu unique crayon+⋮ (section K) reconfirmé par Blandine le 31/07.
4. Architecture cible (section H) : page seconde à onglets, chapitre Performances cavalier, encart club.

### K. NOTES DE TOUTE FIN DE SOIRÉE (23h30 — à intégrer aux maquettes de la 70)
- **IPO déplacé SOUS/AVEC la carte Origines** (décision Blandine, affine la G) : le chapitre Performances = vidéo + coupes + résultats ; les indices rejoignent le pedigree.
- **Fil direction 3, specs enrichies** : cartes VERTICALES (confirmé), photos plus petites, défilement carrousel, et **ne pas toujours ouvrir sur le premier moment** (départ varié).
- **Consolidation crayon + ⋮ de la fiche cheval en UN seul menu** (décision Blandine) : 📷 Changer la photo · ✂️ Ajuster · 🏷️ Identifier · 🎨 Teinte · ✏️ Modifier · 🗑️ Supprimer. Coût assumé : changer la photo passe à 2 taps. À intégrer à la maquette tête de fiche.
- **Édition d'un post du fil** : impossible aujourd'hui (supprimer + republier). À considérer dans la refonte du fil.
- **Bug dézoom écurie** : cause = la purge anti-fantôme effaçait aussi les originaux légitimes sans empreinte → CORRIGÉ dans 65b08bab (purge seulement si l'empreinte CONTREDIT ; sans empreinte on garde) + garde-fou ratio (0.35–4). Limite résiduelle : originaux déjà purgés ce soir = perdus localement, remède = rechoisir la photo une fois.
- **Vidéo sur bandeau écurie : PAS ENCORE CONSTRUIT** (E.5) — le sélecteur photo n'accepte que des images, c'est normal ; le câblage vidéo viendra du bucket comme accueil/palmarès.

### L. BUGS SIGNALÉS 23h40 (diagnostiqués, PAS corrigés — pour la page seconde à onglets)
- **Swipe droit "retour" mort sur le panneau souvenirs** : le conteneur `#panneauCheval` porte `data-noswipe="true"` (bloque volontairement le swipe global). Remède : swipe de fermeture PROPRE au panneau, déclenché depuis le bord gauche uniquement (~24px) pour ne pas entrer en conflit avec les rails horizontaux internes.
- **Encart « Ses vidéos / Le voir en mouvement » perçu comme mort** : il appelle `props.onTout` → ouvre le panneau souvenirs… qui n'a AUCUNE section vidéos. Destination manquante, pas bouton cassé. À résoudre dans la page seconde à onglets (Souvenirs | Performances | Vidéos ?).
- Dernières retouches livrées dans l'index final **d4e83ad1** : marge 30px entre la vidéo cérémonie et le rail des coupes ; **médaillons masqués quand des coupes existent** (double emploi signalé par Blandine) ; le bouton **+** d'ajout migré en fin de rail des coupes ; doublon SIRE retiré (la pilule thématisée préexistante reste seule) ; toggle Écurie Hype entièrement thématisé (bordure/halo/curseur suivent la teinte).
- ⚠️ MÉTHODE (2 incidents ce soir) : écrire le fichier AVANT toute assertion risquée dans les scripts d'édition, sinon l'édit est perdu silencieusement ; et TOUJOURS chercher l'existant avant de construire (le doublon SIRE venait d'une pilule déjà présente non repérée).

### M. SPEC FINALE DU FIL (verrouillée 31/07 matin)
- **Fiche cheval** : rail horizontal direction 3 — max **6 encadrés verticaux** (média dominant, légende 2 lignes, auteur·date), départ **varié** (pas toujours le 1er), carte pointillée « Tout le fil → (n) » en bout de rail. Composer « Partage un moment… » compact au-dessus.
- **Page seconde, onglet Souvenirs** : la destination « Tout le fil » y présente **tous les posts en grille ordonnée de carrés** (idée Blandine 31/07), remplaçant la liste verticale actuelle.
- **Panneau souvenirs actuel** : son fil doublon disparaît (déjà acté).
- Option Cinéma (pleine largeur) : écartée pour le fil, mais notée comme langage possible ailleurs (couvertures, moments exceptionnels).

### F. À SAVOIR / DIVERS
- Quota Supabase : bandeau « restriction au 14 août » — chantier ménage/bande passante à ouvrir AVANT l'échéance.
- My Dream « de Blandine » n'a jamais existé en base (0 rows) : c'était la fiche démo ; désormais réel via migration.
- Génération vidéo : brief qui marche = cadrage large avec air autour du sujet, mouvement lent, boucle propre, zone basse calme, univers noir+cristaux ; filigrane « Ai » en haut-gauche → delogo x=18:y=22:w=78:h=52 (format 966x720).
- Blandine a demandé (mémorisé) : ne JAMAIS dire bonsoir/bonne nuit/bon matin ni aucune formule liée à l'heure.
- Petits posters : la maquette scène 6 phases, page scène v2, bas de fiche, accueil v3, palmarès/résultats club, fil 7 directions sont dans les livraisons du 30/07.


🔴 **À pousser** : `index.html` (livré directement sous ce nom).

**1. Qualité photos enfin livrée** (validée le 30/07, jamais poussée) : les deux `choisirPhoto` qui plafonnaient à 1600px/JPEG 0.9 passent à **2048px/0.92** (valeur Hey Baby, cohérence). Le 3e chemin (`hypeRecadrer`, avatars) reste à auditer.
**2. Carte Santé de la fiche cheval** : ne bascule plus le panneau passeport — **`setEcran("clinique")`** (décision Blandine : la santé renvoie vers la fiche vétérinaire). Le panneau passeport reste dans le code, simplement plus atteint par cette carte.
**3. Encart « La sellerie de [cheval] »** inséré sur la fiche, avant « Liens & partage » : titre 6 langues construit sur `c.nom` avec élision d'/de en FR, image `HYPE_IMGS.sellerieEncart` (repli SVG), → `setEcran("sellerie")`. Sellerie rattachée au cavalier (décision 30/07), matériel par cheval à trancher plus tard.
**4. Cartes Histoire/Carrière/Santé en carrousel** : le conteneur grille 3 colonnes devient un rail à glissement avec accroche (cartes 46%/max 180px, la 3e dépasse du bord). **5. Encart Aptitude réduit** : chiffre 25+3.5·pA → 23+2·pA, padding 12+2·pA → 10+1.5·pA, vignette 56+7·pA → 50+5·pA. **6. Fusion « Ses photos »** : `AlbumsPromus` transformé — charge TOUS les albums (plus seulement les promus), en-tête « Ses photos » avec bouton **+** (→ panneau souvenirs où vit la création), carte **« Toutes ses photos »** en tête (couverture = photo du cheval, → panneau souvenirs), **5 albums max** affichés puis bouton « Voir tous ses albums (n) » ; la section reste visible même sans album. Site d'appel enrichi (`photoDefaut`, `onTout`). Le composant garde son nom (1 seul site d'appel). La bannière « Hype Memories » (188px) et `GalerieSouvenirs` (vedettes) sont volontairement conservées — à réévaluer quand le panneau souvenirs sera retiré.

**7. Palmarès en médaillons inline** sur la fiche (avant la Sellerie) : jusqu'à 6 médaillons or/argent/bronze selon le rang (`c.palmares` : rang, épreuve, discipline · année), toucher → panneau Performances ; **état vide** = encart pointillé « Ses premiers résultats l'attendent… ou ses exploits » + « Ajouter un résultat » (6 langues), qui ouvre aussi le panneau. Le panneau Performances existant est conservé (c'est lui le détail complet).

**17. Quatre retouches (retour Rizotto en ligne)** : (a) **bleu par défaut pour TOUS les chevaux** — `sp.teinte` (CHEVAUX_SPECTRAL) retiré de la chaîne : `teinte = chevalDyn.teinte || "#20D9F5"` ; Rizotto passe au bleu, seule la teinte choisie via Modifier la fiche colore la page ; (b) encadré de l'histoire aéré (marges 18/20px) ; (c) écart IPO/PFS élargi (`.hstats` gap 12→22px) ; (d) **IPO grisé + crayon** quand aucun indice : chevaux réels, propriétaire seulement — saisie par prompt, **sauvée dans `chevaux.origines.indices` (JSON existant, AUCUN SQL requis)**, affichage immédiat + toast.

🔜 **PROCHAIN CHANTIER (page fraîche, maquette d'abord — spec Blandine 30/07)** : **bandeau Origines à retournement**. Recto : « Ses origines : [Père] x [Père de mère] » (notation d'élevage standard, ex. « Lando x Double Espoir »). Tap → le bandeau se retourne (flip) et révèle le détail complet (père/mère/naisseur/naissance, pedigree si rempli) avec un **petit crayon** pour développer/modifier. Données déjà disponibles dans `c.origines` (pedigree.pere.nom, pedigree.mere.pere.nom pour le recto). Livrer une maquette HTML du flip avant de coder.

**20. Photo de profil du cheval doublée + commandes réorganisées** : `.hero>img` reçoit `min-height:64svh` (max 88svh) — la photo occupe environ le double, recadrée cover ; en haut à droite ne reste QUE le drapeau des langues ; le crayon (= modifier la photo, `refPhotoCh` existant) et le menu ⋮ descendent **en bas à droite de la photo**. ⏳ **À faire (page fraîche)** : bouton **supprimer** la photo (passer `photo_url` à null) dans le menu ⋮, et **« Définir comme photo de profil » sur chaque photo d'album** (action à ajouter dans la visionneuse/les albums, écrit `chevaux.photo_url`). Fichier : **10 307 519 octets, md5 52e819d7…**

**19. L'histoire respire** : le récit sur la fiche passe de 5 à **12 lignes visibles** (`-webkit-line-clamp`), corps 13px, interligne 1,8 — l'encart au liseré animé (livraison précédente, à pousser) l'enveloppe déjà de haut en bas. « Découvrir son histoire » reste le chemin vers le récit complet.

**18. Encarts photo/vidéo « très gros »** (demande Blandine, comme l'ancienne page) : vignettes de la bande défilante **220×220** (au lieu de 150), encart Vidéos **150px de haut** (au lieu de 96). Présence vérifiée par grep. Fichier : **10 307 296 octets.

**17. Reconstruction après audit honnête.** ⚠️ **Correctif de SUIVI : deux modifications annoncées en (15) n'avaient JAMAIS été sauvegardées** (un échec d'assertion en fin de script annulait l'écriture entière, y compris les parties déjà « ok » — leçon : **une écriture par modification, et vérifier la PRÉSENCE dans le fichier, pas le message de succès**). Étaient perdus : le garde-fou propriétaire du pré-remplissage, et la requête profil du propriétaire. **Refait et vérifié présent cette fois** : (a) **carrés Clinique vétérinaire | Sellerie côte à côte** avant Liens & partage (6 langues, → `setEcran("clinique")`/`setEcran("sellerie")`) — décision Blandine, remplace l'encart sellerie pleine largeur et la bannière clinique disparue ; (b) **bande de photos 150px** (au lieu de 72) avec **défilement automatique doux** (0,6px/30ms, pause 2,6s au toucher, retour au début en douceur) ; (c) **encart Vidéos pleine largeur** sous les albums (aperçu vidéo en fond, compteur, → panneau souvenirs), rendu **seulement s'il existe au moins une vidéo** ; (d) **pré-remplissage de l'histoire au nom du PROPRIÉTAIRE du cheval** (requête `profiles` pseudo+ecurie sur `user_id`) visible par tous les visiteurs (« [Nom] est un [race] de l'écurie [du proprio], monté(e) par [proprio] »), phrase-crayon réservée au propriétaire. Fichier : **10 307 295 octets, md5 05674af8…** — présence des 4 chantiers vérifiée par grep avant livraison.

**16. La bande de photos puise dans la galerie fusionnée** : `AlbumsPromus` charge désormais aussi `chargerPhotosSouvenirs` (commentaires + albums) — les photos de galerie d'un cheval sans album (cas Elfe) apparaissent enfin sur la fiche, sous la grille. Repli sur les seuls albums si la fonction manque. ⚠️ **Point de confusion résolu avec Blandine : elle avait poussé une version deux livraisons en retard** (repère : texte générique encore visible + carré Nouvel album présent) — le pré-remplissage encadré (liseré animé + crayon), les cartes réduites et le palmarès remonté étaient déjà dans les livraisons non poussées. **Fichier final de la session : 10 299 972 octets, md5 d7c0fba9…**

**15. Cinq retouches d'affinage (session continue)** : (a) **pré-remplissage de l'histoire gaté sur le propriétaire** — pour un cheval visité (ex. Vallieres), plus de mention de l'écurie/cavalier du visiteur ni d'invitation au crayon : juste « [Nom] est un [race]. » ; (b) cartes Histoire/Carrière/Santé **réduites franchement** (30 % / 118px / h108, cercle 38) — les 3 tiennent à l'écran ; (c) **palmarès remonté au-dessus du fil** ; (d) **bande de photos défilante** (72px, photos+vidéos des albums, 14 max) sous la grille d'albums — **rendue uniquement s'il y a des photos** ; (e) **liseré animé `hype-cristal`** (dégradé conique tournant, couleur = teinte du cheval) autour de la description/histoire, repris de la page cavalier. ⚠️ Une parenthèse en trop détectée par `node --check` (bloc 11) pendant (d) — corrigée avant livraison, batterie repassée intégralement.

**14. Histoire pré-remplie + crayon** : pour un cheval sans histoire, le texte générique (« Un Selle Français au cœur de l'écurie Hype… ») est remplacé par un pré-remplissage personnalisé : « [Nom] est un [race] de l'écurie [profil.ecurie], monté(e) par [prénom]. Touche le crayon pour écrire son histoire. » (6 langues, morceaux conditionnels si écurie/cavalier absents). Un **crayon ✎** inline à côté de la description — visible uniquement pour le propriétaire (`chevalDyn.ownerId === moi.id`, chevaux réels) — ouvre l'éditeur `collerHistoire` existant (coller/saisir → `chevaux.histoire`).

**13. État vide de « Ses photos »** : pour un cheval sans album, un carré pointillé « Nouvel album + » (6 langues) s'affiche à côté de « Toutes ses photos » — paire équilibrée, invitation à remplir (→ panneau souvenirs où vit la création).

**12. Deuxième passe de nettoyage (décisions Blandine au fil des captures)** : le bloc **Récompenses** (Élite/Exception/Ambassadeur/Crystal) retiré de la fiche ; l'**encart Sellerie** retiré (elle n'en veut plus sur la fiche — la sellerie reste accessible depuis sa page). L'**encart Clinique vétérinaire de la fiche est conservé** à sa place (entre Ses photos et le fil) — note technique : c'est un bloc propre à `EcranCheval`, PAS le composant `EncartCliniqueVeto` (qui vit sur EcranEcurie/EcranGuilde) — piège de recherche documenté. La page se lit désormais : photo · nom · IPO/description · carrousel Histoire-Carrière-Santé · pastilles · Aptitude · Origines · Ses photos · Clinique · fil · Son palmarès · Liens & partage. **Idée en attente (pas d'accord ferme)** : un encart Vidéos, et le cadre à liseré reflet autour de « son histoire » comme la page cavalier ; photo du haut à passer bord à bord (immense, style écurie) — demandé, pas encore fait.

**11. Nettoyage du « mélange » ancien/nouveau sur la fiche** (constat Blandine après push) : les insertions étaient additives, deux blocs anciens devenus redondants sont maintenant retirés — **l'encart Souvenirs** (`GalerieSouvenirs` : « Conserve précieusement chaque moment » + photo vedette géante ; ⚠️ retire l'accès direct visionneuse/vedettes/ajout photo depuis la fiche — tout passe par le panneau souvenirs via « Toutes ses photos ») et **la bannière Hype Memories** (188px, redondante avec la carte « Toutes ses photos »). `EncartCliniqueVeto` et le bloc moments conservés. Le composant `GalerieSouvenirs` reste défini dans le code (plus appelé par la fiche).

**10. Bandeau de l'écran Écurie jusqu'en haut** : `ECV_CSS` — le `padding-top` de `.ecv .scroll` (safe-area + 12vh de vide) passe à 0, le `.hero` passe de `40vh/min 300px` à `calc(52vh + safe-area)/min calc(360px + safe-area)` : la photo monte sous l'encoche et est nettement plus grande. Les boutons posés sur la photo étaient déjà calés sur `safe-area-inset-top` — rien à ajuster.

**9. Fil élargi sur la fiche** : le padding racine de `MurHype` passe de `0 16px` à `0 10px` **uniquement en mode compact** (le bloc moments de la fiche cheval) — tous les autres murs de l'app inchangés.

**8. Teinte de la fiche, de bout en bout** : pastilles (bleu défaut / doré / crimson / vert) dans le formulaire « Modifier la fiche » → `modifierCheval` étendu (champ `teinte`, whitelist) → colonne `chevaux.teinte` → relue au chargement (`chevalDyn.teinte`) et **prioritaire sur `CHEVAUX_SPECTRAL`** dans `var teinte`. Toute la fiche suit déjà cette variable (bordures, cartes, jauges). ⚠️ **SQL à exécuter par Blandine AVANT de pousser** : `alter table chevaux add column if not exists teinte text;` (sans la colonne, la sauvegarde de la fiche échouerait). Chevaux démo (`CHEVAUX_FICHE`, sans dbId) : teinte non éditable, ils gardent leur teinte SPECTRAL.

**Découvertes utiles** : « Partager sa fiche » existe déjà sur la fiche (bloc Liens & partage) — rien ajouté ; **la teinte par cheval existe déjà** (`CHEVAUX_SPECTRAL[id].teinte`, défaut #20D9F5, helpers `teinteClaire`/`teinteRGBA`).

✅ Vérifs : base = fichier fourni par Blandine (identique octet à octet à la base du matin, chapitres 66/67 dedans) · `node --check` 14/14 · 887 fonctions identiques (diff complet) · `allerVersGalop` ×3 · rendu Playwright : les 2 seules erreurs (supabase CDN absent hors ligne, TEINTES_HYPE) sont **identiques sur le fichier d'origine** — préexistantes, pas liées aux modifications.

✅ **LA MAQUETTE EST INTÉGRALEMENT INSÉRÉE** (10 points, session 68 — SQL `chevaux.teinte` exécuté par Blandine le 30/07 ✔). Reste hors maquette : **Point ouvert : le panneau Passeport n'a plus aucun point d'entrée** (la carte Santé va désormais à la clinique ; `setPanneau("passeport")` ×0). Son code est intact — à trancher : absorber son contenu dans la page vétérinaire puis le retirer, ou lui redonner une porte. (le bloc moments compact existe, `momentsSeuls: true`) ; palmarès en médaillons inline avec état vide (« Ses premiers résultats l'attendent… ou ses exploits ») ; **sélecteur de teinte 🎨** branché sur `CHEVAUX_SPECTRAL[id].teinte` (défaut #20D9F5) + **persistance à créer** : colonne `chevaux.teinte` (SQL : `alter table chevaux add column if not exists teinte text;`) et lecture au chargement ; retrait éventuel de la bannière Memories et du panneau souvenirs une fois tout rapatrié ; partage public = lecture seule sans interaction. **Maquette de référence : `cheval-souvenirs-fusion.html`** (validée intégralement par Blandine le 30/07).

---

**Version actuelle de l'index.html : session du 30/07/2026 (67) — Chapitre « La santé du cheval » (g4-c5) construit à partir des traductions fournies, et OUVERT**

🔴 **À pousser** : `index.html` (+ `images/k643.jpg` si pas encore poussée avec la session 66 ; la couverture Santé k641 est déjà en ligne).

**1. Sources.** Le cours a été traduit en EN/ES/IT/JA/DE par une autre page (fichier `traductions-sante-cheval-g4.md`, 17 sections strictement parallèles par langue, vérifié par comptage). **Les 5 langues du chapitre viennent de ce fichier, extraites par programme** (aucune retraduction) ; le **français a été rédigé ici** (le fichier ne contenait que les traductions), fidèle au brief. **Décision de Blandine actée : température « 37,5 à 38 °C » conservée** (la référence FFE/IFCE monte à 38,5 — recommandation faite, choix respecté ; cohérent car la section Fièvre ne cite aucun chiffre). Décimales locales respectées : `37.5` en EN/JA, `37,5` ailleurs.

**2. Le chapitre** remplace le placeholder `g4-c5` (2 312 car, ancien format) en gardant son id — **et il est OUVERT** (`HYPE_COURS_PRETS`), couverture **k641 déjà déclarée et en ligne**. 3 pages de 3 cartes : « L'œil du soigneur » (cheval en bonne santé · constantes · signes d'alerte) · « Réagir sans soigner » (colique+boiterie · plaies+fièvre · bons réflexes) · « Prévenir plutôt que guérir » (soins qui protègent · l'œil du cavalier chaque jour · le savais-tu : il masque sa douleur). Citation de couverture : la phrase d'ouverture du brief (« Un cheval ne peut pas dire qu'il a mal… »), sans auteur. Cartes premium « La santé en 5 réflexes » = le résumé animé du brief (Observer→Comparer→Détecter→Prévenir→Protéger). Écran final nouveau format 2 pages : défi/questions Hey Baby/synthèse **extraits du fichier de trad** ; science (fièvre-défense, cœur à l'effort, inflammation), savais-tu (crottins/eau), glossaire 7 termes et raccourcis **rédigés en 6 langues**. QCM 10 questions sur les 6 thèmes du brief ; bonnes réponses rééquilibrées par permutation d'options : 0,1,2,1,0,1,2,1,2,0 (3/4/3).

**3. Limites annoncées à Blandine (déjà validées en amont)** : la scène interactive « repérer les signes sur un cheval » et les animations des constantes sont de vrais développements à part — traités ici en cartes + « Prochainement » ; à programmer comme la scène des phases du saut si souhaité.

✅ Vérifs : `node --check` 14/14 · aucun champ vide, cardinalités 6 langues égales · **convertisseur réel** : titre, 7 blocs, 10 questions, 3 sections résolus dans les 6 langues, 4 résidus i18n/langue attendus · dico aligné clé à clé sur le chapitre Soins · `g4-c5` unique · aucun doublon nouveau · « 37,5 à 38 » présent en FR, `37.5` en EN/JA.

⏳ **Points ouverts** : (a) couverture **k642** (extérieur) ; (b) infographie INFOG_SAUT_G3 à rebrancher (type de bloc à recréer) ; (c) doublons baby-c1…c6 ; (d) migration base64 ; (e) liens vidéos ; (f) scène interactive Santé (« Les yeux du cavalier ») si Blandine la veut.

---

**Version actuelle de l'index.html : session du 30/07/2026 (66) — Le chapitre perdu « Les 6 phases du saut » est reconstruit, en 6 langues, et OUVERT**

🔴 **À pousser** : `index.html` + **`images/k643.jpg`** (couverture cheval en pleine bascule, fournie par Blandine, 1122×1402 JPEG q90).

**1. `g3-saut` renaît.** Le chapitre disparu dans les croisements de versions (constat session 62) est réécrit d'après le nouveau brief de Blandine, inséré APRÈS `g3-c3` comme l'original. **Les deux références orphelines (`HYPE_COURS_PRETS`, `CATEGORIE_PAR_COURS`) pointent à nouveau sur du réel — le chapitre est donc immédiatement ouvert aux cavaliers**, sa couverture arrivant avec lui.
- Terminologie tranchée par Blandine : **« La suspension, aussi dite bascule »** — cohérent avec l'infographie k347/348/349 et la scène interactive.
- Couverture « LES 6 PHASES / DU SAUT » (k643, partage `#phases`), citation originale Hype sans auteur : *« Le saut commence bien avant la barre, et finit bien après. »*
- 2 pages de 3 cartes : « Avant de quitter le sol » (le saut commence dans la tête · l'abord · l'appel-ressort) · « Au-dessus de l'obstacle » (la montée et l'encolure-balancier · la suspension/bascule · la descente et la réception qui prépare déjà la suite). La frise du brief (observer→préparer→pousser→monter→basculer→recevoir→se rééquilibrer) clôt la dernière carte.
- **L'encart de la scène interactive** (`lien-phases-saut`) est inséré en page 4 — l'« activité interactive » du brief existait déjà, c'est elle.
- Cartes premium : **« Les 6 phases, dans l'ordre »** — l'aide-mémoire de l'examen.
- Écran final `complements-saut` **directement au nouveau format 2 pages** (Synthèse+Glossaire+« Poste tes questions à Hey Baby », puis bonus+QCM). Défi 5 points, science (la mécanique du ressort et de la bascule), glossaire 7 termes.
- QCM 10 questions. **Les bonnes réponses du brouillon retrouvé présentaient des répétitions (0,1,2,0,0,1,1,1,1,0) : les OPTIONS de 4 questions ont été permutées** (contenu inchangé) pour obtenir 0,1,2,0,1,2,0,1,2,0 — jamais deux fois de suite, répartition 4/3/3.
- Vidéos : « Prochainement », Blandine fera tous les liens plus tard.
- Raccourci d'aperçu **`phases`** ajouté (→ le cours ; `phases-saut` reste le raccourci de la scène).

**2. Note honnête sur les fichiers retrouvés.** `quiz_s.py` et `compl_s.py` existaient déjà dans mon espace de travail (écrits avant une compaction de session) ; ils ont été **revérifiés champ par champ** avant usage (cardinalités 6 langues, aucun vide) plutôt que refaits — seul l'ordre des bonnes réponses a dû être corrigé.

**3. Doublons `baby-c1`…`baby-c6` signalés mais NON touchés** : la recherche de doublons les remonte, mais vérification faite, **ils préexistaient dans le fichier de Blandine** (structure du Chemin Baby, vraisemblablement voulue par la page qui l'a construit). Rien modifié — à regarder un jour à part, pas en pièce jointe d'une autre livraison.

✅ Vérifs : `node --check` 14/14 après insertion · contrôle 6 langues : aucun champ vide, cardinalités égales · **convertisseur réel exécuté** : titre, 7 blocs, 10 questions, 2 titres de section résolus dans les 6 langues, et 4 résidus i18n par langue (`titre1`, `titre2`, `citation`, `donnees` premium) — attendus, identiques aux chapitres en ligne · dico : clés strictement identiques au chapitre Soins · `g3-saut` unique dans le fichier · k643 déclarée une fois, utilisée une fois.

⏳ **Points ouverts** : (a) chapitre **Santé** (`g4-c5`) — brief reçu, à écrire au format riche, couverture k641 prête ; (b) couverture **k642** (extérieur) toujours manquante ; (c) l'infographie INFOG_SAUT_G3 (k347/348/349) n'est PAS réinsérée dans le chapitre : le type de bloc `image` n'existe plus dans le lecteur — à discuter (nouveau type de bloc, ou onglet dans la scène interactive ?) ; (d) doublons baby-c1…c6 à examiner ; (e) migration base64 ; (f) liens vidéos.

---

**Version actuelle de l'index.html : session du 30/07/2026 (65) — Vérification de l'index de Blandine + patch couvertures/citations + découpe de l'écran final en 2 pages**

🔴 **À pousser** : `index.html`.

**0. Vérification de l'index reçu (« Vérifie »).** Comparé caractère par caractère à ma dernière version : **tout le travail des sessions 56-64 est présent** (chapitres identité/nourrir/extérieur, abord réécrit, g6-c7, encarts phases du saut, filet jpg/jpeg, correctif scroll, correctif session localStorage). En plus chez Blandine : **le correctif des albums d'écurie d'une autre page** (la cible utilise désormais l'id du cavalier `ecurie:<id>` au lieu du nom affiché — le repli « Écurie Feinn » faisait partager le même album à tous les cavaliers sans écurie ; migration `migration_albums_ecurie.sql`). **Conservé intact, revérifié après mes modifications.**

**1. Patch maître appliqué** (préparé en session précédente, idempotent, chaque cible comptée) :
- **Citation vide** : `CouvAffiche` n'affiche plus «""» quand un cours n'a pas de citation.
- **Nom du chapitre sur la couverture** (demande de Blandine : « on s'y perd ») : petit label Montserrat espacé, majuscules, au-dessus du grand titre Cinzel — hiérarchie de la bible Hype (petit label → grand titre → petite phrase). Le call site passe `cours.titre`, le composant ne le rend que s'il est fourni : aucune autre entrée de `CouvAffiche` n'est affectée.
- **Citations ajoutées** aux 3 chapitres qui n'en avaient pas (identité, nourrir, extérieur) — **originales Hype, sans auteur** : on n'attribue jamais une phrase inventée à une personne réelle.
- Filet jpg/jpeg : déjà présent dans son index, rien à refaire.

**2. Découpe de l'écran final en 2 pages** (validée en conversation) :
- `COMPL_NAV.hbTitre` : « Une question avant le QCM ? » → **« Poste tes questions à Hey Baby »** dans les 6 langues (l'ancien libellé que Blandine préférait).
- `ComplementsBiomeca` accepte une prop **`partie`** : `1` = Synthèse + Glossaire + Hey Baby · `2` = invitation aux bonus + Défi/Vidéo/Approfondir + bouton QCM · absente = tout (compatibilité).
- **Les 15 chapitres** à écran final passent à deux blocs `{"partie": 1}, {"partie": 2}` — soit **une page de plus par chapitre**, le QCM arrivant après la page bonus.
- **Détail important attrapé en vérification** : la `key` React devient `"compl-x" + partie`, sinon React réutiliserait le même état de composant entre les deux pages (le hub interne defi/video/plus garderait sa vue en passant d'une page à l'autre).
- **15e routage rattrapé** : `complements-biomeca` n'a pas de paramètre `dico:` (il utilise le dictionnaire par défaut), la première passe l'avait manqué — repéré parce que le compte ne tombait pas juste (14/15), corrigé, recompté 15/15.

**3. ⚠️ CORRECTION sur la Santé (je m'étais trompé).** Le chapitre Santé visible sur la capture de Blandine est **l'ANCIEN placeholder `g4-c5`** (2 312 caractères, ancien format intro/liste/qcm) — visible par elle **parce qu'elle est modératrice**. **Le chapitre riche 6 langues n'existe pas encore** ; j'avais affirmé à tort qu'une autre page l'avait écrit. Le document du cours est donc à (re)fournir — ou je l'écris — la couverture k641 est prête. `g4-c5` volontairement laissé HORS de `HYPE_COURS_PRETS` : ouvrir l'ancien format léger serait un contresens.

✅ Vérifs : `node --check` OK sur les **14 blocs script** après chaque étape · patch idempotent (relancé à blanc : 0 octet de différence) · 15/15 routages recomptés · `COMPL_NAV` relu en JSON réel après écriture (6 langues) · correctif albums d'écurie revérifié présent après toutes mes passes.

⏳ **Points ouverts** : (a) chapitre **Santé** à écrire au format riche (document à fournir, k641 prête) ; (b) couverture **k642** (extérieur) ; (c) `g3-saut` manquant ; (d) migration hors base64 ; (e) liens vidéos (après, pour tous les chapitres) ; (f) après déploiement, si des couvertures manquent encore : clés + capture du dossier `images/` GitHub.

---

**Version actuelle de l'index.html : session du 30/07/2026 (64) — Filet de sécurité jpg/jpeg : les couvertures ne peuvent plus disparaître pour une histoire d'extension**

🔴 **À pousser** : `index.html`. (⚠️ Cet index contient aussi la session 63, le chapitre abord réécrit — c'est le même fichier.)

**1. 🐛 Couvertures G4 invisibles (signalé par Blandine).** Cause la plus probable identifiée : l'app attend un **mélange historique d'extensions** — `k603` à `k629` en `.jpeg`, `k630` et suivantes en `.jpg` — alors que l'iPhone exporte en `.jpeg` et que les renommages manuels se mélangent facilement. Un seul caractère d'écart et Netlify répond « Page not found ».

**2. Correctif : un filet de sécurité global, plutôt que 40 noms exacts à deviner.** Écouteur `error` **en capture** (l'événement `error` des `<img>` ne remonte pas en bulle) : si une image `images/kNNN.jpg` ou `.jpeg` ne charge pas, on retente **une seule fois** avec l'autre extension (marqueur `data-hypeSwap`, aucune boucle possible). Ne touche que les chemins `images/kNNN.*` : les logos, les `data:` base64 et tout le reste sont ignorés (regex testée hors navigateur sur les 5 cas). Résultat : **quel que soit le nom réellement poussé** (`.jpg` ou `.jpeg`), la couverture s'affiche — dans les deux sens du mélange.
- Ça ne répare pas un fichier **absent** ou mal numéroté : si une couverture manque encore après déploiement, c'est que le fichier n'est pas sur GitHub du tout, et le test reste `https://majestic-melba-997a68.netlify.app/images/kNNN.jpg` (puis `.jpeg`) dans Safari.
- À terme, la règle documentée en session 60 reste la bonne (tout en `.jpg` à partir de k630) — le filet est là pour que la règle ne soit plus un point de défaillance unique.

**3. Découpe de l'écran final : préparée, PAS appliquée.** L'analyse du composant `ComplementsBiomeca` est faite : c'est un **hub** (Synthèse · Glossaire · Hey Baby « Une question avant le QCM ? » · invitation aux bonus Défi/Vidéo/Approfondir · bouton QCM), partagé par 12 chapitres via `COMPL_NAV`. Le plan validé dans la conversation : **page 1** = Synthèse + Glossaire + Hey Baby (avec retour du libellé **« Poste tes questions à Hey Baby »** dans `COMPL_NAV`, 6 langues) · **page 2** = l'envie d'approfondir (les cartes bonus + bouton QCM). Implémentation prévue par une prop `partie` sur le bloc (`{ type: "complements-x", partie: 1|2 }`), l'absence de `partie` rendant tout comme aujourd'hui — donc migration chapitre par chapitre sans big bang. **En attente du prochain index de Blandine pour coder ça proprement dessus.**

✅ Vérifs : `node --check` OK sur les **14 blocs script** · regex du filet testée hors navigateur (swap dans les deux sens, `.png` et `data:` ignorés) · marqueur anti-boucle vérifié dans le code inséré.

⏳ **Points ouverts** : (a) la **découpe de l'écran final** ci-dessus, à coder sur le prochain index ; (b) couverture **k642** ; (c) chapitre **Santé** `g4-c5` ; (d) `g3-saut` manquant ; (e) migration hors base64 ; (f) si des couvertures restent invisibles **après** ce déploiement, m'envoyer la liste des clés et une capture du dossier `images/` sur GitHub.

---

**Version actuelle de l'index.html : session du 29/07/2026 (63) — Chapitre `g3-c3` réécrit en version enrichie « Préparer un bon abord à l'obstacle »**

🔴 **À pousser** : `index.html`.

**Base** : le fichier renvoyé par Blandine, qui contenait **un correctif d'une autre page absent de ma copie** : `stockageHype` écrit désormais **toujours** dans `localStorage`. Avant, dès que la case « Se rappeler de moi » avait été décochée une seule fois, la clé `hype_rappeler` restait à « 0 » indéfiniment et la session partait dans `sessionStorage` — d'où les demandes de reconnexion incessantes signalées par les cavaliers. **Vérifié présent après mon intervention.** Rappel : toujours partir du fichier de Blandine, jamais d'une copie gardée.

**1. `g3-c3` remplacé, pas dupliqué.** Blandine a envoyé un brief nettement plus riche sur le même sujet que le chapitre existant « Aborder un obstacle avec justesse ». Plutôt que créer un doublon (on vient d'en retirer trois au Galop 4), le chapitre a été **réécrit à la place de l'ancien**, en conservant son `id` — donc `HYPE_COURS_PRETS`, `CATEGORIE_PAR_COURS`, l'encart des phases du saut et les raccourcis continuent de fonctionner sans rien toucher.
- **Conservés à l'identique** : la couverture (k362), la citation **et son attribution à Nuno Oliveira**. Le brief proposait une version rallongée de cette phrase : **refusé de l'utiliser**, on ne rallonge pas une citation attribuée à une personne réelle. Blandine a confirmé qu'on gardait celle de Nuno.
- **Nouveau titre** : « Préparer un bon abord à l'obstacle ». Durée 11 → **14 min**.
- **3 pages de 3 cartes** (9 cartes, contre 6 pour les chapitres récents) : « Tout commence dans le virage » (le saut est déjà joué · le virage précédent · un galop qui ne change pas) · « Ne change plus rien » (de la tête aux talons, avec le poids qui se répartit et non qui se force · les dernières foulées et la liste de ce qui se dérègle · le cheval ressent tout, plus la respiration) · « Faire confiance » (l'astuce du coach : compter · attendre son cheval · les erreurs fréquentes).
- Cartes premium : « Les 5 questions avant l'obstacle » (équilibré · actif · droit · sur sa ligne · galop régulier) — c'est le conseil du coach du brief transformé en aide-mémoire.
- Écran final `complements-abord` : nouveau dictionnaire `COMPL_ABORD_I18N`, 16 libellés génériques repris par programme du chapitre Soins. Glossaire complet des **8 termes** demandés. Défi à **6 points de contrôle** (le seul chapitre à en avoir 6).
- « La science explique » : le cheval a besoin de ses **deux yeux** pour évaluer une distance, ce qui n'est possible que droit devant lui — d'où l'importance de la rectitude — et il a un **angle mort sous le nez** dans les dernières foulées, donc il saute en partie de mémoire. C'est l'argument qui donne sa force à tout le chapitre.
- QCM : bonnes réponses **A,C,B,A,B,C,A,B,C,A** (0,2,1,0,1,2,0,1,2,0), jamais deux fois de suite la même lettre, répartition 4/3/3.
- **Vidéos** : aucun lien inventé. Le bloc reste en « Prochainement », Blandine fera les liens plus tard (sa décision).
- Raccourci d'aperçu **`abord`** ajouté à `CIBLE_DIRECTE` (il n'en existait aucun vers `g3-c3`).

**2. Coquilles attrapées en relecture** (toutes trouvées en relisant le fichier produit, pas en me relisant de mémoire) : *scegle* → *sceglie* ×3 en italien, *supersticion* → *superstición* en espagnol, et un **kanji inexistant** dans le japonais de « Pour aller plus loin » (鍉える au lieu de 鍛える). À noter aussi une **erreur de ma part corrigée dans la foulée** : en passant les coquilles, j'ai retiré l'accent de *jóvenes*, qui était correct. Remis.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · contrôle programmatique des 6 langues : aucun champ vide, cardinalités strictement égales · dictionnaire : jeu de clés identique à celui du chapitre Soins · **convertisseur réel sur les 6 langues** : titre, 6 blocs, 10 questions et les 3 titres de page résolus partout ; 5 résidus i18n par langue (`titre1`, `titre2`, `citation`, `auteur`, `donnees` premium) — **l'ancien chapitre en donnait exactement les 4 mêmes** (il n'avait pas de cartes premium), donc comportement normal · doublons relancés sur les 8 Galops : aucun id en doublon · correctif `localStorage` de l'autre page revérifié présent.

⏳ **Points ouverts** : (a) **la découpe de l'écran final** — Blandine trouve les chapitres trop longs et propose de scinder l'écran final en deux pages, avec le retour de l'ancien intitulé « Poste tes questions à Hey Baby » et la partie « approfondir » en fin de parcours. **Rien codé, proposition en cours de discussion** ; ça touche le composant partagé par 12 chapitres, donc une seule décision à prendre puis une passe mécanique. (b) couverture **k642** (cours extérieur) ; (c) chapitre **Santé** `g4-c5`, couverture k641 prête ; (d) `g3-saut` (« Les 6 phases du saut ») toujours manquant, deux références orphelines ; (e) migration hors base64.

---

**Version actuelle de l'index.html : session du 29/07/2026 (62) — La maquette « Les phases du saut » est enfin accessible + un chapitre du Galop 3 découvert manquant**

🔴 **À pousser** : `index.html`.

**1. La maquette existait mais n'avait aucun point d'entrée.** L'écran `EcranPhasesSaut` (scène demi-cercle, cheval spectral, 5 pastilles cliquables) était bien dans le fichier, enregistré dans le routeur, avec ses raccourcis `#phases-saut` / `#phasessaut` — mais **la page qui l'a construit avait volontairement laissé le bouton de côté** (« aucun point d'entrée utilisateur branché pour l'instant, emplacement à valider avec Blandine »). D'où l'impression qu'elle avait disparu.

**2. Nouveau bloc de cours `lien-phases-saut`**, composant `BlocLienPhasesSaut` : encart-affiche (halo turquoise, titre Cinzel « LES PHASES / DU SAUT », phrase en Cormorant italique, bouton dégradé turquoise) qui ouvre l'écran interactif. 6 langues. Rendu comme un bloc, donc **une page du cours** — un seul composant, réutilisable partout où on ajoutera `{ type: "lien-phases-saut" }`.
- **Galop 4** — `g4-obstacles-equilibre` « L'équilibre sur un parcours d'obstacles » : inséré **après les deux séries de cartes, avant les cartes premium**. Ordre final : couverture · cartes · cartes · **scène** · cartes premium · écran final.
- **Galop 3** — `g3-c3` « Aborder un obstacle avec justesse » : inséré **en dernière page** du chapitre (il n'a pas d'écran final ni de cartes premium).
- Formulation vérifiée contre la maquette : elle compte **5 pastilles**, la phrase dit donc « cinq instants du saut » et non six.

**3. 🔴 DÉCOUVERTE IMPORTANTE — le chapitre `g3-saut` « Les 6 phases du saut » n'existe plus dans le fichier.** Cherché pour y placer l'encart : les 5 occurrences de « 6 phases du saut » sont **toutes dans des commentaires HTML**, aucune définition de cours. Vérifié exhaustivement : `COURS_GALOP3_FR` contient `g3-c1` à `g3-c15` + `g3-qcm-global`, **pas `g3-saut`**.
- Il reste **deux références orphelines** qui pointent dans le vide : `"g3-saut": "2026-01-01"` dans `HYPE_COURS_PRETS` et `"g3-saut": "technique"` dans `CATEGORIE_PAR_COURS`. Sans effet visible (aucune carte ne s'affiche pour un cours inexistant), mais à nettoyer ou à réutiliser selon la décision.
- Vraisemblablement perdu dans les croisements de versions du 29/07 (voir session 46, qui documente déjà deux pertes du même genre).
- **Rien n'a été supprimé ni recréé** : décision à prendre avec Blandine. Le contenu de ce chapitre est bien documenté dans les commentaires (6 phases : abord/appel/montante/suspension/descendante/réception, affiche multilingue k347/k348/k349, QCM de 10 questions dont les bonnes réponses sont notées) — il est **reconstructible**, et au format 6 langues cette fois.
- ⚠️ Les autres chapitres G3 annoncés dans `HYPE_COURS_PRETS` ont tous été vérifiés un par un : **tous présents**. `g3-saut` est le seul manquant.

**4. Coquille japonaise attrapée avant livraison.** La phrase de l'encart contenait ヘース au lieu de ペース (« à ton rythme »). Trois tentatives de correction ont été nécessaires — les katakana ヘ/ベ/ペ/パ ne diffèrent que d'un point de code (\u30d8 / \u30d9 / \u30da / \u30d1) — et le caractère final a été **vérifié par affichage réel**, pas supposé.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · les deux chapitres relus après insertion (ordre des blocs affiché et contrôlé) · **le composant exécuté hors navigateur dans les 6 langues** avec un faux React : les 6 textes sortent non vides à chaque fois et le clic sur le bouton appelle bien `setEcran("phases-saut")` · inventaire complet des ids `g3-` du fichier croisé avec `HYPE_COURS_PRETS`, `CATEGORIE_PAR_COURS` et les raccourcis d'aperçu (résultat au point 3).

⏳ **Points ouverts** : (a) **`g3-saut` à trancher** : je le réécris en 6 langues, ou on nettoie les deux références orphelines ; (b) la couverture **k642** du cours extérieur ; (c) le chapitre **Santé** (`g4-c5`), couverture k641 prête ; (d) la migration hors base64 (voir la note de la session 61 : déplacer le bloc de déclarations `images/` après la dernière balise `hype-images`).

---

**Version actuelle de l'index.html : session du 29/07/2026 (61) — Chapitre « Sortir en extérieur et franchir les embûches » + correctif scroll de la fiche de reprise**

🔴 **À pousser** : `index.html`. ⚠️ **Il manque la couverture `images/k642.jpg`** — pas encore fournie.

**1. 🐛 Correctif : la fiche de reprise s'ouvrait au milieu de la page.** Signalé par Blandine : depuis le bas de la page du Galop 4, « Réviser cette reprise (fiche officielle) » atterrissait en plein milieu de la fiche. **Cause trouvée : `EcranReprisesFiches` n'avait aucun `useEffect`** — donc aucune remise du scroll à zéro au montage. Le bouton fait un simple `setEcran("reprises")`, et comme il n'existe **aucune remise en haut globale** au changement d'écran dans l'app (chaque écran s'en charge lui-même : `EcranPremium` le fait, `EcranCours` le fait à chaque bloc), la fenêtre gardait la position de scroll de la page du Galop — qui est longue, et dont le bouton est tout en bas.
- Correctif : `React.useEffect(function () { window.scrollTo(0, 0); }, []);` ajouté au montage du composant, exactement le même motif que celui déjà utilisé ailleurs dans le fichier.
- **Le bouton principal « Reprise de dressage » (grande carte) mène au même écran** : il est corrigé du même coup.
- ⚠️ **À tester en vrai sur le téléphone** : le bug ne se reproduit qu'en arrivant depuis le bas d'une page longue, donc un aperçu direct ne le montre pas. La correction est vérifiée dans le code, pas au doigt.
- Point voisin, **non corrigé** : au retour vers la page du Galop, la restauration du scroll (`window.__scrollGalopDetail`) dépend d'un `useEffect` dont la dépendance est `[galopOuvert]`, qui ne change pas dans ce va-et-vient — le retour risque donc de se faire en haut de la page plutôt qu'à l'endroit quitté. Comportement antérieur, à trancher séparément.

**2. Nouveau chapitre `g4-exterieur` « Sortir en extérieur et franchir les embûches »**, Galop 4, 6 langues écrites ici. Couverture « DEHORS, / TOUT S'ANTICIPE » (k642, partage `#exterieur`), pas de citation. Catégorie **technique**. Durée 12 min.
- Bloc 1 « Avant de partir » : préparer la sortie (matériel, sanglage revérifié à cheval, santé, consignes) · pourquoi il a peur dehors (les 5 déclencheurs, les 4 réactions, animal de fuite — il ne désobéit pas) · monter en groupe (sa place, pas de dépassement, distances, le groupe comme sécurité).
- Bloc 2 « Sur le terrain » : le terrain et l'allure (le pas pour les passages difficiles, montée/descente, et les trois réactions du cheval) · franchir les embûches (flaque, gué, pont, passage étroit, branches, barrière — un principe unique) · croiser, traverser, ne rien forcer (véhicules, vélo/piéton/chien, route sur consigne, pied à terre, puis les 6 erreurs à éviter).
- Cartes premium : « La sortie en 5 réflexes » (anticiper · adapter l'allure · garder les distances · observer le terrain · rester calme). **La sécurité elle-même reste hors Premium** — les cartes premium ne servent que de moyen mnémotechnique, aucune consigne de sécurité n'y est enfermée.
- Écran final `complements-exterieur` : nouveau dictionnaire `COMPL_EXTERIEUR_I18N`, les 16 libellés génériques repris par programme du chapitre Soins.
- « La science explique » : la vision du cheval (yeux latéraux, mauvaise évaluation des distances devant lui, angle mort sous le nez, adaptation lente à la lumière) — c'est ce qui justifie le « laisser le cheval observer » qui revient dans presque toutes les consignes, et le « Le savais-tu ? » du document sur la flaque qui change selon la lumière.
- QCM : bonnes réponses **B,C,A,B,A,C,B,A,C,B** (indices 1,2,0,1,0,2,1,0,2,1), jamais deux fois de suite la même lettre, répartition 3/4/3.

**3. ✅ Doublon retiré : `g4-c4` « Sortir en extérieur et franchir les embûches »** — ancien placeholder verrouillé, même titre. Troisième de la série après `g4-c7` et `g4-c6`, même méthode : vérification qu'aucune autre référence n'existait (0 occurrence restante). Le Galop 4 reste à **15 chapitres** ; il ne reste plus qu'un seul placeholder ancien format, `g4-c5` (Santé), dont la couverture k641 est déjà prête.

**4. ⚠️ Chapitre pas ouvert aux cavaliers, volontairement** — `g4-exterieur` n'est **pas** dans `HYPE_COURS_PRETS` faute de couverture (même raison que Nourrir avant réception de k640). Une ligne à ajouter dès que k642 arrive.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · contrôle programmatique des 6 langues : aucun champ vide, cardinalités strictement égales, indices de bonnes réponses identiques partout · dictionnaire : jeu de clés strictement identique à celui du chapitre Soins, cardinalités vérifiées · **convertisseur réel exécuté sur les 6 langues** : titre, 5 blocs, 10 questions, 2 titres de section résolus partout, et exactement **3 résidus i18n par langue** (`couv/titre1`, `couv/titre2`, `donnees` premium) — les mêmes que les chapitres déjà en ligne, donc comportement normal · recherche de doublons relancée sur les 8 Galops : **aucun id en doublon** · correctif scroll relu dans le fichier réel après écriture (présent une fois, bien à l'intérieur de `EcranReprisesFiches`).

⏳ **Points ouverts** : (a) **la couverture k642** ; (b) le chapitre **Santé** (`g4-c5`) à écrire, couverture k641 prête ; (c) **la migration hors base64** — voir la note ci-dessous, c'est le sujet à trancher ; (d) la phrase « Un cheval trempé refroidit plus difficilement » (session 55).

**📌 Note pour la migration hors base64 (à trancher avec Blandine).** Découverte en auditant les images : le bloc de déclarations `images/` se trouve dans le fichier **AVANT** `hype-images-120.js`, `-121.js` et `-122.js`. Or la dernière déclaration exécutée gagne. **Toute clé migrée vers `images/` qui serait aussi définie dans l'un de ces trois derniers fichiers se ferait donc réécraser en base64.** Quand on lancera la migration, le bloc de déclarations `images/` devra être **déplacé après la dernière balise `hype-images`**. À faire une fois, proprement, avant de migrer quoi que ce soit. Également repéré : les numéros **3, 4 et 5 ne sont pas chargés** (119 balises pour des numéros allant de 1 à 122) — à vérifier sur GitHub.

---

**Version actuelle de l'index.html : session du 29/07/2026 (60) — Couverture de Nourrir remplacée (image seule, index inchangé)**

🔴 **À pousser** : **`images/k640.jpg`** uniquement, en écrasant la version précédente. **L'`index.html` de la session 59 reste valable, il n'a pas été modifié** — la clé k640 et le chemin `images/k640.jpg` ne changent pas, donc aucune ligne de code à toucher. (Restent à pousser si ce n'est pas fait : k638, k639, k641 + l'index de la session 59.)

**1. Nouvelle couverture pour « Nourrir son cheval »** à la demande de Blandine : cavalière donnant à manger dans le creux de la main, cheval noir tête basse, cercle de lumière et cristaux. 941 × 1672, JPEG q90. Remplace le visuel filet à foin / bac de granulés / seau d'eau de la session 59.

**2. ⚠️ Point d'art direction signalé à Blandine, pas tranché.** Le nouveau visuel montre un geste de **friandise donnée à la main**, alors que le chapitre dit explicitement l'inverse dans sa carte « Les friandises » : *« Une friandise reste une friandise : elle récompense, elle ne nourrit pas »*, et *« jamais sans l'autorisation du propriétaire ou de l'enseignant »*. La couverture porte donc le seul geste que le cours encadre. Ce n'est pas bloquant — la photo est superbe et l'image d'un cavalier qui nourrit son cheval reste juste — mais **le visuel précédent illustrait les trois éléments du cours d'un seul coup d'œil** (fourrage, concentrés, eau). Décision laissée à Blandine ; l'ancien visuel est conservé de côté sous le nom `k640-precedente-filet-a-foin.jpg` au cas où elle voudrait le réutiliser ailleurs (prochaine clé libre : **k642**).

✅ Vérifs : aucune modification de l'index, donc aucun contrôle de code nécessaire — vérifié que la clé k640 est bien déclarée une fois et utilisée une fois (la couverture du chapitre), et que le nom de fichier attendu est exactement `images/k640.jpg`.

---

**Version actuelle de l'index.html : session du 29/07/2026 (59) — Couverture de Nourrir livrée, chapitre ouvert + k641 réservée pour le futur chapitre Santé**

🔴 **À pousser** : `index.html` + **`images/k640.jpg`** + **`images/k641.jpg`**. (Rappel : `k638.jpg` et `k639.jpg` de la session 56 aussi, si ce n'est pas déjà fait.)

**1. `k640.jpg` reçue — le chapitre « Nourrir son cheval » est ouvert.** Visuel parfaitement dans le sujet : cheval noir mangeant dans un bac de granulés, **filet à foin** à gauche et **seau d'eau** à droite — les trois éléments essentiels du chapitre (fourrage, concentrés, eau) sont dans la même image, sans une ligne de texte. 941 × 1672, JPEG q90, 356 Ko. `"g4-nourrir": "2026-07-29"` ajouté à `HYPE_COURS_PRETS` : le chapitre passe de « Prochainement » à ouvert **avec son badge NEW** (qui expirera tout seul dans 7 jours, mécanisme de la session 55). Le Galop 4 compte désormais **12 chapitres ouverts** sur 15.

**2. `k641.jpg` réservée pour le chapitre Santé.** La seconde image (cheval en transparence avec points lumineux sur les articulations, stéthoscope, cristaux) correspond au placeholder `g4-c5` « Santé : normes, signes de maladie, premiers gestes », **pas encore écrit au format riche**. La clé est **déclarée mais pas encore utilisée** : rien ne s'affiche nulle part, aucun risque, et le jour où le chapitre sera écrit il n'y aura plus qu'à pointer sa couverture dessus. 941 × 1672, JPEG q90, 254 Ko.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · `HYPE_COURS_PRETS` **relu dans le fichier réel** après écriture : 76 clés, aucun doublon, 12 chapitres du Galop 4 ouverts dont Nourrir à la bonne date · **contrôle systématique des clés orphelines** : toutes les clés k630 et suivantes utilisées dans le fichier sont bien déclarées (c'était précisément le bug de k638 en session 56 — le contrôle est désormais fait à chaque livraison d'image).

⏳ **Points ouverts** : (a) la 3ᵉ image du premier lot (cheval aux longues rênes) reste réservée au futur chapitre riche `g6-c3` « Travail à la longe et aux longues rênes » — prochaine clé libre **k642** ; (b) le chapitre **Santé** (`g4-c5`) à écrire au format riche 6 langues, sa couverture est prête ; (c) la phrase FR « Un cheval trempé refroidit plus difficilement » (session 55), toujours en attente d'arbitrage.

---

**Version actuelle de l'index.html : session du 29/07/2026 (58) — Chapitre « Nourrir son cheval » en 6 langues + doublon `g4-c6` retiré**

🔴 **À pousser** : `index.html`. ⚠️ **Il manque la couverture `images/k640.jpg` — aucun visuel reçu pour ce sujet.**

**1. Nouveau chapitre `g4-nourrir` « Nourrir son cheval »**, Galop 4, 6 langues écrites ici. Couverture « NOURRIR / SON CHEVAL » (k640, partage `#nourrir`), pas de citation. Catégorie **vie**, comme les protections et les soins.
- Gabarit identique aux chapitres G4 récents : couverture, 2 blocs de 3 cartes, Cartes premium, écran final, QCM 10 questions × 3 options.
- Bloc 1 « Fait pour manger toute la journée » : un estomac fait pour brouter (petit estomac, digestion presque continue, petites quantités) · le fourrage la base (herbe/foin/enrubanné, fibres, salive, on ajoute les granulés au foin, on ne remplace pas) · l'eau jamais négociable (propre, fraîche, à volonté ; besoins accrus par la chaleur, l'effort **et le foin** — le piège de l'hiver).
- Bloc 2 « Ajuster la ration » : les concentrés un complément (seulement si le fourrage ne suffit plus, beaucoup de chevaux n'en ont pas besoin) · les friandises (occasionnelles, **jamais sans autorisation** — régimes et maladies invisibles de l'extérieur ; une friandise récompense, elle ne nourrit pas) · les erreurs à éviter (les 6 du document, le changement brutal développé comme le plus sous-estimé).
- Cartes premium : « La ration en 5 règles » (fourrage d'abord · eau à volonté · petites prises · changer lentement · à chacun sa ration).
- Écran final `complements-nourrir` : nouveau dictionnaire `COMPL_NOURRIR_I18N` + une ligne de routage, même méthode que pour l'Identité — les **16 libellés d'interface génériques sont repris par programme** du dictionnaire du chapitre Soins, pas retapés.
- QCM : bonnes réponses **C,A,B,C,B,A,C,B,A,C** (indices 2,0,1,2,1,0,2,1,0,2), jamais deux fois de suite la même lettre, répartition 3/3/4.
- Terminologie contrôlée : fourrage → forage / forraje / foraggio / 粗飼料 / Raufutter · enrubanné → haylage / hierba encintada / fieno fasciato / ラップサイレージ / Anwelksilage · concentrés → concentrates / concentrados / concentrati / 濃厚飼料 / Kraftfutter · ration → ration / ración / razione / Ration.
- **Titre japonais retouché après relecture** : « 馬を養う » (littéraire, plutôt « entretenir ») remplacé par « 馬の食事 », plus naturel et lisible sur une couverture. Corrigé aux 3 endroits (titre du chapitre, titre1 et titre2 de la couverture).

**2. ✅ Doublon retiré : `g4-c6` « Nourrir son cheval »** — ancien placeholder verrouillé, format ancien, français seul, exactement le même titre. Retiré comme `g4-c7` la session précédente, après vérification qu'aucune autre référence n'existait (0 occurrence restante). Le Galop 4 reste à **15 chapitres**.

**3. ⚠️ Le chapitre n'est PAS ouvert aux cavaliers, volontairement.** Il n'est **pas** dans `HYPE_COURS_PRETS` : il s'affiche donc en « Prochainement » pour les cavaliers (les modérateurs y accèdent déjà, comme toujours). Raison : sans `k640.jpg`, la couverture serait vide — un chapitre ouvert avec une affiche manquante, ça se voit tout de suite. **Dès que le visuel arrive, une seule ligne à ajouter pour l'ouvrir** (`"g4-nourrir": "<date du jour>"` dans `HYPE_COURS_PRETS`). La clé k640 est déjà déclarée : il suffira de déposer le fichier dans `images/`.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · contrôle programmatique des 6 langues : aucun champ vide, cardinalités strictement égales entre langues, indices de bonnes réponses identiques partout · dictionnaire des compléments : jeu de clés strictement identique à celui du chapitre Soins, aucun champ vide, cardinalités vérifiées (5 défis, 5 questions Hey Baby, 8 points de synthèse, 4 phrases, 4 cartes, 7 termes de glossaire) · **le vrai convertisseur `convertirCoursI18nVersInterne` exécuté hors navigateur sur les 6 langues** : titre, 5 blocs, 10 questions et les 2 titres de section résolus à chaque fois, et les seuls résidus i18n sont les 3 attendus (`couv/titre1`, `couv/titre2`, `donnees` des cartes premium) — **identiques à ceux du chapitre Soins déjà en ligne**, donc comportement normal · recherche de doublons relancée sur les 8 Galops : **aucun id en doublon** (le renommage `g6-c7` de la session 57 tient), seul reste le doublon de titre ancien et volontaire « Les aides naturelles et artificielles » (g1-c9 / g2-aides) · travail de l'autre page (`EcranPhasesSaut`, `PSAUT_CSS`, `PSAUT_HTML`) recompté à l'identique, intact.

⏳ **Points ouverts** : (a) **la couverture k640** du chapitre Nourrir — à fournir ; (b) la 3ᵉ image reçue (longues rênes) reste réservée au futur chapitre riche `g6-c3` « Travail à la longe et aux longues rênes » ; (c) la phrase FR « Un cheval trempé refroidit plus difficilement » (session 55) toujours en attente d'arbitrage.

---

**Version actuelle de l'index.html : session du 29/07/2026 (57) — Chapitre « Nourrir son cheval » en 6 langues + doublon d'identifiant du Galop 6 corrigé**

🔴 **À pousser** : `index.html`. ⚠️ **Il manque `images/k640.jpg`** (couverture du chapitre Nourrir) — **aucun visuel n'a été fourni pour ce sujet**, à envoyer. Les images `k638.jpg` et `k639.jpg` de la session 56 restent à pousser si ce n'est pas déjà fait.

**Base de travail** : le fichier fourni par Blandine, pas ma copie de la session 56. Vérifié avant toute écriture qu'il contenait déjà **tout** le travail de la session 56 (chapitre `g4-identite` **identique octet pour octet**, 43 616 caractères ; `COMPL_IDENTITE_I18N` ; déclarations k638 et k639 ; `g4-c7` bien absent) **plus** la maquette d'une autre page : un écran `EcranPhasesSaut` avec `PSAUT_CSS` / `PSAUT_HTML` (+63 857 caractères). **Rien de cet ajout n'a été touché** — recompté après intervention : `EcranPhasesSaut` ×3, inchangé.

**1. Nouveau chapitre `g4-nourrir` « Nourrir son cheval »**, Galop 4, **6 langues écrites ici**. Couverture « NOURRIR / SON CHEVAL » (k640, partage `#nourrir`), pas de citation. Catégorie **vie** (soins et entretien, comme le pansage, les protections et les soins avant/après le travail).
- Gabarit identique aux chapitres G4 récents : couverture, 2 blocs de 3 cartes, Cartes premium, écran final, QCM 10 questions × 3 options.
- Bloc 1 « Fait pour manger toute la journée » : un estomac de brouteur · le fourrage, la base · l'eau n'est jamais une option. Bloc 2 « Ajuster la ration » : les concentrés · les friandises · les erreurs à éviter (les 6 du document).
- Cartes premium : « La ration en 5 règles » (fourrage d'abord, eau en permanence, plusieurs petites prises, changer lentement, à chaque cheval sa ration).
- Écran final `complements-nourrir` : nouveau dictionnaire `COMPL_NOURRIR_I18N` + une ligne de routage, composant `ComplementsBiomeca` réutilisé tel quel. Comme pour Identité, les **16 libellés d'interface génériques** sont **repris par programme** du dictionnaire du chapitre Soins plutôt que retapés.
- QCM : bonnes réponses **C,A,B,C,B,A,C,B,A,C** (indices 2,0,1,2,1,0,2,1,0,2) — jamais deux fois de suite la même lettre, répartition 3/3/4.
- **Deux ajouts pédagogiques au-delà du document**, cohérents avec le niveau Galop 4 : la règle « on n'enlève jamais du foin pour donner plus de grain, on ajoute du grain à une base de foin déjà suffisante », et la précision que le foin sec ne contient presque pas d'eau (ce qui explique pourquoi les besoins en eau montent quand un cheval mange beaucoup de foin). Rien d'inventé côté chiffres : seul le 12–16 h/jour du document est repris.
- « La science explique » reste au bon niveau : sécrétion acide continue de l'estomac tamponnée par la salive, et flore du gros intestin qui met du temps à s'adapter — ce qui donne enfin la *raison* des deux règles « fourrage d'abord » et « changer lentement ». Aucun dosage, aucune notion vétérinaire complexe.
- « Pour aller plus loin » : 4 cartes **sans URL** (IFCE ×3, Hey Baby) → affichage « Prochainement », comportement voulu. Aucun lien inventé.
- Terminologie contrôlée langue par langue : fourrage → forage / forraje / foraggio / 粗飼料 / Raufutter · enrubanné → haylage / heno encintado / fieno fasciato / ラップサイレージ / Anwelksilage · concentrés → concentrates / concentrados / concentrati / 濃厚飼料 / Kraftfutter · colique → colic / cólico / colica / 疝痛 / Kolik.

**2. ✅ Doublon retiré : `g4-c6` « Nourrir son cheval »** — ancien placeholder verrouillé, même titre exact que le nouveau chapitre. Retiré comme `g4-c1`, `c2`, `c3` et `c7` avant lui, après vérification qu'aucune autre référence n'existait (1 seule occurrence avant, 0 après). Le Galop 4 compte désormais **15 chapitres**, dont 12 ouverts.

**3. ⚠️ Le renommage demandé en `g6-c3` était impossible : cet identifiant est déjà pris.** `g6-c3` existe déjà — c'est « Travail à la longe et aux longues rênes ». Renommer en c3 aurait **recréé exactement le doublon qu'on venait de corriger**. Le placeholder « Cession à la jambe au trot et transitions » a donc reçu **`g6-c7`**, premier numéro réellement libre du Galop 6 (c1 à c6 tous occupés).
- **Une seule ligne changée**, sur la définition repérée par son titre et non par sa position. **Les 4 références restantes à `g6-c2` visent toutes « L'impulsion »**, vérifié une par une : `HYPE_COURS_PRETS`, raccourci `impulsion`, définition du chapitre, routage `compl-impulsion`.
- **L'ordre d'affichage ne change pas** : la liste suit l'ordre du tableau, pas les numéros. La page du Galop 6 se présente comme avant, mais le chapitre ouvre enfin son propre contenu.

**4. Raccourcis d'aperçu ajoutés** à `CIBLE_DIRECTE` : `galop6` (liste des chapitres du Galop 6) et `nourrir`, sur le modèle de ceux qui existaient déjà.

✅ Vérifs : `node --check` OK sur les **14 blocs script** · **contrôle programmatique des 6 langues** du chapitre Nourrir : aucun champ vide, cardinalités strictement égales entre langues (3 + 3 cartes, 2 détails par carte, 5 cartes premium × 3 champs, 10 questions × 3 options), indices de bonnes réponses identiques partout · dictionnaire des compléments : jeu de clés strictement identique à celui du chapitre Soins, aucun champ vide, cardinalités vérifiées (5 / 5 / 8 / 4 / 4 / 7 / 2) · **convertisseur réel `convertirCoursI18nVersInterne` exécuté hors navigateur sur les 6 langues** : titre, 5 blocs, 10 questions, deux titres de section résolus à chaque fois ; seuls résidus i18n = `couv/titre1`, `couv/titre2` et `donnees` des cartes premium, **exactement les mêmes que sur le chapitre Soins déjà en ligne** (résolus par `CouvAffiche` et `BlocCartesPremium`) · **doublons relancés sur les 8 Galops** : plus aucun identifiant en doublon dans tout le fichier ; seul doublon de titre restant = « Les aides naturelles et artificielles » en `g1-c9` et `g2-aides`, deux niveaux du même sujet, ancien et volontaire · marqueurs du travail de l'autre page recomptés à l'identique.

⏳ **Points ouverts** : (a) **la couverture k640 du chapitre Nourrir** — visuel à fournir (foin, eau, ration ; ni les mors, ni les longues rênes) ; en attendant, la couverture s'affichera vide. (b) La **3ᵉ image reçue** (cheval aux longues rênes avec surfaix) a une destination naturelle : `g6-c3` « Travail à la longe et aux longues rênes », le jour où ce chapitre passera au format riche 6 langues ; elle prendra une clé ultérieure (k641). (c) La phrase FR « Un cheval trempé refroidit plus difficilement » (session 55), physiologiquement ambiguë, toujours en attente d'un retour. (d) Placeholders G4 restants : `g4-c4` (extérieur) et `g4-c5` (santé).

---

**Version actuelle de l'index.html : session du 29/07/2026 (56) — Couverture du chapitre Soins (k638) + nouveau chapitre « L'identité du cheval » en 6 langues**

🔴 **À pousser** : `index.html` + **`images/k638.jpg`** + **`images/k639.jpg`** (les deux fournies dans cette session).

**1. `k638` était utilisée mais jamais déclarée.** La session 55 avait branché la couverture du chapitre « Les soins avant et après le travail » sur `HYPE_IMGS["k638"]`, mais la ligne `window.HYPE_IMGS["k638"]="images/k638.jpg"` n'existait pas — vérifié par comptage avant correction : une seule occurrence de `k638` dans tout le fichier, l'usage dans le cours, aucune déclaration. **Rappel : une image demande deux gestes, la pousser ET la déclarer.** Extension `.jpg`, conforme à la règle en vigueur depuis k630. Image livrée : 941 × 1672, JPEG q90, 284 Ko (pansage au bouchon + pose d'une bande, tapis et serviette au premier plan).

**2. Nouveau chapitre `g4-identite` « L'identité du cheval »**, Galop 4, **6 langues écrites ici** (pas de circuit de traduction externe cette fois). Couverture « L'IDENTITÉ / DU CHEVAL » (k639, portrait de tête, partage `#identite`), pas de citation (aucune fournie, aucune inventée). Catégorie **connaissance** (« Connaissance du cheval »), comme `g4-biomeca` — c'est de la connaissance du cheval, pas de l'équitation.
- Gabarit identique aux chapitres G4 récents : couverture, 2 blocs de 3 cartes, bloc Cartes premium, écran final, QCM 10 questions × 3 options.
- Bloc 1 « Ce que l'œil voit » : une identité pas une couleur · le sexe et la robe · marques, balzanes, épis. Bloc 2 « Ce que les papiers prouvent » : la puce et le numéro SIRE · le livret signalétique · les pièges à éviter (les 5 erreurs fréquentes du document, dont la confusion livret/carnet de santé).
- Cartes premium : « Le signalement en 5 regards » (sexe, robe, marques en tête, balzanes, épis).
- Écran final `complements-identite` : nouveau dictionnaire `COMPL_IDENTITE_I18N` + une ligne de routage dans `BlocCours`, sur le modèle exact des 9 chapitres précédents (composant `ComplementsBiomeca` réutilisé tel quel, rien de nouveau à maintenir). Les **libellés d'interface génériques** (16 champs : soon, plusDetail, curieux, vidTitre, yeuxTitre, defiBtn, defiFait, hbTitre, hbIntro, hbBtn, stTitre, sciTitre, synTitre, loinTitre, loinIntro, gloTitre) sont **repris par programme** du dictionnaire du chapitre Soins plutôt que retapés : zéro risque de divergence de libellé entre chapitres dans les 6 langues.
- QCM : bonnes réponses **B,A,C,B,C,A,B,C,A,B** (indices 1,0,2,1,2,0,1,2,0,1) — jamais deux fois de suite la même lettre, répartition 3/4/3.
- « Pour aller plus loin » : 4 cartes **sans URL** (IFCE ×2, FFE, Hey Baby) → elles s'affichent en « Prochainement », comportement voulu. Aucun lien inventé ; à brancher quand les ressources seront vérifiées.
- Terminologie contrôlée langue par langue : hongre/gelding/castrado/castrone/せん馬/Wallach · robes bai-alezan-noir-gris → bay-chestnut-black-grey / castaño-alazán-negro-tordo / baio-sauro-morello-grigio / 鹿毛-栗毛-青毛-芦毛 / Brauner-Fuchs-Rappe-Schimmel · balzanes → leg markings / calzados / balzane / 肢の白 / Beinabzeichen · épis → whorls / remolinos / vortici / 旋毛 / Haarwirbel. Le **numéro SIRE étant propre à la France**, il est présenté comme tel dans les 5 autres langues (« le numéro national français d'identification ») plutôt que traduit comme s'il était universel.

**3. ✅ Doublon retiré : `g4-c7` « Identifier un cheval »** — ancien placeholder verrouillé (format ancien, français seul, jamais ouvert), même sujet que le nouveau chapitre. Retiré comme `g4-c1`, `g4-c2` et `g4-c3` avant lui. **Vérifié avant suppression** qu'aucune autre référence à `g4-c7` n'existait dans le fichier (`HYPE_COURS_PRETS`, `CATEGORIE_PAR_COURS`, `CIBLE_DIRECTE`, partage) : 1 seule occurrence, sa définition. Après suppression : 0. Le Galop 4 compte désormais **15 chapitres**, dont 11 ouverts.

**4. ⚠️ Doublon trouvé sur le GALOP 6, pas touché — à trancher avec toi.** La recherche de doublons sur les 8 Galops a remonté un vrai conflit d'identifiant : **`g6-c2` est défini deux fois** dans `COURS_GALOP6_FR`, une fois pour « L'impulsion » (livré en session 51) et une fois pour un ancien placeholder « Cession à la jambe au trot et transitions ». Comme les recherches par id s'arrêtent au premier trouvé, c'est « L'impulsion » qui gagne : le second chapitre s'affiche probablement dans la liste sous son titre mais ouvre le mauvais contenu. **Correction non appliquée** (c'est un chapitre du Galop 6, hors périmètre demandé) — dis-moi si je renomme le placeholder en `g6-c3` ou si je le retire.
- Autre point signalé, sans gravité : « Les aides naturelles et artificielles » porte le même titre en `g1-c9` et `g2-aides`. Deux niveaux différents du même sujet, situation ancienne et volontaire.

✅ Vérifs : `node --check` OK sur les **14 blocs script** (même compte qu'avant intervention) · **contrôle programmatique des 6 langues** du chapitre : aucun champ vide, cardinalités strictement égales entre langues (3 cartes + 3 cartes, 2 détails par carte, 5 cartes premium × 3 champs, 10 questions × 3 options), indices de bonnes réponses identiques dans les 6 langues · dictionnaire des compléments : **jeu de clés strictement identique** à celui du chapitre Soins, aucun champ vide, cardinalités vérifiées (5 défis, 5 questions Hey Baby, 8 points de synthèse, 4 phrases, 4 cartes, 7 termes de glossaire, 2 détails « science ») · **le vrai convertisseur `convertirCoursI18nVersInterne` exécuté hors navigateur sur les 6 langues** : titre, 5 blocs, 10 questions et les deux titres de section résolus correctement à chaque fois. Les seuls objets i18n qui subsistent après conversion sont `couv/titre1`, `couv/titre2` et `donnees` des cartes premium — **le même test lancé sur le chapitre Soins déjà en ligne donne exactement les trois mêmes**, c'est donc le fonctionnement normal (`CouvAffiche` et `BlocCartesPremium` résolvent eux-mêmes leur langue), pas un oubli · recherche de doublons de titres et d'ids relancée sur les 8 Galops après insertion (résultat au point 4).

⏳ **Points ouverts** : (a) le doublon `g6-c2` ci-dessus ; (b) la phrase FR « Un cheval trempé refroidit plus difficilement » héritée de la session 55, physiologiquement ambiguë, présente aussi dans le QCM et la synthèse — toujours en attente de ton retour avant correction dans les 6 langues ; (c) la **3ᵉ image reçue** (cheval aux longues rênes avec surfaix) n'est toujours affectée à aucun chapitre — prochaine clé libre : **k640**.

---

**Version actuelle de l'index.html : session du 29/07/2026 (55) — Badge NEW à durée de vie + chapitre « Les soins avant et après le travail »**

🔴 **À pousser** : `index.html`. Il manque `images/k638.jpg` (couverture Soins) — pas encore fournie.

**1. 🆕 Le badge NEW expire maintenant après 7 jours.** Avant : un simple booléen dans `HYPE_COURS_PRETS`, jamais réévalué — un chapitre marquait NEW indéfiniment une fois ajouté. **73 entrées concernées**, certaines vieilles de plusieurs mois. Changement :
- `HYPE_COURS_PRETS` stocke désormais une **date** (`"2026-07-29"`) plutôt que `true`. Les 9 chapitres livrés aujourd'hui dans cette conversation ont la vraie date du jour ; les 64 entrées plus anciennes reçoivent une date passée (`"2026-01-01"`) — leur date exacte d'origine n'est pas connue précisément, mais toutes sont de toute façon largement au-delà de 7 jours, donc le résultat visible est correct.
- Nouvelle fonction `estCoursNouveau(coursId)` : compare la date à aujourd'hui, retourne vrai seulement si moins de 7 jours. Utilisée à la place de l'ancien test booléen dans les deux endroits où le badge s'affiche.
- **L'accessibilité des chapitres n'est pas touchée** : `coursEstPret` fait toujours un simple test de vérité, et une chaîne de date reste "vraie" — vérifié explicitement que rien ne s'est reverrouillé.
- Vérifié par calcul direct (hors navigateur) et par rendu réel : un chapitre d'aujourd'hui affiche NEW, un chapitre ancien ne l'affiche plus mais reste cliquable, un chapitre jamais ouvert reste verrouillé. Simulation à J+8 : le badge disparaît bien tout seul.

**2. Chapitre `g4-soins-travail` « Les soins avant et après le travail »**, 6 langues. Couverture « AVANT ET / APRÈS L'EFFORT » (k638, pas encore reçue), pas de citation. Renvoie vers le pansage/cure-pieds (Galop 3) et vers Les protections du cheval plutôt que de réexpliquer. Catégorie **vie**.

**3. ⚠️ Sept erreurs de traduction trouvées et corrigées avant intégration.** Mêmes vérifications systématiques que d'habitude sur les deux renvois inter-chapitres :
- Vers « Le pansage complet et le soin des pieds » : EN, ES, IT et JA ne correspondaient pas au titre réel (seul l'allemand était juste). Corrigés un par un après comparaison avec le titre stocké dans l'index.
- Vers « Les protections du cheval » : EN, JA et DE ne correspondaient pas (espagnol et italien étaient bons cette fois). Corrigés de la même façon.
- Point signalé par la passation elle-même, à trancher avec Blandine : la phrase FR « Un cheval trempé refroidit plus difficilement » est physiologiquement ambiguë (un cheval mouillé perd sa chaleur *plus vite*, pas plus difficilement) — présente aussi dans le QCM et la synthèse. Non corrigée pour l'instant, en attente d'un retour.

✅ Vérifs : traductions Soins contrôlées par script (cardinalités, emojis, citation absente comme prévu, sous-titre Premium spécifique bien présent dans les 5 langues, index de bonnes réponses conformes) · sept renvois corrigés après comparaison avec les vrais titres · `node --check` OK · rendu React réel des 6 langues, aucun bloc vide · non-régression vérifiée sur les 9 chapitres précédents · recherche de doublons relancée sur les 8 Galops : toujours aucun.

⏳ **Point ouvert** : la phrase sur le refroidissement du cheval mouillé (voir ci-dessus) — à confirmer avant de la corriger dans les 6 langues.

---

**Version actuelle de l'index.html : session du 29/07/2026 (54) — Deux chapitres en ligne : « Les protections du cheval » et « L'équilibre sur un parcours d'obstacles »**

🔴 **À pousser** : `index.html`. Il manque `images/k636.jpg` (Obstacles) et `images/k637.jpg` (Protections) — les deux déjà fournies par Blandine.

⚠️ **Erreur de numérotation repérée et corrigée en cours de session** : la clé `k636` avait été mentionnée à voix haute pour Protections avant que son image ne soit réellement traitée, puis réutilisée pour de vrai sur Obstacles. Comme rien n'était encore injecté à ce moment, aucun conflit dans le code — mais Protections a dû recevoir `k637` à la place. Vérifié que les deux clés étaient bien libres avant d'écrire quoi que ce soit.

**1. `g4-protections` « Les protections du cheval »**, 6 langues. Couverture « LES PROTECTIONS / DU CHEVAL » (k637), pas de citation (aucune fournie). Renvoie vers le pansage/cure-pieds du Galop 3 plutôt que de le redétailler. Catégorie **vie** (matériel/soins, comme le pansage et le filet en G1-G3).

**2. `g4-obstacles-equilibre` « L'équilibre sur un parcours d'obstacles »**, 6 langues. Couverture « CHAQUE RÉCEPTION / PRÉPARE LE SAUT » (k636), citation « Chaque réception prépare déjà le saut d'après. » (formule du cours, sans auteur). Renvoie vers « Aborder un obstacle avec justesse » (Galop 3), L'impulsion et Varier la vitesse plutôt que de réexpliquer. Remplace le placeholder verrouillé `g4-c3` (même sujet, jamais rempli) — retiré proprement, aucune autre référence trouvée avant suppression. Catégorie **technique**.

**3. ⚠️ Six erreurs de traduction trouvées et corrigées avant intégration (chapitre Obstacles).** Les renvois vers « Aborder un obstacle avec justesse » et « Varier la vitesse sans perdre le rythme » ne correspondaient pas exactement aux titres réels stockés dans l'app, en anglais, japonais et allemand (espagnol et italien étaient parfaits) :
- EN : *« Approaching a fence accurately »* → corrigé en *« Approaching an obstacle with precision »* (le vrai titre) ; *« Varying the speed... »* → *« Varying speed... »*.
- JA : renvoi vers l'obstacle entièrement reformulé (「障害に正しく入る」→「正確にアプローチする」) ; renvoi vers la vitesse aussi (スピード→速さ, 崩さずに→保ちながら).
- DE : *„Ein Hindernis richtig anreiten"* → *„Ein Hindernis präzise anreiten"* (le vrai titre) ; *„Die Geschwindigkeit..."* → *„Das Tempo..."*.
- Même méthode que pour L'incurvation/Épaules-hanches : comparaison systématique avec le titre réellement stocké dans l'index avant d'injecter, jamais une confiance aveugle dans la traduction reçue.

✅ Vérifs : les deux fichiers de traduction contrôlés par script (cardinalités, emojis, citation présente/absente selon le cas, sous-titres Premium bien différenciés par chapitre, index de bonnes réponses conformes à la passation) · six renvois inter-chapitres corrigés après comparaison avec les vrais titres · `node --check` OK · **rendu React réel des 6 langues, pour les deux chapitres** : aucun bloc vide · **recherche de doublons relancée sur les 8 Galops après injection** : aucun trouvé · non-régression vérifiée sur les 7 chapitres déjà en ligne cette session.

---

**Version actuelle de l'index.html : session du 29/07/2026 (53) — Chapitre « Déplacer les épaules et les hanches » + catégorisation par thème du Galop 4 + doublon retiré**

🔴 **À pousser** : `index.html`. Il manque `images/k635.jpg` (couverture) — déjà fournie par Blandine.

**1. Chapitre `g4-epaules-hanches`**, 6 langues, même circuit que les précédents (FR ici, 5 langues reçues traduites, vérifiées et fusionnées). Couverture **LES ÉPAULES / LES HANCHES** (k635, partage `#epaules-hanches`), citation sans auteur (« Les meilleurs cavaliers ne déplacent pas leur cheval davantage. Ils le déplacent plus précisément. » — une formule du cours, pas une citation attribuée).
- **Deux erreurs de traduction trouvées et corrigées avant intégration** : le renvoi de la carte 3 vers le chapitre « L'incurvation » ne correspondait pas au titre réel utilisé dans l'app en japonais (「馬体の屈曲」au lieu de「内方姿勢」) ni en allemand (*Die Biegung* au lieu de *Stellung und Biegung*, le titre complet). Corrigé en relisant le vrai titre stocké dans l'index avant d'injecter, pas seulement en faisant confiance à la traduction reçue.

**2. 🎨 Catégorisation par thème du Galop 4 — système repris tel quel des Galops 1 à 3.** Découverte en creusant la demande de Blandine : un système de catégories avec couleur (`CATEGORIES_COURS` : connaissance / technique / culture / vie / bilan, chacune sa couleur) existe déjà et regroupe les chapitres des Galops 1-3 avec un en-tête coloré. **Aucun chapitre du Galop 4 n'y était inscrit** : ils tombaient tous dans un groupe gris par défaut (`#566273`), sans en-tête, en bas de la liste — pas un bug de visibilité, mais une organisation manquante.
- Ajoutés à `CATEGORIE_PAR_COURS` : les 6 chapitres de pratique montée (contact, aides, transitions, incurvation, vitesse, épaules-hanches) → **technique** (« Équitation »), et `g4-biomeca` → **connaissance** (« Connaissance du cheval ») — cohérent avec la façon dont G1-G3 classent déjà anatomie/comportement dans cette même catégorie.
- **Vérifié par un vrai rendu de la page de détail du Galop 4** (pas seulement relu) : les deux en-têtes de catégorie apparaissent avec leur couleur, les bons chapitres dessous, dans le bon ordre.

**3. ⚠️ Doublon trouvé et retiré : `g4-c2`.** En vérifiant le rendu réel de la liste, « Déplacer les épaules et les hanches » apparaissait **deux fois** : le nouveau chapitre, et un ancien placeholder verrouillé (`g4-c2`, format ancien, jamais ouvert) portant exactement le même titre. Retiré — même traitement que `g4-c1` lors de la création de Le contact / L'accord des aides. Aucune autre référence à `g4-c2` trouvée dans le fichier (`HYPE_COURS_PRETS`, partage) avant suppression.

✅ Vérifs : traductions Épaules/Hanches contrôlées par script (cardinalités, emojis, citation présente/auteur absent, indices de bonnes réponses conformes) · deux renvois vers L'incurvation corrigés après comparaison avec le titre réel dans l'index · `node --check` OK · **rendu React réel des 6 langues** du nouveau chapitre, aucun bloc vide · **rendu réel de la page de détail du Galop 4** après ajout des catégories : deux en-têtes colorés corrects, plus aucun doublon de titre · non-régression vérifiée sur les 6 autres chapitres déjà en ligne.

⏳ **En attente** : les vidéos (Impulsion, Vitesse, Épaules/Hanches — aucune fournie à ce jour), le contenu du chapitre « Les protections du cheval » (reçu, pas encore mis en forme Hype ni traduit), et l'application de la même catégorisation par thème aux Galops 5, 6 et 7 quand leurs contenus seront prêts.

---

**Version actuelle de l'index.html : session du 29/07/2026 (52) — Chapitre « Varier la vitesse » + redistribution des bonnes réponses QCM (Impulsion et Vitesse)**

🔴 **À pousser** : `index.html`. Il manque `images/k634.jpg` (couverture) — déjà fournie par Blandine, à pousser avec.

**1. Chapitre `g4-vitesse` « Varier la vitesse sans perdre le rythme »**, Galop 4, 6 langues complètes (même circuit que L'impulsion : FR écrit ici, EN/ES/IT/JA/DE reçus traduits, fusionnés après vérification structurelle complète). Couverture « PLUS DE / TERRAIN » (k634, partage `#vitesse`), **sans citation** — confirmé par la passation de traduction, aucune n'a été fournie pour ce chapitre, aucune inventée. Distingue rythme (organisation des temps) / cadence (fréquence des foulées) / **amplitude** (longueur de la foulée, terme officiel FFE ajouté à la demande de Blandine) / vitesse = cadence × amplitude. Relié au chapitre L'impulsion (Galop 6) dans « La science explique » : sans impulsion, pas d'amplitude possible.

**2. Bonnes réponses du QCM redistribuées — Impulsion (déjà en ligne) et Vitesse (ce chapitre).** Les deux chapitres avaient été écrits avec la quasi-totalité des bonnes réponses en position B (10/10 pour Impulsion, 9/10 pour Vitesse). Blandine a validé la correction. Nouvelle répartition appliquée aux deux, identique sur les 6 langues à chaque fois : A,C,B,A,C,B,A,C,B,A (Impulsion) et B,A,C,B,A,C,A,B,C,A (Vitesse) — jamais deux fois de suite la même lettre.
- **Impulsion** : édité directement dans l'index déjà en ligne. Extraction précise du bloc `g4-c2`... pardon, `g6-c2` par comptage d'accolades, permutation des textes d'options pour que le sens suive le déplacement (jamais juste le champ `correct` changé seul), réinjection, revérifié par relecture du fichier réel après coup — pas seulement supposé correct.
- **Vitesse** : les traductions reçues avaient été faites sur l'ancienne répartition (la passation le précisait). Régénéré le FR d'origine pour valider correctement les traductions contre la bonne référence, puis appliqué la même transformation aux 6 langues à la fois avant l'injection — aucune des deux versions (ancienne/nouvelle) n'a été mélangée par erreur.

✅ Vérifs : traductions Vitesse contrôlées par script avant fusion (cardinalités, emojis, absence de citation comme annoncé, indices de bonnes réponses conformes à l'ancienne répartition) · redistribution vérifiée par relecture post-écriture, pas seulement en mémoire · `node --check` OK · **rendu React réel des 6 langues** de `g4-vitesse` : aucun bloc vide · **non-régression vérifiée sur les 5 autres chapitres touchés cette session** (Le contact, L'accord des aides, Les transitions, L'incurvation, L'impulsion) : tous présents, titres résolus correctement.

⏳ **En attente** : les vidéos des deux chapitres (Impulsion et Vitesse) — aucune fournie à ce jour malgré les ressources IFCE/Ingrid Klimke évoquées, à transmettre pour intégration dans la bibliothèque vidéo.

---

**Version actuelle de l'index.html : session du 29/07/2026 (51) — Chapitre « L'impulsion » en ligne, Galop 6 déverrouillé**

🔴 **À pousser** : `index.html`. Il manque `images/k633.jpg` (couverture) — Blandine l'a déjà fournie, à pousser avec.

**Ce qui a été livré**

**1. Chapitre `g6-c2` « L'impulsion »**, 6 langues complètes (FR écrit ici, EN/ES/IT/JA/DE reçus traduits d'une autre conversation, fusionnés après vérification structurelle complète — cardinalités, index de bonne réponse du QCM, emojis, tout contrôlé par script avant intégration). Couverture « LE VENT / DANS LE DOS » (k633), citation attribuée à la Fédération Française d'Équitation (définition officielle citée telle quelle, pas une invention). Même gabarit que les chapitres Galop 4 récents : couverture, 2 blocs de 3 cartes, **bloc Cartes premium** (le composant construit pour L'incurvation, réutilisé ici tel quel), écran final complet, QCM 10 questions.

**2. 🔓 Le Galop 6 est déverrouillé** (`disponible: true, nouveau: true`, `debloque` inchangé — le cadenas Premium reste). `g6-c2` ajouté à `HYPE_COURS_PRETS`. `g6-c1` (déjà présent, ancien format) reste en l'état, non ouvert.

**3. ⚠️ Bug de structure trouvé et corrigé avant livraison — important pour la suite du Galop 6.** `obtenirCoursParGalop(6, langue)` renvoyait `COURS_GALOP6_FR` **brut**, sans jamais passer par `convertirCoursI18nVersInterne` (contrairement à Baby/G1/G2/G3/G4). Résultat : le nouveau chapitre au format multilingue se serait affiché avec des objets `{fr, en, es...}` à la place du texte. **Corrigé à la source** : `if (galopId === 6) return convertirCoursI18nVersInterne(COURS_GALOP6_FR, langue);` — un seul endroit changé.
- Vérifié que `convertirCoursI18nVersInterne` est **rétrocompatible par construction** : son `tr()` interne accepte aussi bien une chaîne simple (le cas de l'ancien `g6-c1`, jamais traduit) qu'un objet multilingue — passthrough silencieux dans le premier cas, résolution de langue dans le second. **`g6-c1` a été revérifié après coup dans les 6 langues : toujours une chaîne correcte, aucune régression.**
- Cette correction s'applique à **tout futur chapitre G6**, pas seulement à celui-ci — la porte est maintenant ouverte pour moderniser progressivement le reste du Galop 6 comme on l'a fait pour le Galop 4.

✅ Vérifs : fusion des traductions contrôlée par script (6 cartes, 10 QCM × 3 options avec le bon index partout, 5 questions Hey Baby, 8 points de synthèse, 4 phrases, 4 liens, 7 termes de glossaire, 5 cartes premium — cardinalités et emojis revérifiés un par un) · `node --check` OK · **rendu React réel des 6 langues** : couverture + 2 blocs de cartes + cartes premium (mode verrouillé ET mode Premium) + écran final, aucun bloc vide · `g6-c1` re-testé après le correctif de routage, toujours intact dans les 6 langues.

⏳ **En attente** : la vidéo du chapitre (aucune fournie), et la vidéo + couverture (k634) de « Varier la vitesse » (Galop 4, traductions pas encore reçues).

---

**Version actuelle de l'index.html : session du 29/07/2026 (49) — Accès « Mon compte » en bas de l'accueil**

🔴 À pousser : `index.html` seulement (pas de nouvelle image, pas de SQL, `hype-video.js` inchangé depuis la session 48).

**Ce qui manquait.** Une note laissée dans une ancienne version du fichier disait : « un onglet "Mon compte" sera créé ailleurs plus tard (EcranProfil n'est donc plus atteignable en attendant) » — la rangée « Modifier mes informations » avait été retirée de la page cavalier sans qu'un accès de remplacement soit jamais ajouté. Blandine a confirmé ne toujours rien voir en bas de l'accueil.

**Ce qui a été vérifié avant de coder** : `EcranProfil` (édition du profil, chevaux, score, plan d'abonnement) existe et fonctionne déjà — il est atteignable depuis 3 endroits (avatar de la page d'intro, en-tête d'un panneau admin) via `setEcran("profil")`. Rien à reconstruire, juste un point d'entrée à ajouter.

**Ce qui a été fait** : nouvelle rangée tout en bas de l'écran d'accueil (`EcranUnivers`), après le lien de version. Icône ⚙️ dans un halo turquoise, libellé « Mon compte » (5 langues, l'allemand n'existe pas encore dans cette partie du fichier — repli français comme le reste du composant), chevron ›. Carte verre fumé cohérente avec l'identité Hype Spectral. Ouvre `EcranProfil` au tap.

✅ Vérifs : fin exacte du composant `EcranUnivers` localisée par comptage d'accolades · `node --check` OK · rendu React réel de l'accueil complet, bouton retrouvé et cliqué : `setEcran` reçoit bien `"profil"` · styles calculés relus directement dans le DOM rendu.

---

**Version actuelle de l'index.html : session du 29/07/2026 (50) — Correctif critique : suppression de compte cassée**

🔴 **À pousser en urgence** : `index.html`. Un cavalier (Liam) a signalé un écran de plantage (« Un caillou dans le sabot ») en essayant de supprimer son compte.

**Le bug.** Dans `EcranMonCompte`, au clic sur « Supprimer mon compte » :
```
React.createElement(EcranSupprimerCompte, { email: (moi && moi.email) || ... })
```
`moi` n'existe nulle part dans ce composant — la variable qui contient l'utilisateur connecté s'appelle `user` (`var stU = useState(undefined); var user = stU[0]...`). Résultat : `ReferenceError: moi is not defined`, l'app plante intégralement dès qu'on tente de supprimer son compte. **Personne ne pouvait supprimer son compte depuis l'app.**

**Le correctif** : `moi` → `user`, une seule occurrence, tout le reste du composant utilisait déjà `user` correctement (12 occurrences).

✅ Vérifs : `node --check` OK · confirmé qu'aucune trace de `moi` ne subsiste dans `EcranMonCompte` (0 occurrence, `user` en compte 12) · expression testée isolément hors navigateur avec les 3 cas réels (email direct, email de secours via `profilApp`, aucun des deux) — tous corrects · **la reproduction exacte du bug original a été testée** : l'ancienne ligne (`moi` non défini) relance bien la même `ReferenceError` que dans la capture d'écran de Liam, confirmant qu'il s'agissait précisément de cette ligne. ⚠️ Impossible de tester le clic en conditions de navigateur réelles dans cette session : le SDK Supabase (chargé depuis un CDN) ne peut pas s'initialiser sans réseau dans l'environnement de vérification, ce qui fait planter la page avant d'atteindre le bouton, indépendamment de ce correctif — **un vrai test sur le téléphone reste nécessaire pour confirmer en conditions réelles.**

⏳ **En parallèle, non résolu** : la ligne « Mon compte » à l'intérieur d'`EcranProfil` (qui mène à cet écran) affiche toujours « Se connecter ou créer un compte » même pour quelqu'un de déjà connecté — texte à corriger, proposé mais pas encore fait.

⏳ **Aussi en attente (discussion en cours)** : chapitre « L'impulsion » confirmé pour le Galop 6 (pas le Galop 4 — vérifié sur 3 sources FFE officielles, le module théorique est « Définir la mise sur la main et l'impulsion », Galop 6). Le Galop 6 existant (`COURS_GALOP4_FR`... pardon, `COURS_GALOP6_FR`) est dans un format ANCIEN et différent (français seul, blocs `intro`/`schema`/`liste`, pas le format riche 6-langues des chapitres Galop 4 récents) — à trancher avec Blandine avant d'écrire le contenu : garder le format historique du Galop 6, ou l'moderniser avec ce chapitre. Pas encore commencé.

---

**Version actuelle de l'index.html : session du 29/07/2026 (48) — Chapitre « L'incurvation » + nouveau bloc Cartes premium + touche exceptionnelle à hype-video.js**

🔴 **À pousser** : `index.html` + **`hype-video.js` (modifié, voir plus bas)** + `SUIVI.md`. ⚠️ **Il manque l'image `k632.jpg`** (couverture) — Blandine doit la fournir.

⚠️ **NOTE DE MÉTHODE — pourquoi `hype-video.js` est touché ici.** Jusqu'ici la page « Directeur Technique » ne codait rien sur les vidéos, pour ne pas entrer en collision avec la page qui construit la Bibliothèque vidéo. Blandine a explicitement demandé cette fois d'insérer directement la vidéo du nouveau chapitre plutôt que de repasser par une note de passation. **Modification volontaire, ponctuelle, sur demande directe — pas un changement de règle.** Si la page Bibliothèque vidéo retravaille ce fichier en parallèle, vérifier qu'aucun push ne vient écraser l'autre.

**Session 48 — quatre choses**

**1. Nouveau chapitre `g4-incurvation` « L'incurvation »**, 6 langues complètes. Couverture « LE CHEVAL / S'ENROULE » (k632, partage `#incurvation`), citation sans auteur (fournie sans attribution, aucune inventée). 6 cartes : le cheval s'enroule autour de la jambe · une aide crée l'autre reçoit · la main intérieure ne tire jamais · plier l'encolure n'est pas incurver · la jambe extérieure encadre les hanches · comment savoir si c'est réussi. Écran final classique (à retenir 8 points, glossaire 7 termes, Hey Baby 5 questions fournies par Blandine, défi, Approfondir), QCM 10 questions, 3 options — cohérent avec les trois chapitres précédents.
- **Niveau vérifié** : le programme officiel FFE place bien « pli et incurvation » dans le tronc commun du Galop 4, aux côtés de l'accord des aides déjà traité. Le Galop 5 passe d'« expliquer » à « rechercher » l'incurvation en pratique — le chapitre reste donc théorique, sans empiéter sur le niveau suivant.

**2. Nouveau type de bloc `cartes-premium`, premier du genre.** Composant `BlocCartesPremium`, inséré comme 4ᵉ bloc du cours (après les deux séries de cartes, avant l'écran final). Reprend l'identité Premium déjà en place ailleurs (`COLORS.or`, doré) :
- **Non Premium** : encart verrouillé, cadenas, texte d'accroche, bouton dégradé doré « Découvrir Premium » → `setEcran("premium")`.
- **Premium** : 5 fiches courtes (emoji + label + valeur) — la phrase clé, la sensation à rechercher, le rôle de la main intérieure, le rôle de la rêne extérieure, l'erreur à éviter. Contenu fourni par Blandine, traduit en 6 langues.
- Testé dans les deux états via rendu React réel (voir vérifs). **Un bug trouvé et corrigé avant livraison** : la version verrouillée appelait une fonction `T()` non globale → bloc entièrement vide en silence. Remplacée par le même objet `tr({fr:…, en:…, …})` utilisé partout ailleurs dans le fichier.

**3. « Pour aller plus loin » devient cliquable — rétrocompatible.** Découverte en travaillant sur ce chapitre : les trois premières cartes de cette section, dans **les quatre chapitres existants**, n'ont jamais été cliquables ; le code affichait toujours « Prochainement » sur les trois premières quel que soit leur contenu (seule la 4ᵉ, Hey Baby, était fonctionnelle). Corrigé pour ce chapitre avec un vrai lien : l'article IFCE Equipedia *« Les aides du cercle »* (Patrick Galloux) est maintenant cliquable et ouvre `equipedia.ifce.fr` dans un nouvel onglet. **Comportement des trois autres chapitres inchangé** : une carte n'est cliquable que si une URL est fournie en 3ᵉ élément du tuple `[titre, source, url]` ; sans URL, comportement identique à avant (badge « Prochainement »).
- Deux ressources proposées par Blandine ont été écartées après vérification : une vidéo YouTube confirmée (`yloDh58eMQk`, « L'incurvation - Séance montée ») → intégrée en vidéo principale (voir ci-dessous). Un lien Horse Academy → **écarté** : ce n'est pas une vidéo accessible, la page dit littéralement *« Abonnez-vous pour découvrir la vidéo »* — un deuxième paywall tiers derrière l'abonnement Hype Premium aurait été une mauvaise expérience.

**4. `hype-video.js` : une vidéo ajoutée, une référence croisée créée.**
- Nouvelle entrée `v-incurvation-01` (`yloDh58eMQk`, vérifiée le 29/07), rang principal pour `g4-incurvation`, 6 langues (titre, résumé, 4 points à observer).
- `v-aides-01` (`do-xy3MlB08`, déjà en ligne pour `g4-aides`) s'est révélée aussi couvrir l'incurvation — son titre réel est *« Galop 4-5 : l'incurvation et l'utilisation des aides »*. Ajoutée à son tableau `cours` : elle apparaît maintenant aussi comme vidéo complémentaire de `g4-incurvation`, sans rien changer à son rôle principal pour `g4-aides`.
- **Piège rencontré et corrigé** : l'ordre des entrées dans `HYPE_VIDEOS` détermine quelle vidéo sort en principale pour un chapitre partagé par plusieurs vidéos (`parCours` ne trie pas par `rang`, il respecte l'ordre du tableau). `v-incurvation-01` a dû être positionnée **avant** `v-aides-01` dans le fichier pour que la vidéo dédiée sorte bien en premier sur `g4-incurvation`, sans toucher à l'ordre de `g4-aides` (`v-aides-01/02/03`, inchangé). Vérifié par exécution réelle du fichier, pas seulement relu.
- Total : 7 vidéos dans le catalogue (6 précédentes + 1). `g4-transitions` reste sans vidéo, aucun lien fourni à ce jour.

✅ Vérifs : reconstruction directe sur la version déjà en ligne, chaque ajout appliqué une seule fois avec assertion stricte de comptage · 14 blocs script `node --check` OK sur `index.html`, `node --check` OK sur `hype-video.js` · **6 langues × 5 blocs rendus réellement** (couverture, 2 séries de cartes, cartes premium en mode verrouillé ET en mode Premium, écran final) : un seul bloc vide trouvé (cartes-premium non-Premium, bug `T()`), corrigé et revérifié, plus aucun bloc vide · `hype-video.js` exécuté hors navigateur : 7 vidéos, ordre de `g4-incurvation` et `g4-aides` vérifiés, `g4-contact` et `g4-transitions` non affectés.

⏳ **Toujours en attente** : le visuel `k632.jpg`, le module interactif du chapitre « Le contact », les 3 liens vidéo « aides » non vérifiés (signalés depuis la session 44), `bibliotheque_video.sql` à exécuter dans Supabase si ce n'est pas déjà fait.

---

**Version actuelle de l'index.html : session du 29/07/2026 (46) — Consolidation après confusion de versions**

⚠️ **CONTEXTE À COMPRENDRE — plusieurs versions se sont croisées le 29/07.** Blandine a poussé par erreur un index plus ancien sur GitHub, et les fichiers échangés dans les conversations ne se conservent pas d'un message à l'autre. Cette version 46 repart de la base la plus complète dont on disposait et y réinjecte ce qui manquait.

**🔴 CE QUI A ÉTÉ PERDU et doit être refait par les pages concernées** :
- **Chapitre « Les transitions »** (Galop 4) — annoncé en session 45, absent de cette base.
- **Mémorisation des identifiants à la déconnexion** — annoncée en session 45, absente (aucun marqueur trouvé).
- ✅ La **correction des libellés des cartes du Memory** et la **bibliothèque vidéo** (`EcranVideos`) sont bien présentes.

**Session 46 — réinjecté sur cette base**
1. **Déclarations d'images** : `window.HYPE_IMGS["kNNN"]="images/kNNN.jpeg"` pour **k610 et k615 à k628** (15 clés). ⚠️ **C'est ce qui empêchait les cartes du Memory de s'afficher** : les fichiers étaient en ligne, mais rien ne disait à l'appli où les chercher. **Une image demande deux gestes : la pousser ET la déclarer.**
2. **Bandeau d'annonces propre à chaque page** : `FilAnnoncesB` accepte `cible` et `libelle`, `useAnnonces(langue, cible)` étendue. Ma Sellerie utilise `annonces-sellerie` / « Partenaires » et **le bandeau disparaît tant qu'aucune annonce n'y est publiée**.

✅ **État vérifié de cette version** : 885 fonctions · 14 blocs script `node --check` OK · 25 images en fichiers dont k615-k628 · 28 dictionnaires tous déclarés · `allerVersGalop` (3×), `MEVO_CSS`, `EcranTraceAnime` intacts · **les 6 blocs de `g4-biomeca` rendent tous du contenu, 0 erreur JS**.

✅ **Les 9 cours du Galop 4 sont présents** : `g4-c1` (Le contact et l'accord des aides), `g4-galop-qualite`, `g4-c2` à `g4-c7`, et `g4-biomeca`. **Seul `g4-biomeca` est ouvert** (dans `HYPE_COURS_PRETS`) ; les 8 autres affichent « Prochainement ».

✅ **Tout le travail « Directeur Technique » est présent** : synchro de la progression (8 fonctions + extras), chapitre biomécanique (`BiomecaInteractif`, `CavalierEquilibre`, `CarteCours`, `ComplementsBiomeca`, `SectionCollapse` + leurs 5 dictionnaires), suppression de compte avec réactivation à 60 jours, partage de cours, bannière du club agrandie, 14,5 px, sélection ciblée des 5 questions Hey Baby, QCM 10 questions.

⚠️ **LEÇON DE MÉTHODE (importante)** : les fichiers envoyés dans une conversation **ne sont pas conservés** d'un message à l'autre — chaque envoi remplace le précédent. **Toujours retélécharger `index.html` depuis GitHub** au début d'une session plutôt que de chercher dans les fichiers du téléphone. Et en cas de mauvais push : **GitHub garde tout l'historique** (fichier → icône History → choisir le commit précédent → Browse files → télécharger).

🔴 **À POUSSER** : `index.html` + `SUIVI.md` + **`netlify.toml` à la racine** (toujours pas en ligne, c'est le plus urgent : il évite un nouveau dépassement Netlify) + les **14 images allégées** `k615.jpeg`…`k628.jpeg` dans `images/`.

---
**Version actuelle de l'index.html : session du 29/07/2026 (45) — Chapitre « Les transitions » + branchement des cours sur la Bibliothèque vidéo + corrections**

🔴 **À pousser** : `index.html`. ⚠️ **Il manque l'image `k631.jpg`** (couverture du nouveau chapitre) — Blandine doit la fournir. `hype-video.js` et `bibliotheque_video.sql` restent ceux de la session 44, inchangés.

**Session 45 — cinq choses**

**1. Nouveau chapitre `g4-transitions` « Les transitions »**, même gabarit que les deux précédents. Contenu fourni par Blandine, **6 langues complètes**.
- Couverture « PRESQUE / INVISIBLE » (k631, partage `#transitions`), citation sans auteur (le texte fourni n'en indiquait pas — pas d'attribution inventée).
- 6 cartes : monter et descendre · pourquoi on les travaille · elle commence avant · vers l'allure supérieure · **le ralentissement commence par le bassin** (carte centrale) · préparer-demander-accompagner.
- Écran final classique (à retenir, glossaire, Hey Baby, défi, Approfondir), QCM 10 questions. Les 5 questions Hey Baby fournies par Blandine verbatim.
- `COMPL_TRANSITIONS_I18N` + type de bloc `complements-transitions`, même composant partagé `ComplementsBiomeca`. **Quatre chapitres partagent désormais le même écran final.**

**2. Le bonus vidéo des cours est branché sur `HYPE_VIDEO.parCours()` de la Bibliothèque (session 44), plus sur `ObserverEnMouvement`.** C'était le bug signalé par Blandine : Le contact et L'accord des aides affichaient l'activité d'observation de la biomécanique (« la liberté des épaules », etc.) au lieu de leurs propres vidéos.
- `ComplementsBiomeca` reçoit désormais `cours: "g4-contact"` / `"g4-aides"` / `"g4-transitions"` / `"g4-biomeca"` (nouvelle prop).
- La page bonus vidéo demande `window.HYPE_VIDEO.parCours(coursId)` : 1ʳᵉ vidéo en carte principale (bordure turquoise, résumé, intervenant), les suivantes sous « Pour approfondir », bouton « Ouvrir la vidéo » → `__hypeVideoOuverte` + `setEcran("video-lecture")` (contrat de hype-video.js), lien « Voir toute la bibliothèque » → `setEcran("videos")`.
- **`ObserverEnMouvement` réservée à `coursId === "g4-biomeca"`** : elle ne s'affiche plus ailleurs. Repli « Prochainement » si un chapitre n'a ni vidéo ni activité (aucun cas aujourd'hui : les 4 chapitres ont l'un ou l'autre).
- Nouveau dico `VIDCOURS_I18N` (6 langues : à voir en premier / pour approfondir / ouvrir / bibliothèque / vidéo en français / vide).
- Testé en conditions réelles (mock de `HYPE_VIDEO.parCours`) : clic sur le bouton, la bonne vidéo s'affiche avec résumé et intervenant, la seconde en dessous sans le superflu, lien bibliothèque présent.

**3. Encart « Qu'as-tu réussi à observer ? » compacté et déplacé.** Demande de Blandine : il s'affichait au milieu de la liste des ressources et prenait toute la largeur en grandes cases. Désormais **après toutes les vidéos**, pastilles compactes en `inline-flex` (deux par ligne), sans changer le contenu (mêmes 6 réponses).

**4. Deux corrections visuelles sur `g4-contact` :**
- Couverture renommée **LE / CONTACT** (au lieu de « LA MAIN QUI PARLE ») — Blandine voulait garder ce titre.
- Texte des cartes de cours et des panneaux Approfondir remonté de **13,5 px à 14,5 px** (interligne 1,7), conforme à la règle de taille minimale validée. Seul `CarteSegmentRiche` était resté à l'ancienne taille ; l'écran final l'appliquait déjà.

**5. Extensions d'image.** `k629` corrigée en **`.jpeg`** (c'est ce que Blandine a réellement poussé sur GitHub — la livraison précédente disait `.jpg` par erreur). `k630.jpg` inchangée. `k631.jpg` déclarée mais **le fichier n'existe pas encore**.

⚠️ **Note pour la prochaine session : compteur `function` passé de 3004 à 3003, EXPLIQUÉ.** Ce n'est plus une anomalie ouverte (voir session 44). La réduction des questions Hey Baby à 5 partout a remplacé `[0,1,2,5,6].map(function (k) {...})` par `.slice(0, 5)` : une fonction anonyme de moins, volontairement. Vérifié par comparaison directe avec l'original.

✅ Vérifs : reconstruction faite **à partir de zéro sur le fichier de Blandine**, chaque modification appliquée une seule fois avec assertion stricte de comptage (leçon tirée d'un double-collage accidentel en cours de session, corrigé avant livraison) · 14 blocs script `node --check` OK · **1514 fonctions, écart de -1 expliqué ci-dessus** · marqueurs antérieurs tous préservés (`allerVersGalop` 3, `FilAnnoncesB` 5, `hypePartagerCours` 2, `ObserverEnMouvement` 4, `EcranVideos` 2, `MEVO_CSS` 2, `HYPE_AMBASSADEURS` 2) · **18 combinaisons rendues réellement** (3 chapitres × 6 langues, couverture + 2 blocs de cartes + écran final) : aucun bloc vide · Galop 4 vérifié en direct (`disponible: true, nouveau: true, debloque: false`) · bonus vidéo testé par clic réel : bonne vidéo affichée, hiérarchie respectée · aucune erreur JS nouvelle par rapport à l'index d'origine.

⏳ **Toujours en attente** : le visuel `k631.jpg`, le module interactif du chapitre « Le contact » (maquette à refaire), et côté Bibliothèque vidéo — faire vérifier les 3 liens « aides » non confirmés, choisir entre lien externe simple et lecteur intégré pour une future progression, exécuter `bibliotheque_video.sql` dans Supabase.

---

**Version actuelle de l'index.html : session du 29/07/2026 (44) — Bibliothèque vidéo (nouvel écran + page de lecture, fichier séparé)**

🔴 **À pousser** : `index.html` + **`hype-video.js` (NOUVEAU FICHIER)** + `SUIVI.md`. ⚠️ Le SQL `bibliotheque_video.sql` doit être exécuté dans Supabase (pas encore fait).

**Session 44 — la Bibliothèque vidéo**

Nouvelle page complète, construite d'après le cahier des charges de Blandine (17 sections) et la passation `passation-videos.md` de la page « Directeur Technique ».

**1. Fichier séparé `hype-video.js`, pas d'ajout dans index.html.** L'index fait **9,1 Mo**, au-dessus du seuil de troncature iOS Safari déjà identifié. Balise ajoutée juste après `hype-pedagogie.js`. Le fichier expose `window.EcranVideos`, `window.EcranVideoLecture` et `window.HYPE_VIDEO`.

**2. L'ancien écran vidéo a été retiré de index.html.** `EcranVideos` + `CarteVideo` (6 vidéos factices, grille de cartes identiques — exactement ce que le brief refuse) supprimés, **la route `ecran === "videos"` est inchangée** et le point d'entrée existant (carte 🎬 `RaccourciCarte` → `setEcran("videos")`) fonctionne tel quel. **Aucun 8ᵉ onglet ajouté à la NavBar** : elle en a déjà 7, un huitième écraserait les libellés. La const `VIDEOS` est conservée, elle sert encore à `AdminVideos`.
- Nouvelle route ajoutée : `ecran === "video-lecture"` → `EcranVideoLecture`.

**3. Catalogue = 6 vraies vidéos, pas 16 titres souhaités.** Le point 10 du brief listait 16 titres qui n'existent pas. Une première version du catalogue les contenait ; **elle a été jetée** au profit de la table de la passation : 3 interventions IFCE sur le contact (Bernard Maurel, Géraldine Vandevenne, Stéphane Montavon, avec PDF) + 3 vidéos sur les aides. Tout ce qui s'affiche est en **6 langues** (titres, résumés, points à observer, rôles des intervenants).
- `HYPE_VIDEOS` est la **source de vérité unique**. Une vidéo sans source (`yt` vide) est automatiquement exclue de la bibliothèque : pas de carte morte. Drapeau `MONTRER_A_VENIR` pour les voir en relecture.
- `parCours(coursId)` lit **tout** `cours[]`, pas seulement le premier : `v-contact-03` remonte donc aussi sur `g4-biomeca`.

**4. Décision tranchée avec Blandine : PAS DE POURCENTAGE DE LECTURE.** Les vidéos sont jouées par un lecteur externe (iframe YouTube) : l'app ne peut pas savoir où le cavalier s'est arrêté, donc toute barre de progression serait un chiffre inventé. On enregistre deux faits vrais — la vidéo a été **ouverte**, elle est marquée **vue**. « Continuer à regarder » = la dernière ouverte non terminée. La colonne `position_sec` existe déjà en base si un vrai suivi devient nécessaire (API YouTube IFrame, option B de la passation).

**5. Miniatures YouTube distantes** (`i.ytimg.com/vi/ID/hqdefault.jpg`) : aucune image à pousser, **aucune bande passante Netlify consommée** pour les couvertures. Repli sur une couverture procédurale (dégradé par thème + deux arcs lumineux rappelant la trace animée) si une vidéo n'a pas de vignette.

**6. Hébergement : YouTube maintenant, migration prévue.** Le champ est `src: { type: "youtube"|"vimeo", ref }`, jamais une URL brute : passer une vidéo sur Vimeo = changer deux mots. La progression et les favoris sont rangés par **identifiant Hype** (`v-contact-01`), pas par identifiant YouTube, donc un changement d'hébergeur ne fait rien perdre aux cavaliers.

**7. Contenu de la page** : en-tête immersif (Cinzel + halo turquoise + 3 statistiques réelles), recherche fonctionnelle (titres, chapitres, résumés, titres officiels, intervenants, points à observer), suggestions tapables, navigation par univers, **« Explorer par Galop » en cristaux hexagonaux sur un fil lumineux** (pas 7 rectangles — cohérent avec l'arc de Mon Évolution), 3 collections éditoriales dont **« Paroles d'experts »** (angle académie, tiré de `intervenant`/`intervenantRole` — pas prévu au brief), « Mes vidéos » (favoris / à revoir / historique), feuille de filtres en bas d'écran, état vide franc si la bibliothèque n'a aucune vidéo.
- **Page de lecture** : lecteur `youtube-nocookie`, chapitre, résumé, « Pendant la vidéo, observe particulièrement… » (seulement sur les vidéos principales, qui en ont), bloc **intervenant** avec son rôle, le titre officiel de l'intervention et le lien vers le PDF IFCE, **avertissement honnête « cette vidéo est en français »** quand la langue du cavalier n'est pas le français, bouton favori, « Marquer comme vue », « Voir le cours » (niveau déduit de l'identifiant du chapitre, `g4-` → 4), et « À regarder ensuite ».

✅ Vérifs : `node --check` sur **14 blocs script inline** de index.html + sur `hype-video.js` · **3624 `function`** dans index.html (3626 avant, soit exactement les 2 fonctions déplacées, rien d'autre perdu) · évaluation réelle du fichier hors navigateur (les deux composants sont bien exposés) · **rendu simulé des deux écrans dans les 6 langues** avec React et le contexte mockés : 254 nœuds pour la bibliothèque, 47-49 pour le lecteur, aucun `undefined` rendu dans aucune langue · miniature `i.ytimg.com` présente · **aucune occurrence de `hv-prog`** (barre de progression bien absente) · avertissement de langue présent en `de`, absent en `fr` · bloc « observe » bien absent sur une vidéo secondaire · cas d'erreur testé (identifiant de vidéo inconnu → écran de repli, pas de plantage).

⚠️ **Pas de rendu Playwright** : impossible ici, l'app a besoin des 120+ fichiers `hype-images-*.js` que je n'ai pas. Le rendu simulé ci-dessus le remplace partiellement — **à ouvrir sur iPhone après le push**.

🔴 **DEUX CHOSES À FAIRE AVANT DE POUSSER**
1. **Vérifier 3 liens** (dix secondes chacun), ils n'ont jamais été ouverts : `do-xy3MlB08`, `liF7Odcx6F8`, `M4t3qcqeDsY`. Si l'un est mort, retirer son entrée de `HYPE_VIDEOS` ou passer `INCLURE_NON_VERIFIEES` à `false` (la bibliothèque tombe alors à 3 vidéos, les 3 IFCE confirmées).
2. **Exécuter `bibliotheque_video.sql`** dans Supabase. Sans lui, favoris et « vue » ne survivent qu'en local (`localStorage`), ils ne suivent pas le cavalier d'un appareil à l'autre. L'app ne plante pas sans : tout est en repli silencieux.

⏳ **ÉTAPE D, NON FAITE : le lien cours → vidéo.** Le sens bibliothèque → cours fonctionne. Le sens inverse demande de toucher `ComplementsBiomeca` (page bonus `vue === "video"`, figée sur un encart « Prochainement » pour les 3 chapitres) et d'ajouter `vidIds` dans `COMPL_CONTACT_I18N` / `COMPL_AIDES_I18N`. **Volontairement pas fait dans cette session** : c'est le composant partagé par 3 chapitres, la passation demandait explicitement de ne pas s'écraser dessus, et `window.HYPE_VIDEO.parCours("g4-contact")` est déjà prêt à l'alimenter. À faire avec validation de Blandine.

⚠️ **Pour la suite, repartir de CETTE version (44)**.

---

**Version actuelle de l'index.html : session du 29/07/2026 (43) — Chapitre « L'accord des aides » + ouverture du Galop 4**

🔴 **À pousser** : `index.html` + `SUIVI.md`. ⚠️ **Il manque l'image `k630.jpg`** (couverture du nouveau chapitre) — voir plus bas.

**Session 43 — quatre choses**

**1. Nouveau chapitre `g4-aides` « L'accord des aides »**, inséré juste après `g4-contact`, même gabarit. Contenu fourni par Blandine, **6 langues complètes**.
- Couverture « UNE SEULE / INTENTION » (k630, partage `#aides`), citation Baucher « Mains sans jambes, jambes sans mains. »
- 6 cartes : les aides ton langage · une aide principale les autres autour · préparer avant de demander · la plus petite aide efficace · mains sans jambes jambes sans mains · quand ça ne répond pas. Chacune avec panneau « Approfondir ».
- Écran final : À retenir (8 points), glossaire (8 termes dont *habituation*), Hey Baby, défi « une seule intention », Approfondir (Baucher présenté comme **formule d'enseignement, pas loi de la nature** ; l'habituation et l'importance du relâchement). Vidéo en « Prochainement ».
- QCM 10 questions, 3 options, même moule que les autres.
- Dictionnaire `COMPL_AIDES_I18N` + type de bloc `complements-aides`, toujours via la prop `dico` de `ComplementsBiomeca`. **Trois chapitres partagent désormais le même composant d'écran final.**

**2. `g4-c1` « Le contact et l'accord des aides » a été retiré** (1 713 caractères). C'était le plan validé : ce chapitre unique est remplacé par les deux nouveaux, plus complets. Une seule référence existait dans le code, aucune ailleurs. Les `coursTermines` d'anciens utilisateurs contenant `g4-c1` sont simplement ignorés, l'XP déjà gagné n'est pas touché.

**3. 🔓 Le Galop 4 est ouvert.** Il portait `disponible: false` dans `GALOPS_I18N`, ce qui affichait « Bientôt disponible » et bloquait l'accès à Biomécanique et Le contact. Passé à **`disponible: true, nouveau: true`** (ruban NEW sur la carte du galop, comme les Galops 2 et 3). `debloque: false` **inchangé** : le cadenas Premium reste en place, c'est voulu.
- Conséquence : dans le Galop 4, **3 chapitres sont ouverts** (`g4-contact`, `g4-aides`, `g4-biomeca`) et les 7 autres (`g4-galop-qualite`, `g4-c2` à `g4-c7`) gardent leur badge « Prochainement », puisque seuls les trois premiers sont dans `HYPE_COURS_PRETS`.

**4. Convention d'extension.** `k630.jpg` déclarée en **`.jpg`** (nouvelle règle du 29/07). **Prochaine clé libre : k631.**

⚠️ **L'image `k630.jpg` n'existe pas encore.** Le chapitre fonctionne, mais sa couverture s'affiche sans photo (fond noir, titre et citation lisibles) jusqu'à ce que le fichier soit poussé dans `images/`. Blandine doit fournir le visuel ; il sera livré recadré et déjà nommé `k630.jpg`.

✅ Vérifs : 14 blocs script `node --check` OK · **1514 fonctions, inchangé** · 31 dictionnaires tous déclarés · les **12 combinaisons** (2 nouveaux chapitres × 6 langues) montées bloc par bloc : couverture ~3 590 car., cartes ~8 200 car., écran final ~18 300 car., **aucun bloc vide** · `GALOPS_I18N` vérifié en direct (`disponible: true, nouveau: true, debloque: false`) · liste du Galop 4 relue après suppression : 10 chapitres, `g4-c1` bien absent · marqueurs antérieurs préservés · aucune erreur JS nouvelle par rapport à l'index d'origine.

⏳ **Toujours en attente** : le module interactif du chapitre « Le contact » (maquette à refaire) et le visuel k630.

---

**Version actuelle de l'index.html : session du 29/07/2026 (42) — Nouveau chapitre Galop 4 « Le contact » (6 langues)**

🔴 **À pousser** : `index.html` + `SUIVI.md` + l'image **`k629.jpg`** dans `images/`.

**Session 42 — le chapitre « Le contact »**

Nouveau chapitre `g4-contact`, inséré dans `COURS_GALOP4_FR` **juste après `g4-c1`**, au gabarit `g4-biomeca`. Contenu fourni par Blandine (document « LE CONTACT »), découpage validé par elle.

- **Structure** : couverture (k629, partage activé) → 3 cartes « Le contact, un dialogue » → 3 cartes « Accompagner, agir, céder » → écran final → QCM 10 questions. **6 langues complètes** (fr/en/es/it/ja/de), aucun repli sur le français.
- **Les 6 cartes** : un dialogue pas une prise · trop fort ou pas assez · il commence loin des mains · les coudes amortissent · mains placées rênes ajustées · venir au contact puis céder. Chacune a son panneau « Approfondir ».
- **Écran final réutilisé, pas dupliqué.** `ComplementsBiomeca` accepte désormais une prop **`dico`** : `function ComplementsBiomeca(props)` → `const __DICO = (props && props.dico) || COMPL_I18N;`. Sans prop, comportement **identique** à avant (le pilote n'est pas touché). Nouveau dictionnaire `COMPL_CONTACT_I18N` + nouveau type de bloc `complements-contact`. Ça évite 130 lignes de composant copiées.
- **Bonus** : défi « sens tes coudes » (5 points d'observation), vidéo en « Prochainement » (attend les liens IFCE), Approfondir (l'action du mors sur les barres/langue/commissures, l'apprentissage par la disparition de la pression).
- **Ouvert** : `"g4-contact": true` dans `HYPE_COURS_PRETS`. **Partage** : `"contact"` ajouté à la table `MAP` de `CIBLE_DIRECTE`, lien `LIEN_APP + "#contact"`.
- **Image** : `window.HYPE_IMGS["k629"]="images/k629.jpg"` déclarée. Le visuel fourni était une **capture d'écran** : recadrée (croix, trois points et bandes noires retirées), 1024×1756, qualité 84, **170 Ko**. **Prochaine clé libre : k630.**
- 📌 **Nouvelle convention d'extension, décidée le 29/07 par Blandine : les images livrées sont désormais renommées en `.jpg` avant livraison**, pour éviter la confusion `.jpeg` / `.jpg` qui a rendu les cartes du Memory invisibles. Elle n'a plus rien à renommer : le fichier fourni porte déjà le bon nom. Les clés k555 à k628 restent en `.jpeg`, on ne touche à rien.
- ⚠️ **`g4-c1` « Le contact et l'accord des aides » est toujours en place** et fait maintenant doublon partiel. Il doit disparaître quand le chapitre « L'accord des aides » sera livré — c'est le plan validé avec Blandine (deux chapitres séparés au lieu d'un).

✅ Vérifs : 14 blocs script `node --check` OK · **1514 fonctions, inchangé** · 30 dictionnaires tous déclarés · les 4 blocs du chapitre montés un par un **dans les 6 langues**, aucun ne rend du vide (texte-riche ~8,4 K car., compléments ~18 K car.) · `couv-affiche` rend 0 via `BlocCours` **comme le pilote** (c'est `EcranCours` qui l'affiche : testé via `CouvAffiche`, 3 634 car., titre et citation corrects) · marqueurs antérieurs préservés (`allerVersGalop` 3, `MEVO_CSS`, `EcranTraceAnime`, biomeca, cartes, partage, annonces, Memory, k615-k628) · aucune erreur JS nouvelle par rapport à l'index d'origine.

⏳ **En attente** : le module interactif du chapitre (la maquette « les coudes amortissent » a été rejetée par Blandine, à refaire). Le chapitre tient debout sans lui ; il s'insérera comme 4ᵉ bloc, avant l'écran final.

---

**Version actuelle de l'index.html : session du 29/07/2026 (41) — Déclarations d'images du Memory (réappliquées) + document de passation pour les cours**

🔴 **À pousser** : `index.html` + `SUIVI.md` + `PASSATION-cours.md` + `netlify.toml` (racine) + les **14 images allégées** `k615.jpeg`…`k628.jpeg` dans `images/` (elles **remplacent** celles en ligne).

**Session 41 — deux choses**

1. **Déclarations d'images réappliquées.** L'index fourni par Blandine avait le bandeau d'annonces par page (session 39) mais **pas** les déclarations d'images de la session 40. Réappliquées : `window.HYPE_IMGS["kNNN"]="images/kNNN.jpeg"` pour **k610 et k615 à k628** (15 clés). Vérifié : 25 images sont désormais de vrais fichiers, k615-k628 toutes présentes.
   ⚠️ **C'était la cause des cartes Memory invisibles** : les fichiers étaient bien en ligne sur GitHub en `.jpeg`, mais aucune déclaration ne disait à l'appli où les chercher. **Une image demande deux gestes : la pousser ET la déclarer.**

2. **📄 `PASSATION-cours.md` livré** — document destiné à toute session qui reprendra le travail sur les cours des Galops. Il contient : le principe (distinguer l'indispensable du facultatif), le gabarit complet d'un chapitre, les composants réutilisables et comment les appeler (`CarteCours`, `SectionCollapse`, `hypePartagerCours`), **les décisions de fond à ne pas rouvrir** (14,5 px, « Approfondir », les chiffres non sourçables qu'on n'affiche pas, le moteur de progression qu'on ne touche pas), **les pièges techniques vécus** (le bornage de réécriture qui avale un `const`, le `<li>` en flex, `CouvAffiche` hors contexte), la règle des deux gestes pour les images, ce qui reste à faire, et la méthode de travail avec Blandine.

✅ Vérifs : **885 fonctions**, 14 blocs script `node --check` OK, 25 images en fichiers dont k615-k628, tout le travail antérieur préservé (biomeca, cavalier, cartes, compléments, partage, suppression de compte, synchro, annonces par page).

---

**Version actuelle de l'index.html : session du 29/07/2026 (39) — Bandeau d'annonces par page (réappliqué) + fusion avec le travail Memory**

🔴🔴 **URGENT — SITE HORS LIGNE : QUOTA NETLIFY DÉPASSÉ (29/07)** 🔴🔴
Message Netlify : « **This team has exceeded the credit limit. All projects and deploys have been paused.** » Les visiteurs voient « Site not available ».

**Relevé Usage du 29/07 à 9h13** : bande passante **1 750,5 crédits** · requêtes web (158 608) 31,7 · compute 9,5 · **total 11 076,7**. → **C'est la bande passante, et elle seule.**

**Cause** : `index.html` pèse **8,9 Mo**, et chaque visite charge en plus **118 fichiers `hype-images-*.js`** + une cinquantaine d'images de `images/`. Aucun en-tête de cache n'était configuré → tout était retéléchargé intégralement à chaque visite.

**Actions**
1. ⏳ **Blandine a payé mais le site est toujours hors ligne.** Pistes : (a) les crédits achetés ne couvrent peut-être pas le dépassement — vérifier si le bandeau rouge a disparu ; (b) les projets sont « paused », il faut sans doute **relancer un déploiement** (site → Deploys → « Resume » ou « Trigger deploy ») ; (c) simple délai de réévaluation. Si rien ne bouge, contacter le support Netlify (réactif quand on vient de payer).
2. 🔴 **Pousser `netlify.toml` à la racine du repo** (livré session 38-39). `index.html` et `/` restent non mis en cache (pour que les mises à jour soient vues) ; `images/*`, `hype-images-*.js`, `hype-*.js`, `complement-*.js` et toutes les extensions d'images/polices passent en **`max-age=31536000, immutable`** (un an). Ces fichiers ne changent jamais : une image modifiée reçoit une nouvelle clé (k629…), donc le navigateur va chercher le nouveau nom. **Gain attendu : 80-90 % de bande passante en moins pour tout visiteur qui revient.**

⚠️ **Le chantier de fond reste entier** : les **~550 images en base64** dans `hype-images-1.js` à `122.js`. Le base64 gonfle chaque image d'environ 33 %, et ces 118 fichiers sont chargés dès l'ouverture même si les images ne s'affichent pas. Deux étapes : (1) migration vers `images/` — déjà commencée, tout ce qui est ≥ k547 est un vrai fichier ; (2) chargement à la demande écran par écran.

⚠️ **Ne pas confondre avec le quota Supabase**, problème distinct avec sa propre échéance au **14 août 2026**. Première action de ce côté : ouvrir « Review usage » pour identifier la jauge en cause.

---

**Session 39 — bandeau d'annonces par page (réappliqué)**
⚠️ **Pourquoi « réappliqué »** : la session 38 livrait deux choses (bannière du club + bandeau paramétrable). Blandine a poussé une version intermédiaire où seule la bannière était présente. Vérification faite sur l'index du 29/07 : tout le reste du travail Directeur Technique est bien là, **seul le bandeau manquait**. Réappliqué proprement.
- `FilAnnoncesB` accepte désormais **`cible`** (source des annonces, défaut `annonces-hype`) et **`libelle`** (mot affiché à gauche, défaut « Nouveau »). `useAnnonces(langue, cible)` étendue, cible dans les dépendances.
- **Ma Sellerie : `cible: "annonces-sellerie"`, `libelle: "Partenaires"`.** Accueil et Bibliothèque des Galops inchangés.
- ✅ Blandine gère ces annonces elle-même via Supabase (commentaires de cible `annonces-sellerie`). **Tant qu'aucune annonce n'y est publiée, le bandeau ne s'affiche pas** — le problème du bandeau hors sujet sur Ma Sellerie est donc réglé immédiatement.
- 💡 Y mettre des nouveautés partenaires, **pas** les codes promo (déjà affichés en dessous, ce serait de la redite).

✅ Vérifs : **885 fonctions**, 14 blocs script `node --check` OK, 28 dictionnaires tous déclarés, les 6 blocs de `g4-biomeca` rendent tous du contenu, 0 erreur JS. Travail des autres pages préservé (**niveau Memory « Evan » et images k615-k628 confirmés présents**).

---

**🧩 TRAVAIL DE LA PAGE MEMORY (29/07) — à ne pas perdre**
Cette page a livré en parallèle : **nouveau niveau Memory « Evan et sa ponette »** (10 paires, `images/k615.jpg` à `k624.jpg`) qui comblait le seul personnage sans niveau dédié ; **4 cartes de « La vie du poney » remplacées** (Copains k628 · La balade k627 · La couverture k625 · Le repos k626) ; **bug du retour natif corrigé** (le Memory reste dans son propre écran au lieu de sauter aux Galops, via `window.__memoryPoneyVue`/`__memoryPoneyRetour`).
- 🔴 **Les 14 fichiers `k615.jpg` à `k628.jpg` doivent être poussés dans `images/`** en même temps que l'index.
- ⚠️ **Plage de clés : prochaine libre = k629.** k554 est prise (icône d'erreur), k555-k614 aussi, **k610 est l'image de bulles pour « Mes messages »** (maquettes d'accueil).
- Reste à faire côté Memory : identifier les cartes cassées du niveau **« Les allures »** (capture à demander) · bug de superposition au scroll sur **« La sécurité »** (à recapturer au bon moment) · 3 cartes de « La vie du poney » encore à l'ancien style (L'eau, Le foin, La balade de nuit) · coder le Memory multijoueur (3 maquettes prêtes : duo même téléphone, duo à distance, cartes vivantes).

---

🔴 **À pousser** : `index.html` + `SUIVI.md` + **`k610.jpeg`** dans `images/` (nouvelle image, voir plus bas — pas encore utilisée par le code, elle attend la validation de la maquette d'accueil).

**Session 37 — quatre changements sur le chapitre `g4-biomeca`**

1. **Lisibilité : contenu passé de 13,5 à 14,5 px** (interlignes 1,65 → 1,70) dans `ComplementsBiomeca` (7 occurrences) et `CavalierEquilibre` (5). Décidé après comparaison sur maquette dédiée (`maquette-tailles-police.html`, les 3 tailles côte à côte sur l'encart le plus dense). ⚠️ **Discussion à retenir** : Blandine s'inquiétait de l'allongement des pages. Réponse : +7 % de hauteur seulement, et le vrai levier pour raccourcir n'est pas la police mais le **volume de texte** — si un écran paraît trop long, on resserre les phrases plutôt que de rogner la taille.
2. **5 questions Hey Baby** remises en pastilles dans la carte de fin de chapitre (Blandine les regrettait après la refonte 34). Indices 0/1/2/5/6 de `hbQuestions` : lourd dans la main · sentir les postérieurs actifs · accélère quand on veut ralentir · tombe sur l'épaule intérieure · est-ce que je me penche trop. Les 5 autres restent dans le dictionnaire, réutilisables. ⚠️ 10 pastilles faisaient un pavé, 5 est le bon compte.
3. **Chapitre ouvert** : `"g4-biomeca": true` ajouté à `HYPE_COURS_PRETS` → il perd le badge « Prochainement », gagne le **ruban NEW**, et devient accessible. Le Galop 4 étant sous cadenas Premium (`debloque: false` dans `GALOPS_I18N`), il est donc **accessible aux Premium**.
4. **Bouton « Partager ce cours » sur la couverture** : nouvelle fonction `hypePartagerCours()` + dictionnaire `PARTAGE_COURS_I18N` (6 langues). Elle tente d'abord la **feuille de partage native** (`navigator.share` → WhatsApp, Messages…) et **retombe sur la copie du lien** dans le presse-papier si le téléphone ne la propose pas, avec un message « Lien copié ! » pendant 2,2 s. Le lien pointe sur la couverture via un **nouveau raccourci `#biomeca`** ajouté à la table `MAP` de `CIBLE_DIRECTE` (`{ galop: 4, cours: "g4-biomeca", page: 0 }`). Activation par bloc : il suffit d'ajouter `"partage": "cle"` dans l'objet `couv` d'un `couv-affiche` pour que le bouton apparaisse — **réutilisable sur n'importe quel cours**.

✅ Vérifs : **885 fonctions** (inchangé), 14 blocs script `node --check` OK, 28 dictionnaires tous déclarés, `CAVALIER_I18N`/`allerVersGalop` (3×) intacts. **Rendu Playwright réel** : les 6 blocs du cours rendent du contenu, taille des puces mesurée à **14,5 px**, les 5 bonnes questions présentes et la 6ᵉ absente, `coursEstPret(4,'g4-biomeca')` renvoie true, bouton de partage affiché et **clic testé → lien copié**. 0 erreur JS.
⚠️ **Note de méthode** : `CouvAffiche` rend 0 caractère si on le monte hors du contexte de l'app (`AppContext.Provider`) — ce n'est pas un bug, c'était juste mon test isolé. Il faut fournir un contexte minimal pour le tester.

⚠️ **EN ATTENTE DE VALIDATION — maquette d'accueil** : `maquette-accueil-propositions.html`, 6 façons de présenter les rubriques de l'accueil (`EcranUnivers`), toutes en Hype Spectral et navigables :
- **A · Tuile illustrée** (visuel plein cadre + titre posé dessus) — utilise **k610** (image de bulles de conversation fournie par Blandine le 28/07, à mettre derrière « Mes messages »)
- **B · Dépliant** (replié par défaut, c'est ce que Blandine demandait pour raccourcir l'accueil)
- **C · Bandeau compact** · **D · Duo côte à côte** · **E · Carrousel horizontal** · **F · Onglets**
- Recommandation faite : tuile illustrée pour Mes messages, dépliant pour les rubriques à sous-entrées, bandeau compact pour le reste. Carrousel déconseillé sur un menu (ce qui sort de l'écran ne se voit jamais).
- ⚠️ **Rien n'est codé dans l'index** : `k610.jpeg` doit être poussée mais n'est pas encore référencée.

---

**Version précédente : session du 28/07/2026 (36) — SUPPRESSION DE COMPTE avec délai de réflexion de 60 jours**

🔴 **3 CHOSES À FAIRE PAR BLANDINE, DANS CET ORDRE** :
1. **Supabase** → SQL Editor → exécuter `suppression-compte.sql`. ⚠️ **Version révisée** : à relancer même si tu as déjà exécuté le premier script ce soir (il ajoute les colonnes de délai ; il est idempotent, aucun risque).
2. **GitHub** → déposer `supprimer-compte.js` dans **`netlify/functions/`** (sur GitHub, nommer le fichier `netlify/functions/supprimer-compte.js` crée les dossiers tout seuls), puis pousser `index.html` + `SUIVI.md`.
3. **Netlify** → Site configuration → Environment variables :
   - ✅ `SUPABASE_URL` — **créée le 28/07** (valeur : `https://ldpjebgtskzdokrublfg.supabase.co`, retrouvée dans l'index)
   - ✅ `SUPABASE_SERVICE_ROLE_KEY` — **existait déjà** dans le Netlify de Hype. La fonction accepte les deux noms (`SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SERVICE_ROLE`), donc **rien à recréer**.
   - ⬜ `HYPE_CLE_PURGE` = un mot de passe inventé par Blandine (protège l'appel de purge) — **reste à créer**
   ⚠️ Piège repéré : l'écran de création propose « Different value for each deploy context », qui oblige à remplir 4 champs. Choisir **« Same value in all deploy contexts »**.
   ⚠️ Autre piège : sur mobile, le menu Netlify de **l'équipe** (Builds, Members, Team settings) n'a pas d'« Environment variables » — il faut d'abord **entrer dans le site** majestic-melba-997a68, puis Site configuration.

**Session 36 — le parcours complet** (nouveau composant `EcranSupprimerCompte`, 885 fonctions)

⚠️ **DÉCISION MAJEURE (Blandine) : suppression DIFFÉRÉE de 60 jours, pas immédiate.** Motif : par expérience, les gens changent souvent d'avis. Discussion tenue sur le cadre légal : conserver les données « au cas où » sans consentement serait contraire au RGPD, mais un **délai de grâce annoncé** est parfaitement conforme (c'est ce que font Discord, Instagram et la plupart des jeux). 30 jours est la norme, 60 reste défendable — Blandine a choisi **60**.
- **Au clic** : le compte est désactivé immédiatement, `compte_supprime = true`, `suppression_prevue_le = maintenant + 60 jours`. **AUCUNE donnée n'est effacée.** Seules `augalop_etat_v1` et `hype_uid` sont retirées de l'appareil, pour que l'appli reparte propre.
- **Écran final** : « Ton compte est désactivé · Il sera définitivement supprimé le [date en clair, formatée dans la langue] · D'ici là, reconnecte-toi simplement pour tout retrouver. »
- **Réactivation automatique** : nouvelle fonction `hypeReactiverSiSuppressionEnCours()`, appelée dans `apresConnexion()`. Si le cavalier se reconnecte pendant les 60 jours, les 3 colonnes sont remises à zéro et il retrouve son compte intact. Elle refuse de réactiver si le délai est déjà écoulé (la purge doit primer). Émet l'événement `hype-compte-reactive` + `window.__hypeReactive` pour permettre d'afficher un bandeau plus tard.
- **Purge** : la fonction Netlify accepte `action: "purger"` (protégée par `HYPE_CLE_PURGE`, sans utilisateur connecté) : elle liste les profils échus et les supprime réellement — 17 tables, dossier de photos dans le bucket Storage, puis `auth.admin.deleteUser`. ⚠️ **RESTE À BRANCHER** : il faut un appel planifié (Netlify scheduled function, `pg_cron` Supabase, ou un simple appel manuel de temps en temps). En attendant, la requête de contrôle est dans le SQL : `select id, pseudo, suppression_prevue_le from public.profiles where compte_supprime = true and suppression_prevue_le <= now();`
- **Suppression immédiate à la demande** (obligation RGPD si quelqu'un l'exige) : à faire à la main, requête fournie en commentaire dans le SQL.

**Le parcours, en 3 écrans**
- **Accès** : lien discret souligné en gris dans « Mon compte », **sous « Se déconnecter »**. Écran atteint depuis Profil → Mon compte, ou l'icône en haut à droite de l'accueil.
- **Écran 1** : deux blocs — *SUPPRIMÉ APRÈS 60 JOURS* (corail) / *CONSERVÉ* (turquoise) — puis le **motif de départ facultatif** (6 choix), puis l'avertissement doré expliquant le délai et la réversibilité.
- **Écran 2** : confirmation par **saisie de l'adresse email**, bouton désactivé tant que ça ne correspond pas exactement (testé : désactivé → actif → redésactivé).

**Motif de départ** — facultatif, aucun motif requis :
- « Il manque des choses » / « Un problème avec un autre cavalier » / « Autre » → **champ texte** (celui du problème relationnel précise *nous sommes les seuls à le lire*)
- « C'est trop cher » → **proposition de rétention**, avec « Nous écrire » **et** « Non merci, je supprime » également accessibles. ⚠️ Rendre la sortie plus difficile que l'entrée serait un *dark pattern* sanctionné par le RGPD.
- Enregistrés dans `departs_motifs` **sans aucun user_id**. Lecture : `select motif, count(*) from public.departs_motifs group by motif order by 2 desc;`

⚠️ **DÉCISIONS DE FOND (Blandine), à ne pas rouvrir sans elle** :
- Les **commentaires laissés chez d'autres cavaliers sont conservés** même après la purge, pour ne pas casser leurs conversations. Le `profiles` est vidé mais **pas supprimé**.
- **Seuls le pseudo et l'avatar sont grisés** ; le texte du commentaire reste normalement lisible (pour ne pas attirer l'œil dessus). Le pseudo n'est plus cliquable.
- **Aucune mention « compte supprimé »** affichée aux autres : effet de désertion, et ça donne de mauvaises idées.
- **Pas de case d'anonymisation du pseudo** : dans le milieu équestre, ce serait une porte de sortie pour ceux qui postent n'importe quoi puis disparaissent. Demandes RGPD sincères traitées **à la main en SQL**.
- **Pendant les 60 jours, le profil disparaît des listes et des recherches** — la personne qui veut partir doit vraiment sembler partie (discussion tenue : un profil grisé serait remarqué et commenté, exactement ce qu'on veut éviter).

⚠️ **RESTE À FAIRE (2 points d'affichage, non bloquants)** :
1. **Griser le pseudo et l'avatar** sous les anciens commentaires quand `compte_supprime = true` (la colonne existe et est renseignée, l'affichage ne la lit pas encore). Point d'entrée repéré : `listerCommentairesPhoto()` sélectionne déjà `profiles(id, pseudo, avatar_url)` — il suffit d'y ajouter `compte_supprime` et de styler le rendu (vers l'offset ~6406621, `commentairesVisu.map`).
2. **Masquer les profils désactivés** des listes de cavaliers et des recherches.
3. **Bandeau de réactivation** à la reconnexion (l'événement `hype-compte-reactive` et le texte `T.reactive` existent déjà en 6 langues, il reste à l'afficher).

✅ **6 langues** (`SUPPR_I18N`, 34 clés) : fr/en/es/it/ja/de — vérifié au test que les 6 sont complètes.

✅ Vérifs : 884 → **885 fonctions**, 14 blocs script `node --check` OK, `supprimer-compte.js` validé `node --check`, **28 dictionnaires tous déclarés**, `CAVALIER_I18N` présent. **Rendu Playwright réel** : parcours complet écran par écran, champs conditionnels, offre de rétention et sa sortie, activation/désactivation du bouton final, nouveaux textes du délai, 6 langues, fonction de réactivation exposée — **0 erreur JS**. Non-régression vérifiée : **les 6 blocs de `g4-biomeca` rendent tous du contenu**.

**Maquette de référence** : `maquette-suppression-compte.html` (antérieure à la décision des 60 jours : les textes de l'écran 1 et de l'écran final ont évolué depuis).

---

**Version précédente : session du 28/07/2026 (35) — 🔴 CORRECTIF URGENT : crash du chapitre Galop 4 (module cavalier)**

⚠️ **Collision de numéros à noter** : cette refonte avait été livrée une première fois sous le numéro 33, mais Blandine ne l'a pas poussée et une autre page a utilisé 33 entre-temps (correctifs photos de profil). La refonte a donc été **réappliquée par-dessus l'index contenant ces correctifs** (vérifié présents : `photo_url`, bucket Storage) et renumérotée 34. Rien de perdu des deux côtés.

🔴 **À pousser** : `index.html` + `SUIVI.md`. Aucune image, aucun SQL.

**Session 34 — refonte UX validée par Blandine** (brief « ÉVOLUTION DE L'ARCHITECTURE DES COURS HYPE »)
Constat de départ : à force d'enrichir le chapitre biomécanique, le rythme de lecture était cassé et on ne distinguait plus l'obligatoire du facultatif. **Cette architecture devient le modèle de tous les futurs chapitres.**

**Nouvelle structure du dernier écran du cours** (composant `ComplementsBiomeca` entièrement réécrit) :
1. **📝 « À retenir en 20 secondes »** — la synthèse reste dans le cours (décision Blandine : c'est le résumé, il aide à réussir)
2. **📚 Glossaire** en accordéon replié — reste aussi dans le cours (utile pendant la lecture)
3. **🤖 Carte Hey Baby** « Une question avant le QCM ? » — mise en avant (bordure et fond turquoise), bouton « Poser une question »
4. **✨ « Tu souhaites aller plus loin ? »** avec la mention *Facultatif — tu peux passer le QCM directement*, puis 3 cartes bonus
5. **✅ Bouton « Passer le QCM »** en bas

**Les 3 bonus s'ouvrent en pages séparées** (état interne `vue`, barre de retour « ‹ BONUS · … », scroll remis à zéro) — la page principale reste courte, on revient exactement où on était :
- **👁 Défi du cavalier** : les 5 cases + bouton de validation + phrase de fin
- **🎥 Observer en vidéo** : **absorbe le composant `ObserverEnMouvement`** de la session 28 (le bloc `observer-mouvement` a été retiré du tableau `blocs` du cours ; la fonction est conservée intacte et simplement appelée depuis ce bonus, plus de doublon). ⚠️ Reste en attente des liens IFCE de Blandine.
- **🎓 Approfondir** : Le savais-tu · La science explique (+ panneau dépliant) · Pour aller plus loin

⚠️ **Décisions de vocabulaire et d'UX (Blandine)** :
- Libellé **« Approfondir »** retenu à la place de « Pour les plus curieux » (plus universel, marche pour un enfant comme pour un adulte). ⚠️ **À harmoniser** : les boutons « 🎓 M'expliquer plus en détail » des cartes de cours (`CARTE_LABELS`) portent encore l'ancienne formulation.
- **OPTION A retenue : le moteur n'est pas touché.** XP, validation, `coursTermines`, synchro Supabase inchangés — pour ne rien casser sur les 100+ autres cours. Le bouton « Passer le QCM » appelle les mêmes fonctions (`setCoursTermines` + `setXp` +25 si le cours n'est pas déjà terminé) puis `setEcran("quiz")`, en sautant l'ancienne page de transition `PageCoursTermine` pour ce cours.
- ⚠️ **Conséquence assumée** : la célébration « +25 XP » de `PageCoursTermine` ne s'affiche plus à cet endroit pour ce chapitre. `PageCoursTermine` reste en place et intacte pour tous les autres cours.
- Bonus en **pages séparées** plutôt qu'en accordéons dépliants (sinon la page redevenait longue, ce qu'on cherchait à corriger).

✅ **6 langues** : nouveau dictionnaire `COMPL_NAV` (titres Hey Baby, invitation, noms et sous-titres des 3 bonus, bouton QCM, retour). Titre de la synthèse retraduit dans les 6 langues (« À retenir en 20 secondes » au lieu de « La synthèse en 20 secondes »).

✅ Vérifs : **884 fonctions** (inchangé — réécriture, pas d'ajout), 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime`/`ObserverEnMouvement` intacts, correctifs photos de la session 33 préservés. **Rendu Playwright réel** : écran principal complet (les 8 sections attendues), ouverture et retour testés sur les 3 pages bonus, 0 erreur JS.

**Maquette de référence validée** : `maquette-fin-chapitre.html`.

⚠️ **Ce chapitre biomécanique est considéré comme TERMINÉ** (décision Blandine). Prochaine étape : appliquer ce modèle aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), encore en français seul pour la plupart.

⚠️ **Chantier en attente, maquette validée mais NON codée** : le **parcours de suppression de compte** (`maquette-suppression-compte.html`). Décisions déjà prises : lien discret souligné dans « Mon compte » sous la déconnexion · 3 écrans (explication → motif facultatif → confirmation par saisie de l'email) · les commentaires chez les autres sont conservés, **seuls le pseudo et l'avatar sont grisés**, le texte reste normal, **aucune mention « compte supprimé »** · **pas de case d'anonymisation du pseudo** (décision ferme Blandine : dans le milieu équestre, ce serait une porte de sortie pour ceux qui postent puis disparaissent ; les demandes RGPD sincères seront traitées à la main en SQL) · motif de départ facultatif en 6 choix, avec champ texte sur « il manque des choses » / « problème avec un autre cavalier » / « autre », et **proposition de rétention sur « c'est trop cher »** avec sortie aussi visible que l'offre (pas de dark pattern). **Nécessitera une fonction Netlify + une clé secrète Supabase à ajouter une fois dans Netlify.**

---

**Version précédente : session du 28/07/2026 (33) — Photos de profil : dernier chemin local supprimé, échecs plus jamais silencieux, album réparé, photo de cheval envoyée dans le bucket**

**Audit demandé par Blandine : quels chemins gardaient encore la photo en local ?** Réponse exhaustive après inventaire de tous les `setProfil` touchant une photo — **4 chemins sur 5 avaient bien été corrigés** par l'autre conversation (`EcranProfil`, chemin principal de `EcranMonCavalier`, avatars illustrés via `hypeSyncAvatarChoisi`, photo d'écurie). **Un seul perdurait**, plus deux défauts voisins.

**1. Repli local supprimé** — `EcranMonCavalier.choisirPhoto` gardait un repli `FileReader` faisant `setProfil({ avatar: lr.result })` **sans aucun envoi**. Il était de fait **inatteignable** (sa condition `typeof hypeRecadrer !== "function"` est toujours fausse, `hypeRecadrer` étant une fonction globale) mais ressemblait à un chemin valide : supprimé.

**2. Échec du recadreur : plus de perte silencieuse** — `hypeRecadrer` résout `null` si `__recadrageOuvrir` n'est pas assigné (recadreur non prêt). `appliquerNouvelAvatar` commençant par `if (!res) return;`, la photo était **perdue sans le moindre message**. Un message explicite s'affiche maintenant (`HYPE_TXT_RECADREUR`, 6 langues), en distinguant ce cas d'une annulation volontaire, qui reste silencieuse.

**3. Album des anciennes photos réparé** — l'archivage passait `ancien = profil.avatar_url`, or `avatar_url` **n'était jamais restauré depuis la base** (bug de colonne corrigé en (32)) : `ancien` valait donc `null` et **rien n'arrivait jamais dans l'album**. On repart désormais de `avatar_url || avatar`, dans `EcranMonCavalier` comme dans `EcranProfil`. En complément, `archiverPhotoHistorique` **refuse les dataUrl** : archiver une photo restée locale reviendrait à stocker l'image entière en base64 dans une colonne texte — quota gaspillé et album inutilisable depuis un autre appareil.
🔴 **À vérifier côté Supabase** : que la table `photos_historique` existe bien (colonnes `user_id`, `cible`, `cible_id`, `photo_url`). Si elle manque, l'insertion échoue en silence et l'album restera vide malgré ce correctif.

**4. Photo du cheval enfin dans le bucket** — c'était la **seule photo du projet** à ne pas y passer : `syncProfilDistant({ cheval_photo: dataUrl })` écrivait le base64 directement dans la colonne (une image de 2 Mo → ~2,7 Mo de texte dans la ligne de profil, relu à chaque chargement). Elle passe maintenant par `envoyerPhoto`, seule l'URL est stockée, et l'échec d'envoi est signalé (`HYPE_TXT_PHOTO_NON_ENVOYEE`, 6 langues).

✅ Contrôles : 884 fonctions inchangées, 364 → **366 const** (les 2 messages), 14 blocs script validés, aucune erreur JS. Balayage automatique refait : **tous les points d'écriture de photo sont suivis d'un envoi**, le seul restant sans envoi étant la remise à zéro du profil à la déconnexion (`avatar: null`), ce qui est normal. Challenge, mode tracer et lettres agrandies vérifiés intacts.

---

**Version précédente : session du 28/07/2026 (32) — CORRECTIF : la photo de profil ne suivait pas d'un téléphone à l'autre (mauvais nom de colonne)**

🔴 **Bug signalé par Blandine** : son fils, connecté au même compte sur un iPhone et un Android, ne voyait sa photo de profil que sur l'un des deux, malgré plusieurs déconnexions/reconnexions. Et les interfaces différaient : **4 boutons ronds sur l'iPhone, 3 sur l'Android** (le crayon manquait).

**Cause** : au rechargement du profil depuis Supabase, le code appliquait `avatar: d.avatar || p.avatar`. **La colonne `avatar` n'existe pas dans la table `profiles`** — la vraie colonne est **`avatar_url`**, celle que `majProfil` écrit et que tous les autres `select` du fichier lisent. `d.avatar` valait donc toujours `undefined`, on retombait sur la copie locale du `localStorage`, et sur un appareil neuf il n'y avait rien. **Aucune reconnexion ne pouvait corriger ça.** `histoire` (Mur des songes) et `ma_voix` n'étaient pas restaurés du tout dans ce mappage.

**Preuve mesurée**, scénario « téléphone neuf » (localStorage minimal, photo présente en base) :
| | `profil.avatar` | `profil.histoire` |
|---|---|---|
| avant | vide | vide |
| après | la photo | `#teamfeinn` |

**Correctif** — deux endroits, pas un :
- chargement au **démarrage** : `avatar: d.avatar_url || p.avatar`, plus `avatar_url`, `histoire` et `ma_voix` ajoutés au mappage ;
- chargement juste **après la connexion** (`EcranConnexionSpectral`) : mêmes champs ajoutés, sinon la photo n'apparaissait qu'au rechargement suivant.

**L'écart d'interface n'était pas un problème de plateforme** : le crayon est le bouton « recadrer », il ne s'affiche que s'il existe une photo à recadrer (`modifierPhoto` sort si `!src`). Pas de photo restaurée sur l'Android → pas de crayon. Une fois l'avatar restauré, les deux téléphones affichent la même chose. **Rien à corriger côté Android.**

⚠️ **Point à surveiller, non corrigé ici** : plusieurs chemins de changement de photo n'enregistrent **que localement** (`setProfil({avatar: lecteur.result})` sans upload), notamment un repli `FileReader` quand le recadreur n'est pas disponible. Selon l'écran utilisé, la photo peut donc rester locale et ne jamais monter en base. À reprendre : faire passer tous les chemins par `hypeEnregistrerPhoto`.

✅ Contrôles : 884 fonctions et 364 const inchangés, 14 blocs script validés, aucune erreur JS, plus aucune lecture de la colonne inexistante (les 2 occurrences restantes sont dans le commentaire explicatif). Base : la livraison (31), identique au fichier de Blandine.

---

**Version précédente : session du 28/07/2026 (31) — MODE CHALLENGE (4 épreuves) + lettres beaucoup plus grandes partout**

Base : le fichier fourni par Blandine (869 fonctions, 356 const) — identique à la livraison (30), rien à réappliquer.

**1. Mode Challenge intégré** (maquette v2/v3 validée) — le 3ᵉ mode du panneau des reprises passe de `pret: false` à **`pret: true`**. Nouvel écran `EcranChallengeReprise`, route `challenge-reprise`, raccourcis `#challenge` et `#challenge-reprise`. **Solo, hors ligne, aucun duel en direct** (décision de Blandine).

Quatre épreuves, toutes sur les vraies reprises :
- **Les lettres** — carrière vide, « Où se trouve la lettre M ? », on touche l'emplacement. Tolérance `CHAL_TOL_M = 2.5` m, écart affiché en mètres, bonne position révélée. 10 questions.
- **Dans l'ordre** — 5 figures consécutives mélangées, à remettre dans l'ordre. Testé : ordre correct → **100 %, 5/5**, et aucun conseil affiché puisqu'il n'y a rien à corriger.
- **Reconnais la figure** — le tracé s'anime en 2,2 s, 4 libellés dont 3 tirés de la même reprise. Les figures non dessinables (transitions ponctuelles, moins de 4 points ou moins de 60 unités) sont écartées du tirage.
- **De quelle reprise ?** (idée de Blandine, niveau concours) — feuille de reprise numérotée + tracé animé de l'enchaînement, 4 reprises en réponse. Testé : 60 %, tirage dans 6 reprises. ⚠️ **Le tirage puise dans TOUTES les reprises**, pas celle du sélecteur : c'est le principe. Les **enchaînements ambigus sont écartés** — le code vérifie que la même suite de libellés n'existe pas à l'identique ailleurs, sinon la question n'aurait pas de réponse unique. **Les reprises Amateur et Pro entreront automatiquement dans le tirage** dès qu'elles seront dans `REPRISES_FFE`, sans rien recoder.

- **Conseils du coach uniquement après validation**, et seulement sur les figures manquées (`ChalCoach`, bibliothèque des 75 fiches) — seule spec écrite reçue sur ce mode, respectée.
- **Décors conservés dans toutes les épreuves** : `HYPE_DECORS`, `ORDRE_DECORS`, `hypeFondDouble`, `HYPE_PALETTES` et `hypeDecorMemorise` sont **réutilisés**, rien n'est dupliqué. Le choix est mémorisé dans `hype_trace_decor`, partagé avec le tracé animé. Sur « Sable clair » la palette jour s'applique : carrière claire, lettres sombres.
- **Textes en 6 langues** (`CHAL_TXT`), vérifiés au rendu en fr, de et ja.

⚠️ **Bug corrigé pendant l'intégration** : dans l'épreuve des lettres, le `onPointerDown` était posé sur un div parent avec une ref jamais assignée — **le clic ne renvoyait rien**. `ChalScene` accepte désormais un `onPointer` attaché directement au `<svg>`. Repéré au rendu réel : la validation syntaxique passait sans rien voir.

**2. Lettres beaucoup plus grandes, partout** (demande de Blandine) — `fontSize` **24** (au lieu de 18), contour **7** et halo sombre, dans les **quatre** emplacements : `EcranTraceAnime` (22/24/25/27 selon axe et lettre active), l'encart « Vivre la reprise » (rendu initial **et** la boucle `requestAnimationFrame` qui réécrit la taille à chaque image), `EcranEntrainerTracer` et le Challenge.
- Mesuré au rendu : **12 → 23 px réels** sur iPhone 390 px, soit +92 %, et **aucune lettre ne déborde** du cadre (vérifié lettre par lettre en 390×844 et 320×568).
- ⚠️ **La maquette était déjà à 24 px, l'app à 18** : écart repéré en comparant les deux fichiers valeur par valeur. **Toute décision visible doit être appliquée aux deux dans la même livraison** — c'est le piège n° 1 de ce chantier, il a resurgi ici.

✅ Contrôles : 869 → **884 fonctions** (+15 : `EcranChallengeReprise`, les 4 épreuves, `ChalScene`, `ChalPastilles`, `ChalEnTete`, `ChalCoach`, `ChalBoutons`, `ChalResultat`, `chalChemin`, `chalMelange`, `chalReprisesDispo`, `chalNoteCls`) et 356 → **364 const** (les 7 `CHAL_*` + `CHAL_TXT`). **Aucun doublon de nom** dans le code applicatif (vérifié : le piège `CarteCours` de la (26) ne s'est pas reproduit). 14 blocs script validés, rendu Playwright en 390×844 et 320×568, **aucune erreur JS**. Synchronisation Supabase de la (29) et travaux (25) à (30) intacts.

**Mode Challenge : les 4 modes du panneau des reprises sont désormais tous actifs.** Il ne reste, sur ce chantier, que les vraies musiques libres de droits et la traduction de la bibliothèque de conseils (8 fiches sur 75).

---

**Version précédente : session du 28/07/2026 (30) — Lettres lisibles dans TOUS les modes du tracé + vue cavalier réparée**

Base : le fichier fourni par Blandine avec la synchronisation Supabase de la (29). **Rien d'écrasé** : les 6 fonctions et 3 const de la synchro (`hypeSyncProgressionDifferee`, `hypeFusionnerProgression`, `hypeCollecterExtras`, `hypeAppliquerExtras`, `hypeFusionnerExtra`, `hypeAllegerPourSync`, `HYPE_SYNC_CHAMPS`, `HYPE_EXTRAS_CLES`, `HYPE_EXTRAS_PREFIXES`) sont intactes, diff des noms vérifié dans les deux sens.

**1. Lettres de la carrière illisibles (signalé sur le mode « Voir la reprise »)** — cause commune aux trois endroits : `HYPE_PALETTES.nuit.lettre` valait **`#6B7784`**, un gris moyen, et les lettres non actives étaient rendues à **8 px**.
- Palette **nuit** : lettres `#F4F7FA` (blanc cassé de la charte), lettres d'axe `#FFFFFF`.
- Palette **jour** (décor « Sable clair », carrière blanche) : lettres **volontairement laissées sombres** (`#16212B` / `#070D13`) avec un contour clair — le blanc y serait invisible, précision de Blandine.
- Nouveau champ `contourLettre` par palette, appliqué en `paintOrder: "stroke"`, épaisseur 3,4 : indispensable, les décors photo mangeaient les lettres.
- Tailles dans `EcranTraceAnime` : 8 → **11,5** (courante), 9,5 → **13** (axe), 11 → **13,5**, 12,5 → **15** (lettre active).
- Encart « Vivre la reprise » : 13 px `#6B7784` → 14 px `#F4F7FA` + contour.

⚠️ **Piège rencontré, à retenir** : dans `EncartVivreLaReprise`, une boucle `requestAnimationFrame` **réécrit `fill` et `fontSize` à chaque image**. Le style initial était donc écrasé par l'ancien gris dès que le cheval bougeait — le correctif aurait été **invisible en usage réel** alors que le fichier semblait juste. Repéré en comptant les occurrences restantes de `#6B7784` (il en restait 1 sur 4). **Quand on change une couleur ou une taille, toujours vérifier qu'aucune animation ne la réécrit ensuite.**

**2. Vue cavalier (mode Immersion) « complètement déconnante »** — le recentrage appliquait un `translate` jusqu'à **65 % de la hauteur du contenu** pour un `scale` de **1,1** : la carrière quittait le cadre et laissait de larges bords vides. La caméra suivait juste, mais il n'y avait pas assez de matière pour couvrir l'écran.
- Deux constantes nommées : **`IMMERSION_ZOOM = 1.75`** et **`IMMERSION_SUIVI = 0.55`**. Règle : le zoom doit valoir au moins `1 + 2 × amplitude` ; l'amplitude max passe de 65 % à 36 %, soit 1,72 minimum.
- Mesuré en lecture réelle, somme des bords vides : **272–444 px avant → 47–165 px après**. Le résidu est le vide latéral inévitable (carrière verticale, écran portrait).
- Ce sont les deux seuls nombres à toucher si le cadrage ne plaît pas, et ils vont ensemble.

✅ Contrôles : 869 fonctions inchangées, 354 → **356 const** (les 2 constantes d'immersion), 14 blocs script validés, rendu Playwright en 390×844 et 320×568 — **17 lettres, 16 en blanc + 1 en turquoise (la lettre active), 13 px, contour `rgb(6,7,9)`**, aucune erreur JS. Vérification exhaustive des sessions (25) à (28) refaite sur ce fichier : mode « M'entraîner à tracer », voix, `CarteSegmentRiche`, `dvh`, affiche biomécanique, avatar de l'accueil, « Observer en mouvement », `PhotoZoomable` — **tous présents**.

**Mode Challenge : toujours `pret: false`, rien n'est codé.** Principe validé par Blandine : **solo**, pas de duel en direct. Trois épreuves envisagées (placer les lettres sur une carrière vide, remettre les figures dans l'ordre, reconnaître une figure animée), conseils du coach affichés **après** validation seulement. Maquette autonome à produire et à valider avant toute intégration.

---

**Version précédente : session du 28/07/2026 (29) — SYNCHRONISATION COMPLÈTE DE LA PROGRESSION AVEC SUPABASE (XP, cours, étoiles, quêtes, Baby, Memory, stats chevaux)**

🔴 **À FAIRE PAR BLANDINE AVANT TOUT** : exécuter `progression.sql` dans Supabase (SQL Editor → coller → Run). Sans cette table, la synchro ne fait rien — le code est défensif, aucune erreur visible, on reste simplement sur le local. Puis pousser `index.html` + `SUIVI.md`.

**Session 29 — la progression n'est plus perdue en changeant de téléphone**
Problème signalé par Blandine : XP, cours terminés, étoiles de quiz et série n'étaient stockés QUE dans `localStorage` (`augalop_etat_v1`), donc perdus au changement d'appareil.
- **Nouvelle table `progression`** (fichier `progression.sql`) : une ligne par cavalier, colonne `donnees` en JSONB, `maj_le` automatique par trigger, **RLS activée** (chacun ne lit/écrit que la sienne). Script idempotent et non destructif.
- **5 nouvelles fonctions** : `hypeLireProgression`, `hypeEcrireProgression` (upsert), `hypeFusionnerProgression`, `hypeAllegerPourSync`, `hypeSyncProgressionDifferee`.
- **Fusion — on ne perd JAMAIS de progression** : à la connexion et à chaque `SIGNED_IN`, on lit le distant et on fusionne avec le local en gardant toujours le plus avancé : XP et série au maximum, cours terminés en union, meilleur score conservé par quiz, profil local prioritaire mais complété par le distant. La version fusionnée est aussitôt renvoyée pour que les deux côtés concordent.
- **Écriture différée de 2,5 s** après le dernier changement. Le local continue d'être écrit comme avant → **l'appli fonctionne toujours hors ligne**.
- **Les images ne partent jamais dans cette table** : `hypeAllegerPourSync` retire toute clé contenant photo/image/avatar/banniere/dataUrl, toute chaîne `data:image` et toute chaîne > 4000 caractères. Vérifié : `{nom, photo, avatar_url, stats}` → `{nom, stats}`.
- ⚠️ **Volontairement NON synchronisés** : `planAbo` (la table `abonnements_premium` reste la source de vérité) et `chevaux` (déjà en base dans la table `chevaux`).

✅ **Vérifié dans le code : les photos de chevaux sont DÉJÀ sauvegardées en ligne.** `hypeEnregistrerPhoto("cheval", ...)` envoie le fichier dans **Supabase Storage** (bucket `photos`) et écrit l'URL dans `chevaux.photo_url` ; à l'affichage `photo: c.photo_url` la récupère. La clé locale `hype_cheval_photo_<id>` n'est qu'un cache d'affichage. Un cavalier qui change de téléphone **retrouve donc déjà les photos des chevaux enregistrés sur son compte** — rien à coder de ce côté (c'était l'inquiétude de Blandine, elle est levée).

**Progressions annexes également synchronisées (demande Blandine, même session)** — elles vivaient dans leurs propres clés localStorage, elles partent maintenant dans le même coffre-fort, sous `donnees.extras` :
- `hype_quete_*` (quêtes faites) · `hypeBabyPaliers` (paliers Bronze/Argent/Or) · `hypeMemoryPoneyProfil` (niveaux et erreurs du Memory) · `hype_cheval_stats_*` (statistiques saisies sur chaque cheval) · `hype_galops_vus` (ruban « Nouveau ») · `hype_teinte` · `hype_trace_decor` · `augalop_cercleVIP`
- 3 nouvelles fonctions : `hypeCollecterExtras` (balaie localStorage sur une liste blanche + 2 préfixes, écarte tout ce qui pèse > 4000 caractères ou commence par `data:image`), `hypeFusionnerExtra`, `hypeAppliquerExtras`.
- **Fusion par type, jamais de recul** : drapeaux de quête → le « fait » gagne ; paliers Baby → union ; galops vus → union des ids ; Memory → par niveau, le meilleur score (moins d'erreurs) ; stats de chevaux → complétées sans écraser le local ; préférences simples → le local prime.
- Testé au rendu réel : paliers `{bronze}` + `{argent}` → les deux ; Memory 3 erreurs vs 0 → 0 ; stats `{saut:110}` + `{saut:90,dressage:5}` → `{saut:110, dressage:5}` ; photo de cheval bien exclue de la collecte.

⚠️ **INVENTAIRE COMPLET — ce qui reste volontairement en local seul** (26 clés passées en revue le 28/07) :
- **Images** (déjà dans Supabase Storage, le local n'est qu'un cache d'affichage) : `hype_cheval_photo_*`, `hype_cheval_photo_orig_*`, `hype_avatar_original`, `hype_ecurie_photo*`, `hype_club_banniere`
- **Géré côté serveur, source de vérité ailleurs** : `augalop_vip` et `augalop_demandePro` (table `abonnements_premium`), `hype_heybaby_quota` (table `hey_baby_usage`)
- **État d'interface propre à l'appareil, aucun intérêt à synchroniser** : `hype_coach_*` (coachmarks vus — normal qu'ils se rejouent sur un nouveau téléphone), `hype_install_vu`, `hype_maj_vue`, `hype_rappeler`, `hype_encart_photo_ferme`, `hype_notifs_comm_vu`, `hype_ajouts_ecurie_vus`, `hype_uid`
- **Le miroir local lui-même** : `augalop_etat_v1`
→ **Plus aucune progression réelle du cavalier n'est stockée uniquement en local.**

✅ **SQL exécuté et synchro VÉRIFIÉE EN PRODUCTION le 28/07 à 19h49** : la table `progression` contient bien une ligne (user_id `bc7c52ee-…941e`, `maj_le` 2026-07-28 17:48 UTC). Le mécanisme fonctionne. Requête de contrôle : `select user_id, maj_le, jsonb_pretty(donnees) from public.progression;`

🟠 **À REPRENDRE PLUS TARD — QUOTA SUPABASE (reporté à la demande de Blandine le 28/07, à ne pas oublier)**
Message exact du bandeau Supabase : « **Organization exceeded its quota in the previous billing cycle. Projects will be restricted from 14 Aug, 2026 if your organization remains over quota.** » Donc **restriction du projet le 14 août 2026** si rien ne change — échéance ferme.
- **Première chose à faire** : ouvrir le lien « Review usage » du bandeau pour identifier **quelle jauge** dépasse (base de données / stockage / bande passante / requêtes) et **de combien**. Sans ce chiffre, impossible de dire si un abonnement payant est nécessaire.
- **Ce n'est pas la synchro de progression** : une ligne de quelques ko par cavalier, écrite avec 2,5 s de délai. Négligeable.
- **Pistes d'allègement à explorer quand on s'y remettra** : les photos et les albums sont les gros consommateurs. Notamment (a) l'historique des photos archivées (`archiverPhotoHistorique` garde les anciennes versions), (b) les images stockées en pleine résolution alors qu'une version réduite suffirait à l'affichage, (c) les ~550 images encore en base64 dans les fichiers `hype-images-1.js` à `121.js` (chantier de migration vers `images/` déjà identifié, voir plus bas).
- **Décision à prendre avant le 14 août** : alléger, passer à un plan payant, ou les deux.

✅ Vérifs : 863 → **869 fonctions**, 14 blocs script `node --check` OK, travail des sessions précédentes intact. **Rendu Playwright réel** : appli montée ; fusion testée (xp 120 local vs 300 distant → 300 ; séries 3 et 1 → 3 ; cours réunis sans doublon ; quiz 8 vs 5 → 8 ; prénom local gardé + ville du distant conservée) ; allègement des photos vérifié. Les 2 erreurs JS vues en test (`window.supabase`, `TEINTES_HYPE`) **préexistent dans l'index reçu** — dues à l'absence d'internet dans l'environnement de test, pas à cette session.

---

**Version précédente : session du 28/07/2026 (28) — SECTION « OBSERVER EN MOUVEMENT » (3 ressources IFCE) + photos du cours agrandissables. Chapitre biomécanique terminé.**

**Nouvelle section, dernier bloc du cours `g4-biomeca`, juste avant le quiz (= défi final)** — nouveau type de bloc `"observer-mouvement"`, composant `ObserverEnMouvement`, dictionnaires `OBS_RESSOURCES` / `OBS_TXT` / `OBS_OPTIONS`, tout en 6 langues (fr/en/es/it/de/ja), vérifié au rendu dans les 6.

- **3 cartes ressource** esprit Hype Spectral : dégradé bleu nuit, halo turquoise, pastille de label, pictogramme ▶ en médaillon, source « IFCE · HYPE », texte, liste « À observer », bouton « Ouvrir la ressource ».
- **Les vidéos ne sont ni téléchargées, ni incorporées, ni découpées** : `window.open(url, "_blank", "noopener,noreferrer")`, les contenus restent hébergés par l'IFCE. Un rappel « ↩ S'ouvre dans le navigateur. Pour revenir, touche l'onglet Hype. » figure sous chaque bouton (on ne peut pas ajouter d'icône de retour dans Safari lui-même).
- **Consultation = activité bonus.** Elle est mémorisée dans `localStorage` (`hype_obs_ifce_vues`) et affiche « ✓ Déjà consultée », mais **ne conditionne jamais la fin du chapitre**.
- **Séquence « Les yeux du cavalier »** : plus besoin d'attendre une vidéo personnelle du couple. Le mini-retour interactif suit directement la 2ᵉ ressource (ordre vérifié au rendu : allures → retour → équilibre). 6 cases à cocher **non notées**, mémorisées (`hype_obs_ifce_retour`), et le message bienveillant s'affiche bien au choix « Je ne sais pas encore bien le voir ».
- **Bouton « Continuer vers le défi final »** : `BlocCours` reçoit désormais `onSuivant` (la navigation réelle du cours), vérifié — un clic appelle la navigation une fois exactement.
- Les 3 URL IFCE sont présentes une fois chacune, à l'identique du brief.

**Photos du cours agrandissables** — `PhotoZoomable` existait déjà dans l'app (overlay plein écran, fermeture par croix ou Échap, blocage du scroll) : aucun nouveau composant écrit. **5 images basculées dessus** : les 3 du carrousel biomécanique (étape courante, comparateur avant/après, « Explorer le cheval »), celle de « Le cheval porte aussi son cavalier », et le **carrousel de cartes générique de `BlocCours`** (donc valable pour tous les cours, pas seulement celui-ci).
⚠️ **3 images volontairement laissées non zoomables** : celles des jeux (puzzle à 9 pièces, cartes du memory). Les rendre agrandissables casserait le jeu.

✅ Contrôles : 862 → **863 fonctions** (+`ObserverEnMouvement`) et 346 → **351 const** (+`OBS_RESSOURCES`, `OBS_TXT`, `OBS_OPTIONS`, `OBS_CLE_VUES`, `OBS_CLE_RETOUR`), 14 blocs script validés, **aucune erreur JS au rendu**. Travaux précédents intacts : mode « M'entraîner à tracer » (25), `CarteSegmentRiche` (26), correctifs de la (27).

🔴 **Toujours en attente, indépendant de cette livraison** : vérifier que `images/k604.jpeg`, `k605`, `k606` et `k608` sont bien dans le dépôt. Le carrousel biomécanique fonctionne (testé), mais ces 4 images sont les seules du chapitre non confirmées à l'affichage.

📌 **Sujet ouvert confié à une autre page : la progression est purement locale.** Vérifié dans le code : `localStorage` clé `augalop_etat_v1` contient `profil`, `xp`, `serie`, `coursTermines`, `quizResultats`, `planAbo`, `langue`, `chevaux`. `majProfil` n'envoie à Supabase que le profil public (pseudo, avatar_url, ecurie, ecurie2, ville, teinte, histoire, voix, ecurie_photo, est_mineur) — **aucun champ de progression**. Changement de téléphone, purge Safari ou désinstallation de la PWA = progression perdue. Une table Supabase dédiée + synchronisation bidirectionnelle (avec stratégie de conflit entre appareils) est à concevoir ; le SQL est préparé sur une autre page, **qui prendra la main sur `index.html` après cette livraison**.

---

**Version précédente : session du 28/07/2026 (27) — 3 correctifs : hauteur des couvertures, affiche du chapitre biomécanique, avatar sur l'accueil**

**1. Couvertures de cours coupées en bas (iOS)** — les 4 composants de couverture (`CouvertureCours`, `CouvertureLecon`, `CouvImage`, `CouvAffiche`) utilisaient `calc(100vh - 84px)` : **8 occurrences passées en `calc(100dvh - 84px)`**. Sur iOS `100vh` est plus haut que la zone réellement affichée, donc le bas de l'écran (le bouton « Commencer ») se retrouvait sous la barre de navigation. Même piège que sur l'écran du tracé animé, déjà documenté.

**2. Affiche du chapitre biomécanique** (données du cours `g4-biomeca`, pas le composant : le cours impose ses propres valeurs) — `pos` « center 10% » → **« center 24% »** pour descendre l'image et laisser respirer le haut, `basTexte` 52 → **74**, `basBouton` 54 → **92** pour remonter le titre, la citation et le bouton. Mesuré au rendu réel : le bouton passe de **28 à 92 px du bas**, le bloc de texte remonte de **122 px**.

**3. Avatar du cavalier absent de l'icône de l'accueil** — le bouton « Mon profil » de `EcranUnivers` créait un `div` vide de classe `.pf-av`, et cette classe porte une **image fixe en dur dans le CSS** (`background-image:url(images/inline-06.jpg)`). L'avatar n'était donc jamais affiché à cet endroit, **pour aucun compte** — ce n'était pas propre au compte de son fils. La photo est maintenant injectée en style inline (`profil.avatar || profil.avatar_url`, mêmes champs que les autres écrans), avec repli sur l'image du CSS si le profil n'a pas de photo. ⚠️ **Non validé visuellement** : le dashboard n'est pas atteignable dans l'environnement de test (l'app démarre sur l'écran d'entrée qui attend une saisie). À vérifier en conditions réelles.

**Carrousel biomécanique — le code n'est pas en cause, ce sont des images manquantes.** `BiomecaInteractif` monté isolément fonctionne : il affiche « ÉTAPE 1 · LA POUSSÉE » et passe seul à « ÉTAPE 2 · LA TRANSMISSION » après 5,5 s, flèches comprises, sans erreur JS, et `HYPE_IMGS` contient bien les 6 chemins (`images/k604.jpeg` … `k609.jpeg`). Or `CavalierEquilibre` n'utilise que **k607** et l'affiche **k609** — les deux qui s'affichent chez Blandine. Le carrousel a besoin en plus de **k604, k605, k606 et k608**. 🔴 **À vérifier : ouvrir `majestic-melba-997a68.netlify.app/images/k604.jpeg` dans Safari.** Si 404, ces 4 fichiers ne sont pas dans le dépôt et c'est toute l'explication.

✅ Contrôles : 862 fonctions et 346 const inchangés, 14 blocs script validés, aucune erreur JS au rendu. Mode « M'entraîner à tracer » de la (25) et correctif `CarteSegmentRiche` de la (26) intacts.

---

**Version précédente : session du 28/07/2026 (26) — CORRECTIF CRITIQUE : le Galop 4 ne s'ouvrait plus (`CarteCours` déclarée deux fois)**

🔴 **Bug signalé par Blandine** : impossible d'ouvrir le chapitre du Galop 4, l'appli tombait sur l'écran « Un caillou dans le sabot ».

**Cause** : la fonction **`CarteCours` était déclarée deux fois dans le même bloc script (n° 20)** — la carte de chapitre de la bibliothèque (`{ cours, termine, score, couleur, niveau, onClick, tr, prochainement, nouveau }`, ligne ~32812) et la carte de segment riche du chapitre biomécanique (`{ seg }`, ligne ~33591, ajoutée par la page « cours premium »). En JavaScript la **seconde déclaration écrase la première** : tous les appels de la liste des chapitres recevaient la version `{ seg }`, qui plantait sur `seg.details` avec `seg` indéfini.

**Preuve mesurée avant/après**, en lisant la fonction réellement active dans la page :
| | `CarteCours` active | appel avec `{ cours }` |
|---|---|---|
| avant | `function CarteCours({ seg })` | plante |
| après | `function CarteCours({ cours, termine, score… })` | passe |

**Correctif** : la carte de segment riche est renommée **`CarteSegmentRiche`** (déclaration + son unique appel dans `rendreSegmentRiche`). Aucune autre ligne touchée. La carte de chapitre retrouve son nom et son comportement.

⚠️ **Leçon à retenir pour toutes les pages** : avant de nommer un nouveau composant, vérifier que le nom est libre dans l'index — `grep -cE '^function MonNom'` doit renvoyer 0. Un doublon de `function` ne déclenche **aucune erreur de syntaxe**, `node --check` passe, et le plantage n'apparaît qu'à l'exécution de l'écran concerné. Les seuls autres doublons du fichier (`enqueueUpdate`, `flushSyncWork`, `getIteratorFn`, `formatProdErrorMessage`, `requestFormReset`) appartiennent aux bundles React inlinés et ne sont pas en cause.

✅ Contrôles : 862 fonctions et 346 const inchangés, 14 blocs script validés, plus aucun doublon dans le code applicatif, rendu réel sans erreur JS, et le mode « M'entraîner à tracer » de la session (25) toujours intact (vérifié marqueur par marqueur).

---

**Version précédente : session du 28/07/2026 (25) — MODE « M'ENTRAÎNER À TRACER » + voix des reprises raccourcie**

⚠️ **Collision de numérotation à connaître.** Ce travail a été livré sous le numéro (22) par la page « Reprise de dressage 2 », pendant qu'une autre page utilisait aussi 22, 23 et 24 pour le chapitre biomécanique. Le SUIVI qui a circulé ensuite ne contenait plus la section du mode « tracer », alors que **le code était bien dans l'index**. Renuméroté (25) ici pour lever l'ambiguïté. Même incident qu'en session 16 : **toujours vérifier le fichier réel en plus du SUIVI avant de conclure qu'un travail n'est pas fait.**

✅ **Vérification faite le 28/07 sur l'index fourni par Blandine (862 fonctions, 346 const)** : le mode « tracer » et le correctif de voix sont **tous présents**, comptage exhaustif livré/reçu identique sur les 6 fonctions, les 8 const, la route, les 2 raccourcis de hash, le passage en `pret: true`, l'aiguillage du bouton et les 3 corrections de voix. Bloc de l'écran présent à l'identique. 14 blocs script valides. Rendu Playwright réel : écran monté, 17 lettres, aucun scroll, tracé tactile fonctionnel, note 93 obtenue, aucune erreur JS. Le travail de l'autre page (`CarteCours`, `CavalierEquilibre`, `ComplementsBiomeca`, `SectionCollapse`, `CARTE_LABELS`, `CAVALIER_I18N`, `COMPL_I18N`) est intact.

**Ce que contient le mode « M'entraîner à tracer »** (validé sur maquette v11 par Blandine)

- Le 2ᵉ mode du panneau des reprises (`VLR_MODES`, id `tracer`) passe de `pret: false` à **`pret: true`**. Ses traductions existaient déjà dans les 6 langues.
- Nouvel écran **`EcranEntrainerTracer`** (route `entrainer-tracer`, raccourcis `#tracer` et `#entrainer-tracer`), placé juste avant `EcranTraceAnime`.
- **La reprise se trace d'un bout à l'autre, sans validation intermédiaire** (la première version faisait figure par figure : refusée par Blandine). Autant de coups de doigt qu'on veut, le trait se raccorde.
- **Le trait s'efface derrière la main** : net 5 s (`ENTR_PLEIN_MS`), fondu en 2 s (`ENTR_FONDU_MS`), par morceaux de 260 ms (`ENTR_TRANCHE_MS`). Mesuré sur une reprise complète : 92 morceaux créés, jamais plus de 24 affichés, 0 après 7 s. **Les points restent en mémoire** : ce qui disparaît est l'affichage, pas le tracé.
- **Un seul bouton « Valider la reprise »** : note sur 100, écart moyen en mètres, taux de couverture, figures à retravailler (numéros FFE), indices demandés, tracé officiel révélé avec les manques piqués en rouge.
- **Notation par alignement temporel** (`entrAligner`, DTW à bande 25 %). ⚠️ La première version cherchait le point le plus proche sans regarder l'ordre : elle donnait **84/100 à une reprise où deux figures entières étaient sautées**, parce que la piste est repassée ailleurs. Calibration après correction : exact 98 · 1 m à côté 87 · 2 m à côté 39 · 2 figures oubliées 62 · 5 figures oubliées 36 · moitié 18 · à l'envers 0.
- **Bouton « Un indice »** (bord droit de la carrière) : montre **seulement la figure en cours**, en jaune avec une flèche de sens, 5 s, avec son numéro et son libellé. ⚠️ La version qui révélait toute la reprise (6 059 unités de trait) était illisible — refusée par Blandine. La position du cavalier est déduite de la **longueur déjà tracée** comparée aux longueurs cumulées du tracé officiel, pas du point le plus proche (la piste est repassée plusieurs fois, un point seul est ambigu).
- **Lisibilité** : carrière agrandie (160×481 px sur iPhone, +30 % par rapport au premier jet), lettres en `COLORS.blanc` 13 px avec contour sombre de 4 — **contraste mesuré 18,7:1** lettre par lettre, y compris les 5 lettres de la ligne médiane que les tracés recouvrent.
- **Tactile iOS** : `preventDefault()` sur `touchmove` en `{ passive: false }` — `touch-action` seul ne suffit pas, Safari prenait le glissement vertical pour un scroll et le trait ne descendait pas. Le mouvement est écouté sur `window`, le doigt sortant du cadre en fin de figure.
- **Textes en 6 langues** (`ENTR_TXT`, fr/en/es/it/de/ja), vérifiés au rendu réel dans les 6 langues.

**Voix des reprises — « entre R et M » devient « R M »** (`texteFigurePourVoix`)
- Deux endroits corrigés, pas un : les blocs de lettres collées (`HS` → « H S ») **et** les « entre X et Y » écrits en clair dans les fiches FFE, qui passaient tels quels.
- Mesuré sur la reprise du Galop 4 : **185 → 163 mots, 12 % de moins**. La voix n'avait pas le temps de finir et chevauchait la figure suivante.
- ⚠️ Deux réglages restent en réserve si le chevauchement persiste : `u.rate = 0.92` dans `traceDireFigure` (remontable à 1), et « un peu avant M » → « avant M ». **Pas touché au vocabulaire FFE sans accord de Blandine.**

**Reste à faire sur le chantier des reprises** : le mode **Challenge** (toujours `pret: false`, rien n'existe) ; les **vraies musiques** libres de droits ; la **traduction de la bibliothèque de conseils** (8 fiches sur 75) ; graduer les conseils par niveau à l'intérieur d'une fiche ; séparer « allure nommée » et « vitesse d'animation » dans le moteur du tracé.

---

**Version précédente : session du 28/07/2026 (24) — CHAPITRE BIOMÉCANIQUE COMPLET (toutes les sections du brief « cours premium »)**

🔴 **Rien à pousser côté images.** Seuls `index.html` + `SUIVI.md`. (`hype-dressage-conseils.js` v1.4 toujours requis, session 20.)

**Session 24 — livraisons 2 et 3 : le chapitre `g4-biomeca` est maintenant complet** (source : `Hype_Galop4_Biomecanique_Enrichie.txt`) :
- **Nouveau composant `ComplementsBiomeca`** + type de bloc `"complements-biomeca"`, ajouté en dernier bloc du cours (avant le quiz), et petit composant utilitaire `SectionCollapse` (accordéon réutilisable).
- **Défi de la semaine** : 5 cases à cocher tapables (dont la 5ᵉ sur le cavalier lui-même) + bouton « 🏅 Valider mon défi » qui passe en vert « Défi validé, bravo ! » + phrase de fin. Un seul défi, comme demandé.
- **Demande à Hey Baby** : les 10 questions du document en pastilles + bouton « Ouvrir Hey Baby » (`setEcran("assistant")`, appel défensif).
- **Le savais-tu** (encart doré, pas de clavicule / tronc suspendu par des muscles).
- **La science explique** + bouton « 🎓 M'expliquer plus en détail » ouvrant le panneau « POUR LES PLUS CURIEUX » (centre de masse, forces au sol, mouvements du dos — annoncé comme non nécessaire au Galop 4).
- **Synthèse en 20 secondes** : 8 points + les 4 phrases à retenir (🐎 le moteur / 🌉 le pont / ⚖️ le balancier / 🏇 le premier équilibre).
- **Pour aller plus loin** : 4 cartes (IFCE ×2, FFE TV, Hey Baby) — les 3 ressources externes sont en **Prochainement**, seule « Poser une question personnalisée » est active.
- **Glossaire** : 8 termes en accordéon.
- ⚠️ **Encarts « Vidéo » et « Les yeux du cavalier » volontairement en PROCHAINEMENT** (décision Blandine 28/07 : ChatGPT prépare des versions plus élaborées de ces deux parties). L'encart « Les yeux du cavalier » contient déjà l'astuce utile en attendant : *décrire ce qu'on voit avant de juger*. Quand la matière arrivera : vidéo IFCE « L'équilibre d'un point de vue biomécanique » + FFE TV Galop 4 (règles du document : pas de lecture auto, image d'aperçu, durée affichée, source officielle, 2 vidéos max) ; activité en 3 étapes pour les yeux du cavalier (regard libre → repères → explication descriptive), qui **nécessite une photo/vidéo d'un couple cheval-cavalier**.
- **6 langues** (fr/en/es/it/ja/de) dans `COMPL_I18N`.

**Structure finale du chapitre `g4-biomeca`** : couv-affiche (k609) → 3 cartes → 3 cartes → carrousel biomécanique → module cavalier 60/40 → sections complémentaires → QCM 10 questions.

✅ Vérifs : 860 → **862 fonctions**, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts. **Rendu Playwright réel** : toutes les sections présentes, défi cochable et validable, 6 langues complètes (10 questions Hey Baby, 8 termes de glossaire par langue), 0 erreur JS.

⚠️ **PROCHAINES ÉTAPES**
- Recevoir de Blandine la matière vidéo + la photo/vidéo pour « Les yeux du cavalier », puis remplacer les deux encarts Prochainement.
- **Appliquer le même moule aux 8 autres chapitres du Galop 4** (g4-c1, g4-galop-qualite, g4-c2 à g4-c7) : la plupart sont encore en français seul et au format texte-riche classique. Les briques sont maintenant toutes disponibles et réutilisables (`CarteCours`, `SectionCollapse`, `complements-biomeca` comme modèle).
- Ce chapitre sert de **modèle de référence** pour tous les futurs cours des Galops 4 à 7.

🔴 **Rien à pousser côté images.** Seuls `index.html` + `SUIVI.md`. (`hype-dressage-conseils.js` v1.4 toujours requis, session 20.)

**Session 23 — livraison 1 de la refonte « cours premium »** (source : document `Hype_Galop4_Biomecanique_Enrichie.txt` de Blandine, 1016 lignes) :
- **Nouveau composant `CarteCours`** + nouveau segment `{ k: "carte", emoji, titre, texte, details: [...] }` utilisable dans n'importe quel bloc `texte-riche`. Affiche une idée par carte et un bouton **« 🎓 M'expliquer plus en détail »** qui déplie un panneau **« POUR LES PLUS CURIEUX »** (accordéon, fermé par défaut, contenu avancé toujours facultatif). Libellés du bouton et du panneau traduits dans `CARTE_LABELS` (6 langues).
- **Les 2 blocs de texte de `g4-biomeca` remplacés par 6 cartes** (6 langues chacune) : Comprendre avant de corriger · Les postérieurs, le moteur · Le dos, la transmission · L'encolure, un balancier mobile · L'avant-main, recevoir et diriger · Une chaîne qui fonctionne ensemble. Les panneaux « curieux » contiennent les sections « Comment l'observer / le ressentir », « Poussée ≠ engagement », « Pourquoi un cheval contracte son dos » (avec le rappel de ne jamais conclure qu'il « ne veut pas travailler » et de faire vérifier le confort), les erreurs fréquentes et les signes du cheval sur les épaules.
- **QCM remplacé** : les 10 anciennes questions (déduites par Claude) laissent place à 10 questions construites avec Blandine à partir de sa version — postérieurs/moteur, vitesse ≠ engagement, les 3 articulations, le dos-pont, l'encolure-balancier, **le 60/40 est une simplification pédagogique**, cavalier penché en avant, se jeter en arrière, l'intérêt des transitions, la chaîne de mouvement. Toutes avec options et explications en 6 langues.
- ⚠️ **Décision de fond confirmée (Blandine, 28/07)** : on **n'affiche pas** les valeurs intermédiaires 63/37 et 65/35 du document source, même avec un avertissement. Seul le 60/40 au repos est montré (valeur de référence), le reste en tendance. Une question du QCM porte précisément sur le caractère pédagogique et non scientifique de ce repère.

✅ Vérifs : 860 fonctions, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts, modules `BiomecaInteractif` et `CavalierEquilibre` préservés. **Rendu Playwright réel** : cours converti dans les 6 langues (5 blocs, 3 cartes par bloc, 10 questions, options bien traduites), carte montée, panneau « Pour les plus curieux » qui s'ouvre, 0 erreur JS.

⚠️ **RESTE À FAIRE sur ce chapitre** (livraisons 2 et 3, source = même document) :
- **Hero immersif** + **encart vidéo** (⚠️ matière à fournir par Blandine ; ressources visées : IFCE « L'équilibre d'un point de vue biomécanique », IFCE « Fonctionnement du dos », FFE TV films Galop 4. Règles du document : pas de lecture auto, image d'aperçu, durée affichée, source officielle, 2 vidéos principales maximum)
- **« Les yeux du cavalier »** : activité interactive en 3 étapes (regarder sans aide + cases à cocher → afficher les repères : ligne oreille/épaule/hanche/talon, zone avant-main, ligne du dos, articulations, flèche du centre de masse → explication descriptive, non jugeante). ⚠️ Nécessite une photo ou une courte vidéo d'un couple cheval-cavalier.
- **Défi unique** (5 questions dont une sur le cavalier lui-même) + bouton « 🏅 Valider mon défi »
- **Section Hey Baby** : 10 questions préremplies + bouton « 🎓 M'expliquer plus en détail » (réponse Galop 4 courte, puis réponse approfondie facultative ; si photo envoyée, décrire seulement le visible et rappeler qu'une photo unique ne permet pas d'évaluer la locomotion)
- **Le savais-tu** (pas de clavicule, tronc suspendu par des muscles), **La science explique** (+ panneau curieux), **Pour aller plus loin** (4 cartes IFCE/FFE TV/Hey Baby), **Synthèse en 20 secondes** (+ les 4 phrases à retenir), **Glossaire** (8 termes)
- **Puis** : appliquer le même moule aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), encore en français seul pour la plupart

🔴 **Rien de nouveau à pousser côté images** : le module réutilise `k607` (déjà en ligne). Seuls `index.html` + `SUIVI.md` sont à mettre à jour. `hype-dressage-conseils.js` v1.4 reste requis (session 20).

**Session 22 — nouveau chapitre du brief « cours premium » de Blandine** :
- Nouveau composant `CavalierEquilibre` + nouveau type de bloc `"interactif-cavalier"`, ajouté en **dernier bloc de `g4-biomeca`** (après le module biomécanique, avant le quiz).
- **Schéma de répartition du poids** : image k607 avec deux zones colorées (turquoise = arrière-main, corail = avant-main), gros chiffres, jauge horizontale animée.
- **3 positions de cavalier** (En équilibre / Légèrement penché / Très penché) : la jauge glisse, les zones s'intensifient, un constat s'affiche. ⚠️ **Décision de fond (Blandine)** : les chiffres précis ne sont affichés QU'au repos (60/40, valeur de référence classique) ; pour les positions penchées, seules des flèches de tendance apparaissent — on n'invente pas de valeurs biomécaniques non sourcées. Blandine a soulevé à juste titre qu'au-delà du poids statique, l'inertie et le mouvement amplifient tout.
- **Encart « Quand le déséquilibre s'installe »** en deux colonnes de couleur : *Chez ton cheval* (accélère, du mal à tourner, du mal à s'arrêter, risque de trébucher, s'enterre dans ses barres) / *Ce que tu ressens en selle* (lourd dans la main, transitions difficiles, tu corriges sans arrêt), + une phrase sur l'amplification par l'inertie.
- **Bloc résumé « LE RÉFLEXE À RETENIR »** : cadre lumineux animé (dégradé turquoise tournant, 6 s) + reflet miroir balayant la surface (5,5 s), `prefers-reduced-motion` respecté. Classes CSS `.cavResume*` ajoutées dans le `<style>`.
- **Conclusion révélée à la première interaction** : « Le premier équilibre que ton cheval ressent… est le tien. »
- **6 langues** (fr/en/es/it/ja/de) dans `CAVALIER_I18N`.

⚠️ **RÈGLE DE LISIBILITÉ actée le 28/07** (après retours répétés de Blandine) : contenu à **13,5 px minimum en blanc franc**, intitulés en gras en gris clair, interlignes 1,65. Les tailles ≤12,5 px sont réservées aux étiquettes structurantes (ÉTAPE 1, CHEZ TON CHEVAL…). Ne plus livrer de gris sur gris ni de corps de texte sous 13,5 px. ⚠️ **Piège technique repéré** : un `<li>` en `display:flex` transforme chaque `<b>` en colonne séparée (texte écrasé sur 3 lignes) — utiliser `position:relative` + puce en `position:absolute`.

✅ Vérifs : 858 → **859 fonctions**, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime`/`BiomecaInteractif` intacts. **Rendu Playwright réel** : montage OK, les 3 positions réagissent, conclusion révélée, 0 erreur JS.

⚠️ **BRIEF EN COURS — refonte de tout le Galop 4 en « cours premium »** (documents `Hype_Prompt_Claude_1/2/3` + `Bible_des_cours_Hype_v1` fournis par Blandine le 28/07). Gabarit cible de chaque chapitre : Hero → Vidéo d'intro → Cours en petites cartes → Explorer le cheval → Animation/carrousel → Les yeux du cavalier → Défi unique → Hey Baby → Le savais-tu ? → La science explique → Pour aller plus loin → QCM. Règles : une idée par carte, peu de texte, bouton « 🎓 M'expliquer plus en détail » ouvrant un panneau « Pour les plus curieux » (contenu avancé toujours facultatif, jamais bloquant pour un Galop 4).
- **Fait** : Explorer le cheval ✓, carrousel biomécanique ✓, QCM ✓, chapitre « Le cheval porte aussi son cavalier » ✓
- **Maquette validée mais PAS encore codée** : format « cours en petites cartes » avec bouton 🎓 + panneau « Pour les plus curieux » (fichier `maquette-cours-cartes.html`)
- **Reste à définir/produire** : Hero immersif, emplacement vidéo (matière à fournir par Blandine), « Les yeux du cavalier » (photo + révélation progressive), Défi unique, section Hey Baby avec bouton 🎓, Le savais-tu, La science explique, Pour aller plus loin (IFCE/FFE/Cadre Noir)
- **Puis** : appliquer le même moule aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), qui sont encore en français seul pour la plupart

🔴 **À POUSSER ENSEMBLE SUR GITHUB** : `index.html` (livré directement sous ce nom) + **6 nouvelles images dans le dossier `images/`** : `k604.jpeg` à `k609.jpeg` (images du module, fournies par Blandine sans texte, découpées par Claude). Sans elles, le module s'affiche avec des images cassées. `hype-dressage-conseils.js` v1.4 reste requis (voir session 20).

**RÈGLE EXTENSIONS D'IMAGES (décidée le 28/07 après tests)** : l'iPhone de Blandine enregistre systématiquement les images en `.jpeg` — impossible d'obtenir du `.jpg` sans Working Copy payant. Convention actée : **jusqu'à k546 → `.jpg` (historique) ; à partir de k555 → `.jpeg`**. Ne jamais renommer, chaque référence de l'index correspond à l'extension réelle de son fichier. Les deux cohabitent sans problème.

**Session 21b — retouches module (après premier test en ligne par Blandine)** :
- **Auto-défilement réparé** : il était tué dès que le doigt touchait le module en scrollant la page (onPointerDown global). Désormais seuls les vrais gestes l'arrêtent (pastille, flèche, curseur, point tactile). Vérifié au rendu réel : étapes 1→2→3 enchaînées toutes les 5,5 s malgré un scroll simulé.
- **Les 5 pastilles d'étapes déplacées SOUS la carte** (elles étaient au-dessus, peu visibles, on ne comprenait pas qu'il y avait d'autres écrans).
- **Couverture du chapitre g4-biomeca : k609** (le grand cheval au trajet lumineux complet) remplace le placeholder GALOPS_HERO — et sert automatiquement de fond au QCM (l'écran quiz reprend l'image de couverture du chapitre). Aucun nouveau fichier à pousser, k609 est déjà en ligne.

**Session 21 — Module interactif biomécanique (validé sur maquette v6 par Blandine)** :
- Nouveau composant `BiomecaInteractif` + nouveau type de bloc `"interactif-biomeca"` (dispatché dans `BlocCours`), ajouté en **dernier bloc du cours `g4-biomeca`** (juste avant le quiz).
- **Carrousel 5 étapes** : La poussée (k604) → La transmission (k605) → L'équilibre (k606) → La synthèse (k607 + phrase « Le moteur pousse. Le dos transmet. L'encolure équilibre. ») → Comparer (k608, curseur avant/après fonctionnel qui assombrit un côté).
- **Défilement automatique** : les étapes avancent seules toutes les 5,5 s, et s'arrêtent définitivement au premier geste de l'utilisateur (demande de Blandine : pour ceux qui n'ont pas le réflexe d'appuyer).
- **Section « Explorer le cheval »** : grande image récapitulative (k609) avec 3 points tactiles (postérieur/dos/encolure) qui révèlent une phrase courte, + encart « À retenir ».
- **Tout le texte est en 6 langues** (fr/en/es/it/ja/de) dans `BIOMECA_I18N`, suit la langue de l'app — aucune image ne contient de texte (choix de Blandine : images fournies nues, textes en HTML pour la traduction).
- Vérifs : 851 → **852 fonctions** (+`BiomecaInteractif`), 14 blocs script validés `node --check`, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts, **rendu Playwright réel** : montage du composant OK, navigation d'étapes OK, aucune erreur JS liée au module. Le composant est défensif (`useApp() || {}`, repli langue fr).
- ⚠️ Les affiches statiques multilingues « Biomécanique simplifiée » (grille 6 langues fournie par Blandine, + version IT corrigée grassella/garretto) ne sont PAS intégrées dans ce lot — décision en attente : les utiliser comme affiche de fin de cours ou dans la couverture. Les fichiers découpés existent côté conversation.

---

**Version précédente : session du 28/07/2026 (20) — FUSION + REFONTE de l'écran du tracé animé (deux onglets, carte unique, intro de générique)**

⚠️ **Fusion faite avant tout codage.** Le fichier reçu de Blandine contenait le travail d'une autre page (nouveau cours `g4-biomeca`, `convertirCoursI18nVersInterne` sur le Galop 4) mais **pas mes 4 correctifs de la session 19**. Inventaire marqueur par marqueur : tout jusqu'à la (18) était présent, la (19) absente. Sa version a donc servi de base et la (19) a été **réappliquée**, pas écrasée : garde de la nappe, angle de la vue cavalier, arrêt réel de la voix, renommage « Vue cavalier ». Le travail de l'autre page est intact (`g4-biomeca` toujours là).

**REFONTE (brief complet de Blandine, points 1 à 20)** — `EcranTraceAnime` réécrit :
1. **Deux onglets : 🎬 Immersion et 🎓 Coaching.** Le premier pour vivre la reprise, le second pour l'étudier. Noms choisis par Blandine ; le bouton caméra a donc été renommé **« Vue cavalier »** pour éviter deux « Immersion » différents dans le même écran.
2. **UNE SEULE CARTE** porte tout ce qui sert pendant la lecture : décor, bandeau de verre « Figure actuelle / Ensuite », carrière, bulle de micro-conseil, barre de commandes. Avant : onze blocs empilés.
3. **Intro de générique de 2 s** à l'ouverture d'Immersion et à chaque changement de reprise : écran noir, titre en Cinzel qui monte en fondu, niveau FFE en turquoise, **souffle de vent synthétisé** (bruit blanc filtré, aucun fichier), puis la carrière se révèle.
4. **Commandes regroupées** : lecture + curseur + vitesses sur une ligne, Vue cavalier + Conseils sur la seconde. **Son, musique, ambiance et aide en pastilles flottantes en haut à droite de la carrière** (dans l'en-tête elles passaient inaperçues, dans la barre du bas elles encombraient).
5. **Grande légende supprimée**, repliée derrière la pastille « i ».
6. **Choix de reprise remontés tout en haut**, sur la ligne de la flèche de retour. **Ligne « Entrée → Transition → Trot » supprimée** : elle répétait le bandeau de figure et Blandine la trouvait à juste titre surchargeante.
7. **Onglet Coaching : accordéon** des figures, seule celle en cours ouverte. ⚠️ La ligne **fermée** porte le **conseil clé** (priorité 1, filtré par niveau) et non le texte officiel — idée de Blandine : on retient mieux « termine ta ligne droite » que le libellé qu'on a déjà sous les yeux. Le texte officiel, l'œil du juge et tous les conseils apparaissent à l'ouverture.
8. `DeroulementReprise` **supprimée** (remplacée par l'accordéon).

**Autres correctifs de cette session** :
- ⚠️ **La musique « ommmm » est remplacée par un ARPÈGE.** La v1 tenait 4 accords en boucle : à l'oreille, un bourdon continu. Maintenant des notes pincées (attaque 20 ms, décroissance 3,2 s) sur une pentatonique de la mineur, une toutes les 1,1 s, basse tous les 8 temps, filtre et réverbération. Mesuré : 8 notes en 3,6 s, **0 après extinction**. Noms de fonctions conservés (`demarrerNappeAmbiante` / `arreterNappeAmbiante`), tous les appels existants marchent.
- ⚠️ **Dictée vocale : LA vraie cause trouvée.** iOS n'autorise la synthèse vocale que si son **premier appel part d'un geste utilisateur**. Elle n'était déclenchée que depuis la boucle d'animation : le moteur restait verrouillé, silencieux. Elle est désormais amorcée **dans le clic du bouton**, qui énonce aussitôt la figure en cours.
- **Voix française féminine** choisie explicitement parmi celles installées (Audrey, Amélie, Marie…), avec repli sur la première voix `fr`. Débit laissé à 0,92 : Blandine veut le garder couplé au rythme du tracé.
- **Vitesse x1 : 78 → 92 px/s** en muet, 52 → 62 avec la voix (« un poil lent »).
- **Contrastes remontés** : les gris `#8A95A1` → `#B4BEC7` et `#5C6573` → `#8E9AA5`, petits corps de texte +1 px (« gris sur gris, on voit rien »).
- ⚠️ **Hauteur de l'écran : `calc(100dvh - 84px)`.** La coquille de l'app ajoute déjà `paddingBottom: 84` pour dégager la barre de navigation ; sans le retirer, la page scrollait. **Défaut invisible en maquette**, faute de barre de navigation — mesuré au rendu réel (root à 862 px pour un écran de 844).

✅ Vérifications : 848 → **850 fonctions** (`DeroulementReprise` retirée, `traceChoisirVoix`/`traceDireFigure`/`traceSouffle` ajoutées, `nappeReverb` → `musReverb`), **334 const**, `allerVersGalop` et `MEVO_CSS` intacts, `g4-biomeca` préservé, 14 blocs inline validés. **Rendu réel sur 3 tailles** (390×844, 375×667, 430×932) : aucun scroll, carrière entière visible, bouton Lecture au-dessus de la barre de navigation, intro jouée puis effacée, voix « Audrey » déclenchée au clic, accordéon Coaching avec conseil clé sur les lignes fermées, aucune erreur JS.

⚠️ **Pour la suite, repartir de CETTE version (20)**.

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

**Correctifs de la session (10) — couleurs des allures (retours de Blandine)** :
1. ⚠️ **« Entre F et K — départ au galop » colorait en rouge dès F**, soit deux lettres trop tôt. Ce n'était pas un problème d'affichage mais de **données** : `construireTraceReprise` donnait l'allure demandée à TOUT le chemin de piste F → A → K. Or « entre X et Y » décrit un point situé ENTRE les deux lettres. La nouvelle allure ne commence désormais qu'à partir de la **moitié du chemin** (les premières lettres gardent l'allure précédente). Vérifié sur les 6 reprises : les 12 segments « entre X et Y » avec changement d'allure affichent bien deux couleurs successives (g3 fig5/7/8, g4 fig2/11/12/15, g5 fig9/14, g6 fig4/7/9).
2. ⚠️ **Le travail latéral s'affichait en VERT (pas) alors qu'il se fait au trot** : sa vitesse était à 0,85, sous le seuil du pas de `couleurSelonAllure`. Passée à 0,95 — il reste plus lent que le trot de travail mais garde la couleur bleue. Corrige la cession à la jambe (G6 fig4 et 7) et l'épaule en dedans (Club Elite fig5 et 7).

✅ Vérifications : 839 fonctions et 316 const **identiques** (diff des noms vide), `allerVersGalop` intact, 14 blocs inline validés, rendu réel Playwright de l'app complète sans erreur JS.

**Session (11) — « Vivre la reprise » intégré dans `EcranReprisesFiches`** (maquette validée par Blandine avant codage) :
1. **Encart « Vivre la reprise »** : carrière en PAYSAGE (géométrie officielle projetée : (x,y) → (y, 200−x), donc rien n'est déformé), animation en boucle de 6,5 s montrant **le vrai début de la reprise affichée** (4 premières figures, construites par `construireTraceReprise`). Ma première maquette dessinait une trajectoire **inventée** — un cercle de 22 m accroché à une diagonale ne correspondant à aucune figure ; Blandine l'a repéré tout de suite. Ouverture en 1,5 s (carrière, tracé, cheval, titre, puis bouton actif). Animation en **une seule requestAnimationFrame, arrêtée dès que l'encart sort de l'écran** (IntersectionObserver) et manipulation directe du DOM par refs, pour ne pas re-rendre React 60 fois par seconde.
   - ⚠️ **Cadrage dynamique** : les arcs des cercles **sortent du rectangle** (un cercle de 20 m tracé en C dépasse largement la carrière). Le `viewBox` est donc calculé sur le contenu réel (carrière ∪ tracé + marge), sinon le tracé était coupé par le bord de l'encart — constaté au rendu réel sur le Galop 3.
   - 🔴 **Le cheval de l'encart pointe vers `images/cheval-dessus.png`** (ou `HYPE_IMGS.chevalDessus` s'il existe). **Ce fichier doit être poussé** (livré) sinon l'encart s'anime sans cheval. C'est la photo fournie par Blandine, traitée (voir maquette V6).
2. **Panneau de choix des modes**, en surimpression (`position:fixed`, pas de nouvelle route, donc aucun risque sur le routeur) : 4 cartes. « Voir la reprise » mise en avant avec la pastille « À commencer ici ». « M'entraîner à tracer » et « Challenge » ont un bouton **« Prochainement » désactivé** plutôt qu'un bouton qui ne mène nulle part. « Immersion » lance le tracé animé (et pose `window.__traceImmersion`, non encore lu par l'écran — à brancher quand Blandine aura tranché si Immersion devient un mode autonome).
3. **Conseils du coach en bas de la reprise**, au format des captures de Blandine : titre 🎓, puis par figure un libellé et 4 à 5 phrases courtes, erreurs fondues dans la liste (croix orangée). Alimentés **uniquement** par `hype-dressage-conseils.js`, rien n'est écrit en dur.
   - **Une figure n'apparaît qu'une fois** : le trot de travail revient 6 fois dans le G4, répéter ses conseils donnait une page illisible (8 blocs au lieu de 20).
   - ⚠️ **Le filtre de niveau ne descend jamais sous le niveau de la reprise consultée** (`max(profil.galopActuel, niveau de la reprise)`). Sans ça, un Galop 1 ouvrant la reprise du Galop 5 ne voyait **aucun** conseil et la section disparaissait entièrement — constaté au rendu réel.
4. ⚠️ **L'ancien gros encart carré « Voir le tracé animé »** (ajouté par une autre page le 27/07, même emplacement, même rôle) a été **REMPLACÉ** par le nouvel encart : deux grands encarts d'accès au même écran faisaient doublon. Son code n'existe plus, il faudrait le réécrire pour le remettre.
5. Page réordonnée selon le brief : en-tête → onglets → présentation (titre / niveau FFE / note) → encart → détail des figures → conseils du coach → mention FFE.
6. Nouvelles chaînes visibles traduites en **6 langues** (`VLR_TXT`, `VLR_MODES`, « Le détail des figures »). Le contenu des fiches reste en français et retombe sur `fr` via `tr()` — lot de traduction en cours (8 fiches sur 75).

✅ Vérifications : 839 → **843 fonctions** et 316 → **320 const**, diff des noms = exactement `ConseilsCoachReprise`, `EncartVivreLaReprise`, `PanneauModesReprise`, `vlrProj` (+ leurs constantes). `allerVersGalop`, `MEVO_CSS` intacts. 14 blocs inline validés. Rendu réel Playwright de l'app complète : écran monté sans erreur, encart animé (cheval qui avance, tracé qui se dessine), panneau des modes avec 2 boutons actifs et 2 désactivés, 5 blocs de conseils sur le G3, aucune erreur JS.

**Session (12) — deux retours de Blandine sur l'app en ligne** :
1. ⚠️ **La vitesse à 78 px/s n'existait QUE dans mes maquettes.** L'app était restée à 105 : Blandine testait donc bien du 105 quand elle a redit que c'était trop rapide. La vitesse dépend désormais de la **voix** : 78 px/s en lecture muette, **52 px/s dès que la voix est activée**, ce qui laisse le temps d'énoncer une figure complète (depuis la session 9 le tracé n'attend plus la fin de l'annonce, d'où le besoin de ralentir). x0,5 et x2 s'appliquent par-dessus. Mesuré en rendu réel : 3 s de lecture donnent t=37/1000 en muet contre 25/1000 avec la voix, soit le rapport 1,5 attendu.
2. **Nouveau bloc « Le déroulement, figure par figure » sous le tracé animé** : les 20 figures dans l'ordre, chacune avec son libellé court, le texte officiel FFE et jusqu'à 3 conseils filtrés par niveau ; **la figure en cours de lecture est surlignée en turquoise**. Ici, contrairement à la page « Réviser mes reprises », les figures ne sont **pas dédoublonnées** — l'intérêt est justement de suivre le déroulé. Mon erreur de conception : j'avais mis les conseils d'ensemble uniquement sur la page de la reprise, alors que Blandine les veut aussi sous le tracé, sans changer d'écran.

⚠️ **Rappel critique, confirmé par une capture de Blandine** : sans `hype-dressage-conseils.js` en ligne, l'écran du tracé animé **s'affiche mais reste muet** — pas de « FIGURE ACTUELLE », pas de barre de progression par familles, pas de carte du coach, pas de déroulement. Le code teste la présence de la bibliothèque avant de s'en servir (aucun plantage), mais tout le pédagogique en dépend. Vérification rapide : ouvrir `majestic-melba-997a68.netlify.app/hype-dressage-conseils.js` — si « Page not found », le fichier n'a pas été poussé.

✅ Vérifications : +1 fonction (`DeroulementReprise`), 844 fonctions et 320 const, diff des noms limité aux 5 composants ajoutés depuis la (10), `allerVersGalop` intact, 14 blocs inline validés, rendu réel sans erreur JS (20 blocs de figures, surlignage de la figure courante, effet de la voix mesuré).

**Session (13) — le cheval du tracé animé devient la PHOTO** :
- ⚠️ Blandine voyait toujours « la souris verte » : la photo n'existait **que dans la maquette V6**, jamais dans l'app. Elle attendait mon feu vert, j'attendais le sien.
- `EcranTraceAnime` affiche désormais `images/cheval-dessus.png` en `<image>` SVG (photo fournie par Blandine, recadrée, fond et halo blanc retirés, éclaircie par courbe douce car un cheval noir disparaît sur l'anthracite, réduite à 54×240 px, **25,7 Ko**).
- **Plus aucune couleur d'allure sur le cheval** : elle restait sur son liseré, donc vert au pas, et le halo mangeait la forme. Le code couleur des allures reste sur le tracé, là où il est utile. Halo neutre + ombre douce sous la silhouette.
- **Taille constante en pixels** (`CHEVAL_DESSUS_PX = 58`) : le SVG est mesuré et la longueur du cheval recalculée en unités de viewBox, sinon il rétrécissait avec la carrière sur les petits écrans. Vérifié : 58 px sur 390×844 **et** sur 375×667.
- 🔴 **`images/cheval-dessus.png` est désormais INDISPENSABLE** : sans lui, le cheval du tracé animé et celui de l'encart « Vivre la reprise » disparaissent tous les deux (le tracé continue de s'animer).
- Constantes ajoutées : `CHEVAL_DESSUS_SRC` (repli sur `HYPE_IMGS.chevalDessus` si la clé existe un jour), `CHEVAL_DESSUS_RATIO`, `CHEVAL_DESSUS_PX`.

✅ Vérifications : 844 fonctions et 323 const, `allerVersGalop` intact, 14 blocs inline validés, rendu réel sur 390×844 et 375×667 — photo chargée et dimensionnée à 58 px dans les deux cas, aucune couleur d'allure sur le cheval, aucune erreur JS.

**Session (14) — décors de carrière, palette jour, musique d'ambiance** :
1. **Système de décors intégré** (`HYPE_DECORS`, `ORDRE_DECORS`) : 4 entrées — **Cercle Crystal**, **Îles de nuit**, **Sable clair** (images fournies par Blandine) et **Fond classique** (dégradé, aucune image). Bouton **🌄 Ambiance** dans la seconde rangée de commandes, panneau de miniatures, choix **mémorisé** (`localStorage hype_trace_decor`). **Un seul décor chargé à la fois** : l'image du décor actif est la seule référencée.
   - La carrière reste posée sur une plaque : image de fond + voile de verre fumé (`backdrop-filter: blur(2px)` + radial 30 % → 4 %) + plaque de sol à 34 % d'opacité en mode image contre 55 % sinon. Sur un décor clair, le voile passe en clair au lieu de sombre.
2. ⚠️ **Palette JOUR** (`HYPE_PALETTES.jour`), déclenchée automatiquement par `clair: true` sur un décor. Mesuré sur le sable blanc (**luminance 171/255**) : le turquoise tombait à un contraste de **×1,14** et le vert du pas à **×1,13** — invisibles. Les teintes jour sont toutes au-dessus de ×2,2 : pas `#14612F`, trot `#123F73`, galop `#9B2226`, arrêt `#3A4550`, accent `#0A5F6E`, lettres `#23303C`. **Toute** la carrière suit : bordure, ligne du milieu, lettres (allumées comme éteintes), cercles indicatifs, tracé froid, parcours parcouru, tronçons d'allure, traînée et **légende des allures** (elle avait ses couleurs en dur, elle serait restée vive sur fond clair).
   - ⚠️ Les 3 fichiers `images/decor-*.webp` sont à pousser. Sans eux le décor est vide (fond noir) mais **rien ne plante** : la carrière et le tracé restent lisibles.
   - Conversions faites côté Claude : PNG 2,3–3,1 Mo → **WebP 900 px, 147 / 163 / 301 Ko**. Le décor clair se compresse mal (grain fin du sable) — à savoir si Blandine en génère d'autres.
3. **Musique d'ambiance enrichie** : ce n'était qu'un accord tenu (4 oscillateurs figés sur un do mineur). C'est maintenant une **progression de 4 accords** (la mineur – fa 7 – sol – do, 7,5 s par accord, glissando doux entre eux), un **filtre passe-bas piloté par LFO** à 0,035 Hz qui fait respirer la nappe, et une **réverbération par convolution générée au vol** (impulsion de bruit décroissant, 3,2 s). Toujours **zéro fichier audio**. La boucle d'accords est reprogrammée par un `setInterval` que `arreterNappeAmbiante` prend soin de couper.
   - ⚠️ **Ce n'est toujours pas de la musique** au sens où Blandine l'entend (classique, Caraïbes) : ça, ça demande de vrais morceaux **libres de droits**, 1 à 3 Mo chacun, avec vérification de licence pour un usage commercial. À faire quand elle aura choisi des morceaux.

✅ Vérifications : 839 → **846 fonctions** (+`hypeDecorMemorise`, +`nappeReverb`) et **328 const**, `allerVersGalop` et `MEVO_CSS` intacts, 14 blocs inline validés. Rendu réel Playwright : les 4 décors basculent, la palette suit (lettres et légende passent en foncé sur Sable clair), le choix est bien mémorisé, aucune erreur JS.

**Session (15) — allure persistante : la dernière famille du bug « bleu au lieu de rouge »** (capture de Blandine) :
1. ⚠️ **Un segment sans mot d'allure retombait sur le TROT.** `vitesseDepuisTexte` renvoyait `{ v: 1 }` par défaut. Or « VPV — cercle de 20 m » ne veut pas dire « au trot », ça veut dire « on continue dans l'allure en cours ». Exemple exact signalé : **G4 figure 13, « KV — galop de travail · VPV — cercle de 20 m »** — le cercle était dessiné en bleu au milieu d'une figure au galop. La fonction renvoie désormais `v: null` et `construireTraceReprise` conserve une **`allureCourante`** qui persiste d'un segment et d'une figure à l'autre jusqu'à annonce explicite (1 = trot de travail au départ).
2. ⚠️ **Contre-galop à 1,35 → 1,5** : il tombait juste sous le seuil du galop de `couleurSelonAllure` (1,4) et s'affichait donc en bleu. Concernait les demi-cercles de 20 m au contre-galop du G7 (figures 14 et 20). C'est la **troisième** occurrence de cette même famille de défaut, après le travail latéral (session 10) et le départ au galop « entre X et Y » (session 10).
3. **Contrôle systématique des 6 reprises** : toute figure dont le texte annonce le galop sans mentionner le trot affiche désormais du rouge. Les 4 exceptions restantes (`g4` fig12 et 15, `g5` fig9 et 14) sont **voulues** : ce sont les « entre F et K — départ au galop », où la première moitié du chemin garde l'allure précédente, conformément au correctif de la session 10.

✅ Vérifications : 846 fonctions et 328 const inchangés (aucun ajout), `allerVersGalop` intact, 14 blocs inline validés. Rendu réel : sur la transition trot→galop, le cercle de 20 m et la diagonale qui suit, la tête du tracé est bien **rouge**.

**Session (16) — encart de titre illustré sur la page des reprises** :
- Image fournie par Blandine (cavalier dans un croissant de cristal, entrée de carrière, lettres sur plots). **Recadrée sur les 60 % du haut** (cavalier + entrée de carrière), convertie en **WebP 900×811, 88 Ko** contre 2,5 Mo en PNG.
- Remplace le bloc de titre en texte simple de `EcranReprisesFiches` : l'image porte désormais le titre de la reprise, le niveau FFE et la note.
- **Règle Hype respectée** : le dégradé de lisibilité ne couvre que le **tiers bas** de l'encart, là où se pose le texte. Le bas de l'image est déjà à 38 de luminance, donc pas besoin d'assombrir — et **aucun voile ne touche le cheval**, qui est dans la partie haute.
- 🔴 **`images/hero-reprises.webp` à pousser.**
- ✅ Rendu réel vérifié : `200` sur `hero-reprises.webp` et `cheval-dessus.png`, encart à 350×315 px sur 390 de large, titre/niveau/note bien lisibles dans l'encart, aucune erreur JS.

**Récapitulatif des fichiers `images/` désormais nécessaires** : `cheval-dessus.png` (cheval du tracé et de l'encart Vivre la reprise), `hero-reprises.webp` (encart de titre), `decor-spectral.webp`, `decor-mer.webp`, `decor-sable.webp` (décors de carrière). Plus `hype-dressage-conseils.js` à la racine.

**Session (17) — retour arrière et emplacement des visuels** :
1. ⚠️ **La flèche retour renvoyait toujours sur la page du Galop.** `EcranReprisesFiches` et `EcranTraceAnime` faisaient `setEcran(galopOuvert ? "galop-detail" : "dashboard")` **en dur** : quel que soit l'endroit d'où on arrivait (bibliothèque, accueil, raccourci), on atterrissait sur galop-detail. Les deux écrans utilisent désormais **l'historique réel de l'app** (`retourEcran` / `peutReculer`), avec l'ancien comportement en repli s'il n'y a pas d'historique.
2. **Les 5 visuels passent À LA RACINE du dépôt**, plus dans `images/` (choix de Blandine : rien à taper dans le champ de dossier au moment de l'upload depuis l'iPhone). 7 chemins modifiés dans le code. Réversible en une minute si elle veut ranger plus tard.

**Fichiers à pousser à la RACINE, avec `index.html`** : `hype-dressage-conseils.js`, `cheval-dessus.png`, `hero-reprises.webp`, `decor-spectral.webp`, `decor-mer.webp`, `decor-sable.webp`.

⚠️ **Point de vigilance sur les diagnostics** : plusieurs retours de Blandine (« pas de conseils », « pas de titre avec l'image », « fond noir ») venaient d'un `index.html` ou de fichiers non poussés, pas de bugs. Avant de chercher dans le code, vérifier ce qui est réellement en ligne (`majestic-melba-997a68.netlify.app/<fichier>`) et la taille de l'index en local.

✅ Vérifications : 846 fonctions et 328 const inchangés, `allerVersGalop` intact, 14 blocs inline validés, rendu réel : `200` sur les visuels depuis la racine, encart de titre affiché.

**Session (18) — les visuels acceptent LES DEUX emplacements** :
- ⚠️ **Ma faute de consigne** : j'ai d'abord annoncé les visuels dans `images/`, puis basculé le code vers la racine à la demande de Blandine. Si elle avait déjà poussé dans `images/`, le code cherchait à la racine — d'où « aucune image ne s'affiche » alors que les fichiers étaient bien en ligne.
- Deux helpers ajoutés : **`hypeFondDouble(nom)`** empile les deux `url()` en fond CSS (une couche qui échoue n'est pas peinte, la suivante prend le relais, et le navigateur ne télécharge que ce qui existe) et **`hypeImageSecours(e)`** bascule le `href` d'une `<image>` SVG vers `images/` en cas d'erreur de chargement. Appliqué aux 4 visuels : décor de carrière, encart de titre, cheval du tracé, cheval de l'encart.
- ✅ **Les 3 cas testés en rendu réel** : fichiers uniquement à la racine → OK ; fichiers uniquement dans `images/` → OK (repli déclenché, `200` sur `images/…`) ; **aucun fichier poussé → aucun plantage**, les visuels manquent simplement.
- ⚠️ Leçon de méthode : deux patchs enchaînés, le premier a échoué sur une assertion sans rien écrire et le second a quand même branché les appels → `hypeFondDouble is not defined` et écran de plantage. **Toujours revalider par un rendu réel après une chaîne de patchs**, pas seulement `node --check` (la syntaxe était valide, la fonction manquait).

**Session (19) — trois bugs signalés par Blandine + les pastilles remontées** :
1. ⚠️ **Vue cavalier illisible** : l'inclinaison était à **54°**, la carrière devenait un trapèze écrasé et le cheval vu du dessus se couchait à plat comme une planche. Passée à **28°** (`IMMERSION_ANGLE`), échelle 1,38 → 1,16, perspective 820 → 1100 px, et le cheval est **ré-étiré verticalement de 1/cos(28°) = 1,133** pour compenser l'écrasement (`scale(1, k)` appliqué AVANT la rotation, donc l'étirement se fait bien dans l'axe de l'écran).
2. ⚠️ **La voix ne s'arrêtait plus** (« il parle quelle que soit la position du bouton ») : couper le bouton ne faisait que sortir de l'effet React, sans jamais annuler l'énoncé en cours ni la file d'attente. Ajout d'un effet dédié sur `vocal` qui appelle `speechSynthesis.cancel()` **deux fois** (sur iOS un seul appel laisse parfois passer la phrase en cours), remet à zéro `dernierFigParleRef`, et d'un `vocalRef` vérifié juste avant `speak()`. Vérifié : 2 énoncés avant coupure, **0 après** sur 4,5 s de lecture, 8 annulations déclenchées.
3. ⚠️ **Musique en cacophonie** : `demarrerNappeAmbiante` ne vérifiait pas qu'une nappe tournait déjà. Deux allumages rapides ou un effet rejoué créaient des nappes **superposées**, chacune avec ses oscillateurs et son minuteur de reprogrammation d'accords. Ajout d'un garde (`if (gainMasterRef.current) return;`), d'un nettoyage des restes avant toute création, et l'arrêt vide la liste après le stop différé. Vérifié : 4 cycles allumage/extinction rapides, aucune erreur.
4. **Son, musique et ambiance remontent en pastilles dans l'en-tête** de l'écran — ils encombraient la barre du bas qui portait six boutons sur une ligne. Fait dans la maquette V5 depuis un moment, jamais reporté dans l'app : encore un écart maquette/app à surveiller.
5. Le bouton caméra s'appelle désormais **« Vue cavalier »** (6 langues) et non plus « Immersion », qui devient le nom d'un onglet dans la refonte à venir.

✅ Vérifications : 848 fonctions et 330 const, `allerVersGalop` intact, 14 blocs inline validés, rendu réel avec synthèse vocale instrumentée.

🔴 **RESTE À FAIRE — refonte V5 (brief complet de Blandine, points 1 à 20)** : deux onglets 🎬 Immersion / 🎓 Coaching, carte unique (carrière + bandeau figure + bulle + commandes), intro de générique de 2 s à l'ouverture (écran noir, nom de la reprise, vent synthétique, fondu, cheval déjà à A, puis Lecture qui s'allume), légende repliée derrière une pastille, déroulement en accordéon avec seule la figure en cours ouverte. **Maquette à livrer avant intégration.**

⚠️ **Pour la suite, repartir de CETTE version (19)**.

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

## 28/07/2026 — Bugs des photos de profil (produit communautaire) + messagerie visible

### 🔴 LE BUG QUI CASSAIT LA PROMESSE COMMUNAUTAIRE — diagnostic complet
Blandine ne voyait pas la photo d'Ambre. Constat en base (requête lancée par Blandine) : **24 profils sur 33 ont `avatar_url` VIDE**, alors que ces cavalières ont bien un avatar visible sur leur propre téléphone. Deux causes distinctes trouvées, les deux corrigées :

1. **Import de photo qui échouait SILENCIEUSEMENT** (le plus grave). Un écran de profil appelait `syncProfilDistant({ avatar: ... })` — le champ envoyé s'appelait `avatar` alors que **la colonne est `avatar_url`**. Postgres refusait, et l'erreur était **avalée par un `catch (e) { }` vide**. La photo ne quittait jamais le téléphone. Bonus : ça envoyait l'image en **base64 complet** dans une colonne texte au lieu de passer par l'upload — vu le quota Supabase sous surveillance (restriction au 14 août), heureusement que ça ne marchait pas. → Remplacé par `hypeEnregistrerPhoto("avatar", ...)` qui fait un vrai upload dans le bucket puis écrit `avatar_url`, **et remonte l'échec à l'écran** au lieu de l'avaler.
2. **Avatars gagnés / choisis dans la galerie** (diplôme de Galop, avatars débloqués) : seulement `setProfil({avatar})`, donc **local uniquement**. → Nouveau helper `hypeSyncAvatarChoisi()` qui écrit la référence en base (forme `@clé`, déjà résolue par `avSrc()` à l'affichage, donc aucun upload nécessaire).
3. Au passage : **3 points d'entrée** de visite de profil (liste d'amis, page club, page écurie) passaient `p.avatar_url` **brut** sans le résoudre via `avSrc()` — un avatar en `@raccourci` n'était donc jamais affiché. Corrigé.

⚠️ **CES CORRECTIFS NE RÉPARENT QUE L'AVENIR.** Les 24 profils déjà vides le resteront : la valeur n'a jamais atteint le serveur, **il n'y a rien à rattraper en SQL**. Chaque cavalier doit remettre sa photo.

### Plan retenu par Blandine pour l'existant (les deux, en parallèle)
- **Encart in-app** (codé) : nouveau composant `EncartPhotoInvisible` sur la page profil. S'affiche **uniquement si `avatar_url` est vide EN BASE** (vérification serveur réelle, pas locale), palette turquoise, texte : « Ta photo reste invisible » + « Ta photo de profil n'est visible que sur ton téléphone : les autres cavaliers voient une silhouette. Remets-la pour qu'ils te reconnaissent. » + bouton « Remettre ma photo ». **Fermable** (mémorisé dans `hype_encart_photo_ferme`). 6 langues.
- **Messages manuels** (à faire par Blandine, APRÈS mise en ligne du correctif — sinon leur nouvelle photo échouera encore). Requête pour la liste : `select id, pseudo, ecurie from profiles where avatar_url is null or avatar_url = '' order by pseudo;` — brouillon de message fourni dans la conversation. Sert aussi à faire découvrir la messagerie.
- **Note** : la liste mélange ceux qui *croient* avoir une photo (victimes du bug) et ceux qui n'en ont jamais mis — impossible de les distinguer côté serveur.
- **Profils en doublon** (deux « Blandine », deux « Liam ») : **normal**, comptes de test créés au début avec des mails différents. Ne pas y toucher.

### Messagerie rendue visible (choix B2 + B3 validé sur maquette)
Elle n'était accessible que par une petite icône du hero — donc invisible.
- **B2** : pastille rouge du nombre de messages non lus sur l'icône du hero.
- **B3** : nouvelle **grande carte « Mes messages »** dans Mon monde (juste après Communauté équestre), même format que les autres encarts, avec le compteur de non lus ou le chevron.
- Nouveau helper `hypeTotalNonLus()` qui **réutilise `listerMesConversations`** (le calcul de `nonLus` par conversation existait déjà) : **aucun SQL, aucune table ajoutée**. Rafraîchi toutes les 45 s pour ne pas marteler la base.

### Mise en page
- **Page club/écurie descendue** : `.ecv .scroll` reçoit `padding-top: calc(env(safe-area-inset-top) + 12vh)` (aligné sur les 16vh de la page cavalier) et le hero passe de 46vh à 40vh pour compenser. Le haut des photos n'est plus coupé (mesuré : 101px de décalage au rendu).
- **Mon Évolution** : +16px d'espace entre « Des bases à l'excellence » et la phrase magique, avec cheval et courbe **remontés du même delta** (hero 540, img −85, traj 290). ⚠️ Ces trois valeurs bougent TOUJOURS ensemble.

### 🔧 Carrousel des chevaux : défilement réparé
Le défilement automatique ne fonctionnait pas sur iPhone. **Cause : `el.scrollLeft += 0.5`** — iOS Safari arrondit `scrollLeft` à l'entier, donc un pas de 0,5 était arrondi à **0** et le rail ne bougeait jamais (ça marchait sur les navigateurs de bureau qui acceptent les décimales, d'où le fait que ça n'ait pas été vu). Vérifié avec Blandine que « Réduire les animations » était bien **désactivé** sur son iPhone — ce n'était donc pas un réglage d'accessibilité. → Corrigé : la position est accumulée dans une variable décimale `posF` puis **assignée**.

✅ Vérifié : 850 → 851 fonctions (uniquement `EncartPhotoInvisible`, rien perdu), 334 const inchangés, 14/14 scripts, **rendu Playwright réel sur accueil / profil / écurie** — carte « Mes messages » présente, décalage écurie mesuré à 101px, **zéro erreur JS**. Un bug a d'ailleurs été attrapé par ce test (`nonLusMsg is not defined` : l'état avait glissé dans `EcranMonde` au lieu d'`EcranUnivers`, car `EcranUnivers` utilise `var` et non `const [`) et corrigé avant livraison.

### ⏸️ EN ATTENTE
- **Vitesse du tracé animé** : la demande d'accélération n'a **pas** été appliquée. Le système a été refondu entre-temps sur une autre branche (deux vitesses désormais : `VITESSE_VOIX = 62` et `VITESSE_MUET = 92`), l'ancien `VITESSE_BASE_PX_S` n'existe plus. À reprendre en décidant des nouvelles valeurs plutôt qu'en forçant l'ancien patch.
- **Allure héritée dans les figures** (le galop repassait en bleu dans un cercle, car `vitesseDepuisTexte` renvoie 1 = trot par défaut quand le segment n'a pas de mot d'allure) : diagnostiqué, **pas encore codé**.
- **Nouvelle présentation des Galops** (la une photo + rail défilant, titre « Chaque Galop a son univers ») : maquettes validées, **pas encore codée**.
- **Tableau de résultats sur le profil** : Blandine a dit « on en reparle », rien à coder sans nouvelle décision.
- **Quota Supabase** : restriction au 14/08 si dépassement maintenu. À surveiller, d'autant qu'une vingtaine de cavaliers vont bientôt uploader leur photo.

**⚠️ Pour la suite, repartir de CETTE version.**

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

### Maquette V6 du tracé animé — EN ATTENTE DE VALIDATION VISUELLE DE BLANDINE
Fichier `maquette-trace-V6.html` (autonome, 279 Ko). Remplace la V5.
- **Le cheval est la PHOTO de Blandine**, plus un dessin. Traitement fait par calcul : recadrage serré (exclut l'ellipse décorative et les paillettes), suppression du fond et du halo blanc résiduel (alpha < 40 ou luminance > 200), **éclaircissement par courbe douce** (`0,14 + 0,86·v^0,62`) car un cheval noir disparaît sur l'anthracite — luminance moyenne 50 → 108, réduction à 54×240 px, **25,7 Ko** en PNG optimisé. Affiché en `<image>` SVG, pivoté dans le sens de la marche, 57 px de long sur iPhone 14 comme sur SE.
- 🔴 **Pour la production il faudra pousser `cheval-dessus.png` dans `images/`** (fichier livré). Dans la maquette il est en base64 pour qu'elle reste autonome.
- **Plus aucune couleur d'allure sur le cheval** (demande de Blandine : « pourquoi il est vert ? »). C'était le code des allures appliqué à son liseré — vert au pas — et sur une silhouette de 11 px le halo vert écrasait la forme. Halo désormais neutre et discret. La couleur d'allure reste sur le tracé, là où elle est utile.
- Le reste est identique à la V5 : son/musique/décor en pastilles dans l'en-tête, vitesse à 78 px/s, bulles = erreurs à éviter filtrées par niveau, 3 décors + fond classique, aucun scroll, aucun décalage vertical.
- Historique : mon décalque vectoriel (55 tranches relevées sur la photo, `_cheval.js`) reste disponible si la photo pose problème, et la page `comparaison-cheval.html` (4 tailles × 5 traitements) sert de référence pour arbitrer.

### 🔴 Modes de reprise à créer (demandés par Blandine, spécification à compléter)
- [ ] **Tracer au doigt pour apprendre** (nommé « défi Time » dans nos échanges) : la carrière est vide, le cavalier trace sa reprise au doigt, l'app compare au tracé officiel. **Rien n'existe dans le code.** Questions ouvertes : tracé libre noté à la fin, ou guidé figure par figure ? Modèle en filigrane (apprentissage) ou carrière nue (test) ? Ma proposition : les deux, guidé avec filigrane puis libre sans modèle, avec score.
- [ ] **`ReprisePlanJeu` (« Le Plan de Reprise ») existe déjà** mais ce n'est PAS un tracé libre : le cavalier empile des figures dans une liste et le jeu vérifie la cohérence (commencer par l'entrée, finir par l'arrêt/la sortie). À ne pas confondre avec le mode ci-dessus.
- [ ] Mention trouvée dans la bibliothèque de conseils : « En mode Tracé/Challenge : afficher les conseils seulement après validation. » C'est la seule spécification écrite reçue à ce jour sur ces modes.

### Maquette V5 (remplacée par la V6, historique)
Fichier `maquette-trace-V5.html` (autonome, 244 Ko, aucun script distant, aucune image). Remplace la V4.
- **Cheval : silhouette DÉCALQUÉE**, pas dessinée. Blandine a fourni une photo de cheval vu du dessus ; le contour a été relevé **par calcul** (55 tranches horizontales, seuil de luminance 120, lissage sur 3 tranches, normalisation sur 23 unités de viewBox) puis converti en path SVG de 110 points (`_cheval.js`). Ma silhouette précédente, dessinée à la main en une seule forme fermée, ressemblait à une souris — constat de Blandine, exact. Rapport largeur/longueur réel : 0,22.
- Le corps reste **sombre** (dégradé de robe) comme un vrai cheval vu du dessus ; c'est le **liseré** et le halo qui portent la couleur de l'allure. Un cheval rempli en vert ou rouge devenait illisible.
- **Son et musique remontés en pastilles dans l'en-tête** (🔇 / 🎶 / 🌄), avec le sélecteur de décor. Ils avaient disparu de la V4 quand j'ai reconstruit la barre du bas pour tenir sans scroll.
- **Vitesse de lecture : 105 → 78 px/s** (Blandine trouvait x1 un peu rapide). x2 redonne l'ancien rythme. Reprise du G4 : ~96 s au lieu de ~72 s.
- **Bulles = erreurs à éviter uniquement**, tirées de la fiche de la figure, **filtrées par le niveau du cavalier**, en minuscules 11,5 px, 3,2 s. Si aucune erreur assez courte n'est disponible au niveau du cavalier → **rien ne s'affiche**. Les micro-consignes génériques de la V4 sont abandonnées : Blandine a constaté qu'un coup sur deux elles ne correspondaient ni au niveau ni à la directive de la figure — diagnostic juste, elles étaient une par figure sans filtre de niveau.
- **3 décors + fond classique**, peints en dégradés CSS (`spectral`, `fontainebleau`, `monaco`, `classique`) : **zéro image, zéro octet à charger, aucune question de droits**. Carrière posée sur un voile de verre fumé (radial 62 % → 10 % + flou 2 px) ; la plaque de sol passe de 1 à 0,62 d'opacité en mode décor pour laisser respirer le paysage. Dernier décor mémorisé (`localStorage hype_trace_decor`, dans un try/catch). La structure accepte une vraie photo sous licence à la place d'un dégradé, sans rien changer d'autre.
- ✅ Mesuré sur **390×844 et 375×667** : aucun scroll, haut du SVG à 169 px dans les deux cas, cheval 44-46 px de long, bascule des 4 décors vérifiée, bulle bien en minuscules 11,5 px, aucune erreur JS.
- ⚠️ Toujours pas de jugement à l'œil de ma part (afficheur d'images muet sur cette session) : les chiffres sont vérifiés, l'esthétique est à valider par Blandine.
- [ ] **Décisions attendues** : silhouette du cheval, les 3 décors (garder les dégradés ou passer à de vraies images), cadence et ton des bulles, nouvelle vitesse.

### Maquette V4 (remplacée par la V5, historique) — EN ATTENTE DE VALIDATION VISUELLE
Fichier `maquette-trace-V4.html` (autonome, aucun script distant, moteur et bibliothèque de production copiés tels quels). **Rien n'est intégré à l'index tant que Blandine n'a pas validé visuellement** (consigne explicite de son brief).
- Carrière Hype Spectral : dégradé de sol, grain très léger (5 %), vignettage, halo turquoise flouté autour du rectangle, double liseré, ligne d'axe pointillée, 2 nappes lumineuses. Belle à l'arrêt, sans animation.
- Cheval : **taille constante en pixels** quel que soit l'écran (échelle inverse de la hauteur de carrière) — 47 px de long sur iPhone 14 **et** sur iPhone SE, contre 27 et 25 px avant. Liseré turquoise, ombre douce décalée, crin sombre, orientation lissée à 22 %/frame.
- Lettres : hiérarchie A/C/X (axe) vs lettres de piste ; allumage turquoise + halo au passage ; **pré-éclairage discret de la première lettre de la figure suivante** quand il reste moins de 90 unités.
- Tracé : tronçons monochromes par allure, extrémité active plus épaisse + halo, parcours entier conservé en turquoise à 34 %.
- Bulle de micro-coaching : **dans la carrière**, jamais reliée au cheval, placement automatique parmi 6 ancres (score = distance au cheval ×1,4 + distance au tracé à venir), 13,5 px en capitales, fond noir 90 % + flou, 2,6 s d'affichage, une seule à la fois, temps de respiration de 4,2 s entre deux.
- Bandeau compact : FIGURE ACTUELLE + libellé + « Objectif : » (1er observable) + ENSUITE (figure suivante). Progression : familles avec ✓ sur les passées, turquoise sur l'actuelle, grises ensuite.
- ✅ Mesuré sur **390×844 et 375×667** : aucun scroll, aucun décalage vertical du rectangle à l'apparition de la bulle (haut du SVG à 169 px dans les deux cas, avant comme après), bulle jamais superposée au cheval (contrôlé sur 4 apparitions d'une reprise complète), aucune erreur JS.
- ⚠️ Je n'ai pas pu juger le rendu **à l'œil** de mon côté (mon afficheur d'images est resté muet sur cette session) : les chiffres ci-dessus sont vérifiés, l'esthétique est à ton jugement.
- [ ] **Décisions attendues** : taille du cheval (40 px visés), cadence des bulles (4,2 s), et si la bulle peut chevaucher le tracé au centre sur petit écran (196 px de large dans une carrière de 366 px).

### Bibliothèque v1.5 — micro-conseils
- [x] **`micro` ajouté sur les 75 fiches** : une consigne de 2 à 5 mots par figure, pour l'affichage pendant l'animation (« Garde ton diamètre », « Prépare le pli », « Termine ta ligne droite »). Les conseils longs restent disponibles pour une fiche détaillée après la reprise. Contrôle par assertion : aucune fiche sans micro, aucun micro orphelin, 7 mots maximum.
- [ ] Traduire les `micro` en en/es/it/de/ja (non fait, retombe sur le français).

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
| 29/07 (44) | **Bibliothèque vidéo.** Nouvel écran + page de lecture dans un fichier séparé `hype-video.js` ; ancien écran vidéo factice retiré ; catalogue de 6 vraies vidéos (3 IFCE confirmées + 3 à vérifier) en 6 langues ; pas de pourcentage de lecture (lecteur externe) ; miniatures YouTube distantes (0 bande passante Netlify). Lien cours → vidéo (étape D) volontairement non fait. |
| 02/08 (72) | Claude (Directeur Technique) | **Visionneuse zoomable** (`PhotoZoomHype`, sans état React) corrigeant la sortie de l'appli au zoom ; vidéo de cérémonie figée sur la page Performances ; titre vertical « Liens & partage » désuperposé. Inventaire architectural de l'index (étape 1) : le contenu pèse plus que le code, extraction de `contenu_galop1_i18n` prête mais volontairement reportée après les bugs. En attente : passage Supabase en Pro. |
