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

INDEX EN LIGNE CHEZ ELLE : 20260908-217 (md5 d7bff6e6). CONFIRMÉ.
218 (onglets « Pour qui ? ») : EN LIGNE, vu sur sa capture de 21 h 35
(les onglets et le « + » s'affichent).
219 : EN LIGNE (vu sur son enregistrement de 21 h 54, « Moi » encore là).
INDEX LIVRÉS ENSUITE : 220 (§11 H), 221 (§11 I), 222 (§11 K). Chacun contient
les précédents. NON CONFIRMÉS EN LIGNE, NON TESTÉS.
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
