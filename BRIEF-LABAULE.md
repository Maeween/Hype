# 🌊 BRIEF — LA BAULE, ce qu'il reste à décider
### Établi le 19/08/2026. Diagnostic vérifié par script, **aucun fichier modifié**.

---

## ⚠️ À LIRE AVANT TOUT

1. **Rien de ce qui suit n'est validé par Blandine.** Le diagnostic est factuel, les propositions ne le sont pas. Ne rien coder sans son feu vert explicite.
2. **UN CONCEPT = UN `ref` GLOBAL.** Toujours vérifier avant de créer une notion.
3. **6 langues obligatoires** : FR / EN / ES / IT / DE / JA. Toute traduction neuve doit être signalée comme non relue par un natif.
4. **Ne jamais affirmer qu'un fichier manque sans preuve.** Le bac à sable n'est pas le dépôt.

---

## 1 · POURQUOI CETTE VILLE PASSE AVANT LES AUTRES

**La Baule est l'étape 1 du voyage** — depuis le 6 août 2026, sur décision de Blandine : *commencer par l'écurie « n'est pas vendeur de rêve »*, un cavalier arrive quelque part, il s'inscrit, il apprend à se tenir près d'un cheval.

C'est donc le premier chapitre que voit un joueur qui découvre Linguae. **Et c'est là que dort le bloc de sécurité.**

---

## 2 · L'ÉTAT ACTUEL, VÉRIFIÉ

- `ETAPE_SRC.labaule = [["arrivee", 1]]`
- fichier : `hype-lingo-lex-arrivee.js` — **31 concepts, `lecons: 2` déclaré mais TROIS leçons présentes**
- balise actuelle : `<script src="hype-lingo-lex-arrivee.js?l=6"></script>`
- `ACCUEIL_VILLE.labaule = "arrivee"` → `ACCUEIL_CHAP.arrivee` existe, rien de cassé
- aucune autre ville ne cite la clé `arrivee` : La Baule est seule sur son fichier
- ⚠️ `balade` (Maurice, étape 2) porte un **rappel** de ce fichier : le `ref` `balade` y est repris à l'identique. `arrivee.js` doit se charger AVANT `balade.js` — c'est déjà le cas.

### 🔴 Le défaut : La Baule ne lit que la leçon 1. **16 concepts sur 31 dorment.**

---

## 3 · LE CONTENU DU FICHIER

Le fichier ne porte aucun titre de leçon — les thèmes sont une lecture du contenu.

### Leçon 1 — Réserver et se présenter · 15 concepts · **LUE**
`reserver`, `niveau`, `debutant`, `tarif`, `bombe-fournie`, `cheval-calme`, `balade`, `le-groupe`, `pas`, `trot`, `galop`, `bottes`, `cavalier-confirme`, `cheval-rapide`, `cheval-sympa`

### 🔴 Leçon 2 — LA SÉCURITÉ · 11 concepts · **DORMANTE**

| ref | FR | EN |
|---|---|---|
| `passer-devant` | passer devant lui | to pass in front of him |
| `jamais-derriere` | ne passe pas derrière lui | don't walk behind him |
| `prevenir-toucher` | préviens-le avant de le toucher | speak to him before you touch him |
| `longe-main` | n'enroule pas la longe | never wrap the rope round your hand |
| `distance` | garde tes distances | keep your distance |
| `attention` | attention ! | mind out! |
| `tenir-cheval` | tiens-le | hold him |
| `lacher` | lâche ! | let go! |
| `casque-attache` | attache ta bombe | do your hat up |
| `chaussures-fermees` | des chaussures fermées | closed shoes |
| `chute-bouge-pas` | ne bouge pas | don't move |

**C'est le bloc dont le commentaire de `lingo.html` dit : « La sécurité n'existait NULLE PART dans les 378 mots d'origine. »** Il a été écrit exprès pour combler ce trou. Il n'est montré à personne, à l'étape 1, devant un débutant qui n'a jamais approché un cheval.

