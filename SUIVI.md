PASSATION — HYPE (PWA équestre) · état au 16/09/2026, 21 h 30

Ce document remplace la passation du 15/09 et consolide les 27 livraisons
du 15-16/09 (builds 191 → 217). Les entrées détaillées build par build ont
été fondues ici : ce qui compte, c'est ce qui est vrai maintenant et ce qui
ne doit pas être refait.

────────────────────────────────────────────────────────────
1. LE PROJET ET LA PERSONNE
────────────────────────────────────────────────────────────
Blandine (feinn@live.fr), monitrice d'équitation, fondatrice de l'Écurie
Feinn (Itteville, Essonne, 20 membres réels). Elle COACHE AUSSI L'ÉQUIPE de
la Société d'Équitation de Paris (SEP) et est rattachée aux deux écuries.

Elle développe SEULE Hype, une PWA équestre, ENTIÈREMENT DEPUIS SON IPHONE :
elle pousse sur GitHub, déploie sur Netlify et passe le SQL sur Supabase
elle-même. Elle n'est pas développeuse.

Architecture : un seul fichier index.html, React monolithique, ~64 700
lignes, 7,5 Mo, 18 blocs <script> inline. Supabase Pro + RLS. Netlify.
Fichiers séparés : hype-images-*.js (119 fichiers), hype-cours-*.js,
hype-video.js, hype-stories.js, netlify/functions/stripe-webhook.js,
et depuis le 16/09 images/FOND_HEYBABY.webp.

INDEX EN LIGNE CHEZ ELLE : 20260908-295, POUSSÉ le 20/09 au soir et testé
en partie (voir §70).
DERNIER LIVRÉ : 20260908-301 (§75). Lignée : … → 295 (§67) → 296 (§70) →
297 (§71) → 298 (§72) → 299 (§73) → 300 (§74) → 301 (§75).
🟥 296 À 301 SONT DANS LE MÊME FICHIER, NON ENCORE POUSSÉS NI TESTÉS.
✅ 293 CONFIRMÉ EN LIGNE le 20/09 : elle a poussé l'index et testé les
notifications dessus toute la fin de journée.
✅ 291 CONFIRMÉ par sa capture de 15 h 31 : page conforme à la maquette, et
« Je serai prévenue » ALLUMÉ — son téléphone est bien abonné aux notifications.
✅ 284 CONFIRMÉ : « au top ça a marché » — le document du concours se génère
à partir de ses captures, horaires + ordre de passage sur une seule feuille.
✅ 282 CONFIRMÉ : en-tête correct (image, CONCOURS, titre, date, lieu) et menu
« ••• » qui s'ouvre sous le bouton.
✅ 281 CONFIRMÉ : « Ajouter à mon agenda » ouvre bien la feuille de partage
avec le fichier .ics (capture 07 h 56).
✅ 278 CONFIRMÉ PAR ELLE : l'en-tête s'affiche enfin (image, titre, date, lieu).
218 (onglets « Pour qui ? ») : EN LIGNE, vu sur sa capture de 21 h 35
(les onglets et le « + » s'affichent).
219 : EN LIGNE (vu sur son enregistrement de 21 h 54, « Moi » encore là).
INDEX LIVRÉS ENSUITE : 220 → 228 (§12 D, G, I, J, K, L). Chacun contient les
précédents. 223 EN LIGNE le 17/09. 224 à 228 NON POUSSÉS / NON CONFIRMÉS.
⚠️ Elle testait encore le 223 le 17/09 à 10 h 44 (petite croix grise = 223).
⚠️ 219 → 222 LIVRÉS SANS TEST INTERMÉDIAIRE : l'assistant a demandé le test
avant le 222, elle a répondu « ok vas-y ». Si panne : suspecter 219-222.
⚠️ Le 219 N'A PAS ÉTÉ TESTÉ avant le 220 (« ok continue ») : risque signalé.
Le numéro s'affiche en bas de l'accueil : « WHAT'S UP · REPRISE 1.8 ·
INDEX 20260908-217 · … ». TOUJOURS LE LUI DEMANDER avant d'analyser une
capture : elle a souvent un écran en cache plus ancien que le code livré.

────────────────────────────────────────────────────────────
2. RÈGLES DE TRAVAIL — NON NÉGOCIABLES
────────────────────────────────────────────────────────────
· 1 action → 1 modification atomique → test iPhone → validation → suite.
  Aucune refonte simultanée, aucun nettoyage opportuniste, rien hors
  périmètre.
· NE JAMAIS DÉCIDER POUR ELLE. Présenter les options et attendre « valide »
  / « vas-y » / « ok ». Un « Ok » seul VAUT accord : ne pas redemander.
· ⚠️ MAIS : quand elle répond « ok continue » sans avoir testé, LE DIRE.
  Le 16/09 elle a enchaîné cinq fois de suite sans tester ; résultat, une
  panne est restée invisible pendant trois livraisons. Elle a le dernier
  mot, l'assistant a le devoir de signaler le risque.
· NE JAMAIS RETIRER NI REBRANCHER SUR UNE INTERPRÉTATION. En cas de doute
  sur un retrait : DEMANDER.
· Signaler toutes les conséquences AVANT d'agir. Signaler toute erreur
  immédiatement, jamais de retour en arrière silencieux.
· À chaque livraison : dire QUELS fichiers pousser et OÙ, ne lister que le
  nouveau, signaler l'inchangé.
· SUIVI.md est écrit par l'assistant, jamais par elle. JAMAIS livré seul
  (ça fait buguer son appli) : toujours groupé avec index.html.
· Expliquer en langage simple. Pas de jargon. Dire ce que ça change pour
  elle et ce qu'elle a à faire.
· Diagnostic en base : UNE seule requête SELECT courte à la fois. Elle
  l'exécute, donne le résultat, on n'interprète que ce que ce résultat
  prouve. Abandonner toute hypothèse contredite.
· Pas de cartes à boutons : elle clique dessus par accident.
· Elle demande régulièrement un « prompt pour ChatGPT » : le fournir dans
  un bloc ```text autonome, sans référence à la conversation.
· LES MAQUETTES MARCHENT MIEUX QUE LES MOTS. Le 16/09, trois choix bloqués
  pendant des heures ont été tranchés en une minute dès qu'elle a VU les
  options (bouton du carnet, onglets transparents, en-tête des conseils).
  Publier une page d'aperçu plutôt que décrire.

────────────────────────────────────────────────────────────
3. PIÈGES TECHNIQUES PAYÉS CHER — À NE PAS REDÉCOUVRIR
────────────────────────────────────────────────────────────
· node --check SUR LES 18 BLOCS avant toute livraison. Script check.py.
· JAMAIS D'EMOJI EN ÉCHAPPEMENT DANS UN SCRIPT PYTHON D'ÉDITION. A vidé le
  fichier QUATRE fois (builds 125, 142, 153, 189).
· PAS DE REGEX AVEC PRÉFIXE [^\n]* SUR CE FICHIER. Blocage de 300 s.
· SUPABASE REJETTE LA REQUÊTE ENTIÈRE dès qu'UNE colonne nommée est absente.
  La panne ressemble à « il n'y a rien », pas à une erreur.
  → Avant de nommer une colonne, la relever. Le défaut sûr est select("*").
· ⚠️ UNE ÉCRITURE REFUSÉE PAR UNE RÈGLE MANQUANTE NE RENVOIE PAS D'ERREUR :
  elle renvoie ZÉRO LIGNE. Découvert le 16/09 — le sélecteur « Pour qui ? »
  affichait « enregistré » sans rien écrire, faute de règle UPDATE.
  APRÈS UN UPDATE, VÉRIFIER QU'UNE LIGNE EST REVENUE.
· ⚠️ UNE ZONE `overflow: auto` ENFANT DE FLEX A BESOIN DE `min-height: 0`.
  Sans lui elle ne défile pas — et le symptôme ne ressemble PAS à un
  problème de hauteur : il ressemble à « l'appli est bloquée » ou « c'est la
  page derrière qui bouge ». A coûté quatre livraisons le 16/09.
· ⚠️ POUR EMPÊCHER LA PAGE DU FOND DE DÉFILER SOUS UN CALQUE : verrouiller
  le document (body en position fixed avec son décalage en négatif, restitué
  à la fermeture). `overflow: hidden` seul NE SUFFIT PAS sur iOS. Et NE PAS
  mettre `touch-action: none` sur la zone non défilante du calque : ça fige
  le calque sans arrêter le fond — erreur commise au build 201.
· ⚠️ NE JAMAIS APPELER UNE FONCTION DE TRADUCTION DEPUIS LE HAUT DU CORPS
  D'UN COMPOSANT si elle y est déclarée en `const` plus bas : « Cannot
  access 'TXT' before initialization », écran mort. A tué Hey Baby du 214 au
  217. Les `function T(...)` sont remontées, les `const TXT = ...` non.
· ⚠️ UNE MODIFICATION QUI TOUCHE PLUSIEURS ÉCRANS DOIT ÊTRE TESTÉE SUR
  CHACUN, et l'assistant doit DIRE lesquels ouvrir.
· `echanges_heybaby_epingles.cheval_id` EST UNE COLONNE TEXTE, pas un uuid.
  D'anciennes lignes y portent des surnoms (« heybaby », « rizotto »).
· Redéfinir la liste de colonnes d'un helper SANS regarder ce dont LUI a
  besoin pour filtrer = liste toujours vide. `hypeCavaliersDuClub` lit
  `ecurie` ET `ecurie2` : les omettre renvoie une liste vide EN SILENCE.
· Ne jamais commenter un bloc contenant déjà un /* … */ : le supprimer.
· Ne jamais remplacer jusqu'à la fin d'une ligne dans ce fichier.
· hypeCalquePhoto OBLIGATOIRE pour toute photo plein écran. data-noswipe +
  data-hscroll sur TOUT calque.
· Pas de createPortal ni de menus en portail (cassés sur iOS). Les menus se
  déplient SUR PLACE, dans le flux.
· Choix multiple de photos sur iOS : <input type="file" accept="image/*"
  multiple>. Bouton vidéo SÉPARÉ.
· Les hooks React ne peuvent pas vivre dans une branche conditionnelle.

────────────────────────────────────────────────────────────
4. DIAGNOSTIC À DISTANCE — LEÇON DU 16/09 AU SOIR
────────────────────────────────────────────────────────────
En fin de journée elle a signalé, en quelques minutes : latence extrême,
photo d'écurie remplacée par celle de la SEP, 24 membres puis 16, cavaliers
dans le mauvais ordre, onglets manquants, blocs qui se chevauchent.

L'assistant a produit TROIS diagnostics faux à la suite — page restée
zoomée, données incomplètes, confusion entre les deux écuries — avant de
lire ce qui était ÉCRIT EN HAUT DE SA CAPTURE : « Connecte-toi pour
publier ». SA SESSION AVAIT EXPIRÉ. Une seule cause, six symptômes.

⚠️ PREMIÈRE QUESTION DÉSORMAIS, DEVANT TOUT SYMPTÔME BIZARRE :
« EST-CE QUE TU ES CONNECTÉE ? »
Puis : lire tout le texte visible sur la capture avant de théoriser.
Vérifié ensuite en navigation privée : un visiteur NON connecté n'atteint
PAS la page d'écurie, il arrive sur l'écran d'accueil. AUCUNE FUITE.

────────────────────────────────────────────────────────────
5. CE QUI A ÉTÉ LIVRÉ LE 15-16/09 (builds 191 → 217)
────────────────────────────────────────────────────────────
DROITS ET ÉCURIES
· 191 : la SEP ajoutée à CLUBS_REVENDIQUES_G → elle gère la page de la SEP
  comme la sienne (créer/supprimer des rendez-vous, bannière, cavaliers).
  ⚠️ UNE SEULE ADRESSE PAR CLUB dans ce mécanisme.
· 197-198 : « Mes chevaux » coupé à NEUF sur la page Cavalier, avec une
  barre « Voir les autres (N) » ; la carte « Ajouter un cheval » monte dans
  cette barre quand elle existe. La coupe à 6 des comptes non premium est
  INTACTE (plafond d'abonnement, pas un replis).

CONSEILS HEY BABY — refonte complète de la bibliothèque
· 192-195 : en-tête éditorial (photo, citation en Cormorant italique,
  HEY BABY, sous-titre, bouton turquoise), lignes refaites (épingle dorée
  DESSINÉE, étoile de priorité, nom en turquoise, question sur 2 lignes,
  date, point d'état, chevron), DA de l'écran d'un conseil avec « MA
  QUESTION » / « RÉPONSE DE HEY BABY ».
· 193 : images/FOND_HEYBABY.webp (828x1471, 80 Ko) en fond d'en-tête,
  cadrage `64% 20%`. Si le fichier manque, le dégradé or reste : rien ne
  casse.
· 199 : retirer une épingle DEPUIS LA LISTE en touchant l'épingle, en deux
  touchers. Le bouton du bas de l'écran d'un conseil existe toujours.
· 200-204 : la liste défile enfin (voir §3), le fond est verrouillé, la
  feuille passe en PLEIN ÉCRAN (l'en-tête ne flotte plus au milieu).
· 205-206 : `cavalier_id` / `cavalier_nom` sur les épingles. Sélecteur
  « POUR QUI ? » dans l'écran d'un conseil, et choix de la cavalière au
  moment d'épingler (second écran, facultatif, « Personne » en premier).
· 207 : on peut épingler sur LES CHEVAUX DE L'ÉCURIE, pas seulement les
  siens. Ses mots : « les gens ne montent pas que le cheval dont ils sont
  propriétaires sinon les clubs n'existeraient pas ».
· 208 : une écriture refusée ne passe plus pour un succès (voir §3).
· 209 : interrupteur « Visible par mon écurie » (voir §8, chantier partage).
· 210 : le retour depuis un conseil ROUVRE le panneau au lieu de laisser la
  page nue (prop `depuis` + trace `window.__rouvrirConseils`).
· 211-214 : LES THÈMES. Liste fermée de 8 clés STABLES (position, plat,
  saut, comportement, travail_pied, sante, exterieur, autre), choisies à
  l'épinglage ET modifiables après coup, PLUSIEURS par épingle.
· 215 : le CHEVAL d'une épingle devient modifiable, avec les chevaux de
  l'écurie. Retirer le cheval DÉPUBLIE l'épingle (la règle de lecture exige
  un cheval).
· 216 : sélecteur unique « POUR QUI ? » dans la bibliothèque, qui se
  combine avec le thème. « Tous les conseils » par défaut À CHAQUE
  OUVERTURE, jamais mémorisé — ⚠️ NE JAMAIS le ranger dans localStorage,
  c'est exactement le défaut qu'elle a voulu éviter.
· 217 : correctif de la panne Hey Baby (voir §3).

AUTRE
· 194 : le composant orphelin `EcranApprentissage` est SUPPRIMÉ, avec son
  accord. Une page d'ensemble Apprentissage serait à ÉCRIRE, plus à
  rallumer.
· 196 : le bouton « + Nouvelle séance » de Mon carnet passe de l'or plein à
  une bordure or, hauteur 58 → 48, ombre retirée. Son choix sur aperçu.

────────────────────────────────────────────────────────────
6. ÉTAT DE LA BASE — CE QUI A ÉTÉ PASSÉ LE 16/09
────────────────────────────────────────────────────────────
Toutes ces requêtes ont été exécutées par elle et ont répondu « Success ».

echanges_heybaby_epingles
· + cavalier_id uuid, cavalier_nom text
· + visible_ecurie boolean not null default false
· RÈGLES : hb_epingle_select / insert / delete existaient ;
  hb_epingle_update A ÉTÉ AJOUTÉE le 16/09 (elle manquait — voir §3),
  using et with check sur auth.uid() = user_id.
· + politique hb_epingle_select_ecurie : lecture autorisée si
  visible_ecurie est vrai, si l'épingle porte un cheval, et si
  hype_meme_ecurie_que_proprio(cheval_id) répond vrai.

fonction hype_meme_ecurie_que_proprio(text)
· security definer, stable, search_path = public, execute révoqué à anon et
  accordé à authenticated. Compare ecurie ET ecurie2 des deux côtés, en
  minuscules, détrimées, en ignorant les champs vides.
· ⚠️ ELLE PREND UN `text`, PAS UN `uuid` : cheval_id est une colonne texte.
  La première version en uuid a échoué (42883) et annulé tout le bloc.

carnet_conseils_etat
· theme est passé de `text` à `text[]`, les valeurs déjà écrites converties
  en listes d'un élément.
· Ses 4 règles (select, insert, update, delete) ont été relevées : OK.

CONTRÔLE FAIT : `select count(*) ... where visible_ecurie` répondait 0 avant
la livraison du 209. Aucune épingle n'était publiée.

NOMS D'ÉCURIES EN BASE (relevé du 16/09), à recopier tels quels :
« Ecurie Feinn » · « Societe d'Equitation de Paris (SEP) » ·
« Jardy Equitation (Haras de Jardy) »
Répartition réelle : SEP seule 16, Feinn seule 15, SEP+Feinn 3, Feinn+SEP 1,
Jardy+Feinn 1, SEP+SEP 1 (un profil a la SEP deux fois — à nettoyer un
jour). → L'ÉCURIE FEINN A DONC 20 MEMBRES.

────────────────────────────────────────────────────────────
7. EN ATTENTE D'ELLE, PAR PRIORITÉ
────────────────────────────────────────────────────────────
✅ MISE EN PAGE CASSÉE : REVENUE NORMALE le 16/09 au soir, sans aucune
   modification. Le code du 217 confirme la cause : le bandeau « Connecte-toi
   pour publier » (MurHype) ne s'affiche QUE sans session. Si ça revient :
   capture EN HAUT de page + « es-tu connectée ? » avant tout.

· EN-TÊTE DES CONSEILS : elle a choisi la PISTE C sur maquette — le bandeau
  se replie quand on défile. ⚠️ RÉSERVE DE L'ASSISTANT, à lui redire :
  c'est la plus coûteuse des trois, et ce genre de mécanique a coûté quatre
  livraisons le 16/09. PROPOSER de faire d'abord l'en-tête court (piste A),
  puis le repliement séparément.
· LE CHEVAL ET LA CAVALIÈRE MANQUENT SUR LES LIGNES : ses conseils
  affichent « GÉNÉRAL » parce qu'ils ont été épinglés SANS cheval. Le code
  affiche bien « Ilona · Cooltax » quand la donnée existe. À lui dire :
  rattacher ses anciennes épingles (possible depuis le 215).
· COMPTAGE DES MEMBRES FAUX (16 au lieu de 20) : CAUSE PROUVÉE EN BASE, voir §11.
  Le calcul est la fonction SQL classement_ecuries(), PAS index.html.
· ✅ LE « 24 MEMBRES » EST EXPLIQUÉ : EcranGuilde, si classement_ecuries ne
  renvoie rien (session tombée, lenteur), bascule sur GUILDES_DEMO et donne
  24 membres au club de la page. Chiffre de démonstration, pas un comptage.
· PAGE D'ÉCURIE SANS SESSION : elle affiche la SEP au lieu de l'Écurie
  Feinn. Devrait afficher un message de connexion, jamais un autre club.
  Relevé du 16/09 : le club vient du profil gardé en mémoire locale
  (profil.club || profil.ecurie), pas de la session. Cause exacte non prouvée.
· BARRE DU BAS : SEPT entrées, « Communauté » tronqué en « Communaut ».
  ⚠️ ZONE SENSIBLE : un correctif de centrage y attend son verdict depuis
  le build 164. Ne rien y toucher sans accord explicite.
· LE BOUTON ADMIN « Premium » (estModAdm) est en position fixe et recouvre
  ce qui défile dessous. Il n'apparaît QUE pour elle. Où le déplacer ?
· ✅ APY : vidéo BRANCHÉE au 222 (§11 K). Historique : APY (HYPE_IMGS["k554"], carré « ? ») : TRANCHÉ le 16/09 — une VIDÉO
  remplace l'image, SUR L'ÉCRAN DU CAILLOU SEULEMENT (les DEUX versions :
  window.onerror et la frontière d'erreur HYPE_SABOT). Vidéo retravaillée
  par l'assistant : images/APY_SABOT.mp4, 600×600, 12 s, sans son, < 1 Mo,
  numéros « 2/6/12 », logo « Ai » et grosse flèche retirés par recadrage.
  Elle l'a validée (« super »). NON BRANCHÉE, NON POUSSÉE : elle a demandé
  une maquette des tailles d'affichage avant — PAS ENCORE FOURNIE, à faire.
  Prévu : repli sur l'emoji cheval si la vidéo ne charge pas.
· MEMORY : Apy (k554) apparaît AUSSI en fin de partie (MemoryMascotteAnim),
  même carré « ? ». ELLE IRA VOIR PLUS TARD. Ne pas y mettre la vidéo.
· « Moi » DANS LE SÉLECTEUR : tranché par l'assistant faute de réponse =
  les épingles sans cavalière. À CONFIRMER.
· resultats.format_large : ajouter la colonne ou retirer la fonction ?
· Les 5 Premium SANS LIMITE (proches et ambassadeurs) : à confirmer, pour
  que personne ne « corrige » ça un jour.
· Liam a deux lignes, @gmail.com et @gmail.fr : à nettoyer un jour.
· Verdict sur le webhook Stripe après un vrai paiement.
· Les 5 comptes du 28/08 (mois offert) expirent le 1er OCTOBRE. RIEN à
  corriger en base. Reste à décider COMMENT leur proposer de s'abonner :
  message à la main, relance dans l'appli, ou rappel iPhone. Non tranché.

────────────────────────────────────────────────────────────
8. CHANTIERS OUVERTS, NON COMMENCÉS
────────────────────────────────────────────────────────────
A. ⚠️⚠️ LE PARTAGE DES ÉPINGLES — LE PLUS DANGEREUX DE L'APPLI.
   Son idée : chacun voit ses épingles, SAUF celles que le propriétaire
   publie (visibles en premier) ; et une épingle TAGUÉE à une cavalière
   apparaît sur SON carnet dans une autre couleur, elle peut la masquer, et
   par défaut elle s'affiche tant qu'elle ne l'a pas vue. Idem pour les
   SÉANCES du carnet.
   ÉTAPE 1 FAITE (build 209 + SQL) : visibilité écurie, publiable par le
   PROPRIÉTAIRE DU CHEVAL ou par elle en admin, et « visible par tous » =
   LES MEMBRES DE L'ÉCURIE DU CHEVAL, pas tout Hype (« à c'est mieux »).
   ⚠️ SENS RÉVERSIBLE : élargir plus tard est une ligne à changer ; revenir
   en arrière est impossible, ce qui a été lu a été lu.
   ⚠️ LE TEST QUI COMPTE N'EST PAS FAIT : publier une épingle, puis vérifier
   DEPUIS UN AUTRE COMPTE qu'elle est visible dans la même écurie et
   INVISIBLE ailleurs. Tant que ce test n'est pas passé, l'étape 1 n'est
   PAS validée.
   ÉTAPES 2 et 3 NON COMMENCÉES : l'épingle taguée chez la cavalière (avec
   masquage et suivi de « vue »), puis les séances. MODÈLE RECOMMANDÉ :
   l'épingle reste UNE SEULE ligne, celle de son auteur, pas de copie ;
   « effacer » devient « masquer pour moi » dans une petite table à part qui
   retient aussi si la personne l'a vue.
   RESTE SANS RÉPONSE : une épingle taguée peut-elle être refusée AVANT
   d'être vue ? L'auteur voit-il qu'elle a été masquée ? (Recommandation :
   non, sinon ça devient un accusé de réception.)

B. MON CARNET — REFONTE VISUELLE. Brief complet reçu le 16/09 (hero
   photographique, timeline, rail par cheval, cartes de séance). RELEVÉ DE
   L'EXISTANT FAIT, PLAN DONNÉ, NON VALIDÉ. Points acquis : les portraits
   des chevaux sont disponibles SANS requête (le contexte les porte) ; le
   nombre de conseils liés par séance coûterait UNE requête globale, pas un
   N+1 — à elle de dire si on l'ajoute. Le bouton est déjà calmé (196), il
   manque le bandeau : elle n'a pas choisi l'image.

C. VIDÉOS DANS UNE SÉANCE DE CARNET — tracé, non codé. Le pipeline vidéo
   exige UNE LIGNE PAR VIDÉO avec statut ; une séance stocke un TABLEAU
   d'URL. Voie recommandée : une petite table carnet_seance_videos.

D. APPRENTISSAGE DU CHEVAL — proposé, non validé. Les données ne sont pas
   celles du cavalier : pas d'XP ni de quiz, mais résultats FFE, santé,
   palmarès, origines. Ne PAS copier les blocs du cavalier.

E. Dette sans urgence : mesChevauxClub et son chargement, les groupes par
   mois, l'encart album dans EcranEcurie, hype_detacher_cavalier (signature
   jamais relevée), les autres UPDATE du fichier qui ne testent pas leur
   retour (ne PAS corriger en masse), et la requête des priorités de Mon
   carnet qui demande `theme` sans l'afficher.

────────────────────────────────────────────────────────────
9. À NE JAMAIS FAIRE
────────────────────────────────────────────────────────────
· NE PAS passer la requête DELETE des « doublons » de résultats FFE de
  l'entrée 156 : les deux victoires à 24 h d'écart sont RÉELLES.
· NE PAS « corriger » les 5 lignes du 28/08 : mois offert assumé.
· NE PAS réécrire ni déplacer le chantier Santé du cheval
  (EcranSanteCheval et tout ce qui l'entoure). Livré et testé.
· NE PAS toucher au correctif chevauxCibles de Hey Baby : la liste propose
  les VRAIS chevaux (id uuid), le repli sur CHEVAUX_FICHE a été supprimé
  VOLONTAIREMENT — liste vide vaut mieux qu'un faux identifiant en base.
· NE PAS reprendre le build 216 tel quel : il contient la panne Hey Baby.
  Prendre le 217.
· NE JAMAIS modifier une CLÉ de thème (position, plat, saut…) : elles sont
  écrites en base. Pour renommer, changer le LIBELLÉ.
· Marqueurs de garde à vérifier avant toute greffe : liensClub,
  chevalCommunDemoData, palmTech, EcranSanteCheval.

────────────────────────────────────────────────────────────
10. NOTE SUR LA JOURNÉE DU 16/09
────────────────────────────────────────────────────────────
27 livraisons entre 1 h et 20 h. Trois incidents, tous imputables à
l'assistant : une panne Hey Baby restée invisible pendant trois livraisons
(214 → 217), quatre correctifs à côté sur un défilement (200 → 204), et
trois diagnostics faux en fin de journée avant de lire ce qui était écrit
sur la capture.

Le point commun n'est pas technique : c'est le rythme. Les tests ont sauté
parce qu'on enchaînait. La règle du 1-à-1 existe pour ça, et c'est
l'assistant qui doit la tenir, même — surtout — quand elle dit « continue ».

────────────────────────────────────────────────────────────
11. SOIRÉE DU 16/09 (après 20 h)
────────────────────────────────────────────────────────────
A. CLASSEMENT DES CLUBS — DIAGNOSTIC PROUVÉ EN BASE, CALCUL PAS ENCORE REFAIT
· classement_ecuries() compte membres, hauts faits et résultats sur
  profiles.ecurie SEULEMENT (jamais ecurie2). Feinn : 16 en ecurie + 4 en
  ecurie2 (3 SEP+Feinn, 1 Jardy+Feinn) = 20. Orthographe identique partout.
· RÈGLE DÉCIDÉE PAR ELLE :
  - membres : comptent pour leurs DEUX écuries (une seule fois si doublon) ;
  - résultats de concours : au club DU CHEVAL (les 1 025 resultats ont tous
    un cheval_id) ;
  - hauts faits : la table hauts_faits n'a que id, user_id, badge_id,
    created_at. Ce sont en réalité les PALIERS d'activité (hypeEnregistrerPalier
    écrit « famille:palier ») : cumulés, sans cheval → comptent pour les
    DEUX écuries de la cavalière (« ok »). Les futurs hauts faits de CONCOURS
    viendront des résultats → club du cheval.
· CLUB D'UN CHEVAL = colonne chevaux.club UNIQUEMENT. ⚠️ chevaux.ecurie est
  un reste de l'ancienne page Écurie : NE PAS S'Y FIER (sa consigne).
  Les 8 chevaux ecurie=Feinn / club=SEP sont bien à la SEP (confirmé).
· ✅ UPDATE PASSÉ PAR ELLE, 9 lignes revenues : club rempli pour les chevaux
  qui n'en avaient pas — SEP : Edgard, Elle m'a dit, Instinct du Pin, Verone ;
  Feinn : Quarla, Tully Blue moon, madgeek, Hey Baby Please, For ever.
· EN ATTENTE : son test (ces chevaux sur les pages SEP et Feinn), PUIS la
  nouvelle version de classement_ecuries() (non écrite).

B. DOUBLON : « Elle m'a dit » et « Elle m'a dit circee » = LE MÊME CHEVAL
  (confirmé par elle). Les deux fiches sont maintenant à la SEP. « On verra
  après » — ne pas fusionner ni supprimer sans elle.

C. ANCIENNE PAGE ÉCURIE (EcranEcurie) : code mort, à EFFACER (sa demande).
  Seule porte restante : la tuile modératrice « Ancienne écurie perso
  (aperçu) » dans Mon compte (setEcran("ecurie")). Deux options présentées,
  NON TRANCHÉES : retirer la tuile seule, ou supprimer la page entière après
  avoir vérifié ce qui en dépend (encart album).

D. ÉPINGLES — RELEVÉ EN BASE (compte feinn@live.fr) : 10 épingles, 9 SANS
  cheval (dont ses questions sur sa jument Hey Baby Please), 1 sur
  « Boréalis de Feinn » avec cheval_id = « idao » (ancien identifiant de
  démo, pas la vraie fiche → pas de photo). Pas de surnom « heybaby » chez
  elle. Le faux « idao » : NOTÉ, NON CORRIGÉ.

E. BUILD 218 — LIVRÉ, À TESTER
· « Pour qui ? » passe du menu déroulant (216) à une RANGÉE D'ONGLETS, mêmes
  pastilles que les thèmes. Onglets = ce qui a déjà une épingle (construction
  choixQui inchangée) : Tous · Moi · cavalières · chevaux.
· Bouton « + » au bout (PAS en mode choix depuis une séance) : liste de SES
  chevaux (ctx.chevaux) → liste de ses conseils SANS cheval à cocher →
  « Ranger sous <cheval> (n) ». Chaque update est vérifié (une ligne doit
  revenir) ; un refus est affiché avec le nombre, les conseils refusés
  restent cochés. Après succès : thème remis sur « Tous » et onglet du
  cheval sélectionné.
· Écrit en base : cheval_id + cheval_nom de l'épingle, rien d'autre. La règle
  hb_epingle_update existe depuis le 16/09.
· À TESTER : « + » → Hey Baby Please → cocher → ranger → l'onglet apparaît
  avec ses conseils, et ils quittent « Moi ». Aussi : ouvrir un conseil
  depuis une séance de carnet (mode choix) : pas de « + ».
· ⚠️ ERREUR DU 218, vue par elle : le « + » ne proposait QUE ses chevaux
  (ctx.chevaux). Hey Baby Please n'y était pas (enregistrée sur un autre
  compte). Contraire à la règle du 207.

F. BUILD 219 — LIVRÉ, À TESTER
· Le « + » propose la MÊME liste que l'écran d'un conseil (215) : ses
  chevaux, puis « Les chevaux de l'écurie » = chevaux des membres de SES
  deux écuries (hypeCavaliersDuClub sur club/ecurie et club2/ecurie2). Même
  règle pour toutes les cavalières, chacune avec ses écuries.
· Chevaux de l'écurie SANS photo (photo_url non chargée, comme au 215).
· ⚠️ Cette liste suit l'écurie du PROPRIÉTAIRE, pas chevaux.club. Si un jour
  elle doit suivre chevaux.club : changer les DEUX endroits ensemble.
· À TESTER : « + » → Hey Baby Please doit apparaître sous « Les chevaux de
  l'écurie » → cocher → ranger → onglet créé.

G. DÉCISIONS EN ATTENTE SUR LA MÊME PAGE (une modification à la fois)
· ✅ ONGLET « Moi » : retiré au 220 (voir H).
· BOUTON « Demander à Hey Baby » : 4 maquettes montrées — A coupé en deux
  avec la recherche (son idée), B loupe + grand bouton, C fixe en bas (zone
  sensible barre du bas), D rond à côté de la croix. NON TRANCHÉ.

H. BUILD 220 — LIVRÉ, À TESTER EN MÊME TEMPS QUE LE 219
· Une seule ligne : choixQui n'ajoute plus l'onglet « Moi ». Rangée :
  Tous les conseils · cavalières · chevaux · « + ». Vaut aussi en mode
  choix depuis une séance.
· Perte assumée : plus de vue « conseils pour aucune cavalière ».
· Si un bug apparaît dans les onglets : il peut venir du 219 OU du 220.

I. BUILD 221 — LIVRÉ, À TESTER (contient le 220)
· Bug vu sur son enregistrement (219) : « Ranger sous Hey Baby Please (8) »
  était EN BAS de la liste du « + », qui passe sous la barre du bas et
  rebondit dessous → bouton impossible à toucher.
· Son choix A : le bouton « Ranger (n) » MONTE sur la ligne du nom du cheval
  (‹ Hey Baby Please ····· Ranger (8)), toujours visible. Message d'erreur
  juste dessous. Aucune autre modification.
· ⚠️ LEÇON : tout bouton d'action d'un panneau qui défile dans l'en-tête de
  cette feuille doit être EN HAUT, jamais en bas (la barre du bas passe
  devant, zone sensible non touchée).

J. VIDÉO D'APY — TAILLE CHOISIE : MOYENNE (170 px), rond. BRANCHÉE AU 222.

K. BUILD 222 — LIVRÉ, À TESTER (contient 219 à 221)
· FICHIER NOUVEAU À POUSSER : images/APY_SABOT.mp4 (600×600, 12 s, sans son,
  < 1 Mo). Sans lui, les deux écrans montrent l'emoji cheval : rien ne casse.
· window.onerror (plantage global) : <video autoplay muted loop playsinline>
  à la place de l'<img> k554, règle CSS `.hyperr video` 170 px rond ; si la
  vidéo émet `error` → retirée, emoji cheval affiché.
· Frontière d'erreur React (HYPE_SABOT, plantage d'une page) : même vidéo
  170 px ; `onError` → état apyKo → emoji cheval. `muted` reposé par ref
  (React ne pose pas l'attribut, iOS refuse sinon la lecture auto).
· k554 N'EST PLUS LU sur ces deux écrans. Le Memory (MemoryMascotteAnim)
  lit TOUJOURS k554 : non touché, elle ira voir.
· PAS DE MOYEN DE DÉCLENCHER L'ÉCRAN EXPRÈS. Test possible : ouvrir
  https://2hype.netlify.app/images/APY_SABOT.mp4 pour vérifier que le
  fichier est en ligne. Une tuile modératrice « Tester l'écran du caillou »
  a été proposée, NON FAITE (modification séparée si elle la veut).

────────────────────────────────────────────────────────────
12. 16-17/09 (nuit et matinée) — BASE ET MOSAÏQUE D'ALBUM
────────────────────────────────────────────────────────────
A. ✅ classement_ecuries() RÉÉCRITE EN BASE par elle (« Success ») :
  membres sur ecurie ET ecurie2 (distinct, « __perso__ » exclu), paliers
  hauts_faits sur les deux écuries, résultats et podiums au club DU CHEVAL
  (chevaux.club). Même formule XP. Vérifié : Feinn 20 membres / 861 résultats /
  7 367 XP ; SEP 21 / 161 / 1 614. Classement des clubs dans l'appli NON
  REGARDÉ par elle.
  Retour arrière possible : l'ancienne définition est au §11 A (tout sur
  profiles.ecurie seul).
B. 3 RÉSULTATS ORPHELINS : sur la fiche SUPPRIMÉE « Elfe » (cheval_id
  6183c1f4…, supprimée le 28/08), saisis à la main, sans date, sans épreuve,
  SANS cavalier : Maisons-Laffitte prépa 80 (1ᵉʳ), Orveau prépa 80 (3ᵉ),
  HDL prépa 90 (2ᵉ). « Elfe » = « Elfe de Feinn » (confirmé). Palmarès jsonb
  d'Elfe de Feinn vide. SA DÉCISION : NE RIEN RATTACHER, elle importera le
  vrai palmarès. ⚠️ L'import dédoublonne sur date+épreuve+concours+cavalier :
  ces 3 lignes ne seraient pas reconnues ; elles restent invisibles.
C. RÉSULTATS D'AMBRE « invisibles » : FAUSSE ALERTE, filtre « sans faute »
  actif. 9 résultats « AMBRE VANGE… », tous importés depuis le compte de
  Blandine (user_id = elle). Pas de bug.
  JOURNAL D'ENVOI : visible SEULEMENT par son compte (estCompteFeinnHype),
  « Effacer » le vide. ELLE LE GARDE.
D. BUILD 223 — MOSAÏQUE D'ALBUM, FORMAT PAR ALBUM — LIVRÉ, À TESTER
· SQL PASSÉ PAR ELLE (« Success ») : table album_photo_formats (album_id →
  albums_cheval.id on delete cascade, photo_url, format ∈ normal / grand /
  pleine_largeur / pleine_hauteur, user_id default auth.uid(), updated_at,
  clé (album_id, photo_url)). RLS : select si l'album est visible (hérite de
  albums_cheval) ; insert/update/delete si propriétaire de l'album OU
  hype_est_moderatrice().
· Ses choix : option B (un format PAR ALBUM, indépendant de photo_formats de
  la chronologie), 2 colonnes, sans format = PETITE (aucun album ne change
  d'aspect tant que rien n'est choisi), grille simple pendant Réorganiser.
· Code : hypeComposerAlbum2 (placement 2 colonnes, comble les trous sur 3
  cases max, jamais de recul) + hypeTailleCaseAlbum (normal 1×1, grand 2×2,
  pleine_largeur 2×1, pleine_hauteur 1×2). Hauteur de ligne = largeur d'une
  colonne, mesurée (ResizeObserver). Tuile « + N » placée comme petite case.
· Lien « Choisir le format des photos » sous les boutons : propriétaire ou
  modératrice seulement, pas pendant Réorganiser (et Réorganiser masqué
  pendant le choix). Ouvre TOUT l'album et un panneau AU-DESSUS de la grille
  (leçon 221) : Petite (supprime la ligne) · Grand · Pleine largeur · Pleine
  hauteur · Terminé. Écriture vérifiée, refus affiché. Clé = urlNue(photo).
· À TESTER : album sans format = inchangé ; Choisir le format → photo →
  Grand → la mosaïque se recompose ; Petite → revient ; Réorganiser toujours
  OK ; un autre compte ne voit pas le lien ; la chronologie ne change pas.

E. ÉPINGLER DEPUIS HEY BABY — PAS DE PANNE, UN PARCOURS MUET
· Vérifié en base : ses épingles s'écrivent bien (« test pin » sur Delicada,
  17/09). Les 2 conseils sans cheval d'hier sont passés sous Hey Baby Please
  → LE « + » DU BUILD 221 MARCHE (validé par les données, pas par un test).
· ⚠️ ERREUR DE L'ASSISTANT : avoir conclu trop vite que « test pin » avait
  échoué, sur une requête lancée avant qu'elle ne la crée. Ne plus conclure
  « ça n'existe pas » sur un horodatage plus ancien que l'action.
· Défauts de clarté relevés dans le code, NON CORRIGÉS : toute erreur
  d'épinglage affiche « Connecte-toi pour épingler » (faux) ; le catch ferme
  la fenêtre en silence ; toucher le voile ferme sans rien dire ; le bandeau
  de succès dure 2,4 s. À traiter plus tard.
· Retirer un conseil : possible aujourd'hui en touchant la ZONE SOMBRE À
  GAUCHE de la carte (2 touchers), rien ne l'indique. SON CHOIX : option A,
  un bouton VISIBLE (croix ou corbeille) avec confirmation → BUILD 225 À
  FAIRE, non commencé.

F. AGENDA DE CLUB — LA VRAIE CAUSE ÉTAIT MUETTE
· « Publier » grisé = titre ou DATE DE DÉBUT manquante. Elle avait mis le
  25 oct. dans « Fin » et laissé « Début » vide, rien ne le disait ; elle a
  attendu plusieurs minutes en croyant à un envoi en cours. Résolu de son
  côté dès qu'elle a rempli « Début » (« ça marche »).
· L'affiche n'était sans doute jamais en cause.
· Suppression : croix sur la carte du rendez-vous (propriétaire du club
  seulement) ; croix × sur une photo du mur de l'événement. Rendre la croix
  PLUS VISIBLE : proposé, NON TRANCHÉ.

G. BUILD 224 — LIVRÉ, À TESTER (contient 219 à 223)
· Trois silences supprimés dans le formulaire d'agenda de club (aucun droit,
  aucune requête, aucun champ modifié : on AFFICHE seulement) :
  1) phrase sous « Publier » éteint : « Il manque le titre » ou « Il manque
     la date de début (Fin est facultative) » ;
  2) échec d'envoi de l'affiche : message + vraie erreur + « Réessayer »
     (le fichier choisi est gardé dans une ref) ; fichier non-image refusé
     avec un message clair ;
  3) refus ou échec de la publication : affiché dans la fenêtre, qui reste
     ouverte, au lieu du bouton qui se remet en place en silence.
· À TESTER : créer un rendez-vous sans date de début → la phrase apparaît ;
  avec titre + début → publication OK comme avant ; ajouter une affiche →
  aperçu ; choisir un fichier non-image → message.

H. ✅ DROITS SUR LA SEP — CAUSE TROUVÉE ET CORRIGÉE EN BASE
· Policies de club_agenda : INSERT, UPDATE et DELETE passent toutes par
  hype_est_proprietaire_club(club_clef), qui lit la table clubs_revendiques
  (clef + email = auth.jwt() email). SELECT = true (lecture publique).
· La table ne contenait QU'UNE ligne : « ecurie feinn ». La SEP n'y était
  pas → la base refusait tout sur la SEP alors que l'appli affichait les
  boutons (CLUBS_REVENDIQUES_G, côté appli, contient la SEP depuis le 15/09).
· ✅ INSERT PASSÉ PAR ELLE (1 ligne) : clef « societe d'equitation de paris
  (sep) » + feinn@live.fr. Écriture identique à ce que calcule clefClubG.
· À TESTER par elle : créer, puis supprimer un rendez-vous sur la SEP.

I. BUILD 225 — LISTE DES CLUBS LUE DEPUIS LA BASE — LIVRÉ, À TESTER
· clubRevendiquePar lit désormais un registre HYPE_CLUBS_REVENDIQUES chargé
  depuis la table clubs_revendiques (select *), fusionné PAR-DESSUS la
  constante CLUBS_REVENDIQUES_G qui reste le repli. Rechargé aussi à la
  connexion (onAuthStateChange). Table illisible = comportement d'avant.
· La base reste la seule autorité : ce registre décide seulement ce que
  l'écran PROPOSE. Un refus est désormais affiché (224).
· ⚠️ Asynchrone : un club ajouté en base apparaît au RECHARGEMENT suivant.
· ⚠️ DETTE, non traitée : une AUTRE constante, CLUBS_REVENDIQUES (sans _G,
  utilisée ligne ~32985 pour la VILLE du club), n'est pas branchée sur la
  base. Elle ne donne aucun droit. À unifier un jour.
· À TESTER : la page de la SEP et celle de Feinn montrent toujours les
  boutons de gestion ; un compte cavalière ne les voit pas.

J. BUILD 226 — ACTIONS VISIBLES — LIVRÉ, À TESTER
· RETIRER UN CONSEIL (son option A) : la zone sombre à gauche de la carte
  N'EST PLUS un bouton (ancien gestionnaire supprimé, pas commenté) — on
  l'activait par accident sans le savoir. Une VRAIE croix ✕ ronde, bordée,
  38 px, apparaît à DROITE de chaque carte, avant la pastille d'état.
  Deux touchers : le 1er passe la croix en rouge et affiche « Touche encore
  la croix, à droite, pour retirer ce conseil », le 2e retire. Retrait en
  base D'ABORD, puis à l'écran. Pas de croix en mode CHOIX (depuis une
  séance de carnet).
· POST DU MUR D'UN ÉVÉNEMENT : la croix passe de 15 px gris sans cadre à un
  rond bordé de 40 px, et elle DEMANDE CONFIRMATION (avant, elle effaçait
  sans rien demander). Elle n'apparaît que sur ses propres publications.
· Un espace vide (112 px + safe-area) est ajouté sous le fil de l'événement :
  la dernière carte ne passe plus sous la barre du bas. La barre elle-même
  n'est pas touchée (zone sensible, correctif 164 toujours en attente).
· LEÇON DU JOUR, à garder : 3 boutons cachés par la barre du bas en une
  soirée. Toute action doit être EN HAUT d'un panneau qui défile, ou avoir
  de l'air sous elle.
· À TESTER : croix sur un conseil (2 touchers) → il disparaît et ne revient
  pas après rechargement ; toucher la zone gauche n'efface plus rien ;
  ouvrir un conseil marche toujours ; croix d'un post du mur → confirmation.

K. BUILD 227 — SUPPRIMER UN RENDEZ-VOUS — LIVRÉ, À TESTER
· MANQUE TROUVÉ (pas un réglage caché) : la croix de suppression n'existait
  QUE sur les rendez-vous À VENIR (agc-x). Les rendez-vous PASSÉS
  (carteEvPasse) n'avaient AUCUN bouton de suppression. « Cso » du 2 sept
  était donc ineffaçable. Elle : « sur le mur je vois pas de croix ».
· Ajouté : croix ✕ ronde bordée 38 px en haut à droite de chaque carte de
  rendez-vous PASSÉ, gestionnaire du club seulement (estProprio).
· Ajouté : bouton « Supprimer ce rendez-vous » EN BAS de la page du
  rendez-vous (EcranEvenementPasse), puis retour à l'agenda. Le droit y est
  lu sur ev.club_clef via une nouvelle aide clefClubRevendiqueePar(clef,
  user), qui interroge le registre chargé depuis la base au 225.
· CONFIRMATION OBLIGATOIRE sur les deux (sa demande explicite), avec le
  titre du rendez-vous dans la question, et refus de la base AFFICHÉ.
· ⚠️ La suppression emporte le mur du rendez-vous (photos et commentaires).
  Les résultats FFE ne sont pas touchés : ils tiennent à la date.
· À TESTER : supprimer « Cso » depuis la liste des passés (croix) ; en créer
  un autre et le supprimer depuis sa page ; vérifier qu'une cavalière ne
  voit ni la croix ni le bouton.

L. 18/09 — MUR : 4 PHOTOS CHOISIES, UNE SEULE GARDÉE (BUILD 228)
· Son signalement : « je mets 4 en ligne et ça m'en affiche une seule »,
  répété plusieurs fois (12 à 16 médias perdus au total).
· PROUVÉ EN BASE : commentaires du 18/09 08:58 UTC → medias NULL ; celui du
  14/09 17:19 → medias contient bien plusieurs URLs (ce jour-là elle les
  avait ajoutées UNE PAR UNE). Les photos sont de vrais fichiers du
  stockage (pas de data: URL), et l'envoi passe bien par
  preparerPhotoMaster (2560 px / q90) : ces deux pistes sont abandonnées.
· CAUSE, dans `choisir` du composeur de MurHype : `ajouterMedia` testait
  `if (!photo)` en relisant l'ÉTAT React, figé pendant toute la boucle de
  sélection. Les 4 photos voyaient donc la première place libre et
  s'écrasaient : seule la DERNIÈRE survivait, et `photosEnPlus` restait
  vide → colonne `medias` non écrite.
· CORRECTIF 228 : compteurs LOCAUX (`prisePremiere`, `ajoutes`) au fil de la
  sélection, au lieu de relire l'état. Ordre conservé, limite de 4 par
  message inchangée, avertissement du 165 inchangé. Périmètre : ce seul
  composeur (mur des rendez-vous, du fil et du club).
· À TESTER : choisir 4 photos EN UNE FOIS → les 4 doivent apparaître dans
  l'aperçu, puis dans la publication ; en choisir 6 → message « seules les 4
  premières » ; une par une → comme avant.
· ENCORE OUVERT : la QUALITÉ d'une photo ouverte en grand (« regarde la
  mauvaise qualité »). Établi : fichier réel, pipeline correct, visionneuse
  qui demande jusqu'à 2560 px (grandeImageHype ×DPR). Reste à savoir si le
  flou vient d'une vignette de VIDÉO agrandie ou d'un endroit précis de
  l'affichage — attendre sa réponse (photo ou vidéo ? flou avant ou après
  ouverture ? net en pinçant ?) avant tout code.

────────────────────────────────────────────────────────────
13. 🟥 L'OBJECTIF DU PROJET — À NE PLUS JAMAIS PERDRE
────────────────────────────────────────────────────────────
🟥 METTRE HYPE SUR L'APP STORE (et les magasins d'applications) EST UN
OBJECTIF DE BLANDINE DEPUIS LE DÉBUT. Ses mots le 19/09 : « depuis le début
j'ai dit que c'est ce que je voulais », « on en a parlé des dizaines de fois,
on a même fait les effacements de compte exprès pour ça ».

⚠️ CET OBJECTIF AVAIT DISPARU DES SUIVIS. Il n'était PAS dans la passation du
16/09 (celle-ci, §1 à §12), et l'assistant l'a de nouveau omis en refondant
le suivi le 19/09. DEUX PERTES SUCCESSIVES. Ce qu'il faut en retenir :
🟥 QUAND ON CONSOLIDE UN SUIVI, ON GARDE D'ABORD LES OBJECTIFS ET LES
DÉCISIONS, PAS LES PIÈGES TECHNIQUES. Le code se relit ; un objectif et les
raisons d'un choix ne se retrouvent NULLE PART ailleurs. Et on ne raccourcit
pas un suivi sans qu'elle l'ait demandé — c'est un retrait sur
interprétation, ce que le §2 interdit.

CE QUI A DÉJÀ ÉTÉ FAIT POUR CET OBJECTIF, d'après elle : LA SUPPRESSION DE
COMPTE depuis l'application a été développée EXPRÈS pour cette exigence
d'Apple (toute app qui crée des comptes doit permettre de les supprimer
depuis l'app). ⚠️ NE JAMAIS RETIRER CETTE FONCTION, ni la traiter comme un
détail : c'est une condition d'entrée sur l'App Store.
⚠️ LE RESTE DE L'HISTORIQUE EST À RECONSTITUER AVEC ELLE : d'autres décisions
ont été prises « des dizaines de fois » et ne sont plus écrites nulle part.
À lui demander, et à consigner ICI.

ÉTAT DES CONNAISSANCES AU 19/09 (vérifié par recherche ce jour) :
· Hype n'est enveloppée dans RIEN aujourd'hui : c'est une PWA pure servie
  par Netlify, installée depuis Safari (« Ajouter à l'écran d'accueil »).
  Les photos et la caméra marchent par le NAVIGATEUR, pas par un emballage.
· ⚠️ APPLE REFUSE LES PWA TELLES QUELLES (règle 4.2, « sites web
  réemballés »). Mais elle n'interdit pas le web : il faut DEUX OU TROIS
  fonctions qu'un site ne peut pas faire. Hype a déjà une navigation à
  onglets, l'appareil photo, un abonnement. IL MANQUE surtout les
  NOTIFICATIONS et un vrai MODE HORS-LIGNE.
· GOOGLE PLAY ACCEPTE les PWA (mécanisme prévu). 25 € une seule fois.
  RECOMMANDATION DE L'ASSISTANT : commencer par là — moins de risque, et la
  moitié de ses cavalières sont sur Android.
· POUR APPLE : compte développeur 99 €/an, plus un service d'emballage qui
  ajoute les fonctions natives (quelques centaines d'euros par an), ou une
  réécriture de l'interface en React Native (des mois).
· 🟥 LE VRAI COÛT N'EST PAS LES 99 € : si les abonnements sont vendus DANS
  l'app iOS, Apple IMPOSE son paiement et PREND 15 À 30 %. Le Stripe actuel
  ne serait plus autorisé pour ça. À trancher AVANT de s'engager.

⚠️ QUESTION POSÉE ET SANS RÉPONSE : ce qu'elle attend de l'App Store — être
trouvée par des inconnues, faire plus sérieux, ou simplifier l'installation.
Les trois mènent à des chantiers différents, et le troisième se règle
peut-être sans App Store du tout.

────────────────────────────────────────────────────────────
14. 18-19/09 — PAGE D'UN CONCOURS PASSÉ (builds 229 → 239)
────────────────────────────────────────────────────────────
Refonte demandée par elle (brief + maquette). TERMINÉE et VALIDÉE sur
capture. Builds 229 à 239, tous EN LIGNE et confirmés.

· HERO : 210 → 176 px, dégradé finissant en noir franc.
  ⚠️ IL Y A DEUX HEROS IDENTIQUES DANS LE FICHIER (`minHeight: 210`) :
  l'autre appartient à `EcranEvenement` (grands événements nationaux). Seul
  celui de `EcranEvenementPasse` a été touché.
· RÉSULTATS REFAITS : ⚠️ LA LIMITE DE 20 EST RETIRÉE (ses mots : « c'est ici
  qu'on consulte les résultats »). Épreuve en petites capitales or, CHEVAL
  EN TURQUOISE, cavalier en gris, classement à droite (or pour une
  victoire). Fond noir continu, filet de 1 px à 5,5 %, point or
  chronologique. AUCUNE carte encadrée.
· LE NOMBRE DE PARTANTS n'est jamais l'information principale, et il est
  MASQUÉ quand il vaut 1 (on n'écrit RIEN) et pour une PRÉPARATOIRE. Son
  « 1/1 » devient « 1er » tout court.
· ⚠️ LE NOM DU CHEVAL EST RÉSOLU EN AMONT, DANS L'AGENDA (son instruction) :
  `resultats` ne porte que `cheval_id` ; UNE requête sur `chevaux` pour tous
  les rendez-vous. La page de détail continue de ne RIEN requêter, elle
  reçoit `window.__evPasse`. Si la résolution échoue, le nom reste vide :
  jamais de nom inventé.
· ⚠️ DEUX CHOSES DE LA MAQUETTE VOLONTAIREMENT NON FAITES, son brief les
  interdit : LES VIGNETTES PAR RÉSULTAT (aucune relation photo↔résultat
  n'existe) et LE « SANS-FAUTE » (aucune colonne ne le porte).
· GALERIE : titre « Photos & vidéos » + compte réel, tuiles CARRÉES.
  ⚠️ AUCUNE LIMITE DE NOMBRE, ni avant ni maintenant (« surtout PAS
  slice(0,4) »). Chargement paresseux et vignettes conservés.
· CHOIX DE LA PHOTO DE COUVERTURE : bouton sur chaque photo, réservé au
  GESTIONNAIRE DU CLUB (même droit que la suppression), JAMAIS sur une
  vidéo. ⚠️ AUCUN SQL : `club_agenda.image_url` existait déjà et servait
  déjà de couverture. Écriture par `modifierAgendaClub`, qui vérifie qu'une
  ligne est revenue. ⚠️ RETIRER LE CHEVAL DÉPUBLIE L'ÉPINGLE (la règle de
  lecture exige un cheval ; l'interrupteur serait resté allumé à tort).
· « PUBLICATIONS & COMMENTAIRES » : sa maquette prévoyait DEUX sections.
  RELEVÉ FAIT : elles n'existent pas séparément — UN SEUL `MurHype` affiche
  les publications rattachées (`hypePostsAgenda`) ET les messages du mur
  (`listerCommentaires`), fusionnés par `fusionnerPosts` sans marque
  d'origine. ⚠️ LA DONNÉE PERMETTRAIT de les distinguer (chaque ligne de
  `commentaires` porte sa `cible`), mais le tri se ferait AU RENDU, donc
  dans le composant PARTAGÉ PAR HUIT ÉCRANS : nouvelle prop ou second appel,
  les deux interdits par son brief. DÉCISION : renommer honnêtement.
  Le jour où elle voudra vraiment deux sections, ce sera un chantier sur le
  composant, pas un réglage.
· DIAGNOSTIC D'ENVOI REPLIÉ sur UNE LIGNE dépliable (sa demande : « moins
  envahissant et pas tout en hauteur »). ⚠️ TOUJOURS RÉSERVÉ À SON COMPTE
  (`estCompteFeinnHype`), condition inchangée.
· LES TROIS SECTIONS S'INTRODUISENT PAREIL (build 236) : même filet de 1 px
  à 5,5 % et même retrait. Une seule en portait un, d'où une césure isolée.
· LA CARTE DE L'AGENDA SUIT LA PAGE (237) : elle affichait encore « 1/3 »,
  « 1/1 », sans nom de cheval. ⚠️ LA COUPE À 8 EST CONSERVÉE là, avec son
  « + N autres » : c'est une CARTE de liste, pas la page de consultation.
· MÉDAILLES (238), ses règles : 🏆 1er, 🥈 2e, 🥉 3e TOUJOURS ; 🏅 au-delà
  SEULEMENT si la place est dans le TOP 8 *ET* le PREMIER QUART des partants
  (4e sur 32 oui, 4e sur 12 non, 6e sur 20 non). Un 1er sur 1 garde son
  trophée (« oui trophée »). SANS nombre de partants : rien au-delà du 3e.
  ⚠️ Règle dans UN SEUL helper global `hypeRecompense(place, partants)`,
  utilisé par la page ET la carte, pour qu'elles ne divergent jamais.
  ⚠️ EMOJI EN ÉCHAPPEMENT \uD83C\uDFC6 etc., jamais en caractère (§3).
  ⚠️ ÉCARTÉ : sa maquette dessine des médailles sur TOUTES les places. Les
  emoji s'arrêtent au bronze, d'où sa règle. La fidélité complète demanderait
  des médailles DESSINÉES — un vrai petit chantier.
· LE NOM DU CHEVAL EST UN LIEN vers sa fiche (239), dans la page ET dans la
  carte de l'agenda. ⚠️ AUCUNE ROUTE NOUVELLE : chemin existant
  `window.__chevalOuvert` + `setEcran("cheval")`. `stopPropagation` sinon le
  résultat s'ouvrait aussi.
  ⚠️ PAS DE LIEN SUR LE CAVALIER, ET C'EST STRUCTUREL : la colonne
  `cavalier` des résultats FFE n'est qu'un NOM EN TEXTE, sans identifiant.
  Un lien supposerait de deviner de qui il s'agit. Pour l'avoir un jour, il
  faudrait une vraie correspondance en base.
· DEUX RETOUCHES PROPOSÉES ET ÉCARTÉES PAR ELLE (« non c'est ok ») :
  « 1ER » en exposant, et « LIAM ROUX » affiché en « Liam Roux ».

────────────────────────────────────────────────────────────
15. 18-19/09 — L'IMPORT FFE SAIT LIRE UN TÉLÉMAT DE CAVALIÈRE
────────────────────────────────────────────────────────────
🟥 LE PLUS GROS CHANTIER DE CES DEUX JOURS. Builds 240 → 245, plus le
fichier séparé `hype-import-ffe.js`.

🟥 DEUX FICHIERS À POUSSER ENSEMBLE, TOUS DEUX À LA RACINE : index.html ET
hype-import-ffe.js. ⚠️ LE LECTEUR DE TÉLÉMAT NE VIT PAS DANS index.html — ne
jamais y chercher la lecture du PDF.
🟥🟥 ET LA RÈGLE QUI VA AVEC, ÉCRITE DANS LE CODE (~46887) : le fichier est
chargé avec `hype-import-ffe.js?v=NN`. TOUTE LIVRAISON DE CE FICHIER DOIT
INCRÉMENTER CE NUMÉRO, sinon l'iPhone sert l'ANCIEN lecteur depuis son cache
et le correctif semble ne rien faire. L'assistant l'a OUBLIÉ au build 240.
Actuellement à v18.

SON DIAGNOSTIC, ET IL ÉTAIT JUSTE : « l'outil ne comprend pas quand c'est
pris depuis le cavalier qu'il doit prendre le nom du cavalier en haut de la
fiche ». Confirmé sur ses DEUX PDF réels (Evan.pdf et Riri_.pdf) :
· télémat d'un CHEVAL : chaque bloc porte « Monté par EVAN ROUX » ;
· télémat d'une CAVALIÈRE : ce champ N'EXISTE PAS. Chaque bloc porte
  « Sur RIZOTTO D'EMERY » (le CHEVAL), et le nom du cavalier n'est écrit
  QU'UNE FOIS, en en-tête : « ROUX EVAN — 4638006J ».

⚠️⚠️ CE N'ÉTAIT PAS QU'UN NOM MANQUANT — DES RÉSULTATS ÉTAIENT PERDUS.
La clé de dédoublonnage était date + épreuve + concours + cavalier. Dans UN
SEUL télémat de cavalière, deux chevaux courant la MÊME épreuve le MÊME jour
donnaient deux lignes de clé IDENTIQUE (cavalier vide des deux côtés) : la
seconde était jetée EN SILENCE. LES DEUX RÉSULTATS DE CRUIBHIN DES 12 ET
13/09 N'EXISTAIENT NULLE PART dans sa base avant ce correctif.

LES CORRECTIFS :
1. Nouvelle étiquette « Sur » dans le lecteur → le CHEVAL de chaque ligne
   est lu (`cheval_pdf`).
2. Le cavalier est lu dans l'EN-TÊTE quand « Monté par » est absent. Motif
   STRICT : NOM PRÉNOM suivi d'une licence (7 chiffres + 1 lettre), tiret
   optionnel. Sans cette forme, le cavalier reste VIDE — jamais de nom
   deviné, jamais de repli sur le compte connecté.
   ⚠️ LA RECHERCHE PARCOURT TOUT LE DOCUMENT jusqu'au premier « Date … » :
   son télémat commence par LA LISTE DES 25 CAVALIERS DU CLUB, et son nom
   n'arrive qu'après. Une limite à 40 lignes (build 240) l'avait manqué.
3. ⚠️ LES DEUX TÉLÉMATS N'ÉCRIVENT PAS LE NOM DANS LE MÊME ORDRE :
   « ROUX EVAN » en en-tête contre « EVAN ROUX » dans « Monté par ». Laisser
   les deux formes aurait RECRÉÉ les doublons. Le DERNIER MOT de l'en-tête
   passe donc devant. LIMITE ASSUMÉE : un prénom composé en deux mots
   (« JEAN PIERRE ») serait mal remis dans l'ordre — première chose à
   regarder si un cavalier réapparaît en double.
4. LE CHEVAL ENTRE DANS LA CLÉ de dédoublonnage.

RANGEMENT MULTI-CHEVAUX (sa demande : « ça serait bien qu'il mette à jour les
autres chevaux aussi ») : chaque ligne part sur la fiche de SON cheval.
· RECHERCHE À DEUX NIVEAUX, son choix exact : « tous ceux de Hype mais en
  priorité ceux de l'écurie ». NIVEAU 1 = ses chevaux ET ceux des cavalières
  de ses DEUX écuries (via `hypeCavaliersDuClub`, appelé avec
  "id, pseudo, ecurie, ecurie2" — les colonnes de filtrage, sans quoi liste
  vide EN SILENCE). NIVEAU 2 = tout Hype, par requêtes ciblées sur les noms
  non reconnus, jamais la table entière.
· ⚠️ LA PRIORITÉ TRANCHE : un cheval de l'écurie l'emporte sur un homonyme
  ailleurs, SANS poser la question. Son choix explicite.
· ⚠️⚠️ RÈGLE DE SÛRETÉ, LA PLUS IMPORTANTE : une ligne dont le cheval n'est
  PAS reconnu, ou dont PLUSIEURS chevaux portent le nom, N'EST PAS ÉCRITE.
  JAMAIS de repli sur la fiche ouverte. C'est ce repli qui avait mis 72
  lignes de Rizotto sur la fiche de Vallières.
· L'écran de fin DIT où les lignes sont parties, et DISTINGUE les deux cas :
  « je ne sais pas duquel il s'agit » / « aucun cheval de ce nom chez toi,
  crée sa fiche puis relance ».
· ⚠️ LE VERROU D'IDENTITÉ NE PROTÈGE PAS un télémat de cavalière : il cherche
  le nom du cheval au-dessus d'une ligne « … né le JJ/MM/AAAA », absente de
  ce type de PDF. Il ne trouve rien et NE REFUSE RIEN. Le routage le rend
  largement inutile, mais NE PAS le considérer comme protecteur ici.
· LE NOM DU CHEVAL S'AFFICHE EN TURQUOISE SUR CHAQUE LIGNE de l'écran de
  relecture, AVANT validation. Sa demande, répétée trois fois (« ça propose
  toujours pas les chevaux concernés »). ⚠️ MALENTENDU LEVÉ : le rangement ne
  PROPOSE rien, il range et n'affiche un message qu'à la FIN.

✅ VALIDÉ PAR LES DONNÉES : son import du 18/09 à 22h31 a écrit les DEUX
résultats de Cruibhin sur la fiche de CRUIBHIN.

────────────────────────────────────────────────────────────
16. 🟥 EN PRÉPARATOIRE, TOUS LES SANS-FAUTE SONT 1ᵉʳˢ
────────────────────────────────────────────────────────────
🟥 RÈGLE MÉTIER DONNÉE PAR ELLE LE 19/09, ET ELLE INVALIDE PRESQUE TOUTE
RECHERCHE DE DOUBLONS : dans une épreuve PRÉPARATOIRE il n'y a pas de
classement au chrono — TOUS les sans-faute sont déclarés PREMIERS. Deux
cavalières peuvent donc être légitimement « 1ᵉʳ sur 56 » le même jour, dans
la même épreuve, au même concours.

CE QUE ÇA A ÉVITÉ : une recherche regroupant sur (cheval, date, épreuve,
place, partants) avait remonté 11 groupes. Après sa remarque, presque tous
sont de VRAIS résultats — Daphné Velleda 1ᵉʳ sur 56 attribué à CHLOE
BERTHIER *et* ILONA HUGOT, Vallieres, Cruibhin, Elfe de Feinn…
🟥 SANS SA PHRASE, L'ASSISTANT AURAIT PROPOSÉ D'EFFACER DES RÉSULTATS RÉELS
DE SES CAVALIÈRES. Deuxième fois que ça se joue (cf. les deux victoires à
24 h d'écart de l'entrée 156).

→ TOUTE DÉTECTION DE DOUBLON doit écarter les préparatoires, ou exiger une
différence sur autre chose que la PLACE, qui ne distingue rien là.
→ MÉTHODE À REPRENDRE TELLE QUELLE : (1) une requête qui LISTE ; (2) une qui
MONTRE les lignes visées par leur id, avec contrôle explicite ; (3) seulement
ensuite un DELETE par ids NOMMÉS un par un, aucun critère.

DOUBLONS NETTOYÉS LE 19/09 (par elle, en base) :
· les 4 de RIZOTTO D'EMERY (12 et 13/09, Poney 2 et 3 Vitesse), nés des
  imports du 14/09 (sans cavalier lu) puis du 18/09. Conservées : celles
  portant « EVAN ROUX ». Ids supprimés : 10447c90…, c766e7bd…, 5149c799…,
  f0609bc0…
· celui de BORÉALIS DE FEINN (28/04/2024, HDL JUMP, Amateur 2 Spéciale au
  chrono, 5ᵉ sur 12) : id 5c3cb382…, la première écrite conservée.
  ⚠️ PISTE OUVERTE : les deux écritures avaient 17 SECONDES d'écart avec une
  clé IDENTIQUE. Elle n'aurait pas dû passer. Piste : deux imports lancés
  coup sur coup, le second lisant la base avant que le premier ait écrit.
  SI ÇA SE REPRODUIT, il faudra une contrainte d'unicité EN BASE. Ne pas y
  toucher sans un cas reproduit.
· CRUIBHIN COMPLÉTÉ : les deux 4ᵉ sur 4 ont reçu « EVAN ROUX » (écrites
  avant le correctif). UPDATE ciblé avec garde `cavalier = ''`.
· ÉTAT FINAL VÉRIFIÉ : 11 lignes sur septembre 2026, toutes justes.
· ⚠️ FAUX POSITIF À IGNORER : « Elfe », 3 lignes sans date ni épreuve. Ce
  sont les 3 résultats orphelins déjà documentés, sur une fiche supprimée.
  SA DÉCISION EST DE NE RIEN Y RATTACHER.

⚠️ LE RATTACHEMENT DU NOM FFE — À SAVOIR : les résultats n'apparaissent sur
la page d'une cavalière QUE si son nom FFE est relié à son compte dans
`cavaliers_ffe`. Avant le 19/09, SEULES deux lignes existaient (BLANDINE
PRONOST, LIAM ROUX) : les résultats d'Evan étaient en base, bien rangés, mais
INVISIBLES sur sa page. ⚠️ L'ÉCRAN DE RATTACHEMENT EST RÉSERVÉ AUX
MODÉRATRICES (`hype_est_moderatrice`) : une cavalière NE PEUT PAS revendiquer
son nom elle-même. C'est Blandine qui le fait, par la tuile « Relier les
résultats FFE ». ELLE A RATTACHÉ EVAN le 19/09.

────────────────────────────────────────────────────────────
17. 19/09 — ÉCURIE, CAVALIER, ET UN INCIDENT DE CROIX
────────────────────────────────────────────────────────────
Builds 246 → 248. 246 confirmé par capture ; 247-248 à tester.

· ACTUALITÉS DE L'ÉCURIE (233) : les photos passent AU-DESSUS du texte, qui
  récupère toute la largeur. La colonne de photos à gauche écrasait le titre.
  ⚠️ VÉRIFICATION AVANT DE CODER, ET ELLE A CHANGÉ LA RÉPONSE : cette bande
  n'appartient PAS aux actualités, c'est le mode `vignette` de `MurHype`,
  utilisé à HUIT endroits. Trois options lui ont été présentées ; ELLE A
  CHOISI l'option cloisonnée (« 2 pour l'instant ») → nouvelle option
  `photosEnHaut`, UN SEUL APPELANT. Les sept autres écrans gardent le rendu
  d'avant, AU PIXEL PRÈS.
  ⚠️ SI ELLE DEMANDE UN JOUR DE L'APPLIQUER PARTOUT : retirer l'option et
  basculer la branche par défaut, ne pas laisser deux chemins.
· PAGE CAVALIER — LE RAIL « DERNIERS RÉSULTATS » (246) : reprend la carte de
  la page Écurie (médaille, date, PORTRAIT ROND du cheval, « 1er EVAN ROUX
  sur Rizotto d'Emery » avec le cheval en turquoise, concours, épreuve).
  L'ancienne carte n'affichait NI cavalier NI cheval. Ce bloc ne lisait ni
  `cheval_id` ni `cavalier` : ajoutés, plus UNE requête pour les noms et
  portraits. ⚠️ SANS PHOTO, PAS DE TROU : aucun portrait générique.
  ⚠️ LE RAIL PASSE SOUS LES CHEVAUX (sa demande) : il était au-dessus et
  CHEVAUCHAIT « Mes chevaux ». Titre « Derniers résultats » en Cinzel.
  ⚠️ LE NOM DU CAVALIER EST GARDÉ même sur sa propre page : question posée
  TROIS FOIS sans réponse, tranchée par l'assistant sur le rendu qu'elle a
  montré. Réversible en une ligne. Elle a dit le 19/09 : « laisse le nom du
  cavalier pour l'instant on verra ça plus tard ».
· LA DATE COMPLÈTE (jj/mm/aaaa) remplace l'année seule SUR LES DEUX RAILS
  (sa demande : « pour pas qu'on confonde les épreuves »). Sans date connue,
  l'année reste.
· ⚠️ FAUSSE ALERTE À CONNAÎTRE : elle a signalé « un nouveau rail résultats
  sur la page Cavalier, tu y as touché ? », pensant qu'un bloc masqué avait
  été rallumé. COMPARAISON DES FICHIERS FAITE : `BlocResultatsCavaliere`
  identique, 6 occurrences de part et d'autre. Rien n'avait été rallumé — le
  bloc est posé SANS CONDITION et était simplement VIDE ; le rattachement
  d'Evan l'a rempli pour la PREMIÈRE FOIS.
  → DEVANT TOUT BLOC « QUI RÉAPPARAÎT », vérifier d'abord s'il ne se remplit
  pas de données neuves.
· ⚠️ LE « 20 » TURQUOISE au-dessus des vignettes, C'EST LES CHEVAUX
  (`chevauxClub.length`), pas les cavalières. Elle l'a signalé mal placé
  (loin de son titre) puis a tranché : « non touche pas les chevaux ils vont
  bien ». NE PAS Y TOUCHER sans demande explicite.
· ⚠️ ET SUR LE TRI DU RAIL : l'assistant a cru à un défaut (des
  préparatoires de 2021 devant ses victoires récentes) et a proposé de
  trier par date. ELLE A CORRIGÉ : « c'est parce que j'ai pas tourné
  depuis ». Le tri est JUSTE. Ne pas y toucher.

🟥 L'INCIDENT DE LA CROIX (247) : « je crois que j'ai retiré des cavaliers de
l'écurie en cliquant par mégarde sur la petite croix, aucun élément de
confirmation rien », puis « faudrait faire confirmer là, j'ai miss clic et
paf ».
· VÉRIFIÉ EN BASE (`ecurie_cavaliers_exclus`) : DEUX exclusions — Soraya
  (VOULUE, « ça tombe bien ») et Chloé (ERREUR). Chloé a été remise par un
  DELETE de sa seule ligne. ⚠️ CETTE TABLE N'A PAS DE DATE : impossible de
  dater une exclusion, donc de savoir laquelle vient d'un mauvais toucher.
  À ajouter un jour.
· ⚠️ CE RETRAIT EST GLOBAL, visible de tout le monde — pas un masquage
  perso. Un seul toucher ne pouvait pas suffire.
· CORRECTIF : DEUX TOUCHERS, même mécanique que pour retirer une épingle
  (build 199). Le premier ARME et affiche un bandeau qui NOMME la cavalière ;
  le second exécute. Bouton « Annuler ». PAS DE CARTE À BOUTONS (§2).
· ⚠️ DÉCOUVERT AU PASSAGE : elle a dit « j'avais oublié que j'avais un outil
  pour régler le design des cavaliers de l'écurie, je ne sais même pas qui
  est en place ». L'encart mélange DEUX choses : les MEMBRES réels et des
  cavaliers CHOISIS pour la vitrine (`setChoisis`), plus des figurants de
  démonstration si la place reste. La croix retire des DEUX. À clarifier.

🟥 LE COMPTEUR DE MEMBRES (248) — 16 AU LIEU DE 20, PUIS RIEN.
Diagnostic en trois mesures, chacune ayant démoli la précédente :
1. Hypothèse « la fonction SQL oublie ecurie2 » → FAUSSE.
   `classement_ecuries()` fait un `cross join lateral (values (p.ecurie),
   (p.ecurie2))` avec `distinct` : elle compte DÉJÀ les deux.
2. Mesure : la fonction renvoie **20** pour Ecurie Feinn (SEP 21, Jardy 1).
   Le chiffre était JUSTE en base.
3. LA VRAIE CAUSE, dans l'app : la ligne était retrouvée par une ÉGALITÉ
   STRICTE (`g.nom === monClub`). La fonction renvoie des noms DÉTRIMÉS ; un
   espace de fin ou une casse différente, et la ligne n'était pas trouvée —
   l'app en FABRIQUAIT une à ZÉRO.
🟥 RÈGLE : DANS CE FICHIER, UN NOM DE CLUB NE SE COMPARE JAMAIS AVEC `===`.
Utiliser `hypeMemeClub` (tolérant), comme le fait déjà la grille des membres
— d'où l'incohérence : 20 cavalières affichées, « 16 membres » écrit dessous.
· LE NOMBRE DE CAVALIÈRES s'affiche enfin dans l'encart, sous le titre :
  total des membres, SECONDES ÉCURIES COMPRISES (sa demande explicite).
  ⚠️ SEUIL DE 5, SON IDÉE : en dessous on VOIT les cavalières et le chiffre
  n'apprend rien ; et une écurie qui démarre n'a pas « 2 » à côté de son
  titre. Chez elle (20) il s'affiche toujours.

⚠️ AUTRES CORRECTIFS DE CES DEUX JOURS :
· L'AFFICHE À LA CRÉATION D'UN RENDEZ-VOUS (232 puis 235). DEUX causes :
  (a) le bouton « Publier » n'attendait pas la fin de l'envoi → le
  rendez-vous partait sans photo ; (b) 🟥 LA VRAIE CAUSE : ce champ était le
  SEUL du fichier à enfermer le sélecteur de fichier dans une ÉTIQUETTE
  (`<label>`). L'étiquette l'active DÉJÀ, le `onClick` du cadre l'activait
  une SECONDE fois, et Safari iOS PERD le fichier choisi — sans apercu, sans
  erreur, rien.
  🟥 RÈGLE : DANS CE FICHIER, UN `<input type="file">` CACHÉ N'EST JAMAIS
  DANS UN `<label>`. Il est posé à côté, et un `<div>` l'ouvre par
  `ref.click()`. Tout champ photo qui « ne fait rien » : vérifier ça d'abord.
· 🟥 LE ZOOM QUI FAISAIT FUIR L'ÉCRAN D'IMPORT (244) : « quand on veut zoomer
  la page saute et on se fait renvoyer sur une autre page ». CAUSE : un
  pincement à deux doigts contient du mouvement HORIZONTAL, et le conteneur
  de l'import était un `div` NU, sans `data-noswipe` : le geste était lu
  comme un BALAYAGE et changeait d'onglet — en perdant l'import en cours.
  🟥 C'est la règle déjà écrite au §3, JAMAIS appliquée à cet écran. À
  vérifier sur TOUT écran monté hors du flux normal.
· MON CARNET EST GRISÉ (218, « Prochainement ») le temps de sa refonte, via
  un sixième argument facultatif de `ligneDeroulante`. ⚠️ NE PAS OUBLIER DE
  ROUVRIR L'ACCÈS : un argument à retirer. ⚠️ L'assistant lui a dit à tort
  qu'il y avait DEUX chemins vers Mon carnet : il n'y en avait QU'UN.

────────────────────────────────────────────────────────────
18. SQL PASSÉ LE 19/09 — À NE PAS REFAIRE
────────────────────────────────────────────────────────────
  create policy resultats_masquer_proprio_ou_admin on resultats
  for update using / with check : email admin (feinn@live.fr,
  malicia2008@hotmail.fr) OU propriétaire du cheval
  (chevaux.user_id = auth.uid()).

POURQUOI : la seule règle UPDATE existante était « je modifie MES lignes ».
Si Ambre importait un résultat sur Cooltax (à Ilona), NI Ilona NI Blandine ne
pouvaient le masquer. SON CHOIX : « que la propriétaire ou moi on peut
masquer des résultats du cheval ».
⚠️ L'ÉCRAN DE MASQUAGE EXISTAIT DÉJÀ (colonne `visible`, option « voir les
masqués »). Rien à coder.
⚠️ SON MODÈLE DE DROITS, tel qu'elle l'a formulé : N'IMPORTE QUELLE CAVALIÈRE
PEUT ÉCRIRE un résultat sur n'importe quel cheval (la règle INSERT ne vérifie
que l'appartenance de la LIGNE, pas du cheval) — mais SEULS la propriétaire
et l'admin peuvent MASQUER.

⚠️ RELEVÉ AU PASSAGE, NON CORRIGÉ : la règle SELECT `lecture resultats` vaut
`true` — TOUT utilisateur connecté lit TOUS les résultats, y compris ceux
d'un cheval marqué privé. La seconde règle qui vérifie la visibilité du
cheval ne sert donc à RIEN, la première l'emporte toujours. Pas urgent, mais
à savoir.
⚠️ ET `classement_ecuries()` compte résultats et podiums par le CLUB DU
CHEVAL (`chevaux.club`), pas par l'écurie de la cavalière : un résultat sur
un cheval sans club renseigné ne compte POUR PERSONNE.

────────────────────────────────────────────────────────────
19. 19/09 — NOM DE DOMAINE (en cours chez elle)
────────────────────────────────────────────────────────────
· `2hype.com` est PRIS. `2hype.fr` est LIBRE à 5,10 € la 1ʳᵉ année (~12 €
  ensuite) chez Infomaniak. `horsehype.fr` (5,10 €) et `horsehype.com`
  (9,50 €) libres aussi, mais ELLE A ÉCARTÉ LE NOM (« c'est ridicule
  horsehype j'arrive pas »).
· CONSEILS DONNÉS : décocher « Domain Plus » à 4,90 €/an (inutile —
  l'anonymat est AUTOMATIQUE sur un .fr, et la protection de transfert est
  activée par défaut) ; acheter au nom de SA SOCIÉTÉ (le domaine devient un
  actif, la facture passe en charge) ; 🟥 GARDER `2hype.netlify.app` ACTIF
  après l'achat — tous les liens déjà envoyés aux cavalières passent par là.
· ⚠️ GANDI EST À ÉCARTER : renouvellement à 28,78 € pour un .fr, quatre fois
  le prix d'appel.
· ⚠️ NETLIFY : leur interface a changé (« Sites » → « Projects ») et la
  gestion des domaines est INTROUVABLE dans les menus du projet. Passer par
  la recherche « Search Netlify… » puis « Find a domain… ». Elle a dit « je
  déteste Netlify, super dur de s'y retrouver » — d'où le choix d'acheter
  ailleurs.
· ⚠️ SI ELLE ACHÈTE HORS NETLIFY : il faudra régler les DNS une fois
  (deux ou trois lignes à recopier). L'assistant a proposé de la guider sur
  capture. Non fait à ce jour.

────────────────────────────────────────────────────────────
20. 🟥 DEUX INCIDENTS DE MÉTHODE DU 18-19/09
────────────────────────────────────────────────────────────
🟥 1. LE MAUVAIS INDEX. Une livraison entière (hero + résultats de la page
d'un concours) a été codée sur l'index 218 alors qu'elle était au 228, dans
une conversation qui n'avait pas le fichier à jour. ELLE L'A ARRÊTÉE À TEMPS
(« ah mais attends t'es pas la bonne conv, t'avais pas le bon index »). Tout
a été refait sur le 228.
→ DEMANDER LE NUMÉRO D'INDEX **AVANT DE TOUCHER AU FICHIER**, pas seulement
avant d'analyser une capture.

🟥 2. LE SUIVI TRONQUÉ. L'assistant a refondu ce suivi DEUX FOIS le 19/09
(87 Ko puis 103 Ko → 26 Ko) SANS QU'ELLE LE DEMANDE, en gardant les pièges
techniques et en jetant l'objectif du projet (§13).
→ NE PAS RACCOURCIR UN SUIVI SANS SA DEMANDE : c'est un retrait sur
interprétation, ce que le §2 interdit. Et si on consolide un jour : GARDER
D'ABORD LES OBJECTIFS ET LES DÉCISIONS. Le code se relit ; un objectif ne se
retrouve nulle part.

TRAVERS RÉCURRENT À SURVEILLER : construire une hypothèse compliquée avant
de lire ce que la capture ou la donnée dit déjà. Trois fois le 16/09 au soir,
deux fois le 19/09 (le rail « rallumé », le tri du rail). LA MESURE D'ABORD,
L'EXPLICATION ENSUITE.

ET CE QUI A MARCHÉ, À REPRODUIRE : ses diagnostics métier valent mieux que
les hypothèses de l'assistant. La cause du bug d'import et la règle des
préparatoires viennent d'elle. Quand elle dit « c'est pas ça », abandonner
l'hypothèse au lieu de l'argumenter.

────────────────────────────────────────────────────────────
21. 19/09 — MUR SUR LES RENDEZ-VOUS À VENIR (build 249)
────────────────────────────────────────────────────────────
SA DEMANDE : « ajouter des infos et commentaires sur les événements à venir
aussi, genre pouvoir poster des photos avec horaires ». Options présentées :
A (brancher le mur existant) ou B (encadré « Infos et horaires » modifiable,
nouvelle colonne en base). ELLE A CHOISI A. B reste possible, non commencé.

LIVRÉ (index.html seul, le suivi n'était pas encore à jour de mon côté) :
· Dans FicheEvenementClub, sous la description et l'invitation, une partie
  « Échanges et photos » qui rend MurHype avec la cible « agenda:<id> »,
  exactement comme la page d'un rendez-vous PASSÉ (même teinte que le type
  d'événement, vignette, sansTitre, chargerEnPlus = hypePostsAgenda).
· Conséquence voulue : ce qui est publié AVANT l'événement reste en place
  quand la date passe — c'est le même mur, la même cible.
· Le mur n'est PAS rendu pendant l'édition de la fiche (deux formulaires
  superposés sinon).
· RIEN en base, AUCUN droit modifié : mêmes règles que le mur des passés.
  La croix de suppression d'un post est celle du build 226.
· À TESTER : ouvrir un rendez-vous à venir → la partie est là sous la
  description ; publier une photo ; rouvrir la fiche → elle est toujours là ;
  vérifier qu'une cavalière peut poster et n'efface que ses propres posts.

⚠️ RAPPEL DE MÉTHODE (incident évité ce jour) : elle avait envoyé un
index 248 alors que ma conversation en était au 228. J'ai REPARTI de SON
fichier après avoir vérifié qu'il contenait déjà mes builds 219 → 228
(onglets « Pour qui ? », mosaïque d'album, vidéo d'Apy, messages de
l'agenda, suppression des rendez-vous, correctif des 4 photos).

────────────────────────────────────────────────────────────
22. 19/09 — CARTES DU MUR : MÊME TAILLE, SANS RECADRAGE (build 250)
────────────────────────────────────────────────────────────
SON CONSTAT sur le mur d'un rendez-vous (capture 21 h 07, deux documents
d'horaires publiés) : « niveau design pas possible là on voit rien, c'est
même pas de la même taille ».

CAUSE, dans le mode `vignette` de MurHype : la colonne de photos était en
`alignSelf: stretch`, donc sa hauteur suivait la longueur du texte — chaque
carte avait une taille différente — et l'image était en `objectFit: cover`,
donc RECADRÉE : sur un tableau d'horaires, les colonnes étaient coupées.

DEUX OPTIONS MONTRÉES EN MAQUETTE : 1 = grande photo pleine largeur ;
2 = vignette carrée régulière. ELLE A CHOISI « 2 AVEC LÉGENDE ».

LIVRÉ AU 250 :
· Vignette CARRÉE FIXE de 96 px, identique sur toutes les cartes, arrondie,
  centrée verticalement ; hauteur de carte commune (118 px mini).
· Plusieurs photos : elles se partagent ce carré (2 côte à côte, 4 en carré)
  au lieu de tiers étirés.
· `objectFit: contain` + vignetteHypeContain(400, 400) : la feuille entière
  est visible sur fond sombre, plus aucun recadrage.
· LA LÉGENDE existait déjà et n'a pas eu besoin d'être ajoutée : le titre de
  la carte est la PREMIÈRE LIGNE du texte du message (« Photo » s'il n'y a
  pas de texte). Lui rappeler d'écrire une ligne avant de publier.
· ⚠️ PÉRIMÈTRE : le mode `vignette` sert à HUIT endroits (murs des
  rendez-vous, page Tout voir, fil d'un cheval...). Ils changent TOUS
  d'aspect. Le mode `photosEnHaut` (bandeaux, build 233) n'est pas touché.
· À TESTER : le mur du rendez-vous L'Étrier ; la page Tout voir ; le fil
  d'un cheval — vérifier que les cartes sont régulières et les documents
  lisibles.

ENCORE OUVERT, NON COMMENCÉ : retirer UNE SEULE photo d'une publication
(aujourd'hui la croix efface tout le post). Option A présentée et acceptée
dans le principe : une croix par photo, confirmation, proposition d'effacer
le post s'il ne reste ni photo ni texte. La règle UPDATE sur `commentaires`
existe depuis le 09/09, rien à passer en base.

────────────────────────────────────────────────────────────
23. 🟥 19/09 — RÉGRESSION DU 250 SUR LES ACTUALITÉS (corrigée au 251)
────────────────────────────────────────────────────────────
CE QUI S'EST PASSÉ : au 250, pour que ses documents d'horaires ne soient
plus coupés dans les vignettes du mur, j'ai mis `objectFit: contain` dans
`caseV`. Mais `caseV` est la case image COMMUNE aux deux dispositions du
mode vignette : le carré de gauche ET les bandeaux du mode `photosEnHaut`
(build 233, actualités de l'écurie). Les bandeaux ont donc perdu leur
recadrage : trous noirs, images de largeurs inégales. Elle l'a vu tout de
suite (« il s'est passé quoi sur ma fiche cheval ?? les images étaient
toutes de la même taille »).

CORRECTIF 251 : `contain` uniquement hors bandeaux. INSUFFISANT À SES YEUX.

🟥 SA RÉACTION, ET LA DÉCISION : « annule ça, je te demande de changer UNE
page pas 14 ». BUILD 252 = RETOUR EXACT AU 249 : la case image, la colonne
de photos et la hauteur de carte sont restaurées mot pour mot (vérifié :
plus aucune différence avec le 249 hors numéro de build). Le mur garde donc
son dessin d'avant, documents recadrés compris.

RÈGLE QUI EN DÉCOULE, NON NÉGOCIABLE : quand elle demande un changement
d'aspect sur UNE page, ne JAMAIS toucher à un composant partagé. Soit le
changement est porté par une option que SEULE cette page passe (motif déjà
employé pour `limite`, `entete`, `vignette`, `photosEnHaut`), soit on ne le
fait pas. Et le périmètre annoncé doit lister les écrans réellement touchés,
comptés dans le code, pas supposés.

RESTE DONC À FAIRE, SI ELLE LE VEUT : rendre les cartes régulières et les
documents lisibles SUR LE SEUL MUR DES RENDEZ-VOUS, via une nouvelle option
passée uniquement par cette page.

LEÇON, à ajouter aux pièges du §3 : dans MurHype, une fonction de rendu
d'image est partagée par PLUSIEURS dispositions. Avant d'y toucher, lister
qui l'appelle — ici deux modes, et le mode vignette sert à huit écrans. Le
périmètre annoncé (« le mur des rendez-vous ») était donc faux, et je le lui
avais présenté comme tel.

────────────────────────────────────────────────────────────
24. 19/09 — LÉGENDE APRÈS COUP SUR LE MUR D'UN RENDEZ-VOUS (build 253)
────────────────────────────────────────────────────────────
SA DEMANDE : « on peut pas modifier un post ? à chaque fois je suis obligée
de l'effacer pour modifier », puis « ma modif c'est justement de mettre une
légende ». Et la consigne qui encadre tout : « conserve les autres pages
comme elles étaient initialement, ne modifie QUE le mur des prochains
rendez-vous ».

CE QUI EXISTAIT DÉJÀ, et qui n'a donc PAS été recodé : le panneau de
modification (build 78) sait déjà changer le texte, RETIRER une photo et en
AJOUTER une, avec écriture vérifiée (.select(), 0 ligne = refus affiché).
Le seul verrou était le bouton : `btnModifV` n'apparaissait que si le
message avait DÉJÀ du texte, donc jamais sur une publication de photos
seules.

LIVRÉ AU 253, UNE SEULE LIGNE DE CONDITION + UNE PROP :
· `btnModifV` s'affiche aussi quand la page passe `editionSansTexte`.
· SEULE la fiche d'un rendez-vous (FicheEvenementClub → MurHype) la passe.
  Les sept autres écrans qui partagent ce dessin de carte sont inchangés —
  application directe de la règle écrite au §23 après l'incident du 250.
· Pour elle : sur le mur d'un rendez-vous, « Modifier » apparaît sur toutes
  ses publications ; elle y écrit la légende (= la première ligne du texte,
  qui devient le titre de la carte) et peut retirer une photo au passage,
  sans effacer le post.
· À TESTER : une publication de photos seules → « Modifier » présent →
  écrire une ligne → le titre de la carte change ; retirer une des photos →
  les autres restent ; vérifier que les actualités de l'écurie et la page
  Tout voir n'ont PAS de « Modifier » sur les posts sans texte.

RESTE OUVERT : rendre les documents lisibles et les cartes régulières SUR CE
SEUL MUR (via une option dédiée, jamais dans le composant partagé).

────────────────────────────────────────────────────────────
25. 19/09 — MESSAGERIE, ÉTAPE 1 (build 254)
────────────────────────────────────────────────────────────
CE QU'ELLE A VÉCU : depuis la fiche d'Evan, elle a tapé son message dans la
case de RECHERCHE de la feuille « Nouveau message » et a eu « Aucun cavalier
trouvé ». Son mot : « on comprend même pas qu'on doit aller le chercher ».
Relevé dans le code : cette feuille n'a QU'UN champ, celui du nom ; il n'y a
pas de case message. Le chemin fiche → conversation directe EXISTE déjà
(ouvrirMessageAvecVisite, window.__conversationOuverte) : à re-tester pour
savoir quel bouton elle avait touché.

LIVRÉ AU 254 (écran Messagerie uniquement) :
· Titre de la feuille : « Écrire à… » (son choix parmi 6 propositions).
· La LISTE est affichée sans rien taper : « MES ÉCURIES » d'abord
  (hypeCavaliersDuClub sur club/ecurie et club2/ecurie2, avec le nom du club
  sous chaque pseudo), puis « AUTRES CAVALIÈRES » (60 profils). La recherche
  ≥ 2 caractères garde EXACTEMENT l'ancien comportement.
· MASCOTTE APY (son image, détourée, images/APY_MESSAGES.png) : en grand sur
  l'écran vide (choix 1) et en fond très atténué derrière la liste
  (choix 3, opacity 0.1, pointerEvents none). Si le fichier manque, les deux
  disparaissent sans rien casser.
· Ligne d'un message NON LU surlignée (fond turquoise léger + bordure), comme
  sur la maquette 4, mais sans mascotte dessus.

FICHIER NOUVEAU À POUSSER : images/APY_MESSAGES.png (420 px, ~230 Ko).

DÉCIDÉ, PAS ENCORE FAIT (dans l'ordre) :
· Étape 2 : sélection multiple → « effacer pour moi » (option A : masquer
  côté elle seulement, l'autre garde sa conversation ; demande une marque en
  base) et envoi séparé à plusieurs (option A : chacune dans sa conversation
  privée, pas de groupe).
· Étape 3 : dessin des bulles et de la barre d'envoi.
· Vidéo d'arrivée d'un message : elle doit l'envoyer.
· Le « Chargement… » de l'écran finit par s'arrêter : lent, pas cassé.

────────────────────────────────────────────────────────────
26. 19/09 — MESSAGERIE, ÉTAPE 2 (build 255)
────────────────────────────────────────────────────────────
A. SÉLECTION MULTIPLE (sa demande : « sélectionner plusieurs conversations
   pour les effacer ou envoyer un message groupé », option A partout)
· Bouton « Sélectionner » à gauche du crayon ; en mode sélection, toucher une
  ligne la coche au lieu d'ouvrir la conversation.
· Barre d'actions EN HAUT de la liste (leçon du 226, jamais en bas) :
  « n sélectionnée(s) », « Écrire », « Effacer pour moi ».
· EFFACER POUR MOI : masquerConversation() en boucle, une confirmation qui
  dit clairement « l'autre personne garde la sienne ». RIEN À PASSER EN BASE :
  la colonne conversations_participants.historique_masque existait déjà et ne
  touche QUE ma propre ligne ; listerMesConversations la filtre déjà.
· ÉCRIRE À PLUSIEURS : une zone de texte, puis envoyerMessagePrive() dans
  CHAQUE conversation privée (option A : pas de groupe, elles ne se voient
  pas entre elles). Chaque envoi est vérifié ; les échecs sont recomptés et
  affichés (« Non envoyé à 2 / 5 »).
· Aucun droit, aucune policy touchés.

B. BANDEAU VIDÉO DE LA MESSAGERIE
· Elle : « il faut laisser la vidéo tourner en entier, elle s'arrête avant
  même qu'il arrive à la boîte aux lettres », et « le haut est coupé ».
· TROUVÉ (dans son hype-video.js, fourni par elle — pas supposé) : le bandeau
  appelait `hype-messagerie-poney.mp4`, version COURTE de 2 s coupée
  volontairement le 05/08 pour éviter le doublon avec le titre. La version
  complète est déjà en ligne dans sa vidéothèque sous
  `images/heybaby-messagerie` (.webm + .mp4). RIEN DE PLUS À POUSSER.
· Livré : source = images/heybaby-messagerie (webm puis mp4), hauteur du
  bandeau 120 → 190 px (son choix A, plus de rognage du poney), loop
  DÉSACTIVÉE (son choix : arrêt sur la dernière image), pause si le bandeau
  sort de l'écran, relance seulement si la vidéo n'est pas terminée.
· Le titre « MESSAGES » sous le bandeau est CONSERVÉ : elle ne croit pas que
  le mot soit incrusté dans la version longue, à confirmer en la regardant.
· Le poster images/heybaby-messagerie-poster.jpg n'existe peut-être pas : sans
  lui, le bandeau reste noir une fraction de seconde, rien de plus.

C. À TESTER : « Sélectionner » → cocher 2 conversations → « Écrire » → un
   message part dans chacune ; « Effacer pour moi » → elles quittent SA liste
   (vérifier depuis un autre compte que la conversation est toujours là) ;
   le poney va jusqu'à la boîte aux lettres, entier, et s'arrête.

D. RESTE : bulles et barre d'envoi (étape 3) ; la vidéo d'arrivée d'un message
   (elle a choisi B : animer seulement quand il y a des non-lus) — À FAIRE,
   maintenant qu'on sait quel fichier utiliser. Apy reste en fond en
   PERMANENCE (sa précision), même quand il y a du courrier.

────────────────────────────────────────────────────────────
27. 19/09 — MESSAGERIE, ÉTAPE 3 (build 256)
────────────────────────────────────────────────────────────
CONSTAT avant de coder : les bulles étaient DÉJÀ conformes à la maquette
(moi à droite, elle à gauche, coins arrondis, bouton d'envoi rond, barre de
rédaction fixe au-dessus de l'encoche). Il manquait uniquement le REPÈRE DE
TEMPS. Rien n'a donc été refait pour le plaisir.

LIVRÉ AU 256 (vue conversation uniquement) :
· Séparateur de jour centré quand le jour change : « Aujourd'hui », « Hier »,
  sinon « 12 sept. » (avec l'année si ce n'est pas l'année en cours).
· Heure sous chaque bulle (10 px, alignée du côté de la bulle).
· Aucune requête en plus : envoye_le arrive déjà avec chaque message.

RESTE SUR LA MESSAGERIE :
· Vidéo d'arrivée d'un message (son choix B : animer seulement quand il y a
  des non-lus, puis figer). Le fichier est connu : images/heybaby-messagerie.
· Le bouton photo de la barre de rédaction dit encore « Bientôt disponible » :
  envoyer une photo dans un message privé n'est PAS codé. À lui proposer.
· Étape 1 et 2 (254, 255) toujours NON TESTÉES par elle.

────────────────────────────────────────────────────────────
28. 🟥 19/09 — TROIS BUGS VUS SUR SON ENREGISTREMENT (build 257)
────────────────────────────────────────────────────────────
Enregistrement d'écran de 22 h 26, écran Messages, index 256.

1. 🟥 LE BANDEAU VIDÉO AVAIT DISPARU — MON ERREUR DU 255.
   J'avais remplacé le `src` par deux `<source>` (webm puis mp4). React
   attrape AUSSI l'événement `error` d'un `<source>` qui échoue, et mon
   repli mettait alors la hauteur du bandeau à 0 : plus de bandeau du tout.
   CORRIGÉ : retour à un `src` simple sur images/heybaby-messagerie.mp4. Le
   repli ne se déclenche plus que si la vidéo elle-même est introuvable.
   → LEÇON : dans React, `onError` sur un <video> se déclenche aussi pour ses
   <source> enfants. Ne jamais y mettre un repli destructeur (hauteur 0).

2. 🟥 LES DEUX ONGLETS GÉANTS (« Messages » / « Écuries & clubs ») — BUG
   ANTÉRIEUR À MES BUILDS (présent dans le 249). Les deux pastilles étaient
   des enfants DIRECTS de la colonne principale (flex column) : leur
   `flex: 1` les étirait EN HAUTEUR, d'où les deux gros blocs turquoise qui
   mangeaient la moitié de l'écran. Elle l'avait signalé le 19/09 à 21 h 56.
   CORRIGÉ : les deux pastilles sont dans une vraie rangée (flex row,
   flex: 0 0 auto). Aucun libellé ni couleur changés.

3. ✅ CE QUI MARCHE, vu sur la vidéo : Apy en fond, le bouton
   « Sélectionner », la barre « 0 sélectionnée(s) » avec Écrire / Effacer
   pour moi, le surlignage de la ligne d'Evan (non lu).

À TESTER : le poney doit réapparaître en haut, aller jusqu'à la boîte aux
lettres et s'arrêter ; les onglets doivent être deux petites pastilles.

────────────────────────────────────────────────────────────
29. 19/09 — SÉLECTION RÉPARÉE + ENVELOPPE SUR L'ACCUEIL (build 258)
────────────────────────────────────────────────────────────
1. 🟥 MON OUBLI DU 255 : en mode sélection, toucher une conversation
   l'OUVRAIT au lieu de la cocher. La sélection était donc impossible (elle :
   « quand je clique sur une conversation pour la sélectionner elle s'ouvre
   en grand »). CORRIGÉ : en mode sélection, un toucher coche/décoche, et une
   CASE À COCHER apparaît à gauche de chaque ligne.
   → LEÇON : ajouter un mode (sélection, édition…) impose de reprendre TOUS
   les gestes de l'écran, pas seulement d'ajouter la barre d'actions.

2. ENVELOPPE SUR L'ACCUEIL (son choix A) : le bouton messagerie du hero était
   dessiné avec DEUX TRAITS gris ; rien ne disait « courrier » (elle : « on
   comprend pas que c'est la messagerie »). Remplacés par une enveloppe SVG
   au trait, 20 px, qui s'allume en turquoise avec halo quand il y a des non
   lus ; la pastille du nombre est conservée. Pas de bulle de dialogue : ce
   serait un doublon avec Hey Baby dans la barre du bas.

3. ENCORE À COMPRENDRE, elle doit retester sur le 258 :
   · une conversation qui s'ouvre VIDE alors qu'elle contenait un message
     (aucune hypothèse retenue pour l'instant — ne pas deviner) ;
   · l'onglet « Messages » qui la renvoyait à l'accueil : très probablement
     l'onglet géant qui débordait sur la flèche de retour (corrigé au 257),
     à confirmer.

────────────────────────────────────────────────────────────
30. 🟥 19/09 — LA VIDÉO DE LA VIDÉOTHÈQUE N'EST PAS EN LIGNE (build 259)
────────────────────────────────────────────────────────────
CE QUI S'EST PASSÉ : au 255 j'ai fait pointer le bandeau de la messagerie
vers `images/heybaby-messagerie.mp4`, trouvé dans SON hype-video.js. VÉRIFIÉ
PAR ELLE dans Safari : cette adresse renvoie « Page not found ». Le fichier
est RÉFÉRENCÉ dans la vidéothèque mais n'a jamais été poussé sur Netlify.
Mon repli mettait alors la hauteur du bandeau à 0 : plus de bandeau du tout,
et tout l'écran remontait sous l'horloge (elle : « c'est encore pire, on voit
plus du tout la vidéo ni Sélectionner ni l'image en fond »).
⚠️ CONFIRMÉ AUSSI : images/APY_MESSAGES.png EST bien en ligne (238 Ko), et
`hype-messagerie-poney.mp4` marche (« l'ancienne marche oui »).

CORRIGÉ AU 259 :
· Source du bandeau = hype-messagerie-poney.mp4 (celle qui existe), hauteur
  190 px conservée, pas de boucle (arrêt sur la dernière image).
· En cas d'échec, on cache SEULEMENT la vidéo : le bandeau garde sa hauteur
  et son fond sombre. Plus rien ne remonte.

→ RÈGLE À GARDER : ne jamais écrire un repli qui change la HAUTEUR d'un bloc
  de mise en page ; cacher l'élément fautif, pas son conteneur. Et vérifier
  qu'un fichier est EN LIGNE (ouvrir l'URL) avant de faire pointer le code
  dessus — être référencé dans un fichier .js ne veut pas dire déployé.

RESTE : si elle veut la version longue du poney, elle doit me l'envoyer ici
ou la déposer elle-même dans images/.

────────────────────────────────────────────────────────────
31. 19/09 — PAGE D'UN RENDEZ-VOUS : PRÉPARATIFS (build 259)
────────────────────────────────────────────────────────────
· ✅ SQL PASSÉ PAR ELLE : club_agenda.mis_en_avant (jsonb) — « Success ».
· Deux options ajoutées à MurHype, passées PAR LA SEULE fiche d'un
  rendez-vous (aucun autre écran ne change) :
  - `exclureIds` : retire du fil les publications montrées dans les carrés
    (sa règle : « on doit pas les voir deux fois ») ;
  - `onMettreEnAvant` : lien « Mettre en avant » sur une carte, pour qui peut
    déjà gérer ce post. Le choix sera enregistré sur le RENDEZ-VOUS, donc
    aucun droit d'écriture sur les messages des autres.
· RESTE À CODER (prochain build) : l'affiche réduite en gardant ses
  proportions, le texte centré, les DEUX CARRÉS avec légende, la question
  « laquelle remplacer ? » quand une troisième est mise en avant.

────────────────────────────────────────────────────────────
32. 19/09 — LA VIDÉO COMPLÈTE DU PONEY (build 260)
────────────────────────────────────────────────────────────
Elle a fourni les fichiers : heybaby-messagerie.mp4 (5 s, 560×416, 219 Ko) et
hype-messagerie-poney.mp4 (2 s, 966×720, celle déjà en ligne).

RELEVÉ IMAGE PAR IMAGE de la version longue : le poney arrive à la boîte aux
lettres, ET le mot « MESSAGERIE » est INCRUSTÉ dans la vidéo, avec une
pastille « 1 » à la fin. Définition plus faible que l'ancienne (560 px de
large contre 966) : un peu moins nette en pleine largeur, assumé.

LIVRÉ AU 260 :
· FICHIER NOUVEAU À POUSSER : images/heybaby-messagerie.mp4.
· Le bandeau joue cette version complète, sans boucle (arrêt sur la dernière
  image, celle avec la boîte aux lettres).
· REPLI EN DEUX TEMPS, sans jamais toucher à la hauteur du bandeau : fichier
  absent → on retombe sur hype-messagerie-poney.mp4 (2 s, déjà en ligne) ;
  absente aussi → on cache seulement la vidéo.
· LE TITRE « MESSAGES » SOUS LE BANDEAU EST RETIRÉ (le mot est dans la
  vidéo). La flèche de retour, « Sélectionner » et le crayon restent.

À TESTER : le poney va jusqu'à la boîte aux lettres et s'arrête ; le mot
n'apparaît qu'une fois ; la flèche de retour fonctionne toujours.

────────────────────────────────────────────────────────────
33. 19/09 — BANDEAU : LA VIDÉO ENTIÈRE (build 261)
────────────────────────────────────────────────────────────
· ✅ CONFIRMÉ PAR ELLE sur le 260 : elle a pu EFFACER des conversations
  (sélection multiple OK), et la vidéo complète joue.
· 🟥 RESTAIT : « la vidéo est toujours coupée en haut, faut franchement la
  redescendre ». CAUSE : le bandeau avait une hauteur FIXE (190 px) alors que
  la vidéo fait 560×416 ; étirée en pleine largeur elle mesure ~290 px de
  haut, d'où la tête du poney hors cadre.
· CORRIGÉ AU 261 : le bandeau prend les PROPORTIONS de la vidéo
  (aspect-ratio 560/416) et la vidéo est en `contain`. Plus rien n'est rogné,
  en haut comme en bas (la boîte aux lettres reste visible).
· Conséquence assumée : bandeau plus haut, la liste commence plus bas. Si
  elle le trouve trop grand, on réduira en recadrant volontairement (et on
  saura alors quoi sacrifier).

────────────────────────────────────────────────────────────
34. 19/09 — APY RESTE EN PLACE (build 262)
────────────────────────────────────────────────────────────
Elle : « le poney en fond reste en bas, du coup quand il y a beaucoup de
messages on ne le voit pas ; on peut le laisser s'afficher en bas de la page
affichée et qu'il reste en place même quand la liste se déroule ? »

CAUSE : l'image était posée AU FOND DU CONTENU de la liste (position absolute
dans le conteneur qui défile) : avec une vingtaine de conversations, elle se
retrouvait très loin sous l'écran.

CORRIGÉ AU 262 : position FIXED, calée sur l'écran, juste au-dessus de la
barre du bas (92 px + encoche), à droite. Elle ne bouge plus quand la liste
défile, reste derrière les cartes (zIndex 0 contre 1) et insensible au
toucher. Opacité 0,1 : à ajuster d'un chiffre si elle la veut plus visible.

────────────────────────────────────────────────────────────
35. 19/09 — PAGE D'UN RENDEZ-VOUS : LA MISE EN PAGE DEMANDÉE (build 263)
────────────────────────────────────────────────────────────
SA DEMANDE (mot pour mot, 19/09) : l'affiche en haut mais PLUS PETITE et
toujours verticale, le commentaire centré juste dessous (heure de départ,
rendez-vous), puis DEUX CARRÉS de même taille côte à côte avec leur légende
dessous (typiquement les horaires et l'ordre de passage), et le fil de
publication SEULEMENT en dernier, sans y revoir ces deux publications.

LIVRÉ AU 263, sur la fiche d'un rendez-vous UNIQUEMENT :
· AFFICHE : hauteur plafonnée à 34 % de l'écran, centrée, `contain` : une
  affiche verticale reste verticale, rien n'est coupé (sa question explicite).
· DESCRIPTION centrée sous l'affiche.
· DEUX CARRÉS : grille 1/1, image en `contain` (un document reste lisible),
  légende dessous = PREMIÈRE LIGNE du texte de la publication, « Photo »
  sinon ; un toucher ouvre en grand (PhotoZoomable). Lien « Retirer » sous
  chaque carré pour la gestionnaire. RIEN n'est affiché s'il n'y a aucune
  mise en avant (son choix : pas de cadres vides).
· LE FIL reçoit `exclureIds` : les deux publications n'y apparaissent plus
  (« on doit pas les voir deux fois »).
· « Mettre en avant » sur chaque carte du fil (gestionnaire seulement). Au
  delà de deux, l'appli DEMANDE laquelle remplacer, avec le titre des deux
  en boutons (son choix, contre le remplacement silencieux).
· Enregistrement dans club_agenda.mis_en_avant (jsonb, SQL passé par elle).
  Écriture VÉRIFIÉE : refus ou 0 ligne → message affiché, jamais avalé.

À TESTER : mettre les horaires en avant, puis l'ordre de passage → deux
carrés de même taille, légendes lisibles ; en mettre un troisième → la
question apparaît ; vérifier qu'une cavalière ne voit ni « Mettre en avant »
ni « Retirer », mais bien les deux carrés.

────────────────────────────────────────────────────────────
36. 🟥 19/09 — LA VIDÉO N'AVAIT JAMAIS ÉTÉ CHANGÉE (build 264)
────────────────────────────────────────────────────────────
1. 🟥 MON ERREUR DE MÉTHODE : au 260, mon script de modification s'est arrêté
   sur une erreur AVANT d'écrire le fichier ; je n'ai relancé que la partie
   « retirer le titre » et le numéro de build. Résultat : le bandeau pointait
   TOUJOURS sur hype-messagerie-poney.mp4 (2 s), alors que je lui avais
   annoncé la version longue et fait pousser le fichier. D'où son « la vidéo
   s'arrête avant la fin » : c'était la version courte, qui s'arrête en
   effet avant la boîte aux lettres.
   → RÈGLE : après chaque script, VÉRIFIER dans le fichier que le changement
   annoncé y est (un grep), pas seulement que node --check passe.
   CORRIGÉ AU 264 : src = images/heybaby-messagerie.mp4, repli sur l'ancienne
   si absente, puis masquage de la seule vidéo. preload « auto » et relance
   unique si iOS coupe la lecture.

2. LE BANDEAU DESCEND SOUS L'HORLOGE (« il faudrait descendre encore la
   vidéo ») : il commençait à y = 0, le haut de l'image passait derrière
   l'heure et les icônes. Ajout de env(safe-area-inset-top) + 6 px au-dessus.

3. LES CARTES LAISSENT VOIR APY (« le poney au fond se voit très mal, il
   faudrait que les onglets de conversation soient dégradés transparents et
   beaucoup plus transparents sur la droite ») : fond des cartes passé en
   DÉGRADÉ horizontal, opaque à gauche (texte lisible) et presque
   transparent à droite. Apy passe de 0,1 à 0,3 d'opacité et de 190 à
   210 px. Les lignes non lues gardent leur teinte turquoise, en dégradé
   aussi.

────────────────────────────────────────────────────────────
37. 19/09 — « JE VIENS » SUR UN RENDEZ-VOUS (build 265)
────────────────────────────────────────────────────────────
✅ ELLE VALIDE LA MESSAGERIE : « c'est parfait la messagerie merci ». Seul
   reste demandé : descendre encore un peu la vidéo du haut → marge au-dessus
   du bandeau passée de safe-area + 6 px à safe-area + 26 px.

✅ SQL PASSÉ PAR ELLE (« Success ») : table agenda_inscriptions
   (agenda_id → club_agenda on delete cascade, user_id default auth.uid(),
   cree_le, clé primaire (agenda_id, user_id)). RLS : lecture ouverte à tous ;
   INSERT seulement pour soi (user_id = auth.uid()) ; DELETE par la personne
   elle-même OU la gestionnaire du club (hype_est_proprietaire_club sur
   club_agenda.club_clef).
   ⚠️ Supabase affichait ce soir-là « We are investigating a technical issue » :
   en cas de comportement bizarre, penser à leur page d'état.

LIVRÉ AU 265, sur la fiche d'un rendez-vous :
· Bouton « Je viens » (coché ✓ quand on est inscrite, un second toucher
  désinscrit), sous le texte du rendez-vous, avant les deux carrés.
· Le NOMBRE d'inscrites à côté, visible par tout le monde ; un toucher ouvre
  la LISTE des noms avec avatar. La gestionnaire a une croix pour retirer
  quelqu'un.
· Écritures vérifiées (.select) : refus ou 0 ligne → message affiché.

PROCHAINE MARCHE (déjà décidée) : « Ajouter à mon agenda » — un bouton qui
crée l'événement dans le calendrier du téléphone de la cavalière avec deux
rappels (reconnaissance et départ). PRÉALABLE : il n'existe qu'UNE case
« heure » sur un rendez-vous ; il faudra soit ajouter heure de reco et heure
de départ, soit décider qu'elle les écrit dans la description. À trancher
avec elle.

────────────────────────────────────────────────────────────
38. 19/09 — BANDEAU : PLUS PETIT ET FONDU DE FIN (build 266)
────────────────────────────────────────────────────────────
Elle : « juste après, quand la vidéo se termine, ça fait un peu chargé
visuellement ; est-ce que l'image du poney qui se fige pourrait petit à petit
se fondre et devenir plus discrète comme l'autre en fond ? Ou peut-être
qu'on peut mettre la vidéo un peu plus petite et laisser un peu plus
d'espace ? » → SON CHOIX : C (les deux).

LIVRÉ AU 266 :
· Bandeau à 78 % de la largeur, centré, avec 14 px d'air en dessous.
· À la fin de la vidéo (onEnded), la dernière image s'atténue en 2 s jusqu'à
  0,22 d'opacité : elle devient une trace discrète, comme Apy en fond. Elle
  NE disparaît pas (l'image finale reste reconnaissable) et le bandeau garde
  sa place — rien ne remonte sous les doigts pendant la lecture de la liste.
· Marge du haut inchangée (safe-area + 26 px, réglée au 265 à sa demande).

────────────────────────────────────────────────────────────
39. 19/09 — RÉGLAGE FIN DU BANDEAU (build 267)
────────────────────────────────────────────────────────────
Après le 266, elle : « vidéo plus grande et image qui reste quand même plus
visible pour la messagerie ».
· Largeur du bandeau : 78 % → 94 % de l'écran.
· Opacité de l'image finale après le fondu : 0,22 → 0,6 (elle reste bien
  visible, mais ne « charge » plus l'écran comme à pleine lumière).
· Inchangés : marge du haut (safe-area + 26 px), air de 14 px en dessous,
  fondu de 2 s, bandeau qui garde sa place.

CHANTIER HORAIRES — TRANCHÉ ET LIVRÉ AU 268, voir §40. (Historique :)
· QUATRE heures décidées, dans cet ordre : embarquement, départ,
  reconnaissance, début de l'épreuve. Une case vide ne s'affiche pas (règle
  confirmée avec elle).
· SQL À PASSER (donné, pas encore exécuté) :
  alter table public.club_agenda add column if not exists heure_embarquement text;
  alter table public.club_agenda add column if not exists heure_depart text;
  alter table public.club_agenda add column if not exists heure_reco text;
  alter table public.club_agenda add column if not exists heure_epreuve text;
· DISPOSITION : trois maquettes montrées — A deux par ligne, B programme de
  la journée ligne par ligne, C rail qui défile (déconseillée). NON TRANCHÉ.
· La case « heure » actuelle : la garder comme heure générale ou la
  supprimer ? NON TRANCHÉ.

────────────────────────────────────────────────────────────
40. 19/09 — LES QUATRE HEURES D'UN RENDEZ-VOUS (build 268)
────────────────────────────────────────────────────────────
✅ SQL PASSÉ PAR ELLE (« Success ») : club_agenda + heure_embarquement,
   heure_depart, heure_reco, heure_epreuve (text).

SES DÉCISIONS : quatre heures dans l'ordre de la journée ; l'heure générale
existante est CONSERVÉE (elle sert aux stages et sorties) ; une case vide ne
s'affiche pas ; PAS de carrousel (elle l'avait proposé, écarté ensemble :
« ça cache l'information sans le dire ») ; une ou deux heures → CENTRÉES sur
une ligne, quatre → deux lignes de deux, centrées aussi.

LIVRÉ AU 268 :
· Les quatre champs dans le formulaire de CRÉATION et dans celui de
  MODIFICATION, tous facultatifs, avec exemples (7h30, 8h40, 9h00, 9h30).
· ajouterAgendaClub et modifierAgendaClub transmettent les quatre colonnes
  (liste blanche de modifierAgendaClub complétée, sinon elles seraient
  silencieusement ignorées).
· Sur la page du rendez-vous : pastilles 🚚 Embarquement · 🚗 Départ ·
  👣 Reconnaissance · 🏇 Épreuve, centrées, qui se replient (flexWrap), au-
  dessus de « Je viens ».
· À TESTER : créer un rendez-vous avec une seule heure (une pastille
  centrée), puis modifier pour en ajouter trois (deux lignes de deux).

PROCHAINE MARCHE : « Ajouter à mon agenda » — créer l'événement dans le
calendrier du téléphone avec deux rappels (reconnaissance et départ), qui
liront désormais heure_reco et heure_depart.

────────────────────────────────────────────────────────────
41. 19/09 — « AJOUTER À MON AGENDA » (build 269)
────────────────────────────────────────────────────────────
Rappel du plan décidé avec elle : (A) « Je viens » ✅ 265, (B) l'agenda du
téléphone ✅ 269, (C) les notifications envoyées par Hype — CHANTIER À PART,
non commencé (service worker + clés côté Supabase + PWA installée sur
l'écran d'accueil, obligatoire sur iPhone).

LIVRÉ AU 269, sur la fiche d'un rendez-vous, à côté de « Je viens » :
· Bouton « 📅 Ajouter à mon agenda ». Il fabrique un fichier .ics SUR LE
  TÉLÉPHONE (aucune donnée ne part ailleurs) et le fait ouvrir par l'app
  Calendrier. Ensuite c'est le téléphone qui sonne, même Hype fermé et sans
  réseau — d'où le choix de cette solution avant les notifications.
· Début de l'événement = la PLUS TÔT des heures saisies (embarquement,
  départ, reco, épreuve, heure générale), sinon 9 h. Fin = 3 h après
  l'épreuve, ou 3 h après le début.
· RAPPELS : un à l'heure de RECONNAISSANCE et un à l'heure de DÉPART si
  elles sont remplies ; sinon un la veille et un une heure avant.
· Lieu, description et les quatre heures sont recopiés dans l'événement.
· Heures acceptées telles qu'elle les écrit : « 8h40 », « 08:40 », « 8 h 40 ».

À TESTER SUR IPHONE : ouvrir un rendez-vous, toucher le bouton → Safari
propose d'ouvrir le fichier dans Calendrier → vérifier les deux alertes.
⚠️ Si iOS bloque le téléchargement dans la PWA installée, il faudra passer
par un lien webcal:// ou une page intermédiaire — à traiter si ça arrive.

────────────────────────────────────────────────────────────
42. 🟥 19/09 — LA PAGE ÉCURIE PLANTAIT (build 270)
────────────────────────────────────────────────────────────
SA CAPTURE (23 h 19) : écran « Un caillou dans le sabot », écran = guilde,
« ReferenceError : Can't find variable: tnT », pile dans MurHype.

CAUSE, introduite par MOI au 259 : dans le bouton « Mettre en avant » ajouté
à la carte de MurHype, j'ai écrit la couleur `tnT`. Ce nom existe dans UN
AUTRE composant (AlbumsCheval) ; dans MurHype la teinte s'appelle TQmCl.
Comme MurHype est utilisé par la page Écurie, la page du club, la fiche
cheval, le fil… TOUT plantait dès qu'un mur s'affichait.
⚠️ Le bug ne se voyait pas chez moi : node --check valide la syntaxe, pas
l'existence des variables. Et la page du rendez-vous, elle, ne plantait pas
car `props.onMettreEnAvant` n'y est passé que pour la gestionnaire.

CORRIGÉ AU 270 : color: TQmCl.

→ RÈGLE À AJOUTER AUX PIÈGES (§3) : avant d'utiliser une variable dans un
composant, VÉRIFIER qu'elle y est déclarée (les noms de couleurs et de
polices changent d'un composant à l'autre : tnT/tA, TQm/TQmCl/tAm, M/M2/M9).
node --check ne le dira jamais.

────────────────────────────────────────────────────────────
43. 20/09 — REFONTE DE LA FICHE ÉVÉNEMENT (build 271)
────────────────────────────────────────────────────────────
Elle a fait rédiger un cahier des charges (relecture ChatGPT) et validé une
maquette visuelle. AUDIT FAIT AVANT DE CODER, comme demandé (composants,
stockage, horaires, mises en avant, médias, visionneuse, props MurHype,
tables, risques) — résultat dans la conversation du 19/09.

LIVRÉ AU 271, SUR LA SEULE FicheEvenementClub :
· EN-TÊTE : image décorative en fond (images/hype-entete-concours.jpg,
  FICHIER NOUVEAU À POUSSER, 833×1000, 106 Ko) fondue dans le noir par un
  dégradé ; croix à droite ; menu « ••• » pour la gestionnaire ; type en
  lettres espacées, titre en Cinzel 30 px, puis date et lieu sur UNE ligne
  avec petites icônes. Si l'image manque, le dégradé du type reste : rien ne
  casse.
· HORAIRES : une LIGNE FINE entre deux traits dégradés, sans emoji ni cartes
  (« Embarquement 08:50 • Départ 09:00 • Reco 09:30 »). Colonnes inchangées.
· DOCUMENTS EN GRAND : l'affiche officielle et les publications mises en
  avant sont désormais présentées dans les MÊMES cartes (image large,
  libellé en capitales, « Voir en plein écran », chevron). L'affiche n'est
  plus seule en haut. Visionneuse existante (PhotoZoomable) réutilisée.
· « JE VIENS » sobre et large (anthracite, contour discret, icône or) +
  « Agenda » en contour. Compteur d'inscrites dessous, avec les prénoms.
· LES ACTIONS DE GESTION quittent le corps de la page : « Modifier » et
  « Retirer de la mise en avant » sont dans le menu « ••• ».
· VIE DU RENDEZ-VOUS en dernier, sous un titre éditorial centré entre deux
  traits, et le champ « Partage un moment » passe SOUS les publications via
  `composerEnBas` — option qui EXISTAIT DÉJÀ dans MurHype (trouvée à
  l'audit), activée par cette seule page. AUCUN autre écran touché.
· Vérification faite après le bug du 270 : toutes les variables utilisées
  dans le composant y sont bien déclarées (meta, dateAff, M, menuOuvert…).

À TESTER : ouvrir le CSO de dimanche ; vérifier l'en-tête, la ligne
d'horaires, les deux documents, les boutons, le menu « ••• », et que le
champ de publication est bien en bas. Vérifier aussi que les autres écrans
(Écurie, fiche cheval, club) sont inchangés.

RESTE : la page des rendez-vous PASSÉS (EcranEvenementPasse) n'a pas été
refaite — elle utilise sa propre mise en page. Et le GÉNÉRATEUR DE DOCUMENTS
(partie B du cahier des charges) n'est pas commencé.

────────────────────────────────────────────────────────────
44. 20/09 — GÉNÉRATEUR DE DOCUMENTS DE CONCOURS (build 272)
────────────────────────────────────────────────────────────
Partie B de son cahier des charges. But : ne plus fabriquer à la main l'image
« ordre de passage » ou « horaires ».

FICHIER NOUVEAU À POUSSER : images/hype-doc-parchemin.jpg (fond crème qu'elle
a fourni, 800×1200, 137 Ko).

CE QUI A ÉTÉ FAIT, EN RÉUTILISANT L'EXISTANT (aucune table, aucun SQL) :
· hypeDessinerDocument() : moteur Canvas natif, sortie 1000×1500.
  DEUX COUCHES comme demandé : (1) le fond décoratif, (2) titre + tableau
  dessinés par Hype par-dessus. Changer le fond plus tard ne touchera pas au
  moteur. Zone de sécurité : marges à 14 % — la végétation du fond ne passe
  jamais sous les données. Si le fond manque : crème uni, document lisible.
· hypeCanvasEnFichier() : transforme le dessin en fichier .jpg qualité 0,92.
· DEUX MODÈLES : « Ordre de passage » (N° | Cavalier | Cheval) et
  « Horaires » (Épreuve | Reco | Début | Partants), colonnes du cahier des
  charges. L'architecture accepte d'autres modèles sans retoucher le moteur.
· ÉCRAN DE SAISIE (depuis le menu « ••• » de la fiche) : titre, sous-titre,
  lignes ajoutables / modifiables / supprimables / déplaçables (↑ ↓ ✕), et
  APERÇU EN DIRECT qui est EXACTEMENT le rendu final (même fonction).
· « Publier dans l'événement » : envoi par envoyerPhoto (même stockage que
  les photos, préparation 2560 px déjà en place), publication par
  posterCommentaire sur la cible agenda:<id>, puis MISE EN AVANT automatique
  du document (il prend la 2ᵉ place si les deux sont déjà occupées).
· Bouton d'action EN HAUT du panneau (leçon du 226).
· Vérifications faites : toutes les fonctions et variables utilisées existent
  bien dans le composant (contrôle ajouté après le bug du 270).

À TESTER : menu ••• → « Créer un ordre de passage » → saisir 2-3 lignes →
l'aperçu se met à jour → Publier → le document apparaît en grande vignette
dans la fiche et dans le fil.

RESTE : le deuxième modèle visuel (fond sombre Paris qu'elle a envoyé), la
réédition d'un document déjà publié (demanderait une table), et la refonte
de la page des rendez-vous PASSÉS.

────────────────────────────────────────────────────────────
45. 🟥 20/09 — LES TROIS CARTES ET LA PAGE « BLOQUÉE » (build 273)
────────────────────────────────────────────────────────────
Sa capture (07 h 28) : affiche + ordre de passage côte à côte, puis les
horaires seuls EN ÉNORME sur une troisième carte, et « la page est bloquée
comme ça quoi qu'on fasse ».

CAUSES TROUVÉES :
1. La hauteur d'image (`height: 100%`) ne s'appliquait pas : PhotoZoomable
   rend son <img> dans un Fragment, et la règle ne prenait pas dans tous les
   cas — la carte prenait alors la hauteur NATURELLE du document, d'où la
   troisième carte immense. CORRIGÉ : conteneur à hauteur fixe (208 px) et
   image posée en ABSOLU par-dessus, en `cover`. Toutes les cartes sont
   désormais rigoureusement identiques.
2. La grille passait en une seule colonne quand il n'y avait qu'une carte,
   et la troisième s'étalait. CORRIGÉ : deux colonnes TOUJOURS.
3. « Page bloquée » : avec une carte de 500 px de haut, la fin de la page
   passait sous la barre du bas. Défilement fluide iOS
   (WebkitOverflowScrolling) et overscroll contenu ajoutés ; l'air en bas
   existait déjà et n'a pas été doublé.

⚠️ RAPPEL POUR LA SUITE : ne jamais compter sur `height: 100%` d'une image
rendue par PhotoZoomable ; toujours un conteneur à hauteur fixe + image en
position absolue.

────────────────────────────────────────────────────────────
46. 20/09 — L'AFFICHE DESCEND (build 274)
────────────────────────────────────────────────────────────
Sa décision, après avoir vu les trois cartes du 273 : « la sortir, et tu la
laisses dans les commentaires et publications en dessous, qu'on doit voir
uniquement en scrollant ».

LIVRÉ :
· La rangée de documents ne contient plus QUE les deux publications mises en
  avant (ordre de passage, horaires), côte à côte et à taille égale.
· L'affiche officielle est affichée EN GRAND (jusqu'à 52 % de la hauteur
  d'écran, entière, proportions gardées) juste AU-DESSUS du titre éditorial
  et des publications : on la découvre en faisant défiler. Un toucher
  l'ouvre en plein écran (PhotoZoomable).
· S'il n'y a aucune mise en avant, la rangée disparaît entièrement ; s'il n'y
  a pas d'affiche, ce bloc-là disparaît aussi.

EN ATTENTE : elle doit m'envoyer une capture du HAUT de la page pour que je
vérifie l'en-tête. Le fichier images/hype-entete-concours.jpg est BIEN en
ligne (vérifié par elle : 112 Ko, s'ouvre dans Safari) — donc si l'image ne
s'affiche pas, la cause est dans le code, pas dans le fichier.

────────────────────────────────────────────────────────────
47. 🟥 20/09 — « LA PAGE EST TOUJOURS BLOQUÉE » (build 275)
────────────────────────────────────────────────────────────
Symptôme répété par elle sur trois captures : la fiche d'un rendez-vous
s'ouvre AU MILIEU du contenu (on voit la description, les boutons, les
documents), l'en-tête avec le titre n'apparaît JAMAIS, et on ne peut pas
remonter.

CAUSE TROUVÉE (structurelle, pas cosmétique) : FicheEvenementClub est rendue
À L'INTÉRIEUR de AgendaClubHype, lui-même dans l'écran Écurie. Un ancêtre
crée un contexte de positionnement : le `position: fixed` de la fiche ne se
cale donc plus sur l'écran mais sur ce parent. La fiche héritait du
défilement de la page du club et son haut devenait inatteignable.
⚠️ Ce n'était pas visible avant la refonte parce que l'ancien en-tête était
court ; avec un en-tête de 44 vh, le contenu utile tombait hors écran.

CORRECTIF 275 : la fiche est sortie par un PORTAIL vers document.body
(ReactDOM.createPortal), exactement comme la barre de navigation (ligne
~25493) et l'éditeur de récit (~29517) le font déjà. Repli sans portail =
comportement d'avant. Défilement fluide iOS ajouté. Aucun style ni contenu
modifié.

→ RÈGLE : tout panneau plein écran (`position: fixed; inset: 0`) rendu
depuis un composant imbriqué DOIT passer par un portail. Sinon il devient
prisonnier du défilement de son parent.

────────────────────────────────────────────────────────────
48. 20/09 — LA PAGE DES RENDEZ-VOUS PASSÉS S'ALIGNE (build 276)
────────────────────────────────────────────────────────────
Constat de l'audit : EcranEvenementPasse a SA PROPRE mise en page, déjà
refaite le 18/09 (build 229) sur son brief (résultats en capitales or, cheval
en turquoise, filets fins, aucune carte encadrée). ELLE EST VALIDÉE : je ne
l'ai donc PAS refondue, pour ne pas défaire ce qui lui plaît.

Aligné seulement ce qui doit l'être pour que les deux pages se ressemblent :
· LA LIGNE FINE D'HORAIRES (embarquement · départ · reco · épreuve), sous la
  description, exactement comme sur la fiche à venir. Une heure vide ne
  s'affiche pas ; aucune heure = pas de ligne.
· `composerEnBas` sur son mur : photos et publications d'abord, champ
  d'écriture en dessous (sa règle du 19/09).
· Vérifié : OR, M, T et ev existent bien dans ce composant (contrôle
  systématique depuis le bug du 270).

PAS FAIT, volontairement : les deux grandes cartes de documents sur cette
page. À voir avec elle — sur un rendez-vous passé, ce sont les RÉSULTATS qui
comptent, et la page est déjà dense.

────────────────────────────────────────────────────────────
49. 20/09 — L'AFFICHE REMONTE, ET L'EN-TÊTE INTROUVABLE (build 277)
────────────────────────────────────────────────────────────
1. AFFICHE : elle la veut AU-DESSUS des deux documents (« mets au moins
   l'affiche au-dessus et pas en dessous des deux autres »). Elle est donc
   remontée juste avant la rangée, en grand, entière, plafonnée à 46 vh.
   (Au 274 elle avait demandé l'inverse ; décision changée, c'est noté.)

2. 🟥 EN-TÊTE TOUJOURS INVISIBLE, alors qu'il EST le premier bloc du code et
   qu'elle confirme être « au max du scroll vers le haut ». Deux causes
   possibles traitées :
   · `flex: 0 0 auto` ajouté sur l'en-tête — dans un conteneur flex en
     colonne qui défile, un enfant sans cette règle peut être comprimé ;
   · remise à zéro du défilement à l'ouverture (ref + effet), au cas où le
     navigateur restaurait une position.
   ⚠️ Le hook a été placé AVANT le `if (!ev) return null;` (règle des hooks,
   leçon du 30/08).
   SI ÇA NE SUFFIT PAS : la piste suivante est que le composant reçoive un
   `ev` sans type reconnu, donc un `meta` incomplet — à vérifier en lui
   demandant une capture du haut APRÈS ce build, et en regardant si le
   dégradé de couleur apparaît sans l'image.

3. RAPPEL À LUI FAIRE : le fond PARCHEMIN n'apparaît QUE dans un document
   créé par le générateur (menu ••• → Créer un ordre de passage). Ses deux
   documents actuels sont des captures d'écran qu'elle a publiées.

────────────────────────────────────────────────────────────
50. 🟥 20/09 — EN-TÊTE RECONSTRUIT POUR ÊTRE INCASSABLE (build 278)
────────────────────────────────────────────────────────────
Après 271, 275 et 277, elle voit toujours « rien au-dessus », en haut du
défilement, et me demande — à juste titre — si je code la bonne page.
VÉRIFIÉ : c'est bien FicheEvenementClub (ses captures montrent « Je viens »,
« Agenda », les cartes « Voir en plein écran », la phrase « Plus qu'un
rendez-vous » : tout vient de ce composant), et l'en-tête EST le premier
enfant du rendu (ordre des blocs vérifié dans le fichier livré).

TROIS FRAGILITÉS SUPPRIMÉES au 278, faute de pouvoir reproduire chez moi :
· toute dépendance à `meta` retirée (si le type du rendez-vous n'était pas
  reconnu, `meta.couleur` et `meta.degrade` devenaient vides et le bloc
  pouvait passer entièrement invisible) → valeurs de repli en dur ;
· plus de hauteur en `vh` (mal calculée dans certains contextes iOS/PWA) →
  la hauteur vient du contenu et d'un padding fixe ;
· fond sombre garanti (#0C0F14), titre en blanc opaque avec ombre portée,
  image d'en-tête en <img> avec repli si elle manque (au lieu d'un
  background-image silencieux).

SI ÇA NE SUFFIT TOUJOURS PAS : la prochaine piste est que le rendez-vous
soit ouvert par un AUTRE chemin que FicheEvenementClub — lui demander alors
de filmer le geste depuis l'agenda du club jusqu'à la fiche.

────────────────────────────────────────────────────────────
51. 20/09 — LE MENU « ••• » S'OUVRE SOUS LE BOUTON (build 279)
────────────────────────────────────────────────────────────
✅ D'ABORD : le 278 MARCHE. Sa capture de 07 h 45 montre l'en-tête complet
   (image, « CSO Étrier de Paris », date, lieu), puis la description, les
   boutons, et l'affiche. LA CAUSE DE TOUT LE CIRQUE PRÉCÉDENT ÉTAIT AUSSI
   NETLIFY : elle testait avant la fin de la publication (« ah attends, il
   vient de pop »). → À l'avenir : lui faire vérifier le numéro d'index
   AVANT de me signaler un bug, et ne pas empiler les correctifs en
   attendant.

🟥 RESTAIT : « les trois petits points ne font rien ». En réalité le menu
s'ouvrait, mais DANS LE FIL de la page, sous la description : invisible
depuis le haut. CORRIGÉ AU 279 : le menu est posé PAR-DESSUS, ancré en haut
à droite sous le bouton, sur un voile qui le ferme au toucher.
Il contient : Modifier le rendez-vous · Créer un ordre de passage · Créer
des horaires · Retirer une mise en avant · Fermer.

→ RÈGLE : un menu ouvert par un bouton doit être rendu EN POSITION
  ABSOLUE/FIXE près de ce bouton, jamais dans le flux du document.

────────────────────────────────────────────────────────────
52. 20/09 — « AJOUTER À MON AGENDA » PASSE PAR LE PARTAGE (build 280)
────────────────────────────────────────────────────────────
Elle : le bouton Agenda ne fait rien non plus. CAUSE CONNUE ET CONFIRMÉE :
Hype est installé sur son écran d'accueil, et iOS INTERDIT le téléchargement
d'un fichier dans une PWA — le clic sur le lien .ics est avalé sans message.

CORRIGÉ AU 280, en trois tentatives successives :
1. PARTAGE NATIF : navigator.share avec le fichier .ics (navigator.canShare
   vérifié avant). iOS ouvre alors sa feuille de partage, qui propose
   « Ajouter à Calendrier ». C'est le chemin qui marche dans une PWA.
2. Sinon : ouverture du fichier dans un onglet (blob URL).
3. Sinon : l'ancien téléchargement, plus un message lui disant d'ouvrir Hype
   dans Safari.
Le contenu de l'événement et les deux rappels (reco, départ) sont inchangés.

────────────────────────────────────────────────────────────
53. 20/09 — PARTAGER LE RENDEZ-VOUS (build 281)
────────────────────────────────────────────────────────────
Elle : « je ne vois plus partager l'événement ». VÉRIFIÉ DANS LE CODE : ce
bouton n'a JAMAIS existé sur cette fiche — il figurait sur la maquette, et je
l'avais remplacé par « Agenda » (sa demande du moment). Dit franchement, et
ajouté.

LIVRÉ : bouton « Partager le rendez-vous » sous les deux autres, discret.
Il envoie en texte : titre, date et heure, lieu, les heures saisies
(embarquement, départ, reco, épreuve) et la description — donc utilisable
dans un message, un mail ou un groupe. navigator.share si disponible, sinon
copie dans le presse-papier avec confirmation à l'écran (même repli que le
reste de l'appli).

────────────────────────────────────────────────────────────
54. 20/09 — EN-TÊTE CORRIGÉ + AGENDA QUI PARLE (build 282)
────────────────────────────────────────────────────────────
1. 🟥 MON ERREUR DU 278 : j'avais écrit `meta.nom` alors que la propriété
   s'appelle `label` dans META — l'en-tête affichait donc « RENDEZ-VOUS » au
   lieu de « CONCOURS ». Corrigé, la couleur du type revient avec.
   Les emojis 📅 📍 (mis en dépannage au 278) redeviennent les icônes
   dessinées, et la hauteur généreuse de l'en-tête est rendue
   (padding haut 74 → 150 px au-dessus du bloc de texte).

2. AGENDA : le partage natif marche (confirmé par sa capture). Ajout d'un
   FILET DE SÉCURITÉ : si le partage échoue ou n'existe pas, un PANNEAU
   s'ouvre et explique — avec « Copier le rendez-vous » et l'indication
   d'ouvrir le site dans Safari. Plus jamais de bouton muet.

3. DÉCOUVERTE IMPORTANTE (elle avait raison, moi tort) : Hype SAIT DÉJÀ lire
   une capture d'écran — `importerResultatsDepuisCapture` (~ligne 48789)
   envoie l'image à la fonction Netlify `/.netlify/functions/assistant` et en
   extrait un JSON. C'est ce qui importe ses résultats de concours.
   → LE GÉNÉRATEUR DE DOCUMENTS POURRA DONC LIRE SES CAPTURES, en réutilisant
   exactement ce mécanisme (aucun service nouveau, aucune clé).
   PROCHAIN CHANTIER, validé par elle : UN SEUL document contenant horaires
   ET ordre de passage, rempli au choix par lecture d'une capture, collage de
   texte, ou saisie manuelle, avec correction possible avant publication.

────────────────────────────────────────────────────────────
55. 20/09 — PARTAGE UTILE + DOCUMENT UNIQUE QUI LIT LES CAPTURES (283)
────────────────────────────────────────────────────────────
A. PARTAGE. Elle : « le partage ne partage rien à part deux phrases ; je veux
   quelque chose qui emmène les gens à consulter la page et qui partage la
   photo et une partie des infos, au moins les horaires et l'ordre de
   passage ». LIVRÉ :
   · nouvelle route #r=<id> qui ouvre DIRECTEMENT la fiche du rendez-vous —
     elle réutilise window.__agendaFiche, mécanisme déjà présent dans
     AgendaClubHype (rien de neuf en base ni en navigation) ;
   · le message contient titre, date, lieu, LES QUATRE HEURES, la description,
     le nom des documents mis en avant, et le LIEN ;
   · l'IMAGE est jointe au partage : l'affiche si elle existe, sinon le
     premier document mis en avant. Repli sur texte seul si le téléphone
     refuse les fichiers, puis sur le presse-papier.

B. DOCUMENT UNIQUE. Sa demande : « idéalement c'était faire un document unique
   pour ordre de passage et horaires ». LIVRÉ :
   · hypeDessinerDocument accepte désormais PLUSIEURS SECTIONS sur la même
     feuille, chacune avec son intertitre et ses colonnes ; hauteur de ligne
     calculée pour que tout tienne ;
   · le menu « ••• » ne propose plus qu'UNE entrée : « Créer le document du
     concours » (horaires + ordre de passage) ;
   · publication et mise en avant automatiques, comme avant.

C. 🟥 LECTURE DES CAPTURES — ELLE AVAIT RAISON, MOI TORT.
   Je lui avais dit que l'appli ne savait pas lire une image. FAUX :
   `importerResultatsDepuisCapture` (~48789) envoie déjà l'image à la fonction
   Netlify /.netlify/functions/assistant et en extrait un JSON ; c'est ainsi
   que ses résultats de concours s'importent.
   LIVRÉ : bouton « 📷 Lire une capture d'écran » dans CHAQUE partie du
   document. Même chemin, même fonction, aucune clé, aucun service nouveau.
   Consignes strictes (« n'invente rien », valeurs vides si illisibles), et
   les lignes restent MODIFIABLES avant publication.

À TESTER : ••• → Créer le document du concours → 📷 sur « Horaires » →
choisir sa capture → les lignes se remplissent → corriger si besoin → idem
pour l'ordre de passage → Publier.

RESTE OUVERT : ce qui la gêne encore dans « l'encart là-haut » — sa capture
de 08 h 03 montre pourtant l'en-tête complet ; à préciser avec elle.

────────────────────────────────────────────────────────────
56. 🟥 20/09 — LA FICHE PLANTAIT À L'OUVERTURE (build 284)
────────────────────────────────────────────────────────────
Sa capture (09 h 24) : « Un caillou dans le sabot », écran = guilde,
TypeError : undefined is not an object (evaluating 'MODELES_DOC[doc.type].nom'),
pile dans FicheEvenementClub.

CAUSE, introduite par moi au 283 : en fusionnant les deux documents en un
seul, `doc.type` a disparu — mais l'EN-TÊTE du panneau de saisie lisait encore
`MODELES_DOC[doc.type].nom`. Dès l'ouverture de l'écran, plantage.

CORRIGÉ AU 284 : titre fixe « Document du concours ».

→ RÈGLE (encore la même famille que le bug du 270) : quand on supprime une
propriété ou qu'on renomme, faire un grep de TOUTES ses occurrences dans le
composant avant de livrer. node --check ne voit rien de tout cela.

────────────────────────────────────────────────────────────
57. 20/09 — TROIS RETOUCHES DU DOCUMENT (build 285)
────────────────────────────────────────────────────────────
1. 🟥 LIBELLÉS ÉCRITS EN CLAIR. Sur sa photo du document : « \u00c9PREUVE » et
   « N\u00b0 » au lieu de « ÉPREUVE » et « N° ». Cause : les séquences \u
   étaient DOUBLÉES dans MODELES_DOC (échappement de trop lors de l'écriture
   du fichier). Réécrites en français accentué directement.
   → À SURVEILLER : ce défaut peut exister ailleurs dans mes ajouts récents.

2. LA DÉCO MANGEAIT LES CHIFFRES. Elle : « on ne voit pas les derniers
   numéros en bas à gauche, masqués par la déco du fond ». Zone de sécurité
   resserrée : marge gauche 14 % → 19 %, marge droite 86 % → 87 %, et on
   arrête le tableau à 88 % de la hauteur au lieu de 93 %. Le fond n'est pas
   retouché : seules les données se décalent (les deux couches restent
   indépendantes, comme prévu au cahier des charges).

3. RETIRER UNE MISE EN AVANT. Elle : « impossible de le virer, je ne sais pas
   où le faire ». C'était dans le menu « ••• », donc invisible. Ajout d'une
   CROIX directement sur la carte du document, réservée à la gestionnaire, et
   jamais sur l'affiche.

────────────────────────────────────────────────────────────
58. 20/09 — DROITS : GESTIONNAIRES + AUTRICE (build 286)
────────────────────────────────────────────────────────────
SES QUESTIONS (20/09) et les réponses, vérifiées dans le code et la base :
· Qui peut utiliser l'outil ? Celle qui a REVENDIQUÉ le club
  (clubRevendiquePar / hype_est_proprietaire_club), donc elle pour Feinn et
  la SEP. C'est la base qui l'impose, pas seulement l'affichage.
· Ce qui est publié sur un rendez-vous est-il commun à toutes les écuries ?
  NON : un rendez-vous appartient à UN club, ses documents vivent sur SON
  mur. Public en lecture (l'agenda d'un club est consultable), mais rangé
  par club.

✅ SQL PASSÉ PAR ELLE (« Success ») : table club_gestionnaires (+RLS : lecture
   ouverte, écriture réservée à la propriétaire), fonction
   hype_peut_gerer_club(clef), et fonction hype_basculer_mise_en_avant
   (p_agenda, p_post) qui autorise la GESTIONNAIRE **ou** l'AUTRICE du post.

LIVRÉ AU 286 :
· La mise en avant passe désormais par la BASE (rpc hype_basculer_mise_en_avant)
  au lieu d'un update direct : le téléphone ne décide plus des droits, il
  demande. Repli sur l'ancienne écriture si la fonction manque.
· La croix « retirer du haut » s'affiche aussi pour l'AUTRICE de la
  publication, et « Mettre en avant » est proposé dans le fil à qui peut déjà
  gérer son propre post.
· NOUVEAU PANNEAU « Personnes autorisées » (menu •••, propriétaire seulement) :
  liste des gestionnaires, ajout depuis les cavalières du club, retrait par
  croix. Écritures vérifiées, refus affiché.
· La question « laquelle remplacer ? » est conservée quand les deux places
  sont déjà prises.

⚠️ NON FAIT : les autres écrans (création/suppression d'un rendez-vous,
agenda) testent encore `estProprio` côté téléphone, pas hype_peut_gerer_club.
Une gestionnaire désignée pourra donc mettre en avant, mais pas encore créer
un rendez-vous. À faire ensuite si elle le veut.

────────────────────────────────────────────────────────────
59. 20/09 — QUI PEUT ANNULER UN RENDEZ-VOUS (build 287)
────────────────────────────────────────────────────────────
SA RÈGLE : « seules l'admin et les personnes ayant créé l'événement doivent
pouvoir l'annuler ».

✅ SQL PASSÉ PAR ELLE (« Success ») — les policies de club_agenda réécrites :
· INSERT : hype_peut_gerer_club(club_clef) ET auteur = auth.uid()
  → la propriétaire et les gestionnaires désignées peuvent créer ;
· UPDATE et DELETE : hype_est_proprietaire_club(club_clef) OU auteur =
  auth.uid() → elle, et la personne qui a créé le rendez-vous. Une
  gestionnaire ne peut donc PAS effacer le rendez-vous d'une autre.

LIVRÉ AU 287 : l'affichage REFLÈTE ces droits, pour ne jamais proposer un
bouton que la base refusera.
· `peutCreer` = propriétaire OU gestionnaire (lue dans club_gestionnaires) :
  commande le bouton « + Ajouter » et l'état vide de l'agenda ;
· `peutGererCe(ev)` = propriétaire OU auteur : commande les deux croix de
  suppression (carte du carrousel et carte de liste) et le droit `peutModifier`
  transmis à la fiche ;
· les mises en avant continuent de passer par hype_basculer_mise_en_avant
  (gestionnaire OU autrice du post), inchangé.

À TESTER : avec un compte gestionnaire → peut créer, peut supprimer SON
rendez-vous, ne voit pas la croix sur ceux des autres. Avec le compte
propriétaire → tout.

────────────────────────────────────────────────────────────
60. 20/09 — LES CARTES CONFORMES À LA MAQUETTE (build 288)
────────────────────────────────────────────────────────────
Elle renvoie SA maquette d'origine et demande « exactement le même design ».
Relevé des écarts et corrigés :
1. L'AFFICHE revient DANS la rangée, en PREMIÈRE carte, à égalité avec les
   documents (elle avait été sortie au 274, remontée au 277 : décision finale
   = dans la rangée, comme la maquette).
2. LA CARTE : l'image occupe toute la carte (250 px), un FONDU sombre monte
   du bas, et la légende est POSÉE DESSUS (icône, libellé en capitales,
   « Voir en plein écran », chevron). Plus de bandeau séparé sous l'image.
3. ORDRE : les cartes passent AVANT les boutons — « je viens et partager
   étaient en dessous ». Nouvel ordre : en-tête, description, ligne
   d'horaires, CARTES, Je viens / Agenda, Partager, inscrites, puis la vie du
   rendez-vous.
4. CONFIRMATION avant de retirer une mise en avant (« j'ai cliqué sur la
   croix, aucune confirmation, rien »). La croix passe en haut à droite de la
   carte, sur l'image.
5. ⚠️ ÉVITÉ DE JUSTESSE : j'allais appeler setVisu() pour le plein écran —
   cet état n'existe PAS dans FicheEvenementClub (il est dans
   EcranEvenementPasse). C'est PhotoZoomable qui ouvre le plein écran au
   toucher de l'image. Vérification des variables faite avant livraison,
   comme après le bug du 270.

────────────────────────────────────────────────────────────
61. 20/09 — CADRAGE DE L'EN-TÊTE (build 289)
────────────────────────────────────────────────────────────
Elle : « descends un peu la page que ça ne coupe pas le haut de la tête des
cavaliers sur la photo » (capture 15 h 14 : bombe de la cavalière rognée).
· Cadrage de l'image d'en-tête remonté : objectPosition « center 18% » →
  « center 2% » — on garde donc le haut de l'image.
· Un peu d'air ajouté au-dessus de l'en-tête (safe-area + 8 px), sous
  l'horloge.
Rien d'autre touché.

────────────────────────────────────────────────────────────
62. 20/09 — NOTIFICATIONS : L'ABONNEMENT (build 290)
────────────────────────────────────────────────────────────
Première moitié du chantier « que ça sonne le matin du concours ».

✅ CLÉ PUBLIQUE VAPID fournie par elle (générée sur vapidkeys.com) :
   BP-1TH_5bpRxes4Z2DsVTMa3y8ItFEqsGwizTGy8NLb86OX3X1A-QYuDDaMQXBBIQO0_hD5Va-BMR96rctn4wZM
   subject : mailto:feinn@live.fr
   ⚠️ LA CLÉ PRIVÉE RESTE CHEZ ELLE (note sur son téléphone). Elle servira
   côté Supabase à l'étape d'envoi. Ne jamais la mettre dans index.html.

LIVRÉ AU 290 :
· Fonctions globales hypePushPossible / hypePushInstallee / hypePushEtat /
  hypePushActiver / hypePushCouper : autorisation, abonnement PushManager
  avec la clé publique, enregistrement dans push_abonnements (upsert sur
  endpoint), désabonnement propre (unsubscribe + suppression de la ligne).
· Bouton « 🔔 Me prévenir » sur la fiche d'un rendez-vous, à côté de
  « Partager » (les deux anciens boutons fondus en une rangée).
· MESSAGE EXPLICITE sur iPhone si Hype n'est pas installée sur l'écran
  d'accueil : Apple l'exige, donc on le DIT au lieu de laisser un bouton
  sans effet. Idem si les notifications ont été refusées (chemin Réglages).
· Le sw.js existant N'A PAS été touché : il est déjà enregistré (~ligne
  67503).

🟥 DÉCOUVERTE MAJEURE (20/09) : son sw.js EN LIGNE (vérifié par elle dans
Safari) est le « SERVICE WORKER DE RETRAIT » du 26/07/2026 : il vide ses
caches, SE DÉSINSCRIT et disparaît. Tant qu'il est là, AUCUNE notification ne
peut arriver — un service worker désinscrit ne reçoit rien.
→ NOUVEAU sw.js FOURNI (à pousser à la racine, à côté d'index.html). Il ne
fait QUE les notifications (push + notificationclick) et n'installe TOUJOURS
aucun gestionnaire fetch : il ne peut donc pas recréer la page blanche de
juillet. Le hors-ligne n'est pas récupéré, volontairement.
⚠️ Conséquence à expliquer : les appareils qui ont encore l'ancien fichier
s'en débarrassent au premier lancement et installent le nouveau au suivant —
il faut OUVRIR L'APPLI DEUX FOIS avant de pouvoir activer les notifications.

✅ RESTE À FAIRE : PLUS RIEN. Les points 2 (fonction d'envoi) et 3 (tâche
programmée) ont été faits et TESTÉS le 20/09 au soir — voir §66.

────────────────────────────────────────────────────────────
63. 🟥 20/09 — ZOOMER SUR UN DOCUMENT FERMAIT TOUT (build 291)
────────────────────────────────────────────────────────────
Elle : « j'ai élargi la page parchemin pour regarder les numéros de plus près
et tout a sauté, je me suis retrouvée sur la page Écurie ».

DEUX CAUSES, dans PhotoZoomable :
1. Le fond se fermait au MOINDRE toucher (onClick sur le calque) : un
   pincement à deux doigts déclenchait donc la fermeture.
   → On ne ferme plus que sur un VRAI clic simple : un seul doigt, et
   e.detail > 0 (un pincement ou un geste n'en produit pas).
2. L'agrandissement était rendu À L'INTÉRIEUR de la page qui l'avait ouvert.
   Sur la fiche d'un rendez-vous, sa fermeture entraînait tout l'écran,
   d'où le retour brutal à la page Écurie.
   → Il passe par un PORTAIL vers document.body (même remède que pour la
   fiche elle-même au §47), et zIndex 10000.
3. `touchAction: manipulation` sur le calque et l'image : le pincement pour
   agrandir est désormais possible.

⚠️ COMPOSANT PARTAGÉ PAR 8 ÉCRANS : seul le comportement de fermeture change ;
aucun style, aucune disposition touchés (règle du §23).

────────────────────────────────────────────────────────────
64. 20/09 — CARTES DE MÊME HAUTEUR (build 292)
────────────────────────────────────────────────────────────
Sur sa capture, l'affiche (verticale, plus courte) et le document n'avaient
pas la même hauteur. Corrigé : la carte est une colonne flex de hauteur 100 %
et le bloc image prend l'espace restant (flex 1, minimum 250 px). La grille
étirant déjà les cellules, les deux cartes sont désormais rigoureusement
identiques.

⚠️ À LUI DIRE : son document « Le jour J » affiche encore « \u00c9PREUVE » et
« N\u00b0 » parce qu'il a été généré AVANT le build 285 qui corrige les
libellés. Il suffit de le refaire depuis le menu « ••• ».

PROCHAINE ET DERNIÈRE ÉTAPE DES NOTIFICATIONS (côté Supabase, avec elle) :
1. sa clé privée dans les secrets du projet (je ne dois jamais la voir) ;
2. une Edge Function d'envoi (web-push VAPID) ;
3. une tâche horaire : rendez-vous du jour → inscrites (agenda_inscriptions)
   → leurs abonnements (push_abonnements) → « Reco 9h00 · Départ 8h40 ».

────────────────────────────────────────────────────────────
65. 🟥 20/09 — LE « CLIC FANTÔME » QUI FERMAIT LA FICHE (build 293)
────────────────────────────────────────────────────────────
Elle, sur le 292 (donc APRÈS le correctif du zoom du 291) : « j'ai élargi,
rétréci, et paf » → retour sur Écurie.

CAUSE TROUVÉE : la croix de l'agrandissement est EXACTEMENT au même endroit
que la croix de la fiche (haut à droite). Sur iPhone, après un toucher, le
navigateur envoie un clic différé : l'agrandissement se ferme, puis ce clic
atterrit sur la croix de la fiche, qui se ferme à son tour.

CORRECTIF 293 : à la fermeture de l'agrandissement, un BOUCLIER transparent
plein écran est posé 450 ms (zIndex 10001) ; il avale le clic différé puis
disparaît. Appliqué aux trois chemins de fermeture (fond, image, croix).
→ RÈGLE : deux boutons superposés à la même position dans deux couches
différentes = clic fantôme garanti sur iOS. Soit on les décale, soit on pose
un bouclier.

AUSSI AU 293 : les cartes « Derniers résultats » de la page Écurie ne
s'étirent plus (« super longs comparé à avant »). Dans une rangée flex, elles
prenaient toutes la hauteur de la plus haute ; `alignItems: flex-start`
règle le problème sans toucher à leur dessin.

────────────────────────────────────────────────────────────
66. 🟩 20/09 (soir) — LES NOTIFICATIONS MARCHENT DE BOUT EN BOUT (build 294)
────────────────────────────────────────────────────────────
NOTIFICATION REÇUE SUR SON IPHONE à 17 h 45 : « Test — Départ à 17h30 »,
et la fonction répond `{"ok":true,"envois":1}`. Toute la chaîne est vivante :
rendez-vous → inscrites → abonnements → Apple → son écran.

CE QUI A ÉTÉ FAIT EN BASE (par elle, tout est déjà en place) :
· pg_net ACTIVÉ (Database → Extensions). Sans lui, `net.http_post` n'existe
  pas : « schema net does not exist ». C'est le premier blocage rencontré.
· « Verify JWT with legacy secret » ÉTEINT sur notifier-rdv (Settings).
  Sinon l'appel est refusé à l'entrée (401 UNAUTHORIZED_NO_AUTH_HEADER) et
  le code de la fonction ne tourne même pas. Sa clé publique actuelle
  (sb_publishable_…) n'est PAS un JWT et ne passe pas ce contrôle ; seule
  l'ancienne clé « Legacy » l'aurait fait. Choix assumé avec elle.
· pg_cron ACTIVÉ et TÂCHE CRÉÉE, nom `notifier-rdv-5min`, toutes les
  5 minutes, corps `{}` (donc PAS en mode test). Pour l'arrêter un jour :
  `select cron.unschedule('notifier-rdv-5min');`

DEUX CORRECTIONS DANS LA EDGE FUNCTION notifier-rdv (onglet Code du
dashboard, faites À LA MAIN par elle, au clavier) :
1. Ligne 188 — LA CAUSE DU « envois: 0 ». Le code écrit par l'assistant
   Supabase passait la ligne de push_abonnements telle quelle à web-push,
   qui exige les clés DANS un objet `keys`. D'où « To send a message with a
   payload, the subscription must have 'auth' and 'p256dh' keys », visible
   uniquement dans les Logs de la fonction. Corrigé en :
   `sendNotification({endpoint:subscription.endpoint,keys:subscription}, …)`
2. Lignes 99-100 — FENÊTRE DE RAPPEL. Elle a choisi 10 à 15 min avant :
   `- 15 * 60_000` (au lieu de 45) et `+ 5 * 60_000` (au lieu de 60), ce qui
   va avec la tâche toutes les 5 minutes. Coût vérifié : ~8 600 appels/mois
   contre 2 millions inclus dans son Pro, et le nombre de cavalières n'y
   change rien (un appel envoie à toutes).

CE QUE LA FONCTION FAIT, EXACTEMENT (à savoir avant d'y toucher) :
· elle ne regarde QUE `heure_reco` et `heure_depart` de club_agenda pour le
  jour même (fuseau Europe/Paris). L'heure principale `heure` N'EST PAS
  utilisée : un rendez-vous qui n'a qu'elle ne déclenchera JAMAIS de rappel.
· les heures sont du texte libre : seuls « 9h », « 9h00 » et « 9:00 » sont
  reconnus. « 16.50 », qu'elle a tapé spontanément, est IGNORÉ SANS AUCUN
  MESSAGE. C'est un vrai piège pour ses cavalières.
· `{"test":true}` court-circuite la fenêtre horaire et envoie tout de suite :
  c'est ce qui a servi à tous les essais de la journée.

LIVRÉ AU 294, une seule zone touchée (fiche d'un rendez-vous, bloc « Me
prévenir ») : après l'activation, une ASTUCE iOS s'affiche sous le message
« C'est activé… », en plus petit et en gris — Réglages → Notifications →
Hype, style de bannière « Persistante », et garder Écran verrouillé, Centre
de notifications et Bannières cochés. Née de son constat : « la notification
apparaît et disparaît trop vite ». Traduite en 6 langues, affichée
UNIQUEMENT sur iPhone/iPad (`pushSurIOS()`), rien ne change ailleurs.
⚠️ Le code NE PEUT PAS lire ni ouvrir ce réglage (privé à iOS) : on ne peut
qu'afficher le chemin. Même chose pour les modes Concentration et
Économie d'énergie, qui peuvent retarder ou taire un rappel.

DETTE OUVERTE, RIEN D'URGENT, DANS L'ORDRE OÙ ELLE L'A POSÉ :
· protéger notifier-rdv par un mot de passe vérifié DANS la fonction
  (aujourd'hui, qui connaît l'adresse peut déclencher les rappels du jour) ;
· ✅ TRANCHÉ ET LIVRÉ au 295 (§67) : correction à l'enregistrement côté
  index.html. La fonction n'a PAS été rendue tolérante — inutile désormais
  pour les nouvelles saisies, mais elle reste stricte : ne jamais l'oublier
  si un jour une heure arrive en base par un autre chemin ;
· les rendez-vous qui n'ont que leur heure principale : faut-il un rappel ?
  Question posée, PAS ENCORE TRANCHÉE ;
· prévenir ses cavalières qu'il faut appuyer sur « Me prévenir » : à ce
  jour, UN SEUL abonnement en base, le sien.

LEÇON DE LA SOIRÉE : l'assistant IA de Supabase a affiché cinq fois
« Deploy » sans jamais déployer — son accès aux Edge Functions est coupé sur
ce compte (« l'accès organisationnel nécessaire pour consulter les Edge
Functions est désactivé »). NE PAS repasser par lui. L'onglet Code + son
bouton « Deploy updates », téléphone À L'HORIZONTALE, marche très bien :
c'est comme ça que les deux corrections sont passées. Le collage dans cet
éditeur ne fonctionne pas chez elle ; elle tape au clavier, donc TOUJOURS
lui donner le texte le plus court possible et vérifier sa capture AVANT
qu'elle déploie (un « 1! » parasite s'était glissé à la ligne 99).

────────────────────────────────────────────────────────────
67. 20/09 (soir) — LE « h » DES HEURES REMIS AU PROPRE TOUT SEUL (build 295)
────────────────────────────────────────────────────────────
POURQUOI : la fonction notifier-rdv ne lit que « 9h », « 9h00 » et « 9:00 ».
Elle avait tapé « 16.50 » sans y penser, et le rappel n'est jamais parti,
SANS AUCUN MESSAGE. Son idée, retenue : « imposer le h en ligne quand les
gens remplissent ». Ses choix : correction À L'ENREGISTREMENT (pas pendant
la frappe) et sur LES CINQ champs (heure principale incluse).

CE QUI EST FAIT : un `hypeHeurePropre(v)` dans la couche base, appelé par
ajouterAgendaClub (insert) ET par modifierAgendaClub (update) — donc par les
DEUX formulaires, création et « Modifier le rendez-vous », sans toucher aux
champs eux-mêmes. Testé : « 1650 », « 16.50 », « 16,50 », « 16 50 »,
« 16:50 » → 16h50 ; « 9h » et « 9 » → 9h00 ; « 930 » → 9h30 ; « 9h5 » →
9h05 ; « 8h40 » inchangé ; « vers 9h » et « 25h00 » LAISSÉS TELS QUELS.

POURQUOI PAS PENDANT LA FRAPPE : un champ qui se réécrit à chaque caractère
fait sauter le curseur sur iPhone et empêche de corriger. Écarté avec elle.

⚠️ LES RENDEZ-VOUS DÉJÀ EN BASE NE SONT PAS CORRIGÉS, seulement ceux
enregistrés après le 295. Sa fiche « Test » du 20/09 porte encore « 16.50 »
en heure principale ; il suffit de la rouvrir et d'enregistrer pour qu'elle
passe à « 16h50 ». Aucune migration lancée : pas de requête UPDATE en masse
sans son accord.

RESTE OUVERT (elle a dit « pas Supabase, pitié » — NE PAS Y RETOURNER SANS
QU'ELLE LE DEMANDE) :
· les rendez-vous qui n'ont QUE leur heure principale : elle a dit OUI pour
  qu'ils déclenchent un rappel, mais ça se passe dans la Edge Function
  (3 retouches) et la soirée s'est arrêtée avant. Conséquences à redire
  avant de le faire : un rendez-vous avec heure principale ET départ
  enverra DEUX notifications, et le libellé serait « Rendez-vous à 16h50 » ;
· le mot de passe de notifier-rdv ;
· prévenir ses cavalières d'appuyer sur « Me prévenir ».

────────────────────────────────────────────────────────────
68. 🟩 20/09 (soir) — LE NOM DE DOMAINE EST EN LIGNE : 2hype.fr
────────────────────────────────────────────────────────────
✅ FAIT ET VÉRIFIÉ LE 20/09 À 20 h 08 : l'appli s'ouvre sur
https://2hype.fr, avec le certificat de sécurité. Moins d'une demi-heure
entre l'achat et la mise en ligne.

CE QUI A ÉTÉ FAIT, dans l'ordre :
1. `2hype.fr` acheté chez INFOMANIAK, AU NOM DE LA SOCIÉTÉ (Feinn équitation
   et environnement, propriétaire Blandine Pronost). Expire le 20/09/2027.
   ⚠️ `2hype.com` est PRIS par quelqu'un d'autre — ne pas le rechercher à
   nouveau. `horsehype.fr/.com` étaient libres mais elle a écarté le nom.
2. Dans NETLIFY : Project 2hype → Domain management → « Add a domain you
   already own » → `2hype.fr`. Netlify l'a posé en PRIMARY DOMAIN et a créé
   tout seul `www.2hype.fr` qui redirige vers lui.
3. Dans INFOMANIAK, zone DNS de 2hype.fr, DEUX enregistrements ajoutés :
   · type **A**, source VIDE (la racine), valeur **75.2.60.5**
   · type **CNAME**, source **www**, valeur **2hype.netlify.app**
   ⚠️ On a pris l'option A (« fallback » de Netlify) et pas l'ALIAS
   recommandé, parce qu'Infomaniak ne propose pas d'enregistrement ALIAS.
   Ça marche parfaitement.
   ⚠️ Sa zone ne contenait AUCUN A ni CNAME au départ (juste 2 NS et 2 TXT
   de messagerie) : rien à supprimer, aucun conflit.
4. Le certificat Let's Encrypt s'est créé TOUT SEUL à 19 h 58, pour
   `2hype.fr` ET `www.2hype.fr`. Renouvellement automatique avant décembre.

⚠️ ENTRE L'AJOUT DNS ET LE CERTIFICAT, Safari affiche « Cette connexion n'est
pas privée ». C'EST NORMAL et transitoire : le domaine répond déjà mais le
certificat n'est pas encore émis. NE PAS cliquer sur « visiter ce site web »,
juste attendre et rouvrir l'onglet.

🟥 `2hype.netlify.app` RESTE ACTIF ET DOIT LE RESTER. Tous les liens déjà
envoyés aux cavalières, et les icônes déjà posées sur leur écran d'accueil,
passent par là. NE JAMAIS LE DÉSACTIVER.

RIEN À CHANGER DANS LE CODE : tout est relatif, l'appli fonctionne à
l'identique sur les deux adresses. Supabase, images, médias : rien ne dépend
du nom de domaine.

🟥 DEUX CHOSES À VÉRIFIER PLUS TARD, À FROID — NON FAITES :
1. STRIPE — LES ADRESSES DE RETOUR APRÈS PAIEMENT (succès et annulation).
   Si elles pointent vers `2hype.netlify.app`, tout continue de marcher
   aujourd'hui. MAIS le jour où `2hype.fr` deviendra l'adresse communiquée,
   une cavalière qui paie depuis `2hype.fr` sera renvoyée sur l'AUTRE
   adresse à la fin du paiement. Pas cassé, mais déroutant pour elle.
   À regarder dans le tableau de bord Stripe ET dans
   `netlify/functions/stripe-webhook.js`.
2. LES NOTIFICATIONS (chantier du 20/09, §64-66). ⚠️ SUR IPHONE,
   L'AUTORISATION EST LIÉE À L'ADRESSE : une cavalière installée depuis
   `2hype.netlify.app` garde ses notifications, mais quelqu'un qui
   installerait depuis `2hype.fr` devra RÉAUTORISER. Ce n'est pas un défaut,
   mais il faut le savoir avant de communiquer la nouvelle adresse.

CONSEIL DONNÉ, NON TRANCHÉ PAR ELLE : ne rien changer pour les cavalières
déjà installées, et n'utiliser `2hype.fr` que pour les NOUVELLES invitations
— c'est plus court et ça se dicte mieux au téléphone.

────────────────────────────────────────────────────────────
69. 20/09 (nuit) — MAGASINS D'APPLICATIONS : LES DEUX COMPTES SONT OUVERTS
────────────────────────────────────────────────────────────
⚠️ AUCUN CODE LIVRÉ DANS CETTE ENTRÉE. L'index reste le 295 (§67), inchangé
depuis sa livraison ; il n'était PAS ENCORE POUSSÉ NI TESTÉ au moment où
cette entrée a été écrite. À pousser et à tester : l'astuce iOS sous « Je
serai prévenue », et « 1815 » qui doit devenir « 18h15 » à l'enregistrement.

APPLE — 99 €/AN PAYÉS, MAIS EN NOM PROPRE.
La facture est à Blandine Pronost, adresse personnelle, malicia2008@hotmail.fr.
C'est donc une inscription INDIVIDUELLE : l'App Store affichera « Blandine
Pronost » comme éditeur, pas l'association.
CHOIX ASSUMÉ APRÈS DISCUSSION : les abonnements Hype arrivent aujourd'hui sur
elle, donc le nom propre est cohérent. ⚠️ MAIS :
· son entité est une ASSOCIATION, et Apple exonère les organismes à but non
  lucratif de la cotisation (la France est un pays éligible) — À CONDITION de
  ne distribuer QUE des apps gratuites et de ne vendre aucun service
  numérique dans ses apps. L'abonnement Hype rend cette condition douteuse ;
· la bascule individuel → organisation reste possible plus tard avec le
  D-U-N-S de l'association. 🟥 L'INVERSE EST TRÈS DIFFICILE : ne pas basculer
  sans qu'elle le décide ;
· 🟥 LE VRAI COÛT RESTE CELUI DU §13 : abonnement vendu DANS l'app iOS =
  paiement Apple imposé, 15 à 30 % de commission. NON TRANCHÉ.

GOOGLE PLAY — COMPTE DÉVELOPPEUR CRÉÉ (25 €, une seule fois).
· Type ORGANISATION → NONPROFIT. Propriétaire : feinn@live.fr (compte qui ne
  se change pas ensuite ; double vérification Google activée ce soir à 21h05,
  numéro et passkey en place).
· ✅ L'ASSOCIATION A DÉJÀ UN D-U-N-S. C'est ce qui a permis le compte
  organisation, et donc d'ÉCHAPPER à la règle des 12 testeurs pendant
  14 jours qui s'impose aux comptes personnels (elle n'a pas d'Android et
  à peine la moitié de ses cavalières en ont un : c'était rédhibitoire).
· Déclaré à Google : 2 applis sur 12 mois ; gagne de l'argent = OUI, case
  « Other », précision « Stripe » (PAS « Subscriptions » ni « In-app
  purchases », qui désignent le paiement de Google) ; aucune catégorie
  spéciale cochée (surtout PAS « Apps designed for kids or families », qui
  déclencherait les règles enfants) ; contact Blandine Pronost / feinn@live.fr.
· Vérifications « Organisation » et « Représentant autorisé » ENVOYÉES,
  EN COURS D'EXAMEN. Document fourni pour l'association.

🟥 ÉTAPE EN COURS, NON TERMINÉE — LA VÉRIFICATION DU SITE :
Google demande de prouver que l'association possède son site. Dans l'ordre :
1. Google Search Console (search.google.com/search-console), avec
   feinn@live.fr : ajouter la propriété de type DOMAIN, en écrivant
   « 2hype.fr » SANS https:// (l'onglet DOMAIN refuse le préfixe) ;
2. ajouter l'enregistrement TXT fourni dans la zone DNS chez INFOMANIAK,
   au même endroit que le A et le CNAME du §68 ;
3. SEULEMENT APRÈS, cliquer « Verify website » dans Play Console.
Faire ça sur ORDINATEUR : il faut recopier un long code sans erreur entre
deux sites.

OBJECTIF ÉNONCÉ PAR ELLE, ENFIN EXPLICITE (la question du §13 est répondue) :
🟥 « ÊTRE TROUVÉE PAR DES INCONNUS ». Conséquences dites : l'appli devra être
PUBLIQUE (pas « non répertoriée », pas test fermé), avec une fiche soignée, et
sur les DEUX magasins à terme.
DIT FRANCHEMENT ET NON CONTESTÉ : un magasin ne crée pas la demande. Les vrais
leviers, dans l'ordre : (1) des pages PUBLIQUES de résultats FFE lisibles par
Google — aujourd'hui tout est derrière la connexion, donc invisible ; (2) les
CLUBS plutôt que les cavalières isolées (un club = vingt personnes, et Hype vit
avec un groupe) ; (3) le partage depuis l'appli, qui existe déjà ; (4) les
magasins. ⚠️ Tension assumée à trancher un jour : « être trouvée » et « tout
est derrière une connexion » s'opposent.

LINGUAE → 🟩 RENOMMÉE « HORSE LINGO » (décision du 20/09).
Raison : plus trouvable qu'un nom latin qui ne dit ni cheval ni langues.
Vérifié libre par elle sur Google Play et l'App Store. Test de prononciation
fait (« ouais ça va ») — le même test avait fait écarter « horsehype ».
· DESCRIPTION COURTE ARRÊTÉE, 80 caractères pile, la limite de Google Play :
  « Apprends le vocabulaire équestre en 7 langues : chevaux, soins, voyages,
  concours. » ⚠️ Si le formulaire refuse à 80, enlever le point final.
  Construite avec elle : « équestre » ET « chevaux » voulus tous les deux,
  et AUCUN nombre de villes (« il y aura d'autres villes bientôt »).
· LINGUAE EST À 7 LANGUES : l'arabe est en ligne.
· ✅ ICÔNES : RIEN À REFAIRE. icone-linguae-512-2.png fait bien 512×512, la
  taille exigée par Play ; la 192 et les deux apple-touch-icon (180) existent.
  ⚠️ Seul point à voir à l'aperçu : Android rogne ~20 % sur une icône
  « maskable » et la crinière du cheval est près du bord droit.
· RELEVÉ FAIT DANS lingo.html : « Linguae » apparaît 130 fois, en trois
  familles — (1) une trentaine de TEXTES VISIBLES (titre de la page, nom
  d'installation, titre d'accueil, « Hype Linguae · Voyage 1 », écrans
  Premium et compte, « Linguae dans ta poche », textes de partage en
  7 langues) ; (2) une vingtaine de NOMS DE FICHIERS (apple-touch-icon-
  linguae.png, sw-linguae.js, linguae.webmanifest, cache « linguae-v2»…) ;
  (3) des messages internes et commentaires, invisibles.
  🟥 NE JAMAIS RENOMMER LES FICHIERS DE LA FAMILLE (2) DANS LE CODE SEUL :
  ça casserait l'appli. ELLE N'A PAS ENCORE CHOISI l'ampleur du renommage
  (minimum visible / tout le visible / plus tard).
· Linguae est en ligne sur https://majestic-melba-997a68.netlify.app —
  adresse générée par Netlify. ⚠️ Elle ne dit rien et ne se retient pas :
  prévoir un nom de domaine propre avant publication.

RESTE À FAIRE, DANS L'ORDRE, POUR PUBLIER SUR PLAY :
1. finir la vérification du site (ci-dessus) ;
2. attendre la réponse de Google sur l'organisation ;
3. emballer l'appli — ⚠️ CETTE ÉTAPE DEMANDE UN ORDINATEUR ;
4. la fiche du magasin : titre, description courte (prête), description
   longue (4 000 caractères, où placer « cavalier », « galop », « poney »,
   « concours »), icône (prête), captures d'écran, politique de
   confidentialité.
⚠️ ELLE COMMENCERA PAR HORSE LINGO, PAS PAR HYPE : moins de risque (pas de
comptes, pas d'abonnement, pas de photos), et si la fiche rate, l'outil dont
ses cavalières se servent tous les jours n'est pas touché. Dit aussi
franchement : Horse Lingo n'amènera probablement pas les inconnues visées,
c'est un galop d'essai.

🟥 CE QUI MANQUE ENCORE À CE SUIVI, ET QU'ELLE SEULE PEUT REDONNER :
sa LISTE DE 8 POINTS « à faire sur ordinateur », établie dans une autre
conversation à l'époque où l'appareil photo a été ajouté. Elle n'est NULLE
PART. Quand elle la retrouve, la coller ICI telle quelle.

────────────────────────────────────────────────────────────
70. 20/09 (soir, 22 h) — LE 296 : CORRECTION DU 295, ET LA SOIRÉE
    DOMAINES / MAGASINS
────────────────────────────────────────────────────────────

🟥 ERREUR DU 295, TROUVÉE PAR ELLE EN TESTANT — ET CORRIGÉE AU 296.
Message rouge « Can't find variable: hypeHeurePropre » en enregistrant la
modification d'un rendez-vous (capture de 22 h 37, CSO Étrier de Paris).
CAUSE : la fonction hypeHeurePropre() avait été écrite À L'INTÉRIEUR de
ajouterAgendaClub(), donc invisible depuis modifierAgendaClub().
CONSÉQUENCE OBSERVÉE : la CRÉATION d'un rendez-vous marchait, la
MODIFICATION était bloquée. Rien de perdu en base.
CORRECTIF DU 296 : la fonction est remontée au niveau du fichier, juste
avant ajouterAgendaClub. Un seul déplacement, aucun autre changement.
⚠️ Leçon à ne pas réapprendre : une fonction déclarée dans le corps d'une
autre n'existe que là. Vérifier le niveau de déclaration quand une fonction
est partagée par deux appelants.

À TESTER SUR LE 296 (dans cet ordre) :
1. le numéro en bas de l'accueil affiche 296 ;
2. MODIFIER un rendez-vous existant → plus de message rouge, ça enregistre ;
3. à la création comme à la modification, « 1650 » devient « 16h50 » ;
4. l'astuce iOS s'affiche sous « Je serai prévenue ».
⚠️ Les rendez-vous DÉJÀ en base ne sont pas corrigés rétroactivement.

────────────────────────────────────────────────────────────

✅ 2hype.fr — VÉRIFIÉ CHEZ GOOGLE DES DEUX CÔTÉS (21 h 58 / 22 h 05).
· Search Console : propriété de type DOMAIN, « Ownership auto verified »,
  méthode « Domain name provider ». Le TXT google-site-verification=CQ_Qdk2…
  est posé dans la zone DNS d'Infomaniak (7 enregistrements en tout).
  🟥 NE JAMAIS SUPPRIMER CETTE LIGNE TXT : la vérification tomberait.
· Play Console : champ « Organization website » = https://2hype.fr →
  ✅ « Website verified ». ⚠️ Play exige le préfixe https://, Search Console
  le REFUSE. Les deux formulaires n'ont pas les mêmes règles.
· Le compte Play est bien de type ORGANIZATION, D-U-N-S 276138956,
  FEINN EQUITATION ET ENVIRONNEMENT, propriétaire feinn@live.fr.
· « Developer name » actuel : « Hype équitation » — c'est le nom d'éditeur
  vu par le public sur Play. Modifiable. À revoir puisque la PREMIÈRE appli
  publiée sera Horse Lingo, pas Hype.
· ⚠️ À SAVOIR AVANT PUBLICATION : sur un compte Organisation, Play affiche
  publiquement l'adresse de l'organisation (3 chemin des Prés Picard). Non
  tranché.
· RESTE CHEZ GOOGLE : attendre la réponse sur « Organisation » et
  « Représentant autorisé », envoyées, en cours d'examen.

────────────────────────────────────────────────────────────

✅ horselingo.fr — ACHETÉ ET BRANCHÉ (22 h 10 → 22 h 24).
· Acheté chez Infomaniak, 5,10 € HT la 1re année (7 € HT ensuite), expire le
  20/09/2027, propriétaire Blandine Pronost – Feinn équitation et
  environnement, « Masquer le propriétaire dans le Whois » = OUI.
· ⚠️ PIÈGE ÉVITÉ DE JUSTESSE : le tunnel de commande avait pré-coché un
  « Hébergement Web » à 5,75 €/MOIS, total affiché 73,90 €. Elle a corrigé
  avant de payer. À REDIRE à chaque achat Infomaniak : cocher « Non, je n'ai
  pas besoin de site Internet » et vérifier le panier.
· horselingo.com est PRIS (Infomaniak ne proposait que horse-lingo.com et
  parishorselingo.com).
· Netlify : domaine ajouté sur le site majestic-melba-997a68, horselingo.fr
  en domaine principal, www redirige. Zone DNS d'Infomaniak : A (vide) →
  75.2.60.5 et CNAME www → majestic-melba-997a68.netlify.app.
  À 22 h 24 les deux « Pending DNS verification » avaient disparu ;
  restait « Waiting on DNS propagation » pour le certificat.

────────────────────────────────────────────────────────────

🟥 DÉCOUVERTE MAJEURE DU SOIR — LE SUIVI LINGUAE SE TROMPE.
SUIVI-LINGUAE.md dit « Linguae → majestic-melba-997a68.netlify.app ».
C'EST FAUX, vérifié dans le Deploy file browser du dépôt du 19/08 : ce site
ne contient que 404.html et index.html, 3,8 Ko AU TOTAL. Horse Lingo pèse
873 Ko à elle seule. Cet index.html n'est qu'une page de REDIRECTION vers
2hype.netlify.app — d'où « je clique sur horselingo.fr et j'arrive sur Hype ».
👉 La vraie adresse de Horse Lingo est 2hype.netlify.app/lingo.html : elle vit
DANS le dossier de Hype. Le domaine et le DNS sont corrects ; c'est le
contenu du site qui ne l'est pas.

CE QUE lingo.html EMMÈNE AVEC ELLE (relevé fait le 20/09 sur le fichier
qu'elle a fourni, 873 518 octets) :
· 44 fichiers de vocabulaire hype-lingo-lex-*.js (aachen, andalou,
  apprentissage, arrivee, badminton, balade, barcelone, cheval, connemara,
  cours, cross, derby, ecurie, elevage, endurance, enseignant, flyinge,
  fontainebleau, formation, froid, haras, horsemanship, jeunes, liberte,
  obstacle, oliva, pansage, parade, polo, poney, rome, tradition,
  urgences / urgences-med / urgences-vet, vejer, vente, versailles, walsall,
  wellington, western, windsor) + hype-lingo-phrases-monde.js,
  hype-lingo-villes.js, hype-lingo-villes-monde.js ;
· les images des villes (carte-*.webp, fond-*.webp), themes-hero.webp,
  carnet-ferme/‑page.webp, installer.webp, hors-ligne.webp, lingua-*.webp ;
· les vidéos ouverture.mp4 et depart.mp4 ;
· sw-linguae.js, linguae.webmanifest, apple-touch-icon-linguae.png ;
· les pages lingo-collection.html et lingo-globe.html.
DEUX CORDONS VERS HYPE : un lien « ./index.html#premium » (l'écran Premium
de Hype) et un pont window.HYPE / postMessage (≈19 + 8 occurrences). Sa
propre note en tête de lingo.html dit que ces appels sont GARDÉS et que le
module « tournait déjà seul depuis la v22 » — à vérifier en vrai.
Supabase est utilisé (19 occurrences).

🟠 DÉCISION OUVERTE, POSÉE ET NON TRANCHÉE (elle a dit « on réfléchit ») :
A — RACCOURCI : faire pointer horselingo.fr sur le site de Hype avec une
    règle qui envoie sur lingo.html. Quelques minutes, suffit pour Play,
    les deux applis restent dans le même dossier.
B — VRAIE SÉPARATION : nouveau dossier + nouveau site, on y copie tout ce
    qui est listé ci-dessus, puis on coupe les deux cordons.
⚠️ CONSÉQUENCE DITE ET NON CONTESTÉE, valable pour B et pour « deux applis
qui pointent l'une vers l'autre » : à deux adresses différentes, le partage
automatique de la CONNEXION et du PREMIUM s'arrête. Il faudrait se connecter
deux fois, et le Premium payé sur Hype ne serait pas reconnu sur Horse Lingo
sans travail supplémentaire. La base, elle, peut servir les deux (une
autorisation à ajouter).
👉 LA QUESTION QUI DÉCIDE DE TOUT : Horse Lingo doit-elle connaître les
comptes de Hype ? Si non, la séparation est simple. Si oui, c'est un vrai
chantier.

────────────────────────────────────────────────────────────

FICHE GOOGLE PLAY DE HORSE LINGO — AVANCÉE DU SOIR.
· Description longue RÉDIGÉE et donnée dans la conversation (~1 700 des
  4 000 caractères), avec les sections POUR QUI et CE QUE TU Y TROUVES.
  Elle ne l'a pas encore validée.
· Titre : trois pistes proposées, NON TRANCHÉ — « Horse Lingo »,
  « Horse Lingo — Vocab équestre » (28), « Horse Lingo : mots du cheval » (28).
· 🟥 MANQUE, ELLE SEULE PEUT LE DONNER : LA LISTE DES SEPT LANGUES. On sait
  seulement que l'arabe est la septième. Important pour la fiche : les gens
  cherchent par langue.
· 🟥 POLITIQUE DE CONFIDENTIALITÉ : exigée par Google sous forme d'adresse
  publique. Son contenu DÉPEND de la décision A/B ci-dessus (avec ou sans
  comptes). À écrire APRÈS.

────────────────────────────────────────────────────────────
71. 20/09 (22 h 55) — L'AFFICHE EN GRAND QUAND ELLE EST SEULE (297)
────────────────────────────────────────────────────────────

SA DEMANDE, sur la fiche du stage CSO du 27/09 : « pour les stages s'il y a
une seule affiche on la rend plus visible ? ». Elle a raison : une affiche
faite exprès ne mérite pas une vignette de moitié d'écran.

DEUX OPTIONS PRÉSENTÉES, ELLE A CHOISI B :
A — affiche pleine hauteur ⚠️ les boutons « Je viens » / « Je serai
    prévenue » / « Partager » passaient sous le pli ;
B — ✅ RETENU : affiche pleine largeur, HAUTEUR PLAFONNÉE, boutons toujours
    visibles.

CE QUI EST FAIT (une seule zone de code, la rangée des documents de la page
du rendez-vous) :
· s'il n'y a QU'UNE carte (typiquement l'affiche seule) → une seule colonne,
  hauteur min(56svh, 460px), et objectFit `contain` : l'affiche se lit en
  ENTIER, jamais rognée ;
· dès DEUX cartes ou plus (affiche + documents mis en avant) → la grille à
  deux colonnes d'avant, strictement inchangée.

🟠 QUESTION POSÉE, NON TRANCHÉE : quand il y a PLUSIEURS images, garde-t-on
la grille actuelle, ou met-on la première en grand et les autres en vignettes
dessous ?

🟠 AUTRE MANQUE SIGNALÉ, NON TRAITÉ (elle n'a pas validé) : le menu « ••• »
de la page du rendez-vous n'a PAS d'entrée « Supprimer ». Il faut ressortir
de la fiche et passer par la croix de la carte dans l'agenda du club. La
fonction supprimerRdvClub() existe déjà, avec confirmation — il n'y aurait
qu'une entrée de menu à ajouter.

────────────────────────────────────────────────────────────
72. 20/09 (23 h) — LE TITRE DES PUBLICATIONS REDEVIENT LISIBLE (298)
────────────────────────────────────────────────────────────

SA REMARQUE, capture de 22 h 57 (fiche du CSO du 27/09) : « les commentaires
sont plus lisibles là avec le bouton mettre en avant ». Le titre de la
publication était réduit à « Br à.. ».

CAUSE : sur CETTE page, la ligne du titre porte TROIS boutons — « Mettre en
avant », « Modifier », « × ». Ils prenaient toute la largeur ; le titre,
`flex: 1, minWidth: 0`, se rétractait jusqu'à deux caractères.

CORRECTIF : le titre passe SEUL sur sa ligne, pleine largeur, les trois
boutons juste en dessous, alignés à droite.
⚠️ Portée volontairement étroite, comme le 233 et le 253 avant lui : le
changement ne part QUE si la prop `onMettreEnAvant` est passée, c'est-à-dire
uniquement sur la fiche d'un rendez-vous. Les SEPT autres écrans qui
affichent ce même dessin de carte (murs, page Tout voir, fil d'un cheval…)
gardent le rendu d'avant au pixel près — ils n'ont pas ce bouton, donc le
titre y a déjà la place.
⚠️ Conséquence dite et acceptée : la carte gagne une ligne de haut.

────────────────────────────────────────────────────────────
73. 20/09 (23 h 15) — RESPIRATION ET LISIBILITÉ DE LA FICHE (299)
────────────────────────────────────────────────────────────

Capture annotée de 23 h 11, trois demandes sur la même zone :

1. AÉRER SOUS LES QUATRE BOUTONS → le compteur « N inscrite(s) » passe de
   marginTop 10 à 20.
2. LES QUATRE BOUTONS ACCORDÉS (« on peut les accorder niveau taille ? »).
   Avant : « Je viens » 58 % / « Agenda » 42 %, hauteur 54, rayon 16,
   texte 14,5 ; « Me prévenir » et « Partager » hauteur 46, texte 12,5.
   Après : les quatre en flex 1, hauteur 50, rayon 14, texte 13.
3. LA PHRASE « PLUS QU'UN RENDEZ-VOUS, DES MOMENTS FORTS » (« mets la en
   plus grand et gras et blanc on la lit pas ») : 9,5 px / 55 % d'opacité →
   11,5 px, graisse 700, blanc plein. Interlettrage ramené de 2,2 à 1,6 —
   à cette taille l'écart hachait les mots. Marges 10/14 → 26/22, donc de
   l'air au-dessus ET en dessous.

🟠 SA QUATRIÈME DEMANDE, NON TRAITÉE, À CLARIFIER : « fais en sorte que dans
les commentaires on puisse choisir plusieurs photos d'un coup ».
RELEVÉ FAIT : le COMPOSEUR de publication (« Partage un moment… ») accepte
DÉJÀ plusieurs photos (`multiple: true`, et sa propre capture montre un post
à trois photos). Ce sont les RÉPONSES sous une publication qui n'en acceptent
qu'une : `choisirRep()` ne lit que `files[0]` et `photoRep` ne stocke qu'un
média par fil. Passer les réponses au multi-photos demande de changer l'état,
l'aperçu et l'envoi — ce n'est pas un `multiple: true` à ajouter. À lui faire
préciser avant de coder.

────────────────────────────────────────────────────────────
74. 20/09 (23 h 25) — LES PUBLICATIONS DANS L'ORDRE DE LECTURE (300)
────────────────────────────────────────────────────────────

SA DEMANDE : « pour les commentaires je pense qu'on devrait laisser les
derniers en bas et les premiers en haut ». Cohérent : sur la fiche d'un
rendez-vous, le champ pour écrire est EN BAS (option `composerEnBas`), donc
la conversation doit se lire du haut vers le bas.

CE QUI EST FAIT : l'ordre suit la position du champ de saisie.
· `composerEnBas` (uniquement la fiche d'un rendez-vous) → du plus ancien au
  plus récent ;
· partout ailleurs (murs d'écurie et de club, page d'un cheval, « Tout
  voir »… les huit écrans qui partagent ce composant) → inchangé, le plus
  récent en premier.
NOTE TECHNIQUE : `listerCommentaires` trie déjà en ASCENDANT ; MurHype
inversait systématiquement. Il suffit de ne plus inverser dans ce cas.

⚠️ CONSÉQUENCE DITE ET ACCEPTÉE : on arrive sur le DÉBUT de la conversation.
Avec beaucoup de publications, il faut descendre pour voir la dernière.

🟠 TOUJOURS EN SUSPENS : la sélection de plusieurs photos. Elle dit « elle en
prend plusieurs mais on doit les sélectionner une par une ». Or le composeur
est DÉJÀ en `multiple: true` (bouton 📷 Photos → `fRef`), et le correctif du
228 gère bien une sélection multiple (limite : 4 médias par message). Seules
les RÉPONSES sous une publication sont mono-fichier. DEUX QUESTIONS POSÉES,
SANS RÉPONSE À CETTE HEURE : (1) appuie-t-elle sur 📷 Photos du composeur ou
sur l'appareil photo d'une réponse ? (2) la photothèque iOS propose-t-elle
« Ajouter » avec plusieurs vignettes, ou se ferme-t-elle à la première ?
NE PAS CODER AVANT SA RÉPONSE.

────────────────────────────────────────────────────────────
75. 20/09 (23 h 40) — MENTIONNER QUELQU'UN LE PRÉVIENT ENFIN (301)
────────────────────────────────────────────────────────────

SA DEMANDE : « il faudrait qu'on puisse mentionner un cavalier et que ça lui
envoie une notification quand on le fait dans les commentaires ou photos de
l'événement ». Puis, sur les deux chemins proposés : « les deux ».

CE QUI EXISTAIT DÉJÀ, ET QU'ELLE NE SAVAIT PAS : le lien « Identifier » sous
« Partage un moment… » (build 42, 12/09) ouvre la liste des cavalières et des
chevaux, et les identifiés s'affichent sous la publication. Il marche déjà sur
la fiche d'un rendez-vous. CE QUI MANQUAIT : la notification. Écrire une
identification sur une publication ne prévenait personne — alors que
l'identification dans un COMMENTAIRE DE PHOTO notifie depuis le build 63.

✅ CHEMIN A LIVRÉ AU 301, trois points, aucun SQL :
1. `enregistrerTagsEtLieu` appelle hypeNotifier après l'insert, type
   « identification_post ». ⚠️ Seulement les CAVALIERS : un cheval n'a pas de
   compte à prévenir. hypeNotifier refuse déjà de se notifier soi-même.
2. Nouveau libellé dans l'onglet « Toi » : « t'a identifiée dans une
   publication », 6 langues (le build 65 n'avait traité que le commentaire).
3. LE TAP MÈNE ENFIN QUELQUE PART : la cible « agenda:<id> » ouvrait la page
   du club et s'arrêtait là. Elle renseigne maintenant window.__agendaFiche,
   que la page du club sait lire depuis le build 93 — la FICHE du rendez-vous
   s'ouvre. Une cible « agenda » sans identifiant retombe sur la page du club,
   comme avant. (Leçon du 65 : ne jamais livrer une notification qui ne mène
   nulle part.)

🟠 CHEMIN B, VOULU PAR ELLE, NON COMMENCÉ — c'est un chantier à part :
le vrai « @ » tapé dans le texte. Il demande la liste qui s'ouvre pendant la
frappe, le nom stocké dans le texte, l'affichage du nom en couleur, et le tout
à refaire dans les réponses. À cadrer à froid, pas en fin de soirée.

À TESTER SUR LE 301 : identifier une cavalière dans une publication d'un
rendez-vous → elle reçoit une notification « t'a identifiée dans une
publication » → le tap ouvre la fiche du rendez-vous.
⚠️ Se tester à DEUX comptes : on ne reçoit jamais ses propres notifications.

────────────────────────────────────────────────────────────
76. BRIEFING PRÊT À COLLER — OUVRIR LE CHANTIER « @ » DANS UNE
    NOUVELLE CONVERSATION (décidé le 20/09 à 23 h 45)
────────────────────────────────────────────────────────────

Elle ouvrira le chemin B dans une conversation neuve. Elle y enverra
index.html (le 301) et SUIVI.md, puis collera le texte ci-dessous tel quel.

--- DÉBUT DU TEXTE À COLLER ---

CHANTIER : LE « @ » DANS LE TEXTE (Hype)

Contexte
Hype est une PWA équestre, un seul fichier index.html (~7,8 Mo), React
monolithique, Supabase + Netlify. Je développe seule depuis mon iPhone :
je pousse sur GitHub et je passe le SQL moi-même. Je ne suis pas
développeuse — explique-moi en langage simple ce que ça change pour moi
et ce que j'ai à faire, pas la mécanique.

Règles de travail, non négociables
- 1 action → 1 modification atomique → je teste sur iPhone → je valide →
  action suivante. Aucune refonte simultanée, aucun nettoyage
  opportuniste, rien hors périmètre.
- Ne décide jamais à ma place : présente les options et attends mon
  « ok » / « vas-y » / « valide ».
- Signale toutes les conséquences AVANT d'agir, et toutes les erreurs
  immédiatement.
- À chaque livraison : dis-moi précisément quels fichiers pousser et où,
  et ne liste que ce qui est nouveau.
- Mets SUIVI.md à jour à CHAQUE livraison, et rends-le-moi complété,
  groupé avec index.html. Jamais SUIVI.md tout seul (ça fait buguer
  l'appli).
- Diagnostic en base : UNE seule requête SELECT courte à la fois. Je
  l'exécute, je donne le résultat, tu n'interprètes que ce qu'il prouve.

Ce qui est déjà fait et qu'il ne faut PAS refaire
- Le lien « Identifier » sous « Partage un moment… » existe depuis le
  build 42 : il ouvre la liste des cavalières et des chevaux, écrit dans
  la table `identifications` (photo_url = « post:<id> », statut
  « accepte »), et les identifiés s'affichent sous la publication.
- Depuis le build 301, identifier une CAVALIÈRE dans une publication lui
  envoie une notification « t'a identifiée dans une publication », et le
  tap ouvre la fiche du rendez-vous (window.__agendaFiche).
- L'identification dans un commentaire de photo notifie depuis le
  build 63.

Ce que je veux maintenant
Un vrai « @ » tapé dans le texte : je tape @, une liste de cavalières
s'ouvre, je choisis, le nom apparaît dans le message, et la personne est
prévenue. Idem dans les réponses sous une publication.

Points que je sais déjà lourds, à cadrer avec moi avant tout code
- la liste qui s'ouvre pendant la frappe (sur iPhone, sans faire sauter
  le curseur) ;
- comment le nom est stocké dans le texte du message ;
- l'affichage du nom en couleur à la lecture ;
- qui peut être mentionné (les cavalières de l'écurie ? tout le monde ?) ;
- la même chose dans les réponses.

Commence par me proposer un découpage en étapes, sans coder.

--- FIN DU TEXTE À COLLER ---

────────────────────────────────────────────────────────────
77. 20/09 (302) — LES QUATRE BOUTONS PLUS DISCRETS, DE L'AIR
    SOUS LES DEUX AFFICHES
────────────────────────────────────────────────────────────

SA DEMANDE : « réduis un peu les 4 onglets et laisse plus d'espace en dessous
des deux affiches » (capture de la fiche du CSO Étrier de Paris, 23 h 38).

✅ LIVRÉ AU 302, une seule modification, aucun SQL :
· hauteur des quatre boutons (Je viens, Agenda, Je serai prévenue, Partager)
  50 → 44 px ; texte 13 → 12,5. Ils restent ACCORDÉS entre eux — même
  largeur, même hauteur, même rayon, même taille de texte (règle du 299) ;
· espace entre le bas des deux affiches et « Je viens » : 14 → 30 px
  (padding haut du bloc des boutons 12 → 28 ; le padding bas de la rangée
  de cartes, 2 px, n'a pas bougé).

PÉRIMÈTRE : la fiche d'un rendez-vous, donc TOUS les rendez-vous. Rien
d'autre n'est touché — ni les affiches, ni le compteur d'inscrites, ni le
mur du bas. Marqueur de build passé à 20260920-302.

────────────────────────────────────────────────────────────
78. 20/09 — TROIS POINTS OUVERTS, AUCUN CODÉ
────────────────────────────────────────────────────────────

(1) SÉLECTION DE PLUSIEURS PHOTOS — RÉPONSE OBTENUE (question du 74).
Elle : « je peux pas sélectionner plusieurs, dès que j'en sélectionne une
ça l'envoie ». La photothèque iOS se REFERME au premier appui : ce n'est
donc pas la limite de 4 médias ni le tri du composeur, c'est le champ de
fichier qui se comporte en mono-sélection à cet endroit-là. RESTE À SAVOIR,
et c'est la première chose à établir avant tout code : sur QUEL bouton elle
appuie — 📷 Photos du composeur (multiple: true) ou l'appareil photo d'une
RÉPONSE sous une publication (mono-fichier par construction). Si c'est la
réponse, le comportement est normal et le chantier est « les réponses
acceptent plusieurs médias ».

(2) « ON ARRIVE SUR L'ÉVÉNEMENT, LA PAGE EST FLOTTANTE » — vidéo de 4,7 s
du 20/09 à 23 h 38. CE QUE LA VIDÉO MONTRE : à l'arrivée, le contenu est
DÉCALÉ VERS LA GAUCHE (le sur-titre « CONCOURS » et le titre sont coupés au
bord), puis se remet en place au premier défilement ; le bandeau passe aussi
sous la barre d'état. NON DIAGNOSTIQUÉ, NON TOUCHÉ. Pistes à vérifier une
par une, sans rien coder avant : la fiche est un calque plein écran rendu en
PORTAIL vers body, et l'app porte une navigation par balayage horizontal —
un décalage horizontal à l'ouverture ressemble à une animation de transition
qui n'est pas remise à zéro.

(3) LA PHRASE « PLUS QU'UN RENDEZ-VOUS, DES MOMENTS FORTS ».
Elle : « tu peux la centrer, elle peut être un poil moins visible, pas en
majuscule et en italique » + « on aurait pas un meilleur contenu à mettre
dedans ? genre citation en rapport avec compétition ? ». ⚠️ C'est l'INVERSE
du 299, où elle demandait « mets-la en plus grand et gras et blanc on la lit
pas » : le 299 l'avait passée de 9,5 px/55 % à 11,5 px/gras 700/blanc plein.
Elle veut redescendre, mais en italique et en minuscules. Options proposées,
en attente de sa réponse — rien n'est codé.

────────────────────────────────────────────────────────────
79. 20/09 (303) — LA PHRASE D'UN RENDEZ-VOUS EST TIRÉE AU SORT
    (deux banques : concours et stages, 6 langues)
────────────────────────────────────────────────────────────

SES DEUX RÉPONSES : placement « c'est ok » (= la phrase qui existe déjà,
entre ses deux traits, au-dessus des publications — aucun bloc nouveau,
aucune hauteur de plus) et « oui ça doit être traduit dans toutes les
langues comme tout le reste ».

✅ LIVRÉ AU 303, aucun SQL, aucune requête, aucune table :
1. `HYPE_PHRASES_RDV`, un objet posé JUSTE AVANT FicheEvenementClub :
   une entrée par type de rendez-vous, chaque phrase en SIX langues
   (fr, en, es, it, ja, de) comme tout le reste de l'appli. 13 phrases
   pour `concours`, 14 pour `stage` — ses deux banques, mot pour mot.
2. `hypePhraseRdv(type)` tire au sort dans la banque du type et rend NULL
   si ce type n'a pas de banque.
3. Le tirage est fait UNE SEULE FOIS par ouverture : React.useMemo calé sur
   l'identifiant ET le type du rendez-vous, posé avec les autres hooks,
   au-dessus du `if (!ev)`. La phrase ne bouge donc pas pendant que la fiche
   est ouverte (et la fiche se re-rend beaucoup : inscriptions, mur,
   panneaux) ; une autre ouverture peut en tirer une autre.
4. L'AFFICHAGE REMPLACE la phrase fixe : italique, minuscules, 12 px,
   opacité 62 %, centrée entre les deux traits. ⚠️ Elle peut désormais
   REVENIR À LA LIGNE — l'ancienne était en `nowrap`, une phrase entière n'y
   tiendrait pas sur un iPhone.

⚠️ LA CLÉ EST `ev.type`, le champ qui existait déjà (objet META de la fiche,
trois valeurs : concours, stage, sortie). Rien inventé, rien ajouté en base.
⚠️ LES SORTIES gardent EXACTEMENT l'ancienne phrase, dans son ancien style
(capitales, gras, blanc) : une banque manquante n'affiche jamais un vide.
⚠️ `stage` est aussi la valeur de REPLI de META : un rendez-vous dont le type
serait vide tombera sur les phrases de stage. Sans conséquence, mais à savoir.
⚠️ CE BUILD DÉFAIT EN PARTIE LE 299, et c'est voulu : le 299 avait grossi et
blanchi cette phrase parce qu'elle ne se lisait pas. Elle redescend, mais en
italique et en minuscules — sa demande du 20/09 au soir.

POUR AJOUTER UNE CATÉGORIE PLUS TARD (sorties, vie du club…) : une entrée de
plus dans `HYPE_PHRASES_RDV`, sous le nom exact du type. Rien d'autre.

VÉRIFICATION AVANT LIVRAISON : `node --check` sur le script principal
(6,4 Mo) — OK. Marqueur de build passé à 20260920-303.

À TESTER SUR L'IPHONE : ouvrir un CONCOURS (phrase de la banque concours),
ouvrir un STAGE (phrase de la banque stage), rouvrir le même rendez-vous
plusieurs fois (la phrase change d'une ouverture à l'autre), ouvrir une
SORTIE (l'ancienne phrase, inchangée).

🟠 TOUJOURS EN SUSPENS, RIEN CODÉ : la page flottante à l'arrivée sur un
rendez-vous (point 78-2) et la sélection de plusieurs photos (point 78-1).

────────────────────────────────────────────────────────────
80. 21/09 (304) — LES CARTES DE RÉSULTATS À LA MESURE DES CARTES
    DE RENDEZ-VOUS, PARTOUT ; MOINS DE VIDE SUR LA PAGE DU CLUB
────────────────────────────────────────────────────────────

SA DEMANDE (capture de 11 h 04, page du club) : « réduis l'espace inutile et
aligne les encoches des rendez-vous et des résultats, même taille même
alignement », « ok », puis « tu peux faire la même modif partout où il y a
les cartes rendez-vous et résultats ».

RELEVÉ AVANT DE TOUCHER :
· LES CARTES DE RENDEZ-VOUS (AgendaClubHype) sont à DEUX endroits : la page
  du club ET la page Agenda. Elles ne changent pas : ce sont elles, la
  référence (largeur 46 %, coins 20).
· LES RAILS DE RÉSULTATS affichés sont TROIS : page du club, page cavalière
  (BlocResultatsCavaliere), fiche cheval (rail du bas). Un quatrième existe
  sur la fiche cheval, NEUTRALISÉ au 116 : pas touché.

✅ LIVRÉ AU 304, aucun SQL :
1. SUR LES TROIS RAILS : largeur des cartes 158 px → 46 % (même règle que
   les cartes de rendez-vous), coins 14 → 20, nom du concours limité à
   2 lignes avec « … ».
2. TOUTES LES CARTES D'UN RAIL ONT LA MÊME HAUTEUR. Sur la page cavalière et
   la fiche cheval, c'était déjà le cas. Sur la page du club, le 293 avait
   posé l'inverse (« flex-start », chaque carte à son texte) : ⚠️ ANNULÉ
   VOLONTAIREMENT, puisqu'elle demande la même taille. La limite à 2 lignes
   borne la carte la plus haute. Conséquence possible : une carte qui porte
   d'autres classés (jusqu'à 3 lignes de plus) allonge toutes les autres
   du même rail.
3. PAGE DU CLUB : le titre « Derniers résultats » décalé de 4 px pour tomber
   sur le même bord que « L'agenda du club » ; la marge au-dessus de l'agenda
   passe de 46 à 16 px.

VÉRIFICATION : node --check sur le script principal (qui contient les trois
composants touchés) — OK. Modifications confinées aux lignes visées.
Marqueur de build 20260921-304.

⚠️ CE FICHIER CONTIENT AUSSI LES 302 ET 303, pas encore poussés à la date de
cette livraison.

🟠 TOUJOURS EN SUSPENS, RIEN CODÉ : la page flottante (sécurité anti-décalage
sur toute la fiche + phrase des sorties qui revient à la ligne) — proposée,
son « ok » n'a pas été donné explicitement pour ce point ; la sélection de
plusieurs photos (quel bouton ?).

────────────────────────────────────────────────────────────
81. 21/09 (305) — ACCUEIL : « WHAT'S UP » EN DERNIER, LE BOUTON DES
    QUÊTES HABILLÉ COMME « MON COMPTE »
────────────────────────────────────────────────────────────

CONFIRMÉ SUR SA CAPTURE DE 11 H 12 : l'index en ligne est le 304 (« INDEX
20260921-304 ») — les 302, 303 et 304 sont donc poussés.

SA DEMANDE : « passe le What's up en dernier et laisse un peu d'espace entre
l'écriture et le bas du dernier onglet », « rendre le voir toutes les quêtes
similaire à l'onglet de mon compte et les aligner ». Proposition faite
(icône ✦), « ok ».

✅ LIVRÉ AU 305, aucun SQL :
1. LA LIGNE « WHAT'S UP » passe SOUS « Mon compte », avec 22 px d'air. Rien
   d'inventé : c'est la prop `compte` de LienQuoiDeNeuf, déjà posée pour la
   page Mon compte, qui fait exactement ça.
2. « VOIR TOUTES MES QUÊTES » (BlocProchainesQuetes) reprend TRAIT POUR TRAIT
   le style de l'onglet « Mon compte » : carte sombre (COLORS.nuitClaire),
   bordure COLORS.ligne, coins 16, padding 14/16, carré d'icône turquoise
   34 px, texte blanc 14,5 à gauche, flèche grise à droite. Icône : ✦, celle
   du titre « Tes prochaines quêtes ».
3. ALIGNÉS : même largeur, mêmes bords ; 10 px entre les deux (la marge du
   haut de « Mon compte » passe de 16 à 10).

⚠️ CONSÉQUENCE DITE ET ACCEPTÉE : le bouton des quêtes n'est plus plein et
turquoise ; il attire moins l'œil. BlocProchainesQuetes n'est rendu QU'À UN
endroit (l'accueil) : rien d'autre n'est touché.

VÉRIFICATION : node --check OK, modifications confinées. Build 20260921-305.

🟠 TOUJOURS EN SUSPENS, RIEN CODÉ : la page flottante (son « ok » explicite
pour ce point n'a pas été donné) ; la sélection de plusieurs photos (quel
bouton ?).

────────────────────────────────────────────────────────────
82. 21/09 (306) — ACCUEIL : LES DEUX ONGLETS PLUS DISCRETS ET PLUS ESPACÉS
────────────────────────────────────────────────────────────

✅ LE 305 EST EN LIGNE ET CONFORME (sa capture de 11 h 30 : « INDEX
20260921-305 », les deux onglets alignés, « What's up » tout en bas).

SA DEMANDE : « tu peux les espacer un peu plus et les laisser un peu plus
discrets ». Proposition chiffrée, « oui ok ».

✅ LIVRÉ AU 306, sur les DEUX onglets à l'identique (« Voir toutes mes
quêtes » et « Mon compte »), aucun SQL :
· écart entre eux 10 → 16 px ;
· padding 14/16 → 13/15, donc environ 58 px de haut au lieu de 64 ;
· carré d'icône 34 → 30 px (coins 11 → 10, icône 16 → 14) ;
· texte 14,5 → 13,5, graisse 600 → 500, blanc adouci rgba(237,242,245,0.86)
  au lieu de COLORS.encre.

VÉRIFICATION : node --check OK, modifications confinées. Build
20260921-306 (une seule occurrence).

⚠️ NUMÉROTATION : le redesign de « Déjà passé » (étape 1, carteEvPasse),
cadré et validé dans son brief, devient donc le BUILD 307. Il attend la
validation du 306 sur iPhone.

🟠 TOUJOURS EN SUSPENS, RIEN CODÉ : la page flottante ; la sélection de
plusieurs photos.

────────────────────────────────────────────────────────────
83. 21/09 (307) — « DÉJÀ PASSÉ » : LES CARTES DEVIENNENT DES SOUVENIRS
    (étape 1 du redesign) + L'ACCUEIL S'OUVRE EN HAUT
────────────────────────────────────────────────────────────

CADRE : brief validé par elle (audit accepté, décisions tranchées : pas de
podiums, « N publications » et jamais « N commentaires », aucun auteur,
règle provisoire sur image_url, carrousel à venir intact). Puis « code si tu
as toutes tes réponses ». Et, au passage : « quand on clique sur la page
accueil on arrive en plein milieu de la page, fais en sorte qu'on arrive en
haut ».

✅ (A) carteEvPasse, DANS EcranAgendaClub — SEUL LE DESSIN CHANGE :
· en-tête : cartouche jour + mois court (lu à la main dans « AAAA-MM-JJ »,
  jamais new Date("AAAA-MM-JJ") ; mois par toLocaleDateString dans la langue,
  repli MOIS2), « → jour de fin » si plusieurs jours ; type en petites
  capitales dorées ; titre serif 2 lignes max ; lieu 1 ligne ;
· MOSAÏQUE : médias NETTOYÉS (non-chaînes et vides écartés) et DÉDOUBLONNÉS
  sur une clé normalisée (sans ?…, sans #…, décodée, sans protocole ni « / »
  final — pour comparer seulement, l'URL affichée n'est jamais modifiée).
  1 = panoramique, 2 = côte à côte, 3+ = grande à gauche + deux petites,
  « +N » sur la 3e seulement s'il en reste. Le grand visuel est une PHOTO si
  une photo existe ; les vidéos vont dans les petites cases ; que des vidéos
  = miniature de la 1re en grand. Vidéos par hypeMiniatureVideo, jamais par
  vignetteHype, jamais lues. Images : vignetteHype, lazy, cover, et une image
  qui ne charge pas se masque (fond sombre dessous) ;
· image_url, RÈGLE D'AFFICHAGE SEULEMENT : si elle correspond à un média =
  couverture choisie, placée en premier ; sinon = affiche, utilisée
  UNIQUEMENT s'il n'y a aucun média ; sinon fond sombre + icône du type ;
· CONCOURS : « N médias · N résultats » (chaque morceau masqué s'il vaut 0),
  PAS de podiums ; bouton « Voir le bilan » s'il y a des résultats, sinon
  « Voir le souvenir ». LA LISTE DES RÉSULTATS N'EST PLUS CRÉÉE DU TOUT ;
· STAGE / SORTIE : aucun résultat affiché ; aperçu 2 lignes = description,
  sinon 1re publication qui a du texte (libellé « Souvenir partagé »), sinon
  rien ; « N médias · N publications » ; bouton « Voir les photos » (stage) ou
  « Voir le souvenir » (sortie) ;
· UNE SEULE NAVIGATION pour la carte ET le bouton : window.__evPasse =
  { ev, medias (bruts), resultats (tous) } puis « evenement-passe », comme
  avant. Zone principale, bouton et croix sont TROIS éléments frères : aucun
  bouton imbriqué ;
· LA CROIX DE SUPPRESSION : même condition (estProprio), même appel
  (supprimerRdvClub et sa confirmation), stopPropagation + preventDefault ;
  zone tactile 44 × 44, rond visible 30 px ;
· CSS : classes hype-agenda-passe-*, posées UNE fois par la 1re carte (index
  fourni par .map). Mosaïque : hauteur min(158 px, (100vw − 58 px) / 2),
  soit un ratio 2:1 plafonné.
· Le dépliage sur place (ouvertEv, inutilisé depuis le 171) est recopié tel
  quel. La bande de vignettes et le visionneur qu'elle ouvrait ne sont plus
  dans la carte (tout reste dans la fiche).
NON TOUCHÉ : limite à 5 et « Voir les précédents (N) », carrousel à venir,
calendrier, EcranEvenementPasse, MurHype, requêtes, tables, RLS.

✅ (B) L'ACCUEIL S'OUVRE EN HAUT. Cause : la mémoire de défilement par écran
(session 112, __scrollMem dans le fournisseur) restaurait la dernière
position de l'accueil. Dans `naviguer`, aller vers « dashboard » remet sa
mémoire à 0. ⚠️ SEULEMENT QUAND ON Y VA (onglet, lien) : le retour arrière
(retourEcran) n'est pas modifié.

VÉRIFICATION : node --check sur le script principal (qui contient les deux
modifications) — OK ; aucun JSX ; build 20260921-307 (une occurrence).
⚠️ Contient aussi le 306 s'il n'a pas été poussé.

À TESTER SUR L'IPHONE : voir la réponse de livraison (liste de 14 tests).

🟠 TOUJOURS EN SUSPENS, RIEN CODÉ : la page flottante ; la sélection de
plusieurs photos ; l'identification (301) à tester à deux comptes.

────────────────────────────────────────────────────────────
84. 21/09 (308) — « IDENTIFIER » SUR LES MURS DES RENDEZ-VOUS ET DANS
    LES RÉPONSES
────────────────────────────────────────────────────────────

SA REMARQUE : « j'ai essayé de mentionner qqun dans un commentaire avec @
mais ça me propose aucun cavalier ». NORMAL : le « @ » tapé dans le texte n'a
jamais été codé (chemin B du 301). Elle veut les deux : « 1 et 2 ».

⚠️ ERREUR DE MA PART, TROUVÉE EN RELISANT AVANT DE CODER ET DITE AUSSITÔT :
le §75 (301) affirmait que « Identifier » marchait déjà sur la fiche d'un
rendez-vous. FAUX : le lien n'était rendu que si la cible commence par
« ecurie: » (estFilEcurie). Sur les murs « agenda:<id> » (fiche à venir,
page d'un rendez-vous passé), on ne pouvait identifier PERSONNE, et la
notification du 301 n'y servait donc à rien. Leçon : ne jamais écrire
« ça marche déjà là » sans avoir lu la condition d'affichage.

✅ LIVRÉ AU 308, aucun SQL (même table `identifications`) :
1. « IDENTIFIER » SOUS « PARTAGE UN MOMENT… » AUSSI SUR LES MURS DES
   RENDEZ-VOUS (estMurAgenda). « Ajouter un lieu » reste réservé au fil de
   l'écurie (un rendez-vous a déjà son lieu).
2. « IDENTIFIER » DANS LES RÉPONSES, sur tous les murs : même lien, MÊME
   liste (chargerCandidatsTags, chargée une fois — aucune deuxième liste),
   pastilles des choix avec croix, liste dans le flux. Écriture APRÈS l'envoi
   (photo_url « post:<id de la réponse> », statut accepté) ; un échec ne perd
   jamais la réponse. La réponse ajoutée localement prend son vrai identifiant
   quand il est connu.
3. LES NOMS S'AFFICHENT SOUS LA RÉPONSE (« avec Margot, 🐎 Crumble »), relus
   en UNE requête pour toutes les réponses chargées.
4. NOTIFICATION « t'a identifiée dans une réponse » (nouveau type
   `identification_reponse`, 6 langues), cavalières seulement, cible = celle
   du mur → même trajet au toucher que pour une publication.

⚠️ À VÉRIFIER EN BASE, UNE REQUÊTE : si `notifications.type` porte une
contrainte CHECK, les types `identification_post` (301) et
`identification_reponse` (308) seraient REFUSÉS EN SILENCE (hypeNotifier
avale l'erreur). Requête donnée à Blandine :
select pg_get_constraintdef(c.oid) from pg_constraint c
where c.conrelid = 'public.notifications'::regclass and c.contype = 'c';

VÉRIFICATION : node --check OK, diff confiné (MurHype, libellé de
notification, marqueur). Build 20260921-308. ⚠️ Contient le 307, NON TESTÉ.

DÉCISIONS POUR LA SUITE (309, puis le « @ ») :
· la LISTE proposée : « en priorité ceux de l'écurie, ensuite tous les
  autres » ; les autres cavaliers portent LEUR PREMIÈRE ÉCURIE (profiles.
  ecurie) ENTRE PARENTHÈSES — « Margot (Écurie Feinn) ». Il faudra un champ
  de recherche (on ne liste pas tout Hype) : rechercherCavaliersHype existe
  déjà (pseudo + ecurie, filtre ilike). 309 = cette liste, partagée par
  « Identifier » (publication + réponse) et par le futur « @ ».
· le « @ » en trois étapes : publication, réponses, noms en couleur.

🟠 TOUJOURS EN SUSPENS : la page flottante ; la sélection de plusieurs
photos ; le test du 307.

· 21/09, 11 h 47 — RÉSULTAT DE LA REQUÊTE SUR notifications : « Success. No
  rows returned » → AUCUNE contrainte CHECK sur notifications.type. Les types
  `identification_post` (301) et `identification_reponse` (308) ne sont donc
  pas refusés pour leur nom. Ce résultat ne prouve RIEN d'autre : l'arrivée
  réelle de la notification reste à tester à deux comptes.
· Méthode de test choisie : « 1 » — elle pousse le 308 (qui contient le 307)
  et teste tout ensemble. Une correction éventuelle du 307 sera le 309.

────────────────────────────────────────────────────────────
85. 21/09 (309) — LA PAGE D'UN RENDEZ-VOUS PASSÉ : LE MUR DES SOUVENIRS,
    LES VIDÉOS, PUIS LES RÉSULTATS (dessin recopié de la page d'un cheval)
────────────────────────────────────────────────────────────

✅ 307 ET 308 VUS À L'ÉCRAN (captures de 11 h 52-11 h 53, INDEX 308) : les
cartes « Déjà passé » sont conformes (mosaïque, « +N », « N médias ·
N résultats », « Voir le bilan » / « Voir le souvenir », aucune liste de
résultats) ; « Identifier » apparaît bien sous « Partage un moment… » sur la
page d'un rendez-vous. Sa mention qui « ne propose aucun cavalier » : elle
avait tapé @ — normal, le @ n'est pas codé.

SA DEMANDE : « la série de photos ressemble à rien, on avait fait un joli mur
pour accrocher les souvenirs sur les pages communautaires des chevaux, est-ce
qu'on peut reproduire exactement le mur des souvenirs qui se déplie avec
toutes les photos et ses vidéos puis résultats en dessous avant les
commentaires ? », puis « y a juste à copier le code … et à réadapter », « ok ».

✅ LIVRÉ AU 309, dans EcranEvenementPasse SEULEMENT, aucun SQL, aucune
requête :
· NOUVEL ORDRE : haut de fiche (inchangé) → horaires → description → LE MUR
  DES SOUVENIRS → LES VIDÉOS → RÉSULTATS → Publications & commentaires →
  suppression.
· LE MUR : dessin RECOPIÉ d'EcranChevalCommun (pêle-mêle en deux colonnes
  équilibrées à la hauteur, formes f-p/f-l/f-c, angles, scotch un cliché sur
  trois, 1-2 photos = liste centrée), avec SES PROPRES CLASSES `hyep-*` : la
  page du cheval N'EST PAS TOUCHÉE. 6 photos puis « Voir tous les souvenirs → »
  qui déplie tout (et « Replier les souvenirs ↑ »). Toucher = la photo en
  grand (visionneuse existante). PAS de « @auteur » sur les photos (le paquet
  de la fiche ne le porte pas — décision : sans, pour commencer).
· LES VIDÉOS : le rail de la page du cheval, miniatures par
  hypeMiniatureVideo, toucher = lecture en grand. Pas de durée affichée (la
  miniature ne la fournit pas) ni de titre (une vidéo de rendez-vous n'en a
  pas).
· LES RÉSULTATS : la carte « En concours » de la page du cheval (rond de
  place or / argent-bronze, épreuve, puis cheval en turquoise · classement ·
  cavalier en blanc, récompense à droite). ⚠️ REMPLACE le dessin du 229.
  TOUS montrés. Règles conservées : partants masqués à 1 et pour une
  préparatoire, hypeRecompense, lien du cheval vers sa fiche (cheval_id
  seulement, stopPropagation), aucun lien sur le cavalier.
· LA COUVERTURE : plus de bouton « Couverture ? » sur les photos. Un petit
  lien « Choisir la couverture » sous le mur (gestionnaire du club seulement)
  ouvre la grille d'avant, PHOTOS SEULEMENT, avec ses boutons ; même fonction
  choisirCouverture, même écriture.
· Médias dédoublonnés (clé sans ? ni #) avant d'être répartis entre photos et
  vidéos.

VÉRIFICATION : node --check OK ; diff confiné à EcranEvenementPasse et au
marqueur. Build 20260921-309.

🟠 NOUVELLE DEMANDE, NOTÉE, NON CODÉE : « quand on modifie on peut pas
identifier » — en modification d'une publication, le lien « Identifier »
n'existe pas. À traiter à part.
🟠 SUITE PRÉVUE : 310 = la liste « écurie d'abord, puis tous les autres, avec
leur écurie entre parenthèses », partagée par « Identifier » et le futur @.
🟠 TOUJOURS EN SUSPENS : la page flottante ; la sélection de plusieurs photos.

────────────────────────────────────────────────────────────
86. 21/09 (310) — LE MUR SANS LE DOCUMENT « LE JOUR J », SANS TÊTE COUPÉE,
    MOINS DE CHEVAUCHEMENT
────────────────────────────────────────────────────────────

✅ LE 309 EST EN LIGNE (capture de 12 h 11 : le mur pêle-mêle s'affiche sur le
CSO Étrier de Paris). Ses trois remarques : « interdire le document des
horaires de passage dans le mur des souvenirs », « s'assurer qu'aucune tête ne
soit coupée », « un peu moins envahissante sur celle du dessous la première
photo en haut à gauche ». Proposition détaillée, « ok ».

✅ LIVRÉ AU 310, aucun SQL, aucune requête :
1. LE DOCUMENT « LE JOUR J » ÉCARTÉ. Le fichier n'a pas de nom reconnaissable
   (envoyerPhoto → « <compte>/<horodatage>.jpg »). Ce qui le signe : sa
   PUBLICATION, dont le texte est exactement le titre du générateur (« Le jour
   J » / « Race day » / « El día J » / « Il giorno » / « 当日 » / « Der Tag »).
   · dans la CARTE « Déjà passé » (carteEvPasse) : écarté de la mosaïque et du
     compte des médias ;
   · transmis à la fiche dans un champ NOUVEAU du paquet, `documents` (en plus
     de ev / medias / resultats, qui ne changent pas) → écarté du MUR ;
   · il reste dans les publications en bas de la fiche.
   ⚠️ Une vraie photo publiée avec ce seul texte serait écartée aussi (cas
   jugé improbable, dit à Blandine). Seules les publications DIRECTES du
   rendez-vous sont lues (c'est là que le générateur publie).
2. AUCUNE TÊTE COUPÉE DANS LE MUR : chaque photo garde SA forme (hauteur
   automatique, plus de proportion imposée f-p / f-l / f-c) → rien n'est
   rogné, par construction. Les colonnes s'équilibrent sur la VRAIE proportion
   lue au chargement (état ratiosMur) ; l'étirement du dernier cliché, qui
   recadrait, est supprimé.
   Sur les CARTES « Déjà passé », le recadrage reste (mosaïque) mais il est
   centré plus haut (object-position 50 % 22 %) : ça épargne les têtes au
   mieux, SANS garantie.
3. CHEVAUCHEMENT RÉDUIT : 12-24 px → 4-8 px ; l'élargissement d'un cliché sur
   cinq passe de 108 % à 104 %.

VÉRIFICATION : node --check OK, diff confiné à carteEvPasse,
EcranEvenementPasse et au marqueur. Build 20260921-310.

🟠 EN ATTENTE, NON CODÉ : identifier pendant la modification d'une
publication ; la liste « écurie d'abord puis les autres » (devient 311) et le
@ ; la page flottante ; la sélection de plusieurs photos.

────────────────────────────────────────────────────────────
87. 21/09 (311) — « IDENTIFIER » PENDANT LA MODIFICATION D'UNE PUBLICATION
────────────────────────────────────────────────────────────

✅ LE 310 EST VALIDÉ (« le mur est bien », captures de 12 h 20-12 h 21 : plus
de document, photos entières, chevauchement réduit).

RELEVÉ EN BASE AVANT DE CODER (policies de `identifications`) : id_creation
(INSERT), id_lecture (SELECT, true), id_modif (UPDATE, true), id_suppr
(DELETE, true) → le RETRAIT d'une identification est autorisé.
⚠️ DETTE DE SÉCURITÉ NOTÉE, NON TOUCHÉE : id_suppr et id_modif valent
« true » — n'importe qui peut supprimer ou modifier N'IMPORTE QUELLE
identification. À resserrer dans un chantier SQL à part (par exemple :
l'auteur, la personne identifiée ou une modératrice).

SA DEMANDE : « quand on modifie on peut pas identifier ». Proposition, « ok ».

✅ LIVRÉ AU 311, dans MurHype, aucun SQL :
· en modification, sous les médias, le même lien « Identifier » et la MÊME
  liste (chargerCandidatsTags) ; les personnes déjà identifiées sont
  PRÉ-COCHÉES (lues dans infosPosts), avec leurs pastilles et leur croix ;
· à l'enregistrement, APRÈS le texte (un échec ne perd jamais la
  modification) : les AJOUTS sont écrits (statut accepté) et SEULES les
  nouvelles cavalières sont prévenues (« t'a identifiée dans une
  publication ») ; les RETRAITS suppriment leur ligne ; un retrait refusé
  garde le nom affiché ; l'affichage sous la publication est mis à jour tout
  de suite ;
· « Annuler » remet tout à zéro.
Build 20260921-311. node --check OK, diff confiné à MurHype et au marqueur.

DÉCIDÉ, À FAIRE ENSUITE (312) : toucher une publication l'ouvre SEULE, en
plein écran par-dessus la page (croix pour refermer, retour à la même place
dans la liste) — « ok partout » : sur tous les murs en vignettes (page du
club, Actualités, fiches des rendez-vous, actualité d'un cheval).
Puis : la liste « écurie d'abord puis les autres » et le @.
🟠 EN SUSPENS : la page flottante ; la sélection de plusieurs photos.

────────────────────────────────────────────────────────────
88. 21/09 (312) — UNE PUBLICATION OUVERTE S'AFFICHE SEULE, EN PLEIN ÉCRAN
────────────────────────────────────────────────────────────

SA DEMANDE : « quand on ouvre un commentaire ça serait bien qu'il soit séparé
des autres, qu'il s'ouvre seul », puis « ok partout », « fais le plein écran
et on enchaîne sur 2 ». (Elle redemande aussi « rends possible
l'identification quand on modifie une publication » : C'EST LE 311, livré
juste avant — dit à Blandine, rien à refaire.)

✅ LIVRÉ AU 312, dans MurHype, aucun SQL :
· en mode vignettes, toucher une publication ne la déplie plus AU MILIEU de la
  liste : le MÊME rendu complet (rien n'est redessiné — photos, texte, Aimer,
  Répondre, réponses, Modifier, Identifier) est posé dans un CALQUE PLEIN
  ÉCRAN par-dessus la page ; la croix (44 px, en haut à droite) ou un toucher
  sur le fond le referme ; la page dessous n'a pas bougé. Le « Replier » placé
  sous la publication dépliée disparaît (remplacé par la croix).
· ⚠️ calque position: fixed, PAS un portail (leçons du 23e et du 05/09),
  data-noswipe + data-hscroll (leçon du 165) ; zIndex 8700 = au-dessus de la
  barre du bas, SOUS la visionneuse de photos (8800) pour qu'une photo touchée
  dans la publication s'ouvre par-dessus.
· Vaut pour TOUS les murs en vignettes : page du club, Actualités de
  l'écurie, fiches des rendez-vous (à venir et passés), actualité d'un cheval.
⚠️ À SURVEILLER AU TEST : si un écran enveloppe le mur dans un élément animé
par « transform », un calque fixe s'y cale au lieu de couvrir l'écran. La
visionneuse de photos du mur est posée exactement pareil et fonctionne : on
ne s'attend pas au problème, mais c'est le premier point à regarder.
Build 20260921-312. node --check OK, diff confiné à MurHype et au marqueur.

À FAIRE ENSUITE (choix « 2 ») : l'événement passé partageable, avec un lien
#s=<id> qui ouvre DIRECTEMENT le mur des souvenirs (bouton Partager + page
souvenir capable de se charger seule). Préalable : relever qui peut LIRE
club_agenda / commentaires / resultats (policies SELECT) — un lien ouvert par
une personne hors du club ou non connectée ne doit ni planter ni mentir.

────────────────────────────────────────────────────────────
89. 21/09 (313) — LE SOUVENIR SE PARTAGE, ET LE LIEN OUVRE DIRECTEMENT
    LE MUR DES SOUVENIRS
────────────────────────────────────────────────────────────

SA QUESTION : « l'événement passé, pour le partager on fait comment ? » →
aucun bouton sur la page souvenir, et le lien #r= ouvrait la fiche « à
venir ». Son choix : « 2 » (le lien ouvre DIRECTEMENT le mur), après le 312.

RELEVÉ EN BASE (policies SELECT, 21/09) :
· club_agenda « lecture agenda club » : public, true ;
· commentaires « commentaires lecture » : public, true (+ une policy anon sur
  les médias publics des chevaux, rendue redondante par la première) ;
· resultats « lecture resultats » : public, true (+ une policy anon limitée
  aux chevaux non privés, redondante elle aussi).
→ le lien peut se charger pour n'importe qui.
⚠️ DETTE DE SÉCURITÉ NOTÉE, NON TOUCHÉE : « commentaires lecture » = true pour
le rôle public → les publications PRIVÉES sont lisibles par l'API ; l'appli
ne fait que les MASQUER à l'écran (filtre côté téléphone). À traiter dans le
même chantier SQL que id_suppr / id_modif.

✅ LIVRÉ AU 313, aucun SQL :
1. ROUTE #s=<id> (routeur des liens) : vide le paquet de l'agenda et ouvre
   « evenement-passe ». #r= (rendez-vous à venir) inchangé.
2. EcranEvenementPasse SE CHARGE SEUL quand le paquet est vide : le
   rendez-vous (chargerAgendaEvenement), les publications de son mur + celles
   rattachées (hypePostsAgenda) → médias (privées écartées sauf les siennes),
   le document « Le jour J » (règle du 310), les résultats des cavalières du
   club PAR LA DATE (club reconnu par clefClubG + hypeMemeClub sur ecurie /
   ecurie2) et le nom des chevaux. Une lecture qui échoue laisse sa section
   vide. Pendant le chargement : « Ouverture du souvenir… ». Arrivée depuis
   l'agenda : RIEN ne change.
   ⚠️ CORRECTIF DE STRUCTURE au passage, INDISPENSABLE : les trois états de la
   couverture (stCouv, stCouvB, stCouvE) étaient déclarés APRÈS le retour
   anticipé « if (!ev) ». Tant que la page recevait tout d'un coup, c'était
   sans effet ; une page qui se charge en deux temps aurait changé le nombre de
   hooks entre deux rendus (plantage React). Ils sont remontés en tête.
3. BOUTON « PARTAGER » rond en haut à droite du bandeau : titre, date, lieu,
   « N photos · N résultats », lien #s=, et UNE VRAIE PHOTO jointe (la
   couverture choisie si c'est une photo du mur, sinon la première — jamais
   le document). Repli : texte seul ; sans partage : copie + message.
Build 20260921-313. node --check OK, diff confiné au routeur (une ligne),
à EcranEvenementPasse et au marqueur.

À TESTER : partager un souvenir, ouvrir le lien reçu (idéalement depuis un
autre téléphone ou compte) → le mur s'ouvre ; retour depuis l'agenda
inchangé ; partage avec photo jointe.
⚠️ Le 312 (plein écran) n'était pas encore testé à cette livraison.

────────────────────────────────────────────────────────────
90. 21/09 (314) — LE POP-UP « QUOI DE NEUF » RETIRÉ ET MIS À JOUR (1.9) ;
    LES NOTIFICATIONS LUES LE RESTENT ENFIN
────────────────────────────────────────────────────────────

SES MOTS (capture de 12 h 51, pop-up « Reprise 1.8 ») : « ça ainsi que les
notifications visuelles qui ne disparaissent pas même après avoir été
consultées, ça fait quatre fois que c'est supposé avoir été retiré », puis
« au moins mets-le à jour déjà ».

✅ LIVRÉ AU 314, aucun SQL :
1. LE POP-UP NE S'OUVRE PLUS TOUT SEUL (OverlayQuoiDeNeuf : « return; » en
   tête de l'effet, commenté). POURQUOI IL REVENAIT alors que le code ne le
   montre qu'une fois par version : la version « déjà vue » vit dans la
   mémoire du téléphone (localStorage « hype_maj_vue »), propre à CHAQUE
   ADRESSE et à chaque façon d'ouvrir l'appli. Le passage à 2hype.fr (20/09),
   ou une ouverture par Safari au lieu de l'écran d'accueil, repartaient d'une
   mémoire vide. (Les deux purges au changement de compte, elles, préservent
   bien cette clé — vérifié.) Les nouveautés restent à un toucher, par la
   ligne « What's up » de l'accueil.
2. REPRISE 1.9 (HYPE_VERSION_APP 1.8 → 1.9), datée du 21 septembre, cinq
   mouvements qui existent VRAIMENT : les souvenirs des rendez-vous ;
   partager un souvenir ; identifier ses amies (rendez-vous, réponses,
   modification) ; les publications en plein écran ; le document du jour J.
   6 langues, chaque ligne mène à la page du club. La 1.8 reste en historique.
   ⚠️ Au passage : la 1.8 annonçait déjà « les mentions @ » — elles existent
   DANS LES STORIES (hype-stories.js), pas dans les publications du fil.
3. NOTIFICATIONS « LUES » QUI REVENAIENT — CAUSE PROUVÉE DANS LE CODE : une
   requête Supabase n'est ENVOYÉE qu'au moment où l'on attend son résultat
   (await / .then). « Tout marquer lu » (toutLu), le toucher d'une
   notification (tapPerso) et le ménage des notifications de plus de 60 jours
   lançaient la requête SANS l'un ni l'autre : elles n'ont JAMAIS atteint la
   base. L'écran les marquait lues pour la session ; au chargement suivant,
   tout revenait. Les trois partent désormais pour de bon.
   ⚠️ À VÉRIFIER EN BASE : qu'une policy UPDATE autorise la destinataire à
   passer `lu` à true (sinon la requête part mais ne modifie rien). Requête
   donnée à Blandine.
   ⚠️ Les notifications de COMMUNAUTÉ (partagées par toute l'écurie) ne sont
   pas marquées en base : leur « vu » est une date gardée sur le téléphone
   (hype_notifs_comm_vu) — donc elles réapparaissent une fois sur une nouvelle
   adresse. Normal, non modifié.
Build 20260921-314. node --check OK, diff confiné (notifications,
HYPE_MAJ / HYPE_VERSION_APP, OverlayQuoiDeNeuf, marqueur).

────────────────────────────────────────────────────────────
91. 21/09 (315) — LES QUÊTES NE MÈNENT PLUS À L'ANCIENNE ÉCURIE PERSO ;
    CE QUE LE CHANGEMENT D'ADRESSE A « REMIS À ZÉRO »
────────────────────────────────────────────────────────────

RELEVÉ EN BASE (policies de `notifications`, 21/09) : INSERT public ; SELECT =
destinataire = moi, OU (destinataire vide ET contexte = MON profiles.ecurie) ;
UPDATE et DELETE = destinataire = moi. → le correctif du 314 (« lu »
réellement envoyé) sera accepté par la base.
⚠️ DETTE NOTÉE : les notifications de COMMUNAUTÉ ne sont lisibles que pour la
PREMIÈRE écurie (profiles.ecurie) — une cavalière dont la SEP est en ecurie2
ne voit pas celles de la SEP. À corriger en SQL, plus tard, si elle le veut.
Elle : « les notifications je les vois à chaque connexion » → c'est EXACTEMENT
le défaut corrigé au 314 (la mise à jour « lu » n'était jamais envoyée) ; à
revérifier une fois le 314 poussé.

SA REMARQUE (captures de 12 h 54) : la carte « La suite pour toi » est revenue
sur l'accueil (« Mets une photo sur un de tes chevaux ») et l'a envoyée sur
l'ANCIENNE écurie perso (« Ton écurie perso — Feinn — 24 chevaux »), censée ne
plus être en ligne.
CAUSE : trois quêtes de découverte avaient pour cible l'écran « ecurie »
(EcranEcurie, retiré de la navigation au build 90). La carte « La suite pour
toi » appelle setEcran(q.cible) sans passer par la barre du bas (qui, elle,
remplace « ecurie » par « guilde »).
✅ LIVRÉ AU 315, aucun SQL : « Ajoute ton premier cheval » et « Mets une
photo sur un de tes chevaux » → page Cavalier (moncavalier) ; « Philosophie
de ton écurie » → page du club (guilde). L'ancienne page n'est plus
atteignable que par la tuile ADMIN « Ancienne écurie perso (aperçu) » de Mon
compte, gardée exprès (elle a dit « ok » sans demander de la retirer).
Build 20260921-315. node --check OK.

SA QUESTION : « combien d'autres choses ont roll back ? » — RÉPONSE DONNÉE :
AUCUN CODE n'est revenu en arrière. Ce qui « revient » vient de la MÉMOIRE DU
TÉLÉPHONE (localStorage), propre à CHAQUE ADRESSE : sur 2hype.fr elle est
repartie vide. Ce qui y vit, relevé dans le code : l'état local de l'appli
(augalop_etat_v1 : profil local, liste locale des chevaux — d'où la quête
photo revenue), le pop-up vu (hype_maj_vue), la bannière d'installation
(hype_install_vu), les TEINTES choisies (hype_teinte, hype_teinte_citation,
hype_teinte_citation_titre, hype_teinte_ecurie), l'affichage en vignettes
(hype_vignettes), les « déjà vu » (galops, résultats, ajouts d'écurie,
notifications de communauté), les brouillons en cours, les copies locales
des photos d'origine (avatar, écurie, bannière du club, chevaux) servant au
recadrage, et la session de connexion. RIEN de ce qui est EN BASE (chevaux,
photos, publications, résultats, rendez-vous) n'est touché.
⚠️ CONSEIL DONNÉ : choisir UNE adresse (2hype.fr) et remettre l'icône de
l'écran d'accueil depuis elle ; sinon deux mémoires coexistent.
PISTE (NON DÉCIDÉE) : ranger les préférences visibles (teintes) en base pour
qu'elles suivent la cavalière partout.

────────────────────────────────────────────────────────────
92. 21/09 (316) — CARTES DE RÉSULTATS ET DE RENDEZ-VOUS : MÊME HAUTEUR,
    FIXE, QUEL QUE SOIT LE CONTENU
────────────────────────────────────────────────────────────

SA CAPTURE (12 h 58, page du club) : les cartes « Derniers résultats » sont
nettement plus hautes que les rendez-vous, avec du vide en bas. Elle :
« c'est revenu en arrière ». VÉRIFIÉ : le 304 est intact (largeur 46 %, coins
20, rangée étirée). Ce qui a changé, c'est le CONTENU : la règle du 304
(« toutes à la hauteur de la plus haute ») dépendait de la carte la plus
haute, et une carte avec plusieurs autres classées étirait toute la rangée.
MON ERREUR : une règle qui dépend du contenu n'était pas robuste — signalée
comme risque au 304, mais j'aurais dû la rendre fixe dès le départ.
Elle : « ok pour 316 », « hauteur, largeur et alignement ».

✅ LIVRÉ AU 316, aucun SQL :
· HAUTEUR FIXE 240 px pour les cartes de résultats des TROIS rails (page du
  club, page cavalière, fiche cheval) ET pour les cartes de rendez-vous
  (.agc-c2 dans AGENDA_CSS — donc aussi sur la page Agenda) : les deux rangées
  ont exactement la même hauteur, quoi qu'il arrive.
· Largeur (46 %) et alignement (bords gauches, écart de 10 px) : déjà
  identiques depuis le 304, vérifiés sur sa capture.
· Pour que tout tienne dans 240 px : portrait 66 → 56 px ; la phrase « 1er X
  sur Y » limitée à 2 lignes ; épreuve et partants réunis sur UNE ligne
  coupée proprement ; la liste des autres classées (jusqu'à 3 lignes)
  remplacée par UNE ligne « + N autres classées ».
⚠️ CORRECTION D'UNE AFFIRMATION À ELLE : j'avais dit que les noms restaient
visibles « en touchant la carte ». Vrai sur la FICHE CHEVAL seulement (le
toucher ouvre Performances). Sur la PAGE DU CLUB, la carte ne s'ouvre pas :
les noms sont dans « Voir tout ». La page cavalière n'avait pas de liste.
Build 20260921-316. node --check OK.

────────────────────────────────────────────────────────────
93. 21/09 (317) — PAGE DU CLUB : LES PLUS RÉCENTES PUBLICATIONS EN PREMIER
    (correctif d'une erreur du 300)
────────────────────────────────────────────────────────────

SES MOTS (captures de 13 h 28) : « la fin de page n'est plus du tout comme on
l'avait faite », puis « on avait interverti l'ordre, les derniers
apparaissaient en premier » et « on avait deux publications, et c'est celle
d'Evan qui était masquée ». Sur sa capture : #BestTeam (Evan, 66 j) EN
PREMIER, puis la publication de 8 j, et la plus récente cachée sous « Voir la
suite (1) ».

CAUSE, PROUVÉE DANS LE CODE — MON ERREUR DU 300 : l'ordre « conversation »
(du plus ancien au plus récent) avait été lié à la prop `composerEnBas`, avec
un commentaire affirmant que seule la fiche d'un rendez-vous la passait. FAUX :
trois murs la passent — la fiche d'un rendez-vous à venir, la page d'un
rendez-vous passé ET LA PAGE DU CLUB (15/09, build 176 : deux publications
puis le champ dessous). Sur la page du club, avec la limite de 2, on voyait
donc les deux PLUS ANCIENNES, et la plus récente partait sous « Voir la
suite ». Leçon : avant d'accrocher un comportement à une prop, relever TOUS
ses appels (grep), jamais « de mémoire ».

✅ LIVRÉ AU 317, dans MurHype, aucun SQL : `ordreConversation` = composerEnBas
ET cible « agenda:<id> ». L'ordre conversation ne vaut plus que pour les murs
des RENDEZ-VOUS (sa demande du 300) ; partout ailleurs, page du club comprise,
le plus récent en premier, comme avant le 300. Le champ « Partage un
moment… » reste sous les publications sur la page du club.
Build 20260921-317. node --check OK.
À TESTER : page du club → la publication la plus récente en premier, les deux
plus récentes visibles, celle d'Evan (66 j) sous « Voir la suite ».

────────────────────────────────────────────────────────────
94. 21/09 (318) — LA LISTE D'IDENTIFICATION : L'ÉCURIE D'ABORD, PUIS TOUT
    HYPE, AVEC L'ÉCURIE ENTRE PARENTHÈSES
────────────────────────────────────────────────────────────

SES DÉCISIONS (déjà notées au §84) : « en prio ceux de l'écurie et ensuite
tous les autres », « on mentionne leur écurie entre parenthèses ». « Ok
continue ».

✅ LIVRÉ AU 318, dans MurHype, aucun SQL :
· UNE SEULE liste (listeTagsRendu) pour les TROIS endroits où l'on identifie :
  nouvelle publication, réponse, modification — les trois copies qui
  existaient sont remplacées par cet unique rendu.
· un CHAMP DE RECHERCHE en tête (collé en haut de la liste, 16 px : pas de
  zoom iOS) ; il filtre la section « Mon écurie » (cavalières ET chevaux de
  l'écurie, comme avant), sans tenir compte des accents ;
· dès 2 lettres, une section « Autres cavalières de Hype » : recherche par
  pseudo dans tout Hype (rechercherCavaliersHype, déjà existante : 15 au plus,
  soi-même exclue, celles déjà dans l'écurie écartées), chacune avec sa
  PREMIÈRE écurie entre parenthèses — « Margot (Écurie Feinn) ». Pas de
  chevaux d'autres écuries. Recherche lancée 300 ms après la dernière frappe.
· hauteur de la liste 190 → 260 px (le champ prend de la place).
· une cavalière extérieure identifiée s'écrit EXACTEMENT comme les autres
  (identifications + notification).
Build 20260921-318. node --check OK, diff confiné à MurHype et au marqueur.

PROCHAINE ÉTAPE (le « @ ») : taper @ dans le texte ouvrira CETTE MÊME liste,
filtrée par ce qui suit le @.

────────────────────────────────────────────────────────────
95. 21/09 (319) — LE « @ » DANS LE TEXTE, ÉTAPE 1 : LA NOUVELLE PUBLICATION
────────────────────────────────────────────────────────────

« Ok continue » après le 318.

✅ LIVRÉ AU 319, dans MurHype, aucun SQL :
· dans « Partage un moment… », taper @ (en début de mot) ouvre SOUS le champ
  la MÊME liste que « Identifier » (listeTagsRendu, nouvelle option
  « sansChamp » : c'est ce qui suit le @ qui sert de recherche) — l'écurie
  d'abord, puis tout Hype dès 2 lettres, l'écurie entre parenthèses ;
· toucher un nom : « @Nom » remplace ce qui avait été tapé, suivi d'un espace,
  ET la personne rejoint les identifications de la publication (même
  écriture, même notification qu'avec « Identifier ») ; la liste se ferme ;
· un espace après le @ ferme la liste ; disponible là où « Identifier »
  l'est (fil de l'écurie, murs des rendez-vous) ; remise à zéro après la
  publication.
⚠️ Effacer « @Nom » du texte avant de publier NE retire PAS l'identification
(elle reste cochée dans « Identifier », où on peut la décocher).
Build 20260921-319. node --check OK, diff confiné à MurHype et au marqueur.

ÉTAPES SUIVANTES DU @ : (2) le @ dans les réponses, et en modification ;
(3) les « @Nom » affichés en couleur dans les textes, touchables.

────────────────────────────────────────────────────────────
96. 21/09 (320) — LE « @ », ÉTAPE 2 : DANS LES RÉPONSES ET EN MODIFICATION
────────────────────────────────────────────────────────────

« Ok continue ».

✅ LIVRÉ AU 320, dans MurHype, aucun SQL :
· détection du @ mise en commun (trouverMention), insertion commune
  (insererMention), ajout sans doublon (ajouterSansDoublon) ;
· DANS UNE RÉPONSE : taper @ ouvre la liste sous le champ ; le nom choisi
  s'insère et rejoint les identifications de la RÉPONSE (celles du 308 :
  écrites après l'envoi, notification « t'a identifiée dans une réponse ») ;
· EN MODIFICATION D'UNE PUBLICATION : même chose ; le nom rejoint les
  identifications de la publication (règles du 311 : seules les NOUVELLES
  personnes sont prévenues à l'enregistrement) ;
· remises à zéro après l'envoi d'une réponse, à l'enregistrement et à
  l'annulation d'une modification.
Disponible partout où les réponses et la modification existent (comme
« Identifier » dans ces deux cas).
Build 20260921-320. node --check OK, diff confiné à MurHype et au marqueur.

⚠️ MÉTHODE : une commande bash a dépassé le délai (sed -n "${n}p" avec n VIDE
imprime le fichier de 7,8 Mo entier dans rev). Fichier vérifié INTACT (md5
identique à la livraison). Relire ce fichier en Python, jamais avec un numéro
de ligne qui pourrait être vide.

ÉTAPE 3 DU @, restante : les « @Nom » affichés en couleur dans les textes, et
touchables (ouvrent le profil / la fiche).

────────────────────────────────────────────────────────────
97. 21/09 (321) — LE « @ », ÉTAPE 3 : LES NOMS EN COULEUR, TOUCHABLES
────────────────────────────────────────────────────────────

« Ok continue ».

✅ LIVRÉ AU 321, dans MurHype, aucun SQL :
· dans le texte d'une PUBLICATION (rendu complet, donc aussi en plein écran)
  et d'une RÉPONSE, chaque « @Nom » qui correspond à une personne ou à un
  cheval RÉELLEMENT identifié sur ce message s'affiche en couleur (teinte du
  mur), en gras ; un @ tapé au hasard reste du texte ordinaire ;
· toucher : une cavalière → son profil public (même chemin que la page du
  club : window.__cavalierPublic + __cavalierOuvert « __public », écran
  « cavalier ») ; un cheval → sa fiche (window.__chevalOuvert) ;
  stopPropagation (le toucher n'ouvre pas la publication derrière) ;
· noms les plus longs cherchés d'abord ; texte toujours rendu en texte
  (jamais d'innerHTML) ; les annonces Hype ne sont pas concernées.
· Les aperçus en VIGNETTE (titre + une ligne) restent en texte simple : on
  touche la vignette pour ouvrir la publication, où les noms sont en couleur.
Build 20260921-321. node --check OK, diff confiné à MurHype et au marqueur.

LE CHANTIER « @ » EST COMPLET : publication (319), réponses et modification
(320), noms en couleur touchables (321), liste partagée écurie → tout Hype
(318). Rien de testé sur iPhone à cette date, du 312 au 321.

────────────────────────────────────────────────────────────
98. 21/09 (322) — LA FICHE D'UN RENDEZ-VOUS NE « FLOTTE » PLUS
────────────────────────────────────────────────────────────

Proposé le 20/09 (§78-2, vidéo de 23 h 38), jamais codé faute de « ok »
explicite ; fait sur son « ok continue » du 21/09.

✅ LIVRÉ AU 322, dans FicheEvenementClub, aucun SQL :
· `overflowX: "hidden"` sur le conteneur plein écran de la fiche : il avait
  `overflowY: auto` sans `overflowX`, donc tout élément plus large que
  l'écran le rendait défilable sur le côté (la fiche glissait sous le doigt).
  Le défilement horizontal est fermé pour de bon, quel que soit l'élément.
· la phrase fixe des SORTIES (« Plus qu'un rendez-vous, des moments forts »,
  en capitales espacées, en `nowrap` depuis le 299) peut revenir à la ligne,
  centrée — c'était la cause de départ. Concours et stages avaient déjà une
  phrase qui revient à la ligne depuis le 303.
Build 20260921-322. node --check OK.

RESTE EN SUSPENS :
· sélection de plusieurs photos qui se referme au premier choix — il manque
  TOUJOURS l'information : bouton 📷 Photos d'une nouvelle publication, ou
  appareil photo d'une réponse (mono-fichier par construction) ?
· dettes de sécurité SQL (§87, §89) : identifications (DELETE / UPDATE =
  true), commentaires privés lisibles par l'API ; notifications de
  communauté limitées à la première écurie (§91). Chantier SQL, sa décision.
· tests iPhone des builds 312 à 322.

────────────────────────────────────────────────────────────
99. 21/09 (323) — LA LISTE D'IDENTIFICATION PAR ORDRE ALPHABÉTIQUE
────────────────────────────────────────────────────────────

✅ CAPTURES DE 13 H 45-13 H 46 : 317 (ordre du club), 307/310 (carte
« Déjà passé »), 313 (bouton de partage) et 312 (plein écran) VUS À L'ÉCRAN.
Le « @ » : « je viens de le faire » — il fonctionne une fois le bon index
poussé (elle testait sur une version antérieure au 319).

SA DEMANDE : « ça serait bien qu'on voie les noms des cavaliers par ordre
alphabétique dans l'écurie », « et hors écurie aussi bien sûr ».

✅ LIVRÉ AU 323, dans listeTagsRendu (MurHype), aucun SQL :
· section « Mon écurie » : les cavalières d'abord, puis les chevaux, chacun
  de A à Z ;
· section « Autres cavalières de Hype » : de A à Z ;
· tri à la française (localeCompare « fr », sans accents ni majuscules),
  avec un repli simple si le téléphone ne le gère pas.
Vaut pour les quatre usages de la liste : « Identifier » (publication,
réponse, modification) et le @.
Build 20260921-323. node --check OK.

────────────────────────────────────────────────────────────
100. 21/09 (324) — PAGE ACTUALITÉS : UN BANDEAU AVEC LA DERNIÈRE PHOTO PUBLIÉE
────────────────────────────────────────────────────────────

SA DEMANDE (capture de 13 h 51, page « Le fil de l'écurie — Actualités ») :
« il n'y a pas de photo là-haut, on peut en ajouter une ? À la limite un
encart dynamique, que ce soit la dernière photo publiée à chaque fois ».
Proposition, « ok » ; « seulement là pour l'instant » (pas la page du club ni
l'Agenda).

✅ LIVRÉ AU 324, dans EcranActualitesEcurie SEULEMENT, aucun SQL :
· UNE lecture à l'ouverture : les 12 dernières publications du MÊME fil
  (même cible que le mur dessous : cible reçue de la page du club, sinon
  « ecurie:<nom en minuscules> », sinon « ecurie:<id> » comme MurHype) qui
  portent une photo ; on garde la plus récente ni PRIVÉE ni VIDÉO ;
· bandeau photo derrière « Le fil de l'écurie / Actualités / <écurie> » :
  photo NON filtrée, voile sombre dégradé pour la lisibilité, cadrage centré
  plus haut (50 % 30 %) ; textes et flèche de retour au-dessus ;
· toucher le bandeau : la photo en grand (hypeCalquePhoto) ; la flèche de
  retour arrête le toucher (stopPropagation) ;
· aucune photo dans le fil : la page reste exactement comme avant.
Build 20260921-324. node --check OK.

────────────────────────────────────────────────────────────
101. 21/09 — SQL PASSÉ PAR ELLE : LA PORTE DES IDENTIFICATIONS EST FERMÉE
────────────────────────────────────────────────────────────

Relevés avant d'écrire : hype_est_moderatrice() existe et n'attend AUCUN
argument (pg_get_function_identity_arguments vide) ; toutes les écritures de
l'appli dans `identifications` se font EN SON PROPRE NOM (auteur_id =
l'utilisatrice — relu dans le code : publications, réponses, modification,
rendez-vous, albums, photos, propositions).
SQL passé à 14 h 07 (« Success. No rows returned »), vérifié à 14 h 10 :
· id_creation (INSERT) : with check auteur_id = moi ;
· id_modif (UPDATE) et id_suppr (DELETE) : l'autrice, OU la personne
  identifiée (cible_id = moi), OU une modératrice (hype_est_moderatrice()),
  OU la propriétaire du CHEVAL identifié (type 'cheval' + chevaux.user_id) ;
· id_lecture (SELECT) : inchangée (true).
Relevé au passage : `cible_id` est de type texte.
⚠️ Conséquence dite : une gestionnaire de club NON modératrice ne peut plus
détacher une publication rattachée à un rendez-vous par quelqu'un d'autre.
⚠️ DÉFAUT EXISTANT NOTÉ, NON TOUCHÉ : albumsIdentifiesPour interroge
`.not("album_id", "is", null)` alors que la colonne album_id N'EXISTE PAS
(relevé du 16/09) → cette liste revient toujours vide, en silence.
RESTE (dettes SQL, sa décision) : publications privées lisibles par l'API
(commentaires lecture = true) ; notifications de communauté limitées à la
première écurie.

────────────────────────────────────────────────────────────
102. 21/09 (325) — PLUSIEURS PHOTOS D'UN COUP EN MODIFIANT UNE PUBLICATION
────────────────────────────────────────────────────────────

SA VIDÉO (11 h 37) : en MODIFIANT une publication, le carré « + » refermait
la photothèque dès la première photo — son champ n'acceptait qu'UN fichier
(files[0], sans `multiple`, accept mixte image+vidéo). Ce n'était pas le
bouton « 📷 Photos » de la création, qui accepte déjà plusieurs photos.

✅ LIVRÉ AU 325, dans MurHype, aucun SQL :
· le « + » ouvre un champ PHOTOS SEULES avec `multiple` (leçon iOS du 05/09 :
  un champ mixte + multiple laisse la validation inerte) ; nouvelle fonction
  ajouterPhotosEdite : hypePhotoDirecte puis envoyerPhoto, en PARALLÈLE,
  ordre conservé, chaque photo indépendante ; plafond 4 médias, ce qui
  dépasse est DIT, les échecs d'envoi aussi ;
· un petit bouton 🎬 à côté garde l'ancien champ, désormais « video/* »,
  une vidéo à la fois, par l'ancien chemin INCHANGÉ.
⚠️ OBSERVATION, NON TOUCHÉE : cet ancien chemin (ajouterMediaEdite) envoie une
vidéo par envoyerPhoto, alors que le code dit ailleurs qu'une vidéo ne doit
jamais l'atteindre (elles passent par Mux). Ajouter une VIDÉO en modification
est donc à tester ; si ça échoue, c'est un chantier à part.
Build 20260921-325. node --check OK.

────────────────────────────────────────────────────────────
103. 21/09 — DEUXIÈME PORTE FERMÉE : LES PUBLICATIONS PRIVÉES
────────────────────────────────────────────────────────────

Relevé : commentaires.prive = boolean, commentaires.user_id = uuid.
SQL passé à 14 h 19, vérifié : « commentaires lecture » (public) =
coalesce(prive, false) = false OR user_id = auth.uid() OR
hype_est_moderatrice(). La policy anon des médias publics des chevaux reste.
→ une publication privée n'est plus lisible que par son autrice ou une
modératrice. L'appli n'en montrait déjà qu'à l'autrice : rien ne change à
l'écran.

────────────────────────────────────────────────────────────
104. 21/09 (326) — NOTIFICATIONS DE COMMUNAUTÉ : L'APPLI LAISSE LA BASE TRIER
────────────────────────────────────────────────────────────

DEUX DÉFAUTS TROUVÉS EN RELISANT (dits à Blandine) :
1. seule la PREMIÈRE écurie (profiles.ecurie) était regardée, par la policy
   ET par l'appli (chargerN : .eq("contexte", monEcurie)) ;
2. PLUS GRAVE : « X a publié dans ta communauté » (type post_ecurie / post_club)
   est rangée avec contexte = CLÉ DU FIL en minuscules + « |post:<id> »
   (« ecurie feinn|post:123 », depuis le build 41 du 12/09). L'égalité exacte
   avec le nom du profil (« Ecurie Feinn ») n'a JAMAIS été vraie : ces
   notifications ne sont arrivées chez PERSONNE. Les autres (rejoint, cheval,
   souvenir, agenda, diffusion) portent le nom tel quel et marchaient.

✅ LIVRÉ AU 326 : chargerN ne filtre plus par nom — il demande les
notifications de communauté (destinataire vide, pas les siennes, contexte non
vide, 60 jours) et la POLICY décide. Avec l'ancienne policy : résultat
IDENTIQUE à avant. Build 20260921-326. node --check OK.

À PASSER EN SQL (donné à Blandine) : « lecture notifications » compare
split_part(contexte, '|', 1), en minuscules, sans accents, sans espaces aux
bords, aux DEUX écuries du profil (ecurie, ecurie2).
⚠️ Conséquence dite : les notifications de publication des 60 derniers jours,
présentes en base mais jamais lisibles, peuvent apparaître d'un coup.

────────────────────────────────────────────────────────────
105. 21/09 — TROISIÈME PORTE PASSÉE EN SQL ; (327) LES PALMARÈS PAR SEMAINE
────────────────────────────────────────────────────────────

SQL « lecture notifications » passé à 14 h 28 (« Success ») : destinataire =
moi, OU (destinataire vide ET contexte non vide ET split_part(contexte,'|',1),
en minuscules, sans accents (translate), sans espaces aux bords, égal à MON
ecurie OU MON ecurie2).
Relevé (14 h 3x) des notifications de COMMUNAUTÉ sur 60 jours : rejoint 34,
cheval 32, agenda 12, haut_fait 11, post_ecurie 2, post_club 1. Elle : « rien
des posts de Mégane, Maylis, etc. » → EXPLICATION (code) : hypeNotifierCommentaire
ne prévient la communauté que pour les murs « ecurie: » et « club: » ; une
publication sur le mur d'un RENDEZ-VOUS (« agenda:<id> ») ne crée AUCUNE
notification. Et on ne reçoit jamais les siennes.

SA DEMANDE (palmarès) : « rassembler les chevaux ayant récupéré leur palmarès en
un seul post », « par semaine si c'est le même geste ».
✅ LIVRÉ AU 327 (cartesDImport + les deux rendus du fil Communauté), aucun
SQL : UNE carte par personne et par semaine (lundi → dimanche) ; un cheval
importé plusieurs fois n'y figure qu'une fois, chiffres additionnés ; titre
« X a rendu leur palmarès à N chevaux » (phrase d'avant quand il n'y en a
qu'un) ; carte ouverte : un cheval par ligne avec ses chiffres, toucher →
SON palmarès. Coche de relecture respectée.
⚠️ Nouvel identifiant de carte (« import:<personne>:<lundi> ») : les j'aime /
réponses des anciennes cartes par cheval ne suivent pas (tous à 0).
Build 20260921-327. node --check OK (les deux blocs de script touchés).

NOUVELLE DEMANDE, NON CODÉE : des notifications de communauté pour la création
d'un cheval (EXISTE déjà : type « cheval »), l'ajout de photos, les infos d'un
concours… → proposition à faire.

────────────────────────────────────────────────────────────
106. 21/09 (328) — TROIS NOTIFICATIONS DE COMMUNAUTÉ EN PLUS
────────────────────────────────────────────────────────────

SA DEMANDE : « ça serait bien d'avoir des notices en cas de création de
cheval, ajout de photos, info sur un concours… », « oui, ajoute tout, que ça
vive un peu ». Elle : « j'ai vu aucune notification pour une création de
cheval » — le type « cheval » EXISTE (32 en 60 jours) et a son libellé ; deux
raisons possibles, non tranchées : on ne reçoit jamais les siennes (elle crée
beaucoup de chevaux elle-même), et avant le SQL du 21/09 la comparaison du
nom d'écurie était EXACTE (un « Écurie » accentué d'un côté suffisait à tout
cacher). À revérifier maintenant que la comparaison ignore accents et
majuscules.

✅ LIVRÉ AU 328, aucun SQL :
1. « post_agenda » : une publication sur le MUR D'UN RENDEZ-VOUS prévient la
   communauté du club du rendez-vous (club_clef lue en base), extrait = titre
   du rendez-vous, cible « agenda:<id> » (le toucher ouvre sa fiche), suffixe
   « |post:<id> » pour le ménage à la suppression. Le document « Le jour J »,
   publié sur ce mur, en profite aussi. (hypeNotifierCommentaire)
2. « agenda_maj » : modifier une information utile d'un rendez-vous (date,
   heures, lieu, titre, description, type — PAS le seul choix de couverture)
   prévient la communauté du club ; au plus UNE fois par rendez-vous et par
   demi-heure depuis ce téléphone. (modifierAgendaClub)
3. « photos_cheval » : ajouter des photos à l'album d'un CHEVAL prévient la
   communauté de l'écurie DU CHEVAL (chevaux.club) — une notification par
   envoi, avec le nombre de photos RÉELLEMENT rattachées (contexte
   « <écurie>|n:<N> », la policy ne lit que ce qui précède le « | ») ; rien
   pour un cheval sans écurie. (AlbumsCheval.importerFichiers)
Libellés ajoutés dans ligneComm (« a publié sur un rendez-vous », « a mis à
jour un rendez-vous », « a ajouté N photos à un cheval »), extrait affiché
comme les autres. Navigation au toucher : branches existantes (agenda:,
cheval:).
Build 20260921-328. node --check OK sur les deux blocs de script touchés.

────────────────────────────────────────────────────────────
107. 21/09 (329) — UN ONGLET « ÉCURIE » DANS LE FIL ; DES HAUTS FAITS LISIBLES
────────────────────────────────────────────────────────────

SA CAPTURE (14 h 37, Communauté → Le fil → Amis) : seulement des « Haut fait
débloqué — quete:photo-cheval:1 » (nom technique affiché), et « ça serait bien
de rajouter un onglet écurie, il n'y en a pas ». « Ok continue ».

✅ LIVRÉ AU 329, aucun SQL :
· troisième onglet « Écurie » (Tous / Amis / Écurie), 6 langues : même
  contenu que « Tous » (résultats publiés + cartes de palmarès) mais limité
  aux cavalières de SES écuries — ecurie ET ecurie2, relues en base —, elle
  comprise (filEcurie → fil({ idsFiltre }), membres par hypeCavaliersDuClub).
· hypeLibelleHautFait : « quete:<id>:n » s'affiche avec le TITRE de la quête
  (HYPE_QUETES_DECOUVERTE, langue de l'appli) — vignette et carte ouverte ;
  tout autre nom reste tel quel (rien d'inventé).
⚠️ Constat, non modifié : l'onglet « Tous » ne montre pas les hauts faits
(seul « Amis » les lit, via filAmis) ; l'onglet « Écurie » suit « Tous ».
Build 20260921-329. node --check OK (deux blocs touchés).

────────────────────────────────────────────────────────────
108. 21/09 (330) — LES HAUTS FAITS DANS L'ONGLET « ÉCURIE »
────────────────────────────────────────────────────────────

Proposé au 329 (« si tu veux aussi les hauts faits dans Écurie »), « ok
continue ». filEcurie ajoute aux résultats et palmarès les hauts faits
(table hauts_faits, 40 au plus) des cavalières de ses écuries, avec la même
forme d'élément que filAmis (même rendu, titre lisible du 329), puis trie le
tout par date (60 au plus). Aucun SQL. Build 20260921-330. node --check OK.

────────────────────────────────────────────────────────────
109. 21/09 (331) — LES ALBUMS OÙ L'ON EST IDENTIFIÉ S'AFFICHENT ENFIN
────────────────────────────────────────────────────────────

Défaut noté au §101 (« ok continue »). CAUSE : albumsIdentifiesPour filtrait
sur `album_id`, colonne ABSENTE de `identifications` → requête rejetée en
entier, liste toujours vide. Deux effets : les propositions d'identification
sur un ALBUM (en attente) n'apparaissaient jamais, et les albums ACCEPTÉS ne
rejoignaient jamais la liste des albums du cheval / de la cavalière.
✅ LIVRÉ AU 331, aucun SQL :
· filtre sur photo_url LIKE « album:% » (ce qu'écrit identifierAlbum),
  identifiant de l'album lu dans photo_url, recopié dans ident.album_id pour
  les appelants ;
· au passage, les propositions de PHOTOS écartent les lignes « album:… » :
  jusqu'ici, une proposition d'album y serait apparue comme une « photo »
  d'adresse illisible (même cause : le filtre `!x.album_id` était toujours
  vrai).
⚠️ Conséquence à voir au test : des propositions d'album en attente depuis
longtemps peuvent apparaître d'un coup.
Build 20260921-331. node --check OK (deux blocs touchés).

────────────────────────────────────────────────────────────
110. 21/09 (332) — LE BOUTON VIDÉO QUITTE LE MODE MODIFICATION
────────────────────────────────────────────────────────────

CONSTAT (code, pas de test nécessaire) : le bouton 🎬 du mode modification
(325) passait par ajouterMediaEdite → envoyerPhoto, qui REFUSE les vidéos
(garde-fou du 09/09 : elles doivent passer par Mux). Ajouter une vidéo en
modifiant une publication n'a donc JAMAIS marché.
SA DÉCISION : « retire pour l'instant et on verra plus tard » (option 1 ; la
2 = rattacher une vidéo Mux à une publication existante, chantier avec une
partie serveur, reportée).
✅ LIVRÉ AU 332 : bouton 🎬 retiré ; le « + » (plusieurs photos) reste, et
retirer une vidéo d'une publication reste possible. Le champ vidéo et
ajouterMediaEdite restent dans le fichier, inertes (aucun nettoyage).
Build 20260921-332. node --check OK.

EN ATTENTE DE SON « OK » (rien codé) : elle affirme une règle « par défaut,
sans acceptation, ça rejoint l'album du cheval, mais on peut les récupérer »
pour les identifications d'ALBUM — AUCUNE trace dans le suivi ni le code
(identifierAlbum écrit statut « attente »). Proposé : acceptation directe à
l'identification, bouton « Retirer de mes albums » (identifiée / propriétaire
du cheval / modératrice, déjà permis par id_suppr), SQL pour accepter les
propositions en attente.

────────────────────────────────────────────────────────────
111. 21/09 (333) — LA STORY D'UN CONCOURS PASSÉ (premier test)
────────────────────────────────────────────────────────────

Note : elle a choisi de laisser la règle des albums COMME ELLE EST (un album ne
rejoint la page que si la personne ACCEPTE) — sujet mis de côté.

BRIEF (validé par elle, relu par Chat) : sur la page d'un concours passé,
fabriquer une image Story 1080 × 1920 avec les VRAIES photos, derrière son fond
fixe « hype-story-concours-images-journee.png » (fourni, 941 × 1672, trois
fenêtres réellement transparentes — vérifié : alpha 0 à l'intérieur).

✅ LIVRÉ AU 333, dans EcranEvenementPasse SEULEMENT, aucun SQL, aucune
dépendance :
· FICHIER À POUSSER À LA RACINE DU DÉPÔT : hype-story-concours-images-journee.png
  (le PNG fourni, inchangé, seulement renommé). Chemin lu par le code :
  « hype-story-concours-images-journee.png » (même origine que l'index).
· Bouton « Partager » : un CONCOURS avec au moins une vraie photo ouvre un
  panneau « Créer la story / Partage classique / Annuler » (portail vers body,
  au-dessus de la barre d'onglets) ; sinon, partage classique direct, inchangé.
· CADRES MESURÉS sur le fichier (composantes transparentes, rectangles tournés
  minimaux via OpenCV), ramenés à 1080 × 1920, + 6 px de marge — objet unique
  STORY_CADRES (centre, largeur, hauteur, rotation, cadrage vertical fy) :
  grand paysage 462.6/643.1, 734 × 453, −4,28° (fy 0,32) ; petit paysage
  390/1020, 500 × 262, +4,87° (fy 0,5) ; portrait 853.6/904.6, 292 × 509,
  +6,24° (fy 0,3). Contrôlé par une simulation d'assemblage (les trois
  fenêtres tombent pile). Textes : STORY_TEXTES (titre x 71 / centre 168 /
  700 × 96 ; date x 170 base 257 ; lieu x 170 base 325 ; compteurs dans le
  cartouche, centre 828.6/1290.9, 212 × 60).
· ORDRE : noir → grande photo → petite (ou noir) → portrait (ou noir) → PNG →
  textes. Les secondaires sont TOUJOURS peints après la grande : elle ne peut
  pas transparaître dans une autre fenêtre ; chaque photo est coupée à SON
  cadre (clip), en « cover », jamais étirée, jamais répétée.
· PHOTOS : photosEv (vidéos, document « Le jour J », doublons écartés), la
  couverture choisie en grand si c'en est une ; remplissage grand → portrait →
  petit ; une photo illisible cède sa place à la suivante ; aucune lisible →
  partage classique. Chargement fetch → Blob → adresse locale (libérée après).
· TEXTES : titre en Cinzel (repli Cormorant/Georgia), ivoire, 2 lignes max,
  60 → 26 px jusqu'à tenir ; date et lieu en Montserrat 28 → 18 px, « … » si
  trop long ; compteurs « 11 PHOTOS · 2 VIDÉOS · 6 RÉSULTATS » (chaque partie
  à zéro masquée, vidéos = videosEv, résultats = res ; PAS de podiums), sur
  2 lignes si ça ne tient pas. document.fonts.ready attendu.
· JPEG 0,92, « hype-<titre-normalisé>-story.jpg » ; aperçu 9:16 plein écran
  noir (portail, data-noswipe + data-hscroll), boutons 46-48 px « Partager la
  story / Copier le lien / Fermer » ; UNE image en mémoire, adresse locale
  révoquée au remplacement, à la fermeture et au démontage.
· LIEN : toujours https://2hype.fr/#s=<id> ; texte « Retrouvez toutes les
  photos et partagez les vôtres sur Hype 🩵 <lien> ». Partage de fichier
  indisponible → partage classique. Le PARTAGE CLASSIQUE fabrique désormais
  aussi son lien depuis https://2hype.fr (au lieu de location.origin) — seul
  changement du partage classique.
⚠️ NON VÉRIFIABLE D'ICI : que les photos Supabase se dessinent sans
contaminer le Canvas (dépend des en-têtes CORS de Supabase Storage, ouverts en
principe sur les objets publics). Si le test échoue, l'écran bascule seul sur
le partage classique avec un message.
Build 20260921-333. node --check OK ; diff confiné à EcranEvenementPasse et
au marqueur.

· (334) 21/09 — Elle : « c'est à mettre dans les fichiers image ». Le dépôt
  range ses images dans `images/` (95 références dans l'index). Le fond de la
  story est désormais lu à `images/hype-story-concours-images-journee.png`,
  avec repli à la racine. Build 20260921-334.

· (335) 21/09, 17 h 46 — Sa capture WhatsApp : le partage part bien sur
  https://2hype.fr/#s=… (le 333/334 est EN LIGNE), mais c'est le partage
  CLASSIQUE (texte « 11 photos » + une photo), pas la story : « c'est push
  mais toujours rien ». Non tranché : panneau jamais vu, ou story ratée puis
  repli (le message de repli est sous la description, masqué par la feuille
  de partage). CAUSE PROBABLE (code) : la story chargeait les photos par la
  VIGNETTE redimensionnée avec fetch(…, { cache: "force-cache" }) ; Safari
  peut alors resservir la copie mise en cache par une balise <img> SANS
  en-têtes CORS et refuser la lecture. Le partage classique, lui, fait
  fetch(url) simple sur l'ADRESSE D'ORIGINE, et ça marche (photo reçue).
  CORRECTIF : même appel que le classique (fetch(url) simple, adresse
  d'origine). ET chaque échec dit désormais SA RAISON dans le message
  (« photo : … », « fond introuvable (images/…) », « image non exportable
  (Canvas) »). Build 20260921-335.

· (336) 21/09, 18 h 05 — ✅ LA STORY FONCTIONNE SUR IPHONE (sa capture de
  l'aperçu : fond, trois photos, titre, date, lieu, « 11 PHOTOS » à leur
  place). Le correctif du 335 (fetch simple sur l'adresse d'origine) était le
  bon. Sa remarque : « un souci d'adaptation des images » — une photo
  VERTICALE tombée dans le petit cadre paysage perdait la tête de la
  cavalière. CORRECTIF : jusqu'à 6 photos chargées, la couverture (ou la
  première) en grand, la plus VERTICALE des autres dans le cadre portrait,
  la plus HORIZONTALE restante dans le petit cadre ; cadrage vertical remonté
  à 0,28 pour le grand et le petit cadre (0,30 pour le portrait). Build
  20260921-336.

────────────────────────────────────────────────────────────
112. 21/09 (337) — LES LIENS DE SOUVENIR OUVRAIENT LA PAGE COMMUNAUTÉ
     (MON ERREUR DU 313) — RATTRAPAGE DES LIENS DÉJÀ ENVOYÉS
────────────────────────────────────────────────────────────

SES MOTS : « le lien que t'as mis dans la story amène sur la page
communauté », « je l'ai partagé à tout le monde ».
CAUSE PROUVÉE (code) : « #s= » est DEPUIS LE 14/08 la famille des STORIES
dans CIBLE_DIRECTE (« #s=<id> une story »), traitée AVANT ma route du 313 —
qui ne s'exécutait donc JAMAIS. Tous les liens de souvenir partagés (partage
classique 313-336, story 333-336) ouvraient la page Communauté. LEÇON : avant
de créer une adresse, relire le tableau des familles d'adresses (commentaire
du 14/08) et chercher toute branche `fam === "<lettre>"` déjà existante.

✅ LIVRÉ AU 337, aucun SQL :
1. RATTRAPAGE des liens déjà envoyés : sur « #s=<id> », l'appli ouvre comme
   avant la page Communauté (une vraie story s'ouvre toujours), puis
   hypeRattraperLienSouvenir demande à la base si l'identifiant est un
   RENDEZ-VOUS (club_agenda) ; si oui, elle bascule sur sa page souvenir
   (réessais toutes les 0,4 s tant que l'appli n'est pas prête, 10 s au plus).
   Porte de navigation ajoutée pour ça : window.__hypeSetEcran = naviguer.
2. NOUVELLE ADRESSE DES SOUVENIRS : « https://2hype.fr/#souvenir=<id> »
   (route « souvenir » dans CIBLE_DIRECTE), utilisée par la story ET par le
   partage classique. Elle ne croise plus les stories.
La branche « s » ajoutée au 313 plus bas reste en place, inerte (aucun
nettoyage).
Build 20260921-337. node --check OK.

────────────────────────────────────────────────────────────
113. 21/09 — À FAIRE PLUS TARD (noté à sa demande) : LES MAILS SUPABASE
     EN FRANÇAIS
────────────────────────────────────────────────────────────

SIGNALÉ : une cavalière a demandé un nouveau mot de passe et a reçu le mail
ENTIÈREMENT EN ANGLAIS. Ce n'est pas l'appli : c'est le modèle de mail de
Supabase. Le modèle français « HYPE — ton cheval t'attend », écrit
autrefois, n'est donc pas (ou plus) enregistré dans Supabase.
À FAIRE, dans le tableau de bord Supabase :
1. Authentication → Emails / Email Templates → « Reset Password » : objet
   « HYPE — ton cheval t'attend » + corps HTML en français (fond #060709,
   bouton turquoise #20D9F5 « Choisir mon nouveau mot de passe », garder
   {{ .ConfirmationURL }} tel quel) — texte complet déjà rédigé dans la
   conversation du 21/09 ;
2. traduire aussi « Confirm signup », « Magic Link », « Change Email »
   (sans doute encore en anglais) — proposé, à préparer ;
3. Authentication → URL Configuration : Site URL = https://2hype.fr ;
   Redirect URLs : garder aussi https://2hype.netlify.app/** (anciens liens).
LIMITE : Supabase n'envoie qu'UNE langue par modèle (les anglophones
recevront le français).

· (338) 21/09, 22 h 42 — Sa capture : la story s'ouvre dans Instagram, mais
  le bouton « Story » de la feuille d'Instagram est à moitié RECOUVERT par
  « Envoyer un message » (Instagram ajoute cette option quand l'image arrive
  AVEC du texte) ; le toucher tombait sur « message ». Et en « Publication »,
  Instagram recadre en 4:5 (normal : l'image est au format story 9:16 —
  expliqué ; un format publication 4:5 demanderait un deuxième fond, proposé,
  non décidé). ✅ Deux boutons dans l'aperçu : « Pour Instagram (image
  seule) » (navigator.share({ files }) sans texte) et « Pour WhatsApp,
  Messages… (avec le lien) » (comme avant) ; « Copier le lien » et « Fermer »
  inchangés. Build 20260921-338.

────────────────────────────────────────────────────────────
114. 21/09 — IDÉE EN ATTENTE : IMPORTER LES RÉSULTATS D'UN CONCOURS DEPUIS LE
     PDF « RÉSULTATS DÉTAILLÉS » DE LA FFE (rien de codé)
────────────────────────────────────────────────────────────

SA QUESTION : déposer un document de résultats sur la page d'un concours,
voir les classements dessus, et mettre à jour les palmarès des chevaux et
cavalières concernés. DOCUMENT FOURNI : « E_trier_.pdf » = page SIF FFE
« Résultats détaillés » imprimée en PDF, AVEC DU VRAI TEXTE (lisible), UNE
épreuve par PDF (concours SIF 2732594, épreuve n°04, CSO Club 3 Grand Prix,
20/09/2026). Chaque ligne, toujours dans le même ordre : rang (ou El. / NP /
HC) + « SF » ; NOM CAVALIER ; CLUB (« SOCIETE D EQUITATION DE PARIS (75) ») ;
CHEVAL ; COACH (« BLANDINE PRONOST ») ; points (20 / 15 / 5 / 2.5) ; QUART
(1er → 4e, la colonne que l'import FFE lit déjà).
Sur cette épreuve : 6 cavalières de la SEP (Maëlys Masure / Aceitunero 3e SF,
Aurélie Bussonnais / Dakota CA 10e SF, Romy Thaïs Cirba Ménil / Cirrus des
Lauriers 23e, Clémence Honorat / Apache du Lys 31e, Lauren Sojfer / Orchid's
Yellow El., Emma Petitjean / Ecolo Louvo El.).
POINT DÉLICAT : relier « MAELYS MASURE » (FFE) à un compte Hype (souvent un
simple prénom) — par les résultats déjà importés, puis confirmation à l'écran
la première fois, retenue ensuite. Chevaux : par le nom, tolérance de l'import.
QUATRE DÉCISIONS À PRENDRE (posées, sans réponse) : 1) qui garder (club du
rendez-vous, et/ou cavalières dont elle est le coach) ; 2) cavalière sans
compte : ligne affichée sans palmarès, ou ignorée ; 3) colonne SQL « ce
résultat appartient à ce rendez-vous » (règle le rattachement par la date) ;
4) doublons avec le télémat : reconnus (cavalière + cheval + date + épreuve).
SA DÉCISION : « garde ça en tête, mais on va attendre que toutes les
cavalières se soient inscrites pour la SEP ». À REPRENDRE à ce moment-là.

────────────────────────────────────────────────────────────
115. 21/09 — IMPORT DES RÉSULTATS D'UNE ÉPREUVE (PDF « RÉSULTATS DÉTAILLÉS »)
     : CHANTIER RELANCÉ, PLAN DÉCIDÉ, RIEN CODÉ
────────────────────────────────────────────────────────────

Contexte : elle a essayé de donner le PDF « Résultats détaillés » (Étrier,
Club 3 GP) à l'import du palmarès de Daphné → « Aucun résultat trouvé »
(normal : l'import ne lit que le TÉLÉMAT d'une cavalière/d'un cheval).
SES DÉCISIONS (21/09, soir) :
· élargir l'outil d'import pour qu'il lise AUSSI ce PDF d'épreuve, et qu'il en
  profite pour mettre à jour les AUTRES chevaux présents (fiche dans Hype,
  nom reconnu avec la tolérance de l'import) ;
· un résultat est rangé AU NOM DE LA CAVALIÈRE qui montait (si elle a un
  compte) — donc dans son palmarès ET celui du cheval ; correspondance « NOM
  FFE » ↔ compte Hype CONFIRMÉE À L'ÉCRAN la première fois, retenue ensuite ;
· relecture à l'écran avant enregistrement (cases à cocher), pas de doublon
  avec le télémat (cavalière + cheval + date + épreuve) ;
· les résultats RANGÉS PAR ÉCURIE (un titre par écurie) sur la PAGE SOUVENIR
  du concours ET sur la FICHE DU CONCOURS DANS L'AGENDA.
RELEVÉ EN BASE : resultats, INSERT = « poster resultat » (auth.uid() =
user_id) → personne ne pouvait enregistrer pour une autre cavalière.
✅ SQL PASSÉ PAR ELLE (23 h 56, « Success ») : policy ADDITIONNELLE
« poster resultat moderation » (INSERT, authenticated, with check
hype_est_moderatrice()) — seules les modératrices peuvent enregistrer pour
n'importe quelle cavalière ; le droit des cavalières est inchangé.
BLOQUÉ SUR : le fichier hype-import-ffe.js (à fournir depuis GitHub — ne
jamais le réécrire à l'aveugle). Ensuite : plan détaillé à valider, puis code.
(Remplace le « on attend que toutes les cavalières soient inscrites » du
§114 : elle a relancé le chantier.)

────────────────────────────────────────────────────────────
116. 22/09 (339 + hype-import-ffe.js ?v=19) — ÉTAPE 1 : L'IMPORT LIT LE PDF
     « RÉSULTATS DÉTAILLÉS » D'UNE ÉPREUVE
────────────────────────────────────────────────────────────

Fichier hype-import-ffe.js FOURNI PAR ELLE (1079 lignes, 62,8 Ko). Découpage
validé (« Ok ») : étape 1 = lire l'épreuve et ranger sur les FICHES DES
CHEVAUX ; étape 2 = au nom de chaque cavalière (+ case « nom FFE » au profil,
SQL) ; étape 3 = résultats par écurie sur la page souvenir et la fiche agenda.

✅ LIVRÉ (étape 1) :
· hype-import-ffe.js : lire() reconnaît le document (« Résultats détaillés » +
  « Concours SIF ») et passe par lireSIF(). Format MESURÉ sur son PDF réel avec
  le même assemblage de lignes que l'app (pdf.js + lignesDePage, exécuté ici
  sur E_trier_.pdf) : en-tête (épreuve « Club 3 Grand Prix », date, concours
  « PARIS ETRIER COSSEBRISSAC »), puis rang / cavalier / club « (75) » /
  cheval / coach / points / quart ; exposants (« re », « er », « e ») sur des
  lignes à part, sautés. ANCRE = la ligne du CLUB (les points et le quart
  ressemblent à des rangs : le rang est cherché à rebours depuis le club).
  Résultat du test : 36 lignes, 5 clubs, les 6 de la SEP exactes (Maëlys
  Masure / Aceitunero 3e SF q1 20 pts ; Aurélie Bussonnais / Dakota CA 10e SF
  q1 20 pts ; Romy Thaïs Cirba Ménil / Cirrus des Lauriers 23e q3 ; Clémence
  Honorat / Apache du Lys 31e q4 ; Lauren Sojfer / Orchid's Yellow et Emma
  Petitjean / Ecolo Louvo éliminées). Partants = classés + éliminés (36) ;
  NP et HC non écrits.
· Chaque ligne a la forme d'une ligne de télémat (+ club, coach) : l'écrivain
  de l'app la range sur la fiche de SON cheval (reconnaissance à deux niveaux
  du 18/09) ; pas de verrou d'identité (aucun nom de cheval en en-tête).
· Relecture : le CLUB de l'utilisatrice est reconnu D'OFFICE (mots du nom,
  sans accents ni département : « SOCIETE D EQUITATION DE PARIS (75) » ↔
  « Societe d'Equitation de Paris (SEP) ») — sinon elle le choisit par une
  pastille ; SEULES les lignes du club choisi sont relues et ENVOYÉES, les
  autres clubs ne partent jamais.
· Pas de contrôle « quart attendu » sur ce document (les partants FFE n'y sont
  pas donnés : faux doutes) ; le quart est LU.
· ⚠️ POINTS FRACTIONNAIRES (2.5) NON ÉCRITS (null) : la colonne n'a jamais
  reçu que des entiers ; un décimal risquerait de faire refuser tout l'envoi.
  À reprendre avec le chantier « classement sportif » (points EXACTS).
· index.html (339) : clé ?v=18 → 19 ; l'écran d'import pose
  window.__hypeEcuriesImport (ecurie, ecurie2 du profil) pour la
  reconnaissance du club.
⚠️ ÉTAPE 1 = rangé AU NOM DE CELLE QUI IMPORTE (comme tout import
aujourd'hui) ; l'attribution à chaque cavalière est l'étape 2.
⚠️ DOUBLONS AVEC LE TÉLÉMAT : la clé compare aussi le NOM DU CONCOURS ; si le
télémat l'écrit autrement que « PARIS ETRIER COSSEBRISSAC », un doublon est
possible — à surveiller au premier télémat de ce concours.
node --check OK (module + index) ; build 20260922-339.

────────────────────────────────────────────────────────────
117. 22/09 (340) — ÉTAPE 2a : « MA LICENCE FFE » DANS MON COMPTE
────────────────────────────────────────────────────────────

SON IDÉE : « si chaque cavalière remplit son numéro de licence en confirmant
que c'est bien elle, ça irait pas ? ». Réponse donnée : oui pour la licence
(unique, présente en tête du télémat d'une cavalière), MAIS la page
« Résultats détaillés » n'affiche QUE des noms → on garde aussi le NOM FFE.
Décision (« Ok ») : PAS de case sur le profil (la modératrice aurait dû
écrire sur le profil des autres) → petite table à part, SQL donné :
`noms_ffe` (nom_ffe text PK, user_id uuid → auth.users on delete cascade,
licence text UNIQUE, cree_par, cree_le), RLS : lecture authenticated ;
insert / update / delete = hype_est_moderatrice() OU user_id = auth.uid().
⚠️ SQL NON CONFIRMÉ PASSÉ à la livraison du 340.

✅ LIVRÉ AU 340 (index.html seul ; hype-import-ffe.js inchangé depuis ?v=19) :
nouvelle tuile « Ma licence FFE » dans Mon compte → section Compte, juste
après « Mon abonnement » (composant BlocLicenceFFE). Elle y écrit SON numéro
(contrôlé : 7 chiffres + 1 lettre) et SON nom tel que la FFE l'écrit
(pré-rempli avec son prénom, rangé en MAJUSCULES SANS ACCENTS), coche « C'est
bien moi », enregistre (sa ligne précédente est remplacée). Messages clairs :
table absente (« la base n'est pas encore prête »), nom ou licence déjà pris
par un autre compte, format invalide. 6 langues.
Build 20260922-340. node --check OK.
RESTE : 2b (à l'import, chaque résultat au nom de la cavalière reconnue par
noms_ffe, confirmation par la modératrice pour les non déclarées) ; étape 3.

· 22/09, 00 h 15 — ✅ SQL « noms_ffe » PASSÉ PAR ELLE (« Success. No rows
  returned ») : table + RLS (lecture authenticated ; écriture / modification
  / suppression = modératrice OU sa propre ligne). La tuile « Ma licence FFE »
  du 340 peut enregistrer.
· PROPOSÉ, EN ATTENTE DE SON « OK » (341) : le bouton qui bascule la page
  Écurie d'une écurie à l'autre EXISTE (pastilles écurie principale /
  secondaire, setClubForce) mais il est caché derrière AFFICHER_GAMIF_CLUB =
  false (partie classement éteinte). Proposé : l'afficher dès qu'une cavalière
  a deux écuries, indépendamment de ce drapeau ; retour sur l'écurie
  principale à chaque réouverture de la page.

· (341) 22/09 — « Ok » : les pastilles de bascule entre les deux écuries
  s'affichent sur la page Écurie dès que ecurie2 existe et diffère de la
  principale, sans dépendre d'AFFICHER_GAMIF_CLUB (resté false, la partie
  classement reste éteinte). Toucher une pastille bascule TOUTE la page
  (setClubForce → monClub : bannière, membres, chevaux, agenda, résultats,
  fil) ; retour sur l'écurie principale à la réouverture. Build
  20260922-341. node --check OK.

────────────────────────────────────────────────────────────
118. 22/09 (342) — LE FORMAT « PUBLICATION » INSTAGRAM (4:5) POUR UN CONCOURS PASSÉ
────────────────────────────────────────────────────────────

Deux fonds fournis (1092 × 1440, fenêtres transparentes vérifiées, quasi
identiques). Constat dit : ≈ 3:4, plus haut que le 4:5 maximal d'une
publication ; et PAS de ligne pour le nom du concours (la date suit
« CONCOURS »). Sa réponse : « 2, choisis le plus pratique pour toi » →
SECOND fond retenu ; le nom du concours va À CÔTÉ DE L'ÉPINGLE, suivi du lieu
s'il n'y est pas déjà (« CSO étrier de Paris » contient « Étrier de Paris » →
une seule fois).
✅ LIVRÉ AU 342, EcranEvenementPasse seul, aucun SQL :
· FICHIER À POUSSER DANS images/ : hype-publication-concours-images-journee.png
  (son second fond, inchangé, renommé ; repli à la racine).
· panneau de partage d'un concours : « Créer la story » ET « Créer la
  publication (format Instagram) » ; classique / Annuler inchangés.
· fabriquerStory(fmt) : format « story » inchangé ; format « publication »
  (PUB_FORMAT) = image 1080 × 1350, fond posé rogné de 37,5 px en haut et en
  bas (1092 × 1365 → 1080 × 1350), fenêtres mesurées sur le fichier (grand
  481/426, 743 × 403, −4,22° ; petit 390/761, 481 × 229, +5,88° ; portrait
  845/653, 290 × 453, +6,83°), date x 178 base 111, nom (+ lieu) x 178 base
  158 en demi-gras, compteurs dans le cartouche 827/963. Simulation
  d'assemblage : tout tombe en place.
· aperçu au ratio 4:5 pour la publication ; fichier « …-publication.jpg » ;
  mêmes boutons (Instagram image seule / WhatsApp avec lien / copier / fermer).
Build 20260922-342. node --check OK.

────────────────────────────────────────────────────────────
119. 22/09 (343) — LA BASCULE ENTRE LES DEUX ÉCURIES, REMONTÉE ET FIABILISÉE
────────────────────────────────────────────────────────────

SA CAPTURE (11 h 01, page Écurie Feinn) : « c'est push mais je vois pas où
changer d'écurie ». DEUX CAUSES POSSIBLES, toutes deux corrigées :
1. MON ERREUR D'ANNONCE : au 341 les pastilles étaient restées APRÈS le mur
   « À la une » (très bas), alors que j'avais écrit « juste sous les
   stories ». → REMONTÉES juste sous le bandeau du club (nom, lieu, OFFICIAL),
   avant les stories, visibles sans défiler.
2. ecurieSecondaire ne lisait que le PROFIL GARDÉ SUR LE TÉLÉPHONE
   (profil.club2 || profil.ecurie2) — potentiellement vide sur la nouvelle
   adresse 2hype.fr. → relu aussi en BASE (profiles.ecurie2, état
   ecurie2Base).
Build 20260922-343. node --check OK.

⚠️ ERREUR SIGNALÉE LE 22/09 (non corrigée, attend son « ok ») : la tuile
« Ma licence FFE » (340) et la table noms_ffe DOUBLONNENT un système EXISTANT
depuis le 13/09 : EcranRattacherFFE (tuile modératrice « Relier les résultats
FFE » dans Mon compte : noms FFE tirés de resultats.cavalier, état Libre /
Relié / Demande ; hype_rattacher_cavalier, hype_accepter_cavalier,
hype_refuser_cavalier) + porte cavalière « C'est moi »
(hype_noms_ffe_libres, hype_revendiquer_cavalier). Les résultats d'un nom
relié s'affichent sur la page Cavalier (BlocResultatsCavaliere, filtre
cavalier_id). Proposé : RETIRER la tuile 340 ; l'étape 2 de l'import
s'appuiera sur ce système. LEÇON : avant de créer une fonction, chercher dans
l'index les fonctions SQL appelées (liste des rpc) et les écrans voisins.
À VÉRIFIER (une requête) : un nom déjà relié rattache-t-il aussi les
résultats importés APRÈS le rattachement (cavalier_id posé à l'insertion ?).

────────────────────────────────────────────────────────────
120. 22/09 (344) — ✅ L'IMPORT D'ÉPREUVE MARCHE ; LA COCHE GOUVERNE AUSSI
     LES PAGES DE RENDEZ-VOUS
────────────────────────────────────────────────────────────

✅ ÉTAPE 1 VALIDÉE À L'ÉCRAN (capture de 11 h 09, page du CSO Étrier de
Paris) : les résultats de l'épreuve Club 3 GP importés depuis le PDF
« Résultats détaillés » s'affichent (Aceitunero 3e/36 Maëlys Masure, Dakota CA
10e/36 Aurélie Bussonnais, Cirrus des Lauriers 23e/36, Orchid's Yellow et
Ecolo Louvo éliminés). Apache du Lys (Clémence Honorat) absent : cheval sans
fiche dans Hype, très probablement (non enregistré, dit à l'écran de fin).
SA REMARQUE : « il a pris tous les résultats au lieu de prendre que les
sans-faute et les classements ». CAUSE : les pages de rendez-vous (agenda :
EcranAgendaClub ; page souvenir ouverte par lien : EcranEvenementPasse) lisaient
les résultats SANS la colonne `visible` → les lignes décochées à la relecture
(23e hors 1er quart, éliminées) s'affichaient. L'import, lui, avait bien
décoché (le palmarès les masque).
✅ CORRIGÉ AU 344 : les deux lectures prennent `visible` et écartent les
lignes visible = false (règle de toujours : la coche gouverne TOUT à
l'affichage, listes et compteurs — les cartes « N résultats » suivent).
Build 20260922-344. node --check OK.

· (345) 22/09 — « Ok » : la tuile « Ma licence FFE » (340) est RETIRÉE de Mon
  compte (doublon d'EcranRattacherFFE, reliée à rien). BlocLicenceFFE reste
  dans le fichier, inerte ; la table noms_ffe reste en base, inutilisée
  (suppression possible plus tard, sa décision : `drop table public.noms_ffe;`).
  Build 20260922-345. node --check OK.

· 22/09 — RELEVÉ EN BASE (deux requêtes) : les 5 noms importés de l'Étrier
  (AURELIE BUSSONNAIS, EMMA PETITJEAN, LAUREN SOJFER, MAELYS MASURE,
  ROMY THAIS CIRBA MENIL) n'ont AUCUN résultat relié à un compte (relies = 0
  partout ; MAELYS MASURE a 2 résultats au total). Elle : « on ne les a pas
  remis aux cavaliers encore ». → rien à corriger. Plan convenu pour l'étape
  2 : 1) elle relie les noms (Mon compte → « Relier les résultats FFE », ou
  « C'est moi » côté cavalière) ; 2) au prochain import d'épreuve, une requête
  vérifie si les NOUVEAUX résultats d'un nom déjà relié portent cavalier_id ;
  3) seulement s'ils ne le portent pas : correctif dans l'écrivain de l'import
  (reprendre le cavalier_id déjà attribué à ce nom).

────────────────────────────────────────────────────────────
121. 22/09 (346) — LA PAGE « RÉSULTATS » D'UNE CAVALIÈRE
────────────────────────────────────────────────────────────

SA DEMANDE : sur la page perso (capture d'Evan), « je vois les derniers
résultats mais pas tous ses résultats » ; « il faut créer sa page résultats,
c'est le plus important » ; « reproduis en gros la page similaire qu'on a
faite pour les chevaux, on affinera après ; il faut qu'on puisse voir quand
même les principaux résultats sur sa page, et c'est là qu'on peut mettre voir
tout ». CONSTAT : BlocResultatsCavaliere n'affichait que les 8 derniers
concours, sans aucun accès à la liste complète.

✅ LIVRÉ AU 346, aucun SQL :
· BlocResultatsCavaliere (page Cavalier) : GARDE ses cartes « Derniers
  résultats » ; nouveau lien « Voir tout › » à droite du titre (sur sa page
  comme en visite) → écran « resultats-cavalier » (identifiant réellement lu
  par le bloc, retenu dans idResoluRef → window.__resCavaliereId).
· NOUVEL ÉCRAN EcranResultatsCavaliere, route « resultats-cavalier ». Son
  corps est une COPIE TEXTUELLE du palmarès éditorial de la fiche cheval (bloc
  « PALMARÈS ÉDITORIAL — Proposition B » d'EcranCheval, ~59 000 caractères) —
  mêmes 4 chiffres et règles (sorties, victoires hors prépas, podiums,
  classements), filtres Tous / Classés / Podiums / Sans faute, moments forts,
  saisons dépliables, points de qualification, derniers résultats en cartes.
  La FICHE CHEVAL N'EST PAS TOUCHÉE (copie, pas partage).
  Adaptations par des variables locales que le corps copié lit :
  lignes = resultats où cavalier_id = la cavalière (même lecture que son
  bloc), sans masque_cavaliere ; « cavalier » de chaque ligne := NOM DU CHEVAL
  (les onglets deviennent des onglets PAR CHEVAL, les listes disent « ·
  Rizotto d'Emery ») ; vrai nom gardé pour la phrase des cartes (deux
  retouches textuelles dans la copie : cav_reel / ch_reel) ; en-tête = photo
  de profil + nom + écurie ; AUCUN outil de propriétaire ou de modératrice
  (estModerateurHype local → false, chevalDyn.ownerId = null) : page de
  lecture ; pas de palmarès écrit en dur (c.palmares = []).
  Aucun résultat relié : message qui renvoie à « Relier les résultats FFE ».
· Vérifications : node --check OK ; analyse des noms libres de la copie
  (acorn) : ne restent que des fonctions globales existantes.
⚠️ À AFFINER APRÈS (dit par elle) : les deux copies du palmarès (cheval /
cavalière) évolueront séparément — toute règle de calcul changée d'un côté
doit l'être de l'autre (même avertissement que « résumé ↔ palmarès »).
Build 20260922-346.

────────────────────────────────────────────────────────────
122. 22/09 (347 + 348) — L'ENCART ÉCURIE DE LA PAGE CAVALIER ; LA PAGE
     RÉSULTATS QUI RESTAIT VIDE
────────────────────────────────────────────────────────────

SES DEMANDES (après le 346) : sur la page Cavalier, des onglets comme sur les
pages cheval et écurie — Photos, Vidéos, Performances, Progression (→ carnet),
Théorie (→ Galops), Actualité (publications, mentions, concours ; « au besoin
tu mettras comme d'habitude grisé en écrivant prochainement ») ; et l'écurie :
« rares sont ceux qui en ont deux ; plutôt un petit + qu'un gros onglet qui
prend la moitié de la largeur ; tant qu'il y a une seule écurie, l'onglet
horizontal pleine largeur, avec l'encart de l'écurie et quelques infos (ville
et département) ». « Ok » : écurie d'abord (347), tuiles ensuite ; en visite,
Progression et Théorie cachées (proposé).

✅ 347 — EcranMonCavalier : la grille 2 colonnes « Mon club | Ajouter une
écurie » devient une CARTE PLEINE LARGEUR par écurie (la seconde dessous, plus
compacte), avec « 📍 ville (département) » ; « + Ajouter une écurie » devient
un petit lien sous la carte, et N'APPARAÎT PLUS EN VISITE (sa capture d'Ambre
montrait la grosse case sur la page d'une autre). Ville : d'abord la table des
clubs revendiqués (copie de CLUBS_REVENDIQUES d'EcranGuilde : « ecurie feinn »
→ « Itteville (Essonne) » — ⚠️ DEUX COPIES, à changer aux deux endroits), puis
window.HYPE_CLUBS. Clics, crayons, éditeurs : inchangés.

✅ 348 — SA CAPTURE (11 h 44) : « la page résultats d'Evan reste vide ».
CAUSE (MON ERREUR du 346) : j'avais copié le bloc du palmarès SANS les « () »
qui l'appellent → React recevait une fonction au lieu d'un contenu, rien ne
s'affichait (avertissement « Functions are not valid as a React child »,
reproduit ici). LEÇON : rendre la page hors ligne AVANT livraison — désormais
fait avec React + react-dom/server et des données d'exemple (harnais).
Corrigé, plus deux défauts vus au rendu : (a) les cartes « Derniers
résultats » disaient « 3e Rizotto sur Evan » → « 3e Evan sur Rizotto » ; (b)
un podium ajouté aux moments forts affichait « 1er » → son VRAI rang (« 3e »).
⚠️ Le défaut (b) EXISTE AUSSI sur la fiche cheval (copie d'origine) : non
corrigé là-bas, à lui proposer.
Build 20260922-348. node --check OK ; rendu hors ligne OK.

· (349) 22/09 — « Ok continue » : LES RACCOURCIS DE LA PAGE CAVALIER
  (EcranMonCavalier), juste au-dessus de l'encart écurie, dessin de carteG
  (page du club / fiche cheval : hauteur 104, pastille ronde, pictogramme
  tracé, Cinzel 12.5, pied en petites capitales ; sans page = 50 %).
  Destinations RÉELLES : Photos → « memoirescavalier » (Hype Memories, lit
  déjà la visite) ; Performances → « resultats-cavalier » (identifiant : la
  visitée, sinon l'utilisatrice relue par utilisateurActuel) ; Progression →
  « carnet » ; Théorie → « galops ». Vidéos et Actualité : GRISÉES
  « Prochainement » (aucune page n'existe ; l'écran « videos » de l'app n'est
  pas celui d'une cavalière). EN VISITE : Progression et Théorie CACHÉES.
  Build 20260922-349. node --check OK.

· (350) 22/09 — « Ok continue » : le défaut vu au 348 est corrigé AUSSI sur
  la FICHE CHEVAL (palmarès éditorial d'EcranCheval) : une carte « moment
  fort » ajoutée en complément (podium, quand il y a moins de 5 victoires)
  affichait « 1er » ; elle affiche désormais son VRAI rang (« 2e », « 3e »).
  Une seule ligne changée. Build 20260922-350. node --check OK.

────────────────────────────────────────────────────────────
123. 22/09 (351) — LA PAGE « ACTUALITÉ » D'UNE CAVALIÈRE ; LA TUILE S'ALLUME
────────────────────────────────────────────────────────────

Proposition faite (contenu, règles, question sur les albums), réponse « Ok
continue » → albums NON inclus (question restée sans réponse ; ajout possible).
✅ LIVRÉ, aucun SQL : nouvel écran EcranActualiteCavaliere, route
« actualite-cavalier » (window.__actuCavaliereId) ; la tuile « Actualité » de
la page Cavalier s'allume (visite → la visitée, sinon l'utilisatrice).
UNE liste du plus récent au plus ancien :
1. SES publications (commentaires user_id = elle, cibles ecurie: / club: /
   agenda: / cheval:, pas les réponses post:), 60 au plus ;
2. les publications où elle est IDENTIFIÉE (identifications type cavalier,
   statut accepte, photo_url « post:<id> » — ce qu'écrivent « Identifier »
   et le @), avec « Identifiée par <auteur> » ;
3. SES CONCOURS (resultats cavalier_id = elle, sans visible = false ni
   masque_cavaliere), 30 au plus, avec le cheval et le badge SF.
Privé : garanti par la policy « commentaires lecture » (21/09). Toucher une
publication ouvre SON MUR (agenda → fiche du rendez-vous via __agendaFiche +
guilde ; cheval → fiche ; ecurie → page Actualités) ; toucher un concours ouvre
la page Résultats. Rendu hors ligne OK (harnais React + données d'exemple) ;
node --check OK. Build 20260922-351.

· (352) 22/09 — « Ok » : LA PAGE « VIDÉOS » D'UNE CAVALIÈRE (EcranVideosCavaliere,
  route « videos-cavalier », window.__videosCavaliereId) ; la tuile « Vidéos »
  s'allume. Contenu : les vidéos qu'ELLE A PUBLIÉES (photo_url ET medias de ses
  publications sur les murs écurie / club / agenda / cheval, 200 publications
  lues au plus), grille de 3 miniatures (hypeMiniatureVideo) du plus récent au
  plus ancien, date dessous ; toucher = lecture en grand (hypeCalquePhoto, qui
  lit les vidéos). NON inclus (dit) : albums des chevaux, vidéos où elle est
  identifiée. Privé : policy « commentaires lecture ». Aucun SQL. Rendu hors
  ligne OK ; node --check OK. Build 20260922-352.

· (353) 22/09 — Sa réponse sur la page Vidéos : « les 1 faut les mettre, et
  les 2 avec son accord ». AJOUTÉ à EcranVideosCavaliere : (1) les vidéos des
  ALBUMS DE SES CHEVAUX (chevaux possédés + rattachés via chevaux_liens ;
  albums publics, un album privé seulement pour son autrice qui le lit) —
  légende = nom du cheval ; (2) les vidéos où elle est IDENTIFIÉE, SEULEMENT
  statut « accepte » (identification d'une publication « post:<id> » → ses
  médias, ou d'un média direct) — légende « Identifiée ». Tri par date,
  doublons écartés. Aucun SQL. Rendu hors ligne OK ; node --check OK.
  Build 20260922-353.
  (Note : sur son « OK continue » précédent, j'avais commencé l'étape 1 de la
  refonte Communauté SANS son choix explicite ; ANNULÉE avant livraison, rien
  poussé. Elle reste en attente de ses trois réponses d'audit.)

────────────────────────────────────────────────────────────
124. 22/09 (354) — REFONTE DE LA PAGE COMMUNAUTÉ, ÉTAPE 1 : L'EN-TÊTE
────────────────────────────────────────────────────────────

Après l'audit (§ plus haut, point pour Chat fourni) et ses « ok, continue »
répétés, le plan est lancé par ses étapes qui NE dépendent PAS des trois
décisions encore ouvertes (Journal des clubs, carte compacte, « Le Monde Au
Galop »).
✅ ÉTAPE 1 (EcranCommunaute) : bande noire au-dessus de l'image 104 → 60 px
(+ encoche), dégradé de raccord remonté d'autant ; « COMMUNAUTÉ / ÉQUESTRE »
en IVOIRE (#F4EFE4) ; sous-titre turquoise #5FE9F0 gardé (10 px, espacement
2,6) ; libellés des 4 accès en ivoire adouci. Accès, icônes, routes (Résultats
toujours sans action), rail de stories : INCHANGÉS. Aucun SQL.
Build 20260922-354. node --check OK.
PROCHAINES ÉTAPES (sans ses décisions) : 2) événement mis en avant + Mon club ;
3) L'Agenda en rail ; 5) classement compact ; 6) rails Personnes suivies /
Nouveaux cavaliers (+ data-hscroll) ; 7) Le fil. EN ATTENTE DE SES RÉPONSES :
4) carte compacte, 8) Journal des clubs, et le sort de « Le Monde Au Galop ».

· (355) 22/09 — « Ok, continue » : REFONTE COMMUNAUTÉ, ÉTAPE 2.
  Événement mis en avant (CarteEvenementsC, appelé UNIQUEMENT par
  Communauté) : bord ivoire discret au lieu du turquoise, ombre portée ;
  pastille « Événement » en or champagne (texte #E9D3A2, bord or) au lieu du
  dégradé turquoise ; titre ivoire ; lieu · dates en or ; points du carrousel
  toujours turquoise. « Mon club » : bord et fond sobres (ivoire), titre
  ivoire, pictogramme turquoise gardé dans un carré plus discret. Données,
  carrousel, clics : INCHANGÉS. Aucun SQL. Build 20260922-355. node --check OK.

· (356) 22/09 — « Ok, continue » : REFONTE COMMUNAUTÉ, ÉTAPE 3 — « L'AGENDA ».
  L'ancien bloc « Grands événements » (4 cartes empilées) est DÉPLACÉ juste
  sous « Mon club » et devient un RAIL HORIZONTAL titré « L'Agenda » : cartes
  à 78 % de largeur (une entière + l'aperçu de la suivante), 150 px, arrêt
  carte par carte (scroll-snap), data-hscroll (le geste horizontal ne change
  pas d'onglet), bord ivoire, pastilles « À la une » / « L'article » en or
  champagne, lieu · dates en or. MÊMES 4 événements, MÊMES états (salon et
  equita « Prochainement » non cliquables), MÊMES clics (csio → article, les
  autres → événement). Le repère refEvenements a SUIVI le bloc : l'accès
  « Événements » de l'en-tête défile toujours jusqu'à lui. Ancien
  emplacement vidé (commentaire). Aucun SQL. Build 20260922-356.
  node --check OK.

· (357) 22/09 — Brief de Chat « build 346, étape 1 » reçu alors que le fichier
  était au 356 (étapes 1-3 déjà faites sur ses « ok, continue ») ; conflit
  SIGNALÉ, sa réponse : « si tu as déjà avancé plus que ça, pas de problème,
  on n'est pas obligés de tout suivre » → on GARDE 355 et 356, et on applique
  ce qui manquait du brief :
  · les 4 accès en GRILLE de 4 colonnes égales (minmax(0, 1fr), minWidth 0),
    zone tactile ≥ 52 px de haut, libellés centrés qui peuvent passer à la
    ligne (aucun nowrap, overflowWrap anywhere), petit trait turquoise sous
    l'icône, libellé ivoire — mêmes icônes, textes, destinations ;
  · « Résultats » (go: null depuis toujours) défile désormais jusqu'au début
    du « Le fil » : nouvelle ref refFil (déclarée avec les deux autres, en tête
    du composant), posée sur le conteneur du titre et des filtres ; même
    versSection que Cavaliers / Événements ; ongletFil et les fonctions du fil
    INCHANGÉS ;
  · un petit filet OR sous le sous-titre (seul détail or de l'en-tête).
  Aucun SQL, aucune requête. Build 20260922-357. node --check OK.

· (358) 22/09 — « Ok continue » : REFONTE COMMUNAUTÉ — CLASSEMENT DES CLUBS
  PLUS COMPACT. Lignes du classement (4e → 6e, et son club détaché) :
  hauteur 48 px (padding 10), rang en OR (#D9A85C) au-delà du podium, nom du
  club en ivoire (s'étire, coupé proprement), XP en or champagne avec « XP »
  en petit, filets et bord de la liste en ivoire discret ; « Voir les autres
  clubs » turquoise, zone tactile 44 px. INCHANGÉS : le PODIUM
  (PodiumClubsHype, ajouté à sa demande le 01/09), le calcul
  (classement_ecuries), la liste qui commence au 4e (ses décisions du 13/09),
  son club toujours visible, les clics. Retirer le podium pour gagner de la
  hauteur serait revenir sur une de ses décisions : PROPOSÉ, pas fait.
  Aucun SQL. Build 20260922-358. node --check OK.

· (359) 22/09 — Brief de Chat « 358 — classement des clubs compact » reçu
  (fichier déjà au 358 ; elle : « même si tu as déjà avancé, n'en tiens pas
  compte »), puis SA précision : « le podium, je trouve qu'il est trop gros
  aussi, on pourrait le réduire, au-dessus en dessous par un fond du noir ».
  ÉCART ASSUMÉ AU BRIEF : le brief remplaçait podium + liste par une liste 1→6 ;
  sa demande GARDE le podium, réduit → la liste continue de commencer au 4e
  (ses décisions du 13/09), pas de doublon du top 3.
  ✅ PodiumClubsHype : variante « compact » (Communauté = SEUL appelant,
  vérifié : 1 occurrence) → 70 % de la largeur, centré, fond noir autour ;
  image et ancrages en % intacts ; rendu par défaut inchangé.
  ✅ Lignes (points du brief) : rangs SANS emoji (1er or champagne, 2e argent
  doux, 3e bronze discret, autres ivoire adouci), nom ivoire en flex 1 coupé
  proprement, XP en or à droite, CHEVRON turquoise « › » sur chaque ligne
  ouvrable, repère « · Votre club » turquoise sous le nom de son club (ligne
  existante ou ligne détachée, jamais dupliquée) ; bouton « Voir les autres
  clubs » : doublon minHeight du 358 corrigé (44 px). Données (classementClubs
  / classement_ecuries), voirTousClubs, clics (__guildeEcurie → guilde) :
  INCHANGÉS. Aucun SQL, aucune requête. Build 20260922-359. node --check OK.

· (360) 22/09 — « OK continue » : REFONTE COMMUNAUTÉ — LES DEUX RAILS HUMAINS.
  « Personnes suivies » (EcranCommunaute) : data-hscroll AJOUTÉ (défaut relevé
  à l'audit : le geste horizontal pouvait changer d'onglet), écart 18 px,
  arrêt doux carte par carte, anneau des portraits affiné (1,5 px, dégradé
  turquoise → or) au lieu du gros anneau turquoise, prénom en ivoire.
  « Nouveaux cavaliers » (NouveauxCavaliers, SEUL appelant : Communauté) :
  cartes plus sobres (bord ivoire discret, ombre, rayon 20), arrêt carte par
  carte, nom en ivoire, bouton « Suivre » turquoise gardé avec zone tactile
  40 px ; data-hscroll déjà présent. Les deux sections restent SÉPARÉES ;
  données (listerCavaliers / derniersCavaliers), clics, « Voir tout »,
  Suivre / Suivi : INCHANGÉS. Aucun SQL. Build 20260922-360. node --check OK.

· (361) 22/09 — « Ok, continue » : REFONTE COMMUNAUTÉ — « LE FIL » ET LES
  TITRES. titreSec (propre à EcranCommunaute) : titres de section en IVOIRE
  suivis d'un filet OR qui s'efface (vaut pour L'Agenda, Carte des clubs,
  Classement, Personnes suivies, Le fil). Filtres du fil (Tous / Amis /
  Écurie) : actif = trait et texte turquoise sur fond à peine teinté, les
  autres en ivoire adouci ; zone tactile 40 px ; passage à la ligne permis.
  Contenu du fil (afficherFil, fil / filAmis / filEcurie, ongletFil) :
  INCHANGÉ. Aucun SQL. Build 20260922-361. node --check OK.
  Elle ajoute : « il manque encore plein de choses sur la page cavalier » —
  précision demandée (liste ou capture).

· (362) 22/09 — SES DÉCISIONS sur les cartes de la page Communauté :
  1) la CARTE DE FRANCE (iframe FRANCE_MAP_HTML) EST GARDÉE, telle quelle :
     « elle a son utilité quand les cavaliers vont dire où ils sont en
     concours » — IDÉE NOTÉE (rien codé) : un « PASSEPORT » des chevaux et des
     cavalières montrant sur cette carte où ils sont allés en concours ;
  2) un seul chemin vers le globe : « un seul en tête, avec écrit le monde
     Hype » ; « Monde, peut-être ». → l'accès « Clubs » de l'en-tête devient
     « Monde Hype » (même icône 🌐, même écran « monde », 6 langues) ; le GROS
     BOUTON « Le Monde Au Galop » (150 px) est RETIRÉ de la page.
  Aucun SQL. Build 20260922-362. node --check OK.
  RESTE sur cette page : le Journal des clubs (reporté, sauf avis contraire).

────────────────────────────────────────────────────────────
125. 22/09 (363) — « LE JOURNAL DES CLUBS » SUR LA PAGE COMMUNAUTÉ
────────────────────────────────────────────────────────────

Proposition faite (contenu, règles, place, une lecture de plus), « Ok
continue ». ✅ Nouveau composant AUTONOME JournalDesClubs (ses propres états,
aucun hook ajouté à EcranCommunaute), posé sous L'Agenda :
· UNE lecture : commentaires des cibles « ecurie: » et « club: » avec
  photo_url non vide, 80 plus récents ; écartés : privés (prive), fils perso
  (cible dont la clé est un identifiant), publications sans image fixe
  (vidéo seule) ; 8 cartes au plus, 2 par club au plus ;
· carte (rail 72 %, scroll-snap, data-hscroll) : photo (vignetteHype,
  cadrage 50 % 30 %), nom du club en or champagne (tiré de la cible, mots
  capitalisés), date, deux lignes de texte en ivoire ; toucher → le fil de
  l'écurie (actualites-ecurie, __filEcurieCible / __filEcurieNom) ou la page
  du club (__guildeEcurie + guilde) ;
· rien d'inventé : sans publication, rien ne s'affiche.
⚠️ Le nom du club vient de la CLÉ de la cible (minuscules, accents perdus :
« ecurie feinn » → « Ecurie Feinn ») ; un nom accentué s'affichera sans ses
accents — à affiner si ça gêne.
Rendu hors ligne OK ; node --check OK. Build 20260922-363.

· (364) 22/09 — « Continue » : Journal des clubs — le VRAI NOM DU CLUB, avec
  ses accents. Relu dans les écuries (ecurie / ecurie2) des AUTRICES des
  cartes (une petite lecture profiles), celle dont la clé (clefClubG)
  correspond à la cible ; à défaut, le nom tiré de la clé comme avant.
  Aucun SQL. Build 20260922-364. node --check OK ; rendu hors ligne OK.

· (365) 22/09 — Sa capture (13 h 24, page d'une cavalière en VISITE) : 4 tuiles
  sur une grille de 3 colonnes → « Actualité » seule sur sa ligne. Grille
  adaptée : 4 tuiles → 2 × 2 ; 6 tuiles (sa propre page) → 3 × 2 comme avant
  (colonnes minmax(0, 1fr)). Build 20260922-365. node --check OK.

· (366) 22/09 — SES MOTS : « on avait dit qu'on laissait la photo de
  l'Écurie sur la page dans l'encart de l'écurie » ; tuiles : « pas dans les
  tuiles, on les laisse telles quelles pour l'instant » (proposition de
  photos dans 2 tuiles REFUSÉE). ✅ Nouveau composant FondBanniereClub : la
  BANNIÈRE DU CLUB (tableaux_clubs, clé « club-banniere:<clefClubG> », même
  source que le podium) en FOND de la carte « Mon club » et de la carte de la
  deuxième écurie (page Cavalier), derrière le texte (carte « isolate »,
  z-index -1), voile sombre dégradé pour la lisibilité ; sans bannière, la
  carte reste comme avant. Une lecture par carte. Aucun SQL.
  Build 20260922-366. node --check OK.

· 22/09, 13 h 30 — ÉCRAN BLANC au lancement, capture avec UNE barre de réseau
  (quatre à 13 h 24). Vérification du code des derniers builds : aucune faute
  d'écriture (mêmes « erreurs » de découpage qu'aux builds 345 / 352, fausses
  alertes dues aux <script> contenus dans des chaînes). Fichier de retour au
  364 préparé par précaution. RÉSULTAT : « c'est revenu sans push » → c'était
  le RÉSEAU (les outils chargés au démarrage n'arrivaient pas). Retour au 364
  ANNULÉ, rien poussé ; le 366 reste en place. LEÇON utile : un écran blanc
  sur réseau faible n'est pas forcément un bug — vérifier le réseau d'abord.

· (367) 22/09 — Elle : « 4 tuiles au lieu de 6 ? et pas avec le bon design »
  (son téléphone était encore au 364 : push du 365 / 366 bloqué par un réseau
  faible). Deux corrections :
  1) SA PROPRE PAGE OUVERTE « EN VISITE » (depuis la liste des cavaliers du
     club → __cavalierOuvert « __public ») : c'est quand même SA page → les 6
     tuiles (pageAMoi = pas en visite OU id visité = moiIdAlb) ;
  2) les tuiles reprennent TRAIT POUR TRAIT le dessin de carteR (fiche
     cheval) : pastille à bord teinte 0,7 avec halo, fond de pastille plus
     sombre, voile dégradé sur la carte, teinte de l'appli
     (teinteHypeActive / teinteRGBA) au lieu d'un turquoise figé — sans photo
     (sa décision).
  Build 20260922-367 (contient 365 et 366). node --check OK.

· (368) 22/09 — SA DÉCISION : « la page Communauté, ça va pas visuellement ;
  mets son accès en prochainement pour l'instant, le temps qu'on la refasse ;
  tu me gardes uniquement l'accès à moi ». NavBar : l'onglet « Communauté »
  reste VISIBLE mais grisé (opacité 0,45) ; un toucher affiche une bulle
  « Prochainement » (6 langues, 2,2 s) au lieu d'ouvrir la page. SEUL son
  compte (estCompteFeinnHype = feinn@live.fr, relu par utilisateurActuel)
  l'ouvre normalement. NON coupés (dit) : les autres chemins vers l'écran
  « communaute » (liens de story « #s= », notifications) — une story partagée
  doit continuer de s'ouvrir. La refonte (354-364) reste en place, à revoir
  avec elle. Build 20260922-368. node --check OK.
  (À la livraison du 368, le 367 n'était pas confirmé en ligne ; le 368 le
  contient.)

· (369) 22/09 — SA DÉCISION (capture de la page d'Evan, 4 tuiles) : « laisse
  les visibles et tu mets le petit cadenas privé » (option recommandée contre
  « 4 sur une même ligne », trop étroit sur iPhone), « ok fais ça ».
  EcranMonCavalier : EN VISITE, les 6 tuiles restent affichées (3 × 2) ;
  Progression et Théorie sont grisées (comme une tuile sans page), pied
  « 🔒 Privé » (6 langues) en gris clair, SANS clic. Sur sa propre page (y
  compris ouverte depuis le club) : inchangé, les 6 s'ouvrent.
  + « SON CLUB » au lieu de « MON CLUB » sur la carte d'écurie quand on visite
  la page de quelqu'un d'autre (6 langues).
  Build 20260922-369. node --check OK.

· (370) 22/09 — Sa capture de 17 h 56 (encore au 368 : 4 tuiles en 2 × 2,
  « Mon club ») : « aère un peu avec le haut de l'encart suivant, diminue un
  peu la taille des cases, et reprends le design et la taille qu'elles ont
  sur les autres pages ». La TAILLE vient avec le 369 : 6 tuiles en 3
  colonnes, exactement la grille et la hauteur (104 px) des tuiles de la
  fiche cheval et du club ; les grosses cases 2 × 2 disparaissent. AJOUTÉ au
  370 : espace entre les tuiles et la carte de l'écurie 22 → 34 px.
  Build 20260922-370 (contient 369). node --check OK.

· (371) 22/09 — Sa capture (album auto « Autres moments » d'Evan : cavalier
  sans tête, cheval coupé) : « assure-toi au moins qu'on voit l'image et
  qu'elle ne coupe pas le cheval et le cavalier en deux ; s'il faut, quand il
  y a un seul album, fais-le plus petit, centré, mais sois sûre que les photos
  ne soient pas abîmées ». AlbumsCheval (page Cavalier ET fiche cheval, même
  composant) : UN SEUL ALBUM → carte à 76 % de la largeur, CENTRÉE,
  couverture carrée avec la photo EN ENTIER (object-fit contain) sur fond
  sombre — aucun recadrage, AUCUN filtre (règle des photos de chevaux).
  Deux albums et plus : recadrage gardé, mais remonté (object-position
  50 % 28 %) pour épargner les têtes. Remplace le « bandeau pleine largeur
  1,55:1 » décidé le 05-06/09. Build 20260922-371. node --check OK.

· (372) 22/09 — Sa capture : sur l'album « Autres moments » d'Evan, toucher
  « Couv. » → « Action refusée : cet album n'appartient pas à la fiche
  affichée ». CAUSE : « Autres moments » est un album AUTOMATIQUE (__auto :
  les photos où la personne est identifiée, sans ligne en base) ; le bouton
  « Couv. » s'affichait sur TOUTES les vignettes de l'album ouvert, sans
  condition, et la garde albumAutorise refusait ensuite (à juste titre). Le
  bouton n'apparaît plus que sur un album qu'on peut GÉRER : ni automatique,
  ni en lecture seule, et à soi (ou modératrice, comme la base).
  La couverture d'« Autres moments » reste la première photo (non choisie).
  Build 20260922-372 (contient 371). node --check OK.

────────────────────────────────────────────────────────────
126. 22/09 (373) — REDESIGN COMPLET DE LA PAGE COMMUNAUTÉ (HORS FIL), BRIEF DE CHAT
────────────────────────────────────────────────────────────

Build trouvé : 20260922-372 ; livré : 20260922-373. Page toujours « Prochainement »
pour tous sauf elle (368). Le FIL est STRICTEMENT inchangé (afficherFil, fil,
filAmis, filEcurie, ongletFil, refFil, accès Résultats).
Composants modifiés : EcranCommunaute, JournalDesClubs, NouveauxCavaliers
(ces deux derniers n'ont que Communauté comme appelant).
· EN-TÊTE : cause du grand vide = bande de 60 px AU-DESSUS de COMM_HERO + image
  en hauteur NATURELLE avant les accès. Bande retirée ; COMM_HERO dans un cadre
  de (encoche + 136 px), object-fit cover (jamais déformée), cadrage 30 %,
  dégradé vers le fond ; accès à ~20 px du sous-titre ; accès et actions
  inchangés.
· STORIES : hype-stories.js (non fourni) n'offre que « libre » et
  « libre-carte » → pas de variante compacte réutilisable, module non
  modifiable sans son fichier. SOLUTION D'ATTENTE : zoom CSS 0,8 sur le seul
  conteneur de Communauté (réduit aussi la place occupée ; les autres pages
  inchangées). Bandes grises (sa décision du 01/09) gardées. Variante propre =
  dans hype-stories.js, à faire avec le fichier.
· RETIRÉS DU RENDU (fonctions GARDÉES dans le fichier) : CarteEvenementsC
  (doublon des 4 événements de L'Agenda) ; PodiumClubsHype (grand bloc noir).
  (« Le Monde Au Galop » était déjà retiré au 362.)
· MON CLUB : carte 96 px mini, rayon 18, fond #0B0E12, bord ivoire discret,
  pictogramme turquoise dans un carré de 48 px, flèche turquoise ; clic
  inchangé.
· L'AGENDA : refEvenements posé sur le CONTENEUR DU TITRE (plus sur le rail à
  marge négative) ; cartes 82 %, 168 px, rayon 18 ; mêmes 4 événements, états,
  clics, data-hscroll ; EVENEMENTS rendu UNE seule fois.
· JOURNAL DES CLUBS : grandes cartes 86 %, 180 px, photo pleine carte, dégradé
  seulement derrière le texte (club en petites capitales or, date, 2 lignes) ;
  même source et même lecture qu'au 363 ; jamais d'EVENEMENTS ; masqué sans
  publication. Pas de likes / commentaires (non chargés ici).
· CARTE DES CLUBS : 200 px, même FRANCE_MAP_HTML, iframe NON manipulable dans
  la page (pointer-events none), « Ouvrir la carte » turquoise ; toucher →
  même carte interactive dans un calque plein écran (hypePortailBody,
  data-noswipe, zIndex 9985, croix 44 px, safe areas) ; carte ouverte = la
  petite iframe est retirée (jamais deux iframes) ; nouvel état carteGrande
  déclaré avec les refs, avant tout rendu.
· CLASSEMENT : un seul titre (repère refClassement posé dessus) ; liste
  compacte DU 1er AU 6e (DEBUT 0), son club à sa vraie place s'il est plus
  loin, jamais dupliqué ; données, voirTousClubs, clics inchangés.
  ⚠️ Revient sur « la liste démarre au 4e » (13/09) : logique, le podium
  n'est plus affiché.
· PERSONNES SUIVIES : cartes 88 px, portraits 68 px, écurie sur une ligne en
  gris si elle existe. Limite des 30 de listerCavaliers NON corrigée (brief).
· NOUVEAUX CAVALIERS : cartes à 46 % (max 200 px), rayon 18, bouton Suivre
  44 px ; données et gestes inchangés.
Aucune requête ajoutée, aucun SQL, aucune route. node --check OK ; rendu hors
ligne du Journal OK ; vérifications : CarteEvenementsC appelé 0 fois,
PodiumClubsHype rendu 0 fois, 1 titre « Classement des clubs », 5 rails
data-hscroll, bouton Monde Au Galop absent.

· (374) 22/09 — « Fais » (+ hype-stories.js fourni).
  PAGE CAVALIER EN VISITE (points 1 à 6 proposés) : récit vide → « <Prénom>
  n'a pas encore partagé son histoire. » sans bouton « Lire la suite » ;
  « Ses amis » ; Hype Memories « Son récit, ses albums, ses conseils
  épinglés » ; « Son apprentissage » ; carte Hey Baby (son coach à elle)
  CACHÉE ; « cavaliers dans sa team ». Sa propre page : inchangée.
  Point 7 (le champ « Partage un moment… » sur la page de quelqu'un
  d'autre) : NON TRANCHÉ, rien changé.
  STORIES SUR COMMUNAUTÉ : hype-stories.js LU (450 Ko, version 20bx) — il
  possède DÉJÀ une variante sans croissant, forme « carte » (vignettes
  arrondies, liseré teinté fin si non vue, prénom dessous) qui accepte
  carteL / carteH. Communauté l'utilise en 82 × 108 (≈ 4 visibles) ; le zoom
  provisoire du 373 est retiré. Le module N'EST PAS modifié (inutile) ; les
  autres pages gardent « libre ».
  Build 20260922-374. node --check OK.

· (375) 22/09 — Elle : « la taille des stories, j'aimais mieux avant ». Page
  Communauté : RETOUR à l'affichage d'avant la refonte (BandeauStories forme
  « libre-carte », taille d'origine, padding 10) ; les petites vignettes
  « carte » 82 × 108 du 374 sont abandonnées. (Le brief de Chat les trouvait
  trop imposantes : c'est SA préférence qui compte.) Question laissée en
  attente sur la page Cavalier : publier chez une autre cavalière — « on voit
  ça après, j'y réfléchis ». Build 20260922-375. node --check OK.

· (376) 22/09 — Elle : « ma barre du bas rebloque au milieu de la page » ;
  capture reçue = CAPTURE « PAGE ENTIÈRE » de Communauté (la barre y est en
  bas, donc le défaut n'y est pas visible) → cause NON établie, capture
  normale + geste + INDEX redemandés. La capture montre en revanche :
  (a) cartes de L'Agenda NOIRES : l'image y était un fond CSS
  « url(<image embarquée>) » sans guillemets → passée en vraie <img>
  (comme le Journal, qui s'affichait) ; (b) « Personnes suivies » : écurie
  écrite DEUX fois (ma ligne du 373 doublonnait une ligne existante) →
  retirée ; (c) Journal : dégradé trop opaque (photo visible sur un tiers)
  → allégé. (La carte des clubs apparaît noire : l'iframe n'est pas
  capturée par la « page entière » d'iOS, à vérifier à l'écran.)
  Build 20260922-376 (contient 375). node --check OK.

· (377) 22/09 — Ses deux demandes : « ça ne sert à rien de réduire la France
  autant dans son encart : garde l'encart comme ça mais augmente la taille de
  la France dedans » → l'encart garde ses 200 px, la carte est dessinée dans
  une fenêtre de 360 px centrée verticalement (haut et bas rognés) : la France
  occupe bien plus de place, sans déformation ; « réduis la taille du fil,
  même la police d'écriture » → cartes du fil 96 → 78 px, vignette 108 → 84,
  rayon 14, titre 13,5 → 12, détail 11,5 → 10,5, auteur 10,5 → 9,5, compteurs
  11,5 → 10,5, pictogramme 26 → 22, écart entre cartes 10 → 8. Contenu,
  filtres, likes, « Voir la suite » : INCHANGÉS. Build 20260922-377.
  node --check OK.

· (378) 22/09 — « Laisse seulement les 3 premiers clubs dans le classement » :
  liste par défaut = 1er au 3e (LIMITE 6 → 3) ; les autres restent accessibles
  par « Voir les autres clubs » (dépliage sur place, inchangé) ; son club garde
  sa ligne détachée à sa vraie place s'il est au-delà du 3e, jamais dupliqué.
  Build 20260922-378 (contient 377). node --check OK.

· (379) 22/09 — Ses trois demandes : (a) « la carte déborde un peu en bas » →
  fenêtre de dessin 360 → 300 px (l'encart garde ses 200 px) ; (b) « au lieu de
  mettre une coupe, mets l'icône des chevaux ou des cavaliers concernés à
  gauche » → la case de gauche affiche la photo du post si elle existe, sinon
  la PHOTO DE PROFIL de la personne concernée (déjà chargée avec le post), avec
  le petit pictogramme en médaillon ; à défaut, le pictogramme seul.
  ⚠️ Les photos des CHEVAUX ne sont pas chargées par ce fil : les afficher
  demanderait une lecture de plus (proposé, non fait) ; (c) « diminue encore le
  fil et son écriture » → cartes 78 → 66 px, vignette 84 → 68, rayon 12, titre
  12 → 11, détail 10,5 → 9,5, auteur 9,5 → 9, compteurs 10,5 → 10, pastille
  d'avatar 18 → 16. Contenu et gestes inchangés. Build 20260922-379.
  node --check OK.

· (380) 22/09 — « On ne voit plus le bas de l'image de la communauté
  équestre, c'est dommage, rallonge un peu » : bandeau de l'en-tête 136 →
  186 px et cadrage descendu (center 45 %) → le bas du globe réapparaît, sans
  revenir au grand vide d'avant le 373. Build 20260922-380 (contient 379).
  node --check OK.

· (381) 22/09 — « Oui, chevaux, ça serait mieux » : les cartes de palmarès du
  fil affichent à gauche la TÊTE DU CHEVAL concerné (le plus récent quand la
  carte en regroupe plusieurs). cartesDImport lit désormais photo_url avec le
  nom (même requête, une colonne de plus, aucune lecture ajoutée) ; la photo
  est portée par chaque cheval de la carte et par la carte (chevalPhoto).
  Ordre dans la case de gauche : photo du post → tête du cheval → photo de
  profil → pictogramme. Build 20260922-381. node --check OK.

· (382) 22/09 — « Les bandeaux des nouveaux cavaliers, on peut les réduire un
  peu » : visuel de la carte 128 → 96 px, coins 18/14, pastille « NOUVEAU »
  remontée (top 115 → 83), prénom 13,5 → 12,5, marges réduites. Données,
  clics, bouton Suivre : inchangés. Build 20260922-382. node --check OK.

· (383) 22/09 — « Remonte un peu la carte dans son onglet » → la fenêtre de
  dessin de la France est décalée vers le haut (translateY −50 % → −56 %),
  l'encart garde ses 200 px. « Fais les onglets de nouveaux cavaliers moins
  larges » → cartes 46 % → 37 % (max 158 px) : environ deux et demie
  visibles. Build 20260922-383. node --check OK.

────────────────────────────────────────────────────────────
127. 22/09 (384) — LA BASCULE ENTRE DEUX ÉCURIES MÉLANGEAIT LES FILS
────────────────────────────────────────────────────────────

Ses captures de 20 h 36 : sur la page du club basculée sur « Societe
d'Equitation de Paris (SEP) » (en-tête, lieu et 21 membres corrects),
« Actualités de l'écurie » affichait les publications d'ECURIE FEINN.
CAUSE : MurHype conserve sa cible dans un ÉTAT initialisé UNE SEULE FOIS
(cibleInitiale) et sa lecture ne tourne qu'au montage (dépendances vides).
Changer d'écurie changeait la prop `cible`, jamais l'état : le mur restait
sur la première écurie.
✅ CORRECTIF (384), limité à la page du club, SANS toucher MurHype qui sert
partout : une `key` liée à la cible (« mur-<clé> ») → React remonte le mur au
changement d'écurie, il relit donc la bonne cible.
⚠️ MÊME DÉFAUT POSSIBLE ailleurs si une page change la cible sans remonter le
composant — page Actualités de l'écurie à vérifier.
ET ÇA EXPLIQUE SA QUESTION PRÉCÉDENTE sur le Journal des clubs (« que des
publications de Feinn, aucune de la SEP ») : les publications qu'elle croyait
postées sur la SEP étaient en fait sur le mur de Feinn. La requête de
vérification des cibles reste utile pour confirmer.
Build 20260922-384. node --check OK.

· (385) 22/09 — Ses deux VIDÉOS de 20 h 47 : (1) arrivée sur la page, attente,
  bascule vers la SEP → tout juste (en-tête, cavaliers, chevaux, résultats,
  fil vide) ; (2) retour de Communauté (page remontée sur Feinn), bascule
  IMMÉDIATE vers la SEP → en-tête et cavaliers SEP, mais CHEVAUX et RÉSULTATS
  de Feinn. CAUSE : le grand chargement du club (EcranGuilde, effet [monClub],
  ~20 000 caractères, plusieurs lectures) NE S'ANNULAIT PAS au changement de
  club : celui de Feinn, parti le premier, finissait APRÈS celui de la SEP et
  écrasait ses chevaux et ses résultats (course entre deux chargements).
  CORRECTIF : jeton par chargement (jetonClubRef) ; dans l'effet, les 7
  setters (chevaux, rail, liens, membres, photos, rail club, résultats) sont
  gardés : un chargement dépassé par un plus récent ne pose plus rien.
  Le 384 (key du mur) reste nécessaire pour le fil.
  Build 20260922-385. node --check OK.
  (Note : « ça m'avait remis à l'autre écurie » en revenant de Communauté est
  normal — la page repart de l'écurie principale ; à discuter si elle veut
  que la bascule soit mémorisée.)

────────────────────────────────────────────────────────────
128. 23/09 (386 + 387) — HEY BABY EN PANNE DEPUIS 2HYPE.FR ; LE DIAGNOSTIC
     À L'ÉCRAN ; LE RELAIS V5 ENFIN EN LIGNE
────────────────────────────────────────────────────────────

SYMPTÔME (captures du 23/09) : Hey Baby répond « Petit souci de connexion »
à tout, photo ou texte.

· (386) DIAGNOSTIC À L'ÉCRAN — décision « fais parler l'appli ». Fonction
  diagHB(etape, detail) dans EcranAssistantIA / envoyer : sous « Petit souci
  de connexion », une ligne « ⚙️ Diagnostic (visible par toi seule) » (étape,
  code HTTP, réponse du relais, durée). Quatre appels : échec de l'étape
  observation photo, erreur structurée, flux vide, erreur générale. RÉSERVÉ
  à estCompteFeinnHype (feinn@live.fr), session lue en local (getSession).
  Les cavalières ne voient rien. POUR LE RETIRER : diagHB = fonction vide.

· (387) LA CAUSE, PROUVÉE par deux essais « Bonjour » en conversation neuve,
  sans photo : 2hype.netlify.app → réponse ; 2hype.fr → « Load failed » en
  1 s. L'index appelait le relais en dur sur https://2hype.netlify.app/…
  (5 endroits) : depuis 2hype.fr, l'appel d'un site vers l'autre était
  bloqué AVANT le relais (le CORS « * » du relais ne suffisait pas — ma
  conclusion inverse du 386 était fausse). CORRECTIF : adresse RELATIVE
  /.netlify/functions/assistant (window.HYPE_API reste prioritaire).
  Conséquence : une copie de l'index ouverte hors ligne n'a plus Hey Baby.
  LIEN_APP (partage, QR code) NON touché. ✅ Confirmé : Hey Baby répond de
  nouveau depuis 2hype.fr, photos comprises.

· RELAIS — le dépôt portait la VERSION 3 de netlify/functions/assistant.js
  (179 lignes) alors que l'index est écrit pour la VERSION 5 (309 lignes,
  22/07, photo en deux temps « observation » puis « rédaction », erreurs
  détaillées). Blandine : sans doute une erreur de poussée à l'époque.
  Variables Netlify vérifiées sur capture : OPENAI_VISION_MODEL et
  OPENAI_VISION_REASONING existent, OPENAI_VISION_DETAIL n'existe pas
  (défaut « original »). V5 POUSSÉE le 23/09, test photo réussi. Le 25/09
  la v3 a été remise par erreur puis la v5 re-livrée et re-poussée.

DETTE : relais en CORS « * » — un autre site peut s'en servir sur son compte
OpenAI. Non urgent, sur sa décision.
Builds 20260923-386 et -387. node --check OK (18 blocs).

────────────────────────────────────────────────────────────
129. 25/09 (390) — HEY BABY : NOUVELLE GRILLE D'OBSERVATION DES PHOTOS
     (PLAT + SAUT)
────────────────────────────────────────────────────────────

SON CONSTAT : l'analyse photo (v5) est « super courte » et « pas forcément
très bonne » ; elle veut surtout mieux au SAUT et sur la position du
cavalier.
CAUSES LUES DANS LE CODE : (1) la grille d'observation
(HEYBABY_PROMPT_PERCEPTION) ne regardait que 8 points (pied/genou, bassin,
épaules, regard, encolure, antérieurs) ; (2) au saut, UN seul champ libre
pour tout le cavalier ; (3) les consignes de rédaction
(HEYBABY_CONSIGNES_PEDAGOGIE) brident la longueur (une priorité, deux
phrases de réserves, exercice seulement si confiance élevée).
Vérifié sur sa capture de 13 h 16 (avant ce build) : sur une photo où
l'obstacle est visible, l'ancienne grille reconnaissait bien la phase
ascendante et les antérieurs repliés — le défaut est la PAUVRETÉ, pas le
contexte.

PLAN EN TROIS ACTIONS, une à la fois avec test :
· ACTION 1 — FAITE ET POUSSÉE le 25/09 : relais v5, plafond de l'étape
  d'observation 1200 → 3000 jetons (assistant.js ligne 153, raisonnement du
  modèle compris). Aucun effet visible.
· ACTION 2 — CE BUILD (390). Cadre posé par Blandine, grille rédigée par
  ChatGPT en trois allers-retours, relue ici :
  – bloc 0 qualité et exploitabilité de la photo ;
  – PLAT : 14 critères, dont deux à ELLE ajoutés (« ligne de dos bien
    tendue » → ligne_dos_cheval ; « la propulsion » → posterieur_avance
    dans locomotion_phase, position instantanée seulement) ;
  – SAUT : phase (abord → réception) + 8 critères cavalier
    (buste_angle_hanche, bassin_selle, position_mouvement, jambes_saut,
    pieds_talons_saut, mains_bras_saut, renes_saut, regard_saut) + 3 cheval
    (forme_dos_encolure_saut, anterieurs avec avant_bras, posterieurs avec
    symetrie) ; repères de lecture PAR PHASE, jamais un barème ;
  – CONTEXTE ANNONCÉ par la cavalière (« phase ascendante », « c'est au
    saut ») retenu si la photo ne le contredit pas (champ source_contexte),
    jamais preuve d'une position, jamais de confiance gonflée — pour les
    photos de saut dont l'obstacle est hors du cadre ;
  – visibilité par côté, AUCUNE comparaison droite-gauche si un côté est
    caché ; échelle fixe non_perceptible / leger / modere / marque ; AUCUNE
    mesure en cm ni en degrés ; « position observée ≠ fonctionnement » ;
    aucun jugement de présentation ni de qualité du saut ; règle du pied /
    verticale du genou et interdiction oreille-épaule-hanche-talon en
    suspension CONSERVÉES.
  PLACE (ajout de ma part, ChatGPT n'ayant pas répondu sur le budget) : un
  critère non applicable s'écrit {"statut":"non_applicable"} ; au saut, les
  critères plat qui ont leur équivalent saut ne sont pas remplis (seuls
  equilibre_general_couple, attitude_cheval, rectitude_incurvation,
  interaction_cavalier_cheval le sont). Grille remplie ≈ 1 550 jetons au
  plat comme au saut (≈ 2 300 sans ce correctif), sous les 3 000.
  ⚠️ La consigne elle-même passe à ~33 500 caractères : un peu plus de temps
  et de coût par photo. Si la ligne ⚙️ affiche AI_TIMEOUT, c'est là.
  Aucun autre code ne lit ces champs (vérifié).
  ⚠️ Les builds 388 et 389 n'ont JAMAIS été poussés : annulés.
· ACTION 3 — À FAIRE : réécrire la rédaction (HEYBABY_CONSIGNES_PEDAGOGIE).
  Décidé : 6 blocs au plat (Équilibre, Haut du corps, Assiette, Jambes,
  Mains/contact, Cheval) séparant vu / interprétation / conseil ; JUSQU'À
  3 points forts (faits observés) ; 2 priorités ; seuils de confiance
  ≥ 0,70 correction, 0,45-0,69 vérification (vidéo), < 0,45 non exploité ;
  propulsion et présentation seulement comme INDICES. Demande de Blandine
  en plus : PLUSIEURS exercices en fin de réponse, progressifs, adaptés au
  Galop, spécifiques à la phase au saut. Consigne demandée à ChatGPT, en
  attente de sa réponse.
Entre l'action 2 et l'action 3, la rédaction actuelle lit la nouvelle grille :
ça marche, mais le gain complet vient avec l'action 3.
Build 20260925-390. node --check OK (18 blocs) ; gabarit JSON vérifié
(14 critères plat, 12 saut) ; marqueurs inchangés hors ajouts voulus.

· RETOUR ARRIÈRE (25/09, 13 h 29) — le 390 poussé, test photo de saut :
  « ⚙️ photo, étape observation — HTTP 504 — réponse illisible (pas du
  JSON) — après 35 s ». PROUVÉ : Netlify a COUPÉ le relais avant sa
  réponse (un abandon du relais lui-même aurait renvoyé du JSON
  AI_TIMEOUT). Cause : l'étape d'observation est devenue trop longue
  (consigne ~33 500 caractères au lieu de ~5 000, grille plus grosse).
  Toutes les analyses photo étaient donc en panne. Décision « Ok » :
  index 20260923-387 REMIS EN LIGNE à l'identique (ancienne grille ;
  diagnostic ⚙️ et adresse relative conservés). La grille du 390 est
  GARDÉE de côté, à réinstaller quand le temps sera réglé.
  Leviers proposés, non tranchés : A) baisser OPENAI_VISION_REASONING dans
  Netlify (valeur actuelle à relever) ; B) condenser la grille 2 à 3 fois
  sans perdre le fond ; C) faire répondre l'étape d'observation au fil de
  l'eau (streaming : 60 s selon la doc Netlify) — relais + index.
  ⚠️ La doc Netlify annonce 60 s pour une fonction synchrone, mais la
  coupure a eu lieu vers 30 s : la limite réelle de son projet est plus
  basse que la doc — ne pas s'y fier.

· (391) 26/09 — GRILLE CONDENSÉE. Valeurs Netlify relevées sur ses captures :
  OPENAI_VISION_MODEL = gpt-5.6-sol, OPENAI_VISION_REASONING = medium,
  OPENAI_REASONING = medium ; OPENAI_TEXT_MODEL = gpt-5.6-sol (dit par
  elle). Blandine REFUSE de passer la réflexion à « low » (qualité) : levier
  écarté. Décision « Ok » pour la piste B : la grille du 390 réécrite en
  ~17 300 caractères au lieu de ~33 500 — même fond, MÊMES clés JSON
  (comparaison automatique : aucune clé différente), mêmes garde-fous ;
  seules les répétitions sont retirées. Rédaction (étape 2) inchangée.
  Rappel : avec le 387 (ancienne grille ~5 000 caractères), le 25/09 à
  16 h 53, une réponse a AUSSI été coupée pendant la rédaction (« Load
  failed » à 63 s) — cause non identifiée (journal Netlify de la fonction
  assistant nécessaire). Si le 391 est encore coupé à l'observation :
  piste C (observation en streaming, 60 s selon la doc) ; si c'est à la
  rédaction : relever le journal Netlify d'abord.
  Build 20260926-391. node --check OK (18 blocs) ; gabarit JSON vérifié.

· RELAIS (26/09, poussé) — journal Netlify du 26/09 : observation de 32 à
  44 s, une réponse revenue VIDE (0 caractère, plafond 3 000 mangé par la
  réflexion), et le téléphone qui perd la connexion à 24 s pendant que la
  fonction continue. assistant.js modifié (v5, 386 lignes) : perception
  répondue EN FLUX (en-têtes immédiats, espace « signe de vie » toutes les
  5 s, JSON final ; l'index n'a rien à changer), plafond 3 000 → 8 000,
  arrêt propre à 55 s, observation vide signalée comme erreur
  (INVALID_RESPONSE), journal enrichi (fin, jetons de réflexion). Testé ici
  avec un faux OpenAI (réussite, vide, erreur 400).
  RÉSULTAT PROUVÉ (journal 14 h 58) : observation complète en 48 s, 4 532
  caractères, fin « stop », 3 763 jetons dont 2 436 de réflexion (le 8 000
  était nécessaire) — MAIS le téléphone a perdu la réponse à 34 s (HTTP 200
  puis « pas du JSON »). CONCLUSION : son projet Netlify coupe vers 30 s
  MÊME EN FLUX (la doc annonce 60 s : faux chez elle). Avec gpt-5.6-sol en
  medium, une observation ne tient pas dans 30 s.
· OPENAI_VISION_DETAIL = high créée dans Netlify le 26/09 (image envoyée
  moins grande ; essai de gain de temps, sans toucher à la réflexion).
  Résultat à relever. Pour annuler : supprimer la variable (défaut original).
· (392) 26/09 — MAINTENANCE PHOTO, décision « mets un mot pour annoncer en
  maintenance pour les photos ». HEYBABY_PHOTO_MAINTENANCE = true : une
  cavalière qui choisit une photo reçoit « L'analyse de photos est
  momentanément en maintenance… » (7 langues) ; rien n'est envoyé. PHOTOS
  seulement (texte et vidéos inchangés — les vidéos risquent le même délai,
  non testé). Le compte de Blandine (estCompteFeinnHype, session lue en
  local) garde l'analyse pour les essais. Rallumer pour toutes : false.
  PISTE DE FOND PROPOSÉE : faire l'analyse photo dans une fonction Supabase
  (Edge Function, déploiement GitHub Actions déjà en place) dont la limite
  de durée est bien plus longue — à vérifier dans la doc Supabase avant de
  construire. Non commencé.
  Build 20260926-392. node --check OK (18 blocs) ; message relu (7 langues).

────────────────────────────────────────────────────────────
130. 26/09 (393) — ANALYSE PHOTO DÉPLACÉE VERS SUPABASE (« hey-baby-vision »)
────────────────────────────────────────────────────────────

POURQUOI : prouvé par le journal Netlify du 26/09, l'observation d'une photo
prend 32 à 51 s et son projet Netlify coupe la connexion vers 30 s, même en
flux avec signes de vie. Décision de Blandine : passer par Supabase (limite
400 s sur plan payant, 150 s sans aucun envoi — doc Supabase), et mettre
l'OBSERVATION en « high » ; la RÉDACTION reste en « medium » (« 2 ou 3 min
c'est trop »). C'est toujours OpenAI (gpt-5.6-sol) derrière.

⚙️ FONCTION SUPABASE — supabase/functions/hey-baby-vision/index.ts (Deno) :
même contrat que le relais Netlify v5 (perception = JSON final précédé
d'espaces « signe de vie » toutes les 5 s ; standard = texte en flux avec
marqueur d'erreur). Plafonds : 16 000 jetons pour l'observation, 12 000 pour
la rédaction ; arrêt propre à 5 min. « Verify JWT » actif : seul un
utilisateur connecté peut l'appeler. Origines : 2hype.fr, www.2hype.fr,
2hype.netlify.app. Testée hors ligne avec un faux OpenAI (réussite, vide,
erreur 400, flux, CORS).
DÉPLOIEMENT : .github/workflows/deploy-fonctions.yml a une 2e ligne
« supabase functions deploy hey-baby-vision ». Run #12 (lancé à la main) :
étape « deploy hey-baby-vision » VERTE. ⚠️ Modifier le .yml ne relance
PAS le déploiement (filtre sur supabase/functions/**) : lancer à la main,
ou modifier un fichier du dossier de la fonction. Le fichier
supabase/functions/hey-baby-vision/.keep (contenu « ok ») ne sert qu'à ça.
SECRETS SUPABASE (Edge Functions → Secrets), posés le 26/09, vérifiés sur
capture : OPENAI_API_KEY (NOUVELLE clé OpenAI « Hype Supabase », distincte
de celle de Netlify — date d'expiration à relever), OPENAI_VISION_MODEL =
gpt-5.6-sol, OPENAI_VISION_REASONING = high, OPENAI_TEXT_MODEL =
gpt-5.6-sol, OPENAI_REASONING = medium. ⚠️ NE PAS mettre « high » dans
Netlify : le texte y serait coupé à 30 s.

📱 INDEX (393) : HEYBABY_VOIE_SUPABASE = true — pour une PHOTO et sur le
SEUL compte de Blandine (estCompteFeinnHype), les deux étapes partent vers
SUPABASE_URL/functions/v1/hey-baby-vision avec le jeton de session
(apikey = CLE_PUBLISHABLE, comme la fonction Mux) ; l'appli attend jusqu'à
5 min par étape (HEYBABY_TIMEOUT_SUPA_MS) au lieu de 65 s. La ligne ⚙️
indique la voie ([Supabase] / [Netlify]). Les cavalières restent en
maintenance photo (392) ; texte et vidéos inchangés (Netlify).
POUR COUPER : HEYBABY_VOIE_SUPABASE = false.

RÈGLE DE NOMMAGE (pour ne pas se perdre, demandée par Blandine) :
📱 index.html = l'appli, toujours à la RACINE du dépôt ; ⚙️ index.ts = une
fonction Supabase, toujours dans supabase/functions/<nom>/ — Supabase impose
ce nom. Chaque livraison donne le chemin complet.

Build 20260926-393. node --check OK (18 blocs) ; marqueurs inchangés.

· COMPTE OPENAI (26/09, 19 h 14) — le compte OpenAI qui PAIE Hey Baby (celui
  de la clé Netlify, qui a du crédit) s'ouvre avec « CONTINUE WITH APPLE »
  sur platform.openai.com (adresse Apple masquée). Trouvé par Blandine après
  un premier essai raté : la première clé « Hype Supabase » avait été créée
  dans un AUTRE compte, sans crédit ni facturation (« You have not started a
  billing plan yet ») — d'où le 429 « credit_balance_exhausted » du 26/09 à
  18 h 56 (journal Supabase). À faire : créer la clé dans le compte Apple,
  la coller dans le secret Supabase OPENAI_API_KEY, puis supprimer la clé
  inutile de l'autre compte. Secret OPENAI_VISION_REASONING saisi « High »
  (majuscule, vu dans le journal) : à corriger en « high ».
  Ce compte (connexion Apple) : organisation « Hype », projet « Default
  project » ; relevé le 26/09 à 19 h 13 : dépense de septembre 2,98 $ sur un
  plafond mensuel de 100 $, 47 requêtes et ~160 000 jetons sur 7 jours
  (essais photo compris).
· ✅ 26/09, 19 h 51 — ANALYSE PHOTO PAR SUPABASE CONFIRMÉE PAR BLANDINE
  (« c'est bon »). Derniers réglages : nouvelle clé OpenAI créée dans le
  compte Apple (organisation « Hype », 6,56 $ de crédit, recharge auto
  5 $ → 10 $ SANS plafond mensuel — plafond à fixer si elle le souhaite) et
  collée dans OPENAI_API_KEY (empreinte a788…) ; OPENAI_VISION_REASONING et
  OPENAI_REASONING RETAPÉS en minuscules (« High » / « Medium » refusés par
  OpenAI : OPENAI_REASONING_PARAM). Leçon : taper ces valeurs au clavier,
  ne jamais coller (une clé collée par erreur à 17:25 dans le réglage).
  Clés du compte Apple : « Hyp… » active (NETLIFY, ne pas toucher,
  expiration « Ja… » à relever), « Hype » révoquée, « Hype Supabase ».
  RESTE : rouvrir l'analyse photo aux cavalières (HEYBABY_PHOTO_MAINTENANCE
  = false ET voie Supabase pour toutes) ; action 3 (rédaction et exercices) ;
  vidéos toujours via Netlify (même risque de coupure, non testé).

· (394) 26/09 — PREMIÈRE ANALYSE PHOTO VALIDÉE PAR BLANDINE (« le reste de
  l'analyse est ok ») : phase, antérieurs, bassin, angle de hanche, pied /
  genou, ligne coude-main-bouche, exercice justes. SEUL DÉFAUT : « le dos
  paraît neutre » (« ça veut rien dire »). Sa règle : « quand il n'a rien à
  dire, qu'il ne dise rien », et les réserves « X n'est pas lisible ici »
  aussi (« ça sert à rien »). FAIT dans HEYBABY_CONSIGNES_PEDAGOGIE
  (rédaction) : un point indéterminable n'est plus mentionné, sauf s'il est
  exactement ce que le cavalier a demandé (une phrase) ; suppression de la
  consigne « limites de la photo en deux phrases » ; RÈGLE ABSOLUE ajoutée
  : un point sans particularité ou illisible est passé sous silence. La
  grille d'observation n'est PAS touchée (« neutre » y reste une valeur
  possible, mais n'est plus dit au cavalier).
  Idée proposée, non décidée : bouton « Corriger » réservé aux modératrices
  — ses corrections enregistrées en base et ajoutées aux consignes de Hey
  Baby pour toutes (SQL + index), en réponse à « on n'a aucun moyen de le
  faire apprendre par lui-même ? » (le modèle n'apprend pas seul).
  Build 20260926-394. node --check OK (18 blocs) ; marqueurs inchangés.

────────────────────────────────────────────────────────────
131. 26/09 — HEY BABY : LE BOUTON « CORRIGER » (4 étapes)
────────────────────────────────────────────────────────────

SA QUESTION : « on n'a aucun moyen de le faire apprendre par lui-même ? ».
Réponse : le modèle n'apprend rien seul ; ce qui change ses réponses, ce sont
ses consignes. Décision « Ok » : un bouton « Corriger » réservé aux
modératrices, dont les corrections entrent dans les consignes de Hey Baby
pour TOUTES les cavalières. Alternative gardée pour plus tard : une
« bibliothèque » de documents de référence qu'il consulte. Déconseillé :
l'apprentissage automatique sur les conversations des cavalières.
Plan : 1) table ; 2) lecture ; 3) bouton ; 4) page de gestion.

· ÉTAPE 1 — SQL PASSÉ le 26/09 (« Success. No rows returned ») : table
  public.heybaby_corrections (id, created_at, auteur défaut auth.uid(),
  texte 3-500 car., question, reponse_extrait, actif) ; RLS : lecture pour
  authenticated, insert/update/delete via public.hype_est_moderatrice() ;
  anon révoqué.
· ÉTAPE 2 — BUILD 395 : chargerCorrectionsHB() lit les corrections actives
  (40 max) à l'ouverture de Hey Baby ; getSystemPrompt les ajoute en fin de
  consignes (bloc « CORRECTIONS DE LA MONITRICE », 4 000 caractères max) —
  s'applique au texte ET à la rédaction des photos, PAS à l'étape
  d'observation (qui ne regarde que l'image). Règle posée par Blandine :
  ses corrections sont des connaissances, Hey Baby ne les cite jamais mot
  pour mot, il les reformule proprement. Échec de lecture silencieux (Hey
  Baby répond comme avant), noté dans la console.
  Test : une correction insérée à la main par SQL.
· À FAIRE ENSUITE (décidé, « Oui B ») : le CENTRE DE GRAVITÉ du cavalier
  et du cheval comme point d'observation systématique (grille) + sa règle
  d'interprétation (rédaction) : idéalement alignés verticalement ; celui
  du cavalier en avant → surcharge l'avant-main, déséquilibre ; en arrière
  → renvoie le cheval en avant, il aura tendance à se creuser. Repères
  demandés à Blandine (où situer chaque centre sur une photo ; la règle
  vaut-elle aussi au saut ?). Après les étapes 3 et 4.
  Build 20260926-395. node --check OK (18 blocs) ; marqueurs inchangés.
· ÉTAPE 3 — BUILD 396 (« ok vas-y ») : bouton « ✏️ Corriger » (or) à côté
  de « 📌 Épingler » sous chaque réponse de Hey Baby, VISIBLE DES SEULES
  MODÉRATRICES — détection par supa.rpc("hype_est_moderatrice") (la même
  règle que la base), repli sur estCompteFeinnHype. Fenêtre (portail vers
  body, z-index 200) : extrait de la réponse, zone de texte 500 caractères,
  Annuler / Enregistrer ; écriture dans heybaby_corrections (texte, question
  précédente, extrait de réponse) ; erreur affichée en clair si refus ; en
  cas de succès la correction est ajoutée à HB_CORRECTIONS et s'applique dès
  la question suivante. ⚠️ Le test de l'étape 2 (correction d'essai « Bonne
  monte ! » insérée par SQL) n'a PAS été confirmé par Blandine : ce build
  le couvre aussi (écrire une correction, poser une question, voir l'effet).
  À FAIRE : étape 4 (page de gestion : revoir / désactiver / supprimer) ;
  supprimer la correction d'essai si elle a été insérée.
  Build 20260926-396. node --check OK (18 blocs) ; marqueurs inchangés hors
  ajouts voulus.
· 26/09 — Test des étapes 2 et 3 RÉUSSI (« Bonne monte ! » appliqué dès la
  question suivante, puis annulé par une 2e correction). Les deux corrections
  d'essai SUPPRIMÉES par SQL, vérifié par SELECT : il reste UNE vraie
  correction, écrite par Blandine avec le bouton : « Ne parle pas de dos
  neutre ça ne veut rien dire ».
· ÉTAPE 4 — BUILD 397 (« ok vas-y ») : lien « Toutes les corrections → »
  dans la fenêtre Corriger ; la liste (100 max, plus récentes d'abord)
  montre chaque correction, son état (Active / En pause) et sa date, avec
  « Mettre en pause / Réactiver » (colonne actif) et « Supprimer » en deux
  touchers. Après chaque changement, HB_CORRECTIONS est relue (effet
  immédiat). Refus de la base signalé en clair, y compris le cas silencieux
  (aucune ligne touchée = droits refusés). Limite : on y accède depuis le
  bouton Corriger d'une réponse — il faut au moins une réponse à l'écran.
  LE CHANTIER « CORRIGER » EST COMPLET (4 étapes).
  Build 20260926-397. node --check OK (18 blocs) ; marqueurs inchangés.

────────────────────────────────────────────────────────────
132. 26/09 (soir) — ANALYSE PHOTO EN DIFFÉRÉ (3 étapes) ; LIMITE LEVÉE
     POUR LES MODÉRATRICES
────────────────────────────────────────────────────────────

POURQUOI (journal Supabase, 20 h 55) : l'observation en « high » a duré
95 s et s'est terminée normalement côté Supabase, mais le téléphone avait
perdu la connexion à 46 s (sans annulation vue par la fonction : coupure
entre le téléphone et Internet — appli en arrière-plan, réseau). Le 398
(réouverture aux cavalières) n'a PAS été poussé : trop fragile. Décision
« B » : le différé, la solution solide, en gardant le « high ».

· ÉTAPE 1 — SQL PASSÉ (21 h 06) : table public.heybaby_analyses (id,
  user_id, statut en_cours / termine / erreur, resultat, erreur_code,
  erreur_message, created_at, updated_at) ; RLS : chaque utilisatrice ne
  lit QUE ses lignes ; aucune écriture depuis l'appli (insert / update /
  delete révoqués), seule la fonction écrit avec la clé de service.
  À prévoir : nettoyage automatique (ex. lignes de plus de 7 jours).
· ÉTAPE 2 — ⚙️ supabase/functions/hey-baby-vision/index.ts (323 lignes),
  déploiement #14 VERT : mode « differe » pour la perception — vérifie le
  jeton (auth.getUser), crée la ligne, répond aussitôt { ok, differe,
  jobId }, puis travaille en arrière-plan (EdgeRuntime.waitUntil) et écrit
  termine + resultat, ou erreur + code. L'ancien mode reste intact. Testé
  hors ligne (faux Supabase / OpenAI) : réponse en 0,1 s, résultat et
  erreur rangés, jeton inconnu refusé (401).
  ⚠️ INCIDENT 21 h 10 : index.ts poussé À LA PLACE DE index.html → appli
  en panne quelques minutes ; build 397 remis à la racine, fonction remise
  dans son dossier. Règle rappelée : 📱 index.html à la racine, ⚙️ index.ts
  dans supabase/functions/<nom>/.
· ÉTAPE 3 — BUILD 399 (fait à partir du 397, PAS du 398) : sur la voie
  Supabase, l'observation part avec differe: true ; l'appli relit la ligne
  toutes les 3 s jusqu'au résultat (5 min max) ; une lecture ratée
  (arrière-plan, réseau) est refaite au tour suivant. La rédaction reste
  en flux (medium, rapide). Les cavalières RESTENT en maintenance photo
  (voie Supabase = compte de Blandine seulement, comme au 397).
· LIMITE DE QUESTIONS (« Oui ») : Blandine bloquée à 20 questions (plan Duo)
  après les essais. Désormais aucune limite pour les modératrices
  (estModoHB : fonction hype_est_moderatrice, repli compte de Blandine) ;
  cavalières inchangées (gratuit 1, Premium 4, Hype IA 15, Duo 20).
  Build 20260926-399. node --check OK (18 blocs) ; marqueurs inchangés.
· 26/09, 21 h 30 — ✅ DIFFÉRÉ VALIDÉ par Blandine (« ça a marché »). MAIS
  analyse jugée « limite moins bonne » que celle de 19 h 52 : phase lue
  « planer » au lieu de « phase ascendante » (variance d'un essai à l'autre,
  même photo, même réglage) ; conclusion « tu en fais trop » tirée du
  buste et de l'angle de hanche seuls (le piège qu'elle a décrit) ; jambe
  non mentionnée (non observée, ou tue par la règle du 394 — à vérifier) ;
  ton jugé « un peu trop familier ». Leviers : nouvelle grille saut (en
  attente de ses 4 réponses : repère du centre de gravité du cheval,
  plafonds de confiance 0,7 / 0,5, trois indices minimum, centrage et
  épaule-fesses-talon au plat ?) ; ton (vouvoiement ou style sobre,
  possible via Corriger) ; éventuel assouplissement du 394. Reporté par
  Blandine (« ça me fatigue, on verra plus tard »).
· 26/09, 22 h 07 — essai proposé : OPENAI_REASONING = high dans les secrets
  SUPABASE seulement (rédaction des photos ; jamais dans Netlify). Résultat
  non encore relevé. La rédaction n'est pas en différé : rester sur
  l'écran pendant l'essai. Retour : retaper « medium ».
· (400) 26/09 — PAGE CAVALIER : avec DEUX écuries, deux CARRÉS CÔTE À CÔTE
  (grille 2 colonnes, aspect 1:1, nom en 14 px, crayon en haut à droite,
  texte sous le crayon) ; avec UNE écurie, carte pleine largeur et lien
  « + Ajouter une écurie » inchangés (décision du 22/09). Espace au-dessus
  des écuries 34 → 46 px, avant « Mon récit » 22 → 36 px. Clics, crayons
  et éditeurs inchangés.
  Build 20260926-400 (contient 399). node --check OK (18 blocs) ; marqueurs
  inchangés.

· (401) 26/09, 22 h 16 — REPRISE D'UNE ANALYSE PHOTO EN ATTENTE. Capture de
  22 h 13 : trois « Photo envoyée » sans réponse ; SELECT sur
  heybaby_analyses : les trois « termine ». Donc Supabase avait fini, mais
  l'écran Hey Baby avait été quitté (page Cavalier, ou rechargement) : le
  démontage de l'écran coupe la requête, et l'historique ne garde que la
  question. Décision « Oui vas-y » :
  – à la création du job différé, il est NOTÉ sur le téléphone
    (localStorage hype_hb_job_attente : jobId, question, conversationId,
    t0) ;
  – en revenant sur Hey Baby (après le chargement de l'historique, même
    en arrivant d'un cours), l'appli retrouve le job, pose la bulle
    « J'analyse… », relit la ligne toutes les 3 s, puis REFAIT la
    rédaction (medium, en flux) et l'enregistre dans l'historique ;
  – abandon au-delà de 10 min (HEYBABY_REPRISE_MAX_MS) ; job d'une autre
    conversation ignoré ;
  – le job noté est effacé dès que l'analyse a une issue (réponse, erreur,
    stop, délai) SAUF quand on quitte l'écran (marqueur hbUnmount posé au
    démontage) — il reste alors noté pour la prochaine ouverture ;
  – en reprise : pas de nouvelle question comptée, pas de bulle
    utilisateur ajoutée (l'historique la porte), la saisie n'est pas
    vidée ; envoyer(texte, { reprise }) appelée via envoyerRef (dernière
    version) ; la mémoire d'écurie est lue au moment de la rédaction
    (contexteHBRef) pour que la reprise ne parte pas avec une mémoire vide.
  Limite connue : si Supabase a été interrompu et que la ligne reste
  « en_cours », l'appli attend jusqu'à 5 min puis affiche l'erreur.
  Build 20260926-401 (contient 399 + 400). node --check OK (18 blocs) ;
  marqueurs inchangés hors ajouts voulus.

· (402) 26/09, 23 h 10 — CONSEILS HEY BABY : PLUS DE PLACE, PISTE C.
  Sa demande : « la page conseils Hey Baby reste encore trop limitée en
  espace ». Aperçu publié avec l'écran actuel et trois pistes (A : le haut
  se replie au défilement ; B : haut compact en permanence avec bouton
  Filtrer ; C : pas de barre d'onglets sur cette page). Son choix : « Pourquoi
  pas c on peut tester ? ».
  – La barre d'onglets du bas porte désormais la classe hype-barre-onglets.
  – PanneauConseilsHB pose la classe hb-sans-barre sur <body> à l'ouverture
    et la retire à la fermeture (compteur window.__hbSansBarre si deux
    panneaux s'empilent) ; une règle CSS cache la barre tant que la classe
    est là. On sort par la croix.
  – Cale du bas de la liste 104 → 28 px (+ encoche), puisque la barre n'est
    plus là.
  – Vaut pour les TROIS portes du panneau : depuis Théorie & Culture (Mon
    travail), depuis Mon carnet, et le mode « choisir un conseil » d'une
    séance.
  – L'en-tête (photo, citation, HEY BABY, bouton, recherche, filtres) est
    INCHANGÉ. A et B restent possibles plus tard, combinables avec C.
  Retour en arrière : retirer l'effet commenté (402) dans PanneauConseilsHB.
  Build 20260926-402 (contient 399 à 401). node --check OK (18 blocs) ;
  seules modifications : les 4 points ci-dessus + le numéro de build.

  PAGE APPRENTISSAGE — 26/09, 23 h 06 : elle A CHANGÉ D'AVIS depuis le
  16/09 (« ça sert à rien de créer une page d'apprentissage alors qu'on en a
  déjà une ») : elle veut maintenant une VRAIE page Apprentissage, d'où l'on
  va vers Mon carnet et vers Mes conseils Hey Baby. Rien de codé. Questions
  en attente : (1) la page s'ajoute à côté de « Théorie & Culture » ou la
  remplace sur la carte « Mon apprentissage » de la page Cavalier ;
  (2) ce qu'elle entend par « carnet à construire » (Mon carnet existe
  déjà : ce qui manque dedans ?) ; (3) deux grandes portes seulement, ou
  aussi un aperçu (dernier conseil, 3 priorités du moment). Faire un
  APERÇU avant tout code, une fois ses réponses données.

· (403) 26/09, 23 h 45 — PAGE « MON APPRENTISSAGE » (nouvelle, ajoutée).
  Décisions de Blandine : « On ajoute la page » (Théorie & Culture RESTE ;
  on retirera plus tard, sur sa demande, les lignes du carnet qui y sont) ;
  brief détaillé + maquette fournis (fond #080A0B, cartes #121617, bleu
  pétrole #254F60 / #376B7D / #5C8792, bronze #AD8B57, champagne #C5AA78,
  ivoire #F2EDE4 — palette PROPRE à cette page, Hype inchangé ailleurs) ;
  « Théorie des Galops » → l'onglet Galops (« oui c'est ça ») ; photo du haut
  fournie par elle ; carte Hey Baby = la photo du haut des conseils
  (images/FOND_HEYBABY.webp) ; Linguae en version simple (« Ok »).
  – Composant EcranMonApprentissage (juste avant EcranMonCarnet), route
    `apprentissage`, styles dans une seule feuille injectée, classes
    hype-apprentissage-*. Aucun SQL, aucune table, aucune donnée inventée.
  – Entrée : la carte « Mon apprentissage » de la page Cavalier ouvre
    `apprentissage` (avant : `articles`). Le texte de la carte (« Galops,
    articles, mon carnet, mes conseils ») est INCHANGÉ — à revoir sur sa
    décision. Théorie & Culture reste ouverte depuis l'Accueil.
  – L'onglet Cavalier du menu reste allumé sur cette page.
  – Retour ‹ : retourEcran (historique), sinon la page Cavalier.
  – JOURNAL = Mon carnet : seule la DERNIÈRE séance est lue (carnet_seances,
    limit 1, RLS). Aucune → « Aucune séance pour le moment. », sans chevron.
    Sinon ligne « Dernière séance » + chevron (aria-expanded) qui déplie
    date, cheval · discipline, note (4 lignes max). « Noter une séance » =
    window.__carnet { quoi: "nouvelle" } puis `carnet-detail` (comme le
    bouton du carnet). « Voir mon journal » = `carnet`.
  – THÉORIE DES GALOPS = setEcran("galops").
  – LINGUAE : relevé de lingo.html — le carnet est synchronisé dans
    hype_lingua_progression.carnet (une ligne par compte, clé « ville|ref »
    → { v, d, a, t }) ; le carnet ne garde QUE des références, le texte des
    mots vit dans les lexiques hype-lingo-lex-*.js (30+ fichiers). Donc :
    NOMBRE RÉEL de mots affiché (t absent ou "mot", a !== false ; phrases et
    lettres non comptées), 0 → « Aucun mot enregistré », lecture impossible
    → phrase neutre sans chiffre. Les 3 mots en clair ne sont PAS affichés.
    « Voir le carnet » ouvre lingo.html sur son accueil : Linguae n'a pas de
    lien direct vers le carnet (#lecon, #situation, #duel, #sprint
    seulement). En attente, deux étapes séparées : lien #carnet dans
    lingo.html, puis affichage des mots.
  – CONSEILS HEY BABY : PanneauConseilsHB depuis: "apprentissage" ; au
    retour d'un conseil, le panneau se rouvre (window.__rouvrirConseils).
  – Fichier NOUVEAU : images/APPRENTISSAGE_HAUT.webp (1672 × 941, 78 Ko,
    tirée de sa photo) ; si absent, l'en-tête reste sombre, rien ne casse.
  Vérifs : node --check OK (18 blocs), un seul marqueur 20260926-403, aucun
  JSX ; rendu isolé à 320 et 390 px : aucun débordement horizontal.
  Build 20260926-403 (contient 399 à 402). ⚠️ 402 (barre cachée sur les
  conseils) N'ÉTAIT PAS ENCORE TESTÉ quand 403 a été livré.

· (404) 26/09, 23 h 50 — ENTRÉE DE « MON APPRENTISSAGE » CORRIGÉE.
  Au 403 j'avais branché la nouvelle page sur la GRANDE carte « Mon
  apprentissage » de la page Cavalier, qui ouvrait Théorie & Culture.
  Blandine (capture 23 h 47) : « Laisse Théorie et culture avec son onglet
  et relie Mon apprentissage au petit onglet Progression ».
  – La grande carte rouvre `articles` (Théorie & Culture), comme avant le 403.
  – La tuile « PROGRESSION » (grille des 6 tuiles, page Cavalier) ouvre
    `apprentissage` au lieu de `carnet`. En visite chez quelqu'un : tuile
    toujours grisée avec cadenas, sans clic (inchangé).
  – Mon carnet reste ouvert par « Voir mon journal » dans la nouvelle page.
  Build 20260926-404 (contient 399 à 403). node --check OK (18 blocs), un
  seul marqueur. APPRENTISSAGE_HAUT.webp inchangé depuis le 403.

· (405) 26/09, 23 h 55 — LIGNE « THÉORIE & CULTURE » DANS MON APPRENTISSAGE.
  Test du 404 par Blandine (captures 23 h 50) : la page marche, « 15 mots à
  retenir » s'affiche. Sa demande : une ligne Théorie & Culture sous le
  carnet Linguae, « similaire aux deux onglets au-dessus ».
  – Troisième ligne de « Mes outils pour apprendre » : pictogramme page de
    magazine (dessiné, bronze), « Théorie & Culture », « Le Mag de la
    culture équestre. », « Découvrir », chevron ; ouvre `articles`.
    Page Théorie & Culture elle-même INCHANGÉE.
  Build 20260926-405 (contient 399 à 404). node --check OK (18 blocs), un
  seul marqueur ; rendu isolé 320 / 390 px sans débordement.
  EN ATTENTE, validés dans le principe par Blandine, à faire UN PAR UN :
  (2) retirer la grande carte « Mon apprentissage » (→ Théorie & Culture)
  de la page Cavalier — il restera deux grandes cartes (Mes messages, Hey
  Baby) au lieu de trois ; (3) retirer la bannière « Mon écurie » (cheval
  noir, ouvre `guilde`) de la page Cavalier, doublon de la carte « Mon
  club » ; « Mes chevaux » et « Gérer mon écurie › » restent.

· (406) 27/09, 00 h 05 — DEUX RETRAITS, sur « Vas-y » de Blandine.
  1. PAGE CAVALIER : la grande carte « Mon apprentissage » (qui ouvrait
     Théorie & Culture) est RETIRÉE. Restent les deux grandes cartes Mes
     messages et Hey Baby. Théorie & Culture reste ouverte depuis la page
     Mon apprentissage (ligne ajoutée au 405) et depuis l'Accueil.
  2. THÉORIE & CULTURE (EcranArticles) : la section « Mon travail » (menu
     Mon carnet → Mes séances / Mes conseils Hey Baby) est RETIRÉE — ses
     mots : « tu peux retirer les onglets qui emmenaient vers le carnet et
     les conseils Hey Baby depuis la page Culture et Théorie ». La page
     commence donc par « La Théorie des Galops ». L'état mtPan, l'effet
     __rouvrirConseils === "articles" et le rendu du panneau restent dans
     le composant, inertes (aucun nettoyage hors périmètre).
  Carnet et conseils restent atteignables : page Mon apprentissage (tuile
  Progression), et le panneau des conseils depuis Mon carnet.
  Build 20260927-406 (contient 399 à 405). node --check OK (18 blocs), un
  seul marqueur.
  RESTE EN ATTENTE : (3) retirer la bannière « Mon écurie » de la page
  Cavalier (proposée, pas encore validée pour exécution).

────────────────────────────────────────────────────────────
133. 27/09 — JOURNAL DE PROGRESSION (refonte de Mon carnet), ÉTAPES 0 À 3
────────────────────────────────────────────────────────────
DÉCISIONS DE BLANDINE (brief du 27/09, 00 h 13) : la nouvelle page
REMPLACE visuellement Mon carnet (route `carnet`, EcranMonCarnet refondu,
EcranCarnetDetail conservé) ; le bloc des 3 priorités Hey Baby quittera la
page principale (données et liens conservés, conseils liés visibles dans la
fiche) ; AUCUNE durée ; champs theme, lieu, ressenti_cle, a_retenir,
discipline_cle, note gardée ; disciplines plat / dressage / saut /
exterieur / travail_a_pied / autre (« Obstacle » affiché « Saut »), la
colonne `discipline` historique n'est JAMAIS écrasée ; ressenti bonnes /
mitigees / difficile, sans score ; objectif = table carnet_objectifs ;
chevaux = siens + liés + écuries (règle 207) + « cheval sans fiche »
(cheval_id null, nom tapé, aucune fiche créée) ; PHOTOS : les anciennes
restent visibles, les NOUVEAUX envois ne seront pas réactivés dans la
future version tant qu'un stockage privé et le quota ne sont pas définis
(chantier séparé ; ne pas rendre le bucket photos privé).
· ÉTAPE 0 — relevé en lecture seule (catalogues PostgreSQL), résultat
  fourni par Blandine :
  – RLS activée sur carnet_seances, carnet_seance_conseils,
    carnet_conseils_etat ; policies select/insert/update/delete toutes
    « authenticated » et auth.uid() = user_id (insert de carnet_seance_
    conseils : la séance ET l'épingle doivent être à soi). anon : aucun
    privilège sur ces tables.
  – carnet_seances : cheval_id uuid nullable, date_seance NOT NULL, medias
    jsonb NOT NULL défaut [], updated_at NOT NULL SANS trigger (le code
    l'écrit à chaque update — à garder).
  – FK carnet_seance_conseils.seance_id → carnet_seances ON DELETE CASCADE
    (supprimer une séance supprime ses liens). epingle_id = bigint.
  – Index (user_id, date_seance DESC) EXISTE déjà : rien à créer.
  – Bucket photos : lecture publique (2 policies identiques), insert pour
    tout connecté SANS restriction de dossier, AUCUNE policy delete.
· ÉTAPE 1 — SQL PASSÉ (00 h 17, vérifié : 15 colonnes) :
  ALTER TABLE public.carnet_seances ADD COLUMN IF NOT EXISTS theme text,
  lieu text, ressenti_cle text, a_retenir text, discipline_cle text.
  Aucune contrainte CHECK.
· ÉTAPE 2 — SQL PASSÉ (00 h 18) : table public.carnet_objectifs (user_id
  uuid PK → auth.users ON DELETE CASCADE, texte text, updated_at
  timestamptz NOT NULL défaut now()) ; RLS activée ; REVOKE ALL à anon ;
  4 policies authenticated auth.uid() = user_id (select, insert avec
  check, update using + check, delete). Table vide, pas encore utilisée.
· ÉTAPE 3 — BUILD 20260927-407 : EcranCarnetDetail, en ÉDITION seulement,
  quatre champs facultatifs entre « Type de travail » et « Ma note » :
  Thème (120 car.), Lieu (80), Mon ressenti (3 pastilles exclusives,
  retouchables pour vider : bonnes / mitigees / difficile), À retenir
  (300). Enregistrés dans theme, lieu, ressenti_cle, a_retenir (vide →
  null). Rien d'affiché en LECTURE (étape 4). Date, cheval, discipline,
  note, photos, conseils : inchangés. node --check OK (18 blocs), un seul
  marqueur. Contient 399 à 406.
  Test demandé : noter une séance avec les 4 champs, enregistrer, la
  rouvrir en modification → les 4 champs doivent revenir remplis.

· ÉTAPE 3 bis — BUILD 20260927-408 (27/09, 00 h 45) : REFONTE DU FORMULAIRE
  (création / modification, EcranCarnetDetail seul). Brief de Blandine
  (« ça ressemble pas du tout ») : palette du journal, compact, vrais
  défauts iPhone.
  – Ordre : date, cheval, discipline, thème, ressenti, lieu, à retenir,
    note, conseils Hey Baby, anciennes photos, Enregistrer. Une seule
    mention « Seule la date est obligatoire. » au lieu de « facultatif »
    partout. Étiquettes champagne #C5AA78, champs #121617, 16 px (pas de
    zoom iOS), 44-52 px de haut ; pastilles en grille 3 colonnes, sélection
    pétrole #254F60 ; bouton Enregistrer pétrole, texte ivoire.
  – DATE : input en display block, width/maxWidth 100 %, minWidth 0,
    border-box, -webkit-appearance none + règle ::-webkit-date-and-time-
    value (classe hj-date), parent en minWidth 0. Aucun overflow masqué.
  – BARRE D'ONGLETS CACHÉE sur carnet-detail (lecture comme édition) :
    même mécanique que le 402 (classe hb-sans-barre + compteur
    window.__hbSansBarre, règle CSS injectée par l'écran). Sortie par ‹.
    Bas de page : calc(env(safe-area-inset-bottom) + 40px).
  – CHEVAL : une ligne « Choisir un cheval » / nom + chevron → panneau plein
    écran (fond verrouillé), recherche locale sans accents, lignes 50 px :
    « Aucun cheval » (cheval_id et cheval_nom null), « Cheval sans fiche… »
    (champ + Valider → cheval_id null, cheval_nom = nom tapé, AUCUNE fiche
    créée), « Mes chevaux » (mesChevaux + mesChevauxLies, comme avant),
    « Chevaux de mes écuries » (règle 207, même requête que les conseils,
    chargée une fois en édition), dédoublonnage par id. À l'enregistrement,
    cheval_nom vient de la liste ; sinon, si l'id n'a pas changé, l'ancien
    cheval_nom est gardé (corrige la perte du nom pour un cheval d'écurie).
  – DISCIPLINE EN CLÉ FIXE : plat, dressage, saut, exterieur,
    travail_a_pied, autre (+ champ texte si Autre). Écrite (discipline_cle
    + libellé français canonique dans discipline ; Autre → texte tapé)
    SEULEMENT pour une nouvelle séance ou si la discipline a été touchée.
    Ancienne séance : pré-sélection par reconnaissance tolérante des
    anciens libellés des 6 langues (Obstacle/Jumping/Salto/Springen → saut,
    etc.), SANS écriture tant qu'on n'y touche pas. Non reconnus (Théorie,
    « Dressur » allemand ambigu) : affichés « Enregistrée : … », jamais
    migrés en silence.
  – PHOTOS : plus AUCUN bouton d'ajout ni input fichier ; l'envoi
    (envoyerPhotosCarnet / envoyerPhoto) n'est plus appelé nulle part. Les
    anciennes photos restent affichées (retirer une photo de la séance reste
    possible) avec « L'ajout de nouvelles photos est suspendu pour le
    moment. »
  – NOTE : 3 lignes au départ, s'agrandit avec le texte (À retenir aussi).
  – CONSEILS : états, panneau et écritures INCHANGÉS, habit seulement.
  – BROUILLON hype_brouillon_carnet v2 (JSON { v: 2, date, chevalId,
    chevalLibre, discCle, discAutre, theme, lieu, ressenti, aRetenir, note,
    conseils }) ; un ancien brouillon texte est relu comme note ; écrit
    seulement pour une nouvelle séance jamais enregistrée ; effacé à
    l'enregistrement (comme avant) ou quand tout est vide.
  – Hors formulaire, touché volontairement : fond de la page #080A0B,
    « NOUVELLE SÉANCE / MA SÉANCE » en bronze, date en ivoire (visible
    aussi en lecture). La LECTURE n'affiche toujours pas thème / lieu /
    ressenti / à retenir (étape suivante).
  Vérifs : node --check OK (18 blocs), un seul marqueur, aucun JSX, aucune
  requête SQL ajoutée, aucun envoi photo atteignable ; rendu isolé
  (React simulé, données factices) à 320 / 375 / 430 px sans débordement,
  panneau des chevaux, ancienne séance « Théorie » avec photos.
  NON VÉRIFIÉ ICI (test iPhone) : enregistrement réel en base, rendu natif
  de la date iOS, brouillon après fermeture de l'appli.

────────────────────────────────────────────────────────────
134. 27/09 — HYPE EST À 7 LANGUES : L'ARABE MANQUAIT PRESQUE PARTOUT
────────────────────────────────────────────────────────────
Rappel de Blandine (00 h 37 puis 00 h 55) : « n'oublie pas de traduire
toutes les nouvelles pages, onglets, etc. dans toutes les langues à chaque
fois », « normalement on est à 7 langues », « on avait dit qu'à compter de
là on le mettait systématiquement car il va falloir tout traduire ».
RÈGLE DÉSORMAIS : TOUT NOUVEAU TEXTE A SES 7 LANGUES (fr, en, es, it, ja,
de, ar). Les helpers locaux T(fr,en,es,it,ja,de) doivent recevoir un 7e
argument ar (tr() retombe sur fr quand ar manque).
AUDIT DU 27/09 (index 408, lecture seule) :
· LANGUES (ligne ~22162) contient bien « ar ». Mais ~2 820 appels T( et
  ~1 350 objets { fr: … } : UN SEUL contient ar ; les 460 clés I18N non plus.
  Une cavalière en arabe voit Hype presque entièrement EN FRANÇAIS (seuls
  quelques écrans de cours posent dir="rtl").
· ~150 textes FRANÇAIS EN DUR (hors traduction) dans ~50 composants :
  visibles de toutes (EcranChevalCommun : Retour, Communauté, En concours,
  Toutes ses histoires… ; EcranParcours : Ton club, Quel cavalier es-tu ?… ;
  EcranCommunaute : Carte des clubs ; EcranMonCavalier : Modifier mon club,
  Mon Écurie ; Se déconnecter ; Envoyer (messagerie) ; Précédent/Suivant
  (BiomecaInteractif), etc.), écrans réservés à la modératrice
  (AdminAbonnements, AdminUtilisateurs, EcranRattacherFFE, EcranAssistantIA
  corrections, EcranDatesPhotos, EcranScoreVitrine, EcranJournalSession),
  et noms propres à garder (Cadre Noir, écoles, Château de Piber…).
· Non vérifiés : les fichiers séparés (hype-cours-*.js, hype-stories.js,
  hype-import-ffe.js…) — pas fournis.
PLAN PROPOSÉ : A (fait, 409) l'arabe sur les écrans de ce soir ; B les
textes en dur visibles de toutes, écran par écran (question posée : écrans
modératrice traduits ou non ?) ; C l'arabe partout, par grands écrans, avec
le sens droite-gauche, même méthode que l'arabe de Linguae.

· (409) BUILD 20260927-409 — ÉTAPE A : EcranMonApprentissage et
  EcranCarnetDetail passent à 7 langues. T() de ces deux composants
  accepte ar ; 114 textes reçoivent leur arabe (arabe standard moderne,
  sans voyelles, consignes au féminin singulier, comme Linguae) — mois,
  titres, boutons, disciplines, ressentis, panneau des chevaux, erreurs,
  lecture d'une séance. Racines des deux écrans : dir="rtl" et lang quand
  la langue est l'arabe ; chevrons des lignes d'outils et des boutons
  retournés en arabe. Rendu isolé en arabe à 375 px : aucun débordement.
  node --check OK (18 blocs), un seul marqueur. Contient 399 à 408.
  Hors périmètre (reste en 6 langues) : PanneauConseilsHB, VueConseilCarnet,
  EcranMonCarnet et tout le reste de l'appli (étape C).

· (410) 27/09, 01 h 20 — ÉTAPE B : LES TEXTES FRANÇAIS ÉCRITS EN DUR, CÔTÉ
  CAVALIÈRES, PASSENT EN 7 LANGUES (« Ok continue »).
  – Nouveau helper GLOBAL hypeT7(fr, en, es, it, ja, de, ar), posé juste
    avant `const LANGUES` ; il lit window.__hypeLangue, que App écrit à
    chaque rendu juste après `const [langue, setLangue]`. Repli : français.
  – Relevé fait avec un vrai analyseur JavaScript (acorn, /opt/node-tools) :
    tous les textes français hors traduction utilisés comme ENFANT d'un
    élément, comme placeholder / title / aria-label / alt / label, ou dans
    un message (alert, setErr…). 266 trouvés ; 172 occurrences (139 textes
    distincts) traduites ici, chacune remplacée EN PLACE par
    hypeT7("<texte d'origine>", en, es, it, ja, de, ar) — le français est
    gardé à l'identique.
  – Écrans touchés : page commune d'un cheval (EcranChevalCommun,
    PontChevalCommun), accueil et inscription (EcranIntro, EcranOnboarding,
    EcranHypeUniverse, EcranVoyage, EcranProfilSetup, EcranParcours),
    Communauté (titre, Carte des clubs), Univers (Se déconnecter, Mon profil,
    Mon club, Mon Écurie, Ton univers équestre, La Voie de Cristal, Tarif
    Fondateur, Mon compte), page Cavalier (Modifier mon pseudo, Mon écurie),
    Écurie / Écurie Hype, club (EcranGuilde), fiche cheval (origines,
    histoire, Ajouter / Retirer de mes chevaux, photos, messages d'erreur),
    albums, messagerie (Envoyer, Ajouter une photo), cours (Retour,
    Enregistrer, Commencer le cours, La bonne approche / À éviter, Page
    précédente, Précédent / Suivant), visionneuses photo (Fermer, Photo
    agrandie), Le Mag et les écoles (Cadre Noir, École Portugaise, Jerez,
    Vienne, avec leurs noms usuels dans chaque langue), résultats (« autres
    classées »), alertes (2e écurie non enregistrée, bannière, rattachement,
    photo non enregistrée, abonnement).
  – Phrases coupées en morceaux (COMMUNAUTÉ / ÉQUESTRE, CHAQUE CHEVAL /
    RACONTE UNE / HISTOIRE., BON RETOUR, …) : chaque morceau traduit pour
    que la phrase se lise dans l'ordre de chaque langue.
  – NON TRADUITS VOLONTAIREMENT (écrans modératrice, sa réponse attendue) :
    EcranRattacherFFE, EcranAssistantIA (corrections), EcranDatesPhotos,
    AdminAbonnements, AdminUtilisateurs, EcranScoreVitrine,
    EcranJournalSession, test Mux (EcranPremium), « Changer la photo
    (admin) », messages techniques (module non chargé, Memory).
  – LIMITE DU RELEVÉ : un texte rangé dans une variable ou une liste puis
    affiché plus loin n'est pas vu par cette méthode ; il en reste donc
    probablement. Et l'ARABE manque toujours dans les ~2 800 appels T(…)
    existants (étape C).
  node --check OK (18 blocs), un seul marqueur, un seul hypeT7. Build
  20260927-410 (contient 399 à 409).

· (411) 27/09, 01 h 45 — ÉTAPE C, LOT 1 : L'ARABE SUR LES ÉCRANS LES PLUS VUS
  (« Super continue »).
  – Écrans : EcranUnivers (accueil « Ton univers » + helper L5acc),
    EcranDashboard (dictionnaire TXT : objet ar ajouté), EcranMonCavalier,
    EcranEcurie, EcranGuilde (page club), EcranGererEcurie,
    EcranAssistantIA (Hey Baby : messages d'accueil, suggestions, alertes),
    PanneauConseilsHB, VueConseilCarnet, EcranMonCarnet.
  – 388 insertions : 7e argument ar sur les appels T(…) / L5acc(…), clé ar
    sur les objets { fr, en, … }. Les T() locaux de ces 7 composants et
    L5acc acceptent désormais ar.
  – DÉCOUVERTE : 146 appels de ces écrans n'avaient que 5 langues (PAS
    D'ALLEMAND : repli français pour les germanophones). L'allemand a été
    ajouté en même temps que l'arabe sur ces 146 appels.
  – Le menu du bas (I18N) avait déjà ses 7 langues : rien à faire.
  – Les noms d'événements (Open de France, Salon de Bordeaux…) restent
    tels quels. Relevé fait avec acorn (extract.js) : il ne reste, sur ces
    écrans, qu'un appel « relais » T(fr, …) qui n'a pas de texte.
  – PAS ENCORE FAIT : le sens droite-gauche global en arabe (seuls Mon
    apprentissage et le formulaire de séance l'ont) ; les sous-blocs
    appelés par ces pages (EncartCavaliersSpectral, BlocResultatsCavaliere,
    TableauxSpectralHype, ClocheNotifs…) ; et tous les autres écrans
    (EcranCheval 342, AlbumsCheval 233, les écoles ~570, FicheEvenementClub
    122, MurHype 107, EcranSanteCheval 82, EcranCommunaute 77…).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-411
  (contient 399 à 410).

· (412) 27/09, 02 h 10 — ÉTAPE C, LOT 2 : L'ARABE SUR LA FICHE CHEVAL ET SES
  ALBUMS (« Ok continue »).
  – EcranCheval (341 appels + 13 objets, dont COTES_GP : Côté père / mère /
    grands-parents, et l'appel T(__cg.fr, …, __cg.ar)) et AlbumsCheval
    (233 appels + 1 objet) : 587 insertions, 431 textes distincts. Les T()
    locaux des deux composants acceptent ar.
  – AlbumsCheval : 89 appels n'avaient PAS l'allemand (repli français) —
    ajouté en même temps.
  – Phrases avec variables (nombre de photos, noms de chevaux, saison,
    minutes restantes, album d'une autre cavalière…) : traduites en
    gardant les mêmes variables.
  – Relevé acorn après coup : 0 texte sans arabe sur ces deux écrans.
  – Sens droite-gauche toujours pas global.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-412
  (contient 399 à 411).
  RESTE (étape C) : écoles (Cadre Noir 170, Vienne 140, Portugaise 138,
  Jerez 119), FicheEvenementClub 122, MurHype 107, EcranSanteCheval 82,
  EcranCommunaute 77, EcranConnexionSpectral 64, EcranEvenementPasse 64,
  ChronologieSouvenirs 64, EcranMessagerie 52, FeuilleSoin 49,
  AgendaClubHype 47, EcranProfil 43, EcranResultatsCavaliere 40,
  EcranEcurieHype 38, EcranAgendaClub 37, EcranArticles 37, EcranSanteClub
  33, EcranMonCompte 30… et ~1 100 objets « globaux » (cours, données).

· (413) 27/09, 02 h 30 — ÉTAPE C, LOT 3 : COMMUNAUTÉ, MESSAGERIE, CONNEXION,
  MON COMPTE, NOTIFICATIONS (« Top continue »).
  – EcranCommunaute (77 appels + 2 objets ; son T() « lg=== » reçoit une
    branche ar), EcranConnexionSpectral (64 : erreurs, mots de passe,
    « Ouvre ta boîte mail », réinitialisation…), EcranMessagerie (52),
    ClocheNotifs (28), EcranMonCompte (30 objets + dictionnaire DICT : clé
    ar ajoutée), EcranProfil (43 objets). 295 insertions, 258 textes.
  – Allemand manquant ajouté en même temps sur 57 appels (messagerie et
    notifications).
  – Relevé acorn après coup : 0 texte sans arabe sur ces écrans.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-413
  (contient 399 à 412).

· (414) 27/09, 02 h 55 — ÉTAPE C, LOT 4 : MUR, ÉVÉNEMENTS, AGENDA DU CLUB,
  SANTÉ DU CHEVAL (« Oui continue »).
  – MurHype (107), FicheEvenementClub (123 : rendez-vous, ordre de passage,
    document du concours, personnes autorisées, notifications iPhone,
    ajout au calendrier), AgendaClubHype (48), EcranAgendaClub (38, noms
    des jours et des mois en tableaux), EcranEvenementPasse (65 : souvenirs
    d'un rendez-vous, story, couverture, résultats), EcranEvenement (33 :
    Lamotte, présence, fil ; son T() « lg=== » reçoit une branche ar),
    EcranSanteCheval (83), FeuilleSoin (50), EcranSanteClub (34),
    FeuillePro (22). 595 insertions, 435 textes.
  – Allemand manquant ajouté sur 56 appels (mur, agenda).
  – Locale des dates : « fr-FR » → « ar » en arabe ; suffixes ordinaux
    « er / e » → marque invisible (pas de suffixe en arabe).
  – ⚠️ RESTE EN FRANÇAIS EN ARABE : la phrase d'accroche d'un rendez-vous
    (hypePhraseRdv, banque de phrases) — l'appel passe phraseRdv.ar, mais
    la banque n'a pas encore d'arabe (repli français, rien ne casse).
  – Relevé acorn après coup : 0 texte sans arabe sur ces écrans (hors
    appels relais T(fr, …)).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-414
  (contient 399 à 413).

· (415) 27/09, 03 h 05 — SENS DE LECTURE DROITE → GAUCHE POUR TOUTE L'APPLI
  EN ARABE (« Continue »).
  – Dans App, juste après window.__hypeLangue : <html dir="rtl"> quand la
    langue est l'arabe, dir="ltr" sinon (retour explicite), et <html
    lang="…"> à la langue choisie. Écrit seulement si la valeur change.
  – Effets attendus en arabe : textes alignés à droite, rangées (flex)
    inversées, menu du bas dans l'ordre arabe, champs de saisie à droite.
  – NON retourné automatiquement (à corriger écran par écran si gênant) :
    ce qui est placé en position absolue avec left / right (boutons ‹ de
    retour, badges, croix), les chevrons › et flèches →, les dessins SVG,
    et les rails qui défilent de côté (ils peuvent démarrer à droite).
  – Les 6 autres langues ne changent pas.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-415
  (contient 399 à 414).

· (416) 27/09, 03 h 40 — ÉTAPE C, LOT 5 : TOUS LES AUTRES ÉCRANS (« Continue »).
  – 774 insertions, 648 textes, sur ~110 composants : souvenirs et
    chronologie (ChronologieSouvenirs : ranger, tailles, cadenas des années),
    résultats d'une cavalière, Écurie Hype, Le Mag (EcranArticles),
    rattachement FFE côté cavalière (EcranMesResultatsFFE, BlocLicenceFFE),
    examen blanc, quiz, jeux (Mémory du poney, Vrai/Faux, puzzle, quiz
    éclair, remettre dans l'ordre, plan de reprise), chemin Baby, reprises
    de dressage (tracé animé), bibliothèque des Galops, parrainage, quêtes,
    Premium, création d'un cheval, invitations, nouveaux cavaliers,
    partager / installer l'appli (dictionnaires entiers : objet ar ajouté),
    profil (PT : objectifs d'inscription), temps relatif (« il y a… »).
  – Allemand manquant ajouté sur 100 appels.
  – TOUS les helpers T() restants de l'index (38) acceptent désormais ar
    (tr ou trEc) : plus aucun écran ne « perd » l'arabe à cause du helper.
  – Images par langue (frImg, frInfo, infographie vermifuge) : en arabe,
    l'image française est reprise.
  – Relevé acorn après coup — RESTE sans arabe : les 4 écoles (EcranCadreNoir
    171, EcranEcoleVienne 141, EcranEcolePortugaise 139, EcranEcoleJerez
    120), ~760 objets « globaux » (données : cours, articles, listes),
    EcranAdmin (3, modératrice) et getSystemPrompt (3, consignes de l'IA —
    volontairement non traduites).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-416
  (contient 399 à 415).

· (417) 27/09, 03 h 50 — DRAPEAUX DE L'ALLEMAND ET DE L'ARABE DANS LE CHOIX
  DES LANGUES. Capture de Blandine (01 h 39) : le menu des drapeaux de
  l'Accueil (EcranUnivers) ne proposait que fr, en, es, it, ja — ni
  l'allemand ni l'arabe, donc impossible de passer l'appli en arabe.
  – Menu : 🇩🇪 de et 🇸🇦 ar ajoutés (7 drapeaux).
  – Le bouton du haut affichait 🇫🇷 pour l'arabe (erreur du lot 1 : j'avais
    recopié le drapeau français) → 🇸🇦. Même correction dans
    PhotoMultilingue (FLAGS.ar).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-417.
  ⚠️ TESTS EN LIGNE : page Mon apprentissage (404-405) et formulaire de
  séance (407) vus sur ses captures ; 408 à 417 PAS ENCORE TESTÉS. Suite de la
  traduction dans une AUTRE conversation (passation fournie le 27/09).

· (418) 27/09, 03 h 55 — BANNIÈRE « MON ÉCURIE » RETIRÉE DE LA PAGE CAVALIER.
  Blandine : « Ah oui retire-la » (proposée le 26/09 comme étape 3). La
  grande bannière au cheval noir « Ton univers. Tes chevaux. Ta passion. »
  (ouvrait `guilde`, doublon de la carte « Mon club ») n'est plus rendue.
  « Mes chevaux », le choix d'écurie et « Gérer mon écurie › » restent.
  Seule sa propre page était concernée (la bannière n'apparaissait pas en
  visite). node --check OK (18 blocs), un seul marqueur. Build 20260927-418
  (contient 399 à 417).

· (419) 27/09, 02 h 05 — JOURNAL DE PROGRESSION, REFONTE ÉTAPE 1 SUR 4 :
  MODE ÉDITION D'EcranCarnetDetail (3e maquette). Brief de Blandine du 27/09,
  plan validé, découpage 419 édition / 420 panneau des chevaux et miniatures /
  421 lecture / 422 anciennes photos.
  – Bandeau photo (images/JOURNAL_SEANCE_FOND.webp, nouveau fichier), voile
    et dégradé jusqu'au fond #080A0B ; « JOURNAL DE PROGRESSION », rond du
    cheval (photo si déjà chargée — mesChevaux / mesChevauxLies —, sinon
    pictogramme), nom en grand sur 2 lignes max, date discrète : l'input date
    réel, transparent, couvre la ligne (borné à l'écran).
  – Disciplines en rail défilable (data-hscroll), thème et lieu sur une ligne
    chacun, ressenti en 3 choix sobres, « RÉSUMÉ DE LA SÉANCE » (écrit dans
    note), « SOUVENIRS » (phrase « bientôt disponible », aucun bouton, anciennes
    photos au rendu d'avant), ligne compacte « CONSEILS HEY BABY », bouton
    « ENREGISTRER MA SÉANCE » pétrole.
  – À RETENIR : champ affiché dès que l'état contient du texte (ancienne
    séance, brouillon restauré, saisie), recalculé à chaque rendu ; une fois
    apparu il reste affiché pendant la visite (refArVu). Masqué, rien n'est
    forcé à null. Vidé volontairement → null à la sauvegarde.
  – Inchangés : états, chargements, enregistrer(), brouillon v2, liens des
    conseils, suppression, navigation, panneau des chevaux, visionneuse,
    masquage de la barre, MODE LECTURE (en-tête compris).
  – Arabe : pas d'espacement de lettres ; chevrons ‹ › retournés par le
    navigateur ; rail qui démarre à droite.
  – Aucun SQL, aucune route, aucune requête Supabase ajoutée, aucun autre
    écran touché ; traductions déclarées dans EcranCarnetDetail (helper T).
  Tests de rendu (React simulé) à 320 / 375 / 390 / 430 px, fr / ar / de / ja :
  aucun débordement, champs à 16 px, zones tactiles ≥ 44 px. Tests de
  sauvegarde : séance vide, brouillon avec et sans À retenir, séance « À
  retenir » seul, effacement volontaire, séance complète (Obstacle affiché
  Saut et non réécrit). node --check OK (18 blocs), un seul marqueur.
  Build 20260927-419.

· (420) 27/09, 02 h 15 — JOURNAL DE PROGRESSION, ÉTAPE 2 SUR 4 : PANNEAU DES
  CHEVAUX ET MINIATURES. Blandine : « Ok continue » (après le 419).
  – Chevaux des écuries (règle 207) : la requête existante lit en plus
    photo_url (même requête, aucune nouvelle). Leur photo s'affiche donc aussi
    dans le rond du bandeau quand on les choisit.
  – Panneau : miniature ronde de 40 px sur chaque ligne (photo en
    object-fit cover, sinon pictogramme de cheval neutre) ; « Aucun cheval » =
    rond barré ; « Cheval sans fiche… » = pictogramme sur bord pointillé.
    Lignes de 56 px. Recherche, ordre, dédoublonnage et choix inchangés.
  – Aucun nouveau texte (rien à traduire). Aucun SQL, aucune route, aucun
    autre écran ; mode lecture non touché.
  Rendu testé à 320 et 390 px (fr, ar). node --check OK (18 blocs), un seul
  marqueur. Build 20260927-420 (contient 419).

· (421) 27/09, 02 h 25 — JOURNAL DE PROGRESSION, ÉTAPE 3 SUR 4 : MODE LECTURE
  D'EcranCarnetDetail. Blandine : « Ok continue » (après le 420).
  – Le bandeau photo (cheval en grand, photo ou pictogramme, date discrète) est
    désormais commun à l'édition et à la lecture ; en lecture rien n'y est
    cliquable. Séance sans cheval : « Aucun cheval » en clair atténué ;
    cheval sans fiche : pastille « sans fiche ».
  – Lecture : discipline, lieu et thème en une zone compacte (qui passe à la
    ligne plutôt que de déborder), ressenti en une pastille sobre, « RÉSUMÉ
    DE LA SÉANCE » (note) puis « À RETENIR » à la suite, séparé par un trait
    fin — les DEUX s'affichent, aucun n'est caché. Sans l'un ni l'autre :
    « Pas de note pour cette séance. »
  – Anciennes valeurs traduites À L'AFFICHAGE seulement (« Obstacle » → Saut,
    discipline inconnue comme « Théorie » affichée telle quelle, ressenti
    inconnu affiché tel quel). Rien n'est écrit en base en lecture.
  – Conseils liés : ligne « CONSEILS HEY BABY » + un conseil par ligne
    (ouverture inchangée). « MODIFIER MA SÉANCE » (pétrole, plus de jaune),
    suppression à double confirmation inchangée.
  – Photos : bloc de lecture d'avant conservé tel quel (refonte au 422).
  – Arabe : textes écrits par la cavalière en dir="auto" (un texte français
    garde son point à la bonne place).
  – Limite connue : en lecture, la photo d'un cheval d'une AUTRE écurie ne
    s'affiche que si le formulaire a été ouvert dans la même visite (la liste
    de ces chevaux n'est chargée qu'en modification, aucune requête ajoutée).
  – Aucun nouveau texte à traduire (tous existaient déjà en 7 langues).
    Aucun SQL, aucune route, aucune requête ajoutée, aucun autre écran.
  Rendu testé 320 / 375 / 390 / 430 px (fr, ar) ; sauvegardes de l'édition
  retestées (vide, brouillons, À retenir seul, effacement, séance complète).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-421
  (contient 419 et 420).

· (422) 27/09, 02 h 35 — JOURNAL DE PROGRESSION, ÉTAPE 4 SUR 4 : PRÉSENTATION
  DES ANCIENNES PHOTOS (« SOUVENIRS »). Blandine : « Ok continue » (après le 421).
  – Une seule galerie, commune à l'édition et à la lecture : vignettes
    SÉPARÉES (coins arrondis, 8 px entre chacune), jamais de mosaïque collée.
    1 photo : grande vignette horizontale ; 2 : deux vignettes côte à côte ;
    3 : une grande + deux petites ; plus de 3 : même disposition avec « +N »
    posé sur la 3e vignette, un toucher sur « +N » déplie toutes les photos
    (grille de 2, carrés).
  – Ordre de la séance conservé. Recadrage centré un peu haut (têtes
    préservées). Un toucher ouvre la visionneuse existante. Une vidéo (cas
    qui n'existe pas encore dans le carnet) aurait un symbole lecture.
  – Édition : chaque vignette garde son bouton de retrait (40 px). Lecture :
    titre « Photos » remplacé par « SOUVENIRS » (déjà traduit en 7 langues).
  – Un seul état ajouté (toutPh, pour « +N »). Aucun envoi réactivé, aucun
    Mux, aucun SQL, aucune requête, aucun autre écran.
  Rendu testé à 1, 2, 3 et 5 photos (320 / 375 / 390 px), dépliage « +N » et
  édition. node --check OK (18 blocs), un seul marqueur. Build 20260927-422
  (contient 419 à 421). REFONTE D'EcranCarnetDetail TERMINÉE (4/4).

· (423) 27/09, 02 h 50 — JOURNAL DE PROGRESSION, BUILD CORRECTIF (avant le test
  sur vrai iPhone). Brief de Blandine du 27/09. Aucun design refait.
  1. « À retenir » : le useRef du 419 (modifié pendant le rendu) est remplacé
     par un état aRetenirVisible (initialisé depuis a_retenir de la séance
     ouverte) + un effet [aRetenir] qui le passe à vrai dès qu'il y a du texte.
     Affiché si aRetenirVisible OU texte présent. Rien dans le brouillon.
  2. Retrait d'une photo (édition) : zone tactile réelle 44 × 44 px, pastille
     visible de 32 px à l'intérieur, type="button", preventDefault +
     stopPropagation. Retire seulement de l'état (rien n'est écrit ni supprimé
     avant « Enregistrer ma séance »).
  3. Sens des champs (hjDirChamp) : vide → sens de l'interface (rtl en arabe,
     ltr sinon) ; rempli → auto. Appliqué à thème, lieu, « Autre » discipline,
     résumé, À retenir, recherche de cheval, cheval sans fiche.
  4. toutPh (dépliage « +N ») remis à replié quand l'identifiant de la séance
     change (effet [cleSeanceHJ], posé APRÈS l'état `seance` — une première
     version placée plus haut lisait `seance` encore indéfini, repérée au test
     et corrigée avant livraison).
  5. Input date : opacity 0.01 (principe inchangé, pas de showPicker), aria-label
     « Choisir la date de la séance » en 7 langues. Contenu dans sa ligne
     (46 px), ne recouvre pas la ligne du cheval.
  Hooks : +1 état et +2 effets, tous au niveau haut, ordre stable ; le cas
  quoi:"conseil" sort toujours avant tout hook (inchangé).
  Aucun SQL, aucune route, aucune requête modifiée, aucun autre écran.
  Tests (React simulé, effets à dépendances) : À retenir (ancienne séance,
  brouillons, effacement → reste visible → null), galerie (dépliage, repli au
  changement de séance, bouton 44 × 44, retrait sans visionneuse ni écriture),
  sens en arabe (vide rtl, français ltr, arabe rtl), date, suppression.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-423
  (contient 419 à 422).

· (424) 27/09, 02 h 45 — PREMIER RETOUR DU TEST IPHONE : ÉCRITURE ET CARTE DU
  JOURNAL. Blandine (captures 02 h 33 / 02 h 34) : « Un peu gros en écriture
  non ? » et « quand on clique sur mon journal de progression on s'attend à
  arriver sur la page concernée ». Correctifs proposés, réponse « Oui ».
  1. EcranCarnetDetail — écriture réduite d'un cran, sans toucher au design :
     textes d'exemple des champs 16 → 14 px (le texte TAPÉ reste à 16 px :
     pas de zoom iOS) ; ressenti 13,5 → 12,5 ; phrase des souvenirs 13,5 →
     12,5 ; sous-titre des conseils 14 → 13 ; « Choisir » 15 → 14 ; date 14 →
     13 ; titres de section 11 → 10,5 px, espacement 2,4 → 2 ; « CONSEILS HEY
     BABY » 11,5 → 11 ; boutons « Enregistrer » et « Modifier » 14,5 / 14 →
     13,5 px, espacement réduit. Nom du cheval inchangé.
  2. EcranMonApprentissage — tout le haut de la carte « Mon journal de
     progression » (icône, titre, phrase) ouvre le journal (`carnet`), comme
     « Voir mon journal ». « Noter une séance », « Dernière séance » et « Voir
     mon journal » inchangés.
  Aucun SQL, aucune route, aucune requête. node --check OK (18 blocs), un seul
  marqueur. Build 20260927-424 (contient 419 à 423).

· (425) 27/09, 03 h 10 — PAGE PRINCIPALE DU JOURNAL, ÉTAPE 1 SUR 5 : BANDEAU ET
  STRUCTURE (EcranMonCarnet, route carnet). Brief de Blandine (découpage 425
  bandeau / 426 cartes / 427 filtres / 428 calendrier / 429 objectif).
  – Nouveau fichier images/JOURNAL_CARNET_FOND.webp (1536×1024, 100 Ko), tiré
    de l'image ORIGINALE du carnet en cuir envoyée par Blandine (version au
    côté gauche sombre). Voile latéral + fondu vers #080A0B ; en arabe l'image
    est retournée (texte à droite). Bouton retour : même retour(), 44 px.
  – Textes : « MON JOURNAL DE PROGRESSION », « MES SÉANCES · MES SENSATIONS ·
    MES OBJECTIFS », « Chaque séance laisse une trace. » (7 langues, fournies
    par le brief ; césure douce Fortschritts-tagebuch en allemand ; taille du
    titre souple, jamais un mot coupé au milieu).
  – Bouton pétrole « Noter une séance » (même navigation : __carnet quoi
    nouvelle → carnet-detail).
  – « Mes conseils Hey Baby » en ligne secondaire compacte : compterEpinglesHB,
    PanneauConseilsHB et réouverture au retour d'un conseil INCHANGÉS.
  – Retirés de l'affichage : « Ma dernière séance » (elle est maintenant la 1re
    carte) et « Mes priorités du moment » (lectures conservées, aucune donnée
    touchée). Titre de liste « Mes dernières séances ».
  – INCHANGÉS : cartes, requête (select * / date puis created_at décroissants /
    limit 200), 8 cartes + « Voir tout », mémoire de défilement, EcranCarnetDetail.
  – Espace bas porté à safe-area + 130 px (dernière carte au-dessus de la barre).
  Aucun SQL, aucune route, aucune requête ajoutée ou modifiée.
  Rendu testé 320 / 375 / 390 / 430 px (fr, de, ja, ar) et page vide ; bouton,
  panneau des conseils et « Voir tout » testés. node --check OK (18 blocs), un
  seul marqueur. Build 20260927-425.

· (426) 27/09, 03 h 20 — PAGE PRINCIPALE DU JOURNAL, ÉTAPE 2 SUR 5 : NOUVELLES
  CARTES DE SÉANCE. Blandine : « Ok continue » (après le 425).
  – Carte (maquette) : date encadrée (jour en grand + mois court dans la langue
    de l'appli ; l'année seulement si ce n'est pas l'année en cours ; la chaîne
    AAAA-MM-JJ est découpée, Intl ne sert qu'à nommer le mois), nom du cheval
    (2 lignes max), pastille de discipline, thème, lieu, 1re photo à droite
    (vignette 4/3), puis sous un trait fin : « À retenir : … » (à défaut, le
    début du résumé, comme les anciennes cartes, pour ne rien faire disparaître),
    « Voir la séance › » et le ressenti en pastille.
  – Anciennes valeurs traduites À L'AFFICHAGE seulement : « Obstacle » → Saut,
    « Théorie » affichée telle quelle. Rien n'est écrit.
  – INCHANGÉS : données (liste déjà chargée), toucher (__carnet quoi seance →
    carnet-detail), 1re photo et miniature vidéo, 8 cartes + « Voir tout »,
    requête, ordre. Espacement entre cartes 8 → 12 px.
  – Arabe : textes saisis en dir="auto", pas d'espacement de lettres.
  Aucun SQL, aucune requête, aucune route. Rendu testé 320 / 375 / 390 / 430 px
  (fr, de, ja, ar) avec cheval absent, nom long, séance d'une autre année,
  Obstacle, Théorie. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-426 (contient 425).

· (427) 27/09, 03 h 30 — PAGE PRINCIPALE DU JOURNAL, ÉTAPE 3 SUR 5 : FILTRES ET
  AFFICHAGE PROGRESSIF. Blandine : « Ok continue » (après le 426).
  – Rail de filtres sous « Mes dernières séances » : Toutes · Plat · Dressage ·
    Saut · Extérieur · Travail à pied · Autre (data-hscroll, pastilles 44 px,
    barre de défilement masquée ; en arabe le rail démarre à droite).
  – Filtre LOCAL sur la liste déjà chargée (aucune requête) : discipline_cle
    sinon ancienne valeur reconnue (« Obstacle » → Saut) ; « Autre » = clé autre ;
    les valeurs inconnues (« Théorie »…) seulement dans « Toutes ».
  – Filtre vide : « Aucune séance dans cette discipline pour le moment. »
  – « Voir tout » remplacé par l'affichage progressif : 8 cartes, puis « Voir
    plus (N) » ajoute 8 à chaque toucher, puis « Replier ». Changer de filtre
    revient à 8.
  – Filtre et nombre affiché gardés pendant la visite (window, rien sur
    l'appareil) : au retour d'une séance la liste est identique et la mémoire
    de défilement retombe au même endroit.
  – 2 états ajoutés (filtre, nombre) ; l'ancien état toutVoir reste déclaré,
    inutilisé (pas de nettoyage hors périmètre).
  Aucun SQL, aucune route, aucune requête. Tests : filtres Plat / Saut
  (Obstacle inclus) / Autre vide / Toutes, Voir plus, 320 et 390 px, fr et ar.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-427 (contient
  425 et 426).

· (428) 27/09, 03 h 45 — PAGE PRINCIPALE DU JOURNAL, ÉTAPE 4 SUR 5 : CALENDRIER
  COMPACT. Blandine : « Ok continue » (après le 427). Question du toucher sur un
  jour restée sans réponse : première option prise ET SIGNALÉE (filtrer sur le
  jour, second toucher = tout) — facile à changer si elle préfère autre chose.
  – Sous « Noter une séance », avant la ligne des conseils : mois + année et
    « • N séances » du mois (0 → « aucune séance ») sur une ligne, flèches ‹ ›
    (44 px) pour changer de semaine, 7 jours du lundi au dimanche (nom court
    et nombre dans la langue de l'appli), point champagne sous un jour qui a
    une séance, jour choisi dans un cercle pétrole, aujourd'hui cerclé
    champagne. Le mois affiché est celui du jeudi (semaine à cheval).
  – Toucher un jour : la liste n'affiche que ses séances (combiné au filtre de
    discipline), avec « Séances du … » et « Tout afficher » ; jour vide →
    « Aucune séance ce jour-là. » ; second toucher = tout.
  – Calculé sur la liste déjà chargée (200 dernières séances) : aucune requête.
    Dates : chaînes AAAA-MM-JJ, calculs en UTC à partir des morceaux (jamais
    new Date("AAAA-MM-JJ")) ; Intl ne sert qu'aux noms de mois et de jours.
  – Semaine et jour gardés pendant la visite (window), comme le filtre.
  – Une parenthèse en trop dans le compteur « aucune séance » a été détectée
    par la vérification de syntaxe et corrigée avant livraison.
  Aucun SQL, aucune route, aucune requête. Tests : jour avec séance, jour vide,
  re-toucher, semaine précédente, semaine à cheval (28 sept → 4 oct = octobre),
  320 / 375 / 390 / 430 px en fr, ar, ja, de. node --check OK (18 blocs), un
  seul marqueur. Build 20260927-428 (contient 425 à 427).

· (429) 27/09, 04 h 00 — PAGE PRINCIPALE DU JOURNAL, ÉTAPE 5 SUR 5 : « MON
  OBJECTIF DU MOMENT ». Blandine : « Ok continue » (après le 428).
  – Section sous le calendrier (titre au même style que « Mes dernières
    séances ») : carte avec pictogramme cible, texte de l'objectif (Cormorant,
    taille souple) et « Modifier » ; sans objectif : « Choisis un objectif sur
    lequel te concentrer. » et « Définir ». Édition sur place : champ 16 px
    (140 caractères), « Annuler » / « Enregistrer ».
  – Table public.carnet_objectifs (créée le 27/09 à 00 h 18, RLS « soi
    seulement ») : PREMIÈRE utilisation. Lecture : select texte, eq user_id,
    maybeSingle. Écriture : upsert { user_id, texte, updated_at } onConflict
    user_id. Texte vidé puis enregistré = delete de SA ligne (geste volontaire).
    Jamais dans profiles. Lecture en échec : « Objectif indisponible pour le
    moment. » (rien ne casse) ; écriture en échec : message, rien de perdu.
  – Seuls échanges ajoutés de toute la série 425–429 (1 lecture à l'ouverture,
    1 écriture à l'enregistrement).
  Aucun SQL, aucune route. Tests (base simulée) : vide → Définir → enregistrer
  (upsert), Modifier → vider → enregistrer (delete), lecture en erreur, 320 px
  en fr, 375 px en ar. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-429 (contient 425 à 428). PAGE PRINCIPALE DU JOURNAL : 5/5.

· (430) 27/09, 04 h 10 — JOURNAL : PHOTO DE SECOURS DES CARTES. Le test du 429
  sur iPhone est validé par Blandine (« Tout a l'air ok »). Diagnostic photos
  clos sans correction (séances du 22-23 sans média : comportement attendu).
  Constat : la fiche de Hey Baby Please (cheval d'écurie ajouté à « mes chevaux
  persos ») montre SA PHOTO PERSO (chevaux_histoires.photo_url, une par
  cavalière et par cheval, posée le 02/09), la fiche commune n'ayant pas de
  photo_url. EcranCheval affiche photoPerso || photo de la fiche.
  Blandine : « Ok vas-y » pour l'ordre proposé.
  – Carte SANS média : 1) photo perso de la cavalière pour ce cheval ;
    2) photo de la fiche commune (chevaux.photo_url) ; 3) aucune photo.
    Une carte AVEC média garde sa 1re photo, inchangé.
  – DEUX lectures groupées pour toute la page, sur les chevaux uniques des
    séances sans média : chevaux_histoires (user_id = soi, cheval_id in ids) et
    chevaux (id in ids). Jamais une requête par carte. Échec de lecture ou
    image qui ne charge pas = pas de photo de secours, rien d'autre ne change.
  – Cheval sans fiche (cheval_id null) : pas de photo de secours.
  – Le rond de la fiche de séance (EcranCarnetDetail) N'EST PAS touché : même
    correction prévue dans un build séparé (431) si Blandine le valide.
  Aucun SQL, aucune route. Test (base simulée) : 2 lectures seulement, séance
  avec photo inchangée, photo perso prioritaire sur la fiche, fiche seule,
  cheval absent. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-430.

· (431) 27/09, 04 h 25 — JOURNAL (EcranMonCarnet) : COULEURS RAVIVÉES. Blandine
  (sur le 430) : « Les couleurs sont peut-être un peu fades », « ça manque un peu
  de doré et de vie dans le bleu, sans en faire trop non plus ». Les deux pages
  sont concernées : le journal d'abord (431), la fiche de séance ensuite (432).
  – Palette du journal : pétrole #254F60 → #2E6A80, reflet #5C8792 → #7DB6C3,
    doré #C5AA78 → #D6B676, bronze #AD8B57 → #C29B5C, cartes #121617 → #131819.
  – Textes secondaires plus lumineux (ivoire à 72–95 % au lieu de 50–88 %).
  – Bouton « Noter une séance » : léger dégradé pétrole + halo discret.
  – Pastilles de discipline : pétrole plus franc, texte ivoire plein ; filtre
    actif plus vif ; « Voir la séance » et « Modifier » en bleu plus lumineux.
  – Doré : cadre des dates, contour du calendrier, traits des titres (2 px),
    points du calendrier (6 px), pastille de ressenti, cible de l'objectif.
  – Contour des cartes légèrement bleuté.
  – Mise en page, textes, données, requêtes : INCHANGÉS. Bandeau et photos
    inchangés. EcranCarnetDetail non touché (432).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20260927-431.

· 27/09, 12 h 39 → 20 h 14 — INCIDENT VIDÉO (hors build, côté Supabase).
  Symptôme : vidéo impossible dans les commentaires d'un événement (stage),
  « vidéo : TypeError: Load failed », 3 essais.
  Diagnostic, une vérification à la fois :
  – videos_mux : aucune ligne du jour → la fonction mux-upload n'allait jamais
    jusqu'à la réservation du quota.
  – Invocations de mux-upload : seulement la vérification OPTIONS (200), jamais
    le POST → Safari bloquait la vraie demande.
  – Clés JWT : le projet est passé à une nouvelle clé de signature (Current =
    nouvelle, Previous = ancienne) ; la fonction a « Verify JWT with legacy
    secret » activé. Piste NON retenue au final (voir cause).
  – CAUSE RÉELLE (ligne 1 de mux-upload) : ALLOWED_ORIGIN =
    "https://2hype.netlify.app", alors que Hype tourne désormais sur
    https://2hype.fr → CORS refusé par Safari.
  CORRECTION faite par Blandine dans l'éditeur Supabase (19 h 55), déployée :
  const ALLOWED_ORIGIN = "*";  (sans risque : la fonction vérifie elle-même
  l'utilisateur via utilisateurDuJeton → /auth/v1/user ; le CORS ne protégeait
  rien, comme le disait déjà son commentaire du 04/09).
  Test : envoi OK (videos_mux ready à 19 h 58) ; le 1er commentaire vidéo avait
  été supprimé par Blandine pendant la préparation (case vide, rien ne
  bougeait) ; 2e essai : « la vidéo est arrivée » (20 h 14).
  À SURVEILLER : les AUTRES fonctions Supabase (Hey Baby…) peuvent avoir la même
  ligne ALLOWED_ORIGIN = 2hype.netlify.app → à vérifier si l'une casse sur 2hype.fr.
  Améliorations proposées, NON faites : (1) indicateur visible pendant l'envoi
  puis la préparation (« Envoi 45 % », « Préparation… ») au lieu d'une case
  vide ; (2) webhook Mux côté serveur pour accrocher la vidéo sans dépendre du
  téléphone après l'envoi. Photos/vidéos des séances du journal : toujours
  suspendues, choix A (coffre privé) / B / C posé à Blandine.

· (432) 27/09, 20 h 30 — ENCART D'ENVOI VIDÉO DANS LES COMMENTAIRES (MurHype :
  murs, événements, fil). Blandine : « quand le téléchargement est en cours le
  visuel est différent de l'encart, on pourrait écrire en haut en couleur
  téléchargement en cours merci de patienter ; sinon la petite vidéo de la
  mascotte » → option 3 choisie (les deux).
  – CAUSE de la « case vide » : pour les statuts uploading / processing, la
    case recevait un libellé NUL (seul « Vidéo non envoyée » en avait un).
  – Désormais : bandeau en couleur en haut de l'encart — « Téléchargement en
    cours, merci de patienter » (uploading) puis « Préparation de la vidéo… »
    (processing) — + Titi (images/titi-envoi-video.mp4, la même que l'onglet
    Vidéos de la fiche cheval ; absente = seul le texte s'affiche) + une phrase
    d'aide : garder Hype ouverte pendant l'envoi / revenir sur la page pour voir
    la vidéo prête. 7 langues. « Vidéo non envoyée » inchangé.
  – NON fait (build séparé proposé) : le mur ne se rafraîchit pas tout seul à la
    fin de la préparation — la vidéo apparaît quand on revient sur la page (le
    texte le dit honnêtement).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20260927-432
  (contient 430 et 431).

· (433) 27/09, 20 h 40 — LA VIDÉO REMPLACE L'ENCART D'ELLE-MÊME (MurHype).
  Blandine : « Ok continue » (proposé au 432).
  – Tant qu'un message du mur affiche une vidéo en cours (statut uploading ou
    processing), le mur relit ses messages toutes les 8 s, au plus 6 min ; dès
    qu'aucune vidéo n'est en cours, plus aucune lecture supplémentaire.
  – Relecture immédiate quand l'envoi signale sa fin (événements déjà émis par
    hypePosterVideoCommentaire : hype-souvenirs-maj, hype-albums-modifies).
  – Texte de préparation mis à jour (7 langues) : « Elle va apparaître ici
    d'elle-même d'ici une minute ou deux. »
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20260927-433
  (contient 432).

· 27/09, 20 h 35 — SQL PASSÉ PAR BLANDINE (coffre privé du journal), vérifié :
  storage.buckets avant : « photos » seul (public, 500 Mo, tous types).
  Créé : dossier « carnet » (public = false, 10 Mo par fichier, image/jpeg,
  image/png, image/webp) + 3 règles sur storage.objects, « soi seulement »
  (1er sous-dossier = auth.uid()) : carnet_voir_soi (SELECT),
  carnet_ajouter_soi (INSERT), carnet_supprimer_soi (DELETE). Vérification :
  4 lignes attendues présentes. Dossier « photos » non touché.

· (434) 27/09, 20 h 50 — PHOTOS DU JOURNAL RÉACTIVÉES, DANS LE COFFRE PRIVÉ.
  Blandine : option A (« Ok A »). Builds A (ajouter) et B (afficher) réunis
  dans ce seul build, SIGNALÉ : sans l'affichage, une photo privée envoyée
  n'aurait pas pu se voir au test.
  – Fiche de séance (modification) : bouton « Ajouter des photos » (plusieurs
    d'un coup, 8 max par séance) ; les nouvelles s'affichent à la suite des
    anciennes et partent à l'enregistrement ; phrase « Tes photos sont
    privées : toi seule peux les voir. » + « L'ajout de vidéos sera bientôt
    disponible. » (7 langues).
  – Envoi : hypeCarnetEnvoyerPhoto → dossier « carnet », chemin
    <uid>/<horodatage>-<aléa>.<ext> (préparation preparerPhotoMaster
    inchangée ; format refusé par le coffre → reconverti en JPEG) + une
    vignette <même nom>_v.jpg (480 px) pour les cartes. La séance garde une
    RÉFÉRENCE « carnet:<chemin> », jamais une adresse publique.
  – Affichage : hypeCarnetSigner = adresses temporaires (1 h) demandées EN UNE
    FOIS pour toutes les photos à l'écran (createSignedUrls), gardées 50 min en
    mémoire. Fiche (galerie) : grande photo pour les grandes cases, vignette
    pour les petites ; visionneuse = grande photo. Journal (cartes) : vignette.
  – Anciennes photos (adresses publiques) : affichées comme avant, non touchées.
  – NON fait (build C) : la suppression réelle du fichier quand on retire une
    photo ou qu'on supprime une séance (aujourd'hui la photo retirée disparaît
    de la séance, le fichier reste dans le coffre, privé).
  Tests (Supabase simulé) : lecture d'une séance avec 1 photo privée + 1
  ancienne, ajout d'une photo, enregistrement (2 envois : photo + vignette ;
  référence carnet: ajoutée à medias), carte du journal avec vignette privée
  (1 seule demande d'adresses). Une parenthèse de fermeture oubliée dans le
  bloc Souvenirs a été détectée par node --check et corrigée avant livraison.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-434.

· (435) 27/09, 21 h 00 — LIEN PARTAGÉ D'UN RENDEZ-VOUS (#r=<id>) : LA FICHE
  S'OUVRE À COUP SÛR. Blandine : un lien d'événement de l'agenda « ramène sur la
  page Écurie » alors que « on avait déjà géré ça » (builds 128 et 283).
  CAUSE : AgendaClubHype lisait la note window.__agendaFiche et l'EFFAÇAIT dès
  son premier affichage, avant que la connexion soit rétablie quand l'appli
  s'ouvre depuis un lien : la base (club_agenda, réservée aux connectés) ne
  renvoyait rien, ou la page se redessinait et la note était perdue.
  CORRECTION (AgendaClubHype seul) : la note est gardée tant que la fiche n'est
  pas vraiment ouverte ; essais toutes les 0,8 s pendant 10 s au plus, dès que
  la connexion est là ; un seul essai à la fois, mais un agenda démonté ne
  bloque pas le nouveau ; « Ce rendez-vous n'existe plus » seulement une fois
  connectée. Liens déjà envoyés, droits, base : inchangés.
  Test : simulation (connexion qui arrive après 1,5 s + agenda redessiné à 1 s)
  → la fiche s'ouvre dans le nouvel agenda, note effacée ensuite.
  Stories en partage : reportées à la demande de Blandine (« on verra après »).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-435 (contient 434).
· SQL 27/09, 20 h 47 (passé par Blandine, « Success. No rows returned ») —
  VIDÉO DANS LE CARNET, ÉTAPE 1 : contrainte videos_mux_destination_type_check
  étendue à 'seance' ; nouvelle fonction carnet_seance_ajouter_media(p_seance,
  p_url) (security invoker : ajout atomique à carnet_seances.medias, si absent,
  seulement sur SA séance) ; hype_reserver_place_video recréée à l'identique +
  une branche « ready » pour destination_type = 'seance' (vidéo comptée tant
  qu'elle est dans une séance). Plafonds inchangés : illimité / 15 / 3.
· (436) 27/09, 21 h 15 — AJOUTER UNE VIDÉO À UNE SÉANCE DU CARNET.
  Blandine : « mets les vidéos en ligne sur la page carnet de bord ».
  EcranCarnetDetail seul. Bouton « Ajouter une vidéo » dans Souvenirs, à côté
  de « Ajouter des photos », seulement sur une séance DÉJÀ enregistrée (sinon :
  « Pour ajouter une vidéo, enregistre d'abord ta séance »). 3 min maximum,
  8 photos + vidéos au maximum par séance.
  CHEMIN (le même que les commentaires) : réservation Mux avec la cible
  « carnet:<uid> » (quota serveur) → trace videos_mux enrichie
  (destination « seance », id de la séance) → envoi du fichier → attente Mux
  (jusqu'à ~6 min tant que l'appli reste ouverte) → carnet_seance_ajouter_media
  (jamais de réécriture du tableau entier) → trace « ready ». Ensuite la vidéo
  est ajoutée à l'écran ; un « Enregistrer » ultérieur la garde.
  PENDANT L'ENVOI : même encart que le fil (432) — bandeau « Téléchargement en
  cours, merci de patienter · NN % » puis « Préparation de la vidéo… », Titi.
  Visible aussi en lecture si elle enregistre pendant l'envoi.
  GALERIE : une vidéo montre son image Mux et le ▶ ; toucher = la visionneuse
  existante (lit déjà les vidéos). Carte du journal : inchangée (elle savait
  déjà afficher une vidéo en première position).
  MESSAGES CLAIRS (7 langues) : quota atteint, vidéo trop longue, échec
  d'envoi, préparation ratée, toujours en préparation.
  TEXTE D'INFO : les vidéos ne sont PAS dans le coffre privé (Mux est public :
  quiconque a le lien peut la voir) — c'est dit sous les boutons.
  ⚠️ NON FAIT (prévu) : rattrapage si l'appli est fermée avant la fin (la vidéo
  reste alors chez Mux, trace en uploading/processing, non rattachée). NE PAS
  appeler hypeMuxReconcilier sur une cible « carnet:… » en l'état : sa branche
  non-album écrit dans commentaires/souvenirs, pas dans carnet_seances.
  Test simulé : envoi → encart 40 % → rpc (p_seance, URL m3u8) → trace ready →
  vignette vidéo dans la galerie → Enregistrer garde la vidéo ; quota en arabe
  → message clair, rien d'envoyé ; nouvelle séance → pas de bouton.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-436 (contient 435).
· (437) 27/09, 21 h 05 — RATTRAPAGE DES VIDÉOS DE SÉANCE (suite du 436).
  Si l'appli est fermée pendant l'envoi d'une vidéo de séance, la vidéo peut
  être prête chez Mux sans être rattachée à la séance.
  CORRECTION : nouvelle fonction globale hypeCarnetRattraperVideos() (à côté
  des fonctions du coffre, avant EcranCarnetDetail), lancée en arrière-plan à
  chaque ouverture de la page du journal (EcranMonCarnet, après le chargement
  des séances). Elle lit SES traces videos_mux en destination « seance » encore
  uploading/processing, demande l'état à Mux, et :
  prête → carnet_seance_ajouter_media (sans doublon) puis trace ready, et la
  liste des séances est relue une fois ; séance supprimée entre-temps → trace
  errored ; échec Mux ou envoi introuvable → errored ; envoi jamais fini après
  2 h ou préparation après 7 jours → errored ; sinon on attend la prochaine
  ouverture. Mêmes règles que hypeMuxReconcilier, qui reste inchangé et ne doit
  toujours PAS être appelé sur une cible « carnet:… ».
  Rien d'affiché à la cavalière en cas d'échec (seulement la trace en base).
  Test : fonction isolée avec 5 cas simulés (prête, abandonnée > 2 h, errored,
  asset_created, séance supprimée) → 5 résultats conformes.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-437 (contient 436).
· (438) 27/09, 21 h 10 — SUPPRESSION RÉELLE DES PHOTOS DU COFFRE (build C).
  Avant : une photo retirée d'une séance, ou une séance supprimée, disparaissait
  de l'appli mais le fichier restait dans le dossier privé « carnet ».
  CORRECTION : nouvelle fonction globale hypeCarnetSupprimerPhotos(refs) (à côté
  des fonctions du coffre). Elle efface la photo ET sa vignette (_v.jpg), et
  seulement les références « carnet:… » (anciennes photos publiques et vidéos
  Mux non touchées). Appelée UNIQUEMENT après une écriture réussie en base :
  - « Enregistrer ma séance » : photos du coffre présentes en base avant et
    absentes après → effacées (en arrière-plan) ;
  - « Supprimer cette séance » (après confirmation) : toutes ses photos du
    coffre → effacées.
  Un échec d'effacement ne bloque rien et ne montre rien (note en console) ;
  le fichier reste alors orphelin. Règle utilisée : carnet_supprimer_soi (déjà
  en base, sous-dossier = soi).
  NON FAIT : les vidéos Mux d'une séance supprimée restent chez Mux (et dans le
  décompte du quota ? non : la branche « seance » de hype_reserver_place_video
  ne compte que les vidéos encore présentes dans une séance). Suppression chez
  Mux = à faire côté fonction mux-upload, plus tard.
  Test simulé : retirer une photo du coffre + Enregistrer → 2 fichiers effacés
  (photo + vignette), l'ancienne photo publique gardée ; Enregistrer sans rien
  retirer → rien d'effacé ; supprimer la séance → photo + vignette effacées.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-438 (contient 437).
· (439) 27/09, 21 h 20 — COULEURS RAVIVÉES SUR LA FICHE DE SÉANCE.
  Suite du 431 (« ça manque un peu de doré et de vie dans le bleu, sans en
  faire trop ») : la fiche de séance (EcranCarnetDetail, écriture ET lecture)
  reprend exactement la palette de la page du journal.
  Palette HJ : carte #131819, pétrole #2E6A80 (avant #254F60), pétrole clair
  #37788F, reflet #7DB6C3 (avant #5C8792), bronze #C29B5C, doré #D6B676 (avant
  #C5AA78), gris #BFC3C5. Bleus transparents passés sur le nouveau pétrole,
  dorés plus francs, textes secondaires plus lumineux (0,5→0,7 ; 0,55→0,72 ;
  0,58→0,76 ; 0,62→0,8 ; 0,7→0,84 ; 0,72 et 0,78→0,86), lien #8ECBD8.
  Bouton « Enregistrer ma séance » : dégradé + halo, comme « Noter une séance ».
  Remplacements faits en UNE passe (pas d'enchaînement 0,5→0,7→0,84) et
  limités à EcranCarnetDetail. Encart d'envoi vidéo (cyan), rouge d'erreur et
  voiles sombres : inchangés. Aucune logique touchée.
  Test : captures avant/après (lecture complète et nouvelle séance), 390 px.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-439 (contient 438).
· VÉRIFICATION 27/09, 21 h 25 — LES AUTRES FONCTIONS SUPABASE ET LE CORS
  (point « à surveiller » de l'incident vidéo). Relevé dans l'index : il
  n'appelle que DEUX fonctions Supabase.
  - mux-upload : corrigée le 27/09 (ALLOWED_ORIGIN = "*").
  - hey-baby-vision : ses origines autorisées sont déjà 2hype.fr,
    www.2hype.fr et 2hype.netlify.app (§130, 26/09), et elle a fonctionné
    depuis 2hype.fr. Rien à faire.
  Tout le reste passe par Netlify en adresse RELATIVE (assistant,
  supprimer-compte) : même site, donc pas de CORS. Seule inconnue : les
  fichiers séparés (hype-stories.js, hype-video.js…), absents d'ici — à
  regarder avec le chantier des stories.
· (440) 27/09, 21 h 30 — LE JOURNAL NE GARDE RIEN D'UN COMPTE À L'AUTRE.
  La page du journal (425-429) retient en mémoire le filtre, le nombre de
  séances affichées, la semaine et le jour choisis, la séance ouverte
  (window.__jcFiltre, __jcNb, __jcSem, __jcJour, __carnet) et les adresses
  temporaires des photos du coffre (__hjCarnetUrls). Sur un téléphone
  partagé, la personne suivante les retrouvait (sans jamais voir les
  données de l'autre : la base filtre).
  CORRECTION : nouvelle fonction hypeViderEtatsJournal(), appelée par
  deconnexion() (le passage unique de tous les boutons « Se déconnecter » et
  de la suppression de compte), même si la fermeture de session échoue, ET à
  tout événement SIGNED_OUT (session expirée…). Rien en base.
  Test : fonction isolée → les 5 réglages repassent à vide, le cache des
  adresses est vidé.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-440 (contient 439).
· (441) 27/09, 21 h 35 — NETTOYAGE DE LA PAGE DU JOURNAL (EcranMonCarnet).
  Depuis le 425, les « priorités du moment » ne sont plus affichées, mais la
  page les lisait encore à chaque ouverture (2 requêtes : carnet_conseils_etat
  puis echanges_heybaby_epingles) et gardait deux états inutilisés.
  RETIRÉ : états prios et toutVoir, fonction locale titreConseil (servait
  seulement aux priorités), bloc de lecture des priorités. Le compteur « Mes
  conseils Hey Baby » est inchangé (compterEpinglesHB). Rien d'autre touché ;
  aucune donnée effacée en base (les priorités restent enregistrées).
  Effet : la page fait 2 requêtes de moins à l'ouverture. Aucun changement
  visible.
  Test : rendu simulé de la page (8 cartes, calendrier, objectif, conseils),
  aucune erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-441 (contient 440).
· (442) 27/09, 21 h 20 — LIEN D'UN RENDEZ-VOUS OUVERT DEPUIS WHATSAPP : LA FICHE
  S'OUVRE MÊME SANS ÊTRE CONNECTÉ(E). Blandine (capture) : le lien ramène
  toujours sur la page Écurie, malgré le 435. Capture prise dans le NAVIGATEUR
  DE WHATSAPP : personne n'y est connecté (« Mon écurie », 0 membres, bandeau
  vide), même elle.
  CAUSE (erreur du 435) : la fiche attendait la connexion avant d'aller
  chercher le rendez-vous. Or club_agenda est lisible par tout le monde
  (policy SELECT « public, true », relevée le 21/09). Pour un visiteur non
  connecté, l'attente ne finissait jamais → page Écurie vide.
  CORRECTION (AgendaClubHype seul, choix « A ») : le rendez-vous est cherché
  tout de suite, connecté(e) ou non ; essais toutes les 0,8 s pendant 10 s au
  plus ; ensuite « Ce rendez-vous n'existe plus » (ou l'erreur) pour tout le
  monde. La fiche s'ouvre par-dessus la page Écurie.
  CONSÉQUENCE ACCEPTÉE : pour un visiteur non connecté, la page Écurie
  derrière la fiche reste vide. Boutons de la fiche qui demandent un compte
  (« Je viens »…) : non vérifiés pour un visiteur, à regarder au test.
  QUESTION OUVERTE (Blandine) : rendre la page Écurie visible aux non
  connectés, OU afficher un message « connecte-toi / crée un compte » —
  à décider, rien de fait.
  Test : boucle isolée, 4 cas (visiteur + rendez-vous existant → fiche ;
  connectée → fiche ; rendez-vous supprimé → « n'existe plus » ; erreur base
  → message d'erreur).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-442 (contient 441).
· (443) 27/09, 21 h 40 — LA VRAIE CAUSE DU LIEN D'UN RENDEZ-VOUS QUI RESTE SUR
  LA PAGE ÉCURIE. Blandine, capture WhatsApp après le 442 : « Tjs pas ».
  CAUSE (trouvée en relisant tout le composant, ratée au 435 et au 442) :
  AgendaClubHype ne dessine RIEN quand le club n'a aucun rendez-vous à venir
  et qu'on ne peut pas en ajouter — y compris la fiche, qui est dessinée dans
  ce même composant. Un visiteur non connecté n'a pas de club → aucun
  rendez-vous → fiche chargée (grâce au 442) mais JAMAIS affichée.
  Dans l'appli, connectée à son club (qui a des rendez-vous), ça marchait :
  c'est pour ça que le problème n'apparaissait que depuis WhatsApp.
  CORRECTION (AgendaClubHype seul) : dans ce cas précis (0 rendez-vous, pas
  de droit d'ajout), on dessine SEULEMENT la fiche (plein écran) et le
  message d'erreur, sans l'encart « Prochains rendez-vous ». Sans lien
  ouvert : rien, comme avant. Club avec des rendez-vous : inchangé.
  Le 442 reste nécessaire (sans lui, la fiche n'est pas chargée pour un
  visiteur).
  Test : rendu simulé du composant, avant/après —
  441 : visiteur + lien → RIEN (le bug) ; 443 : visiteur + lien → FICHE ;
  visiteur sans lien → rien (inchangé) ; club avec rendez-vous + lien →
  fiche + encart (inchangé).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-443 (contient 442).
· (444) 27/09, 22 h 10 — L'ENCART « HYPE MEMORIES » RETIRÉ DE LA PAGE CAVALIER.
  Blandine : « la page cavalier on n'a plus besoin de Hype memories du coup
  comme on a l'onglet photo et vidéo » ; après explication, « on peut juste
  virer l'onglet hype memories du coup ? » (option A).
  FAIT (EcranMonCavalier seul) : la grande carte « Hype Memories » (image
  memoriesEncart, prénom, « Ton récit, tes albums, tes conseils épinglés »)
  est retirée, en visite comme sur sa propre page.
  ⚠️ LA PAGE memoirescavalier RESTE, car elle EST la page « Photos » : la tuile
  Photos de la page Cavalier l'ouvre, ainsi que le bouton « Écrire / Modifier
  mon récit » (« Lire la suite » en visite), un album ouvert depuis la fiche
  cheval, l'acceptation d'une invitation d'album, le mur des souvenirs et les
  liens #c=memento. Elle contient : le récit, les albums (AlbumsCheval
  « cavalier:<id> »), les conseils Hey Baby épinglés.
  À FAIRE PLUS TARD (Blandine : « faut qu'on la refasse correctement ») :
  refaire cette page en vraie page « Photos » ; reloger d'abord le récit et
  les conseils, puis rediriger tous les chemins ci-dessus.
  Aucun texte nouveau (rien à traduire). Aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-444 (contient 443).
· (445) 27/09, 22 h 20 — PAGE ÉCURIE : LE BOUTON « VOIR LES N CHEVAUX »
  RETIRÉ. Blandine (capture) : « le bouton voir les 20 chevaux fait doublon
  avec celui du milieu, on peut le retirer ? ».
  VÉRIFIÉ AVANT : les deux ouvraient exactement la même page (ecurie-hype,
  avec window.__ecurieHypeClub = monClub). Il reste la carte du milieu de la
  grille « Les chevaux de l'écurie · Voir tout », présente dès qu'il y a au
  moins un cheval.
  EcranGuilde seul, une seule ligne remplacée. Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-445 (contient 444).
· (446) 27/09, 22 h 30 — PAGE ÉCURIE : LE CHAMP « PARTAGE UN MOMENT… » RANGÉ
  DANS LA PARTIE REPLIÉE. Blandine (capture) : « on peut mettre le fait de
  poster une actualité dans la partie repliée ? ça casse la page en deux en
  plein milieu », puis « À » (option A).
  VÉRIFIÉ AVANT : seul le mur de la page Écurie (EcranGuilde, limite 2) se
  replie dans la navigation. Les autres murs (fiches des rendez-vous,
  souvenirs, cheval, Actualités) affichent tout, sans « Voir la suite » :
  non touchés. L'ancienne écurie perso (EcranEcurie, limite 3, réservée
  admin/modératrices, « à revoir avant suppression ») : non touchée.
  FAIT : nouvelle prop MurHype `composerDansSuite`, passée par EcranGuilde
  seulement. Replié avec « Voir la suite » → pas de champ ; déplié → champ
  sous la dernière publication, juste avant « Replier » ; 2 publications ou
  moins → champ sous elles (sinon personne ne pourrait publier). Brouillon
  gardé si on replie (état de MurHype).
  Test : ordre simulé — 4 publications repliées « p0 p1 Voir la suite » ;
  dépliées « p0 p1 p2 p3 champ Replier » ; 2 publications « p0 p1 champ ».
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-446 (contient 445).
· PROPOSÉ 27/09, 22 h 25 (rien codé) — AGENDA DU CLUB, boutons « + Ajouter » et
  « Voir tout l'agenda » plus discrets : 4 maquettes envoyées (1 liens dorés
  sans cadre ; 2 « + » rond dans le titre + « Tout voir › » dessous ; 3
  « Tout voir › » dans l'en-tête + carte pointillée « Nouveau rendez-vous » au
  bout du carrousel ; 4 deux pastilles-icônes « + » et calendrier). En
  attente de son choix. → Choisi : « 1 ter » (voir 447).
· (447) 27/09, 22 h 35 — AGENDA DU CLUB : BOUTONS PLUS DISCRETS (maquette
  « 1 ter », Blandine : « Ok on peut faire ça »).
  AgendaClubHype seul (donc page Écurie ET page de tout l'agenda, même
  composant). Les deux gros boutons encadrés sous le carrousel (.agc-act)
  sont RETIRÉS :
  - « ＋ Ajouter » : petit lien doré À DROITE DU TITRE « Prochains
    rendez-vous ». Mêmes droits (peutCreer). Caché si l'agenda est vide
    (l'encart vide garde son bouton « Ajouter un rendez-vous »). Sur la page
    agenda (sans titre) : seul, à droite, au-dessus du carrousel.
  - « Tout l'agenda → » : petit lien doré SUR LA LIGNE DES POINTS, à droite ;
    affiché dès 1 rendez-vous (avant : 2 minimum) ; jamais sur la page agenda.
  Zone de toucher gardée à 44 px (marge négative, rien ne bouge à l'œil).
  TEXTE NOUVEAU, 7 langues : « Tout l'agenda » / Full agenda / Toda la agenda
  / Tutta l'agenda / すべての予定 / Ganzer Kalender / كل المواعيد.
  « Ajouter » : texte existant, déjà traduit.
  Test : le VRAI composant rendu dans Chromium (React de l'index, données
  simulées, ses affiches) : 3 rendez-vous (titre + Ajouter, points + Tout
  l'agenda), 1 rendez-vous (Tout l'agenda seul à droite), page agenda
  (Ajouter seul, points, pas de Tout l'agenda). Aucune erreur console.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-447 (contient 446).
· (448) 27/09, 22 h 40 — AGENDA DU CLUB : TITRE ALLÉGÉ. Blandine : « tu peux
  juste laisser l'agenda du club en centrant le titre et retirer les
  prochains rendez-vous ».
  AgendaClubHype seul, page Écurie seulement (la page agenda n'avait déjà
  pas de titre, sansTitre : inchangée). Le grand titre « Prochains
  rendez-vous » est RETIRÉ ; « L'agenda du club » est CENTRÉ, et « ＋ Ajouter »
  reste à droite sur la même ligne (mêmes droits ; aligné au pixel près,
  mesuré dans Chromium). « Tout l'agenda → » sur la ligne des points :
  inchangé.
  Aucun texte nouveau (le texte « Prochains rendez-vous » n'est plus affiché
  ici mais reste dans le code), aucun SQL.
  Test : vrai composant rendu dans Chromium, aucune erreur console.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-448 (contient 447).
· (449) 27/09, 23 h 05 — LA CARTE « LES CHEVAUX DE L'ÉCURIE » TOUJOURS AU
  MILIEU, ET AUSSI SUR LA PAGE CAVALIER. Blandine : « on peut appliquer la
  même chose sur la page cavalier ? avec la carte du milieu qui emmène vers
  les autres chevaux ? ça serait bien qu'elle reste tjs au milieu », puis
  « elle continue de faire ce qu'elle faisait actuellement » (lu comme : même
  destination que sur la page Écurie) et « oui ok pour le milieu ».
  - Nouvelle fonction globale hypePlacerAuMilieu (juste avant EcranGuilde).
    Règle : 1 ou 2 lignes → milieu de la 1re ligne ; 3 lignes et plus →
    plein centre (case 5) ; grille vide → case vide à gauche, carte au milieu.
    Simulé : 0 « · C » ; 1 « H C » ; 2 « H C H » ; 3 « H C H | H » ;
    5 « H C H | H H H » ; 6 « H H H | H C H | H » ; 8 « H H H | H C H | H H H ».
  - Page Écurie (EcranGuilde) : la carte suit cette règle (avant : au centre
    à partir de 5 chevaux, sinon À LA FIN).
  - Page Cavalier (EcranMonCavalier) : MÊME carte (même dessin, textes déjà
    traduits), ouvre ecurie-hype avec son écurie (celle choisie en haut si
    elle en a deux ; sinon profil.club / profil.ecurie). SUR SA PAGE
    SEULEMENT et si elle a une écurie ; en visite : pas de carte. La carte
    « Ajouter un cheval », les cadenas Premium et le déroulant « Voir les
    autres » (> 9 chevaux) : inchangés (l'ajout compte comme une case).
  ⚠️ À VÉRIFIER AU TEST : avec le choix « Toutes » (deux écuries), la carte
  mène à l'écurie principale du profil.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-449 (contient 448).
· (450) 27/09, 23 h 15 — PAGE CAVALIER : UN CHEVAL DE MOINS AVEC LA CARTE DU
  MILIEU. Blandine (capture, 9 chevaux + carte = une 4e ligne avec un seul
  cheval) : « il faut qu'il passe un cheval supplémentaire à déplier ».
  FAIT (EcranMonCavalier seul) : nouvelle variable PLAFOND_CHV = 8 quand la
  carte « Les chevaux de l'écurie » est affichée (sa page, avec une écurie),
  9 sinon (visite : inchangé). Utilisée partout où « 9 » était écrit : nombre
  de chevaux visibles, apparition de la barre « Ajouter / Voir les
  autres (N) », et le N lui-même (8 → 9 dans son cas). Grille : 3 × 3 pile.
  Club de la carte calculé une seule fois (clubCarteMil).
  ⚠️ DÉFAUT DU 449 CORRIGÉ DANS LE MÊME BUILD (vu sur sa capture) : la carte du
  milieu était DÉCALÉE vers le bas (un bouton centre son contenu dans la
  hauteur de la case, plus haute à cause du nom et de la ligne du cheval).
  alignSelf « start » : la carte s'aligne sur les photos.
  Sans Premium : 6 chevaux, inchangé.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-450 (contient 449).
· RELEVÉ 27/09, 23 h 10 (rien codé) — REFONTE DE LA PAGE « CAVALIERS DE
  L'ÉCURIE » (EcranCavaliersClub, écran cavaliers-club), brief ChatGPT : relevé
  livré. Points clés : liste = hypeCavaliersDuClub (1 lecture profiles ≤ 2000,
  filtre téléphone) ; murs = commentaires cible « cavalier:<id> » ; J'aime du
  mur = likes_cartes PAR PUBLICATION (photo_likes = par photo, albums) ; privé
  filtré seulement côté téléphone (policy lecture = true) ; BUG EXISTANT : en
  visite, la page Cavalier affiche le mur de la VISITEUSE (MurHype cibleMoi).
  Top 3 possible sans SQL : 1 lecture groupée à l'ouverture + 1 lecture au
  dépliage. En attente de ses décisions (source mur/albums ; ses publications
  seulement ; corriger d'abord le mur en visite).
· BUILD 20260927-451 — CORRECTION DU MUR D'UN PROFIL CAVALIER VISITÉ (brief
  ChatGPT ; numéroté 451 car le 450 = le cheval en moins de la page Cavalier).
  - En visite publique, MurHype reçoit maintenant l'identifiant du cavalier
    affiché : cible « cavalier:<__visitePub.id> » (MurHype acceptait déjà la
    prop `cible` via cibleInitiale ; rien ajouté dans MurHype). Clé
    « murcav-<id> » : le mur est recréé quand on passe d'une cavalière à une
    autre (son effet de chargement ne tourne qu'au montage).
  - Sur son propre profil : h(MurHype, { cibleMoi: true }), strictement inchangé.
  - CHOIX DE BLANDINE « B » : en visite, PAS de champ de publication
    (sansComposer). Conséquence dite et acceptée : un mur visité sans aucune
    publication n'affiche rien (au lieu de « Sois le premier à publier ici »).
    Sans ce choix, le correctif aurait permis d'écrire sur le mur des autres.
  - Relevé : __visitePub / __estVisite (lus depuis window.__cavalierOuvert =
    "__public" et window.__cavalierPublic) sont la source déjà utilisée par
    toute la page (ex. BlocResultatsCavaliere) ; cibleMoi n'est utilisé qu'à
    CET endroit ; aucun hook ajouté dans EcranMonCavalier.
  - Publications privées de la personne visitée : toujours masquées
    (filtrerPrivesM, inchangé).
  - Aucune requête, aucun SQL, aucune modification visuelle hors du champ
    retiré en visite. Prépare le futur aperçu des moments les plus aimés sur
    la page « Cavaliers de l'écurie ».
  Test simulé : A sur sa page → cavalier:A ; A visite B → cavalier:B ;
  passage à C → cavalier:C (nouvelle clé).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-451 (contient 450).
· (452) 27/09, 23 h 25 — PAGE « CAVALIERS DE L'ÉCURIE », REFONTE ÉTAPE 1 :
  BANDEAU + PALETTE + CARTES SOBRES (brief ChatGPT ; Blandine : « Ok tu
  continues sur la page ? »). EcranCavaliersClub SEUL.
  - FICHIER À POUSSER : images/FOND_CAVALIERS_ECURIE.webp (son image des trois
    cavalières au coucher du soleil, convertie en webp 1400 × 787, ≈ 100 Ko).
    S'il manque, le bandeau reste un fond sombre, rien ne casse.
  - Bandeau : image pleine largeur, cover, centrée, hauteur 250 px + zone du
    haut de l'iPhone, dégradé sombre en bas vers le fond #080A0B. Dedans : nom
    de l'écurie (champagne, capitales), « LES CAVALIERS » (Cinzel ivoire),
    « Une écurie, des histoires à partager. » (italique). Bouton retour gardé
    (44 px, même fonction retour()).
  - Palette : noir chaud #080A0B, cartes #111416, ivoire #F2EDE4, champagne
    #C5AA78 ; plus aucun cyan sur la page.
  - Cartes : moins hautes (56 px mini, avant 64), avatar 42 px liseré
    champagne, pseudo Cinzel, « @identifiant · ville », à droite « Voir le
    profil › ». Toucher la carte ouvre le profil (ouvrir(p) inchangée).
    « Galop » retiré de la ligne (colonne inexistante, toujours vide).
    Arabe : la ligne « @identifiant · ville » garde son sens de lecture (dir auto).
  - TEXTES NOUVEAUX, 7 langues : « Les cavaliers », « Une écurie, des
    histoires à partager. », « Voir le profil ».
  - INCHANGÉ : lecture de la liste (hypeCavaliersDuClub), tri, retour,
    ouverture du profil, messages vide / erreur (recolorés seulement).
    Aucune requête de plus, aucun SQL, pas encore de dépliage.
  Test : vrai composant rendu dans Chromium (React de l'index, 5 cavalières
  simulées, son image) à 390 et 320 px et en arabe : aucune erreur, aucune
  largeur qui déborde (largeur de page = largeur d'écran), nom long coupé
  proprement.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-452 (contient 451).
· (453) 27/09, 23 h 40 — PAGE « CAVALIERS DE L'ÉCURIE », ÉTAPE 2 : L'APERÇU
  DÉPLIABLE (photos, sans J'aime). Blandine : « Ok continue », puis
  « plutôt des albums et si pas d'albums du mur ». EcranCavaliersClub SEUL.
  - DEUX lectures groupées pour toutes les cavalières affichées (jamais une
    par cavalière) :
    1) albums_cheval, cible in « cavalier:<id> », visibilite = "public",
       seulement les albums créés par la cavalière (user_id = id du mur) ;
    2) commentaires, cible in « cavalier:<id> » (son mur), seulement SES
       publications (user_id = id du mur), jamais prive.
    Filtre téléphone : pas de vidéo (estUrlVideo + Mux), seulement des
    adresses web, marqueur « #cadre » retiré (urlNue), sans doublon.
  - Par cavalière : ALBUMS s'il y en a, SINON MUR. Les 3 plus récentes (albums
    récents d'abord, derniers ajouts d'abord) — le tri par J'aime = étape 3.
    Anciennes lignes « média en plus » du mur (cible post:<id>) : non lues.
  - Carte : zone identité (toucher = profil, comme avant) + à droite un
    CHEVRON seulement s'il y a au moins une photo, sinon « Voir le profil › ».
    Deux boutons séparés (aucun bouton dans un bouton ; le chevron arrête
    le toucher). Une seule carte ouverte à la fois ; 2e toucher = referme.
  - Aperçu : séparateur discret, « SES MOMENTS », 1 photo = pleine largeur
    (100 px de haut), 2 = côte à côte, 3 = une ligne (86 px) ; écart 7 px,
    coins 10 px, miniatures vignetteHype, loading lazy ; « Voir le profil › ».
    Pas de plein écran, pas de J'aime (étape 3).
  - Erreur de lecture : dite sous la liste (« Les aperçus photos n'ont pas pu
    être lus : … »), jamais avalée.
  - TEXTES NOUVEAUX, 7 langues : « Ses moments », « Aperçu » (lecteur
    d'écran), message d'erreur.
  Test : vrai composant dans Chromium, données simulées : album public
  (3 photos + 1 vidéo écartée + marqueur retiré) → 3 photos ; mur seul →
  1 photo ; photo privée écartée (2 au lieu de 3) ; publication écrite par
  quelqu'un d'autre ignorée ; album privé + texte seul → pas de chevron ;
  une seule carte ouverte ; 2e toucher referme. Aucune erreur console.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-453 (contient 452).
· (454) 27/09, 23 h 55 — PAGE « CAVALIERS DE L'ÉCURIE », ÉTAPE 3 : LES J'AIME.
  Blandine : « Ok. Continue ». EcranCavaliersClub SEUL.
  - Lus SEULEMENT quand on déplie une carte (geste de la personne, jamais une
    boucle sur la liste), puis gardés en mémoire (re-déplier = aucune lecture).
    · photos d'ALBUMS : photo_likes, PAR PHOTO ; on cherche l'adresse telle
      qu'enregistrée ET sans marqueur « #cadre » ; une même personne n'est
      comptée qu'une fois par photo ; paquets de 100 adresses, 300 photos max
      (au-delà : pas de total affiché, pour ne pas mentir) ;
    · photos du MUR : likes_cartes « post:<id> », PAR PUBLICATION (les photos
      d'une même publication ont le même nombre) ; paquets de 150.
  - Tri : J'aime décroissants, puis la plus récente, puis l'ordre d'origine.
  - Petit « ♥ N » dans l'angle d'une photo seulement si N > 0.
  - Titre : « SES MOMENTS LES PLUS AIMÉS » s'il y a au moins un J'aime, sinon
    « SES MOMENTS » (pas de promesse fausse).
  - Ligne sous les photos : albums « N photos · N J'aime » ; mur
    « N publications · N J'aime » (toutes ses publications publiques de son
    mur, texte compris, et leurs J'aime). À droite : « Voir le profil › ».
    Pendant la lecture : cases sombres à la place des photos, pas de chiffres.
    Échec : « J'aime non lus : <raison> », photos dans l'ordre récent.
  - TEXTES NOUVEAUX, 7 langues : « Ses moments les plus aimés », photo(s),
    publication(s), J'aime (singulier/pluriel), « J'aime non lus : ».
  Test : vrai composant dans Chromium, données simulées : album (4 photos dont
  une avec marqueur, 4 J'aime dont un doublon même personne) → « 4 photos ·
  3 J'aime », ordre ♥2, ♥1, 0 ; mur (3 publications, dont une texte seul avec
  1 J'aime) → « 3 publications · 3 J'aime », ordre ♥2 puis les plus récentes ;
  aucun J'aime → « Ses moments », « 1 publication · 0 J'aime ». Aucune erreur.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-454 (contient 453).
· (455) 27/09, 23 h 30 — PAGE « CAVALIERS DE L'ÉCURIE » : UN SEUL RÔLE PAR
  ENDROIT. Blandine : « voir le profil et déplier sont au même endroit, on
  s'y perd », puis « A ».
  FAIT (EcranCavaliersClub seul) : à droite de la carte, SEULEMENT le chevron
  (déplier) quand elle a au moins une photo ; sans photo, rien. Toucher la
  photo ou le nom ouvre le profil, pour toutes les cavalières (inchangé).
  « Voir le profil › » ne reste que dans l'aperçu déplié.
  Aucun texte nouveau, aucun SQL. Test : rendu Chromium (cavalière avec
  photos → chevron ; sans photo → rien à droite), aucune erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-455 (contient 454).
· BUILD 20260927-456 — CLARIFICATION DES ACTIONS SUR LES CARTES DES CAVALIERS
  (brief ChatGPT, prévu comme « 455 » ; numéroté 456 car le 455 = retrait de
  « Voir le profil » à droite, déjà livré).
  - La photo et l'identité ouvrent le profil (ouvrir(p), inchangée).
  - Lorsqu'un aperçu photographique existe, la commande « Ses moments ⌄ »
    (⌃ une fois ouverte, même texte) ouvre ou ferme UNIQUEMENT cet aperçu :
    vrai bouton type=button, frère de la zone identité, aria-expanded,
    aria-label selon l'état (« Voir ses moments » / « Masquer ses moments »),
    44 px minimum, preventDefault + stopPropagation, champagne 11 px, sans
    fond ni cadre, un peu plus pâle fermée (0,82), pas d'espacement de
    lettres en arabe.
  - Sans photo, aucune commande de dépliage n'est affichée.
  - « Voir le profil › » reste disponible dans l'aperçu ouvert.
  - TEXTES NOUVEAUX, 7 langues : « Ses moments » (Highlights, Sus momentos,
    I suoi momenti, 思い出, Momente, لحظات) + les deux aria-label.
  - Aucune requête, aucun SQL et aucun changement de données.
  Test Chromium (vrai composant) : 390 et 320 px + arabe — 3 commandes pour
  3 cavalières avec photos, aucune pour celle sans photo ; commande 102 × 44
  (60 × 44 en arabe) ; toucher la commande déplie sans ouvrir le profil ;
  aria-expanded / aria-label corrects ; nom long tronqué, commande visible ;
  largeur de page = largeur d'écran ; aucune erreur.
  Remarque (non traitée, hors périmètre) : en arabe, la ligne « @identifiant »
  s'aligne à gauche (dir auto du 452).
  node --check OK (18 blocs), un seul marqueur. Build 20260927-456 (contient 455).
· (457) 27/09, 23 h 40 — PAGE « CAVALIERS DE L'ÉCURIE » : LIGNE « @IDENTIFIANT »
  EN ARABE. Blandine : « Ok continue » (suite de la remarque du 456).
  EcranCavaliersClub seul, une ligne : le « dir auto » du 452 est remplacé
  par un <bdi dir="ltr"> autour de « @identifiant · ville ». En arabe, la
  ligne s'aligne désormais sous le nom (à droite) et garde son sens de
  lecture (@ambre.feinn · Itteville). Autres langues : aucun changement.
  Test Chromium : arabe et français, aucune erreur, largeur OK.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-457 (contient 456).
· (458) 27/09, 23 h 50 — PAGE ÉCURIE : BANDEAU POUR LES VISITEURS NON
  CONNECTÉS. Demande du 27/09 (« quand la personne va dessus on met un message
  pour qu'il se connecte ou crée un compte ») ; Blandine : « Ok continue ».
  EcranGuilde seul. Nouvel état visiteurG (null = inconnu, true = visiteur,
  false = connectée), lu une fois par utilisateurActuel() au montage.
  Visiteur : carte en haut de la page « Bienvenue sur Hype » + « Connecte-toi
  ou crée ton compte pour retrouver ton écurie, ses rendez-vous et ses
  moments. » + deux boutons 44 px : « Se connecter » (AUTH_MODE_SPECTRAL =
  "connexion") et « Créer un compte » (AUTH_MODE_SPECTRAL = "inscription"),
  puis écran « connexion » (modes déjà existants). Connectée : rien ne change.
  Rien n'est ouvert aux visiteurs (la page reste vide pour eux). La fiche
  d'un rendez-vous ouverte par un lien passe toujours par-dessus.
  ⚠️ Non fait : après connexion, retour automatique sur le rendez-vous du lien.
  TEXTES NOUVEAUX, 7 langues : titre, phrase, « Se connecter », « Créer un
  compte ».
  Test : le bandeau rendu dans Chromium (React de l'index) à 320 px (fr),
  390 px (de, ar) : aucun débordement, bouton « Créer un compte » → mode
  inscription, aucune erreur. La page Écurie entière n'a pas pu être rendue
  hors de l'appli.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-458 (contient 457).
· BUILD 20260927-459 — RETOUR AU RENDEZ-VOUS PARTAGÉ APRÈS AUTHENTIFICATION
  (brief ChatGPT validé).
  RELEVÉ : #r=<id> lu UNE fois au démarrage (CIBLE_DIRECTE → window.__agendaFiche
  = id, écran « guilde ») ; AgendaClubHype ouvre la fiche puis efface la note ;
  le hash reste dans l'adresse (pas de replaceState, un seul écouteur
  hashchange ailleurs) ; boutons du 458 → AUTH_MODE_SPECTRAL puis écran
  « connexion » ; connexion réussie = apresConnexion() → setEcran("dashboard") ;
  inscription avec session → setEcran("intro") (questions d'accueil) ;
  inscription avec confirmation e-mail → mode « confirmation », pas de session ;
  AUCUN système de retour après connexion n'existait.
  - Lorsqu'une personne arrive par un lien #r=<id>, la destination est
    conservée temporairement dans sessionStorage (clé hype_retour_apres_auth,
    valeur { type: "r", id }), SEULEMENT si aucune session n'existe à
    l'arrivée (sinon toute ancienne valeur est effacée). Identifiant accepté :
    lettres, chiffres, « - » et « _ », 80 caractères au plus.
  - Après une CONNEXION réussie, le rendez-vous partagé est rouvert
    automatiquement : window.__agendaFiche = id puis écran « guilde » (la même
    mécanique que le lien #r, rien de dupliqué ; la fiche passe par-dessus).
  - ÉCART VOULU avec le brief : après une INSCRIPTION créant une session, les
    questions d'accueil se déroulent comme avant ; le retour a lieu à la
    première arrivée sur l'accueil (effet dans Router, drapeau
    window.__hypeRetourApresInscription). Sauter ces questions aurait changé
    le parcours des nouvelles inscrites.
  - Sans destination mémorisée, la navigation après authentification reste
    inchangée (accueil).
  - La destination est supprimée AVANT la redirection afin d'éviter toute
    boucle. Mot de passe faux, erreur, abandon : rien n'est consommé.
    Valeur illisible, vide ou de mauvais type : supprimée, navigation normale.
  - Aucune donnée personnelle, aucun token et aucune session ne sont stockés
    manuellement.
  - Limite : sessionStorage n'est pas partagé si une confirmation
    d'inscription est ouverte dans un autre onglet ou un autre navigateur (cas
    habituel : le lien du mail s'ouvre dans Safari). La destination reste alors
    dans l'onglet d'origine et sert si la personne s'y connecte.
  - Rendez-vous supprimé : la fiche dit « Ce rendez-vous n'existe plus » (443),
    sans boucle.
  - Aucun SQL et aucune nouvelle requête de données (une lecture de session
    locale, getSession, à l'arrivée par un lien).
  Test simulé (fonctions réelles, stockage simulé) : arrivée visiteur →
  mémorisé ; mot de passe faux → conservé ; connexion → id rendu et effacé ;
  2e passage → rien (pas de boucle) ; déjà connectée → rien gardé ; valeur
  illisible / mauvais type / identifiant invalide → supprimé, rien rendu.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-459 (contient 458).
· (460) 28/09, 0 h 00 — PAGE « CAVALIERS DE L'ÉCURIE » : LES CAVALIÈRES
  RETIRÉES DE L'ÉCURIE N'Y APPARAISSENT PLUS. Blandine : « Ok continue »
  (dette listée : la liste ignorait ecurie_cavaliers_exclus).
  CONSTAT : la page Écurie (EcranGuilde) retire les exclues depuis le 06/09
  (cavaliersExclusEcurie(monClub)) ; la page Cavaliers ne le faisait pas →
  une cavalière retirée restait listée (et son aperçu photos avec).
  FAIT (EcranCavaliersClub seul) : même fonction, même nom d'écurie (clubC =
  monClub), une seule lecture, appliquée juste après la liste et avant le tri.
  Échec de lecture : liste inchangée (comme la page Écurie), raison en console.
  NON FAIT, volontairement : hypeCavaliersDuClub lit toujours jusqu'à 2000
  profils ; la fonction sert à ~15 écrans, la changer = chantier à part
  (probablement avec SQL, à valider).
  Test Chromium (vrai composant, 4 cavalières dont 1 exclue) : 3 affichées,
  « 3 cavalières », lecture faite avec « Écurie Feinn ». Aucune erreur.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-460 (contient 459).
· BUILD 20260927-461 — PAGE « CAVALIERS DE L'ÉCURIE » : CORRECTION VISUELLE
  APRÈS LE TEST IPHONE (brief ChatGPT validé). EcranCavaliersClub seul.
  DIAGNOSTIC DE L'IMAGE : le dépôt n'est pas visible d'ici. Sur la capture,
  le haut est exactement la couleur de secours (#15120F) prévue quand l'image
  manque → l'image NE SE CHARGE PAS. Le chemin du code est
  url(images/FOND_CAVALIERS_ECURIE.webp), relatif à index.html, même
  convention que les autres images (images/…). Fichier livré vérifié : WEBP
  1400 × 787, 99 846 octets, nom sans espace, majuscules exactes. Cause la
  plus probable : fichier pas encore poussé dans images/ (ou nom différent).
  À faire par Blandine : pousser images/FOND_CAVALIERS_ECURIE.webp.
  Aucune image créée ni renommée.
  - Le voile noir a été allégé (0,12 en haut → 0,16 au milieu → 0,68 → fond),
    l'image est largement visible au milieu.
  - La hauteur du haut de page a été rééquilibrée : bandeau 212 px (au lieu
    de 250) + zone du haut de l'iPhone ; la liste commence plus tôt.
  - Les cartes reçoivent un léger relief anthracite/pétrole : dégradé
    #151A1B → #101415, bordure champagne 0,22, reflet pétrole intérieur
    discret, ombre douce ; avatar avec liseré champagne 0,42 et ombre chaude
    légère ; « @identifiant · ville » en #A7ADB0 (plus lisible), <bdi> gardé.
  - Le texte « Ses moments » est remplacé par un chevron seul (19 px,
    champagne, 0,8 fermé / 1 ouvert) ; bouton 44 × 44, aria-expanded et
    aria-label traduit conservés, preventDefault/stopPropagation conservés.
  - Les actions profil et dépliage restent séparées ; sans photo : rien à
    droite.
  - Arabe : plus d'espacement de lettres sur le titre.
  - Aucune requête, aucun SQL et aucune donnée modifiés (lectures :
    albums_cheval, commentaires, likes_cartes, photo_likes — inchangées).
  Test Chromium avec le VRAI fichier image, à 390 et 320 px et en arabe :
  image chargée et visible (trois cavalières reconnaissables, non étirée),
  titre lisible, bouton 44 × 44 sans texte, nom long tronqué, largeur de page
  = largeur d'écran, aucune erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-461 (contient 460).
· (462) 28/09, 5 h 40 — PAGE « CAVALIERS DE L'ÉCURIE » : COULEURS DE LA PAGE
  GALOPS + TOUCHER LA CARTE POUR DÉPLIER + BOUTON PROFIL À DROITE.
  Blandine (captures Galops + Cavaliers) : « adapte plutôt dans ces couleurs-là,
  les couleurs de la page cavalier là c'est très laid, et retire le bouton des
  moments ; il vaudrait mieux que ça se déplie quand on clique dessus si ça
  doit se déplier, et qu'à droite on ait un bouton pour accéder à son profil ».
  (Remplace les choix de couleurs et de commande des 452 à 461.)
  EcranCavaliersClub seul :
  - Palette Galops : fond #050B12, cartes dégradé #0C1820 → #070E14, liserés
    turquoise rgba(32,217,245,0.22) (0,45 + halo quand ouverte), accent
    #5FE9F0, titre « LES CAVALIERS » bleu glacé #A8F0F5 avec halo, nom de
    l'écurie gris bleuté, avatars cerclés turquoise. Plus aucun champagne.
  - Toucher la carte (photo + nom) : déplie / replie l'aperçu s'il y a des
    photos (aria-expanded sur la zone) ; sinon ouvre le profil.
  - À droite, pour TOUTES : un rond turquoise avec une silhouette = ouvre le
    profil (vrai bouton, 44 × 44, aria-label « Voir le profil » traduit,
    stopPropagation). La commande « Ses moments » / chevron est retirée.
  - « Voir le profil › » reste dans l'aperçu déplié ; une seule carte ouverte.
  - Aucune lecture, aucun tri, aucun compteur modifiés. Aucun texte nouveau.
  IMAGE DU BANDEAU : toujours absente chez elle (capture de 5 h 30, qui montre
  encore « Ses moments » = version d'avant le 461). Le code suit le même modèle
  que FOND_SANTE / JOURNAL_CARNET_FOND / FOND_HEYBABY, qui s'affichent → le
  fichier n'est pas au bon endroit ou pas sous le bon nom sur GitHub.
  Test Chromium (vraie image, 390 / 320 px, arabe) : toucher une carte avec
  photos la déplie sans ouvrir le profil ; carte sans photo → profil ; bouton
  profil sur chaque carte ; aucune largeur qui déborde ; aucune erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-462 (contient 461).
· (463) 28/09, 5 h 45 — PAGE « CAVALIERS DE L'ÉCURIE » : BLEU NUIT, GRIS ET
  BLANC, PLUS DE TURQUOISE. Blandine : « au secours, reste plus dans les tons
  bleu nuit dégradé gris et blanc que turquoise ».
  EcranCavaliersClub seul : accent blanc cassé #E3E9EE ; tous les liserés et
  halos turquoise → gris-blanc très transparent ; cartes en dégradé bleu nuit
  → gris ardoise (#15212C → #0B131B → #0A1016) ; avatars sur fond ardoise ;
  titre « LES CAVALIERS » blanc (plus de halo turquoise) ; nom de l'écurie
  gris clair. Comportements du 462 inchangés (toucher = déplier, rond de
  droite = profil). Aucune lecture ni texte modifiés.
  Test Chromium (390 / 320 px, arabe) : aucun turquoise affiché, aucune
  erreur, aucun débordement.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-463 (contient 462).
· (464) 28/09, 6 h 20 — PAGE « CAVALIERS DE L'ÉCURIE » : L'IMAGE DU BANDEAU EST
  EMBARQUÉE DANS index.html. Blandine (capture de 6 h 11, couleurs du 463 bien
  en ligne) : « ça n'apparaît toujours pas l'image ».
  CONSTAT : le code pointait vers images/FOND_CAVALIERS_ECURIE.webp, même
  modèle que les autres fonds qui s'affichent → le fichier n'est pas trouvé
  sur le site (dossier, nom — elle l'a reçu en minuscules — ou cache du
  téléphone). Plutôt que de dépendre du fichier : l'image (webp 1000 × 562,
  qualité 72, ≈ 50 Ko, ≈ 68 Ko en texte) est mise dans une constante globale
  HYPE_FOND_CAVALIERS_ECURIE, juste avant EcranCavaliersClub, et le bandeau
  l'utilise. PLUS AUCUN FICHIER À POUSSER pour ce fond (celui d'images/, s'il
  y est, ne sert plus).
  Test Chromium SANS aucun fichier image : l'image s'affiche ; 390 / 320 px,
  arabe ; aucune erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-464 (contient 463).
· (465) 28/09, 6 h 25 — PAGE « CAVALIERS DE L'ÉCURIE » : TOUCHER LA CARTE DÉPLIE
  TOUJOURS. Blandine : « on arrive toujours sur le profil quand on clique sur
  l'onglet au lieu de dérouler, et d'arriver sur le profil en cliquant sur le
  bouton à droite ». CAUSE : au 462, une carte SANS photo trouvée ouvrait le
  profil — et presque toutes ses cavalières sont dans ce cas (leurs photos
  sont ailleurs : mur de l'écurie, albums des chevaux).
  EcranCavaliersClub seul : toucher la carte déplie / replie TOUJOURS
  (aria-expanded) ; seul le rond de droite ouvre le profil. Sans photo, la
  partie dépliée dit « Pas encore de moments partagés. » + « Voir le profil › ».
  Une seule carte ouverte à la fois (inchangé). Lectures inchangées.
  TEXTE NOUVEAU, 7 langues : « Pas encore de moments partagés. »
  Test Chromium : carte sans photo → dépliée, profil NON ouvert, message
  affiché ; carte avec photos → dépliée, profil non ouvert ; rond de droite →
  profil. Aucune erreur.
  À PRÉVOIR (proposé le 27/09, option B) : chercher aussi ses photos sur le mur
  de l'écurie et dans les albums de ses chevaux, sinon la plupart des cartes
  resteront « Pas encore de moments partagés ».
  node --check OK (18 blocs), un seul marqueur. Build 20260927-465 (contient 464).
· (466) 28/09, 6 h 30 — PAGE « CAVALIERS DE L'ÉCURIE » : BOUTON PROFIL = ICÔNE
  DORÉE SEULE. Deux maquettes montrées (A icône dorée seule, B dans un fin
  cercle doré) ; Blandine : « juste icône dorée ». EcranCavaliersClub seul :
  le rond gris-blanc du 462/463 est retiré ; la silhouette passe à 21 px, en
  doré #D2B278 (seule touche dorée de la page). Zone tactile 44 × 44,
  aria-label « Voir le profil », stopPropagation : inchangés.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-466 (contient 465).
· (467) 28/09, 11 h 55 — VISIONNEUSE DE LA FICHE CHEVAL : LE COMMENTAIRE D'UNE
  PHOTO S'AFFICHAIT SOUS LES AUTRES. Blandine (3 captures : même commentaire
  « 😂😂 géniale celle là » et même ❤ 1 sous trois photos différentes).
  DIAGNOSTIC EN BASE (sa requête) : photo_comments → UNE seule ligne, adresse
  précise (…/photos/7c38219b…/1788465706114.jpeg, cible cheval:964eacf2…) →
  l'ENREGISTREMENT est juste, c'est l'AFFICHAGE qui garde l'état de la photo
  précédente. Relecture du code : chaque ouverture / glissement recharge bien
  par adresse (effet [visionneuse] → chargerLkCm) ; cause exacte non
  reproduite d'ici (réponse tardive d'une photo précédente qui écrase la
  suivante = hypothèse la plus probable).
  GARDE-FOU (EcranCheval seul, visionneuse) : cmPourRef retient la photo pour
  laquelle commentaires et J'aime sont chargés ; toute réponse arrivée pour une
  autre photo est ignorée ; les J'aime repartent de zéro à chaque changement
  (plus de « ❤ 1 » hérité) ; un effet de secours recharge si la photo affichée
  ≠ photo chargée. Enregistrement, droits, base : inchangés.
  Test simulé : réponse lente de la photo A + rapide de B → l'écran finit sur
  B (aucun commentaire, 0 J'aime).
  NON TOUCHÉ : la visionneuse des albums (AlbumsCheval) a le même schéma ; à
  traiter de la même façon si le défaut y apparaît.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-467 (contient 466).
· (468) 28/09, 13 h 40 — PAGE PHOTOS D'UN CHEVAL : LES ALBUMS DES AUTRES
  CAVALIÈRES, EN LECTURE SEULE, SOUS LES SIENS (option « C »).
  Blandine : sur la page Photos de Dakota, elle ne voyait que son album, pas
  celui de Margot, alors que les photos de Margot s'affichaient dans la frise.
  CAUSE : règle du 02/09 (EcranCheval → AlbumsCheval mesAlbumsSeulement : chacune
  ne voit que ses albums), alors que ChronologieSouvenirs montre TOUS les
  albums publics.
  FAIT (AlbumsCheval seul, seulement avec mesAlbumsSeulement) : sous la rangée
  de ses albums, une rangée « Albums des autres cavalières » (7 langues) avec
  les albums PUBLICS des autres, déjà lus par listerAlbumsCheval (aucune
  lecture de plus). Ils sont marqués __lecture (drapeau existant) → tous les
  outils de modification déjà gardés par ce drapeau disparaissent, et
  albumAutorise refuse toute écriture ; étoile « à la une » cachée. Ils
  s'ouvrent normalement pour regarder (visionneuse, J'aime, commentaires).
  Albums privés des autres : jamais montrés (filtre de listerAlbumsCheval).
  Fiche commune / écurie (sans mesAlbumsSeulement) : inchangée.
  Non testé en rendu (composant trop lié à l'appli) : node --check seulement.
  SUITE DÉCIDÉE (rien de codé) — PROPOSER UNE PHOTO À L'ALBUM D'UNE AUTRE :
  seules les cavalières DE L'ÉCURIE peuvent proposer (Blandine : « que les
  cavalières de l'écurie oui ») ; en attendant la réponse, la photo va dans un
  album automatique de celle qui propose, public ; si la propriétaire accepte,
  la photo entre aussi dans son album. SQL à montrer avant de coder.
  EN ATTENTE : nom de l'album automatique ; après acceptation, la photo reste
  ou non dans l'album automatique.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-468 (contient 467).
· (469) 28/09, 13 h 40 — PAGE « LES CHEVAUX DE L'ÉCURIE » (EcranEcurieHype,
  anciennement « Écurie Hype ») : FLÈCHE RETOUR EN HAUT À GAUCHE. Blandine :
  « mets la petite flèche en haut à gauche pour revenir en arrière ».
  Même pastille (.ec2btn, 40 px) que « + » et « ⋮ » à droite, à la même
  hauteur ; chevron gauche ; aria-label « Retour » (7 langues, texte déjà
  existant ailleurs). Action : écran précédent (ctx.retourEcran si
  ctx.peutReculer), sinon page Écurie (« guilde »). Le titre a déjà 100 px de
  marge de chaque côté : rien ne se chevauche.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260927-469 (contient 468).
· (470) 28/09, 14 h 00 — PROPOSER UNE PHOTO À L'ALBUM D'UNE AUTRE CAVALIÈRE,
  ÉTAPE 1 (côté de celle qui propose). Blandine : « Ok continue ».
  ⚠️ PRÉALABLE : le SQL « albums_propositions » (table + 4 policies, montré le
  28/09 à 13 h 35) doit être passé AVANT de pousser ce build ; sinon la photo
  va bien dans son album mais la proposition échoue, avec un message qui le dit.
  CHOIX PAR DÉFAUT (annoncés, modifiables) : album automatique nommé
  « <prénom> · <nom du cheval> », public ; si la propriétaire accepte, la
  photo RESTE aussi dans l'album automatique.
  FAIT (AlbumsCheval seul + une ligne dans les notifications) :
  - Album d'une autre ouvert (lecture seule, 468), page d'un CHEVAL : encart
    « ＋ Proposer une photo » + « La photo ira aussi dans ton propre album,
    visible par toutes. » SEULEMENT si elle est de la même écurie que le cheval
    (hypeMemeClub sur profil.ecurie / ecurie2 vs chevaux.club ; une lecture
    chevaux nom + club par fiche).
  - Choix de 1 à 5 photos → son album automatique est créé s'il n'existe pas
    (creerAlbumCheval, public), la liste est relue, puis l'envoi passe par
    importerFichiers (quotas, compression, rattachement atomique : inchangés ;
    nouveau 3e paramètre facultatif apresAjout(url) appelé pour chaque photo
    réellement rattachée) → une ligne albums_propositions (album_id, photo_url ;
    auteur et « attente » posés par la base) par photo ; doublon (23505)
    ignoré.
  - Si au moins une proposition part : notification « proposition_album » à la
    propriétaire (cible = le cheval, extrait = nom de l'album) + « Proposition
    envoyée ». Échec : message avec la raison, en précisant que la photo est
    bien dans son album.
  - Notifications : nouveau libellé « te propose une photo pour ton album
    « … » » (7 langues).
  TEXTES NOUVEAUX, 7 langues : « Proposer une photo », la phrase d'aide, les
  deux messages d'erreur, le libellé de notification.
  RESTE (étape 2) : chez la propriétaire, voir les propositions de son album
  avec Accepter (→ album_ajouter_media) / Refuser.
  Non testé en rendu (composant trop lié à l'appli) : node --check seulement.
  node --check OK (18 blocs), un seul marqueur. Build 20260927-470 (contient 469).
· (471) 28/09, 13 h 40 — PAGE ACTUALITÉ DE LA CAVALIÈRE : LES VIDÉOS N'AVAIENT
  PAS DE VIGNETTE. Blandine : « Sur les dernières publications on ne voit pas
  les photos ni les vidéos sur la page actualité du cavalier ».
  Cause : dans EcranActualiteCavaliere, vignette(po) posait le RÉSULTAT de
  hypeMiniatureVideo(u) (un élément React) dans le src d'une <img> →
  « [object Object] » → image cassée masquée par onError.
  Correctif : l'élément est rendu tel quel dans une case 72 × 72 arrondie (image
  Mux + picto ▶). Photos inchangées.
  SQL albums_propositions relancé par erreur : « policy … already exists » =
  déjà en place depuis le premier passage, rien à faire.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-471 (contient 470).
· (472) 28/09, 13 h 45 — PAGE ACTUALITÉ : TOUCHER LA VIGNETTE OUVRE EN GRAND.
  Blandine : « au moins une image couverture de la vidéo et un lien pour la
  lire quand on clic dessus » ; choix B (vidéos ET photos).
  Visionneuse existante hypeCalquePhoto (lecture vidéo, zoom photo, croix),
  nouvel état visuA. Le toucher de la vignette ne remonte pas à la carte
  (stopPropagation) : ailleurs sur la carte, on va toujours à la publication.
  Aucun texte nouveau, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-472 (contient 471).
· (473) 28/09, 14 h 00 — PROPOSER UNE PHOTO, ÉTAPE 2 (côté de la PROPRIÉTAIRE).
  Blandine : « Ok continue ».
  Dans AlbumsCheval (page photos d'un cheval), au-dessus de « Albums » : encart
  « Photos proposées (N) » quand des cavalières ont proposé des photos pour
  SES albums de ce cheval (albums_propositions, statut « attente » ; même
  habillage que « Albums proposés »). Chaque ligne : vignette, nom de l'album,
  « proposée par <pseudo> », ✓ et ×.
  - ✓ : la photo entre dans l'album (hypeAlbumAjouterMedia → RPC
    album_ajouter_media, chemin atomique habituel ; « déjà là » compte comme
    ok), puis statut « accepte » + repondu_le (si la colonne manque, statut
    seul). Albums relus.
  - × : statut « refuse ».
  - Réponse VÉRIFIÉE (une ligne doit revenir), sinon message avec la raison.
  - La photo reste dans l'album automatique de celle qui l'a proposée (choix 470).
  PAS FAIT (à décider) : prévenir celle qui a proposé que sa photo est acceptée.
  TEXTES NOUVEAUX, 7 langues : « Photos proposées », « proposée par »,
  « Accepter », « Refuser », « Photo ajoutée à l'album », « Proposition
  refusée », deux messages d'erreur, « aucune ligne modifiée ».
  Aucun SQL. Non testé en rendu : node --check seulement.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-473 (contient 472).
· (474) 28/09, 14 h 10 — NOTIFICATIONS DES PROPOSITIONS DE PHOTOS.
  Blandine : « Oui notification disant Blandine te propose deux photos pour ton
  album par exemple ».
  - Proposition : la notification porte le NOMBRE de photos (champ contexte) →
    « X te propose 2 photos pour ton album « … » » (une seule : « une photo »,
    comme avant ; les anciennes notifications sans nombre restent au singulier).
  - Acceptation : nouvelle notification « proposition_acceptee » à celle qui a
    proposé → « X a ajouté ta photo à son album « … » » (une par photo
    acceptée). Rien en cas de refus. Toucher = page du cheval.
  TEXTES NOUVEAUX, 7 langues : les deux libellés. Aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-474 (contient 473).
· (475) 28/09, 14 h 15 — RETIRER UNE CARTE DE SA PAGE ACTUALITÉ.
  Blandine : « faudrait qu'on puisse masquer ou effacer une publication …
  (effacer uniquement sur la page actualité) … avec une petite croix en haut à
  droite ». Choix A : définitif, pas de liste pour remettre.
  SQL PASSÉ PAR ELLE le 28/09 à 13 h 47 (« Success. No rows returned ») :
  table actualite_masques (user_id par défaut auth.uid(), cle, created_at ;
  clé primaire user_id + cle) ; RLS : lecture pour tous, ajout et retrait par
  soi seulement.
  - Croix discrète à droite de la date, sur SA page seulement (utilisateur
    connecté = la cavalière de la page). Toucher → confirmation dans la carte
    « Retirer de ton actualité ? » (+ « La publication reste là où elle a été
    postée. » pour une publication) avec Retirer / Annuler.
  - Retirer = une ligne actualite_masques : « post:<id> » ou « res:<id> » pour
    un concours. La publication N'EST PAS effacée (reste sur son mur) ; le
    concours reste sur la page Résultats.
  - À la lecture de la page, les cartes retirées sont filtrées pour tout le
    monde. Erreur → message en haut de la page.
  TEXTES NOUVEAUX, 7 langues : « Retirer », « Retirer de ton actualité ? »,
  « La publication reste là où elle a été postée. », « Annuler », message
  d'erreur.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-475 (contient 474).
· (476) 28/09, 14 h 05 — PAGE CAVALIER : LES DEUX GROS BOUTONS SOUS « MES CHEVAUX »
  DISPARAISSENT. Blandine : « normalement les boutons ajouter un cheval et voir
  tout devaient disparaître et être remplacés par la case du milieu » ;
  maquette A/B montrée, choix B (conséquence annoncée : ses chevaux au-delà
  des 8 de la grille ne sont plus visibles sur cette page ; ceux de l'écurie
  restent accessibles par la carte du milieu).
  Sur SA page, quand la carte du milieu existe (clubCarteMil) :
  - barre « + Ajouter un cheval / Voir les autres (N) » retirée ;
  - case « Ajouter un cheval » de la grille retirée (compte non premium) ;
  - « + Ajouter » en petit en haut à droite du titre « Mes chevaux », à gauche
    de « Gérer mon écurie › » (même style de lien).
  Inchangé : profil visité (« Voir les autres » reste), cavalière sans écurie
  (pas de carte du milieu → boutons d'avant).
  TEXTE NOUVEAU, 7 langues : « Ajouter ». Aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-476 (contient 475).
· (477) 28/09, 14 h 50 — PAGE ACTUALITÉ DE LA CAVALIÈRE AU DESSIN DE LA PAGE
  « ACTUALITÉS » DE L'ÉCURIE. Blandine : « tu peux faire pour la page actualité
  du cavalier le même design / présentation de page que sur la page actualité
  de l'écurie » ; maquette montrée → SANS étiquettes ; « on peut laisser les
  derniers résultats » → concours gardés (seulement ceux mis en ligne et non
  décochés, comme avant) ; « On continue ».
  EcranActualiteCavaliere seul (MurHype non touché) :
  - Tête : grande photo = la plus récente de son fil (hors vidéo ; toucher =
    en grand), pseudo en petit turquoise, « ACTUALITÉS », son écurie
    (profiles.ecurie ajouté à la lecture). Sans photo : même tête sans fond.
    Flèche retour en haut à gauche.
  - Cartes publication : colonne de photos à gauche (1/2/3 cases ; photo =
    en grand, vidéo = lecture), titre (1re ligne) + une ligne de description,
    avatar + nom + temps relatif, ♡ (aimer / ne plus aimer, likes_cartes
    « post:<id> ») et nombre de réponses. Le reste de la carte ouvre la
    publication, comme avant.
  - Cartes concours : même forme, bord doré ; colonne gauche = place, « sur N »,
    SF ; concours, épreuve · cheval, 🏆 date. Toucher = page Résultats.
  - Croix « Retirer » (475) en haut à droite de chaque carte, sur SA page
    seulement ; même confirmation.
  - Étiquettes « A publié / Identifiée par » retirées.
  Lectures en plus : avatars des autrices identifiantes, likes_cartes et
  réponses (commentaires) des publications affichées, en une fois chacune.
  Testé en rendu (Playwright, données simulées) : sa page (4 croix +
  confirmation), visite en arabe (aucune croix).
  TEXTES NOUVEAUX, 7 langues : « Actualités », « sur », « Concours ».
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-477 (contient 476).
· (478) 28/09, 16 h 00 — VISIONNEUSE DES ALBUMS : MÊME GARDE QU'AU 467.
  Blandine : « gère la visionneuse ». AlbumsCheval, chargerLikesEtCommentaires :
  cmPourRefAlb retient la photo pour laquelle J'aime, commentaires et
  identifications de commentaires sont chargés ; toute réponse d'une autre
  photo (arrivée en retard) est jetée ; filet (effet sans dépendances) :
  photo affichée ≠ photo chargée → on recharge. Symptôme évité : un
  commentaire qui reste sous les photos suivantes.
  Aucun texte, aucun SQL. Build 20260928-478 (contient 477).
· (479) 28/09, 16 h 05 — « DERNIERS RÉSULTATS » (page Cavalier) : PLUS DE BLOC
  VIDE POUR LES VISITEURS. Blandine : « oui fais ». Quand la cavalière a tout
  décoché avec « Choisir », une visiteuse ne voit plus « Aucun résultat
  affiché » : la section disparaît. Elle-même garde le bloc (« Tu as masqué…
  Choisir ») pour réafficher. Sans aucun résultat mis en ligne : déjà masqué
  pour tout le monde (inchangé).
  Aucun texte, aucun SQL. Build 20260928-479 (contient 478).
· (480) 28/09, 16 h 10 — PAGE « CAVALIERS DE L'ÉCURIE » : SOURCES DE PHOTOS
  ÉLARGIES. Blandine : « oui fais ». Toujours « albums d'abord, sinon le mur »
  (choix du 453), toujours seulement ce qu'elle a créé, public :
  - ALBUMS = ses albums de profil (« cavalier:<elle> ») + ses albums sur les
    fiches des chevaux (« cheval:<id> ») ;
  - MUR = son mur + ses publications sur les murs d'écurie, club,
    rendez-vous, cheval (pas les réponses « post: », pas les privées, pas ce
    qu'elle a posté sur le mur d'une autre cavalière).
  Lectures groupées par user_id (albums 800, publications 1500 au plus).
  Les J'aime (454) marchent pareil (photo_likes pour les albums,
  likes_cartes « post:<id> » pour le mur).
  Testé en rendu (données simulées) : album de cheval compté, album posé
  sur le profil d'une autre ignoré, publication d'écurie comptée, doublon
  ignoré.
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-480 (contient 479).
  EN ATTENTE : bouton de test « Transformé » (« laisse pour l'instant ») ;
  modèle de story d'événement (attend son image de fond PNG).
· (481) 28/09, 16 h 10 — LES CAVALIÈRES D'UN CLUB SONT TRIÉES DANS LA BASE.
  Question de Blandine (« j'ai à peine 40 comptes comment il en charge 2000 ») :
  2000 = plafond ; l'appli téléchargeait tous les profils ayant une écurie,
  puis triait sur le téléphone. Choix B (« Ok B »).
  hypeCavaliersDuClub appelle d'abord la fonction SQL
  hype_cavaliers_du_club(p_nom) → identifiants des cavalières de CE club
  (comparaison souple identique à hypeMemeClub/noyauEcurie : accents,
  majuscules, ponctuation, mots « écurie, club, centre, équestre, de, la… »
  ignorés, l'un contenu dans l'autre ; repli sur le nom brut si le noyau est
  vide), puis lit seulement ces profils. Le tri de l'appli reste en filet :
  résultat identique à avant. Fonction absente ou en erreur → ancien chemin.
  SQL PASSÉ PAR ELLE le 28/09 à 16 h 11 (« Success. No rows returned »), en
  SECONDE version : la 1re échouait (« function extensions.unaccent(text) does
  not exist » : unaccent absent de ce schéma) → accents retirés par
  translate() (àâäáãåçéèêëíìîïñóòôöõúùûüýÿ), sans extension. Fonctions
  hype_cle_ecurie(text) (immutable) et hype_cavaliers_du_club(text) (security
  invoker = mêmes droits qu'avant), grant execute à anon et authenticated.
  « œ » / « æ » non convertis, comme dans l'appli (noyauEcurie ne les
  convertit pas non plus) : comportement identique.
  Vérif. par elle (16 h 32) : select count(*) from
  hype_cavaliers_du_club('Ecurie Feinn') → 21.
  ⚠️ TROUVÉ EN PASSANT, NON CORRIGÉ (hors périmètre, à décider) : trois appels
  demandent les profils SANS les colonnes ecurie/ecurie2 (fiche d'un
  rendez-vous du club, partage d'un conseil du carnet, Hey Baby) → le filet
  les écarte tous → ces trois listes sont TOUJOURS VIDES, depuis le 16/09 au
  moins. Inchangé dans ce build.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-481 (contient 480).
· (482) 28/09, 16 h 40 — ONGLETS DE LA PAGE CAVALIER ALIGNÉS SUR CEUX D'UN
  CHEVAL. Blandine : « Histoire / performances / progression / photo / vidéo /
  actualité ? Et on retire l'onglet théorie, l'accès aux galops est déjà
  possible depuis la page performance » ; choix A pour les destinations.
  - Ordre : Histoire · Performances · Progression · Photos · Vidéos ·
    Actualité (grille 3 × 2, même dessin de tuile).
  - Histoire (nouvelle tuile, icône cœur) → page du récit (memoirescavalier,
    la même que « Lire la suite » ; gère déjà la visite).
  - Photos → NOUVELLE page EcranPhotosCavaliere (route « photos-cavalier »,
    window.__photosCavaliereId) : copie de la page Vidéos (352/353) avec les
    PHOTOS : ses publications (écurie, club, rendez-vous, cheval), albums de
    ses chevaux (possédés + rattachés ; privés seulement pour l'autrice), ses
    albums de profil « cavalier:<elle> », publications où elle est
    identifiée (acceptées). Grille 3 colonnes, toucher = en grand.
  - Théorie retirée (la page Galops reste accessible ailleurs).
  - En visite : Progression grisée avec cadenas (369), inchangé.
  Testé en rendu (données simulées) : page Photos (doublons et vidéos
  écartés). Tuiles : node --check seulement.
  TEXTES NOUVEAUX, 7 langues : « Histoire », « Aucune photo publiée pour
  l'instant. ». Aucun SQL. Build 20260928-482 (contient 481).
· (483) 28/09, 16 h 45 — LES TROIS LISTES DE CAVALIÈRES TOUJOURS VIDES.
  Blandine : « oui répare » (bug trouvé au 481). hypeCavaliersDuClub ajoute
  d'office ecurie et ecurie2 aux colonnes demandées si elles manquent → la
  fiche d'un rendez-vous du club, le partage d'un conseil du carnet et Hey
  Baby reçoivent enfin les cavalières de l'écurie. Autres appels inchangés.
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-483 (contient 482).
· (484) 28/09, 16 h 50 — LA PAGE « HISTOIRE » (ex « Hype Memories »).
  Maquette montrée ; Blandine : « oui ok pour chevaux de cœur et on retire les
  albums souvenirs qui iront sur la page photo », « l'encart retire-le il est
  déjà sur progression », « on peut en mettre jusqu'à 6 ? ».
  EcranMemoiresCavalier :
  - tête : grande photo (sa photo de profil) sur toute la largeur, fondu
    sombre, prénom en petit, « HISTOIRE », écurie · ville ; flèche retour ;
  - récit : lettrine dorée ; au-delà de 420 signes, coupé + « Lire tout › /
    Réduire » ; bouton Modifier inchangé ;
  - REPÈRES (calculés, aucune saisie) : Galop (SA page seulement, donnée
    personnelle ; ctx.profil.galopActuel s'il est un nombre), Concours et
    Victoires (resultats mis en ligne, place 1), Chevaux (possédés +
    rattachés). Une case absente si la donnée manque ;
  - « Mes chevaux de cœur » (« Ses… » en visite) : grille 3 par ligne,
    toucher = fiche du cheval ; 6 au plus, POUR L'INSTANT LES 6 PREMIERS
    (choix manuel proposé, en attente de sa réponse) ;
  - ALBUMS retirés → en tête de la page Photos (même composant AlbumsCheval
    « cavalier:<id> ») ; encart Conseils Hey Baby retiré.
  Testé en rendu (données simulées). TEXTES NOUVEAUX, 7 langues : Lire tout,
  Réduire, Galop, Concours, Victoires, Chevaux, Mes/Ses chevaux de cœur.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-484 (contient 483).
· (485) 28/09, 17 h 00 — CHOISIR SES CHEVAUX DE CŒUR. Blandine : « ok oui 1 »
  (choix A : bouton « ✎ Choisir », jusqu'à 6).
  SQL PASSÉ PAR ELLE le 28/09 à 16 h 47 (« Success. No rows returned ») :
    alter table public.profiles add column if not exists chevaux_coeur jsonb;
  (la mise à jour de son propre profil est déjà autorisée par les policies
  existantes : c'est le chemin de majProfil.)
  Page Histoire, SA page seulement : « ✎ Choisir » à droite du titre → feuille
  du bas avec TOUS ses chevaux (possédés + rattachés), cases numérotées dans
  l'ordre coché, 6 au plus (les autres grisés une fois 6 atteints),
  Annuler / Enregistrer. Enregistrer = update profiles.chevaux_coeur (liste
  d'identifiants) vérifié (la ligne doit revenir), sinon message avec la
  raison dans la feuille. Affichage : l'ordre choisi ; liste vide ou colonne
  absente → les 6 premiers (comme au 484) ; un cheval qui n'est plus le sien
  disparaît tout seul.
  Testé en rendu (données simulées) : décocher, cocher, enregistrer, ordre.
  TEXTES NOUVEAUX, 7 langues : Choisir, « Coche jusqu'à 6 chevaux »,
  Enregistrer, Annuler, « Choix non enregistré : ».
  node --check OK (18 blocs), un seul marqueur. Build 20260928-485 (contient 484).
· (486) 28/09, 17 h 15 — « PARTAGER EN STORY » SUR LA FICHE D'UN RENDEZ-VOUS.
  Demande et choix de Blandine : story « dans le genre du pêle-mêle du Mur des
  souvenirs », sur SON fond (logo Hype en haut ; image embarquée en webp dans
  la page, HYPE_FOND_STORY, ~41 Ko : aucun fichier à pousser) ; ses modèles
  ChatGPT ne sont PAS utilisés tels quels (cadres figés dans l'image, trop
  petits) : mises en page reproduites par nous ; « on peut s'arrêter à 6
  photos » ; « tout le monde peut partager » ; @ RETIRÉS.
  - FicheEvenementClub : bouton doré pleine largeur « ✦ Partager en story »
    sous « Me prévenir / Partager » → HypeStoryEvenement (plein écran).
  - Photos : publications du fil « agenda:<id> » (hors privées ; photo_url +
    medias ; vidéos par leur image Mux), puis l'affiche (image_url) ; sans
    doublon. 6 plus récentes cochées d'office, grille à cocher (6 max,
    numéros), aperçu redessiné à chaque changement.
  - Image 1080 × 1920 sur canvas (hypeDessinerStory) : fond « cover », 1 à 6
    polaroïds (HYPE_STORY_MISES, une mise en page par nombre, 5 compris),
    bord doré + scotch ; sans photo : un polaroïd vide. Cadre de texte en
    bas : titre (Cinzel, réduit s'il est trop long), « date · heure · lieu »
    (italique doré, date dans la langue de l'appli), écurie ; « 2HYPE.FR ».
  - Partager : menu de partage de l'iPhone avec le fichier JPEG (Instagram,
    Enregistrer l'image…) ; sinon téléchargement ; échec → message +
    « appui long sur l'image pour l'enregistrer ». Photo refusée par le
    navigateur (protection) → message « décoche-la ».
  Testé en rendu (Playwright, données simulées) : image générée, privée
  écartée. Pas testé sur iPhone (partage réel, photos Supabase/Mux).
  TEXTES NOUVEAUX, 7 langues : Partager en story, Ta story, Préparation…,
  Choisis jusqu'à 6 photos, Partager, deux messages d'erreur.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-486 (contient 485).
  À VENIR (demande de Blandine, 17 h 10) : croiser ces modèles avec ceux des
  stories de l'appli (dans les deux sens) — il faut le fichier du module
  story (story.html / JS compagnon), absent d'ici.
· (487) 28/09, 17 h 25 — STORY D'UN RENDEZ-VOUS : LES 28 MODÈLES DE L'APPLI + TEXTE
  MODIFIABLE. Blandine : « on peut ajouter les modèles des story aussi pour le
  partage des événements » ; choix A (leur décor + nos photos + NOTRE cadre de
  texte par-dessus) ; « mais que ça puisse être modifiable si on le souhaite ».
  - Bande de choix en haut de la fenêtre : « Hype » (nos polaroïds, 1–6) puis
    les modèles du catalogue window.HYPE_MODELES (hype-modeles-db.js, déjà
    chargé par l'appli) avec leur nombre de fenêtres. Décor = « /<clé>.webp »
    à la racine (même origine : dessin sur canvas autorisé).
  - Dessin : décor ajusté à 1080 × 1920 (contain, centré) ; chaque photo
    passe SOUS le décor, tournée comme sa fenêtre (angle tiré des « coins »),
    remplie « cover », découpée au « contour » exact ; fenêtres sans photo
    laissées vides ; bandeau de texte plus bas et plus opaque (il PEUT couvrir
    le bas d'une fenêtre basse — signalé à Blandine).
  - « ✎ Modifier le texte » : trois champs (titre, date · lieu, écurie),
    pré-remplis, + « Revenir au texte d'origine ». Aperçu redessiné 350 ms
    après la dernière frappe.
  - Décor introuvable → « Ce modèle n'a pas pu être chargé. Choisis-en un
    autre. »
  Testé en rendu avec un faux modèle (fenêtre penchée + ronde) et un titre
  modifié. Les vrais décors ne sont pas testés d'ici (fichiers sur le site).
  TEXTES NOUVEAUX, 7 langues : Modifier le texte, Titre, Date · lieu, Écurie,
  Revenir au texte d'origine, « ce modèle en prend », message de décor.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-487 (contient 486).
· (488) 28/09, 17 h 35 — NOS POLAROÏDS DEVIENNENT 6 MODÈLES DE STORY DE L'APPLI.
  Blandine : « à l'inverse ajouter ceux-là aux modèles pour les story »,
  « oui vas-y ». hype-stories.js N'EST PAS TOUCHÉ : il lit le catalogue
  window.HYPE_MODELES (hype-modeles-db.js), et un modèle = un décor webp à la
  racine + son entrée (règle écrite en tête du catalogue).
  - 6 décors 1080 × 1920 (modele-hype-1.webp … modele-hype-6.webp, 58 à 80 Ko) :
    son fond au logo, polaroïds bord doré + ombre + scotch, petit cœur doré ;
    l'intérieur de chaque polaroïd est TRANSPARENT (fenêtre), le scotch reste
    opaque par-dessus. Zone des photos 400 → 1720 px (sous le logo).
  - hype-modeles-db.js : +6 entrées (taille, fenêtres : coins, contour 4 pts,
    bbox, aire_pct) → 34 modèles ; en-tête complété.
  - index.html : ?v=5 → ?v=6 sur hype-modeles-db.js (les téléphones
    rechargent le catalogue) ; la fenêtre « Partager en story » n'affiche pas
    ces 6-là (déjà présents en première case « Hype »).
  FICHIERS À POUSSER À LA RACINE : modele-hype-1.webp à modele-hype-6.webp,
  hype-modeles-db.js, index.html, SUIVI.md.
  node --check OK (18 blocs + catalogue), un seul marqueur.
  Build 20260928-488 (contient 487).
· (489) 28/09, 17 h 40 — STORY D'UN RENDEZ-VOUS : LES PHOTOS ENTIÈRES, JAMAIS
  COUPÉES. Blandine : « assure-toi qu'on voit bien les photos dedans en entier
  sans qu'elles soient coupées ou qu'on puisse les bouger dedans ».
  hypePhotoEntiere : la photo est posée ENTIÈRE (contain) dans son polaroïd ou
  dans la fenêtre d'un modèle ; le vide autour est rempli par la même photo
  agrandie et floutée (via une copie de 24 px, Safari n'ayant pas ctx.filter),
  légèrement assombrie — même principe que les stories de l'appli (19af).
  Remplace les deux dessins « cover » (polaroïds et fenêtres des modèles).
  Stories de l'appli : rien à faire, hype-stories.js sait déjà mettre la photo
  entière sur son flou (19af) et la recadrer fenêtre par fenêtre (19r) — les
  6 modèles Hype du 488 en profitent.
  Testé en rendu (données simulées). Aucun texte, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-489 (contient 488).
· (490) 28/09, 17 h 50 — MON CARNET : UNE VIDÉO DÈS LA CRÉATION D'UNE SÉANCE.
  Blandine (enregistrement d'écran 17 h 37) : « ça nous oblige à enregistrer
  et revenir », puis l'iPhone ouvre la caméra au lieu de proposer ses vidéos.
  - « Ajouter une vidéo » est affiché AUSSI sur une séance pas encore
    enregistrée. La vidéo choisie est gardée de côté (vidAttente) avec un
    encart « 🎬 <nom> — Elle partira dès que tu enregistres la séance. » et
    une croix ; à « Enregistrer », dès que la séance a son identifiant,
    l'envoi part (même chemin Mux qu'au 436, fonction extraite en
    envoyerVideoCarnetFichier(f, idSe)) et l'encart d'envoi (Titi) s'affiche
    dans la séance.
  - La caméra : c'est le menu de l'iPhone (Photothèque / Prendre une vidéo /
    Choisir le fichier) — il s'affiche sur le bouton, et « Prendre une vidéo »
    tombe sous le doigt. Non modifiable par l'appli ; expliqué à Blandine
    (choisir « Photothèque »).
  TEXTES NOUVEAUX, 7 langues : message d'attente, « Vidéo », « Retirer ».
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-490 (contient 489).
· (491) 28/09, 18 h 10 — LE DRAPEAU DES LANGUES SUR LES PAGES CAVALIER ET ÉCURIE.
  Blandine : « on peut avoir le changement de langue aussi au-dessus des pages
  cavalier, écurie et de leurs onglets ? j'ai l'impression qu'on ne l'a que
  sur l'accueil » ; « Ok » (en haut à droite là où il y a de la place, à côté
  des boutons déjà présents sinon).
  Nouveau composant HypeDrapeauLangue : le même rond (38 px) et la même liste
  verticale des 7 drapeaux que sur l'Accueil ; setLangue de l'appli (langue
  pour toute l'appli, comme avant).
  Posé en haut à droite de : page Cavalier, Histoire, Performances
  (Résultats), Progression (Mon apprentissage), Photos, Vidéos, Actualité ;
  page Écurie (décalé à 64 px : le bouton photo du club est déjà à droite),
  Les cavaliers de l'écurie, Actualités de l'écurie, Agenda du club ; « Les
  chevaux de l'écurie » : DANS la rangée « + ⋮ », en premier.
  Testé en rendu (page Photos : ouverture de la liste, changement de langue).
  Autres pages : node --check seulement.
  Aucun texte nouveau (drapeaux), aucun SQL. node --check OK (18 blocs), un
  seul marqueur. Build 20260928-491 (contient 490).
· (492) 28/09, 18 h 35 — PARTAGER UNE PAGE. Blandine : « comment on peut faire pour
  partager une page ? » ; « Ok » sur la proposition (bouton à côté du drapeau ;
  le lien ouvre la bonne page ; sans compte : connexion puis retour sur la
  page ; le privé reste privé).
  - Bouton rond « partager » (HypeBoutonPartagerPage), à gauche du drapeau :
    page Cavalier (lien #p=<id>), Actualité (#pa=), Photos (#pp=), Vidéos
    (#pv=) d'une cavalière ; page Écurie (#ec=<club>, décalé à 110 px) ;
    « Les chevaux de l'écurie » (#ec=, dans la rangée « + ⋮ ») ; « Les
    cavaliers de l'écurie » (#cc=<club>) ; Actualités de l'écurie
    (#ea=<club>). Menu de partage de l'iPhone (hypePartager existant) ;
    sinon lien copié + « Lien copié ».
  - ⚠️ La page Écurie montre toujours SA propre écurie à chacune : son lien
    ouvre donc « Les chevaux de l'écurie » du club partagé (vitrine).
  - Ouverture : hypeResoudreLienPage(fam, val) pose les variables de la page
    (CIBLE_DIRECTE, nouvelles familles AVANT les anciennes règles, qui ne
    bougent pas). Sans session : le lien est mémorisé (sessionStorage
    « hype_retour_apres_auth », type « page ») et rouvert après connexion ou
    inscription (mêmes deux crochets que le 459) ; hypeConsommerRetourAuth
    laisse désormais un retour « page » intact.
  - Fiche d'un cheval : NON touchée, elle a déjà « Générer un lien ».
  - Le privé : rien de nouveau n'est lu ; chaque page garde ses règles
    (Progression privée, photos privées, carnet).
  Testé : résolution des liens et mémorisation après connexion (tests
  unitaires). Boutons : node --check seulement.
  TEXTES NOUVEAUX, 7 langues : « Partager », « Lien copié ». Aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-492 (contient 491).
· (493) 28/09, 19 h 55 — LA PAGE ÉCURIE PARTAGÉE MONTRE L'ÉCURIE PARTAGÉE. Blandine :
  « pour la page Écurie on peut pas partager plutôt l'écurie du partage ? »,
  « l'idée c'est justement de pouvoir partager une écurie précise avec ses
  chevaux, ses cavaliers, ses résultats ».
  Nouvelle famille #eg=<club> : window.__guildeEcurie = club → écran
  « guilde ». C'est le MÊME mécanisme que le classement des clubs et la
  carte de la 2e écurie (clubForce dans EcranGuilde) : la page Écurie
  s'ouvre sur CE club (chevaux, cavaliers, résultats, agenda…), pour tout le
  monde. Le bouton « partager » de la page Écurie envoie désormais #eg= (au
  492 : #ec=, la vitrine des chevaux, qui reste pour « Les chevaux de
  l'écurie »). Mémorisé après connexion comme les autres familles.
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-493 (contient 492).
· (494) 28/09, 20 h 05 — HEY BABY PASSE DANS PROGRESSION ; LES QUÊTES SUR LE SEUL
  COMPTE DE BLANDINE. Blandine : « on peut retirer le lien vers Hey Baby depuis
  la page cavalier et l'ajouter plutôt sur le menu progression ? », « à la
  limite réutilise le texte de l'encart de Hey Baby de la page accueil », « et
  on peut basculer l'encart les quêtes temporairement sur mon compte ».
  - Page Cavalier : la grande carte Hey Baby est retirée (code gardé, éteint).
  - Page Progression (Mon apprentissage), « Mes outils pour apprendre » :
    4e ligne « Hey Baby » / « Mon coach virtuel » (mots de la carte de
    l'Accueil, 7 langues) / « Poser une question » → écran « assistant ».
    Même forme que les 3 lignes du dessus, pictogramme étoile.
  - Page Cavalier : la carte « Tes quêtes » n'apparaît plus que sur le compte
    Feinn (estCompteFeinnHype), en attendant. Rien n'est supprimé.
  TEXTES NOUVEAUX, 7 langues : Mon coach virtuel, Poser une question.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-494 (contient 493).
· (495) 28/09, 20 h 15 — « MES QUÊTES » PASSE SUR LA PAGE MON COMPTE. Blandine :
  « en fait je voulais dire de le basculer sur la page Mon compte, mais c'est
  bien qu'elle soit aussi visible uniquement de mon compte connecté », « pour
  l'onglet mes quêtes ».
  - Page Cavalier : la carte « Tes quêtes » est retirée (le 494 la limitait
    au compte Feinn ; l'état estFeinnMC reste lu, sans effet).
  - Page Mon compte (EcranMonCompte) : la même carte, titrée « Mes quêtes »
    (badge de niveau, barre et XP, toucher = écran « quetes »), juste avant
    « Supprimer mon compte », visible SEULEMENT sur le compte Feinn
    (estCompteFeinnHype(user)).
  TEXTE NOUVEAU, 7 langues : « Mes quêtes » (My quests, Mis misiones…). Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-495 (contient 494).
· (496) 28/09, 21 h 00 — PAGE ÉCURIE : DE L'AIR SOUS LES 6 ONGLETS. Blandine
  (capture) : « laisse plus d'espace entre le bas des 6 onglets et l'onglet
  suivant ». Marge sous la grille Cavaliers / Chevaux / Agenda / Actualités /
  Souvenirs / Santé : 2 → 30 px (avant « La philosophie du club »).
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-496 (contient 495).
· (497) 28/09, 21 h 05 — CLASSEMENT DES CLUBS MASQUÉ, TEMPORAIREMENT. Blandine :
  « est-ce que tu peux temporairement masquer le classement des clubs tant qu'il
  n'y a pas assez de cavaliers ».
  Nouvelle constante HYPE_CLASSEMENT_CLUBS_VISIBLE = false (à côté de
  estCompteFeinnHype). Masqués pour TOUT LE MONDE (son compte compris) :
  - page Communauté : le titre « Classement des clubs », la liste et « Voir les
    autres clubs » ;
  - page Écurie : le cristal du rang (#N) à droite du nom du club (une colonne
    vide le remplace, le nom reste centré).
  Le podium (PodiumClubsHype) n'était déjà plus affiché nulle part. Rien n'est
  supprimé ; rallumer = passer la constante à true. Les calculs continuent en
  arrière-plan (inchangés).
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-497 (contient 496).
· (498) 28/09, 21 h 08 — LE CRISTAL DU RANG REVIENT SUR LA PAGE ÉCURIE. Blandine :
  « tu peux laisser la petite icône sur la page de l'écurie mais masque juste
  sur la page communauté ». Seule la page Communauté garde le classement
  masqué (HYPE_CLASSEMENT_CLUBS_VISIBLE = false). Le cristal ouvre toujours
  Communauté (la page s'ouvre en haut, la section étant masquée).
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-498 (contient 497).
· (499) 28/09, 21 h 30 — « MON RÉCIT » (page Cavalier) SUR SON IMAGE DE CHEVAL.
  Blandine : maquette avec son image (tête de cheval noir à droite) ; choix B
  (le texte comme aujourd'hui) « en essayant de préserver la tête du cheval en
  entier à droite ». Pour toutes les pages Cavalier (siennes et visites).
  - Image embarquée (HYPE_FOND_RECIT, webp 1230 × 500, ~19 Ko) : aucun
    fichier à pousser.
  - Posée en <img> calée en bas à droite, hauteur = celle de l'encart mais
    plafonnée à 290 px : la tête entière tient toujours à droite, même avec
    un long récit ; si l'encart est plus haut, le haut de l'image est fondu
    (mask) dans le fond #05080c.
  - Fondu sombre de gauche à droite ; le texte n'occupe que 56 % de la
    largeur (jamais sur la tête), ombre portée légère ; lettrine dorée.
  - Titre, trait, bouton « Modifier mon récit / Lire la suite » inchangés.
  Testé en rendu (récit court et long). Aucun texte, aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-499 (contient 498).
· (500) 28/09, 22 h — MON RÉCIT : NOUVELLE IMAGE VERTICALE, TEXTE PLUS PETIT,
  BADGE PREMIUM ADMIN NON FLOTTANT. Blandine envoie une image verticale de
  Hey Baby + un brief ChatGPT (tête couverte par le texte, police trop grande,
  lignes de 2-3 mots, encart trop haut, badge Premium sur le titre), avec
  « t'es pas obligé de tout suivre ».
  - HYPE_FOND_RECIT remplacée par l'image verticale (webp 640 × 800, ~14 Ko),
    calée en bas à droite, hauteur plafonnée à 360 px, fondu à gauche.
  - Dégradé plus sombre à gauche, image bien visible sur le tiers droit.
  - Colonne de texte : 64 % de la largeur (au lieu de 56 %), la tête reste libre.
  - Texte du récit : 13,5 px, interligne 1,45, blanc cassé #E6E2D8, retours
    à la ligne naturels ; lettrine dorée retirée. Encart minHeight 250.
  - Le bouton admin Premium/Gratuit (visible seulement pour les modérateurs)
    passe de « fixed » à « absolute » : il ne flotte plus sur le titre
    « Mon récit » quand on fait défiler.
  - Non appliqué : la liste à puces ✨ du brief (Blandine avait choisi B, le
    texte tel quel).
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-500 (contient 499).
· (501) 28/09, 22 h 15 — MON RÉCIT : IMAGE DE L'ŒIL, MOINS DE RETOURS À LA LIGNE.
  Blandine envoie une nouvelle image (paysage, œil de cheval noir à droite) :
  « refais avec cette image là et essaye d'aller moins à la ligne… les
  phrases devraient tenir pour la plupart sur leur ligne ».
  - HYPE_FOND_RECIT = son image recadrée sur la tête (webp 384 × 440, ~15 Ko),
    calée à droite, centrée en hauteur, 180 px max, bords haut/bas/gauche fondus.
  - Colonne de texte : 74 % de la largeur (au lieu de 64 %), texte 13 px,
    interligne 1,42 ; dégradé sombre décalé en conséquence ; encart
    minHeight 180 (au lieu de 250) → carte nettement moins haute.
  - Testé en rendu à 375, 390 et 430 px : l'œil reste dégagé, les phrases
    courantes tiennent sur une ligne (une phrase longue peut encore passer
    sur deux à 375 px).
  Aucun texte, aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-501 (contient 500).
· (502) 28/09, 22 h 40 — PAGE CAVALIER : NOUVEAU BLOC « MES AMIS » (maquette de
  Blandine + brief ChatGPT). Choix A : « Voir tout » ouvre la Communauté (aucune
  page « tous mes amis » n'existe) ; le tri des suggestions par vraie écurie est
  reporté (« on avisera après »).
  - Nouveau composant HypeAmisVitrine, propre à la page Cavalier.
    EncartCavaliersSpectral (utilisé sur six autres pages) N'EST PAS TOUCHÉ.
  - En-tête : icône amis, « MES AMIS » / « SES AMIS » en visite, « LA TEAM
    <pseudo> », nombre réel d'amis (même calcul qu'avant : amisDe / mesAmis),
    « Voir tout › » et « + Ajouter » (Ajouter absent en visite). Les deux ouvrent
    la Communauté, comme l'ancien bouton.
  - Grand visuel : la vraie photo de profil du cavalier choisi, entière à
    droite sur un fond flou de la même photo, fondu sombre à gauche ; sans
    photo, son initiale. Nom + « Voir le profil › » : ouvre sa page Cavalier
    avec la navigation existante (ouvrirCavAmi, inchangée).
  - Rangée de portraits ronds qui glisse (barre masquée, le suivant dépasse) :
    toucher un portrait le met en avant sans ouvrir le profil ; trait turquoise
    sous le portrait actif.
  - Retirés de la page Cavalier : la rangée « À découvrir », le grand bouton
    « Ajouter » et la carte « N cavaliers dans ta team ».
    Note : l'état `suggestions` (listerCavaliers) reste chargé mais n'est plus
    affiché ici — non nettoyé (hors périmètre).
  - Arabe : tout s'inverse (photo à gauche, flèches ‹). Textes nouveaux dans
    les 7 langues (La team…, Cavaliers, Voir tout, Ajouter, Voir le profil,
    « Pas encore d'amis » en visite).
  - Testé en rendu à 375 / 390 / 430 px (fr), 375 px (ar, de) : aucun
    débordement de page, seule la rangée défile.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-502 (contient 501).
· (503) 28/09, 22 h 30 — « MES AMIS » (page Cavalier) : « VOIR TOUT » RETIRÉ, BLOC PLUS
  PETIT. Blandine : « Voir tout et ajouter c'est la même chose non ? » → choix A
  (retirer « Voir tout », la rangée qui glisse montre déjà tout le monde) ;
  « réduis en hauteur et en taille de police l'onglet mes amis ».
  - HypeAmisVitrine : bouton « Voir tout » et prop onVoirTout retirés ; seul
    « + Ajouter » reste (Communauté), sur une seule ligne d'en-tête.
  - Réductions : titre 16 → 13,5 px, équipe 9 → 8, nombre 22 → 17, icône 38 → 32,
    grand visuel 176 → 132 px de haut, nom 25 → 19, « Voir le profil » 44 → 36 px,
    portraits 62 → 48 px, prénoms 10,5 → 9 px, marges resserrées. Le bloc perd
    environ un tiers de sa hauteur.
  - Non fait (suggestions de ChatGPT, à proposer) : centrer le portrait choisi
    dans la rangée ; afficher le prénom plutôt que le pseudo.
  Testé en rendu 375/390/430 (fr), 375 (ar, de) : aucun débordement.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-503 (contient 502).
· (504) 28/09, 22 h 35 — « MES AMIS » : « VOIR LE PROFIL » DISCRET, PORTRAITS PLUS
  GRANDS, PORTRAIT CHOISI CENTRÉ. Blandine : « retire le truc qui entoure voir le
  profil et rends-le plus discret en bas de son onglet » ; « les deux » (centrer
  le portrait choisi + prénom au lieu du pseudo) ; « laisse les icônes rondes un
  peu plus grandes quand même ».
  - « Voir le profil › » : plus de cadre, petit texte gris clair (10,5 px) en bas
    à gauche du grand visuel (à droite en arabe) ; toujours ouvre le profil.
  - Portraits 48 → 56 px, prénoms 9 → 9,5 px.
  - Toucher un portrait le fait glisser au centre de la rangée (scrollIntoView,
    seulement au toucher : rien ne bouge à l'ouverture de la page).
  - EN ATTENTE : prénom au lieu du pseudo — la requête d'amis ne lit que
    `pseudo` ; avant d'ajouter une colonne, vérifier en base qu'une colonne
    prénom existe dans `profiles` (une requête SELECT demandée à Blandine).
  Testé en rendu 375/390/430 (fr), 375 (ar, de). Aucun SQL, aucun texte nouveau.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-504 (contient 503).
· (505) 28/09, 22 h 40 — PAGE CAVALIER : « GÉRER MON ÉCURIE › » RETIRÉ. Blandine :
  « le bouton gérer mon écurie en dessous il sert à rien si ? » → oui, doublon
  (il ouvrait `guilde`, la même page que l'onglet « Écurie » de la barre du bas)
  → « ok vire-le oui ».
  - Retiré aux deux endroits : à côté de « + Ajouter » (quand la carte du milieu
    existe) et dans le titre « Mes chevaux » (sinon). « + Ajouter » reste.
  - La page Écurie reste accessible par la barre du bas.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-505 (contient 504). Toujours en attente : le SELECT sur les
  colonnes de `profiles` pour afficher le prénom des amis.
· 28/09, 22 h 33 — (sans build) PRÉNOM DES AMIS : le SELECT montre qu'il n'existe
  AUCUNE colonne prenom / nom / first_name dans `profiles`. « MALICIA2008 » est le
  2e compte de Blandine (renommé automatiquement) : elle changera le pseudo
  elle-même. Pseudos longs sur deux lignes sous les portraits : « on verra plus
  tard ». Rien de modifié.
· (506) 28/09, 22 h 45 — PAGE CAVALIER : L'AMI MIS EN AVANT EST GARDÉ ; HAUTEUR DU
  DRAPEAU ET DU BADGE PREMIUM. Blandine : « à chaque fois il oublie l'ami que j'ai
  mis en gros » ; « j'ai un souci avec la hauteur des drapeaux et premium »
  (capture : Premium plus bas que la flèche retour, à cheval sur le bord gauche
  de la photo ; drapeau qui dépasse un peu à droite).
  - HypeAmisVitrine : le choix est gardé sur l'appareil (localStorage,
    clé hype_ami_vedette_<moi | id de la page visitée>). La liste d'amis arrive
    dans un ordre variable : sans ça, un autre ami prenait la place à chaque
    retour. Testé : le choix survit à un rechargement.
  - Badge admin Premium : même ligne que la flèche retour, juste à sa droite
    (left 60, top +18 : centré sur la flèche de 36 px). Visible par les
    modérateurs seulement, comme avant.
  - Drapeau : right 14 → 16, partage 60 → 62 (même retrait que la flèche retour,
    left 16), sur la page Cavalier seulement ; les autres pages ne bougent pas.
  - Suggestions de la Communauté : choix C de Blandine (liste du responsable
    d'écurie d'abord, puis nom d'écurie). Vérification en base demandée avant.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-506 (contient 505).
· (507) 28/09, 22 h 55 — COMMUNAUTÉ : SECTION « À DÉCOUVRIR » (cavaliers à suivre),
  OUVERTE DIRECTEMENT PAR « + AJOUTER » DU BLOC MES AMIS. Choix C de Blandine.
  - Vérification en base (pg_policies, 28/09) : ecurie_cavaliers_choisis a une
    politique « lecture publique » (SELECT true) → la liste est lisible par tous.
  - hypeSuggestionsCavaliers(24), dans cet ordre :
    1. SON ÉCURIE — d'abord la vraie liste : lignes ecurie_cavaliers_choisis
       « accepte » où elle est membre → leurs responsables + tous les membres
       acceptés de ces responsables (et les siens si elle est responsable) ;
       « en_attente » ignoré. Puis en complément le nom d'écurie des profils
       (hypeCavaliersDuClub sur son ecurie et ecurie2, même comparaison que la
       page Écurie). Étiquette « Ton écurie ».
    2. NOUVEAUX : derniersCavaliers(15), étiquette « Nouveau ».
    3. AUTRES : listerCavaliers(40), avec la ville ou l'écurie.
    Exclus : elle-même, ceux qu'elle suit (listeDesSuivis), ceux qu'elle a
    bloqués et ceux qui l'ont bloquée (si lisible ; erreur ignorée). Pas de
    « demandes en attente » : suivre est immédiat. Aucune colonne « profil
    masqué » n'existe dans le code : rien à filtrer de ce côté.
  - HypeADecouvrir : rangée de cartes (photo, pseudo, étiquette, bouton
    « + Suivre » → suivre(), devient « ✓ Suivi »). Toucher la photo ouvre le
    profil (ouvrirProfilPublic, inchangé). Placée juste avant « Personnes
    suivies » ; « + Ajouter » pose __communauteCible = "decouvrir" et la page
    y descend (même motif que le classement).
  - Inchangés plus bas : « Voir tout » des personnes suivies et « Nouveaux sur
    Hype » (doublons possibles avec la nouvelle section, à revoir si besoin).
  - Testé : ordre et exclusions sur données factices (en attente, suivi,
    bloqués dans les deux sens, soi-même : tous écartés) ; rendu à 375 px.
  - 7 langues : À découvrir, Ton écurie, Nouveau, Suivre, Suivi, Chargement…,
    « Personne à te proposer pour l'instant ».
  Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-507 (contient 506).
· (508) 28/09, 23 h — PAGE CAVALIER : BLOC « PUBLICATIONS » RETIRÉ, TUILE ACTUALITÉ
  GRISÉE « PROCHAINEMENT ». Blandine : « l'onglet publication on peut le retirer sur
  la page cavalier ? au besoin on le met sur actualités » → choix A (le mur ira sur
  Actualité, champ « Partage un moment… » compris), « et on gérera la page
  actualité après, pour l'instant laisse-la en grisé / prochainement ».
  - Le mur MurHype de la page Cavalier (sa page : cibleMoi ; en visite :
    cavalier:<id>, sans champ) n'est plus rendu ; appel gardé en commentaire.
    Les publications « cavalier:<id> » restent en base, rien d'effacé.
  - Tuile « Actualité » : grisée, « Prochainement », non cliquable (carteP sans
    action) ; allerActu reste dans le code. La page EcranActualiteCavaliere
    existe toujours (un lien partagé #pa= l'ouvre encore).
  - À FAIRE avec la refonte d'Actualité : y ajouter les publications
    « cavalier:<id> » (aujourd'hui non lues par cette page) et, sur sa propre
    page, le champ « Partage un moment… » (Photos, Vidéo).
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-508 (contient 507).
· (509) 28/09, 23 h 05 — PAGE CAVALIER, « MES CHEVAUX » : LES CHOIX D'ÉCURIE SUR UNE
  SEULE LIGNE. Blandine : « mettre les trois onglets Toutes, Écurie Feinn et SEP sur
  la même ligne que ça prenne pas trop de place (et dans des types d'écriture
  similaires) ».
  - Rangée en une ligne (plus de retour), « Toutes » passe en PREMIER.
  - Un nom qui finit par un sigle entre parenthèses s'affiche par ce sigle :
    « Societe d'Equitation de Paris (SEP) » → « SEP » (nom complet gardé en
    title / aria-label). Sans sigle, le nom se coupe avec « … » si besoin.
  - Même style pour les trois (inchangé : 11,5 px, gras, Montserrat) ; marge
    intérieure 13 → 12 px. Le filtre lui-même ne change pas (même valeur choisie).
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-509 (contient 508).
· (510) 28/09, 23 h 10 — PAGE CAVALIER : « MES AMIS » ALIGNÉ SUR « MES CHEVAUX ».
  Blandine : « aligner la typographie des titres, notamment Mes amis et Mes
  chevaux, et que les boutons Ajouter soient les mêmes (je préfère le titre et le
  bouton Ajouter de Mes chevaux) ».
  - Titre « MES AMIS » : Cinzel 15 px, espacement 1, capitales, #EDF2F5, poids
    normal — exactement le titre « Mes chevaux » (et « Derniers résultats »,
    déjà en Cinzel 15).
  - « + Ajouter » : texte turquoise #5FE9F0, 12 px, gras 600, Montserrat, sans
    cadre ni pastille — le même que celui de « Mes chevaux » (zone tactile 36 px).
    Il ouvre toujours « À découvrir » dans la Communauté.
  - Sous-titre « La team … » et nombre de cavaliers inchangés.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-510 (contient 509).
· (511) 28/09, 23 h 15 — « MES CHEVAUX » : LES TROIS CHOIX D'ÉCURIE RÉPARTIS SUR LA
  LIGNE. Blandine : « centralise et espace les onglets Toutes, SEP et Feinn, qu'ils
  se répartissent sur la ligne de façon équilibrée, laisse un peu plus d'espace
  avec les photos qui suivent, et ne sélectionne pas l'écurie choisie en bleu, le
  fait de l'entourer suffit ».
  - Chaque choix prend une part égale de la ligne (flex 1), texte centré ;
    écart 6 → 10 px ; espace sous la rangée 10 → 18 px.
  - Choix actif : plus de fond ni de texte turquoise ; seul le contour turquoise
    le signale (texte blanc cassé, les autres gris clair).
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260928-511 (contient 510).
· (512) 28/09, 23 h 20 — « MES AMIS » : GRAND VISUEL MOINS SOMBRE. Blandine :
  « assombris un peu moins de surface l'onglet de l'ami qui a la grande icône,
  pas plus que la moitié de la largeur ».
  - La photo de l'ami occupe désormais 62 % de la largeur à droite (à gauche en
    arabe), recadrée (cover, centre 30 %), fondue sur son premier cinquième.
    Avant : largeur = hauteur (≈ 40 % pour une photo carrée).
  - Voile sombre : s'arrête à 50 % de la largeur (avant 68 %), un peu plus
    léger (0,85 → 0,55 → 0) ; fond flou éclairci (luminosité 0,45 → 0,55).
  Testé en rendu 375/390/430 (fr), 375 (ar, de). Aucun SQL, aucun texte nouveau.
  node --check OK (18 blocs), un seul marqueur. Build 20260928-512 (contient 511).
· (513) 29/09, 1 h 10 — PAGE CAVALIER : FLÈCHE RETOUR, PREMIUM, PARTAGE ET DRAPEAU AU-
  DESSUS DE LA PHOTO. Blandine (capture) : « ils ne doivent pas être à l'intérieur de
  la photo mais en HAUT de la photo ».
  - Cause : la page n'avait pas de position « relative » ; ces quatre boutons
    (position absolue, haut + 14 px) se calaient donc sur un conteneur plus haut de
    l'appli et tombaient ~110 px trop bas, dans la photo (qui commence à haut + 62 px).
  - Correctif : position « relative » sur la racine de la page Cavalier. Les
    boutons se calent sur la page : haut + 14 / + 18 px, au-dessus de la photo.
    Rien d'autre ne bouge.
  - Pour info : la barre grise sous « Le mur des songes » est la bande du bandeau
    des stories (demandée le 17/08) — non touchée.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260929-513 (contient 512).
· (514) 29/09, 18 h 30 — FICHE D'UN RENDEZ-VOUS : L'AFFICHE SEULE N'APPARAISSAIT PAS.
  Blandine (3 captures, Open de Dressage SEP) : « quand j'ajoute un événement avec
  affiche, je l'ouvre et l'affiche disparaît ; je rajoute l'affiche en photo, elle
  n'apparaît toujours pas ; je la mets en avant et d'un coup les deux pop ».
  - Cause : avec UNE seule carte (l'affiche seule, choix du 20/09 (297) : pleine
    largeur, hauteur plafonnée), le bloc image avait « flex: 1 » (base 0) : cette
    base passait devant la hauteur demandée et la carte s'écrasait à 0 px — il ne
    restait qu'un trait. Avec deux cartes, le minimum de 250 px la faisait réapparaître.
    Reproduit en navigateur : 2 px avant, 448 px après.
  - Correctif : une carte seule garde sa hauteur (flex 0 0 auto). Rien d'autre ne
    change ; la grille à deux colonnes est identique.
  - L'affiche était bien enregistrée : rien à refaire en base. La photo ajoutée et
    mise en avant en double peut être retirée par le menu « ••• ».
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260929-514 (contient 513).
· (515) 29/09, 18 h 35 — PAGE CAVALIER : LES BOUTONS DU HAUT ENFIN AU-DESSUS DE LA PHOTO.
  Blandine (capture après le 514) : « tu étais supposé avoir remonté la ligne avec les
  drapeaux et Premium, je vois que ce n'est toujours pas le cas ».
  - ERREUR DU 513 (diagnostic incomplet) : la position « relative » ne suffisait pas.
    Vraie cause : la marge du haut de la photo (haut + 62 px) fusionnait avec la page
    (fusion des marges CSS) ; toute la page commençait donc 62 px plus bas et les
    boutons, calés sur elle, tombaient dans la photo.
  - Correctif : « display: flow-root » sur la racine de la page Cavalier, qui empêche
    cette fusion. Reproduit et vérifié en navigateur : boutons à 76 px avant, 14 px
    après ; la photo reste à 62 px (inchangée).
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20260929-515 (contient 514).
· (516) 29/09, 18 h 45 — PAGE HISTOIRE : LE RÉCIT AU DESIGN DE « MON RÉCIT » + « MES AMIS ».
  Blandine : « reproduire sur la page Histoire la mise en page et le design de mon
  histoire à la place de l'ancienne » ; « copier aussi Mes amis comme c'est sur la page
  Cavalier, en dessous ».
  - Carte du récit : même rendu que la carte « Mon récit » de la page Cavalier (image
    de l'œil HYPE_FOND_RECIT à droite, voile sombre, colonne de texte 74 %, 13 px,
    interligne 1,42, blanc cassé, sans lettrine). Texte ENTIER : le « Lire tout » à
    420 caractères est retiré (cette page sert à lire le récit). Bouton « Modifier /
    Écrire mon récit » et fenêtre d'édition inchangés.
  - « Mes amis » (HypeAmisVitrine) juste sous le récit, avant les repères : amis de la
    personne de la page (amisDe), « Ses amis » en visite (sans « + Ajouter »), même
    ouverture de profil, « + Ajouter » → « À découvrir ». L'ami mis en avant est le
    même que sur la page Cavalier (même mémoire). Le bloc de la page Cavalier reste.
  Aucun SQL, aucun texte nouveau (textes déjà traduits). node --check OK (18 blocs),
  un seul marqueur. Build 20260929-516 (contient 515).
· (517) 30/09, 1 h 40 — PAGE CAVALIER : LES DEUX CARTES D'ÉCURIE EN RECTANGLES
  HORIZONTAUX. Blandine : « faire les encarts des deux clubs moins hauts, plutôt
  horizontaux que carrés ».
  - Quand il y a deux écuries : format 1/1 → 3/2 (≈ 110 px de haut au lieu de 166 à
    375 px de large) ; le texte remonte en haut (marge du haut 46 → 12 px) et garde
    38 px à droite pour le crayon ; crayon 30 → 26 px, calé à 8 px du coin. Une carte
    s'allonge d'elle-même si le nom est long (« Societe d'Equitation de Paris (SEP) »).
  - Une seule écurie : carte pleine largeur inchangée.
  Maquette de comparaison faite en navigateur (carré / 3:2). Aucun SQL, aucun texte
  nouveau. node --check OK (18 blocs), un seul marqueur. Build 20260930-517 (contient 516).
· (518) 01/10, 0 h 35 — PAGE CAVALIER, « MES CHEVAUX » : CARTES ALIGNÉES SUR LA CARTE DU
  MILIEU. Blandine (capture, 2e rangée Boréalis / Les chevaux de l'écurie / Tully) :
  « on peut aligner toute la taille des cartes à celle du milieu ? ».
  - Constat mesuré sur sa capture : les cartes ont déjà toutes la même taille (4/5) ;
    c'est la photo de Boréalis qui était posée 2-3 px plus bas que la carte du milieu
    et que Tully.
  - Cause : chaque carte cheval est un bouton, et un bouton centre son contenu en
    hauteur. La ligne « ◇ Cheval de l'écurie » sous Tully est un peu plus haute (symbole
    ◇) : la rangée grandit et Boréalis se recentre plus bas. La carte du milieu était
    déjà collée en haut (align-self: start, (450)).
  - Correctif : align-self: start sur les cartes chevaux de la grille « Mes chevaux »
    (une ligne). Taille, noms, clics inchangés. Reproduit en navigateur : décalage
    5,5 px avant, 0 après.
  Aucun SQL, aucun texte nouveau. node --check OK (18 blocs), un seul marqueur.
  Build 20261001-518 (contient 517).
· (SQL) 01/10, 0 h 55 — GROUPES D'UN CLUB. ✅ PASSÉ PAR ELLE en deux parties (« Success »,
  la première tentative s'était coupée au collage, rien n'avait été créé).
  - Tables : groupes (id, club_clef, nom, cree_par, cree_le, unique club_clef+nom),
    groupes_membres (groupe_id, user_id, ajoute_par, ajoute_le), agenda_groupes
    (agenda_id → club_agenda, groupe_id, ajoute_par, ajoute_le). RLS : lecture ouverte ;
    ajout/retrait de membres et de rendez-vous = hype_peut_gerer_club du club du groupe ;
    un rendez-vous ne va que dans un groupe DU MÊME club ; création d'un groupe =
    hype_peut_gerer_club ; suppression = hype_est_proprietaire_club.
  - Groupe créé VIDE : « Team Compétition », club_clef « societe d'equitation de paris
    (sep) », id d135ec7f-2db1-4d5d-8103-2be2b8248d09. Choix B : elle ajoute les membres
    elle-même depuis la page.
  - Relevés du 01/10 : Aurélie a DEUX comptes (« Aurélie » SEP + Feinn, « Aurelie » SEP) ;
    garder celui qui a l'abonnement = « Aurélie » (avec accent).
  - ⚠️ À REGARDER PLUS TARD (hors Team) : l'abonnement d'« Aurélie » est « actif » mais
    expire_le = 22/09/2026 (dépassé) — renouvellement non enregistré ou statut pas remis à jour.
· (519) 01/10, 1 h 15 — PAGE « TEAM COMPÉTITION » (SEP), LIEN CACHÉ #team-competition.
  Maquette de Blandine suivie (hero, portraits ronds, UNE carte agenda, 3 lignes de
  résultats, 4 souvenirs), noir #060709 / or #D6B676 / ivoire #F4F1EA, titres Cormorant
  Garamond (déjà chargée), textes Montserrat. En-tête de la maquette NON recopié (Hype n'a
  pas d'en-tête commun) : flèche retour + drapeau de langue comme les autres pages ; barre
  du bas de Hype inchangée. Nouvelle fonction EcranTeamCompetition + route
  « team-competition » (table des adresses) + ligne d'affichage. Rien d'autre touché.
  - Hero : sa photo, images/TEAM_COMPETITION.webp (NOUVEAU FICHIER, 44 Ko) ; texte B.
  - Nos cavalières = membres du groupe ; clic → page Cavalier actuelle. Bouton « Gérer
    les membres » (propriétaire / gestionnaires SEP seulement) : liste des membres de la
    SEP, recherche, Ajouter / Retirer, refus de la base AFFICHÉ.
  - Nos chevaux = liste écrite TEMPORAIRE TEAM_CHEVAUX_TEMP (Cirrus, Yellow, Aceitunero,
    Centaure, Josie, Envole-toi, Ecolo, Dakota), cherchée parmi les chevaux des membres de
    la SEP (hypeChevauxDuClub), nom exact ou nom qui commence par ce mot, sans accents.
  - Agenda = rendez-vous à venir rattachés au groupe (agenda_groupes) : VIDE tant que le
    520 n'existe pas. Clic → fiche du rendez-vous (par la page du club, mécanisme
    __agendaFiche existant : le retour ramène donc à la page du club).
  - Résultats = cavalier_id d'une membre OU cheval_id d'un cheval de l'équipe, sans les
    masqués (masque_cavaliere) ni les décochés (visible=false). Point or = podium.
    Clic → page Résultats de la cavalière, sinon fiche du cheval.
  - Souvenirs = albums publics des chevaux et des profils de l'équipe + photos où elles /
    ils sont identifiés ; vidéos avec icône lecture ; ouverture dans la visionneuse Hype.
  - « Voir tout » déplie sur place (Réduire pour replier).
  - Textes nouveaux traduits en 7 langues ; arabe de droite à gauche vérifié.
  Testé en navigateur avec données d'essai : 375 / 390 / 430 px (fr), 375 (ar, de), aucun
  débordement, panneau des membres. node --check OK (18 blocs), un seul marqueur.
  Build 20261001-519 (contient 518).
  SUITE PRÉVUE : 520 = « Groupes » dans le menu ••• d'un rendez-vous ; 521 = choix du
  groupe à la création ; plus tard : chevaux ajoutés au groupe par les membres.
· (520) 01/10, 1 h 25 — « GROUPES » DANS LE MENU ••• D'UN RENDEZ-VOUS. Suite prévue au 519,
  « Ok continue » de Blandine.
  - Menu ••• de la fiche d'un rendez-vous (visible comme avant pour la propriétaire du
    club et l'autrice du rendez-vous) : nouvelle entrée « Groupes », sous « Gérer les
    personnes autorisées ».
  - Panneau (même gabarit que « Personnes autorisées ») : les groupes DU CLUB du
    rendez-vous, une case à cocher par groupe. Cocher = ajout dans agenda_groupes,
    décocher = retrait ; la liste est relue après chaque geste ; refus de la base AFFICHÉ
    (ex. une autrice qui n'est ni propriétaire ni gestionnaire : la base refuse).
  - Le rendez-vous reste dans l'agenda du club ; coché « Team Compétition », il apparaît
    aussi sur la page #team-competition.
  - Textes nouveaux en 7 langues. Panneau testé en navigateur (données d'essai).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-520 (contient 519).
  SUITE PRÉVUE : 521 = choix des groupes à la création d'un rendez-vous.
· (521) 01/10, 1 h 35 — CHOISIR LES GROUPES À LA CRÉATION D'UN RENDEZ-VOUS. Suite prévue
  (choix de Blandine : 521 d'abord, puis le chantier des clubs).
  - Fenêtre « Nouveau rendez-vous » de l'agenda du club (AgendaClubHype) : nouveau champ
    « Groupes (facultatif) », juste avant les boutons, avec une pastille à cocher par groupe
    DU club. Il n'apparaît que si le club a au moins un groupe. Rien de coché par défaut ;
    les coches sont remises à zéro à la fermeture.
  - À « Publier » : le rendez-vous est créé comme avant ; S'IL EST CRÉÉ, il est ensuite
    ajouté aux groupes cochés (agenda_groupes). Si cet ajout est refusé, le message
    « Rendez-vous créé, mais l'ajout au groupe a échoué : … » s'affiche sur la page (le
    rendez-vous existe bien ; on peut refaire l'ajout par ••• > Groupes).
  - Textes nouveaux en 7 langues. Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20261001-521 (contient 520).
· (SQL) 01/10, 1 h 30 — LIEUX DES CONCOURS. ✅ PASSÉ PAR ELLE en 3 parties (« Success »),
  vérifié : 39 concours, 11 lieux.
  - Base du globe relue dans le dépôt (hype-clubs-db-1 à 4.js, 3 145 clubs) : SEULS 561 ont
    une ville → le rapprochement automatique par ville ne suffit pas ; décision : tableau de
    correspondance validé par Blandine pour les 40 noms de concours les plus fréquents
    (655 résultats), puis ajout automatique « à vérifier » pour les nouveaux (523).
  - Tables : lieux_ajoutes (nom unique, ville, departement, genre club|lieu, a_verifier) et
    concours_lieux (concours_cle = nom normalisé sans accents/minuscules/ponctuation→espace,
    concours, lieu_nom, ville, departement, source base|ajoute|ville, a_verifier). Lecture
    ouverte ; écriture = hype_est_moderatrice().
  - Réponses de Blandine : Carrière de la Vallée = Bièvres ; Mantes St Martin = chez Lazare,
    Saint-Martin-la-Garenne ; Challenge de Folleville = Haras de Folleville (Breuillet 91) ;
    Ozoir = Domaine de Lipica ; Boulerie Jump = Pôle Européen du Cheval (même lieu, 3
    écritures du Mans) ; Maisons-Laffitte = l'Hippodrome ; Milly la Forêt = HDL Jump ;
    Bois le Roi seul = Rozier OU UCPA → ville seule ; Lésigny = Haras de Maison Blanche ;
    Paris / Paris Bois de Boulogne = ville seule (la FFE précise d'habitude Étrier, SEP,
    Touring).
  - 8 lieux déjà dans la base, 11 ajoutés, 4 en ville seule (Paris, Bois-le-Roi, Barbizon,
    Ballancourt). « À vérifier » (complétés par moi) : Écurie Lazare, Écurie Christel
    Boulard (sans ville), Les Écuries de Saint-Fargeau.
· (522) 01/10, 1 h 40 — PAGE TEAM : LE LIEU SOUS CHAQUE RÉSULTAT.
  - Lignes « Résultats récents » : sous le nom du concours, en petit gris avec une épingle
    or : « Haras de Jardy · Marnes-la-Coquette (92) », ou la ville seule
    (« Bois-le-Roi (77) »). Lu dans concours_lieux (une requête pour tous les concours
    affichés). Concours pas encore relié : ligne inchangée.
  - Aucun texte nouveau à traduire (noms propres). Testé en navigateur (données d'essai).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-522 (contient 521).
  SUITE PRÉVUE (renumérotée 524) : à l'import FFE, un concours inconnu est relié s'il ressemble à un
  lieu connu, sinon ajouté « à vérifier » + petite liste pour les modératrices (touche
  hype-import-ffe.js) ; plus tard : lieux ajoutés sur le globe.
· (SQL) 01/10, 1 h 41 — CHEVAUX D'UN GROUPE. ✅ PASSÉ PAR ELLE (« Success »). Table
  groupes_chevaux (groupe_id → groupes, cheval_id → chevaux, ajoute_par, ajoute_le, clé
  groupe+cheval) ; lecture ouverte ; ajout/retrait = hype_peut_gerer_club du club du groupe.
  Groupe « Team Compétition » : aucun cheval au départ.
· (523) 01/10, 1 h 45 — PAGE TEAM : « GÉRER LES CHEVAUX ». Demande de Blandine (« il manque
  des chevaux ») ; ses choix : A = la liste écrite disparaît, B = recherche parmi les chevaux
  de la SEP seulement.
  - TEAM_CHEVAUX_TEMP RETIRÉE : « Nos chevaux » = les chevaux du groupe, dans l'ordre d'ajout.
    Au premier affichage, la rangée est donc VIDE jusqu'à ce qu'elle les ajoute.
  - Bouton « Gérer les chevaux » sous « Nos chevaux » (propriétaire / gestionnaires SEP) : le
    même panneau que « Gérer les membres » (titre « Chevaux de l'équipe », recherche, photo,
    Ajouter / Retirer, refus de la base affiché). Chevaux proposés = ceux des membres de la
    SEP, filtre hypeChevauxDuClub (même règle que la page du club).
  - Un échec de lecture des chevaux du groupe s'affiche dans la section, sans vider la page.
  - Résultats et souvenirs suivent automatiquement les chevaux du groupe.
  - Textes nouveaux en 7 langues. Testé en navigateur (données d'essai). ⚠️ ERREUR DE MA
    PART rattrapée avant livraison : une parenthèse manquante dans le champ de recherche,
    vue par node --check et corrigée.
  Aucun SQL de plus. node --check OK (18 blocs), un seul marqueur. Build 20261001-523
  (contient 522). Suite renumérotée : 524 = rapprochement des concours à l'import FFE.
· (NETLIFY) 01/10, 10 h 05 — HORSELINGO.FR : REPORTÉ, RIEN N'A ÉTÉ CHANGÉ. Constat vérifié en direct :
  2hype.fr ouvre Hype ; Linguae vit DANS le site 2hype (2hype.fr/lingo.html) ; horselingo.fr
  est branché sur l'ANCIEN site Netlify (majestic-melba), qui n'affiche qu'une page « Hype a
  déménagé » ; horselingo.fr/lingo.html → 404. Option B (domaine déplacé sur le site 2hype +
  netlify.toml avec règles horselingo.fr → /lingo.html) préparée puis ABANDONNÉE par Blandine :
  elle va contre la séparation future de Linguae, et pas le temps aujourd'hui. Décision : on ne
  touche à rien, elle donne les deux adresses (2hype.fr et 2hype.fr/lingo.html). Le netlify.toml
  modifié NE DOIT PAS être poussé. À reprendre lors de la séparation de Linguae (site Netlify
  propre, horselingo.fr dessus). Le renommage « Horse Lingo » dans l'appli reste à faire.
· (SQL) 01/10, 10 h 54 — DOUBLON « ELLE M'A DIT » RÉSOLU. ✅ PASSÉ PAR ELLE (« Success »).
  Constat (2 lectures) : fiche a27df268-… « Elle m'a dit circee » (Blandine, 03/09, 1 album,
  1 rattachée, 0 résultat) et fiche 8b45fe0e-… « Elle m'a dit » (Maylis, dcb7f342-…, 11/09,
  vide). Choix validé (« Ok ») : on garde celle de Blandine (nom NON modifié : clé FFE),
  Maylis y est RATTACHÉE (chevaux_liens), la fiche vide de Maylis est retirée de groupes_chevaux
  puis mise à la corbeille (supprime_le = now(), récupérable 30 jours).
  Rappel : les 523 (index identique octet pour octet) et la photo du hero sont EN LIGNE (vérifié
  dans le dépôt le 01/10, commit 88119bd) ; ajout de chevaux à la Team confirmé par Blandine.
· (524) 01/10, 11 h 00 — PAGE CAVALIER : PASTILLE PROVISOIRE « ✦ TEAM » À DROITE DU NOM. Blandine :
  « à côté de mon nom sur la page Cavalier, me permettant d'accéder à la page compétition ; on
  modifiera après, mais au moins que je puisse aller sur la page sans demander l'adresse » ; « dans
  un doré, dans les mêmes tons que la page compétition ».
  - Pastille dorée (#D6B676, contour doré, fond doré très léger, Montserrat 9,5 px en capitales)
    juste après le crayon du pseudo ; un toucher ouvre l'écran « team-competition ».
  - Visible SEULEMENT sur sa propre page, et seulement pour : la propriétaire de la SEP
    (clubRevendiquePar), une gestionnaire de la SEP (club_gestionnaires) ou une membre du groupe
    « Team Compétition » (groupes_membres). Jamais en visite. Les autres ne voient rien : la page
    reste non annoncée.
  - Texte « Team » traduit (Equipo, チーム, الفريق ; Team ailleurs).
  - PROVISOIRE : le vrai badge (Team / Coach, où l'afficher, nom du groupe) reste à décider.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-524 (contient 523).
· (525) 01/10, 11 h 10 — PAGE TEAM : « + AJOUTER UN RENDEZ-VOUS ». Blandine : « je ne vois pas où rajouter
  des événements sur la page » (oubli de ma part au 519) ; « oui, ajoute aussi le bouton sur la page Team ».
  - Bloc Agenda de la page Team : bouton doré « + Ajouter un rendez-vous » (propriétaire / gestionnaires
    SEP seulement, même règle que « Gérer les membres »).
  - Il ouvre la page du club SEP (window.__guildeEcurie = TEAM_CLUB) avec le formulaire « Nouveau
    rendez-vous » déjà ouvert (mécanisme existant window.__agendaOuvrirAjout) ET la pastille « Team
    Compétition » déjà cochée (nouveau : window.__agendaGroupesCoches, lu une fois à l'ouverture de la
    fenêtre, dans AgendaClubHype). Après « Publier », on reste sur la page du club.
  - Relevé sur sa capture : la membre ajoutée est « Aurelie » SANS accent (compte sans abonnement) ; la
    décision était « Aurélie » AVEC accent → signalé, à corriger par elle dans « Gérer les membres ».
  - Texte nouveau en 7 langues. Non testé en navigateur. Aucun SQL. node --check OK (18 blocs), un seul
    marqueur. Build 20261001-525 (contient 524).
· (526) 01/10, 11 h 25 — PAGE TEAM : PANNEAU « RENDEZ-VOUS DE L'ÉQUIPE » + RENDEZ-VOUS PASSÉS. Blandine :
  « le bouton ajouter un rendez-vous doit proposer les rdv déjà existants pour qu'on puisse les ajouter » ;
  « ajoute quand même ceux qui sont passés, qu'elles puissent retrouver le lien, consulter et mettre des
  photos sur les événements passés, comme sur les autres pages ».
  - « + Ajouter un rendez-vous » (propriétaire / gestionnaires SEP) ouvre désormais un PANNEAU : en haut
    « ✦ Créer un nouveau rendez-vous » (= le 525 : formulaire SEP, Team Compétition déjà coché) ; dessous,
    les rendez-vous de l'agenda SEP (200 plus récents), À VENIR d'abord (le plus proche en haut) puis
    « RENDEZ-VOUS PASSÉS » (le plus récent en haut) ; recherche (titre / lieu) ; Ajouter / Retirer par
    rendez-vous (agenda_groupes, refus de la base affiché), page Team rafraîchie aussitôt.
  - Bloc Agenda de la page Team : la grande carte = le prochain rendez-vous ; sans rendez-vous à venir :
    « Aucun rendez-vous à venir pour l'instant. » ; « Voir tout » déplie les autres à venir PUIS
    « RENDEZ-VOUS PASSÉS » de l'équipe. Un passé s'ouvre sur sa PAGE SOUVENIRS (écran evenement-passe,
    même porte que l'agenda du club : photos, fil) ; un à venir s'ouvre sur sa fiche (inchangé).
  - Règle à venir / passé = celle de l'agenda du club (la date de fin décide quand elle existe).
  - Textes nouveaux en 7 langues. Testé en navigateur (données d'essai : page + panneau). Aucun SQL.
    node --check OK (18 blocs), un seul marqueur. Build 20261001-526 (contient 525).
· (527) 01/10, 11 h 30 — PAGE TEAM : LE BOUTON DU RENDEZ-VOUS DEVIENT UN « + » À DROITE DU TITRE. Blandine :
  « le bouton ajouter un rdv prend beaucoup de place ; remplace-le par un plus entouré à droite du titre de
  l'agenda » ; maquette (rendu réel, données d'essai) validée : « Ok top ».
  - Rond de 32 px, contour doré, « + » doré, posé à droite du titre Agenda (après « Voir tout » quand il
    existe) ; même panneau qu'au 526 ; propriétaire / gestionnaires SEP seulement. Le gros bouton sous la
    liste est retiré. enTete accepte désormais un élément à droite (paramètre extra).
  - Texte : seulement l'aria-label (7 langues). Aucun SQL. node --check OK (18 blocs), un seul marqueur.
    Build 20261001-527 (contient 526).
· (528) 01/10, 11 h 45 — PAGE TEAM : RÉSULTATS EN CARTES « E BIS » QUI SE DÉPLIENT. Blandine : « les résultats
  on voit rien, les informations sont trop longues » ; « qu'ils se déplient et qu'on puisse commenter ou ajouter
  des photos » ; 7 maquettes montrées (A à G puis E bis) ; choix : E bis (« Ok on prend ça »). Questions restées
  sans réponse, réglages par défaut annoncés : 3 cartes avant « Voir tout », UNE CARTE PAR RÉSULTAT (pas par
  concours), fil ouvert à tous (comme les fils des rendez-vous).
  - Carte de 104 px : photo du cheval (sinon de la cavalière) à droite, fondue dans le noir ; à gauche :
    sur-titre « 🏆 Victoire / 🥈 / 🥉 / Ne · date », titre « Cavalière & Cheval » (pseudo du compte, sinon nom
    FFE remis en minuscules), dessous « épreuve · lieu (concours_lieux, sinon nom du concours) · place / partants ».
    Podium : contour et sur-titre dorés ; sinon gris.
  - Toucher DÉPLIE la carte (une seule ouverte) : photos et noms cavalière « sur » cheval ; Concours, Épreuve,
    Classement (place / partants · sans faute si mention), Date longue, Lieu (si relié) ; liens « Fiche du
    cheval › » et « Tous ses résultats › » ; puis « ✦ SOUVENIRS DE CE RÉSULTAT » = MurHype cible
    « resultat:<id> » (vignettes, 3 visibles puis dépliage, composer en bas : photo / vidéo / texte).
  - Données ajoutées à la lecture : partants, mention, cavalier (texte FFE) ; chevaux (nom, photo) et
    profils (pseudo, photo) des résultats affichés.
  - Textes nouveaux en 7 langues. Testé en navigateur (données d'essai ; le fil MurHype n'existe pas dans le
    banc d'essai, à vérifier sur iPhone). Aucun SQL. node --check OK (18 blocs), un seul marqueur.
    Build 20261001-528 (contient 527).
· (529) 01/10, 11 h 45 — PAGE TEAM : « RETIRER DE L'ÉQUIPE » SUR UN RÉSULTAT.
  Constat de Blandine : un résultat d'une cavalière hors équipe sur Ecolo s'affichait (la page montre tous
  les résultats des chevaux du groupe, quelle que soit la cavalière). Son choix : B (bouton manuel) ;
  A (tri automatique : pour un cheval de l'équipe, ne garder que les cavalières de l'équipe) = PLUS TARD.
  - Carte dépliée, pour la propriétaire / les gestionnaires SEP seulement : « ✕ Retirer de l'équipe ».
    Le résultat disparaît de la page Team ; il reste sur la fiche du cheval et dans « Tous ses résultats ».
  - Sous les résultats (mêmes personnes seulement) : « Résultats retirés (n) » → la liste grisée ; carte
    dépliée → « ↺ Remettre dans l'équipe ». Refus de la base affiché dans la carte (« Impossible : … »).
  - Le compteur et « Voir tout » ne comptent que les résultats visibles.
  - SQL ✅ PASSÉ PAR ELLE le 01/10 à 12 h 38 (« Success », avec en plus notify pgrst reload schema, après
    l'erreur « Could not find the table » vue sur iPhone) : SQL-529-resultats-retires.sql — table groupes_resultats_masques (groupe_id →
    groupes, resultat_id en texte, masque_par, masque_le, clé groupe+résultat) ; lecture ouverte ;
    ajout/retrait = hype_peut_gerer_club du club du groupe. Tant que le SQL n'est pas passé : rien n'est
    masqué, et le bouton affiche « Impossible : … ».
  - Textes nouveaux en 7 langues. Testé en navigateur (données d'essai : retirer, remettre, arabe).
  node --check OK (18 blocs), un seul marqueur. Build 20261001-529 (contient 528).
· (530) 01/10, 12 h 10 — PAGE TEAM : L'AGENDA EN CARTES QUI SE DÉPLIENT.
  Maquettes A / B / C / D montrées ; choix de Blandine : REPLIÉ = visuel A (même carte que les résultats,
  affiche du rendez-vous à droite fondue dans le noir), DÉPLIÉ = visuel B (une seule image en grand
  quand il y en a une), PAS de mur de photos, renvoi vers le rendez-vous de l'agenda du club.
  - Carte 104 px : sur-titre « À venir / En cours / Passé · date » (or ; gris si passé), titre, « lieu · heure ».
    Contour doré pour les rendez-vous à venir. Image = l'affiche du rendez-vous (club_agenda.image_url) ;
    pas d'affiche = carte sans image (pas de photo de souvenirs en remplacement).
  - Toucher déplie (une seule ouverte) : Date longue (→ date de fin si plusieurs jours, · heure), Lieu, Type
    (Concours / Sortie / Stage, mêmes libellés que la page du rendez-vous), l'affiche EN GRAND (toucher =
    agrandie en plein écran), « Ouvrir le rendez-vous › » : à venir → page du rendez-vous (agenda du club) ;
    passé → sa page souvenirs (comme avant).
  - Même rangement qu'avant : le prochain rendez-vous seul ; « Voir tout » montre les suivants puis
    « Rendez-vous passés ». « Je participe » non repris (on s'inscrit depuis la page du rendez-vous).
  - Les anciennes fonctions carteRdv / ligneRdv restent dans le fichier, plus utilisées (pas de nettoyage).
  - Textes nouveaux en 7 langues. Testé en navigateur (données d'essai, français et arabe, liens vérifiés).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-530 (contient 529).
· (À FAIRE PLUS TARD) 01/10, 12 h 44 — PAGE ÉCURIE : RETIRER LE BLOC « CAVALIERS DU CLUB ».
  Idée de Blandine : la page Écurie (onglet du bas) a un accès vers une page avec les cavaliers, donc le
  bloc « Cavaliers du club » (EcranEcurie, EncartCavaliersSpectral, entre les chevaux et les Souvenirs)
  ferait doublon. Son choix pour inviter / retirer : C (sur la page des cavaliers). « On verra ça plus
  tard » → NON FAIT.
  Constat (lecture du code) : la pastille « Voir les membres » (nom du club) ouvre la page de l'écurie
  (EcranGuilde), qui a DÉJÀ son bloc « Cavaliers de l'écurie » avec le « + » « Compose ton écurie » (même
  liste cavaliersChoisisEcurie) et le retrait avec confirmation (19/09, 247). C est donc déjà rempli.
  Conséquence signalée : sur la page de l'écurie, retirer est réservé à la propriétaire / aux modératrices
  et vaut pour tout le monde ; un cavalier ordinaire ne pourrait plus retirer ses propres invités.
  À confirmer par elle avant de coder : est-ce bien la pastille « Voir les membres » qu'elle visait ?
  Aucun SQL prévu, aucun nouveau texte.
· (531) 01/10, 12 h 55 — PAGE TEAM : SOUVENIRS RÉCENTS PLUS GRANDS.
  Demande de Blandine (« les photos en plus grand »), maquettes A / B / C puis D / E ; son choix : D = 3 par
  ligne, carrées, 2 lignes (6 photos avant « Voir tout », au lieu de 4 petites en 4/3).
  - Tuiles : carré, coins arrondis 10, fin contour or ; vignette demandée en 400 × 400 (au lieu de
    360 × 270) pour rester nette. Toucher = photo / vidéo en grand, inchangé ; « Voir tout » inchangé.
  - Rien d'autre touché. Aucun texte nouveau. Testé en navigateur (données d'essai).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-531 (contient 530).
· (532) 01/10, 13 h 05 — PAGE TEAM : SOUVENIRS SUR UNE SEULE LIGNE. Blandine : « je préfère une ligne ».
  3 photos carrées avant « Voir tout » (au lieu de 6 sur 2 lignes) ; « Voir tout » apparaît dès 4 souvenirs.
  Rien d'autre touché. Testé en navigateur. Aucun SQL. node --check OK (18 blocs), un seul marqueur.
  Build 20261001-532 (contient 531).
· (533) 01/10, 15 h 50 — LA FLÈCHE ‹ DES PAGES CAVALIER ET CHEVAL REVIENT EN ARRIÈRE.
  Signalé par Blandine : depuis la page Team, ouvrir une cavalière ou un cheval puis revenir « arrive sur
  une autre page ». Cause trouvée : la flèche ‹ en haut de la page Cavalier menait TOUJOURS à l'Accueil
  (setEcran("dashboard")), celle de la fiche cheval TOUJOURS à « Mon cavalier ».
  - Les deux flèches font maintenant comme le geste retour : page précédente (ctx.retourEcran, même
    garde que le reste de l'appli). Sans page précédente (lien direct) : comportement d'avant.
  - Conséquence annoncée et validée (« Ok ») : vaut PARTOUT (ex. cavalier ouvert depuis l'Écurie → retour
    à l'Écurie, plus à l'Accueil).
  Aucun SQL, aucun texte nouveau. Non testable dans le banc d'essai (pages hors Team) : à tester sur iPhone.
  node --check OK (18 blocs), un seul marqueur. Build 20261001-533 (contient 532).
· (SQL) 01/10, 20 h 55 — ABONNEMENT D'AURÉLIE REMIS. Relevé : « Aurélie » (avec accent), mensuel, statut
  actif, expire_le 22/09/2026 19:28 UTC → l'appli la traite en NON Premium depuis le 22/09 (elle vérifie la
  date). Blandine : « elle a été débitée ». SQL donné : expire_le = 22/10/2026 19:28:33 UTC (un mois
  après l'ancienne fin), sa seule ligne (pseudo = 'Aurélie'). ✅ PASSÉ (20 h 53) : 1 ligne, mensuel, actif,
  expire_le 2026-10-22 19:28:33+00.
  ⚠️ À REGARDER : pourquoi le renouvellement mensuel payé n'a pas mis à jour expire_le (risque pour tous
  les abonnés mensuels). Revérifier sa ligne avant le 22/10.
· (SQL) 01/10, 20 h 56 — ABONNEMENT DE LAUREN REMIS. Relevé : « Lauren », mensuel, actif, expire_le
  22/09/2026 18:13 UTC (MÊME JOUR qu'Aurélie → panne commune du renouvellement, pas un cas isolé).
  Blandine : même problème, débitée. SQL donné : expire_le = 22/10/2026 18:13:00 UTC, pseudo = 'Lauren'.
  ✅ PASSÉ (20 h 55) : 1 ligne, mensuel, actif, 2026-10-22 18:13:00+00. ⚠️ Vérifier TOUS les abonnés mensuels (date de fin dépassée mais statut actif).
· (Relevé) 01/10, 21 h 04 — Abonnements « actif » à date de fin dépassée : il n'en reste qu'UN, « Dominique »,
  plan duo, expire_le 16/09/2026 12:14 UTC → traité NON Premium depuis le 16/09. Rien modifié : question
  posée à Blandine (a-t-il/elle été débité(e) ?). Précision de Blandine : « duo » = Premium + l'IA, pour UNE
  seule personne (pas un 2e compte).
  Deux comptes « Dominique », TOUS LES DEUX abonnés : dominique.wirtschafter@orange.fr = duo, fin 16/09 (dépassée) ;
  hadjadj.dominique@gmail.com = mensuel, fin 01/10/2026 23:59:59 UTC (= 02/10 à 1 h 59, heure de Paris).
  Correction de Blandine : le compte hadjadj = UN MOIS GRATUIT qu'elle lui avait offert, pas un abonnement
  payé (« elle s'est pas abonnée je crois ») → fin normale cette nuit, ce n'est PAS un test du renouvellement. Stripe (capture de Blandine) : orange.fr DÉBITÉ 24,99 € le 14/09 à 15 h 15 (Link, réussi)
  → SQL donné : expire_le = 16/10/2026 12:14:50 UTC, ciblé par son e-mail + plan duo. ✅ PASSÉ (21 h 12) :
  1 ligne, orange.fr, duo, actif, 2026-10-16 12:14:50+00.
  Aussi vu dans Stripe : a.bussonnais@outlook.com 12,99 € réussi (Aurélie) ; un paiement 24,99 € ÉCHOUÉ
  (basia.baster@poczta.fm) — non traité.
  BILAN 01/10 soir : 3 abonnés payés mais vus non Premium (Aurélie, Lauren, Dominique orange.fr) remis à la
  main jusqu'au 22/10, 22/10 et 16/10. CAUSE NON TROUVÉE : le paiement Stripe ne met pas à jour expire_le.
  À regarder AVANT le 16/10 (sinon ils reperdent le Premium).
· (CORRECTION) 01/10, 22 h 35 — ⚠️ ERREUR DE MA PART : l'onglet « Écurie » du bas ouvre l'écran « guilde »
  (EcranGuilde, la page de l'écurie, qui passe d'une écurie à l'autre), PAS EcranEcurie. L'entrée « À FAIRE
  PLUS TARD — retirer le bloc Cavaliers du club » de 12 h 44 visait EcranEcurie : elle est donc À REVOIR
  avec Blandine (le bloc de l'onglet Écurie est « Cavaliers de l'écurie » d'EcranGuilde).
  Chantier couleur (demande du 01/10 soir) : la couleur suivra l'écurie AFFICHÉE dans EcranGuilde.
· (534) 01/10, 22 h 55 — PAGE ÉCURIE (onglet du bas = EcranGuilde) : LA COULEUR DE L'ÉCURIE.
  Demande de Blandine : comme la fiche cheval (bleu / doré / bordeaux / vert) sur la page Écurie (« surtout »)
  puis la page Cavalier (PLUS TARD, autre build). Ses précisions : la couleur se choisit par les RESPONSABLES
  de l'écurie ; elle suit l'écurie AFFICHÉE (on passe d'une écurie à l'autre) ; doré = le doré doux de la page
  Team (#D6B676). Question « même doré sur la fiche cheval (#D9B56C) ? » restée SANS RÉPONSE → fiche cheval
  NON touchée.
  - Pastilles « Couleur de l'écurie » sous le sélecteur d'écuries, visibles par la propriétaire
    (clubRevendiquePar) ou une gestionnaire (club_gestionnaires) de l'écurie affichée. Bleu = défaut (vide).
    Refus de la base affiché (« Impossible : … »), retour à l'ancienne couleur.
  - Tout le monde voit la page de cette écurie dans sa couleur. Table club_teintes (clé = clefClubG du nom de
    l'écurie, comme la bannière). Cache local PAR ÉCURIE pour l'affichage immédiat, la base fait foi.
  - Dans EcranGuilde : TURQ / TURQL prennent la couleur de l'écurie ; les 28 textes de couleur bleus écrits en
    dur (rgba 32,217,245 / 95,233,240, #20D9F5, #5FE9F0, #1FB8C4, #4DEAD8) passent par la couleur choisie.
  - RESTENT BLEUS (blocs partagés avec d'autres pages, pas touchés) : Cavaliers de l'écurie
    (EncartCavaliersSpectral), agenda (AgendaClubHype), fil / souvenirs (MurHype), tableaux
    (TableauxSpectralHype), sellerie (EncartSellerie). Texte sombre #04252A conservé sur les boutons dégradés.
  - SQL : SQL-534-couleur-ecurie.sql (table club_teintes, lecture ouverte, écriture = hype_peut_gerer_club).
    Sans le SQL : page bleue comme avant, pastilles qui affichent « Impossible : … ».
  - Texte nouveau en 7 langues. Testé en navigateur (banc d'essai de la page Écurie : bleu, doré, bordeaux).
  node --check OK (18 blocs), un seul marqueur. Build 20261001-534 (contient 533).
· (535) 01/10, 23 h 05 — PAGE ÉCURIE : LA COULEUR PASSE DANS LE MENU PHOTO. Blandine : « je préférerais que les
  choix de couleur soient dans le menu photo comme sur la page cheval ».
  - Le bouton 📷 (en haut à droite) ouvre maintenant un MENU (comme la fiche cheval) : « 📷 Changer la photo »
    (propriétaire, inchangé) + « 🎨 Couleur de l'écurie » et ses 4 pastilles (propriétaire OU gestionnaire),
    refus de la base affiché dans le menu, « Fermer ». Le 📷 apparaît donc aussi pour une gestionnaire
    (sans « Changer la photo »).
  - La ligne de pastilles sous le sélecteur d'écuries (534) est RETIRÉE.
  - Testé en navigateur (banc d'essai : menu, choix du doré, page qui change). Textes nouveaux en 7 langues.
  SQL-534-couleur-ecurie.sql ✅ PASSÉ PAR ELLE le 01/10 à 22 h 37 (« Success », fin du collage vérifiée). node --check OK (18 blocs), un seul
  marqueur. Build 20261001-535 (contient 534).
· (536) 01/10, 23 h 45 — PAGE ÉCURIE : RÈGLE SOBRE + BLOCS RETIRÉS + INVITER / RETIRER SUR LA PAGE CAVALIERS.
  Constat de Blandine sur iPhone (534) : « il reste bcp de choses en bleu », puis sur l'encart Cavaliers « c'est un
  sapin de Noël » et « quelle que soit la couleur il y a trop de couleurs ». Maquette « sobre » montrée. Ses choix :
  RÈGLE SOBRE oui (textes ivoire / gris ; couleur seulement sur quelques touches : icônes, boutons d'action,
  petits titres, filets) ; encarts : A (la couleur de l'écurie l'emporte sur « Teinte de l'encart ») ; UNE version ;
  RETIRER l'encart « Cavaliers de l'écurie » (« on les retrouve sur leur page ») ; inviter / retirer : A = déplacés
  sur la page Cavaliers ; RETIRER « L'histoire du club » (« un seul endroit où écrire suffit »).
  - Mécanisme : EcranGuilde pose window.__teinteEcurieActive {c, cl, rgb} pendant qu'elle est affichée (effacé en
    la quittant) ; hypeTeinteEcurie() le lit. Blocs partagés en MODE SOBRE seulement quand il est posé (ailleurs :
    AUCUN changement) : transparences de couleur → blanches neutres, couleur pleine → couleur de l'écurie.
    Touchés : TableauxSpectralHype (encart philosophie : palette « nuit », petit titre en couleur, lien « Teinte de
    l'encart » masqué sur cette page ; prop sansHistoire), EncartSellerie, MurHype (+ teinte: TURQ passée),
    agenda (feuille de style .hype-ec-sobre limitée à la page), et dans hype-stories.js : BandeauStories,
    RailALaUne, MurImmersif (tn / tnL = couleur, tA = blanc neutre).
  - Dans la page : transparences neutres (RGBT = blanc), tuiles à contour et filet neutres, badge cheval sobre.
    S'applique aussi en BLEU (défaut) : la page Écurie de tous les clubs devient plus sobre, même sans couleur choisie.
  - Encart « Cavaliers de l'écurie » : plus affiché (code conservé, désactivé). « L'histoire du club » : plus
    affichée sur la page Écurie (texte conservé en base, rien supprimé).
  - Page Cavaliers (EcranCavaliersClub) : « + Ajouter un cavalier » (connecté·e) → fenêtre « Compose ton écurie »
    (version sobre, mêmes fonctions ajouterCavalierChoisi / retirerCavalierChoisi, écurie = celle de la page) ; ses
    invités apparaissent dans la liste ; croix sur un invité = le retirer de SA liste ; croix sur une cavalière =
    la retirer de l'écurie, propriétaire ou modératrice, EN DEUX TOUCHERS (bandeau nommant la cavalière, règle du
    19/09), refus de la base affiché. Limite : si l'écurie n'a encore AUCUN membre, la liste vide ne montre pas
    les invités.
  - FICHIERS : index.html + hype-stories.js (racine). Textes nouveaux en 7 langues. Testé en navigateur (bancs
    d'essai : page Écurie bleu / doré, page Cavaliers : croix, confirmation, fenêtre d'ajout). Stories / « À la
    une » non visibles au banc d'essai : à vérifier sur iPhone.
  Aucun SQL. node --check OK (18 blocs + hype-stories.js), un seul marqueur. Build 20261001-536 (contient 535).
· (537) 01/10, 23 h 00 — 🟥 CORRECTIF URGENT : LA 536 FAISAIT PLANTER L'APPLI AU DÉMARRAGE (« Un caillou dans le
  sabot », global code 2hype.fr:32169:4704, capture de Blandine à 22 h 55).
  ⚠️ ERREUR DE MA PART : mon script de « mode sobre » délimitait chaque fonction jusqu'à la PROCHAINE ligne
  « function », et a donc aussi modifié du code placé ENTRE deux fonctions : la feuille de style AGENDA_CSS (index)
  et la liste HS_MUR_COULEURS (hype-stories.js). Ces lignes lisaient TEzT / TEzR, qui n'existent qu'à l'intérieur
  des fonctions → ReferenceError au chargement → appli entière arrêtée. node --check ne voit pas ce genre d'erreur.
  - Les DEUX lignes sont remises à l'identique de l'original (AGENDA_CSS depuis la 535, HS_MUR_COULEURS depuis le dépôt).
    Vérifié : plus aucune variable TEz… hors de sa fonction (contrôle ligne par ligne).
  - NOUVEAU CONTRÔLE avant livraison : chargement complet de l'appli dans un navigateur (dépôt + index + fichiers
    modifiés) et comparaison des erreurs de démarrage avec la version précédente. 536 : « TEzR is not defined »,
    « TEzT is not defined » ; 537 : identique à la 533 (seules les erreurs dues à l'absence de réseau du banc d'essai).
  Rien d'autre changé. node --check OK, un seul marqueur. Build 20261001-537 (contient 536). Pousser index.html ET
  hype-stories.js ensemble.
· (538) 01/10, 23 h 05 — L'ÉCRAN PROFIL NE PLANTE PLUS QUAND LA FICHE DU COMPTE MANQUE. Capture d'Aurélie (20 h 52,
  avant la 536) : « Un caillou dans le sabot », écran « profil », « null is not an object (evaluating
  'profil.sur_carte') ». Cause : l'écran lisait la fiche du compte alors qu'elle était vide (pas encore chargée ou
  connexion perdue). Cause précise du vide NON prouvée (c'était juste avant la correction de son abonnement).
  - EcranProfil devient une garde : fiche présente → l'écran habituel (renommé EcranProfilInterne, INCHANGÉ) ;
    fiche absente → « Ton profil se charge… », puis au bout de 4 s un bouton « Se reconnecter » (écran connexion).
  - 2 textes nouveaux en 7 langues. Testé en navigateur (sans fiche : message puis bouton ; avec fiche : écran
    normal) + chargement complet de l'appli : mêmes erreurs de démarrage que la 533 (dues au banc d'essai).
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261001-538 (contient 537 : pousser aussi
  hype-stories.js si la 537 n'est pas encore poussée).
· (DÉCISIONS, codé en 539) 02/10, 00 h 40 — PAGE ÉCURIE V2 (« champagne »), brief de Blandine (texte reçu ; IMAGE DE LA
  MAQUETTE PAS ENCORE REÇUE — lien ChatGPT bloqué, elle doit l'envoyer en photo). RIEN CODÉ.
  Confirmé avant code : page actuelle = EcranGuilde, écran « guilde » (onglet du bas « Écurie », liens #monecurie /
  #monclub / partage « eg ») ; V2 = nouveau composant EcranEcurieV2, styles préfixés « ecurie-v2- », ancienne page
  conservée en secours (un seul interrupteur pour revenir), aucun SQL.
  Décisions de Blandine : garder le passage entre ses deux écuries (« trouver le visuel adapté ») et le 📷 photo ;
  RETIRER de la page (code conservé) : stories, À la une, niveau / classement, quêtes, Ma Sellerie ; rester en
  CHAMPAGNE (pas de couleur d'écurie sur la V2) ; citation = le texte « philosophie du club » de l'écurie, avec un
  petit crayon discret ; CITATION PAR DÉFAUT (écurie sans texte) : « Faites du cheval un compagnon et non un
  esclave, vous verrez quel ami extraordinaire il est. » — avec l'auteur en petit : Nuno Oliveira (attribution des
  recueils de citations ; elle pensait à Ray Hunt, corrigé). Pour la SEP elle écrira « L'excellence équestre au
  cœur de Paris ». ZIP demandé dans le brief : à confirmer.
· (539) 02/10, 01 h 30 — PAGE ÉCURIE V2 « CHAMPAGNE ». Brief + maquette de Blandine (image reçue en photo),
  arbitrages ChatGPT transmis par elle : 6 onglets du brief (Cavaliers, Chevaux, Agenda, Actualités, Souvenirs,
  Santé), sans soulignement, rangée légèrement défilable (cases 78 px × 70 px) ; chevron après le nom pour changer
  d'écurie (feuille basse avec coche) ; 📷 rond en haut à droite (propriétaire) et, sans couverture, dégradé sombre
  + « Ajouter une photo de couverture » (propriétaire seulement) ; affiches d'événements ENTIÈRES (contain) sur leur
  propre image floutée ; mosaïque adaptée au nombre réel (8+ : 8 autour du carré central ; 1-7 : chevaux puis la carte
  « Voir tout », 2 colonnes si ≤ 2 ; 0 : état vide), badge hexagonal = icône cavalier + chiffre ; résultats en
  carrousel ~1,2 carte visible ; actualités = la plus récente (titre = 1re phrase, sans photo = carte texte à filet).
  - NOUVEAU COMPOSANT : EcranEcurieV2 (inséré juste avant EcranGuilde), styles « ecurie-v2- », palette #06100F /
    #0B1514 / ivoire #F3EEE4 / champagne #C9A66B / #BDB6AA / bordures rgba(201,166,107,.30), aucun turquoise.
  - ROUTE INCHANGÉE : l'onglet du bas « Écurie » ouvre toujours « guilde » ; EcranGuilde charge tout comme avant
    puis, si HYPE_ECURIE_V2 (= true), passe ses données à EcranEcurieV2. ANCIENNE PAGE CONSERVÉE INTACTE :
    HYPE_ECURIE_V2 = false la remet, rien d'autre à faire.
  - RÉUTILISÉ (aucune requête dupliquée) : écurie affichée / clubForce / ecurieSecondaire, bannière
    (tableaux_clubs club-banniere + choisirBanniere), villeClub, maG.membres (classement_ecuries), chevauxClub +
    liensClub, railClub + chevauxRail + membres (résultats), droits clubRevendiquePar, routes des 6 tuiles
    (cavaliers-club, ecurie-hype, agenda-club, actualites-ecurie, souvenirs-club, sante-club), perf-concours,
    __ouvrirCreationCheval, ouverture d'un cheval (cheval).
  - AGENDA : AgendaClubHype reste MONTÉ, invisible (hauteur 0), pour ses rendez-vous et pour ouvrir la fiche /
    le formulaire d'ajout (calques fixes). 2 props optionnelles ajoutées : pont (ouvrir / ajouter / peutCreer) et
    onEvs (liste chargée). Sans elles (autres pages) : aucun changement. Les liens « ouvrir ce rendez-vous » des
    autres pages (window.__agendaFiche → guilde) marchent donc toujours.
  - CITATION : TableauxSpectralHype, nouveau rendu « citation-v2 » (texte philosophie de l'écurie entre deux traits
    champagne, crayon discret = même règle d'écriture qu'avant, même fenêtre d'édition). Par défaut : Oliveira
    (7 langues) + « — Nuno Oliveira ». Le reste du composant est inchangé (fenêtre d'édition déplacée dans une
    variable, même contenu).
  - SEULE LECTURE NOUVELLE : la dernière publication du fil « ecurie:<écurie> » (8 lignes max, privées exclues),
    puisque le fil complet n'est plus monté sur la page. Lecture ouverte à tous comme le fil.
  - RETIRÉS DE LA PAGE (code conservé) : stories, À la une / mur immersif, niveau / classement / stats, quêtes,
    Ma Sellerie, encart cavaliers, histoire, couleur d'écurie (pastilles du menu 📷).
  - Gardés : drapeau de langue, partage de la page, bandeau d'invitation des visiteurs non connectés.
  - À SAVOIR : le nom de l'écurie s'affiche tel qu'il est enregistré (« Societe d'Equitation de Paris (SEP) », sans
    accents) ; « + Ajouter » un cheval visible pour toute personne connectée (comme l'ancienne page).
  - Testé en navigateur (banc d'essai, iPhone 375 px) : avec / sans photo, 9 / 3 / 0 chevaux, feuille d'écuries,
    onglets, liens, arabe (miroir), aucune largeur qui dépasse ; chargement complet de l'appli : mêmes erreurs de
    démarrage que la 533 (dues au banc d'essai). Textes nouveaux en 7 langues.
  Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261002-539 (contient 538).
· (540) 02/10, 01 h 10 — PAGE ÉCURIE V2 : TROIS RETOUCHES DEMANDÉES PAR BLANDINE (capture iPhone de la 539).
  - Derniers résultats : « remets la même taille que sur l'ancienne » → cartes 46 % de large × 240 px de haut
    (gabarit de l'ancienne page, ~2 cartes visibles), nom du concours sur 2 lignes, textes légèrement réduits.
  - Bandeau : « assombri à gauche en bas pour le titre » → voile en coin, côté du nom (côté droit en arabe), par-dessus
    le dégradé du bas ; la photo n'est pas recolorée.
  - Actualités de l'écurie : « tu peux en mettre deux » → les 2 publications les plus récentes (même lecture, 2 lignes).
  Rien d'autre touché. Testé en navigateur (banc d'essai 375 px, aucune largeur qui dépasse) + chargement complet de
  l'appli (mêmes erreurs que la 533, dues au banc d'essai). Aucun texte nouveau, aucun SQL. node --check OK (18 blocs),
  un seul marqueur. Build 20261002-540 (contient 539).
· (541) 02/10, 01 h 40 — PAGE ÉCURIE V2 : CORRECTIONS VISUELLES (brief « correction ciblée » de Blandine).
  - BANDEAU VIDE — CAUSE EXACTE : la V2 (539) n'affichait que `banniere` (tableaux_clubs « club-banniere:<clé> »).
    La SEP n'a PAS de bannière propre ; l'ancienne page affichait alors son image de REPLI :
    `banniere || (thème crimson ? IMG_BANDEAU_CRIMSON : UV3_H2)`. La V2 reprend maintenant EXACTEMENT cette
    expression (nouvelle prop `couvertureDefaut` calculée dans EcranGuilde, aucune nouvelle lecture). Bandeau
    440 px + zone sûre, cover centré, dégradé seulement en bas (+ voile en coin côté nom, 540), « Ajouter une
    photo de couverture » seulement s'il n'y a vraiment aucune image (propriétaire).
  - NOM : correspondance D'AFFICHAGE seulement « Societe d'Equitation de Paris (SEP) » → « Société d’Équitation de
    Paris (SEP) » (table NOMS_AFFICHES dans EcranEcurieV2) ; base inchangée ; autres écuries : leur vrai nom.
    32 px, « (SEP) » 24 px, 3 lignes.
  - SÉLECTEUR : capsule ▾ supprimée ; le nom est le bouton (2 écuries) avec un chevron discret « ⌄ » après la
    dernière ligne ; rien pour une seule écurie. Feuille : miniature + ville pour l'écurie AFFICHÉE ; pour l'autre,
    initiale seulement (sa photo / sa ville ne sont pas chargées et le brief interdit toute nouvelle requête).
  - ONGLETS : rangée défilable (cases ≥ 80 px, 70 px de haut, 13 px, accroche douce, barre masquée, fondu sur le bord
    de fin, inversé en arabe), aucun onglet actif.
  - CITATION : 16 px, largeur 86 %, auteur 10,5 px plus discret, traits plus fins.
  - ÉVÉNEMENTS : carrousel, cartes 84 %, image 210 px : affiche ENTIÈRE (contain) sur la même image floutée et
    assombrie ; sans image : grand cartouche date + icône calendrier ; carte entière cliquable ; titre serif 17 px.
  - CHEVAUX : noms 13 px, casse d'origine (plus de capitales forcées), 2 lignes, marges intérieures, dégradé renforcé.
  - RÉSULTATS : largeur de l'ancienne page GARDÉE (demande directe de Blandine à 01 h 03, le brief disait
    1,15-1,3 carte) ; hauteur ajustée au contenu (plus de 240 px fixes), concours et épreuve sur une ligne, carte
    entière cliquable (perf-concours, comme « Voir tout »).
  - ACTUALITÉS : DEUX publications GARDÉES (demande directe de 01 h 04 ; le brief disait une) ; état vide plus bas.
  - BAS DE PAGE : 110 px → 32 px (la barre du bas a déjà sa place réservée par l'appli) ; plus de minHeight.
  - PROFONDEUR : surfaces #0E1A18, bordures 0,28, ombres légères, fond très légèrement dégradé.
  - MODIFIÉS : EcranEcurieV2 (styles), EcranGuilde (UNE prop de plus : couvertureDefaut), TableauxSpectralHype
    (rendu citation-v2 : tailles / couleurs). AUCUNE requête Supabase, route, permission, table ni ancienne page touchée.
  - Testé (banc d'essai 375 px) : avec image par défaut, sans image, 9 / 5 / 2 chevaux, événement sans image, arabe,
    aucune page qui défile en largeur ; chargement complet : mêmes erreurs que la 533 (banc d'essai). Aucun SQL.
  node --check OK (18 blocs), un seul marqueur. Build 20261002-541 (contient 540).
· (542) 02/10, 01 h 50 — PAGE ÉCURIE V2 : DEMANDES DE BLANDINE À 01 h 11 (prises par-dessus la 541, livrées ensemble).
  « Essaye de mettre 3 par ligne pour les événements à venir ainsi que pour les derniers résultats », « il manque en
  bas les souvenirs ».
  - Prochains événements : 3 rendez-vous (au lieu de 2), grille de 3 cartes (affiche entière 3/4 sur fond flouté ;
    sans image : grand cartouche date), dessous date + titre 2 lignes + lieu ; carte entière cliquable. Remplace le
    carrousel 84 % de la 541.
  - Derniers résultats : grille de 3 cartes compactes (photo 42 px, textes 8,5-12,5 px) ; carte entière cliquable.
  - SOUVENIRS (nouveau, tout en bas) : 6 photos (2 lignes de 3, carrées) tirées des publications du fil de l'écurie
    — la MÊME lecture que les actualités, portée de 8 à 40 lignes (aucune requête en plus) ; toucher = photo en grand
    (hypeCalquePhoto) ; « Voir tout » = la page Souvenirs existante (souvenirs-club). ⚠️ Les albums publics des
    chevaux, que la page Souvenirs montre aussi, ne sont PAS repris ici (il faudrait une lecture de plus).
  Testé (banc d'essai 375 px, aucune largeur qui dépasse) + chargement complet (mêmes erreurs que la 533). Textes
  nouveaux en 7 langues. Aucun SQL. node --check OK (18 blocs), un seul marqueur. Build 20261002-542 (contient 541).

## (543) Page Écurie V2 — bandeau
- Photo du bandeau moins haute (340 px + encoche).
- Plus sombre en bas.
- Nouveau dégradé depuis la gauche qui porte le titre (inversé en arabe).
- Pas de SQL.
- En attente : prochains événements (reprendre le design d'une autre page, cartes plus larges) et derniers résultats (cartes plus longues) — question posée à Blandine sur la page de référence.

## (544) Page Écurie V2 — Souvenirs en mosaïque (brief de Blandine)
- 5 souvenirs au plus, 48 px sous « Actualités ».
- 5 ou plus : grande carte à gauche (55 %) + 4 petites en 2 × 2 (inversé en arabe : grande à droite).
- 1 : une grande carte horizontale ; 2 : deux cartes égales ; 3 : une large en haut + deux dessous ; 4 : 2 × 2.
- 0 : petit encart « Aucun souvenir pour l'instant ».
- Jamais de case vide ni de photo répétée. Coins 13 px, fine bordure champagne, photos en « cover ».
- Vidéo : petit rond lecture champagne au centre.
- Grande image : la plus récente qui est une photo (sinon la plus récente). ⚠️ Il n'existe pas de « souvenir mis en avant » ni de note de qualité dans les données : ces deux règles du brief ne peuvent pas s'appliquer.
- Pas de texte sur les photos (les données n'en ont pas), donc pas de dégradé sombre.
- Même lecture qu'avant (fil de l'écurie), aucune requête en plus, aucun SQL.

## Signalé 02/10 01:30 — bannière d'écurie refusée
- Message : « [42501] new row violates row-level security policy for table "tableaux_clubs" ».
- La photo s'affiche sur son téléphone mais n'est pas enregistrée pour le club.
- Le code d'enregistrement n'a pas changé avec la V2 (même fonction qu'avant).
- Cause trouvée : en base, une règle permettait d'AJOUTER une bannière (propriétaire du club) mais aucune ne permettait de la REMPLACER (les règles de modification n'acceptaient que citation et histoire). Feinn (29/08) et la SEP (01/10) avaient déjà une bannière → tout changement refusé.
- Correction : SQL passé par Blandine le 02/10 à 01:37 (succès) — nouvelle règle tableaux_clubs_update_banniere (le propriétaire du club peut remplacer sa bannière). Rien de changé dans l'app.

## (545) Page Écurie V2 — Prochains événements et Derniers résultats
- Prochains événements (ses mots : « quand il n'y en a pas on ne voit pas la section, un seul sur toute la ligne, deux = deux carrés, à partir de trois tous en carrousel ») :
  - 0 : la section n'apparaît pas. ⚠️ Le bouton « + Ajouter » qui était dans la section vide disparaît avec elle ; on ajoute un rendez-vous depuis l'onglet Agenda.
  - 1 : une carte sur toute la ligne (image en largeur).
  - 2 : deux cartes carrées.
  - 3 et plus : tous les événements (12 au plus) dans un carrousel, cartes larges (78 %), la suivante dépasse.
  - Mêmes couleurs (noir vert, champagne), affiche entière, toute la carte ouvre le rendez-vous.
- Derniers résultats : format des cartes de l'ancienne page Écurie, couleurs champagne gardées.
  - Carrousel, cartes 46 % de large, 240 px de haut, coins 20 px, portrait rond 56 px, nom du concours sur 2 lignes, ligne « + N autres classées » (7 langues).
  - Tous les résultats (12 au plus) au lieu de 3.
- Testé banc 375 px (français et arabe), chargement complet sans nouvelle erreur. Aucun SQL. Build 20261002-545.

## (546) Page Écurie — Derniers résultats : chargement plus rapide + même règle que les événements
- Ses mots : « les derniers résultats mettent bcp plus de temps que tout le reste à charger ».
- Cause : le chargement attendait, AVANT de lire les résultats, trois choses qui n'en ont pas besoin : les photos du mur du club, le classement des chevaux par XP (5 requêtes) et le comptage des cavaliers par cheval.
- Correction : ces trois lectures partent maintenant en parallèle sans bloquer ; les résultats sont lus dès que les chevaux sont connus. Rien de supprimé, les mêmes données arrivent (testé : résultats affichés avant la fin du classement XP).
- Sécurité ajoutée : s'il n'y a aucun membre ou si la lecture échoue, la liste est mise à vide (avant, « … » pouvait rester affiché pour toujours).
- Affichage (ses mots : « quand il n'y a pas de résultat tout disparaît ; un seul sur toute la ligne ; deux en deux carrés ») :
  - 0 résultat (ou pendant le chargement) : la section n'apparaît pas.
  - 1 : une carte sur toute la ligne. 2 : deux cartes côte à côte (presque carrées : un vrai carré coupait le texte). 3 et plus : carrousel (format 545).
- Testé banc 375 px + chargement complet (mêmes erreurs que d'habitude). Aucun SQL. Build 20261002-546.

## (547) Page Écurie V2 — Actualités, Souvenirs, Événements
- Actualités (ses mots : « s'il n'y a rien elle ne doit pas apparaître ») : section cachée sans publication (et pendant le chargement).
- Souvenirs de la SEP vides alors que la page Souvenirs montrait des photos : CAUSE = le bloc ne lisait que les photos du fil de l'écurie ; les photos visibles sur la page Souvenirs venaient des ALBUMS PUBLICS des chevaux du club (signalé dès la 542).
  - Correction : le bloc ajoute les albums publics des chevaux du club (même lecture que la page Souvenirs : albums_cheval, visibilité public, 16 albums au plus), sur la liste des chevaux déjà chargée par la page. Une lecture de plus. Fil + albums mélangés, du plus récent au plus ancien, sans doublon.
- Souvenirs : petites photos plus grandes (format 4/5 au lieu de carré, la grande suit) ; 80 px d'espace sous le dernier bloc au lieu de 32 (« décolle du bas de page »).
- Prochains événements, 3 et plus (ses mots : « on les alignait côte à côte ») : cartes carrées comme pour 2 événements, côte à côte (46 % de large), qu'on fait glisser ; avant elles faisaient 78 % (une seule visible).
- Testé banc 375 px + chargement complet (mêmes erreurs que d'habitude). Aucun SQL. Build 20261002-547.

## (548) Revoir l'ancienne page Écurie (son choix : A + raccourci dans Mon compte)
- Adresse : 2hype.fr/?ecurie=ancienne → l'onglet Écurie montre l'ancienne page. Tout le monde garde la nouvelle par défaut.
- Raccourci dans Mon compte, visible de SON compte seulement (même règle que « Mes quêtes », estCompteFeinnHype) : « Voir l'ancienne page Écurie » ; une fois dessus, le bouton devient « Revenir à la nouvelle page Écurie ». Textes en 7 langues.
- Ça dure jusqu'au rechargement de l'appli ; rien n'est enregistré, aucune donnée touchée.
- ⚠️ L'adresse marche pour quiconque la connaît (ce n'est qu'un affichage, aucun droit en plus).
- Testé : avec l'adresse → ancienne page ; sans → nouvelle. Chargement complet sans nouvelle erreur. Aucun SQL. Build 20261002-548.

## (549) Page Écurie V2 — ordre et noir
- Ses mots : « passe les événements sous les chevaux et passe la page en noir plus profond ».
- Ordre : bandeau, onglets, citation, Nos chevaux, Prochains événements, Derniers résultats, Actualités, Souvenirs.
- Fond : #06100F → #030706 (toujours une pointe de vert), milieu du dégradé #081412 → #050B0A ; les voiles sombres du bandeau suivent le même noir. Cartes (#0E1A18) inchangées, elles ressortent donc un peu plus.
- Aucun SQL. Build 20261002-549.

## (550) Page Écurie V2 — cartes des événements moins hautes
- Ses mots : « réduis la hauteur des cartes des événements ».
- Zone d'image : 2 et plus (côte à côte) carré → 4/3 ; 1 seul (toute la ligne) 16/9 → 2/1. L'affiche reste entière (posée sur son flou).
- Ordre (ses mots : « passe-les sous les résultats ») : bandeau, onglets, citation, Nos chevaux, Derniers résultats, Prochains événements, Actualités, Souvenirs.
- Aucun SQL. Build 20261002-550.

## (551) Page Écurie V2 — Actualités côte à côte, fondu
- Ses mots : « passer les deux sur la même ligne comme sur la photo ; idéalement un fondu noir entre la photo et la partie avec le texte ».
- 2 publications : côte à côte (2 colonnes), photo à gauche (36 %), texte à droite en plus petit (date, titre 2 lignes, début du texte 2 lignes), petite flèche ronde. 1 seule : toute la ligne comme avant.
- Fondu : la photo se fond vers le fond de la carte côté texte (inversé en arabe). Publication sans photo : liseré champagne, comme avant.
- Testé banc 375 px (français et arabe), chargement complet sans nouvelle erreur. Aucun SQL. Build 20261002-551.

## (552) Hey Baby — la page partait sur le côté
- Sa vidéo (02:13) : la conversation glissait de gauche à droite, textes coupés des deux côtés.
- Cause : des messages contenant de longs morceaux SANS espace (journaux techniques collés, identifiants, liens) ne revenaient pas à la ligne ; la bulle dépassait l'écran et toute la liste devenait plus large que l'iPhone. Ce n'est PAS lié aux changements de la page Écurie.
- Correction : les bulles coupent ces longs morceaux n'importe où (overflowWrap anywhere), et la liste des messages ne défile plus de côté.
- Testé : avec un message de ce type, page de 604 px de large avant → 375 px après (largeur iPhone). Aucun SQL. Build 20261002-552.
- ⚠️ À noter (vu dans sa vidéo, rien de changé) : les journaux qu'elle a collés montrent « OpenAI HTTP 429 — credit_balance_exhausted » le 26/09 : le compte OpenAI de Hey Baby n'avait plus de crédit à ce moment-là.

## (553) Page Écurie V2 — « Accès rapides » (brief de Blandine)
- La rangée d'onglets texte qui défilait (sous le bandeau) devient le bloc « Accès rapides » : grille 3 × 2, mêmes 6 destinations (Cavaliers, Chevaux, Agenda, Actualités, Souvenirs, Santé), même place dans la page.
- Petit titre « Accès rapides » en serif ivoire + filet champagne qui s'efface (comme sa maquette).
- Cartes : 78 px de haut, coins 13 px, fond vert-noir à peine plus clair que la page, contour champagne fin (24 %), léger reflet en haut, aucune ombre.
- Icône 14 px dans un cercle de 28 px à trait très fin champagne, sans remplissage ni halo. Nom en serif ivoire capitales 12 px (10,5 px pour les mots longs, ex. ERINNERUNGEN). « Ouvrir → » supprimé ; à la place un tout petit filet champagne sous le nom.
- Écarts : 9 px entre colonnes, 10 px entre rangées. Toute la carte est tactile.
- Textes en 7 langues (titre ajouté). Testé banc 375 px en français, arabe, allemand, japonais. Chargement complet sans nouvelle erreur. Aucun SQL. Build 20261002-553.

## (554) Page Écurie V2 — citation au-dessus des Accès rapides
- Ses mots : « laisse la citation au-dessus des onglets ».
- Ordre : bandeau, citation, Accès rapides, Nos chevaux, Derniers résultats, Prochains événements, Actualités, Souvenirs.
- Vu sur sa capture : la citation de Feinn s'affiche « “ « … » ” » (deux paires de guillemets) car le texte enregistré contient déjà « ». Rien changé, signalé.
- Aucun SQL. Build 20261002-554.

## (555) Page Écurie V2 — une seule actualité, toute la largeur
- Ses mots : « remets les actualités sur toute la largeur avec une seule actualité ».
- La dernière publication du fil, sur toute la largeur (photo à gauche avec le fondu de la 551, sinon liseré champagne). Les autres restent dans « Voir tout ».
- Aucun SQL. Build 20261002-555.

## (556) Page Écurie V2 — actualité plus haute, événements plus petits
- Ses mots : « un peu plus de hauteur sur l'onglet actualité ; diminue la taille des prochains événements ».
- Actualité : carte de 150 px de haut au lieu de ~118 (photo et texte), texte centré en hauteur.
- Événements : zone d'image 16/10 (au lieu de 4/3) ; 1 seul : 5/2 (au lieu de 2/1) ; carrousel : cartes à 38 % de la largeur au lieu de 46 % (on en voit 2 et le début de la 3e) ; textes un peu plus petits.
- Aucun SQL. Build 20261002-556.

## (557) Page Écurie V2 — Souvenirs en carrousel (brief de Blandine)
- La mosaïque (544/547) devient un carrousel : une grande carte paysage (16/10, coins 16 px) centrée, les voisines dépassent de chaque côté et sont atténuées ; on glisse au doigt avec accroche au centre.
- Deux petites flèches rondes (32 px, contour champagne fin, fond noir translucide, chevron fin), centrées sur l'image ; grisées au début / à la fin. En arabe le sens est inversé.
- Points dessous : la position active en capsule champagne, les autres gris doux.
- En bas de chaque photo : seulement la DATE réelle (publication du fil ou album), discrète sur un léger dégradé. Pas de faux titre (les photos n'en ont pas).
- 5 souvenirs au plus (mêmes données qu'en 547 : fil + albums publics des chevaux). 1 seul : une carte sur toute la largeur, sans flèches ni points. 0 : petit encart vide (inchangé).
- Vidéo : rond lecture champagne au centre. Toucher une photo = en grand (inchangé).
- Testé banc 375 px (français, arabe, 1 photo), flèches cliquées. Chargement complet sans nouvelle erreur. Aucun SQL. Build 20261002-557.

## (558) Page Écurie V2 — résultats moins hauts, blocs rapprochés
- Ses mots : « réduis un peu la hauteur des cartes des résultats et diminue un peu l'espace entre chaque bloc ».
- Cartes de résultats (carrousel) : 212 px au lieu de 240, marges intérieures et espacements un peu réduits (rien de supprimé).
- Espace au-dessus de chaque bloc : 40 px au lieu de 52 (Prochains événements 34 au lieu de 40, Souvenirs 40 au lieu de 48, Accès rapides 22 au lieu de 26).
- Aucun SQL. Build 20261002-558.

## (559) Page Écurie V2 — événements : l'affiche prend toute la carte
- Ses mots : « que les affiches prennent plus de place et soient fondues / assombries en bas pour mettre le texte par-dessus ».
- L'affiche remplit toute la carte (cadrée par le haut), un dégradé noir monte du bas, date + titre + lieu posés dessus (texte ivoire, date champagne). Plus de bande de texte séparée ni de flou autour de l'affiche.
- Formats : 3 et plus (carrousel) 4/5 ; 2 : carré ; 1 seul : 16/9. ⚠️ Comme l'affiche remplit la carte, le bas d'une affiche en hauteur est coupé (surtout pour 1 seul événement, en largeur) ; l'affiche entière reste visible en ouvrant l'événement.
- Sans affiche : grande date champagne en haut, texte en bas (même dégradé).
- Aucun SQL. Build 20261002-559.

## (560) Page Écurie V2 — Souvenirs plus variés, sans la photo de l'actualité
- Ses mots : « varie plus que ça dans les photos souvenirs et ne prends pas la même que celle dans l'actualité ».
- Les photos de la publication affichée dans « Actualités » sont écartées des Souvenirs.
- Une seule photo par publication et par album d'abord (la plus récente de chacun), en alternant photo du fil / photo d'album ; une 2e photo d'une même source seulement s'il manque de quoi remplir les 5 places.
- Lecture des albums : ajout de la colonne id (déjà lue par la page Souvenirs) pour reconnaître chaque album. Aucun SQL. Build 20261002-560.

## (561) Page Écurie V2 — photos Souvenirs un peu plus petites
- Ses mots : « les photos des souvenirs un peu plus petites ».
- Carrousel : carte d'environ 279 px de large au lieu de 315 (48 px de marge de chaque côté au lieu de 30), format 16/9 au lieu de 16/10 ; les voisines dépassent davantage, les flèches sont posées sur elles. 1 seul souvenir : 16/9.
- Aucun SQL. Build 20261002-561.

## (562) Page Écurie V2 — chevaux un peu plus petits, photo du haut fondue dans le noir
- Ses mots : « réduis un petit peu la taille des chevaux ; un fondu de la photo de l'onglet écurie vers le noir sur la partie basse ».
- Chevaux : cartes au format 10/11 au lieu de 4/5 (environ 12 % moins hautes) ; la carte centrale « Les chevaux de l'écurie » a un texte un peu plus petit pour garder des rangées égales.
- Bandeau : la photo elle-même s'efface progressivement vers le bas (pleine jusqu'à 42 %, puis s'estompe jusqu'au noir de la page) au lieu d'un simple voile ; fond du bandeau = noir de la page. Les voiles existants (gauche, coin, bas) sont gardés.
- Aucun SQL. Build 20261002-562.

## (563) Page Écurie V2 — 3 résultats visibles sur la ligne
- Ses mots : « on avait dit qu'on réduisait pour en avoir 3 sur la même ligne ».
- Carrousel des résultats (3 et plus) : chaque carte fait un tiers de la largeur → 3 cartes visibles en entier, on glisse pour les suivantes. Hauteur 164 px, coins 14 px, portrait 40 px, textes réduits (nom du concours 2 lignes, épreuve et « + N autres classées » sur une ligne).
- 1 ou 2 résultats : inchangé (toute la ligne / deux côte à côte).
- Aucun SQL. Build 20261002-563.

## (564) Page Écurie V2 — bouton photo aligné, 2 événements centrés
- Ses mots : « l'icône de l'appareil photo n'est pas alignée avec les autres ».
  - Le bouton 📷 (propriétaire) passe sur la même rangée que Partager et le drapeau, même taille (38 px), même écart (8 px), à droite. Avant : 44 px, plus bas.
- Ses mots : « quand il n'y a que deux événements, moins larges et plus espacés des bords et entre eux ».
  - 2 événements : mêmes cartes que le carrousel (38 % de large, format 4/5), centrées avec des espaces égaux sur les bords et entre elles. Avant : deux carrés pleine largeur.
- Aucun SQL. Build 20261002-564.

## (565) Page Écurie V2 — écurie nouvelle ou peu remplie (brief de Blandine)
- « Responsable » = celui qui peut changer la photo de couverture (même règle que le 📷). Tout le reste = visiteur / membre.
- Nouveau bloc « Faites vivre votre écurie » (responsable seulement), sous les Accès rapides : titre serif, petite phrase, 3 lignes avec icône fine et chevron — Ajouter un cheval (même fenêtre que « + Ajouter »), Créer un événement (formulaire de l'agenda si autorisé, sinon page Agenda), Publier une actualité (fil de l'écurie). Il disparaît dès qu'il y a au moins 1 cheval ET au moins 1 événement / actualité / souvenir. N'apparaît qu'une fois tout chargé.
- Chevaux vides : responsable → petite carte « Présentez les chevaux de l'écurie / Ajouter un cheval › » avec icône fine ; visiteur → « Les chevaux de l'écurie seront bientôt présentés ici. »
- Souvenirs vides : responsable → « Commencez l'album de l'écurie / Les photos partagées apparaîtront ici. / Ajouter une photo › » (ouvre le fil de l'écurie) ; visiteur → « Les souvenirs de l'écurie apparaîtront ici. »
- Résultats, Événements, Actualités vides : déjà cachés (546-547), inchangé.
- Couverture : ⚠️ la photo générique par défaut (UV3_H2, ajoutée en 541 quand la SEP n'avait pas de bannière) n'est PLUS utilisée — le brief interdit une photo qui ne serait pas celle du club. Sans bannière : fond vert-noir, fin motif de tête de cheval champagne très pâle, grain discret ; « Ajouter une photo de couverture » en petit pour le responsable, rien pour le visiteur. La SEP et Feinn ont chacune leur bannière : pas d'effet pour elles.
- ⚠️ NON FAIT, à décider : le brief demande « + Ajouter » (chevaux) pour le responsable seulement. Aujourd'hui tout membre connecté le voit et s'en sert pour ajouter SON cheval à l'écurie ; le réserver au responsable retirerait cette possibilité aux membres. Laissé tel quel.
- Textes en 7 langues. Testé banc 375 px (page vide responsable / visiteur, page pleine : le bloc « Faites vivre » n'apparaît pas). Aucun SQL. Build 20261002-565.

## (566) Page Écurie V2 — états vides alignés sur la maquette
- Son « Ok » aux points 1 à 3 de la comparaison avec sa maquette.
- Chevaux vides (responsable) : grand dessin de tête de cheval au trait champagne (66 px) à gauche, au lieu de la petite icône ronde.
- « Faites vivre votre écurie » : icônes plus grandes (21 px), lignes un peu plus hautes (46 px).
- Souvenirs vides (responsable) : icône photo dans un cadre arrondi légèrement teinté champagne (52 px).
- Couverture sans photo : fond graphique gardé (point 4 non tranché) ; elle annonce une photo à envoyer.
- Aucun SQL. Build 20261002-566.

## (567) Page Écurie V2 — photo de couverture par défaut choisie par Blandine
- Elle a envoyé une photo (allée d'écurie, boxes, lanternes, porte voûtée) pour les écuries SANS photo de couverture.
- Intégrée dans index.html (JPEG 1100 px, ~89 Ko, constante IMG_ECURIE_DEFAUT_V2) : aucun fichier en plus à pousser. Même fondu vers le noir en bas que les autres couvertures.
- Remplace le fond graphique de la 565 (qui ne s'affiche plus que si l'image manquait). Les écuries qui ont leur photo (SEP, Feinn) ne changent pas.
- ⚠️ Comme il y a toujours une image, le gros bouton « Ajouter une photo de couverture » n'apparaît plus ; le responsable change la photo avec le bouton 📷 en haut à droite (comme avant).
- Aucun SQL. Build 20261002-567.

## (568) Couverture par défaut : fichier à part, plus de base64
- Ses mots : « on avait dit qu'on arrêtait ça car trop lourd ». Erreur de ma part en 567 : j'avais mis la photo en base64 dans index.html alors que la règle est de sortir les images de l'index (chantier « photos base64 → fichiers »).
- La photo est maintenant un fichier : images/ecurie-couverture-defaut.webp (WebP 1100 px, ~54 Ko), lu par l'adresse « images/ecurie-couverture-defaut.webp ». index.html retrouve son poids d'avant la 567.
- ⚠️ Le fichier image DOIT être poussé dans le dossier images/ du dépôt, sinon les écuries sans photo afficheraient le fond vert-noir (la carte ne casse pas).
- Aucun SQL. Build 20261002-568.

## (569) Page Écurie V2 — bloc Souvenirs retiré
- Ses mots : « retire la partie souvenir de la page Écurie, comme il a son onglet là-haut ».
- La page se termine maintenant par « Actualités de l'écurie ». Les Souvenirs restent accessibles par l'Accès rapide « Souvenirs » (page Souvenirs du club, inchangée).
- La lecture des albums publics des chevaux (ajoutée en 547 pour ce bloc) est coupée : une requête en moins au chargement. Le code du bloc est gardé (remettre blocSouv dans la liste + retirer la ligne « if (true) return; » pour le ravoir).
- Le bloc « Faites vivre votre écurie » compte toujours les photos du fil comme souvenirs (plus les albums).
- Aucun SQL. Build 20261002-569.

## (570) Nouvelle photo de couverture par défaut (fichier, pas de base64)
- Blandine a envoyé une autre photo (écurie au coucher du soleil, cyprès, chevaux au pré) pour les écuries SANS couverture.
- Fichier images/ecurie-couverture-defaut-2.webp (WebP 1100 px, ~91 Ko). Nouveau nom exprès : l'ancienne image ne peut pas rester en cache. index.html ne contient que l'adresse ; aucune image en base64 ajoutée (vérifié : les seules images base64 restantes de l'index — IMG_QUETES_FOND / IMG_QUETES_HERO — existaient avant ce chantier).
- images/ecurie-couverture-defaut.webp (568) n'est plus utilisée : peut rester ou être supprimée du dépôt, sans effet.
- Sur iPhone, le bandeau montre le centre-haut de la photo (ciel, colline, cyprès, façade) ; le bas (chevaux au pré, allée) passe dans le fondu noir.
- Aucun SQL. Build 20261002-570.

## (571) Page Écurie V2 — fin de page « signature minimaliste » (son choix : proposition 3, symbole HYPE)
- Sous la dernière section (Actualités) : 34 px, puis une bande de paysage très basse (118 px, toute la largeur) fondue dans le noir en haut, en bas et sur les côtés (aucun cadre, aucun coin, aucune ombre), puis une fine ligne champagne – HYPE (serif, espacé) – fine ligne champagne, puis 26 px avant la barre du bas (au lieu de 80 px vides).
- Image = fichier images/ecurie-fin-de-page.webp (~7 Ko), PAS de base64 (vérifié : nombre d'images intégrées dans l'index inchangé). ⚠️ Provisoire : découpée dans sa maquette (basse résolution, un peu floue sur iPhone) ; à remplacer par la vraie photo dès qu'elle l'envoie (même nom → changer le nom pour éviter le cache).
- Si l'image manque, elle disparaît sans casser la page (la signature reste).
- En arabe : lignes inversées, photo non retournée. Rien d'autre touché.
- Aucun SQL. Build 20261002-571.

## (572) Fin de page Écurie — vraie photo
- Blandine a envoyé la vraie photo panoramique (coucher de soleil, cheval bai de trois quarts arrière à droite, encolure nattée).
- Fichier images/ecurie-fin-de-page-2.webp (1000 px de large, ~18 Ko) ; nouveau nom pour éviter l'ancienne image en cache. Pas de base64 (nombre d'images intégrées dans l'index inchangé : 108).
- images/ecurie-fin-de-page.webp (571, provisoire) ne sert plus : peut rester ou être supprimée.
- Aucun SQL. Build 20261002-572.

## (573) Page Écurie V2 — la signature HYPE passait sous la barre du bas
- Sa capture (13:18) : tout en bas, « HYPE » et ses deux lignes étaient à moitié cachés par la barre de navigation.
- Cause : en 571 j'ai réduit l'espace du bas de 80 à 26 px en croyant que l'appli réservait déjà la place de la barre — ce n'est pas le cas sur cette page. Erreur de ma part.
- Correction : vraie cale en fin de page = hauteur de la barre (84 px + encoche, même mesure que caleBarreHype) + 26 px d'air ; le padding du bas passe à 0.
- Aucun SQL. Build 20261002-573.

## (574) Fin de page Écurie — plus d'air
- Ses mots : « laisse plus de place au-dessus et en dessous de la fin de page ».
- Au-dessus de la photo : 64 px au lieu de 34. En dessous de la signature HYPE : 56 px au lieu de 26 (en plus de la hauteur de la barre du bas).
- Aucun SQL. Build 20261002-574.

## (575) Fin de page Écurie — moins d'espace en dessous
- Sa capture de la 574 : la signature est entière, mais ~146 px vides sous HYPE (« ça descend peut-être un peu trop »). Constat : sur cette page la barre du bas ne recouvre presque pas la fin (ce que je croyais en 573 était faux) — l'espace visible ≈ la hauteur de la cale.
- Cale du bas : encoche + 64 px (au lieu de encoche + 140) → environ autant d'air sous HYPE qu'au-dessus de la photo.
- Aucun SQL. Build 20261002-575.

## (576) Page Écurie V2 — Prochains événements « grande image + détails » (brief de Blandine)
- Les 2 prochains événements (triés par date) en 2 cartes horizontales empilées, 14 px entre elles, toute la largeur, 132 px de haut, coins 20 px, bordure champagne très fine, fond vert-noir en léger dégradé, sans ombre.
- Dans chaque carte : colonne date (jour en grand ivoire, mois champagne en capitales, année discrète, fond plus sombre, fine séparation) | l'affiche réelle recadrée (cover, cadrée par le haut, ~33 % de la largeur, fondue vers la zone texte) | titre serif (2 lignes max), badge du type réel en champagne (Stage / Concours / Sortie, 7 langues — c'est le type enregistré, il n'existe pas de champ « CSO »), lieu avec petite épingle | petit rond chevron. Toute la carte ouvre l'événement ; « Voir tout » inchangé.
- Sans affiche : pas de zone image (le texte prend la place). Sans événement : section toujours cachée.
- Remplace l'affichage 545-564 (1 / 2 / carrousel) : on ne montre plus que 2 événements, les autres via « Voir tout ». L'ancien dessin (carteEv) est gardé dans le code, plus appelé.
- Testé banc 375 px (français, arabe : sens inversé). Aucun SQL. Build 20261002-576.

## (577) ACCUEIL V2 — build 1 : la coquille et le hero (chantier refonte de l'accueil, décisions de Blandine du 02/10)
- Nouvel accueil `EcranAccueilV2` construit À CÔTÉ de l'ancien `EcranUnivers`, qui n'est pas touché (retour arrière possible à tout moment). Interrupteur `ACCUEIL_V2_ACTIF` (à côté de `AFFICHER_ACTU_LAMOTTE`) : `true` = nouvel accueil, `false` = l'ancien revient tel quel. Une seule ligne du routeur change (route « dashboard » inchangée) : UN SEUL accueil est monté, jamais les deux (pas de masquage CSS → une seule vidéo, une seule série de requêtes, un seul versement d'XP).
- À l'écran au build 1 : le fond, la vidéo actuelle du cheval noir (même fichier, même rendu : lecture auto, muet, poster, image de secours, pause hors écran), les quatre boutons du haut tels quels (déconnexion, cloche, enveloppe + pastille des non-lus, drapeau 7 langues), la phrase « Ton univers équestre » sous la vidéo (7 langues), les dimensions générales (430 px, cale basse 92 px + encoche) et la barre du bas de l'appli (inchangée, portail body). Le corps de page est VIDE : les blocs arrivent un par un (Aujourd'hui, phrase manuscrite, grille 3 × 3, Mon profil, Ma communauté).
- − À l'écran (par rapport à l'ancien accueil) : manège Elfe/Rizotto, bandeau d'annonces, « La suite pour toi », « Tes prochaines quêtes », cartes Mon Écurie / Communauté / Hey Baby / Galops / Linguae / Culture / Vidéothèque / Partenaires / Premium, « Mon compte », « What's up ». Tout reste dans le code de l'ancien accueil.
- Gardé en arrière-plan : `EffetsAccueilDashboard`, composant invisible dans V2 qui reprend la mécanique de « La suite pour toi » (nombre d'amis + `hypeVerserXpQuetes`, verrou en base `hype_paliers`) : l'XP des quêtes accomplies continue d'être versée à chaque ouverture de l'accueil, sans rien afficher. La cloche garde la quête « notifs ». Balayage bord gauche (retour à la page précédente), balayage vers le globe sans écurie, retour au rendez-vous après inscription, invitations, filigrane : inchangés (ils vivent dans le routeur ou sont recopiés à l'identique).
- Styles V2 dans `ACC2_CSS` (scope `.acc2`), indépendants de `UV3_CSS` ; les règles du hero y sont recopiées à l'identique. Seul ajout par rapport à l'ancien hero : l'observateur de pause de la vidéo est arrêté quand on quitte la page.
- Connu, non corrigé (identique à l'ancien accueil, à traiter à part) : le versement d'XP part avant le retour du nombre d'amis, donc la quête « Ajoute ton premier ami » n'est jamais payée par ce mécanisme.
- Vérifications : node --check 18/18 blocs OK ; marqueurs de garde présents ; diff confiné au marqueur, à la ligne du routeur et au bloc V2 ; banc Playwright 375 px (Supabase simulé) en fr et ar : V2 seul monté, 4 boutons, barre 7 onglets, aucune erreur ; hero comparé pixel à pixel à l'ancien dans les mêmes conditions : identique ; interrupteur à `false` testé : l'ancien accueil revient.
- Aucune image à pousser (les 3 bandeaux provisoires `accueil_v2_*_v1.webp` ne servent qu'à partir du build 2). Aucun nouveau texte (tout réutilise des libellés 7 langues existants). Aucun SQL. Build 20261002-577.

## (578) ACCUEIL V2 — build 2 : la carte « Aujourd'hui »
- Sous le hero, dans le corps de l'accueil V2 : carte horizontale basse (80 px, coins 18 px, bordure champagne très fine), fond image provisoire découpé dans la maquette, fort voile sombre côté texte, « Aujourd'hui » en serif ivoire (Cormorant Garamond, déjà chargée) + « Continuer ma progression » en Montserrat, petite flèche ronde champagne à droite. Toute la carte ouvre la page Mon apprentissage telle quelle (pas de progression personnalisée calculée, décision de Blandine ; la page reconnaît la cavalière connectée par elle-même).
- Textes en 7 langues (fr, en, es, it, ja, de, ar) par le tr du contexte. Arabe : voile et flèche changent de côté, chevron retourné, texte aligné à droite (propriétés CSS logiques).
- Image : `images/accueil_v2_aujourdhui_v1.webp` (695 × 246, ~12 Ko, WebP) = le bandeau de la maquette nettoyé (bout de texte et flèche de la maquette retirés, bord gauche fondu au noir) ; pas de base64, pas d'agrandissement artificiel ; elle sera remplacée par le vrai visuel plus tard (nouveau nom de fichier à ce moment-là, à cause du cache). Si le fichier manque, la carte reste lisible sur fond pétrole.
- Dans le composant : `nav()` (même fonction que l'ancien accueil : on oublie le cavalier ouvert avant de partir) et `trA()` (tr du contexte) ajoutés ; ils serviront aux blocs suivants.
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; banc Playwright 375 px fr + ar, aucune erreur ; l'interrupteur `ACCUEIL_V2_ACTIF` inchangé. Aucun SQL. Build 20261002-578.

## (579) ACCUEIL V2 — build 3 : la signature manuscrite
- Sous la carte « Aujourd'hui » : « Plus qu'une application, un mode de vie équestre. » en VRAI texte (pas d'image), champagne, centré, deux lignes (la coupure est fixée après la virgule dans chaque langue), 28 px d'air au-dessus et 30 px en dessous.
- 7 langues : fr, en, es, it, ja (« アプリを超えて、馬と生きるライフスタイル。»), de (« Mehr als eine App, ein Leben zu Pferd. »), ar (« أكثر من تطبيق، أسلوب حياة فروسي. », sans voyelles). Par le tr du contexte.
- Polices : Parisienne (écriture manuscrite) pour fr/en/es/it/de ; japonais en Noto Sans JP (déjà chargée par l'appli), jamais une police script latine sur le japonais ou l'arabe ; arabe en Aref Ruqaa. Les deux polices sont demandées à Google Fonts par la feuille de style de l'accueil V2 (même mécanique que la page Communauté avec COMM_CSS_HYPE), et Google ne sert que les fichiers réellement utilisés : Aref Ruqaa n'est téléchargée que si la langue est l'arabe. Repli si la police n'arrive pas (hors ligne) : Cormorant Garamond.
- ⚠️ Le rendu de l'écriture manuscrite n'a pas pu être vu sur le banc (Google Fonts injoignable depuis le banc, repli Georgia affiché) : à vérifier sur l'iPhone. La mise en page (deux lignes, centrage, espaces, arabe à droite, japonais) a été vérifiée en fr, ar et ja.
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; aucune erreur au rendu. Aucune image, aucun SQL. Build 20261002-579.

## (580) ACCUEIL V2 — build 4 : la grille 3 × 3
- Sous la signature : neuf tuiles sur trois colonnes (10 px d'écart), fond pétrole très sombre en léger dégradé, bordure champagne très fine, coins 16 px, icône champagne au trait (24 px), libellé ivoire en serif (Cormorant Garamond), deux lignes maximum ; les tuiles d'une même ligne ont la même hauteur. Compactes et tactiles (68 px minimum).
- Ordre imposé : Mon écurie · Mes chevaux · Hey Baby / Galops · Culture équestre · Vidéothèque / Linguae · Le coin des pro · Mon compte. En arabe la grille s'inverse d'elle-même (dir=rtl).
- Icônes : maison, fer à cheval, robot, rosette, livre, lecture vidéo, globe, groupe, document. Fer, rosette, livre, vidéo, globe et document sont les tracés déjà utilisés par les cartes de quêtes (`qIcone`) ; maison, robot et groupe sont dessinés au même trait.
- Libellés en 7 langues (fr, en, es, it, ja, de, ar) par le tr du contexte ; « Hey Baby » et « Linguae » restent tels quels partout.
- ⚠️ Au build 4, une tuile ne fait encore RIEN quand on la touche : les destinations sont branchées au build 5 (plan validé par Blandine).
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; banc 375 px en fr, ar et de, aucune erreur. Aucune image, aucun SQL. Build 20261002-580.

## (581) ACCUEIL V2 — build 5 : les destinations des 9 tuiles
- Mon écurie → page Écurie du club (« guilde », la même que l'onglet du bas) · Mes chevaux → page Cavalier (« moncavalier »), ouverte EN HAUT : pas de défilement automatique vers la section chevaux pour l'instant (aucune ancre, et une restauration de défilement concurrente ; à traiter dans un build à part) · Hey Baby → « assistant » · Galops → « galops » · Culture équestre → « articles » · Vidéothèque → « videos » · Linguae → lingo.html (même mécanique que l'ancien accueil : même onglet, Linguae a son propre retour) · Le coin des pro → « sellerie » (l'ancienne carte Nos partenaires) · Mon compte → « profil » (la page que l'ancien bouton ouvrait déjà ; elle n'est PAS du code mort : seul accès à la modération).
- Toutes les tuiles passent par nav() comme l'ancien accueil : le cavalier ouvert est oublié avant de partir, donc « Mes chevaux » ouvre bien la page de la cavalière connectée. Aucune nouvelle page, aucune table, aucun SQL.
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; sur le banc, chaque tuile touchée quitte l'accueil sans erreur et Linguae ouvre bien lingo.html (seule exception de banc : Vidéothèque réclame hype-video.js, absent du banc, présent en ligne — comportement identique à l'ancien accueil). Build 20261002-581.

## (582) ACCUEIL V2 — build 6 : la grande carte « Mon profil »
- Sous la grille (22 px d'air) : carte horizontale de 86 px, même dessin que « Aujourd'hui » (coins 18 px, contour champagne très fin, voile sombre côté texte, « Mon profil » en serif ivoire + « Mon espace, mes objectifs, mon parcours » en Montserrat, flèche ronde champagne). L'image est cadrée à droite (à gauche en arabe). Toute la carte ouvre la page Cavalier (« moncavalier », via nav() comme les tuiles).
- Textes en 7 langues par le tr du contexte (sous-titre limité à deux lignes pour les langues longues, l'italien tient sur une).
- Image : `images/accueil_v2_profil_v1.webp` (700 × 144, ~5 Ko) = le bandeau de la maquette nettoyé (bande des tuiles en haut, flèche et bout de texte de la maquette retirés, bord gauche fondu au noir) ; pas de base64 ; remplaçable plus tard par le vrai visuel (nouveau nom de fichier). Si le fichier manque, la carte reste lisible sur fond pétrole.
- Dans le composant : `carteGrande()` (mêmes blocs que la carte Aujourd'hui, paramétrés) ; la carte Aujourd'hui validée n'est pas touchée. Servira aussi à Ma communauté (build 7).
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; banc 375 px fr, ar, it, aucune erreur. Aucun SQL. Build 20261002-582.

## (583) ACCUEIL V2 — build 7 : la grande carte « Ma communauté » + son verrou
- Sous Mon profil (14 px d'air) : carte horizontale de 86 px, même dessin (cavaliers de dos au coucher du soleil cadrés à droite, voile sombre côté texte, « Ma communauté » + « Rencontrer, échanger, partager », flèche ronde champagne). 7 langues par le tr du contexte.
- Verrou : EXACTEMENT la règle de l'onglet Communauté de la barre du bas (368) — seul le compte Feinn (`estCompteFeinnHype`) ouvre la page « communaute » ; pour les autres, un toucher affiche la bulle « Prochainement » (même texte 7 langues, même habillage que la barre) pendant 2,2 s, posée sur le coin haut de la carte côté flèche pour ne recouvrir ni le texte ni la carte Mon profil. Le compte est lu une fois au montage comme le fait la barre (`utilisateurActuel` = session en mémoire, pas une requête en base ; l'utilisateur n'est pas dans le contexte App). Les autres chemins vers la page (liens de story, notifications) ne sont pas touchés.
- Image : `images/accueil_v2_communaute_v1.webp` (720 × 117, ~6 Ko), bandeau de la maquette nettoyé (bas de la carte précédente, bout de texte et flèche de la maquette retirés, bord gauche fondu au noir) ; pas de base64 ; à remplacer plus tard par le vrai visuel.
- `carteGrande()` accepte maintenant une classe et un style en plus (la carte Mon profil ne change pas).
- Vérifications : node --check 18/18 ; marqueurs de garde présents ; banc : avec un compte ordinaire le toucher montre la bulle et reste sur l'accueil, elle disparaît après 2,2 s ; avec le compte feinn@live.fr la page Communauté s'ouvre ; aucune erreur. Aucun SQL. Build 20261002-583.
- Avec ce build, les 7 blocs de la maquette sont en place. Reste, sur décision de Blandine : RTL complet du corps (déjà posé bloc par bloc, à vérifier en vrai), vrais visuels, raffinements, puis le nettoyage de l'ancien accueil (EcranUnivers reste pour l'instant le retour arrière, `ACCUEIL_V2_ACTIF`).

## (584) ACCUEIL V2 — les vrais visuels des trois bandeaux
- Blandine a envoyé les trois images définitives (cavaliers de face au coucher du soleil pour « Aujourd'hui », cavalière seule sur la colline pour « Mon profil », cavaliers de dos pour « Ma communauté »). Elles remplacent les découpes provisoires de la maquette.
- Fichiers, sous de NOUVEAUX noms (règle du cache : un nom déjà servi peut rester en mémoire sur les téléphones) : `images/accueil_v2_aujourdhui_v2.webp` (1000 × 333, ~32 Ko), `images/accueil_v2_profil_v2.webp` (1000 × 250, ~23 Ko), `images/accueil_v2_communaute_v2.webp` (1000 × 250, ~29 Ko). WebP qualité 80, largeur 1000 px (≈ 3 × la largeur affichée : net sur iPhone). Pas de base64. Aucun retraitement : les images sont déjà sombres à gauche, le voile des cartes fait le reste.
- Dans index.html : seules les trois adresses d'image changent (et les commentaires qui les citent). Cadrages inchangés (Aujourd'hui centré à 42 %, les deux grandes cartes cadrées à droite / à gauche en arabe).
- Les anciens fichiers `accueil_v2_*_v1.webp` ne sont plus utilisés : à supprimer du dépôt ou à laisser, sans effet.
- Vérifications : node --check 18/18 ; marqueurs de garde ; banc 375 px avec les vraies images : les trois cartes rendent correctement (cavaliers visibles, sujet à droite pour Mon profil et Ma communauté), aucune erreur. Aucun SQL. Build 20261002-584.

## (585) ACCUEIL V2 — plus d'air au-dessus de « Mon profil »
- Sa demande : « laisse plus d'espace au-dessus de Mon profil ». L'écart entre la grille et la carte Mon profil passe de 22 à 36 px. L'écart entre Mon profil et Ma communauté (14 px) ne change pas.
- Une seule règle CSS modifiée (`.acc2-carte-g{margin-top}`). node --check 18/18 ; marqueurs de garde ; banc 375 px, aucune erreur. Aucune image, aucun SQL. Build 20261002-585.

## (586) ACCUEIL V2 — trois réglages visuels (brief de Blandine)
- (1) Espace grille → Mon profil : 36 px, dans sa cible « 28 à 36 px » (c'est la valeur posée au 585 ; si elle voyait encore le 584, l'écart était de 22 px). Carte Mon profil et écart Mon profil → Ma communauté inchangés. Mesuré au banc : 36 px.
- (2) Icônes de la grille agrandies de 24 à 27 px (+12,5 %). Le trait reste visuellement le même (épaisseur ramenée de 1,7 à 1,51 unité pour compenser l'agrandissement, donc 1,7 px à l'écran, identique aux cartes de quêtes) ; même champagne ; tuiles NON agrandies (écart icône-texte 7 → 6 px, marges 10/9 → 9/8 px, hauteur minimale 68 px conservée, mesurée) ; textes inchangés.
- (3) « Mes chevaux » : tête de cheval de profil au trait (oreille, chanfrein, naseaux, encolure avec une ligne de crinière, œil) dessinée au même trait que les autres icônes, à la place du fer à cheval. Pas de remplissage, pas d'emoji.
- Rien d'autre touché : ordre, couleurs, textes, destinations, vidéo, images, barre du bas, dimensions de la grille, polices. node --check 18/18 ; marqueurs de garde ; banc 375 px, aucune erreur. Aucune image, aucun SQL. Build 20261002-586.

## (587) BARRE DU BAS — habillage « fondu, champagne » (brief de Blandine, purement visuel)
- ⚠️ La barre est la même sur TOUTES les pages de l'appli (une seule barre, portail body) : le nouvel habillage s'applique donc partout, pas seulement sur l'accueil. Mêmes 7 onglets, même ordre, mêmes destinations, même verrou Communauté (bulle inchangée), même portail, même cale, aucune logique touchée.
- Fond : dégradé vertical sombre (rgba(8,13,15,.72) → rgba(7,11,13,.88) → rgba(5,7,9,.97)) à la place du bloc bleu, léger flou de profondeur (backdrop-filter 10 px ; sans flou le dégradé seul suffit), liseré champagne à 10 % au lieu de la ligne bleue, et une zone de transition de 16 px au-dessus (fondu transparent → sombre) pour que la barre « naisse » du fond.
- Icônes : les emojis ne pouvant pas prendre les couleurs demandées, chaque onglet reçoit une icône au trait (24 px, trait 1,6) de la même famille que la grille de l'accueil V2 : maison (Accueil), livre (Galops), silhouette (Cavalier), étincelles (Communauté), tête de cheval (Écurie), robot (Hey Baby), gemme (Premium). Livre et gemme reprennent les tracés des cartes de quêtes (`qIcone`), les autres sont dessinés (`icNavBarre`, juste avant `NavBar`). Les champs `icone` (emojis) des onglets restent dans la liste, inutilisés.
- États : inactif ivoire atténué rgba(243,238,228,.62) (icône et texte) ; actif champagne #D2B07A (icône et texte en gras) + une ligne fine de 14 × 1,5 px sous le libellé, posée en absolu pour ne pas changer la hauteur. Plus de turquoise dans la barre. Onglet Communauté verrouillé toujours à 45 % d'opacité.
- Air vertical : 12 px en haut de barre (10 avant) et 8 px au-dessus de l'icône (7 avant) ; hauteur mesurée 81 px hors encoche (78 avant), sous la cale de 84 px des pages et de 92 px de l'accueil V2 : rien de caché, aucun saut.
- Vérifications : node --check 18/18 ; marqueurs de garde ; banc : chaque onglet touché ouvre sa page et s'allume, retour Accueil OK, 7 icônes à 24 px, aucune erreur ; arabe : ordre inversé de lui-même. Aucune image, aucun SQL. Build 20261003-587.

## (588) ACCUEIL V2 — bloc Premium « Le Cercle Crystal » en fin de page (brief de Blandine, option 9.1)
- Après Ma communauté (32 px d'air), avant la barre : bloc horizontal de 144 px, coins 20 px, bordure champagne à 30 %, fond pétrole → noir. À gauche : petit diamant champagne (tracé `cristal` des cartes de quêtes) + « LE CERCLE CRYSTAL » en Cinzel ivoire espacé + « La signature Premium de Hype. » + petit bouton contour champagne « Découvrir › » (34 px, fond presque noir). À droite : son visuel du cheval noir à la bride dorée, fondu dans le noir par un voile côté texte (pas de séparation nette, aucun turquoise). Tout le bloc ouvre la page Premium par la navigation existante (`nav("premium")`), le bouton reste visible.
- Statut Premium lu dans le contexte App (`ctx.premium`, déjà calculé : abonnement mensuel/annuel/duo, VIP, ambassadrice, sauf « Mode gratuit »), AUCUNE requête : abonnée → « Mon Cercle Crystal › », sinon « Découvrir › ».
- Image : `images/accueil_v2_premium_crystal_v1.webp` (1000 × 465, ~30 Ko, WebP) = son visuel redimensionné ; aucun texte dedans, pas de base64. Si le fichier manque, le bloc reste lisible sur fond pétrole.
- 7 langues (fr, en, es, it, ja, de, ar) par le tr du contexte, y compris « Mon Cercle Crystal ». Arabe : texte à droite, image retournée (le cheval passe à gauche, il est à droite dans la photo), chevron inversé.
- Espace sous le bloc : 6 px + la cale de l'accueil (92 px + encoche) : la barre ne le recouvre pas.
- Vérifications : node --check 18/18 ; marqueurs de garde ; banc 375 px fr et ar, compte gratuit et compte abonné (libellé qui change), aucune erreur. Aucun SQL, rien d'autre touché. Build 20261003-588.

## (589) Page Écurie V2 — cartes « Prochains événements » moins hautes, section « Actualités de l'écurie » retirée
- Sa demande (formulée « sur la page cavalier » : les deux blocs vivent sur la page ÉCURIE du club, c'est là que c'est fait) : les deux cartes d'événements passent de 132 à 108 px de haut ; même contenu (colonne date, affiche, titre sur 2 lignes, badge du type, lieu, chevron).
- La section « Actualités de l'écurie » (titre + dernière publication) n'est plus affichée. Code gardé (`blocActu`) : remettre `blocActu,` dans la liste des sections pour la faire revenir. L'accès rapide « Actualités » en haut de la page ouvre toujours le fil ; le bloc « Faites vivre votre écurie » continue de compter les publications.
- Vérifications : node --check 18/18 ; marqueurs de garde ; banc 375 px avec deux événements factices : cartes mesurées à 108 px, section Actualités absente, aucune erreur. Aucune image, aucun SQL. Build 20261003-589.

## (590) ACCUEIL V2 — fin de page « signature » comme sur la page Écurie (sa demande, avec son visuel)
- Tout en bas de l'accueil, sous le bloc Premium (56 px d'air) : la même fin de page que l'Écurie (571-575) — une bande de paysage très basse (118 px, toute la largeur, fondue dans le noir en haut, en bas et sur les côtés, sans cadre ni bouton), puis la signature « HYPE » en Cormorant champagne entre deux filets champagne. En arabe les filets s'inversent, la photo n'est pas retournée.
- Image : `images/accueil_v2_fin_de_page_v1.webp` (1000 × 333, ~19 Ko, WebP) = son visuel du cheval noir au-dessus du lac au coucher du soleil, redimensionné ; pas de base64 ; si le fichier manque, la bande disparaît et la signature reste.
- Sous la signature : la cale de l'accueil (92 px + encoche), la barre ne recouvre rien.
- Vérifications : node --check 18/18 ; marqueurs de garde ; banc 375 px fr et ar, aucune erreur. Aucun SQL, rien d'autre touché. Build 20261003-590.
- Toujours en attente de sa décision sur la photo de couverture de la page Écurie (zoom du bandeau 340 px sur une photo panoramique : options a/b/c proposées, photo d'origine et capture demandées).

## (591) Page Écurie V2 — cartes « Derniers résultats » sur fond noir (maquette A choisie par Blandine)
- Sa remarque : « un peu trop de couleurs répétées » entre les cartes de résultats et les cartes d'événements, toutes vert-noir. Trois maquettes faites à partir de sa capture (A résultats noirs, B événements noirs, C les deux) ; elle choisit A « et on avise après ».
- Les cartes « Derniers résultats » (carrousel, deux cartes ou carte seule) passent du vert-noir `SURF` (#0E1A18) à un noir #080A0B, légèrement plus clair que le fond de page ; liseré champagne, ombre, textes, photos inchangés. Les cartes d'événements et le reste de la page gardent le vert.
- Une seule valeur changée (le `background` de `carteRes`). node --check 18/18 ; marqueurs de garde. Pas de rendu de banc possible pour ces cartes (elles exigent de vrais résultats en base) : à vérifier sur l'iPhone. Aucune image, aucun SQL. Build 20261003-591.
- En attente (sa décision « laisse tomber pour l'instant ») : photo de couverture de l'Écurie — diagnostic posé : (1) page zoomée ×2,7 par double-tap/pincement (viewport maximum-scale=3, pas de touch-action: manipulation global) ; (2) photo d'origine de 580 px seulement, trop petite pour un bandeau de 1 200 px. Remèdes proposés : touch-action: manipulation global (a), blocage du pincement (b), photo plus grande (c).

## (592) Page Écurie V2 — retour du vert sur « Derniers résultats », fond noir sur « Prochains événements » (maquette B, son changement d'avis)
- Elle préfère finalement garder la couleur sur les cartes de résultats et mettre le noir sur les événements : la 591 est défaite (le `background` de `carteRes` redevient `SURF`, le vert-noir d'avant), et ce sont les deux cartes « Prochains événements » qui passent au noir.
- Cartes événements : fond noir #080A0B (constante `NOIR_EV`, un cran au-dessus du fond de page #030706 pour que la carte reste lisible) avec un très léger dégradé, à la place du dégradé vert ; le fondu de l'affiche sur son bord intérieur se termine maintenant dans ce noir (avant : dans le vert, ce qui aurait fait une marche). Colonne date (voile noir à 28 %), liseré champagne, badge du type, lieu, chevron, hauteur 108 px : inchangés.
- Deux endroits touchés dans `carteEvH` + une ligne remise comme avant dans `carteRes`. node --check 18/18 ; marqueurs de garde ; banc 375 px avec deux événements factices (avec et sans affiche) : cartes noires, affiche fondue dans le noir, 108 px, aucune erreur. Les résultats ne se voient pas au banc (vrais résultats requis) : à vérifier sur l'iPhone qu'ils sont bien redevenus verts. Aucune image, aucun SQL. Build 20261003-592.

## (593 + hype-import-ffe.js ?v=20) Import FFE — le nom d'un cheval avec un suffixe « *… » est enfin lu (Olivia Optima)
- Son signalement (captures + Olivia_2017.pdf) : « L'enregistrement a échoué : ce telemat est celui de « PARTE N AIRES », mais la fiche ouverte est « Olivia Optima » ». Rien n'avait été écrit en base (le verrou d'identité passe avant toute écriture).
- Cause, PROUVÉE en rejouant son PDF avec le même assemblage de lignes que l'app (pdf.js) : le nom FFE complet est « OLIVIA OPTIMA*PONEYS PARTENAIRES » (l'étoile sépare le nom du propriétaire, Chevaux et Poneys Partenaires), coupé sur deux lignes par le site : « OLIVIA OPTIMA*PO N EYS » puis « PARTE N AIRES », juste au-dessus de « … né le 19/06/2010 ». Le lecteur prenait la ligne au-dessus de « né le » comme nom → « PARTE N AIRES » → le verrou refusait (à juste titre, sur un faux nom). Satine de Sienne porte le même suffixe.
- Version vérifiée (sa demande) : le fichier qu'elle a fourni est bien celui en ligne (?v=19, 1245 lignes, 74,6 Ko, contient l'étape 1 du 22/09 ; aucune livraison du module depuis).
- Correction, UNE seule zone touchée dans hype-import-ffe.js (lecture du nom dans lireFiches) : quand une étoile est en jeu sur la ligne au-dessus de « né le » ou sur celle du dessus, les deux lignes sont recollées et tout ce qui suit l'étoile est coupé → « OLIVIA OPTIMA ». Un nom sans étoile est lu comme avant. Le verrou d'identité d'index.html est inchangé.
- Vérifié hors appli (Node + pdf.js, même découpage de lignes) : son PDF → nom « OLIVIA OPTIMA », 14 résultats lus, origines intactes ; cas synthétiques → Vallieres « VALLIERES », bruit « CRUIBHI N » conservé, Satine avec l'étoile en haut ou en bas « SATINE DE SIENNE », étoile sur une seule ligne OK, aucun nom lisible → null (pas de verrou, comme avant).
- index.html : le module est chargé en `hype-import-ffe.js?v=20` (règle du fichier : toute livraison du module incrémente ce numéro, sinon l'iPhone garde l'ancien lecteur en cache). node --check 18/18 + module ; marqueurs de garde. Aucun SQL, aucune image. Build 20261003-593.
- 🟥 À POUSSER ENSEMBLE, à la racine : index.html ET hype-import-ffe.js (+ SUIVI.md). Test iPhone : rouvrir l'import depuis la fiche d'Olivia avec le même PDF → « Enregistrer 14 résultats » doit passer.
- Non traité (pas demandé) : l'avertissement jaune « quart incohérent : la FFE dit 3e, le calcul donne 2e » sur la ligne 12e/21 est purement informatif (le quart FFE est conservé, le module ne calcule jamais le quart).

## (594) Pages Résultats (cavalier + cheval) — classement des « moments forts » : option B de Blandine, « sans les dpt »
- Sa remarque : « les moments forts sont un peu sans explication, genre 1/12 alors qu'il y a des 1/60 ». Cause : dans le tri des victoires, le NIVEAU de l'épreuve (Elite > 1 > 2 > 3) passait avant le nombre de partants, et tout « Chp » (même un championnat ou circuit départemental) valait un titre.
- Nouveau tri, identique sur les deux copies (page Résultats du cavalier ≈ 35913 et onglet Performances du cheval ≈ 59659) : 1) classantes avant préparatoires (inchangé) ; 2) titres (inchangé : Open de France, championnat, Chp, finale, coupe de France, critérium, grand tournoi = 2 ; international / salon = 1) SAUF si l'épreuve ou le concours mentionne « Dpt », « Dépt » ou « départemental » → plus un titre ; 3) PARTANTS (avant : 4e critère) ; 4) niveau d'épreuve ; 5) place. Dédoublonnage et complément par les podiums inchangés.
- Rejoué sur les cartes de sa capture : Milly la Forêt 1/43 (Chp des Territoires), Milly CID 1/21, Le Mans championnat 1/20, Bordeaux int 1/47, puis un 1/60 sans titre passe devant Liverdy 1/51 (Chp Reg Circuit Dpt → plus un titre) et devant un 1/12 « Chp Dpt ». Les 4 chiffres du bandeau et les listes ne changent pas.
- node --check 18/18 ; marqueurs de garde. Aucune image, aucun SQL, module d'import inchangé (?v=20). Build 20261003-594.
- Validé par elle : 593 (import d'Olivia « ok 👌 »). Suite décidée, un build à la fois : (595) flèche de retour de l'écran d'import sous la barre d'état de l'iPhone (sa capture : « on ne peut plus en sortir ») ; (596) photos des encarts : cheval du résultat sur la page cavalier, cavalier du résultat sur la page cheval ; (597) réglage « niveau affiché » dans l'appli (podiums / top 8 / classements / tous, sans-faute toujours visibles) pour revenir sur un import trop large (Rizotto).

## (595) Écran d'import FFE — la flèche de retour sous la barre d'état de l'iPhone (« on ne peut plus en sortir »)
- Sa capture : l'heure de l'iPhone recouvrait « IMPORTER MES RÉSULTATS » et la flèche. Cause : l'en-tête de HypeImportEcran (≈ 56315) commençait à 16 px du haut sans réserver la barre d'état (l'appli est en viewport-fit=cover, barre translucide ; les autres pages ajoutent env(safe-area-inset-top), celle-ci non).
- Correction : l'en-tête descend sous la barre d'état (encoche + 12 px) et la flèche « ‹ » devient un vrai bouton de 44 × 44 px (avant : un caractère de 22 px). Même destination (onFermer → fiche du cheval). Le module hype-import-ffe.js n'est pas touché (toujours ?v=20).
- Banc 375 px : écran d'import ouvert, bouton mesuré 44 × 44, le tap revient sur la fiche du cheval, aucune erreur. Hors iPhone la barre d'état vaut 0 : rendu inchangé ailleurs. node --check 18/18 ; marqueurs de garde. Aucune image, aucun SQL. Build 20261003-595.

## (596) Pages Résultats (cavalier + cheval) — photos des encarts + réglage fin des moments forts (ses retours en direct)
- PHOTOS DES ENCARTS (sa demande, validée « ok ») : page CAVALIER → chaque encart montre le CHEVAL du résultat (photo de sa fiche, lue avec son nom : une colonne de plus dans la lecture existante, aucune requête nouvelle) ; page CHEVAL → chaque encart montre le CAVALIER du résultat quand il est relié à un compte Hype (colonne cavalier_id ; UNE lecture de profils ajoutée), sinon l'ancienne règle (album du concours, photo d'album au hasard, portrait sur le premier encart). Le même cheval ou le même cavalier peut revenir sur plusieurs encarts : voulu. Les médias choisis à la main (crayon) gardent la priorité.
- MOMENTS FORTS, ses trois retours après le 594 :
  · « on gardait les Reg, on a retiré seulement les Dpt, donc Liverdy devrait être encore là » → un « Chp Reg Circuit Dpt » reste un titre ; seul un départemental SANS mention régionale est retiré.
  · « le salon int de Bordeaux devrait être plus important » → échelle des titres à 4 niveaux : 3 = national (Open de France, championnat/Chpt de France, coupe de France, critérium, finale, grand tournoi) ; 2 = international / salon (dont Equita Lyon, qui n'écrit pas « salon ») ; 1 = autre championnat (régional, des Territoires, Chp Reg…) ; 0 = ordinaire ou départemental pur.
  · « on s'attend aussi à voir l'Open de France à Fontainebleau, et Equita Lyon avec Tully » → un grand rendez-vous (niveau 3 ou 2) entre dans les moments forts MÊME SANS VICTOIRE, dès qu'on y est classé (premier quart ou podium). Ordre : titre → victoire avant placement → partants → niveau d'épreuve → place. Les victoires ordinaires suivent ; les podiums complètent s'il manque des cartes.
  · Pastille : elle écrivait toujours « 1 » — elle affiche désormais le vrai rang (7, 5…). Dédoublonnage par rendez-vous ET par cheval/cavalier (deux Open de France la même année avec deux chevaux = deux cartes ; les deux jours de Bordeaux avec le même cheval = une seule). La clé des médias choisis ne change pas.
- Banc 375 px avec des lignes factices : page cavalier → Open de France 7/60 (Tully) en grand, puis Bordeaux 1/47, Equita Lyon 5/40, Liverdy 1/51, Milly CID 1/21, chaque encart avec la photo de son cheval ; page cheval → mêmes cartes avec le portrait de la cavalière reliée ; aucune erreur. node --check 18/18 ; marqueurs de garde. Aucune image, aucun SQL. Build 20261003-596.
- Rappel : un 1er sur 60 dans une épreuve sans titre passe APRÈS les rendez-vous titrés (son choix B) ; il remonte seulement s'il manque des cartes.

## (597) COMMUNAUTÉ V2 — BUILD 1 (brief de Blandine) + rectification des moments forts (« un passage ne suffit pas »)
- RECTIFICATION 596 (ses mots : « Liam et Tully avaient gagné Equita Lyon, un passage ne suffit pas, mais en l'occurrence ils gagnent ! », « l'Open à Fontainebleau il a gagné avec Rizotto aussi ») : le pool des moments forts redevient celui des VICTOIRES seules (podiums en complément s'il manque des cartes), comme avant le 596 ; un placement sans victoire n'y entre plus. Ce qui fait remonter ces deux victoires : l'échelle des titres du 596 (Equita Lyon = salon, Open/championnat de France = national) et le dédoublonnage par cheval (avant, deux Open de France la même année ne faisaient qu'une carte : la victoire de Rizotto pouvait être avalée par celle de Tully). Les deux pages (cavalier + cheval) identiques.
- COMMUNAUTÉ V2, BUILD 1 — construite À CÔTÉ de la V1, qui n'est pas touchée :
  · `var COMMUNAUTE_V2_ACTIVE = true;`, feuille `COM2_CSS` (préfixe .com2, propriétés logiques, règle [dir=rtl] pour le chevron) et `function EcranCommunauteV2()`, posés juste après EcranCommunaute (≈ 24989).
  · Routeur (≈ 26247) : la route « communaute » rend EcranCommunauteV2 si la bascule est à true (et la fonction existe), sinon EcranCommunaute. Un seul écran monté. `COMMUNAUTE_V2_ACTIVE = false` remonte la V1 (vérifié au banc).
  · Contenu : fond #060709 avec un décor léger (planète sombre à l'horizon, liseré champagne, fondue dans le noir — dessinée en CSS, aucun fichier image) ; titre « COMMUNAUTÉ » (Cormorant Garamond, ivoire, capitales espacées, aligné au début) ; sous-titre sur deux lignes « Plus qu'une communauté, / une passion qui nous unit. » (ivoire atténué) ; carte « Monde Hype » (pictogramme globe au trait, titre serif, sous-texte, chevron champagne, bordure champagne fine, fond pétrole → noir) → setEcran("monde") ; section « Stories » = le composant existant window.BandeauStories (forme « libre », celle des pages Cavalier et Écurie : les ronds), posé dans le fond sombre SANS les bandes grises de la V1, enveloppé d'un data-hscroll ; si le module n'est pas chargé, la section n'apparaît pas. Barre du bas globale inchangée (portail, verrou, cale).
  · Aucune requête lancée par la page (mesuré au banc : zéro appel Supabase après l'ouverture, contre 27–30 en V1) ; les stories chargent les leurs via le module.
  · window.__communauteCible est lu et effacé au montage (aucun bloc où descendre au Build 1) ; __storyOuverte, les liens « #s= » et « #c=stories », le verrou de la barre et de l'Accueil V2 : inchangés (le routage se fait avant la page).
  · 7 langues (fr, en, es, it, ja, de, ar) pour : Communauté, le sous-titre, Monde Hype, son sous-texte, Stories, Voir tout (réservé aux builds suivants, non affiché : aucune destination n'existe encore).
  · NON FAIT, volontairement (brief « rien d'autre ») : cloche et avatar en haut à droite de la maquette, « Voir tout › » des stories, À découvrir, Dans les écuries, Le fil, Activité, bouton +. Le visuel planète photographique de la maquette : à fournir si elle veut remplacer le décor CSS.
- Vérifications demandées par son brief : node --check 18/18 ; un seul marqueur de build ; route « communaute » = une seule page montée ; bascule false → V1 ; banc 375 px en fr et en ar (chevron inversé, textes au début de ligne, décor du côté opposé) ; Monde Hype → le globe s'ouvre ; « #s=story123 » → V2 montée avec window.__storyOuverte posé (identique en V1, vérifié) ; « #c=stories » → V2 ; barre du bas : 7 onglets ; aucune requête de l'ancienne page en arrière-plan. Aucune image, aucun SQL. Build 20261003-597.
- ⚠️ Cet index contient aussi le 596 (photos des encarts), livré mais pas encore validé par elle.
- Pour le Build 2 (stories affinées : espacement, « Ma story » en premier, « Voir tout ») il faudra hype-stories.js.

## (598) Pages Résultats (cavalier + cheval) — Eurexpo = Equita Lyon, points de qualif sous « Derniers résultats », victoires par défaut
- « Eurexpo, c'est Equita Lyon, enregistre-le tel quel pour les fois suivantes » : la FFE nomme le concours par son lieu, « EUREXPO » ; le mot est ajouté à la liste des salons (niveau 2 des titres), dans les deux copies. La victoire de Tully à Eurexpo (1/97) remonte dans les moments forts.
- « Mets les points de qualif en dessous des derniers résultats » : le bloc « Points de qualification » (inchangé) passe sous « Derniers résultats » ; il était entre les moments forts et « Par saison ». Deux copies (cavalier + cheval).
- « Ou à la limite un podium » puis « par défaut je dirais victoire » : le pool automatique des moments forts reste les VICTOIRES seules (podiums en complément s'il manque des cartes) ; l'essai « podium à un grand rendez-vous » n'est pas gardé.
- Sa demande suivante, À FAIRE (chantier à part, pas commencé) : « un bouton pour que le cavalier puisse choisir par lui-même de retirer un moment fort et d'en ajouter un autre ». Il faut un endroit en base pour mémoriser ces choix (voir proposition dans la conversation).
- Banc 375 px, lignes factices : ordre des sections Moments forts → Par saison → Derniers résultats → Points de qualification ; Eurexpo 1/97 (Tully) en tête, aucune erreur. node --check 18/18 ; marqueurs. Aucune image, aucun SQL. Build 20261003-598.

## (599) COMMUNAUTÉ V2 — le visuel planète de Blandine en décor de l'en-tête
- Elle a envoyé le visuel (planète vue de l'espace, lumières dorées, flare en haut). Fichier : `images/communaute_v2_planete_v1.webp` (1240 × 558, ~55 Ko, WebP) — pas de base64, nouveau nom de fichier.
- Posé en décor de l'en-tête de la V2 à la place de la planète dessinée en CSS du 597 : ancré à l'extrémité de fin de ligne (à droite en français, retourné et à gauche en arabe), 640 px de large, fondu dans le noir vers le bas (masque) et voile léger sur le côté du texte pour garder le titre et le sous-titre lisibles. Si le fichier manque, le décor disparaît et la page reste lisible.
- Banc 375 px fr et ar : planète derrière le titre, carte Monde Hype par-dessus, aucune requête, aucune erreur. node --check 18/18 ; marqueurs. Aucun SQL. Build 20261003-599.
- À POUSSER : index.html, SUIVI.md et le fichier images/communaute_v2_planete_v1.webp (nouveau).

## (600) Pages Résultats — choisir soi-même ses moments forts (« − » et « + ») ; Communauté V2 — titre lisible sur la planète
- CHOIX À LA MAIN (sa demande, approche validée « ok ») : sur chaque encart, un petit « − » retire ce moment fort ; sous les encarts, « + Ajouter un moment fort » ouvre une feuille avec tous ses résultats visibles pas encore en vitrine (du plus récent au plus ancien) ; toucher une ligne la met en vitrine. Un moment fort choisi à la main passe DEVANT le classement automatique ; un moment retiré ne revient plus tout seul (il reste proposé dans la feuille, marqué « retiré »). Qui peut : la propriétaire du cheval ou une modératrice (page cheval), la cavalière elle-même (sa page Résultats). Le choix vaut pour les deux pages (c'est la même ligne de résultat). Réponse immédiate au tap, Supabase confirme ; refus (colonnes absentes, pas le droit) affiché en clair et choix annulé.
- 🟥 SQL À PASSER PAR ELLE (une seule ligne, deux colonnes sur `resultats`, rien d'autre) — tant qu'il n'est pas passé, le « − » et le « + » répondent « la base n'est pas encore prête » :
  alter table resultats add column if not exists fort_force boolean not null default false, add column if not exists fort_exclu boolean not null default false;
  ⚠️ Droits : la modification passe par la règle d'écriture déjà en place sur `resultats` (en principe : la personne qui a écrit la ligne). Une cavalière dont les résultats ont été importés par la propriétaire du cheval verra « pas autorisé sur cette ligne » — à régler en base si elle veut l'ouvrir (pas fait ici).
- Mécanique : colonnes lues avec le select("*") existant (ff/fx dans tousF) ; `etatFort`, `poserFort`, `fortsLocal`, `choixFortOuvert` dans les deux copies ; les forcés d'abord, les exclus écartés des victoires et des podiums de complément, puis le dédoublonnage et le plafond de 5 comme avant. Textes en 7 langues (Retirer ce moment fort, Ajouter un moment fort, Fermer, retiré, messages de refus).
- COMMUNAUTÉ V2 (sa capture : « on lit mal le titre communauté ») : planète remontée (−44 px) et décalée vers la fin de ligne (−160 px), voile côté texte plus fort (80 % → 0 sur 76 % de la largeur), ombre portée sous le titre et le sous-titre.
- Banc 375 px (page cavalier, lignes factices avec les deux colonnes) : un résultat forcé passe en tête, un exclu disparaît, « − » écrit fort_force=false / fort_exclu=true selon le cas, « + » ouvre la feuille (4 candidats), le choix écrit fort_force=true + fort_exclu=false, la feuille se ferme, la carte apparaît en premier ; aucune erreur. node --check 18/18 ; marqueurs. Aucune image. Build 20261003-600.
- Signalé par elle, PAS un bug du code : la photo du Cercle Crystal (Accueil V2) n'apparaît toujours pas après trois pushs. Le bloc la lit en fond CSS à `images/accueil_v2_premium_crystal_v1.webp` ; les autres visuels de l'accueil s'affichent, donc le mécanisme marche : à vérifier que le fichier est bien servi à cette adresse exacte (test dans Safari : https://<son site>/images/accueil_v2_premium_crystal_v1.webp).

## (601) Fiche cheval — « Régler ce qui est enregistré comme visible » (la machine arrière de Rizotto) ; encarts : une coupe à la place du « 1 » bleu
- ✅ SQL DU 600 PASSÉ PAR ELLE (capture 20 h 25, « Success. No rows returned ») : colonnes resultats.fort_force et resultats.fort_exclu créées. Le « − » / « + » des moments forts est donc opérationnel dès que le 600 est en ligne.
- NIVEAU VISIBLE (sa demande : revenir aux premiers quarts sur Rizotto, « dans l'appli ») : sur la fiche du cheval, onglet Performances, sous le menu d'affichage (propriétaire ou modératrice), un bouton « Régler ce qui est enregistré comme visible › » ouvre une feuille à 4 niveaux — Ses podiums (1er, 2e, 3e) · Son top 8 · Ses classements (le premier quart) · Tous ses résultats (éliminés et abandons compris) — chacun avec son compte « N visibles · M masqués » calculé sur place. Toucher un niveau → confirmation → la colonne `visible` est réécrite sur TOUTES les lignes importées de ce cheval (origine = import), par paquets de 150 ; les sans-faute restent visibles à tout niveau (sa règle du 06/09) ; les lignes saisies à la main ne sont pas touchées ; rien n'est supprimé, « voir les masqués » les montre toujours ; la page se met à jour sans rechargement et un message dit le résultat (« Mis à jour : 28 visibles, 61 masqués » ou « appliqué en partie : X / Y lignes » si la base en refuse — droits sur des lignes écrites par quelqu'un d'autre). Effet partout : fiche cheval, page Résultats du cavalier, fil (tous respectent `visible`). 7 langues.
- COUPE (sa demande : « plutôt qu'un 1 bleu fluo, un petit dessin de coupe sur les victoires ») : sur les deux pages Résultats, la pastille des encarts montre une coupe au trait (le tracé déjà utilisé sur la page Écurie) pour une victoire, et le rang en champagne pour un podium de complément ; plus de turquoise sur les encarts (champagne sur fond sombre ; la grande carte garde sa pastille or).
- Banc 375 px, fiche cheval factice (12 lignes importées, propriétaire connectée) : bouton présent, feuille avec les 4 comptes (ex. classements 9 visibles / 3 masqués, le sans-faute hors premier quart reste visible), confirmation → deux écritures (visible = true puis false), feuille fermée, « masqués » affiché, message de résultat ; coupes rendues sur les 4 encarts ; aucune erreur. node --check 18/18 ; marqueurs. Aucune image, aucun SQL nouveau. Build 20261003-601.

## (602) COMMUNAUTÉ V2 — BUILD 3 : « À découvrir » (deux cartes d'entrée), sans requête à l'ouverture
- Section « À découvrir » sous les stories : deux cartes côte à côte (152 px), image en fond, titre serif, sous-texte, chevron champagne (inversé en arabe), AUCUNE icône : « Nouveaux profils — Des cavaliers qui viennent de nous rejoindre » et « Cavalières à suivre — Des profils qui pourraient t'inspirer ». 7 langues.
- Visuels PROVISOIRES : ceux de l'Accueil V2 (accueil_v2_profil_v2 et accueil_v2_communaute_v2), aucun fichier nouveau — à remplacer par les siens quand elle les envoie.
- Toucher une carte la déplie SOUS les deux cartes (rendu provisoire, ses rails de la V1 réutilisés tels quels : NouveauxCavaliers pour les nouveaux inscrits, HypeADecouvrir pour les suggestions, qui ne chargent leurs données QU'À ce moment-là : zéro requête à l'ouverture de la page, mesuré). Toucher de nouveau referme. Pas de page plein écran, pas de « Voir tout » (toujours sans destination).
- « + Ajouter » de Mes amis (window.__communauteCible = "decouvrir") : descend jusqu'à la section et ouvre d'office « Cavalières à suivre » ; le signal est effacé. Ouvrir un profil depuis les rails → page Cavalier en mode public (mêmes globales que la V1).
- Banc 375 px fr/ar : deux cartes, tap → dépliage + requêtes seulement à ce moment, cible « decouvrir » → carte ouverte et section amenée en haut, Monde Hype et bascule V1 toujours OK, aucune erreur. node --check 18/18 ; marqueurs. Aucun SQL. Build 20261003-602.
- Build 2 (stories affinées) toujours en attente de hype-stories.js. Prochain : Build 4 « Dans les écuries ».

## (603) Pages Résultats — la coupe, c'est l'emoji 🏆 (« c'est quoi cette coupe 🙄😂, mets celle-là tout simplement »)
- La pastille des encarts montre l'emoji 🏆 pour une victoire (18 px sur la grande carte, 13 px sur les petites), le rang en champagne pour un podium de complément. Le dessin au trait du 601 est retiré. Deux copies (cavalier + cheval). node --check 18/18 ; banc : 🏆 sur les 5 encarts. Build 20261003-603.

## (604) COMMUNAUTÉ V2 — BUILD 4 : « Dans les écuries » (vraies données du Journal des clubs, 2 cartes empilées)
- Lecture AUTONOME `hypeLireEcuriesActives()` (copie de la lecture du Journal des clubs de la V1, qui n'est pas touché) : les dernières publications AVEC photo des fils d'écurie et de club (cibles ecurie:/club:), jamais les privées, 80 lues, regroupées PAR ÉCURIE (nombre de publications, nombre de photos — vidéos exclues —, dernière photo, vrai nom relu dans les profils des autrices). Deux requêtes au montage de la page (commentaires + profiles) : ce sont les seules de la V2 à l'ouverture.
- Rendu : titre « Dans les écuries » + « Voir tout › » (si plus de 2 écuries : déplie les autres SUR PLACE, puis « Réduire ») ; cartes horizontales empilées de 90 px, image panoramique en fond, voile sombre côté nom, nom de l'écurie (serif) + « N publications · M photos », chevron champagne (inversé en arabe). Pas de grosse icône. Rien si aucune publication.
- Tap = la navigation du Journal : cible ecurie: → window.__filEcurieCible / __filEcurieNom + page « actualites-ecurie » ; cible club: → window.__guildeEcurie + page « guilde ». 7 langues (titre, Voir tout, Réduire, publication(s), photo(s)).
- Même limite que la V1 pour le vrai nom : une écurie dont le nom porte une apostrophe (« Société d'Équitation de Paris ») garde la clé capitalisée (« Societe D Equitation De Paris ») — à améliorer plus tard si elle le souhaite (même code que le Journal).
- Banc 375 px fr/ar avec 5 publications factices (dont une privée et une vidéo) : 2 cartes (Écurie Feinn 2 publications · 4 photos ; SEP 1 · 1), « Voir tout » → 3 cartes (Haras des Lys, la privée ignorée, la vidéo non comptée), tap → page du fil de l'écurie avec les bonnes globales, 2 requêtes seulement, aucune erreur. node --check 18/18 ; marqueurs. Aucune image, aucun SQL. Build 20261003-604.
- Prochain : Build 5 « Le fil » (4 onglets visuels), puis Build 6 (brancher Tous / Amis / Écuries). Build 2 (stories) toujours en attente de hype-stories.js.

## (605) COMMUNAUTÉ V2 — BUILD 5 : « Le fil », 4 onglets visuels (Tous / Amis / Écuries / Activité)
- Section « Le fil » sous « Dans les écuries » : titre + 4 pastilles sur une ligne (80 px chacune à 375 px, mesuré, aucun débordement en fr ni en ar), actif champagne plein texte sombre, inactifs pétrole bord champagne léger ; l'onglet touché devient actif (état local, « Tous » au départ). Sous les onglets, pour ce build, une seule ligne en serif atténué : « Les publications arrivent ici au prochain build. » 7 langues (Le fil, Tous, Amis, Écuries, Activité, la phrase).
- Aucune requête ajoutée ; le « + » flottant reste masqué (aucune publication générale propre n'existe). Rien d'autre touché.
- Banc 375 px fr/ar : 4 onglets de 80 px, tap → actif, ordre inversé en arabe, aucune erreur. node --check 18/18 ; marqueurs. Aucune image, aucun SQL. Build 20261003-605.
- Prochain : Build 6 = brancher Tous / Amis / Écuries sur les moteurs existants (fil / filAmis / filEcurie) avec le nouveau dessin de carte ; Build 7 = Activité (analyse faite le 03/10 : 7 types reconstruisables sans table nouvelle). Build 2 (stories) : toujours en attente de hype-stories.js.

## (606) COMMUNAUTÉ V2 — BUILD 2 : les stories intégrées à la page (hype-stories.js lu, NON modifié)
- Fichier hype-stories.js fourni par elle (7 480 lignes, ?v=20bx en ligne) et LU : BandeauStories prend `forme` (rond / carte / libre / libre-carte), `taille` (104 px par défaut, son choix du 30/08), `carteL` / `carteH`, `padding` ; son rail est peint #030405, espace 10 px, marges 14 px, et le « + » d'ajout est TOUJOURS EN DERNIER (sa règle du 14/08). Le lien « #s= » est lu par le module lui-même (effet sur window.__storyOuverte dès que les stories sont chargées, effacé après usage) : inchangé.
- Intégration faite UNIQUEMENT côté V2, par surcharge de style dans .com2 (aucune ligne du module touchée, pas de nouveau ?v=) : fond du rail transparent, 16 px entre les ronds, marges 16 px, haut de 18 px conservé (le halo du fondu « libre » déborde du rond et serait rogné), le « + » passe EN PREMIER sur cette page seulement (ordre flex, les pages Cavalier et Écurie gardent le « + » en dernier), habillé champagne (cercle pointillé, « + », libellé). Forme « libre » (ronds fondus), taille 104 inchangée.
- NON FAIT, à sa décision : le libellé du « + » reste « Ajouter » (elle avait fait retirer « Ma story » le 14/08 parce que le mot était écrit deux fois ; la maquette l'écrit sous le « + ») ; « Voir tout › » des stories (aucune destination dans le module) ; taille des ronds (la maquette les montre plus petits, ~70 px : possible par la propriété `taille`, sans toucher au module). Limite du module : ses libellés n'ont pas d'arabe (« Ajouter » reste en français en arabe).
- Banc 375 px fr/ar avec le vrai module chargé (aucune story en base de test, donc seul le « + ») : rail transparent, espace 16 px, « + » en premier et champagne, aucune erreur ; requêtes à l'ouverture : commentaires + profiles (Dans les écuries) + hype_stories (le module). node --check 18/18 ; marqueurs. Aucune image, aucun SQL. Build 20261003-606.
- Prochain : Build 6 = brancher Tous / Amis / Écuries sur les moteurs existants avec le nouveau dessin de carte.

## (607 + hype-stories.js ?v=20by) Stories — l'ARABE ajouté au module (« mets-les en arabe aussi »)
- Le module hype-stories.js n'avait que 6 langues (fr, en, es, it, ja, de) : en arabe, tous ses textes retombaient sur le français. Les 104 entrées de sa table HS_TXT (bandeau, composeur, décors, cadrage, musique, durée, à la une, visionneuse, dates relatives « منذ … د / س / ي »…) reçoivent une valeur `ar`, plus le bouton « Partager » de la visionneuse (écrit hors table) → « مشاركة ». Aucune autre ligne du module touchée ; les 6 autres langues inchangées.
- 🟥 RÈGLE DU MODULE respectée : index.html le charge désormais en `hype-stories.js?v=20by` (avant 20bx) — sans ce changement l'iPhone garderait l'ancien fichier en cache. 🟥 À POUSSER ENSEMBLE, à la racine : index.html ET hype-stories.js (+ SUIVI.md).
- Vérifié : node --check sur le module ; les 104 clés ont bien un `ar` (relecture programmée de la table) ; banc avec le module chargé, page arabe : le « + » affiche « إضافة ». node --check 18/18 sur l'index ; marqueurs. Aucune image, aucun SQL. Build 20261003-607.

## (608) COMMUNAUTÉ V2 — BUILD 6 : « Le fil » branché (Tous / Amis / Écuries), nouveau dessin de carte
- Les trois onglets lisent les MOTEURS EXISTANTS, non touchés : « Tous » = fil() (résultats saisis + cartes de palmarès importé), « Amis » = filAmis() (follows réciproques : résultats + hauts faits), « Écuries » = filEcurie() (cavalières de ses écuries : résultats + cartes + hauts faits). « Activité » = Build 7 (texte d'attente). Le fil se charge à l'ouverture de l'onglet, 5 cartes puis « Voir la suite (N) » / « Replier ».
- Carte (.com2-post) : avatar rond liseré champagne (tap = profil public, comme la V1), nom, « il y a 2 h · Concours / Palmarès / Haut fait », texte (concours ; « X a rendu son palmarès à Y » ; « Haut fait débloqué · … »), ligne de détail (classement ; « 4 résultats · 3 classements · 1 victoires »), photo (vignette 760×560, repli d'origine si la vignette échoue), liste des chevaux d'une carte multi-chevaux (tap = palmarès du cheval), pied : ♡ nombre, bulle des réponses, « Voir ses résultats › » (carte d'import), « Voir la vidéo › » (lien). Menu « … » → « Supprimer » (confirmation) : seulement sur un résultat saisi, pour son auteur ou une modératrice (supprimerResultat / supprimerPostModeration, refus affiché).
- ♡ répond SUR PLACE (le cœur et le nombre changent tout de suite, plus de rechargement complet du fil comme en V1) ; un refus de la base est dit et annulé. Tables inchangées : likes (résultats), likes_cartes (cartes d'import).
- Réponses : la bulle monte le bloc EXISTANT (SectionCommentaires, non modifié) et l'ouvre aussitôt ; ses cibles sont EXACTEMENT celles de la V1 (resultat:<id>, resultat:hf_<id>, import:<personne>:<lundi>) → les réponses déjà écrites restent au bon endroit. Son bouton garde son dessin actuel (turquoise, « Envoyer ») — à habiller plus tard si elle le souhaite. 0 requête par post tant que personne ne touche la bulle.
- ⚠️ BUG CONNU, NON CORRIGÉ (dans le moteur, pas dans la page) : « Amis » ne charge pas les j'aime (filAmis met toujours 0) — à corriger plus tard dans filAmis. Le « + » flottant reste masqué. Requêtes à l'ouverture de la page (onglet Tous) : 8 (commentaires, hype_stories, resultats ×2, chevaux, profiles, likes, likes_cartes) contre 27–30 en V1.
- 7 langues (erreur / vide / chargement / Voir la suite / Replier / Supprimer + question / libellés des cartes / temps relatif « il y a N min · h · j »). RTL : chevrons et menu inversés via les propriétés logiques.
- Banc 375 px fr/ar sur un faux Supabase filtrant (7 résultats dont 1 masqué, 1 lot d'import 2 chevaux, 1 haut fait, j'aime, 1 réponse) : 5 cartes + « Voir la suite (2) » → 7 ; ♡ sur place (2 → 1, delete likes) ; menu « … » absent sur les cartes d'import ; réponses ouvertes au premier tap avec la bonne cible ; Amis (3) et Écuries (4) via leurs moteurs ; Activité = attente ; Supprimer → confirmation → 1 ligne, carte retirée ; tap carte d'import → fiche du cheval ; aucune erreur. node --check 18/18 ; marqueurs ; un seul meta. Aucune image, aucun SQL, aucun module touché. Build 20261003-608.
- Prochain : Build 7 « Activité ». À tester chez elle : les vrais posts (photos Supabase), un j'aime, une réponse, un « Supprimer » sur un post à elle.

## (609) COMMUNAUTÉ V2 — BUILD 7 : l'onglet « Activité » branché (ce qui se passe dans la communauté)
- Sa règle du 03/10 respectée : lignes compactes SANS j'aime ni réponses, AUCUNE table nouvelle, seulement ce qui se reconstitue de façon sûre depuis l'existant. Six sources, lues en parallèle et chacune pour elle-même (une source illisible est passée, les autres s'affichent ; message d'erreur seulement si tout échoue) : profils récents (profiles.created_at, sans pseudo = ignoré), chevaux ajoutés (chevaux.created_at, supprimés exclus), publications des fils d'écurie / de club (commentaires, cibles ecurie: / club:, privées et fils perso exclus), résultats saisis (mêmes règles que le fil), palmarès importés (les cartes-semaine de cartesDImport, non touché), hauts faits (hauts_faits). Puis une lecture de profiles pour les noms et avatars manquants. 40 lignes max, 12 affichées puis « Voir la suite (N) » / « Replier ».
- Lignes : avatar 34 px, phrase avec le nom en gras (« Camille a rejoint Hype », « … a ajouté un cheval : Rizotto », « … a publié dans Écurie Feinn », « … a publié un résultat », « … a rendu son palmarès à … », « … a débloqué un haut fait »), détail dessous (écurie · ville ; texte de la publication ; concours · classement ; chiffres du palmarès ; libellé du haut fait), heure courte à la fin (« 2 h », « 3 j »), vignette 44 px si une photo existe. Tap : profil public (profil, résultat, haut fait), fiche du cheval (cheval, palmarès), fil de l'écurie ou page du club (publication) — mêmes chemins que les autres blocs.
- Chargée SEULEMENT quand l'onglet s'ouvre : 7 requêtes à ce moment-là (profiles, chevaux, commentaires, resultats ×2, hauts_faits, chevaux — + 1 profiles si des auteurs manquent) ; rien à l'ouverture de la page. Une réponse arrivée après un changement d'onglet est ignorée (plus de mélange entre onglets, valable aussi pour Tous / Amis / Écuries).
- Non repris (dates non vérifiées en base, à décider) : nouveaux suivis (follows), rendez-vous du club (club_agenda), cavalières acceptées dans une écurie (ecurie_cavaliers_choisis), souvenirs. Limite connue, comme au Build 4 : un club dont le nom porte une apostrophe garde la clé capitalisée si aucune autrice ne l'a dans son profil. Les libellés de quêtes (hauts faits) restent en 6 langues (le français en arabe), comme partout.
- 7 langues (6 phrases, vide, erreur, heures courtes). RTL : lignes et vignette via les propriétés logiques, vérifié en arabe.
- Banc 375 px fr/ar sur un faux Supabase (4 profils dont un sans pseudo, 3 chevaux dont un supprimé, 5 publications dont une privée et un fil perso, résultats, lot d'import, hauts faits) : 17 lignes → 12 + « Voir la suite (5) », ordre par date, exclusions respectées, taps vers fil d'écurie / fiche cheval / profil public OK, bascule rapide Activité → Tous sans mélange, aucune erreur. node --check 18/18 ; marqueurs ; un seul meta ; aucune image, aucun SQL, aucun module touché. Build 20261003-609.
- Les 7 builds de la Communauté V2 sont livrés. Reste à sa décision : visuels des deux cartes « À découvrir », habillage du bloc des réponses (turquoise), libellé du « + » des stories, bug des j'aime de « Amis » (moteur), cloche / avatar en haut à droite, « Voir tout » des stories.

## (610 + hype-stories.js ?v=20bz) COMMUNAUTÉ V2 — le bloc Stories refait : compact, ronds nets et réguliers, « Ajouter » du même diamètre
- Sa demande (03/10) : « plus propre, plus compact, moins de vide, ronds mieux alignés, Ajouter du même diamètre, rien d'autre sur la page ». Diagnostic : le vide et les ronds inégaux venaient de la forme « libre » du module (photo fondue par un masque flou — le cercle visible dépend de chaque photo — + halo débordant qui obligeait à 18 px de retrait en haut) face à un « + » en cercle plein de 104 px.
- CE QUI CHANGE, uniquement dans la section Stories de la V2 : le module passe en forme « rond » (cercle net de 76 px, anneau fin, 2,5 px de noir entre l'anneau et la photo), le « + » a EXACTEMENT le même cercle de 76 px (cercle pointillé, en premier sur le rail comme au Build 2), nom à 5 px sous le rond ; rail sans fond, 8 px entre les cellules, 6 px au-dessus, 2 px en dessous ; 4 px entre le titre « Stories » et le rail (8 avant) ; 24 px entre le rail et « À découvrir » (34 avant). Bloc mesuré à 101 px de haut (environ 150 avant). Anneau champagne = story non vue, anneau gris = tout vu (le signal « non lue » est conservé, c'est l'anneau qui le porte dans cette forme).
- 🟥 MODULE TOUCHÉ, 1 ligne utile : BandeauStories accepte une propriété `accent` (couleur d'accent imposée par la page : anneau, point, « + », libellé « Ajouter », trait entre deux médaillons). Sans elle, rien ne change pour les pages Cavalier / Écurie / Club (teinte du cavalier ou de l'écurie comme avant). Nécessaire : la couleur de l'anneau est écrite dans le module (turquoise / teinte du cavalier), et elle ne voulait pas de turquoise sur cette page. HYPE_STORIES_VERSION = "20bz", index.html charge `hype-stories.js?v=20bz` (avant 20by). 🟥 À POUSSER ENSEMBLE : index.html + hype-stories.js (racine).
- Rien d'autre touché : hero, Monde Hype, À découvrir, Dans les écuries, Le fil, barre du bas, route, verrou intacts ; aucune image, aucun SQL.
- Banc 375 px fr/ar avec 6 stories factices (une à deux photos, une déjà vue, une sans photo) : tous les cercles à 76 px, « + » à 76 px et premier, 10 px titre → ronds, 24 px ronds → section suivante, rail défilant (676 px pour 375), toucher une story ouvre la visionneuse, lien profond #s= toujours ouvert sur la V2, RTL correct ; aucune erreur. node --check 18/18 + module ; marqueurs ; un seul meta. Build 20261003-610.
- Variante possible si elle préfère l'ancien fondu : revenir à forme « libre » tout en gardant le reste du resserrage — mais le « + » ne pourra jamais paraître « du même diamètre » qu'une photo fondue.

## (611) COMMUNAUTÉ V2 — le bloc des réponses habillé aux couleurs de la page (CSS seulement)
- Dans le fil V2, le bloc des réponses est le composant existant SectionCommentaires (styles en ligne, turquoise) : il jurait sous les cartes champagne. Habillé par surcharge dans .com2 .com2-post-com, SANS toucher au composant (les autres pages gardent leur turquoise) : « N Commenter » ivoire avec bulle champagne, liseré de séparation champagne, texte des réponses ivoire, photos/vidéos à liseré champagne, « + » champagne, champ de saisie sombre à liseré champagne (texte ivoire, taille 16 conservée = pas de zoom iPhone), « Envoyer » champagne plein texte sombre (atténué pendant l'envoi), « Connecte-toi pour commenter » champagne clair.
- Sélecteurs par structure du composant (1er bouton = ouverture ; 1er et dernier bouton de la ligne de saisie = « + » et « Envoyer ») : si le composant change de forme un jour, le pire cas est un retour au turquoise, rien ne casse.
- Rien d'autre touché (module stories 20bz inchangé, pas d'image, pas de SQL). Banc 375 px fr/ar : couleurs calculées vérifiées (Envoyer rgb(201,166,107) / texte sombre, champ #0A1113, bulle champagne), réponses toujours ouvertes au premier tap, aucune erreur. node --check 18/18 ; marqueurs ; un seul meta. Build 20261003-611.
- Reste à sa décision : visuels « À découvrir », mot sous le « + » des stories, bug des j'aime de « Amis » (moteur filAmis), cloche / avatar en haut à droite, « Voir tout » des stories.

## (612) COMMUNAUTÉ V2 — micro-build : couleur de l'onglet actif du fil, rien d'autre
- Sa demande : « l'onglet actif est trop jaune / trop lumineux ». Classe modifiée : `.com2 .com2-onglet.actif` (+ `position:relative` sur `.com2-onglet`, sans effet sur les dimensions, pour poser le trait). AVANT : fond #C9A66B plein, liseré #C9A66B, texte #1A1408. APRÈS : fond #121A1C, liseré rgba(201,166,107,0.55), texte #D8BC86, petit trait champagne #C9A66B de 2 px (48 % de la largeur, 5 px du bas, opacité 0,9) sous le texte. Onglets inactifs inchangés (fond #0D1518, liseré 0.28, texte ivoire 0.78). Taille, largeur, hauteur, rayon, position, ordre, typo et logique inchangés (mesuré : 4 × 80 × 36 px, mêmes positions qu'au 605).
- Reçu en même temps un brief plus large (onglets en « segmented control », air latéral des stories, rythme vertical) : NON traité, en attente de son go après ce test — la partie Stories de ce brief est déjà couverte par le 610.
- node --check 18/18 ; marqueurs ; un seul meta ; aucune image, aucun SQL, module inchangé. Build 20261003-612.

## (613) Activité — correctif : « Cavalière » partout (sa capture du 609, 21 h 21)
- Cause : les deux lectures de `profiles` de hypeLireActivite demandaient une colonne `club` qui N'EXISTE PAS ; Supabase rejette alors toute la requête (même piège que `galop` au 189). Aucun profil n'arrivait → nom de repli « Cavalière » et initiale « C » sur chaque ligne, alors que les activités elles-mêmes (palmarès, chevaux, hauts faits) étaient bonnes.
- Correction : `club` retiré des deux listes de colonnes (id, pseudo, avatar_url, handle, ecurie, ecurie2, ville [+ created_at]). Rien d'autre touché. Banc : noms et avatars de nouveau résolus. node --check 18/18 ; marqueurs ; un seul meta. Build 20261003-613.
- ⚠️ Sa capture montre encore l'onglet actif jaune et les stories d'avant : elle était sur le 609. Ce 613 contient les 610 (stories, module 20bz), 611 et 612 : pousser hype-stories.js (livré au 610) en même temps si ce n'est pas déjà fait.

## (614) COMMUNAUTÉ V2 — le fil : maquette 1 (« Ok la 1 ») — carte = contenu, ligne = événement
- Sa remarque (capture 21 h 23) : « y a pas deux onglets pareils » — Activité en lignes, les autres en cartes, et un haut fait occupait une carte entière avec un pied vide. Trois maquettes envoyées (1 cartes + lignes, 2 tout cartes, 3 tout lignes) ; elle a choisi la 1.
- Dans Tous / Amis / Écuries : un résultat ou un palmarès rendu garde sa carte ; un haut fait devient une ligne compacte, exactement celle d'Activité (avatar 34 px, « Nom a débloqué un haut fait », libellé, heure courte), les lignes qui se suivent sont regroupées dans un bloc. Tap = profil public. Conséquence dite : plus de bulle de réponses sur un haut fait dans ce fil (la V1 la garde). Rien ne change dans les moteurs.
- Code : `estLigneFil` / `ligneDepuisPost` / `grouperFil` dans EcranCommunauteV2, `.com2-fil-lignes` dans COM2_CSS. Banc 375 px fr/ar : Amis = carte · ligne · carte ; Écuries = 2 lignes groupées puis cartes ; tap ligne → profil public ; aucune erreur. node --check 18/18 ; marqueurs ; un seul meta. Build 20261003-614.
- Prochain, à son « Ok » : correctif du moteur filAmis (il lit 40 lignes AVANT d'écarter les lignes d'import — un import de 250 résultats masque tout —, ne construit pas les cartes de palmarès, ne charge pas les j'aime) → même lecture que l'onglet Écuries (fil({ idsFiltre }) + hauts faits). La V1 en profitera aussi (même fonction).

## (615) Le fil « Amis » — correctif du moteur filAmis (« il met les dernières actions de mes amis à il y a 27 jours »)
- Cause, trois défauts de l'ancienne lecture : (1) elle prenait les 40 dernières lignes de `resultats` AVANT d'écarter les lignes d'import — une amie qui importe 250 résultats remplit les 40 lignes, toutes écartées, il ne reste que ses vieux résultats saisis ; (2) elle ne construisait jamais les cartes « X a rendu son palmarès à Y », pourtant l'action récente ; (3) elle ne chargeait pas les j'aime (bug noté au 608).
- Correction : filAmis reprend EXACTEMENT la lecture de l'onglet Écuries — fil({ idsFiltre: amis }) (résultats hors import filtrés en base, cartes de palmarès, profils, j'aime des résultats et des cartes) + les hauts faits des amis, le tout trié par date, 60 au plus. Les amis restent les follows réciproques (mesAmis), inchangé. Même forme de réponse : la V1 (page Communauté actuelle) et la V2 l'utilisent sans rien changer de leur côté → l'onglet Amis de la V1 est corrigé aussi.
- Banc : amie avec 60 lignes importées il y a 1 h + résultats saisis anciens + haut fait → la carte de palmarès récente apparaît en tête, les j'aime sont chargés (♡ 2), ligne de haut fait, vieux résultats ensuite ; 10 requêtes (follows ×2, profiles, resultats ×2, chevaux, profiles, likes, likes_cartes, hauts_faits) contre 4 avant. node --check 18/18 ; marqueurs ; un seul meta ; rien d'autre touché. Build 20261003-615.
