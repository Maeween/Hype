# SUIVI HYPE

> Ce fichier n'est mis à jour que dans deux cas : une tâche est terminée, ou une conversation est pleine et doit s'arrêter (elle note alors ce qu'il reste à faire). Jamais de nouveau fichier créé — toujours celui-ci modifié, remplacé dans les fichiers du projet.

**Version actuelle de l'index.html : session du 18/07/2026 (2)** (fixes 1 à 18 + sw.js/_headers renforcés + affiche "La sécurité avant tout" G1 ajoutée + compléments g1-c3/g1-c4/g1-c7 + badges NEW)

---

## 🔴 À FAIRE

- [ ] Confirmer que la vraie photo d'un ami visité s'affiche bien (à retester après le Fix 16, qui a réglé un bug d'état plus large qui masquait peut-être celui-ci)
- [ ] Nettoyer en base les 3 albums mal rattachés (`cible: cheval:rizotto` au lieu du bon cavalier) — requête SQL de diagnostic déjà donnée, correction à faire
- [ ] Décider : scinder le chapitre Galop 1 "Les robes et la physiologie du cheval" (g1-c7) en deux chapitres séparés — proposé et argumenté, pas encore développé (à reconsidérer maintenant que g1-c7 a été enrichi d'un complément sur les robes de base)
- [ ] Décider : que faire de la page "Profil"/compte (`EcranProfil`, non reliée à la navigation) — la finir en vrai onglet "Mon compte", ou la laisser de côté
- [ ] Surveiller le quota Supabase — période de grâce jusqu'au 14 août 2026 avant restriction du projet
- [ ] Relire/valider le quiz brouillon (10 questions) du nouveau cours Galop 1 "Monter et descendre en sécurité" (g1-c19)
- [ ] **UI page Cavalier (demande en attente, pas encore traitée)** : (1) déplacer l'encart "L'Album de l'écurie" (Souvenirs) vers la page Hype Memories ; (2) l'encart "Hey Baby · Ton coach virtuel" semble avoir disparu de la page Cavalier — à vérifier et remettre. Capture d'écran annotée fournie par Blandine, aucun code encore proposé, en attente de sa validation avant d'y toucher.

## 🟢 FAIT (session du 18/07/2026)

- [x] Page Club : Écurie descendue sous Sellerie, titre en double supprimé
- [x] Agenda du club : grille 3 cartes/ligne (au lieu du défilement horizontal)
- [x] Page Cavalier : photo de couverture agrandie et recadrée pour ne plus couper la tête
- [x] Bouton "Mode Premium (admin)" repositionné en haut à gauche, recoloré turquoise (au lieu du gros bouton doré en bas)
- [x] Visite du profil d'un ami — série de bugs identifiés et corrigés un par un :
  - fiche complète (citation, 2e écurie) récupérée en base au lieu de champs limités
  - priorité à la vraie photo de la personne visitée
  - chevaux alignés sur la même logique que "mes chevaux" (chevaux de club + chevaux liés inclus)
  - "Hype Memories", "Mur des songes" et "Mon récit" visibles par tous, avec les vraies données de la personne visitée (et non plus celles du compte connecté)
  - tuile "Mon Écurie" masquée en visite (gestion perso, n'a pas de sens pour un visiteur)
  - widget "Mes amis" affiche les amis de la personne visitée, pas les siens
  - albums "partagés/rejoints" scopés à la personne visitée
  - **bug racine** : l'état "je visite quelqu'un" ne se réinitialisait jamais → cliquer un onglet de la barre du bas efface maintenant proprement ce mode avant de naviguer
- [x] Crash Galop 3 "Travail à pied" (+ 2 chapitres suivants) : virgule en trop créant un bloc vide dans le cours, corrigée aux 3 endroits
- [x] `sw.js` renforcé (contournement du cache HTTP navigateur) + fichier `_headers` Netlify pour empêcher tout cache de servir une version périmée
- [x] Affiche "La sécurité avant tout" (Galop 1, g1-c15) ajoutée en fin de cours, 6 langues (fr/en/ja/it/es/de), clés k406-k411, fichier `hype-images-77.js`

## 🟢 FAIT (session du 18/07/2026 (2) — volet cours/traductions, conversation Directeur Technique)

- [x] **g1-c4 "Les allures du cheval"** : complément "Le rythme des trois allures" ajouté en fin de cours (citation d'ouverture, objectifs, à ressentir pas/trot/galop, le savais-tu, erreurs à éviter, Hey Baby, synthèse, citation de fin) + 10 nouvelles questions QCM. Traduit intégralement en/ja/es/it (5 langues, allemand non requis au Galop 1). Le cours passe à 14 questions au total.
- [x] **g1-c3 "Le mode de vie du cheval"** : complément "Les besoins fondamentaux au quotidien" ajouté en fin de cours (besoins sociaux/mouvement/fibres, à observer, le savais-tu, erreurs à éviter, défi du cavalier, Hey Baby, synthèse) + 10 nouvelles questions QCM. Traduit en/ja/es/it. Le cours passe à 14 questions au total.
- [x] **g1-c7 "Les robes et la physiologie du cheval"** : complément "Reconnaître les robes de base" ajouté en fin de cours (les 3 robes de base noir/alezan/bai, à observer, pour aller plus loin, le savais-tu, erreurs à éviter, défi, Hey Baby, synthèse) + 10 nouvelles questions QCM. Traduit en/ja/es/it. Le cours passe à 14 questions au total.
- [x] Pour les 3 chapitres ci-dessus : ajout du bandeau **NEW** sur la carte du chapitre (ajout à `HYPE_COURS_PRETS`, sans impact sur le déblocage puisque le Galop 1 est déjà ouvert par défaut — vérifié via `coursEstPret`).
- [x] Fichiers livrés : `index.html` complet + 3 previews ciblés (`preview-g1-c4-allures.html`, `preview-g1-c3-modevie.html`, `preview-g1-c7-robes.html`).

---

## 💡 Idées notées (pas encore validées pour implémentation)

- Messagerie privée 1-à-1 entre amis (notée comme "intéressant mais pas prioritaire")
- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond)
- Page "Nos Ambassadeurs"

---

## 📝 Historique

| Date | Résumé |
|------|--------|
| 17/07 | Recréation du fichier (nettoyage des doublons) |
| 18/07 | Grosse session nocturne : ~18 bugs corrigés sur la visite de profil (état qui ne se réinitialisait jamais = cause racine), crash Galop 3, durcissement du cache PWA |
| 18/07 (2) | Volet images/cours (conversation Directeur Technique) : affiches multilingues ajoutées à Trot enlevé, Travail à pied, Pansage complet (6/6 langues), Comportement naturel du cheval (6/6 langues), Seller et brider (version paysage), nouveau cours "Monter et descendre en sécurité" (g1-c19, quiz brouillon à valider), affiche "La sécurité avant tout" (g1-c15). Fichiers hype-images-70.js à 77.js. |
| 18/07 (3) | Compléments de cours Galop 1 (conversation Directeur Technique, volet traduction) : g1-c4 (allures), g1-c3 (mode de vie), g1-c7 (robes de base) — chacun +1 bloc + 10 QCM en 5 langues, badges NEW ajoutés. Question UI en attente (Album de l'écurie → Hype Memories, Hey Baby manquant page Cavalier). |
