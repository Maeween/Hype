# 🎒 PASSATION — LINGUAE, au soir du 18/08/2026

## ⚠️ AVANT TOUTE CHOSE

**`SUIVI-LINGUAE.md` porte tout.** Cette passation n'en est qu'une porte d'entrée. Les règles absolues sont en tête du SUIVI :

1. **Le SUIVI part avec chaque livraison de `lingo.html`** — sans exception, même pour une ligne.
2. **Un lot vérifié, un seul push** — 15 crédits Netlify par déploiement.
3. **La segmentation japonaise se fait par groupes de sens**, pas par morphèmes.
4. **Les objets d'équipement ont trois états** — `objet-` / `pose-` / `porte-`.
5. 🆕 **UN CONCEPT = UN `ref` GLOBAL.** Un mot déjà appris ailleurs reprend son `ref` ; sa définition peut changer, il n'est pas recompté. Posé par Blandine le 18/08.

**Et trois règles de conduite, nées de fautes réelles :**

· 🟥 **Ne jamais décider en silence.** Claude a donné quatre leçons à Saumur sans le dire, puis corrigé à une leçon sans dire que cela cachait trente mots. *« Tu pensais me le dire quand, si je t'avais pas posé la question ? »*
· 🟥 **N'inventer aucun contenu équestre.** Trois fautes de fond sur Windsor, une sur le coin de cross, une sur le piano. **Quand on ne sait pas : on le dit et on demande.**
· 🟥 **Sauvegarder avant tout script.** Claude a détruit `hype-lingo-lex-balade.js` avec un script d'extraction par motifs. **Éditer les lexiques à la main, vérifier avant d'écrire.**

---

## 📦 LE LOT À POUSSER — VÉRIFIÉ, PRÊT

| fichier | état |
|---|---|
| **`lingo.html`** (VER **?v=44**) | Taupō (12 points) + Wellington réparée dans `ETAPE_SRC` |
| **`hype-lingo-lex-liberte.js`** (`?l=1`) | **NEUF** — Taupō, 18 concepts, 27 répliques |
| **`hype-lingo-lex-obstacle.js`** | deux phrases retirées de Wellington (24 → 22) |
| 🔴 **`sw-linguae.js`** | **NON FAIT — à éditer à la main, voir ci-dessous** |

**Contrôles passés** : `node --check` sur les cinq blocs inline de `lingo.html` et sur les deux lexiques · six langues complètes sur tous les mots, définitions et phrases · japonais des dialogues segmenté par groupes · aucun `ref` en double · aucun caractère parasite · **35 villes, 35 entrées dans `ETAPE_SRC`**.

### 🔴 `sw-linguae.js` — TROIS MODIFICATIONS À LA MAIN

Le fichier n'était pas disponible ; il n'a **pas** été régénéré de mémoire (règle « sauvegarder avant tout script »).

1. `SOCLE_JS` ← `"hype-lingo-lex-liberte.js"`
2. `SOCLE_JS` ← `"hype-lingo-lex-andalou.js"`, `"hype-lingo-lex-formation.js"`, `"hype-lingo-lex-jeunes.js"`, `"hype-lingo-lex-parade.js"` — **ces quatre manquaient déjà**, c'est le défaut du vol qui se rejouait
3. `CACHE` : `"linguae-v2"` → `"linguae-v3"`

🟥 **RÈGLE : tout lexique ajouté à `lingo.html` doit entrer dans `SOCLE_JS` dans le même geste.** Le garde-fou a lâché deux fois.

---

## 🇳🇿 TAUPŌ — CE QUI RESTE OUVERT

Le chapitre est écrit et branché. **Quatre points attendent Blandine :**

