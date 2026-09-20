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
