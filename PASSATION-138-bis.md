# PASSATION — Hype · session 138 bis, soirée du 17/08/2026

## À FAIRE EN PREMIER

Pousser **ensemble** :

| fichier | md5 | notes |
|---|---|---|
| `index.html` | `a0bcf61973f3c64ae5a5892614e50311` | 9 151 248 octets |
| `hype-stories.js` | `4b7570d20afc39ce329ac93b4fa91526` | v19bg, 388 627 octets |
| `Hype_mur_immersif_encarts_transparents.png` | — | **déjà en ligne**, ne rien refaire |

Balise : `hype-stories.js?v=19bg`. Témoin attendu : `reprise 1.8 · baby 112 · memo 4 · stories 19bg`.

**LE SQL EST DÉJÀ PASSÉ** le 17/08 à 21 h 11 et vérifié sur les 41 comptes. `identifiants-uniques.sql` est idempotent, mais **il n'y a aucune raison de le relancer**.

`index-apercu-cavalier.html` est fourni **en plus**, jamais à la place — copie de test avec `DEV_OUVRIR_PAGE = "moncavalier"`.

⚠️ **États périmés du soir, ne pas pousser :** index `b5097956…`, `237cad0b…`, `524bfede…`, `2392d97c…` ; stories `bedd52ae…` (19bf), `95f05492…` (19be), `6d0488d6…` (19bd).

---

## CE QUI A ÉTÉ LIVRÉ

**Les deux figeages de story (19be).** Le texte déplié posait sa propre zone de défilement à l'intérieur de la colonne qui défilait déjà : deux zones imbriquées, le doigt tombait toujours sur le texte, la colonne ne bougeait plus, photo et tirages restaient coupés. Et la bande de tirages arrêtait `touchstart` sans condition, ce qui rendait la visionneuse sourde pour tout le reste du toucher. **Confirmé réparé à l'écran par Blandine.**

**L'à la une (19bf).** Un album contenant une story composée fabriquait une entrée par photo : la composition, puis ses trois membres tout nus. Regroupement par `groupe`, l'entrée retenue étant le membre le plus ancien — la story réellement mise en ligne, celle qui porte la légende. Plus les tirages demandés à leur vraie taille (9,1 fois moins de pixels) et la taille d'image figée par paliers pour que le cache serve. **Confirmé réparé à l'écran.**

**La page Cavalier resserrée.** Nom 26 → 21, citation 18 → 15,5, encart du Mur des songes resserré, gros guillemet 110 → 84. Tableau complet des valeurs au SUIVI.

**Les identifiants uniques — SQL passé et vérifié.** 41 comptes, un identifiant chacun, zéro doublon (prouvé par la création réussie de l'index unique, pas seulement par une requête). Les six noms qui étaient en double sont marqués `handle_a_valider`.

**Les identifiants uniques — étape 2a, l'affichage.** Deux fonctions globales (`hypeHandleNormalise`, `hypeHandleTexte`), l'identifiant sous le nom sur la page Cavalier, dans les listes de cavaliers (un seul composant, six pages couvertes) et dans le sélecteur de mentions.

---

## 🟩 L'ÉTAT RÉEL DE LA BASE, RELEVÉ CE SOIR

| compte | nom affiché | identifiant | à valider |
|---|---|---|---|
| feinn@live.fr | Blandine | `@blandine` | oui |
| dominique.wirtschafter@orange.fr | Dominique | `@dominique` | oui |
| liamroux0@gmail.com | Liam | `@liam` | oui |
| hadjadj.dominique@gmail.com | Dominique H | `@dominique.h` | oui |
| fzinn@live.fr *(coquille)* | Blandine | `@blandine2` | oui |
| liamroux0@gmail.fr *(coquille)* | Liam | `@liam2` | oui |

Les 35 autres : `false`, identifiant juste du premier coup.

⚠️ **DEUX COQUILLES RESTENT À SUPPRIMER** : `fzinn@live.fr` et `liamroux0@gmail.fr`. Vérifier d'abord qu'elles sont vides (requête au SUIVI) — supprimer un compte emporte ce qu'il a publié. Ce n'est **pas** un préalable à quoi que ce soit.

⚠️ **DOMINIQUE N'EST PAS UN DOUBLON.** `dominique.wirtschafter@orange.fr` et `hadjadj.dominique@gmail.com` sont **deux personnes réelles**, que Blandine connaît toutes les deux. Ne jamais en supprimer une. Wirtschafter est son **premier abonné**.

**Cas tranché par Blandine, ne pas y revenir :** « 由美子 Barrère » a reçu `@barrere` (les caractères japonais ne peuvent pas entrer dans un identifiant). Proposition faite de mettre `@yumiko.barrere` et de marquer les noms non latins pour qu'ils choisissent : ses mots, **« laisse pas grave »**. Son nom affiché n'a jamais bougé.

---

## ÉTAPE 2b — CE QUI RESTE À CODER (rien n'est écrit)

Tout est décidé, il n'y a plus de question à poser.

1. **`majProfil` étendu à `handle`** — la liste blanche des champs le refuse aujourd'hui.
2. **Le message d'invitation à la connexion**, aux seuls comptes `handle_a_valider = true`. **Jamais bloquant** : il se ferme, on entre, il revient à l'ouverture suivante tant que rien n'est validé. Un message vu une fois puis oublié ne sert à rien.
3. **Le libellé dit « rarement modifiable », JAMAIS « définitif »** — décision explicite de Blandine. Promettre le définitif serait faux, puisqu'un changement reste possible tous les 60 jours.
4. **L'écran de changement** : contrôle « déjà pris » (confort seulement — la garantie est l'index unique), refus des mots de `hype_handles_interdits`, refus de ce qui est encore dans `hype_handles_reserves`.
5. **Le quota** : premier changement **gratuit** (`handle_gratuit_fait`), puis 60 jours (`handle_change_le`). Quelqu'un qui a reçu `@blandine2` sans l'avoir choisi ne doit pas attendre pour le corriger.
6. **La réservation** : à chaque changement, verser l'ancien identifiant dans `hype_handles_reserves` (6 mois). C'est ce qui répond à la crainte de Blandine — que quelqu'un récupère une identité laissée libre.
7. **Les mentions déjà publiées** : elles portent le nom **figé** (`cible_nom`). Elles affichent donc l'ancien nom tout en menant au bon profil. Blandine a demandé de le traiter **dans le même lot** que 2b.

