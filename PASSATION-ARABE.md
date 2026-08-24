# PASSATION — TRADUCTION ARABE DE LINGUAE
### À lire entièrement avant de traduire quoi que ce soit
*24/08/2026 · 10 villes sur 38 · 777 entrées*

---

## 1 · LE PRINCIPE

L'arabe est **dormant**. On écrit le champ `ar` partout, **aucun écran ne le lit**, le sélecteur reste à six langues. C'est un dépôt, pas une septième langue active.

**Pourquoi :** activer l'arabe demanderait de retourner toute la mise en page en droite-à-gauche et d'avoir les 38 villes. Une cavalière arabophone qui le choisirait aujourd'hui verrait un monde troué.

---

## 2 · 🟥 LES NEUF POINTS D'UNE VILLE COMPLÈTE

Une ville vit dans **TROIS fichiers**, et rien ne le signale. Vérifier les neuf avant de dire qu'une ville est faite.

| # | fichier | quoi |
|---|---|---|
| 1 | `hype-lingo-lex-<theme>.js` | `mots.ar.m` sur chaque concept (+ `var` s'il existe) |
| 2 | idem | `def.ar` sur chaque concept |
| 3 | idem | `ar:` sur chaque réplique du dialogue |
| 4 | idem | `ar:` sur chaque phrase isolée |
| 5 | 🟥 idem | **`dialogue.langues` doit contenir `"ar"`** |
| 6 | `lingo.html` | récit d'arrivée (3), résumé, chapeau |
| 7 | 🟥 `hype-lingo-villes.js` (10 villes UK) ou `-monde.js` (28) | **lettre manuscrite + 3 volets, titre ET texte** |
| 8 | 🟥 `lingo.html` · `COLL_NOM` | **chaque valeur de `coll` du lexique** |
| 9 | 🟥 `lingo.html` · `ETAPES_I18N` | nom du chapitre, nom de la ville, souvenir |

**Les points 5, 7, 8 et 9 ont chacun été oubliés au moins une fois.** Les points 8 et 9 cassent **les six langues**, pas seulement l'arabe : une famille de mots non déclarée dans `COLL_NOM` s'affiche en français partout.

---

## 3 · RÈGLES D'ÉCRITURE — NON NÉGOCIABLES

- **Arabe standard moderne.**
- 🟥 **Aucun signe vocalique.** Aucune exception. Si une relecture en apporte, les retirer avant d'intégrer.
- 🟥 **Genre :** les **consignes au FÉMININ singulier** (le club s'adresse à une cavalière : `انزعي`, `اربطي`, `لا تتحركي`). La **LETTRE au masculin** — le narrateur est le même dans les 38 villes. *Exception : les consignes qui s'adressent réellement au groupe restent au pluriel.*
- **Formulation descriptive** quand le terme technique n'est pas sûr. Verdict constant des relectures : décrire juste vaut mieux que nommer faux, surtout pour le matériel rare.
- **Chapitres de secours** (Kildare, Édimbourg) : consignes **courtes**, sans tournure élégante, avec l'exception du danger immédiat.
- **Ne pas transposer les faux amis anglais.** Les définitions expliquent souvent *hack/trail ride*, *the vet*, *loose horse* — ce sont des pièges de l'anglais. Garder le SENS en arabe, ne pas inventer un piège arabe.

---

## 4 · GLOSSAIRE — LES TERMES FIXÉS EN RELECTURE

**À employer partout. Ne pas réinventer.**

### 🟥 CHAPITRES À DOUBLE FORME

Certains chapitres portent **deux entrées par mot** : le terme et l'ordre crié (`dit`). Aberystwyth est le premier.

- le **terme** est un **nom neutre** : `خفض الكعبين`
- l'**ordre** est un **impératif pluriel** : `اخفضوا الكعبين!` — le moniteur s'adresse à toute la reprise
- les **définitions** restent au **féminin singulier**
- le **dialogue** aussi, quand le club parle à une seule cavalière

⚠️ Vérifier la présence du champ `dit` avant de traduire : il ne se voit pas dans la liste des concepts.

### Allures et travail
| français | arabe |
|---|---|
| le pas | مشية الخطو |
| le trot | الخبب |
| le trot enlevé | الخبب مع النهوض والجلوس |
| le galop (contrôlé) | العدو الخفيف |
| le galop de course | العدو السريع |
| le saut d'obstacles | قفز الحواجز |
| le seuil de réaction | عتبة الاستجابة |

### Équipement
| français | arabe |
|---|---|
| 🟥 les rênes | الأعنة · العنان |
| 🟥 le filet, la bride | اللجام |
| le licol | الرسن من دون شكيمة |
| la longe | حبل القيادة |
| la bombe | الخوذة |
| la rampe du van | منحدر المقطورة |

### Lieux
| français | arabe |
|---|---|
| le box | البوكس (حجرة الحصان) |
| la sellerie | غرفة السروج واللوازم |
| le manège · la carrière | الميدان المغطى · الميدان المكشوف |
| le paddock | البادوك (حوش خارجي مسيج) |
| le pré | المرعى |
| le rond de longe | حلبة التدريب الدائرية |
| l'abreuvoir | حوض الشرب |
| le lagon | البحيرة الشاطئية |
| le bush australien | البرية الأسترالية |

### Le cheval
| français | arabe |
|---|---|
| la robe | لون الحصان |
| bai · alezan · noir · gris · pie | الكميت · الأشقر · الأدهم · الأشهب · الأبلق |
| 🟥 le poney | البوني (الحصان القزم) |
| 🟥 le poulain | المهر |
| la jument · l'étalon · le hongre | الفرس · الفحل · الحصان المخصي |
| le garrot · le jarret · la croupe | الغارب · العرقوب · الكفل |
| 🟥 le pur-sang anglais | خيول الثوروبريد |
| le warmblood | حصان من سلالات الدم الدافئ |
| 🟥 le maréchal-ferrant | بيطار الخيل |

### Soins et urgences
| français | arabe |
|---|---|
| le vétérinaire | الطبيب البيطري |
| les secours | خدمات الطوارئ |
| l'ambulance | سيارة الإسعاف |
| à l'aide ! | النجدة! |
| cheval échappé | حصان طليق |
| la colique | المغص |
| la fourbure | التهاب صفائح الحافر |
| le coup de sang | انحلال العضلات الناتج عن الجهد |
| le bouchon œsophagien | انسداد المريء |
| la commotion cérébrale | ارتجاج الدماغ |
| la nuque | مؤخرة الرقبة |
| ne pas bouger | لا تتحركي |

### Nourriture et litière
| français | arabe |
|---|---|
| le foin · la paille | الدريس · القش |
| la litière | الفرشة |
| le fumier brut | مخلفات الإسطبل |
| les granulés | العلف المحبب |

---

## 5 · 🟥 LES PIÈGES DÉJÀ PAYÉS

**Fautes de sens attrapées en relecture — ne pas les refaire :**

| écrit | voulait dire |
|---|---|
| `الميزان` | une **balance**, pas un thermomètre |
| `تبن` | la **paille** ; le foin est `دريس` |
| `أمطرت ثلجا` | « il a **plu de la neige** » |
| `غير محمى` | « non **protégé** », pas « pas échauffé » |
| `الماء لا يتصرف` | « l'eau ne **se comporte** pas » |
| `الأدغال` | une **jungle**, pas le bush australien |
| `المهر` pour poney | **poulain** — un poney n'est pas un poulain nain |
| `اللجام` pour rênes | le **filet** — les rênes sont `الأعنة` |
| `سهمان` pour « .2 » en hands | **deux flèches** — ce sont deux pouces |
| `الخيول الأصيلة` pour Thoroughbred | les pur-sang **arabes** |
| `يراقب`, `يتقدم`, `يسقط` | **verbes conjugués** là où le lexique présente des notions |

**Substitutions systématiques :** `الوبر` → `الشعر` · `المضمار` → `ميدان الركوب` · `المرج` → `المرعى` · `المشرب` → `حوض الشرب` · `جواب` → `استجابة` · `الالتباس` → `الارتباك` · `الركض` → `العدو الخفيف`

⚠️ **Piège récurrent :** plusieurs textes disent « les six langues ». Avec l'arabe ce sera faux — écrire « toutes les langues disponibles ».

---

## 6 · 🟥 CE QUE LES RELECTURES ONT TROUVÉ DANS LE FRANÇAIS

**Six corrections du texte source, dans les six langues.** Quatre sont des règles vétérinaires dépassées qui circulent encore dans le milieu. **Signaler immédiatement tout cas semblable :**

| ville | l'affirmation | le problème |
|---|---|---|
| Kildare | « un cheval qui se roule peut se retourner l'intestin » | **mythe** |
| Kildare | « jamais brutalement sur la croupe, le choc thermique » | **faux** — refroidir vite prime |
| Kildare | « une plaie ne se recoud que dans les 6-8 h » | trop absolu |
| Kildare | instructions de garrot simplifiées | **danger** pour un non-formé |
| Connemara | « Boulet chaud : appelle le maréchal » | 🟥 c'est le **vétérinaire** |
| Newmarket | « sur un cheval chaud, jamais les reins » | règle **dépassée** |
| Édimbourg | « le 112 fonctionne même sans carte SIM » | **faux** au Royaume-Uni |
| Édimbourg | « la personne à chercher avant même d'appeler » | pouvait **retarder un appel vital** |

---

## 7 · LE CIRCUIT DE RELECTURE

1. Traduire, livrer les fichiers
2. Produire **UNE fiche par ville** — `ARABE-<ville>.md`, sections **A** écran d'arrivée · **B** lettre · **C** volets · **D** mots · **E** dialogue · **F** phrases. Numérotation continue, français au-dessus de chaque ligne arabe
3. Blandine la fait relire ailleurs
4. La relecture revient par numéros
5. Appliquer, régénérer la fiche

🟥 **UNE SEULE FICHE PAR VILLE.** Il y en a eu six pour trois villes avant regroupement : ingérable.

---

## 8 · MÉTHODE DE TRAVAIL SUR LES FICHIERS

- **Vérifier TOUTES les ancres AVANT d'écrire quoi que ce soit.** Si une seule manque, ne rien écrire. C'est ce qui a évité plusieurs fichiers à moitié patchés.
- **Lire les ancres dans le fichier**, jamais les recopier de mémoire. Plusieurs échecs viennent de là.
- **Travailler par zone** quand un texte est ambigu : découper la portion de la ville, patcher dedans, recoller. Les titres de volets (« Si tu y allais », « Le savais-tu ? ») sont identiques dans 27 villes.
- **Ne dénuder QUE les champs `ar`.** Un `nu()` appliqué à tout un bloc efface les accents français, espagnols et allemands. C'est arrivé une fois.
- **Contrôles de fin, à chaque livraison :**
  - `node --check` sur chaque `.js`, et sur chaque bloc `<script>` de `lingo.html`
  - vocalisation = 0, **y compris dans les tableaux `ar:[…]`** (le contrôle sur `ar:"…"` seul les rate)
  - caractères cyrilliques = 0 *(deux incidents)*
  - six langues d'origine intactes
  - 38 villes dans `ETAPES`

---

## 9 · ÉTAT AU 24/08

| ville | entrées | relectures |
|---|---|---|
| **Aberystwyth** — En selle | 125 | 1 passe |
| **La Baule** — L'arrivée | 92 | 2 passes |
| **Kildare** — Les urgences du cheval | 86 | 3 passes |
| **Connemara** — Le cheval | 82 | 2 passes |
| **Édimbourg** — Les urgences du cavalier | 80 | 2 passes |
| **Newmarket** — L'écurie | 74 | 2 passes |
| **Lambourn** — Le pansage | 70 | 1 passe |
| **Spruce Meadows** — Le froid | 60 | 3 passes |
| **Le Morne** — La balade | 57 | 2 passes |
| **Clonbinane** — L'apprentissage | 51 | 3 passes |

**777 entrées.** 🟥 **Aucune validée par un arabophone.** Toutes les relectures viennent de secondes sources automatiques.

---

## 10 · 🟠 EN COURS ET EN ATTENTE

✅ **Les dix premières villes sont traduites.** Les 28 restantes suivent le même protocole.

**🟥 DÉCISION EN ATTENTE — le nom du chapitre d'Édimbourg.** Incohérence dans les six langues :
- `ETAPES` et `ETAPES_I18N` disent **« Les dialogues »** / « Conversations », souvenir **« Un carnet de mots »**
- le lexique dit **« Les urgences du cavalier »**

Le découpage du 16/08 a séparé les urgences vétérinaires (Kildare) des urgences humaines (Édimbourg), mais l'écran d'arrivée n'a pas suivi. **Ne rien figer en arabe avant que Blandine tranche.**

**Chantier posé, non engagé :** fusionner `hype-lingo-villes.js` et `-monde.js`. Découpe arbitraire (10 villes britanniques / 28 autres, par ordre de création). ⚠️ Fichier unique plus lourd mis en cache d'un bloc, trois déclarations à mettre à jour, ordre de push à respecter.

---

## 11 · POUR ACTIVER L'ARABE — LE JOUR VENU

🟥 **NE PAS se contenter d'ajouter `"ar"` à `LANGUES_UI`.** Ces tables n'ont aucune valeur `ar` : `LANGUES_UI`, `LG_DRAPEAU`, `VOIX`, `LX_LANGUES`, `LANGUE_NOM`, et beaucoup de libellés d'interface. On aurait une langue à moitié branchée, avec des retours en français partout.

1. Ajouter `ar` à **toutes** les listes de langues du voyage et du lexique
2. Le drapeau ou l'identifiant visuel retenu
3. `ar:"ar-SA"` dans `VOIX`
4. `العربية` dans toutes les tables de noms de langues
5. Traduire les libellés d'interface sans champ `ar`
6. `dir="rtl"` et `lang="ar"` **au conteneur du texte affiché**, quand la langue lue ou apprise est `ar`
7. 🟥 **Ne pas inverser toute la page** : nombres, chronologies, boutons multimédias et éléments visuels gardent leur ordre logique
8. Tester **séparément** : écran d'arrivée · lettre · volets · lexique · dialogue · phrases · recherche · synthèse vocale · rail des lettres · collection et carnet
9. Retirer les mentions « arabe dormant » **seulement après** un test réel sur téléphone
10. 🟥 **Ne toucher à aucune des six langues actives**

---

## 12 · LES 38 VILLES

| # | ville | pays | chapitre | fichier lexique | arabe |
|---|---|---|---|---|---|
| 1 | La Baule | France | L'arrivée | `arrivee` | ✅ |
| 2 | Le Morne | Maurice | La balade | `balade` | ✅ |
| 3 | Connemara | Irlande | Le cheval | `connemara` | ✅ |
| 4 | Newmarket | Angleterre | L'écurie | `ecurie` | ✅ |
| 5 | Lambourn | Angleterre | Le pansage | `pansage` | — |
| 6 | Walsall | Angleterre | Le matériel | `walsall` | — |
| 7 | Aberystwyth | Pays de Galles | En selle | `cours` | — |
| 8 | Windsor | Angleterre | Le dressage | `windsor` | — |
| 9 | Wellington | États-Unis | La tournée d'hiver | `wellington` | — |
| 10 | Hickstead | Angleterre | Le derby | `derby` | — |
| 11 | Burghley | Angleterre | Le cross | `cross` | — |
| 12 | Badminton | Angleterre | Le concours | `badminton` | — |
| 13 | Kildare | Irlande | Les urgences | `urgences-vet` | ✅ |
| 14 | Édimbourg | Écosse | Les dialogues | `urgences-med` | ✅ |
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

## 12 bis · 🟥 LES OBJETS DE COLLECTION ET LA SELLERIE

Chaque ville a un **souvenir** qui va dans la sellerie. Quand un objet est créé :

- Nommage : `objet-<ville-ref>.webp` · racine du dépôt
- Format : **WebP qualité 88, 900 px max, transparence préservée**. Ne jamais pousser le PNG d'origine
- 🟥 **GARDER LES VUES DE BIAIS.** Trois fichiers par objet, comme pour Clonbinane :
  - `objet-<ville>.webp` — de face
  - `objet-<ville>-pose.webp` — trois quarts gauche
  - `objet-<ville>-pose-34.webp` — trois quarts droite
  Ce sont elles qui donnent du relief à la sellerie. Ne pas les jeter après la découpe.
- Découpe des planches : détection par composantes connexes ; fusionner deux zones seulement si leurs boîtes se recouvrent de plus de 25 % de la plus petite
- **Incrémenter `VER`** dans `lingo.html` à chaque lot d'images remplacées
- Une **icône SVG** doit aussi être ajoutée dans `ICONES` (or `#D4AF37`, trait 2, viewBox 60)

---

## 13 · RÈGLES DE LIVRAISON

- 🟥 **Linguae se livre sous `lingo.html`, JAMAIS `index.html`.** Un fichier livré sous le mauvais nom a écrasé Hype le 21/08.
- **Incrémenter `VER`** dans `lingo.html` à chaque livraison, et `CACHE` dans `sw-linguae.js` si le socle change.
- **Ordre de push :** images → lexiques `.js` → `villes*.js` → `lingo.html` → `sw-linguae.js`.
- **Signaler tout incident** : erreur, crash, fichier perdu, patch échoué. Pas de correction silencieuse.
- **Ne jamais décider à la place de Blandine.** Présenter les options, attendre un « valide » / « vas-y » explicite.

---

*Passation écrite le 24/08/2026. Tenir à jour à chaque ville.*
