# 🔁 PASSATION — 12/08/2026 · L'ÉCRAN SELLERIE EST ÉCRIT, LE DÉFI DE LA VILLE AUSSI
### Va dans les FICHIERS DU PROJET CLAUDE, jamais sur GitHub. Remplace la passation de la nuit du 11 au 12/08.
### Le SUIVI de référence est `SUIVI-LINGUAE.md` md5 `6a415fa77689…`, dernière session écrite : **209**.

## 1. À POUSSER → RACINE
⚠️ `var VER = "?v=34"` : **deux fichiers du lot REMPLACENT des fichiers en ligne.** Sans le témoin, les téléphones garderaient les anciens des jours.

| fichier | md5 (début) | remplace ? |
|---|---|---|
| **lingo.html** (629 ko, `?v=34`) | `51decfb8656e` | oui |
| **lingo-sellerie.html** (43 ko) | `0936a264a7ca` | **nom nouveau** |
| **objet-lambourn.webp** (92 ko) — licol en cuir de face | `28e4486660ed` | **oui — l'étrille** |
| **sellerie-gauche.webp** (80 ko) — sans le rail du bas | `62a9f932a8fc` | oui |
| sellerie-entree.webp (97 ko) | `0132755061e4` | oui |
| sellerie-droite.webp (79 ko) — le mur qui manquait | `b3263de14ec0` | oui |
| pose-lambourn-34.webp (99 ko) | `1468ef7cad17` | nom nouveau |
| pose-walsall.webp (92 ko) · pose-walsall-34.webp (97 ko) | `5a70de43c1c4` · `a154c179ddf5` | nom nouveau |
| pose-dubai.webp (152 ko) · pose-dubai-34.webp (155 ko) | `ad78a7e71fa5` · `6d7bb962ab0b` | nom nouveau |
| pose-connemara-34.webp (105 ko) | `592fe904a050` | nom nouveau |
| pose-oliva.webp (149 ko) · pose-oliva-34.webp (124 ko) | `684b3e503501` · `49fd7501f8af` | nom nouveau |

**SQL : déjà exécuté** ✅ (« Success. No rows returned ») — `alter table public.hype_lingua_progression add column if not exists sellerie jsonb not null default '{}'::jsonb;`

**24 fichiers de réserve** prêts, rien ne les appelle, aucun risque : `reserve-filet` ·`-34` ·`-34b` · `reserve-licol-cuir-34b` · `reserve-licol-corde-face` ·`-34b` · 6 `reserve-cagoule-hype-*` · 4 `reserve-cagoule-linguae-*` · `reserve-malle-cote-gauche` ·`-droit` ·`-dessus` · `reserve-sellerie-gauche-biais-v2` ·`-v3` · `reserve-sellerie-large-3murs`.

⚠️ **NE PAS pousser l'ancien `sellerie-gauche.webp` depuis Claude** : la seule copie en ma possession venait de la maquette, réencodée à 32 ko contre 127 à l'original. **Il se conserve sur le téléphone de Blandine.**

