/* HYPE ▸ 04/11/2026 — CENTRE DE COMPÉTITION, ÉTAPE 1 : la page « MA SAISON » (EcranMaSaison).
   Demande de Blandine (04/11, 15 h 54) : « Mets en ligne la première page. La page la saison tu peux déjà. »
   Design : en-tête EXACT de la Vidéothèque (hype-video.js, heroDe + courbe) — courbe c1 en haut, photo masquée
   en dégradé, courbe c2 avec tout le noir sous le trait, titre Cormorant aligné à droite, sous-titre italique.
   Trois couleurs seulement : noir #070A08, ivoire #F3EEE4, champagne #C9A66B (+ #101A1D en dégradés).
   DONNÉES, toutes réelles, rien d'inventé :
     · les concours (club_agenda, type « concours ») des clubs de la personne (profil : ecurie et ecurie2),
       depuis le 1er septembre de la saison en cours ;
     · le nombre de cavalières inscrites (agenda_inscriptions), et « Tu es inscrite » quand c'est son cas.
     Si une lecture échoue, la page le dit ; elle ne casse rien d'autre.
   PHOTOS : en-tête = le cheval bai tressé de Blandine (images/concours-hero-bai-tresse.webp). Chaque concours
   reçoit une photo de la série « cheval sur fond noir » (la sienne + les héros des Galops), en rotation dans
   l'ordre des dates : deux concours qui se suivent n'ont jamais la même.
   OUVERTURE : un concours à venir ou en cours ouvre sa fiche d'agenda (même porte que la page Team) et la
   fermeture revient ici ; un concours terminé ouvre sa page souvenirs (evenement-passe).
   Textes en français seulement : traduction quand le français sera relu (règle de Blandine).
   Accès : 2hype.fr/#saison, et le lien « Ma saison » sous l'agenda de la page Team. */
