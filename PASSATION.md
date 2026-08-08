# PASSATION — fil « Hype, Directeur Technique » du 8 août 2026

*À coller au début de la conversation suivante. Le SUIVI.md du projet contient le détail
session par session ; ce document donne l'état vivant et les pièges de la journée.*

---

## 1 · CE QUI EST LIVRÉ ET QUI ATTEND D'ÊTRE POUSSÉ

| Fichier | md5 | Taille |
|---|---|---|
| `index.html` | `0bec15cde7b3e253f23ce90293d27c97` | 9 127 282 |
| `hype-cours-baby.js` | `bdcd692f0ca13be26583937a44e51e43` | 1 817 899 |
| `SUIVI.md` | — | — |

**Toujours livrer le SUIVI AVEC l'index, jamais seul** : l'ouvrir seul fait planter le téléphone
de Blandine. Consigne explicite de sa part.

⚠️ **Le bump de `HYPE_VERSION_APP` avait été perdu** lors d'une restauration de l'index en cours de
session, et retrouvé au moment d'écrire cette passation. Il est bien à `"1.2"` dans le fichier
ci-dessus. **Vérifier ce genre de valeur après chaque restauration depuis une référence.**

---

## 2 · LA PREMIÈRE CHOSE À FAIRE EN OUVRANT LA CONVERSATION

**Demander à Blandine ce qu'affiche le lien « Quoi de neuf ».**

Il doit dire : **« reprise 1.2 · baby 111 »**

- Si c'est bien ça → les fichiers tournent, les problèmes restants ont une autre cause.
- Si c'est `1.1`, ou `baby ?` → **le fichier n'est pas chargé, il n'y a rien d'autre à chercher.**

**Pourquoi ce témoin existe.** Toute la journée a été perdue à deviner si les correctifs étaient
réellement chargés. Quatre hypothèses successives, toutes fausses : noms de fichiers, cache
navigateur, écrasement des clés d'images, ordre de chargement. À chaque fois la vérification locale
était bonne et l'app affichait autre chose, et à chaque fois Blandine a dû aller vérifier sur
GitHub — cinq fois, sur des fichiers qui étaient tous corrects.

**`HYPE_VERSION_APP` (index) et `window.COURS_BABY_VERSION` (fichier Baby) doivent être incrémentés
à chaque modification.** C'est le seul moyen de savoir ce qui tourne.

---

## 3 · LES DEUX PROBLÈMES ENCORE OUVERTS

### 3.1 · Les couvertures Baby ne changent pas

**Symptôme.** Les 12 nouvelles couvertures ne s'affichent pas : le chemin Baby et la page de cours
montrent les anciennes images. Blandine avait déjà essayé de les changer par elle-même avant cette
session, sans succès.

**Ce qui a été prouvé correct**, chacun vérifié séparément :
- les 13 images sont en ligne (`majestic-melba-997a68.netlify.app/images/baby-c3-brosse.jpg` répond) ;
- `index.html` en ligne fait 8,7 Mo, c'est bien la version livrée ;
- `hype-cours-baby.js` en ligne fait 1,73 Mo, avec les chapitres réécrits reconnaissables ;
- la chaîne complète simulée localement rend `baby-c3 -> images/baby-c3-brosse.jpg` ;
- le convertisseur `convertirCoursI18nVersInterne` **ne transforme pas** les blocs `couv-affiche`
  (`return b;` final), donc `src` est préservé ;
- `NoeudCheminPoney` lit bien `cours.blocs.find(b => b.type === "couv-affiche").src` ;
- le cache a été vidé, l'app relancée.

**Ce qui a été tenté, sans effet** : aligner les noms de fichiers sur les noms réels ;
déplacer les déclarations `k644`–`k657` après tous les lots d'images ; écrire les chemins **en dur
dans la donnée** (état actuel, plus aucune clé `HYPE_IMGS` pour ces 12 images).

**HYPOTHÈSE MORTE, ne pas y revenir :** l'écrasement des clés par les lots chargés après.
**Blandine : « le puzzle était fonctionnel ».** Le puzzle utilise `HYPE_IMGS["k645"]`, déclarée dans
le même bloc, au même endroit, dans la même plage. S'il s'affiche, ces clés ne sont pas écrasées.
Une observation qui contredit la théorie vaut mieux que dix qui la confirment.

**Pistes non explorées** :
- Le service worker `/sw.js` — jamais lu, jamais audité. Le SUIVI note qu'il a déjà servi des
  versions périmées. **C'est la piste la plus sérieuse restante.**