## 2. LA PROCHAINE SESSION COMMENCE PAR LE RETOUR D'ESSAI
Blandine teste la sellerie. Ce qui l'attend :
- **les 4 points de calage du mur des selles** sont relevés à l'œil, à 1-2 % près. C'est **la seule valeur approchée de tout l'écran**, elle est en clair en tête de `lingo-sellerie.html`, corrigeable en une ligne. Contrôle hors calage : le porte-selle du milieu tombe à 29,5/51,6 pour 30/52 à l'œil.
- **la vitrine** est appariée aussi (contrôles : étagère 58,6/40,2 pour 59/40 · milieu 84,5/50,5 pour 83/50 · ⚠️ au-dessus de y=20 % l'écart monte à 8 %).
- **Rognage de `sellerie-gauche.webp`** proposé (20 px, pour revenir au 2:3 exact des sept autres murs) — non tranché.

## 3. CE QUI A ÉTÉ ÉCRIT CETTE SESSION
**L'écran sellerie** (`lingo-sellerie.html`, en iframe comme la collection et le globe) : 8 murs, circuit en rond dans les deux sens, pose libre au doigt, pincement, miroir, boutons de taille, transfert par les bords à 600 ms, zoom de pièce 3× borné, fenêtre inviolable, vue installée par la joueuse et **mémorisée par ville**, vue en grand au toucher, scroll reset, 6 langues, réserve limitée aux objets gagnés.
**Un objet, plusieurs vues, le moteur choisit** : une vignette par objet ; sur un mur de biais il prend la vue ¾ et la **rétrécit selon l'éloignement** (une selle de 30 % sur la face fait 19 % dans l'angle). Le jumeau ne se stocke jamais, il se recalcule.
**Le défi de la ville** : `reservoirVille()` + `ouvrirDefiVille()`, bouton **sous les leçons**, réservoir strictement la ville (jamais de complément), bilan « 14 / 18 », régime de la ville (`villeAutorisee`).
**À l'écran : +** « Ma sellerie » dans les portes du carnet · **+** « Ranger cet objet dans ma sellerie » sous l'objet gagné (arrivée et récapitulatif, masquée si l'objet n'est pas acquis) · **+** « Le défi · 60 s » sur la page de chaque ville pourvue d'un lexique. **−** rien.

