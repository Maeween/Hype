/* HYPE ▸ 30/10/2026 — PAGE « LES RÉSULTATS DE L'ÉCURIE » (V3, cavaliers en avant)
   Pack de Blandine « HYPE_Resultats_Ecurie_V3_Cavaliers » (maquettes = direction de composition, PAS des données).
   Construite À CÔTÉ de l'ancienne page « Performances en concours » (EcranPerfConcours, route perf-concours), qui reste
   intacte. Ouverte par la route « resultats-ecurie » (adresse cachée #resultats-ecurie) ; la bascule du bouton
   « Voir les résultats » de la page Écurie se fera sur décision de Blandine (interrupteur HYPE_RESULTATS_V3 dans index.html).
   Chargée à l'ouverture seulement (hypeEcranDiffere), comme les autres écrans détachés.

   Décisions de Blandine appliquées (30/10) :
     · ordre : hero + filtres → derniers résultats des cavaliers (1re section) → dernier concours → chiffres de la saison
       → tous les concours → nos chevaux → moments forts → import (téléphone) ;
     · « derniers » = les plus RÉCENTS (un par cavalier), pas les meilleurs : une 12e place ou une élimination apparaît ;
     · pas de filtre Discipline (la base n'enregistre pas la discipline) ;
     · saison = 1er septembre → 31 août (règle des pages Performances) ;
     · une sortie = un concours ; victoires en préparatoire comptées À PART, entre parenthèses ; « Sans faute » en toutes lettres ;
     · cavalières MINEURES : prénom + initiale du nom (« Emma P. ») — et par prudence aussi quand l'âge n'est pas connu
       (nom FFE relié à aucun compte) ;
     · photos : celle du profil de la cavalière (vraie photo), sinon celle du cheval, sinon carte sobre — jamais d'image inventée ;
     · un concours n'ouvre la page de la journée QUE s'il est relié à un rendez-vous de l'agenda (resultats.agenda_id) ;
       sinon il filtre la page sur ce concours ;
     · import : le MÊME outil que la page Team (plusieurs fichiers, plusieurs chevaux), bouton visible seulement pour la
       propriétaire du club, ses gestionnaires et les modératrices ; la base reste seule juge (RLS + Premium).
   Les résultats montrés sont ceux de la page actuelle (mêmes cavaliers de l'écurie, même liste de noms FFE, lignes visibles). */
