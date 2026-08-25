# SUIVI — LANGUE ARABE
### Linguae · état du chantier `ar`
*Mis à jour le 24/08/2026 — fusion des deux conversations (celle-ci prend le relais)*

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
| **Connemara** — Le cheval | 82 | 2 passes |
| **Édimbourg** — Les urgences du cavalier | 80 | 2 passes |
| **Newmarket** — L'écurie | 74 | 2 passes |
| **Lambourn** — Le pansage | 70 | 1 passe |
| **Spruce Meadows** — Le froid | 60 | 3 passes |
| **Le Morne** — La balade | 57 | 2 passes |
| **Clonbinane** — L'apprentissage | 51 | 3 passes |

**1436 entrées traduites** (dont 96 dans quatre fichiers de réserve non chargés : pansage 13, jour J 5, filet 22, dressage 56). 🟥 Aucune validée par un arabophone.

✅ **Les dix villes ont été relues au moins une fois.**

✅ **Les cinq villes demandées le 24/08 sont faites** : Le Morne, Connemara, Newmarket, Lambourn, Aberystwyth.

---

## 🟥 FUSION DU 24/08 — DEUX CONVERSATIONS EN PARALLÈLE

Badminton et Oliva ont été traduites dans une seconde conversation, **sur une copie antérieure des fichiers** : la `lingo.html` finale de la première conversation (?v=77) ne contenait rien de ce travail, et réciproquement. **Fusion faite** : base = fichiers de la première conversation, réinjection intégrale de Badminton + Oliva (versions post-relecture). `VER` → **?v=78**.