⚠️ **2b ÉCRIT EN BASE.** C'est la partie où une erreur coûte cher. Elle a été volontairement séparée de 2a, qui ne lit que.

---

## 🔴 RÈGLES PAYÉES CETTE SESSION

1. **NE PAS HÉRITER D'UN DIAGNOSTIC.** La PASSATION-138 donnait la cause du blocage des à la une pour trouvée. Elle était fausse. Deux questions tappables ont retourné le problème, et le correctif prévu n'aurait rien réparé.
2. **ARRÊTER `touchstart` EST BIEN PLUS GRAVE QU'ARRÊTER `touchmove`.** C'est lui qui arme le geste du parent. Un composant qui le bloque rend le parent sourd pour tout le reste du toucher.
3. **JAMAIS DEUX ZONES DÉFILANTES IMBRIQUÉES SUR LE MÊME AXE.** La plus intérieure gagne, et c'est presque toujours la plus grande à l'écran.
4. **UNE VALEUR QUI ENTRE DANS UNE URL DOIT ÊTRE QUANTIFIÉE.** Une dimension lue dans le navigateur et écrite dans une adresse d'image crée une URL par pixel, donc un cache inutilisable.
5. **DEUX GARDES QUI NE DISENT PAS LA MÊME CHOSE, C'EST UN BUG QUI ATTEND.** Deux fois dans le SQL : contrainte plus laxiste que la fonction, puis fonction produisant une valeur que la contrainte refusait. La fonction JS de l'app est désormais le **miroir exact** du SQL, vérifié sur 20 000 noms.
6. **UN FUZZ VAUT MIEUX QU'UNE LISTE DE CAS.** 24 cas choisis ne montraient qu'un des deux défauts ; 40 000 noms au hasard les ont trouvés tous les deux.
7. **CALCULER AVANT D'ANNONCER.** « 25 fois » annoncé à Blandine, 9,1 mesuré cinq minutes plus tard en écrivant le correctif.
8. **UN PALIER SE VÉRIFIE SUR UNE TABLE.** Le premier pas de 160 px ne réglait le cache qu'une fois sur deux ; seule la table de dix hauteurs d'écran l'a montré.
9. **NE JAMAIS AFFIRMER L'ÉTAT DE LA BASE.** Claude n'a aucun accès à Supabase ni au domaine. Une confirmation inventée sur le nombre de comptes Liam aurait pu faire supprimer un compte payant.

---

## ⚠️ MES ERREURS DE LA SESSION

**Le ménage des comptes fantômes annoncé comme bloquant.** Faux, et affirmé **avant** de regarder l'ordre de création. Les vrais comptes étant les plus anciens de leurs paires, ils prenaient de toute façon la forme courte.

**« 25 fois trop de pixels ».** La vraie valeur est 9,1 : je comparais à la mauvaise taille de référence.

