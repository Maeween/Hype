# PASSATION — Hype · session 137, nuit du 16 au 17/08/2026

## À FAIRE EN PREMIER

Pousser `index.html` + `hype-stories.js` en **19az**, et vérifier que
`Hype_mur_immersif_encarts_transparents.png` est bien à la racine — sans lui, le
mur immersif s'affiche vide. Repère de version : `HYPE_STORIES_VERSION = "19az"`
ligne 45, et `hype-stories.js?v=19az` dans `index.html`.

## CE QUI A ÉTÉ LIVRÉ (19as → 19az)

**Le mur immersif** est en ligne sur la page Cavalier, à la place du rail « À la
une ». Communauté, Club et Écurie gardent `RailALaUne` — leurs trois appels sont
intacts. Décor percé, quatre trous aux coordonnées mesurées (en % du côté :
6,54/41,15/25,36/44,34 · 69,94/13,88/24,48/38,12 · 48,17/70,65/26,24/16,19 ·
38,28/47,37/17,22/18,82). Les emplacements vides sont bouchés par le décor flou
agrandi de 14 %. Ordre d'attribution : grand gauche → grand droite → bandeau bas
→ petit centre.

**Le panneau de réglages du mur reste accessible**, réservé au compte de Blandine
(`estCompteFeinnHype`), lien « réglages » à droite du titre. Réglage gardé en
`localStorage`, sans effet pour les autres cavaliers. Départ : fondu large ·
voile 22 · désaturation 80 · nappe 50 · pétrole. **Il attend que Blandine dise
« c'est celui-là »** : à ce moment-là, graver les valeurs en dur et retirer le
panneau.

**Les à la une retrouvent leur vraie story.** Découverte de la session : RIEN
n'efface les stories. Les 7 jours sont un FILTRE À LA LECTURE (`gt("expire_le")`
dans `hsListerStories`), pas une purge. `hsGroupeALaUne` retrouve donc la ligne
`hype_stories` par son `photo_url` — texte, lieu, musique, fond, et surtout le
VRAI identifiant, donc les J'aime continuent de monter indéfiniment. Aucune
colonne, aucun SQL. Les identifications reviennent seules (table indexée par
`photo_url`). La composition H+D n'est PAS restituée : `disposition` et `compo`
sont retirés de la story reconstituée, sinon `CompositionStory` avalait tous les
gestes.

**Le halo des vignettes de stories** : lumière posée DERRIÈRE le fondu, jamais un
filtre sur la photo. Couleur issue de `tA()`, donc elle suit la teinte du
cavalier. Coût assumé : le rail du bandeau descend de 18 px (retrait haut porté à
18, sinon `overflowY: hidden` trancherait le halo).

**Le ⋯ revient dans les à la une**, une seule entrée — « Retirer de cette à la
une » — avec confirmation, Annuler en premier réflexe. Visible seulement sur ses
propres à la une (`onRetirerAlbum` fourni uniquement si `album.user_id === moi`).
Retirer ne supprime NI la story NI le fichier. Une à la une vidée cesse d'être
affichée mais n'est pas supprimée en base.

**Page Cavalier** : la photo du bandeau n'est plus rognée (vraie `<img>` à sa
taille naturelle au lieu d'un bloc 16/11 en `cover`) ; le dégradé posé sur son
bas est retiré ; le prénom, le crayon et le ⋯ sont sortis de la carte.

**Gestes** : le glissé vers le bas ne ferme plus (mots de Blandine : « je te
demande juste de ne pas mettre celui vers le bas »). Gauche et droite restent.
La croix est le seul moyen de sortir.

**La composition défile enfin** (19az) : sa racine était en `overflow: hidden` +
`justifyContent: center`, donc une légende dépliée était coupée aux deux bouts et
rien ne bougeait. Passée en `overflowY: auto` + `touchAction: pan-y` +
`justifyContent: flex-start`. À VÉRIFIER À L'ESSAI — c'est le correctif le plus
récent et il n'a pas été vu à l'écran.

## RÈGLES PAYÉES CETTE SESSION

**JAMAIS de calque au-dessus de la photo d'une story.** Le calque de balayage a
été retiré le 02/08 parce qu'il lisait `changedTouches` sans compter les doigts :
un pincement passait pour un balayage, chargeait une autre photo pleine
résolution pendant le décodage de la première, et iOS tuait l'onglet. Même
mécanique que le crash de la session 92. La leçon a été payée DEUX fois. J'ai
proposé des zones de tap trois fois cette nuit sans vérifier — Blandine a dû me
reprendre. Les zones de tap sont donc ÉCARTÉES.

