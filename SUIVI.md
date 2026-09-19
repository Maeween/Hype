PASSATION — HYPE (PWA équestre) · état au 19/09/2026, midi

Ce document remplace la passation du 16/09 et consolide les builds 229 → 248.
Les entrées détaillées build par build ont été fondues : ce qui compte, c'est
ce qui est vrai maintenant et ce qui ne doit pas être refait.

────────────────────────────────────────────────────────────
1. LE PROJET ET LA PERSONNE
────────────────────────────────────────────────────────────
Blandine Pronost (feinn@live.fr), monitrice d'équitation, fondatrice de
l'Écurie Feinn (Itteville, Essonne, 20 membres). Elle COACHE AUSSI L'ÉQUIPE
de la Société d'Équitation de Paris (SEP) et est rattachée aux deux écuries.
Elle a une société (l'écurie).

Elle développe SEULE Hype, une PWA équestre, ENTIÈREMENT DEPUIS SON IPHONE :
GitHub, Netlify et le SQL Supabase, tout passe par son téléphone. Elle n'est
pas développeuse.

Architecture : un seul index.html, React monolithique, ~65 900 lignes, 18
blocs <script> inline. Supabase Pro + RLS. Netlify (2hype.netlify.app).
FICHIERS SÉPARÉS, À LA RACINE : hype-import-ffe.js (le lecteur de télémats),
hype-images-*.js (119), hype-cours-*.js, hype-video.js, hype-stories.js,
netlify/functions/stripe-webhook.js, images/FOND_HEYBABY.webp.

DERNIER LIVRÉ : 20260908-248 (md5 b2e167cd).
hype-import-ffe.js : md5 82cf9270, chargé en ?v=18.
224 à 245 EN LIGNE ET CONFIRMÉS. 246 à 248 livrés, 246 confirmé par capture.
Le numéro s'affiche en bas de l'accueil. TOUJOURS LE DEMANDER AVANT DE
TOUCHER AU FICHIER — pas seulement avant d'analyser une capture (voir §10).

────────────────────────────────────────────────────────────
2. RÈGLES DE TRAVAIL — NON NÉGOCIABLES
────────────────────────────────────────────────────────────
· 1 action → 1 modification atomique → test iPhone → validation → suite.
  Aucune refonte simultanée, aucun nettoyage opportuniste.
· NE JAMAIS DÉCIDER POUR ELLE. Un « Ok » seul VAUT accord : ne pas
  redemander. Mais quand une question reste sans réponse APRÈS TROIS
  RELANCES, trancher, le DIRE, et noter que c'est réversible.
· NE JAMAIS RETIRER NI REBRANCHER SUR UNE INTERPRÉTATION. En cas de doute :
  demander.
· Signaler toutes les conséquences AVANT d'agir, toute erreur immédiatement.
· À chaque livraison : dire QUELS fichiers pousser et OÙ, ne lister que le
  nouveau, SIGNALER CE QUI N'A PAS CHANGÉ (elle repousse sinon des fichiers
  inutiles).
· SUIVI.md est écrit par l'assistant. JAMAIS livré seul (ça fait buguer son
  appli) : toujours groupé avec index.html.
· Expliquer en langage simple. Pas de jargon.
· PAS DE CARTES À BOUTONS : elle clique dessus par accident.
· Diagnostic en base : UNE seule requête SELECT courte à la fois. Elle
  l'exécute, donne le résultat, on n'interprète QUE ce que ce résultat
  prouve. Abandonner immédiatement toute hypothèse contredite.
