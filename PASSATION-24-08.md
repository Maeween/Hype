# 🚨 PASSATION — 24/08/2026, 14h50
## Palmarès, import FFE, barre du bas · à reprendre à froid

---

## 🟥 LIRE CECI EN PREMIER

**Blandine travaille depuis trois jours.** La session précédente (22/08) avait déjà brûlé
deux nuits sur un bouton qui marchait. Cette session a résolu beaucoup, et cassé deux fois.

**Trois choses sont ouvertes à cet instant, signalées par elle à 14h50 et NON diagnostiquées.**
Ne pas coder au jugé. Chercher d'abord.

---

## L'ÉTAT DES FICHIERS

| Fichier | md5 | État |
|---|---|---|
| `index.html` | `6208e249327ede608f9fc94655cdb855` | livré, **poussé ?** à confirmer |
| `hype-import-ffe.js` | `0e777cfec629a377b87951de6d0a38b7` | livré, va **avec** l'index (`?v=5`) |
| `aide-import.mp4` | `61b1b2c609a36dfc888411e1c55dac31` | 1,45 Mo, racine du dépôt |
| `aide-import.jpg` | `36816edd1a35eb8f15737ff72ce24a27` | 54 Ko, couverture de la vidéo |
| `SUIVI.md` | `e2a9dc0646d9d3f018524ebcb25d03b5` | sessions 152i → 160 |

🟥 **Vérifier le md5 de l'index reçu de Blandine AVANT toute écriture.** Elle travaille
parfois sur plusieurs pages en parallèle.

🟥 **L'index appelle `hype-import-ffe.js?v=5`.** Toute modification du module DOIT
incrémenter ce numéro. Sans ça, Safari sert sa copie et la livraison n'arrive jamais sur le
téléphone — c'est ce qui a coûté deux jours les 21 et 22/08.

⚠️ **NE JAMAIS `grep` l'index (9,1 Mo) en affichant les lignes** : elles font des milliers de
caractères. Utiliser `grep -o -F "motif" | wc -l`, puis lecture bornée par `python`.

---

## 🔴 LES TROIS PROBLÈMES OUVERTS — signalés à 14h50, non diagnostiqués

### 1. La barre du bas se plante encore au milieu de l'écran

**Trois tentatives, deux hypothèses fausses :**

- session 152l : `overflow: hidden` → `clip` sur le conteneur du Router (ligne ~21901).
  **N'a rien réglé.** Pire : `overflow: clip` rogne les éléments fixes là où `hidden` les
  laissait passer.
- session 160 : `ReactDOM.createPortal(NavBar, document.body)`. **Blandine dit que ça
  continue.**

**Ce qui est VÉRIFIÉ et peut être écarté :** aucun ancêtre de la NavBar ne porte
`transform`, `filter`, `backdrop-filter`, `will-change` ni `perspective`. Le portail sort
bien vers le `body` (vérifié au banc). `html { overscroll-behavior: none }` est en place,
`overflow-x: clip` aussi.

**Pistes non explorées :**
- `env(safe-area-inset-bottom)` — la bande fait ~360 px sur les captures, bien plus haut
  que la barre elle-même. Il y a du vide SOUS les icônes. D'où vient-il ?
- `100vh` contre `100svh`/`100dvh` sur iOS en mode autonome (PWA).
- La barre est-elle vraiment `position: fixed` au moment du bug, ou son style est-il
  recalculé ? **Personne n'a jamais inspecté l'élément en direct.**

🟥 **Le seul vrai test n'a jamais été fait : brancher l'iPhone sur un Mac, Safari →
Développement → inspecter la NavBar pendant que le bug est là.** Tant que ce n'est pas
fait, on devine.

### 2. L'ancienne photo de Rizotto apparaît puis change après quelques secondes

Non diagnostiqué. **Piste la plus probable, à vérifier** : la fiche affiche d'abord la
photo écrite en dur dans `CHEVAUX_FICHE`, puis celle de la base quand `chevalDyn` arrive.
Chercher un affichage qui ne dépend pas de `chevalDyn` avant son chargement.

### 3. Le bouton « Enregistrer » : trois petits points, puis plus rien

**Attention : ce n'est PAS le bug du 22/08**, qui est résolu. Ici les « … » apparaissent,
donc le gestionnaire part et la promesse est lancée. Puis plus rien : **la promesse ne
retombe jamais**, ou elle retombe sans changer l'écran.

**À vérifier en premier :** `enregistrerImportFFE` fait `await utilisateurActuel()` puis un
`select` puis un `insert`. Si l'un des trois pend, l'écran reste sur « … » indéfiniment.
**Il n'y a aucun délai de garde.** Un `Promise.race` avec un délai de 15 s qui affiche une
erreur lisible réglerait la classe entière.

