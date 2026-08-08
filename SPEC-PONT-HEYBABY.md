# SPEC · Le pont Linguae → Hey Baby (moitié `index.html` + `assistant.js`)
*Écrite le 8 août 2026 dans le fil Linguae. À coller telle quelle dans le fil principal de Hype. La moitié Linguae est DÉJÀ livrée (lingo.html v19) : en fin de leçon et de quiz, un bouton « 🐴 Demande à Hey Baby » ouvre `index.html?heybaby=1&lingo=<langue>&ville=<ref>`.*

## 1 · `index.html` — accueillir le lien entrant
Au chargement (là où l'app lit déjà `?merci=1` pour Stripe, même endroit) :
```js
var q = new URLSearchParams(location.search);
if(q.get("heybaby")==="1"){
  var lingoLangue = q.get("lingo")||"";   // "en" | "es" | "it" | "de" | "ja"
  var lingoVille  = q.get("ville")||"";   // ex. "verone"
  // 1. ouvrir directement l'écran Hey Baby (la fonction d'ouverture existante) ;
  // 2. pré-remplir le champ (SANS envoyer) :
  //    « Traduis-moi en <langue> : … » — la langue en toutes lettres FR :
  //    {en:"anglais", es:"espagnol", it:"italien", de:"allemand", ja:"japonais"}
  // 3. nettoyer l'URL : history.replaceState(null,"",location.pathname);
}
```

## 2 · `index.html` — mémoriser la langue apprise (une ligne)
Le module Linguae écrit déjà sa langue dans le localStorage du MÊME domaine.
Clé à lire : **`hype_lingua_langue`** (valeur `en/es/it/de/ja`).
✅ VÉRIFIÉ sur le code : cette clé est écrite par lingo.html **v19** à chaque
choix de langue (elle n'existait pas avant — elle a été ajoutée exprès pour ce
pont ; les utilisateurs d'avant v19 ne l'auront qu'après leur prochain choix,
d'où le repli : si la clé est absente, ne rien afficher de plus).

## 3 · `assistant.js` — deux champs de plus dans le contexte cavalier
Dans le bloc où le contexte du cavalier est déjà injecté au prompt système
(niveau Galop, prénom, etc.), ajouter quand présents :
```
- Langue étrangère en cours d'apprentissage : <langue en toutes lettres>
- Revient du chapitre Linguae : <ville> (si fourni par l'appel)
```
Et une consigne d'usage, une phrase :
« Si le cavalier apprend une langue, propose spontanément la traduction de
tes phrases clés dans cette langue, et corrige avec bienveillance ses essais. »
Le front passe `lingoLangue`/`lingoVille` dans le corps de l'appel relais,
comme les autres champs du contexte — mêmes clés, même endroit.

## 4 · Garde-fous
- Si les paramètres sont absents : comportement actuel inchangé, zéro régression.
- Ne PAS envoyer automatiquement un message à Hey Baby : pré-remplir seulement.
- Pas d'appel API supplémentaire : le contexte s'ajoute aux appels existants.

## 5 · Recette
Ouvrir `index.html?heybaby=1&lingo=en&ville=verone` → Hey Baby s'ouvre, champ
pré-rempli « Traduis-moi en anglais : … » ; envoyer « comment dire "il est
vendu avec ses radios" ? » → la réponse traduit EN ANGLAIS sans qu'on précise.
