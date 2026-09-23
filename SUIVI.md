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
128. 23/09 (386) — HEY BABY : TOUTE PHOTO ÉCHOUE ; LE DIAGNOSTIC À L'ÉCRAN
────────────────────────────────────────────────────────────

SYMPTÔME (ses captures de 14 h 34-14 h 38) : Hey Baby répond « Petit souci de
connexion » à toute photo, et aussi à un simple texte envoyé APRÈS une photo
dans la même conversation (« Alors »). Un texte seul dans une conversation
neuve passe (« Bonjour » → réponse normale, sur 2hype.netlify.app).

CE QUI EST ÉTABLI (lu dans les fichiers, pas supposé) :
· L'app renvoie à chaque message les 10 derniers échanges, IMAGES COMPRISES :
  un texte après une photo repart donc avec la photo — même échec.
· Le relais EN LIGNE (GitHub main, netlify/functions/assistant.js) est la
  VERSION 3 : 179 lignes, 7,6 Ko, CORS « * ». Avec une image il prend
  OPENAI_VISION_MODEL (repli gpt-4o) ; en cas de refus OpenAI il répond
  502 { error: "OpenAI <statut>" } — le détail d'OpenAI ne va QUE dans le
  journal Netlify.
· Le mode « perception » (photo en deux étapes) de l'index est bien compris
  par la v3 : elle l'ignore et répond au format lisible. PAS une
  incompatibilité.
· Le NOUVEAU DOMAINE 2hype.fr N'EST PAS EN CAUSE : relais en CORS « * ».
  (L'index appelle toujours https://2hype.netlify.app/.netlify/functions/
  assistant, en dur, 5 endroits — fonctionne depuis 2hype.fr grâce au « * ».)
· Pistes abandonnées en séance, contredites par les fichiers : domaine,
  incompatibilité v3/perception.
· CAUSE DE L'ÉCHEC PHOTO : NON ÉTABLIE. Restent : modèle vision refusé par
  OpenAI, photo refusée, ou délai dépassé (Netlify coupe avant la réponse).

⚠️ UNE VERSION 5 DU RELAIS EXISTE HORS DU DÉPÔT (309 lignes, 14,9 Ko, datée
22/07, « passage contrôlé à GPT-5.6 Sol », erreurs structurées avec code et
reqId — c'est pour ELLE que l'index a été écrit). Elle n'est PAS en ligne et
on ne sait pas si elle a été retirée exprès. NE PAS la pousser à l'aveugle :
elle REFUSE toute photo si OPENAI_VISION_MODEL n'est pas renseignée dans
Netlify, et envoie un réglage de précision d'image (OPENAI_VISION_DETAIL,
défaut « original ») qu'OpenAI peut refuser. Décision reportée par Blandine
après lecture du diagnostic.

✅ CE BUILD (index seul) — décision de Blandine « fais parler l'appli » :
diagHB(etape, detail) dans EcranAssistantIA / envoyer. Sous « Petit souci de
connexion », une ligne « ⚙️ Diagnostic (visible par toi seule) » : étape,
code HTTP, réponse du relais (error / code / message), durée. Quatre appels :
échec de l'étape observation photo, erreur structurée, flux vide, erreur
générale (réseau, HTTP, délai de 65 s ou bouton stop). L'erreur HTTP garde
désormais le champ « error » de la v3 (err.hbErreur).
RÉSERVÉ à estCompteFeinnHype (feinn@live.fr), session lue en LOCAL
(getSession). Les cavalières ne voient AUCUN changement.
POUR LE RETIRER : faire de diagHB une fonction vide.
Build 20260923-386. node --check OK (18 blocs) ; marqueurs contrôlés avant/
après (HYPE ▸, function, createElement, ?v=, hype-images- inchangés).

À FAIRE ENSUITE : elle envoie une photo à Hey Baby et montre la ligne ⚙️ ;
selon ce qu'elle dit, décider de la v5 et du réglage Netlify à vérifier.
DETTE notée : relais en CORS « * » — un autre site peut s'en servir sur son
compte OpenAI. À traiter plus tard, sur sa décision.

· (387) 23/09 — PREUVE par ses deux essais « Bonjour », conversation neuve,
  sans photo : 2hype.netlify.app (14 h 38) → réponse normale ; 2hype.fr
  (16 h 46, dans Safari) → « Load failed » en 1 s (même chose dans l'appli
  installée à 16 h 44). Depuis le NOUVEAU DOMAINE, Hey Baby ne joignait plus
  son relais, même en texte. ⚠️ CORRIGE MA CONCLUSION DU 386 : le CORS « * »
  du relais ne suffisait pas à mettre le domaine hors de cause — l'appel
  d'un site vers l'autre était bloqué AVANT le relais (cause exacte du
  blocage non identifiée ; inutile pour réparer).
  CORRECTIF (décision « Ok ») : les 5 adresses par défaut du relais passent
  de https://2hype.netlify.app/.netlify/functions/assistant à l'adresse
  RELATIVE /.netlify/functions/assistant — l'app parle au relais de
  l'adresse où elle se trouve. Le réglage window.HYPE_API reste prioritaire.
  Conséquence dite : une copie de l'index ouverte HORS LIGNE (aperçu depuis
  les fichiers) n'a plus Hey Baby. LIEN_APP (lien de partage et QR code,
  toujours 2hype.netlify.app) NON TOUCHÉ.
  NON RÉGLÉ ICI : la photo avait AUSSI échoué sur 2hype.netlify.app à
  14 h 38 — refaire un essai photo sur 2hype.fr après poussée ; la ligne ⚙️
  dira si c'est un second problème. Relais v5 toujours NON poussé (attendre
  ce test). Build 20260923-387. node --check OK (18 blocs) ; marqueurs
  inchangés, 6 lignes modifiées (5 adresses + build).
