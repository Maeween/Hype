# 🛠️ `lingo-dialogue.html` — CE QUI EST FAIT, ET LE GESTE QUI RESTE
### Réécrit le 17/08/2026, après application. **Remplace la version précédente de ce fichier, qui contenait une erreur d'analyse.**

---

## 🔴 D'ABORD, L'ERREUR CORRIGÉE

La version précédente de ce document affirmait que `lingo-dialogue.html` était **périmé** et qu'il ne fallait pas écrire dedans. **C'était faux.**

Le raisonnement était : `ouvrirSituation()` passe `&c=` à l'iframe, la page fille ne lit pas ce paramètre, donc la page doit exister ailleurs en version plus récente. **La vérité est l'inverse** — c'est `lingo.html` qui avait avancé, et la page fille qui n'avait jamais suivi. Le fichier récupéré sur GitHub était **identique** à celui déjà fourni (`4882bbee17119135aa9fa37260d50679`).

✅ **RÈGLE : une divergence entre deux fichiers prouve qu'ils ne s'accordent pas, PAS que l'un est périmé.**

Aucun dégât : les dialogues vivent dans les lexiques, pas dans cette page.

---

## ✅ FAIT LE 17/08

**1 · Les six langues, et la cible vient du parent.** `LANGUES` à six, `CIBLE` lue dans le paramètre `c`, `verifierLangues()` pour nommer une langue manquante au lieu d'afficher « undefined », libellés construits depuis `NOM_LANGUE`. **C'était le vrai défaut** : toute mise en situation enseignait l'anglais, quelle que soit la langue du voyage.

**2 · La balise** `<script src="hype-lingo-lex-elevage.js?l=4"></script>`.

**3 · Les cinq titres de scènes de Golegã** dans `TITRES`.

**4 · Le filet de Versailles**, dans `lingo.html` : il balaie désormais toutes les clés commençant par `dialogue`.

---

## 📌 LE SEUL GESTE QUI RESTE · LE VERROU DE LA PAGE FILLE

**Le parent est verrouillé** depuis le 17/08 : `ouvrirSituation()` appelle `villeAutorisee()` et ouvre le paywall. Mais cette page s'ouvre **aussi par son URL directe** — `lingo-dialogue.html?ville=golega` — et n'a aucun verrou. Golegã étant la première ville payante à avoir un dialogue, la scène entière est atteignable par l'adresse.

**Non appliqué : ce geste ne figurait pas dans les quatre autorisés.**

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

⚠️ **`localStorage` est lisible ici** — même origine que `lingo.html`. Si un jour la page passe sur une autre origine, ce verrou devient aveugle et le parent devra passer l'état dans l'URL ou par message.

⚠️ **Ce n'est pas une sécurité, c'est une porte.** Les phrases sont dans un `.js` public : qui lit le source les a. Régime assumé depuis la doctrine VITRINE.

---

## 📌 ET DEUX CHOSES À NE PAS OUBLIER

**`TITRES` ne connaît que TROIS villes sur les DIX qui ont un dialogue.** Connemara, Newmarket, Lambourn, Walsall, Aberystwyth, Windsor, Wellington, Hickstead, Versailles, Saumur affichent « Scène 1 » et leur `ref` en minuscules. **Ce n'est pas une régression** — la table n'a jamais été complétée depuis le 15/08. Il faut leurs lexiques pour nommer leurs scènes.

**Le japonais donne jusqu'à 19 jetons** dans « remets la phrase en ordre ». Sur un téléphone, c'est probablement trop. À trancher : plafonner, ou regrouper plus large.