- Une copie des cours mise en cache côté client (localStorage) qui court-circuiterait la table.
- Une seconde source de données Baby non identifiée. Une liste `{ id: "baby-c3", emoji: "🌿",
  label: { fr: "Besoins" } }` existe vers la position 7 126 975 avec une numérotation qui **ne
  correspond pas** aux titres réels (elle donne c2 = Pansage, c3 = Besoins, alors que la table dit
  c2 = matériel, c3 = Je brosse Apy). Origine et usage non déterminés — **à examiner**.

### 3.2 · Le Memory : images tronquées et cartes manquantes

**Tronquées** : cause trouvée, `objectPosition: "center top"` alors que les illustrations ont leur
sujet au centre. **Quatre occurrences corrigées** en `"center"` dans `MemoryGalop`,
`MemoryPoneyGrille`, `MemoryPoneyJeu` (×2). Les trois autres du fichier (`rondSocial`,
`menuDeroulant`, `EcranSante`) sont des portraits : ancrage haut volontairement conservé.
**Blandine signale que ce n'est toujours pas corrigé après push** — donc même doute de version que
ci-dessus, à trancher avec le témoin.

**Manquantes** : les seuls niveaux touchés, « Les allures » et « Le saut d'obstacles », sont les
seuls à utiliser des clés servies par de **vrais fichiers** : `k550`, `k552`, `k548`, `k551`.
Blandine a **déjà déplacé** ces quatre fichiers de la racine vers `images/`. Si les cartes restent
vides, chercher ailleurs.

Un **filet de secours** a été posé en session 108 : un `onError` sur les cartes des deux grilles
remplace une image absente par l'emoji du thème et journalise
`[Hype] Memory : image absente -> <chemin>` dans la console. **Question utile à poser à Blandine :
voit-elle le carré cassé du navigateur, ou l'emoji ?** Le carré signifie que l'index chargé ne
contient pas le filet ; l'emoji signifie que le filet marche et que l'image manque vraiment.

`liste-fichiers-images.txt` (généré, non poussé) recense les **62 fichiers** que `images/` doit
contenir.

---

## 4 · DEMANDES DE BLANDINE NON FAITES

**Le Poney d'Or doit dérouler les cours appris**, comme les paliers Bronze et Argent.
`FinCheminBabyCarte` (3 626 octets, vers la position 7 539 000) ne reçoit que `tousTermines`,
`nbTermines`, `totalCours`, `totalEtoiles` — **pas la liste des cours**. Il faut lui passer
`coursNiveau` depuis `CheminPoneyBaby` (l'appel est dans la branche `else` de la boucle sur les
groupes) et ajouter la section « Ce que tu as appris », en reprenant le bloc de `PalierBabyCarte`.

**Même défaut de cadrage que le quiz, non corrigé faute d'accord** : `EcranExamenBlanc`
(3 occurrences de `minHeight: "100dvh"`), `EcranJeuGalop`, `EcranReprisesFiches`. Le quiz est passé
en `calc(100dvh - 84px)` avec la zone d'image en `37%` au lieu de `37vh`. L'examen blanc a
peut-être besoin de défiler : demander avant.

---

## 5 · CE QUI A ÉTÉ FAIT AUJOURD'HUI ET QUI FONCTIONNE

- **`_headers`** posé à la racine : cache d'un an sur les 119 `hype-images-*.js`, les 3
  `hype-clubs-db-*.js`, `images/`, et **tous les fichiers de Linguae** (19 cartes, 19 vidéos,
  8 lexiques) qui vivent à la racine et n'étaient pas couverts. `index.html`, `sw.js`, `lingo.html`
  et `lingo-globe.html` restent hors cache. `/hype-cours-*.js` en cache court avec revalidation :
  **jamais immuable**, ce sont des données qui changent.
- **`COURS_BABY_I18N` sorti de l'index** dans `hype-cours-baby.js` : index 9,73 → 8,16 Mo.
  Objet reconstruit identique bit pour bit, repli `|| []` testé avec `undefined`, `null`, `false`.
- **Une barrière d'erreur par écran** (`BarriereEcran`) autour de la chaîne des 61 écrans de
  `Router()`. Reprend l'écran « Un caillou dans le sabot » existant, six langues. `key: ecran` pour
  que revenir sur la page la réessaie. **Se ferme avant `NavBar`**, qui est dans le même div — sans
  ça la barre d'onglets tombait avec l'écran.
- **Le pont Linguae → Hey Baby**, entièrement dans `index.html` : `assistant.js` n'est **pas** à
  modifier, le relais reçoit `{ system, messages }` déjà construits côté client. Testé sur quatre
  cas. **Ne pas utiliser `window.__hbCoursCtx`** : son consommateur fait
  `return (c && c.titre) ? c : null`, un contexte sans `titre` est jeté silencieusement. Passer par
  `window.__hbPrefill`.
