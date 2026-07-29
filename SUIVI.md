# SUIVI HYPE

> Ce fichier circule entre les pages de travail. Chaque page qui arrive le lit, chaque page qui repart le met à jour avant de le refaire circuler. Objectif : que Blandine n'ait rien à retenir par cœur.

**Règle d'or : une seule page "codeuse" à la fois.** Les autres pages peuvent réfléchir, lister, préparer des maquettes — mais ne livrent pas de fichier index.html tant que ce n'est pas leur tour, pour éviter d'écraser le travail d'une autre page.

**Règle de numérotation : lire le numéro en tête de CE fichier avant d'en attribuer un.** La nouvelle session prend le numéro suivant, jamais un numéro déjà utilisé. C'est arrivé deux fois : en session 16, et le 28/07 où trois pages ont utilisé 22, 23 et 24 en parallèle — la section du mode « M'entraîner à tracer » a disparu du SUIVI alors que son code était bien dans l'index.

**Règle de reprise : ne jamais conclure qu'un travail n'est pas fait sur la seule lecture du SUIVI.** Le SUIVI peut avoir perdu une section (voir ci-dessus). Vérifier dans l'index réel : comptage exhaustif des noms de fonctions et de const, et recherche des marqueurs du travail concerné — en comptant TOUTES les occurrences, jamais en s'arrêtant aux 2 ou 3 premiers résultats.

**Règle de base de travail : partir du fichier que Blandine fournit au moment de la session**, jamais d'une copie gardée d'une session précédente. Elle fait tourner plusieurs pages en parallèle : son fichier contient souvent le travail d'une autre. On réapplique ses correctifs par-dessus SON fichier, marqueur par marqueur — jamais l'inverse.

**Version actuelle de l'index.html : session du 28/07/2026 (38) — Bannière du club agrandie + bandeau d'annonces propre à chaque page**

🔴🔴 **URGENT — SITE HORS LIGNE LE 29/07 : QUOTA NETLIFY DÉPASSÉ** 🔴🔴
Message Netlify : « **This team has exceeded the credit limit. All projects and deploys have been paused to prevent overages.** » Le site affiche « Site not available » aux visiteurs.

**Ce que la page Usage de Netlify montre (relevé du 29/07 à 9h13)** :
| Poste | Crédits |
|---|---|
| **Bande passante** | **1 750,5** |
| Requêtes web (158 608) | 31,7 |
| Compute | 9,5 |
| **Total consommé** | **11 076,7** |
→ **C'est la bande passante, et elle seule.** Le calcul et les requêtes sont négligeables.

**Cause structurelle** : `index.html` pèse **8,9 Mo**, et chaque visite charge en plus **118 fichiers `hype-images-*.js`** + une cinquantaine d'images du dossier `images/`. Aucun en-tête de cache n'était configuré → **tout était retéléchargé intégralement à chaque visite**.

**🔴 DEUX ACTIONS POUR BLANDINE, dans cet ordre**
1. **Remettre le site en ligne** : soit « Get more credits » sur Netlify (immédiat, payant), soit attendre le prochain cycle de facturation (gratuit, mais le site reste éteint jusque-là).
2. **Pousser `netlify.toml` à la racine du repo** (à côté de `index.html`) — livré en session 38. C'est ce qui empêchera que ça recommence.

**Ce que fait `netlify.toml`** (nouveau fichier, à la racine) :
- `index.html` et `/` → `max-age=0, must-revalidate` : jamais mis en cache, pour que les mises à jour soient vues immédiatement.
- `images/*`, `hype-images-*.js`, `hype-*.js`, `complement-*.js`, et toutes les extensions d'images/polices → **`max-age=31536000, immutable`** (un an). Ces fichiers ne changent jamais : quand une image évolue, elle reçoit une nouvelle clé (k610, k611…), donc le navigateur va chercher le nouveau nom.
- `manifest.json` et `sw.js` → non mis en cache.
→ **Gain attendu : 80 à 90 % de bande passante en moins pour tout visiteur qui revient.** Le premier chargement reste lourd, les suivants deviennent quasi gratuits.

⚠️ **Ça ne règle pas tout — le vrai chantier de fond reste à faire** : les **~550 images encore en base64** dans `hype-images-1.js` à `121.js`. Le base64 gonfle chaque image d'environ 33 %, et ces 118 fichiers sont chargés dès l'ouverture, même quand les images ne sont pas affichées. Deux étapes identifiées :
1. **Migration vers `images/`** (déjà commencée : tout ce qui est ≥ k547 est un vrai fichier). Gain de poids immédiat + cache individuel par image.
2. **Chargement à la demande écran par écran** plutôt que tout au démarrage.
⚠️ Rappel : le **quota Supabase** est un problème distinct, avec sa propre échéance au **14 août 2026** (voir plus bas). Ne pas confondre les deux.

---

**Session 38 — deux corrections repérées par Blandine sur des captures**

1. **Bannière du club trop petite et mal cadrée** (`EcranGuilde`) : hauteur passée de `clamp(360px, 58vh, 500px)` à **`clamp(430px, 70vh, 620px)`**, cadrage de `center` à **`center 28%`** pour que le sujet remonte au lieu d'être rogné.