**Le premier palier de cache à 160 px.** Laissait deux URL possibles au lieu d'une — il ne réglait la panne qu'une fois sur deux. Corrigé à 320 après avoir calculé la table.

**Deux fautes de structure d'affilée sur `index.html`, ce soir.** Une édition qui a supprimé un bloc de commentaire au lieu d'ajouter une ligne ; puis l'identifiant posé en troisième enfant d'une rangée `space-between`, donc affiché **à côté** du nom au lieu de dessous ; puis une restructuration automatique qui a mal coupé une fermeture. **Blandine a tranché : « repars du fichier propre au début ».** Elle avait raison — je réparais par-dessus mes réparations, ce qui fabrique un état bâtard. L'étape 2a a été **entièrement réappliquée en une seule passe** sur l'index propre livré à 21 h, et vérifiée après.

**La leçon, et elle est nouvelle :** sur un fichier de 9 Mo qu'on ne peut pas voir à l'écran, **une réparation de réparation ne se fait pas.** On revient à la dernière base saine et on réapplique d'un bloc.

---

## CE QUI ATTEND UNE DÉCISION DE BLANDINE

- **Le nuancier d'onglets et d'encarts** (`maquette-nuancier-onglets.html`) : six onglets, six encarts, numérotés pour être cités. **Aucun choix fait.** Elle voulait d'abord voir les visuels sans décider de ce qui bouge. Noté par Claude, à ne pas confondre avec une préférence : l'encart 03 « Affiche » est le plus proche de la Design Bible.
- **Graver les réglages du mur immersif.** Le mur est **déjà en ligne pour tous** et le panneau **déjà réservé** à `feinn@live.fr` — rien à coder. Mais les réglages de Blandine vivent dans le `localStorage` de son téléphone : les autres voient les valeurs d'usine, bien plus lourdes (désature **80** au lieu de 25, nappe **50** au lieu de 20, fondu **Large** au lieu de Moyen). Graver ses cinq valeurs = cinq nombres à changer.
- **Aligner « Mon récit » sur le Mur des songes.** Il garde ses anciennes tailles et paraît désormais plus gros que son voisin. Signalé, non fait, elle n'a pas répondu.
- **Le chaînage des à la une** — passer d'une à la une à la suivante. **Ce n'est pas un bug** : la cause donnée par la passation précédente était fausse. C'est une demande produit, à formuler ou à abandonner.
- Tout le reste de la liste de la PASSATION-138 : onglets de la page Cavalier, teinte de l'Écurie, photo d'écurie en double, zone libre de Fond Studio, code mort du détourage, fond flou cuit dans `srcNue`, la musique, plus de quatre à la une.

---

## PRÉPARATION FLUTTER

**Un vrai gain, le premier de ce genre.** La règle de formation d'un identifiant vit désormais **en base** (`hype_handle_normalise` + index unique + contrainte de format). Un futur client Flutter n'aura rien à réimplémenter et surtout **ne pourra pas diverger** de la règle. La fonction JS n'est qu'un miroir de prédiction, et elle le dit dans son propre commentaire.

**Dette reconnue, non traitée :** `hsRegrouperCompos` existait depuis le 13/08 pour le rail des stories, et j'ai écrit un **second** regroupement des compositions dans `hsGroupeALaUne`. Deux copies du même comportement, contraire à la règle de non-duplication du 17/08. Ça marche, mais c'est à unifier. C'est ma dette, pas une demande de Blandine.

**Constat sans action :** le module compte maintenant **trois** endroits qui arbitrent tap contre glissé, chacun avec son seuil en dur. Un arbitre unique sur `window` supprimerait la quatrième copie avant qu'elle naisse.

---

## MÉTHODE

**Feu vert explicite avant tout code.** Un « je pense qu'il faut faire A » n'en est pas un. Cette session a bien fonctionné : cinq séries de questions tappables ont produit une spécification complète des identifiants avant la première ligne écrite, et aucune reprise n'a été nécessaire sur le SQL.

**Un chiffre avant une ligne**, et un fuzz plutôt qu'une liste de cas.

**Livrer le SQL seul, puis l'app.** Blandine a vérifié les 41 identifiants avant qu'une seule ligne d'interface en dépende.

**Revenir à la base propre plutôt que réparer une réparation.**

**Ce que Claude ne peut pas faire** : ouvrir l'app, toucher l'écran, voir le rendu, lire une console, accéder à Supabase ou GitHub. Le domaine refuse l'accès automatisé. **Aucune affirmation sur l'état de la base ne doit être inventée** — livrer la requête et attendre.