1. 🔴 **Quatre `ref` à vérifier** — `equilibre` (**confirmé présent ailleurs**, employé en `motsAilleurs` par `dressage` et `concours`), `voix`, `confiance`, `recompenser`. Si un mot existe, reprendre son `ref` **et ses `mots`** d'origine. **Ouvrir `hype-lingo-lex-cours.js` et `hype-lingo-lex-poney.js`.**
2. **Le point culturel ne nomme personne** — précédent Santa Ynez. Une ligne à changer dans `RECITS.taupo` si Blandine veut nommer Alycia Burton et Classic Goldrush.
3. **Quatre images manquent** : `carte-taupo.webp`, `fond-taupo.webp`, `objet-taupo.webp`, `arrivee-taupo.mp4`. Le visuel du saut à cru existe, nom de dépôt non tranché.
4. **`ic:"licol"`**, quatrième emploi. Une icône de corde d'encolure mériterait son SVG.

⚠️ **`v:"Taupō"` PORTE LE MACRON** (U+014D). Le vérifier après tout copier-coller.

---

## 🔁 LES VILLES REVISITÉES AVEC BLANDINE

**35 villes ont un dialogue. Six n'ont pas encore été retravaillées avec elle :**

**Connemara · Newmarket · Lambourn · Walsall · Aberystwyth · Hickstead**

✅ **Wellington sort de cette liste** — relue par Blandine le 18/08, deux phrases retirées, et sa ligne `ETAPE_SRC` réparée.
⚠️ **Saumur est à part** : écrite AVEC elle le 16/08. Probablement déjà comme elle la veut — **lui demander avant**.

⚠️ **PIÈGE : un fichier modifié ne prouve pas qu'une ville a été retravaillée.** `cheval` a bougé pour Fontainebleau et non pour Connemara ; `materiel` pour Vejer et non pour Walsall ; `obstacle` pour Aix et non pour Wellington. **Vérifier le commentaire d'en-tête du dialogue**, qui dit toujours d'où viennent les phrases.

🟥 **LA MÉTHODE, éprouvée sur treize villes :**
1. Elle envoie **18 phrases avec leur traduction anglaise** — souvent moitié situation, moitié conseils de monte.
2. Elle envoie **le lexique** qu'elle veut voir apparaître.
3. Claude vérifie **ce qui existe déjà**, dans le fichier ET ailleurs, pour reprendre le `ref` plutôt que dupliquer.
4. Claude ajoute ce qui manque, écrit les six langues, remplace le dialogue.
5. Contrôle : syntaxe, six langues, refs croisées, découpage japonais.

⚠️ **CE QUI FAIT LA DIFFÉRENCE :** ses phrases sont **des conseils réels**, pas des questions de manuel · les **paires question → réponse vécue** valent mieux qu'une liste de définitions · le lexique doit porter **ce qu'on entend vraiment**, pas le décor.

⚠️ **NE JAMAIS faire réécrire un fichier entier ailleurs** : `dressage` porte deux villes, `concours` trois, `obstacle` deux, `materiel` deux.

---

## 🧱 LE CHANTIER QUI VIENT — UN LEXIQUE PAR VILLE

Blandine, 18/08 : *« c'est un vrai bordel, je n'arrête pas de le dire »*. **Elle a raison.** L'enchevêtrement est un reste du découpage par leçon du 5 août, et c'est la cause directe des deux défauts trouvés aujourd'hui.

✅ Ça ne casserait pas les rappels : la maîtrise est par `ref`, pas par fichier.
🟥 Mais déplacer du contenu entre fichiers est **l'opération qui a détruit `balade.js`** : ville par ville, à la main, jamais par script.
🟥 Et **écrire chaque fichier comme de la donnée pure**, sans logique — sinon la conversion JSON pour iOS refera le travail deux fois.

⚠️ **À faire dans une conversation neuve**, fichiers en main dès le premier message. Commencer par `concours` et `obstacle`.

---

## ✈️ VERS L'APP STORE — LE VRAI VERROU

🟥 **`estPremium()` lit `hype_premium` dans le `localStorage` posé par `index.html`.** Dans une app iOS autonome, `index.html` n'existe pas : **31 villes sur 35 se fermeraient pour une abonnée qui paie.**

C'est une dépendance à Hype en dur, exactement ce que la doctrine Linguae autonome interdit. **Plus urgent que le découpage.**