2. **Le bandeau d'annonces sur « Ma Sellerie » n'avait aucun rapport avec la page** (il affichait les annonces générales de l'accueil). **Blandine a choisi de lui rattacher un autre texte plutôt que de le retirer.**
   - `FilAnnoncesB` accepte désormais **`cible`** (source des annonces, défaut `annonces-hype`) et **`libelle`** (mot affiché à gauche, défaut « Nouveau »). `useAnnonces(langue, cible)` étendue, cible dans les dépendances.
   - **Ma Sellerie : `cible: "annonces-sellerie"`, `libelle: "Partenaires"`.** Accueil et Bibliothèque des Galops inchangés.
   - ✅ Blandine gère ces annonces elle-même via Supabase (commentaires de cible `annonces-sellerie`, même mécanisme que l'accueil). **Tant qu'aucune annonce n'y est publiée, le bandeau ne s'affiche pas** — le problème est donc réglé immédiatement, même sans contenu.
   - 💡 Y mettre des nouveautés partenaires, **pas** les codes promo (déjà affichés en dessous, ce serait de la redite).
   - Composant réutilisable : n'importe quelle page peut avoir son fil.

⚠️ **Reste en suspens sur Ma Sellerie** : le **doublon de titre** « MA SELLERIE » (en-tête de page + carte juste en dessous). Signalé, pas tranché.

✅ Vérifs : **885 fonctions** (inchangé), 14 blocs script `node --check` OK, 28 dictionnaires tous déclarés. **Rendu Playwright réel** : `FilAnnoncesB` monté avec `cible` et `libelle` sans erreur, signatures vérifiées, 0 erreur JS.

⚠️ **MAQUETTES D'ACCUEIL EN ATTENTE — 26 propositions, aucune codée** (Blandine explore) :
- `maquette-accueil-propositions.html` — **A** tuile illustrée (utilise k610) · **B** dépliant · **C** bandeau compact · **D** duo · **E** carrousel · **F** onglets
- `maquette-accueil-propositions-2.html` — **G** verre dépoli · **H** liseré animé · **I** chiffre en vedette · **J** progression intégrée · **K** mosaïque · **L** ligne de temps · **M** grille de 3 · **N** ruban d'angle · **O** cartes empilées · **P** mise en avant unique
- `maquette-accueil-propositions-3.html` — **Q** volets plein cadre · **R** sommaire typographique · **S** pilules · **T** tableau de chiffres · **U** bord gauche coloré · **V** aperçu des messages · **W** bloc du jour (⚠️ suppose météo + position) · **X** vignettes photo · **Y** sélecteur unique · **Z** citation
- Recommandations : **U**, **V**, **R** (3ᵉ série) ; **J**, **I**, **G** (2ᵉ) ; tuile illustrée + dépliant (1ʳᵉ). Déconseillés : carrousel sur un menu, **H** sur plusieurs cartes, **Z** au quotidien.

---

**Version précédente : session du 28/07/2026 (37) — Chapitre biomécanique : lisibilité 14,5 px, ouverture aux Premium, partage, questions Hey Baby**

🔴 **À pousser** : `index.html` + `SUIVI.md` + **`k610.jpeg`** dans `images/` (nouvelle image, voir plus bas — pas encore utilisée par le code, elle attend la validation de la maquette d'accueil).

**Session 37 — quatre changements sur le chapitre `g4-biomeca`**

1. **Lisibilité : contenu passé de 13,5 à 14,5 px** (interlignes 1,65 → 1,70) dans `ComplementsBiomeca` (7 occurrences) et `CavalierEquilibre` (5). Décidé après comparaison sur maquette dédiée (`maquette-tailles-police.html`, les 3 tailles côte à côte sur l'encart le plus dense). ⚠️ **Discussion à retenir** : Blandine s'inquiétait de l'allongement des pages. Réponse : +7 % de hauteur seulement, et le vrai levier pour raccourcir n'est pas la police mais le **volume de texte** — si un écran paraît trop long, on resserre les phrases plutôt que de rogner la taille.
2. **5 questions Hey Baby** remises en pastilles dans la carte de fin de chapitre (Blandine les regrettait après la refonte 34). Indices 0/1/2/5/6 de `hbQuestions` : lourd dans la main · sentir les postérieurs actifs · accélère quand on veut ralentir · tombe sur l'épaule intérieure · est-ce que je me penche trop. Les 5 autres restent dans le dictionnaire, réutilisables. ⚠️ 10 pastilles faisaient un pavé, 5 est le bon compte.
3. **Chapitre ouvert** : `"g4-biomeca": true` ajouté à `HYPE_COURS_PRETS` → il perd le badge « Prochainement », gagne le **ruban NEW**, et devient accessible. Le Galop 4 étant sous cadenas Premium (`debloque: false` dans `GALOPS_I18N`), il est donc **accessible aux Premium**.
4. **Bouton « Partager ce cours » sur la couverture** : nouvelle fonction `hypePartagerCours()` + dictionnaire `PARTAGE_COURS_I18N` (6 langues). Elle tente d'abord la **feuille de partage native** (`navigator.share` → WhatsApp, Messages…) et **retombe sur la copie du lien** dans le presse-papier si le téléphone ne la propose pas, avec un message « Lien copié ! » pendant 2,2 s. Le lien pointe sur la couverture via un **nouveau raccourci `#biomeca`** ajouté à la table `MAP` de `CIBLE_DIRECTE` (`{ galop: 4, cours: "g4-biomeca", page: 0 }`). Activation par bloc : il suffit d'ajouter `"partage": "cle"` dans l'objet `couv` d'un `couv-affiche` pour que le bouton apparaisse — **réutilisable sur n'importe quel cours**.

✅ Vérifs : **885 fonctions** (inchangé), 14 blocs script `node --check` OK, 28 dictionnaires tous déclarés, `CAVALIER_I18N`/`allerVersGalop` (3×) intacts. **Rendu Playwright réel** : les 6 blocs du cours rendent du contenu, taille des puces mesurée à **14,5 px**, les 5 bonnes questions présentes et la 6ᵉ absente, `coursEstPret(4,'g4-biomeca')` renvoie true, bouton de partage affiché et **clic testé → lien copié**. 0 erreur JS.
⚠️ **Note de méthode** : `CouvAffiche` rend 0 caractère si on le monte hors du contexte de l'app (`AppContext.Provider`) — ce n'est pas un bug, c'était juste mon test isolé. Il faut fournir un contexte minimal pour le tester.

⚠️ **EN ATTENTE DE VALIDATION — maquette d'accueil** : `maquette-accueil-propositions.html`, 6 façons de présenter les rubriques de l'accueil (`EcranUnivers`), toutes en Hype Spectral et navigables :
- **A · Tuile illustrée** (visuel plein cadre + titre posé dessus) — utilise **k610** (image de bulles de conversation fournie par Blandine le 28/07, à mettre derrière « Mes messages »)
- **B · Dépliant** (replié par défaut, c'est ce que Blandine demandait pour raccourcir l'accueil)
- **C · Bandeau compact** · **D · Duo côte à côte** · **E · Carrousel horizontal** · **F · Onglets**
- Recommandation faite : tuile illustrée pour Mes messages, dépliant pour les rubriques à sous-entrées, bandeau compact pour le reste. Carrousel déconseillé sur un menu (ce qui sort de l'écran ne se voit jamais).
- ⚠️ **Rien n'est codé dans l'index** : `k610.jpeg` doit être poussée mais n'est pas encore référencée.

---

**Version précédente : session du 28/07/2026 (36) — SUPPRESSION DE COMPTE avec délai de réflexion de 60 jours**

🔴 **3 CHOSES À FAIRE PAR BLANDINE, DANS CET ORDRE** :
1. **Supabase** → SQL Editor → exécuter `suppression-compte.sql`. ⚠️ **Version révisée** : à relancer même si tu as déjà exécuté le premier script ce soir (il ajoute les colonnes de délai ; il est idempotent, aucun risque).
2. **GitHub** → déposer `supprimer-compte.js` dans **`netlify/functions/`** (sur GitHub, nommer le fichier `netlify/functions/supprimer-compte.js` crée les dossiers tout seuls), puis pousser `index.html` + `SUIVI.md`.
3. **Netlify** → Site configuration → Environment variables :
   - ✅ `SUPABASE_URL` — **créée le 28/07** (valeur : `https://ldpjebgtskzdokrublfg.supabase.co`, retrouvée dans l'index)
   - ✅ `SUPABASE_SERVICE_ROLE_KEY` — **existait déjà** dans le Netlify de Hype. La fonction accepte les deux noms (`SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SERVICE_ROLE`), donc **rien à recréer**.
   - ⬜ `HYPE_CLE_PURGE` = un mot de passe inventé par Blandine (protège l'appel de purge) — **reste à créer**
   ⚠️ Piège repéré : l'écran de création propose « Different value for each deploy context », qui oblige à remplir 4 champs. Choisir **« Same value in all deploy contexts »**.
   ⚠️ Autre piège : sur mobile, le menu Netlify de **l'équipe** (Builds, Members, Team settings) n'a pas d'« Environment variables » — il faut d'abord **entrer dans le site** majestic-melba-997a68, puis Site configuration.

**Session 36 — le parcours complet** (nouveau composant `EcranSupprimerCompte`, 885 fonctions)

⚠️ **DÉCISION MAJEURE (Blandine) : suppression DIFFÉRÉE de 60 jours, pas immédiate.** Motif : par expérience, les gens changent souvent d'avis. Discussion tenue sur le cadre légal : conserver les données « au cas où » sans consentement serait contraire au RGPD, mais un **délai de grâce annoncé** est parfaitement conforme (c'est ce que font Discord, Instagram et la plupart des jeux). 30 jours est la norme, 60 reste défendable — Blandine a choisi **60**.
- **Au clic** : le compte est désactivé immédiatement, `compte_supprime = true`, `suppression_prevue_le = maintenant + 60 jours`. **AUCUNE donnée n'est effacée.** Seules `augalop_etat_v1` et `hype_uid` sont retirées de l'appareil, pour que l'appli reparte propre.
- **Écran final** : « Ton compte est désactivé · Il sera définitivement supprimé le [date en clair, formatée dans la langue] · D'ici là, reconnecte-toi simplement pour tout retrouver. »
- **Réactivation automatique** : nouvelle fonction `hypeReactiverSiSuppressionEnCours()`, appelée dans `apresConnexion()`. Si le cavalier se reconnecte pendant les 60 jours, les 3 colonnes sont remises à zéro et il retrouve son compte intact. Elle refuse de réactiver si le délai est déjà écoulé (la purge doit primer). Émet l'événement `hype-compte-reactive` + `window.__hypeReactive` pour permettre d'afficher un bandeau plus tard.
- **Purge** : la fonction Netlify accepte `action: "purger"` (protégée par `HYPE_CLE_PURGE`, sans utilisateur connecté) : elle liste les profils échus et les supprime réellement — 17 tables, dossier de photos dans le bucket Storage, puis `auth.admin.deleteUser`. ⚠️ **RESTE À BRANCHER** : il faut un appel planifié (Netlify scheduled function, `pg_cron` Supabase, ou un simple appel manuel de temps en temps). En attendant, la requête de contrôle est dans le SQL : `select id, pseudo, suppression_prevue_le from public.profiles where compte_supprime = true and suppression_prevue_le <= now();`
- **Suppression immédiate à la demande** (obligation RGPD si quelqu'un l'exige) : à faire à la main, requête fournie en commentaire dans le SQL.

**Le parcours, en 3 écrans**
- **Accès** : lien discret souligné en gris dans « Mon compte », **sous « Se déconnecter »**. Écran atteint depuis Profil → Mon compte, ou l'icône en haut à droite de l'accueil.
- **Écran 1** : deux blocs — *SUPPRIMÉ APRÈS 60 JOURS* (corail) / *CONSERVÉ* (turquoise) — puis le **motif de départ facultatif** (6 choix), puis l'avertissement doré expliquant le délai et la réversibilité.
- **Écran 2** : confirmation par **saisie de l'adresse email**, bouton désactivé tant que ça ne correspond pas exactement (testé : désactivé → actif → redésactivé).

**Motif de départ** — facultatif, aucun motif requis :
- « Il manque des choses » / « Un problème avec un autre cavalier » / « Autre » → **champ texte** (celui du problème relationnel précise *nous sommes les seuls à le lire*)
- « C'est trop cher » → **proposition de rétention**, avec « Nous écrire » **et** « Non merci, je supprime » également accessibles. ⚠️ Rendre la sortie plus difficile que l'entrée serait un *dark pattern* sanctionné par le RGPD.
- Enregistrés dans `departs_motifs` **sans aucun user_id**. Lecture : `select motif, count(*) from public.departs_motifs group by motif order by 2 desc;`

⚠️ **DÉCISIONS DE FOND (Blandine), à ne pas rouvrir sans elle** :
- Les **commentaires laissés chez d'autres cavaliers sont conservés** même après la purge, pour ne pas casser leurs conversations. Le `profiles` est vidé mais **pas supprimé**.
- **Seuls le pseudo et l'avatar sont grisés** ; le texte du commentaire reste normalement lisible (pour ne pas attirer l'œil dessus). Le pseudo n'est plus cliquable.
- **Aucune mention « compte supprimé »** affichée aux autres : effet de désertion, et ça donne de mauvaises idées.
- **Pas de case d'anonymisation du pseudo** : dans le milieu équestre, ce serait une porte de sortie pour ceux qui postent n'importe quoi puis disparaissent. Demandes RGPD sincères traitées **à la main en SQL**.
- **Pendant les 60 jours, le profil disparaît des listes et des recherches** — la personne qui veut partir doit vraiment sembler partie (discussion tenue : un profil grisé serait remarqué et commenté, exactement ce qu'on veut éviter).

⚠️ **RESTE À FAIRE (2 points d'affichage, non bloquants)** :
1. **Griser le pseudo et l'avatar** sous les anciens commentaires quand `compte_supprime = true` (la colonne existe et est renseignée, l'affichage ne la lit pas encore). Point d'entrée repéré : `listerCommentairesPhoto()` sélectionne déjà `profiles(id, pseudo, avatar_url)` — il suffit d'y ajouter `compte_supprime` et de styler le rendu (vers l'offset ~6406621, `commentairesVisu.map`).
2. **Masquer les profils désactivés** des listes de cavaliers et des recherches.
3. **Bandeau de réactivation** à la reconnexion (l'événement `hype-compte-reactive` et le texte `T.reactive` existent déjà en 6 langues, il reste à l'afficher).

✅ **6 langues** (`SUPPR_I18N`, 34 clés) : fr/en/es/it/ja/de — vérifié au test que les 6 sont complètes.

✅ Vérifs : 884 → **885 fonctions**, 14 blocs script `node --check` OK, `supprimer-compte.js` validé `node --check`, **28 dictionnaires tous déclarés**, `CAVALIER_I18N` présent. **Rendu Playwright réel** : parcours complet écran par écran, champs conditionnels, offre de rétention et sa sortie, activation/désactivation du bouton final, nouveaux textes du délai, 6 langues, fonction de réactivation exposée — **0 erreur JS**. Non-régression vérifiée : **les 6 blocs de `g4-biomeca` rendent tous du contenu**.

**Maquette de référence** : `maquette-suppression-compte.html` (antérieure à la décision des 60 jours : les textes de l'écran 1 et de l'écran final ont évolué depuis).

---

**Version précédente : session du 28/07/2026 (35) — 🔴 CORRECTIF URGENT : crash du chapitre Galop 4 (module cavalier)**

⚠️ **Collision de numéros à noter** : cette refonte avait été livrée une première fois sous le numéro 33, mais Blandine ne l'a pas poussée et une autre page a utilisé 33 entre-temps (correctifs photos de profil). La refonte a donc été **réappliquée par-dessus l'index contenant ces correctifs** (vérifié présents : `photo_url`, bucket Storage) et renumérotée 34. Rien de perdu des deux côtés.

🔴 **À pousser** : `index.html` + `SUIVI.md`. Aucune image, aucun SQL.

**Session 34 — refonte UX validée par Blandine** (brief « ÉVOLUTION DE L'ARCHITECTURE DES COURS HYPE »)
Constat de départ : à force d'enrichir le chapitre biomécanique, le rythme de lecture était cassé et on ne distinguait plus l'obligatoire du facultatif. **Cette architecture devient le modèle de tous les futurs chapitres.**

**Nouvelle structure du dernier écran du cours** (composant `ComplementsBiomeca` entièrement réécrit) :
1. **📝 « À retenir en 20 secondes »** — la synthèse reste dans le cours (décision Blandine : c'est le résumé, il aide à réussir)
2. **📚 Glossaire** en accordéon replié — reste aussi dans le cours (utile pendant la lecture)
3. **🤖 Carte Hey Baby** « Une question avant le QCM ? » — mise en avant (bordure et fond turquoise), bouton « Poser une question »
4. **✨ « Tu souhaites aller plus loin ? »** avec la mention *Facultatif — tu peux passer le QCM directement*, puis 3 cartes bonus
5. **✅ Bouton « Passer le QCM »** en bas

**Les 3 bonus s'ouvrent en pages séparées** (état interne `vue`, barre de retour « ‹ BONUS · … », scroll remis à zéro) — la page principale reste courte, on revient exactement où on était :
- **👁 Défi du cavalier** : les 5 cases + bouton de validation + phrase de fin
- **🎥 Observer en vidéo** : **absorbe le composant `ObserverEnMouvement`** de la session 28 (le bloc `observer-mouvement` a été retiré du tableau `blocs` du cours ; la fonction est conservée intacte et simplement appelée depuis ce bonus, plus de doublon). ⚠️ Reste en attente des liens IFCE de Blandine.
- **🎓 Approfondir** : Le savais-tu · La science explique (+ panneau dépliant) · Pour aller plus loin

⚠️ **Décisions de vocabulaire et d'UX (Blandine)** :
- Libellé **« Approfondir »** retenu à la place de « Pour les plus curieux » (plus universel, marche pour un enfant comme pour un adulte). ⚠️ **À harmoniser** : les boutons « 🎓 M'expliquer plus en détail » des cartes de cours (`CARTE_LABELS`) portent encore l'ancienne formulation.
- **OPTION A retenue : le moteur n'est pas touché.** XP, validation, `coursTermines`, synchro Supabase inchangés — pour ne rien casser sur les 100+ autres cours. Le bouton « Passer le QCM » appelle les mêmes fonctions (`setCoursTermines` + `setXp` +25 si le cours n'est pas déjà terminé) puis `setEcran("quiz")`, en sautant l'ancienne page de transition `PageCoursTermine` pour ce cours.
- ⚠️ **Conséquence assumée** : la célébration « +25 XP » de `PageCoursTermine` ne s'affiche plus à cet endroit pour ce chapitre. `PageCoursTermine` reste en place et intacte pour tous les autres cours.
- Bonus en **pages séparées** plutôt qu'en accordéons dépliants (sinon la page redevenait longue, ce qu'on cherchait à corriger).

✅ **6 langues** : nouveau dictionnaire `COMPL_NAV` (titres Hey Baby, invitation, noms et sous-titres des 3 bonus, bouton QCM, retour). Titre de la synthèse retraduit dans les 6 langues (« À retenir en 20 secondes » au lieu de « La synthèse en 20 secondes »).

✅ Vérifs : **884 fonctions** (inchangé — réécriture, pas d'ajout), 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime`/`ObserverEnMouvement` intacts, correctifs photos de la session 33 préservés. **Rendu Playwright réel** : écran principal complet (les 8 sections attendues), ouverture et retour testés sur les 3 pages bonus, 0 erreur JS.

**Maquette de référence validée** : `maquette-fin-chapitre.html`.

⚠️ **Ce chapitre biomécanique est considéré comme TERMINÉ** (décision Blandine). Prochaine étape : appliquer ce modèle aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), encore en français seul pour la plupart.

⚠️ **Chantier en attente, maquette validée mais NON codée** : le **parcours de suppression de compte** (`maquette-suppression-compte.html`). Décisions déjà prises : lien discret souligné dans « Mon compte » sous la déconnexion · 3 écrans (explication → motif facultatif → confirmation par saisie de l'email) · les commentaires chez les autres sont conservés, **seuls le pseudo et l'avatar sont grisés**, le texte reste normal, **aucune mention « compte supprimé »** · **pas de case d'anonymisation du pseudo** (décision ferme Blandine : dans le milieu équestre, ce serait une porte de sortie pour ceux qui postent puis disparaissent ; les demandes RGPD sincères seront traitées à la main en SQL) · motif de départ facultatif en 6 choix, avec champ texte sur « il manque des choses » / « problème avec un autre cavalier » / « autre », et **proposition de rétention sur « c'est trop cher »** avec sortie aussi visible que l'offre (pas de dark pattern). **Nécessitera une fonction Netlify + une clé secrète Supabase à ajouter une fois dans Netlify.**

---

**Version précédente : session du 28/07/2026 (33) — Photos de profil : dernier chemin local supprimé, échecs plus jamais silencieux, album réparé, photo de cheval envoyée dans le bucket**

**Audit demandé par Blandine : quels chemins gardaient encore la photo en local ?** Réponse exhaustive après inventaire de tous les `setProfil` touchant une photo — **4 chemins sur 5 avaient bien été corrigés** par l'autre conversation (`EcranProfil`, chemin principal de `EcranMonCavalier`, avatars illustrés via `hypeSyncAvatarChoisi`, photo d'écurie). **Un seul perdurait**, plus deux défauts voisins.

**1. Repli local supprimé** — `EcranMonCavalier.choisirPhoto` gardait un repli `FileReader` faisant `setProfil({ avatar: lr.result })` **sans aucun envoi**. Il était de fait **inatteignable** (sa condition `typeof hypeRecadrer !== "function"` est toujours fausse, `hypeRecadrer` étant une fonction globale) mais ressemblait à un chemin valide : supprimé.

**2. Échec du recadreur : plus de perte silencieuse** — `hypeRecadrer` résout `null` si `__recadrageOuvrir` n'est pas assigné (recadreur non prêt). `appliquerNouvelAvatar` commençant par `if (!res) return;`, la photo était **perdue sans le moindre message**. Un message explicite s'affiche maintenant (`HYPE_TXT_RECADREUR`, 6 langues), en distinguant ce cas d'une annulation volontaire, qui reste silencieuse.

**3. Album des anciennes photos réparé** — l'archivage passait `ancien = profil.avatar_url`, or `avatar_url` **n'était jamais restauré depuis la base** (bug de colonne corrigé en (32)) : `ancien` valait donc `null` et **rien n'arrivait jamais dans l'album**. On repart désormais de `avatar_url || avatar`, dans `EcranMonCavalier` comme dans `EcranProfil`. En complément, `archiverPhotoHistorique` **refuse les dataUrl** : archiver une photo restée locale reviendrait à stocker l'image entière en base64 dans une colonne texte — quota gaspillé et album inutilisable depuis un autre appareil.
🔴 **À vérifier côté Supabase** : que la table `photos_historique` existe bien (colonnes `user_id`, `cible`, `cible_id`, `photo_url`). Si elle manque, l'insertion échoue en silence et l'album restera vide malgré ce correctif.

**4. Photo du cheval enfin dans le bucket** — c'était la **seule photo du projet** à ne pas y passer : `syncProfilDistant({ cheval_photo: dataUrl })` écrivait le base64 directement dans la colonne (une image de 2 Mo → ~2,7 Mo de texte dans la ligne de profil, relu à chaque chargement). Elle passe maintenant par `envoyerPhoto`, seule l'URL est stockée, et l'échec d'envoi est signalé (`HYPE_TXT_PHOTO_NON_ENVOYEE`, 6 langues).

✅ Contrôles : 884 fonctions inchangées, 364 → **366 const** (les 2 messages), 14 blocs script validés, aucune erreur JS. Balayage automatique refait : **tous les points d'écriture de photo sont suivis d'un envoi**, le seul restant sans envoi étant la remise à zéro du profil à la déconnexion (`avatar: null`), ce qui est normal. Challenge, mode tracer et lettres agrandies vérifiés intacts.

---

**Version précédente : session du 28/07/2026 (32) — CORRECTIF : la photo de profil ne suivait pas d'un téléphone à l'autre (mauvais nom de colonne)**

🔴 **Bug signalé par Blandine** : son fils, connecté au même compte sur un iPhone et un Android, ne voyait sa photo de profil que sur l'un des deux, malgré plusieurs déconnexions/reconnexions. Et les interfaces différaient : **4 boutons ronds sur l'iPhone, 3 sur l'Android** (le crayon manquait).

**Cause** : au rechargement du profil depuis Supabase, le code appliquait `avatar: d.avatar || p.avatar`. **La colonne `avatar` n'existe pas dans la table `profiles`** — la vraie colonne est **`avatar_url`**, celle que `majProfil` écrit et que tous les autres `select` du fichier lisent. `d.avatar` valait donc toujours `undefined`, on retombait sur la copie locale du `localStorage`, et sur un appareil neuf il n'y avait rien. **Aucune reconnexion ne pouvait corriger ça.** `histoire` (Mur des songes) et `ma_voix` n'étaient pas restaurés du tout dans ce mappage.

**Preuve mesurée**, scénario « téléphone neuf » (localStorage minimal, photo présente en base) :
| | `profil.avatar` | `profil.histoire` |
|---|---|---|
| avant | vide | vide |
| après | la photo | `#teamfeinn` |

**Correctif** — deux endroits, pas un :
- chargement au **démarrage** : `avatar: d.avatar_url || p.avatar`, plus `avatar_url`, `histoire` et `ma_voix` ajoutés au mappage ;
- chargement juste **après la connexion** (`EcranConnexionSpectral`) : mêmes champs ajoutés, sinon la photo n'apparaissait qu'au rechargement suivant.

**L'écart d'interface n'était pas un problème de plateforme** : le crayon est le bouton « recadrer », il ne s'affiche que s'il existe une photo à recadrer (`modifierPhoto` sort si `!src`). Pas de photo restaurée sur l'Android → pas de crayon. Une fois l'avatar restauré, les deux téléphones affichent la même chose. **Rien à corriger côté Android.**

⚠️ **Point à surveiller, non corrigé ici** : plusieurs chemins de changement de photo n'enregistrent **que localement** (`setProfil({avatar: lecteur.result})` sans upload), notamment un repli `FileReader` quand le recadreur n'est pas disponible. Selon l'écran utilisé, la photo peut donc rester locale et ne jamais monter en base. À reprendre : faire passer tous les chemins par `hypeEnregistrerPhoto`.

✅ Contrôles : 884 fonctions et 364 const inchangés, 14 blocs script validés, aucune erreur JS, plus aucune lecture de la colonne inexistante (les 2 occurrences restantes sont dans le commentaire explicatif). Base : la livraison (31), identique au fichier de Blandine.

---

**Version précédente : session du 28/07/2026 (31) — MODE CHALLENGE (4 épreuves) + lettres beaucoup plus grandes partout**

Base : le fichier fourni par Blandine (869 fonctions, 356 const) — identique à la livraison (30), rien à réappliquer.

**1. Mode Challenge intégré** (maquette v2/v3 validée) — le 3ᵉ mode du panneau des reprises passe de `pret: false` à **`pret: true`**. Nouvel écran `EcranChallengeReprise`, route `challenge-reprise`, raccourcis `#challenge` et `#challenge-reprise`. **Solo, hors ligne, aucun duel en direct** (décision de Blandine).

Quatre épreuves, toutes sur les vraies reprises :
- **Les lettres** — carrière vide, « Où se trouve la lettre M ? », on touche l'emplacement. Tolérance `CHAL_TOL_M = 2.5` m, écart affiché en mètres, bonne position révélée. 10 questions.
- **Dans l'ordre** — 5 figures consécutives mélangées, à remettre dans l'ordre. Testé : ordre correct → **100 %, 5/5**, et aucun conseil affiché puisqu'il n'y a rien à corriger.
- **Reconnais la figure** — le tracé s'anime en 2,2 s, 4 libellés dont 3 tirés de la même reprise. Les figures non dessinables (transitions ponctuelles, moins de 4 points ou moins de 60 unités) sont écartées du tirage.
- **De quelle reprise ?** (idée de Blandine, niveau concours) — feuille de reprise numérotée + tracé animé de l'enchaînement, 4 reprises en réponse. Testé : 60 %, tirage dans 6 reprises. ⚠️ **Le tirage puise dans TOUTES les reprises**, pas celle du sélecteur : c'est le principe. Les **enchaînements ambigus sont écartés** — le code vérifie que la même suite de libellés n'existe pas à l'identique ailleurs, sinon la question n'aurait pas de réponse unique. **Les reprises Amateur et Pro entreront automatiquement dans le tirage** dès qu'elles seront dans `REPRISES_FFE`, sans rien recoder.

- **Conseils du coach uniquement après validation**, et seulement sur les figures manquées (`ChalCoach`, bibliothèque des 75 fiches) — seule spec écrite reçue sur ce mode, respectée.
- **Décors conservés dans toutes les épreuves** : `HYPE_DECORS`, `ORDRE_DECORS`, `hypeFondDouble`, `HYPE_PALETTES` et `hypeDecorMemorise` sont **réutilisés**, rien n'est dupliqué. Le choix est mémorisé dans `hype_trace_decor`, partagé avec le tracé animé. Sur « Sable clair » la palette jour s'applique : carrière claire, lettres sombres.
- **Textes en 6 langues** (`CHAL_TXT`), vérifiés au rendu en fr, de et ja.

⚠️ **Bug corrigé pendant l'intégration** : dans l'épreuve des lettres, le `onPointerDown` était posé sur un div parent avec une ref jamais assignée — **le clic ne renvoyait rien**. `ChalScene` accepte désormais un `onPointer` attaché directement au `<svg>`. Repéré au rendu réel : la validation syntaxique passait sans rien voir.

**2. Lettres beaucoup plus grandes, partout** (demande de Blandine) — `fontSize` **24** (au lieu de 18), contour **7** et halo sombre, dans les **quatre** emplacements : `EcranTraceAnime` (22/24/25/27 selon axe et lettre active), l'encart « Vivre la reprise » (rendu initial **et** la boucle `requestAnimationFrame` qui réécrit la taille à chaque image), `EcranEntrainerTracer` et le Challenge.
- Mesuré au rendu : **12 → 23 px réels** sur iPhone 390 px, soit +92 %, et **aucune lettre ne déborde** du cadre (vérifié lettre par lettre en 390×844 et 320×568).
- ⚠️ **La maquette était déjà à 24 px, l'app à 18** : écart repéré en comparant les deux fichiers valeur par valeur. **Toute décision visible doit être appliquée aux deux dans la même livraison** — c'est le piège n° 1 de ce chantier, il a resurgi ici.

✅ Contrôles : 869 → **884 fonctions** (+15 : `EcranChallengeReprise`, les 4 épreuves, `ChalScene`, `ChalPastilles`, `ChalEnTete`, `ChalCoach`, `ChalBoutons`, `ChalResultat`, `chalChemin`, `chalMelange`, `chalReprisesDispo`, `chalNoteCls`) et 356 → **364 const** (les 7 `CHAL_*` + `CHAL_TXT`). **Aucun doublon de nom** dans le code applicatif (vérifié : le piège `CarteCours` de la (26) ne s'est pas reproduit). 14 blocs script validés, rendu Playwright en 390×844 et 320×568, **aucune erreur JS**. Synchronisation Supabase de la (29) et travaux (25) à (30) intacts.

**Mode Challenge : les 4 modes du panneau des reprises sont désormais tous actifs.** Il ne reste, sur ce chantier, que les vraies musiques libres de droits et la traduction de la bibliothèque de conseils (8 fiches sur 75).

---

**Version précédente : session du 28/07/2026 (30) — Lettres lisibles dans TOUS les modes du tracé + vue cavalier réparée**

Base : le fichier fourni par Blandine avec la synchronisation Supabase de la (29). **Rien d'écrasé** : les 6 fonctions et 3 const de la synchro (`hypeSyncProgressionDifferee`, `hypeFusionnerProgression`, `hypeCollecterExtras`, `hypeAppliquerExtras`, `hypeFusionnerExtra`, `hypeAllegerPourSync`, `HYPE_SYNC_CHAMPS`, `HYPE_EXTRAS_CLES`, `HYPE_EXTRAS_PREFIXES`) sont intactes, diff des noms vérifié dans les deux sens.

**1. Lettres de la carrière illisibles (signalé sur le mode « Voir la reprise »)** — cause commune aux trois endroits : `HYPE_PALETTES.nuit.lettre` valait **`#6B7784`**, un gris moyen, et les lettres non actives étaient rendues à **8 px**.
- Palette **nuit** : lettres `#F4F7FA` (blanc cassé de la charte), lettres d'axe `#FFFFFF`.
- Palette **jour** (décor « Sable clair », carrière blanche) : lettres **volontairement laissées sombres** (`#16212B` / `#070D13`) avec un contour clair — le blanc y serait invisible, précision de Blandine.
- Nouveau champ `contourLettre` par palette, appliqué en `paintOrder: "stroke"`, épaisseur 3,4 : indispensable, les décors photo mangeaient les lettres.
- Tailles dans `EcranTraceAnime` : 8 → **11,5** (courante), 9,5 → **13** (axe), 11 → **13,5**, 12,5 → **15** (lettre active).
- Encart « Vivre la reprise » : 13 px `#6B7784` → 14 px `#F4F7FA` + contour.

⚠️ **Piège rencontré, à retenir** : dans `EncartVivreLaReprise`, une boucle `requestAnimationFrame` **réécrit `fill` et `fontSize` à chaque image**. Le style initial était donc écrasé par l'ancien gris dès que le cheval bougeait — le correctif aurait été **invisible en usage réel** alors que le fichier semblait juste. Repéré en comptant les occurrences restantes de `#6B7784` (il en restait 1 sur 4). **Quand on change une couleur ou une taille, toujours vérifier qu'aucune animation ne la réécrit ensuite.**

**2. Vue cavalier (mode Immersion) « complètement déconnante »** — le recentrage appliquait un `translate` jusqu'à **65 % de la hauteur du contenu** pour un `scale` de **1,1** : la carrière quittait le cadre et laissait de larges bords vides. La caméra suivait juste, mais il n'y avait pas assez de matière pour couvrir l'écran.
- Deux constantes nommées : **`IMMERSION_ZOOM = 1.75`** et **`IMMERSION_SUIVI = 0.55`**. Règle : le zoom doit valoir au moins `1 + 2 × amplitude` ; l'amplitude max passe de 65 % à 36 %, soit 1,72 minimum.
- Mesuré en lecture réelle, somme des bords vides : **272–444 px avant → 47–165 px après**. Le résidu est le vide latéral inévitable (carrière verticale, écran portrait).
- Ce sont les deux seuls nombres à toucher si le cadrage ne plaît pas, et ils vont ensemble.

✅ Contrôles : 869 fonctions inchangées, 354 → **356 const** (les 2 constantes d'immersion), 14 blocs script validés, rendu Playwright en 390×844 et 320×568 — **17 lettres, 16 en blanc + 1 en turquoise (la lettre active), 13 px, contour `rgb(6,7,9)`**, aucune erreur JS. Vérification exhaustive des sessions (25) à (28) refaite sur ce fichier : mode « M'entraîner à tracer », voix, `CarteSegmentRiche`, `dvh`, affiche biomécanique, avatar de l'accueil, « Observer en mouvement », `PhotoZoomable` — **tous présents**.

**Mode Challenge : toujours `pret: false`, rien n'est codé.** Principe validé par Blandine : **solo**, pas de duel en direct. Trois épreuves envisagées (placer les lettres sur une carrière vide, remettre les figures dans l'ordre, reconnaître une figure animée), conseils du coach affichés **après** validation seulement. Maquette autonome à produire et à valider avant toute intégration.

---

**Version précédente : session du 28/07/2026 (29) — SYNCHRONISATION COMPLÈTE DE LA PROGRESSION AVEC SUPABASE (XP, cours, étoiles, quêtes, Baby, Memory, stats chevaux)**

🔴 **À FAIRE PAR BLANDINE AVANT TOUT** : exécuter `progression.sql` dans Supabase (SQL Editor → coller → Run). Sans cette table, la synchro ne fait rien — le code est défensif, aucune erreur visible, on reste simplement sur le local. Puis pousser `index.html` + `SUIVI.md`.

**Session 29 — la progression n'est plus perdue en changeant de téléphone**
Problème signalé par Blandine : XP, cours terminés, étoiles de quiz et série n'étaient stockés QUE dans `localStorage` (`augalop_etat_v1`), donc perdus au changement d'appareil.
- **Nouvelle table `progression`** (fichier `progression.sql`) : une ligne par cavalier, colonne `donnees` en JSONB, `maj_le` automatique par trigger, **RLS activée** (chacun ne lit/écrit que la sienne). Script idempotent et non destructif.
- **5 nouvelles fonctions** : `hypeLireProgression`, `hypeEcrireProgression` (upsert), `hypeFusionnerProgression`, `hypeAllegerPourSync`, `hypeSyncProgressionDifferee`.
- **Fusion — on ne perd JAMAIS de progression** : à la connexion et à chaque `SIGNED_IN`, on lit le distant et on fusionne avec le local en gardant toujours le plus avancé : XP et série au maximum, cours terminés en union, meilleur score conservé par quiz, profil local prioritaire mais complété par le distant. La version fusionnée est aussitôt renvoyée pour que les deux côtés concordent.
- **Écriture différée de 2,5 s** après le dernier changement. Le local continue d'être écrit comme avant → **l'appli fonctionne toujours hors ligne**.
- **Les images ne partent jamais dans cette table** : `hypeAllegerPourSync` retire toute clé contenant photo/image/avatar/banniere/dataUrl, toute chaîne `data:image` et toute chaîne > 4000 caractères. Vérifié : `{nom, photo, avatar_url, stats}` → `{nom, stats}`.
- ⚠️ **Volontairement NON synchronisés** : `planAbo` (la table `abonnements_premium` reste la source de vérité) et `chevaux` (déjà en base dans la table `chevaux`).

✅ **Vérifié dans le code : les photos de chevaux sont DÉJÀ sauvegardées en ligne.** `hypeEnregistrerPhoto("cheval", ...)` envoie le fichier dans **Supabase Storage** (bucket `photos`) et écrit l'URL dans `chevaux.photo_url` ; à l'affichage `photo: c.photo_url` la récupère. La clé locale `hype_cheval_photo_<id>` n'est qu'un cache d'affichage. Un cavalier qui change de téléphone **retrouve donc déjà les photos des chevaux enregistrés sur son compte** — rien à coder de ce côté (c'était l'inquiétude de Blandine, elle est levée).

**Progressions annexes également synchronisées (demande Blandine, même session)** — elles vivaient dans leurs propres clés localStorage, elles partent maintenant dans le même coffre-fort, sous `donnees.extras` :
- `hype_quete_*` (quêtes faites) · `hypeBabyPaliers` (paliers Bronze/Argent/Or) · `hypeMemoryPoneyProfil` (niveaux et erreurs du Memory) · `hype_cheval_stats_*` (statistiques saisies sur chaque cheval) · `hype_galops_vus` (ruban « Nouveau ») · `hype_teinte` · `hype_trace_decor` · `augalop_cercleVIP`
- 3 nouvelles fonctions : `hypeCollecterExtras` (balaie localStorage sur une liste blanche + 2 préfixes, écarte tout ce qui pèse > 4000 caractères ou commence par `data:image`), `hypeFusionnerExtra`, `hypeAppliquerExtras`.
- **Fusion par type, jamais de recul** : drapeaux de quête → le « fait » gagne ; paliers Baby → union ; galops vus → union des ids ; Memory → par niveau, le meilleur score (moins d'erreurs) ; stats de chevaux → complétées sans écraser le local ; préférences simples → le local prime.
- Testé au rendu réel : paliers `{bronze}` + `{argent}` → les deux ; Memory 3 erreurs vs 0 → 0 ; stats `{saut:110}` + `{saut:90,dressage:5}` → `{saut:110, dressage:5}` ; photo de cheval bien exclue de la collecte.

⚠️ **INVENTAIRE COMPLET — ce qui reste volontairement en local seul** (26 clés passées en revue le 28/07) :
- **Images** (déjà dans Supabase Storage, le local n'est qu'un cache d'affichage) : `hype_cheval_photo_*`, `hype_cheval_photo_orig_*`, `hype_avatar_original`, `hype_ecurie_photo*`, `hype_club_banniere`
- **Géré côté serveur, source de vérité ailleurs** : `augalop_vip` et `augalop_demandePro` (table `abonnements_premium`), `hype_heybaby_quota` (table `hey_baby_usage`)
- **État d'interface propre à l'appareil, aucun intérêt à synchroniser** : `hype_coach_*` (coachmarks vus — normal qu'ils se rejouent sur un nouveau téléphone), `hype_install_vu`, `hype_maj_vue`, `hype_rappeler`, `hype_encart_photo_ferme`, `hype_notifs_comm_vu`, `hype_ajouts_ecurie_vus`, `hype_uid`
- **Le miroir local lui-même** : `augalop_etat_v1`
→ **Plus aucune progression réelle du cavalier n'est stockée uniquement en local.**

✅ **SQL exécuté et synchro VÉRIFIÉE EN PRODUCTION le 28/07 à 19h49** : la table `progression` contient bien une ligne (user_id `bc7c52ee-…941e`, `maj_le` 2026-07-28 17:48 UTC). Le mécanisme fonctionne. Requête de contrôle : `select user_id, maj_le, jsonb_pretty(donnees) from public.progression;`

🟠 **À REPRENDRE PLUS TARD — QUOTA SUPABASE (reporté à la demande de Blandine le 28/07, à ne pas oublier)**
Message exact du bandeau Supabase : « **Organization exceeded its quota in the previous billing cycle. Projects will be restricted from 14 Aug, 2026 if your organization remains over quota.** » Donc **restriction du projet le 14 août 2026** si rien ne change — échéance ferme.
- **Première chose à faire** : ouvrir le lien « Review usage » du bandeau pour identifier **quelle jauge** dépasse (base de données / stockage / bande passante / requêtes) et **de combien**. Sans ce chiffre, impossible de dire si un abonnement payant est nécessaire.
- **Ce n'est pas la synchro de progression** : une ligne de quelques ko par cavalier, écrite avec 2,5 s de délai. Négligeable.
- **Pistes d'allègement à explorer quand on s'y remettra** : les photos et les albums sont les gros consommateurs. Notamment (a) l'historique des photos archivées (`archiverPhotoHistorique` garde les anciennes versions), (b) les images stockées en pleine résolution alors qu'une version réduite suffirait à l'affichage, (c) les ~550 images encore en base64 dans les fichiers `hype-images-1.js` à `121.js` (chantier de migration vers `images/` déjà identifié, voir plus bas).
- **Décision à prendre avant le 14 août** : alléger, passer à un plan payant, ou les deux.

✅ Vérifs : 863 → **869 fonctions**, 14 blocs script `node --check` OK, travail des sessions précédentes intact. **Rendu Playwright réel** : appli montée ; fusion testée (xp 120 local vs 300 distant → 300 ; séries 3 et 1 → 3 ; cours réunis sans doublon ; quiz 8 vs 5 → 8 ; prénom local gardé + ville du distant conservée) ; allègement des photos vérifié. Les 2 erreurs JS vues en test (`window.supabase`, `TEINTES_HYPE`) **préexistent dans l'index reçu** — dues à l'absence d'internet dans l'environnement de test, pas à cette session.

---

**Version précédente : session du 28/07/2026 (28) — SECTION « OBSERVER EN MOUVEMENT » (3 ressources IFCE) + photos du cours agrandissables. Chapitre biomécanique terminé.**

**Nouvelle section, dernier bloc du cours `g4-biomeca`, juste avant le quiz (= défi final)** — nouveau type de bloc `"observer-mouvement"`, composant `ObserverEnMouvement`, dictionnaires `OBS_RESSOURCES` / `OBS_TXT` / `OBS_OPTIONS`, tout en 6 langues (fr/en/es/it/de/ja), vérifié au rendu dans les 6.

- **3 cartes ressource** esprit Hype Spectral : dégradé bleu nuit, halo turquoise, pastille de label, pictogramme ▶ en médaillon, source « IFCE · HYPE », texte, liste « À observer », bouton « Ouvrir la ressource ».
- **Les vidéos ne sont ni téléchargées, ni incorporées, ni découpées** : `window.open(url, "_blank", "noopener,noreferrer")`, les contenus restent hébergés par l'IFCE. Un rappel « ↩ S'ouvre dans le navigateur. Pour revenir, touche l'onglet Hype. » figure sous chaque bouton (on ne peut pas ajouter d'icône de retour dans Safari lui-même).
- **Consultation = activité bonus.** Elle est mémorisée dans `localStorage` (`hype_obs_ifce_vues`) et affiche « ✓ Déjà consultée », mais **ne conditionne jamais la fin du chapitre**.
- **Séquence « Les yeux du cavalier »** : plus besoin d'attendre une vidéo personnelle du couple. Le mini-retour interactif suit directement la 2ᵉ ressource (ordre vérifié au rendu : allures → retour → équilibre). 6 cases à cocher **non notées**, mémorisées (`hype_obs_ifce_retour`), et le message bienveillant s'affiche bien au choix « Je ne sais pas encore bien le voir ».
- **Bouton « Continuer vers le défi final »** : `BlocCours` reçoit désormais `onSuivant` (la navigation réelle du cours), vérifié — un clic appelle la navigation une fois exactement.
- Les 3 URL IFCE sont présentes une fois chacune, à l'identique du brief.

**Photos du cours agrandissables** — `PhotoZoomable` existait déjà dans l'app (overlay plein écran, fermeture par croix ou Échap, blocage du scroll) : aucun nouveau composant écrit. **5 images basculées dessus** : les 3 du carrousel biomécanique (étape courante, comparateur avant/après, « Explorer le cheval »), celle de « Le cheval porte aussi son cavalier », et le **carrousel de cartes générique de `BlocCours`** (donc valable pour tous les cours, pas seulement celui-ci).
⚠️ **3 images volontairement laissées non zoomables** : celles des jeux (puzzle à 9 pièces, cartes du memory). Les rendre agrandissables casserait le jeu.

✅ Contrôles : 862 → **863 fonctions** (+`ObserverEnMouvement`) et 346 → **351 const** (+`OBS_RESSOURCES`, `OBS_TXT`, `OBS_OPTIONS`, `OBS_CLE_VUES`, `OBS_CLE_RETOUR`), 14 blocs script validés, **aucune erreur JS au rendu**. Travaux précédents intacts : mode « M'entraîner à tracer » (25), `CarteSegmentRiche` (26), correctifs de la (27).

🔴 **Toujours en attente, indépendant de cette livraison** : vérifier que `images/k604.jpeg`, `k605`, `k606` et `k608` sont bien dans le dépôt. Le carrousel biomécanique fonctionne (testé), mais ces 4 images sont les seules du chapitre non confirmées à l'affichage.

📌 **Sujet ouvert confié à une autre page : la progression est purement locale.** Vérifié dans le code : `localStorage` clé `augalop_etat_v1` contient `profil`, `xp`, `serie`, `coursTermines`, `quizResultats`, `planAbo`, `langue`, `chevaux`. `majProfil` n'envoie à Supabase que le profil public (pseudo, avatar_url, ecurie, ecurie2, ville, teinte, histoire, voix, ecurie_photo, est_mineur) — **aucun champ de progression**. Changement de téléphone, purge Safari ou désinstallation de la PWA = progression perdue. Une table Supabase dédiée + synchronisation bidirectionnelle (avec stratégie de conflit entre appareils) est à concevoir ; le SQL est préparé sur une autre page, **qui prendra la main sur `index.html` après cette livraison**.

---

**Version précédente : session du 28/07/2026 (27) — 3 correctifs : hauteur des couvertures, affiche du chapitre biomécanique, avatar sur l'accueil**

**1. Couvertures de cours coupées en bas (iOS)** — les 4 composants de couverture (`CouvertureCours`, `CouvertureLecon`, `CouvImage`, `CouvAffiche`) utilisaient `calc(100vh - 84px)` : **8 occurrences passées en `calc(100dvh - 84px)`**. Sur iOS `100vh` est plus haut que la zone réellement affichée, donc le bas de l'écran (le bouton « Commencer ») se retrouvait sous la barre de navigation. Même piège que sur l'écran du tracé animé, déjà documenté.

**2. Affiche du chapitre biomécanique** (données du cours `g4-biomeca`, pas le composant : le cours impose ses propres valeurs) — `pos` « center 10% » → **« center 24% »** pour descendre l'image et laisser respirer le haut, `basTexte` 52 → **74**, `basBouton` 54 → **92** pour remonter le titre, la citation et le bouton. Mesuré au rendu réel : le bouton passe de **28 à 92 px du bas**, le bloc de texte remonte de **122 px**.

**3. Avatar du cavalier absent de l'icône de l'accueil** — le bouton « Mon profil » de `EcranUnivers` créait un `div` vide de classe `.pf-av`, et cette classe porte une **image fixe en dur dans le CSS** (`background-image:url(images/inline-06.jpg)`). L'avatar n'était donc jamais affiché à cet endroit, **pour aucun compte** — ce n'était pas propre au compte de son fils. La photo est maintenant injectée en style inline (`profil.avatar || profil.avatar_url`, mêmes champs que les autres écrans), avec repli sur l'image du CSS si le profil n'a pas de photo. ⚠️ **Non validé visuellement** : le dashboard n'est pas atteignable dans l'environnement de test (l'app démarre sur l'écran d'entrée qui attend une saisie). À vérifier en conditions réelles.

**Carrousel biomécanique — le code n'est pas en cause, ce sont des images manquantes.** `BiomecaInteractif` monté isolément fonctionne : il affiche « ÉTAPE 1 · LA POUSSÉE » et passe seul à « ÉTAPE 2 · LA TRANSMISSION » après 5,5 s, flèches comprises, sans erreur JS, et `HYPE_IMGS` contient bien les 6 chemins (`images/k604.jpeg` … `k609.jpeg`). Or `CavalierEquilibre` n'utilise que **k607** et l'affiche **k609** — les deux qui s'affichent chez Blandine. Le carrousel a besoin en plus de **k604, k605, k606 et k608**. 🔴 **À vérifier : ouvrir `majestic-melba-997a68.netlify.app/images/k604.jpeg` dans Safari.** Si 404, ces 4 fichiers ne sont pas dans le dépôt et c'est toute l'explication.

✅ Contrôles : 862 fonctions et 346 const inchangés, 14 blocs script validés, aucune erreur JS au rendu. Mode « M'entraîner à tracer » de la (25) et correctif `CarteSegmentRiche` de la (26) intacts.

---

**Version précédente : session du 28/07/2026 (26) — CORRECTIF CRITIQUE : le Galop 4 ne s'ouvrait plus (`CarteCours` déclarée deux fois)**

🔴 **Bug signalé par Blandine** : impossible d'ouvrir le chapitre du Galop 4, l'appli tombait sur l'écran « Un caillou dans le sabot ».

**Cause** : la fonction **`CarteCours` était déclarée deux fois dans le même bloc script (n° 20)** — la carte de chapitre de la bibliothèque (`{ cours, termine, score, couleur, niveau, onClick, tr, prochainement, nouveau }`, ligne ~32812) et la carte de segment riche du chapitre biomécanique (`{ seg }`, ligne ~33591, ajoutée par la page « cours premium »). En JavaScript la **seconde déclaration écrase la première** : tous les appels de la liste des chapitres recevaient la version `{ seg }`, qui plantait sur `seg.details` avec `seg` indéfini.

**Preuve mesurée avant/après**, en lisant la fonction réellement active dans la page :
| | `CarteCours` active | appel avec `{ cours }` |
|---|---|---|
| avant | `function CarteCours({ seg })` | plante |
| après | `function CarteCours({ cours, termine, score… })` | passe |

**Correctif** : la carte de segment riche est renommée **`CarteSegmentRiche`** (déclaration + son unique appel dans `rendreSegmentRiche`). Aucune autre ligne touchée. La carte de chapitre retrouve son nom et son comportement.

⚠️ **Leçon à retenir pour toutes les pages** : avant de nommer un nouveau composant, vérifier que le nom est libre dans l'index — `grep -cE '^function MonNom'` doit renvoyer 0. Un doublon de `function` ne déclenche **aucune erreur de syntaxe**, `node --check` passe, et le plantage n'apparaît qu'à l'exécution de l'écran concerné. Les seuls autres doublons du fichier (`enqueueUpdate`, `flushSyncWork`, `getIteratorFn`, `formatProdErrorMessage`, `requestFormReset`) appartiennent aux bundles React inlinés et ne sont pas en cause.

✅ Contrôles : 862 fonctions et 346 const inchangés, 14 blocs script validés, plus aucun doublon dans le code applicatif, rendu réel sans erreur JS, et le mode « M'entraîner à tracer » de la session (25) toujours intact (vérifié marqueur par marqueur).

---

**Version précédente : session du 28/07/2026 (25) — MODE « M'ENTRAÎNER À TRACER » + voix des reprises raccourcie**

⚠️ **Collision de numérotation à connaître.** Ce travail a été livré sous le numéro (22) par la page « Reprise de dressage 2 », pendant qu'une autre page utilisait aussi 22, 23 et 24 pour le chapitre biomécanique. Le SUIVI qui a circulé ensuite ne contenait plus la section du mode « tracer », alors que **le code était bien dans l'index**. Renuméroté (25) ici pour lever l'ambiguïté. Même incident qu'en session 16 : **toujours vérifier le fichier réel en plus du SUIVI avant de conclure qu'un travail n'est pas fait.**

✅ **Vérification faite le 28/07 sur l'index fourni par Blandine (862 fonctions, 346 const)** : le mode « tracer » et le correctif de voix sont **tous présents**, comptage exhaustif livré/reçu identique sur les 6 fonctions, les 8 const, la route, les 2 raccourcis de hash, le passage en `pret: true`, l'aiguillage du bouton et les 3 corrections de voix. Bloc de l'écran présent à l'identique. 14 blocs script valides. Rendu Playwright réel : écran monté, 17 lettres, aucun scroll, tracé tactile fonctionnel, note 93 obtenue, aucune erreur JS. Le travail de l'autre page (`CarteCours`, `CavalierEquilibre`, `ComplementsBiomeca`, `SectionCollapse`, `CARTE_LABELS`, `CAVALIER_I18N`, `COMPL_I18N`) est intact.

**Ce que contient le mode « M'entraîner à tracer »** (validé sur maquette v11 par Blandine)

- Le 2ᵉ mode du panneau des reprises (`VLR_MODES`, id `tracer`) passe de `pret: false` à **`pret: true`**. Ses traductions existaient déjà dans les 6 langues.
- Nouvel écran **`EcranEntrainerTracer`** (route `entrainer-tracer`, raccourcis `#tracer` et `#entrainer-tracer`), placé juste avant `EcranTraceAnime`.
- **La reprise se trace d'un bout à l'autre, sans validation intermédiaire** (la première version faisait figure par figure : refusée par Blandine). Autant de coups de doigt qu'on veut, le trait se raccorde.
- **Le trait s'efface derrière la main** : net 5 s (`ENTR_PLEIN_MS`), fondu en 2 s (`ENTR_FONDU_MS`), par morceaux de 260 ms (`ENTR_TRANCHE_MS`). Mesuré sur une reprise complète : 92 morceaux créés, jamais plus de 24 affichés, 0 après 7 s. **Les points restent en mémoire** : ce qui disparaît est l'affichage, pas le tracé.
- **Un seul bouton « Valider la reprise »** : note sur 100, écart moyen en mètres, taux de couverture, figures à retravailler (numéros FFE), indices demandés, tracé officiel révélé avec les manques piqués en rouge.
- **Notation par alignement temporel** (`entrAligner`, DTW à bande 25 %). ⚠️ La première version cherchait le point le plus proche sans regarder l'ordre : elle donnait **84/100 à une reprise où deux figures entières étaient sautées**, parce que la piste est repassée ailleurs. Calibration après correction : exact 98 · 1 m à côté 87 · 2 m à côté 39 · 2 figures oubliées 62 · 5 figures oubliées 36 · moitié 18 · à l'envers 0.
- **Bouton « Un indice »** (bord droit de la carrière) : montre **seulement la figure en cours**, en jaune avec une flèche de sens, 5 s, avec son numéro et son libellé. ⚠️ La version qui révélait toute la reprise (6 059 unités de trait) était illisible — refusée par Blandine. La position du cavalier est déduite de la **longueur déjà tracée** comparée aux longueurs cumulées du tracé officiel, pas du point le plus proche (la piste est repassée plusieurs fois, un point seul est ambigu).
- **Lisibilité** : carrière agrandie (160×481 px sur iPhone, +30 % par rapport au premier jet), lettres en `COLORS.blanc` 13 px avec contour sombre de 4 — **contraste mesuré 18,7:1** lettre par lettre, y compris les 5 lettres de la ligne médiane que les tracés recouvrent.
- **Tactile iOS** : `preventDefault()` sur `touchmove` en `{ passive: false }` — `touch-action` seul ne suffit pas, Safari prenait le glissement vertical pour un scroll et le trait ne descendait pas. Le mouvement est écouté sur `window`, le doigt sortant du cadre en fin de figure.
- **Textes en 6 langues** (`ENTR_TXT`, fr/en/es/it/de/ja), vérifiés au rendu réel dans les 6 langues.

**Voix des reprises — « entre R et M » devient « R M »** (`texteFigurePourVoix`)
- Deux endroits corrigés, pas un : les blocs de lettres collées (`HS` → « H S ») **et** les « entre X et Y » écrits en clair dans les fiches FFE, qui passaient tels quels.
- Mesuré sur la reprise du Galop 4 : **185 → 163 mots, 12 % de moins**. La voix n'avait pas le temps de finir et chevauchait la figure suivante.
- ⚠️ Deux réglages restent en réserve si le chevauchement persiste : `u.rate = 0.92` dans `traceDireFigure` (remontable à 1), et « un peu avant M » → « avant M ». **Pas touché au vocabulaire FFE sans accord de Blandine.**

**Reste à faire sur le chantier des reprises** : le mode **Challenge** (toujours `pret: false`, rien n'existe) ; les **vraies musiques** libres de droits ; la **traduction de la bibliothèque de conseils** (8 fiches sur 75) ; graduer les conseils par niveau à l'intérieur d'une fiche ; séparer « allure nommée » et « vitesse d'animation » dans le moteur du tracé.

---

**Version précédente : session du 28/07/2026 (24) — CHAPITRE BIOMÉCANIQUE COMPLET (toutes les sections du brief « cours premium »)**

🔴 **Rien à pousser côté images.** Seuls `index.html` + `SUIVI.md`. (`hype-dressage-conseils.js` v1.4 toujours requis, session 20.)

**Session 24 — livraisons 2 et 3 : le chapitre `g4-biomeca` est maintenant complet** (source : `Hype_Galop4_Biomecanique_Enrichie.txt`) :
- **Nouveau composant `ComplementsBiomeca`** + type de bloc `"complements-biomeca"`, ajouté en dernier bloc du cours (avant le quiz), et petit composant utilitaire `SectionCollapse` (accordéon réutilisable).
- **Défi de la semaine** : 5 cases à cocher tapables (dont la 5ᵉ sur le cavalier lui-même) + bouton « 🏅 Valider mon défi » qui passe en vert « Défi validé, bravo ! » + phrase de fin. Un seul défi, comme demandé.
- **Demande à Hey Baby** : les 10 questions du document en pastilles + bouton « Ouvrir Hey Baby » (`setEcran("assistant")`, appel défensif).
- **Le savais-tu** (encart doré, pas de clavicule / tronc suspendu par des muscles).
- **La science explique** + bouton « 🎓 M'expliquer plus en détail » ouvrant le panneau « POUR LES PLUS CURIEUX » (centre de masse, forces au sol, mouvements du dos — annoncé comme non nécessaire au Galop 4).
- **Synthèse en 20 secondes** : 8 points + les 4 phrases à retenir (🐎 le moteur / 🌉 le pont / ⚖️ le balancier / 🏇 le premier équilibre).
- **Pour aller plus loin** : 4 cartes (IFCE ×2, FFE TV, Hey Baby) — les 3 ressources externes sont en **Prochainement**, seule « Poser une question personnalisée » est active.
- **Glossaire** : 8 termes en accordéon.
- ⚠️ **Encarts « Vidéo » et « Les yeux du cavalier » volontairement en PROCHAINEMENT** (décision Blandine 28/07 : ChatGPT prépare des versions plus élaborées de ces deux parties). L'encart « Les yeux du cavalier » contient déjà l'astuce utile en attendant : *décrire ce qu'on voit avant de juger*. Quand la matière arrivera : vidéo IFCE « L'équilibre d'un point de vue biomécanique » + FFE TV Galop 4 (règles du document : pas de lecture auto, image d'aperçu, durée affichée, source officielle, 2 vidéos max) ; activité en 3 étapes pour les yeux du cavalier (regard libre → repères → explication descriptive), qui **nécessite une photo/vidéo d'un couple cheval-cavalier**.
- **6 langues** (fr/en/es/it/ja/de) dans `COMPL_I18N`.

**Structure finale du chapitre `g4-biomeca`** : couv-affiche (k609) → 3 cartes → 3 cartes → carrousel biomécanique → module cavalier 60/40 → sections complémentaires → QCM 10 questions.

✅ Vérifs : 860 → **862 fonctions**, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts. **Rendu Playwright réel** : toutes les sections présentes, défi cochable et validable, 6 langues complètes (10 questions Hey Baby, 8 termes de glossaire par langue), 0 erreur JS.

⚠️ **PROCHAINES ÉTAPES**
- Recevoir de Blandine la matière vidéo + la photo/vidéo pour « Les yeux du cavalier », puis remplacer les deux encarts Prochainement.
- **Appliquer le même moule aux 8 autres chapitres du Galop 4** (g4-c1, g4-galop-qualite, g4-c2 à g4-c7) : la plupart sont encore en français seul et au format texte-riche classique. Les briques sont maintenant toutes disponibles et réutilisables (`CarteCours`, `SectionCollapse`, `complements-biomeca` comme modèle).
- Ce chapitre sert de **modèle de référence** pour tous les futurs cours des Galops 4 à 7.

🔴 **Rien à pousser côté images.** Seuls `index.html` + `SUIVI.md`. (`hype-dressage-conseils.js` v1.4 toujours requis, session 20.)

**Session 23 — livraison 1 de la refonte « cours premium »** (source : document `Hype_Galop4_Biomecanique_Enrichie.txt` de Blandine, 1016 lignes) :
- **Nouveau composant `CarteCours`** + nouveau segment `{ k: "carte", emoji, titre, texte, details: [...] }` utilisable dans n'importe quel bloc `texte-riche`. Affiche une idée par carte et un bouton **« 🎓 M'expliquer plus en détail »** qui déplie un panneau **« POUR LES PLUS CURIEUX »** (accordéon, fermé par défaut, contenu avancé toujours facultatif). Libellés du bouton et du panneau traduits dans `CARTE_LABELS` (6 langues).
- **Les 2 blocs de texte de `g4-biomeca` remplacés par 6 cartes** (6 langues chacune) : Comprendre avant de corriger · Les postérieurs, le moteur · Le dos, la transmission · L'encolure, un balancier mobile · L'avant-main, recevoir et diriger · Une chaîne qui fonctionne ensemble. Les panneaux « curieux » contiennent les sections « Comment l'observer / le ressentir », « Poussée ≠ engagement », « Pourquoi un cheval contracte son dos » (avec le rappel de ne jamais conclure qu'il « ne veut pas travailler » et de faire vérifier le confort), les erreurs fréquentes et les signes du cheval sur les épaules.
- **QCM remplacé** : les 10 anciennes questions (déduites par Claude) laissent place à 10 questions construites avec Blandine à partir de sa version — postérieurs/moteur, vitesse ≠ engagement, les 3 articulations, le dos-pont, l'encolure-balancier, **le 60/40 est une simplification pédagogique**, cavalier penché en avant, se jeter en arrière, l'intérêt des transitions, la chaîne de mouvement. Toutes avec options et explications en 6 langues.
- ⚠️ **Décision de fond confirmée (Blandine, 28/07)** : on **n'affiche pas** les valeurs intermédiaires 63/37 et 65/35 du document source, même avec un avertissement. Seul le 60/40 au repos est montré (valeur de référence), le reste en tendance. Une question du QCM porte précisément sur le caractère pédagogique et non scientifique de ce repère.

✅ Vérifs : 860 fonctions, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts, modules `BiomecaInteractif` et `CavalierEquilibre` préservés. **Rendu Playwright réel** : cours converti dans les 6 langues (5 blocs, 3 cartes par bloc, 10 questions, options bien traduites), carte montée, panneau « Pour les plus curieux » qui s'ouvre, 0 erreur JS.

⚠️ **RESTE À FAIRE sur ce chapitre** (livraisons 2 et 3, source = même document) :
- **Hero immersif** + **encart vidéo** (⚠️ matière à fournir par Blandine ; ressources visées : IFCE « L'équilibre d'un point de vue biomécanique », IFCE « Fonctionnement du dos », FFE TV films Galop 4. Règles du document : pas de lecture auto, image d'aperçu, durée affichée, source officielle, 2 vidéos principales maximum)
- **« Les yeux du cavalier »** : activité interactive en 3 étapes (regarder sans aide + cases à cocher → afficher les repères : ligne oreille/épaule/hanche/talon, zone avant-main, ligne du dos, articulations, flèche du centre de masse → explication descriptive, non jugeante). ⚠️ Nécessite une photo ou une courte vidéo d'un couple cheval-cavalier.
- **Défi unique** (5 questions dont une sur le cavalier lui-même) + bouton « 🏅 Valider mon défi »
- **Section Hey Baby** : 10 questions préremplies + bouton « 🎓 M'expliquer plus en détail » (réponse Galop 4 courte, puis réponse approfondie facultative ; si photo envoyée, décrire seulement le visible et rappeler qu'une photo unique ne permet pas d'évaluer la locomotion)
- **Le savais-tu** (pas de clavicule, tronc suspendu par des muscles), **La science explique** (+ panneau curieux), **Pour aller plus loin** (4 cartes IFCE/FFE TV/Hey Baby), **Synthèse en 20 secondes** (+ les 4 phrases à retenir), **Glossaire** (8 termes)
- **Puis** : appliquer le même moule aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), encore en français seul pour la plupart

🔴 **Rien de nouveau à pousser côté images** : le module réutilise `k607` (déjà en ligne). Seuls `index.html` + `SUIVI.md` sont à mettre à jour. `hype-dressage-conseils.js` v1.4 reste requis (session 20).

**Session 22 — nouveau chapitre du brief « cours premium » de Blandine** :
- Nouveau composant `CavalierEquilibre` + nouveau type de bloc `"interactif-cavalier"`, ajouté en **dernier bloc de `g4-biomeca`** (après le module biomécanique, avant le quiz).
- **Schéma de répartition du poids** : image k607 avec deux zones colorées (turquoise = arrière-main, corail = avant-main), gros chiffres, jauge horizontale animée.
- **3 positions de cavalier** (En équilibre / Légèrement penché / Très penché) : la jauge glisse, les zones s'intensifient, un constat s'affiche. ⚠️ **Décision de fond (Blandine)** : les chiffres précis ne sont affichés QU'au repos (60/40, valeur de référence classique) ; pour les positions penchées, seules des flèches de tendance apparaissent — on n'invente pas de valeurs biomécaniques non sourcées. Blandine a soulevé à juste titre qu'au-delà du poids statique, l'inertie et le mouvement amplifient tout.
- **Encart « Quand le déséquilibre s'installe »** en deux colonnes de couleur : *Chez ton cheval* (accélère, du mal à tourner, du mal à s'arrêter, risque de trébucher, s'enterre dans ses barres) / *Ce que tu ressens en selle* (lourd dans la main, transitions difficiles, tu corriges sans arrêt), + une phrase sur l'amplification par l'inertie.
- **Bloc résumé « LE RÉFLEXE À RETENIR »** : cadre lumineux animé (dégradé turquoise tournant, 6 s) + reflet miroir balayant la surface (5,5 s), `prefers-reduced-motion` respecté. Classes CSS `.cavResume*` ajoutées dans le `<style>`.
- **Conclusion révélée à la première interaction** : « Le premier équilibre que ton cheval ressent… est le tien. »
- **6 langues** (fr/en/es/it/ja/de) dans `CAVALIER_I18N`.

⚠️ **RÈGLE DE LISIBILITÉ actée le 28/07** (après retours répétés de Blandine) : contenu à **13,5 px minimum en blanc franc**, intitulés en gras en gris clair, interlignes 1,65. Les tailles ≤12,5 px sont réservées aux étiquettes structurantes (ÉTAPE 1, CHEZ TON CHEVAL…). Ne plus livrer de gris sur gris ni de corps de texte sous 13,5 px. ⚠️ **Piège technique repéré** : un `<li>` en `display:flex` transforme chaque `<b>` en colonne séparée (texte écrasé sur 3 lignes) — utiliser `position:relative` + puce en `position:absolute`.

✅ Vérifs : 858 → **859 fonctions**, 14 blocs script `node --check` OK, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime`/`BiomecaInteractif` intacts. **Rendu Playwright réel** : montage OK, les 3 positions réagissent, conclusion révélée, 0 erreur JS.

⚠️ **BRIEF EN COURS — refonte de tout le Galop 4 en « cours premium »** (documents `Hype_Prompt_Claude_1/2/3` + `Bible_des_cours_Hype_v1` fournis par Blandine le 28/07). Gabarit cible de chaque chapitre : Hero → Vidéo d'intro → Cours en petites cartes → Explorer le cheval → Animation/carrousel → Les yeux du cavalier → Défi unique → Hey Baby → Le savais-tu ? → La science explique → Pour aller plus loin → QCM. Règles : une idée par carte, peu de texte, bouton « 🎓 M'expliquer plus en détail » ouvrant un panneau « Pour les plus curieux » (contenu avancé toujours facultatif, jamais bloquant pour un Galop 4).
- **Fait** : Explorer le cheval ✓, carrousel biomécanique ✓, QCM ✓, chapitre « Le cheval porte aussi son cavalier » ✓
- **Maquette validée mais PAS encore codée** : format « cours en petites cartes » avec bouton 🎓 + panneau « Pour les plus curieux » (fichier `maquette-cours-cartes.html`)
- **Reste à définir/produire** : Hero immersif, emplacement vidéo (matière à fournir par Blandine), « Les yeux du cavalier » (photo + révélation progressive), Défi unique, section Hey Baby avec bouton 🎓, Le savais-tu, La science explique, Pour aller plus loin (IFCE/FFE/Cadre Noir)
- **Puis** : appliquer le même moule aux 8 autres chapitres du Galop 4 (g4-c1, g4-galop-qualite, g4-c2 à g4-c7), qui sont encore en français seul pour la plupart

🔴 **À POUSSER ENSEMBLE SUR GITHUB** : `index.html` (livré directement sous ce nom) + **6 nouvelles images dans le dossier `images/`** : `k604.jpeg` à `k609.jpeg` (images du module, fournies par Blandine sans texte, découpées par Claude). Sans elles, le module s'affiche avec des images cassées. `hype-dressage-conseils.js` v1.4 reste requis (voir session 20).

**RÈGLE EXTENSIONS D'IMAGES (décidée le 28/07 après tests)** : l'iPhone de Blandine enregistre systématiquement les images en `.jpeg` — impossible d'obtenir du `.jpg` sans Working Copy payant. Convention actée : **jusqu'à k546 → `.jpg` (historique) ; à partir de k555 → `.jpeg`**. Ne jamais renommer, chaque référence de l'index correspond à l'extension réelle de son fichier. Les deux cohabitent sans problème.

**Session 21b — retouches module (après premier test en ligne par Blandine)** :
- **Auto-défilement réparé** : il était tué dès que le doigt touchait le module en scrollant la page (onPointerDown global). Désormais seuls les vrais gestes l'arrêtent (pastille, flèche, curseur, point tactile). Vérifié au rendu réel : étapes 1→2→3 enchaînées toutes les 5,5 s malgré un scroll simulé.
- **Les 5 pastilles d'étapes déplacées SOUS la carte** (elles étaient au-dessus, peu visibles, on ne comprenait pas qu'il y avait d'autres écrans).
- **Couverture du chapitre g4-biomeca : k609** (le grand cheval au trajet lumineux complet) remplace le placeholder GALOPS_HERO — et sert automatiquement de fond au QCM (l'écran quiz reprend l'image de couverture du chapitre). Aucun nouveau fichier à pousser, k609 est déjà en ligne.

**Session 21 — Module interactif biomécanique (validé sur maquette v6 par Blandine)** :
- Nouveau composant `BiomecaInteractif` + nouveau type de bloc `"interactif-biomeca"` (dispatché dans `BlocCours`), ajouté en **dernier bloc du cours `g4-biomeca`** (juste avant le quiz).
- **Carrousel 5 étapes** : La poussée (k604) → La transmission (k605) → L'équilibre (k606) → La synthèse (k607 + phrase « Le moteur pousse. Le dos transmet. L'encolure équilibre. ») → Comparer (k608, curseur avant/après fonctionnel qui assombrit un côté).
- **Défilement automatique** : les étapes avancent seules toutes les 5,5 s, et s'arrêtent définitivement au premier geste de l'utilisateur (demande de Blandine : pour ceux qui n'ont pas le réflexe d'appuyer).
- **Section « Explorer le cheval »** : grande image récapitulative (k609) avec 3 points tactiles (postérieur/dos/encolure) qui révèlent une phrase courte, + encart « À retenir ».
- **Tout le texte est en 6 langues** (fr/en/es/it/ja/de) dans `BIOMECA_I18N`, suit la langue de l'app — aucune image ne contient de texte (choix de Blandine : images fournies nues, textes en HTML pour la traduction).
- Vérifs : 851 → **852 fonctions** (+`BiomecaInteractif`), 14 blocs script validés `node --check`, `allerVersGalop` (3×)/`MEVO_CSS`/`EcranTraceAnime` intacts, **rendu Playwright réel** : montage du composant OK, navigation d'étapes OK, aucune erreur JS liée au module. Le composant est défensif (`useApp() || {}`, repli langue fr).
- ⚠️ Les affiches statiques multilingues « Biomécanique simplifiée » (grille 6 langues fournie par Blandine, + version IT corrigée grassella/garretto) ne sont PAS intégrées dans ce lot — décision en attente : les utiliser comme affiche de fin de cours ou dans la couverture. Les fichiers découpés existent côté conversation.

---

**Version précédente : session du 28/07/2026 (20) — FUSION + REFONTE de l'écran du tracé animé (deux onglets, carte unique, intro de générique)**

⚠️ **Fusion faite avant tout codage.** Le fichier reçu de Blandine contenait le travail d'une autre page (nouveau cours `g4-biomeca`, `convertirCoursI18nVersInterne` sur le Galop 4) mais **pas mes 4 correctifs de la session 19**. Inventaire marqueur par marqueur : tout jusqu'à la (18) était présent, la (19) absente. Sa version a donc servi de base et la (19) a été **réappliquée**, pas écrasée : garde de la nappe, angle de la vue cavalier, arrêt réel de la voix, renommage « Vue cavalier ». Le travail de l'autre page est intact (`g4-biomeca` toujours là).

**REFONTE (brief complet de Blandine, points 1 à 20)** — `EcranTraceAnime` réécrit :
1. **Deux onglets : 🎬 Immersion et 🎓 Coaching.** Le premier pour vivre la reprise, le second pour l'étudier. Noms choisis par Blandine ; le bouton caméra a donc été renommé **« Vue cavalier »** pour éviter deux « Immersion » différents dans le même écran.
2. **UNE SEULE CARTE** porte tout ce qui sert pendant la lecture : décor, bandeau de verre « Figure actuelle / Ensuite », carrière, bulle de micro-conseil, barre de commandes. Avant : onze blocs empilés.
3. **Intro de générique de 2 s** à l'ouverture d'Immersion et à chaque changement de reprise : écran noir, titre en Cinzel qui monte en fondu, niveau FFE en turquoise, **souffle de vent synthétisé** (bruit blanc filtré, aucun fichier), puis la carrière se révèle.
4. **Commandes regroupées** : lecture + curseur + vitesses sur une ligne, Vue cavalier + Conseils sur la seconde. **Son, musique, ambiance et aide en pastilles flottantes en haut à droite de la carrière** (dans l'en-tête elles passaient inaperçues, dans la barre du bas elles encombraient).
5. **Grande légende supprimée**, repliée derrière la pastille « i ».
6. **Choix de reprise remontés tout en haut**, sur la ligne de la flèche de retour. **Ligne « Entrée → Transition → Trot » supprimée** : elle répétait le bandeau de figure et Blandine la trouvait à juste titre surchargeante.
7. **Onglet Coaching : accordéon** des figures, seule celle en cours ouverte. ⚠️ La ligne **fermée** porte le **conseil clé** (priorité 1, filtré par niveau) et non le texte officiel — idée de Blandine : on retient mieux « termine ta ligne droite » que le libellé qu'on a déjà sous les yeux. Le texte officiel, l'œil du juge et tous les conseils apparaissent à l'ouverture.
8. `DeroulementReprise` **supprimée** (remplacée par l'accordéon).

**Autres correctifs de cette session** :
- ⚠️ **La musique « ommmm » est remplacée par un ARPÈGE.** La v1 tenait 4 accords en boucle : à l'oreille, un bourdon continu. Maintenant des notes pincées (attaque 20 ms, décroissance 3,2 s) sur une pentatonique de la mineur, une toutes les 1,1 s, basse tous les 8 temps, filtre et réverbération. Mesuré : 8 notes en 3,6 s, **0 après extinction**. Noms de fonctions conservés (`demarrerNappeAmbiante` / `arreterNappeAmbiante`), tous les appels existants marchent.
- ⚠️ **Dictée vocale : LA vraie cause trouvée.** iOS n'autorise la synthèse vocale que si son **premier appel part d'un geste utilisateur**. Elle n'était déclenchée que depuis la boucle d'animation : le moteur restait verrouillé, silencieux. Elle est désormais amorcée **dans le clic du bouton**, qui énonce aussitôt la figure en cours.
- **Voix française féminine** choisie explicitement parmi celles installées (Audrey, Amélie, Marie…), avec repli sur la première voix `fr`. Débit laissé à 0,92 : Blandine veut le garder couplé au rythme du tracé.
- **Vitesse x1 : 78 → 92 px/s** en muet, 52 → 62 avec la voix (« un poil lent »).
- **Contrastes remontés** : les gris `#8A95A1` → `#B4BEC7` et `#5C6573` → `#8E9AA5`, petits corps de texte +1 px (« gris sur gris, on voit rien »).
- ⚠️ **Hauteur de l'écran : `calc(100dvh - 84px)`.** La coquille de l'app ajoute déjà `paddingBottom: 84` pour dégager la barre de navigation ; sans le retirer, la page scrollait. **Défaut invisible en maquette**, faute de barre de navigation — mesuré au rendu réel (root à 862 px pour un écran de 844).

✅ Vérifications : 848 → **850 fonctions** (`DeroulementReprise` retirée, `traceChoisirVoix`/`traceDireFigure`/`traceSouffle` ajoutées, `nappeReverb` → `musReverb`), **334 const**, `allerVersGalop` et `MEVO_CSS` intacts, `g4-biomeca` préservé, 14 blocs inline validés. **Rendu réel sur 3 tailles** (390×844, 375×667, 430×932) : aucun scroll, carrière entière visible, bouton Lecture au-dessus de la barre de navigation, intro jouée puis effacée, voix « Audrey » déclenchée au clic, accordéon Coaching avec conseil clé sur les lignes fermées, aucune erreur JS.

⚠️ **Pour la suite, repartir de CETTE version (20)**.

⚠️ Base de la (9) = fichier renvoyé par Blandine après passage d'une autre page (qui a ajouté `SectionCommentaires` sur les posts de résultat, fait lire `p.data.club` avant `p.data.ecurie`, et **retiré les 2 encarts d'accès à Hey Baby**). Mon `EcranTraceAnime` était intact au bit près dans ce fichier.

⚠️ **Livré sous le nom `index_v44.html`** (+ `preview_trace_v44.html` qui ouvre directement sur l'écran) : à renommer `index.html` au moment du push. Base = fichier reçu de Blandine le 27/07 à 17h11 (838 fonctions + 313 const), vérifié avant toute modification : `allerVersGalop` intact (3×), `MEVO_CSS`, badges de niveau, Chasse aux erreurs, Fin Chemin Baby intacts, et **moteur du tracé strictement identique** à ma copie (`LETTER_POINTS` → `arreterNappeAmbiante`, 18 959 octets au bit près ; `REPRISES_FFE` inchangé, 45 417 octets, 10/20/20/20/22/22 figures). Fusion **chirurgicale** : seul `EcranTraceAnime` a été remplacé, plus une balise `<script>` et 3 clés de raccourci.

🔴 **NOUVEAU FICHIER À POUSSER AVEC L'INDEX : `hype-dressage-conseils.js`** (129 Ko, **version 1.4** — lot 1 de traductions inclus ; 111 Ko en — 75 fiches, 450 conseils, les 114 figures des 6 reprises rattachées sans aucune approximation).

**Consigne permanente de Blandine (27/07)** : dès qu'une figure d'une reprise Club, Amateur ou Pro n'existe pas dans la bibliothèque, créer sa fiche directement en conservant la même architecture. Objectif : couvrir à terme 100 % des figures des reprises françaises. Ne jamais rattacher « à peu près ».

**Fiches ajoutées en v1.3 (8)** : `circle_12m` (texte de Blandine), puis 7 rédigées par Claude et à relire — `curved_line_x` (ligne courbe par X, G6), `half_circle_20m` (G5/G7/Club Elite), `half_circle_10m` (Club Elite), `release_contact` (rênes longues / rupture de contact), `change_diagonal` (G3), `stirrups_out_in` (déchausser-rechausser, G3), `lengthen_few_strides` (quelques foulées de développement, G6). Chaque fiche porte un champ **`source`** pour distinguer les textes de Blandine de ceux de Claude. Sans lui, l'écran fonctionne toujours (tracé, cheval, lettres, immersion) mais aucune carte de conseil n'apparaît — le code teste `window.HYPE_DRESSAGE` avant de s'en servir, il n'y a donc aucun risque de plantage. La balise est déjà ajoutée dans l'index, juste après `hype-images-121.js`.

**Ce que contient la bibliothèque** (source : document « Bibliothèque Hype Dressage — Conseils du coach v1 » de Blandine, textes repris **mot pour mot**) :
- 67 fiches, 402 conseils, 201 observables « œil du juge » (ceux-là écrits par Claude, 3 par fiche).
- Ajouté par Claude sur validation de Blandine : `obs`, `phase`, `type` faire/eviter, `prio` 1-3, `galopMin` numérique, `difficulty`, `timing` (déclenchement), `relatedFigures`, et les champs réservés `video`/`illustration`/`courseId` (à `null`).
- `figuresIds` : rattachement figure → identifiants, **fait pour les 6 reprises, 114 figures, aucun trou** (v1.2 du 27/07). Le message « L'œil du juge et les conseils arrivent bientôt sur cette reprise » (6 langues) reste dans le code : il ne s'affichera que si une future reprise est ajoutée sans être rattachée.
- ⚠️ **Bug corrigé dans la bibliothèque** : les fiches dont le niveau est écrit « Amateur » seul (pirouettes, changements de pied au temps, rassembler…) tombaient à `galopMin: 1` faute de « Galop N » dans la ligne source — un Galop 2 aurait reçu des conseils de pirouette. Elles sont désormais à `galopMin: 8`. « Tous niveaux » reste bien à 1.
- ⚠️ `prio` est déduite de l'**ordre** des conseils dans le document de Blandine (les 2 premiers = prio 1, etc.), et `relatedFigures` est **proposé automatiquement** (même famille, niveau le plus proche). Les deux sont des amorces à relire, pas des vérités pédagogiques.

**Changements dans `EcranTraceAnime`** :
1. **Cartes hors du rectangle** : plus aucun encart par-dessus la carrière. Une **seule** carte (👁️ œil du juge + 💡 conseil du coach réunis), sous le plan, dans une réserve de hauteur fixe de 104 px pour que son apparition ne décale jamais la page. Verre fumé, contour turquoise, ombre douce, fondu + montée de 8 px en 260 ms, `pointer-events:none`.
2. **Déclenchement temporel réel** : aucune carte avant le lancement ; la carte sort selon le `timing` de la fiche (`anticipe` = annoncée avant que la figure commence, pour les arrêts/départs au galop/saluts ; sinon `debut`/`milieu`/`fin`), reste 4,8 à 5,2 s puis se replie seule ; à la figure suivante la nouvelle remplace l'ancienne.
3. **Le cheval remplace le point** : silhouette vue du dessus, orientée par la direction réelle de marche, avec lissage à 25 % par frame (elle ne pivote jamais d'un coup).
4. **Lettres vivantes** : la lettre s'allume en turquoise (+ halo, taille 8,5 → 11) au passage du cheval et retombe en 1,1 s.
5. **Barre de progression par familles** au-dessus du rectangle (ex. G3 : Entrée → Cercle → Transition → Cercle → Transition → Cercle → Arrêt), famille en cours mise en évidence. Libellés des 11 familles en 6 langues (`TRACE_PHASES_TR`).
6. **Nom court de la figure en cours** (« Figure actuelle / Entrée sur la ligne du milieu »), tiré du champ `label` de la fiche.
7. **Tracé vivant** : tout le parcours déjà fait reste allumé en turquoise à 42 % avec un halo léger jusqu'à la fin de la reprise ; la fenêtre récente (340) garde la couleur de l'allure, plus vive.
8. **Mode 🏇 Immersion** : le même SVG basculé en perspective CSS (`rotateX(54deg)`, `scale(1.38)`) avec caméra qui suit le cheval et fondu de horizon en haut. Aucun canvas, aucune 3D réelle : une seule propriété `transform` par frame.
9. **Interrupteur « Afficher les conseils »**, actif par défaut, 6 langues.
10. **Niveau du cavalier** : les conseils sont filtrés par `profil.galopActuel`. Si aucun conseil n'est accessible à son niveau, repli automatique sur un principe général de la section 13 de la bibliothèque (rectitude / incurvation / équilibre / régularité) — le cavalier n'a jamais de carte vide.

⚠️ **Bug préexistant corrigé au passage** : `pointADistance` renvoie le `figIndex` du point **suivant**. Sur une figure qui ne pose qu'un seul point (G4 figure 1, « Avant R — entrée · arrêt · salut »), cette figure était comptée comme terminée dès le départ : jamais affichée, jamais annoncée par la voix, jamais mise en évidence dans la progression. L'écran lit désormais le figIndex du point **déjà atteint**. Effet visible : à l'arrêt, l'écran affiche bien la figure 1 et non la 2.

✅ **Vérifications faites le 27/07** : 838 → 839 fonctions et 313 → 316 const, diff des noms = exactement `traceBornesFigures` + `TRACE_PHASES_TR` + `TRACE_ANTICIPE_UNITES` + `TRACE_SEUILS`, rien perdu. Syntaxe validée sur les **14 blocs `<script>` inline**. **Rendu réel Playwright sur l'app complète** (Supabase bouchonné, 390×844) : écran monté sans erreur JS, bibliothèque chargée (v1.1), carte qui apparaît puis se replie seule, lettres qui s'allument, immersion, interrupteur, et les 6 onglets de reprise parcourus.

⚠️ **La bibliothèque est en français seul pour l'instant.** L'interface de l'écran est bien en 6 langues, mais le contenu des fiches (labels, observables, conseils) retombe sur le français dans les autres langues via `tr()`. C'est le lot suivant.

**Correctifs de la session (9) — lecture du tracé (retours de Blandine sur l'app en ligne)** :
1. ⚠️ **Le tracé ne s'arrête plus pour laisser parler la voix.** J'avais mis une attente explicite : à chaque figure, le cheval se figeait le temps de l'annonce, ce qui hachait complètement la lecture. La voix parle désormais par-dessus un mouvement continu.
2. ⚠️ **« Passe au rouge avant la lettre » — vraie cause trouvée.** Ce n'était pas un décalage d'index (mesuré : le basculement tombait au bon endroit). Le tracé récent était dessiné comme **un seul trait d'une seule couleur** sur une fenêtre de 340 unités : au départ au galop, tout le trait déjà parcouru derrière le cheval repassait en rouge d'un coup, donc bien avant la lettre concernée — et inversement au retour au trot. Le trait est maintenant **découpé en tronçons monochromes**, la couleur d'un tronçon étant celle du point de DEPART du segment (l'allure demandée à une lettre ne colore que ce qui suit cette lettre). Vérifié en rendu réel : jusqu'à 3 couleurs coexistent sur le tracé (vert / bleu / rouge) et les basculements ne repeignent plus le passé.
3. Par cohérence, l'allure courante (couleur du cheval et de la traînée) est lue elle aussi sur le point déjà atteint, comme la figure courante.

✅ Vérifications : 839 fonctions et 316 const **identiques** avant/après (diff des noms vide), `allerVersGalop` intact, syntaxe validée sur les 14 blocs inline, rendu réel Playwright (progression continue voix activée, tronçons de couleur contrôlés à 5 positions du curseur, aucune erreur JS).

**Correctifs de la session (10) — couleurs des allures (retours de Blandine)** :
1. ⚠️ **« Entre F et K — départ au galop » colorait en rouge dès F**, soit deux lettres trop tôt. Ce n'était pas un problème d'affichage mais de **données** : `construireTraceReprise` donnait l'allure demandée à TOUT le chemin de piste F → A → K. Or « entre X et Y » décrit un point situé ENTRE les deux lettres. La nouvelle allure ne commence désormais qu'à partir de la **moitié du chemin** (les premières lettres gardent l'allure précédente). Vérifié sur les 6 reprises : les 12 segments « entre X et Y » avec changement d'allure affichent bien deux couleurs successives (g3 fig5/7/8, g4 fig2/11/12/15, g5 fig9/14, g6 fig4/7/9).
2. ⚠️ **Le travail latéral s'affichait en VERT (pas) alors qu'il se fait au trot** : sa vitesse était à 0,85, sous le seuil du pas de `couleurSelonAllure`. Passée à 0,95 — il reste plus lent que le trot de travail mais garde la couleur bleue. Corrige la cession à la jambe (G6 fig4 et 7) et l'épaule en dedans (Club Elite fig5 et 7).

✅ Vérifications : 839 fonctions et 316 const **identiques** (diff des noms vide), `allerVersGalop` intact, 14 blocs inline validés, rendu réel Playwright de l'app complète sans erreur JS.

**Session (11) — « Vivre la reprise » intégré dans `EcranReprisesFiches`** (maquette validée par Blandine avant codage) :
1. **Encart « Vivre la reprise »** : carrière en PAYSAGE (géométrie officielle projetée : (x,y) → (y, 200−x), donc rien n'est déformé), animation en boucle de 6,5 s montrant **le vrai début de la reprise affichée** (4 premières figures, construites par `construireTraceReprise`). Ma première maquette dessinait une trajectoire **inventée** — un cercle de 22 m accroché à une diagonale ne correspondant à aucune figure ; Blandine l'a repéré tout de suite. Ouverture en 1,5 s (carrière, tracé, cheval, titre, puis bouton actif). Animation en **une seule requestAnimationFrame, arrêtée dès que l'encart sort de l'écran** (IntersectionObserver) et manipulation directe du DOM par refs, pour ne pas re-rendre React 60 fois par seconde.
   - ⚠️ **Cadrage dynamique** : les arcs des cercles **sortent du rectangle** (un cercle de 20 m tracé en C dépasse largement la carrière). Le `viewBox` est donc calculé sur le contenu réel (carrière ∪ tracé + marge), sinon le tracé était coupé par le bord de l'encart — constaté au rendu réel sur le Galop 3.
   - 🔴 **Le cheval de l'encart pointe vers `images/cheval-dessus.png`** (ou `HYPE_IMGS.chevalDessus` s'il existe). **Ce fichier doit être poussé** (livré) sinon l'encart s'anime sans cheval. C'est la photo fournie par Blandine, traitée (voir maquette V6).
2. **Panneau de choix des modes**, en surimpression (`position:fixed`, pas de nouvelle route, donc aucun risque sur le routeur) : 4 cartes. « Voir la reprise » mise en avant avec la pastille « À commencer ici ». « M'entraîner à tracer » et « Challenge » ont un bouton **« Prochainement » désactivé** plutôt qu'un bouton qui ne mène nulle part. « Immersion » lance le tracé animé (et pose `window.__traceImmersion`, non encore lu par l'écran — à brancher quand Blandine aura tranché si Immersion devient un mode autonome).
3. **Conseils du coach en bas de la reprise**, au format des captures de Blandine : titre 🎓, puis par figure un libellé et 4 à 5 phrases courtes, erreurs fondues dans la liste (croix orangée). Alimentés **uniquement** par `hype-dressage-conseils.js`, rien n'est écrit en dur.
   - **Une figure n'apparaît qu'une fois** : le trot de travail revient 6 fois dans le G4, répéter ses conseils donnait une page illisible (8 blocs au lieu de 20).
   - ⚠️ **Le filtre de niveau ne descend jamais sous le niveau de la reprise consultée** (`max(profil.galopActuel, niveau de la reprise)`). Sans ça, un Galop 1 ouvrant la reprise du Galop 5 ne voyait **aucun** conseil et la section disparaissait entièrement — constaté au rendu réel.
4. ⚠️ **L'ancien gros encart carré « Voir le tracé animé »** (ajouté par une autre page le 27/07, même emplacement, même rôle) a été **REMPLACÉ** par le nouvel encart : deux grands encarts d'accès au même écran faisaient doublon. Son code n'existe plus, il faudrait le réécrire pour le remettre.
5. Page réordonnée selon le brief : en-tête → onglets → présentation (titre / niveau FFE / note) → encart → détail des figures → conseils du coach → mention FFE.
6. Nouvelles chaînes visibles traduites en **6 langues** (`VLR_TXT`, `VLR_MODES`, « Le détail des figures »). Le contenu des fiches reste en français et retombe sur `fr` via `tr()` — lot de traduction en cours (8 fiches sur 75).

✅ Vérifications : 839 → **843 fonctions** et 316 → **320 const**, diff des noms = exactement `ConseilsCoachReprise`, `EncartVivreLaReprise`, `PanneauModesReprise`, `vlrProj` (+ leurs constantes). `allerVersGalop`, `MEVO_CSS` intacts. 14 blocs inline validés. Rendu réel Playwright de l'app complète : écran monté sans erreur, encart animé (cheval qui avance, tracé qui se dessine), panneau des modes avec 2 boutons actifs et 2 désactivés, 5 blocs de conseils sur le G3, aucune erreur JS.

**Session (12) — deux retours de Blandine sur l'app en ligne** :
1. ⚠️ **La vitesse à 78 px/s n'existait QUE dans mes maquettes.** L'app était restée à 105 : Blandine testait donc bien du 105 quand elle a redit que c'était trop rapide. La vitesse dépend désormais de la **voix** : 78 px/s en lecture muette, **52 px/s dès que la voix est activée**, ce qui laisse le temps d'énoncer une figure complète (depuis la session 9 le tracé n'attend plus la fin de l'annonce, d'où le besoin de ralentir). x0,5 et x2 s'appliquent par-dessus. Mesuré en rendu réel : 3 s de lecture donnent t=37/1000 en muet contre 25/1000 avec la voix, soit le rapport 1,5 attendu.
2. **Nouveau bloc « Le déroulement, figure par figure » sous le tracé animé** : les 20 figures dans l'ordre, chacune avec son libellé court, le texte officiel FFE et jusqu'à 3 conseils filtrés par niveau ; **la figure en cours de lecture est surlignée en turquoise**. Ici, contrairement à la page « Réviser mes reprises », les figures ne sont **pas dédoublonnées** — l'intérêt est justement de suivre le déroulé. Mon erreur de conception : j'avais mis les conseils d'ensemble uniquement sur la page de la reprise, alors que Blandine les veut aussi sous le tracé, sans changer d'écran.

⚠️ **Rappel critique, confirmé par une capture de Blandine** : sans `hype-dressage-conseils.js` en ligne, l'écran du tracé animé **s'affiche mais reste muet** — pas de « FIGURE ACTUELLE », pas de barre de progression par familles, pas de carte du coach, pas de déroulement. Le code teste la présence de la bibliothèque avant de s'en servir (aucun plantage), mais tout le pédagogique en dépend. Vérification rapide : ouvrir `majestic-melba-997a68.netlify.app/hype-dressage-conseils.js` — si « Page not found », le fichier n'a pas été poussé.

✅ Vérifications : +1 fonction (`DeroulementReprise`), 844 fonctions et 320 const, diff des noms limité aux 5 composants ajoutés depuis la (10), `allerVersGalop` intact, 14 blocs inline validés, rendu réel sans erreur JS (20 blocs de figures, surlignage de la figure courante, effet de la voix mesuré).

**Session (13) — le cheval du tracé animé devient la PHOTO** :
- ⚠️ Blandine voyait toujours « la souris verte » : la photo n'existait **que dans la maquette V6**, jamais dans l'app. Elle attendait mon feu vert, j'attendais le sien.
- `EcranTraceAnime` affiche désormais `images/cheval-dessus.png` en `<image>` SVG (photo fournie par Blandine, recadrée, fond et halo blanc retirés, éclaircie par courbe douce car un cheval noir disparaît sur l'anthracite, réduite à 54×240 px, **25,7 Ko**).
- **Plus aucune couleur d'allure sur le cheval** : elle restait sur son liseré, donc vert au pas, et le halo mangeait la forme. Le code couleur des allures reste sur le tracé, là où il est utile. Halo neutre + ombre douce sous la silhouette.
- **Taille constante en pixels** (`CHEVAL_DESSUS_PX = 58`) : le SVG est mesuré et la longueur du cheval recalculée en unités de viewBox, sinon il rétrécissait avec la carrière sur les petits écrans. Vérifié : 58 px sur 390×844 **et** sur 375×667.
- 🔴 **`images/cheval-dessus.png` est désormais INDISPENSABLE** : sans lui, le cheval du tracé animé et celui de l'encart « Vivre la reprise » disparaissent tous les deux (le tracé continue de s'animer).
- Constantes ajoutées : `CHEVAL_DESSUS_SRC` (repli sur `HYPE_IMGS.chevalDessus` si la clé existe un jour), `CHEVAL_DESSUS_RATIO`, `CHEVAL_DESSUS_PX`.

✅ Vérifications : 844 fonctions et 323 const, `allerVersGalop` intact, 14 blocs inline validés, rendu réel sur 390×844 et 375×667 — photo chargée et dimensionnée à 58 px dans les deux cas, aucune couleur d'allure sur le cheval, aucune erreur JS.

**Session (14) — décors de carrière, palette jour, musique d'ambiance** :
1. **Système de décors intégré** (`HYPE_DECORS`, `ORDRE_DECORS`) : 4 entrées — **Cercle Crystal**, **Îles de nuit**, **Sable clair** (images fournies par Blandine) et **Fond classique** (dégradé, aucune image). Bouton **🌄 Ambiance** dans la seconde rangée de commandes, panneau de miniatures, choix **mémorisé** (`localStorage hype_trace_decor`). **Un seul décor chargé à la fois** : l'image du décor actif est la seule référencée.
   - La carrière reste posée sur une plaque : image de fond + voile de verre fumé (`backdrop-filter: blur(2px)` + radial 30 % → 4 %) + plaque de sol à 34 % d'opacité en mode image contre 55 % sinon. Sur un décor clair, le voile passe en clair au lieu de sombre.
2. ⚠️ **Palette JOUR** (`HYPE_PALETTES.jour`), déclenchée automatiquement par `clair: true` sur un décor. Mesuré sur le sable blanc (**luminance 171/255**) : le turquoise tombait à un contraste de **×1,14** et le vert du pas à **×1,13** — invisibles. Les teintes jour sont toutes au-dessus de ×2,2 : pas `#14612F`, trot `#123F73`, galop `#9B2226`, arrêt `#3A4550`, accent `#0A5F6E`, lettres `#23303C`. **Toute** la carrière suit : bordure, ligne du milieu, lettres (allumées comme éteintes), cercles indicatifs, tracé froid, parcours parcouru, tronçons d'allure, traînée et **légende des allures** (elle avait ses couleurs en dur, elle serait restée vive sur fond clair).
   - ⚠️ Les 3 fichiers `images/decor-*.webp` sont à pousser. Sans eux le décor est vide (fond noir) mais **rien ne plante** : la carrière et le tracé restent lisibles.
   - Conversions faites côté Claude : PNG 2,3–3,1 Mo → **WebP 900 px, 147 / 163 / 301 Ko**. Le décor clair se compresse mal (grain fin du sable) — à savoir si Blandine en génère d'autres.
3. **Musique d'ambiance enrichie** : ce n'était qu'un accord tenu (4 oscillateurs figés sur un do mineur). C'est maintenant une **progression de 4 accords** (la mineur – fa 7 – sol – do, 7,5 s par accord, glissando doux entre eux), un **filtre passe-bas piloté par LFO** à 0,035 Hz qui fait respirer la nappe, et une **réverbération par convolution générée au vol** (impulsion de bruit décroissant, 3,2 s). Toujours **zéro fichier audio**. La boucle d'accords est reprogrammée par un `setInterval` que `arreterNappeAmbiante` prend soin de couper.
   - ⚠️ **Ce n'est toujours pas de la musique** au sens où Blandine l'entend (classique, Caraïbes) : ça, ça demande de vrais morceaux **libres de droits**, 1 à 3 Mo chacun, avec vérification de licence pour un usage commercial. À faire quand elle aura choisi des morceaux.

✅ Vérifications : 839 → **846 fonctions** (+`hypeDecorMemorise`, +`nappeReverb`) et **328 const**, `allerVersGalop` et `MEVO_CSS` intacts, 14 blocs inline validés. Rendu réel Playwright : les 4 décors basculent, la palette suit (lettres et légende passent en foncé sur Sable clair), le choix est bien mémorisé, aucune erreur JS.

**Session (15) — allure persistante : la dernière famille du bug « bleu au lieu de rouge »** (capture de Blandine) :
1. ⚠️ **Un segment sans mot d'allure retombait sur le TROT.** `vitesseDepuisTexte` renvoyait `{ v: 1 }` par défaut. Or « VPV — cercle de 20 m » ne veut pas dire « au trot », ça veut dire « on continue dans l'allure en cours ». Exemple exact signalé : **G4 figure 13, « KV — galop de travail · VPV — cercle de 20 m »** — le cercle était dessiné en bleu au milieu d'une figure au galop. La fonction renvoie désormais `v: null` et `construireTraceReprise` conserve une **`allureCourante`** qui persiste d'un segment et d'une figure à l'autre jusqu'à annonce explicite (1 = trot de travail au départ).
2. ⚠️ **Contre-galop à 1,35 → 1,5** : il tombait juste sous le seuil du galop de `couleurSelonAllure` (1,4) et s'affichait donc en bleu. Concernait les demi-cercles de 20 m au contre-galop du G7 (figures 14 et 20). C'est la **troisième** occurrence de cette même famille de défaut, après le travail latéral (session 10) et le départ au galop « entre X et Y » (session 10).
3. **Contrôle systématique des 6 reprises** : toute figure dont le texte annonce le galop sans mentionner le trot affiche désormais du rouge. Les 4 exceptions restantes (`g4` fig12 et 15, `g5` fig9 et 14) sont **voulues** : ce sont les « entre F et K — départ au galop », où la première moitié du chemin garde l'allure précédente, conformément au correctif de la session 10.

✅ Vérifications : 846 fonctions et 328 const inchangés (aucun ajout), `allerVersGalop` intact, 14 blocs inline validés. Rendu réel : sur la transition trot→galop, le cercle de 20 m et la diagonale qui suit, la tête du tracé est bien **rouge**.

**Session (16) — encart de titre illustré sur la page des reprises** :
- Image fournie par Blandine (cavalier dans un croissant de cristal, entrée de carrière, lettres sur plots). **Recadrée sur les 60 % du haut** (cavalier + entrée de carrière), convertie en **WebP 900×811, 88 Ko** contre 2,5 Mo en PNG.
- Remplace le bloc de titre en texte simple de `EcranReprisesFiches` : l'image porte désormais le titre de la reprise, le niveau FFE et la note.
- **Règle Hype respectée** : le dégradé de lisibilité ne couvre que le **tiers bas** de l'encart, là où se pose le texte. Le bas de l'image est déjà à 38 de luminance, donc pas besoin d'assombrir — et **aucun voile ne touche le cheval**, qui est dans la partie haute.
- 🔴 **`images/hero-reprises.webp` à pousser.**
- ✅ Rendu réel vérifié : `200` sur `hero-reprises.webp` et `cheval-dessus.png`, encart à 350×315 px sur 390 de large, titre/niveau/note bien lisibles dans l'encart, aucune erreur JS.

**Récapitulatif des fichiers `images/` désormais nécessaires** : `cheval-dessus.png` (cheval du tracé et de l'encart Vivre la reprise), `hero-reprises.webp` (encart de titre), `decor-spectral.webp`, `decor-mer.webp`, `decor-sable.webp` (décors de carrière). Plus `hype-dressage-conseils.js` à la racine.

**Session (17) — retour arrière et emplacement des visuels** :
1. ⚠️ **La flèche retour renvoyait toujours sur la page du Galop.** `EcranReprisesFiches` et `EcranTraceAnime` faisaient `setEcran(galopOuvert ? "galop-detail" : "dashboard")` **en dur** : quel que soit l'endroit d'où on arrivait (bibliothèque, accueil, raccourci), on atterrissait sur galop-detail. Les deux écrans utilisent désormais **l'historique réel de l'app** (`retourEcran` / `peutReculer`), avec l'ancien comportement en repli s'il n'y a pas d'historique.
2. **Les 5 visuels passent À LA RACINE du dépôt**, plus dans `images/` (choix de Blandine : rien à taper dans le champ de dossier au moment de l'upload depuis l'iPhone). 7 chemins modifiés dans le code. Réversible en une minute si elle veut ranger plus tard.

**Fichiers à pousser à la RACINE, avec `index.html`** : `hype-dressage-conseils.js`, `cheval-dessus.png`, `hero-reprises.webp`, `decor-spectral.webp`, `decor-mer.webp`, `decor-sable.webp`.

⚠️ **Point de vigilance sur les diagnostics** : plusieurs retours de Blandine (« pas de conseils », « pas de titre avec l'image », « fond noir ») venaient d'un `index.html` ou de fichiers non poussés, pas de bugs. Avant de chercher dans le code, vérifier ce qui est réellement en ligne (`majestic-melba-997a68.netlify.app/<fichier>`) et la taille de l'index en local.

✅ Vérifications : 846 fonctions et 328 const inchangés, `allerVersGalop` intact, 14 blocs inline validés, rendu réel : `200` sur les visuels depuis la racine, encart de titre affiché.

**Session (18) — les visuels acceptent LES DEUX emplacements** :
- ⚠️ **Ma faute de consigne** : j'ai d'abord annoncé les visuels dans `images/`, puis basculé le code vers la racine à la demande de Blandine. Si elle avait déjà poussé dans `images/`, le code cherchait à la racine — d'où « aucune image ne s'affiche » alors que les fichiers étaient bien en ligne.
- Deux helpers ajoutés : **`hypeFondDouble(nom)`** empile les deux `url()` en fond CSS (une couche qui échoue n'est pas peinte, la suivante prend le relais, et le navigateur ne télécharge que ce qui existe) et **`hypeImageSecours(e)`** bascule le `href` d'une `<image>` SVG vers `images/` en cas d'erreur de chargement. Appliqué aux 4 visuels : décor de carrière, encart de titre, cheval du tracé, cheval de l'encart.
- ✅ **Les 3 cas testés en rendu réel** : fichiers uniquement à la racine → OK ; fichiers uniquement dans `images/` → OK (repli déclenché, `200` sur `images/…`) ; **aucun fichier poussé → aucun plantage**, les visuels manquent simplement.
- ⚠️ Leçon de méthode : deux patchs enchaînés, le premier a échoué sur une assertion sans rien écrire et le second a quand même branché les appels → `hypeFondDouble is not defined` et écran de plantage. **Toujours revalider par un rendu réel après une chaîne de patchs**, pas seulement `node --check` (la syntaxe était valide, la fonction manquait).

**Session (19) — trois bugs signalés par Blandine + les pastilles remontées** :
1. ⚠️ **Vue cavalier illisible** : l'inclinaison était à **54°**, la carrière devenait un trapèze écrasé et le cheval vu du dessus se couchait à plat comme une planche. Passée à **28°** (`IMMERSION_ANGLE`), échelle 1,38 → 1,16, perspective 820 → 1100 px, et le cheval est **ré-étiré verticalement de 1/cos(28°) = 1,133** pour compenser l'écrasement (`scale(1, k)` appliqué AVANT la rotation, donc l'étirement se fait bien dans l'axe de l'écran).
2. ⚠️ **La voix ne s'arrêtait plus** (« il parle quelle que soit la position du bouton ») : couper le bouton ne faisait que sortir de l'effet React, sans jamais annuler l'énoncé en cours ni la file d'attente. Ajout d'un effet dédié sur `vocal` qui appelle `speechSynthesis.cancel()` **deux fois** (sur iOS un seul appel laisse parfois passer la phrase en cours), remet à zéro `dernierFigParleRef`, et d'un `vocalRef` vérifié juste avant `speak()`. Vérifié : 2 énoncés avant coupure, **0 après** sur 4,5 s de lecture, 8 annulations déclenchées.
3. ⚠️ **Musique en cacophonie** : `demarrerNappeAmbiante` ne vérifiait pas qu'une nappe tournait déjà. Deux allumages rapides ou un effet rejoué créaient des nappes **superposées**, chacune avec ses oscillateurs et son minuteur de reprogrammation d'accords. Ajout d'un garde (`if (gainMasterRef.current) return;`), d'un nettoyage des restes avant toute création, et l'arrêt vide la liste après le stop différé. Vérifié : 4 cycles allumage/extinction rapides, aucune erreur.
4. **Son, musique et ambiance remontent en pastilles dans l'en-tête** de l'écran — ils encombraient la barre du bas qui portait six boutons sur une ligne. Fait dans la maquette V5 depuis un moment, jamais reporté dans l'app : encore un écart maquette/app à surveiller.
5. Le bouton caméra s'appelle désormais **« Vue cavalier »** (6 langues) et non plus « Immersion », qui devient le nom d'un onglet dans la refonte à venir.

✅ Vérifications : 848 fonctions et 330 const, `allerVersGalop` intact, 14 blocs inline validés, rendu réel avec synthèse vocale instrumentée.

🔴 **RESTE À FAIRE — refonte V5 (brief complet de Blandine, points 1 à 20)** : deux onglets 🎬 Immersion / 🎓 Coaching, carte unique (carrière + bandeau figure + bulle + commandes), intro de générique de 2 s à l'ouverture (écran noir, nom de la reprise, vent synthétique, fondu, cheval déjà à A, puis Lecture qui s'allume), légende repliée derrière une pastille, déroulement en accordéon avec seule la figure en cours ouverte. **Maquette à livrer avant intégration.**

⚠️ **Pour la suite, repartir de CETTE version (19)**.

**Ancienne version (7) — Reconstruction complète de "L'École Portugaise d'Art Équestre"**

⚠️ **Cette version part d'un fichier reçu de Blandine qui avait déjà évolué depuis ma dernière livraison** (d'autres pages avaient retouché l'écran d'accueil ET certains détails de l'article Cadre Noir lui-même). Vérification exhaustive faite avant tout ajout : 830 fonctions + 313 const top-level identiques (diffs vides), `allerVersGalop` intact (3×). Rien n'a été écrasé — je suis parti de cet état reçu, pas de mon ancienne copie.

**Changements observés faits par une autre page depuis ma dernière livraison (non documentés, repérés par diff exhaustif du fichier réel — je les liste ici pour la traçabilité)** :
- Accueil (`EcranAccueil`) : carte "Communauté équestre" remise dans "Mon monde" (grande carte, style identique à "Mon Écurie") — commentaire dans le code indique qu'elle avait été retirée par erreur puis remise à la demande de Blandine. Section "Découvrir" remontée au-dessus de l'actualité, contenu réordonné (IA → Galops → Culture équestre → Santé). Carte "Culture équestre" remontée dans "Actualité" (grande carte style Lamotte). Cartes des chevaux (`hcard`) réduites (150px→112px de large).
- Article Cadre Noir : les 4 principes de philosophie sont maintenant dépliés en permanence (accordéons supprimés, tout le texte visible directement — commentaire dans le code indique une demande explicite de Blandine). Le bloc "Bonus Hype" (adresse/parking/hôtels/etc.) est passé en carrousel horizontal (`cnx-visite-rail`, `data-hscroll`) au lieu d'une grille fixe. L'album participatif a été remonté juste après "Les spectacles"/"Le savais-tu ?", avant le bloc "Visiter" (au lieu d'être en toute fin de page).

**Mes 3 ajouts de cette session (validés par Blandine avant codage)** :
1. **"Continuer l'exploration" allégée** : les 5 cartes stub redondantes (Nuno Oliveira, Baucher, La Guérinière, Lusitanien, Lipizzan — doublons avec la vraie section "Bibliothèque" plus haut) ont été retirées. Il ne reste que les 3 grandes écoles restantes (Vienne 🇦🇹 / Lisbonne 🇵🇹 / Jerez 🇪🇸), affichées en carrousel horizontal (réutilise le style `cnx-visite-rail` déjà présent dans l'article).
2. **Encart "Marquer ma visite"** (version simple validée par Blandine, sans le mode "live" qui a été mis de côté — voir Idées) : placé juste après le bloc "Visiter". Bouton "J'ai visité le Cadre Noir" → compteur permanent visible par tous ("X cavaliers Hype ont déjà visité le Cadre Noir"), passe en "✓ Visité" une fois cliqué (pas de double comptage, une ligne par cavalier en base). **Nécessite la table Supabase `visites_articles` — fichier `visites_articles.sql` livré à côté, pas encore exécuté par Blandine.**
3. **Encart "Partager cet article"** en fin de page (après "Les meilleures vidéos"/bibliothèque/sites officiels/continuer l'exploration/bonus Hype, juste avant le pied de page crédits Wikimedia) : bouton utilisant l'API Web Share native (`navigator.share`, cohérent avec les patterns déjà utilisés ailleurs dans le fichier) avec repli "Copier le lien" (`navigator.clipboard`) si l'API n'est pas dispo. Lien construit à partir de `LIEN_APP + "#cadrenoir"`.

✅ **Vérification exhaustive faite le 27/07 (session 2)** : 830 fonctions top-level et 313 const identiques au fichier reçu (mes 3 fonctions ajoutées — `texteCompteurVisites`, `marquerVisite`, `partagerArticleCN` — sont locales à `EcranCadreNoir`, pas top-level, donc n'apparaissent pas dans ce compte, comme attendu). `allerVersGalop` toujours 3×. Diff confiné à exactement 6 zones, toutes dans `EcranCadreNoir` (nouveaux hooks/fonctions, CSS `.cnx-checkin`/`.cnx-share`, remplacement de la grille par le carrousel des 3 écoles, insertion des 2 nouveaux encarts). Syntaxe JS validée sur les 14 blocs `<script>` inline (1 erreur de parenthèse manquante détectée et corrigée avant validation finale — comptage exact des parenthèses vérifié ligne par ligne).

⚠️ **Pour la suite, repartir de CETTE version.**

---

## 28/07/2026 — Bugs des photos de profil (produit communautaire) + messagerie visible

### 🔴 LE BUG QUI CASSAIT LA PROMESSE COMMUNAUTAIRE — diagnostic complet
Blandine ne voyait pas la photo d'Ambre. Constat en base (requête lancée par Blandine) : **24 profils sur 33 ont `avatar_url` VIDE**, alors que ces cavalières ont bien un avatar visible sur leur propre téléphone. Deux causes distinctes trouvées, les deux corrigées :

1. **Import de photo qui échouait SILENCIEUSEMENT** (le plus grave). Un écran de profil appelait `syncProfilDistant({ avatar: ... })` — le champ envoyé s'appelait `avatar` alors que **la colonne est `avatar_url`**. Postgres refusait, et l'erreur était **avalée par un `catch (e) { }` vide**. La photo ne quittait jamais le téléphone. Bonus : ça envoyait l'image en **base64 complet** dans une colonne texte au lieu de passer par l'upload — vu le quota Supabase sous surveillance (restriction au 14 août), heureusement que ça ne marchait pas. → Remplacé par `hypeEnregistrerPhoto("avatar", ...)` qui fait un vrai upload dans le bucket puis écrit `avatar_url`, **et remonte l'échec à l'écran** au lieu de l'avaler.
2. **Avatars gagnés / choisis dans la galerie** (diplôme de Galop, avatars débloqués) : seulement `setProfil({avatar})`, donc **local uniquement**. → Nouveau helper `hypeSyncAvatarChoisi()` qui écrit la référence en base (forme `@clé`, déjà résolue par `avSrc()` à l'affichage, donc aucun upload nécessaire).
3. Au passage : **3 points d'entrée** de visite de profil (liste d'amis, page club, page écurie) passaient `p.avatar_url` **brut** sans le résoudre via `avSrc()` — un avatar en `@raccourci` n'était donc jamais affiché. Corrigé.

⚠️ **CES CORRECTIFS NE RÉPARENT QUE L'AVENIR.** Les 24 profils déjà vides le resteront : la valeur n'a jamais atteint le serveur, **il n'y a rien à rattraper en SQL**. Chaque cavalier doit remettre sa photo.

### Plan retenu par Blandine pour l'existant (les deux, en parallèle)
- **Encart in-app** (codé) : nouveau composant `EncartPhotoInvisible` sur la page profil. S'affiche **uniquement si `avatar_url` est vide EN BASE** (vérification serveur réelle, pas locale), palette turquoise, texte : « Ta photo reste invisible » + « Ta photo de profil n'est visible que sur ton téléphone : les autres cavaliers voient une silhouette. Remets-la pour qu'ils te reconnaissent. » + bouton « Remettre ma photo ». **Fermable** (mémorisé dans `hype_encart_photo_ferme`). 6 langues.
- **Messages manuels** (à faire par Blandine, APRÈS mise en ligne du correctif — sinon leur nouvelle photo échouera encore). Requête pour la liste : `select id, pseudo, ecurie from profiles where avatar_url is null or avatar_url = '' order by pseudo;` — brouillon de message fourni dans la conversation. Sert aussi à faire découvrir la messagerie.
- **Note** : la liste mélange ceux qui *croient* avoir une photo (victimes du bug) et ceux qui n'en ont jamais mis — impossible de les distinguer côté serveur.
- **Profils en doublon** (deux « Blandine », deux « Liam ») : **normal**, comptes de test créés au début avec des mails différents. Ne pas y toucher.

### Messagerie rendue visible (choix B2 + B3 validé sur maquette)
Elle n'était accessible que par une petite icône du hero — donc invisible.
- **B2** : pastille rouge du nombre de messages non lus sur l'icône du hero.
- **B3** : nouvelle **grande carte « Mes messages »** dans Mon monde (juste après Communauté équestre), même format que les autres encarts, avec le compteur de non lus ou le chevron.
- Nouveau helper `hypeTotalNonLus()` qui **réutilise `listerMesConversations`** (le calcul de `nonLus` par conversation existait déjà) : **aucun SQL, aucune table ajoutée**. Rafraîchi toutes les 45 s pour ne pas marteler la base.

### Mise en page
- **Page club/écurie descendue** : `.ecv .scroll` reçoit `padding-top: calc(env(safe-area-inset-top) + 12vh)` (aligné sur les 16vh de la page cavalier) et le hero passe de 46vh à 40vh pour compenser. Le haut des photos n'est plus coupé (mesuré : 101px de décalage au rendu).
- **Mon Évolution** : +16px d'espace entre « Des bases à l'excellence » et la phrase magique, avec cheval et courbe **remontés du même delta** (hero 540, img −85, traj 290). ⚠️ Ces trois valeurs bougent TOUJOURS ensemble.

### 🔧 Carrousel des chevaux : défilement réparé
Le défilement automatique ne fonctionnait pas sur iPhone. **Cause : `el.scrollLeft += 0.5`** — iOS Safari arrondit `scrollLeft` à l'entier, donc un pas de 0,5 était arrondi à **0** et le rail ne bougeait jamais (ça marchait sur les navigateurs de bureau qui acceptent les décimales, d'où le fait que ça n'ait pas été vu). Vérifié avec Blandine que « Réduire les animations » était bien **désactivé** sur son iPhone — ce n'était donc pas un réglage d'accessibilité. → Corrigé : la position est accumulée dans une variable décimale `posF` puis **assignée**.

✅ Vérifié : 850 → 851 fonctions (uniquement `EncartPhotoInvisible`, rien perdu), 334 const inchangés, 14/14 scripts, **rendu Playwright réel sur accueil / profil / écurie** — carte « Mes messages » présente, décalage écurie mesuré à 101px, **zéro erreur JS**. Un bug a d'ailleurs été attrapé par ce test (`nonLusMsg is not defined` : l'état avait glissé dans `EcranMonde` au lieu d'`EcranUnivers`, car `EcranUnivers` utilise `var` et non `const [`) et corrigé avant livraison.

### ⏸️ EN ATTENTE
- **Vitesse du tracé animé** : la demande d'accélération n'a **pas** été appliquée. Le système a été refondu entre-temps sur une autre branche (deux vitesses désormais : `VITESSE_VOIX = 62` et `VITESSE_MUET = 92`), l'ancien `VITESSE_BASE_PX_S` n'existe plus. À reprendre en décidant des nouvelles valeurs plutôt qu'en forçant l'ancien patch.
- **Allure héritée dans les figures** (le galop repassait en bleu dans un cercle, car `vitesseDepuisTexte` renvoie 1 = trot par défaut quand le segment n'a pas de mot d'allure) : diagnostiqué, **pas encore codé**.
- **Nouvelle présentation des Galops** (la une photo + rail défilant, titre « Chaque Galop a son univers ») : maquettes validées, **pas encore codée**.
- **Tableau de résultats sur le profil** : Blandine a dit « on en reparle », rien à coder sans nouvelle décision.
- **Quota Supabase** : restriction au 14/08 si dépassement maintenu. À surveiller, d'autant qu'une vingtaine de cavaliers vont bientôt uploader leur photo.

**⚠️ Pour la suite, repartir de CETTE version.**

## 27/07/2026 (suite) — Titre au-dessus des dépliants + réinjection de 2 correctifs

⚠️ **Le fichier renvoyé par Blandine pour cette session datait d'avant mes 2 derniers correctifs** (repéré par diff : `galopsVus`/`marquerGalopVu` absents, espacement Mon Évolution encore à l'ancienne valeur). Les deux ont donc été **réinjectés à l'identique** avant d'ajouter le reste — rien d'autre n'a été écrasé (aucune fonction perdue, 313 const inchangés).

### Nouveau titre au-dessus de la liste des dépliants
- **« Découvre le contenu de chaque Galop »** en 6 langues, placé juste avant la liste (donc sous les cartes Crystal / Reprises / Chemin des poneys).
- Style **option C** validée sur maquette (`maquette-titre-liste-galops.html`, 4 options proposées) : réutilise la classe `.mevo-invit` (italique Cormorant argenté + reflet qui balaie) avec deux étoiles turquoise scintillantes, **mais en beaucoup plus grand : 23px** au lieu de 16,5px (demande explicite de Blandine). Le contraste de taille évite le doublon visuel avec la phrase magique du haut de page.

### Rappels des 2 correctifs réinjectés
- Ruban « Nouveau » qui disparaît une fois le Galop consulté (`hype_galops_vus` en localStorage, prop `estNouveau`).
- Espacement Mon Évolution : `.mevo-invit` marge 34px au-dessus / 2px en dessous, cheval et courbe remontés du même delta (`.mevo-hero` 556px, `.mevo-hero-img` −69px, `.mevo-traj` 306px). **Ne jamais bouger l'une de ces trois valeurs sans les deux autres.**

✅ Vérifié : 14/14 scripts, rendu Playwright réel (titre présent, mesuré à 23px vs 16,5px pour la phrase du haut, zéro erreur JS), aucune fonction perdue.

**⚠️ Pour la suite, repartir de CETTE version.**

## 🔴 À FAIRE

### Maquette V6 du tracé animé — EN ATTENTE DE VALIDATION VISUELLE DE BLANDINE
Fichier `maquette-trace-V6.html` (autonome, 279 Ko). Remplace la V5.
- **Le cheval est la PHOTO de Blandine**, plus un dessin. Traitement fait par calcul : recadrage serré (exclut l'ellipse décorative et les paillettes), suppression du fond et du halo blanc résiduel (alpha < 40 ou luminance > 200), **éclaircissement par courbe douce** (`0,14 + 0,86·v^0,62`) car un cheval noir disparaît sur l'anthracite — luminance moyenne 50 → 108, réduction à 54×240 px, **25,7 Ko** en PNG optimisé. Affiché en `<image>` SVG, pivoté dans le sens de la marche, 57 px de long sur iPhone 14 comme sur SE.
- 🔴 **Pour la production il faudra pousser `cheval-dessus.png` dans `images/`** (fichier livré). Dans la maquette il est en base64 pour qu'elle reste autonome.
- **Plus aucune couleur d'allure sur le cheval** (demande de Blandine : « pourquoi il est vert ? »). C'était le code des allures appliqué à son liseré — vert au pas — et sur une silhouette de 11 px le halo vert écrasait la forme. Halo désormais neutre et discret. La couleur d'allure reste sur le tracé, là où elle est utile.
- Le reste est identique à la V5 : son/musique/décor en pastilles dans l'en-tête, vitesse à 78 px/s, bulles = erreurs à éviter filtrées par niveau, 3 décors + fond classique, aucun scroll, aucun décalage vertical.
- Historique : mon décalque vectoriel (55 tranches relevées sur la photo, `_cheval.js`) reste disponible si la photo pose problème, et la page `comparaison-cheval.html` (4 tailles × 5 traitements) sert de référence pour arbitrer.

### 🔴 Modes de reprise à créer (demandés par Blandine, spécification à compléter)
- [ ] **Tracer au doigt pour apprendre** (nommé « défi Time » dans nos échanges) : la carrière est vide, le cavalier trace sa reprise au doigt, l'app compare au tracé officiel. **Rien n'existe dans le code.** Questions ouvertes : tracé libre noté à la fin, ou guidé figure par figure ? Modèle en filigrane (apprentissage) ou carrière nue (test) ? Ma proposition : les deux, guidé avec filigrane puis libre sans modèle, avec score.
- [ ] **`ReprisePlanJeu` (« Le Plan de Reprise ») existe déjà** mais ce n'est PAS un tracé libre : le cavalier empile des figures dans une liste et le jeu vérifie la cohérence (commencer par l'entrée, finir par l'arrêt/la sortie). À ne pas confondre avec le mode ci-dessus.
- [ ] Mention trouvée dans la bibliothèque de conseils : « En mode Tracé/Challenge : afficher les conseils seulement après validation. » C'est la seule spécification écrite reçue à ce jour sur ces modes.

### Maquette V5 (remplacée par la V6, historique)
Fichier `maquette-trace-V5.html` (autonome, 244 Ko, aucun script distant, aucune image). Remplace la V4.
- **Cheval : silhouette DÉCALQUÉE**, pas dessinée. Blandine a fourni une photo de cheval vu du dessus ; le contour a été relevé **par calcul** (55 tranches horizontales, seuil de luminance 120, lissage sur 3 tranches, normalisation sur 23 unités de viewBox) puis converti en path SVG de 110 points (`_cheval.js`). Ma silhouette précédente, dessinée à la main en une seule forme fermée, ressemblait à une souris — constat de Blandine, exact. Rapport largeur/longueur réel : 0,22.
- Le corps reste **sombre** (dégradé de robe) comme un vrai cheval vu du dessus ; c'est le **liseré** et le halo qui portent la couleur de l'allure. Un cheval rempli en vert ou rouge devenait illisible.
- **Son et musique remontés en pastilles dans l'en-tête** (🔇 / 🎶 / 🌄), avec le sélecteur de décor. Ils avaient disparu de la V4 quand j'ai reconstruit la barre du bas pour tenir sans scroll.
- **Vitesse de lecture : 105 → 78 px/s** (Blandine trouvait x1 un peu rapide). x2 redonne l'ancien rythme. Reprise du G4 : ~96 s au lieu de ~72 s.
- **Bulles = erreurs à éviter uniquement**, tirées de la fiche de la figure, **filtrées par le niveau du cavalier**, en minuscules 11,5 px, 3,2 s. Si aucune erreur assez courte n'est disponible au niveau du cavalier → **rien ne s'affiche**. Les micro-consignes génériques de la V4 sont abandonnées : Blandine a constaté qu'un coup sur deux elles ne correspondaient ni au niveau ni à la directive de la figure — diagnostic juste, elles étaient une par figure sans filtre de niveau.
- **3 décors + fond classique**, peints en dégradés CSS (`spectral`, `fontainebleau`, `monaco`, `classique`) : **zéro image, zéro octet à charger, aucune question de droits**. Carrière posée sur un voile de verre fumé (radial 62 % → 10 % + flou 2 px) ; la plaque de sol passe de 1 à 0,62 d'opacité en mode décor pour laisser respirer le paysage. Dernier décor mémorisé (`localStorage hype_trace_decor`, dans un try/catch). La structure accepte une vraie photo sous licence à la place d'un dégradé, sans rien changer d'autre.
- ✅ Mesuré sur **390×844 et 375×667** : aucun scroll, haut du SVG à 169 px dans les deux cas, cheval 44-46 px de long, bascule des 4 décors vérifiée, bulle bien en minuscules 11,5 px, aucune erreur JS.
- ⚠️ Toujours pas de jugement à l'œil de ma part (afficheur d'images muet sur cette session) : les chiffres sont vérifiés, l'esthétique est à valider par Blandine.
- [ ] **Décisions attendues** : silhouette du cheval, les 3 décors (garder les dégradés ou passer à de vraies images), cadence et ton des bulles, nouvelle vitesse.

### Maquette V4 (remplacée par la V5, historique) — EN ATTENTE DE VALIDATION VISUELLE
Fichier `maquette-trace-V4.html` (autonome, aucun script distant, moteur et bibliothèque de production copiés tels quels). **Rien n'est intégré à l'index tant que Blandine n'a pas validé visuellement** (consigne explicite de son brief).
- Carrière Hype Spectral : dégradé de sol, grain très léger (5 %), vignettage, halo turquoise flouté autour du rectangle, double liseré, ligne d'axe pointillée, 2 nappes lumineuses. Belle à l'arrêt, sans animation.
- Cheval : **taille constante en pixels** quel que soit l'écran (échelle inverse de la hauteur de carrière) — 47 px de long sur iPhone 14 **et** sur iPhone SE, contre 27 et 25 px avant. Liseré turquoise, ombre douce décalée, crin sombre, orientation lissée à 22 %/frame.
- Lettres : hiérarchie A/C/X (axe) vs lettres de piste ; allumage turquoise + halo au passage ; **pré-éclairage discret de la première lettre de la figure suivante** quand il reste moins de 90 unités.
- Tracé : tronçons monochromes par allure, extrémité active plus épaisse + halo, parcours entier conservé en turquoise à 34 %.
- Bulle de micro-coaching : **dans la carrière**, jamais reliée au cheval, placement automatique parmi 6 ancres (score = distance au cheval ×1,4 + distance au tracé à venir), 13,5 px en capitales, fond noir 90 % + flou, 2,6 s d'affichage, une seule à la fois, temps de respiration de 4,2 s entre deux.
- Bandeau compact : FIGURE ACTUELLE + libellé + « Objectif : » (1er observable) + ENSUITE (figure suivante). Progression : familles avec ✓ sur les passées, turquoise sur l'actuelle, grises ensuite.
- ✅ Mesuré sur **390×844 et 375×667** : aucun scroll, aucun décalage vertical du rectangle à l'apparition de la bulle (haut du SVG à 169 px dans les deux cas, avant comme après), bulle jamais superposée au cheval (contrôlé sur 4 apparitions d'une reprise complète), aucune erreur JS.
- ⚠️ Je n'ai pas pu juger le rendu **à l'œil** de mon côté (mon afficheur d'images est resté muet sur cette session) : les chiffres ci-dessus sont vérifiés, l'esthétique est à ton jugement.
- [ ] **Décisions attendues** : taille du cheval (40 px visés), cadence des bulles (4,2 s), et si la bulle peut chevaucher le tracé au centre sur petit écran (196 px de large dans une carrière de 366 px).

### Bibliothèque v1.5 — micro-conseils
- [x] **`micro` ajouté sur les 75 fiches** : une consigne de 2 à 5 mots par figure, pour l'affichage pendant l'animation (« Garde ton diamètre », « Prépare le pli », « Termine ta ligne droite »). Les conseils longs restent disponibles pour une fiche détaillée après la reprise. Contrôle par assertion : aucune fiche sans micro, aucun micro orphelin, 7 mots maximum.
- [ ] Traduire les `micro` en en/es/it/de/ja (non fait, retombe sur le français).

### Tracé animé / bibliothèque de dressage (session 8)
- [ ] **Pousser `hype-dressage-conseils.js`** en même temps que l'index (sinon : pas de cartes).
- [x] **Rattacher les 84 figures restantes** — FAIT le 27/07 (bibliothèque **v1.2**) : g5 (20), g6 (20), g7 (22), Club Elite (22). **Les 114 figures des 6 reprises sont désormais rattachées, aucun trou.** Seul le `.js` change, l'`index.html` livré plus haut n'a pas besoin d'être retouché.
- [x] **`circle_12m` créée** (texte de Blandine, mot pour mot) — bibliothèque **v1.3**.
- [x] **Rattachements approximatifs supprimés** : plus une seule figure rattachée par défaut. Nouvelle consigne de Blandine appliquée — dès qu'une figure est réellement différente, on crée sa fiche.
- [ ] **Relire les 7 fiches rédigées par Claude** (champ `source: "Claude"` sur chacune, celles de Blandine portent `source: "Blandine"` ou aucun champ) : `curved_line_x`, `half_circle_20m`, `half_circle_10m`, `release_contact`, `change_diagonal`, `stirrups_out_in`, `lengthen_few_strides`.
- [ ] **Traduire la bibliothèque** en en/es/it/de/ja — **en cours, par lots de fiches**. Fait : **lot 1 (8 fiches)** = `entry_centerline`, `halt_at_x`, `salute`, `final_halt`, `walk_working`, `walk_medium`, `walk_free`, `walk_extended` (v1.4). Reste **67 fiches sur 75**. Chaque lot est contrôlé par assertion à la génération : autant de traductions que de chaînes françaises, sinon le fichier n'est pas produit. Une fiche non traduite retombe simplement sur le français via `tr()`, donc livrer par lots ne casse rien.
- [ ] **Relire les `prio`** (déduites de l'ordre du document) et les `relatedFigures` (proposés automatiquement).
- [ ] **Graduer les conseils à l'intérieur d'une fiche** : aujourd'hui un Galop 4 et un Amateur voient la même chose sur la plupart des figures, le filtre ne sait qu'écarter les figures trop avancées.
- [ ] Remplir les champs réservés `video` / `illustration` / `courseId` quand les contenus existeront.

- [ ] **Images Wikimedia des 4 articles — rapatriement en local validé** (Blandine, 27/07, décision valable pour toute la série "grandes écoles") : Cadre Noir (16 photos), École Portugaise (9 photos), École Espagnole de Vienne (8 photos), École Royale Andalouse (6 photos) sont toutes chargées depuis `commons.wikimedia.org` en externe — à télécharger/encoder en `hype-images-NNN.js`, puis remplacer les URLs `WIKI(...)` de chaque composant par les clés `HYPE_IMGS` correspondantes. Toutes vérifiées existantes et sous licence Creative Commons.
- [x] **Roadmap "Les grandes écoles" — TERMINÉE** : les 4 écoles (Cadre Noir gratuit + École Portugaise/Vienne/Jerez Premium) sont livrées. Plus aucun stub "Bientôt sur Hype" dans l'app.
- [ ] **Album participatif — décisions tranchées, à coder** : Blandine a validé le 27/07 : **sans modération** + **limite de 5 photos/vidéos par personne**. SQL + upload à coder — un album par école (Cadre Noir, École Portugaise, École Espagnole de Vienne, École Royale Andalouse), mêmes règles partout.
- [ ] **Cartes "Voix contemporaines"** (Carde/Henriquet/Karl) dans l'article Cadre Noir : affichées en "Bientôt : son article →", pas encore de fiche/article dédié à brancher derrière.
- [ ] **Si le blocage scroll Android revient** : redemander d'abord un redémarrage complet de l'appli (fermeture depuis le multitâche, pas juste retour en arrière) avant toute autre investigation — c'est ce qui a résolu le cas de Gabrielle.
- [ ] **Coller le bloc SQL des 4 annonces en 6 langues** — après déploiement (rappel des sessions précédentes).
- [ ] **Localiser et appliquer l'image d'accueil Baby et l'image du puzzle**.
- [ ] **~49 images encore en réserve** — décider de leur usage.
- [ ] **Fiche Elea** à créer dans la Bible visuelle.
- [ ] **GRAND QUIZZ transversal** (Bronze+Argent+Or) : pas commencé.
- [ ] **Animation de fin de Poney** : en attente du choix de Blandine.
- [ ] **Bouton "Vidéos"** : toujours retiré, à replacer.
- [ ] **QCM général** : toast "prochainement" uniquement.
- [ ] **Album écurie non-cliquable** : à réactiver une fois prêt.
- [ ] Analyse vidéo Premium (Hey Baby), offre abonnement AI Stripe, post fantôme Supabase, pastilles Hey Baby, carte partage Instagram, traduction G2, fiche mémo GitHub/Supabase.

## 🟢 FAIT RÉCEMMENT

- [x] **Reconstruction complète de "L'École Portugaise d'Art Équestre"** — Blandine a jugé le premier jet (livré plus tôt dans la journée) mauvais ("tout" à revoir, sans détail précis) en le comparant à l'École Royale Andalouse ("bien"). Plutôt que de rafistoler, **remplacement intégral de la fonction `EcranEcolePortugaise`** en la reconstruisant sur le squelette exact de `EcranEcoleJerez` (dernier article livré, validé par Blandine) : même discipline de code, mêmes helpers, même CSS partagée, mêmes patterns de fermeture de parenthèses (2 bugs de parenthèses trouvés et corrigés pendant la reconstruction, comme sur les articles précédents). **Contenu factuel conservé à l'identique** (déjà vérifié lors de la première version, aucune nouvelle recherche nécessaire) : Picaria Real (XVIIIᵉ s., D. João V), Coudelaria de Alter (1748), fondation 1979 par des élèves de Nuno Oliveira, installation à Queluz (1996), Picadeiro Henrique Calado à Belém (2015), UNESCO décembre 2024 (art équestre au Portugal dans son ensemble, pas l'École isolément), hiérarchie Aspirant→Picador-Ajudante→Picador→Mestre-Picador-Chefe. Mêmes 9 photos Wikimedia + 2 vidéos déjà vérifiées, réutilisées à l'identique. Les 3 liens croisés (Cadre Noir, Vienne, Jerez) sont tous réels dans "Continuer l'exploration" — aucun stub.
- [x] **Fusion avec le travail d'une autre conversation en parallèle** : le fichier reçu contenait une refonte importante de la page "Mon Évolution"/courbe des Galops faite ailleurs (nouveau composant `GalopDepliant` + `langueDepliant`, cartes dépliantes avec étoiles de score, changement de `obtenirCoursParGalop`). **Rien de ce travail n'a été touché** — vérifié par diff exhaustif : les 13 hunks de modification sont tous confinés strictement à la fonction `EcranEcolePortugaise`, zéro fuite ailleurs. Fonctions/const top-level identiques au fichier reçu (même liste, `GalopDepliant`/`langueDepliant` bien présents), `allerVersGalop` intact.

- [x] **🎉 Nouvel article "L'École Royale Andalouse" — DERNIER des 4 grandes écoles, série complète.** (`EcranEcoleJerez`, ~395 lignes, même modèle, Premium dès la construction). Comme pour Vienne, Blandine n'a fourni que le plan de sections — recherche factuelle complète faite par Claude : fondation mai 1973 (Álvaro Domecq Romero présente « Cómo bailan los caballos andaluces » devant le futur roi Juan Carlos Ier en recevant le « Caballo de Oro »), rachat du palais du Recreo de las Cadenas par le ministère du Tourisme en 1976, École rachetée par son patronat en 1983 (Domecq nommé directeur technique), titre « Real » accordé par le roi Juan Carlos Ier en juin 1987 (parrainage royal, pas de distinction UNESCO propre à cette école contrairement aux 3 autres — vérifié, non fabriqué), Domecq revenu comme directeur honorifique en 2019, manège principal rebaptisé « Picadero Álvaro Domecq » en 2021, 50 ans de l'École en 2023. **Point de vigilance traité avec soin** : le fondateur Álvaro Domecq Romero est décédé le 18 novembre 2025 (fait vérifié par recherche web, récent) — mentionné avec respect et sobriété (dates de naissance/mort, sans citation inventée). Contenu : hero, carte d'identité, histoire + documentaire vidéo, timeline, galerie (4 photos du palais/école), le cheval (Pure Race Espagnole/Cartujano — avec l'histoire des moines chartreux cachant les chevaux pendant l'invasion napoléonienne de 1810), formation des cavaliers (6 élèves/an seulement, 16-24 ans, doma vaquera + doma clásica), philosophie (Casta/Élégance/Tradition/Complicité — adaptée à l'identité espagnole plutôt que redite des 3 autres écoles), spectacle "Cómo bailan los caballos andaluces" (90 min, ~150 000 visiteurs/an), savais-tu (**fait unificateur** : le cheval espagnol est l'ancêtre direct du Lipizzan ET du Lusitanien — relie les 4 articles entre eux), visiter + Marquer ma visite, sites officiels (realescuela.org), citation + regard de Hype, partager, album participatif, sélecteur de langue. Sources : **6 photos Wikimedia Commons + 2 vidéos YouTube officielles (chaîne FREAAE), toutes vérifiées individuellement**.
- [x] **Tous les liens croisés mis à jour — plus AUCUN stub "Bientôt sur Hype" dans toute l'app.** Les 3 stubs Jerez (dans Cadre Noir, École Portugaise, École Vienne) sont devenus des liens réels. La section "Les grandes écoles" dans Le Mag affiche désormais **les 4 grandes cartes cliquables** (Cadre Noir gratuit + École Portugaise/Vienne/Jerez Premium) — la rangée de stubs a été entièrement retirée, elle ne servait plus à rien.
- [x] **Petite retouche accueil** : espacement entre la carte "Théorie des Galops" et la carte "Culture équestre" réduit pour matcher celui entre "Coach virtuel" et "Théorie des Galops" — une marge CSS fixe de 24px qui traînait sur `.uv3 .culture` en plus du style inline a été neutralisée (source du grand vide signalé par Blandine).

- [x] **Nouvel article "L'École Espagnole de Vienne"** — 3ᵉ article de la série "Les grandes écoles" (`EcranEcoleVienne`, ~430 lignes, même modèle que les 2 précédents, **Premium dès la construction** cette fois, pas ajouté après-coup). Cette fois, Blandine n'a fourni qu'un plan de sections (pas de dossier éditorial rempli) — recherche factuelle complète faite par Claude : fondation officielle 1565 (première pierre de la Stallburg), élevage andalou dès 1562, haras impérial de Lipica fondé 1580, Winterreitschule construite 1729-1735 par Fischer von Erlach sous Charles VI, transfert du haras à Piber en 1920 (après la Première Guerre mondiale, Lipica restant en Italie), Opération Cowboy 1945, société de droit public 2001, UNESCO 2015 (450ᵉ anniversaire — bien la liste internationale, distincte de la reconnaissance nationale autrichienne de 2010), femmes admises dès 2008. Contenu : hero, carte d'identité, histoire + documentaire vidéo, timeline, galerie (5 photos Hofburg/Stallburg/écuries), le cheval Lipizzan (né noir, blanchit entre 6 et 10 ans), les 6 lignées fondatrices (Pluto/Conversano/Neapolitano/Favory/Maestoso/Siglavy avec origines exactes), le haras de Piber, formation chevaux + cavaliers fusionnée (parcours Eleve→Bereiter-Anwärter→Bereiter→Oberbereiter, 8 à 12 ans), philosophie (patience/harmonie/légèreté/respect), spectacles + costumes (Schulquadrille, tenue quotidienne vs tenue de gala), savais-tu (sauts d'école sans étriers ni rênes), visiter + Marquer ma visite, 3 vidéos officielles/presse, sites officiels (srs.at + UNESCO), citation + regard de Hype, partager, album participatif, sélecteur de langue. Sources : **8 photos Wikimedia Commons + 3 vidéos YouTube, toutes vérifiées individuellement** (dont 2 reportages KURIER 2023-2024 et les impressions du 450ᵉ anniversaire).
- [x] **Liens croisés mis à jour** : les 2 stubs "École Espagnole de Vienne · Bientôt sur Hype" (dans l'article Cadre Noir et dans l'article École Portugaise) sont devenus des liens réels. La section "Les grandes écoles" dans Le Mag affiche désormais **3 grandes cartes cliquables** (Cadre Noir gratuit + École Portugaise Premium + École Espagnole de Vienne Premium) + Jerez seul en Prochainement.

- [x] **Article "École Portugaise d'Art Équestre" passé en Premium** (demandé par Blandine le 27/07 : "les autres articles" grandes écoles, hors Cadre Noir qui reste gratuit). Double protection : (1) `EcranEcolePortugaise` vérifie `premium` en tout début de fonction et affiche un écran teaser (hero flouté, cadenas, résumé, bouton "Découvrir Premium") si le cavalier n'est pas abonné — protège même un accès direct par lien/hash ; (2) la carte de l'article dans Le Mag affiche désormais un badge 🔒 Premium et redirige directement vers l'écran d'abonnement au clic si non-premium (photo légèrement grisée). Le Cadre Noir n'est pas touché, reste en accès libre. **Point pour Blandine** : pour prévisualiser l'article complet sans être abonnée, utiliser le bouton "Mode Premium (admin)" (visible pour les modérateurs) ou vérifier que le compte de test a bien `premium: true`.

- [x] **Nouvel article "L'École Portugaise d'Art Équestre"** — 2ᵉ article de la série "Les grandes écoles", même modèle que le Cadre Noir (écran dédié `EcranEcolePortugaise`, ~400 lignes, CSS `.cnx-` réutilisé). Dossier éditorial de 23 sections fourni par Blandine, réduit à l'essentiel sans perdre l'information clé : Hero, carte d'identité (Portugal/Queluz/1979/UNESCO 2024), documentaire + galerie (2 vidéos réelles YouTube dont la Gala 45 ans/sept. 2024, 9 photos Wikimedia Commons toutes vérifiées une par une), histoire + timeline (Picaria Real XVIIIᵉ → 1748 Coudelaria de Alter → 1979 fondation → 1996 Queluz → 2015 Picadeiro Henrique Calado → 2024 UNESCO), 4 principes de philosophie (harmonie/équilibre/légèreté/respect), le cheval Alter Real, cavaliers (hiérarchie Aspirant→Picador-Ajudante→Picador→Mestre-Picador-Chefe), costumes + galas fusionnés en un seul bloc, "Le savais-tu ?", visiter (Picadeiro Henrique Calado, Belém), sites officiels (parquesdesintra.pt, UNESCO), citation + regard de Hype, "Marquer ma visite" (même pattern que Cadre Noir, table `visites_articles` déjà prête à réutiliser), partager, album participatif en Prochainement, sélecteur de langue standard (`SelecteurLangue`). "Continuer l'exploration" pointe vers le Cadre Noir (lien réel) + Vienne/Jerez (Prochainement).
- [x] **Liens croisés mis à jour** : la section "Continuer l'exploration" de l'article Cadre Noir pointe maintenant vers l'École Portugaise (lien réel au lieu d'un stub "Bientôt"). La section "Les grandes écoles" dans Le Mag (`EcranArticles`) affiche désormais 2 grandes cartes cliquables (Cadre Noir + École Portugaise) + Vienne/Jerez en Prochainement (au lieu d'1 carte + 3 stubs).
- [x] **Point de vigilance respecté** : contrairement au Cadre Noir, les photos/vidéos ne sont pas autorisées pendant les présentations publiques au Picadeiro (règle du site officiel) — la galerie est donc orientée bâtiment/chevaux/portraits plutôt qu'action de piste, conformément à la consigne de prudence sur les crédits donnée par Blandine dans le dossier source.
- [x] **`visites_articles.sql` exécuté dans Supabase** par Blandine le 27/07 — table + policies créées avec succès. Le compteur "Marquer ma visite" est fonctionnel.
- [x] **Article Cadre Noir — sélecteur de langue** : corrigé pour utiliser le composant standard `SelecteurLangue` (compact) — un seul drapeau en haut à droite qui ouvre un menu déroulant, exactement comme sur toutes les autres pages de l'app. (Première version avec 6 drapeaux côte à côte remplacée à la demande de Blandine, pas cohérente avec le reste.)
- [x] **Article Cadre Noir — carrousel des 3 écoles restantes** (retrait des 5 cartes stub redondantes de "Continuer l'exploration").
- [x] **Article Cadre Noir — encart "Marquer ma visite"** (compteur permanent, version simple). SQL livré, pas encore exécuté.
- [x] **Article Cadre Noir — encart "Partager cet article"** (Web Share API + repli copier-lien).
- [x] **Article premium "Le Cadre Noir de Saumur"** intégré (session précédente) — écran dédié, 6 langues, 2 galeries photo, 4 vidéos, timeline, philosophie, bibliothèque, bonus Hype pratique.
- [x] **Bug scroll Android résolu** : état figé côté appareil, pas un bug de code. Confirmé stable après redémarrage complet de l'appli.
- [x] Correctif nom d'écurie (`monClubEc`) — toujours actif.
- [x] Historique complet des sessions précédentes (voir plus bas).

---

## 💡 Idées notées (pas encore validées)

- **Article Cadre Noir — check-in "live"** : en plus du compteur permanent (fait), une version temps réel "3 cavaliers Hype sont ici maintenant" avec avatars empilés, expiration auto ~8h ou bouton "Je suis parti". Mis de côté au profit de la version simple. Point de vigilance si repris un jour : éviter d'afficher des prénoms/photos réelles en direct (public mineur inclus parmi les cavaliers Hype) — préférer compteur + avatars génériques anonymisés.
- Rétrospective annuelle "Ton année avec [cheval]" façon Spotify Wrapped
- Carte anniversaire du cheval automatique
- Question du jour avec série/streak (flamme cristal)
- Révision intelligente Premium (répétition espacée)
- Concours photo du mois avec vote du club
- Filtre Fond Studio Premium (détourage auto + teintes de fond)
- Page "Nos Ambassadeurs"
- GRAND QUIZZ transversal Bronze/Argent/Or, mode entraînement libre permanent

---

## 📝 Historique

| Date | Page/session | Résumé |
|------|--------------|--------|
| 17/07 → 26/07 | Claude | "Mon Évolution", Poney d'Or (9/9), écran "Quoi de neuf", réorganisation accueil, bugfixes session/scroll, parrainage. |
| Session suivante | Claude (Directeur Technique) | Correctif nom d'écurie (`monClubEc`) au lieu du texte en dur "Écurie Feinn". |
| Session suivante | Claude (Directeur Technique) | **Bug scroll Android** résolu via outil de debug intégré révélant un état figé côté appareil (pas un bug de code). |
| 27/07 | Claude (page "Articles 4 écoles") | **Article premium "Le Cadre Noir de Saumur"** — maquette validée v1→v6 puis intégration complète dans index.html (écran dédié, 6 langues). |
| 27/07 (2) | Autre page | Accueil : carte Communauté équestre remise dans Mon monde, section Découvrir réordonnée, carte Culture équestre remontée dans Actualité. Article Cadre Noir : philosophie dépliée en permanence, bonus Hype passé en carrousel, album participatif remonté avant "Visiter". |
| 27/07 (3) | Claude (page "Articles 4 écoles") | **Article Cadre Noir** : carrousel des 3 écoles restantes (retrait des 5 cartes stub), encart "Marquer ma visite" (compteur permanent + SQL), encart "Partager cet article". |