· Elle demande régulièrement un « prompt pour ChatGPT » : bloc ```text
  autonome, sans référence à la conversation.
· LES MAQUETTES MARCHENT MIEUX QUE LES MOTS : publier un aperçu plutôt que
  décrire.

────────────────────────────────────────────────────────────
3. PIÈGES TECHNIQUES PAYÉS CHER
────────────────────────────────────────────────────────────
· node --check SUR LES 18 BLOCS avant toute livraison (script check.py).
· JAMAIS D'EMOJI EN CARACTÈRE DANS UN SCRIPT PYTHON D'ÉDITION — toujours en
  échappement \\uXXXX. A vidé le fichier QUATRE fois.
· PAS DE REGEX AVEC PRÉFIXE [^\n]* sur ce fichier (blocage 300 s).
· SUPABASE REJETTE LA REQUÊTE ENTIÈRE dès qu'UNE colonne nommée est absente.
  La panne ressemble à « il n'y a rien », pas à une erreur.
· UNE ÉCRITURE REFUSÉE PAR UNE RÈGLE MANQUANTE renvoie ZÉRO LIGNE, pas une
  erreur. Après tout UPDATE, vérifier qu'une ligne est revenue.
· UNE ZONE `overflow: auto` ENFANT DE FLEX A BESOIN DE `min-height: 0`.
  Sinon elle ne défile pas, et le symptôme ressemble à « l'appli est
  bloquée ». A coûté quatre livraisons.
· POUR BLOQUER LE FOND SOUS UN CALQUE : body en position fixed avec son
  décalage négatif. `overflow: hidden` ne suffit pas sur iOS. Et NE PAS
  mettre `touch-action: none` sur la zone non défilante.
· ⚠️ `data-noswipe` SUR TOUT ÉCRAN MONTÉ HORS DU FLUX. Un pincement à deux
  doigts contient du mouvement horizontal : sans ce marqueur, l'app le lit
  comme un balayage et CHANGE D'ONGLET. C'est arrivé sur l'écran d'import
  (build 244), en lui faisant perdre son import en cours.
· NE JAMAIS APPELER UNE FONCTION DE TRADUCTION depuis le haut du corps d'un
  composant si elle y est déclarée en `const` plus bas : « Cannot access
  'TXT' before initialization », écran mort. A tué Hey Baby 3 livraisons.
· ⚠️ UN NOM DE CLUB NE SE COMPARE JAMAIS AVEC `===`. Utiliser `hypeMemeClub`
  (tolérant espaces/accents/casse). Une égalité stricte a faussé le compteur
  de membres pendant des jours (§5).
· UN `<input type="file">` CACHÉ N'EST JAMAIS DANS UN `<label>` : l'étiquette
  l'active déjà, le onClick l'active une 2ᵉ fois, et Safari iOS PERD le
  fichier choisi sans un mot. C'était la cause du « il se passe rien quand
  je sélectionne l'affiche ».
· PARTOUT OÙ UN ENVOI DE PHOTO PRÉCÈDE UN ENREGISTREMENT, VÉRIFIER QUE
  L'ENREGISTREMENT ATTEND. Sinon la ligne part sans la photo.
· hypeCavaliersDuClub : TOUJOURS l'appeler avec une liste de colonnes
  EXPLICITE incluant `ecurie` ET `ecurie2` — les omettre renvoie une liste
  vide EN SILENCE.
· `echanges_heybaby_epingles.cheval_id` est une colonne TEXTE, pas uuid.
· Pas de createPortal ni de menus en portail (cassés sur iOS) : les menus se
  déplient SUR PLACE.
· hypeCalquePhoto obligatoire pour toute photo plein écran.
· Les hooks React ne vivent pas dans une branche conditionnelle.
· ⚠️ TOUTE LIVRAISON DE hype-import-ffe.js DOIT INCRÉMENTER son `?v=NN` dans
  index.html (~46887), sinon l'iPhone sert l'ANCIEN lecteur depuis son cache
  et le correctif semble ne rien faire. Actuellement v18.

────────────────────────────────────────────────────────────
4. DIAGNOSTIC À DISTANCE — CE QUI MARCHE
────────────────────────────────────────────────────────────
⚠️ PREMIÈRE QUESTION DEVANT TOUT SYMPTÔME BIZARRE : « ES-TU CONNECTÉE ? »
Le 16/09, une session expirée a produit six symptômes d'un coup (photo
d'écurie remplacée par celle de la SEP, compteur faux, cavaliers désordonnés,
onglets manquants, blocs qui se chevauchent). Trois diagnostics faux ont été
produits avant de lire « Connecte-toi pour publier » ÉCRIT SUR SA CAPTURE.
→ Lire TOUT le texte visible sur une capture avant de théoriser.

⚠️ DEVANT UN BLOC « QUI RÉAPPARAÎT » OU « QU'ON A RALLUMÉ » : vérifier
d'abord s'il ne se REMPLIT pas simplement de données neuves. Le 19/09 elle a
cru qu'un rail masqué avait été rallumé ; comparaison des fichiers faite, il
était identique — il était juste VIDE avant.

⚠️ SES MESSAGES SONT TAPÉS VITE et parfois ambigus. Une formulation précise
(« il se passe juste rien quand je sélectionne ») a suffi à trouver une cause
en une minute, là où une formulation vague avait coûté une livraison entière.
Demander OÙ, et QUOI EXACTEMENT, avant de chercher.

⚠️ ET SES DIAGNOSTICS MÉTIER SONT MEILLEURS QUE LES HYPOTHÈSES DE
L'ASSISTANT. Deux fois le 18-19/09 : la cause du bug d'import (le nom du
cavalier en en-tête) et la règle des préparatoires (§7) venaient d'elle.

────────────────────────────────────────────────────────────
5. ÉTAT DES CHANTIERS TERMINÉS (229 → 248)
────────────────────────────────────────────────────────────
PAGE D'UN CONCOURS PASSÉ — REFONTE TERMINÉE, VALIDÉE PAR CAPTURE.
Hero 176 px, dégradé finissant en noir. Résultats : limite de 20 RETIRÉE,
épreuve en petites capitales or, CHEVAL EN TURQUOISE, cavalier en gris,
classement à droite. Galerie en tuiles carrées, sans limite de nombre.
Section « Publications & commentaires ». Diagnostic d'envoi replié sur une
ligne (réservé à son compte). Les trois sections s'introduisent par le même
filet fin.
· LE NOM DU CHEVAL est résolu EN AMONT, dans l'agenda, par UNE requête pour
  tous les rendez-vous : la page de détail ne requête RIEN, elle reçoit
  `window.__evPasse`.
· LE NOM DU CHEVAL EST UN LIEN vers sa fiche (chemin existant
  `window.__chevalOuvert` + setEcran("cheval")), dans la page ET dans les
  cartes de l'agenda.
· CHOIX DE LA PHOTO DE COUVERTURE : bouton sur chaque photo, réservé au
  gestionnaire du club, jamais sur une vidéo. Écrit dans `club_agenda.
  image_url` qui existait déjà. Retirer le cheval DÉPUBLIE l'épingle.
· MÉDAILLES : 🏆 1er, 🥈 2e, 🥉 3e toujours ; 🏅 au-delà SEULEMENT si la
  place est dans le TOP 8 *ET* le PREMIER QUART des partants. Un 1er sur 1
  garde son trophée (sa décision). Règle dans UN SEUL helper,
  `hypeRecompense(place, partants)`, utilisé par les deux écrans.
· ⚠️ NON FAITS, ET SON BRIEF LES INTERDIT : vignettes par résultat (aucune
  relation photo↔résultat n'existe) et « Sans-faute » (aucune colonne).

IMPORT FFE — LE GROS CHANTIER DU 18-19/09, FONCTIONNE.
Son diagnostic : « l'outil ne comprend pas quand c'est pris depuis le
cavalier qu'il doit prendre le nom en haut de la fiche ». Exact.
· Télémat d'un CHEVAL : chaque bloc porte « Monté par EVAN ROUX ».
  Télémat d'une CAVALIÈRE : ce champ N'EXISTE PAS ; chaque bloc porte
  « Sur RIZOTTO D'EMERY » (le cheval) et le nom est en EN-TÊTE.
· ⚠️ CONSÉQUENCE MESURÉE : le cavalier vide faisait PERDRE DES RÉSULTATS.
  Deux chevaux courant la même épreuve le même jour donnaient deux lignes de
  clé identique (date+épreuve+concours+cavalier vide) : la 2ᵉ était jetée EN
  SILENCE. Les résultats de Cruibhin n'existaient nulle part.
· CORRECTIFS : étiquette « Sur » lue ; cavalier lu dans l'en-tête (motif
  strict NOM PRÉNOM + licence 7 chiffres + 1 lettre, tiret optionnel) ; le
  DERNIER MOT de l'en-tête passe devant, car l'en-tête écrit « ROUX EVAN »
  et « Monté par » écrit « EVAN ROUX » — sans ça les doublons revenaient ;
  LE CHEVAL ENTRE DANS LA CLÉ de dédoublonnage.
  ⚠️ La recherche du nom parcourt TOUT le document : son télémat commence
  par la LISTE DES 25 CAVALIERS DU CLUB, et son nom n'arrive qu'après.
· RANGEMENT MULTI-CHEVAUX : chaque ligne part sur la fiche de SON cheval.
  Recherche à DEUX NIVEAUX (son choix) : les chevaux de ses DEUX écuries
  d'abord, puis TOUT HYPE par requêtes ciblées. La priorité écurie tranche
  les homonymes sans demander.
  ⚠️⚠️ RÈGLE DE SÛRETÉ : une ligne dont le cheval n'est PAS reconnu, ou dont
  plusieurs chevaux portent le nom, N'EST PAS ÉCRITE — jamais de repli sur
  la fiche ouverte. C'est ce repli qui avait mis 72 lignes de Rizotto sur la
  fiche de Vallières.
· L'écran de fin DIT où les lignes sont parties, et distingue « je ne sais
  pas duquel il s'agit » de « aucun cheval de ce nom chez toi ».
· LE NOM DU CHEVAL S'AFFICHE EN TURQUOISE SUR CHAQUE LIGNE de l'écran de
  relecture, AVANT validation (sa demande, répétée trois fois).

AUTRES
· L'AFFICHE À LA CRÉATION D'UN RENDEZ-VOUS marche enfin (deux causes : le
  bouton n'attendait pas la fin de l'envoi, ET le sélecteur était dans un
  `<label>` — voir §3).
· ACTUALITÉS DE L'ÉCURIE : photos en bandeau AU-DESSUS du texte, via une
  option `photosEnHaut` sur MurHype. ⚠️ UN SEUL APPELANT la demande ; les
  SEPT autres écrans gardent le rendu d'avant, au pixel près.
· PAGE CAVALIER : le rail « Derniers résultats » reprend la carte de la page
  Écurie (médaille, date, portrait rond, « 1er EVAN ROUX sur Rizotto » avec
  le cheval en turquoise). Placé SOUS les chevaux, il chevauchait « Mes
  chevaux » avant. LA DATE COMPLÈTE remplace l'année seule SUR LES DEUX
  RAILS. ⚠️ Le nom du cavalier est gardé même sur sa propre page : question
  posée 3 fois sans réponse, tranché, réversible en une ligne.
· ⚠️ LE « 20 » TURQUOISE au-dessus des vignettes, c'est LES CHEVAUX. Elle l'a
  signalé mal placé puis tranché : « non touche pas les chevaux ils vont
  bien ». NE PAS Y TOUCHER.
· LA CROIX DE L'ENCART CAVALIERS DEMANDE CONFIRMATION (deux touchers, comme
  pour retirer une épingle). Elle avait exclu Chloé par mégarde — le retrait
  est GLOBAL, pas un masquage perso.
· COMPTEUR DE MEMBRES RÉPARÉ : la fonction SQL renvoyait bien 20 ; c'était
  l'app qui cherchait sa ligne par égalité STRICTE (voir §3). Et LE NOMBRE
  DE CAVALIÈRES s'affiche dans l'encart, À PARTIR DE 5 (son idée : en
  dessous on les voit, le chiffre n'apprend rien).
· MON CARNET EST GRISÉ (« Prochainement ») le temps de sa refonte. ⚠️ NE PAS
  OUBLIER DE ROUVRIR L'ACCÈS quand elle sera livrée : un argument à retirer.

────────────────────────────────────────────────────────────
6. ÉTAT DE LA BASE
────────────────────────────────────────────────────────────
SQL PASSÉ PAR ELLE (« Success »), À NE PAS REFAIRE :
· echanges_heybaby_epingles : + cavalier_id, cavalier_nom, visible_ecurie ;
  règle UPDATE hb_epingle_update ajoutée (elle manquait) ; politique
  hb_epingle_select_ecurie ; fonction hype_meme_ecurie_que_proprio(TEXT —
  pas uuid).
· carnet_conseils_etat.theme passé en text[].
· 19/09 : policy `resultats_masquer_proprio_ou_admin` (UPDATE) — email admin
  (feinn@live.fr, malicia2008@hotmail.fr) OU propriétaire du cheval. Sans
  elle, ni la propriétaire ni Blandine ne pouvaient masquer un résultat
  écrit par quelqu'un d'autre. L'écran de masquage existait déjà.

RELEVÉS UTILES
· `classement_ecuries()` compte DÉJÀ les deux écuries (cross join lateral
  sur ecurie/ecurie2 + distinct). Elle renvoie 20 pour Ecurie Feinn, 21 pour
  la SEP, 1 pour Jardy. ⚠️ Elle compte résultats et podiums par le CLUB DU
  CHEVAL (`chevaux.club`), pas par l'écurie de la cavalière : un résultat sur
  un cheval sans club ne compte pour personne.
· ⚠️ `lecture resultats` (SELECT) vaut `true` : TOUT utilisateur connecté lit
  TOUS les résultats, y compris ceux d'un cheval marqué privé. La seconde
  règle qui vérifie la visibilité ne sert donc à rien. Non urgent, mais à
  savoir.
· NOMS D'ÉCURIES, à recopier tels quels : « Ecurie Feinn », « Societe
  d'Equitation de Paris (SEP) », « Jardy Equitation (Haras de Jardy) ».
· `ecurie_cavaliers_exclus` : Soraya exclue (VOULU). ⚠️ CETTE TABLE N'A PAS
  DE DATE : impossible de dater une exclusion. À ajouter un jour.
· `cavaliers_ffe` relie un nom FFE à un compte. ⚠️ SANS CE LIEN, LES
  RÉSULTATS N'APPARAISSENT PAS sur la page de la cavalière. L'écran de
  rattachement est RÉSERVÉ AUX MODÉRATRICES (fonction
  hype_est_moderatrice) : une cavalière ne peut pas revendiquer son nom
  elle-même, c'est Blandine qui le fait par la tuile « Relier les résultats
  FFE ». Rattachements faits : BLANDINE PRONOST, LIAM ROUX, EVAN ROUX.

────────────────────────────────────────────────────────────
7. ⚠️⚠️ EN PRÉPARATOIRE, TOUS LES SANS-FAUTE SONT 1ᵉʳˢ
────────────────────────────────────────────────────────────
RÈGLE MÉTIER DONNÉE PAR ELLE, ET ELLE INVALIDE PRESQUE TOUTE RECHERCHE DE
DOUBLONS. Dans une préparatoire il n'y a pas de classement au chrono : TOUS
les sans-faute sont déclarés PREMIERS. Deux cavalières peuvent donc être
légitimement « 1ᵉʳ sur 56 » le même jour, dans la même épreuve.

CE QUE ÇA A ÉVITÉ : une recherche de doublons avait remonté 11 groupes.
Après sa remarque, presque tous sont de VRAIS résultats. SANS SA PHRASE,
L'ASSISTANT AURAIT PROPOSÉ D'EFFACER DES RÉSULTATS RÉELS DE SES CAVALIÈRES.

→ TOUTE DÉTECTION DE DOUBLON doit écarter les préparatoires, ou exiger une
différence sur autre chose que la place.
→ MÉTHODE À REPRENDRE TELLE QUELLE : une requête qui LISTE, une qui MONTRE
les lignes visées par leur id avec contrôle, puis un DELETE par ids NOMMÉS
un par un. Jamais de critère.

DOUBLONS NETTOYÉS LE 19/09 : les 4 de Rizotto (imports du 14 et du 18/09) et
celui de Boréalis du 28/04/2024. Cruibhin complété avec « EVAN ROUX ».
⚠️ PISTE OUVERTE : le doublon de Boréalis avait 17 SECONDES d'écart entre les
deux écritures, avec une clé identique. Il n'aurait pas dû passer. Piste :
deux imports lancés coup sur coup, le second lisant la base avant que le
premier ait écrit. SI ÇA SE REPRODUIT, il faudra une contrainte d'unicité en
base. Ne pas y toucher sans un cas reproduit.

────────────────────────────────────────────────────────────
8. EN ATTENTE D'ELLE
────────────────────────────────────────────────────────────
· TESTER LE 248 : page Écurie (« 20 cavaliers » dans l'encart, compteur
  d'en-tête à 20), et la croix qui demande confirmation.
· LES DEUX ÉCRANS DE L'IMPORT, non commencés : choisir entre homonymes, et
  créer une fiche pour un cheval inconnu. Tant qu'ils manquent, ces lignes
  ne sont pas écrites et l'écran le dit — rien ne part au hasard.
· LE COMPTEUR DE VICTOIRES compte peut-être les 1ᵉʳˢ de préparatoire comme
  des victoires. Le rail aux coupes les écarte déjà ; le compteur, non
  vérifié. À regarder à la lumière du §7.
· PAGE D'ÉCURIE SANS SESSION : elle affiche la SEP au lieu de l'Écurie
  Feinn. Devrait demander de se reconnecter, jamais montrer un autre club.
· BARRE DU BAS : 7 entrées, « Communauté » tronqué. ⚠️ ZONE SENSIBLE, un
  correctif de centrage y attend son verdict depuis le build 164.
· LA ZONE « PARTAGER UN MOMENT » plus compacte : le composeur appartient à
  MurHype, PARTAGÉ PAR TROIS MURS. Modification multi-écrans : pas sans son
  accord explicite, et dire quels écrans tester.
· TROIS ÉCRANS OÙ UN ENVOI DE PHOTO POURRAIT SOUFFRIR DU MÊME DÉFAUT QUE
  L'AFFICHE : création d'un cheval, photo de profil, photo d'écurie. NON
  VÉRIFIÉS — ce serait du nettoyage opportuniste.
· LA MASCOTTE APY (HYPE_IMGS["k554"]) EST CASSÉE : carré « ? » au lieu de la
  photo. Elle ne retrouve pas l'image. Deux options présentées, non
  tranchées : envoyer une photo d'Apy, ou replier sur l'emoji cheval.
· « Moi » dans le sélecteur des conseils = les épingles sans cavalière.
  Tranché par l'assistant, à confirmer.
· resultats.format_large : ajouter la colonne ou retirer la fonction ?
· Les 5 Premium SANS LIMITE (proches et ambassadeurs) : à confirmer.
· Liam a deux lignes, @gmail.com et @gmail.fr : à nettoyer un jour.
· Les 5 comptes du 28/08 (mois offert) ont expiré le 1er octobre. RIEN à
  corriger en base. Reste à décider comment leur proposer de s'abonner.

────────────────────────────────────────────────────────────
9. CHANTIERS OUVERTS
────────────────────────────────────────────────────────────
A. ⚠️⚠️ LE PARTAGE DES ÉPINGLES — LE PLUS DÉLICAT.
   ÉTAPE 1 FAITE : visibilité écurie, publiable par le propriétaire du
   cheval ou l'admin, « visible par tous » = LES MEMBRES DE L'ÉCURIE DU
   CHEVAL, pas tout Hype.
   ⚠️ SENS RÉVERSIBLE : élargir plus tard est une ligne à changer ; revenir
   en arrière est impossible, ce qui a été lu a été lu.
   ⚠️ LE TEST QUI COMPTE N'EST TOUJOURS PAS FAIT : publier une épingle, puis
   vérifier DEPUIS UN AUTRE COMPTE qu'elle est visible dans la même écurie
   et INVISIBLE ailleurs. Tant qu'il n'est pas passé, l'étape 1 n'est PAS
   validée.
   ÉTAPES 2 et 3 NON COMMENCÉES : l'épingle taguée chez la cavalière (avec
   masquage et suivi de « vue »), puis les séances. MODÈLE RECOMMANDÉ :
   l'épingle reste UNE SEULE ligne, pas de copie ; « effacer » devient
   « masquer pour moi » dans une petite table à part.

B. MON CARNET — REFONTE VISUELLE. Brief reçu, relevé fait, plan donné, NON
   VALIDÉ. L'accès est grisé en attendant. Le bouton est déjà calmé ; le
   bandeau attend qu'elle choisisse une image.

C. VIDÉOS DANS UNE SÉANCE — tracé, non codé. Le pipeline vidéo exige UNE
   LIGNE PAR VIDÉO ; une séance stocke un TABLEAU d'URL. Voie recommandée :
   une table carnet_seance_videos.

D. APPRENTISSAGE DU CHEVAL — proposé, non validé. Pas d'XP ni de quiz :
   résultats FFE, santé, palmarès, origines.

E. NOM DE DOMAINE (19/09, en cours chez elle). `2hype.com` est PRIS ;
   `2hype.fr` est libre à 5,10 € la 1ʳᵉ année (~12 € ensuite) chez
   Infomaniak. `horsehype.fr/.com` libres aussi mais elle a écarté le nom
   (« c'est ridicule »). CONSEILS DONNÉS : décocher « Domain Plus » à
   4,90 €/an (inutile, l'anonymat est automatique sur un .fr) ; acheter au
   nom de sa SOCIÉTÉ ; GARDER 2hype.netlify.app actif après l'achat, tous
   les liens déjà envoyés passent par là.
   ⚠️ NETLIFY : leur interface a changé (« Sites » → « Projects ») et la
   gestion des domaines est introuvable dans les menus. Passer par la
   recherche « Search Netlify… » puis « Find a domain… ».
   ⚠️ APP STORE : elle y pense. Le domaine n'y joue AUCUN rôle, mais APPLE
   N'ACCEPTE PAS LES PWA telles quelles — il faut l'emballer dans une vraie
   app (compte développeur 99 €/an, Mac ou service tiers, validation qui
   refuse souvent les « sites web emballés »). À traiter comme un vrai
   chantier, pas un détail.

F. Dette sans urgence : mesChevauxClub, les groupes par mois, l'encart album
   dans EcranEcurie, hype_detacher_cavalier (signature jamais relevée), les
   autres UPDATE qui ne testent pas leur retour (ne PAS corriger en masse).
   ⚠️ MurHype porte maintenant UNE DOUZAINE D'OPTIONS booléennes accumulées
   écran par écran. C'est la stratégie choisie pour ne jamais casser les
   autres écrans, mais le seuil où deux composants distincts vaudraient
   mieux n'est pas loin.

────────────────────────────────────────────────────────────
10. À NE JAMAIS FAIRE
────────────────────────────────────────────────────────────
· NE PAS passer la requête DELETE des « doublons » de résultats FFE de
  l'entrée 156 : les deux victoires à 24 h d'écart sont RÉELLES.
· NE PAS supprimer de « doublons » sans la méthode du §7.
· NE PAS « corriger » les 5 lignes du 28/08 : mois offert assumé.
· NE PAS réécrire ni déplacer le chantier Santé du cheval. Livré et testé.
· NE PAS toucher au correctif chevauxCibles de Hey Baby : le repli sur
  CHEVAUX_FICHE a été supprimé VOLONTAIREMENT.
· NE PAS reprendre le build 216 tel quel (il contient la panne Hey Baby).
· NE JAMAIS modifier une CLÉ de thème (position, plat, saut…) : elles sont
  écrites en base. Pour renommer, changer le LIBELLÉ.
· NE JAMAIS ranger le filtre « Pour qui ? » de la bibliothèque dans
  localStorage : elle ne doit jamais croire que des épingles ont disparu.
· NE PAS toucher au « 20 » des chevaux de la page Écurie.
· Marqueurs de garde à vérifier avant toute greffe : liensClub,
  chevalCommunDemoData, palmTech, EcranSanteCheval.

────────────────────────────────────────────────────────────
11. INCIDENT DE MÉTHODE À NE PAS REFAIRE
────────────────────────────────────────────────────────────
Le 18/09, une livraison entière (hero + résultats de la page d'un concours)
a été codée sur l'index 218 alors qu'elle était au 228, dans une
conversation qui n'avait pas le fichier à jour. ELLE L'A ARRÊTÉE À TEMPS
(« t'avais pas le bon index »). Tout a été refait.

→ DEMANDER LE NUMÉRO D'INDEX AVANT DE TOUCHER AU FICHIER, pas seulement
avant d'analyser une capture. Et si le fichier vient d'une autre
conversation, le faire renvoyer.

Autre travers récurrent, à surveiller : construire une hypothèse compliquée
avant de lire ce que la capture ou la donnée dit déjà. Trois fois le 16/09,
deux fois le 19/09. La mesure d'abord, l'explication ensuite.
