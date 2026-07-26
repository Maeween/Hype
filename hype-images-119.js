/* HYPE ▸ hype-images-119.js — 26/07/2026 (v2) : SORTIE DU BASE64.
   Les quatre images de ce fichier étaient stockées en base64, ce qui pesait 296 Ko de
   JavaScript à analyser à CHAQUE ouverture de l'app, sans cache possible et sans
   chargement à la demande. Si le fichier n'arrivait pas entier, les images ne
   s'affichaient pas du tout, silencieusement — c'est ce qui est arrivé à deux
   cavalières le 26/07 (cheval de Mon Évolution et couverture du Chemin des Poneys).
   Elles sont désormais de vrais fichiers .jpg dans images/, comme la convention en
   place depuis k547. Aucune recompression : pixels rigoureusement identiques.
   296 Ko de code → 4 fichiers image de 221 Ko au total, chargés seulement quand ils
   s'affichent, mis en cache par le navigateur et libérés s'il manque de place.
   AUCUNE modification d'index.html n'est nécessaire : le code lit HYPE_IMGS["k555"]
   sans se soucier de ce que la clé contient.
   Historique conservé : la clé k558 (bandeau paysage de la carte REPRISES DE DRESSAGE)
   avait été renommée k603, car k558 était aussi définie dans hype-images-120.js
   (couverture portrait de baby-c10), fichier chargé APRÈS celui-ci : l'illustration
   Baby écrasait donc le bandeau. baby-c10 conserve k558 (version de 120).
   Clés de ce fichier : k555, k556, k557 (Mon Évolution) + k603. */
window.HYPE_IMGS = window.HYPE_IMGS || {};
window.HYPE_IMGS["k555"] = "images/k555.jpg"; /* cheval spectral qui saute, au-dessus de la courbe de Mon Évolution — 941x1672 */
window.HYPE_IMGS["k556"] = "images/k556.jpg"; /* bandeau paysage Mon Évolution — 900x495 */
window.HYPE_IMGS["k557"] = "images/k557.jpg"; /* couverture du Chemin des Poneys — 240x240 */
window.HYPE_IMGS["k603"] = "images/k603.jpg"; /* bandeau de la carte REPRISES DE DRESSAGE — 900x506 */
