# 🚨 PASSATION — 25/08/2026, 02h00
## Nuit du 24 au 25 · import FFE, bloc vidéo, origines · à reprendre à froid

---

## 🟥 LIRE CECI EN PREMIER

**Blandine a travaillé jusqu'à 2 h du matin.** La session a beaucoup avancé et s'est terminée
sur **deux incidents** : une page de palmarès qui se comporte mal, et un écran blanc de
**quatre minutes** au premier chargement chez son fils.

**L'app est debout.** Elle a republié un ancien déploiement Netlify. Ne pas repartir dans la
panique : lire les deux incidents ci-dessous avant de toucher quoi que ce soit.

**Les adresses :**
- **Hype** → `https://2hype.netlify.app`
- **Linguae** → `https://majestic-melba-997a68.netlify.app`

⚠️ **Netlify, pas GitHub Pages.** Chaque poussée déclenche un redéploiement. Le tableau de
bord, onglet **Deploys**, permet de republier n'importe quelle version en un clic — c'est le
retour arrière d'urgence, et il a servi cette nuit.

---

## 📦 CE QU'IL FAUT POUSSER — ÉTAT EXACT

### ✅ À pousser maintenant, seul

| fichier | md5 | quoi |
|---|---|---|
| `index.html` | `c3a40ea7c12f0a9edb5c1fcc0d90bc46` | tout le travail de la nuit **SAUF le bloc vidéo** |

⚠️ **Il appelle `hype-stories.js?v=20`.** Si ce fichier n'est pas déjà en ligne dans sa
version du 24/08, le pousser AVEC.

| `hype-stories.js` | `62987f05dbed085b31bef4dbad597f55` | halo des stories adouci |

### ⏸️ Prêts mais EN ATTENTE — ne pas pousser tant que le bloc n'est pas repositionné

| fichier | md5 |
|---|---|
| `palmares-video.mp4` (1,35 Mo) | `8743e068570fa4e07d8efa676a82e08a` |
| `palmares-video.jpg` | `c8117605d605fc832c1cccab38df8f06` |
| `aide-import-2.mp4` (0,93 Mo) | `3ee3c0dcf8bafd53220d669cbb9c6004` |
| `hype-origines.js` | `f1586e9f77f449b8858c257bdc898eb9` |

`hype-origines.js` **n'est appelé par aucune balise** : le pousser ne change rien, ne pas le
pousser ne casse rien.

### 📄 Les deux SUIVI, à déposer dans leurs dépôts respectifs

`SUIVI.md` (`dbb88659…`) → Hype · `SUIVI-LINGUAE.md` (`117713270…`) → Linguae

---

## 🔴 LES DEUX INCIDENTS OUVERTS

### 1. L'écran blanc de quatre minutes — LE PLUS GRAVE

Le fils de Blandine n'a pas pu lancer Hype : **écran blanc pendant quatre minutes**, puis
l'app s'est ouverte normalement.

🟥 **Ce n'est PAS un plantage, c'est le temps de chargement.** Vérifié : les seize scripts en
ligne de l'index passent `node --check`, aucune faute de syntaxe.

**La cause, vue dans le code** : l'index appelle **plus de cent vingt fichiers
`hype-images-*.js`**, chacun contenant des images encodées en texte. **Tous partent au
démarrage**, avant le premier pixel.

**Pourquoi c'est urgent** : c'est la PREMIÈRE visite qui coûte quatre minutes. Ensuite le
navigateur garde tout. Mais **chaque nouvelle cavalière vit ça** — quatre minutes de blanc
avant de voir Hype, c'est une inscription perdue sur deux.

**Deux pistes, à traiter séparément :**
- **`sw.js` ne déclare aucun module** (déjà point 9 de la passation du 24/08). Il pourrait
  mettre l'app en cache dès la première visite et afficher quelque chose au lieu du blanc.
- **Charger les images à la demande.** Les affiches du Galop 4 n'ont pas besoin d'être là
  pour ouvrir l'accueil.

⚠️ Ne pas confondre avec un bug : l'app finit par s'ouvrir. C'est un problème de POIDS.

