/* HYPE ▸ 30/10/2026 — Page COMMUNAUTÉ V2 (EcranCommunauteV2), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~111 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranCommunauteV2() {
  var ctx = useApp();
  var setEcran = ctx.setEcran;
  var lg = ctx.langue || "fr";
  var h = React.createElement;
  /* traduction : le tr du contexte (objet 7 langues), repli sur la langue courante puis le francais — meme mecanisme que l Accueil V2 */
  function T2(o) { try { if (ctx && typeof ctx.tr === "function") return ctx.tr(o); } catch (eT) { } return o[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && o.en) || o.fr; }
  var TXT = {
    eb: { fr: "Le monde Hype", en: "The Hype world", es: "El mundo Hype", it: "Il mondo Hype", ja: "Hypeの世界", de: "Die Hype-Welt", ar: "عالم Hype", zh: "Hype 世界", nl: "De Hype-wereld", pt: "O mundo Hype", sv: "Hype-världen", ru: "Мир Hype", pl: "Świat Hype", ko: "Hype 월드" },   /* (981) */
    titre: { fr: "Communauté", en: "Community", es: "Comunidad", it: "Comunità", ja: "コミュニティ", de: "Community", ar: "المجتمع", zh: "社区", nl: "Community", pt: "Comunidade", sv: "Community", ru: "Сообщество", pl: "Społeczność", ko: "커뮤니티" },
    sous1: { fr: "Plus qu’une communauté,", en: "More than a community,", es: "Más que una comunidad,", it: "Più di una comunità,", ja: "コミュニティを超えて、", de: "Mehr als eine Community –", ar: "أكثر من مجتمع،", zh: "不只是一个社区，", nl: "Meer dan een community,", pt: "Mais que uma comunidade,", sv: "Mer än en community,", ru: "Больше, чем сообщество,", pl: "Więcej niż społeczność,", ko: "단순한 커뮤니티를 넘어," },
    sous2: { fr: "une passion qui nous unit.", en: "a passion that unites us.", es: "una pasión que nos une.", it: "una passione che ci unisce.", ja: "私たちをつなぐ情熱。", de: "eine Leidenschaft, die uns verbindet.", ar: "شغف يجمعنا.", zh: "更是把我们连在一起的热爱。", nl: "een passie die ons verbindt.", pt: "uma paixão que nos une.", sv: "en passion som förenar oss.", ru: "страсть, которая нас объединяет.", pl: "pasja, która nas łączy.", ko: "우리를 하나로 이어 주는 열정." },
    monde: { fr: "Monde Hype", en: "Hype World", es: "Mundo Hype", it: "Mondo Hype", ja: "Hypeワールド", de: "Hype-Welt", ar: "عالم Hype", zh: "Hype 世界", nl: "Hype-wereld", pt: "Mundo Hype", sv: "Hype-världen", ru: "Мир Hype", pl: "Świat Hype", ko: "Hype 월드" },
    mondeS: { fr: "Explore les cavaliers et les écuries du monde entier.", en: "Explore riders and stables from all over the world.", es: "Explora jinetes y cuadras de todo el mundo.", it: "Esplora cavalieri e scuderie di tutto il mondo.", ja: "世界中の騎手と廄舎を探索しよう。", de: "Entdecke Reiter und Ställe aus aller Welt.", ar: "اكتشفي الفرسان والإسطبلات من جميع أنحاء العالم.", zh: "探索来自世界各地的骑手和马厩。", nl: "Ontdek ruiters en stallen van over de hele wereld.", pt: "Explore cavaleiros e cocheiras do mundo inteiro.", sv: "Utforska ryttare och stall från hela världen.", ru: "Знакомься со всадниками и конюшнями со всего мира.", pl: "Poznawaj jeźdźców i stajnie z całego świata.", ko: "전 세계의 기수와 마구간을 만나 보세요." },
    stories: { fr: "Stories", en: "Stories", es: "Stories", it: "Stories", ja: "ストーリー", de: "Stories", ar: "القصص", zh: "快拍", nl: "Stories", pt: "Stories", sv: "Stories", ru: "Stories", pl: "Stories", ko: "스토리" },
    ecuriesS: { fr: "Actualit\u00e9s et moments de vie des \u00e9curies", en: "News and everyday moments from the stables", es: "Noticias y momentos de vida de las cuadras", it: "Notizie e momenti di vita delle scuderie", ja: "\u53a9\u820e\u306e\u30cb\u30e5\u30fc\u30b9\u3068\u65e5\u5e38", de: "Neuigkeiten und Alltag aus den St\u00e4llen", ar: "\u0623\u062e\u0628\u0627\u0631 \u0648\u0644\u062d\u0638\u0627\u062a \u0645\u0646 \u062d\u064a\u0627\u0629 \u0627\u0644\u0625\u0633\u0637\u0628\u0644\u0627\u062a", zh: "马厩的动态和生活点滴", nl: "Nieuws en dagelijkse momenten uit de stallen", pt: "Notícias e momentos do dia a dia das cocheiras", sv: "Nyheter och vardagsögonblick från stallen", ru: "Новости и моменты жизни конюшен", pl: "Nowości i codzienne chwile ze stajni", ko: "마구간 소식과 일상의 순간들" },   /* (995) */
    agendaS: { fr: "Concours, stages et \u00e9v\u00e9nements \u00e0 venir", en: "Upcoming shows, clinics and events", es: "Concursos, cursillos y eventos pr\u00f3ximos", it: "Concorsi, stage ed eventi in arrivo", ja: "\u4eca\u5f8c\u306e\u7af6\u6280\u4f1a\u30fb\u8b1b\u7fd2\u30fb\u30a4\u30d9\u30f3\u30c8", de: "Kommende Turniere, Lehrg\u00e4nge und Events", ar: "\u0645\u0633\u0627\u0628\u0642\u0627\u062a \u0648\u062f\u0648\u0631\u0627\u062a \u0648\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0642\u0627\u062f\u0645\u0629", zh: "即将举行的比赛、训练营和活动", nl: "Aankomende wedstrijden, clinics en evenementen", pt: "Competições, estágios e eventos que estão por vir", sv: "Kommande tävlingar, kurser och evenemang", ru: "Предстоящие соревнования, сборы и события", pl: "Nadchodzące zawody, warsztaty i wydarzenia", ko: "앞으로 열릴 대회, 클리닉, 이벤트" },   /* (996) */
    retourner: { fr: "Retourner la carte", en: "Flip the card", es: "Dar la vuelta a la tarjeta", it: "Gira la carta", ja: "\u30ab\u30fc\u30c9\u3092\u88cf\u8fd4\u3059", de: "Karte umdrehen", ar: "\u0642\u0644\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", zh: "翻转卡片", nl: "Draai de kaart om", pt: "Virar o cartão", sv: "Vänd kortet", ru: "Перевернуть карточку", pl: "Odwróć kartę", ko: "카드 뒤집기" },
    voirPlusPub: { fr: "Voir plus de publications", en: "See more posts", es: "Ver m\u00e1s publicaciones", it: "Vedi altri post", ja: "\u3082\u3063\u3068\u898b\u308b", de: "Weitere Beitr\u00e4ge", ar: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a", zh: "查看更多发布", nl: "Meer berichten bekijken", pt: "Ver mais publicações", sv: "Se fler inlägg", ru: "Показать ещё публикации", pl: "Zobacz więcej publikacji", ko: "게시물 더 보기" },   /* (1000) */
    carPrec: { fr: "Pr\u00e9c\u00e9dent", en: "Previous", es: "Anterior", it: "Precedente", ja: "\u524d\u3078", de: "Zur\u00fcck", ar: "\u0627\u0644\u0633\u0627\u0628\u0642", zh: "上一个", nl: "Vorige", pt: "Anterior", sv: "Föregående", ru: "Предыдущий", pl: "Poprzedni", ko: "이전" },   /* (994) */
    carSuiv: { fr: "Suivant", en: "Next", es: "Siguiente", it: "Successivo", ja: "\u6b21\u3078", de: "Weiter", ar: "\u0627\u0644\u062a\u0627\u0644\u064a", zh: "下一步", nl: "Volgende", pt: "Próximo", sv: "Nästa", ru: "Далее", pl: "Dalej", ko: "다음" },
    voirTout: { fr: "Voir tout", en: "See all", es: "Ver todo", it: "Vedi tutto", ja: "すべて見る", de: "Alle anzeigen", ar: "عرض الكل", zh: "查看全部", nl: "Alles bekijken", pt: "Ver tudo", sv: "Visa alla", ru: "Смотреть все", pl: "Zobacz wszystko", ko: "전체 보기" }, /* reserve aux builds suivants (aucune destination encore) */
    /* (602) A decouvrir */
    decouvrir: { fr: "\u00c0 d\u00e9couvrir", en: "Discover", es: "Por descubrir", it: "Da scoprire", ja: "\u767a\u898b", de: "Entdecken", ar: "\u0644\u0644\u0627\u0643\u062a\u0634\u0627\u0641", zh: "去发现", nl: "Ontdekken", pt: "Para descobrir", sv: "Upptäck", ru: "Открой для себя", pl: "Do odkrycia", ko: "둘러보기" },
    nouveauxT: { fr: "Nouveaux profils", en: "New profiles", es: "Nuevos perfiles", it: "Nuovi profili", ja: "\u65b0\u3057\u3044\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb", de: "Neue Profile", ar: "\u0645\u0644\u0641\u0627\u062a \u062c\u062f\u064a\u062f\u0629", zh: "新面孔", nl: "Nieuwe profielen", pt: "Novos perfis", sv: "Nya profiler", ru: "Новые профили", pl: "Nowe profile", ko: "새 프로필" },
    nouveauxS: { fr: "Des cavaliers qui viennent de nous rejoindre", en: "Riders who just joined us", es: "Jinetes que acaban de unirse", it: "Cavalieri appena arrivati", ja: "\u65b0\u3057\u304f\u53c2\u52a0\u3057\u305f\u9a0e\u624b", de: "Reiter, die gerade dazugekommen sind", ar: "\u0641\u0631\u0633\u0627\u0646 \u0627\u0646\u0636\u0645\u0648\u0627 \u0625\u0644\u064a\u0646\u0627 \u0644\u0644\u062a\u0648", zh: "刚刚加入我们的骑手", nl: "Ruiters die zich net bij ons hebben aangesloten", pt: "Cavaleiros que acabaram de chegar", sv: "Ryttare som nyss har gått med", ru: "Всадники, которые только что к нам присоединились", pl: "Jeźdźcy, którzy właśnie do nas dołączyli", ko: "방금 합류한 기수들" },
    suivreT: { fr: "Cavali\u00e8res \u00e0 suivre", en: "Riders to follow", es: "Jinetes a seguir", it: "Cavaliere da seguire", ja: "\u30d5\u30a9\u30ed\u30fc\u3057\u305f\u3044\u9a0e\u624b", de: "Reiterinnen zum Folgen", ar: "\u0641\u0627\u0631\u0633\u0627\u062a \u062a\u0633\u062a\u062d\u0642 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629", zh: "值得关注的骑手", nl: "Ruiters om te volgen", pt: "Amazonas para seguir", sv: "Ryttare att följa", ru: "Всадницы, на которых стоит подписаться", pl: "Amazonki, które warto obserwować", ko: "팔로우해 볼 기수" },
    suivreS: { fr: "Des profils qui pourraient t\u2019inspirer", en: "Profiles that might inspire you", es: "Perfiles que podr\u00edan inspirarte", it: "Profili che potrebbero ispirarti", ja: "\u30a4\u30f3\u30b9\u30d4\u30ec\u30fc\u30b7\u30e7\u30f3\u306b\u306a\u308b\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb", de: "Profile, die dich inspirieren k\u00f6nnten", ar: "\u0645\u0644\u0641\u0627\u062a \u0642\u062f \u062a\u0644\u0647\u0645\u0643", zh: "可能会启发你的人", nl: "Profielen die je kunnen inspireren", pt: "Perfis que podem te inspirar", sv: "Profiler som kan inspirera dig", ru: "Профили, которые могут тебя вдохновить", pl: "Profile, które mogą cię zainspirować", ko: "영감을 줄 수 있는 프로필" },
    /* (604) Dans les ecuries */
    ecuries: { fr: "Dans les \u00e9curies", en: "In the stables", es: "En las cuadras", it: "Nelle scuderie", ja: "\u5ec4\u820e\u3067\u306f", de: "In den St\u00e4llen", ar: "\u0641\u064a \u0627\u0644\u0625\u0633\u0637\u0628\u0644\u0627\u062a", zh: "马厩动态", nl: "In de stallen", pt: "Nas cocheiras", sv: "I stallen", ru: "В конюшнях", pl: "W stajniach", ko: "마구간 이야기" },
    reduire: { fr: "R\u00e9duire", en: "Show less", es: "Reducir", it: "Riduci", ja: "\u9589\u3058\u308b", de: "Weniger", ar: "\u062a\u0635\u063a\u064a\u0631", zh: "收起", nl: "Minder tonen", pt: "Mostrar menos", sv: "Visa mindre", ru: "Свернуть", pl: "Zwiń", ko: "접기" },
    /* (659) « A l agenda » */
    agenda: { fr: "\u00c0 l\u2019agenda", en: "On the agenda", es: "En la agenda", it: "In agenda", ja: "\u4e88\u5b9a", de: "Im Kalender", ar: "\u0641\u064a \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f", zh: "日程安排", nl: "In de agenda", pt: "Na agenda", sv: "På agendan", ru: "В календаре", pl: "W kalendarzu", ko: "일정" },
    tStage: { fr: "Stage", en: "Clinic", es: "Cursillo", it: "Stage", ja: "\u8b1b\u7fd2", de: "Lehrgang", ar: "\u062a\u062f\u0631\u064a\u0628", zh: "训练营", nl: "Clinic", pt: "Estágio", sv: "Kurs", ru: "Сбор", pl: "Warsztaty", ko: "클리닉" },
    tConcours: { fr: "Concours", en: "Show", es: "Concurso", it: "Concorso", ja: "\u7af6\u6280\u4f1a", de: "Turnier", ar: "\u0645\u0633\u0627\u0628\u0642\u0629", zh: "比赛", nl: "Wedstrijd", pt: "Competição", sv: "Tävling", ru: "Соревнования", pl: "Zawody", ko: "대회" },
    tSortie: { fr: "Sortie", en: "Outing", es: "Salida", it: "Uscita", ja: "\u5916\u51fa", de: "Ausritt", ar: "\u062e\u0631\u062c\u0629", zh: "外出活动", nl: "Uitje", pt: "Passeio", sv: "Utflykt", ru: "Выезд", pl: "Wyjazd", ko: "나들이" },
    pub1: { fr: "publication", en: "post", es: "publicaci\u00f3n", it: "pubblicazione", ja: "\u4ef6\u306e\u6295\u7a3f", de: "Beitrag", ar: "\u0645\u0646\u0634\u0648\u0631", zh: "条发布", nl: "bericht", pt: "publicação", sv: "inlägg", ru: "публикация", pl: "publikacja", ko: "게시물" },
    pubN: { fr: "publications", en: "posts", es: "publicaciones", it: "pubblicazioni", ja: "\u4ef6\u306e\u6295\u7a3f", de: "Beitr\u00e4ge", ar: "\u0645\u0646\u0634\u0648\u0631\u0627\u062a", zh: "条发布", nl: "berichten", pt: "publicações", sv: "inlägg", ru: "публикаций", pl: "publikacje", ko: "게시물" },
    ph1: { fr: "photo", en: "photo", es: "foto", it: "foto", ja: "\u679a\u306e\u5199\u771f", de: "Foto", ar: "\u0635\u0648\u0631\u0629", zh: "张照片", nl: "foto", pt: "foto", sv: "foto", ru: "фото", pl: "zdjęcie", ko: "사진" },
    phN: { fr: "photos", en: "photos", es: "fotos", it: "foto", ja: "\u679a\u306e\u5199\u771f", de: "Fotos", ar: "\u0635\u0648\u0631", zh: "张照片", nl: "foto's", pt: "fotos", sv: "foton", ru: "фото", pl: "zdjęcia", ko: "사진" },
    /* (605) Le fil */
    fil: { fr: "Le fil", en: "The feed", es: "El feed", it: "Il feed", ja: "\u30d5\u30a3\u30fc\u30c9", de: "Der Feed", ar: "\u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a", zh: "动态", nl: "De tijdlijn", pt: "O feed", sv: "Flödet", ru: "Лента", pl: "Tablica", ko: "피드" },
    oTous: { fr: "Tous", en: "All", es: "Todos", it: "Tutti", ja: "\u3059\u3079\u3066", de: "Alle", ar: "\u0627\u0644\u0643\u0644", zh: "全部", nl: "Alles", pt: "Todos", sv: "Alla", ru: "Все", pl: "Wszystkie", ko: "전체" },
    oAmis: { fr: "Amis", en: "Friends", es: "Amigos", it: "Amici", ja: "\u53cb\u9054", de: "Freunde", ar: "\u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621", zh: "好友", nl: "Vrienden", pt: "Amigos", sv: "Vänner", ru: "Друзья", pl: "Znajomi", ko: "친구" },
    oEcuries: { fr: "\u00c9curies", en: "Stables", es: "Cuadras", it: "Scuderie", ja: "\u5ec4\u820e", de: "St\u00e4lle", ar: "\u0627\u0644\u0625\u0633\u0637\u0628\u0644\u0627\u062a", zh: "马厩", nl: "Stallen", pt: "Cocheiras", sv: "Stall", ru: "Конюшни", pl: "Stajnie", ko: "마구간" },
    oActivite: { fr: "Activit\u00e9", en: "Activity", es: "Actividad", it: "Attivit\u00e0", ja: "\u6d3b\u52d5" /* (616) « 活動 » : « アクティビティ » ne tient pas dans un onglet */, de: "Aktivit\u00e4t", ar: "\u0627\u0644\u0646\u0634\u0627\u0637", zh: "动态", nl: "Activiteit", pt: "Atividade", sv: "Aktivitet", ru: "Активность", pl: "Aktywność", ko: "활동" },
    /* (618) drapeau en haut */
    langue: { fr: "Langue", en: "Language", es: "Idioma", it: "Lingua", ja: "\u8a00\u8a9e", de: "Sprache", ar: "\u0627\u0644\u0644\u063a\u0629", zh: "语言", nl: "Taal", pt: "Idioma", sv: "Språk", ru: "Язык", pl: "Język", ko: "언어" },
    /* (609) Activite */
    aRejoint: { fr: "{n} a rejoint Hype", en: "{n} joined Hype", es: "{n} se uni\u00f3 a Hype", it: "{n} \u00e8 ora su Hype", ja: "{n} \u304c Hype \u306b\u53c2\u52a0\u3057\u307e\u3057\u305f", de: "{n} ist Hype beigetreten", ar: "{n} \u0627\u0646\u0636\u0645\u062a \u0625\u0644\u0649 Hype", zh: "{n} 加入了 Hype", nl: "{n} is lid geworden van Hype", pt: "{n} entrou no Hype", sv: "{n} har gått med i Hype", ru: "{n} присоединяется к Hype", pl: "{n} dołącza do Hype", ko: "{n}님이 Hype에 가입했어요" },
    aCheval: { fr: "{n} a ajout\u00e9 un cheval : {c}", en: "{n} added a horse: {c}", es: "{n} a\u00f1adi\u00f3 un caballo: {c}", it: "{n} ha aggiunto un cavallo: {c}", ja: "{n} \u304c\u99ac\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f\uff1a{c}", de: "{n} hat ein Pferd hinzugef\u00fcgt: {c}", ar: "{n} \u0623\u0636\u0627\u0641\u062a \u062d\u0635\u0627\u0646\u064b\u0627: {c}", zh: "{n} 添加了一匹马：{c}", nl: "{n} heeft een paard toegevoegd: {c}", pt: "{n} adicionou um cavalo: {c}", sv: "{n} har lagt till en häst: {c}", ru: "{n} добавляет лошадь: {c}", pl: "{n} dodaje konia: {c}", ko: "{n}님이 말을 추가했어요: {c}" },
    aPublie: { fr: "{n} a publi\u00e9 dans {e}", en: "{n} posted in {e}", es: "{n} public\u00f3 en {e}", it: "{n} ha pubblicato in {e}", ja: "{n} \u304c {e} \u306b\u6295\u7a3f\u3057\u307e\u3057\u305f", de: "{n} hat in {e} gepostet", ar: "{n} \u0646\u0634\u0631\u062a \u0641\u064a {e}", zh: "{n} 在 {e} 发布了内容", nl: "{n} heeft iets geplaatst in {e}", pt: "{n} publicou em {e}", sv: "{n} har publicerat i {e}", ru: "{n} публикует в {e}", pl: "{n} publikuje w {e}", ko: "{n}님이 {e}에 게시했어요" },
    aResultat: { fr: "{n} a publi\u00e9 un r\u00e9sultat", en: "{n} posted a result", es: "{n} public\u00f3 un resultado", it: "{n} ha pubblicato un risultato", ja: "{n} \u304c\u7d50\u679c\u3092\u6295\u7a3f\u3057\u307e\u3057\u305f", de: "{n} hat ein Ergebnis gepostet", ar: "{n} \u0646\u0634\u0631\u062a \u0646\u062a\u064a\u062c\u0629", zh: "{n} 发布了一条成绩", nl: "{n} heeft een resultaat geplaatst", pt: "{n} publicou um resultado", sv: "{n} har publicerat ett resultat", ru: "{n} публикует результат", pl: "{n} publikuje wynik", ko: "{n}님이 결과를 올렸어요" },
    aHaut: { fr: "{n} a d\u00e9bloqu\u00e9 un haut fait", en: "{n} unlocked an achievement", es: "{n} desbloque\u00f3 un logro", it: "{n} ha sbloccato un traguardo", ja: "{n} \u304c\u5b9f\u7e3e\u3092\u89e3\u9664\u3057\u307e\u3057\u305f", de: "{n} hat einen Erfolg freigeschaltet", ar: "{n} \u0641\u062a\u062d\u062a \u0625\u0646\u062c\u0627\u0632\u064b\u0627", zh: "{n} 解锁了一项成就", nl: "{n} heeft een prestatie ontgrendeld", pt: "{n} desbloqueou uma conquista", sv: "{n} har låst upp en bedrift", ru: "{n} открывает достижение", pl: "{n} odblokowuje osiągnięcie", ko: "{n}님이 업적을 달성했어요" },
    aRdv: { fr: "{n} a ajout\u00e9 un rendez-vous : {t}", en: "{n} added an event: {t}", es: "{n} a\u00f1adi\u00f3 una cita: {t}", it: "{n} ha aggiunto un appuntamento: {t}", ja: "{n} \u304c\u4e88\u5b9a\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f\uff1a{t}", de: "{n} hat einen Termin hinzugef\u00fcgt: {t}", ar: "{n} \u0623\u0636\u0627\u0641\u062a \u0645\u0648\u0639\u062f\u064b\u0627: {t}", zh: "{n} 添加了一个约定：{t}", nl: "{n} heeft een afspraak toegevoegd: {t}", pt: "{n} adicionou um compromisso: {t}", sv: "{n} har lagt till ett evenemang: {t}", ru: "{n} добавляет встречу: {t}", pl: "{n} dodaje wydarzenie: {t}", ko: "{n}님이 일정을 추가했어요: {t}" },
    aSouvenir: { fr: "{n} a ajout\u00e9 un souvenir \u00e0 {e}", en: "{n} added a memory to {e}", es: "{n} a\u00f1adi\u00f3 un recuerdo a {e}", it: "{n} ha aggiunto un ricordo a {e}", ja: "{n} \u304c {e} \u306b\u601d\u3044\u51fa\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f", de: "{n} hat {e} eine Erinnerung hinzugef\u00fcgt", ar: "{n} \u0623\u0636\u0627\u0641\u062a \u0630\u0643\u0631\u0649 \u0625\u0644\u0649 {e}", zh: "{n} 为 {e} 添加了一段回忆", nl: "{n} heeft een herinnering toegevoegd aan {e}", pt: "{n} adicionou uma lembrança a {e}", sv: "{n} har lagt till ett minne i {e}", ru: "{n} добавляет воспоминание к {e}", pl: "{n} dodaje wspomnienie do {e}", ko: "{n}님이 {e}에 추억을 추가했어요" },
    aPhotoCheval: { fr: "{n} a ajout\u00e9 une photo \u00e0 {c}", en: "{n} added a photo to {c}", es: "{n} a\u00f1adi\u00f3 una foto a {c}", it: "{n} ha aggiunto una foto a {c}", ja: "{n} \u304c {c} \u306b\u5199\u771f\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f", de: "{n} hat {c} ein Foto hinzugef\u00fcgt", ar: "{n} \u0623\u0636\u0627\u0641\u062a \u0635\u0648\u0631\u0629 \u0625\u0644\u0649 {c}", zh: "{n} 为 {c} 添加了一张照片", nl: "{n} heeft een foto toegevoegd aan {c}", pt: "{n} adicionou uma foto a {c}", sv: "{n} har lagt till ett foto i {c}", ru: "{n} добавляет фото к {c}", pl: "{n} dodaje zdjęcie do {c}", ko: "{n}님이 {c}의 사진을 추가했어요" },
    aPubCheval: { fr: "{n} a publi\u00e9 sur la fiche de {c}", en: "{n} posted on {c}\u2019s page", es: "{n} public\u00f3 en la ficha de {c}", it: "{n} ha pubblicato sulla scheda di {c}", ja: "{n} \u304c {c} \u306e\u30da\u30fc\u30b8\u306b\u6295\u7a3f\u3057\u307e\u3057\u305f", de: "{n} hat auf der Seite von {c} gepostet", ar: "{n} \u0646\u0634\u0631\u062a \u0641\u064a \u0635\u0641\u062d\u0629 {c}", zh: "{n} 在 {c} 的档案上发布了内容", nl: "{n} heeft iets geplaatst op de pagina van {c}", pt: "{n} publicou na página de {c}", sv: "{n} har publicerat på {c}s sida", ru: "{n} публикует на странице {c}", pl: "{n} publikuje na stronie konia {c}", ko: "{n}님이 {c}의 페이지에 게시했어요" },
    actVide: { fr: "Rien de nouveau pour l\u2019instant.", en: "Nothing new yet.", es: "Nada nuevo por ahora.", it: "Niente di nuovo per ora.", ja: "\u307e\u3060\u65b0\u3057\u3044\u52d5\u304d\u306f\u3042\u308a\u307e\u305b\u3093\u3002", de: "Noch nichts Neues.", ar: "\u0644\u0627 \u062c\u062f\u064a\u062f \u062d\u062a\u0649 \u0627\u0644\u0622\u0646.", zh: "暂时没有新内容。", nl: "Nog niets nieuws.", pt: "Nada de novo por enquanto.", sv: "Inget nytt just nu.", ru: "Пока ничего нового.", pl: "Na razie nic nowego.", ko: "아직 새로운 소식이 없어요." },
    actErreur: { fr: "Impossible de charger l\u2019activit\u00e9.", en: "Could not load the activity.", es: "No se pudo cargar la actividad.", it: "Impossibile caricare l\u2019attivit\u00e0.", ja: "\u30a2\u30af\u30c6\u30a3\u30d3\u30c6\u30a3\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\u3002", de: "Aktivit\u00e4t konnte nicht geladen werden.", ar: "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0646\u0634\u0627\u0637.", zh: "无法加载动态。", nl: "De activiteit kon niet worden geladen.", pt: "Não foi possível carregar a atividade.", sv: "Det gick inte att ladda aktiviteten.", ru: "Не удалось загрузить активность.", pl: "Nie udało się załadować aktywności.", ko: "활동을 불러오지 못했어요." },
    tcMin: { fr: "{n} min", en: "{n} min", es: "{n} min", it: "{n} min", ja: "{n}\u5206", de: "{n} Min.", ar: "{n} \u062f", zh: "{n} 分钟", nl: "{n} min", pt: "{n} min", sv: "{n} min", ru: "{n} мин", pl: "{n} min", ko: "{n}분" },
    tcH: { fr: "{n} h", en: "{n} h", es: "{n} h", it: "{n} h", ja: "{n}\u6642\u9593", de: "{n} Std.", ar: "{n} \u0633", zh: "{n}小时", nl: "{n} h", pt: "{n} h", sv: "{n} h", ru: "{n} h", pl: "{n} h", ko: "{n} h" },
    tcJ: { fr: "{n} j", en: "{n} d", es: "{n} d", it: "{n} g", ja: "{n}\u65e5", de: "{n} Tg.", ar: "{n} \u064a", zh: "{n}天", nl: "{n} d", pt: "{n} d", sv: "{n} d", ru: "{n} d", pl: "{n} d", ko: "{n} d" },
    /* (608) le fil branche */
    filErreur: { fr: "Impossible de charger le fil.", en: "Could not load the feed.", es: "No se pudo cargar el feed.", it: "Impossibile caricare il feed.", ja: "\u30d5\u30a3\u30fc\u30c9\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\u3002", de: "Feed konnte nicht geladen werden.", ar: "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a.", zh: "无法加载动态。", nl: "De tijdlijn kon niet worden geladen.", pt: "Não foi possível carregar o feed.", sv: "Det gick inte att ladda flödet.", ru: "Не удалось загрузить ленту.", pl: "Nie udało się załadować tablicy.", ko: "피드를 불러오지 못했어요." },
    filVide: { fr: "Aucune publication pour l\u2019instant.", en: "No posts yet.", es: "Ninguna publicaci\u00f3n por ahora.", it: "Nessuna pubblicazione per ora.", ja: "\u307e\u3060\u6295\u7a3f\u306f\u3042\u308a\u307e\u305b\u3093\u3002", de: "Noch keine Beitr\u00e4ge.", ar: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u0634\u0648\u0631\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", zh: "暂时还没有发布。", nl: "Nog geen berichten.", pt: "Nenhuma publicação por enquanto.", sv: "Inga inlägg ännu.", ru: "Пока нет публикаций.", pl: "Na razie brak publikacji.", ko: "아직 게시물이 없어요." },
    filChargement: { fr: "Chargement\u2026", en: "Loading\u2026", es: "Cargando\u2026", it: "Caricamento\u2026", ja: "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026", de: "Wird geladen\u2026", ar: "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", zh: "加载中…", nl: "Laden…", pt: "Carregando…", sv: "Laddar…", ru: "Загрузка…", pl: "Ładowanie…", ko: "불러오는 중…" },
    voirSuite: { fr: "Voir la suite", en: "See more", es: "Ver m\u00e1s", it: "Vedi altro", ja: "\u7d9a\u304d\u3092\u898b\u308b", de: "Mehr anzeigen", ar: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f", zh: "查看更多", nl: "Meer bekijken", pt: "Ver mais", sv: "Se mer", ru: "Показать ещё", pl: "Zobacz więcej", ko: "더 보기" },
    replier: { fr: "Replier", en: "Collapse", es: "Reducir", it: "Riduci", ja: "\u9589\u3058\u308b", de: "Einklappen", ar: "\u0637\u064a", zh: "收起", nl: "Inklappen", pt: "Recolher", sv: "Fäll ihop", ru: "Свернуть", pl: "Zwiń", ko: "접기" },
    supprimer: { fr: "Supprimer", en: "Delete", es: "Eliminar", it: "Elimina", ja: "\u524a\u9664", de: "L\u00f6schen", ar: "\u062d\u0630\u0641", zh: "删除", nl: "Verwijderen", pt: "Excluir", sv: "Ta bort", ru: "Удалить", pl: "Usuń", ko: "삭제" },
    supprimerQ: { fr: "Supprimer ce post ?", en: "Delete this post?", es: "\u00bfBorrar esta publicaci\u00f3n?", it: "Eliminare questo post?", ja: "\u3053\u306e\u6295\u7a3f\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f", de: "Diesen Beitrag l\u00f6schen?", ar: "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u061f", zh: "删除这条帖子吗？", nl: "Dit bericht verwijderen?", pt: "Excluir este post?", sv: "Ta bort det här inlägget?", ru: "Удалить этот пост?", pl: "Usunąć ten post?", ko: "이 게시물을 삭제할까요?" },
    supprimerKo: { fr: "Suppression impossible : ", en: "Could not delete: ", es: "No se pudo borrar: ", it: "Impossibile eliminare: ", ja: "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\uff1a", de: "L\u00f6schen nicht m\u00f6glich: ", ar: "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0630\u0641: ", zh: "无法删除：", nl: "Verwijderen niet gelukt: ", pt: "Não foi possível excluir: ", sv: "Det gick inte att ta bort: ", ru: "Не удалось удалить: ", pl: "Nie można usunąć: ", ko: "삭제할 수 없어요: " },
    supprimerAucune: { fr: "Suppression refus\u00e9e : rien n\u2019a \u00e9t\u00e9 supprim\u00e9 (droits insuffisants ?). Le post reste affich\u00e9.", en: "Deletion refused: nothing was deleted (insufficient rights?). The post stays visible.", es: "Eliminaci\u00f3n rechazada: no se borr\u00f3 nada (\u00bfpermisos insuficientes?). La publicaci\u00f3n sigue visible.", it: "Eliminazione rifiutata: nulla \u00e8 stato eliminato (permessi insufficienti?). Il post resta visibile.", ja: "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\uff1a\u4f55\u3082\u524a\u9664\u3055\u308c\u3066\u3044\u307e\u305b\u3093\uff08\u6a29\u9650\u4e0d\u8db3\uff1f\uff09\u3002\u6295\u7a3f\u306f\u8868\u793a\u3055\u308c\u305f\u307e\u307e\u3067\u3059\u3002", de: "L\u00f6schen abgelehnt: nichts wurde gel\u00f6scht (fehlende Rechte?). Der Beitrag bleibt sichtbar.", ar: "\u0631\u064f\u0641\u0636 \u0627\u0644\u062d\u0630\u0641: \u0644\u0645 \u064a\u064f\u062d\u0630\u0641 \u0623\u064a \u0634\u064a\u0621 (\u0635\u0644\u0627\u062d\u064a\u0627\u062a \u063a\u064a\u0631 \u0643\u0627\u0641\u064a\u0629\u061f). \u064a\u0628\u0642\u0649 \u0627\u0644\u0645\u0646\u0634\u0648\u0631 \u0638\u0627\u0647\u0631\u064b\u0627.", zh: "删除被拒绝：没有任何内容被删除（权限不足？）。帖子仍会显示。", nl: "Verwijderen geweigerd: er is niets verwijderd (onvoldoende rechten?). Het bericht blijft zichtbaar.", pt: "Exclusão recusada: nada foi excluído (permissões insuficientes?). O post continua visível.", sv: "Borttagningen nekades: ingenting togs bort (otillräcklig behörighet?). Inlägget ligger kvar.", ru: "Удаление отклонено: ничего не удалено (недостаточно прав?). Пост остаётся на месте.", pl: "Usuwanie odrzucone: nic nie zostało usunięte (brak uprawnień?). Post pozostaje widoczny.", ko: "삭제가 거부되어 아무것도 지워지지 않았어요 (권한이 부족한가요?). 게시물은 그대로 남아 있어요." },
    likeKo: { fr: "Le j\u2019aime n\u2019a pas pu \u00eatre enregistr\u00e9 : ", en: "Could not save the like: ", es: "No se pudo guardar el me gusta: ", it: "Impossibile salvare il mi piace: ", ja: "\u3044\u3044\u306d\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\uff1a", de: "Gef\u00e4llt-mir nicht gespeichert: ", ar: "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0625\u0639\u062c\u0627\u0628: ", zh: "无法保存点赞：", nl: "De like kon niet worden opgeslagen: ", pt: "Não foi possível registrar a curtida: ", sv: "Gillningen kunde inte sparas: ", ru: "Не удалось сохранить лайк: ", pl: "Nie udało się zapisać polubienia: ", ko: "좋아요를 저장하지 못했어요: " },
    detClassement: { fr: "Classement", en: "Placing", es: "Clasificaci\u00f3n", it: "Classifica", ja: "\u9806\u4f4d", de: "Platzierung", ar: "\u0627\u0644\u062a\u0631\u062a\u064a\u0628", zh: "排名", nl: "Klassement", pt: "Classificação", sv: "Rankning", ru: "Рейтинг", pl: "Klasyfikacja", ko: "순위" },
    detEpreuve: { fr: "\u00c9preuve", en: "Class", es: "Prueba", it: "Gara", ja: "\u7a2e\u76ee", de: "Pr\u00fcfung", ar: "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", zh: "比赛项目", nl: "Proef", pt: "Prova", sv: "Klass", ru: "Маршрут", pl: "Konkurencja", ko: "경기" },
    detDate: { fr: "Date", en: "Date", es: "Fecha", it: "Data", ja: "\u65e5\u4ed8", de: "Datum", ar: "\u0627\u0644\u062a\u0627\u0631\u064a\u062e", zh: "日期", nl: "Datum", pt: "Data", sv: "Datum", ru: "Дата", pl: "Data", ko: "날짜" },
    detCheval: { fr: "Cheval", en: "Horse", es: "Caballo", it: "Cavallo", ja: "\u99ac", de: "Pferd", ar: "\u0627\u0644\u062d\u0635\u0627\u0646", zh: "马", nl: "Paard", pt: "Cavalo", sv: "Häst", ru: "Лошадь", pl: "Koń", ko: "말" },
    detVictoires: { fr: "Victoires", en: "Wins", es: "Victorias", it: "Vittorie", ja: "\u512a\u52dd", de: "Siege", ar: "\u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", zh: "冠军", nl: "Overwinningen", pt: "Vitórias", sv: "Segrar", ru: "Победы", pl: "Zwycięstwa", ko: "우승" },
    replier: { fr: "Replier \u25b4", en: "Collapse \u25b4", es: "Reducir \u25b4", it: "Riduci \u25b4", ja: "\u9589\u3058\u308b \u25b4", de: "Einklappen \u25b4", ar: "\u0637\u064a \u25b4", zh: "收起 ▴", nl: "Inklappen ▴", pt: "Recolher ▴", sv: "Fäll ihop ▴", ru: "Свернуть ▴", pl: "Zwiń ▴", ko: "접기 ▴" },
    voirProfil: { fr: "Voir son profil", en: "See the profile", es: "Ver su perfil", it: "Vedi il profilo", ja: "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u898b\u308b", de: "Profil ansehen", ar: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0644\u0641", zh: "查看个人主页", nl: "Bekijk zijn/haar profiel", pt: "Ver o perfil", sv: "Se profilen", ru: "Смотреть профиль", pl: "Zobacz profil", ko: "프로필 보기" },
    voirResultats: { fr: "Voir ses r\u00e9sultats", en: "See the results", es: "Ver los resultados", it: "Vedi i risultati", ja: "\u6210\u7e3e\u3092\u898b\u308b", de: "Ergebnisse ansehen", ar: "\u0639\u0631\u0636 \u0627\u0644\u0646\u062a\u0627\u0626\u062c", zh: "查看他的成绩", nl: "Bekijk zijn/haar resultaten", pt: "Ver os resultados", sv: "Se resultaten", ru: "Смотреть результаты", pl: "Zobacz wyniki", ko: "결과 보기" },
    voirVideo: { fr: "Voir la vid\u00e9o", en: "Watch the video", es: "Ver el v\u00eddeo", it: "Guarda il video", ja: "\u52d5\u753b\u3092\u898b\u308b", de: "Video ansehen", ar: "\u0645\u0634\u0627\u0647\u062f\u0629 \u0627\u0644\u0641\u064a\u062f\u064a\u0648", zh: "观看视频", nl: "Bekijk de video", pt: "Ver o vídeo", sv: "Se videon", ru: "Смотреть видео", pl: "Zobacz film", ko: "영상 보기" },
    cCours: { fr: "Concours", en: "Show", es: "Concurso", it: "Concorso", ja: "\u7af6\u6280\u4f1a", de: "Turnier", ar: "\u0645\u0633\u0627\u0628\u0642\u0629", zh: "比赛", nl: "Wedstrijd", pt: "Competição", sv: "Tävling", ru: "Соревнования", pl: "Zawody", ko: "대회" },
    cPalm: { fr: "Palmar\u00e8s", en: "Record", es: "Palmar\u00e9s", it: "Palmar\u00e8s", ja: "\u6210\u7e3e", de: "Erfolgsliste", ar: "\u0633\u062c\u0644 \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a", zh: "战绩", nl: "Palmares", pt: "Histórico de resultados", sv: "Meritlista", ru: "Достижения", pl: "Dorobek sportowy", ko: "수상 기록" },
    cHaut: { fr: "Haut fait", en: "Achievement", es: "Logro", it: "Traguardo", ja: "\u5b9f\u7e3e", de: "Erfolg", ar: "\u0625\u0646\u062c\u0627\u0632", zh: "成就", nl: "Prestatie", pt: "Conquista", sv: "Bedrift", ru: "Достижение", pl: "Osiągnięcie", ko: "업적" },
    hautDeb: { fr: "Haut fait d\u00e9bloqu\u00e9", en: "Achievement unlocked", es: "Logro desbloqueado", it: "Traguardo sbloccato", ja: "\u5b9f\u7e3e\u89e3\u9664", de: "Erfolg freigeschaltet", ar: "\u062a\u0645 \u0641\u062a\u062d \u0625\u0646\u062c\u0627\u0632", zh: "解锁了成就", nl: "Prestatie ontgrendeld", pt: "Conquista desbloqueada", sv: "Bedrift upplåst", ru: "Достижение разблокировано", pl: "Osiągnięcie odblokowane", ko: "업적 달성" },
    resultat: { fr: "R\u00e9sultat", en: "Result", es: "Resultado", it: "Risultato", ja: "\u7d50\u679c", de: "Ergebnis", ar: "\u0646\u062a\u064a\u062c\u0629", zh: "成绩", nl: "Resultaat", pt: "Resultado", sv: "Resultat", ru: "Результат", pl: "Wynik", ko: "결과" },
    cavaliere: { fr: "Cavali\u00e8re", en: "Rider", es: "Jinete", it: "Cavaliera", ja: "\u30e9\u30a4\u30c0\u30fc", de: "Reiterin", ar: "\u0641\u0627\u0631\u0633\u0629", zh: "骑手", nl: "Ruiter", pt: "Amazona", sv: "Ryttare", ru: "Всадница", pl: "Amazonka", ko: "기수" },
    palm1: { fr: "{n} a rendu son palmar\u00e8s \u00e0 {c}", en: "{n} gave {c} their record back", es: "{n} le devolvi\u00f3 su palmar\u00e9s a {c}", it: "{n} ha restituito il palmar\u00e8s a {c}", ja: "{c} \u306e\u6210\u7e3e\u304c {n} \u306b\u3088\u3063\u3066\u623b\u308a\u307e\u3057\u305f", de: "{n} hat {c} die Erfolgsliste zur\u00fcckgegeben", ar: "{n} \u0623\u0639\u0627\u062f\u062a \u0633\u062c\u0644 \u0625\u0646\u062c\u0627\u0632\u0627\u062a {c}", zh: "{n} 把战绩归还给了 {c}", nl: "{n} gaf het palmares terug aan {c}", pt: "{n} devolveu o histórico de resultados a {c}", sv: "{n} har gett {c} tillbaka sin meritlista", ru: "{n} возвращает лошади {c} её достижения", pl: "{n} – przywrócono dorobek konia {c}", ko: "{n}님이 {c}의 수상 기록을 되찾아 줬어요" },
    nEcuries: { fr: "{k} \u00e9curies", en: "{k} stables", es: "{k} cuadras", it: "{k} scuderie", ja: "{k} \u53a9\u820e", de: "{k} St\u00e4lle", ar: "{k} \u0625\u0633\u0637\u0628\u0644\u0627\u062a", zh: "{k} 个马厩", nl: "{k} stallen", pt: "{k} cocheiras", sv: "{k} stall", ru: "конюшен: {k}", pl: "Stajnie: {k}", ko: "마구간 {k}곳" },   /* (877) */
    aChevaux: { fr: "{n} a ajout\u00e9 {k} chevaux", en: "{n} added {k} horses", es: "{n} a\u00f1adi\u00f3 {k} caballos", it: "{n} ha aggiunto {k} cavalli", ja: "{n} \u304c {k} \u982d\u306e\u99ac\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f", de: "{n} hat {k} Pferde hinzugef\u00fcgt", ar: "{n} \u0623\u0636\u0627\u0641 {k} \u062e\u064a\u0648\u0644", zh: "{n} 添加了 {k} 匹马", nl: "{n} heeft {k} paarden toegevoegd", pt: "{n} adicionou {k} cavalos", sv: "{n} har lagt till {k} hästar", ru: "{n} добавляет лошадей: {k}", pl: "{n} dodaje konie: {k}", ko: "{n}님이 말 {k}마리를 추가했어요" },   /* (988) */
    palmN: { fr: "{n} a rendu leur palmar\u00e8s \u00e0 {k} chevaux", en: "{n} gave {k} horses their record back", es: "{n} devolvi\u00f3 su palmar\u00e9s a {k} caballos", it: "{n} ha restituito il palmar\u00e8s a {k} cavalli", ja: "{n} \u304c {k} \u982d\u306e\u6210\u7e3e\u3092\u623b\u3057\u307e\u3057\u305f", de: "{n} hat {k} Pferden die Erfolgsliste zur\u00fcckgegeben", ar: "{n} \u0623\u0639\u0627\u062f\u062a \u0633\u062c\u0644 \u0625\u0646\u062c\u0627\u0632\u0627\u062a {k} \u062e\u064a\u0648\u0644", zh: "{n} 把战绩归还给了 {k} 匹马", nl: "{n} gaf {k} paarden hun palmares terug", pt: "{n} devolveu o histórico de resultados a {k} cavalos", sv: "{n} har gett {k} hästar tillbaka sin meritlista", ru: "{n} возвращает достижения лошадям ({k})", pl: "{n} – przywrócono dorobek {k} koni", ko: "{n}님이 말 {k}마리의 수상 기록을 되찾아 줬어요" },
    uRes: { fr: "r\u00e9sultats", en: "results", es: "resultados", it: "risultati", ja: "\u4ef6", de: "Ergebnisse", ar: "\u0646\u062a\u0627\u0626\u062c", zh: "成绩", nl: "resultaten", pt: "resultados", sv: "resultat", ru: "результатов", pl: "wyniki", ko: "결과" },
    uCla: { fr: "classements", en: "placings", es: "clasificaciones", it: "piazzamenti", ja: "\u5165\u8cde", de: "Platzierungen", ar: "\u062a\u0635\u0646\u064a\u0641\u0627\u062a", zh: "排名", nl: "klasseringen", pt: "classificações", sv: "placeringar", ru: "мест в рейтинге", pl: "miejsca", ko: "순위" },
    uVic: { fr: "victoires", en: "wins", es: "victorias", it: "vittorie", ja: "\u512a\u52dd", de: "Siege", ar: "\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", zh: "冠军", nl: "overwinningen", pt: "vitórias", sv: "segrar", ru: "побед", pl: "zwycięstwa", ko: "우승" },
    tMaintenant: { fr: "\u00e0 l\u2019instant", en: "just now", es: "ahora mismo", it: "adesso", ja: "\u305f\u3063\u305f\u4eca", de: "gerade eben", ar: "\u0627\u0644\u0622\u0646", zh: "刚刚", nl: "zojuist", pt: "agora mesmo", sv: "nyss", ru: "только что", pl: "przed chwilą", ko: "방금" },
    tMin: { fr: "il y a {n} min", en: "{n} min ago", es: "hace {n} min", it: "{n} min fa", ja: "{n}\u5206\u524d", de: "vor {n} Min.", ar: "\u0645\u0646\u0630 {n} \u062f", zh: "{n} 分钟前", nl: "{n} min geleden", pt: "há {n} min", sv: "för {n} min sedan", ru: "{n} мин назад", pl: "{n} min temu", ko: "{n}분 전" },
    tH: { fr: "il y a {n} h", en: "{n} h ago", es: "hace {n} h", it: "{n} h fa", ja: "{n}\u6642\u9593\u524d", de: "vor {n} Std.", ar: "\u0645\u0646\u0630 {n} \u0633", zh: "{n} 小时前", nl: "{n} uur geleden", pt: "há {n} h", sv: "för {n} tim sedan", ru: "{n} ч назад", pl: "{n} godz. temu", ko: "{n}시간 전" },
    tJ: { fr: "il y a {n} j", en: "{n} d ago", es: "hace {n} d", it: "{n} g fa", ja: "{n}\u65e5\u524d", de: "vor {n} Tg.", ar: "\u0645\u0646\u0630 {n} \u064a", zh: "{n} 天前", nl: "{n} d geleden", pt: "há {n} d", sv: "för {n} d sedan", ru: "{n} дн. назад", pl: "{n} dn. temu", ko: "{n}일 전" }
  };
  /* Les signaux de descente (window.__communauteCible = "decouvrir" / "classement") sont lus et effaces comme en V1 ;
     au Build 1 il n y a pas encore de bloc ou descendre : on arrive en haut, le signal ne traine pas. */
  /* (602) A decouvrir : la carte touchee se deplie SOUS les deux cartes (rendu provisoire : les rails existants de la V1,
     NouveauxCavaliers et HypeADecouvrir, charges seulement a ce moment-la — aucune requete a l ouverture de la page).
     « + Ajouter » de Mes amis (window.__communauteCible = "decouvrir") descend ici et ouvre « Cavalieres a suivre ». */
  var _dec = React.useState(null); var decOuvert = _dec[0], setDecOuvert = _dec[1];
  var refDecouvrir = React.useRef(null);
  React.useEffect(function () {
    var cibleD = null;
    try { cibleD = (typeof window !== "undefined") ? window.__communauteCible : null; window.__communauteCible = null; } catch (eC) { }
    /* (668) retour d une fiche de rendez-vous : « agenda » descend au bloc A l agenda, « activite » ouvre l onglet Activite du fil */
    if (cibleD === "agenda" || cibleD === "activite") {
      if (cibleD === "activite") setOngletFil("activite");
      var selR = cibleD === "agenda" ? '[data-com2="agenda"]' : '[data-com2="fil"]';
      function allerR() { try { var elR = document.querySelector(selR); if (elR) elR.scrollIntoView({ behavior: "auto", block: "start" }); } catch (eR1) { } }
      var tR1 = setTimeout(allerR, 250), tR2 = setTimeout(allerR, 1200);
      return function () { clearTimeout(tR1); clearTimeout(tR2); };
    }
    if (cibleD !== "decouvrir") return;
    try { window.__decouvrirOnglet = "suivre"; } catch (eW2) { } setEcran("decouvrir"); return;   /* (1051) ouvre la page A decouvrir sur « Cavalieres a suivre » */
    setDecOuvert("suivre");
    function allerD() { try { if (refDecouvrir.current) refDecouvrir.current.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (eD) { } }
    var tD1 = setTimeout(allerD, 150), tD2 = setTimeout(allerD, 700);
    return function () { clearTimeout(tD1); clearTimeout(tD2); };
  }, []);
  /* (604) Dans les ecuries : UNE lecture au montage (2 requetes), les 2 ecuries les plus recentes, « Voir tout » deplie les autres sur place. */
  var _ec = React.useState(null); var ecuries = _ec[0], setEcuries = _ec[1];
  var _et = React.useState(false); var ecuriesTout = _et[0], setEcuriesTout = _et[1];
  React.useEffect(function () {
    var vifE = true;
    hypeLireEcuriesActives().then(function (l) { if (vifE) setEcuries(l || []); }).catch(function () { if (vifE) setEcuries([]); });
    return function () { vifE = false; };
  }, []);
  function ouvrirEcurie(c) {
    try {
      if (c.cible.indexOf("ecurie:") === 0) { window.__filEcurieCible = c.cible; window.__filEcurieNom = c.nom; setEcran("actualites-ecurie"); return; }
      window.__guildeEcurie = c.nom; setEcran("guilde");
    } catch (eO) { }
  }
  /* (659) la carte d ecurie du visuel de reference : photo pleine, nom, avatars des autrices, compteur, chevron.
     petite = true : la meme en 64 % de large dans le rail des autres ecuries (apres « Voir tout »). */
  function carteEcurieImmersive(c, petite) {
    var sous = c.nbPosts + " " + T2(c.nbPosts > 1 ? TXT.pubN : TXT.pub1) + " \u00b7 " + c.nbPhotos + " " + T2(c.nbPhotos > 1 ? TXT.phN : TXT.ph1);
    var src = (typeof vignetteHype === "function") ? vignetteHype(c.img, petite ? 600 : 900, petite ? 300 : 520) : c.img;
    var avs = (c.avatars || []).slice(0, 4);
    return h("button", { key: "ec" + c.cle, type: "button", className: petite ? "com2-ecu-p" : "com2-ecu-g", "data-com2": "ecurie", "data-ecurie": c.cle, onClick: function () { ouvrirEcurie(c); } },
      h("img", { className: "com2-ecu-img", src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } }),
      h("span", { className: "com2-ecu-gv", "aria-hidden": "true" }),
      h("span", { className: "com2-ecu-gx" },
        h("span", { className: "com2-ecu-gt" }, c.nom),
        h("span", { className: "com2-ecu-gl" },
          avs.length ? h("span", { className: "com2-ecu-avs", "aria-hidden": "true" }, avs.map(function (a) { return h("span", { key: "av" + a.id, className: "com2-ecu-av", style: a.url ? { backgroundImage: "url(" + a.url + ")" } : null }, a.url ? null : a.lettre); })) : null,
          h("span", { className: "com2-ecu-gs" }, sous))),
      h("span", { className: "com2-ecu-chev", "aria-hidden": "true" }, icChev));
  }
  /* (659) « A l agenda » : UNE lecture au montage (hypeLireAgendaCommunaute), tous les clubs, par date. */
  var _ag = React.useState(null); var agenda = _ag[0], setAgenda = _ag[1];
  var _agt = React.useState(false); var agendaTout = _agt[0], setAgendaTout = _agt[1];
  React.useEffect(function () {
    var vifAg = true;
    hypeLireAgendaCommunaute().then(function (l) { if (vifAg) setAgenda(l || []); }).catch(function () { if (vifAg) setAgenda([]); });
    return function () { vifAg = false; };
  }, []);
  function ouvrirRdvCom(ev) { try { window.__guildeEcurie = ev.nomClub; window.__agendaFiche = ev.id; window.__agendaFicheRetour = "communaute"; window.__communauteCible = "agenda"; } catch (eR) { } setEcran("guilde"); }   /* (668) retour ici, sur le bloc agenda */   /* la page du club ouvre la fiche (meme chemin qu Activite) */
  function dateCarteAg(iso) {
    try {
      var d = new Date(String(iso).slice(0, 10) + "T12:00:00"); if (isNaN(d.getTime())) return { j: "", m: "" };
      var m = String(d.toLocaleDateString(LOC_DATE[lg] || "fr-FR", { month: "short" }) || "").replace(/\.$/, "");
      if (/^[A-Za-z\u00C0-\u024F]+$/.test(m)) m = m.toUpperCase() + ".";
      return { j: String(d.getDate()).padStart(2, "0"), m: m };
    } catch (e) { return { j: "", m: "" }; }
  }
  function typeAg(ev) { var t = String(ev.type || "").toLowerCase(); return t === "stage" ? T2(TXT.tStage) : t === "concours" ? T2(TXT.tConcours) : t === "sortie" ? T2(TXT.tSortie) : ""; }
  function imgAg(ev, w, hh) {
    if (!ev.img) return h("span", { className: "com2-ag-fond", "aria-hidden": "true" });
    return h("img", { className: "com2-ag-img", src: (typeof vignetteHype === "function") ? vignetteHype(ev.img, w, hh) : ev.img, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } });
  }
  function carteAgendaGrande(ev) {
    var dj = dateCarteAg(ev.date), ty = typeAg(ev);
    return h("button", { key: "ag" + ev.id, type: "button", className: "com2-ag-g", "data-com2": "agenda-ev", "data-ev": ev.id, onClick: function () { ouvrirRdvCom(ev); } },
      imgAg(ev, 900, 560),
      h("span", { className: "com2-ag-voile", "aria-hidden": "true" }),
      h("span", { className: "com2-ag-date" }, h("b", null, dj.j), h("i", null, dj.m)),
      h("span", { className: "com2-ag-x" },
        ty ? h("span", { className: "com2-ag-badge" }, ty) : null,
        h("span", { className: "com2-ag-t" }, ev.titre),
        ev.nomClub ? h("span", { className: "com2-ag-c" }, ev.nomClub) : null,
        ev.lieu ? h("span", { className: "com2-ag-l" }, icEpingle, h("span", { style: { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" } }, ev.lieu)) : null),   /* (664) le lieu */
      h("span", { className: "com2-ag-chev", "aria-hidden": "true" }, icChev));
  }
  function carteAgendaPetite(ev) {
    var dj = dateCarteAg(ev.date);
    /* (664) carte compacte : date | titre | chevron, sans image (maquette) */
    return h("button", { key: "agp" + ev.id, type: "button", className: "com2-ag-p", "data-com2": "agenda-ev", "data-ev": ev.id, onClick: function () { ouvrirRdvCom(ev); } },
      imgAg(ev, 360, 520),   /* (689) l affiche, de nouveau visible */
      h("span", { className: "com2-ag-voile", "aria-hidden": "true" }),
      h("span", { className: "com2-ag-pd" }, h("b", null, dj.j), h("i", null, dj.m)),
      h("span", { className: "com2-ag-pt" }, ev.titre),
      h("span", { className: "com2-ag-chev", "aria-hidden": "true" }, icChev));
  }
  /* 10/10 (849) Blandine : « reproduis plutot le design exact des Events de la page Ecurie et tu n en laisses que 3 » — copie de carteEvH (EcranEcurieV2) */
  function carteAgendaEcurie(ev) {
    var CHx = "#C9A66B", IVx = "#F3EEE4", NOIRx = "#080A0B", SERIFx = "'Cormorant Garamond',Georgia,serif", Mx = "'Montserrat',sans-serif", rtlx = (lg === "ar");
    var d0 = null; try { d0 = new Date(String(ev.date || "").slice(0, 10) + "T12:00:00"); if (isNaN(d0.getTime())) d0 = null; } catch (eD) { d0 = null; }
    var jour = d0 ? String(d0.getDate()) : "";
    var mois = ""; try { mois = d0 ? String(d0.toLocaleDateString(LOC_DATE[lg] || "fr-FR", { month: "short" }) || "").replace(".", "") : ""; } catch (eM) { mois = ""; }
    var an = d0 ? String(d0.getFullYear()) : "";
    var typ = typeAg(ev);
    var img = (typeof ev.img === "string" && ev.img.trim()) ? ev.img.trim() : "";
    var src = img ? ((typeof vignetteHype === "function") ? vignetteHype(img, 360, 260) : img) : "";
    return h("button", { key: "age" + ev.id, type: "button", "data-com2": "agenda-ev", "data-ev": ev.id, onClick: function () { ouvrirRdvCom(ev); }, style: { display: "flex", alignItems: "stretch", width: "100%", height: 108, padding: 0, margin: 0, textAlign: "start", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(201,166,107,0.24)", background: "linear-gradient(135deg, #0C0F11 0%, " + NOIRx + " 60%, #050708 100%)", cursor: "pointer", color: IVx, fontVariantNumeric: "lining-nums" } },
      h("div", { style: { flex: "0 0 52px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgba(0,0,0,0.28)", borderInlineEnd: "1px solid rgba(201,166,107,0.18)" } },
        h("div", { style: { fontFamily: SERIFx, fontSize: 28, lineHeight: 1, color: IVx } }, jour),
        h("div", { style: { fontFamily: Mx, fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: CHx } }, mois),
        an ? h("div", { style: { fontFamily: Mx, fontSize: 9, letterSpacing: 0.6, color: "#8E8A80" } }, an) : null),
      src ? h("div", { style: { flex: "0 0 33%", position: "relative", overflow: "hidden" } },
        h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { if (eI.target.src !== img) eI.target.src = img; else eI.target.style.visibility = "hidden"; } catch (e2) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlx ? "270deg" : "90deg") + ", rgba(8,10,11,0) 55%, rgba(8,10,11,0.85) 92%, " + NOIRx + " 100%)" } })) : null,
      h("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px 2px 10px 10px" } },
        h("div", { dir: "auto", style: { fontFamily: SERIFx, fontSize: 14.5, fontWeight: 600, lineHeight: 1.18, color: IVx, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere", textAlign: "start" } }, ev.titre || ""),
        typ ? h("span", { style: { alignSelf: "flex-start", marginTop: 7, padding: "2px 8px", borderRadius: 4, background: CHx, color: "#15110A", fontFamily: Mx, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.9, textTransform: "uppercase" } }, typ) : null,
        ev.lieu ? h("div", { style: { marginTop: 7, display: "flex", alignItems: "center", gap: 5, minWidth: 0, color: "#8E8A80" } }, h("span", { style: { width: 12, height: 12, flex: "0 0 auto", display: "inline-flex" } }, React.cloneElement(icEpingle, { width: 12, height: 12 })),
          h("span", { dir: "auto", style: { fontFamily: Mx, fontSize: 11, color: "#BDB6AA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ev.lieu)) : null),
      h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", padding: "0 10px 0 4px" } },
        h("span", { "aria-hidden": "true", style: { width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.28)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: CHx, fontSize: 15, lineHeight: 1 } }, rtlx ? "\u2039" : "\u203A")));
  }
  /* (604) l ancienne carte 90 px, gardee pour reference (plus rendue depuis le 659) */
  function carteEcurie(c) {
    var sous = c.nbPosts + " " + T2(c.nbPosts > 1 ? TXT.pubN : TXT.pub1) + " \u00b7 " + c.nbPhotos + " " + T2(c.nbPhotos > 1 ? TXT.phN : TXT.ph1);
    var src = (typeof vignetteHype === "function") ? vignetteHype(c.img, 800, 300) : c.img;
    return h("button", { key: "ec" + c.cle, type: "button", className: "com2-ecu-c", "data-com2": "ecurie", onClick: function () { ouvrirEcurie(c); } },
      h("img", { className: "com2-ecu-img", src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } }),
      h("span", { className: "com2-ecu-voile", "aria-hidden": "true" }),
      h("span", { className: "com2-ecu-x" }, h("span", { className: "com2-ecu-t" }, c.nom), h("span", { className: "com2-ecu-s" }, sous)),
      h("span", { className: "com2-ecu-chev", "aria-hidden": "true" }, icChev));
  }
  /* (605) Le fil : 4 onglets (Tous / Amis / Ecuries / Activite). (608) les trois premiers branches, (609) Activite branche. Le « + » flottant reste masque (aucune publication generale propre n existe encore). */
  var _of = React.useState("tous"); var ongletFil = _of[0], setOngletFil = _of[1];
  var ONGLETS_FIL = [["tous", TXT.oTous], ["amis", TXT.oAmis], ["ecuries", TXT.oEcuries], ["activite", TXT.oActivite]];
  /* ═══ (608) BUILD 6 — LE FIL BRANCHE SUR LES MOTEURS EXISTANTS, sans y toucher : « Tous » = fil({ seulementSuivis:false })
     (resultats saisis + cartes de palmares importe), « Amis » = filAmis() (follows reciproques, resultats + cartes de palmares + hauts faits ;
     j aime charges depuis le 615), « Ecuries » = filEcurie()
     (cavalieres de ses ecuries, resultats + cartes + hauts faits). Nouveau dessin de carte (avatar, nom, date · contexte, texte,
     image, j aime / commentaires, menu « … »). Cibles des commentaires PRESERVEES : resultat:<id>, resultat:hf_<id>,
     import:<personne>:<lundi> ; likes (resultats) et likes_cartes (cartes) comme en V1. Le j aime repond sur place (plus de
     rechargement complet du fil a chaque coeur) ; un refus est dit et annule. « Activite » : build 7. « + » flottant : masque. */
  var _fp = React.useState(null); var filPosts = _fp[0], setFilPosts = _fp[1];       /* null = chargement */
  var _fe = React.useState(""); var filErreur = _fe[0], setFilErreur = _fe[1];
  var _fm = React.useState(null); var moiFil = _fm[0], setMoiFil = _fm[1];
  var _fo = React.useState(null); var menuPost = _fo[0], setMenuPost = _fo[1];
  var _fc = React.useState({}); var comOuverts = _fc[0], setComOuverts = _fc[1];
  /* (657) la publication depliee (une seule a la fois) et les chevaux lus a la demande pour la ligne « Cheval » */
  var _fpo = React.useState(null); var postOuvert = _fpo[0], setPostOuvert = _fpo[1];
  var _goa = React.useState({}); var groupesActOuverts = _goa[0], setGroupesActOuverts = _goa[1];   /* (988) groupes « a ajoute N chevaux » deplies */
  var _fpc = React.useState({}); var chevauxPost = _fpc[0], setChevauxPost = _fpc[1];
  var LOC_DATE = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" };
  function dateLongue(iso) { try { var d = new Date(iso); if (isNaN(d.getTime())) return ""; return d.toLocaleDateString(LOC_DATE[lg] || "fr-FR", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } }
  function basculerPost(post) {
    var dejaOuvert = (postOuvert === post.id);
    setPostOuvert(dejaOuvert ? null : post.id);
    if (!dejaOuvert) {
      try { setMenuPost(null); } catch (eM) { }
      var idCh = post.cheval_id || null;
      if (idCh && !chevauxPost[idCh] && typeof supa !== "undefined" && supa) {
        setChevauxPost(function (m) { var n = Object.assign({}, m); n[idCh] = { id: idCh, nom: "", enCours: true }; return n; });
        supa.from("chevaux").select("id, nom, photo_url").eq("id", idCh).maybeSingle().then(function (r) {
          var ch = (r && !r.error && r.data) ? r.data : { id: idCh, nom: "" };
          setChevauxPost(function (m) { var n = Object.assign({}, m); n[idCh] = ch; return n; });
        }, function () { setChevauxPost(function (m) { var n = Object.assign({}, m); n[idCh] = { id: idCh, nom: "" }; return n; }); });
      }
    }
  }
  var _fs = React.useState(false); var filPlus = _fs[0], setFilPlus = _fs[1];
  var LIM_FIL = 5;
  /* (669) LE FIL EN CARROUSEL. Blandine : « on garde un seul post visible et on peut faire glisser aux suivants ». Une carte
     a la fois (92 % de large, la suivante depasse un peu), glissement horizontal avec arret carte par carte, barre de position
     et compteur « 3 / 24 ». Quitter une carte depliee la replie. Toutes les publications lues sont dans le rail (plus de
     « Voir la suite » ici ; l onglet Activite garde sa liste). data-hscroll : le geste ne change pas d onglet de l appli. */
  var _fi = React.useState(0); var filIdx = _fi[0], setFilIdx = _fi[1];
  var refCarFil = React.useRef(null);
  function auDefilFil() {
    try {
      var el = refCarFil.current; if (!el) return;
      var cells = el.querySelectorAll(".com2-fil-cell"); if (!cells.length) return;
      /* (672) deroulement vertical : la cellule dont le haut est le plus proche du haut de la fenetre */
      var y = el.scrollTop, best = 0, dist = Infinity;
      for (var k = 0; k < cells.length; k++) { var d = Math.abs(cells[k].offsetTop - el.offsetTop - y); if (d < dist) { dist = d; best = k; } }
      if (best !== filIdx) {
        setFilIdx(best);
        /* la publication depliee se replie seulement si elle n est plus dans la cellule affichee (un tap pendant que la fenetre finit de se caler ne la referme pas) */
        var resteOuverte = false;
        if (postOuvert) { var posts = cells[best].querySelectorAll(".com2-post"); for (var q = 0; q < posts.length; q++) { if (posts[q].getAttribute("data-post") === String(postOuvert)) { resteOuverte = true; break; } } }
        if (!resteOuverte) setPostOuvert(null);
      }
    } catch (eDf) { }
  }
  /* (629) arriver sur un post precis depuis une notification : window.__postOuvrir = cible des reponses (resultat:<id>, import:…).
     Lu une fois au montage ; des que « Tous » est charge, le post est deplie (reponses ouvertes) et amene a l ecran. Un resultat
     plus ancien que les 50 du fil est relu seul en base et pose en tete (ses j aime y partent de 0, faute de les relire). */
  var refPostOuvrir = React.useRef(null);
  var _sp = React.useState(0); var signalPost = _sp[0], setSignalPost = _sp[1];
  function lirePostOuvrir() { try { if (typeof window !== "undefined" && window.__postOuvrir) { refPostOuvrir.current = String(window.__postOuvrir); window.__postOuvrir = null; return true; } } catch (ePO) { } return false; }
  React.useEffect(function () {
    lirePostOuvrir();
    /* la page peut etre DEJA montee quand la cloche (posee dessus) demande un post : elle previent par un evenement */
    function surSignal() { if (lirePostOuvrir()) { setOngletFil("tous"); setSignalPost(function (v) { return v + 1; }); } }
    try { window.addEventListener("hype:postOuvrir", surSignal); } catch (eL) { }
    return function () { try { window.removeEventListener("hype:postOuvrir", surSignal); } catch (eL2) { } };
  }, []);
  function allerAuPost(idP) {
    setTimeout(function () {
      try {
        var el = document.querySelector('.com2-post[data-post="' + String(idP).replace(/["\\]/g, "") + '"]');
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.boxShadow = "0 0 0 2px rgba(201,166,107,0.95)";
        setTimeout(function () { try { el.style.boxShadow = ""; } catch (e2) { } }, 2600);
      } catch (e1) { }
    }, 220);
  }
  React.useEffect(function () {
    var cibleP = refPostOuvrir.current;
    if (!cibleP || ongletFil !== "tous" || filPosts === null) return;
    var trouve = (filPosts || []).filter(function (p) { return p && cibleCom(p) === cibleP; })[0];
    if (trouve) {
      refPostOuvrir.current = null;
      var idx = filPosts.indexOf(trouve); if (idx >= LIM_FIL) setFilPlus(true);
      if (trouve.type !== "hautfait") setComOuverts(function (o) { var n = Object.assign({}, o); n[trouve.id] = true; return n; });
      allerAuPost(trouve.id);
      return;
    }
    var mR = /^resultat:([0-9a-f-]{20,})$/i.exec(cibleP);
    if (!mR || typeof supa === "undefined" || !supa) { refPostOuvrir.current = null; return; }
    refPostOuvrir.current = null;
    (async function () {
      try {
        var rS = await supa.from("resultats").select("*").eq("id", mR[1]).maybeSingle();
        var rowS = rS && !rS.error && rS.data;
        if (!rowS || (typeof estResultatAffichableEnFil === "function" && !estResultatAffichableEnFil(rowS))) return;
        var auteurS = { pseudo: "Cavalier", avatar_url: null };
        try { var rPS = await supa.from("profiles").select("id, pseudo, avatar_url, handle").eq("id", rowS.user_id).maybeSingle(); if (rPS && rPS.data) auteurS = rPS.data; } catch (ePS) { }
        var postS = Object.assign({}, rowS, { type: "resultat", auteur: auteurS, nbLikes: 0, jeLike: false });
        setFilPosts(function (l) { return [postS].concat((l || []).filter(function (p) { return p && p.id !== postS.id; })); });
        setComOuverts(function (o) { var n = Object.assign({}, o); n[postS.id] = true; return n; });
        allerAuPost(postS.id);
      } catch (eRS) { }
    })();
  }, [filPosts, ongletFil, signalPost]);
  /* (609) Activite : null = chargement ; { liste, erreur }. LIM_ACT lignes puis « Voir la suite (N) ». */
  var _ac = React.useState(null); var activite = _ac[0], setActivite = _ac[1];
  var LIM_ACT = 12;
  var refJeton = React.useRef(0);   /* ignore la reponse d un onglet quitte entre-temps */
  React.useEffect(function () { var ac = true; try { if (typeof utilisateurActuel === "function") utilisateurActuel().then(function (u) { if (ac) setMoiFil(u || null); }).catch(function () { }); } catch (e) { } return function () { ac = false; }; }, []);
  function chargerFil() {
    var jeton = ++refJeton.current;
    setFilPlus(false); setMenuPost(null); setComOuverts({}); setPostOuvert(null);   /* (657) */
    setFilIdx(0); try { if (refCarFil.current) refCarFil.current.scrollTop = 0; } catch (eSc) { }   /* (669, vertical au 672) */
    if (ongletFil === "activite") {
      setActivite(null);
      hypeLireActivite().then(function (r) { if (refJeton.current === jeton) setActivite(r || { liste: [], erreur: true }); })
        .catch(function () { if (refJeton.current === jeton) setActivite({ liste: [], erreur: true }); });
      return;
    }
    setFilPosts(null); setFilErreur("");
    var moteur = (ongletFil === "amis" && typeof filAmis === "function") ? filAmis()
      : (ongletFil === "ecuries" && typeof filEcurie === "function") ? filEcurie()
      : (typeof fil === "function") ? fil({ seulementSuivis: false }) : Promise.resolve({ data: [] });
    moteur.then(function (res) {
      if (refJeton.current !== jeton) return;
      if (res && res.error) { setFilErreur(T2(TXT.filErreur)); setFilPosts([]); }
      else {
        var lP = (res && res.data) || [];
        setFilPosts(lP);
        /* (669) les chevaux des publications (nom + photo) en UNE lecture : la photo de la fiche remplace une photo absente,
           et la ligne « Cheval » du detail n attend plus. */
        try {
          var idsCh = []; lP.forEach(function (p) { if (p && p.type !== "import" && p.cheval_id && idsCh.indexOf(p.cheval_id) === -1 && !chevauxPost[p.cheval_id]) idsCh.push(p.cheval_id); });
          if (idsCh.length && typeof supa !== "undefined" && supa) {
            supa.from("chevaux").select("id, nom, photo_url").in("id", idsCh.slice(0, 100)).then(function (rC) {
              if (refJeton.current !== jeton || !rC || rC.error || !rC.data) return;
              setChevauxPost(function (m) { var n = Object.assign({}, m); rC.data.forEach(function (c) { if (c && c.id) n[c.id] = c; }); return n; });
            }, function () { });
          }
        } catch (eCh) { }
      }
    }).catch(function () { if (refJeton.current !== jeton) return; setFilErreur(T2(TXT.filErreur)); setFilPosts([]); });
  }
  React.useEffect(function () { chargerFil(); }, [ongletFil]);
  function tplT(o, vals) { var t = T2(o); Object.keys(vals || {}).forEach(function (k) { t = t.split("{" + k + "}").join(String(vals[k])); }); return t; }
  function tempsRelatif(iso) {
    try { var sV = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
      if (sV < 60) return T2(TXT.tMaintenant);
      if (sV < 3600) return tplT(TXT.tMin, { n: Math.floor(sV / 60) });
      if (sV < 86400) return tplT(TXT.tH, { n: Math.floor(sV / 3600) });
      return tplT(TXT.tJ, { n: Math.floor(sV / 86400) });
    } catch (e) { return ""; }
  }
  function cibleCom(post) { return post.type === "import" ? post.cible : ("resultat:" + post.id); }
  function majPost(id, fn) { setFilPosts(function (l) { return (l || []).map(function (p) { return (p && p.id === id) ? fn(p) : p; }); }); }
  function togglerLike(post) {
    var estCarte = (post.type === "import"); var avantLike = !!post.jeLike, avantNb = Number(post.nbLikes || 0);
    majPost(post.id, function (p) { return Object.assign({}, p, { jeLike: !avantLike, nbLikes: Math.max(0, avantNb + (avantLike ? -1 : 1)) }); });
    var action = estCarte ? (avantLike ? retirerLikeCarte(post.cible) : aimerCarte(post.cible)) : (avantLike ? retirerLike(post.id) : aimer(post.id));
    action.then(function (r) { if (r && r.error) { majPost(post.id, function (p) { return Object.assign({}, p, { jeLike: avantLike, nbLikes: avantNb }); }); alert(T2(TXT.likeKo) + (r.error.message || r.error)); } }).catch(function (e) { majPost(post.id, function (p) { return Object.assign({}, p, { jeLike: avantLike, nbLikes: avantNb }); }); alert(T2(TXT.likeKo) + String(e)); });
  }
  function supprimerPost(post) {
    setMenuPost(null);
    if (!confirm(T2(TXT.supprimerQ))) return;
    (async function () {
      try {
        var r = (moiFil && post.user_id === moiFil.id) ? await supprimerResultat(post.id) : await supprimerPostModeration("resultats", post.id);
        if (r && r.error) { alert(T2(TXT.supprimerKo) + (r.error.message || r.error)); return; }
        if (r && r.aucuneLigne) { alert(T2(TXT.supprimerAucune)); return; }   /* (623) rien supprime : la carte reste */
        setFilPosts(function (l) { return (l || []).filter(function (p) { return p && p.id !== post.id; }); });
      } catch (e) { alert(T2(TXT.supprimerKo) + String(e)); }
    })();
  }
  function ouvrirCheval(id) { try { window.__chevalOuvert = id; window.__ouvrirPalmares = true; } catch (e) { } setEcran("cheval"); }
  var icCoeur = function (plein) { return h("svg", { viewBox: "0 0 24 24", fill: plein ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 20.5s-7.5-4.6-9.3-9.3C1.5 8 3.5 4.5 7 4.5c2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3.5 0 5.5 3.5 4.3 6.7-1.8 4.7-9.3 9.3-9.3 9.3Z" })); };
  var icBulle = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 5h16v11H9l-5 4V5Z" }));
  function cartePost(post) {
    var nom = (post.auteur && post.auteur.pseudo) || T2(TXT.cavaliere);
    var av = (post.auteur && post.auteur.avatar_url && String(post.auteur.avatar_url).charAt(0) !== "@") ? post.auteur.avatar_url : ((typeof avatarHypeDefaut === "function") ? avatarHypeDefaut(post.user_id || nom) : "");
    var peutSuppr = !!(moiFil && post.type !== "import" && post.type !== "hautfait" && (post.user_id === moiFil.id || (typeof estModerateurHype === "function" && estModerateurHype(moiFil))));
    var contexte = post.type === "import" ? T2(TXT.cPalm) : (post.type === "hautfait" ? T2(TXT.cHaut) : T2(TXT.cCours));
    var texte = null, sous = null, img = null, imgOnClick = null, chevaux = null, lienVideo = null, avecLike = (post.type !== "hautfait");
    if (post.type === "import") {
      var plusieurs = post.chevaux && post.chevaux.length > 1;
      texte = plusieurs ? tplT(TXT.palmN, { n: nom, k: post.chevaux.length }) : tplT(TXT.palm1, { n: nom, c: post.chevalNom || "" });
      sous = (post.nb || 0) + " " + T2(TXT.uRes) + " \u00b7 " + (post.classes || 0) + " " + T2(TXT.uCla) + " \u00b7 " + (post.victoires || 0) + " " + T2(TXT.uVic);
      img = post.chevalPhoto || null; imgOnClick = function () { ouvrirCheval(post.cheval_id); };
      /* 10/10 (877) Blandine (« 3 ») : plus de liste d une ligne par cheval. L ecurie concernee (toucher = sa page), puis une
         rangee de tetes de chevaux qu on fait defiler sur le cote (toucher = la fiche). Styles en ligne seulement. */
      if (plusieurs) {
        var ecsP = []; post.chevaux.forEach(function (c) { var e0 = String(c.ecurie || "").trim(); if (e0 && ecsP.map(function (x) { return x.toLowerCase(); }).indexOf(e0.toLowerCase()) === -1) ecsP.push(e0); });
        var ligneEcP = !ecsP.length ? null : (ecsP.length === 1
          ? h("button", { type: "button", onClick: function () { ouvrirEcurie({ cible: "club:" + ecsP[0], nom: ecsP[0] }); }, style: { display: "inline-flex", alignItems: "center", gap: 6, maxWidth: "100%", marginTop: 10, padding: 0, border: "none", background: "none", color: "#D8BC86", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "start" } },
              h("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, ecsP[0]), h("span", { "aria-hidden": "true", style: { flex: "0 0 auto" } }, "\u203a"))
          : h("div", { style: { marginTop: 10, color: "#D8BC86", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: 600 } }, tplT(TXT.nEcuries, { k: ecsP.length })));
        chevaux = h("div", { className: "com2-post-chx", style: { borderTop: "none", marginTop: 0 } },
          ligneEcP,
          h("div", { style: { display: "flex", gap: 10, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", marginTop: 12, paddingBottom: 4 } },
            post.chevaux.map(function (c) {
              var ph = c.photo ? ((typeof vignetteHype === "function") ? vignetteHype(c.photo, 120, 120) : c.photo) : "";
              return h("button", { key: "pc" + c.id, type: "button", onClick: function () { ouvrirCheval(c.id); }, style: { flex: "0 0 auto", width: 66, padding: 0, border: "none", background: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" } },
                h("span", { "aria-hidden": "true", style: { width: 54, height: 54, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", backgroundColor: "#132A34", backgroundImage: ph ? "url(" + ph + ")" : "none", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", color: "#D8BC86", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20 } }, ph ? null : String(c.nom || "?").charAt(0).toUpperCase()),
                h("span", { style: { maxWidth: 66, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(243,238,228,0.82)", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5 } }, c.nom));
            })));
      }
    } else if (post.type === "hautfait") {
      texte = T2(TXT.hautDeb) + (post.badge_id && typeof hypeLibelleHautFait === "function" ? " \u00b7 " + hypeLibelleHautFait(post.badge_id, function (fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return T2({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }) : "");
    } else {
      texte = String(post.concours || "").trim() || T2(TXT.resultat);
      sous = String(post.classement || "").trim() || null;
      img = post.photo_url || null;
      /* (669) sans photo : celle de la fiche du cheval concerne (toucher la photo ouvre la fiche) */
      if (!img && post.cheval_id && chevauxPost[post.cheval_id] && chevauxPost[post.cheval_id].photo_url && String(chevauxPost[post.cheval_id].photo_url).charAt(0) !== "@") {
        img = chevauxPost[post.cheval_id].photo_url; imgOnClick = function () { ouvrirCheval(post.cheval_id); };
      }
      if (post.media_url) lienVideo = h("a", { href: post.media_url, target: "_blank", rel: "noreferrer" }, T2(TXT.voirVideo) + " \u203a");
    }
    var comOuvert = !!comOuverts[post.id];
    /* (619) rien a montrer en grand (ni photo, ni video, ni palmares) : carte legere, le classement rejoint la ligne du concours */
    var leger = (post.type !== "import" && !img && !lienVideo && !chevaux);
    if (leger && sous) { texte = texte + " \u00b7 " + sous; sous = null; }
    /* (657) la carte depliee : lignes de detail (resultat), lien vers le profil, commentaires, Replier. Un tap n importe ou
       sur la carte deplie ; les boutons, liens, images et le detail lui-meme gardent leur propre geste. */
    var ouvert = (postOuvert === post.id);
    var chP = (post.cheval_id && chevauxPost[post.cheval_id]) || null;
    var lignesDet = [];
    if (post.type !== "import" && post.type !== "hautfait") {
      if (post.classement) lignesDet.push({ k: "cl", l: T2(TXT.detClassement), v: String(post.classement) });
      if (post.epreuve) lignesDet.push({ k: "ep", l: T2(TXT.detEpreuve), v: String(post.epreuve) });
      var dD = dateLongue(post.date_epreuve || post.created_at); if (dD) lignesDet.push({ k: "dt", l: T2(TXT.detDate), v: dD });
      if (chP && chP.nom) lignesDet.push({ k: "ch", l: T2(TXT.detCheval), v: chP.nom, lien: function () { ouvrirCheval(chP.id); } });
    } else if (post.type === "import") {
      lignesDet.push({ k: "nb", l: T2(TXT.uRes), v: String(post.nb || 0) });
      lignesDet.push({ k: "cla", l: T2(TXT.uCla), v: String(post.classes || 0) });
      lignesDet.push({ k: "vic", l: T2(TXT.detVictoires), v: String(post.victoires || 0) });
    }
    var detail = ouvert ? h("div", { className: "com2-post-detail", "data-post-detail": post.id },
      lignesDet.map(function (l) { return h("div", { key: "dl" + l.k, className: "com2-post-dl" + (l.lien ? " lien" : "") }, h("span", null, l.l), h("b", { onClick: l.lien ? function (eL) { try { eL.stopPropagation(); } catch (eL2) { } l.lien(); } : undefined }, l.v)); }),
      (post.type !== "hautfait") ? h("button", { type: "button", className: "com2-post-lienprofil", onClick: function () { var idA = post.user_id || (post.auteur && post.auteur.id) || null; if (idA) ouvrirProfilPublic({ id: idA, pseudo: nom, avatar_url: av }); } }, T2(TXT.voirProfil) + " \u203a") : null,
      (typeof SectionCommentaires === "function") ? h(Com2Commentaires, { key: "com" + post.id, cible: cibleCom(post) }) : null,
      h("button", { type: "button", className: "com2-post-replier", onClick: function () { setPostOuvert(null); } }, T2(TXT.replier))) : null;
    return h("article", { key: post.id, className: "com2-post" + (leger ? " leger" : "") + (ouvert ? " ouvert" : "") + ((img && post.type !== "import") ? " avec-photo" : ""),   /* (664) */ "data-type": post.type || "resultat", "data-post": post.id, "data-ouvert": ouvert ? "1" : null,
      onClick: function (eC) { try { var cib = eC && eC.target; if (cib && cib.closest && cib.closest("button, a, input, textarea, select, img, video, .lien, .com2-post-com, .com2-post-actions, .com2-post-detail, .com2-post-chx")) return; } catch (eC2) { } basculerPost(post); } },
      h("div", { className: "com2-post-tete" },
        h("button", { type: "button", className: "com2-post-av", "aria-label": nom, onClick: function () { var idA = post.user_id || (post.auteur && post.auteur.id) || null; if (idA) ouvrirProfilPublic({ id: idA, pseudo: nom, avatar_url: av }); } }, h("span", { style: av ? { backgroundImage: "url(" + av + ")" } : null }, av ? null : (nom.charAt(0) || "?").toUpperCase())),
        h("div", { className: "com2-post-qui" }, h("span", { className: "com2-post-nom" }, nom), h("span", { className: "com2-post-meta" }, tempsRelatif(post.created_at) + " \u00b7 " + contexte)),
        peutSuppr ? h("button", { type: "button", className: "com2-post-menu", "aria-label": "\u2026", onClick: function () { setMenuPost(menuPost === post.id ? null : post.id); } }, "\u2026") : null),
      (menuPost === post.id && peutSuppr) ? h("div", { className: "com2-post-actions" }, h("button", { type: "button", onClick: function () { supprimerPost(post); } }, T2(TXT.supprimer))) : null,
      /* (621) palmares : texte + vignette 72 px cote a cote ; autres cartes : texte puis grande photo */
      (post.type === "import" && img)
        ? h("div", { className: "com2-post-ligne" },
            h("div", { className: "com2-post-x" }, h("div", { className: "com2-post-txt lien", onClick: imgOnClick || undefined }, texte), sous ? h("div", { className: "com2-post-sous" }, sous) : null),
            h("img", { className: "com2-post-vign", src: (typeof vignetteHype === "function") ? vignetteHype(img, 160, 160) : img, alt: "", loading: "lazy", decoding: "async", onClick: imgOnClick || undefined, onError: function (eI) { try { if (typeof replierVignette === "function") replierVignette(eI, img); else eI.target.style.display = "none"; } catch (e2) { } } }))
        : h(React.Fragment, null,
            h("div", { className: "com2-post-txt" + (imgOnClick ? " lien" : ""), onClick: imgOnClick || undefined }, texte),
            sous ? h("div", { className: "com2-post-sous" }, sous) : null),
      chevaux,
      (img && post.type !== "import") ? h("img", { className: "com2-post-img", src: (typeof vignetteHype === "function") ? vignetteHype(img, 760, 560) : img, alt: "", loading: "lazy", decoding: "async", onClick: imgOnClick || undefined, style: imgOnClick ? { cursor: "pointer" } : null, onError: function (eI) { try { if (typeof replierVignette === "function") replierVignette(eI, img); else eI.target.style.display = "none"; } catch (e2) { } } }) : null,
      h("div", { className: "com2-post-pied" },
        avecLike ? h("button", { type: "button", className: post.jeLike ? "aime" : "", onClick: function () { togglerLike(post); } }, icCoeur(!!post.jeLike), String(post.nbLikes || 0)) : null,
        h("button", { type: "button", className: comOuvert ? "aime" : "", onClick: function () { setComOuverts(function (o) { var n = Object.assign({}, o); n[post.id] = !o[post.id]; return n; }); } }, icBulle),
        (post.type === "import") ? h("button", { type: "button", onClick: function () { ouvrirCheval(post.cheval_id); } }, T2(TXT.voirResultats) + " \u203a") : null,
        lienVideo,
        h("button", { type: "button", className: "com2-post-chev", "aria-label": ouvert ? T2(TXT.replier) : "\u25be", onClick: function () { basculerPost(post); } }, ouvert ? "\u25b4" : "\u25be")),   /* (657) */
      (comOuvert && !ouvert && typeof SectionCommentaires === "function") ? h(Com2Commentaires, { key: "com" + post.id, cible: cibleCom(post) }) : null,
      detail);
  }
  /* (609) une phrase traduite dont les trous {n} {c} {e} recoivent du texte OU un element (le nom en gras) */
  function tplN(o, vals) {
    var t = T2(o); var morceaux = t.split(/(\{[a-z]+\})/g);
    return morceaux.map(function (m, i) { var x = /^\{([a-z]+)\}$/.exec(m); if (!x) return m; var v = vals[x[1]]; return (v && typeof v === "object" && v.$$typeof) ? React.cloneElement(v, { key: "t" + i }) : String(v == null ? "" : v); });
  }
  function tempsCourt(iso) {
    try { var sV = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
      if (sV < 60) return T2(TXT.tMaintenant);
      if (sV < 3600) return tplT(TXT.tcMin, { n: Math.floor(sV / 60) });
      if (sV < 86400) return tplT(TXT.tcH, { n: Math.floor(sV / 3600) });
      return tplT(TXT.tcJ, { n: Math.floor(sV / 86400) });
    } catch (e) { return ""; }
  }
  function ligneAct(a) {
    var nom = a.nom || T2(TXT.cavaliere);
    var gras = h("b", null, nom);
    var txt = null, sous = null, img = a.img || null, action = null;
    var versProfil = function () { var idA = a.uid || null; if (idA) ouvrirProfilPublic(Object.assign({ id: idA, pseudo: nom, avatar_url: a.av || null }, a.auteur || {})); };
    if (a.type === "profil") { txt = tplN(TXT.aRejoint, { n: gras }); sous = [a.profil.ecurie !== "__perso__" ? a.profil.ecurie : "", a.profil.ville].filter(Boolean).join(" \u00b7 ") || null; action = versProfil; }
    else if (a.type === "chevaux") {   /* (988) plusieurs chevaux ajoutes la meme semaine par la meme personne : UNE ligne, depliable */
      var ouvG = !!groupesActOuverts[a.id];
      txt = tplN(TXT.aChevaux, { n: gras, k: a.chevaux.length });
      sous = a.chevaux.slice(0, 3).map(function (cG) { return cG.nom; }).join(", ") + (a.chevaux.length > 3 ? "\u2026" : "");
      img = (a.chevaux.filter(function (cG) { return cG.photo_url; })[0] || {}).photo_url || null;
      action = function () { var o = Object.assign({}, groupesActOuverts); o[a.id] = !ouvG; setGroupesActOuverts(o); };
      var ligneG = h("button", { key: a.id, type: "button", className: "com2-act-l", "data-type": "chevaux", "aria-expanded": ouvG ? "true" : "false", onClick: action },
        h("span", { className: "com2-act-av", style: a.av ? { backgroundImage: "url(" + a.av + ")" } : null, "aria-hidden": "true" }, a.av ? null : (nom.charAt(0) || "?").toUpperCase()),
        h("span", { className: "com2-act-x" }, h("span", { className: "com2-act-t" }, txt), h("span", { className: "com2-act-s" }, sous)),
        img ? h("img", { className: "com2-act-img", src: (typeof vignetteHype === "function") ? vignetteHype(img, 120, 120) : img, alt: "", loading: "lazy", decoding: "async" }) : null,
        h("span", { className: "com2-act-d" }, h("span", { style: { display: "inline-block", transform: ouvG ? "rotate(90deg)" : "none", transition: "transform .2s", color: "#C5AA78", fontSize: 16 } }, (function () { try { return document.documentElement.dir === "rtl" ? "\u2039" : "\u203a"; } catch (eR) { return "\u203a"; } })())));
      if (!ouvG) return ligneG;
      return h(React.Fragment, { key: a.id }, ligneG,
        h("div", { key: a.id + "_l", className: "com2-act-sous", style: { paddingInlineStart: 46, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.06)" } },
          a.chevaux.map(function (cG) {
            return h("button", { key: cG.id, type: "button", onClick: function () { ouvrirCheval(cG.id); }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", minHeight: 44, padding: "5px 2px", border: "none", background: "none", color: "#F3EEE4", textAlign: "start", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 13.5 } },
              cG.photo_url ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(cG.photo_url, 80, 80) : cG.photo_url, alt: "", loading: "lazy", style: { width: 34, height: 34, borderRadius: 9, objectFit: "cover", flex: "0 0 auto" } }) : h("span", { style: { width: 34, height: 34, borderRadius: 9, background: "#132A34", flex: "0 0 auto" } }),
              h("span", { style: { flex: 1, minWidth: 0, fontWeight: 600 } }, cG.nom),
              h("span", { "aria-hidden": "true", style: { color: "#C5AA78" } }, (function () { try { return document.documentElement.dir === "rtl" ? "\u2039" : "\u203a"; } catch (eR) { return "\u203a"; } })()));
          })));
    }
    else if (a.type === "cheval") { txt = tplN(TXT.aCheval, { n: gras, c: h("b", null, a.cheval.nom) }); img = a.cheval.photo_url || null; action = function () { ouvrirCheval(a.cheval.id); }; }
    else if (a.type === "publication") { txt = tplN(TXT.aPublie, { n: gras, e: a.nomEcurie }); sous = a.texte || null; action = function () { ouvrirEcurie({ cible: a.cible, nom: a.nomEcurie }); }; }
    else if (a.type === "resultat") { txt = tplN(TXT.aResultat, { n: gras }); sous = [a.concours, a.classement].filter(Boolean).join(" \u00b7 ") || null; action = versProfil; }
    else if (a.type === "import") {
      var cI = a.carte, plusieursI = cI.chevaux && cI.chevaux.length > 1;
      txt = plusieursI ? tplN(TXT.palmN, { n: gras, k: cI.chevaux.length }) : tplN(TXT.palm1, { n: gras, c: h("b", null, cI.chevalNom || "") });
      sous = (cI.nb || 0) + " " + T2(TXT.uRes) + " \u00b7 " + (cI.classes || 0) + " " + T2(TXT.uCla) + " \u00b7 " + (cI.victoires || 0) + " " + T2(TXT.uVic);
      img = cI.chevalPhoto || null; action = function () { ouvrirCheval(cI.cheval_id); };
    }
    else if (a.type === "photocheval") {
      txt = tplN(a.avecPhoto ? TXT.aPhotoCheval : TXT.aPubCheval, { n: gras, c: h("b", null, a.nomCheval) });
      sous = a.texte || null;
      action = function () { try { window.__chevalOuvert = a.idCheval; window.__ouvrirActualite = true; window.__murPostOuvrir = { cible: "cheval:" + a.idCheval, id: a.idPost }; } catch (ePc) { } setEcran("cheval"); };   /* la fiche, sur Actualite, amenee sur le message (629) */
    }
    else if (a.type === "souvenir") {
      txt = tplN(TXT.aSouvenir, { n: gras, e: a.nomEcurie });
      action = function () { try { window.__souvenirsClub = { clef: String(a.nomEcurie).trim().toLowerCase(), nom: String(a.nomEcurie).trim() }; } catch (eSv) { } setEcran("souvenirs-club"); };   /* la mosaique des souvenirs de cette ecurie (137) */
    }
    else if (a.type === "rdv") {
      txt = tplN(TXT.aRdv, { n: gras, t: h("b", null, a.titre) });
      var dJ = ""; try { if (a.date) { var LOC = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }; dJ = new Date(String(a.date) + "T12:00:00").toLocaleDateString(LOC[lg] || "fr-FR", { day: "numeric", month: "short" }); } } catch (eDj) { dJ = String(a.date || ""); }
      sous = [dJ, a.nomEcurie].filter(Boolean).join(" \u00b7 ") || null;
      action = function () { try { window.__guildeEcurie = a.nomEcurie; window.__agendaFiche = a.idEv; window.__agendaFicheRetour = "communaute"; window.__communauteCible = "activite"; } catch (eRv) { } setEcran("guilde"); };   /* (668) retour ici, onglet Activite */   /* la page du club ouvre la fiche (window.__agendaFiche, 301) */
    }
    else if (a.type === "hautfait") { txt = tplN(TXT.aHaut, { n: gras }); sous = (a.badge_id && typeof hypeLibelleHautFait === "function") ? hypeLibelleHautFait(a.badge_id, function (fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return T2({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }) : null; action = versProfil; }
    else return null;
    return h("button", { key: a.id, type: "button", className: "com2-act-l", "data-type": a.type, onClick: action || undefined },
      h("span", { className: "com2-act-av", style: a.av ? { backgroundImage: "url(" + a.av + ")" } : null, "aria-hidden": "true" }, a.av ? null : (nom.charAt(0) || "?").toUpperCase()),
      h("span", { className: "com2-act-x" }, h("span", { className: "com2-act-t" }, txt), sous ? h("span", { className: "com2-act-s" }, sous) : null),
      img ? h("img", { className: "com2-act-img", src: (typeof vignetteHype === "function") ? vignetteHype(img, 120, 120) : img, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { if (typeof replierVignette === "function") replierVignette(eI, img); else eI.target.style.display = "none"; } catch (e2) { } } }) : null,
      h("span", { className: "com2-act-d" }, tempsCourt(a.t)));
  }
  /* (614) MAQUETTE 1 choisie par Blandine (« Ok la 1 ») : CARTE = CONTENU, LIGNE = EVENEMENT, dans les 4 onglets. Un resultat,
     un palmares rendu gardent leur carte ; un haut fait devient une ligne compacte — la meme que dans Activite —, les lignes
     qui se suivent sont regroupees. Consequence : plus de bulle de reponses sur un haut fait dans ce fil (la V1 la garde). */
  function estLigneFil(p) { return !!p && p.type === "hautfait"; }
  function ligneDepuisPost(p) {
    var au = p.auteur || {};
    return ligneAct({ type: "hautfait", id: "pl" + p.id, t: p.created_at, uid: p.user_id || au.id || null, nom: String(au.pseudo || "").trim(), av: (au.avatar_url && String(au.avatar_url).charAt(0) !== "@") ? au.avatar_url : "", auteur: au, badge_id: p.badge_id });
  }
  function grouperFil(liste) {
    var out = [], groupe = [];
    function vider() { if (groupe.length) { out.push(h("div", { key: "lg_" + groupe[0].key, className: "com2-fil-lignes" }, groupe)); groupe = []; } }
    liste.forEach(function (p) { if (estLigneFil(p)) { groupe.push(ligneDepuisPost(p)); } else { vider(); out.push(cartePost(p)); } });
    vider();
    return out;
  }
  function afficherFil() {
    if (ongletFil === "activite") {
      if (activite === null) return h("div", { className: "com2-fil-vide" }, T2(TXT.filChargement));
      if (activite.erreur) return h("div", { className: "com2-fil-vide" }, T2(TXT.actErreur));
      if (!activite.liste.length) return h("div", { className: "com2-fil-vide" }, T2(TXT.actVide));
      /* 12/10 (988) Blandine : « ca je croyais qu on les avait rassembles » (12 lignes « Blandine a ajoute un cheval : … »).
         Meme regle que les palmares rendus (327, « par semaine si c est le meme geste ») : les chevaux ajoutes par UNE personne
         la MEME semaine (lundi -> dimanche) deviennent UNE ligne « X a ajoute N chevaux », placee au plus recent ; on la touche
         pour voir la liste, chaque cheval ouvre sa fiche. Un seul cheval : la ligne d avant. */
      var lGr = (function () {
        var out = [], parCle = {};
        function lundi(t) { try { var d = new Date(t); var j = (d.getDay() + 6) % 7; d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - j); return d.toISOString().slice(0, 10); } catch (eL) { return "?"; } }
        activite.liste.forEach(function (a) {
          if (!a || a.type !== "cheval" || !a.cheval) { out.push(a); return; }
          var cle = String(a.uid || a.nom || "?") + "|" + lundi(a.t);
          var g = parCle[cle];
          if (!g) { g = parCle[cle] = { type: "chevaux", id: "gch_" + cle, t: a.t, uid: a.uid, nom: a.nom, av: a.av, auteur: a.auteur, chevaux: [], premier: a }; out.push(g); }
          if (!g.chevaux.some(function (x) { return String(x.id) === String(a.cheval.id); })) g.chevaux.push(a.cheval);
        });
        return out.map(function (g) { return (g && g.type === "chevaux" && g.chevaux.length === 1) ? g.premier : g; });
      })();
      var lA = (lGr.length > LIM_ACT && !filPlus) ? lGr.slice(0, LIM_ACT) : lGr;
      return h(React.Fragment, null,
        h("div", { className: "com2-act" }, lA.map(ligneAct)),
        (lGr.length > LIM_ACT) ? h("button", { type: "button", className: "com2-fil-plus", onClick: function () { setFilPlus(!filPlus); } }, filPlus ? T2(TXT.replier) : (T2(TXT.voirSuite) + " (" + (lGr.length - LIM_ACT) + ")")) : null);
    }
    if (filPosts === null) return h("div", { className: "com2-fil-vide" }, T2(TXT.filChargement));
    if (filErreur) return h("div", { className: "com2-fil-vide" }, filErreur);
    if (!filPosts.length) return h("div", { className: "com2-fil-vide" }, T2(TXT.filVide));
    /* (669) une carte visible, les autres en glissant */
    var cellules = grouperFil(filPosts);
    var nbC = cellules.length, iC = Math.min(filIdx, Math.max(0, nbC - 1));
    /* 12/10 (1000) tablette et ordinateur : les publications en GRILLE (2 colonnes, 3 a partir de 1440 px), 6 d abord puis
       « Voir plus de publications » ; memes cartes, memes interactions. iPhone : le defilement carte par carte d avant. */
    if (grilleFilCom) {
      var visG = filPlus ? cellules : cellules.slice(0, 6);
      return h(React.Fragment, null,
        h("div", { className: "com2b-fil-grille", "data-com2": "fil-grille" }, visG.map(function (el, i) { return h("div", { key: "fg" + ((el && el.key) || i), className: "com2b-fil-gc" }, el); })),
        (nbC > 6) ? h("button", { type: "button", className: "com2-fil-plus", onClick: function () { setFilPlus(!filPlus); } }, filPlus ? T2(TXT.replier) : (T2(TXT.voirPlusPub) + " (" + (nbC - 6) + ")")) : null);
    }
    return h(React.Fragment, null,
      h("div", { className: "com2-fil-car", "data-com2": "fil-car", ref: refCarFil, onScroll: auDefilFil },
        cellules.map(function (el, i) { return h("div", { key: "cf" + ((el && el.key) || i), className: "com2-fil-cell", "data-cell": i }, el); })),
      (nbC > 1) ? h("div", { className: "com2-fil-pos", "data-com2": "fil-pos" },
        h("span", { className: "com2-fil-barre", "aria-hidden": "true" }, h("i", { style: { width: Math.round((iC + 1) / nbC * 100) + "%" } })),
        h("b", { dir: "ltr" }, (iC + 1) + " / " + nbC)) : null);
  }
  function ouvrirProfilPublic(cav) {
    try { if (typeof window !== "undefined") {
      window.__cavalierPublic = { id: (cav.id || cav.user_id || null), pseudo: cav.pseudo, handle: cav.handle || "", photo: cav.avatar_url || null, ecurie: cav.ecurie || "", club: (cav.club || cav.ecurie || ""), ville: cav.ville || "" };
      window.__cavalierOuvert = "__public";
    } } catch (eP) { }
    setEcran("cavalier");
  }
  function carteDec(cle, img, titre, sous) {
    var ouverte = (decOuvert === cle);
    return h("button", { type: "button", className: "com2-dec-c" + (ouverte ? " ouverte" : ""), "data-com2": "dec-" + cle, "aria-expanded": ouverte ? "true" : "false", onClick: function () { try { window.__decouvrirOnglet = cle; } catch (eW) { } setEcran("decouvrir"); } },   /* 12/10 (1051) Blandine : la page A decouvrir a onglets, plus de depliage */
      h("img", { className: "com2-dec-img", src: img, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } }),
      h("span", { className: "com2-dec-voile", "aria-hidden": "true" }),
      h("span", { className: "com2-dec-x" }, h("span", { className: "com2-dec-t" }, titre), h("span", { className: "com2-dec-s" }, sous)),
      h("span", { className: "com2-dec-chev", "aria-hidden": "true" }, icChev));
  }
  /* 12/10 (994) CARROUSEL PHOTO (maquette « Version Carrousel », iPhone) : une carte visible a la fois, glissement au doigt
     (defilement natif aimante), fleches discretes et points. Les fleches passent par scrollIntoView : le sens est juste en arabe
     sans calcul. La rangee porte data-hscroll (les gestes du fil l ignorent). Reutilisable pour les rubriques suivantes. */
  function carrouselCom(cleC, cartes) {
    var n = cartes.length, idx = Math.min(carIdx[cleC] || 0, n - 1);
    var rtlC = false; try { rtlC = document.documentElement.dir === "rtl"; } catch (eR) { }
    function aller(i) { try { var r = document.querySelector('[data-com2car="' + cleC + '"]'); var c = r && r.children[i]; if (c) c.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); } catch (eA) { } }
    function surDef(e) { try { var r = e.currentTarget, cx = r.getBoundingClientRect().left + r.clientWidth / 2, best = 0, dist = 1e9; for (var i = 0; i < r.children.length; i++) { var b = r.children[i].getBoundingClientRect(), d = Math.abs(b.left + b.width / 2 - cx); if (d < dist) { dist = d; best = i; } } if (best !== (carIdx[cleC] || 0)) setCarIdx(function (o) { var m = Object.assign({}, o); m[cleC] = best; return m; }); } catch (eS) { } }
    var fl = function (sens) { return h("button", { type: "button", className: "com2b-car-fl com2b-car-" + (sens < 0 ? "prec" : "suiv"), "aria-label": sens < 0 ? T2(TXT.carPrec) : T2(TXT.carSuiv), disabled: sens < 0 ? idx === 0 : idx === n - 1, onClick: function () { aller(Math.max(0, Math.min(n - 1, idx + sens))); } }, (sens < 0) !== rtlC ? "\u2039" : "\u203a"); };
    return h("div", { className: "com2b-car-bloc" },
      h("div", { className: "com2b-car", "data-com2car": cleC, "data-hscroll": "1", onScroll: surDef }, cartes),
      n > 1 ? fl(-1) : null, n > 1 ? fl(1) : null,
      n > 1 ? h("div", { className: "com2b-car-pts", "aria-hidden": "true" }, cartes.map(function (c, i) { return h("span", { key: i, className: i === idx ? "on" : "" }); })) : null);
  }
  /* 12/10 (995) CARTE QUI SE RETOURNE (maquette B choisie par Blandine pour « Dans les ecuries » et « A l agenda », iPhone).
     Recto : la photo, le titre, le sous-titre. On la touche : elle pivote (comme une carte a jouer) et montre au verso les
     3 plus recentes (vraies donnees deja chargees par la page, rien de nouveau en base) ; « \u21ba » la remet cote photo.
     « Voir tout (n) » sous la carte deplie les suivantes juste dessous. Chaque ligne ouvre ce qu elle ouvrait deja. */
  function carteRetournee(cleR, img, titre, sous, lignes) {
    var dos = !!retournees[cleR], tout = !!toutesR[cleR], n = lignes.length;
    function basculer() { setRetournees(function (o) { var m = Object.assign({}, o); m[cleR] = !o[cleR]; return m; }); }
    return h("div", { className: "com2b-rt-bloc" },
      h("div", { className: "com2b-rt" + (dos ? " dos" : "") },
        h("div", { className: "com2b-rt-in" },
          h("button", { type: "button", className: "com2b-rt-face com2b-rt-recto", "aria-hidden": dos ? "true" : "false", tabIndex: dos ? -1 : 0, onClick: basculer, "data-com2": "rt-" + cleR },
            h("img", { src: img, alt: "", loading: "lazy", decoding: "async" }),
            h("span", { className: "com2b-rt-voile", "aria-hidden": "true" }),
            h("span", { className: "com2b-rt-x" }, h("span", { className: "com2b-rt-t" }, titre), h("span", { className: "com2b-rt-s" }, sous)),
            h("span", { className: "com2b-rt-ic", "aria-hidden": "true" }, "\u21bb")),
          h("div", { className: "com2b-rt-face com2b-rt-verso", "aria-hidden": dos ? "false" : "true" },
            h("div", { className: "com2b-rt-h" }, h("span", null, titre), h("button", { type: "button", className: "com2b-rt-retour", "aria-label": T2(TXT.retourner), tabIndex: dos ? 0 : -1, onClick: basculer }, "\u21ba")),
            lignes.slice(0, 3)))),
      (dos && n > 3) ? h("button", { type: "button", className: "com2-lien com2b-rt-tout", onClick: function () { setToutesR(function (o) { var m = Object.assign({}, o); m[cleR] = !o[cleR]; return m; }); } }, tout ? T2(TXT.reduire) : (T2(TXT.voirTout) + " (" + n + ")"), icChev) : null,
      (dos && tout && n > 3) ? h("div", { className: "com2b-rt-suite" }, lignes.slice(3)) : null);
  }
  function ligneAgendaDos(ev) {   /* (996) une ligne d evenement au dos de la carte : date, titre, ecurie ; ouvre la fiche comme avant */
    var dA = dateCarteAg(ev.date);
    return h("button", { key: "ad" + ev.id, type: "button", className: "com2b-rt-l", onClick: function () { ouvrirRdvCom(ev); } },
      h("span", { className: "com2b-rt-date", "aria-hidden": "true" }, h("b", null, dA.j), h("span", null, dA.m)),
      h("span", { className: "com2b-rt-lx" }, h("b", null, ev.titre || ""), h("span", null, ev.nomClub || ev.lieu || "")),
      h("span", { className: "com2b-rt-ch", "aria-hidden": "true" }, icChev));
  }
  function ligneEcurieDos(c) {
    var src = (typeof vignetteHype === "function") ? vignetteHype(c.img, 120, 120) : c.img;
    return h("button", { key: "ed" + c.cle, type: "button", className: "com2b-rt-l", onClick: function () { ouvrirEcurie(c); } },
      h("span", { className: "com2b-rt-vi", style: src ? { backgroundImage: "url(" + src + ")" } : null, "aria-hidden": "true" }),
      h("span", { className: "com2b-rt-lx" }, h("b", null, c.nom), h("span", null, c.nbPosts + " " + T2(c.nbPosts > 1 ? TXT.pubN : TXT.pub1) + " \u00b7 " + c.nbPhotos + " " + T2(c.nbPhotos > 1 ? TXT.phN : TXT.ph1))),
      h("span", { className: "com2b-rt-ch", "aria-hidden": "true" }, icChev));
  }
  function ouvrirMonde() { try { window.__cavalierOuvert = null; window.__cavalierPublic = null; } catch (eM) { } setEcran("monde"); }
  var icChev = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M9 6l6 6-6 6" }));
  var icGlobe = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.35, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    h("circle", { cx: 12, cy: 12, r: 9 }),
    h("path", { d: "M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" }),
    h("path", { d: "M5.2 7.5c2 1.1 4.3 1.6 6.8 1.6s4.8-.5 6.8-1.6M5.2 16.5c2-1.1 4.3-1.6 6.8-1.6s4.8.5 6.8 1.6" }));
  /* (667) les lignes du globe dessinees en SVG (664) ont disparu : le fond fourni par Blandine les porte deja */
  var icEpingle = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Z" }), h("circle", { cx: 12, cy: 10, r: 2.2 }));
  var aStories = (typeof window !== "undefined" && window.BandeauStories);
  var _lo = React.useState(false); var langOuvert = _lo[0], setLangOuvert = _lo[1];
  var DRAPEAUX_C2 = [["fr", "\uD83C\uDDEB\uD83C\uDDF7"], ["en", "\uD83C\uDDEC\uD83C\uDDE7"], ["es", "\uD83C\uDDEA\uD83C\uDDF8"], ["it", "\uD83C\uDDEE\uD83C\uDDF9"], ["ja", "\uD83C\uDDEF\uD83C\uDDF5"], ["de", "\uD83C\uDDE9\uD83C\uDDEA"], ["ar", "\uD83C\uDDF8\uD83C\uDDE6"], ["zh", "\ud83c\udde8\ud83c\uddf3"], ["nl", "\ud83c\uddf3\ud83c\uddf1"], ["pt", "\ud83c\udde7\ud83c\uddf7"], ["sv", "\ud83c\uddf8\ud83c\uddea"], ["ru", "\ud83c\uddf7\ud83c\uddfa"], ["pl", "\ud83c\uddf5\ud83c\uddf1"], ["ko", "\ud83c\uddf0\ud83c\uddf7"]];
  var drapeauActuel = DRAPEAUX_C2[0][1];
  for (var iD = 0; iD < DRAPEAUX_C2.length; iD++) { if (DRAPEAUX_C2[iD][0] === lg) drapeauActuel = DRAPEAUX_C2[iD][1]; }
  /* 12/10 (987) Blandine : « l ideal serait que le fond s assombrisse des qu on commence a faire defiler la page ».
     Un voile noir pose sur le globe fixe passe de 0 (haut de page) a 1 apres 320 px de defilement (opacite du calque,
     mise a jour a chaque image d animation, sans redessiner la page). Au plus sombre : globe a peine visible. */
  /* (993) Stories : rondes sur iPhone, « Voir tout » si elles depassent la largeur */
  var estMobileCom = (function () { try { return window.innerWidth < 768; } catch (eW) { return true; } })();   /* (1000) brief responsive : iPhone < 768 px */
  var _gfc = React.useState(function () { try { return window.innerWidth >= 768; } catch (eG) { return false; } }); var grilleFilCom = _gfc[0], setGrilleFilCom = _gfc[1];
  React.useEffect(function () { function fG() { try { var v = window.innerWidth >= 768; setGrilleFilCom(function (o) { return o === v ? o : v; }); } catch (eF) { } } window.addEventListener("resize", fG); return function () { window.removeEventListener("resize", fG); }; }, []);
  var _stt = React.useState(false); var storiesTout = _stt[0], setStoriesTout = _stt[1];
  var _std = React.useState(false); var storiesDeborde = _std[0], setStoriesDeborde = _std[1];
  var refStoriesCom = React.useRef(null);
  React.useEffect(function () {
    var mo = null;
    function mesurer() { try { var r = refStoriesCom.current && refStoriesCom.current.querySelector("[data-hscroll]"); var d = !!(r && r.scrollWidth > r.clientWidth + 4); setStoriesDeborde(function (o) { return o === d ? o : d; }); } catch (eM) { } }
    mesurer(); var t1 = setTimeout(mesurer, 1200), t2 = setTimeout(mesurer, 3500);
    try { if (refStoriesCom.current && typeof MutationObserver !== "undefined") { mo = new MutationObserver(function () { if (!storiesTout) mesurer(); }); mo.observe(refStoriesCom.current, { childList: true, subtree: true }); } } catch (eO) { }
    window.addEventListener("resize", mesurer);
    return function () { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", mesurer); try { if (mo) mo.disconnect(); } catch (eD) { } };
  }, []);
  var _cix = React.useState({}); var carIdx = _cix[0], setCarIdx = _cix[1];   /* (994) carte visible de chaque carrousel */
  var _rto = React.useState({}); var retournees = _rto[0], setRetournees = _rto[1];   /* (995) cartes retournees */
  var _rtt = React.useState({}); var toutesR = _rtt[0], setToutesR = _rtt[1];
  var refNuitCom = React.useRef(null);
  React.useEffect(function () {
    var att = false;
    function maj() { att = false; try { var y = window.scrollY || document.documentElement.scrollTop || 0; if (refNuitCom.current) refNuitCom.current.style.opacity = String(Math.max(0, Math.min(1, y / 320))); } catch (eN) { } }
    function surDef() { if (!att) { att = true; (window.requestAnimationFrame || setTimeout)(maj); } }
    maj();
    window.addEventListener("scroll", surDef, { passive: true });
    return function () { window.removeEventListener("scroll", surDef); };
  }, []);
  return h("div", { className: "com2 com2b" },   /* (981) maquette B */
    h("style", null, COM2_CSS),
    h("style", null, COM2B_CSS),
    h("style", null, "@media (max-width:767px){.com2-h2{font-size:21px!important}.com2-sec-st{margin-top:14px!important}.com2-sec-st .com2-sec-t{padding-bottom:0!important}.com2-stories{margin-top:-14px!important;margin-bottom:-12px!important}.com2b-rubriques{margin-top:0!important}.com2.com2b .com2-hero{height:calc(env(safe-area-inset-top) + 462px - 28.71vw)!important}.com2.com2b .com2-hero-x{margin-top:calc(27.44vw - 12px)!important}.com2b-rubriques > .com2-sec + .com2-sec,.com2b-rubriques + .com2-sec{margin-top:16px!important}.com2b-car-bloc{padding-bottom:16px!important}.com2b-rubriques .com2-sec-t,.com2-sec-t{padding-bottom:10px!important}}"),   /* 12/10 (1052) Blandine : « on peut rapprocher les parties » (moins d espace entre A decouvrir, Dans les ecuries, A l agenda, Le fil) ; (1048) Blandine : « Communaute juste au-dessus des cavaliers sur l image et le reste du titre juste en dessous » : hauteur du haut de page et marge calculees sur la position des cavaliers dans le fond (qui depend de la largeur : 450px - 130.5vw) ; (1047) Blandine : « baisse un peu les titres, il y a trop d espace au-dessus et en dessous des stories » (iPhone) */
    h("div", { className: "com2b-fond", "aria-hidden": "true" }, h("div", { className: "com2b-fond-nuit", ref: refNuitCom })),   /* (981) fond fixe ; (987) voile qui fonce au defilement */
    /* (664) LE HERO « MONDE HYPE » (maquette du 05/10) : la planete (SON visuel, 599) en grand en haut a droite, coupee par les bords,
       les lignes du globe en SVG par-dessus, la cavaliere (images/communaute_v2_nouveaux_profils_v2.webp) a gauche, un voile qui
       fond vers le fond de page ; le titre, le sous-titre et la capsule Monde Hype dans le dernier tiers, a l extremite de debut. */
    /* (667) SON fond propre (globe + cinq cavaliers) : images/communaute-hero-monde-hype-cavaliers.webp (176 Ko), repli PNG (2 Mo).
       Un vrai <picture> derriere le contenu ; le titre, le sous-titre, la capsule et les actions restent des elements HTML. */
    h("div", { className: "com2-hero", "data-com2": "hero" },
      h("picture", { className: "com2-hero-pic" },
        h("source", { srcSet: "images/communaute-hero-monde-hype-cavaliers.webp", type: "image/webp" }),
        h("img", { className: "com2-hero-img", src: "images/communaute-hero-monde-hype-cavaliers.png", alt: "", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } })),
      h("div", { className: "com2-hero-voile", "aria-hidden": "true" }),
      h("div", { className: "com2b-assombri", "aria-hidden": "true" }),
      (ctx && ctx.peutReculer && ctx.retourEcran) ? h("button", { type: "button", className: "com2b-retour", onClick: function () { try { ctx.retourEcran(); } catch (eR) { } }, "aria-label": T2({ fr: "Retour", en: "Back", es: "Volver", it: "Indietro", ja: "\u623b\u308b", de: "Zur\u00fcck", ar: "\u0631\u062c\u0648\u0639", zh: "返回", nl: "Terug", pt: "Voltar", sv: "Tillbaka", ru: "Назад", pl: "Wróć", ko: "뒤로" }) }, (function () { try { return document.documentElement.dir === "rtl" ? "\u203a" : "\u2039"; } catch (eD) { return "\u2039"; } })()) : null,   /* (991) Blandine : « revenir a la page d ou on vient » ; absent s il n y a pas de page precedente */
      h("div", { className: "com2b-bloc" },   /* (981) titre comme les pages du cheval : petit titre champagne espace + mot en grand, sur un coin assombri */
        h("div", { className: "com2b-eb" }, T2(TXT.eb)),
        h("h1", { className: "com2b-nom" }, T2(TXT.titre)))),
    /* 10/10 (807) Blandine : « descends le titre en dessous de la photo » : titre, sous-titre et capsule Monde Hype sortent du hero
       et se posent juste sous la photo (plus par-dessus le ciel). */
    h("div", { className: "com2-hero-x" },
        h("div", { className: "com2b-titre" }, h("span", null, T2(TXT.sous1)), " ", h("span", null, T2(TXT.sous2))),   /* (981) le slogan en ecriture doree, comme « Prendre soin, c est deja aimer » ; « COMMUNAUTE » en Anton a halo retire (Blandine) */
        h("button", { type: "button", className: "com2-monde-cap", onClick: ouvrirMonde, "data-com2": "monde" },
          h("span", { className: "com2-monde-ic" }, icGlobe),
          h("span", { className: "com2-monde-l" }, T2(TXT.monde)),
          h("span", { className: "com2-chev" }, icChev))),
    /* (618) cloche (composant existant) + drapeau : la liste des 7 langues de l Accueil V2, meme setLangue */
    h("div", { className: "com2-haut" },
      (typeof ClocheNotifs === "function") ? h(ClocheNotifs, { theme: "communauteV2" }) : null,
      h("div", { className: "com2-lang" },
        h("button", { type: "button", "aria-label": T2(TXT.langue), "data-com2": "langue", onClick: function () { setLangOuvert(!langOuvert); } }, drapeauActuel),
        langOuvert ? h("div", { className: "com2-lang-liste", role: "listbox" },
          DRAPEAUX_C2.map(function (pl) { return h("button", { key: pl[0], type: "button", className: lg === pl[0] ? "actif" : "", "aria-label": pl[0], onClick: function () { try { if (typeof ctx.setLangue === "function") ctx.setLangue(pl[0]); } catch (eL) { } setLangOuvert(false); } }, pl[1]); })) : null)),
    /* (664) l en-tete et la grande carte Monde Hype vivent desormais DANS le hero (ci-dessus) */
    /* Stories : le composant du module, pose dans le fond sombre, sans les bandes grises de la V1 ; (610) forme « rond »
       (cercles nets, meme diametre pour le « + ») a la place du fondu « libre ». Si le module n est pas charge, la section n apparait pas. */
    aStories ? h("section", { className: "com2-sec com2-sec-st" + (storiesTout ? " com2b-st-tout" : "") },
      h("div", { className: "com2-sec-t" }, h("h2", { className: "com2-h2" }, T2(TXT.stories)),
        (storiesDeborde || storiesTout) ? h("button", { type: "button", className: "com2-lien com2b-st-lien", onClick: function () { setStoriesTout(!storiesTout); } }, storiesTout ? T2(TXT.reduire) : T2(TXT.voirTout), icChev) : null),   /* (993) « Voir tout » deplie les stories suivantes (seulement si elles ne tiennent pas sur une ligne) */
      /* (610) forme « rond » 76 px, accent champagne (propriete du module), aucun retrait autour du rail */
      h("div", { className: "com2-stories", "data-hscroll": "1", ref: refStoriesCom }, h(window.BandeauStories, { forme: undefined, accent: "#C9A66B", taille: (function () { try { return window.innerWidth >= 1280 ? 64 : 58; } catch (eT) { return 58; } })(), padding: "10px 0 10px" })   /* 12/10 (999) ordinateur aussi : Stories rondes, 58 px (64 px des 1280 px), « Voir tout » (brief ordinateur, build 2) */   /* 12/10 (993) carrousel : Stories en RONDS nets a anneau champagne sur iPhone (maquette ; demande de Blandine) ; ordinateur inchange (« libre-carte ») */   /* 10/10 (855) Blandine : « passe les story en rectangle ou carre avec le meme design fondu comme elles etaient avant » -> forme « libre-carte » (celle de la page d accueil) ; avant : « libre » */   /* (675) exactement les Stories de la page Cavalier : photos qui se fondent dans le noir (sans anneau dore), taille et espacement du module, « + » a la fin */)) : null,
    /* (602) A DECOUVRIR — deux cartes d entree ; (627) ses deux visuels definitifs (images/communaute_v2_nouveaux_profils_v2.webp et communaute_v2_cavalieres_suivre_v1.webp, 500x460, sans texte) */
    h("div", { className: "com2b-rubriques" },   /* (1000) les trois rubriques photo : empilees sur iPhone, 2 colonnes sur tablette, 3 sur ordinateur */
    h("section", { className: "com2-sec", ref: refDecouvrir, style: { scrollMarginTop: 12 } },
      h("div", { className: "com2-sec-t" }, h("h2", { className: "com2-h2" }, T2(TXT.decouvrir))),
      true ? carrouselCom("dec", [
          carteDec("nouveaux", "images/communaute-carte-profils.webp", T2(TXT.nouveauxT), T2(TXT.nouveauxS)),
          carteDec("suivre", "images/communaute-carte-cavalieres.webp", T2(TXT.suivreT), T2(TXT.suivreS))])   /* (994) carrousel photo sur iPhone, nouvelles images ; memes cartes, meme action (deplier sous la carte) */
      : h("div", { className: "com2-dec" },
        carteDec("nouveaux", "images/communaute_v2_nouveaux_profils_v2.webp", T2(TXT.nouveauxT), T2(TXT.nouveauxS)),
        carteDec("suivre", "images/communaute_v2_cavalieres_suivre_v1.webp", T2(TXT.suivreT), T2(TXT.suivreS))),
      (decOuvert === "nouveaux" && typeof NouveauxCavaliers === "function") ? h("div", { className: "com2-dec-ext" }, h(NouveauxCavaliers, null)) : null,
      (decOuvert === "suivre" && typeof HypeADecouvrir === "function") ? h("div", { className: "com2-dec-ext", style: { padding: "14px 16px 0" } }, h(HypeADecouvrir, { titre: null, onOuvrir: ouvrirProfilPublic })) : null),
    /* (604) DANS LES ECURIES — 2 cartes empilees (les ecuries les plus recemment actives), « Voir tout » deplie les autres ; rien si aucune publication */
    /* (659) DANS LES ECURIES — la premiere ecurie en grande carte immersive ; « Voir tout » ouvre le rail des autres */
    (ecuries && ecuries.length) ? h("section", { className: "com2-sec", "data-com2": "ecuries" },
      h("div", { className: "com2-sec-t" },
        h("h2", { className: "com2-h2" }, T2(TXT.ecuries)),
        false ? h("button", { type: "button", className: "com2-lien", "data-com2": "ecuries-tout", onClick: function () { setEcuriesTout(!ecuriesTout); } }, ecuriesTout ? T2(TXT.reduire) : T2(TXT.voirTout), icChev) : null),
      true ? carteRetournee("ecuries", "images/communaute-carte-ecuries.webp", T2(TXT.ecuries), T2(TXT.ecuriesS), ecuries.map(ligneEcurieDos))   /* (995) iPhone : carte qui se retourne (maquette B) */
      : h("div", { className: "com2-ecu" }, carteEcurieImmersive(ecuries[0], false)),
      false ? h("div", { className: "com2-ecu-rail", "data-hscroll": "1" }, ecuries.slice(1).map(function (c) { return carteEcurieImmersive(c, true); })) : null) : null,
    /* (659) A L AGENDA — le rendez-vous le plus proche en grand, les trois suivants en petit ; « Voir tout » montre les suivants */
    (agenda && agenda.length) ? h("section", { className: "com2-sec", "data-com2": "agenda" },
      h("div", { className: "com2-sec-t" },
        h("h2", { className: "com2-h2" }, T2(TXT.agenda)),
        false ? h("button", { type: "button", className: "com2-lien", "data-com2": "agenda-tout", onClick: function () { setAgendaTout(!agendaTout); } }, agendaTout ? T2(TXT.reduire) : T2(TXT.voirTout), icChev) : null),
      true ? carteRetournee("agenda", "images/communaute-carte-agenda.webp", T2(TXT.agenda), T2(TXT.agendaS), agenda.map(ligneAgendaDos))   /* (996) iPhone : carte qui se retourne, harmonisee avec « Dans les ecuries » */
      : h("div", { className: "com2-ag", style: { display: "flex", flexDirection: "column", gap: 14 } },   /* 10/10 (849) le design des evenements de la page Ecurie, 3 affiches puis « Voir tout » (avant : une grande + 6 petites) */
        (agendaTout ? agenda : agenda.slice(0, 3)).map(carteAgendaEcurie))) : null),   /* 10/10 (815) Blandine : « laisse une deuxieme ligne d evenements » : 6 petites cartes (2 lignes de 3) avant « Voir tout » (3 avant) */
    /* (605) LE FIL — titre + 4 onglets ; le contenu vient au build 6 */
    h("section", { className: "com2-sec", "data-com2": "fil" },
      h("div", { className: "com2-sec-t" }, h("h2", { className: "com2-h2" }, T2(TXT.fil))),
      h("div", { className: "com2-onglets", role: "tablist", "data-lg": lg },
        ONGLETS_FIL.map(function (oF) { var actif = (ongletFil === oF[0]); return h("button", { key: "of" + oF[0], type: "button", role: "tab", "aria-selected": actif ? "true" : "false", className: "com2-onglet" + (actif ? " actif" : ""), "data-onglet": oF[0], onClick: function () { setOngletFil(oF[0]); } }, T2(oF[1])); })),
      afficherFil()),
    /* (670) la signature de fin de page, comme l Accueil et l Ecurie : paysage fondu (images/accueil_v2_fin_de_page_v1.webp, deja
       dans le depot) puis le trait et « HYPE » ; une cale garde la signature au-dessus de la barre du bas. */
    h("div", { className: "com2-fin", "data-com2": "fin", "aria-hidden": "true" },
      h("div", { className: "com2-fin-img" },
        h("img", { src: "images/accueil_v2_fin_de_page_v1.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e2) { } } }),
        h("div", { className: "com2-fin-voile" })),
      h("div", { className: "com2-fin-ligne" }, h("span"), h("b", { dir: "ltr" }, "HYPE"), h("span")),
      h("div", { className: "com2-fin-cale" })));
}
window.HypeCommunauteV2 = { CommunauteV2: EcranCommunauteV2 };
})();
