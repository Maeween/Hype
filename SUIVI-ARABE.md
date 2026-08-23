# SUIVI — LANGUE ARABE
### Linguae · état du chantier `ar`

---

## OÙ ON EN EST

**2 villes sur 38.** Toutes deux dormantes : aucun écran ne lit le champ `ar`, le sélecteur reste à six langues.

| ville | lexique | textes d'accueil | relectures |
|---|---|---|---|
| **Clonbinane** — L'apprentissage | 16 mots · 16 défs · 25 répliques | récit · résumé · chapeau | **3 passes croisées** |
| **Spruce Meadows** — Le froid | 22 mots · 22 défs · 22 répliques · 6 phrases | récit · résumé · chapeau | **2 passes croisées** |

🟥 **Aucune des deux n'a été validée par un arabophone.** Les relectures viennent d'une seconde source automatique. Le contrôle humain reste entier.

---

## LA MÉTHODE, POUR NE PAS LA REPERDRE

**1 · Le champ est dormant.** On ajoute `ar` partout, personne ne le lit. C'est un dépôt, pas une septième langue. Raison : activer l'arabe demande de retourner toute la mise en page en droite-à-gauche et de rattraper les 37 autres villes — une cavalière arabophone qui le choisirait aujourd'hui verrait un monde troué.

**2 · Où l'arabe doit aller, pour chaque ville — SIX endroits :**

| # | où | quoi |
|---|---|---|
| 1 | lexique `.js` | `mots.ar.m` sur chaque concept |
| 2 | lexique `.js` | `def.ar` sur chaque concept |
| 3 | lexique `.js` | `ar:` sur chaque réplique du dialogue |
| 4 | lexique `.js` | `ar:` sur chaque phrase isolée, s'il y en a |
| 5 | 🟥 lexique `.js` | **`dialogue.langues` doit contenir `"ar"`** |
| 6 | `lingo.html` | récit d'arrivée, résumé de ville, chapeau de chapitre |

🟥 **Le point 5 a été oublié deux fois.** Le champ `langues` déclarait six langues alors que les traductions arabes y étaient. Ça ne se voit qu'au moment de l'activation — donc dans des mois, sans comprendre pourquoi le dialogue reste vide. **À vérifier systématiquement.**

**3 · Règles d'écriture arabe :**
- Arabe standard moderne
- 🟥 **Aucun signe vocalique.** Choix d'homogénéité. Ne pas en réintroduire au coup par coup, même si une correction en apporte
- Formulation **simple et descriptive** quand le terme technique n'est pas sûr — mieux vaut décrire juste que nommer faux
- Registre : le club s'adresse à une **cavalière**, formes au féminin

**4 · Le circuit de relecture qui marche :**
1. Je traduis et je livre le lexique
2. Je produis une **fiche numérotée** (A / B / C) avec le français au-dessus de chaque ligne arabe
3. Blandine la fait relire par une autre source
4. La relecture revient par numéros, avec texte de remplacement et motif
5. J'applique, je régénère la fiche, on recommence si besoin

Ce circuit a attrapé de **vraies fautes de sens** — voir plus bas.

---

## CE QUE LES RELECTURES ONT ATTRAPÉ

**Des fautes que je n'aurais jamais vues seul :**

| ville | le mot écrit | ce qu'il voulait vraiment dire |
|---|---|---|
| Spruce | `الميزان` | une **balance**, pas un thermomètre |
| Spruce | `تبن` | la **paille**, pas le foin (`دريس`) |
| Spruce | `أمطرت ثلجا` | « il a **plu de la neige** » |
| Spruce | `غير محمى` | « non **protégé** », pas « pas échauffé » |
| Clonbinane | la réplique sur la punition | **ne disait pas ce qu'elle devait dire** |
| Clonbinane | `رفعه` (relâchement) | pouvait se lire « **augmenter** la pression » |
| Clonbinane | `يراقب`, `يتقدم` | des **verbes conjugués** là où le lexique présente des notions |

