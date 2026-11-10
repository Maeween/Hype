/* HYPE ▸ 10/11/2026 — LE CAHIER DES CHUTES (et incidents avec un cavalier).
   Demande de Blandine (10/11 17 h 48 : « un cahier des chutes… accessible que par les enseignants… où tu peux signaler
   quand il y a une chute avec un client sur un cheval… dans un premier temps rends-le accessible à tous… principalement
   pour la SEP »). Maquettes montrées à 18 h ; « vas-y, mets tout ça en ligne » à 19 h 47.
   Table cahier_chutes (sql-10-11-cahier-chutes.sql) : pendant le développement, chacun peut écrire et ne relit que SES
   fiches ; Blandine (modératrice) les voit toutes. Plus tard : lecture par les enseignants de l'écurie (club_clef).
   Rappel légal (Code du sport R.322-6) : accident grave (hospitalisation > 24 h, séquelles durables, décès) → déclaration
   au SDJES sous 48 h ; Hype l'affiche en haut du cahier tant que la case « déclaration faite » n'est pas cochée.
   Accès : lien 2hype.fr/#cahier-chutes (aucun bouton ajouté à la navigation). 14 langues, arabe de droite à gauche. */
(function () {
  "use strict";
  var h = React.createElement;
  var ORDRE = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
  function L() { var a = arguments, o = {}; ORDRE.forEach(function (k, i) { o[k] = a[i]; }); return o; }
  var LG = "fr";
  function t(o) { return (o && (o[LG] || o.fr)) || ""; }
  var URL_SDJES = "https://www.sports.gouv.fr/declarer-un-incident-ou-accident-corporel-grave-engendre-par-l-activite-3047";

  var D = {
    sur: L("CAHIER DES CHUTES", "FALLS LOG", "REGISTRO DE CAÍDAS", "REGISTRO CADUTE", "STURZBUCH", "落馬記録", "سجل السقطات", "坠马记录", "VALLENREGISTER", "REGISTO DE QUEDAS", "FALLOGG", "ЖУРНАЛ ПАДЕНИЙ", "REJESTR UPADKÓW", "낙마 기록부"),
    titre: L("Le cahier|des chutes", "The falls|log", "El registro|de caídas", "Il registro|delle cadute", "Das|Sturzbuch", "落馬の|記録帳", "سجلّ|السقطات", "坠马|记录簿", "Het|vallenregister", "O registo|de quedas", "Loggboken|över fall", "Журнал|падений", "Rejestr|upadków", "낙마|기록부"),
    sous: L("Chaque chute ou incident avec un cavalier, noté le jour même : ce qui s’est passé, les suites, qui a été prévenu.", "Every fall or incident with a rider, recorded the same day: what happened, what followed, who was told.", "Cada caída o incidente con un jinete, anotado el mismo día: qué pasó, las consecuencias, a quién se avisó.", "Ogni caduta o incidente con un cavaliere, annotato il giorno stesso: cosa è successo, il seguito, chi è stato avvisato.", "Jeder Sturz oder Vorfall mit einem Reiter, am selben Tag notiert: was passiert ist, die Folgen, wer informiert wurde.", "ライダーの落馬や事故をその日のうちに記録：何が起きたか、その後の対応、誰に連絡したか。", "كل سقطة أو حادث مع فارس، يُسجَّل في اليوم نفسه: ما حدث، وما تلاه، ومن أُبلغ.", "与骑手相关的每次坠马或事故，当天记录：发生了什么、后续处理、通知了谁。", "Elke val of elk incident met een ruiter, dezelfde dag genoteerd: wat er gebeurde, de gevolgen, wie werd ingelicht.", "Cada queda ou incidente com um cavaleiro, registado no próprio dia: o que aconteceu, as consequências, quem foi avisado.", "Varje fall eller incident med en ryttare, noterad samma dag: vad som hände, vad som följde, vem som informerades.", "Каждое падение или происшествие со всадником — в тот же день: что случилось, последствия, кого предупредили.", "Każdy upadek lub incydent z jeźdźcem zapisany tego samego dnia: co się stało, co dalej, kogo powiadomiono.", "라이더의 낙마나 사고를 당일에 기록해요. 무슨 일이 있었는지, 후속 조치, 누구에게 알렸는지."),
    prive: L("Pour l’instant, tu ne vois que les fiches que tu as écrites.", "For now, you only see the entries you wrote.", "Por ahora solo ves las fichas que has escrito.", "Per ora vedi solo le schede che hai scritto.", "Vorerst siehst du nur die Einträge, die du geschrieben hast.", "現在は自分が書いた記録だけが表示されます。", "حاليًا لا ترى إلا البطاقات التي كتبتها.", "目前你只能看到自己写的记录。", "Voorlopig zie je alleen de fiches die je zelf schreef.", "Por agora só vês as fichas que escreveste.", "Just nu ser du bara de poster du själv har skrivit.", "Пока ты видишь только свои записи.", "Na razie widzisz tylko wpisy, które sam napisałeś.", "지금은 내가 쓴 기록만 볼 수 있어요."),
    signaler: L("Signaler une chute", "Report a fall", "Registrar una caída", "Segnala una caduta", "Sturz melden", "落馬を記録", "تسجيل سقطة", "记录坠马", "Val melden", "Registar uma queda", "Rapportera ett fall", "Записать падение", "Zgłoś upadek", "낙마 기록하기"),
    imprimer: L("Imprimer", "Print", "Imprimir", "Stampa", "Drucken", "印刷", "طباعة", "打印", "Afdrukken", "Imprimir", "Skriv ut", "Печать", "Drukuj", "인쇄"),
    tout: L("Tout", "All", "Todo", "Tutto", "Alle", "すべて", "الكل", "全部", "Alles", "Tudo", "Alla", "Все", "Wszystko", "전체"),
    mois: L("Ce mois-ci", "This month", "Este mes", "Questo mese", "Diesen Monat", "今月", "هذا الشهر", "本月", "Deze maand", "Este mês", "Denna månad", "Этот месяц", "Ten miesiąc", "이번 달"),
    suivre: L("À suivre", "Follow-up", "Por seguir", "Da seguire", "Nachverfolgen", "要フォロー", "للمتابعة", "待跟进", "Op te volgen", "A acompanhar", "Följ upp", "Под наблюдением", "Do obserwacji", "후속 필요"),
    vide: L("Aucune chute notée. Tant mieux.", "No falls recorded. All the better.", "Ninguna caída anotada. Mejor así.", "Nessuna caduta annotata. Meglio così.", "Kein Sturz eingetragen. Umso besser.", "記録された落馬はありません。何よりです。", "لا سقطات مسجّلة. هذا أفضل.", "没有坠马记录。太好了。", "Geen val genoteerd. Des te beter.", "Nenhuma queda registada. Ainda bem.", "Inga fall noterade. Så mycket bättre.", "Падений не записано. И хорошо.", "Brak zapisanych upadków. Tym lepiej.", "기록된 낙마가 없어요. 다행이에요."),
    alerte1: L("Accident grave du {d} : à déclarer au service départemental Jeunesse et Sports (SDJES) dans les 48 h.", "Serious accident on {d}: must be reported to the local youth and sports service (SDJES) within 48 h.", "Accidente grave del {d}: declararlo al servicio departamental de Juventud y Deportes (SDJES) en 48 h.", "Incidente grave del {d}: da dichiarare al servizio dipartimentale Gioventù e Sport (SDJES) entro 48 h.", "Schwerer Unfall vom {d}: innerhalb von 48 Std. beim Jugend- und Sportamt (SDJES) melden.", "{d} の重大事故：48時間以内に県の青少年・スポーツ局（SDJES）へ届け出が必要です。", "حادث خطير بتاريخ {d}: يجب التصريح به لدى المصلحة الإقليمية للشباب والرياضة (SDJES) خلال 48 ساعة.", "{d} 的严重事故：须在 48 小时内向省青年与体育局（SDJES）申报。", "Ernstig ongeval van {d}: binnen 48 u melden bij de jeugd- en sportdienst (SDJES).", "Acidente grave de {d}: a declarar ao serviço departamental de Juventude e Desporto (SDJES) em 48 h.", "Allvarlig olycka den {d}: ska anmälas till ungdoms- och idrottsförvaltningen (SDJES) inom 48 h.", "Тяжёлый несчастный случай {d}: сообщить в службу молодёжи и спорта (SDJES) в течение 48 ч.", "Poważny wypadek z {d}: zgłosić w departamentalnym urzędzie ds. młodzieży i sportu (SDJES) w ciągu 48 h.", "{d} 중대 사고: 48시간 이내에 지역 청소년·스포츠청(SDJES)에 신고해야 해요."),
    alerte2: L("Accident grave = hospitalisation de plus de 24 h, séquelles durables ou décès (Code du sport, R.322-6).", "Serious = hospital stay over 24 h, lasting after-effects or death (French Sports Code, R.322-6).", "Grave = hospitalización de más de 24 h, secuelas duraderas o fallecimiento (Código del Deporte, R.322-6).", "Grave = ricovero oltre 24 h, postumi duraturi o decesso (Codice dello sport, R.322-6).", "Schwer = Krankenhaus über 24 Std., bleibende Folgen oder Tod (frz. Sportgesetzbuch, R.322-6).", "重大＝24時間超の入院、後遺症、または死亡（スポーツ法典 R.322-6）。", "خطير = دخول المستشفى لأكثر من 24 ساعة، أو عواقب دائمة، أو وفاة (قانون الرياضة، R.322-6).", "严重 = 住院超过 24 小时、留下持久后遗症或死亡（法国体育法典 R.322-6）。", "Ernstig = ziekenhuisopname van meer dan 24 u, blijvende gevolgen of overlijden (sportwetboek, R.322-6).", "Grave = internamento de mais de 24 h, sequelas duradouras ou morte (Código do Desporto, R.322-6).", "Allvarlig = sjukhusvistelse över 24 h, bestående men eller dödsfall (franska idrottslagen, R.322-6).", "Тяжёлый = госпитализация более 24 ч, стойкие последствия или смерть (Спортивный кодекс, R.322-6).", "Poważny = hospitalizacja ponad 24 h, trwałe skutki lub zgon (Kodeks sportu, R.322-6).", "중대 = 24시간 넘는 입원, 지속적 후유증 또는 사망 (스포츠법 R.322-6)."),
    declarer: L("Faire la déclaration", "Make the report", "Hacer la declaración", "Fai la dichiarazione", "Meldung machen", "届け出をする", "قدّم التصريح", "前往申报", "Melding doen", "Fazer a declaração", "Gör anmälan", "Подать заявление", "Złóż zgłoszenie", "신고하기"),
    // formulaire
    nouveau: L("Signaler|une chute", "Report|a fall", "Registrar|una caída", "Segnala|una caduta", "Einen Sturz|melden", "落馬を|記録する", "تسجيل|سقطة", "记录|一次坠马", "Een val|melden", "Registar|uma queda", "Rapportera|ett fall", "Записать|падение", "Zgłoś|upadek", "낙마를|기록하기"),
    modifierT: L("Compléter|la fiche", "Complete|the entry", "Completar|la ficha", "Completa|la scheda", "Eintrag|ergänzen", "記録を|補足する", "إكمال|البطاقة", "补充|记录", "De fiche|aanvullen", "Completar|a ficha", "Komplettera|posten", "Дополнить|запись", "Uzupełnij|wpis", "기록|보완하기"),
    aChaud: L("Note-la à chaud, tu pourras compléter les suites plus tard.", "Write it down straight away; you can add what followed later.", "Anótala en caliente; podrás completar lo demás más tarde.", "Annotala subito, potrai completare il seguito più tardi.", "Schreib es sofort auf, die Folgen kannst du später ergänzen.", "すぐに記録を。その後の対応はあとで追加できます。", "سجّلها فورًا، ويمكنك إكمال ما تلاها لاحقًا.", "趁热记录，后续情况可稍后补充。", "Noteer het meteen, de gevolgen vul je later aan.", "Regista-a logo; podes completar o resto mais tarde.", "Skriv ner det direkt, du kan fylla i resten senare.", "Запиши сразу, последствия можно дополнить позже.", "Zapisz od razu, resztę uzupełnisz później.", "바로 적어 두세요. 후속 내용은 나중에 보충할 수 있어요."),
    lQuand: L("Quand et où", "When and where", "Cuándo y dónde", "Quando e dove", "Wann und wo", "日時と場所", "متى وأين", "时间与地点", "Wanneer en waar", "Quando e onde", "När och var", "Когда и где", "Kiedy i gdzie", "언제, 어디서"),
    lQuoi: L("Ce qui s’est passé", "What happened", "Qué pasó", "Cosa è successo", "Was passiert ist", "何が起きたか", "ماذا حدث", "发生了什么", "Wat er gebeurde", "O que aconteceu", "Vad som hände", "Что случилось", "Co się stało", "무슨 일이 있었나"),
    lQui: L("Qui et quel cheval", "Who and which horse", "Quién y qué caballo", "Chi e quale cavallo", "Wer und welches Pferd", "誰が、どの馬で", "من، وأي حصان", "谁、哪匹马", "Wie en welk paard", "Quem e que cavalo", "Vem och vilken häst", "Кто и какая лошадь", "Kto i jaki koń", "누가, 어떤 말"),
    lPendant: L("Pendant", "During", "Durante", "Durante", "Während", "状況", "أثناء", "当时在", "Tijdens", "Durante", "Under", "Во время", "Podczas", "상황"),
    lCirc: L("Les circonstances", "What led to it", "Las circunstancias", "Le circostanze", "Die Umstände", "状況の詳細", "الملابسات", "经过", "De omstandigheden", "As circunstâncias", "Omständigheterna", "Обстоятельства", "Okoliczności", "경위"),
    lBless: L("Blessure apparente", "Visible injury", "Lesión aparente", "Lesione apparente", "Sichtbare Verletzung", "見た目のけが", "إصابة ظاهرة", "表面伤情", "Zichtbare verwonding", "Lesão aparente", "Synlig skada", "Видимая травма", "Widoczny uraz", "눈에 띄는 부상"),
    lSuites: L("Les suites", "What followed", "Las consecuencias", "Il seguito", "Die Folgen", "その後の対応", "ما تلاها", "后续", "De gevolgen", "As consequências", "Vad som följde", "Последствия", "Co dalej", "후속 조치"),
    lNotes: L("Suites à suivre (facultatif)", "Follow-up notes (optional)", "Seguimiento (opcional)", "Note di seguito (facoltativo)", "Nachverfolgung (optional)", "フォローメモ（任意）", "ملاحظات المتابعة (اختياري)", "跟进备注（可选）", "Opvolging (optioneel)", "Acompanhamento (opcional)", "Uppföljning (valfritt)", "Дальнейшее (необязательно)", "Dalsze kroki (opcjonalnie)", "후속 메모 (선택)"),
    cavalier: L("Cavalier", "Rider", "Jinete", "Cavaliere", "Reiter", "ライダー", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "라이더"),
    cavalierPh: L("prénom et nom", "first and last name", "nombre y apellido", "nome e cognome", "Vor- und Nachname", "氏名", "الاسم واللقب", "姓名", "voor- en achternaam", "nome e apelido", "för- och efternamn", "имя и фамилия", "imię i nazwisko", "이름"),
    cheval: L("Cheval", "Horse", "Caballo", "Cavallo", "Pferd", "馬", "الحصان", "马匹", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말"),
    chevalPh: L("nom du cheval", "horse’s name", "nombre del caballo", "nome del cavallo", "Name des Pferdes", "馬の名前", "اسم الحصان", "马名", "naam van het paard", "nome do cavalo", "hästens namn", "кличка лошади", "imię konia", "말 이름"),
    circPh: L("Au galop à main droite, le cheval a fait un écart dans le coin…", "Cantering on the right rein, the horse shied in the corner…", "Al galope a mano derecha, el caballo hizo un extraño en la esquina…", "Al galoppo a mano destra, il cavallo ha fatto uno scarto nell’angolo…", "Im Galopp auf der rechten Hand hat das Pferd in der Ecke gescheut…", "右手前の駈歩で、馬がコーナーで横っ飛びした…", "في الخبب على اليد اليمنى، جفل الحصان في الزاوية…", "右手跑步时，马在角落受惊横跳…", "In galop op de rechterhand schrok het paard in de hoek…", "A galope à mão direita, o cavalo fez um esquivo no canto…", "I galopp i höger varv gjorde hästen ett skutt i hörnet…", "На галопе справа лошадь шарахнулась в углу…", "W galopie na prawą rękę koń uskoczył w narożniku…", "오른쪽 구보 중 말이 코너에서 놀라 옆으로 피했어요…"),
    enregistrer: L("Enregistrer dans le cahier", "Save to the log", "Guardar en el registro", "Salva nel registro", "Im Buch speichern", "記録帳に保存", "حفظ في السجل", "保存到记录簿", "Opslaan in het register", "Guardar no registo", "Spara i loggboken", "Сохранить в журнал", "Zapisz w rejestrze", "기록부에 저장"),
    annuler: L("Annuler", "Cancel", "Cancelar", "Annulla", "Abbrechen", "キャンセル", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"),
    supprimer: L("Supprimer la fiche", "Delete entry", "Eliminar la ficha", "Elimina la scheda", "Eintrag löschen", "記録を削除", "حذف البطاقة", "删除记录", "Fiche verwijderen", "Eliminar a ficha", "Radera posten", "Удалить запись", "Usuń wpis", "기록 삭제"),
    confirmeSup: L("Supprimer définitivement cette fiche ?", "Delete this entry for good?", "¿Eliminar esta ficha definitivamente?", "Eliminare definitivamente questa scheda?", "Diesen Eintrag endgültig löschen?", "この記録を完全に削除しますか？", "حذف هذه البطاقة نهائيًا؟", "确定永久删除这条记录吗？", "Deze fiche definitief verwijderen?", "Eliminar esta ficha definitivamente?", "Radera posten för gott?", "Удалить запись навсегда?", "Usunąć ten wpis na stałe?", "이 기록을 영구 삭제할까요?"),
    oui: L("Oui, supprimer", "Yes, delete", "Sí, eliminar", "Sì, elimina", "Ja, löschen", "削除する", "نعم، احذف", "是，删除", "Ja, verwijderen", "Sim, eliminar", "Ja, radera", "Да, удалить", "Tak, usuń", "삭제"),
    manque: L("Indique au moins le cavalier ou le cheval.", "Enter at least the rider or the horse.", "Indica al menos el jinete o el caballo.", "Indica almeno il cavaliere o il cavallo.", "Gib mindestens den Reiter oder das Pferd an.", "ライダーか馬のどちらかは入力してください。", "أدخل الفارس أو الحصان على الأقل.", "至少填写骑手或马匹。", "Vul minstens de ruiter of het paard in.", "Indica pelo menos o cavaleiro ou o cavalo.", "Ange åtminstone ryttaren eller hästen.", "Укажи хотя бы всадника или лошадь.", "Podaj przynajmniej jeźdźca lub konia.", "라이더나 말 중 하나는 입력해 주세요."),
    connecte: L("Connecte-toi pour ouvrir le cahier.", "Sign in to open the log.", "Inicia sesión para abrir el registro.", "Accedi per aprire il registro.", "Melde dich an, um das Buch zu öffnen.", "記録帳を開くにはログインしてください。", "سجّل الدخول لفتح السجل.", "请登录以打开记录簿。", "Log in om het register te openen.", "Inicia sessão para abrir o registo.", "Logga in för att öppna loggboken.", "Войди, чтобы открыть журнал.", "Zaloguj się, aby otworzyć rejestr.", "기록부를 열려면 로그인하세요."),
    erreur: L("Enregistrement impossible : ", "Couldn’t save: ", "No se pudo guardar: ", "Salvataggio impossibile: ", "Speichern nicht möglich: ", "保存できませんでした：", "تعذّر الحفظ: ", "无法保存：", "Opslaan mislukt: ", "Não foi possível guardar: ", "Kunde inte spara: ", "Не удалось сохранить: ", "Nie udało się zapisać: ", "저장할 수 없어요: "),
    modifier: L("Compléter", "Complete", "Completar", "Completa", "Ergänzen", "補足", "إكمال", "补充", "Aanvullen", "Completar", "Komplettera", "Дополнить", "Uzupełnij", "보완"),
    // valeurs
    v_carriere: L("Carrière", "Outdoor arena", "Pista exterior", "Campo esterno", "Außenplatz", "屋外馬場", "الميدان الخارجي", "室外场", "Buitenbak", "Picadeiro exterior", "Ridbana", "Плац", "Ujeżdżalnia", "실외 마장"),
    v_manege: L("Manège", "Indoor arena", "Picadero", "Maneggio coperto", "Reithalle", "屋内馬場", "الميدان المغطى", "室内场", "Binnenbak", "Picadeiro coberto", "Ridhus", "Манеж", "Hala", "실내 마장"),
    v_exterieur: L("Extérieur", "Out hacking", "Exterior", "All’esterno", "Gelände", "外乗", "في الخارج", "野外", "Buiten", "Exterior", "Ute", "На выезде", "Teren", "야외"),
    v_paddock: L("Paddock", "Field", "Paddock", "Paddock", "Koppel", "パドック", "المرعى", "围场", "Weide", "Paddock", "Hage", "Левада", "Padok", "방목장"),
    v_ecurie: L("Écurie", "Stables", "Cuadra", "Scuderia", "Stall", "厩舎", "الإسطبل", "马厩", "Stal", "Cavalariça", "Stall", "Конюшня", "Stajnia", "마구간"),
    v_concours: L("Concours", "Show", "Concurso", "Concorso", "Turnier", "大会", "مسابقة", "比赛", "Wedstrijd", "Concurso", "Tävling", "Соревнования", "Zawody", "대회"),
    v_autre: L("Autre", "Other", "Otro", "Altro", "Sonstiges", "その他", "أخرى", "其他", "Anders", "Outro", "Annat", "Другое", "Inne", "기타"),
    v_chute: L("Chute", "Fall", "Caída", "Caduta", "Sturz", "落馬", "سقوط", "坠马", "Val", "Queda", "Fall", "Падение", "Upadek", "낙마"),
    v_coup_pied: L("Coup de pied", "Kick", "Coz", "Calcio", "Tritt", "蹴られた", "رفسة", "被踢", "Trap", "Coice", "Spark", "Удар копытом", "Kopnięcie", "발차기"),
    v_morsure: L("Morsure", "Bite", "Mordisco", "Morso", "Biss", "噛まれた", "عضّة", "被咬", "Beet", "Mordidela", "Bett", "Укус", "Ugryzienie", "물림"),
    v_bousculade: L("Bousculade à pied", "Knocked over on foot", "Empujón a pie", "Spinta a terra", "Umgerannt am Boden", "地上で押された", "دفع على الأرض", "地面被撞", "Omver gelopen", "Empurrão a pé", "Knuffad till marken", "Сбит на земле", "Potrącenie z ziemi", "지상에서 밀침"),
    v_embarquement: L("Embarquement", "Loading", "Embarque", "Carico", "Verladen", "積み込み", "التحميل", "装车", "Inladen", "Embarque", "Lastning", "Погрузка", "Załadunek", "운송차 탑승"),
    v_cours_collectif: L("Cours collectif", "Group lesson", "Clase en grupo", "Lezione collettiva", "Gruppenstunde", "グループレッスン", "درس جماعي", "集体课", "Groepsles", "Aula coletiva", "Grupplektion", "Групповое занятие", "Jazda grupowa", "그룹 수업"),
    v_cours_particulier: L("Cours particulier", "Private lesson", "Clase particular", "Lezione privata", "Einzelstunde", "個人レッスン", "درس خاص", "私教课", "Privéles", "Aula particular", "Privatlektion", "Индивидуальное", "Jazda indywidualna", "개인 수업"),
    v_travail: L("Travail du cheval", "Schooling", "Trabajo del caballo", "Lavoro del cavallo", "Pferdearbeit", "馬の調教", "عمل الحصان", "调教", "Training paard", "Trabalho do cavalo", "Hästens träning", "Работа лошади", "Praca z koniem", "말 훈련"),
    v_balade: L("Balade", "Hack", "Paseo", "Passeggiata", "Ausritt", "外乗", "نزهة", "骑行外出", "Buitenrit", "Passeio", "Uteritt", "Прогулка", "Wyjazd w teren", "외승"),
    v_soins: L("Soins", "Care", "Cuidados", "Cure", "Pflege", "手入れ", "رعاية", "护理", "Verzorging", "Cuidados", "Skötsel", "Уход", "Pielęgnacja", "관리"),
    v_aucune: L("Aucune", "None", "Ninguna", "Nessuna", "Keine", "なし", "لا شيء", "无", "Geen", "Nenhuma", "Ingen", "Нет", "Brak", "없음"),
    v_legere: L("Légère", "Minor", "Leve", "Lieve", "Leicht", "軽い", "خفيفة", "轻微", "Licht", "Ligeira", "Lindrig", "Лёгкая", "Lekki", "경미"),
    v_grave: L("Grave", "Serious", "Grave", "Grave", "Schwer", "重い", "خطيرة", "严重", "Ernstig", "Grave", "Allvarlig", "Тяжёлая", "Poważny", "중대"),
    remonte: L("Remonté à cheval", "Got back on", "Volvió a montar", "Rimontato a cavallo", "Wieder aufgestiegen", "再騎乗した", "عاد إلى الحصان", "重新上马", "Weer opgestapt", "Voltou a montar", "Satt upp igen", "Снова сел в седло", "Wsiadł ponownie", "다시 탐"),
    soins_place: L("Soins sur place", "First aid on site", "Primeros auxilios en el lugar", "Primo soccorso sul posto", "Erste Hilfe vor Ort", "現場で手当て", "إسعاف في المكان", "现场处理", "Eerste hulp ter plaatse", "Primeiros socorros no local", "Första hjälpen på plats", "Помощь на месте", "Pomoc na miejscu", "현장 응급처치"),
    secours: L("Secours appelés (pompiers, SAMU)", "Emergency services called", "Se llamó a emergencias", "Soccorsi chiamati", "Rettungsdienst gerufen", "救急を呼んだ", "تم الاتصال بالإسعاف", "已呼叫急救", "Hulpdiensten gebeld", "Socorro chamado", "Räddningstjänst larmad", "Вызвана скорая", "Wezwano pogotowie", "구급대 호출"),
    proches: L("Parents ou proches prévenus", "Parents or family told", "Padres o familiares avisados", "Genitori o familiari avvisati", "Eltern oder Angehörige informiert", "保護者・家族に連絡", "إبلاغ الأهل أو المقرّبين", "已通知家长或亲属", "Ouders of naasten ingelicht", "Pais ou familiares avisados", "Föräldrar eller anhöriga informerade", "Родители или близкие предупреждены", "Powiadomiono rodziców lub bliskich", "부모·가족에게 연락"),
    assurance: L("Déclaration à l’assurance faite", "Insurance claim made", "Declaración al seguro hecha", "Denuncia all’assicurazione fatta", "Versicherung gemeldet", "保険に届け出済み", "تم التصريح للتأمين", "已向保险申报", "Verzekering ingelicht", "Participação ao seguro feita", "Försäkringsanmälan gjord", "Страховая уведомлена", "Zgłoszono ubezpieczycielowi", "보험 신고 완료"),
    sdjes: L("Déclaration au SDJES faite (accident grave)", "Reported to SDJES (serious accident)", "Declarado al SDJES (accidente grave)", "Dichiarato al SDJES (incidente grave)", "An SDJES gemeldet (schwerer Unfall)", "SDJESへ届け出済み（重大事故）", "تم التصريح لدى SDJES (حادث خطير)", "已向 SDJES 申报（严重事故）", "Gemeld bij SDJES (ernstig ongeval)", "Declarado ao SDJES (acidente grave)", "Anmält till SDJES (allvarlig olycka)", "Сообщено в SDJES (тяжёлый случай)", "Zgłoszono do SDJES (poważny wypadek)", "SDJES 신고 완료 (중대 사고)"),
    a_suivre: L("À suivre", "Needs follow-up", "Por seguir", "Da seguire", "Nachverfolgen", "要フォロー", "تحتاج متابعة", "需跟进", "Op te volgen", "A acompanhar", "Följ upp", "Требует наблюдения", "Do obserwacji", "후속 필요"),
    sansBless: L("Sans blessure", "No injury", "Sin lesión", "Senza lesioni", "Unverletzt", "けがなし", "بلا إصابة", "无伤", "Zonder letsel", "Sem lesão", "Utan skada", "Без травм", "Bez urazów", "부상 없음")
  };
  var LIEUX = ["carriere", "manege", "exterieur", "paddock", "ecurie", "concours", "autre"];
  var TYPES = ["chute", "coup_pied", "morsure", "bousculade", "embarquement", "autre"];
  var CADRES = ["cours_collectif", "cours_particulier", "travail", "concours", "balade", "soins", "autre"];
  var BLESS = ["aucune", "legere", "grave"];
  var CASES = ["remonte", "soins_place", "secours", "proches_prevenus", "assurance_declaree", "sdjes_declare", "a_suivre"];
  var CASE_LIB = { remonte: "remonte", soins_place: "soins_place", secours: "secours", proches_prevenus: "proches", assurance_declaree: "assurance", sdjes_declare: "sdjes", a_suivre: "a_suivre" };

  var CSS = "" +
    ".cc{--noir:#060709;--c1:#111B1F;--c2:#0B1215;--iv:#F3EEE4;--iv2:rgba(243,238,228,.66);--iv3:rgba(243,238,228,.42);--ch:#C9A66B;--ch2:rgba(201,166,107,.5);--ch3:rgba(201,166,107,.22);background:var(--noir);color:var(--iv);font-family:Montserrat,system-ui,sans-serif;min-height:100vh;overflow-x:clip;-webkit-font-smoothing:antialiased}" +
    ".cc *{box-sizing:border-box}.cc button,.cc input,.cc textarea,.cc select{font-family:inherit}.cc button{cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    ".cc-in{max-width:760px;margin:0 auto}" +
    ".cc-hero{position:relative;max-width:1080px;margin:0 auto}.cc-hero img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain}" +
    ".cc-hero:after{content:'';position:absolute;left:0;right:0;bottom:0;height:50%;background:linear-gradient(0deg,var(--noir),rgba(6,7,9,0))}" +
    ".cc-top{position:absolute;top:calc(env(safe-area-inset-top) + 14px);left:16px;right:16px;display:flex;justify-content:space-between;z-index:3}" +
    ".cc-rond{width:40px;height:40px;border-radius:50%;border:1px solid var(--ch2);display:flex;align-items:center;justify-content:center;color:var(--ch);background:rgba(6,7,9,.55);padding:0}" +
    "[dir=rtl] .cc-rond svg{transform:scaleX(-1)}" +
    ".cc-courbe{display:block;width:100%;height:44px;margin-top:-30px;position:relative;z-index:2}" +
    ".cc-tete{text-align:center;padding:4px 22px 0}.cc-sur{font-size:10.5px;letter-spacing:.32em;color:var(--ch);font-weight:600}" +
    "[dir=rtl] .cc-sur,[dir=rtl] .cc-st span,[dir=rtl] .cc-lab{letter-spacing:0}" +
    ".cc h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:38px;margin:10px 0 10px;line-height:1.08}.cc h1 em{color:var(--ch);font-style:italic}" +
    ".cc-sous{font-size:13px;color:var(--iv2);line-height:1.6;margin:0 auto;max-width:360px}" +
    ".cc-prive{display:inline-flex;align-items:center;gap:7px;margin-top:14px;font-size:11px;color:var(--iv3);border:1px solid var(--ch3);border-radius:999px;padding:6px 12px;line-height:1.4}" +
    ".cc-actions{display:flex;justify-content:center;gap:10px;padding:22px 16px 6px;flex-wrap:wrap}" +
    ".cc-btn{padding:11px 20px;border-radius:999px;border:1px solid var(--ch);color:var(--ch);font-size:13px;font-weight:600;background:transparent}" +
    ".cc-btn.sec{border-color:var(--ch3);color:var(--iv2)}.cc-btn[disabled]{opacity:.5}" +
    ".cc-chips{display:flex;gap:6px;justify-content:center;padding:16px 12px 4px;flex-wrap:wrap}.cc-chip{padding:7px 12px;border-radius:999px;border:1px solid var(--ch3);font-size:11.5px;color:var(--iv2);background:transparent}.cc-chip.on{border-color:var(--ch);color:var(--ch)}" +
    ".cc-st{display:flex;align-items:center;gap:12px;margin:22px 22px 12px}.cc-st:before,.cc-st:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,166,107,0),var(--ch2))}.cc-st:after{background:linear-gradient(270deg,rgba(201,166,107,0),var(--ch2))}.cc-st span{font-size:10.5px;letter-spacing:.3em;color:var(--ch);font-weight:600;text-transform:uppercase}" +
    ".cc-l{display:block;width:calc(100% - 32px);margin:0 16px 12px;border-radius:18px;border:1px solid var(--ch3);background:linear-gradient(165deg,var(--c1),var(--c2));padding:13px 15px;text-align:start;color:var(--iv)}" +
    ".cc-l .d{font-size:10.5px;color:var(--iv3);letter-spacing:.04em;text-transform:uppercase}.cc-l b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:21px;margin:3px 0 4px}" +
    ".cc-l p{margin:0;font-size:12px;color:var(--iv2);line-height:1.45}" +
    ".cc-tag{display:inline-block;margin-top:8px;margin-inline-end:5px;font-size:10px;padding:4px 9px;border-radius:999px;border:1px solid var(--ch3);color:var(--iv2)}" +
    ".cc-tag.or{border-color:var(--ch2);color:var(--ch)}.cc-tag.grave{border-color:rgba(243,238,228,.6);color:var(--iv)}" +
    ".cc-alerte{margin:12px 16px;padding:14px 16px;border-radius:16px;border:1px solid var(--ch2);background:rgba(201,166,107,.06);font-size:12.3px;line-height:1.55;color:var(--iv2)}" +
    ".cc-alerte b{color:var(--ch);font-weight:600}.cc-alerte a{color:var(--ch)}" +
    ".cc-vide{text-align:center;color:var(--iv3);font-size:13px;padding:30px 20px}" +
    ".cc-f{padding:6px 16px 0}.cc-lab{font-size:9.5px;letter-spacing:.18em;color:var(--ch);font-weight:600;margin:18px 4px 8px;text-transform:uppercase}" +
    ".cc-champ{width:100%;border:1px solid var(--ch3);border-radius:14px;padding:12px 14px;font-size:14px;color:var(--iv);background:var(--c2);min-height:46px;outline:none;-webkit-appearance:none;appearance:none}" +
    ".cc-champ:focus{border-color:var(--ch2)}.cc-champ::placeholder{color:var(--iv3)}" +
    "textarea.cc-champ{min-height:90px;line-height:1.5;resize:vertical}" +
    ".cc-duo{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
    ".cc-tuiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}" +
    ".cc-tu{border:1px solid var(--ch3);border-radius:14px;padding:11px 6px;text-align:center;font-size:11.8px;color:var(--iv2);background:var(--c2);min-height:44px}" +
    ".cc-tu.on{border-color:var(--ch);color:var(--ch)}" +
    ".cc-case{display:flex;gap:12px;align-items:center;font-size:13px;color:var(--iv2);padding:9px 2px;cursor:pointer}" +
    ".cc-case i{flex:0 0 22px;width:22px;height:22px;border-radius:6px;border:1px solid var(--ch2);display:inline-flex;align-items:center;justify-content:center;color:var(--ch);font-style:normal;font-size:12px}" +
    ".cc-pied{display:flex;justify-content:center;gap:10px;padding:26px 16px 10px;flex-wrap:wrap}" +
    ".cc-msg{text-align:center;font-size:12.5px;color:var(--ch);padding:6px 16px}" +
    ".cc-sup{display:block;margin:6px auto 0;background:none;border:0;color:var(--iv3);font-size:12px;text-decoration:underline;padding:10px}" +
    "@media (min-width:768px){.cc h1{font-size:48px}.cc-tuiles{grid-template-columns:repeat(6,1fr)}}" +
    "@media print{.cc-top,.cc-actions,.cc-chips,.cc-hero img,.cc-courbe,.hype-barre-onglets{display:none!important}.cc{background:#fff;color:#000}.cc-l{border:1px solid #999;background:#fff;color:#000;break-inside:avoid}.cc-l p,.cc-l .d,.cc-tag{color:#000}.cc-sur,.cc-st span{color:#000}}";
  function injecter() { try { if (!document.getElementById("cc-css")) { var s = document.createElement("style"); s.id = "cc-css"; s.textContent = CSS; document.head.appendChild(s); } } catch (e) { } }
  function titre(cle) { var s = t(D[cle]).split("|"); return s.length > 1 ? [s[0] + " ", h("em", { key: "e" }, s[1])] : s[0]; }
  var IC_RETOUR = h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 }, h("path", { d: "M15 5l-7 7 7 7" }));
  var IC_CADENAS = h("svg", { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 }, h("rect", { x: 5, y: 11, width: 14, height: 10, rx: 2 }), h("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }));
  var COURBE = h("svg", { className: "cc-courbe", viewBox: "0 0 390 44", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 30 C 110 44, 250 4, 390 18", fill: "none", stroke: "#C9A66B", strokeOpacity: ".75", strokeWidth: 1.2 }));

  function locale() { return LG === "zh" ? "zh-CN" : LG; }
  function fmt(iso, o) { try { return new Intl.DateTimeFormat(locale(), o).format(new Date(iso)); } catch (e) { return String(iso || "").slice(0, 16); } }
  function pourInput(d) { var x = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return x.toISOString().slice(0, 16); }
  function vide() { return { id: null, survenu_le: pourInput(new Date()), lieu: "carriere", type: "chute", cadre: "cours_collectif", cavalier_nom: "", cheval_nom: "", circonstances: "", blessure: "aucune", suites: "", remonte: false, soins_place: false, secours: false, proches_prevenus: false, assurance_declaree: false, sdjes_declare: false, a_suivre: false }; }

  function Cahier() {
    injecter();
    var app = (typeof useApp === "function") ? useApp() : {};
    LG = (app && app.langue) || "fr";
    var setEcran = app.setEcran || function () { };
    var rtl = LG === "ar";
    var _u = React.useState(undefined), moi = _u[0], setMoi = _u[1];
    var _l = React.useState(null), liste = _l[0], setListe = _l[1];
    var _f = React.useState(null), fiche = _f[0], setFiche = _f[1];       /* null = liste ; objet = formulaire */
    var _filt = React.useState("tout"), filtre = _filt[0], setFiltre = _filt[1];
    var _m = React.useState(""), msg = _m[0], setMsg = _m[1];
    var _b = React.useState(false), occupe = _b[0], setOccupe = _b[1];
    var _s = React.useState(false), confSup = _s[0], setConfSup = _s[1];
    var _ch = React.useState([]), chevaux = _ch[0], setChevaux = _ch[1];

    function charger() {
      try {
        supa.from("cahier_chutes").select("*").order("survenu_le", { ascending: false }).limit(500).then(function (r) { setListe((r && r.data) || []); });
      } catch (e) { setListe([]); }
    }
    React.useEffect(function () {
      var vif = true;
      try {
        supa.auth.getUser().then(function (r) {
          var u = r && r.data && r.data.user; if (!vif) return; setMoi(u || null);
          if (!u) return;
          charger();
          supa.from("chevaux").select("id, nom").eq("user_id", u.id).is("supprime_le", null).order("nom").limit(300).then(function (rc) { if (vif) setChevaux((rc && rc.data) || []); });
        });
      } catch (e) { setMoi(null); }
      return function () { vif = false; };
    }, []);

    function retour() { if (fiche) { setFiche(null); setConfSup(false); setMsg(""); try { window.scrollTo(0, 0); } catch (e) { } return; } try { if (window.history.length > 1) { window.history.back(); return; } } catch (e) { } setEcran("dashboard"); }
    function set(k, v) { var n = Object.assign({}, fiche); n[k] = v; setFiche(n); }

    function enregistrer() {
      if (!String(fiche.cavalier_nom || "").trim() && !String(fiche.cheval_nom || "").trim()) { setMsg(t(D.manque)); return; }
      setOccupe(true); setMsg("");
      var ch = chevaux.filter(function (c) { return String(c.nom).trim().toLowerCase() === String(fiche.cheval_nom || "").trim().toLowerCase(); })[0];
      var ligne = {
        survenu_le: new Date(fiche.survenu_le || Date.now()).toISOString(), lieu: fiche.lieu, type: fiche.type, cadre: fiche.cadre,
        cavalier_nom: String(fiche.cavalier_nom || "").trim() || null, cheval_nom: String(fiche.cheval_nom || "").trim() || null, cheval_id: ch ? ch.id : null,
        circonstances: String(fiche.circonstances || "").trim() || null, blessure: fiche.blessure, suites: String(fiche.suites || "").trim() || null, maj_le: new Date().toISOString()
      };
      CASES.forEach(function (k) { ligne[k] = !!fiche[k]; });
      var req = fiche.id ? supa.from("cahier_chutes").update(ligne).eq("id", fiche.id) : supa.from("cahier_chutes").insert(ligne);
      req.then(function (r) {
        setOccupe(false);
        if (r && r.error) { setMsg(t(D.erreur) + r.error.message); return; }
        setFiche(null); charger(); try { window.scrollTo(0, 0); } catch (e) { }
      });
    }
    function supprimer() {
      setOccupe(true);
      supa.from("cahier_chutes").delete().eq("id", fiche.id).then(function (r) {
        setOccupe(false); setConfSup(false);
        if (r && r.error) { setMsg(t(D.erreur) + r.error.message); return; }
        setFiche(null); charger();
      });
    }

    var top = h("div", { className: "cc-top" }, h("button", { type: "button", className: "cc-rond", "aria-label": "←", onClick: retour }, IC_RETOUR));

    /* ── formulaire ── */
    if (fiche) {
      function tuiles(cle, valeurs) {
        return h("div", { className: "cc-tuiles" }, valeurs.map(function (v) {
          return h("button", { key: v, type: "button", className: "cc-tu" + (fiche[cle] === v ? " on" : ""), "aria-pressed": fiche[cle] === v ? "true" : "false", onClick: function () { set(cle, v); } }, t(D["v_" + v]));
        }));
      }
      return h("div", { className: "cc", dir: rtl ? "rtl" : undefined },
        h("div", { style: { position: "relative", paddingTop: 70 } }, top),
        h("div", { className: "cc-in" },
          h("div", { className: "cc-tete" }, h("div", { className: "cc-sur" }, t(D.sur)), h("h1", null, titre(fiche.id ? "modifierT" : "nouveau")), h("p", { className: "cc-sous" }, t(D.aChaud))),
          h("div", { className: "cc-f" },
            h("div", { className: "cc-lab" }, t(D.lQuand)),
            h("input", { className: "cc-champ", type: "datetime-local", value: fiche.survenu_le, onChange: function (e) { set("survenu_le", e.target.value); } }),
            h("div", { style: { height: 8 } }),
            tuiles("lieu", LIEUX.filter(function (v) { return v !== "autre"; })),
            h("div", { className: "cc-lab" }, t(D.lQuoi)), tuiles("type", TYPES),
            h("div", { className: "cc-lab" }, t(D.lQui)),
            h("input", { className: "cc-champ", type: "text", value: fiche.cavalier_nom, placeholder: t(D.cavalier) + " · " + t(D.cavalierPh), autoComplete: "off", onChange: function (e) { set("cavalier_nom", e.target.value); } }),
            h("div", { style: { height: 8 } }),
            h("input", { className: "cc-champ", type: "text", value: fiche.cheval_nom, placeholder: t(D.cheval) + " · " + t(D.chevalPh), list: "cc-chevaux", autoComplete: "off", onChange: function (e) { set("cheval_nom", e.target.value); } }),
            h("datalist", { id: "cc-chevaux" }, chevaux.map(function (c) { return h("option", { key: c.id, value: c.nom }); })),
            h("div", { className: "cc-lab" }, t(D.lPendant)), tuiles("cadre", CADRES.filter(function (v) { return v !== "autre"; })),
            h("div", { className: "cc-lab" }, t(D.lCirc)),
            h("textarea", { className: "cc-champ", value: fiche.circonstances, placeholder: t(D.circPh), onChange: function (e) { set("circonstances", e.target.value); } }),
            h("div", { className: "cc-lab" }, t(D.lBless)), tuiles("blessure", BLESS),
            h("div", { className: "cc-lab" }, t(D.lSuites)),
            CASES.filter(function (k) { return k !== "sdjes_declare" || fiche.blessure === "grave"; }).map(function (k) {
              return h("div", { key: k, className: "cc-case", role: "checkbox", "aria-checked": fiche[k] ? "true" : "false", tabIndex: 0, onClick: function () { set(k, !fiche[k]); } }, h("i", null, fiche[k] ? "✓" : ""), t(D[CASE_LIB[k]]));
            }),
            fiche.blessure === "grave" ? h("div", { className: "cc-alerte", style: { margin: "10px 0 0" } }, t(D.alerte2), " ", h("a", { href: URL_SDJES, target: "_blank", rel: "noopener" }, t(D.declarer) + " ›")) : null,
            h("div", { className: "cc-lab" }, t(D.lNotes)),
            h("textarea", { className: "cc-champ", value: fiche.suites, onChange: function (e) { set("suites", e.target.value); } })),
          msg ? h("div", { className: "cc-msg" }, msg) : null,
          h("div", { className: "cc-pied" },
            h("button", { type: "button", className: "cc-btn", disabled: occupe, onClick: enregistrer }, t(D.enregistrer)),
            h("button", { type: "button", className: "cc-btn sec", onClick: function () { setFiche(null); setMsg(""); } }, t(D.annuler))),
          fiche.id ? (confSup
            ? h("div", { className: "cc-pied", style: { paddingTop: 0 } }, h("span", { style: { width: "100%", textAlign: "center", fontSize: 12.5, color: "rgba(243,238,228,.66)" } }, t(D.confirmeSup)),
                h("button", { type: "button", className: "cc-btn", disabled: occupe, onClick: supprimer }, t(D.oui)), h("button", { type: "button", className: "cc-btn sec", onClick: function () { setConfSup(false); } }, t(D.annuler)))
            : h("button", { type: "button", className: "cc-sup", onClick: function () { setConfSup(true); } }, t(D.supprimer))) : null,
          h("div", { style: { height: 40 } })));
    }

    /* ── liste ── */
    var hero = [h("div", { key: "h", className: "cc-hero" }, top, h("img", { src: "images/cours-g1-c3-box.webp", alt: "" })), h("div", { key: "c" }, COURBE),
      h("div", { key: "t", className: "cc-tete" }, h("div", { className: "cc-sur" }, t(D.sur)), h("h1", null, titre("titre")), h("p", { className: "cc-sous" }, t(D.sous)),
        h("span", { className: "cc-prive" }, IC_CADENAS, t(D.prive)))];
    if (moi === null) return h("div", { className: "cc", dir: rtl ? "rtl" : undefined }, hero, h("div", { className: "cc-vide" }, t(D.connecte)));
    var maintenant = new Date();
    var L2 = (liste || []).filter(function (f) {
      if (filtre === "mois") { var d = new Date(f.survenu_le); return d.getMonth() === maintenant.getMonth() && d.getFullYear() === maintenant.getFullYear(); }
      if (filtre === "suivre") return f.a_suivre;
      return true;
    });
    var aDeclarer = (liste || []).filter(function (f) { return f.blessure === "grave" && !f.sdjes_declare && (Date.now() - new Date(f.survenu_le).getTime()) < 30 * 864e5; });
    var groupes = [], cle0 = null;
    L2.forEach(function (f) { var k = String(f.survenu_le).slice(0, 7); if (k !== cle0) { groupes.push({ k: k, d: f.survenu_le, l: [] }); cle0 = k; } groupes[groupes.length - 1].l.push(f); });

    return h("div", { className: "cc", dir: rtl ? "rtl" : undefined }, hero,
      h("div", { className: "cc-in" },
        h("div", { className: "cc-actions" },
          h("button", { type: "button", className: "cc-btn", onClick: function () { setFiche(vide()); setMsg(""); try { window.scrollTo(0, 0); } catch (e) { } } }, t(D.signaler)),
          (liste && liste.length) ? h("button", { type: "button", className: "cc-btn sec", onClick: function () { try { window.print(); } catch (e) { } } }, t(D.imprimer)) : null),
        aDeclarer.map(function (f) {
          return h("div", { key: "a" + f.id, className: "cc-alerte" }, h("b", null, t(D.alerte1).replace("{d}", fmt(f.survenu_le, { day: "numeric", month: "long" }))), " ", t(D.alerte2), " ", h("a", { href: URL_SDJES, target: "_blank", rel: "noopener" }, t(D.declarer) + " ›"));
        }),
        (liste && liste.length) ? h("div", { className: "cc-chips" }, [["tout", "tout"], ["mois", "mois"], ["suivre", "suivre"]].map(function (x) { return h("button", { key: x[0], type: "button", className: "cc-chip" + (filtre === x[0] ? " on" : ""), onClick: function () { setFiltre(x[0]); } }, t(D[x[1]])); })) : null,
        liste === null ? null : (!L2.length ? h("div", { className: "cc-vide" }, t(D.vide)) :
          groupes.map(function (g) {
            return h(React.Fragment, { key: g.k },
              h("div", { className: "cc-st" }, h("span", null, fmt(g.d, { month: "long", year: "numeric" }))),
              g.l.map(function (f) {
                var qui = [f.cavalier_nom, f.cheval_nom].filter(Boolean).join(" · ");
                return h("button", { key: f.id, type: "button", className: "cc-l", onClick: function () { var n = Object.assign(vide(), f); n.survenu_le = pourInput(new Date(f.survenu_le)); n.cavalier_nom = f.cavalier_nom || ""; n.cheval_nom = f.cheval_nom || ""; n.circonstances = f.circonstances || ""; n.suites = f.suites || ""; setFiche(n); setMsg(""); try { window.scrollTo(0, 0); } catch (e) { } } },
                  h("div", { className: "d" }, [fmt(f.survenu_le, { weekday: "short", day: "numeric", month: "short" }), fmt(f.survenu_le, { hour: "2-digit", minute: "2-digit" }), f.lieu ? t(D["v_" + f.lieu]) : ""].filter(Boolean).join(" · ")),
                  h("b", null, qui || t(D["v_" + (f.type || "chute")])),
                  f.circonstances ? h("p", null, f.circonstances) : null,
                  h("div", null,
                    h("span", { className: "cc-tag" }, t(D["v_" + (f.type || "chute")])),
                    f.blessure === "grave" ? h("span", { className: "cc-tag grave" }, t(D.v_grave)) : f.blessure === "legere" ? h("span", { className: "cc-tag" }, t(D.v_legere)) : h("span", { className: "cc-tag" }, t(D.sansBless)),
                    f.remonte ? h("span", { className: "cc-tag" }, t(D.remonte)) : null,
                    f.proches_prevenus ? h("span", { className: "cc-tag" }, t(D.proches)) : null,
                    f.assurance_declaree ? h("span", { className: "cc-tag" }, t(D.assurance)) : null,
                    f.a_suivre ? h("span", { className: "cc-tag or" }, t(D.a_suivre)) : null));
              }));
          })),
        h("div", { style: { height: 40 } })));
  }

  window.HypeChutes = { Cahier: Cahier };
})();
