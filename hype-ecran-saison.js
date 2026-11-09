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
  "Par épreuve": ["By class", "Por prueba", "Per prova", "競技別", "Nach Prüfung", "حسب المسابقة", "按赛项", "Per rubriek", "Por prova", "Per klass", "По маршрутам", "Według konkursu", "종목별"],
  "Épreuve non précisée": ["Class not specified", "Prueba sin precisar", "Prova non indicata", "競技未指定", "Prüfung nicht angegeben", "مسابقة غير محددة", "未注明赛项", "Rubriek niet opgegeven", "Prova não indicada", "Klass ej angiven", "Маршрут не указан", "Konkurs nieokreślony", "종목 미지정"],
  "Vidéo": ["Video", "Vídeo", "Video", "動画", "Video", "فيديو", "视频", "Video", "Vídeo", "Video", "Видео", "Film", "영상"],
  "Voir les ": ["See the ", "Ver los ", "Vedi gli altri ", "残り", "Die weiteren ", "عرض ", "查看其余 ", "Bekijk de ", "Ver os ", "Visa de ", "Показать ещё ", "Pokaż pozostałe ", "나머지 "],
  "autres passages": ["other starts", "otros pasos", "passaggi", "件の出場を見る", "Starts anzeigen", "انطلاقات أخرى", "个出场", "andere starts", "outras passagens", "andra starterna", "стартов", "starty", "개 출전 보기"],
  "Touche ⋯ pour dire qui est dessus": ["Tap ⋯ to say who's in it", "Toca ⋯ para decir quién aparece", "Tocca ⋯ per dire chi c’è", "⋯ をタップして誰か指定", "Tippe auf ⋯, um anzugeben, wer drauf ist", "اضغط ⋯ لتحديد من فيه", "点击 ⋯ 标记是谁", "Tik op ⋯ om aan te geven wie erop staat", "Toca em ⋯ para dizer quem aparece", "Tryck på ⋯ för att ange vem som syns", "Нажми ⋯, чтобы указать, кто здесь", "Dotknij ⋯, aby wskazać, kto jest na nim", "⋯ 를 눌러 누가 나오는지 알려 줘"],
  "Ses médias sur ce concours": ["Their media from this show", "Sus medios de este concurso", "I suoi contenuti di questo concorso", "この大会でのメディア", "Die Medien dieses Turniers", "وسائطه في هذه المسابقة", "本场比赛的媒体", "Media van deze wedstrijd", "As suas mídias desta competição", "Medier från den här tävlingen", "Медиа с этих соревнований", "Multimedia z tych zawodów", "이 대회의 미디어"],
  "Avec ": ["With ", "Con ", "Con ", "", "Mit ", "مع ", "与", "Met ", "Com ", "Med ", "С ", "Z ", ""],
  "Les chevaux": ["The horses", "Los caballos", "I cavalli", "馬たち", "Die Pferde", "الخيول", "马匹", "De paarden", "Os cavalos", "Hästarna", "Лошади", "Konie", "말들"],
  "Voir tous les chevaux": ["See all horses", "Ver todos los caballos", "Vedi tutti i cavalli", "すべての馬を見る", "Alle Pferde ansehen", "عرض كل الخيول", "查看全部马匹", "Alle paarden bekijken", "Ver todos os cavalos", "Visa alla hästar", "Все лошади", "Zobacz wszystkie konie", "모든 말 보기"],
  "Voir tous les cavaliers": ["See all riders", "Ver todos los jinetes", "Vedi tutti i cavalieri", "すべてのライダーを見る", "Alle Reiter ansehen", "عرض كل الفرسان", "查看全部骑手", "Alle ruiters bekijken", "Ver todos os cavaleiros", "Visa alla ryttare", "Все всадники", "Zobacz wszystkich jeźdźców", "모든 라이더 보기"],
  "Les premiers souvenirs": ["First memories", "Los primeros recuerdos", "I primi ricordi", "最初の思い出", "Die ersten Erinnerungen", "الذكريات الأولى", "最初的回忆", "De eerste herinneringen", "As primeiras lembranças", "De första minnena", "Первые воспоминания", "Pierwsze wspomnienia", "첫 번째 추억"],
  "Tous les souvenirs": ["All the memories", "Todos los recuerdos", "Tutti i ricordi", "すべての思い出", "Alle Erinnerungen", "كل الذكريات", "全部回忆", "Alle herinneringen", "Todas as lembranças", "Alla minnen", "Все воспоминания", "Wszystkie wspomnienia", "모든 추억"],
  "Pas encore de média sur ce concours.": ["No media for this show yet.", "Todavía no hay medios de este concurso.", "Ancora nessun contenuto per questo concorso.", "この大会のメディアはまだありません。", "Noch keine Medien zu diesem Turnier.", "لا توجد وسائط لهذه المسابقة بعد.", "这场比赛还没有媒体。", "Nog geen media van deze wedstrijd.", "Ainda não há mídias desta competição.", "Inga medier från tävlingen än.", "Пока нет медиа с этих соревнований.", "Brak jeszcze multimediów z tych zawodów.", "아직 이 대회의 미디어가 없어요."],
  "Voir les médias de chaque cavalier": ["See each rider’s media", "Ver los medios de cada jinete", "Vedi i contenuti di ogni cavaliere", "ライダーごとのメディアを見る", "Medien jedes Reiters ansehen", "عرض وسائط كل فارس", "查看每位骑手的媒体", "Media per ruiter bekijken", "Ver as mídias de cada cavaleiro", "Se varje ryttares medier", "Медиа каждого всадника", "Zobacz multimedia każdego jeźdźca", "라이더별 미디어 보기"],
  "Voir les médias par cheval": ["See media by horse", "Ver los medios por caballo", "Vedi i contenuti per cavallo", "馬ごとのメディアを見る", "Medien nach Pferd ansehen", "عرض الوسائط حسب الحصان", "按马匹查看媒体", "Media per paard bekijken", "Ver as mídias por cavalo", "Se medier per häst", "Медиа по лошадям", "Zobacz multimedia według konia", "말별 미디어 보기"],
  "Les photos": ["Photos", "Las fotos", "Le foto", "写真", "Die Fotos", "الصور", "照片", "De foto's", "As fotos", "Bilderna", "Фото", "Zdjęcia", "사진"],
  "Les vidéos": ["Videos", "Los vídeos", "I video", "動画", "Die Videos", "الفيديوهات", "视频", "De video's", "Os vídeos", "Videorna", "Видео", "Filmy", "영상"],
  "photo": ["photo", "foto", "foto", "写真", "Foto", "صورة", "照片", "foto", "foto", "foto", "фото", "zdjęcie", "사진"],
  "photos": ["photos", "fotos", "foto", "写真", "Fotos", "صور", "照片", "foto's", "fotos", "foton", "фото", "zdjęć", "사진"],
  "vidéo": ["video", "vídeo", "video", "動画", "Video", "فيديو", "视频", "video", "vídeo", "video", "видео", "film", "영상"],
  "vidéos": ["videos", "vídeos", "video", "動画", "Videos", "فيديوهات", "视频", "video's", "vídeos", "videor", "видео", "filmów", "영상"],
  "Par cavalier": ["By rider", "Por jinete", "Per cavaliere", "ライダー別", "Nach Reiter", "حسب الفارس", "按骑手", "Per ruiter", "Por cavaleiro", "Per ryttare", "По всадникам", "Według jeźdźca", "기수별"],
  "Par cheval": ["By horse", "Por caballo", "Per cavallo", "馬別", "Nach Pferd", "حسب الحصان", "按马匹", "Per paard", "Por cavalo", "Per häst", "По лошадям", "Według konia", "말별"],
  "À identifier": ["To tag", "Por identificar", "Da identificare", "未タグ", "Zu markieren", "بحاجة إلى تحديد", "待标记", "Te taggen", "Por identificar", "Att tagga", "Не отмечено", "Do oznaczenia", "태그 필요"],
  "Aucune photo ne correspond à ces filtres.": ["No photo matches these filters.", "Ninguna foto coincide con estos filtros.", "Nessuna foto corrisponde a questi filtri.", "条件に合う写真はありません。", "Kein Foto passt zu diesen Filtern.", "لا توجد صورة تطابق هذه الفلاتر.", "没有符合筛选条件的照片。", "Geen foto past bij deze filters.", "Nenhuma foto corresponde a estes filtros.", "Inget foto matchar filtren.", "Нет фото по этим фильтрам.", "Brak zdjęć dla tych filtrów.", "필터에 맞는 사진이 없어."],
  "Pas encore de photo sur ce concours.": ["No photos for this competition yet.", "Aún no hay fotos de este concurso.", "Ancora nessuna foto di questo concorso.", "この大会の写真はまだありません。", "Noch keine Fotos von diesem Turnier.", "لا توجد صور لهذه المسابقة بعد.", "本次比赛还没有照片。", "Nog geen foto's van deze wedstrijd.", "Ainda não há fotos deste concurso.", "Inga foton från tävlingen än.", "Пока нет фото с этих соревнований.", "Brak jeszcze zdjęć z tych zawodów.", "이 대회 사진이 아직 없어."],
  "Aucune vidéo ne correspond à ces filtres.": ["No video matches these filters.", "Ningún vídeo coincide con estos filtros.", "Nessun video corrisponde a questi filtri.", "条件に合う動画はありません。", "Kein Video passt zu diesen Filtern.", "لا يوجد فيديو يطابق هذه الفلاتر.", "没有符合筛选条件的视频。", "Geen video past bij deze filters.", "Nenhum vídeo corresponde a estes filtros.", "Ingen video matchar filtren.", "Нет видео по этим фильтрам.", "Brak filmów dla tych filtrów.", "필터에 맞는 영상이 없어."],
  "Pas encore de vidéo sur ce concours.": ["No videos for this competition yet.", "Aún no hay vídeos de este concurso.", "Ancora nessun video di questo concorso.", "この大会の動画はまだありません。", "Noch keine Videos von diesem Turnier.", "لا توجد فيديوهات لهذه المسابقة بعد.", "本次比赛还没有视频。", "Nog geen video's van deze wedstrijd.", "Ainda não há vídeos deste concurso.", "Inga videor från tävlingen än.", "Пока нет видео с этих соревнований.", "Brak jeszcze filmów z tych zawodów.", "이 대회 영상이 아직 없어."],
  "Modifier les passages": ["Edit start times", "Modificar las salidas", "Modifica le partenze", "出場を編集", "Starts bearbeiten", "تعديل أوقات الانطلاق", "修改出场", "Starts wijzigen", "Alterar as passagens", "Ändra starterna", "Изменить старты", "Edytuj starty", "출전 수정"],
  "Heures et pistes, ordre de passage ou programme (photo, capture ou PDF), direct du chronométreur.": ["Times and arenas, start list or programme (photo, screenshot or PDF), timekeeper's live results.", "Horas y pistas, orden de salida o programa (foto, captura o PDF), directo del cronometrador.", "Orari e campi, ordine di partenza o programma (foto, screenshot o PDF), diretta del cronometrista.", "時刻とアリーナ、出場順またはプログラム（写真・スクリーンショット・PDF）、計時のライブ。", "Zeiten und Plätze, Startliste oder Programm (Foto, Screenshot oder PDF), Live-Zeitnahme.", "الأوقات والميادين، ترتيب الانطلاق أو البرنامج (صورة، لقطة أو PDF)، البث المباشر للميقاتي.", "时间和场地、出场顺序或赛程（照片、截图或 PDF）、计时直播。", "Tijden en pistes, startvolgorde of programma (foto, screenshot of pdf), live tijdwaarneming.", "Horas e pistas, ordem de passagem ou programa (foto, captura ou PDF), direto do cronometrista.", "Tider och banor, startordning eller program (foto, skärmbild eller PDF), tidtagningens live.", "Время и манежи, стартовый порядок или программа (фото, скриншот или PDF), онлайн хронометража.", "Godziny i place, kolejność startu lub program (zdjęcie, zrzut lub PDF), wyniki na żywo.", "시간과 경기장, 출전 순서나 프로그램(사진·스크린샷·PDF), 계측 실시간."],
  "Terminer": ["Done", "Terminar", "Fine", "完了", "Fertig", "إنهاء", "完成", "Klaar", "Terminar", "Klar", "Готово", "Zakończ", "완료"],
  "Lire l’ordre de passage ou le programme": ["Read the start list or programme", "Leer el orden de salida o el programa", "Leggi l’ordine di partenza o il programma", "出場順またはプログラムを読み取る", "Startliste oder Programm lesen", "قراءة ترتيب الانطلاق أو البرنامج", "读取出场顺序或赛程", "Startvolgorde of programma lezen", "Ler a ordem de passagem ou o programa", "Läs startordningen eller programmet", "Прочитать стартовый порядок или программу", "Odczytaj kolejność startu lub program", "출전 순서 또는 프로그램 읽기"],
  "groupes du paddock": ["paddock groups", "grupos del paddock", "gruppi del paddock", "パドックのグループ", "Abreitegruppen", "مجموعات منطقة الإحماء", "热身场分组", "paddockgroepen", "grupos do paddock", "framridningsgrupper", "группы разминки", "grupy rozprężalni", "패독 그룹"],
  "groupe du paddock": ["paddock group", "grupo del paddock", "gruppo del paddock", "パドックのグループ", "Abreitegruppe", "مجموعة منطقة الإحماء", "热身场分组", "paddockgroep", "grupo do paddock", "framridningsgrupp", "группа разминки", "grupa rozprężalni", "패독 그룹"],
  "Décaler": ["Shift", "Desplazar", "Sposta", "ずらす", "Verschieben", "تحريك", "调整", "Verschuiven", "Deslocar", "Flytta", "Сдвинуть", "Przesuń", "조정"],
  "Notification envoyée": ["Notification sent", "Notificación enviada", "Notifica inviata", "通知を送信しました", "Benachrichtigung gesendet", "تم إرسال الإشعار", "通知已发送", "Melding verstuurd", "Notificação enviada", "Avisering skickad", "Уведомление отправлено", "Powiadomienie wysłane", "알림 보냄"],
  "Notification impossible : ": ["Notification failed: ", "Notificación imposible: ", "Notifica impossibile: ", "通知できません：", "Benachrichtigung nicht möglich: ", "تعذّر الإشعار: ", "无法通知：", "Melding mislukt: ", "Notificação impossível: ", "Avisering misslyckades: ", "Не удалось уведомить: ", "Powiadomienie niemożliwe: ", "알림 실패: "],
  "Notification impossible.": ["Notification failed.", "Notificación imposible.", "Notifica impossibile.", "通知できません。", "Benachrichtigung nicht möglich.", "تعذّر الإشعار.", "无法通知。", "Melding mislukt.", "Notificação impossível.", "Avisering misslyckades.", "Не удалось уведомить.", "Powiadomienie niemożliwe.", "알림 실패."],
  "Décaler l’épreuve": ["Shift the class", "Desplazar la prueba", "Sposta la prova", "競技をずらす", "Prüfung verschieben", "تأجيل/تقديم المسابقة", "调整赛项时间", "Rubriek verschuiven", "Deslocar a prova", "Flytta klassen", "Сдвинуть маршрут", "Przesuń konkurs", "종목 시간 조정"],
  "Choisis de combien de minutes.": ["Choose by how many minutes.", "Elige cuántos minutos.", "Scegli di quanti minuti.", "何分ずらすか選んでください。", "Wähle, um wie viele Minuten.", "اختر عدد الدقائق.", "选择调整的分钟数。", "Kies hoeveel minuten.", "Escolhe quantos minutos.", "Välj hur många minuter.", "Выбери, на сколько минут.", "Wybierz o ile minut.", "몇 분 조정할지 골라 줘."],
  "Décaler de ": ["Shift by ", "Desplazar ", "Sposta di ", "ずらす：", "Verschieben um ", "تحريك بمقدار ", "调整 ", "Verschuif ", "Deslocar ", "Flytta ", "Сдвинуть на ", "Przesuń o ", "조정: "],
  "décalée de ": ["shifted by ", "desplazada ", "spostata di ", "をずらしました：", "verschoben um ", "تم تحريكها بمقدار ", "已调整 ", "verschoven met ", "deslocada ", "flyttad ", "сдвинут на ", "przesunięty o ", "조정됨: "],
  "Jour J": ["D-Day", "Día D", "Giorno G", "当日", "Tag X", "اليوم الموعود", "比赛日", "D-day", "Dia D", "Dagen D", "День Х", "Dzień D", "D-데이"],
  "Performances chevaux": ["Horse performances", "Rendimiento de los caballos", "Prestazioni dei cavalli", "馬の成績", "Leistungen der Pferde", "أداء الخيول", "马匹表现", "Prestaties van de paarden", "Desempenho dos cavalos", "Hästarnas prestationer", "Выступления лошадей", "Osiągnięcia koni", "말 성적"],
  "Classement de la saison": ["Season ranking", "Clasificación de la temporada", "Classifica della stagione", "シーズンのランキング", "Saisonwertung", "ترتيب الموسم", "赛季排名", "Klassement van het seizoen", "Classificação da temporada", "Säsongens rankning", "Рейтинг сезона", "Klasyfikacja sezonu", "시즌 순위"],
  "Le direct et les heures de passage": ["Live results and start times", "El directo y las horas de paso", "La diretta e gli orari di passaggio", "ライブと出走時刻", "Live-Ergebnisse und Startzeiten", "البث المباشر ومواعيد المرور", "直播和出场时间", "Live en starttijden", "O direto e os horários de passagem", "Live och starttider", "Прямой эфир и время старта", "Na żywo i godziny startu", "실시간 결과와 출전 시간"],
  "Mes performances": ["My performances", "Mis resultados", "Le mie prestazioni", "私の成績", "Meine Leistungen", "أدائي", "我的成绩", "Mijn prestaties", "Meus desempenhos", "Mina prestationer", "Мои результаты", "Moje wyniki", "내 성적"],
  "Tous tes résultats de la saison": ["All your results this season", "Todos tus resultados de la temporada", "Tutti i tuoi risultati della stagione", "今シーズンのすべての結果", "Alle deine Ergebnisse der Saison", "كل نتائجك هذا الموسم", "你本赛季的所有成绩", "Al je uitslagen van het seizoen", "Todos os teus resultados da temporada", "Alla dina resultat för säsongen", "Все твои результаты сезона", "Wszystkie twoje wyniki sezonu", "이번 시즌 너의 모든 결과"],
  "Vidéothèque de la Team": ["Team video library", "Videoteca del equipo", "Videoteca della squadra", "チームの動画ライブラリ", "Videothek des Teams", "مكتبة فيديو الفريق", "团队视频库", "Videotheek van het team", "Videoteca da equipa", "Lagets videobibliotek", "Видеотека команды", "Wideoteka drużyny", "팀 비디오 라이브러리"],
  "Toutes les vidéos de l’équipe": ["All the team's videos", "Todos los vídeos del equipo", "Tutti i video della squadra", "チームのすべての動画", "Alle Videos des Teams", "كل فيديوهات الفريق", "团队的所有视频", "Alle video's van het team", "Todos os vídeos da equipa", "Alla lagets videor", "Все видео команды", "Wszystkie filmy drużyny", "팀의 모든 영상"],
  "Album de l’écurie": ["Stable album", "Álbum de la cuadra", "Album della scuderia", "厩舎のアルバム", "Stallalbum", "ألبوم الإسطبل", "马厩相册", "Stalalbum", "Álbum da cavalariça", "Stallets album", "Альбом конюшни", "Album stajni", "마구간 앨범"],
  "Les photos du club": ["The club's photos", "Las fotos del club", "Le foto del club", "クラブの写真", "Die Fotos des Vereins", "صور النادي", "俱乐部的照片", "De foto's van de club", "As fotos do clube", "Klubbens foton", "Фото клуба", "Zdjęcia klubu", "클럽 사진"],
  "Résultats complets en ligne": ["Full results online", "Resultados completos en línea", "Risultati completi online", "オンラインの全結果", "Vollständige Ergebnisse online", "النتائج الكاملة على الإنترنت", "在线完整成绩", "Volledige uitslagen online", "Resultados completos online", "Fullständiga resultat online", "Полные результаты онлайн", "Pełne wyniki online", "온라인 전체 결과"],
  "Modifier le lien": ["Edit the link", "Modificar el enlace", "Modifica il link", "リンクを編集", "Link ändern", "تعديل الرابط", "修改链接", "Link wijzigen", "Alterar o link", "Ändra länken", "Изменить ссылку", "Zmień link", "링크 수정"],
  "+ Lien vers les résultats en ligne": ["+ Link to the online results", "+ Enlace a los resultados en línea", "+ Link ai risultati online", "+ オンライン結果へのリンク", "+ Link zu den Online-Ergebnissen", "+ رابط النتائج على الإنترنت", "+ 在线成绩链接", "+ Link naar de online uitslagen", "+ Link para os resultados online", "+ Länk till resultaten online", "+ Ссылка на результаты онлайн", "+ Link do wyników online", "+ 온라인 결과 링크"],
  "Le lien doit commencer par https://": ["The link must start with https://", "El enlace debe empezar por https://", "Il link deve iniziare con https://", "リンクは https:// で始めてください", "Der Link muss mit https:// beginnen", "يجب أن يبدأ الرابط بـ https://", "链接必须以 https:// 开头", "De link moet met https:// beginnen", "O link tem de começar por https://", "Länken måste börja med https://", "Ссылка должна начинаться с https://", "Link musi zaczynać się od https://", "링크는 https:// 로 시작해야 해"],
  "Personne n’a encore été identifié sur les médias de ce concours avec ce filtre. Touche ⋯ sur une photo ou une vidéo pour dire qui est dessus.": ["Nobody has been tagged in this competition's media for this filter yet. Tap ⋯ on a photo or video to say who is in it.", "Todavía nadie ha sido identificado en los medios de este concurso con este filtro. Toca ⋯ en una foto o un vídeo para decir quién aparece.", "Nessuno è ancora stato identificato nei media di questo concorso con questo filtro. Tocca ⋯ su una foto o un video per dire chi c’è.", "このフィルターでは、この大会のメディアにまだ誰もタグ付けされていません。写真や動画の ⋯ をタップして、誰が写っているか指定してください。", "Mit diesem Filter wurde in den Medien dieses Turniers noch niemand markiert. Tippe bei einem Foto oder Video auf ⋯, um anzugeben, wer darauf ist.", "لم تتم الإشارة إلى أحد بعد في وسائط هذه المسابقة بهذا الفلتر. اضغط ⋯ على صورة أو فيديو لتحديد من يظهر فيه.", "此筛选下，本次比赛的媒体中还没有人被标记。点击照片或视频上的 ⋯ 来标记是谁。", "Met dit filter is nog niemand getagd in de media van deze wedstrijd. Tik op ⋯ bij een foto of video om aan te geven wie erop staat.", "Ainda ninguém foi identificado nas mídias deste concurso com este filtro. Toca em ⋯ numa foto ou vídeo para dizer quem aparece.", "Ingen har taggats i tävlingens media med det här filtret än. Tryck på ⋯ på ett foto eller en video för att ange vem som syns.", "С этим фильтром в медиа соревнований ещё никто не отмечен. Нажми ⋯ на фото или видео, чтобы указать, кто на нём.", "Z tym filtrem nikt nie został jeszcze oznaczony w mediach z tych zawodów. Dotknij ⋯ na zdjęciu lub filmie, aby wskazać, kto na nim jest.", "이 필터로는 아직 이 대회 미디어에 태그된 사람이 없어. 사진이나 영상의 ⋯ 를 눌러 누가 나오는지 알려 줘."],
  "✓ Identification enregistrée.": ["✓ Tag saved.", "✓ Identificación guardada.", "✓ Identificazione salvata.", "✓ タグを保存しました。", "✓ Markierung gespeichert.", "✓ تم حفظ الإشارة.", "✓ 标记已保存。", "✓ Tag opgeslagen.", "✓ Identificação guardada.", "✓ Taggning sparad.", "✓ Отметка сохранена.", "✓ Oznaczenie zapisane.", "✓ 태그를 저장했어."],
  /* 09/11 13h55 — doublons, crayon des résultats */
  "Supprimer": ["Delete", "Eliminar", "Elimina", "削除", "Löschen", "حذف", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제"],
  "Corriger": ["Correct", "Corregir", "Correggi", "修正", "Korrigieren", "تصحيح", "更正", "Corrigeren", "Corrigir", "Rätta", "Исправить", "Popraw", "수정"],
  "Supprimer ce résultat de ": ["Delete this result for ", "¿Eliminar este resultado de ", "Eliminare questo risultato di ", "この結果を削除しますか：", "Dieses Ergebnis löschen von ", "حذف هذه النتيجة لـ ", "删除此成绩：", "Dit resultaat verwijderen van ", "Excluir este resultado de ", "Ta bort detta resultat för ", "Удалить этот результат: ", "Usunąć ten wynik: ", "이 결과를 삭제할까요: "],
  "✓ Résultat supprimé.": ["✓ Result deleted.", "✓ Resultado eliminado.", "✓ Risultato eliminato.", "✓ 結果を削除しました。", "✓ Ergebnis gelöscht.", "✓ تم حذف النتيجة.", "✓ 成绩已删除。", "✓ Resultaat verwijderd.", "✓ Resultado excluído.", "✓ Resultatet har tagits bort.", "✓ Результат удалён.", "✓ Wynik usunięty.", "✓ 결과가 삭제됐어."],
  "Suppression impossible : ": ["Couldn't delete: ", "No se pudo eliminar: ", "Eliminazione impossibile: ", "削除できません：", "Löschen nicht möglich: ", "تعذّر الحذف: ", "无法删除：", "Verwijderen mislukt: ", "Exclusão impossível: ", "Kunde inte ta bort: ", "Не удалось удалить: ", "Nie udało się usunąć: ", "삭제할 수 없음: "],
  "refusé : seule la personne qui l’a ajouté ou la modératrice peut le supprimer": ["refused: only the person who added it or the moderator can delete it", "rechazado: solo quien lo añadió o la moderadora puede eliminarlo", "rifiutato: solo chi l’ha aggiunto o la moderatrice può eliminarlo", "拒否：追加した人かモデレーターだけが削除できます", "abgelehnt: nur wer es hinzugefügt hat oder die Moderatorin kann es löschen", "مرفوض: لا يمكن حذفه إلا لمن أضافه أو للمشرفة", "被拒绝：只有添加者或管理员可以删除", "geweigerd: alleen wie het heeft toegevoegd of de moderator kan het verwijderen", "recusado: só quem o adicionou ou a moderadora pode excluí-lo", "nekat: bara den som lade till det eller moderatorn kan ta bort det", "отказано: удалить может только тот, кто добавил, или модератор", "odmowa: usunąć może tylko osoba, która dodała, lub moderatorka", "거부됨: 추가한 사람이나 관리자만 삭제할 수 있어"],
  "Engagé deux fois dans la même épreuve avec le même cheval, le doublon a été retiré : ": ["Entered twice in the same class with the same horse, the duplicate was removed: ", "Inscrito dos veces en la misma prueba con el mismo caballo, se ha quitado el duplicado: ", "Iscritto due volte nella stessa prova con lo stesso cavallo, il doppione è stato tolto: ", "同じ競技に同じ馬で二重登録されていたため、重複を削除しました：", "Zweimal in derselben Prüfung mit demselben Pferd genannt, das Duplikat wurde entfernt: ", "مسجَّل مرتين في المسابقة نفسها بالحصان نفسه، تمت إزالة التكرار: ", "同一赛项同一匹马报名两次，已删除重复项：", "Twee keer ingeschreven in dezelfde rubriek met hetzelfde paard, het dubbele is verwijderd: ", "Inscrito duas vezes na mesma prova com o mesmo cavalo, o duplicado foi retirado: ", "Anmäld två gånger i samma klass med samma häst, dubbletten togs bort: ", "Заявлен дважды в один маршрут с той же лошадью, дубль удалён: ", "Zgłoszony dwa razy do tego samego konkursu z tym samym koniem, duplikat usunięto: ", "같은 종목에 같은 말로 두 번 신청돼서 중복을 삭제했어: "],
  /* 09/11 — lire les résultats (PDF ou capture) */
  "Lire les résultats (PDF ou capture)": ["Read the results (PDF or screenshot)", "Leer los resultados (PDF o captura)", "Leggi i risultati (PDF o screenshot)", "結果を読み取る（PDFまたはスクリーンショット）", "Ergebnisse lesen (PDF oder Screenshot)", "قراءة النتائج (PDF أو لقطة شاشة)", "读取成绩（PDF 或截图）", "Uitslagen lezen (pdf of screenshot)", "Ler os resultados (PDF ou captura)", "Läs resultaten (PDF eller skärmbild)", "Прочитать результаты (PDF или скриншот)", "Odczytaj wyniki (PDF lub zrzut ekranu)", "결과 읽기 (PDF 또는 스크린샷)"],
  "Lecture des résultats… (1 à 2 min)": ["Reading the results… (1 to 2 min)", "Leyendo los resultados… (1 a 2 min)", "Lettura dei risultati… (1-2 min)", "結果を読み取り中…（1〜2分）", "Ergebnisse werden gelesen … (1 bis 2 Min.)", "جارٍ قراءة النتائج… (1 إلى 2 دقيقة)", "正在读取成绩…（1 至 2 分钟）", "Uitslagen worden gelezen… (1 à 2 min)", "Lendo os resultados… (1 a 2 min)", "Läser resultaten… (1–2 min)", "Чтение результатов… (1–2 мин)", "Odczytywanie wyników… (1–2 min)", "결과 읽는 중… (1~2분)"],
  "Le PDF des résultats, une capture du site FFE ou du chronométreur : les résultats de tes couples se remplissent tout seuls.": ["The results PDF, a screenshot of the FFE site or the timekeeper: your pairs' results fill in by themselves.", "El PDF de resultados, una captura de la web de la FFE o del cronometrador: los resultados de tus binomios se rellenan solos.", "Il PDF dei risultati, uno screenshot del sito FFE o del cronometrista: i risultati dei tuoi binomi si compilano da soli.", "結果のPDF、FFEサイトや計時のスクリーンショット：あなたのペアの結果が自動で入力されます。", "Das Ergebnis-PDF, ein Screenshot der FFE-Seite oder der Zeitnahme: Die Ergebnisse deiner Paare werden automatisch ausgefüllt.", "ملف PDF للنتائج أو لقطة شاشة من موقع FFE أو من الميقاتي: تُملأ نتائج ثنائياتك تلقائيًا.", "成绩 PDF、FFE 网站或计时方的截图：你的人马组合成绩会自动填好。", "De uitslagen-pdf, een screenshot van de FFE-site of de tijdwaarneming: de uitslagen van je combinaties vullen zich vanzelf in.", "O PDF dos resultados, uma captura do site da FFE ou do cronometrista: os resultados dos teus conjuntos preenchem-se sozinhos.", "Resultat-PDF:en, en skärmbild från FFE:s sida eller tidtagningen: dina ekipagens resultat fylls i automatiskt.", "PDF с результатами, скриншот сайта FFE или хронометража: результаты твоих пар заполнятся сами.", "PDF z wynikami, zrzut ekranu ze strony FFE lub od chronometrażysty: wyniki twoich par wypełnią się same.", "결과 PDF, FFE 사이트나 계측 화면 스크린샷: 네 커플의 결과가 자동으로 채워져."],
  "Aucun résultat de l’équipe trouvé sur ce document. Vérifie que les chevaux de l’équipe y apparaissent.": ["No team results found in this document. Check that the team's horses appear in it.", "No se encontró ningún resultado del equipo en este documento. Comprueba que aparecen los caballos del equipo.", "Nessun risultato della squadra in questo documento. Verifica che ci siano i cavalli della squadra.", "この書類にチームの結果が見つかりません。チームの馬が載っているか確認してください。", "Keine Teamergebnisse in diesem Dokument gefunden. Prüfe, ob die Pferde des Teams darin stehen.", "لم يُعثر على أي نتيجة للفريق في هذا المستند. تحقّق من ظهور خيول الفريق فيه.", "此文件中未找到团队成绩。请检查团队的马是否在其中。", "Geen teamuitslagen gevonden in dit document. Controleer of de paarden van het team erin staan.", "Nenhum resultado da equipa encontrado neste documento. Verifica se os cavalos da equipa aparecem.", "Inga lagresultat hittades i dokumentet. Kontrollera att lagets hästar finns med.", "В этом документе нет результатов команды. Проверь, есть ли там лошади команды.", "Nie znaleziono wyników drużyny w tym dokumencie. Sprawdź, czy są w nim konie drużyny.", "이 문서에서 팀 결과를 찾지 못했어. 팀의 말들이 나와 있는지 확인해 줘."],
  "Lu : ": ["Read: ", "Leído: ", "Letto: ", "読み取り：", "Gelesen: ", "تمت القراءة: ", "已读取：", "Gelezen: ", "Lido: ", "Läst: ", "Прочитано: ", "Odczytano: ", "읽음: "],
  "Vérifie chaque épreuve, puis touche « Publier ».": ["Check each class, then tap “Publish”.", "Revisa cada prueba y toca «Publicar».", "Controlla ogni prova, poi tocca «Pubblica».", "各競技を確認してから「公開」をタップしてください。", "Prüfe jede Prüfung und tippe dann auf „Veröffentlichen“.", "تحقّق من كل مسابقة ثم اضغط «نشر».", "检查每个赛项，然后点击“发布”。", "Controleer elke rubriek en tik dan op ‘Publiceren’.", "Verifica cada prova e toca em «Publicar».", "Kontrollera varje klass och tryck sedan på ”Publicera”.", "Проверь каждый маршрут и нажми «Опубликовать».", "Sprawdź każdy konkurs, potem dotknij „Opublikuj”.", "종목마다 확인한 뒤 ‘게시’를 눌러 줘."],
  "Lecture impossible : ": ["Couldn't read: ", "No se pudo leer: ", "Lettura impossibile: ", "読み取れません：", "Lesen nicht möglich: ", "تعذّرت القراءة: ", "无法读取：", "Lezen mislukt: ", "Leitura impossível: ", "Kunde inte läsa: ", "Не удалось прочитать: ", "Nie udało się odczytać: ", "읽을 수 없음: "],
  "envoie une photo, une capture d’écran ou un PDF": ["send a photo, a screenshot or a PDF", "envía una foto, una captura o un PDF", "invia una foto, uno screenshot o un PDF", "写真、スクリーンショット、またはPDFを送ってください", "schick ein Foto, einen Screenshot oder ein PDF", "أرسل صورة أو لقطة شاشة أو ملف PDF", "请发送照片、截图或 PDF", "stuur een foto, een screenshot of een pdf", "envia uma foto, uma captura ou um PDF", "skicka ett foto, en skärmbild eller en PDF", "отправь фото, скриншот или PDF", "wyślij zdjęcie, zrzut ekranu lub PDF", "사진, 스크린샷 또는 PDF를 보내 줘"],
  "Rempli d’après ton document : vérifie, corrige si besoin, puis publie.": ["Filled in from your document: check it, correct if needed, then publish.", "Rellenado a partir de tu documento: revísalo, corrige si hace falta y publica.", "Compilato dal tuo documento: controlla, correggi se serve, poi pubblica.", "書類から入力しました：確認し、必要なら直してから公開してください。", "Aus deinem Dokument ausgefüllt: prüfe, korrigiere bei Bedarf und veröffentliche dann.", "مُلئ من مستندك: تحقّق، وصحّح إن لزم، ثم انشر.", "已根据你的文件填写：请检查，必要时更正，然后发布。", "Ingevuld vanuit je document: controleer, verbeter waar nodig en publiceer dan.", "Preenchido a partir do teu documento: verifica, corrige se for preciso e publica.", "Ifyllt från ditt dokument: kontrollera, rätta vid behov och publicera sedan.", "Заполнено по твоему документу: проверь, исправь при необходимости и опубликуй.", "Wypełniono z twojego dokumentu: sprawdź, popraw w razie potrzeby i opublikuj.", "문서에서 채웠어: 확인하고 필요하면 고친 뒤 게시해 줘."],
  /* 09/11 — modifier ou supprimer un engagement */
  "Modifier ou supprimer": ["Edit or delete", "Modificar o eliminar", "Modifica o elimina", "編集または削除", "Bearbeiten oder löschen", "تعديل أو حذف", "编辑或删除", "Bewerken of verwijderen", "Editar ou excluir", "Ändra eller ta bort", "Изменить или удалить", "Edytuj lub usuń", "수정 또는 삭제"],
  "Indique l’épreuve.": ["Enter the class.", "Indica la prueba.", "Indica la prova.", "競技を入力してください。", "Gib die Prüfung an.", "حدّد المسابقة.", "请填写赛项。", "Geef de rubriek op.", "Indica a prova.", "Ange klassen.", "Укажи маршрут.", "Podaj konkurs.", "종목을 입력해 주세요."],
  "Engagement modifié : ": ["Entry updated: ", "Inscripción modificada: ", "Iscrizione modificata: ", "エントリーを変更しました：", "Nennung geändert: ", "تم تعديل التسجيل: ", "报名已修改：", "Inschrijving gewijzigd: ", "Inscrição alterada: ", "Anmälan ändrad: ", "Заявка изменена: ", "Zgłoszenie zmienione: ", "참가 신청 수정됨: "],
  "Supprimer ce tour de ": ["Delete this round for ", "¿Eliminar esta vuelta de ", "Eliminare questo giro di ", "この回を削除しますか：", "Diese Runde löschen von ", "حذف هذه الجولة لـ ", "删除此轮次：", "Deze ronde verwijderen van ", "Excluir esta volta de ", "Ta bort denna runda för ", "Удалить этот заезд: ", "Usunąć ten przejazd: ", "이 라운드를 삭제할까요: "],
  "Non": ["No", "No", "No", "いいえ", "Nein", "لا", "否", "Nee", "Não", "Nej", "Нет", "Nie", "아니요"],
  "Oui, supprimer": ["Yes, delete", "Sí, eliminar", "Sì, elimina", "はい、削除", "Ja, löschen", "نعم، احذف", "是，删除", "Ja, verwijderen", "Sim, excluir", "Ja, ta bort", "Да, удалить", "Tak, usuń", "예, 삭제"],
  "Supprimer ce tour": ["Delete this round", "Eliminar esta vuelta", "Elimina questo giro", "この回を削除", "Diese Runde löschen", "حذف هذه الجولة", "删除此轮次", "Deze ronde verwijderen", "Excluir esta volta", "Ta bort denna runda", "Удалить этот заезд", "Usuń ten przejazd", "이 라운드 삭제"],
  "Afficher ce média": ["Show this media", "Mostrar este medio", "Mostra questo media", "このメディアを表示", "Dieses Medium zeigen", "عرض هذا الوسيط", "显示此媒体", "Dit medium tonen", "Mostrar esta mídia", "Visa detta media", "Показать это медиа", "Pokaż to medium", "이 미디어 보기"],
  /* 09/11 13h30 — Médias du concours */
  "Médias du concours": ["Competition media", "Medios del concurso", "Media del concorso", "大会のメディア", "Medien des Turniers", "وسائط المسابقة", "比赛媒体", "Media van de wedstrijd", "Mídias do concurso", "Tävlingens media", "Медиа соревнований", "Media z zawodów", "대회 미디어"],
  "Ajouter des médias": ["Add media", "Añadir medios", "Aggiungi media", "メディアを追加", "Medien hinzufügen", "إضافة وسائط", "添加媒体", "Media toevoegen", "Adicionar mídias", "Lägg till media", "Добавить медиа", "Dodaj media", "미디어 추가"],
  "Tous": ["All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alle", "Todos", "Alla", "Все", "Wszystkie", "전체"],
  "Vidéos": ["Videos", "Vídeos", "Video", "動画", "Videos", "فيديوهات", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"],
  "Photos": ["Photos", "Fotos", "Foto", "写真", "Fotos", "صور", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"],
  "Filtrer :": ["Filter:", "Filtrar:", "Filtra:", "絞り込み：", "Filtern:", "تصفية:", "筛选：", "Filteren:", "Filtrar:", "Filtrera:", "Фильтр:", "Filtruj:", "필터:"],
  "Cavalier": ["Rider", "Jinete", "Cavaliere", "騎手", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "라이더"],
  "Cheval": ["Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말"],
  "Effacer": ["Clear", "Borrar", "Cancella", "クリア", "Zurücksetzen", "مسح", "清除", "Wissen", "Limpar", "Rensa", "Сбросить", "Wyczyść", "초기화"],
  "Mes médias": ["My media", "Mis medios", "I miei media", "私のメディア", "Meine Medien", "وسائطي", "我的媒体", "Mijn media", "Minhas mídias", "Mina media", "Мои медиа", "Moje media", "내 미디어"],
  "Les médias de l’équipe": ["Team media", "Los medios del equipo", "I media della squadra", "チームのメディア", "Medien des Teams", "وسائط الفريق", "团队媒体", "Media van het team", "As mídias da equipe", "Lagets media", "Медиа команды", "Media drużyny", "팀 미디어"],
  "médias": ["media", "medios", "media", "件", "Medien", "وسائط", "个媒体", "media", "mídias", "media", "медиа", "media", "개"],
  "média": ["media item", "medio", "media", "件", "Medium", "وسيط", "个媒体", "medium", "mídia", "media", "медиа", "medium", "개"],
  "Afficher plus": ["Show more", "Mostrar más", "Mostra altro", "もっと見る", "Mehr anzeigen", "عرض المزيد", "显示更多", "Meer tonen", "Mostrar mais", "Visa fler", "Показать ещё", "Pokaż więcej", "더 보기"],
  "Aucun de tes médias ne correspond à ces filtres.": ["None of your media match these filters.", "Ninguno de tus medios coincide con estos filtros.", "Nessuno dei tuoi media corrisponde a questi filtri.", "条件に合うあなたのメディアはありません。", "Keins deiner Medien passt zu diesen Filtern.", "لا يطابق أي من وسائطك هذه المرشحات.", "没有符合这些筛选条件的个人媒体。", "Geen van je media past bij deze filters.", "Nenhuma das suas mídias corresponde a estes filtros.", "Inga av dina media matchar filtren.", "Нет твоих медиа по этим фильтрам.", "Żadne z twoich mediów nie pasuje do filtrów.", "조건에 맞는 내 미디어가 없어요."],
  "Tu n’as pas encore de média sur ce concours. Ajoute les tiens, ou demande qu’on t’identifie sur les photos de l’équipe.": ["You don't have any media from this show yet. Add yours, or ask to be tagged in the team's photos.", "Aún no tienes medios de este concurso. Añade los tuyos o pide que te identifiquen en las fotos del equipo.", "Non hai ancora media di questo concorso. Aggiungi i tuoi o chiedi di essere identificato nelle foto della squadra.", "この大会のメディアはまだありません。自分のものを追加するか、チームの写真でタグ付けしてもらいましょう。", "Du hast noch keine Medien von diesem Turnier. Füge deine hinzu oder lass dich auf den Team-Fotos markieren.", "لا توجد لديك وسائط من هذه المسابقة بعد. أضف وسائطك أو اطلب أن يُشار إليك في صور الفريق.", "你还没有这场比赛的媒体。添加你的媒体，或请队友在照片中标记你。", "Je hebt nog geen media van deze wedstrijd. Voeg de jouwe toe of vraag om getagd te worden op de teamfoto's.", "Você ainda não tem mídias deste concurso. Adicione as suas ou peça para ser identificado nas fotos da equipe.", "Du har inga media från tävlingen än. Lägg till dina eller be om att bli taggad på lagets foton.", "У тебя пока нет медиа с этих соревнований. Добавь свои или попроси отметить тебя на фото команды.", "Nie masz jeszcze mediów z tych zawodów. Dodaj swoje lub poproś o oznaczenie na zdjęciach drużyny.", "아직 이 대회의 내 미디어가 없어요. 직접 추가하거나 팀 사진에 태그해 달라고 해요."],
  "Aucun média de l’équipe ne correspond à ces filtres.": ["No team media match these filters.", "Ningún medio del equipo coincide con estos filtros.", "Nessun media della squadra corrisponde a questi filtri.", "条件に合うチームのメディアはありません。", "Keine Team-Medien passen zu diesen Filtern.", "لا تطابق أي من وسائط الفريق هذه المرشحات.", "没有符合这些筛选条件的团队媒体。", "Geen teammedia passen bij deze filters.", "Nenhuma mídia da equipe corresponde a estes filtros.", "Inga lagmedia matchar filtren.", "Нет медиа команды по этим фильтрам.", "Żadne media drużyny nie pasują do filtrów.", "조건에 맞는 팀 미디어가 없어요."],
  "Pas encore de média de l’équipe sur ce concours.": ["No team media from this show yet.", "Aún no hay medios del equipo de este concurso.", "Ancora nessun media della squadra per questo concorso.", "この大会のチームのメディアはまだありません。", "Noch keine Team-Medien von diesem Turnier.", "لا توجد وسائط للفريق من هذه المسابقة بعد.", "这场比赛还没有团队媒体。", "Nog geen teammedia van deze wedstrijd.", "Ainda não há mídias da equipe deste concurso.", "Inga lagmedia från tävlingen än.", "Медиа команды с этих соревнований пока нет.", "Brak jeszcze mediów drużyny z tych zawodów.", "아직 이 대회의 팀 미디어가 없어요."],
  "Lire la vidéo": ["Play the video", "Reproducir el vídeo", "Riproduci il video", "動画を再生", "Video abspielen", "تشغيل الفيديو", "播放视频", "Video afspelen", "Reproduzir o vídeo", "Spela videon", "Воспроизвести видео", "Odtwórz film", "영상 재생"],
  "Voir la photo": ["View the photo", "Ver la foto", "Vedi la foto", "写真を見る", "Foto ansehen", "عرض الصورة", "查看照片", "Foto bekijken", "Ver a foto", "Visa fotot", "Открыть фото", "Zobacz zdjęcie", "사진 보기"],
  "Identifier": ["Tag", "Identificar", "Identifica", "タグ付け", "Markieren", "وسم", "标记", "Taggen", "Identificar", "Tagga", "Отметить", "Oznacz", "태그"],
  "Qui est sur ce média ?": ["Who's in this photo or video?", "¿Quién aparece en este medio?", "Chi c'è in questo media?", "このメディアに写っているのは？", "Wer ist auf diesem Medium?", "من يظهر في هذا الوسيط؟", "谁在这个媒体里？", "Wie staat erop?", "Quem aparece nesta mídia?", "Vem är med?", "Кто на этом медиа?", "Kto jest na tym medium?", "이 미디어에 누가 있나요?"],
  "Facultatif : n’identifie que ce dont tu es sûr.": ["Optional: only tag what you're sure about.", "Opcional: identifica solo lo que tengas claro.", "Facoltativo: identifica solo ciò di cui sei sicuro.", "任意：確かなものだけタグ付けしましょう。", "Freiwillig: Markiere nur, was du sicher weißt.", "اختياري: لا تَسِم إلا ما أنت متأكد منه.", "可选：只标记你确定的内容。", "Optioneel: tag alleen wat je zeker weet.", "Opcional: identifique só o que tiver certeza.", "Valfritt: tagga bara det du är säker på.", "Необязательно: отмечай только то, в чём уверен.", "Opcjonalnie: oznaczaj tylko to, czego jesteś pewien.", "선택 사항: 확실한 것만 태그해요."],
  "✓ Identification enregistrée. Les cavaliers identifiés sont prévenus et peuvent la confirmer.": ["✓ Tag saved. Tagged riders are notified and can confirm it.", "✓ Identificación guardada. Los jinetes identificados reciben un aviso y pueden confirmarla.", "✓ Identificazione salvata. I cavalieri identificati vengono avvisati e possono confermarla.", "✓ タグを保存しました。タグ付けされた騎手に通知され、確認できます。", "✓ Markierung gespeichert. Markierte Reiter werden benachrichtigt und können sie bestätigen.", "✓ حُفظ الوسم. يُبلَّغ الفرسان المعنيون ويمكنهم تأكيده.", "✓ 标记已保存。被标记的骑手会收到通知并可确认。", "✓ Tag opgeslagen. Getagde ruiters krijgen een melding en kunnen hem bevestigen.", "✓ Identificação salva. Os cavaleiros identificados são avisados e podem confirmá-la.", "✓ Taggning sparad. Taggade ryttare meddelas och kan bekräfta den.", "✓ Отметка сохранена. Отмеченные всадники получат уведомление и смогут её подтвердить.", "✓ Oznaczenie zapisane. Oznaczeni jeźdźcy dostaną powiadomienie i mogą je potwierdzić.", "✓ 태그를 저장했어요. 태그된 라이더에게 알림이 가고 확인할 수 있어요."],
  "Moi": ["Me", "Yo", "Io", "自分", "Ich", "أنا", "我", "Ik", "Eu", "Jag", "Я", "Ja", "나"],
  "Photos ou vidéos du concours": ["Show photos or videos", "Fotos o vídeos del concurso", "Foto o video del concorso", "大会の写真・動画", "Fotos oder Videos vom Turnier", "صور أو فيديوهات المسابقة", "比赛照片或视频", "Foto's of video's van de wedstrijd", "Fotos ou vídeos do concurso", "Foton eller videor från tävlingen", "Фото или видео с соревнований", "Zdjęcia lub filmy z zawodów", "대회 사진 또는 영상"],
  "Dans le fil du concours, en bas de la page. Tu pourras ensuite identifier qui est dessus avec ⋯.": ["In the show feed, at the bottom of the page. You can then tag who's in them with ⋯.", "En el muro del concurso, al final de la página. Después podrás identificar quién aparece con ⋯.", "Nel feed del concorso, in fondo alla pagina. Potrai poi identificare chi c'è con ⋯.", "ページ下部の大会フィードから。あとで ⋯ で写っている人をタグ付けできます。", "Im Turnier-Feed unten auf der Seite. Danach kannst du mit ⋯ markieren, wer drauf ist.", "في موجز المسابقة أسفل الصفحة. يمكنك بعدها وسم من يظهر عبر ⋯.", "在页面底部的比赛动态中。之后可用 ⋯ 标记照片中的人。", "In de wedstrijdfeed onderaan de pagina. Daarna kun je met ⋯ taggen wie erop staat.", "No mural do concurso, no fim da página. Depois você pode identificar quem aparece com ⋯.", "I tävlingsflödet längst ner. Sedan kan du tagga vem som är med via ⋯.", "В ленте соревнований внизу страницы. Потом можно отметить, кто на них, через ⋯.", "W relacji z zawodów na dole strony. Potem oznaczysz, kto jest na zdjęciu, przez ⋯.", "페이지 아래 대회 피드에서요. 이후 ⋯로 누가 있는지 태그할 수 있어요."],
  "Vidéo de parcours de l’équipe": ["Team round video", "Vídeo de recorrido del equipo", "Video del percorso della squadra", "チームの走行動画", "Rittvideo des Teams", "فيديو جولة للفريق", "团队比赛视频", "Rondevideo van het team", "Vídeo de percurso da equipe", "Lagets rundvideo", "Видео маршрута команды", "Film z przejazdu drużyny", "팀 라운드 영상"],
  "Rattachée à l’épreuve et au résultat.": ["Linked to the class and the result.", "Vinculado a la prueba y al resultado.", "Collegato alla prova e al risultato.", "競技と結果にひも付けられます。", "Mit Prüfung und Ergebnis verknüpft.", "مرتبط بالفئة والنتيجة.", "关联到项目和成绩。", "Gekoppeld aan de rubriek en de uitslag.", "Vinculado à prova e ao resultado.", "Kopplad till klassen och resultatet.", "Привязано к маршруту и результату.", "Powiązany z konkursem i wynikiem.", "종목과 결과에 연결돼요."],
  /* 09/11 — publier depuis le direct */
  "Publier les résultats du direct": ["Publish the live results", "Publicar los resultados del directo", "Pubblica i risultati della diretta", "ライブの結果を公開", "Live-Ergebnisse veröffentlichen", "نشر النتائج المباشرة", "发布实时成绩", "Live-uitslagen publiceren", "Publicar os resultados ao vivo", "Publicera liveresultaten", "Опубликовать онлайн-результаты", "Opublikuj wyniki na żywo", "실시간 결과 공개"],
  "résultats publiés": ["results published", "resultados publicados", "risultati pubblicati", "件の結果を公開", "Ergebnisse veröffentlicht", "نتائج منشورة", "条成绩已发布", "uitslagen gepubliceerd", "resultados publicados", "resultat publicerade", "результатов опубликовано", "wyników opublikowano", "개의 결과 공개"],
  "résultat publié": ["result published", "resultado publicado", "risultato pubblicato", "件の結果を公開", "Ergebnis veröffentlicht", "نتيجة منشورة", "条成绩已发布", "uitslag gepubliceerd", "resultado publicado", "resultat publicerat", "результат опубликован", "wynik opublikowany", "개의 결과 공개"],
  " depuis le direct (provisoires, confirmés par l’import du télémat).": [" from the live feed (provisional, confirmed by the FFE import).", " desde el directo (provisionales, confirmados por la importación de la FFE).", " dalla diretta (provvisori, confermati dall'importazione FFE).", " ライブから（暫定。FFE の取り込みで確定）。", " aus dem Live-Ergebnis (vorläufig, bestätigt durch den FFE-Import).", " من البث المباشر (مؤقتة، يؤكدها استيراد FFE).", " 来自实时成绩（临时，导入 FFE 后确认）。", " uit de live-uitslagen (voorlopig, bevestigd door de FFE-import).", " do ao vivo (provisórios, confirmados pela importação da FFE).", " från liveresultaten (preliminära, bekräftas av FFE-importen).", " из онлайн-результатов (предварительно, подтвердит импорт FFE).", " z wyników na żywo (tymczasowe, potwierdzi je import FFE).", " 실시간 결과에서 (잠정, FFE 가져오기로 확정)."],
  "Rien à publier : aucun classement lu pour l’instant.": ["Nothing to publish: no placings read yet.", "Nada que publicar: aún no se ha leído ninguna clasificación.", "Niente da pubblicare: nessuna classifica letta per ora.", "公開するものはありません。まだ順位が読み込まれていません。", "Nichts zu veröffentlichen: noch keine Platzierung gelesen.", "لا شيء للنشر: لم يُقرأ أي تصنيف بعد.", "没有可发布的内容：尚未读取到排名。", "Niets te publiceren: nog geen klassering gelezen.", "Nada a publicar: nenhuma classificação lida ainda.", "Inget att publicera: inga placeringar lästa ännu.", "Нечего публиковать: места пока не получены.", "Nic do opublikowania: brak odczytanych miejsc.", "공개할 것이 없어요. 아직 읽은 순위가 없어요."],
  /* 09/11 13h — page Résultats du concours */
  "Éliminé": ["Eliminated", "Eliminado", "Eliminato", "失権", "Ausgeschieden", "مُقصى", "淘汰", "Uitgesloten", "Eliminado", "Utesluten", "Исключён", "Wyeliminowany", "실격"],
  "Abandon": ["Retired", "Abandono", "Ritirato", "棄権", "Aufgegeben", "انسحاب", "弃权", "Opgegeven", "Abandono", "Utgått", "Сход", "Wycofany", "기권"],
  "Non partant": ["Did not start", "No presentado", "Non partito", "不出走", "Nicht gestartet", "لم ينطلق", "未出发", "Niet gestart", "Não largou", "Startade ej", "Не стартовал", "Nie wystartował", "미출전"],
  "Non classé": ["Not placed", "No clasificado", "Non classificato", "入賞外", "Nicht platziert", "غير مصنّف", "未排名", "Niet geklasseerd", "Não classificado", "Ej placerad", "Без места", "Niesklasyfikowany", "순위 없음"],
  "Officiel": ["Official", "Oficial", "Ufficiale", "公式", "Offiziell", "رسمي", "正式", "Officieel", "Oficial", "Officiellt", "Официально", "Oficjalne", "공식"],
  "Provisoire": ["Provisional", "Provisional", "Provvisorio", "暫定", "Vorläufig", "مؤقت", "临时", "Voorlopig", "Provisório", "Preliminärt", "Предварительно", "Tymczasowe", "잠정"],
  "Saisie coach": ["Entered by coach", "Introducido por la entrenadora", "Inserito dalla coach", "コーチ入力", "Von der Trainerin erfasst", "أدخلته المدربة", "教练录入", "Ingevoerd door coach", "Inserido pela treinadora", "Inmatat av tränaren", "Внесено тренером", "Wpisane przez trenerkę", "코치 입력"],
  "Résultats en attente": ["Results pending", "Resultados pendientes", "Risultati in attesa", "結果待ち", "Ergebnisse ausstehend", "النتائج قيد الانتظار", "成绩待公布", "Uitslagen volgen", "Resultados pendentes", "Resultat väntas", "Результаты ожидаются", "Wyniki w toku", "결과 대기 중"],
  "En attente": ["Pending", "Pendiente", "In attesa", "待ち", "Ausstehend", "قيد الانتظار", "待定", "In afwachting", "Pendente", "Väntar", "Ожидается", "Oczekuje", "대기 중"],
  "Concours en direct": ["Live show", "Concurso en directo", "Concorso in diretta", "大会ライブ", "Turnier live", "المسابقة مباشرة", "比赛直播", "Wedstrijd live", "Concurso ao vivo", "Tävlingen live", "Соревнования онлайн", "Zawody na żywo", "대회 라이브"],
  "EN DIRECT": ["LIVE", "EN DIRECTO", "IN DIRETTA", "ライブ", "LIVE", "مباشر", "直播中", "LIVE", "AO VIVO", "LIVE", "В ЭФИРЕ", "NA ŻYWO", "라이브"],
  "Voir le live": ["Watch the live stream", "Ver el directo", "Guarda la diretta", "ライブ配信を見る", "Livestream ansehen", "شاهد البث", "观看直播", "Livestream bekijken", "Ver a transmissão", "Se livesändningen", "Смотреть трансляцию", "Oglądaj transmisję", "라이브 보기"],
  "Aucun lien pour l’instant": ["No link yet", "Aún no hay enlace", "Ancora nessun link", "まだリンクはありません", "Noch kein Link", "لا يوجد رابط بعد", "暂无链接", "Nog geen link", "Ainda sem link", "Ingen länk ännu", "Ссылки пока нет", "Brak linku", "아직 링크가 없어요"],
  "Régler": ["Settings", "Ajustar", "Imposta", "設定", "Einstellen", "ضبط", "设置", "Instellen", "Ajustar", "Ställ in", "Настроить", "Ustaw", "설정"],
  "Le lien du live doit commencer par https://": ["The live link must start with https://", "El enlace del directo debe empezar por https://", "Il link della diretta deve iniziare con https://", "ライブのリンクは https:// で始めてください", "Der Live-Link muss mit https:// beginnen", "يجب أن يبدأ رابط البث بـ https://", "直播链接必须以 https:// 开头", "De livelink moet met https:// beginnen", "O link da transmissão deve começar com https://", "Livelänken måste börja med https://", "Ссылка на трансляцию должна начинаться с https://", "Link do transmisji musi zaczynać się od https://", "라이브 링크는 https://로 시작해야 해요"],
  "Lien du live vidéo (https://…)": ["Live video link (https://…)", "Enlace del vídeo en directo (https://…)", "Link del video in diretta (https://…)", "ライブ動画のリンク（https://…）", "Link zum Live-Video (https://…)", "رابط البث المباشر (https://…)", "直播视频链接（https://…）", "Link naar de livestream (https://…)", "Link do vídeo ao vivo (https://…)", "Länk till livesändningen (https://…)", "Ссылка на видеотрансляцию (https://…)", "Link do transmisji wideo (https://…)", "라이브 영상 링크 (https://…)"],
  "La diffusion est en cours (affiche « EN DIRECT »)": ["The stream is on now (shows “LIVE”)", "La retransmisión está en curso (muestra «EN DIRECTO»)", "La diretta è in corso (mostra «IN DIRETTA»)", "配信中（「ライブ」を表示）", "Die Übertragung läuft (zeigt „LIVE“)", "البث جارٍ الآن (يعرض «مباشر»)", "正在直播（显示“直播中”）", "De uitzending loopt (toont „LIVE”)", "A transmissão está no ar (mostra «AO VIVO»)", "Sändningen pågår (visar ”LIVE”)", "Трансляция идёт (показывает «В ЭФИРЕ»)", "Transmisja trwa (pokazuje „NA ŻYWO”)", "방송 중(‘라이브’ 표시)"],
  "Le lien des résultats en direct se règle dans Jour J.": ["The live results link is set in Show day.", "El enlace de resultados en directo se ajusta en Día D.", "Il link dei risultati in diretta si imposta in Giorno G.", "ライブ結果のリンクは「当日」で設定します。", "Der Link zu den Live-Ergebnissen wird im Turniertag eingestellt.", "يُضبط رابط النتائج المباشرة في صفحة يوم المسابقة.", "实时成绩链接在“比赛日”中设置。", "De link naar live-uitslagen stel je in bij Wedstrijddag.", "O link dos resultados ao vivo é ajustado no Dia D.", "Länken till liveresultaten ställs in under Tävlingsdagen.", "Ссылка на онлайн-результаты настраивается в разделе «День старта».", "Link do wyników na żywo ustawia się w Dniu zawodów.", "실시간 결과 링크는 ‘대회 당일’에서 설정해요."],
  "Annuler": ["Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"],
  "Saisie rapide": ["Quick entry", "Entrada rápida", "Inserimento rapido", "クイック入力", "Schnelleingabe", "إدخال سريع", "快速录入", "Snel invoeren", "Entrada rápida", "Snabbinmatning", "Быстрый ввод", "Szybkie wprowadzanie", "빠른 입력"],
  "Partants": ["Starters", "Participantes", "Partenti", "出走数", "Starter", "المشاركون", "参赛数", "Starters", "Participantes", "Startande", "Участники", "Startujący", "출전 수"],
  "Place": ["Place", "Puesto", "Posto", "順位", "Platz", "المركز", "名次", "Plaats", "Colocação", "Placering", "Место", "Miejsce", "순위"],
  "Pén.": ["Pen.", "Pen.", "Pen.", "減点", "Fehler", "جزاء", "罚分", "Fout.", "Pen.", "Fel", "Штр.", "Kary", "감점"],
  "Temps": ["Time", "Tiempo", "Tempo", "タイム", "Zeit", "الوقت", "用时", "Tijd", "Tempo", "Tid", "Время", "Czas", "시간"],
  "Gains €": ["Prize €", "Premio €", "Premio €", "賞金 €", "Gewinn €", "الجائزة €", "奖金 €", "Prijzengeld €", "Prêmio €", "Prispengar €", "Призовые €", "Nagroda €", "상금 €"],
  "Sans-faute": ["Clear round", "Sin faltas", "Netto", "減点なし", "Null-Fehler-Ritt", "بدون أخطاء", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bezbłędnie", "무감점"],
  "Aucun couple de l’équipe dans cette épreuve.": ["No team pairs in this class.", "Ningún binomio del equipo en esta prueba.", "Nessun binomio della squadra in questa prova.", "この競技にチームの人馬はいません。", "Keine Team-Paare in dieser Prüfung.", "لا ثنائيات من الفريق في هذه الفئة.", "本项目没有团队人马组合。", "Geen combinaties van het team in deze rubriek.", "Nenhum conjunto da equipe nesta prova.", "Inga lagekipage i klassen.", "В этом маршруте нет пар команды.", "Brak par drużyny w tym konkursie.", "이 종목에 팀 인마가 없어요."],
  "Une saisie de la coach n’est jamais présentée comme un résultat officiel : l’import du télémat FFE la confirmera.": ["A coach entry is never shown as an official result: the FFE results import will confirm it.", "Lo que introduce la entrenadora nunca se presenta como resultado oficial: la importación de la FFE lo confirmará.", "Un inserimento della coach non è mai mostrato come risultato ufficiale: l'importazione FFE lo confermerà.", "コーチの入力は公式結果として表示されません。FFE の成績取り込みで確定します。", "Eine Eingabe der Trainerin gilt nie als offizielles Ergebnis: Der FFE-Import bestätigt es.", "لا يُعرض ما تدخله المدربة كنتيجة رسمية أبدًا: سيؤكده استيراد نتائج FFE.", "教练录入的成绩不会显示为正式成绩，导入 FFE 成绩后才会确认。", "Een invoer van de coach is nooit een officiële uitslag: de FFE-import bevestigt die.", "Uma entrada da treinadora nunca é mostrada como resultado oficial: a importação da FFE a confirmará.", "Tränarens inmatning visas aldrig som officiellt resultat: FFE-importen bekräftar den.", "Данные тренера никогда не считаются официальными: их подтвердит импорт FFE.", "Wpis trenerki nigdy nie jest wynikiem oficjalnym: potwierdzi go import FFE.", "코치 입력은 공식 결과로 표시되지 않아요. FFE 성적 가져오기로 확정돼요."],
  "Brouillon": ["Draft", "Borrador", "Bozza", "下書き", "Entwurf", "مسودة", "草稿", "Concept", "Rascunho", "Utkast", "Черновик", "Szkic", "초안"],
  "Publier": ["Publish", "Publicar", "Pubblica", "公開", "Veröffentlichen", "نشر", "发布", "Publiceren", "Publicar", "Publicera", "Опубликовать", "Opublikuj", "공개"],
  "✓ Résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums.": ["✓ Results published: they now appear on the show page, in performances and on the podiums.", "✓ Resultados publicados: aparecen en la ficha del concurso, en el rendimiento y en los podios.", "✓ Risultati pubblicati: compaiono nella scheda del concorso, nelle prestazioni e nei podi.", "✓ 結果を公開しました。大会ページ、成績、表彰台に表示されます。", "✓ Ergebnisse veröffentlicht: Sie erscheinen auf der Turnierseite, bei den Leistungen und auf den Podien.", "✓ نُشرت النتائج: تظهر في صفحة المسابقة والأداء ومنصات التتويج.", "✓ 成绩已发布：会显示在比赛页面、表现和领奖台中。", "✓ Uitslagen gepubliceerd: ze staan op de wedstrijdpagina, bij de prestaties en op de podia.", "✓ Resultados publicados: aparecem na ficha do concurso, no desempenho e nos pódios.", "✓ Resultaten publicerade: de syns på tävlingssidan, i prestationerna och på pallen.", "✓ Результаты опубликованы: они видны на странице соревнований, в достижениях и на пьедесталах.", "✓ Wyniki opublikowane: widać je na stronie zawodów, w osiągnięciach i na podium.", "✓ 결과를 공개했어요. 대회 페이지, 성적, 시상대에 표시돼요."],
  "✓ Brouillon enregistré : toi seule le vois.": ["✓ Draft saved: only you can see it.", "✓ Borrador guardado: solo tú lo ves.", "✓ Bozza salvata: la vedi solo tu.", "✓ 下書きを保存しました。あなただけが見られます。", "✓ Entwurf gespeichert: Nur du siehst ihn.", "✓ حُفظت المسودة: أنت فقط من يراها.", "✓ 草稿已保存：只有你能看到。", "✓ Concept opgeslagen: alleen jij ziet het.", "✓ Rascunho salvo: só você o vê.", "✓ Utkast sparat: bara du ser det.", "✓ Черновик сохранён: его видишь только ты.", "✓ Szkic zapisany: widzisz go tylko ty.", "✓ 초안을 저장했어요. 나만 볼 수 있어요."],
  "de l’équipe": ["from the team", "del equipo", "della squadra", "チーム", "vom Team", "من الفريق", "名队员", "van het team", "da equipe", "från laget", "из команды", "z drużyny", "팀"],
  "meilleur : ": ["best: ", "mejor: ", "migliore: ", "最高：", "beste: ", "الأفضل: ", "最佳：", "beste: ", "melhor: ", "bäst: ", "лучшее: ", "najlepsze: ", "최고: "],
  "pts": ["pen.", "pts", "pen.", "点", "Fehler", "نقاط", "分", "fouten", "pts", "fel", "штр.", "pkt", "점"],
  "pt": ["pen.", "pt", "pen.", "点", "Fehler", "نقطة", "分", "fout", "pt", "fel", "штр.", "pkt", "점"],
  "Voir la vidéo du parcours": ["Watch the round video", "Ver el vídeo del recorrido", "Guarda il video del percorso", "走行動画を見る", "Video des Ritts ansehen", "شاهد فيديو الجولة", "观看本轮视频", "Video van de ronde bekijken", "Ver o vídeo do percurso", "Se rundens video", "Смотреть видео маршрута", "Obejrzyj film z przejazdu", "라운드 영상 보기"],
  "Saisir ou corriger": ["Enter or correct", "Introducir o corregir", "Inserisci o correggi", "入力・修正", "Erfassen oder korrigieren", "إدخال أو تصحيح", "录入或更正", "Invoeren of corrigeren", "Inserir ou corrigir", "Mata in eller rätta", "Внести или исправить", "Wpisz lub popraw", "입력 또는 수정"],
  "Résultats de l’équipe": ["Team results", "Resultados del equipo", "Risultati della squadra", "チームの成績", "Ergebnisse des Teams", "نتائج الفريق", "团队成绩", "Uitslagen van het team", "Resultados da equipe", "Lagets resultat", "Результаты команды", "Wyniki drużyny", "팀 성적"],
  "Les podiums de l’équipe": ["Team podiums", "Los podios del equipo", "I podi della squadra", "チームの表彰台", "Die Podien des Teams", "منصات تتويج الفريق", "团队领奖台", "Podiumplaatsen van het team", "Os pódios da equipe", "Lagets pallplatser", "Пьедесталы команды", "Podia drużyny", "팀 시상대"],
  "victoire": ["win", "victoria", "vittoria", "勝", "Sieg", "فوز", "次冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "우승"],
  "victoires": ["wins", "victorias", "vittorie", "勝", "Siege", "انتصارات", "次冠军", "overwinningen", "vitórias", "segrar", "победы", "zwycięstwa", "우승"],
  "deuxième place": ["second place", "segundo puesto", "secondo posto", "2位", "zweiter Platz", "مركز ثانٍ", "次亚军", "tweede plaats", "segundo lugar", "andraplats", "второе место", "drugie miejsce", "2위"],
  "deuxièmes places": ["second places", "segundos puestos", "secondi posti", "2位", "zweite Plätze", "مراكز ثانية", "次亚军", "tweede plaatsen", "segundos lugares", "andraplatser", "вторых места", "drugie miejsca", "2위"],
  "troisième place": ["third place", "tercer puesto", "terzo posto", "3位", "dritter Platz", "مركز ثالث", "次季军", "derde plaats", "terceiro lugar", "tredjeplats", "третье место", "trzecie miejsce", "3위"],
  "troisièmes places": ["third places", "terceros puestos", "terzi posti", "3位", "dritte Plätze", "مراكز ثالثة", "次季军", "derde plaatsen", "terceiros lugares", "tredjeplatser", "третьих места", "trzecie miejsca", "3위"],
  "classement": ["placing", "clasificación", "piazzamento", "入賞", "Platzierung", "تصنيف", "次排名", "klassering", "classificação", "placering", "призовое место", "klasyfikacja", "입상"],
  "classements": ["placings", "clasificaciones", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "次排名", "klasseringen", "classificações", "placeringar", "призовых мест", "klasyfikacje", "입상"],
  "Classements complets": ["Full results", "Clasificaciones completas", "Classifiche complete", "全成績", "Komplette Ergebnisse", "التصنيفات الكاملة", "完整排名", "Volledige uitslagen", "Classificações completas", "Fullständiga resultat", "Полные результаты", "Pełne wyniki", "전체 순위"],
  "Revoir les vidéos": ["Watch the videos again", "Volver a ver los vídeos", "Rivedi i video", "動画をもう一度見る", "Videos noch mal ansehen", "إعادة مشاهدة الفيديوهات", "重温视频", "Video's terugkijken", "Rever os vídeos", "Se videorna igen", "Пересмотреть видео", "Obejrzyj filmy ponownie", "영상 다시 보기"],
  /* 09/11 12h30 — Passages de l’équipe, Organisation du paddock, Règles du paddock */
  "Passages de l’équipe": ["Team start times", "Salidas del equipo", "Partenze della squadra", "チームの出場", "Starts des Teams", "انطلاقات الفريق", "团队出场", "Starts van het team", "Entradas da equipe", "Lagets starter", "Старты команды", "Starty drużyny", "팀 출전"],
  "Voir le direct": ["Watch live", "Ver en directo", "Guarda in diretta", "ライブを見る", "Live ansehen", "شاهد البث المباشر", "观看直播", "Live bekijken", "Ver ao vivo", "Se live", "Смотреть онлайн", "Oglądaj na żywo", "라이브 보기"],
  "Piste ": ["Arena ", "Pista ", "Campo ", "馬場 ", "Platz ", "الميدان ", "场地 ", "Ring ", "Pista ", "Bana ", "Манеж ", "Czworobok ", "경기장 "],
  "passages": ["starts", "salidas", "partenze", "出場", "Starts", "انطلاقات", "次出场", "starts", "entradas", "starter", "стартов", "startów", "출전"],
  "passage": ["start", "salida", "partenza", "出場", "Start", "انطلاق", "次出场", "start", "entrada", "start", "старт", "start", "출전"],
  "N° ": ["No. ", "N.º ", "N. ", "No. ", "Nr. ", "رقم ", "第 ", "Nr. ", "N.º ", "Nr ", "№ ", "Nr ", "No. "],
  "Organisation du paddock": ["Warm-up arena plan", "Organización del paddock", "Organizzazione del campo prova", "準備馬場の段取り", "Organisation am Abreiteplatz", "تنظيم ميدان الإحماء", "热身场安排", "Organisatie losrijring", "Organização do paddock", "Framridningsplan", "Организация разминки", "Organizacja rozprężalni", "준비 마장 운영"],
  "Groupes de détente": ["Warm-up groups", "Grupos de calentamiento", "Gruppi di riscaldamento", "ウォームアップのグループ", "Abreitegruppen", "مجموعات الإحماء", "热身分组", "Losrijgroepen", "Grupos de aquecimento", "Framridningsgrupper", "Группы разминки", "Grupy rozprężenia", "워밍업 그룹"],
  "Modifier les groupes": ["Edit groups", "Editar los grupos", "Modifica i gruppi", "グループを編集", "Gruppen bearbeiten", "تعديل المجموعات", "编辑分组", "Groepen bewerken", "Editar os grupos", "Ändra grupperna", "Изменить группы", "Edytuj grupy", "그룹 수정"],
  "Ton groupe : ": ["Your group: ", "Tu grupo: ", "Il tuo gruppo: ", "あなたのグループ：", "Deine Gruppe: ", "مجموعتك: ", "你的分组：", "Jouw groep: ", "Seu grupo: ", "Din grupp: ", "Твоя группа: ", "Twoja grupa: ", "내 그룹: "],
  " · rendez-vous au paddock à ": [" · meet at the warm-up arena at ", " · cita en el paddock a las ", " · appuntamento al campo prova alle ", " · 準備馬場に集合 ", " · Treffpunkt Abreiteplatz um ", " · الموعد في ميدان الإحماء الساعة ", " · 热身场集合时间 ", " · afspraak bij de losrijring om ", " · encontro no paddock às ", " · samling vid framridningen kl. ", " · сбор на разминке в ", " · zbiórka na rozprężalni o ", " · 준비 마장 집합 "],
  "Pas encore de groupe pour cette épreuve : touche « Modifier les groupes ».": ["No group yet for this class: tap “Edit groups”.", "Aún no hay grupos para esta prueba: toca «Editar los grupos».", "Ancora nessun gruppo per questa prova: tocca «Modifica i gruppi».", "この競技のグループはまだありません。「グループを編集」をタップしてください。", "Noch keine Gruppe für diese Prüfung: tippe auf „Gruppen bearbeiten“.", "لا توجد مجموعات لهذه الفئة بعد: اضغط «تعديل المجموعات».", "此项目还没有分组：点击“编辑分组”。", "Nog geen groep voor deze rubriek: tik op „Groepen bewerken”.", "Ainda sem grupo para esta prova: toque em «Editar os grupos».", "Inga grupper för klassen ännu: tryck på ”Ändra grupperna”.", "Для этого маршрута групп пока нет: нажми «Изменить группы».", "Brak grup dla tego konkursu: dotknij „Edytuj grupy”.", "이 종목에는 아직 그룹이 없어요. ‘그룹 수정’을 눌러 주세요."],
  "Les groupes de détente apparaîtront quand ta coach les aura publiés.": ["Warm-up groups will appear once your coach publishes them.", "Los grupos de calentamiento aparecerán cuando tu entrenadora los publique.", "I gruppi di riscaldamento appariranno quando la tua coach li pubblicherà.", "ウォームアップのグループはコーチが公開すると表示されます。", "Die Abreitegruppen erscheinen, sobald deine Trainerin sie veröffentlicht.", "ستظهر مجموعات الإحماء عندما تنشرها مدربتك.", "教练发布后，热身分组就会显示在这里。", "De losrijgroepen verschijnen zodra je coach ze publiceert.", "Os grupos de aquecimento aparecerão quando sua treinadora publicá-los.", "Framridningsgrupperna visas när din tränare har publicerat dem.", "Группы разминки появятся, когда тренер их опубликует.", "Grupy rozprężenia pojawią się, gdy trenerka je opublikuje.", "코치가 공개하면 워밍업 그룹이 표시돼요."],
  "Règles du paddock": ["Warm-up arena rules", "Normas del paddock", "Regole del campo prova", "準備馬場のルール", "Regeln am Abreiteplatz", "قواعد ميدان الإحماء", "热身场规则", "Regels losrijring", "Regras do paddock", "Regler vid framridningen", "Правила разминки", "Zasady rozprężalni", "준비 마장 규칙"],
  "Ne rentre jamais seul au paddock : attends l’accord de ta coach.": ["Never enter the warm-up arena alone: wait for your coach's go-ahead.", "Nunca entres solo al paddock: espera el permiso de tu entrenadora.", "Non entrare mai da solo nel campo prova: aspetta il via della tua coach.", "一人で準備馬場に入らないこと。コーチの許可を待ちましょう。", "Geh nie allein auf den Abreiteplatz: warte auf das Okay deiner Trainerin.", "لا تدخل ميدان الإحماء وحدك أبدًا: انتظر موافقة مدربتك.", "切勿独自进入热身场：等待教练同意。", "Ga nooit alleen de losrijring op: wacht op het akkoord van je coach.", "Nunca entre sozinho no paddock: espere o sinal da sua treinadora.", "Gå aldrig in på framridningen ensam: vänta på din tränares klartecken.", "Никогда не заходи на разминку один: дождись разрешения тренера.", "Nigdy nie wchodź sam na rozprężalnię: poczekaj na zgodę trenerki.", "혼자 준비 마장에 들어가지 마세요. 코치의 허락을 기다려요."],
  "Dès ton arrivée, signale à ta coach que tu es sur le paddock.": ["As soon as you arrive, tell your coach you're in the warm-up arena.", "En cuanto llegues, avisa a tu entrenadora de que estás en el paddock.", "Appena arrivi, avvisa la tua coach che sei al campo prova.", "到着したら、準備馬場にいることをすぐコーチに伝えましょう。", "Sag deiner Trainerin gleich bei der Ankunft, dass du am Abreiteplatz bist.", "فور وصولك، أخبر مدربتك أنك في ميدان الإحماء.", "一到场就告诉教练你已在热身场。", "Laat je coach meteen weten dat je op de losrijring bent.", "Assim que chegar, avise sua treinadora que está no paddock.", "Säg till din tränare så fort du är på framridningen.", "Как только придёшь, сообщи тренеру, что ты на разминке.", "Zaraz po przyjściu daj znać trenerce, że jesteś na rozprężalni.", "도착하면 바로 코치에게 준비 마장에 왔다고 알려요."],
  "Ne quitte jamais le paddock sans l’accord de ta coach.": ["Never leave the warm-up arena without your coach's go-ahead.", "Nunca salgas del paddock sin el permiso de tu entrenadora.", "Non lasciare mai il campo prova senza il via della tua coach.", "コーチの許可なしに準備馬場を離れないこと。", "Verlass den Abreiteplatz nie ohne das Okay deiner Trainerin.", "لا تغادر ميدان الإحماء أبدًا دون موافقة مدربتك.", "未经教练同意切勿离开热身场。", "Verlaat de losrijring nooit zonder akkoord van je coach.", "Nunca saia do paddock sem o sinal da sua treinadora.", "Lämna aldrig framridningen utan din tränares klartecken.", "Никогда не уходи с разминки без разрешения тренера.", "Nigdy nie opuszczaj rozprężalni bez zgody trenerki.", "코치의 허락 없이 준비 마장을 떠나지 마세요."],
  "Proposer des groupes": ["Suggest groups", "Proponer grupos", "Proponi gruppi", "グループを提案", "Gruppen vorschlagen", "اقتراح مجموعات", "建议分组", "Groepen voorstellen", "Sugerir grupos", "Föreslå grupper", "Предложить группы", "Zaproponuj grupy", "그룹 제안"],
  "+ Nouveau groupe": ["+ New group", "+ Nuevo grupo", "+ Nuovo gruppo", "+ 新しいグループ", "+ Neue Gruppe", "+ مجموعة جديدة", "+ 新分组", "+ Nieuwe groep", "+ Novo grupo", "+ Ny grupp", "+ Новая группа", "+ Nowa grupa", "+ 새 그룹"],
  "Nom du groupe": ["Group name", "Nombre del grupo", "Nome del gruppo", "グループ名", "Gruppenname", "اسم المجموعة", "分组名称", "Groepsnaam", "Nome do grupo", "Gruppnamn", "Название группы", "Nazwa grupy", "그룹 이름"],
  "Heure de rendez-vous au paddock": ["Warm-up arena meeting time", "Hora de cita en el paddock", "Orario di ritrovo al campo prova", "準備馬場の集合時刻", "Treffzeit am Abreiteplatz", "موعد ميدان الإحماء", "热身场集合时间", "Verzameltijd losrijring", "Horário de encontro no paddock", "Samlingstid vid framridningen", "Время сбора на разминке", "Godzina zbiórki na rozprężalni", "준비 마장 집합 시간"],
  "Supprimer le groupe": ["Delete group", "Eliminar el grupo", "Elimina il gruppo", "グループを削除", "Gruppe löschen", "حذف المجموعة", "删除分组", "Groep verwijderen", "Excluir o grupo", "Ta bort gruppen", "Удалить группу", "Usuń grupę", "그룹 삭제"],
  "Couples de l’épreuve": ["Pairs in this class", "Binomios de la prueba", "Binomi della prova", "この競技の人馬", "Paare der Prüfung", "ثنائيات الفئة", "本项目的人马组合", "Combinaties van de rubriek", "Conjuntos da prova", "Ekipage i klassen", "Пары маршрута", "Pary konkursu", "이 종목의 인마"],
  "Publier aux cavaliers": ["Publish to riders", "Publicar a los jinetes", "Pubblica ai cavalieri", "騎手に公開", "Für die Reiter veröffentlichen", "النشر للفرسان", "发布给骑手", "Publiceren voor de ruiters", "Publicar para os cavaleiros", "Publicera för ryttarna", "Опубликовать для всадников", "Opublikuj dla jeźdźców", "라이더에게 공개"],
  "Enregistrer": ["Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"],
  "Groupe ": ["Group ", "Grupo ", "Gruppo ", "グループ ", "Gruppe ", "المجموعة ", "分组 ", "Groep ", "Grupo ", "Grupp ", "Группа ", "Grupa ", "그룹 "],
  "brouillon": ["draft", "borrador", "bozza", "下書き", "Entwurf", "مسودة", "草稿", "concept", "rascunho", "utkast", "черновик", "szkic", "초안"],
  "Aucun couple pour l’instant.": ["No pairs yet.", "Aún no hay binomios.", "Ancora nessun binomio.", "まだ人馬がいません。", "Noch keine Paare.", "لا ثنائيات حتى الآن.", "暂无人马组合。", "Nog geen combinaties.", "Ainda sem conjuntos.", "Inga ekipage ännu.", "Пока нет пар.", "Brak par.", "아직 인마가 없어요."],
  "Aucun couple dans cette épreuve.": ["No pairs in this class.", "No hay binomios en esta prueba.", "Nessun binomio in questa prova.", "この競技に人馬はいません。", "Keine Paare in dieser Prüfung.", "لا ثنائيات في هذه الفئة.", "本项目没有人马组合。", "Geen combinaties in deze rubriek.", "Nenhum conjunto nesta prova.", "Inga ekipage i klassen.", "В этом маршруте нет пар.", "Brak par w tym konkursie.", "이 종목에 인마가 없어요."],
  " est aussi dans ": [" is also in ", " también está en ", " è anche in ", " は次にも入っています：", " ist auch in ", " موجود أيضًا في ", " 也在 ", " zit ook in ", " também está em ", " är också i ", " также в ", " jest też w ", " 은(는) 다음에도 있어요: "],
  "un autre groupe": ["another group", "otro grupo", "un altro gruppo", "別のグループ", "einer anderen Gruppe", "مجموعة أخرى", "另一个分组", "een andere groep", "outro grupo", "en annan grupp", "другой группе", "innej grupie", "다른 그룹"],
  " à ": [" at ", " a las ", " alle ", " ", " um ", " الساعة ", " ", " om ", " às ", " kl. ", " в ", " o ", " "],
  "Proposition prête : vérifie-la, modifie-la si besoin, puis publie. Rien n’est envoyé avant.": ["Suggestion ready: check it, edit it if needed, then publish. Nothing is sent before that.", "Propuesta lista: revísala, modifícala si hace falta y publícala. No se envía nada antes.", "Proposta pronta: controllala, modificala se serve, poi pubblica. Prima non viene inviato nulla.", "提案ができました。確認し、必要なら修正してから公開してください。それまで何も送信されません。", "Vorschlag fertig: prüfe ihn, ändere ihn bei Bedarf und veröffentliche ihn dann. Vorher wird nichts verschickt.", "الاقتراح جاهز: راجعه وعدّله إن لزم ثم انشره. لا يُرسل شيء قبل ذلك.", "建议已生成：请检查、按需修改后再发布。发布前不会发送任何内容。", "Voorstel klaar: controleer het, pas het zo nodig aan en publiceer dan. Eerder wordt er niets verstuurd.", "Sugestão pronta: confira, ajuste se precisar e depois publique. Nada é enviado antes.", "Förslaget är klart: kontrollera, ändra vid behov och publicera sedan. Inget skickas innan dess.", "Предложение готово: проверь, при необходимости измени и опубликуй. До этого ничего не отправляется.", "Propozycja gotowa: sprawdź ją, w razie potrzeby zmień i opublikuj. Wcześniej nic nie zostanie wysłane.", "제안이 준비됐어요. 확인하고 필요하면 수정한 뒤 공개하세요. 그 전에는 아무것도 보내지지 않아요."],
  "✓ Groupes publiés : les cavaliers concernés sont prévenus, puis rappelés 20 minutes avant leur rendez-vous.": ["✓ Groups published: the riders concerned are notified, then reminded 20 minutes before their meeting time.", "✓ Grupos publicados: se avisa a los jinetes y se les recuerda 20 minutos antes de su cita.", "✓ Gruppi pubblicati: i cavalieri interessati vengono avvisati e poi ricordati 20 minuti prima.", "✓ グループを公開しました。該当する騎手に通知し、集合20分前にもお知らせします。", "✓ Gruppen veröffentlicht: Die betroffenen Reiter werden benachrichtigt und 20 Minuten vorher erinnert.", "✓ نُشرت المجموعات: يُبلَّغ الفرسان المعنيون ثم يُذكَّرون قبل موعدهم بعشرين دقيقة.", "✓ 分组已发布：相关骑手会收到通知，并在集合前 20 分钟收到提醒。", "✓ Groepen gepubliceerd: de betrokken ruiters krijgen een melding en 20 minuten vooraf een herinnering.", "✓ Grupos publicados: os cavaleiros são avisados e lembrados 20 minutos antes do encontro.", "✓ Grupperna är publicerade: ryttarna får ett meddelande och en påminnelse 20 minuter innan.", "✓ Группы опубликованы: всадники получат уведомление и напоминание за 20 минут до сбора.", "✓ Grupy opublikowane: jeźdźcy dostaną powiadomienie i przypomnienie 20 minut przed zbiórką.", "✓ 그룹을 공개했어요. 해당 라이더에게 알리고 집합 20분 전에 다시 알려 드려요."],
  "✓ Groupes enregistrés (pas encore publiés).": ["✓ Groups saved (not published yet).", "✓ Grupos guardados (aún sin publicar).", "✓ Gruppi salvati (non ancora pubblicati).", "✓ グループを保存しました（未公開）。", "✓ Gruppen gespeichert (noch nicht veröffentlicht).", "✓ حُفظت المجموعات (لم تُنشر بعد).", "✓ 分组已保存（尚未发布）。", "✓ Groepen opgeslagen (nog niet gepubliceerd).", "✓ Grupos salvos (ainda não publicados).", "✓ Grupperna är sparade (inte publicerade ännu).", "✓ Группы сохранены (ещё не опубликованы).", "✓ Grupy zapisane (jeszcze nieopublikowane).", "✓ 그룹을 저장했어요(아직 비공개)."],
  "Enregistrement impossible : ": ["Couldn't save: ", "No se pudo guardar: ", "Impossibile salvare: ", "保存できません：", "Speichern nicht möglich: ", "تعذّر الحفظ: ", "无法保存：", "Opslaan mislukt: ", "Não foi possível salvar: ", "Kunde inte spara: ", "Не удалось сохранить: ", "Nie można zapisać: ", "저장할 수 없어요: "],
  /* 09/11 12h — fiche concours : outils des cartes, Mes engagements, Historique */
  "Lire l’ordre de passage": ["Read the start list", "Leer el orden de salida", "Leggi l'ordine di partenza", "出場順を読み込む", "Startliste einlesen", "قراءة ترتيب الانطلاق", "读取出场顺序", "Startlijst inlezen", "Ler a ordem de entrada", "Läs in startlistan", "Считать порядок выступлений", "Wczytaj kolejność startów", "출전 순서 읽기"],
  "Photo, capture ou PDF : les heures et les pistes se remplissent toutes seules.": ["Photo, screenshot or PDF: times and arenas fill in automatically.", "Foto, captura o PDF: las horas y las pistas se rellenan solas.", "Foto, screenshot o PDF: orari e campi si compilano da soli.", "写真・スクリーンショット・PDF：時刻と馬場が自動で入力されます。", "Foto, Screenshot oder PDF: Zeiten und Plätze werden automatisch ausgefüllt.", "صورة أو لقطة شاشة أو PDF: تُملأ الأوقات والميادين تلقائيًا.", "照片、截图或 PDF：时间和场地会自动填好。", "Foto, screenshot of pdf: tijden en ringen worden vanzelf ingevuld.", "Foto, captura ou PDF: horários e pistas são preenchidos automaticamente.", "Foto, skärmbild eller PDF: tider och banor fylls i automatiskt.", "Фото, скриншот или PDF: время и манежи заполнятся сами.", "Zdjęcie, zrzut ekranu lub PDF: godziny i czworoboki uzupełnią się same.", "사진, 캡처 또는 PDF: 시간과 경기장이 자동으로 채워져요."],
  "Ajouter le lien des résultats en direct": ["Add the live results link", "Añadir el enlace de resultados en directo", "Aggiungi il link dei risultati in diretta", "ライブ結果のリンクを追加", "Link zu den Live-Ergebnissen hinzufügen", "إضافة رابط النتائج المباشرة", "添加实时成绩链接", "Link naar live-uitslagen toevoegen", "Adicionar o link dos resultados ao vivo", "Lägg till länk till liveresultat", "Добавить ссылку на онлайн-результаты", "Dodaj link do wyników na żywo", "실시간 결과 링크 추가"],
  "Ajouter une vidéo": ["Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "동영상 추가"],
  "Mes engagements": ["My entries", "Mis inscripciones", "Le mie iscrizioni", "私のエントリー", "Meine Nennungen", "مشاركاتي", "我的报名", "Mijn inschrijvingen", "Minhas inscrições", "Mina anmälningar", "Мои заявки", "Moje zgłoszenia", "내 출전 신청"],
  "Mes épreuves sur ce concours": ["My classes at this show", "Mis pruebas en este concurso", "Le mie prove in questo concorso", "この大会での私の競技", "Meine Prüfungen auf diesem Turnier", "فئاتي في هذه المسابقة", "我在本场比赛的项目", "Mijn rubrieken op deze wedstrijd", "Minhas provas neste concurso", "Mina klasser på tävlingen", "Мои маршруты на этих соревнованиях", "Moje konkursy na tych zawodach", "이 대회의 내 종목"],
  "Tu n’es engagé sur aucune épreuve de ce concours.": ["You're not entered in any class at this show.", "No estás inscrito en ninguna prueba de este concurso.", "Non sei iscritto a nessuna prova di questo concorso.", "この大会ではどの競技にもエントリーしていません。", "Du bist auf diesem Turnier in keiner Prüfung genannt.", "لست مسجّلًا في أي فئة في هذه المسابقة.", "你没有报名本场比赛的任何项目。", "Je bent voor geen enkele rubriek op deze wedstrijd ingeschreven.", "Você não está inscrito em nenhuma prova deste concurso.", "Du är inte anmäld i någon klass på tävlingen.", "Ты не заявлен ни на один маршрут этих соревнований.", "Nie jesteś zgłoszony do żadnego konkursu na tych zawodach.", "이 대회에 신청한 종목이 없어요."],
  "Historique": ["History", "Historial", "Storico", "履歴", "Verlauf", "السجل", "历史", "Geschiedenis", "Histórico", "Historik", "История", "Historia", "기록"],
  "Tes derniers résultats": ["Your latest results", "Tus últimos resultados", "I tuoi ultimi risultati", "最近の成績", "Deine letzten Ergebnisse", "آخر نتائجك", "你的最近成绩", "Je laatste resultaten", "Seus últimos resultados", "Dina senaste resultat", "Твои последние результаты", "Twoje ostatnie wyniki", "최근 성적"],
  "Pas encore de résultat avec ce cheval.": ["No results with this horse yet.", "Aún no hay resultados con este caballo.", "Ancora nessun risultato con questo cavallo.", "この馬との成績はまだありません。", "Noch keine Ergebnisse mit diesem Pferd.", "لا توجد نتائج مع هذا الحصان بعد.", "与这匹马还没有成绩。", "Nog geen resultaten met dit paard.", "Ainda sem resultados com este cavalo.", "Inga resultat med den här hästen ännu.", "С этой лошадью результатов пока нет.", "Brak jeszcze wyników z tym koniem.", "이 말과의 성적이 아직 없어요."],
  "Cheval à préciser": ["Horse to be confirmed", "Caballo por indicar", "Cavallo da indicare", "馬は未定", "Pferd noch offen", "الحصان غير محدّد بعد", "马匹待定", "Paard nog niet bekend", "Cavalo a definir", "Häst ej angiven", "Лошадь не указана", "Koń do ustalenia", "말 미정"],
  "Tour ": ["Round ", "Manga ", "Manche ", "ラウンド ", "Umlauf ", "الجولة ", "轮次 ", "Ronde ", "Volta ", "Omgång ", "Тур ", "Runda ", "라운드 "],
  "Passage : ": ["Start time: ", "Salida: ", "Partenza: ", "出場：", "Start: ", "الانطلاق: ", "出场：", "Start: ", "Entrada: ", "Start: ", "Старт: ", "Start: ", "출전: "],
  "Rien encore cette saison · saison précédente": ["Nothing yet this season · previous season", "Nada aún esta temporada · temporada anterior", "Ancora nulla in questa stagione · stagione precedente", "今シーズンはまだなし · 前シーズン", "Diese Saison noch nichts · vorige Saison", "لا شيء بعد هذا الموسم · الموسم السابق", "本赛季暂无 · 上赛季", "Dit seizoen nog niets · vorig seizoen", "Nada ainda nesta temporada · temporada anterior", "Inget ännu i år · förra säsongen", "В этом сезоне пока ничего · прошлый сезон", "W tym sezonie jeszcze nic · poprzedni sezon", "이번 시즌 기록 없음 · 지난 시즌"],
  "Voir toute la saison": ["See the whole season", "Ver toda la temporada", "Vedi tutta la stagione", "シーズン全体を見る", "Ganze Saison ansehen", "عرض الموسم كاملًا", "查看整个赛季", "Hele seizoen bekijken", "Ver a temporada inteira", "Se hela säsongen", "Весь сезон", "Zobacz cały sezon", "시즌 전체 보기"],
  "Réduire": ["Show less", "Mostrar menos", "Mostra meno", "閉じる", "Weniger anzeigen", "عرض أقل", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기"],
  "points gagnés ensemble cette saison": ["points won together this season", "puntos ganados juntos esta temporada", "punti vinti insieme in questa stagione", "今シーズン一緒に獲得したポイント", "gemeinsam gewonnene Punkte diese Saison", "نقطة حصدتماها معًا هذا الموسم", "本赛季共同获得的积分", "samen behaalde punten dit seizoen", "pontos ganhos juntos nesta temporada", "poäng tagna tillsammans i år", "очков вместе в этом сезоне", "punktów zdobytych razem w tym sezonie", "이번 시즌 함께 얻은 점수"],
  "Pas de connexion.": ["No connection.", "Sin conexión.", "Nessuna connessione.", "接続できません。", "Keine Verbindung.", "لا يوجد اتصال.", "没有网络连接。", "Geen verbinding.", "Sem conexão.", "Ingen anslutning.", "Нет соединения.", "Brak połączenia.", "연결이 안 돼요."],
  "l’équipe": ["the team", "el equipo", "la squadra", "チーム", "das Team", "الفريق", "团队", "het team", "a equipe", "laget", "команда", "drużyna", "팀"],
  "demain": ["tomorrow", "mañana", "domani", "明日", "morgen", "غدا", "明天", "morgen", "amanhã", "i morgon", "завтра", "jutro", "내일"],
  "dans ": ["in ", "en ", "tra ", "あと", "in ", "بعد ", "还有", "over ", "em ", "om ", "через ", "za ", ""],
  "en cours": ["ongoing", "en curso", "in corso", "開催中", "läuft", "جار", "进行中", "bezig", "em andamento", "pågår", "идёт", "trwa", "진행 중"],
  "Résultats": ["Results","Resultados","Risultati","結果","Ergebnisse","النتائج","成绩","Uitslagen","Resultados","Resultat","Результаты","Wyniki","결과"],
  "partants": ["starters","participantes","partenti","頭出走","Starter","مشاركًا","匹出赛","starters","participantes","startande","участников","startujących","출전"],
  "Épreuve": ["Class","Prueba","Gara","競技","Prüfung","المنافسة","比赛","Proef","Prova","Klass","Соревнование","Konkurs","경기"],
  "Sans faute": ["Clear round","Sin faltas","Percorso netto","減点なし","Null-Fehler-Ritt","دون أخطاء","零失误","Foutloos","Sem faltas","Felfri","Без ошибок","Bez błędów","무결점"],
  "Les résultats de ce concours n’ont pas encore été ajoutés.": ["The results of this show haven’t been added yet.","Los resultados de este concurso aún no se han añadido.","I risultati di questo concorso non sono ancora stati aggiunti.","この大会の結果はまだ追加されていません。","Die Ergebnisse dieses Turniers wurden noch nicht hinzugefügt.","لم تُضَف نتائج هذه المسابقة بعد.","该比赛的成绩尚未添加。","De uitslagen van deze wedstrijd zijn nog niet toegevoegd.","Os resultados deste concurso ainda não foram adicionados.","Resultaten från tävlingen har inte lagts till än.","Результаты этого соревнования ещё не добавлены.","Wyniki tych zawodów nie zostały jeszcze dodane.","이 대회의 결과는 아직 추가되지 않았어요."],
  "Cavalier non renseigné": ["Rider not specified","Jinete sin indicar","Cavaliere non indicato","騎手未入力","Reiter nicht angegeben","فارس غير محدّد","骑手未填写","Ruiter niet ingevuld","Cavaleiro não indicado","Ryttare ej angiven","Всадник не указан","Jeździec nie podany","라이더 미입력"],
  "Retour": ["Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"],
  "Ma saison": ["My season", "Mi temporada", "La mia stagione", "わたしのシーズン", "Meine Saison", "موسمي", "我的赛季", "Mijn seizoen", "Minha temporada", "Min säsong", "Мой сезон", "Mój sezon", "나의 시즌"],
  "L’équipe": ["The team", "El equipo", "La squadra", "チーム", "Das Team", "الفريق", "团队", "Het team", "A equipe", "Laget", "Команда", "Drużyna", "팀"],
  ", saison ": [", season ", ", temporada ", ", stagione ", "・シーズン ", ", Saison ", "، موسم ", "，赛季 ", ", seizoen ", ", temporada ", ", säsong ", ", сезон ", ", sezon ", ", 시즌 "],
  " cavaliers": [" riders", " jinetes", " cavalieri", "人のライダー", " Reiter", " فرسان", " 位骑手", " ruiters", " cavaleiros", " ryttare", " всадники", " jeźdźcy", "명의 라이더"],
  " cavalier": [" rider", " jinete", " cavaliere", "人のライダー", " Reiter", " فارس", " 位骑手", " ruiter", " cavaleiro", " ryttare", " всадник", " jeździec", "명의 라이더"],
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
  "Eau et goûter": ["Water and a snack", "Agua y merienda", "Acqua e merenda", "水とおやつ", "Wasser und Snack", "ماء ووجبة خفيفة", "水和点心", "Water en een tussendoortje", "Água e lanche", "Vatten och mellanmål", "Вода и перекус", "Woda i przekąska", "물과 간식"],
  " cavaliers participent": [" riders taking part", " jinetes participan", " cavalieri partecipano", "人のライダーが参加", " Reiter nehmen teil", " فرسان يشاركون", " 位骑手参加", " ruiters doen mee", " cavaleiros participam", " ryttare deltar", " всадников участвуют", " jeźdźców bierze udział", "명의 라이더 참가"],
  " cavalier participe": [" rider taking part", " jinete participa", " cavaliere partecipa", "人のライダーが参加", " Reiter nimmt teil", " فارس يشارك", " 位骑手参加", " ruiter doet mee", " cavaleiro participa", " ryttare deltar", " всадник участвует", " jeździec bierze udział", "명의 라이더 참가"],
  "Il manque le nom d’un cavalier.": ["A rider's name is missing.", "Falta el nombre de un jinete.", "Manca il nome di un cavaliere.", "ライダーの名前が入っていません。", "Ein Reitername fehlt.", "اسم أحد الفرسان ناقص.", "缺少一位骑手的名字。", "De naam van een ruiter ontbreekt.", "Falta o nome de um cavaleiro.", "Ett ryttarnamn saknas.", "Не указано имя всадника.", "Brakuje imienia jeźdźca.", "라이더 이름이 빠졌어요."],
  "Cavaliers et chevaux": ["Riders and horses", "Jinetes y caballos", "Cavalieri e cavalli", "ライダーと馬", "Reiter und Pferde", "الفرسان والخيول", "骑手和马", "Ruiters en paarden", "Cavaleiros e cavalos", "Ryttare och hästar", "Всадники и лошади", "Jeźdźcy i konie", "라이더와 말"],
  " cavaliers · ": [" riders · ", " jinetes · ", " cavalieri · ", "人のライダー · ", " Reiter · ", " فرسان · ", " 位骑手 · ", " ruiters · ", " cavaleiros · ", " ryttare · ", " всадников · ", " jeźdźców · ", "명의 라이더 · "],
  " cavalier · ": [" rider · ", " jinete · ", " cavaliere · ", "人のライダー · ", " Reiter · ", " فارس · ", " 位骑手 · ", " ruiter · ", " cavaleiro · ", " ryttare · ", " всадник · ", " jeździec · ", "명의 라이더 · "],
  "Les cavaliers": ["The riders", "Los jinetes", "I cavalieri", "ライダー", "Die Reiter", "الفرسان", "骑手们", "De ruiters", "Os cavaleiros", "Ryttarna", "Всадники", "Jeźdźcy", "라이더"],
  " — engagé. Choisis une autre épreuve pour un tour de plus, ou un autre cavalier.": [" — entered. Pick another class for one more round, or another rider.", " — inscrito. Elige otra prueba para una vuelta más, u otro jinete.", " — iscritto. Scegli un'altra prova per un giro in più, o un altro cavaliere.", " — エントリー済み。もう1回走るなら別の競技を、または別のライダーを選んでね。", " — genannt. Wähle eine andere Prüfung für einen weiteren Ritt oder einen anderen Reiter.", " — تم التسجيل. اختر مسابقة أخرى لجولة إضافية، أو فارسا آخر.", " — 已报名。再选一个项目多跑一轮，或换一位骑手。", " — ingeschreven. Kies een andere proef voor nog een ronde, of een andere ruiter.", " — inscrito. Escolhe outra prova para mais uma volta, ou outro cavaleiro.", " — anmäld. Välj en annan klass för en runda till, eller en annan ryttare.", " — записан. Выбери другой маршрут для ещё одного выступления или другого всадника.", " — zgłoszony. Wybierz inny konkurs na kolejny przejazd albo innego jeźdźca.", " — 출전 신청 완료. 한 번 더 뛰려면 다른 경기를, 아니면 다른 라이더를 골라 줘."],
  "+ Un autre cavalier ›": ["+ Another rider ›", "+ Otro jinete ›", "+ Un altro cavaliere ›", "+ 別のライダー ›", "+ Ein weiterer Reiter ›", "+ فارس آخر ›", "+ 另一位骑手 ›", "+ Nog een ruiter ›", "+ Outro cavaleiro ›", "+ En ryttare till ›", "+ Ещё один всадник ›", "+ Kolejny jeździec ›", "+ 다른 라이더 ›"],
  "Cavaliers": ["Riders", "Jinetes", "Cavalieri", "ライダー", "Reiter", "الفرسان", "骑手", "Ruiters", "Cavaleiros", "Ryttare", "Всадники", "Jeźdźcy", "라이더"],
  "Chevaux": ["Horses", "Caballos", "Cavalli", "馬", "Pferde", "الخيول", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말"],
  "Aucun cavalier pour l’instant.": ["No riders yet.", "Aún no hay jinetes.", "Ancora nessun cavaliere.", "まだライダーはいません。", "Noch keine Reiter.", "لا يوجد فرسان بعد.", "暂时还没有骑手。", "Nog geen ruiters.", "Ainda não há cavaleiros.", "Inga ryttare än.", "Пока нет всадников.", "Na razie brak jeźdźców.", "아직 라이더가 없어요."],
  "Nouveau cavalier": ["New rider", "Nuevo jinete", "Nuovo cavaliere", "新しいライダー", "Neuer Reiter", "فارس جديد", "新骑手", "Nieuwe ruiter", "Novo cavaleiro", "Ny ryttare", "Новый всадник", "Nowy jeździec", "새 라이더"],
  "Cavaliers de compétition": ["Competition riders", "Jinetes de competición", "Cavalieri da gara", "競技ライダー", "Turnierreiter", "فرسان المسابقات", "比赛骑手", "Wedstrijdruiters", "Cavaleiros de competição", "Tävlingsryttare", "Спортивные всадники", "Jeźdźcy sportowi", "대회 라이더"],
  "Chercher un autre cavalier": ["Find another rider", "Buscar otro jinete", "Cerca un altro cavaliere", "別のライダーを探す", "Anderen Reiter suchen", "ابحث عن فارس آخر", "查找其他骑手", "Zoek een andere ruiter", "Procurar outro cavaleiro", "Sök en annan ryttare", "Найти другого всадника", "Szukaj innego jeźdźca", "다른 라이더 찾기"],
  "Les licences sont gardées pour la prochaine fois. Seuls toi et le cavalier concerné les voient. Chacun voit son engagement sur la fiche du concours.": ["Licences are kept for next time. Only you and the rider concerned can see them. Everyone sees their entry on the show page.", "Las licencias se guardan para la próxima vez. Solo tú y el jinete en cuestión las veis. Cada uno ve su inscripción en la ficha del concurso.", "Le patenti restano salvate per la prossima volta. Le vedete solo tu e il cavaliere interessato. Ognuno vede la sua iscrizione nella scheda del concorso.", "ライセンスは次回のために保存されます。見られるのはあなたと本人だけ。各自のエントリーは大会ページで確認できます。", "Die Lizenzen bleiben für das nächste Mal gespeichert. Nur du und der betreffende Reiter sehen sie. Jeder sieht seine Nennung auf der Turnierseite.", "تُحفظ الرخص للمرة القادمة. لا يراها إلا أنت والفارس المعني. يرى كل واحد تسجيله في صفحة المسابقة.", "执照会保存到下次使用。只有你和相关骑手能看到。每个人都能在比赛页面看到自己的报名。", "De licenties worden bewaard voor de volgende keer. Alleen jij en de betrokken ruiter zien ze. Iedereen ziet zijn inschrijving op de wedstrijdpagina.", "As licenças ficam guardadas para a próxima vez. Só tu e o cavaleiro em causa as veem. Cada um vê a sua inscrição na ficha do concurso.", "Licenserna sparas till nästa gång. Bara du och ryttaren det gäller ser dem. Alla ser sin anmälan på tävlingssidan.", "Лицензии сохраняются на следующий раз. Их видите только ты и сам всадник. Каждый видит свою заявку на странице соревнования.", "Licencje zostają zapisane na następny raz. Widzisz je tylko ty i dany jeździec. Każdy widzi swoje zgłoszenie na stronie zawodów.", "라이선스는 다음을 위해 저장돼요. 너와 해당 라이더만 볼 수 있어요. 각자 대회 페이지에서 자기 출전 신청을 볼 수 있어요."],
  "Touche une heure pour revoir ce moment. Commentaires visibles par le cavalier, sa coach et leur auteur.": ["Tap a time to see that moment again. Comments visible to the rider, their coach and the author.", "Toca una hora para volver a ver ese momento. Comentarios visibles para el jinete, su entrenadora y su autor.", "Tocca un orario per rivedere quel momento. Commenti visibili al cavaliere, alla sua coach e a chi li ha scritti.", "時刻をタップするとその場面に戻れます。コメントはライダー、コーチ、書いた人が見られます。", "Tippe auf eine Zeit, um den Moment noch einmal zu sehen. Kommentare sichtbar für den Reiter, seine Trainerin und den Verfasser.", "المس توقيتا لمشاهدة تلك اللحظة من جديد. التعليقات يراها الفارس ومدربته وكاتبها.", "点一个时间点即可重看那一刻。评论仅骑手、教练和评论作者可见。", "Tik op een tijd om dat moment terug te zien. Opmerkingen zichtbaar voor de ruiter, de coach en de schrijver.", "Toca numa hora para rever esse momento. Comentários visíveis para o cavaleiro, a treinadora e quem os escreveu.", "Tryck på en tid för att se det ögonblicket igen. Kommentarerna syns för ryttaren, tränaren och den som skrev dem.", "Нажми на время, чтобы пересмотреть этот момент. Комментарии видят всадник, его тренер и автор.", "Dotknij czasu, aby zobaczyć ten moment ponownie. Komentarze widzą jeździec, trenerka i ich autor.", "시간을 누르면 그 장면을 다시 볼 수 있어요. 댓글은 라이더, 코치, 작성자만 볼 수 있어요."],
  "✓ Enregistré. Les cavaliers voient leur nouvelle heure sur la fiche du concours.": ["✓ Saved. Riders see their new time on the show page.", "✓ Guardado. Los jinetes ven su nueva hora en la ficha del concurso.", "✓ Salvato. I cavalieri vedono il nuovo orario nella scheda del concorso.", "✓ 保存しました。ライダーは大会ページで新しい時刻を確認できます。", "✓ Gespeichert. Die Reiter sehen ihre neue Zeit auf der Turnierseite.", "✓ تم الحفظ. يرى الفرسان موعدهم الجديد في صفحة المسابقة.", "✓ 已保存。骑手会在比赛页面看到新的时间。", "✓ Opgeslagen. De ruiters zien hun nieuwe tijd op de wedstrijdpagina.", "✓ Guardado. Os cavaleiros veem a nova hora na ficha do concurso.", "✓ Sparat. Ryttarna ser sin nya tid på tävlingssidan.", "✓ Сохранено. Всадники видят новое время на странице соревнования.", "✓ Zapisano. Jeźdźcy widzą nową godzinę na stronie zawodów.", "✓ 저장했어요. 라이더들은 대회 페이지에서 새 시간을 볼 수 있어요."],
  " cavalier(s) sans alertes activées.": [" rider(s) without alerts turned on.", " jinete(s) sin avisos activados.", " cavaliere/i senza avvisi attivati.", "人のライダーが通知をオンにしていません。", " Reiter ohne aktivierte Benachrichtigungen.", " فارس/فرسان بلا تنبيهات مفعّلة.", " 位骑手未开启提醒。", " ruiter(s) zonder meldingen aan.", " cavaleiro(s) sem alertas ativados.", " ryttare utan aviseringar påslagna.", " всадник(ов) без включённых уведомлений.", " jeźdźca/ów bez włączonych powiadomień.", "명의 라이더가 알림을 켜지 않았어요."],
  "deux cavaliers passent en même temps sur deux pistes différentes. Regarde les lignes marquées.": ["two riders go at the same time in two different arenas. Check the marked lines.", "dos jinetes salen a la vez en dos pistas distintas. Mira las líneas marcadas.", "due cavalieri passano contemporaneamente su due campi diversi. Guarda le righe segnate.", "2人のライダーが別々の馬場で同時に出番です。印のついた行を見てね。", "zwei Reiter starten gleichzeitig auf zwei verschiedenen Plätzen. Sieh dir die markierten Zeilen an.", "فارسان يمرّان في الوقت نفسه على ميدانين مختلفين. انظر إلى الأسطر المعلَّمة.", "两位骑手在两个不同场地同时出场。看看标记的行。", "twee ruiters rijden tegelijk op twee verschillende pistes. Bekijk de gemarkeerde regels.", "dois cavaleiros passam ao mesmo tempo em duas pistas diferentes. Vê as linhas marcadas.", "två ryttare startar samtidigt på två olika banor. Titta på de markerade raderna.", "два всадника выступают одновременно на двух разных площадках. Посмотри на отмеченные строки.", "dwóch jeźdźców startuje jednocześnie na dwóch różnych placach. Zobacz zaznaczone wiersze.", "두 라이더가 서로 다른 경기장에서 동시에 출전해요. 표시된 줄을 확인해 줘."],
  "Une photo, une capture ou le PDF du programme ou de la liste de départ (numéros et heures d’épreuve, ordre de passage) : Hype prépare les heures et les pistes de tes cavaliers.": ["A photo, a screenshot or the PDF of the schedule or start list (class numbers and times, running order): Hype prepares your riders' times and arenas.", "Una foto, una captura o el PDF del programa o de la lista de salida (números y horas de prueba, orden de salida): Hype prepara las horas y las pistas de tus jinetes.", "Una foto, uno screenshot o il PDF del programma o della lista di partenza (numeri e orari delle prove, ordine di partenza): Hype prepara gli orari e i campi dei tuoi cavalieri.", "プログラムやスタートリスト（競技番号と時刻、出走順）の写真、スクリーンショット、PDF：Hype があなたのライダーの時刻と馬場を準備します。", "Ein Foto, ein Screenshot oder das PDF der Zeiteinteilung oder Starterliste (Prüfungsnummern und -zeiten, Startfolge): Hype bereitet die Zeiten und Plätze deiner Reiter vor.", "صورة أو لقطة شاشة أو ملف PDF للبرنامج أو لقائمة الانطلاق (أرقام المسابقات وأوقاتها، ترتيب المرور): يجهّز Hype أوقات فرسانك وميادينهم.", "节目单或出场名单（项目编号和时间、出场顺序）的照片、截图或 PDF：Hype 会为你的骑手整理时间和场地。", "Een foto, screenshot of de pdf van het programma of de startlijst (proefnummers en -tijden, startvolgorde): Hype zet de tijden en pistes van je ruiters klaar.", "Uma foto, uma captura ou o PDF do programa ou da lista de partida (números e horas das provas, ordem de passagem): o Hype prepara as horas e as pistas dos teus cavaleiros.", "Ett foto, en skärmbild eller pdf:en med programmet eller startlistan (klassnummer och tider, startordning): Hype förbereder tider och banor för dina ryttare.", "Фото, скриншот или PDF программы или стартового листа (номера и время маршрутов, порядок выступления): Hype подготовит время и площадки твоих всадников.", "Zdjęcie, zrzut ekranu lub PDF programu albo listy startowej (numery i godziny konkursów, kolejność startu): Hype przygotuje godziny i place twoich jeźdźców.", "프로그램이나 출전 명단(경기 번호와 시간, 출전 순서)의 사진, 캡처 또는 PDF: Hype가 네 라이더들의 시간과 경기장을 준비해 줘요."],
  "Aucun de tes cavaliers trouvé dans les listes de départ pour l’instant (les listes sont souvent publiées la veille).": ["None of your riders found in the start lists yet (lists are often published the day before).", "Ninguno de tus jinetes aparece aún en las listas de salida (suelen publicarse la víspera).", "Nessuno dei tuoi cavalieri trovato per ora nelle liste di partenza (spesso vengono pubblicate il giorno prima).", "スタートリストにまだあなたのライダーは見つかりません（リストは前日に公開されることが多いです）。", "Noch keiner deiner Reiter in den Starterlisten gefunden (die Listen erscheinen oft am Vortag).", "لم يُعثر بعد على أي من فرسانك في قوائم الانطلاق (غالبا ما تُنشر القوائم في اليوم السابق).", "暂时还没在出场名单里找到你的骑手（名单通常在前一天公布）。", "Nog geen van je ruiters gevonden in de startlijsten (die verschijnen vaak de dag ervoor).", "Ainda nenhum dos teus cavaleiros nas listas de partida (as listas costumam sair na véspera).", "Ingen av dina ryttare hittades i startlistorna än (listorna publiceras ofta dagen innan).", "Пока никого из твоих всадников нет в стартовых листах (их часто публикуют накануне).", "Na razie żadnego z twoich jeźdźców nie ma na listach startowych (listy są często publikowane dzień wcześniej).", "아직 출전 명단에서 네 라이더를 찾지 못했어요 (명단은 보통 전날 올라와요)."],
  "Colle ici la page des résultats en direct : les cavaliers auront un bouton « Résultats en direct » sur la fiche du concours.": ["Paste the live results page here: riders will get a “Live results” button on the show page.", "Pega aquí la página de resultados en directo: los jinetes tendrán un botón «Resultados en directo» en la ficha del concurso.", "Incolla qui la pagina dei risultati in diretta: i cavalieri avranno un pulsante «Risultati in diretta» nella scheda del concorso.", "ライブ結果のページをここに貼ってね。ライダーの大会ページに「ライブ結果」ボタンが出ます。", "Füge hier die Seite mit den Live-Ergebnissen ein: Die Reiter bekommen einen Knopf „Live-Ergebnisse“ auf der Turnierseite.", "الصق هنا صفحة النتائج المباشرة: سيظهر للفرسان زر «النتائج المباشرة» في صفحة المسابقة.", "把实时成绩页面粘贴到这里：骑手会在比赛页面看到“实时成绩”按钮。", "Plak hier de pagina met live-uitslagen: de ruiters krijgen een knop „Live-uitslagen” op de wedstrijdpagina.", "Cola aqui a página dos resultados em direto: os cavaleiros terão um botão «Resultados em direto» na ficha do concurso.", "Klistra in sidan med liveresultat här: ryttarna får en knapp ”Liveresultat” på tävlingssidan.", "Вставь сюда страницу результатов онлайн: у всадников появится кнопка «Результаты онлайн» на странице соревнования.", "Wklej tu stronę wyników na żywo: jeźdźcy dostaną przycisk „Wyniki na żywo” na stronie zawodów.", "실시간 결과 페이지를 여기에 붙여 넣어 줘. 라이더들의 대회 페이지에 「실시간 결과」 버튼이 생겨요."],
  "Prévenir les cavaliers sur leur téléphone": ["Notify the riders on their phones", "Avisar a los jinetes en su móvil", "Avvisa i cavalieri sul telefono", "ライダーのスマホに知らせる", "Die Reiter auf dem Handy benachrichtigen", "أبلغ الفرسان على هواتفهم", "通知骑手的手机", "De ruiters op hun telefoon verwittigen", "Avisar os cavaleiros no telemóvel", "Meddela ryttarna i mobilen", "Предупредить всадников на телефоне", "Powiadom jeźdźców na telefonie", "라이더들 휴대폰으로 알리기"]   /* 08/11 : textes « cavalier » traduits (Blandine : « Oui vas y ») */,
  "Réservé à l’équipe ": ["Reserved for the team ", "Reservado al equipo ", "Riservato alla squadra ", "チーム限定：", "Nur für das Team ", "مخصّص للفريق ", "仅限团队：", "Alleen voor het team ", "Reservado à equipa ", "Endast för laget ", "Только для команды ", "Tylko dla drużyny ", "팀 전용: "],
  "Concours introuvable.": ["Show not found.", "Concurso no encontrado.", "Concorso non trovato.", "大会が見つかりません。", "Turnier nicht gefunden.", "المسابقة غير موجودة.", "找不到该比赛。", "Wedstrijd niet gevonden.", "Concurso não encontrado.", "Tävlingen hittades inte.", "Соревнование не найдено.", "Nie znaleziono zawodów.", "대회를 찾을 수 없어요."],
  "ce concours n’existe plus": ["this show no longer exists", "este concurso ya no existe", "questo concorso non esiste più", "この大会はもうありません", "dieses Turnier gibt es nicht mehr", "هذه المسابقة لم تعد موجودة", "该比赛已不存在", "deze wedstrijd bestaat niet meer", "este concurso já não existe", "tävlingen finns inte längre", "этого соревнования больше нет", "te zawody już nie istnieją", "이 대회는 더 이상 없어요"],
  "Connecte-toi pour t’inscrire.": ["Log in to sign up.", "Inicia sesión para inscribirte.", "Accedi per iscriverti.", "参加するにはログインしてね。", "Melde dich an, um teilzunehmen.", "سجّل الدخول للتسجيل.", "登录后才能报名。", "Log in om je in te schrijven.", "Inicia sessão para te inscreveres.", "Logga in för att anmäla dig.", "Войди, чтобы записаться.", "Zaloguj się, aby się zapisać.", "참가하려면 로그인해 줘."],
  "La base a refusé : ": ["The database refused: ", "La base de datos lo rechazó: ", "Il database ha rifiutato: ", "データベースが拒否しました：", "Die Datenbank hat abgelehnt: ", "رفضت قاعدة البيانات: ", "数据库拒绝了：", "De database weigerde: ", "A base de dados recusou: ", "Databasen nekade: ", "База данных отказала: ", "Baza danych odmówiła: ", "데이터베이스가 거부했어요: "],
  "Rien n’a été enregistré.": ["Nothing was saved.", "No se ha guardado nada.", "Non è stato salvato nulla.", "何も保存されませんでした。", "Es wurde nichts gespeichert.", "لم يُحفظ أي شيء.", "没有保存任何内容。", "Er is niets opgeslagen.", "Nada foi guardado.", "Inget sparades.", "Ничего не сохранено.", "Nic nie zostało zapisane.", "아무것도 저장되지 않았어요."],
  "Ce téléphone ne sait pas recevoir les notifications de Hype.": ["This phone can’t receive Hype notifications.", "Este móvil no puede recibir las notificaciones de Hype.", "Questo telefono non può ricevere le notifiche di Hype.", "このスマホは Hype の通知を受け取れません。", "Dieses Handy kann keine Hype-Mitteilungen empfangen.", "هذا الهاتف لا يستطيع استقبال إشعارات Hype.", "这部手机无法接收 Hype 的通知。", "Deze telefoon kan geen Hype-meldingen ontvangen.", "Este telemóvel não consegue receber as notificações do Hype.", "Den här telefonen kan inte ta emot Hype-aviseringar.", "Этот телефон не может получать уведомления Hype.", "Ten telefon nie może odbierać powiadomień Hype.", "이 휴대폰은 Hype 알림을 받을 수 없어요."],
  "Sur iPhone, ajoute d’abord Hype à ton écran d’accueil (bouton Partager → Sur l’écran d’accueil), puis reviens ici.": ["On iPhone, first add Hype to your Home Screen (Share button → Add to Home Screen), then come back here.", "En iPhone, añade primero Hype a tu pantalla de inicio (botón Compartir → Añadir a pantalla de inicio) y vuelve aquí.", "Su iPhone, aggiungi prima Hype alla schermata Home (tasto Condividi → Aggiungi alla schermata Home), poi torna qui.", "iPhone では、まず Hype をホーム画面に追加してね（共有ボタン → ホーム画面に追加）。それからここに戻ってきて。", "Auf dem iPhone füge Hype zuerst zum Home-Bildschirm hinzu (Teilen → Zum Home-Bildschirm), dann komm hierher zurück.", "على iPhone، أضف Hype أولًا إلى شاشتك الرئيسية (زر المشاركة ← إضافة إلى الشاشة الرئيسية)، ثم عد إلى هنا.", "在 iPhone 上，请先把 Hype 添加到主屏幕（分享按钮 → 添加到主屏幕），然后回到这里。", "Voeg op een iPhone Hype eerst toe aan je beginscherm (knop Deel → Zet op beginscherm) en kom dan hier terug.", "No iPhone, adiciona primeiro o Hype ao ecrã principal (botão Partilhar → Adicionar ao ecrã principal) e volta aqui.", "På iPhone lägger du först till Hype på hemskärmen (Dela → Lägg till på hemskärmen) och kommer sedan tillbaka hit.", "На iPhone сначала добавь Hype на экран «Домой» (кнопка «Поделиться» → «На экран Домой»), потом вернись сюда.", "Na iPhonie najpierw dodaj Hype do ekranu początkowego (Udostępnij → Do ekranu początkowego), potem wróć tutaj.", "iPhone에서는 먼저 Hype를 홈 화면에 추가해 줘(공유 버튼 → 홈 화면에 추가). 그다음 여기로 돌아와."],
  "Alertes coupées sur ce téléphone.": ["Alerts turned off on this phone.", "Alertas desactivadas en este móvil.", "Avvisi disattivati su questo telefono.", "このスマホの通知をオフにしました。", "Benachrichtigungen auf diesem Handy ausgeschaltet.", "تم إيقاف التنبيهات على هذا الهاتف.", "已关闭此手机上的提醒。", "Meldingen uitgezet op deze telefoon.", "Alertas desligados neste telemóvel.", "Aviseringar avstängda på den här telefonen.", "Оповещения на этом телефоне выключены.", "Powiadomienia wyłączone na tym telefonie.", "이 휴대폰의 알림을 껐어요."],
  "Les notifications ont été refusées. Tu peux les réautoriser dans Réglages → Notifications → Hype.": ["Notifications were refused. You can allow them again in Settings → Notifications → Hype.", "Las notificaciones se rechazaron. Puedes volver a permitirlas en Ajustes → Notificaciones → Hype.", "Le notifiche sono state rifiutate. Puoi riattivarle in Impostazioni → Notifiche → Hype.", "通知が拒否されました。設定 → 通知 → Hype で再び許可できます。", "Mitteilungen wurden abgelehnt. Du kannst sie unter Einstellungen → Mitteilungen → Hype wieder erlauben.", "تم رفض الإشعارات. يمكنك السماح بها مجددًا من الإعدادات ← الإشعارات ← Hype.", "通知已被拒绝。你可以在 设置 → 通知 → Hype 中重新允许。", "Meldingen zijn geweigerd. Je kunt ze weer toestaan via Instellingen → Meldingen → Hype.", "As notificações foram recusadas. Podes voltar a permiti-las em Definições → Notificações → Hype.", "Aviseringarna nekades. Du kan tillåta dem igen i Inställningar → Notiser → Hype.", "Уведомления отклонены. Их можно снова разрешить в Настройки → Уведомления → Hype.", "Powiadomienia zostały odrzucone. Możesz je ponownie włączyć w Ustawienia → Powiadomienia → Hype.", "알림이 거부됐어요. 설정 → 알림 → Hype에서 다시 허용할 수 있어요."],
  "Connecte-toi d’abord.": ["Log in first.", "Inicia sesión primero.", "Accedi prima.", "先にログインしてね。", "Melde dich zuerst an.", "سجّل الدخول أولًا.", "请先登录。", "Log eerst in.", "Inicia sessão primeiro.", "Logga in först.", "Сначала войди.", "Najpierw się zaloguj.", "먼저 로그인해 줘."],
  "C’est activé. Tu seras prévenue avant le départ et avant la reconnaissance.": ["It’s on. You’ll be alerted before departure and before the course walk.", "Activado. Te avisaremos antes de la salida y antes del reconocimiento.", "Attivato. Ti avviseremo prima della partenza e prima della ricognizione.", "オンにしました。出発前とコース下見の前にお知らせします。", "Aktiviert. Du wirst vor der Abfahrt und vor der Parcoursbesichtigung benachrichtigt.", "تم التفعيل. سنُنبّهك قبل الانطلاق وقبل معاينة المسار.", "已开启。出发前和看场地前会提醒你。", "Ingeschakeld. Je krijgt een melding voor vertrek en voor de verkenning.", "Ativado. Vais ser avisado antes da partida e antes do reconhecimento.", "Påslaget. Du får en avisering före avfärd och före banvandringen.", "Включено. Ты получишь оповещение перед выездом и перед просмотром маршрута.", "Włączone. Dostaniesz powiadomienie przed wyjazdem i przed zapoznaniem z parkurem.", "켜졌어요. 출발 전과 코스 답사 전에 알려 줄게요."],
  "Plus": ["More", "Más", "Altro", "その他", "Mehr", "المزيد", "更多", "Meer", "Mais", "Mer", "Ещё", "Więcej", "더 보기"],
  "Engagements et feuille d’engagement": ["Entries and entry sheet", "Inscripciones y hoja de inscripción", "Iscrizioni e foglio di iscrizione", "エントリーとエントリーシート", "Nennungen und Nennungsliste", "التسجيلات وورقة التسجيل", "报名和报名表", "Inschrijvingen en inschrijvingsformulier", "Inscrições e ficha de inscrição", "Anmälningar och anmälningsblad", "Заявки и лист заявок", "Zgłoszenia i lista zgłoszeń", "참가 신청과 신청서"],
  "Jour J : passages": ["Show day: start times", "Día D: pasos", "Giorno della gara: passaggi", "当日：出場順", "Turniertag: Starts", "يوم المسابقة: مواعيد الدخول", "比赛日：出场", "Wedstrijddag: starttijden", "Dia D: passagens", "Tävlingsdagen: starttider", "День старта: выходы", "Dzień zawodów: starty", "대회 당일: 출전 순서"],
  "Le dossier": ["The file", "El expediente", "Il fascicolo", "書類一式", "Die Unterlagen", "الملف", "资料", "Het dossier", "O dossiê", "Pärmen", "Документы", "Dokumenty", "서류"],
  "Modifier le rendez-vous": ["Edit the event", "Modificar la cita", "Modifica l’appuntamento", "予定を編集", "Termin bearbeiten", "تعديل الموعد", "编辑活动", "Afspraak bewerken", "Editar o evento", "Redigera händelsen", "Изменить событие", "Edytuj wydarzenie", "일정 수정"],
  "Photos et commentaires": ["Photos and comments", "Fotos y comentarios", "Foto e commenti", "写真とコメント", "Fotos und Kommentare", "الصور والتعليقات", "照片和评论", "Foto’s en reacties", "Fotos e comentários", "Foton och kommentarer", "Фото и комментарии", "Zdjęcia i komentarze", "사진과 댓글"],
  "Résultats en direct": ["Live results", "Resultados en directo", "Risultati in diretta", "ライブ結果", "Live-Ergebnisse", "النتائج المباشرة", "实时成绩", "Live-uitslagen", "Resultados em direto", "Liveresultat", "Результаты онлайн", "Wyniki na żywo", "실시간 결과"],
  "Impossible d’ouvrir ce concours : ": ["Couldn’t open this show: ", "No se pudo abrir este concurso: ", "Impossibile aprire questo concorso: ", "この大会を開けませんでした：", "Dieses Turnier konnte nicht geöffnet werden: ", "تعذّر فتح هذه المسابقة: ", "无法打开该比赛：", "Kan deze wedstrijd niet openen: ", "Não foi possível abrir este concurso: ", "Kunde inte öppna tävlingen: ", "Не удалось открыть соревнование: ", "Nie udało się otworzyć zawodów: ", "이 대회를 열 수 없어요: "],
  "Rendez-vous": ["Meeting time", "Hora de encuentro", "Ritrovo", "集合", "Treffpunkt", "الموعد", "集合时间", "Verzamelen", "Encontro", "Samling", "Сбор", "Zbiórka", "집합"],
  "Embarquement": ["Loading", "Embarque", "Carico", "積み込み", "Verladen", "التحميل", "装车", "Inladen", "Embarque", "Lastning", "Погрузка", "Załadunek", "상차"],
  "Départ": ["Departure", "Salida", "Partenza", "出発", "Abfahrt", "الانطلاق", "出发", "Vertrek", "Partida", "Avfärd", "Выезд", "Wyjazd", "출발"],
  "Reconnaissance": ["Course walk", "Reconocimiento", "Ricognizione", "コース下見", "Parcoursbesichtigung", "معاينة المسار", "看场地", "Verkenning", "Reconhecimento", "Banvandring", "Просмотр маршрута", "Zapoznanie z parkurem", "코스 답사"],
  "Début de l’épreuve": ["Class starts", "Inicio de la prueba", "Inizio della gara", "競技開始", "Prüfungsbeginn", "بداية المنافسة", "比赛开始", "Start van de proef", "Início da prova", "Klassen börjar", "Начало соревнования", "Początek konkursu", "경기 시작"],
  "Épreuve à venir": ["Class to come", "Prueba por llegar", "Gara in arrivo", "競技は未定", "Prüfung folgt", "منافسة قادمة", "比赛待定", "Proef volgt", "Prova a seguir", "Klass kommer", "Соревнование впереди", "Konkurs wkrótce", "경기 예정"],
  "Engagements": ["Entries", "Inscripciones", "Iscrizioni", "エントリー", "Nennungen", "التسجيلات", "报名", "Inschrijvingen", "Inscrições", "Anmälningar", "Заявки", "Zgłoszenia", "참가 신청"],
  "Ma journée": ["My day", "Mi día", "La mia giornata", "私の一日", "Mein Tag", "يومي", "我的一天", "Mijn dag", "O meu dia", "Min dag", "Мой день", "Mój dzień", "나의 하루"],
  "avec ": ["with ", "con ", "con ", "騎乗馬：", "mit ", "مع ", "搭档：", "met ", "com ", "med ", "на ", "na ", "함께: "],
  "piste ": ["arena ", "pista ", "campo ", "馬場 ", "Platz ", "الميدان ", "场地 ", "piste ", "pista ", "bana ", "поле ", "plac ", "경기장 "],
  "heure mise à jour par ta coach": ["time updated by your coach", "hora actualizada por tu entrenadora", "orario aggiornato dalla tua istruttrice", "コーチが時間を更新しました", "Zeit von deiner Trainerin aktualisiert", "حدّثت مدرّبتك الموعد", "教练已更新时间", "tijd bijgewerkt door je coach", "hora atualizada pela tua treinadora", "tid uppdaterad av din tränare", "время обновлено тренером", "godzina zaktualizowana przez trenerkę", "코치가 시간을 바꿨어요"],
  "heure à venir": ["time to come", "hora por llegar", "orario in arrivo", "時間は未定", "Zeit folgt", "الموعد قادم", "时间待定", "tijd volgt", "hora a seguir", "tid kommer", "время уточняется", "godzina wkrótce", "시간 미정"],
  "En direct": ["Live", "En directo", "In diretta", "ライブ", "Live", "مباشر", "直播", "Live", "Em direto", "Live", "Онлайн", "Na żywo", "실시간"],
  "Actualiser": ["Refresh", "Actualizar", "Aggiorna", "更新", "Aktualisieren", "تحديث", "刷新", "Vernieuwen", "Atualizar", "Uppdatera", "Обновить", "Odśwież", "새로고침"],
  "n° ": ["no. ", "n.º ", "n. ", "番号 ", "Nr. ", "رقم ", "第 ", "nr. ", "n.º ", "nr ", "№ ", "nr ", "번호 "],
  "vers ": ["around ", "hacia las ", "verso le ", "目安 ", "gegen ", "حوالي ", "约 ", "rond ", "por volta das ", "runt ", "около ", "około ", "약 "],
  "à venir": ["to come", "por llegar", "in arrivo", "未定", "folgt", "قادم", "待定", "volgt", "a seguir", "kommer", "впереди", "wkrótce", "예정"],
  "Lu par Hype chez le chronométreur. Heure estimée, résultats provisoires pendant le concours.": ["Read by Hype from the timekeeper. Estimated time, provisional results during the show.", "Leído por Hype en el cronometrador. Hora estimada, resultados provisionales durante el concurso.", "Letto da Hype dal cronometrista. Orario stimato, risultati provvisori durante la gara.", "Hype が計時システムから読み取りました。時間は目安、大会中の結果は暫定です。", "Von Hype beim Zeitnehmer gelesen. Geschätzte Zeit, vorläufige Ergebnisse während des Turniers.", "قرأها Hype لدى جهاز التوقيت. موعد تقديري ونتائج مؤقتة أثناء المسابقة.", "由 Hype 从计时方读取。时间为估计，比赛期间成绩为暂定。", "Door Hype gelezen bij de tijdwaarneming. Geschatte tijd, voorlopige uitslagen tijdens de wedstrijd.", "Lido pelo Hype no cronometrista. Hora estimada, resultados provisórios durante o concurso.", "Läst av Hype hos tidtagaren. Uppskattad tid, preliminära resultat under tävlingen.", "Hype считывает данные у хронометриста. Время примерное, результаты предварительные во время соревнования.", "Odczytane przez Hype u chronometrażysty. Czas szacunkowy, wyniki tymczasowe w trakcie zawodów.", "Hype가 계측 시스템에서 읽어 왔어요. 시간은 예상이고, 대회 중 결과는 잠정이에요."],
  "Toute l’équipe": ["The whole team", "Todo el equipo", "Tutta la squadra", "チーム全員", "Das ganze Team", "الفريق كله", "整个团队", "Het hele team", "Toda a equipa", "Hela laget", "Вся команда", "Cała drużyna", "팀 전체"],
  "tour ": ["round ", "vuelta ", "giro ", "ラウンド ", "Umlauf ", "الجولة ", "第几轮 ", "ronde ", "volta ", "omgång ", "раунд ", "przejazd ", "라운드 "],
  "Aucun couple engagé. Commence par la page Engagements.": ["No pair entered yet. Start with the Entries page.", "Ninguna pareja inscrita. Empieza por la página Inscripciones.", "Nessuna coppia iscritta. Inizia dalla pagina Iscrizioni.", "まだエントリーされたペアはいません。エントリーのページから始めてね。", "Noch kein Paar genannt. Beginne mit der Seite Nennungen.", "لا يوجد ثنائي مسجّل. ابدأ بصفحة التسجيلات.", "还没有报名的组合。先从报名页面开始。", "Nog geen combinatie ingeschreven. Begin met de pagina Inschrijvingen.", "Nenhum par inscrito. Começa pela página Inscrições.", "Inget ekipage anmält. Börja med sidan Anmälningar.", "Пока нет заявленных пар. Начни со страницы «Заявки».", "Brak zgłoszonych par. Zacznij od strony Zgłoszenia.", "아직 신청된 팀이 없어요. 참가 신청 페이지부터 시작해 줘."],
  "Les passages apparaîtront dès que ta coach les aura indiqués.": ["Start times will appear as soon as your coach adds them.", "Los pasos aparecerán en cuanto tu entrenadora los indique.", "I passaggi compariranno appena la tua istruttrice li indicherà.", "コーチが入力すると出場順が表示されます。", "Die Starts erscheinen, sobald deine Trainerin sie eingetragen hat.", "ستظهر مواعيد الدخول بمجرد أن تحدّدها مدرّبتك.", "教练填写后，出场信息就会显示。", "De starttijden verschijnen zodra je coach ze heeft ingevuld.", "As passagens vão aparecer assim que a tua treinadora as indicar.", "Starttiderna visas så snart din tränare har lagt in dem.", "Выходы появятся, как только тренер их укажет.", "Starty pojawią się, gdy tylko trenerka je wpisze.", "코치가 입력하면 출전 순서가 나타나요."],
  "Les couples engagés": ["Pairs entered", "Parejas inscritas", "Coppie iscritte", "エントリーしたペア", "Genannte Paare", "الثنائيات المسجّلة", "已报名的组合", "Ingeschreven combinaties", "Pares inscritos", "Anmälda ekipage", "Заявленные пары", "Zgłoszone pary", "신청한 팀"],
  "Personne n’est encore inscrit.": ["Nobody has signed up yet.", "Todavía no se ha inscrito nadie.", "Nessuno si è ancora iscritto.", "まだ誰も参加登録していません。", "Noch niemand hat sich angemeldet.", "لم يسجّل أحد بعد.", "还没有人报名。", "Nog niemand heeft zich ingeschreven.", "Ainda ninguém se inscreveu.", "Ingen har anmält sig än.", "Пока никто не записался.", "Nikt jeszcze się nie zapisał.", "아직 아무도 참가 등록하지 않았어요."],
  "Ma liste du van": ["My trailer checklist", "Mi lista del camión", "La mia lista del van", "私の馬運車リスト", "Meine Hängerliste", "قائمة شاحنتي", "我的马车清单", "Mijn trailerlijst", "A minha lista do atrelado", "Min transportlista", "Мой список для коневоза", "Moja lista do przyczepy", "나의 마운차 체크리스트"],
  "à cocher, gardée d’un concours à l’autre": ["to tick off, kept from one show to the next", "para marcar, se guarda de un concurso a otro", "da spuntare, conservata da un concorso all’altro", "チェック式、大会ごとに引き継がれます", "zum Abhaken, bleibt von Turnier zu Turnier", "للتأشير، تبقى محفوظة من مسابقة إلى أخرى", "可勾选，各比赛之间会保留", "om af te vinken, blijft bewaard van wedstrijd tot wedstrijd", "para assinalar, guardada de um concurso para o outro", "att bocka av, sparas från tävling till tävling", "с галочками, сохраняется от соревнования к соревнованию", "do odhaczania, zostaje z zawodów na zawody", "체크하는 목록, 대회마다 이어져요"],
  "licence, vaccins du cheval, papiers": ["licence, horse’s vaccinations, papers", "licencia, vacunas del caballo, papeles", "patente, vaccini del cavallo, documenti", "ライセンス、馬のワクチン、書類", "Lizenz, Impfungen des Pferdes, Papiere", "الرخصة، لقاحات الحصان، الأوراق", "执照、马的疫苗、证件", "licentie, vaccinaties van het paard, papieren", "licença, vacinas do cavalo, documentos", "licens, hästens vaccinationer, papper", "лицензия, прививки лошади, документы", "licencja, szczepienia konia, dokumenty", "라이선스, 말 예방접종, 서류"],
  "Consignes pour ": ["Instructions for ", "Indicaciones para ", "Indicazioni per ", "指示：", "Hinweise für ", "تعليمات لـ ", "说明：", "Instructies voor ", "Indicações para ", "Instruktioner för ", "Указания для ", "Wskazówki dla ", "안내: "],
  "Matériel": ["Tack", "Material", "Attrezzatura", "馬具", "Ausrüstung", "المعدّات", "马具", "Materiaal", "Material", "Utrustning", "Снаряжение", "Sprzęt", "장비"],
  "Enrênement": ["Training aids", "Riendas auxiliares", "Redini ausiliarie", "補助手綱", "Hilfszügel", "الأعنّة المساعدة", "辅助缰", "Hulpteugels", "Rédeas auxiliares", "Hjälptyglar", "Вспомогательные поводья", "Wodze pomocnicze", "보조 고삐"],
  "Soins": ["Care", "Cuidados", "Cure", "ケア", "Pflege", "العناية", "护理", "Verzorging", "Cuidados", "Skötsel", "Уход", "Pielęgnacja", "관리"],
  "Alertes": ["Alerts", "Alertas", "Avvisi", "お知らせ", "Benachrichtigungen", "التنبيهات", "提醒", "Meldingen", "Alertas", "Aviseringar", "Оповещения", "Powiadomienia", "알림"],
  "✓ Alertes activées sur ce téléphone": ["✓ Alerts on for this phone", "✓ Alertas activadas en este móvil", "✓ Avvisi attivi su questo telefono", "✓ このスマホで通知オン", "✓ Benachrichtigungen auf diesem Handy an", "✓ التنبيهات مفعّلة على هذا الهاتف", "✓ 此手机已开启提醒", "✓ Meldingen aan op deze telefoon", "✓ Alertas ativados neste telemóvel", "✓ Aviseringar på för den här telefonen", "✓ Оповещения включены на этом телефоне", "✓ Powiadomienia włączone na tym telefonie", "✓ 이 휴대폰 알림 켜짐"],
  "Me prévenir (alertes)": ["Alert me", "Avisarme (alertas)", "Avvisami", "お知らせを受け取る", "Mich benachrichtigen", "نبّهني", "提醒我", "Waarschuw me", "Avisar-me (alertas)", "Meddela mig", "Оповещать меня", "Powiadamiaj mnie", "알림 받기"],
  "Si tu participes et que les alertes sont activées, Hype te prévient 15 minutes avant le départ et avant la reconnaissance.": ["If you take part and alerts are on, Hype alerts you 15 minutes before departure and before the course walk.", "Si participas y las alertas están activadas, Hype te avisa 15 minutos antes de la salida y del reconocimiento.", "Se partecipi e gli avvisi sono attivi, Hype ti avvisa 15 minuti prima della partenza e della ricognizione.", "参加して通知がオンなら、出発とコース下見の15分前に Hype がお知らせします。", "Wenn du teilnimmst und die Benachrichtigungen an sind, meldet sich Hype 15 Minuten vor der Abfahrt und vor der Parcoursbesichtigung.", "إذا كنت مشاركًا والتنبيهات مفعّلة، ينبّهك Hype قبل الانطلاق وقبل معاينة المسار بـ 15 دقيقة.", "如果你参加并开启了提醒，Hype 会在出发和看场地前 15 分钟提醒你。", "Als je meedoet en meldingen aanstaan, waarschuwt Hype je 15 minuten voor vertrek en voor de verkenning.", "Se participares e os alertas estiverem ativados, o Hype avisa-te 15 minutos antes da partida e do reconhecimento.", "Om du deltar och aviseringar är på meddelar Hype dig 15 minuter före avfärd och före banvandringen.", "Если ты участвуешь и оповещения включены, Hype предупредит тебя за 15 минут до выезда и до просмотра маршрута.", "Jeśli bierzesz udział i powiadomienia są włączone, Hype uprzedzi cię 15 minut przed wyjazdem i przed zapoznaniem z parkurem.", "참가하고 알림이 켜져 있으면, 출발과 코스 답사 15분 전에 Hype가 알려 줘요."],
  "Les alertes partiront dès que l’heure de départ ou de reconnaissance sera indiquée.": ["Alerts will go out as soon as the departure or course walk time is set.", "Las alertas saldrán en cuanto se indique la hora de salida o de reconocimiento.", "Gli avvisi partiranno appena verrà indicato l’orario di partenza o di ricognizione.", "出発またはコース下見の時間が決まると通知が届きます。", "Die Benachrichtigungen kommen, sobald die Abfahrts- oder Besichtigungszeit eingetragen ist.", "ستُرسل التنبيهات بمجرد تحديد موعد الانطلاق أو معاينة المسار.", "出发或看场地时间确定后就会发送提醒。", "De meldingen gaan uit zodra de tijd van vertrek of verkenning is ingevuld.", "Os alertas vão sair assim que a hora de partida ou de reconhecimento for indicada.", "Aviseringarna skickas så snart tiden för avfärd eller banvandring är inlagd.", "Оповещения придут, как только будет указано время выезда или просмотра маршрута.", "Powiadomienia zostaną wysłane, gdy tylko pojawi się godzina wyjazdu lub zapoznania z parkurem.", "출발이나 코스 답사 시간이 정해지면 알림이 가요."],
  "Tout": ["All", "Todo", "Tutto", "すべて", "Alles", "الكل", "全部", "Alles", "Tudo", "Allt", "Всё", "Wszystko", "전체"],
  "Vidéos de parcours": ["Round videos", "Vídeos de recorrido", "Video dei percorsi", "コースの動画", "Parcoursvideos", "فيديوهات المسار", "赛道视频", "Parcoursvideo’s", "Vídeos de percurso", "Rundvideor", "Видео маршрутов", "Filmy z przejazdów", "코스 영상"],
  "Vidéos de l’équipe": ["Team videos", "Vídeos del equipo", "Video della squadra", "チームの動画", "Team-Videos", "فيديوهات الفريق", "团队视频", "Teamvideo’s", "Vídeos da equipa", "Lagets videor", "Видео команды", "Filmy drużyny", "팀 영상"],
  "+ Ajouter": ["+ Add", "+ Añadir", "+ Aggiungi", "+ 追加", "+ Hinzufügen", "+ إضافة", "+ 添加", "+ Toevoegen", "+ Adicionar", "+ Lägg till", "+ Добавить", "+ Dodaj", "+ 추가"],
  "Pas encore de vidéo. Ajoute-la sur le fil du concours : ta coach pourra la commenter seconde par seconde.": ["No video yet. Add it to the show’s feed: your coach can comment on it second by second.", "Todavía no hay vídeo. Añádelo al hilo del concurso: tu entrenadora podrá comentarlo segundo a segundo.", "Ancora nessun video. Aggiungilo al feed del concorso: la tua istruttrice potrà commentarlo secondo per secondo.", "まだ動画はありません。大会のフィードに追加すると、コーチが1秒ごとにコメントできます。", "Noch kein Video. Füge es im Turnier-Feed hinzu: deine Trainerin kann es Sekunde für Sekunde kommentieren.", "لا يوجد فيديو بعد. أضفه إلى صفحة المسابقة: ستتمكّن مدرّبتك من التعليق عليه ثانية بثانية.", "还没有视频。把它添加到比赛动态里：教练可以逐秒点评。", "Nog geen video. Voeg hem toe aan de feed van de wedstrijd: je coach kan hem seconde per seconde becommentariëren.", "Ainda não há vídeo. Adiciona-o ao fio do concurso: a tua treinadora poderá comentá-lo segundo a segundo.", "Ingen video än. Lägg till den i tävlingens flöde: din tränare kan kommentera den sekund för sekund.", "Видео пока нет. Добавь его в ленту соревнования: тренер сможет прокомментировать его посекундно.", "Jeszcze nie ma filmu. Dodaj go do wątku zawodów: trenerka skomentuje go sekunda po sekundzie.", "아직 영상이 없어요. 대회 피드에 올리면 코치가 초 단위로 코멘트할 수 있어요."],
  "Photos, résultats et commentaires": ["Photos, results and comments", "Fotos, resultados y comentarios", "Foto, risultati e commenti", "写真、結果とコメント", "Fotos, Ergebnisse und Kommentare", "الصور والنتائج والتعليقات", "照片、成绩和评论", "Foto’s, uitslagen en reacties", "Fotos, resultados e comentários", "Foton, resultat och kommentarer", "Фото, результаты и комментарии", "Zdjęcia, wyniki i komentarze", "사진, 결과와 댓글"],
  "Ouvrir le dossier du concours": ["Open the show file", "Abrir el expediente del concurso", "Apri il fascicolo del concorso", "大会の書類を開く", "Turnierunterlagen öffnen", "فتح ملف المسابقة", "打开比赛资料", "Wedstrijddossier openen", "Abrir o dossiê do concurso", "Öppna tävlingspärmen", "Открыть документы соревнования", "Otwórz dokumenty zawodów", "대회 서류 열기"],
  "Ton historique avec ce cheval": ["Your history with this horse", "Tu historial con este caballo", "La tua storia con questo cavallo", "この馬との記録", "Deine Geschichte mit diesem Pferd", "سجلّك مع هذا الحصان", "你和这匹马的记录", "Jouw geschiedenis met dit paard", "O teu histórico com este cavalo", "Din historik med den här hästen", "Твоя история с этой лошадью", "Twoja historia z tym koniem", "이 말과의 기록"],
  "Les résultats et les souvenirs de ce concours restent ici, dans Médias, après la journée.": ["The results and memories of this show stay here, in Media, after the day.", "Los resultados y recuerdos de este concurso se quedan aquí, en Medios, después del día.", "I risultati e i ricordi di questo concorso restano qui, in Media, dopo la giornata.", "この大会の結果と思い出は、当日のあともここ（メディア）に残ります。", "Die Ergebnisse und Erinnerungen dieses Turniers bleiben nach dem Tag hier unter Medien.", "تبقى نتائج هذه المسابقة وذكرياتها هنا، في الوسائط، بعد اليوم.", "比赛结束后，成绩和回忆会保留在这里的「媒体」中。", "De uitslagen en herinneringen van deze wedstrijd blijven hier, bij Media, na de dag.", "Os resultados e as recordações deste concurso ficam aqui, em Media, depois do dia.", "Resultaten och minnena från tävlingen finns kvar här, under Media, efter dagen.", "Результаты и воспоминания об этом соревновании останутся здесь, в разделе «Медиа».", "Wyniki i wspomnienia z tych zawodów zostaną tutaj, w Mediach, po zakończeniu dnia.", "대회가 끝난 뒤에도 결과와 추억은 여기 미디어에 남아요."],
  "Passages": ["Start times", "Pasos", "Passaggi", "出場順", "Starts", "مواعيد الدخول", "出场", "Starttijden", "Passagens", "Starttider", "Выходы", "Starty", "출전 순서"],
  "Équipe": ["Team", "Equipo", "Squadra", "チーム", "Team", "الفريق", "团队", "Team", "Equipa", "Lag", "Команда", "Drużyna", "팀"],
  "Médias": ["Media", "Medios", "Media", "メディア", "Medien", "الوسائط", "媒体", "Media", "Media", "Media", "Медиа", "Media", "미디어"],
  "Infos pratiques": ["Practical info", "Información práctica", "Info pratiche", "実用情報", "Praktische Infos", "معلومات عملية", "实用信息", "Praktische info", "Informações práticas", "Praktisk info", "Полезная информация", "Informacje praktyczne", "실용 정보"],
  "Lieu": ["Venue", "Lugar", "Luogo", "場所", "Ort", "المكان", "地点", "Locatie", "Local", "Plats", "Место", "Miejsce", "장소"],
  "Pas encore indiqué": ["Not given yet", "Aún sin indicar", "Non ancora indicato", "未定", "Noch nicht angegeben", "لم يُحدّد بعد", "尚未填写", "Nog niet ingevuld", "Ainda não indicado", "Inte angivet än", "Пока не указано", "Jeszcze nie podano", "아직 미정"],
  "Itinéraire": ["Directions", "Ruta", "Itinerario", "経路", "Route", "الاتجاهات", "路线", "Route", "Itinerário", "Vägbeskrivning", "Маршрут", "Trasa", "길찾기"],
  "alerte 15 min avant": ["alert 15 min before", "alerta 15 min antes", "avviso 15 min prima", "15分前にお知らせ", "Benachrichtigung 15 Min. vorher", "تنبيه قبل 15 دقيقة", "提前 15 分钟提醒", "melding 15 min vooraf", "alerta 15 min antes", "avisering 15 min före", "оповещение за 15 мин", "powiadomienie 15 min wcześniej", "15분 전 알림"],
  "Les horaires ne sont pas encore indiqués.": ["The times aren’t set yet.", "Los horarios aún no están indicados.", "Gli orari non sono ancora indicati.", "時間はまだ決まっていません。", "Die Zeiten sind noch nicht angegeben.", "لم تُحدّد المواعيد بعد.", "时间尚未确定。", "De tijden zijn nog niet ingevuld.", "Os horários ainda não estão indicados.", "Tiderna är inte angivna än.", "Время пока не указано.", "Godziny nie zostały jeszcze podane.", "시간이 아직 정해지지 않았어요."],
  "Ce concours est terminé.": ["This show is over.", "Este concurso ha terminado.", "Questo concorso è finito.", "この大会は終了しました。", "Dieses Turnier ist vorbei.", "انتهت هذه المسابقة.", "该比赛已结束。", "Deze wedstrijd is voorbij.", "Este concurso terminou.", "Tävlingen är slut.", "Соревнование завершено.", "Te zawody się zakończyły.", "이 대회는 끝났어요."],
  "✓ Tu participes": ["✓ You’re taking part", "✓ Participas", "✓ Partecipi", "✓ 参加します", "✓ Du nimmst teil", "✓ أنت مشارك", "✓ 你会参加", "✓ Je doet mee", "✓ Vais participar", "✓ Du deltar", "✓ Ты участвуешь", "✓ Bierzesz udział", "✓ 참가해요"],
  "Je participe": ["I’m taking part", "Participo", "Partecipo", "参加する", "Ich nehme teil", "سأشارك", "我参加", "Ik doe mee", "Vou participar", "Jag deltar", "Я участвую", "Biorę udział", "참가할게요"],
  "Touche encore pour te retirer.": ["Tap again to withdraw.", "Toca otra vez para retirarte.", "Tocca di nuovo per ritirarti.", "もう一度タップすると取り消せます。", "Tippe noch einmal, um dich abzumelden.", "المس مرة أخرى للانسحاب.", "再点一次即可退出。", "Tik nog eens om je af te melden.", "Toca outra vez para te retirares.", "Tryck igen för att dra dig ur.", "Нажми ещё раз, чтобы отказаться.", "Dotknij ponownie, aby się wycofać.", "한 번 더 누르면 취소돼요."],
  "Ma préparation": ["My preparation", "Mi preparación", "La mia preparazione", "私の準備", "Meine Vorbereitung", "تحضيري", "我的准备", "Mijn voorbereiding", "A minha preparação", "Mina förberedelser", "Моя подготовка", "Moje przygotowanie", "나의 준비"],
  "Dossier du concours": ["Show file", "Expediente del concurso", "Fascicolo del concorso", "大会の書類", "Turnierunterlagen", "ملف المسابقة", "比赛资料", "Wedstrijddossier", "Dossiê do concurso", "Tävlingspärm", "Документы соревнования", "Dokumenty zawodów", "대회 서류"]   /* 08/11 23h : fiche concours traduite (Blandine « Ok continue ») */
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
  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } try { if (window.__teamCourante) window.__teamArmee = true; } catch (eA) { } setEcran("team-competition"); }   /* 07/11 : on revient sur l'équipe qu'on regardait */
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
    var etiquette = nb ? (nb + (nb > 1 ? F(" cavaliers") : F(" cavalier"))) : (String(ev.date_jour || "").slice(0, 10) > isoAuj ? F("À engager") : "");
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
  ".e1 .e1-ligne input.e1-in::placeholder{color:var(--hs-iv3);font-size:14px}",
  /* 07/11 23h20 — composeur P1/D3 : tuiles photo 3 par ligne, barre qui se remplit, boutons à contour champagne (jamais pleins) */
  ".e1 .d3{margin-top:30px}",
  ".e1 .d3-k{font-size:10.5px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--hs-ch);margin-bottom:14px}",
  ".e1 .d3-etapes{display:flex;align-items:center;gap:8px}",
  ".e1 .d3-et{display:flex;align-items:center;gap:7px;background:none;border:none;padding:4px 0;color:var(--hs-iv3);font:400 12px 'Montserrat',sans-serif;white-space:nowrap;min-height:36px}",
  ".e1 .d3-et i{font-style:normal;width:26px;height:26px;border-radius:50%;border:1px solid rgba(243,238,228,.12);display:grid;place-items:center;font-size:12px}",
  ".e1 .d3-et.fait{color:var(--hs-iv2)}.e1 .d3-et.fait i{border-color:var(--hs-ch);color:var(--hs-ch)}",
  ".e1 .d3-et.on{color:var(--hs-iv)}.e1 .d3-et.on i{border-color:var(--hs-ch);background:rgba(201,166,107,.18)}",
  ".e1 .d3-trait{flex:1;height:1px;min-width:8px;background:rgba(243,238,228,.12)}.e1 .d3-trait.fait{background:var(--hs-ch)}",
  ".e1 .d3-q{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:30px;line-height:1.08;margin:16px 0 12px;color:var(--hs-iv)}",
  /* 07/11 23h49 (Blandine : « réduis les onglets des chevaux et cavaliers ») : 4 petites tuiles par ligne sur téléphone */
  ".e1 .d3-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}",
  "@media (min-width:700px){.e1 .d3-g{grid-template-columns:repeat(6,minmax(0,1fr))}}",
  "@media (min-width:1000px){.e1 .d3-g{grid-template-columns:repeat(8,minmax(0,1fr))}}",
  ".e1 .d3-g.d3-ge{grid-template-columns:repeat(3,minmax(0,1fr))}",
  "@media (min-width:700px){.e1 .d3-g.d3-ge{grid-template-columns:repeat(4,minmax(0,1fr))}}",
  "@media (min-width:1000px){.e1 .d3-g.d3-ge{grid-template-columns:repeat(6,minmax(0,1fr))}}",
  ".e1 .d3-t{position:relative;aspect-ratio:4/5;max-width:100%;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.1);background:#0d1214;padding:0;cursor:pointer;color:var(--hs-iv);text-align:start}",
  ".e1 .d3-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:55% 35%}",
  ".e1 .d3-t:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 45%,rgba(7,10,8,.92))}",
  ".e1 .d3-t b{position:absolute;z-index:2;left:6px;right:6px;bottom:6px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:13.5px;line-height:1.05;overflow-wrap:anywhere}",
  ".e1 .d3-t small{position:absolute;z-index:2;top:4px;left:4px;font-size:8.5px;padding:2px 6px;border-radius:999px;background:rgba(7,10,8,.65);color:var(--hs-iv2)}",
  "[dir=rtl] .e1 .d3-t small{left:auto;right:6px}",
  ".e1 .d3-t .d3-ini{position:absolute;inset:0;display:grid;place-items:center;font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;color:var(--hs-ch)}",
  ".e1 .d3-t.on{border:2px solid var(--hs-ch)}",
  ".e1 .d3-t.on:before{content:'✓';position:absolute;z-index:3;top:4px;right:4px;width:18px;height:18px;border-radius:50%;background:rgba(7,10,8,.7);border:1px solid var(--hs-ch);color:var(--hs-ch);font-size:11px;display:grid;place-items:center}",
  "[dir=rtl] .e1 .d3-t.on:before{right:auto;left:6px}",
  ".e1 .d3-t.gris{opacity:.38;cursor:default}",
  ".e1 .d3-t.plus{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-style:dashed;border-color:rgba(201,166,107,.55);background:none;color:var(--hs-ch);font:400 12.5px 'Montserrat',sans-serif;text-align:center}",
  ".e1 .d3-t.plus:after{display:none}.e1 .d3-t.plus i{font-style:normal;font-size:18px}.e1 .d3-t.plus.on{border-style:solid}",
  ".e1 .d3-ep{position:relative;aspect-ratio:3/2;max-width:100%;border-radius:14px;border:1px solid rgba(243,238,228,.1);background:linear-gradient(180deg,rgba(201,166,107,.07),rgba(201,166,107,0));display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;padding:10px;color:var(--hs-iv);text-align:start;cursor:pointer}",
  ".e1 .d3-ep b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:18px;line-height:1;overflow-wrap:anywhere}",
  ".e1 .d3-ep span{font-size:10.5px;color:var(--hs-iv3);margin-top:4px}",
  ".e1 .d3-ep>i{position:absolute;top:4px;right:4px;width:30px;height:30px;display:grid;place-items:center;font-style:normal;color:var(--hs-iv3);font-size:16px}",
  "[dir=rtl] .e1 .d3-ep>i{right:auto;left:4px}",
  ".e1 .d3-ep.on{border:2px solid var(--hs-ch)}.e1 .d3-ep.gris{opacity:.38;cursor:default}",
  ".e1 .d3-ep.plus{justify-content:center;align-items:center;text-align:center;gap:6px;border-style:dashed;border-color:rgba(201,166,107,.55);background:none;color:var(--hs-ch);font-size:12.5px}",
  ".e1 .d3-ep.plus>i{position:static;width:auto;height:auto;color:var(--hs-ch)}",
  ".e1 .d3-ep.plus i{font-style:normal;font-size:18px}.e1 .d3-ep.plus span{color:var(--hs-ch);font-size:12.5px;margin:0}.e1 .d3-ep.plus.on{border-style:solid}",
  ".e1 .d3-autre{margin-top:12px;display:flex;flex-direction:column;gap:10px}",
  ".e1 .d3-autre.d3-ligne{flex-direction:row;align-items:center;gap:12px}.e1 .d3-autre.d3-ligne input{flex:1;min-width:0}",
  ".e1 .d3-autre input{min-height:44px;padding:0 14px;border-radius:12px;border:1px solid rgba(201,166,107,.45)!important;background:#070A08;color:var(--hs-iv)}",
  ".e1 .d3-recap{display:flex;gap:6px;align-items:center;padding:10px;margin-top:16px;border-radius:18px;border:1px solid rgba(201,166,107,.35);background:#0E1415}",
  ".e1 .d3-rc{flex:1;min-width:0;display:flex;align-items:center;gap:6px;background:none;border:none;padding:0;color:var(--hs-iv);font:400 12px 'Montserrat',sans-serif;text-align:start;min-height:36px}",
  ".e1 .d3-rc img,.e1 .d3-rc .d3-mini,.e1 .d3-rc i,.e1 .d3-rc em{flex:0 0 28px;width:28px;height:28px;border-radius:8px;object-fit:cover}",
  ".e1 .d3-rc .d3-mini{display:grid;place-items:center;border:1px solid var(--hs-ch);color:var(--hs-ch);font-family:'Cormorant Garamond',Georgia,serif;font-size:12px}",
  ".e1 .d3-rc i{border:1px dashed rgba(201,166,107,.5)}",
  ".e1 .d3-rc em{font-style:normal;display:grid;place-items:center;border:1px solid var(--hs-ch);color:var(--hs-ch);font-family:'Cormorant Garamond',Georgia,serif;font-size:13px}",
  ".e1 .d3-rc span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.e1 .d3-rc.vide span{color:var(--hs-iv3)}",
  ".e1 .d3-ok{flex:0 0 auto;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,166,107,.35);background:transparent;color:var(--hs-iv3);font:500 12.5px 'Montserrat',sans-serif}",
  ".e1 .d3-ok.pret{border-color:var(--hs-ch);color:var(--hs-ch)}",
  ".e1 .d3-petit{display:block;margin-top:12px;font-size:12.5px;text-align:start}",
  ".e1 .d3-msg{margin-top:10px;font-size:12.5px;line-height:1.5;color:var(--hs-iv2)}",
  ".e1 .rc-li{grid-template-columns:26px 44px minmax(0,1fr) auto 32px}",
  ".e1 .rc-x{width:32px;height:32px;border-radius:50%;border:1px solid rgba(243,238,228,.12);background:none;color:var(--hs-iv3);font-size:16px;line-height:1;padding:0}",
  /* 09/11 — modifier / supprimer un tour engagé */
  ".e1 .rc-mod{display:flex;align-items:center;justify-content:center;border-color:rgba(201,166,107,.45)}",
  ".e1 .rc-modp{grid-column:1 / -1;display:flex;flex-direction:column;gap:10px;margin:4px 0 6px;padding:12px;border:1px solid rgba(201,166,107,.35);border-radius:14px}",
  ".e1 .rc-modp label{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:10px;font-size:12.5px;color:var(--hs-iv2)}",
  ".e1 .rc-modp input{background:transparent;border:1px solid rgba(243,238,228,.22);border-radius:10px;color:#F3EEE4;font:inherit;font-size:14px;padding:9px 11px;min-width:0}",
  ".e1 .rc-moda,.e1 .rc-modc{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:10px}",
  ".e1 .rc-modc span{flex:1 0 100%;font-size:13px;color:#F3EEE4}",
  ".e1 .rc-modx{background:transparent;border:1px solid rgba(214,120,110,.6);color:#E0A49B;border-radius:999px;font:inherit;font-size:12.5px;padding:7px 14px;cursor:pointer}",
  ".e1 .rc-moda .rc-modx{margin-inline-end:auto}",
  ".e1 .rc-modok{background:transparent;border:1px solid #C9A66B;color:#C9A66B;border-radius:999px;font:inherit;font-size:12.5px;font-weight:600;padding:7px 16px;cursor:pointer}",
  ".e1 .d3-sans{margin-top:26px}",
  ".e1 .d3-ordre{margin-top:30px;padding:16px;border-radius:18px;border:1px solid rgba(201,166,107,.3);background:#0E1415}",
  ".e1 .rc-rail{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;overflow:visible;margin:0;padding:0;scroll-snap-type:none}",
  "@media (min-width:700px){.e1 .rc-rail{grid-template-columns:repeat(3,minmax(0,1fr))}}",
  "@media (min-width:1000px){.e1 .rc-rail{grid-template-columns:repeat(4,minmax(0,1fr))}}",
  ".e1 .rc-ch{flex:none;max-width:none;min-width:0;border-radius:16px}.e1 .rc-ch .ph{height:96px}.e1 .rc-ch .ph h4{font-size:17px;left:10px;right:10px;bottom:8px;overflow-wrap:anywhere}",
  ".e1 .rc-slots{padding:8px 10px 10px;gap:6px}.e1 .rc-slot{grid-template-columns:20px minmax(0,1fr) auto;font-size:11.5px;gap:6px}.e1 .rc-slot span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.e1 .rc-slot i{width:20px;height:20px}",
  ".e1 .d3-sl{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid rgba(243,238,228,.07)}",
  ".e1 .d3-sl-n{background:none;border:none;padding:0;color:var(--hs-iv);font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;text-align:start}",
  ".e1 .d3-sl-n span{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--hs-ch)}",
  /* les boutons du bas restent au-dessus de la barre d'onglets de l'appli (64 px) */
  ".e1 .hs-coll{position:static;background:none;padding-top:22px;padding-bottom:calc(96px + env(safe-area-inset-bottom))}",
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
var HS_IMG_LOTS_CAV = ["images/concours-carte-passages.webp", "images/article-cso-saut.webp", "images/concours-carte-engagements.webp", "images/article-cso-virage.webp"];
var HS_IMG_LOTS_CH = ["images/concours-carte-medias.webp", "images/galop1-hero-bai.webp", "images/galop6-hero-gris.webp", "images/concours-hero-bai-tresse.webp"];
var HS_IMG_LOTS_EP = ["images/article-cso-saut.webp", "images/article-cso-virage.webp", "images/article-cso-appel.webp", "images/article-cso-tuile.webp"];
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
  function F(fr) { return hsT(tr, fr, lg); }   /* 08/11 23h : fiche concours traduite (HS_TR, 14 langues) */
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
  var _che = React.useState({}); var chEng = _che[0], setChEng = _che[1];   /* 09/11 : photos et noms de ses chevaux engagés */
  var _chs = React.useState(null); var chSel = _chs[0], setChSel = _chs[1];
  var _hto = React.useState(false); var histoTout = _hto[0], setHistoTout = _hto[1];
  var _epo = React.useState(null); var epOuv = _epo[0], setEpOuv = _epo[1];
  var _epf = React.useState({}); var epFerme = _epf[0], setEpFerme = _epf[1];   /* 09/11 16h (Blandine) : toutes les épreuves dépliées ; { ep: true } = repliée */
  var _epp = React.useState({}); var epPlus = _epp[0], setEpPlus = _epp[1];     /* épreuves dont on a déroulé au-delà de 8 passages */
  /* 09/11 — PADDOCK : groupes de détente (table concours_groupes_detente ; écriture : coach/modératrice ; lecture Team : publiés) */
  var _gd = React.useState([]); var grpD = _gd[0], setGrpD = _gd[1];
  /* 09/11 — PAGE RÉSULTATS */
  var _rso = React.useState({}); var resOuv = _rso[0], setResOuv = _rso[1];   /* 09/11 13h50 (Blandine) : plusieurs épreuves dépliées à la fois — { épreuve: true/false }, absente = automatique */
  var _tvr = React.useState({}); var tvRes = _tvr[0], setTvRes = _tvr[1];      /* vidéos de la Team rattachées à un résultat */
  var _red = React.useState(null); var resEd = _red[0], setResEd = _red[1];    /* saisie rapide de la coach */
  var _rem = React.useState(""); var resMsg = _rem[0], setResMsg = _rem[1];
  var _reo = React.useState(false); var resOcc = _reo[0], setResOcc = _reo[1];
  var _rlm = React.useState(null); var resMod = _rlm[0], setResMod = _rlm[1];    /* 09/11 13h55 : { id, sup } — crayon d'un résultat publié (coach) */
  var _rlu = React.useState(null); var resLu = _rlu[0], setResLu = _rlu[1];      /* 09/11 : résultats lus sur un PDF / une capture, par épreuve */
  var _rlc = React.useState(""); var resLect = _rlc[0], setResLect = _rlc[1];    /* "en_cours" ou message */
  var _lve = React.useState(null); var liveEd = _lve[0], setLiveEd = _lve[1];
  var _chp = React.useState({}); var chPhotos = _chp[0], setChPhotos = _chp[1];   /* 09/11 15h20 : photo de chaque cheval des résultats (podiums en médaillons) */
  var _jjo = React.useState(false); var jjOuv = _jjo[0], setJjOuv = _jjo[1];   /* 09/11 15h : la modification des passages (ex-page Jour J) ouverte dans la carte Passages */
  var _dcl = React.useState(null); var decEp = _dcl[0], setDecEp = _dcl[1];   /* 09/11 14h53 (Blandine « Ok 2 ») : { ep, min, prev, occ, msg } — décaler une épreuve depuis Passages */
  var _lre = React.useState(null); var lienResEd = _lre[0], setLienResEd = _lre[1];   /* 09/11 14h07 : lien des résultats en ligne (concours terminé) */
  /* 09/11 — MÉDIAS DU CONCOURS (galerie : Mes médias puis Les médias de l'équipe) */
  var _mg = React.useState(null); var medG = _mg[0], setMedG = _mg[1];   /* { posts, tv, ident, resCav } */
  var _mt = React.useState("tous"); var medType = _mt[0], setMedType = _mt[1];
  var _mfc = React.useState(""); var fCavM = _mfc[0], setFCavM = _mfc[1];
  var _mfh = React.useState(""); var fChM = _mfh[0], setFChM = _mfh[1];
  var _mfe = React.useState(""); var fEpM = _mfe[0], setFEpM = _mfe[1];
  var _mv = React.useState(null); var medVisu = _mv[0], setMedVisu = _mv[1];
  var _mn = React.useState(12); var medNM = _mn[0], setMedNM = _mn[1];
  var _mne = React.useState(24); var medNE = _mne[0], setMedNE = _mne[1];
  var _mid = React.useState(null); var medId = _mid[0], setMedId = _mid[1];   /* panneau « qui est sur ce média ? » */
  var _maj = React.useState(false); var medAjout = _maj[0], setMedAjout = _maj[1];
  var _mms = React.useState(""); var medMsg = _mms[0], setMedMsg = _mms[1];
  var _msl = React.useState(null); var medSel = _msl[0], setMedSel = _msl[1];
  var _fov = React.useState(false); var filOuv = _fov[0], setFilOuv = _fov[1];   /* 09/11 16h35 : le fil n'apparaît que pour ajouter des photos */
  var _vgf = React.useState({}); var vgFerme = _vgf[0], setVgFerme = _vgf[1];   /* 09/11 19h15 : lots de vidéos repliés */
  var _mvu = React.useState(""); var medVue = _mvu[0], setMedVue = _mvu[1];   /* 09/11 soir (maquette validée) : "" = galerie ; "cav" / "ch" / "ep" = vue Explorer les médias */
  var _mlg = React.useState(0); var medLarg = _mlg[0], setMedLarg = _mlg[1];
  var _mxs = React.useState({}); var medXSel = _mxs[0], setMedXSel = _mxs[1];   /* 09/11 20h30 : cheval / cavalier choisi dans Par cheval / Par cavalier ({ ch: id, cav: id }) */
  var _mxf = React.useState(""); var medXFil = _mxf[0], setMedXFil = _mxf[1];   /* filtre croisé « Avec … » */
  var _mxt = React.useState(false); var medXTous = _mxt[0], setMedXTous = _mxt[1];   /* « Voir tous les chevaux » */   /* largeur réelle de la partie Médias (colonnes de la galerie) */   /* 09/11 soir (maquette validée) : "" = galerie ; "cav" / "ch" / "ep" = vue Explorer les médias */
  var _mpg = React.useState(null); var medPage = _mpg[0], setMedPage = _mpg[1];   /* 09/11 22h45 : page d'un cavalier / d'un cheval (haut de la page vidéo) */
  var _mps = React.useState(null); var medPgSel = _mps[0], setMedPgSel = _mps[1];
  var _mgp = React.useState("cav"); var medGrp = _mgp[0], setMedGrp = _mgp[1];   /* 09/11 15h10 : vidéos rangées par cavalier ou par cheval */   /* 09/11 13h10 : média principal choisi dans « Mes médias » */
  var _gde = React.useState(null); var grpEd = _gde[0], setGrpEd = _gde[1];   /* brouillon de la coach (null = fermé) */
  var _gdm = React.useState(""); var grpMsg = _gdm[0], setGrpMsg = _gdm[1];
  var _gdo = React.useState(false); var grpOcc = _gdo[0], setGrpOcc = _gdo[1];   /* 09/11 : épreuve dépliée dans Passages (null = automatique) */   /* 09/11 : historique déplié */   /* 09/11 : cheval choisi pour l'historique */
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
  /* 08/11 nouvelle fiche : menu ⋯, parties repliables, bandeau déplié, filtre des médias, cartes dont la photo est arrivée, passages de l'équipe */
  var _mo = React.useState(false); var menuOuv = _mo[0], setMenuOuv = _mo[1];
  var _ou = React.useState({}); var ouvert = _ou[0], setOuvert = _ou[1];
  var _io = React.useState(false); var infosOuv = _io[0], setInfosOuv = _io[1];
  var _fm = React.useState("tout"); var filtreM = _fm[0], setFiltreM = _fm[1];
  var _co = React.useState({}); var cartesOk = _co[0], setCartesOk = _co[1];
  var _pq = React.useState([]); var passagesEq = _pq[0], setPassagesEq = _pq[1];
  var _oc = React.useState(null); var ongletChoisi = _oc[0], setOngletC = _oc[1];   /* null = carte choisie selon le moment (09/11) */
  var _rc = React.useState([]); var resConc = _rc[0], setResConc = _rc[1];   /* 09/11 : résultats rattachés à ce concours (resultats.agenda_id), jamais déduits de la date */   /* 09/11 : les 4 cartes sont des onglets (rien d'affiché tant qu'aucune n'est touchée) */
  React.useEffect(function () {
    var ids = []; (resConc || []).concat(passagesEq || []).forEach(function (r) { if (r.cheval_id && ids.indexOf(r.cheval_id) === -1 && chPhotos[r.cheval_id] === undefined) ids.push(r.cheval_id); });
    if (!ids.length || typeof supa === "undefined" || !supa) return;
    var vif = true;
    supa.from("chevaux").select("id, photo_url").in("id", ids.slice(0, 100)).then(function (r) { if (!vif) return; var m = Object.assign({}, chPhotos); ids.forEach(function (i) { m[i] = null; }); ((r && r.data) || []).forEach(function (x) { m[x.id] = x.photo_url || null; }); setChPhotos(m); });
    return function () { vif = false; };
  }, [resConc, passagesEq]);
  /* 04/11 22h — le direct lu par Hype sur Winjump (fonction direct-concours) : elle ne voit que ses passages */
  function lireEnDirect() {
    setDvOcc(true);
    supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: idEv } }).then(function (r) {
      setDvOcc(false);
      if (r && !r.error && r.data && !r.data.erreur) setEnDirect(r.data);
    }).catch(function () { setDvOcc(false); });
  }
  React.useEffect(function () {
    if (ev && (mesEng.length || gestion) && /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String(ev.lien_direct || ""))) lireEnDirect();
  }, [ev && ev.lien_direct, mesEng.length, gestion]);   /* 09/11 : la coach lit aussi le direct (toute l'équipe) */

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
  /* 09/11 14h10 : la galerie se recharge (ouverture de la carte Médias, toutes les 15 s tant qu'elle est ouverte) — une photo publiée dans le fil y apparaît sans quitter la page */
  var medGCharge = React.useRef(false);
  /* recharge de la galerie : à chaque ouverture de la carte Médias, puis toutes les 15 s tant qu'elle est affichée (photo publiée dans le fil → visible) */
  React.useEffect(function () {
    var vif = true; function vifQ() { return vif; }
    function tour() { try { if (document.querySelector(".hc-rep") && !document.hidden) chargerGalerie(moi, vifQ); } catch (e) { } }
    var t0 = setTimeout(tour, 300), t = setInterval(tour, 15000);
    return function () { vif = false; clearTimeout(t0); clearInterval(t); };
  }, [ongletChoisi, moi && moi.id]);
  async function chargerGalerie(u, estVif) {
    function vifF() { return estVif ? estVif() : true; }
    try {
        var postsG = [], vusP = {};
        var rvl = await supa.from("commentaires").select("id, user_id, photo_url, medias, prive, created_at, texte, liens").eq("cible", "agenda:" + idEv).order("created_at", { ascending: false }).limit(400);
        ((rvl && !rvl.error && rvl.data) || []).forEach(function (po) { if (po.prive && !(u && po.user_id === u.id)) return; if (!vusP[po.id]) { vusP[po.id] = 1; postsG.push(po); } });
        try { if (typeof hypePostsAgenda === "function") { var rpa2 = await hypePostsAgenda(idEv); ((rpa2 && rpa2.data) || []).forEach(function (po) { if (!po || (po.prive && !(u && po.user_id === u.id))) return; if (!vusP[po.id]) { vusP[po.id] = 1; postsG.push(po); } }); } } catch (ePa) { }
        /* 09/11 13h35 : media et video_mux_id ne sont PAS lisibles (droits par colonne, lecture via team_video_lecture) : les demander vidait toute la liste */
        var rtg = await supa.from("team_videos").select("id, groupe_id, vignette, duree, auteur_id, epreuve, resultat, publique, cree_le").eq("agenda_id", idEv).order("cree_le", { ascending: false }).limit(300);
        var tvG = (rtg && !rtg.error && rtg.data) || [];
        /* 09/11 15h25 (Blandine : « j'avais déjà renseigné les cavaliers et chevaux ») : les rattachements faits dans la vidéothèque de la Team */
        if (tvG.length) {
          var idsTv = tvG.map(function (v) { return v.id; });
          try { var rcv = await supa.from("team_videos_cavaliers").select("video_id, user_id").in("video_id", idsTv); var rch = await supa.from("team_videos_chevaux").select("video_id, cheval_id").in("video_id", idsTv);
            tvG.forEach(function (v) { v.__cav = ((rcv && rcv.data) || []).filter(function (c) { return c.video_id === v.id; }).map(function (c) { return String(c.user_id); }); v.__ch = ((rch && rch.data) || []).filter(function (c) { return c.video_id === v.id; }).map(function (c) { return String(c.cheval_id); }); }); } catch (eTc) { }
        }
        /* 09/11 14h10 : les vidéos de la Team s'identifient aussi (clé « teamvideo:<id> » dans identifications, comme « post: » / « album: ») */
        var urlsG = tvG.map(function (v) { return "teamvideo:" + v.id; }); postsG.forEach(function (po) { [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (m) { if (m && urlsG.indexOf(String(m)) === -1) urlsG.push(String(m)); }); });
        var identG = {};
        for (var iU = 0; iU < urlsG.length; iU += 200) { var ri = await supa.from("identifications").select("photo_url, type, cible_id, cible_nom, statut, auteur_id").in("photo_url", urlsG.slice(iU, iU + 200)); ((ri && !ri.error && ri.data) || []).forEach(function (x) { if (x.statut === "refuse") return; (identG[x.photo_url] = identG[x.photo_url] || []).push(x); }); }
        var idsRes = tvG.map(function (v) { return v.resultat; }).filter(Boolean), resCavG = {};
        if (idsRes.length) { var rrc = await supa.from("resultats").select("id, cavalier_id, cheval_id, epreuve").in("id", idsRes); ((rrc && !rrc.error && rrc.data) || []).forEach(function (x) { resCavG[x.id] = x; }); }
        var idsAu = []; postsG.concat(tvG).forEach(function (x) { var a = x.user_id || x.auteur_id; if (a && idsAu.indexOf(a) === -1) idsAu.push(a); });
        var auteursG = {}; if (idsAu.length) { var rau = await supa.from("profiles").select("id, pseudo").in("id", idsAu.slice(0, 300)); ((rau && rau.data) || []).forEach(function (x) { auteursG[x.id] = x.pseudo; }); }
        /* 09/11 22h30 (Blandine : « catastrophe visuelle » — « Cavalier », « Cheval » au lieu des prénoms) : les noms et photos des
           cavaliers et chevaux identifiés sont lus dans leurs fiches, même quand ils ne sont pas dans les engagements de ce concours */
        var nomsG = { cav: {}, ch: {} };
        try {
          var idsCavG = [], idsChG = [];
          function ajIdG(l, id) { id = String(id || ""); if (id && l.indexOf(id) === -1) l.push(id); }
          tvG.forEach(function (v) { (v.__cav || []).forEach(function (c) { ajIdG(idsCavG, c); }); (v.__ch || []).forEach(function (c) { ajIdG(idsChG, c); }); });
          Object.keys(identG).forEach(function (k) { (identG[k] || []).forEach(function (q) { if (q.type === "cavalier") ajIdG(idsCavG, q.cible_id); if (q.type === "cheval") ajIdG(idsChG, q.cible_id); }); });
          Object.keys(resCavG).forEach(function (k) { ajIdG(idsCavG, resCavG[k].cavalier_id); ajIdG(idsChG, resCavG[k].cheval_id); });
          if (idsCavG.length) { var rnc = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsCavG.slice(0, 200)); ((rnc && rnc.data) || []).forEach(function (x) { nomsG.cav[String(x.id)] = { nom: x.pseudo || "", ph: x.avatar_url || null }; }); }
          if (idsChG.length) { var rnh = await supa.from("chevaux").select("id, nom, photo_url").in("id", idsChG.slice(0, 200)); ((rnh && rnh.data) || []).forEach(function (x) { nomsG.ch[String(x.id)] = { nom: x.nom || "", ph: x.photo_url || null }; }); }
        } catch (eN) { }
        if (vifF()) { medGCharge.current = true; setMedG({ posts: postsG, tv: tvG, ident: identG, resCav: resCavG, auteurs: auteursG, noms: nomsG }); }
    } catch (eG) { if (vifF() && !medGCharge.current) setMedG({ posts: [], tv: [], ident: {}, resCav: {}, auteurs: {} }); }
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
        /* 09/11 : résultats du concours, par épreuve (seulement ceux rattachés à ce rendez-vous) */
        try {
          var rr = await supa.from("resultats").select("id, epreuve, place, partants, classement, mention, cavalier, cavalier_id, cheval_id, visible, masque_cavaliere, penalites, temps, gains, statut, origine, user_id").eq("agenda_id", idEv).limit(400);
          var lr = ((rr && !rr.error && rr.data) || []).filter(function (x) { return x.visible !== false || x.statut === "saisie"; });   /* 09/11 : un brouillon de la coach (saisie, pas encore publié) reste visible pour elle seule, filtré à l'affichage */
          try { var rtv = await supa.from("team_videos").select("id, groupe_id, resultat, vignette, duree").eq("agenda_id", idEv).not("resultat", "is", null); var mtv = {}; ((rtv && !rtv.error && rtv.data) || []).forEach(function (v) { (mtv[v.resultat] = mtv[v.resultat] || []).push(v); }); if (vif) setTvRes(mtv); } catch (eTv) { }
          if (lr.length) {
            var idsP = [], idsH = []; lr.forEach(function (x) { if (x.cavalier_id && idsP.indexOf(x.cavalier_id) === -1) idsP.push(x.cavalier_id); if (x.cheval_id && idsH.indexOf(x.cheval_id) === -1) idsH.push(x.cheval_id); });
            var pP = {}, pH = {};
            if (idsP.length) { var rpp = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsP); ((rpp && rpp.data) || []).forEach(function (x) { pP[x.id] = x; }); }
            if (idsH.length) { var rhh = await supa.from("chevaux").select("id, nom, alias").in("id", idsH); ((rhh && rhh.data) || []).forEach(function (x) { pH[x.id] = x; }); }
            lr.forEach(function (x) { x.__p = pP[x.cavalier_id] || null; x.__ch = pH[x.cheval_id] ? (pH[x.cheval_id].alias || pH[x.cheval_id].nom) : ""; });
          }
          if (vif) setResConc(lr);
        } catch (eRc) { }
        /* 08/11 : passages de toute l'équipe (fonction en base hype_passages_concours : équipe du club, coach, modératrice ; liste vide sinon) */
        try { supa.rpc("hype_passages_concours", { p_agenda: idEv }).then(function (rq) { if (vif && rq && !rq.error && Array.isArray(rq.data)) setPassagesEq(rq.data); }); } catch (eQ) { }
        try { supa.from("concours_groupes_detente").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true }).then(function (rg) { if (vif && rg && !rg.error && Array.isArray(rg.data)) setGrpD(rg.data); }); } catch (eGd) { }
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
          /* 09/11 — galerie des médias du concours : publications du fil + publications rattachées, vidéos de la Team,
             identifications existantes (table identifications : cavalier / cheval, aucune déduction par le cheval) */
          await chargerGalerie(u, function () { return vif; });
        } catch (eV) { }
        if (u && u.id) {
          try {
            var re = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).eq("cavalier_id", u.id);
            var mes = (re && !re.error && re.data) || [];
            /* 08/11 : ses tours 1 à 5 (concours_tours) ; sans tours enregistrés, les colonnes 1 et 2 comme avant */
            if (mes.length) {
              try {
                var rTm = await supa.from("concours_tours").select("*").in("engagement_id", mes.map(function (e) { return e.id; })).order("numero", { ascending: true });
                var parEm = {}; ((rTm && !rTm.error && rTm.data) || []).forEach(function (t) { (parEm[t.engagement_id] = parEm[t.engagement_id] || []).push(t); });
                mes = mes.map(function (e) { var lt = parEm[e.id] || []; return Object.assign({}, e, { tours: hsToursDepuis(e, lt), __toursIds: lt.map(function (t) { return t.cheval_id; }).filter(Boolean) }); });
              } catch (eTm) { }
            }
            if (vif) setMesEng(mes);
            /* 04/11 (étape 3) : consignes de ses chevaux engagés (cheval_consignes, mêmes droits que Santé)
               et l'historique du couple (resultats : elle + ce cheval). Une lecture refusée = section absente. */
            var idsCh = [];
            mes.forEach(function (e) { [e.cheval1_id, e.cheval2_id].concat(e.__toursIds || []).forEach(function (c) { if (c && idsCh.indexOf(c) === -1) idsCh.push(c); }); });
            if (idsCh.length) {
              try {
                var rcs = await supa.from("cheval_consignes").select("cheval_id, enrenement, materiel, soins").in("cheval_id", idsCh);
                if (vif && rcs && !rcs.error) setConsignes(rcs.data || []);
              } catch (eCs) { }
              try {
                try { var rcp = await supa.from("chevaux").select("id, nom, alias, photo_url").in("id", idsCh); var mc = {}; ((rcp && !rcp.error && rcp.data) || []).forEach(function (x) { mc[x.id] = x; }); if (vif) setChEng(mc); } catch (eCp) { }
                var rh = await supa.from("resultats").select("id, concours, epreuve, date_epreuve, classement, place, partants, points, cheval_id").eq("cavalier_id", u.id).in("cheval_id", idsCh).order("date_epreuve", { ascending: false }).limit(80);
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

  /* 08/11 (Blandine, maquette n° 5 « CSO Tigery » validée) : NOUVELLE FICHE CONCOURS. Grand héros photo, 4 cartes
     photographiques, bandeau Lieu | Départ | Reconnaissance, boutons « Je participe » et « Liste du van » ; dessous,
     les parties repliables Passages, Équipe, Ma préparation, Médias, Dossier. Aucune fonction retirée : tout ce que
     l'ancienne fiche montrait est rangé dans ces parties (même données, mêmes droits, mêmes écritures). */
  hsCssConcours();
  var heroPh = hsPhotoConcours(ev, idEv);
  function menuHaut() {
    return h("div", { className: "hc-haut" },
      h("button", { type: "button", className: "hc-rond", "aria-label": F("Retour"), onClick: retour }, rtl ? "›" : "‹"),
      h("div", { style: { position: "relative" } },
        h("button", { type: "button", className: "hc-rond", "aria-label": F("Plus"), onClick: function () { setMenuOuv(!menuOuv); } }, "•••"),
        menuOuv ? h("div", { className: "hc-menu", onClick: function () { setMenuOuv(false); } },
          gestion ? h("button", { type: "button", onClick: ouvrirEngagements }, F("Engagements et feuille d’engagement")) : null,
          gestion ? h("button", { type: "button", onClick: function () { ouvrirModifPassages(); } }, F("Modifier les passages")) : null,
          h("button", { type: "button", onClick: function () { if (gestion) ouvrir("dossier-concours"); else prep("dossier-concours"); } }, F("Le dossier")),
          !fini ? h("button", { type: "button", onClick: basculerPush }, pushEtat === "actif" ? F("✓ Alertes activées sur ce téléphone") : F("Me prévenir (alertes)")) : null,
          gestion ? h("button", { type: "button", onClick: modifierRdv }, F("Modifier le rendez-vous")) : null,
          h("button", { type: "button", onClick: function () { setOngletC("medias"); } }, F("Photos et commentaires")),
          ev && ev.lien_direct ? h("a", { href: ev.lien_direct, target: "_blank", rel: "noopener" }, F("Résultats en direct")) : null) : null));
  }
  /* 09/11 (Blandine : « adapte le héros à celui de la Vidéothèque… descends le bas de ton héros ») : même en-tête que la Vidéothèque
     (courbe du haut, grande photo fondue, courbe du bas avec le noir dessous, titre à droite en grand, date en italique) ;
     on garde le retour rond, le drapeau et le menu ••• posés dessus. */
  function heroC(titre, sous) {
    return h("div", { className: "hs-hero hc-hero" },
      (typeof SelecteurLangue === "function") ? h("div", { className: "hs-langue" }, h(SelecteurLangue, { compact: true })) : null,
      menuHaut(),
      hsCourbe(h, "c1", "M250 4 C 330 8, 385 40, 400 96"),
      h("div", { className: "hs-photo hc-photo-v", style: { "--hs-pos": heroPh.pos || "70% 40%" } },
        h("img", { src: heroPh.img, alt: "", "aria-hidden": "true", fetchpriority: "high", onError: function (e) { try { var sc = hsPhotoDe(idEv); if (e.target.dataset.r !== "1") { e.target.dataset.r = "1"; e.target.src = sc.img; } } catch (e0) { } } })),
      hsCourbe(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),
      h("div", { className: "hs-in" }, h("div", { className: "hs-titre" }, h("h1", { style: String(titre || "").length > 14 ? { fontSize: "clamp(34px,9.5vw,52px)", lineHeight: 1.05 } : null }, titre), sous ? h("p", null, sous) : null)));
  }
  var sousTitre = ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "";
  if (!ev) return h("div", { className: "hs hc", dir: rtl ? "rtl" : "ltr" }, heroC(F("Concours"), ""), h("div", { className: "hs-in" },
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
  /* 09/11 08h11 (Blandine) : à l'ouverture, la carte suit le moment — avant le concours Engagements, le jour même Passages, après : résultats et vidéos (aucune carte) */
  var hcAuj = (function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();
  var hcJourJ = !fini && String(ev.date_jour || "").slice(0, 10) <= hcAuj && String(ev.date_jour || "") !== "";
  var ongletC = ongletChoisi !== null ? ongletChoisi : (fini ? "resultats" : ((hcJourJ || gestion) ? "passages" : "engagements"));   /* 09/11 13h50 (Blandine : « les médias n'ont rien à faire en bas des résultats ») : concours passé = carte Résultats, seule */   /* la coach : Engagements est une page à part */
  var lieuCourt = String(ev.lieu || "").split(",")[0].trim();

  /* les passages de l'équipe (fonction hype_passages_concours : membres de l'équipe du club, coach, modératrice) */
  var parEpreuve = [];
  (passagesEq || []).forEach(function (p) {
    var cle = hsNomEpreuve(p.epreuve || "") || F("Épreuve à venir");
    var g = null; parEpreuve.forEach(function (x) { if (x.ep === cle) g = x; });
    if (!g) { g = { ep: cle, l: [] }; parEpreuve.push(g); }
    g.l.push(p);
  });
  parEpreuve.forEach(function (g) { g.l.sort(function (a, b) { return hsMinutes(a.passage) - hsMinutes(b.passage); }); g.debut = g.l.length ? g.l[0].passage : ""; });
  parEpreuve.sort(function (a, b) { return hsMinutes(a.debut) - hsMinutes(b.debut); });
  var couples = []; (passagesEq || []).forEach(function (p) {
    var k = (p.cavalier_id || p.pseudo) + "|" + (p.cheval_id || p.cheval_nom); var c = null; couples.forEach(function (x) { if (x.k === k) c = x; });
    if (!c) { c = { k: k, p: p, ep: [] }; couples.push(c); }
    var e = hsNomEpreuve(p.epreuve || ""); if (e && c.ep.indexOf(e) === -1) c.ep.push(e);
  });
  var mesLignes = mesEng.reduce(function (acc, e) {
    (e.tours || hsToursDepuis(e, null)).forEach(function (t) { acc.push({ ep: t.epreuve, ch: t.cheval_nom, cid: t.cheval_id, nu: t.numero, hp: t.passage, pi: t.piste, maj: e.passage_maj_le }); });
    return acc;
  }, []).sort(function (a, b) { return hsMinutes(a.hp) - hsMinutes(b.hp); });

  function allerA(idEl) { try { var el = document.getElementById(idEl); if (el) { setOuvert(function (o) { var n = Object.assign({}, o); n[idEl] = true; return n; }); setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); } } catch (e) { } }
  function carte(cle, titre, icone, img, action) {
    return h("button", { type: "button", className: "hc-carte" + (cartesOk[cle] ? "" : " sans") + (ongletC === cle ? " on" : ""), "aria-pressed": ongletC === cle, onClick: function () { if (cle === "engagements" && gestion) { ouvrirEngagements(); return; } if (cle === "medias") { setOngletC("medias"); setMedVue(""); setMedPage({ conc: true }); setMedPgSel(null); return; } setOngletC(ongletC === cle ? "" : cle); } },   /* 09/11 23h15 (Blandine : « en haut je croyais qu'on mettait le héros de la nouvelle page ») : Médias ouvre la page Médias du concours */   /* 09/11 08h32 : pour la coach, Engagements ouvre la page Engagements */
      h("img", { src: img, alt: "", "aria-hidden": "true", decoding: "async",   /* 09/11 : plus de chargement différé (cartes visibles dès l'ouverture) ; une 2e tentative avant d'abandonner */
        ref: function (el) { if (el && el.complete && el.naturalWidth && !cartesOk[cle]) setCartesOk(function (o) { if (o[cle]) return o; var n = Object.assign({}, o); n[cle] = true; return n; }); },
        onLoad: function () { setCartesOk(function (o) { if (o[cle]) return o; var n = Object.assign({}, o); n[cle] = true; return n; }); },
        onError: function (e) { try { var t = e.target; if (!t.dataset.reessai) { t.dataset.reessai = "1"; t.src = img + (img.indexOf("?") < 0 ? "?" : "&") + "r=" + Date.now(); } else t.style.display = "none"; } catch (e0) { } } }),
      cle === "medias" ? h("span", { className: "hc-lecture", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 16, height: 16 }, h("path", { d: "M9 6.5v11l9-5.5z", fill: "#F3EEE4" }))) : null,
      h("span", { className: "hc-c-pied" }, h("b", null, titre)));   /* 09/11 : plus d’icône, le titre seul en bas de la photo */
  }
  function partie(idP, titre, nb, enfants, ouvertDefaut) {
    var ouv = ouvert[idP] === undefined ? !!ouvertDefaut : ouvert[idP];
    return h("section", { id: idP, className: "hc-partie" + (ouv ? " ouv" : "") },
      h("button", { type: "button", className: "hc-p-tete", onClick: function () { setOuvert(function (o) { var n = Object.assign({}, o); n[idP] = !ouv; return n; }); } },
        h("b", null, titre), nb ? h("span", { className: "hc-nb" }, nb) : null, h("i", { "aria-hidden": "true" }, ouv ? "−" : "+")),
      ouv ? h("div", { className: "hc-p-corps" }, enfants) : null);
  }

  /* 09/11 (cahier « refinement ») : avatar = vraie photo de profil, sinon initiale sobre (plus l'illustration répétée) */
  function avatarHc(p, t) {
    var u = p && p.avatar_url ? String(p.avatar_url) : "";
    var src = u ? ((u.charAt(0) === "@") ? ((typeof CAV_IMGS !== "undefined" && CAV_IMGS[u.slice(1)]) || "") : u) : "";
    var nom = (p && p.pseudo) || "";
    return src ? h("img", { className: "hc-av", src: src, alt: "", style: t ? { width: t, height: t } : null })
      : h("span", { className: "hc-av hc-av-ini", style: t ? { width: t, height: t } : null }, nom ? nom.charAt(0).toUpperCase() : "·");
  }
  function nomP(p) { return (p && p.pseudo) || F("Cavalier non renseigné"); }
  var resDirect = {}; ((enDirect && enDirect.lignes) || []).forEach(function (d) { if (d.clt) resDirect[hsNomEpreuve(d.epreuve || "")] = d.clt + (d.clt === "1" ? "re" : "e"); });
  /* ── PASSAGES : une ligne par couple, rangée par épreuve ; « Ma journée » seulement quand la liste de l'équipe n'est pas lisible ── */
  var epAuto = null; parEpreuve.forEach(function (x) { if (!epAuto && moi && x.l.some(function (p) { return p.cavalier_id === moi.id; })) epAuto = x.ep; }); if (!epAuto && parEpreuve[0]) epAuto = parEpreuve[0].ep;
  var epCourant = epOuv === null ? epAuto : epOuv;
  var epPaddock = epCourant || epAuto;   /* le paddock suit l'épreuve dépliée (la dernière si on replie tout) */
  /* 09/11 14h53 — DÉCALER UNE ÉPREUVE depuis la carte Passages (coach) : même enregistrement que la page Jour J
     (concours_tours + colonnes 1/2 de concours_engagements), puis notification aux cavaliers concernés (notifier-passage). */
  async function decalerEpreuve(g) {
    if (!decEp || decEp.occ || !decEp.min) return;
    var d = Number(decEp.min); setDecEp(Object.assign({}, decEp, { occ: true, msg: "" }));
    try {
      var maint = new Date().toISOString(), ids = [], n = 0;
      for (var i = 0; i < g.l.length; i++) {
        var p = g.l[i]; var m = hsMinutes(hsHeurePropre(p.passage || "")); if (!(m < 99999)) continue;
        var nv = hsHeure(m + d), num = Number(p.numero) || 1;
        var rT = await supa.from("concours_tours").update({ passage: nv, passage_maj_le: maint }).eq("engagement_id", p.engagement_id).eq("numero", num).select("id");
        if (rT && rT.error) throw rT.error;
        if (num <= 2) { var col = {}; col["passage" + num] = nv; col.passage_maj_le = maint; var rE = await supa.from("concours_engagements").update(col).eq("id", p.engagement_id).select("id"); if (rE && rE.error) throw rE.error; }
        if (ids.indexOf(p.engagement_id) === -1) ids.push(p.engagement_id); n++;
      }
      /* les rendez-vous du paddock de cette épreuve suivent le même décalage */
      var nG = 0;
      for (var k = 0; k < (grpD || []).length; k++) { var gr = grpD[k]; if (hsNomEpreuve(gr.epreuve || "") !== g.ep || !gr.id) continue; var mg = hsMinutes(hsHeurePropre(gr.heure_rdv || "")); if (!(mg < 99999)) continue;
        var rG = await supa.from("concours_groupes_detente").update({ heure_rdv: hsHeure(mg + d) }).eq("id", gr.id).select("id"); if (rG && rG.error) throw rG.error; nG++; }
      if (nG) { try { var rg2 = await supa.from("concours_groupes_detente").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true }); if (rg2 && !rg2.error && Array.isArray(rg2.data)) setGrpD(rg2.data); } catch (eG2) { } }
      var txt = "✓ " + g.ep + " " + F("décalée de ") + (d > 0 ? "+" : "") + d + " min (" + n + " " + (n > 1 ? F("passages") : F("passage")) + (nG ? ", " + nG + " " + (nG > 1 ? F("groupes du paddock") : F("groupe du paddock")) : "") + ").";
      if (decEp.prev && ids.length) {
        try { var rn = await supa.functions.invoke("notifier-passage", { body: { agenda_id: idEv, engagements: ids } }); var dn = rn && rn.data;
          if (rn && rn.error) txt += " " + F("Notification impossible : ") + (rn.error.message || rn.error);
          else if (dn && dn.ok) txt += " " + (dn.envois ? F("Notification envoyée") + " (" + dn.envois + ")." : "") + (dn.sans_alertes ? " " + dn.sans_alertes + F(" cavalier(s) sans alertes activées.") : ""); } catch (eN) { txt += " " + F("Notification impossible."); }
      }
      try { var rq = await supa.rpc("hype_passages_concours", { p_agenda: idEv }); if (rq && !rq.error && Array.isArray(rq.data)) setPassagesEq(rq.data); } catch (eR) { }
      setDecEp({ ep: g.ep, fait: true, msg: txt });
    } catch (eD) { setDecEp(Object.assign({}, decEp, { occ: false, msg: F("Pas enregistré : ") + String((eD && eD.message) || eD) })); }
  }
  function panneauDecaler(g) {
    var avecH = g.l.filter(function (p) { return hsMinutes(hsHeurePropre(p.passage || "")) < 99999; });
    if ((!decEp || decEp.ep !== g.ep) && !avecH.length) return null;   /* rien à décaler (pas d'heures) : pas de case vide */
    if (!decEp || decEp.ep !== g.ep || decEp.fait) return h("div", { key: "dcb", className: "hc-dec-b" },
      (decEp && decEp.ep === g.ep && decEp.msg) ? h("div", { className: "hs-msg", style: { margin: "0 0 8px" } }, decEp.msg) : null,
      avecH.length ? h("button", { type: "button", className: "hc-btn-l", onClick: function () { setDecEp({ ep: g.ep, min: 0, prev: true }); } }, "⏱ " + F("Décaler l’épreuve")) : null);
    var d = Number(decEp.min) || 0;
    return h("div", { key: "dcp", className: "hc-dec" },
      h("div", { className: "hc-ged-k" }, F("Décaler") + " " + g.ep),
      h("div", { className: "hc-ged-ch", style: { justifyContent: "flex-start" } }, [-15, -10, -5, 5, 10, 15, 30].map(function (v) { return h("button", { key: v, type: "button", className: "hc-chip-p" + (d === v ? " on" : ""), onClick: function () { setDecEp(Object.assign({}, decEp, { min: v, msg: "" })); } }, (v > 0 ? "+" : "−") + Math.abs(v)); })),
      d ? h("div", { className: "hc-dec-l" }, avecH.map(function (p, i) { var m = hsMinutes(hsHeurePropre(p.passage)); return h("div", { key: i, className: "hc-dec-r" }, h("span", null, nomP(p) + (p.cheval_nom ? " · " + p.cheval_nom : "")), h("span", null, h("s", null, hsHeurePropre(p.passage)), " → ", h("b", null, hsHeure(m + d)))); })) : h("div", { className: "hs-note" }, F("Choisis de combien de minutes.")),
      h("label", { className: "hc-coche" }, h("input", { type: "checkbox", checked: !!decEp.prev, onChange: function (e) { setDecEp(Object.assign({}, decEp, { prev: e.target.checked })); } }), F("Prévenir les cavaliers sur leur téléphone")),
      decEp.msg ? h("div", { className: "hs-msg" }, decEp.msg) : null,
      h("div", { className: "hc-ged-fin" },
        h("button", { type: "button", className: "hc-btn-l", onClick: function () { setDecEp(null); } }, F("Annuler")),
        h("button", { type: "button", className: "hc-btn-l fort", disabled: !d || decEp.occ, onClick: function () { decalerEpreuve(g); } }, decEp.occ ? "…" : (d ? F("Décaler de ") + (d > 0 ? "+" : "−") + Math.abs(d) + " min" : F("Décaler")))));
  }
  var blocPassages = [
    (mesLignes.length && !parEpreuve.length) ? h("div", { key: "moi", className: "hc-liste" },
      mesLignes.map(function (x, i, tous) {
        var recent = x.maj && (Date.now() - new Date(x.maj).getTime() < 36 * 3600 * 1000);
        return h("div", { key: i, className: "hc-l" },
          tous.some(function (t) { return t.hp; }) ? h("span", { className: "hc-h" }, x.hp || "–") : null,   /* 09/11 : pas de colonne d'heure vide */
          h("div", { className: "hc-qui" }, h("b", null, x.ep || F("Épreuve à venir")),
            h("span", null, [x.ch, x.pi ? F("piste ") + x.pi : "", (x.hp && recent) ? F("heure mise à jour par ta coach") : ""].filter(Boolean).join(" · "))));
      })) : null,
    /* 09/11 12h (brief « Passages & Organisation du paddock ») : titre, bouton « Voir le direct » bien visible,
       une section repliable par épreuve dans l'ordre du concours, une seule ouverte (la sienne, sinon la première).
       Lignes : N° de passage (quand il est enregistré), cavalier · cheval, heure à droite si connue. Pas de photo. */
    parEpreuve.length ? h("div", { key: "pt", className: "hc-pas-tete" },
      h("h2", { className: "hc-pas-titre" }, F("Passages de l’équipe")),
      ev.lien_direct ? h("a", { className: "hc-direct" + (hcJourJ ? " vif" : ""), href: ev.lien_direct, target: "_blank", rel: "noopener" }, hcJourJ ? h("span", { className: "hc-direct-pt", "aria-hidden": "true" }) : null, F("Voir le direct"), h("span", { "aria-hidden": "true" }, rtl ? " ‹" : " ›")) : null) : null,
    parEpreuve.length ? h("div", { key: "eps", className: "hc-eps" }, parEpreuve.map(function (g, gi) {
      var ouv = !epFerme[g.ep];
      var pistes = []; g.l.forEach(function (p) { if (p.piste && pistes.indexOf(String(p.piste)) === -1) pistes.push(String(p.piste)); });
      return h("section", { key: "ep" + gi, className: "hc-ep" + (ouv ? " ouv" : "") },
        h("button", { type: "button", className: "hc-ep-b hc-ep-img", "aria-expanded": ouv, onClick: function () { var n = Object.assign({}, epFerme); n[g.ep] = ouv; setEpFerme(n); if (!ouv) setEpOuv(g.ep); } },
          /* 09/11 16h36 (Blandine : « des photos dans les onglets des épreuves ») : image de l'appli à droite, comme les encarts des vidéos */
          h("img", { className: "hc-ep-ph", src: HS_IMG_LOTS_EP[gi % 4], alt: "", loading: "lazy", decoding: "async", "aria-hidden": "true" }), h("span", { className: "hc-ep-voile", "aria-hidden": "true" }),
          h("b", null, g.ep),
          h("span", null, [pistes.length ? F("Piste ") + pistes.join(", ") : "", g.l.length + " " + (g.l.length > 1 ? F("passages") : F("passage"))].filter(Boolean).join(" · ")),
          h("span", { className: "hc-ep-chev", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 18, height: 18 }, h("path", { d: ouv ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6", fill: "none", stroke: "#C9A66B", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" })))),
        ouv ? h("div", { className: "hc-ep-l" }, (epPlus[g.ep] ? g.l : g.l.slice(0, 8)).map(function (p, i) {
          var moiLa = moi && p.cavalier_id === moi.id;
          var res = moiLa ? resDirect[hsNomEpreuve(p.epreuve || "")] : "";
          var num = p.ordre_passage || p.ordre || null;
          return h("div", { key: i, className: "hc-pl" + (moiLa ? " moi" : "") },
            g.l.some(function (t) { return t.ordre_passage || t.ordre; }) ? h("span", { className: "hc-pl-n" }, num ? F("N° ") + num : "") : null,
            h("span", { className: "hc-pl-q" }, h("b", null, nomP(p)), p.cheval_nom ? h("span", null, " · " + p.cheval_nom) : null, (p.numero > 1 && g.l.filter(function (q) { return q.cavalier_id === p.cavalier_id && q.cheval_nom === p.cheval_nom; }).length > 1) ? h("i", null, " · " + F("tour ") + p.numero) : null),
            res ? h("span", { className: "hc-res" }, res) : (p.passage ? h("span", { className: "hc-pl-h" }, p.passage) : null));
        }), g.l.length > 8 ? h("div", { className: "hc-pl-plus" }, h("button", { type: "button", className: "hs-lien", onClick: function () { var n = Object.assign({}, epPlus); n[g.ep] = !epPlus[g.ep]; setEpPlus(n); } }, epPlus[g.ep] ? F("Réduire") : (F("Voir les ") + (g.l.length - 8) + " " + F("autres passages")) + (epPlus[g.ep] ? " ⌃" : " ⌄"))) : null,
          gestion ? panneauDecaler(g) : null) : null);
    })) : null,
    (enDirect && enDirect.lignes && enDirect.lignes.length) ? h("div", { key: "direct", className: "hc-liste" },
      h("div", { className: "hc-ep-t" }, h("b", null, F("En direct")), h("button", { type: "button", className: "hs-lien", disabled: dvOcc, onClick: lireEnDirect }, dvOcc ? "…" : F("Actualiser"))),
      enDirect.lignes.map(function (d, i) {
        var res = d.clt ? (d.clt + (d.clt === "1" ? "re" : "e") + (d.points !== "" ? " · " + d.points + " pt" : "") + (d.temps ? " · " + d.temps + " s" : "")) : "";
        return h("div", { key: i, className: "hc-l" },
          h("span", { className: "hc-h" }, d.heure_estimee || "–"),
          h("div", { className: "hc-qui" }, h("b", null, d.epreuve), h("span", null, [d.cheval, F("n° ") + d.ordre + F(" sur ") + d.engages].filter(Boolean).join(" · "))),
          h("span", { className: "hc-res" }, res || F("à venir")));
      }),
      h("div", { className: "hs-note" }, F("Lu par Hype chez le chronométreur. Heure estimée, résultats provisoires pendant le concours."))) : null,
    (!mesLignes.length && !parEpreuve.length && !(enDirect && enDirect.lignes && enDirect.lignes.length)) ? h("div", { key: "vide", className: "hs-note", style: { marginTop: 0 } }, gestion ? F("Aucun couple engagé. Commence par la page Engagements.") : F("Les passages apparaîtront dès que ta coach les aura indiqués.")) : null,
    null   /* 09/11 : « Résultats en direct » est maintenant dans la carte Résultats */
  ];

  /* ── 09/11 — ORGANISATION DU PADDOCK (brief de Blandine) ──
     Groupes de détente par épreuve ; chaque membre est un COUPLE cavalier + cheval (Blandine 12h11). La coach compose,
     propose, publie ; les cavaliers ne voient que le publié (règle en base). Aucun pointage, aucun suivi de présence. */
  function cleCouple(p) { return String(p.engagement_id) + ":" + (p.numero || 1); }
  var infoCouple = {}; (passagesEq || []).forEach(function (p) { infoCouple[cleCouple(p)] = p; });
  function prenomDe(p) { var n = nomP(p); return String(n || "").split(/\s+/)[0]; }
  function minutesDe(t) { var m = String(t || "").toLowerCase().match(/(\d{1,2})\s*[h:]\s*(\d{0,2})/); return m ? Number(m[1]) * 60 + Number(m[2] || 0) : null; }
  function fmtMin(n) { if (n == null || isNaN(n)) return ""; n = (n + 1440) % 1440; return Math.floor(n / 60) + "h" + String(n % 60).padStart(2, "0"); }
  var grpListe = grpEd ? grpEd : grpD;
  var grpEp = grpListe.filter(function (g) { return hsNomEpreuve(g.epreuve || "") === epPaddock; });
  var gEp = null; parEpreuve.forEach(function (x) { if (x.ep === epPaddock) gEp = x; });
  /* conflits : un cavalier ou un cheval dans deux groupes à moins de 30 min d'écart */
  function conflitsDe(g) {
    var out = []; var hg = minutesDe(g.heure_rdv); if (hg == null) return out;
    (g.couples || []).forEach(function (c) {
      grpListe.forEach(function (o) {
        if (o === g || (o.id && o.id === g.id)) return; var ho = minutesDe(o.heure_rdv); if (ho == null || Math.abs(ho - hg) >= 30) return;
        (o.couples || []).forEach(function (d) {
          var memeCav = c.cavalier_id && d.cavalier_id === c.cavalier_id, memeCh = (c.cheval_id && d.cheval_id === c.cheval_id) || (!c.cheval_id && c.cheval_nom && d.cheval_nom === c.cheval_nom);
          if (memeCav || memeCh) { var p = infoCouple[c.engagement_id + ":" + (c.numero || 1)] || c; out.push((memeCav ? prenomDe(p) : (c.cheval_nom || "")) + F(" est aussi dans ") + (o.nom || F("un autre groupe")) + " · " + hsNomEpreuve(o.epreuve || "") + F(" à ") + (o.heure_rdv || "")); }
        });
      });
    });
    return out.filter(function (x, i, t) { return t.indexOf(x) === i; });
  }
  function membreCouple(c, k) {
    var p = infoCouple[c.engagement_id + ":" + (c.numero || 1)] || { pseudo: c.pseudo, avatar_url: null };
    return h("div", { key: k, className: "hc-gm" + (moi && p.cavalier_id === moi.id ? " moi" : "") }, avatarHc(p, 46), h("b", null, prenomDe(p)), h("span", null, c.cheval_nom || p.cheval_nom || ""));
  }
  var monGroupe = null; if (moi) grpD.forEach(function (g) { if (g.publie && (g.couples || []).some(function (c) { return c.cavalier_id === moi.id; })) { if (!monGroupe || hsNomEpreuve(g.epreuve) === epPaddock) monGroupe = g; } });
  /* ── outils de la coach ── */
  function ouvrirEditeur() { setGrpMsg(""); setGrpEd(grpD.map(function (g) { return Object.assign({}, g, { couples: (g.couples || []).slice() }); })); }
  function majBrouillon(f) { setGrpEd(function (l) { var n = (l || []).map(function (g) { return Object.assign({}, g, { couples: (g.couples || []).slice() }); }); f(n); return n; }); }
  function nouveauGroupe() { majBrouillon(function (n) { var k = n.filter(function (g) { return hsNomEpreuve(g.epreuve) === epPaddock; }).length + 1; n.push({ __nv: Date.now() + Math.random(), agenda_id: idEv, epreuve: epPaddock, nom: F("Groupe ") + k, heure_rdv: "", couples: [], ordre: n.length, publie: false }); }); }
  function affecter(p, cible) {   /* cible : groupe ou null (aucun) — déplace le couple dans le groupe choisi de cette épreuve */
    majBrouillon(function (n) {
      var cl = cleCouple(p);
      n.forEach(function (g) { if (hsNomEpreuve(g.epreuve) === epPaddock) g.couples = g.couples.filter(function (c) { return (c.engagement_id + ":" + (c.numero || 1)) !== cl; }); });
      if (cible) n.forEach(function (g) { if (g === cible || (g.id && g.id === cible.id) || (g.__nv && g.__nv === cible.__nv)) g.couples.push({ engagement_id: p.engagement_id, numero: p.numero || 1, cavalier_id: p.cavalier_id || null, cheval_id: p.cheval_id || null, cheval_nom: p.cheval_nom || null }); });
    });
  }
  function proposer() {   /* groupes de 4 à 6 couples dans l'ordre de passage ; rendez-vous 30 min avant le 1er passage du groupe quand on le connaît */
    if (!gEp) return;
    var l = gEp.l.slice().sort(function (a, b) { return ((a.ordre_passage || 999) - (b.ordre_passage || 999)) || (hsMinutes(a.passage) - hsMinutes(b.passage)); });
    var nbG = Math.max(1, Math.ceil(l.length / 6)); var taille = Math.ceil(l.length / nbG);
    majBrouillon(function (n) {
      for (var i = n.length - 1; i >= 0; i--) if (hsNomEpreuve(n[i].epreuve) === epPaddock) { if (n[i].id) n[i].__suppr = true; else n.splice(i, 1); }
      for (var k = 0; k < nbG; k++) {
        var part = l.slice(k * taille, (k + 1) * taille); if (!part.length) continue;
        var m1 = minutesDe(part[0].passage);
        n.push({ __nv: Date.now() + k, agenda_id: idEv, epreuve: epPaddock, nom: F("Groupe ") + (k + 1), heure_rdv: m1 == null ? "" : fmtMin(m1 - 30), publie: false, ordre: n.length,
          couples: part.map(function (p) { return { engagement_id: p.engagement_id, numero: p.numero || 1, cavalier_id: p.cavalier_id || null, cheval_id: p.cheval_id || null, cheval_nom: p.cheval_nom || null }; }) });
      }
    });
    setGrpMsg(F("Proposition prête : vérifie-la, modifie-la si besoin, puis publie. Rien n’est envoyé avant."));
  }
  async function enregistrerGroupes(publier) {
    if (!grpEd || grpOcc) return; setGrpOcc(true); setGrpMsg("");
    try {
      var maint = new Date().toISOString();
      for (var i = 0; i < grpEd.length; i++) {
        var g = grpEd[i];
        if (g.__suppr || (g.__vide = (!g.couples.length && !g.id && !g.heure_rdv))) { if (g.id && g.__suppr) { var rd = await supa.from("concours_groupes_detente").delete().eq("id", g.id); if (rd && rd.error) throw rd.error; } continue; }
        var ligne = { agenda_id: idEv, epreuve: g.epreuve, nom: String(g.nom || "").trim() || null, heure_rdv: hsHeurePropre(g.heure_rdv) || String(g.heure_rdv || "").trim() || null, couples: g.couples, ordre: i, maj_le: maint };
        if (publier && hsNomEpreuve(g.epreuve) === epPaddock) { ligne.publie = true; ligne.publie_le = maint; ligne.annonce_envoyee = false; ligne.rappel_envoye = false; }
        var r = g.id ? await supa.from("concours_groupes_detente").update(ligne).eq("id", g.id).select("id") : await supa.from("concours_groupes_detente").insert(ligne).select("id");
        if (r && r.error) throw r.error;
      }
      var rg = await supa.from("concours_groupes_detente").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true });
      if (rg && !rg.error) setGrpD(rg.data || []);
      setGrpEd(null);
      setGrpMsg(publier ? F("✓ Groupes publiés : les cavaliers concernés sont prévenus, puis rappelés 20 minutes avant leur rendez-vous.") : F("✓ Groupes enregistrés (pas encore publiés)."));
    } catch (eG) { setGrpMsg(F("Enregistrement impossible : ") + String((eG && eG.message) || eG)); }
    setGrpOcc(false);
  }
  function carteGroupe(g, gi) {
    var aMoi = moi && (g.couples || []).some(function (c) { return c.cavalier_id === moi.id; });
    var conf = gestion ? conflitsDe(g) : [];
    return h("div", { key: g.id || g.__nv || gi, className: "hc-grp" + (aMoi ? " moi" : "") },
      h("div", { className: "hc-grp-t" }, h("b", null, g.nom || (F("Groupe ") + (gi + 1))), g.heure_rdv ? h("span", null, g.heure_rdv) : null, (gestion && !g.publie) ? h("i", null, F("brouillon")) : null),
      (g.couples || []).length ? h("div", { className: "hc-gms" }, g.couples.map(membreCouple)) : h("div", { className: "hc-grp-vide" }, F("Aucun couple pour l’instant.")),
      conf.length ? h("div", { className: "hc-grp-conf" }, conf.map(function (x, i) { return h("div", { key: i }, "⚠ " + x); })) : null);
  }
  function editeur() {
    if (!gEp) return h("div", { className: "hs-note" }, F("Aucun couple dans cette épreuve."));
    var grs = grpEd.filter(function (g) { return !g.__suppr && hsNomEpreuve(g.epreuve) === epPaddock; });
    return h("div", { className: "hc-ged" },
      h("div", { className: "hc-ged-act" },
        h("button", { type: "button", className: "hc-btn-l", onClick: proposer }, F("Proposer des groupes")),
        h("button", { type: "button", className: "hc-btn-l", onClick: nouveauGroupe }, F("+ Nouveau groupe"))),
      grs.map(function (g, gi) {
        return h("div", { key: g.id || g.__nv, className: "hc-ged-g" },
          h("input", { className: "hc-ged-nom", value: g.nom || "", "aria-label": F("Nom du groupe"), onChange: function (e) { var v = e.target.value; majBrouillon(function (n) { n.forEach(function (x) { if ((x.id && x.id === g.id) || (x.__nv && x.__nv === g.__nv)) x.nom = v; }); }); } }),
          /* 09/11 14h15 (Blandine : « quand on écrit l'heure ce n'est pas clair, on peut même entrer 8 chiffres ») : vrai sélecteur d'heure (roue sur iPhone), enregistré au format 10h00 */
          h("input", { className: "hc-ged-h", type: "time", step: 300, value: (function () { var m = String(g.heure_rdv || "").match(/(\d{1,2})\s*[h:.]\s*(\d{2})?/i); return m ? (("0" + m[1]).slice(-2) + ":" + (m[2] || "00")) : ""; })(), "aria-label": F("Heure de rendez-vous au paddock"), onChange: function (e) { var t = String(e.target.value || ""), mm = t.match(/^(\d{2}):(\d{2})/); var v = mm ? (Number(mm[1]) + "h" + mm[2]) : ""; majBrouillon(function (n) { n.forEach(function (x) { if ((x.id && x.id === g.id) || (x.__nv && x.__nv === g.__nv)) x.heure_rdv = v; }); }); } }),
          h("button", { type: "button", className: "hc-ged-x", "aria-label": F("Supprimer le groupe"), onClick: function () { majBrouillon(function (n) { for (var i = n.length - 1; i >= 0; i--) { var x = n[i]; if ((x.id && x.id === g.id) || (x.__nv && x.__nv === g.__nv)) { if (x.id) x.__suppr = true; else n.splice(i, 1); } } }); } }, "×"));
      }),
      h("div", { className: "hc-ged-k" }, F("Couples de l’épreuve")),
      gEp.l.map(function (p, i) {
        var cl = cleCouple(p); var dans = null; grs.forEach(function (g) { if (g.couples.some(function (c) { return (c.engagement_id + ":" + (c.numero || 1)) === cl; })) dans = g; });
        return h("div", { key: i, className: "hc-ged-c" },
          h("div", { className: "hc-ged-q" }, (p.ordre_passage ? h("span", { className: "hc-pl-n" }, F("N° ") + p.ordre_passage) : null), h("b", null, prenomDe(p)), h("span", null, " · " + (p.cheval_nom || ""))),
          h("div", { className: "hc-ged-ch" }, grs.map(function (g, gi) { var on = dans === g; return h("button", { key: gi, type: "button", className: "hc-chip-p" + (on ? " on" : ""), onClick: function () { affecter(p, on ? null : g); } }, String(g.nom || "").replace(/^Groupe\s*/i, "G") || ("G" + (gi + 1))); })));
      }),
      h("div", { className: "hc-ged-fin" },
        h("button", { type: "button", className: "hc-btn-l", disabled: grpOcc, onClick: function () { setGrpEd(null); setGrpMsg(""); } }, F("Annuler")),
        h("button", { type: "button", className: "hc-btn-l", disabled: grpOcc, onClick: function () { enregistrerGroupes(false); } }, F("Enregistrer")),
        h("button", { type: "button", className: "hc-btn-l fort", disabled: grpOcc, onClick: function () { enregistrerGroupes(true); } }, grpOcc ? "…" : F("Publier aux cavaliers"))));
  }
  var blocPaddock = (parEpreuve.length && (gestion || grpD.some(function (g) { return g.publie; }))) ? h("div", { key: "pad", className: "hc-pad" },
    h("div", { className: "hc-pad-tete" },
      h("div", { className: "hc-pad-ic", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 26, height: 26 }, h("g", { fill: "none", stroke: "#C9A66B", strokeWidth: 1.4, strokeLinecap: "round" }, h("circle", { cx: 12, cy: 8, r: 3 }), h("circle", { cx: 5.5, cy: 9.5, r: 2.2 }), h("circle", { cx: 18.5, cy: 9.5, r: 2.2 }), h("path", { d: "M6.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M1.8 17.5c.4-2.2 1.8-3.6 3.7-3.6M22.2 17.5c-.4-2.2-1.8-3.6-3.7-3.6" })))),
      h("div", { className: "hc-pad-tt" }, h("h2", null, F("Organisation du paddock")), h("span", null, F("Groupes de détente") + " · " + (epPaddock || ""))),
      (gestion && !grpEd) ? h("button", { type: "button", className: "hc-btn-l", onClick: ouvrirEditeur }, h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, "aria-hidden": "true" }, h("path", { d: "M4 20h4L19 9l-4-4L4 16v4z", fill: "none", stroke: "#C9A66B", strokeWidth: 1.5, strokeLinejoin: "round" })), F("Modifier les groupes")) : null),
    (!gestion && monGroupe) ? h("div", { className: "hc-pad-moi" }, F("Ton groupe : ") + (monGroupe.nom || "") + (monGroupe.heure_rdv ? F(" · rendez-vous au paddock à ") + monGroupe.heure_rdv : "")) : null,
    grpEd ? editeur() : (grpEp.length ? h("div", { className: "hc-grps" }, grpEp.filter(function (g) { return gestion || g.publie; }).map(carteGroupe)) : h("div", { className: "hs-note", style: { marginTop: 0 } }, gestion ? F("Pas encore de groupe pour cette épreuve : touche « Modifier les groupes ».") : F("Les groupes de détente apparaîtront quand ta coach les aura publiés."))),
    grpMsg ? h("div", { className: "hs-msg" }, grpMsg) : null) : null;
  var blocRegles = parEpreuve.length ? h("div", { key: "reg", className: "hc-regles" },
    h("div", { className: "hc-reg-ic", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 34, height: 34 }, h("g", { fill: "none", stroke: "#C9A66B", strokeWidth: 1.3, strokeLinejoin: "round", strokeLinecap: "round" }, h("path", { d: "M12 2.8l7.5 3v5.6c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V5.8z" }), h("path", { d: "M8.6 12.2l2.4 2.4 4.6-4.8" })))),
    h("h3", null, F("Règles du paddock")),
    h("ul", null, [F("Ne rentre jamais seul au paddock : attends l’accord de ta coach."), F("Dès ton arrivée, signale à ta coach que tu es sur le paddock."), F("Ne quitte jamais le paddock sans l’accord de ta coach.")].map(function (t, i) { return h("li", { key: i }, h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, "aria-hidden": "true" }, h("path", { d: "M5 12.5l4.2 4.2L19 7", fill: "none", stroke: "#C9A66B", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" })), h("span", null, t)); }))) : null;

  /* ── ÉQUIPE : une ligne par cavalier (photo, nom, cheval) ; les épreuves restent dans Passages ── */
  var gens = [];
  function personne(id, p) { var g = null; gens.forEach(function (x) { if (x.id === id) g = x; }); if (!g) { g = { id: id, p: p, ch: [] }; gens.push(g); } return g; }
  couples.forEach(function (c) { var g = personne(c.p.cavalier_id || ("n:" + c.p.pseudo), c.p); if (c.p.cheval_nom && g.ch.indexOf(c.p.cheval_nom) === -1) g.ch.push(c.p.cheval_nom); });
  (inscrits || []).forEach(function (p) { personne(p.id, p); });
  var blocEquipe = [
    gens.length ? h("div", { key: "g", className: "hc-liste" }, gens.map(function (g, i) {
      return h("div", { key: i, className: "hc-l" }, avatarHc(g.p, 30),
        h("div", { className: "hc-qui" }, h("b", null, nomP(g.p)), g.ch.length ? h("span", null, g.ch.join(" · ")) : null));
    })) : h("div", { key: "vide", className: "hs-note", style: { marginTop: 0 } }, F("Personne n’est encore inscrit."))
  ];

  /* ── MA PRÉPARATION ── */
  var blocPrep = [
    !fini ? h("div", { key: "prep", className: "hs-carte" },
      h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("liste-van"); } },
        h("div", { className: "g" }, h("b", null, F("Ma liste du van")), h("span", null, F("à cocher, gardée d’un concours à l’autre"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›")),
      h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("dossier-concours"); } },
        h("div", { className: "g" }, h("b", null, F("Le dossier")), h("span", null, F("licence, vaccins du cheval, papiers"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›"))) : null,
    msgPrep ? h("div", { key: "mp", className: "hs-msg" }, msgPrep) : null,
    consignes.filter(function (c) { return c.enrenement || c.materiel || c.soins; }).map(function (c) {
      var nomC = ""; mesEng.forEach(function (e) { if (e.cheval1_id === c.cheval_id) nomC = e.cheval1_nom || nomC; if (e.cheval2_id === c.cheval_id) nomC = e.cheval2_nom || nomC; });
      return h("div", { key: "cs" + c.cheval_id },
        h("div", { className: "hc-sous" }, F("Consignes pour ") + (nomC || F("ton cheval"))),
        h("div", { className: "hs-carte" },
          c.materiel ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Matériel")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.materiel))) : null,
          c.enrenement ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Enrênement")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.enrenement))) : null,
          c.soins ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Soins")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.soins))) : null));
    }),
    !fini ? h("div", { key: "al" },
      h("div", { className: "hc-sous" }, F("Alertes")),
      h("button", { type: "button", className: "hs-btn doux", onClick: basculerPush }, pushEtat === "actif" ? F("✓ Alertes activées sur ce téléphone") : F("Me prévenir (alertes)")),
      h("div", { className: "hs-note" }, aAlerte
        ? F("Si tu participes et que les alertes sont activées, Hype te prévient 15 minutes avant le départ et avant la reconnaissance.")
        : F("Les alertes partiront dès que l’heure de départ ou de reconnaissance sera indiquée.")),
      pushMsg ? h("div", { className: "hs-msg" }, pushMsg) : null) : null
  ];

  /* ── RÉSULTATS PAR ÉPREUVE (09/11, Blandine : « un petit onglet avec les résultats par épreuve et ensuite les vidéos ») ──
     Nom affiché : le pseudo du compte, sinon le prénom + l'initiale du nom FFE (règle des cavaliers mineurs) ; jamais la licence. */
  function prenomInitiale(t) { var m = String(t || "").trim().split(/\s+/).filter(Boolean); if (m.length < 2) return m[0] || ""; var nom = m[0], pre = m.slice(1).join(" "); if (nom !== nom.toUpperCase()) { pre = m[0]; nom = m[m.length - 1]; } return pre.charAt(0).toUpperCase() + pre.slice(1).toLowerCase() + " " + nom.charAt(0).toUpperCase() + "."; }
  var resParEp = [];
  (resConc || []).forEach(function (r) { var k = hsNomEpreuve(r.epreuve || "") || F("Épreuve"); var g = null; resParEp.forEach(function (x) { if (x.ep === k) g = x; }); if (!g) { g = { ep: k, l: [] }; resParEp.push(g); } g.l.push(r); });
  resParEp.forEach(function (g) { g.l.sort(function (a, b) { return (a.place || 999) - (b.place || 999); }); });
  /* ── 09/11 12h30 — PAGE RÉSULTATS (brief de Blandine, capture « CSO Tigery ») ──
     Sources, sans rien inventer : (1) les résultats enregistrés dans Hype pour CE concours (resultats.agenda_id) — statut
     officiel (import FFE), provisoire (direct) ou saisie de la coach ; (2) le direct du chronométreur pour l'équipe
     (place, pénalités, temps) quand aucun résultat n'est encore enregistré ; (3) les passages, pour les épreuves à venir.
     Podiums : par épreuve, jamais de classement général inventé ; deux victoires = deux 1res places. */
  function estOfficiel(r) { return r.statut === "officiel" || (!r.statut && /import|telemat|ffe/i.test(String(r.origine || ""))); }
  function placeTxt(n) { n = Number(n); if (!n) return ""; return n + (lg === "fr" ? (n === 1 ? "er" : "e") : ""); }
  function etatDe(txt) {   /* mentions FFE / chronométreur → statut lisible ; null = classé */
    var t = String(txt || "").toLowerCase();
    if (/\bel\b|elim/.test(t)) return F("Éliminé"); if (/\bab\b|aband/.test(t)) return F("Abandon"); if (/np|non\s*part|forfait/.test(t)) return F("Non partant"); if (/\bnc\b|non\s*class/.test(t)) return F("Non classé");
    return null;
  }
  var lignesRes = {};   /* épreuve → { ep, l:[{cle, nom, p, cheval, place, etat, pen, temps, gains, sf, statut, id, vids}], partants, piste, nbEq } */
  function grpRes(ep) { var k = hsNomEpreuve(ep || "") || F("Épreuve"); if (!lignesRes[k]) lignesRes[k] = { ep: k, l: [], partants: 0, piste: "", nbEq: 0, ordre: 9999, num: "", url: "" }; return lignesRes[k]; }
  parEpreuve.forEach(function (g, gi) { var x = grpRes(g.ep); x.ordre = Math.min(x.ordre, gi); x.nbEq = g.l.length; var pi = []; g.l.forEach(function (p) { if (p.piste && pi.indexOf(String(p.piste)) === -1) pi.push(String(p.piste)); }); x.piste = pi.join(", "); });
  (resConc || []).forEach(function (r) {
    if (r.visible === false && !gestion) return;
    var x = grpRes(r.epreuve); if (r.partants) x.partants = Math.max(x.partants, Number(r.partants) || 0);
    var nom = (r.__p && r.__p.pseudo) || prenomInitiale(r.cavalier) || F("Cavalier non renseigné");
    x.l.push({ cle: "r" + r.id, id: r.id, nom: nom, p: r.__p || { pseudo: nom }, cavalier_id: r.cavalier_id, cheval: r.__ch || "", place: Number(r.place) || 0, etat: etatDe(r.classement) || etatDe(r.mention), pen: r.penalites || "", temps: r.temps || "", gains: r.gains, sf: /sf|sans\s*faute/i.test(String(r.mention || "")), statut: estOfficiel(r) ? "officiel" : (r.statut || "saisie"), brouillon: r.visible === false, vids: tvRes[r.id] || [] });
  });
  ((enDirect && enDirect.lignes) || []).forEach(function (d) {
    var x = grpRes(d.epreuve); if (d.engages) x.partants = Math.max(x.partants, Number(d.engages) || 0); if (d.num_epreuve) x.num = d.num_epreuve; if (d.url_resultats) x.url = d.url_resultats;
    var p = null; (passagesEq || []).forEach(function (q) { if (!p && q.engagement_id === d.engagement) p = q; });
    var deja = x.l.some(function (l) { return l.statut !== "direct" && p && l.cavalier_id && l.cavalier_id === p.cavalier_id && norm(l.cheval) === norm(d.cheval); });
    if (deja) return;
    x.l.push({ cle: "d" + d.engagement + d.cheval, nom: (p && nomP(p)) || prenomInitiale(d.nom), p: p || { pseudo: d.nom }, cavalier_id: p && p.cavalier_id, cheval: d.cheval || (p && p.cheval_nom) || "", place: /^\d+$/.test(String(d.clt || "")) ? Number(d.clt) : 0, etat: d.clt ? etatDe(d.clt) : null, pen: d.points !== "" && d.points != null ? String(d.points) : "", temps: d.temps || "", statut: "direct", attente: !d.clt, vids: [] });
  });
  function norm(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  var epsRes = Object.keys(lignesRes).map(function (k) { return lignesRes[k]; }).sort(function (a, b) { return a.ordre - b.ordre; });
  epsRes.forEach(function (x) {
    x.l.sort(function (a, b) { return (a.place || 999) - (b.place || 999); });
    var off = x.l.some(function (l) { return l.statut === "officiel"; }), dir = x.l.some(function (l) { return l.statut === "direct" || l.statut === "provisoire"; });
    x.etat = !x.l.length ? (fini ? F("Résultats en attente") : F("À venir")) : off ? F("Officiel") : (dir && !fini ? F("En cours") : (dir ? F("Provisoire") : F("Saisie coach")));
    x.meilleur = 0; x.l.forEach(function (l) { if (l.place && (!x.meilleur || l.place < x.meilleur)) x.meilleur = l.place; });
  });
  /* par défaut : toutes les épreuves qui ont des résultats sont dépliées (sinon la première) ; chacune se plie / déplie sans toucher aux autres */
  var auMoinsUneRes = epsRes.some(function (x) { return x.l.length; });
  function estOuverte(x, xi) { if (resOuv[x.ep] !== undefined) return !!resOuv[x.ep]; return auMoinsUneRes ? !!x.l.length : xi === 0; }
  function basculerEp(ep, v) { setResOuv(function (o) { var n = Object.assign({}, o); n[ep] = v; return n; }); }
  var epCourantRes = (epsRes.filter(function (x, xi) { return estOuverte(x, xi); })[0] || {}).ep;
  function lauriersPl(n, txt) { return h("span", { className: "hc-lp" + (n === 2 ? " ar" : n === 3 ? " br" : "") }, lauriers(), h("b", null, txt || n)); }
  function ouvrirVideo(v) { try { window.__teamMediasGroupe = v.groupe_id; window.__teamMediasOnglet = "videos"; window.__teamMediasOuvrir = v.id; } catch (e) { } setEcran("team-medias"); }
  /* bandeau du direct : résultats en direct + live vidéo (chaque accès seulement s'il existe ; badge seulement si la coach l'a mis en route) */
  /* 09/11 14h07 (Blandine) : le bandeau « Concours en direct » disparaît une fois le concours terminé ; un lien discret vers les résultats en ligne en bas */
  var bandeauDirect = (!fini && (ev.lien_direct || ev.lien_live || gestion)) ? h("div", { key: "bd", className: "hc-bd" },
    h("span", { className: "hc-bd-ic", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 22, height: 22 }, h("g", { fill: "none", stroke: "#C9A66B", strokeWidth: 1.5, strokeLinecap: "round" }, h("circle", { cx: 12, cy: 12, r: 2.2, fill: "#C9A66B" }), h("path", { d: "M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" })))),
    h("b", { className: "hc-bd-t" }, F("Concours en direct")),
    (ev.live_actif && ev.lien_live) ? h("span", { className: "hc-bd-live" }, F("EN DIRECT")) : null,
    h("span", { className: "hc-bd-acc" },
      ev.lien_direct ? h("a", { href: ev.lien_direct, target: "_blank", rel: "noopener" }, F("Résultats en direct"), " ↗") : null,
      ev.lien_live ? h("a", { href: ev.lien_live, target: "_blank", rel: "noopener", className: "live" }, h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, "aria-hidden": "true" }, h("circle", { cx: 12, cy: 12, r: 10, fill: "none", stroke: "#C9A66B", strokeWidth: 1.4 }), h("path", { d: "M10 8.5v7l5.5-3.5z", fill: "#C9A66B" })), F("Voir le live"), " ↗") : null,
      (gestion && !ev.lien_live && !ev.lien_direct) ? h("span", { className: "hc-bd-vide" }, F("Aucun lien pour l’instant")) : null),
    gestion ? h("button", { type: "button", className: "hc-bd-reg", onClick: function () { setLiveEd(liveEd ? null : { live: ev.lien_live || "", actif: !!ev.live_actif }); } }, F("Régler")) : null) : null;
  async function enregistrerLive() {
    if (!liveEd) return; var u = String(liveEd.live || "").trim();
    if (u && !/^https:\/\//i.test(u)) { setResMsg(F("Le lien du live doit commencer par https://")); return; }
    try { var r = await supa.from("club_agenda").update({ lien_live: u || null, live_actif: !!(u && liveEd.actif) }).eq("id", idEv).select("id"); if (r && r.error) throw r.error; setEv(Object.assign({}, ev, { lien_live: u || null, live_actif: !!(u && liveEd.actif) })); setLiveEd(null); setResMsg(""); }
    catch (eL) { setResMsg(F("Enregistrement impossible : ") + String((eL && eL.message) || eL)); }
  }
  async function enregistrerLienRes() {
    var u = String(lienResEd || "").trim();
    if (u && !/^https:\/\//i.test(u)) { setResMsg(F("Le lien doit commencer par https://")); return; }
    try { var r = await supa.from("club_agenda").update({ lien_direct: u || null }).eq("id", idEv).select("id"); if (r && r.error) throw r.error; if (!r || !r.data || !r.data.length) throw new Error(F("refusé par la base")); setEv(Object.assign({}, ev, { lien_direct: u || null })); setLienResEd(null); setResMsg(""); }
    catch (eL) { setResMsg(F("Enregistrement impossible : ") + String((eL && eL.message) || eL)); }
  }
  var lienResBas = fini ? h("div", { key: "lrb", className: "hc-lres" },
    ev.lien_direct ? h("a", { href: ev.lien_direct, target: "_blank", rel: "noopener" }, F("Résultats complets en ligne"), " ↗") : null,
    (gestion && lienResEd === null) ? h("button", { type: "button", className: "hc-lres-r", onClick: function () { setLienResEd(ev.lien_direct || ""); } }, ev.lien_direct ? F("Modifier le lien") : F("+ Lien vers les résultats en ligne")) : null,
    (gestion && lienResEd !== null) ? h("div", { className: "hc-ged", style: { width: "100%" } },
      h("input", { className: "hc-in", value: lienResEd, placeholder: "https://…", onChange: function (e) { setLienResEd(e.target.value); } }),
      h("div", { className: "hc-ged-fin" }, h("button", { type: "button", className: "hc-btn-l", onClick: function () { setLienResEd(null); } }, F("Annuler")), h("button", { type: "button", className: "hc-btn-l fort", onClick: enregistrerLienRes }, F("Enregistrer")))) : null) : null;
  var regLive = (gestion && liveEd && !fini) ? h("div", { key: "rl", className: "hc-ged" },
    h("input", { className: "hc-in", value: liveEd.live, placeholder: F("Lien du live vidéo (https://…)"), onChange: function (e) { setLiveEd(Object.assign({}, liveEd, { live: e.target.value })); } }),
    h("label", { className: "hc-coche" }, h("input", { type: "checkbox", checked: !!liveEd.actif, onChange: function (e) { setLiveEd(Object.assign({}, liveEd, { actif: e.target.checked })); } }), F("La diffusion est en cours (affiche « EN DIRECT »)")),
    h("div", { className: "hs-note", style: { marginTop: 0 } }, F("Le lien des résultats en direct se règle dans Jour J.")),
    h("div", { className: "hc-ged-fin" }, h("button", { type: "button", className: "hc-btn-l", onClick: function () { setLiveEd(null); } }, F("Annuler")), h("button", { type: "button", className: "hc-btn-l fort", onClick: enregistrerLive }, F("Enregistrer")))) : null;
  /* saisie rapide de la coach (une épreuve, toutes ses lignes) — brouillon invisible, puis publication ; correction tracée */
  function ouvrirSaisie(x) {
    var gP = null; parEpreuve.forEach(function (g) { if (g.ep === x.ep) gP = g; });
    var vusS = {};
    var lignes = (gP ? gP.l : []).filter(function (p) { var c = (p.cavalier_id || String(p.pseudo || "").toLowerCase()) + "|" + (p.cheval_id || hsCleTour("", p.cheval_nom)); if (vusS[c]) return false; vusS[c] = 1; return true; }).map(function (p) {
      var r = null; (resConc || []).forEach(function (q) { if (!r && hsNomEpreuve(q.epreuve || "") === x.ep && q.cavalier_id && q.cavalier_id === p.cavalier_id && (!q.cheval_id || q.cheval_id === p.cheval_id)) r = q; });
      var et = r ? (etatDe(r.classement) ? r.classement : "") : "";
      return { p: p, id: r && r.id, avant: r || null, place: r && r.place ? String(r.place) : "", pen: (r && r.penalites) || "", temps: (r && r.temps) || "", gains: r && r.gains != null ? String(r.gains) : "", sf: !!(r && /sf|sans\s*faute/i.test(String(r.mention || ""))), etat: /el/i.test(et) ? "el" : /ab/i.test(et) ? "ab" : /np/i.test(et) ? "np" : /nc/i.test(et) ? "nc" : "" };
    });
    var lu = (arguments[1] || resLu || {})[x.ep] || null, nbLu = 0;
    if (lu) lignes.forEach(function (l) {
      var c = null; (lu.lignes || []).forEach(function (q) { if (!c && q && memeChR(q.cheval, l.p.cheval_nom) && (!q.cavalier || !l.p.pseudo || hsMemePers(q.cavalier, l.p.pseudo) || (lu.lignes || []).filter(function (z) { return z && memeChR(z.cheval, l.p.cheval_nom); }).length === 1)) c = q; });
      if (!c) return; nbLu++;
      var me = String(c.mention || "").toLowerCase();
      l.etat = /\bel|elim/.test(me) ? "el" : /\bab|aband/.test(me) ? "ab" : /np|non\s*part|forfait/.test(me) ? "np" : /nc|non\s*class/.test(me) ? "nc" : "";
      l.place = l.etat ? "" : String(c.place || "").replace(/\D/g, "");
      l.pen = String(c.penalites == null ? "" : c.penalites).trim();
      l.temps = String(c.temps || "").trim().replace(",", ".");
      l.gains = String(c.gains || "").replace(/[^\d.,]/g, "");
      l.sf = !l.etat && (/sf|sans\s*faute/.test(me) || l.pen === "0");
      l.lu = true;
    });
    var partLu = lu && String(lu.partants || "").replace(/\D/g, "");
    setResMsg(""); setResEd({ ep: x.ep, partants: partLu || (x.partants ? String(x.partants) : ""), lignes: lignes, lu: nbLu });
  }
  function normR(t) { return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function memeChR(a, b) { a = normR(a); b = normR(b); return !!a && !!b && (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
  function memeEpR(a, b) { a = normR(hsNomEpreuve(a)); b = normR(hsNomEpreuve(b)); if (!a || !b) return false; if (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return true; var aa = a.split(" "), bb = b.split(" "); return aa.length > 1 && aa.every(function (w) { return bb.indexOf(w) >= 0; }); }
  /* 09/11 13h30 — lire les résultats sur un ou plusieurs PDF / captures, puis ouvrir la saisie rapide pré-remplie */
  async function lireResultats(e) {
    var fs = Array.prototype.slice.call((e && e.target && e.target.files) || []);
    try { e.target.value = ""; } catch (eV) { }
    if (!fs.length) return;
    setResLect("en_cours"); setResMsg(""); setResEd(null);
    try {
      var imgs = [];
      for (var i = 0; i < fs.length && imgs.length < 8; i++) {
        var f = fs[i]; var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
        if (!estPdf && !/^image\//i.test(String(f.type || ""))) throw new Error(F("envoie une photo, une capture d’écran ou un PDF"));
        if (estPdf) imgs = imgs.concat((await hypePdfEnImages(f, 6, 2000)).images); else imgs.push(await hypeImageEnJpeg(f, 2000));
      }
      imgs = imgs.slice(0, 8);
      var equipe = []; parEpreuve.forEach(function (g) { g.l.forEach(function (p) { equipe.push({ cavalier: p.pseudo || "", cheval: p.cheval_nom || "", epreuve: g.ep }); }); });
      var eps = await hsLireResultats(imgs, equipe);
      var lu = {}, trouves = [];
      parEpreuve.forEach(function (g) {
        var cand = eps.filter(function (x) { return x && memeEpR(x.nom, g.ep); });
        /* une seule épreuve lue et une seule épreuve pour ces chevaux : on la prend même si le nom diffère */
        if (!cand.length) cand = eps.filter(function (x) { return x && (x.lignes || []).some(function (q) { return g.l.some(function (p) { return memeChR(q.cheval, p.cheval_nom); }); }) && !parEpreuve.some(function (g2) { return g2 !== g && memeEpR(x.nom, g2.ep); }); });
        if (!cand.length) return;
        var t = { partants: "", lignes: [] }; cand.forEach(function (x) { if (!t.partants && x.partants) t.partants = x.partants; t.lignes = t.lignes.concat(x.lignes || []); });
        var n = g.l.filter(function (p) { return t.lignes.some(function (q) { return q && memeChR(q.cheval, p.cheval_nom); }); }).length;
        if (!n) return;
        lu[g.ep] = t; trouves.push(g.ep + " (" + n + ")");
      });
      setResLu(lu);
      if (!trouves.length) { setResLect(F("Aucun résultat de l’équipe trouvé sur ce document. Vérifie que les chevaux de l’équipe y apparaissent.")); return; }
      setResLect(F("Lu : ") + trouves.join(" · ") + ". " + F("Vérifie chaque épreuve, puis touche « Publier »."));
      var prem = null; epsRes.forEach(function (x) { if (!prem && lu[x.ep]) prem = x; });
      if (prem) { basculerEp(prem.ep, true); ouvrirSaisie(prem, lu); }
    } catch (eL) { setResLect(F("Lecture impossible : ") + String((eL && eL.message) || eL)); }
  }
  async function enregistrerSaisie(publier) {
    if (!resEd || resOcc) return; setResOcc(true); setResMsg("");
    try {
      var u = moi || {}; var maint = new Date().toISOString(); var nb = 0, faits = {};
      var ETAT = { el: "El.", ab: "Ab.", np: "NP", nc: "NC" };
      for (var i = 0; i < resEd.lignes.length; i++) {
        var l = resEd.lignes[i]; var p = l.p;
        var vide = !l.place && !l.etat && !l.pen && !l.temps && !l.id; if (vide) continue;
        var cleR = (p.cavalier_id || nomP(p)) + "|" + (p.cheval_id || p.cheval_nom || ""); if (faits[cleR]) continue; faits[cleR] = 1;
        /* un résultat existe déjà pour ce couple dans cette épreuve (saisi ou importé) : on le met à jour au lieu d'en créer un second */
        if (!l.id) (resConc || []).forEach(function (q) { if (!l.id && hsNomEpreuve(q.epreuve || "") === resEd.ep && q.cavalier_id && q.cavalier_id === p.cavalier_id && (!q.cheval_id || !p.cheval_id || q.cheval_id === p.cheval_id)) { l.id = q.id; l.avant = q; } });
        var pa = parseInt(resEd.partants, 10) || null, pl = parseInt(l.place, 10) || null;
        var e = 0; try { e = (mesEng || []).length; } catch (eE) { }
        var ligne = { agenda_id: idEv, concours: ev.titre || null, date_epreuve: String(ev.date_jour || "").slice(0, 10) || null, annee: Number(String(ev.date_jour || "").slice(0, 4)) || null,
          epreuve: resEd.ep, place: l.etat ? null : pl, partants: pa, classement: l.etat ? (ETAT[l.etat] + (pa ? " / " + pa : "")) : (pl ? placeTxt(pl) + (pa ? " / " + pa : "") : null),
          mention: l.sf ? "SF" : null, penalites: String(l.pen || "").trim() || null, temps: String(l.temps || "").trim() || null, gains: l.gains !== "" && !isNaN(parseFloat(String(l.gains).replace(",", "."))) ? parseFloat(String(l.gains).replace(",", ".")) : null,
          cavalier_id: p.cavalier_id || null, cheval_id: p.cheval_id || null, cavalier: nomP(p), statut: (l.avant && estOfficiel(l.avant)) ? "officiel" : "saisie", maj_par: u.id || null, maj_le: maint };
        if (publier) ligne.visible = true; else if (!l.id) ligne.visible = false;
        var r;
        if (l.id) {
          r = await supa.from("resultats").update(ligne).eq("id", l.id).select("id");
          if (r && r.error) throw r.error;
          if (l.avant && l.avant.visible !== false) { try { await supa.from("resultats_corrections").insert({ resultat_id: l.id, avant: { place: l.avant.place, partants: l.avant.partants, classement: l.avant.classement, penalites: l.avant.penalites, temps: l.avant.temps, gains: l.avant.gains, mention: l.avant.mention }, apres: { place: ligne.place, partants: ligne.partants, classement: ligne.classement, penalites: ligne.penalites, temps: ligne.temps, gains: ligne.gains, mention: ligne.mention } }); } catch (eC) { } }
        } else {
          r = await supa.from("resultats").insert(Object.assign({ user_id: u.id, origine: "saisie", visible: !!publier }, ligne)).select("id");
          if (r && r.error) throw r.error;
        }
        nb++;
      }
      var rr = await supa.from("resultats").select("id, epreuve, place, partants, classement, mention, cavalier, cavalier_id, cheval_id, visible, masque_cavaliere, penalites, temps, gains, statut, origine, user_id").eq("agenda_id", idEv).limit(400);
      if (rr && !rr.error) { var lr = (rr.data || []).filter(function (x) { return x.visible !== false || x.statut === "saisie"; }); lr.forEach(function (x) { var o = null; (resConc || []).forEach(function (y) { if (y.id === x.id) o = y; }); x.__p = o && o.__p; x.__ch = o && o.__ch; if (!x.__ch) (passagesEq || []).forEach(function (q) { if (!x.__ch && q.cheval_id && q.cheval_id === x.cheval_id) x.__ch = q.cheval_nom; }); if (!x.__p) (passagesEq || []).forEach(function (q) { if (!x.__p && q.cavalier_id && q.cavalier_id === x.cavalier_id) x.__p = q; }); }); setResConc(lr); }
      var epFait = resEd.ep; setResEd(null);
      if (resLu && resLu[epFait]) { var lu2 = Object.assign({}, resLu); delete lu2[epFait]; setResLu(lu2);
        if (publier) { var suiv = null; epsRes.forEach(function (x) { if (!suiv && lu2[x.ep]) suiv = x; }); if (suiv) { basculerEp(suiv.ep, true); setTimeout(function () { ouvrirSaisie(suiv, lu2); }, 0); } } }
      setResMsg(publier ? F("✓ Résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums.") : F("✓ Brouillon enregistré : toi seule le vois."));
    } catch (eS) { setResMsg(F("Enregistrement impossible : ") + String((eS && eS.message) || eS)); }
    setResOcc(false);
  }
  /* 09/11 (étape 4) : la coach publie en un geste ce que le chronométreur affiche pour l'équipe → résultats « provisoire »
     (origine direct), rattachés au concours, au cavalier et au cheval. L'import du télémat les confirmera « officiel »
     sans doublon (rapprochement : même cheval, même jour, épreuve contenue dans celle de la FFE). */
  async function publierDirect(x) {
    if (resOcc) return; setResOcc(true); setResMsg("");
    try {
      var u = moi || {}; var maint = new Date().toISOString(); var n = 0;
      var ETAT = function (t) { t = String(t || "").toLowerCase(); return /\bel\b|elim/.test(t) ? "El." : /\bab\b|aband/.test(t) ? "Ab." : /np|forfait/.test(t) ? "NP" : /\bnc\b/.test(t) ? "NC" : ""; };
      for (var i = 0; i < x.l.length; i++) {
        var l = x.l[i]; if (l.statut !== "direct" || l.attente) continue;
        if (x.l.some(function (q, j) { return j !== i && q.statut !== "direct" && l.p && q.cavalier_id && q.cavalier_id === l.p.cavalier_id && norm(q.cheval) === norm(l.cheval); })) continue;   /* déjà un résultat pour ce couple */
        if (x.l.slice(0, i).some(function (q) { return q.statut === "direct" && q.p && l.p && q.p.cavalier_id && q.p.cavalier_id === l.p.cavalier_id && norm(q.cheval) === norm(l.cheval); })) continue;   /* même couple deux fois dans le direct */
        var p = l.p || {}; var et = l.place ? "" : ETAT(l.etat);
        if (!l.place && !et) continue;
        var ligne = { user_id: u.id, origine: "direct", statut: "provisoire", visible: true, agenda_id: idEv, concours: ev.titre || null,
          date_epreuve: String(ev.date_jour || "").slice(0, 10) || null, annee: Number(String(ev.date_jour || "").slice(0, 4)) || null, epreuve: x.ep,
          place: l.place || null, partants: x.partants || null, classement: l.place ? (placeTxt(l.place) + (x.partants ? " / " + x.partants : "")) : (et + (x.partants ? " / " + x.partants : "")),
          penalites: l.pen || null, temps: l.temps || null, mention: (String(l.pen) === "0" && l.place) ? "SF" : null,
          cavalier_id: p.cavalier_id || null, cheval_id: p.cheval_id || null, cavalier: l.nom, maj_par: u.id || null, maj_le: maint };
        var r = await supa.from("resultats").insert(ligne).select("id"); if (r && r.error) throw r.error; n++;
      }
      var rr = await supa.from("resultats").select("id, epreuve, place, partants, classement, mention, cavalier, cavalier_id, cheval_id, visible, masque_cavaliere, penalites, temps, gains, statut, origine, user_id").eq("agenda_id", idEv).limit(400);
      if (rr && !rr.error) { var lr = (rr.data || []).filter(function (q) { return q.visible !== false || q.statut === "saisie"; }); lr.forEach(function (q) { (passagesEq || []).forEach(function (z) { if (!q.__ch && z.cheval_id && z.cheval_id === q.cheval_id) q.__ch = z.cheval_nom; if (!q.__p && z.cavalier_id && z.cavalier_id === q.cavalier_id) q.__p = z; }); (resConc || []).forEach(function (y) { if (y.id === q.id) { q.__p = q.__p || y.__p; q.__ch = q.__ch || y.__ch; } }); }); setResConc(lr); }
      setResMsg(n ? "✓ " + n + " " + (n > 1 ? F("résultats publiés") : F("résultat publié")) + F(" depuis le direct (provisoires, confirmés par l’import du télémat).") : F("Rien à publier : aucun classement lu pour l’instant."));
    } catch (eD) { setResMsg(F("Enregistrement impossible : ") + String((eD && eD.message) || eD)); }
    setResOcc(false);
  }
  /* 09/11 13h55 (Blandine : « une petite poubelle ou un crayon pour modifier si besoin un résultat ») */
  async function supprimerRes(id) {
    if (resOcc || !id) return; setResOcc(true); setResMsg("");
    try {
      var r = await supa.from("resultats").delete().eq("id", id).select("id");
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(F("refusé : seule la personne qui l’a ajouté ou la modératrice peut le supprimer"));
      setResConc((resConc || []).filter(function (q) { return q.id !== id; })); setResMod(null);
      setResMsg(F("✓ Résultat supprimé."));
    } catch (eS) { setResMsg(F("Suppression impossible : ") + String((eS && eS.message) || eS)); }
    setResOcc(false);
  }
  function editeurRes() {
    function maj(i, f) { setResEd(function (e) { var n = Object.assign({}, e, { lignes: e.lignes.slice() }); n.lignes[i] = Object.assign({}, n.lignes[i]); f(n.lignes[i]); return n; }); }
    return h("div", { className: "hc-ged hc-rsaisie" },
      h("div", { className: "hc-ged-k" }, F("Saisie rapide") + " · " + resEd.ep),
      resEd.lu ? h("div", { className: "hs-note hc-rs-lu", style: { marginTop: 0 } }, F("Rempli d’après ton document : vérifie, corrige si besoin, puis publie.")) : null,
      h("label", { className: "hc-rs-part" }, F("Partants"), h("input", { className: "hc-in", inputMode: "numeric", value: resEd.partants, onChange: function (e) { var v = e.target.value; setResEd(Object.assign({}, resEd, { partants: v })); } })),
      resEd.lignes.length ? resEd.lignes.map(function (l, i) {
        return h("div", { key: i, className: "hc-rs-l" },
          h("div", { className: "hc-rs-q" }, h("b", null, prenomDe(l.p)), h("span", null, " · " + (l.p.cheval_nom || ""))),
          h("div", { className: "hc-rs-c" },
            h("input", { className: "hc-in", placeholder: F("Place"), inputMode: "numeric", value: l.place, disabled: !!l.etat, onChange: function (e) { var v = e.target.value; maj(i, function (x) { x.place = v; }); } }),
            h("input", { className: "hc-in", placeholder: F("Pén."), value: l.pen, onChange: function (e) { var v = e.target.value; maj(i, function (x) { x.pen = v; }); } }),
            h("input", { className: "hc-in", placeholder: F("Temps"), value: l.temps, onChange: function (e) { var v = e.target.value; maj(i, function (x) { x.temps = v; }); } }),
            h("input", { className: "hc-in", placeholder: F("Gains €"), inputMode: "decimal", value: l.gains, onChange: function (e) { var v = e.target.value; maj(i, function (x) { x.gains = v; }); } })),
          h("div", { className: "hc-ged-ch" },
            [["sf", F("Sans-faute")], ["el", F("Éliminé")], ["ab", F("Abandon")], ["np", F("Non partant")], ["nc", F("Non classé")]].map(function (o) {
              var on = o[0] === "sf" ? l.sf : l.etat === o[0];
              return h("button", { key: o[0], type: "button", className: "hc-chip-p" + (on ? " on" : ""), onClick: function () { maj(i, function (x) { if (o[0] === "sf") x.sf = !x.sf; else { x.etat = on ? "" : o[0]; if (!on) { x.place = ""; x.sf = false; } } }); } }, o[1]);
            })));
      }) : h("div", { className: "hs-note" }, F("Aucun couple de l’équipe dans cette épreuve.")),
      h("div", { className: "hs-note", style: { marginTop: 0 } }, F("Une saisie de la coach n’est jamais présentée comme un résultat officiel : l’import du télémat FFE la confirmera.")),
      h("div", { className: "hc-ged-fin" },
        h("button", { type: "button", className: "hc-btn-l", disabled: resOcc, onClick: function () { setResEd(null); setResMsg(""); } }, F("Annuler")),
        h("button", { type: "button", className: "hc-btn-l", disabled: resOcc, onClick: function () { enregistrerSaisie(false); } }, F("Brouillon")),
        h("button", { type: "button", className: "hc-btn-l fort", disabled: resOcc, onClick: function () { enregistrerSaisie(true); } }, resOcc ? "…" : F("Publier"))));
  }
  var listeRes = epsRes.length ? h("div", { key: "lr", className: "hc-eps" }, epsRes.map(function (x, xi) {
    var ouv = estOuverte(x, xi);
    var info = [x.num ? F("N° ") + x.num : "", x.piste ? F("Piste ") + x.piste : "", x.partants ? x.partants + " " + F("partants") : "", x.nbEq ? x.nbEq + " " + F("de l’équipe") : ""].filter(Boolean).join(" · ");
    return h("section", { key: x.ep, className: "hc-ep" + (ouv ? " ouv" : "") },
      h("button", { type: "button", className: "hc-ep-b hc-rep-b", "aria-expanded": ouv, onClick: function () { basculerEp(x.ep, !ouv); } },
        h("b", null, x.ep),
        h("span", null, info, h("i", { className: "hc-etat" }, x.etat + (x.meilleur ? " · " + F("meilleur : ") + placeTxt(x.meilleur) : ""))),
        h("span", { className: "hc-ep-chev", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 18, height: 18 }, h("path", { d: ouv ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6", fill: "none", stroke: "#C9A66B", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" })))),
      ouv ? h("div", { className: "hc-ep-l" },
        (resEd && resEd.ep === x.ep) ? editeurRes() : [
          x.l.length ? x.l.filter(function (l) { return gestion || !l.brouillon; }).map(function (l) {
            var aVid = l.vids && l.vids.length;
            var peutMod = gestion && l.id;
            var modOuv = peutMod && resMod && resMod.id === l.id;
            return h(React.Fragment, { key: l.cle }, h("div", { className: "hc-rl" + (peutMod ? " ged" : "") + (moi && l.cavalier_id === moi.id ? " moi" : "") },
              h("span", { className: "hc-rl-pl" }, l.place ? (l.place <= 3 ? lauriersPl(l.place, placeTxt(l.place)) : h("b", null, placeTxt(l.place))) : h("i", null, l.etat || (l.attente ? F("En attente") : "–"))),
              avatarHc(l.p, 34),
              h("span", { className: "hc-rl-q" }, h("b", null, l.nom), h("span", null, [l.cheval, l.sf ? F("Sans-faute") : "", l.brouillon ? F("brouillon") : ""].filter(Boolean).join(" · "))),
              h("span", { className: "hc-rl-pen" }, l.pen !== "" ? (l.pen + " " + (Number(String(l.pen).replace(",", ".")) > 1 ? F("pts") : F("pt"))) : ""),
              h("span", { className: "hc-rl-t" }, l.temps ? String(l.temps).replace(/\.(\d+)$/, "”$1") : ""),
              aVid ? h("button", { type: "button", className: "hc-rl-v", "aria-label": F("Voir la vidéo du parcours"), onClick: function () { ouvrirVideo(l.vids[0]); } }, h("svg", { viewBox: "0 0 24 24", width: 22, height: 22 }, h("circle", { cx: 12, cy: 12, r: 10, fill: "none", stroke: "#C9A66B", strokeWidth: 1.3 }), h("path", { d: "M10 8.5v7l5.5-3.5z", fill: "#C9A66B" }))) : h("span", { className: "hc-rl-v" }),
              peutMod ? h("button", { type: "button", className: "hc-rl-m" + (modOuv ? " on" : ""), "aria-label": F("Modifier ou supprimer"), onClick: function () { setResMsg(""); setResMod(modOuv ? null : { id: l.id, sup: false }); } },
                h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": "true" }, h("path", { d: "M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4", fill: "none", stroke: "#C9A66B", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }))) : null),
              modOuv ? h("div", { className: "hc-rl-mp" }, resMod.sup
                ? [h("span", { key: "q" }, F("Supprimer ce résultat de ") + l.nom + " ?"),
                   h("span", { key: "b", className: "hc-rl-mb" }, h("button", { type: "button", className: "hs-lien", onClick: function () { setResMod({ id: l.id, sup: false }); } }, F("Non")),
                     h("button", { type: "button", className: "hc-btn-l rouge", disabled: resOcc, onClick: function () { supprimerRes(l.id); } }, resOcc ? "…" : F("Oui, supprimer")))]
                : h("span", { className: "hc-rl-mb" },
                    h("button", { type: "button", className: "hc-btn-l rouge", onClick: function () { setResMod({ id: l.id, sup: true }); } }, F("Supprimer")),
                    h("button", { type: "button", className: "hc-btn-l", onClick: function () { setResMod(null); ouvrirSaisie(x); } }, F("Corriger")))) : null);
          }) : h("div", { key: "v", className: "hc-rl-vide" }, x.etat),
          gestion ? h("div", { key: "act", className: "hc-ged-fin", style: { margin: "6px 0 12px" } },
            x.l.some(function (l) { return l.statut === "direct" && !l.attente; }) ? h("button", { type: "button", className: "hc-btn-l fort", disabled: resOcc, onClick: function () { publierDirect(x); } }, F("Publier les résultats du direct")) : null,
            h("button", { type: "button", className: "hc-btn-l", onClick: function () { ouvrirSaisie(x); } }, F("Saisir ou corriger"))) : null
        ]) : null);
  })) : (fini ? h("div", { key: "res0", className: "hs-note", style: { marginTop: 0, marginBottom: 12 } }, F("Les résultats de ce concours n’ont pas encore été ajoutés.")) : null);
  /* podiums de l'équipe : 1res, puis 2es, puis 3es ; à place égale, ordre des épreuves ; chaque podium garde son épreuve */
  var podiums = []; epsRes.forEach(function (x, xi) { x.l.forEach(function (l) { if (l.place >= 1 && l.place <= 3 && !l.brouillon) podiums.push({ l: l, ep: x.ep, o: xi }); }); });
  podiums.sort(function (a, b) { return (a.l.place - b.l.place) || (a.o - b.o); });
  var nbP = [0, 0, 0]; podiums.forEach(function (p) { nbP[p.l.place - 1]++; });
  var nbClasses = 0; epsRes.forEach(function (x) { x.l.forEach(function (l) { if (l.place && x.partants && l.place <= Math.max(1, Math.ceil(x.partants / 4)) && !l.brouillon) nbClasses++; }); });
  var blocPodiums = podiums.length ? h("div", { key: "pod", className: "hc-pod" },
    h("div", { className: "hc-pod-tete" }, h("h2", null, F("Les podiums de l’équipe"))),
    h("div", { className: "hc-pod-res" }, [nbP[0] ? nbP[0] + " " + (nbP[0] > 1 ? F("victoires") : F("victoire")) : "", nbP[1] ? nbP[1] + " " + (nbP[1] > 1 ? F("deuxièmes places") : F("deuxième place")) : "", nbP[2] ? nbP[2] + " " + (nbP[2] > 1 ? F("troisièmes places") : F("troisième place")) : "", nbClasses ? nbClasses + " " + (nbClasses > 1 ? F("classements") : F("classement")) : ""].filter(Boolean).join(" · ")),
    h("div", { className: "hc-pod-l" + (podiums.length > 3 ? " car" : "") }, podiums.map(function (p, i) {
      /* 09/11 15h20 (Blandine : « médaillons, la première proposition ») : photo du cheval (sinon du cavalier) en rond bordé or / argent / bronze, lauriers dessous */
      var rq = null; (resConc || []).forEach(function (q) { if (!rq && ("r" + q.id) === p.l.cle) rq = q; });
      var ph = (rq && rq.cheval_id && chPhotos[rq.cheval_id]) || (p.l.p && p.l.p.avatar_url) || "";
      var src = ph ? ((typeof vignetteHype === "function") ? vignetteHype(ph, 300, 300) : ph) : "";
      return h("div", { key: i, className: "hc-pod-c hc-pod-m" },
        h("div", { className: "hc-pod-ph" + (p.l.place === 2 ? " ar" : p.l.place === 3 ? " br" : "") },
          src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (e0) { } } }) : h("i", null, String(p.l.cheval || p.l.nom || "?").charAt(0).toUpperCase()),
          h("span", { className: "hc-pod-lr" }, lauriersPl(p.l.place))),
        h("b", null, p.l.nom), h("em", null, p.l.cheval || ""), h("span", null, p.ep + (p.l.sf ? " · " + F("Sans-faute") : "")));
    }))) : null;
  /* 09/11 14h15 (Blandine : « les pages sont un peu tristes, un ou deux petits onglets dans les couleurs de la page de l'équipe ») —
     cartes-liens au style de « Performances chevaux » (Team) : icône, filet, titre Cormorant, photo à droite */
  function icoLien(n) {
    var p = { jj: "M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8z", dos: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6", perf: "M4 20V12M10 20V7M16 20V3", moi: "M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6", vid: "M4 6h12v12H4zM16 10l4-2v8l-4-2", alb: "M3 6h18v13H3zM3 15l5-5 4 4 3-3 6 6M15 9.5a1.5 1.5 0 1 0 0-.01" }[n] || "";
    return h("svg", { viewBox: "0 0 24 24", width: 22, height: 22, "aria-hidden": "true" }, h("path", { d: p, fill: "none", stroke: "#C9A66B", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function carteLien(cle, ico, titre, sous, img, fn) {
    return h("button", { key: cle, type: "button", className: "hc-cl", onClick: fn },
      h("img", { src: img, alt: "", loading: "lazy", decoding: "async", className: "hc-cl-img", onError: function (e) { try { e.target.style.visibility = "hidden"; } catch (e0) { } } }),
      h("span", { className: "hc-cl-voile", "aria-hidden": "true" }),
      h("span", { className: "hc-cl-ico" }, icoLien(ico)), h("span", { className: "hc-cl-fil", "aria-hidden": "true" }),
      h("span", { className: "hc-cl-t" }, h("b", null, titre), sous ? h("small", null, sous) : null),
      h("span", { className: "hc-cl-chev", "aria-hidden": "true" }, rtl ? "‹" : "›"));
  }
  function cartesLiens(cle, l) { l = l.filter(Boolean); return l.length ? h("div", { key: cle, className: "hc-cls" }, l) : null; }
  var liensPassages = cartesLiens("cl-pas", [
    /* 09/11 14h15 (Blandine : « Passages, c'est la page Jour J ») : pas de carte Jour J ici */
    carteLien("dos", "dos", F("Dossier du concours"), F("licence, vaccins du cheval, papiers"), "images/concours-hero-cso.webp", function () { ouvrir("dossier-concours"); })]);
  var liensResultats = cartesLiens("cl-res", [
    carteLien("pc", "perf", F("Performances chevaux"), F("Classement de la saison"), "images/team-competition-performances-hero.webp", function () { try { window.__perfGroupe = null; window.__perfGroupeCourant = null; } catch (e) { } setEcran("performances-chevaux"); }),
    moi ? carteLien("pm", "moi", F("Mes performances"), F("Tous tes résultats de la saison"), "images/cavalier-acces-performances.webp", function () { try { window.__perfCavalierId = moi.id; } catch (e) { } setEcran("performances-cavalier"); }) : null]);
  var liensMedias = cartesLiens("cl-med", [
    (equipe && equipe.id) ? carteLien("vt", "vid", F("Vidéothèque de la Team"), F("Toutes les vidéos de l’équipe"), "images/cavalier-acces-videos.webp", function () { try { window.__teamMediasGroupe = equipe.id; window.__teamMediasOnglet = "videos"; } catch (e) { } setEcran("team-medias"); }) : null,
    carteLien("al", "alb", F("Album de l’écurie"), F("Les photos du club"), "images/albumEcurieEncart.jpg", function () { setEcran("album-ecurie"); })]);
  var boutonsBas = h("div", { key: "bb", className: "hc-bb" },
    (!fini && (epsRes.some(function (x) { return x.url; }) || ev.lien_direct)) ? h("a", { className: "hc-btn-l", href: (epsRes.filter(function (x) { return x.url && x.ep === epCourantRes; })[0] || {}).url || ev.lien_direct, target: "_blank", rel: "noopener" }, F("Classements complets"), " ↗") : null,
    h("button", { type: "button", className: "hc-btn-l", onClick: function () { setOngletC("medias"); } }, F("Revoir les vidéos")));   /* « Dossier du concours » : carte dans Passages (09/11 14h15) */
  var blocResultats = h("div", { key: "res" },
    bandeauDirect, regLive,
    (epsRes.length || gestion) ? h("div", { className: "hc-pas-tete" }, h("h2", { className: "hc-pas-titre" }, F("Résultats de l’équipe"))) : null,
    (gestion && parEpreuve.length) ? h("div", { key: "lire", className: "hc-lire-res" },
      h("label", { className: "hc-btn-l", style: { cursor: "pointer", opacity: resLect === "en_cours" ? 0.6 : 1 } },
        resLect === "en_cours" ? F("Lecture des résultats… (1 à 2 min)") : F("Lire les résultats (PDF ou capture)"),
        h("input", { type: "file", accept: "image/*,application/pdf", multiple: true, disabled: resLect === "en_cours", onChange: lireResultats, style: { display: "none" } })),
      (resLect && resLect !== "en_cours") ? h("div", { className: "hs-note", style: { marginTop: 8 } }, resLect)
        : h("div", { className: "hs-note", style: { marginTop: 8 } }, F("Le PDF des résultats, une capture du site FFE ou du chronométreur : les résultats de tes couples se remplissent tout seuls."))) : null,
    listeRes, resMsg ? h("div", { className: "hs-msg" }, resMsg) : null,
    blocPodiums, boutonsBas, liensResultats, lienResBas);
  /* ── MÉDIAS : une seule partie, sans filtres (09/11) — vidéos de parcours (commentaire seconde par seconde), vidéos de l'équipe,
     puis le fil du concours (photos, publications, commentaires, partage, ajout) ── */
  var blocMedias = [
    videos.length ? h("div", { key: "vp" },
      h("div", { className: "hc-sous" }, F("Vidéos de parcours")),
      h("div", { className: "hc-vids" }, videos.slice(0, 8).map(function (v, i) {
        var vg = hsVignetteVideo(v.media);
        return h("button", { type: "button", key: i, className: "hc-vid", onClick: function () { try { window.__videoParcours = { media: v.media, proprio: v.proprio, pseudo: v.pseudo, agenda: idEv, titre: ev.titre }; } catch (e) { } setEcran("video-parcours"); } },
          vg ? h("img", { src: vg, alt: "", loading: "lazy" }) : h("div", { className: "hc-vid-vide" }),
          h("span", null, "▶ " + (v.pseudo || "")));
      }))) : null,
    (typeof HypeVideosEquipeConcours === "function" && idEv) ? h("div", { key: "vqw", className: "hc-vq" }, h(HypeVideosEquipeConcours, { key: "vq" + idEv, agendaId: idEv })) : null,
    h("div", { key: "fil", id: "hs-fil" },
      (function () { try { window.__evPasse = null; window.__evPasseId = idEv; } catch (eW) { } return null; })(),
      (typeof EcranEvenementPasse !== "undefined") ? h(EcranEvenementPasse, { key: "ep" + idEv, integre: true }) : null)
  ];

  /* ── 09/11 — MÉDIAS DU CONCOURS (brief de Blandine) : UNE seule galerie — « Mes médias » d'abord, puis « Les médias de
     l'équipe » sans doublon ; filtres Tous / Vidéos / Photos et Cavalier · Cheval · Épreuve ; photos jamais rognées (le même
     cliché flouté derrière) ; visionneuse photo et lecteur vidéo existants. Un média est « à moi » si je l'ai ajouté, si l'on
     m'y a identifié, ou si c'est la vidéo de MON résultat — jamais déduit du cheval seul. */
  var itemsM = [];
  if (medG) {
    medG.posts.forEach(function (po) {
      [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (m) {
        if (!m) return; m = String(m); if (itemsM.some(function (x) { return x.url === m; })) return;
        var idt = medG.ident[m] || [];
        itemsM.push({ cle: m, url: m, video: hsEstVideo(m), auteur: po.user_id, post: po, date: po.created_at, epreuve: hsNomEpreuve((po.liens && po.liens.epreuve) || ""),
          cav: idt.filter(function (x) { return x.type === "cavalier"; }).map(function (x) { return String(x.cible_id); }),
          ch: idt.filter(function (x) { return x.type === "cheval"; }).map(function (x) { return String(x.cible_id); }) });
      });
    });
    var membreT = !!(equipe && equipe.membre);
    medG.tv.forEach(function (v) {
      if (!(membreT || v.publique || (moi && v.auteur_id === moi.id) || gestion)) return;
      var r = v.resultat ? medG.resCav[v.resultat] : null;
      var idtV = medG.ident["teamvideo:" + v.id] || [];
      var cavV = idtV.filter(function (q) { return q.type === "cavalier"; }).map(function (q) { return String(q.cible_id); }), chV = idtV.filter(function (q) { return q.type === "cheval"; }).map(function (q) { return String(q.cible_id); });
      (v.__cav || []).forEach(function (c) { if (cavV.indexOf(c) === -1) cavV.push(c); }); (v.__ch || []).forEach(function (c) { if (chV.indexOf(c) === -1) chV.push(c); });
      if (r && r.cavalier_id && cavV.indexOf(String(r.cavalier_id)) === -1) cavV.push(String(r.cavalier_id)); if (r && r.cheval_id && chV.indexOf(String(r.cheval_id)) === -1) chV.push(String(r.cheval_id));
      itemsM.push({ cle: "tv:" + v.id, url: "teamvideo:" + v.id, tv: v, video: true, vignette: v.vignette, duree: v.duree, auteur: v.auteur_id, date: v.cree_le, epreuve: hsNomEpreuve(v.epreuve || (r && r.epreuve) || ""),
        cav: cavV, ch: chV });
    });
    itemsM.sort(function (a, b) { return String(b.date || "").localeCompare(String(a.date || "")); });
  }
  var optCav = [], optCh = [];
  (passagesEq || []).forEach(function (p) { if (p.cavalier_id && !optCav.some(function (o) { return o.id === String(p.cavalier_id); })) optCav.push({ id: String(p.cavalier_id), nom: prenomDe(p) }); if (p.cheval_id && !optCh.some(function (o) { return o.id === String(p.cheval_id); })) optCh.push({ id: String(p.cheval_id), nom: p.cheval_nom || "" }); });
  if (moi && !optCav.some(function (o) { return o.id === String(moi.id); }) && itemsM.some(function (x) { return x.cav.indexOf(String(moi.id)) !== -1; })) optCav.push({ id: String(moi.id), nom: F("Moi") });
  var optEp = parEpreuve.map(function (g) { return g.ep; }); itemsM.forEach(function (x) { if (x.epreuve && optEp.indexOf(x.epreuve) === -1) optEp.push(x.epreuve); });
  var filtresActifs = !!(fCavM || fChM || fEpM);
  var itemsF = itemsM.filter(function (x) {
    if (medType === "videos" && !x.video) return false; if (medType === "photos" && x.video) return false;
    if (fCavM && x.cav.indexOf(fCavM) === -1) return false; if (fChM && x.ch.indexOf(fChM) === -1) return false; if (fEpM && x.epreuve !== fEpM) return false;
    return true;
  });
  /* 09/11 22h21 (Blandine : « quand c'est moi, mets quand même dans les médias de l'équipe quand tu vois qu'il y a d'autres
     cavaliers que moi ») : un média est « à moi » si l'on m'y a identifié ; si j'en suis l'autrice mais que d'autres cavaliers
     y sont identifiés (pas moi), il va dans « Les médias de l'équipe » ; sans aucune identification, il reste à son auteur. */
  function estAMoi(x) { if (!moi) return false; var mid = String(moi.id); if (x.cav.indexOf(mid) !== -1) return true; return x.auteur === moi.id && !x.cav.length; }
  var mesM = itemsF.filter(estAMoi), eqM = itemsF.filter(function (x) { return !estAMoi(x); });
  var nbV = itemsM.filter(function (x) { return x.video; }).length, nbP = itemsM.length - nbV;
  function dureeTxt(d) { d = Number(d); if (!d || isNaN(d)) return ""; var m = Math.floor(d / 60), s2 = Math.round(d % 60); return m + ":" + String(s2).padStart(2, "0"); }
  function vignetteDe(x) { if (x.video && x.ch && x.ch.length && chPhotos[x.ch[0]]) { var pc = chPhotos[x.ch[0]]; return (typeof vignetteHype === "function") ? vignetteHype(pc, 800, 500) : pc; }   /* 09/11 16h16 (Blandine) : couverture des vidéos = photo du cheval */
    if (x.tv) return x.tv.vignette || (x.tv.video_mux_id ? "https://image.mux.com/" + x.tv.video_mux_id + "/thumbnail.jpg?width=640&fit_mode=preserve" : hsVignetteVideo(x.tv.media)); if (x.video) return hsVignetteVideo(x.url); return (typeof grandeImageHype === "function") ? grandeImageHype(x.url, 900) : x.url; }
  function ouvrirMedia(x) {
    if (x.tv) { ouvrirVideo(x.tv); return; }
    if (x.video && /^mux:/.test(x.url)) { try { window.__videoParcours = { media: x.url, proprio: x.auteur, pseudo: (medG.auteurs || {})[x.auteur] || "", agenda: idEv, titre: ev.titre }; } catch (e) { } setEcran("video-parcours"); return; }
    setMedVisu(x.url);
  }
  /* 09/11 13h (Blandine : « pas de photo seule, tout aligné à même hauteur et largeur ») : les grilles se remplissent
     toujours ligne entière — s'il manque des cases sur la dernière ligne, la PREMIÈRE vignette s'élargit d'autant
     (même hauteur de ligne partout) ; aucune vignette isolée. */
  var colsGal = (function () { try { var w = window.innerWidth || 390; return w >= 900 ? 4 : (w >= 600 ? 3 : 2); } catch (e) { return 2; } })();
  /* « Mes médias » : la tête (1 grande + 2, ou 2 côte à côte) prend juste ce qu'il faut pour que la suite tombe en lignes pleines */
  var nHeros = (function () { var n = mesM.length; if (n <= 2) return n; if ((n - 3) % colsGal === 0) return 3; if ((n - 2) % colsGal === 0) return 2; return 3; })();
  if (medNM % colsGal) medNM = medNM - (medNM % colsGal) + colsGal;
  function grilleRemplie(liste, cle) {
    var n = liste.length; if (!n) return null;
    var reste = n % colsGal, large = reste ? (colsGal - reste + 1) : 1;
    return h("div", { key: cle, className: "hc-gal-grille", style: { gridTemplateColumns: "repeat(" + colsGal + ", 1fr)", "--cols": colsGal } },
      liste.map(function (x, i) { return h("div", { key: x.cle, className: "hc-gcase", style: i === 0 && large > 1 ? { gridColumn: "span " + Math.min(large, colsGal) } : null }, tuile(x, false)); }));
  }
  function tuile(x, grand) {
    var vg = vignetteDe(x);
    var peutId = moi && (x.auteur === moi.id || gestion);   /* 09/11 14h10 : vidéos de la Team comprises */
    return h("div", { key: x.cle, className: "hc-mt" + (grand ? " grand" : "") },
      h("button", { type: "button", className: "hc-mt-b", onClick: function () { ouvrirMedia(x); }, "aria-label": x.video ? F("Lire la vidéo") : F("Voir la photo") },
        vg ? [h("span", { key: "f", className: "hc-mt-fond", style: { backgroundImage: "url(\"" + vg + "\")" }, "aria-hidden": "true" }), h("img", { key: "i", src: vg, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (e0) { } } })] : h("span", { className: "hc-mt-vide" }),
        x.video ? h("span", { className: "hc-mt-play", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: grand ? 30 : 20, height: grand ? 30 : 20 }, h("path", { d: "M9 6.5v11l9-5.5z", fill: "#F3EEE4" }))) : null,
        (x.video && dureeTxt(x.duree)) ? h("span", { className: "hc-mt-d" }, dureeTxt(x.duree)) : null),
      peutId ? h("button", { type: "button", className: "hc-mt-id", "aria-label": F("Identifier"), onClick: function () { setMedMsg(""); setMedId({ x: x, cav: x.cav.slice(), ch: x.ch.slice(), ep: x.epreuve || "" }); } }, "⋯") : null);
  }
  async function enregistrerIdent() {
    if (!medId) return; var x = medId.x; setMedMsg("");
    try {
      var nouvC = medId.cav.filter(function (c) { return x.cav.indexOf(c) === -1; }), nouvH = medId.ch.filter(function (c) { return x.ch.indexOf(c) === -1; });
      /* vidéo de la Team : identifiée par sa coach ou son auteur → acceptée d'office (pas de vignette à valider ailleurs dans l'appli) */
      async function poser(type, id, nom) {
        if (!x.tv) { if (typeof identifierSouvenir === "function") return identifierSouvenir(x.url, type, id, nom); return null; }
        /* vidéo de la Team : mêmes rattachements que dans la vidéothèque (team_videos_cavaliers / team_videos_chevaux) */
        var ri = type === "cheval" ? await supa.from("team_videos_chevaux").insert({ video_id: x.tv.id, cheval_id: id }).select("video_id") : await supa.from("team_videos_cavaliers").insert({ video_id: x.tv.id, user_id: id }).select("video_id");
        if (ri && ri.error) throw ri.error; return ri;
      }
      if (x.tv && (medId.ep || "") !== (x.epreuve || "")) { var rE = await supa.rpc("team_video_epreuve", { p_id: x.tv.id, p_epreuve: medId.ep || "" }); if (rE && rE.error) throw rE.error; x.tv.epreuve = medId.ep || null; }
      for (var i = 0; i < nouvC.length; i++) { var oc = optCav.filter(function (o) { return o.id === nouvC[i]; })[0]; await poser("cavalier", nouvC[i], oc ? oc.nom : null); }
      for (var j = 0; j < nouvH.length; j++) { var oh = optCh.filter(function (o) { return o.id === nouvH[j]; })[0]; await poser("cheval", nouvH[j], oh ? oh.nom : null); }
      if ((medId.ep || "") !== (x.epreuve || "") && x.post) { var l2 = Object.assign({}, x.post.liens || {}, { epreuve: medId.ep || null }); var ru = await supa.from("commentaires").update({ liens: l2 }).eq("id", x.post.id).select("id"); if (ru && ru.error) throw ru.error; x.post.liens = l2; }
      var ident = Object.assign({}, medG.ident); var lst = (ident[x.url] || []).slice();
      var stI = x.tv ? "accepte" : "attente";
      nouvC.forEach(function (c) { lst.push({ photo_url: x.url, type: "cavalier", cible_id: c, statut: stI }); }); nouvH.forEach(function (c) { lst.push({ photo_url: x.url, type: "cheval", cible_id: c, statut: stI }); });
      ident[x.url] = lst; setMedG(Object.assign({}, medG, { ident: ident })); setMedId(null);
      setMedMsg(x.tv ? F("✓ Identification enregistrée.") : F("✓ Identification enregistrée. Les cavaliers identifiés sont prévenus et peuvent la confirmer."));
    } catch (eI) { setMedMsg(F("Enregistrement impossible : ") + String((eI && eI.message) || eI)); }
  }
  var panneauId = medId ? h("div", { key: "pid", className: "hc-ged hc-mid" },
    h("div", { className: "hc-ged-k" }, F("Qui est sur ce média ?")),
    optCav.length ? h("div", { className: "hc-ged-ch", style: { justifyContent: "flex-start" } }, optCav.map(function (o) { var on = medId.cav.indexOf(o.id) !== -1; return h("button", { key: o.id, type: "button", className: "hc-chip-p" + (on ? " on" : ""), disabled: on && medId.x.cav.indexOf(o.id) !== -1, onClick: function () { setMedId(Object.assign({}, medId, { cav: on ? medId.cav.filter(function (c) { return c !== o.id; }) : medId.cav.concat([o.id]) })); } }, o.nom); })) : null,
    optCh.length ? h("div", { className: "hc-ged-k" }, F("Cheval")) : null,
    optCh.length ? h("div", { className: "hc-ged-ch", style: { justifyContent: "flex-start" } }, optCh.map(function (o) { var on = medId.ch.indexOf(o.id) !== -1; return h("button", { key: o.id, type: "button", className: "hc-chip-p" + (on ? " on" : ""), disabled: on && medId.x.ch.indexOf(o.id) !== -1, onClick: function () { setMedId(Object.assign({}, medId, { ch: on ? medId.ch.filter(function (c) { return c !== o.id; }) : medId.ch.concat([o.id]) })); } }, o.nom); })) : null,
    (optEp.length && (medId.x.post || medId.x.tv) && moi && (medId.x.auteur === moi.id || gestion)) ? h("div", { className: "hc-ged-k" }, F("Épreuve")) : null,
    (optEp.length && (medId.x.post || medId.x.tv) && moi && (medId.x.auteur === moi.id || gestion)) ? h("div", { className: "hc-ged-ch", style: { justifyContent: "flex-start" } }, optEp.map(function (e2) { var on = medId.ep === e2; return h("button", { key: e2, type: "button", className: "hc-chip-p" + (on ? " on" : ""), onClick: function () { setMedId(Object.assign({}, medId, { ep: on ? "" : e2 })); } }, e2); })) : null,
    h("div", { className: "hs-note", style: { marginTop: 0 } }, F("Facultatif : n’identifie que ce dont tu es sûr.")),
    h("div", { className: "hc-ged-fin" }, h("button", { type: "button", className: "hc-btn-l", onClick: function () { setMedId(null); } }, F("Annuler")), h("button", { type: "button", className: "hc-btn-l fort", onClick: enregistrerIdent }, F("Enregistrer")))) : null;
  function sel(val, set, libre, opts) {
    return h("label", { className: "hc-fsel" + (val ? " on" : "") }, h("span", null, libre), h("select", { value: val, onChange: function (e) { set(e.target.value); setMedNM(12); setMedNE(24); } }, h("option", { value: "" }, F("Tous")), opts.map(function (o) { return h("option", { key: o.id || o, value: o.id || o }, o.nom || o); })));
  }
  var panneauAjout = medAjout ? h("div", { key: "paj", className: "hc-outils" },
    outil("ajF", F("Photos ou vidéos du concours"), F("Tu pourras ensuite identifier qui est dessus avec ⋯."), function () { setMedAjout(false); setFilOuv(true); setTimeout(function () { try { var el = document.getElementById("hs-fil"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { } }, 200); }),
    (equipe && equipe.membre) ? outil("ajT", F("Vidéo de parcours de l’équipe"), F("Rattachée à l’épreuve et au résultat."), function () { setMedAjout(false); try { window.__teamMediasGroupe = equipe.id; window.__teamMediasOnglet = "videos"; window.__teamMediasAjout = { agenda_id: idEv, titre: ev.titre, lieu: ev.lieu, date: ev.date_jour }; } catch (e) { } setEcran("team-medias"); }) : null) : null;
  /* ── 09/11 13h10 — nouvelle présentation (maquette « reportage ») : un grand média à l'honneur dans son format naturel,
     trois vignettes rondes à droite pour en changer, les autres en rangée dessous ; puis l'équipe en galerie horizontale
     (hauteur fixe, largeur naturelle → rien n'est rogné) ; « Ajouter des médias » puis les filtres, discrets, en bas. */
  function ico(nom) {
    var P = { video: "M3.5 7h11v10h-11zM14.5 10.5l5-3v9l-5-3", photo: "M4 5.5h16v13H4zM4 15l4.5-4.5 4 4 2.5-2.5L20 17M15.5 9.5h.01", cav: "M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2zM5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6", ch: "M6 20c0-5 2-8 6-10l1-4 2 3c2 1 3 3 3 5l-2 1-2-2-3 2v5", ep: "M8 4h8v4a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 12v4M9 20h6M10 16h4v4h-4z" };
    return h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, "aria-hidden": "true" }, h("path", { d: P[nom], fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function apercu(x, l) { return vignetteDe(x) ? ((typeof grandeImageHype === "function" && !x.video) ? grandeImageHype(x.url, l || 1200) : vignetteDe(x)) : ""; }
  var principal = mesM.filter(function (x) { return x.cle === medSel; })[0] || mesM[0] || null;
  var autresMes = mesM.filter(function (x) { return x !== principal; });
  var ronds = autresMes.slice(0, 3), rangee = autresMes.slice(3, 3 + medNM);
  function boutonId(x) { var ok = moi && (x.auteur === moi.id || gestion); return ok ? h("button", { type: "button", className: "hc-mt-id", "aria-label": F("Identifier"), onClick: function (e) { try { e.stopPropagation(); } catch (e0) { } setMedMsg(""); setMedId({ x: x, cav: x.cav.slice(), ch: x.ch.slice(), ep: x.epreuve || "" }); try { setTimeout(function () { var el = document.querySelector(".hc-mid"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60); } catch (e1) { } } }, "⋯") : null; }
  function vue(x, cls, larg, sansId) {   /* aperçu dans son format naturel (hauteur imposée par la classe, largeur libre) */
    var src = apercu(x, larg);
    return h("button", { type: "button", className: cls, onClick: function () { ouvrirMedia(x); }, "aria-label": x.video ? F("Lire la vidéo") : F("Voir la photo") },
      src ? h("span", { className: "hc-mt-fond", style: { backgroundImage: "url(\"" + src + "\")" }, "aria-hidden": "true" }) : null,   /* 09/11 soir : photo entière, le même cliché flouté derrière */
      src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (e0) { } } }) : h("span", { className: "hc-mt-vide" }),
      x.video ? h("span", { className: "hc-mt-play", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 18, height: 18 }, h("path", { d: "M9 6.5v11l9-5.5z", fill: "#F3EEE4" }))) : null,
      (x.video && dureeTxt(x.duree)) ? h("span", { className: "hc-mt-d" }, dureeTxt(x.duree)) : null,
      sansId ? null : boutonId(x));
  }
  var blocMes = (medG && moi && (mesM.length || !gestion)) ? h("div", { className: "hc-rep-s" },
    h("div", { className: "hc-rep-st" }, h("h3", null, F("Mes médias")), h("span", null, mesM.length + " " + (mesM.length > 1 ? F("médias") : F("média")))),
    principal ? [
      h("div", { key: "une", className: "hc-une" + (ronds.length ? "" : " seule") },
        h("div", { key: principal.cle, className: "hc-une-p" }, vue(principal, "hc-une-m", 1600)),
        ronds.length ? h("div", { className: "hc-ronds" }, ronds.map(function (x) {
          var src = apercu(x, 300);
          return h("button", { key: x.cle, type: "button", className: "hc-rond", onClick: function () { setMedSel(x.cle); }, "aria-label": F("Afficher ce média") },
            src ? h("img", { src: src, alt: "", loading: "lazy" }) : null,
            x.video ? h("span", { className: "hc-rond-v", "aria-hidden": "true" }, "▶") : null);
        })) : null),
      rangee.length ? h("div", { key: "rg", className: "hc-rangee", "data-hscroll": "1" }, rangee.map(function (x) {
        var src = apercu(x, 500);
        return h("button", { key: x.cle, type: "button", className: "hc-rg", onClick: function () { setMedSel(x.cle); try { var el = document.querySelector(".hc-une"); if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) { } } },
          src ? h("img", { src: src, alt: "", loading: "lazy" }) : h("span", { className: "hc-mt-vide" }),
          (x.video && dureeTxt(x.duree)) ? h("span", { className: "hc-mt-d" }, dureeTxt(x.duree)) : (x.video ? h("span", { className: "hc-mt-d" }, "▶") : null));
      }).concat(autresMes.length > 3 + medNM ? [h("button", { key: "plus", type: "button", className: "hc-rg hc-rg-plus", onClick: function () { setMedNM(medNM + 24); } }, F("Afficher plus"))] : [])) : null
    ] : h("div", { className: "hs-note", style: { marginTop: 0 } }, filtresActifs || medType !== "tous" ? F("Aucun de tes médias ne correspond à ces filtres.") : F("Tu n’as pas encore de média sur ce concours. Ajoute les tiens, ou demande qu’on t’identifie sur les photos de l’équipe."))) : null;
  var blocEq = medG ? h("div", { className: "hc-rep-s" },
    h("div", { className: "hc-rep-st" }, h("h3", null, F("Les médias de l’équipe")), h("span", null, eqM.length + " " + (eqM.length > 1 ? F("médias") : F("média")))),
    eqM.length ? h("div", { className: "hc-galh", "data-hscroll": "1" }, eqM.slice(0, medNE).map(function (x) { return h("div", { key: x.cle, className: "hc-galh-i" }, vue(x, "hc-galh-m", 900)); })
      .concat(eqM.length > medNE ? [h("button", { key: "plus", type: "button", className: "hc-galh-plus", onClick: function () { setMedNE(medNE + 24); } }, F("Afficher plus") + " (" + (eqM.length - medNE) + ")")] : []))
      : h("div", { className: "hs-note", style: { marginTop: 0 } }, (fCavM || fChM) && !itemsF.length ? F("Personne n’a encore été identifié sur les médias de ce concours avec ce filtre. Touche ⋯ sur une photo ou une vidéo pour dire qui est dessus.") : (filtresActifs || medType !== "tous" ? F("Aucun média de l’équipe ne correspond à ces filtres.") : F("Pas encore de média de l’équipe sur ce concours.")))) : null;
  /* ── 09/11 15h10 (Blandine : « les photos en haut, pour changer celle mise en avant sans que tout lague, et les vidéos en bas
     rangées par cavalier ou par cheval, comme la vidéothèque de la Team ») : plus de « Mes médias / Médias de l'équipe » ;
     les médias du cavalier connecté passent en premier. ── */
  var photosF = itemsF.filter(function (x) { return !x.video; }).sort(function (a, b) { return (estAMoi(b) ? 1 : 0) - (estAMoi(a) ? 1 : 0); });
  var videosF = itemsF.filter(function (x) { return x.video; });
  var phP = photosF.filter(function (x) { return x.cle === medSel; })[0] || photosF[0] || null;
  var phAutres = photosF.filter(function (x) { return x !== phP; });
  var phRonds = phAutres.slice(0, 3), phRangee = phAutres.slice(3, 3 + medNM);
  var blocPhotos = medG ? h("div", { className: "hc-rep-s" },
    h("div", { className: "hc-rep-st" }, h("h3", null, F("Les photos")), h("span", null, photosF.length + " " + (photosF.length > 1 ? F("photos") : F("photo")))),
    phP ? [
      h("div", { key: "une", className: "hc-une" + (phRonds.length ? "" : " seule") },
        h("div", { key: phP.cle, className: "hc-une-p" }, vue(phP, "hc-une-m", 1600)),
        phRonds.length ? h("div", { className: "hc-ronds" }, phRonds.map(function (x) {
          var src = apercu(x, 300);
          return h("button", { key: x.cle, type: "button", className: "hc-rond", onClick: function () { setMedSel(x.cle); }, "aria-label": F("Afficher ce média") }, src ? h("img", { src: src, alt: "", loading: "lazy" }) : null);
        })) : null),
      phRangee.length ? h("div", { key: "rg", className: "hc-rangee", "data-hscroll": "1" }, phRangee.map(function (x) {
        var src = apercu(x, 500);
        return h("button", { key: x.cle, type: "button", className: "hc-rg", onClick: function () { setMedSel(x.cle); try { var el = document.querySelector(".hc-une"); if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) { } } },
          src ? h("img", { src: src, alt: "", loading: "lazy" }) : h("span", { className: "hc-mt-vide" }));
      }).concat(phAutres.length > 3 + medNM ? [h("button", { key: "plus", type: "button", className: "hc-rg hc-rg-plus", onClick: function () { setMedNM(medNM + 24); } }, F("Afficher plus"))] : [])) : null
    ] : h("div", { className: "hs-note", style: { marginTop: 0 } }, filtresActifs ? F("Aucune photo ne correspond à ces filtres.") : F("Pas encore de photo sur ce concours."))) : null;
  /* vidéos : un groupe par cavalier (ou par cheval), les vidéos de chacun en rangée ; une vidéo non identifiée va dans « À identifier » */
  var grpsV = [], grpParId = {};
  function grpV(id, nom, photo) { if (!grpParId[id]) { grpParId[id] = { id: id, nom: nom, photo: photo, l: [] }; grpsV.push(grpParId[id]); } return grpParId[id]; }
  var medGrpE = medVue || medGrp;   /* 09/11 soir : la vue Explorer range photos ET vidéos (Par cavalier / Par cheval / Par épreuve) */
  (medVue ? itemsF : videosF).forEach(function (x) {
    if (medGrpE === "ep") { var ke = x.epreuve || ""; if (!ke) { grpV("__", F("Épreuve non précisée"), null).l.push(x); return; } grpV("ep:" + ke, ke, null).l.push(x); return; }
    var ids = medGrpE === "ch" ? x.ch : x.cav;
    if (!ids || !ids.length) { grpV("__", F("À identifier"), null).l.push(x); return; }
    ids.forEach(function (id) {
      var o = (medGrpE === "ch" ? optCh : optCav).filter(function (q) { return q.id === String(id); })[0];
      var ph = null; (passagesEq || []).forEach(function (pq) { if (!ph && medGrpE === "cav" && String(pq.cavalier_id) === String(id)) ph = pq.avatar_url; }); if (medGrpE === "ch") ph = chPhotos[id] || null; else if (!ph) (passagesEq || []).forEach(function (pq) { if (!ph && String(pq.cavalier_id) === String(id) && pq.cheval_id) ph = chPhotos[pq.cheval_id] || null; });
      var nG = medG && medG.noms && medG.noms[medGrpE === "ch" ? "ch" : "cav"][String(id)];   /* 09/11 22h30 : vrai nom lu dans la fiche */
      if (!ph && nG) ph = nG.ph || null;
      grpV(String(id), (o && o.nom) || (nG && nG.nom) || (medGrpE === "ch" ? F("Cheval") : F("Cavalier")), ph).l.push(x);
    });
  });
  var ordreEps = parEpreuve.map(function (g) { return g.ep; });
  grpsV.sort(function (a, b) { if (a.id === "__") return 1; if (b.id === "__") return -1;
    if (medGrpE === "ep") { var ia = ordreEps.indexOf(a.nom), ib = ordreEps.indexOf(b.nom); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || String(a.nom).localeCompare(String(b.nom)); } var am = moi && a.id === String(moi.id) ? -1 : 0, bm = moi && b.id === String(moi.id) ? -1 : 0; return (am - bm) || String(a.nom).localeCompare(String(b.nom)); });
  /* 09/11 soir — « EXPLORER LES MÉDIAS » (maquette validée) : vue distincte de la galerie, ouverte par « Par cavalier » ou
     « Par cheval » ; chaque lot = un cavalier (ou un cheval, ou une épreuve), avec SES photos et SES vidéos. Même média,
     même fichier : il apparaît dans chaque lot où il est identifié, rien n'est dupliqué en base. */
  var srcV = medVue ? itemsF : videosF;
  var blocVideos = medG ? h("div", { className: "hc-rep-s" + (medVue ? " hc-xp" : "") },
    medVue ? h("div", { className: "hc-xp-tete" },
      h("button", { type: "button", className: "hc-xp-ret", onClick: function () { setMedVue(""); try { var el = document.querySelector(".hc-onglet"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { } } },
        h("i", { "aria-hidden": "true" }, rtl ? "›" : "‹"), F("Médias du concours")),
      h("div", { className: "hc-md-sec" }, h("h2", null, medVue === "ch" ? F("Par cheval") : (medVue === "ep" ? F("Par épreuve") : F("Par cavalier"))), h("i", { "aria-hidden": "true" }), h("span", null, srcV.length + " " + (srcV.length > 1 ? F("médias") : F("média")))))
    : h("div", { className: "hc-rep-st" }, h("h3", null, F("Les vidéos")), h("span", null, videosF.length + " " + (videosF.length > 1 ? F("vidéos") : F("vidéo")))),
    srcV.length ? h("div", { className: "hc-ged-ch hc-xp-ch", style: { justifyContent: "flex-start", margin: "0 0 14px" } },
      [["cav", F("Par cavalier")], ["ch", F("Par cheval")], ["ep", F("Par épreuve")]].map(function (o) { return h("button", { key: o[0], type: "button", className: "hc-chip-p" + (medGrpE === o[0] ? " on" : ""), onClick: function () { if (medVue) setMedVue(o[0]); else setMedGrp(o[0]); } }, o[1]); })) : null,
    srcV.length ? grpsV.map(function (g, gi) {
      /* 09/11 15h14 (Blandine) : un bandeau photo + nom sépare chaque lot ; 2 vidéos côte à côte, la suite défile */
      return h("div", { key: g.id, className: "hc-vg" + (g.l.length === 1 ? " seule" : "") },
        /* 09/11 19h15 (Blandine, maquette : « retire leurs onglets et applique le design là ») : carte sombre, rond photo/initiale, nom, nombre, flèche pour replier */
        h("button", { type: "button", className: "hc-vg-h", "aria-expanded": !vgFerme[g.id], onClick: function () { var n = Object.assign({}, vgFerme); n[g.id] = !vgFerme[g.id]; setVgFerme(n); } },
          h("span", { className: "hc-vg-av" }, g.photo ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(g.photo, 160, 160) : g.photo, alt: "", loading: "lazy" })
            : (g.id === "__" ? h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, h("path", { d: "M6 20c0-5 2-8 6-10l1-4 2 3c2 1 3 3 3 5l-2 1-2-2-3 2v5", fill: "none", stroke: "#C9A66B", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" })) : h("b", null, String(g.nom || "?").charAt(0).toUpperCase()))),
          h("span", { className: "hc-vg-nm" }, h("b", null, g.nom), h("small", null, g.l.length + " " + (medVue ? (g.l.length > 1 ? F("médias") : F("média")) : (g.l.length > 1 ? F("vidéos") : F("vidéo"))))),
          h("span", { className: "hc-vg-chev", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 20, height: 20 }, h("path", { d: vgFerme[g.id] ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6", fill: "none", stroke: "#C9A66B", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" })))),
        vgFerme[g.id] ? null :
        h("div", { className: "hc-vg-l", "data-hscroll": "1" }, g.l.map(function (x) {
          /* 09/11 15h55 (Blandine) : sous la vidéo, le cheval (ou le cavalier en « Par cheval »), l'épreuve et le classement quand on l'a */
          var nomsAutre = medGrpE === "ep" ? [[x.cav.map(function (i) { var o = optCav.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; }).filter(Boolean).join(", "), x.ch.map(function (i) { var o = optCh.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; }).filter(Boolean).join(", ")].filter(Boolean).join(" & ")].filter(Boolean).concat([]).slice(0, 1) : (medGrpE === "ch" ? x.cav.map(function (i) { var o = optCav.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; }) : x.ch.map(function (i) { var o = optCh.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; })).filter(Boolean);
          var res = null; (resConc || []).forEach(function (r) { if (res || r.visible === false) return; if (x.tv && x.tv.resultat && r.id === x.tv.resultat) { res = r; return; }
            if (hsNomEpreuve(r.epreuve || "") === x.epreuve && r.cavalier_id && x.cav.indexOf(String(r.cavalier_id)) !== -1 && (!r.cheval_id || !x.ch.length || x.ch.indexOf(String(r.cheval_id)) !== -1)) res = r; });
          var etR = res ? (res.place ? placeTxt(res.place) + (res.partants ? " / " + res.partants : "") : (etatDe(res.classement) || "")) : "";
          return h("div", { key: x.cle, className: "hc-vg-i" }, vue(x, "hc-vg-m", 700, true),
            h("div", { className: "hc-vg-bas" }, h("div", { className: "hc-vg-txt" },
            nomsAutre.length ? h("span", { className: "hc-vg-ch" }, nomsAutre.join(", ")) : (x.cav.length || x.ch.length || !x.video ? null : h("span", { className: "hc-vg-ch" }, F("Vidéo"))),
            ((medGrpE !== "ep" && x.epreuve) || etR) ? h("span", { className: "hc-vg-ep" }, medGrpE === "ep" ? "" : (x.epreuve || ""), etR ? h("b", null, ((medGrpE !== "ep" && x.epreuve) ? " · " : "") + etR + (res && /sf|sans\s*faute/i.test(String(res.mention || "")) ? " · " + F("Sans-faute") : "")) : null) : null),
              (x.tv && typeof HypeJaimeTexte === "function") ? h("span", { className: "hc-vg-jm" }, h(HypeJaimeTexte, { key: "jv" + x.tv.id, cible: "teamvideo:" + x.tv.id, marge: 0 })) : null,
              (moi && (x.auteur === moi.id || gestion)) ? h("button", { type: "button", className: "hc-vg-mn", "aria-label": F("Identifier"), onClick: function () { setMedMsg(""); setMedId({ x: x, cav: x.cav.slice(), ch: x.ch.slice(), ep: x.epreuve || "" }); try { setTimeout(function () { var el = document.querySelector(".hc-mid"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60); } catch (e0) { } } }, "•••") : null));
        })));
    }) : h("div", { className: "hs-note", style: { marginTop: 0 } }, medVue ? F("Pas encore de média sur ce concours.") : (filtresActifs ? F("Aucune vidéo ne correspond à ces filtres.") : F("Pas encore de vidéo sur ce concours.")))) : null;
  function selF(val, set, libre, opts, ic) {
    return h("label", { className: "hc-fp" + (val ? " on" : "") }, ico(ic), h("span", null, val ? ((opts.filter(function (o) { return (o.id || o) === val; })[0] || {}).nom || val) : libre), h("i", { "aria-hidden": "true" }, "⌄"),
      h("select", { value: val, "aria-label": libre, onChange: function (e) { set(e.target.value); setMedSel(null); setMedNM(12); setMedNE(24); } }, h("option", { value: "" }, libre + " · " + F("Tous")), opts.map(function (o) { return h("option", { key: o.id || o, value: o.id || o }, o.nom || o); })));
  }
  /* ══ 09/11 soir — MÉDIAS DU CONCOURS, MAQUETTE VALIDÉE (ordinateur, tablette, iPhone) ══
     Sous le haut de la fiche (inchangé) : « Médias du concours » + « Ajouter des médias » ; « Les premiers souvenirs »
     (les 3 premiers médias publiés, toute l'équipe, en grand ; toucher une miniature la met à l'honneur) ; « Tous les
     souvenirs » (galerie collective photos + vidéos mêlées, chargée par paquets de 24 au fil du défilement) ; puis
     « Par cavalier » / « Par cheval », qui ouvrent la vue Explorer (ci-dessus). Photos jamais rognées : le même cliché
     flouté remplit la case. Visionneuse photo et lecteur vidéo existants (Hey Baby est dans le lecteur, pas ici). */
  var premiersM = itemsM.slice().sort(function (a, b) { return String(a.date || "").localeCompare(String(b.date || "")); }).slice(0, 3);
  function nomsDe(x) { var c = x.cav.map(function (i) { var o = optCav.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; }).filter(Boolean), c2 = x.ch.map(function (i) { var o = optCh.filter(function (q) { return q.id === i; })[0]; return o ? o.nom : ""; }).filter(Boolean); return [c.join(", "), c2.join(", ")].filter(Boolean).join(" · "); }
  function caseMd(x, cls, larg, action, style) {   /* une case : photo entière sur son propre flou, ▶ et durée pour les vidéos */
    var src = apercu(x, larg), qui = nomsDe(x);
    return h("div", { key: x.cle, className: "hc-md-c " + cls, style: style || null },
      h("button", { type: "button", className: "hc-md-b", onClick: action || function () { ouvrirMedia(x); }, title: qui || undefined, "aria-label": (x.video ? F("Lire la vidéo") : F("Voir la photo")) + (qui ? " — " + qui : "") },
        src ? h("span", { className: "hc-mt-fond", style: { backgroundImage: "url(\"" + src + "\")" }, "aria-hidden": "true" }) : null,
        src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; } catch (e0) { } } }) : h("span", { className: "hc-mt-vide" }),
        x.video ? h("span", { className: "hc-md-play", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 16, height: 16 }, h("path", { d: "M8.5 5.8v12.4l9.6-6.2z", fill: "#F3EEE4" }))) : null,
        (x.video && dureeTxt(x.duree)) ? h("span", { className: "hc-md-d" }, dureeTxt(x.duree)) : null));   /* pas de petits boutons sur la galerie : « qui est dessus » se règle dans Par cavalier / Par cheval (lot « À identifier ») */
  }
  function secMd(titre, droite) { return h("div", { className: "hc-md-sec" }, h("h3", null, titre), h("i", { "aria-hidden": "true" }), droite || null); }
  function sentinelle(el) {   /* chargement progressif : le paquet suivant arrive avant qu'on atteigne le bas */
    if (!el || el.__obs || typeof IntersectionObserver === "undefined") return;
    try { var o = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { o.disconnect(); setMedNE(function (n) { return n + 24; }); } }, { rootMargin: "700px 0px" }); o.observe(el); el.__obs = o; } catch (e) { }
  }
  function icoXp(n) {
    var d = n === "ch" ? "M7.5 20.5c.2-3.6 1.6-6.3 4.2-8.2l-1.3-3.6 2.9 1.9c.6-.9 1.4-2.3 1.6-4.1l1.4 2.4c2.5 1.4 3.9 3.6 4.1 6.3l-2.2.6-1.6-1.6-2.2 1.3c.3 1.8.1 3.5-.6 5" : "M12 11.6a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6zM4.6 20.5c.9-3.9 3.8-6 7.4-6s6.5 2.1 7.4 6";
    return h("svg", { viewBox: "0 0 24 24", width: 30, height: 30, "aria-hidden": "true" }, h("path", { d: d, fill: "none", stroke: "#C9A66B", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function accesXp(k, titre, sous) {
    return h("button", { key: k, type: "button", className: "hc-md-acc", onClick: function () { setMedVue(k); setMedId(null); try { var el = document.querySelector(".hc-onglet"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { } } },
      h("span", { className: "hc-md-acc-i" }, icoXp(k)),
      h("span", { className: "hc-md-acc-t" }, h("b", null, titre), h("small", null, sous)),
      h("span", { className: "hc-md-acc-c", "aria-hidden": "true" }, rtl ? "‹" : "›"));
  }
  var premP = premiersM[0] || null;   /* 09/11 21h10 : un seul média à l'honneur — le premier publié */
  var galTous = itemsM.filter(function (x) { return x !== premP; }), galM = galTous.slice(0, medNE);
  function mesurerMd(el) { if (!el) return; try { var w = el.clientWidth; if (w && Math.abs(w - medLarg) > 8) setMedLarg(w); } catch (e) { } }
  /* ══ 09/11 20h30 — « PAR CHEVAL » / « PAR CAVALIER » (maquettes ordinateur, tablette, iPhone validées) ══
     Une médiathèque par cheval (ou par cavalier) : la liste à choisir (colonne à gauche en grand, bande qui défile sur
     iPhone), un bandeau (photo entière, nom, « Ses médias sur ce concours », photos / vidéos, Ajouter des médias), les
     filtres croisés « Avec … » puis la mosaïque photos + vidéos à leurs vraies proportions. Filtrage croisé exact :
     Romy puis Yellow = Yellow puis Romy (mêmes médias). Rien n'est déduit : un média sans identification va dans
     « À identifier », jamais attribué d'office. Hey Baby : dans le lecteur vidéo, pas sur les vignettes. */
  var nomsCh = {}, nomsCav = {};
  optCh.forEach(function (o) { nomsCh[o.id] = o.nom; }); optCav.forEach(function (o) { nomsCav[o.id] = o.nom; });
  if (medG) Object.keys(medG.ident || {}).forEach(function (k) { (medG.ident[k] || []).forEach(function (q) { if (!q.cible_nom || !q.cible_id) return; var id = String(q.cible_id); if (q.type === "cheval" && !nomsCh[id]) nomsCh[id] = q.cible_nom; if (q.type === "cavalier" && !nomsCav[id]) nomsCav[id] = q.cible_nom; }); });
  if (medG && medG.noms) { Object.keys(medG.noms.cav).forEach(function (id) { if (!nomsCav[id] && medG.noms.cav[id].nom) nomsCav[id] = medG.noms.cav[id].nom; }); Object.keys(medG.noms.ch).forEach(function (id) { if (!nomsCh[id] && medG.noms.ch[id].nom) nomsCh[id] = medG.noms.ch[id].nom; }); }   /* 09/11 22h30 */
  if (moi && !nomsCav[String(moi.id)]) nomsCav[String(moi.id)] = F("Moi");
  var xModeCh = medVue === "ch", xCle = xModeCh ? "ch" : "cav", xAutre = xModeCh ? "cav" : "ch";
  var xNoms = xModeCh ? nomsCh : nomsCav, xNomsAutre = xModeCh ? nomsCav : nomsCh;
  function photoCh(id) { return chPhotos[id] || (medG && medG.noms && medG.noms.ch[String(id)] && medG.noms.ch[String(id)].ph) || null; }
  function photoCav(id) { var ph = null; (passagesEq || []).forEach(function (pq) { if (!ph && String(pq.cavalier_id) === String(id)) ph = pq.avatar_url || null; }); return ph || (medG && medG.noms && medG.noms.cav[String(id)] && medG.noms.cav[String(id)].ph) || null; }
  function xPhoto(id, modeCh) { return modeCh ? photoCh(id) : photoCav(id); }
  var xListe = [], xParId = {}, xSans = [];
  itemsM.forEach(function (x) {
    var ids = x[xCle] || [];
    if (!ids.length) { xSans.push(x); return; }
    ids.forEach(function (id) { if (!xParId[id]) { xParId[id] = { id: id, nom: xNoms[id] || (xModeCh ? F("Cheval") : F("Cavalier")), l: [] }; xListe.push(xParId[id]); } xParId[id].l.push(x); });
  });
  xListe.sort(function (a, b) { var am = (!xModeCh && moi && a.id === String(moi.id)) ? -1 : 0, bm = (!xModeCh && moi && b.id === String(moi.id)) ? -1 : 0; return (am - bm) || (b.l.length - a.l.length) || String(a.nom).localeCompare(String(b.nom)); });
  if (xSans.length) xListe.push({ id: "__", nom: F("À identifier"), l: xSans, sans: true });
  var xSelId = medXSel[xCle], xSel = xListe.filter(function (g) { return g.id === xSelId; })[0] || xListe[0] || null;
  var xFiltres = [];
  if (xSel) xSel.l.forEach(function (x) { (x[xAutre] || []).forEach(function (id) { var f = xFiltres.filter(function (q) { return q.id === id; })[0]; if (!f) { f = { id: id, nom: xNomsAutre[id] || (xModeCh ? F("Cavalier") : F("Cheval")), n: 0 }; xFiltres.push(f); } f.n++; }); });
  xFiltres.sort(function (a, b) { return (b.n - a.n) || String(a.nom).localeCompare(String(b.nom)); });
  var xFil = xFiltres.some(function (f) { return f.id === medXFil; }) ? medXFil : "";
  var xMedias = xSel ? xSel.l.filter(function (x) { return !xFil || (x[xAutre] || []).indexOf(xFil) !== -1; }) : [];
  var xNbV = xMedias.filter(function (x) { return x.video; }).length, xNbP = xMedias.length - xNbV;
  var xMax = 6, xVisibles = (medXTous || xListe.length <= xMax + 1) ? xListe : xListe.slice(0, xMax);
  if (xSel && xVisibles.indexOf(xSel) === -1) xVisibles = xVisibles.concat([xSel]);
  function choisirX(id) { var n = Object.assign({}, medXSel); n[xCle] = id; setMedXSel(n); setMedXFil(""); setMedNE(24); }
  function rondX(g, cls) {
    var ph = g.sans ? null : xPhoto(g.id, xModeCh);
    return h("span", { className: cls }, ph ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, 160, 160) : ph, alt: "", loading: "lazy" })
      : (g.sans ? h("b", null, "?") : (xModeCh ? icoXp("ch") : h("b", null, String(g.nom || "?").charAt(0).toUpperCase()))));
  }
  function ico2(n) { var d = n === "v" ? "M3.5 6.5h12v11h-12zM15.5 10.5l5-3v9l-5-3" : "M3.5 5.5h17v13h-17zM3.5 15l4.5-4.5 4 4 2.5-2.5 6 6M15.5 9.5h.01"; return h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, "aria-hidden": "true" }, h("path", { d: d, fill: "none", stroke: "#C9A66B", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" })); }
  function tuileX(x, sansId, larg) {   /* mosaïque : la vignette garde ses proportions (largeur pleine, hauteur naturelle) */
    var src = apercu(x, larg || 900), qui = nomsDe(x), peutId = !sansId && moi && (x.auteur === moi.id || gestion);
    return h("div", { key: x.cle, className: "hc-xm-t" },
      h("button", { type: "button", className: "hc-xm-b", onClick: function () { ouvrirMedia(x); }, title: qui || undefined, "aria-label": (x.video ? F("Lire la vidéo") : F("Voir la photo")) + (qui ? " — " + qui : "") },
        src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.display = "none"; e.target.parentNode.classList.add("vide"); } catch (e0) { } } }) : h("span", { className: "hc-xm-vide" }),
        x.video ? h("span", { className: "hc-md-play", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24", width: 16, height: 16 }, h("path", { d: "M8.5 5.8v12.4l9.6-6.2z", fill: "#F3EEE4" }))) : null,
        (x.video && dureeTxt(x.duree)) ? h("span", { className: "hc-md-d" }, dureeTxt(x.duree)) : null),
      peutId ? h("button", { type: "button", className: "hc-mt-id", "aria-label": F("Identifier"), onClick: function () { setMedMsg(""); setMedId({ x: x, cav: x.cav.slice(), ch: x.ch.slice(), ep: x.epreuve || "" }); try { setTimeout(function () { var el = document.querySelector(".hc-mid"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60); } catch (e1) { } } }, "⋯") : null);
  }
  var xMediasV = xMedias.slice(0, medNE);
  var blocExplorer = !medVue || medVue === "ep" ? null : h("div", { key: "xm", className: "hc-xm" },
    !xListe.length ? h("div", { className: "hs-note hc-md-vide" }, F("Pas encore de média sur ce concours.")) : [
      h("div", { key: "liste", className: "hc-xm-liste" },
        h("div", { className: "hc-xm-lt" }, xModeCh ? F("Les chevaux") : F("Les cavaliers")),
        h("div", { className: "hc-xm-ll", "data-hscroll": "1" }, xVisibles.map(function (g) {
          var on = xSel && g.id === xSel.id;
          return h("button", { key: g.id, type: "button", className: "hc-xm-it" + (on ? " on" : ""), "aria-pressed": on, onClick: function () { choisirX(g.id); setMedPage({ ch: xModeCh, id: g.id }); setMedPgSel(null); } },
            rondX(g, "hc-xm-av"),
            h("span", { className: "hc-xm-in" }, h("b", null, g.nom), h("small", null, g.l.length + " " + (g.l.length > 1 ? F("médias") : F("média")))),
            h("i", { className: "hc-xm-chev", "aria-hidden": "true" }, rtl ? "‹" : "›"));
        })),
        xListe.length > xMax + 1 ? h("button", { type: "button", className: "hc-xm-tous", onClick: function () { setMedXTous(!medXTous); } },
          medXTous ? F("Réduire") : ((xModeCh ? F("Voir tous les chevaux") : F("Voir tous les cavaliers")) + " (" + xListe.length + ")")) : null),
      false ? h("div", { key: "main", className: "hc-xm-main" },   /* 09/11 22h45 : remplacé par la page du cavalier / du cheval (pageX) */
        h("div", { className: "hc-xm-band" },
          (!xSel.sans && xPhoto(xSel.id, xModeCh)) ? h("span", { className: "hc-xm-bph" }, h("img", { src: (typeof grandeImageHype === "function") ? grandeImageHype(xPhoto(xSel.id, xModeCh), 900) : xPhoto(xSel.id, xModeCh), alt: "" })) : null,
          h("div", { className: "hc-xm-btx" },
            h("h3", null, xSel.nom),
            h("p", null, xSel.sans ? F("Touche ⋯ pour dire qui est dessus") : F("Ses médias sur ce concours")),
            h("div", { className: "hc-xm-cpt" },
              h("span", null, ico2("p"), h("b", null, xNbP), " " + (xNbP > 1 ? F("photos") : F("photo"))),
              h("span", null, ico2("v"), h("b", null, xNbV), " " + (xNbV > 1 ? F("vidéos") : F("vidéo")))),
            h("button", { type: "button", className: "hc-md-aj", "aria-expanded": medAjout, onClick: function () { setMedAjout(!medAjout); } }, h("span", { "aria-hidden": "true" }, "+"), " " + F("Ajouter des médias")))),
        h("div", { key: "paj" }, panneauAjout),
        xFiltres.length ? h("div", { className: "hc-xm-fil", "data-hscroll": "1" },
          [h("button", { key: "tous", type: "button", className: "hc-xm-f" + (!xFil ? " on" : ""), onClick: function () { setMedXFil(""); setMedNE(24); } }, F("Tous") + " (" + xSel.l.length + ")")]
          .concat(xFiltres.map(function (f) { return h("button", { key: f.id, type: "button", className: "hc-xm-f" + (xFil === f.id ? " on" : ""), onClick: function () { setMedXFil(xFil === f.id ? "" : f.id); setMedNE(24); } },
            xModeCh ? icoXp("cav") : icoXp("ch"), F("Avec ") + f.nom + " (" + f.n + ")"); }))) : null,
        h("div", { className: "hc-xm-mos" }, xMediasV.map(tuileX)),
        xMedias.length > medNE ? h("div", { key: "sx" + medNE, ref: sentinelle, className: "hc-md-suite" },
          h("button", { type: "button", className: "hc-md-aj", onClick: function () { setMedNE(medNE + 24); } }, F("Afficher plus"))) : null) : null]);
  function ongletM(k, libre, ic) {
    var on = (medVue || "") === k;
    return h("button", { key: k || "tous", type: "button", className: "hc-mn-b" + (on ? " on" : ""), "aria-pressed": on, onClick: function () { setMedVue(k); setMedId(null); setMedNE(24); } }, ic ? icoXp(ic) : null, libre);
  }
  /* ══ 09/11 21h55 — PAGE MÉDIAS REFAITE D'APRÈS LE VISUEL DE BLANDINE (« tout le principe on le refait », « colle exactement
     au visuel ») : « Mes médias » = une grande + 3 ronds à droite + une rangée ; « Les médias de l'équipe » = une rangée qui
     défile ; « + Ajouter des médias ». Effet soleil ADOUCI (B2) sur les vignettes seulement : la photo ouverte en grand et
     la vidéo gardent leurs vraies couleurs. Mes médias = ceux que j'ai publiés ou où l'on m'a identifié (règle d'avant). ══ */
  function vrImg(x, larg) {
    var src = apercu(x, larg || 700);
    return src ? [h("img", { key: "i", className: "hps-f", src: src, alt: "", loading: "lazy", decoding: "async", onError: function (e) { try { e.target.style.visibility = "hidden"; } catch (e0) { } } }),
      h("span", { key: "l", className: "hps-l", "aria-hidden": "true" }), h("span", { key: "v", className: "hps-v", "aria-hidden": "true" })] : null;
  }
  function vrCase(x, cls, larg, action) {
    var qui = nomsDe(x);
    return h("button", { key: x.cle, type: "button", className: cls, onClick: action || function () { ouvrirMedia(x); }, title: qui || undefined, "aria-label": (x.video ? F("Lire la vidéo") : F("Voir la photo")) + (qui ? " — " + qui : "") },
      vrImg(x, larg),
      x.video ? h("i", { className: "vr-play", "aria-hidden": "true" }, h("b", null)) : null,
      (x.video && dureeTxt(x.duree)) ? h("i", { className: "vr-d" }, dureeTxt(x.duree)) : null);
  }
  var vrP = mesM.filter(function (x) { return x.cle === medSel; })[0] || mesM[0] || null;
  var vrAutres = mesM.filter(function (x) { return x !== vrP; });
  var vrRonds = vrAutres.slice(0, 3), vrRang = vrAutres.slice(3, 3 + medNM);
  var blocMesV = vrP ? h("div", { key: "vrm" },
    h("div", { className: "vr-t" }, h("h3", null, F("Mes médias")), h("span", null, mesM.length + " " + (mesM.length > 1 ? F("médias") : F("média")))),
    h("div", { className: "vr-haut" + (vrRonds.length ? "" : " seul") },
      vrCase(vrP, "vr-big", 1400),
      vrRonds.length ? h("div", { className: "vr-ronds" }, vrRonds.map(function (x) {
        return h("button", { key: x.cle, type: "button", onClick: function () { setMedSel(x.cle); }, "aria-label": F("Afficher ce média") }, vrImg(x, 240));
      })) : null),
    vrRang.length ? h("div", { className: "vr-rang", "data-hscroll": "1" }, vrRang.map(function (x) { return vrCase(x, "vr-p", 600); })
      .concat(vrAutres.length > 3 + medNM ? [h("button", { key: "plus", type: "button", className: "vr-p vr-plus", onClick: function () { setMedNM(medNM + 24); } }, F("Afficher plus"))] : [])) : null) : null;
  /* 09/11 23h15 (Blandine : « les médias de l'équipe, ça serait bien de les séparer par cavalière ») : une rangée par cavalier
     (rond photo + prénom + nombre, puis ses médias qui défilent) ; un média à deux cavaliers est chez les deux ; « À identifier » en dernier.
     Toucher le prénom ouvre sa page. */
  var eqGr = [], eqParId = {}, eqSans = [];
  eqM.forEach(function (x) {
    var ids = (x.cav || []).filter(function (id) { return !(moi && id === String(moi.id)); });
    if (!ids.length) { eqSans.push(x); return; }
    ids.forEach(function (id) { if (!eqParId[id]) { eqParId[id] = { id: id, l: [] }; eqGr.push(eqParId[id]); } eqParId[id].l.push(x); });
  });
  eqGr.sort(function (a, b) { return b.l.length - a.l.length; });
  if (eqSans.length) eqGr.push({ id: "__", l: eqSans, sans: true });
  function eqNom(g) { return g.sans ? F("À identifier") : (nomsCav[g.id] || (medG && medG.noms && medG.noms.cav[g.id] && medG.noms.cav[g.id].nom) || F("Cavalier")); }
  var blocEqV = eqM.length ? h("div", { key: "vre" },
    h("div", { className: "vr-t" + (vrP ? " sep" : "") }, h("h3", null, F("Les médias de l’équipe")), h("span", null, eqM.length + " " + (eqM.length > 1 ? F("médias") : F("média")))),
    eqGr.map(function (g) {
      var nm = eqNom(g), ph = g.sans ? null : photoCav(g.id);
      return h("div", { key: "g" + g.id, className: "vr-gc" },
        h("button", { type: "button", className: "vr-gc-t", onClick: function () { setMedPage({ ch: false, id: g.id }); setMedPgSel(null); } },
          h("span", { className: "vr-gc-av" }, ph ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, 120, 120) : ph, alt: "", loading: "lazy" }) : h("b", null, g.sans ? "?" : String(nm).charAt(0).toUpperCase())),
          h("b", { className: "vr-gc-n" }, nm),
          h("small", null, g.l.length + " " + (g.l.length > 1 ? F("médias") : F("média"))),
          h("i", { "aria-hidden": "true" }, rtl ? "‹" : "›")),
        h("div", { className: "vr-eq" + (g.l.length <= 3 ? " n" + g.l.length : ""), "data-hscroll": "1" }, g.l.slice(0, 24).map(function (x) { return vrCase(x, "vr-e", 600); })));
    })) : null;
  /* ══ 09/11 22h45 — PAGE D'UN CAVALIER / D'UN CHEVAL (Blandine : « on n'a pas du tout l'autre page qu'on avait validée, avec le
     grand cheval noir, les ronds en haut à droite » ; « garde la dispo des médias comme on vient de la faire sur la page médias,
     sans forcément garder les mêmes titres »). Haut = celui de la page d'une vidéo (même grande photo pour tous, titre en bas à
     gauche, ronds sous •••) ; dessous = la disposition validée : une grande + 3 ronds + une rangée, puis une rangée qui défile. ══ */
  var pageX = null;
  if (medPage) {
    var pgCle = medPage.ch ? "ch" : "cav", pgAutre = medPage.ch ? "cav" : "ch";
    var pgL = itemsM.filter(function (x) { var l = x[pgCle] || []; return medPage.id === "__" ? !l.length : l.indexOf(medPage.id) !== -1; });
    var pgConc = !!medPage.conc;
    var pgV1 = itemsM.filter(function (x) { return x.video; })[0] || null;
    var pgNom = pgConc ? ((ev && ev.titre) || F("Concours")) : medPage.id === "__" ? F("À identifier") : ((medPage.ch ? nomsCh : nomsCav)[medPage.id] || (medPage.ch ? F("Cheval") : F("Cavalier")));
    var pgV = pgL.filter(function (x) { return x.video; }), pgP = pgL.filter(function (x) { return !x.video; });
    var pgA = pgV.length ? pgV : pgP, pgB = pgV.length ? pgP : [];
    var pgBig = pgA.filter(function (x) { return x.cle === medPgSel; })[0] || pgA[0] || null;
    var pgRest = pgA.filter(function (x) { return x !== pgBig; });
    var pgCpt = {}; pgL.forEach(function (x) { (x[pgAutre] || []).forEach(function (id) { pgCpt[id] = (pgCpt[id] || 0) + 1; }); });
    var pgPart = Object.keys(pgCpt).sort(function (a, b) { return pgCpt[b] - pgCpt[a]; }).slice(0, 2);
    function pgTitre(t, n, sep) { return h("div", { className: "vr-t" + (sep ? " sep" : "") }, h("h3", null, t), h("span", null, n + " " + (pgA === pgV && t === F("Vidéos") ? (n > 1 ? F("vidéos") : F("vidéo")) : (n > 1 ? F("photos") : F("photo"))))); }
    function pgRond(id) {
      var ph = medPage.ch ? photoCav(id) : photoCh(id), nm = (medPage.ch ? nomsCav : nomsCh)[id] || "";
      return h("button", { key: "r" + id, type: "button", className: "hpv-r hcp-r", "aria-label": nm, onClick: function () { setMedPage({ ch: !medPage.ch, id: id }); setMedPgSel(null); try { document.getElementById("hcp-defile").scrollTop = 0; } catch (e) { } } },
        ph ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, 170, 170) : ph, alt: "", loading: "lazy" }) : h("b", null, String(nm || "?").charAt(0).toUpperCase()),
        h("i", null, nm));
    }
    var corpsPg = h("div", { className: "hpv-in" },
      h("div", { className: "hpv-scene" },
        h("div", { className: "hpv-photo fond" }, h("img", { src: (typeof grandeImageHype === "function") ? grandeImageHype("images/galop1-hero-bai.webp", 1400) : "images/galop1-hero-bai.webp", alt: "" })),
        h("button", { type: "button", className: "hpv-rond hpv-retour", onClick: function () { if (pgConc) setOngletC(""); setMedPage(null); setMedPgSel(null); }, "aria-label": F("Retour") },
          h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M15 5l-7 7 7 7" }))),
        h("div", { className: "hpv-titre" }, h("h1", { dir: "auto", className: pgNom.length > 26 ? "long" : "" }, pgNom)),
        pgConc ? h("div", { className: "hpv-ronds" },
          h("button", { key: "cv", type: "button", className: "hpv-r hcp-r", "aria-label": F("Par cavalier"), onClick: function () { setMedPage(null); setMedVue("cav"); setMedId(null); } },
            h("b", null, icoXp("cav")), h("i", null, F("Cavaliers"))),
          h("button", { key: "ch", type: "button", className: "hpv-r hcp-r", "aria-label": F("Par cheval"), onClick: function () { setMedPage(null); setMedVue("ch"); setMedId(null); } },
            h("b", null, icoXp("ch")), h("i", null, F("Chevaux"))),
          pgV1 ? h("button", { key: "hb", type: "button", className: "hpv-r hcp-r", "aria-label": "Hey Baby", onClick: function () { ouvrirMedia(pgV1); } },
            h("img", { src: "images/FOND_HEYBABY.webp", alt: "" }), h("i", null, "Hey Baby")) : null) :
        h("div", { className: "hpv-ronds" },
          pgPart.map(pgRond),
          h("button", { key: "eq", type: "button", className: "hpv-r hcp-r", "aria-label": F("Les médias de l’équipe"), onClick: function () { setMedPage(null); setMedPgSel(null); setMedVue(""); } },
            h("b", null, h("svg", { viewBox: "0 0 24 24", width: 22, height: 22, "aria-hidden": "true" }, h("path", { d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16.5 10a2.5 2.5 0 1 0 0-5M3.5 19c.7-3 2.8-4.6 5.5-4.6s4.8 1.6 5.5 4.6M15.5 14.6c2.3.1 4.1 1.6 4.8 4.4", fill: "none", stroke: "#C9A66B", strokeWidth: 1.3, strokeLinecap: "round" }))),
            h("i", null, F("Équipe"))))),
      hsCourbe(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),   /* 09/11 22h46 (Blandine) : la courbe dorée sépare le haut de la suite */
      h("div", { className: "hc hcp-bas" },
        /* 09/11 22h46 (Blandine : « garde quand même les raccourcis des autres pages ») : les 4 accès du concours ; en toucher un
           referme cette page et ouvre l'onglet ; Médias ramène à la page Médias du concours */
        h("div", { className: "hc-cartes hcp-cartes", onClickCapture: function (e) {
          var c = null; try { c = e.target.closest(".hc-carte"); } catch (e0) { }
          if (!c) return; var estMed = c === c.parentNode.lastElementChild;
          if (pgConc && estMed) { e.stopPropagation(); e.preventDefault(); return; }
          setMedPage(null); setMedPgSel(null); setMedVue("");
          if (estMed) { e.stopPropagation(); e.preventDefault(); }
        } },
          carte("engagements", F("Engagements"), "eng", HS_IMG_CONCOURS.engagements, null),
          carte("passages", F("Passages"), "pas", HS_IMG_CONCOURS.passages, null),
          carte("resultats", F("Résultats"), "res", HS_IMG_CONCOURS.equipe, null),
          carte("medias", F("Médias"), "med", HS_IMG_CONCOURS.medias, null)),
        pgConc ? h("div", { className: "vr" }, vrPrincipal(true)) : h("div", { className: "vr" },
        !pgL.length ? h("div", { className: "hs-note hc-md-vide" }, F("Pas encore de média sur ce concours.")) : null,
        pgBig ? h("div", { key: "a" },
          pgTitre(pgV.length ? F("Vidéos") : F("Photos"), pgA.length, false),
          h("div", { className: "vr-haut" + (pgRest.length ? "" : " seul") },
            vrCase(pgBig, "vr-big", 1400),
            pgRest.length ? h("div", { className: "vr-ronds" }, pgRest.slice(0, 3).map(function (x) { return h("button", { key: x.cle, type: "button", onClick: function () { setMedPgSel(x.cle); }, "aria-label": F("Afficher ce média") }, vrImg(x, 240)); })) : null),
          pgRest.length > 3 ? h("div", { className: "vr-rang", "data-hscroll": "1" }, pgRest.slice(3).map(function (x) { return vrCase(x, "vr-p", 600); })) : null) : null,
        pgB.length ? h("div", { key: "b" },
          pgTitre(F("Photos"), pgB.length, true),
          h("div", { className: "vr-eq", "data-hscroll": "1" }, pgB.map(function (x) { return vrCase(x, "vr-e", 600); }))) : null,
        h("div", { className: "vr-filet" })),
        (typeof FinPageHype === "function") ? h(FinPageHype, null) : null));
    var pgPage = h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", dir: rtl ? "rtl" : "ltr", className: "hpv hpv-photo-on hcp", style: { position: "fixed", inset: 0, zIndex: 8700, background: "#070A08", color: "#F3EEE4", fontFamily: "Montserrat, sans-serif" } },
      h("style", null, ((typeof HPV_CSS !== "undefined") ? HPV_CSS : "") + HC_B2_CSS + HCP_CSS + HC_VR_COURBES_CSS + HC_VR_GC_CSS),
      h("div", { id: "hcp-defile", style: { position: "absolute", inset: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" } }, corpsPg));
    pageX = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal(pgPage, document.body) : pgPage;
  }
  function vrCourbe(sens, k) {
    var d = sens ? "M0 30 C 120 28, 250 8, 400 4" : "M0 4 C 150 6, 280 26, 400 30";
    return h("svg", { key: k, className: "vr-c", viewBox: "0 0 400 34", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "vrg-" + k, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      h("path", { d: d, fill: "none", stroke: "url(#vrg-" + k + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  function vrOnglet(k, img, titre, plus, action, on) {
    return h("button", { key: k, type: "button", className: "vr-o" + (on ? " on" : ""), "aria-expanded": plus ? !!on : undefined, onClick: action },
      h("img", { src: img, alt: "", "aria-hidden": "true", decoding: "async" }),
      plus ? h("i", { "aria-hidden": "true" }, "+") : null,
      h("b", null, titre));
  }
  var blocGalerie = h("div", { key: "gal", ref: mesurerMd, className: "hc-gal hc-rep hc-md" },
    h("style", { key: "b2" }, HC_B2_CSS + HC_XM_GRILLE_CSS + HC_VR_COURBES_CSS + HC_VR_GC_CSS),
    medVue ? [
      h("div", { key: "tete", className: "hc-md-tete" },
        h("h2", null, F("Médias du concours")), h("i", { "aria-hidden": "true" })),
      h("div", { key: "nav", className: "hc-mn", role: "tablist", "data-hscroll": "1" },
        ongletM("", F("Tous les souvenirs"), null), ongletM("cav", F("Par cavalier"), "cav"), ongletM("ch", F("Par cheval"), "ch"))] : null,
    panneauId, medMsg ? h("div", { className: "hs-msg" }, medMsg) : null,
    medVue === "ep" ? blocVideos : medVue ? blocExplorer : h("div", { key: "vr", className: "vr" }, vrPrincipal(false)),
    pageX,
    medVisu && (typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(medVisu, function () { setMedVisu(null); }) : null);
  function vrPrincipal(dansPage) {
    function quitter() { if (dansPage) { setMedPage(null); setMedPgSel(null); } }
    return [
      !medG ? h("div", { key: "att", className: "hs-note" }, "…") : null,
      (medG && !itemsM.length) ? h("div", { key: "vide", className: "hs-note hc-md-vide" }, F("Pas encore de média sur ce concours.")) : null,
      /* 09/11 23h08 (Blandine : « aère au-dessus et en dessous, avec des courbes dorées entre chaque partie, puis des onglets
         avec image pour les boutons ») : courbe / Mes médias / courbe / Les médias de l'équipe / courbe / 3 onglets photo */
      vrCourbe(1, "c1"),
      blocMesV, (blocMesV && blocEqV) ? vrCourbe(0, "c2") : null, blocEqV,
      vrCourbe(1, "c3"),
      h("div", { key: "ong", className: "vr-ong" + (itemsM.length ? "" : " seul") },
        vrOnglet("aj", HS_IMG_CONCOURS.passages, F("Ajouter des médias"), true, function () { setMedAjout(!medAjout); }, medAjout),
        itemsM.length ? vrOnglet("cav", HS_IMG_CONCOURS.engagements, F("Par cavalier"), false, function () { quitter(); setMedVue("cav"); setMedId(null); }) : null,
        itemsM.length ? vrOnglet("ch", HS_IMG_CONCOURS.medias, F("Par cheval"), false, function () { quitter(); setMedVue("ch"); setMedId(null); }) : null),
      h("div", { key: "paj" }, panneauAjout),
      dansPage ? h("div", { key: "pid" }, panneauId, medMsg ? h("div", { className: "hs-msg" }, medMsg) : null) : null];
  }
  /* le fil (publications, j'aime, commentaires, ajout) reste sous la galerie, sans sa propre galerie (seulementFil) */
  var blocPartageConcours = h("div", { key: "pcc" },
    (function () { try { window.__evPasse = null; window.__evPasseId = idEv; } catch (eW) { } return null; })(),
    (typeof EcranEvenementPasse !== "undefined") ? h(EcranEvenementPasse, { key: "pc" + idEv, integre: true, seulementPartage: true }) : null);
  var blocFil = h("div", { key: "fil", id: "hs-fil" },
    (function () { try { window.__evPasse = null; window.__evPasseId = idEv; } catch (eW) { } return null; })(),
    (typeof EcranEvenementPasse !== "undefined") ? h(EcranEvenementPasse, { key: "ep" + idEv, integre: true, seulementFil: true }) : null);

  /* ── DOSSIER DU CONCOURS ── */
  var blocDossier = [
    gestion ? h("button", { key: "dos", type: "button", className: "hs-btn", onClick: function () { ouvrir("dossier-concours"); } }, F("Ouvrir le dossier du concours")) : null,
    histo.length ? h("div", { key: "hi" },
      h("div", { className: "hc-sous" }, F("Ton historique avec ce cheval")),
      h("div", { className: "hs-carte" }, histo.map(function (r) {
        var pl = r.place ? (r.place + (r.place === 1 ? "re" : "e") + (r.partants ? " / " + r.partants : "")) : (r.classement || "");
        return h("div", { key: r.id, className: "hs-row" },
          h("div", { className: "g" }, h("b", null, r.concours || F("Concours")), h("span", null, [r.epreuve, hsFmt(r.date_epreuve, { day: "numeric", month: "short", year: "numeric" })].filter(Boolean).join(" · "))),
          pl ? h("span", { className: "d", style: { fontSize: 13 } }, pl) : null);
      }))) : null,
    (!gestion && !histo.length) ? h("div", { key: "v", className: "hs-note", style: { marginTop: 0 } }, F("Les résultats et les souvenirs de ce concours restent ici, dans Médias, après la journée.")) : null
  ];
  var dossierUtile = gestion || histo.length;

  /* ── 09/11 11h37 — MES ENGAGEMENTS + HISTORIQUE (maquette validée de Blandine, vue cavalier) ──
     Une fiche par engagement (photo du cheval entière, épreuve, cheval, tour, passage et piste si connus). Toucher une fiche
     choisit ce cheval pour l'historique ; aucune autre page. Consignes de la coach : masquées pour l'instant (Blandine). */
  function joliConcours(t) { var x = String(t || "").trim(); if (x && x === x.toUpperCase()) x = x.toLowerCase().replace(/(^|[\s'’-])([a-zà-ÿ])/g, function (m, a, b) { return a + b.toUpperCase(); }).replace(/\b(De|Du|Des|La|Le|Les|Et|D|L)\b/g, function (m) { return m.toLowerCase(); }); return x; }
  var mesChevaux = []; mesLignes.forEach(function (x) { var k = x.cid || x.ch; if (k && !mesChevaux.some(function (c) { return c.k === k; })) mesChevaux.push({ k: k, id: x.cid, nom: (x.cid && chEng[x.cid] && (chEng[x.cid].alias || chEng[x.cid].nom)) || x.ch }); });
  var chCourant = (chSel && mesChevaux.some(function (c) { return c.k === chSel; })) ? chSel : (mesChevaux[0] ? mesChevaux[0].k : null);
  /* 09/11 11h43 (Blandine : « les résultats au moins de la saison en cours… plutôt en juillet la saison ») : même règle de saison
     que les pages Performances (hypeSaisonTeam, décision du 07/10 : Poney 8 juin, Club 22 juin, Amateur 15 juin, autres 1er sept.).
     5 visibles, « Voir toute la saison » déplie ; saison vide → les 3 derniers résultats, avec la mention « Saison précédente ». */
  var histoChTous = histo.filter(function (r) { return !chCourant || r.cheval_id === chCourant; });
  var hcAujIso = (function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();
  var histoSaison = histoChTous.filter(function (r) { if (typeof hypeSaisonTeam !== "function") return true; var a = hypeSaisonTeam(r.date_epreuve, r.epreuve); return a !== null && a === hypeSaisonTeam(hcAujIso, r.epreuve); });
  var histoAncien = !histoSaison.length && histoChTous.length;
  /* 09/11 11h45 (Blandine : « les points que le couple a gagnés depuis le début de l'année ensemble ») : somme des points FFE
     enregistrés (resultats.points, aucun barème recalculé) sur la saison en cours de ce couple */
  var ptsSaison = histoSaison.reduce(function (t, r) { var n = parseFloat(String(r.points == null ? "" : r.points).replace(",", ".")); return t + (isNaN(n) ? 0 : n); }, 0);
  ptsSaison = Math.round(ptsSaison * 10) / 10;
  var histoCh = histoAncien ? histoChTous.slice(0, 3) : (histoTout ? histoSaison : histoSaison.slice(0, 5));
  function lauriers() {
    var fe = []; [0, 1, 2, 3].forEach(function (k) { var t = 0.18 + k * 0.22, a = Math.PI * (0.62 + t * 0.62), x = 16 + 11 * Math.cos(a), y = 13 + 10 * Math.sin(a) * -1; fe.push([x, y, (a * 180 / Math.PI) - 60]); fe.push([32 - x, y, 180 - ((a * 180 / Math.PI) - 60)]); });
    return h("svg", { viewBox: "0 0 32 26", width: 30, height: 24, "aria-hidden": "true", className: "hc-laur" },
      h("g", { fill: "none", stroke: "#C9A66B", strokeWidth: 1.1, strokeLinecap: "round" }, h("path", { d: "M13 24 C 5 21, 3 12, 7 4" }), h("path", { d: "M19 24 C 27 21, 29 12, 25 4" })),
      h("g", { fill: "#C9A66B" }, [[5.2, 19.5, -55], [3.6, 14.5, -25], [4.2, 9.5, 0], [6.4, 5, 20], [26.8, 19.5, 55], [28.4, 14.5, 25], [27.8, 9.5, 0], [25.6, 5, -20], [9, 22.3, -80], [23, 22.3, 80]].map(function (f, i) { return h("ellipse", { key: i, cx: f[0], cy: f[1], rx: 1.5, ry: 3, transform: "rotate(" + f[2] + " " + f[0] + " " + f[1] + ")" }); })));
  }
  function horloge() { return h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, "aria-hidden": "true" }, h("g", { fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6, strokeLinecap: "round" }, h("circle", { cx: 12, cy: 13, r: 8 }), h("path", { d: "M12 9v4l2.5 2M9.5 3h5" }))); }
  var blocMesEng = gestion ? null : h("div", { key: "me" },
    h("div", { className: "hc-titre-s" }, h("h2", null, F("Mes engagements")), h("span", { className: "hc-filet", "aria-hidden": "true" })),
    h("div", { className: "hc-sous-c" }, F("Mes épreuves sur ce concours")),
    mesLignes.length ? h("div", { className: "hc-engs" }, mesLignes.map(function (x, i) {
      var ch = x.cid ? chEng[x.cid] : null; var ph = ch && ch.photo_url;
      var k = x.cid || x.ch;
      return h("button", { key: i, type: "button", className: "hc-eng" + (k === chCourant && mesChevaux.length > 1 ? " on" : ""), onClick: function () { setChSel(k); setHistoTout(false); try { var el = document.getElementById("hc-histo"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { } } },
        h("div", { className: "hc-eng-ph" }, ph ? [h("span", { key: "f", className: "hc-eng-fond", "aria-hidden": "true", style: { backgroundImage: "url(\"" + ((typeof vignetteHypeContain === "function") ? vignetteHypeContain(ph, 360, 720) : ph) + "\")" } }), h("img", { key: "i", src: (typeof vignetteHypeContain === "function") ? vignetteHypeContain(ph, 360, 720) : ph, alt: "", loading: "lazy", onError: function (e) { try { e.target.style.display = "none"; } catch (e0) { } } })] : h("span", { className: "hc-eng-ini" }, String(x.ch || "?").charAt(0).toUpperCase())),
        h("div", { className: "hc-eng-txt" },
          x.ep ? h("span", { className: "hc-pill" }, x.ep) : null,
          h("b", { className: "hc-eng-ch" }, (ch && (ch.alias || ch.nom)) || x.ch || F("Cheval à préciser")),
          h("span", { className: "hc-eng-tour" }, [F("Tour ") + (x.nu || (i + 1)), x.pi ? F("piste ") + x.pi : ""].filter(Boolean).join(" · ")),
          x.hp ? h("span", { className: "hc-eng-h" }, horloge(), h("span", null, F("Passage : ") + x.hp)) : null));
    })) : h("div", { className: "hs-note", style: { marginTop: 0 } }, F("Tu n’es engagé sur aucune épreuve de ce concours.")),
    mesChevaux.length ? h("div", { id: "hc-histo", className: "hc-histo" },
      h("div", { className: "hc-histo-tete" },
        h("div", null, h("div", { className: "hc-titre-s" }, h("h2", null, F("Historique")), h("span", { className: "hc-filet court", "aria-hidden": "true" })), h("div", { className: "hc-sous-c" }, F("Tes derniers résultats"))),
        mesChevaux.length > 1 ? h("div", { className: "hc-chips", role: "tablist" }, mesChevaux.map(function (c) { return h("button", { key: c.k, type: "button", role: "tab", "aria-selected": c.k === chCourant, className: "hc-chip" + (c.k === chCourant ? " on" : ""), onClick: function () { setChSel(c.k); setHistoTout(false); } }, c.nom); })) : null),
      ptsSaison > 0 ? h("div", { className: "hc-pts" }, h("b", null, ptsSaison.toLocaleString(lg === "fr" ? "fr-FR" : undefined)), h("span", null, F("points gagnés ensemble cette saison"))) : null,
      histoAncien ? h("div", { className: "hc-histo-mention" }, F("Rien encore cette saison · saison précédente")) : null,
      histoCh.length ? h("div", { className: "hc-hl" }, histoCh.map(function (r) {
        var pl = r.place ? (r.place + (r.place === 1 ? (lg === "fr" ? "er" : "") : (lg === "fr" ? "e" : ""))) : (r.classement || "");
        return h("div", { key: r.id, className: "hc-hr" },
          h("span", { className: "hc-hr-lau" }, r.place && r.place <= 3 ? lauriers() : null),
          h("span", { className: "hc-hr-pl" }, h("b", null, pl), r.place && r.partants ? h("span", null, " / " + r.partants) : null),
          h("span", { className: "hc-hr-sep", "aria-hidden": "true" }),
          h("span", { className: "hc-hr-c" }, h("b", null, joliConcours(r.concours) || F("Concours")), r.epreuve ? h("span", null, r.epreuve) : null),
          h("span", { className: "hc-hr-d" }, hsFmt(r.date_epreuve, { day: "numeric", month: "short", year: "numeric" })));
      })) : h("div", { className: "hs-note", style: { marginTop: 0 } }, F("Pas encore de résultat avec ce cheval.")),
      (!histoAncien && histoSaison.length > 5) ? h("button", { type: "button", className: "hc-histo-plus", onClick: function () { setHistoTout(!histoTout); } }, histoTout ? F("Réduire") : F("Voir toute la saison") + " (" + histoSaison.length + ")") : null) : null);

  /* 09/11 08h52 (Blandine : « l'ordre de passage doit aller dessus… idem résultats en direct sur résultats et l'ajout de vidéo sur médias ») : les outils dans leur carte */
  function outil(cle, titre, texte, action, fichier) {
    var corps = [h("span", { key: "t", className: "hc-o-t" }, titre), texte ? h("span", { key: "x", className: "hc-o-x" }, texte) : null, h("span", { key: "c", className: "hc-o-c", "aria-hidden": "true" }, rtl ? "‹" : "›")];
    if (fichier) return h("label", { key: cle, className: "hc-outil" }, corps, h("input", { type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: function (e) { var f = e && e.target && e.target.files && e.target.files[0]; try { e.target.value = ""; } catch (eV) { } if (!f) return; try { window.__ordreFichier = f; } catch (eW) { } ouvrirEngagements(); } }));
    if (typeof action === "string") return h("a", { key: cle, className: "hc-outil", href: action, target: "_blank", rel: "noopener" }, corps);
    return h("button", { key: cle, type: "button", className: "hc-outil", onClick: action }, corps);
  }
  /* 09/11 15h (Blandine : « Jour J et Passages doivent être une même et seule page ») : un seul outil, en bas de Passages */
  function ouvrirModifPassages() { try { window.__concoursId = idEv; } catch (e) { } setDecEp(null); setOngletC("passages"); setJjOuv(true); setTimeout(function () { try { var el = document.querySelector(".hc-jj"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e0) { } }, 150); }
  function fermerModifPassages() { setJjOuv(false); try { supa.rpc("hype_passages_concours", { p_agenda: idEv }).then(function (rq) { if (rq && !rq.error && Array.isArray(rq.data)) setPassagesEq(rq.data); }); } catch (eQ) { } try { chargerAgendaEvenement(idEv).then(function (r) { if (r && r.data) setEv(r.data); }); } catch (eE) { } }
  var outilsPassages = (gestion && !jjOuv) ? h("div", { key: "op", className: "hc-outils" },
    outil("modp", F("Modifier les passages"), F("Heures et pistes, ordre de passage ou programme (photo, capture ou PDF), direct du chronométreur."), ouvrirModifPassages)) : null;
  var blocModifPassages = (gestion && jjOuv && typeof EcranJourJ === "function") ? h("div", { key: "jj", className: "hc-jj" },
    h("div", { className: "hc-pas-tete" }, h("h2", { className: "hc-pas-titre" }, F("Modifier les passages"))),
    h(EcranJourJ, { integre: true }),
    h("div", { className: "hc-jj-fin" }, h("button", { type: "button", className: "hc-btn-l", onClick: fermerModifPassages }, F("Terminer")))) : null;
  var outilsResultats = (ev.lien_direct || gestion) ? h("div", { key: "or", className: "hc-outils" },
    ev.lien_direct ? outil("dir", F("Résultats en direct"), null, ev.lien_direct)
      : outil("dirA", F("Ajouter le lien des résultats en direct"), null, ouvrirModifPassages)) : null;
  var outilsMedias = (equipe && equipe.membre) ? h("div", { key: "om", className: "hc-outils" },
    outil("vid", F("Ajouter une vidéo"), null, function () { try { window.__teamMediasGroupe = equipe.id; window.__teamMediasOnglet = "videos"; window.__teamMediasAjout = { agenda_id: idEv, titre: ev.titre, lieu: ev.lieu, date: ev.date_jour }; } catch (e) { } setEcran("team-medias"); })) : null;

  /* 09/11 14h02 (Blandine : « cette partie ne devrait pas suivre de page en page… plutôt B ») — infos pratiques (lieu, départ,
     reconnaissance) + Je participe / Liste du van : seulement dans la carte Passages */
  var blocPratique = h("div", { key: "prat", className: "hc-prat" },
      /* bandeau compact : lieu | départ | reconnaissance ; le toucher déplie toutes les infos pratiques */
      h("div", { className: "hc-bande" + (infosOuv ? " ouv" : "") },
        h("div", { className: "hc-b-ligne" },
          lieuCourt ? h("a", { className: "hc-b-case", href: lienPlan, target: "_blank", rel: "noopener" }, hcIcone("lieu"), h("div", null, h("b", null, lieuCourt))) : null,
          ev.heure_depart ? h("button", { type: "button", className: "hc-b-case", onClick: function () { setInfosOuv(!infosOuv); } }, hcIcone("heure"), h("div", null, h("small", null, F("Départ")), h("b", null, ev.heure_depart))) : null,
          ev.heure_reco ? h("button", { type: "button", className: "hc-b-case", onClick: function () { setInfosOuv(!infosOuv); } }, hcIcone("reco"), h("div", null, h("small", null, F("Reconnaissance")), h("b", null, ev.heure_reco))) : null,
          (!lieuCourt && !ev.heure_depart && !ev.heure_reco) ? h("button", { type: "button", className: "hc-b-case", onClick: function () { setInfosOuv(!infosOuv); } }, h("div", null, h("b", null, F("Infos pratiques")))) : null,
          h("button", { type: "button", className: "hc-b-chev", "aria-label": F("Infos pratiques"), onClick: function () { setInfosOuv(!infosOuv); } }, infosOuv ? "⌃" : (rtl ? "‹" : "›"))),
        infosOuv ? h("div", { className: "hc-b-detail" },
          h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Lieu")), h("b", null, ev.lieu || F("Pas encore indiqué"))),
            lienPlan ? h("a", { href: lienPlan, target: "_blank", rel: "noopener" }, F("Itinéraire") + (rtl ? " ‹" : " ›")) : null),
          horaires.length ? horaires.map(function (x, i) {
            return h("div", { key: i, className: "hs-row" }, h("div", { className: "g" }, h("b", null, x.k), x.alerte ? h("span", null, F("alerte 15 min avant")) : null), h("span", { className: "d" }, x.v));
          }) : h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Les horaires ne sont pas encore indiqués.")))),
          ev.description ? h("div", { className: "hs-texte", style: { borderTop: "1px solid rgba(243,238,228,.07)" } }, ev.description) : null) : null),
      /* les deux boutons */
      h("div", { className: "hc-actions" },
        h("button", { type: "button", className: "hc-act", disabled: occupe || fini, onClick: fini ? undefined : basculerJeViens }, hcIcone("ok"), jeViens ? F("✓ Tu participes").replace(/^✓\s*/, "") : F("Je participe")),
        h("button", { type: "button", className: "hc-act", onClick: function () { prep("liste-van"); } }, hcIcone("van"), F("Liste du van"))),
      fini ? h("div", { className: "hc-fini" }, F("Ce concours est terminé.")) : null);
  return h("div", { className: "hs hc", dir: rtl ? "rtl" : "ltr" },
    heroC(ev.titre || F("Concours"), sousTitre),
    h("div", { className: "hs-in" },
      h("div", { className: "hc-cartes" },
        carte("engagements", F("Engagements"), "eng", HS_IMG_CONCOURS.engagements, null),
        carte("passages", F("Passages"), "pas", HS_IMG_CONCOURS.passages, null),
        carte("resultats", F("Résultats"), "res", HS_IMG_CONCOURS.equipe, null),   /* 09/11 01h04 Blandine : « remplace Équipe par Résultats » */
        carte("medias", F("Médias"), "med", HS_IMG_CONCOURS.medias, null)),
      (!fini && jeViens) ? h("div", { className: "hs-note", style: { textAlign: "center", marginTop: 6 } }, F("Touche encore pour te retirer.")) : null,
      msg ? h("div", { className: "hs-msg" }, msg) : null,
      (!fini && msgPrep) ? h("div", { className: "hs-msg" }, msgPrep) : null,
      pushMsg ? h("div", { className: "hs-msg" }, pushMsg) : null,
      /* 09/11 (Blandine « Oui ») : le contenu de la carte touchée, ici, sur la même page */
      ongletC ? h("div", { className: "hc-onglet" },
        ongletC === "engagements" ? blocMesEng : null,
        ongletC === "passages" ? (jjOuv && gestion ? [blocPratique, blocRegles, blocModifPassages, blocPaddock, liensPassages] : [blocPratique, blocRegles, blocPassages, blocPaddock, outilsPassages, liensPassages]) : null,   /* 09/11 14h49 (Blandine) : « Lire l'ordre de passage » en bas */   /* 09/11 14h16 (Blandine) : règles du paddock en haut */
        ongletC === "resultats" ? blocResultats : null,
        ongletC === "medias" ? [blocGalerie, filOuv ? h("div", { key: "filw" }, blocFil, h("div", { style: { textAlign: "center", margin: "6px 0 18px" } }, h("button", { type: "button", className: "hc-btn-l", onClick: function () { setFilOuv(false); setTimeout(function () { try { chargerGalerie(moi, function () { return true; }); } catch (e) { } }, 300); } }, F("Terminer")))) : null, medVue ? null : blocPartageConcours] : null)   /* 09/11 soir (maquette validée) : rien d'autre sous « Par cavalier / Par cheval » que le partage ; cartes Vidéothèque / Album retirées de cet onglet */   /* 09/11 16h31 (Blandine, capture barrée) : plus de filtres, de « Partager ce concours » ni de fil sous les médias */
        : null,
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ 08/11 — NOUVELLE FICHE CONCOURS (maquette n° 5 « CSO Tigery ») ════════════════════
   Images : fournies par Blandine (5 fichiers). Tant qu'un fichier manque, la carte reste sombre avec son titre
   (aucune image de remplacement) et le héros reprend la photo de secours (les 8 photos de la saison). */
var HS_HERO_CONCOURS = "images/concours-hero-cso.webp";
var HS_IMG_CONCOURS = { engagements: "images/concours-carte-engagements.webp", passages: "images/concours-carte-passages.webp", equipe: "images/concours-carte-equipe.webp", medias: "images/concours-carte-medias.webp" };
function hsPhotoConcours(ev, id) {
  /* la photo du concours d'abord ; sinon la photo de la maquette ; sinon (fichier absent) les photos de secours */
  var u = ev && ev.image_url ? String(ev.image_url) : "";
  if (u && !/\.(mp4|mov|m4v|webm)(\?|$)/i.test(u) && !/^mux:/.test(u)) return { img: (typeof vignetteHypeContain === "function") ? vignetteHypeContain(u, 900, 900) : u, pos: "center" };
  return hsPhotoDe(id);   /* 09/11 08h32 (Blandine : « garde le héros des engagements… cohérence visuelle de l'ensemble ») : même photo que Ma saison, Engagements, Jour J, Liste du van, Le dossier */
}
function hcIcone(n) {
  var p = { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: "#C9A66B", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  var h = React.createElement;
  if (n === "lieu") return h("svg", p, h("path", { d: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" }), h("circle", { cx: 12, cy: 10, r: 2.5 }));
  if (n === "heure") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 8.5 }), h("path", { d: "M12 7.5V12l3 2" }));
  if (n === "reco") return h("svg", p, h("path", { d: "M3 8h18M3 13h18M5 6v12M19 6v12M9 8v5M13 8v5M17 8v5" }));
  if (n === "ok") return h("svg", p, h("path", { d: "M5 12.5l4.5 4.5L19 7.5" }));
  if (n === "van") return h("svg", p, h("path", { d: "M2.5 7h11v9h-11zM13.5 10h4l3 3v3h-7z" }), h("circle", { cx: 6.5, cy: 17.5, r: 1.8 }), h("circle", { cx: 17, cy: 17.5, r: 1.8 }));
  if (n === "eng") return h("svg", p, h("rect", { x: 5, y: 4.5, width: 14, height: 16, rx: 2 }), h("path", { d: "M9 4.5V3h6v1.5M8.5 12.5l2.5 2.5 4.5-4.5" }));
  if (n === "pas") return h("svg", p, h("path", { d: "M8 5.5v13l10-6.5z" }));
  if (n === "eq") return h("svg", p, h("circle", { cx: 9, cy: 8.5, r: 3 }), h("circle", { cx: 16.5, cy: 9.5, r: 2.4 }), h("path", { d: "M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5M14.5 14.3c2.6-.4 4.9 1.2 5.8 4.7" }));
  if (n === "med") return h("svg", p, h("rect", { x: 3.5, y: 5, width: 17, height: 14, rx: 2 }), h("circle", { cx: 9, cy: 10, r: 1.6 }), h("path", { d: "M4 17l5-4.5 3.5 3 3-2.5 4.5 4" }));
  return null;
}
/* 09/11 21h46 (Blandine : « ok pour B2 ») : effet soleil ADOUCI — le même que HYPE_PH_SOLEIL_CSS (pages Cavalier, Écurie,
   Challenge), à peu près moitié moins fort ; seulement sur les vignettes de la page Médias du concours pour l'instant. */
var HC_B2_CSS = ".hc .hps-f{filter:sepia(.13) saturate(1.02) contrast(1.03)}.hc .hps-l,.hc .hps-v{position:absolute;z-index:1;inset:0;pointer-events:none;border-radius:inherit}"
  + ".hc .hps-l{background:radial-gradient(ellipse 66% 60% at 52% 40%,rgba(255,155,55,.36),rgba(255,130,50,.14) 48%,rgba(255,120,45,.03) 75%);mix-blend-mode:overlay}"
  + ".hc .hps-v{background:radial-gradient(ellipse 80% 74% at 52% 42%,rgba(14,8,3,0) 52%,rgba(14,8,3,.36) 100%),linear-gradient(0deg,rgba(12,7,3,.26),rgba(12,7,3,0) 36%)}";
/* 09/11 22h45 — page d'un cavalier / d'un cheval : complète HPV_CSS (haut de la page vidéo) */
var HCP_CSS = [
  "html body .hcp .hpv-scene .hcp-r{display:flex!important;flex-direction:column;align-items:center;gap:4px;width:auto!important;height:auto!important;border:0!important;border-radius:0!important;background:transparent!important;overflow:visible!important;padding:0}",
  ".hcp .hcp-r>img,.hcp .hcp-r>b{width:48px;height:48px;border-radius:50%;overflow:hidden;border:1px solid rgba(201,166,107,.7);background:rgba(7,10,8,.6);object-fit:cover;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:22px;color:#C9A66B}",
  ".hcp .hcp-r>i{font-style:normal;font-family:Montserrat,sans-serif;font-size:9.5px;color:#F3EEE4;text-shadow:0 1px 6px #000;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hcp .hcp-bas{padding:0 16px 0!important;max-width:680px;margin:0 auto;position:relative;z-index:2}",
  ".hcp .hcp-cartes{margin:0 0 26px}",
  ".hcp .hcp-bas .vr{margin-top:0}"
].join("");
/* 09/11 23h00 (Blandine : « je vois toujours rien ») : la liste « Par cavalier / Par cheval » n'a plus rien dessous (chaque nom
   ouvre sa page) : tous les noms en grille, avec la flèche, sans nom « choisi » d'avance */
var HC_XM_GRILLE_CSS = ".hc .hc-xm{display:block!important}.hc .hc-xm-ll{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px!important;overflow:visible!important}.hc .hc-xm-it{width:100%;box-sizing:border-box;min-width:0;padding:8px 12px 8px 8px}.hc .hc-xm-it.on{border-color:rgba(201,166,107,.18)}.hc .hc-xm-in{min-width:0}.hc .hc-xm-in b{display:block;overflow-wrap:anywhere;line-height:1.05}.hc .hc-xm-chev{display:block!important}@container hcmd (min-width:640px){.hc .hc-xm-ll{grid-template-columns:repeat(3,minmax(0,1fr))}}@container hcmd (min-width:960px){.hc .hc-xm-ll{grid-template-columns:repeat(4,minmax(0,1fr))}}";
/* 09/11 23h08 — page Médias du concours : courbes dorées entre les parties, onglets photo pour les boutons */
var HC_VR_COURBES_CSS = ".hc .vr-c{display:block;width:100%;height:34px;margin:52px 0 50px}.hc .vr>.vr-c:first-child{margin-top:24px}.hc .vr .vr-t,.hc .vr .vr-t.sep{margin-top:0}.hc .vr-ong{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:26px}.hc .vr-ong.seul{grid-template-columns:1fr}.hc .vr-o{position:relative;aspect-ratio:3/3.4;padding:0;border-radius:16px;overflow:hidden;border:1px solid rgba(201,166,107,.35);background:#0B0E0C;cursor:pointer;font:inherit}.hc .vr-ong.seul .vr-o{aspect-ratio:3/1.3}.hc .vr-o.on{border-color:#C9A66B}.hc .vr-o img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hc .vr-o::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 40%,rgba(7,10,8,.85))}.hc .vr-o b{position:absolute;z-index:2;left:6px;right:6px;bottom:11px;text-align:center;font-family:Montserrat,sans-serif;font-weight:600;font-size:13px;line-height:1.2;color:#F3EEE4;text-shadow:0 1px 8px #000}.hc .vr-o i{position:absolute;z-index:2;left:50%;top:38%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(243,238,228,.85);background:rgba(7,10,8,.35);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:26px;font-weight:300;color:#F3EEE4}@container hcmd (min-width:640px){.hc .vr-o{aspect-ratio:3/2.2}}";
var HC_VR_GC_CSS = ".hc .vr-gc+.vr-gc{margin-top:22px}.hc .vr-gc-t{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:0;border:0;background:transparent;color:#F3EEE4;text-align:start;cursor:pointer;font:inherit}.hc .vr-gc-av{flex:none;width:42px;height:42px;border-radius:50%;overflow:hidden;border:1px solid rgba(201,166,107,.7);display:flex;align-items:center;justify-content:center;background:#0B0E0C}.hc .vr-gc-av img{width:100%;height:100%;object-fit:cover}.hc .vr-gc-av b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:20px;color:#C9A66B}.hc .vr-gc-n{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:23px;line-height:1.1}.hc .vr-gc-t small{font-size:12px;color:rgba(243,238,228,.65);margin-inline-start:2px}.hc .vr-gc-t i{margin-inline-start:auto;font-style:normal;color:#C9A66B;font-size:20px}.hcp .hcp-cartes{margin:0!important;padding-bottom:0!important}.hc .vr-eq.n1 .vr-e,.hc .vr-eq.n2 .vr-e,.hc .vr-eq.n3 .vr-e{flex:1 1 0;min-width:0}.hc .vr-eq.n1 .vr-e{aspect-ratio:16/9}.hc .vr-eq.n2 .vr-e{aspect-ratio:4/3}.hc .vr-eq.n1,.hc .vr-eq.n2,.hc .vr-eq.n3{margin-right:0;padding-right:0}";
var HC_CSS_ID = "hype-saison-css-concours";
var HC_CSS = [
  ".hc .hc-hero{position:relative;background:#070A08}",
  ".hc .hc-photo img{display:block;width:100%;height:auto;max-height:118vw;object-fit:cover;-webkit-mask-image:linear-gradient(180deg,#000 72%,transparent 100%);mask-image:linear-gradient(180deg,#000 72%,transparent 100%)}",
  ".hc .hc-photo{min-height:calc(env(safe-area-inset-top) + 210px);background:#070A08}",
  ".hc .hc-hero .hs-photo{margin-top:0}",
  ".hc .hc-haut{position:absolute;z-index:5;top:calc(env(safe-area-inset-top) + 10px);left:16px;right:16px;display:flex;justify-content:space-between;align-items:flex-start}",
  ".hc .hc-rond{width:42px;height:42px;border-radius:50%;border:1px solid rgba(243,238,228,.55);background:rgba(7,10,8,.32);color:#F3EEE4;font-size:20px;line-height:1;display:flex;align-items:center;justify-content:center;letter-spacing:1px}",
  ".hc .hc-menu{position:absolute;top:50px;inset-inline-end:0;min-width:230px;border:1px solid rgba(201,166,107,.4);border-radius:14px;background:rgba(10,14,15,.97);padding:6px;box-shadow:0 14px 30px rgba(0,0,0,.6);z-index:8}",
  ".hc .hc-menu button,.hc .hc-menu a{display:block;width:100%;text-align:start;background:none;border:none;color:#F3EEE4;font-size:13.5px;padding:11px 12px;border-radius:10px;text-decoration:none}",
  ".hc .hc-titre{position:absolute;z-index:3;left:18px;right:38%;bottom:44px;text-shadow:0 2px 14px rgba(0,0,0,.55)}",
  ".hc .hc-hero .hs-langue{top:calc(env(safe-area-inset-top) + 12px)!important;inset-inline-end:68px!important;z-index:6}",   /* 09/11 : le drapeau ne cache plus le bouton ••• */
  "[dir=rtl] .hc .hc-titre{left:44%;right:18px}",
  ".hc .hc-titre h1{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(34px,10vw,52px);line-height:1;color:#F3EEE4}",
  ".hc .hc-titre h1.long{font-size:clamp(27px,7.6vw,40px);line-height:1.05}",
  ".hc .hc-titre p{margin:8px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(14px,4vw,19px);color:#F3EEE4;opacity:.92;white-space:nowrap}",
  ".hc .hc-courbe{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:46px;z-index:2}",
  ".hc .hc-cartes{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:40px;padding-bottom:26px}",
  ".hc .hc-carte{position:relative;aspect-ratio:.82;border-radius:13px;overflow:hidden;border:1px solid rgba(201,166,107,.32);background:linear-gradient(160deg,#141a1c,#0a0d0e);padding:0}",
  ".hc .hc-carte.on{border:1.5px solid #C9A66B}",
  ".hc .hc-onglet{margin-top:30px;padding-top:4px}",
  ".hc .hc-outils{display:flex;flex-direction:column;gap:8px;margin:22px 0}",
  /* 09/11 13h10 — Médias du concours, présentation « reportage » */
  ".hc .hc-rep-titre{margin:4px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(34px,10vw,52px);line-height:1.02;color:#F3EEE4}",
  ".hc .hc-rep-filet{display:block;width:120px;height:1px;margin:14px 0 18px;background:linear-gradient(90deg,#C9A66B,rgba(201,166,107,0))}",
  ".hc .hc-rep-tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin:0 -4px 26px}",
  ".hc .hc-rep-tabs::-webkit-scrollbar{display:none}",
  ".hc .hc-rt{display:inline-flex;align-items:center;gap:7px;flex:0 0 auto;background:none;border:none;border-bottom:1.5px solid transparent;color:rgba(243,238,228,.8);font:inherit;font-size:13.5px;padding:8px 12px;cursor:pointer;white-space:nowrap}",
  ".hc .hc-rt.on{color:#C9A66B;border-bottom-color:#C9A66B}",
  ".hc .hc-rep-s{margin-bottom:30px}",
  ".hc .hc-rep-st{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:20px}",
  ".hc .hc-rep-st h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(26px,7.6vw,34px);color:#F3EEE4}",
  ".hc .hc-rep-st span{font-size:12.5px;color:rgba(243,238,228,.75)}",
  ".hc .hc-une{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center}",
  ".hc .hc-une.seule{grid-template-columns:1fr}",
  ".hc .hc-une-p{display:flex;justify-content:center;animation:hcFondu .35s ease}",
  "@keyframes hcFondu{from{opacity:0}to{opacity:1}}",
  "@media (prefers-reduced-motion:reduce){.hc .hc-une-p{animation:none}}",
  ".hc .hc-une-m{position:relative;display:block;padding:0;border:none;background:none;cursor:pointer;border-radius:14px;overflow:hidden;line-height:0}",
  ".hc .hc-une-m img{display:block;max-width:100%;max-height:min(30vh,260px);width:auto;height:auto}",   /* 09/11 16h32 puis 19h12 (Blandine : « réduis la taille de la photo ») : photo mise en avant plus petite, toujours entière */
  ".hc .hc-ronds{display:flex;flex-direction:column;align-items:center;gap:12px}",
  ".hc .hc-rond{position:relative;flex:none;width:clamp(58px,17vw,96px);height:clamp(58px,17vw,96px);border-radius:50%;overflow:hidden;padding:0;border:1px solid rgba(201,166,107,.6);background:#0B0E0C;cursor:pointer}",
  ".hc .hc-rond img{width:100%;height:100%;object-fit:cover;display:block}",
  ".hc .hc-rond-v{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#F3EEE4;font-size:13px;text-shadow:0 1px 4px rgba(0,0,0,.8)}",
  ".hc .hc-rangee{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;margin-top:12px;padding-bottom:2px}",
  ".hc .hc-rangee::-webkit-scrollbar,.hc .hc-galh::-webkit-scrollbar{display:none}",
  ".hc .hc-rg{position:relative;flex:0 0 auto;height:clamp(64px,19vw,110px);padding:0;border:none;background:#0B0E0C;border-radius:10px;overflow:hidden;cursor:pointer;line-height:0}",
  ".hc .hc-rg img{height:100%;width:auto;display:block}",
  ".hc .hc-rg-plus,.hc .hc-galh-plus{min-width:110px;color:#C9A66B;font:inherit;font-size:12.5px;line-height:1.3;border:1px solid rgba(201,166,107,.5);background:transparent;border-radius:12px;padding:0 12px;cursor:pointer}",
  ".hc .hc-galh{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity;margin-right:-18px;padding-right:18px}",
  ".hc .hc-galh-i{flex:0 0 auto;scroll-snap-align:start}",
  ".hc .hc-galh-m{position:relative;display:block;height:clamp(118px,34vw,240px);padding:0;border:none;background:#0B0E0C;border-radius:12px;overflow:hidden;cursor:pointer;line-height:0}",
  ".hc .hc-galh-m img{height:100%;width:auto;display:block}",
  ".hc .hc-rep-aj{display:flex;justify-content:center;margin:6px 0 18px}",
  ".hc .hc-rep-ajb{font-size:15px;padding:12px 30px}",
  ".hc .hc-rep-f{display:flex;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;align-items:center;gap:6px;border-top:1px solid rgba(243,238,228,.1);padding-top:16px;margin-bottom:10px}",
  ".hc .hc-rep-ft{flex:0 0 auto;font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;color:#F3EEE4;margin-inline-end:4px}",
  ".hc .hc-fp{position:relative;flex:0 0 auto;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(201,166,107,.55);border-radius:999px;padding:6px 9px;color:#F3EEE4;font-size:11.5px;max-width:40vw}",
  ".hc .hc-fp svg{width:14px;height:14px}",
  ".hc .hc-rep-f::-webkit-scrollbar{display:none}",
  ".hc .hc-fp span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-fp i{font-style:normal;color:#C9A66B}",
  ".hc .hc-fp.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-fp select{position:absolute;inset:0;opacity:0;width:100%;cursor:pointer}",
  "@media (min-width:768px){.hc .hc-une-m img{max-height:min(70vh,640px)}.hc .hc-galh-m{height:260px}.hc .hc-rep-f{flex-wrap:wrap}}",
  /* 09/11 — Médias du concours */
  ".hc .hc-gal{margin-top:6px}",
  ".hc .hc-gal-tete{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;margin-bottom:14px}",
  ".hc .hc-gal-tete h2{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(22px,6.4vw,30px);color:#F3EEE4;line-height:1.1}",
  ".hc .hc-gal-types{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px}",
  ".hc .hc-gal-types::-webkit-scrollbar{display:none}",
  ".hc .hc-gt{flex:0 0 auto;background:transparent;border:1px solid rgba(243,238,228,.22);border-radius:999px;color:rgba(243,238,228,.85);font:inherit;font-size:13px;padding:8px 16px;cursor:pointer;white-space:nowrap}",
  ".hc .hc-gt.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-fbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;border:1px solid rgba(201,166,107,.45);border-radius:999px;padding:6px 10px 6px 14px;margin-bottom:22px}",
  ".hc .hc-fbar-t{font-size:12px;color:rgba(243,238,228,.7)}",
  ".hc .hc-fsel{position:relative;display:inline-flex;align-items:center;gap:4px;font-size:12.5px;color:#F3EEE4;border-radius:999px;padding:4px 10px;border:1px solid transparent}",
  ".hc .hc-fsel.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-fsel select{position:absolute;inset:0;opacity:0;width:100%;cursor:pointer}",
  ".hc .hc-fsel span::after{content:' ▾';color:#C9A66B}",
  ".hc .hc-fbar-z{margin-inline-start:auto;background:none;border:none;color:rgba(243,238,228,.65);font:inherit;font-size:12px;text-decoration:underline;cursor:pointer}",
  ".hc .hc-gal-s{margin-bottom:28px}",
  ".hc .hc-gal-st{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:12px;padding-inline-start:12px;border-inline-start:2px solid #C9A66B}",
  ".hc .hc-gal-st h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;color:#F3EEE4}",
  ".hc .hc-gal-st span{font-size:12.5px;color:#C9A66B}",
  ".hc .hc-gal-m3{display:grid;grid-template-columns:1.7fr 1fr;grid-template-rows:1fr 1fr;gap:8px;height:calc(100cqw * .62)}",
  ".hc .hc-gal-m3 .hc-mt.grand{grid-row:1 / span 2}",
  ".hc .hc-gal-m3.un{grid-template-columns:1fr;grid-template-rows:1fr}",
  ".hc .hc-gal-m3.deux{grid-template-columns:1fr 1fr;grid-template-rows:1fr;height:calc((100cqw - 8px) / 2 / 1.4)}.hc .hc-gal-m3.deux .hc-mt.grand{grid-row:auto}",
  ".hc .hc-gal-m3.un{height:calc(100cqw / 1.4)}",
  ".hc .hc-gal-s{container-type:inline-size}",
  ".hc .hc-gal-grille{display:grid;gap:8px;margin-top:8px;grid-auto-rows:calc((100cqw - (var(--cols) - 1) * 8px) / var(--cols) / 1.4)}",
  ".hc .hc-gal-s > .hc-gal-grille:first-of-type{margin-top:0}",
  ".hc .hc-gcase{min-width:0;min-height:0;display:flex}",
  ".hc .hc-gcase .hc-mt{flex:1}",
  ".hc .hc-mt{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(201,166,107,.35);background:#0B0E0C;min-height:0}",
  ".hc .hc-mt-b{position:absolute;inset:0;width:100%;height:100%;padding:0;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;overflow:hidden}",
  ".hc .hc-mt-fond{position:absolute;inset:-14px;background-size:cover;background-position:center;filter:blur(14px) brightness(.4)}",
  ".hc .hc-mt-b img{position:relative;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}",
  ".hc .hc-mt-vide{position:absolute;inset:0;background:linear-gradient(160deg,#141a1c,#0a0d0e)}",
  ".hc .hc-mt-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:22%;max-width:58px;min-width:36px;aspect-ratio:1;border-radius:50%;border:1.5px solid rgba(243,238,228,.9);background:rgba(7,10,8,.35)}",
  ".hc .hc-mt-d{position:absolute;right:8px;bottom:8px;font-size:11.5px;color:#F3EEE4;background:rgba(7,10,8,.7);border-radius:6px;padding:2px 6px}",
  ".hc .hc-mt-id{position:absolute;top:6px;right:6px;width:28px;height:28px;border-radius:50%;border:1px solid rgba(243,238,228,.4);background:rgba(7,10,8,.55);color:#F3EEE4;font-size:16px;line-height:1;cursor:pointer}",
  ".hc .hc-plus{display:block;margin:12px auto 0}",
  ".hc .hc-mid{border:1px solid rgba(201,166,107,.4);border-radius:14px;padding:12px;margin-bottom:16px}",
  /* 09/11 — Page Résultats */
  ".hc .hc-bd{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;border:1px solid rgba(201,166,107,.55);border-radius:16px;padding:12px 14px;margin:0 0 22px}",
  ".hc .hc-bd-t{font-size:15px;font-weight:600}",
  ".hc .hc-bd-live{font-size:10.5px;font-weight:700;letter-spacing:.08em;color:#F3EEE4;border:1px solid #C0453A;background:rgba(192,69,58,.85);border-radius:5px;padding:2px 6px}",
  ".hc .hc-bd-acc{display:flex;flex-wrap:wrap;gap:8px 14px;margin-inline-start:auto}",
  ".hc .hc-bd-acc a{display:inline-flex;align-items:center;gap:6px;color:#C9A66B;text-decoration:none;font-size:13.5px;font-weight:600;white-space:nowrap}",
  ".hc .hc-bd-vide{font-size:12px;color:rgba(243,238,228,.55)}",
  ".hc .hc-bd-reg{background:transparent;border:none;color:rgba(243,238,228,.6);font:inherit;font-size:12px;text-decoration:underline;cursor:pointer;padding:0}",
  ".hc .hc-in{background:transparent;border:1px solid rgba(243,238,228,.2);border-radius:10px;color:#F3EEE4;font:inherit;font-size:14px;padding:9px 11px;min-width:0;width:100%;box-sizing:border-box}",
  ".hc .hc-coche{display:flex;gap:8px;align-items:center;font-size:13px}",
  ".hc .hc-rep-b > span:nth-child(2){display:flex;flex-direction:column;gap:2px}",
  ".hc .hc-etat{font-style:normal;font-size:11px;letter-spacing:.06em;color:#C9A66B}",
  ".hc .hc-rl{display:grid;grid-template-columns:52px 34px 1fr auto auto 26px;align-items:center;column-gap:10px;padding:10px 0;border-bottom:1px solid rgba(243,238,228,.08)}",
  ".hc .hc-rl:last-of-type{border-bottom:none}",
  ".hc .hc-rl.moi .hc-rl-q b{color:#C9A66B}",
  ".hc .hc-rl-pl{display:flex;justify-content:center}",
  ".hc .hc-rl-pl b{font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:500;font-variant-numeric:lining-nums}",
  ".hc .hc-rl-pl i{font-style:normal;font-size:10.5px;color:rgba(243,238,228,.65);text-align:center;line-height:1.2}",
  ".hc .hc-lp{position:relative;display:inline-flex;align-items:center;justify-content:center;width:44px;height:30px}",
  ".hc .hc-lp .hc-laur{position:absolute;inset:0;width:44px;height:30px}",
  ".hc .hc-lp b{position:relative;font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-weight:600;color:#C9A66B;font-variant-numeric:lining-nums}",
  ".hc .hc-lp.ar b,.hc .hc-lp.ar ellipse{color:#C8CCD0;fill:#C8CCD0}.hc .hc-lp.ar path{stroke:#C8CCD0}",
  ".hc .hc-lp.br b{color:#B07A4F}.hc .hc-lp.br ellipse{fill:#B07A4F}.hc .hc-lp.br path{stroke:#B07A4F}",
  ".hc .hc-rl-q{display:flex;flex-direction:column;min-width:0}",
  ".hc .hc-rl-q b{font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-rl-q span{font-size:12px;color:rgba(243,238,228,.7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-rl-pen,.hc .hc-rl-t{font-size:13px;white-space:nowrap;font-variant-numeric:tabular-nums}",
  ".hc .hc-rl-v{display:flex;align-items:center;justify-content:center;background:none;border:none;padding:0;cursor:pointer;width:26px}",
  ".hc .hc-rl.ged{grid-template-columns:44px 34px 1fr auto auto 22px 30px;column-gap:8px}",
  ".hc .hc-rl-m{width:30px;height:30px;border-radius:50%;border:1px solid rgba(201,166,107,.45);background:none;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer}",
  ".hc .hc-rl-m.on{border-color:#C9A66B}",
  ".hc .hc-rl-mp{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:10px 0 12px;border-bottom:1px solid rgba(243,238,228,.08);font-size:13px}",
  ".hc .hc-rl-mb{display:flex;gap:10px;align-items:center;margin-inline-start:auto}",
  ".hc .hc-btn-l.rouge{border-color:rgba(214,120,110,.55);color:#E3A59C}",
  ".hc .hc-rl-vide{padding:14px 0;font-size:13px;color:rgba(243,238,228,.6)}",
  ".hc .hc-rs-part{display:grid;grid-template-columns:auto 90px;align-items:center;gap:10px;font-size:13px}",
  ".hc .hc-rs-l{display:flex;flex-direction:column;gap:7px;padding:10px 0;border-bottom:1px solid rgba(243,238,228,.08)}",
  ".hc .hc-rs-q{font-size:13.5px}.hc .hc-rs-q span{color:rgba(243,238,228,.7)}",
  ".hc .hc-rs-c{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}",
  ".hc .hc-rs-c .hc-in{min-width:0;padding-left:8px;padding-right:8px;text-overflow:ellipsis}",
  ".hc .hc-rs-c .hc-in::placeholder{font-size:13px}",
  ".hc .hc-lire-res{margin:-4px 0 16px}",
  ".hc .hc-rs-lu{color:#C9A66B}",
  ".hc .hc-rs-l .hc-ged-ch{justify-content:flex-start}",
  ".hc .hc-pod{margin-top:34px}",
  ".hc .hc-pod-tete h2{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(22px,6.2vw,28px);color:#F3EEE4}",
  ".hc .hc-pod-res{font-size:12px;color:rgba(243,238,228,.7);margin:6px 0 14px}",
  ".hc .hc-pod-l{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));border:1px solid rgba(201,166,107,.35);border-radius:16px}",
  ".hc .hc-pod-l.car{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}",
  ".hc .hc-pod-l.car::-webkit-scrollbar{display:none}",
  ".hc .hc-pod-c{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:16px 10px;border-inline-start:1px solid rgba(201,166,107,.22);min-width:0}",
  ".hc .hc-pod-l.car .hc-pod-c{flex:0 0 36%;scroll-snap-align:start}",
  ".hc .hc-pod-c:first-child{border-inline-start:none}",
  ".hc .hc-pod-c b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:17px;line-height:1.2}",
  ".hc .hc-pod-c span{font-size:11.5px;color:rgba(243,238,228,.65)}",
  ".hc .hc-pod-m{padding:18px 8px 16px;background:linear-gradient(180deg,rgba(201,166,107,.07),transparent 60%)}",
  ".hc .hc-pod-ph{position:relative;width:min(84px,22vw);aspect-ratio:1;border-radius:50%;border:2px solid #C9A66B;margin-bottom:18px;background:#141a1c;display:flex;align-items:center;justify-content:center}",
  ".hc .hc-pod-ph.ar{border-color:#C9CDD2}",
  ".hc .hc-pod-ph.br{border-color:#B98A5E}",
  ".hc .hc-pod-ph img{width:100%;height:100%;object-fit:cover;border-radius:50%}",
  ".hc .hc-pod-ph i{font-style:normal;font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;color:#C9A66B}",
  ".hc .hc-pod-lr{position:absolute;left:50%;bottom:-16px;transform:translateX(-50%);background:#070A08;border-radius:999px;padding:1px 4px;line-height:0}",
  ".hc .hc-pod-m b{font-size:19px;font-weight:600;line-height:1.1}",
  ".hc .hc-pod-m em{font-style:normal;font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;color:rgba(243,238,228,.75);line-height:1.1}",
  ".hc .hc-pod-m span{color:#C9A66B;margin-top:4px}",
  ".hc .hc-bb{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;justify-content:center}",
  "@media (min-width:768px){.hc .hc-rl{grid-template-columns:64px 40px 1fr 90px 90px 30px}}",
  /* 09/11 — Organisation du paddock + règles */
  ".hc .hc-pad{margin-top:34px;padding-top:26px;border-top:1px solid rgba(201,166,107,.22)}",
  ".hc .hc-pad-tete{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;margin-bottom:16px}",
  ".hc .hc-pad-tt h2{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(21px,6vw,26px);line-height:1.1;color:#F3EEE4}",
  ".hc .hc-pad-tt span{display:block;font-size:12px;color:rgba(243,238,228,.7);margin-top:3px}",
  ".hc .hc-btn-l{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid rgba(201,166,107,.75);border-radius:999px;color:#C9A66B;font:inherit;font-size:12.5px;padding:7px 13px;cursor:pointer;white-space:nowrap}",
  ".hc .hc-btn-l.fort{border-color:#C9A66B;font-weight:600}",
  ".hc .hc-btn-l[disabled]{opacity:.5}",
  ".hc .hc-pad-moi{font-size:13.5px;color:#C9A66B;margin:-4px 0 14px}",
  ".hc .hc-grps{display:grid;grid-template-columns:1fr;gap:12px}",
  "@media (min-width:600px){.hc .hc-grps{grid-template-columns:1fr 1fr}}",
  ".hc .hc-grp{border:1px solid rgba(201,166,107,.3);border-radius:16px;padding:14px 14px 12px}",
  ".hc .hc-grp.moi{border-color:#C9A66B}",
  ".hc .hc-grp-t{display:flex;align-items:baseline;gap:12px;margin-bottom:12px}",
  ".hc .hc-grp-t b{font-size:15px;font-weight:600}",
  ".hc .hc-grp-t span{font-size:14px;color:rgba(243,238,228,.8)}",
  ".hc .hc-grp-t i{margin-inline-start:auto;font-style:normal;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,238,228,.55)}",
  ".hc .hc-gms{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:12px 8px}",
  ".hc .hc-gm{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;min-width:0}",
  ".hc .hc-gm b{font-size:12.5px;font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-gm .hc-av-ini{font-size:17px;font-family:'Cormorant Garamond',Georgia,serif;color:#C9A66B}",
  ".hc .hc-gm > span:not(.hc-av){font-size:10.5px;color:rgba(243,238,228,.65);line-height:1.25;max-width:100%;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
  ".hc .hc-gm.moi b{color:#C9A66B}",
  ".hc .hc-grp-vide{font-size:12.5px;color:rgba(243,238,228,.55)}",
  ".hc .hc-grp-conf{margin-top:10px;font-size:11.5px;color:#C9A66B;line-height:1.45}",
  ".hc .hc-ged{display:flex;flex-direction:column;gap:10px}",
  ".hc .hc-ged-act,.hc .hc-ged-fin{display:flex;flex-wrap:wrap;gap:8px}",
  ".hc .hc-ged-fin{justify-content:flex-end;margin-top:8px}",
  ".hc .hc-ged-g{display:grid;grid-template-columns:1fr 104px 34px;gap:8px}",
  ".hc .hc-ged-g input.hc-ged-h{padding:9px 8px;color-scheme:dark;-webkit-appearance:none;appearance:none;text-align:center;min-height:40px}",
  ".hc .hc-ged-g input.hc-ged-h::-webkit-date-and-time-value{text-align:center}",
  ".hc .hc-ged-g input{background:transparent;border:1px solid rgba(243,238,228,.2);border-radius:10px;color:#F3EEE4;font:inherit;font-size:14px;padding:9px 11px;min-width:0}",
  ".hc .hc-ged-x{background:transparent;border:1px solid rgba(243,238,228,.2);border-radius:10px;color:rgba(243,238,228,.7);font-size:18px;cursor:pointer}",
  ".hc .hc-ged-k{margin-top:8px;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#C9A66B}",
  ".hc .hc-ged-c{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid rgba(243,238,228,.08)}",
  ".hc .hc-ged-q{display:flex;align-items:baseline;gap:8px;min-width:0;font-size:13.5px}",
  ".hc .hc-ged-q span{color:rgba(243,238,228,.7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-ged-ch{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}",
  ".hc .hc-chip-p{min-width:34px;background:transparent;border:1px solid rgba(243,238,228,.22);border-radius:999px;color:rgba(243,238,228,.8);font:inherit;font-size:12px;padding:5px 9px;cursor:pointer}",
  ".hc .hc-chip-p.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-regles{display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:start;margin-top:22px;border:1px solid rgba(201,166,107,.35);border-radius:16px;padding:16px}",
  ".hc .hc-reg-ic{grid-row:1 / span 2}",
  ".hc .hc-regles h3{margin:2px 0 8px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:22px;color:#F3EEE4}",
  ".hc .hc-regles ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}",
  ".hc .hc-regles li{display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:1.45;color:rgba(243,238,228,.9)}",
  ".hc .hc-regles li svg{flex:0 0 auto;margin-top:2px}",
  /* 09/11 — Passages de l'équipe (sections repliables) */
  ".hc .hc-pas-tete{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:30px 0 20px}",   /* 09/11 16h36 : décollé de ce qui est au-dessus */
  ".hc .hc-pas-titre{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(22px,6.4vw,28px);line-height:1.1;white-space:nowrap;color:#F3EEE4;padding-inline-start:12px;border-inline-start:2px solid #C9A66B}",
  ".hc .hc-direct{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;border:1px solid #C9A66B;border-radius:999px;padding:8px 14px;color:#C9A66B;font-size:13px;font-weight:600;text-decoration:none;background:transparent}",
  ".hc .hc-direct-pt{width:7px;height:7px;border-radius:50%;background:#C9A66B;animation:hcPouls 1.6s ease-in-out infinite}",
  "@keyframes hcPouls{0%,100%{opacity:1}50%{opacity:.25}}",
  ".hc .hc-eps{display:flex;flex-direction:column;gap:10px}",
  ".hc .hc-ep{border:1px solid rgba(201,166,107,.3);border-radius:14px;overflow:hidden}",
  ".hc .hc-ep.ouv{border-color:rgba(201,166,107,.55)}",
  ".hc .hc-ep-b{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;width:100%;background:transparent;border:none;padding:14px 16px;color:#F3EEE4;font:inherit;text-align:start;cursor:pointer}",
  ".hc .hc-ep-b b{color:#C9A66B;font-weight:600;font-size:15px}",
  ".hc .hc-ep-b > span:nth-child(2){font-size:13px;color:rgba(243,238,228,.75)}",
  ".hc .hc-ep-l{border-top:1px solid rgba(201,166,107,.25);padding:0 16px}",
  ".hc .hc-pl{display:flex;align-items:baseline;gap:14px;padding:11px 0;border-bottom:1px solid rgba(243,238,228,.08);font-size:14px}",
  ".hc .hc-pl:last-child{border-bottom:none}",
  ".hc .hc-pl.moi .hc-pl-q b{color:#C9A66B}",
  ".hc .hc-pl-n{flex:0 0 48px;color:#C9A66B;font-weight:600}",
  ".hc .hc-pl-q{flex:1;min-width:0}",
  ".hc .hc-pl-q b{font-weight:600}",
  ".hc .hc-pl-q span{color:rgba(243,238,228,.75)}",
  ".hc .hc-pl-q i{font-style:normal;color:rgba(243,238,228,.5);font-size:12px}",
  ".hc .hc-pl-h{font-weight:600;white-space:nowrap}",
  /* 09/11 — Mes engagements + Historique (maquette de Blandine) */
  ".hc .hc-titre-s{display:flex;align-items:center;gap:16px}",
  ".hc .hc-titre-s h2{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:34px;line-height:1.1;color:#F3EEE4;white-space:nowrap}",
  ".hc .hc-filet{flex:1;height:1px;background:linear-gradient(90deg,rgba(201,166,107,.85),rgba(201,166,107,.35))}",
  ".hc .hc-filet.court{flex:0 0 48px}",
  ".hc .hc-sous-c{font-size:10.5px;letter-spacing:.32em;text-transform:uppercase;color:rgba(243,238,228,.85);margin:8px 0 20px}",
  ".hc .hc-engs{display:flex;flex-direction:column;gap:12px}",
  ".hc .hc-eng{display:grid;grid-template-columns:38% 1fr;align-items:stretch;width:100%;padding:0;border:1px solid rgba(201,166,107,.42);border-radius:14px;overflow:hidden;background:#070A08;color:#F3EEE4;text-align:start;cursor:pointer;font-family:inherit}",
  ".hc .hc-eng.on{border-color:#C9A66B}",
  ".hc .hc-eng-ph{position:relative;display:flex;align-items:center;justify-content:center;background:#0B0E0C;min-height:120px;overflow:hidden}",
  ".hc .hc-eng-fond{position:absolute;inset:-12px;background-size:cover;background-position:center;filter:blur(14px) brightness(.42)}",   /* le même cliché flouté derrière : la photo reste entière, sans bandes noires */
  ".hc .hc-eng-ph img{position:relative;width:100%;height:100%;max-height:170px;object-fit:contain;display:block}",
  ".hc .hc-eng-ini{font-family:'Cormorant Garamond',serif;font-size:40px;color:#C9A66B}",
  ".hc .hc-eng-txt{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:5px;padding:14px 16px}",
  ".hc .hc-pill{font-size:12px;color:#C9A66B;border:1px solid rgba(201,166,107,.7);border-radius:999px;padding:2px 10px;line-height:1.35}",
  ".hc .hc-eng-ch{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:25px;line-height:1.1}",
  ".hc .hc-eng-tour{font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:rgba(243,238,228,.8)}",
  ".hc .hc-eng-h{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;margin-top:3px}",
  ".hc .hc-histo{margin-top:34px;scroll-margin-top:20px}",
  ".hc .hc-histo-tete{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px}",
  ".hc .hc-histo-tete .hc-sous-c{margin-bottom:0}",
  ".hc .hc-pts{display:flex;align-items:baseline;gap:10px;margin-top:18px}",
  ".hc .hc-pts b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:34px;line-height:1;color:#C9A66B;font-variant-numeric:lining-nums;font-feature-settings:'lnum' 1}",
  ".hc .hc-pts span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,238,228,.8)}",
  ".hc .hc-histo-mention{margin-top:16px;font-size:12px;font-style:italic;color:rgba(243,238,228,.65)}",
  ".hc .hc-histo-plus{display:block;margin:14px auto 0;background:transparent;border:1px solid rgba(201,166,107,.6);border-radius:999px;color:#C9A66B;font:inherit;font-size:13px;padding:9px 20px;cursor:pointer}",
  ".hc .hc-chips{display:flex;border:1px solid rgba(201,166,107,.55);border-radius:999px;padding:2px;max-width:100%;overflow-x:auto;scrollbar-width:none}",
  ".hc .hc-chip{background:transparent;border:1px solid transparent;border-radius:999px;color:rgba(243,238,228,.85);font:inherit;font-size:13px;padding:6px 14px;white-space:nowrap;cursor:pointer}",
  ".hc .hc-chip.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-hl{margin-top:18px;border:1px solid rgba(201,166,107,.42);border-radius:14px;padding:0 14px}",
  ".hc .hc-hr{display:grid;grid-template-columns:28px 62px 1px 1fr auto;align-items:center;column-gap:10px;padding:13px 0;border-bottom:1px solid rgba(243,238,228,.1)}",
  ".hc .hc-hr:last-child{border-bottom:none}",
  ".hc .hc-hr-pl{font-family:'Cormorant Garamond',Georgia,serif;font-size:21px;color:#F3EEE4;white-space:nowrap;font-variant-numeric:lining-nums;font-feature-settings:'lnum' 1}",
  ".hc .hc-hr-pl b{font-weight:500;color:#C9A66B}",
  ".hc .hc-hr-sep{width:1px;height:26px;background:rgba(201,166,107,.6)}",
  ".hc .hc-hr-c{display:flex;flex-direction:column;min-width:0}",
  ".hc .hc-hr-c b{font-size:13px;font-weight:600;line-height:1.25}",
  ".hc .hc-hr-c span{font-size:12px;color:rgba(243,238,228,.7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hc .hc-hr-d{font-size:11.5px;color:rgba(243,238,228,.8);white-space:nowrap}",
  "@media (min-width:768px){.hc .hc-engs{display:grid;grid-template-columns:1fr 1fr}}",
  ".hc .hc-outil{display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:10px;width:100%;box-sizing:border-box;padding:13px 16px;border:1px solid rgba(201,166,107,.55);border-radius:14px;background:transparent;color:#C9A66B;text-decoration:none;text-align:start;cursor:pointer;font-family:inherit}",
  ".hc .hc-o-t{grid-column:1;font-size:14px;letter-spacing:.01em}",
  ".hc .hc-o-x{grid-column:1;font-size:11.5px;line-height:1.4;color:rgba(243,238,228,.6);margin-top:3px}",
  ".hc .hc-o-c{grid-column:2;grid-row:1 / span 2;font-size:18px}",
  "button.hc-lien-d{background:none;border:none;padding:6px 0;cursor:pointer}",
  ".hc .hc-carte img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
  ".hc .hc-c-pied{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;gap:4px;padding:30px 2px 9px;background:linear-gradient(180deg,transparent,rgba(7,10,8,.72) 45%,rgba(7,10,8,.94))}",   /* 09/11 14h00 (Blandine : « on a du mal à lire ») : fond plus sombre sous le titre */
  ".hc .hc-carte.sans .hc-c-pied{top:0;justify-content:center;background:none}",
  ".hc .hc-c-pied b{font-weight:600;font-size:clamp(10.5px,2.8vw,14px);color:#F3EEE4;letter-spacing:-.2px;white-space:nowrap;text-shadow:0 1px 3px rgba(0,0,0,.9),0 0 10px rgba(0,0,0,.6)}",
  ".hc .hc-lecture{position:absolute;top:22%;left:50%;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:rgba(7,10,8,.6);border:1px solid rgba(243,238,228,.6);display:flex;align-items:center;justify-content:center;padding-left:2px}",
  ".hc .hc-carte.sans .hc-lecture{display:none}",
  ".hc .hc-bande{margin-top:20px;border:1px solid rgba(201,166,107,.3);border-radius:15px;background:linear-gradient(180deg,#0d1112,#090c0d)}",
  ".hc .hc-b-ligne{display:flex;align-items:stretch;min-height:58px}",
  ".hc .hc-b-case{flex:1;min-width:0;display:flex;align-items:center;gap:8px;padding:8px 10px;background:none;border:none;color:#F3EEE4;text-decoration:none;text-align:start}",
  ".hc .hc-b-case+.hc-b-case{border-inline-start:1px solid rgba(201,166,107,.28)}",
  ".hc .hc-b-case svg{flex:none}",
  ".hc .hc-b-case small{display:block;font-size:10.5px;color:rgba(243,238,228,.66);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".hc .hc-b-case b{display:block;font-weight:500;font-size:14.5px;color:#F3EEE4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".hc .hc-b-chev{flex:none;width:30px;background:none;border:none;color:#C9A66B;font-size:18px}",
  ".hc .hc-b-detail{border-top:1px solid rgba(201,166,107,.2)}",
  ".hc .hc-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}",
  ".hc .hc-act{display:flex;align-items:center;justify-content:center;gap:9px;min-height:48px;border-radius:999px;border:1px solid rgba(201,166,107,.85);background:rgba(7,10,8,.35);color:#F3EEE4;font-size:14px;letter-spacing:.01em}",
  ".hc .hc-act[disabled]{opacity:.5}",
  ".hc .hc-partie{border-bottom:1px solid rgba(201,166,107,.18)}",
  ".hc .hc-p-tete{display:flex;align-items:center;gap:10px;width:100%;min-height:46px;background:none;border:none;color:#F3EEE4;padding:6px 2px;text-align:start}",
  ".hc .hc-p-tete b{flex:1;font-family:'Montserrat',sans-serif;font-weight:500;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#C9A66B}",   /* 09/11 : titres légers, les cartes du haut sont les accès principaux */
  ".hc .hc-p-tete i{font-style:normal;color:#C9A66B;font-size:20px;width:20px;text-align:center}",
  ".hc .hc-nb{font-size:11.5px;color:rgba(243,238,228,.6)}",
  ".hc .hc-p-corps{padding:2px 0 18px}",
  ".hc .hc-sous{display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#C9A66B;margin:14px 0 8px}",
  ".hc .hc-p-corps>div:first-child>.hc-sous{margin-top:2px}",
  ".hc .hc-ep{margin-bottom:10px;border:1px solid rgba(243,238,228,.1);border-radius:13px;overflow:hidden}",
  ".hc .hc-ep-t{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;background:rgba(243,238,228,.03)}",
  ".hc .hc-ep-t b{font-weight:500;font-size:13.5px}.hc .hc-ep-t span{font-size:12px;color:rgba(243,238,228,.66)}",
  ".hc .hc-pass{display:flex;align-items:center;gap:10px;padding:9px 12px;border-top:1px solid rgba(243,238,228,.06)}",
  ".hc .hc-pass.moi{background:rgba(201,166,107,.07)}",
  ".hc .hc-h{width:44px;flex:none;font-size:13px;font-variant-numeric:tabular-nums;color:#F3EEE4}",
  ".hc .hc-pass img{width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none;border:1px solid rgba(201,166,107,.35)}",
  ".hc .hc-qui{min-width:0;display:flex;flex-direction:column}.hc .hc-qui b{font-weight:500;font-size:13px}.hc .hc-qui span{font-size:11.5px;color:rgba(243,238,228,.64)}",
  ".hc .hc-filtres{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;margin:0 -16px 4px;padding:0 16px 4px}",
  ".hc .hc-filtres::-webkit-scrollbar{display:none}",
  ".hc .hc-filtres button{flex:none;border:1px solid rgba(201,166,107,.4);background:none;color:rgba(243,238,228,.8);border-radius:999px;padding:7px 12px;font-size:12px;white-space:nowrap}",
  ".hc .hc-filtres button.on{border-color:#C9A66B;color:#C9A66B}",
  ".hc .hc-vids{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start}",
  ".hc .hc-vid{position:relative;padding:0;border:1px solid rgba(201,166,107,.22);border-radius:11px;overflow:hidden;background:#0c1011}",
  ".hc .hc-vid img{display:block;width:100%;height:auto}",
  ".hc .hc-vid-vide{aspect-ratio:16/9}",
  ".hc{padding-bottom:24px!important;min-height:0!important}",   /* 09/11 : la fin de page Hype suit la fiche (elle garde la barre d'onglets à distance) */   /* 09/11 : la barre d'onglets ne cache plus le bas de la fiche */
  ".hc .hc-vq button[style*='span 2']{grid-column:auto!important}",   /* vidéos de l'équipe : toutes la même largeur, 2 par ligne */
  ".hc .hc-vq .hs-sec{margin-top:4px}",
  ".hc .hc-prat{margin-bottom:22px}",
  /* 09/11 19h15 — lots de vidéos selon la maquette de Blandine */
  ".hc .hc-rep .hc-vg{border:1px solid rgba(201,166,107,.22);background:#0B0F13;border-radius:20px;padding:14px 14px 16px;margin-bottom:16px}",
  ".hc .hc-vg-h{display:flex;align-items:center;gap:14px;width:100%;background:none;border:none;padding:0 0 14px;color:#F3EEE4;font:inherit;text-align:start;cursor:pointer}",
  ".hc .hc-vg-av{flex:none;width:52px;height:52px;border-radius:50%;overflow:hidden;border:1.5px solid rgba(201,166,107,.75);background:#141a1c;display:flex;align-items:center;justify-content:center}",
  ".hc .hc-vg-av img{width:100%;height:100%;object-fit:cover}",
  ".hc .hc-vg-av b{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:500;color:#C9A66B}",
  ".hc .hc-vg-nm{flex:1;min-width:0;display:flex;flex-direction:column}",
  ".hc .hc-vg-nm b{font-size:19px;font-weight:600;line-height:1.15}",
  ".hc .hc-vg-nm small{font-size:13px;color:rgba(243,238,228,.65);margin-top:2px}",
  ".hc .hc-vg-chev{flex:none;display:flex}",
  ".hc .hc-vg-bas{display:flex;align-items:center;gap:12px;margin-top:10px}",
  ".hc .hc-vg-txt{flex:1;min-width:0}",
  ".hc .hc-vg-bas .hc-vg-ch{margin-top:0;font-size:15.5px}",
  ".hc .hc-vg-jm{flex:none}",
  ".hc .hc-vg-mn{flex:none;background:none;border:none;color:#F3EEE4;font-size:16px;letter-spacing:2px;padding:6px 2px;cursor:pointer}",
  ".hc .hc-rep .hc-vg .hc-mt-play{width:62px;max-width:62px;border:1.5px solid #C9A66B;background:rgba(7,10,8,.45)}",
  ".hc .hc-rep .hc-vg .hc-mt-d{right:10px;bottom:10px;font-size:13px;font-weight:600;padding:4px 10px;border-radius:10px;background:rgba(7,10,8,.8)}",

  /* ── 09/11 16h51 — Médias alignés sur le haut de la fiche ── */
  ".hc .hc-rep .hc-rep-st{align-items:center;margin:8px 0 18px}",
  ".hc .hc-rep .hc-rep-st h3{font-size:clamp(22px,6.4vw,28px);line-height:1.1;padding-inline-start:12px;border-inline-start:2px solid #C9A66B}",
  ".hc .hc-rep .hc-rep-s + .hc-rep-s{margin-top:34px}",
  ".hc .hc-une{max-width:640px;margin:0 auto}",
  ".hc .hc-une-p{justify-content:center}",
  ".hc .hc-rep-aj{gap:10px;flex-wrap:wrap;margin:10px 0 6px}",
  ".hc .hc-rep-ajb{font-size:13.5px;padding:11px 22px}",

  ".hc .hc-ep-img{position:relative;overflow:hidden;min-height:58px}",
  ".hc .hc-ep-img > *{position:relative}",
  ".hc .hc-ep-img > img.hc-ep-ph{position:absolute;top:0;inset-inline-end:0;width:40%;height:100%;object-fit:cover;object-position:60% 40%}",
  ".hc .hc-ep-img > .hc-ep-voile{position:absolute;inset:0;background:linear-gradient(90deg,#090C0D 58%,rgba(9,12,13,.7) 68%,rgba(9,12,13,.1) 95%)}",
  "[dir=rtl] .hc .hc-ep-img > .hc-ep-voile{background:linear-gradient(270deg,#090C0D 40%,rgba(9,12,13,.82) 56%,rgba(9,12,13,.15) 90%)}",
  ".hc .hc-ep-img .hc-ep-chev{background:rgba(7,10,8,.55);border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center}",
  ".hc .hc-vg{margin-bottom:14px;padding:10px 10px 12px;border:1px solid rgba(201,166,107,.22);border-radius:18px;background:#0B0F13}",
  ".hc .hc-vg.seule .hc-vg-i{flex:0 0 100%}",
  ".hc .hc-vg .hc-vg-m{aspect-ratio:auto;height:clamp(180px,52vw,300px)}",   /* 09/11 16h34 (Blandine) : seules ou côte à côte, même hauteur */
  ".hc .hc-vg-t{position:relative;overflow:hidden;height:52px;display:flex;flex-direction:row;align-items:center;gap:10px;margin-bottom:16px;padding:0 14px;border:1px solid rgba(201,166,107,.38);border-radius:12px;background:#0B0F13}",
  ".hc .hc-vg-img{position:absolute;top:0;inset-inline-end:0;width:50%;height:100%;object-fit:cover;object-position:60% 35%}",
  ".hc .hc-vg-voile{position:absolute;inset:0;background:linear-gradient(90deg,#0B0F13 40%,rgba(11,15,19,.8) 55%,rgba(11,15,19,0) 85%)}",
  "[dir=rtl] .hc .hc-vg-voile{background:linear-gradient(270deg,#0B0F13 40%,rgba(11,15,19,.8) 55%,rgba(11,15,19,0) 85%)}",
  ".hc .hc-vg-k{display:none}",
  ".hc .hc-vg-t > b{position:relative;font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:600;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}",
  ".hc .hc-vg-n{position:relative;font-size:11.5px;color:rgba(243,238,228,.75);white-space:nowrap}",
  ".hc .hc-vg-l{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:2px}",
  ".hc .hc-vg-l::-webkit-scrollbar{display:none}",
  ".hc .hc-vg-i{flex:0 0 88%;scroll-snap-align:start;min-width:0}",   /* 09/11 19h12 (Blandine : « une seule par ligne et on déroule après ») : une vidéo par écran, la suivante dépasse un peu pour montrer qu'on peut glisser */
  ".hc .hc-vg-m{position:relative;display:block;width:100%;aspect-ratio:16/10;padding:0;border:none;background:#0B0E0C;border-radius:12px;overflow:hidden;cursor:pointer;line-height:0}",
  ".hc .hc-vg-m img{width:100%;height:100%;object-fit:cover}",
  ".hc .hc-vg-ch{display:block;font-size:14px;font-weight:600;line-height:1.2;margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".hc .hc-vg-ep{display:block;font-size:12px;color:rgba(243,238,228,.65);margin-top:2px}",
  ".hc .hc-vg-ep b{color:#C9A66B;font-weight:600}",
  ".hc .hc-vg-av{width:36px;height:36px;border-radius:50%;overflow:hidden;border:1.5px solid rgba(201,166,107,.7);display:flex;align-items:center;justify-content:center;flex:none;background:#141a1c}",
  ".hc .hc-vg-av img{width:100%;height:100%;object-fit:cover}",
  ".hc .hc-vg-av b{font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#C9A66B}",
  ".hs.hs-int{min-height:0!important;padding-bottom:0!important;background:none!important}",
  ".hs.hs-int .hs-in{padding:0;max-width:none}",
  ".hc .hc-jj{margin-top:8px}",
  ".hc .hc-jj-fin{display:flex;justify-content:flex-end;margin:14px 0 6px}",
  ".hc .hc-pl-plus{display:flex;justify-content:center;padding:12px 0 6px}",
  ".hc .hc-dec-b{display:flex;flex-direction:column;align-items:flex-end;padding:12px 0}",
  ".hc .hc-dec{margin:0 -16px;padding:14px 16px;border-top:1px solid rgba(201,166,107,.25);background:rgba(201,166,107,.05)}",
  ".hc .hc-dec-l{margin-top:8px}",
  ".hc .hc-dec .hc-coche input{accent-color:#C9A66B}",
  ".hc .hc-dec-r{display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:8px 0;border-bottom:1px solid rgba(243,238,228,.07)}",
  ".hc .hc-dec-r s{color:rgba(243,238,228,.45)}",
  ".hc .hc-dec-r b{color:#C9A66B}",
  ".hc .hc-cls{display:grid;grid-template-columns:1fr;gap:10px;margin:26px 0 6px}",
  "@media (min-width:700px){.hc .hc-cls{grid-template-columns:1fr 1fr;gap:14px}}",
  ".hc .hc-cl{position:relative;overflow:hidden;width:100%;height:104px;display:flex;align-items:center;gap:12px;padding:0 13px;border-radius:12px;background:#0B0F13;border:1px solid rgba(214,182,118,.38);cursor:pointer;text-align:start;color:#F3EEE4;font:inherit}",
  ".hc .hc-cl-img{position:absolute;top:0;inset-inline-end:0;width:55%;height:100%;object-fit:cover;object-position:60% 40%;display:block}",
  ".hc .hc-cl-voile{position:absolute;inset:0;background:linear-gradient(90deg,#0B0F13 40%,rgba(11,15,19,.8) 55%,rgba(11,15,19,0) 82%)}",
  "[dir=rtl] .hc .hc-cl-voile{background:linear-gradient(270deg,#0B0F13 40%,rgba(11,15,19,.8) 55%,rgba(11,15,19,0) 82%)}",
  ".hc .hc-cl-ico{position:relative;flex:0 0 auto;width:28px;display:flex;justify-content:center}",
  ".hc .hc-cl-fil{position:relative;flex:0 0 auto;width:1px;align-self:stretch;margin:16px 0;background:rgba(214,182,118,.28)}",
  ".hc .hc-cl-t{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}",
  ".hc .hc-cl-t b{font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-weight:600;line-height:1.15;color:#F3EEE4}",
  ".hc .hc-cl-t small{font-size:11px;color:rgba(244,241,234,.72)}",
  ".hc .hc-cl-chev{position:relative;flex:0 0 auto;color:#C9A66B;font-size:18px}",
  ".hc .hc-lres{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px 16px;margin:18px 0 4px;font-size:12px}",
  ".hc .hc-lres a{color:rgba(243,238,228,.72);text-decoration:none;border-bottom:1px solid rgba(201,166,107,.45);padding-bottom:1px}",
  ".hc .hc-lres-r{background:none;border:none;padding:0;font:inherit;font-size:12px;color:rgba(201,166,107,.85);cursor:pointer}",
  ".hc .hc-prat .hc-bande{margin-top:0}",
  ".hc .hc-fini{text-align:center;font-size:11.5px;color:rgba(243,238,228,.55);margin-top:12px}",
  ".hc .hc-act[disabled]{opacity:.45}",
  ".hc .hc-b-case{padding:8px 8px}",
  ".hc .hc-b-case:first-child{flex:.8}",
  ".hc .hc-b-case small{font-size:10px;letter-spacing:.02em}",
  ".hc .hc-b-case b{font-size:14px}",
  ".hc .hc-b-case+.hc-b-case{border-inline-start-color:rgba(201,166,107,.22)}",
  ".hc .hc-b-chev{width:26px;font-size:16px}",
  ".hc .hc-liste{margin:0 0 14px}",
  ".hc .hc-liste .hc-ep-t{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0 6px;background:none;border-bottom:1px solid rgba(201,166,107,.18)}",
  ".hc .hc-liste .hc-ep-t b{font-weight:500;font-size:13px;color:#F3EEE4}.hc .hc-liste .hc-ep-t span{font-size:11.5px;color:rgba(243,238,228,.6)}",
  ".hc .hc-l{display:flex;align-items:center;gap:10px;min-height:46px;padding:6px 0;border-bottom:1px solid rgba(243,238,228,.06)}",
  ".hc .hc-l.moi .hc-qui b{color:#C9A66B}",
  ".hc .hc-l .hc-qui{flex:1}",
  ".hc .hc-av{width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none;border:1px solid rgba(201,166,107,.35)}",
  ".hc .hc-av-ini{display:inline-flex;align-items:center;justify-content:center;background:#121718;color:rgba(243,238,228,.7);font-size:12px}",
  ".hc .hc-res{font-size:12px;color:#C9A66B;white-space:nowrap}",
  ".hc .hc-lien-d{display:inline-block;margin-top:4px;color:#C9A66B;font-size:12.5px;text-decoration:none}",
  ".hc #hs-fil{margin-top:6px}",
  ".hc .hc-vid span{position:absolute;left:6px;bottom:6px;font-size:11px;padding:3px 8px;border-radius:8px;background:rgba(7,10,8,.72);color:#F3EEE4}",
  "@media (min-width:768px){.hc .hc-titre{bottom:64px}.hc .hc-cartes{gap:12px}.hc .hc-photo img{max-height:62vh}}",
  /* 09/11 22h05 (Blandine : « on est passé de ça qui était très bien à ça qui ne va plus du tout ») : le haut de la fiche
     revient EXACTEMENT comme avant 21h25 ; seuls les deux boutons ronds du haut (‹ et •••) sont protégés de la règle des ronds
     de médias, qui les grossissait. */
  ".hc .hc-hero .hc-rond{width:42px;height:42px;padding:0;overflow:visible;border:1px solid rgba(243,238,228,.55);background:rgba(7,10,8,.32)}",
  /* ══ 09/11 soir — MÉDIAS DU CONCOURS, maquette validée (ordinateur, tablette, iPhone) ══ */
  ".hc .hc-md{margin-top:6px;container:hcmd/inline-size}",
  ".hc .hc-md-tete{display:flex;align-items:center;flex-wrap:wrap;gap:10px 16px;margin:30px 0 4px}",
  ".hc .hc-md-tete h2{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(30px,8.4vw,54px);line-height:1.05;color:#F3EEE4;letter-spacing:.005em}",
  ".hc .hc-md-tete>i{flex:1 1 40px;height:1px;min-width:24px;background:linear-gradient(90deg,rgba(201,166,107,.75),rgba(201,166,107,0))}",
  "[dir=rtl] .hc .hc-md-tete>i{background:linear-gradient(270deg,rgba(201,166,107,.75),rgba(201,166,107,0))}",
  ".hc .hc-md-aj{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 18px;border-radius:10px;border:1px solid rgba(201,166,107,.7);background:transparent;color:#C9A66B;font-family:'Montserrat',system-ui,sans-serif;font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer}",
  ".hc .hc-md-aj span{font-size:18px;font-weight:400;line-height:1}",
  ".hc .hc-md-s{margin-top:26px}",
  ".hc .hc-md-ajr{display:flex;justify-content:flex-end;margin:12px 0 0}",
  ".hc .hc-md-sec{display:flex;align-items:center;gap:14px;margin:0 0 14px}",
  ".hc .hc-md-sec h2,.hc .hc-md-sec h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(24px,6.6vw,36px);line-height:1.1;color:#F3EEE4;white-space:nowrap}",
  ".hc .hc-md-sec>i{flex:1;height:1px;min-width:20px;background:linear-gradient(90deg,rgba(201,166,107,.55),rgba(201,166,107,0))}",
  "[dir=rtl] .hc .hc-md-sec>i{background:linear-gradient(270deg,rgba(201,166,107,.55),rgba(201,166,107,0))}",
  ".hc .hc-md-sec>span{font-size:12.5px;color:rgba(243,238,228,.75);white-space:nowrap}",
  ".hc .hc-md-vide{margin:18px 0 6px}",
  /* une case : la photo ENTIÈRE posée sur son propre flou (jamais rognée, jamais voilée de couleur) */
  ".hc .hc-md-c{position:relative;border-radius:10px;overflow:hidden;border:1px solid rgba(201,166,107,.3);background:#0B0E0C;min-width:0}",
  ".hc .hc-md-b{position:absolute;inset:0;width:100%;height:100%;padding:0;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;overflow:hidden}",
  ".hc .hc-md-b img{position:relative;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}",
  ".hc .hc-md-play{position:absolute;inset-inline-start:10px;bottom:10px;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(243,238,228,.92);background:rgba(7,10,8,.42);display:flex;align-items:center;justify-content:center}",
  ".hc .hc-md-d{position:absolute;inset-inline-end:8px;bottom:9px;font-size:12px;font-weight:600;color:#F3EEE4;background:rgba(7,10,8,.74);border-radius:6px;padding:2px 7px;font-variant-numeric:tabular-nums}",
  ".hc .hc-md-c .hc-mt-id{z-index:2}",
  /* Les premiers souvenirs — iPhone et tablette : la première en grand, les deux autres dessous */
  ".hc .hc-md-une{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
  ".hc .hc-md-une .hc-md-p{grid-column:1/-1;aspect-ratio:3/2}",
  ".hc .hc-md-une .hc-md-m{aspect-ratio:4/3}",
  ".hc .hc-md-une.n2 .hc-md-m{grid-column:1/-1;aspect-ratio:3/2}",
  ".hc .hc-md-une .hc-md-p .hc-md-play{width:50px;height:50px;inset-inline-start:14px;bottom:14px}",
  /* Tous les souvenirs — galerie collective */
  ".hc .hc-md-grille{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}",
  ".hc .hc-md-g{aspect-ratio:1/1;border-radius:8px}",
  ".hc .hc-md-g .hc-md-play{width:30px;height:30px;inset-inline-start:6px;bottom:6px}",
  ".hc .hc-md-g .hc-md-play svg{width:12px;height:12px}",
  ".hc .hc-md-g .hc-md-d{font-size:10.5px;padding:1px 5px;inset-inline-end:5px;bottom:7px}",
  ".hc .hc-md-g .hc-mt-id{width:24px;height:24px;font-size:13px;top:4px;right:4px}",
  ".hc .hc-md-suite{display:flex;justify-content:center;margin:18px 0 0}",
  /* Explorer les médias */
  ".hc .hc-md-xp{display:grid;gap:12px;margin:30px 0 22px}",
  ".hc .hc-md-acc{display:flex;align-items:center;gap:16px;min-height:62px;padding:10px 18px;border-radius:12px;border:1px solid rgba(201,166,107,.6);background:transparent;color:#F3EEE4;text-align:start;cursor:pointer;font:inherit}",
  ".hc .hc-md-acc-i{flex:none;display:flex}",
  ".hc .hc-md-acc-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}",
  ".hc .hc-md-acc-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:23px;line-height:1.1}",
  ".hc .hc-md-acc-t small{display:none;font-size:12px;color:rgba(243,238,228,.72)}",
  ".hc .hc-md-acc-c{flex:none;color:#C9A66B;font-size:24px;line-height:1}",
  /* la vue Explorer : lots séparés par un filet fin, plus de grosses cartes */
  ".hc .hc-xp-tete{margin:26px 0 4px}",
  ".hc .hc-xp-ret{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0;background:none;border:none;color:#C9A66B;font-family:'Montserrat',system-ui,sans-serif;font-size:13px;cursor:pointer;margin-bottom:10px}",
  ".hc .hc-xp-ret i{font-style:normal;font-size:20px;line-height:1}",
  ".hc .hc-rep .hc-xp .hc-vg{border:none;border-top:1px solid rgba(201,166,107,.2);border-radius:0;background:transparent;padding:18px 0 8px;margin:0}",
  ".hc .hc-xp .hc-vg-i,.hc .hc-xp .hc-vg.seule .hc-vg-i{flex:0 0 74%}",
  ".hc .hc-xp .hc-vg .hc-vg-m{height:auto;aspect-ratio:4/3;border:1px solid rgba(201,166,107,.28);border-radius:10px;display:flex;align-items:center;justify-content:center}",
  ".hc .hc-xp .hc-vg-m img{position:relative;width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain}",
  ".hc .hc-rep .hc-xp .hc-vg .hc-mt-play{width:46px;max-width:46px}",
  ".hc .hc-xp .hc-vg-nm b{font-size:17px}",
  ".hc .hc-xp .hc-vg-av{width:44px;height:44px}",
  /* ══ 09/11 20h30 — navigation Tous les souvenirs | Par cavalier | Par cheval, et médiathèque par cheval / par cavalier ══ */
  ".hc .hc-mn{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:14px 0 4px;padding-bottom:2px}",
  ".hc .hc-mn::-webkit-scrollbar{display:none}",
  ".hc .hc-mn-b{flex:1 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:42px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,166,107,.28);background:#070A08;color:#F3EEE4;font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-weight:500;white-space:nowrap;cursor:pointer}",
  ".hc .hc-mn-b svg{width:19px;height:19px}",
  /* ══ 09/11 21h55 — page Médias d'après le visuel de Blandine ══ */
  ".hc .vr{margin-top:-6px;color:#F3EEE4}",
  ".hc .vr-t{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:4px 0 12px}",
  ".hc .vr-t.sep{margin-top:28px}",
  ".hc .vr-t h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(30px,8.6vw,40px);line-height:1;color:#F3EEE4}",
  ".hc .vr-t span{flex:none;font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;color:rgba(243,238,228,.85)}",
  ".hc .vr-haut{display:grid;grid-template-columns:1fr clamp(56px,15vw,84px);gap:10px;align-items:stretch}",
  ".hc .vr-haut.seul{grid-template-columns:1fr}",
  ".hc .vr-big,.hc .vr-p,.hc .vr-e{position:relative;display:block;padding:0;border:1px solid rgba(201,166,107,.35);background:#0B0E0C;overflow:hidden;cursor:pointer}",
  ".hc .vr-big{border-radius:14px;aspect-ratio:4/3}",
  ".hc .vr-big img,.hc .vr-p img,.hc .vr-e img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}",   /* photo entière, le fond noir comble */
  ".hc .vr-ronds{display:flex;flex-direction:column;justify-content:space-between;gap:8px}",
  ".hc .vr-ronds button{position:relative;width:100%;aspect-ratio:1;border-radius:50%;overflow:hidden;padding:0;border:1px solid rgba(201,166,107,.75);background:#0B0E0C;cursor:pointer}",
  ".hc .vr-ronds img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
  ".hc .vr-rang{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin-top:10px}",
  ".hc .vr-rang::-webkit-scrollbar,.hc .vr-eq::-webkit-scrollbar{display:none}",
  ".hc .vr-p{flex:0 0 calc((100% - 16px) / 3);border-radius:10px;aspect-ratio:16/10}",
  ".hc .vr-plus{display:flex;align-items:center;justify-content:center;color:#C9A66B;font-size:12px}",
  ".hc .vr-eq{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;margin-inline-end:-18px;padding-inline-end:18px}",
  ".hc .vr-e{flex:0 0 31%;border-radius:12px;aspect-ratio:1/.82}",
  ".hc .vr-fin{flex:0 0 1px;border:none;background:none}",
  ".hc .vr-play{position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;border:2px solid rgba(243,238,228,.92);background:rgba(7,10,8,.35);display:flex;align-items:center;justify-content:center}",
  ".hc .vr-play b{width:0;height:0;border-left:14px solid #F3EEE4;border-top:9px solid transparent;border-bottom:9px solid transparent;margin-left:4px}",
  ".hc .vr-p .vr-play,.hc .vr-e .vr-play{left:8px;top:auto;bottom:7px;transform:none;width:30px;height:30px;border-width:1.5px}",
  ".hc .vr-p .vr-play b,.hc .vr-e .vr-play b{border-left-width:9px;border-top-width:6px;border-bottom-width:6px;margin-left:3px}",
  ".hc .vr-d{position:absolute;z-index:3;right:7px;bottom:8px;font-style:normal;font-family:Montserrat,system-ui,sans-serif;font-size:11.5px;color:#F3EEE4;background:rgba(7,10,8,.72);border-radius:8px;padding:2px 7px;font-variant-numeric:tabular-nums}",
  ".hc .vr-big .vr-d{font-size:14px;right:12px;bottom:12px;padding:4px 10px;border-radius:10px}",
  ".hc .vr-aj{display:flex;justify-content:center;margin-top:26px}",
  ".hc .vr-aj button{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:62%;min-height:48px;padding:0 24px;border-radius:999px;border:1px solid rgba(201,166,107,.75);background:transparent;color:#F3EEE4;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;cursor:pointer}",
  ".hc .vr-aj button i{font-style:normal;font-size:26px;font-weight:300;line-height:1}",
  ".hc .vr-liens{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:14px}",
  ".hc .vr-liens button{background:none;border:none;padding:6px 2px;color:#C9A66B;font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;cursor:pointer}",
  ".hc .vr-liens i{font-style:normal;color:rgba(201,166,107,.6)}",
  ".hc .vr-filet{height:1px;margin-top:20px;background:rgba(243,238,228,.12)}",
  "@container hcmd (min-width:600px){.hc .vr-big{aspect-ratio:16/10}.hc .vr-e{flex-basis:23%}}",
  "@container hcmd (min-width:1024px){.hc .vr-e{flex-basis:18%}}",
  /* ══ 09/11 21h10 — corrections iPhone (captures de Blandine) : moins de vide, un seul média à l'honneur, mosaïque naturelle ══ */
  ".hc .hc-md-tete{margin:0}",
  ".hc .hc-onglet .hc-md{margin-top:-12px}",
  ".hc .hc-mn{margin:10px 0 0}",
  ".hc .hc-md-ajr{margin:8px 0 0}",
  ".hc .hc-md-s{margin-top:16px}",
  ".hc .hc-md-sec{margin:0 0 10px}",
  ".hc .hc-md-aj{min-height:36px;padding:0 15px;font-size:12.5px;background:rgba(7,10,8,.35)}",
  ".hc .hc-md-une1 .hc-xm-t{margin:0;background:#070A08}",
  ".hc .hc-md-une1 .hc-xm-b{display:flex;justify-content:center}",
  ".hc .hc-md-une1 .hc-xm-b img{width:auto;max-width:100%;max-height:min(62vh,520px)}",   /* photo verticale : à ses proportions, jamais étirée dans un cadre horizontal */
  ".hc .hc-md-une1 .hc-md-play{width:48px;height:48px;inset-inline-start:14px;bottom:14px}",
  ".hc .hc-md-mos.n1{column-count:1!important}",
  ".hc .hc-md-mos.n2{column-count:2!important}",
  "@container hcmd (min-width:600px){.hc .hc-md-mos{column-count:3;column-gap:12px}.hc .hc-md-mos .hc-xm-t{margin-bottom:12px}}",
  "@container hcmd (min-width:1024px){.hc .hc-md-mos{column-count:4}.hc .hc-md-mos.n3{column-count:3}}",
  "@container hcmd (max-width:440px){.hc .hc-mn{gap:6px}.hc .hc-mn-b{flex:1 1 auto;padding:0 9px;gap:5px;font-size:15px;min-height:40px}.hc .hc-mn-b svg{width:15px;height:15px}}",
  ".hc .hc-mn-b.on{border-color:#C9A66B;box-shadow:0 0 0 1px rgba(201,166,107,.35) inset}",   /* actif : noir, contour champagne — jamais plein doré */
  ".hc .hc-xm{margin-top:18px}",
  ".hc .hc-xm-lt{display:none;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:26px;color:#F3EEE4;margin:0 0 12px}",
  ".hc .hc-xm-ll{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity;padding-bottom:2px}",
  ".hc .hc-xm-ll::-webkit-scrollbar{display:none}",
  ".hc .hc-xm-it{flex:0 0 auto;scroll-snap-align:start;display:flex;align-items:center;gap:12px;min-height:64px;padding:8px 18px 8px 8px;border-radius:14px;border:1px solid rgba(201,166,107,.18);background:#070A08;color:#F3EEE4;text-align:start;cursor:pointer;font:inherit}",
  ".hc .hc-xm-it.on{border-color:#C9A66B}",
  ".hc .hc-xm-av{flex:none;width:48px;height:48px;border-radius:50%;overflow:hidden;border:1px solid rgba(201,166,107,.6);background:#101413;display:flex;align-items:center;justify-content:center}",
  ".hc .hc-xm-av img{width:100%;height:100%;object-fit:cover}",
  ".hc .hc-xm-av b{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:500;color:#C9A66B}",
  ".hc .hc-xm-in{display:flex;flex-direction:column;min-width:0}",
  ".hc .hc-xm-in b{font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:500;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}",
  ".hc .hc-xm-in small{font-size:12px;color:rgba(243,238,228,.7);margin-top:2px}",
  ".hc .hc-xm-chev{display:none;margin-inline-start:auto;font-style:normal;color:#C9A66B;font-size:20px}",
  ".hc .hc-xm-tous{display:inline-flex;align-items:center;min-height:38px;margin-top:10px;padding:0 16px;border-radius:999px;border:1px solid rgba(201,166,107,.5);background:transparent;color:#C9A66B;font-size:12.5px;cursor:pointer}",
  ".hc .hc-xm-main{margin-top:18px;min-width:0;container:hcxm/inline-size}",
  /* bandeau : la photo entière à gauche, fondue dans le noir ; le nom en grand */
  ".hc .hc-xm-band{position:relative;display:flex;align-items:center;gap:14px;min-height:118px;border-top:1px solid rgba(201,166,107,.18);border-bottom:1px solid rgba(201,166,107,.18);padding:10px 0;overflow:hidden}",
  ".hc .hc-xm-bph{flex:0 1 auto;max-width:44%;height:118px;display:flex}",
  ".hc .hc-xm-bph img{height:100%;width:auto;max-width:100%;object-fit:contain;display:block;-webkit-mask-image:linear-gradient(90deg,#000 62%,transparent);mask-image:linear-gradient(90deg,#000 62%,transparent)}",
  "[dir=rtl] .hc .hc-xm-bph img{-webkit-mask-image:linear-gradient(270deg,#000 62%,transparent);mask-image:linear-gradient(270deg,#000 62%,transparent)}",
  ".hc .hc-xm-btx{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:4px}",
  ".hc .hc-xm-btx h3{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;font-size:clamp(30px,8vw,46px);line-height:1;color:#F3EEE4;max-width:100%;overflow-wrap:anywhere}",
  ".hc .hc-xm-btx p{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:17px;color:rgba(243,238,228,.88)}",
  ".hc .hc-xm-cpt{display:flex;flex-wrap:wrap;gap:4px 16px;margin:6px 0 8px;font-size:13px;color:#F3EEE4}",
  ".hc .hc-xm-cpt span{display:inline-flex;align-items:center;gap:6px}",
  ".hc .hc-xm-cpt b{font-weight:600}",
  ".hc .hc-xm-btx .hc-md-aj{min-height:36px;padding:0 14px;font-size:12.5px}",
  /* filtres croisés « Avec … » : noirs, contour champagne quand actifs */
  ".hc .hc-xm-fil{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:16px 0 14px;padding-bottom:2px}",
  ".hc .hc-xm-fil::-webkit-scrollbar{display:none}",
  ".hc .hc-xm-f{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:0 15px;border-radius:999px;border:1px solid rgba(201,166,107,.28);background:#070A08;color:#F3EEE4;font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;white-space:nowrap;cursor:pointer}",
  ".hc .hc-xm-f svg{width:17px;height:17px}",
  ".hc .hc-xm-f.on{border-color:#C9A66B}",
  /* mosaïque : chaque média à ses vraies proportions, aucune découpe */
  ".hc .hc-xm-mos{column-count:2;column-gap:9px}",
  ".hc .hc-xm-t{position:relative;break-inside:avoid;margin:0 0 9px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,166,107,.3);background:#0B0E0C}",
  ".hc .hc-xm-b{position:relative;display:block;width:100%;padding:0;border:none;background:none;cursor:pointer;line-height:0}",
  ".hc .hc-xm-b img{display:block;width:100%;height:auto}",
  ".hc .hc-xm-b.vide,.hc .hc-xm-vide{display:block;aspect-ratio:4/3;background:linear-gradient(160deg,#141a1c,#0a0d0e)}",
  ".hc .hc-xm-t .hc-md-play{width:38px;height:38px}",
  ".hc .hc-xm-t .hc-mt-id{z-index:2;width:26px;height:26px;font-size:14px}",
  "@container hcxm (min-width:520px){.hc .hc-xm-mos{column-count:3;column-gap:12px}.hc .hc-xm-t{margin-bottom:12px}.hc .hc-xm-bph{height:150px}.hc .hc-xm-band{min-height:150px}}",
  "@container hcxm (min-width:820px){.hc .hc-xm-mos{column-count:4}.hc .hc-xm-band{gap:24px}.hc .hc-xm-bph{height:170px}.hc .hc-xm-btx{flex-direction:row;flex-wrap:wrap;align-items:center;column-gap:22px}.hc .hc-xm-btx h3,.hc .hc-xm-btx p{flex-basis:100%}.hc .hc-xm-btx .hc-md-aj{margin-inline-start:auto}}",
  "@container hcmd (min-width:600px){.hc .hc-md-une .hc-md-p,.hc .hc-md-une.n2 .hc-md-m{aspect-ratio:16/9}.hc .hc-md-une .hc-md-m{aspect-ratio:16/10}.hc .hc-md-grille{grid-template-columns:repeat(4,1fr);gap:9px}.hc .hc-md-g{aspect-ratio:4/3}.hc .hc-md-acc-t small{display:block}.hc .hc-xp .hc-vg-i,.hc .hc-xp .hc-vg.seule .hc-vg-i{flex:0 0 calc((100% - 20px) / 3)}.hc .hc-md-s{margin-top:32px}}",
  "@container hcmd (min-width:900px){.hc .hc-md-grille{grid-template-columns:repeat(5,1fr)}.hc .hc-md-xp{grid-template-columns:1fr 1fr;gap:22px}}",
  /* ordinateur : les trois premiers souvenirs sur une ligne, même hauteur ; galerie large */
  "@container hcmd (min-width:1024px){.hc .hc-md-une{grid-template-columns:1.75fr 1fr 1fr;grid-auto-rows:clamp(220px,22cqw,330px);gap:14px}.hc .hc-md-une .hc-md-p,.hc .hc-md-une .hc-md-m,.hc .hc-md-une.n2 .hc-md-m{grid-column:auto;aspect-ratio:auto}.hc .hc-md-une.n2{grid-template-columns:1.75fr 1fr}.hc .hc-md-une.n1{grid-template-columns:1fr;grid-auto-rows:clamp(260px,36cqw,460px)}.hc .hc-md-grille{grid-template-columns:repeat(6,1fr);gap:12px}.hc .hc-md-acc{min-height:74px;padding:12px 24px}.hc .hc-md-acc-t b{font-size:27px}.hc .hc-xp .hc-vg-i,.hc .hc-xp .hc-vg.seule .hc-vg-i{flex:0 0 calc((100% - 30px) / 4)}}",
  "@container hcmd (min-width:860px){.hc .hc-xm{display:grid;grid-template-columns:250px minmax(0,1fr);gap:26px;align-items:start}.hc .hc-xm-lt{display:block}.hc .hc-xm-ll{flex-direction:column;overflow:visible;gap:8px}.hc .hc-xm-it{width:100%;box-sizing:border-box}.hc .hc-xm-chev{display:block}.hc .hc-xm-main{margin-top:0}.hc .hc-mn{margin-top:4px}.hc .hc-md-tete{margin-bottom:10px}}",
  "@container hcmd (min-width:1400px){.hc .hc-md-grille{grid-template-columns:repeat(7,1fr)}}"
].join("\n");
function hsCssConcours() {
  try { injecterCss2(); if (document.getElementById(HC_CSS_ID)) return; var st = document.createElement("style"); st.id = HC_CSS_ID; st.textContent = HC_CSS; document.head.appendChild(st); } catch (e) { }
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
/* 09/11 13h25 (Blandine : « on a des outils pour lire les PDF ou les screens ; sur cette page on s'attend à pouvoir rentrer
   les résultats ») — LIRE LES RÉSULTATS D'UN CONCOURS (PDF de résultats, capture du site FFE ou du chronométreur, photo du
   tableau) : même chemin que l'ordre de passage (hey-baby-vision). Seulement les couples de l'équipe ; rien n'est publié
   sans que la coach vérifie la saisie rapide pré-remplie puis touche « Publier ». */
async function hsLireResultats(images, equipe) {
  var sess = await supa.auth.getSession();
  var sv = sess && sess.data && sess.data.session;
  if (!sv || !sv.access_token) throw new Error("session");
  var system = "Tu lis les resultats d'un concours d'equitation (PDF de resultats FFE, capture d'ecran du site FFE ou du chronometreur, photo d'un tableau). "
    + "Reponds UNIQUEMENT en JSON : {\"epreuves\":[{\"nom\":\"nom de l'epreuve recopie (ex. Club 2 Grand Prix)\",\"numero\":\"numero ou vide\",\"partants\":\"nombre de partants ou vide\",\"lignes\":[{\"place\":\"rang en chiffres ou vide\",\"cavalier\":\"nom recopie\",\"cheval\":\"nom recopie\",\"penalites\":\"points de penalite ou vide\",\"temps\":\"temps en secondes ex. 62.45 ou vide\",\"gains\":\"gains en euros ou vide\",\"mention\":\"SF, El, Ab, NP, NC ou vide\"}]}]}. "
    + "Dans lignes, mets SEULEMENT les couples de cette liste s'ils apparaissent (compare surtout le nom du cheval) : " + JSON.stringify((equipe || []).slice(0, 60)) + ". "
    + "Si un tableau compte les partants ou le nombre de classes, donne le nombre total de partants. Recopie exactement ce qui est ecrit. N'invente RIEN : case illisible ou absente = chaine vide.";
  var blocs = (Array.isArray(images) ? images : [images]).map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
  blocs.push({ type: "text", text: blocs.length > 1 ? "Ces images sont les pages des resultats. Lis les resultats de ces couples." : "Lis les resultats de ces couples sur cette image." });
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
  return Array.isArray(o.epreuves) ? o.epreuves : [];
}
/* 09/11 13h50 (Blandine : « quand il voit le même cavalier, le même cheval, la même épreuve, il devrait se poser des questions ») —
   clé d'un tour : épreuve (fautes rectifiées) + cheval, sans accents ni majuscules. Deux tours d'un même cavalier avec la même clé = doublon. */
function hsCleTour(ep, ch) {
  function n(x) { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  return n(hsNomEpreuve(ep || "")) + "|" + n(ch);
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
  return hsCorrigerEpreuve(String(t || "").replace(/([A-Za-zÀ-ÿ])(\d)/g, "$1 $2").replace(/(\d)([A-Za-zÀ-ÿ]{2,})/g, "$1 $2").replace(/\s+/g, " ").trim());
}
/* 09/11 (Blandine : « que ça rectifie automatiquement les fautes » — cas réel « Clib 3 ») : chaque mot d'un nom d'épreuve
   est comparé au vocabulaire FFE ; à une lettre près (deux pour les mots longs), il est remplacé par le bon mot.
   Les nombres, hauteurs et mots inconnus ne bougent pas. Sert à l'affichage ET à l'enregistrement des engagements. */
var HS_VOC_EP = ["Club", "Poney", "Amateur", "Pro", "Préparatoire", "Elite", "Élite", "Vitesse", "Grand", "Prix", "As", "Jeune", "Jeunes", "Chevaux", "Equipe", "Équipe", "Barrage", "Spéciale", "Critérium", "Championnat", "Derby", "Six", "Barres", "Puissance", "Relais", "Cadet", "Junior", "Senior", "Minime", "Benjamin", "Poussin", "Circuit", "Ponam", "Tournée"];
function hsDistance(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase(); if (a === b) return 0;
  var m = a.length, n = b.length, d = []; for (var i = 0; i <= m; i++) { d[i] = [i]; } for (var j = 1; j <= n; j++) d[0][j] = j;
  for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function hsSansAccent(t) { try { return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, ""); } catch (e) { return String(t); } }
function hsCorrigerEpreuve(t) {
  return String(t || "").split(" ").map(function (w) {
    if (!w || /\d/.test(w) || w.length < 3) return w;
    var brut = hsSansAccent(w).toLowerCase(), meilleur = null, dist = 9;
    HS_VOC_EP.forEach(function (v) { var dd = hsDistance(brut, hsSansAccent(v)); if (dd < dist) { dist = dd; meilleur = v; } });
    if (dist === 0) return w;   /* déjà juste (on garde sa casse et ses accents) */
    var tol = brut.length >= 7 ? 2 : 1;
    return (meilleur && dist <= tol) ? meilleur : w;
  }).join(" ");
}
/* 07/11/2026 23h20 (Blandine, choix « C » : une ligne par tour) — les tours d'un engagement sont rangés dans concours_tours
   (numéro 1 à 5). La page Engagements recopie encore les deux premiers tours dans les colonnes « tour 1 / tour 2 » de
   concours_engagements (hsMiroir). 08/11 : Jour J, la fiche du concours (Ma journée) et le dossier lisent les 5 tours ;
   la liste du van ne lit que le cheval du 1er tour (une liste par cheval) ; Ma saison ne lit pas les engagements. */
function hsToursDepuis(l, liste) {
  if (liste && liste.length) return liste.map(function (t) { var n = t.numero; return { numero: n, ordre_passage: t.ordre_passage || null, cheval_id: t.cheval_id || ((n === 1 || n === 2) ? (l["cheval" + n + "_id"] || null) : null), epreuve: hsNomEpreuve(t.epreuve || ""), cheval_nom: String(t.cheval_nom || "").trim(), passage: t.passage || ((n === 1 || n === 2) ? (l["passage" + n] || "") : ""), piste: t.piste || ((n === 1 || n === 2) ? (l["piste" + n] || "") : "") }; });
  var o = [];
  [1, 2].forEach(function (n) {
    var e = hsNomEpreuve(l["epreuve" + n] || ""), c = String(l["cheval" + n + "_nom"] || "").trim();
    if (e || c) o.push({ numero: n, cheval_id: l["cheval" + n + "_id"] || null, epreuve: e, cheval_nom: c, passage: l["passage" + n] || "", piste: l["piste" + n] || "" });
  });
  return o;
}
function hsMiroir(l) {
  var t = l.tours || [];
  return Object.assign({}, l, { epreuve1: (t[0] && t[0].epreuve) ? hsNomEpreuve(t[0].epreuve) : "", cheval1_nom: (t[0] && t[0].cheval_nom) || "", epreuve2: (t[1] && t[1].epreuve) ? hsNomEpreuve(t[1].epreuve) : "", cheval2_nom: (t[1] && t[1].cheval_nom) || "" });
}
/* feuille papier : deux tours par ligne ; un cavalier à 3, 4 ou 5 tours prend 2 ou 3 lignes */
function hsLignesFeuille(lignes) {
  var o = [];
  (lignes || []).forEach(function (l) {
    var t = l.tours || [];
    if (t.length <= 2) { o.push(hsMiroir(l)); return; }
    for (var k = 0; k < t.length; k += 2) o.push(hsMiroir(Object.assign({}, l, { tours: t.slice(k, k + 2) })));
  });
  return o;
}
/* Blandine 07/11 23h05 : « un cavalier peut faire jusqu'à 5 tours par jour à poney et 3 en épreuve club » */
function hsMaxTours(eps) { return (eps || []).some(function (e) { return /poney|pony|^p\s?\d/i.test(String(e || "")); }) ? 5 : 3; }
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
  var _ncl = React.useState(""); var nomClubAff = _ncl[0], setNomClubAff = _ncl[1];   /* 07/11 : nom du club écrit en tête de la feuille neutre */
  var _cch = React.useState(null); var choixCh = _cch[0], setChoixCh = _cch[1];       /* 07/11 : fenêtre « Choisir les chevaux » { sel, busy, err } */
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
    if (lignes.every(function (l) { return (l.tours || []).every(function (t) { return !t.cheval_nom || t.passage; }); })) return;
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
  /* 07/11 23h20 — composeur « P1 / D3 » : qui, quel cheval, quelle épreuve, en tuiles photo ; la barre du bas se remplit */
  var _cp = React.useState({ cav: null, ch: "", ep: "", etape: 1 }); var comp = _cp[0], setComp = _cp[1];
  var _mt = React.useState(null); var modTour = _mt[0], setModTour = _mt[1];   /* 09/11 (Blandine) : modifier / supprimer un tour engagé — { i, k, ep, ch, sup } */
  var _cpa = React.useState(""); var autreC = _cpa[0], setAutreC = _cpa[1];   /* "cav" | "ch" | "ep" : saisie « autre » ouverte */
  var _cph = React.useState(""); var autreCh = _cph[0], setAutreCh = _cph[1];
  var _cpm = React.useState(""); var msgC = _cpm[0], setMsgC = _cpm[1];
  /* 09/11 : ordre de passage choisi depuis la carte Passages de la fiche concours → lu ici dès que les engagements sont chargés */
  React.useEffect(function () {
    if (!lignes || !lignes.length) return;
    var f = null; try { f = window.__ordreFichier || null; window.__ordreFichier = null; } catch (e) { }
    if (!f) return;
    lireOrdre({ target: { files: [f] } });
    setTimeout(function () { try { var el = document.querySelector(".d3-ordre"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e2) { } }, 400);
  }, [lignes]);
  var _cpl = React.useState(false); var editLic = _cpl[0], setEditLic = _cpl[1];
  /* 08/11 00h10 (Blandine, choix B : « j'ai mis trois fois l'ordre de passage dans le lecteur des engagements ») : lecture de
     l'ordre de passage / programme directement ici, pour tous les tours (1 à 5). Même lecture que Jour J (hsLireProgramme). */
  var _olu = React.useState(null); var ordreProp = _olu[0], setOrdreProp = _olu[1];
  var _olc = React.useState(""); var ordreLect = _olc[0], setOrdreLect = _olc[1];
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
        try {
          var rT = await supa.from("concours_tours").select("*").eq("agenda_id", idEv).order("numero", { ascending: true });
          if (rT && rT.error) throw rT.error;
          var parEng = {}; ((rT && rT.data) || []).forEach(function (t) { (parEng[t.engagement_id] = parEng[t.engagement_id] || []).push(t); });
          L.forEach(function (l) { l.tours = hsToursDepuis(l, parEng[l.id]); });
        } catch (eTo) { L.forEach(function (l) { l.tours = hsToursDepuis(l, null); }); }
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
        if (vif) setNomClubAff(nomClub);
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
        if (false && !L.length) {   /* 07/11 23h20 : plus de lignes vides pré-remplies, les inscrits sont proposés en premier dans les tuiles */
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
    if (val === "__autre" || (val && val.libre !== undefined)) n.push({ __n: true, cavalier_id: null, nom: (val && val.libre) || "", licence: "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", tours: [], ordre: n.length });
    else {
      var p = (typeof val === "object") ? val : candidates.filter(function (c) { return c.id === val; })[0]; if (!p) return;
      n.push({ __n: true, cavalier_id: p.id, nom: p.nom || nomFfeDe(p.pseudo), licence: p.licence || "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", tours: [], ordre: n.length });
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
      setLus(res); setLecture(res.length ? "" : "Aucun cavalier trouvé sur cette fiche.");
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
      n.push({ __n: true, cavalier_id: x.compte ? x.compte.id : null, nom: x.nom, licence: x.licence, ordre: n.length,
        tours: [[x.epreuve1, x.cheval1], [x.epreuve2, x.cheval2]].filter(function (y) { return y[0] || y[1]; }).map(function (y) { return { epreuve: y[0] || "", cheval_nom: String(y[1] || "").trim(), passage: "", piste: "" }; }) });
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

  function enregistrer(lignesX, supprX) { return enregistrerL(Array.isArray(lignesX) ? lignesX : lignes, Array.isArray(supprX) ? supprX : supprimees); }
  async function enregistrerL(lignes, supprimees) {
    if (occupe || !feuille || !lignes) return;
    var vides = lignes.filter(function (l) { return !String(l.nom || "").trim(); });
    if (vides.length) { setMsg(F("Il manque le nom d’un cavalier.")); return; }
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
      var nouv = [], doublons = [], vusCav = {};
      for (var i = 0; i < lignes.length; i++) {
        var l = lignes[i];
        /* même cavalier + même épreuve + même cheval (dans sa ligne ou dans une autre ligne du même cavalier) : on garde le premier tour */
        var cleCav = l.cavalier_id ? "id:" + l.cavalier_id : "nom:" + String(l.nom || "").trim().toLowerCase();
        var vus = vusCav[cleCav] = vusCav[cleCav] || {};
        var toursL = (l.tours || []).filter(function (t) { return t.epreuve || t.cheval_nom; }).filter(function (t) {
          var c = hsCleTour(t.epreuve, t.cheval_nom); if (c === "|") return true;
          if (vus[c]) { var p0 = vus[c]; if (!p0.passage && t.passage) p0.passage = t.passage; if (!p0.piste && t.piste) p0.piste = t.piste; doublons.push(String(l.nom || "").trim() + " · " + (t.cheval_nom || "") + " · " + hsNomEpreuve(t.epreuve || "")); return false; }
          vus[c] = t; return true;
        }).slice(0, 5);
        var mi = hsMiroir({ tours: toursL });
        var row = { agenda_id: idEv, cavalier_id: l.cavalier_id || null, nom: String(l.nom || "").trim(), licence: String(l.licence || "").trim() || null,
          epreuve1: mi.epreuve1 || null, cheval1_nom: mi.cheval1_nom || null, cheval1_id: idCheval(mi.cheval1_nom),
          epreuve2: mi.epreuve2 || null, cheval2_nom: mi.cheval2_nom || null, cheval2_id: idCheval(mi.cheval2_nom),
          passage1: (toursL[0] && toursL[0].passage) || null, piste1: (toursL[0] && toursL[0].piste) || null,
          passage2: (toursL[1] && toursL[1].passage) || null, piste2: (toursL[1] && toursL[1].piste) || null,
          ordre: i, maj_le: new Date().toISOString() };
        var rr = l.id
          ? await supa.from("concours_engagements").update(row).eq("id", l.id).select("*")
          : await supa.from("concours_engagements").insert(row).select("*");
        if (rr && rr.error) throw new Error(row.nom + " : " + (rr.error.message || rr.error));
        if (!rr || !rr.data || !rr.data.length) throw new Error(row.nom + F(" : refusé par la base"));
        var eid = rr.data[0].id;
        var rdT = await supa.from("concours_tours").delete().eq("engagement_id", eid);
        if (rdT && rdT.error) throw new Error(row.nom + " : " + (rdT.error.message || rdT.error));
        if (toursL.length) {
          var riT = await supa.from("concours_tours").insert(toursL.map(function (t, k) {
            return { engagement_id: eid, agenda_id: idEv, numero: k + 1, epreuve: t.epreuve ? hsNomEpreuve(t.epreuve) : null,   /* 09/11 : fautes rectifiées à l'enregistrement */ cheval_nom: t.cheval_nom || null, cheval_id: idCheval(t.cheval_nom), passage: t.passage || null, piste: t.piste || null, ordre_passage: t.ordre_passage || null };
          })).select("id");
          if (riT && riT.error) throw new Error(row.nom + " : " + (riT.error.message || riT.error));
        }
        nouv.push(Object.assign({}, rr.data[0], { tours: toursL }));
        /* la licence et le nom sont gardés pour la prochaine fois */
        if (row.cavalier_id && (row.licence || row.nom)) {
          try { await supa.from("cavaliers_licences").upsert({ user_id: row.cavalier_id, nom: row.nom, licence: row.licence, maj_le: new Date().toISOString() }, { onConflict: "user_id" }).select("user_id"); } catch (eLi) { }
        }
      }
      setLignes(nouv); setSupprimees([]); setModifie(false);
      setFeuille(Object.assign({}, feuille, { __nouvelle: false }));
      setMsg(F("✓ Enregistré.") + (doublons.length ? " " + F("Engagé deux fois dans la même épreuve avec le même cheval, le doublon a été retiré : ") + doublons.join(", ") + "." : ""));
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
  lignes.forEach(function (l, i) { (l.tours || []).forEach(function (t, k) { var c = String(t.cheval_nom || "").trim(); if (!c) return; (montes[c] = montes[c] || []).push({ i: i, n: k + 1, qui: prenomDe(l.nom) }); }); });
  var proposees = candidates.filter(function (c) { return (c.src === "inscrite" || c.src === "compet") && c.id !== moiId; });
  var chevauxConc = chevaux.filter(function (c) { return c.src === "concours"; });
  /* 07/11 (Blandine : « ça veut me donner les feuilles d’engagement de la SEP » pour un concours de Feinn) : la feuille SEP
     reste pour la SEP seulement ; tout autre club a une feuille d’engagement neutre (feuilleNeutre). */
  var estSep = !!(ev && typeof TEAM_CLE !== "undefined" && ev.club_clef === TEAM_CLE);
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
  function epDe(x) { var t = lignes[x.i] && lignes[x.i].tours && lignes[x.i].tours[x.n - 1]; return t ? (t.epreuve || "") : ""; }
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
    var o = [["couples", F("Cavaliers et chevaux")], ["epreuves", F("Par épreuve")], ["grille", F("Grille des tours")]];
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
      null);   /* 07/11 23h20 : les épreuves se créent à l'étape 3 du composeur (« Nouvelle épreuve ») */
  }
  /* 07/11 00h22-00h33 (Blandine : « sur la page de mes engagements fais un récapitulatif clair à la fin, par cavalier, par cheval
     et par épreuve » ; choix : chevaux = cartes photo à faire glisser avec leurs tours en cases (E) ; cavalières = « ses deux
     couples » en vignettes photo (I) ; épreuves = le fil de la journée, rangé par ordre de passage une fois sorti). */
  function recapFin() {
    var cav = lignes.map(function (l, i) { return { l: l, i: i }; }).filter(function (x) { return String(x.l.nom || "").trim(); });
    if (!cav.length) return null;
    function kTour(i, n) { var t = (lignes[i].tours || [])[n - 1], c = String((t && t.cheval_nom) || "").trim(), k = 0; (montes[c] || []).forEach(function (x, j) { if (x.i === i && x.n === n) k = j + 1; }); return k; }
    function nomPrenom(nom) { var m = String(nom || "").trim().split(/\s+/), maj = m.filter(function (w) { return w.length > 1 && w === w.toUpperCase(); }), mi = m.filter(function (w) { return !(w.length > 1 && w === w.toUpperCase()); }); var a = maj.join(" "), b = mi.join(" "); return [a || (b ? "" : (m[0] || "")), b]; }   /* 07/11 : un nom sans NOM en capitales ne s'écrit plus deux fois */
    /* par épreuve, rangé par heure de passage quand elle est connue (Jour J ou chronométreur repris dans Jour J) */
    var parEp = {}, ordreEp = [];
    lignes.forEach(function (l, i) { (l.tours || []).forEach(function (t, k0) {
      var n = k0 + 1, e = String(t.epreuve || "").trim(), c = String(t.cheval_nom || "").trim(); if (!e && !c) return;
      var k = e || F("Épreuve à choisir"); if (!parEp[k]) { parEp[k] = []; ordreEp.push(k); }
      var hS = String(t.passage || "").trim(), lu = (!hS && l.id && c) ? ordreLu[l.id + "|" + c.toLowerCase()] : null;
      parEp[k].push({ i: i, n: n, nom: String(l.nom || "").trim() || "?", ch: c, h: hS || (lu && lu.h ? "~" + lu.h : ""), lu: !!lu, ordreLu: lu ? lu.ordre : 0, piste: String(t.piste || "").trim() });
    }); });
    ordreEp.sort(function (a, b) { return (eps.indexOf(a) === -1 ? 99 : eps.indexOf(a)) - (eps.indexOf(b) === -1 ? 99 : eps.indexOf(b)) || a.localeCompare(b, "fr"); });
    return h("div", { className: "rc" },
      h("div", { className: "rc-tete" },
        h("svg", { viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true" },
          h("defs", null, h("linearGradient", { id: "rcg", x1: "0", x2: "1" }, h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".5", stopColor: "#C9A66B", stopOpacity: ".9" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
          h("path", { d: "M0 54 C 120 52, 240 34, 400 4", fill: "none", stroke: "url(#rcg)", strokeWidth: 1.2 })),
        h("div", { className: "rc-eb" }, F("Récapitulatif")),
        h("h2", null, F("La journée en un coup d’œil")),
        h("p", null, cav.length + (cav.length > 1 ? F(" cavaliers · ") : F(" cavalier · ")) + nbTours + (nbTours > 1 ? F(" tours · ") : F(" tour · ")) + nomsCh.length + (nomsCh.length > 1 ? F(" chevaux") : F(" cheval")))),
      /* les cavalières : cartes photo deux par ligne, comme les cartes chevaux du « programme » (D) — essai demandé par Blandine
         07/11 01h32. Fond : sa photo de profil si elle en a une, sinon la photo de son premier cheval. */
      h("div", { className: "rc-t" }, h("h3", null, F("Les cavaliers")), h("span", null, cav.length + (cav.length > 1 ? F(" cavaliers · ") : F(" cavalier · ")) + nbTours + (nbTours > 1 ? F(" tours") : F(" tour")))),
      h("div", { className: "rc-dg" }, cav.map(function (x, r) {
        var np = nomPrenom(x.l.nom), p0 = cavDe(x.l), pv = p0 && p0.avatar_url ? hsPhotoProfil(p0) : "";
        var c1 = ((x.l.tours || []).filter(function (t) { return t.cheval_nom; })[0] || {}).cheval_nom || "";
        var fond = pv || (c1 ? photoCh(c1) : "");
        var tours = (x.l.tours || []).map(function (t, k0) { var c = String(t.cheval_nom || "").trim(), e = String(t.epreuve || "").trim(); if (!c && !e) return null; var k = c ? kTour(x.i, k0 + 1) : 0; return { c: c, e: e, k: k }; }).filter(Boolean);
        return h("div", { key: "rc" + x.i, className: "rc-dc" },
          fond ? h("img", { src: fond, alt: "" }) : null, h("div", { className: "voile" }),
          h("span", { className: "rc-dn" }, String(r + 1)),
          x.l.licence ? h("span", { className: "rc-dl" }, x.l.licence) : null,
          h("div", { className: "rc-dt" },
            h("h4", null, np[1] || np[0], np[1] && np[0] ? h("span", null, np[0]) : null),
            h("ol", null, tours.length ? tours.map(function (t, k) { return h("li", { key: k }, (t.c || F("cheval à choisir")), t.k ? h("span", { className: "sup" }, String(t.k)) : null, t.e ? h("em", null, " · " + t.e) : null); }) : h("li", { className: "libre" }, F("chevaux à choisir")))));
      })),
      /* les chevaux : cartes à faire glisser, leurs tours en cases */
      nomsCh.length ? h(React.Fragment, null,
        h("div", { className: "rc-t" }, h("h3", null, F("Les chevaux")), h("span", null, libresTot + (libresTot > 1 ? F(" places libres") : F(" place libre")))),
        h("div", { className: "rc-rail", "data-hscroll": "1", "data-noswipe": "1" }, nomsCh.map(function (c) {
          var m = montes[c] || [], cases = [];
          /* 08/11 (Blandine : « ajoute le tour suivant que quand celui d'avant est rempli, ça évite de surcharger ») :
             les tours pris, puis UNE seule place libre (tant que le maximum n'est pas atteint) */
          for (var j = 0; j < Math.max(Math.min(toursMax, m.length + 1), m.length); j++) {
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
              h("div", { className: "q" }, h("b", null, [np[1], np[0]].filter(Boolean).join(" ")),
                h("span", null, x.ch || F("cheval à choisir"), k ? h("span", { className: "sup" }, String(k)) : null, x.piste ? " · " + F("piste ") + x.piste : "")),
              h("div", { className: "hh" + (x.h ? "" : " vide") }, x.h || "—"),
              h("button", { type: "button", className: "rc-x rc-mod", "aria-label": F("Modifier ou supprimer"), onClick: function () { var t0 = ((lignes[x.i] || {}).tours || [])[x.n - 1] || {}; setMsgC(""); setModTour(modTour && modTour.i === x.i && modTour.k === x.n - 1 ? null : { i: x.i, k: x.n - 1, ep: t0.epreuve || e, ch: t0.cheval_nom || x.ch || "", sup: false }); } },
                h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, "aria-hidden": "true" }, h("path", { d: "M4 20h4L19 9l-4-4L4 16v4z", fill: "none", stroke: "#C9A66B", strokeWidth: 1.5, strokeLinejoin: "round" }))),
              (modTour && modTour.i === x.i && modTour.k === x.n - 1) ? h("div", { className: "rc-modp" },
                h("label", null, h("span", null, F("Épreuve")), h("input", { type: "text", list: "rc-eps", value: modTour.ep, onChange: function (ev2) { setModTour(Object.assign({}, modTour, { ep: ev2.target.value })); } })),
                h("datalist", { id: "rc-eps" }, eps.concat(ordreEp).filter(function (v, iv, tt) { return v && tt.indexOf(v) === iv; }).map(function (v) { return h("option", { key: v, value: v }); })),
                h("label", null, h("span", null, F("Cheval")), h("input", { type: "text", list: "d3-chevaux-m", value: modTour.ch, onChange: function (ev2) { setModTour(Object.assign({}, modTour, { ch: ev2.target.value })); } })),
                h("datalist", { id: "d3-chevaux-m" }, (chevaux || []).map(function (c) { return h("option", { key: c.id || c.nom, value: c.nom }); })),
                modTour.sup ? h("div", { className: "rc-modc" }, h("span", null, F("Supprimer ce tour de ") + [np[1], np[0]].filter(Boolean).join(" ") + " ?"),
                    h("button", { type: "button", className: "hs-lien", onClick: function () { setModTour(Object.assign({}, modTour, { sup: false })); } }, F("Non")),
                    h("button", { type: "button", className: "rc-modx", onClick: function () { var mt = modTour; setModTour(null); retirerTour(mt.i, mt.k); } }, F("Oui, supprimer")))
                  : h("div", { className: "rc-moda" },
                    h("button", { type: "button", className: "rc-modx", onClick: function () { setModTour(Object.assign({}, modTour, { sup: true })); } }, F("Supprimer ce tour")),
                    h("button", { type: "button", className: "hs-lien", onClick: function () { setModTour(null); } }, F("Annuler")),
                    h("button", { type: "button", className: "rc-modok", onClick: validerModif }, F("Enregistrer")))) : null);
          }));
      }));
  }
  /* ═══ 07/11/2026 23h20 — P1 + D3 (choix de Blandine) : on engage en 3 touchers, cavalier ou cavalière → cheval → épreuve,
     en tuiles photo (3 par ligne) ; la barre du bas se remplit et « Engager » s'allume. Le couple reste choisi pour le tour
     suivant (on change juste l'épreuve). Chaque engagement est enregistré tout de suite. ═══ */
  /* 07/11 23h50 (Blandine : « Chloe en double ») : un engagement fait sans compte (« Chloe ») et la cavalière du même nom
     qui a un compte sont la même personne : une seule tuile, et l'engagement se rattache à son compte au prochain tour. */
  function memeCav(l, c) {
    if (!l || !c) return false;
    if (c.id && l.cavalier_id === c.id) return true;
    return !l.cavalier_id && hsMemePers(l.nom, c.nom || c.pseudo);
  }
  function toursDuCav(c) {
    if (!c) return [];
    var l = lignes.filter(function (x) { return memeCav(x, c); })[0];
    return (l && l.tours) || [];
  }
  function choisirCav(c) { setComp({ cav: c, ch: comp.ch && comp.cav && c && comp.cav.id === c.id ? comp.ch : "", ep: "", etape: 2 }); setAutreC(""); setMsgC(""); setEditLic(false); setRecherche(""); }
  function choisirCh(nom) { setComp(Object.assign({}, comp, { ch: nom, etape: 3 })); setAutreC(""); setAutreCh(""); setMsgC(""); }
  function choisirEp(e) { setComp(Object.assign({}, comp, { ep: e })); setAutreC(""); setMsgC(""); }
  function engager() {
    if (!comp.cav || !comp.ch || !comp.ep || occupe) return;
    var n = lignes.slice(), j = -1;
    n.forEach(function (l, k) { if (j === -1 && memeCav(l, comp.cav)) j = k; });
    if (j !== -1 && !n[j].cavalier_id && comp.cav.id) n[j] = Object.assign({}, n[j], { cavalier_id: comp.cav.id });
    if (j === -1) { n.push({ __n: true, cavalier_id: comp.cav.id || null, nom: comp.cav.nom || nomFfeDe(comp.cav.pseudo) || "", licence: comp.cav.licence || "", tours: [], ordre: n.length }); j = n.length - 1; }
    var l = Object.assign({}, n[j]), t = (l.tours || []).slice();
    if (t.some(function (x) { return x.epreuve === comp.ep && x.cheval_nom === comp.ch; })) { setMsgC(F("Ce couple est déjà engagé dans cette épreuve.")); return; }
    var max = hsMaxTours(t.map(function (x) { return x.epreuve; }).concat([comp.ep]));
    if (t.length >= max) { setMsgC(F("Déjà ") + t.length + F(" tours : c’est le maximum (") + max + F(" par jour en ") + (max === 5 ? F("poney") : F("club")) + ")."); return; }
    t.push({ epreuve: comp.ep, cheval_nom: comp.ch, passage: "", piste: "" }); l.tours = t; n[j] = l;
    setLignes(n); setModifie(true);
    setMsgC("✓ " + prenomDe(l.nom) + " · " + comp.ch + " · " + comp.ep + F(" — engagé. Choisis une autre épreuve pour un tour de plus, ou un autre cavalier."));
    setComp(Object.assign({}, comp, { ep: "", etape: 3 }));
    enregistrer(n, supprimees);
  }
  function retirerTour(i, k) {
    var n = lignes.slice(), sup = supprimees.slice(), l = Object.assign({}, n[i]), t = (l.tours || []).slice();
    t.splice(k, 1); l.tours = t;
    if (!t.length) { if (l.id) sup.push(l.id); n.splice(i, 1); } else n[i] = l;
    setLignes(n); setSupprimees(sup); setModifie(true); setMsgC("");
    enregistrer(n, sup);
  }
  /* 09/11 (Blandine : « qu'on puisse modifier ou supprimer quelque chose qu'on a mis en engagement ») : un toucher sur la
     ligne ouvre, juste dessous, l'épreuve et le cheval à changer, et « Supprimer ce tour » (avec confirmation). */
  function validerModif() {
    if (!modTour) return; var ep = hsNomEpreuve(String(modTour.ep || "").trim()), ch = String(modTour.ch || "").trim();
    if (!ep) { setMsgC(F("Indique l’épreuve.")); return; }
    var n = lignes.slice(), l = Object.assign({}, n[modTour.i]), t = (l.tours || []).slice(), u = Object.assign({}, t[modTour.k]);
    var chChange = ch && ch !== u.cheval_nom;
    u.epreuve = ep; if (ch) u.cheval_nom = ch; if (chChange) { u.cheval_id = null; }
    t[modTour.k] = u; l.tours = t; n[modTour.i] = l;
    setLignes(n); setModifie(true); setModTour(null);
    setMsgC("✓ " + F("Engagement modifié : ") + ep + (ch ? " · " + ch : ""));
    enregistrer(n, supprimees);
  }
  function retirerSansTour(i) {
    var n = lignes.slice(), sup = supprimees.slice(), l = n[i]; if (l && l.id) sup.push(l.id); n.splice(i, 1);
    setLignes(n); setSupprimees(sup); setModifie(true);
    enregistrer(n, sup);
  }
  function tuile(k, photo, nom, badge, on, gris, onClick, pos) {
    return h("button", { key: k, type: "button", className: "d3-t" + (on ? " on" : "") + (gris ? " gris" : ""), disabled: !!gris, onClick: onClick, "aria-pressed": !!on },
      photo ? h("img", { src: photo, alt: "", loading: "lazy", style: pos ? { objectPosition: pos } : null }) : h("span", { className: "d3-ini" }, initiales(nom)),
      badge ? h("small", null, badge) : null, h("b", null, nom));
  }
  function tuilePlus(k, txt, onClick, on) { return h("button", { key: k, type: "button", className: "d3-t plus" + (on ? " on" : ""), onClick: onClick }, h("i", null, "＋"), h("span", null, txt)); }
  function composeur() {
    var et = comp.etape;
    function pastille(n, lab) {
      var fait = (n === 1 && comp.cav) || (n === 2 && comp.ch) || (n === 3 && comp.ep);
      var ok = n === 1 || (n === 2 && comp.cav) || (n === 3 && comp.cav && comp.ch);
      return h("button", { key: n, type: "button", disabled: !ok, className: "d3-et" + (et === n ? " on" : (fait ? " fait" : "")), onClick: function () { if (ok) { setComp(Object.assign({}, comp, { etape: n })); setAutreC(""); } } },
        h("i", null, fait && et !== n ? "✓" : String(n)), lab);
    }
    var etapes = h("div", { className: "d3-etapes" }, pastille(1, F("Qui")), h("span", { className: "d3-trait" + (comp.cav ? " fait" : "") }), pastille(2, F("Cheval")), h("span", { className: "d3-trait" + (comp.ch ? " fait" : "") }), pastille(3, F("Épreuve")));
    var corps;
    if (et === 1) {
      var vus = {}, liste = [];
      candidates.forEach(function (c) { if ((c.src === "inscrite" || c.src === "compet" || c.src === "team") && c.id !== moiId && !vus[c.id]) { vus[c.id] = 1; liste.push(c); } });
      lignes.forEach(function (l) {
        if (l.cavalier_id && vus[l.cavalier_id]) return;
        if (!l.cavalier_id && liste.some(function (c0) { return memeCav(l, c0); })) return;
        var c = l.cavalier_id ? candidates.filter(function (x) { return x.id === l.cavalier_id; })[0] : null;
        c = c || { id: l.cavalier_id || null, nom: l.nom, licence: l.licence || "", pseudo: "" };
        if (c.id) vus[c.id] = 1; liste.push(c);
      });
      if (!liste.length) candidates.filter(function (c) { return c.id !== moiId; }).slice(0, 11).forEach(function (c) { liste.push(c); });
      var tu = liste.map(function (c, k) {
        var t = toursDuCav(c), max = hsMaxTours(t.map(function (x) { return x.epreuve; }));
        var on = comp.cav && ((c.id && comp.cav.id === c.id) || (!c.id && !comp.cav.id && hsMemePers(comp.cav.nom, c.nom)));
        return tuile("c" + (c.id || k), c.id ? hsPhotoProfil(c) : "", prenomDe(c.nom || c.pseudo), t.length ? t.length + (t.length > 1 ? F(" tours") : F(" tour")) + (t.length >= max ? F(" · max") : "") : "", on, t.length >= 5, function () { choisirCav(c); });
      });
      corps = h(React.Fragment, null,
        h("h3", { className: "d3-q" }, F("Qui part en concours ?")),
        h("div", { className: "d3-g" }, tu),
        h("button", { type: "button", className: "hs-lien d3-petit", onClick: function () { setAutreC(autreC === "cav" ? "" : "cav"); } }, F("+ Un autre cavalier ›")),
        autreC === "cav" ? h("div", { className: "d3-autre" },
          h("input", { type: "search", value: recherche, placeholder: F("Nom ou pseudo"), autoFocus: true, onChange: function (e) { setRecherche(e.target.value); } }),
          q.length >= 2 ? h("div", { className: "hs-puces" },
            resultats.map(function (c) { return h("button", { key: c.id, type: "button", className: "hs-puce hs-puce-cav", onClick: function () { choisirCav(c); } }, (c.nom || c.pseudo || "?")); }),
            h("button", { type: "button", className: "hs-puce hs-puce-cav", onClick: function () { choisirCav({ id: null, nom: String(recherche).trim(), licence: "" }); } }, F("+ « ") + String(recherche).trim() + F(" » sans compte Hype"))) : null) : null);
    } else if (et === 2) {
      var base = chevaux.filter(function (c) { return c.src === "concours" || c.src === "team"; });
      if (!base.length) base = chevaux.slice(0, 11);
      var vusCh = {}; base.forEach(function (c) { vusCh[c.nom] = 1; });
      var enPlus = Object.keys(montes).filter(function (c) { return !vusCh[c]; });
      var tc = base.map(function (c) {
        var m = (montes[c.nom] || []).length;
        return tuile("h" + c.id, photoCh(c.nom), c.nom, m ? m + (m > 1 ? F(" tours") : F(" tour")) : "", comp.ch === c.nom, false, function () { choisirCh(c.nom); });
      }).concat(enPlus.map(function (c) { var m = (montes[c] || []).length; return tuile("hx" + c, photoCh(c), c, m + (m > 1 ? F(" tours") : F(" tour")), comp.ch === c, false, function () { choisirCh(c); }); }));
      corps = h(React.Fragment, null,
        h("h3", { className: "d3-q" }, F("Quel cheval pour ") + prenomDe(comp.cav && comp.cav.nom) + " ?"),
        h("div", { className: "d3-g" }, tc),
        h("button", { type: "button", className: "hs-lien d3-petit", onClick: function () { setAutreC(autreC === "ch" ? "" : "ch"); } }, F("+ Un autre cheval ›")),
        autreC === "ch" ? h("div", { className: "d3-autre d3-ligne" },
          h("input", { type: "text", list: "d3-chevaux", value: autreCh, placeholder: F("Nom du cheval"), autoFocus: true, onChange: function (e) { setAutreCh(e.target.value); }, onKeyDown: function (e) { if (e.key === "Enter" && String(autreCh).trim()) { e.preventDefault(); choisirCh(String(autreCh).trim()); } } }),
          h("datalist", { id: "d3-chevaux" }, chevaux.map(function (c) { return h("option", { key: c.id, value: c.nom }); })),
          h("button", { type: "button", className: "hs-lien", disabled: !String(autreCh).trim(), onClick: function () { choisirCh(String(autreCh).trim()); } }, F("Choisir"))) : null,
        h("button", { type: "button", className: "hs-lien d3-petit", onClick: ouvrirChoixCh }, F("Choisir les chevaux qui partent ›")));
    } else {
      var tCav = toursDuCav(comp.cav);
      var te = eps.map(function (e) {
        var nb = 0; lignes.forEach(function (l) { (l.tours || []).forEach(function (t) { if (t.epreuve === e) nb++; }); });
        var max = hsMaxTours(tCav.map(function (x) { return x.epreuve; }).concat([e]));
        var deja = tCav.some(function (x) { return x.epreuve === e && x.cheval_nom === comp.ch; });
        var plein = tCav.length >= max;
        return h("button", { key: "e" + e, type: "button", className: "d3-ep" + (comp.ep === e ? " on" : "") + (deja || plein ? " gris" : ""), disabled: deja || plein, onClick: function () { choisirEp(e); } },
          h("b", null, e), h("span", null, deja ? F("déjà engagé") : (plein ? F("maximum atteint") : (nb ? nb + (nb > 1 ? F(" tours") : F(" tour")) : F("personne encore")))),
          !nb ? h("i", { role: "button", "aria-label": F("Retirer l’épreuve ") + e, onClick: function (ev0) { ev0.stopPropagation(); retirerEpreuve(e); if (comp.ep === e) setComp(Object.assign({}, comp, { ep: "" })); } }, "×") : null);
      });
      corps = h(React.Fragment, null,
        h("h3", { className: "d3-q" }, F("Quelle épreuve ?")),
        te.length ? h("div", { className: "d3-g d3-ge" }, te) : null,
        h("button", { type: "button", className: "hs-lien d3-petit", onClick: function () { setAutreC(autreC === "ep" ? "" : "ep"); } }, F("+ Nouvelle épreuve ›")),
        autreC === "ep" || !eps.length ? h("div", { className: "d3-autre d3-ligne" },
          h("input", { type: "text", value: nouvelleEp, placeholder: F("Ex. Club 2, Poney 1"), autoFocus: autreC === "ep", onChange: function (e) { setNouvelleEp(e.target.value); }, onKeyDown: function (e) { if (e.key === "Enter") { e.preventDefault(); var t0 = hsNomEpreuve(nouvelleEp); ajouterEpreuve(); if (t0) { choisirEp(t0); } } } }),
          h("button", { type: "button", className: "hs-lien", onClick: function () { var t0 = hsNomEpreuve(nouvelleEp); ajouterEpreuve(); if (t0) choisirEp(t0); } }, F("Ajouter"))) : null);
    }
    /* la barre qui se remplit */
    var pCav = comp.cav && comp.cav.id ? hsPhotoProfil(comp.cav) : "";
    var licL = comp.cav ? (lignes.filter(function (l) { return memeCav(l, comp.cav); })[0] || null) : null;
    var licence = licL ? (licL.licence || "") : ((comp.cav && comp.cav.licence) || "");
    var pret = !!(comp.cav && comp.ch && comp.ep);
    return h("div", { className: "d3" },
      h("div", { className: "d3-k" }, F("Nouvel engagement")),
      etapes, corps,
      h("div", { className: "d3-recap" },
        h("button", { type: "button", className: "d3-rc" + (comp.cav ? "" : " vide"), onClick: function () { setComp(Object.assign({}, comp, { etape: 1 })); } },
          comp.cav ? (pCav ? h("img", { src: pCav, alt: "" }) : h("span", { className: "d3-mini" }, initiales(comp.cav.nom))) : h("i", null), h("span", null, comp.cav ? prenomDe(comp.cav.nom || comp.cav.pseudo) : F("Qui"))),
        h("button", { type: "button", className: "d3-rc" + (comp.ch ? "" : " vide"), disabled: !comp.cav, onClick: function () { setComp(Object.assign({}, comp, { etape: 2 })); } },
          comp.ch ? h("img", { src: photoCh(comp.ch), alt: "" }) : h("i", null), h("span", null, comp.ch || F("Cheval"))),
        h("button", { type: "button", className: "d3-rc" + (comp.ep ? " ep" : " vide"), disabled: !(comp.cav && comp.ch), onClick: function () { setComp(Object.assign({}, comp, { etape: 3 })); } },
          comp.ep ? h("em", null, (function (x) { var m = String(x).match(/\d+/); return (String(x).trim().charAt(0).toUpperCase() + (m ? m[0] : "")).slice(0, 3); })(comp.ep)) : h("i", null), h("span", null, comp.ep || F("Épreuve"))),
        h("button", { type: "button", className: "d3-ok" + (pret ? " pret" : ""), disabled: !pret || occupe, onClick: engager }, occupe ? "…" : F("Engager"))),
      comp.cav ? (editLic
        ? h("div", { className: "d3-autre d3-ligne" },
            h("input", { type: "text", value: licence, placeholder: F("N° de licence"), autoCapitalize: "characters", "aria-label": F("Licence"), autoFocus: true,
              onChange: function (e) { var v = e.target.value; if (licL) { var i0 = lignes.indexOf(licL); poserL(i0, "licence", v); } else setComp(Object.assign({}, comp, { cav: Object.assign({}, comp.cav, { licence: v }) })); } }),
            h("button", { type: "button", className: "hs-lien", onClick: function () { setEditLic(false); } }, F("OK")))
        : h("button", { type: "button", className: "hs-lien d3-petit", onClick: function () { setEditLic(true); } }, (licence ? F("Licence ") + licence : F("Licence à compléter")) + " ›")) : null,
      msgC ? h("div", { className: "d3-msg" }, msgC) : null,
      comp.cav ? h("button", { type: "button", className: "hs-lien d3-petit", onClick: function () { setComp({ cav: null, ch: "", ep: "", etape: 1 }); setMsgC(""); setEditLic(false); } }, F("Nouveau couple ›")) : null,
      /* lire une fiche déjà remplie (gardé) */
      h("label", { className: "hs-lien d3-petit", style: { cursor: "pointer", opacity: lecture === "en_cours" ? 0.6 : 1 } },
        lecture === "en_cours" ? F("Lecture de la fiche… (1 à 2 min)") : F("Ou lire une fiche déjà remplie (photo ou PDF) ›"),
        h("input", { type: "file", accept: "image/*,application/pdf", disabled: lecture === "en_cours", onChange: lireFiche, style: { display: "none" } })),
      lecture && lecture !== "en_cours" ? h("div", { className: "hs-note", style: { marginTop: 4 } }, lecture) : null,
      lus && lus.length ? h("div", { className: "hs-lus" },
        h("div", { className: "hs-pep-t" }, h("span", null, F("Lu sur la fiche")), h("span", null, lus.length + F(" cavaliers"))),
        lus.map(function (x, k) {
          return h("label", { key: k, className: "hs-lu" },
            h("input", { type: "checkbox", checked: !!x.coche, onChange: function () { var c = lus.slice(); c[k] = Object.assign({}, x, { coche: !x.coche }); setLus(c); } }),
            h("span", null, h("b", null, x.nom), h("em", null, [x.licence, x.compte ? F("compte Hype : ") + (x.compte.pseudo || x.compte.nom) : F("sans compte Hype"), x.deja ? F("déjà sur la feuille : nom et licence mis à jour") : ""].filter(Boolean).join(" · "))));
        }),
        h("div", { className: "hs-duo", style: { marginTop: 12 } },
          h("button", { type: "button", className: "hs-btn", onClick: ajouterLus }, F("Ajouter à la feuille")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setLus(null); } }, F("Annuler")))) : null);
  }
  async function lireOrdre(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    try { e.target.value = ""; } catch (eV) { }
    if (!f) return;
    setOrdreProp(null); setOrdreLect("en_cours");
    try {
      var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
      if (!estPdf && !/^image\//i.test(String(f.type || ""))) throw new Error(F("envoie une photo, une capture d’écran ou un PDF"));
      var imgs = estPdf ? (await hypePdfEnImages(f, 4, 2000)).images : [await hypeImageEnJpeg(f, 2000)];
      var equipe = []; lignes.forEach(function (l) { (l.tours || []).forEach(function (t) { if (t.cheval_nom || t.epreuve) equipe.push({ cavalier: l.nom, cheval: t.cheval_nom || "", epreuve: t.epreuve || "" }); }); });
      var lu = await hsLireProgramme(imgs, equipe);
      function norm(x) { return String(x || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
      function memeEp(a, b) { a = norm(a); b = norm(b); if (!a || !b) return false; if (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return true; var aa = a.split(" "), bb = b.split(" "); return aa.length > 1 && aa.every(function (w) { return bb.indexOf(w) >= 0; }); }
      function memeCh(a, b) { a = norm(a); b = norm(b); return !!a && !!b && (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
      var props = [], pris = [];
      lignes.forEach(function (l, i) { (l.tours || []).forEach(function (t, k) {
        var ch = String(t.cheval_nom || "").trim(), ep = String(t.epreuve || "").trim();
        if (!ch && !ep) return;
        var cands = lu.passages.filter(function (x, ix) { return x && pris.indexOf(ix) === -1 && (hsMemePers(x.cavalier, l.nom) || (ch && memeCh(x.cheval, ch))) && (!x.cheval || !ch || memeCh(x.cheval, ch)); });
        /* un couple qui fait plusieurs épreuves : on prend la ligne de SON épreuve */
        var p = cands.filter(function (x) { return ep && (memeEp(x.epreuve, ep) || lu.epreuves.some(function (y) { return y && y.numero && norm(y.numero) === norm(x.epreuve) && memeEp(y.nom, ep); })); })[0] || (cands.length === 1 ? cands[0] : null);
        if (p) pris.push(lu.passages.indexOf(p));
        var eL = lu.epreuves.filter(function (x) { return x && (memeEp(x.nom, ep) || (p && (memeEp(x.nom, p.epreuve) || (x.numero && norm(x.numero) === norm(p.epreuve))))); })[0] || null;
        var heure = "", source = "";
        if (p && p.heure) { heure = hsHeurePropre(p.heure); source = F("heure de passage lue"); }
        else if (p && p.ordre && eL && eL.heure && hsMinutes(hsHeurePropre(eL.heure)) < 99999) { heure = hsHeure(hsMinutes(hsHeurePropre(eL.heure)) + Math.round((Number(String(p.ordre).replace(/\D/g, "")) - 1) * 1.75)); source = F("estimée : début de l’épreuve + ordre de passage"); }
        else if (eL && eL.heure) { heure = hsHeurePropre(eL.heure); source = F("début de l’épreuve (ordre pas encore connu)"); }
        var piste = String((p && p.piste) || (eL && eL.piste) || "").trim();
        if (!heure && !piste) return;
        props.push({ i: i, k: k, nom: l.nom, ch: ch, ep: ep, heure: heure, piste: piste, source: source, ordre: p && p.ordre ? String(p.ordre) : "", coche: true });
      }); });
      setOrdreProp(props);
      setOrdreLect(props.length ? "" : (lu.epreuves.length ? F("J’ai lu les épreuves, mais aucune ne correspond à tes engagements.") : F("Je n’ai rien trouvé d’utilisable sur ce document.")));
    } catch (eL2) { setOrdreLect(F("Lecture impossible : ") + String((eL2 && eL2.message) || eL2)); }
  }
  function appliquerOrdre() {
    if (!ordreProp) return;
    var n = lignes.slice(), nb = 0;
    ordreProp.forEach(function (x) {
      if (!x.coche || !n[x.i] || !(n[x.i].tours || [])[x.k]) return;
      var l = Object.assign({}, n[x.i]), t = l.tours.slice(), u = Object.assign({}, t[x.k]);
      if (x.heure) u.passage = x.heure; if (x.piste) u.piste = x.piste;
      if (x.ordre && /^\d+$/.test(String(x.ordre).trim())) u.ordre_passage = parseInt(String(x.ordre).trim(), 10);   /* 09/11 : le N° de passage lu est enfin gardé */
      t[x.k] = u; l.tours = t; n[x.i] = l; nb++;
    });
    setLignes(n); setModifie(true); setOrdreProp(null);
    setOrdreLect(nb ? "✓ " + nb + (nb > 1 ? F(" heures mises") : F(" heure mise")) + F(" : elles apparaissent dans le récapitulatif et dans Jour J.") : "");
    if (nb) enregistrer(n, supprimees);
  }
  function blocOrdre() {
    var nbT = 0; lignes.forEach(function (l) { nbT += (l.tours || []).length; });
    if (!nbT) return null;
    if (true) return null;   /* 09/11 15h (Blandine « Ok ») : un seul outil de lecture de l'ordre de passage, dans la carte Passages du concours */
    return h("div", { className: "d3-ordre" },
      h("div", { className: "d3-k" }, F("Ordre de passage")),
      h("div", { className: "d3-msg", style: { marginTop: 0 } }, F("Une photo, une capture ou le PDF de la liste de départ ou du programme : les heures et les pistes de tes couples se remplissent toutes seules.")),
      h("label", { className: "hs-lien d3-petit", style: { cursor: "pointer", opacity: ordreLect === "en_cours" ? 0.6 : 1 } },
        ordreLect === "en_cours" ? F("Lecture de l’ordre de passage… (1 à 2 min)") : F("Lire l’ordre de passage (photo ou PDF) ›"),
        h("input", { type: "file", accept: "image/*,application/pdf", disabled: ordreLect === "en_cours", onChange: lireOrdre, style: { display: "none" } })),
      ordreLect && ordreLect !== "en_cours" ? h("div", { className: "d3-msg" }, ordreLect) : null,
      ordreProp && ordreProp.length ? h("div", { className: "hs-lus" },
        ordreProp.map(function (x, j) {
          return h("label", { key: j, className: "hs-lu" },
            h("input", { type: "checkbox", checked: !!x.coche, onChange: function () { var c = ordreProp.slice(); c[j] = Object.assign({}, x, { coche: !x.coche }); setOrdreProp(c); } }),
            h("span", null, h("b", null, prenomDe(x.nom) + " · " + (x.ch || "?") + (x.ep ? " · " + x.ep : "")),
              h("em", null, [x.heure, x.piste ? F("piste ") + x.piste : "", x.ordre ? F("n° ") + x.ordre : "", x.source].filter(Boolean).join(" · "))));
        }),
        h("div", { className: "hs-duo", style: { marginTop: 12 } },
          h("button", { type: "button", className: "hs-btn", onClick: appliquerOrdre }, F("Mettre ces heures")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setOrdreProp(null); setOrdreLect(""); } }, F("Annuler")))) : null);
  }
  /* engagements enregistrés sans aucun tour (anciens écrans, fiche lue) : visibles, avec × pour les retirer */
  function sansTour() {
    var l0 = lignes.map(function (l, i) { return { l: l, i: i }; }).filter(function (x) { return !(x.l.tours || []).some(function (t) { return t.epreuve || t.cheval_nom; }); });
    if (!l0.length) return null;
    return h("div", { className: "d3-sans" },
      h("div", { className: "d3-k" }, F("Sans épreuve pour l’instant")),
      l0.map(function (x) {
        return h("div", { key: "s" + x.i, className: "d3-sl" },
          h("button", { type: "button", className: "d3-sl-n", onClick: function () { var c = x.l.cavalier_id ? candidates.filter(function (y) { return y.id === x.l.cavalier_id; })[0] : null; choisirCav(c || { id: x.l.cavalier_id || null, nom: x.l.nom, licence: x.l.licence || "" }); try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (eS) { } } }, String(x.l.nom || "").trim() || "?", h("span", null, F(" · engager ›"))),
          h("button", { type: "button", className: "rc-x", "aria-label": F("Retirer"), onClick: function () { retirerSansTour(x.i); } }, "×"));
      }));
  }
  function switchVue() {
    var o = [["couples", F("Cavaliers")], ["chevaux", F("Chevaux")], ["epreuves", F("Épreuves")]];
    return h("div", { className: "e1-sw", role: "tablist" }, o.map(function (x) {
      return h("button", { key: x[0], type: "button", role: "tab", "aria-selected": vue === x[0], className: vue === x[0] ? "on" : "", onClick: function () { setVue(x[0]); } }, x[1]);
    }));
  }
  function vueCavalieres() {
    return h(React.Fragment, null,
      h("div", { className: "e1-compte" }, lignes.length ? lignes.length + (lignes.length > 1 ? F(" cavaliers · ") : F(" cavalier · ")) + nbTours + (nbTours > 1 ? F(" tours") : F(" tour")) : F("Aucun cavalier pour l’instant.")),
      lignes.map(function (l, i) {
        var p = cavDe(l), ouvert = !!editCav[i] || !String(l.nom || "").trim();
        return h("div", { key: l.id || ("n" + i), className: "e1-carte e1-cav" },
          p && hsPhotoProfil(p) ? h("img", { className: "e1-av", src: hsPhotoProfil(p), alt: "" }) : h("div", { className: "e1-av" }, initiales(l.nom)),
          h("div", { className: "e1-cav-c" },
            h("div", { className: "e1-cav-t" },
              h("b", null, String(l.nom || "").trim() || F("Nouveau cavalier")),
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
      proposees.length ? h("div", { className: "hs-champ", style: { marginTop: 14 } }, h("label", null, F("Cavaliers de compétition") + " · " + proposees.filter(function (c) { return dejaLa[c.id]; }).length + "/" + proposees.length),
        h("div", { className: "hs-puces" }, proposees.map(puceCav))) : null,
      chevauxConc.length ? h("div", { className: "hs-champ", style: { marginTop: 6 } }, h("label", null, F("Chevaux du concours") + " · " + chevauxConc.filter(function (c) { return montes[c.nom]; }).length + "/" + chevauxConc.length),
        h("div", { className: "hs-puces" }, chevauxConc.map(function (c) { var m = montes[c.nom]; return h("span", { key: c.id, className: "hs-puce hs-puce-cav" + (m ? " fait" : "") }, (m ? "✓ " : "") + c.nom); }))) : null,
      h("div", { className: "hs-champ", style: { marginTop: 6 } }, h("label", null, F("Chercher un autre cavalier")),
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
        h("div", { className: "hs-pep-t" }, h("span", null, F("Lu sur la fiche")), h("span", null, lus.length + F(" cavaliers"))),
        lus.map(function (x, k) {
          return h("label", { key: k, className: "hs-lu" },
            h("input", { type: "checkbox", checked: !!x.coche, onChange: function () { var c = lus.slice(); c[k] = Object.assign({}, x, { coche: !x.coche }); setLus(c); } }),
            h("span", null, h("b", null, x.nom), h("em", null, [x.licence, x.compte ? F("compte Hype : ") + (x.compte.pseudo || x.compte.nom) : F("sans compte Hype"), x.deja ? F("déjà sur la feuille : nom et licence mis à jour") : ""].filter(Boolean).join(" · "))));
        }),
        h("div", { className: "hs-duo", style: { marginTop: 12 } },
          h("button", { type: "button", className: "hs-btn", onClick: ajouterLus }, F("Ajouter à la feuille")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setLus(null); } }, F("Annuler")))) : null);
  }
  /* 07/11 19h30 (Blandine : « ça me propose pas d’ajouter les chevaux du déplacement », choix B) : on choisit les chevaux qui partent
     DIRECTEMENT ici. Même table que « Chevaux du déplacement » du rendez-vous (agenda_chevaux, mêmes droits : gestion du club).
     Tous les chevaux connus pour ce concours sont proposés d’un coup (Team s’il y en a une, puis ceux de l’écurie) : rien à
     aller chercher ailleurs, même pour un club sans équipe comme Feinn. */
  var T7 = (typeof hypeT7 === "function") ? hypeT7 : function (fr) { return fr; };
  function ouvrirChoixCh() {
    var s0 = {}; chevaux.forEach(function (c) { if (c.src === "concours") s0[c.id] = true; });
    setChoixCh({ sel: s0, busy: false, err: "" });
  }
  async function enregistrerChoixCh() {
    if (!choixCh || choixCh.busy || !ev || !ev.id) return;
    var sel = choixCh.sel;
    setChoixCh(Object.assign({}, choixCh, { busy: true, err: "" }));
    try {
      var avant = {}; chevaux.forEach(function (c) { if (c.src === "concours") avant[c.id] = true; });
      var ajouts = Object.keys(sel).filter(function (i) { return sel[i] && !avant[i]; });
      var retraits = Object.keys(avant).filter(function (i) { return !sel[i]; });
      if (ajouts.length) { var ra = await supa.from("agenda_chevaux").insert(ajouts.map(function (i) { return { agenda_id: ev.id, cheval_id: i }; })); if (ra && ra.error) throw new Error(ra.error.message || String(ra.error)); }
      if (retraits.length) { var rr = await supa.from("agenda_chevaux").delete().eq("agenda_id", ev.id).in("cheval_id", retraits); if (rr && rr.error) throw new Error(rr.error.message || String(rr.error)); }
      var rgS = { concours: 0, team: 1, club: 2 };
      setChevaux(chevaux.map(function (c) {
        if (sel[c.id]) return Object.assign({}, c, { src: "concours" });
        if (c.src === "concours") return Object.assign({}, c, { src: "club" });
        return c;
      }).sort(function (a, b) { return (rgS[a.src] - rgS[b.src]) || String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); }));
      setChoixCh(null);
    } catch (eC) {
      setChoixCh(Object.assign({}, choixCh, { sel: sel, busy: false, err: T7("Les chevaux n’ont pas pu être enregistrés : ", "Horses could not be saved: ", "No se pudieron guardar los caballos: ", "Impossibile salvare i cavalli: ", "馬を保存できませんでした：", "Pferde konnten nicht gespeichert werden: ", "تعذّر حفظ الخيول: ", "无法保存马匹：", "De paarden konden niet worden opgeslagen: ", "Não foi possível salvar os cavalos: ", "Hästarna kunde inte sparas: ", "Не удалось сохранить лошадей: ", "Nie udało się zapisać koni: ", "말을 저장하지 못했어요: ") + String((eC && eC.message) || eC).slice(0, 160) }));
    }
  }
  function boutonChoixCh() {
    return h("button", { type: "button", className: "hs-btn", "data-choisir-chevaux-eng": "1", style: { marginTop: 12 }, onClick: ouvrirChoixCh },
      nomsCh.length ? T7("Modifier les chevaux", "Change the horses", "Cambiar los caballos", "Modifica i cavalli", "馬を変更", "Pferde ändern", "تعديل الخيول", "修改马匹", "Paarden wijzigen", "Alterar os cavalos", "Ändra hästar", "Изменить лошадей", "Zmień konie", "말 변경")
        : T7("Choisir les chevaux", "Choose the horses", "Elegir los caballos", "Scegli i cavalli", "馬を選ぶ", "Pferde auswählen", "اختر الخيول", "选择马匹", "Paarden kiezen", "Escolher os cavalos", "Välj hästar", "Выбрать лошадей", "Wybierz konie", "말 선택"));
  }
  function fenetreChoixCh() {
    if (!choixCh) return null;
    var sel = choixCh.sel;
    return h("div", { "data-noswipe": "1", role: "dialog", "aria-modal": "true", onClick: function (e) { if (e.target === e.currentTarget && !choixCh.busy) setChoixCh(null); },
      style: { position: "fixed", inset: 0, zIndex: 10000, background: "rgba(3,5,6,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { style: { width: "100%", maxWidth: 560, maxHeight: "86vh", display: "flex", flexDirection: "column", background: "#0B1113", borderTop: "1px solid rgba(201,166,107,0.35)", borderRadius: "22px 22px 0 0", padding: "18px 16px calc(env(safe-area-inset-bottom) + 16px)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 24, color: "var(--hs-iv)", textAlign: "center" } },
          T7("Qui part ?", "Who’s going?", "¿Quién va?", "Chi parte?", "誰が行く？", "Wer fährt mit?", "من سيذهب؟", "谁去？", "Wie gaat er mee?", "Quem vai?", "Vem åker?", "Кто едет?", "Kto jedzie?", "누가 가나요?")),
        h("div", { style: { fontSize: 12.5, color: "var(--hs-iv2)", textAlign: "center", margin: "4px 0 14px" } },
          T7("Coche les chevaux qui partent au concours.", "Tick the horses going to the show.", "Marca los caballos que van al concurso.", "Spunta i cavalli che vanno al concorso.", "大会に行く馬にチェックを入れてね。", "Hake die Pferde an, die zum Turnier fahren.", "حدّد الخيول التي تذهب إلى المسابقة.", "勾选去比赛的马匹。", "Vink de paarden aan die naar de wedstrijd gaan.", "Marque os cavalos que vão ao concurso.", "Bocka i hästarna som åker till tävlingen.", "Отметь лошадей, которые едут на соревнования.", "Zaznacz konie, które jadą na zawody.", "대회에 가는 말을 체크해 줘.")),
        h("div", { style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" } },
          chevaux.length ? chevaux.map(function (c) {
            var on = !!sel[c.id];
            return h("button", { key: "cc" + c.id, type: "button", onClick: function () { var n = Object.assign({}, sel); if (n[c.id]) delete n[c.id]; else n[c.id] = true; setChoixCh(Object.assign({}, choixCh, { sel: n })); },
              style: { display: "flex", alignItems: "center", gap: 12, width: "100%", minHeight: 52, padding: "6px 12px", marginBottom: 6, borderRadius: 14, cursor: "pointer", textAlign: "start", border: "1px solid " + (on ? "rgba(201,166,107,0.6)" : "rgba(243,238,228,0.1)"), background: "transparent", color: "var(--hs-iv)" } },
              h("span", { style: { flex: "0 0 38px", width: 38, height: 38, borderRadius: 10, overflow: "hidden", background: "#0F1B19" } }, h("img", { src: photoCh(c.nom), alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover" } })),
              h("span", { style: { flex: 1, minWidth: 0, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, c.nom || "?"),
              h("span", { "aria-hidden": "true", style: { flex: "0 0 22px", width: 22, height: 22, borderRadius: 7, border: "1px solid " + (on ? "#C9A66B" : "rgba(243,238,228,0.35)"), color: "#C9A66B", fontSize: 14, lineHeight: "21px", textAlign: "center" } }, on ? "✓" : ""));
          }) : h("div", { className: "hs-vide" }, T7("Aucun cheval trouvé dans l’écurie.", "No horse found in the stable.", "No se encontró ningún caballo en la cuadra.", "Nessun cavallo trovato nella scuderia.", "厩舎に馬が見つかりません。", "Kein Pferd im Stall gefunden.", "لم يُعثر على أي حصان في الإسطبل.", "马厩里没有找到马。", "Geen paard gevonden in de stal.", "Nenhum cavalo encontrado na hípica.", "Ingen häst hittades i stallet.", "В конюшне не найдено лошадей.", "Nie znaleziono koni w stajni.", "마구간에서 말을 찾지 못했어요."))),
        choixCh.err ? h("div", { className: "hs-err", style: { marginTop: 8 } }, choixCh.err) : null,
        h("div", { className: "hs-duo", style: { marginTop: 12 } },
          h("button", { type: "button", className: "hs-btn", disabled: choixCh.busy, onClick: function () { setChoixCh(null); } },
            T7("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", className: "hs-btn", disabled: choixCh.busy, onClick: enregistrerChoixCh },
            choixCh.busy ? "…" : T7("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))));
  }
  function vueChevauxV1() {
    if (!nomsCh.length) return h(React.Fragment, null,
      h("div", { className: "hs-vide" }, T7("Aucun cheval pour l’instant. Choisis ceux qui partent au concours.", "No horse yet. Choose the ones going to the show.", "Aún no hay caballos. Elige los que van al concurso.", "Ancora nessun cavallo. Scegli quelli che vanno al concorso.", "まだ馬がいません。大会に行く馬を選んでね。", "Noch kein Pferd. Wähle die, die zum Turnier fahren.", "لا خيول بعد. اختر التي تذهب إلى المسابقة.", "还没有马。选择去比赛的马匹。", "Nog geen paard. Kies de paarden die naar de wedstrijd gaan.", "Ainda nenhum cavalo. Escolha os que vão ao concurso.", "Inga hästar än. Välj de som åker till tävlingen.", "Пока нет лошадей. Выбери тех, кто едет на соревнования.", "Jeszcze brak koni. Wybierz te, które jadą na zawody.", "아직 말이 없어요. 대회에 가는 말을 골라 줘.")),
      boutonChoixCh());
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
      })),
      boutonChoixCh());
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
      composeur(),
      recapFin(),
      blocOrdre(),
      sansTour(),
      h("div", { className: "hs-note" }, F("Les licences sont gardées pour la prochaine fois. Seuls toi et le cavalier concerné les voient. Chacun voit son engagement sur la fiche du concours.")),
      /* actions */
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("div", { className: "hs-duo", style: { marginTop: 0 } },
          h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !modifie, onClick: function () { enregistrer(); } }, occupe ? F("Enregistrement…") : (modifie ? F("Enregistrer") : F("✓ Enregistré"))),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setVoirFeuille(true); } }, estSep ? F("Feuille SEP") : T7("Feuille d’engagement", "Entry sheet", "Hoja de inscripción", "Foglio di iscrizione", "エントリーシート", "Nennungsliste", "ورقة التسجيل", "报名表", "Inschrijvingsformulier", "Ficha de inscrição", "Anmälningsblad", "Лист заявок", "Lista zgłoszeń", "참가 신청서")))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null),
    fenetreChoixCh(),
    voirFeuille ? (estSep ? feuilleSep(h, ev, feuille, hsLignesFeuille(lignes), function () { setVoirFeuille(false); }, modifie)
      : feuilleNeutre(h, ev, feuille, hsLignesFeuille(lignes), function () { setVoirFeuille(false); }, modifie, nomClubAff)) : null);
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

/* ── 07/11/2026 19h30 — FEUILLE D’ENGAGEMENT NEUTRE (tous les clubs sauf la SEP). Blandine : « propose juste d’éditer une
   feuille d’engagement sans conserver le mot SEP ni leur mise en page ou logo », puis « une mise en page classique qui
   pourrait convenir à tous » (maquette validée : nom du club en titre, infos, une ligne par tour, total, signature,
   mention « Feuille générée avec Hype » gardée). Feuille imprimée en français, comme la feuille SEP (document pour un
   organisateur français). Mêmes données que la feuille SEP : rien de plus n’est enregistré. ── */
function hsLignesNeutre(lignes) {
  var tri = (lignes || []).slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
  var out = [];
  tri.forEach(function (l) {
    var t = 0;
    [1, 2].forEach(function (n) {
      var c = String(l["cheval" + n + "_nom"] || "").trim(), e = String(l["epreuve" + n] || "").trim();
      if (c || e) { t++; out.push({ nom: String(l.nom || "").trim(), licence: String(l.licence || "").trim(), cheval: c, ep: e }); }
    });
    if (!t && String(l.nom || "").trim()) out.push({ nom: String(l.nom || "").trim(), licence: String(l.licence || "").trim(), cheval: "", ep: "" });
  });
  return out;
}
function hsPrixNeutre(prix, nb) {
  var brut = String(prix || "").trim(); if (!brut) return { un: "", total: "" };
  var v = parseFloat(brut.replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, ""));
  if (!(v >= 0)) return { un: brut, total: "" };
  function eu(x) { return (Math.round(x * 100) / 100).toLocaleString("fr-FR", { minimumFractionDigits: (x % 1) ? 2 : 0, maximumFractionDigits: 2 }) + " €"; }
  return { un: eu(v), total: nb ? eu(v * nb) : "" };
}
function hsDateNeutre(ev) {
  var d = hsDateLoc(ev && ev.date_jour), df = hsDateLoc(ev && ev.date_fin);
  function jl(x) { try { return x.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } }
  if (!d) return "";
  var t = jl(d); t = t.charAt(0).toUpperCase() + t.slice(1);
  if (df && df.getTime() !== d.getTime()) t = "Du " + jl(d) + " au " + jl(df);
  return t;
}
function hsNomClubNeutre(nom) {
  var n = String(nom || "").trim(); if (!n) return "";
  if (n === n.toLowerCase()) n = n.replace(/(^|[\s'’(-])([a-zà-ÿ])/g, function (m, a, b) { return a + b.toUpperCase(); });   /* clé « ecurie feinn » → « Ecurie Feinn » */
  return n;
}
function feuilleNeutre(h, ev, fe, lignes, fermer, nonEnregistre, nomClub) {
  fe = fe || {};
  var club = hsNomClubNeutre(nomClub) || "";
  var disc = String(fe.discipline || "").trim() || "CSO";
  var titre = "Feuille d’engagement · " + disc;
  var date = hsDateNeutre(ev);
  var rangs = hsLignesNeutre(lignes);
  var nbTours = rangs.filter(function (r) { return r.cheval || r.ep; }).length;
  var px = hsPrixNeutre(fe.prix, nbTours);
  var transport = String(fe.transport || "").trim();
  var chef = (fe.chef_nom || "") + (fe.chef_licence ? " · licence " + fe.chef_licence : "");
  var concours = String((ev && ev.titre) || "").trim();
  var info = [["Concours", concours], ["N° de concours FFE", fe.numero], ["Date", date], ["Lieu", ev && ev.lieu], ["Chef d’équipe", chef], ["Transport en camion", transport]];
  function partagerPdf() {
    try {
      var octets = hsPdfFeuilleNeutre({ club: club, titre: titre, date: date, info: info, rangs: rangs, prix: px, nbTours: nbTours, recap: hsRecapFeuille(lignes), lieu: (ev && ev.lieu) || "" });
      var nom = "feuille-engagement-" + String((ev && ev.titre) || "concours").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "") + ".pdf";
      var fic = null; try { fic = new File([octets], nom, { type: "application/pdf" }); } catch (eF) { fic = null; }
      if (fic && navigator.canShare && navigator.canShare({ files: [fic] }) && navigator.share) { navigator.share({ files: [fic], title: titre }).catch(function () { }); return; }
      var url = URL.createObjectURL(new Blob([octets], { type: "application/pdf" }));
      var lien = document.createElement("a"); lien.href = url; lien.download = nom; document.body.appendChild(lien); lien.click(); lien.remove();
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (eR) { } }, 60000);
    } catch (eP) { try { window.__hsPdfErreur = String(eP); console.error(eP); } catch (e2) { } }
  }
  var vides = Math.max(0, 6 - rangs.length);
  var thS = { borderBottom: "1.5px solid #111", padding: "6px 5px", fontSize: 12, fontWeight: 700, textAlign: "left" };
  var tdS = { borderBottom: "1px solid #ccc", padding: "8px 5px", fontSize: 12.5, height: 30, verticalAlign: "middle" };
  return h("div", { id: "zone-impression", className: "hs-feuille hs-feuille-neutre", role: "dialog", "aria-label": titre },
    h("div", { className: "bar no-print" },
      h("button", { type: "button", className: "p", onClick: function () { partagerPdf(); } }, "Enregistrer en PDF"),
      h("button", { type: "button", className: "f", onClick: function () { try { window.print(); } catch (e) { } } }, "Imprimer"),
      h("button", { type: "button", className: "f", onClick: fermer }, "Fermer")),
    nonEnregistre ? h("div", { className: "no-print", style: { maxWidth: 780, margin: "10px auto 0", padding: "0 16px", fontSize: 12.5, color: "#8a5a00" } }, "Attention : tes dernières modifications ne sont pas encore enregistrées.") : null,
    h("div", { className: "page" },
      h("div", { style: { textAlign: "center", borderBottom: "1.5px solid #111", paddingBottom: 12, marginBottom: 16 } },
        club ? h("div", { style: { fontFamily: "Helvetica,Arial,sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: ".01em" } }, club) : null,
        h("div", { style: { fontFamily: "Helvetica,Arial,sans-serif", fontSize: 14, color: "#444", marginTop: 4 } }, titre)),
      h("table", { style: { width: "100%", marginBottom: 18, fontSize: 13 } },
        h("tbody", null, info.map(function (x) {
          return h("tr", { key: x[0] }, h("td", { style: { padding: "3px 10px 3px 0", color: "#555", width: "38%", verticalAlign: "top" } }, x[0]),
            h("td", { style: { padding: "3px 0", fontWeight: 700, borderBottom: x[1] ? "none" : "1px dotted #999" } }, x[1] || ""));
        }))),
      h("table", { style: { width: "100%", tableLayout: "fixed", borderCollapse: "collapse" } },
        h("thead", null, h("tr", null,
          h("th", { style: Object.assign({ width: "28%" }, thS) }, "Cavalier"), h("th", { style: Object.assign({ width: "16%" }, thS) }, "Licence"),
          h("th", { style: Object.assign({ width: "22%" }, thS) }, "Cheval"), h("th", { style: Object.assign({ width: "21%" }, thS) }, "Épreuve"),
          h("th", { style: Object.assign({ width: "13%", textAlign: "right" }, thS) }, "Tarif"))),
        h("tbody", null,
          rangs.map(function (r, i) {
            return h("tr", { key: i }, h("td", { style: tdS }, r.nom), h("td", { style: tdS }, r.licence), h("td", { style: tdS }, r.cheval), h("td", { style: tdS }, r.ep),
              h("td", { style: Object.assign({ textAlign: "right" }, tdS) }, (r.cheval || r.ep) ? px.un : ""));
          }),
          Array.apply(null, Array(vides)).map(function (x, i) { return h("tr", { key: "v" + i }, [0, 1, 2, 3, 4].map(function (k) { return h("td", { key: k, style: tdS }); })); }),
          h("tr", null, h("td", { colSpan: 4, style: { padding: "9px 5px", textAlign: "right", fontWeight: 700, fontSize: 13 } }, "Total" + (nbTours ? " (" + nbTours + (nbTours > 1 ? " tours)" : " tour)") : "")),
            h("td", { style: { padding: "9px 5px", textAlign: "right", fontWeight: 700, fontSize: 13 } }, px.total)))),
      h("div", { style: { display: "flex", justifyContent: "space-between", gap: 16, marginTop: 34, fontSize: 12.5 } },
        h("span", null, "Fait le ", h("span", { style: { display: "inline-block", minWidth: 110, borderBottom: "1px dotted #888", fontWeight: 700 } }, fe.faits_le || "")),
        h("span", null, "Signature du chef d’équipe")),
      h("div", { style: { textAlign: "center", marginTop: 46, fontSize: 10.5, color: "#999" } }, "Feuille générée avec Hype")),
    (function () {
      var R = hsRecapFeuille(lignes); if (!R.chevaux.length) return null;
      var cols = []; for (var j = 0; j < R.nbCol; j++) cols.push(j);
      return h("div", { className: "page", style: { marginTop: 18 } },
        h("div", { style: { textAlign: "center", fontFamily: "Helvetica,Arial,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 4 } }, "Récapitulatif des engagements"),
        h("div", { style: { textAlign: "center", fontSize: 12.5, marginBottom: 14, color: "#444" } }, [club, date, ev && ev.lieu].filter(Boolean).join(" · ") + " — " + R.total + (R.total > 1 ? " tours" : " tour")),
        h("table", { className: "grille" },
          h("thead", null, h("tr", null, h("th", { style: { width: "24%" } }, "Cheval"), h("th", { className: "c", style: { width: "8%" } }, "Tours"),
            cols.map(function (j) { return h("th", { key: j }, (j + 1) + (j === 0 ? "er" : "e") + " tour"); }))),
          h("tbody", null, R.chevaux.map(function (c) {
            var m = R.parCh[c];
            return h("tr", { key: c }, h("td", null, c), h("td", { className: "c" }, String(m.length)),
              cols.map(function (j) { var x = m[j]; return h("td", { key: j }, x ? (x.qui + (x.ep ? " · " + x.ep : "")) : ""); }));
          }))));
    })());
}
/* PDF de la feuille neutre : A4, Helvetica, plusieurs pages si la liste est longue, puis le récapitulatif par cheval. */
function hsPdfFeuilleNeutre(o) {
  var W = 595.28, H = 841.89, pages = [], ops = [];
  function Y(y) { return (H - y).toFixed(2); }
  function txt(x, y, t, pol, tl, coul) { if (!t) return; ops.push((coul || "0 0 0") + " rg BT /" + pol + " " + tl + " Tf " + x.toFixed(2) + " " + Y(y) + " Td (" + hsPdfTexte(t) + ") Tj ET"); }
  function txtG(x1, x2, y, t, pol, tl) { if (!t) return; txt(x1 + 4, y, hsCouper(t, pol, tl, x2 - x1 - 8), pol, tl); }
  function txtD(x1, x2, y, t, pol, tl) { if (!t) return; var tt = hsCouper(t, pol, tl, x2 - x1 - 8); txt(x2 - 4 - hsLargeur(tt, pol, tl), y, tt, pol, tl); }
  function txtC(y, t, pol, tl, coul) { if (!t) return; var tt = hsCouper(t, pol, tl, W - 80); txt((W - hsLargeur(tt, pol, tl)) / 2, y, tt, pol, tl, coul); }
  function trait(x1, y1, x2, y2, ep, gris) { ops.push((ep || 0.8) + " w " + (gris ? "0.78 0.78 0.78" : "0 0 0") + " RG " + x1.toFixed(2) + " " + Y(y1) + " m " + x2.toFixed(2) + " " + Y(y2) + " l S"); }
  function pointilles(x1, x2, y) { ops.push("[0.6 1.6] 0 d 0.5 w 0.45 0.45 0.45 RG " + x1.toFixed(2) + " " + Y(y) + " m " + x2.toFixed(2) + " " + Y(y) + " l S [] 0 d"); }
  function finPage() { pages.push(ops.map(hsPdfTexteBrut).join("\n")); ops = []; }
  var x0 = 40, wT = 515, props = [28, 16, 22, 21, 13], xs = [x0];
  props.forEach(function (p) { xs.push(xs[xs.length - 1] + wT * p / 100); });
  function tete(suite) {
    var y = 58;
    if (o.club) { txtC(y, o.club, "F2", 20); y += 20; }
    txtC(y, o.titre + (suite ? " (suite)" : ""), "F1", 12, "0.27 0.27 0.27");
    y += 12; trait(x0, y, x0 + wT, y, 1.2);
    return y + 22;
  }
  function enteteGrille(y) {
    ["Cavalier", "Licence", "Cheval", "Épreuve"].forEach(function (t, i) { txtG(xs[i], xs[i + 1], y, t, "F2", 10); });
    txtD(xs[4], xs[5], y, "Tarif", "F2", 10);
    trait(x0, y + 6, x0 + wT, y + 6, 1.1);
    return y + 6;
  }
  var y = tete(false);
  (o.info || []).forEach(function (x) {
    txt(x0, y, x[0], "F1", 10.5, "0.33 0.33 0.33");
    if (x[1]) txt(x0 + 160, y, hsCouper(x[1], "F2", 10.5, wT - 170), "F2", 10.5); else pointilles(x0 + 160, x0 + 330, y + 2);
    y += 17;
  });
  y += 14;
  var hL = 22, rangs = (o.rangs || []).slice();
  var nbVides = Math.max(0, 6 - rangs.length); for (var v = 0; v < nbVides; v++) rangs.push(null);
  var yl = enteteGrille(y);
  rangs.forEach(function (r) {
    if (yl + hL > H - 150) { finPage(); yl = enteteGrille(tete(true)); }
    var yy = yl + hL / 2 + 4;
    if (r) {
      txtG(xs[0], xs[1], yy, r.nom, "F2", 10); txtG(xs[1], xs[2], yy, r.licence, "F1", 10); txtG(xs[2], xs[3], yy, r.cheval, "F1", 10);
      txtG(xs[3], xs[4], yy, r.ep, "F1", 10); if (r.cheval || r.ep) txtD(xs[4], xs[5], yy, o.prix && o.prix.un, "F1", 10);
    }
    yl += hL; trait(x0, yl, x0 + wT, yl, 0.6, true);
  });
  var lt = "Total" + (o.nbTours ? " (" + o.nbTours + (o.nbTours > 1 ? " tours)" : " tour)") : "");
  txtD(xs[0], xs[4], yl + 16, lt, "F2", 10.5); txtD(xs[4], xs[5], yl + 16, o.prix && o.prix.total, "F2", 10.5);
  var yS = yl + 60;
  txt(x0, yS, "Fait le", "F1", 10.5); pointilles(x0 + 40, x0 + 170, yS + 2);
  var sig = "Signature du chef d’équipe"; txt(x0 + wT - hsLargeur(sig, "F1", 10.5), yS, sig, "F1", 10.5);
  txtC(H - 40, "Feuille générée avec Hype", "F1", 8.5, "0.6 0.6 0.6");
  finPage();
  /* récapitulatif par cheval */
  var R = o.recap;
  if (R && R.chevaux && R.chevaux.length) {
    txtC(62, "Récapitulatif des engagements", "F2", 16);
    txtC(82, [o.club, o.date, o.lieu].filter(Boolean).join(" · ") + " — " + R.total + (R.total > 1 ? " tours" : " tour"), "F1", 10, "0.27 0.27 0.27");
    var pxr = [x0, x0 + wT * 0.24, x0 + wT * 0.32], reste = wT * 0.68 / R.nbCol;
    for (var j = 1; j <= R.nbCol; j++) pxr.push(pxr[2] + reste * j);
    var y2 = 112;
    txtG(pxr[0], pxr[1], y2, "Cheval", "F2", 9.5); txtG(pxr[1], pxr[2], y2, "Tours", "F2", 9.5);
    for (var j2 = 0; j2 < R.nbCol; j2++) txtG(pxr[2 + j2], pxr[3 + j2], y2, (j2 + 1) + (j2 === 0 ? "er" : "e") + " tour", "F2", 9.5);
    trait(x0, y2 + 6, x0 + wT, y2 + 6, 1.1); y2 += 6;
    R.chevaux.forEach(function (c) {
      if (y2 + 20 > H - 60) return;
      var yy = y2 + 14, m = R.parCh[c];
      txtG(pxr[0], pxr[1], yy, c, "F2", 9); txtG(pxr[1], pxr[2], yy, String(m.length), "F1", 9);
      for (var j3 = 0; j3 < R.nbCol; j3++) { var x = m[j3]; if (x) txtG(pxr[2 + j3], pxr[3 + j3], yy, x.qui + (x.ep ? " · " + x.ep : ""), "F1", 9); }
      y2 += 20; trait(x0, y2, x0 + wT, y2, 0.6, true);
    });
    txtC(H - 40, "Feuille générée avec Hype", "F1", 8.5, "0.6 0.6 0.6");
    finPage();
  }
  /* assemblage : 1 catalogue, 1 arbre de pages, 2 polices, puis (page, contenu) par page */
  var res = "<< /Font << /F1 3 0 R /F2 4 0 R >> >>";
  var objs = ["<< /Type /Catalog /Pages 2 0 R >>", null,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"];
  var kids = [];
  pages.forEach(function (flux) {
    var np = objs.length + 1; kids.push(np + " 0 R");
    objs.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources " + res + " /Contents " + (np + 1) + " 0 R >>");
    objs.push("<< /Length " + flux.length + " >>\nstream\n" + flux + "\nendstream");
  });
  objs[1] = "<< /Type /Pages /Kids [" + kids.join(" ") + "] /Count " + pages.length + " >>";
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
      h("div", { className: "hs-note" }, F("Touche une heure pour revoir ce moment. Commentaires visibles par le cavalier, sa coach et leur auteur."))));
}

function hsOrdreBase(L) {
  var o = {}; (L || []).forEach(function (l, i) { [1, 2, 3, 4, 5].forEach(function (n) { o[i + "-" + n] = hsMinutes(l["passage" + n]); }); }); return o;
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
function EcranJourJ(props) {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var integre = !!(props && props.integre);   /* 09/11 15h (Blandine : « Jour J et Passages doivent être une seule page ») : dans la carte Passages, sans héros */
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

  React.useEffect(function () { injecterCss2(); if (!integre) { try { window.scrollTo(0, 0); } catch (e) { } } }, []);
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
        /* 08/11 00h15 (Blandine « Ok ») : Jour J passe sur les 5 tours de concours_tours (une ligne par tour) */
        var LJ = rl.data || [];
        try {
          var rT = await supa.from("concours_tours").select("*").eq("agenda_id", idEv).order("numero", { ascending: true });
          if (rT && rT.error) throw rT.error;
          var parE = {}; ((rT && rT.data) || []).forEach(function (t) { (parE[t.engagement_id] = parE[t.engagement_id] || []).push(t); });
          LJ.forEach(function (l) { hsToursDepuis(l, parE[l.id]).forEach(function (t, k) { var n = k + 1; l["epreuve" + n] = t.epreuve; l["cheval" + n + "_nom"] = t.cheval_nom; l["passage" + n] = t.passage; l["piste" + n] = t.piste; l["ordre" + n] = t.ordre_passage; }); });
        } catch (eTo) { }
        if (vif) { setLignes(LJ); setBase(hsOrdreBase(LJ)); }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setLignes(function (l) { return l || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function poser(i, k, v) { var n = lignes.slice(); n[i] = Object.assign({}, n[i]); n[i][k] = v; setLignes(n); var m = Object.assign({}, modif); m[n[i].id] = true; setModif(m); setMsg(""); }
  /* toutes les passes de la journée, dans l'ordre de l'heure */
  var passes = [];
  (lignes || []).forEach(function (l, i) {
    [1, 2, 3, 4, 5].forEach(function (n) { if (l["epreuve" + n] || l["cheval" + n + "_nom"]) passes.push({ i: i, n: n, nom: l.nom, ep: l["epreuve" + n], ch: l["cheval" + n + "_nom"], hp: l["passage" + n], pi: l["piste" + n] }); });
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
      [1, 2, 3, 4, 5].forEach(function (k) {
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
        /* les 5 tours dans concours_tours (les tours qui n'y sont pas encore n'existent que dans les colonnes 1 et 2) */
        for (var nT = 1; nT <= 5; nT++) {
          if (!(l["epreuve" + nT] || l["cheval" + nT + "_nom"])) continue;
          var majT = { passage: hsHeurePropre(l["passage" + nT]) || null, piste: String(l["piste" + nT] || "").trim() || null, passage_maj_le: maint };
          if (l["ordre" + nT] !== undefined) majT.ordre_passage = l["ordre" + nT] || null;
          var rT2 = await supa.from("concours_tours").update(majT).eq("engagement_id", l.id).eq("numero", nT).select("id");
          if (rT2 && rT2.error) throw new Error(l.nom + " : " + (rT2.error.message || rT2.error));
        }
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
      var faitMsg = F("✓ Enregistré. Les cavaliers voient leur nouvelle heure sur la fiche du concours.");
      if (prevenir && ids.length) {
        try {
          var rn = await supa.functions.invoke("notifier-passage", { body: { agenda_id: idEv, engagements: ids } });
          var dn = rn && rn.data;
          if (rn && rn.error) faitMsg += " " + F("Notification impossible : ") + (rn.error.message || rn.error);
          else if (dn && dn.ok) faitMsg += " " + (dn.envois ? F("Notification envoyée") + " (" + dn.envois + ")." : "") + (dn.sans_alertes ? " " + dn.sans_alertes + F(" cavalier(s) sans alertes activées.") : "");
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
      var equipe = []; lignes.forEach(function (l) { [1, 2, 3, 4, 5].forEach(function (n) { if (l["cheval" + n + "_nom"] || l["epreuve" + n]) equipe.push({ cavalier: l.nom, cheval: l["cheval" + n + "_nom"] || "", epreuve: l["epreuve" + n] || "" }); }); });
      var lu = await hsLireProgramme(imgs, equipe);
      function norm(x) { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
      function memeEp(a, b) { a = norm(a); b = norm(b); if (!a || !b) return false; if (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return true; var aa = a.split(" "), bb = b.split(" "); return aa.length > 1 && aa.every(function (w) { return bb.indexOf(w) >= 0; }); }
      function memeCh(a, b) { a = norm(a); b = norm(b); return !!a && !!b && (a === b || a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
      var props = [];
      lignes.forEach(function (l, i) { [1, 2, 3, 4, 5].forEach(function (n) {
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
      if (x.ordre && /\d/.test(x.ordre)) l["ordre" + x.n] = Number(String(x.ordre).replace(/\D/g, "")) || null;   /* 09/11 15h : le N° de passage aussi */
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
      var k = 0; [1, 2, 3, 4, 5].forEach(function (nk) { if (!k && proche(l["epreuve" + nk], d.epreuve)) k = nk; });   /* 08/11 : le tour de cette épreuve, parmi les 5 */
      if (!k) k = !l.passage1 ? 1 : 2;
      l["passage" + k] = d.heure_estimee; n[i] = l; m[l.id] = true; nb++;
    });
    setLignes(n); setModif(m);
    setMsg(nb ? (nb + F(" heure(s) estimée(s) reprise(s). Vérifie, puis enregistre.")) : F("Aucune heure à reprendre."));
  }
  var estWinjump = /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String((ev && ev.lien_direct) || ""));

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Jour J"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "" });
  if (gestion === false) return h("div", { className: "hs" + (integre ? " hs-int" : ""), dir: rtl ? "rtl" : "ltr" }, integre ? null : hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Cette page est réservée à la coach du club."))));
  if (lignes === null) return h("div", { className: "hs" + (integre ? " hs-int" : ""), dir: rtl ? "rtl" : "ltr" }, integre ? null : hero, h("div", { className: "hs-in" }, erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, erreur) : h("div", { className: "hs-attente" }, "…")));
  var aModif = Object.keys(modif).length > 0 || (ev && String(lien || "").trim() !== String(ev.lien_direct || ""));

  return h("div", { className: "hs" + (integre ? " hs-int" : ""), dir: rtl ? "rtl" : "ltr" }, integre ? null : hero,
    h("div", { className: "hs-in" },
      nbConflits ? h("div", { className: "hs-carte", style: { borderColor: "rgba(201,166,107,.7)", padding: "12px 14px", marginTop: 18, fontSize: 13, lineHeight: 1.5 } },
        h("b", { style: { color: "#C9A66B" } }, F("Attention : ")), F("deux cavaliers passent en même temps sur deux pistes différentes. Regarde les lignes marquées.")) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Lire l’ordre de passage ou le programme"))),
      h("div", { className: "hs-note", style: { marginTop: -4, marginBottom: 10 } }, F("Une photo, une capture ou le PDF du programme ou de la liste de départ (numéros et heures d’épreuve, ordre de passage) : Hype prépare les heures et les pistes de tes cavaliers.")),
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
            h("div", { className: "hs-champ" }, h("label", null, F("Heure de passage")), h("input", { type: "time", step: 60, style: { colorScheme: "dark" }, value: (function () { var m = String(p.hp || "").match(/(\d{1,2})\s*[h:.]\s*(\d{2})?/i); return m ? (("0" + m[1]).slice(-2) + ":" + (m[2] || "00")) : ""; })(), onChange: function (e) { var t = String(e.target.value || ""), mm = t.match(/^(\d{2}):(\d{2})/); poser(p.i, "passage" + p.n, mm ? (Number(mm[1]) + "h" + mm[2]) : ""); } })),
            h("div", { className: "hs-champ" }, h("label", null, F("Piste")), h("input", { type: "text", value: p.pi || "", placeholder: F("ex. 1, Bleue"), onChange: function (e) { poser(p.i, "piste" + p.n, e.target.value); } }))));
      })),
      (epreuves.length && !integre) ? h("div", null,
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
          h("div", { className: "hs-vide", style: { marginTop: 10 } }, F("Aucun de tes cavaliers trouvé dans les listes de départ pour l’instant (les listes sont souvent publiées la veille)."))) : null) : null,
      h("div", { className: "hs-champ", style: { marginTop: 14 } }, h("label", null, F("Lien du direct (chronométreur)")), h("input", { type: "url", value: lien, placeholder: "https://…", onChange: function (e) { setLien(e.target.value); setMsg(""); } })),
      h("div", { className: "hs-note", style: { marginTop: -4 } }, F("Colle ici la page des résultats en direct : les cavaliers auront un bouton « Résultats en direct » sur la fiche du concours.")),
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("label", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "rgba(243,238,228,.8)", marginBottom: 10 } },
          h("input", { type: "checkbox", checked: prevenir, onChange: function (e) { setPrevenir(e.target.checked); }, style: { width: 20, minHeight: 20, height: 20, accentColor: "#C9A66B" } }),
          F("Prévenir les cavaliers sur leur téléphone")),
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
        /* 08/11 : les chevaux des tours 3 à 5 (concours_tours) aussi */
        try { var rTd = await supa.from("concours_tours").select("cheval_id, cheval_nom").eq("agenda_id", idEv); ((rTd && !rTd.error && rTd.data) || []).forEach(function (t) { if (t.cheval_id && !ch[t.cheval_id]) ch[t.cheval_id] = t.cheval_nom; }); } catch (eTd) { }
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
        if (!m && u && typeof hypeAccesCentre === "function") { try { m = await hypeAccesCentre(u); } catch (e6) { } }   /* 08/11 choix B : membres des groupes de Blandine */
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
