/* HYPE ▸ 31/10/2026 — Page « Le Mag / Culture équestre » (EcranArticles) — REFONTE d'après la maquette validée « MIX 2 + 3 »
   (pack HYPE_CULTURE_MAGAZINE : 01_DESKTOP_MIX_2_3.png + 03_MOBILE_ACCUEIL.png), reproduite au plus près avec le VRAI contenu.
   FICHIER GÉNÉRÉ par outils/mag/generer.py : textes déjà en ligne repris TELS QUELS de l'ancienne page (outils/mag/ancienne-page.js),
   nouveaux textes dans outils/mag/textes.json + textes2.json (14 langues).
   Contenu conservé (rien retiré) : tous les ARTICLES, les 4 grandes écoles (mêmes verrous Premium), La théorie des Galops + Galop 1 à 7,
   Lamotte-Beuvron en direct, Bien-être & Santé, Hey Baby, Bibliothèque vidéo, fil d'annonces, panneau des conseils Hey Baby.
   Pas d'auteur, de « j'aime », de commentaires ni de favoris : ces fonctions n'existent pas pour les articles (la maquette en montrait de faux).
   Classes CSS « mag- » (aucun effet sur les autres pages). */
(function () {
var NV = {"rubriques": {"fr": "Rubriques", "en": "Sections", "es": "Secciones", "it": "Rubriche", "ja": "カテゴリー", "de": "Rubriken", "ar": "الأقسام", "zh": "栏目", "nl": "Rubrieken", "pt": "Seções", "sv": "Avdelningar", "ru": "Рубрики", "pl": "Działy", "ko": "카테고리"}, "rub_technique": {"fr": "Technique équestre", "en": "Riding technique", "es": "Técnica ecuestre", "it": "Tecnica equestre", "ja": "乗馬テクニック", "de": "Reittechnik", "ar": "تقنيات الفروسية", "zh": "马术技术", "nl": "Rijtechniek", "pt": "Técnica equestre", "sv": "Ridteknik", "ru": "Техника верховой езды", "pl": "Technika jeździecka", "ko": "승마 기술"}, "rub_galops": {"fr": "Galops", "en": "Galops", "es": "Galops", "it": "Galop", "ja": "ガロップ", "de": "Galopp", "ar": "الغالوب", "zh": "Galop 等级", "nl": "Galops", "pt": "Galops", "sv": "Galops", "ru": "Galops", "pl": "Galopy", "ko": "Galop"}, "tech_intro": {"fr": "Trajectoires, équilibre, cadence, position : des analyses pour comprendre ce que vit ton cheval et progresser avec lui.", "en": "Lines, balance, rhythm, position: analyses to understand what your horse goes through and progress together.", "es": "Trayectorias, equilibrio, cadencia, posición: análisis para entender lo que vive tu caballo y progresar con él.", "it": "Traiettorie, equilibrio, cadenza, posizione: analisi per capire cosa vive il tuo cavallo e progredire con lui.", "ja": "ライン、バランス、リズム、姿勢。愛馬の動きを理解し、一緒に上達するための解説。", "de": "Linienführung, Gleichgewicht, Takt, Sitz: Analysen, um zu verstehen, was dein Pferd erlebt, und gemeinsam weiterzukommen.", "ar": "المسارات، التوازن، الإيقاع، الجلسة: تحليلات لتفهمي ما يعيشه حصانكِ وتتقدّمي معه.", "zh": "路线、平衡、节奏、姿势：帮助你理解马匹的感受，与它一起进步的分析。", "nl": "Lijnen, balans, cadans, zit: analyses om te begrijpen wat je paard ervaart en samen vooruit te gaan.", "pt": "Trajetórias, equilíbrio, cadência, posição: análises para entender o que seu cavalo vive e evoluir com ele.", "sv": "Linjer, balans, takt, sits: analyser för att förstå vad din häst upplever och utvecklas tillsammans.", "ru": "Траектории, баланс, ритм, посадка: разборы, чтобы понять, что чувствует твоя лошадь, и расти вместе с ней.", "pl": "Linie, równowaga, kadencja, dosiad: analizy, by zrozumieć, co przeżywa twój koń, i robić postępy razem z nim.", "ko": "라인, 균형, 리듬, 자세: 말이 겪는 것을 이해하고 함께 성장하기 위한 분석이에요."}, "tech_hb_titre": {"fr": "Une question technique ?", "en": "A technical question?", "es": "¿Una pregunta técnica?", "it": "Una domanda tecnica?", "ja": "技術的な質問がある？", "de": "Eine Technikfrage?", "ar": "سؤال تقني؟", "zh": "有技术问题？", "nl": "Een technische vraag?", "pt": "Uma dúvida técnica?", "sv": "En teknisk fråga?", "ru": "Технический вопрос?", "pl": "Pytanie techniczne?", "ko": "기술 질문이 있나요?"}, "tech_hb_texte": {"fr": "Pose-la à Hey Baby, ton assistant équestre.", "en": "Ask Hey Baby, your riding assistant.", "es": "Pregúntale a Hey Baby, tu asistente ecuestre.", "it": "Chiedi a Hey Baby, il tuo assistente equestre.", "ja": "乗馬アシスタントの Hey Baby に聞いてみよう。", "de": "Frag Hey Baby, deinen Reitassistenten.", "ar": "اسألي Hey Baby، مساعدتكِ في الفروسية.", "zh": "问问你的马术助手 Hey Baby。", "nl": "Vraag het aan Hey Baby, je ruiterassistent.", "pt": "Pergunte à Hey Baby, sua assistente equestre.", "sv": "Fråga Hey Baby, din ridassistent.", "ru": "Спроси Hey Baby, своего помощника по верховой езде.", "pl": "Zapytaj Hey Baby, swojego asystenta jeździeckiego.", "ko": "승마 도우미 Hey Baby에게 물어보세요."}, "explorer": {"fr": "Explorer par univers", "en": "Explore by theme", "es": "Explorar por temas", "it": "Esplora per temi", "ja": "テーマから探す", "de": "Nach Themen entdecken", "ar": "استكشفي حسب المواضيع", "zh": "按主题探索", "nl": "Ontdek per thema", "pt": "Explorar por temas", "sv": "Utforska efter tema", "ru": "Темы для изучения", "pl": "Odkrywaj według tematów", "ko": "주제별로 둘러보기"}, "ecoles_sous": {"fr": "Saumur, Lisbonne, Vienne, Jerez : quatre écoles, quatre arts équestres.", "en": "Saumur, Lisbon, Vienna, Jerez: four schools, four equestrian arts.", "es": "Saumur, Lisboa, Viena, Jerez: cuatro escuelas, cuatro artes ecuestres.", "it": "Saumur, Lisbona, Vienna, Jerez: quattro scuole, quattro arti equestri.", "ja": "ソミュール、リスボン、ウィーン、ヘレス。4つの学校、4つの馬術芸術。", "de": "Saumur, Lissabon, Wien, Jerez: vier Schulen, vier Reitkünste.", "ar": "سومور، لشبونة، فيينا، خيريث: أربع مدارس وأربعة فنون للفروسية.", "zh": "索米尔、里斯本、维也纳、赫雷斯：四所学校，四种马术艺术。", "nl": "Saumur, Lissabon, Wenen, Jerez: vier scholen, vier rijkunsten.", "pt": "Saumur, Lisboa, Viena, Jerez: quatro escolas, quatro artes equestres.", "sv": "Saumur, Lissabon, Wien, Jerez: fyra skolor, fyra ridkonster.", "ru": "Сомюр, Лиссабон, Вена, Херес: четыре школы, четыре искусства верховой езды.", "pl": "Saumur, Lizbona, Wiedeń, Jerez: cztery szkoły, cztery sztuki jeździeckie.", "ko": "소뮈르, 리스본, 빈, 헤레스: 네 학교, 네 가지 마술 예술."}, "galops_ouvrir": {"fr": "Ouvrir un Galop", "en": "Open a Galop", "es": "Abrir un Galop", "it": "Apri un Galop", "ja": "ガロップを開く", "de": "Einen Galopp öffnen", "ar": "افتحي مستوى غالوب", "zh": "打开一个 Galop", "nl": "Een Galop openen", "pt": "Abrir um Galop", "sv": "Öppna en Galop", "ru": "Открыть Galop", "pl": "Otwórz Galop", "ko": "Galop 열기"}, "lire": {"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"}, "hero_titre": {"fr": "Culture équestre", "en": "Equestrian culture", "es": "Cultura ecuestre", "it": "Cultura equestre", "ja": "乗馬カルチャー", "de": "Reitkultur", "ar": "ثقافة الفروسية", "zh": "马术文化", "nl": "Ruitercultuur", "pt": "Cultura equestre", "sv": "Ridkultur", "ru": "Конная культура", "pl": "Kultura jeździecka", "ko": "승마 문화"}, "hero_sous": {"fr": "Des articles pour comprendre, progresser et vivre ta passion.", "en": "Articles to understand, improve and live your passion.", "es": "Artículos para entender, progresar y vivir tu pasión.", "it": "Articoli per capire, progredire e vivere la tua passione.", "ja": "理解して、上達して、情熱を楽しむための記事。", "de": "Artikel, um zu verstehen, weiterzukommen und deine Leidenschaft zu leben.", "ar": "مقالات لتفهمي وتتقدّمي وتعيشي شغفكِ.", "zh": "帮助你理解、进步、享受热爱的文章。", "nl": "Artikelen om te begrijpen, vooruit te gaan en je passie te beleven.", "pt": "Artigos para entender, evoluir e viver sua paixão.", "sv": "Artiklar för att förstå, utvecklas och leva ut din passion.", "ru": "Статьи, чтобы понимать, расти и жить своей страстью.", "pl": "Artykuły, by rozumieć, robić postępy i żyć swoją pasją.", "ko": "이해하고, 성장하고, 열정을 즐기기 위한 기사예요."}, "rechercher": {"fr": "Rechercher un article…", "en": "Search for an article…", "es": "Busca un artículo…", "it": "Cerca un articolo…", "ja": "記事を検索…", "de": "Artikel suchen…", "ar": "ابحثي عن مقال…", "zh": "搜索文章…", "nl": "Zoek een artikel…", "pt": "Buscar um artigo…", "sv": "Sök efter en artikel…", "ru": "Найти статью…", "pl": "Szukaj artykułu…", "ko": "기사 검색…"}, "aucun": {"fr": "Aucun article trouvé.", "en": "No articles found.", "es": "No se encontró ningún artículo.", "it": "Nessun articolo trovato.", "ja": "記事が見つかりませんでした。", "de": "Kein Artikel gefunden.", "ar": "لم يتم العثور على أي مقال.", "zh": "未找到文章。", "nl": "Geen artikelen gevonden.", "pt": "Nenhum artigo encontrado.", "sv": "Inga artiklar hittades.", "ru": "Статьи не найдены.", "pl": "Nie znaleziono artykułów.", "ko": "기사를 찾지 못했어요."}, "resultats": {"fr": "Résultats", "en": "Results", "es": "Resultados", "it": "Risultati", "ja": "検索結果", "de": "Ergebnisse", "ar": "النتائج", "zh": "搜索结果", "nl": "Resultaten", "pt": "Resultados", "sv": "Resultat", "ru": "Результаты", "pl": "Wyniki", "ko": "검색 결과"}, "tab_technique": {"fr": "Technique", "en": "Technique", "es": "Técnica", "it": "Tecnica", "ja": "テクニック", "de": "Technik", "ar": "التقنية", "zh": "技术", "nl": "Techniek", "pt": "Técnica", "sv": "Teknik", "ru": "Техника", "pl": "Technika", "ko": "기술"}, "tab_culture": {"fr": "Culture", "en": "Culture", "es": "Cultura", "it": "Cultura", "ja": "カルチャー", "de": "Kultur", "ar": "الثقافة", "zh": "文化", "nl": "Cultuur", "pt": "Cultura", "sv": "Kultur", "ru": "Культура", "pl": "Kultura", "ko": "문화"}, "tab_soins": {"fr": "Soins", "en": "Care", "es": "Cuidados", "it": "Cura", "ja": "ケア", "de": "Pflege", "ar": "العناية", "zh": "护理", "nl": "Verzorging", "pt": "Cuidados", "sv": "Skötsel", "ru": "Уход", "pl": "Pielęgnacja", "ko": "관리"}, "tab_competition": {"fr": "Compétition", "en": "Competition", "es": "Competición", "it": "Gare", "ja": "競技", "de": "Turniere", "ar": "المنافسات", "zh": "比赛", "nl": "Wedstrijden", "pt": "Competição", "sv": "Tävling", "ru": "Соревнования", "pl": "Zawody", "ko": "대회"}, "explorer2": {"fr": "À explorer selon tes envies", "en": "Explore what inspires you", "es": "Explora a tu gusto", "it": "Esplora come preferisci", "ja": "気になるテーマを探そう", "de": "Entdecke, worauf du Lust hast", "ar": "استكشفي ما يناسب رغباتكِ", "zh": "随心探索", "nl": "Ontdek waar je zin in hebt", "pt": "Explore do seu jeito", "sv": "Utforska det du är sugen på", "ru": "Изучай то, что тебе интересно", "pl": "Odkrywaj to, na co masz ochotę", "ko": "마음 가는 대로 둘러보기"}, "voir_themes": {"fr": "Voir toutes les thématiques", "en": "See all themes", "es": "Ver todos los temas", "it": "Vedi tutti i temi", "ja": "すべてのテーマを見る", "de": "Alle Themen ansehen", "ar": "عرض جميع المواضيع", "zh": "查看所有主题", "nl": "Bekijk alle thema’s", "pt": "Ver todos os temas", "sv": "Visa alla teman", "ru": "Все темы", "pl": "Zobacz wszystkie tematy", "ko": "모든 주제 보기"}, "derniers": {"fr": "Derniers articles", "en": "Latest articles", "es": "Últimos artículos", "it": "Ultimi articoli", "ja": "最新記事", "de": "Neueste Artikel", "ar": "أحدث المقالات", "zh": "最新文章", "nl": "Nieuwste artikelen", "pt": "Últimos artigos", "sv": "Senaste artiklarna", "ru": "Последние статьи", "pl": "Najnowsze artykuły", "ko": "최신 기사"}, "d_technique": {"fr": "Conseils, exercices et analyses.", "en": "Tips, exercises and analyses.", "es": "Consejos, ejercicios y análisis.", "it": "Consigli, esercizi e analisi.", "ja": "アドバイス、エクササイズ、解説。", "de": "Tipps, Übungen und Analysen.", "ar": "نصائح وتمارين وتحليلات.", "zh": "建议、练习与分析。", "nl": "Tips, oefeningen en analyses.", "pt": "Dicas, exercícios e análises.", "sv": "Tips, övningar och analyser.", "ru": "Советы, упражнения и разборы.", "pl": "Porady, ćwiczenia i analizy.", "ko": "팁, 연습, 분석."}, "d_culture": {"fr": "Histoires, écoles et traditions.", "en": "Stories, schools and traditions.", "es": "Historias, escuelas y tradiciones.", "it": "Storie, scuole e tradizioni.", "ja": "物語、学校、伝統。", "de": "Geschichten, Schulen und Traditionen.", "ar": "قصص ومدارس وتقاليد.", "zh": "故事、学校与传统。", "nl": "Verhalen, scholen en tradities.", "pt": "Histórias, escolas e tradições.", "sv": "Berättelser, skolor och traditioner.", "ru": "Истории, школы и традиции.", "pl": "Historie, szkoły i tradycje.", "ko": "이야기, 학교, 전통."}, "d_soins": {"fr": "Santé et bien-être au quotidien.", "en": "Everyday health and well-being.", "es": "Salud y bienestar en el día a día.", "it": "Salute e benessere ogni giorno.", "ja": "日々の健康とウェルビーイング。", "de": "Gesundheit und Wohlbefinden im Alltag.", "ar": "الصحة والرفاهية في الحياة اليومية.", "zh": "日常健康与福祉。", "nl": "Gezondheid en welzijn in het dagelijks leven.", "pt": "Saúde e bem-estar no dia a dia.", "sv": "Hälsa och välbefinnande i vardagen.", "ru": "Здоровье и благополучие каждый день.", "pl": "Zdrowie i dobrostan na co dzień.", "ko": "매일의 건강과 웰빙."}, "d_competition": {"fr": "Les grands rendez-vous de la saison.", "en": "The season’s big events.", "es": "Las grandes citas de la temporada.", "it": "I grandi appuntamenti della stagione.", "ja": "シーズンの注目イベント。", "de": "Die großen Termine der Saison.", "ar": "أبرز مواعيد الموسم.", "zh": "本赛季的重要赛事。", "nl": "De grote evenementen van het seizoen.", "pt": "Os grandes eventos da temporada.", "sv": "Säsongens stora händelser.", "ru": "Главные события сезона.", "pl": "Najważniejsze wydarzenia sezonu.", "ko": "시즌의 주요 대회."}, "plus_loin": {"fr": "Pour aller plus loin", "en": "Further reading", "es": "Para ir más allá", "it": "Per approfondire", "ja": "さらに深く", "de": "Zum Weiterlesen", "ar": "للتعمّق أكثر", "zh": "延伸阅读", "nl": "Verder lezen", "pt": "Para ir além", "sv": "Läs vidare", "ru": "Узнать больше", "pl": "Więcej na ten temat", "ko": "더 알아보기"}, "suivant": {"fr": "Suivant", "en": "Next", "es": "Siguiente", "it": "Successivo", "ja": "次へ", "de": "Weiter", "ar": "التالي", "zh": "下一个", "nl": "Volgende", "pt": "Próximo", "sv": "Nästa", "ru": "Далее", "pl": "Następny", "ko": "다음"}, "precedent": {"fr": "Précédent", "en": "Previous", "es": "Anterior", "it": "Precedente", "ja": "前へ", "de": "Zurück", "ar": "السابق", "zh": "上一个", "nl": "Vorige", "pt": "Anterior", "sv": "Föregående", "ru": "Назад", "pl": "Poprzedni", "ko": "이전"}};
function EcranArticles() {
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, premium = app.premium, tr = app.tr, setGalopOuvert = app.setGalopOuvert;
    var lg = app.langue || "fr";
    var rtl = lg === "ar";
    function N(k) { return tr(NV[k]); }
    var lectureLabel = tr({ fr: "de lecture", en: "read", es: "de lectura", it: "di lettura", ja: "", de: "Lesezeit", ar: "\u0644\u0644\u0642\u0631\u0627\u0621\u0629", zh: "阅读时长", nl: "leestijd", pt: "de leitura", sv: "läsning", ru: "на чтение", pl: "czytania", ko: "읽는 시간" });
    var nouveauLabel = tr({ fr: "Nouveau", en: "New", es: "Nuevo", it: "Nuovo", ja: "新着", de: "Neu", ar: "\u062c\u062f\u064a\u062f", zh: "新", nl: "Nieuw", pt: "Novo", sv: "Nytt", ru: "Новое", pl: "Nowość", ko: "새로운" });
    var stMtP = React.useState(false); var mtPan = stMtP[0], setMtPan = stMtP[1];
    React.useEffect(function () { try { if (window.__rouvrirConseils === "articles") { window.__rouvrirConseils = null; setMtPan(true); } } catch (eRo) { } }, []);
    var stT = React.useState("une"); var tab = stT[0], setTab = stT[1];
    var stF = React.useState(0); var vedette = stF[0], setVedette = stF[1];
    var stQ = React.useState(""); var q = stQ[0], setQ = stQ[1];
    var stS = React.useState(false); var rechOuverte = stS[0], setRechOuverte = stS[1];
    var refs = { une: React.useRef(null), derniers: React.useRef(null), ecoles: React.useRef(null), loin: React.useRef(null), galops: React.useRef(null), sante: React.useRef(null) };
    function aller(cle) {
        var el = refs[cle] && refs[cle].current; if (!el) return;
        try {
            var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 16, behavior: reduit ? "auto" : "smooth" });
        } catch (eS) { try { el.scrollIntoView(); } catch (e2) { } }
    }
    var fleche = rtl ? "←" : "→";
    var chev = rtl ? "←" : "→";
    function titreDe(a) { return (typeof a.titre === "object") ? tr(a.titre) : a.titre; }
    function extraitDe(a) { return (typeof a.extrait === "object") ? tr(a.extrait) : (a.extrait || ""); }
    function ouvrirArticle(a) {
        if (a.ecran) { setEcran(a.ecran); return; }
        if (a.premium && !premium) { setEcran("premium"); return; }
        try { window.__articleOuvert = a.id; } catch (e) { }
        setEcran("article-detail");
    }
    function estTech(a) { return a.categorie === "Technique équestre"; }
    var aCso = null; for (var iU = 0; iU < ARTICLES.length; iU++) { if (ARTICLES[iU].ecran) { aCso = ARTICLES[iU]; break; } }
    var IMG_ART = { "article-cso": "images/article-cso-virage.webp" };
    function imgDe(a) { return IMG_ART[a.ecran] || a.tuile; }
    function catDe(a) { return estTech(a) ? N("rub_technique") : N("tab_competition"); }
    function WIKI(nom) { return "https://commons.wikimedia.org/wiki/Special:FilePath/" + nom + "?width=1100"; }
    var ECOLES = [
        { ecran: "cadre-noir", libre: true, img: WIKI("Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg"), pos: "center 40%", dr: "🇫🇷", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("Le Cadre Noir de Saumur", "The Cadre Noir of Saumur", "El Cadre Noir de Saumur", "Il Cadre Noir di Saumur", "\u30bd\u30df\u30e5\u30fc\u30eb\u306e\u30ab\u30c9\u30eb\u30fb\u30ce\u30ef\u30fc\u30eb", "Der Cadre Noir von Saumur", "\u0627\u0644\u0643\u0627\u062f\u0631 \u0646\u0648\u0627\u0631 \u0641\u064a \u0633\u0648\u0645\u0648\u0631", "索缪尔黑骑士（Cadre Noir）", "Het Cadre Noir van Saumur", "O Cadre Noir de Saumur", "Cadre Noir i Saumur", "Cadre Noir из Сомюра", "Cadre Noir w Saumur", "소뮈르의 카드르 누아르"), sous: tr({ fr: "Deux siècles d\u2019excellence au service de l\u2019art équestre français.", en: "Two centuries of excellence in the service of French equestrian art.", es: "Dos siglos de excelencia al servicio del arte ecuestre francés.", it: "Due secoli di eccellenza al servizio dell\u2019arte equestre francese.", ja: "フランス馬術芸術に捧げた二世紀の卓越。", de: "Zwei Jahrhunderte Exzellenz im Dienste der französischen Reitkunst.", ar: "\u0642\u0631\u0646\u0627\u0646 \u0645\u0646 \u0627\u0644\u062a\u0645\u064a\u0632 \u0641\u064a \u062e\u062f\u0645\u0629 \u0641\u0646 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a.", zh: "两个世纪的卓越，致力于法国马术艺术。", nl: "Twee eeuwen uitmuntendheid ten dienste van de Franse ruiterkunst.", pt: "Dois séculos de excelência a serviço da arte equestre francesa.", sv: "Två sekel av excellens i den franska ridkonstens tjänst.", ru: "Два века мастерства на службе французского конного искусства.", pl: "Dwa wieki doskonałości w służbie francuskiej sztuki jeździeckiej.", ko: "프랑스 승마 예술을 위해 이어 온 두 세기의 탁월함." }) },
        { ecran: "ecole-portugaise", img: WIKI("Queluz%20Solo%20Picador%20%289181009668%29%20%28cropped%29.jpg"), pos: "center 26%", dr: "🇵🇹", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Portugaise d'Art Équestre", "The Portuguese School of Equestrian Art", "La Escuela Portuguesa de Arte Ecuestre", "La Scuola Portoghese d\u2019Arte Equestre", "\u30dd\u30eb\u30c8\u30ac\u30eb\u99ac\u8853\u5b66\u6821", "Die Portugiesische Reitkunstschule", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644\u064a\u0629 \u0644\u0641\u0646 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629", "葡萄牙马术艺术学校", "De Portugese School voor Rijkunst", "A Escola Portuguesa de Arte Equestre", "Portugisiska ridkonstskolan", "Португальская школа конного искусства", "Portugalska Szkoła Sztuki Jeździeckiej", "포르투갈 승마 예술 학교"), sous: tr({ fr: "L\u2019\u00e9l\u00e9gance du Lusitanien et la m\u00e9moire vivante de la cour portugaise.", en: "The elegance of the Lusitano and the living memory of the Portuguese court.", es: "La elegancia del lusitano y la memoria viva de la corte portuguesa.", it: "L\u2019eleganza del Lusitano e la memoria viva della corte portoghese.", ja: "ルシタノの優雅さと、ポルトガル宮廷の生きた記憶。", de: "Die Eleganz des Lusitano und die lebendige Erinnerung an den portugiesischen Hof.", ar: "\u0623\u0646\u0627\u0642\u0629 \u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0644\u0648\u0632\u064a\u062a\u0627\u0646\u064a \u0648\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062d\u064a\u0629 \u0644\u0644\u0628\u0644\u0627\u0637 \u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644\u064a.", zh: "卢西塔诺马的优雅，与葡萄牙宫廷鲜活的记忆。", nl: "De elegantie van de Lusitano en het levende geheugen van het Portugese hof.", pt: "A elegância do Lusitano e a memória viva da corte portuguesa.", sv: "Lusitanons elegans och det portugisiska hovets levande minne.", ru: "Элегантность лузитано и живая память португальского двора.", pl: "Elegancja lusitano i żywa pamięć dworu portugalskiego.", ko: "루지타노의 우아함, 그리고 포르투갈 궁정의 살아 있는 기억." }) },
        { ecran: "ecole-vienne", img: WIKI("Spanische%20Hofreitschule%20Wien%20Vienna%20Winter%20riding%20manege%201.jpg"), pos: "center 34%", dr: "🇦🇹", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Espagnole de Vienne", "The Spanish Riding School of Vienna", "La Escuela Espa\u00f1ola de Equitaci\u00f3n de Viena", "La Scuola Spagnola di Vienna", "\u30a6\u30a3\u30fc\u30f3\u30fb\u30b9\u30da\u30a4\u30f3\u4e57\u99ac\u5b66\u6821", "Die Spanische Hofreitschule Wien", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0625\u0633\u0628\u0627\u0646\u064a\u0629 \u0644\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0641\u064a \u0641\u064a\u064a\u0646\u0627", "维也纳西班牙马术学校", "De Spaanse Rijschool van Wenen", "A Escola Espanhola de Viena", "Spanska ridskolan i Wien", "Испанская школа верховой езды в Вене", "Hiszpańska Szkoła Jazdy Konnej w Wiedniu", "빈 스페인 승마학교"), sous: tr({ fr: "Les Lipizzans blancs dans la plus ancienne tradition équestre vivante.", en: "The white Lipizzaners in the oldest living equestrian tradition.", es: "Los lipizanos blancos en la tradición ecuestre viva más antigua.", it: "I Lipizzani bianchi nella più antica tradizione equestre vivente.", ja: "現存する最古の馬術伝統に生きる白いリピッツァナー。", de: "Die weißen Lipizzaner in der ältesten lebendigen Reittradition.", ar: "\u062e\u064a\u0648\u0644 \u0627\u0644\u0644\u064a\u0628\u064a\u0632\u0627\u0646 \u0627\u0644\u0628\u064a\u0636\u0627\u0621 \u0641\u064a \u0623\u0642\u062f\u0645 \u062a\u0642\u0644\u064a\u062f \u0641\u0631\u0648\u0633\u064a\u0629 \u062d\u064a.", zh: "白色利皮扎马，演绎着最古老、至今鲜活的马术传统。", nl: "De witte Lipizzaners in de oudste nog levende ruitertraditie.", pt: "Os Lipizzanos brancos na mais antiga tradição equestre viva.", sv: "De vita lipizzanerna i den äldsta fortfarande levande ridtraditionen.", ru: "Белые липицианы в старейшей из живых конных традиций.", pl: "Białe lipicany w najstarszej żywej tradycji jeździeckiej.", ko: "가장 오래 이어져 온 살아 있는 승마 전통 속의 하얀 리피자너들." }) },
        { ecran: "ecole-jerez", img: WIKI("Jerez-Real%20Escuela%20Andaluza%20del%20Arte%20Equestre-Palacio%20Duque%20de%20Abrantes-20110914.jpg"), pos: "center 40%", dr: "🇪🇸", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Royale Andalouse", "The Royal Andalusian School", "La Real Escuela Andaluza", "La Scuola Reale Andalusa", "\u738b\u7acb\u30a2\u30f3\u30c0\u30eb\u30b7\u30a2\u99ac\u8853\u5b66\u6821", "Die K\u00f6niglich Andalusische Reitschule", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0623\u0646\u062f\u0644\u0633\u064a\u0629", "皇家安达卢西亚马术学校", "De Koninklijke Andalusische School", "A Real Escola Andaluza", "Kungliga andalusiska skolan", "Королевская андалузская школа", "Królewska Szkoła Andaluzyjska", "왕립 안달루시아 승마학교"), sous: tr({ fr: "Le cheval espagnol danse entre flamenco et haute école, à Jerez.", en: "The Spanish horse dances between flamenco and High School, in Jerez.", es: "El caballo español baila entre flamenco y alta escuela, en Jerez.", it: "Il cavallo spagnolo danza tra flamenco e alta scuola, a Jerez.", ja: "ヘレスで、フラメンコと高等馬術の間に踊るスペインの馬。", de: "Das spanische Pferd tanzt zwischen Flamenco und Hoher Schule, in Jerez.", ar: "\u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0625\u0633\u0628\u0627\u0646\u064a \u064a\u0631\u0642\u0635 \u0628\u064a\u0646 \u0627\u0644\u0641\u0644\u0627\u0645\u0646\u0643\u0648 \u0648\u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0627\u0644\u0639\u0644\u064a\u0627 \u0641\u064a \u062e\u064a\u0631\u064a\u062b.", zh: "西班牙马在赫雷斯，于弗拉门戈与高等马术之间起舞。", nl: "Het Spaanse paard danst tussen flamenco en hoge school, in Jerez.", pt: "O cavalo espanhol dança entre o flamenco e a alta escola, em Jerez.", sv: "Den spanska hästen dansar mellan flamenco och höga skolan, i Jerez.", ru: "Испанская лошадь танцует между фламенко и высшей школой, в Хересе.", pl: "Koń hiszpański tańczy między flamenco a wyższą szkołą jazdy, w Jerez.", ko: "스페인 말이 헤레스에서 플라멩코와 고등 마술 사이를 오가며 춤을 춰요." }) }
    ];
    function ouvrirEcole(e) { if (!e.libre && !premium) { setEcran("premium"); return; } setEcran(e.ecran); }
    function horloge() { return h("svg", { width: 13, height: 13, viewBox: "0 0 16 16", "aria-hidden": "true" }, h("circle", { cx: 8, cy: 8, r: 6.5, fill: "none", stroke: "currentColor", strokeWidth: 1.3 }), h("path", { d: "M8 4.5V8l2.5 1.6", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" })); }
    function rond(etiquette) { return h("span", { className: "mag-rond", "aria-hidden": etiquette ? null : "true", "aria-label": etiquette || null }, chev); }
    function badgePremium(bloque) { return bloque ? h("span", { className: "mag-badge" }, "Premium") : null; }
    function enTete(titre, lien, action) {
        return h("div", { className: "mag-eh" },
            h("h2", null, titre), h("span", { className: "mag-eh-l", "aria-hidden": "true" }),
            lien ? h("button", { type: "button", className: "mag-voir", onClick: action }, lien, " ", h("span", { "aria-hidden": "true" }, fleche)) : null);
    }

    /* ---------- 1. Couverture + recherche (vraie : articles et grandes écoles) ---------- */
    var couverture = h("header", { className: "mag-hero" },
        h("img", { className: "mag-hero-img", src: "images/cheval-defaut-alezan.webp", alt: "", decoding: "async", fetchpriority: "high" }),
        h("div", { className: "mag-hero-voile", "aria-hidden": "true" }),
        h("button", { type: "button", className: "mag-loupe-m", "aria-label": N("rechercher"), "aria-expanded": rechOuverte ? "true" : "false", onClick: function () { setRechOuverte(!rechOuverte); } }, loupe()),
        h("div", { className: "mag-hero-tx" },
            h("span", { className: "mag-hero-bar", "aria-hidden": "true" }),
            h("h1", null, N("hero_titre")),
            h("p", null, N("hero_sous")),
            h("label", { className: "mag-rech" + (rechOuverte ? " ouverte" : "") },
                h("input", { type: "search", value: q, placeholder: N("rechercher"), "aria-label": N("rechercher"), onChange: function (e) { setQ(e.target.value); if (e.target.value) { setTimeout(function () { aller("derniers"); }, 60); } } }),
                loupe())),
        h("div", { className: "mag-vague", "aria-hidden": "true" }));
    function loupe() { return h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": "true" }, h("circle", { cx: 10.5, cy: 10.5, r: 6.5, fill: "none", stroke: "currentColor", strokeWidth: 1.6 }), h("path", { d: "M15.5 15.5L20 20", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" })); }

    /* ---------- 2. Onglets (vrais : filtrent les derniers articles ou mènent à la partie) ---------- */
    var TABS = [
        ["une", tr({ fr: "À la une", en: "Featured", es: "Destacado", it: "In evidenza", ja: "注目", de: "Im Fokus", ar: "\u0641\u064a \u0627\u0644\u0648\u0627\u062c\u0647\u0629", zh: "置顶", nl: "Uitgelicht", pt: "Em destaque", sv: "Utvalt", ru: "На главной", pl: "Wyróżnione", ko: "대표" }), function () { setQ(""); aller("une"); }],
        ["technique", N("tab_technique"), function () { setQ(""); aller("derniers"); }],
        ["galops", N("rub_galops"), function () { aller("galops"); }],
        ["culture", N("tab_culture"), function () { aller("ecoles"); }],
        ["soins", N("tab_soins"), function () { aller("sante"); }],
        ["competition", N("tab_competition"), function () { setQ(""); aller("derniers"); }]
    ];
    var onglets = h("nav", { className: "mag-tabs", "aria-label": N("rubriques") },
        TABS.map(function (t) { return h("button", { key: t[0], type: "button", className: tab === t[0] ? "on" : "", "aria-current": tab === t[0] ? "true" : null, onClick: function () { setTab(t[0]); t[2](); } }, t[1]); }));

    /* ---------- 3. À la une (3 vrais contenus, flèche = suivant) ---------- */
    var UNE = [];
    if (aCso) UNE.push({ cat: N("rub_technique"), titre: dore(tr({"fr": "Pourquoi éviter la *longue* après un virage serré ?", "en": "Why avoid the *long spot* after a tight turn?", "es": "¿Por qué evitar la *batida larga* tras un giro cerrado?", "it": "Perché evitare la *battuta lunga* dopo una curva stretta?", "ja": "急なターンの直後、なぜ*遠い踏み切りを避けるの？*", "de": "Warum nach einer engen Wendung den *weiten Absprung* vermeiden?", "ar": "لماذا تتجنّبين *الارتقاء البعيد* بعد منعطف حاد؟", "zh": "急转弯之后，为什么要避免*远点起跳？*", "nl": "Waarom geen *lange afstand* na een korte wending?", "pt": "Por que evitar a *distância longa* depois de uma curva fechada?", "sv": "Varför undvika *långt avsprång* efter en snäv sväng?", "ru": "Почему не стоит брать *далёкую точку* после крутого поворота?", "pl": "Dlaczego unikać *dalekiego wybicia* po ciasnym zakręcie?", "ko": "급회전 직후, 왜 *먼 도약은 피해야 할까요?*"})), sous: extraitDe(aCso), img: "images/article-cso-virage.webp", pos: "60% 50%", duree: aCso.duree, bloque: aCso.premium && !premium, action: function () { ouvrirArticle(aCso); } });
    if (ARTICLES[0] && ARTICLES[0] !== aCso) UNE.push({ cat: N("tab_competition"), titre: titreDe(ARTICLES[0]), sous: extraitDe(ARTICLES[0]), img: ARTICLES[0].tuile, pos: "center 40%", duree: ARTICLES[0].duree, action: function () { ouvrirArticle(ARTICLES[0]); } });
    UNE.push({ cat: N("tab_culture"), titre: ECOLES[0].titre, sous: ECOLES[0].sous, img: ECOLES[0].img, pos: ECOLES[0].pos, action: function () { ouvrirEcole(ECOLES[0]); } });
    var v = UNE[vedette % UNE.length];
    function dore(txt) { return String(txt).split(/(\*[^*]+\*)/g).map(function (m, i) { return /^\*[^*]+\*$/.test(m) ? h("em", { key: i }, m.slice(1, -1)) : m; }); }
    function deux(n) { return (n < 10 ? "0" : "") + n; }
    var une = h("section", { ref: refs.une, className: "mag-une-s" },
        h("div", { className: "mag-une" },
            h("img", { key: "i" + vedette, className: "mag-une-img", src: v.img, alt: "", decoding: "async", style: { objectPosition: v.pos } }),
            h("div", { className: "mag-une-voile", "aria-hidden": "true" }),
            h("div", { className: "mag-une-tx" },
                h("div", { className: "mag-cat" }, h("span", { "aria-hidden": "true" }), v.cat),
                h("h2", null, v.titre),
                v.sous ? h("p", null, v.sous) : null,
                h("button", { type: "button", className: "mag-btn", onClick: v.action }, tr({"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"}), " ", h("span", { "aria-hidden": "true" }, fleche)),
                h("div", { className: "mag-une-meta" }, v.duree ? h("span", null, horloge(), " ", v.duree) : null, v.bloque ? h("span", { className: "mag-badge-in" }, "Premium") : null)),
            UNE.length > 1 ? h("div", { className: "mag-une-nav" },
                h("div", { className: "mag-compteur", "aria-live": "polite" }, h("b", null, deux((vedette % UNE.length) + 1)), h("i", { "aria-hidden": "true" }), deux(UNE.length)),
                h("button", { type: "button", className: "mag-rond mag-rond-g", "aria-label": N("suivant"), onClick: function () { setVedette((vedette + 1) % UNE.length); } }, chev)) : null),
        h("div", { className: "mag-vague mag-vague-b", "aria-hidden": "true" }));

    /* ---------- 4. À explorer selon tes envies ---------- */
    function theme(cls, img, pos, titre, sous, action) {
        return h("button", { type: "button", className: "mag-th " + cls, onClick: action },
            h("img", { src: img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: pos || "center" } }),
            h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
            h("span", { className: "mag-th-tx" }, h("b", null, titre), h("small", null, sous)),
            rond());
    }
    var explorer = h("section", { className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(N("explorer2"), N("voir_themes"), function () { aller("loin"); }),
        h("div", { className: "mag-themes" },
            theme("t1", "images/article-cso-appel.webp", "55% 40%", N("rub_technique"), N("d_technique"), function () { setTab("technique"); setQ(""); aller("derniers"); }),
            theme("t2", "images/galop5-c08-equilibre.webp", "60% 40%", N("rub_galops"), tr({ fr: "Tout le programme fédéral, chapitre par chapitre", en: "The full federal programme, chapter by chapter", es: "Todo el programa federal", it: "Tutto il programma federale", ja: "連盟プログラムのすべて", de: "Das gesamte Verbandsprogramm, Kapitel für Kapitel", ar: "\u0643\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0631\u0633\u0645\u064a\u060c \u0641\u0635\u0644\u0627 \u0628\u0641\u0635\u0644", zh: "完整的协会大纲，逐章学习", nl: "Het hele federale programma, hoofdstuk voor hoofdstuk", pt: "Todo o programa federal, capítulo por capítulo", sv: "Hela det nationella programmet, kapitel för kapitel", ru: "Вся федеральная программа, глава за главой", pl: "Cały program federalny, rozdział po rozdziale", ko: "연맹 전체 프로그램을 챕터별로" }), function () { setEcran("galops"); }),
            theme("t3", "images/cours-pansage-01_couverture_hero.webp", "60% 40%", N("tab_culture"), N("d_culture"), function () { setTab("culture"); aller("ecoles"); }),
            theme("t4", "images/cours-pansage-09_gestes_brossage.webp", "50% 50%", N("tab_soins"), N("d_soins"), function () { setEcran("sante"); }),
            theme("t5", "images/article-cso-saut.webp", "50% 40%", N("tab_competition"), N("d_competition"), function () { setTab("competition"); setQ(""); aller("derniers"); }))));

    /* ---------- 5. Derniers articles (filtrés par l'onglet ou la recherche) ---------- */
    function norm(s) { try { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch (e) { return String(s || "").toLowerCase(); } }
    var qn = norm(q.trim());
    var liste = ARTICLES.filter(function (a) { return tab === "technique" ? estTech(a) : tab === "competition" ? !estTech(a) : true; });
    var resultatsEcoles = [];
    if (qn) {
        liste = ARTICLES.filter(function (a) { return norm(titreDe(a) + " " + extraitDe(a)).indexOf(qn) >= 0; });
        resultatsEcoles = ECOLES.filter(function (e) { return norm(e.titre + " " + e.sous).indexOf(qn) >= 0; });
    }
    function carteArticle(a) {
        return h("button", { key: "a" + a.id, type: "button", className: "mag-ca", onClick: function () { ouvrirArticle(a); } },
            h("span", { className: "mag-ca-ph" }, imgDe(a) ? h("img", { src: imgDe(a), alt: "", loading: "lazy", decoding: "async" }) : null, a.nouveau ? h("span", { className: "mag-nouv" }, nouveauLabel) : null, badgePremium(a.premium && !premium)),
            h("span", { className: "mag-ca-tx" },
                h("small", { className: "mag-ca-cat" }, catDe(a)),
                h("b", null, titreDe(a)),
                h("span", { className: "mag-ca-bas" }, h("span", { className: "mag-ca-t" }, a.duree ? [horloge(), " ", a.duree] : null), rond())));
    }
    function carteEcole(e) {
        var bloque = !e.libre && !premium;
        return h("button", { key: e.ecran, type: "button", className: "mag-ca", onClick: function () { ouvrirEcole(e); } },
            h("span", { className: "mag-ca-ph" }, h("img", { src: e.img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: e.pos } }), badgePremium(bloque)),
            h("span", { className: "mag-ca-tx" },
                h("small", { className: "mag-ca-cat" }, e.dr + " " + e.sur),
                h("b", null, e.titre),
                h("span", { className: "mag-ca-bas" }, h("span", { className: "mag-ca-t mag-ca-s" }, e.sous), rond())));
    }
    var derniers = h("section", { ref: refs.derniers, className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(qn ? N("resultats") : N("derniers")),
        (liste.length + resultatsEcoles.length) ? h("div", { className: "mag-grille" }, liste.map(carteArticle), resultatsEcoles.map(carteEcole))
            : h("p", { className: "mag-vide" }, N("aucun"))));

    /* ---------- 6. Les grandes écoles (mêmes destinations et verrous Premium) ---------- */
    var ecoles = h("section", { ref: refs.ecoles, className: "mag-s" }, h("div", { className: "mag-w" },
        enTete(tr({ fr: "Les grandes écoles", en: "The great schools", es: "Las grandes escuelas", it: "Le grandi scuole", ja: "偉大な馬術学校", de: "Die großen Reitschulen", ar: "\u0627\u0644\u0645\u062f\u0627\u0631\u0633 \u0627\u0644\u0643\u0628\u0631\u0649", zh: "著名马术学校", nl: "De grote scholen", pt: "As grandes escolas", sv: "De stora skolorna", ru: "Великие школы", pl: "Wielkie szkoły", ko: "위대한 승마 학교" })),
        h("p", { className: "mag-intro" }, N("ecoles_sous")),
        h("div", { className: "mag-grille" }, ECOLES.map(carteEcole))));

    /* ---------- 7. Pour aller plus loin : Galops, Lamotte en direct, Santé, Hey Baby, vidéos ---------- */
    var loin = h("section", { ref: refs.loin, className: "mag-s mag-loin" }, h("div", { className: "mag-w" },
        enTete(N("plus_loin")),
        h("div", { ref: refs.galops, className: "mag-bloc mag-galops" },
            h("img", { src: "images/galop5-c08-equilibre.webp", alt: "", loading: "lazy", decoding: "async" }),
            h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
            h("div", { className: "mag-bloc-tx" },
                h("div", { className: "mag-cat" }, h("span", { "aria-hidden": "true" }), tr({ fr: "La Théorie des Galops", en: "Galop Theory", es: "Teoría de los Galops", it: "Teoria dei Galop", ja: "ガロップ理論", de: "Die Galopp-Theorie", ar: "\u0646\u0638\u0631\u064a\u0629 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u063a\u0627\u0644\u0648\u0628", zh: "Galop 理论", nl: "De theorie van de Galop-niveaus", pt: "A Teoria dos Galops", sv: "Galop-teorin", ru: "Теория Galop", pl: "Teoria Galopów", ko: "Galop 이론" })),
                h("h3", null, tr({ fr: "Galops 1 à 7", en: "Galops 1 to 7", es: "Galops 1 a 7", it: "Galop da 1 a 7", ja: "ガロップ1〜7", de: "Galopp 1 bis 7", ar: "\u0627\u0644\u063a\u0627\u0644\u0648\u0628 1 \u0625\u0644\u0649 7", zh: "Galop 1 至 7", nl: "Galop 1 tot 7", pt: "Galop 1 a 7", sv: "Galop 1 till 7", ru: "Galop 1–7", pl: "Galop 1–7", ko: "Galop 1~7" })),
                h("p", null, tr({ fr: "Tout le programme fédéral, chapitre par chapitre", en: "The full federal programme, chapter by chapter", es: "Todo el programa federal", it: "Tutto il programma federale", ja: "連盟プログラムのすべて", de: "Das gesamte Verbandsprogramm, Kapitel für Kapitel", ar: "\u0643\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0631\u0633\u0645\u064a\u060c \u0641\u0635\u0644\u0627 \u0628\u0641\u0635\u0644", zh: "完整的协会大纲，逐章学习", nl: "Het hele federale programma, hoofdstuk voor hoofdstuk", pt: "Todo o programa federal, capítulo por capítulo", sv: "Hela det nationella programmet, kapitel för kapitel", ru: "Вся федеральная программа, глава за главой", pl: "Cały program federalny, rozdział po rozdziale", ko: "연맹 전체 프로그램을 챕터별로" })),
                h("div", { className: "mag-gal" }, [1, 2, 3, 4, 5, 6, 7].map(function (g) {
                    return h("button", { key: g, type: "button", onClick: function () { setGalopOuvert(g); setEcran("galop-detail"); } }, tr({ fr: "Galop " + g, en: "Galop " + g, es: "Galop " + g, it: "Galop " + g, ja: "ガロップ " + g, de: "Galopp " + g, ar: "\u0627\u0644\u063a\u0627\u0644\u0648\u0628 " + g, zh: ("Galop " + g), nl: ("Galop " + g), pt: ("Galop " + g), sv: ("Galop " + g), ru: ("Galop " + g), pl: ("Galop " + g), ko: ("Galop " + g) }));
                })),
                h("button", { type: "button", className: "mag-btn", onClick: function () { setEcran("galops"); } }, N("rub_galops"), " ", h("span", { "aria-hidden": "true" }, fleche)))),
        h("button", { type: "button", className: "mag-live", onClick: function () { setEcran("evenement"); } },
            h("span", { className: "mag-live-d" }, h("i", { "aria-hidden": "true" }), tr({ fr: "En ce moment", en: "Live now", es: "Ahora", it: "In corso", ja: "開催中", de: "Gerade jetzt", ar: "\u062d\u0627\u0644\u064a\u0627", zh: "此刻", nl: "Op dit moment", pt: "Agora", sv: "Just nu", ru: "Прямо сейчас", pl: "Teraz na żywo", ko: "지금 이 순간" })),
            h("span", { className: "mag-live-t" }, h("b", null, "Lamotte-Beuvron"), tr({ fr: "Le Parc équestre fédéral en direct : mur, présents, résultats.", en: "The federal equestrian park live: wall, attendees, results.", es: "El parque ecuestre federal en directo.", it: "Il parco equestre federale in diretta.", ja: "連盟公園をライブで：掲示板・参加者・結果。", de: "Der Bundes-Reitpark live: Pinnwand, Anwesende, Ergebnisse.", ar: "\u0627\u0644\u0645\u0646\u062a\u0632\u0647 \u0627\u0644\u0641\u064a\u062f\u0631\u0627\u0644\u064a \u0644\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0645\u0628\u0627\u0634\u0631\u0629: \u0627\u0644\u062c\u062f\u0627\u0631\u060c \u0627\u0644\u062d\u0627\u0636\u0631\u0648\u0646\u060c \u0627\u0644\u0646\u062a\u0627\u0626\u062c.", zh: "联邦马术公园现场直播：留言墙、到场人员、成绩。", nl: "Het federale ruiterpark live: prikbord, aanwezigen, uitslagen.", pt: "O Parque Equestre Federal ao vivo: mural, presentes, resultados.", sv: "Parc équestre fédéral live: vägg, deltagare, resultat.", ru: "Федеральный конный парк в прямом эфире: стена, присутствующие, результаты.", pl: "Federalny Park Jeździecki na żywo: tablica, obecni, wyniki.", ko: "연방 승마 파크 생중계: 월, 참석자, 결과." })),
            rond()),
        h("div", { ref: refs.sante, className: "mag-duo" },
            h("button", { type: "button", className: "mag-th mag-duo-c", onClick: function () { setEcran("sante"); } },
                h("img", { src: "images/cours-pansage-09_gestes_brossage.webp", alt: "", loading: "lazy", decoding: "async" }),
                h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
                h("span", { className: "mag-th-tx" }, h("small", { className: "mag-cat-s" }, tr({ fr: "Hey Baby · Santé", en: "Hey Baby · Health", es: "Hey Baby · Salud", it: "Hey Baby · Salute", ja: "Hey Baby · 健康", de: "Hey Baby · Gesundheit", ar: "Hey Baby \u00b7 \u0627\u0644\u0635\u062d\u0629", zh: "Hey Baby · 健康", nl: "Hey Baby · Gezondheid", pt: "Hey Baby · Saúde", sv: "Hey Baby · Hälsa", ru: "Hey Baby · Здоровье", pl: "Hey Baby · Zdrowie", ko: "Hey Baby · 건강" })), h("b", null, tr({ fr: "Bien-être & Santé", en: "Wellbeing & Health", es: "Bienestar y salud", it: "Benessere e salute", ja: "健康と幸せ", de: "Wohlbefinden & Gesundheit", ar: "\u0627\u0644\u0631\u0641\u0627\u0647\u064a\u0629 \u0648\u0627\u0644\u0635\u062d\u0629", zh: "健康与保健", nl: "Welzijn & gezondheid", pt: "Bem-estar & Saúde", sv: "Välmående & hälsa", ru: "Благополучие и здоровье", pl: "Dobrostan i zdrowie", ko: "웰빙 & 건강" })), h("small", null, tr({ fr: "Coliques, boiteries, chaleurs, plaies, vermifuges — les essentiels.", en: "Colic, lameness, heat, wounds, deworming — the essentials.", es: "Cólicos, cojeras, calor, heridas, desparasitación.", it: "Coliche, zoppie, caldo, ferite, sverminazione.", ja: "疝痛・跛行・猛暑・傷・駆虫 — 基本のすべて。", de: "Koliken, Lahmheit, Hitze, Wunden, Entwurmung — das Wichtigste.", ar: "\u0627\u0644\u0645\u063a\u0635\u060c \u0627\u0644\u0639\u0631\u062c\u060c \u0627\u0644\u062d\u0631\u060c \u0627\u0644\u062c\u0631\u0648\u062d\u060c \u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646 \u2014 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0627\u062a.", zh: "疝痛、跛行、发情、伤口、驱虫——必知要点。", nl: "Koliek, kreupelheid, hengstigheid, wonden, ontwormingsmiddelen — de essentials.", pt: "Cólicas, claudicações, cios, feridas, vermífugos — o essencial.", sv: "Kolik, hälta, löpning, sår, avmaskning – det viktigaste.", ru: "Колики, хромота, течка, раны, глистогонные — самое важное.", pl: "Kolka, kulawizny, ruja, rany, odrobaczanie — najważniejsze informacje.", ko: "산통, 파행, 발정, 상처, 구충제 — 꼭 알아야 할 핵심." }))), rond()),
            h("button", { type: "button", className: "mag-th mag-duo-c", onClick: function () { setEcran("assistant"); } },
                h("img", { src: "images/cours-pansage-03_observer_approcher.webp", alt: "", loading: "lazy", decoding: "async", style: { objectPosition: "50% 40%" } }),
                h("span", { className: "mag-th-voile", "aria-hidden": "true" }),
                h("span", { className: "mag-th-tx" }, h("b", null, tr({ fr: "Parle avec Hey Baby", en: "Talk to Hey Baby", es: "Habla con Hey Baby", it: "Parla con Hey Baby", ja: "Hey Babyと話す", de: "Sprich mit Hey Baby", ar: "\u062a\u062d\u062f\u062b\u064a \u0645\u0639 Hey Baby", zh: "和 Hey Baby 聊聊", nl: "Praat met Hey Baby", pt: "Fale com a Hey Baby", sv: "Prata med Hey Baby", ru: "Поговори с Hey Baby", pl: "Porozmawiaj z Hey Baby", ko: "Hey Baby와 대화하기" })), h("small", null, tr({ fr: "Ton assistant équestre IA : pose tes questions, envoie tes photos, reçois des conseils de pro.", en: "Your AI equestrian assistant: ask questions, send photos, get pro advice.", es: "Tu asistente ecuestre IA: preguntas, fotos y consejos de pro.", it: "Il tuo assistente equestre IA: domande, foto e consigli da pro.", ja: "AI乗馬アシスタント：質問・写真・プロのアドバイス。", de: "Dein KI-Reitassistent: stelle Fragen, sende Fotos, erhalte Profi-Tipps.", ar: "\u0645\u0633\u0627\u0639\u062f\u0643 \u0627\u0644\u0630\u0643\u064a \u0641\u064a \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629: \u0627\u0637\u0631\u062d\u064a \u0623\u0633\u0626\u0644\u062a\u0643\u060c \u0623\u0631\u0633\u0644\u064a \u0635\u0648\u0631\u0643\u060c \u0648\u0627\u062d\u0635\u0644\u064a \u0639\u0644\u0649 \u0646\u0635\u0627\u0626\u062d \u0645\u062d\u062a\u0631\u0641\u0629.", zh: "你的马术 AI 助手：提出问题、发送照片，获得专业建议。", nl: "Je ruiter-assistent met AI: stel je vragen, stuur je foto’s, krijg adviezen van een prof.", pt: "Seu assistente equestre de IA: faça suas perguntas, envie suas fotos, receba conselhos de profissional.", sv: "Din ridassistent med AI: ställ dina frågor, skicka dina foton och få råd som från en proffs.", ru: "Твой конный ИИ-помощник: задавай вопросы, отправляй фото, получай советы как от профи.", pl: "Twój asystent jeździecki AI: zadawaj pytania, wysyłaj zdjęcia, otrzymuj porady jak od profesjonalisty.", ko: "나만의 AI 승마 도우미: 궁금한 걸 물어보고, 사진을 보내고, 전문가 조언을 받아 보세요." }))), rond())),
        h("div", { className: "mag-vid" }, h(EncartBibliothequeVideo, { compact: true })),
        h("div", { className: "mag-fil" }, h(FilAnnoncesC, null))));

    return h("div", { className: "mag", dir: rtl ? "rtl" : "ltr", lang: lg },
        h("style", null, CSS),
        couverture, onglets, une, explorer, derniers, ecoles, loin,
        mtPan ? h(PanneauConseilsHB, { depuis: "articles", onFermer: function () { setMtPan(false); } }) : null);
}

