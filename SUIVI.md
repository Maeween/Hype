# SUIVI HYPE

> Ce fichier circule entre les pages de travail. Chaque page qui arrive le lit, chaque page qui repart le met à jour avant de le refaire circuler. Objectif : que Blandine n'ait rien à retenir par cœur.

**Règle d'or : une seule page "codeuse" à la fois.** Les autres pages peuvent réfléchir, lister, préparer des maquettes — mais ne livrent pas de fichier index.html tant que ce n'est pas leur tour, pour éviter d'écraser le travail d'une autre page.

**Version actuelle de l'index.html : 25/07 — « Mon Évolution » finalisée (argent lunaire) + page Galops réorganisée**
Dernier index livré. Contient tout l'historique précédent **plus** : la page "Mon Évolution" aboutie (voir Fait récemment du 24-25/07), les badges Prochainement/Réservé Premium redessinés, l'encart Chemin des poneys avec l'image d'Apy, les catégories de cours complétées, et la palette argent lunaire. 👉 **C'est cette version qu'il faut reprendre comme base pour la prochaine page codeuse.**

---

## ⚙️ État technique (à jour)

- **Index le plus récent** : celui du 24/07 (Mon Évolution). Base à reprendre.
- **⚠️ Fichier supplémentaire obligatoire avec cet index** : `hype-images-119.js` — contient désormais 3 clés : `k555` (cheval sauteur, fond de Mon Évolution), `k556` (paysage Apy, fond de l'encart Chemin des poneys), `k557` (Apy au livre, vignette de la carte Baby dans la liste des Galops). Sans lui, ces images ne s'affichent pas. Le `<script src="hype-images-119.js">` est déjà dans le `<head>` de l'index.
- **À pousser** : GitHub (Maeween/Hype) → Netlify — index.html **+** hype-images-119.js ensemble.
- **SQL déjà exécutés côté Supabase** ✅ :
  - `notifications-hype.sql` — **FAIT**
  - `club-agenda.sql` — **FAIT**
  - `ALTER TABLE club_agenda ADD COLUMN IF NOT EXISTS image_url text;` — **FAIT** (confirmé par Blandine le 23/07)
- **SQL en attente** : aucun.
- **⚠️ Point de vigilance pour la prochaine session** : la courbe de "Mon Évolution" est calée en pourcentages sur la photo fournie par Blandine, mais pas encore vérifiée sur un vrai rendu en ligne. Dès que c'est poussé, demander une capture réelle à Blandine et ajuster finement les % si la courbe ne tombe pas exactement sur la trajectoire du cheval.

---

## 🔴 À FAIRE

- [ ] **Bouton "Vidéos" (cours et démonstrations en vidéo)** : retiré de la page Galops le 24/07 à la demande de Blandine (allègement de la page). L'écran `"videos"` et son contenu existent toujours dans le code — il faudra décider plus tard où replacer le point d'entrée (autre page, sous-menu, etc.).
- [ ] **Vérifier l'alignement réel de la courbe "Mon Évolution"** sur la photo une fois en ligne (capture d'écran à demander à Blandine), ajuster les % si besoin.
- [ ] **QCM général** (point posé après le Galop 7 sur la courbe) : pour l'instant juste un toast "prochainement" au tap, aucune vraie fonctionnalité derrière. Reste à définir/coder quand Blandine sera prête.
- [ ] Analyse vidéo Premium (Hey Baby, livraison 2 — vérifier qu'assistant.js accepte plusieurs images par message)
- [ ] Offre "abonnement AI" dans Stripe + branchement (limite 4 épinglés déjà codée)
- [ ] Suppression du post fantôme Supabase
- [ ] Pastilles compactes pour les suggestions Hey Baby
- [ ] Maquette export "carte partage" Instagram-ready
- [ ] Traduction G2 — "La direction sur un tracé"
- [ ] Fiche mémo GitHub/Supabase pour Blandine (upload iPhone)

## 🟡 EN COURS

- [ ] (rien en chantier — tout ce qui suit est livré)

## 🟢 FAIT RÉCEMMENT

- [x] **Page "Mon Évolution" (refonte complète de la page Galops)** — 24/07 :
  - Titre spectral "MON ÉVOLUTION" + sous-titre doré, photo Hey Baby en fond (clé `k555`, voir fichier `hype-images-119.js` ci-dessus).
  - **Trajectoire en demi-cercle** dessinée par les 7 pastilles de Galop elles-mêmes (espacement angulaire égal, donc le sommet mathématique tombe sur le Galop 4 — pas le Galop 3), avec une petite comète lumineuse qui parcourt la courbe en boucle (CSS/SVG pur, léger).
  - **Médaillons** : Galops non atteints en bleu/turquoise avec cadenas ; Galops validés et Galop en cours en **or rosé** (`#E3B98C`), le "en cours" étant nettement plus gros ; chiffre gros et net sur disque uni (priorité accessibilité, testé avec Blandine jusqu'à validation).
  - **Point "QCM général"** posé après le Galop 7, sur la même courbe (pas une pastille à part) — toast "prochainement" au tap pour l'instant.
  - **Carte du Galop en cours** : compacte, façon obstacle vertical (une barre rayée + jalons dorés inclinés), positionnée dans le même repère que la courbe (son bas touche exactement la ligne de base des Galops 1 et 7).
  - **Bouton "Continuer le Galop X"** : discret (contour or rosé sur fond sombre, pas de gros fond plein).
  - **Données réelles branchées** (plus rien en dur) : `profil.galopActuel`, cours terminés (`coursTermines`), prochaine étape (`obtenirCoursParGalop`). Navigation identique à l'existant (`setGalopOuvert` + `setEcran("galop-detail")`).
  - Tout ce qu'il y avait sous l'ancien hero est **inchangé** : bouton Vidéos, encart Hype Pro/Premium, fil d'annonces, bouton Poney/Baby, liste complète des 7 Galops, encart Reprises de dressage.
- [x] **Vert British Racing** (`#0B3D2E`) ajouté au sélecteur de teintes du Fond Studio — 21-24/07.
- [x] **Fiche événement de l'agenda du club** : tap sur une carte → fiche plein écran (bandeau coloré par type), upload d'affiche réservé aux clubs revendiqués (`clubRevendiquePar()`), photo zoomable en plein écran au tap (réutilise `PhotoZoomable`) — colonne `image_url` sur `club_agenda`.
- [x] **Réordonnancements** : agenda du club sous la section chevaux (`EcranGuilde`), album écurie sous "Ma Sellerie" (`EcranEcurie`).
- [x] **Agenda du club** (🎓 Stage / 🏆 Concours / 🌿 Sortie) : encart sur la page club, ajout/suppression réservés au propriétaire, notif aux membres — 17/07
- [x] **Notifications in-app — système complet** (cloche, 2 onglets, temps réel, rétention 60 j) — 17/07
- [x] **Bouton Album écurie** réparé — 17/07
- [x] g3-saut converti en i18n complet (FR/EN/JA) — 16/07
- [x] Système badges Premium sur Galops verrouillés — 16/07
- [x] Système d'annonces communautaires — 16/07
- [x] Édition/suppression fiche cheval avec double-tap — 16/07
- [x] 5 nouveaux cours Galop 3 créés — 16/07

---

## 💡 Idées notées (pas encore validées pour implémentation)

- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond à choisir)
- Page "Nos Ambassadeurs"

---

## 📝 Historique des mises à jour de ce fichier

| Date | Page/session | Résumé de ce qui a changé |
|------|--------------|---------------------------|
| 17/07 | Claude (organisation) | Création du fichier |
| 17/07 (soir) | Claude (notifications / agenda) | Index à jour = notifications complètes + agenda du club + album écurie réparé. SQL `notifications-hype.sql` et `club-agenda.sql` exécutés ✅. Reste : pousser l'index sur GitHub → Netlify. |
| 21-24/07 | Claude (design / code) | Fiche événement club (plein écran + affiche zoomable), vert British Racing sur Fond Studio, réordonnancements Écurie/Guilde, SQL `image_url` sur `club_agenda` exécuté ✅. |
| 24/07 | Claude (design / code) | **Refonte complète de la page Galops → "Mon Évolution"** : courbe demi-cercle animée dessinée par les pastilles de Galop (or rosé/bleu), carte compacte façon obstacle, bouton discret, données réelles branchées. Intégré dans le vrai index.html. Nouveau fichier `hype-images-119.js` (clé `k555`) à pousser avec l'index. Alignement de la courbe sur la photo à vérifier une fois en ligne. |
| 25/07 | Claude (design / code) | **Session finale "Mon Évolution" + page Galops** : badge Prochainement (cadenas + banderole diagonale bleu/noir) et Réservé Premium (idem, passé ensuite en bleu spectral, avec texte "Abonne-toi pour accéder aux prochains cours") ; tous les cours G2 ouverts en accessibles/NEW ; encart Chemin des poneys refait (image paysage Apy k556 en fond, titre bicolore "Le chemin / des poneys" cursive, texte 6 langues recréé en code, badge 3-12 ans) ; vignette carte Baby = Apy au livre (k557) ; 3 encarts (Crystal/Reprises/Poney) uniformisés à 168px ; Reprises remonté avant le Poney ; bouton Vidéos retiré (à replacer, cf. À FAIRE) ; catégories de cours complétées (11 cours G2/G3 qui restaient gris) ; titre "MON ÉVOLUTION" animé (révélation lettre à lettre + dégradé bleu spectral↔baby, fix Safari : dégradé par lettre) ; sous-titre et texte magique Premium passés en **argent lunaire**, ainsi que les médaillons validés/courant, la portion parcourue de la courbe, le badge ✓, le QCM et le rail de la carte. |
| 24/07 (soir) | Claude (peaufinage) | Longue session d'itérations sur "Mon Évolution" et la page Galops : cadrage image/courbe stabilisé, fond de page `#010409` raccord avec l'image, mot "GALOP" dans chaque pastille, texte magique Premium (masqué si abonné), option A carte=bouton unique (gros bouton supprimé), carte à la base de la courbe avec contours bleus, filigrane cavalière retiré de cette page uniquement, tous les cours G2 passés accessibles/NEW, encarts Premium/Reprises/Poney uniformisés à 128px, Reprises remonté avant le Poney, bouton Vidéos retiré (à replacer plus tard, cf. À FAIRE). |
