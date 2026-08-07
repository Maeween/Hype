## 🏞️ SESSION 126 · LINGUAE (07/08) — LES DEUX ÉCRANS D'ENTRÉE ONT LEUR IMAGE

Blandine renvoie les deux visuels. Aucun des deux n'est en portrait — le premier est **carré** (763×738) et le second **paysage** (1402×1122).

### ✅ Prolongés au lieu d'être rognés
Un recadrage `cover` sur un carré aurait coûté **54 % de la largeur**, et sur le paysage bien plus. Mais les quatre bords des deux images mesurent entre **5 et 23 de luminance** sur 255 : presque noirs.
✅ Donc **prolongation plutôt que recadrage** : la couleur du bord est échantillonnée ligne à ligne et fondue vers le noir en courbe douce, pour ajouter du ciel en haut et du sol en bas. 429 px ajoutés sur l'écran des langues, 624 px sur la présentation. **Rien n'est perdu, et la couture ne se voit pas.**
✅ Sortie en **1170×1560**, la largeur d'un iPhone en densité ×3 : plus d'agrandissement, donc plus de flou. 59 Ko et 130 Ko.
✅ Le sujet est placé plus haut sur la présentation (42 % au lieu de 50 %) pour tomber dans la fenêtre visible, celle que le code réserve entre la citation et les cinq points.

### ✅ Vérifié en rendu réel, en densité ×3
Le titre reste lisible sur les deux. Sur la présentation, les icônes dorées et la tête du cheval passent derrière le texte sans le gêner ; la boussole tombe dans la moitié basse, là où le voile l'absorbe — c'est le comportement voulu. Sur l'écran des langues, le cheval noir occupe le haut et les cartes de langues se posent dessus.
✅ `elementFromPoint` confirme que l'écran des langues est bien **peint** au centre, pas seulement ouvert — le contrôle mis en place à la session 125.

### 📌 Réponse à une question de Blandine, qui vaut d'être notée
« Les cartes, c'est en portrait qu'il les faut ? » **Oui, 3:4 — et les siennes le sont déjà, exactement.** Vérifié sur cinq d'entre elles : 900×1200, ratio 0,750 pile. Le format des cartes n'a jamais posé de problème ; seuls ces deux fonds plein écran étaient hors format, parce qu'ils remplissent un écran de ratio 0,46, bien plus haut que 3:4.

### Contrayles passés
`verif.py` · formats et luminance des quatre bords mesurés avant de choisir la méthode · ratio des cartes existantes vérifié · rendu réel des deux écrans en densité ×3 · visibilité confirmée par `elementFromPoint` · aucune erreur JS.

### ⏳ Il ne reste qu'une image
Le fond du carnet de route, que le CSS va chercher sous `fond-newmarket.webp`. Il peut se dériver de l'affiche — même famille visuelle, et les deux pages se suivent.

---

## 🎯 SESSION 125 · LINGUAE (07/08) — TROUVÉ : L'ÉCRAN DES LANGUES S'OUVRAIT DERRIÈRE LE CARNET

Blandine, pour la troisième fois : « la page de choix des langues je la vois jamais en ligne perso ». **Elle avait raison les trois fois, et ce n'était pas un problème de déploiement.**

### 🔴 Un z-index, et trois messages perdus à cause de mon test
`#dest` était en **`z-index: 1`**. Le carnet de route est en **40**, le globe en 41, le film en 42.
Quand elle touchait la ligne de langue depuis le carnet, l'écran des langues **s'ouvrait réellement** — la classe `on` était posée, la liste construite, les cinq langues présentes — mais il se dessinait **derrière** le carnet, qui occupe tout l'écran. Rien n'apparaissait.

Le z-index 1 était juste à l'origine : cet écran ne s'affichait qu'à la première visite, **avant** que le carnet n'existe. Il est devenu faux le jour où j'ai ajouté le bouton de retour depuis le carnet, en session 119.

⚠️ **Et je ne l'ai pas vu parce que mon test vérifiait la CLASSE et non la VISIBILITÉ.** J'avais écrit « écran dest ouvert : on » et je m'en étais contenté. Un élément peut porter sa classe, avoir sa hauteur, contenir tout son contenu, et rester invisible sous un autre. J'ai renvoyé Blandine au déploiement deux fois sur la foi de ce test.
✅ **Le test refait interroge ce qui est réellement peint** : `document.elementFromPoint(195, 300)` au centre de l'écran répond maintenant « écran des langues ». C'est cette forme de vérification qu'il faut pour tout ce qui se superpose.
✅ `#dest` passe à **45**, devant le carnet, le globe et le film. `#intro` aussi, qui n'avait aucun z-index du tout — même piège en attente.

### 🔴 Et un second défaut trouvé dans la foulée
Le bouton de retour de l'écran des langues appelait `montrerIntro()` **sans condition** : en arrivant du carnet, il renvoyait le joueur à l'écran de présentation, c'est-à-dire au tout début du module, sans raison.
✅ Il ne remonte plus à la présentation que si elle n'a jamais été vue. Sinon il revient d'où l'on vient : le carnet. Vérifié — après retour, la présentation reste masquée et le carnet est à l'opacité 1.

### Contrôles passés
`verif.py` sur `lingo.html` · z-index de tous les écrans relevés et comparés (intro, dest, ouverture, globe, vue, arrivée) · **visibilité réelle testée par `elementFromPoint`**, pas par la classe · capture d'écran de l'écran des langues ouvert depuis le carnet · retour vérifié dans les deux cas · aucune erreur JS.

### 🧭 La leçon, à garder
**Vérifier ce qui est peint, jamais ce qui est déclaré.** Trois messages de Blandine et deux renvois au déploiement de ma part, pour un `z-index: 1` qu'un test de visibilité aurait trouvé en une seconde. Le même piège dort partout où des écrans se superposent — et ce fichier en a six.

---

## 🖼️ SESSION 124 · LINGUAE (07/08) — LES DEUX ÉCRANS D'ENTRÉE ONT ENFIN UNE PLACE POUR LEUR IMAGE

Blandine envoie une planche de six visuels et propose un appariement : **les drapeaux autour du cheval noir pour l'écran de choix de la langue, la boussole pour l'écran de présentation** qui décrit les chapitres. Les deux sujets collent exactement — des drapeaux là où l'on choisit une langue, une boussole et des icônes de matériel là où l'on annonce un voyage et ses chapitres.

### ✅ Le code est prêt pour les deux, et l'écran des langues n'avait AUCUN fond
`#dest` n'avait pas d'image du tout : du noir plat, alors qu'il est vu à **chaque changement de langue** depuis que la ligne du carnet y ramène. Il a maintenant sa couche de fond, bâtie sur le même modèle que celle de la présentation, voile compris — les deux écrans se suivent et doivent se ressembler.
✅ **Deux fichiers distincts** : `lingua-affiche.webp` pour la présentation, **`lingua-langues.webp`** pour le choix de la langue. Le second est un nom neuf.
✅ `background-position` à **40 %** sur l'écran des langues contre 30 % sur la présentation : le texte y descend moins bas, on peut montrer davantage du bas de l'image.
✅ Vérifié en rendu réel : les deux fonds se chargent, la couche fait 857 px de haut, et **le film d'ouverture n'a pas bougé** — il part seul et le carnet reste masqué, comme promis à Blandine quand elle a demandé si ça touchait à sa vidéo.

### 🔴 Mais les six visuels sont CARRÉS, et les écrans sont en portrait
Chiffré plutôt qu'estimé :
· une image carrée mise en `cover` sur un écran de 390×844 doit être agrandie **1,65 fois**, et **54 % de sa largeur sort du cadre** — 27 % à gauche, 27 % à droite ;
· et elles font **512 px de côté**, donc sur un iPhone en densité ×3 (1170 px de large) elles seraient agrandies **2,3 fois** : floues.

Simulation du recadrage réel faite sur les deux :
· **Les drapeaux survivent bien.** Le cheval, le livre et une partie de l'anneau restent. On perd environ la moitié des drapeaux latéraux, mais l'image se lit encore et le sujet reste clair. Utilisable telle quelle si Blandine est pressée.
· **La boussole survive mal.** Le cheval est réduit à un liseré sur le bord droit, et la boussole — l'élément le plus fort — tombe dans la moitié basse, celle que le voile emmène au noir. À régénérer.

✅ **À demander pour les deux : le même sujet, en 3:4 portrait, pleine résolution.** Le sujet centré, le tiers haut calme pour le titre, rien d'essentiel dans les 15 % du bas.
⚠️ Et pour l'affiche de la présentation, le rappel qui vaut : **le cheval du film d'ouverture est une jument noire, seule** — les deux images de Blandine ont bien un cheval noir, ce qui tombe juste.

### Contrôles passés
`verif.py` sur `lingo.html` · les six vignettes découpées et mesurées une par une (tiers haut de 22 à 51, ensemble de 25 à 63) · lisibilité simulée à 170 px puis en plein écran portrait avec le recadrage `cover` réel · rendu réel des deux écrans avec des images provisoires, puis provisoires retirées · film d'ouverture et masquage du carnet vérifiés inchangés · aucune erreur JS.

### ⏳ Ce qui reste sur ce point
Les deux images en portrait, et le fond du carnet de route — qui pourra se dériver de l'affiche.

---

# 🤝 PASSATION — état du module au 7 août 2026, fin de session 124

**À lire en premier par la conversation qui reprend Linguae.** Ce bloc dit l'état réel, ce qui est en cours du côté de Blandine, et les pièges qui ont coûté du temps. Les sessions détaillées sont en dessous, dans l'ordre inverse.

## Ce qui est fait
**Le voyage compte 29 étapes, toutes accessibles, toutes écrites.** Chacune a son chapitre, son niveau, son heure, son récit en six langues, sa lettre et ses trois volets, son point sur le globe, son souvenir.
**Six langues ouvertes** — français, anglais, espagnol, italien, allemand, japonais. Le choix se fait par la ligne de langue du carnet, devenue un bouton.
**Douze lexiques dans ce fil**, 220 mots : arrivee, balade, concours, elevage, endurance, froid, haras, obstacle, polo, tradition, vente, western. Sept autres existent côté Blandine (ecurie, pansage, cheval, materiel, cours, dressage, urgences, poney) et ne sont jamais passés dans cette conversation.
**Maîtrise et avancement rangés par langue.** Changer de langue recommence le voyage, ce qui est cohérent : le vocabulaire de la nouvelle langue est vierge.

## Ce que Blandine fait en ce moment
**Elle refait les 29 cartes postales en couleurs normales**, parce que la palette dorée imposée par l'ancien prompt les rendait toutes semblables. Deux sont faites et livrées : **Rome** et **Hickstead**. Le prompt par ville est dans `hype-linguae-prompt-cartes.txt`.

**Le geste à répéter à chaque carte reçue**, et il ne s'improvise pas :
1. `carte-<ville>.webp` — 900×1200, qualité webp 72 à 82. Au-delà de 180 Ko, descendre à 72 : mesuré, l'écart est de 2,3/255 à la taille d'affichage réelle (348 px), soit le seuil de perception. Ne pas descendre sous 72, on ne gagne plus rien.
2. `fond-<ville>.webp` — 420×560, flou gaussien 14, puis assombrissement **par itération** jusqu'à une luminance moyenne ≤ 42. Le facteur varie de 0,30 à 0,95 selon l'image : ne jamais le fixer d'avance.
3. **Mesurer le tiers supérieur de la carte.** Au-dessus de 100 de luminance, ajouter la ville dans `TITRE_SOMBRE` de `lingo.html`, sinon le titre crème est illisible. Rome (192) et Hickstead (186) y sont déjà. **Cette mesure est obligatoire à chaque remplacement de carte** — la liste dépend de l'image, pas de la ville.