(function () {
/* 04/11 23h10 (Blandine « 3 oui ok ») — TRADUCTIONS de « Ma saison » et de la « Liste du van » (13 langues ; le français reste la clé).
   Ordre : en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko. Les autres pages du Centre de compétition restent en français pour l'instant. */
var HS_LG = ["en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
var HS_TR_BRUT = {
  "Pas de connexion.": ["No connection.", "Sin conexión.", "Nessuna connessione.", "接続できません。", "Keine Verbindung.", "لا يوجد اتصال.", "没有网络连接。", "Geen verbinding.", "Sem conexão.", "Ingen anslutning.", "Нет соединения.", "Brak połączenia.", "연결이 안 돼요."],
  "l’équipe": ["the team", "el equipo", "la squadra", "チーム", "das Team", "الفريق", "团队", "het team", "a equipe", "laget", "команда", "drużyna", "팀"],
  "demain": ["tomorrow", "mañana", "domani", "明日", "morgen", "غدا", "明天", "morgen", "amanhã", "i morgon", "завтра", "jutro", "내일"],
  "dans ": ["in ", "en ", "tra ", "あと", "in ", "بعد ", "还有", "over ", "em ", "om ", "через ", "za ", ""],
  "en cours": ["ongoing", "en curso", "in corso", "開催中", "läuft", "جار", "进行中", "bezig", "em andamento", "pågår", "идёт", "trwa", "진행 중"],
  "Retour": ["Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"],
  "Ma saison": ["My season", "Mi temporada", "La mia stagione", "わたしのシーズン", "Meine Saison", "موسمي", "我的赛季", "Mijn seizoen", "Minha temporada", "Min säsong", "Мой сезон", "Mój sezon", "나의 시즌"],
  "L’équipe": ["The team", "El equipo", "La squadra", "チーム", "Das Team", "الفريق", "团队", "Het team", "A equipe", "Laget", "Команда", "Drużyna", "팀"],
  ", saison ": [", season ", ", temporada ", ", stagione ", "・シーズン ", ", Saison ", "، موسم ", "，赛季 ", ", seizoen ", ", temporada ", ", säsong ", ", сезон ", ", sezon ", ", 시즌 "],
  " cavalières": [" riders", " jinetes", " cavaliere", "人のライダー", " Reiterinnen", " فارسات", " 位骑手", " ruiters", " cavaleiras", " ryttare", " всадницы", " amazonki", "명의 라이더"],
  " cavalière": [" rider", " jinete", " cavaliera", "人のライダー", " Reiterin", " فارسة", " 位骑手", " ruiter", " cavaleira", " ryttare", " всадница", " amazonka", "명의 라이더"],
  "À engager": ["To enter", "Por inscribir", "Da iscrivere", "エントリー前", "Zu nennen", "للتسجيل", "待报名", "In te schrijven", "A inscrever", "Att anmäla", "Записать", "Do zgłoszenia", "출전 신청 전"],
  "Stage": ["Clinic", "Cursillo", "Stage", "講習会", "Lehrgang", "تدريب", "集训", "Clinic", "Estágio", "Kurs", "Сбор", "Obóz", "캠프"],
  "Concours": ["Show", "Concurso", "Concorso", "競技会", "Turnier", "مسابقة", "比赛", "Wedstrijd", "Concurso", "Tävling", "Соревнования", "Zawody", "대회"],
  "Tu es inscrite": ["You’re entered", "Estás inscrita", "Sei iscritta", "エントリー済み", "Du bist dabei", "أنت مسجلة", "你已报名", "Je bent ingeschreven", "Você está inscrita", "Du är anmäld", "Ты записана", "Jesteś zapisana", "신청 완료"],
  "À venir": ["Upcoming", "Próximos", "In arrivo", "これから", "Demnächst", "قادمة", "即将到来", "Komend", "Próximos", "Kommande", "Скоро", "Nadchodzące", "예정"],
  "En cours": ["Ongoing", "En curso", "In corso", "開催中", "Laufend", "جارية", "进行中", "Bezig", "Em andamento", "Pågår", "Идут", "Trwają", "진행 중"],
  "Terminés": ["Finished", "Terminados", "Conclusi", "終了", "Beendet", "منتهية", "已结束", "Afgelopen", "Encerrados", "Avslutade", "Завершены", "Zakończone", "종료"],
  "Prochains rendez-vous": ["Next events", "Próximas citas", "Prossimi appuntamenti", "次の予定", "Nächste Termine", "المواعيد القادمة", "接下来的活动", "Volgende afspraken", "Próximos encontros", "Kommande händelser", "Ближайшие события", "Najbliższe wydarzenia", "다가오는 일정"],
  "En ce moment": ["Right now", "Ahora mismo", "In questo momento", "いま", "Gerade jetzt", "الآن", "此刻", "Op dit moment", "Agora", "Just nu", "Сейчас", "Teraz", "지금"],
  "Rendez-vous terminés": ["Past events", "Citas terminadas", "Appuntamenti conclusi", "終わった予定", "Vergangene Termine", "مواعيد منتهية", "已结束的活动", "Afgelopen afspraken", "Encontros encerrados", "Avslutade händelser", "Прошедшие события", "Zakończone wydarzenia", "지난 일정"],
  "Rien de prévu pour l’équipe pour l’instant.": ["Nothing planned for the team yet.", "Nada previsto para el equipo por ahora.", "Niente in programma per la squadra per ora.", "チームの予定はまだありません。", "Für das Team ist noch nichts geplant.", "لا شيء مخطط للفريق حاليا.", "团队暂时没有安排。", "Nog niets gepland voor het team.", "Nada previsto para a equipe por enquanto.", "Inget planerat för laget än.", "Для команды пока ничего не запланировано.", "Na razie nic nie zaplanowano dla drużyny.", "아직 팀 일정이 없어요."],
  "Rien en ce moment.": ["Nothing right now.", "Nada ahora mismo.", "Niente in questo momento.", "いまは何もありません。", "Gerade nichts.", "لا شيء الآن.", "此刻没有活动。", "Op dit moment niets.", "Nada agora.", "Inget just nu.", "Сейчас ничего нет.", "Teraz nic.", "지금은 없어요."],
  "Rien de terminé cette saison.": ["Nothing finished this season.", "Nada terminado esta temporada.", "Niente di concluso in questa stagione.", "今シーズン終わった予定はありません。", "Diese Saison ist noch nichts beendet.", "لا شيء منتهيا هذا الموسم.", "本赛季还没有结束的活动。", "Dit seizoen nog niets afgelopen.", "Nada encerrado nesta temporada.", "Inget avslutat den här säsongen.", "В этом сезоне ещё ничего не завершено.", "W tym sezonie nic się jeszcze nie zakończyło.", "이번 시즌에 끝난 일정이 없어요."],
  "Aucune équipe compétition pour l’instant.": ["No competition team yet.", "Todavía no hay equipo de competición.", "Ancora nessuna squadra agonistica.", "競技チームはまだありません。", "Noch kein Turnierteam.", "لا يوجد فريق منافسات حاليا.", "暂时没有比赛团队。", "Nog geen wedstrijdteam.", "Ainda não há equipe de competição.", "Inget tävlingslag än.", "Пока нет соревновательной команды.", "Na razie brak drużyny zawodniczej.", "아직 대회 팀이 없어요."],
  "Le carnet": ["The logbook", "El cuaderno", "Il diario", "記録帳", "Das Tagebuch", "الدفتر", "记录本", "Het logboek", "O caderno", "Loggboken", "Дневник", "Dziennik", "기록장"],
  "Tout voir": ["See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles zien", "Ver tudo", "Visa alla", "Смотреть всё", "Zobacz wszystko", "전체 보기"],
  "Une partie n’a pas pu se charger : ": ["Part of the page couldn’t load: ", "Una parte no se pudo cargar: ", "Una parte non si è caricata: ", "一部を読み込めませんでした：", "Ein Teil konnte nicht geladen werden: ", "تعذر تحميل جزء: ", "部分内容无法加载：", "Een deel kon niet laden: ", "Uma parte não carregou: ", "En del kunde inte laddas: ", "Часть не загрузилась: ", "Część nie została wczytana: ", "일부를 불러오지 못했어요: "],
  "concours introuvable": ["show not found", "concurso no encontrado", "concorso non trovato", "競技会が見つかりません", "Turnier nicht gefunden", "المسابقة غير موجودة", "找不到比赛", "wedstrijd niet gevonden", "concurso não encontrado", "tävlingen hittades inte", "соревнования не найдены", "nie znaleziono zawodów", "대회를 찾을 수 없어요"],
  "refusé par la base": ["refused by the database", "rechazado por la base", "rifiutato dal database", "データベースに拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekad av databasen", "отклонено базой", "odrzucone przez bazę", "데이터베이스가 거부했어요"],
  "Pas enregistré : ": ["Not saved: ", "No guardado: ", "Non salvato: ", "保存できませんでした：", "Nicht gespeichert: ", "لم يتم الحفظ: ", "未保存：", "Niet opgeslagen: ", "Não salvo: ", "Inte sparat: ", "Не сохранено: ", "Nie zapisano: ", "저장 안 됨: "],
  "Liste du van": ["Trailer checklist", "Lista del camión", "Lista del van", "馬運車リスト", "Hängerliste", "قائمة الشاحنة", "马车清单", "Trailerlijst", "Lista do caminhão", "Transportlista", "Список в коневоз", "Lista do przyczepy", "트레일러 체크리스트"],
  " sur ": [" of ", " de ", " su ", " / ", " von ", " من ", " / ", " van ", " de ", " av ", " из ", " z ", " / "],
  " cochés.": [" ticked.", " marcados.", " spuntati.", " チェック済み。", " abgehakt.", " محددة.", " 已勾选。", " aangevinkt.", " marcados.", " avbockade.", " отмечено.", " zaznaczonych.", " 체크했어요."],
  "Connecte-toi pour avoir ta liste.": ["Log in to get your list.", "Inicia sesión para tener tu lista.", "Accedi per avere la tua lista.", "ログインするとリストが使えます。", "Melde dich an, um deine Liste zu haben.", "سجل الدخول لتحصل على قائمتك.", "登录后即可使用你的清单。", "Log in om je lijst te krijgen.", "Entre para ter sua lista.", "Logga in för att få din lista.", "Войди, чтобы получить свой список.", "Zaloguj się, aby mieć swoją listę.", "로그인하면 리스트를 쓸 수 있어요."],
  "Retirer ": ["Remove ", "Quitar ", "Togli ", "削除：", "Entfernen: ", "إزالة ", "移除 ", "Verwijder ", "Remover ", "Ta bort ", "Убрать ", "Usuń ", "삭제: "],
  "Ajouter une ligne": ["Add a line", "Añadir una línea", "Aggiungi una riga", "項目を追加", "Zeile hinzufügen", "أضف سطرا", "添加一行", "Regel toevoegen", "Adicionar uma linha", "Lägg till en rad", "Добавить строку", "Dodaj pozycję", "항목 추가"],
  "Son matériel à lui": ["His own gear", "Su propio material", "La sua attrezzatura", "この馬専用の馬具", "Seine eigene Ausrüstung", "معداته الخاصة", "它的专属装备", "Zijn eigen spullen", "O material dele", "Hans egen utrustning", "Его снаряжение", "Jego własny sprzęt", "이 말만의 장비"],
  "ton cheval": ["your horse", "tu caballo", "il tuo cavallo", "あなたの馬", "dein Pferd", "حصانك", "你的马", "je paard", "seu cavalo", "din häst", "твоя лошадь", "twój koń", "너의 말"],
  "Pour le cheval": ["For the horse", "Para el caballo", "Per il cavallo", "馬のために", "Für das Pferd", "للحصان", "给马的", "Voor het paard", "Para o cavalo", "För hästen", "Для лошади", "Dla konia", "말을 위해"],
  "Pour toi": ["For you", "Para ti", "Per te", "あなたのために", "Für dich", "لك", "给你的", "Voor jou", "Para você", "För dig", "Для тебя", "Dla ciebie", "너를 위해"],
  "ta tenue, ta sécurité": ["your outfit, your safety", "tu ropa, tu seguridad", "il tuo abbigliamento, la tua sicurezza", "服装と安全装備", "deine Kleidung, deine Sicherheit", "لباسك وسلامتك", "你的着装和安全", "je kleding, je veiligheid", "sua roupa, sua segurança", "din klädsel, din säkerhet", "твоя одежда, твоя безопасность", "twój strój, twoje bezpieczeństwo", "복장과 안전"],
  "Terminé": ["Done", "Listo", "Fatto", "完了", "Fertig", "تم", "完成", "Klaar", "Pronto", "Klar", "Готово", "Gotowe", "완료"],
  "Modifier": ["Edit", "Editar", "Modifica", "編集", "Bearbeiten", "تعديل", "编辑", "Bewerken", "Editar", "Redigera", "Изменить", "Edytuj", "수정"],
  "Prêt": ["Ready", "Listo", "Pronto", "準備完了", "Bereit", "جاهز", "准备好了", "Klaar", "Pronto", "Redo", "Готово", "Gotowe", "준비 완료"],
  "Ta liste": ["Your list", "Tu lista", "La tua lista", "あなたのリスト", "Deine Liste", "قائمتك", "你的清单", "Jouw lijst", "Sua lista", "Din lista", "Твой список", "Twoja lista", "너의 리스트"],
  "de sa fiche": ["from his profile", "de su ficha", "dalla sua scheda", "馬のページから", "aus seinem Steckbrief", "من بطاقته", "来自它的档案", "van zijn fiche", "da ficha dele", "från hans sida", "из его карточки", "z jego karty", "말 페이지에서"],
  "objets": ["items", "objetos", "oggetti", "点", "Dinge", "أغراض", "件", "spullen", "itens", "saker", "вещей", "rzeczy", "개"],
  "Pour ": ["For ", "Para ", "Per ", "", "Für ", "لـ ", "给", "Voor ", "Para ", "För ", "Для ", "Dla ", ""],
  "le cheval": ["the horse", "el caballo", "il cavallo", "馬", "das Pferd", "الحصان", "马", "het paard", "o cavalo", "hästen", "лошади", "konia", "말"],
  "Pour moi": ["For me", "Para mí", "Per me", "わたし用", "Für mich", "لي", "给我的", "Voor mij", "Para mim", "För mig", "Для меня", "Dla mnie", "나를 위해"],
  "Télécharger": ["Download", "Descargar", "Scarica", "ダウンロード", "Herunterladen", "تنزيل", "下载", "Downloaden", "Baixar", "Ladda ner", "Скачать", "Pobierz", "다운로드"],
  "Tout décocher": ["Untick all", "Desmarcar todo", "Togli tutte le spunte", "すべて外す", "Alle abwählen", "إلغاء تحديد الكل", "全部取消勾选", "Alles uitvinken", "Desmarcar tudo", "Avmarkera alla", "Снять все отметки", "Odznacz wszystko", "모두 해제"],
  "Ta liste n’est visible que par toi. Au prochain concours, elle repart de celle-ci, cases décochées.": ["Only you can see your list. At the next show, it starts again from this one, with the boxes unticked.", "Solo tú ves tu lista. En el próximo concurso, empieza de nuevo desde esta, sin marcar.", "La tua lista la vedi solo tu. Al prossimo concorso riparte da questa, senza spunte.", "リストはあなただけに見えます。次の競技会では、このリストがチェックなしで引き継がれます。", "Nur du siehst deine Liste. Beim nächsten Turnier startet sie wieder von dieser, ohne Haken.", "قائمتك لا يراها غيرك. في المسابقة القادمة تبدأ من هذه القائمة دون تحديد.", "你的清单只有你能看到。下一场比赛时，它会从这份清单重新开始，勾选全部清空。", "Alleen jij ziet je lijst. Bij de volgende wedstrijd begint hij opnieuw vanaf deze, zonder vinkjes.", "Só você vê sua lista. No próximo concurso, ela recomeça desta, sem marcações.", "Bara du ser din lista. Vid nästa tävling börjar den om från den här, utan bockar.", "Твой список видишь только ты. На следующих соревнованиях он начнётся с этого, без отметок.", "Twoją listę widzisz tylko ty. Na kolejnych zawodach zacznie się od tej, bez zaznaczeń.", "리스트는 너만 볼 수 있어요. 다음 대회에서는 이 리스트가 체크 없이 다시 시작돼요."],
  " j": [" d", " d", " g", "日", " T.", " يوم", "天", " d", " d", " d", " дн.", " dni", "일"],
  "Du ": ["From ", "Del ", "Dal ", "", "Vom ", "من ", "", "Van ", "De ", "Från ", "С ", "Od ", ""],
  " au ": [" to ", " al ", " al ", "〜", " bis ", " إلى ", "至", " tot ", " a ", " till ", " по ", " do ", "~"],
  /* la liste de départ (écrite dans la langue de la cavalière à la création de sa liste) */
  "Selle et tapis": ["Saddle and pad", "Silla y sudadero", "Sella e sottosella", "鞍とゼッケン", "Sattel und Schabracke", "السرج واللباد", "马鞍和鞍垫", "Zadel en dekje", "Sela e manta", "Sadel och schabrak", "Седло и вальтрап", "Siodło i czaprak", "안장과 패드"],
  "Filet ou bride": ["Snaffle bridle or double bridle", "Filete o brida", "Filetto o briglia", "水勒または大勒", "Trense oder Kandare", "اللجام البسيط أو المزدوج", "水勒或大勒", "Trens of stang", "Bridão ou freio", "Träns eller kandar", "Трензель или мундштук", "Ogłowie wędzidłowe lub munsztuk", "스내플 또는 더블 브라이들"],
  "Sangle bavette": ["Stud girth", "Cincha con protector", "Sottopancia con pettorina", "腹帯（フロントガード付き）", "Stollengurt", "حزام بواقي البطن", "护腹肚带", "Stollensingel", "Cilha com protetor", "Stollgjord", "Подпруга с защитой", "Popręg z osłoną", "보호대 달린 복대"],
  "Guêtres ou bandes de polo, protège-boulets": ["Boots or polo wraps, fetlock boots", "Protectores o vendas, protectores de menudillo", "Stinchiere o fasce, paranocche", "ブーツまたはバンテージ、球節ブーツ", "Gamaschen oder Bandagen, Streichkappen", "واقيات أو أربطة، واقيات الرمانة", "护腿或绷带、球节护具", "Beenbeschermers of bandages, kogelbeschermers", "Caneleiras ou ligas, protetores de boleto", "Benskydd eller lindor, kotskydd", "Ногавки или бинты, накопытники", "Ochraniacze lub bandaże, ochraniacze pęcinowe", "부츠 또는 폴로 랩, 구절 부츠"],
  "Enrênement si le cheval en a": ["Training aid if the horse uses one", "Riendas auxiliares si el caballo las lleva", "Redini ausiliarie se il cavallo le usa", "補助手綱（使う馬なら）", "Hilfszügel, falls das Pferd welche hat", "الأعنة المساعدة إن كان الحصان يستعملها", "辅助缰（如果马使用）", "Hulpteugels als het paard die heeft", "Rédeas auxiliares se o cavalo usa", "Hjälptyglar om hästen har", "Вспомогательный повод, если есть", "Wypinacze, jeśli koń ich używa", "보조 고삐(사용하는 말이면)"],
  "Amortisseur pour le dos": ["Back pad (shock absorber)", "Amortiguador para el dorso", "Ammortizzatore per il dorso", "背中のショック吸収パッド", "Rückenpad (Dämpfer)", "واقي امتصاص للظهر", "背部减震垫", "Rugpad (schokdemper)", "Amortecedor para o dorso", "Ryggskydd (stötdämpare)", "Амортизатор для спины", "Podkładka amortyzująca", "등 쿠션 패드"],
  "Protections de transport": ["Travel boots", "Protectores de transporte", "Protezioni da trasporto", "輸送用プロテクター", "Transportgamaschen", "واقيات النقل", "运输护具", "Transportbeschermers", "Protetores de transporte", "Transportskydd", "Транспортировочные ногавки", "Ochraniacze transportowe", "운송용 보호대"],
  "Licol et longe": ["Headcollar and lead rope", "Cabezada de cuadra y ramal", "Capezza e lunghina", "無口と引き手", "Halfter und Strick", "الرسن والحبل", "笼头和牵绳", "Halster en touw", "Cabresto e guia", "Grimma och grimskaft", "Недоуздок и чумбур", "Kantar i uwiąz", "굴레와 리드줄"],
  "Couverture": ["Rug", "Manta", "Coperta", "馬着", "Decke", "الغطاء", "马衣", "Deken", "Capa", "Täcke", "Попона", "Derka", "담요"],
  "Seau, foin et eau": ["Bucket, hay and water", "Cubo, heno y agua", "Secchio, fieno e acqua", "バケツ、干し草、水", "Eimer, Heu und Wasser", "دلو وتبن وماء", "水桶、干草和水", "Emmer, hooi en water", "Balde, feno e água", "Hink, hö och vatten", "Ведро, сено и вода", "Wiadro, siano i woda", "양동이, 건초, 물"],
  "Nourriture si concours prolongé à l’extérieur": ["Feed if the show runs long away from home", "Comida si el concurso se alarga fuera", "Cibo se il concorso dura a lungo fuori", "遠征が長引くときの飼料", "Futter, falls das Turnier auswärts länger dauert", "علف إذا طالت المسابقة خارجا", "比赛在外时间长时带上饲料", "Voer als de wedstrijd buiten lang duurt", "Comida se o concurso fora se prolongar", "Foder om tävlingen borta drar ut", "Корм, если соревнования на выезде затянутся", "Pasza, jeśli zawody wyjazdowe się przedłużą", "원정 대회가 길어질 때 사료"],
  "Trousse de pansage": ["Grooming kit", "Kit de limpieza", "Kit di grooming", "手入れ道具", "Putzzeug", "عدة التنظيف", "刷拭工具包", "Poetsdoos", "Kit de limpeza", "Ryktlåda", "Набор для чистки", "Zestaw do czyszczenia", "그루밍 키트"],
  "Élastiques pour natter et ciseaux": ["Plaiting bands and scissors", "Gomas para trenzar y tijeras", "Elastici per intrecciare e forbici", "編み込み用ゴムとハサミ", "Einflechtgummis und Schere", "أربطة الضفائر ومقص", "编辫皮筋和剪刀", "Vlechtelastiekjes en schaar", "Elásticos para trançar e tesoura", "Flätsnoddar och sax", "Резинки для косичек и ножницы", "Gumki do zaplatania i nożyczki", "땋기용 고무줄과 가위"],
  "Tendonyl ou équivalent post compétition à mettre sur les membres": ["Tendonyl or a similar post-competition leg product", "Tendonyl o equivalente post competición para las extremidades", "Tendonyl o equivalente post gara da mettere sugli arti", "競技後に脚に使うテンドニルなど", "Tendonyl oder Ähnliches für die Beine nach dem Turnier", "تندونيل أو ما يعادله للأطراف بعد المسابقة", "赛后腿部护理用品（如 Tendonyl）", "Tendonyl of iets dergelijks voor de benen na de wedstrijd", "Tendonyl ou equivalente pós-competição para os membros", "Tendonyl eller liknande för benen efter tävlingen", "Тендонил или аналог для ног после старта", "Tendonyl lub podobny preparat na nogi po zawodach", "대회 후 다리에 바르는 텐도닐 등"],
  "Stable boots pour le repos après compétition": ["Stable boots for resting after the show", "Protectores de cuadra para el descanso tras el concurso", "Stable boots per il riposo dopo la gara", "競技後の休息用ステーブルブーツ", "Stallgamaschen für die Ruhe nach dem Turnier", "واقيات الإسطبل للراحة بعد المسابقة", "赛后休息用的马厩护腿", "Stalbeschermers voor de rust na de wedstrijd", "Protetores de baia para o descanso após o concurso", "Stallskydd för vila efter tävlingen", "Денниковые ногавки для отдыха после старта", "Ochraniacze stajenne na odpoczynek po zawodach", "대회 후 휴식용 마구간 부츠"],
  "Livret du cheval (vaccins)": ["Horse passport (vaccinations)", "Libro del caballo (vacunas)", "Libretto del cavallo (vaccini)", "馬のパスポート（ワクチン）", "Pferdepass (Impfungen)", "جواز الحصان (اللقاحات)", "马匹护照（疫苗）", "Paardenpaspoort (vaccinaties)", "Passaporte do cavalo (vacinas)", "Hästpass (vaccinationer)", "Паспорт лошади (прививки)", "Paszport konia (szczepienia)", "말 여권(백신)"],
  "Casque": ["Helmet", "Casco", "Casco", "ヘルメット", "Helm", "الخوذة", "头盔", "Cap", "Capacete", "Hjälm", "Шлем", "Kask", "헬멧"],
  "Veste de concours": ["Show jacket", "Chaqueta de concurso", "Giacca da concorso", "競技用ジャケット", "Turnierjacket", "سترة المسابقة", "比赛外套", "Wedstrijdjasje", "Casaca de concurso", "Tävlingskavaj", "Соревновательный пиджак", "Frak konkursowy", "대회 재킷"],
  "Culotte claire": ["Light-coloured breeches", "Pantalón claro", "Pantaloni chiari", "白っぽいキュロット", "Helle Reithose", "سروال فاتح", "浅色马裤", "Lichte rijbroek", "Culote claro", "Ljusa ridbyxor", "Светлые бриджи", "Jasne bryczesy", "밝은 승마 바지"],
  "Bottes": ["Boots", "Botas", "Stivali", "ブーツ", "Stiefel", "الأحذية", "马靴", "Laarzen", "Botas", "Stövlar", "Сапоги", "Oficerki", "부츠"],
  "Gants": ["Gloves", "Guantes", "Guanti", "手袋", "Handschuhe", "القفازات", "手套", "Handschoenen", "Luvas", "Handskar", "Перчатки", "Rękawiczki", "장갑"],
  "Cravache": ["Whip", "Fusta", "Frustino", "鞭", "Gerte", "السوط", "马鞭", "Zweep", "Chicote", "Spö", "Хлыст", "Palcat", "채찍"],
  "Éperons": ["Spurs", "Espuelas", "Speroni", "拍車", "Sporen", "المهاميز", "马刺", "Sporen", "Esporas", "Sporrar", "Шпоры", "Ostrogi", "박차"],
  "Airbag": ["Air vest", "Chaleco airbag", "Gilet airbag", "エアバッグベスト", "Airbagweste", "سترة الوسادة الهوائية", "气囊背心", "Airbagvest", "Colete airbag", "Airbagväst", "Подушка безопасности", "Kamizelka airbag", "에어백 조끼"],
  "Cartouche de recharge et / ou protection dorsale": ["Spare cartridge and/or back protector", "Cartucho de recarga y/o protector dorsal", "Cartuccia di ricarica e/o paraschiena", "予備カートリッジ／背中プロテクター", "Ersatzkartusche und/oder Rückenprotektor", "خرطوشة احتياطية و/أو واقي الظهر", "备用气瓶和/或护背", "Reservepatroon en/of rugbeschermer", "Cartucho de recarga e/ou protetor de costas", "Reservpatron och/eller ryggskydd", "Запасной баллон и/или защита спины", "Zapasowy nabój i/lub ochraniacz pleców", "예비 카트리지 및/또는 등 보호대"],
  "Matériel pour changer la cartouche": ["Tools to change the cartridge", "Material para cambiar el cartucho", "Attrezzo per cambiare la cartuccia", "カートリッジ交換用の道具", "Werkzeug zum Kartuschenwechsel", "أدوات تغيير الخرطوشة", "更换气瓶的工具", "Materiaal om de patroon te vervangen", "Material para trocar o cartucho", "Verktyg för att byta patron", "Инструмент для замены баллона", "Narzędzia do wymiany naboju", "카트리지 교체 도구"],
  "Manteau ou veste imperméable": ["Raincoat or waterproof jacket", "Abrigo o chaqueta impermeable", "Cappotto o giacca impermeabile", "レインコートか防水ジャケット", "Regenmantel oder wasserdichte Jacke", "معطف أو سترة واقية من المطر", "雨衣或防水外套", "Regenjas of waterdichte jas", "Casaco ou jaqueta impermeável", "Regnrock eller vattentät jacka", "Плащ или непромокаемая куртка", "Płaszcz lub kurtka przeciwdeszczowa", "우비 또는 방수 재킷"],
  "Affaires de rechange en cas de pluie": ["Spare clothes in case of rain", "Ropa de recambio por si llueve", "Cambio di vestiti in caso di pioggia", "雨の日の着替え", "Wechselkleidung bei Regen", "ملابس احتياطية في حال المطر", "下雨时的替换衣物", "Reservekleren voor als het regent", "Roupas extras em caso de chuva", "Ombyte ifall det regnar", "Сменная одежда на случай дождя", "Ubrania na zmianę na wypadek deszczu", "비 올 때 갈아입을 옷"],
  "Licence sur le téléphone": ["Licence on your phone", "Licencia en el móvil", "Patente sul telefono", "スマホにライセンス", "Lizenz auf dem Handy", "الرخصة على الهاتف", "手机里的执照", "Licentie op je telefoon", "Licença no celular", "Licens i mobilen", "Лицензия в телефоне", "Licencja w telefonie", "휴대폰 속 라이선스"],
  "Eau et goûter": ["Water and a snack", "Agua y merienda", "Acqua e merenda", "水とおやつ", "Wasser und Snack", "ماء ووجبة خفيفة", "水和点心", "Water en een tussendoortje", "Água e lanche", "Vatten och mellanmål", "Вода и перекус", "Woda i przekąska", "물과 간식"]
};
var HS_TR = {};
Object.keys(HS_TR_BRUT).forEach(function (fr) { var o = {}; HS_LG.forEach(function (l, i) { o[l] = HS_TR_BRUT[fr][i]; }); HS_TR[fr] = o; });
/* F(fr) des écrans : le texte dans la langue de l'appli quand on l'a, sinon le français (« || o.en » de tr ne doit pas jouer : on ne met que fr + les langues connues) */
function hsT(tr, fr, lg) { var t = HS_TR[fr]; if (!t) return tr({ fr: fr }); if (lg && t[lg] === "") return ""; return tr(Object.assign({ fr: fr }, t)); }   /* "" = rien à écrire dans cette langue (ex. « Du » en japonais) */

var PHOTOS_SAISON = [
  { img: "images/concours-hero-bai-tresse.webp", pos: "70% 30%" },
  { img: "images/galop1-hero-bai.webp", pos: "60% 35%" },
  { img: "images/galop6-hero-gris.webp", pos: "60% 35%" },
  { img: "images/galop2-hero-bai-entier.webp", pos: "60% 35%" },
  { img: "images/galop7-hero-palomino.webp", pos: "60% 35%" },
  { img: "images/galop5-emb-hero-v2.webp", pos: "60% 35%" },
  { img: "images/galop9-hero-alezan.webp", pos: "60% 35%" },
  { img: "images/galop8-hero-bai.webp", pos: "60% 35%" }
];

var CSS_ID = "hype-saison-css-1";
var CSS = [
  ".hs{--hs-noir:#070A08;--hs-iv:#F3EEE4;--hs-iv2:rgba(243,238,228,.64);--hs-iv3:rgba(243,238,228,.42);--hs-ch:#C9A66B;background:var(--hs-noir);color:var(--hs-iv);font-family:'Montserrat',system-ui,sans-serif;min-height:100vh;padding-bottom:40px;overflow-x:clip;position:relative}",
  ".hs *{box-sizing:border-box}.hs button{font-family:inherit;color:inherit;-webkit-tap-highlight-color:transparent;cursor:pointer}",
  ".hs-in{max-width:1240px;margin:0 auto;padding:0 18px}",
  /* en-tête : copie exacte de la Vidéothèque */
  ".hs-langue{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:14px}",
  ".hs-hero{position:relative;padding-top:calc(env(safe-area-inset-top) + 14px)}",
  ".hs-photo{position:relative;height:clamp(300px,92vw,430px);margin-top:-30px;overflow:hidden;background:#0B0F0E}",
  ".hs-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--hs-pos,center);filter:saturate(.92) contrast(1.05) brightness(.95) sepia(.07)}",
  ".hs-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);mask-composite:intersect}",
  "[dir=rtl] .hs-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(270deg,transparent 0,#000 12%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(270deg,transparent 0,#000 12%,#000 100%)}",
  ".hs-courbe{position:absolute;left:0;right:0;width:100%;height:70px;pointer-events:none;z-index:2}",
  ".hs-courbe.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}",
  ".hs-courbe.c2{position:relative;display:block;height:64px;margin-top:-64px}",
  "[dir=rtl] .hs-courbe{transform:scaleX(-1)}",
  ".hs-hero-retour{position:relative;z-index:4;margin-top:2px}",
  ".hs-retour{display:flex;align-items:center;gap:10px;background:none;border:none;padding:12px 2px;min-height:44px;font-size:14px;color:var(--hs-iv);letter-spacing:.02em}",
  ".hs-retour i{font-style:normal;color:var(--hs-ch);font-size:22px;line-height:1}[dir=rtl] .hs-retour i{transform:scaleX(-1)}",
  ".hs-titre{text-align:end;margin-top:-12px;position:relative;z-index:3}",
  ".hs-titre h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(44px,12vw,64px);line-height:1;margin:0;color:var(--hs-iv);letter-spacing:.005em}",
  ".hs-titre p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(17px,4.6vw,21px);margin:8px 0 0;color:var(--hs-iv);opacity:.88}",
  /* pastilles en verre fumé */
  ".hs-pills{display:flex;gap:8px;margin-top:34px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.hs-pills::-webkit-scrollbar{display:none}",
  ".hs-pl{flex:0 0 auto;min-height:36px;padding:0 15px;border-radius:999px;font-size:12px;letter-spacing:.02em;white-space:nowrap;background:linear-gradient(180deg,rgba(28,34,38,.85),rgba(12,16,18,.85));border:1px solid rgba(243,238,228,.08);box-shadow:0 2px 6px rgba(0,0,0,.35);color:var(--hs-iv2)}",
  ".hs-pl.on{border-color:rgba(201,166,107,.7);color:var(--hs-iv)}",
  /* rubriques */
  ".hs-sec{display:flex;align-items:center;justify-content:space-between;margin:42px 0 16px}",   /* 04/11 22h51 (Blandine : « aéré entre les titres ») : 26/12 → 42/16 */
  ".hs-sec b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:21px;border-inline-start:1.5px solid var(--hs-ch);padding-inline-start:10px;line-height:1.05}",
  ".hs-sec span{font-size:11.5px;color:var(--hs-iv2)}",
  /* cartes concours */
  ".hs-cd{display:flex;width:100%;text-align:start;padding:0;margin:0 0 8px;border:1px solid rgba(243,238,228,.12);border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#0d1416,#070A08 70%);min-height:86px}",
  ".hs-cd:active{transform:scale(.985)}",
  ".hs-im{width:122px;flex:0 0 122px;background-size:cover;background-position:center;position:relative;background-color:#0B0F0E}",
  ".hs-bd{position:absolute;inset-inline-end:5px;bottom:5px;background:rgba(0,0,0,.75);border-radius:5px;padding:1px 6px;font-size:10.5px;color:var(--hs-iv)}",
  ".hs-tx{flex:1;min-width:0;padding:8px 11px;display:flex;flex-direction:column;justify-content:center;gap:4px}",
  ".hs-t{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:17px;line-height:1.1;color:var(--hs-iv);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-s{font-size:11px;color:rgba(243,238,228,.75);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-gp{border:1px solid var(--hs-ch);color:var(--hs-ch);border-radius:999px;padding:0 7px;font-size:10px;margin-inline-end:6px}",
  ".hs-mini{font-size:10px;color:var(--hs-ch)}",
  ".hs-vide{border:1px solid rgba(243,238,228,.12);border-radius:12px;padding:16px 14px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:17px;color:var(--hs-iv2);background:linear-gradient(135deg,#0d1416,#070A08 70%)}",
  ".hs-err{margin-top:14px;font-size:12px;color:var(--hs-ch)}",
  /* le carnet : derniers concours terminés */
  ".hs-sep{height:1px;background:rgba(243,238,228,.08);margin-top:24px}",
  ".hs-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}",
  ".hs-tile{height:76px;border-radius:10px;background-size:cover;background-position:center;position:relative;border:none;padding:0;overflow:hidden;background-color:#0B0F0E}",
  ".hs-tile:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,rgba(7,10,8,.85))}",
  ".hs-tile span{position:absolute;inset-inline-start:7px;inset-inline-end:7px;bottom:6px;font-size:10.5px;text-align:start;z-index:1;text-shadow:0 1px 4px #000;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-attente{padding:18px 0;color:var(--hs-ch);font-size:22px;text-align:center}",
  "@media (min-width:700px){.hs-photo{height:clamp(360px,52vw,460px)}.hs-titre{margin-top:-16px}.hs-liste{display:grid;grid-template-columns:1fr 1fr;column-gap:10px}}"
].join("\n");

function injecterCss() {
  try {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement("style"); st.id = CSS_ID; st.textContent = CSS; document.head.appendChild(st);
  } catch (e) { }
}

function EcranMaSaison() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return hsT(tr, fr, lg); }   /* 04/11 23h10 : traduite (HS_TR, 14 langues) */
  var rtl = (lg === "ar");

  var _ev = React.useState(null); var evs = _ev[0], setEvs = _ev[1];
  var _ins = React.useState({}); var ins = _ins[0], setIns = _ins[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _cl = React.useState([]); var clubs = _cl[0], setClubs = _cl[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _vu = React.useState(null); var vue = _vu[0], setVue = _vu[1];
  var _tm = React.useState(null); var team = _tm[0], setTeam = _tm[1];   /* 04/11 22h55 : { id, nom, membre } */
  var _rs = React.useState(""); var reserve = _rs[0], setReserve = _rs[1];

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function isoDe(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var auj = new Date(); auj.setHours(0, 0, 0, 0);
  var isoAuj = isoDe(auj);
  var anDebut = auj.getMonth() >= 8 ? auj.getFullYear() : auj.getFullYear() - 1;   /* la saison commence le 1er septembre */
  var isoDebutSaison = anDebut + "-09-01";

  function clefDe(n) { try { return (typeof clefClubG === "function") ? clefClubG(n) : String(n || "").toLowerCase().trim(); } catch (e) { return String(n || "").toLowerCase().trim(); } }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { setErreur(F("Pas de connexion.")); setEvs([]); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        /* 04/11 22h55 (Blandine : « l’équipe compétition ne participe pas forcément à la totalité des événements de la SEP », « ça mélange
           la SEP et Feinn », « concours et stages propres à l’équipe uniquement ») — la saison = les concours et stages RATTACHÉS À L’ÉQUIPE
           (agenda_groupes, comme la page Team), passés et à venir, depuis le 1er septembre. Une cavalière hors de l’équipe voit la page,
           mais en touchant un rendez-vous : « Réservé à l’équipe … ». Les modératrices (la coach) ont l’accès de l’équipe. */
        var rg = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom") : null;
        var G = rg && !rg.error && rg.data;
        if (!G || !G.id) { if (vif) { setTeam(false); setEvs([]); } return; }
        var membre = false;
        if (u && u.id) {
          try { membre = (typeof estModerateurHype === "function") && estModerateurHype(u); } catch (eM) { }
          if (!membre) { try { var rmb = await supa.from("groupes_membres").select("user_id").eq("groupe_id", G.id).eq("user_id", u.id).maybeSingle(); membre = !!(rmb && rmb.data); } catch (eMb) { } }
        }
        if (vif) setTeam({ id: G.id, nom: G.nom || ((typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : F("l’équipe")), membre: membre });
        var ra = await supa.from("agenda_groupes").select("agenda_id").eq("groupe_id", G.id);
        if (ra && ra.error) throw new Error(ra.error.message || String(ra.error));
        var idsT = ((ra && ra.data) || []).map(function (x) { return x.agenda_id; });
        var liste = [];
        if (idsT.length) {
          var r = await supa.from("club_agenda").select("*").in("id", idsT.slice(0, 300)).in("type", ["concours", "stage"]).gte("date_jour", isoDebutSaison).order("date_jour", { ascending: true }).limit(300);
          if (r && r.error) throw new Error(r.error.message || String(r.error));
          liste = (r && r.data) || [];
        }
        if (vif) setEvs(liste);
        var ids = liste.map(function (x) { return x.id; });
        if (ids.length) {
          try {
            var ri = await supa.from("agenda_inscriptions").select("agenda_id, user_id").in("agenda_id", ids.slice(0, 200));
            var m = {};
            ((ri && !ri.error && ri.data) || []).forEach(function (x) { (m[x.agenda_id] = m[x.agenda_id] || []).push(x.user_id); });
            if (vif) setIns(m);
          } catch (eI) { }
        }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setEvs(function (e) { return e || []; }); } }
    })();
    return function () { vif = false; };
  }, []);

  /* ── tri : à venir / en cours / terminés (la date de FIN décide, comme l'agenda) ── */
  var tous = evs || [];
  var photoDe = {};
  tous.forEach(function (ev, i) { photoDe[ev.id] = PHOTOS_SAISON[(i + 1) % PHOTOS_SAISON.length]; });
  var avenir = [], encours = [], finis = [];
  tous.forEach(function (ev) {
    var deb = String(ev.date_jour || "").slice(0, 10), fin = String(ev.date_fin || ev.date_jour || "").slice(0, 10);
    if (fin < isoAuj) finis.push(ev); else if (deb <= isoAuj) encours.push(ev); else avenir.push(ev);
  });
  finis.reverse();
  var vueEff = vue || (encours.length ? "encours" : (avenir.length ? "avenir" : "finis"));

  /* ── dates ── */
  function dateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  var LOC = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }[lg] || "fr-FR";
  function fmt(iso, o) { var d = dateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat(LOC, o).format(d); } catch (e) { return String(iso).slice(0, 10); } }
  function plage(ev) {
    var deb = String(ev.date_jour || "").slice(0, 10), fin = String(ev.date_fin || "").slice(0, 10);
    if (!fin || fin === deb) { var t = fmt(deb, { weekday: "long", day: "numeric", month: "long" }); return t.charAt(0).toUpperCase() + t.slice(1); }
    var d1 = dateLoc(deb), d2 = dateLoc(fin);
    if (d1 && d2 && d1.getMonth() === d2.getMonth() && lg === "fr") return "Du " + d1.getDate() + " au " + fmt(fin, { day: "numeric", month: "long" });
    return F("Du ") + fmt(deb, { day: "numeric", month: "long" }) + F(" au ") + fmt(fin, { day: "numeric", month: "long" });
  }
  function badge(ev) {
    var deb = String(ev.date_jour || "").slice(0, 10);
    var d = dateLoc(deb); if (!d) return "";
    var n = Math.round((d - auj) / 86400000);
    if (n === 1) return F("demain");
    if (n > 1 && n <= 7) return F("dans ") + n + F(" j");
    if (n <= 0 && String(ev.date_fin || deb).slice(0, 10) >= isoAuj) return F("en cours");
    return fmt(deb, { day: "numeric", month: "short" });
  }

  /* ── navigation ── */
  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("team-competition"); }
  function ouvrir(ev) {
    var fin = String(ev.date_fin || ev.date_jour || "").slice(0, 10);
    /* 07/11 : passé ou à venir, un concours s'ouvre sur la fiche du Centre (qui contient maintenant le fil, les photos et les résultats) */
    if (fin < isoAuj && String(ev.type || "").toLowerCase() !== "concours") { try { window.__evPasse = null; window.__evPasseId = ev.id; } catch (e1) { } setEcran("evenement-passe"); return; }
    /* 04/11 (étape 2) : un concours à venir ou en cours ouvre la NOUVELLE fiche concours (même design) */
    try { window.__concoursId = ev.id; window.__concoursPhoto = photoDe[ev.id] || null; } catch (e2) { }
    setEcran("concours");
  }

  /* ── en-tête Vidéothèque ── */
  function courbe(cls, d) {
    return h("svg", { className: "hs-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hsg-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
        h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
        h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#hsg-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  var hero = h("div", { className: "hs-hero" },
    (typeof SelecteurLangue === "function") ? h("div", { className: "hs-langue" }, h(SelecteurLangue, { compact: true })) : null,
    h("div", { className: "hs-in hs-hero-retour" },
      h("button", { type: "button", className: "hs-retour", onClick: retour }, h("i", null, "‹"), F("Retour"))),
    courbe("c1", "M250 4 C 330 8, 385 40, 400 96"),
    h("div", { className: "hs-photo", style: { "--hs-pos": PHOTOS_SAISON[0].pos } },
      h("img", { src: PHOTOS_SAISON[0].img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
    courbe("c2", "M0 92 C 130 90, 240 62, 400 8"),
    h("div", { className: "hs-in" },
      h("div", { className: "hs-titre" }, h("h1", null, F("Ma saison")),
        h("p", null, (team && team.nom ? team.nom : F("L’équipe")) + F(", saison ") + anDebut + "-" + (anDebut + 1) + "."))));

  /* ── une carte concours ── */
  function carte(ev) {
    var ph = photoDe[ev.id] || PHOTOS_SAISON[1];
    var liste = ins[ev.id] || [];
    var moiDedans = !!(moi && moi.id && liste.indexOf(moi.id) !== -1);
    var nb = liste.length;
    var etiquette = nb ? (nb + (nb > 1 ? F(" cavalières") : F(" cavalière"))) : (String(ev.date_jour || "").slice(0, 10) > isoAuj ? F("À engager") : "");
    var clubCourt = clubs.length > 1 ? (clubs.filter(function (n) { return clefDe(n) === ev.club_clef; })[0] || "") : "";
    var lieu = ev.lieu || clubCourt;
    var carteEl = h("button", { type: "button", key: ev.id, className: "hs-cd", onClick: function () { ouvrir(ev); } },
      h("div", { className: "hs-im", style: { backgroundImage: "url(" + ph.img + ")", backgroundPosition: ph.pos } },
        h("span", { className: "hs-bd" }, badge(ev))),
      h("div", { className: "hs-tx" },
        h("span", { className: "hs-t" }, ev.titre || (ev.type === "stage" ? F("Stage") : F("Concours"))),
        h("span", { className: "hs-s" }, plage(ev)),
        (etiquette || lieu) ? h("span", { className: "hs-s" }, etiquette ? h("span", { className: "hs-gp" }, etiquette) : null, lieu) : null,
        moiDedans ? h("span", { className: "hs-mini" }, F("Tu es inscrite")) : null),
      h("span", { "aria-hidden": "true", style: { alignSelf: "center", padding: "0 12px", color: "#C9A66B", fontSize: 22 } }, rtl ? "\u2039" : "\u203a"));
    /* 04/11 23h30 (Blandine : « je suis sur la page de ma saison, je vois pas où continuer ») : sous chaque concours à venir,
       deux boutons visibles qui mènent directement aux outils. */
    var fini = String(ev.date_fin || ev.date_jour || "").slice(0, 10) < isoAuj;
    if (fini || ev.type === "stage") return carteEl;
    function aller(ecran) { try { window.__concoursId = ev.id; window.__engagementsId = ev.id; window.__concoursPhoto = photoDe[ev.id] || null; localStorage.setItem("hype_concours_ouvert", String(ev.id)); } catch (e) { } setEcran(ecran); }
    return h("div", { key: ev.id, style: { marginBottom: 14 } }, carteEl,
      h("div", { className: "hs-duo", style: { marginTop: 6 } },
        h("button", { type: "button", className: "hs-btn plein", style: { minHeight: 40, fontSize: 12.5 }, onClick: function () { aller("engagements"); } }, F("Engagements")),
        h("button", { type: "button", className: "hs-btn", style: { minHeight: 40, fontSize: 12.5 }, onClick: function () { aller("concours"); } }, F("Ouvrir la fiche"))));
  }

  var pills = [
    { k: "avenir", l: F("À venir"), n: avenir.length },
    { k: "encours", l: F("En cours"), n: encours.length },
    { k: "finis", l: F("Terminés"), n: finis.length }
  ];
  var listeVue = vueEff === "avenir" ? avenir : (vueEff === "encours" ? encours : finis);
  var titreVue = vueEff === "avenir" ? F("Prochains rendez-vous") : (vueEff === "encours" ? F("En ce moment") : F("Rendez-vous terminés"));
  var videVue = vueEff === "avenir" ? F("Rien de prévu pour l’équipe pour l’instant.") : (vueEff === "encours" ? F("Rien en ce moment.") : F("Rien de terminé cette saison."));

  var corps;
  if (evs === null) corps = h("div", { className: "hs-attente", "aria-busy": "true" }, "…");
  else if (team === false) corps = h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Aucune équipe compétition pour l’instant."));
  else corps = h("div", null,
    h("div", { className: "hs-pills", role: "tablist" }, pills.map(function (p) {
      return h("button", { type: "button", key: p.k, role: "tab", "aria-selected": vueEff === p.k ? "true" : "false", className: "hs-pl" + (vueEff === p.k ? " on" : ""), onClick: function () { setVue(p.k); } }, p.l + " (" + p.n + ")");
    })),
    h("div", { className: "hs-sec" }, h("b", null, titreVue)),
    listeVue.length ? h("div", { className: "hs-liste" }, listeVue.map(carte)) : h("div", { className: "hs-vide" }, videVue),
    (vueEff !== "finis" && finis.length) ? h("div", null,
      h("div", { className: "hs-sep" }),
      h("div", { className: "hs-sec" }, h("b", null, F("Le carnet")),
        h("button", { type: "button", onClick: function () { setVue("finis"); try { window.scrollTo(0, 0); } catch (e) { } }, style: { background: "none", border: "none", padding: "8px 0", fontSize: 11.5, color: "rgba(243,238,228,.64)" } }, F("Tout voir") + (rtl ? " ‹" : " ›"))),
      /* 04/11 23h15 (Blandine : « les parties du carnet sont toutes petites et trop décalées, on voit même pas ce que c'est ») :
         les 3 derniers rendez-vous terminés reprennent la même carte que la liste du haut (titre, date, lieu lisibles). */
      h("div", { className: "hs-liste" }, finis.slice(0, 3).map(carte))) : null);

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      corps,
      erreur ? h("div", { className: "hs-err" }, F("Une partie n’a pas pu se charger : ") + erreur) : null),
    reserve ? h("div", { role: "status", style: { position: "fixed", left: "50%", bottom: "calc(96px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", zIndex: 60, maxWidth: "86%", padding: "12px 18px", borderRadius: 999, background: "rgba(12,16,18,.96)", border: "1px solid rgba(201,166,107,.7)", color: "#F3EEE4", fontSize: 13, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,.5)" } }, "🔒 " + reserve) : null);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   04/11/2026 — CENTRE DE COMPÉTITION, ÉTAPE 2 : LA FICHE CONCOURS et LA PAGE ENGAGEMENTS
   Demandes de Blandine (04/11 17h24 → 17h32) :
     · fiche du concours : « lieu du concours et horaires embarquement etc », garder « l'option qu'on a sur
       les événements pour dire qu'on y participe » et « les alertes aux heures prévues » ;
     · page Engagements : la coach choisit les couples dans les épreuves et Hype prépare « le papier à remettre
       à la SEP » (feuille « Engagements Concours CSO Club »). Licences des cavalières gardées. Le bas de la
       feuille (montants, bénéficiaires, Dû) reste VIDE : « en bas c'est pas moi ».
   Mêmes données que l'ancienne fiche : club_agenda, agenda_inscriptions (Je participe), abonnement aux
   notifications (hypePush*). Les alertes partent 15 min avant le DÉPART et la RECONNAISSANCE (notifier-rdv,
   inchangé). Nouvelles tables (SQL du 04/11) : concours_feuille, concours_engagements, cavaliers_licences.
   Toute écriture est vérifiée ; un refus est affiché, jamais avalé.
   ═══════════════════════════════════════════════════════════════════════════════ */
var CSS2_ID = "hype-saison-css-2";
var CSS2 = [
  ".hs-carte{border:1px solid rgba(243,238,228,.12);border-radius:14px;background:linear-gradient(135deg,#0d1416,#070A08 70%);overflow:hidden}",
  ".hs-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-top:1px solid rgba(243,238,228,.07);min-height:48px}.hs-row:first-child{border-top:0}",
  ".hs-row .g{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.hs-row .g b{font-weight:500;font-size:13.5px;color:var(--hs-iv)}.hs-row .g span{font-size:11.5px;color:var(--hs-iv2)}",
  ".hs-row .d{font-size:15px;font-variant-numeric:tabular-nums;color:var(--hs-iv);white-space:nowrap}",
  ".hs-row a,.hs-lien{color:var(--hs-ch);font-size:12.5px;text-decoration:none;background:none;border:none;padding:6px 0;white-space:nowrap}",
  ".hs-texte{padding:14px;font-size:13.5px;line-height:1.55;color:rgba(243,238,228,.86);white-space:pre-wrap;overflow-wrap:anywhere}",
  ".hs-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:46px;border-radius:999px;border:1px solid rgba(201,166,107,.8);background:transparent;color:var(--hs-ch);font-size:13.5px;letter-spacing:.02em}",
  /* 04/11 23h20 (Blandine : « évite les boutons pleins dorés ») : le bouton principal est détouré champagne sur verre sombre, jamais rempli d'or */
  ".hs-btn.plein{background:linear-gradient(180deg,rgba(28,34,38,.92),rgba(12,16,18,.92));border-color:#C9A66B;color:#F3EEE4;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,.35)}",
  ".hs-btn.doux{border-color:rgba(243,238,228,.2);color:var(--hs-iv)}",
  ".hs-btn[disabled]{opacity:.5}",
  ".hs-duo{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}",
  ".hs-note{font-size:11.5px;line-height:1.5;color:var(--hs-iv2);margin-top:10px}",
  ".hs-msg{font-size:12px;line-height:1.5;color:var(--hs-ch);margin-top:10px}",
  ".hs-av{display:flex;flex-wrap:wrap;gap:6px;padding:12px 14px}",
  ".hs-av span{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(243,238,228,.12);border-radius:999px;padding:3px 10px 3px 3px;font-size:12px}",
  ".hs-av img{width:24px;height:24px;border-radius:50%;object-fit:cover;background:#0B0F0E}",
  /* formulaires de la page Engagements */
  ".hs-champ{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}",
  ".hs-champ label{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--hs-iv2)}",
  ".hs input,.hs select{width:100%;min-height:44px;border-radius:10px;border:1px solid rgba(243,238,228,.16);background:rgba(16,26,29,.6);color:var(--hs-iv);font-family:inherit;font-size:16px;padding:0 12px;-webkit-appearance:none;appearance:none}",
  ".hs select{background-image:linear-gradient(45deg,transparent 50%,#C9A66B 50%),linear-gradient(135deg,#C9A66B 50%,transparent 50%);background-position:calc(100% - 18px) 19px,calc(100% - 13px) 19px;background-size:5px 5px;background-repeat:no-repeat;padding-inline-end:30px}",
  ".hs input:focus,.hs select:focus{outline:none;border-color:rgba(201,166,107,.7)}",
  ".hs input[type=checkbox]{-webkit-appearance:checkbox;appearance:auto;width:20px;min-height:20px;height:20px;padding:0;flex:0 0 auto}",
  ".hs-g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
  ".hs-g2 .hs-champ{margin-bottom:8px}",
  ".hs-puces{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}",
  ".hs-puce{display:inline-flex;align-items:center;gap:8px;min-height:34px;border-radius:999px;border:1px solid rgba(201,166,107,.6);padding:0 6px 0 12px;font-size:12.5px}",
  ".hs-num{font-family:'Montserrat',system-ui,sans-serif;font-size:11px;letter-spacing:.12em;color:var(--hs-ch);margin-right:10px;vertical-align:3px}",
  ".hs-tour{float:right;text-transform:none;letter-spacing:0;color:var(--hs-ch);font-size:11.5px}",
  ".hs-tour.trop,.hs-recap td.trop{color:var(--hs-iv);font-weight:600;text-decoration:underline}",
  ".hs-mini{min-height:30px;padding:0 8px;font-size:11.5px;border-radius:10px;width:auto}",
  ".hs-recap{width:100%;border-collapse:collapse;font-size:12.5px;border:1px solid rgba(243,238,228,.12);border-radius:12px;overflow:hidden}",
  ".hs-recap th{text-align:left;font-weight:500;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--hs-iv3);padding:8px 8px;border-bottom:1px solid rgba(243,238,228,.12)}",
  ".hs-recap td{padding:8px 8px;border-bottom:1px solid rgba(243,238,228,.06);vertical-align:top}",
  ".hs-recap tr.vide td{color:var(--hs-iv3)}",
  /* 04/11 23h31 (Blandine : « fais moins visuel pour ce que tu proposes ») : propositions en simples mots, sans bulles */
  /* Engagements allégés (23h47 : « pas blindé de verre pétrole plein les yeux ») : champs soulignés, pas de cadres */
  ".hs-eng input,.hs-eng select{background-color:transparent;border:none;border-bottom:1px solid rgba(243,238,228,.18);border-radius:0;padding-inline-start:2px}",
  ".hs-eng input:focus,.hs-eng select:focus{border-bottom-color:var(--hs-ch)}",
  ".hs-eng .hs-carte{background:none;border:none;border-radius:0}",
  ".hs-eng .hs-couple{padding:16px 0;border-top:1px solid rgba(243,238,228,.08)}",
  ".hs-eng .hs-btn.plein{background:transparent;box-shadow:none}",
  ".hs-onglets{display:flex;gap:18px;margin:34px 0 0;border-bottom:1px solid rgba(243,238,228,.12);overflow-x:auto}",
  ".hs-onglets button{background:none;border:none;border-bottom:1.5px solid transparent;color:var(--hs-iv2);font-family:inherit;font-size:12.5px;letter-spacing:.04em;padding:10px 0;margin-bottom:-1px;white-space:nowrap}",
  ".hs-onglets button.on{color:var(--hs-iv);border-bottom-color:var(--hs-ch)}",
  ".hs-fch{padding:12px 0;border-bottom:1px solid rgba(243,238,228,.08)}",
  ".hs-fch-t{display:flex;align-items:center;gap:10px}",
  ".hs-fch-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:18px;flex:1;min-width:0}",
  ".hs-pts{display:flex;gap:4px}.hs-pts i{width:8px;height:8px;border-radius:50%;border:1px solid var(--hs-ch);display:block}.hs-pts i.p{background:var(--hs-ch)}.hs-pts i.trop{background:var(--hs-iv);border-color:var(--hs-iv)}",
  ".hs-reste{font-size:11px;color:var(--hs-iv2);min-width:58px;text-align:end}.hs-reste.trop{color:var(--hs-iv);font-weight:600;text-decoration:underline}",
  ".hs-fch-r{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:12px;color:var(--hs-iv2);margin-top:5px}.hs-fch-r em,.hs-grille em{font-style:normal;color:var(--hs-iv3)}",
  ".hs-pep{margin-top:22px}",
  ".hs-pep-t{display:flex;justify-content:space-between;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--hs-ch);padding-bottom:6px;border-bottom:1px solid rgba(201,166,107,.45)}",
  ".hs-pep-l{display:flex;gap:10px;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px solid rgba(243,238,228,.06)}.hs-pep-l span:last-child{color:var(--hs-iv2);text-align:end;min-width:0}",
  ".hs-pep-l sup{color:var(--hs-ch);font-size:10px}",
  ".hs-pep-tot{font-size:11.5px;color:var(--hs-iv2);margin-top:14px;text-align:end}",
  ".hs-grille-w{overflow-x:auto;max-width:100%}",
  ".hs-grille{width:100%;border-collapse:collapse;font-size:12px;table-layout:fixed}",
  ".hs-grille th{font-weight:500;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--hs-iv3);text-align:start;padding:0 4px 8px;border-bottom:1px solid rgba(243,238,228,.12)}",
  ".hs-grille th.ch{width:34%}",
  ".hs-grille td{padding:9px 4px;border-bottom:1px solid rgba(243,238,228,.06);vertical-align:top;line-height:1.35;overflow-wrap:anywhere}",
  ".hs-grille td.ch{font-family:'Cormorant Garamond',Georgia,serif;font-size:15px}",
  ".hs-grille td em{display:block;font-size:10px}",
  ".hs-grille td.libre{color:var(--hs-iv3);font-style:italic}",
  ".hs-grille td.trop{text-decoration:underline}",
  ".hs-lus{margin-top:14px}.hs-lu{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid rgba(243,238,228,.06);font-size:13px}",
  ".hs-lu b{font-weight:500;display:block}.hs-lu em{font-style:normal;font-size:11px;color:var(--hs-iv2)}",
  /* 07/11 récapitulatif de fin (Engagements) */
  ".rc{margin:40px -2px 10px}",
  ".rc-tete{position:relative;padding:46px 0 6px}",
  ".rc-tete svg{position:absolute;left:-18px;right:-18px;top:0;width:calc(100% + 36px);height:38px;pointer-events:none}",
  ".rc-eb{font-size:9.5px;letter-spacing:.32em;text-transform:uppercase;color:var(--hs-ch);font-weight:500}",
  ".rc-tete h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:32px;line-height:1.05;margin:8px 0 4px}",
  ".rc-tete p{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:16px;color:var(--hs-iv2)}",
  ".rc-t{display:flex;justify-content:space-between;align-items:baseline;margin:28px 0 10px}",
  ".rc-t h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:25px;margin:0}",
  ".rc-t span{font-size:11px;color:var(--hs-iv2)}",
  ".rc-cav{padding:14px 0;border-bottom:1px solid rgba(243,238,228,.07)}",
  ".rc-cav-t{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:10px}",
  ".rc-cav-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:20px;min-width:0}",
  ".rc-cav-t b span{font-style:italic;color:var(--hs-iv2)}",
  ".rc-cav-t small{font-size:10px;letter-spacing:.14em;color:var(--hs-iv3);white-space:nowrap}",
  ".rc-duo{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
  ".rc-v{position:relative;height:104px;border-radius:18px;overflow:hidden;background:#0d1214;border:1px solid rgba(243,238,228,.06)}",
  ".rc-v img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
  ".rc-v .voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.05) 20%,rgba(7,10,8,.88))}",
  ".rc-v.vide{display:flex;align-items:center;justify-content:center;border-style:dashed;border-color:rgba(201,166,107,.35);color:var(--hs-iv3);font-size:11.5px;font-style:italic}",
  ".rc-no{position:absolute;top:8px;left:8px;font-size:9.5px;letter-spacing:.12em;border:1px solid rgba(201,166,107,.42);border-radius:999px;padding:2px 8px;background:rgba(7,10,8,.55);color:var(--hs-iv)}",
  ".rc-tx{position:absolute;left:10px;right:10px;bottom:8px}",
  ".rc-tx b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:16px;line-height:1.05;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".rc-tx em{font-style:normal;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--hs-iv2)}",
  ".rc-hl{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid rgba(243,238,228,.07)}",
  ".rc-hl .n{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:24px;color:var(--hs-ch);width:18px;text-align:center}",
  ".rc-hl .c{flex:1;min-width:0}",
  ".rc-hl .c b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19px;line-height:1.1}",
  ".rc-hl .c span{display:block;font-size:11px;color:var(--hs-iv2);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".rc-duo2{position:relative;width:76px;height:46px;flex:0 0 76px}",
  ".rc-duo2.seul{width:46px;flex-basis:46px}",
  ".rc-duo2 img,.rc-duo2 .rc-vide{position:absolute;top:0;left:0;width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--hs-noir);box-shadow:0 0 0 1px rgba(201,166,107,.42)}",
  ".rc-duo2 .rc-vide{border-style:dashed;background:transparent}",
  ".rc-duo2 img+img{left:30px}",
  ".rc-duo2 i{position:absolute;bottom:-4px;font-style:normal;font-size:9px;color:var(--hs-ch);background:var(--hs-noir);border:1px solid rgba(201,166,107,.42);border-radius:999px;padding:0 5px;line-height:15px}",
  ".rc-duo2 i.a{left:2px}.rc-duo2 i.b{left:44px}",
  ".rc-gc{flex:0 0 76%;max-width:310px;scroll-snap-align:start;border:1px solid rgba(243,238,228,.14);border-radius:24px;padding:18px 16px 12px;background:linear-gradient(180deg,rgba(16,26,29,.65),rgba(7,10,8,.3))}",
  ".rc-gc .haut{display:flex;align-items:center;gap:12px;margin-bottom:12px}",
  ".rc-gc .mono{width:54px;height:54px;flex:0 0 54px;border-radius:50%;border:1px solid rgba(201,166,107,.42);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,serif;font-size:21px;color:var(--hs-ch);object-fit:cover;background:radial-gradient(circle at 30% 25%,rgba(201,166,107,.16),transparent 60%)}",
  ".rc-gc h4{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:21px;line-height:1.05;overflow:hidden;text-overflow:ellipsis}",
  ".rc-gc h4 span{display:block;font-style:italic;color:var(--hs-iv2);font-size:17px}",
  ".rc-gc small{display:block;font-size:10px;letter-spacing:.12em;color:var(--hs-iv3);margin-top:4px}",
  ".rc-gt{display:grid;grid-template-columns:48px 1fr;gap:10px;align-items:center;padding:8px 0;border-top:1px solid rgba(243,238,228,.07)}",
  ".rc-gt img,.rc-vide2{width:48px;height:48px;border-radius:14px;object-fit:cover;display:block}",
  ".rc-vide2{border:1px dashed rgba(201,166,107,.42)}",
  ".rc-gt b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:17px;line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".rc-gt em{font-style:normal;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--hs-iv3)}",
  ".rc-gt.vide{display:block;color:var(--hs-iv3);font-style:italic;font-size:12px}",
  ".rc-dg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}",
  ".rc-dc{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:3/4;max-width:100%;background:#0d1214;border:1px solid rgba(243,238,228,.06)}",
  ".rc-dc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.88}",
  ".rc-dc .voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.05) 25%,rgba(7,10,8,.93) 76%)}",
  ".rc-dn{position:absolute;top:10px;left:12px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:24px;color:var(--hs-ch);line-height:1;text-shadow:0 1px 8px rgba(0,0,0,.8)}",
  ".rc-dl{position:absolute;top:10px;right:10px;font-size:9px;letter-spacing:.12em;border:1px solid rgba(201,166,107,.42);border-radius:999px;padding:4px 8px;background:rgba(7,10,8,.55);color:var(--hs-iv)}",
  ".rc-dt{position:absolute;left:12px;right:12px;bottom:12px}",
  ".rc-dt h4{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:20px;line-height:1.02;margin:0 0 6px}",
  ".rc-dt h4 span{display:block;font-size:13px;letter-spacing:.06em;color:var(--hs-iv2)}",
  ".rc-dt ol{list-style:none;margin:0;padding:0;font-size:11px;color:var(--hs-iv2);line-height:1.5}",
  ".rc-dt ol em{font-style:normal;color:var(--hs-iv3)}",
  ".rc-dt ol li{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".rc-dt ol li.libre{font-style:italic;color:var(--hs-iv3)}",
  ".rc-le{margin-bottom:22px}",
  ".rc-ban{position:relative;height:118px;border-radius:22px;overflow:hidden;background:#0d1214;margin-bottom:4px}",
  ".rc-ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 30%}",
  ".rc-ban .voile{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.9) 30%,rgba(7,10,8,.2))}",
  ".rc-ban .t{position:absolute;left:16px;right:16px;bottom:14px}",
  ".rc-ban .t b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:30px;line-height:1}",
  ".rc-ban .t span{font-size:11px;color:var(--hs-iv2)}",
  ".rc-li{display:grid;grid-template-columns:26px 44px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(243,238,228,.07)}",
  ".rc-li .k{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:22px;color:var(--hs-ch);text-align:center}",
  ".rc-li img,.rc-vide3{width:44px;height:44px;border-radius:50%;object-fit:cover;border:1px solid rgba(201,166,107,.42);display:block}",
  ".rc-vide3{border-style:dashed}",
  ".rc-li .q b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:17px;line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".rc-li .q>span{display:block;font-size:11px;color:var(--hs-iv2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".rc-li .hh{font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-variant-numeric:tabular-nums}",
  ".rc-li .hh.vide{color:var(--hs-iv3)}",
  ".rc-rail{display:flex;gap:12px;overflow-x:auto;margin:0 -18px;padding:0 18px 6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}",
  ".rc-rail::-webkit-scrollbar{display:none}",
  ".rc-ch{flex:0 0 72%;max-width:300px;scroll-snap-align:start;border:1px solid rgba(243,238,228,.14);border-radius:22px;overflow:hidden;background:linear-gradient(180deg,rgba(16,26,29,.6),rgba(7,10,8,.4))}",
  ".rc-ch .ph{position:relative;height:130px}",
  ".rc-ch .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
  ".rc-ch .ph .voile{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(7,10,8,.85))}",
  ".rc-ch .ph h4{position:absolute;left:14px;right:14px;bottom:10px;margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:22px;line-height:1.05}",
  ".rc-slots{padding:10px 14px 14px;display:flex;flex-direction:column;gap:7px}",
  ".rc-slot{display:grid;grid-template-columns:22px 1fr auto;align-items:center;gap:8px;font-size:12.5px}",
  ".rc-slot i{width:22px;height:22px;border-radius:50%;border:1px solid var(--hs-ch);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:10px;color:var(--hs-ch)}",
  ".rc-slot.plein i{background:rgba(201,166,107,.12)}",
  ".rc-slot.trop span{text-decoration:underline}",
  ".rc-slot em{font-style:normal;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--hs-iv3)}",
  ".rc-slot.vide{color:var(--hs-iv3);font-style:italic}",
  ".rc-slot.vide i{border-style:dashed;border-color:rgba(201,166,107,.42)}",
  ".rc-ep{margin-bottom:18px}",
  ".rc-ep h4{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:22px;margin:0}",
  ".rc-ep h4 span{font-style:italic;font-size:16px;color:var(--hs-iv3)}",
  ".rc-etat{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--hs-iv3);margin:4px 0 12px}",
  ".rc-etat.ok{color:var(--hs-ch)}",
  ".rc-fil{position:relative;padding-inline-start:26px}",
  ".rc-fil::before{content:'';position:absolute;inset-inline-start:6px;top:6px;bottom:6px;width:1px;background:linear-gradient(180deg,var(--hs-ch),rgba(201,166,107,.42) 60%,transparent)}",
  ".rc-pt{position:relative;display:flex;gap:12px;align-items:flex-start;padding:0 0 14px}",
  ".rc-pt::before{content:'';position:absolute;inset-inline-start:-24px;top:5px;width:9px;height:9px;border-radius:50%;background:var(--hs-noir);border:1px solid var(--hs-ch)}",
  ".rc-pt.h::before{background:var(--hs-ch)}",
  ".rc-h{flex:0 0 52px;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;line-height:1.1;color:var(--hs-iv)}",
  ".rc-h small{display:block;font-family:'Montserrat',sans-serif;font-size:9.5px;letter-spacing:.1em;color:var(--hs-iv3)}",
  ".rc-q{min-width:0}",
  ".rc-q b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:18px;line-height:1.15}",
  ".rc-q p{margin:2px 0 0;font-size:12px;color:var(--hs-iv2)}",
  ".rc .sup{color:var(--hs-ch);font-size:10px;vertical-align:4px;margin-inline-start:3px;font-family:'Montserrat',sans-serif}",
  ".hs-puce-cav{background:none;border:none;border-radius:0;color:var(--hs-iv2);font-family:inherit;font-size:13px;min-height:30px;padding:0 10px 0 0;margin:0}",
  ".hs-puce-cav.fait{opacity:.35}",
  ".hs-puce button{width:26px;height:26px;border-radius:50%;border:none;background:none;color:var(--hs-iv2);font-size:16px;line-height:1;padding:0}",
  ".hs-ajout{display:flex;gap:8px}.hs-ajout input{flex:1}.hs-ajout button{flex:0 0 auto;width:auto;padding:0 16px}",
  ".hs-couple{padding:14px;border-top:1px solid rgba(243,238,228,.08)}.hs-couple:first-child{border-top:0}",
  ".hs-couple-t{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}",
  ".hs-couple-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19px}",
  ".hs-ep{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:8px;margin-bottom:8px}",
  ".hs-coll{position:sticky;bottom:0;z-index:5;padding:14px 0 calc(env(safe-area-inset-bottom) + 12px);background:linear-gradient(180deg,rgba(7,10,8,0),#070A08 14px)}",
  /* LA FEUILLE SEP — page blanche à imprimer, copie de la fiche papier */
  "#zone-impression.hs-feuille{position:fixed;inset:0;z-index:10050;background:#fff;color:#111;overflow:auto;font-family:Calibri,'Segoe UI',Arial,sans-serif}",
  ".hs-feuille .bar{position:sticky;top:0;display:flex;gap:8px;padding:calc(env(safe-area-inset-top) + 10px) 14px 10px;background:#f3f3f3;border-bottom:1px solid #ddd}",
  ".hs-feuille .bar button{flex:1;min-height:44px;border-radius:10px;border:none;font-size:14px;font-weight:600}",
  ".hs-feuille .bar .p{background:#111;color:#fff}.hs-feuille .bar .f{flex:0 0 auto;padding:0 18px;background:#e2e2e2;color:#111}",
  ".hs-feuille .page{width:100%;max-width:780px;margin:0 auto;padding:22px 16px 40px}",
  ".hs-feuille h2{font-family:'Monotype Corsiva','Apple Chancery','URW Chancery L',cursive;font-style:italic;font-weight:400;color:#1d2a8a;text-align:center;font-size:clamp(21px,6.2vw,30px);margin:6px 0 22px}",
  ".hs-feuille .tete{display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;font-size:13px;margin-bottom:16px}",
  ".hs-feuille .tete div{display:flex;gap:6px;align-items:baseline;min-width:0}",
  ".hs-feuille .tete i{font-style:normal;flex:1;min-width:0;border-bottom:1px dotted #888;font-weight:700;min-height:16px}",
  ".hs-feuille .tete small{font-size:11.5px}",
  ".hs-feuille table{border-collapse:collapse;width:100%}",
  ".hs-feuille .grille th,.hs-feuille .grille td{border:1px solid #333;font-size:12px;padding:6px 5px;text-align:left;vertical-align:middle}",
  ".hs-feuille .grille th{font-weight:700;font-size:12.5px}",
  ".hs-feuille .grille td{height:40px;font-weight:700}",
  /* 05/11 00h05 (capture : colonnes CHEVAL coupées à droite sur iPhone, barre du bas par-dessus) : la grille tient dans la largeur */
  ".hs-feuille .grille{table-layout:fixed}.hs-feuille .grille td,.hs-feuille .grille th{overflow-wrap:anywhere}",
  "@media (max-width:520px){.hs-feuille .grille th,.hs-feuille .grille td{font-size:10.5px;padding:5px 3px}.hs-feuille .grille th{font-size:10px}.hs-feuille .page{padding:18px 8px 40px}}",
  ".hs-feuille .grille .c{text-align:center}",
  ".hs-feuille .bas{margin:26px 0 0 auto;width:62%;font-size:12px}",
  ".hs-feuille .bas td,.hs-feuille .bas th{border:1px solid #333;padding:3px 6px;font-weight:400}",
  ".hs-feuille .bas th{text-align:center}",
  ".hs-feuille .fait{margin-top:24px;font-size:12px}",
  "@media print{.hs-feuille .bar{display:none!important}.hs-feuille .page{max-width:none;padding:0}#zone-impression.hs-feuille{position:absolute!important}@page{size:A4 portrait;margin:14mm}}",
  /* 05/11 — Engagements, visuel 1 (style Vidéothèque) */
  ".e1 .e1-carte{border-radius:16px;border:1px solid rgba(243,238,228,.09);background:linear-gradient(135deg,rgba(16,26,29,.55),rgba(7,10,8,.96) 60%);box-shadow:0 14px 30px -20px #000}",
  ".e1 .e1-conc{padding:4px 16px;margin-top:22px}",
  ".e1 .e1-ligne{display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:48px;padding:6px 0;border-bottom:1px solid rgba(243,238,228,.09);font-size:13px}",
  ".e1 .e1-conc>.e1-ligne:last-of-type{border-bottom:none}",
  ".e1 .e1-lab{color:var(--hs-iv2);font-size:12px;flex:0 0 auto}",
  ".e1 .e1-val{text-align:end}",
  ".e1 input.e1-in{flex:1;min-width:0;max-width:60%;text-align:end;border:none!important;padding:6px 0;font-size:14px;color:var(--hs-iv)}",
  ".e1 input.e1-in::placeholder{color:var(--hs-ch);opacity:1}",
  ".e1 .e1-num{border-bottom:1px solid rgba(243,238,228,.09);padding:0 0 4px}.e1 .e1-num>div{margin:4px 0 6px!important}",
  ".e1 .e1-seg{display:inline-flex;border:1px solid rgba(243,238,228,.14);border-radius:999px;padding:3px}",
  ".e1 .e1-seg button{background:none;border:none;color:var(--hs-iv2);font:500 12px 'Montserrat',sans-serif;padding:7px 16px;border-radius:999px}",
  ".e1 .e1-seg button.on{background:rgba(201,166,107,.2);color:var(--hs-iv)}",
  ".e1 .e1-chef{background:none;border:none;color:var(--hs-iv);text-align:end;padding:4px 0;font:inherit}",
  ".e1 .e1-chef b{display:block;font-weight:500;font-size:13.5px}.e1 .e1-chef small{display:block;color:var(--hs-iv3);font-size:10.5px;margin-top:2px}",
  ".e1 .e1-chef-ed{align-items:flex-start;padding:10px 0}.e1 .e1-chef-champs{display:flex;flex-direction:column;gap:6px;align-items:flex-end;flex:1;min-width:0}.e1 .e1-chef-champs input{width:100%;text-align:end}",
  ".e1 .e1-puces{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}",
  ".e1 .e1-puce{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(201,166,107,.55);border-radius:999px;padding:4px 6px 4px 11px;font-size:12px;background:none;color:var(--hs-iv)}",
  ".e1 .e1-puce button{background:none;border:none;color:var(--hs-iv3);font-size:14px;padding:0 4px;line-height:1}",
  ".e1 .e1-puce.plus{border-style:dashed;color:var(--hs-ch);padding:4px 11px;font-size:14px}",
  ".e1 .e1-ajout-ep{display:flex;gap:12px;align-items:center;padding:0 0 12px}.e1 .e1-ajout-ep input{flex:1;min-width:0}",
  ".e1 .e1-sw{display:flex;gap:4px;margin-top:26px;border:1px solid rgba(243,238,228,.09);border-radius:999px;padding:4px}",
  ".e1 .e1-sw button{flex:1;background:none;border:none;color:var(--hs-iv2);font:500 12.5px 'Montserrat',sans-serif;padding:11px 0;border-radius:999px}",
  ".e1 .e1-sw button.on{background:rgba(201,166,107,.18);color:var(--hs-iv)}",
  ".e1 .e1-compte{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11.5px;color:var(--hs-iv2);margin:16px 2px 4px}",
  ".e1 .e1-cav{display:flex;gap:14px;padding:14px;margin-top:10px;align-items:flex-start}",
  ".e1 .e1-av{flex:0 0 44px;width:44px;height:44px;border-radius:50%;border:1px solid var(--hs-ch);object-fit:cover;display:grid;place-items:center;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:var(--hs-ch);background:#0d1416}",
  ".e1 .e1-cav-c{flex:1;min-width:0}",
  ".e1 .e1-cav-t{display:flex;justify-content:space-between;align-items:baseline;gap:8px}",
  ".e1 .e1-cav-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:21px;line-height:1.1;min-width:0;overflow-wrap:anywhere}",
  ".e1 .e1-lic{background:none;border:none;padding:2px 0;color:var(--hs-iv3);font:400 10.5px 'Montserrat',sans-serif;text-align:start}",
  ".e1 .e1-cav-ed{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin-top:6px}.e1 .e1-cav-ed input{flex:1 1 130px;min-width:0}",
  ".e1 .e1-tour{display:flex;align-items:center;gap:10px;margin-top:12px}",
  ".e1 .e1-th{flex:0 0 40px;width:40px;height:40px;border-radius:10px;object-fit:cover;object-position:60% 35%;border:1px solid rgba(243,238,228,.09)}",
  ".e1 .e1-th.vide{display:grid;place-items:center;color:var(--hs-iv3);font-size:12px;border-style:dashed}",
  ".e1 .e1-tour-ch{flex:1;min-width:0}.e1 .e1-tour-ch select,.e1 .e1-tour-ch input{width:100%;border:none!important;font-size:13.5px;padding:6px 0}",
  ".e1 .e1-tour-ep{flex:0 0 auto}.e1 .e1-tour-ep select{border:1px solid rgba(243,238,228,.12)!important;border-radius:999px!important;font-size:11px;padding:5px 10px;max-width:110px;color:var(--hs-iv2)}",
  ".e1 .e1-tuiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-top:8px}",
  ".e1 .e1-tuile{border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.09);background:#070A08;min-width:0}",
  ".e1 .e1-tuile-ph{position:relative;aspect-ratio:4/3}.e1 .e1-tuile-ph img{width:100%;height:100%;object-fit:cover;object-position:60% 35%;display:block}",
  ".e1 .e1-tuile-ph:after{content:'';position:absolute;left:0;right:0;bottom:0;height:45%;background:linear-gradient(180deg,rgba(7,10,8,0),#070A08)}",
  ".e1 .e1-tuile-b{padding:0 12px 14px;text-align:center}",
  ".e1 .e1-tuile h4{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19px;line-height:1.1;margin:0 0 6px;overflow-wrap:anywhere}",
  ".e1 .e1-tuile-r{font-size:10.5px;color:var(--hs-iv2);margin-top:4px}.e1 .e1-tuile-r.trop{color:var(--hs-iv);text-decoration:underline}",
  ".e1 .e1-tuile-l{font-size:11px;color:var(--hs-iv2);margin-top:8px;line-height:1.6}.e1 .e1-tuile-l em{font-style:normal;color:var(--hs-iv3)}",
  ".e1 .e1-ban{border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.09);margin-top:14px}",
  ".e1 .e1-ban-ph{position:relative;aspect-ratio:21/8}.e1 .e1-ban-ph img{width:100%;height:100%;object-fit:cover;object-position:60% 30%;display:block}",
  ".e1 .e1-ban-ph:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#070A08 8%,rgba(7,10,8,.35) 70%,rgba(7,10,8,.1))}",
  ".e1 .e1-ban-t{position:absolute;inset-inline-start:16px;bottom:12px;z-index:2}.e1 .e1-ban-t b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:32px;line-height:1}.e1 .e1-ban-t span{font-size:11px;color:var(--hs-iv2)}",
  ".e1 .e1-ban ol{list-style:none;margin:0;padding:2px 14px 6px;background:#090d0b}",
  ".e1 .e1-ban li{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(243,238,228,.09);font-size:13px}.e1 .e1-ban li:last-child{border-bottom:none}",
  ".e1 .e1-ban li .k{width:20px;color:var(--hs-iv3);font-size:11px}.e1 .e1-ban li img{width:34px;height:34px;border-radius:9px;object-fit:cover;object-position:60% 35%}.e1 .e1-ban li .e1-th{flex:0 0 34px;width:34px;height:34px}",
  ".e1 .e1-ban li .q{flex:1;min-width:0}.e1 .e1-ban li .q small{display:block;color:var(--hs-iv2);font-size:11.5px}",
  ".e1 .hs-coll .hs-btn{border-radius:999px}",
  ".e1 .e1-compte select{flex:0 0 auto;width:auto;max-width:150px;border:1px solid rgba(243,238,228,.12)!important;border-radius:999px!important;padding:5px 26px 5px 12px;font-size:11.5px;color:var(--hs-iv2)}",
  ".e1 .e1-tour-ep{margin-top:2px}.e1 .e1-tour-ep select{padding:3px 32px 3px 12px!important;min-width:0;width:auto!important;min-height:0!important;height:30px;line-height:1;background-position:calc(100% - 15px) 12px,calc(100% - 10px) 12px!important}",
  /* iPhone : jamais moins de 16 px dans un champ, sinon l'écran zoome tout seul au toucher (règle Hype) */
  ".e1 input,.e1 select{font-size:16px!important}",
  ".e1 .e1-tour-ch select{padding-inline-end:22px!important;text-overflow:ellipsis}"
].join("\n");
function injecterCss2() {
  try { injecterCss(); if (document.getElementById(CSS2_ID)) return; var st = document.createElement("style"); st.id = CSS2_ID; st.textContent = CSS2; document.head.appendChild(st); } catch (e) { }
}

/* ── outils communs aux deux pages ── */
function hsCourbe(h, cls, d) {
  return h("svg", { className: "hs-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
    h("defs", null, h("linearGradient", { id: "hsg2-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
      h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
      h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
      h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
    cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
    h("path", { d: d, fill: "none", stroke: "url(#hsg2-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
}
function hsHero(h, o) {
  var ph = o.photo || PHOTOS_SAISON[0];
  return h("div", { className: "hs-hero" },
    (typeof SelecteurLangue === "function") ? h("div", { className: "hs-langue" }, h(SelecteurLangue, { compact: true })) : null,
    h("div", { className: "hs-in hs-hero-retour" },
      h("button", { type: "button", className: "hs-retour", onClick: o.retour }, h("i", null, "‹"), o.retourTxt)),
    hsCourbe(h, "c1", "M250 4 C 330 8, 385 40, 400 96"),
    h("div", { className: "hs-photo", style: { "--hs-pos": ph.pos } }, h("img", { src: ph.img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
    hsCourbe(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),
    h("div", { className: "hs-in" }, h("div", { className: "hs-titre" }, h("h1", { style: o.petit ? { fontSize: "clamp(34px,9.5vw,52px)", lineHeight: 1.05 } : null }, o.titre), o.sous ? h("p", null, o.sous) : null)));
}
function hsPhotoDe(id) {
  try { var p = window.__concoursPhoto; if (p && p.img) return p; } catch (e) { }
  var s = String(id || ""), n = 0; for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return PHOTOS_SAISON[n % PHOTOS_SAISON.length];
}
function hsDateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
function hsFmt(iso, o) { var d = hsDateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat("fr-FR", o).format(d); } catch (e) { return String(iso).slice(0, 10); } }
function hsPlage(ev) {
  var deb = String((ev && ev.date_jour) || "").slice(0, 10), fin = String((ev && ev.date_fin) || "").slice(0, 10);
  if (!deb) return "";
  if (!fin || fin === deb) { var t = hsFmt(deb, { weekday: "long", day: "numeric", month: "long" }); return t.charAt(0).toUpperCase() + t.slice(1); }
  var d1 = hsDateLoc(deb), d2 = hsDateLoc(fin);
  if (d1 && d2 && d1.getMonth() === d2.getMonth()) return "Du " + d1.getDate() + " au " + hsFmt(fin, { day: "numeric", month: "long" });
  return "Du " + hsFmt(deb, { day: "numeric", month: "long" }) + " au " + hsFmt(fin, { day: "numeric", month: "long" });
}
async function hsPeutGerer(clef) {
  try {
    if (typeof supa === "undefined" || !supa || !clef) return false;
    var r1 = await supa.rpc("hype_est_moderatrice");
    if (r1 && r1.data === true) return true;
    var r2 = await supa.rpc("hype_peut_gerer_club", { clef: clef });
    return !!(r2 && r2.data === true);
  } catch (e) { return false; }
}
function hsPhotoProfil(p) {
  var v = p && p.avatar_url;
  var s = v ? ((String(v).charAt(0) === "@") ? ((typeof CAV_IMGS !== "undefined" && CAV_IMGS[String(v).slice(1)]) || null) : v) : null;
  try { return s || ((typeof avatarHypeDefaut === "function") ? avatarHypeDefaut((p && (p.id || p.pseudo)) || "") : ""); } catch (e) { return s || ""; }
}

/* ════════════════════ LA FICHE CONCOURS ════════════════════ */
/* 04/11 22h57 (Blandine : « une cavalière qui n’est pas dans l’équipe … voir la liste et ce qu’elle prépare : on peut limiter ; elle a le
   droit de voir quand même les concours qui sont prévus ») — l’équipe et l’appartenance de la personne (membre du groupe, ou modératrice = la coach) */
var HS_EQUIPE = null;
async function hsEquipe() {
  if (HS_EQUIPE) return HS_EQUIPE;
  try {
    var rg = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom") : null;
    var G = rg && !rg.error && rg.data; if (!G || !G.id) return null;
    var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
    var membre = false;
    try { membre = !!u && (typeof estModerateurHype === "function") && estModerateurHype(u); } catch (eM) { }
    if (!membre && u && u.id) { var rm = await supa.from("groupes_membres").select("user_id").eq("groupe_id", G.id).eq("user_id", u.id).maybeSingle(); membre = !!(rm && rm.data); }
    HS_EQUIPE = { id: G.id, nom: G.nom || ((typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : "l’équipe"), membre: membre };
    return HS_EQUIPE;
  } catch (e) { return null; }
}
function EcranConcours() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return tr({ fr: fr }); }
  var rtl = (lg === "ar");
  var idEv = hsIdConcours();

  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _ins = React.useState(null); var inscrits = _ins[0], setInscrits = _ins[1];
  var _jv = React.useState(false); var jeViens = _jv[0], setJeViens = _jv[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _pe = React.useState(""); var pushEtat = _pe[0], setPushEtat = _pe[1];
  var _pm = React.useState(""); var pushMsg = _pm[0], setPushMsg = _pm[1];
  var _ge = React.useState(false); var gestion = _ge[0], setGestion = _ge[1];
  var _mg = React.useState([]); var mesEng = _mg[0], setMesEng = _mg[1];
  var _cs = React.useState([]); var consignes = _cs[0], setConsignes = _cs[1];
  var _hi = React.useState([]); var histo = _hi[0], setHisto = _hi[1];
  var _eq = React.useState(null); var equipe = _eq[0], setEquipe = _eq[1];
  var _rp = React.useState(""); var msgPrep = _rp[0], setMsgPrep = _rp[1];
  React.useEffect(function () { var vif = true; hsEquipe().then(function (q) { if (vif) setEquipe(q); }); return function () { vif = false; }; }, []);
  function prep(ecran) {
    if (equipe && !equipe.membre) { setMsgPrep("🔒 " + F("Réservé à l’équipe ") + equipe.nom + "."); setTimeout(function () { setMsgPrep(""); }, 3000); return; }
    ouvrir(ecran);
  }
  var _dv = React.useState(null); var enDirect = _dv[0], setEnDirect = _dv[1];
  var _vp = React.useState([]); var videos = _vp[0], setVideos = _vp[1];
  var _dvo = React.useState(false); var dvOcc = _dvo[0], setDvOcc = _dvo[1];
  /* 04/11 22h — le direct lu par Hype sur Winjump (fonction direct-concours) : elle ne voit que ses passages */
  function lireEnDirect() {
    setDvOcc(true);
    supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: idEv } }).then(function (r) {
      setDvOcc(false);
      if (r && !r.error && r.data && !r.data.erreur) setEnDirect(r.data);
    }).catch(function () { setDvOcc(false); });
  }
  React.useEffect(function () {
    if (ev && mesEng.length && /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String(ev.lien_direct || ""))) lireEnDirect();
  }, [ev && ev.lien_direct, mesEng.length]);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function chargerInscrits(u) {
    (async function () {
      try {
        var r = await supa.from("agenda_inscriptions").select("user_id, cree_le").eq("agenda_id", idEv).order("cree_le");
        var ids = ((r && r.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);
        setJeViens(!!(u && ids.indexOf(u.id) >= 0));
        if (!ids.length) { setInscrits([]); return; }
        var rp = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", ids);
        var parId = {}; ((rp && rp.data) || []).forEach(function (x) { parId[x.id] = x; });
        setInscrits(ids.map(function (i) { return parId[i] || { id: i, pseudo: "?" }; }));
      } catch (eI) { setInscrits([]); }
    })();
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) { setErreur(F("Concours introuvable.")); return; }
        if (typeof supa === "undefined" || !supa) { setErreur(F("Pas de connexion.")); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        if (vif) setMoi(u);
        var r = await chargerAgendaEvenement(idEv);
        if (r && r.error) throw new Error(String(r.error.message || r.error));
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        if (vif) setEv(r.data);
        chargerInscrits(u);
        hsPeutGerer(r.data.club_clef).then(function (g) { if (vif) setGestion(g); });
        /* 04/11 22h15 — vidéos de parcours : celles publiées sur le fil du concours (cible « agenda:<id> ») */
        try {
          var rv = await supa.from("commentaires").select("id, user_id, photo_url, medias, prive, created_at").eq("cible", "agenda:" + idEv).order("created_at", { ascending: false }).limit(200);
          var vids = [];
          ((rv && !rv.error && rv.data) || []).forEach(function (po) {
            if (po.prive && !(u && po.user_id === u.id)) return;
            [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (m) { if (hsEstVideo(m)) vids.push({ media: String(m), proprio: po.user_id, le: po.created_at }); });
          });
          var idsA = []; vids.forEach(function (v) { if (v.proprio && idsA.indexOf(v.proprio) === -1) idsA.push(v.proprio); });
          if (idsA.length) { var rpa = await supa.from("profiles").select("id, pseudo").in("id", idsA); var pa = {}; ((rpa && rpa.data) || []).forEach(function (x) { pa[x.id] = x.pseudo; }); vids.forEach(function (v) { v.pseudo = pa[v.proprio] || ""; }); }
          if (vif) setVideos(vids);
        } catch (eV) { }
        if (u && u.id) {
          try {
            var re = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).eq("cavalier_id", u.id);
            var mes = (re && !re.error && re.data) || [];
            if (vif) setMesEng(mes);
            /* 04/11 (étape 3) : consignes de ses chevaux engagés (cheval_consignes, mêmes droits que Santé)
               et l'historique du couple (resultats : elle + ce cheval). Une lecture refusée = section absente. */
            var idsCh = [];
            mes.forEach(function (e) { [e.cheval1_id, e.cheval2_id].forEach(function (c) { if (c && idsCh.indexOf(c) === -1) idsCh.push(c); }); });
            if (idsCh.length) {
              try {
                var rcs = await supa.from("cheval_consignes").select("cheval_id, enrenement, materiel, soins").in("cheval_id", idsCh);
                if (vif && rcs && !rcs.error) setConsignes(rcs.data || []);
              } catch (eCs) { }
              try {
                var rh = await supa.from("resultats").select("id, concours, epreuve, date_epreuve, classement, place, partants, cheval_id").eq("cavalier_id", u.id).in("cheval_id", idsCh).order("date_epreuve", { ascending: false }).limit(12);
                if (vif && rh && !rh.error) setHisto(rh.data || []);
              } catch (eH) { }
            }
          } catch (eE) { }
        }
      } catch (eL) { if (vif) setErreur(String((eL && eL.message) || eL)); }
    })();
    try { Promise.resolve(hypePushEtat()).then(function (e) { if (vif) setPushEtat(e); }).catch(function () { }); } catch (eP) { }
    return function () { vif = false; };
  }, [idEv]);

  async function basculerJeViens() {
    if (!ev || occupe) return;
    if (!moi || !moi.id) { setMsg(F("Connecte-toi pour t’inscrire.")); return; }
    setOccupe(true); setMsg("");
    try {
      var r = jeViens
        ? await supa.from("agenda_inscriptions").delete().eq("agenda_id", ev.id).eq("user_id", moi.id).select("user_id")
        : await supa.from("agenda_inscriptions").insert({ agenda_id: ev.id, user_id: moi.id }).select("user_id");
      if (r && r.error) setMsg(F("La base a refusé : ") + String(r.error.message || r.error));
      else if (!r || !r.data || !r.data.length) setMsg(F("Rien n’a été enregistré."));
      chargerInscrits(moi);
    } catch (eB) { setMsg(String(eB)); }
    setOccupe(false);
  }
  async function basculerPush() {
    setPushMsg("");
    try {
      if (!hypePushPossible()) { setPushMsg(F("Ce téléphone ne sait pas recevoir les notifications de Hype.")); return; }
      if (!hypePushInstallee()) { setPushMsg(F("Sur iPhone, ajoute d’abord Hype à ton écran d’accueil (bouton Partager → Sur l’écran d’accueil), puis reviens ici.")); return; }
      if (pushEtat === "actif") { var rc = await hypePushCouper(); setPushEtat(await hypePushEtat()); if (rc && rc.error) setPushMsg(String(rc.error)); else setPushMsg(F("Alertes coupées sur ce téléphone.")); return; }
      var r = await hypePushActiver();
      setPushEtat(await hypePushEtat());
      if (r && r.error) { setPushMsg(r.error === "refuse" ? F("Les notifications ont été refusées. Tu peux les réautoriser dans Réglages → Notifications → Hype.") : (r.error === "connexion" ? F("Connecte-toi d’abord.") : String(r.error))); return; }
      setPushMsg(F("C’est activé. Tu seras prévenue avant le départ et avant la reconnaissance."));
    } catch (eP) { setPushMsg(String(eP)); }
  }

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("ma-saison"); }
  /* 07/11 : le fil, les photos et les résultats sont maintenant SUR cette fiche (page du rendez-vous intégrée en bas) */
  function ficheComplete() { try { var el = document.getElementById("hs-fil"); if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; } } catch (e) { } }
  function modifierRdv() { try { window.__agendaFiche = idEv; window.__agendaFicheDirect = true; window.__agendaFicheRetour = "concours"; } catch (e) { } setEcran("guilde"); }
  function ouvrirEngagements() { try { window.__engagementsId = idEv; } catch (e) { } setEcran("engagements"); }
  function ouvrir(ecran) { try { window.__concoursId = idEv; window.__engagementsId = idEv; } catch (e) { } setEcran(ecran); }

  var photo = hsPhotoDe(idEv);
  var hero = hsHero(h, { photo: photo, retour: retour, retourTxt: F("Ma saison"), titre: (ev && ev.titre) || F("Concours"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "", petit: !!(ev && String(ev.titre || "").length > 14) });
  if (!ev) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" },
    erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Impossible d’ouvrir ce concours : ") + erreur) : h("div", { className: "hs-attente", "aria-busy": "true" }, "…")));

  var horaires = [
    { k: F("Rendez-vous"), v: ev.heure },
    { k: F("Embarquement"), v: ev.heure_embarquement },
    { k: F("Départ"), v: ev.heure_depart, alerte: true },
    { k: F("Reconnaissance"), v: ev.heure_reco, alerte: true },
    { k: F("Début de l’épreuve"), v: ev.heure_epreuve }
  ].filter(function (x) { return x.v && String(x.v).trim(); });
  var aAlerte = horaires.some(function (x) { return x.alerte; });
  var lienPlan = ev.lieu ? ("https://maps.apple.com/?q=" + encodeURIComponent(ev.lieu)) : null;
  var fini = String(ev.date_fin || ev.date_jour || "").slice(0, 10) < (function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      /* 04/11 23h25 (Blandine : « pas intuitif, 4 fois que je m'y reprends ») : les outils de la coach EN HAUT de la fiche */
      gestion ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Pour la coach"))),
        h("button", { type: "button", className: "hs-btn plein", onClick: ouvrirEngagements }, F("Engagements et feuille SEP")),
        h("div", { className: "hs-duo" },
          h("button", { type: "button", className: "hs-btn", onClick: function () { ouvrir("jour-j"); } }, F("Jour J : passages")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { ouvrir("dossier-concours"); } }, F("Le dossier"))),
        h("button", { type: "button", className: "hs-lien", style: { marginTop: 10 }, onClick: modifierRdv }, F("Modifier le rendez-vous (titre, date, horaires, affiche) ›"))) : null,
      /* infos pratiques */
      h("div", { className: "hs-sec" }, h("b", null, F("Infos pratiques"))),
      h("div", { className: "hs-carte" },
        h("div", { className: "hs-row" },
          h("div", { className: "g" }, h("span", null, F("Lieu")), h("b", null, ev.lieu || F("Pas encore indiqué"))),
          lienPlan ? h("a", { href: lienPlan, target: "_blank", rel: "noopener" }, F("Itinéraire") + (rtl ? " ‹" : " ›")) : null),
        horaires.length ? horaires.map(function (x, i) {
          return h("div", { key: i, className: "hs-row" }, h("div", { className: "g" }, h("b", null, x.k), x.alerte ? h("span", null, F("alerte 15 min avant")) : null), h("span", { className: "d" }, x.v));
        }) : h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Les horaires ne sont pas encore indiqués."))))),
      /* mon engagement */
      /* 04/11 (étape 3) MA JOURNÉE : ses épreuves, son cheval, son heure de passage et sa piste (saisies par la coach) */
      mesEng.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ma journée"))),
        h("div", { className: "hs-carte" }, mesEng.reduce(function (acc, e) {
          if (e.epreuve1 || e.cheval1_nom) acc.push({ ep: e.epreuve1, ch: e.cheval1_nom, hp: e.passage1, pi: e.piste1, maj: e.passage_maj_le });
          if (e.epreuve2 || e.cheval2_nom) acc.push({ ep: e.epreuve2, ch: e.cheval2_nom, hp: e.passage2, pi: e.piste2, maj: e.passage_maj_le });
          return acc;
        }, []).sort(function (a, b) { return hsMinutes(a.hp) - hsMinutes(b.hp); }).map(function (x, i) {
          var recent = x.maj && (Date.now() - new Date(x.maj).getTime() < 36 * 3600 * 1000);
          return h("div", { key: i, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, x.ep || F("Épreuve à venir")),
              h("span", null, [x.ch ? F("avec ") + x.ch : "", x.pi ? F("piste ") + x.pi : ""].filter(Boolean).join(" · ")),
              (x.hp && recent) ? h("span", { style: { color: "#C9A66B" } }, F("heure mise à jour par ta coach")) : null),
            h("span", { className: "d" }, x.hp || F("heure à venir")));
        }))) : null,
      /* le direct (Winjump) : son numéro, son heure estimée, son résultat */
      (enDirect && enDirect.lignes && enDirect.lignes.length) ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("En direct")),
          h("button", { type: "button", className: "hs-lien", disabled: dvOcc, onClick: lireEnDirect }, dvOcc ? "…" : F("Actualiser"))),
        h("div", { className: "hs-carte" }, enDirect.lignes.map(function (d, i) {
          var res = d.clt ? (d.clt + (d.clt === "1" ? "re" : "e") + (d.points !== "" ? " · " + d.points + " pt" : "") + (d.temps ? " · " + d.temps + " s" : "")) : "";
          return h("div", { key: i, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, d.epreuve), h("span", null, [d.cheval, F("n° ") + d.ordre + F(" sur ") + d.engages, d.heure_estimee ? F("vers ") + d.heure_estimee : ""].filter(Boolean).join(" · "))),
            h("span", { className: "d", style: { fontSize: 13 } }, res || F("à venir")));
        })),
        h("div", { className: "hs-note" }, F("Lu par Hype chez le chronométreur. Heure estimée, résultats provisoires pendant le concours."))) : null,
      /* consignes de son cheval (page Santé du cheval) */
      consignes.filter(function (c) { return c.enrenement || c.materiel || c.soins; }).map(function (c) {
        var nomC = ""; mesEng.forEach(function (e) { if (e.cheval1_id === c.cheval_id) nomC = e.cheval1_nom || nomC; if (e.cheval2_id === c.cheval_id) nomC = e.cheval2_nom || nomC; });
        return h("div", { key: "cs" + c.cheval_id },
          h("div", { className: "hs-sec" }, h("b", null, F("Consignes pour ") + (nomC || F("ton cheval")))),
          h("div", { className: "hs-carte" },
            c.materiel ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Matériel")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.materiel))) : null,
            c.enrenement ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Enrênement")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.enrenement))) : null,
            c.soins ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Soins")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.soins))) : null));
      }),
      /* vidéos de parcours, à commenter */
      h("div", { className: "hs-sec" }, h("b", null, F("Vidéos de parcours")), h("button", { type: "button", className: "hs-lien", onClick: ficheComplete }, F("+ Ajouter"))),
      videos.length ? h("div", { className: "hs-tiles" }, videos.slice(0, 9).map(function (v, i) {
        return h("button", { type: "button", key: i, className: "hs-tile", style: { height: 96, backgroundImage: hsVignetteVideo(v.media) ? "url(" + hsVignetteVideo(v.media) + ")" : "none" }, onClick: function () { try { window.__videoParcours = { media: v.media, proprio: v.proprio, pseudo: v.pseudo, agenda: idEv, titre: ev.titre }; } catch (e) { } setEcran("video-parcours"); } },
          h("span", null, "▶ " + (v.pseudo || "")));
      })) : h("div", { className: "hs-vide" }, F("Pas encore de vidéo. Ajoute-la sur le fil du concours : ta coach pourra la commenter seconde par seconde.")),
      /* sa préparation */
      !fini ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ma préparation"))),
        h("div", { className: "hs-carte" },
          h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("liste-van"); } },
            h("div", { className: "g" }, h("b", null, F("Ma liste du van")), h("span", null, F("à cocher, gardée d’un concours à l’autre"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›")),
          h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("dossier-concours"); } },
            h("div", { className: "g" }, h("b", null, F("Le dossier")), h("span", null, F("licence, vaccins du cheval, papiers"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›"))),
        msgPrep ? h("div", { className: "hs-msg" }, msgPrep) : null) : null,
      /* résultats en direct (lien posé par la coach) */
      ev.lien_direct ? h("div", { style: { marginTop: 14 } },
        h("a", { className: "hs-btn plein", href: ev.lien_direct, target: "_blank", rel: "noopener", style: { textDecoration: "none" } }, F("Résultats en direct"))) : null,
      /* historique du couple */
      histo.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ton historique avec ce cheval"))),
        h("div", { className: "hs-carte" }, histo.map(function (r) {
          var pl = r.place ? (r.place + (r.place === 1 ? "re" : "e") + (r.partants ? " / " + r.partants : "")) : (r.classement || "");
          return h("div", { key: r.id, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, r.concours || F("Concours")), h("span", null, [r.epreuve, hsFmt(r.date_epreuve, { day: "numeric", month: "short", year: "numeric" })].filter(Boolean).join(" · "))),
            pl ? h("span", { className: "d", style: { fontSize: 13 } }, pl) : null);
        }))) : null,
      /* je participe + alertes */
      h("div", { className: "hs-sec" }, h("b", null, F("Je participe"))),
      fini ? h("div", { className: "hs-vide" }, F("Ce concours est terminé.")) : h("div", null,
        h("button", { type: "button", className: "hs-btn" + (jeViens ? " plein" : ""), disabled: occupe, onClick: basculerJeViens }, jeViens ? F("✓ Tu participes") : F("Je participe")),
        jeViens ? h("div", { className: "hs-note" }, F("Touche encore pour te retirer.")) : null,
        h("button", { type: "button", className: "hs-btn doux", style: { marginTop: 10 }, onClick: basculerPush }, pushEtat === "actif" ? F("✓ Alertes activées sur ce téléphone") : F("Me prévenir (alertes)")),
        h("div", { className: "hs-note" }, aAlerte
          ? F("Si tu participes et que les alertes sont activées, Hype te prévient 15 minutes avant le départ et avant la reconnaissance.")
          : F("Les alertes partiront dès que l’heure de départ ou de reconnaissance sera indiquée.")),
        msg ? h("div", { className: "hs-msg" }, msg) : null,
        pushMsg ? h("div", { className: "hs-msg" }, pushMsg) : null),
      inscrits && inscrits.length ? h("div", { className: "hs-carte", style: { marginTop: 14 } },
        h("div", { className: "hs-row" }, h("div", { className: "g" }, h("b", null, inscrits.length + (inscrits.length > 1 ? F(" cavalières participent") : F(" cavalière participe"))))),
        h("div", { className: "hs-av" }, inscrits.map(function (p) { return h("span", { key: p.id }, h("img", { src: hsPhotoProfil(p), alt: "" }), p.pseudo || "?"); }))) : null,
      /* ce qu'il faut savoir */
      ev.description ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ce qu’il faut savoir"))),
        h("div", { className: "hs-carte" }, h("div", { className: "hs-texte" }, ev.description))) : null,
      (typeof HypeVideosEquipeConcours === "function" && idEv) ? h(HypeVideosEquipeConcours, { key: "vq" + idEv, agendaId: idEv }) : null,   /* 07/11 nuit : vidéos de l'équipe rattachées à ce concours (index.html) */
      /* 07/11 (Blandine : « ajoute à la page Versailles les fonctionnalités de la page rendez-vous ») : photos et vidéos,
         résultats, publications et commentaires, partage et suppression — la page du rendez-vous, intégrée ici */
      h("div", { className: "hs-sec" }, h("b", null, fini ? F("Photos, résultats et commentaires") : F("Photos et commentaires"))),
      (function () { try { window.__evPasse = null; window.__evPasseId = idEv; } catch (eW) { } return null; })(),
      (typeof EcranEvenementPasse !== "undefined") ? h(EcranEvenementPasse, { key: "ep" + idEv, integre: true }) : null,
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ LA PAGE ENGAGEMENTS (coach) ════════════════════ */
/* 04/11 23h54 (Blandine : « ça a rempli la feuille SEP avec les pseudos ; elles sont liées à leur compte avec leur nom,
   prénom réels et parfois leur licence : quand j'ajoute Masure, que ça remplisse Maëlys Masure, sa licence… »).
   Sources, dans l'ordre : ce que la coach a déjà corrigé (cavaliers_licences, si ce n'est pas juste le pseudo),
   puis le nom FFE rattaché au compte (cavaliers_ffe, « MAELYS MASURE » → « MASURE Maelys »), puis noms_ffe ;
   licence : cavaliers_licences, puis noms_ffe, puis la demande de résultats. */
/* 05/11 00h16 (Blandine : « les trois tout de suite ») — LIRE UNE FICHE D'ENGAGEMENT (photo, capture ou PDF) :
   même chemin que la lecture d'un carnet de vaccins (hey-baby-vision, mode « perception » en différé). L'IA rend une
   liste ; rien n'est ajouté sans que la coach coche et touche « Ajouter ». */
async function hsLireFiche(images) {
  var sess = await supa.auth.getSession();
  var sv = sess && sess.data && sess.data.session;
  if (!sv || !sv.access_token) throw new Error("session");
  var system = "Tu lis une feuille d'engagement de concours d'equitation (tableau CAVALIERS / Licence / Ep. / CHEVAL / Ep. / CHEVAL), en photo, capture ou PDF. "
    + "Reponds UNIQUEMENT en JSON : {\"cavaliers\":[{\"nom\":\"NOM Prenom recopie tel quel\",\"licence\":\"numero recopie tel quel ou vide\",\"epreuve1\":\"\",\"cheval1\":\"\",\"epreuve2\":\"\",\"cheval2\":\"\"}]}. "
    + "Une ligne par cavalier ecrit sur la feuille, dans l'ordre. Recopie les accents. N'invente RIEN : case vide ou illisible = chaine vide. Ignore le chef d'equipe et le tableau des montants.";
  var blocs = (Array.isArray(images) ? images : [images]).map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
  blocs.push({ type: "text", text: "Liste les cavaliers de cette feuille." });
  var corps = { mode: "perception", stream: false, differe: true, system: system, messages: [{ role: "user", content: blocs }] };
  var rep = await fetch(String(SUPABASE_URL).replace(/\/+$/, "") + "/functions/v1/hey-baby-vision", { method: "POST", headers: { "Content-Type": "application/json", "apikey": CLE_PUBLISHABLE, "Authorization": "Bearer " + sv.access_token }, body: JSON.stringify(corps) });
  var data = null; try { data = await rep.json(); } catch (e) { }
  var texte = "";
  if (rep.ok && data && data.ok && data.differe && data.jobId) {
    var t0 = Date.now(), fini = null;
    while (!fini && Date.now() - t0 < 300000) {
      await new Promise(function (r) { setTimeout(r, 3000); });
      try { var rj = await supa.from("heybaby_analyses").select("statut, resultat, erreur_code, erreur_message").eq("id", data.jobId).single(); if (rj && !rj.error && rj.data && rj.data.statut !== "en_cours") fini = rj.data; } catch (eJ) { }
    }
    if (!fini) throw new Error("délai dépassé");
    if (fini.statut !== "termine") throw new Error((fini.erreur_code || "erreur") + " " + (fini.erreur_message || ""));
    texte = String(fini.resultat || "");
  } else if (rep.ok && data && data.ok && data.content) {
    texte = (data.content || []).map(function (b) { return (b && b.text) || ""; }).join("");
  } else {
    if (data && data.code === "PREMIUM_REQUIRED") throw new Error("lecture réservée aux abonnés Premium");
    throw new Error("HTTP " + rep.status + " " + ((data && (data.code || data.message)) || ""));
  }
  var m = texte.match(/\{[\s\S]*\}/);
  var o = JSON.parse(m ? m[0] : texte);
  return (o && Array.isArray(o.cavaliers)) ? o.cavaliers : [];
}
/* 07/11 02h28 (Blandine : « ajoute la possibilité de lire les infos, comme l'outil des événements : qu'on puisse lui mettre une photo
   avec les numéros et heures d'épreuve et qu'il prépare tout ») — LIRE UNE PHOTO DU PROGRAMME OU DE LA LISTE DE DÉPART (photo,
   capture ou PDF), même chemin que la lecture de la fiche d'engagement (hey-baby-vision, perception en différé). Rien n'est
   enregistré sans « Appliquer » puis « Enregistrer ». */
async function hsLireProgramme(images, equipe) {
  var sess = await supa.auth.getSession();
  var sv = sess && sess.data && sess.data.session;
  if (!sv || !sv.access_token) throw new Error("session");
  var system = "Tu lis le programme ou une liste de depart d'un concours d'equitation (photo, capture d'ecran ou page de PDF). "
    + "Reponds UNIQUEMENT en JSON : {\"epreuves\":[{\"numero\":\"numero de l'epreuve ou vide\",\"nom\":\"nom recopie (ex. Club 3 Grand Prix)\",\"heure\":\"heure de debut HHhMM ou vide\",\"piste\":\"piste ou carriere ou vide\",\"jour\":\"AAAA-MM-JJ ou vide\"}],"
    + "\"passages\":[{\"epreuve\":\"nom ou numero de l'epreuve\",\"ordre\":\"numero d'ordre de passage ou vide\",\"heure\":\"heure de passage HHhMM ou vide\",\"cavalier\":\"nom du cavalier recopie\",\"cheval\":\"nom du cheval recopie\",\"piste\":\"piste ou vide\"}]}. "
    + "Les passages : seulement les lignes de ces cavaliers s'ils apparaissent (sinon aucune) : " + JSON.stringify((equipe || []).slice(0, 40)) + ". "
    + "Recopie exactement ce qui est ecrit. N'invente RIEN : case illisible ou absente = chaine vide.";
  var blocs = (Array.isArray(images) ? images : [images]).map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
  blocs.push({ type: "text", text: blocs.length > 1 ? "Ces images sont les pages d'un meme document. Lis les epreuves et les passages." : "Lis les epreuves et les passages de cette image." });
  var corps = { mode: "perception", stream: false, differe: true, system: system, messages: [{ role: "user", content: blocs }] };
  var rep = await fetch(String(SUPABASE_URL).replace(/\/+$/, "") + "/functions/v1/hey-baby-vision", { method: "POST", headers: { "Content-Type": "application/json", "apikey": CLE_PUBLISHABLE, "Authorization": "Bearer " + sv.access_token }, body: JSON.stringify(corps) });
  var data = null; try { data = await rep.json(); } catch (e) { }
  var texte = "";
  if (rep.ok && data && data.ok && data.differe && data.jobId) {
    var t0 = Date.now(), fini = null;
    while (!fini && Date.now() - t0 < 300000) {
      await new Promise(function (r) { setTimeout(r, 3000); });
      try { var rj = await supa.from("heybaby_analyses").select("statut, resultat, erreur_code, erreur_message").eq("id", data.jobId).single(); if (rj && !rj.error && rj.data && rj.data.statut !== "en_cours") fini = rj.data; } catch (eJ) { }
    }
    if (!fini) throw new Error("délai dépassé");
    if (fini.statut !== "termine") throw new Error((fini.erreur_code || "erreur") + " " + (fini.erreur_message || ""));
    texte = String(fini.resultat || "");
  } else if (rep.ok && data && data.ok && data.content) {
    texte = (data.content || []).map(function (b) { return (b && b.text) || ""; }).join("");
  } else {
    if (data && data.code === "PREMIUM_REQUIRED") throw new Error("lecture réservée aux abonnés Premium");
    throw new Error("HTTP " + rep.status + " " + ((data && (data.code || data.message)) || ""));
  }
  var m = texte.match(/\{[\s\S]*\}/);
  var o = JSON.parse(m ? m[0] : texte) || {};
  return { epreuves: Array.isArray(o.epreuves) ? o.epreuves : [], passages: Array.isArray(o.passages) ? o.passages : [] };
}
/* même personne ? (mots sans accents ni ordre : « MASURE Maelys » = « Maelys MASURE » ; « Aurélie » seul = « BUSSONNAIS Aurélie ») */
function hsMemePers(a, b) {
  function mots(x) { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(function (w) { return w.length > 1; }); }
  var A = mots(a), B = mots(b); if (!A.length || !B.length) return false;
  var court = A.length <= B.length ? A : B, long = A.length <= B.length ? B : A;
  return court.length >= 2 ? court.every(function (w) { return long.indexOf(w) !== -1; }) : (court[0].length >= 4 && long.indexOf(court[0]) !== -1 && long.length <= 2);
}
function hsNomSep(ffe) {
  var m = String(ffe || "").trim().split(/\s+/).filter(Boolean); if (!m.length) return "";
  if (m.length === 1) return m[0].toUpperCase();
  function cap(w) { return w.toLowerCase().replace(/(^|[-'’])(\S)/g, function (x, a, b) { return a + b.toUpperCase(); }); }
  /* 05/11 00h07 : comme sur la fiche SEP de Blandine : NOM Prénom — « MASURE Maelys » (le build 0215 avait inversé à tort) */
  return m.slice(1).join(" ").toUpperCase() + " " + cap(m[0]);
}
async function hsInfosReelles(ids) {
  var out = {}; ids = (ids || []).filter(Boolean); if (!ids.length || typeof supa === "undefined" || !supa) return out;
  ids = ids.slice(0, 400);
  function pose(id, k, v) { if (!v) return; out[id] = out[id] || {}; if (!out[id][k]) out[id][k] = v; }
  try { var r1 = await supa.from("cavaliers_ffe").select("user_id, nom").in("user_id", ids); ((r1 && r1.data) || []).forEach(function (x) { pose(x.user_id, "nom", hsNomSep(x.nom)); }); } catch (e1) { }
  try { var r2 = await supa.from("noms_ffe").select("user_id, nom_ffe, licence").in("user_id", ids); ((r2 && r2.data) || []).forEach(function (x) { pose(x.user_id, "nom", hsNomSep(x.nom_ffe)); pose(x.user_id, "licence", String(x.licence || "").trim()); }); } catch (e2) { }
  try { var r3 = await supa.from("demandes_resultats").select("user_id, nom_ffe, licence").in("user_id", ids); ((r3 && r3.data) || []).forEach(function (x) { pose(x.user_id, "nom", hsNomSep(x.nom_ffe)); pose(x.user_id, "licence", String(x.licence || "").trim()); }); } catch (e3) { }
  return out;
}
/* le nom gardé par la coach compte seulement s'il n'est pas juste le pseudo */
function hsNomChoisi(garde, pseudo, reel) {
  var g = String(garde || "").trim();
  function mots(x) { return String(x || "").toLowerCase().split(/\s+/).filter(Boolean).sort().join(" "); }
  /* le même nom dans l'autre ordre (« MASURE Maelys ») = pas une correction de la coach : on reprend l'ordre FFE */
  if (g && reel && mots(g) === mots(reel)) return reel;
  if (g && g.toLowerCase() !== String(pseudo || "").trim().toLowerCase()) return g;
  return reel || g || String(pseudo || "").trim();
}
/* 04/11 23h31 (Blandine : « impose un espace entre l'épreuve et l'indice : Club 3, Amat 2 ; si on l'oublie, mets-le toi ») */
function hsNomEpreuve(t) {
  return String(t || "").replace(/([A-Za-zÀ-ÿ])(\d)/g, "$1 $2").replace(/(\d)([A-Za-zÀ-ÿ]{2,})/g, "$1 $2").replace(/\s+/g, " ").trim();
}
function EcranEngagements() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return tr({ fr: fr }); }
  var rtl = (lg === "ar");
  var idEv = hsIdConcours();

  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _ge = React.useState(null); var gestion = _ge[0], setGestion = _ge[1];
  var _fe = React.useState(null); var feuille = _fe[0], setFeuille = _fe[1];
  var _li = React.useState(null); var lignes = _li[0], setLignes = _li[1];
  var _sup = React.useState([]); var supprimees = _sup[0], setSupprimees = _sup[1];
  var _ca = React.useState([]); var candidates = _ca[0], setCandidates = _ca[1];
  var _ch = React.useState([]); var chevaux = _ch[0], setChevaux = _ch[1];
  var _nep = React.useState(""); var nouvelleEp = _nep[0], setNouvelleEp = _nep[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _mod = React.useState(false); var modifie = _mod[0], setModifie = _mod[1];
  var _vf = React.useState(false); var voirFeuille = _vf[0], setVoirFeuille = _vf[1];
  var _ech = React.useState(false); var editChef = _ech[0], setEditChef = _ech[1];   /* 05/11 visuel 1 : chef d’équipe en modification */
  var _ecv = React.useState({}); var editCav = _ecv[0], setEditCav = _ecv[1];       /* cartes cavalières ouvertes (nom, licence) */
  var _aep = React.useState(false); var ajoutEp = _aep[0], setAjoutEp = _aep[1];    /* champ « nouvelle épreuve » ouvert */
  var _rn = React.useState(null); var rechNum = _rn[0], setRechNum = _rn[1];   /* 04/11 23h57 : recherche du n° de concours { etat, liste, msg } */
  var _lb = React.useState({}); var libres = _lb[0], setLibres = _lb[1];   /* « Autre cheval » : saisie libre */
  var _tm = React.useState(function () { try { return Number(localStorage.getItem("hype_tours_max")) || 3; } catch (e) { return 3; } }); var toursMax = _tm[0], setToursMax = _tm[1];
  var _lf = React.useState(null); var lus = _lf[0], setLus = _lf[1];        /* fiche lue : [{nom, licence, …, compte, coche}] */
  var _lfe = React.useState(""); var lecture = _lfe[0], setLecture = _lfe[1]; /* "" | "en_cours" | message */
  var _vu = React.useState("couples"); var vue = _vu[0], setVue = _vu[1];   /* onglets : couples (cavalières + chevaux) / épreuves / grille */
  /* 07/11 02h05 : l'ordre de passage lu chez le chronométreur (Winjump, fonction direct-concours) sert au récapitulatif tant que la
     coach n'a pas saisi les heures dans Jour J : « engagement|cheval » → { ordre, h (heure estimée) }. Rien n'est enregistré. */
  var _od = React.useState({}); var ordreLu = _od[0], setOrdreLu = _od[1];
  React.useEffect(function () {
    var vif = true;
    if (!ev || !/^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String(ev.lien_direct || "")) || !lignes || !lignes.length) return;
    if (lignes.every(function (l) { return (!l.cheval1_nom || l.passage1) && (!l.cheval2_nom || l.passage2); })) return;
    try {
      supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: ev.id } }).then(function (r) {
        var d = r && r.data; if (!vif || !d || !d.lignes) return;
        var m = {}; d.lignes.forEach(function (x) { if (x && x.engagement && x.cheval) m[x.engagement + "|" + String(x.cheval).trim().toLowerCase()] = { ordre: x.ordre, h: x.heure_estimee || "" }; });
        setOrdreLu(m);
      }).catch(function () { });
    } catch (eD) { }
    return function () { vif = false; };
  }, [ev && ev.lien_direct, lignes ? lignes.length : 0]);
  var _moi = React.useState(null); var moiId = _moi[0], setMoiId = _moi[1];
  var _rq = React.useState(""); var recherche = _rq[0], setRecherche = _rq[1];
  var _rh = React.useState([]); var trouves = _rh[0], setTrouves = _rh[1];   /* autres comptes Hype trouvés par la recherche */

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  /* recherche d'une autre cavalière : dans les listes déjà chargées, puis parmi tous les comptes Hype */
  React.useEffect(function () {
    var t = String(recherche || "").trim(); if (t.length < 2 || typeof supa === "undefined" || !supa) { setTrouves([]); return; }
    var vif = true, minu = setTimeout(async function () {
      try {
        var r = await supa.from("profiles").select("id, pseudo, avatar_url").ilike("pseudo", "%" + t.replace(/[%_]/g, "") + "%").limit(12);
        var l = ((r && r.data) || []).map(function (p) { return { id: p.id, pseudo: p.pseudo || "", avatar_url: p.avatar_url || null, src: "hype", nom: "", licence: "" }; });
        var ids = l.map(function (p) { return p.id; });
        if (ids.length) {
          var rl = await supa.from("cavaliers_licences").select("user_id, nom, licence").in("user_id", ids), gl = {}; ((rl && rl.data) || []).forEach(function (x) { gl[x.user_id] = x; });
          var re = await hsInfosReelles(ids);
          l.forEach(function (p) { var g = gl[p.id] || {}, r = re[p.id] || {}; p.nom = hsNomChoisi(g.nom, p.pseudo, r.nom); p.licence = g.licence || r.licence || ""; });
        }
        if (vif) setTrouves(l);
      } catch (e) { if (vif) setTrouves([]); }
    }, 300);
    return function () { vif = false; clearTimeout(minu); };
  }, [recherche]);

  function clefDe(n) { try { return (typeof clefClubG === "function") ? clefClubG(n) : String(n || "").toLowerCase().trim(); } catch (e) { return String(n || "").toLowerCase().trim(); } }
  function nomFfeDe(pseudo) { return String(pseudo || "").trim(); }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        if (typeof supa === "undefined" || !supa) throw new Error(F("pas de connexion"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        var E = r.data; if (vif) setEv(E);
        var g = await hsPeutGerer(E.club_clef);
        if (vif) setGestion(g);
        if (vif && u && u.id) setMoiId(u.id);
        if (!g) return;
        /* l'en-tête de la feuille (ou des valeurs de départ) */
        var rf = await supa.from("concours_feuille").select("*").eq("agenda_id", idEv).maybeSingle();
        if (rf && rf.error) throw new Error(F("feuille : ") + (rf.error.message || rf.error));
        var Fe = (rf && rf.data) || null;
        if (!Fe) {
          Fe = { agenda_id: idEv, epreuves: [], discipline: "CSO", numero: "", prix: "", transport: "", facturer_le: "", faits_le: "", chef_nom: "", chef_licence: "" };
          if (u && u.id) {
            try { var rl0 = await supa.from("cavaliers_licences").select("nom, licence").eq("user_id", u.id).maybeSingle(); if (rl0 && rl0.data) { Fe.chef_nom = rl0.data.nom || ""; Fe.chef_licence = rl0.data.licence || ""; } } catch (eC) { }
          }
          Fe.__nouvelle = true;
        } else if (!String(Fe.chef_nom || "").trim() && u && u.id) {
          /* 05/11 (Blandine : « pré-remplir à chaque fois numéro licence du coach et nom prénom, modifiable ») */
          try { var rl1 = await supa.from("cavaliers_licences").select("nom, licence").eq("user_id", u.id).maybeSingle(); if (rl1 && rl1.data) { Fe.chef_nom = rl1.data.nom || ""; Fe.chef_licence = Fe.chef_licence || rl1.data.licence || ""; } } catch (eC1) { }
        }
        Fe.epreuves = (Fe.epreuves || []).map(hsNomEpreuve).filter(function (x, j, a) { return x && a.indexOf(x) === j; });
        if (vif) setFeuille(Fe);
        /* les lignes déjà enregistrées */
        var rl = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true });
        if (rl && rl.error) throw new Error(F("engagements : ") + (rl.error.message || rl.error));
        var L = (rl && rl.data) || [];
        L.forEach(function (l) { if (l.epreuve1) l.epreuve1 = hsNomEpreuve(l.epreuve1); if (l.epreuve2) l.epreuve2 = hsNomEpreuve(l.epreuve2); });
        /* cavalières possibles : inscrites, membres de la Team (SEP), membres du club */
        var parId = {};
        function ajouterP(p, src) { if (!p || !p.id) return; if (!parId[p.id]) parId[p.id] = { id: p.id, pseudo: p.pseudo || "", avatar_url: p.avatar_url || null, src: src }; }
        try {
          var ri = await supa.from("agenda_inscriptions").select("user_id").eq("agenda_id", idEv);
          var idsI = ((ri && ri.data) || []).map(function (x) { return x.user_id; });
          if (idsI.length) { var rpi = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsI); ((rpi && rpi.data) || []).forEach(function (p) { ajouterP(p, "inscrite"); }); }
        } catch (eI) { }
        /* 04/11 23h35 (Blandine : « on a une liste de cavaliers et de chevaux de compétition, et on renseigne avant quels chevaux
           on amène au concours ; que ça propose ces gens-là et ces chevaux-là, en grisé une fois engagés ») :
           cavalières des groupes rattachés au rendez-vous (Team CSO Club…) et chevaux choisis dans « Chevaux du déplacement ». */
        var chevauxConcours = [];
        try {
          var rag = await supa.from("agenda_groupes").select("groupe_id").eq("agenda_id", idEv);
          var gidsA = ((rag && rag.data) || []).map(function (x) { return x.groupe_id; }).filter(Boolean);
          if (gidsA.length) {
            var rgm = await supa.from("groupes_membres").select("user_id").in("groupe_id", gidsA);
            var idsG = ((rgm && rgm.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);
            if (idsG.length) { var rpg = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsG); ((rpg && rpg.data) || []).forEach(function (p) { ajouterP(p, "compet"); }); }
          }
        } catch (eG) { }
        try {
          var rac = await supa.from("agenda_chevaux").select("cheval_id").eq("agenda_id", idEv);
          var idsAc = ((rac && rac.data) || []).map(function (x) { return x.cheval_id; }).filter(Boolean);
          if (idsAc.length) { var rca = await supa.from("chevaux").select("id, nom, photo_url").in("id", idsAc); chevauxConcours = ((rca && rca.data) || []).filter(function (c) { return c && c.nom; }).map(function (c) { return { id: c.id, nom: c.nom, photo: c.photo_url || null, src: "concours" }; }); }
        } catch (eAc) { }
        var nomClub = E.club_clef;
        var chevauxTeam = [];
        try {
          if (typeof TEAM_CLE !== "undefined" && E.club_clef === TEAM_CLE) {
            nomClub = TEAM_CLUB;
            var rg = await hypeRequeteTeam("id");
            if (rg && rg.data && rg.data.id) {
              /* 04/11 23h20 : les chevaux de la Team, proposés en premier */
              try {
                var rgc = await supa.from("groupes_chevaux").select("cheval_id").eq("groupe_id", rg.data.id);
                var idsGc = ((rgc && rgc.data) || []).map(function (x) { return x.cheval_id; }).filter(Boolean);
                if (idsGc.length) { var rcg = await supa.from("chevaux").select("id, nom, photo_url").in("id", idsGc).is("supprime_le", null); chevauxTeam = ((rcg && rcg.data) || []).map(function (c) { return { id: c.id, nom: c.nom, photo: c.photo_url || null, src: "team" }; }); }
              } catch (eGc) { }
              var rm = await supa.from("groupes_membres").select("user_id").eq("groupe_id", rg.data.id);
              var idsT = ((rm && rm.data) || []).map(function (x) { return x.user_id; });
              if (idsT.length) { var rpt = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsT); ((rpt && rpt.data) || []).forEach(function (p) { ajouterP(p, "team"); }); }
            }
          } else if (u && u.id) {
            var rpm = await supa.from("profiles").select("ecurie, ecurie2").eq("id", u.id).maybeSingle();
            [rpm && rpm.data && rpm.data.ecurie, rpm && rpm.data && rpm.data.ecurie2].forEach(function (n) { if (n && clefDe(n) === E.club_clef) nomClub = n; });
          }
        } catch (eT) { }
        var membres = [];
        try { membres = await hypeCavaliersDuClub(nomClub, "id, pseudo, avatar_url, ecurie, ecurie2"); } catch (eM) { membres = []; }
        (membres || []).forEach(function (p) { ajouterP(p, "club"); });
        var cand = Object.keys(parId).map(function (k) { return parId[k]; });
        /* licences gardées */
        var lic = {};
        try {
          var idsC = cand.map(function (p) { return p.id; });
          if (idsC.length) { var rlc = await supa.from("cavaliers_licences").select("user_id, nom, licence").in("user_id", idsC.slice(0, 400)); ((rlc && rlc.data) || []).forEach(function (x) { lic[x.user_id] = x; }); }
        } catch (eLc) { }
        var reel = {};
        try { reel = await hsInfosReelles(cand.map(function (p) { return p.id; }).concat(L.map(function (l) { return l.cavalier_id; }))); } catch (eRe) { reel = {}; }
        cand.forEach(function (p) { var r = reel[p.id] || {}; p.nom = hsNomChoisi(lic[p.id] && lic[p.id].nom, p.pseudo, r.nom); p.licence = (lic[p.id] && lic[p.id].licence) || r.licence || ""; });
        /* lignes déjà enregistrées avec le pseudo : on met le vrai nom (et la licence connue), à enregistrer */
        var pseudoDe = {}; cand.forEach(function (p) { pseudoDe[p.id] = p.pseudo; });
        var corrige = false;
        L.forEach(function (l) {
          if (!l.cavalier_id) return; var r = reel[l.cavalier_id] || {};
          var ps = pseudoDe[l.cavalier_id] || "", n = hsNomChoisi(l.nom, ps, r.nom);
          if (ps && String(l.nom || "").trim().toLowerCase() === ps.trim().toLowerCase() && (lic[l.cavalier_id] && lic[l.cavalier_id].nom && lic[l.cavalier_id].nom.toLowerCase() !== ps.toLowerCase())) n = lic[l.cavalier_id].nom;
          if (n && n !== l.nom) { l.nom = n; corrige = true; }
          var li = (lic[l.cavalier_id] && lic[l.cavalier_id].licence) || r.licence || "";
          if (!l.licence && li) { l.licence = li; corrige = true; }
        });
        if (corrige && vif) setModifie(true);
        cand.sort(function (a, b) { var o = { inscrite: 0, compet: 1, team: 2, club: 3 }; return (o[a.src] - o[b.src]) || String(a.nom || a.pseudo).localeCompare(String(b.nom || b.pseudo), "fr"); });
        if (vif) setCandidates(cand);
        /* première ouverture : on part des cavalières inscrites */
        if (!L.length) {
          /* 04/11 23h25 (Blandine : « ne me fais pas apparaître en cavalière, en tant que coach ; par défaut ne me mets pas en premier couple ») :
             la coach qui ouvre la page n'est jamais pré-remplie comme couple (elle reste chef d'équipe ; elle peut s'ajouter elle-même si besoin). */
          L = cand.filter(function (p) { return p.src === "inscrite" && !(u && p.id === u.id); }).map(function (p, i) { return { __n: true, cavalier_id: p.id, nom: p.nom || nomFfeDe(p.pseudo), licence: p.licence || "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: i }; });
          if (L.length && vif) setModifie(true);
        }
        if (vif) setLignes(L);
        /* chevaux du club, proposés dans la liste */
        try {
          var idsCl = (membres || []).map(function (p) { return p.id; }).concat(cand.map(function (p) { return p.id; }));
          if (idsCl.length) {
            var rc = await supa.from("chevaux").select("id, user_id, nom, club, photo_url").in("user_id", idsCl.slice(0, 400)).is("supprime_le", null).limit(800);
            var lc0 = (rc && rc.data) || [], lc = lc0;
            try { lc = hypeChevauxDuClub(lc0, nomClub); } catch (eF) { }
            if (!lc || !lc.length) lc = lc0;   /* filtre du club vide : on garde tous les chevaux des cavalières */
            var vusC = {}; chevauxConcours.forEach(function (c) { vusC[c.id] = 1; });
            chevauxTeam = chevauxTeam.filter(function (c) { return !vusC[c.id]; }); chevauxTeam.forEach(function (c) { vusC[c.id] = 1; });
            var tout = chevauxConcours.concat(chevauxTeam).concat((lc || []).filter(function (c) { return c && c.nom && !vusC[c.id]; }).map(function (c) { return { id: c.id, nom: c.nom, photo: c.photo_url || null, src: "club" }; }));
            var rgS = { concours: 0, team: 1, club: 2 };
            tout.sort(function (a, b) { return (rgS[a.src] - rgS[b.src]) || String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
            if (vif) setChevaux(tout);
          } else if (vif) setChevaux(chevauxConcours.concat(chevauxTeam));
        } catch (eCh) { if (vif) setChevaux(chevauxConcours.concat(chevauxTeam)); }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setLignes(function (l) { return l || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("concours"); }
  /* 04/11 23h57 (Blandine : « que l'appli trouve le numéro elle-même quand on rentre la date et le lieu ; commence par la recherche,
     et si ça marche pas, on va chercher à la main ») : recherche sur internet par le serveur (netlify/functions/recherche-concours.js,
     réservée aux coachs) ; on touche un résultat pour remplir la case ; sinon lien vers le calendrier FFE. */
  async function chercherNumero() {
    if (!ev || !ev.date_jour) { setRechNum({ etat: "erreur", liste: [], msg: F("Ce concours n’a pas de date.") }); return; }
    setRechNum({ etat: "cherche", liste: [], msg: "" });
    try {
      var hd = { "Content-Type": "application/json" };
      try { var se = await supa.auth.getSession(); var jt = se && se.data && se.data.session && se.data.session.access_token; if (jt) hd.Authorization = "Bearer " + jt; } catch (eS) { }
      var r = await fetch("/.netlify/functions/recherche-concours", { method: "POST", headers: hd,
        body: JSON.stringify({ date: String(ev.date_jour).slice(0, 10), lieu: ev.lieu || "", discipline: (feuille && feuille.discipline) || "", clef: ev.club_clef || "" }) });
      var d = await r.json().catch(function () { return null; });
      if (!d || !d.ok) { setRechNum({ etat: "erreur", liste: [], msg: (d && d.message) || F("La recherche n’a pas abouti.") }); return; }
      setRechNum({ etat: "fini", liste: d.concours || [], msg: d.remarque || "" });
    } catch (eR) { setRechNum({ etat: "erreur", liste: [], msg: F("La recherche n’a pas abouti.") }); }
  }
  function blocNumero() {
    function jjmm(x) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(x || "")); return m ? m[3] + "/" + m[2] : ""; }
    var lienFfe = h("a", { href: "https://ffecompet.ffe.com/", target: "_blank", rel: "noopener", className: "hs-lien" }, F("Chercher sur le calendrier FFE ›"));
    if (!rechNum) return h("div", { style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", margin: "-4px 0 10px" } },
      h("button", { type: "button", className: "hs-lien", onClick: chercherNumero }, F("Trouver le numéro ›")));
    if (rechNum.etat === "cherche") return h("div", { className: "hs-note", style: { margin: "-4px 0 10px" } }, F("Recherche du concours sur internet… (jusqu’à une minute)"));
    var l = rechNum.liste || [];
    return h("div", { style: { margin: "-4px 0 12px" } },
      l.length ? h("div", { className: "hs-note", style: { marginTop: 0, marginBottom: 6 } }, l.length > 1 ? F("Touche le bon concours :") : F("Touche-le pour remplir la case :")) : null,
      l.length ? h("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, l.map(function (c) {
        return h("button", { key: c.numero, type: "button", className: "hs-btn", style: { textAlign: "left", minHeight: 40, fontSize: 12.5, lineHeight: 1.35, padding: "8px 12px" },
          onClick: function () { poserF("numero", c.numero); setRechNum(null); } },
          h("b", null, c.numero), " · " + [c.discipline, c.lieu, c.departement ? "(" + c.departement + ")" : "", c.cloture ? F("clôture le ") + jjmm(c.cloture) : ""].filter(Boolean).join(" · "));
      })) : h("div", { className: "hs-note", style: { marginTop: 0 } }, rechNum.etat === "erreur" ? rechNum.msg : F("Rien trouvé sur internet pour ce jour et ce lieu.")),
      l.length && rechNum.msg ? h("div", { className: "hs-note", style: { marginTop: 6 } }, rechNum.msg) : null,
      h("div", { style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginTop: 4 } },
        lienFfe, h("button", { type: "button", className: "hs-lien", onClick: function () { setRechNum(null); } }, F("Fermer"))));
  }
  function poserF(k, v) { setFeuille(Object.assign({}, feuille, (function () { var o = {}; o[k] = v; return o; })())); setModifie(true); setMsg(""); }
  function poserL(i, k, v) { var n = lignes.slice(); n[i] = Object.assign({}, n[i]); n[i][k] = v; setLignes(n); setModifie(true); setMsg(""); }
  function ajouterEpreuve() {
    var t = hsNomEpreuve(nouvelleEp); if (!t) return;
    var l = (feuille.epreuves || []).slice(); if (!l.some(function (x) { return x.toLowerCase() === t.toLowerCase(); })) l.push(t);
    poserF("epreuves", l); setNouvelleEp("");
  }
  function retirerEpreuve(t) { poserF("epreuves", (feuille.epreuves || []).filter(function (x) { return x !== t; })); }
  function ajouterCavaliere(val) {
    if (!val) return;
    var n = lignes.slice();
    if (val === "__autre" || (val && val.libre !== undefined)) n.push({ __n: true, cavalier_id: null, nom: (val && val.libre) || "", licence: "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: n.length });
    else {
      var p = (typeof val === "object") ? val : candidates.filter(function (c) { return c.id === val; })[0]; if (!p) return;
      n.push({ __n: true, cavalier_id: p.id, nom: p.nom || nomFfeDe(p.pseudo), licence: p.licence || "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: n.length });
    }
    setLignes(n); setModifie(true); setMsg(""); setRecherche(""); setTrouves([]);
  }
  async function lireFiche(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    try { e.target.value = ""; } catch (eV) { }
    if (!f) return;
    setLus(null); setLecture("en_cours");
    try {
      var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
      if (!estPdf && !/^image\//i.test(String(f.type || ""))) throw new Error("envoie une photo, une capture d'écran ou un PDF (pour un fichier Word : fais une capture de la fiche)");
      var imgs = estPdf ? (await hypePdfEnImages(f, 2, 2000)).images : [await hypeImageEnJpeg(f, 2000)];
      var l = await hsLireFiche(imgs);
      var tous = candidates.slice();
      var res = l.filter(function (x) { return x && String(x.nom || "").trim(); }).map(function (x) {
        var c = tous.filter(function (p) { return hsMemePers(x.nom, p.nom) || hsMemePers(x.nom, p.pseudo); })[0] || null;
        var deja = lignes.some(function (li) { return (c && li.cavalier_id === c.id) || hsMemePers(li.nom, x.nom); });
        return { nom: String(x.nom || "").trim(), licence: String(x.licence || "").trim(), epreuve1: hsNomEpreuve(x.epreuve1 || ""), cheval1: String(x.cheval1 || "").trim(), epreuve2: hsNomEpreuve(x.epreuve2 || ""), cheval2: String(x.cheval2 || "").trim(), compte: c, deja: deja, coche: true };
      });
      setLus(res); setLecture(res.length ? "" : "Aucune cavalière trouvée sur cette fiche.");
    } catch (eL) { setLecture("Lecture impossible : " + String((eL && eL.message) || eL)); }
  }
  /* ajoute les cavalières cochées ; celles déjà sur la feuille reçoivent juste le nom et la licence lus */
  function ajouterLus() {
    if (!lus) return;
    var n = lignes.slice(), eAjout = (feuille.epreuves || []).slice();
    lus.forEach(function (x) {
      if (!x.coche) return;
      [x.epreuve1, x.epreuve2].forEach(function (ep) { if (ep && !eAjout.some(function (y) { return y.toLowerCase() === ep.toLowerCase(); })) eAjout.push(ep); });
      var j = -1; n.forEach(function (li, k) { if (j === -1 && ((x.compte && li.cavalier_id === x.compte.id) || hsMemePers(li.nom, x.nom))) j = k; });
      if (j !== -1) { n[j] = Object.assign({}, n[j], { nom: x.nom || n[j].nom, licence: x.licence || n[j].licence }); return; }
      n.push({ __n: true, cavalier_id: x.compte ? x.compte.id : null, nom: x.nom, licence: x.licence, epreuve1: x.epreuve1, cheval1_nom: x.cheval1, epreuve2: x.epreuve2, cheval2_nom: x.cheval2, ordre: n.length });
    });
    if (eAjout.length !== (feuille.epreuves || []).length) setFeuille(Object.assign({}, feuille, { epreuves: eAjout }));
    setLignes(n); setModifie(true); setLus(null); setMsg("Fiche ajoutée : vérifie, puis touche « Enregistrer ».");
  }
  function retirerLigne(i) {
    var l = lignes[i]; if (l && l.id) setSupprimees(supprimees.concat([l.id]));
    setLignes(lignes.filter(function (x, j) { return j !== i; })); setModifie(true); setMsg("");
  }
  function idCheval(nom) {
    var t = String(nom || "").trim().toLowerCase(); if (!t) return null;
    var c = chevaux.filter(function (x) { return String(x.nom || "").trim().toLowerCase() === t; });
    return c.length === 1 ? c[0].id : null;
  }

  async function enregistrer() {
    if (occupe || !feuille || !lignes) return;
    var vides = lignes.filter(function (l) { return !String(l.nom || "").trim(); });
    if (vides.length) { setMsg(F("Il manque le nom d’une cavalière.")); return; }
    setOccupe(true); setMsg("");
    try {
      var fe = { agenda_id: idEv, epreuves: feuille.epreuves || [], discipline: feuille.discipline || null, numero: feuille.numero || null, prix: feuille.prix || null, transport: feuille.transport || null, facturer_le: feuille.facturer_le || null, faits_le: feuille.faits_le || null, chef_nom: feuille.chef_nom || null, chef_licence: feuille.chef_licence || null, maj_le: new Date().toISOString() };
      var rf = await supa.from("concours_feuille").upsert(fe, { onConflict: "agenda_id" }).select("agenda_id");
      if (rf && rf.error) throw new Error(F("feuille : ") + (rf.error.message || rf.error));
      if (!rf || !rf.data || !rf.data.length) throw new Error(F("la feuille n’a pas été enregistrée (droits ?)"));
      if (supprimees.length) {
        var rd = await supa.from("concours_engagements").delete().in("id", supprimees).select("id");
        if (rd && rd.error) throw new Error(F("retrait : ") + (rd.error.message || rd.error));
      }
      var nouv = [];
      for (var i = 0; i < lignes.length; i++) {
        var l = lignes[i];
        var row = { agenda_id: idEv, cavalier_id: l.cavalier_id || null, nom: String(l.nom || "").trim(), licence: String(l.licence || "").trim() || null,
          epreuve1: l.epreuve1 || null, cheval1_nom: String(l.cheval1_nom || "").trim() || null, cheval1_id: idCheval(l.cheval1_nom),
          epreuve2: l.epreuve2 || null, cheval2_nom: String(l.cheval2_nom || "").trim() || null, cheval2_id: idCheval(l.cheval2_nom),
          ordre: i, maj_le: new Date().toISOString() };
        var rr = l.id
          ? await supa.from("concours_engagements").update(row).eq("id", l.id).select("*")
          : await supa.from("concours_engagements").insert(row).select("*");
        if (rr && rr.error) throw new Error(row.nom + " : " + (rr.error.message || rr.error));
        if (!rr || !rr.data || !rr.data.length) throw new Error(row.nom + F(" : refusé par la base"));
        nouv.push(rr.data[0]);
        /* la licence et le nom sont gardés pour la prochaine fois */
        if (row.cavalier_id && (row.licence || row.nom)) {
          try { await supa.from("cavaliers_licences").upsert({ user_id: row.cavalier_id, nom: row.nom, licence: row.licence, maj_le: new Date().toISOString() }, { onConflict: "user_id" }).select("user_id"); } catch (eLi) { }
        }
      }
      setLignes(nouv); setSupprimees([]); setModifie(false);
      setFeuille(Object.assign({}, feuille, { __nouvelle: false }));
      setMsg(F("✓ Enregistré."));
    } catch (eS) { setMsg(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    setOccupe(false);
  }

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: retour, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Engagements"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "" });
  if (gestion === false) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Cette page est réservée à la coach du club."))));
  if (!feuille || !lignes) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" },
    erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Impossible de charger les engagements : ") + erreur) : h("div", { className: "hs-attente", "aria-busy": "true" }, "…")));

  function champ(lab, k, ph, type) {
    return h("div", { className: "hs-champ" }, h("label", null, lab),
      h("input", { type: type || "text", value: feuille[k] || "", placeholder: ph || "", onChange: function (e) { poserF(k, e.target.value); } }));
  }
  var eps = feuille.epreuves || [];
  function selEp(i, k) {
    var v = lignes[i][k] || "";
    var opts = eps.slice(); if (v && opts.indexOf(v) === -1) opts.unshift(v);
    return h("select", { value: v, "aria-label": F("Épreuve"), onChange: function (e) { poserL(i, k, e.target.value); } },
      h("option", { value: "" }, "—"), opts.map(function (o) { return h("option", { key: o, value: o }, o); }));
  }
  /* 04/11 23h20 (Blandine : « on peut choisir une cavalière mais pas un cheval ? ») : vrai menu de chevaux,
     ceux de la Team d'abord puis ceux du club ; « Autre cheval » ouvre une saisie libre. */
  function selCh(i, n) {
    var k = "cheval" + n + "_nom", v = lignes[i][k] || "", cle = i + "-" + n;
    var connu = chevaux.some(function (c) { return c.nom === v; });
    var libre = libres[cle] || (v && !connu);
    var conc = chevaux.filter(function (c) { return c.src === "concours"; }), team = chevaux.filter(function (c) { return c.src === "team"; }), club = chevaux.filter(function (c) { return c.src === "club"; });
    function opt(c) {
      /* 04/11 23h33 (Blandine : « je vois Apache avec deux écrit à plusieurs endroits ») : le cheval choisi dans cette case
         affiche SON n° de tour (Apache du Lys (1) chez l'une, (2) chez l'autre) ; dans la liste, les autres chevaux
         affichent combien de tours ils ont déjà. */
      if (c.nom === v) { var k = 0; (montes[c.nom] || []).forEach(function (x, j) { if (x.i === i && x.n === n) k = j + 1; }); return h("option", { key: c.id, value: c.nom }, (k ? "(" + k + ") " : "") + c.nom); }   /* 23h36 : le n° devant, pour qu'un nom long (« Elle m'a dit circee ») ne le cache pas */
      var nb = (montes[c.nom] || []).length;
      return h("option", { key: c.id, value: c.nom }, c.nom + (nb ? F(" — déjà ") + nb + (nb > 1 ? F(" tours") : F(" tour")) : ""));
    }
    if (libre) return h("div", { style: { display: "flex", gap: 6, minWidth: 0 } },
      h("input", { type: "text", value: v, placeholder: F("Nom du cheval"), autoFocus: !!libres[cle] && !v, onChange: function (e) { poserL(i, k, e.target.value); }, style: { flex: 1, minWidth: 0 } }),
      chevaux.length ? h("button", { type: "button", "aria-label": F("Revenir à la liste"), onClick: function () { var o = Object.assign({}, libres); delete o[cle]; setLibres(o); poserL(i, k, ""); }, style: { flex: "0 0 auto", width: 36, background: "none", border: "none", color: "#C9A66B", fontSize: 18, padding: 0 } }, "☰") : null);
    return h("select", { value: v, "aria-label": F("Cheval"), onChange: function (e) {
        var x = e.target.value;
        if (x === "__autre") { var o = Object.assign({}, libres); o[cle] = true; setLibres(o); poserL(i, k, ""); return; }
        poserL(i, k, x);
      } },
      h("option", { value: "" }, F("Cheval…")),
      conc.length ? h("optgroup", { label: F("Chevaux du concours") }, conc.map(opt)) : null,
      team.length ? h("optgroup", { label: F("Chevaux de l’équipe") }, team.map(opt)) : null,
      club.length ? h("optgroup", { label: F("Chevaux du club") }, club.map(opt)) : null,
      h("option", { value: "__autre" }, F("Autre cheval (taper son nom)")));
  }
  var dejaLa = {}; lignes.forEach(function (l) { if (l.cavalier_id) dejaLa[l.cavalier_id] = true; });
  /* « SOJFER Lauren » → « Lauren » (le mot qui n'est pas tout en majuscules) */
  function prenomDe(nom) { var m = String(nom || "").trim().split(/\s+/).filter(Boolean); var p = m.filter(function (x) { return x !== x.toUpperCase(); }); return (p.length ? p.join(" ") : m[0]) || "?"; }
  var montes = {};   /* cheval → qui le monte déjà sur la feuille */
  lignes.forEach(function (l, i) { [1, 2].forEach(function (n) { var c = String(l["cheval" + n + "_nom"] || "").trim(); if (!c) return; (montes[c] = montes[c] || []).push({ i: i, n: n, qui: prenomDe(l.nom) }); }); });
  var proposees = candidates.filter(function (c) { return (c.src === "inscrite" || c.src === "compet") && c.id !== moiId; });
  var chevauxConc = chevaux.filter(function (c) { return c.src === "concours"; });
  var q = String(recherche || "").trim().toLowerCase();
  var resultats = [];
  if (q.length >= 2) {
    var vusR = {};
    candidates.concat(trouves).forEach(function (c) {
      if (vusR[c.id]) return; var t = (String(c.nom || "") + " " + String(c.pseudo || "")).toLowerCase();
      if (t.indexOf(q) === -1) return; vusR[c.id] = 1; resultats.push(c);
    });
    resultats = resultats.slice(0, 12);
  }
  /* n° du tour du cheval choisi dans cette case (1 = son premier tour sur la feuille) */
  function tourDe(i, n) {
    var c = String(lignes[i]["cheval" + n + "_nom"] || "").trim(); if (!c || !montes[c]) return null;
    var k = 0; montes[c].forEach(function (x, j) { if (x.i === i && x.n === n) k = j + 1; });
    var trop = montes[c].length > toursMax;
    return h("span", { className: "hs-tour" + (trop ? " trop" : "") }, c + " (" + k + ")");
  }
  /* 04/11 23h47 (Blandine : « avoir direct en visu la fiche cavalier et la fiche cheval ; puis des onglets pour voir par épreuve
     et la grille des tours ») — et moins de « verre pétrole » : traits fins sur fond noir, pas de cadres. */
  var nomsCh = []; chevauxConc.forEach(function (c) { if (nomsCh.indexOf(c.nom) === -1) nomsCh.push(c.nom); });
  Object.keys(montes).forEach(function (c) { if (nomsCh.indexOf(c) === -1) nomsCh.push(c); });
  nomsCh.sort(function (a, b) { return a.localeCompare(b, "fr"); });
  var nbTours = 0; Object.keys(montes).forEach(function (c) { nbTours += montes[c].length; });
  var libresTot = 0; nomsCh.forEach(function (c) { libresTot += Math.max(0, toursMax - (montes[c] || []).length); });
  function epDe(x) { return lignes[x.i] ? (lignes[x.i]["epreuve" + x.n] || "") : ""; }
  function choixMax() {
    return h("select", { className: "hs-mini", value: String(toursMax), "aria-label": F("Tours par cheval"), onChange: function (e) { var v = Number(e.target.value) || 3; setToursMax(v); try { localStorage.setItem("hype_tours_max", String(v)); } catch (eL) { } } },
      [1, 2, 3, 4, 5].map(function (v) { return h("option", { key: v, value: String(v) }, v + F(" tours max")); }));
  }
  /* fiches chevaux : ronds = tours prévus, puis qui le monte */
  function vueChevaux() {
    if (!nomsCh.length) return null;
    return h("div", null,
      h("div", { className: "hs-sec" }, h("b", null, F("Les chevaux")), h("span", null, choixMax())),
      nomsCh.map(function (c) {
        var m = montes[c] || [], reste = toursMax - m.length, pts = [];
        for (var j = 0; j < Math.max(toursMax, m.length); j++) pts.push(h("i", { key: j, className: j < m.length ? (j < toursMax ? "p" : "p trop") : "" }));
        return h("div", { key: c, className: "hs-fch" },
          h("div", { className: "hs-fch-t" }, h("b", null, c), h("span", { className: "hs-pts", "aria-label": m.length + F(" tours") }, pts),
            h("span", { className: "hs-reste" + (reste < 0 ? " trop" : "") }, reste > 0 ? reste + (reste > 1 ? F(" libres") : F(" libre")) : (reste === 0 ? F("complet") : F("trop de ") + (-reste)))),
          m.length ? h("div", { className: "hs-fch-r" }, m.map(function (x, j) { return h("span", { key: j }, (j + 1) + ". " + x.qui, h("em", null, epDe(x) ? " " + epDe(x) : "")); })) : null);
      }));
  }
  /* par épreuve */
  function vueEpreuves() {
    var parEp = {}, ordre = [];
    lignes.forEach(function (l, i) { [1, 2].forEach(function (n) {
      var e = String(l["epreuve" + n] || "").trim(), c = String(l["cheval" + n + "_nom"] || "").trim(); if (!e && !c) return;
      var k = e || F("Épreuve à choisir"); if (!parEp[k]) { parEp[k] = []; ordre.push(k); } parEp[k].push({ qui: String(l.nom || "").trim() || "?", ch: c, i: i, n: n });
    }); });
    ordre.sort(function (a, b) { return (eps.indexOf(a) === -1 ? 99 : eps.indexOf(a)) - (eps.indexOf(b) === -1 ? 99 : eps.indexOf(b)) || a.localeCompare(b, "fr"); });
    if (!ordre.length) return h("div", { className: "hs-vide" }, F("Aucun tour pour l’instant."));
    return h("div", null, ordre.map(function (e) {
      return h("div", { key: e, className: "hs-pep" },
        h("div", { className: "hs-pep-t" }, h("span", null, e), h("span", null, parEp[e].length + (parEp[e].length > 1 ? F(" tours") : F(" tour")))),
        parEp[e].map(function (x, j) {
          var k = 0; (montes[x.ch] || []).forEach(function (y, jj) { if (y.i === x.i && y.n === x.n) k = jj + 1; });
          return h("div", { key: j, className: "hs-pep-l" }, h("span", null, x.qui), h("span", null, x.ch ? h(React.Fragment, null, x.ch, k ? h("sup", null, " " + k) : null) : "—"));
        }));
    }), h("div", { className: "hs-pep-tot" }, nbTours + F(" tours au total")));
  }
  /* grille des tours : tour 1, 2, 3… de chaque cheval ; les cases vides sont les places libres */
  function vueGrille() {
    if (!nomsCh.length) return h("div", { className: "hs-vide" }, F("Aucun cheval pour l’instant."));
    var nb = toursMax; nomsCh.forEach(function (c) { nb = Math.max(nb, (montes[c] || []).length); });
    var cols = []; for (var j = 0; j < nb; j++) cols.push(j);
    return h("div", null,
      h("div", { className: "hs-sec", style: { marginTop: 0 } }, h("b", null, F("Grille des tours")), h("span", null, choixMax())),
      h("div", { className: "hs-grille-w" }, h("table", { className: "hs-grille" },
        h("thead", null, h("tr", null, h("th", { className: "ch" }, F("Cheval")), cols.map(function (j) { return h("th", { key: j }, F("Tour ") + (j + 1)); }))),
        h("tbody", null, nomsCh.map(function (c) {
          var m = montes[c] || [];
          return h("tr", { key: c }, h("td", { className: "ch" }, c), cols.map(function (j) {
            var x = m[j]; if (!x) return h("td", { key: j, className: j < toursMax ? "libre" : "" }, j < toursMax ? F("libre") : "");
            return h("td", { key: j, className: j >= toursMax ? "trop" : "" }, x.qui, h("em", null, epDe(x)));
          }));
        })))),
      h("div", { className: "hs-pep-tot" }, nbTours + F(" tours · ") + libresTot + (libresTot > 1 ? F(" places libres") : F(" place libre"))));
  }
  function onglets() {
    var o = [["couples", F("Cavalières et chevaux")], ["epreuves", F("Par épreuve")], ["grille", F("Grille des tours")]];
    return h("div", { className: "hs-onglets", role: "tablist" }, o.map(function (x) {
      return h("button", { key: x[0], type: "button", role: "tab", "aria-selected": vue === x[0], className: vue === x[0] ? "on" : "", onClick: function () { setVue(x[0]); } }, x[1]);
    }));
  }
  function puceCav(c) {
    var la = !!dejaLa[c.id];
    return h("button", { key: c.id, type: "button", disabled: la, className: "hs-puce hs-puce-cav" + (la ? " fait" : ""), onClick: function () { ajouterCavaliere(c); } },
      (la ? "✓ " : "+ ") + (c.nom || c.pseudo || "?"));
  }

  /* 05/11/2026 — VISUEL 1 choisi par Blandine (« 1 ») : style Vidéothèque. Carte « Le concours » avec seulement ce que la
     coach remplit (n°, date et lieu, tarif, déplacement en camion, chef d'équipe pré-rempli, épreuves) ; « Discipline »,
     « À facturer le » et « Engagements faits le » ne sont plus à l'écran (ils restent sur la feuille SEP imprimée).
     Trois classements en onglets : Cavalières (une carte par cavalière), Chevaux (tuiles photo), Épreuves (bandeaux photo). */
  function photoCh(nom) {
    var c = chevaux.filter(function (x) { return x.nom === nom && x.photo; })[0];
    if (c) return c.photo;
    var s0 = String(nom || ""), n0 = 0; for (var z = 0; z < s0.length; z++) n0 = (n0 * 31 + s0.charCodeAt(z)) >>> 0;
    return PHOTOS_SAISON[n0 % PHOTOS_SAISON.length].img;
  }
  function cavDe(l) { return l && l.cavalier_id ? candidates.filter(function (c) { return c.id === l.cavalier_id; })[0] || null : null; }
  function initiales(nom) { var m = String(nom || "").trim().split(/\s+/).filter(Boolean); return m.slice(0, 2).map(function (x) { return x.charAt(0).toUpperCase(); }).join("") || "?"; }
  function rangee(lab, contenu, k) { return h("div", { key: k, className: "e1-ligne" }, h("span", { className: "e1-lab" }, lab), contenu); }
  function pointsDe(c) { var m = montes[c] || [], pts = []; for (var j = 0; j < Math.max(toursMax, m.length); j++) pts.push(h("i", { key: j, className: j < m.length ? (j < toursMax ? "p" : "p trop") : "" })); return h("span", { className: "hs-pts", "aria-label": m.length + F(" tours") }, pts); }
  function resteDe(c) { var r = toursMax - (montes[c] || []).length; return r > 0 ? r + (r > 1 ? F(" libres") : F(" libre")) : (r === 0 ? F("complet") : F("trop de ") + (-r)); }

  function carteConcours() {
    var chefNom = String(feuille.chef_nom || "").trim(), chefLic = String(feuille.chef_licence || "").trim();
    return h("div", { className: "e1-carte e1-conc" },
      rangee(F("N° concours"), h("input", { className: "e1-in", type: "text", inputMode: "numeric", value: feuille.numero || "", placeholder: F("à trouver"), "aria-label": F("N° concours"), onChange: function (e) { poserF("numero", e.target.value); } }), "n"),
      h("div", { className: "e1-num" }, blocNumero()),
      rangee(F("Date et lieu"), h("span", { className: "e1-val" }, ev ? ([hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") || "—") : "—"), "d"),
      rangee(F("Tarif engagement"), h("input", { className: "e1-in", type: "text", inputMode: "decimal", value: feuille.prix || "", placeholder: F("Ajouter"), "aria-label": F("Tarif engagement"), onChange: function (e) { poserF("prix", e.target.value); } }), "p"),
      rangee(F("Déplacement en camion"), h("span", { className: "e1-seg", role: "group" }, ["Oui", "Non"].map(function (v) {
        return h("button", { key: v, type: "button", "aria-pressed": feuille.transport === v, className: feuille.transport === v ? "on" : "", onClick: function () { poserF("transport", feuille.transport === v ? "" : v); } }, F(v));
      })), "t"),
      editChef
        ? h("div", { className: "e1-ligne e1-chef-ed" }, h("span", { className: "e1-lab" }, F("Chef d’équipe")),
            h("div", { className: "e1-chef-champs" },
              h("input", { type: "text", value: feuille.chef_nom || "", placeholder: "NOM Prénom", "aria-label": F("Nom du chef d’équipe"), onChange: function (e) { poserF("chef_nom", e.target.value); } }),
              h("input", { type: "text", value: feuille.chef_licence || "", placeholder: F("Licence"), autoCapitalize: "characters", "aria-label": F("Licence du chef d’équipe"), onChange: function (e) { poserF("chef_licence", e.target.value); } }),
              h("button", { type: "button", className: "hs-lien", onClick: function () { setEditChef(false); } }, F("OK"))))
        : rangee(F("Chef d’équipe"), h("button", { type: "button", className: "e1-chef", onClick: function () { setEditChef(true); } },
            h("b", null, chefNom || F("À compléter")), h("small", null, (chefLic || F("licence ?")) + F(" · Modifier ›"))), "c"),
      rangee(F("Épreuves"), h("div", { className: "e1-puces" },
        eps.map(function (t) { return h("span", { key: t, className: "e1-puce" }, t, h("button", { type: "button", "aria-label": F("Retirer ") + t, onClick: function () { retirerEpreuve(t); } }, "×")); }),
        h("button", { type: "button", className: "e1-puce plus", "aria-label": F("Ajouter une épreuve"), onClick: function () { setAjoutEp(!ajoutEp); } }, "+")), "e"),
      ajoutEp || !eps.length ? h("div", { className: "e1-ajout-ep" },
        h("input", { type: "text", value: nouvelleEp, placeholder: F("Ex. Club 2, Club 1 GP"), "aria-label": F("Nom de l’épreuve"), onChange: function (e) { setNouvelleEp(e.target.value); }, onKeyDown: function (e) { if (e.key === "Enter") { e.preventDefault(); ajouterEpreuve(); } } }),
        h("button", { type: "button", className: "hs-lien", onClick: ajouterEpreuve }, F("Ajouter"))) : null);
  }
  /* 07/11 00h22-00h33 (Blandine : « sur la page de mes engagements fais un récapitulatif clair à la fin, par cavalier, par cheval
     et par épreuve » ; choix : chevaux = cartes photo à faire glisser avec leurs tours en cases (E) ; cavalières = « ses deux
     couples » en vignettes photo (I) ; épreuves = le fil de la journée, rangé par ordre de passage une fois sorti). */
  function recapFin() {
    var cav = lignes.map(function (l, i) { return { l: l, i: i }; }).filter(function (x) { return String(x.l.nom || "").trim(); });
    if (!cav.length) return null;
    function kTour(i, n) { var c = String(lignes[i]["cheval" + n + "_nom"] || "").trim(), k = 0; (montes[c] || []).forEach(function (x, j) { if (x.i === i && x.n === n) k = j + 1; }); return k; }
    function nomPrenom(nom) { var m = String(nom || "").trim().split(/\s+/), maj = m.filter(function (w) { return w.length > 1 && w === w.toUpperCase(); }), mi = m.filter(function (w) { return !(w.length > 1 && w === w.toUpperCase()); }); return [maj.join(" ") || m[0] || "", mi.join(" ")]; }
    /* par épreuve, rangé par heure de passage quand elle est connue (Jour J ou chronométreur repris dans Jour J) */
    var parEp = {}, ordreEp = [];
    lignes.forEach(function (l, i) { [1, 2].forEach(function (n) {
      var e = String(l["epreuve" + n] || "").trim(), c = String(l["cheval" + n + "_nom"] || "").trim(); if (!e && !c) return;
      var k = e || F("Épreuve à choisir"); if (!parEp[k]) { parEp[k] = []; ordreEp.push(k); }
      var hS = String(l["passage" + n] || "").trim(), lu = (!hS && l.id && c) ? ordreLu[l.id + "|" + c.toLowerCase()] : null;
      parEp[k].push({ i: i, n: n, nom: String(l.nom || "").trim() || "?", ch: c, h: hS || (lu && lu.h ? "~" + lu.h : ""), lu: !!lu, ordreLu: lu ? lu.ordre : 0, piste: String(l["piste" + n] || "").trim() });
    }); });
    ordreEp.sort(function (a, b) { return (eps.indexOf(a) === -1 ? 99 : eps.indexOf(a)) - (eps.indexOf(b) === -1 ? 99 : eps.indexOf(b)) || a.localeCompare(b, "fr"); });
    return h("div", { className: "rc" },
      h("div", { className: "rc-tete" },
        h("svg", { viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true" },
          h("defs", null, h("linearGradient", { id: "rcg", x1: "0", x2: "1" }, h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".5", stopColor: "#C9A66B", stopOpacity: ".9" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
          h("path", { d: "M0 54 C 120 52, 240 34, 400 4", fill: "none", stroke: "url(#rcg)", strokeWidth: 1.2 })),
        h("div", { className: "rc-eb" }, F("Récapitulatif")),
        h("h2", null, F("La journée en un coup d’œil")),
        h("p", null, cav.length + (cav.length > 1 ? F(" cavalières · ") : F(" cavalière · ")) + nbTours + (nbTours > 1 ? F(" tours · ") : F(" tour · ")) + nomsCh.length + (nomsCh.length > 1 ? F(" chevaux") : F(" cheval")))),
      /* les cavalières : cartes photo deux par ligne, comme les cartes chevaux du « programme » (D) — essai demandé par Blandine
         07/11 01h32. Fond : sa photo de profil si elle en a une, sinon la photo de son premier cheval. */
      h("div", { className: "rc-t" }, h("h3", null, F("Les cavalières")), h("span", null, cav.length + (cav.length > 1 ? F(" cavalières · ") : F(" cavalière · ")) + nbTours + (nbTours > 1 ? F(" tours") : F(" tour")))),
      h("div", { className: "rc-dg" }, cav.map(function (x, r) {
        var np = nomPrenom(x.l.nom), p0 = cavDe(x.l), pv = p0 && p0.avatar_url ? hsPhotoProfil(p0) : "";
        var c1 = String(x.l.cheval1_nom || "").trim(), c2 = String(x.l.cheval2_nom || "").trim();
        var fond = pv || (c1 ? photoCh(c1) : (c2 ? photoCh(c2) : ""));
        var tours = [1, 2].map(function (n) { var c = String(x.l["cheval" + n + "_nom"] || "").trim(), e = String(x.l["epreuve" + n] || "").trim(); if (!c && !e) return null; var k = c ? kTour(x.i, n) : 0; return { c: c, e: e, k: k }; }).filter(Boolean);
        return h("div", { key: "rc" + x.i, className: "rc-dc" },
          fond ? h("img", { src: fond, alt: "" }) : null, h("div", { className: "voile" }),
          h("span", { className: "rc-dn" }, String(r + 1)),
          x.l.licence ? h("span", { className: "rc-dl" }, x.l.licence) : null,
          h("div", { className: "rc-dt" },
            h("h4", null, np[1] || np[0], np[1] ? h("span", null, np[0]) : null),
            h("ol", null, tours.length ? tours.map(function (t, k) { return h("li", { key: k }, (t.c || F("cheval à choisir")), t.k ? h("span", { className: "sup" }, String(t.k)) : null, t.e ? h("em", null, " · " + t.e) : null); }) : h("li", { className: "libre" }, F("chevaux à choisir")))));
      })),
      /* les chevaux : cartes à faire glisser, leurs tours en cases */
      nomsCh.length ? h(React.Fragment, null,
        h("div", { className: "rc-t" }, h("h3", null, F("Les chevaux")), h("span", null, libresTot + (libresTot > 1 ? F(" places libres") : F(" place libre")) + (nomsCh.length > 1 ? F(" · fais glisser") : ""))),
        h("div", { className: "rc-rail", "data-hscroll": "1", "data-noswipe": "1" }, nomsCh.map(function (c) {
          var m = montes[c] || [], cases = [];
          for (var j = 0; j < Math.max(toursMax, m.length); j++) {
            var y = m[j];
            cases.push(y
              ? h("div", { key: j, className: "rc-slot plein" + (j >= toursMax ? " trop" : "") }, h("i", null, j + 1), h("span", null, y.qui), h("em", null, epDe(y)))
              : h("div", { key: j, className: "rc-slot vide" }, h("i", null, j + 1), h("span", null, F("place libre")), h("em", null, "")));
          }
          return h("div", { key: c, className: "rc-ch" },
            h("div", { className: "ph" }, h("img", { src: photoCh(c), alt: "" }), h("div", { className: "voile" }), h("h4", null, c)),
            h("div", { className: "rc-slots" }, cases));
        }))) : null,
      /* les épreuves : le fil, par ordre de passage une fois sorti */
      h("div", { className: "rc-t" }, h("h3", null, F("Les épreuves")), h("span", null, nbTours + (nbTours > 1 ? F(" tours") : F(" tour")))),
      /* L (choix de Blandine 07/11 01h37) : un bandeau photo par épreuve, puis la liste de départ numérotée, médaillon du cheval,
         heure à droite ; dans l'ordre de passage dès qu'il est connu (heures de Jour J), sinon dans l'ordre de la feuille. */
      ordreEp.map(function (e) {
        var l0 = parEp[e], connus = l0.filter(function (x) { return x.h; }).length, sorti = connus === l0.length && l0.length > 0;
        var liste = l0.slice();
        if (connus) liste.sort(function (a, b) { var ma = a.h ? hsMinutes(String(a.h).replace("~", "")) : 99999, mb = b.h ? hsMinutes(String(b.h).replace("~", "")) : 99999; return ma - mb; });
        var phB = (l0.filter(function (x) { return x.ch; })[0] || {}).ch;
        return h("div", { key: e, className: "rc-le" },
          h("div", { className: "rc-ban" }, phB ? h("img", { src: photoCh(phB), alt: "" }) : null, h("div", { className: "voile" }),
            h("div", { className: "t" }, h("b", null, e), h("span", null, l0.length + (l0.length > 1 ? F(" tours · ") : F(" tour · ")) + (l0.some(function (x) { return x.lu; }) ? F("ordre du chronométreur · heures estimées") : (sorti ? F("ordre de passage") : (connus ? F("ordre de passage en partie connu") : F("ordre de passage pas encore sorti"))))))),
          liste.map(function (x, j) {
            var k = x.ch ? kTour(x.i, x.n) : 0, np = nomPrenom(x.nom);
            return h("div", { key: j, className: "rc-li" },
              h("div", { className: "k" }, String(j + 1)),
              x.ch ? h("img", { src: photoCh(x.ch), alt: "" }) : h("span", { className: "rc-vide3" }),
              h("div", { className: "q" }, h("b", null, (np[1] ? np[1] + " " : "") + np[0]),
                h("span", null, x.ch || F("cheval à choisir"), k ? h("span", { className: "sup" }, String(k)) : null, x.piste ? " · " + F("piste ") + x.piste : "")),
              h("div", { className: "hh" + (x.h ? "" : " vide") }, x.h || "—"));
          }));
      }));
  }
  function switchVue() {
    var o = [["couples", F("Cavalières")], ["chevaux", F("Chevaux")], ["epreuves", F("Épreuves")]];
    return h("div", { className: "e1-sw", role: "tablist" }, o.map(function (x) {
      return h("button", { key: x[0], type: "button", role: "tab", "aria-selected": vue === x[0], className: vue === x[0] ? "on" : "", onClick: function () { setVue(x[0]); } }, x[1]);
    }));
  }
  function vueCavalieres() {
    return h(React.Fragment, null,
      h("div", { className: "e1-compte" }, lignes.length ? lignes.length + (lignes.length > 1 ? F(" cavalières · ") : F(" cavalière · ")) + nbTours + (nbTours > 1 ? F(" tours") : F(" tour")) : F("Aucune cavalière pour l’instant.")),
      lignes.map(function (l, i) {
        var p = cavDe(l), ouvert = !!editCav[i] || !String(l.nom || "").trim();
        return h("div", { key: l.id || ("n" + i), className: "e1-carte e1-cav" },
          p && hsPhotoProfil(p) ? h("img", { className: "e1-av", src: hsPhotoProfil(p), alt: "" }) : h("div", { className: "e1-av" }, initiales(l.nom)),
          h("div", { className: "e1-cav-c" },
            h("div", { className: "e1-cav-t" },
              h("b", null, String(l.nom || "").trim() || F("Nouvelle cavalière")),
              h("button", { type: "button", className: "hs-lien", onClick: function () { retirerLigne(i); } }, F("Retirer"))),
            ouvert
              ? h("div", { className: "e1-cav-ed" },
                  h("input", { type: "text", value: l.nom || "", placeholder: "NOM Prénom", "aria-label": F("Nom Prénom"), onChange: function (e) { poserL(i, "nom", e.target.value); } }),
                  h("input", { type: "text", value: l.licence || "", placeholder: F("Licence"), autoCapitalize: "characters", "aria-label": F("Licence"), onChange: function (e) { poserL(i, "licence", e.target.value); } }),
                  h("button", { type: "button", className: "hs-lien", onClick: function () { var o = Object.assign({}, editCav); delete o[i]; setEditCav(o); } }, F("OK")))
              : h("button", { type: "button", className: "e1-lic", onClick: function () { var o = Object.assign({}, editCav); o[i] = true; setEditCav(o); } },
                  (String(l.licence || "").trim() ? F("Licence ") + l.licence : F("Licence à compléter")) + " ›"),
            [1, 2].map(function (n) {
              var c = String(l["cheval" + n + "_nom"] || "").trim();
              return h("div", { key: n, className: "e1-tour" },
                c ? h("img", { className: "e1-th", src: photoCh(c), alt: "" }) : h("span", { className: "e1-th vide" }, n),
                h("div", { className: "e1-tour-ch" }, selCh(i, n), h("div", { className: "e1-tour-ep" }, selEp(i, "epreuve" + n))));
            })));
      }),
      /* où on en est : cavalières et chevaux prévus, grisés une fois engagés */
      proposees.length ? h("div", { className: "hs-champ", style: { marginTop: 14 } }, h("label", null, F("Cavalières de compétition") + " · " + proposees.filter(function (c) { return dejaLa[c.id]; }).length + "/" + proposees.length),
        h("div", { className: "hs-puces" }, proposees.map(puceCav))) : null,
      chevauxConc.length ? h("div", { className: "hs-champ", style: { marginTop: 6 } }, h("label", null, F("Chevaux du concours") + " · " + chevauxConc.filter(function (c) { return montes[c.nom]; }).length + "/" + chevauxConc.length),
        h("div", { className: "hs-puces" }, chevauxConc.map(function (c) { var m = montes[c.nom]; return h("span", { key: c.id, className: "hs-puce hs-puce-cav" + (m ? " fait" : "") }, (m ? "✓ " : "") + c.nom); }))) : null,
      h("div", { className: "hs-champ", style: { marginTop: 6 } }, h("label", null, F("Chercher une autre cavalière")),
        h("input", { type: "search", value: recherche, placeholder: F("Nom ou pseudo"), onChange: function (e) { setRecherche(e.target.value); } })),
      q.length >= 2 ? h("div", { className: "hs-puces" },
        resultats.map(puceCav),
        h("button", { type: "button", className: "hs-puce hs-puce-cav", onClick: function () { ajouterCavaliere({ libre: String(recherche).trim() }); } }, F("+ « ") + String(recherche).trim() + F(" » sans compte Hype"))) : null,
      /* lire une fiche existante */
      h("div", { className: "hs-champ", style: { marginTop: 6 } }, h("label", null, F("Ou lire une fiche déjà remplie")),
        h("label", { className: "hs-btn", style: { minHeight: 42, fontSize: 12.5, cursor: "pointer", opacity: lecture === "en_cours" ? 0.6 : 1 } },
          lecture === "en_cours" ? F("Lecture de la fiche… (1 à 2 min)") : F("Photo, capture ou PDF de la fiche"),
          h("input", { type: "file", accept: "image/*,application/pdf", disabled: lecture === "en_cours", onChange: lireFiche, style: { display: "none" } }))),
      lecture && lecture !== "en_cours" ? h("div", { className: "hs-note", style: { marginTop: 4 } }, lecture) : null,
      lus && lus.length ? h("div", { className: "hs-lus" },
        h("div", { className: "hs-pep-t" }, h("span", null, F("Lu sur la fiche")), h("span", null, lus.length + F(" cavalières"))),
        lus.map(function (x, k) {
          return h("label", { key: k, className: "hs-lu" },
            h("input", { type: "checkbox", checked: !!x.coche, onChange: function () { var c = lus.slice(); c[k] = Object.assign({}, x, { coche: !x.coche }); setLus(c); } }),
            h("span", null, h("b", null, x.nom), h("em", null, [x.licence, x.compte ? F("compte Hype : ") + (x.compte.pseudo || x.compte.nom) : F("sans compte Hype"), x.deja ? F("déjà sur la feuille : nom et licence mis à jour") : ""].filter(Boolean).join(" · "))));
        }),
        h("div", { className: "hs-duo", style: { marginTop: 12 } },
          h("button", { type: "button", className: "hs-btn", onClick: ajouterLus }, F("Ajouter à la feuille")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setLus(null); } }, F("Annuler")))) : null);
  }
  function vueChevauxV1() {
    if (!nomsCh.length) return h("div", { className: "hs-vide" }, F("Aucun cheval pour l’instant. Coche-les dans « Chevaux du déplacement » du rendez-vous, ou choisis-les dans les cartes des cavalières."));
    return h(React.Fragment, null,
      h("div", { className: "e1-compte" }, h("span", null, nomsCh.length + (nomsCh.length > 1 ? F(" chevaux · ") : F(" cheval · ")) + libresTot + (libresTot > 1 ? F(" places libres") : F(" place libre"))), choixMax()),
      h("div", { className: "e1-tuiles" }, nomsCh.map(function (c) {
        var m = montes[c] || [], r = toursMax - m.length;
        return h("div", { key: c, className: "e1-tuile" },
          h("div", { className: "e1-tuile-ph" }, h("img", { src: photoCh(c), alt: "" })),
          h("div", { className: "e1-tuile-b" },
            h("h4", null, c), pointsDe(c),
            h("div", { className: "e1-tuile-r" + (r < 0 ? " trop" : "") }, resteDe(c)),
            m.length ? h("div", { className: "e1-tuile-l" }, m.map(function (x, j) { return h("div", { key: j }, (j + 1) + ". " + x.qui, epDe(x) ? h("em", null, " · " + epDe(x)) : null); })) : null));
      })));
  }
  function vueEpreuvesV1() {
    var parEp = {}, ordre = [];
    lignes.forEach(function (l, i) { [1, 2].forEach(function (n) {
      var e = String(l["epreuve" + n] || "").trim(), c = String(l["cheval" + n + "_nom"] || "").trim(); if (!e && !c) return;
      var k = e || F("Épreuve à choisir"); if (!parEp[k]) { parEp[k] = []; ordre.push(k); } parEp[k].push({ qui: String(l.nom || "").trim() || "?", ch: c, i: i, n: n });
    }); });
    ordre.sort(function (a, b) { return (eps.indexOf(a) === -1 ? 99 : eps.indexOf(a)) - (eps.indexOf(b) === -1 ? 99 : eps.indexOf(b)) || a.localeCompare(b, "fr"); });
    if (!ordre.length) return h("div", { className: "hs-vide" }, F("Aucun tour pour l’instant."));
    return h(React.Fragment, null,
      h("div", { className: "e1-compte" }, nbTours + (nbTours > 1 ? F(" tours au total") : F(" tour au total"))),
      ordre.map(function (e, ie) {
        var ph = (parEp[e][0] && parEp[e][0].ch) ? photoCh(parEp[e][0].ch) : PHOTOS_SAISON[ie % PHOTOS_SAISON.length].img;
        return h("div", { key: e, className: "e1-ban" },
          h("div", { className: "e1-ban-ph" }, h("img", { src: ph, alt: "" }),
            h("div", { className: "e1-ban-t" }, h("b", null, e), h("span", null, parEp[e].length + (parEp[e].length > 1 ? F(" tours") : F(" tour"))))),
          h("ol", null, parEp[e].map(function (x, j) {
            var k = 0; (montes[x.ch] || []).forEach(function (y, jj) { if (y.i === x.i && y.n === x.n) k = jj + 1; });
            return h("li", { key: j }, h("span", { className: "k" }, j + 1),
              x.ch ? h("img", { src: photoCh(x.ch), alt: "" }) : h("span", { className: "e1-th vide" }),
              h("div", { className: "q" }, x.qui, h("small", null, x.ch ? x.ch + (k ? " · " + k + (k === 1 ? F("er tour") : F("e tour")) : "") : F("cheval à choisir"))));
          })));
      }));
  }

  return h("div", { className: "hs hs-eng e1", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      carteConcours(),
      switchVue(),
      vue === "chevaux" || vue === "grille" ? vueChevauxV1() : (vue === "epreuves" ? vueEpreuvesV1() : vueCavalieres()),
      recapFin(),
      h("div", { className: "hs-note" }, F("Les licences sont gardées pour la prochaine fois. Seules toi et la cavalière concernée les voient. Chaque cavalière voit son engagement sur la fiche du concours.")),
      /* actions */
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("div", { className: "hs-duo", style: { marginTop: 0 } },
          h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !modifie, onClick: enregistrer }, occupe ? F("Enregistrement…") : (modifie ? F("Enregistrer") : F("✓ Enregistré"))),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setVoirFeuille(true); } }, F("Feuille SEP")))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null),
    voirFeuille ? feuilleSep(h, ev, feuille, lignes, function () { setVoirFeuille(false); }, modifie) : null);
}

/* La feuille « Engagements Concours CSO Club », à l'identique de la fiche papier de la SEP.
   Le bas (Dû, montants, bénéficiaires) reste VIDE : ce n'est pas la coach qui le remplit. */
/* 04/11 23h36 (Blandine : « que le résumé apparaisse sur une deuxième feuille jointe, pour que ce soit clair aussi pour la
   personne qui reçoit les engagements ») : récapitulatif par cheval (tours 1, 2, 3… dans l'ordre de la feuille) et par épreuve. */
function hsRecapFeuille(lignes) {
  var parCh = {}, ordreCh = [], parEp = {}, ordreEp = [];
  /* 04/11 23h45 : « tri » n'existait pas ici (la page plantait) — même ordre que la feuille, par nom */
  /* 05/11 : dans l'ordre des couples de l'appli (pas par nom), pour que le 1er / 2e / 3e tour corresponde au (1) (2) (3) de l'écran */
  var tri = (lignes || []).slice();
  tri.forEach(function (l) { [1, 2].forEach(function (n) {
    var c = String(l["cheval" + n + "_nom"] || "").trim(), e = String(l["epreuve" + n] || "").trim();
    if (c) { if (!parCh[c]) { parCh[c] = []; ordreCh.push(c); } parCh[c].push({ qui: String(l.nom || "").trim(), ep: e }); }
    if (e || c) { var ke = e || "—"; if (!parEp[ke]) { parEp[ke] = 0; ordreEp.push(ke); } parEp[ke]++; }
  }); });
  ordreCh.sort(function (a, b) { return a.localeCompare(b, "fr"); });
  var nbCol = 3; ordreCh.forEach(function (c) { nbCol = Math.max(nbCol, parCh[c].length); });
  var total = 0; ordreEp.forEach(function (e) { total += parEp[e]; });
  return { chevaux: ordreCh, parCh: parCh, epreuves: ordreEp, parEp: parEp, nbCol: Math.min(nbCol, 5), total: total };
}
function feuilleSep(h, ev, fe, lignes, fermer, nonEnregistre) {
  var d = hsDateLoc(ev && ev.date_jour), df = hsDateLoc(ev && ev.date_fin);
  function jj(x) { return String(x.getDate()).padStart(2, "0") + "/" + String(x.getMonth() + 1).padStart(2, "0") + "/" + x.getFullYear(); }
  var date = d ? (df && df.getTime() !== d.getTime() ? "du " + jj(d) + " au " + jj(df) : jj(d)) : "";
  var disc = String(fe.discipline || "").trim();
  var titre = "Engagements Concours " + ((!disc || /^cso$/i.test(disc)) ? "CSO" : disc) + " Club";
  /* comme sur la fiche SEP de Blandine : ordre alphabétique des NOMS (le build 0215 avait mis l'ordre des couples à tort) */
  var tri = lignes.slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
  var vides = Math.max(1, 9 - tri.length);
  function partagerPdf() {
    try {
      var octets = hsPdfFeuille({ titre: titre, date: date, lieu: (ev && ev.lieu) || "", fe: fe, tri: tri, recap: hsRecapFeuille(lignes) });
      var nom = "engagements-" + String((ev && ev.titre) || "concours").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "") + ".pdf";
      var fic = null; try { fic = new File([octets], nom, { type: "application/pdf" }); } catch (eF) { fic = null; }
      if (fic && navigator.canShare && navigator.canShare({ files: [fic] }) && navigator.share) { navigator.share({ files: [fic], title: titre }).catch(function () { }); return; }
      var url = URL.createObjectURL(new Blob([octets], { type: "application/pdf" }));
      var lien = document.createElement("a"); lien.href = url; lien.download = nom; document.body.appendChild(lien); lien.click(); lien.remove();
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (eR) { } }, 60000);
    } catch (eP) { try { window.__hsPdfErreur = String(eP); console.error(eP); } catch (e2) { } }
  }
  function ligneVal(k, v) { return h("div", null, h("span", null, k), h("i", null, v || "")); }
  return h("div", { id: "zone-impression", className: "hs-feuille", role: "dialog", "aria-label": titre },
    h("div", { className: "bar no-print" },
      h("button", { type: "button", className: "p", onClick: function () { partagerPdf(); } }, "Enregistrer en PDF"),
      h("button", { type: "button", className: "f", onClick: function () { try { window.print(); } catch (e) { } } }, "Imprimer"),
      h("button", { type: "button", className: "f", onClick: fermer }, "Fermer")),
    nonEnregistre ? h("div", { className: "no-print", style: { maxWidth: 780, margin: "10px auto 0", padding: "0 16px", fontSize: 12.5, color: "#8a5a00" } }, "Attention : tes dernières modifications ne sont pas encore enregistrées. Elles apparaissent quand même ci-dessous.") : null,
    h("div", { className: "page" },
      h("h2", null, titre),
      h("div", { className: "tete" },
        ligneVal("Date :", date), ligneVal("Lieu :", ev && ev.lieu),
        ligneVal("Discipline :", fe.discipline), ligneVal("N° Concours :", fe.numero),
        h("div", null, h("span", null, "Chef d’équipe :"), h("i", null, (fe.chef_nom || "") + (fe.chef_licence ? "   Lic. " + fe.chef_licence : ""))),
        ligneVal("Prix engagement :", fe.prix),
        h("div", null), h("div", null, h("small", null, "Transport oui ou non :"), h("i", null, fe.transport || "")),
        h("div", null), h("div", null, h("small", null, "A facturer le :"), h("i", null, fe.facturer_le || ""))),
      h("table", { className: "grille" },
        h("thead", null, h("tr", null,
          h("th", { className: "c", style: { width: "22%" } }, "CAVALIERS"), h("th", { className: "c", style: { width: "5%" } }, "Dû"), h("th", { className: "c", style: { width: "13%" } }, "Licence"),
          h("th", { className: "c", style: { width: "10%" } }, "Ep."), h("th", { style: { width: "19%" } }, "CHEVAL"), h("th", { className: "c", style: { width: "10%" } }, "Ep."), h("th", { style: { width: "21%" } }, "CHEVAL"))),
        h("tbody", null,
          tri.map(function (l, i) {
            return h("tr", { key: i }, h("td", null, l.nom || ""), h("td", null, ""), h("td", { className: "c" }, l.licence || ""),
              h("td", { className: "c" }, l.epreuve1 || ""), h("td", null, l.cheval1_nom || ""), h("td", { className: "c" }, l.epreuve2 || ""), h("td", null, l.cheval2_nom || ""));
          }),
          Array.apply(null, Array(vides)).map(function (x, i) { return h("tr", { key: "v" + i }, h("td", null), h("td", null), h("td", null), h("td", null), h("td", null), h("td", null), h("td", null)); }))),
      h("table", { className: "bas" },
        h("thead", null, h("tr", null, h("th", { style: { border: "none" } }), h("th", null, "Montant"), h("th", null, "Bénéficiaires"))),
        h("tbody", null, ["Engagements", "Location chevaux", "Coaching", "Transport"].map(function (k) { return h("tr", { key: k }, h("td", null, k), h("td", null), h("td", null)); }),
          h("tr", null, h("td", { style: { textAlign: "right", fontWeight: 700, border: "none" } }, "TOTAL"), h("td", null), h("td", null)))),
      h("div", { className: "fait" }, "Engagements faits le ", h("span", { style: { display: "inline-block", minWidth: 170, borderBottom: "1px dotted #888", fontWeight: 700 } }, fe.faits_le || ""))),
    (function () {
      var R = hsRecapFeuille(lignes); if (!R.chevaux.length) return null;
      var cols = []; for (var j = 0; j < R.nbCol; j++) cols.push(j);
      return h("div", { className: "page", style: { marginTop: 18 } },
        h("h2", null, "Récapitulatif des engagements"),
        h("div", { style: { textAlign: "center", fontSize: 12.5, marginBottom: 14 } }, [date, ev && ev.lieu].filter(Boolean).join(" · ") + " — " + tri.length + " cavaliers, " + R.total + " tours"),
        h("table", { className: "grille" },
          h("thead", null, h("tr", null, h("th", { style: { width: "24%" } }, "CHEVAL"), h("th", { className: "c", style: { width: "8%" } }, "Tours"),
            cols.map(function (j) { return h("th", { key: j }, (j + 1) + (j === 0 ? "er" : "e") + " tour"); }))),
          h("tbody", null, R.chevaux.map(function (c) {
            var m = R.parCh[c];
            return h("tr", { key: c }, h("td", null, c), h("td", { className: "c" }, String(m.length)),
              cols.map(function (j) { var x = m[j]; return h("td", { key: j }, x ? (x.qui + (x.ep ? " · " + x.ep : "")) : ""); }));
          }))),
        h("table", { className: "grille", style: { marginTop: 16, width: "50%" } },
          h("thead", null, h("tr", null, h("th", null, "ÉPREUVE"), h("th", { className: "c" }, "Tours"))),
          h("tbody", null, R.epreuves.map(function (e) { return h("tr", { key: e }, h("td", null, e), h("td", { className: "c" }, String(R.parEp[e]))); }),
            h("tr", null, h("td", { style: { fontWeight: 700 } }, "Total"), h("td", { className: "c", style: { fontWeight: 700 } }, String(R.total))))));
    })());
}

/* ── Le PDF de la feuille, écrit directement (aucune bibliothèque à charger) : polices standard des PDF
   (Helvetica, Helvetica-Bold, Times-Italic), encodage Windows-1252 (accents français). A4 portrait. ── */
var HS_CP1252 = { 0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F };
function hsPdfTexte(t) {
  var s = String(t == null ? "" : t), o = "";
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i), b = (c < 0x80 || (c >= 0xA0 && c <= 0xFF)) ? c : (HS_CP1252[c] || 0x3F);
    if (b < 0x20) b = 0x20;
    var ch = String.fromCharCode(b);
    if (ch === "(" || ch === ")" || ch === "\\") ch = "\\" + ch;
    o += ch;
  }
  return o;
}
var hsMesureCtx = null;
function hsLargeur(t, police, taille) {
  try {
    if (!hsMesureCtx) hsMesureCtx = document.createElement("canvas").getContext("2d");
    hsMesureCtx.font = (police === "F2" ? "bold " : (police === "F3" ? "italic " : "")) + "100px " + (police === "F3" ? "'Times New Roman',Times,serif" : "Helvetica,Arial,sans-serif");
    return hsMesureCtx.measureText(String(t || "")).width * taille / 100;
  } catch (e) { return String(t || "").length * taille * 0.55; }
}
function hsCouper(t, police, taille, max) {
  var s = String(t || "");
  if (hsLargeur(s, police, taille) <= max) return s;
  while (s.length > 1 && hsLargeur(s + "…", police, taille) > max) s = s.slice(0, -1);
  return s + "…";
}
function hsPdfFeuille(o) {
  var W = 595.28, H = 841.89, ops = [];
  function Y(y) { return (H - y).toFixed(2); }
  function txt(x, y, t, pol, tl, coul) {
    if (!t) return;
    ops.push((coul || "0 0 0") + " rg BT /" + pol + " " + tl + " Tf " + x.toFixed(2) + " " + Y(y) + " Td (" + hsPdfTexte(t) + ") Tj ET");
  }
  function txtC(x1, x2, y, t, pol, tl) { if (!t) return; var tt = hsCouper(t, pol, tl, x2 - x1 - 6); txt(x1 + (x2 - x1 - hsLargeur(tt, pol, tl)) / 2, y, tt, pol, tl); }
  function txtG(x1, x2, y, t, pol, tl) { if (!t) return; txt(x1 + 4, y, hsCouper(t, pol, tl, x2 - x1 - 8), pol, tl); }
  function trait(x1, y1, x2, y2, ep) { ops.push((ep || 0.8) + " w 0 0 0 RG " + x1.toFixed(2) + " " + Y(y1) + " m " + x2.toFixed(2) + " " + Y(y2) + " l S"); }
  function pointilles(x1, x2, y) { ops.push("[0.6 1.6] 0 d 0.5 w 0.45 0.45 0.45 RG " + x1.toFixed(2) + " " + Y(y) + " m " + x2.toFixed(2) + " " + Y(y) + " l S [] 0 d"); }
  function cadre(x, y, w, hh) { ops.push("0.8 w 0 0 0 RG " + x.toFixed(2) + " " + Y(y + hh) + " " + w.toFixed(2) + " " + hh.toFixed(2) + " re S"); }
  var fe = o.fe || {};
  /* titre */
  var tlT = 24; txt((W - hsLargeur(o.titre, "F3", tlT)) / 2, 66, o.titre, "F3", tlT, "0.11 0.16 0.54");
  /* en-tête : deux colonnes, valeurs en gras sur pointillés */
  function champ(x, y, lab, val, xFin, tlab) {
    var t2 = tlab || 10.5; txt(x, y, lab, "F1", t2); var xv = x + hsLargeur(lab, "F1", t2) + 5;
    pointilles(xv, xFin, y + 2); if (val) txt(xv + 2, y - 1, hsCouper(val, "F2", 10.5, xFin - xv - 4), "F2", 10.5);
  }
  champ(52, 112, "Date :", o.date, 285); champ(52, 132, "Discipline :", fe.discipline, 285);
  champ(52, 152, "Chef d’équipe :", fe.chef_nom, 285);
  txt(135, 167, "Lic." + (fe.chef_licence ? " " + fe.chef_licence : ""), "F2", 10.5);
  champ(318, 112, "Lieu :", o.lieu, 548); champ(318, 132, "N° Concours :", fe.numero, 548);
  champ(318, 152, "Prix engagement :", fe.prix, 548);
  champ(318, 167, "Transport oui ou non :", fe.transport, 548, 9); champ(318, 181, "A facturer le :", fe.facturer_le, 470, 9);
  /* grille des engagements */
  var x0 = 40, wT = 515, props = [22, 5, 13, 10, 19, 10, 21], xs = [x0];
  props.forEach(function (p) { xs.push(xs[xs.length - 1] + wT * p / 100); });
  var tri = o.tri || [], n = Math.max(9, tri.length + 1), yT = 200, hT = 24, hL = Math.min(34, (590 - yT - hT) / n);
  var yFin = yT + hT + n * hL;
  cadre(x0, yT, wT, yFin - yT);
  trait(x0, yT + hT, x0 + wT, yT + hT);
  for (var r = 1; r < n; r++) trait(x0, yT + hT + r * hL, x0 + wT, yT + hT + r * hL, 0.6);
  for (var c = 1; c < xs.length - 1; c++) trait(xs[c], yT, xs[c], yFin, 0.6);
  var tete = ["CAVALIERS", "Dû", "Licence", "Ep.", "CHEVAL", "Ep.", "CHEVAL"];
  tete.forEach(function (t, i) { if (i === 4 || i === 6) txtG(xs[i], xs[i + 1], yT + 16, t, "F2", 10); else txtC(xs[i], xs[i + 1], yT + 16, t, "F2", 10); });
  var tlL = hL < 22 ? 8.5 : 9.5;
  /* le nom d'une épreuve rétrécit pour tenir dans sa case (jusqu'à 6,5) avant d'être coupé */
  function taillePour(t, max, t0) { var tt = t0; while (tt > 6.5 && hsLargeur(t, "F2", tt) > max) tt -= 0.5; return tt; }
  tri.forEach(function (l, i) {
    var yy = yT + hT + i * hL + hL / 2 + 3.5;
    txtG(xs[0], xs[1], yy, l.nom, "F2", tlL); txtC(xs[2], xs[3], yy, l.licence, "F2", tlL);
    txtC(xs[3], xs[4], yy, l.epreuve1, "F2", taillePour(l.epreuve1, xs[4] - xs[3] - 6, tlL)); txtG(xs[4], xs[5], yy, l.cheval1_nom, "F2", tlL);
    txtC(xs[5], xs[6], yy, l.epreuve2, "F2", taillePour(l.epreuve2, xs[6] - xs[5] - 6, tlL)); txtG(xs[6], xs[7], yy, l.cheval2_nom, "F2", tlL);
  });
  /* petite case sous la colonne « Dû », comme sur la fiche */
  cadre(xs[1], yFin, xs[2] - xs[1], 14);
  /* tableau du bas, laissé vide (ce n'est pas la coach qui le remplit) */
  var yB = yFin + 40, xa = 300, xb = 420, xc = 490, xd = 555, hB = 15;
  cadre(xb, yB, xd - xb, hB); trait(xc, yB, xc, yB + hB);
  txtC(xb, xc, yB + 11, "Montant", "F1", 9.5); txtC(xc, xd, yB + 11, "Bénéficiaires", "F1", 9.5);
  ["Engagements", "Location chevaux", "Coaching", "Transport"].forEach(function (t, i) {
    var yy = yB + hB * (i + 1); cadre(xa, yy, xd - xa, hB); trait(xb, yy, xb, yy + hB); trait(xc, yy, xc, yy + hB); txt(xa + 4, yy + 11, t, "F1", 9.5);
  });
  var yTot = yB + hB * 5;
  trait(xa, yTot + hB, xb, yTot + hB); cadre(xb, yTot, xd - xb, hB * 2); trait(xc, yTot, xc, yTot + hB * 2); trait(xb, yTot + hB, xd, yTot + hB);
  txt(xb - 8 - hsLargeur("TOTAL", "F1", 9.5), yTot + 11, "TOTAL", "F1", 9.5);
  /* engagements faits le */
  var yF = yTot + hB * 2 + 30; txt(60, yF, "Engagements faits le", "F1", 9.5);
  var xF = 60 + hsLargeur("Engagements faits le", "F1", 9.5) + 6; pointilles(xF, xF + 140, yF + 2);
  if (fe.faits_le) txt(xF + 2, yF - 1, fe.faits_le, "F2", 9.5);
  var flux = ops.map(hsPdfTexteBrut).join("\n");
  /* page 2 : récapitulatif (par cheval, puis par épreuve) */
  var flux2 = "", R = o.recap;
  if (R && R.chevaux && R.chevaux.length) {
    ops = [];
    txt((W - hsLargeur("Récapitulatif des engagements", "F3", 22)) / 2, 66, "Récapitulatif des engagements", "F3", 22, "0.11 0.16 0.54");
    var sous = [o.date, o.lieu].filter(Boolean).join(" · ") + " — " + (o.tri || []).length + " cavaliers, " + R.total + " tours";
    txt((W - hsLargeur(sous, "F1", 10)) / 2, 88, sous, "F1", 10);
    var px = [40, 40 + 515 * 0.24, 40 + 515 * 0.32], reste = 515 * 0.68 / R.nbCol;
    for (var j = 1; j <= R.nbCol; j++) px.push(px[2] + reste * j);
    var y2 = 112, hh2 = 22, hl2 = Math.max(16, Math.min(28, (560 - y2 - hh2) / R.chevaux.length)), yf2 = y2 + hh2 + R.chevaux.length * hl2;
    cadre(40, y2, 515, yf2 - y2); trait(40, y2 + hh2, 555, y2 + hh2);
    for (var r2 = 1; r2 < R.chevaux.length; r2++) trait(40, y2 + hh2 + r2 * hl2, 555, y2 + hh2 + r2 * hl2, 0.6);
    for (var c2 = 1; c2 < px.length - 1; c2++) trait(px[c2], y2, px[c2], yf2, 0.6);
    txtG(px[0], px[1], y2 + 15, "CHEVAL", "F2", 9.5); txtC(px[1], px[2], y2 + 15, "Tours", "F2", 9.5);
    for (var j2 = 0; j2 < R.nbCol; j2++) txtG(px[3 + j2 - 1], px[3 + j2], y2 + 15, (j2 + 1) + (j2 === 0 ? "er" : "e") + " tour", "F2", 9.5);
    var tl2 = hl2 < 20 ? 8 : 9;
    R.chevaux.forEach(function (c, i) {
      var yy = y2 + hh2 + i * hl2 + hl2 / 2 + 3.2, m = R.parCh[c];
      txtG(px[0], px[1], yy, c, "F2", tl2); txtC(px[1], px[2], yy, String(m.length), "F2", tl2);
      for (var j3 = 0; j3 < R.nbCol; j3++) { var x = m[j3]; if (x) txtG(px[2 + j3], px[3 + j3], yy, x.qui + (x.ep ? " · " + x.ep : ""), "F1", tl2); }
    });
    /* par épreuve */
    var ye = yf2 + 30, he = 18, xe = [40, 230, 300];
    cadre(40, ye, 260, he * (R.epreuves.length + 2)); trait(230, ye, 230, ye + he * (R.epreuves.length + 2), 0.6);
    txtG(xe[0], xe[1], ye + 12.5, "ÉPREUVE", "F2", 9.5); txtC(xe[1], xe[2], ye + 12.5, "Tours", "F2", 9.5);
    R.epreuves.forEach(function (e, i) { var yy = ye + he * (i + 1); trait(40, yy, 300, yy, 0.6); txtG(xe[0], xe[1], yy + 12.5, e, "F1", 9); txtC(xe[1], xe[2], yy + 12.5, String(R.parEp[e]), "F1", 9); });
    var yt = ye + he * (R.epreuves.length + 1); trait(40, yt, 300, yt, 0.8); txtG(xe[0], xe[1], yt + 12.5, "Total", "F2", 9.5); txtC(xe[1], xe[2], yt + 12.5, String(R.total), "F2", 9.5);
    flux2 = ops.map(hsPdfTexteBrut).join("\n");
  }
  /* assemblage du fichier */
  var res = "<< /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >>";
  var objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R" + (flux2 ? " 8 0 R" : "") + "] /Count " + (flux2 ? 2 : 1) + " >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources " + res + " /Contents 4 0 R >>",
    "<< /Length " + flux.length + " >>\nstream\n" + flux + "\nendstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>"
  ];
  if (flux2) objs.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources " + res + " /Contents 9 0 R >>", "<< /Length " + flux2.length + " >>\nstream\n" + flux2 + "\nendstream");
  var out = "%PDF-1.4\n%âãÏÓ\n", pos = [];
  objs.forEach(function (ob, i) { pos.push(out.length); out += (i + 1) + " 0 obj\n" + ob + "\nendobj\n"; });
  var xref = out.length;
  out += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
  pos.forEach(function (p) { out += String(p).padStart(10, "0") + " 00000 n \n"; });
  out += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF";
  var octets = new Uint8Array(out.length);
  for (var k = 0; k < out.length; k++) octets[k] = out.charCodeAt(k) & 0xFF;
  return octets;
}
/* les opérations sont déjà en octets 0-255 (texte converti par hsPdfTexte) : rien à faire */
function hsPdfTexteBrut(x) { return x; }


/* ═══════════════════════════════════════════════════════════════════════════════
   04/11/2026 21h — CENTRE DE COMPÉTITION, ÉTAPE 3 (Blandine 21h20 : « mets tout en ligne, t'as carte blanche
   et on refera au fur et à mesure ensemble »). Trois écrans de plus, même design :
     · LISTE DU VAN (écran « liste-van ») : la liste de la cavalière pour ce concours, à cocher, recopiée de
       son dernier concours (cases décochées), téléchargeable en PDF. Table listes_van (elle seule).
     · JOUR J (écran « jour-j », coach) : heures de passage et pistes de chaque couple, décalage groupé d'une
       épreuve (+/- minutes), alerte quand deux passages tombent en même temps sur deux pistes différentes,
       lien des résultats en direct (club_agenda.lien_direct, collé par la coach : la recherche automatique
       viendra plus tard). Colonnes passage1/piste1/passage2/piste2 de concours_engagements.
     · LE DOSSIER (écran « dossier-concours ») : papiers du van (coach seulement, fichiers privés), vaccins des
       chevaux engagés (page Santé, mêmes droits), licences (chacune la sienne, la coach toutes).
   ═══════════════════════════════════════════════════════════════════════════════ */
function hsMinutes(v) {
  var m = String(v || "").trim().toLowerCase().match(/^(\d{1,2})\s*[h:.]\s*(\d{0,2})$/);
  if (!m) return 99999;
  return Number(m[1]) * 60 + Number(m[2] || 0);
}
function hsHeure(min) {
  if (!(min >= 0 && min < 24 * 60)) return "";
  var hh = Math.floor(min / 60), mm = min % 60;
  return hh + "h" + (mm < 10 ? "0" : "") + mm;
}
function hsEstVideo(m) { var s = String(m || ""); return /^mux:/.test(s) || /\.(mp4|mov|m4v|webm|m3u8)(\?|$)/i.test(s); }
function hsUrlVideo(m) { var s = String(m || ""); if (/^mux:/.test(s)) { try { return (typeof hypeMuxLecture === "function") ? hypeMuxLecture(s) : "https://stream.mux.com/" + s.slice(4) + ".m3u8"; } catch (e) { return ""; } } return s; }
function hsVignetteVideo(m) { var s = String(m || ""); if (/^mux:/.test(s)) return "https://image.mux.com/" + s.slice(4) + "/thumbnail.jpg?width=480&fit_mode=preserve"; return ""; }
function hsTemps(t) { t = Math.max(0, Math.round(Number(t) || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); }

/* ════════════════════ VIDÉO DE PARCOURS COMMENTÉE ════════════════════
   04/11 22h15 (carte blanche). La vidéo publiée sur le fil du concours, et des commentaires posés à un instant
   précis (table video_notes) : la coach (ou la cavalière sur sa propre vidéo) met la vidéo en pause et écrit ;
   toucher un commentaire ramène la vidéo à ce moment-là. Lecture : la cavalière, la coach du club, l'auteur. */
function EcranVideoParcours() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var V = null; try { V = window.__videoParcours || null; if (V) localStorage.setItem("hype_video_parcours", JSON.stringify(V)); else V = JSON.parse(localStorage.getItem("hype_video_parcours") || "null"); } catch (e0) { }
  var refV = React.useRef(null);
  var _no = React.useState(null); var notes = _no[0], setNotes = _no[1];
  var _tx = React.useState(""); var texte = _tx[0], setTexte = _tx[1];
  var _t = React.useState(0); var tps = _t[0], setTps = _t[1];
  var _ge = React.useState(false); var peutEcrire = _ge[0], setPeutEcrire = _ge[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  function charger() {
    if (!V) return;
    supa.from("video_notes").select("*").eq("media", V.media).order("t", { ascending: true }).then(function (r) { setNotes((r && !r.error && r.data) || []); });
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      if (!V) return;
      var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
      if (vif) setMoi(u);
      var g = false;
      if (u && V.proprio === u.id) g = true;
      else if (V.agenda) { try { var r = await chargerAgendaEvenement(V.agenda); if (r && r.data) g = await hsPeutGerer(r.data.club_clef); } catch (eG) { } }
      if (vif) setPeutEcrire(g);
      charger();
    })();
    return function () { vif = false; };
  }, []);
  function aller(t) { try { var v = refV.current; v.currentTime = Number(t) || 0; v.play(); } catch (e) { } }
  async function ajouter() {
    var t = String(texte || "").trim(); if (!t || occupe) return;
    setOccupe(true); setMsg("");
    try {
      var r = await supa.from("video_notes").insert({ agenda_id: V.agenda || null, media: V.media, proprio: V.proprio || null, t: Math.round(tps * 10) / 10, texte: t }).select("id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(F("refusé par la base"));
      setTexte(""); charger();
    } catch (eA) { setMsg(F("Pas enregistré : ") + String((eA && eA.message) || eA)); }
    setOccupe(false);
  }
  async function retirer(n) {
    try { var r = await supa.from("video_notes").delete().eq("id", n.id).select("id"); if (r && r.error) throw new Error(r.error.message); charger(); } catch (eR) { setMsg(String((eR && eR.message) || eR)); }
  }
  var retour = h("div", { className: "hs-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 10px)" } },
    h("button", { type: "button", className: "hs-retour", onClick: function () { hsRetour(c.app, c.setEcran, "concours"); } }, h("i", null, "‹"), (V && V.titre) || F("Concours")));
  if (!V) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, retour, h("div", { className: "hs-in" }, h("div", { className: "hs-vide" }, F("Vidéo introuvable."))));
  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, retour,
    h("div", { className: "hs-in" },
      h("div", { className: "hs-titre", style: { marginTop: 4, marginBottom: 14 } }, h("h1", { style: { fontSize: "clamp(32px,9vw,46px)" } }, F("Le parcours")), V.pseudo ? h("p", null, V.pseudo) : null),
      h("video", { ref: refV, src: hsUrlVideo(V.media), poster: hsVignetteVideo(V.media) || undefined, controls: true, playsInline: true, preload: "metadata", onTimeUpdate: function (e) { setTps(e.target.currentTime || 0); }, style: { width: "100%", maxHeight: "62vh", borderRadius: 14, background: "#000", display: "block" } }),
      h("div", { className: "hs-sec" }, h("b", null, F("Les commentaires")), h("span", null, notes ? String(notes.length) : "")),
      notes === null ? h("div", { className: "hs-attente" }, "…") : (notes.length ? h("div", { className: "hs-carte" }, notes.map(function (n) {
        return h("div", { key: n.id, className: "hs-row", style: { alignItems: "flex-start" } },
          h("button", { type: "button", onClick: function () { aller(n.t); }, style: { flex: "0 0 auto", minWidth: 52, minHeight: 32, borderRadius: 999, border: "1px solid rgba(201,166,107,.7)", background: "transparent", color: "#C9A66B", fontSize: 12.5, fontVariantNumeric: "tabular-nums" } }, hsTemps(n.t)),
          h("div", { className: "g" }, h("b", { style: { whiteSpace: "pre-wrap", lineHeight: 1.4 } }, n.texte)),
          (moi && n.auteur === moi.id) ? h("button", { type: "button", "aria-label": F("Retirer"), onClick: function () { retirer(n); }, style: { flex: "0 0 auto", width: 30, height: 30, background: "none", border: "none", color: "rgba(243,238,228,.45)", fontSize: 17, padding: 0 } }, "×") : null);
      })) : h("div", { className: "hs-vide" }, peutEcrire ? F("Mets la vidéo en pause au bon moment et écris ton commentaire.") : F("Pas encore de commentaire de ta coach."))),
      peutEcrire ? h("div", { style: { marginTop: 14 } },
        h("div", { className: "hs-champ" }, h("label", null, F("Commentaire à ") + hsTemps(tps)),
          h("textarea", { value: texte, rows: 3, placeholder: F("ex. Abord trop rapide, reprends le galop avant le virage"), onFocus: function () { try { refV.current.pause(); } catch (e) { } }, onChange: function (e) { setTexte(e.target.value); }, style: { width: "100%", borderRadius: 10, border: "1px solid rgba(243,238,228,.16)", background: "rgba(16,26,29,.6)", color: "#F3EEE4", fontFamily: "inherit", fontSize: 16, padding: "10px 12px", resize: "vertical" } })),
        h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !String(texte).trim(), onClick: ajouter }, occupe ? "…" : F("Ajouter à ") + hsTemps(tps))) : null,
      msg ? h("div", { className: "hs-msg" }, msg) : null,
      h("div", { className: "hs-note" }, F("Touche une heure pour revoir ce moment. Commentaires visibles par la cavalière, sa coach et leur auteur."))));
}