**Et des mots systématiquement mauvais :**
- `الوبر` (poil animal générique) → `الشعر`
- `المضمار` (évoque un hippodrome) → `ميدان الركوب الداخلي`
- `المرج` → `المرعى` · `المشرب` → `حوض الشرب`
- `جواب` → `استجابة` (le mot de l'apprentissage)
- `الالتباس` (ambiguïté de sens) → `الارتباك` (ce que ressent le cheval)
- `المرعى` pour un paddock → `الحظيرة الخارجية`

---

## VERDICT SUR LE VOCABULAIRE TECHNIQUE

Question posée à la relecture : pour le matériel d'hiver rare dans les pays arabophones, faut-il un mot unique ou une description ?

✅ **Réponse : garder les formulations descriptives.** Elles sont plus compréhensibles qu'un terme unique rare ou régional. Ne pas chercher à les raccourcir.

Validés à ce titre : le manège chauffé, le poil d'hiver, le tracé de tonte, la chemise séchante, le couvre-reins, le crampon à glace, la plaque anti-neige, l'abreuvoir chauffant, l'hivernage.

---

## CE QU'IL FAUDRA POUR ACTIVER

Rien de tout cela n'est fait, et ce n'est pas pour tout de suite :

- **Les 36 villes restantes** — le gros du travail
- **L'interface entière** : boutons, titres, menus, écrans de compte
- 🟥 **Le retournement droite-à-gauche** de chaque écran : le lexique et son couple de drapeaux, le rail alphabétique, les flèches, la collection, la sellerie. Ce n'est pas un réglage, c'est une revue complète
- **Le mélange des sens** : une cavalière arabophone qui apprend l'anglais mélangerait droite-à-gauche et gauche-à-droite sur une même ligne. C'est le point le plus délicat
- **Une validation native** de tout ce qui aura été écrit
- Ajouter `ar` au sélecteur de langue — la dernière ligne, celle qui ouvre la porte

---

## LES 38 VILLES

| # | ville | pays | chapitre | fichier lexique | arabe |
|---|---|---|---|---|---|
| 1 | La Baule | France | L'arrivée | `arrivee` | — |
| 2 | Le Morne | Maurice | La balade | `balade` | — |
| 3 | Connemara | Irlande | Le cheval | `connemara` | — |
| 4 | Newmarket | Angleterre | L'écurie | `ecurie` | — |
| 5 | Lambourn | Angleterre | Le pansage | `pansage` | — |
| 6 | Walsall | Angleterre | Le matériel | `walsall` | — |
| 7 | Aberystwyth | Pays de Galles | En selle | `cours` | — |
| 8 | Windsor | Angleterre | Le dressage | `windsor` | — |
| 9 | Wellington | États-Unis | La tournée d'hiver | `wellington` | — |
| 10 | Hickstead | Angleterre | Le derby | `derby` | — |
| 11 | Burghley | Angleterre | Le cross | `cross` | — |
| 12 | Badminton | Angleterre | Le concours | `badminton` | — |
| 13 | Kildare | Irlande | Les urgences | `urgences-vet` | — |
| 14 | Édimbourg | Écosse | Les dialogues | `urgences-med` | — |
| 15 | Versailles | France | L\'art équestre | `versailles` | — |
| 16 | Saumur | France | Le Cadre Noir | `enseignant` | — |
| 17 | Lamotte-Beuvron | France | Le poney | `poney` | — |
| 18 | Golegã | Portugal | L'élevage | `elevage` | — |
| 19 | Fontainebleau | France | Les jeunes chevaux | `jeunes` | — |
| 20 | Jerez | Espagne | Le cheval | `andalou` | — |
| 21 | Séville | Espagne | La présentation | `parade` | — |
| 22 | Vejer | Espagne | L'intendance | `vejer` | — |
| 23 | Barcelone | Espagne | Voyager avec son cheval | `barcelone` | — |
| 24 | Oliva Nova | Espagne | S'engager | `oliva` | — |
| 25 | Rome | Italie | La Coupe des Nations | `rome` | — |
| 26 | Vérone | Italie | Le commerce | `vente` | — |
| 27 | Warendorf | Allemagne | La formation | `formation` | — |
| 28 | Aix-la-Chapelle | Allemagne | Le grand concours | `aachen` | — |
| 29 | Dubaï | Émirats | L'endurance | `endurance` | — |
| 30 | Tokyo | Japon | La tradition | `tradition` | — |
| 31 | Tamworth | Australie | Le western | `western` | — |
| 32 | Taupō | Nouvelle-Zélande | Free riding | `liberte` | — |
| 33 | Buenos Aires | Argentine | Le polo | `polo` | — |
| 34 | Lexington | États-Unis | Le haras | `haras` | — |
| 35 | Santa Ynez | États-Unis | Le horsemanship | `horsemanship` | — |
| 36 | Spruce Meadows | Canada | Le froid | `froid` | ✅ |
| 37 | Flyinge | Suède | La maréchalerie | `flyinge` | — |
| 38 | Clonbinane | Australie | L'apprentissage | `apprentissage` | ✅ |

---

*Suivi ouvert le 22/08/2026. À tenir à jour à chaque ville traduite.*