### 2. La page du palmarès se comporte mal

Mots de Blandine : « tout est disposé n'importe comment, tu cliques sur un truc pour le mettre
en grand, il se referme ; des fois il s'ouvre en grand mais il n'a pas la même taille que les
autres et puis il se referme quand même ; tu essayes d'en fermer un, il se rouvre. »

**Enregistrement d'écran fourni** (01h23) : la page défile, tuiles « La Fraction » par saison.

🟥 **NON DIAGNOSTIQUÉ. Elle n'avait pas testé cette page avant la livraison** — impossible de
savoir si c'est nouveau. **Ne pas coder au jugé.**

**Ce qui a été fait** : l'index livré (`c3a40ea7…`) a le bloc vidéo **retiré**, pour isoler.
**La question à poser en premier : est-ce que la page se comporte encore comme ça sans le
bloc ?** Si oui, le défaut préexistait. Si non, c'est le bloc.

**Ce que décrit Blandine ressemble à un état qui se réécrit à chaque rendu** — une tuile
ouverte dont l'état est perdu ou recalculé. Piste, pas certitude.

---

## 🟥 MA FAUTE DE LA NUIT — le bloc vidéo est au mauvais endroit

Le bloc découverte (vidéo + phrase + bouton) a été posé **à la fin du panneau `palmares`**,
c'est-à-dire **tout en bas de la page complète, après les 144 résultats**. Il faut dérouler
toute la liste pour le voir.

**Les maquettes validées le montraient sous le résumé « et 141 autres » de la fiche cheval.**

**Cause** : j'ai enveloppé le bloc autour du bouton « Importer mes résultats » existant sans
vérifier sur quel écran ce bouton vivait. **Le banc ne pouvait pas l'attraper** : il vérifiait
le CONTENU du bloc, jamais sa PLACE dans la page. Leçon à retenir.

**Le fichier avec le bloc est conservé** sous `index-avec-bloc.html` côté atelier. Le bloc est
prêt et éprouvé, il n'y a que sa position à corriger.

---

## 🟢 CE QUI EST FAIT, ÉPROUVÉ, ET DANS L'INDEX LIVRÉ

**Le délai de garde sur l'enregistrement.** Trois gardes de 15 s (session, lecture, écriture),
chacune nomme l'étape qui pend. Le bouton « Enregistrer » ne peut plus rester sur « … »
indéfiniment. Démontré : le module d'import est irréprochable, donc « … » sans fin ne pouvait
venir que d'une promesse qui ne retombe jamais. **10 essais au banc.**

