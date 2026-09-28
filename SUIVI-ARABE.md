# SUIVI — LANGUE ARABE
### Linguae · état du chantier `ar`
*Mis à jour le 28/09/2026 — reprise du chantier (état vérifié sur le dépôt GitHub)*

---

## 🟦 ÉTAT RÉEL AU 28/09 — RELEVÉ FAIT SUR LE DÉPÔT

**L'arabe n'a JAMAIS été activé.** `lingo.html` en ligne = `?v=96`, `LANGUES_UI` = 6 langues, pas de drapeau, pas de `rtl`. Seules existent deux pages d'essai (`lingo-arabe-essai.html`, `lingo-controle-arabe.html`), qui ne sont pas l'appli.

✅ **Alerte Connemara du 25/08 : CLOSE.** Le `connemara.js` du dépôt porte bien son arabe (103 champs sur 103).

**Décision de Blandine (28/09) : option 1 — finir d'abord, activer ensuite.** On complète fichier par fichier, sans rien activer ; l'activation se fera à la fin, avec la procédure en 10 étapes (plus bas).

### Lexiques chargés par `lingo.html` — champs arabes / champs à traduire

| état | fichiers |
|---|---|
| ✅ complets ou quasi | cheval·connemara, ecurie, pansage, walsall, barcelone, jeunes, cours, windsor, aachen, badminton, oliva, rome, urgences-vet, urgences-med, arrivee, froid, balade, flyinge, apprentissage |
| ✅ **faits le 28/09** | **andalou (Jerez, 46), parade (Séville, 60), vejer (Vejer, 83), derby (Hickstead, 76), cross (Burghley, 69), wellington (Wellington, 92), formation (Warendorf, 60), versailles (Versailles, 66), enseignant (Saumur, 107), horsemanship (Santa Ynez, 55), haras (Lexington, 71), polo (Buenos Aires, 60), poney (Lamotte, 99), elevage (Golegã, 72), vente (Vérone, 62), tradition (Tokyo, 56), western (Tamworth, 58), endurance (Dubaï, 87), liberte (Taupō, 71), phrases-monde (10)** |
| ✅ à faire | **plus aucun lexique** |
| ✅ villes | villes-monde.js et villes.js : 38 / 38 villes (28/09) |

### Dans `lingo.html` (points 6, 8, 9 des neuf points) — relevé du 28/09
- `ETAPES_I18N` : 13 villes sans arabe — Taupō, Versailles, Saumur, Lamotte, Jerez, Séville, Vejer, Warendorf, Newmarket, Lambourn, Aberystwyth, Wellington, Hickstead.
- `RECITS` : 15 villes sur 38 ont l'arabe · `POURQUOI` : 17 / 37 · `ACCUEIL_CHAP` : 8 / 36 · `COLL_NOM` : 48 familles / 80.
- Interface sans arabe : environ 190 libellés (`UI`), plus `LXT`, `PHRASES_FIN`, `DESTINATIONS`, `LANGUE_NOM`, `TH_FAMILLES`, `TH_TXT`, `SON_TXT`, `LG_DRAPEAU`, `VOIX`…
- ⚠️ Ces tables seront faites **après** les lexiques, en une seule livraison de `lingo.html`.

