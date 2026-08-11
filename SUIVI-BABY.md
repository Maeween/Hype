# SUIVI BABY — Le Chemin Baby et ses jeux

> **Carnet ouvert le 11/08/2026**, sur demande de Blandine (« on peut commencer un suivi baby en plus non ? »), en même temps que la doctrine de rangement des images en cinq dossiers.
>
> **Ce carnet couvre** : le Chemin Baby (27 chapitres, paliers Bronze / Argent / Poney d'Or), le **Memory du Poney**, la Mémory du Poney et les autres jeux Baby, les personnages (Liam, Samuel, Elea, Evan) et les poneys (Apy, Bambina).
>
> **Ce carnet ne couvre pas** : les Galops 1 à 7, l'Accueil, le Premium, le Monde, l'Écurie, la Communauté, Hey Baby → `SUIVI.md`. Linguae → `SUIVI-LINGUAE.md`.
>
> ⚠️ **Le Baby vit encore DANS `index.html`.** Ce carnet est un carnet de sujet, pas de fichier : toute livraison Baby passe par `index.html` + `hype-cours-baby.js`, et **doit donc aussi être tracée dans `SUIVI.md`** (empreinte md5, témoin de version). Ne jamais livrer un index en ne le notant qu'ici.

---

## RÈGLES QUI S'APPLIQUENT ICI (rappel, elles ne se renégocient pas)

- **Feu vert strict** : aucune ligne de code sans un « valide » / « vas-y » / « ok fais-le » explicite. En cas de doute : demander « je code ? ».
- **Interdiction de décider à la place de Blandine.** Écrire « décision de Blandine » uniquement sur ses mots exacts ; sinon « déduction de Claude — à valider ».
- **Livraison** : `index.html` en premier, nommé `index.html`, `DEV_OUVRIR_PAGE=""`. Annoncer « À l'écran : + ce qui apparaît / − ce qui disparaît ».
- **Noms de chapitres** : le titre réel (« Le départ sur le bon pied »), jamais l'identifiant technique (`g3-c2`).
- **Photos de chevaux** : jamais de filtre, voile ni assombrissement.
- **6 langues** systématiques : FR / EN / ES / IT / JA / DE.
- **Scroll reset** : `scrollTop = 0` à l'ouverture de tout nouvel écran ou panneau défilable.

---

## ÉTAT AU 11/08/2026

### Le chemin

**27 chapitres** répartis en trois paliers. Le dernier palier, le **Poney d'Or**, compte 9 chapitres :

| id | titre réel |
|---|---|
| `baby-c19` | Ma tenue, les espaces du club et la promenade |
| `baby-c20` | Paille ou foin ? La nourriture d'Apy |
| `baby-c21` | Je desselle Apy et je range son matériel |
| `baby-c22` | Je réalise le pansage de tout le corps |
| `baby-c23` | Je prends et je cure les antérieurs d'Apy |
| `baby-c24` | Je connais le corps du poney et je reconnais le pas et le trot |
| `baby-c25` | Je déplace les hanches et je marche au rythme d'Apy |
| `baby-c26` | Je mène Apy sur un tracé avec courbes et arrêt |
| `baby-c27` | Je dirige Apy, je transporte un objet et je découvre le trot |

Fichier de contenu : `hype-cours-baby.js`, version **112**, appelé avec `?v=112`.

### Les questions « Petit rappel »

`PALIERS_BABY_QUIZ` a désormais **ses trois paliers** — il n'y a plus de trou. Les deux du Poney d'Or, écrites le 11/08 et validées par Blandine (« Oui ok pour les questions ») :

1. « Le foin, c'est ce qu'Apy... » → « mange ; la paille, c'est sa litière » — `baby-c20`
2. « Pour curer un pied d'Apy, je gratte... » → « du talon vers la pince, sans appuyer sur la fourchette » — `baby-c23`

**Motif du choix** : ce sont les deux seuls savoirs du palier où un enfant peut se tromper franchement et où la bonne réponse tient en une phrase. Les autres chapitres (mener sur un tracé, déplacer les hanches, reconnaître le trot) sont des gestes qui se vérifient à cheval. Une troisième était prête sur `c21` (« tapis côté humide vers l'air ») — non retenue, Blandine a répondu « 2 ça va ».

**Point technique à ne pas casser** : dans `FinCheminBabyCarte`, le `React.useState` des réponses vues est déclaré **avant** le `if (!tousTermines) return null;`. Un Hook appelé après un retour anticipé casse le rendu pour tout enfant n'ayant pas fini les 27 chapitres.

### Le Memory du Poney

**14 niveaux, 120 cartes, et depuis le 11/08 plus AUCUNE carte sans image.**

- Données : `hype-memory-poney.js`, version **4**, appelé avec `?v=4`.
- **98 cartes en chemins directs** `memory-<niveau>-<cle>.webp?v=1`, **à la racine du dépôt**.
- **20 cartes** gardent une clé `HYPE_IMGS["kNNN"]` (11 du niveau Evan, 5 de Vie du poney, 3 d'Allures, 3 d'Obstacles) + **2** en `images/memory-evan-maman-*.jpg`. Ces clés peuvent être lues ailleurs dans l'app : **ne pas les renommer sans audit clé par clé**.
- Poids : 28,4 Mo de base64 dans l'index → **9,3 Mo** de fichiers WebP chargés à l'ouverture du niveau.

**Difficulté progressive** (à ne pas prendre pour un bug) : 4 paires aux niveaux 1-2, puis +1 paire tous les deux niveaux, plafonné au nombre de paires du thème. Le niveau Boss affiche toujours toutes ses paires. Une paire sans image n'entre jamais dans la grille.

#### Obstacles — 6 paires, trois familles visuelles (décision de Blandine : « Mets 6 paires pour obstacle »)

| carte | image | famille |
|---|---|---|
| `barre` → **« En équilibre »** | bras écartés sur le poney à l'arrêt | nuit, alezan, au sol |
| `envol` | le poney en l'air au-dessus de la croix | nuit, alezan, en l'air |
| `bravo` | poing levé sur le poney **noir**, croissant de lune | nuit, poney noir |
| `cavaletti` | poney **gris** mené à pied sur la barre au sol | arène de sable, gris |
| `reception` | saut de la barre bleue, rendu 3D | arène de sable, clair |
| `casque2` | câlin au poney bai sous la lanterne | box, bai |

Le libellé « En équilibre » (6 langues) remplace « La barre », validé par Blandine — l'image n'est plus un saut.

**Écartée volontairement** : l'image du tout-petit sautant la croix bleue (lot du 11/08), vérifiée à l'œil contre `reception` — même poney clair, même barre bleu et blanc, même arène, même rendu 3D. On aurait remplacé un jumeau par un autre.

#### 🔴 Incident réparé le 11/08 : `vie-poney / dodo` affichait le bandeau de messagerie

`HYPE_IMGS["k610"]` était déclarée **deux fois** : un lot la définissait en base64 (le poney endormi) et l'index la réassignait à `images/k610.jpeg`, **le bandeau bleu à bulles de la messagerie de l'Accueil**. L'index gagnant, la carte du Memory affichait des bulles de chat.

**Même motif exact que l'incident `k558` de la session 112 : une clé pour deux usages.** C'est le piège récurrent du système de clés. Le contrôle qui l'a trouvé : afficher côte à côte, en planche, le base64 du lot et le fichier de `images/` pour chaque clé définie deux fois.

#### 🟠 Signalé, non corrigé : le niveau Evan est trop homogène

Constaté sur planche le 11/08 : `evan3` (k617), `evan4` (k618) et `evan5` (k619) sont trois fois le même enfant à cheval sur le poney bai avec le même halo turquoise ; `evan8` (k622) et `evan9` (k623) sont deux câlins quasi identiques. **Rien n'a été touché** — Blandine n'a pas demandé cette reprise. Trois images de son lot du 11/08 sont en réserve pour ça (à éviter : celle de l'enfant assis contre le poney couché dans la paille, trop proche du niveau Samuel).

#### 🟠 Signalé aussi : Samuel et Grand Défi

- `samuel-assis-paille-calin-box` et `samuel-pyjama-calin-peluche-poney` : même box, même poney couché, même enfant blotti — seule la peluche change, invisible en vignette.
- `apy-longe-promenade`, `apy-tresses-rubans-bleus`, `apy-couverture-hiver` : même poney de face, même fond, même enfant blond à droite ; on les distingue à l'objet mais il faut regarder.
- `allures / galop` et `allures / trot` : ressemblance **voulue** (pédagogique), mais rend la paire dure à mémoriser. Ne pas y toucher sans l'accord de Blandine.

---

## LES IMAGES DU BABY — DOCTRINE ET ÉTAT

La doctrine complète des cinq dossiers est dans `SUIVI.md`. Ce qui concerne le Baby :

**Le Memory du Poney appartient au Baby, pas à Hype** — c'est un jeu du Chemin Baby. Le dossier Baby est donc le premier à se remplir.

**Règle d'entrée absolue** : un fichier n'entre dans le dossier Baby que s'il est **déjà en WebP** (décision de Blandine : « on met que celles dans le bon format dedans, ça sera ça de moins à faire ensuite »).

| lot | où c'est | format | éligible ? |
|---|---|---|---|
| les 98 du Memory | **racine du dépôt** | webp | ✅ prêt à déménager |
| les 12 couvertures de chapitres (`images/baby-cNN-*.jpg`) | `images/` | **jpg** | ❌ à convertir d'abord — lot suivant tout désigné, 12 fichiers, un seul fichier de code (`hype-cours-baby.js`) |
| `puzzle-baby-bronze.jpg` et les autres visuels de jeux | à localiser | jpg | ❌ |

**Nom du dossier** : `medias/baby/` — proposé par Claude sur délégation explicite de Blandine (« à toi de voir comment tu veux appeler et où on doit mettre les dossiers »). Un seul dossier parent `medias/` à la racine, quatre enfants : `baby`, `galops`, `linguae`, `hype`.

### 🔴 CE QU'IL FAUDRA FAIRE LE JOUR DU DÉMÉNAGEMENT — dans cet ordre

1. Déplacer les 98 `.webp` de la racine vers `medias/baby/` (GitHub mobile ne déplace pas : supprimer puis redéposer).
2. **Modifier `_headers`** — la règle `/medias/*` existe déjà, mais **garder `/memory-*.webp` en place quelques semaines**, le temps que les anciens chemins sortent des caches des appareils. Ne la retirer qu'ensuite. Un chemin sans règle = renégociation à chaque affichage = le lag constaté le 11/08 au soir.
3. Livrer la **v5** de `hype-memory-poney.js` avec les chemins `medias/baby/…`, + `index.html` en `?v=5` et témoin incrémenté.
4. Tracer dans **les deux carnets** (ici et `SUIVI.md`).

**Ne jamais faire 1 et 3 dans le même push sans avoir vérifié une adresse à la main** : le 11/08, les 98 images ont été poussées à la racine alors que le code v3 les cherchait dans `images/` → 404 sur les 98, Memory dégradé une dizaine de minutes en ligne. Le test qui tranche en dix secondes : ouvrir `https://<domaine>/<chemin exact d'une image>` dans Safari.

---

## OUTIL DE CONTRÔLE

**`extraire-memory-2.html`**, à la racine. Deux modes : « Diagnostic seul » (rapide, aucun téléchargement) et « Diagnostic + zip ». Il vérifie en HTTP chaque chemin d'image du Memory et nomme la carte fautive avec sa clé `kNNN`.

Il lit aussi les **blocs `<script>` inline d'`index.html`** — c'est ce qui manquait à la v1 et ce qui avait produit, le 11/08 au matin, une fausse alerte de 21 images « manquantes » qui existaient toutes.

**Deux défauts connus de cet outil, à ignorer dans son rapport** :
- l'anti-cache `?ext=` fait échouer des lots réels quand le réseau hoquette (17 lots ratés le 11/08) ;
- la ligne « lots chargés mais n'ajoutant aucune clé » est une mauvaise mesure : un lot qui redéfinit des clés existantes en ajoute zéro.

---

## À FAIRE (rien n'est engagé sans feu vert)

1. **Déplacer les 98 images** vers `medias/baby/` → v5 des chemins. Prêt de mon côté, attend le déplacement.
2. **Convertir les 12 couvertures de chapitres** en WebP → elles deviennent éligibles au dossier Baby.
3. **Reprendre le niveau Evan** si Blandine le décide (images trop semblables).
4. **Auditer les 20 clés `kNNN`** restantes du Memory dans tout l'index, puis les basculer aussi. Après quoi : inventorier les lots `hype-images-*.js` devenus inutiles et les retirer du démarrage — **c'est là qu'est le vrai gain de poids**, pas dans la conversion elle-même.

---

## Préparation Flutter (doctrine CTO : moderniser progressivement, jamais réécrire)

**Ce qui est déjà portable :**

- `hype-memory-poney.js` est une **donnée pure**. Depuis la v4, 98 de ses 120 cartes n'ont plus aucune dépendance à `window.HYPE_IMGS` : ce sont des chemins de fichiers. Transposable tel quel en Dart.
- `hype-cours-baby.js` suit le même chemin : 12 de ses couvertures sont déjà des fichiers.

**Liste nommée de ce qui reste à moderniser, côté Baby :**

- les **20 clés `kNNN`** du Memory (frontière restante entre la donnée et l'index) ;
- les **4 blocs `<script>` inline** de déclaration de clés dans `index.html`, dont deux boucles — ils n'existent nulle part ailleurs, aucun outil externe ne les voit, et ils ont coûté la fausse alerte du 11/08. À remplacer par des chemins écrits dans la donnée ;
- `FinCheminBabyCarte` et `PalierBabyCarte` : vue et données de quiz mélangées, à séparer avant tout portage.

**Pas d'indicateur en pourcentage** — une liste nommée, conformément à la doctrine.
