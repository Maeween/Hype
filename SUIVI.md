# SUIVI HYPE

> Ce fichier circule entre les pages de travail. Chaque page qui arrive le lit, chaque page qui repart le met à jour avant de le refaire circuler. Objectif : que Blandine n'ait rien à retenir par cœur.

**Règle d'or : une seule page "codeuse" à la fois.** Les autres pages peuvent réfléchir, lister, préparer des maquettes — mais ne livrent pas de fichier index.html tant que ce n'est pas leur tour, pour éviter d'écraser le travail d'une autre page.

**Version actuelle de l'index.html : 25/07 (nuit) — « Mon Évolution » + Poney d'Or refait (Or 1-9, Evan/Samuel/Elea) + 13 couvertures + baby-c16 supprimé**
Dernier index livré. Contient "Mon Évolution" (inchangée) **plus** : les 9 cours du Poney d'Or (baby-c19 à baby-c27) avec Evan, Samuel et Elea intégrés comme personnages, le renommage de baby-c18, 13 images de couverture insérées directement en base64, et la suppression de l'ancien `baby-c16` ("Je pars en promenade") qui faisait doublon avec Or 1. 👉 **C'est cette version qu'il faut reprendre comme base pour la prochaine page codeuse.**

---

## ⚙️ État technique (à jour)

- **Index le plus récent** : celui du 25/07 (nuit). Base à reprendre.
- **⚠️ Fichiers supplémentaires obligatoires avec cet index** :
  - `hype-images-119.js` — 3 clés (`k555`, `k556`, `k557`) pour "Mon Évolution". Inchangé.
  - `hype-images-120.js` — 13 clés (`k558` à `k570`), images de couverture en base64 pour baby-c10, c17-c27 (voir tableau ci-dessous). Le `<script src="hype-images-120.js">` est dans le `<head>`, juste après `hype-images-119.js`.
- **À pousser** : GitHub (Maeween/Hype) → Netlify — index.html **+** hype-images-119.js **+** hype-images-120.js, tous les trois ensemble.
- **⚠️ Point de vigilance sur hype-images-120.js** : images encodées en base64 directement dans ce fichier JS (~6,9 Mo), pas de fichiers image séparés à uploader. Méthode utilisée sur demande explicite de Blandine ("c'est toi qui les insères") — écart au fonctionnement habituel où Blandine gérait seule les visuels. À garder en tête si on veut revenir à des fichiers image séparés plus tard.
- **SQL déjà exécutés côté Supabase** ✅ : `notifications-hype.sql`, `club-agenda.sql`, `image_url` sur `club_agenda`. Aucun SQL en attente.
- **⚠️ Point de vigilance reporté** : alignement réel de la courbe "Mon Évolution" sur la photo, à vérifier une fois en ligne.

---

## 🐴 Poney d'Or — état des lieux complet

Structure finale : baby-c1 à c9 = Bronze (inchangé) ; baby-c10 à c18 = Argent (9 cours, avec renommage de c18) ; baby-c19 à c27 = Or (9 cours, nouveaux, Evan/Samuel/Elea intégrés).

⚠️ **`baby-c16` (ancien "Je pars en promenade", doublon avec Or 1) a été supprimé** — retiré du bloc de cours, de `HYPE_COURS_PRETS`, et du raccourci de navigation `babypromenade` qui devenait orphelin.

### Couvertures insérées (13 images, clés `k558` à `k570`)

| Cours | Clé image | Personnage | Contenu |
|---|---|---|---|
| baby-c10 | `k558` | Evan | Câlin encolure, cœur (aquarelle) |
| baby-c17 | `k560` | Evan | Câlin, peluche-poney blottie (photoréaliste) |
| baby-c18 | `k561` | Liam | Bain moussant, rires |
| baby-c19 | `k562` | Evan | Bras ouverts au galop, monogramme (aquarelle) |
| baby-c20 | `k563` | Elea | Friandise cœur, panneau |
| baby-c21 | `k564` | Elea | Brossage, cristaux/lanternes |
| baby-c22 | `k565` | Samuel | Sur tabouret, brossage toupet |
| baby-c23 | `k566` | Liam | Cure-pied, accroupi |
| baby-c24 | `k567` | Samuel | Carnet, constellation cheval |
| baby-c25 | `k568` | Samuel | Tête contre tête, yeux bleus |
| baby-c26 | `k569` | Samuel | Galop, poing levé, victoire |
| baby-c27 | `k570` | Liam | Rosette, fierté |