function hsOrdreBase(L) {
  var o = {}; (L || []).forEach(function (l, i) { o[i + "-1"] = hsMinutes(l.passage1); o[i + "-2"] = hsMinutes(l.passage2); }); return o;
}
function hsHeurePropre(v) {
  try { if (typeof hypeHeurePropre === "function") return hypeHeurePropre(v); } catch (e) { }
  return String(v || "").trim();
}
function hsCtx() {
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  return { app: app, setEcran: app.setEcran || function () { }, F: function (fr) { return tr({ fr: fr }); }, T: function (fr) { return hsT(tr, fr, lg); }, rtl: lg === "ar" };   /* T : traduit (liste du van) */
}
function hsRetour(app, setEcran, defaut) { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran(defaut); }
/* 04/11 23h20 (Blandine : en revenant dans l'appli, « Impossible d'ouvrir ce concours : concours introuvable ») : quand l'iPhone
   relance Hype, les repères gardés en mémoire vive sont perdus. Le concours ouvert est donc aussi noté sur le téléphone
   (localStorage) et relu s'il manque. Rien en base. */
function hsIdConcours() {
  var id = null;
  try { id = window.__concoursId || window.__engagementsId || null; } catch (e) { }
  try {
    if (id) localStorage.setItem("hype_concours_ouvert", String(id));
    else { id = localStorage.getItem("hype_concours_ouvert") || null; if (id) { window.__concoursId = id; window.__engagementsId = id; } }
  } catch (e2) { }
  return id;
}