var CSS = [
".mag{--bg:#070A08;--bg2:#0B1311;--pe:#101D22;--or:#C9A66B;--iv:#F3EEE4;--tx:#C9D2CC;--mu:#9FB0AC;--li:rgba(201,166,107,.22);--se:'Cormorant Garamond',Georgia,serif;--sa:'Montserrat',Arial,sans-serif;container-type:inline-size;background:var(--bg);color:var(--iv);font-family:var(--sa);min-height:100vh;overflow-x:clip;padding-bottom:30px}",
".mag *{box-sizing:border-box}:where(.mag) button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:start}",
".mag button:focus-visible,.mag input:focus-visible{outline:2px solid var(--or);outline-offset:3px}",
".mag h1,.mag h2,.mag h3{font-family:var(--se);font-weight:500;color:var(--iv);margin:0;overflow-wrap:break-word}",
".mag-w{max-width:1180px;margin:0 auto;padding:0 20px}",
".mag-rond{width:34px;height:34px;flex:0 0 auto;border-radius:50%;border:1px solid var(--or);color:var(--or);display:inline-flex;align-items:center;justify-content:center;font-size:15px;line-height:1;background:rgba(7,10,8,.35)}",
".mag-badge{position:absolute;top:10px;inset-inline-end:10px;padding:3px 9px;border-radius:999px;background:rgba(7,8,10,.75);border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-nouv{position:absolute;top:10px;inset-inline-start:10px;padding:3px 9px;border-radius:999px;background:rgba(7,10,8,.7);border:1px solid rgba(201,166,107,.45);color:var(--iv);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600}",
".mag-btn{display:inline-flex;align-items:center;gap:12px;margin-top:20px;padding:12px 22px;border:1px solid var(--or);border-radius:999px;color:var(--iv);font-size:13.5px;background:rgba(7,10,8,.35)}",
".mag-btn span{color:var(--or)}",
/* couverture */
".mag-hero{position:relative;min-height:470px;display:flex;align-items:flex-end;overflow:hidden}",
".mag-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:76% 40%}",
".mag-hero-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.15) 0%,rgba(7,10,8,.25) 40%,rgba(7,10,8,.92) 100%),linear-gradient(90deg,rgba(7,10,8,.55),rgba(7,10,8,0) 70%)}",
".mag[dir=rtl] .mag-hero-voile{background:linear-gradient(180deg,rgba(7,10,8,.15) 0%,rgba(7,10,8,.25) 40%,rgba(7,10,8,.92) 100%),linear-gradient(270deg,rgba(7,10,8,.55),rgba(7,10,8,0) 70%)}",
".mag-hero-tx{position:relative;z-index:2;padding:0 22px 58px;max-width:640px}",
".mag-hero-bar{display:block;width:34px;height:2px;background:var(--or);margin-bottom:18px}",
".mag-hero h1{font-size:clamp(46px,13.5vw,58px);line-height:.98;letter-spacing:-.01em}",
".mag-hero p{font-size:15px;line-height:1.55;color:#e8ebe6;margin:16px 0 0;max-width:30ch}",
".mag-loupe-m{position:absolute;top:14px;inset-inline-end:14px;z-index:3;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--iv);background:rgba(7,10,8,.4)}",
".mag-rech{display:none;align-items:center;gap:10px;margin-top:22px;max-width:360px;padding:0 16px;height:48px;border:1px solid var(--or);border-radius:10px;background:rgba(7,10,8,.55);color:var(--iv)}",
".mag-rech.ouverte{display:flex}",
".mag-rech input{flex:1;min-width:0;background:none;border:0;color:var(--iv);font:inherit;font-size:14px;outline:none}",
".mag-rech input::placeholder{color:#c9cfca}",
".mag-vague{position:absolute;left:0;right:0;bottom:-1px;height:34px;background:var(--bg2);z-index:2;clip-path:polygon(0 70%,12% 52%,26% 46%,42% 58%,58% 74%,74% 66%,88% 40%,100% 34%,100% 100%,0 100%)}",
/* onglets */
".mag-tabs{display:flex;gap:26px;overflow-x:auto;padding:6px 22px 0;background:var(--bg2);scrollbar-width:none;border-bottom:1px solid #1d2a27;scroll-snap-type:x proximity;scroll-padding-inline:22px}",
".mag-tabs::-webkit-scrollbar{display:none}",
".mag-tabs button{flex:0 0 auto;scroll-snap-align:start;padding:12px 0 14px;font-size:14px;color:#dde3de;white-space:nowrap;border-bottom:2px solid transparent;min-height:44px}",
".mag-tabs button.on{color:var(--or);border-bottom-color:var(--or)}",
/* à la une */
".mag-une-s{position:relative;padding:28px 20px 0;background:var(--bg2)}",
".mag-une{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--li);min-height:330px;display:flex;align-items:center;max-width:1180px;margin:0 auto}",
".mag-une-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
".mag-une-voile{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.7) 45%,rgba(7,10,8,.1) 80%)}",
".mag[dir=rtl] .mag-une-voile{background:linear-gradient(270deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.7) 45%,rgba(7,10,8,.1) 80%)}",
".mag-une-tx{position:relative;z-index:2;padding:26px 20px 30px;width:72%}",
".mag-cat{display:flex;align-items:center;gap:10px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--or);font-weight:600}",
".mag-cat span{width:2px;height:14px;background:var(--or)}",
".mag-une-tx h2{font-size:clamp(27px,7.6vw,32px);line-height:1.08;margin:12px 0 0}",
".mag-une-tx p{font-size:13.5px;line-height:1.55;color:#e1e6df;margin:10px 0 0}",
".mag-une-meta{display:flex;align-items:center;gap:14px;margin-top:16px;font-size:12px;color:#d6dcd6}",
".mag-une-meta span{display:inline-flex;align-items:center;gap:6px}",
".mag-badge-in{padding:3px 9px;border-radius:999px;border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-une-nav{position:absolute;z-index:3;inset-inline-end:14px;bottom:14px;display:flex;align-items:center;gap:10px;padding:8px;border-radius:999px;background:rgba(7,10,8,.62)}",
".mag-une-tx h2 em{color:var(--or);font-style:italic}",
".mag-compteur{display:none;flex-direction:column;align-items:center;font-family:var(--se);font-size:15px;color:#cdd3ce;line-height:1.2}",
".mag-compteur b{color:var(--or);font-weight:500}.mag-compteur i{width:16px;height:1px;background:var(--or);margin:3px 0}",
".mag-rond-g{width:44px;height:44px;font-size:18px}",
".mag-vague-b{position:relative;bottom:auto;height:30px;margin-top:22px;background:var(--bg);clip-path:polygon(0 60%,14% 40%,30% 38%,46% 56%,62% 72%,78% 60%,92% 36%,100% 30%,100% 100%,0 100%)}",
/* sections */
".mag-s{padding-top:72px}",
".mag-eh{display:flex;align-items:center;flex-wrap:wrap;gap:8px 16px;margin-bottom:22px}",
".mag-eh h2{font-size:clamp(26px,7vw,30px);flex:0 1 auto}",
".mag-eh-l{flex:1 1 auto;height:1px;background:linear-gradient(90deg,var(--or),rgba(201,166,107,0));min-width:24px;max-width:200px}",
".mag[dir=rtl] .mag-eh-l{background:linear-gradient(270deg,var(--or),rgba(201,166,107,0))}",
".mag-voir{margin-inline-start:auto;flex:0 0 auto;font-size:12.5px;color:var(--or);white-space:nowrap}",
".mag-intro{color:var(--tx);font-size:14px;line-height:1.7;margin:-8px 0 22px;max-width:60ch}",
/* thèmes : grande verticale + deux horizontales, puis deux */
".mag-themes{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:110px;gap:12px}",
".mag-th{position:relative;display:block;width:100%;height:100%;border-radius:14px;overflow:hidden;border:1px solid var(--li);min-height:110px}",
".mag-th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
".mag-th-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 30%,rgba(7,10,8,.9) 100%)}",
".mag-th-tx{position:absolute;left:14px;right:56px;bottom:14px;display:flex;flex-direction:column;gap:4px}",
".mag[dir=rtl] .mag-th-tx{left:56px;right:14px}",
".mag-th-tx b{font-family:var(--se);font-weight:500;font-size:21px;line-height:1.1;color:var(--iv)}",
".mag-th-tx small{font-size:11.5px;line-height:1.4;color:#d4dad5;display:none}",
".mag-th>.mag-rond{position:absolute;bottom:12px;inset-inline-end:12px}",
".mag-th.t1{grid-row:span 2}.mag-th.t1 .mag-th-tx b{font-size:24px}",
".mag-th.t4,.mag-th.t5{grid-row:span 1}",
/* derniers articles : liste au téléphone */
".mag-grille{display:grid;gap:14px}",
".mag-ca{display:flex;gap:14px;align-items:center;width:100%;padding:10px;border-radius:14px;border:1px solid var(--li);background:#0B1311}",
".mag-ca-ph{position:relative;flex:0 0 112px;height:84px;border-radius:10px;overflow:hidden;background:#122326}",
".mag-ca-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-ca-ph .mag-nouv,.mag-ca-ph .mag-badge{display:none}",
".mag-ca-tx{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:5px}",
".mag-ca-cat{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--or);font-weight:600}",
".mag-ca-tx b{font-family:var(--se);font-weight:500;font-size:19px;line-height:1.15;color:var(--iv)}",
".mag-ca-bas{display:flex;align-items:center;justify-content:space-between;gap:10px}",
".mag-ca-t{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:#cfd5d0;min-width:0}",
".mag-ca-s{display:block;font-size:11.5px;line-height:1.45;color:var(--mu)}",
".mag-ca .mag-rond{width:30px;height:30px;font-size:13px}",
".mag-vide{color:var(--mu);font-size:14px}",
/* plus loin */
".mag-bloc{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--li);min-height:360px;display:flex;align-items:flex-end}",
".mag-bloc>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 35%}",
".mag-bloc .mag-th-voile{background:linear-gradient(180deg,rgba(7,10,8,.1) 0%,rgba(7,10,8,.92) 70%)}",
".mag-bloc-tx{position:relative;z-index:2;padding:22px 20px 24px}",
".mag-bloc-tx h3{font-size:30px;margin-top:10px}.mag-bloc-tx p{font-size:13.5px;line-height:1.55;color:#dde2dd;margin:8px 0 0}",
".mag-gal{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}",
".mag-gal button{min-height:38px;padding:0 14px;border-radius:999px;border:1px solid rgba(243,238,228,.28);font-size:12.5px;color:var(--iv);background:rgba(7,10,8,.45)}",
".mag-live{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;width:100%;margin-top:18px;padding:16px;border-radius:14px;border:1px solid var(--li);background:#0B1311}",
".mag-live-d{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#E8A08C;font-weight:600}",
".mag-live-d i{width:7px;height:7px;border-radius:50%;background:#E8A08C;display:inline-block}",
".mag-live-t{flex:1 1 180px;min-width:0;font-size:12.5px;line-height:1.5;color:var(--mu)}",
".mag-live-t b{display:block;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv)}",
".mag-duo{display:grid;grid-template-columns:1fr;gap:14px;margin-top:18px}",
".mag-duo-c{min-height:190px}.mag-duo-c .mag-th-tx small{display:block}",
".mag-cat-s{font-size:9.5px !important;letter-spacing:.18em;text-transform:uppercase;color:var(--or) !important;font-weight:600}",
".mag-vid{margin-top:18px}.mag-fil{margin:26px -20px 0}",
/* tablette */
"@container (min-width:640px){.mag-w{padding:0 36px}.mag-tabs{padding:6px 36px 0;gap:34px}.mag-une-s{padding:30px 36px 0}.mag-hero-tx{padding:0 36px 70px}.mag-hero{min-height:500px}.mag-loupe-m{display:none}.mag-rech{display:flex}",
".mag-une{min-height:400px}.mag-une-tx{width:58%;padding:36px 36px 40px}.mag-compteur{display:flex}.mag-une-nav{flex-direction:column;gap:18px;bottom:24px;inset-inline-end:24px}",
".mag-themes{grid-template-columns:repeat(6,1fr);grid-auto-rows:150px;gap:14px}.mag-th.t1{grid-column:span 2;grid-row:span 2}.mag-th.t2,.mag-th.t3{grid-column:span 4}.mag-th.t4,.mag-th.t5{grid-column:span 3}.mag-th-tx small{display:block}",
".mag-grille{grid-template-columns:repeat(2,1fr);gap:18px}.mag-ca{flex-direction:column;align-items:stretch;padding:0;overflow:hidden}.mag-ca-ph{flex:none;width:100%;height:auto;aspect-ratio:4/3;border-radius:0}.mag-ca-ph .mag-nouv,.mag-ca-ph .mag-badge{display:inline-block}.mag-ca-tx{padding:14px 16px 16px;flex:1 1 auto;gap:8px}.mag-ca-tx b{font-size:21px}.mag-ca-bas{margin-top:auto;padding-top:6px}",
".mag-duo{grid-template-columns:1fr 1fr}.mag-bloc{min-height:380px}.mag-bloc-tx{max-width:560px;padding:30px 32px 32px}}",
/* ordinateur : maquette MIX 2+3 */
"@container (min-width:1000px){.mag-w{padding:0 48px}.mag-hero{min-height:520px;align-items:center}.mag-hero-voile{background:linear-gradient(90deg,rgba(7,10,8,.88) 0%,rgba(7,10,8,.55) 38%,rgba(7,10,8,0) 66%),linear-gradient(0deg,rgba(7,10,8,.6),rgba(7,10,8,0) 30%)}",
".mag[dir=rtl] .mag-hero-voile{background:linear-gradient(270deg,rgba(7,10,8,.88) 0%,rgba(7,10,8,.55) 38%,rgba(7,10,8,0) 66%),linear-gradient(0deg,rgba(7,10,8,.6),rgba(7,10,8,0) 30%)}",
".mag-hero-tx{padding:70px 64px 90px}.mag-hero-bar{display:none}.mag-hero h1{font-size:76px}.mag-hero p{font-size:21px;font-family:var(--se);max-width:24ch;line-height:1.35}.mag-rech{margin-top:30px}",
".mag-tabs{justify-content:space-between;padding:8px 64px 0;gap:30px}.mag-tabs button{font-size:16px;font-family:var(--se)}",
".mag-une-s{padding:0}.mag-une{border-radius:0;border:0;min-height:460px;max-width:none}.mag-une-tx{width:46%;padding:60px 64px 64px}.mag-une-tx h2{font-size:48px}.mag-une-tx p{font-size:19px;font-family:var(--se);line-height:1.4}.mag-une-nav{inset-inline-end:40px;bottom:40px}.mag-vague-b{margin-top:-30px;z-index:3}",
".mag-s{padding-top:110px}.mag-eh h2{font-size:38px}.mag-eh{margin-bottom:30px}",
".mag-themes{grid-template-columns:repeat(5,1fr);grid-auto-rows:auto}.mag-th.t1,.mag-th.t2,.mag-th.t3,.mag-th.t4,.mag-th.t5{grid-column:auto;grid-row:auto;aspect-ratio:3/5;height:auto}.mag-th.t2,.mag-th.t4{margin-top:0}.mag-th-tx b{font-size:24px !important}.mag-th-tx{bottom:62px;right:16px;left:16px}.mag[dir=rtl] .mag-th-tx{left:16px;right:16px}.mag-th>.mag-rond{bottom:16px}",
".mag-grille{grid-template-columns:repeat(4,1fr);gap:22px}",
".mag-bloc{min-height:440px;align-items:center}.mag-bloc .mag-th-voile{background:linear-gradient(90deg,rgba(7,10,8,.9) 0%,rgba(7,10,8,.6) 40%,rgba(7,10,8,0) 70%)}.mag-bloc-tx{padding:48px 56px}.mag-bloc-tx h3{font-size:40px}",
".mag-duo-c{min-height:260px}}"
].join("");

window.HypeArticles = { Articles: EcranArticles };
})();