(function () {
var IMG_HERO = "images/piquet-cso.webp";
var RV3_NOMS_COMPLETS_ADULTES = false;   /* voir plus bas (nom affiché) */
var NOIR = "#070A08", PETROLE = "#0E1210", PETROLE2 = "#0B0E0C",   /* 30/10 22h05 Blandine : « trop de bleu pétrole partout » -> fonds noirs */ IVOIRE = "#F3EEE4", CHAMP = "#C9A66B", GRIS = "#A9A398";
var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',sans-serif";
var LANGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
/* Textes : une ligne par texte, les 14 langues dans l'ordre de LANGS. */
var W = {
  kicker: ["Écurie", "Stable", "Cuadra", "Scuderia", "厩舎", "Stall", "الإسطبل", "马厩", "Stal", "Estábulo", "Stall", "Конюшня", "Stajnia", "마구간"],
  titre: ["Les résultats de l'écurie", "The stable's results", "Los resultados de la cuadra", "I risultati della scuderia", "厩舎の成績", "Die Ergebnisse des Stalls", "نتائج الإسطبل", "马厩成绩", "De resultaten van de stal", "Os resultados do estábulo", "Stallets resultat", "Результаты конюшни", "Wyniki stajni", "마구간 성적"],
  sous: ["Nos cavaliers, nos chevaux, leurs parcours et les moments forts de la saison.", "Our riders, our horses, their rounds and the season's highlights.", "Nuestros jinetes, nuestros caballos, sus recorridos y los grandes momentos de la temporada.", "I nostri cavalieri, i nostri cavalli, i loro percorsi e i momenti forti della stagione.", "ライダーと馬たちの走行、そしてシーズンのハイライト。", "Unsere Reiter, unsere Pferde, ihre Runden und die Höhepunkte der Saison.", "فرساننا وخيولنا ومشاركاتهم وأبرز لحظات الموسم.", "我们的骑手、我们的马、他们的赛程和本赛季的精彩时刻。", "Onze ruiters, onze paarden, hun parcoursen en de hoogtepunten van het seizoen.", "Nossos cavaleiros, nossos cavalos, seus percursos e os grandes momentos da temporada.", "Våra ryttare, våra hästar, deras ritter och säsongens höjdpunkter.", "Наши всадники, наши лошади, их маршруты и яркие моменты сезона.", "Nasi jeźdźcy, nasze konie, ich przejazdy i najlepsze chwile sezonu.", "우리 기수와 말, 그들의 경기와 시즌 하이라이트."],
  toutesSaisons: ["Toutes les saisons", "All seasons", "Todas las temporadas", "Tutte le stagioni", "全シーズン", "Alle Saisons", "كل المواسم", "所有赛季", "Alle seizoenen", "Todas as temporadas", "Alla säsonger", "Все сезоны", "Wszystkie sezony", "모든 시즌"],
  saison: ["Saison", "Season", "Temporada", "Stagione", "シーズン", "Saison", "الموسم", "赛季", "Seizoen", "Temporada", "Säsong", "Сезон", "Sezon", "시즌"],
  tousCav: ["Tous les cavaliers", "All riders", "Todos los jinetes", "Tutti i cavalieri", "すべてのライダー", "Alle Reiter", "كل الفرسان", "所有骑手", "Alle ruiters", "Todos os cavaleiros", "Alla ryttare", "Все всадники", "Wszyscy jeźdźcy", "모든 기수"],
  tousCh: ["Tous les chevaux", "All horses", "Todos los caballos", "Tutti i cavalli", "すべての馬", "Alle Pferde", "كل الخيول", "所有马匹", "Alle paarden", "Todos os cavalos", "Alla hästar", "Все лошади", "Wszystkie konie", "모든 말"],
  tousConc: ["Tous les concours", "All competitions", "Todos los concursos", "Tutti i concorsi", "すべての大会", "Alle Turniere", "كل المسابقات", "所有比赛", "Alle wedstrijden", "Todos os concursos", "Alla tävlingar", "Все соревнования", "Wszystkie zawody", "모든 대회"],
  filtres: ["Filtres", "Filters", "Filtros", "Filtri", "絞り込み", "Filter", "الفلاتر", "筛选", "Filters", "Filtros", "Filter", "Фильтры", "Filtry", "필터"],
  reinit: ["Réinitialiser", "Reset", "Restablecer", "Reimposta", "リセット", "Zurücksetzen", "إعادة الضبط", "重置", "Herstellen", "Redefinir", "Återställ", "Сбросить", "Resetuj", "초기화"],
  importer: ["Importer des résultats", "Import results", "Importar resultados", "Importa risultati", "成績を取り込む", "Ergebnisse importieren", "استيراد النتائج", "导入成绩", "Resultaten importeren", "Importar resultados", "Importera resultat", "Импортировать результаты", "Importuj wyniki", "결과 가져오기"],
  derniers: ["Les derniers résultats de nos cavaliers", "Our riders' latest results", "Los últimos resultados de nuestros jinetes", "Gli ultimi risultati dei nostri cavalieri", "ライダーたちの最新成績", "Die neuesten Ergebnisse unserer Reiter", "آخر نتائج فرساننا", "我们骑手的最新成绩", "De laatste resultaten van onze ruiters", "Os últimos resultados dos nossos cavaleiros", "Våra ryttares senaste resultat", "Последние результаты наших всадников", "Najnowsze wyniki naszych jeźdźców", "우리 기수들의 최근 성적"],
  voirTous: ["Voir tous les résultats des cavaliers", "See all riders' results", "Ver todos los resultados de los jinetes", "Vedi tutti i risultati dei cavalieri", "ライダーの全成績を見る", "Alle Ergebnisse der Reiter ansehen", "عرض كل نتائج الفرسان", "查看骑手的全部成绩", "Alle resultaten van de ruiters bekijken", "Ver todos os resultados dos cavaleiros", "Se alla ryttares resultat", "Все результаты всадников", "Zobacz wszystkie wyniki jeźdźców", "기수 성적 모두 보기"],
  tousRes: ["Tous les résultats des cavaliers", "All riders' results", "Todos los resultados de los jinetes", "Tutti i risultati dei cavalieri", "ライダーの全成績", "Alle Ergebnisse der Reiter", "كل نتائج الفرسان", "骑手的全部成绩", "Alle resultaten van de ruiters", "Todos os resultados dos cavaleiros", "Alla ryttares resultat", "Все результаты всадников", "Wszystkie wyniki jeźdźców", "기수 성적 전체"],
  retourPage: ["Retour à la page", "Back to the page", "Volver a la página", "Torna alla pagina", "ページに戻る", "Zurück zur Seite", "العودة إلى الصفحة", "返回页面", "Terug naar de pagina", "Voltar à página", "Tillbaka till sidan", "Вернуться на страницу", "Wróć do strony", "페이지로 돌아가기"],
  sansFaute: ["Sans faute", "Clear round", "Sin faltas", "Percorso netto", "ノーミス", "Fehlerfrei", "بدون أخطاء", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bez błędów", "무감점"],
  elimine: ["Éliminé", "Eliminated", "Eliminado", "Eliminato", "失格", "Ausgeschieden", "مستبعد", "淘汰", "Uitgesloten", "Eliminado", "Utesluten", "Снят", "Wyeliminowany", "실격"],
  abandon: ["Abandon", "Retired", "Abandono", "Ritirato", "棄権", "Aufgegeben", "انسحاب", "退赛", "Opgegeven", "Abandono", "Utgått", "Сход", "Wycofany", "기권"],
  dernierConc: ["Dernier concours", "Latest competition", "Último concurso", "Ultimo concorso", "最新の大会", "Letztes Turnier", "آخر مسابقة", "最近一场比赛", "Laatste wedstrijd", "Último concurso", "Senaste tävling", "Последние соревнования", "Ostatnie zawody", "최근 대회"],
  voirConc: ["Voir le concours", "See the competition", "Ver el concurso", "Vedi il concorso", "大会を見る", "Turnier ansehen", "عرض المسابقة", "查看比赛", "Wedstrijd bekijken", "Ver o concurso", "Se tävlingen", "Открыть соревнования", "Zobacz zawody", "대회 보기"],
  voirResConc: ["Voir les résultats de ce concours", "See this competition's results", "Ver los resultados de este concurso", "Vedi i risultati di questo concorso", "この大会の成績を見る", "Ergebnisse dieses Turniers ansehen", "عرض نتائج هذه المسابقة", "查看这场比赛的成绩", "Resultaten van deze wedstrijd bekijken", "Ver os resultados deste concurso", "Se resultaten från tävlingen", "Результаты этих соревнований", "Zobacz wyniki tych zawodów", "이 대회 성적 보기"],
  chiffres: ["La saison en quelques chiffres", "The season in numbers", "La temporada en cifras", "La stagione in cifre", "数字で見るシーズン", "Die Saison in Zahlen", "الموسم بالأرقام", "数据看赛季", "Het seizoen in cijfers", "A temporada em números", "Säsongen i siffror", "Сезон в цифрах", "Sezon w liczbach", "숫자로 보는 시즌"],
  chiffresTout: ["En quelques chiffres", "In numbers", "En cifras", "In cifre", "数字で見る", "In Zahlen", "بالأرقام", "数据一览", "In cijfers", "Em números", "I siffror", "В цифрах", "W liczbach", "숫자로 보기"],
  nConcours: ["concours", "competitions", "concursos", "concorsi", "大会", "Turniere", "مسابقات", "场比赛", "wedstrijden", "concursos", "tävlingar", "соревнования", "zawody", "대회"],
  nParcours: ["parcours", "rounds", "recorridos", "percorsi", "走行", "Runden", "مشاركات", "轮次", "parcoursen", "percursos", "ritter", "выступления", "przejazdy", "경기"],
  nSansFaute: ["sans faute", "clear rounds", "sin faltas", "percorsi netti", "ノーミス", "fehlerfrei", "بدون أخطاء", "零罚分", "foutloos", "sem faltas", "felfria", "без ошибок", "bez błędów", "무감점"],
  nPodiums: ["podiums", "podiums", "podios", "podi", "表彰台", "Podien", "منصات", "领奖台", "podiumplaatsen", "pódios", "pallplatser", "подиумы", "podia", "포디움"],
  nVictoires: ["victoires", "wins", "victorias", "vittorie", "優勝", "Siege", "انتصارات", "冠军", "overwinningen", "vitórias", "segrar", "победы", "zwycięstwa", "우승"],
  notePrepa: ["Entre parenthèses : victoires en préparatoire, comptées à part.", "In brackets: wins in preparatory classes, counted separately.", "Entre paréntesis: victorias en preparatoria, contadas aparte.", "Tra parentesi: vittorie in preparatoria, contate a parte.", "かっこ内：準備競技での優勝（別集計）。", "In Klammern: Siege in Vorbereitungsprüfungen, separat gezählt.", "بين قوسين: انتصارات في الجولات التحضيرية، تحسب على حدة.", "括号内：预备赛的冠军，单独统计。", "Tussen haakjes: overwinningen in voorbereidende proeven, apart geteld.", "Entre parênteses: vitórias em preparatórias, contadas à parte.", "Inom parentes: segrar i förberedande klasser, räknas separat.", "В скобках: победы в подготовительных, считаются отдельно.", "W nawiasie: zwycięstwa w przygotowawczych, liczone osobno.", "괄호 안: 예비 경기 우승, 별도 집계."],
  suitFiltres: ["Ces chiffres suivent les filtres choisis.", "These numbers follow the selected filters.", "Estas cifras siguen los filtros elegidos.", "Queste cifre seguono i filtri scelti.", "この数字は選んだ絞り込みに従います。", "Diese Zahlen folgen den gewählten Filtern.", "تتبع هذه الأرقام الفلاتر المختارة.", "这些数字随所选筛选条件变化。", "Deze cijfers volgen de gekozen filters.", "Estes números seguem os filtros escolhidos.", "Siffrorna följer de valda filtren.", "Цифры учитывают выбранные фильтры.", "Liczby uwzględniają wybrane filtry.", "이 숫자는 선택한 필터를 따릅니다."],
  nCavaliers: ["cavaliers", "riders", "jinetes", "cavalieri", "ライダー", "Reiter", "فرسان", "名骑手", "ruiters", "cavaleiros", "ryttare", "всадники", "jeźdźców", "기수"],
  nosChevaux: ["Nos chevaux en compétition", "Our horses in competition", "Nuestros caballos en competición", "I nostri cavalli in gara", "競技に出た馬たち", "Unsere Pferde im Turnier", "خيولنا في المنافسات", "我们参赛的马", "Onze paarden in wedstrijden", "Nossos cavalos em competição", "Våra hästar på tävling", "Наши лошади на соревнованиях", "Nasze konie w zawodach", "대회에 나선 우리 말"],
  moments: ["Moments forts de la saison", "Season highlights", "Grandes momentos de la temporada", "Momenti forti della stagione", "シーズンのハイライト", "Höhepunkte der Saison", "أبرز لحظات الموسم", "赛季精彩时刻", "Hoogtepunten van het seizoen", "Grandes momentos da temporada", "Säsongens höjdpunkter", "Яркие моменты сезона", "Najlepsze chwile sezonu", "시즌 하이라이트"],
  chargement: ["Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Lädt…", "جار التحميل…", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"],
  vide: ["Aucun résultat pour l'instant.", "No results yet.", "Aún no hay resultados.", "Nessun risultato per ora.", "まだ成績はありません。", "Noch keine Ergebnisse.", "لا توجد نتائج حاليا.", "暂无成绩。", "Nog geen resultaten.", "Nenhum resultado por enquanto.", "Inga resultat ännu.", "Пока нет результатов.", "Na razie brak wyników.", "아직 성적이 없어요."],
  videImport: ["Importe les résultats de tes cavaliers pour remplir cette page.", "Import your riders' results to fill this page.", "Importa los resultados de tus jinetes para llenar esta página.", "Importa i risultati dei tuoi cavalieri per riempire questa pagina.", "ライダーの成績を取り込んでこのページを埋めよう。", "Importiere die Ergebnisse deiner Reiter, um diese Seite zu füllen.", "استورد نتائج فرسانك لملء هذه الصفحة.", "导入你的骑手成绩来填充此页面。", "Importeer de resultaten van je ruiters om deze pagina te vullen.", "Importa os resultados dos teus cavaleiros para preencher esta página.", "Importera dina ryttares resultat för att fylla sidan.", "Импортируй результаты своих всадников, чтобы заполнить страницу.", "Zaimportuj wyniki swoich jeźdźców, aby wypełnić tę stronę.", "기수들의 성적을 가져와 이 페이지를 채워 보세요."],
  panne: ["Les résultats n'ont pas pu être chargés. Réessaie plus tard.", "Results could not be loaded. Try again later.", "No se pudieron cargar los resultados. Inténtalo más tarde.", "Impossibile caricare i risultati. Riprova più tardi.", "成績を読み込めませんでした。後でもう一度試してね。", "Die Ergebnisse konnten nicht geladen werden. Versuch es später nochmal.", "تعذر تحميل النتائج. حاولي لاحقا.", "无法加载成绩，请稍后再试。", "De resultaten konden niet worden geladen. Probeer het later opnieuw.", "Não foi possível carregar os resultados. Tenta mais tarde.", "Resultaten kunde inte laddas. Försök igen senare.", "Не удалось загрузить результаты. Попробуй позже.", "Nie udało się wczytać wyników. Spróbuj później.", "성적을 불러오지 못했어요. 나중에 다시 시도해 주세요."],
  aucunFiltre: ["Aucun résultat avec ces filtres.", "No results with these filters.", "No hay resultados con estos filtros.", "Nessun risultato con questi filtri.", "この条件の成績はありません。", "Keine Ergebnisse mit diesen Filtern.", "لا توجد نتائج بهذه الفلاتر.", "没有符合筛选条件的成绩。", "Geen resultaten met deze filters.", "Nenhum resultado com estes filtros.", "Inga resultat med dessa filter.", "Нет результатов с этими фильтрами.", "Brak wyników dla tych filtrów.", "이 필터에 맞는 성적이 없어요."],
  voirPlus: ["Voir plus", "See more", "Ver más", "Vedi altro", "もっと見る", "Mehr anzeigen", "عرض المزيد", "查看更多", "Meer bekijken", "Ver mais", "Visa fler", "Показать ещё", "Pokaż więcej", "더 보기"],
  nResultats: ["résultats", "results", "resultados", "risultati", "件の成績", "Ergebnisse", "نتائج", "条成绩", "resultaten", "resultados", "resultat", "результатов", "wyników", "개 성적"],
  derniersCourt: ["Derniers résultats", "Latest results", "Últimos resultados", "Ultimi risultati", "最新の成績", "Neueste Ergebnisse", "آخر النتائج", "最新成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Najnowsze wyniki", "최근 성적"],
  voirTout: ["Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "모두 보기"],
  perfCourt: ["Nos performances", "Our performance", "Nuestro rendimiento", "Le nostre prestazioni", "私たちの成績", "Unsere Leistungen", "أداؤنا", "我们的表现", "Onze prestaties", "Nosso desempenho", "Våra prestationer", "Наши выступления", "Nasze wyniki", "우리의 성과"],
  chevauxCourt: ["Nos chevaux", "Our horses", "Nuestros caballos", "I nostri cavalli", "私たちの馬", "Unsere Pferde", "خيولنا", "我们的马", "Onze paarden", "Nossos cavalos", "Våra hästar", "Наши лошади", "Nasze konie", "우리 말"],
  ajouterPhotos: ["Ajouter des photos", "Add photos", "Añadir fotos", "Aggiungi foto", "写真を追加", "Fotos hinzufügen", "إضافة صور", "添加照片", "Foto's toevoegen", "Adicionar fotos", "Lägg till foton", "Добавить фото", "Dodaj zdjęcia", "사진 추가"],
  retour: ["Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wstecz", "뒤로"],
  precedent: ["Précédent", "Previous", "Anterior", "Precedente", "前へ", "Zurück", "السابق", "上一个", "Vorige", "Anterior", "Föregående", "Назад", "Poprzedni", "이전"],
  suivant: ["Suivant", "Next", "Siguiente", "Successivo", "次へ", "Weiter", "التالي", "下一个", "Volgende", "Seguinte", "Nästa", "Далее", "Następny", "다음"]
};
/* panneau de gestion (gestionnaires de l écurie) */
var WG = {
  gerer: ["Gérer", "Manage", "Gestionar", "Gestisci", "管理", "Verwalten", "إدارة", "管理", "Beheren", "Gerir", "Hantera", "Управление", "Zarządzaj", "관리"],
  gTitre: ["Gestion des résultats de l'écurie", "Manage the stable's results", "Gestión de los resultados de la cuadra", "Gestione dei risultati della scuderia", "厩舎の成績の管理", "Ergebnisse des Stalls verwalten", "إدارة نتائج الإسطبل", "管理马厩成绩", "Resultaten van de stal beheren", "Gestão dos resultados do estábulo", "Hantera stallets resultat", "Управление результатами конюшни", "Zarządzanie wynikami stajni", "마구간 성적 관리"],
  gSans: ["Cavaliers sans compte Hype", "Riders without a Hype account", "Jinetes sin cuenta Hype", "Cavalieri senza account Hype", "Hypeアカウントのないライダー", "Reiter ohne Hype-Konto", "فرسان بدون حساب Hype", "没有Hype账号的骑手", "Ruiters zonder Hype-account", "Cavaleiros sem conta Hype", "Ryttare utan Hype-konto", "Всадники без аккаунта Hype", "Jeźdźcy bez konta Hype", "Hype 계정이 없는 기수"],
  gSansAide: ["Noms trouvés dans les résultats importés par les membres de l'écurie. Rattache seulement ceux dont tu es sûre qu'ils montent à l'écurie.", "Names found in results imported by the stable's members. Only add riders you are sure ride at the stable.", "Nombres encontrados en los resultados importados por los miembros. Añade solo a quienes seguro montan en la cuadra.", "Nomi trovati nei risultati importati dai membri. Aggiungi solo chi sei sicura che monti in scuderia.", "メンバーが取り込んだ成績にある名前です。厩舎で乗っていると確かな人だけ追加してね。", "Namen aus den von Mitgliedern importierten Ergebnissen. Füge nur Reiter hinzu, die sicher im Stall reiten.", "أسماء وجدت في النتائج التي استوردها الأعضاء. أضيفي فقط من تتأكدين أنهم يركبون في الإسطبل.", "成员导入的成绩中出现的名字。只添加确定在本马厩骑马的骑手。", "Namen uit resultaten die leden importeerden. Voeg alleen ruiters toe van wie je zeker weet dat ze op stal rijden.", "Nomes encontrados nos resultados importados pelos membros. Adiciona só quem tens a certeza que monta no estábulo.", "Namn från resultat som medlemmar importerat. Lägg bara till ryttare som säkert rider i stallet.", "Имена из результатов, импортированных участниками. Добавляй только тех, кто точно ездит в конюшне.", "Imiona z wyników zaimportowanych przez członków. Dodaj tylko tych, którzy na pewno jeżdżą w stajni.", "멤버가 가져온 성적에서 찾은 이름이에요. 마구간에서 타는 게 확실한 기수만 추가하세요."],
  gRattacher: ["Rattacher à l'écurie", "Add to the stable", "Añadir a la cuadra", "Aggiungi alla scuderia", "厩舎に追加", "Zum Stall hinzufügen", "إضافة إلى الإسطبل", "加入马厩", "Aan de stal toevoegen", "Adicionar ao estábulo", "Lägg till i stallet", "Добавить в конюшню", "Dodaj do stajni", "마구간에 추가"],
  gRetirer: ["Retirer", "Remove", "Quitar", "Rimuovi", "外す", "Entfernen", "إزالة", "移除", "Verwijderen", "Retirar", "Ta bort", "Убрать", "Usuń", "제거"],
  gDeja: ["Déjà rattachés", "Already added", "Ya añadidos", "Già aggiunti", "追加済み", "Bereits hinzugefügt", "تمت إضافتهم", "已加入", "Al toegevoegd", "Já adicionados", "Redan tillagda", "Уже добавлены", "Już dodani", "이미 추가됨"],
  gRelier: ["Résultats à relier à l'agenda", "Results to link to the calendar", "Resultados para vincular a la agenda", "Risultati da collegare all'agenda", "予定に結びつける成績", "Ergebnisse mit dem Kalender verknüpfen", "نتائج لربطها بالأجندة", "需关联到日程的成绩", "Resultaten te koppelen aan de agenda", "Resultados a ligar à agenda", "Resultat att koppla till kalendern", "Результаты для привязки к календарю", "Wyniki do powiązania z kalendarzem", "일정에 연결할 성적"],
  gRelierAide: ["Aucun lien automatique (plusieurs rendez-vous possibles ou concours non reconnu) : choisis le bon rendez-vous. Ce choix ne sera jamais modifié automatiquement.", "No automatic link (several possible events or unrecognised competition): choose the right event. This choice will never be changed automatically.", "Sin vínculo automático: elige la cita correcta. Esta elección nunca se cambiará automáticamente.", "Nessun collegamento automatico: scegli l'appuntamento giusto. Questa scelta non verrà mai cambiata automaticamente.", "自動で結びつけられませんでした。正しい予定を選んでね。この選択は自動では変わりません。", "Keine automatische Verknüpfung: wähle den richtigen Termin. Diese Wahl wird nie automatisch geändert.", "لا يوجد ربط تلقائي: اختاري الموعد الصحيح. لن يتغير هذا الاختيار تلقائيا أبدا.", "没有自动关联：请选择正确的日程。此选择不会被自动更改。", "Geen automatische koppeling: kies de juiste afspraak. Deze keuze wordt nooit automatisch gewijzigd.", "Sem ligação automática: escolhe o compromisso certo. Esta escolha nunca será alterada automaticamente.", "Ingen automatisk koppling: välj rätt händelse. Valet ändras aldrig automatiskt.", "Нет автоматической привязки: выбери нужное событие. Этот выбор никогда не изменится автоматически.", "Brak automatycznego powiązania: wybierz właściwe wydarzenie. Ten wybór nigdy nie zmieni się automatycznie.", "자동 연결이 없어요. 맞는 일정을 선택하세요. 이 선택은 자동으로 바뀌지 않아요."],
  gMaj: ["Majorité vérifiée", "Verified adults", "Mayoría de edad verificada", "Maggiore età verificata", "成人確認済み", "Volljährigkeit geprüft", "تم التحقق من البلوغ", "已核实成年", "Meerderjarigheid gecontroleerd", "Maioridade verificada", "Myndighet kontrollerad", "Совершеннолетие проверено", "Pełnoletność sprawdzona", "성인 확인 완료"],
  gMajAide: ["Coche seulement les cavaliers dont tu as vérifié qu'ils sont majeurs : leur nom complet et leur photo de profil apparaîtront sur cette page.", "Only tick riders you have checked are adults: their full name and profile photo will appear on this page.", "Marca solo a quienes has verificado que son mayores: su nombre completo y su foto aparecerán.", "Spunta solo chi hai verificato essere maggiorenne: nome completo e foto appariranno.", "成人と確認した人だけチェックしてね。フルネームとプロフィール写真が表示されます。", "Hake nur geprüfte Volljährige an: ihr voller Name und ihr Profilfoto erscheinen.", "حددي فقط من تحققت من بلوغهم: سيظهر اسمهم الكامل وصورتهم.", "只勾选已核实成年的骑手：将显示全名和头像。", "Vink alleen gecontroleerde meerderjarigen aan: volledige naam en profielfoto verschijnen.", "Marca só quem verificaste ser maior: o nome completo e a foto aparecerão.", "Kryssa bara i kontrollerat myndiga: fullt namn och profilbild visas.", "Отмечай только проверенных совершеннолетних: появятся полное имя и фото.", "Zaznacz tylko sprawdzonych pełnoletnich: pojawi się pełne imię i zdjęcie.", "성인으로 확인한 기수만 체크하세요. 전체 이름과 프로필 사진이 표시돼요."],
  gDeclare: ["Majeure (déclaré à l'inscription)", "Adult (declared at sign-up)", "Mayor de edad (declarado al registrarse)", "Maggiorenne (dichiarato all'iscrizione)", "成人（登録時に申告）", "Volljährig (bei der Anmeldung angegeben)", "بالغة (مصرح به عند التسجيل)", "成年（注册时声明）", "Meerderjarig (opgegeven bij inschrijving)", "Maior (declarado na inscrição)", "Myndig (angivet vid registrering)", "Совершеннолетняя (указано при регистрации)", "Pełnoletnia (zadeklarowane przy rejestracji)", "성인 (가입 시 신고)"],
  gRien: ["Rien à traiter.", "Nothing to do.", "Nada pendiente.", "Niente da fare.", "対応するものはありません。", "Nichts zu tun.", "لا شيء للمعالجة.", "暂无待处理。", "Niets te doen.", "Nada a tratar.", "Inget att göra.", "Нечего обрабатывать.", "Nic do zrobienia.", "처리할 항목이 없어요."],
  gSql: ["Disponible dès que la mise à jour de la base sera faite.", "Available once the database update is done.", "Disponible cuando se actualice la base.", "Disponibile dopo l'aggiornamento della base.", "データベース更新後に利用できます。", "Verfügbar nach dem Datenbank-Update.", "متاح بعد تحديث قاعدة البيانات.", "数据库更新后可用。", "Beschikbaar na de database-update.", "Disponível após a atualização da base.", "Tillgängligt efter databasuppdateringen.", "Доступно после обновления базы.", "Dostępne po aktualizacji bazy.", "데이터베이스 업데이트 후 사용할 수 있어요."],
  gRefus: ["La base a refusé : ", "The database refused: ", "La base rechazó: ", "La base ha rifiutato: ", "データベースが拒否しました：", "Die Datenbank hat abgelehnt: ", "رفضت قاعدة البيانات: ", "数据库拒绝：", "De database weigerde: ", "A base recusou: ", "Databasen nekade: ", "База отказала: ", "Baza odmówiła: ", "데이터베이스가 거부했어요: "],
  gFait: ["C'est enregistré.", "Saved.", "Guardado.", "Salvato.", "保存しました。", "Gespeichert.", "تم الحفظ.", "已保存。", "Opgeslagen.", "Guardado.", "Sparat.", "Сохранено.", "Zapisano.", "저장했어요."],
  gRelierA: ["Relier à", "Link to", "Vincular a", "Collega a", "結びつける：", "Verknüpfen mit", "ربط بـ", "关联到", "Koppelen aan", "Ligar a", "Koppla till", "Привязать к", "Powiąż z", "연결:"]
};
/* singuliers (quand le nombre vaut 1) */
var W1 = {
  nConcours: ["concours", "competition", "concurso", "concorso", "大会", "Turnier", "مسابقة", "场比赛", "wedstrijd", "concurso", "tävling", "соревнование", "zawody", "대회"],
  nParcours: ["parcours", "round", "recorrido", "percorso", "走行", "Runde", "مشاركة", "轮次", "parcours", "percurso", "ritt", "выступление", "przejazd", "경기"],
  nSansFaute: ["sans faute", "clear round", "sin faltas", "percorso netto", "ノーミス", "fehlerfrei", "بدون أخطاء", "零罚分", "foutloos", "sem faltas", "felfri", "без ошибок", "bez błędów", "무감점"],
  nPodiums: ["podium", "podium", "podio", "podio", "表彰台", "Podium", "منصة", "领奖台", "podiumplaats", "pódio", "pallplats", "подиум", "podium", "포디움"],
  nVictoires: ["victoire", "win", "victoria", "vittoria", "優勝", "Sieg", "انتصار", "冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "우승"],
  nCavaliers: ["cavalier", "rider", "jinete", "cavaliere", "ライダー", "Reiter", "فارس", "名骑手", "ruiter", "cavaleiro", "ryttare", "всадник", "jeździec", "기수"],
  nResultats: ["résultat", "result", "resultado", "risultato", "件の成績", "Ergebnis", "نتيجة", "条成绩", "resultaat", "resultado", "resultat", "результат", "wynik", "개 성적"]
};
var LOC = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" };

/* ── outils de données (purs) ── */
function nrm(x) { var s = String(x || ""); try { s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch (e) { } return s.toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim(); }
/* « 25/10/2026 — HARAS DE FOLLEVILLE » -> « HARAS DE FOLLEVILLE » (certains télémats préfixent la date) */
function sansDate(c) { return String(c || "").replace(/^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*[—–-]\s*/, "").trim(); }
var PETITS = ["de", "du", "des", "la", "le", "les", "et", "sur", "en", "d", "l", "aux", "au"];
function joliNom(t) {
  var s = String(t || "").replace(/\s+/g, " ").trim();
  if (!s) return "";
  if (s !== s.toUpperCase()) return s;   /* déjà écrit à la main : on ne touche pas */
  return s.toLowerCase().split(" ").map(function (m, i) {
    if (i > 0 && PETITS.indexOf(m) !== -1) return m;
    return m.split(/([-'’])/).map(function (p) { return /^[-'’]$/.test(p) ? p : (p.charAt(0).toUpperCase() + p.slice(1)); }).join("");
  }).join(" ");
}
function saisonDe(d) { var y = Number(String(d || "").slice(0, 4)), m = Number(String(d || "").slice(5, 7)); if (!y || !m) return null; return m >= 9 ? y : y - 1; }
function libSaison(y) { return "\u2066" + y + "-" + (y + 1) + "\u2069"; }   /* isolé : l arabe ne retourne plus « 2027-2026 » */
function jours(d) { var t = new Date(String(d || "").slice(0, 10) + "T00:00:00Z").getTime(); return isNaN(t) ? 0 : Math.floor(t / 86400000); }

window.HypeResultatsEcurieOutils = { nrm: nrm, sansDate: sansDate, joliNom: joliNom, saisonDe: saisonDe };   /* bancs d essai */

function EcranResultatsEcurie() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr"; try { if (!app.langue && window.__hypeLangue) lg = window.__hypeLangue; } catch (eL) { }
  if (LANGS.indexOf(lg) === -1) lg = "fr";
  var iL = LANGS.indexOf(lg);
  function t(k) { var l = W[k]; return l ? (l[iL] || l[1] || l[0]) : k; }
  function tg(k) { var l = WG[k]; return l ? (l[iL] || l[1] || l[0]) : k; }
  function tn(k, n) { if (n === 1 && W1[k]) return W1[k][iL] || W1[k][0]; return t(k); }
  var rtl = lg === "ar";
  var R = window.HYPE_RESULTATS || null;
  var profil = app.profil || {};
  var club = "";
  try { club = String(window.__perfClub || "").trim(); } catch (eC) { }
  if (!club) club = String(profil.ecurie || profil.club || "").trim();

  var _et = React.useState("chargement"), etat = _et[0], setEtat = _et[1];
  var _d = React.useState(null), D = _d[0], setD = _d[1];
  var _pi = React.useState(false), peutImp = _pi[0], setPeutImp = _pi[1];
  /* 30/10 22h08 : un filtre « Cavalier » resté en mémoire faisait croire qu il n y avait qu une cavalière. La page repart TOUJOURS
     sans filtre à l ouverture ; un filtre actif est affiché en clair (pastille avec croix), téléphone compris. */
  var memo = {};
  var _f = React.useState({ saison: memo.saison === undefined ? null : memo.saison, cav: memo.cav || "", ch: memo.ch || "", conc: memo.conc || "" }), F = _f[0], setF = _f[1];
  var _pf = React.useState(false), panneau = _pf[0], setPanneau = _pf[1];
  var _vu = React.useState("page"), vue = _vu[0], setVue = _vu[1];
  var _np = React.useState(60), nListe = _np[0], setNListe = _np[1];
  var rail = React.useRef(null);
  var _rc = React.useState(0), recharge = _rc[0], setRecharge = _rc[1];
  var _gp = React.useState(false), gestionOuverte = _gp[0], setGestionOuverte = _gp[1];

  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, [vue]);
  React.useEffect(function () { try { window.__rv3Filtres = null; } catch (e) { } }, []);

  /* ── chargement : même monde que la page « Performances en concours » ── */
  React.useEffect(function () {
    var vivant = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !club) { if (vivant) setEtat("vide"); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        /* droits d import affichés (la base reste seule juge) */
        try {
          var ok = (typeof estModerateurHype === "function" && estModerateurHype(u)) || (typeof clubRevendiquePar === "function" && clubRevendiquePar(club, u));
          if (!ok && u && u.id) {
            var rg = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", (typeof clefClubG === "function") ? clefClubG(club) : club.toLowerCase()).eq("user_id", u.id).limit(1);
            ok = !!(rg && rg.data && rg.data.length);
          }
          if (vivant) setPeutImp(!!ok);
        } catch (eDr) { }
        var motif = (typeof motifEcurie === "function") ? motifEcurie(club) : ("%" + club + "%");
        var mm = [];
        try { var r1 = await supa.from("profiles").select("id").ilike("ecurie", motif).limit(300); if (r1 && r1.data) mm = mm.concat(r1.data); } catch (e1) { }
        try { var r2 = await supa.from("profiles").select("id").ilike("ecurie2", motif).limit(300); if (r2 && r2.data) mm = mm.concat(r2.data); } catch (e2) { }
        var vus = {}, ids = [];
        mm.forEach(function (p) { if (p && p.id && !vus[p.id]) { vus[p.id] = true; ids.push(p.id); } });
        try {
          var rCh = await supa.from("ecurie_cavaliers_choisis").select("membre_id, statut, ecurie").neq("statut", "refuse").ilike("ecurie", motif).limit(300);
          ((rCh && rCh.data) || []).forEach(function (p) { if (p && p.membre_id && !vus[p.membre_id]) { vus[p.membre_id] = true; ids.push(p.membre_id); } });
        } catch (eCh) { }
        try {
          var exclusC = (typeof cavaliersExclusEcurie === "function") ? await cavaliersExclusEcurie(club) : { data: [] };
          var setEx = {}; ((exclusC && exclusC.data) || []).forEach(function (x) { setEx[x] = true; });
          ids = ids.filter(function (x) { return !setEx[x]; });
        } catch (eEx) { }
        if (!ids.length) { if (vivant) setEtat("vide"); return; }
        var lignes = [];
        for (var deb = 0; deb < 6000; deb += 1000) {
          var rs = await supa.from("resultats")
            .select("id, user_id, cheval_id, concours, epreuve, partants, date_epreuve, cavalier, cavalier_id, place, classement, quart, mention, origine, visible, created_at, agenda_id")
            .in("user_id", ids).order("id", { ascending: true }).range(deb, deb + 999);
          if (rs && rs.error) throw new Error(String(rs.error.message || rs.error));
          var paq = (rs && rs.data) || [];
          lignes = lignes.concat(paq);
          if (paq.length < 1000) break;
        }
        lignes = lignes.filter(function (x) { return x && x.visible !== false; });
        try { if (typeof hypeReparerLignes === "function") lignes = hypeReparerLignes(lignes); } catch (eRp) { }
        /* les cavaliers DÉCLARÉS de l écurie. 30/10 (relecture) : comportement RESTRICTIF — si la liste des noms FFE ne peut pas
           être lue, on n affiche RIEN (état d erreur), jamais toutes les lignes importées par les membres. */
        var ffeUser = {}, noms = {};
        var rFf = await supa.from("cavaliers_ffe").select("nom, user_id, statut").in("user_id", ids);
        if (!rFf || rFf.error || !Array.isArray(rFf.data)) throw new Error("noms FFE illisibles");
        rFf.data.forEach(function (l) { if (l && l.nom) { noms[nrm(l.nom)] = true; if (l.user_id) ffeUser[nrm(l.nom)] = l.user_id; } });
        /* cavaliers SANS compte Hype rattachés à l écurie : liste centrale club_cavaliers_ffe (rattachement confirmé par une gestionnaire).
           Tant que la table n existe pas en base (SQL en attente), repli PROVISOIRE sur la liste écrite de la page actuelle. */
        var clefClub = (typeof clefClubG === "function") ? clefClubG(club) : club.toLowerCase();
        var sansCompte = [], tableCentrale = true;
        var rCc = await supa.from("club_cavaliers_ffe").select("nom").eq("club_clef", clefClub);
        if (rCc && rCc.error) {
          if (/club_cavaliers_ffe|does not exist|schema cache|42P01|PGRST205/i.test(String(rCc.error.message || rCc.error.code || ""))) {
            tableCentrale = false;
            var MANUELS_ECURIE_PROVISOIRE = [{ motif: "feinn", noms: ["ELEA BRILLARD", "EMMA VICTOIRE DURAND", "VALENTINE LANGLOIS DEPOIX", "PAULINE GILLES", "ILONA HUGOT", "CHLOE BERTHIER"] }];
            MANUELS_ECURIE_PROVISOIRE.forEach(function (m) { if (nrm(club).toLowerCase().indexOf(m.motif) !== -1) m.noms.forEach(function (n) { sansCompte.push(n); }); });
          } else throw new Error("liste des cavaliers sans compte illisible");
        } else ((rCc && rCc.data) || []).forEach(function (x) { if (x && x.nom) sansCompte.push(x.nom); });
        sansCompte.forEach(function (n) { noms[nrm(n)] = true; });
        /* noms présents dans les résultats importés par les membres mais rattachés à personne : candidats pour la gestionnaire */
        var candidats = {};
        lignes.forEach(function (x) {
          var k = nrm(x.cavalier); if (!k || noms[k]) return;
          if (/[0-9%\/]/.test(String(x.cavalier || ""))) return;   /* nom abîmé à l import (ex. « … Note/Score 63,08% ») : jamais proposé */
          var c = candidats[k] || (candidats[k] = { nom: x.cavalier, n: 0, der: "" }); c.n++; if ((x.date_epreuve || "") > c.der) c.der = x.date_epreuve || "";
        });
        /* 30/10 (contrôle sur les vraies données) : un nom FFE DÉJÀ RELIÉ À UN COMPTE (quelle que soit son écurie) n est pas un « cavalier sans
           compte » — sinon une cavalière de la SEP importée depuis le compte de Blandine serait proposée pour Feinn. */
        try {
          var nomsCands = Object.keys(candidats).map(function (k) { return candidats[k].nom; });
          for (var iCd = 0; iCd < nomsCands.length; iCd += 150) {
            var rLi = await supa.from("cavaliers_ffe").select("nom, user_id").in("nom", nomsCands.slice(iCd, iCd + 150));
            ((rLi && !rLi.error && rLi.data) || []).forEach(function (x) { if (x && x.user_id) delete candidats[nrm(x.nom)]; });
          }
        } catch (eLi) { }
        /* 30/10 22h09 (Blandine : Aceitunero « était classé club 3 aussi avec une autre cavalière ») : les parcours d un cheval montés par
           une cavalière NON rattachée sont gardés à part, pour compter TOUS les parcours du cheval dans « Nos chevaux » (jamais ailleurs). */
        var autres = lignes.filter(function (x) { return x && x.cheval_id && !noms[nrm(x.cavalier)]; });
        lignes = lignes.filter(function (x) { return x && noms[nrm(x.cavalier)]; });
        if (!lignes.length) { if (vivant) { setD({ lignes: [], candidats: candidats, sansCompte: sansCompte, tableCentrale: tableCentrale, clefClub: clefClub, moi: u }); setEtat("vide"); } return; }
        /* profils des cavalières (photo, âge), chevaux, rendez-vous reliés, photos des rendez-vous */
        var idsP = [];
        lignes.forEach(function (x) { var uid = x.cavalier_id || ffeUser[nrm(x.cavalier)] || (!x.cavalier ? x.user_id : null); if (uid && idsP.indexOf(uid) === -1) idsP.push(uid); });
        var profils = {};
        for (var iP = 0; iP < idsP.length; iP += 150) {
          try { var rP = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsP.slice(iP, iP + 150)); ((rP && rP.data) || []).forEach(function (p) { profils[p.id] = p; }); } catch (eP) { }
        }
        /* 30/10 (relecture) : majorité VÉRIFIÉE par une modératrice (table majorites_verifiees) — seule condition pour le nom complet
           et la photo de profil. Table absente ou illisible = personne de vérifié (prénom + initiale pour tous). */
        var majeures = {}, tableMaj = true;
        try {
          var rMj = await supa.from("majorites_verifiees").select("user_id").in("user_id", idsP.slice(0, 300));
          if (rMj && rMj.error) tableMaj = false; else ((rMj && rMj.data) || []).forEach(function (x) { if (x && x.user_id) majeures[x.user_id] = true; });
        } catch (eMj) { tableMaj = false; }
        /* 30/10 (choix B de Blandine) : la réponse « + de 18 ans » donnée à l inscription suffit (comptes créés depuis le 21/10).
           Fonction hype_majeurs_declares : ne renvoie QUE les comptes déclarés majeurs, rien d autre du compte. */
        var declares = {};
        try {
          var rDc = await supa.rpc("hype_majeurs_declares", { p_ids: idsP.slice(0, 300) });
          ((rDc && !rDc.error && rDc.data) || []).forEach(function (x) { var id = (x && typeof x === "object") ? (x.hype_majeurs_declares || x.id) : x; if (id) { declares[id] = true; majeures[id] = true; } });
        } catch (eDc) { }
        var idsC = [];
        lignes.forEach(function (x) { if (x.cheval_id && idsC.indexOf(x.cheval_id) === -1) idsC.push(x.cheval_id); });
        var chevaux = {};
        for (var iC = 0; iC < idsC.length; iC += 150) {
          try { var rC = await supa.from("chevaux").select("id, nom, alias, photo_url, visibilite, supprime_le").in("id", idsC.slice(iC, iC + 150)); ((rC && rC.data) || []).forEach(function (c) { chevaux[c.id] = c; }); } catch (eC2) { }
        }
        var idsA = [];
        lignes.forEach(function (x) { if (x.agenda_id && idsA.indexOf(x.agenda_id) === -1) idsA.push(x.agenda_id); });
        var rdvs = {}, photos = [];
        if (idsA.length) {
          try { var rA = await supa.from("club_agenda").select("id, titre, lieu, date_jour, date_fin, image_url").in("id", idsA); ((rA && rA.data) || []).forEach(function (a) { rdvs[a.id] = a; }); } catch (eA) { }
          try {
            var TITRES_JJ = ["le jour j", "race day", "el día j", "il giorno", "当日", "der tag"];
            var rM = await supa.from("commentaires").select("cible, photo_url, medias, prive, texte, created_at").in("cible", idsA.map(function (x) { return "agenda:" + x; })).order("created_at", { ascending: false }).limit(300);
            ((rM && rM.data) || []).forEach(function (po) {
              if (!po || po.prive) return;
              var tx = (typeof po.texte === "string") ? po.texte.replace(/\s+/g, " ").trim().toLowerCase() : "";
              if (tx && TITRES_JJ.indexOf(tx) !== -1) return;   /* les documents « Le jour J » ne sont pas des souvenirs */
              var idA = String(po.cible || "").slice(7);
              /* les messages d organisation postés AVANT le jour du concours (embarquement, ordre de passage…) ne sont pas des souvenirs */
              var jA = rdvs[idA] && rdvs[idA].date_jour ? String(rdvs[idA].date_jour).slice(0, 10) : "";
              if (jA && String(po.created_at || "").slice(0, 10) < jA) return;
              [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (url) {
                if (!url || (typeof estUrlVideo === "function" && estUrlVideo(url)) || /\.(mp4|mov|webm)(\?|#|$)/i.test(url)) return;
                if (!photos.some(function (p) { return p.url === url; })) photos.push({ url: url, agenda_id: idA });
              });
            });
          } catch (eMd) { }
        }
        if (!vivant) return;
        setD({ lignes: lignes, autres: autres, ffeUser: ffeUser, profils: profils, chevaux: chevaux, rdvs: rdvs, photos: photos, majeures: majeures, declares: declares, tableMaj: tableMaj, candidats: candidats, sansCompte: sansCompte, tableCentrale: tableCentrale, clefClub: clefClub, moi: u });
        setEtat("ok");
      } catch (e) { if (vivant) setEtat("panne"); }
    })();
    return function () { vivant = false; };
  }, [club, recharge]);

  /* ── préparation des lignes ── */
  var tout = React.useMemo(function () {
    if (!D || !D.lignes || !D.lignes.length || !R) return [];
    return D.lignes.map(function (b) {
      var x = R.normaliser(b);
      var uid = b.cavalier_id || (D.ffeUser && D.ffeUser[nrm(b.cavalier)]) || (!b.cavalier ? b.user_id : null) || null;
      var pr = uid && D.profils ? D.profils[uid] : null;
      var nomComplet = joliNom(b.cavalier) || (pr && pr.pseudo) || "";
      var mots = nomComplet.split(" ").filter(Boolean);
      /* Décisions du 30/10 : prénom + initiale du nom tant que la majorité n est pas connue — cochée par une modératrice
         (majorites_verifiees) OU déclarée « + de 18 ans » à l inscription (choix B, hype_majeurs_declares). profiles.est_mineur n est PAS utilisé. */
      var verifiee = !!(uid && D.majeures && D.majeures[uid]);
      var mineure = !verifiee;
      var nomAff = (mineure && mots.length > 1) ? (mots[0] + " " + mots[1].charAt(0).toUpperCase() + ".") : nomComplet;
      var cleCav = uid ? ("u:" + uid) : ("n:" + nrm(b.cavalier));
      var ch = (b.cheval_id && D.chevaux) ? D.chevaux[b.cheval_id] : null;
      var lieuBrut = sansDate(b.concours);
      return {
        b: b, x: x, date: x.date, saison: saisonDe(x.date), uid: uid, profil: pr, nom: nomAff, cleCav: cleCav,
        verifiee: verifiee, sansCompte: !uid,
        cheval: ch, nomCheval: ch ? joliNom(ch.alias || ch.nom) : "", lieu: joliNom(lieuBrut),
        identLieu: nrm((R.rdvNom && R.rdvNom(lieuBrut)) || (R.lieuNormal ? R.lieuNormal(lieuBrut) : lieuBrut)),
        sf: !!(R.estSansFaute && R.estSansFaute(x)), rdv: (b.agenda_id && D.rdvs) ? (D.rdvs[b.agenda_id] || null) : null
      };
    }).filter(function (l) { return l.date; });
  }, [D]);

  /* concours = rendez-vous relié, sinon même lieu à 3 jours près (même règle que le module des résultats) */
  var groupes = React.useMemo(function () {
    var tri = tout.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var gr = [], parAg = {}, ouverts = {};
    tri.forEach(function (l) {
      if (l.b.agenda_id) {
        var g0 = parAg[l.b.agenda_id];
        if (!g0) { g0 = { cle: "ag:" + l.b.agenda_id, rdv: l.rdv, lieu: l.lieu, deb: l.date, fin: l.date, l: [] }; parAg[l.b.agenda_id] = g0; gr.push(g0); }
        g0.l.push(l); if (l.date > g0.fin) g0.fin = l.date; l.g = g0; return;
      }
      var o = ouverts[l.identLieu];
      if (o && jours(l.date) - jours(o.fin) <= 3) { o.l.push(l); o.fin = l.date; l.g = o; return; }
      var g = { cle: "l:" + l.identLieu + ":" + l.date, rdv: null, lieu: l.lieu, deb: l.date, fin: l.date, l: [l] };
      ouverts[l.identLieu] = g; gr.push(g); l.g = g;
    });
    gr.forEach(function (g) {
      var deb = g.rdv && g.rdv.date_jour ? String(g.rdv.date_jour).slice(0, 10) : g.deb;
      g.debAff = deb < g.deb ? deb : g.deb;
      g.saison = saisonDe(g.deb);
    });
    return gr.sort(function (a, b) { return a.fin < b.fin ? 1 : a.fin > b.fin ? -1 : 0; });
  }, [tout]);

  var saisons = React.useMemo(function () {
    var s = []; tout.forEach(function (l) { if (l.saison != null && s.indexOf(l.saison) === -1) s.push(l.saison); });
    return s.sort(function (a, b) { return b - a; });
  }, [tout]);
  var saisonActive = F.saison === null ? (saisons.length ? saisons[0] : "tout") : F.saison;

  function passe(l, sauf) {
    if (sauf !== "saison" && saisonActive !== "tout" && l.saison !== saisonActive) return false;
    if (sauf !== "cav" && F.cav && l.cleCav !== F.cav) return false;
    if (sauf !== "ch" && F.ch && String(l.b.cheval_id || "") !== F.ch) return false;
    if (sauf !== "conc" && F.conc && (!l.g || l.g.cle !== F.conc)) return false;
    return true;
  }
  var filtrees = tout.filter(function (l) { return passe(l); }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.b.id < b.b.id ? -1 : 1); });
  /* options interdépendantes : chaque liste tient compte des AUTRES filtres */
  function options(sauf, cle, lib) {
    var vusO = {}, out = [];
    tout.forEach(function (l) { if (!passe(l, sauf)) return; var k = cle(l); if (!k || vusO[k]) return; vusO[k] = true; out.push({ v: k, t: lib(l) }); });
    return out;
  }
  var optCav = options("cav", function (l) { return l.cleCav; }, function (l) { return l.nom; }).sort(function (a, b) { return a.t.localeCompare(b.t); });
  var optCh = options("ch", function (l) { return l.b.cheval_id ? String(l.b.cheval_id) : ""; }, function (l) { return l.nomCheval; }).filter(function (o) { return o.t; }).sort(function (a, b) { return a.t.localeCompare(b.t); });
  var optConc = (function () { var vusG = {}, out = []; groupes.forEach(function (g) { if (vusG[g.cle]) return; if (!g.l.some(function (l) { return passe(l, "conc"); })) return; vusG[g.cle] = true; out.push({ v: g.cle, t: fmtPeriode(g.debAff, g.fin, true) + " · " + titreGroupe(g) }); }); return out; })();
  var filtreActif = !!(F.cav || F.ch || F.conc || (F.saison !== null && F.saison !== (saisons[0] != null ? saisons[0] : "tout")));

  /* ── mise en forme ── */
  function fmtDate(d, court) {
    try { return new Intl.DateTimeFormat(LOC[lg] || "fr-FR", court ? { day: "numeric", month: "short" } : { day: "numeric", month: "short", year: "numeric" }).format(new Date(String(d).slice(0, 10) + "T12:00:00Z")); } catch (e) { return String(d || ""); }
  }
  function fmtPeriode(a, b, court) { if (!b || a === b) return fmtDate(a, court); return fmtDate(a, true) + " – " + fmtDate(b, court); }
  function titreGroupe(g) { return g.lieu || (g.rdv && (g.rdv.lieu || g.rdv.titre)) || ""; }
  function ordinal(n) {
    if (lg === "fr") return n === 1 ? "1er" : n + "e";
    if (lg === "en") { var s = (n % 100 >= 11 && n % 100 <= 13) ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th"); return n + s; }
    if (lg === "nl") return n + "e";
    if (lg === "ja") return n + "位";
    if (lg === "zh") return "第" + n + "名";
    if (lg === "ko") return n + "위";
    if (lg === "es" || lg === "pt" || lg === "it") return n + "º";
    if (lg === "ar") return String(n);
    return n + ".";
  }
  function rang(l) {
    var x = l.x;
    if (x.place) return { t: ordinal(x.place) + (x.partants ? " / " + x.partants : ""), place: x.place };
    var c = String(l.b.classement || "").toLowerCase();
    if (/^el/.test(c)) return { t: t("elimine"), place: null };
    if (/^ab/.test(c)) return { t: t("abandon"), place: null };
    return null;
  }
  function photoCav(pr, verifiee) { if (!verifiee) return null; var v = pr && pr.avatar_url; if (!v || String(v).charAt(0) === "@" || !/^https?:/i.test(String(v))) return null; return String(v); }
  function photoCh(ch) { if (!ch || ch.supprime_le || ch.visibilite === "prive" || !ch.photo_url) return null; return String(ch.photo_url); }
  function vign(u, w, hh) { try { return (typeof vignetteHype === "function") ? vignetteHype(u, w, hh) : u; } catch (e) { return u; } }
  function ouvrirRdv(id) { try { window.__evPasse = null; window.__evPasseId = id; } catch (e) { } setEcran("evenement-passe"); }
  function ouvrirCavaliere(l) {
    if (l.uid) { try { window.__resCavaliereId = l.uid; } catch (e) { } setEcran("resultats-cavalier"); return; }
    /* cavalier SANS compte Hype : la liste de SES résultats, sur cette page (pas de fiche à ouvrir, rien d inventé) */
    setF(Object.assign({}, F, { cav: l.cleCav, conc: "" })); setNListe(60); setVue("tous");
  }
  function ouvrirCheval(id) { try { window.__chevalOuvert = id; window.__perfCavalierId = null; } catch (e) { } setEcran("performances-cheval"); }
  function ouvrirGroupe(g) {
    if (g.rdv && g.rdv.id) { ouvrirRdv(g.rdv.id); return; }
    setF(Object.assign({}, F, { conc: g.cle })); setVue("tous");
  }
  function ouvrirImport() {
    try { window.HYPE_IMPORT_MULTI = true; window.HYPE_IMPORT_CAVALIERE = false; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.HYPE_IMPORT_RETOUR = "resultats-ecurie"; window.localStorage.removeItem("hype_cheval_import"); } catch (e) { }
    setEcran("import-resultats");
  }
  function retour() { try { if (app.peutReculer && app.retourEcran) { app.retourEcran(); return; } } catch (e) { } if (vue !== "page") { setVue("page"); return; } setEcran("guilde"); }

  /* ── éléments communs ── */
  /* 30/10 22h05 (Blandine : « la version tel est catastrophique », « tout est deux fois trop grand », « les titres sont sur les images »)
     -> téléphone reconstruit d après la maquette 02 : 3 cartes cavalières par écran, dernier concours en bande photo à gauche,
     5 chiffres sur une ligne, 4 chevaux par ligne, titres courts + « Voir tout », plus aucun texte posé sur une photo. */
  var CSS = ".rv3{min-height:100vh;background:" + NOIR + ";color:" + IVOIRE + ";font-family:" + M + ";padding-bottom:8px;overflow-x:clip}" +
    ".rv3 *{box-sizing:border-box}.rv3-w{max-width:1240px;margin:0 auto;padding:0 14px}" +
    ".rv3-m{}.rv3-d{display:none}" +
    ".rv3-h2{font-family:" + SERIF + ";font-weight:500;font-size:21px;line-height:1.15;margin:0;color:" + IVOIRE + "}" +
    ".rv3-sec{padding-top:20px;padding-bottom:4px;min-width:0}.rv3-tete{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:9px}" +
    ".rv3-lien{background:none;border:0;color:" + CHAMP + ";font-family:" + M + ";font-size:11px;font-weight:600;letter-spacing:.3px;cursor:pointer;padding:4px 0;white-space:nowrap}" +
    ".rv3-rail{display:flex;align-items:flex-start;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:2px}.rv3-rail::-webkit-scrollbar{display:none}" +
    ".rv3-carte{flex:0 0 calc((100% - 16px)/3);scroll-snap-align:start;background:" + PETROLE + ";border:1px solid rgba(201,166,107,.22);border-radius:10px;overflow:hidden;cursor:pointer;text-align:start;color:inherit;padding:0;font:inherit;display:flex;flex-direction:column}" +
    ".rv3-ph{position:relative;aspect-ratio:4/3;background:" + PETROLE2 + ";overflow:hidden}.rv3-ph img{width:100%;height:100%;object-fit:cover;display:block}" +
    ".rv3-cb{padding:8px 9px 9px;display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}" +
    ".rv3-cn{font-family:" + SERIF + ";font-size:15.5px;line-height:1.1;color:" + IVOIRE + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-cc{font-size:11px;color:" + GRIS + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-rk{display:inline-flex;align-items:center;gap:4px;font-size:14.5px;font-weight:600;color:" + IVOIRE + "}.rv3-rk svg{width:15px;height:15px}" +
    ".rv3-ep{font-size:11px;color:rgba(243,238,228,.82);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-dt{font-size:10.5px;color:" + GRIS + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-sf{display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;color:#E9DCC0;border:1px solid rgba(201,166,107,.45);border-radius:999px;padding:1px 6px;white-space:nowrap}" +
    ".rv3-sel{appearance:none;-webkit-appearance:none;background:rgba(14,18,16,.92);color:" + IVOIRE + ";border:1px solid rgba(201,166,107,.35);border-radius:9px;font-family:" + M + ";font-size:16px;padding:7px 28px 7px 11px;min-height:40px;max-width:100%;background-image:linear-gradient(45deg,transparent 50%," + CHAMP + " 50%),linear-gradient(135deg," + CHAMP + " 50%,transparent 50%);background-position:calc(100% - 15px) 17px,calc(100% - 10px) 17px;background-size:5px 5px;background-repeat:no-repeat}" +
    "[dir=rtl] .rv3-sel{padding:7px 11px 7px 28px;background-position:15px 17px,10px 17px}" +
    ".rv3-bt{min-height:40px;padding:0 13px;border-radius:9px;border:1px solid " + CHAMP + ";background:transparent;color:#E9DCC0;font-family:" + M + ";font-size:12px;font-weight:600;letter-spacing:.3px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}" +
    ".rv3-kpi{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}" +
    ".rv3-k{background:" + PETROLE + ";border:1px solid rgba(201,166,107,.2);border-radius:9px;padding:8px 2px 7px;text-align:center}" +
    ".rv3-kn{font-family:" + SERIF + ";font-size:24px;line-height:1;color:" + IVOIRE + ";margin-top:4px}.rv3-kl{font-size:10px;color:" + GRIS + ";margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-dc{display:flex;align-items:stretch;width:100%;border-radius:12px;overflow:hidden;border:1px solid rgba(201,166,107,.25);background:" + PETROLE + ";color:" + IVOIRE + ";text-align:start;font:inherit;padding:0;cursor:pointer}" +
    ".rv3-dci{position:relative;flex:0 0 36%;min-height:124px;background:" + PETROLE2 + "}.rv3-dci img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}" +
    ".rv3-dct{flex:1;min-width:0;padding:10px 12px;display:flex;flex-direction:column;justify-content:center;gap:4px}" +
    ".rv3-dcn{font-family:" + SERIF + ";font-size:20px;line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-st{display:flex;flex-wrap:wrap;gap:3px 10px;font-size:11px}" +
    ".rv3-co{display:flex;align-items:stretch;width:100%;min-height:64px;padding:0;border-radius:10px;overflow:hidden;border:1px solid rgba(201,166,107,.2);background:" + PETROLE + ";color:" + IVOIRE + ";cursor:pointer;text-align:start;font:inherit}" +
    ".rv3-coi{flex:0 0 74px;position:relative;background:" + PETROLE2 + "}.rv3-coi img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}" +
    ".rv3-cot{flex:1;min-width:0;padding:7px 10px;display:flex;flex-direction:column;justify-content:center;gap:3px}" +
    ".rv3-cod{font-size:11px;color:" + GRIS + "}.rv3-con{font-family:" + SERIF + ";font-size:16.5px;line-height:1.15;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".rv3-ch{flex:0 0 calc((100% - 24px)/4)}.rv3-chn{font-family:" + SERIF + ";font-size:14px;line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rv3-chs{font-size:10px;color:" + GRIS + ";margin-top:2px;line-height:1.45}" +
    ".rv3-mo{flex:0 0 calc((100% - 16px)/3)}" +
    ".rv3-duo{display:grid;grid-template-columns:minmax(0,1fr);gap:0}" +
    ".rv3-fl{display:none}.rv3-fm{display:flex}" +
    ".rv3-hero{position:relative;background:" + NOIR + "}.rv3-hi{position:relative;height:168px;overflow:hidden}.rv3-hi img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 35%}" +
    ".rv3-hg{position:absolute;inset:0;background:linear-gradient(0deg," + NOIR + " 0%,rgba(7,10,8,0) 45%)}.rv3-ht{position:relative;padding-top:6px;padding-bottom:4px}" +
    ".rv3-h1{font-family:" + SERIF + ";font-weight:500;font-size:30px;line-height:1.05;margin:4px 0 6px;color:" + IVOIRE + "}.rv3-ki{font-size:9.5px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:" + CHAMP + "}.rv3-so{margin:0;font-size:13px;line-height:1.5;color:rgba(243,238,228,.78);max-width:440px}" +
    "@media(min-width:768px){.rv3-m{display:none}.rv3-d{display:revert}.rv3-w{padding-left:24px;padding-right:24px}.rv3-h2{font-size:26px}.rv3-sec{padding-top:26px}.rv3-tete{margin-bottom:12px}.rv3-rail{gap:12px}" +
      ".rv3-carte{flex-basis:calc((100% - 24px)/3);border-radius:13px}.rv3-cb{padding:10px 12px 12px;gap:5px}.rv3-cn{font-size:19px}.rv3-cc{font-size:11.5px}.rv3-rk{font-size:15px;gap:6px}.rv3-rk svg{width:18px;height:18px}.rv3-ep{font-size:11.5px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.rv3-dt{font-size:10.5px}.rv3-sf{font-size:10.5px;padding:2px 8px}" +
      ".rv3-k{padding:14px 6px;border-radius:12px}.rv3-kn{font-size:28px}.rv3-kl{font-size:10px}" +
      ".rv3-dci{flex-basis:42%;min-height:240px}.rv3-dct{padding:18px 20px;gap:6px}.rv3-dcn{font-size:28px;white-space:normal}.rv3-st{font-size:11.5px;gap:6px 14px}" +
      ".rv3-coi{flex-basis:96px}.rv3-con{font-size:18px}.rv3-cod{font-size:11px}.rv3-co{min-height:72px;border-radius:12px}" +
      ".rv3-ch{flex-basis:calc((100% - 36px)/4)}.rv3-chn{font-size:17px}.rv3-chs{font-size:10.5px}.rv3-mo{flex-basis:calc((100% - 24px)/3)}" +
      ".rv3-hero{min-height:320px;overflow:hidden}.rv3-hi{position:absolute;inset:0;height:auto}.rv3-hg{background:linear-gradient(" + (rtl ? "270deg" : "90deg") + ",rgba(7,10,8,.95) 0%,rgba(7,10,8,.78) 40%,rgba(7,10,8,.1) 100%),linear-gradient(0deg," + NOIR + " 0%,rgba(7,10,8,0) 38%)}.rv3-ht{padding-top:calc(env(safe-area-inset-top) + 72px);padding-bottom:20px}.rv3-h1{font-size:clamp(38px,5vw,54px)}.rv3-ki{font-size:10.5px;letter-spacing:2.4px}.rv3-so{font-size:13px}}" +
    "@media(min-width:1024px){.rv3-fl{display:flex}.rv3-fm{display:none}}" +
    "@media(min-width:1200px){.rv3-carte{flex-basis:calc((100% - 36px)/4)}.rv3-duo{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:28px}.rv3-ch{flex-basis:calc((100% - 36px)/4)}.rv3-mo{flex-basis:calc((100% - 48px)/5)}}";

  function select(val, liste, tous, onCh, cle) {
    return h("select", { key: cle, className: "rv3-sel", value: val, "aria-label": tous, onChange: function (e) { onCh(e.target.value); } },
      [h("option", { key: "_", value: "" }, tous)].concat(liste.map(function (o) { return h("option", { key: o.v, value: o.v }, o.t); })));
  }
  var selSaison = h("select", { key: "s", className: "rv3-sel", value: String(saisonActive), "aria-label": t("saison"),
    onChange: function (e) { var v = e.target.value; setF(Object.assign({}, F, { saison: v === "tout" ? "tout" : Number(v), conc: "" })); } },
    saisons.map(function (s) { return h("option", { key: s, value: String(s) }, t("saison") + " " + libSaison(s)); }).concat([h("option", { key: "tout", value: "tout" }, t("toutesSaisons"))]));
  var selCav = select(F.cav, optCav, t("tousCav"), function (v) { setF(Object.assign({}, F, { cav: v })); }, "c");
  var selCh = select(F.ch, optCh, t("tousCh"), function (v) { setF(Object.assign({}, F, { ch: v })); }, "h");
  var selConc = select(F.conc, optConc, t("tousConc"), function (v) { setF(Object.assign({}, F, { conc: v })); }, "o");
  var btReinit = h("button", { key: "r", type: "button", className: "rv3-lien", onClick: function () { setF({ saison: null, cav: "", ch: "", conc: "" }); } }, t("reinit"));
  var icImp = h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    h("path", { d: "M12 3v12" }), h("path", { d: "M7 10l5 5 5-5" }), h("path", { d: "M4 17v3h16v-3" }));
  var btImport = peutImp ? h("button", { key: "i", type: "button", className: "rv3-bt", onClick: ouvrirImport }, icImp, t("importer")) : null;
  var btGerer = peutImp ? h("button", { key: "g", type: "button", className: "rv3-lien", onClick: function () { setVue("gestion"); } }, tg("gerer")) : null;
  var btImportCompact = peutImp ? h("button", { key: "ic", type: "button", className: "rv3-bt", "aria-label": t("importer"), title: t("importer"), onClick: ouvrirImport, style: { width: 44, padding: 0, justifyContent: "center", flex: "0 0 44px" } }, icImp) : null;

  /* ── HERO ── */
  var hero = h("div", { className: "rv3-hero" },
    h("div", { className: "rv3-hi" }, h("img", { src: IMG_HERO, alt: "", decoding: "async", style: { transform: rtl ? "scaleX(-1)" : "none" } }), h("div", { className: "rv3-hg", "aria-hidden": "true" })),
    h("button", { type: "button", onClick: retour, "aria-label": t("retour"), style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 12px)", left: 14, zIndex: 3, width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.22)", background: "rgba(7,10,8,0.55)", color: IVOIRE, fontSize: 21, cursor: "pointer", lineHeight: "34px" } }, rtl ? "›" : "‹"),
    (typeof HypeDrapeauLangue === "function") ? h(HypeDrapeauLangue, { top: "calc(env(safe-area-inset-top) + 12px)", right: 14 }) : null,
    h("div", { className: "rv3-w rv3-ht", style: { zIndex: 2 } },
      h("div", { className: "rv3-ki" }, t("kicker") + (club ? " · " + club : "")),
      h("h1", { className: "rv3-h1" }, t("titre")),
      h("p", { className: "rv3-so" }, t("sous"))));

  function pastilleFiltre(cle, libelle, retirer) {
    return h("button", { key: cle, type: "button", onClick: retirer, style: { display: "inline-flex", alignItems: "center", gap: 6, maxWidth: "100%", minHeight: 30, padding: "0 10px", borderRadius: 999, border: "1px solid " + CHAMP, background: "rgba(201,166,107,0.12)", color: "#E9DCC0", fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } },
      h("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, libelle), h("span", { "aria-hidden": "true", style: { fontSize: 14, lineHeight: 1 } }, "×"));
  }
  var libDe = function (liste, v) { var o = liste.filter(function (x) { return x.v === v; })[0]; return o ? o.t : v; };
  var pastilles = [];
  if (F.cav) pastilles.push(pastilleFiltre("pc", libDe(optCav, F.cav), function () { setF(Object.assign({}, F, { cav: "" })); }));
  if (F.ch) pastilles.push(pastilleFiltre("ph", libDe(optCh, F.ch), function () { setF(Object.assign({}, F, { ch: "" })); }));
  if (F.conc) pastilles.push(pastilleFiltre("po", libDe(optConc, F.conc), function () { setF(Object.assign({}, F, { conc: "" })); }));
  var lignePastilles = pastilles.length ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, pastilles) : null;

  /* ── FILTRES ── */
  var barreFiltres = (etat === "ok" && tout.length) ? h("div", { className: "rv3-w", style: { paddingTop: 14 } },
    h("div", { className: "rv3-fl", style: { flexWrap: "wrap", gap: 10, alignItems: "center" } }, selSaison, selCav, selCh, selConc, filtreActif ? btReinit : null),
    h("div", { className: "rv3-fl" }, lignePastilles),
    h("div", { className: "rv3-fm", style: { flexDirection: "column", gap: 10 } },
      h("div", { style: { display: "flex", gap: 10 } },
        h("div", { style: { flex: 1, minWidth: 0, display: "flex" } }, h("div", { style: { width: "100%" } }, React.cloneElement(selSaison, { style: { width: "100%" } }))),
        h("button", { type: "button", className: "rv3-bt", "aria-expanded": panneau, onClick: function () { setPanneau(!panneau); } },
          h("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, "aria-hidden": "true" }, h("path", { d: "M4 5h16l-6 7v6l-4 2v-8z" })),
          t("filtres") + ((F.cav || F.ch || F.conc) ? " · " + [F.cav, F.ch, F.conc].filter(Boolean).length : ""))),
      lignePastilles,
      panneau ? h("div", { style: { display: "flex", flexDirection: "column", gap: 10, padding: 12, borderRadius: 12, background: PETROLE2, border: "1px solid rgba(201,166,107,0.22)" } },
        React.cloneElement(selCav, { style: { width: "100%" } }), React.cloneElement(selCh, { style: { width: "100%" } }), React.cloneElement(selConc, { style: { width: "100%" } }),
        h("div", { style: { display: "flex", justifyContent: "flex-end" } }, btReinit)) : null)) : null;

  function message(txt, avecImport) {
    return h("div", { className: "rv3-w", style: { padding: "48px 16px", textAlign: "center" } },
      h("div", { style: { fontFamily: SERIF, fontSize: 22, color: IVOIRE } }, txt),
      (avecImport && peutImp) ? h("div", { style: { marginTop: 10, fontSize: 12.5, color: GRIS } }, t("videImport")) : null,
      (avecImport && peutImp) ? h("div", { style: { marginTop: 18, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, h("button", { type: "button", className: "rv3-bt", onClick: ouvrirImport }, icImp, t("importer")), h("button", { type: "button", className: "rv3-bt", onClick: function () { setVue("gestion"); } }, tg("gerer"))) : null);
  }
  function teteSection(titre, lien, onLien, cle, court) {
    return h("div", { className: "rv3-tete", key: cle },
      h("h2", { className: "rv3-h2" }, court ? h("span", { className: "rv3-m" }, court) : null, h("span", { className: court ? "rv3-d" : "" }, titre)),
      lien ? h("button", { type: "button", className: "rv3-lien", onClick: onLien }, lien + (rtl ? " ←" : " →")) : null);
  }
  function badgeSF() {
    return h("span", { className: "rv3-sf" },
      h("svg", { width: 10, height: 10, viewBox: "0 0 24 24", fill: CHAMP, "aria-hidden": "true" }, h("path", { d: "M12 2l3 7h7l-5.5 4.5 2 7.5L12 16.5 5.5 21l2-7.5L2 9h7z" })), t("sansFaute"));
  }
  function trophee(place) {
    var c = place === 1 ? "#D8B46A" : place === 2 ? "#C9CDD2" : place === 3 ? "#C08A5B" : "rgba(201,166,107,0.6)";
    return h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: 1.6, "aria-hidden": "true" }, h("path", { d: "M7 4h10v4a5 5 0 0 1-10 0z" }), h("path", { d: "M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6" }));
  }
  function pastille(txt) {
    var ini = String(txt || "?").split(" ").filter(Boolean).slice(0, 2).map(function (m) { return m.charAt(0).toUpperCase(); }).join("");
    return h("span", { "aria-hidden": "true", style: { flex: "0 0 30px", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 13, color: CHAMP, background: PETROLE2 } }, ini);
  }
  function monogramme(txt) {
    var ini = String(txt || "?").split(" ").filter(Boolean).slice(0, 2).map(function (m) { return m.charAt(0).toUpperCase(); }).join("");
    return h("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 40%, #171C19 0%, " + PETROLE2 + " 70%)" } },
      h("span", { style: { fontFamily: SERIF, fontSize: 44, color: "rgba(201,166,107,0.75)", letterSpacing: 2 } }, ini));
  }

  /* ── C. LES DERNIERS RÉSULTATS DE NOS CAVALIERS ── */
  /* 30/10 23h17 (Blandine) : « les derniers résultats devraient mettre en avant les meilleurs résultats en premier, la victoire et les
     podiums ». Par cavalière : son MEILLEUR résultat de sa dernière journée de concours ; puis tri par date (la plus récente d abord) et,
     à date égale, par place (victoire, podiums, puis les autres ; sans place en dernier), sans faute avant à place égale. */
  var derniers = (function () {
    var parCav = {};
    filtrees.forEach(function (l) {
      var c = parCav[l.cleCav];
      if (!c || l.date > c.date) { parCav[l.cleCav] = { date: l.date, l: [l] }; return; }
      if (l.date === c.date) c.l.push(l);
    });
    var rangDe = function (l) { return (l.x && l.x.place && !(R.estPrepa && R.estPrepa(l.x))) ? l.x.place : 999; };
    var mieux = function (a, b) { return (rangDe(a) - rangDe(b)) || ((b.sf ? 1 : 0) - (a.sf ? 1 : 0)); };
    return Object.keys(parCav).map(function (k) { return parCav[k].l.slice().sort(mieux)[0]; })
      .sort(function (a, b) { return (a.date < b.date ? 1 : a.date > b.date ? -1 : 0) || mieux(a, b); }).slice(0, 16);
  })();
  function carteCav(l) {
    var ph = photoCav(l.profil, l.verifiee) || photoCh(l.cheval);
    var r = rang(l);
    return h("button", { key: l.b.id, type: "button", className: "rv3-carte" + (ph ? "" : " rv3-sansph"), onClick: function () { ouvrirCavaliere(l); } },
      ph ? h("div", { className: "rv3-ph" }, h("img", { src: vign(ph, 480, 360), alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (er) { } } })) : null,
      h("div", { className: "rv3-cb" },
        h("div", { style: { display: "flex", alignItems: "center", gap: 7, minWidth: 0 } }, ph ? null : pastille(l.nom), h("div", { style: { minWidth: 0, flex: 1 } },
          h("div", { dir: "auto", className: "rv3-cn" }, l.nom),
          l.nomCheval ? h("div", { dir: "auto", className: "rv3-cc" }, l.nomCheval) : null)),
        h("div", { style: { display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", minHeight: 18 } },
          r ? h("span", { className: "rv3-rk" }, r.place && r.place <= 3 ? trophee(r.place) : null, h("bdi", { dir: "ltr" }, r.t)) : null,
          l.sf ? badgeSF() : null),
        h("div", { dir: "auto", className: "rv3-ep" }, l.x.ep || ""),
        h("div", { dir: "auto", className: "rv3-dt" }, fmtDate(l.date), l.lieu ? h("span", { className: "rv3-d" }, " · " + l.lieu) : null)));
  }
  function defiler(sens) { try { var el = rail.current; if (!el) return; var pas = el.clientWidth * 0.9 * (rtl ? -1 : 1); el.scrollBy({ left: sens * pas, behavior: "smooth" }); } catch (e) { } }
  var fleche = function (sens) {
    return h("button", { type: "button", "aria-label": sens < 0 ? t("precedent") : t("suivant"), onClick: function () { defiler(sens); }, className: "rv3-fl",
      style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", background: "transparent", color: CHAMP, cursor: "pointer", alignItems: "center", justifyContent: "center", fontSize: 18 } },
      (sens < 0) !== rtl ? "‹" : "›");
  };
  var voirTousCav = function () { setNListe(60); setVue("tous"); };
  var secCav = h("section", { className: "rv3-w rv3-sec", "aria-label": t("derniers") },
    h("div", { className: "rv3-tete" }, h("h2", { className: "rv3-h2" }, h("span", { className: "rv3-m" }, t("derniersCourt")), h("span", { className: "rv3-d" }, t("derniers"))),
      h("span", { className: "rv3-m" }, h("button", { type: "button", className: "rv3-lien", onClick: voirTousCav }, t("voirTout") + (rtl ? " ←" : " →"))),
      h("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, derniers.length > 3 ? fleche(-1) : null, derniers.length > 3 ? fleche(1) : null)),
    derniers.length ? h("div", { ref: rail, className: "rv3-rail" }, derniers.map(carteCav)) : h("div", { style: { padding: "24px 0", color: GRIS, fontSize: 13 } }, t("aucunFiltre")),
    h("div", { className: "rv3-d", style: { marginTop: 10 } }, h("button", { type: "button", className: "rv3-lien", onClick: voirTousCav }, t("voirTous") + (rtl ? " ←" : " →"))),
    peutImp ? h("div", { style: { marginTop: 14, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" } },
      h("button", { type: "button", className: "rv3-bt", onClick: ouvrirImport, style: { flex: "1 1 auto", maxWidth: 360, justifyContent: "center" } }, icImp, t("importer")),
      h("button", { type: "button", className: "rv3-lien", onClick: function () { setVue("gestion"); } }, tg("gerer"))) : null);

  /* ── D. DERNIER CONCOURS ── */
  var grF = groupes.map(function (g) { var l2 = g.l.filter(function (l) { return passe(l); }); return l2.length ? { g: g, l: l2 } : null; }).filter(Boolean);
  function stats(ls) {
    var sf = 0, pod = 0, v = 0, vp = 0, cav = {};
    ls.forEach(function (l) { if (l.sf) sf++; if (R.estP(l.x)) pod++; if (R.estV(l.x)) v++; if (R.estVPrepa(l.x)) vp++; cav[l.cleCav] = true; });
    return { sf: sf, pod: pod, v: v, vp: vp, cav: Object.keys(cav).length, n: ls.length };
  }
  function petitStat(icone, n, lib, cle) { return h("span", { key: cle, style: { display: "inline-flex", alignItems: "center", gap: 4, color: "rgba(243,238,228,0.86)", whiteSpace: "nowrap" } }, icone, h("b", { style: { fontWeight: 600, color: IVOIRE } }, n), lib); }
  var icPod = h("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, "aria-hidden": "true" }, h("path", { d: "M7 4h10v4a5 5 0 0 1-10 0zM12 13v4M8 21h8" }));
  var icSF = h("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, "aria-hidden": "true" }, h("path", { d: "M12 3l2.6 6 6.4.6-4.9 4.3 1.5 6.3L12 17l-5.6 3.2 1.5-6.3L3 9.6 9.4 9z" }));
  var icCav = h("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, "aria-hidden": "true" }, h("circle", { cx: 12, cy: 8, r: 4 }), h("path", { d: "M4 21a8 8 0 0 1 16 0" }));
  function ligneStats(s) { return h("div", { className: "rv3-st" }, petitStat(icPod, s.pod, tn("nPodiums", s.pod), "p"), petitStat(icSF, s.sf, tn("nSansFaute", s.sf), "s"), petitStat(icCav, s.cav, tn("nCavaliers", s.cav), "c")); }
  function imageGroupe(g) {
    if (g.rdv && g.rdv.image_url) return String(g.rdv.image_url);
    if (g.rdv && D && D.photos) { var p = D.photos.filter(function (x) { return x.agenda_id === g.rdv.id; })[0]; if (p) return p.url; }
    return null;
  }
  var secDernier = null;
  if (grF.length) {
    var G = grF[0], sG = stats(G.l), imgG = imageGroupe(G.g);
    var meilleurs = G.l.slice().sort(function (a, b) { return (a.x.place || 999) - (b.x.place || 999); }).slice(0, 4);
    secDernier = h("section", { className: "rv3-sec", "aria-label": t("dernierConc") },
      h("button", { type: "button", className: "rv3-dc", onClick: function () { ouvrirGroupe(G.g); } },
        imgG ? h("div", { className: "rv3-dci" }, h("img", { src: vign(imgG, 900, 600), alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.parentNode.style.display = "none"; } catch (er) { } } })) : null,
        h("div", { className: "rv3-dct" },
          h("div", { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: CHAMP } }, t("dernierConc")),
          h("div", { dir: "auto", className: "rv3-dcn" }, titreGroupe(G.g)),
          (G.g.rdv && G.g.rdv.titre) ? h("div", { dir: "auto", className: "rv3-cod" }, G.g.rdv.titre) : null,
          h("div", { className: "rv3-cod" }, fmtPeriode(G.g.debAff, G.g.fin)),
          ligneStats(sG),
          h("div", { className: "rv3-d" }, h("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 5 } }, meilleurs.map(function (l) {
            var r = rang(l);
            return h("div", { key: l.b.id, dir: "auto", style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(243,238,228,0.9)" } },
              h("span", { dir: "ltr", style: { flex: "0 0 58px", fontWeight: 600, color: IVOIRE, unicodeBidi: "isolate", textAlign: rtl ? "right" : "left" } }, r ? r.t : "—"),
              h("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, l.nom + (l.nomCheval ? " · " + l.nomCheval : "") + (l.x.ep ? " · " + l.x.ep : "")),
              l.sf ? h("span", { style: { flex: "0 0 auto" } }, badgeSF()) : null);
          })), h("div", { style: { marginTop: 12, fontSize: 12, fontWeight: 600, color: CHAMP } }, (G.g.rdv ? t("voirConc") : t("voirResConc")) + (rtl ? " ←" : " →")))),
        h("div", { className: "rv3-m", "aria-hidden": "true", style: { flex: "0 0 26px", display: "flex", alignItems: "center", justifyContent: "center", color: CHAMP, fontSize: 18 } }, rtl ? "‹" : "›")));
  }

  /* ── E. LA SAISON EN QUELQUES CHIFFRES ── */
  var sTot = stats(filtrees);
  var nSorties = (function () { var c = {}; filtrees.forEach(function (l) { if (l.g) c[l.g.cle] = true; }); return Object.keys(c).length; })();
  var ICK = {
    c: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5",
    p: "M4 20V6M20 20V6M4 9h16M4 14h16",
    s: "M12 3l2.6 6 6.4.6-4.9 4.3 1.5 6.3L12 17l-5.6 3.2 1.5-6.3L3 9.6 9.4 9z",
    o: "M7 4h10v4a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8",
    v: "M6 4c-2 4-1 9 3 11M18 4c2 4 1 9-3 11M9 15c1 2 5 2 6 0M12 17v4"
  };
  function kpi(n, lib, extra, cle) {
    return h("div", { key: cle, className: "rv3-k" },
      h("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: ICK[cle] })),
      h("div", { className: "rv3-kn" }, n, extra ? h("span", { style: { fontSize: "0.55em", color: GRIS } }, " (" + extra + ")") : null),
      h("div", { className: "rv3-kl" }, lib));
  }
  var secChiffres = filtrees.length ? h("section", { className: "rv3-sec", "aria-label": t("chiffres") },
    teteSection(saisonActive === "tout" ? t("chiffresTout") : (t("chiffres") + " · " + libSaison(saisonActive)), null, null, "t", t("perfCourt")),
    h("div", { className: "rv3-kpi" }, kpi(nSorties, tn("nConcours", nSorties), null, "c"), kpi(sTot.n, tn("nParcours", sTot.n), null, "p"), kpi(sTot.sf, tn("nSansFaute", sTot.sf), null, "s"), kpi(sTot.pod, tn("nPodiums", sTot.pod), null, "o"), kpi(sTot.v, tn("nVictoires", sTot.v), sTot.vp || null, "v")),
    h("div", { style: { fontSize: 9.5, color: GRIS, marginTop: 6, lineHeight: 1.45 } }, t("suitFiltres") + (sTot.vp ? " " + t("notePrepa") : ""))) : null;

  /* ── F. TOUS LES CONCOURS ── */
  var _nc = React.useState(6), nConc = _nc[0], setNConc = _nc[1];
  var secConcours = grF.length ? h("section", { className: "rv3-sec", "aria-label": t("tousConc") },
    teteSection(t("tousConc"), null, null, "t"),
    h("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, grF.slice(0, nConc).map(function (e) {
      var s = stats(e.l), img = imageGroupe(e.g);
      return h("button", { key: e.g.cle, type: "button", className: "rv3-co", onClick: function () { ouvrirGroupe(e.g); } },
        img ? h("div", { className: "rv3-coi" }, h("img", { src: vign(img, 200, 160), alt: "", loading: "lazy", decoding: "async", onError: function (ev) { try { ev.target.parentNode.style.display = "none"; } catch (er) { } } })) : null,
        h("div", { className: "rv3-cot" },
          h("div", { className: "rv3-cod" }, fmtPeriode(e.g.debAff, e.g.fin)),
          h("div", { dir: "auto", className: "rv3-con" }, titreGroupe(e.g)),
          ligneStats(s)),
        h("div", { "aria-hidden": "true", style: { flex: "0 0 26px", display: "flex", alignItems: "center", justifyContent: "center", color: CHAMP, fontSize: 17 } }, rtl ? "‹" : "›"));
    })),
    grF.length > nConc ? h("button", { type: "button", className: "rv3-lien", style: { marginTop: 8 }, onClick: function () { setNConc(nConc + 10); } }, t("voirPlus")) : null) : null;

  /* ── G. NOS CHEVAUX EN COMPÉTITION ── */
  var chevauxF = (function () {
    var m = {};
    filtrees.forEach(function (l) { if (!l.b.cheval_id || !l.cheval) return; var k = String(l.b.cheval_id); if (!m[k]) m[k] = { id: k, ch: l.cheval, nom: l.nomCheval, l: [] }; m[k].l.push(l); });
    /* + les parcours de ces chevaux avec une cavalière non rattachée (même saison ; pas quand on filtre une cavalière ou un concours) */
    if (!F.cav && !F.conc && D && D.autres && R) {
      var vusA = {};
      D.autres.forEach(function (b) {
        var k = String(b.cheval_id || ""); if (!m[k] || vusA[b.id]) return;
        var x = R.normaliser(b); if (!x.date) return;
        if (saisonActive !== "tout" && saisonDe(x.date) !== saisonActive) return;
        if (F.ch && F.ch !== k) return;
        vusA[b.id] = true;
        m[k].l.push({ x: x, b: b, cleCav: "a:" + nrm(b.cavalier), sf: !!(R.estSansFaute && R.estSansFaute(x)) });
      });
    }
    return Object.keys(m).map(function (k) { var o = m[k]; o.s = stats(o.l); return o; })
      .sort(function (a, b) { return (b.s.pod - a.s.pod) || (b.s.n - a.s.n) || a.nom.localeCompare(b.nom); });
  })();
  var secChevaux = chevauxF.length ? h("section", { className: "rv3-sec", "aria-label": t("nosChevaux") },
    teteSection(t("nosChevaux"), null, null, "t", t("chevauxCourt")),
    h("div", { className: "rv3-rail" }, chevauxF.slice(0, 20).map(function (o) {
      var ph = photoCh(o.ch);
      return h("button", { key: o.id, type: "button", className: "rv3-carte rv3-ch", onClick: function () { ouvrirCheval(o.id); } },
        h("div", { className: "rv3-ph", style: { aspectRatio: "5 / 4" } }, ph ? h("img", { src: vign(ph, 360, 290), alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (er) { } } }) : monogramme(o.nom)),
        h("div", { style: { padding: "6px 7px 7px" } },
          h("div", { dir: "auto", className: "rv3-chn" }, o.nom),
          h("div", { className: "rv3-chs" }, o.s.sf + " " + tn("nSansFaute", o.s.sf), h("br"), o.s.pod + " " + tn("nPodiums", o.s.pod))));
    }))) : null;

  /* ── H. MOMENTS FORTS (photos réelles des rendez-vous reliés, dans la sélection) ── */
  var agSel = {}; filtrees.forEach(function (l) { if (l.b.agenda_id) agSel[l.b.agenda_id] = true; });
  var photosSel = (D && D.photos ? D.photos : []).filter(function (p) { return agSel[p.agenda_id]; }).slice(0, 15);
  /* 30/10 23h17 (Blandine) : « Importer des photos » sous les photos -> ouvre la journée du DERNIER concours relié à l agenda, où le fil
     permet de publier ses photos (même règles d écriture que la page de la journée). Sans concours relié : pas de bouton. */
  var rdvPhotos = (function () { for (var i = 0; i < grF.length; i++) { if (grF[i].g.rdv && grF[i].g.rdv.id) return grF[i].g.rdv; } return null; })();
  var btPhotos = (rdvPhotos && D && D.moi) ? h("div", { style: { marginTop: 12 } },
    h("button", { type: "button", className: "rv3-bt", onClick: function () { ouvrirRdv(rdvPhotos.id); }, style: { width: "100%", maxWidth: 360, justifyContent: "center" } },
      h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: CHAMP, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 7h3l2-2h6l2 2h3v12H4z" }), h("circle", { cx: 12, cy: 13, r: 3.5 })),
      t("ajouterPhotos"))) : null;
  var secMoments = (photosSel.length || btPhotos) ? h("section", { className: "rv3-w rv3-sec", "aria-label": t("moments") },
    teteSection(t("moments"), null, null, "t"),
    photosSel.length ? h("div", { className: "rv3-rail" }, photosSel.map(function (p, i) {
      return h("button", { key: p.url + i, type: "button", className: "rv3-carte rv3-mo", onClick: function () { ouvrirRdv(p.agenda_id); }, style: { border: "1px solid rgba(201,166,107,0.18)" } },
        h("div", { className: "rv3-ph", style: { aspectRatio: "1 / 1" } }, h("img", { src: vign(p.url, 360, 360), alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.parentNode.parentNode.style.display = "none"; } catch (er) { } } })));
    })) : null,
    btPhotos) : null;

  /* ── VUE « TOUS LES RÉSULTATS » ── */
  function vueTous() {
    var ls = filtrees.slice(0, nListe);
    return h("section", { className: "rv3-w rv3-sec", "aria-label": t("tousRes") },
      h("div", { className: "rv3-tete" }, h("h2", { className: "rv3-h2" }, t("tousRes")), h("button", { type: "button", className: "rv3-lien", onClick: function () { setVue("page"); } }, (rtl ? "→ " : "← ") + t("retourPage"))),
      h("div", { style: { fontSize: 11.5, color: GRIS, marginBottom: 10 } }, filtrees.length + " " + tn("nResultats", filtrees.length)),
      ls.length ? h("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, ls.map(function (l) {
        var r = rang(l);
        return h("button", { key: l.b.id, type: "button", onClick: function () { ouvrirCavaliere(l); },
          style: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", borderRadius: 10, background: PETROLE, border: "1px solid rgba(201,166,107,0.16)", color: IVOIRE, textAlign: "start", font: "inherit", cursor: "pointer" } },
          h("div", { style: { flex: "0 0 74px", textAlign: "center" } },
            h("div", { style: { fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 } }, r && r.place && r.place <= 3 ? trophee(r.place) : null, r ? h("bdi", { dir: "ltr" }, r.t) : "—")),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { dir: "auto", style: { fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, l.nom + (l.nomCheval ? " · " + l.nomCheval : "")),
            h("div", { dir: "auto", style: { fontSize: 11.5, color: "rgba(243,238,228,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, l.x.ep || ""),
            h("div", { dir: "auto", style: { fontSize: 10.5, color: GRIS } }, fmtDate(l.date) + (l.lieu ? " · " + l.lieu : ""))),
          l.sf ? badgeSF() : null);
      })) : h("div", { style: { padding: "24px 0", color: GRIS, fontSize: 13 } }, t("aucunFiltre")),
      filtrees.length > nListe ? h("button", { type: "button", className: "rv3-lien", style: { marginTop: 10 }, onClick: function () { setNListe(nListe + 60); } }, t("voirPlus")) : null);
  }

  /* ── VUE « GESTION » (gestionnaires seulement ; la base reste seule juge) ── */
  var _ge = React.useState(null), evtsClub = _ge[0], setEvtsClub = _ge[1];
  var _gm = React.useState({ t: "", err: false }), gMsg = _gm[0], setGMsg = _gm[1];
  var _gb = React.useState(""), gBusy = _gb[0], setGBusy = _gb[1];
  var _gt = React.useState(false), gToutes = _gt[0], setGToutes = _gt[1];
  React.useEffect(function () {
    if (vue !== "gestion" || !D || !D.clefClub || typeof supa === "undefined" || !supa) return;
    var vif = true;
    supa.from("club_agenda").select("id, club_clef, type, titre, lieu, date_jour, date_fin").eq("club_clef", D.clefClub).eq("type", "concours").limit(1000)
      .then(function (r) { if (vif) setEvtsClub((r && !r.error && r.data) || []); });
    return function () { vif = false; };
  }, [vue, D && D.clefClub]);
  async function action(cle, fn) {
    setGBusy(cle); setGMsg({ t: "", err: false });
    try {
      var r = await fn();
      if (r && r.error) throw new Error(String(r.error.message || r.error));
      if (r && Array.isArray(r.data) && !r.data.length) throw new Error("0");
      setGMsg({ t: tg("gFait"), err: false }); setRecharge(recharge + 1);
    } catch (e) {
      var m = String((e && e.message) || e);
      setGMsg({ t: (/does not exist|schema cache|PGRST205|42P01/i.test(m) ? tg("gSql") : tg("gRefus") + (m === "0" ? "0" : m)), err: true });
    }
    setGBusy("");
  }
  function vueGestion() {
    var estMod = (typeof estModerateurHype === "function") && estModerateurHype(D && D.moi);
    var candsTous = Object.keys((D && D.candidats) || {}).map(function (k) { return D.candidats[k]; }).sort(function (a, b) { return (a.der < b.der ? 1 : a.der > b.der ? -1 : 0) || b.n - a.n; });
    var ySeuil = (saisons.length ? saisons[0] : (new Date()).getFullYear()) - 1;   /* saison en cours + la précédente */
    var seuil = ySeuil + "-09-01";
    var cands = gToutes ? candsTous : candsTous.filter(function (c) { return (c.der || "") >= seuil; });
    var titreG = function (txt) { return h("h3", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: 21, margin: "26px 0 6px", color: IVOIRE } }, txt); };
    var aide = function (txt) { return h("p", { style: { margin: "0 0 12px", fontSize: 12, lineHeight: 1.5, color: GRIS } }, txt); };
    var ligne = function (cle, gauche, droite) { return h("div", { key: cle, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: PETROLE, border: "1px solid rgba(201,166,107,0.16)", marginBottom: 6 } }, h("div", { style: { flex: 1, minWidth: 0, fontSize: 13 } }, gauche), droite); };
    var petitBt = function (cle, txt, fn) { return h("button", { key: cle, type: "button", className: "rv3-bt", disabled: !!gBusy, onClick: fn, style: { minHeight: 38, padding: "0 12px", fontSize: 11.5, opacity: gBusy && gBusy !== cle ? 0.5 : 1 } }, gBusy === cle ? "…" : txt); };
    /* résultats sans lien ayant au moins un rendez-vous plausible dans l agenda de l écurie, regroupés par concours */
    var aRelier = [];
    if (evtsClub && typeof hypeRdvCandidats === "function") {
      var vusR = {};
      tout.forEach(function (l) {
        if (l.b.agenda_id || !l.g) return;
        var c = hypeRdvCandidats(l.b, evtsClub, [D.clefClub]);
        if (!c.length) return;
        var e = vusR[l.g.cle] || (vusR[l.g.cle] = { g: l.g, ids: [], cands: c });
        e.ids.push(l.b.id);
      });
      aRelier = Object.keys(vusR).map(function (k) { return vusR[k]; }).sort(function (a, b) { return a.g.fin < b.g.fin ? 1 : -1; });
    }
    var cavComptes = (function () { var v = {}, o = []; tout.forEach(function (l) { if (l.uid && !v[l.uid]) { v[l.uid] = true; o.push(l); } }); return o.sort(function (a, b) { return a.b.cavalier < b.b.cavalier ? -1 : 1; }); })();
    return h("section", { className: "rv3-w rv3-sec", "aria-label": tg("gTitre") },
      h("div", { className: "rv3-tete" }, h("h2", { className: "rv3-h2" }, tg("gTitre")), h("button", { type: "button", className: "rv3-lien", onClick: function () { setVue("page"); setGMsg({ t: "", err: false }); } }, (rtl ? "→ " : "← ") + t("retourPage"))),
      gMsg.t ? h("div", { role: "status", style: { padding: "10px 12px", borderRadius: 10, marginBottom: 8, fontSize: 12.5, border: "1px solid " + (gMsg.err ? "rgba(255,120,120,0.45)" : "rgba(201,166,107,0.45)"), color: gMsg.err ? "#FFB4B4" : "#E9DCC0" } }, gMsg.t) : null,
      titreG(tg("gSans")), aide(tg("gSansAide")),
      D && D.tableCentrale === false ? aide(tg("gSql")) : null,
      cands.length ? cands.map(function (c) {
        return ligne("c" + c.nom, h("span", null, h("b", { style: { fontWeight: 600 } }, joliNom(c.nom)), h("span", { style: { color: GRIS, fontSize: 11.5 } }, " · " + c.n + " " + tn("nResultats", c.n) + (c.der ? " · " + fmtDate(c.der) : ""))),
          (D && D.tableCentrale) ? petitBt("a" + c.nom, tg("gRattacher"), function () { action("a" + c.nom, function () { return supa.from("club_cavaliers_ffe").insert({ club_clef: D.clefClub, nom: c.nom }).select("nom"); }); }) : null);
      }) : aide(tg("gRien")),
      (!gToutes && candsTous.length > cands.length) ? h("button", { type: "button", className: "rv3-lien", onClick: function () { setGToutes(true); } }, t("voirPlus") + " (" + (candsTous.length - cands.length) + ")") : null,
      (D && D.sansCompte && D.sansCompte.length) ? h("div", { style: { marginTop: 10 } }, h("div", { style: { fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: CHAMP, margin: "6px 0 8px" } }, tg("gDeja")),
        D.sansCompte.map(function (n) { return ligne("d" + n, joliNom(n), (D.tableCentrale) ? petitBt("r" + n, tg("gRetirer"), function () { action("r" + n, function () { return supa.from("club_cavaliers_ffe").delete().eq("club_clef", D.clefClub).eq("nom", n).select("nom"); }); }) : null); })) : null,
      titreG(tg("gRelier")), aide(tg("gRelierAide")),
      evtsClub === null ? aide(t("chargement")) : (aRelier.length ? aRelier.map(function (e) {
        return h("div", { key: "g" + e.g.cle, style: { padding: "12px", borderRadius: 10, background: PETROLE, border: "1px solid rgba(201,166,107,0.16)", marginBottom: 8 } },
          h("div", { style: { fontSize: 13, fontWeight: 600 } }, titreGroupe(e.g) + " · " + fmtPeriode(e.g.debAff, e.g.fin)),
          h("div", { style: { fontSize: 11.5, color: GRIS, margin: "2px 0 8px" } }, e.ids.length + " " + tn("nResultats", e.ids.length)),
          h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, e.cands.map(function (ev) {
            return petitBt("l" + e.g.cle + ev.id, tg("gRelierA") + " « " + (ev.titre || ev.lieu || "") + " » · " + fmtDate(ev.date_jour, true), function () {
              action("l" + e.g.cle + ev.id, function () { return (typeof hypeEcrireLienAgenda === "function") ? hypeEcrireLienAgenda(e.ids, ev.id, "manuel", function (q) { return q.is("agenda_id", null); }) : Promise.resolve({ error: "indisponible" }); });
            });
          })));
      }) : aide(tg("gRien"))),
      estMod ? h(React.Fragment, null, titreG(tg("gMaj")), aide(tg("gMajAide")),
        D && D.tableMaj === false ? aide(tg("gSql")) : null,
        cavComptes.map(function (l) {
          var dec = !!(D.declares && D.declares[l.uid]);
          var ok = !!(D.majeures && D.majeures[l.uid]) && !dec;
          if (dec) return ligne("m" + l.uid, joliNom(l.b.cavalier) || (l.profil && l.profil.pseudo) || "", h("span", { style: { fontSize: 11.5, color: CHAMP } }, tg("gDeclare")));
          return ligne("m" + l.uid, joliNom(l.b.cavalier) || (l.profil && l.profil.pseudo) || "", D.tableMaj === false ? null : h("label", { style: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: IVOIRE, cursor: "pointer" } },
            h("input", { type: "checkbox", checked: ok, disabled: !!gBusy, style: { width: 20, height: 20, accentColor: CHAMP }, onChange: function () {
              action("m" + l.uid, function () { return ok ? supa.from("majorites_verifiees").delete().eq("user_id", l.uid).select("user_id") : supa.from("majorites_verifiees").insert({ user_id: l.uid }).select("user_id"); });
            } }), tg("gMaj")));
        })) : null);
  }

  var corps;
  if (etat === "chargement") corps = message(t("chargement"), false);
  else if (etat === "panne") corps = message(t("panne"), false);
  else if (vue === "gestion" && peutImp && D) corps = vueGestion();
  else if (etat === "vide" || !tout.length) corps = message(t("vide"), true);
  else if (vue === "gestion" && peutImp) corps = vueGestion();
  else if (vue === "tous") corps = vueTous();
  else corps = h(React.Fragment, null,
    secCav,
    h("div", { style: { marginTop: 4 } },
      h("div", { className: "rv3-w rv3-duo" }, secDernier || h("div"), secChiffres)),
    h("div", { className: "rv3-w rv3-duo", style: { paddingBottom: 18 } }, secConcours || h("div"), secChevaux),
    secMoments ? h("div", null, secMoments) : null,
    null);

  return h("div", { className: "rv3", dir: rtl ? "rtl" : "ltr" },
    h("style", null, CSS),
    hero, barreFiltres, corps);
}
window.HypeResultatsEcurie = { ResultatsEcurie: EcranResultatsEcurie };
})();