## Ce qui reste, par ordre d'utilité
1. **Les 27 cartes restantes.** C'est le chantier en cours.
2. **`lingua-affiche.webp`** — le fond de l'écran de présentation, jamais produit. Prompt prêt dans `hype-linguae-prompt-affiche.txt`. ⚠️ **Le cheval du film d'ouverture est une JUMENT NOIRE, seule, sans cavalier** — vérifié image par image dans `ouverture.mp4`. L'affiche doit lui correspondre ; le prompt disait « gris pommelé », c'était une erreur de ma part.
3. **Le fond du carnet de route.** Le CSS va chercher `fond-newmarket.webp`, en dur, pour la page « Le tour du monde » — reste d'une ancienne version. À produire très sombre et très flou (du texte blanc et 29 cartes passent par-dessus), puis renommer proprement. Peut se dériver de l'affiche.
4. **Les définitions en quatre langues.** Elles n'existent qu'en français et en anglais ; un joueur lisant en allemand les reçoit en français. Plusieurs centaines de notes. Seul vrai chantier de fond restant.
5. **`niveau` divergent** entre `arrivee` (`das Niveau`) et `concours` (`die Klasse`) — même `ref`, deux sens. À trancher par Blandine : renommer déplacerait la maîtrise déjà acquise.
6. **La sécurité** (11 mots prêts) n'a pas de ville.
7. **Ranger le module dans un dossier `linguae/`** — décidé, à faire **quand la série de cartes sera close**, pas avant. Neuf endroits à changer, plus une ligne dans `index.html` (autre fil).