**Aucun glissé exotique.** Décision de Blandine : pas de geste qui ne
fonctionnerait qu'à un seul endroit. Horizontal pour naviguer, oui. Vertical pour
fermer, non.

**`ReactDOM.createPortal` n'existe pas à l'exécution.** Les six portails du
module passent tous par le garde-fou maison
`var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ... : function (x) { return x; }`.
L'appeler en direct plante la page (incident 19as, corrigé en 19at).

**Valider l'index en extrayant ses seize blocs `<script>`** et en passant
`node --check` sur chacun. `node --check` sur le `.html` ne dit rien. Cette
vérification a rattrapé une parenthèse en trop qui aurait fait tomber toute
l'app.

**Ne pas conclure d'un `grep`.** Quatre erreurs cette nuit faute d'avoir lu le
rendu réel : j'ai présenté comme « référence » un anneau turquoise qui est du
code mort (les formes en ligne sont `libre` et `libre-carte` depuis le 16/08),
j'ai annoncé un glissé vers le bas comme un ajout alors qu'il existait depuis le
14/08, j'ai cru la photo du bandeau en `contain` alors qu'elle est en pleine
largeur, et j'ai affirmé que les stories gardées étaient perdues alors que rien
ne les efface.

## CE QUI ATTEND UNE OBSERVATION DE BLANDINE

- **La musique.** Il y a trois « musique » dans l'app (pastille ♪ dans une story,
  chanson de la page, choix du morceau au composeur). Laquelle ne marche pas ?
- **Deux barres grises vides** sur la page Cavalier, une sous le Mur des Songes,
  une au-dessus de « À LA UNE ». Ressemblent à des composants qui se rendent sans
  contenu. Peut-être la chanson de la page.
- **Le simple tap sur la photo** : le zoom existe en pincement et en double-tap.
  Blandine veut peut-être qu'un tap simple agrandisse aussi.
- **Plus de quatre à la une** : le surplus n'est pas affiché. Non tranché.
- **Le crayon et le ⋯ suivent le prénom** hors de la carte : déduction de Claude,
  à valider.
- **La boîte ne suit plus le doigt vers le bas** : déduction de Claude, à valider.
- **Maquette des clubs** : demandée, pas encore faite (« où on met les clubs »).

## LE CHANTIER À OUVRIR EN SESSION PROPRE : LE RECADREUR

Deux bugs signalés à 10 h 27, NON traités, à prendre avec le recadreur sous les
yeux et rien d'autre. C'est la pièce qui a déjà coûté deux plantages.

**1. Cadre bordeaux indélébile sur la photo d'écurie.** Le SUIVI note déjà que
« la bannière de l'Écurie Feinn porte un liseré rouge Crimson indélébile » : le
cadre était cuit dans le fichier à l'époque du thème Crimson. Le correctif du
02/08 envoie l'image NUE au serveur et fait voyager le cadre dans le fragment
(`#cadre=spectral|halo`, via `marquerCadre` / `cadreDeUrl` / `urlNue`). MAIS
Blandine dit que le bordeaux revient sur une photo NEUVE, en thème bleu. Donc :
vérifier que l'écran Écurie envoie bien `srcNue` et non l'habillée — la
correction n'a peut-être pas été appliquée aux quatre écrans appelants.

**2. Le zoom ne se dézoome plus.** Le recadreur semble reprendre son propre
RÉSULTAT comme nouvelle source : l'image agrandie devient l'original, il n'y a
plus rien à retrouver en arrière. Destructif et irréversible, même famille que le
cadre recuit par-dessus lui-même.

**Et le chantier resté en plan depuis le 02/08** : le dessin du cadre À
L'AFFICHAGE n'est pas branché. Le choix voyage dans l'adresse, personne ne le
dessine. Une fois branché, la teinte du cadre devient un réglage qui suit le
thème — c'est la condition pour répondre à la demande de Blandine : « un bleu un
peu moins voyant tout en restant lumineux ». Aujourd'hui c'est impossible : ce
sont des pixels.

## MÉTHODE

Feu vert explicite avant tout code — un « ok » d'orientation n'en est pas un.
Jamais décider à sa place ; signaler toute conséquence non nommée AVANT.
`index.html` en premier dans les livraisons, section « À l'écran : + / − »
obligatoire, plus « Préparation Flutter ». Une seule conversation à la fois sur
`index.html`. Aucune formule liée au moment de la journée.