**Les quatre compteurs de la fiche.** Ils affichaient 51 · 84 · 147 au lieu de 49 · 81 · 144.
Cause trouvée : trois lignes de palmarès **écrites en dur dans `CHEVAUX_FICHE`** (Bordeaux ×2,
Open de France) qui doublonnaient avec l'import. **Décision de Blandine : elles restent sur la
page, elles sortent des compteurs.** Deux listes désormais : `faits` (ce qui s'affiche),
`faitsComptes` (ce qui se compte). **7 essais au banc.**

**La carte des clubs** (page Communauté) : « 131 clubs en France » retiré, et le titre
« CARTE DES CLUBS » écrit à l'intérieur de la carte retiré aussi — il doublait le titre de
section. ⚠️ Le titre de section est intact (`titreSec`, six langues) : un `grep` sur les
capitales renvoie zéro parce que le libellé est en minuscules dans le code.

**Le halo des stories** (`hype-stories.js`) : opacité 0,14 → 0,09. 🟥 La couleur suivait DÉJÀ
la teinte via `tA()` — Blandine la croyait figée en turquoise. 🟥 Règle du module :
**« plus léger » = baisser l'OPACITÉ, jamais toucher à la géométrie.**

**Les deux vidéos**, nettoyées et allégées : 12,3 Mo → 1,35 Mo et 11,8 Mo → 0,93 Mo. Filigrane
« Ai » effacé sur les deux, numéros de scène effacés sur la première.
🟥 **NE JAMAIS réutiliser le détecteur de ronds sur la seconde vidéo** : il prend la crinière
et l'œil de la mascotte pour des ronds de scène. 33 fausses détections vérifiées.

**`hype-origines.js`** — lecteur d'identité et d'origines, fonction pure, **24 essais sur les
deux vrais PDF**. Lit race, date de naissance, robe, sexe, taille, père, mère, naisseur.
🟥 Une seule source écrite (`ffe-cavalerie`). FFE SIF, FFE Compet, Haras SIRE, international
sont **déclarés mais vides** — ils refusent d'inventer. **Il faut un vrai fichier de chacune.**

---

## LES DÉCISIONS DE DESIGN DE LA NUIT — non négociables

🟥 **AUCUN BOUTON REMPLI.** Pas d'aplat de couleur pleine largeur. Un bord ou un liseré, et un
mot. Vu en crimson : le pavé écrase l'écran.

🟥 **LA TEINTE EST UN ACCENT, PAS UNE MATIÈRE.** Un seul point de couleur par écran, sur ce
qu'on touche.

🟥 **LES LISERÉS SUIVENT LA TEINTE DE LA FICHE.** Ils restaient dorés en crimson — corrigé.

🟥 **L'ENCART DES RÉSULTATS SE REFERME** après « et N autres », fond ET liseré. Ce qui suit se
pose sur le noir de la page.

🟥 **L'IPO PASSE AU-DESSUS DU RAIL DE COUPES.** Le rail descend contre les résultats. Le rail
lui-même est inchangé — seulement sa place, avec l'accord explicite de Blandine.

🟥 **La phrase retenue** : *« Tes résultats officiels, à redécouvrir sur Hype. »* — écriture
n° 8 sur treize proposées : **Cormorant italique entre deux filets courts, AUCUNE couleur.**

🟥 **Le libellé du bouton** : « Importer mes résultats **officiels** » — « importer » seul
pouvait se lire comme « saisir à la main ».

🟥 **La vidéo et la phrase sont une VITRINE** : visibles par tout le monde. Seul le bouton est
réservé à la propriétaire. **Rien à la place du bouton pour une visiteuse.**

🟥 **« + Ajouter un résultat » retiré du bas** : deux boutons « + » existent déjà au bout du
rail (`addres`, `addres2`).

---

## LES PIÈGES DE CETTE NUIT — ne pas les repayer

🟥 **Un banc qui vérifie le CONTENU ne vérifie pas la PLACE.** Dix-neuf essais passaient sur un
bloc posé au mauvais endroit. Vérifier dans quel panneau on écrit AVANT d'écrire.

🟥 **`node --check` ne prouve toujours rien** — mais il a servi cette nuit à écarter une piste
(l'écran blanc n'était pas une faute de syntaxe). Savoir ce qu'il prouve et ce qu'il ne prouve
pas.

🟥 **Chercher un mot sous plusieurs formes avant de dire « je ne trouve pas ».** J'ai affirmé
à Blandine que les adresses n'étaient nulle part : elles étaient dans le SUIVI, 29 fois, sous
`2hype.netlify.app`. J'avais cherché « github.io ». Faute signalée et corrigée.

🟥 **Une image de couverture sur toute vidéo.** Sans elle, un carré noir si la lecture
automatique est refusée.

🟥 **Toute modification d'un module DOIT incrémenter son `?v=`.** `hype-stories.js` est passé
en `?v=20` cette nuit.

---

## 🟡 LES IDÉES DE BLANDINE — notées, rien de codé

Le détail complet est dans `SUIVI.md`, à la fin. En résumé :

**Un cheval, plusieurs cavalières.** Une seule fiche, un grand encart par cavalière (sa photo,
son palmarès, ses albums). Reconnaissance par **nom rapproché dans un même club**, puis
**question posée à la création**. 🟥 **La question ne nomme personne** — dire « monté par X »
créerait des jalousies dans un club.

**L'import remplit aussi l'identité et les origines.** Tout est déjà dans les PDF. Proposé,
jamais imposé. Ne remplit que les cases vides. **Pas de SIRE dans ces pages.**

**Une seconde source pour celles qui ne font pas de concours** — la page des origines. Angle
mort relevé par Blandine : toute l'app est dessinée pour celles qui sortent.

**Un tampon « officiel »** sur les résultats importés — maquette livrée, choix jamais fait.

**Les flots et les coupes dans la sellerie de Linguae** — voir `SUIVI-LINGUAE.md`, bloc rouge
« LE PONT HYPE ↔ LINGUAE ». Linguae part sur l'App Store en premier.

---

## COMMENT TRAVAILLER AVEC BLANDINE

- **Une seule question à la fois.** Elle est sur un iPhone.
- **Dire ce qui est VU dans le code et ce qui est DÉDUIT.** Jamais confondre.
- Elle **dicte** : orthographe phonétique, mots déformés. **Demander plutôt que supposer.**
- Chez elle, **« ok » veut dire « vas-y »**.
- **Signaler immédiatement** toute erreur, tout échec, tout doute. Aucune réparation
  silencieuse. Elle le prend bien et ça fait gagner du temps.
- **Livrer le SUIVI à chaque livraison**, sans qu'elle le demande.
- **Ne jamais décider à sa place** : présenter, attendre. Elle tranche vite et bien.
- ⚠️ **Elle pousse elle-même** depuis son iPhone. Toujours dire **quels** fichiers pousser et
  **s'ils vont ensemble**.
- **Pas de formule de politesse liée à l'heure.** Finir sur le travail.
- Quand elle demande des propositions, **en donner six ou sept, numérotées**, avec ce que
  chacune privilégie — elle choisit par numéro et c'est très efficace.

---

## LE RESTE, PAR PRIORITÉ

1. 🔴 **L'écran blanc de quatre minutes** au premier chargement — le plus grave, il coûte des
   inscriptions
2. 🔴 **La page du palmarès** — demander d'abord si le défaut persiste sans le bloc
3. 🔴 **Repositionner le bloc vidéo** sous le résumé de la fiche, pas en bas du palmarès
4. **L'écran d'import** : y brancher `aide-import-2.mp4` et « Comment préparer mon fichier ? »
   ⚠️ remplacer le fichier sous le même nom ne suffira pas — cache
5. **Le menu photo de l'écurie perso** : `choisirPhotoEcurie` applique la photo BRUTE, sans
   passer par `hypeRecadrer`, contrairement à la fiche cheval. Blandine veut le même. Vérifié
   dans le code, non corrigé
6. **Brancher `hype-origines.js`** à l'écran de relecture — attend une maquette
7. **Les places `1ᵉʳ` / `3ᵉ` en or** sur une fiche crimson — à confirmer
8. **Le tampon « officiel »** — maquette livrée, choix en attente
9. **La barre du bas** qui se plante au milieu de l'écran — toujours ouvert depuis le 24/08,
   jamais inspecté en direct
10. **Le quart calculé** quelque part (« quart incohérent : la FFE dit 4e, le calcul donne
    3e ») alors que la règle interdit de le calculer
11. **« quart 1e »** au lieu de « 1er » sur l'écran de relecture — cosmétique
12. **La photo de Rizotto qui change après coup** — même racine probable que les compteurs :
    la fiche en dur s'affiche avant que la base arrive
13. **Les cadenas Premium** : s'affichent pour une modératrice et n'empêchent rien — faille
14. **`hype-resultats.js` reste neutralisé** · **`sw.js`** ne déclare aucun module

---

## PRÉPARATION FLUTTER

`delaiDeGarde`, `faitsComptes` et tout `hype-origines.js` sont des fonctions pures, sans React
ni DOM, testables en dix lignes. La séparation `faits` / `faitsComptes` est le premier endroit
du code où **ce qui s'affiche** et **ce qui se compte** sont deux objets distincts — c'est la
frontière que le futur module `palmares.js` devra porter.

**Trois bancs existent et doivent être rejoués à chaque livraison :** `banc.js` (délai de
garde), `banc-compteurs.js`, `banc-bloc.js`, `banc-origines.js`.
