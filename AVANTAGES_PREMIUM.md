# HYPE ▸ AVANTAGES PREMIUM — liste maîtresse

Document de référence, séparé du SUIVI (qui bouge tous les jours). But : que
Blandine (ou moi, une prochaine session) retrouve d'un coup d'œil TOUT ce qui
est réservé aux membres Premium dans l'app, avec l'endroit dans le code.

Une seule variable gouverne tout : `premium` (contexte global), vraie si
`planAbo` vaut "mensuel"/"annuel"/"duo", ou si `profil.vip`, ou si
`ambassadeur`. Pas de plan « Pro » séparé pour ces avantages-ci (Hype Pro,
la carte enseignants/moniteurs sur la page Crystal, est un chantier à part,
encore « Prochainement » — voir SUIVI 51e).

## Écurie / chevaux

- **Nombre de chevaux** : 1 en gratuit, 6 en Premium (`hypeQuotaChevaux`,
  illimité pour les ambassadeurs). Bloqué à la création (`soumettreCheval`,
  bouton « Mes chevaux »).
- **Albums par cheval** : 1 album en gratuit, plusieurs en Premium.
- **Photos par album** : 20 max en gratuit, illimité en Premium.
- **Vidéos dans les albums** : 🆕 27/08 — réservées aux membres Premium.
  En gratuit, les vidéos sélectionnées sont filtrées avant l'envoi et un
  message l'explique (« vidéo(s) réservée(s) aux membres Premium »). Les
  photos restent libres sous la limite de 20/album. (`importerFichiers`,
  `estFichierVideo`.)

## Apprentissage (Galops)

- **Accès aux Galops** : au-delà du niveau débloqué par la progression,
  le contenu est verrouillé sans Premium (plusieurs écrans : liste des
  Galops, détail d'un Galop, « Boss » au-delà de la 2ᵉ question).
- **Examens blancs** : illimités en Premium ; le gratuit affiche un mur
  après quelques examens dans l'historique.
- **Articles** : certains articles sont marqués `premium: true` et
  verrouillés sans abonnement.
- **Écoles d'équitation (pages spéciales)** : École portugaise, École de
  Vienne, École de Jerez — pages entières réservées Premium.

## Hey Baby (assistant)

- **Questions par jour** : 1 en gratuit, 4 en Premium, 15 en plan IA
  (Hype IA), 20 en Duo.
- **Épingler une conversation** : réservé Premium/IA/Duo.

## Ce qui n'est PAS encore construit (question de Blandine, 27/08)

Elle a demandé si le **téléchargement/export des résultats** devait aussi
être réservé Premium — **cette fonctionnalité n'existe pas du tout
aujourd'hui** dans l'app (aucun bouton, aucune route de code trouvée pour
exporter/télécharger un palmarès en PDF, CSV ou autre). Rien à gater tant
que rien n'est construit. À trancher avec elle : veut-elle qu'on la
construise, et si oui sous quelle forme (PDF du palmarès ? export brut ?),
avant de décider de la réserver ou non aux membres Premium.

## Méthode pour retrouver un verrou non listé ici

Chercher `!premium` ou `premium ?` dans `index.html` — chaque occurrence
comportementale (pas les textes de traduction `avantage_1..6`, qui existent
mais ne sont affichés nulle part aujourd'hui — paywall en préparation
jamais branché) est un verrou réel. Mettre à jour cette liste après toute
nouvelle porte Premium ajoutée.