- **L'accueil entièrement en allemand** : 16 libellés `L5acc` complétés, 19 sur 19 ont désormais
  l'allemand. `L5acc(fr, en, es, it, ja, de)` — l'allemand est le **sixième** argument.
- **`GALOPS_I18N` en allemand** : 8 niveaux × titre, sousTitre, competences = 24 champs.
  `Galopp` avec deux `p`, comme dans les 92 chapitres.
- **La carte Linguae de l'accueil** : label, « HYPE LINGUAE », slogan **« Ride the world »** (jamais
  traduit), puis « Un langage équestre universel. » (traduit). Une seule ligne descriptive : la
  Bible impose deux lignes maximum.
- **Les paliers Baby restent dépliés** : `PalierBabyCarte` ne se replie plus en pastille, seul le
  bouton cède la place à une pastille de réussite. 19 éléments rendus contre 3 avant.
- **Le cadrage des quiz** : `calc(100dvh - 84px)`, la convention de sept autres écrans.

---

## 6 · L'ALLEMAND — ÉTAT ET ORDRE DE PRIORITÉ

**498 libellés** encore sans clé `de`. Six blocs font l'essentiel :

| Bloc | Nombre | Priorité |
|---|---|---|
| `I18N` | 317 | **1er** — connexion et onboarding, le premier écran qu'un Allemand voit |
| `BADGES_I18N` | 59 | 3e — libellés courts, touche la récompense |
| `LEGENDES_HYPE` | 50 | 4e — biographies, surestimé (noms propres, mots identiques) |
| `GALOPS_I18N` | ~~24~~ | ✅ fait cette session |
| `MEMORY_PONEY_NIVEAUX` | 8 | au fil de l'eau |
| `TEINTES_FOND_STUDIO` | 6 | au fil de l'eau |

Plus **13 affiches** dont la version allemande n'existe pas, et 47 expressions à examiner.

`audit_de4.js` (dans `/home/claude/w/`) régénère ce tableau. ⚠️ Une première méthode d'attribution
par composant donnait **400 libellés dans `BanniereFond`**, ce qui est faux : la détection décroche
sur les fonctions fléchées. Le total est bon, la répartition ne l'était pas — la version qui
rattache aux **constantes en capitales** est la bonne.

---

## 7 · LE DÉCOUPAGE DE L'INDEX — SUITE

Index à **8,16 Mo**. Les tables de cours restantes pèsent **3,09 Mo, soit 38 %**.

| Table | Taille | Réfs images | Constantes du bloc inline |
|---|---|---|---|
| `COURS_GALOP4_FR` | 0,66 Mo | 15 | **aucune** |
| `COURS_GALOP6_FR` | 0,06 Mo | 1 | **aucune** |
| `COURS_GALOP5_FR` + `G7` | 0,02 Mo | 0 | **aucune** |
| `MEMORY_PONEY_NIVEAUX` | 0,04 Mo | 120 | **aucune** |
| `COURS_GALOP3_FR` | 1,01 Mo | 12 | 6 `INFOG_*` + `GALOPS_HERO` |
| `COURS_GALOP2_FR` | 0,50 Mo | 3 | 7 constantes |
| `COURS_GALOP1_I18N` | 0,84 Mo | 133 | `GALOPS_HERO`, `INFOG_SECURITE_G1`, `INFOG_SELLERBRIDER_G1` |

**Prochain coup évident : G4 + G5 + G6 + G7 réunis, 0,74 Mo, aucune dépendance.** Même recette que
Baby, un seul fichier. `MEMORY_PONEY_NIVEAUX` peut y être joint : sans dépendance malgré ses 120
références. Les Galops 1, 2 et 3 en dernier, **en sortant leurs constantes d'affiches avec eux** —
c'est ce couplage qui avait fait échouer la session 71.

**Ne pas supprimer les commentaires** (0,53 Mo, 6 %) : ils expliquent pourquoi chaque correctif
délicat est écrit comme il l'est, et plusieurs ont déjà évité de refaire un bug.

---

## 8 · PIÈGES DÉCOUVERTS AUJOURD'HUI

**La clé `id` n'ouvre pas toujours un chapitre.** Sur `baby-c16` et `baby-c17`, `type` la précède :
`{ "type": {...}, "id": "baby-c16", ... }`. Un `lastIndexOf("{")` depuis l'identifiant tombe sur
l'objet `type`. Il faut remonter d'accolade en accolade jusqu'à celle qui **couvre** l'identifiant
**et** dont l'évaluation rend le bon `id`.