/* ── la liste par défaut, la toute première fois (modifiable ligne par ligne) ── */
/* 04/11 22h45 (Blandine) : + ses ajouts du 04/11 (retouches validées : « Guêtres ou bandes de polo », « Enrênement », « Gants » seul) */
var HS_LISTE_DEFAUT = [
  { r: "cheval", t: "Selle et tapis" }, { r: "cheval", t: "Filet ou bride" }, { r: "cheval", t: "Sangle bavette" },
  { r: "cheval", t: "Guêtres ou bandes de polo, protège-boulets" }, { r: "cheval", t: "Enrênement si le cheval en a" }, { r: "cheval", t: "Amortisseur pour le dos" },
  { r: "cheval", t: "Protections de transport" }, { r: "cheval", t: "Licol et longe" }, { r: "cheval", t: "Couverture" },
  { r: "cheval", t: "Seau, foin et eau" }, { r: "cheval", t: "Nourriture si concours prolongé à l’extérieur" }, { r: "cheval", t: "Trousse de pansage" },
  { r: "cheval", t: "Élastiques pour natter et ciseaux" }, { r: "cheval", t: "Tendonyl ou équivalent post compétition à mettre sur les membres" },
  { r: "cheval", t: "Stable boots pour le repos après compétition" }, { r: "cheval", t: "Livret du cheval (vaccins)" },
  { r: "moi", t: "Casque" }, { r: "moi", t: "Veste de concours" }, { r: "moi", t: "Culotte claire" }, { r: "moi", t: "Bottes" },
  { r: "moi", t: "Gants" }, { r: "moi", t: "Cravache" }, { r: "moi", t: "Éperons" }, { r: "moi", t: "Airbag" },
  { r: "moi", t: "Cartouche de recharge et / ou protection dorsale" }, { r: "moi", t: "Matériel pour changer la cartouche" },
  { r: "moi", t: "Manteau ou veste imperméable" }, { r: "moi", t: "Affaires de rechange en cas de pluie" },
  { r: "moi", t: "Licence sur le téléphone" }, { r: "moi", t: "Eau et goûter" }
];