⚠️ Blandine dit aussi être **« coincée sur sa page »**. Non élucidé. Est-ce lié au 1 ?

---

## 🟢 CE QUI MARCHE — ne pas y toucher

**L'import FFE écrit correctement.** Vérifié en SQL le 23/08 à 23h10 sur Rizotto d'Émery :
**49 premières, 81 podiums, 154 lignes**. Les PDF donnent 49 et 81. **La base est juste.**

**Le lecteur de PDF est irréprochable.** Rejoué hors navigateur sur les sept telemat : il
lit **178 lignes**, exactement tout ce que le cheval a couru. `lireClassement` éprouvé sur
quinze formes de victoire, dont toutes celles que PDF.js déforme (`1er / 30`, `1 / 30 er`,
`1 / 13 - SF er`, `1ER / 30`, `1 er / 30`) : les quinze passent.

**La page des résultats** (panneau `palmares` de la fiche cheval) : tuiles carrées,
épinglés en tête, rangées par saison, punaise en haut à gauche, format en bas à droite.
Rendue hors navigateur, 127 nœuds.

**La vidéo d'aide** est branchée en bas de l'écran d'import, muette, en boucle, plein écran
au tap.

---

## LES CHIFFRES DE RIZOTTO — la référence

Comptés sur les sept PDF, à opposer à tout ce que l'app affiche :

| | |
|---|---|
| lignes dans les PDF | 230 |
| **a couru (parcours)** | **178** |
| — classés | 166 |
| — éliminés + abandons | 12 |
| n'a pas couru (37 forfaits + 15 annulées) | 52 |
| **victoires** | **49** |
| **podiums** | **81** |
| **sorties** (week-end groupé) | **94** |
| en base au 23/08 23h10 | 154 |

**Il manque ~24 lignes**, dont les 12 éliminés. Le module corrigé en session 156 les envoie
désormais : **Blandine doit réimporter les sept saisons en choisissant « Tous ses
résultats »**. Elle a commencé, ça bloque (problème 3).

---

## LES PIÈGES APPRIS — ne pas les repayer

🟥 **`node --check` ne prouve RIEN.** En session 155, une fonction `grille` a été supprimée
par un remplacement de bloc trop large. La syntaxe était parfaite, l'app tombait sur la
fiche cheval. Trois livraisons sont passées sans que ça se voie.

🟥 **La parade, posée en session 157 : EXÉCUTER la page avant de livrer.** Un banc extrait
le bloc tel quel de `index.html`, simule `h`, `T`, `tA`, les faits, et rend l'arbre. Voir
`page_extraite.js` dans la méthode. **C'est le seul contrôle qui attrape ce genre de bug.**

🟥 **Le nom `grille` existe DEUX FOIS dans `index.html`** (page des résultats, et réglages
ligne ~47196). Ne jamais se fier à la portée.

🟥 **Un commentaire n'est pas un contrat.** Dans `hype-import-ffe.js`, la règle « enregistre
TOUT, le filtre ne décide que de l'affichage » était écrite au-dessus d'un code qui faisait
exactement l'inverse, depuis le début.

🟥 **Toute maquette de couleur doit être PLEIN ÉCRAN.** Le navigateur intégré d'iOS a un
fond `#151515` qui borde l'échantillon et fausse complètement le jugement. Blandine a cru
vouloir changer son noir : au relevé au pixel, le noir qu'elle avait entouré était
`#060709`, celui qu'elle avait déjà.

🟥 **Un élément `position: fixed` ne doit pas vivre dans un sous-arbre rogné.** Trois
tentatives ont échoué tant qu'on cherchait *quel* ancêtre fautait.

🔴 **Les plafonds silencieux mentent.** `limit(60)` sur la fiche cheval a fait afficher
« 2 victoires » pendant des heures alors que la base en contenait 49. Chercher les `limit()`
avant d'accuser les données.

---

## LES DÉCISIONS DE BLANDINE — non négociables

🟥 **Le quart est DONNÉ par la FFE. On le lit, on ne le calcule JAMAIS.**

🟥 **Éliminés et abandons COMPTENT.** Ils arrivent décochés, en gris italique, mais ils sont
enregistrés.

🟥 **Forfaits et épreuves annulées ne s'affichent pas** : le cheval n'a pas couru.

🟥 **ON ENREGISTRE TOUT.** Les coches ne pilotent que la colonne `visible`.

🟥 **Une sortie = un déplacement.** Même concours, jours consécutifs = **une** sortie. Un
week-end compte pour un. (Le compteur est écrit, il donne 94 sur les vraies données.)