**`equilibre()` de `lib_table.js` bute sur les accolades présentes dans les chaînes.** Pour
délimiter une fonction du fichier compilé, se fier à l'indentation : la fermeture est en **colonne 0**,
donc `s.indexOf("\\n}", debut) + 2`.

**Compter les fermetures avant de remplacer un appel React.** `}));` ferme trois choses : l'objet
de props, le `createElement` du composant, et le `createElement` parent dont il est le dernier
enfant. Une régression est passée par là, rattrapée par `node --check`.

**Le contrôle `count == 1` sauve, mais ne pas conclure qu'un composant est unique.** L'ancre du
correctif Memory apparaissait **2 fois** : il existe deux jeux, `MemoryGalop` et
`MemoryPoneyGrille`, avec le même code de carte et le même défaut.

**Ne jamais demander à Blandine de chercher une chaîne dans un fichier de données.** 1,8 Mo de JS
sur un téléphone, c'est impossible. Les repères utilisables : la **taille** et le **chemin** que
GitHub affiche, lisibles en deux secondes.

**Ne pas toucher à ce qui fonctionne, même pour uniformiser.** Le puzzle a été passé en chemin
direct alors qu'il marchait, puis remis à l'identique.

**Les deux boucles de convention `k547-k554` et `k615-k628` restent AVANT les lots d'images, c'est
volontaire.** Ce sont des filets : elles déclarent un chemin, et si un lot définit ensuite la même
clé en base64, le base64 gagne. Les déplacer casserait ce comportement.

**Ne plus inventer de noms de fichiers d'images.** Revenir à `kNNN.jpg`, déclaré par la boucle de
convention. Chaque nom descriptif est un intermédiaire de plus entre la livraison et le dépôt,
donc une occasion de divergence — celle-ci a coûté une heure.

---

## 9 · POUR LINGUAE

`NOTE-POUR-LINGUAE.md` a été remis à Blandine pour l'autre fil. Résumé : `lingo.html` colle
`VER = "?v=14"` à **11 adresses d'images sur 18**, si bien que `carte-saumur.webp` et
`carte-saumur.webp?v=14` sont deux fichiers pour le navigateur — **chaque carte est téléchargée
deux fois**. Décision à prendre : retirer `VER` des images (recommandé, mais alors une image se
remplace en changeant son nom), ou sortir les images du cache immuable.

⚠️ **Ne PAS mettre `defer` sur les 23 scripts de lexique** : le bloc inline lit `HYPE_LINGO_LEX`
immédiatement, la table serait vide. C'est le motif qui a déjà mis `lingo.html` à terre plusieurs
fois.

Bonne nouvelle mesurée : le chargement des médias de Linguae est déjà soigné (fond flou de 1 à 2 Ko
sur le chemin, carte nette seulement pour l'étape voisine, vidéos créées à l'ouverture de la ville).
**Aucun préchargement massif** — ce n'était pas la cause des lenteurs.

---

## 10 · OUTILLAGE DANS `/home/claude/w/`

| Fichier | Rôle |
|---|---|
| `lib_table.js` | isolation d'une table, `equilibre`, `evaluer`, `lireTablePartout` |
| `lireTablePartout(nom)` | **ajouté cette session** : cherche dans l'index puis dans les `hype-cours-*.js` |
| `preuve_rendu.js` | compare le rendu champ par champ contre une référence, six langues |
| `rendu.js`, `audit2.js` | simulation de résolution de langue, couverture linguistique |
| `audit_de4.js` | **ajouté** : libellés sans allemand, rattachés aux constantes |
| `test_final.js` | **ajouté** : chaîne complète `HYPE_IMGS` → fichier Baby → convertisseur |
| `test_pont.js` | **ajouté** : recette du pont Linguae → Hey Baby, quatre cas |
| `verif_de.js` | **ajouté** : rendu allemand de chaque appel `L5acc` |

⚠️ **`lireTablePartout` : piège corrigé.** Une table sortie laisse dans l'index une ligne de repli
contenant `|| []`. L'ancien `lireTable` y trouvait le crochet et renvoyait un tableau **vide** :
l'audit annonçait « Baby 0/0 » et faisait croire à une perte totale du contenu.

**Contrôles obligatoires avant chaque livraison** : `node --check` sur tous les blocs inline ;
`preuve_rendu.js` contre la référence dans les six langues ; unicité de chaque ancre vérifiée
**avant** écriture ; et compter les occurrences dans le fichier **écrit** — un « ok » affiché ne
prouve pas que le disque a été touché.
