# ✅ `lingo-dialogue.html` — TOUT EST APPLIQUÉ
### 17/08/2026. Ce document ne contient plus de geste à faire. Il garde la trace des décisions et d'une erreur.

---

## 🔴 L'ERREUR DE CE DOCUMENT, CORRIGÉE

Sa première version affirmait que `lingo-dialogue.html` était **périmé** et qu'il ne fallait pas écrire dedans. **C'était faux**, et Blandine a poussé un fichier pour rien sur cette base.

Le raisonnement était : `ouvrirSituation()` passe `&c=` à l'iframe, la page fille ne lit pas ce paramètre, donc la page doit exister ailleurs en version plus récente. **La vérité est l'inverse** — c'est `lingo.html` qui avait avancé, et la page fille qui n'avait jamais suivi. Le fichier récupéré sur GitHub était **identique** à celui fourni (`4882bbee…`).

✅ **RÈGLE : une divergence entre deux fichiers prouve qu'ils ne s'accordent pas, PAS que l'un est périmé.** Demander lequel est le bon, ne pas le déduire.

Aucun dégât : les dialogues vivent dans les lexiques, pas dans cette page.

---

## ✅ LES CINQ GESTES APPLIQUÉS

**1 · Les six langues, et la cible vient du parent.** `LANGUES` à six · `CIBLE` lue dans `c` · `verifierLangues()` nomme une langue manquante au lieu d'afficher « undefined » · libellés construits depuis `NOM_LANGUE`. **C'était le vrai défaut** : toute mise en situation enseignait l'anglais, quelle que soit la langue du voyage. ⚠️ **NE PAS redéduire une cible dans l'iframe. Le voyage décide.**

**2 · La balise** `hype-lingo-lex-elevage.js?l=4`. ⚠️ Son `?l=` est **indépendant** de celui de `lingo.html` (`?l=2`) : chacun casse le cache de sa page. **Ne pas les « harmoniser ».**

**3 · Les cinq titres de scènes de Golegã** dans `TITRES`.

**4 · Le filet de Versailles**, dans `lingo.html` : il balaie toutes les clés commençant par `dialogue`. ⚠️ **TROIS ENDROITS DOIVENT RESTER D'ACCORD** : `aUnDialogue()`, ce filet, et `lireLexiques()` de la page fille.

**5 · Le verrou des villes payantes**, côté page fille : `VILLE_OFFERTE_D` + `autorisee()`, testé **en tout premier dans `dessine()`** — aucune scène construite, aucune phrase lue, aucune voix prononcée avant. ⚠️ **`VILLE_OFFERTE_D` doit rester d'accord avec `VILLE_OFFERTE` de `lingo.html`** : deux listes, un seul régime. ⚠️ Ce n'est pas une sécurité, c'est une porte — les phrases sont dans un `.js` public.

---

## 📌 CE QUI RESTE, SANS URGENCE

**`TITRES` ne connaît que trois villes sur les dix qui ont un dialogue.** Connemara, Newmarket, Lambourn, Walsall, Aberystwyth, Windsor, Wellington, Hickstead, Versailles, Saumur affichent « Scène 1 » et leur `ref` en minuscules. **Pas une régression** — jamais complétée depuis le 15/08. Il faut leurs lexiques pour nommer leurs scènes.

**Le japonais donne jusqu'à 19 jetons** dans « remets la phrase en ordre ». Sur un téléphone, c'est probablement trop : l'exercice change de nature. À trancher — plafonner, ou regrouper plus large.