**Ordre recommandé :** 1 · pousser le lot · 2 · le premium autonome · 3 · le découpage par ville.

---

## 🔴 CE QUI RESTE — QUATRE POINTS ANCIENS

### 1 · LA VILLE DE L'ENTRETIEN — quatre leçons orphelines l'attendent

Écrites, traduites en six langues, et **personne ne les voit** :
· `ecurie` **2** — le curage · `ecurie` **3** — nourrir · `ecurie` **4** — les gestes · `materiel` **2** — le filet et la bride

Blandine, 18/08 : *« on mettra l'entretien des chevaux dans une ville avec les box et la nourriture, le foin etc »*. Les trois leçons d'`ecurie` forment un tout d'environ **30 mots**.

### 2 · GOLEGÃ, SEULE EN MORPHÈMES

🟥 **NE PAS LA RECOUPER À L'AVEUGLE.** Une mauvaise coupe apprendrait une segmentation fausse — pire que l'incohérence actuelle. **Seulement avec une relecture native.**

### 3 · LES POINTS D'OBJETS, JAMAIS TRANCHÉS

· 🔴 **Dubaï** annonce « une selle d'endurance », l'image est une **selle de randonnée**. Vraie incohérence.
· **Deux fanions** (La Baule, Hickstead) · **deux coupes** (Rome, Badminton) · 🆕 **quatre `ic:"licol"`** (Connemara, Tamworth, Santa Ynez, **Taupō**).
· **Lexington « un numéro de lot »** — faible pour un haras.
· **Le lasso**, sans ville libre.
· **Le hackamore de Santa Ynez** : c'est en réalité une **bosal**. Proposition : « un bosal de crin ». ⚠️ **L'image n'a jamais été regardée.**

### 4 · LES RELECTURES NATIVES

`DOUTES-golega-elevage.md` et `DOUTES-lexington-haras.md` attendent. Et tous les fichiers récents portent des entrées `// ??` — surtout l'espagnol et l'italien du vocabulaire technique. 🆕 **`liberte` en ajoute** : le vocabulaire du travail en liberté n'a pas d'équivalent officiel partout.

---

## 🧭 LES PIÈGES TECHNIQUES À CONNAÎTRE

### Un fichier peut porter plusieurs dialogues

🟥 **TROIS ENDROITS DOIVENT RESTER D'ACCORD** : `aUnDialogue()` et le filet de `ouvrirSituation()` dans `lingo.html`, `lireLexiques()` dans `lingo-dialogue.html`. Si l'un revient à la seule clé `dialogue`, **le bouton s'affiche et l'écran est vide**.
✅ Les trois lisent déjà toute clé commençant par `dialogue` — `liberte` n'a rien demandé de plus.

### Deux tables décrivent chaque ville

· **`ETAPE_SRC`** dit OÙ LES MOTS SONT PRIS · **`ACCUEIL_VILLE`** dit CE QU'ON ANNONCE.
⚠️ **Changer l'une sans l'autre passe inaperçu.** Et 🆕 **une ville absente d'`ETAPE_SRC` ne sert aucun mot, sans la moindre erreur visible** — c'est ce qui est arrivé à Wellington pendant des semaines.

### Une nation neuve se déclare à DEUX endroits

🆕 `I18N_NAT` **et** `TH_PAVILLON`. Sans la première, la ligne des nations ment ; sans la seconde, le pavillon reste vide.

### Une table de poses sans son fichier retombe en silence

`POSE_PROPRE` ou `POSE_34` sans image → repli sur `objet-<ville>.webp`, **aucune erreur visible**. Ne déclarer une ville qu'avec son image en main.

---

## 💡 ET UNE IDÉE QUI ATTEND

**La pause à mi-parcours d'un long cours** — Kildare a 39 mots, Vejer 29, 🆕 Wellington 24 sur trois leçons. Proposer une pause, sauvegarder la progression à mi-chemin, montrer une image ou une courte vidéo.
⚠️ **Non commencé.** Touche à la progression Supabase : lire le moteur de bout en bout avant d'y toucher.