🟥 **Les épinglés ouvrent la fiche.** Rien d'épinglé → les 7 meilleurs calculés comme avant.
Des épinglés → ils passent devant, les meilleurs remplissent jusqu'à 7. Un épinglé **quitte
sa saison**, il n'apparaît jamais deux fois.

🟥 **Le rail de flots (`c.flots`) de la fiche cheval est INTOUCHABLE.**

🟥 **Le diplôme de Galop : à 100/100 seulement.** Le quiz est refaisable, le but est
qu'elles finissent par savoir leur théorie. **Aucune mention de la FFE** — Hype n'est pas
habilitée, la ligne a été retirée. Pas de numéro. La note s'affiche en mention discrète.
**Maquette seule, rien n'est codé.**

---

## LES CHOIX DE CLAUDE — à valider, ce ne sont PAS ses décisions

- **plafond à 7 épinglés**, aligné sur le plafond de la fiche
- **ordre des épinglés** : celui de la pose
- **format automatique** : une victoire sur 40 partants ou plus passe en pleine largeur
- **`limit(500)`** sur la requête de la fiche
- **le barème du mérite** : `2/place + part des battus + log(partants)`

---

## LES DÉCISIONS DE DESIGN PRISES CETTE SESSION

- **Filigrane du cheval retiré** de tous les écrans (`PHOTOS.watermark = null`)
- **`COLORS.nuit` = `#060709`** (était `#12161C`) — validé, ne pas y revenir
- **Barre du bas** : `#172D41` → `#0A0E12`, le bleu relevé à la pipette dans la coupe
- **Onglets du palmarès** : même bleu
- **Tuile de résultat** : « La Fraction » — place en grand, le mot PLACE, « sur N partants »
- **Vidéo d'aide** : centrée, 280 px, couverture « poney + coupe », tout en bas de l'écran
- ⏳ **Le turquoise `#20D9F5` paraît néon** depuis que le fond est noir profond. Une planche
  de cinq bleus a été faite (`maquette-bleus-et-fonds.html`), **Blandine n'a pas tranché.**

---

## COMMENT TRAVAILLER AVEC BLANDINE

- **Une seule question à la fois.** Elle est sur un iPhone.
- **Dire ce qui est VU dans le code et ce qui est DÉDUIT.** Jamais confondre.
- Elle **dicte** : orthographe phonétique, mots déformés. **Demander plutôt que supposer.**
- Chez elle, **« ok » veut dire « vas-y »**.
- **Signaler immédiatement** toute erreur, tout échec, tout doute. Aucune réparation
  silencieuse.
- **Livrer le SUIVI à chaque livraison**, sans qu'elle le demande.
- Ne jamais décider à sa place : présenter, attendre.
- ⚠️ **Elle pousse elle-même** sur GitHub depuis son iPhone. Toujours dire **quels** fichiers
  pousser, et **s'ils vont ensemble**.
- **Pas de formule de politesse liée à l'heure.** Finir sur le travail.

---

## LE RESTE, PAR PRIORITÉ

1. 🔴 **la barre du bas** (problème 1) — inspecter en direct, ne plus deviner
2. 🔴 **le bouton Enregistrer bloqué sur « … »** (problème 3) — poser un délai de garde
3. 🔴 **« coincée sur sa page »** — non élucidé
4. 🔴 **la photo qui change après coup** (problème 2)
5. **réimporter les sept saisons** — 24 lignes manquantes, dont les 12 éliminés
6. **le diplôme** : maquette faite, à recentrer (le milieu est vide), note `100/100` à
   ajouter, puis à coder si elle valide
7. **le turquoise** : planche faite, choix en attente
8. **`hype-resultats.js` reste neutralisé** — la page a été refaite en React dans l'index,
   le module n'a pas été ressuscité. `?v=1` figé, même défaut de cache que l'import.
9. **`sw.js`** ne déclare aucun des modules → pas de hors-ligne
10. **les cadenas Premium** : s'affichent pour une modératrice, et n'empêchent rien —
    **faille**, jamais traitée
11. **Aurélie** : abonnement sur `a.bussonnais@outlook.com`, elle utilise
    `au.bussonnais@gmail.com`. Non tranché.

---

## PRÉPARATION FLUTTER

Sept fonctions pures ont été créées cette session, toutes sans dépendance à React ni au
DOM : `faitsPalmares`, `epinglesPalmares`, `meilleursPalmares`, `meriteResultat`,
`courtEpreuve`, `reparerAccents`, et le compteur de sorties. Elles se simulent en dix
lignes — c'est ce qui a rendu possible le banc d'essai qui a attrapé deux bugs avant
livraison.

**Elles vivent toutes dans le composant `EcranCheval`, qui gonfle.** Un module
`palmares.js` détachable, sur le modèle de `hype-stories.js`, est le prochain geste
naturel. **Non fait, aucun feu vert.**
