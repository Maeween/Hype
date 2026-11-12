# Consignes de traduction PERSAN (fa) — appli Hype

Hype est une appli française pour cavaliers (équitation, Galops FFE, concours, écurie, chevaux, IA « Hey Baby »).
Tu traduis des textes de l'interface et du contenu vers le **persan (farsi d'Iran)**.

## Fichiers
- Entrée : `outils/fa/lots/lot-NNN.json` = liste d'objets `{ "i": numéro, "fr": "texte français", "en": "texte anglais" }`.
  Le **français est l'original** : il fait foi pour le sens. L'anglais aide. Si `en` est vide, traduis depuis `fr`.
- Sortie : `outils/fa/lots/lot-NNN.fa.json` = UN objet JSON `{ "numéro": "traduction persane", ... }`
  avec **une entrée pour chaque numéro du lot**, rien d'autre. JSON valide, UTF-8, caractères persans écrits tels quels.
- Après chaque fichier, vérifie-le : `python3 -c "import json,sys; d=json.load(open(sys.argv[1])); L=json.load(open(sys.argv[2])); m=[x['i'] for x in L if str(x['i']) not in d]; print(len(d), 'manquants:', m[:10])" lot-NNN.fa.json lot-NNN.json` (depuis outils/fa/lots). Corrige s'il en manque.
- Ne modifie AUCUN autre fichier. Pas de git. Pas de publication.
- Écris chaque lot dans son fichier dès qu'il est fini (pas tout à la fin). Pour un gros lot, tu peux écrire le fichier en plusieurs fois avec un petit script Python qui fusionne.

## Règles de traduction
1. **Tutoiement** partout (« تو », verbes à la 2e personne du singulier), ton chaleureux et simple. Exception : textes juridiques (conditions générales, mentions légales, donateurs de l'association) → forme polie « شما ».
2. **Conserver exactement** : les accolades et variables (`{n}`, `{nom}`, `%s`, `$1`…), les balises HTML (`<b>`, `<br>`…), les émojis, les nombres (chiffres latins 0-9, ne pas convertir en chiffres persans), les adresses web, les noms propres, les marques.
3. **Espaces au début / à la fin** : les reproduire à l'identique (ces textes sont souvent des morceaux de phrase collés à d'autres).
4. Ponctuation persane : `?` → `؟`, `,` → `،`, `;` → `؛`. Guillemets « » conservés.
5. Ne traduis PAS : Hype, Hey Baby, Premium, FFE, SIF, Crystal, APY, Mux, Stripe, noms de chevaux, de clubs, de personnes, de lieux, sigles (CSO, CCE, BPJEPS, DEJEPS, DES, AE, BP…).
6. Si un texte est un code de langue/locale (ex. `en-GB`, `fr-FR`, `en-US`) → mets `fa-IR-u-ca-gregory`. Si c'est un drapeau émoji de la langue → mets `IR`.
7. Articles seuls (« Le », « Les », « THE ») → mets le caractère invisible ZWNJ (U+200C, `"‌"` en JSON) car le persan n'a pas d'article.
8. Mois : ژانویه، فوریه، مارس، آوریل، مه، ژوئن، ژوئیه، اوت، سپتامبر، اکتبر، نوامبر، دسامبر (calendrier grégorien).
9. Le masculin générique « cavalier » → سوارکار (le persan n'a pas de genre, parfait).
10. Rester fidèle : ne rien ajouter, ne rien résumer, ne pas « améliorer ». Garder les sauts de ligne `\n`.
11. Exactitude équestre : en équitation, en position d'équilibre, le poids descend dans les talons (jamais « debout sur les étriers »).

## Glossaire imposé (cohérence)
| Français | Persan |
|---|---|
| Galop (diplôme FFE, niveau 1 à 9) | گالوپ (ex. گالوپ 3) |
| galop (allure) | چهارنعل |
| trot | یورتمه |
| pas (allure) | قدم |
| arrêt | توقف |
| cavalier / cavaliers | سوارکار / سوارکاران |
| cheval / chevaux | اسب / اسب‌ها |
| poney | پونی |
| jument | مادیان |
| hongre | اسب اخته |
| étalon | اسب نر (نریان) |
| poulain | کره‌اسب |
| écurie (club, structure) | اصطبل |
| club | باشگاه |
| concours / compétition | مسابقه |
| épreuve (concours) | رده |
| reprise de dressage | برنامهٔ درساژ |
| dressage | درساژ |
| saut d'obstacles / CSO | پرش با مانع (CSO) |
| complet / CCE | سه‌روزه (CCE) |
| obstacle | مانع |
| parcours | مسیر |
| robe (couleur du cheval) | رنگ پوشش |
| bai | کهر |
| alezan | کرند |
| gris | خاکستری (ابرش) |
| noir | سیاه |
| pie | ابلق |
| pansage | تیمار |
| brosse / étrille | برس / قشو |
| sabot / pied | سم |
| fer / ferrure | نعل / نعل‌بندی |
| maréchal-ferrant | نعل‌بند |
| vétérinaire | دامپزشک |
| embouchure / mors | دهنه |
| filet (bride) | افسار |
| selle | زین |
| étrier | رکاب |
| rênes | عنان |
| sangle | تنگ |
| licol | کله‌گی |
| guêtres | ساق‌بند |
| couverture | پتوی اسب |
| paddock / pré | پادوک / چراگاه |
| carrière / manège | میدان سوارکاری / سالن سوارکاری |
| moniteur / enseignant | مربی |
| propriétaire | مالک |
| demi-pension | نیمه‌پانسیون |
| quiz | آزمونک |
| examen | آزمون |
| cours (leçon) | درس |
| théorie | دانش نظری |
| palmarès | افتخارات |
| classement | رده‌بندی |
| podium | سکو |
| points | امتیاز |
| fil (d'actualité) | فید |
| publier / publication | انتشار / پست |
| j'aime | پسندیدن / پسند |
| abonnement | اشتراک |
| compte | حساب |
| profil | نمایه |
| se connecter | ورود |
| créer mon compte | ساخت حساب |
| Médias (photos/vidéos) | رسانه‌ها |
| Vidéothèque | ویدیوتک |
| Communauté | جامعه |
| Team Compétition | تیم مسابقه |
| Agenda | تقویم |
| santé & soins | سلامت و مراقبت |
