# SUIVI HYPE LINGUAE

> Le journal de Hype Linguae (`lingo.html` et ses fichiers satellites : `lingo-globe.html`,
> `lingo-collection.html`, `hype-lingo-lex-*.js`, `hype-lingo-villes*.js`) vit **ici**,
> séparément du `SUIVI.md` partagé avec `index.html`.
>
> **Pourquoi ce fichier existe** (6 août 2026) : trois sessions Linguae d'affilée ont
> disparu du `SUIVI.md` partagé, écrasées par des écritures concurrentes de la
> conversation qui travaille sur `index.html` au même moment. Le `SUIVI.md` documente
> lui-même deux précédents du même problème, les 16 et 28/07 — ce n'est pas un
> incident isolé, c'est un défaut de structure : deux pages codeuses différentes
> (`lingo.html` et `index.html`) partageant un seul journal séquentiel.
>
> **La règle change donc, pour Linguae seulement** : ce fichier-ci est la source de
> vérité pour tout ce qui touche `lingo.html` et ses satellites. Le `SUIVI.md` partagé
> garde son historique déjà écrit (dont d'anciennes sessions Linguae, avant ce jour) et
> reste la source pour `index.html` — mais ne reçoit plus de nouvelles sessions Linguae.
>
> **Règle de reprise, comme dans le SUIVI partagé** : ne jamais conclure qu'un travail
> n'est pas fait sur la seule lecture de ce fichier — vérifier l'index réel
> (`lingo.html`) par recherche exhaustive avant de conclure à un manque.

---

## 🏟️ SESSION 107 · LINGUAE (06/08) — LES DEUX IMAGES DE ROME FABRIQUÉES

Blandine envoie une vue de Rome au couchant (1086×1448, le Tibre, la coupole, le Colisée). Les deux fichiers manquants en ont été tirés, **aux conventions mesurées sur les cartes déjà en place** plutôt qu'à vue de nez.

- **`carte-rome.webp`** — 900×1200, comme les six autres cartes. 65 Ko.
- **`fond-rome.webp`** — 420×560, flou gaussien puis assombrissement **calibré par mesure** : la luminance moyenne des fonds existants est de 39 à 43, celle de Rome est descendue à 40,1 en cherchant le facteur par itération (0,70). 1,5 Ko, exactement le gabarit des autres.

✅ Vérifié en rendu réel : la carte du carnet charge `fond-rome.webp`, l'écran d'arrivée joue `arrivee-rome.mp4` et affiche la carte postale (le repli « Carte à venir » ne se déclenche plus). Rome est complète.

### ⚠️ Une remarque de direction artistique, pas un défaut
**La carte de Rome ne montre aucun cheval.** C'est la seule des sept dans ce cas — La Baule, Le Morne, Warendorf, Séville, Vejer, Aix-la-Chapelle et Lamotte en ont toutes un au premier plan. La bible dit « le cheval est toujours le héros ».
C'est défendable pour Rome, dont le sujet est justement la ville qui contient un jardin où l'on saute. Mais c'est un écart, et il vaut mieux qu'il soit choisi que subi. **Rien changé** : à Blandine de dire si elle veut une version avec un cheval au premier plan.

### Contrôles passés
`verif.py` sur les fichiers touchés · luminance et poids des deux images confrontés aux six cartes et aux quinze fonds existants · rendu réel de l'écran d'arrivée de Rome et de sa carte dans le carnet · aucune erreur JS.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session** — production d'actifs uniquement, aucun code touché.
Un point de méthode toutefois : les deux images ont été calibrées **par mesure sur les actifs existants** (dimensions, luminance moyenne, poids) et non à l'œil. C'est ce qui garantit qu'un fond fabriqué ici se comporte comme un fond fabriqué ailleurs, et c'est reproductible pour les villes suivantes.
**Risques** : nuls.

---

## 🌍 SESSION 106 · LINGUAE (06/08) — LES SIX LANGUES SONT OUVERTES

Blandine : « on devrait les mettre en ligne non ? Indispensable pour choisir de quelle langue à quelle langue. » Elle avait raison, et c'était bien plus proche que « Bientôt » ne le laissait croire.

### ✅ Le moteur était déjà prêt
`cible()` renvoie `VOYAGE_LANGUE`, fixée par la destination choisie, et **tous** les exercices lisent `c.mots[lg]` pour la langue apprise et `c.mots[ui]` pour celle qu'on lit déjà. Le vocabulaire existe dans les six langues dans chaque lexique. Même le cas japonais était traité : `if(t==="ecrire" && lg==="ja") t="ecoute"` — on ne tape pas des kana au haras.
✅ **Les six destinations passent à `ouvert:true`** (dont le français), et leurs descriptions perdent « Bientôt ». Le couple source → cible fonctionne : un cavalier qui lit en espagnol peut apprendre l'allemand.

### ✅ Le filtre de la langue lue
La liste proposait les mêmes cinq langues à tout le monde : un hispanophone se voyait offrir « El español ». `montrerDest()` écarte maintenant la destination dont `lg === langueUI()`. Le filtre est dans la fonction et non dans les données, pour qu'il suive la langue de l'interface si elle change.

### 🔴 Deux défauts qui rendaient l'ouverture impossible, trouvés en la faisant
**1 · Le voyage choisi n'était jamais relu.** `hype_lingua_voyage` était **écrit** dans le localStorage depuis toujours et **jamais relu** : au rechargement, `VOYAGE_LANGUE` retombait sur `"en"`. Invisible tant qu'une seule langue était ouverte — bloquant dès qu'il y en a six : on choisissait l'espagnol, on rechargeait, on revenait à l'anglais. Relecture ajoutée, qui refuse une destination fermée ou égale à la langue lue.
**2 · La maîtrise n'était pas rangée par langue.** Le magasin `hype_lingo_maitrise` était un objet plat indexé par `ref` seul. Correct avec une seule langue, **faux dès qu'on change** : « le poney » su en anglais faisait passer « el poni » pour acquis, et le chapitre espagnol s'ouvrait déjà terminé. Le magasin devient `{en:{…}, es:{…}}`.
✅ **Migration sans perte** : l'ancien format plat est reconnu à ce que ses valeurs sont des nombres, et rangé sous `"en"` — tous les joueurs existants apprenaient l'anglais. `MAITRISE` reste une variable réassignée par `chargerMaitrise()`, donc **aucun autre morceau de code n'a eu besoin de changer**.
⚠️ **Reste ouvert, pour Blandine** : `hype_lingua_quiz` et `hype_lingua_cartes` (les quiz réussis et les cartes postales gagnées) restent **communs à toutes les langues**. Un joueur qui passe à l'espagnol arrive donc avec sa collection déjà remplie. C'est défendable — on a visité la ville — mais c'est une décision de jeu, pas une décision technique. Rien touché.

### 🔴 Un `}` en trop, et une méthode de contrôle défaillante
Mon patch a laissé un `}` en trop dans la description japonaise, et **mon contrôle de syntaxe ne l'a pas vu** : il visait le bloc script d'index 14, alors que l'ajout des deux `<script src>` des nouveaux lexiques avait décalé le bloc inline en 16. Le fichier était cassé et se chargeait sur un écran noir.
✅ Rattrapé par le test de rendu, qui a remonté `Unexpected token '}'`.
✅ **`verif.py` écrit** : il contrôle **tous** les blocs non vides d'un fichier HTML, plus les fichiers .js, et ne dépend plus d'aucun index. C'est ce script qui doit servir désormais.

### ✅ `arrivee-rome.mp4` fabriqué
Reçu en `.mov` HEVC 640×640 avec piste audio et filigrane « CapCut AI ». Converti en H.264 sans audio : **3,46 Mo → 410 Ko**.
⚠️ **Le filigrane n'a PAS été effacé au filtre**, contrairement au Morne : le fond est ici texturé (toits, arbres) et `delogo` laissait des traînées verticales visibles, pires que le filigrane. **Recadré à la place** : le clip perd ses 78 premières lignes, ce qui sort le filigrane du champ. Le panneau ROME reste entier, seule la volute ornementale au-dessus est rognée. Résultat 640×562.
⚠️ Le clip est donc légèrement **paysage** : `ajusterCadrage` le passera en `contain`, comme celui du Morne.

### Contrôles passés
`verif.py` sur les cinq fichiers, tous les blocs · **rendu réel de bout en bout en espagnol** : liste filtrée (cinq entrées, le français caché), choix de l'espagnol, `VOYAGE_LANGUE` et `cible()` à « es », magasin devenu `{"en":{},"es":{"poney":4}}`, **rechargement** conservant la langue et la maîtrise, leçon affichant « reservar · el nivel · principiante · la tarifa » · aucune erreur JS.

### ⏳ Ce qui reste
1. **Les définitions n'existent qu'en français et en anglais** — plusieurs centaines de notes qui expliquent les pièges. Un joueur lisant en allemand les reçoit en français. C'est le seul vrai chantier de l'ouverture, et il se fait chapitre par chapitre.
2. `carte-golega.webp`, `fond-golega.webp`, `carte-rome.webp`, `fond-rome.webp`.
3. `lingua-affiche.webp` et `fond-newmarket.webp` (session 105).
4. Le vocabulaire des sept destinations restantes.
5. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
- **Le paramétrage par langue est validé par l'usage** : ouvrir cinq langues n'a demandé aucune modification d'exercice. C'est la preuve que la frontière « moteur / contenu / langue » tient réellement, et pas seulement sur le papier.
- **Un magasin nommé par dimension** : `hype_lingo_maitrise` passe d'un dictionnaire plat à un dictionnaire indexé par langue, avec migration détectée à la forme des données. Le motif servira pour toute autre dimension à venir.
- **Outil d'abord, correctif ensuite** : `verif.py` remplace un contrôle fragile par un contrôle exhaustif. Le défaut n'était pas dans le code livré, il était dans ma façon de le vérifier.
- **Reste à moderniser** : `hype_lingua_quiz` et `hype_lingua_cartes` ne sont pas dimensionnés par langue alors que `hype_lingo_maitrise` l'est désormais. L'incohérence est assumée le temps que Blandine tranche.
- **Risques** : la migration du magasin de maîtrise touche des données de joueurs existants. Elle a été vérifiée dans les deux sens (ancien format plat lu et rangé sous « en », nouveau format relu après rechargement).

---

## 🖼️ SESSION 105 · LINGUAE (06/08) — LE VIDE DE LA PRÉSENTATION EXPLIQUÉ : DEUX IMAGES MANQUANTES

Blandine : « les pages que je voyais pas en ligne du coup elles apparaissent maintenant ? » Réponse cherchée dans le code plutôt que devinée — et ce n'était pas des pages absentes.

### 🔴 Le grand vide noir au milieu de la présentation
Ce n'est pas un défaut de rendu : `#intro .cit` porte un `margin-bottom: 40vh` **volontaire**, qui ouvre une fenêtre pour laisser voir l'affiche du module avant qu'on descende sur les cinq points. Le vide est noir parce que **`lingua-affiche.webp` n'est pas sur le serveur**.
⚠️ Attention au nom : ce fichier n'est PAS `fond-lingua.webp`. Ce sont deux images différentes — `fond-lingua.webp` (420×560, 2,1 Ko, reçue) sert uniquement à l'écran du Sprint. L'affiche de la présentation est un fichier à part, jamais évoqué jusqu'ici, et jamais produit.

### 🔴 Le fond du carnet de route aussi
`#ouvFondImg` charge **`fond-newmarket.webp` en dur** — et c'est l'un des six fonds manquants (avec Lambourn, Connemara, Hickstead, Kildare, Édimbourg). Le carnet s'affiche donc sur du noir plat au lieu de son ambiance.
⚠️ Le nom en dur est lui-même douteux : le fond de la page d'itinéraire n'a aucune raison d'être celui de Newmarket. À revoir quand l'affiche du module existera, mais rien touché sans demande.

### ✅ Un dernier chiffre, dans le repli HTML
`pt2t` disait encore « Dix-huit destinations » dans le HTML de secours, alors que la table de traduction dit « Une ville, un chapitre » depuis la session 98. Invisible en pratique (T() écrase au chargement), mais c'est la troisième fois que ce fichier porte deux valeurs contradictoires au même endroit. Aligné. **Plus aucun chiffre de destinations dans le fichier**, hors commentaires historiques.

### Ce qui apparaîtra, et ce qui n'apparaîtra pas, après déploiement
Apparaîtront : les cartes du carnet, les niveaux, Rome, Golegã, Le Morne, les huit récits, les cinq villes équipées, les textes sans chiffre.
N'apparaîtront pas tant que les fichiers ne sont pas poussés : l'affiche de la présentation (`lingua-affiche.webp`), le fond du carnet (`fond-newmarket.webp`), les images de Golegã et de Rome, et les six fonds britanniques.

### Contrôles passés
Syntaxe validée · inventaire exhaustif des images attendues par le fichier (`grep` sur tous les `url()`) confronté à ce qui a été reçu · aucun chiffre de destination restant hors commentaires.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session.** Un constat utile toutefois : `fond-newmarket.webp` en dur dans le CSS est le dernier actif média nommé en dehors des tables de données. Tous les autres passent par le `ref` de la ville. Ce serait à sortir dans une variable au même titre que `FIN_VIDEO`.
**Risques** : nuls, un seul mot de texte modifié.

---

## 🇵🇹 SESSION 104 · LINGUAE (06/08) — GOLEGÃ ET L'ÉLEVAGE, CINQ VILLES ÉQUIPÉES, VEJER RATTRAPÉE

### ✅ Golegã, étape 15 — le chapitre de l'ÉLEVAGE
« Golegã c'est toi qui vois tu veux y mettre quoi. » Choix fait : **l'élevage**, parce que c'est le plus gros trou du module. Sur les 378 mots d'origine, **aucun ne parlait de la naissance d'un cheval** : on savait décrire sa robe, ses marques, son corps, mais pas d'où il venait. Le plan de production prévoyait déjà ce vocabulaire pour cette ville — ce choix l'applique plutôt qu'il ne l'invente.

**Nouveau fichier `hype-lingo-lex-elevage.js`** : 12 mots, 4 phrases, 6 langues. L'élevage, le naisseur, la poulinière, la saillie, le poulinage, le sevrage, la lignée, le stud-book, le lusitanien — plus trois **rappels** (`poulain`, `etalon`, `jument`) qui portent le même `ref` que dans `lex-cheval.js`, donc arrivent déjà acquis pour qui a fait Jerez ou Lamotte.

⚠️ **La vente n'est PAS dans ce chapitre**, et c'est écrit dans l'en-tête du fichier : `le marchand`, `l'essai`, `la visite d'achat`, `le prix`, `le contrat`, `la garantie` sont réservés à **Vérone**, et `le yearling`, `les ventes`, `le pedigree`, `la jument suitée` à **Lexington**. Golegã fait naître, elle ne vend pas. Contrôlé par script : aucun de ces mots réservés n'apparaît dans le fichier.
⚠️ **Neuf entrées neuves, jamais relues par un natif.** Les plus à confirmer : `la saillie` (l'anglais sépare « covering » du service et « stud fee » du prix), `le stud-book` (gardé tel quel en français et en italien, traduit en allemand et en espagnol), et `le naisseur`, que l'anglais ne distingue pas de l'éleveur.

Placée **entre Lamotte-Beuvron et Jerez** : on descend de France au Portugal, puis on remonte vers l'Andalousie. Heure 07 h 55. Niveau 2 · situer. `ETAPES`, `ETAPE_SRC`, `NIVEAU_VILLE`, `COLL_NOM`, `ACCUEIL_CHAP`, `POURQUOI`, `RECITS`, `MONDE.golega` (lettre + 3 volets : Le lusitanien · D'où vient un cheval · Si tu y allais), point sur le globe (39,4033 / −8,4869).
⚠️ **Portugal ET Italie ajoutés à `ouvNations`** — l'Italie avait été oubliée lors de l'ajout de Rome.

### ✅ Cinq villes du parcours V1 sont équipées
Reçus et vérifiés : **Warendorf, Séville, Vejer, Aix-la-Chapelle, Lamotte-Beuvron** — carte postale (900×1200), fond (420×560) et clip d'arrivée pour chacune. Plus `arrivee-golega.mp4`.
✅ **Rien à convertir** : les six clips sont déjà en H.264, portrait 456×810, sans piste audio. Format exactement conforme, contrairement au `.mov` HEVC du Morne qu'il avait fallu réencoder.
✅ Vérifié en rendu réel ville par ville : le clip se charge, la carte postale s'affiche (le repli « Carte à venir » ne se déclenche plus), les volets et le récit sont là. **Les villes qui affichaient « Vidéo introuvable » ne l'affichent plus.**

### 🔴 Vejer : deuxième panneau tronqué du projet
Contrôle systématique de la dernière image des cinq clips. Quatre sont propres — WARENDORF, SEVILLA, AACHEN, LAMOTTE tiennent entiers dans le cadre avec de la marge. **Le cinquième non** : « Vejer de la Frontera » est **coupé des deux côtés** dans le fichier, le V à gauche et le A final à droite, sur toute la fin du clip (vérifié image par image de 8,4 s à 10,1 s — aucune image ne le montre entier). Le nom est simplement trop long pour les deux tiers de largeur que la consigne de production impose.
✅ **`FIN_VIDEO.vejer = 7.0`** : on s'arrête juste avant le raccord, sur le cavalier en tenue traditionnelle qui remonte la rue pavée face au soleil. Bien meilleure dernière image qu'un panneau amputé. À retirer le jour où le clip est refait.

### 🔴 Et un vrai défaut du mécanisme d'arrêt, trouvé en le testant
Premier essai posé à 7,4 s : **l'arrêt s'est produit à 7,83 s**, donc sur le panneau tronqué qu'on cherchait précisément à éviter. Cause : `timeupdate` ne se déclenche qu'environ quatre fois par seconde, l'arrêt dépassait la consigne de 200 à 400 ms.
✅ **Recalage ajouté** : après la pause, on revient exactement sur l'image demandée (`currentTime = stop`). L'image finale devient déterministe au lieu d'approximative. Vérifié : Vejer s'arrête à **7,000 s** pile, La Baule à **4,400 s** pile — là où elle s'immobilisait avant à 4,44 s.
⚠️ Ce défaut affectait **déjà La Baule** depuis la session 98, sans conséquence visible parce que la marge y était large. Il aurait mordu sur la première ville dont la consigne serait serrée.

### Contrôles passés
Syntaxe validée sur les trois fichiers · lexique de l'élevage contrôlé par exécution (12 concepts, 4 phrases, zéro entrée incomplète sur 6 langues, japonais découpé en tuiles, aucun mot réservé à Vérone ou Lexington) · `chapVirtuel('golega')` = 12 mots + 4 phrases · **contrôle exhaustif** des 22 villes × 6 langues sur `RECITS` et sur `VILLES` (lettre + 3 volets) : aucune anomalie, hors les dix villes britanniques dont le fichier n'est pas dans cette conversation · rendu réel : carnet, arrivée de Golegã avec son clip, les cinq villes équipées une par une, arrêt de Vejer et de La Baule mesurés au millième · aucune erreur JS.

### ⏳ Ce qui reste
1. **`carte-golega.webp` et `fond-golega.webp`** — le clip est là, les deux images manquent.
2. **Les trois images de Rome.**
3. **Le vocabulaire des sept destinations restantes** : Vérone (la vente), Lexington, Spruce Meadows, Dubaï, Tokyo, Buenos Aires, Tamworth. ~20 mots × 6 langues chacune.
4. **La sécurité** (11 mots prêts) attend toujours une ville.
5. **Le clip de Vejer** à refaire si tu veux son panneau.

### 🧭 Préparation Flutter
- **Troisième ville ajoutée sans toucher au moteur** (Le Morne, Rome, Golegã). Un ajout de ville = des entrées de données et un fichier de lexique. La frontière tient, et elle a maintenant été éprouvée trois fois.
- **`FIN_VIDEO` devient un vrai mécanisme** plutôt qu'un cas particulier : deux entrées, un recalage déterministe, un comportement identique pour toutes les villes. C'est le genre de brique qui se porte telle quelle.
- **Un défaut de synchronisation corrigé à la source** : l'arrêt ne dépend plus de la fréquence d'un événement du navigateur. Moins de dépendance au moteur de rendu = moins à réécrire au portage.
- **Reste à moderniser** : `COLL_NOM`, `ACCUEIL_CHAP` et `ACCUEIL_VILLE` sont trois tables parallèles indexées différemment (par collection, par chapitre, par ville). Elles gagneraient à fusionner en une description par étape. Non fait, pas demandé.
- **Risques** : le recalage de `currentTime` touche toutes les villes ayant une entrée `FIN_VIDEO` — les deux ont été mesurées après coup.

---

## ✍️ SESSION 103 · LINGUAE (06/08) — LES HUIT RÉCITS MANQUANTS SONT ÉCRITS

« Je te laisse juge » — choix fait, et voici pourquoi : les huit villes concernées sont **déjà jouables et déjà en ligne**, alors que les huit destinations planifiées n'ont ni mots ni images. Réparer un trou visible passe avant d'ajouter du contenu par-dessus.
Blandine confirme au passage : **Lamotte garde `poney`.** La sécurité (`arrivee` L2, 11 mots) reste donc en réserve, non attribuée.

### ✅ RECITS passe de 13 à 21 entrées
Écrits pour **Saumur, Lamotte-Beuvron, Jerez, Séville, Vejer, Oliva Nova, Warendorf, Aix-la-Chapelle** — dans les **six langues**, au format exact des treize existants : deux phrases évocatrices puis une note factuelle dans `{f:…}`.

⚠️ **Aucun fait neuf n'a été inventé.** La matière vient des volets déjà écrits et relus dans `hype-linguae-villes-nouvelles.md` — le Cadre Noir et la légèreté, le pura raza española de l'École royale andalouse, le haras d'État de Westphalie, la doma vaquera à une main, la tournée d'hiver d'Oliva, la ration écrite sur la porte à Vejer, les quatre disciplines du CHIO et le barrage au chronomètre, le plus grand parc équestre d'Europe. Le récit ne répète jamais la lettre de la carte postale : il est plus court et se lit sous la vidéo.
⚠️ **Les traductions n'ont pas été relues par un natif.** À reporter dans `hype-linguae-doutes.md`.

### ✅ Le repli reste, mais n'a plus à servir
Le filet posé en session 102 (à défaut de récit, la phrase du « pourquoi ») est conservé : il couvrira la prochaine ville ajoutée avant que son récit soit écrit. Il ne se déclenche plus sur aucune des vingt-et-une villes actuelles.

### 🔴 Deux coquilles de ma main, attrapées avant livraison
- Un **« три »** en cyrillique s'était glissé dans le japonais de Lamotte (« trois adultes »). Trouvé par un balayage de tout le bloc `RECITS` à la recherche de caractères cyrilliques ou grecs — zéro restant après correction.
- Rien d'autre : le contrôle par exécution sur **21 villes × 6 langues** ne remonte aucune anomalie (structure à trois lignes, aucune ligne vide, troisième ligne bien factuelle partout).

### Contrôles passés
Syntaxe validée · contrôle exhaustif par exécution : **126 récits vérifiés** (21 villes × 6 langues), zéro anomalie · rendu réel sur Saumur, Aix-la-Chapelle et Lamotte-Beuvron, plus Saumur en allemand pour vérifier le changement de langue · balayage des caractères étrangers dans tout le bloc · aucune erreur JS · aucune régression sur Rome, Le Morne ni La Baule.

### ⏳ Ce qui reste, par ordre d'utilité décroissante
1. **Cinq jeux d'images du parcours V1** : Warendorf, Séville, Vejer, Aix-la-Chapelle, Lamotte-Beuvron. Prompts prêts dans `hype-linguae-production.txt`. Ce sont des villes jouables qui affichent « Vidéo introuvable ».
2. **Les trois images de Rome** — `carte-rome.webp`, `fond-rome.webp`, `arrivee-rome.mp4`. Elle n'était pas dans les documents de production.
3. **Le vocabulaire des huit destinations suivantes** (~20 mots × 6 langues chacune). Golegã a sa vidéo mais aucun mot : aucune n'est jouable.
4. **La sécurité** (11 mots prêts) attend une ville. Lamotte est écartée.
5. **Les phrases japonaises des lexiques anciens** n'ont pas d'espaces entre les groupes : l'exercice de remise en ordre n'a donc qu'une seule tuile à déplacer. Défaut antérieur, jamais traité.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session** — elle est entièrement de contenu. Un seul point d'architecture confirmé au passage : les huit récits ont été ajoutés sans qu'une ligne de moteur bouge, et le repli de la session 102 s'est révélé exactement au bon endroit pour absorber le manque pendant qu'il durait.
**Risques** : nuls. Rien d'exécutable n'a changé.

---

## 🏛️ SESSION 102 · LINGUAE (06/08) — ROME, ET LE RÉCIT MANQUANT DE HUIT VILLES

### ✅ Une seule page codeuse à partir de maintenant
Blandine a **arrêté les autres conversations** : « tu es la seule à avoir pris le relais dessus ». Le risque d'écrasement croisé qui a effacé trois sessions du SUIVI est donc levé — mais il faut le noter, parce que trois documents reçus aujourd'hui (`hype-linguae-production.txt`, `hype-linguae-production-suite.txt`, `hype-linguae-villes-nouvelles.md`) viennent de ces fils-là et **contiennent des décisions que ce SUIVI ne connaissait pas**.

### ✅ Rome · Piazza di Siena, étape 19
« Rome c'est cool faut garder » · « fais Rome déjà ça c'est sûr ».
Placée **entre Oliva Nova et Warendorf**, pour la suite logique : Oliva apprend à *s'engager*, Rome apprend *les gens*, Warendorf la formation, Aix-la-Chapelle le grand concours. Elle prend **`concours` leçon 4** (le concurrent, le propriétaire, l'entraîneur, le jury, la réclamation, le règlement, la note minimale, le championnat, le trophée, l'esprit sportif) — leçon **libre, vérifiée par calcul sur `ETAPE_SRC`** avant attribution.
- `ETAPES` + `ETAPE_SRC` + `NIVEAU_VILLE` (niveau 2 · situer) + heure **10 h 55** ajoutée à `I18N_H`.
- **`ACCUEIL_VILLE.rome = "gens"`** avec un `ACCUEIL_CHAP.gens` neuf, 6 langues : Rome puise dans `concours` mais n'enseigne pas *s'engager*, le mot d'accueil devait le dire.
- `POURQUOI` et `RECITS` écrits, 6 langues.
- `MONDE.rome` dans `hype-lingo-villes-monde.js` : lettre + 3 volets (Piazza di Siena · La Coupe des Nations · Si tu y allais), 6 langues.
- Nouvelle icône de souvenir **`coupe`** — « Une coupe de Piazza di Siena ».
- Point ajouté au globe : lat 41,9139 / lng 12,4830.
✅ Vérifié en rendu réel : 21 étapes, Rome en 19, `chapVirtuel('rome')` = 10 mots + 1 phrase, carte du carnet (niveau 2 · situer, 10 mots), écran d'arrivée complet (« ARRIVÉE À ROME », chapitre 19, récit, trois volets, souvenir).
⚠️ **Rome ne figure dans AUCUN des documents de production** reçus aujourd'hui : ni dans les cinq villes manquantes du parcours V1, ni dans les huit destinations suivantes. C'est un ajout postérieur. Sa leçon ne prend rien à personne, mais **ses trois images restent à produire** — `carte-rome.webp`, `fond-rome.webp`, `arrivee-rome.mp4`. Les replis les couvrent.

### 🔴 Trouvé en écrivant Rome : HUIT villes n'ont aucun récit
`RECITS` ne contient que 13 entrées sur 21. Manquent : **Saumur, Lamotte-Beuvron, Jerez, Séville, Vejer, Oliva Nova, Warendorf, Aix-la-Chapelle**. Pour elles, `bloc` valait `[]` et `manque` restait faux en français : l'écran d'arrivée **sautait du panneau de la ville directement à la carte postale**, avec un blanc au milieu et rien pour l'expliquer.
C'est **exactement le défaut corrigé pour La Baule en session 95**, resté vivant sur huit villes — invisible jusqu'ici parce que les tests portaient sur les premières étapes.
✅ **Repli posé** : à défaut de récit, on affiche la phrase du « pourquoi », qui existe pour les vingt-et-une villes. Vérifié en rendu sur Saumur : le texte s'affiche au lieu du vide. Un manque de contenu dégrade l'affichage, il ne le vide pas.
⚠️ **Ce n'est qu'un pansement.** Les huit récits restent à écrire (trois lignes × 6 langues chacun). À faire, mais c'est un chantier de contenu, pas un correctif.

### 📋 Ce que les documents reçus changent pour la suite
- **Le parcours V1 attend encore cinq jeux d'images** : Warendorf, Séville, Vejer, Aix-la-Chapelle, Lamotte-Beuvron (prompts prêts dans `hype-linguae-production.txt`).
- **Huit destinations suivantes sont planifiées** avec prompts : Golegã, Vérone, Lexington, Spruce Meadows, Dubaï, Tokyo, Buenos Aires, Tamworth. **Golegã a déjà sa vidéo** (`arrivee-golega.mp4`, reçue aujourd'hui) mais **aucun vocabulaire** — donc aucune n'est jouable : chacune a besoin d'une vingtaine de mots dans les six langues.
- **Vérone porte « acheter et vendre »** (le marchand, l'essai, la visite d'achat, le prix, le contrat, la garantie) : c'est bien le trou identifié plus tôt, et le plan le comblait déjà.
- ⚠️ **La Maremma n'est nulle part** dans ces documents : c'était ma proposition, pas une reprise de la liste. La sécurité (`arrivee` L2, 11 mots) reste donc non attribuée. Dans le plan reçu, c'est **Lamotte-Beuvron** qui est décrite comme « la sécurité et le manège » — à trancher avec Blandine, parce que Lamotte porte aujourd'hui `poney`.

### Contrôles passés
Syntaxe validée sur les trois fichiers · Rome contrôlée par exécution dans les 6 langues (lettre 2 paragraphes, 3 volets titre + corps partout) · rendu réel du carnet, de l'arrivée et du globe · repli de récit vérifié sur une ville sans récit · aucune erreur JS · aucune régression sur Le Morne ni La Baule.

### 🧭 Préparation Flutter
- **Un ajout de ville ne touche plus aucune logique** : Rome n'a demandé que des entrées de données (`ETAPES`, `ETAPE_SRC`, `NIVEAU_VILLE`, `I18N_H`, `POURQUOI`, `RECITS`, `MONDE`, une icône, une ligne de globe). C'est la deuxième ville de suite ajoutée sans modifier une fonction — la frontière contenu/moteur tient.
- **Troisième repli de la même famille** : après la carte postale absente et le fond absent, le récit absent. Les trois suivent maintenant la même règle — dégrader, jamais vider. Cette règle mériterait d'être écrite une fois pour toutes dans la doctrine plutôt que redécouverte à chaque fois.
- **Reste à moderniser** : `ACCUEIL_VILLE` est une table d'exceptions qui grandit à chaque ville composée (5 entrées). Elle devrait devenir un champ de l'étape elle-même. Non fait, pas demandé, risque nul à laisser.
- **Risques** : aucun. Le seul changement de comportement est le repli du récit, qui remplace un écran vide par une phrase.

---

## 🐎 SESSION 101 · LINGUAE (06/08) — LE MORNE CORRIGÉ SUR LE FOND, ET SES TROIS ACTIFS EN PLACE

### 🔴 Je m'étais trompé : on ne desselle pas, on reste en selle
En vérifiant le lieu réel après la livraison de la session 100 : au **Haras du Morne**, l'eau monte **jusqu'à la selle** et le cheval nage **avec son cavalier dessus**. La photo envoyée par Blandine le montre également. Ma première version faisait desseller avant d'entrer et portait le mot « à cru » — c'est une pratique d'ailleurs, pas celle d'ici. Quatre corrections validées par elle, toutes appliquées :

1. **Le mot « à cru » sort du lexique**, remplacé par **`cavalier-confirme`** (le cavalier confirmé / the experienced rider / el jinete experimentado / il cavaliere esperto / der erfahrene Reiter / 経験者). C'est ce qu'il faut vraiment savoir dire là-bas : la baignade dans le lagon est **réservée aux cavaliers expérimentés**, et savoir nager est exigé.
2. **La phrase `ph-balade-cru` devient `ph-balade-confirme`** : « Il faut être cavalier confirmé pour la baignade ? », 6 langues.
3. **Les définitions de `baignade` et `nager`** précisent qu'on reste en selle et que l'eau monte jusqu'à la selle.
4. **Le volet « Se baigner », la lettre et le récit** sont réécrits en conséquence, 6 langues. Le volet « Si tu y allais » gagne la condition de niveau, la serviette et de quoi se changer.

⚠️ Écrit noir sur blanc dans l'en-tête des deux fichiers : **ne pas réintroduire « à cru » sur cette ville.**
⚠️ À dire si la question revient : le **niveau 1** affiché sur la carte du Morne parle de la difficulté de **langue**, pas d'équitation. Le chapitre reste accessible à un débutant même si la baignade réelle demande un bon cavalier.

### ✅ Les trois actifs du Morne sont là
- **`carte-maurice.webp`** et **`fond-maurice.webp`** : envoyés par Blandine aux bons noms, chargés en rendu réel, la carte postale s'affiche (le repli « Carte à venir » ne se déclenche plus).
- **`arrivee-maurice.mp4`** : fabriqué ici à partir du `.mov` qu'elle a envoyé. Trois choses faites au passage :
  · **HEVC → H.264** (le `.mov` d'origine était en HEVC, que Chrome et Android ne lisent pas de façon fiable ; Safari seul l'aurait joué),
  · **piste audio retirée** (l'élément est muet de toute façon) et recompression : **4,16 Mo → 403 Ko**, à durée et dimensions identiques (752×560, 5,1 s),
  · **filigrane « CapCut AI » effacé** (filtre `delogo`) : il était fixe en haut à gauche, sur du ciel uni, donc l'effacement est invisible. Vérifié sur quatre images réparties dans le clip.
✅ **Aucune entrée `FIN_VIDEO` nécessaire** : contrairement à La Baule, le panneau « ÎLE MAURICE » est **entièrement dans le cadre** à la dernière image. Vérifié.
⚠️ Le clip est en **paysage** (752×560) là où les autres arrivées sont en portrait : `ajusterCadrage` le passe donc en `contain` (bandes noires haut et bas sur fond déjà noir), pas en `cover`. Vérifié en rendu, c'est propre.

### ✅ Corrigé au passage
`lieu` du Morne disait « Le Morne · Maurice », juste sous un titre de carte postale qui affiche déjà « Le Morne » — répétition. Devient **« Rivière Noire · Maurice »**, le district réel, comme « Loire-Atlantique · France » pour La Baule.

### Contrôles passés
Syntaxe validée sur les trois fichiers · lexique contrôlé par exécution : 12 concepts, 4 phrases, **zéro entrée incomplète sur les 6 langues**, plus aucune trace de `a-cru` ni de `bareback` · **rendu réel** : clip du Morne joué jusqu'au bout (5,10 s, dernière image le panneau entier, `object-fit: contain`), carte postale affichée avec sa photo, trois volets ouverts et relus, récit corrigé à l'écran · aucune erreur JS.

### 🧭 Préparation Flutter
- **Aucune modification d'architecture cette session** : elle ne touche que du contenu (lexique, lettre, volets, récit) et un actif média. Les corrections de fond ont été faites *dans les fichiers de contenu*, sans qu'une seule ligne de moteur bouge — c'est exactement ce que la séparation « une ville = un fichier » devait permettre, et c'est la première fois qu'elle est mise à l'épreuve par une correction factuelle.
- **Risques** : nuls côté code. Le seul point de vigilance est éditorial : deux fichiers portent maintenant un avertissement explicite contre la réintroduction de « à cru ».

---

## 🏝️ SESSION 100 · LINGUAE (06/08) — L'ÎLE MAURICE ENTRE DANS LE VOYAGE, ET LES NIVEAUX S'AFFICHENT

### ✅ Le Morne (île Maurice) est l'étape 2
« L'île Maurice devait être ajoutée avec La Baule pour les balades dans la mer, se baigner » · « dans l'idée réserver une ballade » · « mets-la où tu veux, je te laisse l'écrire ».

**L'étape s'appelle LE MORNE, pas « Maurice »** : c'est le lieu réel où l'on monte sur l'île, au pied de la montagne du même nom, et tout le reste du voyage nomme des villes, pas des pays. Le pays devient la nation, comme Lamotte-Beuvron / France.

**Nouveau chapitre `balade`**, dans son propre fichier `hype-lingo-lex-balade.js` (un fichier par ville, principe respecté) : **12 mots, 4 phrases, 6 langues**. Le chapitre s'appelle « la balade » et non « la mer » — ce qu'on apprend, c'est de demander une sortie, pas de nommer un paysage. La Baule apprend à *s'inscrire*, Le Morne apprend à *réserver une sortie et entrer dans l'eau* : la marée, le lagon, se baigner, nager, à cru, l'eau douce du retour.

⚠️ **`balade` est un RAPPEL.** Le mot porte le même `ref` que dans `hype-lingo-lex-arrivee.js` et ses `mots` sont recopiés à l'identique — voulu, comme les six rappels du fichier `poney` : la maîtrise est stockée par `ref`, donc le mot croisé à La Baule arrive ici déjà acquis. Seule la définition change (à La Baule on en réserve une, ici on y est). Le fichier se charge **après** `arrivee.js`.
⚠️ **11 entrées neuves jamais relues par un natif.** Les plus à confirmer : `à cru` (l'italien « a pelo »), `la marée` en japonais, et la distinction allemande `baden` / `schwimmen`. À reporter dans `hype-linguae-doutes.md`.
⚠️ **Le japonais des 4 phrases est écrit AVEC DES ESPACES.** `attendue.split(" ")` découpe la phrase en tuiles à remettre dans l'ordre : sans espaces, il n'y a rien à déplacer. Les phrases japonaises des lexiques plus anciens n'en ont pas — défaut antérieur, non corrigé ici, à traiter séparément.

### ✅ Le cheval juste après, comme demandé
« Tu peux mettre le cheval après. » Le début du voyage devient : **1 La Baule** (s'inscrire) · **2 Le Morne** (la balade) · **3 Connemara** (le cheval) · **4 Newmarket** (l'écurie) · **5 Lambourn** (le pansage) · le reste inchangé.
⚠️ **Les heures ont été réattribuées** pour rester croissantes — seules celles des positions 2 à 5 bougent, tout ce qui suit Walsall est intact. Ce n'est qu'un décor, mais un décor qui se lit.
⚠️ **La sécurité reste en réserve** (`arrivee` leçon 2, 11 mots), non attribuée, pour la ville à venir. Aucune destination choisie.

### ✅ Les niveaux sur les cartes des villes
« On avait dit aussi qu'on mettrait des niveaux par cours » · « on pourrait les renseigner sur les cartes des villes ». Les trois paliers existaient depuis le 5 août (`NIVEAU_VILLE`) mais **ne s'affichaient nulle part**.
- **Devant** : trois petites barres en haut à droite, autant d'allumées que le palier. Sans un mot, pour que la face reste une affiche.
- **Au dos** : « NIVEAU 1 · NOMMER » (6 langues, nouvelles clés `niveauN`, `niveauNom1/2/3`), au-dessus du compte de mots.
⚠️ La table `NIVEAU_VILLE` a été **déplacée plus haut** dans le fichier : le carnet en a besoin dès la construction pour les barres. Données pures + fonction pure, aucune dépendance — vérifié.
⚠️ Le **libellé** du dos, lui, est écrit au retournement et non à la construction : la table de traduction `TXT` est définie plus bas dans le fichier, donc `T()` renvoyait une chaîne vide et le dos affichait un « · » solitaire. Repéré en rendu réel, corrigé, même mécanisme que le compte de mots.

### 🔴 Trouvé grâce au Morne : « ARRIVÉE À LE MORNE »
Le Morne est **la première ville du voyage dont le nom porte un article masculin**, et le gabarit `arriveeA` collait « À » devant sans réfléchir. Nouvelle fonction `versLaVille()` : à + le = **au**, à + les = aux, à + la = à la. Appliquée au français seulement, les autres langues n'ont pas ce problème. Vérifié : « ARRIVÉE AU MORNE » et « ARRIVÉE À LA BAULE ».

### ✅ Deux manques antérieurs réparés au passage
- **`ACCUEIL_CHAP.arrivee` n'existait pas** : `ACCUEIL_VILLE.labaule` pointait sur une clé absente de la table, donc **la première ville du voyage entrait dans sa leçon sans un mot d'accueil** depuis qu'elle est devenue l'étape 1. Écrit, 6 langues, en même temps que celui de `balade`.
- **`ouvNations` était resté à quatre pays** dans les cinq traductions alors que le français en annonçait sept. Les six langues sont à jour, Maurice incluse.

### Fichiers touchés
`lingo.html` · `hype-lingo-lex-balade.js` (**nouveau**) · `hype-lingo-villes-monde.js` (lettre + 3 volets du Morne, 6 langues) · `lingo-globe.html` (Le Morne, lat −20,4547 / lng 57,3186).
⚠️ **Manquent côté dépôt** : `carte-maurice.webp` et `arrivee-maurice.mp4`. Les deux replis les couvrent — « Carte à venir » sur l'écran d'arrivée et dans la collection, « Vidéo introuvable » à la place du clip. `fond-maurice.webp` existe déjà.

### Contrôles passés
Syntaxe validée sur les quatre fichiers · lexique contrôlé par exécution : 12 concepts, 4 phrases, **zéro entrée incomplète sur les 6 langues**, chaque phrase japonaise découpée en au moins 3 tuiles · `chapVirtuel('maurice')` renvoie bien 12 mots + 4 phrases · **rendu réel** : ordre des cartes (La Baule, Le Morne, Connemara, Newmarket…), barres de niveau (1 pour Le Morne, **3 pour Saumur**), dos complet (nom, chapitre, phrase, niveau, compte), écran d'arrivée du Morne (chapitre 2 · La balade, récit affiché, souvenir « Un coquillage du lagon »), leçon ouverte avec son mot d'accueil, globe rouvert · aucune erreur JS.
⚠️ Deux coquilles japonaises de ma main, attrapées en relecture avant livraison : un mot anglais resté dans la phrase du « pourquoi », et un caractère faux pour « selle ». Corrigées et revérifiées.

### 🧭 Préparation Flutter
- **Un fichier par ville, tenu** : le chapitre du Morne n'a rien ajouté aux lexiques existants. La frontière « une ville = un fichier de contenu » reste nette, et le rappel par `ref` prouve qu'on peut partager du vocabulaire sans partager de fichier.
- **Le contenu sort encore un peu plus du code** : `versLaVille()` remplace une concaténation implicite par une règle de langue nommée et testable. Même esprit que `FIN_VIDEO` en session 98.
- **Ordre du voyage = donnée, pas structure** : réordonner `ETAPES` n'a demandé aucun changement de logique, parce que la progression est indexée par `ref`. Vérifié avant d'y toucher, c'est la propriété qui rendra le portage possible sans migration de données.
- **Reste à moderniser** : trois endroits dépendent encore de l'ordre d'exécution du fichier (le compte de mots, le libellé de niveau, le titre de l'itinéraire), chacun avec son propre contournement. Un vrai « chargé / prêt » global les remplacerait tous les trois. Non fait, pas demandé, et chaque contournement est aujourd'hui documenté sur place.
- **Risques** : le déplacement de `NIVEAU_VILLE` a été vérifié (aucun appelant entre l'ancienne et la nouvelle position). Le reste est du contenu et du style.

---

## 🔍 SESSION 99 · LINGUAE (06/08) — LE FLASH DU CHEMIN IDENTIFIÉ SUR LA VIDÉO, LA CARTE À GAGNER RÉTABLIE

### 🔴 Le flash entre « Le tour du monde » et le globe : c'était le CHEMIN
Blandine : « il reste toujours le flash d'une ancienne page entre la page le tour du monde et le globe ». Trouvé en dépouillant son enregistrement image par image (60 i/s) : **entre 4,15 s et 4,25 s, le chemin est intégralement visible** — ses boutons LE GLOBE / LA COLLECTION, la carte postale de La Baule, le bouton SPRINT · 60 S. Environ 150 ms.

**Cause exacte** : `#globe` et `#ouverture` étaient tous deux en `z-index:40`. À rang égal, c'est l'ordre du document qui tranche — et `#ouverture` vient après `#globe`, donc le carnet gagnait. Il fallait donc masquer le carnet AVANT d'ouvrir le globe, et pendant ce laps de temps le chemin, qui est la page de fond, apparaissait. Le `setTimeout(…, 120)` n'était pas le problème : même à zéro, la transition d'opacité du globe (.3 s) aurait laissé voir le chemin au travers.

✅ **Corrigé en deux temps** : `#globe` passe en `z-index:41` (au-dessus du carnet, toujours sous `#ouvFilm` à 42 et `#intro`/`#dest` à 44) · `partirVersGlobe()` ouvre le globe **d'abord** et ne retire le carnet qu'après 340 ms, quand le globe est complètement opaque.
✅ Vérifié par échantillonnage de la transition en rendu réel : le globe atteint l'opacité 1 pendant que le carnet est encore là, puis le carnet passe en `parti`. **Zéro instant où le carnet est masqué sans que le globe soit opaque** — le flash n'est plus possible par construction, pas juste improbable.

### 🔴 La carte à gagner avait disparu de l'écran d'arrivée
« Initialement on avait ajouté la carte à gagner et l'objet à gagner mais floutés sur cette page. » L'objet était bien là ; la carte, non. Cause : `S("pimg").addEventListener("error", … display="none")` — **une image absente du serveur masquait tout le bloc**, titre compris.
✅ Une image manquante n'est plus une raison de retirer la récompense de l'écran. Le cadre reste, la ville se lit, et une mention discrète **« Carte à venir »** (6 langues, nouvelle clé `carteAVenir`) remplace la photo. Si `carte-labaule.webp` existe bien en ligne, rien ne change : l'image s'affiche comme avant, et un `load` réussi retire la classe de repli.
⚠️ Je ne peux pas vérifier d'ici si `carte-labaule.webp` est réellement en ligne — c'est l'hypothèse la plus probable pour expliquer la disparition, mais elle reste à confirmer côté dépôt.

### ✅ « On lit mal » : la règle qui tuait le texte
Trouvé : `#souvenir.apercu .carte{opacity:.5}` s'appliquait à **toute la carte**, texte compris, sur fond noir. « Montrer sans donner » doit se lire sur l'objet, pas sur les mots.
✅ Le voile passe sur **l'icône seule** (`opacity:.4`), le cadre s'atténue légèrement, et le texte revient à pleine opacité : titre en gris clair `#DCE5EC`, étiquette en or clarifié `#E2C878`. Même clarification pour `#arrTete .nation` (la ligne « FRANCE · À L'AUBE »), qui manquait de contraste avec `--or` à .2em de tracking.

### ✅ Deux chiffres de plus, trouvés sur ses captures
L'écran de choix de la langue en portait deux que je n'avais pas vus en session 98, **et ils se contredisaient** : le sous-titre disait « dix-neuf destinations », la ligne de l'anglais « Dix-huit destinations ». Retirés tous les deux (`destSous` → « Une langue, une destination » · la description de l'anglais → « De la côte atlantique à l'Andalousie », 6 langues).

### ⏳ Prochaine session : l'île Maurice
Décisions prises par Blandine, à exécuter : **Maurice s'insère après La Baule**, sur l'idée de **réserver une balade** (mer, baignade) — « mets-la où tu veux, je te laisse l'écrire ». Puis **le cheval** juste après, puis **la sécurité** dans une ville encore à créer (« il en reste une trentaine »).
Reste à écrire : son lexique (~12 mots + 3 phrases, 6 langues), sa lettre et ses 3 volets dans `hype-lingo-villes-monde.js`, son récit, sa phrase de « pourquoi », ses coordonnées globe, son entrée `ETAPES` + `ETAPE_SRC`. `fond-maurice.webp` existe déjà ; `carte-maurice.webp` et `arrivee-maurice.mp4` manquent (le repli « Carte à venir » et « Vidéo introuvable » couvrent l'attente).
⚠️ **Vérifié avant de promettre que le réordonnancement est sans risque** : `FAITS` n'est pas persisté (`var FAITS = 4` en dur) et les magasins `hype_lingua_quiz` / `hype_lingua_cartes` sont indexés **par `ref`**, pas par position. Déplacer des villes dans `ETAPES` ne perd donc aucune progression.

### Contrôles passés
Syntaxe validée · transition carnet → globe instrumentée en rendu réel (aucun instant à risque) · écran d'arrivée vérifié : bloc de la carte présent avec sa mention, souvenir lisible (opacité 1, couleurs mesurées), volets intacts · les deux écrans de textes relus sans chiffre · aucune erreur JS · aucune régression sur les cartes du carnet de la session 98.

### 🧭 Préparation Flutter
- **Empilement rendu explicite** : le rang du globe est désormais une décision écrite et commentée, plus une conséquence de l'ordre du DOM. C'est la même hiérarchie qu'un `Stack` — le jour du portage, l'ordre est déjà documenté.
- **Transitions ordonnées, pas chronométrées à l'aveugle** : `partirVersGlobe()` fait apparaître avant de faire disparaître. Le délai n'est plus là pour espérer, il attend une transition dont la durée est connue.
- **Repli au lieu de disparition** : la carte postale suit maintenant la même règle que la collection et que les cartes du carnet — un actif manquant dégrade l'affichage, il ne supprime pas le contenu. Trois endroits, une seule règle.
- **Reste à moderniser** : les états d'affichage restent portés par des classes CSS (`apercu`, `sansimg`, `parti`, `on`) posées depuis plusieurs fonctions différentes ; un état d'écran unique serait plus sûr. Non fait, pas demandé.
- **Risques** : le changement de `z-index` du globe a été vérifié contre tous les autres calques (arrivée 20, carnet 40, film 42, présentation 44) — aucun conflit. Le reste est du texte et du style.

---

## 🃏 SESSION 98 · LINGUAE (06/08) — LE CARNET EN CARTES, LE CHIFFRE RETIRÉ, LE PANNEAU COUPÉ CONTOURNÉ

Trois demandes de Blandine, toutes validées avant écriture.

### ✅ Les dix-neuf villes deviennent des cartes qui se retournent
« On devait passer les villes en cartes qui se retournent avec la petite phrase et le contenu de leur apprentissage afin que ça soit moins fastidieux. » Le mur de dix-neuf lignes dépliantes est remplacé par une grille 2 colonnes, **même motif de flip que `lingo-collection.html`** (`perspective` + `rotateY(180deg)` + `backface-visibility`), format 3/4.
- **Devant** : le fond de la ville, son numéro en Cinzel turquoise, son nom, son pays.
- **Au dos** : le nom (ajouté — retournée, la carte ne disait plus de quelle ville elle parlait), le chapitre en petites capitales dorées, la phrase du « pourquoi », et en bas **« N mots à apprendre »**.

⚠️ **Le nombre de mots est rempli au premier retournement, pas à la construction.** Le bloc du carnet s'exécute avant que les lexiques et `chapVirtuel` existent (même raison que le `lastI=-1` de la fin du fichier) : demander le compte à la construction renverrait toujours zéro. `remplirApprentissage()` le calcule au retournement, une seule fois par ville, et ne marque rien si le lexique n'est pas encore là — la carte retentera au retournement suivant. Vérifié dans les deux sens : La Baule affiche « 12 mots à apprendre », Connemara reste muette faute de `hype-lingo-lex-cheval.js` dans l'environnement de test.

### ⚠️ Décision de fond prise en cours de route : le flou est une matière, pas une photo
Blandine a envoyé ses 15 `fond-*.webp`. **Mesurés : 420×560 pour 1,3 à 2,1 Ko** — ce sont des flous volontaires, faits pour passer *derrière* du texte. Sur une carte de 170 px de large, ça donne une tache sombre, pas une affiche : la règle « une carte = une affiche avec un sujet identifiable » ne pouvait pas être tenue avec ces fichiers.
✅ Choix validé : le flou est traité **comme de la profondeur** (assombri, remonté en haut de carte) et c'est le nom en Cinzel qui porte l'affiche. Le jour où de vraies photos nettes existent, il suffit de changer le préfixe du fichier et de baisser le voile.
⚠️ **`carte-*.webp` n'est PAS utilisée sur le carnet** — c'est la carte postale, la récompense. La montrer avant le départ grillerait le cadeau. Écrit noir sur blanc dans le code pour que personne ne « corrige » ça plus tard.
⚠️ **Six fonds manquent** sur les dix-neuf : Newmarket, Lambourn, Connemara, Hickstead, Kildare, Édimbourg. Aucun `onerror` à maintenir : un fond absent laisse le dégradé sombre de `.vrec`, ce qui reste une carte présentable (vérifié en rendu).

### ✅ Le chiffre retiré partout
« Tu peux même retirer le chiffre, ça va évoluer. » Trouvé au passage : **il y avait deux valeurs contradictoires en ligne** — le repli HTML disait « dix-huit villes », la table de traduction « dix-neuf ». Retiré des trois endroits : le repli HTML, `ouvIntro` (6 langues, le texte attaque maintenant sur « Pas les capitales politiques »), et `pt2t` qui devient **« Une ville, un chapitre »** (6 langues). Plus rien à mettre à jour à chaque ville ajoutée.

### 🔴 La vidéo de La Baule : le panneau est coupé DANS LE FICHIER
« La vidéo d'arrivée s'arrête sur le panneau coupé, tu peux régler ça ? » Mesuré image par image : `arrivee-labaule.mp4` fait 456×810, 5,1 s, et **de 4,6 s à 5,1 s toutes les images montrent « A BAUL »** — le L et le E ne sont nulle part dans le fichier. Aucun cadrage CSS ne peut les faire revenir ; ce que montrait l'aperçu iOS était déjà l'image entière.
À noter quand même : dans l'app, `#vue` fait 52svh, donc le recadrage rogne le **haut et le bas**, pas les côtés — on ne perdait rien de plus que le fichier.
✅ Choix de Blandine : **finir à 4,4 s sur le cheval en l'air**. Nouvelle table `FIN_VIDEO = { labaule: 4.4 }`, appliquée par un écouteur `timeupdate` posé seulement si la ville a une entrée. Vérifié en rendu réel : arrêt à 4,44 s, vidéo en pause, dernière image = le cheval au-dessus de l'obstacle. **À retirer le jour où la vidéo est refaite** avec le panneau cadré entier.

### ⏳ En attente d'elle : l'île Maurice et la place du chapitre « le cheval »
« L'île Maurice devait être ajoutée avec La Baule pour les balades dans la mer, se baigner » — d'où `fond-maurice.webp`, qui n'est donc pas un intrus. « Le cheval, ça devait être la suite du chapitre de La Baule. »
État réel de la répartition : étape 1 La Baule (`arrivee` 1) · 2 Newmarket (`ecurie` 1) · 3 Lambourn (`pansage` 1) · **4 Connemara (`cheval` 1)** · 14 Jerez (`cheval` 4). Les leçons 2 et 3 de `cheval` sont donc **libres en réserve**.
Ce qu'il reste à trancher : Maurice porte-t-elle une leçon de `cheval` (rien à écrire, insertion immédiate après La Baule) ou son propre lexique de la mer (« la baignade », « nager », « le lagon », « le sable » — ~12 mots + 3 phrases à écrire en 6 langues) ? Et faut-il déplacer `cheval` en étape 2 ? **Rien touché à la répartition** : c'est une décision de programme.
Pour qu'une ville existe, il lui faut de toute façon : lexique, lettre + 3 volets dans `hype-lingo-villes-monde.js`, récit, phrase de « pourquoi », coordonnées globe, carte postale, vidéo d'arrivée. Le fond, lui, est déjà là.

### Contrôles passés
Syntaxe validée · rendu réel 390×844 : 19 cartes affichées, fond chargé quand le fichier existe et dégradé propre quand il manque, retournement testé sur plusieurs cartes, dos complet (nom + chapitre + phrase + compte), arrêt vidéo à 4,44 s, textes sans chiffre dans les deux écrans · aucune erreur JS · aucune régression sur la séquence d'ouverture de la session 97 (film → carnet → globe rejoué).
⚠️ Le Chromium de test n'a pas H.264 : essais sur copies VP9 des deux vidéos, mêmes durées. Deux lexiques seulement étaient présents en local (`arrivee`, `villes-monde`), d'où les compteurs vides sur les autres villes — comportement attendu, pas un défaut.

### 🧭 Préparation Flutter
- **Données sorties du code** : `FIN_VIDEO` remplace ce qui aurait été une constante en dur dans `ouvrirArrivee`. Une ville = une entrée ; la logique de lecture ne connaît aucun cas particulier.
- **Calcul différé au lieu d'ordre de chargement** : `remplirApprentissage()` supprime une dépendance implicite à l'ordre d'exécution du fichier (le carnet n'a plus besoin que les lexiques existent avant lui). C'est exactement le motif d'un état chargé à la demande — portable tel quel.
- **Composant réutilisé, pas dupliqué** : la carte du carnet reprend le motif de flip déjà validé sur `lingo-collection.html` (mêmes valeurs de perspective, de durée et de courbe). Deux endroits, une seule grammaire visuelle à porter.
- **Reste à moderniser** : la carte du carnet et la carte de la collection sont deux implémentations HTML distinctes de la même idée ; elles gagneraient à devenir un seul constructeur paramétré (face avant, face arrière, état). Non fait volontairement — les deux vivent dans des documents séparés, mutualiser demanderait un module partagé, donc un risque sans demande.
- **Risques** : aucun sur le moteur de leçon (aucune fonction du moteur touchée). Les six fonds manquants sont un manque d'actif, pas un défaut de code — le repli est visuel et sans JS.

---

## 🎬 SESSION 97 · LINGUAE (06/08) — L'ORDRE DE LA SÉQUENCE D'OUVERTURE REMIS DROIT

Blandine : « en gros l'ordre est mauvais en ligne ». Confirmé après elle : la séquence se lisait à l'envers.

**Avant** : carnet des 18 villes → « Partir » → film → « Commence ton voyage » → globe.
Le film arrivait donc APRÈS la liste des villes, et « Commence ton voyage » sautait directement au globe — **le carnet ne se revoyait jamais**.

**Maintenant** : film → « Commence ton voyage » → **carnet des 18 villes** → « Partir » → globe.
Ordre choisi par Blandine (question posée, réponse : « le carnet de route »).

### 🔴 Trouvé en mesurant le fichier : le bouton apparaissait 8 s trop tôt
`ouverture.mp4` fait **10,1 s** (h264, portrait 536×728, 812 Ko — mesuré, pas supposé). Le filet de sécurité posait la classe `fini` — donc affichait « Commence ton voyage » — au bout de **2 s quoi qu'il arrive**. On pouvait donc sauter au globe en pleine séquence sans jamais voir la fin du film. C'est une partie de la sensation d'« ordre cassé », indépendante de l'enchaînement.
✅ Le bouton n'apparaît plus qu'à la **vraie fin** (`ended`). Le filet passe de 2 s à **10 500 ms**, et ne sert plus que si l'événement ne vient jamais (fichier absent, décodage bloqué). Vérifié en rendu réel : `fini` posée à `currentTime = 10.10 s`, bouton invisible à 3 s.

### ✅ Le film démarre seul — et la raison invoquée avant était fausse
Le commentaire du code affirmait « iOS refuse de lancer une vidéo sans geste préalable ». C'est vrai d'une vidéo **sonore** seulement : celle-ci est `muted` + `playsinline`, donc elle peut démarrer sans tap. Le geste « Partir » n'était pas une nécessité technique.
⚠️ **Et le tap depuis l'encart d'accueil de `index.html` ne compte pas** — question posée par Blandine. C'est un autre document : le crédit de geste ne traverse pas la navigation. Ce qui autorise la lecture, c'est le muet, pas le tap.

### ✅ Nouveau repli : `#ouvRelance`, au lieu d'enchaîner en douce
Deux cas refusent quand même le démarrage automatique : **mode économie d'énergie** et **économiseur de données**. Avant, `play()` rejeté appelait `terminerOuverture` → on passait à la suite sans rien montrer, et le film semblait ne pas exister.
✅ Désormais `play()` rejeté pose la classe `refuse` et affiche un **bouton de relance rond, sans texte** (donc sans traduction à maintenir), centré sur la première image, verre dépoli + triangle turquoise. « Passer » reste visible : aucun piège. Un vrai `error` sur le fichier (absent, illisible) continue lui à passer directement au carnet — inutile de proposer de relancer ce qui ne peut pas jouer.
⚠️ **À passer au fil `index.html`** : si l'encart d'accueil ouvre Linguae dans une **iframe**, il faut `allow="autoplay"` sur cette iframe, sinon Safari refuse même le muet. L'attribut est dans `index.html`, pas ici.

### ✅ Deux corrections d'accompagnement
- **Boucle possible sur `error`** : l'écouteur d'erreur appelait `terminerOuverture`, qui vide la source par `v.load()` — ce qui peut refaire lever `error`. Garde-fou : l'erreur n'est traitée que si le film est réellement à l'écran (`joue`).
- **Le bouton retour laissait la vidéo en lecture** derrière un calque masqué (il retirait les classes sans arrêter le film). Il passe par la même sortie que la fin du film.

### Découpage du code
`terminerOuverture()` ne fait plus qu'une chose : **film → carnet**. L'ouverture du globe est sortie dans `partirVersGlobe()`, branchée sur « Partir ». `lancerFilm()` est le seul point d'entrée du film, appelé à deux endroits : au chargement si la présentation a déjà été vue, et à la fermeture de l'écran de destination pour une première visite — sinon le film jouerait en entier **derrière** `#intro` et `#dest`, qui sont au-dessus de lui (z-index 44 contre 42).

### Contrôles passés
Syntaxe validée (`node --check`, 15 blocs) · **parcours complet rejoué en rendu réel** sur mobile 390×844 : première visite (présentation → destination → film → fin à 10,10 s → carnet 19 villes → dépliant → Partir → globe avec La Baule ★ en tête) · rechargement (film qui part seul, sans présentation) · démarrage refusé simulé (bouton de relance affiché, « Passer » fonctionnel) · vidéo absente (carnet affiché directement, personne enfermé) · aucune erreur JS.
⚠️ Le Chromium de test n'a pas le codec H.264 : les essais ont tourné sur une copie VP9 de la même vidéo, même durée. La logique testée est identique, le fichier livré reste `ouverture.mp4`.

### Constaté au passage, rien touché
`#intro` annonce « **Dix-huit** destinations », le carnet en liste **19** et son texte dit « Dix-neuf villes ». Incohérence antérieure à cette session, hors demande — à trancher quand tu veux.

### 🧭 Préparation Flutter
- **Frontière d'écran clarifiée** : `terminerOuverture()` (film → carnet) et `partirVersGlobe()` (carnet → globe) sont deux transitions nommées et séparées, au lieu d'une seule fonction qui traversait trois écrans. Chaque bouton appelle une transition, pas une suite d'effets de bord.
- **Point d'entrée unique du média** : `lancerFilm()` centralise source, cadrage, classes, lecture, échec et filet. Les appelants ne connaissent plus l'élément `<video>` — un seul endroit à porter le jour où ce sera un `VideoPlayerController`.
- **Dépendance retirée** : plus aucun écouteur de média attaché à l'intérieur d'un gestionnaire de clic (les `addEventListener` s'empilaient à chaque lecture). Ils sont posés une fois, à l'initialisation.
- **Reste à moderniser** : la séquence d'ouverture pilote toujours l'état par classes CSS sur trois éléments (`#ouvFilm`, `#ouverture`, `#globe`) ; un état d'écran explicite (une variable, une fonction de rendu) serait le vrai équivalent d'un routeur. Non fait volontairement — pas demandé, et risque nul à laisser en place.
- **Risques** : aucun sur le reste du fichier (six remplacements ciblés, tous à occurrence unique vérifiée). Le seul comportement dépendant de l'appareil est le démarrage automatique, désormais couvert par un repli visible.

---

## 🧭 SESSION 96 · LINGUAE (06/08) — LA BAULE N'EST PLUS FORCÉE, LA SAUVEGARDE VÉRIFIÉE

### ✅ Persistance vérifiée par un vrai test, pas une supposition
Blandine : « à chaque fois je refais en boucle et rien n'est mémorisé ». Testé en fermant réellement la page et en en ouvrant une nouvelle dans le même navigateur (pas juste en relisant une variable JS en cours de session) : la carte et l'objet gagnés survivent. **Le mécanisme fonctionne.**
⚠️ Cause la plus probable de ce qu'elle vit, à confirmer avec elle : si le fichier est ouvert en local (`file://`) et que chaque test se fait depuis un téléchargement légèrement différent, Safari iOS peut traiter ça comme une origine différente à chaque fois — stockage vide à chaque ouverture. Si elle teste sur l'adresse Netlify en ligne, ce problème ne devrait pas se produire. **Question posée, réponse en attente.**

### ✅ La Baule n'est plus une entrée forcée
« Ça fait 8 fois que je fais La Baule, je vais vomir à force. » `terminerOuverture()` ouvrait directement `ouvrirArrivee(0)` — nécessaire le tout premier jour, épuisant à charge de test répétée ensuite.
**Le bouton dit maintenant ce qu'il fait** : « Commence ton voyage » (au lieu de « Entrer à La Baule »), dans un bleu sombre et discret plutôt que le turquoise plein — sur demande explicite. Il ouvre le globe ; **La Baule y est suggérée** (même mécanisme que la recommandation de fin de chapitre : étoile, anneau doré, en tête de liste) mais **rien n'oblige à la choisir** — n'importe quelle autre ville accessible reste cliquable normalement.
✅ Vérifié en rendu réel : bouton renommé, globe ouvert (pas d'arrivée forcée), La Baule marquée ★ en tête de liste, fiche de Saumur ouverte librement à côté.

### Contrôles passés
Syntaxe validée · flux complet rejoué (intro → bouton → globe avec suggestion → choix libre d'une autre ville) · aucune régression.

---

## 📖 SESSION 95 · LINGUAE (06/08) — LE RÉCIT MANQUANT DE LA BAULE, ET L'INSCRIPTION ÉTOFFÉE

Blandine, après avoir rejoué La Baule : « ça ne se lit pas en entier une fois que la vidéo s'arrête, ça la fout mal pour la première ville ». Elle a aussi redemandé, séparément : le modèle carte/objet, le retrait du « 1/8 », la sécurité comme chapitre à part, et l'étoffement de l'inscription.

⚠️ **Constat en reprenant le fichier** : plusieurs de ces demandes — le modèle carte = leçon parfaite / objet = quiz, le retrait du bloc de maîtrise, le nettoyage du texte contradictoire sous la carte postale, la séparation inscription/sécurité en deux leçons distinctes — **étaient déjà faites**, avec des commentaires datés « 6 août 2026 » expliquant exactement ces mêmes retours. Vérifié une par une avant de retravailler quoi que ce soit, pour ne pas écraser un travail déjà bon.

### 🔴 LE VRAI TROU : `RECITS.labaule` n'existait pas
Trouvé en cherchant pourquoi l'écran « ne se lit pas en entier ». La vidéo se fige sur le panneau de la ville (comportement voulu), puis l'écran affiche `#texte`, rempli par `RECITS[ref]` — un texte **différent** de la lettre de la carte postale, plus court, jamais écrit pour La Baule. **`#texte` restait donc totalement vide** : l'écran sautait du panneau figé directement à la carte postale, sans rien entre les deux. Sur la toute première ville du voyage.
✅ **`RECITS.labaule` écrit et ajouté**, 6 langues, même format que les dix récits d'origine (deux phrases évocatrices + une note factuelle). Vérifié en rendu réel : le texte s'affiche, 274 caractères, entre les langues et la carte postale.

### ✅ L'inscription de La Baule étoffée, la sécurité confirmée à part
Vérifié que L1 (`arrivee.js`) ne contenait déjà plus que l'inscription (12 mots), la sécurité déjà isolée en L2 — la séparation demandée existait. **Cinq mots ajoutés** sur demande explicite (« le pas le trot le galop, les bottes, une phrase pour réserver en groupe ») : `le-groupe`, `pas`, `trot`, `galop`, `bottes` — et la définition de `balade` complétée pour couvrir plage et montagne. Pour tenir à 12, cinq mots plus administratifs (`cours-particulier`, `cours-collectif`, `licence-assurance`, `duree-reprise`, `annuler`) partent en réserve (L3, non attribuée). **Une phrase neuve** : « Nous sommes quatre, dont deux débutants — c'est possible ? », 6 langues.
⚠️ La sécurité (L2, 11 mots) reste en réserve, **non attribuée à aucune ville** — Blandine : « on va faire la sécurité ailleurs ». Aucune destination choisie pour l'instant.
✅ Vérifié en exécution : 12 mots exacts en leçon 1, 4 phrases, 0 entrée mal formée sur les 6 langues.

### 💬 Clarification, rien à faire de mon côté
La vidéo envoyée (`copy_47DFBC08...mov`) est destinée à l'**encart d'accueil sur `index.html`**, qui renvoie vers Hype Linguae — pas une vidéo d'arrivée de ville. Hors du périmètre de cette conversation (index.html appartient à l'autre fil). Pas de traitement fait.

### Contrôles passés
Syntaxe validée · récit affiché en rendu réel · leçon reconstruite vérifiée (12 mots, 4 phrases, structure des 6 langues saine) · aucune régression sur le reste du fichier.

---

## 🔧 SESSION 94 · LINGUAE (06/08) — « ARRÊTE DE CHANGER DES TRUCS SANS DEMANDER »

Blandine, en toute lettres, après une carte postale invisible et un « 1/8 » incompréhensible juste après un 12/12 parfait. Elle a raison : plusieurs décisions avaient été prises ou réinterprétées sans repasser par elle. Cette session ne fait QUE ce qu'elle a confirmé, un point à la fois — rien de plus.

### ✅ Le modèle de récompense, tel qu'elle le voulait depuis le début
« La carte, dès que les 12/12 sont bons, même si on ne les a pas tous écrits. » Ce n'est plus le quiz qui donne la carte — **la leçon elle-même**, si tous les mots notés sont justes une seule fois, peu importe le type d'exercice tombé (choix, écoute, dire ou écrire comptent pareil). Le quiz ne garde plus que l'objet.
Nouveau magasin persistant `CARTES_LECON` (`hype_lingua_cartes`), posé à la fin de `finLecon()` : `garderCarteLecon(ref, LC.justes, sur)` — exactement le score déjà affiché à l'écran, aucun second contrôle. `carteObtenue(ref)` garde son nom (pour ne pas toucher tous ses points d'appel) mais lit désormais ce nouveau magasin, pas le quiz.
✅ Vérifié en jouant réellement une leçon de La Baule jusqu'au bout, sans jamais ouvrir le quiz : carte obtenue = vrai, objet obtenu = faux. Et une leçon volontairement fautive (Saumur, une erreur) : carte non obtenue, comme attendu.

### ✅ Le « 1/8 » retiré
Le bloc « Où en est ce chapitre » — celui qui affichait la MAÎTRISE (répétitions sur plusieurs passages) juste après un score de leçon parfait — est retiré de l'écran de fin de leçon. Il pouvait montrer « 1/8 » juste sous un « 12/12 », et rien ne disait que ces deux chiffres ne racontaient pas la même chose. La maîtrise continue de choisir les exercices et le Sprint en coulisses ; elle ne s'affiche plus nulle part comme une jauge de progression.
⚠️ **Même correctif appliqué à `choisirLecon()`** (l'écran d'AVANT la leçon, pas seulement celui d'après) : il disait aussi « La carte postale : obtenue / encore X mots » d'après la maîtrise — même défaut, sur un autre écran. Corrigé pour suivre exactement la même règle que partout ailleurs.

### ✅ La carte postale contradictoire, corrigée — l'aperçu flouté gardé
Trouvé hier, confirmé aujourd'hui : « CARTE POSTALE GAGNÉE » suivi juste en dessous de « Encore 8 mots pour la recevoir » — deux systèmes différents qui se contredisaient à l'écran. Le texte du bas est retiré. **L'aperçu flouté avant obtention reste** — Blandine : « c'était sympa de la voir un peu floue » — rien touché de ce côté, seul le texte contradictoire disparaît.

### ✅ La Baule : sécurité retirée, inscription complète
« On avait dit qu'on commençait par l'inscription... la sécurité, faut que ce soit un autre chapitre. » Le mélange à 6+6 d'hier est défait. `hype-lingo-lex-arrivee.js` retagué une seconde fois : **leçon 1 = les 12 mots `inscrire` au complet** (reserver, cours-particulier, cours-collectif, niveau, debutant, tarif, licence-assurance, bombe-fournie, cheval-calme, balade, duree-reprise, annuler) — c'est le chapitre de La Baule. **Leçon 2 = les 11 mots `securite` au complet**, en réserve, prête telle quelle pour la ville qui portera la sécurité — pas encore choisie.
⚠️ **Pas fait, à trancher avec elle** : les mots neufs qu'elle propose (le pas/le trot/le galop, les bottes, une phrase pour réserver une balade en groupe avec des débutants). Le pas/trot/galop et les bottes existent déjà ailleurs (`cours`, `materiel`) mais dans d'autres fichiers — les faire venir dans le chapitre de La Baule casserait le principe « un fichier par ville ». À décider : les écrire en propre pour La Baule, ou les garder pour une ville « en selle » future.

### ⚠️ Hypothèse posée, pas confirmée : le texte de La Baule qui ne se lit pas en entier
« Une fois que la vidéo s'arrête, ça la fout mal. » Une piste plausible et documentée : le clip finit sur sa dernière image (choix assumé, voir code) sans boucler, et un `<video>` sans `controls` peut malgré tout intercepter le défilement une fois arrêté sur iOS Safari — même famille de défaut que celle déjà rencontrée sur le globe et la collection. `pointer-events:none` ajouté sur la vidéo d'arrivée : tout geste doit désormais passer directement au conteneur qui défile en dessous.
⚠️ **Pas vérifiable sans le vrai appareil.** Si ça ne suffit pas, il me faut une capture ou une description précise de ce qui manque à l'écran pour comprendre exactement quoi corriger.

### ⚠️ Clarifié, pas pour moi : la vidéo de l'encart d'accueil
Le fichier vidéo et les captures envoyés (panneau La Baule doré sur bleu nuit) sont pour l'**encart d'accueil sur `index.html`**, pas pour Linguae. Choix qui fonctionne bien pour cet usage-là, mais l'intégration revient à qui travaille sur `index.html`.

### Contrôles passés
Syntaxe validée · aucune référence morte (`SEUIL_CARTE`, `et.fini`, `et.tout`, `et.acquis` : zéro occurrence restante) · parcours complet rejoué en exécution réelle : leçon parfaite → carte obtenue sans quiz → blocs de sortie corrects → écran d'arrivée sans texte contradictoire.

---

## 🃏 SESSION 93 · LINGUAE (06/08) — LA PAGE DE COLLECTION

⚠️ **Cette entrée avait déjà été écrite une première fois, puis a disparu** du fichier reçu en retour — probablement un croisement avec la conversation index.html qui travaillait au même moment sur ce même `SUIVI.md`. Réécrite ici, le code correspondant (`lingo-collection.html`) a bien été livré entre-temps, rien n'est perdu côté application.

« On devrait faire une page avec toutes les cartes et les objets ensemble, et quand on retourne la carte ça dit l'objet à gagner ou récompense obtenue ». Construite.

### ✅ `lingo-collection.html` — nouveau fichier, même motif que le globe
Iframe séparée (comme `lingo-globe.html`), reçoit l'état des 19 villes par message depuis `lingo.html` (source unique de vérité, rien dupliqué), renvoie la fermeture par message. **Même double verrou de fermeture que le globe** (`pointer-events` + `display:none` sur l'iframe 320 ms après) : posé dès la construction, pas après-coup.
- Grille de 19 cartes, 2 colonnes, dans l'ordre du voyage.
- Trois états visuels : **verrouillée** (silhouette, pas de photo) · **ouverte sans carte** (photo assombrie, pas de tampon) · **carte gagnée** (photo claire, tampon doré).
- On touche, la carte se retourne (flip CSS 3D). Au dos : pour une ville verrouillée, « À découvrir — termine cette leçon » ; pour une ville ouverte sans carte, « En cours — réussis le quiz » ; pour une carte gagnée, **la lettre de la ville** (langue étudiée, comme sur l'écran d'arrivée) et en bas la ligne de l'objet — **« À gagner »** ou **« Récompense obtenue »** avec son icône.

### ✅ Image de carte absente : le même principe que « Vidéo introuvable »
Dix des dix-neuf villes n'ont pas encore de `carte-X.webp`. Chaque carte **tente toujours de charger son image** et bascule sur « Carte à venir » seulement si le chargement échoue réellement (`onerror`). Aucune liste à maintenir à la main.

### 🔴 Trouvé en construisant la page : La Baule affichait une lettre VIDE depuis le début
Sa lettre et ses trois volets avaient été écrits (`labaule.md`) mais **jamais injectés dans `hype-lingo-villes-monde.js`**. Son écran d'arrivée officiel montrait donc une lettre blanche depuis qu'elle est devenue l'étape 1, sans que personne ne l'ait remarqué.
✅ Corrigé : `MONDE.labaule` ajouté (lettre + 3 volets, 6 langues). Vérifié en exécution.

### Contrôles passés
Syntaxe validée sur les deux fichiers · diff exhaustif sur `lingo.html` (aucune fonction perdue) · rendu réel : 19 cartes affichées, compteur correct, trois états vérifiés un par un, lettre affichée et retournée · fermeture testée avec le même verrou que le globe.

### ⚠️ Vérifié aujourd'hui : le globe de l'app n'a pas changé
`index.html` reçu à nouveau (travail parallèle de la conversation index.html) — **le bloc `GLOBE_HTML_HYPE` est identique octet pour octet** à celui déjà greffé en session 92 · LINGUAE. Rien à resynchroniser.

### ⚠️ Reste à faire
Bouton d'entrée vers la collection en haut à droite, sous celui du globe — à repositionner si besoin. Pas de bouton « Partir » sur les cartes ouvertes-mais-pas-gagnées (vitrine, pas une seconde navigation) — à ajouter si voulu. Les dix cartes britanniques manquantes, toujours en attente côté serveur.

---

## 🚨 SESSION 92 · LINGUAE (06/08) — PANNE BLOQUANTE CORRIGÉE + REFONTE À UNE LEÇON PAR VILLE

⚠️ **Collision de numérotation repérée en ouvrant ce fichier** : la conversation Linguae, en parallèle, avait numéroté ses propres sessions 87 à 96 sans jamais voir CE fichier-ci (celui d'index.html), qui s'arrête à la session 91 — **avec un contenu totalement différent** de la « session 91 » de la conversation Linguae. Deux sessions 91 distinctes existent donc quelque part, chacune dans sa branche. Cette entrée reprend le fil à partir du numéro réellement libre ici, et consolide tout le travail Linguae depuis la dernière synchronisation connue, plutôt que de recréer cinq sous-sessions qui ne correspondraient à rien pour qui lit ce fichier. **Suggestion pour la suite : préfixer les sessions par le fichier concerné (ex. « SESSION N · LINGUAE » vs « SESSION N · INDEX ») pour que ce genre de collision se voie tout de suite.**

Blandine a testé Hype Linguae sur son iPhone et s'est retrouvée **complètement bloquée** : écran mort, boutons qui ne répondent plus, obligée de swiper pour sortir de l'app Hype entière et tout relancer. Cette session corrige la panne et va plus loin : elle traite la cause de fond que Blandine a exprimée pendant les échanges — « on s'attend à la carte postale, pas à 15 leçons éparpillées ».

### 🔴 CAUSE DU BLOCAGE 1 : deux ouvertures automatiques du globe qui se disputaient l'écran
Deux `setTimeout(ouvrirGlobe, …)` avaient été posés le même jour à deux endroits différents : après le choix de la langue (380 ms) et après la vidéo de bienvenue (320 ms). Pour une première visite, les deux pouvaient se déclencher l'un après l'autre — deux écrans qui s'ouvrent et se referment presque en même temps. **Effet exact décrit par Blandine** : « on aperçoit Newmarket dans ses tons oranges un centième de seconde avant que le globe bleu s'affiche ».
✅ **Corrigé** : `terminerOuverture()` n'ouvre plus le globe sur un délai, elle appelle directement `ouvrirArrivee(0)` — on entre réellement dans la première ville, sans écran intermédiaire. Le `setTimeout(ouvrirGlobe, 380)` après le choix de langue est retiré : fermer l'écran de destination suffit, l'écran de bienvenue dessous reprend la main tout seul. **Le globe redevient 100 % manuel**, il ne s'ouvre plus que sur une action explicite.
✅ Le bouton « Entrer à Newmarket » (texte figé depuis que La Baule est devenue l'étape 1, et qui de toute façon n'entrait nulle part — il ouvrait le globe à la place) devient « Entrer à La Baule » et fait vraiment ce qu'il dit.

### 🔴 CAUSE DU BLOCAGE 2 : une iframe qui continue à capter le toucher même masquée
Sur Safari iOS, une iframe sous un parent en `visibility:hidden` peut continuer à capter le toucher — un défaut WebKit connu. `opacity`/`visibility` seuls ne suffisaient pas à garantir qu'elle ne captait plus rien après la fermeture du globe.
✅ **Double verrou posé** : `#globe{pointer-events:none}` par défaut, `pointer-events:auto` seulement quand `.on` · et l'iframe elle-même passe en `display:none` 320 ms après la fermeture (verrou dur, en plus du CSS). Vérifié : `pointer-events:none` actif immédiatement à la fermeture, iframe à `display:none` 320 ms après, le bouton `#bGlobe` reste cliquable. C'est probablement aussi la cause du swipe qui ramenait Blandine hors de Linguae entièrement : plus rien ne répondant, son geste finissait par atteindre le geste système de retour de Safari.

### 🔴 BUG CRITIQUE TROUVÉ EN VÉRIFIANT : des phrases qui auraient pu planter l'app
Deux fichiers de lexique écrits récemment (`hype-lingo-lex-arrivee.js` — La Baule — et `hype-lingo-lex-poney.js` — Lamotte) utilisaient une structure de phrase imbriquée `mots:{fr:{m:"..."}}`, copiée par erreur du format des concepts. **Le moteur (`exPhrase`) attend des chaînes directes `fr:"..."`** — vérifié sur les fichiers d'origine. Avec la mauvaise structure, l'exercice de phrase plante net. **L'app se serait figée pile sur un exercice de phrase de La Baule — la toute première ville du voyage.**
✅ Corrigé par conversion automatique (script, pas de saisie manuelle). **Balayage complet des 11 fichiers de lexique : 79 phrases vérifiées, structure correcte partout.** Un exercice de phrase de La Baule lancé réellement dans un navigateur : rendu correct, 0 erreur.

### ✅ Le globe trop grand, coupé en bas, +/− inatteignables
Ramené à des valeurs plus conservatrices (`R0=0.36` du plus petit côté, centre à `0.58` de la hauteur). **Vérifié sur 5 tailles d'iPhone réelles** (SE 375×667, 13/14 390×844, 15 Pro 393×852, Pro Max 430×932, Mini 360×780) : le globe ne déborde jamais en bas, les boutons `+`/`−` restent dans l'écran sur les cinq, et répondent réellement au clic (zoom vérifié borné entre 1 et 3.8).

### ✅ LE VRAI CHANTIER : une seule leçon par ville, sur les 19 destinations
Le format à une seule leçon (déjà appliqué à La Baule seule) est étendu aux 19 villes. `ETAPE_SRC` réduit à une seule paire `[fichier, leçon]` par ville partout — l'autre moitié ne disparaît pas, elle reste en réserve pour une ville future. Chaque choix croise les mots réels de la leçon avec la lettre et les volets déjà écrits de la ville :
- **Kildare** (chapitre offert) garde `urgences/1` plutôt que `urgences/3` — parce que « le vétérinaire » y est, le mot qui compte le plus dans une urgence.
- **Windsor** et **Saumur** (même fichier `dressage`) : Windsor garde `dressage/1` (rectangle, lettres, juge — « le dressage qu'on juge », son volet raconte déjà le mystère des 8 lettres) ; Saumur garde `dressage/3` (décontraction, rassembler, légèreté — « le dressage qu'on enseigne », l'échelle de progression du Cadre Noir).
- **Jerez** garde `cheval/4` (hongre, étalon, jument, race) — son volet dit explicitement « l'école présente ses étalons ».
- **Aachen** garde `obstacle/4` (barrage, chrono, tour d'honneur) — son volet est centré sur le barrage.
⚠️ Quelques arbitrages sont serrés (Séville, Vejer, Warendorf avaient deux collections également pertinentes) — réversibles si besoin.
✅ **Vérifié programmatiquement pour les 19 villes** : une seule leçon chacune, 10 à 12 mots. ✅ **Vérifié en rendu réel avec une vraie simulation de maîtrise** : le bloc « Où en est ce chapitre » — celui qui listait plusieurs leçons sans rapport, exactement ce que Blandine décrivait — **n'apparaît plus**, puisqu'il n'y a plus qu'une seule leçon par ville. Finir la leçon → le quiz donne directement la carte et l'objet.
⚠️ Correction annexe : l'accueil de Warendorf pointait vers « pansage », corrigé vers « materiel » (sa collection retenue).

### ✅ Les mentions de « dix-huit » corrigées en « dix-neuf »
13 occurrences dans les 6 langues (présentation, écran de choix de langue, intro du carnet, description du voyage anglais). Vérifié : plus aucune trace côté joueur.

### Contrôles passés
Syntaxe JS validée · diff exhaustif (aucune fonction perdue) · 79 phrases de tout le module balayées · 19 villes vérifiées une par une en exécution réelle · parcours complet rejoué (intro → choix de langue → arrivée directe à La Baule sans flash → leçon → quiz sans faute → carte et objet obtenus → retour au voyage → globe réouvert et cliquable) · 5 tailles d'écran testées pour le globe.
⚠️ **Honnêteté sur les limites du test** : reproduit en Chromium headless, pas sur un iPhone réel. Le raisonnement tient (deux causes identifiées avec certitude dans le code, corrigées, vérifiables), mais la confirmation définitive reste le test de Blandine en conditions réelles.

### ⚠️ Non résolu, en attente
**La vidéo de Newmarket affichée en bande horizontale** : capture montrée par Blandine, `arrivee-newmarket.mp4` en bande paysage tronquée. Fichier jamais reçu — l'un des dix vidéos britanniques/irlandaises d'origine, jamais vérifiées. Le code de cadrage (portrait → cover, paysage → contain) est sain en principe ; si cette vidéo est en paysage comme Maurice/La Baule l'étaient avant traitement, elle produirait exactement ce symptôme. **À vérifier dès que le fichier est envoyé.**
La relecture native des mots. Les vidéos et cartes manquantes (île Maurice à finaliser, quelques autres). La page de collection (cartes qui se retournent), toujours pas commencée.

---