/* ════════════════════ LISTE DU VAN ════════════════════ */
function EcranListeVan() {
  var h = React.createElement, c = hsCtx(), F = c.T, rtl = c.rtl;   /* 04/11 23h10 : traduite */
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _it = React.useState(null); var items = _it[0], setItems = _it[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _st = React.useState(""); var etat = _st[0], setEtat = _st[1];
  var _nv = React.useState({ cheval: "", moi: "" }); var nouv = _nv[0], setNouv = _nv[1];
  var _ch = React.useState(""); var nomCheval = _ch[0], setNomCheval = _ch[1];
  var _mt = React.useState(""); var materiel = _mt[0], setMateriel = _mt[1];
  var _en = React.useState(""); var enrenement = _en[0], setEnrenement = _en[1];
  var _ed = React.useState(false); var edition = _ed[0], setEdition = _ed[1];
  var _ou = React.useState(null); var ouvert = _ou[0], setOuvert = _ou[1];
  var _pc = React.useState(""); var photoCheval = _pc[0], setPhotoCheval = _pc[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var minuteur = React.useRef(null);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        if (!u || !u.id) { if (vif) { setMoi(null); setItems([]); } return; }
        if (vif) setMoi(u);
        var r = await chargerAgendaEvenement(idEv); if (vif && r && r.data) setEv(r.data);
        var rl = await supa.from("listes_van").select("items").eq("agenda_id", idEv).eq("user_id", u.id).maybeSingle();
        if (rl && rl.error) throw new Error(rl.error.message || String(rl.error));
        var L = rl && rl.data && Array.isArray(rl.data.items) ? rl.data.items : null;
        if (!L) {
          /* gardée d'un concours à l'autre : on repart de sa dernière liste, cases décochées */
          var rp = await supa.from("listes_van").select("items").eq("user_id", u.id).neq("agenda_id", idEv).order("maj_le", { ascending: false }).limit(1);
          var der = rp && rp.data && rp.data[0] && Array.isArray(rp.data[0].items) ? rp.data[0].items : null;
          L = (der && der.length ? der : HS_LISTE_DEFAUT).filter(function (x) { return x.r !== "propre"; }).map(function (x) { return { r: x.r === "moi" ? "moi" : "cheval", t: der && der.length ? String(x.t || "") : F(String(x.t || "")), f: false }; });   /* la liste de départ, dans la langue de la cavalière */   /* le matériel propre au cheval vient de SA fiche, à chaque concours */
        }
        if (vif) setItems(L);
        /* le cheval engagé et ses consignes de matériel (page Santé) */
        try {
          var re = await supa.from("concours_engagements").select("cheval1_id, cheval1_nom").eq("agenda_id", idEv).eq("cavalier_id", u.id).limit(1);
          var e = re && re.data && re.data[0];
          if (e && vif) setNomCheval(e.cheval1_nom || "");
          if (e && e.cheval1_id) {
            var rc = await supa.from("cheval_consignes").select("materiel, enrenement").eq("cheval_id", e.cheval1_id).maybeSingle();
            if (vif && rc && rc.data && rc.data.materiel) setMateriel(rc.data.materiel);
            if (vif && rc && rc.data && rc.data.enrenement) setEnrenement(rc.data.enrenement);
            try { var rph = await supa.from("chevaux").select("photo_url").eq("id", e.cheval1_id).maybeSingle(); if (vif && rph && rph.data && rph.data.photo_url) setPhotoCheval(rph.data.photo_url); } catch (ePh) { }
          }
        } catch (eE) { }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setItems(function (x) { return x || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function sauver(L) {
    setItems(L); setEtat("…");
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(async function () {
      try {
        var r = await supa.from("listes_van").upsert({ user_id: moi.id, agenda_id: idEv, items: L, maj_le: new Date().toISOString() }, { onConflict: "user_id,agenda_id" }).select("agenda_id");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        if (!r || !r.data || !r.data.length) throw new Error(F("refusé par la base"));
        setEtat("✓");
      } catch (eS) { setEtat(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    }, 600);
  }
  function cocher(i) { if (typeof i === "string") { sauver(items.concat([{ r: "propre", t: i, f: true }])); return; } var L = items.slice(); L[i] = Object.assign({}, L[i], { f: !L[i].f }); sauver(L); }
  function retirer(i) { sauver(items.filter(function (x, j) { return j !== i; })); }
  function ajouter(r) { var t = String(nouv[r] || "").trim(); if (!t) return; sauver(items.concat([{ r: r, t: t, f: false }])); var n = Object.assign({}, nouv); n[r] = ""; setNouv(n); }
  function toutDecocher() { sauver(items.map(function (x) { return Object.assign({}, x, { f: false }); })); }

  /* la liste propre au cheval engagé : ses consignes (matériel, enrênement) de sa fiche, en lignes à cocher */
  var propres = [];
  [materiel, enrenement].forEach(function (t) { String(t || "").split(/[\n,;]+/).forEach(function (z) { z = z.trim(); if (z) propres.push(z); }); });
  var lignesPropres = propres.map(function (t) { var i = -1; (items || []).forEach(function (x, j) { if (x.r === "propre" && x.t === t) i = j; }); return { x: i >= 0 ? (items || [])[i] : { t: t, f: false }, i: i, t: t }; });
  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Liste du van"),
    sous: items && items.length ? (function () { var vus = items.filter(function (x) { return x.r !== "propre"; }); var n = vus.filter(function (x) { return x.f; }).length + lignesPropres.filter(function (o) { return o.x.f; }).length; return n + F(" sur ") + (vus.length + lignesPropres.length) + F(" cochés."); })() : "" });
  if (items === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-attente" }, "…")));
  if (!moi) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Connecte-toi pour avoir ta liste."))));

  /* 04/11 22h45 (Blandine : « j’aime bien la troisième ») — LISTE DU VAN AU STYLE DE LA VIDÉOTHÈQUE : une carte par partie (photo à gauche,
     titre, étiquette dorée, barre de progression), une seule dépliée à la fois ; les × et « Ajouter une ligne » seulement en mode « Modifier ». */
  function croix(x, i) { return edition ? h("button", { type: "button", "aria-label": F("Retirer ") + x.t, onClick: function () { retirer(i); }, style: { flex: "0 0 auto", width: 26, height: 26, background: "none", border: "none", color: "rgba(243,238,228,.45)", fontSize: 16, padding: 0 } }, "×") : null; }
  function ajoutLigne(r) {
    return edition ? h("div", { style: { padding: "8px 10px" } }, h("div", { className: "hs-ajout", style: { width: "100%" } },
      h("input", { type: "text", value: nouv[r], placeholder: F("Ajouter une ligne"), onChange: function (e) { var n = Object.assign({}, nouv); n[r] = e.target.value; setNouv(n); }, onKeyDown: function (e) { if (e.key === "Enter") { e.preventDefault(); ajouter(r); } } }),
      h("button", { type: "button", className: "hs-btn", onClick: function () { ajouter(r); } }, "+"))) : null;
  }
  var PH = { propre: photoCheval || "images/concours-hero-bai-tresse.webp", cheval: "images/cours-g1-c17-seller.webp", moi: "images/securite-g1-tenue.webp" };
  var POS = { propre: "60% 30%", cheval: "60% 40%", moi: "40% 30%" };
  function rondCoche(x, i) {
    return h("button", { type: "button", "aria-pressed": x.f ? "true" : "false", onClick: function () { cocher(i); }, style: { flex: "0 0 auto", width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (x.f ? "#C9A66B" : "rgba(201,166,107,.6)"), background: "transparent", color: "#C9A66B", fontSize: 13, padding: 0, lineHeight: 1 } }, x.f ? "✓" : "");
  }
  function ligneFine(o, k) {
    var x = o.x; return h("div", { key: o.i, style: { display: "flex", alignItems: "center", gap: 12, padding: "7px 2px", minHeight: 40, borderTop: k ? "1px solid rgba(243,238,228,.07)" : "0" } },
      rondCoche(x, o.i), h("button", { type: "button", onClick: function () { cocher(o.i); }, style: { flex: 1, minWidth: 0, textAlign: "start", background: "none", border: "none", padding: 0, fontSize: 13, lineHeight: 1.35, color: x.f ? "rgba(243,238,228,.45)" : "#F3EEE4", textDecoration: x.f ? "line-through" : "none" } }, x.t), (typeof o.i === "number" && x.r !== "propre") ? croix(x, o.i) : null);   /* le matériel du cheval se change sur SA fiche */
  }
  function groupes() {
    var G = [];
    if (lignesPropres.length) G.push({ r: "propre", t: F("Son matériel à lui"), s: nomCheval || F("ton cheval"), L: lignesPropres.map(function (o) { return { x: o.x, i: o.i >= 0 ? o.i : o.t }; }) });
    G.push({ r: "cheval", t: F("Pour le cheval"), s: nomCheval || "", L: items.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.r === "cheval"; }) });
    G.push({ r: "moi", t: F("Pour toi"), s: F("ta tenue, ta sécurité"), L: items.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.r === "moi"; }) });
    G.forEach(function (g) { g.n = g.L.filter(function (o) { return o.x.f; }).length; });
    return G;
  }
  function vueHype() {
    /* style de la Vidéothèque : pastilles dorées « Toutes (9) », titres au trait doré, cartes photo à gauche + barre de progression */
    var G = groupes(), tot = 0, fait = 0; G.forEach(function (g) { tot += g.L.length; fait += g.n; });
    var CG = "'Cormorant Garamond',Georgia,serif";
    var titreSec = function (t, droite) { return h("div", { className: "hs-sec" }, h("b", null, t), droite ? h("span", null, droite) : null); };
    var modif = h("button", { type: "button", onClick: function () { setEdition(!edition); }, style: { background: "none", border: "none", color: "#C9A66B", fontSize: 12, padding: "6px 0" } }, edition ? F("Terminé") : F("Modifier"));
    var barre = function (n, t) { return h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 10 } },
      h("div", { style: { flex: 1, height: 2, background: "rgba(243,238,228,.12)", borderRadius: 2 } }, h("div", { style: { height: 2, width: (t ? Math.round(n / t * 100) : 0) + "%", background: "#C9A66B", borderRadius: 2 } })),
      h("span", { style: { fontSize: 11.5, color: n === t && t ? "#C9A66B" : "rgba(243,238,228,.7)" } }, n === t && t ? "✓ " + F("Prêt") : n + " / " + t)); };
    var tag = function (t) { return h("span", { style: { display: "inline-block", border: "1px solid rgba(201,166,107,.7)", color: "#C9A66B", borderRadius: 999, padding: "2px 10px", fontSize: 11 } }, t); };
    /* P3 : cartes comme les vidéos (photo à gauche, titre, étiquette, barre), qui se déplient */
    var ouv = ouvert || (G.filter(function (g) { return g.n < g.L.length; })[0] || G[0]).r;
    return h("div", null, titreSec(F("Ta liste"), fait + " / " + tot), G.map(function (g) {
      var on = g.r === ouv;
      return h("div", { key: g.r, style: { marginTop: 10, border: "1px solid " + (on ? "rgba(201,166,107,.45)" : "rgba(243,238,228,.1)"), borderRadius: 14, overflow: "hidden", background: "linear-gradient(135deg,#0d1416,#070A08 70%)" } },
        h("button", { type: "button", onClick: function () { setOuvert(on ? "aucun" : g.r); }, style: { display: "flex", width: "100%", padding: 0, border: "none", background: "none", textAlign: "start", color: "#F3EEE4" } },
          h("div", { style: { position: "relative", flex: "0 0 38%", minHeight: 108 } }, h("img", { src: PH[g.r], alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: POS[g.r] } }), h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 55%,#0b1112)" } })),
          h("div", { style: { flex: 1, minWidth: 0, padding: "12px 14px" } },
            h("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 } }, h("span", { style: { fontFamily: CG, fontSize: 21, lineHeight: 1.1 } }, g.t), h("span", { style: { color: "#C9A66B", fontSize: 14 } }, on ? "⌃" : "⌄")),
            h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,.6)", marginTop: 3 } }, g.s),
            h("div", { style: { marginTop: 7 } }, tag(g.r === "propre" ? F("de sa fiche") : (g.L.length + " " + F("objets")))),
            barre(g.n, g.L.length))),
        on ? h("div", { style: { padding: "2px 14px 10px", borderTop: "1px solid rgba(243,238,228,.07)" } }, g.L.map(ligneFine), g.r !== "propre" ? ajoutLigne(g.r) : null) : null);
    }), h("div", { style: { display: "flex", justifyContent: "flex-end" } }, modif));
  }
  function pdf() {
    var lignes = [];
    if (lignesPropres.length) { lignes.push({ titre: F("Son matériel à lui") + (nomCheval ? " · " + nomCheval : "") }); lignesPropres.forEach(function (o) { lignes.push({ t: o.t, f: !!o.x.f }); }); }
    [["cheval", F("Pour ") + (nomCheval || F("le cheval"))], ["moi", F("Pour moi")]].forEach(function (g) {
      lignes.push({ titre: g[1] });
      items.forEach(function (x) { if (x.r === g[0]) lignes.push({ t: x.t, f: x.f }); });
    });
    hsPartagerPdf(hsPdfListe(F("Liste du van") + " · " + ((ev && ev.titre) || ""), ev ? hsPlage(ev) : "", lignes), "liste-du-van-" + String((ev && ev.titre) || "concours"));
  }
  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      vueHype(),
      h("div", { className: "hs-duo", style: { marginTop: 18 } },
        h("button", { type: "button", className: "hs-btn plein", onClick: pdf }, F("Télécharger")),
        h("button", { type: "button", className: "hs-btn doux", onClick: toutDecocher }, F("Tout décocher"))),
      h("div", { className: "hs-note" }, F("Ta liste n’est visible que par toi. Au prochain concours, elle repart de celle-ci, cases décochées.")),
      etat && etat !== "✓" && etat !== "…" ? h("div", { className: "hs-msg" }, etat) : null,
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ JOUR J (coach) ════════════════════ */
function EcranJourJ() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _li = React.useState(null); var lignes = _li[0], setLignes = _li[1];
  var _ge = React.useState(null); var gestion = _ge[0], setGestion = _ge[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _mod = React.useState({}); var modif = _mod[0], setModif = _mod[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _dc = React.useState({ ep: "", min: "10" }); var dec = _dc[0], setDec = _dc[1];
  var _ld = React.useState(""); var lien = _ld[0], setLien = _ld[1];
  var _cd = React.useState(null); var cands = _cd[0], setCands = _cd[1];
  var _pv = React.useState(true); var prevenir = _pv[0], setPrevenir = _pv[1];
  var _bs = React.useState({}); var base = _bs[0], setBase = _bs[1];   /* ordre d'affichage figé pendant la saisie */
  var _dl = React.useState(null); var direct = _dl[0], setDirect = _dl[1];
  var _db = React.useState(""); var dirOcc = _db[0], setDirOcc = _db[1];
  var _pg = React.useState(null); var prog = _pg[0], setProg = _pg[1];          /* 07/11 : propositions lues sur la photo */
  var _pgl = React.useState(""); var progLect = _pgl[0], setProgLect = _pgl[1]; /* "" | "en_cours" | message */

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        if (vif) { setEv(r.data); setLien(r.data.lien_direct || ""); }
        var g = await hsPeutGerer(r.data.club_clef); if (vif) setGestion(g);
        if (!g) return;
        var rl = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true });
        if (rl && rl.error) throw new Error(rl.error.message || String(rl.error));
        if (vif) { setLignes(rl.data || []); setBase(hsOrdreBase(rl.data || [])); }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setLignes(function (l) { return l || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function poser(i, k, v) { var n = lignes.slice(); n[i] = Object.assign({}, n[i]); n[i][k] = v; setLignes(n); var m = Object.assign({}, modif); m[n[i].id] = true; setModif(m); setMsg(""); }
  /* toutes les passes de la journée, dans l'ordre de l'heure */
  var passes = [];
  (lignes || []).forEach(function (l, i) {
    if (l.epreuve1 || l.cheval1_nom) passes.push({ i: i, n: 1, nom: l.nom, ep: l.epreuve1, ch: l.cheval1_nom, hp: l.passage1, pi: l.piste1 });
    if (l.epreuve2 || l.cheval2_nom) passes.push({ i: i, n: 2, nom: l.nom, ep: l.epreuve2, ch: l.cheval2_nom, hp: l.passage2, pi: l.piste2 });
  });
  passes.sort(function (a, b) { var ka = base[a.i + "-" + a.n], kb = base[b.i + "-" + b.n]; return (ka == null ? 99999 : ka) - (kb == null ? 99999 : kb) || a.i - b.i; });
  /* alerte : deux passages à moins de 10 minutes sur deux pistes différentes (la coach ne peut pas être aux deux) */
  var conflits = {};
  for (var a = 0; a < passes.length; a++) for (var b = a + 1; b < passes.length; b++) {
    var pa = passes[a], pb = passes[b], ma = hsMinutes(pa.hp), mb = hsMinutes(pb.hp);
    if (ma > 9999 || mb > 9999) continue;
    if (Math.abs(ma - mb) < 10 && String(pa.pi || "").trim().toLowerCase() !== String(pb.pi || "").trim().toLowerCase()) {
      conflits[pa.i + "-" + pa.n] = pb.nom; conflits[pb.i + "-" + pb.n] = pa.nom;
    }
  }
  var nbConflits = Object.keys(conflits).length;
  var epreuves = []; passes.forEach(function (p) { if (p.ep && epreuves.indexOf(p.ep) === -1) epreuves.push(p.ep); });

  function decaler() {
    var d = parseInt(dec.min, 10); if (!dec.ep || !d) { setMsg(F("Choisis une épreuve et un nombre de minutes.")); return; }
    var n = lignes.slice(), m = Object.assign({}, modif), nb = 0;
    n.forEach(function (l, i) {
      [1, 2].forEach(function (k) {
        if (l["epreuve" + k] !== dec.ep) return;
        var mi = hsMinutes(l["passage" + k]); if (mi > 9999) return;
        n[i] = Object.assign({}, n[i]); n[i]["passage" + k] = hsHeure(mi + d); m[l.id] = true; nb++;
      });
    });
    setLignes(n); setModif(m);
    setMsg(nb ? (nb + F(" passage(s) décalé(s) de ") + (d > 0 ? "+" : "") + d + F(" min. Pense à enregistrer.")) : F("Aucune heure à décaler dans cette épreuve."));
  }
  async function enregistrer() {
    if (occupe) return; setOccupe(true); setMsg("");
    try {
      var ids = Object.keys(modif), maint = new Date().toISOString();
      for (var k = 0; k < ids.length; k++) {
        var l = lignes.filter(function (x) { return x.id === ids[k]; })[0]; if (!l) continue;
        var row = { passage1: hsHeurePropre(l.passage1) || null, piste1: String(l.piste1 || "").trim() || null, passage2: hsHeurePropre(l.passage2) || null, piste2: String(l.piste2 || "").trim() || null, passage_maj_le: maint };
        var r = await supa.from("concours_engagements").update(row).eq("id", l.id).select("id");
        if (r && r.error) throw new Error(l.nom + " : " + (r.error.message || r.error));
        if (!r || !r.data || !r.data.length) throw new Error(l.nom + F(" : refusé par la base"));
      }
      if (ev && String(lien || "").trim() !== String(ev.lien_direct || "")) {
        var t = String(lien || "").trim();
        if (t && !/^https?:\/\//i.test(t)) throw new Error(F("le lien du direct doit commencer par https://"));
        var rd = await supa.from("club_agenda").update({ lien_direct: t || null }).eq("id", ev.id).select("id");
        if (rd && rd.error) throw new Error(F("lien du direct : ") + (rd.error.message || rd.error));
        if (!rd || !rd.data || !rd.data.length) throw new Error(F("lien du direct : refusé par la base"));
        setEv(Object.assign({}, ev, { lien_direct: t || null }));
      }
      setModif({}); setBase(hsOrdreBase(lignes));
      /* 04/11 22h : prévenir chaque cavalière concernée sur son téléphone (fonction serveur notifier-passage) */
      var faitMsg = F("✓ Enregistré. Les cavalières voient leur nouvelle heure sur la fiche du concours.");
      if (prevenir && ids.length) {
        try {
          var rn = await supa.functions.invoke("notifier-passage", { body: { agenda_id: idEv, engagements: ids } });
          var dn = rn && rn.data;
          if (rn && rn.error) faitMsg += " " + F("Notification impossible : ") + (rn.error.message || rn.error);
          else if (dn && dn.ok) faitMsg += " " + (dn.envois ? F("Notification envoyée") + " (" + dn.envois + ")." : "") + (dn.sans_alertes ? " " + dn.sans_alertes + F(" cavalière(s) sans alertes activées.") : "");
        } catch (eN) { faitMsg += " " + F("Notification impossible."); }
      }
      setMsg(faitMsg);
    } catch (eS) { setMsg(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    setOccupe(false);
  }

  /* 04/11 22h — le direct trouvé par Hype (fonction serveur direct-concours, sites Winjump) */
  async function chercherDirect() {
    setDirOcc("chercher"); setCands(null); setMsg("");
    try {
      var r = await supa.functions.invoke("direct-concours", { body: { action: "chercher", agenda_id: idEv } });
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      setCands((r.data && r.data.candidats) || []);
    } catch (eC) { setMsg(F("Recherche impossible : ") + String((eC && eC.message) || eC)); }
    setDirOcc("");
  }
  async function confirmerDirect(url) {
    setDirOcc("confirmer"); setMsg("");
    try {
      var rd = await supa.from("club_agenda").update({ lien_direct: url }).eq("id", ev.id).select("id");
      if (rd && rd.error) throw new Error(rd.error.message || String(rd.error));
      if (!rd || !rd.data || !rd.data.length) throw new Error(F("refusé par la base"));
      setEv(Object.assign({}, ev, { lien_direct: url })); setLien(url); setCands(null);
      setDirOcc(""); lireDirect(true);
      return;
    } catch (eF) { setMsg(F("Pas enregistré : ") + String((eF && eF.message) || eF)); }
    setDirOcc("");
  }
  async function lireDirect(forcer) {
    setDirOcc("lire"); setMsg("");
    try {
      var r = await supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: idEv, forcer: !!forcer } });
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (r.data && r.data.erreur) throw new Error(r.data.erreur);
      setDirect(r.data || { lignes: [] });
    } catch (eL) { setMsg(F("Lecture du direct impossible : ") + String((eL && eL.message) || eL)); }
    setDirOcc("");
  }
  /* 07/11 : lire le programme / la liste de départ en photo et préparer les heures, pistes et heures de début d'épreuve */
  async function lireProgramme(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    try { e.target.value = ""; } catch (eV) { }
    if (!f) return;
    setProg(null); setProgLect("en_cours"); setMsg("");
    try {
      var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
      if (!estPdf && !/^image\//i.test(String(f.type || ""))) throw new Error(F("envoie une photo, une capture d’écran ou un PDF"));
      var imgs = estPdf ? (await hypePdfEnImages(f, 4, 2000)).images : [await hypeImageEnJpeg(f, 2000)];
      var equipe = []; lignes.forEach(function (l) { [1, 2].forEach(function (n) { if (l["cheval" + n + "_nom"] || l["epreuve" + n]) equipe.push({ cavalier: l.nom, cheval: l["cheval" + n + "_nom"] || "", epreuve: l["epreuve" + n] || "" }); }); });
      var lu = await hsLireProgramme(imgs, equipe);
      function norm(x) { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
      function memeEp(a, b) { a = norm(a); b = norm(b); if (!a || !b) return false; if (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return true; var aa = a.split(" "), bb = b.split(" "); return aa.length > 1 && aa.every(function (w) { return bb.indexOf(w) >= 0; }); }
      function memeCh(a, b) { a = norm(a); b = norm(b); return !!a && !!b && (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
      var props = [];
      lignes.forEach(function (l, i) { [1, 2].forEach(function (n) {
        var ch = String(l["cheval" + n + "_nom"] || "").trim(), ep = String(l["epreuve" + n] || "").trim();
        if (!ch && !ep) return;
        var p = lu.passages.filter(function (x) { return x && (hsMemePers(x.cavalier, l.nom) || (ch && memeCh(x.cheval, ch))) && (!x.cheval || !ch || memeCh(x.cheval, ch)); })[0] || null;
        var eL = lu.epreuves.filter(function (x) { return x && (memeEp(x.nom, ep) || (p && (memeEp(x.nom, p.epreuve) || (x.numero && norm(x.numero) === norm(p.epreuve))))); })[0] || null;
        var heure = "", source = "";
        if (p && p.heure) { heure = hsHeurePropre(p.heure); source = F("heure de passage lue"); }
        else if (p && p.ordre && eL && eL.heure && hsMinutes(hsHeurePropre(eL.heure)) < 99999) { heure = hsHeure(hsMinutes(hsHeurePropre(eL.heure)) + Math.round((Number(String(p.ordre).replace(/\D/g, "")) - 1) * 1.75)); source = F("estimée : début de l’épreuve + ordre ") + p.ordre; }
        else if (eL && eL.heure) { heure = hsHeurePropre(eL.heure); source = F("début de l’épreuve (ordre pas encore connu)"); }
        var piste = String((p && p.piste) || (eL && eL.piste) || "").trim();
        if (!heure && !piste) return;
        props.push({ i: i, n: n, nom: l.nom, ch: ch, ep: ep, heure: heure, piste: piste, source: source, num: eL && eL.numero ? String(eL.numero) : "", ordre: p && p.ordre ? String(p.ordre) : "", coche: true });
      }); });
      setProg({ props: props, epreuves: lu.epreuves });
      setProgLect(props.length ? "" : (lu.epreuves.length ? F("J’ai lu les épreuves, mais aucune ne correspond à celles de tes engagements.") : F("Je n’ai rien trouvé d’utilisable sur cette image.")));
    } catch (eL2) { setProgLect(F("Lecture impossible : ") + String((eL2 && eL2.message) || eL2)); }
  }
  function appliquerProgramme() {
    if (!prog) return;
    var n = lignes.slice(), m = Object.assign({}, modif), nb = 0;
    prog.props.forEach(function (x) {
      if (!x.coche) return;
      var l = Object.assign({}, n[x.i]);
      if (x.heure) l["passage" + x.n] = x.heure;
      if (x.piste) l["piste" + x.n] = x.piste;
      n[x.i] = l; m[l.id] = true; nb++;
    });
    setLignes(n); setModif(m); setProg(null);
    setMsg(nb ? (nb + F(" passage(s) préparé(s) depuis la photo. Vérifie, puis enregistre.")) : F("Rien à appliquer."));
  }
  function prendreHeures() {
    if (!direct || !direct.lignes) return;
    var n = lignes.slice(), m = Object.assign({}, modif), nb = 0;
    function proche(a, b) { a = String(a || "").toLowerCase(); b = String(b || "").toLowerCase(); return !!a && !!b && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
    direct.lignes.forEach(function (d) {
      if (!d.heure_estimee) return;
      var i = -1; n.forEach(function (l, j) { if (l.id === d.engagement) i = j; }); if (i < 0) return;
      var l = Object.assign({}, n[i]);
      var k = proche(l.epreuve2, d.epreuve) ? 2 : (proche(l.epreuve1, d.epreuve) || !l.passage1 ? 1 : 2);
      l["passage" + k] = d.heure_estimee; n[i] = l; m[l.id] = true; nb++;
    });
    setLignes(n); setModif(m);
    setMsg(nb ? (nb + F(" heure(s) estimée(s) reprise(s). Vérifie, puis enregistre.")) : F("Aucune heure à reprendre."));
  }
  var estWinjump = /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String((ev && ev.lien_direct) || ""));

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Jour J"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "" });
  if (gestion === false) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Cette page est réservée à la coach du club."))));
  if (lignes === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, erreur) : h("div", { className: "hs-attente" }, "…")));
  var aModif = Object.keys(modif).length > 0 || (ev && String(lien || "").trim() !== String(ev.lien_direct || ""));

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      nbConflits ? h("div", { className: "hs-carte", style: { borderColor: "rgba(201,166,107,.7)", padding: "12px 14px", marginTop: 18, fontSize: 13, lineHeight: 1.5 } },
        h("b", { style: { color: "#C9A66B" } }, F("Attention : ")), F("deux cavalières passent en même temps sur deux pistes différentes. Regarde les lignes marquées.")) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Lire le programme"))),
      h("div", { className: "hs-note", style: { marginTop: -4, marginBottom: 10 } }, F("Une photo, une capture ou le PDF du programme ou de la liste de départ (numéros et heures d’épreuve, ordre de passage) : Hype prépare les heures et les pistes de tes cavalières.")),
      h("label", { className: "hs-btn", style: { cursor: "pointer", opacity: progLect === "en_cours" ? 0.6 : 1 } },
        progLect === "en_cours" ? F("Lecture du programme… (1 à 2 min)") : F("Photo, capture ou PDF du programme"),
        h("input", { type: "file", accept: "image/*,application/pdf", disabled: progLect === "en_cours", onChange: lireProgramme, style: { display: "none" } })),
      progLect && progLect !== "en_cours" ? h("div", { className: "hs-note" }, progLect) : null,
      prog && prog.props.length ? h("div", { className: "hs-carte", style: { marginTop: 10 } },
        prog.epreuves.length ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Lu : ") + prog.epreuves.map(function (x) { return [x.numero ? "n° " + x.numero : "", x.nom, x.heure ? hsHeurePropre(x.heure) : "", x.piste ? F("piste ") + x.piste : ""].filter(Boolean).join(" "); }).join(" · ")))) : null,
        prog.props.map(function (x, k) {
          return h("label", { key: k, className: "hs-row", style: { display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" } },
            h("input", { type: "checkbox", checked: !!x.coche, onChange: function () { var c2 = prog.props.slice(); c2[k] = Object.assign({}, x, { coche: !x.coche }); setProg(Object.assign({}, prog, { props: c2 })); }, style: { width: 20, minHeight: 20, height: 20, accentColor: "#C9A66B", marginTop: 2 } }),
            h("div", { className: "g", style: { flex: 1, minWidth: 0 } }, h("b", null, x.nom + " · " + [x.ep, x.ch].filter(Boolean).join(" · ")),
              h("span", null, [x.heure, x.piste ? F("piste ") + x.piste : "", x.ordre ? F("n° ") + x.ordre : "", x.num ? F("épreuve n° ") + x.num : ""].filter(Boolean).join(" · ") + (x.source ? " — " + x.source : ""))));
        }),
        h("div", { className: "hs-duo", style: { padding: "10px 0 4px" } },
          h("button", { type: "button", className: "hs-btn", onClick: appliquerProgramme }, F("Appliquer")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setProg(null); } }, F("Annuler")))) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Les passages"))),
      !passes.length ? h("div", { className: "hs-vide" }, F("Aucun couple engagé. Commence par la page Engagements.")) :
      h("div", { className: "hs-carte" }, passes.map(function (p) {
        var cle = p.i + "-" + p.n, conf = conflits[cle];
        return h("div", { key: cle, className: "hs-couple", style: conf ? { background: "rgba(201,166,107,.08)" } : null },
          h("div", { className: "hs-couple-t", style: { marginBottom: 6 } }, h("b", { style: { fontSize: 17 } }, p.nom), h("span", { style: { fontSize: 11.5, color: "rgba(243,238,228,.64)" } }, [p.ep, p.ch].filter(Boolean).join(" · "))),
          conf ? h("div", { style: { fontSize: 11.5, color: "#C9A66B", marginBottom: 6 } }, F("En même temps que ") + conf + F(", sur une autre piste")) : null,
          h("div", { className: "hs-g2" },
            h("div", { className: "hs-champ" }, h("label", null, F("Heure de passage")), h("input", { type: "text", inputMode: "numeric", value: p.hp || "", placeholder: "11h40", onChange: function (e) { poser(p.i, "passage" + p.n, e.target.value); } })),
            h("div", { className: "hs-champ" }, h("label", null, F("Piste")), h("input", { type: "text", value: p.pi || "", placeholder: F("ex. 1, Bleue"), onChange: function (e) { poser(p.i, "piste" + p.n, e.target.value); } }))));
      })),
      epreuves.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Décaler une épreuve"))),
        h("div", { className: "hs-note", style: { marginTop: -4, marginBottom: 10 } }, F("Le concours a du retard ou de l’avance : décale d’un coup toutes les heures d’une épreuve.")),
        h("div", { className: "hs-ep" },
          h("select", { value: dec.ep, onChange: function (e) { setDec(Object.assign({}, dec, { ep: e.target.value })); } }, h("option", { value: "" }, F("Épreuve…")), epreuves.map(function (x) { return h("option", { key: x, value: x }, x); })),
          h("select", { value: dec.min, onChange: function (e) { setDec(Object.assign({}, dec, { min: e.target.value })); } }, ["-30", "-15", "-10", "-5", "5", "10", "15", "20", "30", "45", "60"].map(function (x) { return h("option", { key: x, value: x }, (Number(x) > 0 ? "+" : "") + x + " min"); }))),
        h("button", { type: "button", className: "hs-btn", onClick: decaler }, F("Décaler"))) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Résultats en direct"))),
      h("button", { type: "button", className: "hs-btn", disabled: !!dirOcc, onClick: chercherDirect }, dirOcc === "chercher" ? F("Recherche sur Winjump…") : F("Trouver le direct sur Winjump")),
      cands ? (cands.length ? h("div", { className: "hs-carte", style: { marginTop: 10 } },
        h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Concours Winjump à la même date. Lequel est le tien ?")))),
        cands.map(function (k) {
          return h("div", { key: k.url, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, k.nom), h("span", null, hsFmt(k.debut, { day: "numeric", month: "short" }) + (k.fin && k.fin !== k.debut ? " → " + hsFmt(k.fin, { day: "numeric", month: "short" }) : "") + " · " + k.site + ".winjump.fr")),
            h("button", { type: "button", className: "hs-lien", disabled: !!dirOcc, onClick: function () { confirmerDirect(k.url); } }, F("C’est lui")));
        })) : h("div", { className: "hs-vide", style: { marginTop: 10 } }, F("Aucun concours Winjump à cette date. Il est peut-être chronométré par un autre site : colle son lien ci-dessous."))) : null,
      estWinjump ? h("div", { style: { marginTop: 10 } },
        h("button", { type: "button", className: "hs-btn plein", disabled: !!dirOcc, onClick: function () { lireDirect(true); } }, dirOcc === "lire" ? F("Lecture du direct…") : F("Lire les départs et les résultats")),
        direct ? (direct.lignes && direct.lignes.length ? h("div", null,
          h("div", { className: "hs-carte", style: { marginTop: 10 } }, direct.lignes.map(function (d, i) {
            var res = d.clt ? (d.clt + (d.clt === "1" ? "re" : "e") + (d.points !== "" ? " · " + d.points + " pt" : "") + (d.temps ? " · " + d.temps + " s" : "")) : "";
            return h("div", { key: i, className: "hs-row" },
              h("div", { className: "g" }, h("b", null, d.nom + " · " + d.epreuve),
                h("span", null, [d.cheval, F("n° ") + d.ordre + F(" sur ") + d.engages, d.heure_estimee ? F("vers ") + d.heure_estimee : ""].filter(Boolean).join(" · "))),
              h("span", { className: "d", style: { fontSize: 13 } }, res || F("à venir")));
          })),
          h("button", { type: "button", className: "hs-btn", style: { marginTop: 10 }, onClick: prendreHeures }, F("Reprendre ces heures dans les passages")),
          h("div", { className: "hs-note" }, F("Heures estimées par Hype : début de l’épreuve + environ 1 min 45 par couple avant le sien. Les résultats sont ceux du chronométreur, encore provisoires pendant le concours."))) :
          h("div", { className: "hs-vide", style: { marginTop: 10 } }, F("Aucune de tes cavalières trouvée dans les listes de départ pour l’instant (les listes sont souvent publiées la veille)."))) : null) : null,
      h("div", { className: "hs-champ", style: { marginTop: 14 } }, h("label", null, F("Lien du direct (chronométreur)")), h("input", { type: "url", value: lien, placeholder: "https://…", onChange: function (e) { setLien(e.target.value); setMsg(""); } })),
      h("div", { className: "hs-note", style: { marginTop: -4 } }, F("Colle ici la page des résultats en direct : les cavalières auront un bouton « Résultats en direct » sur la fiche du concours.")),
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("label", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "rgba(243,238,228,.8)", marginBottom: 10 } },
          h("input", { type: "checkbox", checked: prevenir, onChange: function (e) { setPrevenir(e.target.checked); }, style: { width: 20, minHeight: 20, height: 20, accentColor: "#C9A66B" } }),
          F("Prévenir les cavalières sur leur téléphone")),
        h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !aModif, onClick: enregistrer }, occupe ? F("Enregistrement…") : (aModif ? F("Enregistrer") : F("✓ Enregistré")))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ LE DOSSIER ════════════════════ */