🟥 **`hype-lingo-villes.js` reste à fusionner.** La version de la première conversation (avec l'arabe de Connemara, Newmarket, Lambourn, Aberystwyth, Kildare, Édimbourg) n'a pas été fournie. La lettre et les volets de **Badminton** n'existent que dans une copie fondée sur l'ancienne base — **ne pas pousser cette copie-là**, elle écraserait quatre villes. Dès réception du bon `villes.js`, y greffer Badminton (7 entrées, ancres connues).

**Anomalies structurelles relevées (pas un sujet arabe, à trancher un jour) :**
- `ACCUEIL_CHAP` : clés orphelines `concours`, `urgences`, `dialogues` depuis le découpage du 18/08 ; `rome`, `urgences-vet`, `urgences-med` absentes, et **rien pour Aachen non plus** (Rome, Kildare, Édimbourg et Aix-la-Chapelle n'ont pas de mot d'accueil). `oliva` créée le 24/08 — texte de Claude validé dans son principe ; le relecteur propose une variante (« Avant d'entrer en piste, il faut d'abord entrer dans la liste. Vérifie tout deux fois. ») — à trancher.
- 🟥 **24/08 (Flyinge/Barcelone)** : **dix familles `COLL_NOM` absentes de toutes les langues** (bug du point 8) — créées en sept langues, textes de Claude **à valider** ; sept familles existantes complétées en arabe. **Le chapeau (`PHRASES_FIN`) couvre 29 villes sur 38** : Flyinge, Barcelone et 7 autres n'en ont dans aucune langue — chantier français, pas arabe. **La table d'objectifs `TH_LIB`** (« voyager avec son cheval », 23 entrées) a reçu son arabe le 24/08 sur validation Blandine — dormante comme le reste, glossaire des relectures appliqué. Le nom de chapitre de Flyinge disait البيطرة (médecine vétérinaire) — corrigé en حدادة الخيل, **confirmé par le relecteur le 24/08**. ⚠️ La famille `deroule` (partagée entre chapitres) a été traduite سير الرحلة sur instruction de la relecture Barcelone — à revoir si une ville de dressage l'utilise un jour. Familles complétées le 24/08 au soir : `selle`, `filet`, `mouvements` (حركات الترويض), `notation` ; `tenue` créée en sept langues (réserve du dressage, à valider). Le mot d'accueil du chapitre matériel a reçu son arabe.
- `COLL_NOM` : **quatre clés dupliquées** (`alerte`, `cavalier`, `cheval-urg`, `jour-j`), traductions en/ja divergentes ; la seconde écrase la première en silence.

---

## 🟥 LE TROU DU 24/08 — SEIZE VILLES SANS `ETAPES_I18N`

Découvert en vérifiant l'objet de collection du Morne. **Seize villes sur 38 n'avaient aucune entrée** dans `ETAPES_I18N` : leur nom de chapitre et leur souvenir s'affichaient **en français dans les six langues**, depuis leur création.

Maurice, Burghley, Golegã, Fontainebleau, Barcelone, Rome, Vérone, Dubaï, Tokyo, Tamworth, Buenos Aires, Lexington, Santa Ynez, Spruce Meadows, Flyinge, Clonbinane.

**Ce n'était pas un sujet arabe.** C'était un trou pour toutes les cavalières non francophones, invisible en naviguant en français. **32 textes écrits** en sept langues, les 38 villes sont maintenant complètes en six langues.

⚠️ C'est le deuxième défaut de ce type après `COLL_NOM`. Les deux ne se voient qu'en changeant de langue.

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

**Les points 5, 7, 8 et 9 ont chacun été oubliés au moins une fois.** Ils ne se voient pas à l'écran tant que l'arabe n'est pas activé — sauf le 8, qui casse **immédiatement** les six autres langues.

---

## 🟥 LE BUG DU 23/08 — LES MOTS EN FRANÇAIS

Blandine : *« j'ai lancé les mots de la ville australienne et ils étaient en français »*.

**Cause :** `COLL_NOM` traduit les noms de familles de mots. Le code fait `tx(COLL_NOM[c.coll])`, qui retombe sur le français quand la clé n'existe pas. J'avais inventé les familles `science` et `nature` pour Clonbinane sans les déclarer. Kildare (7 familles) et Édimbourg (6) avaient le même défaut.

**Corrigé** : 13 familles ajoutées à `COLL_NOM`, les 17 utilisées sont désormais toutes couvertes. `VER` → `?v=73`.

⚠️ **Ce bug touchait les six langues, pas seulement l'arabe.** Une ville neuve dont les `coll` ne sont pas déclarés affiche ses familles en français partout. C'est le point 8 ci-dessus.

---

## RÈGLES D'ÉCRITURE

- Arabe standard moderne
- 🟥 **Aucun signe vocalique.** Ne pas en réintroduire au coup par coup
- 🟥 **Les consignes au FÉMININ singulier** (le club s'adresse à une cavalière) ; **la lettre au MASCULIN** (le narrateur est le même dans les 38 villes). Cette distinction a été violée deux fois
- **Formulation simple et descriptive** quand le terme technique n'est pas sûr — décrire juste vaut mieux que nommer faux
- Pour les chapitres de secours : **consignes courtes, sans tournure élégante**, avec l'exception du danger immédiat

---

## LE CIRCUIT DE RELECTURE

1. Je traduis, je livre les fichiers
2. Je produis **une fiche unique par ville** — `ARABE-<ville>.md`, sections A à F, numérotation continue
3. Blandine la fait relire par une autre source
4. La relecture revient par numéros, avec texte de remplacement et motif
5. J'applique, je régénère la fiche

**Une seule fiche par ville.** Il y en a eu six pour trois villes avant regroupement — c'était ingérable.

---

## 🟥 CE QUE LA RELECTURE ARABE A TROUVÉ DANS LE FRANÇAIS

**Onze corrections du texte source, dans les six langues.** C'est devenu le bénéfice principal du chantier : traduire force à relire chaque affirmation.

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
| Badminton | « prendre l'option ne coûte jamais de pénalités » | trop absolu — un refus préalable reste pénalisé |
| Badminton | « des pénalités seconde par seconde » | dépend du barème (FEI : fractions de point) |
| Badminton | « l'obstacle est LA dernière épreuve » | vrai à Badminton, pas dans tous les formats |
| Badminton | « le relief épuise bien plus que la hauteur » | non mesurable, trop absolu |
| Badminton | « deux cartons en un an = suspendu » | à rattacher au règlement de la fédération |
| Badminton | « convertir un niveau en hauteur, jamais en mot » | la technicité et le format comptent aussi |
| Badminton | « un jour ou trois jours » | les formats modernes sont plus variés |
| Oliva | « il faut une licence du pays » | exigences selon la fédération et le niveau (FEI) |
| Oliva | « le steward a autorité pour éliminer » | il saisit le jury, ne décide pas seul |
| Oliva | « frais jamais remboursés, règle partout » | dépend du règlement, du motif, des dates |
| Oliva | « pas d'engagement tardif sur un grand concours » | possible si règlement et places le permettent |
| Oliva | « deux numéros, sinon élimination » | modalités variables selon les compétitions |
| Oliva | « monter de hauteur plus simple que descendre » | pas universel |
| Oliva | « on vérifie au bureau la veille » | souvent en ligne aujourd'hui |
| Oliva | « membership = la seule exigence britannique » | varie selon discipline, niveau, day tickets |
| Oliva | « au chronomètre OU au barème A » | fausse opposition — un barème A peut être au chrono |
| 🟥 Barcelone | **dialogue E84–E86 : « ferme le pont » puis « attache-le » puis « vérifie la barre »** | **ORDRE DANGEREUX** — l'ordre sûr est barre de recul → attache → pont |
| Barcelone | déf. de « la pause » : marche au pas, rênes longues | **vient d'un cours d'équitation**, pas du transport |
| Barcelone | déf. de « la température » : Canada, Calgary, bulletins météo | **vient du chapitre du froid**, rien à voir avec Barcelone |
| Barcelone | « 4 h de route fatiguent autant qu'une séance » | équivalence non démontrée |
| Barcelone | « chaque protection cède avant le cheval » | trop absolu, peut être dangereux |
| Barcelone | « jamais un cheval en liberté avec un licol » | il existe des licols de sécurité conçus pour céder |
| Barcelone | « le protège-queue jamais directement sur les crins » | faux en règle générale |
| Barcelone | « contrôlé à l'entrée de tout transport » | pas systématique |
| Barcelone | « un Américain dit trailer pour les deux » / « jamais van » | horse van existe |
| Barcelone | « toujours ouvrir l'avant, jamais à reculons » | pas universel — certains chevaux descendent à reculons |
| Barcelone | « attaché ferme = blessé à la nuque » | risque réel, conséquence pas automatique |
| Barcelone | « on ne débarque pas » à l'aire de repos / « attendre avant d'ouvrir » | interdictions/règles trop absolues, l'attente porte fermée peut être dangereuse en chaleur |
| Barcelone | « accrocher le filet assez haut » | il faut aussi une position de tête confortable |

✅ **Les 16 corrections Badminton/Oliva ont été APPLIQUÉES aux six langues le 24/08** (validation Blandine), chirurgicalement — seule la phrase fautive a changé dans chaque langue. Lexiques passés en `?l=2`, `VER` → `?v=79`.

Plus deux incohérences de contenu : « quatre nations » / « cinq nations » entre deux fichiers, et le chapitre d'Édimbourg qui s'appelait encore « Les dialogues ».

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
| la rampe du van | منحدر المقطورة |
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
| la commotion cérébrale | ارتجاج الدماغ |
| la nuque | مؤخرة الرقبة |
| ne pas bouger | لا تتحركي |
| *forward horse* | حصان ذو اندفاع طبيعي |
| *genuine horse* | حصان موثوق وطيب الطباع |
| 🟥 les rênes | الأعنة · العنان |
| 🟥 le filet, la bride | اللجام |
| le licol | الرسن |
| le trot enlevé | الخبب مع النهوض والجلوس |
| le lagon | البحيرة الشاطئية |
| le récif-barrière | الحاجز المرجاني |
| la marée basse · haute | الجزر · المد |
| le box | حجرة الحصان |
| la sellerie | غرفة السروج |
| le manège · la carrière | الميدان المغطى · الميدان المكشوف |
| la litière | الفرشة |
| le foin | الدريس |
| le concours complet / eventing | الفروسية الثلاثية |
| le cross | اختراق الضاحية · اختبار اختراق الضاحية |
| le dressage | الترويض |
| le concours | المسابقة |
| l'épreuve (the class) | الشوط |
| s'engager · l'engagement | التسجيل في المسابقة · التسجيل |
| le dossard | رقم المشاركة |
| le secrétariat | مكتب التسجيل · أمانة المسابقة |
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
| pieds nus (explications) | الحافر غير المنتعل / من دون حدوات |
| la reconnaissance du parcours | معاينة مسار الحواجز |
| l'appuyer | الأبوييه *(translittération — règle relecteur 24/08 : pour les termes internationaux de dressage sans équivalent arabe stabilisé, garder le terme translittéré et expliquer ensuite ; à arbitrer aussi pour التغيير الطائر et consorts à la relecture de la réserve du dressage)* |
| le véhicule de transport | مركبة النقل |

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

**Verdict sur le vocabulaire technique rare :** garder les **formulations descriptives**. Pour le matériel d'hiver et les termes vétérinaires, elles sont plus compréhensibles qu'un mot unique régional. Ne pas chercher à les raccourcir.

⚠️ **Piège à venir :** plusieurs textes disent « les six langues ». Avec l'arabe, ce sera faux. Kildare a déjà été corrigé en « toutes les langues disponibles » — à surveiller ailleurs.

---

## 🟥 CE QU'IL FAUDRA POUR ACTIVER — LA PROCÉDURE

*Établie en relecture le 24/08. La plus précise dont on dispose.*

🟥 **NE PAS se contenter d'ajouter `"ar"` à `LANGUES_UI`.** Cela ferait apparaître une langue à moitié branchée, avec de nombreux retours en français. Les tables suivantes n'ont aucune valeur `ar` à ce jour : `LANGUES_UI`, `LG_DRAPEAU`, `VOIX`, `LX_LANGUES`, `LANGUE_NOM`, et beaucoup de libellés d'interface.

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

**Et avant tout cela :** les 30 villes restantes, et une validation native de tout ce qui aura été écrit.

---

## LES 38 VILLES

| # | ville | pays | chapitre | arabe |
|---|---|---|---|---|
| 1 | La Baule | France | L'arrivée | ✅ |
| 2 | Le Morne | Maurice | La balade | ✅ |
| 3 | Connemara | Irlande | Le cheval | ✅ |
| 4 | Newmarket | Angleterre | L'écurie | ✅ |
| 5 | Lambourn | Angleterre | Le pansage | ✅ |
| 6 | Walsall | Angleterre | Le matériel | ✅ |
| 7 | Aberystwyth | Pays de Galles | En selle | ✅ |
| 8 | Windsor | Angleterre | Le dressage | ✅ |
| 9 | Wellington | États-Unis | La tournée d'hiver | — |
| 10 | Hickstead | Angleterre | Le derby | — |
| 11 | Burghley | Angleterre | Le cross | — |
| 12 | Badminton | Angleterre | Le concours | ✅ *(lettre+volets : villes.js à fusionner)* |
| 13 | Kildare | Irlande | Les urgences | ✅ |
| 14 | Édimbourg | Écosse | Les dialogues | ✅ |
| 15 | Versailles | France | L'art équestre | — |
| 16 | Saumur | France | Le Cadre Noir | — |
| 17 | Lamotte-Beuvron | France | Le poney | — |
| 18 | Golegã | Portugal | L'élevage | — |
| 19 | Fontainebleau | France | Les jeunes chevaux | — |
| 20 | Jerez | Espagne | Le cheval | — |
| 21 | Séville | Espagne | La présentation | — |
| 22 | Vejer | Espagne | L'intendance | — |
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

*À tenir à jour à chaque ville traduite. Vérifier les NEUF points avant de cocher.*


---

## POINT DE PASSATION — 24/08/2026 AU SOIR
Conversation pilote pleine. La suite se fait en nouvelle conversation avec **PASSATION-ARABE.md**. État : 17 villes · 1436 entrées · VER ?v=88 · relectures appliquées jusqu'à Aachen incluse (VER ?v=89). En vol : relecture Aachen annoncée, réserves filet et dressage chez le relecteur, Versailles et Vejer à traduire, feu vert français Barcelone en attente.
