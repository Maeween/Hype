/* HYPE ▸ 31/10/2026 — Page « Le Mag / Culture équestre » (EcranArticles) — REFONTE magazine (pack « HYPE_CULTURE_MAGAZINE », mélange 2 + 3).
   FICHIER GÉNÉRÉ par outils/mag/generer.py (modèle outils/mag/modele.js) : les textes déjà en ligne sont repris TELS QUELS de
   l'ancienne page (outils/mag/ancienne-page.js), les nouveaux textes viennent de outils/mag/textes.json (14 langues).
   Contenu conservé (rien retiré) : tous les ARTICLES (dont « À la une » = premier article qui a sa propre page), les 4 grandes écoles
   (mêmes verrous Premium), La théorie des Galops (page Galops + accès direct Galop 1 à 7), Lamotte-Beuvron en direct, Bien-être & Santé,
   Hey Baby, la Bibliothèque vidéo (EncartBibliothequeVideo), le fil d'annonces (FilAnnoncesC), le panneau des conseils Hey Baby
   (retour depuis un conseil). Nouveauté : rubrique « Technique équestre » = articles de catégorie « Technique équestre ».
   Rubriques en haut = vrais liens vers chaque partie de la page. Classes CSS « mag- » (aucun effet sur les autres pages). */
(function () {
var NV = {"rubriques": {"fr": "Rubriques", "en": "Sections", "es": "Secciones", "it": "Rubriche", "ja": "カテゴリー", "de": "Rubriken", "ar": "الأقسام", "zh": "栏目", "nl": "Rubrieken", "pt": "Seções", "sv": "Avdelningar", "ru": "Рубрики", "pl": "Działy", "ko": "카테고리"}, "rub_technique": {"fr": "Technique équestre", "en": "Riding technique", "es": "Técnica ecuestre", "it": "Tecnica equestre", "ja": "乗馬テクニック", "de": "Reittechnik", "ar": "تقنيات الفروسية", "zh": "马术技术", "nl": "Rijtechniek", "pt": "Técnica equestre", "sv": "Ridteknik", "ru": "Техника верховой езды", "pl": "Technika jeździecka", "ko": "승마 기술"}, "rub_galops": {"fr": "Galops", "en": "Galops", "es": "Galops", "it": "Galop", "ja": "ガロップ", "de": "Galopp", "ar": "الغالوب", "zh": "Galop 等级", "nl": "Galops", "pt": "Galops", "sv": "Galops", "ru": "Galops", "pl": "Galopy", "ko": "Galop"}, "tech_intro": {"fr": "Trajectoires, équilibre, cadence, position : des analyses pour comprendre ce que vit ton cheval et progresser avec lui.", "en": "Lines, balance, rhythm, position: analyses to understand what your horse goes through and progress together.", "es": "Trayectorias, equilibrio, cadencia, posición: análisis para entender lo que vive tu caballo y progresar con él.", "it": "Traiettorie, equilibrio, cadenza, posizione: analisi per capire cosa vive il tuo cavallo e progredire con lui.", "ja": "ライン、バランス、リズム、姿勢。愛馬の動きを理解し、一緒に上達するための解説。", "de": "Linienführung, Gleichgewicht, Takt, Sitz: Analysen, um zu verstehen, was dein Pferd erlebt, und gemeinsam weiterzukommen.", "ar": "المسارات، التوازن، الإيقاع، الجلسة: تحليلات لتفهمي ما يعيشه حصانكِ وتتقدّمي معه.", "zh": "路线、平衡、节奏、姿势：帮助你理解马匹的感受，与它一起进步的分析。", "nl": "Lijnen, balans, cadans, zit: analyses om te begrijpen wat je paard ervaart en samen vooruit te gaan.", "pt": "Trajetórias, equilíbrio, cadência, posição: análises para entender o que seu cavalo vive e evoluir com ele.", "sv": "Linjer, balans, takt, sits: analyser för att förstå vad din häst upplever och utvecklas tillsammans.", "ru": "Траектории, баланс, ритм, посадка: разборы, чтобы понять, что чувствует твоя лошадь, и расти вместе с ней.", "pl": "Linie, równowaga, kadencja, dosiad: analizy, by zrozumieć, co przeżywa twój koń, i robić postępy razem z nim.", "ko": "라인, 균형, 리듬, 자세: 말이 겪는 것을 이해하고 함께 성장하기 위한 분석이에요."}, "tech_hb_titre": {"fr": "Une question technique ?", "en": "A technical question?", "es": "¿Una pregunta técnica?", "it": "Una domanda tecnica?", "ja": "技術的な質問がある？", "de": "Eine Technikfrage?", "ar": "سؤال تقني؟", "zh": "有技术问题？", "nl": "Een technische vraag?", "pt": "Uma dúvida técnica?", "sv": "En teknisk fråga?", "ru": "Технический вопрос?", "pl": "Pytanie techniczne?", "ko": "기술 질문이 있나요?"}, "tech_hb_texte": {"fr": "Pose-la à Hey Baby, ton assistant équestre.", "en": "Ask Hey Baby, your riding assistant.", "es": "Pregúntale a Hey Baby, tu asistente ecuestre.", "it": "Chiedi a Hey Baby, il tuo assistente equestre.", "ja": "乗馬アシスタントの Hey Baby に聞いてみよう。", "de": "Frag Hey Baby, deinen Reitassistenten.", "ar": "اسألي Hey Baby، مساعدتكِ في الفروسية.", "zh": "问问你的马术助手 Hey Baby。", "nl": "Vraag het aan Hey Baby, je ruiterassistent.", "pt": "Pergunte à Hey Baby, sua assistente equestre.", "sv": "Fråga Hey Baby, din ridassistent.", "ru": "Спроси Hey Baby, своего помощника по верховой езде.", "pl": "Zapytaj Hey Baby, swojego asystenta jeździeckiego.", "ko": "승마 도우미 Hey Baby에게 물어보세요."}, "explorer": {"fr": "Explorer par univers", "en": "Explore by theme", "es": "Explorar por temas", "it": "Esplora per temi", "ja": "テーマから探す", "de": "Nach Themen entdecken", "ar": "استكشفي حسب المواضيع", "zh": "按主题探索", "nl": "Ontdek per thema", "pt": "Explorar por temas", "sv": "Utforska efter tema", "ru": "Темы для изучения", "pl": "Odkrywaj według tematów", "ko": "주제별로 둘러보기"}, "ecoles_sous": {"fr": "Saumur, Lisbonne, Vienne, Jerez : quatre écoles, quatre arts équestres.", "en": "Saumur, Lisbon, Vienna, Jerez: four schools, four equestrian arts.", "es": "Saumur, Lisboa, Viena, Jerez: cuatro escuelas, cuatro artes ecuestres.", "it": "Saumur, Lisbona, Vienna, Jerez: quattro scuole, quattro arti equestri.", "ja": "ソミュール、リスボン、ウィーン、ヘレス。4つの学校、4つの馬術芸術。", "de": "Saumur, Lissabon, Wien, Jerez: vier Schulen, vier Reitkünste.", "ar": "سومور، لشبونة، فيينا، خيريث: أربع مدارس وأربعة فنون للفروسية.", "zh": "索米尔、里斯本、维也纳、赫雷斯：四所学校，四种马术艺术。", "nl": "Saumur, Lissabon, Wenen, Jerez: vier scholen, vier rijkunsten.", "pt": "Saumur, Lisboa, Viena, Jerez: quatro escolas, quatro artes equestres.", "sv": "Saumur, Lissabon, Wien, Jerez: fyra skolor, fyra ridkonster.", "ru": "Сомюр, Лиссабон, Вена, Херес: четыре школы, четыре искусства верховой езды.", "pl": "Saumur, Lizbona, Wiedeń, Jerez: cztery szkoły, cztery sztuki jeździeckie.", "ko": "소뮈르, 리스본, 빈, 헤레스: 네 학교, 네 가지 마술 예술."}, "galops_ouvrir": {"fr": "Ouvrir un Galop", "en": "Open a Galop", "es": "Abrir un Galop", "it": "Apri un Galop", "ja": "ガロップを開く", "de": "Einen Galopp öffnen", "ar": "افتحي مستوى غالوب", "zh": "打开一个 Galop", "nl": "Een Galop openen", "pt": "Abrir um Galop", "sv": "Öppna en Galop", "ru": "Открыть Galop", "pl": "Otwórz Galop", "ko": "Galop 열기"}, "lire": {"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"}};
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
    var stR = React.useState("une"); var rubrique = stR[0], setRubrique = stR[1];
    var refs = { une: React.useRef(null), technique: React.useRef(null), actus: React.useRef(null), ecoles: React.useRef(null), galops: React.useRef(null), sante: React.useRef(null) };
    function aller(cle) {
        setRubrique(cle);
        var el = refs[cle] && refs[cle].current;
        if (!el) return;
        try {
            var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var y = el.getBoundingClientRect().top + window.pageYOffset - 24;
            window.scrollTo({ top: y, behavior: reduit ? "auto" : "smooth" });
        } catch (eS) { try { el.scrollIntoView(); } catch (e2) { } }
    }
    var fleche = rtl ? "←" : "→";
    var chev = rtl ? "‹" : "›";

    function titreDe(a) { return (typeof a.titre === "object") ? tr(a.titre) : a.titre; }
    function extraitDe(a) { return (typeof a.extrait === "object") ? tr(a.extrait) : (a.extrait || ""); }
    function ouvrirArticle(a) {
        if (a.ecran) { setEcran(a.ecran); return; }
        if (a.premium && !premium) { setEcran("premium"); return; }
        try { window.__articleOuvert = a.id; } catch (e) { }
        setEcran("article-detail");
    }
    var aLaUne = null; for (var iU = 0; iU < ARTICLES.length; iU++) { if (ARTICLES[iU].ecran) { aLaUne = ARTICLES[iU]; break; } }
    var techniques = ARTICLES.filter(function (a) { return a.categorie === "Technique équestre"; });
    var actus = ARTICLES.filter(function (a) { return a.categorie !== "Technique équestre"; });
    var IMG_UNE = { "article-cso": "images/article-cso-virage.webp" };
    var IMG_TECH = { "article-cso": "images/article-cso-appel.webp" };

    function badgePremium(a) { return (a.premium && !premium) ? h("span", { className: "mag-badge" }, "Premium") : null; }
    function surtitre(txt) { return h("div", { className: "mag-sur" }, txt); }
    function section(cle, numero, titre, enfants, cls) {
        return h("section", { ref: cle ? refs[cle] : null, className: "mag-s " + (cls || ""), "data-rubrique": cle || null },
            h("div", { className: "mag-w" },
                h("header", { className: "mag-sh" },
                    numero ? h("span", { className: "mag-num" }, numero) : null,
                    numero ? h("span", { className: "mag-sep" }) : null,
                    h("h2", null, titre)),
                enfants));
    }

    /* ---------- 1. Couverture ---------- */
    var couverture = h("header", { className: "mag-cov" },
        h("div", { className: "mag-cov-ph" }, h("img", { src: "images/cheval-defaut-alezan.webp", alt: "", decoding: "async", fetchpriority: "high" })),
        h("div", { className: "mag-cov-tx" },
            surtitre(hypeT7("Hype · Le Mag", "Hype \u00b7 The Mag", "Hype \u00b7 La Revista", "Hype \u00b7 Il Magazine", "Hype \u00b7 \u30de\u30ac\u30b8\u30f3", "Hype \u00b7 Das Magazin", "Hype \u00b7 \u0627\u0644\u0645\u062c\u0644\u0629", "Hype · 杂志", "Hype · De Mag", "Hype · O Mag", "Hype · Magasinet", "Hype · Журнал", "Hype · Magazyn", "Hype · 매거진")),
            h("h1", null, tr({ fr: "Théorie & Culture équestre", en: "Equestrian Theory & Culture", es: "Teoría y cultura ecuestre", it: "Teoria e cultura equestre", ja: "馬術の理論と文化", de: "Reittheorie & -kultur", ar: "\u0627\u0644\u0646\u0638\u0631\u064a\u0629 \u0648\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629", zh: "理论与马术文化", nl: "Theorie & paardencultuur", pt: "Teoria & Cultura equestre", sv: "Teori & ridkultur", ru: "Теория и конная культура", pl: "Teoria i kultura jeździecka", ko: "이론 & 승마 문화" })),
            h("span", { className: "mag-bar" }),
            h("p", null, tr({ fr: "La connaissance au service du cavalier.", en: "Knowledge in the service of the rider.", es: "El conocimiento al servicio del jinete.", it: "La conoscenza al servizio del cavaliere.", ja: "知識は騎手のために。", de: "Wissen im Dienste des Reiters.", ar: "\u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0641\u064a \u062e\u062f\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u0633.", zh: "用知识帮助骑手进步。", nl: "Kennis ten dienste van de ruiter.", pt: "O conhecimento a serviço do cavaleiro.", sv: "Kunskap i ryttarens tjänst.", ru: "Знания на службе всадника.", pl: "Wiedza w służbie jeźdźca.", ko: "기수를 위한 지식." }))));

    /* ---------- 2. Rubriques (vrais liens vers les parties de la page) ---------- */
    var listeRub = [["une", tr({ fr: "À la une", en: "Featured", es: "Destacado", it: "In evidenza", ja: "注目", de: "Im Fokus", ar: "\u0641\u064a \u0627\u0644\u0648\u0627\u062c\u0647\u0629", zh: "置顶", nl: "Uitgelicht", pt: "Em destaque", sv: "Utvalt", ru: "На главной", pl: "Wyróżnione", ko: "대표" })], ["technique", N("rub_technique")], ["actus", tr({ fr: "Articles", en: "Articles", es: "Artículos", it: "Articoli", ja: "記事", de: "Artikel", ar: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a", zh: "文章", nl: "Artikelen", pt: "Artigos", sv: "Artiklar", ru: "Статьи", pl: "Artykuły", ko: "아티클" })], ["ecoles", tr({ fr: "Les grandes écoles", en: "The great schools", es: "Las grandes escuelas", it: "Le grandi scuole", ja: "偉大な馬術学校", de: "Die großen Reitschulen", ar: "\u0627\u0644\u0645\u062f\u0627\u0631\u0633 \u0627\u0644\u0643\u0628\u0631\u0649", zh: "著名马术学校", nl: "De grote scholen", pt: "As grandes escolas", sv: "De stora skolorna", ru: "Великие школы", pl: "Wielkie szkoły", ko: "위대한 승마 학교" })], ["galops", N("rub_galops")], ["sante", tr({ fr: "Soins vétérinaires", en: "Veterinary care", es: "Cuidados veterinarios", it: "Cure veterinarie", ja: "獣医ケア", de: "Tierärztliche Pflege", ar: "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0637\u0631\u064a\u0629", zh: "兽医护理", nl: "Dierenartszorg", pt: "Cuidados veterinários", sv: "Veterinärvård", ru: "Ветеринарный уход", pl: "Opieka weterynaryjna", ko: "수의 케어" })]];
    var rubriques = h("nav", { className: "mag-rub", "aria-label": N("rubriques") },
        listeRub.map(function (r) {
            return h("button", { key: r[0], type: "button", className: "mag-chip" + (rubrique === r[0] ? " on" : ""), "aria-current": rubrique === r[0] ? "true" : null, onClick: function () { aller(r[0]); } }, r[1]);
        }));

    /* ---------- 3. À la une ---------- */
    var une = aLaUne ? h("section", { ref: refs.une, className: "mag-s mag-une-s", "data-rubrique": "une" },
        h("div", { className: "mag-w" },
            h("button", { type: "button", className: "mag-une", "data-a-la-une": "1", onClick: function () { ouvrirArticle(aLaUne); } },
                h("div", { className: "mag-une-ph" }, h("img", { src: IMG_UNE[aLaUne.ecran] || aLaUne.tuile, alt: "", loading: "lazy", decoding: "async" }), badgePremium(aLaUne)),
                h("div", { className: "mag-une-tx" },
                    surtitre(tr({ fr: "À la une", en: "Featured", es: "Destacado", it: "In evidenza", ja: "注目", de: "Im Fokus", ar: "\u0641\u064a \u0627\u0644\u0648\u0627\u062c\u0647\u0629", zh: "置顶", nl: "Uitgelicht", pt: "Em destaque", sv: "Utvalt", ru: "На главной", pl: "Wyróżnione", ko: "대표" }) + " · " + tr({"fr": "Le conseil du coach", "en": "Coach’s tip", "es": "El consejo del entrenador", "it": "Il consiglio del coach", "ja": "コーチのアドバイス", "de": "Der Tipp vom Coach", "ar": "نصيحة المدرّب", "zh": "教练建议", "nl": "Het advies van de coach", "pt": "A dica do treinador", "sv": "Tränarens råd", "ru": "Совет тренера", "pl": "Rada trenera", "ko": "코치의 조언"})),
                    h("h3", null, titreDe(aLaUne)),
                    h("p", null, extraitDe(aLaUne)),
                    h("div", { className: "mag-cta" }, h("span", null, tr({"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"})), h("span", { "aria-hidden": "true" }, fleche)),
                    h("div", { className: "mag-meta" }, N("rub_technique") + (aLaUne.duree ? " · " + aLaUne.duree + " " + lectureLabel : "")))))) : null;

    /* ---------- 4. Technique équestre (nouvelle rubrique) ---------- */
    var technique = section("technique", "01", N("rub_technique"), [
        h("p", { key: "i", className: "mag-intro" }, N("tech_intro")),
        h("div", { key: "l", className: "mag-tech" }, techniques.map(function (a) {
            return h("button", { key: a.id, type: "button", className: "mag-tech-a", onClick: function () { ouvrirArticle(a); } },
                h("div", { className: "mag-tech-ph" }, h("img", { src: IMG_TECH[a.ecran] || a.tuile, alt: "", loading: "lazy", decoding: "async" }), badgePremium(a)),
                h("div", { className: "mag-tech-tx" },
                    surtitre(tr({"fr": "Le conseil du coach", "en": "Coach’s tip", "es": "El consejo del entrenador", "it": "Il consiglio del coach", "ja": "コーチのアドバイス", "de": "Der Tipp vom Coach", "ar": "نصيحة المدرّب", "zh": "教练建议", "nl": "Het advies van de coach", "pt": "A dica do treinador", "sv": "Tränarens råd", "ru": "Совет тренера", "pl": "Rada trenera", "ko": "코치의 조언"})),
                    h("h3", null, titreDe(a)),
                    h("div", { className: "mag-meta" }, (a.duree ? a.duree + " " + lectureLabel : "")),
                    h("div", { className: "mag-cta mag-cta-l" }, h("span", null, tr({"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"})), h("span", { "aria-hidden": "true" }, fleche))));
        })),
        h("button", { key: "hb", type: "button", className: "mag-hb", onClick: function () { setEcran("assistant"); } },
            h("span", null, h("b", null, N("tech_hb_titre")), N("tech_hb_texte")),
            h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))
    ], "mag-pe");

    /* ---------- 5. Explorer par univers (mosaïque asymétrique) ---------- */
    function tuile(cls, img, sur, titre, sous, action, extra) {
        return h("button", { type: "button", className: "mag-t " + cls, onClick: action },
            h("div", { className: "mag-t-ph" }, img ? h("img", { src: img, alt: "", loading: "lazy", decoding: "async" }) : null, extra || null),
            h("div", { className: "mag-t-tx" },
                sur ? surtitre(sur) : null,
                h("h3", null, titre),
                sous ? h("p", null, sous) : null,
                h("span", { className: "mag-rond", "aria-hidden": "true" }, chev)));
    }
    var IMG_CN = "https://commons.wikimedia.org/wiki/Special:FilePath/Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg?width=900";
    var explorer = h("section", { ref: refs.galops, className: "mag-s", "data-rubrique": "galops" },
        h("div", { className: "mag-w" },
            h("header", { className: "mag-sh" }, h("span", { className: "mag-num" }, "02"), h("span", { className: "mag-sep" }), h("h2", null, N("explorer"))),
            h("div", { className: "mag-mos" },
                tuile("mag-t-galops", "images/galop5-c08-equilibre.webp", null, tr({ fr: "La Théorie des Galops", en: "Galop Theory", es: "Teoría de los Galops", it: "Teoria dei Galop", ja: "ガロップ理論", de: "Die Galopp-Theorie", ar: "\u0646\u0638\u0631\u064a\u0629 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u063a\u0627\u0644\u0648\u0628", zh: "Galop 理论", nl: "De theorie van de Galop-niveaus", pt: "A Teoria dos Galops", sv: "Galop-teorin", ru: "Теория Galop", pl: "Teoria Galopów", ko: "Galop 이론" }), tr({ fr: "Tout le programme fédéral, chapitre par chapitre", en: "The full federal programme, chapter by chapter", es: "Todo el programa federal", it: "Tutto il programma federale", ja: "連盟プログラムのすべて", de: "Das gesamte Verbandsprogramm, Kapitel für Kapitel", ar: "\u0643\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0631\u0633\u0645\u064a\u060c \u0641\u0635\u0644\u0627 \u0628\u0641\u0635\u0644", zh: "完整的协会大纲，逐章学习", nl: "Het hele federale programma, hoofdstuk voor hoofdstuk", pt: "Todo o programa federal, capítulo por capítulo", sv: "Hela det nationella programmet, kapitel för kapitel", ru: "Вся федеральная программа, глава за главой", pl: "Cały program federalny, rozdział po rozdziale", ko: "연맹 전체 프로그램을 챕터별로" }), function () { setEcran("galops"); }),
                tuile("mag-t-ecoles", IMG_CN, null, tr({ fr: "Les grandes écoles", en: "The great schools", es: "Las grandes escuelas", it: "Le grandi scuole", ja: "偉大な馬術学校", de: "Die großen Reitschulen", ar: "\u0627\u0644\u0645\u062f\u0627\u0631\u0633 \u0627\u0644\u0643\u0628\u0631\u0649", zh: "著名马术学校", nl: "De grote scholen", pt: "As grandes escolas", sv: "De stora skolorna", ru: "Великие школы", pl: "Wielkie szkoły", ko: "위대한 승마 학교" }), N("ecoles_sous"), function () { aller("ecoles"); }),
                tuile("mag-t-sante", "images/cours-pansage-01_couverture_hero.webp", tr({ fr: "Hey Baby · Santé", en: "Hey Baby · Health", es: "Hey Baby · Salud", it: "Hey Baby · Salute", ja: "Hey Baby · 健康", de: "Hey Baby · Gesundheit", ar: "Hey Baby \u00b7 \u0627\u0644\u0635\u062d\u0629", zh: "Hey Baby · 健康", nl: "Hey Baby · Gezondheid", pt: "Hey Baby · Saúde", sv: "Hey Baby · Hälsa", ru: "Hey Baby · Здоровье", pl: "Hey Baby · Zdrowie", ko: "Hey Baby · 건강" }), tr({ fr: "Bien-être & Santé", en: "Wellbeing & Health", es: "Bienestar y salud", it: "Benessere e salute", ja: "健康と幸せ", de: "Wohlbefinden & Gesundheit", ar: "\u0627\u0644\u0631\u0641\u0627\u0647\u064a\u0629 \u0648\u0627\u0644\u0635\u062d\u0629", zh: "健康与保健", nl: "Welzijn & gezondheid", pt: "Bem-estar & Saúde", sv: "Välmående & hälsa", ru: "Благополучие и здоровье", pl: "Dobrostan i zdrowie", ko: "웰빙 & 건강" }), tr({ fr: "Coliques, boiteries, chaleurs, plaies, vermifuges — les essentiels.", en: "Colic, lameness, heat, wounds, deworming — the essentials.", es: "Cólicos, cojeras, calor, heridas, desparasitación.", it: "Coliche, zoppie, caldo, ferite, sverminazione.", ja: "疝痛・跛行・猛暑・傷・駆虫 — 基本のすべて。", de: "Koliken, Lahmheit, Hitze, Wunden, Entwurmung — das Wichtigste.", ar: "\u0627\u0644\u0645\u063a\u0635\u060c \u0627\u0644\u0639\u0631\u062c\u060c \u0627\u0644\u062d\u0631\u060c \u0627\u0644\u062c\u0631\u0648\u062d\u060c \u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646 \u2014 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0627\u062a.", zh: "疝痛、跛行、发情、伤口、驱虫——必知要点。", nl: "Koliek, kreupelheid, hengstigheid, wonden, ontwormingsmiddelen — de essentials.", pt: "Cólicas, claudicações, cios, feridas, vermífugos — o essencial.", sv: "Kolik, hälta, löpning, sår, avmaskning – det viktigaste.", ru: "Колики, хромота, течка, раны, глистогонные — самое важное.", pl: "Kolka, kulawizny, ruja, rany, odrobaczanie — najważniejsze informacje.", ko: "산통, 파행, 발정, 상처, 구충제 — 꼭 알아야 할 핵심." }), function () { setEcran("sante"); }),
                tuile("mag-t-hb", (typeof IMG_HEYBABY_AVATAR !== "undefined") ? IMG_HEYBABY_AVATAR : "", null, tr({ fr: "Parle avec Hey Baby", en: "Talk to Hey Baby", es: "Habla con Hey Baby", it: "Parla con Hey Baby", ja: "Hey Babyと話す", de: "Sprich mit Hey Baby", ar: "\u062a\u062d\u062f\u062b\u064a \u0645\u0639 Hey Baby", zh: "和 Hey Baby 聊聊", nl: "Praat met Hey Baby", pt: "Fale com a Hey Baby", sv: "Prata med Hey Baby", ru: "Поговори с Hey Baby", pl: "Porozmawiaj z Hey Baby", ko: "Hey Baby와 대화하기" }), tr({ fr: "Ton assistant équestre IA : pose tes questions, envoie tes photos, reçois des conseils de pro.", en: "Your AI equestrian assistant: ask questions, send photos, get pro advice.", es: "Tu asistente ecuestre IA: preguntas, fotos y consejos de pro.", it: "Il tuo assistente equestre IA: domande, foto e consigli da pro.", ja: "AI乗馬アシスタント：質問・写真・プロのアドバイス。", de: "Dein KI-Reitassistent: stelle Fragen, sende Fotos, erhalte Profi-Tipps.", ar: "\u0645\u0633\u0627\u0639\u062f\u0643 \u0627\u0644\u0630\u0643\u064a \u0641\u064a \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629: \u0627\u0637\u0631\u062d\u064a \u0623\u0633\u0626\u0644\u062a\u0643\u060c \u0623\u0631\u0633\u0644\u064a \u0635\u0648\u0631\u0643\u060c \u0648\u0627\u062d\u0635\u0644\u064a \u0639\u0644\u0649 \u0646\u0635\u0627\u0626\u062d \u0645\u062d\u062a\u0631\u0641\u0629.", zh: "你的马术 AI 助手：提出问题、发送照片，获得专业建议。", nl: "Je ruiter-assistent met AI: stel je vragen, stuur je foto’s, krijg adviezen van een prof.", pt: "Seu assistente equestre de IA: faça suas perguntas, envie suas fotos, receba conselhos de profissional.", sv: "Din ridassistent med AI: ställ dina frågor, skicka dina foton och få råd som från en proffs.", ru: "Твой конный ИИ-помощник: задавай вопросы, отправляй фото, получай советы как от профи.", pl: "Twój asystent jeździecki AI: zadawaj pytania, wysyłaj zdjęcia, otrzymuj porady jak od profesjonalisty.", ko: "나만의 AI 승마 도우미: 궁금한 걸 물어보고, 사진을 보내고, 전문가 조언을 받아 보세요." }), function () { setEcran("assistant"); })),
            h("div", { className: "mag-gal" },
                h("div", { className: "mag-sur" }, N("galops_ouvrir")),
                h("div", { className: "mag-gal-l" }, [1, 2, 3, 4, 5, 6, 7].map(function (g) {
                    return h("button", { key: g, type: "button", className: "mag-chip", onClick: function () { setGalopOuvert(g); setEcran("galop-detail"); } }, tr({ fr: "Galop " + g, en: "Galop " + g, es: "Galop " + g, it: "Galop " + g, ja: "ガロップ " + g, de: "Galopp " + g, ar: "\u0627\u0644\u063a\u0627\u0644\u0648\u0628 " + g, zh: ("Galop " + g), nl: ("Galop " + g), pt: ("Galop " + g), sv: ("Galop " + g), ru: ("Galop " + g), pl: ("Galop " + g), ko: ("Galop " + g) }));
                })))));

    /* ---------- 6. Respiration : citation du coach (texte de l'article publié) ---------- */
    var respiration = aLaUne && aLaUne.ecran === "article-cso" ? h("section", { className: "mag-s mag-cit-s" },
        h("div", { className: "mag-wave", "aria-hidden": "true" }),
        h("div", { className: "mag-w mag-cit" },
            h("div", { className: "mag-cit-ph" }, h("img", { src: "images/article-cso-hero.webp", alt: "", loading: "lazy", decoding: "async" })),
            h("figure", { className: "mag-cit-tx" },
                h("span", { className: "mag-qm", "aria-hidden": "true" }, rtl ? "”" : "“"),
                h("blockquote", null, tr({"fr": "Le meilleur parcours n’est pas toujours celui où l’on retire le plus de foulées.", "en": "The best round isn’t always the one where you leave out the most strides.", "es": "El mejor recorrido no siempre es aquel en el que se quitan más trancos.", "it": "Il percorso migliore non è sempre quello in cui si tolgono più falcate.", "ja": "最高の走行とは、必ずしも完歩をいちばん多く削った走行ではありません。", "de": "Die beste Runde ist nicht immer die, in der man die meisten Galoppsprünge einspart.", "ar": "أفضل مسار ليس دائمًا ذلك الذي تُحذف فيه أكبر عدد من الخطوات.", "zh": "最好的一轮，并不总是少跑步数最多的那一轮。", "nl": "Het beste parcours is niet altijd het parcours waarin je de meeste galopsprongen weglaat.", "pt": "O melhor percurso nem sempre é aquele em que se tiram mais galões.", "sv": "Den bästa rundan är inte alltid den där man tar bort flest galoppsprång.", "ru": "Лучший маршрут — не всегда тот, в котором убрано больше всего темпов.", "pl": "Najlepszy przejazd to nie zawsze ten, w którym urywa się najwięcej ful.", "ko": "최고의 주행이 언제나 보폭을 가장 많이 줄인 주행은 아니에요."})),
                h("figcaption", null, tr({"fr": "Le conseil du coach Hype", "en": "The Hype coach’s tip", "es": "El consejo del entrenador Hype", "it": "Il consiglio del coach Hype", "ja": "Hype コーチのアドバイス", "de": "Der Tipp vom Hype-Coach", "ar": "نصيحة مدرّب Hype", "zh": "Hype 教练建议", "nl": "Het advies van de Hype-coach", "pt": "A dica do treinador Hype", "sv": "Hype-tränarens råd", "ru": "Совет тренера Hype", "pl": "Rada trenera Hype", "ko": "Hype 코치의 조언"})),
                h("button", { type: "button", className: "mag-cta", onClick: function () { ouvrirArticle(aLaUne); } }, h("span", null, tr({"fr": "Lire l’article", "en": "Read the article", "es": "Leer el artículo", "it": "Leggi l’articolo", "ja": "記事を読む", "de": "Artikel lesen", "ar": "اقرئي المقال", "zh": "阅读文章", "nl": "Lees het artikel", "pt": "Ler o artigo", "sv": "Läs artikeln", "ru": "Читать статью", "pl": "Przeczytaj artykuł", "ko": "기사 읽기"})), h("span", { "aria-hidden": "true" }, fleche))))) : null;

    /* ---------- 7. Articles (actualités) + Lamotte en direct ---------- */
    var articles = section("actus", "03", tr({ fr: "Articles", en: "Articles", es: "Artículos", it: "Articoli", ja: "記事", de: "Artikel", ar: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a", zh: "文章", nl: "Artikelen", pt: "Artigos", sv: "Artiklar", ru: "Статьи", pl: "Artykuły", ko: "아티클" }), [
        h("div", { key: "fil", className: "mag-fil" }, h(FilAnnoncesC, null)),
        h("div", { key: "l", className: "mag-art" }, actus.map(function (a, i) {
            return h("button", { key: a.id, type: "button", className: "mag-a mag-a" + i, onClick: function () { ouvrirArticle(a); } },
                h("div", { className: "mag-a-ph" },
                    a.tuile ? h("img", { src: a.tuile, alt: "", loading: "lazy", decoding: "async" }) : null,
                    a.nouveau ? h("span", { className: "mag-nouv" }, nouveauLabel) : null, badgePremium(a)),
                h("div", { className: "mag-a-tx" },
                    h("h3", null, titreDe(a)),
                    i === 0 ? h("p", null, extraitDe(a)) : null,
                    h("div", { className: "mag-meta" }, (a.duree ? a.duree + " " + lectureLabel : ""))));
        })),
        h("button", { key: "lam", type: "button", className: "mag-live", onClick: function () { setEcran("evenement"); } },
            h("span", { className: "mag-live-d" }, h("i", { "aria-hidden": "true" }), tr({ fr: "En ce moment", en: "Live now", es: "Ahora", it: "In corso", ja: "開催中", de: "Gerade jetzt", ar: "\u062d\u0627\u0644\u064a\u0627", zh: "此刻", nl: "Op dit moment", pt: "Agora", sv: "Just nu", ru: "Прямо сейчас", pl: "Teraz na żywo", ko: "지금 이 순간" })),
            h("span", { className: "mag-live-t" }, h("b", null, "Lamotte-Beuvron"), tr({ fr: "Le Parc équestre fédéral en direct : mur, présents, résultats.", en: "The federal equestrian park live: wall, attendees, results.", es: "El parque ecuestre federal en directo.", it: "Il parco equestre federale in diretta.", ja: "連盟公園をライブで：掲示板・参加者・結果。", de: "Der Bundes-Reitpark live: Pinnwand, Anwesende, Ergebnisse.", ar: "\u0627\u0644\u0645\u0646\u062a\u0632\u0647 \u0627\u0644\u0641\u064a\u062f\u0631\u0627\u0644\u064a \u0644\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0645\u0628\u0627\u0634\u0631\u0629: \u0627\u0644\u062c\u062f\u0627\u0631\u060c \u0627\u0644\u062d\u0627\u0636\u0631\u0648\u0646\u060c \u0627\u0644\u0646\u062a\u0627\u0626\u062c.", zh: "联邦马术公园现场直播：留言墙、到场人员、成绩。", nl: "Het federale ruiterpark live: prikbord, aanwezigen, uitslagen.", pt: "O Parque Equestre Federal ao vivo: mural, presentes, resultados.", sv: "Parc équestre fédéral live: vägg, deltagare, resultat.", ru: "Федеральный конный парк в прямом эфире: стена, присутствующие, результаты.", pl: "Federalny Park Jeździecki na żywo: tablica, obecni, wyniki.", ko: "연방 승마 파크 생중계: 월, 참석자, 결과." })),
            h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))
    ], "mag-pe");

    /* ---------- 8. Les grandes écoles (mêmes destinations et verrous Premium qu'avant) ---------- */
    function WIKI(nom) { return "https://commons.wikimedia.org/wiki/Special:FilePath/" + nom + "?width=1100"; }
    var ECOLES = [
        { cls: "mag-e0", ecran: "cadre-noir", libre: true, img: WIKI("Grand%20man%C3%A9ge%20des%20%C3%A9cuyers%20du%20Cadre%20noir.jpg"), pos: "center 40%", dr: "🇫🇷", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("Le Cadre Noir de Saumur", "The Cadre Noir of Saumur", "El Cadre Noir de Saumur", "Il Cadre Noir di Saumur", "\u30bd\u30df\u30e5\u30fc\u30eb\u306e\u30ab\u30c9\u30eb\u30fb\u30ce\u30ef\u30fc\u30eb", "Der Cadre Noir von Saumur", "\u0627\u0644\u0643\u0627\u062f\u0631 \u0646\u0648\u0627\u0631 \u0641\u064a \u0633\u0648\u0645\u0648\u0631", "索缪尔黑骑士（Cadre Noir）", "Het Cadre Noir van Saumur", "O Cadre Noir de Saumur", "Cadre Noir i Saumur", "Cadre Noir из Сомюра", "Cadre Noir w Saumur", "소뮈르의 카드르 누아르"), sous: tr({ fr: "Deux siècles d\u2019excellence au service de l\u2019art équestre français.", en: "Two centuries of excellence in the service of French equestrian art.", es: "Dos siglos de excelencia al servicio del arte ecuestre francés.", it: "Due secoli di eccellenza al servizio dell\u2019arte equestre francese.", ja: "フランス馬術芸術に捧げた二世紀の卓越。", de: "Zwei Jahrhunderte Exzellenz im Dienste der französischen Reitkunst.", ar: "\u0642\u0631\u0646\u0627\u0646 \u0645\u0646 \u0627\u0644\u062a\u0645\u064a\u0632 \u0641\u064a \u062e\u062f\u0645\u0629 \u0641\u0646 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a.", zh: "两个世纪的卓越，致力于法国马术艺术。", nl: "Twee eeuwen uitmuntendheid ten dienste van de Franse ruiterkunst.", pt: "Dois séculos de excelência a serviço da arte equestre francesa.", sv: "Två sekel av excellens i den franska ridkonstens tjänst.", ru: "Два века мастерства на службе французского конного искусства.", pl: "Dwa wieki doskonałości w służbie francuskiej sztuki jeździeckiej.", ko: "프랑스 승마 예술을 위해 이어 온 두 세기의 탁월함." }) },
        { cls: "mag-e1", ecran: "ecole-portugaise", img: WIKI("Queluz%20Solo%20Picador%20%289181009668%29%20%28cropped%29.jpg"), pos: "center 26%", dr: "🇵🇹", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Portugaise d'Art Équestre", "The Portuguese School of Equestrian Art", "La Escuela Portuguesa de Arte Ecuestre", "La Scuola Portoghese d\u2019Arte Equestre", "\u30dd\u30eb\u30c8\u30ac\u30eb\u99ac\u8853\u5b66\u6821", "Die Portugiesische Reitkunstschule", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644\u064a\u0629 \u0644\u0641\u0646 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629", "葡萄牙马术艺术学校", "De Portugese School voor Rijkunst", "A Escola Portuguesa de Arte Equestre", "Portugisiska ridkonstskolan", "Португальская школа конного искусства", "Portugalska Szkoła Sztuki Jeździeckiej", "포르투갈 승마 예술 학교"), sous: tr({ fr: "L\u2019\u00e9l\u00e9gance du Lusitanien et la m\u00e9moire vivante de la cour portugaise.", en: "The elegance of the Lusitano and the living memory of the Portuguese court.", es: "La elegancia del lusitano y la memoria viva de la corte portuguesa.", it: "L\u2019eleganza del Lusitano e la memoria viva della corte portoghese.", ja: "ルシタノの優雅さと、ポルトガル宮廷の生きた記憶。", de: "Die Eleganz des Lusitano und die lebendige Erinnerung an den portugiesischen Hof.", ar: "\u0623\u0646\u0627\u0642\u0629 \u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0644\u0648\u0632\u064a\u062a\u0627\u0646\u064a \u0648\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062d\u064a\u0629 \u0644\u0644\u0628\u0644\u0627\u0637 \u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644\u064a.", zh: "卢西塔诺马的优雅，与葡萄牙宫廷鲜活的记忆。", nl: "De elegantie van de Lusitano en het levende geheugen van het Portugese hof.", pt: "A elegância do Lusitano e a memória viva da corte portuguesa.", sv: "Lusitanons elegans och det portugisiska hovets levande minne.", ru: "Элегантность лузитано и живая память португальского двора.", pl: "Elegancja lusitano i żywa pamięć dworu portugalskiego.", ko: "루지타노의 우아함, 그리고 포르투갈 궁정의 살아 있는 기억." }) },
        { cls: "mag-e2", ecran: "ecole-vienne", img: WIKI("Spanische%20Hofreitschule%20Wien%20Vienna%20Winter%20riding%20manege%201.jpg"), pos: "center 34%", dr: "🇦🇹", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Espagnole de Vienne", "The Spanish Riding School of Vienna", "La Escuela Espa\u00f1ola de Equitaci\u00f3n de Viena", "La Scuola Spagnola di Vienna", "\u30a6\u30a3\u30fc\u30f3\u30fb\u30b9\u30da\u30a4\u30f3\u4e57\u99ac\u5b66\u6821", "Die Spanische Hofreitschule Wien", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0625\u0633\u0628\u0627\u0646\u064a\u0629 \u0644\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0641\u064a \u0641\u064a\u064a\u0646\u0627", "维也纳西班牙马术学校", "De Spaanse Rijschool van Wenen", "A Escola Espanhola de Viena", "Spanska ridskolan i Wien", "Испанская школа верховой езды в Вене", "Hiszpańska Szkoła Jazdy Konnej w Wiedniu", "빈 스페인 승마학교"), sous: tr({ fr: "Les Lipizzans blancs dans la plus ancienne tradition équestre vivante.", en: "The white Lipizzaners in the oldest living equestrian tradition.", es: "Los lipizanos blancos en la tradición ecuestre viva más antigua.", it: "I Lipizzani bianchi nella più antica tradizione equestre vivente.", ja: "現存する最古の馬術伝統に生きる白いリピッツァナー。", de: "Die weißen Lipizzaner in der ältesten lebendigen Reittradition.", ar: "\u062e\u064a\u0648\u0644 \u0627\u0644\u0644\u064a\u0628\u064a\u0632\u0627\u0646 \u0627\u0644\u0628\u064a\u0636\u0627\u0621 \u0641\u064a \u0623\u0642\u062f\u0645 \u062a\u0642\u0644\u064a\u062f \u0641\u0631\u0648\u0633\u064a\u0629 \u062d\u064a.", zh: "白色利皮扎马，演绎着最古老、至今鲜活的马术传统。", nl: "De witte Lipizzaners in de oudste nog levende ruitertraditie.", pt: "Os Lipizzanos brancos na mais antiga tradição equestre viva.", sv: "De vita lipizzanerna i den äldsta fortfarande levande ridtraditionen.", ru: "Белые липицианы в старейшей из живых конных традиций.", pl: "Białe lipicany w najstarszej żywej tradycji jeździeckiej.", ko: "가장 오래 이어져 온 살아 있는 승마 전통 속의 하얀 리피자너들." }) },
        { cls: "mag-e3", ecran: "ecole-jerez", img: WIKI("Jerez-Real%20Escuela%20Andaluza%20del%20Arte%20Equestre-Palacio%20Duque%20de%20Abrantes-20110914.jpg"), pos: "center 40%", dr: "🇪🇸", sur: tr({ fr: "Article immersif", en: "Immersive article", es: "Artículo inmersivo", it: "Articolo immersivo", ja: "没入型記事", de: "Immersiver Artikel", ar: "\u0645\u0642\u0627\u0644 \u062a\u0641\u0627\u0639\u0644\u064a", zh: "沉浸式文章", nl: "Meeslepend artikel", pt: "Artigo imersivo", sv: "Fördjupande artikel", ru: "Статья-погружение", pl: "Artykuł immersyjny", ko: "몰입형 아티클" }), titre: hypeT7("L'École Royale Andalouse", "The Royal Andalusian School", "La Real Escuela Andaluza", "La Scuola Reale Andalusa", "\u738b\u7acb\u30a2\u30f3\u30c0\u30eb\u30b7\u30a2\u99ac\u8853\u5b66\u6821", "Die K\u00f6niglich Andalusische Reitschule", "\u0627\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0623\u0646\u062f\u0644\u0633\u064a\u0629", "皇家安达卢西亚马术学校", "De Koninklijke Andalusische School", "A Real Escola Andaluza", "Kungliga andalusiska skolan", "Королевская андалузская школа", "Królewska Szkoła Andaluzyjska", "왕립 안달루시아 승마학교"), sous: tr({ fr: "Le cheval espagnol danse entre flamenco et haute école, à Jerez.", en: "The Spanish horse dances between flamenco and High School, in Jerez.", es: "El caballo español baila entre flamenco y alta escuela, en Jerez.", it: "Il cavallo spagnolo danza tra flamenco e alta scuola, a Jerez.", ja: "ヘレスで、フラメンコと高等馬術の間に踊るスペインの馬。", de: "Das spanische Pferd tanzt zwischen Flamenco und Hoher Schule, in Jerez.", ar: "\u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0625\u0633\u0628\u0627\u0646\u064a \u064a\u0631\u0642\u0635 \u0628\u064a\u0646 \u0627\u0644\u0641\u0644\u0627\u0645\u0646\u0643\u0648 \u0648\u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629 \u0627\u0644\u0639\u0644\u064a\u0627 \u0641\u064a \u062e\u064a\u0631\u064a\u062b.", zh: "西班牙马在赫雷斯，于弗拉门戈与高等马术之间起舞。", nl: "Het Spaanse paard danst tussen flamenco en hoge school, in Jerez.", pt: "O cavalo espanhol dança entre o flamenco e a alta escola, em Jerez.", sv: "Den spanska hästen dansar mellan flamenco och höga skolan, i Jerez.", ru: "Испанская лошадь танцует между фламенко и высшей школой, в Хересе.", pl: "Koń hiszpański tańczy między flamenco a wyższą szkołą jazdy, w Jerez.", ko: "스페인 말이 헤레스에서 플라멩코와 고등 마술 사이를 오가며 춤을 춰요." }) }
    ];
    var ecoles = section("ecoles", "04", tr({ fr: "Les grandes écoles", en: "The great schools", es: "Las grandes escuelas", it: "Le grandi scuole", ja: "偉大な馬術学校", de: "Die großen Reitschulen", ar: "\u0627\u0644\u0645\u062f\u0627\u0631\u0633 \u0627\u0644\u0643\u0628\u0631\u0649", zh: "著名马术学校", nl: "De grote scholen", pt: "As grandes escolas", sv: "De stora skolorna", ru: "Великие школы", pl: "Wielkie szkoły", ko: "위대한 승마 학교" }), [
        h("p", { key: "i", className: "mag-intro" }, N("ecoles_sous")),
        h("div", { key: "g", className: "mag-eco" }, ECOLES.map(function (e) {
            var bloque = !e.libre && !premium;
            return h("button", { key: e.ecran, type: "button", className: "mag-e " + e.cls, onClick: function () { if (bloque) { setEcran("premium"); return; } setEcran(e.ecran); } },
                h("div", { className: "mag-e-ph" }, h("img", { src: e.img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: e.pos } }), bloque ? h("span", { className: "mag-badge" }, "Premium") : null),
                h("div", { className: "mag-e-tx" },
                    surtitre(e.dr + " " + e.sur),
                    h("h3", null, e.titre),
                    h("p", null, e.sous)));
        }))
    ]);

    /* ---------- 9. Santé, vidéos ---------- */
    var sante = section("sante", "05", tr({ fr: "Soins vétérinaires", en: "Veterinary care", es: "Cuidados veterinarios", it: "Cure veterinarie", ja: "獣医ケア", de: "Tierärztliche Pflege", ar: "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0637\u0631\u064a\u0629", zh: "兽医护理", nl: "Dierenartszorg", pt: "Cuidados veterinários", sv: "Veterinärvård", ru: "Ветеринарный уход", pl: "Opieka weterynaryjna", ko: "수의 케어" }), [
        h("button", { key: "s", type: "button", className: "mag-sante", onClick: function () { setEcran("sante"); } },
            h("div", { className: "mag-sante-ph" }, h("img", { src: "images/cours-pansage-09_gestes_brossage.webp", alt: "", loading: "lazy", decoding: "async" })),
            h("div", { className: "mag-sante-tx" }, surtitre(tr({ fr: "Hey Baby · Santé", en: "Hey Baby · Health", es: "Hey Baby · Salud", it: "Hey Baby · Salute", ja: "Hey Baby · 健康", de: "Hey Baby · Gesundheit", ar: "Hey Baby \u00b7 \u0627\u0644\u0635\u062d\u0629", zh: "Hey Baby · 健康", nl: "Hey Baby · Gezondheid", pt: "Hey Baby · Saúde", sv: "Hey Baby · Hälsa", ru: "Hey Baby · Здоровье", pl: "Hey Baby · Zdrowie", ko: "Hey Baby · 건강" })), h("h3", null, tr({ fr: "Bien-être & Santé", en: "Wellbeing & Health", es: "Bienestar y salud", it: "Benessere e salute", ja: "健康と幸せ", de: "Wohlbefinden & Gesundheit", ar: "\u0627\u0644\u0631\u0641\u0627\u0647\u064a\u0629 \u0648\u0627\u0644\u0635\u062d\u0629", zh: "健康与保健", nl: "Welzijn & gezondheid", pt: "Bem-estar & Saúde", sv: "Välmående & hälsa", ru: "Благополучие и здоровье", pl: "Dobrostan i zdrowie", ko: "웰빙 & 건강" })), h("p", null, tr({ fr: "Coliques, boiteries, chaleurs, plaies, vermifuges — les essentiels.", en: "Colic, lameness, heat, wounds, deworming — the essentials.", es: "Cólicos, cojeras, calor, heridas, desparasitación.", it: "Coliche, zoppie, caldo, ferite, sverminazione.", ja: "疝痛・跛行・猛暑・傷・駆虫 — 基本のすべて。", de: "Koliken, Lahmheit, Hitze, Wunden, Entwurmung — das Wichtigste.", ar: "\u0627\u0644\u0645\u063a\u0635\u060c \u0627\u0644\u0639\u0631\u062c\u060c \u0627\u0644\u062d\u0631\u060c \u0627\u0644\u062c\u0631\u0648\u062d\u060c \u0645\u0636\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u064a\u062f\u0627\u0646 \u2014 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0627\u062a.", zh: "疝痛、跛行、发情、伤口、驱虫——必知要点。", nl: "Koliek, kreupelheid, hengstigheid, wonden, ontwormingsmiddelen — de essentials.", pt: "Cólicas, claudicações, cios, feridas, vermífugos — o essencial.", sv: "Kolik, hälta, löpning, sår, avmaskning – det viktigaste.", ru: "Колики, хромота, течка, раны, глистогонные — самое важное.", pl: "Kolka, kulawizny, ruja, rany, odrobaczanie — najważniejsze informacje.", ko: "산통, 파행, 발정, 상처, 구충제 — 꼭 알아야 할 핵심." })), h("span", { className: "mag-rond", "aria-hidden": "true" }, chev))),
        h("div", { key: "v", className: "mag-vid" }, h(EncartBibliothequeVideo, { compact: true })),
        h("button", { key: "hb", type: "button", className: "mag-hb", onClick: function () { setEcran("assistant"); } },
            h("span", null, h("b", null, tr({ fr: "Parle avec Hey Baby", en: "Talk to Hey Baby", es: "Habla con Hey Baby", it: "Parla con Hey Baby", ja: "Hey Babyと話す", de: "Sprich mit Hey Baby", ar: "\u062a\u062d\u062f\u062b\u064a \u0645\u0639 Hey Baby", zh: "和 Hey Baby 聊聊", nl: "Praat met Hey Baby", pt: "Fale com a Hey Baby", sv: "Prata med Hey Baby", ru: "Поговори с Hey Baby", pl: "Porozmawiaj z Hey Baby", ko: "Hey Baby와 대화하기" })), tr({ fr: "Ton assistant équestre IA : pose tes questions, envoie tes photos, reçois des conseils de pro.", en: "Your AI equestrian assistant: ask questions, send photos, get pro advice.", es: "Tu asistente ecuestre IA: preguntas, fotos y consejos de pro.", it: "Il tuo assistente equestre IA: domande, foto e consigli da pro.", ja: "AI乗馬アシスタント：質問・写真・プロのアドバイス。", de: "Dein KI-Reitassistent: stelle Fragen, sende Fotos, erhalte Profi-Tipps.", ar: "\u0645\u0633\u0627\u0639\u062f\u0643 \u0627\u0644\u0630\u0643\u064a \u0641\u064a \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629: \u0627\u0637\u0631\u062d\u064a \u0623\u0633\u0626\u0644\u062a\u0643\u060c \u0623\u0631\u0633\u0644\u064a \u0635\u0648\u0631\u0643\u060c \u0648\u0627\u062d\u0635\u0644\u064a \u0639\u0644\u0649 \u0646\u0635\u0627\u0626\u062d \u0645\u062d\u062a\u0631\u0641\u0629.", zh: "你的马术 AI 助手：提出问题、发送照片，获得专业建议。", nl: "Je ruiter-assistent met AI: stel je vragen, stuur je foto’s, krijg adviezen van een prof.", pt: "Seu assistente equestre de IA: faça suas perguntas, envie suas fotos, receba conselhos de profissional.", sv: "Din ridassistent med AI: ställ dina frågor, skicka dina foton och få råd som från en proffs.", ru: "Твой конный ИИ-помощник: задавай вопросы, отправляй фото, получай советы как от профи.", pl: "Twój asystent jeździecki AI: zadawaj pytania, wysyłaj zdjęcia, otrzymuj porady jak od profesjonalisty.", ko: "나만의 AI 승마 도우미: 궁금한 걸 물어보고, 사진을 보내고, 전문가 조언을 받아 보세요." })),
            h("span", { className: "mag-cta mag-cta-l" }, h("span", null, tr({ fr: "Ouvrir Hey Baby", en: "Open Hey Baby", es: "Abrir Hey Baby", it: "Apri Hey Baby", ja: "Hey Babyを開く", de: "Hey Baby öffnen", ar: "\u0641\u062a\u062d Hey Baby", zh: "打开 Hey Baby", nl: "Hey Baby openen", pt: "Abrir a Hey Baby", sv: "Öppna Hey Baby", ru: "Открыть Hey Baby", pl: "Otwórz Hey Baby", ko: "Hey Baby 열기" })), h("span", { "aria-hidden": "true" }, fleche)))
    ], "mag-pe");

    return h("div", { className: "mag", dir: rtl ? "rtl" : "ltr", lang: lg },
        h("style", null, CSS),
        couverture, rubriques, une, technique, explorer, respiration, articles, ecoles, sante,
        mtPan ? h(PanneauConseilsHB, { depuis: "articles", onFermer: function () { setMtPan(false); } }) : null);
}

var CSS = [
".mag{--bg:#070A08;--pe:#101D22;--or:#C9A66B;--iv:#F3EEE4;--tx:#C9D2CC;--mu:#9FB0AC;--se:'Cormorant Garamond',Georgia,serif;--sa:'Montserrat',Arial,sans-serif;container-type:inline-size;background:var(--bg);color:var(--iv);font-family:var(--sa);min-height:100vh;overflow-x:clip;padding-bottom:24px}",
".mag *{box-sizing:border-box}:where(.mag) button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:start}",
".mag button:focus-visible{outline:2px solid var(--or);outline-offset:3px}",
".mag-w{max-width:1180px;margin:0 auto;padding:0 22px}",
".mag-sur{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--or);font-weight:600;line-height:1.5}",
".mag h1,.mag h2,.mag h3{font-family:var(--se);font-weight:500;color:var(--iv);margin:0;overflow-wrap:break-word}",
".mag-meta{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mu);margin-top:12px}",
".mag-badge{position:absolute;top:12px;inset-inline-end:12px;padding:3px 9px;border-radius:999px;background:rgba(7,8,10,.75);border:1px solid rgba(201,166,107,.6);color:#E8C887;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}",
".mag-nouv{position:absolute;top:12px;inset-inline-start:12px;padding:3px 9px;border-radius:999px;background:rgba(7,10,8,.7);border:1px solid rgba(201,166,107,.45);color:var(--iv);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600}",
".mag-cta{display:inline-flex;align-items:center;gap:14px;margin-top:22px;padding:13px 22px;border:1px solid var(--or);border-radius:999px;color:var(--iv);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;background:rgba(7,10,8,.4)}",
".mag-cta span:last-child{color:var(--or);font-size:15px}",
".mag-cta-l{padding:0;border:0;background:none;margin-top:16px;color:var(--or)}",
".mag-rond{width:34px;height:34px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(201,166,107,.6);color:var(--or);display:inline-flex;align-items:center;justify-content:center;font-size:17px;line-height:1}",
/* couverture */
".mag-cov{position:relative;background:radial-gradient(circle at 70% 40%,#15241f 0%,#08100c 60%,#070a08 100%)}",
".mag-cov-ph{height:min(78vw,380px);overflow:hidden;position:relative}",
".mag-cov-ph img{width:100%;height:100%;object-fit:cover;object-position:72% 40%;display:block}",
".mag-cov-ph:after{content:'';position:absolute;inset:auto 0 0 0;height:45%;background:linear-gradient(180deg,rgba(7,10,8,0),#070A08)}",
".mag-cov-tx{position:relative;padding:4px 24px 44px}",
".mag-cov h1{font-size:clamp(40px,12vw,54px);line-height:.98;margin:14px 0 18px;letter-spacing:-.01em}",
".mag-bar{display:block;width:46px;height:2px;background:var(--or);margin-bottom:16px}",
".mag-cov p{font-family:var(--se);font-size:20px;line-height:1.4;color:#e4e8e1;margin:0;max-width:30ch}",
/* rubriques */
".mag-rub{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:22px;padding:16px 22px 18px;border-top:1px solid #1f2b28;border-bottom:1px solid #1f2b28;background:#08100d;scrollbar-width:none;-webkit-overflow-scrolling:touch}",
".mag-rub::-webkit-scrollbar{display:none}",
".mag-chip{flex:0 0 auto;scroll-snap-align:start;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid #34463f;color:#d6ded8;font-size:12.5px;letter-spacing:.04em;white-space:nowrap;display:inline-flex;align-items:center}",
".mag-chip.on{border-color:var(--or);color:var(--or);background:rgba(201,166,107,.08)}",
/* sections */
".mag-s{padding:84px 0 0}",
".mag-pe{background:var(--pe);padding-bottom:84px;margin-top:84px}",
".mag-sh{display:flex;align-items:center;gap:14px;margin-bottom:26px;flex-wrap:wrap}",
".mag-num{font-family:var(--se);font-size:30px;color:var(--or);line-height:1}",
".mag-sep{width:40px;height:1px;background:var(--or);flex:0 0 auto}",
".mag-sh h2{font-size:clamp(30px,8.6vw,40px);line-height:1.05;flex:1 1 100%}",
".mag-intro{color:var(--tx);font-size:15px;line-height:1.75;margin:-6px 0 30px;max-width:56ch}",
/* à la une */
".mag-une-s{padding-top:56px}",
".mag-une{display:block;width:100%;position:relative}",
".mag-une-ph{position:relative;margin:0 -22px;aspect-ratio:4/3;overflow:hidden}",
".mag-une-ph img{width:100%;height:100%;object-fit:cover;object-position:40% 55%;display:block}",
".mag-une-tx{position:relative;margin:-38px 0 0 18px;padding:26px 22px 28px;background:linear-gradient(160deg,#101D22,#0a1210);border:1px solid rgba(201,166,107,.28);border-inline-end:0}",
".mag[dir=rtl] .mag-une-tx{margin:-38px 18px 0 0;border-inline-end:1px solid rgba(201,166,107,.28);border-inline-start:0}",
".mag-une-tx h3{font-size:clamp(30px,8.4vw,38px);line-height:1.06;margin:14px 0 14px}",
".mag-une-tx p{font-family:var(--se);font-size:19px;line-height:1.42;color:#e1e6df;margin:0}",
/* technique */
".mag-tech{display:grid;gap:34px}",
".mag-tech-a{display:block;width:100%}",
".mag-tech-ph{position:relative;width:86%;margin-inline-start:auto;aspect-ratio:3/2;overflow:hidden}",
".mag-tech-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-tech-tx{padding:22px 0 0;width:92%}",
".mag-tech-tx h3{font-size:27px;line-height:1.12;margin-top:10px}",
".mag-hb{display:flex;flex-direction:column;align-items:flex-start;gap:14px;width:100%;margin-top:44px;padding:22px 20px;border:1px solid rgba(201,166,107,.32);color:var(--tx);font-size:13.5px;line-height:1.5}",
".mag-hb b{display:block;font-family:var(--se);font-size:22px;font-weight:500;color:var(--iv);margin-bottom:4px}",
/* mosaïque */
".mag-mos{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}",
".mag-t{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;background:#0c1514;border:1px solid #22312d}",
".mag-t-ph{position:relative;flex:1 1 auto;min-height:110px;overflow:hidden;background:#0f1a19}",
".mag-t-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}",
".mag-t-tx{position:relative;padding:14px 14px 16px;background:#0c1514}",
".mag-t-tx h3{font-size:21px;line-height:1.1}",
".mag-t-tx p{font-size:12px;line-height:1.5;color:var(--mu);margin:6px 0 0}",
".mag-t-tx .mag-rond{margin-top:12px}",
".mag-t-galops{grid-row:span 2}.mag-t-galops .mag-t-ph{min-height:250px}",
".mag-t-ecoles .mag-t-ph{min-height:96px}",
".mag-t-sante{grid-column:1 / -1;flex-direction:row}.mag-t-sante .mag-t-ph{flex:0 0 42%;min-height:150px}.mag-t-sante .mag-t-tx{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center}",
".mag-t-hb{grid-column:1 / -1;flex-direction:row;margin-inline-start:12%;width:auto}.mag-t-hb .mag-t-ph{flex:0 0 96px;min-height:96px}.mag-t-hb .mag-t-ph img{object-position:center 20%}.mag-t-hb .mag-t-tx{flex:1 1 auto}",
".mag-gal{margin-top:44px}",
".mag-gal-l{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}",
/* citation */
".mag-cit-s{padding-top:0;margin-top:84px;background:linear-gradient(180deg,#0b1513,#070A08)}",
".mag-wave{height:30px;background:var(--bg);clip-path:polygon(0 0,100% 0,100% 30%,90% 24%,75% 67%,62% 80%,49% 59%,36% 27%,20% 23%,9% 35%,0 52%)}",
".mag-cit{display:grid;gap:30px;padding-top:56px !important;padding-bottom:84px !important}",
".mag-cit-ph{width:78%;aspect-ratio:4/5;overflow:hidden}",
".mag-cit-ph img{width:100%;height:100%;object-fit:cover;object-position:50% 50%;display:block}",
".mag-cit-tx{margin:0;margin-inline-start:10%}",
".mag-qm{font-family:var(--se);font-size:84px;line-height:.5;color:var(--or);display:block;height:32px}",
".mag-cit blockquote{font-family:var(--se);font-size:clamp(28px,7.6vw,36px);line-height:1.2;margin:0 0 18px;color:var(--iv)}",
".mag-cit figcaption{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--or)}",
/* articles */
".mag-fil{margin:0 -22px 30px}",
".mag-art{display:grid;gap:30px}",
".mag-a{display:flex;gap:16px;width:100%;align-items:center}",
".mag-a-ph{position:relative;flex:0 0 40%;aspect-ratio:4/3;overflow:hidden;background:#0f1a19}",
".mag-a-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-a-tx{flex:1 1 auto;min-width:0}",
".mag-a-tx h3{font-size:21px;line-height:1.15}",
".mag-a-tx p{font-size:13.5px;line-height:1.6;color:var(--tx);margin:10px 0 0}",
".mag-a0{flex-direction:column;align-items:stretch}.mag-a0 .mag-a-ph{flex:none;width:100%;aspect-ratio:16/10}.mag-a0 .mag-a-tx h3{font-size:28px}",
".mag-a2{flex-direction:row-reverse}",
".mag-live{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;width:100%;margin-top:44px;padding:18px 0;border-top:1px solid #2a3a36;border-bottom:1px solid #2a3a36}",
".mag-live-d{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#E8A08C;font-weight:600}",
".mag-live-d i{width:7px;height:7px;border-radius:50%;background:#E8A08C;display:inline-block}",
".mag-live-t{flex:1 1 200px;min-width:0;font-size:12.5px;line-height:1.5;color:var(--mu)}",
".mag-live-t b{display:block;font-family:var(--se);font-size:21px;font-weight:500;color:var(--iv)}",
/* écoles */
".mag-eco{display:grid;grid-template-columns:1fr 1fr;gap:28px 14px}",
".mag-e{display:block;width:100%}",
".mag-e-ph{position:relative;aspect-ratio:3/4;overflow:hidden;background:#0f1a19}",
".mag-e-ph img{width:100%;height:100%;object-fit:cover;display:block}",
".mag-e-tx{padding-top:14px}",
".mag-e-tx h3{font-size:21px;line-height:1.12;margin-top:6px}",
".mag-e-tx p{font-size:12.5px;line-height:1.55;color:var(--mu);margin:6px 0 0}",
".mag-e0{grid-column:1 / -1}.mag-e0 .mag-e-ph{aspect-ratio:4/3}.mag-e0 .mag-e-tx h3{font-size:28px}",
".mag-e2{margin-top:40px}",
".mag-e3{grid-column:1 / -1;width:84%;margin-inline-start:auto}.mag-e3 .mag-e-ph{aspect-ratio:16/9}",
/* santé */
".mag-sante{display:block;width:100%;position:relative}",
".mag-sante-ph{aspect-ratio:16/10;overflow:hidden;width:92%}",
".mag-sante-ph img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.8)}",
".mag-sante-tx{position:relative;margin:-30px 0 0 auto;width:88%;padding:22px 20px 24px;padding-inline-end:60px;background:#0b1513;border:1px solid rgba(201,166,107,.25)}",
".mag[dir=rtl] .mag-sante-tx{margin:-30px auto 0 0}",
".mag-sante-tx h3{font-size:26px;margin-top:8px}.mag-sante-tx p{font-size:13px;line-height:1.55;color:var(--mu);margin:8px 0 0}",
".mag-sante-tx .mag-rond{position:absolute;inset-inline-end:16px;bottom:18px}",
".mag-vid{margin-top:48px}",
/* tablette */
"@container (min-width:640px){.mag-w{padding:0 40px}.mag-rub{padding:16px 40px 18px;scroll-padding-inline:40px}.mag-t-tx{padding-inline-end:58px}.mag-t-tx .mag-rond{position:absolute;bottom:14px;inset-inline-end:12px;margin:0}.mag-hb{flex-direction:row;align-items:center;justify-content:space-between}.mag-cov-ph{height:420px}.mag-cov-tx{padding:0 40px 56px;margin-top:-120px}.mag-cov-ph:after{height:60%}",
".mag-une-ph{margin:0}.mag-une-tx{width:72%;margin:-90px 0 0 auto}.mag[dir=rtl] .mag-une-tx{margin:-90px auto 0 0}",
".mag-mos{grid-template-columns:repeat(12,1fr);gap:18px}.mag-t-galops{grid-column:1 / 6;grid-row:1 / 3}.mag-t-ecoles{grid-column:6 / 13}.mag-t-ecoles .mag-t-ph{min-height:170px}.mag-t-sante{grid-column:6 / 13;flex-direction:column}.mag-t-sante .mag-t-ph{flex:1 1 auto;min-height:150px}.mag-t-hb{grid-column:3 / 11;margin:12px 0 0}",
".mag-art{grid-template-columns:repeat(12,1fr);gap:40px 26px}.mag-a0{grid-column:1 / 13}.mag-a0{flex-direction:row}.mag-a0 .mag-a-ph{width:58%;flex:0 0 58%}.mag-a1{grid-column:1 / 8;flex-direction:column;align-items:stretch}.mag-a1 .mag-a-ph{flex:none;width:100%}.mag-a2{grid-column:8 / 13;margin-top:70px;flex-direction:column;align-items:stretch}.mag-a2 .mag-a-ph{flex:none;width:100%;aspect-ratio:3/4}",
".mag-cit{grid-template-columns:5fr 6fr;align-items:center;gap:56px}.mag-cit-ph{width:100%}.mag-cit-tx{margin:0}",
".mag-eco{grid-template-columns:repeat(12,1fr);gap:40px 22px}.mag-e0{grid-column:1 / 8}.mag-e1{grid-column:8 / 13;margin-top:90px}.mag-e2{grid-column:2 / 6;margin-top:0}.mag-e3{grid-column:7 / 13;width:auto;margin-top:60px}.mag-e3 .mag-e-ph{aspect-ratio:4/3}",
".mag-tech{grid-template-columns:1fr}.mag-tech-a{display:grid;grid-template-columns:7fr 5fr;gap:34px;align-items:end}.mag-tech-ph{width:100%}.mag-tech-tx{width:auto;padding-bottom:10px}",
".mag-sante{display:grid;grid-template-columns:7fr 5fr;align-items:center}.mag-sante-ph{width:100%}.mag-sante-tx{width:auto;margin:0 0 0 -60px}.mag[dir=rtl] .mag-sante-tx{margin:0 -60px 0 0}",
".mag-hb{max-width:640px}}",
/* ordinateur */
"@container (min-width:960px){.mag-w{padding:0 56px}.mag-rub{justify-content:center;padding:18px 56px 20px}",
".mag-cov{min-height:560px;display:flex;align-items:flex-end}.mag-cov-ph{position:absolute;inset:0;height:auto}.mag-cov-ph img{object-position:70% 45%}.mag-cov-ph:after{inset:0;height:auto;background:linear-gradient(90deg,#070A08 0%,rgba(7,10,8,.78) 34%,rgba(7,10,8,0) 66%),linear-gradient(0deg,#070A08 0%,rgba(7,10,8,0) 30%)}",
".mag[dir=rtl] .mag-cov-ph:after{background:linear-gradient(270deg,#070A08 0%,rgba(7,10,8,.78) 34%,rgba(7,10,8,0) 66%),linear-gradient(0deg,#070A08 0%,rgba(7,10,8,0) 30%)}",
".mag-cov-tx{margin:0;padding:120px 56px 84px;max-width:640px}.mag-cov h1{font-size:76px}.mag-cov p{font-size:23px}",
".mag-s{padding-top:136px}.mag-pe{margin-top:136px;padding-bottom:136px}.mag-cit-s{margin-top:136px}.mag-cit{padding-top:96px !important;padding-bottom:136px !important}",
".mag-une-s{padding-top:96px}.mag-une{display:grid;grid-template-columns:repeat(12,1fr);align-items:center}.mag-une-ph{grid-column:1 / 9;grid-row:1;aspect-ratio:16/10}.mag-une-tx{grid-column:8 / 13;grid-row:1;width:auto;margin:120px 0 0}.mag[dir=rtl] .mag-une-tx{margin:120px 0 0}.mag-une-tx h3{font-size:42px}",
".mag-sh h2{font-size:46px}.mag-intro{font-size:16px;margin-bottom:40px}",
".mag-mos{grid-auto-rows:minmax(150px,auto)}.mag-t-galops{grid-column:1 / 5;grid-row:1 / 3}.mag-t-galops .mag-t-ph{min-height:420px}.mag-t-ecoles{grid-column:5 / 13;margin-top:40px}.mag-t-ecoles .mag-t-ph{min-height:220px}.mag-t-sante{grid-column:5 / 9;flex-direction:column}.mag-t-hb{grid-column:9 / 13;flex-direction:column;margin:60px 0 0}.mag-t-hb .mag-t-ph{flex:1 1 auto;min-height:150px}",
".mag-a0 .mag-a-tx h3{font-size:36px}.mag-a-tx h3{font-size:24px}",
".mag-cit blockquote{font-size:44px}.mag-cit-s{padding-top:0}}"
].join("");

window.HypeArticles = { Articles: EcranArticles };
})();