function EcranDossierConcours() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _ge = React.useState(false); var gestion = _ge[0], setGestion = _ge[1];
  var _vd = React.useState([]); var van = _vd[0], setVan = _vd[1];
  var _cv = React.useState(null); var chevaux = _cv[0], setChevaux = _cv[1];
  var _lc = React.useState([]); var licences = _lc[0], setLicences = _lc[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _nd = React.useState({ nom: "", valable: "" }); var nd = _nd[0], setNd = _nd[1];
  var refFic = React.useRef(null);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  /* 07/11 : papiers du van = ceux de « Le camion » (Mon écurie), un seul endroit : registre_documents type « camion »,
     rangement privé « registre » (fichier sous l'id de sa ligne). Avant : table dossier_van (restée vide). */
  function chargerVan(clef) {
    supa.from("registre_documents").select("*").eq("club_clef", clef).eq("type", "camion").order("created_at", { ascending: false }).then(function (r) {
      if (r && !r.error) setVan((r.data || []).filter(function (x) { return x.chemin; }).map(function (x) { return { id: x.id, nom: x.titre || F("Papier"), chemin: x.chemin, valable_jusqu: x.valable_jusqu || null }; }));
    });
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        var E = r.data; if (vif) setEv(E);
        var g = await hsPeutGerer(E.club_clef); if (vif) setGestion(g);
        if (g) chargerVan(E.club_clef);
        /* engagements lisibles : tous pour la coach, sa seule ligne pour une cavalière (droits de la base) */
        var re = await supa.from("concours_engagements").select("nom, licence, cavalier_id, cheval1_id, cheval1_nom, cheval2_id, cheval2_nom").eq("agenda_id", idEv);
        var L = (re && !re.error && re.data) || [];
        if (vif) setLicences(L.map(function (l) { return { nom: l.nom, licence: l.licence, moi: !!(u && l.cavalier_id === u.id) }; }));
        var ch = {};
        L.forEach(function (l) { if (l.cheval1_id) ch[l.cheval1_id] = l.cheval1_nom; if (l.cheval2_id) ch[l.cheval2_id] = l.cheval2_nom; });
        var ids = Object.keys(ch), res = [];
        if (ids.length) {
          var rs = await supa.from("soins_cheval").select("cheval_id, titre, date_intervention, date_prochaine").eq("type", "vaccin").in("cheval_id", ids).order("date_intervention", { ascending: false });
          var der = {}; ((rs && !rs.error && rs.data) || []).forEach(function (s) { if (!der[s.cheval_id]) der[s.cheval_id] = s; });
          ids.forEach(function (id) { res.push({ id: id, nom: ch[id], vaccin: der[id] || null, lisible: !!(rs && !rs.error) }); });
        }
        if (vif) setChevaux(res);
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setChevaux(function (x) { return x || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  async function deposer(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    if (!f || !ev) return;
    var nom = String(nd.nom || "").trim() || f.name;
    setOccupe(true); setMsg("");
    try {
      var ext = (String(f.name).match(/\.[a-z0-9]{1,5}$/i) || [""])[0].toLowerCase();
      var ri = await supa.from("registre_documents").insert({ club_clef: ev.club_clef, type: "camion", titre: nom, valable_jusqu: nd.valable || null }).select("id");
      if (ri && ri.error) throw new Error(ri.error.message || String(ri.error));
      var idD = ri && ri.data && ri.data[0] && ri.data[0].id; if (!idD) throw new Error(F("refusé par la base"));
      var chemin = idD + "/papier-" + Date.now() + ext;
      var up = await supa.storage.from("registre").upload(chemin, f, { contentType: f.type || "application/octet-stream", upsert: false });
      if (up && up.error) { try { await supa.from("registre_documents").delete().eq("id", idD); } catch (eR) { } throw new Error(up.error.message || String(up.error)); }
      var rc = await supa.from("registre_documents").update({ chemin: chemin }).eq("id", idD).select("id");
      if (rc && rc.error) throw new Error(rc.error.message || String(rc.error));
      setNd({ nom: "", valable: "" }); setMsg(F("✓ Document ajouté.")); chargerVan(ev.club_clef);
    } catch (eD) { setMsg(F("Pas ajouté : ") + String((eD && eD.message) || eD)); }
    setOccupe(false);
    try { e.target.value = ""; } catch (eV) { }
  }
  async function ouvrirDoc(d) {
    try {
      var r = await supa.storage.from("registre").createSignedUrl(d.chemin, 300);
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      window.open(r.data.signedUrl, "_blank");
    } catch (eO) { setMsg(F("Impossible d’ouvrir : ") + String((eO && eO.message) || eO)); }
  }
  async function retirerDoc(d) {
    try {
      var r = await supa.from("registre_documents").delete().eq("id", d.id).select("id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      try { await supa.storage.from("registre").remove([d.chemin]); } catch (eR) { }
      chargerVan(ev.club_clef);
    } catch (eX) { setMsg(F("Pas retiré : ") + String((eX && eX.message) || eX)); }
  }
  function ouvrirSante(ch) { try { window.__santeCheval = { id: ch.id, nom: ch.nom || "" }; } catch (e) { } c.setEcran("sante-cheval"); }
  function etatVaccin(v) {
    if (!v) return { t: F("aucun vaccin noté"), s: F("À vérifier"), alerte: true };
    var p = v.date_prochaine ? hsDateLoc(v.date_prochaine) : null;
    var dateC = ev ? hsDateLoc(ev.date_jour) : null;
    if (p && dateC && p < dateC) return { t: F("rappel à faire avant le ") + hsFmt(v.date_prochaine, { day: "numeric", month: "long" }), s: F("À refaire"), alerte: true };
    return { t: F("dernier vaccin le ") + hsFmt(v.date_intervention, { day: "numeric", month: "long", year: "numeric" }), s: "✓", alerte: false };
  }

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Le dossier"), sous: F("Ce qu’on peut te demander sur place.") });
  if (chevaux === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, erreur) : h("div", { className: "hs-attente" }, "…")));
  var aujISO = new Date().toISOString().slice(0, 10);

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      /* van : coach seulement */
      gestion ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Le van")), h("span", null, "🔒 " + F("toi seule"))),
        h("div", { className: "hs-carte" },
          van.length ? van.map(function (d) {
            var perime = d.valable_jusqu && String(d.valable_jusqu) < aujISO;
            return h("div", { key: d.id, className: "hs-row" },
              h("div", { className: "g" }, h("b", null, d.nom), h("span", { style: perime ? { color: "#C9A66B" } : null }, d.valable_jusqu ? ((perime ? F("expiré depuis le ") : F("valable jusqu’au ")) + hsFmt(d.valable_jusqu, { day: "numeric", month: "long", year: "numeric" })) : F("ajouté le ") + hsFmt(String(d.ajoute_le).slice(0, 10), { day: "numeric", month: "long" }))),
              h("button", { type: "button", className: "hs-lien", onClick: function () { ouvrirDoc(d); } }, F("Ouvrir")),
              h("button", { type: "button", className: "hs-lien", style: { color: "rgba(243,238,228,.45)" }, onClick: function () { retirerDoc(d); } }, "×"));
          }) : h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Aucun papier pour l’instant (carte grise, assurance, contrôle technique…)."))))),
        h("div", { className: "hs-g2", style: { marginTop: 12 } },
          h("div", { className: "hs-champ" }, h("label", null, F("Nom du papier")), h("input", { type: "text", value: nd.nom, placeholder: F("Carte grise"), onChange: function (e) { setNd(Object.assign({}, nd, { nom: e.target.value })); } })),
          h("div", { className: "hs-champ" }, h("label", null, F("Valable jusqu’au")), h("input", { type: "date", value: nd.valable, onChange: function (e) { setNd(Object.assign({}, nd, { valable: e.target.value })); } }))),
        h("input", { ref: refFic, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: deposer }),
        h("button", { type: "button", className: "hs-btn", disabled: occupe, onClick: function () { try { refFic.current.click(); } catch (e) { } } }, occupe ? F("Envoi…") : F("+ Ajouter un papier (photo ou PDF)")),
        msg ? h("div", { className: "hs-msg" }, msg) : null) : null,
      /* chevaux */
      h("div", { className: "hs-sec" }, h("b", null, F("Les chevaux")), h("span", null, "🔒 " + (gestion ? F("toi et les propriétaires") : F("comme la page Santé")))),
      chevaux.length ? h("div", { className: "hs-carte" }, chevaux.map(function (ch) {
        var e = etatVaccin(ch.vaccin);
        return h("button", { type: "button", key: ch.id, className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { ouvrirSante(ch); } },
          h("div", { className: "g" }, h("b", null, ch.nom || F("Cheval")), h("span", null, e.t)),
          h("span", { className: "d", style: { fontSize: 12.5, color: e.alerte ? "#C9A66B" : "#F3EEE4" } }, e.s));
      })) : h("div", { className: "hs-vide" }, F("Les chevaux apparaîtront quand les couples seront choisis (page Engagements).")),
      h("div", { className: "hs-note" }, F("Touche un cheval pour ouvrir sa page Santé : livret, vaccins et documents.")),
      /* licences */
      h("div", { className: "hs-sec" }, h("b", null, F("Les licences")), h("span", null, "🔒 " + F("chacune la sienne"))),
      licences.length ? h("div", { className: "hs-carte" }, licences.map(function (l, i) {
        return h("div", { key: i, className: "hs-row" },
          h("div", { className: "g" }, h("b", null, l.nom), h("span", null, l.licence ? F("licence ") + l.licence : F("pas encore ajoutée"))),
          h("span", { className: "d", style: { fontSize: 12.5, color: l.licence ? "#F3EEE4" : "#C9A66B" } }, l.licence ? "✓" : F("Manquante")));
      })) : h("div", { className: "hs-vide" }, F("Les licences apparaîtront quand les couples seront choisis.")),
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ── PDF : partage (iPhone) ou téléchargement, et la liste du van ── */
function hsPartagerPdf(octets, base) {
  try {
    var nom = String(base || "document").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "") + ".pdf";
    var fic = null; try { fic = new File([octets], nom, { type: "application/pdf" }); } catch (eF) { fic = null; }
    if (fic && navigator.canShare && navigator.canShare({ files: [fic] }) && navigator.share) { navigator.share({ files: [fic] }).catch(function () { }); return; }
    var url = URL.createObjectURL(new Blob([octets], { type: "application/pdf" }));
    var a = document.createElement("a"); a.href = url; a.download = nom; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (eR) { } }, 60000);
  } catch (eP) { try { console.error(eP); } catch (e2) { } }
}
function hsPdfListe(titre, sousTitre, lignes) {
  var W = 595.28, H = 841.89, ops = [], y = 70;
  function Y(v) { return (H - v).toFixed(2); }
  function txt(x, yy, t, pol, tl, coul) { ops.push((coul || "0 0 0") + " rg BT /" + pol + " " + tl + " Tf " + x.toFixed(2) + " " + Y(yy) + " Td (" + hsPdfTexte(t) + ") Tj ET"); }
  txt(50, y, titre, "F3", 22, "0.11 0.16 0.54"); y += 22;
  if (sousTitre) { txt(50, y, sousTitre, "F1", 11); y += 14; }
  y += 10;
  lignes.forEach(function (l) {
    if (y > H - 50) return;
    if (l.titre) { y += 12; txt(50, y, l.titre, "F2", 12.5); y += 8; ops.push("0.6 w 0.6 0.6 0.6 RG 50 " + Y(y) + " m 545 " + Y(y) + " l S"); y += 16; return; }
    ops.push("0.8 w 0 0 0 RG 52 " + Y(y + 1) + " 10 10 re S");
    if (l.f) txt(53.5, y - 0.5, "X", "F2", 9);
    txt(70, y + 0.5, hsCouper(l.t, "F1", 11, 470), "F1", 11); y += 18;
  });
  var flux = ops.join("\n");
  var objs = [
    "<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>",
    "<< /Length " + flux.length + " >>\nstream\n" + flux + "\nendstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>"
  ];
  var out = "%PDF-1.4\n%âãÏÓ\n", pos = [];
  objs.forEach(function (ob, i) { pos.push(out.length); out += (i + 1) + " 0 obj\n" + ob + "\nendobj\n"; });
  var xref = out.length;
  out += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
  pos.forEach(function (p) { out += String(p).padStart(10, "0") + " 00000 n \n"; });
  out += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF";
  var o = new Uint8Array(out.length); for (var k = 0; k < out.length; k++) o[k] = out.charCodeAt(k) & 0xFF;
  return o;
}