⚠️ `k559` avait été prévue pour l'ancien `baby-c16` (désormais supprimé) — cette clé existe toujours dans `hype-images-120.js` mais n'est plus référencée par aucun cours. Sans impact (juste un peu de poids mort dans le fichier JS).

**Répartition finale des personnages sur les couvertures** : Evan ×3, Samuel ×4, Elea ×2, Liam ×3.

---

## 🖼️ Réserve d'images (64 reçues de Blandine, 15 utilisées, ~49 disponibles)

Toutes converties en JPG par Claude au fil de la session. Formats mélangés : portrait 1122×1402 (façon couverture de cours) et carré 1254×1254 (façon carte Memory).

**Toujours en réserve, non utilisées** — notamment :
- Un gros lot **Elea** non utilisé (câlins, friandises, brossage — `elea-calin-carotte-pomme`, `elea-calin-seau-brosses`, `elea-rire-sac-friandises`, `elea-seau-apy-friandises-fleurs`, `elea-tresors-apy-friandises`...)
- Un gros lot **Samuel** en pyjama (ambiance coucher, hors contexte écurie — `samuel-pyjama-*`)
- Plusieurs **Apy générique** (sauts d'obstacles, câlins variés, lecture, couverture hiver...)
- Quelques images **"groupe"** (plusieurs enfants ensemble) et 2 **photoréalistes** avec la maman de Blandine
- 2 essais **Evan style aquarelle/photoréaliste alternatif** non retenus pour une couverture

**Pistes pour la suite** : ces images carrées (1254×1254) sont un bon format pour le Memory du Poney ou le puzzle. Aucun cours n'a plus de slot vide pour l'instant — toute nouvelle utilisation d'image nécessiterait soit un nouveau cours, soit le remplacement d'une image déjà en place.

---

## 🎨 Bible visuelle Baby Spectral — mises à jour

- **Fiche Bambina créée** (section à ajouter au document Word) : Shetland baie, crins/queue noirs, liste blanche étroite (pas large comme Apy), corps rond. Prompt court fourni.
- **Repères de la maman de Blandine notés** (pas encore en fiche officielle) : cheveux blond doré mi-longs ondulés, tenue décontractée soignée. Sert de base si une fiche "Enseignante" est créée plus tard.
- **Elea** : toujours pas de prompt court dédié dans la Bible (contrairement à Liam/Samuel/Evan/Apy/Bambina).
- **Evan** : difficulté connue et actée — c'est le seul personnage devant ressembler à un enfant réel (photos de référence), donc structurellement plus dur à générer de façon cohérente que les personnages inventés. Deux essais "style alternatif" (aquarelle/anneaux lumineux, photoréaliste) ont été gardés en réserve plutôt que rejetés, faute de mieux pour l'instant.

---

## 🔴 À FAIRE

- [ ] **Localiser et mettre à jour l'image d'accueil Baby et l'image du puzzle** (décisions déjà actées par Blandine : accueil = `apy-calin-tendresse`, puzzle = `apy-couronne-fleurs`). Pas encore localisées/appliquées dans le code — ces emplacements sont ailleurs que les blocs `couv-affiche` de cours.
- [ ] **Bouton "Vidéos"** : toujours retiré de la page Galops, à replacer plus tard.
- [ ] **Vérifier l'alignement réel de la courbe "Mon Évolution"** sur la photo une fois en ligne.
- [ ] **QCM général** (point après le Galop 7) : toast "prochainement" uniquement.
- [ ] **GRAND QUIZZ (Bronze+Argent+Or mélangés)** : mode entraînement libre demandé par Blandine, accessible en permanence. Emplacement pas défini. Pas commencé.
- [ ] **Animation de fin de Poney (Bronze/Argent/Or)** : 3 maquettes proposées (Halo Spectral, Trot d'Étoiles, Constellation Montante), Blandine n'a pas encore choisi.
- [ ] **Fiche Elea** à créer dans la Bible visuelle.
- [ ] Décider quoi faire des ~49 images encore en réserve (Memory ? Puzzle ? Remplacement de couvertures existantes ?).
- [ ] Analyse vidéo Premium (Hey Baby, livraison 2)
- [ ] Offre "abonnement AI" dans Stripe + branchement
- [ ] Suppression du post fantôme Supabase
- [ ] Pastilles compactes pour les suggestions Hey Baby
- [ ] Maquette export "carte partage" Instagram-ready
- [ ] Traduction G2 — "La direction sur un tracé"
- [ ] Fiche mémo GitHub/Supabase pour Blandine (upload iPhone)

## 🟡 EN COURS

- [ ] (rien en chantier côté code)

## 🟢 FAIT RÉCEMMENT

- [x] **Poney d'Or refait intégralement (9/9)** avec Evan, Samuel et Elea comme personnages — 25/07 (nuit). Fusionné sur la base "Mon Évolution" reçue de Blandine (qui ne contenait qu'une ancienne version placeholder, sans pédagogie ni Evan).
- [x] **13 images de couverture insérées en base64** (`hype-images-120.js`) sur baby-c10 et c17-c27.
- [x] **`baby-c16` supprimé** (doublon avec Or 1) : bloc de cours, entrée `HYPE_COURS_PRETS`, raccourci de navigation orphelin — tous retirés proprement.
- [x] **Vérification exhaustive à chaque étape** : 136 blocs `<script>` + `hype-images-120.js` validés `node --check` après chaque modification.
- [x] **~64 images reçues de Blandine, triées et converties en JPG**, planches de contact numérotées livrées pour faciliter le choix.
- [x] **Fiche Bambina créée** dans la Bible visuelle (à intégrer au doc Word).
- [x] **Page "Mon Évolution" (refonte complète de la page Galops)** — 24/07, inchangée depuis.
- [x] Vert British Racing, fiche événement club, notifications in-app, agenda club, etc. — voir historique ci-dessous, inchangé.

---

## 💡 Idées notées (pas encore validées pour implémentation)

- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond à choisir)
- Page "Nos Ambassadeurs"
- GRAND QUIZZ transversal Bronze/Argent/Or, mode entraînement libre permanent