## 4. 🟥 EN ATTENTE DE BLANDINE
1. **`objet-oliva.webp`** remplacé par la nouvelle vue de face de la malle ? (touche l'écran de récompense)
2. **Warendorf** : « carnet d'échelle » ne veut rien dire, et c'est le **deuxième carnet** de la collection (Édimbourg a le sien, plus beau). Deux issues opposées, non tranchées.
3. **Versailles** : ni chapitre ni objet. Bartabas et l'Académie interdits. Deux séries de propositions rejetées ; troisième piste = l'attelage, la vénerie, le travail à pied.
4. **Le projet Supabase** : vérifier que le projet affiché « Hype » est bien `ldpjebgtskzdokrublfg`. Mise de côté par Blandine, notée au SUIVI.
5. **Le rognage** de `sellerie-gauche.webp`.

## 5. 🟥 LE MODE DIALOGUE — DÉCIDÉ, PAS ÉCRIT
**La règle qui commande tout, posée cette session :** un dialogue **n'emploie que les mots de son chapitre**, plus les universels. Sans elle il enseigne du vocabulaire neuf au lieu de faire parler celui qu'on vient d'apprendre — la v2 de La Baule employait 5 mots sur 12 et en introduisait 4 étrangers. **La v3 en emploie 12 sur 12.**

**La Baule est prête en français**, dans `DIALOGUE-labaule.md` (md5 `b35146b0d3c9`) : 21 phrases, 7 temps, dont 5 à comprendre sans les produire.

⚠️ **CE QUI EMPÊCHE LA MISE EN LIGNE :** les 21 phrases n'existent **qu'en français**. Six langues sont obligatoires, plus l'audio. Il manque **105 traductions et leurs enregistrements** pour cette seule ville — et 31 villes suivent. C'est le plus gros chantier de contenu de Linguae depuis les lexiques.

**Décisions prises :**
- **la famille « je me débrouille » sort de toutes les villes** → une **thématique universelle à part**, apprise une fois, disponible partout, gratuite sans discussion (même famille que les urgences de Kildare). ⚠️ Son **nom** et son **emplacement** restent à décider.
- **le Galop est retiré**, mots de Blandine : « ceux qui sont capables de dire qu'ils sont Galop 4 en France n'ont pas besoin de traduction, et ailleurs personne ne saura à quoi ça correspond ». Règle générale qui en découle : **on n'enseigne pas un mot compris seulement dans sa langue d'origine** (Galops, licence FFE, BPJEPS). Ce qui exclut aussi « est-ce qu'il faut une licence ? ».
- **`balade` porte la même `ref` dans `arrivee` et dans `balade`** — seule collision entre les deux fichiers, vérifiée. Blandine : « s'il dort, tant mieux ». Le mot reste aux deux endroits avec **deux phrases différentes** (La Baule : « proposez-vous aussi des balades ? », « réserver une balade pour cinq personnes, combien cela coûte ? » — Le Morne : la plage, l'eau, le cheval calme sur place). Aucun déplacement de lexique, donc rien à retraduire. Conséquence assumée : le mot arrivera **déjà acquis** au Morne.
- **`cheval-calme` et `le-groupe` restent à La Baule.**
- **Sortent de La Baule et vont à Newmarket** (« L'écurie ») : « Où est la sellerie ? » et « Savez-vous où est mon cheval ? ». *À confirmer.*

## 6. 🟥 LE MOT DU GUIDE — À ÉCRIRE DANS UNE CONVERSATION NEUVE
Décision de Blandine, après six essais successifs de ma main : « laisse tomber, tu es trop influencé par ce que je t'ai dit plus haut, je le ferai faire de cette conversation-là ».
**Le nom est validé : « Le mot du guide »**, sous chaque phrase concernée, dans la **langue de lecture** seulement (c'est un commentaire, pas du vocabulaire).
**Ce qu'il faut transmettre à celui qui les écrira, et qui est le vrai enseignement de la session :**
- **ne rien affirmer d'un usage local.** Ce que les clubs **exigent** varie d'un pays à l'autre (exemple de Blandine : au Maroc on monte en baskets sans qu'on vous demande rien) ; ce qui est **prudent pour la cavalière** ne varie pas. Sur la sécurité on affirme, sur les usages commerciaux on suggère. Ne pas écrire « ça ne se loue pas » : certains clubs louent peut-être.
- **ton du voyage, de l'apprentissage et du rêve** — pas un règlement intérieur, pas « c'est mal perçu de ».
- proscrire « nulle part », « partout », « dans toutes les langues », « la seule qui ne se discute pas ».

## 7. CE QUI A COÛTÉ DU TEMPS
- **Six versions du mot du guide**, chacune corrigeant la remarque précédente au lieu de repartir de zéro. Résultat de plus en plus prudent et de moins en moins juste. **Quand deux essais de suite sont refusés, tout reprendre, pas retoucher.**
- **Neuf messages pour trancher la destination des images** ; l'argument technique du cache, faux, n'a été vérifié qu'au neuvième. **Vérifier un argument avant de bâtir des options dessus.**
- **Une divergence de murs annoncée trop large** (« les deux images ne montrent pas la même pièce ») alors qu'elle portait sur **un seul rail**. **Mesurer l'étendue d'un défaut avant de le nommer.**
- **Un premier calage de la vitrine avec quatre points groupés en haut du mur** → 12 % d'erreur en bas. **Une homographie ne s'extrapole pas : répartir les points.**
- **Une question posée trop tard** : « et si on retirait le rail de la vue de face ? » aurait dû venir avant de faire régénérer trois murs de biais. **Chercher l'image la moins nombreuse à refaire.**
- **Deux réponses d'un mot (« B », « ok oui ») pour deux décisions posées dans le même message.** **Une question par message quand les options portent les mêmes lettres.**
- **Une décision prêtée à Blandine** (session 205 : « les images de biais font l'ambiance, pas le placement » — c'était mon diagnostic). Rectification signalée au SUIVI, **pas encore portée dans le corps de la 205**.

## 8. IMAGES ENCORE À GÉNÉRER
La toise de Lamotte-Beuvron et la couverture de Spruce Meadows (**sur une barre, retombante, jamais pliée**) en vue ¾ — ce sont les deux seuls objets restants dont le resserrement ne suffira pas. Les objets de révolution (seau, jarre, coupe, cloche, lampion) n'en ont **pas besoin** : leur silhouette ne change pas avec l'angle (remarque de Blandine, ma liste initiale était mauvaise). Plus tard : licol/bride **suspendus sans le crochet**, selles de dos et ¾ arrière.
⚠️ **Règle de sécurité posée cette session, à valider comme règle générale (Hype comprise) : jamais de cavalier tête nue, jamais de baskets, dans aucune image et dans aucune phrase.**