### 28/09 — lot 1 : les trois villes espagnoles (lexiques seulement)
- `hype-lingo-lex-andalou.js` (Jerez), `hype-lingo-lex-parade.js` (Séville), `hype-lingo-lex-vejer.js` (Vejer) : `mots`, `def`, phrases, dialogue, et `"ar"` ajouté à `dialogue.langues`.
- Contrôles : syntaxe OK, 0 voyelle, 0 cyrillique, les six autres langues inchangées au caractère près.
- `lingo.html` **non modifié** : l'arabe étant dormant, rien ne change à l'écran. Le `?l=` des trois lexiques sera monté au moment de l'activation.
- Termes posés : الفروسية العليا (haute école), الترويض الكلاسيكي, المساعدات (les aides), الانسجام, الركوب الجانبي (amazone), سائق العربة (meneur), أعنة العربة (guides), عدة الحصان (harnachement), سوط الركوب, المهاميز, سترة الحماية, ضمادات الراحة / ضمادات العمل, واقيات القوائم, تجهيز الحصان بالسرج واللجام (seller).
- ✅ **Défaut français corrigé le 28/09 (validé par Blandine)** : trois définitions affichaient un « \n » en toutes lettres (Séville · l'attelage, Warendorf · formation, Édimbourg · urgences-med). L'appli ne gère aucun retour à la ligne dans les définitions : le « \n » a été remplacé par un espace. Seul le français contenait le défaut ; rien d'autre n'a bougé dans ces fichiers. ⚠️ `formation.js` et `urgences-med.js` corrigés doivent servir de base à la suite.

### 28/09 — lot 2 : Hickstead, Burghley, Wellington (lexiques seulement)
- `hype-lingo-lex-derby.js` (Hickstead, 76), `hype-lingo-lex-cross.js` (Burghley, 69), `hype-lingo-lex-wellington.js` (Wellington, 92) : `mots`, `def`, phrases, dialogue, `"ar"` dans `dialogue.langues`.
- Mêmes contrôles que le lot 1, tous bons. `lingo.html` non modifié.
- Termes posés : الديربي, التلة الترابية (la banque / le talus), التل (la colline des spectateurs), الحاجز الثابت, الحاجز الطبيعي, معبر الماء, مسامير الحدوة (crampons), الدرجات (piano), الخندق, المخاضة (gué), الطريق المباشر / الخيار الطويل, الحاجز الضيق, الهبوط, نقطة الارتقاء, الحاجز العمودي, الأوكسر, العارضتان المتقاطعتان, المركب (combinaison), الرايات, معاينة المسار, الجولة النظيفة, جولة الفصل (barrage), ميدان الإحماء, الرفض, الهروب الجانبي, العصيان.
- Consignes au groupe laissées au pluriel (Wellington : « attention à bien attendre vos sauts », « huit chevaux au paddock »), comme le veut la règle.
- ✅ Vérifié le 28/09 : à Wellington, la définition des fanions dit « le souvenir que tu rapportes de **Hickstead** ». C'est JUSTE — le fanion rouge est bien le souvenir de Hickstead dans `ETAPES`. C'est un renvoi, pas une erreur. Rien à changer.

### 28/09 — lot 3 : Warendorf, Versailles, Saumur (lexiques seulement)
- `hype-lingo-lex-formation.js` (Warendorf, 60 — construit sur la version corrigée du « \n »), `hype-lingo-lex-versailles.js` (Versailles, 66), `hype-lingo-lex-enseignant.js` (Saumur, 107).
- Mêmes contrôles, tous bons. `lingo.html` non modifié.
- 🟥 **Saumur est un chapitre à DOUBLE FORME** : 36 mots portent un `dit` (l'ordre crié). Traité comme Aberystwyth : `ar:{m:"…", dit:"…"}`. L'enseignante parle à UNE élève → féminin singulier (توقفي، انزلي، تنفسي) ; au groupe → pluriel (أنصتوا، أمسكوا العرف، الجميع بالخطو). L'outil refuse désormais tout `dit` oublié.
- Versailles : termes de dressage alignés sur ceux déjà posés dans les réserves (الأبوييه، الانقياد للساق، الكتف إلى الداخل، الرأس إلى الجدار). Termes nouveaux : الإيقاع، الارتخاء، التواصل مع الشكيمة، الاندفاع، الاستقامة، التجميع، الانحناء، الثني، الخفة، المؤخرة، المقدمة، الانقياد (soumission)، دخول القوائم الخلفية (engagement)، نفاذ المساعدات.
- Warendorf : التكوين (formation) / التدريب (entraînement), الدورة التدريبية (stage), المجموعة الوطنية (cadre = squad) ≠ المنتخب (team).
- ⚠️ Règle rappelée : quand la joueuse s'adresse à l'écuyer ou au moniteur, le verbe reste au masculin (تستمع، تقول) ; seul le club parle à la joueuse au féminin.

### 28/09 — lot 4 : Santa Ynez, Lexington, Buenos Aires (lexiques seulement)
- `hype-lingo-lex-horsemanship.js` (Santa Ynez, 55), `hype-lingo-lex-haras.js` (Lexington, 71), `hype-lingo-lex-polo.js` (Buenos Aires, 60).
- Mêmes contrôles, tous bons. `lingo.html` non modifié.
- ⚠️ Santa Ynez et Lexington écrivent leurs phrases isolées sous la forme `{lecon, p:{fr…}}` : l'arabe est posé DANS `p` (l'appli lit les deux formes).
- Termes posés : الهورسمانشيب، العمل من الأرض، الرسن الحبلي، الضغط / رفع الضغط (release)، الانقياد (céder)، إزالة الحساسية، الإعداد الأول للحصان الصغير (débourrage — jamais « كسر »)، الهاكامور، التوقيت المناسب، الإحساس (feel) · مزرعة تربية الخيل، اليرلينغ، المزاد العلني، الدلال، شجرة النسب، الأب / الأم / أب الأم (sire, dam, dam sire)، سعر التلقيح، فرس التربية، المهر / المهرة / المهر الذكر، الفطام · الشوط (chukka)، المضرب، التصنيف (handicap)، خط الكرة، حصان البولو (« pony » anglais ≠ البوني).
- Wellington · fanions : Blandine a redemandé à 17:53 ; réponse faite (renvoi juste, rien changé) — en attente de sa décision si elle préfère malgré tout Wellington.

### 28/09 — lot 5 : Lamotte-Beuvron, Golegã, Vérone (lexiques seulement)
- `hype-lingo-lex-poney.js` (Lamotte, 99 — y compris le champ `intro`), `hype-lingo-lex-elevage.js` (Golegã, 72), `hype-lingo-lex-vente.js` (Vérone, 62).
- Mêmes contrôles, tous bons. `lingo.html` non modifié.
- Lamotte : les 26 phrases isolées sont les mêmes que les 26 répliques du dialogue — même arabe des deux côtés, volontairement.
- Termes posés : البوني (الحصان القزم) — glossaire respecté, jamais المهر ; الارتفاع عند الغارب، مقياس الارتفاع (toise)، فئة الارتفاع، ألعاب البوني، الكاروسيل، الركوب بلا سرج، الأعنة الملونة، ضمن / خارج حد الارتفاع · مزرعة التربية، الفرس / الفحل / المهر / المهرة، الحصان المخصي (glossaire)، فرس التربية، التلقيح / التلقيح الاصطناعي، الفطام، السلالة، سجل الأنساب (stud-book)، الاعتماد (Körung)، البنية (conformation)، العرض باليد، النسل · للبيع، التاجر، الفحص البيطري قبل الشراء، الصورة الإشعاعية، عقد البيع، الضمان، العيب الخفي، جواز السفر، الميزانية.

### 28/09 — lot 6 : Tokyo, Tamworth, Dubaï, Taupō, phrases du monde — ✅ LES 38 CHAPITRES SONT COMPLETS
- `hype-lingo-lex-tradition.js` (Tokyo, 56), `hype-lingo-lex-western.js` (Tamworth, 58), `hype-lingo-lex-endurance.js` (Dubaï, 87 — y compris `intro`), `hype-lingo-lex-liberte.js` (Taupō, 71), `hype-lingo-phrases-monde.js` (10 phrases ajoutées à dressage et écurie).
- 🟥 **Contrôle global fait en chargeant les 41 fichiers comme l'appli** : 38 chapitres · 894 mots · 212 phrases · 838 répliques de dialogue — **0 manque**. Chaque `dialogue.langues` contient `"ar"`.
- **Titres de chapitre (`titre.ar`)** : 9 anciens chapitres n'en avaient pas (ecurie, pansage, cours, urgences-vet, urgences-med, arrivee, froid, balade, apprentissage) → ajoutés, seule modification de ces fichiers. Et 5 titres de ce jour alignés sur le nom de chapitre déjà affiché par `ETAPES_I18N` : cross → سباق الضاحية, elevage → تربية الخيل, western → الركوب الغربي, haras → مزرعة الخيول, horsemanship → فن التعامل مع الخيل.
- Dubaï : الحصان العربي الأصيل pour le pur-sang arabe (ici c'est bien la race arabe — le piège du glossaire ne vaut que pour le Thoroughbred).
- ⚠️ `apprentissage.js` contient 3 mots vocalisés **dans des commentaires** (notes de relecture, jamais affichées). Laissés tels quels.

### 28/09 — lot 7 : lettres et volets — ✅ LES 38 VILLES SONT COMPLÈTES (point 7 des neuf points)
- `hype-lingo-villes-monde.js` : 21 villes (140 textes) — Saumur, Lamotte, Jerez, Séville, Vejer, Warendorf, Rome, Golegã, Vérone, Dubaï, Tokyo, Tamworth, Buenos Aires, Lexington, Wellington, Burghley, Versailles, Fontainebleau, Taupō, Santa Ynez.
- `hype-lingo-villes.js` : Hickstead (7 textes), seule modification du fichier.
- Contrôle : les deux fichiers chargés dans l'ordre de l'appli → **38 / 38 villes** avec lettre (même nombre de paragraphes qu'en français) + 3 volets titre et texte. Syntaxe OK, 0 voyelle, 0 cyrillique, six langues intactes.
- La lettre est au masculin comme le narrateur français — **sauf Burghley**, dont le français est au féminin (« on m'a laissée ») : l'arabe suit le français. Les volets s'adressent à la cavalière au féminin.
- Titres communs repris à l'identique des villes déjà faites : « Si tu y allais » = لو ذهبت إلى هناك, « Le savais-tu ? » = هل كنت تعرفين؟
- 🟥 **À TRANCHER (Blandine)** : dans `villes.js`, le volet de Connemara « Le poney des grands espaces » est traduit **مهر المساحات الواسعة** — مهر = POULAIN, le piège exact du glossaire. Proposé : بوني المساحات الواسعة. Non corrigé sans son accord.

### 🟠 CE QUI RESTE AVANT D'ACTIVER L'ARABE
1. ~~villes-monde.js~~ ✅ · 2. ~~villes.js~~ ✅
3. `lingo.html` : `ETAPES_I18N` (13 villes), `RECITS`, `POURQUOI`, `ACCUEIL_CHAP`, `COLL_NOM`, puis les ~190 libellés d'interface — **une seule livraison de `lingo.html`**, VER monté.
4. L'activation elle-même (procédure en 10 étapes, plus bas).

---

## 🟥 ALERTE DU 25/08 — LE `connemara.js` REÇU N'A PLUS D'ARABE

Le fichier `hype-lingo-lex-connemara.js` uploadé le 25/08 contient **0 `mots.ar`, 0 `def.ar`** sur 64 concepts. Le SUIVI compte Connemara à 82 entrées, 2 relectures.

Deux explications possibles, à trancher **avant toute manipulation** :
- une **copie antérieure** à la traduction a été uploadée (le plus probable) ;
- ou l'arabe de Connemara **n'a jamais été poussé au dépôt**, et il est perdu.

⚠️ **NE RIEN PATCHER SUR CE FICHIER, NE PAS LE POUSSER** : il écraserait 82 entrées.
Vérification à faire : ouvrir `hype-lingo-lex-connemara.js` sur GitHub (« Go to file ») et chercher `ar:`. La lettre et les trois volets de Connemara, eux, ont bien leur arabe dans `hype-lingo-villes.js` — c'est le lexique seul qui est en cause.

C'est le même piège que la fusion `villes.js` du 24/08 : **la base de travail doit toujours être le fichier du dépôt, jamais une copie locale**.

---

## OÙ ON EN EST

**17 villes sur 38**, toutes dormantes : aucun écran ne lit le champ `ar`, le sélecteur reste à six langues.

| ville | entrées | relectures |
|---|---|---|
| **Aberystwyth** — En selle | 125 | 1 passe |
| **Badminton** — Le concours | 92 | **1 passe, appliquée** |
| **Oliva Nova** — S'engager | 79 | **1 passe, appliquée** |
| **Barcelone** — Voyager avec son cheval | 108 | **1 passe, appliquée** |
| **Flyinge** — La maréchalerie | 92 | **1 passe complète, appliquée** |
| **Walsall** — Le matériel | 69 | **1 passe, appliquée** |
| **Windsor** — Le dressage | 60 | **1 passe, appliquée** |
| **Aachen** — Le grand concours | 63 | **1 passe, appliquée** |
| **La Baule** — L'arrivée | 92 | 2 passes |
| **Kildare** — Les urgences du cheval | 86 | 3 passes |
| **Connemara** — Le cheval | 82 | 2 passes · 🟥 **à vérifier au dépôt (voir alerte)** |
| **Édimbourg** — Les urgences du cavalier | 80 | 2 passes |
| **Newmarket** — L'écurie | 74 | 2 passes |
| **Lambourn** — Le pansage | 70 | 1 passe |
| **Spruce Meadows** — Le froid | 60 | 3 passes |
| **Le Morne** — La balade | 57 | 2 passes |
| **Clonbinane** — L'apprentissage | 51 | 3 passes |

**1436 entrées traduites** (dont 96 dans quatre fichiers de réserve non chargés : pansage 13, jour J 5, filet 22, dressage 56). 🟥 Aucune validée par un arabophone.

✅ **Toutes les villes traduites ont été relues au moins une fois.**

---

## ✅ RÉGLÉ LE 25/08 — LA FUSION `villes.js`

Le point 🟥 « `hype-lingo-villes.js` reste à fusionner » est **clos**. Vérifié sur le fichier du dépôt : 9 villes y portent leurs 7 entrées arabes (Newmarket, Lambourn, Connemara, Walsall, Aberystwyth, Windsor, **Badminton**, Kildare, Édimbourg) ; Hickstead n'est pas traduite, c'est normal. `villes-monde.js` en porte 8 (Oliva, Aachen, La Baule, Le Morne, Spruce, Barcelone, Flyinge, Clonbinane). Total 17 villes = les 17 du tableau.

---

## LES CORRECTIONS FRANÇAISES DE BARCELONE — ÉTAT AU 25/08

Feu vert de Blandine le 25/08. **82 remplacements appliqués**, `VER` → **?v=92**, caches `barcelone ?l=5`, `ecurie ?l=4`, `villes-monde ?l=4`.

**Appliqué (six langues fr/en/es/it/de/ja) :**

| # | correction | où |
|---|---|---|
| 1-A | **ordre du dialogue** : barre de recul → attache → fermeture du pont | lexique barcelone |
| 4 | licol : le licol de sécurité existe | barcelone **+ ecurie** |
| 5 | protège-queue : « jamais directement sur les crins » retiré | barcelone |
| 7 | van : *horse van* existe | barcelone |
| 8 | camion : *van* seul ne s'emploie pas, sauf *horse van* | barcelone |
| 9 | débarquer : à reculons possible selon le cheval | barcelone |
| 10 | attache rapide : « risque de se blesser », pas « se blesse » | barcelone |
| 11 | volet 2 : « chaque protection cède avant le cheval » supprimé | **villes-monde.js** |
| 12 | voyage : équivalence « 4 h = une séance » retirée | barcelone |
| 13 | aire de repos : la chaleur prime sur la porte fermée | barcelone |
| 14 | arrivée : l'aération passe avant l'attente | barcelone |
| 15 | filet à foin : sans manger la tête levée | barcelone |

🟥 **Encore en attente :**
- **2 · `pause`** — définition d'un cours d'équitation dans un chapitre de transport. `cours.js` **n'a pas été fourni**, correction impossible sans lui.
- **3 · `temperature`** — conflit réel : la définition parle de Calgary et des concours d'hiver, **ce qui est juste dans `froid.js` (Spruce Meadows, Canada) et hors sujet à Barcelone**. Corriger à l'identique partout supprimerait Calgary du chapitre où il a sa place. À trancher : version courte partout, ou version transport propre à Barcelone (= divergence assumée sur ce `ref`).
- **6 · `passeport`** — bloqué par l'alerte connemara ci-dessus.

**Découvertes de cartographie (le commentaire d'en-tête de `barcelone.js` est faux sur trois points) :**
- `filet-foin` et `van` **n'existent plus que dans Barcelone** — pas de synchronisation à faire, pas de divergence.
- `licol` est bien dupliqué dans `ecurie.js` : les six langues étaient identiques, **mais les deux `ar` divergeaient déjà** (celui d'ecurie affirmait l'interdiction absolue). L'arabe d'ecurie a été aligné sur celui de Barcelone, plus nuancé et relu. ⚠️ **Un `ar` relu a donc été modifié : à faire confirmer au relecteur.** Les `mots.ar` divergent aussi (`الرسن` à Barcelone, `الرسن من دون شكيمة` à l'écurie) — **non touché, à trancher**.
- `passeport` est bien dupliqué dans `connemara.js`, à l'identique en six langues.

---

## 🟥 LE POINT DE VIGILANCE DU 25/08 — L'ARABE EN AVANCE SUR LE FRANÇAIS

Sur les sept définitions de Barcelone corrigées le 25/08, **l'arabe disait déjà la version nuancée**, et les trois répliques du dialogue étaient **déjà dans l'ordre sûr**. Le traducteur avait rattrapé chaque affirmation dangereuse au passage, sans le signaler.

Conséquence : là où le français n'a pas encore été corrigé, **l'arabe dormant ne dit pas la même chose que les six langues actives**. Le jour de l'activation, ces écarts deviendront visibles.

👉 **À faire un jour :** un diff systématique fr↔ar sur les 17 villes traduites, pour lister les endroits où l'arabe a corrigé le français en silence. Chacun est une correction française en attente.

---

## ANOMALIES STRUCTURELLES (pas un sujet arabe, à trancher un jour)

- `ACCUEIL_CHAP` : clés orphelines `concours`, `urgences`, `dialogues` depuis le découpage du 18/08 ; `rome`, `urgences-vet`, `urgences-med` absentes, et **rien pour Aachen non plus**. `oliva` créée le 24/08 — variante du relecteur jamais tranchée.
- **Dix familles `COLL_NOM`** créées le 24/08 en sept langues (Flyinge ×6, Barcelone ×4), textes de Claude **à valider**. `grand` et `tenue` également.
- **Le chapeau (`PHRASES_FIN`) couvre 29 villes sur 38.**
- `COLL_NOM` : **quatre clés dupliquées** (`alerte`, `cavalier`, `cheval-urg`, `jour-j`), la seconde écrase la première en silence.
- Famille `deroule` = سير الرحلة (partagée) — à revoir si une ville de dressage l'utilise.
- **`ref` mal nommé** (25/08) : `d-bcn-barre-recul` dit maintenant « ferme le pont ». Renommer touche la progression Supabase — laissé tel quel sur décision.
- La fiche `ARABE-flyinge.md` est en retard de deux points sur les fichiers (n°11 مربط, n°88 الحدوات) — à régénérer.

---

## 🟥 LES NEUF POINTS À VÉRIFIER AVANT DE COCHER UNE VILLE

| # | où | quoi |
|---|---|---|
| 1 | lexique | `mots.ar.m` sur chaque concept (+ `var` s'il existe) |
| 2 | lexique | `def.ar` sur chaque concept |
| 3 | lexique | `ar:` sur chaque réplique du dialogue |
| 4 | lexique | `ar:` sur chaque phrase isolée |
| 5 | 🟥 lexique | **`dialogue.langues` doit contenir `"ar"`** |
| 6 | `lingo.html` | récit, résumé, chapeau, nom du chapitre, souvenir |
| 7 | 🟥 `villes.js` / `-monde.js` | **lettre manuscrite + 3 volets (titre ET texte)** |
| 8 | 🟥 `lingo.html` | **`COLL_NOM` — chaque valeur de `coll` du lexique** |
| 9 | 🟥 `lingo.html` | **`ETAPES_I18N` — nom du chapitre, nom de la ville, souvenir** |

**Les points 5, 7, 8 et 9 ont chacun été oubliés au moins une fois.** Seul le 8 se voit immédiatement : il casse les six autres langues.

**Contrôles à chaque livraison :** `node --check` sur chaque `.js` **et** sur les 6 blocs inline de `lingo.html` · vocalisation = 0 · cyrillique = 0 · parité ja/ar · 38 balises de ville · diff limité aux ajouts · ancres uniques (`assert count == 1`).

---

## RÈGLES D'ÉCRITURE

- Arabe standard moderne
- 🟥 **Aucun signe vocalique.** Ne pas en réintroduire au coup par coup
- 🟥 **Les consignes au FÉMININ singulier** (le club s'adresse à une cavalière) ; **la lettre au MASCULIN** (le narrateur est le même dans les 38 villes). Cette distinction a été violée deux fois
- Boutiques et organisations au pluriel de politesse
- **Formulation simple et descriptive** quand le terme technique n'est pas sûr — décrire juste vaut mieux que nommer faux
- **Règle relecteur du 24/08 :** terme international de dressage sans équivalent arabe stabilisé → **translittération puis explication** (l'appuyer = الأبوييه)
- Pour les chapitres de secours : **consignes courtes, sans tournure élégante**, avec l'exception du danger immédiat

---

## LE CIRCUIT DE RELECTURE

1. Je traduis, je livre les fichiers
2. Je produis **une fiche unique par ville** — `ARABE-<ville>.md`, sections A à G, numérotation continue, textes FR + AR
3. Blandine la fait relire par une autre source
4. La relecture revient par numéros, avec texte de remplacement et motif
5. J'applique **uniquement ce qui est listé**, je régénère la fiche (« relecture n appliquée »)

**Une seule fiche par ville.** Il y en a eu six pour trois villes avant regroupement — c'était ingérable.

---

## 🟥 CE QUE LA RELECTURE ARABE A TROUVÉ DANS LE FRANÇAIS

**Vingt-neuf corrections du texte source.** C'est devenu le bénéfice principal du chantier : traduire force à relire chaque affirmation.

| ville | l'affirmation | le problème |
|---|---|---|
| Kildare | « un cheval qui se roule peut se retourner l'intestin » | **mythe** |
| Kildare | « jamais brutalement sur la croupe, le choc thermique » | **faux** — refroidir vite prime |
| Kildare | « une plaie ne se recoud que dans les 6-8 h » | trop absolu |
| Kildare | instructions de garrot simplifiées | **danger** pour un non-formé |
| Connemara | « Boulet chaud : appelle le maréchal » | 🟥 c'est le **vétérinaire** |
| Connemara | « tous les chevaux prennent un an le 1er janvier » | règle des **courses de l'hémisphère Nord** |
| Newmarket | « sur un cheval chaud, jamais les reins » | règle **dépassée** |
| Lambourn | « le pied doit aussi respirer » | 🟥 **le sabot ne respire pas** |
| Lambourn | « un cheval mouillé prend froid, même en été » | trop absolu |
| Aberystwyth | « à main gauche, le mur est à gauche » | 🟥 **inversé** — il est à droite |
| Aberystwyth | « la récupération, jusqu'à ce que le cheval soit sec » | critère **physiologique**, pas visuel |
| Édimbourg | « le 112 fonctionne même sans carte SIM » | **faux** au Royaume-Uni |
| Édimbourg | « la personne à chercher avant même d'appeler » | pouvait **retarder un appel vital** |
| Badminton | « prendre l'option ne coûte jamais de pénalités » | trop absolu |
| Badminton | « des pénalités seconde par seconde » | dépend du barème |
| Badminton | « l'obstacle est LA dernière épreuve » | vrai à Badminton, pas partout |
| Badminton | « le relief épuise bien plus que la hauteur » | non mesurable |
| Badminton | « deux cartons en un an = suspendu » | à rattacher au règlement fédéral |
| Badminton | « convertir un niveau en hauteur, jamais en mot » | la technicité compte aussi |
| Badminton | « un jour ou trois jours » | formats modernes plus variés |
| Oliva | « il faut une licence du pays » | selon fédération et niveau |
| Oliva | « le steward a autorité pour éliminer » | il saisit le jury |
| Oliva | « frais jamais remboursés » | dépend du règlement |
| Oliva | « pas d'engagement tardif sur un grand concours » | possible selon règlement |
| Oliva | « deux numéros, sinon élimination » | modalités variables |
| Oliva | « monter de hauteur plus simple que descendre » | pas universel |
| Oliva | « on vérifie au bureau la veille » | souvent en ligne |
| Oliva | « membership = seule exigence britannique » | varie selon discipline |
| Oliva | « au chronomètre OU au barème A » | fausse opposition |

✅ Les 16 corrections Badminton/Oliva appliquées le 24/08 (`?l=2`, `VER ?v=79`).
✅ Les 12 corrections Barcelone appliquées le 25/08 (`VER ?v=92`) — détail dans la section ci-dessus, 3 restent en attente.

---

## GLOSSAIRE — LES TERMES DE RÉFÉRENCE

*Fixés en relecture. À employer partout.*

| français | arabe |
|---|---|
| le pas | مشية الخطو |
| le trot | الخبب |
| le galop (contrôlé) | العدو الخفيف |
| le galop de course | العدو السريع |
| le saut d'obstacles | قفز الحواجز |
| la longe | حبل القيادة |
| la bombe | الخوذة |
| le seuil de réaction | عتبة الاستجابة |
| le paddock | المرعى المسيج |
| le bush | البرية الأسترالية |
| le rond de longe | حلبة التدريب الدائرية |
| l'abreuvoir | حوض الشرب |
| le degré sous zéro | درجة تحت الصفر |
| l'équitation scientifique | الفروسية العلمية |
| le vétérinaire | الطبيب البيطري |
| les secours | خدمات الطوارئ |
| l'ambulance | سيارة الإسعاف |
| à l'aide ! | النجدة! |
| cheval échappé | حصان طليق |
| la colique | المغص |
| la fourbure | التهاب صفائح الحافر |
| le coup de sang | انحلال العضلات الناتج عن الجهد |
| le bouchon œsophagien | انسداد المريء |
| le commissaire (steward) | المشرف (Steward) |
| le chef de piste | مصمم المسار |
| la cocarde | شارة الفوز |
| le numéro de têtière | رقم تعريف الحصان المثبت على اللجام |
| le barème | طريقة احتساب النقاط |
| le temps optimum | الزمن المستهدف |
| les pénalités de temps | الجزاءات الزمنية |
| rattraper du temps | تعويض الوقت |
| garder les barres | عدم إسقاط العوارض |
| le trot de présentation | فحص الخبب البيطري |
| le classement provisoire | الترتيب المؤقت |
| déclarer forfait | إعلان الانسحاب |
| la licence | رخصة الفروسية |
| la remise des prix | حفل توزيع الجوائز |
| la sonorisation | نظام مكبرات الصوت |
| le pont, la rampe (transport) | منحدر التحميل *(remplace منحدر المقطورة — Le Morne à harmoniser)* |
| embarquer | تحميل الحصان |
| débarquer | إنزال الحصان من مركبة النقل |
| la barre de poitrail · de recul | عارضة الصدر · عارضة المؤخرة |
| l'attache rapide | رباط الأمان سريع التحرير |
| la stalle de transport | حجرة النقل |
| le passeport du cheval | جواز الحصان |
| les documents | الوثائق |
| l'aire de repos | منطقة الاستراحة |
| au chronomètre (explications) | ضد الساعة *(relecture Aachen)* |
| la forge | الكور *(jamais المصهر)* |
| le haras (Flyinge) | مربط فلينغه |
| la ferrure, le shoeing en général | تركيب الحدوات |
| le parage | تقليم الحافر |
| la fourchette | نسر الحافر |
| pieds nus (explications) | الحافر غير المنتعل / من دون حدوات |
| la reconnaissance du parcours | معاينة مسار الحواجز |
| l'appuyer | الأبوييه *(translittération — règle relecteur 24/08 ; à arbitrer aussi pour التغيير الطائر à la relecture de la réserve du dressage)* |
| le véhicule de transport | مركبة النقل |
| le licol | 🟥 الرسن *(Barcelone)* / الرسن من دون شكيمة *(écurie)* — **à trancher** |

---

## LES PIÈGES DÉJÀ RENCONTRÉS

**Fautes de sens attrapées en relecture :**

| écrit | voulait dire |
|---|---|
| `الميزان` | une **balance**, pas un thermomètre |
| `تبن` | la **paille** ; le foin est `دريس` |
| `أمطرت ثلجا` | « il a **plu de la neige** » |
| `غير محمى` | « non **protégé** », pas « pas échauffé » |
| `رفعه` | pouvait se lire « **augmenter** la pression » |
| `الماء لا يتصرف` | « l'eau ne **se comporte** pas » |
| `الأدغال` | une **jungle**, pas le bush australien |
| `يراقب`, `يتقدم`, `يسقط` | **verbes conjugués** là où le lexique présente des notions |

**Substitutions systématiques :** `الوبر` → `الشعر` · `المضمار` → `ميدان الركوب الداخلي` · `المرج` → `المرعى` · `المشرب` → `حوض الشرب` · `المربط` → `حجرة` · `جواب` → `استجابة` · `الالتباس` → `الارتباك` · `الركض` → `العدو الخفيف`

**Verdict sur le vocabulaire technique rare :** garder les **formulations descriptives**. Ne pas chercher à les raccourcir.

⚠️ **Piège à venir :** plusieurs textes disent « les six langues ». Avec l'arabe, ce sera faux. Kildare a déjà été corrigé en « toutes les langues disponibles » — à surveiller ailleurs.

---

## 🟥 CE QU'IL FAUDRA POUR ACTIVER — LA PROCÉDURE

*Établie en relecture le 24/08. La plus précise dont on dispose.*

🟥 **NE PAS se contenter d'ajouter `"ar"` à `LANGUES_UI`.** Cela ferait apparaître une langue à moitié branchée. Les tables suivantes n'ont aucune valeur `ar` à ce jour : `LANGUES_UI`, `LG_DRAPEAU`, `VOIX`, `LX_LANGUES`, `LANGUE_NOM`, et beaucoup de libellés d'interface.

**Les dix étapes :**

1. Ajouter `ar` à **toutes** les listes de langues du voyage et du lexique
2. Ajouter le drapeau ou l'identifiant visuel retenu
3. Ajouter `ar:"ar-SA"` dans `VOIX`
4. Ajouter `العربية` dans toutes les tables de noms de langues
5. Traduire les libellés d'interface qui n'ont pas encore de champ `ar`
6. Appliquer `dir="rtl"` et `lang="ar"` **au conteneur du texte affiché** quand la langue lue ou apprise est `ar`
7. 🟥 **Ne pas inverser toute la page** : conserver les nombres, chronologies, boutons multimédias et éléments visuels dans leur ordre logique
8. Tester **séparément** : écran d'arrivée · lettre · trois volets · lexique · dialogue · phrases · recherche · synthèse vocale · rail des lettres · collection et carnet
9. Retirer les commentaires « arabe dormant » **uniquement après** un test réel de tous ces écrans sur téléphone
10. 🟥 **Ne pas toucher aux six langues actives** pendant le branchement

**Et avant tout cela :** les 21 villes restantes, et une validation native de tout ce qui aura été écrit.

---

## LES 38 VILLES

| # | ville | pays | chapitre | arabe |
|---|---|---|---|---|
| 1 | La Baule | France | L'arrivée | ✅ |
| 2 | Le Morne | Maurice | La balade | ✅ |
| 3 | Connemara | Irlande | Le cheval | ✅ 🟥 *(à vérifier au dépôt)* |
| 4 | Newmarket | Angleterre | L'écurie | ✅ |
| 5 | Lambourn | Angleterre | Le pansage | ✅ |
| 6 | Walsall | Angleterre | Le matériel | ✅ |
| 7 | Aberystwyth | Pays de Galles | En selle | ✅ |
| 8 | Windsor | Angleterre | Le dressage | ✅ |
| 9 | Wellington | États-Unis | La tournée d'hiver | — |
| 10 | Hickstead | Angleterre | Le derby | — |
| 11 | Burghley | Angleterre | Le cross | — |
| 12 | Badminton | Angleterre | Le concours | ✅ |
| 13 | Kildare | Irlande | Les urgences | ✅ |
| 14 | Édimbourg | Écosse | Les dialogues | ✅ |
| 15 | Versailles | France | L'art équestre | 🟦 **en cours** |
| 16 | Saumur | France | Le Cadre Noir | — |
| 17 | Lamotte-Beuvron | France | Le poney | — |
| 18 | Golegã | Portugal | L'élevage | — |
| 19 | Fontainebleau | France | Les jeunes chevaux | — |
| 20 | Jerez | Espagne | Le cheval | — |
| 21 | Séville | Espagne | La présentation | — |
| 22 | Vejer | Espagne | L'intendance | 🟦 **à suivre** |
| 23 | Barcelone | Espagne | Voyager avec son cheval | ✅ |
| 24 | Oliva Nova | Espagne | S'engager | ✅ |
| 25 | Rome | Italie | La Coupe des Nations | — |
| 26 | Vérone | Italie | Le commerce | — |
| 27 | Warendorf | Allemagne | La formation | — |
| 28 | Aix-la-Chapelle | Allemagne | Le grand concours | ✅ |
| 29 | Dubaï | Émirats | L'endurance | — |
| 30 | Tokyo | Japon | La tradition | — |
| 31 | Tamworth | Australie | Le western | — |
| 32 | Taupō | Nouvelle-Zélande | Free riding | — |
| 33 | Buenos Aires | Argentine | Le polo | — |
| 34 | Lexington | États-Unis | Le haras | — |
| 35 | Santa Ynez | États-Unis | Le horsemanship | — |
| 36 | Spruce Meadows | Canada | Le froid | ✅ |
| 37 | Flyinge | Suède | La maréchalerie | ✅ |
| 38 | Clonbinane | Australie | L'apprentissage | ✅ |

---

## EN ATTENTE — LA SUITE

1. 🟥 **Vérifier `connemara.js` au dépôt** (alerte en tête de document) — bloque la correction 6.
2. 🟦 **Traduire Versailles, puis Vejer** (lexiques fournis le 25/08), puis les 19 villes restantes.
3. 🟦 **Relectures attendues** : `materiel-reserve` (22), `dressage-reserve` (56, avec arbitrage التغيير الطائر selon la règle الأبوييه).
4. 🟥 **Trancher** : la définition de `temperature` (Calgary) · `cours.js` pour `pause` · le `mots.ar` de `licol` · la variante du mot d'accueil d'Oliva · l'harmonisation منحدر التحميل au Morne.
5. À valider par relecture : les familles créées le 24/08, `TH_LIB` (23 objectifs), et l'arabe de `licol` modifié le 25/08 dans `ecurie.js`.
6. 🟥 **Aucune validation par un arabophone natif** sur l'ensemble du chantier.

---

*À tenir à jour à chaque ville traduite. Vérifier les NEUF points avant de cocher.*