---

## 📝 Historique des mises à jour de ce fichier

| Date | Page/session | Résumé de ce qui a changé |
|------|--------------|---------------------------|
| 17/07 | Claude (organisation) | Création du fichier |
| 17/07 (soir) | Claude (notifications / agenda) | Notifications + agenda club + album écurie réparé. |
| 21-24/07 | Claude (design / code) | Fiche événement club, vert British Racing, réordonnancements Écurie/Guilde. |
| 24/07 | Claude (design / code) | Refonte page Galops → "Mon Évolution". `hype-images-119.js` créé. |
| 25/07 | Claude (design / code) | Session finale "Mon Évolution" : badges, encart Chemin des poneys, palette argent lunaire. |
| 24/07 (soir) | Claude (peaufinage) | Itérations "Mon Évolution" : cadrage, fond de page, cartes, cours G2 accessibles. |
| 25/07 (soir) | Claude (traduction + fusion) | Poney d'Or complet (9/9) traduit, première fusion tentée sur une base "Mon Évolution" qui s'est révélée être une ancienne copie sans le travail Or. |
| 25/07 (nuit) | Claude (fusion + insertion images + nettoyage) | **Nouvelle base reçue de Blandine, encore une ancienne version placeholder du Poney d'Or (sans pédagogie, sans Evan)** — fusion refaite intégralement avec Or 1-9. 13 images insérées en base64 sur demande explicite de Blandine. **`baby-c16`, doublon avec Or 1, supprimé proprement** (bloc, `HYPE_COURS_PRETS`, raccourci orphelin). ~64 images au total reçues et converties, 15 utilisées, ~49 en réserve pour Memory/puzzle/remplacements futurs. Fiche Bambina créée. Vérification exhaustive à chaque étape (136 scripts + fichier images validés). Deux emplacements restent à faire (accueil Baby, puzzle) car situés hors des blocs `couv-affiche` de cours. |
