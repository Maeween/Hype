# SUIVI HYPE

> Ce fichier n'est mis à jour que dans deux cas : une tâche est terminée, ou une conversation est pleine et doit s'arrêter (elle note alors ce qu'il reste à faire). Jamais de nouveau fichier créé — toujours celui-ci modifié, remplacé dans les fichiers du projet.

**Version actuelle de l'index.html : session du 18/07/2026 (4)** (fixes 1 à 18 + sw.js/_headers renforcés + affiche "La sécurité avant tout" G1 + compléments g1-c3/g1-c4/g1-c7 + badges NEW + Galop 3 g3-c2 et g3-c3 traduits en i18n 6 langues + **messagerie privée DM (V1)**)

---

## 🔴 À FAIRE

- [ ] **Messagerie — tests réels à faire par Blandine** (non testé en Playwright vu l'ampleur du changement) : envoi/réception d'un message entre deux vrais comptes, blocage (garder/masquer historique), signalement → vérifier qu'il arrive bien pour les modérateurs.
- [ ] **Messagerie — 2 scripts SQL à passer dans Supabase, dans l'ordre** : `messagerie-hype.sql` puis `messagerie-hype-patch1.sql` (colonne `dernier_lu` oubliée dans le premier script).
- [ ] **Messagerie — groupes d'écurie/club** : pas encore implémentés (seuls les DM 1-à-1 fonctionnent). Reste à décider comment peupler automatiquement le groupe d'une écurie/d'un club quand un cavalier la rejoint.
- [ ] **Messagerie — bouton d'accès secondaire** : actuellement un seul point d'entrée sur la fiche cavalier visitée (bouton "Message" sous la citation) + icône 💬 sur l'accueil. Le bouton "message rapide" depuis `EncartCavaliersSpectral` (liste des cavaliers d'une écurie) n'a pas été ajouté — à voir si souhaité.
- [ ] Confirmer que la vraie photo d'un ami visité s'affiche bien (à retester après le Fix 16, qui a réglé un bug d'état plus large qui masquait peut-être celui-ci)
- [ ] Nettoyer en base les 3 albums mal rattachés (`cible: cheval:rizotto` au lieu du bon cavalier) — requête SQL de diagnostic déjà donnée, correction à faire
- [ ] Décider : scinder le chapitre Galop 1 "Les robes et la physiologie du cheval" (g1-c7) en deux chapitres séparés — proposé et argumenté, pas encore développé (à reconsidérer maintenant que g1-c7 a été enrichi d'un complément sur les robes de base)
- [ ] Décider : que faire de la page "Profil"/compte (`EcranProfil`, non reliée à la navigation) — la finir en vrai onglet "Mon compte", ou la laisser de côté
- [ ] Surveiller le quota Supabase — période de grâce jusqu'au 14 août 2026 avant restriction du projet
- [ ] Relire/valider le quiz brouillon (10 questions) du nouveau cours Galop 1 "Monter et descendre en sécurité" (g1-c19)
- [ ] **UI page Cavalier (demande en attente, pas encore traitée)** : (1) déplacer l'encart "L'Album de l'écurie" (Souvenirs) vers la page Hype Memories ; (2) l'encart "Hey Baby · Ton coach virtuel" semble avoir disparu de la page Cavalier — à vérifier et remettre. Capture d'écran annotée fournie par Blandine, aucun code encore proposé, en attente de sa validation avant d'y toucher.
- [ ] **Traduction Galop 3 (en cours, volet Directeur Technique)** : reste à traduire en i18n (fr/en/es/it/ja/de) les cours g3-c4 à g3-c12 (9 cours FR-seul). Déjà faits : g3-c1, g3-c2, g3-c3, g3-c13, g3-c14, g3-c15, g3-saut (celui-ci en fr/en/ja seulement, pas es/it/de). ⚠️ Pour la prochaine page codeuse : bien repartir de la dernière version livrée par la conversation traduction, jamais d'une version antérieure, sinon les traductions déjà faites repartent en FR-seul (déjà arrivé plusieurs fois lors de fusions).

## 🟢 FAIT (session du 18/07/2026 (4) — messagerie privée, conversation Directeur Technique)

- [x] **Conception validée avec Blandine** : DM privés + groupes écurie/club (groupes non codés encore), réseau ouvert pour les adultes, mineurs contactables uniquement par leur écurie/club (règle appliquée côté base, pas juste côté UI), pas de file d'attente pour le premier message, blocage avec choix garder/masquer l'historique, signalement.
- [x] **Maquettes validées** : liste conversations + fil de discussion, palette finale "Turquoise adouci" (fond `#14181C`, bulle destinataire `#232B31`, bulle envoyée `#1D4A56`, turquoise vif réservé au badge non-lu/bouton envoyer/présence).
- [x] **Architecture Supabase** : tables `conversations`, `conversations_participants`, `messages_prives`, `blocages`, `signalements` + colonne `profiles.est_mineur` (nouvelle) + RLS complète + fonction `demarrer_conversation_dm()` (gère blocage + règle mineur/écurie + anti-doublon de conversation) + Realtime activé sur `messages_prives`. Scripts : `messagerie-hype.sql` + `messagerie-hype-patch1.sql` (colonne `dernier_lu` oubliée au premier passage) — **les deux restent à exécuter côté Supabase**.
- [x] **Code `index.html`** : `majProfil` étendu pour sauvegarder `est_mineur` (ne l'était pas avant, alors que l'inscription le demande déjà) ; nouvelles fonctions JS (`demarrerConversationDM`, `listerMesConversations`, `chargerMessagesConversation`, `envoyerMessagePrive`, `marquerConversationLue`, `masquerConversation`, `bloquerUtilisateur`, `debloquerUtilisateur`, `signalerMessage`) ; nouveau composant `EcranMessagerie` (liste + fil, temps réel, blocage, signalement) ; icône 💬 sur l'accueil à côté de la cloche ; bouton "Message" sur la fiche d'un cavalier visité.
- [x] Fichiers livrés : `index.html` complet + `preview-messagerie.html` (ouvre directement sur la messagerie) + `messagerie-hype.sql` + `messagerie-hype-patch1.sql`.

## 🟢 FAIT (session du 18/07/2026 (3))

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

## 🟢 FAIT (session du 18/07/2026 — volet traduction Galop 2 puis Galop 3, conversation Directeur Technique)

- [x] **Galop 2 traduit intégralement en 6 langues (fr/en/es/it/ja/de)** — 12 cours convertis de FR-seul vers i18n complet, contenu + quiz : `g1-c17` (nouveau cours "Préparer son poney : seller et brider"), `g2-c1`, `g2-c5`, `g2-c6`, `g2-anatomie`, `g2-robes`, `g2-sens`, `g2-vie-sociale`, `g2-pansage`, `g2-filet-selle`, `g2-familles`, `g2-heberger`.
- [x] **Galop 3 — début de traduction en 6 langues** : `g3-c2` ("Le départ sur le bon pied", 3 pages + 10 questions), `g3-c3` ("Aborder un obstacle avec justesse", 3 pages + 10 questions).
- [x] Cours déjà i18n avant cette session (non retouchés) : `g3-c1`, `g3-c13`, `g3-c14`, `g3-c15`, `g3-saut` (ce dernier en fr/en/ja seulement).

---

## 💡 Idées notées (pas encore validées pour implémentation)

- ~~Messagerie privée 1-à-1 entre amis~~ → **en cours d'implémentation** (voir session du 18/07/2026 (4) ci-dessus), groupes écurie/club restant à faire.
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
| 18/07 (3) | Compléments de cours Galop 1 (conversation Directeur Technique, volet traduction) : g1-c4 (allures), g1-c3 (mode de vie), g1-c7 (robes de base) — chacun +1 bloc + 10 QCM en 5 langues, badges NEW ajoutés. Question UI en attente (Album de l'écurie → Hype Memories, Hey Baby manquant page Cavalier). Galop 2 traduit intégralement (12 cours, 6 langues). Démarrage traduction Galop 3 : g3-c2 et g3-c3 faits (6 langues chacun). Reste g3-c4 à g3-c12 (9 cours). |
| 18/07 (4) | **Messagerie privée V1** (conversation Directeur Technique) : conception (scope, règles mineurs, blocage/signalement) validée par étapes avec Blandine, maquettes visuelles validées (palette "Turquoise adouci"), architecture Supabase (5 tables + RLS + fonction `demarrer_conversation_dm`), code `index.html` (fonctions JS, écran `EcranMessagerie`, bouton "Message" sur profil visité, icône accueil). Groupes écurie/club **pas encore faits**. 2 scripts SQL à passer côté Supabase avant de tester. |