### 🔴 Leçon 3 — L'organisation du cours · 5 concepts · **DORMANTE**
`cours-particulier` (le cours particulier) · `cours-collectif` (le cours collectif) · `licence-assurance` (l'assurance) · `duree-reprise` (une heure de cours) · `annuler` (annuler)

---

## 4 · LES DÉGÂTS COLLATÉRAUX

### 3 phrases d'exercice sur 7 ne s'affichent pas
Toutes en leçon 2, toutes des phrases de sécurité :

| ref | phrase |
|---|---|
| `ph-derriere` | « Ne passe pas derrière lui, passe devant. » |
| `ph-longe` | « La longe, jamais autour de la main. » |
| `ph-ca-va` | « Ne bouge pas, j'attrape le cheval. » |

Les 4 visibles sont en leçon 1 : `ph-reserver-demain`, `ph-je-debute`, `ph-bombe-tarif`, `ph-groupe-debutants`.

### Le dialogue cite un mot non enseigné
`dialogue` : `ville:"labaule"`, **25 phrases, 6 temps** (3/3/4/2/5/8).

Deux phrases citent **`cours-collectif`**, concept de la leçon 3 que La Baule n'enseigne pas :

- **#5**, temps 2, joueuse — `d-quel-niveau-requis` : « Quel niveau faut-il avoir pour participer à ce cours ? » — `mots:["niveau","cours-collectif"]`
- **#7**, temps 3, joueuse — `d-inscrire-demain` : « Je voudrais m'inscrire pour un cours demain matin. » — `mots:["reserver","cours-collectif"]`

Les deux phrases sont naturelles et bien à leur place. C'est le **marquage** du mot qui pointe dans le vide, pas la phrase.

### Pourquoi c'est possible
Les deux chemins sont indépendants :
- **la leçon** passe par `ETAPE_SRC` → `chapVirtuel()` → filtrage par numéro de leçon ;
- **le dialogue** passe par `aUnDialogue()`, qui compare seulement `d.ville === refVille`. Il ne consulte **jamais** `ETAPE_SRC` ni le champ `lecon` du dialogue — ce champ est **inerte**.

À l'ouverture, `lingo.html` envoie à `lingo-dialogue.html` le chapitre **entier** (`mince[k] = L[k]`, 31 concepts). La page fille a donc de quoi afficher tous les mots.

⚠️ `MAITRISE` est indexée **par `ref`**, sans notion de ville ni de leçon. Dans `lingo.html` elle ne monte que sur `p.rappel`, et ce dialogue n'en a pas. **Le comportement de `lingo-dialogue.html` n'a pas pu être vérifié — ce fichier n'était pas disponible.**

---

## 5 · CE QU'IL FAUT DÉCIDER

### Option A — ouvrir les 3 leçons
`ETAPE_SRC.labaule = [["arrivee",1],["arrivee",2],["arrivee",3]]`

→ **31 concepts.** Les 7 phrases d'exercice s'affichent, `cours-collectif` cesse de pointer dans le vide, la sécurité est enseignée dès l'étape 1. Une ligne à changer, aucun contenu à écrire, aucune traduction à produire.

⚠️ **31 concepts à l'étape 1**, c'est le double de ce que la ville montre aujourd'hui. À comparer avec Lambourn (33, étape 5) et Maurice (18, étape 2). C'est le seul point à peser.

### Option B — leçons 1 + 2 seulement
`ETAPE_SRC.labaule = [["arrivee",1],["arrivee",2]]` → **26 concepts.**

Garde la sécurité, laisse l'organisation du cours en réserve. Il faudrait alors **vider `mots:[…]` de `cours-collectif`** dans les deux phrases du dialogue, et verser les 5 concepts de la leçon 3 dans `hype-lingo-lex-arrivee-reserve.js` (non chargé), sur le modèle des cinq réserves déjà en place.

### Option C — alléger
Non recommandé sans raison forte : c'est le bloc de sécurité, et c'est l'étape 1.

### Le précédent Lambourn, comme repère
Ramenée de 42 concepts à **33**, en 4 leçons (11 / 7 / 10 / 5). 9 concepts versés dans `pansage-reserve.js`, 3 rendus à Flyinge. Le dialogue a gardé ses 20 phrases et ses 6 temps ; **une seule phrase** a été retouchée. La méthode a marché, elle est reproductible ici.

### Points annexes
- **`lecons: 2` est déclaré dans le fichier alors qu'il contient TROIS leçons.** Incohérence à corriger quoi qu'il arrive.
- **Si le fichier change**, incrémenter son `?l=` (aujourd'hui `?l=6`) dans `lingo.html`, sans quoi le téléphone sert l'ancienne copie.
- **Si un nouveau fichier est créé** (réserve ou autre), l'ajouter à `SOCLE_JS` dans `sw-linguae.js` **dans le même geste**, et changer `CACHE`. La règle a déjà été oubliée trois fois.
- **La Baule est une ville offerte** (`VILLE_OFFERTE.labaule = 1`) : pas de paywall à vérifier.

---

## 6 · CE QU'IL FAUDRAIT AVOIR SOUS LES YEUX

- **`lingo-dialogue.html`** — pour trancher la question de la maîtrise créditée par le dialogue. Seul point du diagnostic resté ouvert, commun à toutes les villes.

---

## 7 · CE QUI EST DÉJÀ TRANCHÉ AILLEURS, NE PAS ROUVRIR

- **Un concept identique réutilise exactement la même `ref`**, quelle que soit la ville.
- **Une notion déjà acquise ailleurs peut rester dans un dialogue comme révision, mais ne compte pas comme nouveau mot.**
- **Les fichiers de réserve ne sont chargés nulle part** — ni balise `<script>` dans `lingo.html`, ni entrée dans `SOCLE_JS`. Réserves en place : `concours-reserve`, `dressage-reserve`, `materiel-reserve`, `pansage-reserve`.
- **Un fichier abîmé se refait depuis l'original, jamais par rafistolage.** Extraction ligne à ligne (`sed`), jamais par motifs.

---

## 8 · L'AUDIT COMPLET DU MODULE, POUR SITUER LA BAULE

Les 36 villes ont été croisées avec leur fichier. **113 concepts dormants au total, concentrés sur 4 villes** — toutes écrites en juillet, toutes dans les sept premières étapes :

| ville | étape | fichier | vus / total | dormant |
|---|---|---|---|---|
| Newmarket | 4 | `ecurie` | 10 / 42 | **32** |
| Aberystwyth | 7 | `cours` | 10 / 42 | **32** |
| **La Baule** | **1** | `arrivee` | **15 / 31** | **16** |
| Burghley | 11 | `cross` | 18 / 21 | **3** |
| ~~Lambourn~~ | 5 | `pansage` | 33 / 33 | ✅ réglé le 19/08 |

**Les 31 autres villes n'ont aucun concept dormant.** Tout ce qui a été écrit après Burghley est propre.