## Les pièges qui ont coûté du temps
**L'ordre d'exécution du fichier.** Quatre fois : une valeur lue avant que la variable dont elle dépend soit déclarée. `VOYAGE_LANGUE` est déclarée très bas ; tout ce qui en dépend doit être appelé après la relecture du voyage, en fin de fichier. Un « prêt » global remplacerait les quatre contournements.
**Valider TOUS les blocs `<script>`, jamais un index.** Un `}` en trop est passé parce que je vérifiais le bloc 14 alors que l'ajout de deux `<script src>` avait décalé le bloc inline en 16. Utiliser **`verif.py`**, livré.
**Un contrôle de syntaxe ne prouve pas le rendu.** Playwright obligatoire avant livraison.
**Les `ref` partagés entre lexiques.** Un script compare les six traductions de chaque `ref` en double : il a trouvé deux faux rappels que la relecture humaine n'aurait pas vus (`prix` qui signifiait « prize money » d'un côté et « price » de l'autre). À relancer après chaque nouveau lexique.
**Pas de `⚠️` dans un texte vu par le joueur.** C'est une convention de commentaires et de champs `def`, pas de volet narratif.
**Identifier les images au CONTENU, jamais au libellé du message.** Trois fois sur trois, l'ordre annoncé ne correspondait pas aux fichiers.
**Ne pas réintroduire de plancher de villes offertes** (`FAITS` partait à 4 et marquait quatre villes comme faites sans qu'elles soient jouées), ni de `rotateY` sur les cartes du carnet (texte en miroir sur Safari iOS et 28 couches composites).
**Une plainte de lisibilité ne se corrige pas en changeant la couleur avant d'avoir mesuré.** Deux fois sur trois, le contraste était bon et le coupable était la taille. Jamais moins de 9 px pour une capitale espacée.
**Les panneaux des clips d'arrivée** : six sur quatorze avaient un nom coupé. Le panneau doit être au **milieu de la hauteur**, pas en bas — l'app écrit le nom de la ville par-dessus le bas de la vidéo et recadre en `cover`. `FIN_VIDEO` (labaule 4,4 · vejer 7,0 · golega 4,6 · verone 3,9 · dubai 2,9) arrête le clip avant le raccord ; l'image d'arrêt se juge **dans le cadre de l'app**, jamais dans le fichier.

## Fichiers livrés dans ce fil, autorité
`lingo.html` · `lingo-globe.html` · `hype-lingo-villes-monde.js` · les neuf lexiques créés ici · `verif.py` · les quatre fichiers de prompts · les cartes, fonds et clips produits. **Blandine reste la source d'autorité** : toujours partir du fichier qu'elle envoie, jamais d'une copie mémorisée.

---

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

## 🔍 SESSION 123 · LINGUAE (07/08) — TROIS CARTES RELUES, DEUX INCOHÉRENCES DE FOND

Blandine envoie trois cartes en couleurs normales et demande : « dis-moi si tu vois des incohérences ». Oui, deux — et aucune ne portait sur la lumière.

⚠️ **Ordre des fichiers ≠ ordre annoncé, troisième fois.** Elle écrit « Dubaï, Saumur et Warendorf », les fichiers sont dans l'ordre Warendorf, Dubaï, Saumur. Identification au contenu, comme d'habitude — jamais au libellé.

### ✅ SAUMUR — parfaite, livrée
Le Grand Manège, la lumière tombant des hautes fenêtres, la poussière en suspension, l'écuyer de dos sans son visage. Exactement le prompt. Tiers supérieur à 22,2 → titre crème. `carte-saumur.webp` et `fond-saumur.webp` produits.
⚠️ Réserve mineure, pas une incohérence : on est pile derrière le cheval, donc croupe et queue mais pas de tête. La règle « le cheval est le héros » est affaiblie, mais le lieu porte l'image.

### 🔴 WARENDORF — l'image raconte un autre chapitre, et celui d'une autre ville
Son chapitre est **« La formation »** : on y forme les enseignants et les cavaliers professionnels. L'image montrait **un poulain seul dans une allée** — c'est de l'élevage. Et pire : barrières blanches, poulain, grange, brume, c'est **l'identité visuelle de Lexington**. Deux cartes qui se confondent, précisément le problème qu'on cherchait à résoudre.
✅ **Blandine a tranché en une phrase : « ah ben mets-les à Lexington alors ».** L'image devient `carte-lexington.webp` et `fond-lexington.webp`, remplaçant celles du portail au château d'eau — conservées de mon côté sous `*-ancienne.webp`.
✅ C'est mieux sur le fond : Lexington enseigne **le haras**, et un poulain raconte ça mieux qu'un portail.
⚠️ **Contradiction restante, dans MON texte et non dans son image** : le premier volet de Lexington s'appelle « Les barrières noires » et décrit du bois peint en noir, alors que la nouvelle carte montre des barrières blanches. Signalé, trois voies proposées, **rien touché** — c'est son texte autant que son image. Elle a répondu « pas grave », donc la contradiction reste assumée pour l'instant.

### 🔴 DUBAÏ — la fidélité l'emporte sur la beauté, et c'est elle qui l'a dit
Son chapitre est **l'endurance** : le kilomètre, le contrôle vétérinaire, le rythme cardiaque. L'image envoyée était une **présentation de race** — un arabe posé en licol de présentation dans une cour. Superbe, et objectivement plus claire que les autres (ensemble à 98,7 contre 75,7 pour l'actuelle).
J'ai d'abord produit les fichiers en acceptant le compromis. **Blandine a corrigé la trajectoire : « sinon tu mets la carte à quelqu'un d'autre, faut que ça reste fidèle ».** Elle a raison, et c'est le bon arbitrage.
✅ **Tout est revenu en arrière** : Dubaï garde sa carte de plage — quatre chevaux au galop dans l'eau, ce qui dit au moins la distance et le mouvement. Fichiers restaurés, `dubai` retirée de `TITRE_SOMBRE`, avertissement écrit dans le code pour ne pas l'y remettre sans remesurer la carte réellement en ligne.

### 📌 Ce que cet aller-retour a quand même prouvé
Le tiers supérieur de la carte refusée mesurait **125,7** — la première image du projet à franchir le seuil de 100. Le mécanisme de bascule du titre, écrit le 6 août et jamais déclenché depuis, **fonctionne**. Les cartes en couleurs normales qui arrivent vont l'utiliser de plus en plus : la lisibilité du titre n'est pas un obstacle au changement de palette.

### ⏳ L'image de la cour reste sans emploi
Elle est belle et n'appartient à aucun chapitre écrit. Deux pistes si Blandine veut la garder : **Jerez** (« Le cheval », où l'on décrit un cheval à l'arrêt — mais son cheval est un arabe et Jerez enseigne le pura raza española), ou une future ville du Golfe. À trancher par elle, pas par moi.

### Contrôles passés
`verif.py` sur `lingo.html` · les trois images mesurées avant tout jugement (tiers supérieur, bande basse, ensemble) · ancienne et nouvelle carte de Lexington comparées avant remplacement · carte de Dubaï restaurée et remesurée à 54,7 après l'aller-retour · copies de sauvegarde des deux cartes remplacées.

### 🧭 Préparation Flutter
**Aucune modification d'architecture** — production d'actifs et un retour arrière.
Deux acquis de méthode :
- **Mesurer avant de juger, et identifier au contenu et non au libellé.** Les trois défauts trouvés ce coup-ci étaient de fond (le chapitre que l'image raconte), pas de forme — et aucun n'aurait été vu en regardant la lumière.
- **Un retour arrière doit être complet.** Restaurer la carte sans retirer `dubai` de `TITRE_SOMBRE` aurait laissé un titre foncé sur une carte sombre, c'est-à-dire illisible : exactement le défaut qu'on venait de corriger sur Golegã. Un avertissement est écrit à l'endroit du piège.
**Risques** : aucun.

---

## ✉️ SESSION 122 · LINGUAE (07/08) — LES CINQ LETTRES MANQUANTES, ET LE PROMPT DES CARTES POSTALES

### ✅ Les cinq villes sans dépliant sont complétées
Blandine : « sur les pages d'arrivée normalement on a le dépliant et les cartes et objets à gagner, là je vois plein de villes sans ».
Diagnostic précis avant d'écrire : **les dix villes britanniques ont bien leurs lettres**, dans `hype-lingo-villes.js` — un fichier qui n'est pas dans cette conversation, d'où l'impression qu'elles manquaient aussi. Les vraies absentes étaient les **cinq dernières villes écrites** : Lexington, Spruce Meadows, Tokyo, Buenos Aires, Tamworth.

✅ Lettre (deux paragraphes) et trois volets pour chacune, **six langues** :
· **Lexington** — Les barrières noires · Vendre un cheval d'un an · Si tu y allais
· **Spruce Meadows** — L'hiver albertain · C'est le sol qui décide · Si tu y allais
· **Tokyo** — Le yabusame · Ce qui ne s'écrit pas · Si tu y allais
· **Buenos Aires** — Huit chevaux pour un homme · La ligne de balle · Si tu y allais
· **Tamworth** — Le rassemblement · L'anglais d'ici · Si tu y allais

Le fichier des villes passe de 14 à **19 entrées**. Avec les dix britanniques, les vingt-neuf étapes ont désormais leur verso.
⚠️ **Le cadrage de Spruce Meadows est tenu jusque dans son troisième volet**, qui dit franchement au lecteur que la saison de saut est l'été et que le vocabulaire du chapitre est celui de l'hiver. Mieux vaut le dire que laisser un cavalier averti buter dessus.

### 🔴 Trois coquilles de ma main, attrapées avant livraison
1. **Le « ⚠️ » apparaissait dans du texte VU par le joueur** — deux volets, Le Morne et Spruce Meadows. Ce signe est une convention de mes commentaires de code et des champs `def` ; dans un paragraphe narratif de l'écran d'arrivée, il n'a rien à faire. Retiré des deux, et reformulé en prose.
2. **Un mot anglais resté dans le japonais** de Tokyo (« good » au milieu d'une phrase). Trouvé par un balayage de mots parasites sur tout le fichier — le même balayage a signalé trois autres « good » qui étaient, eux, de l'anglais légitime : **un contrôle automatique se relit, il ne se croit pas.**
3. **Un accent manquant** dans le souvenir de Tamworth (« Une corde tressee »).

### ✅ `hype-linguae-prompt-cartes.txt` — une lumière par ville
Blandine : « les cartes postales en doré sont toutes un peu ressemblantes, je vais les refaire comme l'île Maurice plutôt, en couleurs normales ».

Elle a raison, **et il y a une cause mécanique** qu'il fallait trouver avant de réécrire quoi que ce soit. La consigne de lumière des anciens prompts dit textuellement : « le soleil est juste sous l'horizon… la palette ne change JAMAIS : bleu nuit en haut, or au centre. Jamais de plein jour. » Excellente pour un clip de cinq plans qui doit tenir ensemble ; **désastreuse pour vingt-neuf cartes qu'on voit côte à côte**. Le Morne est la seule qui échappait à la règle, et la seule qu'on distingue au premier coup d'œil.

✅ Nouveau prompt qui **sépare les deux cas** : la règle de palette unique reste pour les clips, et disparaît pour les cartes. **Chaque ville reçoit son heure et son climat**, listés une par une — plein jour couvert au Connemara, aube froide à Newmarket, plein midi de feria à Séville, jour de novembre sans soleil à Vérone, hiver bleuté à Spruce Meadows.
✅ Y sont aussi rappelées les contraintes techniques que le générateur ignore : format 3/4 et non 9/16, **le cheval au premier plan** (plusieurs cartes actuelles en font un détail du paysage), tiers supérieur calme pour le titre, 15 % du bas laissés libres à cause du voile du carnet, et pas de cadre ni de coins arrondis puisque l'application dessine la forme.
✅ Et une bonne nouvelle qui autorise le plein jour : **le titre s'adapte tout seul**, puisque je mesure le tiers supérieur de chaque carte pour choisir entre le crème et le foncé.

### Contrôles passés
`verif.py` sur les deux fichiers · les cinq villes contrôlées par exécution : lettre à deux paragraphes et trois volets titre + corps, **six langues, zéro manque** · balayage du « ⚠️ » dans tout texte visible : aucun restant · balayage de mots parasites · rendu réel des trois écrans d'arrivée (volets, carte postale, souvenir) · aucune erreur JS.

### ⏳ Ce qui reste
1. **Les vingt-neuf cartes postales à refaire** en couleurs normales — prompt livré. Je refabrique les fonds et remesure le titre à chaque envoi.
2. `lingua-affiche.webp` et le fond du carnet.
3. Les définitions en quatre langues.
4. La sécurité (11 mots) attend une ville.
5. `niveau` divergent entre `arrivee` et `concours`.

### 🧭 Préparation Flutter
- **Un diagnostic avant une écriture** : la plainte disait « plein de villes sans », la réalité était « cinq villes sans, et dix que tu ne peux pas voir d'ici ». Vérifier quel fichier porte quoi avant d'écrire évite de réécrire ce qui existe.
- **Une règle bonne dans un contexte, mauvaise dans l'autre.** La palette unique servait la cohérence d'un clip et détruisait la lisibilité d'une grille. Le nouveau prompt sépare explicitement les deux usages plutôt que de choisir un compromis mou.
- **Un contrôle automatique doit se relire** : le balayage de mots parasites a trouvé une vraie faute et trois faux positifs. Utile, pas décisionnaire.
- **Reste à moderniser** : inchangé.
- **Risques** : aucun. Contenu et un fichier de prompt.

---

## 🖼️ SESSION 121 · LINGUAE (07/08) — LES CARTES DU CARNET DEVIENNENT NETTES ET CLIQUABLES

### ✅ La carte postale nette passe devant le flou
« On voudrait voir les cartes moins floues, là on voit vraiment rien. » Deuxième fois qu'elle le dit — l'éclaircissement de la session 116 n'a pas suffi, et c'était prévisible : **un flou de 420 px reste un flou**, et six villes n'ont même aucun fond.

✅ **Deux images empilées, la nette d'abord.** CSS multiple backgrounds : la première déclarée est dessinée au-dessus, et si son fichier n'existe pas elle est simplement ignorée. On met donc `carte-X.webp` (nette, 900×1200) devant `fond-X.webp` (le flou) — **repli automatique, sans `onerror` et sans liste à maintenir.** Les quinze villes qui ont leur carte postale s'affichent nettes, les autres gardent le flou.
✅ `brightness` redescend de **1,95 à 1,12** : le 1,95 servait à rattraper un flou volontairement assombri à 40 de luminance. Le laisser aurait délavé les cartes nettes.

⚠️ **J'avais argumenté CONTRE, en session 98 : la carte postale est la récompense, la montrer avant le départ grille le cadeau.** L'argument ne tient pas face à « on ne voit rien ». Et ce n'est pas tout à fait la même chose : ici elle est rognée en 3/4, assombrie par le voile et sert de fond ; la récompense reste la carte entière, avec sa lettre au verso, son tampon et son entrée dans la collection.

### ✅ La carte déjà retournée emmène dans la ville
« Quand on clique dessus alors qu'elles sont déjà retournées ou qu'on double clic on s'attendrait à être envoyé sur la page concernée. »
✅ **Deux temps** : carte de face → elle se retourne et montre le chapitre, le niveau et le compte de mots ; carte au verso → **on part dans la ville**. Un double tap fait donc naturellement les deux, ce qui est exactement ce qu'elle décrivait.
✅ **Une seule carte ouverte à la fois** : ouvrir une autre referme la précédente. Plus besoin de refermer pour lire ailleurs.
✅ `partirVersVille()` masque le carnet **après** avoir ouvert l'arrivée, jamais avant — c'est la leçon du flash du chemin de la session 99.

### ⏳ Ses deux autres remarques : très probablement le fichier en ligne
« On voit toujours un moment la page Le tour du monde entre la vidéo d'accueil et la première vidéo » et « l'écran de choix de langue est où, je le vois pas ».
Les deux ont été corrigés en **session 119** : le carnet part masqué depuis le HTML lui-même (mesuré, relevé toutes les 50 ms, zéro apparition), et la ligne de langue du carnet est devenue un bouton. **Les deux symptômes disparaissent ensemble si le fichier livré n'est pas encore déployé** — et c'est l'explication la plus simple, puisque ce sont précisément les deux corrections de cette livraison.
✅ **Test donné à Blandine pour trancher en un coup d'œil** : sur le carnet, la ligne « — anglais — » doit être soulignée d'un trait turquoise fin. Si elle ne l'est pas, le fichier en ligne est l'ancien, et les deux remarques s'expliquent. Si elle l'est, le défaut est réel et je cherche ailleurs.

### Contrôles passés
`verif.py` sur `lingo.html` · rendu réel : image empilée vérifiée (`url(carte-…), url(fond-…)`), filtre à 1,12, Le Morne s'affiche net et La Baule retombe sur son flou faute de carte locale — le repli fonctionne dans les deux sens · premier tap = retournement avec une seule carte ouverte, second tap = arrivée ouverte sur la bonne ville, carnet masqué après · aucune erreur JS.

### ⏳ Ce qui reste
1. Les lettres et volets de cinq villes.
2. `lingua-affiche.webp` et le fond du carnet.
3. Les définitions en quatre langues.
4. La sécurité (11 mots) attend une ville.
5. `niveau` divergent entre `arrivee` et `concours`.

### 🧭 Préparation Flutter
- **Un repli obtenu par le CSS plutôt que par du code** : deux images empilées remplacent un `onerror`, un test de chargement ou une liste de villes à maintenir. Moins de code, et un comportement qui ne peut pas se désynchroniser des fichiers réellement présents.
- **Un geste, deux intentions, sans bouton de plus** : retourner puis partir. C'est le genre d'affordance qui se porte tel quel, et qui évite d'ajouter un « Partir » sur chacune des vingt-neuf cartes.
- **Une décision de conception révisée par l'usage.** J'avais raison sur le principe — ne pas montrer la récompense avant de l'avoir gagnée — et tort sur le résultat, parce que la conséquence était un écran illisible. Le principe cède quand il produit une interface qu'on ne peut pas utiliser.
- **Reste à moderniser** : inchangé.
- **Risques** : aucun. Une image de plus dans une pile CSS, et un branchement de clic.

---

## 🌐 SESSION 120 · LINGUAE (07/08) — TOUT EST OUVERT, LE PLANCHER SUPPRIMÉ, THÈMES ET NIVEAUX AFFICHÉS

### ⚠️ D'abord une rectification, parce qu'elle compte
Blandine : « ne retire pas de page sans m'en avertir ». **Aucune page n'a été retirée.** L'écran de choix de la langue (`#dest`) est dans le fichier depuis le début et n'a jamais été supprimé. Ce qui a changé, c'est qu'il n'était joignable **qu'à la première visite** — et tant qu'une seule langue était ouverte, ça ne se voyait pas. La session 106 a ouvert les six langues sans ouvrir de porte pour y revenir : voilà la faute, et elle est de moi.
🔴 **Et un commentaire du code mentait**, ce qui explique la confusion : il affirmait que « le choix de destination reste accessible par le bouton de retour du carnet de route ». C'est faux — ce bouton ramène AU carnet, il n'a jamais mené au choix de la langue. Le commentaire est corrigé et dit maintenant où est la vraie porte.
✅ La porte existe depuis la session 119 : **la ligne de langue du carnet est un bouton**. Elle est dans le fichier livré.

### ✅ TOUT EST OUVERT
« Ouvre tout — pour les villes on peut avoir besoin d'étudier un chapitre en particulier qui soit à la fin. »

Deux règles se superposaient et se contredisaient : un déblocage en chaîne, **et** un plancher de quatre villes offertes. Le plancher était le plus grave : `var FAITS = 4` marquait quatre villes comme **FAITES sans qu'elles aient été jouées** — elles portaient leur tampon sur le chemin. **C'est l'explication du tampon de Lambourn.** Une ville marquée faite sans avoir été ouverte, c'est un mensonge de l'interface.

✅ Une seule règle désormais : **tout est accessible, tout le temps.** Supprimés : le plancher (`FAITS` part de 0), le cadenas du chemin (`class="verrou"` n'est plus jamais posée), le libellé « Termine X d'abord », le repli du globe vers la dernière ville accessible, le filtre d'accessibilité des fils de sortie, et la désactivation du bouton de la fiche du globe.
✅ **`FAITS` change de nature** : il ne mesure plus l'avancée du déplacement mais le **nombre réel de chapitres terminés**, recompté à chaque retour et au démarrage. La trace dessinée sur le chemin dit donc enfin la vérité.
✅ Le bouton d'aperçu ne déverrouille plus rien — tout est ouvert — et **ne sauvegarde plus** : il ne doit pas faire croire à une progression qui n'existe pas.
⚠️ **NE PAS RÉINTRODUIRE DE PLANCHER**, c'est écrit dans le code. Si la progressivité revient un jour, elle doit se voir dans le niveau affiché, pas dans une porte fermée.

### ✅ Les trois états changent de sens, et gagnent en justesse
Puisque plus rien n'est verrouillé :
· **FAITE** — le chapitre est terminé
· **OUVERTE** — commencée : au moins un mot su
· **À DÉCOUVRIR** — jamais touchée. Ce n'est plus « fermée » mais « pas encore visitée » — ce que le mot dit d'ailleurs.
Les quatre filtres du globe gardent tout leur sens, et le bouton dit « Partir » dans les six langues au lieu de « Pas encore ouverte ».

### ✅ Thèmes et niveaux affichés
« Pense à préciser à côté les thèmes et niveau de difficulté. »
Le thème y était déjà — c'est le champ `region` de chaque point, alimenté par le chapitre : « Italie · Le commerce ». Le niveau, non : **le globe ne connaissait pas `NIVEAU_VILLE`.**
✅ Le parent le lui **envoie** avec son nom déjà traduit, plutôt que de dupliquer la table là-bas. Affiché sur **les lignes de la liste et sur la fiche**, avec le même dessin que sur les cartes du carnet : trois barres, autant d'allumées que le palier, et le mot — NOMMER, SITUER, DIRE.
⚠️ Les cartes du carnet, elles, se retournent déjà et portent thème, niveau et compte de mots depuis la session 113. Les deux écrans disent maintenant la même chose.

### Contrôles passés
`verif.py` sur `lingo.html` et `lingo-globe.html` · `FAITS` vérifié à 0 au démarrage · les 29 villes parcourues sans qu'aucun cadenas n'apparaisse · `etatPourGlobe()` renvoie bien 29 niveaux traduits · globe testé avec un état simulé : 29 lignes, thème et niveau sur chacune, fiche d'une ville « à découvrir » avec son niveau et un bouton **Partir actif** · aucune erreur JS.

### ⏳ Ce qui reste
1. Les lettres et volets de cinq villes (Lexington, Spruce Meadows, Tokyo, Buenos Aires, Tamworth).
2. `lingua-affiche.webp` et le fond du carnet.
3. Les définitions en quatre langues.
4. La sécurité (11 mots) attend une ville.
5. `niveau` divergent entre `arrivee` et `concours`.

### 🧭 Préparation Flutter
- **Une règle au lieu de deux qui se contredisent.** Le plancher et la chaîne cohabitaient sans que personne puisse dire ce qui était vrai. Une seule règle, écrite, avec un avertissement contre son retour.
- **Un compteur qui compte au lieu d'un compteur qui suppose.** `FAITS` était une position dans une chaîne, il devient une mesure de l'état réel, dérivée de la maîtrise. Une valeur dérivée ne peut pas mentir ; une valeur stockée en parallèle, si.
- **Le niveau voyage au lieu d'être dupliqué** : le globe reçoit la donnée du parent plutôt que d'embarquer sa copie de `NIVEAU_VILLE`. Une seule source de vérité pour deux documents.
- **Reste à moderniser** : le « prêt » global, `niveau` divergent.
- **Risques** : le sens de « À découvrir » change pour les joueurs existants — une ville jamais touchée s'affichait déjà ainsi, donc l'affichage ne bouge pas ; ce qui change, c'est qu'on peut désormais y aller.

---

## 🗝️ SESSION 119 · LINGUAE (07/08) — LE CHOIX DE LA LANGUE ÉTAIT DEVENU INACCESSIBLE, ET LE FLASH SUPPRIMÉ À LA SOURCE

Quatre remarques de Blandine. **Deux étaient des défauts que j'ai corrigés, deux demandent sa décision** — je ne les ai pas touchées.

### 🔴 1 · « Où est passée la page où on choisit la langue ? »
Elle n'a jamais bougé : elle n'était accessible **que par l'écran de présentation, qui ne se montre qu'à la première visite**. Tant qu'une seule langue était ouverte, personne ne s'en apercevait. **Depuis la session 106 qui a ouvert les six, il n'existait plus aucun chemin pour en changer.** C'est moi qui ai créé le problème en ouvrant les langues sans ouvrir la porte.
✅ **La ligne « — anglais — » du carnet devient un bouton** et renvoie au choix. C'est l'endroit évident : elle affiche déjà la langue. Soulignement turquoise discret pour qu'on devine qu'elle se touche.

### 🔴 2 · Et un second défaut trouvé en testant le premier
Choisir une langue changeait bien `VOYAGE_LANGUE`, **mais rien ne redessinait l'écran** : après avoir choisi l'italien, le carnet continuait d'annoncer « — anglais — », et le titre du document aussi. Invisible jusqu'ici parce qu'on ne pouvait choisir qu'une seule fois, avant même d'avoir vu le carnet.
✅ `appliquerLangue()` est appelée au choix. Vérifié sur trois langues d'affilée : le libellé, la cible et le titre suivent.

### 🔴 3 · Le flash du carnet entre la vidéo d'entrée et le film
« La page pop quelques centièmes de seconde entre les deux. »
Le carnet était l'écran **visible par défaut**, et `lancerFilm()` ne le masque qu'une fois le script parcouru. Entre le premier affichage de la page et cet instant, il se voyait. Mon correctif de la session 97 avait supprimé le flash du *chemin* entre le carnet et le globe, mais pas celui-ci, qui a une cause différente.
✅ **Le carnet part maintenant masqué** (`class="joue"` dans le HTML lui-même) : il ne peut plus apparaître avant l'heure. C'est `terminerOuverture()` qui le révèle à la fin du film.
✅ Mesuré au chargement, relevé toutes les 50 ms sur une deuxième visite — le cas exact de Blandine : **zéro instant où le carnet est visible avant l'heure.**
⚠️ Le raccourci `#sprint` / `#duel` retire la classe explicitement : sans ça, en fermant le sprint on serait ressorti sur un carnet invisible.

### ⏳ 4 · « Beaucoup de villes sont encore inatteignables » — question de conception, pas défaut
Les correctifs de la session 117 (plafond à dix, avancement sauvegardé) **ne suffisent pas** : le déblocage reste une **chaîne stricte**, une ville à la fois, en partant de la quatrième. Avec vingt-neuf étapes, atteindre Tamworth demande vingt-cinq leçons dans l'ordre imposé.
Ça se défendait à dix villes. À vingt-neuf, c'est une décision à reprendre, et **ce n'est pas à moi de la prendre**. Trois pistes à trancher avec elle : ouvrir tout un continent dès qu'une de ses villes est faite ; ouvrir les trois suivantes au lieu d'une ; ou garder la chaîne mais commencer plus haut. Rien touché.
⚠️ Rappel : le bouton d'aperçu du chemin ouvre tout d'un tap, et il sauvegarde depuis la session 117.

### ⏳ 5 · Le tampon de Lambourn sans avoir appris un mot
Deux mécanismes peuvent l'expliquer, et **je ne peux pas départager sans voir son téléphone** :
· **Le tampon dessiné sur la carte postale est décoratif** : le verso porte toujours le nom de la ville, gagné ou pas. Sur l'écran d'arrivée la carte est en mode aperçu (assombrie), mais le tampon y figure quand même. Ce serait alors normal — c'est l'aperçu de ce qu'elle peut gagner.
· **Ou bien `var FAITS = 4`** : les quatre premières villes sont offertes au démarrage, et les villes « faites » portent leur tampon sur le chemin. Ce plancher de quatre est d'origine, mais avec le réordonnancement du 6 août les quatre offertes ne sont plus les mêmes qu'avant.
La carte n'est réellement acquise que par `garderCarteLecon()`, **sur une leçon sans une seule faute** — jamais autrement. La page Collection dit la vérité : ce qui y figure est gagné.

### Contrôles passés
`verif.py` sur `lingo.html` · **flash mesuré par relevé toutes les 50 ms au chargement**, première et deuxième visite : zéro fuite · parcours complet présentation → destination → film → carnet · bouton de langue testé sur trois langues, libellé, cible et titre du document vérifiés à chaque fois · raccourci `#sprint` vérifié · aucune erreur JS.

### 🧭 Préparation Flutter
- **Un état initial déclaré dans le HTML plutôt que corrigé en JS** : le carnet part masqué au lieu d'être masqué après coup. C'est la différence entre un état initial et une correction d'état — et la seule des deux qui ne peut pas rater.
- **Une leçon qui se répète** : ouvrir une fonctionnalité (les six langues) sans ouvrir son chemin d'accès. La session 106 a livré six langues jouables et zéro moyen d'en changer. À vérifier systématiquement : quand on rend quelque chose possible, par où y arrive-t-on ?
- **`appliquerLangue()` n'était appelée qu'au démarrage** alors qu'elle est faite pour être rejouée. Un rendu doit pouvoir être redemandé à tout moment — c'est exactement ce qu'un `setState` impose, et ce que ce fichier fait encore à la main.
- **Reste à moderniser** : le « prêt » global, `niveau` divergent, et la règle de déblocage à revoir avec Blandine.
- **Risques** : aucun. Un état initial, un appel de rendu, un bouton.

---

## 🤠 SESSION 118 · LINGUAE (06/08) — TAMWORTH, LA DERNIÈRE. ET DEUX FAUX RAPPELS DÉMASQUÉS PAR LE SCRIPT

### ✅ Tamworth (Nouvelle-Galles du Sud), étape 26 — LE WESTERN
`hype-lingo-lex-western.js` : la selle western, la corne, le licol éthologique, la corde, le troupeau, le rassemblement, le tri, le stock horse, monter à une main, les chaps, les parcs à bétail, le chapeau à large bord.

**Le western n'existait nulle part dans les 378 mots d'origine.** Ni la selle à corne, ni le troupeau, ni le tri, ni la monte à une main. Tout le module était écrit pour l'équitation classique européenne : c'était le plus gros angle mort qui restait.

⚠️ **Et l'anglais d'ici n'est pas celui des autres villes** — c'est le sujet du chapitre, pas un détail :
· le troupeau → **the mob**, et pas « the herd »
· le rassemblement → **the muster**, mot qu'un Anglais n'emploierait pas
· les parcs → **the yards**, toujours au pluriel — alors que dans une écurie britannique « the yard » au singulier désigne la cour
· le chapeau → **an Akubra**, du nom de la marque
Un cavalier qui ne connaît que l'anglais des écuries britanniques ne comprendrait pas une phrase de Tamworth.
⚠️ **Relecture par un natif AUSTRALIEN**, pas britannique. `the mob`, `the muster` et `neck reining` en priorité.

Elle remplit le dernier créneau réservé, à **15 h 40**. La suite des heures est complète et croissante de La Baule à Spruce Meadows. **Les vingt-neuf étapes prévues sont écrites.**

### 🔴 Deux FAUX RAPPELS, trouvés par le contrôle automatique et pas à l'œil
Le script qui compare les `ref` partagés entre les douze lexiques a été étendu : il ne se contente plus de signaler un `ref` en double, **il compare les six traductions**. Il a immédiatement remonté deux cas — **les deux de ma main**.

**1 · `prix` était un faux rappel, et le pire type.** J'avais nommé l'entrée de Vérone `prix` en la présentant comme un rappel de La Baule. Deux fautes : le mot n'est pas à La Baule mais dans le chapitre **concours**, et surtout il n'y désigne **pas la même chose** — là-bas `prix` est l'argent qu'on **gagne** (« the prize money »), à Vérone c'est l'argent qu'on **paie** (« the price »). Aucune langue ne les confond.
Partager le `ref` aurait fait passer « prize money », su à Badminton, pour « price » acquis à Vérone — et l'exercice aurait testé une traduction que le joueur n'a jamais vue.
✅ Renommé **`prix-achat`** (« le prix demandé » / « the asking price »), et la définition explique désormais la différence avec le prix d'un concours.

**2 · `abandon` divergeait sur deux langues.** Cette entrée partage volontairement son `ref` avec le chapitre obstacle, mais j'avais écrit `der Aufgabe` en allemand — **faux en plus** (Aufgabe est féminin ; la forme juste est le verbe substantivé neutre `das Aufgeben`, déjà utilisée dans l'autre fichier) — et `リタイア` en japonais là où obstacle dit `棄権`.
✅ Les deux alignées sur l'entrée existante. Un même `ref` doit porter exactement les mêmes mots, sinon ce n'est pas un rappel mais un piège.

### ⚠️ Et un troisième, antérieur, qui n'est PAS de moi
`niveau` est partagé entre `arrivee` et `concours` avec **deux allemands différents** : `das Niveau` d'un côté, `die Klasse` de l'autre. Les deux sont défendables — le niveau du cavalier et la catégorie d'une épreuve ne sont pas la même notion — mais alors ce ne devrait pas être le même `ref`. **Rien touché** : c'est du contenu antérieur, et le renommer déplacerait la maîtrise déjà acquise des joueurs. À trancher avec Blandine.

### Contrôles passés
`verif.py` sur les quatre fichiers · **contrôle des rappels étendu à la comparaison des six traductions**, sur 12 lexiques et 220 mots : deux divergences trouvées, deux corrigées, une signalée · lexique western contrôlé par exécution · 29 étapes, suite des heures relue et croissante · `RECITS` complet sur 29 villes × 6 langues · rendu réel de l'écran d'arrivée de Tamworth avec son clip et sa carte · aucune erreur JS.

### ⏳ Ce qui reste
1. **Les lettres et volets de cinq villes** : Lexington, Spruce Meadows, Tokyo, Buenos Aires, Tamworth. Leurs cartes postales s'affichent sans texte au verso.
2. `lingua-affiche.webp` et le fond du carnet.
3. Les définitions en quatre langues.
4. La sécurité (11 mots) attend une ville.
5. Le `niveau` divergent à trancher.

### 🧭 Préparation Flutter
- **Le contrôle de contenu a franchi un cap** : il ne vérifie plus la forme (un `ref` en double) mais **le sens** (les six traductions concordent). C'est un test de cohérence sémantique, et il a trouvé deux défauts qu'aucune relecture humaine n'aurait vus — le mot était juste dans les deux fichiers, c'est leur mise en commun qui était fausse.
- **Une leçon générale** : mes deux erreurs viennent de la même cause, avoir cru me souvenir d'où venait un mot au lieu de vérifier. Le script est plus fiable que ma mémoire du projet, et il coûte deux secondes.
- **Douzième lexique, aucune fonction touchée.** Le geste d'ajout de ville n'a pas varié depuis Le Morne.
- **Reste à moderniser** : le « prêt » global, et `niveau` à trancher.
- **Risques** : le renommage de `prix` en `prix-achat` touche une maîtrise **jamais acquise** — Vérone n'a été écrite qu'aujourd'hui, aucun joueur n'a pu apprendre ce mot. Aucune migration nécessaire.

---

## 🔓 SESSION 117 · LINGUAE (06/08) — « POURQUOI PLEIN D'ENTRE ELLES NE SONT PAS OUVERTES ? » : QUATRE DÉFAUTS EMPILÉS

Deux questions de Blandine, deux vrais défauts derrière — et un troisième trouvé en corrigeant.

### 🔴 1 · La progression s'arrêtait à la DIXIÈME ville
`if(courant===FAITS && FAITS<10)` — un **dix codé en dur**, reste de l'époque où le voyage comptait dix villes. Avec vingt-huit étapes, **dix-huit d'entre elles étaient définitivement inatteignables** : même en jouant parfaitement, on ne débloquait jamais au-delà de la dixième. Le même dix bloquait le défilement du chemin et l'annonce de la ville suivante.
✅ Remplacé par `ETAPES.length` aux trois endroits.

### 🔴 2 · L'avancement n'était jamais sauvegardé
`var FAITS = 4` en dur, écrit nulle part. À **chaque rechargement**, le voyage repartait à la quatrième ville et tout ce qui avait été ouvert se refermait.
✅ Rangé dans `hype_lingua_faits`, **par langue** — cohérent avec la maîtrise depuis la session 106 : un cavalier qui passe à l'espagnol recommence son voyage, puisque son vocabulaire espagnol est vierge. Le plancher reste à 4 : les quatre premières villes sont offertes, c'était le comportement d'origine.
✅ Vérifié dans les deux sens : `{"en":13,"es":6}`, l'anglais retrouve 13 en revenant, l'espagnol garde 6.

### 🔴 3 · Et la sauvegarde ne se relisait pas — même piège d'ordre que d'habitude
Premier essai : la valeur était **bien écrite** sous `"en"` mais **jamais relue**. `chargerFaits()` était appelée à la déclaration de `FAITS`, or `VOYAGE_LANGUE` est déclarée bien plus bas dans le même script : on lisait donc `FAITS_TOUT[undefined]`, et on retombait toujours sur 4.
✅ L'appel déplacé après la relecture du voyage, avec un redessin du chemin et des jalons — qui avaient déjà été tracés avec la valeur par défaut. Mesuré : 13 survit au rechargement, 28 jalons redessinés.
⚠️ **Quatrième fois** que ce fil bute sur l'ordre d'exécution du fichier (le compte de mots, le libellé de niveau, le titre de l'itinéraire, et maintenant l'avancement). Chacun a son contournement local. Un vrai « prêt » global les remplacerait tous.

### 🔴 4 · Le globe : après avoir ouvert UNE ville, la liste ne revenait plus jamais
« Une fois que j'ai ouvert ceux à découvrir ils ne s'ouvrent plus, du coup on n'a plus nulle part où aller. »
Toucher une ville posait `RES.style.display='none'` en style **inline**, pour laisser voir le globe. Or `renderResults()` ne réaffichait la liste qu'en ajoutant la classe `on` — et **un style inline est plus fort qu'une classe**. Après une seule fiche ouverte, la liste était morte, quel que soit l'onglet, pendant que le compteur continuait d'annoncer « 4 AFFICHÉS ». Le voyage devenait sans issue.
✅ `renderResults()` remet l'affichage à chaque rendu. Reproduit puis vérifié : après ouverture d'une fiche, changer d'onglet ramène bien la liste.
✅ Trouvé au passage : le bouton retour testait ce même style inline jamais posé — **la branche était morte**, il n'effaçait jamais la recherche. Corrigé.

### ✅ Et le compteur du globe, tant qu'on y était
« 4 AFFICHÉS » était en dur : masculin alors que les villes sont féminines, toujours au pluriel même pour une seule, et **jamais traduit** alors que tout le reste du globe parle six langues. Devient « 1 ville affichée » / « 23 villes affichées », dans les six langues.

### Contrôles passés
`verif.py` sur `lingo.html` et `lingo-globe.html` · défaut du globe **reproduit avant correction** puis vérifié après, sur les trois onglets · persistance de l'avancement testée avec rechargement et changement de langue · plafond de progression vérifié à 27 → 28 · compteur relu en français et en anglais · aucune erreur JS.

### ⏳ Ce qui reste
1. **Tamworth** — la dernière ville, créneau réservé à 15 h 40.
2. Les lettres et volets de Lexington, Spruce Meadows, Tokyo, Buenos Aires.
3. `lingua-affiche.webp` et le fond du carnet.
4. Les définitions en quatre langues.
5. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
- **Deux constantes codées en dur remplacées par la donnée** : `10` devient `ETAPES.length`. C'est exactement le type de valeur qui survit à un portage et casse silencieusement.
- **Troisième magasin dimensionné par langue** (`maîtrise`, et maintenant `avancement`). Il ne reste que `quiz` et `cartes` à trancher — l'incohérence est désormais isolée à deux clés.
- **Un style inline supprimé au profit d'une classe** : le défaut du globe venait du mélange des deux façons de cacher un élément. Un seul mécanisme d'état par élément, c'est aussi ce que demandera le portage.
- **Reste à moderniser** : le « prêt » global, réclamé pour la quatrième fois.
- **Risques** : la sauvegarde de l'avancement crée une clé neuve, sans migration à faire — l'absence de valeur retombe sur 4, le comportement d'avant.

---

## 🔎 SESSION 116 · LINGUAE (06/08) — « ON LIT MAL » : LA MESURE DIT QUE CE N'ÉTAIT PAS LA COULEUR

Blandine : « idem on lit mal niveau couleurs je trouve ». **J'ai mesuré au lieu d'estimer, et le diagnostic n'est pas celui-là.**

### 🔴 Contraste mesuré sur les pixels réels, pas jugé à l'œil
Fond reconstitué comme il apparaît vraiment — image éclaircie à 1,95 puis voile appliqué — puis luminance relative et rapport de contraste calculés par zone :

| texte | couleur | contraste | verdict |
|---|---|---|---|
| titre de la ville | `#F4F7FA` | **18,5:1** | largement bon |
| pays sur la face | `#94A3AF` | **7,7:1** | bon |
| numéro d'étape | `#20D9F5` | **9,3:1** | bon |
| chapitre au dos | `#D4AF37` | **8,9:1** | bon |
| phrase au dos | `#B3C0CB` | **10,1:1** | bon |
| gris du compte de mots | `#6E7C88` | **4,35:1** | juste sous le seuil de 4,5 |
| **barre de niveau éteinte** | `rgba(…,.22)` | **1,56:1** | **invisible** |

**Un seul élément était vraiment fautif en couleur** : la barre de niveau éteinte, à 1,56:1 — littéralement invisible sur le fond éclairci. Et un second de justesse, le gris du compte de mots.

### ✅ Le vrai coupable était la TAILLE
Tout le reste était à **7,5 ou 8 px, en capitales, avec .11 à .20 em d'interlettrage**. À cette taille, un contraste de 8:1 ne sert à rien : ce n'est pas une question de lumière mais de dessin de lettre. C'est pour ça que Blandine parlait de couleurs — le symptôme est le même, la cause non.

Repris, tout en gardant l'échelle de la carte : le pays 8 → **9,5 px**, le chapitre au dos 7,5 → **9 px**, le niveau et le compte de mots 8 → **9 px**, la phrase 10,5 → **11,5 px**, le nom au dos 12 → **13 px**, le numéro 10 → **11 px**. Interlettrages resserrés en conséquence, parce qu'un espacement large sur une petite capitale sépare les lettres plus qu'il ne les aère.
Et les couleurs remontées quand même là où l'écart s'était réduit — l'or à `#E8C980` comme sur le souvenir de l'écran d'arrivée, le gris à `#93A2AE` (7,1:1), la barre éteinte à `.42` avec une ombre pour tenir sur les fonds clairs. Ombres portées ajoutées sur les textes posés au-dessus de l'image, qui est plus lumineuse depuis la session 115.

⚠️ **Règle notée dans le CSS** : sur ces cartes, ne jamais descendre sous **9 px pour une capitale espacée**. C'est la troisième fois que ce fil bute sur une lisibilité — le souvenir de l'écran d'arrivée, la ligne du pays sur la carte postale, et maintenant le carnet. Deux fois sur trois, la cause n'était pas la couleur.

### Contrôles passés
`verif.py` sur `lingo.html` · contraste calculé sur les pixels du fond reconstitué, avant et après · tailles finales relues dans le navigateur (`getComputedStyle`), face avant et dos · rendu réel en densité ×3 pour juger comme sur l'écran du téléphone · aucune erreur JS.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session.**
Un acquis de méthode en revanche, qui vaut d'être écrit une fois pour toutes : **une plainte de lisibilité ne se corrige pas en changeant la couleur avant d'avoir mesuré.** Trois fois sur ce projet, le réflexe aurait été de foncer ou d'éclaircir un ton ; deux fois, le contraste était déjà bon et le problème était la taille ou l'opacité du parent. Le calcul prend deux minutes et évite de dégrader une palette qui va bien.
**Risques** : aucun. Uniquement des tailles et des tons.

---

## 🩹 SESSION 115 · LINGUAE (06/08) — LE RETOURNEMENT 3D RETIRÉ, LES FONDS ÉCLAIRCIS

Blandine, capture à l'appui : « quand on retourne les cartes le texte à l'envers empiète sur le reste, et ça lag à mort » · « les cartes floutées on voit rien ».

### 🔴 Le texte en miroir et le ralentissement avaient la MÊME cause
`backface-visibility:hidden` ne masque pas de façon fiable, sur Safari iOS, le contenu d'une face dont les enfants sont eux-mêmes positionnés en absolu. Le texte du dos traversait donc la face avant, **retourné en miroir** — visible sur sa capture, « LA BAULE » à l'envers par-dessus « NIVEAU 1 · NOMMER ».
Et faire tourner **vingt-huit cartes** en 3D, chacune avec sa `perspective`, son `preserve-3d` et son image, crée vingt-huit couches composites que le téléphone recompose à chaque image. D'où le ralentissement.

✅ **Le retournement 3D est supprimé**, remplacé par un croisement d'opacité avec un léger grandissement (.28 s). Aucune couche 3D, aucune face arrière à masquer : **le miroir devient impossible, pas seulement improbable.** Le JS n'a pas changé d'une ligne — la classe `ouv` fait toujours tout le travail.
⚠️ Écrit dans le CSS : **ne pas réintroduire `rotateY` sur ces cartes.**
✅ Mesuré : huit retournements enchaînés coûtent **1 ms de script**, et la face avant tombe bien à l'opacité 0 quand le dos est à 1.

⚠️ **La carte postale de l'écran d'arrivée garde son flip 3D** (`.pcarte`), et c'est volontaire : il n'y en a **qu'une seule à l'écran**, donc ni ralentissement ni couches multiples. Elle porte cependant le même motif `backface-visibility` que celui qui a échoué sur le carnet. Blandine n'a jamais signalé de miroir dessus — sans doute parce que son dos est un fond de papier opaque et non un dégradé translucide. **À surveiller** : si le défaut apparaît là aussi, la correction est la même.

### 🔴 « On voit rien » : c'était arithmétique
Les fichiers `fond-*.webp` sont des flous volontaires calibrés à **40 de luminance moyenne**, et on posait par-dessus un voile qui montait à **.93 d'opacité** en bas de carte. Il ne restait rien à voir. Ma faute : j'avais validé le principe du « flou comme matière » sans vérifier ce que la somme des deux donnait à l'écran.
✅ **L'image passe dans sa propre couche `.vimg`**, ce qui permet de l'éclaircir (`brightness 1.95`, `saturate 1.12`) **sans délaver le texte** — un filtre posé sur `.vrec` aurait aussi affadi le titre. Et le voile redescend de .34/.58/.93 à **.10/.34/.82** : assez pour que le nom reste lisible en bas, plus assez pour effacer la photo.
⚠️ Noté dans le CSS : si de vraies photos nettes remplacent les flous un jour, c'est `brightness` qu'il faudra baisser, pas le voile qu'il faudra remonter.

### ⏳ Une question posée à Blandine, pas tranchée
Même éclairci, un flou reste un flou : on distingue une ambiance, pas un lieu. Et **six villes n'ont aucun fond** (Newmarket, Lambourn, Connemara, Hickstead, Kildare, Édimbourg) — leur carte est un dégradé sombre, sans rien.
La solution évidente serait d'utiliser les `carte-*.webp`, nettes en 900×1200. J'avais argumenté contre : la carte postale est la récompense, la montrer avant le départ grille le cadeau. Mais l'argument ne tient plus si l'alternative est de ne rien voir. **Choix laissé à Blandine**, avec repli automatique sur le flou pour les villes sans carte postale.

### Contrôles passés
`verif.py` sur `lingo.html` · rendu réel : 28 cartes, aucune `perspective` résiduelle, filtre bien appliqué à la couche d'image seule, opacités croisées vérifiées dans les deux sens · huit retournements chronométrés · aucune erreur JS · aucune régression sur l'écran d'arrivée.

### 🧭 Préparation Flutter
- **Une animation coûteuse remplacée par une animation d'opacité** : le carnet ne crée plus de couches 3D. C'est aussi la forme la plus directement portable — un `AnimatedOpacity` en Flutter, là où un flip 3D demanderait un `Transform` et un test de face.
- **Un filtre isolé dans sa couche** : séparer l'image du texte pour pouvoir traiter l'une sans l'autre est le même principe que séparer les données de la présentation. Ça évitera de délaver un titre en corrigeant une photo.
- **Une leçon de méthode, à retenir** : j'avais validé « le flou comme matière » sur le principe, sans mesurer la somme du flou et du voile. Deux valeurs chacune défendable donnaient un résultat noir. Les décisions visuelles doivent être vérifiées à l'écran, pas raisonnées.
- **Reste à moderniser** : `.pcarte` porte encore le motif `backface-visibility` qui a échoué ailleurs.
- **Risques** : le changement est purement visuel et réversible, et il ne touche aucune donnée.

---

## ⛩️ SESSION 114 · LINGUAE (06/08) — TOKYO ET BUENOS AIRES, ÉTAPES 25 ET 26

### ✅ Tokyo — LA TRADITION, et le seul chapitre de conventions du module
`hype-lingo-lex-tradition.js` : le salut, le maître, l'apprentissage, observer d'abord, le silence, l'ordre, se déchausser, remercier, la tenue de cérémonie, le yabusame, l'arc, la cible.

⚠️ **Ce chapitre ne ressemble à aucun autre, et c'est voulu.** Partout ailleurs on apprend à nommer des objets et des gestes. Ici on apprend **ce qu'on fait, dans quel ordre, et ce qu'on ne fait pas**. Un mot mal placé n'y est pas une faute de vocabulaire mais une impolitesse. D'où le **niveau 3**, avec Saumur, Édimbourg et Vérone.

⚠️ **Le piège qui justifie à lui seul le chapitre** : en anglais, `le salut` (la révérence) et `l'arc` (l'arme) sont **le même mot**, « bow », prononcé différemment. Les deux sont dans la même leçon, à quelques lignes d'écart, parce que le yabusame les met côte à côte. **C'est le seul endroit du module où deux mots français distincts se confondent en anglais** — noté dans le fichier pour qu'on ne les sépare jamais.

⚠️ **RELECTURE PRIORITAIRE PAR UN NATIF.** Le japonais de ce chapitre porte sur la politesse, où le registre change tout : `稽古` (l'entraînement sous un maître, non l'apprentissage en général), `先生` (qui s'emploie comme titre après le nom), et la formule de remerciement **au passé** en fin de séance. C'est le chapitre où une erreur de registre serait la plus visible.

### ✅ Buenos Aires — LE POLO, et trois faux amis en cinq mots
`hype-lingo-lex-polo.js` : le maillet, la période, la monte, le changement de cheval, le handicap, la ligne de balle, la balle, le but, l'arbitre monté, les bandes, la queue nattée, le criollo.

⚠️ **Presque aucun mot ne se traduit littéralement, et c'est l'intérêt** :
· `la période` ne se dit pas « the period » mais **the chukka** ;
· `la monte` ne se dit pas « the mount » mais **the pony** — et « pony » ne veut pas dire poney, un cheval de polo dépasse 1,55 m ;
· `le handicap` note **le joueur**, de −2 à 10 goals, et pas le cheval.
Trois faux amis dans les cinq premiers mots. Deux détails de règle ont été mis dans les définitions parce qu'ils déroutent tout le monde : **après chaque but on change de côté**, et **couper la ligne de balle est la faute cardinale**.
⚠️ L'espagnol est celui d'**Argentine** : `el taco` pour le maillet, `la bocha` pour la balle. L'Espagne dirait `mazo` et `pelota`.

### ⚠️ Le créneau de Tamworth reste ouvert
Les heures se remplissent comme prévu : Dubaï 13 h 05 · **Tokyo 14 h 30** · *(15 h 40 réservé)* · **Buenos Aires 16 h 30** · Lexington 17 h 20 · Spruce Meadows 18 h 10. **Tamworth s'insérera à 15 h 40**, son clip et ses deux images sont déjà prêts. C'est écrit dans le commentaire de `ETAPES` — ne pas « corriger » l'écart.

### Contrôles passés
`verif.py` sur les trois fichiers · les deux lexiques contrôlés par exécution (12 concepts, 4 phrases, zéro entrée incomplète sur 6 langues, japonais découpé en tuiles) · **contrôle des `ref` partagés sur les onze lexiques** : aucune collision · `chapVirtuel` renvoie 12 mots + 4 phrases pour les deux · **28 villes × 6 langues** sur `RECITS` : aucune anomalie · balayage des échappements `\uXXXX` et des caractères cyrilliques dans tout le bloc `RECITS` : zéro, le défaut de la session 113 ne s'est pas reproduit · suite des heures relue · rendu réel des deux écrans d'arrivée avec clips et cartes postales · globe à 29 points · aucune erreur JS.

### ⏳ Ce qui reste
1. **Tamworth** (le western) — la dernière ville. Clip et images prêts.
2. **Les lettres et volets** de Dubaï existent ; ceux de Lexington, Spruce Meadows, Tokyo et Buenos Aires **restent à écrire** — leur carte postale s'affiche donc sans texte au verso.
3. `lingua-affiche.webp` et le fond du carnet.
4. Les définitions en quatre langues.
5. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
- **Neuvième ville ajoutée sans toucher au moteur.** Onze lexiques chargés, aucune fonction modifiée depuis Le Morne.
- **Le contrôle des `ref` partagés tourne maintenant sur onze fichiers** et distingue toujours les rappels voulus des collisions. Le contrat de contenu tient à l'échelle.
- **Un défaut de méthode corrigé durablement** : le balayage des échappements et des caractères étrangers est devenu systématique après l'incident de la session 113. Il n'a rien trouvé cette fois.
- **Reste à moderniser** : inchangé.
- **Risques** : aucun. Contenu et données.

---

## 🐎 SESSION 113 · LINGUAE (06/08) — LEXINGTON ET SPRUCE MEADOWS, ÉTAPES 25 ET 26

Cinq villes restaient à écrire. **Faites par deux plutôt qu'en une fois**, décision assumée : chaque ville demande douze mots, quatre phrases, une lettre, trois volets et un récit, tous en six langues. Ce fil a déjà produit une erreur de fond (« à cru » au Morne), une coquille cyrillique et une accolade en trop quand j'ai voulu aller vite. Trois villes de plus dans le même message auraient multiplié ce risque.

### ✅ Lexington (Kentucky), étape 25 — LE HARAS
`hype-lingo-lex-haras.js` : 12 mots, 4 phrases, 6 langues. Le haras, le pur-sang, la jument suitée, le yearling, le pedigree, l'étalonnage, la vente aux enchères, le lot, la mise à prix, le commissaire-priseur, adjugé, la piste d'entraînement.

⚠️ **Trois chapitres parlent maintenant d'argent et de chevaux, et les frontières sont écrites dans les trois fichiers** :
· **Golegã** (`elevage`) fait NAÎTRE — la poulinière, la saillie, le sevrage, la lignée, le stud-book.
· **Vérone** (`vente`) achète UN cheval POUR SOI, en discutant avec un marchand.
· **Lexington** (`haras`) vend à l'échelle industrielle — on lève la main dans une salle et le prix monte seul.
Vérifié par script : **aucun `ref` partagé** entre les neuf lexiques chargés.

### ✅ Spruce Meadows (Alberta), étape 26 — LE FROID
`hype-lingo-lex-froid.js` : le gel, la neige, la glace, le sol gelé, les crampons, la couverture d'hiver, tondre, l'abri, l'abreuvoir gelé, rentrer les chevaux, le foin à volonté, la piste en herbe. **Le module n'avait pas un seul mot d'hiver.**

⚠️ **Deux écarts assumés, écrits dans le fichier plutôt que cachés :**
1. **Spruce Meadows est un site de SAUT D'OBSTACLES**, et l'un des plus réputés du monde. Le froid n'est pas sa spécialité : c'est le seul angle qui apporte des mots neufs, l'obstacle étant déjà pris quatre fois (Hickstead, Badminton, Aix-la-Chapelle, Rome).
2. **Sa saison est l'ÉTÉ**, de juin à septembre. Le gel y est réel mais pas pendant les concours. Le chapitre parle donc du froid de **l'écurie** — l'hiver albertain quand la piste est fermée — et non d'un concours sous la neige. Volets et récit écrits dans ce sens, pour qu'un cavalier qui connaît le lieu ne tique pas.
✅ **Niveau 1** pour Spruce Meadows : c'est du vocabulaire concret qu'on nomme et qu'on montre du doigt. Lexington est en niveau 2.

### ⚠️ Un trou volontaire dans les heures, à ne pas « corriger »
Dubaï est à 13 h 05, Lexington à **17 h 20**, Spruce Meadows à **18 h 10**. L'écart est voulu : **Tokyo, Tamworth et Buenos Aires viendront s'insérer entre les deux** (autour de 14 h 30, 15 h 40 et 16 h 30), et leurs clips sont déjà prêts. C'est écrit dans le commentaire de `ETAPES`.

### 🔴 Deux défauts de ma main, attrapés avant livraison
1. **269 séquences `\uXXXX` littérales** se sont retrouvées dans les deux récits : mon script d'insertion a écrit les échappements au lieu des caractères. Le fichier fonctionnait — JavaScript interprète ces séquences — mais la source devenait illisible, dans un fichier que Blandine lit. Converties en vrais caractères et revérifiées.
2. **Une coquille japonaise** : un caractère faux pour « ôter » dans le récit de Spruce Meadows. Corrigée, puis balayage de tout le bloc `RECITS` à la recherche de caractères cyrilliques ou grecs — aucun.

### Contrôles passés
`verif.py` sur les quatre fichiers, tous les blocs · les deux lexiques contrôlés par exécution (12 concepts, 4 phrases, zéro entrée incomplète sur 6 langues, japonais découpé en tuiles) · **contrôle des `ref` partagés sur les neuf lexiques** : aucune collision involontaire · `chapVirtuel` renvoie 12 mots + 4 phrases pour les deux · **26 villes × 6 langues** sur `RECITS` : aucune anomalie · suite des heures relue en entier, croissante · rendu réel des deux écrans d'arrivée avec leurs clips · globe à 27 points · aucune erreur JS.

### ⏳ Ce qui reste
1. **Trois villes** : Tokyo (les traditions), Buenos Aires (le polo), Tamworth (le western). Clips prêts, vocabulaire à écrire. **C'est la suite immédiate.**
2. **Les cartes et fonds** de Dubaï, Lexington, Spruce Meadows, et des trois à venir.
3. `lingua-affiche.webp` et le fond du carnet.
4. Les définitions en quatre langues.
5. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
- **Septième ville ajoutée sans toucher au moteur.** Le geste est devenu un formulaire : un lexique, sept entrées de données, un récit, une ligne de globe.
- **Le contrat de contenu est maintenant vérifié par script**, et non plus seulement écrit en commentaire : le contrôle des `ref` partagés sur l'ensemble des lexiques distingue les rappels voulus des collisions accidentelles. C'est un test, pas une intention.
- **Reste à moderniser** : inchangé — `hype_lingua_quiz` et `hype_lingua_cartes` ne sont pas dimensionnés par langue ; `TITRE_SOMBRE` reste une liste maintenue à la main.
- **Risques** : aucun. Contenu et données.

---

## 🎞️ SESSION 112 · LINGUAE (06/08) — SEPT CLIPS TRAITÉS, DUBAÏ ÉCRITE, ET LA VRAIE CAUSE DES PANNEAUX COUPÉS

### ✅ Dubaï, étape 24 — la première hors d'Europe
Nouveau fichier **`hype-lingo-lex-endurance.js`** : 12 mots, 4 phrases, 6 langues. L'endurance, le pur-sang arabe, le kilomètre, la boucle, le contrôle vétérinaire, le rythme cardiaque, la récupération, refroidir, l'assistance, la vitesse moyenne, l'abandon, éliminé pour boiterie.
Tout est en place : `ETAPES`, `ETAPE_SRC`, `NIVEAU_VILLE`, `COLL_NOM`, `ACCUEIL_CHAP`, `POURQUOI`, `RECITS`, `MONDE.dubai` (lettre + 3 volets), globe (24,81 / 55,42), heure 13 h 05.

⚠️ **UN MOT DU PLAN A ÉTÉ CHANGÉ, à valider.** Le plan écrivait « le relais » : ça n'existe pas en endurance, personne ne prend la suite du cavalier. Ce que le plan décrivait est **l'assistance** — l'équipe qui attend au contrôle avec l'eau et les seaux. Concept gardé, mot corrigé.
⚠️ **Aucun rappel dans ce lexique** : `la boiterie` et `le vétérinaire` auraient dû en être, mais `hype-lingo-lex-urgences.js` n'a pas été fourni dans cette conversation. Impossible de vérifier leurs `ref` — et un `ref` inventé crée un doublon au lieu d'un rappel. À compléter.

### ✅ Sept clips convertis
Reçus en HEVC avec piste audio. Tous convertis en H.264, sans audio :
`arrivee-verone.mp4` · `arrivee-dubai.mp4` · `arrivee-lexington.mp4` · `arrivee-tokyo.mp4` · `arrivee-spruce.mp4` · `arrivee-buenos.mp4` · `arrivee-tamworth.mp4` — tous en 480×854, 5,1 s, de 463 à 634 Ko (contre 1,9 à 2 Mo à l'entrée).

✅ **Bonne nouvelle sur le filigrane** : sur un clip PORTRAIT, il est **invisible dans l'app**. L'écran d'arrivée recadre en `cover` dans une boîte de ratio 0,888 : sur une source en 0,562, seule la bande centrale se voit, et le filigrane en haut à gauche tombe hors champ. Vérifié par simulation sur les sept. Plus rien à effacer, contrairement au Morne (paysage) et à Rome (carré).

### 🔴 Panneaux : le bilan, et la vraie cause enfin comprise
Contrôle systématique de la dernière image des sept, **jugée dans le cadre réel de l'app** et non dans le fichier.
- **Entiers** : SPRUCE MEADOWS, TOKYO, BUENOS AIRES, TAMWORTH. Les deux derniers sont arrivés après le message sur la marge — la consigne a porté.
- **Coupés** : VERONA (V et A), DUBAI (D et I), LEXINGTON de justesse.

✅ **`FIN_VIDEO.verone = 3.9`** — cas nouveau et intéressant : le mot est **entier à 3,9 s** et ne se coupe qu'au dernier resserrement de caméra. On s'arrête donc avant la fin **en gardant le panneau**. Premier clip où l'on ne perd rien.
✅ **`FIN_VIDEO.dubai = 2.9`** — le mot n'est jamais entier. Arrêt au sommet du saut, cheval et cavalier complets dans le cadre.

⚠️ **CE QUI N'AVAIT PAS ÉTÉ COMPRIS, et qui explique tout** : le panneau ne doit pas seulement avoir de la marge à gauche et à droite, il doit être **au MILIEU de la hauteur**. L'écran d'arrivée écrit le chapitre et le nom de la ville **par-dessus le bas de la vidéo**, et l'image est recadrée en `cover`. Un panneau placé en bas du cadre est donc coupé deux fois : par le bord et par le titre. Six clips sur quatorze en ont souffert. C'est noté dans le code, à passer dans les prompts.

### Contrôles passés
`verif.py` sur les quatre fichiers · lexique de l'endurance contrôlé par exécution (12 concepts, 4 phrases, zéro entrée incomplète sur 6 langues) · `chapVirtuel('dubai')` = 12 mots + 4 phrases · **contrôle exhaustif des 24 villes × 6 langues** sur `RECITS` et `VILLES` : aucune anomalie · les sept dernières images simulées dans le cadre de l'app avant décision · arrêts mesurés à 3,900 s et 2,900 s pile · aucune erreur JS.

### ⏳ Ce qui reste
1. **Trois villes à écrire** : Lexington (le haras), Spruce Meadows (le froid et le terrain), Tokyo (les traditions) — leurs clips sont prêts, leur vocabulaire n'existe pas.
2. **Deux de plus après** : Buenos Aires (le polo) et Tamworth (le western). Clips prêts également.
3. **`carte-dubai.webp` et `fond-dubai.webp`** — et les mêmes pour les cinq villes ci-dessus.
4. `lingua-affiche.webp` et le fond du carnet.
5. Les définitions en quatre langues.
6. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
- **Cinquième ville ajoutée sans toucher au moteur.** Le geste ne varie plus : un lexique, sept entrées de données, une ligne de globe, une entrée de ville.
- **`FIN_VIDEO` a maintenant cinq entrées** et absorbe un défaut d'actif systémique sans qu'aucune logique change. Le cas de Vérone montre qu'elle sert aussi à *garder* une image plutôt qu'à en éviter une.
- **Une méthode s'est stabilisée** : ne jamais juger une image d'arrêt dans le fichier, toujours dans le cadre où elle sera vue. Elle a servi trois fois aujourd'hui et a évité trois mauvais choix.
- **Reste à moderniser** : inchangé — `hype_lingua_quiz` et `hype_lingua_cartes` ne sont pas dimensionnés par langue.
- **Risques** : aucun. Contenu, données et actifs.

---

## 🌉 SESSION 111 · LINGUAE (06/08) — LES DEUX IMAGES DE VÉRONE

Blandine envoie sa vue de Vérone : le gris à la bride devant l'Adige, le Ponte Pietra, la tour des Lamberti et le couchant sur les toits ocre.

- **`carte-verone.webp`** — 900×1200, 77 Ko.
- **`fond-verone.webp`** — 420×560, flou gaussien, luminance 41,5 pour une cible de 39 à 43 (facteur 0,70 trouvé par itération). 1,6 Ko.

✅ **Mesure du titre faite d'emblée cette fois**, en application de la règle notée en session 110 : tiers supérieur de `carte-verone.webp` à **53,3**, donc bien en dessous du seuil de 100 — Vérone n'entre pas dans `TITRE_SOMBRE` et garde le titre crème. Vérifié en rendu : `rgb(244, 230, 196)`, lisible.
✅ Vérifié aussi : la carte du carnet charge `fond-verone.webp`, la carte postale s'affiche, les trois volets sont là.

⚠️ **Il ne manque plus que `arrivee-verone.mp4`.** L'écran d'arrivée affiche pour l'instant son repli — « Vidéo introuvable · arrivee-verone.mp4 · à déposer à la racine du dépôt ». Le prompt est prêt dans `hype-linguae-prompt-verone.txt`.

### État des vingt-trois étapes
**Complètes** : les vingt-et-une premières, plus Golegã et Rome finies dans les sessions précédentes.
**Vérone** : carte ✅, fond ✅, clip ❌.

### Contrôles passés
Luminance et poids des deux images confrontés aux huit cartes et seize fonds existants · mesure du tiers haut faite avant livraison, pas après · rendu réel de l'écran d'arrivée de Vérone et de sa carte dans le carnet · aucune erreur JS.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session** — production d'actifs uniquement.
La règle de la session 110 a servi dès la ville suivante : la mesure du tiers supérieur est devenue un geste systématique à chaque nouvelle carte, au lieu d'être découverte après coup sur un titre illisible.
**Risques** : nuls.

---

## 🗺️ SESSION 110 · LINGUAE (06/08) — GOLEGÃ COMPLÈTE, ET LE PROMPT DE VÉRONE

### ✅ Golegã est finie
Blandine envoie sa vue de Golegã (le lusitanien gris devant le fleuve, l'église et la tour du Ribatejo). Deux fichiers produits au gabarit mesuré :
- **`carte-golega.webp`** — 900×1200, 68 Ko.
- **`fond-golega.webp`** — **refait depuis cette image** plutôt que depuis le clip : 420×560, luminance 41,4 pour une cible de 39 à 43. Il remplace celui de la session 109.
✅ Vérifié en rendu : la carte postale s'affiche, le fond charge sur la carte du carnet. **Golegã a désormais ses quatre pièces** — clip, carte, fond, lexique.

### 🔴 Et un défaut créé par cette nouvelle carte : le titre devenu illisible
`golega` figurait dans **`TITRE_SOMBRE`**, la liste des villes dont le tiers haut est trop clair pour un titre crème. C'était vrai de son ancienne carte ; la nouvelle a un ciel presque noir. Résultat : « Golegã » s'écrivait en brun très sombre sur du noir.
✅ **Mesure refaite le jour même, même méthode que le 5 août** — luminance du tiers supérieur de chaque carte : Warendorf 172, Aix-la-Chapelle 161, Lamotte 141, Vejer 110, Séville 77, Le Morne 59, Rome 48, **Golegã 45**. `golega` est retirée de la liste et reprend le titre crème. Vérifié : `rgb(244, 230, 196)`.
⚠️ **Règle notée dans le code** : cette liste dépend de l'image, pas de la ville. Il faut refaire la mesure **chaque fois qu'une carte est remplacée**. Rome, mesurée à 48, n'a jamais eu à y entrer.

### ✅ `hype-linguae-prompt-verone.txt`
Le prompt de production de Vérone, au gabarit exact des huit autres blocs : consignes de format, de lumière, de cheval unique, interdits, six images (cinq plans + la carte postale en 3:4), et la liste des fichiers à pousser à la fin.
Le cheval de la ville : **un bai foncé tenu en main**, pas monté. Vérone n'est ni un haras ni un concours : c'est une foire, on y présente et on y vend.

### 🔴 Correction de ce que j'ai dit en session 109
J'avais écrit que « la consigne de production impose les deux tiers de largeur et ça ne marche pas ». **C'est inexact** : la consigne est bonne, elle est même écrite en gras dans chaque bloc de `hype-linguae-production.txt`. Le problème est qu'elle **n'a pas été respectée** par le générateur, trois fois sur neuf.
✅ Donc consigne **durcie** dans le prompt de Vérone : la **moitié** de la largeur au maximum, une marge chiffrée d'un quart de chaque côté, et une porte de sortie explicite — « si le générateur n'y arrive toujours pas, mieux vaut un plan 5 sans panneau qu'un panneau amputé ».
⚠️ Rappel ajouté aussi : exporter **sans piste audio**, et vérifier le filigrane CapCut, incrusté sur les clips du Morne et de Rome.

### Contrôles passés
`verif.py` sur `lingo.html` · luminance du tiers haut des huit cartes disponibles, mesurée et non estimée · rendu réel de l'écran d'arrivée de Golegã : carte affichée, couleur du titre vérifiée à la valeur calculée · aucune erreur JS.

### ⏳ Ce qui reste
1. **Vérone** : ses trois images (prompt prêt).
2. **`lingua-affiche.webp`** et le fond du carnet — et la question du renommage de `fond-newmarket.webp`, toujours en attente.
3. Le vocabulaire des six destinations restantes.
4. Les définitions en quatre langues.
5. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session.**
Un point de méthode qui vaut d'être gardé : `TITRE_SOMBRE` est une liste **dérivée d'une mesure sur les actifs**, pas une préférence. Elle devrait à terme être calculée au chargement de l'image plutôt que maintenue à la main — c'est exactement le genre de constante qui se désynchronise dès qu'un actif change, et ça vient d'arriver.
**Risques** : nuls.

---

## 🔺 SESSION 109 · LINGUAE (06/08) — TROISIÈME PANNEAU TRONQUÉ : CE N'EST PLUS UN ACCIDENT

### ✅ Le clip de Golegã est conforme
H.264, 480×798, 10,2 s, 737 Ko, **sans piste audio**. Rien à convertir.

### 🔴 Mais son panneau est coupé, comme La Baule et Vejer
« GOLEGA » perd son **A final** au bord droit du cadre, sur toute la fin du clip. **Trois clips sur neuf** sont maintenant concernés : La Baule, Vejer, Golegã.
⚠️ **Ce n'est plus un accident, c'est la consigne de production.** Elle impose au texte de tenir dans les deux tiers de la largeur, et ça ne marche pas pour les noms longs. Écrit dans le code, à l'attention de Blandine : pour les prochaines villes, **faire cadrer le panneau avec de la marge des deux côtés, ou renoncer au panneau.**

✅ **`FIN_VIDEO.golega = 4.6`**, et cette valeur a été choisie autrement que les précédentes : en **simulant le recadrage réel de l'app**. `#vue` fait 52svh, soit un ratio de 0,888, tandis que la source est en 0,602 — donc seule la bande centrale se voit. Quatre candidats ont été rendus dans ce cadre-là avant de choisir. À 6,2 s, on ne voyait plus que la croupe ; à 4,6 s, on a le cavalier en tenue portugaise face à l'objectif, la brume et les arbres.
⚠️ **Méthode à garder** : pour choisir une image d'arrêt, il faut la juger dans le cadre où elle sera vue, pas dans le fichier.

### ✅ `fond-golega.webp` fabriqué depuis le clip
420×560, flou gaussien puis assombrissement calibré par itération sur la luminance des quinze fonds existants — 40,9 pour une cible de 39 à 43. 1,6 Ko. Vérifié en rendu : la carte du carnet le charge.
⚠️ **`carte-golega.webp` n'a PAS été fabriquée depuis le clip, volontairement.** La carte postale est la récompense, elle s'affiche en 900×1200, et la source ne fait que 480 de large : un agrandissement de 1,9× se verrait, à côté de six cartes natives. Le flou du fond masque la résolution, une carte non. **À produire comme celle de Rome.**

### Contrôles passés
`verif.py` sur `lingo.html` · quatre images d'arrêt candidates jugées dans le cadre réel de l'app · luminance et poids du fond confrontés aux quinze existants · rendu réel : arrêt mesuré à 4,600 s pile, carte du carnet chargeant son fond · aucune erreur JS.

### ⏳ Ce qui reste
1. **Vérone** : ses trois images (la ville est écrite, session 108).
2. **`carte-golega.webp`** : la seule pièce manquante de Golegã.
3. **`lingua-affiche.webp`** et le fond du carnet.
4. Le vocabulaire des six destinations restantes.
5. Les définitions en quatre langues.
6. La sécurité (11 mots) attend une ville.

### 🧭 Préparation Flutter
**Aucune amélioration d'architecture réalisée sur cette session.**
`FIN_VIDEO` compte maintenant trois entrées et reste une simple table : le mécanisme absorbe un défaut d'actif récurrent sans qu'une ligne de logique change. C'est la démonstration qu'un point d'extension bien placé coûte moins qu'un correctif par cas.
**Risques** : nuls.

---

## 🇮🇹 SESSION 108 · LINGUAE (06/08) — VÉRONE ET LE COMMERCE, ÉTAPE 21

« Donne la ville suivante à qui je dois faire vidéo et enchaîne de ton côté. » Chaîne prise : Vérone est écrite, il ne lui manque plus que ses trois images.

### ✅ Le chapitre du COMMERCE, `hype-lingo-lex-vente.js`
Prévu pour cette ville depuis le début par `hype-linguae-production-suite.txt`. **12 mots, 4 phrases, 6 langues** : le marchand, l'essai, la visite d'achat, la radiographie, négocier, le contrat de vente, la garantie, le vice caché, le passeport, le budget, la foire — plus un rappel (`prix`, déjà croisé à La Baule pour un tarif de reprise, ici pour un cheval entier).

C'était le dernier grand manque du module avec l'élevage : **le seul moment de la vie d'un cavalier où se tromper coûte cher, et il n'existait nulle part dans les 378 mots.**

⚠️ **Frontières tenues et écrites dans l'en-tête** : l'élevage reste à Golegã (`poulinière`, `saillie`, `sevrage`, `lignée`, `stud-book`), les ventes aux enchères à Lexington (`yearling`, `pedigree`, `jument suitée`). Vérone achète et vend ce qui est déjà né. Contrôlé par script : aucun mot réservé ne s'y trouve.
⚠️ **NIVEAU 3** — troisième ville du voyage à ce palier, avec Saumur et Édimbourg. C'est le chapitre le plus parlé : on y négocie, on y pose des questions gênantes, on y dit non. Les exercices « dire » entrent donc dans le tirage.
⚠️ **Onze entrées neuves, jamais relues par un natif.** Les plus à confirmer : `le vice caché` (notion juridique française dont l'équivalent anglais n'a pas la même portée), `la visite d'achat` (« the vetting », sans calque possible), et `la garantie` (l'italien sépare `garanzia` de `vizi occulti`).

Placée **entre Rome et Warendorf** : on remonte l'Italie du sud au nord, puis on passe en Allemagne. Heure 11 h 05. Tout est en place — `ETAPES`, `ETAPE_SRC`, `NIVEAU_VILLE`, `COLL_NOM`, `ACCUEIL_CHAP`, `POURQUOI`, `RECITS`, `MONDE.verone` (lettre + 3 volets : Fieracavalli · Ce qui protège vraiment · Si tu y allais), point sur le globe (45,4384 / 10,9916).

Le volet du milieu est écrit comme un conseil, pas comme une description : la visite d'achat par TON vétérinaire, les radios qui disent ce qui pourrait arriver plutôt que ce qui va bien, le passeport avant tout le reste, et le budget annoncé dès la première phrase.

### ✅ Contrôles passés
`verif.py` sur les quatre fichiers, tous les blocs · lexique contrôlé par exécution (12 concepts, 4 phrases, zéro entrée incomplète sur 6 langues, japonais découpé en tuiles, aucun mot réservé ailleurs) · `chapVirtuel('verone')` = 12 mots + 4 phrases · **contrôle exhaustif des 23 villes × 6 langues** sur `RECITS` et sur `VILLES` : aucune anomalie · rendu réel : carte du carnet (niveau 3 · dire, trois barres allumées, 12 mots), écran d'arrivée (« ARRIVÉE À VÉRONE », chapitre 21, trois volets) · aucune erreur JS.
⚠️ Une coquille japonaise de ma main attrapée en relecture : un caractère erroné pour « regarder ». Corrigée et revérifiée.

### 📋 État des actifs, ville par ville
**Complètes** (clip + carte + fond) : La Baule, Le Morne, Rome, Warendorf, Séville, Vejer, Aix-la-Chapelle, Lamotte-Beuvron, plus les treize villes du parcours V1 déjà en ligne avant cette série.
**Golegã** : clip ✅, carte ❌, fond ❌.
**Vérone** : rien — clip, carte et fond à produire. **C'est la prochaine pour Blandine.**

### ⏳ Ce qui reste
1. **Vérone** : les trois images.
2. **Golegã** : carte et fond.
3. **`lingua-affiche.webp`** (l'affiche de la présentation, la fenêtre de 40vh) et le fond du carnet.
4. **Le vocabulaire des six destinations restantes** : Lexington, Spruce Meadows, Dubaï, Tokyo, Buenos Aires, Tamworth.
5. **Les définitions en quatre langues** (elles n'existent qu'en français et en anglais) — le chantier de fond depuis l'ouverture des six langues.
6. La sécurité (11 mots) attend toujours une ville.

### 🧭 Préparation Flutter
- **Quatrième ville ajoutée sans toucher au moteur** (Le Morne, Rome, Golegã, Vérone). Le geste est maintenant rodé : un fichier de lexique, sept entrées de données, une ligne de globe. Aucune fonction modifiée depuis quatre villes.
- **Les frontières de contenu sont devenues explicites** : chaque nouveau lexique porte en tête la liste des mots qui appartiennent à une autre ville, et un script le vérifie. C'est un contrat de contenu, l'équivalent éditorial des contrats de Repository.
- **Reste à moderniser** : inchangé depuis la session 106 — `hype_lingua_quiz` et `hype_lingua_cartes` ne sont pas dimensionnés par langue alors que la maîtrise l'est.
- **Risques** : aucun. Contenu et données uniquement.

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
