# PASSATION — session du 06/09/2026 (soir → nuit, 23 h 50)

Résumé pour reprendre à froid. Le détail de chaque livraison est dans `SUIVI.md` (entrées du 06/09
« nuit », « nuit, 2 », « nuit, 3 », « nuit, 4 », en tête, de la plus récente à la plus ancienne).

---

## 1. 🟥 OÙ EN EST LE FICHIER

Dernier `index.html` livré ET poussé ET vu à l'écran : **`ae22a192f715a58675855cbe6d7b091a`**
(7 419 224 octets, GitHub affiche 7.08 MB). Témoin confirmé par capture à 23 h 45 :
`reprise 1.8 · baby 112 · memo 4 · stories 20bx · galops-sup 1 · g3 1 · g2 1`.

Modules de cours en ligne (tous v1, tous vus à l'écran) :
- `hype-cours-galops-sup.js` `02f8593bd9243e1934a5c81894a4ddab` (Galops 4-7, 872 225 o) — balise `?v=1`
- `hype-cours-galop3.js` `7ea2dc6351c2ca50b913e28e41539bc8` (Galop 3 + 5 affiches, 1 194 057 o) — `?v=1`
- `hype-cours-galop2.js` `fd362687709a088606d53c6047ba98a5` (Galop 2 + 13 constantes d'images, 584 691 o) — `?v=1`
- `_headers` `c64e91889aee321c1b66b7444969a525` (47 règles ; les 3 modules + stories/resultats/import-ffe/modeles-db
  en `max-age=0, must-revalidate`, ajoutés à sa demande).
- **15 `?v=`** dans l'index. Aucun SQL cette session.

⚠️ Les trois modules sont chargés juste après `hype-cours-baby.js` (ligne 20783), donc APRÈS tous les
`hype-images-*.js` et le filet d'images de l'index. Ne jamais déplacer ces balises plus haut.

---

## 2. ✅ CE QUI EST FAIT ET VU À L'ÉCRAN

1. **Index 10,06 → 7,42 Mo.** Galops 4-7, 3 et 2 sortis, un fichier chacun, avec témoin, `?v=`, règle `_headers`,
   repli (`window.X || []` dans l'index : fichier absent → Galop vide, appli debout, témoin « ? »).
2. **Couvertures du Galop 4 réparées** : les fichiers sont en `.jpeg` sur le dépôt (k631-k641) alors que la
   ligne 20749 déclare `.jpg` ; la grande couverture est un fond CSS que le filet du 30/07 (balises `<img>`
   seulement) ne rattrapait pas. `CouvAffiche` teste maintenant l'adresse, retente l'autre extension, et retombe
   sur `GALOPS_HERO`. Dehors (k642) n'a JAMAIS eu de photo : elle montre le fond commun.
3. **Texte descendu en bas sur toutes les couvertures** (choix de Blandine) : bloc de texte au ras du bouton, voile
   sombre dès la mi-hauteur, marges des données du Galop 4 plafonnées. `COUV_TEXTE_BAS = false` pour revenir.
   Validé à l'écran sur Nourrir.
4. Le bon `_headers` : celui qu'elle avait envoyé d'abord était la version d'août ; le vrai se copie depuis
   GitHub (page du fichier → « Copy raw file »), 8 079 octets avant nos ajouts.

---

## 3. 🟥 NON VU À L'ÉCRAN — À REGARDER

1. Galop 3 → un chapitre avec affiche (Le bon pied, Le pansage) ; la carte « QCM Global — Galop 3 » ; un examen
   blanc niveau 3 (30 questions).
2. Galop 2 → Les aides (couverture + affiche), Le tracé, Les robes (photo des robes).
3. Galop 4 → Dehors : le fond commun des Galops, pas du noir.
4. Une couverture de Galop 1 (encore dans l'index) : le voile plus haut, rien de cassé.

---

## 4. ⚠️ LE PROCHAIN : LE GALOP 1, À FROID — SCAN DÉJÀ FAIT, PAS ENCORE COUPÉ

**Bonne nouvelle, mesurée sur l'index `ae22a192…` (pas de mémoire) :** le Galop 1 n'est PAS le monstre
redouté. La table `COURS_GALOP1_I18N` tient sur **UNE seule ligne, la 21627** (982 619 caractères ≈ 0,98 Mo),
et n'appelle que :
- `HYPE_IMGS` ×132 ;
- `GALOPS_HERO` ×4 (défini ligne 20989, `HYPE_IMGS["k66"]`, **partagé** avec ~14 autres endroits : reste dans
  l'index, copie locale dans le module — même recette que le Galop 3) ;
- `INFOG_SELLERBRIDER_G1` et `INFOG_SECURITE_G1` (lignes 21620 et 21622, dictionnaires de clés d'images, utilisées
  par le Galop 1 seul → partent avec lui). `INFOG_MONTERDESCENDRE_G1` (21621) n'est utilisée par personne : à
  emmener avec elles pour garder la famille ensemble, ou laisser, au choix.
- **`GALOPS_I18N` n'est PAS appelée par la table** : c'est la liste des Galops (couleurs, disponibilité), lue par
  une douzaine d'écrans. Elle reste dans l'index. Idem `COURS_BABY_I18N` (repli déjà en place, ligne 21625).

Recette identique aux trois autres : `hype-cours-galop1.js`, `?v=1`, balise juste après `hype-cours-galop2.js`,
témoin « g1 1 », repli `const COURS_GALOP1_I18N = window.COURS_GALOP1_I18N || []` (un seul lecteur :
`obtenirCoursParGalop`, à vérifier au moment de couper), règle `_headers`, copie octet pour octet, rescan du module
(zéro identifiant extérieur), preuve Playwright des 7 Galops × 6 langues (banc `rendu-g2.js` de cette session :
47 empreintes, à reprendre), repli testé. Gain : ≈ 1 Mo, index à ≈ 6,4 Mo.

**Ce que le fichier doit recevoir dans la nouvelle conversation** : `index.html` (`ae22a192…`), `SUIVI.md`, ce
`PASSATION.md`, et le `_headers` actuel (celui à 47 règles) — les modules déjà en ligne ne sont pas nécessaires.

**Et après, dans l'ordre** : (a) chargement à la demande — tant que les 4 fichiers de cours sont des balises de
l'index, les cavalières les téléchargent tous au démarrage (≈ 3,6 Mo) : charger un Galop à son ouverture est le
vrai gain de poids, et un critère App Store ; (b) la mise à jour forcée (`sw.js` de retrait, rien ne se répare à
distance) ; (c) supprimer du dépôt `hype-galops.js` du 02/08 si ce n'est pas fait (plus rien ne l'appelle).

---

## 5. ⚠️ RESTE À FAIRE / EN ATTENTE

**Nouveaux (cette session) :**
- Photo de Dehors : pousser `images/k642.jpg` (nom exact) — rien à coder.
- Le fond du quiz de chapitre (`fondQuizChapitre`, ~ligne 48480) lit la même adresse de couverture en fond CSS :
  probablement noir sur les chapitres en `.jpeg` (k631-k641). Même filet à poser, ou renommer les fichiers.
- Le vrai remède aux extensions : renommer `k631…k641.jpeg` en `.jpg` sur le dépôt, ou aligner la ligne 20749
  sur la liste réelle du dossier `images/` (demander une capture du dossier).
- Galops 5 et 7 sont en français seul (servis tels quels dans les 6 langues) — constaté, rien changé.
- `PHOTO_G2_TROT`, `PHOTO_GALOP`, `PHOTO_G1_PAS`, `INFOG_SAUT_G3`, `INFOG_MONTERDESCENDRE_G1` : constantes
  orphelines dans l'index, utilisées par personne. Un ménage possible, jamais urgent.

**En attente d'une réponse de Blandine (inchangé depuis la passation précédente) :**
- Chevaux classés par écurie sur son profil : maquettes A / B / C montrées, choix non donné ; + chevaux sans
  écurie ; + même présentation sur « Ses chevaux » ?
- Import des origines « un cran plus haut » : attendre SA capture qui a échoué + le nom de la fiche ouverte.
- Partage public « au plus simple » (`voir.html?p=…`, elle seule partage, prénom + initiale) : à RECONFIRMER
  avant de coder. Premier sujet : les points.
- Saison des points : 1er juillet posé (2 lignes) ; le Critérium Amateur dit 16 juin.
- Libellé « As Poney N » choisi aussi pour « As N ».

**Plus anciens, toujours ouverts :** repasser les télémats pour SF + points ; doublon d'import quand le NOM du
concours diffère (comparer date + cheval) ; droits d'une modératrice sur une fiche qu'elle ne possède pas ;
app iOS native bloquée sur les 7 secrets Apple ; chantier Mux (authentification de `mux-upload`, plafond côté
serveur, lectures signées, mail startup en attente).

---

## 6. ⚠️ CE QUE CETTE SESSION A APPRIS

🟩 **UN FICHIER DE CONFIGURATION REÇU SE VÉRIFIE AVANT D'Y ÉCRIRE.** Chercher dedans une règle dont le suivi dit
qu'elle est en ligne (`memory-*.webp`). Absente → ce n'est pas le fichier du dépôt.

🟩 **LA MESURE SE REJOUE, ELLE NE SE CITE PAS.** Session 112 : 15 + 1 `HYPE_IMGS` pour G4-G7 ; rejoué : 15 + 1.
Et le Galop 1, redouté depuis le 02/08, s'est révélé simple une fois scanné (§ 4) — la peur venait d'une
mesure jamais refaite.

🟩 **UN FOND CSS N'A PAS DE FILET.** Le filet d'extension du 30/07 n'écoutait que les `<img>` ; une image posée
en `background: url(…)` échoue en silence. Quand une image « ne s'affiche pas », regarder d'abord COMMENT elle
est posée.

🟩 **« JAMAIS EN FIN DE SESSION » RESTE LA RÈGLE.** Ce soir elle a été levée par Blandine explicitement, trois
fois, avec un test à l'écran après chaque coupe et un retour arrière à un clic. Sans ces trois conditions, non.

🟩 **QUAND ELLE CHOISIT UNE OPTION, LIVRER CE QU'IL FAUT POUR QU'ELLE MARCHE, ET LE DIRE.** « Texte descendu en
bas » ne suffisait pas sans le voile remonté ; il a été ajouté et annoncé, pas glissé.
