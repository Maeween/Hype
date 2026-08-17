# 🛠️ `lingo-dialogue.html` — LES TROIS GESTES POUR GOLEGÃ
### Préparés le 17/08/2026. **Le fichier n'a PAS été modifié.**

---

## ⛔ POURQUOI RIEN N'A ÉTÉ ÉCRIT DANS CE FICHIER

**La version fournie le 17/08 est périmée.** Preuve formelle, pas une impression :

| ce qui est dans le fichier fourni | ce que dit `lingo.html` en cours |
|---|---|
| ne lit **pas** le paramètre `c` de l'URL, redéduit sa cible seule | `ouvrirSituation()` passe `&c=` (la langue du voyage) et son commentaire interdit à la fille de redéduire : *« Une seule regle, celle d'ici »* |
| deux balises de lexique (`arrivee`, `balade`) | neuf villes ont un dialogue depuis le 15/08 |
| `TITRES` connaît deux villes | idem |
| `LANGUES_PHRASES = ["fr","en"]` | La Baule et Le Morne sont passées à **six langues** le 15/08 |

Écrire là-dedans effacerait les neuf dialogues et le passage aux six langues. **C'est exactement la collision du 14/08** — une livraison repartie d'une version antérieure, une correction perdue, des heures à chercher ailleurs.

✅ **Demander à Blandine le fichier EN COURS avant d'appliquer quoi que ce soit ci-dessous.** Et vérifier au préalable que la version reçue lit bien `P.get("c")` : si elle ne le lit pas, elle est encore périmée.

---

## GESTE 1 · LA BALISE DU LEXIQUE

Après les balises existantes, vers la ligne 181 :

```html
<!-- L'elevage : GOLEGA. 18 phrases, 5 temps, ajoutees le 17/08.
     ⚠️ Ville PAYANTE — la premiere a recevoir un dialogue. Voir le geste 3. -->
<script src="hype-lingo-lex-elevage.js?l=4"></script>
```

⚠️ **Le `?l=` de CE fichier est indépendant de celui de `lingo.html`.** Les autres balises de la page fille portent `?l=4` ; garder la même valeur qu'elles, ou l'aligner sur ce que porte la version en cours. Dans `lingo.html`, c'est `?l=2` — **les deux numéros n'ont aucun rapport et ne doivent pas être « harmonisés »**, chacun casse le cache de sa propre page.

**Sans ce geste, la scène tourne quand même** : le filet postMessage de `ouvrirSituation()` envoie le chapitre à la page fille quand ses balises échouent. Mais le régime normal devient alors un secours, et le filet **n'existera pas dans l'app native**. Le poser.

---

## GESTE 2 · LES CINQ TITRES DE SCÈNES

Dans la table `TITRES` (vers la ligne 232) :

```js
  golega: {nom:"Golegã",
    t:{1:"Parmi les poulinières", 2:"Les poulains de l'année",
       3:"L'examen d'un jeune cheval", 4:"La présentation en main",
       5:"Le choix des lignées"}},
```

Sans ce geste, l'en-tête affiche « Scène 1 » à « Scène 5 » et le nom de ville s'affiche `golega`, en minuscules et sans son tilde.

⚠️ Ces cinq titres sont **recopiés dans le champ `titres` de la clé `dialogue`** de `hype-lingo-lex-elevage.js`. Ce champ est **INERTE** — le moteur ne le lit pas, il n'est là que pour n'avoir pas à réinventer les intitulés. **Ne pas croire qu'il suffit.**

---

## GESTE 3 · LE VERROU DE LA PAGE FILLE

**Le parent est déjà verrouillé** depuis le 17/08 : `ouvrirSituation()` appelle `villeAutorisee()` et ouvre le paywall. Mais `lingo-dialogue.html` s'ouvre aussi **par son URL directe** — `?ville=golega` — et n'a aucun verrou. Golegã étant la première ville payante à avoir un dialogue, la scène entière est atteignable gratuitement par l'adresse.

À poser juste après la lecture des paramètres, avant `lireLexiques()` :

```js
/* 🟥 LE VERROU DES VILLES PAYANTES, cote page fille. Le parent verrouille
   deja `ouvrirSituation()`, mais cette page s'ouvre AUSSI par son URL.
   ⚠️ La liste et la cle localStorage doivent rester d'accord avec
   `VILLE_OFFERTE` et `estPremium()` de lingo.html — si une ville devient
   offerte la-bas, l'ajouter ICI aussi, sinon elle se ferme dans l'iframe
   alors qu'elle est ouverte partout ailleurs. */
var VILLE_OFFERTE_D = { labaule:1, kildare:1, maurice:1, edimbourg:1 };
function autorisee(ref){
  if(VILLE_OFFERTE_D[ref]) return true;
  try{ return localStorage.getItem("hype_premium") === "1"; }catch(e){ return false; }
}
```

Puis, dans `dessine()`, avant le test `if(!DIAL || !SCENES.length)` :

```js
  if(!autorisee(REF_VILLE)){
    S("hScene").textContent = "Réservé aux abonnées";
    S("hVille").textContent = (TITRES[REF_VILLE] && TITRES[REF_VILLE].nom) || REF_VILLE;
    corps.appendChild(el("p",{class:"vide"},
      "Les mises en situation de cette ville font partie de l'abonnement."));
    pied.appendChild(rang([el("button",{class:"go", id:"btVerrouFermer"}, "Revenir à la ville")]));
    S("btVerrouFermer").addEventListener("click", fermer);
    return;
  }
```

⚠️ **`localStorage` est lisible ici** — la page fille est servie depuis la même origine que `lingo.html`. Si un jour elle passe sur une autre origine, ce verrou devient aveugle et il faudra que le parent passe l'état dans l'URL ou par message.

⚠️ **Ce verrou n'est pas une sécurité**, c'est une porte. Les phrases sont dans un fichier `.js` public : quiconque lit le source les a. Comme pour tout le reste de l'app — et c'est assumé depuis la doctrine VITRINE.

---

## GESTE 4 (BONUS, PAS GOLEGÃ) · LE FILET DE VERSAILLES

**Défaut latent trouvé le 17/08, non corrigé faute de feu vert.** Le 16/08, la lecture des clés `dialogue*` a été étendue des deux côtés — `aUnDialogue()` et `lireLexiques()`. **Il existe un troisième endroit** : le filet de `ouvrirSituation()`, dans `lingo.html`, ne lit que `L[k].dialogue` et ignore `dialogueVersailles`.

Conséquence : si les balises de la page fille échouent, **Versailles reçoit un filet vide** et ouvre un écran mort. Golegã n'est pas concernée (clé `dialogue`).

Le correctif, dans `lingo.html`, dans la boucle du filet :

```js
      for(var k in L){
        var trouve = null;
        for(var c in (L[k]||{})){
          if(c.indexOf("dialogue") !== 0) continue;
          var d = L[k][c];
          if(d && d.ville === refVille){ trouve = d; break; }
        }
        if(trouve){ mince[k] = L[k]; break; }
      }
```

⚠️ **Trois endroits doivent désormais rester d'accord** : `aUnDialogue()`, le filet de `ouvrirSituation()` (tous deux dans `lingo.html`) et `lireLexiques()` (page fille). Si l'un revient à la seule clé `dialogue`, le bouton s'affiche et l'écran est vide.