/* 04/11 23h20 — Blandine : « pour l'instant, toute cette série-là, tu la laisses pas accessible à qui que ce soit à part moi ».
   Tous les écrans du Centre de compétition passent par cette garde : seule la modératrice (ses comptes) y entre ;
   les autres voient « Bientôt disponible ». Pour ouvrir à tout le monde plus tard : HS_OUVERT_A_TOUS = true. */
var HS_OUVERT_A_TOUS = false;
function hsGarde(Comp) {
  return function EcranGarde(props) {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var _ok = React.useState(HS_OUVERT_A_TOUS ? true : null); var ok = _ok[0], setOk = _ok[1];
    React.useEffect(function () {
      if (HS_OUVERT_A_TOUS) return;
      var vif = true;
      (async function () {
        var u = null; try { u = await utilisateurActuel(); } catch (e) { }
        var m = false; try { m = (typeof estModerateurHype === "function") && estModerateurHype(u); } catch (e2) { }
        if (!m && u) { try { var r = await supa.rpc("hype_est_moderatrice"); m = r && r.data === true; } catch (e3) { } }
        if (vif) setOk(!!m);
      })();
      return function () { vif = false; };
    }, []);
    if (ok === true) return h(Comp, props);
    try { injecterCss(); } catch (e4) { }
    return h("div", { className: "hs" },
      h("div", { className: "hs-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 18px)" } },
        h("button", { type: "button", className: "hs-retour", onClick: function () { try { if (app.retourEcran && app.histLen > 0) { app.retourEcran(); return; } } catch (e5) { } if (app.setEcran) app.setEcran("guilde"); } }, h("i", null, "‹"), "Retour"),
        ok === null ? h("div", { className: "hs-attente" }, "…") :
        h("div", { className: "hs-titre", style: { textAlign: "start", marginTop: 40 } }, h("h1", { style: { fontSize: 40 } }, "Bientôt disponible"), h("p", null, "Le Centre de compétition arrive très vite."))));
  };
}
window.HypeSaison = { Saison: hsGarde(EcranMaSaison), Concours: hsGarde(EcranConcours), Engagements: hsGarde(EcranEngagements), ListeVan: hsGarde(EcranListeVan), JourJ: hsGarde(EcranJourJ), Dossier: hsGarde(EcranDossierConcours), VideoParcours: hsGarde(EcranVideoParcours) };
})();
