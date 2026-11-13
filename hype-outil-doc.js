/* hype-outil-doc.js — 13/11 (Blandine) : L'OUTIL UNIQUE « Ajouter un document ».
   Règle permanente (SUIVI 13/11 15h01) : plus aucun nouvel outil de lecture séparé ; un seul outil, proposé en bas des pages.
   Étape 1 (13/11 20h55, « Ok, vas-y ») :
   - l'encart du bas de page (maquette validée : cheval entier en haut, texte dessous, « Tout ce qu'il sait lire » qui se déplie) ;
   - la lecture de N'IMPORTE QUEL document (photo, capture, PDF, même écrit à la main) par hey-baby-vision : Hype dit ce qu'il
     a compris, et s'il doute il POSE UNE QUESTION (« est-ce bien les dates de maréchalerie de X, Y, Z ? ») ; on répond en
     texte ou à la voix (micro du clavier) et il relit avec la réponse ;
   - ce qu'il fait ensuite selon le document :
       · liste de soins (maréchal, vermifuge, vaccin, dentiste… pour un ou plusieurs chevaux) → lignes à cocher, on choisit le
         cheval reconnu, « Enregistrer » crée les soins (avec la date du prochain, comme l'import du carnet) ;
       · carnet de vaccins → page Santé du cheval, lecture du carnet lancée (lecteur existant) ;
       · programme / ordre de passage → Jour J / Engagements du concours ouvert (lecteurs existants, document gardé) ;
       · papiers du cheval, ordonnance, facture, autre → rangé dans les documents du cheval (page Santé) ;
   Rien n'est enregistré sans validation. Textes en français d'abord (traduction après relecture, règle du 02/11). */
(function () {
  var h = React.createElement;
  var OR = "#C9A66B";
  var LG = ["en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko", "fa"];
  var TXT = {
"N° de puce": ["Microchip no.", "N.º de chip", "N. microchip", "マイクロチップ番号", "Chipnummer", "رقم الشريحة", "芯片号", "Chipnummer", "N.º do microchip", "Chipnummer", "Номер чипа", "Nr chipa", "마이크로칩 번호", "شماره تراشه"],
"Propriétaire": ["Owner", "Propietario", "Proprietario", "所有者", "Besitzer", "المالك", "马主", "Eigenaar", "Proprietário", "Ägare", "Владелец", "Właściciel", "소유주", "مالک"],

"Je t’écoute.": ["I’m listening.", "Te escucho.", "Ti ascolto.", "聞いています。", "Ich höre dir zu.", "أنا أستمع إليك.", "我在听。", "Ik luister.", "Estou a ouvir-te.", "Jag lyssnar.", "Я слушаю.", "Słucham cię.", "듣고 있어요.", "گوش می‌دهم."],
"Je t’écoute…": ["Listening…", "Te escucho…", "Ti ascolto…", "聞いています…", "Ich höre zu…", "أستمع…", "正在听……", "Ik luister…", "Estou a ouvir…", "Jag lyssnar…", "Слушаю…", "Słucham…", "듣고 있어요…", "گوش می‌دهم…"],
"Conversation à la voix : activée": ["Voice conversation: on", "Conversación por voz: activada", "Conversazione a voce: attiva", "音声会話：オン", "Sprachgespräch: aktiv", "المحادثة الصوتية: مفعّلة", "语音对话：已开启", "Spraakgesprek: aan", "Conversa por voz: ativada", "Röstsamtal: på", "Голосовой разговор: включён", "Rozmowa głosowa: włączona", "음성 대화: 켜짐", "گفتگوی صوتی: فعال"],
"Parler avec Hype": ["Talk with Hype", "Hablar con Hype", "Parla con Hype", "Hypeと話す", "Mit Hype sprechen", "تحدّث مع Hype", "和 Hype 对话", "Praat met Hype", "Falar com o Hype", "Prata med Hype", "Поговорить с Hype", "Porozmawiaj z Hype", "Hype와 대화", "با Hype حرف بزن"],

"Tu peux me transmettre une photo, une capture ou un PDF, ou simplement me le dire en vocal. Je te poserai une question si j’ai un doute.": ["You can send me a photo, a screenshot or a PDF, or simply tell me by voice. I’ll ask you a question if I’m unsure.", "Puedes enviarme una foto, una captura o un PDF, o simplemente decírmelo por voz. Te haré una pregunta si tengo alguna duda.", "Puoi inviarmi una foto, uno screenshot o un PDF, oppure semplicemente dirmelo a voce. Ti farò una domanda se ho un dubbio.", "写真、スクリーンショット、PDFを送るか、音声でそのまま話してください。迷ったら質問します。", "Du kannst mir ein Foto, einen Screenshot oder ein PDF schicken oder es mir einfach per Sprache sagen. Bei Zweifeln stelle ich dir eine Frage.", "يمكنك أن ترسل لي صورة أو لقطة شاشة أو ملف PDF، أو أن تقوله لي ببساطة صوتيًا. سأطرح عليك سؤالًا إن كان لديّ شك.", "你可以发给我照片、截图或 PDF，或者直接用语音告诉我。如有疑问，我会问你。", "Je kunt me een foto, screenshot of pdf sturen, of het me gewoon inspreken. Bij twijfel stel ik je een vraag.", "Podes enviar-me uma foto, uma captura ou um PDF, ou simplesmente dizer-mo por voz. Farei uma pergunta se tiver dúvidas.", "Du kan skicka en bild, en skärmbild eller en pdf, eller bara säga det med rösten. Jag ställer en fråga om jag är osäker.", "Можешь отправить мне фото, скриншот или PDF или просто сказать голосом. Если засомневаюсь, задам вопрос.", "Możesz przesłać mi zdjęcie, zrzut ekranu lub PDF albo po prostu powiedzieć mi to głosowo. Jeśli będę mieć wątpliwość, zadam pytanie.", "사진, 스크린샷, PDF를 보내거나 그냥 음성으로 말해 주세요. 헷갈리면 질문할게요.", "می‌توانی یک عکس، اسکرین‌شات یا PDF بفرستی، یا فقط با صدا به من بگویی. اگر شک داشته باشم سؤالی می‌پرسم."],

"Que souhaites-tu enregistrer ?": ["What would you like to save?", "¿Qué deseas guardar?", "Cosa desideri salvare?", "何を保存しますか？", "Was möchtest du speichern?", "ماذا تودّ أن تحفظ؟", "你想保存什么？", "Wat wil je graag opslaan?", "O que desejas guardar?", "Vad vill du spara?", "Что ты хочешь сохранить?", "Co chcesz zapisać?", "무엇을 저장하고 싶나요?", "چه چیزی را می‌خواهی ثبت کنی؟"],
"Tu peux me transmettre une photo, une capture ou un PDF, ou simplement me dire ce qu’il faut noter. Je te poserai une question si j’ai un doute.": ["You can send me a photo, a screenshot or a PDF, or simply tell me what to note. I’ll ask you a question if I’m unsure.", "Puedes enviarme una foto, una captura o un PDF, o simplemente decirme qué hay que anotar. Te haré una pregunta si tengo alguna duda.", "Puoi inviarmi una foto, uno screenshot o un PDF, oppure dirmi semplicemente cosa annotare. Ti farò una domanda se ho un dubbio.", "写真、スクリーンショット、PDFを送るか、記録することをそのまま話してください。迷ったら質問します。", "Du kannst mir ein Foto, einen Screenshot oder ein PDF schicken oder mir einfach sagen, was ich notieren soll. Bei Zweifeln stelle ich dir eine Frage.", "يمكنك أن ترسل لي صورة أو لقطة شاشة أو ملف PDF، أو أن تخبرني ببساطة بما يجب تسجيله. سأطرح عليك سؤالًا إن كان لديّ شك.", "你可以发给我照片、截图或 PDF，或者直接告诉我要记录什么。如有疑问，我会问你。", "Je kunt me een foto, screenshot of pdf sturen, of me gewoon zeggen wat ik moet noteren. Bij twijfel stel ik je een vraag.", "Podes enviar-me uma foto, uma captura ou um PDF, ou simplesmente dizer-me o que anotar. Farei uma pergunta se tiver dúvidas.", "Du kan skicka en bild, en skärmbild eller en pdf, eller bara säga vad jag ska anteckna. Jag ställer en fråga om jag är osäker.", "Можешь отправить мне фото, скриншот или PDF или просто сказать, что записать. Если засомневаюсь, задам вопрос.", "Możesz przesłać mi zdjęcie, zrzut ekranu lub PDF albo po prostu powiedzieć, co zanotować. Jeśli będę mieć wątpliwość, zadam pytanie.", "사진, 스크린샷, PDF를 보내거나 기록할 내용을 그냥 말해 주세요. 헷갈리면 질문할게요.", "می‌توانی یک عکس، اسکرین‌شات یا PDF بفرستی، یا فقط بگویی چه چیزی یادداشت شود. اگر شک داشته باشم سؤالی می‌پرسم."],

"Un document, une info ?": ["A document, some info?", "¿Un documento, un dato?", "Un documento, un’informazione?", "書類や情報がある？", "Ein Dokument, eine Info?", "مستند أو معلومة؟", "有文件或信息吗？", "Een document, een info?", "Um documento, uma informação?", "Ett dokument, en uppgift?", "Документ или информация?", "Dokument albo informacja?", "문서나 정보가 있나요?", "سند یا اطلاعاتی داری؟"],
"Que veux-tu enregistrer ?": ["What would you like to save?", "¿Qué quieres guardar?", "Cosa vuoi salvare?", "何を保存する？", "Was möchtest du speichern?", "ماذا تريد أن تحفظ؟", "你想保存什么？", "Wat wil je opslaan?", "O que queres guardar?", "Vad vill du spara?", "Что ты хочешь сохранить?", "Co chcesz zapisać?", "무엇을 저장할까요?", "چه چیزی را می‌خواهی ثبت کنی؟"],
"Donne-moi une photo, une capture ou un PDF, même écrit à la main, ou dis-moi simplement ce qu’il faut noter. Je te pose une question si j’ai un doute.": ["Give me a photo, a screenshot or a PDF, even handwritten, or just tell me what to note. I’ll ask you if I’m unsure.", "Dame una foto, una captura o un PDF, aunque sea a mano, o simplemente dime qué hay que anotar. Te preguntaré si tengo dudas.", "Dammi una foto, uno screenshot o un PDF, anche scritto a mano, oppure dimmi semplicemente cosa annotare. Ti chiedo se ho un dubbio.", "写真、スクリーンショット、PDF（手書きでもOK）を渡すか、記録することを話してね。迷ったら質問します。", "Gib mir ein Foto, einen Screenshot oder ein PDF, auch handschriftlich, oder sag mir einfach, was ich notieren soll. Bei Zweifeln frage ich nach.", "أعطني صورة أو لقطة شاشة أو PDF، حتى لو كانت بخط اليد، أو قل لي ببساطة ما يجب تسجيله. سأسألك إن شككت.", "给我一张照片、截图或 PDF（手写也可以），或者直接告诉我要记录什么。有疑问时我会问你。", "Geef me een foto, screenshot of pdf, ook handgeschreven, of zeg gewoon wat ik moet noteren. Bij twijfel vraag ik het je.", "Dá-me uma foto, uma captura ou um PDF, mesmo escrito à mão, ou diz-me simplesmente o que anotar. Pergunto-te se tiver dúvidas.", "Ge mig en bild, skärmbild eller pdf, även handskriven, eller säg bara vad jag ska anteckna. Jag frågar om jag är osäker.", "Дай мне фото, скриншот или PDF, даже рукописный, или просто скажи, что записать. Если засомневаюсь — спрошу.", "Daj mi zdjęcie, zrzut ekranu lub PDF, nawet pisany ręcznie, albo po prostu powiedz, co zanotować. Zapytam, jeśli będę mieć wątpliwości.", "사진, 스크린샷, PDF(손글씨도 OK)를 주거나 기록할 내용을 그냥 말해 줘요. 헷갈리면 물어볼게요.", "یک عکس، اسکرین‌شات یا PDF بده، حتی دست‌نویس، یا فقط بگو چه چیزی یادداشت شود. اگر شک داشته باشم می‌پرسم."],
"Par exemple : « Enregistre les horaires : départ 6 h 30, embarquement 7 h, reco à 8 h pour la Club 3 »": ["For example: “Save the times: departure 6:30, loading 7:00, course walk at 8:00 for the Club 3”", "Por ejemplo: «Guarda los horarios: salida 6:30, embarque 7:00, reconocimiento a las 8:00 para la Club 3»", "Per esempio: «Salva gli orari: partenza 6:30, imbarco 7:00, ricognizione alle 8:00 per la Club 3»", "例：「時間を保存して：出発6時30分、積み込み7時、Club 3の下見8時」", "Zum Beispiel: „Speichere die Zeiten: Abfahrt 6:30, Verladen 7:00, Parcoursbesichtigung 8:00 für die Club 3“", "مثلًا: «احفظ المواعيد: المغادرة 6:30، التحميل 7:00، المعاينة 8:00 لفئة Club 3»", "例如：“保存时间：6:30 出发，7:00 装车，Club 3 8:00 看场”", "Bijvoorbeeld: ‘Sla de tijden op: vertrek 6.30, inladen 7.00, verkenning 8.00 voor de Club 3’", "Por exemplo: «Guarda os horários: partida 6h30, embarque 7h, reconhecimento às 8h para a Club 3»", "Till exempel: ”Spara tiderna: avfärd 6.30, lastning 7.00, banvandring 8.00 för Club 3”", "Например: «Сохрани время: отъезд 6:30, погрузка 7:00, просмотр в 8:00 для Club 3»", "Na przykład: „Zapisz godziny: wyjazd 6:30, załadunek 7:00, zapoznanie o 8:00 dla Club 3”", "예: “시간 저장해 줘: 출발 6시 30분, 상차 7시, Club 3 코스 답사 8시”", "مثلاً: «ساعت‌ها را ثبت کن: حرکت ۶:۳۰، بارگیری ۷:۰۰، بازدید مسیر ۸:۰۰ برای Club 3»"],
"Envoyer sans document": ["Send without a document", "Enviar sin documento", "Invia senza documento", "書類なしで送る", "Ohne Dokument senden", "إرسال بدون مستند", "不带文件发送", "Versturen zonder document", "Enviar sem documento", "Skicka utan dokument", "Отправить без документа", "Wyślij bez dokumentu", "문서 없이 보내기", "ارسال بدون سند"],
"Réponds-lui, corrige-le ou pose-lui une question": ["Answer it, correct it or ask it a question", "Respóndele, corrígelo o hazle una pregunta", "Rispondigli, correggilo o fagli una domanda", "答える、訂正する、質問する", "Antworte, korrigiere oder stell eine Frage", "أجبه أو صحّحه أو اطرح عليه سؤالًا", "回答、纠正或向它提问", "Antwoord, verbeter of stel een vraag", "Responde-lhe, corrige-o ou faz-lhe uma pergunta", "Svara, rätta eller ställ en fråga", "Ответь, поправь или задай вопрос", "Odpowiedz, popraw albo zadaj pytanie", "답하거나 고치거나 질문해요", "جواب بده، اصلاحش کن یا سؤالی بپرس"],
"Envoyer": ["Send", "Enviar", "Invia", "送信", "Senden", "إرسال", "发送", "Versturen", "Enviar", "Skicka", "Отправить", "Wyślij", "보내기", "ارسال"],
"Document": ["Document", "Documento", "Documento", "書類", "Dokument", "مستند", "文件", "Document", "Documento", "Dokument", "Документ", "Dokument", "문서", "سند"],

"Touche le micro du clavier pour parler.": ["Tap the keyboard mic to speak.", "Toca el micrófono del teclado para hablar.", "Tocca il microfono della tastiera per parlare.", "キーボードのマイクをタップして話してね。", "Tippe auf das Mikrofon der Tastatur, um zu sprechen.", "المس ميكروفون لوحة المفاتيح للتحدث.", "点按键盘上的麦克风说话。", "Tik op de microfoon van het toetsenbord om te praten.", "Toca no microfone do teclado para falar.", "Tryck på tangentbordets mikrofon för att prata.", "Нажми на микрофон клавиатуры, чтобы говорить.", "Dotknij mikrofonu klawiatury, aby mówić.", "키보드 마이크를 눌러 말해요.", "برای صحبت، میکروفون صفحه‌کلید را لمس کن."],
"Parler": ["Speak", "Hablar", "Parla", "話す", "Sprechen", "تحدّث", "说话", "Praten", "Falar", "Prata", "Говорить", "Mów", "말하기", "صحبت کن"],
"J’écoute…": ["Listening…", "Te escucho…", "Ti ascolto…", "聞いています…", "Ich höre zu…", "أستمع…", "正在听……", "Ik luister…", "Estou a ouvir…", "Jag lyssnar…", "Слушаю…", "Słucham…", "듣고 있어요…", "گوش می‌دهم…"],
"Sans document : enregistre ça": ["No document: save this", "Sin documento: guarda esto", "Senza documento: salva questo", "書類なし：これを保存", "Ohne Dokument: speichere das", "بدون مستند: احفظ هذا", "无文件：保存这个", "Zonder document: sla dit op", "Sem documento: guarda isto", "Utan dokument: spara det här", "Без документа: сохрани это", "Bez dokumentu: zapisz to", "문서 없이: 이걸 저장해", "بدون سند: این را ثبت کن"],
"dis-moi ce que tu veux enregistrer, ou donne un document": ["tell me what you want to save, or give a document", "dime qué quieres guardar o dame un documento", "dimmi cosa vuoi salvare o dammi un documento", "保存したいことを話すか、書類を渡してね", "sag mir, was du speichern willst, oder gib ein Dokument", "قل لي ما تريد حفظه أو أعطني مستندًا", "告诉我你想保存什么，或者给我一份文件", "zeg wat je wilt opslaan of geef een document", "diz-me o que queres guardar ou dá-me um documento", "säg vad du vill spara eller ge ett dokument", "скажи, что сохранить, или дай документ", "powiedz, co zapisać, albo daj dokument", "저장할 내용을 말하거나 문서를 줘요", "بگو چه چیزی ثبت شود یا یک سند بده"],
"Les horaires à enregistrer": ["Times to save", "Horarios que guardar", "Orari da salvare", "保存する時間", "Zu speichernde Zeiten", "المواعيد المطلوب حفظها", "要保存的时间", "Te bewaren tijden", "Horários a guardar", "Tider att spara", "Время для сохранения", "Godziny do zapisania", "저장할 시간", "ساعت‌هایی که ثبت می‌شوند"],
"Départ": ["Departure", "Salida", "Partenza", "出発", "Abfahrt", "المغادرة", "出发", "Vertrek", "Partida", "Avfärd", "Отъезд", "Wyjazd", "출발", "حرکت"],
"Embarquement": ["Loading", "Embarque", "Imbarco", "積み込み", "Verladen", "التحميل", "装车", "Inladen", "Embarque", "Lastning", "Погрузка", "Załadunek", "상차", "بارگیری"],
"Reco": ["Course walk", "Reconocimiento", "Ricognizione", "下見", "Parcoursbesichtigung", "المعاينة", "看场", "Verkenning", "Reconhecimento", "Banvandring", "Просмотр", "Zapoznanie", "코스 답사", "بازدید مسیر"],
"Début": ["Start", "Inicio", "Inizio", "開始", "Beginn", "البداية", "开始", "Start", "Início", "Start", "Начало", "Start", "시작", "شروع"],
"Autre": ["Other", "Otro", "Altro", "その他", "Andere", "أخرى", "其他", "Andere", "Outro", "Annat", "Другое", "Inne", "기타", "دیگر"],
"Enregistrer les horaires": ["Save the times", "Guardar los horarios", "Salva gli orari", "時間を保存", "Zeiten speichern", "حفظ المواعيد", "保存时间", "Tijden opslaan", "Guardar os horários", "Spara tiderna", "Сохранить время", "Zapisz godziny", "시간 저장", "ثبت ساعت‌ها"],
"✓ Horaires enregistrés dans la fiche du concours.": ["✓ Times saved on the show page.", "✓ Horarios guardados en la ficha del concurso.", "✓ Orari salvati nella scheda del concorso.", "✓ 大会ページに時間を保存しました。", "✓ Zeiten auf der Turnierseite gespeichert.", "✓ حُفظت المواعيد في صفحة المسابقة.", "✓ 时间已保存到比赛页面。", "✓ Tijden opgeslagen op de wedstrijdpagina.", "✓ Horários guardados na ficha do concurso.", "✓ Tiderna sparade på tävlingssidan.", "✓ Время сохранено на странице соревнования.", "✓ Godziny zapisano na stronie zawodów.", "✓ 대회 페이지에 시간을 저장했어요.", "✓ ساعت‌ها در صفحه مسابقه ثبت شد."],
"Pas enregistré : ": ["Not saved: ", "No guardado: ", "Non salvato: ", "保存できませんでした：", "Nicht gespeichert: ", "لم يُحفظ: ", "未保存：", "Niet opgeslagen: ", "Não guardado: ", "Inte sparat: ", "Не сохранено: ", "Nie zapisano: ", "저장하지 못했어요: ", "ثبت نشد: "],
"les horaires d'un concours": ["show times", "los horarios de un concurso", "gli orari di un concorso", "大会の時間", "Turnierzeiten", "مواعيد مسابقة", "比赛时间", "wedstrijdtijden", "os horários de um concurso", "tävlingstider", "время соревнования", "godziny zawodów", "대회 시간", "ساعت‌های یک مسابقه"],

"✓ Fiche du cheval complétée : ": ["✓ Horse profile completed: ", "✓ Ficha del caballo completada: ", "✓ Scheda del cavallo completata: ", "✓ 馬のプロフィールを補完：", "✓ Pferdeprofil ergänzt: ", "✓ اكتملت بطاقة الحصان: ", "✓ 马匹资料已补全：", "✓ Paardenprofiel aangevuld: ", "✓ Ficha do cavalo completada: ", "✓ Hästens profil kompletterad: ", "✓ Карточка лошади дополнена: ", "✓ Profil konia uzupełniony: ", "✓ 말 프로필 보완: ", "✓ کارت اسب کامل شد: "],
"Compléter la fiche du cheval": ["Complete the horse profile", "Completar la ficha del caballo", "Completa la scheda del cavallo", "馬のプロフィールを補完", "Pferdeprofil ergänzen", "إكمال بطاقة الحصان", "补全马匹资料", "Paardenprofiel aanvullen", "Completar a ficha do cavalo", "Komplettera hästens profil", "Дополнить карточку лошади", "Uzupełnij profil konia", "말 프로필 채우기", "کامل کردن کارت اسب"],
"Choisis d’abord le cheval ci-dessous.": ["First choose the horse below.", "Primero elige el caballo abajo.", "Prima scegli il cavallo qui sotto.", "まず下で馬を選んでね。", "Wähle zuerst unten das Pferd.", "اختر الحصان أدناه أولًا.", "请先在下方选择马匹。", "Kies eerst hieronder het paard.", "Escolhe primeiro o cavalo abaixo.", "Välj först hästen nedan.", "Сначала выбери лошадь ниже.", "Najpierw wybierz konia poniżej.", "먼저 아래에서 말을 골라 줘요.", "اول اسب را در پایین انتخاب کن."],
"✓ déjà sur la fiche": ["✓ already on the profile", "✓ ya en la ficha", "✓ già sulla scheda", "✓ プロフィールに記載済み", "✓ schon im Profil", "✓ موجود في البطاقة", "✓ 资料中已有", "✓ staat al op het profiel", "✓ já na ficha", "✓ finns redan i profilen", "✓ уже в карточке", "✓ już w profilu", "✓ 이미 프로필에 있음", "✓ از قبل در کارت هست"],
"Différent de la fiche : ": ["Different from the profile: ", "Distinto de la ficha: ", "Diverso dalla scheda: ", "プロフィールと異なる：", "Anders als im Profil: ", "مختلف عن البطاقة: ", "与资料不同：", "Anders dan het profiel: ", "Diferente da ficha: ", "Skiljer sig från profilen: ", "Отличается от карточки: ", "Inne niż w profilu: ", "프로필과 다름: ", "با کارت فرق دارد: "],
" — coche pour remplacer": [" — tick to replace", " — marca para reemplazar", " — spunta per sostituire", " — チェックで置き換え", " — anhaken zum Ersetzen", " — حدّد للاستبدال", " — 勾选以替换", " — vink aan om te vervangen", " — assinala para substituir", " — markera för att ersätta", " — отметь, чтобы заменить", " — zaznacz, aby zastąpić", " — 체크하면 바꿔요", " — برای جایگزینی علامت بزن"],
"Écris le nom du cheval.": ["Write the horse's name.", "Escribe el nombre del caballo.", "Scrivi il nome del cavallo.", "馬の名前を書いてね。", "Schreib den Namen des Pferdes.", "اكتب اسم الحصان.", "写下马的名字。", "Schrijf de naam van het paard.", "Escreve o nome do cavalo.", "Skriv hästens namn.", "Напиши имя лошади.", "Wpisz imię konia.", "말 이름을 적어 줘.", "نام اسب را بنویس."],
"Indique la date.": ["Enter the date.", "Indica la fecha.", "Indica la data.", "日付を入れてね。", "Gib das Datum an.", "أدخل التاريخ.", "填写日期。", "Vul de datum in.", "Indica a data.", "Ange datumet.", "Укажи дату.", "Podaj datę.", "날짜를 입력해 줘.", "تاریخ را وارد کن."],
"Le retour ne peut pas être avant le départ.": ["The return can't be before the departure.", "La vuelta no puede ser antes de la salida.", "Il ritorno non può essere prima della partenza.", "戻りは出発より前にはできません。", "Die Rückkehr kann nicht vor der Abreise liegen.", "لا يمكن أن تكون العودة قبل المغادرة.", "返回日期不能早于离开日期。", "De terugkeer kan niet vóór het vertrek zijn.", "O regresso não pode ser antes da partida.", "Återkomsten kan inte vara före avresan.", "Возвращение не может быть раньше отъезда.", "Powrót nie może być przed wyjazdem.", "복귀일은 출발일보다 앞설 수 없어.", "بازگشت نمی‌تواند پیش از رفتن باشد."],
"rattache-toi d’abord à une écurie depuis ton profil": ["first link yourself to a yard from your profile", "primero vincúlate a una cuadra desde tu perfil", "prima collegati a una scuderia dal tuo profilo", "まずプロフィールから厩舎に所属してね", "verknüpfe dich zuerst in deinem Profil mit einem Stall", "اربط نفسك أولًا بإسطبل من ملفك الشخصي", "请先在个人资料中关联一个马场", "koppel jezelf eerst aan een stal via je profiel", "liga-te primeiro a uma coudelaria a partir do teu perfil", "koppla dig först till ett stall i din profil", "сначала привяжись к конюшне в своём профиле", "najpierw przypisz się do stajni w swoim profilu", "먼저 프로필에서 마구간에 연결해 줘", "اول از پروفایلت به یک اصطبل وصل شو"],
"création indisponible": ["creation unavailable", "creación no disponible", "creazione non disponibile", "作成できません", "Erstellen nicht verfügbar", "الإنشاء غير متاح", "无法创建", "aanmaken niet beschikbaar", "criação indisponível", "skapande inte tillgängligt", "создание недоступно", "tworzenie niedostępne", "생성할 수 없음", "ساختن در دسترس نیست"],
"✓ Fiche de ": ["✓ Profile of ", "✓ Ficha de ", "✓ Scheda di ", "✓ ", "✓ Profil von ", "✓ تم إنشاء بطاقة ", "✓ 已在 Hype 中创建 ", "✓ Profiel van ", "✓ Ficha de ", "✓ Profil för ", "✓ Карточка ", "✓ Profil konia ", "✓ ", "✓ کارت "],
" créée dans Hype.": [" created in Hype.", " creada en Hype.", " creata in Hype.", " のプロフィールをHypeに作成しました。", " in Hype erstellt.", " في Hype.", " 的资料。", " aangemaakt in Hype.", " criada no Hype.", " skapad i Hype.", " создана в Hype.", " utworzony w Hype.", " 프로필을 Hype에 만들었어.", " در Hype ساخته شد."],
"ce cheval n’est rattaché à aucune écurie": ["this horse isn't linked to any yard", "este caballo no está vinculado a ninguna cuadra", "questo cavallo non è collegato a nessuna scuderia", "この馬はどの厩舎にも所属していません", "dieses Pferd ist keinem Stall zugeordnet", "هذا الحصان غير مرتبط بأي إسطبل", "这匹马没有关联任何马场", "dit paard is aan geen enkele stal gekoppeld", "este cavalo não está ligado a nenhuma coudelaria", "den här hästen är inte kopplad till något stall", "эта лошадь не привязана ни к одной конюшне", "ten koń nie jest przypisany do żadnej stajni", "이 말은 어느 마구간에도 연결되어 있지 않아", "این اسب به هیچ اصطبلی وصل نیست"],
"Le document est rangé dans la page Santé du cheval.": ["The document is filed on the horse's Health page.", "El documento está guardado en la página Salud del caballo.", "Il documento è archiviato nella pagina Salute del cavallo.", "書類は馬の健康ページに保存しました。", "Das Dokument ist auf der Gesundheitsseite des Pferdes abgelegt.", "تم حفظ المستند في صفحة صحة الحصان.", "文件已存入马的健康页面。", "Het document staat op de gezondheidspagina van het paard.", "O documento está guardado na página Saúde do cavalo.", "Dokumentet är sparat på hästens hälsosida.", "Документ сохранён на странице здоровья лошади.", "Dokument jest zapisany na stronie Zdrowie konia.", "서류는 말의 건강 페이지에 정리해 두었어.", "سند در صفحهٔ سلامت اسب گذاشته شد."],
"✓ Inscrit au registre des chevaux de l’écurie.": ["✓ Added to the yard's horse register.", "✓ Inscrito en el registro de caballos de la cuadra.", "✓ Registrato nel registro dei cavalli della scuderia.", "✓ 厩舎の馬台帳に登録しました。", "✓ Im Pferderegister des Stalls eingetragen.", "✓ تم التسجيل في سجل خيول الإسطبل.", "✓ 已登记到马场的马匹登记簿。", "✓ Ingeschreven in het paardenregister van de stal.", "✓ Inscrito no registo de cavalos da coudelaria.", "✓ Inskriven i stallets hästregister.", "✓ Внесено в реестр лошадей конюшни.", "✓ Wpisano do rejestru koni stajni.", "✓ 마구간 말 등록부에 기록했어.", "✓ در دفتر ثبت اسب‌های اصطبل ثبت شد."],
"Pense à le déclarer aussi sur ton espace IFCE (Gestion des mouvements des équidés), si tu l’utilises.": ["Remember to declare it in your IFCE account too (equine movement management), if you use it.", "Recuerda declararlo también en tu espacio IFCE (gestión de movimientos de équidos), si lo usas.", "Ricorda di dichiararlo anche nel tuo spazio IFCE (gestione dei movimenti degli equidi), se lo usi.", "IFCEのアカウント（馬の移動管理）を使っているなら、そちらにも届け出てね。", "Denk daran, es auch in deinem IFCE-Bereich (Verwaltung der Pferdebewegungen) zu melden, falls du ihn nutzt.", "تذكّر أن تصرّح به أيضًا في حسابك على IFCE (إدارة تنقلات الخيول) إن كنت تستخدمه.", "如果你使用 IFCE 账户（马匹移动管理），记得也在那里申报。", "Vergeet het niet ook in je IFCE-account (beheer van paardenbewegingen) te melden, als je die gebruikt.", "Lembra-te de o declarar também no teu espaço IFCE (gestão dos movimentos dos equídeos), se o usares.", "Kom ihåg att även anmäla det i ditt IFCE-konto (hantering av hästförflyttningar), om du använder det.", "Не забудь отметить это и в своём кабинете IFCE (учёт перемещений лошадей), если ты им пользуешься.", "Pamiętaj, aby zgłosić to też na swoim koncie IFCE (zarządzanie przemieszczaniem koni), jeśli z niego korzystasz.", "IFCE 계정(말 이동 관리)을 쓰고 있다면 거기에도 신고하는 걸 잊지 마.", "اگر از حساب IFCE (مدیریت جابه‌جایی اسب‌ها) استفاده می‌کنی، آنجا هم ثبتش کن."],
"Registre des chevaux": ["Horse register", "Registro de caballos", "Registro dei cavalli", "馬台帳", "Pferderegister", "سجل الخيول", "马匹登记簿", "Paardenregister", "Registo de cavalos", "Hästregister", "Реестр лошадей", "Rejestr koni", "말 등록부", "دفتر ثبت اسب‌ها"],
"Arrivée à l’écurie": ["Arrival at the yard", "Llegada a la cuadra", "Arrivo in scuderia", "厩舎への到着", "Ankunft im Stall", "الوصول إلى الإسطبل", "到达马场", "Aankomst op stal", "Chegada à coudelaria", "Ankomst till stallet", "Прибытие в конюшню", "Przybycie do stajni", "마구간 도착", "ورود به اصطبل"],
"Départ définitif": ["Permanent departure", "Salida definitiva", "Partenza definitiva", "完全な退厩", "Endgültiger Abgang", "مغادرة نهائية", "永久离开", "Definitief vertrek", "Saída definitiva", "Slutlig avresa", "Окончательный отъезд", "Wyjazd na stałe", "영구 퇴거", "خروج قطعی"],
"Sortie provisoire (concours, stage, vétérinaire…)": ["Temporary outing (show, clinic, vet…)", "Salida provisional (concurso, cursillo, veterinario…)", "Uscita temporanea (concorso, stage, veterinario…)", "一時的な外出（競技会・研修・獣医…）", "Vorübergehender Ausflug (Turnier, Lehrgang, Tierarzt…)", "خروج مؤقت (مسابقة، تدريب، طبيب بيطري…)", "临时外出（比赛、培训、兽医…）", "Tijdelijk vertrek (wedstrijd, clinic, dierenarts…)", "Saída provisória (concurso, estágio, veterinário…)", "Tillfällig utflykt (tävling, kurs, veterinär…)", "Временный выезд (соревнования, сборы, ветеринар…)", "Wyjazd tymczasowy (zawody, obóz, weterynarz…)", "임시 외출(대회, 연수, 수의사…)", "خروج موقت (مسابقه، دوره، دامپزشک…)"],
"Cheval": ["Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말", "اسب"],
"＋ Nouveau cheval : je crée sa fiche": ["＋ New horse: I'll create its profile", "＋ Caballo nuevo: creo su ficha", "＋ Nuovo cavallo: creo la sua scheda", "＋ 新しい馬：プロフィールを作成します", "＋ Neues Pferd: ich lege sein Profil an", "＋ حصان جديد: سأنشئ بطاقته", "＋ 新马：我来创建资料", "＋ Nieuw paard: ik maak zijn profiel aan", "＋ Cavalo novo: crio a ficha dele", "＋ Ny häst: jag skapar dess profil", "＋ Новая лошадь: создам карточку", "＋ Nowy koń: utworzę jego profil", "＋ 새 말: 프로필을 만들게", "＋ اسب تازه: کارتش را می‌سازم"],
"Nom du cheval": ["Horse's name", "Nombre del caballo", "Nome del cavallo", "馬の名前", "Name des Pferdes", "اسم الحصان", "马的名字", "Naam van het paard", "Nome do cavalo", "Hästens namn", "Имя лошади", "Imię konia", "말 이름", "نام اسب"],
"Son nom, comme sur ses papiers": ["Its name, as on its papers", "Su nombre, como en sus papeles", "Il suo nome, come sui documenti", "書類どおりの名前", "Sein Name wie in den Papieren", "اسمه كما في أوراقه", "按证件上的名字", "Zijn naam, zoals op zijn papieren", "O nome, como nos papéis", "Namnet, som i pappren", "Имя, как в документах", "Imię, jak w dokumentach", "서류에 적힌 그대로의 이름", "نامش، همان‌طور که در مدارکش است"],
"Écurie": ["Yard", "Cuadra", "Scuderia", "厩舎", "Stall", "الإسطبل", "马场", "Stal", "Coudelaria", "Stall", "Конюшня", "Stajnia", "마구간", "اصطبل"],
"Tu pourras compléter sa fiche ensuite (photo, papiers…).": ["You can complete its profile later (photo, papers…).", "Podrás completar su ficha después (foto, papeles…).", "Potrai completare la sua scheda dopo (foto, documenti…).", "プロフィールはあとで追加できます（写真、書類…）。", "Du kannst sein Profil später ergänzen (Foto, Papiere…).", "يمكنك إكمال بطاقته لاحقًا (صورة، أوراق…).", "之后可以补充资料（照片、证件…）。", "Je kunt zijn profiel later aanvullen (foto, papieren…).", "Podes completar a ficha depois (foto, papéis…).", "Du kan fylla i profilen senare (foto, papper…).", "Карточку можно дополнить потом (фото, документы…).", "Profil możesz uzupełnić później (zdjęcie, dokumenty…).", "프로필은 나중에 채워도 돼(사진, 서류…).", "بعدًا می‌توانی کارتش را کامل کنی (عکس، مدارک…)."],
"Le cheval doit déjà avoir sa fiche dans Hype.": ["The horse must already have its profile in Hype.", "El caballo ya debe tener su ficha en Hype.", "Il cavallo deve già avere la sua scheda in Hype.", "馬はすでにHypeにプロフィールがある必要があります。", "Das Pferd muss schon ein Profil in Hype haben.", "يجب أن تكون للحصان بطاقة في Hype مسبقًا.", "这匹马必须已经在 Hype 中有资料。", "Het paard moet al een profiel in Hype hebben.", "O cavalo já tem de ter ficha no Hype.", "Hästen måste redan ha en profil i Hype.", "У лошади уже должна быть карточка в Hype.", "Koń musi już mieć profil w Hype.", "말은 이미 Hype에 프로필이 있어야 해.", "اسب باید از قبل در Hype کارت داشته باشد."],
"Arrivé le": ["Arrived on", "Llegó el", "Arrivato il", "到着日", "Angekommen am", "وصل في", "到达日期", "Aangekomen op", "Chegou a", "Kom den", "Прибыл", "Przybył", "도착일", "تاریخ ورود"],
"Parti le": ["Left on", "Salió el", "Partito il", "出発日", "Abgereist am", "غادر في", "离开日期", "Vertrokken op", "Saiu a", "Lämnade den", "Уехал", "Wyjechał", "출발일", "تاریخ خروج"],
"Retour le": ["Back on", "Vuelve el", "Ritorno il", "戻り日", "Zurück am", "يعود في", "返回日期", "Terug op", "Regressa a", "Tillbaka den", "Возвращение", "Powrót", "복귀일", "تاریخ بازگشت"],
"Venant de": ["Coming from", "Procedente de", "Proveniente da", "出発元", "Herkunft", "قادم من", "来自", "Afkomstig van", "Vindo de", "Kommer från", "Откуда", "Skąd", "출처", "از"],
"Destination": ["Destination", "Destino", "Destinazione", "行き先", "Ziel", "الوجهة", "目的地", "Bestemming", "Destino", "Destination", "Куда", "Dokąd", "목적지", "مقصد"],
"Adresse ou élevage d’origine": ["Address or breeder of origin", "Dirección o yeguada de origen", "Indirizzo o allevamento d'origine", "住所または出身牧場", "Adresse oder Herkunftszucht", "العنوان أو مزرعة المنشأ", "地址或原繁育场", "Adres of fokkerij van herkomst", "Morada ou criação de origem", "Adress eller ursprungsuppfödning", "Адрес или конезавод происхождения", "Adres lub hodowla pochodzenia", "주소 또는 출신 목장", "نشانی یا پرورشگاه مبدأ"],
"Adresse ou écurie de destination": ["Address or yard of destination", "Dirección o cuadra de destino", "Indirizzo o scuderia di destinazione", "住所または行き先の厩舎", "Adresse oder Zielstall", "العنوان أو إسطبل الوجهة", "地址或目的马场", "Adres of stal van bestemming", "Morada ou coudelaria de destino", "Adress eller stall dit hästen ska", "Адрес или конюшня назначения", "Adres lub stajnia docelowa", "주소 또는 목적지 마구간", "نشانی یا اصطبل مقصد"],
"Motif": ["Reason", "Motivo", "Motivo", "理由", "Grund", "السبب", "原因", "Reden", "Motivo", "Orsak", "Причина", "Powód", "사유", "علت"],
"Achat, prêt, pension, naissance…": ["Purchase, loan, livery, birth…", "Compra, préstamo, pupilaje, nacimiento…", "Acquisto, prestito, pensione, nascita…", "購入、貸与、預託、誕生…", "Kauf, Leihe, Pension, Geburt…", "شراء، إعارة، إيواء، ولادة…", "购买、借用、寄养、出生…", "Aankoop, lease, pension, geboorte…", "Compra, empréstimo, pensão, nascimento…", "Köp, lån, inackordering, födsel…", "Покупка, аренда, постой, рождение…", "Zakup, dzierżawa, pensjonat, narodziny…", "구입, 대여, 위탁, 출생…", "خرید، امانت، نگهداری، تولد…"],
"Vente, prêt, retour propriétaire, retraite…": ["Sale, loan, back to owner, retirement…", "Venta, préstamo, vuelta al propietario, jubilación…", "Vendita, prestito, ritorno al proprietario, pensionamento…", "売却、貸与、馬主へ返却、引退…", "Verkauf, Leihe, zurück zum Besitzer, Ruhestand…", "بيع، إعارة، عودة إلى المالك، تقاعد…", "出售、借出、归还马主、退役…", "Verkoop, lease, terug naar eigenaar, pensioen…", "Venda, empréstimo, regresso ao proprietário, reforma…", "Försäljning, lån, tillbaka till ägaren, pension…", "Продажа, аренда, возврат владельцу, пенсия…", "Sprzedaż, dzierżawa, powrót do właściciela, emerytura…", "매각, 대여, 마주에게 반환, 은퇴…", "فروش، امانت، بازگشت به مالک، بازنشستگی…"],
"Concours, stage, vétérinaire…": ["Show, clinic, vet…", "Concurso, cursillo, veterinario…", "Concorso, stage, veterinario…", "競技会、研修、獣医…", "Turnier, Lehrgang, Tierarzt…", "مسابقة، تدريب، طبيب بيطري…", "比赛、培训、兽医…", "Wedstrijd, clinic, dierenarts…", "Concurso, estágio, veterinário…", "Tävling, kurs, veterinär…", "Соревнования, сборы, ветеринар…", "Zawody, obóz, weterynarz…", "대회, 연수, 수의사…", "مسابقه، دوره، دامپزشک…"],
"Créer sa fiche et l’inscrire": ["Create its profile and register it", "Crear su ficha e inscribirlo", "Crea la scheda e registralo", "プロフィールを作って登録", "Profil anlegen und eintragen", "إنشاء بطاقته وتسجيله", "创建资料并登记", "Profiel aanmaken en inschrijven", "Criar a ficha e inscrevê-lo", "Skapa profil och skriv in", "Создать карточку и внести", "Utwórz profil i wpisz", "프로필 만들고 기록하기", "کارتش را بساز و ثبتش کن"],
"Inscrire au registre": ["Add to the register", "Inscribir en el registro", "Registra nel registro", "台帳に登録", "Ins Register eintragen", "تسجيل في السجل", "登记到登记簿", "Inschrijven in het register", "Inscrever no registo", "Skriv in i registret", "Внести в реестр", "Wpisz do rejestru", "등록부에 기록", "ثبت در دفتر"],
"✓ déjà au registre": ["✓ already in the register", "✓ ya en el registro", "✓ già nel registro", "✓ すでに台帳にあり", "✓ schon im Register", "✓ موجود في السجل", "✓ 已在登记簿中", "✓ al in het register", "✓ já no registo", "✓ redan i registret", "✓ уже в реестре", "✓ już w rejestrze", "✓ 이미 등록부에 있음", "✓ از قبل در دفتر ثبت"],
"l'arrivée ou le départ d'un cheval": ["a horse's arrival or departure", "la llegada o salida de un caballo", "l'arrivo o la partenza di un cavallo", "馬の到着または退厩", "die Ankunft oder der Abgang eines Pferdes", "وصول حصان أو مغادرته", "马匹的到达或离开", "de aankomst of het vertrek van een paard", "a chegada ou saída de um cavalo", "en hästs ankomst eller avresa", "прибытие или отъезд лошади", "przybycie lub wyjazd konia", "말의 도착 또는 퇴거", "ورود یا خروج یک اسب"],
"des chevaux à ajouter dans Hype": ["horses to add to Hype", "caballos para añadir a Hype", "cavalli da aggiungere a Hype", "Hypeに追加する馬", "Pferde, die in Hype hinzugefügt werden sollen", "خيول لإضافتها إلى Hype", "要添加到 Hype 的马", "paarden om toe te voegen aan Hype", "cavalos a adicionar ao Hype", "hästar att lägga till i Hype", "лошади, которых нужно добавить в Hype", "konie do dodania w Hype", "Hype에 추가할 말들", "اسب‌هایی برای افزودن به Hype"],
"ces chevaux ont déjà leur fiche": ["these horses already have a profile", "estos caballos ya tienen ficha", "questi cavalli hanno già una scheda", "これらの馬はすでにプロフィールがあります", "diese Pferde haben schon ein Profil", "هذه الخيول لديها بطاقات بالفعل", "这些马已经有资料了", "deze paarden hebben al een profiel", "estes cavalos já têm ficha", "dessa hästar har redan en profil", "у этих лошадей уже есть карточки", "te konie mają już profil", "이 말들은 이미 프로필이 있어", "این اسب‌ها از قبل کارت دارند"],
"✓ Fiches créées : ": ["✓ Profiles created: ", "✓ Fichas creadas: ", "✓ Schede create: ", "✓ 作成したプロフィール：", "✓ Erstellte Profile: ", "✓ البطاقات المنشأة: ", "✓ 已创建资料：", "✓ Aangemaakte profielen: ", "✓ Fichas criadas: ", "✓ Skapade profiler: ", "✓ Создано карточек: ", "✓ Utworzone profile: ", "✓ 만든 프로필: ", "✓ کارت‌های ساخته‌شده: "],
"Reliées aux engagements du concours : ": ["Linked to the show entries: ", "Vinculadas a las inscripciones del concurso: ", "Collegate alle iscrizioni del concorso: ", "競技会のエントリーと紐付け：", "Mit den Turniernennungen verknüpft: ", "مرتبطة بتسجيلات المسابقة: ", "已关联到比赛报名：", "Gekoppeld aan de inschrijvingen: ", "Ligadas às inscrições do concurso: ", "Kopplade till tävlingsanmälningarna: ", "Привязано к заявкам на соревнования: ", "Powiązane ze zgłoszeniami na zawody: ", "대회 참가 신청과 연결: ", "وصل‌شده به ثبت‌نام‌های مسابقه: "],
"Tu les retrouves dans les chevaux de l’écurie, prêtes à compléter.": ["You'll find them among the yard's horses, ready to complete.", "Las encontrarás en los caballos de la cuadra, listas para completar.", "Le trovi tra i cavalli della scuderia, pronte da completare.", "厩舎の馬一覧にあり、すぐに追記できます。", "Du findest sie bei den Pferden des Stalls, bereit zum Ergänzen.", "تجدها ضمن خيول الإسطبل، جاهزة للإكمال.", "你可以在马场的马匹中找到它们，随时补充。", "Je vindt ze bij de paarden van de stal, klaar om aan te vullen.", "Encontras-as nos cavalos da coudelaria, prontas a completar.", "Du hittar dem bland stallets hästar, redo att fyllas i.", "Они в списке лошадей конюшни, их можно дополнить.", "Znajdziesz je wśród koni stajni, gotowe do uzupełnienia.", "마구간의 말 목록에서 바로 채울 수 있어.", "آن‌ها را در اسب‌های اصطبل پیدا می‌کنی، آمادهٔ تکمیل."],
"Pas créées : ": ["Not created: ", "No creadas: ", "Non create: ", "作成できませんでした：", "Nicht erstellt: ", "لم تُنشأ: ", "未创建：", "Niet aangemaakt: ", "Não criadas: ", "Inte skapade: ", "Не созданы: ", "Nie utworzono: ", "만들지 못함: ", "ساخته نشد: "],
"Chevaux sans fiche": ["Horses without a profile", "Caballos sin ficha", "Cavalli senza scheda", "プロフィールのない馬", "Pferde ohne Profil", "خيول بلا بطاقة", "没有资料的马", "Paarden zonder profiel", "Cavalos sem ficha", "Hästar utan profil", "Лошади без карточки", "Konie bez profilu", "프로필이 없는 말", "اسب‌های بدون کارت"],
"de ces chevaux n’ont pas encore leur fiche dans Hype.": ["of these horses don't have a profile in Hype yet.", "de estos caballos aún no tienen ficha en Hype.", "di questi cavalli non hanno ancora una scheda in Hype.", "頭の馬がまだHypeにプロフィールがありません。", "dieser Pferde haben noch kein Profil in Hype.", "من هذه الخيول ليست لها بطاقة في Hype بعد.", "匹马在 Hype 中还没有资料。", "van deze paarden hebben nog geen profiel in Hype.", "destes cavalos ainda não têm ficha no Hype.", "av dessa hästar har ännu ingen profil i Hype.", "из этих лошадей ещё нет карточки в Hype.", "z tych koni nie ma jeszcze profilu w Hype.", "마리는 아직 Hype에 프로필이 없어.", "تا از این اسب‌ها هنوز در Hype کارت ندارند."],
"Ce cheval n’a pas encore sa fiche dans Hype.": ["This horse doesn't have a profile in Hype yet.", "Este caballo aún no tiene ficha en Hype.", "Questo cavallo non ha ancora una scheda in Hype.", "この馬はまだHypeにプロフィールがありません。", "Dieses Pferd hat noch kein Profil in Hype.", "هذا الحصان ليست له بطاقة في Hype بعد.", "这匹马在 Hype 中还没有资料。", "Dit paard heeft nog geen profiel in Hype.", "Este cavalo ainda não tem ficha no Hype.", "Den här hästen har ännu ingen profil i Hype.", "У этой лошади ещё нет карточки в Hype.", "Ten koń nie ma jeszcze profilu w Hype.", "이 말은 아직 Hype에 프로필이 없어.", "این اسب هنوز در Hype کارت ندارد."],
"Tu m’autorises à les créer ? Tu pourras ensuite y accéder et les modifier.": ["May I create them? You'll then be able to open and edit them.", "¿Me autorizas a crearlas? Luego podrás abrirlas y modificarlas.", "Mi autorizzi a crearle? Poi potrai aprirle e modificarle.", "作成してもいい？そのあと開いて編集できます。", "Darf ich sie anlegen? Danach kannst du sie öffnen und bearbeiten.", "هل تسمح لي بإنشائها؟ ستتمكن بعدها من فتحها وتعديلها.", "允许我创建吗？之后你就能打开并修改它们。", "Mag ik ze aanmaken? Daarna kun je ze openen en aanpassen.", "Autorizas-me a criá-las? Depois poderás abri-las e alterá-las.", "Får jag skapa dem? Sedan kan du öppna och ändra dem.", "Можно их создать? Потом ты сможешь открыть и изменить их.", "Mogę je utworzyć? Potem będziesz mógł je otworzyć i zmienić.", "만들어도 될까? 그다음 열어서 수정할 수 있어.", "اجازه می‌دهی بسازمشان؟ بعد می‌توانی بازشان کنی و تغییرشان دهی."],
"Créer les ": ["Create the ", "Crear las ", "Crea le ", "", "Die ", "إنشاء ", "创建 ", "Maak de ", "Criar as ", "Skapa de ", "Создать ", "Utwórz ", "", "ساختن "],
" fiches": [" profiles", " fichas", " schede", " 件のプロフィールを作成", " Profile anlegen", " بطاقات", " 份资料", " profielen aan", " fichas", " profilerna", " карточек", " profili", " 개 프로필 만들기", " کارت"],
"Créer la fiche": ["Create the profile", "Crear la ficha", "Crea la scheda", "プロフィールを作成", "Profil anlegen", "إنشاء البطاقة", "创建资料", "Profiel aanmaken", "Criar a ficha", "Skapa profilen", "Создать карточку", "Utwórz profil", "프로필 만들기", "ساختن کارت"],
"Tous ces chevaux ont déjà leur fiche dans Hype.": ["All these horses already have a profile in Hype.", "Todos estos caballos ya tienen ficha en Hype.", "Tutti questi cavalli hanno già una scheda in Hype.", "これらの馬はすべてHypeにプロフィールがあります。", "Alle diese Pferde haben schon ein Profil in Hype.", "كل هذه الخيول لديها بطاقات في Hype بالفعل.", "这些马在 Hype 中都已有资料。", "Al deze paarden hebben al een profiel in Hype.", "Todos estes cavalos já têm ficha no Hype.", "Alla dessa hästar har redan en profil i Hype.", "У всех этих лошадей уже есть карточки в Hype.", "Wszystkie te konie mają już profil w Hype.", "이 말들은 모두 이미 Hype에 프로필이 있어.", "همهٔ این اسب‌ها از قبل در Hype کارت دارند."],
"Nom": ["Name", "Nombre", "Nome", "名前", "Name", "الاسم", "名字", "Naam", "Nome", "Namn", "Имя", "Imię", "이름", "نام"],
" (nom : tu n’as pas le droit de le changer)": [" (name: you're not allowed to change it)", " (nombre: no tienes permiso para cambiarlo)", " (nome: non hai il diritto di cambiarlo)", "（名前：変更する権限がありません）", " (Name: du darfst ihn nicht ändern)", " (الاسم: لا يحق لك تغييره)", "（名字：你无权修改）", " (naam: je mag die niet wijzigen)", " (nome: não tens permissão para o alterar)", " (namn: du får inte ändra det)", " (имя: у тебя нет права его менять)", " (imię: nie masz prawa go zmienić)", " (이름: 바꿀 권한이 없어)", " (نام: اجازهٔ تغییرش را نداری)"],
"✓ Fiches mises à jour : ": ["✓ Profiles updated: ", "✓ Fichas actualizadas: ", "✓ Schede aggiornate: ", "✓ 更新したプロフィール：", "✓ Aktualisierte Profile: ", "✓ البطاقات المحدّثة: ", "✓ 已更新资料：", "✓ Bijgewerkte profielen: ", "✓ Fichas atualizadas: ", "✓ Uppdaterade profiler: ", "✓ Обновлено карточек: ", "✓ Zaktualizowane profile: ", "✓ 업데이트한 프로필: ", "✓ کارت‌های به‌روزشده: "],
"Pas modifiées (droits) : ": ["Not changed (permissions): ", "No modificadas (permisos): ", "Non modificate (permessi): ", "変更できませんでした（権限）：", "Nicht geändert (Rechte): ", "لم تُعدَّل (الصلاحيات): ", "未修改（权限）：", "Niet gewijzigd (rechten): ", "Não alteradas (permissões): ", "Inte ändrade (behörighet): ", "Не изменены (права): ", "Nie zmieniono (uprawnienia): ", "변경 안 됨(권한): ", "تغییر نکرد (دسترسی): "],
"Fiches à mettre à jour": ["Profiles to update", "Fichas por actualizar", "Schede da aggiornare", "更新するプロフィール", "Zu aktualisierende Profile", "بطاقات بحاجة إلى تحديث", "需要更新的资料", "Profielen om bij te werken", "Fichas a atualizar", "Profiler att uppdatera", "Карточки для обновления", "Profile do aktualizacji", "업데이트할 프로필", "کارت‌هایی برای به‌روزرسانی"],
"D’après ce document, je peux compléter ou corriger ces fiches. Tu m’autorises à faire ces changements ?": ["Based on this document, I can complete or correct these profiles. May I make these changes?", "Según este documento, puedo completar o corregir estas fichas. ¿Me autorizas a hacer estos cambios?", "In base a questo documento, posso completare o correggere queste schede. Mi autorizzi a fare queste modifiche?", "この書類をもとに、これらのプロフィールを補足・修正できます。変更してもいい？", "Laut diesem Dokument kann ich diese Profile ergänzen oder korrigieren. Darf ich diese Änderungen vornehmen?", "بناءً على هذا المستند، يمكنني إكمال هذه البطاقات أو تصحيحها. هل تسمح لي بإجراء هذه التغييرات؟", "根据这份文件，我可以补充或更正这些资料。允许我做这些修改吗？", "Op basis van dit document kan ik deze profielen aanvullen of corrigeren. Mag ik deze wijzigingen doen?", "Com base neste documento, posso completar ou corrigir estas fichas. Autorizas-me a fazer estas alterações?", "Utifrån det här dokumentet kan jag komplettera eller rätta dessa profiler. Får jag göra ändringarna?", "По этому документу я могу дополнить или исправить эти карточки. Можно внести изменения?", "Na podstawie tego dokumentu mogę uzupełnić lub poprawić te profile. Mogę wprowadzić te zmiany?", "이 서류를 바탕으로 이 프로필들을 보충하거나 고칠 수 있어. 이렇게 바꿔도 될까?", "بر اساس این سند می‌توانم این کارت‌ها را کامل یا اصلاح کنم. اجازه می‌دهی این تغییرات را بدهم؟"],
"changements": ["changes", "cambios", "modifiche", "件の変更", "Änderungen", "تغييرات", "处修改", "wijzigingen", "alterações", "ändringar", "изменений", "zmian", "개 변경", "تغییر"],
"Faire les ": ["Make the ", "Hacer los ", "Fai le ", "", "", "إجراء ", "进行 ", "Voer de ", "Fazer as ", "Gör de ", "Внести ", "Wprowadź ", "", "انجام "],
" changements": [" changes", " cambios", " modifiche", " 件の変更を行う", " Änderungen vornehmen", " تغييرات", " 处修改", " wijzigingen door", " alterações", " ändringarna", " изменений", " zmian", " 개 변경하기", " تغییر"],
"Faire le changement": ["Make the change", "Hacer el cambio", "Fai la modifica", "変更する", "Änderung vornehmen", "إجراء التغيير", "进行修改", "Voer de wijziging door", "Fazer a alteração", "Gör ändringen", "Внести изменение", "Wprowadź zmianę", "변경하기", "انجام تغییر"],
"Nouvelle fiche": ["New profile", "Ficha nueva", "Nuova scheda", "新しいプロフィール", "Neues Profil", "بطاقة جديدة", "新资料", "Nieuw profiel", "Ficha nova", "Ny profil", "Новая карточка", "Nowy profil", "새 프로필", "کارت تازه"],
"✓ Demandes de correction envoyées : ": ["✓ Correction requests sent: ", "✓ Solicitudes de corrección enviadas: ", "✓ Richieste di correzione inviate: ", "✓ 送信した修正依頼：", "✓ Gesendete Korrekturanfragen: ", "✓ طلبات التصحيح المرسلة: ", "✓ 已发送更正请求：", "✓ Verzonden correctieverzoeken: ", "✓ Pedidos de correção enviados: ", "✓ Skickade rättelseförfrågningar: ", "✓ Отправлено запросов на исправление: ", "✓ Wysłane prośby o poprawkę: ", "✓ 보낸 수정 요청: ", "✓ درخواست‌های اصلاح فرستاده‌شده: "],
"Le propriétaire ou l’équipe de l’écurie va les valider.": ["The owner or the yard team will review them.", "El propietario o el equipo de la cuadra las validará.", "Il proprietario o lo staff della scuderia le convaliderà.", "馬主か厩舎のスタッフが確認します。", "Der Besitzer oder das Stallteam wird sie prüfen.", "سيتحقق منها المالك أو فريق الإسطبل.", "马主或马场团队会进行确认。", "De eigenaar of het stalteam keurt ze goed.", "O proprietário ou a equipa da coudelaria vai validá-los.", "Ägaren eller stallets team granskar dem.", "Владелец или команда конюшни их проверят.", "Właściciel lub zespół stajni je zatwierdzi.", "마주나 마구간 팀이 확인할 거야.", "مالک یا تیم اصطبل تأییدشان می‌کند."],
"à faire valider": ["needs approval", "por validar", "da convalidare", "承認待ち", "zur Freigabe", "بانتظار الموافقة", "待确认", "ter goedkeuring", "a validar", "behöver godkännas", "на проверку", "do zatwierdzenia", "승인 필요", "نیاز به تأیید"],
"Demander la correction": ["Request the correction", "Solicitar la corrección", "Chiedi la correzione", "修正を依頼する", "Korrektur anfragen", "طلب التصحيح", "申请更正", "Correctie aanvragen", "Pedir a correção", "Begär rättelse", "Запросить исправление", "Poproś o poprawkę", "수정 요청하기", "درخواست اصلاح"],
"Les fiches marquées « à faire valider » ne sont pas à toi : j’envoie une demande de correction, avec le document, à leur propriétaire et à l’équipe de leur écurie.": ["Profiles marked “needs approval” aren't yours: I'll send a correction request, with the document, to their owner and their yard team.", "Las fichas marcadas «por validar» no son tuyas: envío una solicitud de corrección, con el documento, a su propietario y al equipo de su cuadra.", "Le schede segnate «da convalidare» non sono tue: invio una richiesta di correzione, con il documento, al proprietario e allo staff della loro scuderia.", "「承認待ち」のプロフィールはあなたのものではありません：書類を添えて、馬主と厩舎のスタッフに修正依頼を送ります。", "Profile mit „zur Freigabe“ gehören nicht dir: Ich sende eine Korrekturanfrage mit dem Dokument an den Besitzer und das Stallteam.", "البطاقات المعلَّمة «بانتظار الموافقة» ليست لك: سأرسل طلب تصحيح مع المستند إلى مالكها وفريق إسطبلها.", "标记为「待确认」的资料不属于你：我会把更正请求连同文件发给马主和其马场团队。", "Profielen met „ter goedkeuring” zijn niet van jou: ik stuur een correctieverzoek met het document naar de eigenaar en het stalteam.", "As fichas marcadas «a validar» não são tuas: envio um pedido de correção, com o documento, ao proprietário e à equipa da coudelaria.", "Profiler märkta ”behöver godkännas” är inte dina: jag skickar en rättelseförfrågan med dokumentet till ägaren och stallets team.", "Карточки с пометкой «на проверку» не твои: я отправлю запрос на исправление с документом владельцу и команде конюшни.", "Profile oznaczone „do zatwierdzenia” nie są twoje: wyślę prośbę o poprawkę z dokumentem do właściciela i zespołu stajni.", "「승인 필요」로 표시된 프로필은 네 것이 아니야: 서류와 함께 마주와 마구간 팀에 수정 요청을 보낼게.", "کارت‌هایی که «نیاز به تأیید» دارند مال تو نیستند: درخواست اصلاح را با سند برای مالک و تیم اصطبلشان می‌فرستم."],
"Correction proposée pour ": ["Correction suggested for ", "Corrección propuesta para ", "Correzione proposta per ", "修正の提案：", "Korrekturvorschlag für ", "تصحيح مقترح لـ ", "更正建议：", "Correctie voorgesteld voor ", "Correção proposta para ", "Föreslagen rättelse för ", "Предложено исправление для ", "Proponowana poprawka dla ", "수정 제안: ", "اصلاح پیشنهادی برای "],
"✓ Fiche corrigée.": ["✓ Profile corrected.", "✓ Ficha corregida.", "✓ Scheda corretta.", "✓ プロフィールを修正しました。", "✓ Profil korrigiert.", "✓ تم تصحيح البطاقة.", "✓ 资料已更正。", "✓ Profiel gecorrigeerd.", "✓ Ficha corrigida.", "✓ Profilen rättad.", "✓ Карточка исправлена.", "✓ Profil poprawiony.", "✓ 프로필을 고쳤어.", "✓ کارت اصلاح شد."],
"Demande refusée.": ["Request declined.", "Solicitud rechazada.", "Richiesta rifiutata.", "依頼を却下しました。", "Anfrage abgelehnt.", "تم رفض الطلب.", "请求已拒绝。", "Verzoek geweigerd.", "Pedido recusado.", "Förfrågan avböjd.", "Запрос отклонён.", "Prośba odrzucona.", "요청을 거절했어.", "درخواست رد شد."],
"Pas enregistré : la base a refusé (droits sur ce cheval ?)": ["Not saved: the database refused (rights on this horse?)", "No guardado: la base lo rechazó (¿permisos sobre este caballo?)", "Non salvato: il database ha rifiutato (permessi su questo cavallo?)", "保存できませんでした：データベースが拒否しました（この馬の権限？）", "Nicht gespeichert: die Datenbank hat abgelehnt (Rechte an diesem Pferd?)", "لم يُحفظ: رفضت القاعدة (صلاحيات على هذا الحصان؟)", "未保存：数据库拒绝（对这匹马的权限？）", "Niet opgeslagen: de database weigerde (rechten op dit paard?)", "Não guardado: a base recusou (permissões sobre este cavalo?)", "Inte sparat: databasen nekade (behörighet för hästen?)", "Не сохранено: база отказала (права на эту лошадь?)", "Nie zapisano: baza odmówiła (uprawnienia do tego konia?)", "저장 안 됨: 데이터베이스가 거부했어(이 말에 대한 권한?)", "ذخیره نشد: پایگاه داده نپذیرفت (دسترسی به این اسب؟)"],
"Correction acceptée : ": ["Correction accepted: ", "Corrección aceptada: ", "Correzione accettata: ", "修正が承認されました：", "Korrektur angenommen: ", "تم قبول التصحيح: ", "更正已接受：", "Correctie aanvaard: ", "Correção aceite: ", "Rättelse godkänd: ", "Исправление принято: ", "Poprawka przyjęta: ", "수정 승인됨: ", "اصلاح پذیرفته شد: "],
"Correction refusée : ": ["Correction declined: ", "Corrección rechazada: ", "Correzione rifiutata: ", "修正が却下されました：", "Korrektur abgelehnt: ", "تم رفض التصحيح: ", "更正被拒绝：", "Correctie geweigerd: ", "Correção recusada: ", "Rättelse avböjd: ", "Исправление отклонено: ", "Poprawka odrzucona: ", "수정 거절됨: ", "اصلاح رد شد: "],
"Corrections à valider": ["Corrections to review", "Correcciones por validar", "Correzioni da convalidare", "承認待ちの修正", "Zu prüfende Korrekturen", "تصحيحات بانتظار الموافقة", "待确认的更正", "Te beoordelen correcties", "Correções a validar", "Rättelser att granska", "Исправления на проверку", "Poprawki do zatwierdzenia", "확인할 수정 요청", "اصلاح‌های در انتظار تأیید"],
"On te propose de corriger ces fiches d’après un document. Vérifie, puis accepte ou refuse.": ["Someone suggests correcting these profiles based on a document. Check, then accept or decline.", "Te proponen corregir estas fichas según un documento. Revisa y acepta o rechaza.", "Ti propongono di correggere queste schede in base a un documento. Verifica, poi accetta o rifiuta.", "書類にもとづいて、これらのプロフィールの修正が提案されています。確認して、承認か却下を選んでね。", "Jemand schlägt anhand eines Dokuments vor, diese Profile zu korrigieren. Prüfe und nimm an oder lehne ab.", "يُقترح عليك تصحيح هذه البطاقات بناءً على مستند. تحقّق ثم اقبل أو ارفض.", "有人根据一份文件建议更正这些资料。请核对后接受或拒绝。", "Er wordt voorgesteld deze profielen te corrigeren op basis van een document. Controleer en aanvaard of weiger.", "Propõem-te corrigir estas fichas com base num documento. Verifica e aceita ou recusa.", "Någon föreslår att rätta dessa profiler utifrån ett dokument. Kontrollera och godkänn eller avböj.", "Тебе предлагают исправить эти карточки по документу. Проверь и прими или отклони.", "Proponowana jest poprawka tych profili na podstawie dokumentu. Sprawdź, a potem zaakceptuj lub odrzuć.", "서류를 근거로 이 프로필들을 고치자는 제안이 왔어. 확인하고 승인하거나 거절해.", "پیشنهاد شده این کارت‌ها بر اساس یک سند اصلاح شوند. بررسی کن، بعد بپذیر یا رد کن."],
"Demandé par ": ["Requested by ", "Solicitado por ", "Richiesto da ", "依頼者：", "Angefragt von ", "طلبه ", "申请人：", "Aangevraagd door ", "Pedido por ", "Begärt av ", "Запросил(а) ", "Prośba od ", "요청한 사람: ", "درخواست از "],
"Voir le document": ["View the document", "Ver el documento", "Vedi il documento", "書類を見る", "Dokument ansehen", "عرض المستند", "查看文件", "Document bekijken", "Ver o documento", "Visa dokumentet", "Посмотреть документ", "Zobacz dokument", "서류 보기", "دیدن سند"],
"Refuser": ["Decline", "Rechazar", "Rifiuta", "却下", "Ablehnen", "رفض", "拒绝", "Weigeren", "Recusar", "Avböj", "Отклонить", "Odrzuć", "거절", "رد کردن"],
"Accepter": ["Accept", "Aceptar", "Accetta", "承認", "Annehmen", "قبول", "接受", "Aanvaarden", "Aceitar", "Godkänn", "Принять", "Zaakceptuj", "승인", "پذیرفتن"],
"vide au registre": ["empty in the register", "vacío en el registro", "vuoto nel registro", "台帳では空欄", "im Register leer", "فارغ في السجل", "登记簿中为空", "leeg in het register", "vazio no registo", "tomt i registret", "в реестре пусто", "puste w rejestrze", "등록부에 비어 있음", "در دفتر ثبت خالی است"],
"vide sur la fiche": ["empty on the profile", "vacío en la ficha", "vuoto sulla scheda", "プロフィールでは空欄", "im Profil leer", "فارغ في البطاقة", "资料中为空", "leeg op het profiel", "vazio na ficha", "tomt i profilen", "в карточке пусто", "puste w profilu", "프로필에 비어 있음", "در کارت خالی است"],
"Je n’ai rien lu d’utile pour la fiche.": ["I didn’t read anything useful for the profile.", "No he leído nada útil para la ficha.", "Non ho letto nulla di utile per la scheda.", "プロフィールに役立つ情報は読み取れませんでした。", "Ich habe nichts Brauchbares für das Profil gelesen.", "لم أقرأ شيئًا مفيدًا للبطاقة.", "没有读到对资料有用的信息。", "Ik heb niets bruikbaars voor het profiel gelezen.", "Não li nada útil para a ficha.", "Jag läste inget användbart för profilen.", "Ничего полезного для карточки я не прочитал.", "Nie odczytałem nic przydatnego do profilu.", "프로필에 쓸 만한 내용을 읽지 못했어요.", "چیز مفیدی برای کارت نخواندم."],
"Compléter et ranger": ["Complete and file", "Completar y guardar", "Completa e archivia", "補完して保存", "Ergänzen und ablegen", "إكمال وحفظ", "补全并归档", "Aanvullen en opslaan", "Completar e guardar", "Komplettera och spara", "Дополнить и сохранить", "Uzupełnij i zapisz", "채우고 보관", "کامل کن و بایگانی کن"],

"Un document ?": [
"A document?",
"¿Un documento?",
"Un documento?",
"書類がある？",
"Ein Dokument?",
"لديك مستند؟",
"有文件吗？",
"Een document?",
"Um documento?",
"Ett dokument?",
"Есть документ?",
"Masz dokument?",
"문서가 있나요?",
"سندی داری؟"
],
"Hype s’occupe du reste.": [
"Hype takes care of the rest.",
"Hype se encarga del resto.",
"Al resto pensa Hype.",
"あとはHypeにおまかせ。",
"Hype kümmert sich um den Rest.",
"Hype يتكفّل بالباقي.",
"剩下的交给 Hype。",
"Hype doet de rest.",
"O Hype trata do resto.",
"Hype sköter resten.",
"Остальное сделает Hype.",
"Resztą zajmie się Hype.",
"나머지는 Hype가 알아서 해요.",
"بقیه‌اش با Hype."
],
"Photo ou PDF : il le lit, le range et remplit les bonnes pages.": [
"Photo or PDF: it reads it, files it and fills in the right pages.",
"Foto o PDF: lo lee, lo guarda y rellena las páginas correctas.",
"Foto o PDF: lo legge, lo archivia e compila le pagine giuste.",
"写真かPDF：読み取って保存し、該当ページに記入します。",
"Foto oder PDF: Hype liest es, legt es ab und füllt die richtigen Seiten aus.",
"صورة أو PDF: يقرؤه ويحفظه ويملأ الصفحات المناسبة.",
"照片或 PDF：它会读取、归档并填写相应页面。",
"Foto of pdf: het leest het, slaat het op en vult de juiste pagina’s in.",
"Foto ou PDF: lê, arquiva e preenche as páginas certas.",
"Foto eller pdf: den läser, sparar och fyller i rätt sidor.",
"Фото или PDF: он прочитает, сохранит и заполнит нужные страницы.",
"Zdjęcie lub PDF: odczyta, zapisze i uzupełni właściwe strony.",
"사진이나 PDF: 읽고 정리해서 알맞은 페이지에 채워요.",
"عکس یا PDF: آن را می‌خواند، بایگانی می‌کند و صفحه‌های درست را پر می‌کند."
],
"＋ Ajouter un document": [
"＋ Add a document",
"＋ Añadir un documento",
"＋ Aggiungi un documento",
"＋ 書類を追加",
"＋ Dokument hinzufügen",
"＋ إضافة مستند",
"＋ 添加文件",
"＋ Document toevoegen",
"＋ Adicionar um documento",
"＋ Lägg till ett dokument",
"＋ Добавить документ",
"＋ Dodaj dokument",
"＋ 문서 추가",
"＋ افزودن سند"
],
"Tout ce qu’il sait lire ": [
"Everything it can read ",
"Todo lo que sabe leer ",
"Tutto ciò che sa leggere ",
"読み取れるもの ",
"Alles, was es lesen kann ",
"كل ما يستطيع قراءته ",
"它能读取的内容 ",
"Alles wat het kan lezen ",
"Tudo o que sabe ler ",
"Allt den kan läsa ",
"Всё, что он умеет читать ",
"Wszystko, co potrafi odczytać ",
"읽을 수 있는 것 ",
"هر چیزی که می‌تواند بخواند "
],
"Papiers du cheval et n° SIRE · carnet de vaccins · listes de soins (maréchal, vermifuge, dentiste…), même écrites à la main · ordonnances · factures · programme, ordre de passage et horaires — il reconnaît le cheval, te pose une question s’il a un doute, et range tout au même endroit.": [
"Horse papers and ID number · vaccination booklet · care lists (farrier, deworming, dentist…), even handwritten · prescriptions · invoices · show schedule, start order and times — it recognises the horse, asks you if in doubt, and keeps everything in one place.",
"Papeles del caballo y n.º de identificación · cartilla de vacunas · listas de cuidados (herrador, desparasitario, dentista…), incluso a mano · recetas · facturas · programa, orden de salida y horarios — reconoce el caballo, te pregunta si duda y lo guarda todo en el mismo sitio.",
"Documenti del cavallo e n. identificativo · libretto vaccinale · elenchi di cure (maniscalco, vermifugo, dentista…), anche a mano · ricette · fatture · programma, ordine di partenza e orari — riconosce il cavallo, ti chiede se ha un dubbio e mette tutto nello stesso posto.",
"馬の書類と登録番号・ワクチン手帳・ケアの記録（装蹄、駆虫、歯科…手書きでもOK）・処方箋・請求書・大会プログラム、出場順、時間 — 馬を見分け、迷えば質問し、すべてを一か所にまとめます。",
"Pferdepapiere und Kennnummer · Impfpass · Pflegelisten (Hufschmied, Wurmkur, Zahnarzt…), auch handschriftlich · Rezepte · Rechnungen · Programm, Starterliste und Zeiten — Hype erkennt das Pferd, fragt bei Zweifeln nach und legt alles an einem Ort ab.",
"أوراق الحصان ورقم التعريف · دفتر اللقاحات · قوائم العناية (البيطار، مضاد الديدان، طبيب الأسنان…) حتى المكتوبة باليد · الوصفات · الفواتير · برنامج المسابقة وترتيب الانطلاق والمواعيد — يتعرّف على الحصان، ويسألك إن شكّ، ويحفظ كل شيء في مكان واحد.",
"马匹证件和登记号 · 疫苗本 · 护理清单（钉蹄、驱虫、牙医……手写也行）· 处方 · 发票 · 比赛赛程、出场顺序和时间 —— 它会识别马匹，有疑问时问你，并把一切放在同一个地方。",
"Paardenpapieren en registratienummer · vaccinatieboekje · verzorgingslijsten (hoefsmid, ontworming, tandarts…), ook handgeschreven · recepten · facturen · programma, startvolgorde en tijden — het herkent het paard, vraagt het je bij twijfel en bewaart alles op één plek.",
"Papéis do cavalo e n.º de identificação · boletim de vacinas · listas de cuidados (ferrador, desparasitante, dentista…), mesmo à mão · receitas · faturas · programa, ordem de partida e horários — reconhece o cavalo, pergunta-te se tiver dúvidas e guarda tudo no mesmo sítio.",
"Hästens papper och id-nummer · vaccinationsbok · skötsellistor (hovslagare, avmaskning, tandläkare…), även handskrivna · recept · fakturor · tävlingsprogram, startordning och tider — den känner igen hästen, frågar dig om den är osäker och samlar allt på ett ställe.",
"Документы лошади и номер · прививочный паспорт · списки процедур (ковка, дегельминтизация, стоматолог…), даже рукописные · рецепты · счета · программа, порядок выступлений и время — он узнаёт лошадь, спрашивает, если сомневается, и хранит всё в одном месте.",
"Dokumenty konia i numer identyfikacyjny · książeczka szczepień · listy zabiegów (kowal, odrobaczanie, dentysta…), nawet pisane ręcznie · recepty · faktury · program, kolejność startu i godziny — rozpoznaje konia, pyta w razie wątpliwości i trzyma wszystko w jednym miejscu.",
"말 서류와 등록번호 · 백신 수첩 · 관리 목록(장제, 구충, 치과…) 손글씨도 가능 · 처방전 · 청구서 · 대회 프로그램, 출전 순서, 시간 — 말을 알아보고, 헷갈리면 물어보고, 모두 한곳에 정리해요.",
"مدارک اسب و شماره شناسایی · دفترچه واکسن · فهرست مراقبت‌ها (نعل‌بند، ضدانگل، دندان‌پزشک…) حتی دست‌نویس · نسخه‌ها · فاکتورها · برنامه مسابقه، ترتیب اجرا و ساعت‌ها — اسب را می‌شناسد، اگر شک داشته باشد از تو می‌پرسد و همه چیز را یک‌جا نگه می‌دارد."
],
"Donne-le moi.": [
"Give it to me.",
"Dámelo.",
"Dammelo.",
"渡してね。",
"Gib es mir.",
"أعطني إياه.",
"交给我吧。",
"Geef het maar.",
"Dá-mo.",
"Ge det till mig.",
"Давай его сюда.",
"Daj mi go.",
"저에게 주세요.",
"بده به من."
],
"Photo, capture d’écran ou PDF — même écrit à la main. Tu peux me dire en deux mots ce que c’est (avec le micro du clavier si tu préfères parler).": [
"Photo, screenshot or PDF — even handwritten. You can tell me in a few words what it is (with the keyboard mic if you prefer to speak).",
"Foto, captura de pantalla o PDF — incluso a mano. Puedes decirme en dos palabras qué es (con el micrófono del teclado si prefieres hablar).",
"Foto, screenshot o PDF — anche scritto a mano. Puoi dirmi in due parole cos’è (con il microfono della tastiera se preferisci parlare).",
"写真、スクリーンショット、PDF — 手書きでもOK。何の書類かひとことで教えてね（話したいならキーボードのマイクで）。",
"Foto, Screenshot oder PDF — auch handschriftlich. Sag mir kurz, was es ist (mit dem Mikrofon der Tastatur, wenn du lieber sprichst).",
"صورة أو لقطة شاشة أو PDF — حتى المكتوب باليد. يمكنك أن تقول لي بكلمتين ما هو (بميكروفون لوحة المفاتيح إن فضّلت الكلام).",
"照片、截图或 PDF —— 手写也可以。你可以简单告诉我这是什么（想说话就用键盘上的麦克风）。",
"Foto, screenshot of pdf — ook handgeschreven. Zeg me in een paar woorden wat het is (met de microfoon van het toetsenbord als je liever praat).",
"Foto, captura de ecrã ou PDF — mesmo à mão. Podes dizer-me em duas palavras o que é (com o microfone do teclado se preferires falar).",
"Foto, skärmbild eller pdf — även handskrivet. Berätta kort vad det är (med tangentbordets mikrofon om du hellre pratar).",
"Фото, скриншот или PDF — даже рукописный. Можешь в двух словах сказать, что это (через микрофон клавиатуры, если удобнее говорить).",
"Zdjęcie, zrzut ekranu lub PDF — nawet pisany ręcznie. Możesz powiedzieć w dwóch słowach, co to jest (mikrofonem klawiatury, jeśli wolisz mówić).",
"사진, 스크린샷, PDF — 손글씨도 돼요. 무엇인지 짧게 말해 줘요(말하고 싶으면 키보드 마이크로).",
"عکس، اسکرین‌شات یا PDF — حتی دست‌نویس. می‌توانی در چند کلمه بگویی چیست (اگر ترجیح می‌دهی حرف بزنی، با میکروفون صفحه‌کلید)."
],
"Facultatif : « Cirrus, Ecolo et Elfe ont vu le maréchal ce matin »": [
"Optional: “Cirrus, Ecolo and Elfe saw the farrier this morning”",
"Opcional: «Cirrus, Ecolo y Elfe vieron al herrador esta mañana»",
"Facoltativo: «Cirrus, Ecolo ed Elfe hanno visto il maniscalco stamattina»",
"任意：「Cirrus、Ecolo、Elfeが今朝装蹄した」",
"Optional: „Cirrus, Ecolo und Elfe hatten heute früh den Hufschmied“",
"اختياري: «Cirrus وEcolo وElfe زاروا البيطار هذا الصباح»",
"可选：“Cirrus、Ecolo 和 Elfe 今天上午钉了蹄”",
"Optioneel: ‘Cirrus, Ecolo en Elfe hadden vanochtend de hoefsmid’",
"Opcional: «Cirrus, Ecolo e Elfe viram o ferrador esta manhã»",
"Valfritt: ”Cirrus, Ecolo och Elfe träffade hovslagaren i morse”",
"Необязательно: «Cirrus, Ecolo и Elfe сегодня утром ковали»",
"Opcjonalnie: „Cirrus, Ecolo i Elfe byli dziś rano u kowala”",
"선택: “오늘 아침 Cirrus, Ecolo, Elfe가 장제를 했어요”",
"اختیاری: «Cirrus، Ecolo و Elfe امروز صبح نعل‌بند داشتند»"
],
"Annuler": [
"Cancel",
"Cancelar",
"Annulla",
"キャンセル",
"Abbrechen",
"إلغاء",
"取消",
"Annuleren",
"Cancelar",
"Avbryt",
"Отмена",
"Anuluj",
"취소",
"لغو"
],
"＋ Choisir le document": [
"＋ Choose the document",
"＋ Elegir el documento",
"＋ Scegli il documento",
"＋ 書類を選ぶ",
"＋ Dokument wählen",
"＋ اختر المستند",
"＋ 选择文件",
"＋ Document kiezen",
"＋ Escolher o documento",
"＋ Välj dokumentet",
"＋ Выбрать документ",
"＋ Wybierz dokument",
"＋ 문서 선택",
"＋ انتخاب سند"
],
"Je lis ton document": [
"Reading your document",
"Leyendo tu documento",
"Sto leggendo il tuo documento",
"書類を読んでいます",
"Ich lese dein Dokument",
"أقرأ مستندك",
"正在读取你的文件",
"Ik lees je document",
"Estou a ler o teu documento",
"Jag läser ditt dokument",
"Читаю твой документ",
"Czytam twój dokument",
"문서를 읽는 중",
"در حال خواندن سندت"
],
"Un instant…": [
"One moment…",
"Un momento…",
"Un attimo…",
"少々お待ちを…",
"Einen Moment…",
"لحظة…",
"稍等……",
"Even geduld…",
"Um instante…",
"Ett ögonblick…",
"Минутку…",
"Chwileczkę…",
"잠시만요…",
"یک لحظه…"
],
"Ça prend en général 1 à 2 minutes. Reste sur cette fenêtre.": [
"It usually takes 1 to 2 minutes. Stay on this window.",
"Suele tardar 1 o 2 minutos. Quédate en esta ventana.",
"Di solito ci vogliono 1 o 2 minuti. Resta su questa finestra.",
"通常1〜2分かかります。この画面のままでね。",
"Das dauert meist 1 bis 2 Minuten. Bleib in diesem Fenster.",
"يستغرق عادة دقيقة أو دقيقتين. ابقَ في هذه النافذة.",
"通常需要 1 到 2 分钟。请停留在此窗口。",
"Dit duurt meestal 1 à 2 minuten. Blijf in dit venster.",
"Costuma demorar 1 a 2 minutos. Fica nesta janela.",
"Det tar oftast 1–2 minuter. Stanna i det här fönstret.",
"Обычно это занимает 1–2 минуты. Не закрывай это окно.",
"Zwykle trwa to 1–2 minuty. Zostań w tym oknie.",
"보통 1~2분 걸려요. 이 창에 있어 주세요.",
"معمولاً ۱ تا ۲ دقیقه طول می‌کشد. در همین پنجره بمان."
],
"Fermer": [
"Close",
"Cerrar",
"Chiudi",
"閉じる",
"Schließen",
"إغلاق",
"关闭",
"Sluiten",
"Fechar",
"Stäng",
"Закрыть",
"Zamknij",
"닫기",
"بستن"
],
"Ce que j’ai compris": [
"What I understood",
"Lo que he entendido",
"Cosa ho capito",
"わかったこと",
"Was ich verstanden habe",
"ما فهمته",
"我的理解",
"Wat ik begrepen heb",
"O que percebi",
"Det här förstod jag",
"Что я понял",
"Co zrozumiałem",
"제가 이해한 것",
"آنچه فهمیدم"
],
"C’est ": [
"It’s ",
"Es ",
"È ",
"これは",
"Das ist ",
"إنه ",
"这是",
"Het is ",
"É ",
"Det är ",
"Это ",
"To ",
"이것은 ",
"این "
],
"Si je me suis trompé, dis-le-moi : je relis avec ta réponse.": [
"If I got it wrong, tell me: I’ll read it again with your answer.",
"Si me he equivocado, dímelo: lo vuelvo a leer con tu respuesta.",
"Se ho sbagliato, dimmelo: rileggo con la tua risposta.",
"間違っていたら教えてね。答えをもとに読み直します。",
"Wenn ich mich geirrt habe, sag es mir: Ich lese mit deiner Antwort neu.",
"إن أخطأت فأخبرني: سأعيد القراءة بجوابك.",
"如果我理解错了，告诉我：我会根据你的回答重新读取。",
"Als ik me vergist heb, zeg het: ik lees opnieuw met jouw antwoord.",
"Se me enganei, diz-me: volto a ler com a tua resposta.",
"Om jag har fel, säg det: jag läser igen med ditt svar.",
"Если я ошибся, скажи: перечитаю с учётом ответа.",
"Jeśli się pomyliłem, powiedz: przeczytam ponownie z twoją odpowiedzią.",
"틀렸다면 알려 줘요. 답을 보고 다시 읽을게요.",
"اگر اشتباه کردم بگو: با پاسخت دوباره می‌خوانم."
],
"Ta réponse (tu peux dicter avec le micro du clavier)": [
"Your answer (you can dictate with the keyboard mic)",
"Tu respuesta (puedes dictar con el micrófono del teclado)",
"La tua risposta (puoi dettare con il microfono della tastiera)",
"答え（キーボードのマイクで音声入力できます）",
"Deine Antwort (du kannst mit dem Tastaturmikrofon diktieren)",
"جوابك (يمكنك الإملاء بميكروفون لوحة المفاتيح)",
"你的回答（可用键盘麦克风语音输入）",
"Je antwoord (je kunt dicteren met de microfoon van het toetsenbord)",
"A tua resposta (podes ditar com o microfone do teclado)",
"Ditt svar (du kan diktera med tangentbordets mikrofon)",
"Твой ответ (можно надиктовать через микрофон клавиатуры)",
"Twoja odpowiedź (możesz dyktować mikrofonem klawiatury)",
"답변(키보드 마이크로 말해도 돼요)",
"پاسخت (می‌توانی با میکروفون صفحه‌کلید بگویی)"
],
"Répondre et relire": [
"Answer and read again",
"Responder y volver a leer",
"Rispondi e rileggi",
"答えて読み直す",
"Antworten und neu lesen",
"أجب وأعد القراءة",
"回答并重新读取",
"Antwoorden en opnieuw lezen",
"Responder e voltar a ler",
"Svara och läs igen",
"Ответить и перечитать",
"Odpowiedz i przeczytaj ponownie",
"답하고 다시 읽기",
"پاسخ بده و دوباره بخوان"
],
"Les soins à enregistrer": [
"Care to save",
"Cuidados que guardar",
"Cure da salvare",
"保存するケア",
"Zu speichernde Pflege",
"العناية المطلوب حفظها",
"要保存的护理",
"Te bewaren verzorging",
"Cuidados a guardar",
"Vård att spara",
"Процедуры для сохранения",
"Zabiegi do zapisania",
"저장할 관리",
"مراقبت‌هایی که ثبت می‌شوند"
],
"Lu : « ": [
"Read: “",
"Leído: «",
"Letto: «",
"読み取り：「",
"Gelesen: „",
"مقروء: «",
"读到：“",
"Gelezen: ‘",
"Lido: «",
"Läst: ”",
"Прочитано: «",
"Odczytano: „",
"읽음: “",
"خوانده شد: «"
],
"— cheval ? —": [
"— horse? —",
"— ¿caballo? —",
"— cavallo? —",
"— 馬は？ —",
"— Pferd? —",
"— الحصان؟ —",
"— 哪匹马？ —",
"— paard? —",
"— cavalo? —",
"— häst? —",
"— лошадь? —",
"— koń? —",
"— 어느 말? —",
"— کدام اسب؟ —"
],
"— Quel cheval ? —": [
"— Which horse? —",
"— ¿Qué caballo? —",
"— Quale cavallo? —",
"— どの馬？ —",
"— Welches Pferd? —",
"— أي حصان؟ —",
"— 哪匹马？ —",
"— Welk paard? —",
"— Que cavalo? —",
"— Vilken häst? —",
"— Какая лошадь? —",
"— Który koń? —",
"— 어느 말인가요? —",
"— کدام اسب؟ —"
],
"Je n’ai trouvé aucune ligne de soin.": [
"I didn’t find any care entries.",
"No he encontrado ninguna línea de cuidados.",
"Non ho trovato nessuna riga di cure.",
"ケアの記録は見つかりませんでした。",
"Ich habe keine Pflegeeinträge gefunden.",
"لم أجد أي سطر عناية.",
"没有找到任何护理记录。",
"Ik heb geen verzorgingsregels gevonden.",
"Não encontrei nenhuma linha de cuidados.",
"Jag hittade inga vårdrader.",
"Я не нашёл ни одной записи о процедурах.",
"Nie znalazłem żadnych zabiegów.",
"관리 기록을 찾지 못했어요.",
"هیچ سطر مراقبتی پیدا نکردم."
],
"Enregistrer les soins cochés": [
"Save the ticked care",
"Guardar los cuidados marcados",
"Salva le cure spuntate",
"チェックしたケアを保存",
"Angehakte Pflege speichern",
"حفظ العناية المحددة",
"保存勾选的护理",
"Aangevinkte verzorging opslaan",
"Guardar os cuidados assinalados",
"Spara markerad vård",
"Сохранить отмеченные процедуры",
"Zapisz zaznaczone zabiegi",
"체크한 관리 저장",
"ثبت مراقبت‌های علامت‌خورده"
],
"Coche au moins une ligne avec un cheval et une date.": [
"Tick at least one line with a horse and a date.",
"Marca al menos una línea con un caballo y una fecha.",
"Spunta almeno una riga con un cavallo e una data.",
"馬と日付のある行を1つ以上チェックしてね。",
"Hake mindestens eine Zeile mit Pferd und Datum an.",
"حدّد سطرًا واحدًا على الأقل فيه حصان وتاريخ.",
"至少勾选一行有马匹和日期的记录。",
"Vink minstens één regel met een paard en een datum aan.",
"Assinala pelo menos uma linha com um cavalo e uma data.",
"Markera minst en rad med en häst och ett datum.",
"Отметь хотя бы одну строку с лошадью и датой.",
"Zaznacz co najmniej jeden wiersz z koniem i datą.",
"말과 날짜가 있는 줄을 하나 이상 체크해요.",
"دست‌کم یک سطر با اسب و تاریخ علامت بزن."
],
"Je l’ouvre dans la page Santé du cheval et je lis les vaccins (tu valideras chaque date).": [
"I’ll open it in the horse’s Health page and read the vaccines (you’ll confirm each date).",
"Lo abro en la página Salud del caballo y leo las vacunas (validarás cada fecha).",
"Lo apro nella pagina Salute del cavallo e leggo i vaccini (convaliderai ogni data).",
"馬の健康ページで開いてワクチンを読み取ります（日付はひとつずつ確認してね）。",
"Ich öffne es auf der Gesundheitsseite des Pferdes und lese die Impfungen (du bestätigst jedes Datum).",
"أفتحه في صفحة صحة الحصان وأقرأ اللقاحات (ستؤكد كل تاريخ).",
"我会在马匹健康页打开并读取疫苗（你要确认每个日期）。",
"Ik open het op de gezondheidspagina van het paard en lees de vaccinaties (jij bevestigt elke datum).",
"Abro-o na página Saúde do cavalo e leio as vacinas (vais validar cada data).",
"Jag öppnar det på hästens hälsosida och läser vaccinationerna (du bekräftar varje datum).",
"Открою на странице «Здоровье» лошади и прочитаю прививки (ты подтвердишь каждую дату).",
"Otworzę go na stronie Zdrowie konia i odczytam szczepienia (potwierdzisz każdą datę).",
"말의 건강 페이지에서 열어 백신을 읽을게요(날짜는 하나씩 확인해 줘요).",
"آن را در صفحه سلامت اسب باز می‌کنم و واکسن‌ها را می‌خوانم (هر تاریخ را تأیید می‌کنی)."
],
"Lire le carnet": [
"Read the booklet",
"Leer la cartilla",
"Leggi il libretto",
"手帳を読む",
"Impfpass lesen",
"قراءة الدفتر",
"读取疫苗本",
"Boekje lezen",
"Ler o boletim",
"Läs boken",
"Прочитать паспорт",
"Odczytaj książeczkę",
"수첩 읽기",
"خواندن دفترچه"
],
"Je le lis dans le Jour J du concours (horaires, recos, pistes) et je le garde dans le Dossier du concours.": [
"I’ll read it in the show’s Day J (times, course walks, arenas) and keep it in the show file.",
"Lo leo en el Día D del concurso (horarios, reconocimientos, pistas) y lo guardo en el expediente del concurso.",
"Lo leggo nel Giorno G del concorso (orari, ricognizioni, campi) e lo conservo nel fascicolo del concorso.",
"大会の当日ページで読み取り（時間、下見、アリーナ）、大会の書類に保存します。",
"Ich lese es im Turniertag (Zeiten, Parcoursbesichtigung, Plätze) und lege es in den Turnierunterlagen ab.",
"أقرؤه في يوم المسابقة (المواعيد، المعاينة، الحلبات) وأحفظه في ملف المسابقة.",
"我会在比赛日页面读取（时间、看场、场地），并保存在比赛资料中。",
"Ik lees het in de wedstrijddag (tijden, verkenning, pistes) en bewaar het in het wedstrijddossier.",
"Leio-o no Dia D do concurso (horários, reconhecimentos, pistas) e guardo-o no dossiê do concurso.",
"Jag läser det i tävlingsdagen (tider, banvandring, banor) och sparar det i tävlingspärmen.",
"Прочитаю его в «Дне старта» (время, просмотр, манежи) и сохраню в документах соревнования.",
"Odczytam go w Dniu zawodów (godziny, zapoznanie, czworoboki) i zachowam w dokumentach zawodów.",
"대회 당일 페이지에서 읽고(시간, 코스 답사, 경기장) 대회 서류에 보관할게요.",
"آن را در روز مسابقه می‌خوانم (ساعت‌ها، بازدید مسیر، میدان‌ها) و در مدارک مسابقه نگه می‌دارم."
],
"Je le lis dans les Engagements du concours (numéros et heures de passage) et je le garde dans le Dossier du concours.": [
"I’ll read it in the show’s Entries (start numbers and times) and keep it in the show file.",
"Lo leo en las Inscripciones del concurso (números y horas de salida) y lo guardo en el expediente del concurso.",
"Lo leggo nelle Iscrizioni del concorso (numeri e orari di partenza) e lo conservo nel fascicolo del concorso.",
"大会のエントリーで読み取り（出場番号と時間）、大会の書類に保存します。",
"Ich lese es in den Nennungen (Startnummern und -zeiten) und lege es in den Turnierunterlagen ab.",
"أقرؤه في تسجيلات المسابقة (أرقام وأوقات الانطلاق) وأحفظه في ملف المسابقة.",
"我会在比赛报名页读取（出场号和时间），并保存在比赛资料中。",
"Ik lees het in de inschrijvingen (startnummers en -tijden) en bewaar het in het wedstrijddossier.",
"Leio-o nas Inscrições do concurso (números e horas de partida) e guardo-o no dossiê do concurso.",
"Jag läser det i anmälningarna (startnummer och tider) och sparar det i tävlingspärmen.",
"Прочитаю его в «Заявках» (номера и время старта) и сохраню в документах соревнования.",
"Odczytam go w Zgłoszeniach (numery i godziny startu) i zachowam w dokumentach zawodów.",
"대회 출전 신청에서 읽고(출전 번호와 시간) 대회 서류에 보관할게요.",
"آن را در ثبت‌نام‌های مسابقه می‌خوانم (شماره‌ها و ساعت اجرا) و در مدارک مسابقه نگه می‌دارم."
],
"Continuer": [
"Continue",
"Continuar",
"Continua",
"続ける",
"Weiter",
"متابعة",
"继续",
"Doorgaan",
"Continuar",
"Fortsätt",
"Продолжить",
"Dalej",
"계속",
"ادامه"
],
"Ouvre d’abord la fiche du concours, puis redonne-moi le document en bas de la page.": [
"Open the show page first, then give me the document again at the bottom of the page.",
"Abre primero la ficha del concurso y vuelve a darme el documento abajo de la página.",
"Apri prima la scheda del concorso, poi ridammi il documento in fondo alla pagina.",
"先に大会ページを開いて、ページ下からもう一度書類を渡してね。",
"Öffne zuerst die Turnierseite und gib mir das Dokument unten auf der Seite noch einmal.",
"افتح صفحة المسابقة أولًا، ثم أعطني المستند مجددًا أسفل الصفحة.",
"请先打开比赛页面，再在页面底部重新给我这份文件。",
"Open eerst de wedstrijdpagina en geef me het document onderaan de pagina opnieuw.",
"Abre primeiro a ficha do concurso e volta a dar-me o documento no fundo da página.",
"Öppna tävlingssidan först och ge mig dokumentet igen längst ner på sidan.",
"Сначала открой страницу соревнования, затем снова дай мне документ внизу страницы.",
"Najpierw otwórz stronę zawodów, potem daj mi dokument ponownie na dole strony.",
"먼저 대회 페이지를 열고, 페이지 아래에서 문서를 다시 줘요.",
"اول صفحه مسابقه را باز کن، بعد سند را دوباره پایین صفحه به من بده."
],
"Les résultats se lisent encore depuis la carte « Résultats » de la fiche du concours : je les brancherai ici à la prochaine étape.": [
"Results are still read from the “Results” card on the show page: I’ll connect them here in the next step.",
"Los resultados aún se leen desde la tarjeta «Resultados» de la ficha del concurso: los conectaré aquí en el próximo paso.",
"I risultati si leggono ancora dalla scheda «Risultati» del concorso: li collegherò qui al prossimo passo.",
"結果はまだ大会ページの「結果」カードから読み取ります。次のステップでここにつなぎます。",
"Ergebnisse werden noch über die Karte „Ergebnisse“ der Turnierseite gelesen: Ich binde sie im nächsten Schritt hier ein.",
"لا تزال النتائج تُقرأ من بطاقة «النتائج» في صفحة المسابقة: سأربطها هنا في الخطوة التالية.",
"成绩目前仍从比赛页面的“成绩”卡片读取：下一步我会把它接到这里。",
"Uitslagen worden nog via de kaart ‘Uitslagen’ van de wedstrijdpagina gelezen: in de volgende stap koppel ik ze hier.",
"Os resultados ainda se leem a partir do cartão «Resultados» da ficha do concurso: vou ligá-los aqui no próximo passo.",
"Resultat läses fortfarande från kortet ”Resultat” på tävlingssidan: jag kopplar in dem här i nästa steg.",
"Результаты пока читаются из карточки «Результаты» на странице соревнования: подключу их сюда на следующем шаге.",
"Wyniki nadal odczytuje się z karty „Wyniki” na stronie zawodów: podłączę je tutaj w kolejnym kroku.",
"결과는 아직 대회 페이지의 ‘결과’ 카드에서 읽어요. 다음 단계에서 여기에 연결할게요.",
"نتایج هنوز از کارت «نتایج» صفحه مسابقه خوانده می‌شوند: در مرحله بعد اینجا وصلشان می‌کنم."
],
"Ce que j’ai lu": [
"What I read",
"Lo que he leído",
"Cosa ho letto",
"読み取った内容",
"Was ich gelesen habe",
"ما قرأته",
"我读到的内容",
"Wat ik gelezen heb",
"O que li",
"Det här läste jag",
"Что я прочитал",
"Co odczytałem",
"읽은 내용",
"آنچه خواندم"
],
"Bientôt : je compléterai la fiche du cheval avec ces infos (avec ton accord). Pour l’instant, je range le document.": [
"Soon: I’ll complete the horse’s profile with this info (with your OK). For now, I’m filing the document.",
"Pronto: completaré la ficha del caballo con estos datos (con tu acuerdo). Por ahora, guardo el documento.",
"Presto: completerò la scheda del cavallo con queste informazioni (con il tuo ok). Per ora archivio il documento.",
"近いうちに、この情報で馬のプロフィールを補完します（あなたの了承のうえで）。今は書類を保存します。",
"Bald: Ich ergänze das Pferdeprofil mit diesen Angaben (mit deinem OK). Vorerst lege ich das Dokument ab.",
"قريبًا: سأكمل بطاقة الحصان بهذه المعلومات (بموافقتك). حاليًا أحفظ المستند.",
"即将推出：我会用这些信息补全马匹资料（经你同意）。目前先归档文件。",
"Binnenkort: ik vul het paardenprofiel aan met deze info (met jouw akkoord). Voor nu sla ik het document op.",
"Em breve: vou completar a ficha do cavalo com estas informações (com o teu acordo). Por agora, guardo o documento.",
"Snart: jag kompletterar hästens profil med detta (med ditt ok). Just nu sparar jag dokumentet.",
"Скоро: дополню карточку лошади этими данными (с твоего согласия). Пока сохраняю документ.",
"Wkrótce: uzupełnię profil konia tymi danymi (za twoją zgodą). Na razie zapisuję dokument.",
"곧: 이 정보로 말 프로필을 채울게요(동의를 받고). 지금은 문서를 정리해요.",
"به‌زودی: با اجازه‌ات این اطلاعات را در کارت اسب کامل می‌کنم. فعلاً سند را بایگانی می‌کنم."
],
"Je le range dans les documents de la page Santé du cheval :": [
"I’ll file it in the documents of the horse’s Health page:",
"Lo guardo en los documentos de la página Salud del caballo:",
"Lo archivio nei documenti della pagina Salute del cavallo:",
"馬の健康ページの書類に保存します：",
"Ich lege es in den Dokumenten der Gesundheitsseite des Pferdes ab:",
"سأحفظه في مستندات صفحة صحة الحصان:",
"我会把它归档到马匹健康页的文件里：",
"Ik bewaar het bij de documenten op de gezondheidspagina van het paard:",
"Guardo-o nos documentos da página Saúde do cavalo:",
"Jag sparar det bland dokumenten på hästens hälsosida:",
"Сохраню его в документах страницы «Здоровье» лошади:",
"Zapiszę go w dokumentach strony Zdrowie konia:",
"말의 건강 페이지 문서에 보관할게요:",
"آن را در مدارک صفحه سلامت اسب بایگانی می‌کنم:"
],
"Ranger le document": [
"File the document",
"Guardar el documento",
"Archivia il documento",
"書類を保存",
"Dokument ablegen",
"حفظ المستند",
"归档文件",
"Document opslaan",
"Guardar o documento",
"Spara dokumentet",
"Сохранить документ",
"Zapisz dokument",
"문서 보관",
"بایگانی سند"
],
"Choisis le cheval concerné.": [
"Choose the horse.",
"Elige el caballo.",
"Scegli il cavallo.",
"該当する馬を選んでね。",
"Wähle das Pferd.",
"اختر الحصان المعني.",
"请选择相关马匹。",
"Kies het paard.",
"Escolhe o cavalo.",
"Välj hästen.",
"Выбери лошадь.",
"Wybierz konia.",
"해당하는 말을 골라 줘요.",
"اسب مربوط را انتخاب کن."
],
"Lecture impossible : ": [
"Couldn’t read: ",
"No se pudo leer: ",
"Lettura impossibile: ",
"読み取れませんでした：",
"Lesen nicht möglich: ",
"تعذّرت القراءة: ",
"无法读取：",
"Lezen niet gelukt: ",
"Leitura impossível: ",
"Kunde inte läsa: ",
"Не удалось прочитать: ",
"Nie udało się odczytać: ",
"읽을 수 없어요: ",
"خواندن ممکن نشد: "
],
"Pas rangé : ": [
"Not filed: ",
"No guardado: ",
"Non archiviato: ",
"保存できませんでした：",
"Nicht abgelegt: ",
"لم يُحفظ: ",
"未归档：",
"Niet opgeslagen: ",
"Não guardado: ",
"Inte sparat: ",
"Не сохранено: ",
"Nie zapisano: ",
"보관하지 못했어요: ",
"بایگانی نشد: "
],
"Maréchal (ferrure)": [
"Farrier (shoeing)",
"Herrador (herraje)",
"Maniscalco (ferratura)",
"装蹄（蹄鉄）",
"Hufschmied (Beschlag)",
"البيطار (تركيب الحدوة)",
"钉蹄（装蹄铁）",
"Hoefsmid (beslag)",
"Ferrador (ferração)",
"Hovslagare (skoning)",
"Ковка",
"Kowal (kucie)",
"장제(편자)",
"نعل‌بند (نعل‌کوبی)"
],
"Maréchal (parage)": [
"Farrier (trim)",
"Herrador (recorte)",
"Maniscalco (pareggio)",
"削蹄",
"Hufschmied (Ausschneiden)",
"البيطار (تقليم)",
"修蹄",
"Hoefsmid (bekappen)",
"Ferrador (aparo)",
"Hovslagare (verkning)",
"Расчистка копыт",
"Kowal (struganie)",
"삭제(발굽 다듬기)",
"نعل‌بند (سم‌تراشی)"
],
"Vermifuge": [
"Deworming",
"Desparasitario",
"Vermifugo",
"駆虫",
"Wurmkur",
"مضاد الديدان",
"驱虫",
"Ontworming",
"Desparasitante",
"Avmaskning",
"Дегельминтизация",
"Odrobaczanie",
"구충",
"ضدانگل"
],
"Vaccin": [
"Vaccine",
"Vacuna",
"Vaccino",
"ワクチン",
"Impfung",
"لقاح",
"疫苗",
"Vaccinatie",
"Vacina",
"Vaccin",
"Прививка",
"Szczepienie",
"백신",
"واکسن"
],
"Dentiste": [
"Dentist",
"Dentista",
"Dentista",
"歯科",
"Zahnarzt",
"طبيب الأسنان",
"牙医",
"Tandarts",
"Dentista",
"Tandläkare",
"Стоматолог",
"Dentysta",
"치과",
"دندان‌پزشک"
],
"Ostéopathe": [
"Osteopath",
"Osteópata",
"Osteopata",
"オステオパシー",
"Osteopath",
"أخصائي تقويم",
"整骨师",
"Osteopaat",
"Osteopata",
"Osteopat",
"Остеопат",
"Osteopata",
"정골의사",
"استئوپات"
],
"Vétérinaire": [
"Vet",
"Veterinario",
"Veterinario",
"獣医",
"Tierarzt",
"الطبيب البيطري",
"兽医",
"Dierenarts",
"Veterinário",
"Veterinär",
"Ветеринар",
"Weterynarz",
"수의사",
"دامپزشک"
],
"Traitement": [
"Treatment",
"Tratamiento",
"Trattamento",
"治療",
"Behandlung",
"علاج",
"治疗",
"Behandeling",
"Tratamento",
"Behandling",
"Лечение",
"Leczenie",
"치료",
"درمان"
],
"Autre soin": [
"Other care",
"Otro cuidado",
"Altra cura",
"その他のケア",
"Andere Pflege",
"عناية أخرى",
"其他护理",
"Andere verzorging",
"Outro cuidado",
"Annan vård",
"Другая процедура",
"Inny zabieg",
"기타 관리",
"مراقبت دیگر"
],
"N° SIRE": [
"ID number (SIRE)",
"N.º SIRE",
"N. SIRE",
"SIRE番号",
"SIRE-Nr.",
"رقم SIRE",
"SIRE 编号",
"SIRE-nr.",
"N.º SIRE",
"SIRE-nr",
"Номер SIRE",
"Nr SIRE",
"SIRE 번호",
"شماره SIRE"
],
"Naissance": [
"Birth",
"Nacimiento",
"Nascita",
"生年月日",
"Geburt",
"الولادة",
"出生",
"Geboorte",
"Nascimento",
"Född",
"Рождение",
"Urodzenie",
"출생",
"تولد"
],
"Sexe": [
"Sex",
"Sexo",
"Sesso",
"性別",
"Geschlecht",
"الجنس",
"性别",
"Geslacht",
"Sexo",
"Kön",
"Пол",
"Płeć",
"성별",
"جنس"
],
"Robe": [
"Coat colour",
"Capa",
"Mantello",
"毛色",
"Farbe",
"اللون",
"毛色",
"Vachtkleur",
"Pelagem",
"Färg",
"Масть",
"Maść",
"모색",
"رنگ"
],
"Race": [
"Breed",
"Raza",
"Razza",
"品種",
"Rasse",
"السلالة",
"品种",
"Ras",
"Raça",
"Ras",
"Порода",
"Rasa",
"품종",
"نژاد"
],
"Père": [
"Sire",
"Padre",
"Padre",
"父",
"Vater",
"الأب",
"父系",
"Vader",
"Pai",
"Far",
"Отец",
"Ojciec",
"부마",
"پدر"
],
"Mère": [
"Dam",
"Madre",
"Madre",
"母",
"Mutter",
"الأم",
"母系",
"Moeder",
"Mãe",
"Mor",
"Мать",
"Matka",
"모마",
"مادر"
],
"Naisseur": [
"Breeder",
"Criador",
"Allevatore",
"生産者",
"Züchter",
"المربي",
"繁育者",
"Fokker",
"Criador",
"Uppfödare",
"Заводчик",
"Hodowca",
"생산자",
"پرورش‌دهنده"
],
"une liste de soins": [
"a care list",
"una lista de cuidados",
"un elenco di cure",
"ケアの記録",
"eine Pflegeliste",
"قائمة عناية",
"一份护理清单",
"een verzorgingslijst",
"uma lista de cuidados",
"en vårdlista",
"список процедур",
"lista zabiegów",
"관리 목록",
"فهرست مراقبت‌ها"
],
"un carnet de vaccination": [
"a vaccination booklet",
"una cartilla de vacunación",
"un libretto vaccinale",
"ワクチン手帳",
"ein Impfpass",
"دفتر لقاحات",
"一本疫苗本",
"een vaccinatieboekje",
"um boletim de vacinas",
"en vaccinationsbok",
"прививочный паспорт",
"książeczka szczepień",
"백신 수첩",
"دفترچه واکسن"
],
"les papiers du cheval (document d'identification)": [
"the horse’s papers (ID document)",
"los papeles del caballo (documento de identificación)",
"i documenti del cavallo (documento di identificazione)",
"馬の書類（識別書）",
"die Pferdepapiere (Equidenpass)",
"أوراق الحصان (وثيقة التعريف)",
"马匹证件（身份证明）",
"de paardenpapieren (paspoort)",
"os papéis do cavalo (documento de identificação)",
"hästens papper (pass)",
"документы лошади (паспорт)",
"dokumenty konia (paszport)",
"말 서류(신분증)",
"مدارک اسب (سند شناسایی)"
],
"une ordonnance": [
"a prescription",
"una receta",
"una ricetta",
"処方箋",
"ein Rezept",
"وصفة طبية",
"一张处方",
"een recept",
"uma receita",
"ett recept",
"рецепт",
"recepta",
"처방전",
"نسخه"
],
"une facture": [
"an invoice",
"una factura",
"una fattura",
"請求書",
"eine Rechnung",
"فاتورة",
"一张发票",
"een factuur",
"uma fatura",
"en faktura",
"счёт",
"faktura",
"청구서",
"فاکتور"
],
"le programme d'un concours": [
"a show schedule",
"el programa de un concurso",
"il programma di un concorso",
"大会プログラム",
"ein Turnierprogramm",
"برنامج مسابقة",
"一份比赛赛程",
"een wedstrijdprogramma",
"o programa de um concurso",
"ett tävlingsprogram",
"программа соревнования",
"program zawodów",
"대회 프로그램",
"برنامه یک مسابقه"
],
"un ordre de passage": [
"a start order",
"un orden de salida",
"un ordine di partenza",
"出場順",
"eine Starterliste",
"ترتيب انطلاق",
"一份出场顺序",
"een startvolgorde",
"uma ordem de partida",
"en startordning",
"порядок выступлений",
"kolejność startu",
"출전 순서",
"ترتیب اجرا"
],
"des résultats de concours": [
"show results",
"resultados de concurso",
"risultati di gara",
"大会の結果",
"Turnierergebnisse",
"نتائج مسابقة",
"比赛成绩",
"wedstrijduitslagen",
"resultados de concurso",
"tävlingsresultat",
"результаты соревнования",
"wyniki zawodów",
"대회 결과",
"نتایج مسابقه"
],
"un document": [
"a document",
"un documento",
"un documento",
"書類",
"ein Dokument",
"مستند",
"一份文件",
"een document",
"um documento",
"ett dokument",
"документ",
"dokument",
"문서",
"یک سند"
],
"Papiers du cheval": [
"Horse papers",
"Papeles del caballo",
"Documenti del cavallo",
"馬の書類",
"Pferdepapiere",
"أوراق الحصان",
"马匹证件",
"Paardenpapieren",
"Papéis do cavalo",
"Hästens papper",
"Документы лошади",
"Dokumenty konia",
"말 서류",
"مدارک اسب"
],
"envoie une photo, une capture d’écran ou un PDF": [
"send a photo, a screenshot or a PDF",
"envía una foto, una captura o un PDF",
"invia una foto, uno screenshot o un PDF",
"写真、スクリーンショット、PDFを送ってね",
"schick ein Foto, einen Screenshot oder ein PDF",
"أرسل صورة أو لقطة شاشة أو PDF",
"请发送照片、截图或 PDF",
"stuur een foto, screenshot of pdf",
"envia uma foto, uma captura ou um PDF",
"skicka en bild, skärmbild eller pdf",
"пришли фото, скриншот или PDF",
"wyślij zdjęcie, zrzut ekranu lub PDF",
"사진, 스크린샷, PDF를 보내 줘요",
"یک عکس، اسکرین‌شات یا PDF بفرست"
],
"connecte-toi d’abord": [
"log in first",
"inicia sesión primero",
"accedi prima",
"先にログインしてね",
"melde dich zuerst an",
"سجّل الدخول أولًا",
"请先登录",
"log eerst in",
"inicia sessão primeiro",
"logga in först",
"сначала войди в аккаунт",
"najpierw się zaloguj",
"먼저 로그인해 줘요",
"اول وارد شو"
],
"la lecture des documents est réservée aux abonnés Premium": [
"reading documents is for Premium members",
"la lectura de documentos es para suscriptores Premium",
"la lettura dei documenti è riservata agli abbonati Premium",
"書類の読み取りはPremium会員限定です",
"das Lesen von Dokumenten ist Premium-Mitgliedern vorbehalten",
"قراءة المستندات مخصّصة لمشتركي Premium",
"读取文件仅限 Premium 会员",
"documenten lezen is voor Premium-leden",
"a leitura de documentos é exclusiva dos assinantes Premium",
"dokumentläsning är för Premium-medlemmar",
"чтение документов доступно подписчикам Premium",
"odczyt dokumentów jest dla abonentów Premium",
"문서 읽기는 Premium 회원 전용이에요",
"خواندن اسناد مخصوص مشترکان Premium است"
],
"délai dépassé": [
"timed out",
"tiempo agotado",
"tempo scaduto",
"時間切れです",
"Zeit überschritten",
"انتهت المهلة",
"超时",
"tijd verstreken",
"tempo esgotado",
"tidsgränsen nåddes",
"время ожидания истекло",
"przekroczono czas",
"시간이 초과됐어요",
"زمان تمام شد"
],
"la base a refusé (droits sur ce cheval ?)": [
"the database refused (permissions on this horse?)",
"la base lo rechazó (¿permisos sobre este caballo?)",
"il database ha rifiutato (permessi su questo cavallo?)",
"保存が拒否されました（この馬の権限？）",
"die Datenbank hat abgelehnt (Rechte für dieses Pferd?)",
"رفضت القاعدة (صلاحيات هذا الحصان؟)",
"数据库拒绝了（对这匹马没有权限？）",
"de database weigerde (rechten op dit paard?)",
"a base recusou (permissões sobre este cavalo?)",
"databasen nekade (behörighet för hästen?)",
"база отказала (права на эту лошадь?)",
"baza odmówiła (uprawnienia do tego konia?)",
"저장이 거부됐어요(이 말에 대한 권한?)",
"پایگاه رد کرد (دسترسی به این اسب؟)"
],
"✓ Document rangé dans la page Santé de ": [
"✓ Document filed in the Health page of ",
"✓ Documento guardado en la página Salud de ",
"✓ Documento archiviato nella pagina Salute di ",
"✓ 健康ページに保存しました：",
"✓ Dokument abgelegt auf der Gesundheitsseite von ",
"✓ حُفظ المستند في صفحة صحة ",
"✓ 文件已归档到以下马匹的健康页：",
"✓ Document opgeslagen op de gezondheidspagina van ",
"✓ Documento guardado na página Saúde de ",
"✓ Dokumentet sparat på hälsosidan för ",
"✓ Документ сохранён на странице «Здоровье»: ",
"✓ Dokument zapisano na stronie Zdrowie: ",
"✓ 건강 페이지에 보관했어요: ",
"✓ سند در صفحه سلامت این اسب بایگانی شد: "
],
"ce cheval": [
"this horse",
"este caballo",
"questo cavallo",
"この馬",
"dieses Pferd",
"هذا الحصان",
"这匹马",
"dit paard",
"este cavalo",
"den här hästen",
"эта лошадь",
"ten koń",
"이 말",
"این اسب"
],
"✓ Soins enregistrés : ": [
"✓ Care saved: ",
"✓ Cuidados guardados: ",
"✓ Cure salvate: ",
"✓ 保存したケア：",
"✓ Gespeicherte Pflege: ",
"✓ العناية المحفوظة: ",
"✓ 已保存的护理：",
"✓ Opgeslagen verzorging: ",
"✓ Cuidados guardados: ",
"✓ Sparad vård: ",
"✓ Сохранено процедур: ",
"✓ Zapisane zabiegi: ",
"✓ 저장한 관리: ",
"✓ مراقبت‌های ثبت‌شده: "
],
"Refusés (droits sur ce cheval ?) : ": [
"Refused (permissions on this horse?): ",
"Rechazados (¿permisos sobre este caballo?): ",
"Rifiutati (permessi su questo cavallo?): ",
"拒否（この馬の権限？）：",
"Abgelehnt (Rechte für dieses Pferd?): ",
"مرفوضة (صلاحيات هذا الحصان؟): ",
"被拒绝（对这匹马没有权限？）：",
"Geweigerd (rechten op dit paard?): ",
"Recusados (permissões sobre este cavalo?): ",
"Nekade (behörighet för hästen?): ",
"Отклонено (права на эту лошадь?): ",
"Odrzucone (uprawnienia do tego konia?): ",
"거부됨(이 말에 대한 권한?): ",
"رد شده (دسترسی به این اسب؟): "
],
"Soin": [
"Care",
"Cuidado",
"Cura",
"ケア",
"Pflege",
"عناية",
"护理",
"Verzorging",
"Cuidado",
"Vård",
"Процедура",
"Zabieg",
"관리",
"مراقبت"
]
};
  function langue() { try { return window.__hypeLangue || "fr"; } catch (e) { return "fr"; } }
  function T(fr) { var lg = langue(); if (lg === "fr") return fr; var t = TXT[fr]; if (!t) return fr; var i = LG.indexOf(lg); return (i >= 0 && t[i]) || t[0] || fr; }

  function cssOutil() {
    if (document.getElementById("hype-outil-doc-css")) return;
    var st = document.createElement("style"); st.id = "hype-outil-doc-css";
    st.textContent = [
      ".hod-enc{max-width:640px;margin:28px auto 8px;padding:0 18px}",
      ".hod-carte{border:1px solid rgba(201,166,107,.3);border-radius:22px;overflow:hidden;background:#050605}",
      ".hod-ph{height:190px;position:relative;background:#000}",
      ".hod-ph img{width:100%;height:100%;object-fit:contain;object-position:center;display:block}",
      ".hod-ph:after{content:'';position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(180deg,transparent,#050605)}",
      ".hod-tx{padding:6px 20px 20px;text-align:center}",
      ".hod-k{font-family:'Cinzel',Georgia,serif;font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:" + OR + "}",
      ".hod-tx h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:26px;line-height:1.1;margin:8px 0 6px;color:#F3EEE4}",
      ".hod-tx p{font-size:12.5px;line-height:1.5;color:rgba(243,238,228,.72);margin:0 0 16px}",
      ".hod-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 18px;border:1px solid " + OR + ";border-radius:999px;color:" + OR + ";font:inherit;font-size:13px;background:transparent;cursor:pointer}",
      ".hod-btn:disabled{opacity:.45}",
      ".hod-btn.sec{border-color:rgba(243,238,228,.25);color:rgba(243,238,228,.75)}",
      ".hod-plus{margin-top:14px;font-size:12px;color:rgba(243,238,228,.6);cursor:pointer;background:none;border:none;font-family:inherit}",
      ".hod-plus span{color:" + OR + ";display:inline-block;transition:transform .2s}",
      ".hod-plus.ouv span{transform:rotate(180deg)}",
      ".hod-liste{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:14.5px;line-height:1.45;color:rgba(243,238,228,.62);margin:12px 4px 0}",
      ".hod-voile{position:fixed;inset:0;background:rgba(4,6,9,.72);z-index:9000;display:flex;align-items:flex-end;justify-content:center}",
      ".hod-feuille{width:100%;max-width:640px;max-height:88vh;overflow:auto;background:#050505;border-top:1px solid rgba(201,166,107,.35);border-radius:24px 24px 0 0;padding:16px 20px calc(26px + env(safe-area-inset-bottom));color:#F3EEE4;font-family:Montserrat,system-ui,sans-serif}",
      ".hod-poignee{width:42px;height:4px;border-radius:4px;background:rgba(243,238,228,.25);margin:0 auto 14px}",
      ".hod-titre{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:600;margin:6px 0 10px}",
      ".hod-note{font-size:12.5px;line-height:1.55;color:rgba(243,238,228,.7)}",
      ".hod-ta{width:100%;box-sizing:border-box;min-height:64px;margin-top:10px;padding:10px 12px;border-radius:14px;border:1px solid rgba(243,238,228,.16);background:rgba(255,255,255,.03);color:#F3EEE4;font:inherit;font-size:13.5px;resize:vertical}",
      ".hod-bloc{border-top:1px solid rgba(243,238,228,.08);padding:12px 0}",
      ".hod-q{margin-top:12px;padding:12px 14px;border:1px solid rgba(201,166,107,.35);border-radius:14px;font-size:13.5px;line-height:1.5;color:#E8D3A8}",
      ".hod-ligne{display:grid;grid-template-columns:22px 1fr;gap:8px;align-items:start;padding:9px 0;border-top:1px solid rgba(243,238,228,.06)}",
      ".hod-ligne select,.hod-ligne input[type=date]{background:rgba(255,255,255,.04);color:#F3EEE4;border:1px solid rgba(243,238,228,.16);border-radius:10px;padding:6px 8px;font:inherit;font-size:12.5px}",
      ".hod-ligne input[type=checkbox]{accent-color:#C9A66B;width:18px;height:18px;margin-top:2px}",
      ".hod-bas{display:flex;gap:10px;margin-top:16px}",
      ".hod-bas .hod-btn{flex:1}",
      ".hod-fil{display:flex;flex-direction:column;gap:8px;margin:6px 0 4px}",
      ".hod-bulle{max-width:86%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.5}",
      ".hod-bulle.hype{align-self:flex-start;background:rgba(255,255,255,.05);border:1px solid rgba(201,166,107,.28);border-bottom-left-radius:6px;color:#F3EEE4}",
      ".hod-bulle.moi{align-self:flex-end;background:rgba(201,166,107,.12);border:1px solid rgba(201,166,107,.35);border-bottom-right-radius:6px;color:#E8D3A8}",
      ".hod-err{margin-top:10px;font-size:12.5px;color:#E8A0A0}",
      ".hod-ok{margin-top:10px;font-size:13px;color:#96CDAA}",
      /* 13/11 22h41 (Blandine : « fais un effort sur le visuel ») : cartes des chevaux à créer / fiches à mettre à jour */
      ".hod-sec{margin-top:22px;border:1px solid rgba(201,166,107,.22);border-radius:20px;padding:16px 14px 14px;background:#0A0A0A}",
      ".hod-sec-h{display:flex;align-items:center;justify-content:space-between;gap:10px}",
      ".hod-sec-t{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:23px;line-height:1.1;color:#F3EEE4}",
      ".hod-pas{font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:.18em;color:" + OR + ";border:1px solid rgba(201,166,107,.5);border-radius:999px;padding:4px 10px;white-space:nowrap}",
      ".hod-sec-p{font-size:12.5px;line-height:1.55;color:rgba(243,238,228,.66);margin:8px 2px 4px}",
      ".hod-ch{display:flex;align-items:center;gap:12px;padding:10px 12px;margin-top:8px;border-radius:14px;background:#000;border:1px solid rgba(243,238,228,.08);cursor:pointer;transition:opacity .2s}",
      ".hod-ch.off{opacity:.42}",
      ".hod-av{flex:0 0 42px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(201,166,107,.55);overflow:hidden;display:flex;align-items:center;justify-content:center;background:#000;font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;color:" + OR + "}",
      ".hod-av img{width:100%;height:100%;object-fit:cover;display:block}",
      ".hod-chx{flex:1;min-width:0}",
      ".hod-chn{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:18.5px;line-height:1.15;color:#F3EEE4;overflow:hidden;text-overflow:ellipsis}",
      ".hod-chs{font-size:11.5px;color:rgba(243,238,228,.5);margin-top:2px;letter-spacing:.02em}",
      ".hod-tg{flex:0 0 26px;width:26px;height:26px;border-radius:50%;border:1px solid rgba(243,238,228,.28);display:flex;align-items:center;justify-content:center;color:transparent;font-size:14px;background:transparent}",
      ".hod-tg.on{border-color:" + OR + ";color:" + OR + "}",
      /* en-tête immersif : grand cheval noir entier sur fond noir, titre en bas à gauche, courbe dorée discrète */
      ".hod-hero{position:relative;margin:-16px -20px 10px;height:210px;background:#000;border-radius:24px 24px 0 0;overflow:hidden}",
      ".hod-hero img{position:absolute;right:0;top:0;height:100%;width:auto;max-width:100%;object-fit:contain;object-position:right center}",
      ".hod-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.55) 45%,rgba(0,0,0,0) 75%),linear-gradient(180deg,rgba(0,0,0,0) 55%,#050505 100%)}",
      ".hod-hero-t{position:absolute;left:20px;bottom:22px;right:40%;z-index:2}",
      ".hod-hero-t .hod-titre{margin:6px 0 0;font-size:27px;line-height:1.05}",
      ".hod-hero svg{position:absolute;left:0;right:0;bottom:8px;width:100%;height:40px;z-index:2}",
      ".hod-hero .hod-poignee{position:absolute;top:10px;left:50%;margin-left:-21px;z-index:3}",
      ".hod-fm{margin-top:10px;border-radius:16px;background:#000;border:1px solid rgba(243,238,228,.08);overflow:hidden}",
      ".hod-fm-h{display:flex;align-items:center;gap:12px;padding:12px 12px 10px}",
      ".hod-chg{display:flex;align-items:center;gap:12px;padding:10px 12px;border-top:1px solid rgba(243,238,228,.06);cursor:pointer;transition:opacity .2s}",
      ".hod-chg.off{opacity:.42}",
      ".hod-chg-l{font-family:'Cinzel',Georgia,serif;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(201,166,107,.85)}",
      ".hod-chg-v{margin-top:3px;font-size:14px;line-height:1.35;color:#F3EEE4;overflow-wrap:anywhere}",
      ".hod-chg-a{display:block;font-size:11.5px;color:rgba(243,238,228,.42);text-decoration:line-through;margin-top:2px}",
      ".hod-sel{width:100%;margin-top:6px;background:rgba(255,255,255,.04);color:#F3EEE4;border:1px solid rgba(243,238,228,.16);border-radius:12px;padding:10px 12px;font:inherit;font-size:13.5px}"
    ].join("\n");
    document.head.appendChild(st);
  }

  var TYPES_SOIN_FR = [["ferrure", "Maréchal (ferrure)"], ["parage", "Maréchal (parage)"], ["vermifuge", "Vermifuge"], ["vaccin", "Vaccin"], ["dentiste", "Dentiste"], ["osteopathe", "Ostéopathe"], ["veterinaire", "Vétérinaire"], ["traitement", "Traitement"], ["autre", "Autre soin"]];
  var TYPES_SOIN = TYPES_SOIN_FR;   /* libellés traduits à l'affichage : T(t[1]) */
  var NOMS_TYPE = { liste_soins: "une liste de soins", carnet_vaccins: "un carnet de vaccination", papiers_cheval: "les papiers du cheval (document d'identification)", ordonnance: "une ordonnance", facture: "une facture", programme: "le programme d'un concours", ordre_passage: "un ordre de passage", horaires_concours: "les horaires d'un concours", resultats: "des résultats de concours", mouvement_cheval: "l'arrivée ou le départ d'un cheval", liste_chevaux: "des chevaux à ajouter dans Hype", autre: "un document" };

  function norm(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function mvDe(lu) {
    var m = (lu && lu.mouvement) || {}; var d = /^\d{4}-\d{2}-\d{2}$/;
    return { sens: ["entree", "sortie", "sortie_provisoire"].indexOf(m.sens) >= 0 ? m.sens : "entree", date: d.test(String(m.date || "")) ? m.date : new Date().toISOString().slice(0, 10), date_retour: d.test(String(m.date_retour || "")) ? m.date_retour : "", lieu: String(m.lieu || ""), motif: String(m.motif || ""), nom: String((lu && lu.cheval) || "").trim() };
  }
  function trouverCheval(nom, chevaux, strict) {   /* strict (arrivée d'un cheval) : pas de rapprochement sur le seul premier mot — « Cooltax du Chênay » n'est pas « Cooltax de Virchel Z » */
    var n = norm(nom); if (!n) return null;
    var exact = null, part = null;
    (chevaux || []).forEach(function (c) {
      var noms = [c.nom, c.alias].filter(Boolean).map(norm);
      noms.forEach(function (x) { if (!x) return; if (x === n) exact = exact || c; else if (x.indexOf(n) >= 0 || n.indexOf(x) >= 0 || (!strict && x.split(" ")[0] === n.split(" ")[0])) part = part || c; });
    });
    return exact || part;
  }

  async function imagesDe(f) {
    var estPdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
    if (!estPdf && !/^image\//i.test(String(f.type || ""))) throw new Error(T("envoie une photo, une capture d’écran ou un PDF"));
    return estPdf ? (await hypePdfEnImages(f, 4, 2000)).images : ((typeof hypeImageEnBandes === "function") ? await hypeImageEnBandes(f, 2000) : [await hypeImageEnJpeg(f, 2000)]);
  }

  /* la lecture : comprendre le document, en extraire ce qui sert, ou poser une question */
  async function lireDocument(images, contexte, echanges) {
    var sess = await supa.auth.getSession();
    var sv = sess && sess.data && sess.data.session;
    if (!sv || !sv.access_token) throw new Error(T("connecte-toi d’abord"));
    var system = "Tu es l'outil de lecture de documents de Hype (application equestre). On te donne n'importe quel document : photo, capture d'ecran, PDF, parfois ecrit a la main, parfois tres brouillon. "
      + "1) Dis ce que c'est (type) parmi : liste_soins (dates de soins pour un ou plusieurs chevaux : marechal, vermifuge, vaccin, dentiste, osteopathe, veterinaire... meme une simple liste de noms de chevaux avec une consigne de la personne), carnet_vaccins (pages de vaccination d'un livret), papiers_cheval (document d'identification, SIRE, pedigree), ordonnance, facture, programme (programme d'un concours), ordre_passage (liste de depart d'un concours), resultats (resultats d'un concours), horaires_concours (horaires d'un concours donnes par la personne, ex. « depart 6h30, embarquement 7h, reco 8h pour la Club 3 »), mouvement_cheval (un cheval arrive a l'ecurie ou la quitte, pour le registre d'elevage : « Cirrus est arrive aujourd'hui, il vient de l'elevage X », « Ecolo est parti le 12 chez son nouveau proprietaire a Y », « Elfe part en stage du 3 au 5 a Z » ; aussi un contrat de vente, de pret ou de pension qui dit une arrivee ou un depart), liste_chevaux (la personne demande d'ajouter des chevaux ou de leur creer une fiche, ex. « les engagements sont sortis, ajoute les nouveaux chevaux », ou une simple liste de chevaux), autre. Parfois il n'y a AUCUNE image : seulement ce que la personne dit ou ecrit ; lis alors sa phrase. "
      + "2) Extrais ce qui sert. 3) Si tu as un VRAI doute (type, cheval, date, soin), pose UNE question courte et precise a la personne, en la tutoyant (ex. « Est-ce bien les dates de marechalerie de Cirrus, Ecolo et Elfe ? »). Tiens compte de ce que la personne a deja repondu. "
      + "Chevaux de la personne (pour reconnaitre les noms, meme mal ecrits) : " + JSON.stringify((contexte.chevaux || []).slice(0, 150).map(function (c) { return c.nom + (c.alias ? " (" + c.alias + ")" : ""); })) + ". "
      + (contexte.cheval ? "La personne est sur la page du cheval : " + contexte.cheval + ". " : "")
      + (contexte.concours ? "La personne est sur la page d'un concours. " : "")
      + "Ecris resume et question dans cette langue (code) : " + langue() + ". "
      + "Date du jour : " + new Date().toISOString().slice(0, 10) + ". Si l'annee n'est pas ecrite, prends la plus logique (jamais dans le futur pour un soin deja fait). "
      + "Tu parles avec la personne comme un assistant attentionne et precis : phrases naturelles et correctes, tutoiement, ni familier ni enfantin. Si elle te pose une question ou te corrige, reponds-lui vraiment. "
      + "Reponds UNIQUEMENT en JSON : {\"message\":\"ta reponse a la personne, 1 a 3 phrases : ce que tu as compris et ce que tu vas faire ; si tu as un doute, termine par ta question\",\"type\":\"...\",\"resume\":\"une phrase simple qui dit ce que tu as compris\",\"question\":\"ta question s'il y a un doute, sinon vide\","
      + "\"cheval\":\"nom du cheval concerne si un seul, sinon vide\",\"soins\":[{\"cheval\":\"nom\",\"soin\":\"ferrure|parage|vermifuge|vaccin|dentiste|osteopathe|veterinaire|traitement|autre\",\"date\":\"AAAA-MM-JJ ou vide\",\"detail\":\"precision courte ou vide\"}],"
      + "\"horaires\":{\"depart\":\"HHhMM ou vide\",\"embarquement\":\"HHhMM ou vide\",\"lignes\":[{\"type\":\"reco|debut|autre\",\"epreuve\":\"nom de l'epreuve (ex. Club 3) ou vide\",\"heure\":\"HHhMM\",\"lib\":\"libelle si autre, sinon vide\"}]},"
      + "\"papiers\":{\"sire\":\"\",\"ueln\":\"\",\"puce\":\"numero de transpondeur (15 chiffres) ou vide\",\"proprietaire\":\"nom du ou des proprietaires ou vide\",\"naissance\":\"AAAA-MM-JJ ou vide\",\"sexe\":\"\",\"robe\":\"\",\"race\":\"\",\"pere\":\"\",\"mere\":\"\",\"naisseur\":\"\"},"
      + "\"mouvement\":{\"sens\":\"entree|sortie|sortie_provisoire\",\"date\":\"AAAA-MM-JJ ou vide\",\"date_retour\":\"AAAA-MM-JJ ou vide (seulement sortie_provisoire)\",\"lieu\":\"d'ou il vient (entree) ou ou il va (sortie), adresse ou nom, ou vide\",\"motif\":\"achat, pret, pension, naissance... (entree) ; vente, pret, retour proprietaire, retraite, deces... (sortie) ; concours, stage, veterinaire, clinique, saillie... (sortie_provisoire) ; ou vide\"},"
      + "\"chevaux_liste\":[{\"nom\":\"nom exact du cheval tel qu'ecrit (orthographe officielle du document)\",\"sire\":\"numero SIRE s'il est ecrit, sinon vide\",\"pere\":\"\",\"mere\":\"\",\"naissance\":\"AAAA-MM-JJ ou annee seule ou vide\",\"sexe\":\"\",\"robe\":\"\",\"race\":\"\"}]}. "
      + "soins : seulement pour liste_soins (une ligne par cheval et par soin). papiers : seulement pour papiers_cheval. chevaux_liste : TOUS les chevaux nommes dans le document ou par la personne (engagements, ordre de passage, programme, resultats, liste…), un par cheval, sans doublon, avec tout ce que le document dit de lui (SIRE, pere, mere, naissance, sexe, robe, race ; vide si absent) ; vide sinon. mouvement : seulement pour mouvement_cheval (sortie = depart definitif ; sortie_provisoire = il reviendra ; « aujourd'hui » = date du jour ; un cheval qui ARRIVE peut ne pas etre dans la liste : c'est normal, mets son nom exact dans cheval sans poser de question, sa fiche sera creee). horaires : seulement pour horaires_concours (« reco » = reconnaissance ; « depart » = depart de l'ecurie). N'invente RIEN : ce qui est illisible reste vide.";
    var blocs = (images || []).map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
    var txt = !(images && images.length) ? "Pas de document : voici ce que la personne dit." : images.length > 1 ? "Ces images sont les pages d'un meme document." : "Voici le document.";
    if (contexte.note) txt += " La personne precise : « " + contexte.note + " ».";
    if ((echanges || []).length) { txt += " Votre conversation jusqu'ici :"; echanges.forEach(function (e) { txt += " Toi : « " + e.q + " ». La personne : « " + e.r + " »."; }); txt += " Tiens compte de tout, et reponds a son dernier message."; }
    blocs.push({ type: "text", text: txt });
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
      if (!fini) throw new Error(T("délai dépassé"));
      if (fini.statut !== "termine") throw new Error((fini.erreur_code || "erreur") + " " + (fini.erreur_message || ""));
      texte = String(fini.resultat || "");
    } else if (rep.ok && data && data.ok && data.content) {
      texte = (data.content || []).map(function (b) { return (b && b.text) || ""; }).join("");
    } else {
      if (data && data.code === "PREMIUM_REQUIRED") throw new Error(T("la lecture des documents est réservée aux abonnés Premium"));
      throw new Error("HTTP " + rep.status + " " + ((data && (data.code || data.message)) || ""));
    }
    var m = texte.match(/\{[\s\S]*\}/);
    var o = JSON.parse(m ? m[0] : texte) || {};
    return { message: String(o.message || "").trim(), horaires: o.horaires || {}, type: String(o.type || "autre"), resume: String(o.resume || ""), question: String(o.question || "").trim(), cheval: String(o.cheval || ""), soins: Array.isArray(o.soins) ? o.soins : [], papiers: o.papiers || {}, mouvement: o.mouvement || {}, chevaux_liste: Array.isArray(o.chevaux_liste) ? o.chevaux_liste : [] };
  }


  /* 13/11 21h21 (Blandine : « donner la parole à l'outil unique, qu'on puisse communiquer en vocal avec ») : bouton micro.
     Reconnaissance vocale du navigateur quand elle existe (Safari / Chrome) ; sinon on invite à utiliser le micro du clavier. */
  function Micro(props) {
    var _a = React.useState(false); var actif = _a[0], setActif = _a[1];
    var refR = React.useRef(null);
    var SR = (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
    function basculer() {
      if (!SR) { props.aide && props.aide(T("Touche le micro du clavier pour parler.")); return; }
      if (actif && refR.current) { try { refR.current.stop(); } catch (e) { } return; }
      try {
        var r = new SR(); refR.current = r;
        var lg = langue(); r.lang = ({ fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-PT", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR", fa: "fa-IR" })[lg] || "fr-FR";
        r.interimResults = false; r.continuous = false;
        r.onresult = function (ev) { var t = ""; for (var i = 0; i < ev.results.length; i++) t += ev.results[i][0].transcript; if (t) props.texte(t); };
        r.onend = function () { setActif(false); }; r.onerror = function () { setActif(false); };
        r.start(); setActif(true);
      } catch (eS) { setActif(false); props.aide && props.aide(T("Touche le micro du clavier pour parler.")); }
    }
    return h("button", { type: "button", className: "hod-btn" + (actif ? "" : " sec"), onClick: basculer, "aria-label": T("Parler"), style: { flex: "0 0 auto", padding: "10px 14px" } }, actif ? "● " + T("J’écoute…") : "🎙 " + T("Parler"));
  }

  function Feuille(props) {
    var app = (typeof useApp === "function") ? useApp() : {};
    var _e = React.useState({ etape: "choix", note: "", fichier: null, images: null, lu: null, echanges: [], fil: [], reponse: "", lignes: [], chevalId: "", err: "", ok: "", busy: false });
    var st = _e[0], setSt = _e[1];
    function maj(o) { setSt(function (x) { return Object.assign({}, x, o); }); }
    var refFic = React.useRef(null);
    var chevaux = props.chevaux || [];
    /* écuries de la personne (profil : ecurie, ecurie2) — pour rattacher un cheval qui arrive et dont on crée la fiche */
    var _cl = React.useState([]), mesClubs = _cl[0], setMesClubs = _cl[1];
    /* 13/11 22h29 (Blandine : « 36 de ces chevaux n'ont pas encore leur fiche, est-ce que tu m'autorises à les créer… même en vocal :
       les engagements sont sortis, ajoute les nouveaux chevaux et crée-leur une fiche ») : création en série, avec accord */
    var _nv = React.useState({ off: {}, club: "", busy: false, ok: "", err: "" }), nv = _nv[0], setNv = _nv[1];
    var _es = React.useState([]), engSans = _es[0], setEngSans = _es[1];
    React.useEffect(function () {
      if (!st.lu || !props.concoursId) return;
      supa.from("concours_engagements").select("cheval1_id, cheval1_nom, cheval2_id, cheval2_nom").eq("agenda_id", props.concoursId).then(function (r) {
        var l = []; ((r && !r.error && r.data) || []).forEach(function (e) { if (e.cheval1_nom && !e.cheval1_id) l.push(e.cheval1_nom); if (e.cheval2_nom && !e.cheval2_id) l.push(e.cheval2_nom); });
        setEngSans(l);
      });
    }, [st.lu, props.concoursId]);
    React.useEffect(function () {
      if (!st.lu || mesClubs.length) return;
      try { (typeof monProfil === "function" ? monProfil() : Promise.resolve(null)).then(function (r) { var p = (r && r.data) || {}; var l = [p.ecurie, p.ecurie2].map(function (x) { return String(x || "").trim(); }).filter(function (x, i, a) { return x && x !== "__perso__" && a.indexOf(x) === i; }); setMesClubs(l); }); } catch (e) { }
    }, [st.lu]);

    async function lire(f, echanges, noteForce) {
      var noteL = (noteForce != null) ? noteForce : st.note;
      setSt(function (x) { return Object.assign({}, x, { etape: (x.etape === "compris") ? "compris" : "lecture", reflechit: true, err: "", ok: "" }); });
      try {
        var src = f || st.fichier;
        var imgs = st.images && !f ? st.images : (src ? await imagesDe(src) : []);
        if (!imgs.length && !String(noteL || "").trim()) throw new Error(T("dis-moi ce que tu veux enregistrer, ou donne un document"));
        var lu = await lireDocument(imgs, { chevaux: chevaux, cheval: props.chevalNom, concours: !!props.concoursId, note: noteL }, echanges || st.echanges);
        var lignes = (lu.soins || []).map(function (s, i) {
          var c = trouverCheval(s.cheval, chevaux);
          var soin = TYPES_SOIN.some(function (t) { return t[0] === s.soin; }) ? s.soin : "autre";
          return { k: "l" + i, nomLu: String(s.cheval || ""), chevalId: c ? c.id : "", soin: soin, date: /^\d{4}-\d{2}-\d{2}$/.test(String(s.date || "")) ? s.date : "", detail: String(s.detail || ""), coche: !!c && /^\d{4}-\d{2}-\d{2}$/.test(String(s.date || "")) };
        });
        var c1 = trouverCheval(lu.cheval, chevaux, lu.type === "mouvement_cheval" && (!lu.mouvement || lu.mouvement.sens === "entree" || !lu.mouvement.sens));
        var dit = lu.message || [lu.resume, lu.question].filter(Boolean).join(" ");
        setSt(function (x) { return Object.assign({}, x, { etape: "compris", images: imgs, lu: lu, lignes: lignes, mv: mvDe(lu), chevalId: (c1 && c1.id) || ((lu.type === "mouvement_cheval" && String(lu.cheval || "").trim()) ? "" : (x.chevalId || props.chevalId || "")), reponse: "", reflechit: false, fil: x.fil.concat(dit ? [{ qui: "hype", t: dit }] : []) }); });
      } catch (eL) { setSt(function (x) { return Object.assign({}, x, { etape: x.etape === "compris" ? "compris" : "choix", reflechit: false, err: T("Lecture impossible : ") + String((eL && eL.message) || eL) }); }); }
    }
    function choisir(e) {
      var f = e && e.target && e.target.files && e.target.files[0];
      try { e.target.value = ""; } catch (eV) { }
      if (!f) return;
      setSt(function (x) { return Object.assign({}, x, { fichier: f, images: null, echanges: [], fil: [{ qui: "moi", t: "📎 " + (f.name || T("Document")) + (String(x.note || "").trim() ? " — " + x.note : "") }] }); });
      setTimeout(function () { lire(f, []); }, 0);
    }
    function repondre(texte) {
      var r = String((typeof texte === "string" ? texte : st.reponse) || "").trim(); if (!r) return;
      var ech = st.echanges.concat([{ q: (st.lu && (st.lu.message || st.lu.question)) || "", r: r }]);
      setSt(function (x) { return Object.assign({}, x, { echanges: ech, fil: x.fil.concat([{ qui: "moi", t: r }]) }); });
      lire(null, ech);
    }

    /* 13/11 21h38 (Blandine : « qu'il soit capable de parler… comme quand j'appelle Claude ou ChatGPT », niveau 1 choisi) :
       🎧 MODE CONVERSATION À LA VOIX — Hype LIT ses réponses (voix du téléphone, langue de la personne) puis, quand il a fini,
       se REMET À ÉCOUTER tout seul ; ce qu'on dit part directement (pas besoin de toucher « Envoyer »). Si l'écoute automatique
       n'est pas permise (iPhone, appli installée), il parle quand même et on touche 🎙 pour répondre. */
    var _vx = React.useState(false); var voix = _vx[0], setVoix = _vx[1];
    var refVoix = React.useRef(false); refVoix.current = voix;
    var _ec = React.useState(false); var ecoute = _ec[0], setEcoute = _ec[1];
    var refDit = React.useRef(0);
    var CODES = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-SA", zh: "zh-CN", nl: "nl-NL", pt: "pt-PT", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR", fa: "fa-IR" };
    function dire(t, puis) {
      try {
        var ss = window.speechSynthesis; if (!ss || !t) { if (puis) puis(); return; }
        ss.cancel();
        var u = new SpeechSynthesisUtterance(String(t).replace(/[«»“”]/g, ""));
        var code = CODES[langue()] || "fr-FR"; u.lang = code; u.rate = 1.02;
        try { var vs = ss.getVoices() || []; var v = vs.filter(function (x) { return String(x.lang || "").toLowerCase().indexOf(code.slice(0, 2).toLowerCase()) === 0; }); var bonne = v.filter(function (x) { return /premium|enhanced|amélioré|siri/i.test(x.name || ""); })[0] || v[0]; if (bonne) u.voice = bonne; } catch (eV) { }
        u.onend = function () { if (puis) puis(); }; u.onerror = function () { if (puis) puis(); };
        ss.speak(u);
      } catch (eS) { if (puis) puis(); }
    }
    function ecouter() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR || !refVoix.current) return;
      try {
        var r = new SR(); r.lang = CODES[langue()] || "fr-FR"; r.interimResults = false; r.continuous = false;
        r.onresult = function (ev) { var t = ""; for (var i = 0; i < ev.results.length; i++) t += ev.results[i][0].transcript; t = String(t || "").trim(); if (t) envoyerVoix(t); };
        r.onend = function () { setEcoute(false); }; r.onerror = function () { setEcoute(false); };
        r.start(); setEcoute(true);
      } catch (eE) { setEcoute(false); }
    }
    function envoyerVoix(t) {
      setSt(function (x) {
        if (x.etape === "compris") { setTimeout(function () { repondre(t); }, 0); return x; }
        if (x.etape === "choix") { setTimeout(function () { lire(null, [], t); }, 0); return Object.assign({}, x, { note: t, fichier: null, images: [], echanges: [], fil: [{ qui: "moi", t: t }] }); }
        return x;
      });
    }
    function basculerVoix() {
      var v = !voix; setVoix(v); refVoix.current = v;
      try { if (window.speechSynthesis) { if (v) { var u0 = new SpeechSynthesisUtterance(" "); window.speechSynthesis.speak(u0); } else window.speechSynthesis.cancel(); } } catch (e0) { }
      if (v) {
        var dernier = (st.fil || []).filter(function (m) { return m.qui === "hype"; }).slice(-1)[0];
        if (st.etape === "compris" && dernier) dire(dernier.t, ecouter);
        else if (st.etape === "choix") dire(T("Je t’écoute."), ecouter);
      }
    }
    React.useEffect(function () {
      var n = (st.fil || []).length; if (!n || n === refDit.current) return; refDit.current = n;
      var m = st.fil[n - 1];
      if (m && m.qui === "hype" && refVoix.current) dire(m.t, ecouter);
    }, [st.fil]);
    React.useEffect(function () { return function () { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { } }; }, []);
    function boutonVoix() {
      return h("button", { type: "button", className: "hod-btn" + (voix ? "" : " sec"), onClick: basculerVoix, style: { width: "100%", marginTop: 10 } },
        voix ? (ecoute ? "● " + T("Je t’écoute…") : "🎧 " + T("Conversation à la voix : activée")) : "🎧 " + T("Parler avec Hype"));   /* 13/11 22h14 (Blandine) : « à la voix » retiré, redondant */
    }

    async function enregistrerSoins() {
      var sel = st.lignes.filter(function (l) { return l.coche && l.chevalId && l.date; });
      if (!sel.length) { maj({ err: T("Coche au moins une ligne avec un cheval et une date.") }); return; }
      maj({ busy: true, err: "" });
      var ok = 0, refus = 0, dernier = {};
      sel.forEach(function (l) { var k = l.chevalId + "|" + l.soin; if (!dernier[k] || l.date > dernier[k]) dernier[k] = l.date; });
      for (var i = 0; i < sel.length; i++) {
        var l = sel[i];
        try {
          var lig = { cheval_id: l.chevalId, type: l.soin, titre: (TYPES_SOIN.filter(function (t) { return t[0] === l.soin; })[0] || ["", T("Soin")])[1] + (l.detail ? " — " + l.detail : ""), date_intervention: l.date, details: { import: "outil-document" } };
          if (dernier[l.chevalId + "|" + l.soin] === l.date && typeof hypeImportProchaine === "function") { var p = hypeImportProchaine(l.soin, l.date); if (p) lig.date_prochaine = p; }
          var r = await supa.from("soins_cheval").insert(lig).select("id");
          if (r && !r.error && r.data && r.data.length) ok++; else refus++;
        } catch (eI) { refus++; }
      }
      maj({ busy: false, etape: "fini", ok: T("✓ Soins enregistrés : ") + ok + (refus ? " · " + T("Refusés (droits sur ce cheval ?) : ") + refus : "") });
    }
    /* 13/11 21h13 (étape b) : PAPIERS DU CHEVAL → compléter la fiche. On lit la fiche actuelle (origines, race, age) du cheval
       choisi ; chaque info lue est proposée : cochée d'office si la fiche est vide, décochée + « différent » si la fiche a déjà
       autre chose (Blandine : rien n'est écrasé sans son accord). Enregistrement par hypeMajOriginesCheval (même chemin que
       la fiche cheval : mise à jour directe, sinon fonction de la base), race et âge actuels renvoyés tels quels. */
    var _fc = React.useState(null); var fiche = _fc[0], setFiche = _fc[1];
    var _ck = React.useState({}); var coches = _ck[0], setCoches = _ck[1];
    function champsPapiers(p, f) {
      var o = (f && f.origines && typeof f.origines === "object") ? f.origines : {};
      function nomDe(x) { return x && typeof x === "object" ? String(x.nom || "") : String(x || ""); }
      return [
        ["sire", T("N° SIRE"), String(o.sire || ""), String(p.sire || "").replace(/\s+/g, "").toUpperCase()],
        ["naissance", T("Naissance"), String(o.naissance || ""), /^\d{4}-\d{2}-\d{2}$/.test(String(p.naissance || "")) ? p.naissance : ""],
        ["sexe", T("Sexe"), String(o.sexe || ""), String(p.sexe || "").toLowerCase()],
        ["robe", T("Robe"), String(o.robe || ""), String(p.robe || "").toLowerCase()],
        ["race", T("Race"), String((f && f.race) || ""), String(p.race || "")],
        ["pere", T("Père"), nomDe(o.pere), String(p.pere || "")],
        ["mere", T("Mère"), nomDe(o.mere), String(p.mere || "")],
        ["naisseur", T("Naisseur"), String(o.naisseur || ""), String(p.naisseur || "")],
        ["puce", T("N° de puce"), String(((f && f.reg) || {}).puce || ""), (f && f.clefReg && f.regLisible) ? String(p.puce || "").replace(/\s+/g, "") : ""],
        ["proprietaire", T("Propriétaire"), String(((f && f.reg) || {}).proprietaire || ""), (f && f.clefReg && f.regLisible) ? String(p.proprietaire || "") : ""]
      ].filter(function (c) { return c[3]; }).map(function (c) {
        var pareil = norm(c[2]) === norm(c[3]);
        return { k: c[0], lib: c[1], fiche: c[2], lu: c[3], pareil: pareil, diff: !!c[2] && !pareil };
      });
    }
    React.useEffect(function () {
      if (!st.lu || st.lu.type !== "papiers_cheval" || !st.chevalId) { setFiche(null); return; }
      var vif = true;
      supa.from("chevaux").select("id, nom, race, age, origines, club").eq("id", st.chevalId).maybeSingle().then(async function (r) {
        if (!vif) return;
        var f = (r && !r.error && r.data) || null;
        /* 13/11 21h43 (Blandine : « faire en sorte qu'ils remplissent la table du registre ») : la ligne du registre des chevaux
           de son écurie (registre_chevaux, clé = écurie du cheval + cheval) — n° de puce et propriétaire viennent des papiers */
        if (f && String(f.club || "").trim()) {
          f.clefReg = (typeof clefClubG === "function") ? clefClubG(f.club) : String(f.club).toLowerCase().trim();
          try { var rg = await supa.from("registre_chevaux").select("*").eq("club_clef", f.clefReg).eq("cheval_id", f.id).maybeSingle(); f.reg = (rg && !rg.error && rg.data) || {}; f.regLisible = !!(rg && !rg.error); } catch (eR) { f.reg = {}; }
        }
        if (!vif) return;
        setFiche(f);
        var ck = {}; champsPapiers(st.lu.papiers || {}, f).forEach(function (c) { ck[c.k] = !c.pareil && !c.diff; }); setCoches(ck);
      });
      return function () { vif = false; };
    }, [st.chevalId, st.lu]);
    async function completerFiche() {
      if (!fiche) return true;
      var tous = champsPapiers((st.lu && st.lu.papiers) || {}, fiche).filter(function (c) { return coches[c.k] && !c.pareil; });
      if (!tous.length) return true;
      /* registre des chevaux de l'écurie : puce, propriétaire (+ SIRE recopié s'il est lu) */
      var reg = tous.filter(function (c) { return c.k === "puce" || c.k === "proprietaire"; });
      var champs = tous.filter(function (c) { return c.k !== "puce" && c.k !== "proprietaire"; });
      if (reg.length && fiche.clefReg) {
        var lig = { club_clef: fiche.clefReg, cheval_id: fiche.id };
        reg.forEach(function (c) { lig[c.k] = c.lu; });
        var sireLu = tous.filter(function (c) { return c.k === "sire"; })[0]; if (sireLu) lig.sire = sireLu.lu;
        var rr = await supa.from("registre_chevaux").upsert(lig, { onConflict: "club_clef,cheval_id" }).select("cheval_id");
        if (!rr || rr.error || !rr.data || !rr.data.length) throw new Error(T("la base a refusé (droits sur ce cheval ?)"));
      }
      if (!champs.length) return reg.length;
      var o = Object.assign({}, (fiche.origines && typeof fiche.origines === "object") ? fiche.origines : {});
      var race = fiche.race || null;
      champs.forEach(function (c) {
        if (c.k === "race") race = c.lu;
        else if (c.k === "pere" || c.k === "mere") o[c.k] = Object.assign({}, (o[c.k] && typeof o[c.k] === "object") ? o[c.k] : {}, { nom: c.lu });
        else o[c.k] = c.lu;
      });
      var r = (typeof hypeMajOriginesCheval === "function") ? await hypeMajOriginesCheval(fiche.id, { origines: o, race: race, age: fiche.age == null ? null : fiche.age })
        : await supa.from("chevaux").update({ origines: o, race: race }).eq("id", fiche.id).select("id");
      if (!r || r.error || !r.data || !r.data.length) throw new Error(T("la base a refusé (droits sur ce cheval ?)"));
      return champs.length + reg.length;
    }
    async function rangerDoc(typeDoc) {
      var f = st.fichier; var chId = st.chevalId;
      if (!f || !chId) { maj({ err: T("Choisis le cheval concerné.") }); return; }
      maj({ busy: true, err: "" });
      var nbFiche = 0;
      try {
        if (st.lu && st.lu.type === "papiers_cheval") nbFiche = await completerFiche();
        var ext = (String(f.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (/pdf/i.test(f.type) ? "pdf" : "jpg");
        var chemin = String(chId) + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
        var up = await supa.storage.from("sante").upload(chemin, f, { contentType: f.type || undefined, upsert: false });
        if (up && up.error) throw up.error;
        var titre = typeDoc === "autre" && st.lu && st.lu.type === "papiers_cheval" ? "Papiers du cheval" : null;
        var r = await supa.from("cheval_documents").insert({ cheval_id: chId, type: typeDoc, titre: titre, date_doc: new Date().toISOString().slice(0, 10), chemin: chemin, mime: f.type || null, taille: f.size || null }).select("id");
        if ((r && r.error) || !r || !r.data || !r.data.length) { try { await supa.storage.from("sante").remove([chemin]); } catch (eR) { } throw (r && r.error) || new Error(T("la base a refusé (droits sur ce cheval ?)")); }
        maj({ busy: false, etape: "fini", ok: (typeof nbFiche === "number" && nbFiche > 0 ? T("✓ Fiche du cheval complétée : ") + nbFiche + ". " : "") + T("✓ Document rangé dans la page Santé de ") + ((chevaux.filter(function (c) { return c.id === chId; })[0] || {}).nom || T("ce cheval")) + "." });
      } catch (eD) { maj({ busy: false, err: T("Pas rangé : ") + String((eD && eD.message) || eD) }); }
    }
    /* horaires dictés ou lus → club_agenda (même forme que le formulaire « Modifier les horaires » de la fiche concours :
       horaires [{type, ep, lib, heure}], recos recopiées pour les rappels, heure_epreuve = 1er début ; départ / embarquement).
       Une ligne déjà présente pour le même type + même épreuve est REMPLACÉE ; les autres sont gardées. */
    function hMin(t) { var m = String(t || "").toLowerCase().match(/(\d{1,2})\s*[h:]\s*(\d{0,2})/); return m ? Number(m[1]) * 60 + Number(m[2] || 0) : null; }
    function hFmt(t) { var n = hMin(t); if (n == null) return ""; return Math.floor(n / 60) + "h" + String(n % 60).padStart(2, "0"); }
    async function enregistrerHoraires() {
      var hz = (st.lu && st.lu.horaires) || {}; if (!props.concoursId) return;
      maj({ busy: true, err: "" });
      try {
        var ra = await supa.from("club_agenda").select("id, horaires, heure_depart, heure_embarquement").eq("id", props.concoursId).maybeSingle();
        if (!ra || ra.error || !ra.data) throw new Error(T("la base a refusé (droits sur ce cheval ?)"));
        var anc = Array.isArray(ra.data.horaires) ? ra.data.horaires.slice() : [];
        (Array.isArray(hz.lignes) ? hz.lignes : []).forEach(function (x) {
          var heure = hFmt(x.heure); if (!heure) return;
          var type = ["reco", "debut", "autre"].indexOf(x.type) >= 0 ? x.type : "autre", ep = String(x.epreuve || "").trim() || null;
          var lig = { type: type, ep: ep, lib: type === "autre" ? (String(x.lib || "").trim() || null) : null, heure: heure };
          var i = anc.findIndex(function (a) { return a && a.type === type && norm(a.ep || "") === norm(ep || "") && (type !== "autre" || norm(a.lib || "") === norm(lig.lib || "")); });
          if (i >= 0) anc[i] = lig; else anc.push(lig);
        });
        var recos = anc.filter(function (x) { return x.type === "reco"; }).map(function (x) { return { ep: x.ep || "", heure: x.heure }; });
        var deb = anc.filter(function (x) { return x.type === "debut"; }).map(function (x) { return x.heure; }).sort(function (a, b) { return hMin(a) - hMin(b); })[0] || null;
        var upd = { horaires: anc.length ? anc : null, recos: recos.length ? recos : null, heure_reco: null, heure_epreuve: deb };
        if (hFmt(hz.depart)) upd.heure_depart = hFmt(hz.depart);
        if (hFmt(hz.embarquement)) upd.heure_embarquement = hFmt(hz.embarquement);
        var r = await supa.from("club_agenda").update(upd).eq("id", props.concoursId).select("id");
        if (!r || r.error || !r.data || !r.data.length) throw new Error(T("la base a refusé (droits sur ce cheval ?)"));
        maj({ busy: false, etape: "fini", ok: T("✓ Horaires enregistrés dans la fiche du concours.") });
      } catch (eH) { maj({ busy: false, err: T("Pas enregistré : ") + String((eH && eH.message) || eH) }); }
    }
    function allerCarnet() {
      var c = chevaux.filter(function (x) { return x.id === st.chevalId; })[0];
      if (!c) { maj({ err: T("Choisis le cheval concerné.") }); return; }
      try { window.__santeCheval = { id: c.id, nom: c.nom || "" }; window.__carnetFichier = st.fichier; } catch (e) { }
      props.fermer(); if (app.setEcran) app.setEcran("sante-cheval");
    }
    function allerConcours(type) {
      if (!props.concoursId) { maj({ err: T("Ouvre d’abord la fiche du concours, puis redonne-moi le document en bas de la page.") }); return; }
      try {
        window.__concoursId = props.concoursId; window.__engagementsId = props.concoursId;
        if (type === "ordre_passage") window.__ordreFichier = st.fichier; else window.__progFichier = st.fichier;
      } catch (e) { }
      props.fermer(); if (app.setEcran) app.setEcran(type === "ordre_passage" ? "engagements" : "jour-j");
    }

    /* 13/11 22h07 (Blandine : « quand un cheval entre ou quitte l'écurie… on est obligé de le signaler sur le registre d'élevage ») :
       arrivée → registre_chevaux (date_entree, provenance, motif dans provenance) ; départ définitif → registre_chevaux
       (date_sortie, motif_sortie, destination) ; sortie provisoire (concours, stage, véto…) → registre_mouvements, comme la page Registre. */
    /* 13/11 22h35 (Blandine : « des noms mal orthographiés… dès qu'il te donne des justificatifs… tu mets tout à jour sur la fiche » ;
       « tu peux faire confirmer : est-ce que tu m'autorises à changer Cooltax de Vego pour Cooltax de Vegan, numéro SIRE… ») :
       chaque cheval cité qui a déjà une fiche (même mal écrite) → proposition de mise à jour, changement par changement. */
    function proche(nom) {
      var n = norm(nom); if (!n) return null;
      var ex = trouverCheval(nom, chevaux, true); if (ex) return { c: ex, flou: norm(ex.nom) !== n };
      var best = null, bs = 0;
      chevaux.forEach(function (c) { var x = norm(c.nom); if (!x) return; var r = ressemblance(x, n); if (r > bs) { bs = r; best = c; } });
      return (best && bs >= 0.8) ? { c: best, flou: true } : null;
    }
    function ressemblance(a, b) {
      if (a === b) return 1; var la = a.length, lb = b.length; if (!la || !lb) return 0;
      var d = []; for (var i = 0; i <= la; i++) { d[i] = [i]; } for (var j = 1; j <= lb; j++) d[0][j] = j;
      for (i = 1; i <= la; i++) for (j = 1; j <= lb; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      return 1 - d[la][lb] / Math.max(la, lb);
    }
    var _fm = React.useState({}), fichesMaj = _fm[0], setFichesMaj = _fm[1];
    var _mj = React.useState({ off: {}, busy: false, ok: "", err: "", fait: false }), mj = _mj[0], setMj = _mj[1];
    React.useEffect(function () {
      var lu = st.lu; if (!lu || !(lu.chevaux_liste || []).length || lu.type === "mouvement_cheval" || lu.type === "papiers_cheval") return;
      var ids = []; (lu.chevaux_liste || []).forEach(function (x) { var p = proche((x && x.nom) || ""); if (p && ids.indexOf(p.c.id) < 0) ids.push(p.c.id); });
      if (!ids.length) return;
      try { supa.from("chevaux").select("id, nom, race, age, origines, photo_url, user_id").in("id", ids.slice(0, 200)).then(function (r) { var m = {}; ((r && !r.error && r.data) || []).forEach(function (c) { m[c.id] = c; }); setFichesMaj(m); }, function () { }); } catch (eF) { }
    }, [st.lu]);
    var CHAMPS_MAJ = [["sire", "N° SIRE"], ["naissance", "Naissance"], ["sexe", "Sexe"], ["robe", "Robe"], ["race", "Race"], ["pere", "Père"], ["mere", "Mère"]];
    function propositions() {
      var lu = st.lu || {}; if (lu.type === "mouvement_cheval" || lu.type === "papiers_cheval") return [];
      var out = [], vus = {};
      (lu.chevaux_liste || []).forEach(function (x) {
        if (!x || !x.nom) return; var p = proche(x.nom); if (!p) return; var f = fichesMaj[p.c.id]; if (!f || vus[f.id]) return; vus[f.id] = 1;
        var o = (f.origines && typeof f.origines === "object") ? f.origines : {};
        var ch = [];
        var nomLu = String(x.nom).replace(/\s+/g, " ").trim();
        if (p.flou && norm(nomLu) !== norm(f.nom)) ch.push({ k: "nom", lib: T("Nom"), avant: f.nom || "", apres: nomLu, defaut: true });
        CHAMPS_MAJ.forEach(function (c) {
          var lu2 = String(x[c[0]] || "").trim(); if (!lu2) return;
          if (c[0] === "sire") lu2 = lu2.replace(/\s+/g, "").toUpperCase();
          var av = c[0] === "race" ? (f.race || "") : (c[0] === "pere" || c[0] === "mere") ? String(((o[c[0]] || {}).nom) || (typeof o[c[0]] === "string" ? o[c[0]] : "") || "") : String(o[c[0]] || "");
          if (norm(av) === norm(lu2)) return;
          ch.push({ k: c[0], lib: T(c[1]), avant: av, apres: lu2, defaut: !av });
        });
        if (ch.length) out.push({ f: f, ch: ch });
      });
      return out;
    }
    function coche(fid, k, defaut) { var v = mj.off[fid + "|" + k]; return v === undefined ? defaut : v; }
    async function appliquerMaj(props2) {
      setMj(Object.assign({}, mj, { busy: true, err: "", ok: "" }));
      var nOk = 0, nDem = 0, refus = [];
      for (var i = 0; i < props2.length; i++) {
        var f = props2[i].f, ch = props2[i].ch.filter(function (c) { return coche(f.id, c.k, c.defaut); });
        if (!ch.length) continue;
        if (!aDroit(f.id)) {
          try { await demanderCorrection(f, ch); nDem++; } catch (eDm) { refus.push(f.nom); }
          continue;
        }
        try {
          var nomC = ch.filter(function (c) { return c.k === "nom"; })[0];
          var autres = ch.filter(function (c) { return c.k !== "nom"; });
          if (autres.length) {
            var o = Object.assign({}, (f.origines && typeof f.origines === "object") ? f.origines : {}), race = f.race || null;
            autres.forEach(function (c) { if (c.k === "race") race = c.apres; else if (c.k === "pere" || c.k === "mere") o[c.k] = Object.assign({}, (o[c.k] && typeof o[c.k] === "object") ? o[c.k] : {}, { nom: c.apres }); else o[c.k] = c.apres; });
            var r = (typeof hypeMajOriginesCheval === "function") ? await hypeMajOriginesCheval(f.id, { origines: o, race: race, age: f.age == null ? null : f.age }) : await supa.from("chevaux").update({ origines: o, race: race }).eq("id", f.id).select("id");
            if (!r || r.error || !r.data || !r.data.length) throw new Error("x");
          }
          if (nomC) {
            var rn = await supa.from("chevaux").update({ nom: nomC.apres.slice(0, 60) }).eq("id", f.id).select("id");
            var okN = !!(rn && !rn.error && rn.data && rn.data.length);
            /* 13/11 22h42 (Blandine : « possible par équipe d'écurie, en plus du propriétaire ») : sinon, la fonction en base
               hype_renommer_cheval (mêmes droits que les origines : propriétaire, modératrice, équipe qui gère l'écurie du cheval) */
            if (!okN) { try { var rr2 = await supa.rpc("hype_renommer_cheval", { p_id: f.id, p_nom: nomC.apres.slice(0, 60) }); okN = !!(rr2 && !rr2.error && rr2.data === true); } catch (eR2) { } }
            if (!okN) { refus.push(f.nom + T(" (nom : tu n’as pas le droit de le changer)")); }
          }
          nOk++;
        } catch (eU) { refus.push(f.nom); }
      }
      setMj(Object.assign({}, mj, { busy: false, fait: true, ok: (nOk ? T("✓ Fiches mises à jour : ") + nOk + "." : "") + (nDem ? (nOk ? " " : "") + T("✓ Demandes de correction envoyées : ") + nDem + ". " + T("Le propriétaire ou l’équipe de l’écurie va les valider.") : "") + (refus.length ? " " + T("Pas modifiées (droits) : ") + refus.join(", ") + "." : "") }));
    }
    function blocMaj() {
      if (mj.fait) return h("div", { className: "hod-bloc" }, h("div", { className: mj.ok.indexOf("✓") === 0 ? "hod-ok" : "hod-err" }, mj.ok));
      var pr = propositions(); if (!pr.length) return null;
      var n = 0; pr.forEach(function (p) { p.ch.forEach(function (c) { if (coche(p.f.id, c.k, c.defaut)) n++; }); });
      return h("div", { className: "hod-sec" },
        h("div", { className: "hod-sec-h" }, h("div", { className: "hod-sec-t" }, T("Fiches à mettre à jour")), h("div", { className: "hod-pas" }, String(pr.length))),
        h("div", { className: "hod-sec-p" }, T("D’après ce document, je peux compléter ou corriger ces fiches. Tu m’autorises à faire ces changements ?")),
        pr.map(function (p) {
          var nOn = p.ch.filter(function (c) { return coche(p.f.id, c.k, c.defaut); }).length;
          return h("div", { key: p.f.id, className: "hod-fm" },
            h("div", { className: "hod-fm-h" },
              h("div", { className: "hod-av" }, p.f.photo_url ? h("img", { src: p.f.photo_url, alt: "" }) : String(p.f.nom || "?").charAt(0).toUpperCase()),
              h("div", { className: "hod-chx" }, h("div", { className: "hod-chn" }, p.f.nom), h("div", { className: "hod-chs" }, nOn + " / " + p.ch.length + " " + T("changements") + (aDroit(p.f.id) ? "" : " · " + T("à faire valider"))))),
            p.ch.map(function (c) {
              var kk = p.f.id + "|" + c.k, on = coche(p.f.id, c.k, c.defaut);
              return h("div", { key: kk, className: "hod-chg" + (on ? "" : " off"), role: "checkbox", "aria-checked": on, onClick: function () { var o = Object.assign({}, mj.off); o[kk] = !on; setMj(Object.assign({}, mj, { off: o })); } },
                h("div", { className: "hod-chx" },
                  h("div", { className: "hod-chg-l" }, c.lib),
                  h("div", { className: "hod-chg-v" }, c.apres, c.avant ? h("span", { className: "hod-chg-a" }, c.avant) : h("span", { className: "hod-chg-a", style: { textDecoration: "none" } }, T("vide sur la fiche")))),
                h("div", { className: "hod-tg" + (on ? " on" : "") }, "✓"));
            }));
        }),
        mj.err ? h("div", { className: "hod-err" }, mj.err) : null,
        h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn", disabled: mj.busy || !n, onClick: function () { appliquerMaj(pr); } }, mj.busy ? "…" : (pr.every(function (p) { return !aDroit(p.f.id); }) ? T("Demander la correction") : (n > 1 ? T("Faire les ") + n + T(" changements") : T("Faire le changement"))))),
        pr.some(function (p) { return !aDroit(p.f.id); }) ? h("div", { className: "hod-sec-p", style: { marginTop: 10 } }, T("Les fiches marquées « à faire valider » ne sont pas à toi : j’envoie une demande de correction, avec le document, à leur propriétaire et à l’équipe de leur écurie.")) : null);
    }
    /* 13/11 22h56 (Blandine, « Ok ») : qui n'a pas les droits sur une fiche DEMANDE la correction (table cheval_corrections) ;
       le propriétaire, l'équipe de l'écurie du cheval et la modératrice l'acceptent ou la refusent (hype_traiter_correction). */
    var _dr = React.useState({}), droits = _dr[0], setDroits = _dr[1];
    React.useEffect(function () {
      var ids = Object.keys(fichesMaj); if (!ids.length) return;
      var vif = true;
      Promise.all(ids.map(function (id) { try { return supa.rpc("hype_peut_corriger_cheval", { p_cheval: id }).then(function (r) { return [id, !!(r && !r.error && r.data === true)]; }, function () { return [id, true]; }); } catch (eR) { return Promise.resolve([id, true]); } }))
        .then(function (l) { if (!vif) return; var m = {}; l.forEach(function (x) { m[x[0]] = x[1]; }); setDroits(m); });
      return function () { vif = false; };
    }, [fichesMaj]);
    function aDroit(id) { return droits[id] !== false; }
    async function demanderCorrection(f, ch) {
      var r = await supa.from("cheval_corrections").insert({ cheval_id: f.id, changements: ch.map(function (c) { return { k: c.k, lib: c.lib, avant: c.avant || "", apres: c.apres }; }), source: String((st.lu && st.lu.resume) || "").slice(0, 300) || null }).select("id");
      if (!r || r.error || !r.data || !r.data.length) throw new Error("x");
      var idD = r.data[0].id;
      if (st.fichier) {
        try {
          var fi = st.fichier, ext = (String(fi.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (/pdf/i.test(fi.type) ? "pdf" : "jpg");
          var chemin = idD + "/document." + ext;
          var up = await supa.storage.from("corrections").upload(chemin, fi, { contentType: fi.type || undefined, upsert: false });
          if (!(up && up.error)) await supa.from("cheval_corrections").update({ doc_chemin: chemin, doc_mime: fi.type || null }).eq("id", idD);
        } catch (eD) { }
      }
      try { if (f.user_id && typeof hypeNotifier === "function") hypeNotifier({ type: "correction", destinataire: f.user_id, extrait: T("Correction proposée pour ") + (f.nom || ""), cible: "cheval:" + f.id }); } catch (eN) { }
    }
    /* les demandes en attente que je peux traiter, montrées en tête de l'outil */
    var _ca = React.useState([]), aValider = _ca[0], setAValider = _ca[1];
    var _ct = React.useState({}), corrEtat = _ct[0], setCorrEtat = _ct[1];
    React.useEffect(function () {
      var vif = true;
      (async function () {
        try {
          var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (!u || !u.id) return;
          var r = await supa.from("cheval_corrections").select("*").eq("statut", "attente").neq("demandeur", u.id).order("cree_le", { ascending: false }).limit(50);
          var L = (r && !r.error && r.data) || []; if (!L.length) return;
          var ids = L.map(function (x) { return x.cheval_id; });
          var rc = await supa.from("chevaux").select("id, nom, photo_url").in("id", ids);
          var noms = {}; ((rc && !rc.error && rc.data) || []).forEach(function (c) { noms[c.id] = c; });
          var dem = []; L.forEach(function (x) { if (dem.indexOf(x.demandeur) < 0) dem.push(x.demandeur); });
          var pseudos = {}; try { var rp = await supa.from("profiles").select("id, pseudo").in("id", dem); ((rp && !rp.error && rp.data) || []).forEach(function (p) { pseudos[p.id] = p.pseudo; }); } catch (eP) { }
          if (vif) setAValider(L.map(function (x) { return Object.assign({}, x, { cheval: noms[x.cheval_id] || {}, qui: pseudos[x.demandeur] || "" }); }));
        } catch (e) { }
      })();
      return function () { vif = false; };
    }, []);
    async function traiter(d, accepter) {
      setCorrEtat(Object.assign({}, corrEtat, (function () { var o = {}; o[d.id] = "…"; return o; })()));
      var ok = false; try { var r = await supa.rpc("hype_traiter_correction", { p_id: d.id, p_accepter: accepter, p_motif: null }); ok = !!(r && !r.error && r.data === true); } catch (e) { }
      var o2 = {}; o2[d.id] = ok ? (accepter ? T("✓ Fiche corrigée.") : T("Demande refusée.")) : T("Pas enregistré : la base a refusé (droits sur ce cheval ?)");
      setCorrEtat(function (x) { return Object.assign({}, x, o2); });
      try { if (ok && typeof hypeNotifier === "function") hypeNotifier({ type: "correction", destinataire: d.demandeur, extrait: (accepter ? T("Correction acceptée : ") : T("Correction refusée : ")) + (d.cheval.nom || ""), cible: "cheval:" + d.cheval_id }); } catch (eN) { }
    }
    async function ouvrirDocCorr(d) {
      try { var r = await supa.storage.from("corrections").createSignedUrl(d.doc_chemin, 600); if (r && r.data && r.data.signedUrl) window.open(r.data.signedUrl, "_blank"); } catch (e) { }
    }
    function blocAValider() {
      if (!aValider.length) return null;
      return h("div", { className: "hod-sec", style: { marginTop: 4, marginBottom: 16 } },
        h("div", { className: "hod-sec-h" }, h("div", { className: "hod-sec-t" }, T("Corrections à valider")), h("div", { className: "hod-pas" }, String(aValider.length))),
        h("div", { className: "hod-sec-p" }, T("On te propose de corriger ces fiches d’après un document. Vérifie, puis accepte ou refuse.")),
        aValider.map(function (d) {
          var fait = corrEtat[d.id];
          return h("div", { key: d.id, className: "hod-fm" },
            h("div", { className: "hod-fm-h" },
              h("div", { className: "hod-av" }, d.cheval.photo_url ? h("img", { src: d.cheval.photo_url, alt: "" }) : String(d.cheval.nom || "?").charAt(0).toUpperCase()),
              h("div", { className: "hod-chx" }, h("div", { className: "hod-chn" }, d.cheval.nom || ""), h("div", { className: "hod-chs" }, (d.qui ? T("Demandé par ") + d.qui : "") + (d.source ? (d.qui ? " · " : "") + d.source : "")))),
            (Array.isArray(d.changements) ? d.changements : []).map(function (c, i) {
              return h("div", { key: i, className: "hod-chg", style: { cursor: "default" } },
                h("div", { className: "hod-chx" }, h("div", { className: "hod-chg-l" }, c.lib || c.k),
                  h("div", { className: "hod-chg-v" }, c.apres, c.avant ? h("span", { className: "hod-chg-a" }, c.avant) : h("span", { className: "hod-chg-a", style: { textDecoration: "none" } }, T("vide sur la fiche")))));
            }),
            fait ? h("div", { className: fait.indexOf("✓") === 0 ? "hod-ok" : "hod-note", style: { padding: "0 12px 12px" } }, fait) :
              h("div", { style: { display: "flex", gap: 8, padding: "4px 12px 12px", flexWrap: "wrap" } },
                d.doc_chemin ? h("button", { type: "button", className: "hod-btn sec", style: { flex: "1 1 100%" }, onClick: function () { ouvrirDocCorr(d); } }, T("Voir le document")) : null,
                h("button", { type: "button", className: "hod-btn sec", style: { flex: 1 }, onClick: function () { traiter(d, false); } }, T("Refuser")),
                h("button", { type: "button", className: "hod-btn", style: { flex: 1 }, onClick: function () { traiter(d, true); } }, T("Accepter"))));
        }));
    }
    function manquants() {
      var lu = st.lu || {}; var vus = {}, out = [];
      var src = (lu.chevaux_liste || []).map(function (x) { return { nom: String((x && x.nom) || x || "").replace(/\s+/g, " ").trim(), sire: String((x && x.sire) || "").replace(/\s+/g, "").trim() }; });
      if (["liste_chevaux", "ordre_passage", "programme", "resultats"].indexOf(lu.type) >= 0) engSans.forEach(function (n) { src.push({ nom: String(n).replace(/\s+/g, " ").trim(), sire: "" }); });
      src.forEach(function (x) {
        if (!x.nom || x.nom.length < 2) return; var k = norm(x.nom); if (vus[k]) return; vus[k] = 1;
        if (trouverCheval(x.nom, chevaux, true)) return;
        if (proche(x.nom)) return;   /* nom mal écrit d'un cheval qui a déjà sa fiche : proposé en mise à jour, pas en création */
        if (lu.type === "mouvement_cheval") return;   /* l'arrivée a son propre bloc (création d'une fiche) */
        out.push(x);
      });
      return out;
    }
    async function creerEnSerie(liste) {
      var choisis = liste.filter(function (x) { return !nv.off[norm(x.nom)]; }).slice(0, 80);
      if (!choisis.length) return;
      var club = nv.club || mesClubs[0] || "";
      if (!club) { setNv(Object.assign({}, nv, { err: T("rattache-toi d’abord à une écurie depuis ton profil") })); return; }
      setNv(Object.assign({}, nv, { busy: true, err: "", ok: "" }));
      try {
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (!u || !u.id) throw new Error(T("connecte-toi d’abord"));
        var ecu = (typeof monEcurieNom === "function") ? await monEcurieNom() : club;
        /* même création que l'import de résultats (sans notifier l'écurie 36 fois) ; le SIRE lu va dans les origines, comme les papiers */
        /* garde-fou : on relit tous les noms en base juste avant (un cheval peut exister sans être dans la liste chargée) */
        try { var rx = await supa.from("chevaux").select("nom, alias").is("supprime_le", null).limit(5000); if (rx && !rx.error && rx.data) choisis = choisis.filter(function (x) { return !trouverCheval(x.nom, rx.data, true); }); } catch (eX) { }
        if (!choisis.length) throw new Error(T("ces chevaux ont déjà leur fiche"));
        var lignes = choisis.map(function (x) { var o = { user_id: u.id, ecurie: ecu, nom: x.nom.slice(0, 60), club: club }; if (x.sire) o.origines = { sire: x.sire }; return o; });
        var r = await supa.from("chevaux").insert(lignes).select("id, nom");
        if (!r || r.error || !r.data || !r.data.length) throw new Error(String((r && r.error && (r.error.message || r.error)) || T("la base a refusé (droits sur ce cheval ?)")));
        var lies = 0;
        if (props.concoursId) {
          for (var i = 0; i < r.data.length; i++) {
            var c = r.data[i];
            try {
              var a = await supa.from("concours_engagements").update({ cheval1_id: c.id }).eq("agenda_id", props.concoursId).is("cheval1_id", null).ilike("cheval1_nom", c.nom).select("id");
              var b = await supa.from("concours_engagements").update({ cheval2_id: c.id }).eq("agenda_id", props.concoursId).is("cheval2_id", null).ilike("cheval2_nom", c.nom).select("id");
              lies += ((a && a.data) || []).length + ((b && b.data) || []).length;
            } catch (eL) { }
          }
        }
        setNv(Object.assign({}, nv, { busy: false, fait: true, ok: T("✓ Fiches créées : ") + r.data.length + "." + (lies ? " " + T("Reliées aux engagements du concours : ") + lies + "." : "") + " " + T("Tu les retrouves dans les chevaux de l’écurie, prêtes à compléter.") }));
      } catch (eC) { setNv(Object.assign({}, nv, { busy: false, err: T("Pas créées : ") + String((eC && eC.message) || eC) })); }
    }
    function blocNouveaux() {
      if (nv.fait) return h("div", { className: "hod-bloc" }, h("div", { className: "hod-ok" }, nv.ok));
      var liste = manquants(); if (!liste.length) return null;
      var n = liste.filter(function (x) { return !nv.off[norm(x.nom)]; }).length;
      var stS = { width: "100%", marginTop: 6, background: "rgba(255,255,255,.04)", color: "#F3EEE4", border: "1px solid rgba(243,238,228,.16)", borderRadius: 12, padding: "9px 10px", font: "inherit", fontSize: 13 };
      return h("div", { className: "hod-sec" },
        h("div", { className: "hod-sec-h" }, h("div", { className: "hod-sec-t" }, T("Chevaux sans fiche")), h("div", { className: "hod-pas" }, String(liste.length))),
        h("div", { className: "hod-sec-p" }, (liste.length > 1 ? liste.length + " " + T("de ces chevaux n’ont pas encore leur fiche dans Hype.") : T("Ce cheval n’a pas encore sa fiche dans Hype.")) + " " + T("Tu m’autorises à les créer ? Tu pourras ensuite y accéder et les modifier.")),
        h("div", { style: { maxHeight: 330, overflowY: "auto", marginTop: 4 } }, liste.map(function (x) {
          var k = norm(x.nom), on = !nv.off[k];
          return h("div", { key: k, className: "hod-ch" + (on ? "" : " off"), role: "checkbox", "aria-checked": on, onClick: function () { var o = Object.assign({}, nv.off); if (on) o[k] = 1; else delete o[k]; setNv(Object.assign({}, nv, { off: o })); } },
            h("div", { className: "hod-av" }, x.nom.charAt(0).toUpperCase()),
            h("div", { className: "hod-chx" }, h("div", { className: "hod-chn" }, x.nom), h("div", { className: "hod-chs" }, x.sire ? "SIRE " + x.sire : T("Nouvelle fiche"))),
            h("div", { className: "hod-tg" + (on ? " on" : "") }, "✓"));
        })),
        mesClubs.length > 1 ? h("div", { className: "hod-chg-l", style: { marginTop: 14 } }, T("Écurie")) : null,
        mesClubs.length > 1 ? h("select", { className: "hod-sel", value: nv.club || mesClubs[0], onChange: function (e) { setNv(Object.assign({}, nv, { club: e.target.value })); } }, mesClubs.map(function (c) { return h("option", { key: c, value: c }, c); })) : null,
        nv.err ? h("div", { className: "hod-err" }, nv.err) : null,
        h("div", { className: "hod-bas" },
          st.lu && st.lu.type === "liste_chevaux" ? h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")) : null,
          h("button", { type: "button", className: "hod-btn", disabled: nv.busy || !n, onClick: function () { creerEnSerie(liste); } }, nv.busy ? "…" : (n > 1 ? T("Créer les ") + n + T(" fiches") : T("Créer la fiche")))));
    }
    async function enregistrerMouvement() {
      var mv = st.mv || {}; var chId = st.chevalId;
      var nouveau = !chId && mv.sens === "entree";
      if (nouveau && !String(mv.nom || "").trim()) { maj({ err: T("Écris le nom du cheval.") }); return; }
      if (!chId && !nouveau) { maj({ err: T("Choisis le cheval concerné.") }); return; }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(mv.date || ""))) { maj({ err: T("Indique la date.") }); return; }
      if (mv.sens === "sortie_provisoire" && mv.date_retour && mv.date_retour < mv.date) { maj({ err: T("Le retour ne peut pas être avant le départ.") }); return; }
      maj({ busy: true, err: "" });
      var cree = "";
      try {
        if (nouveau) {
          /* 13/11 22h24 (Blandine : « ajoute Cooltax du Chênay à l'écurie, il arrive aujourd'hui, crée-lui sa fiche ») :
             même création que le bouton « + Ajouter un cheval » (ajouterCheval), rattachée à l'écurie choisie */
          var clubN = mv.club || mesClubs[0] || "";
          if (!clubN) throw new Error(T("rattache-toi d’abord à une écurie depuis ton profil"));
          if (typeof ajouterCheval !== "function") throw new Error(T("création indisponible"));
          var rn = await ajouterCheval({ nom: String(mv.nom).replace(/\s+/g, " ").trim().slice(0, 60), club: clubN });
          if (!rn || rn.error || !rn.data || !rn.data.id) throw new Error(String((rn && rn.error && (rn.error.message || rn.error)) || T("la base a refusé (droits sur ce cheval ?)")));
          chId = rn.data.id; maj({ chevalId: chId });
          cree = T("✓ Fiche de ") + rn.data.nom + T(" créée dans Hype.") + " ";
        }
        var rc = await supa.from("chevaux").select("id, club").eq("id", chId).maybeSingle();
        var club = rc && !rc.error && rc.data && String(rc.data.club || "").trim();
        if (!club) throw new Error(T("ce cheval n’est rattaché à aucune écurie"));
        var clef = (typeof clefClubG === "function") ? clefClubG(club) : club.toLowerCase();
        var lieu = String(mv.lieu || "").trim() || null, motif = String(mv.motif || "").trim() || null, r;
        if (mv.sens === "sortie_provisoire") {
          r = await supa.from("registre_mouvements").insert({ club_clef: clef, cheval_id: chId, date_sortie: mv.date, date_retour: mv.date_retour || null, motif: motif, destination: lieu, source: "outil" }).select("id");
        } else {
          var lig = { club_clef: clef, cheval_id: chId };
          if (mv.sens === "entree") { lig.date_entree = mv.date; lig.provenance = [lieu, motif ? "(" + motif + ")" : ""].filter(Boolean).join(" ") || null; }
          else { lig.date_sortie = mv.date; lig.motif_sortie = motif; lig.destination = lieu; }
          r = await supa.from("registre_chevaux").upsert(lig, { onConflict: "club_clef,cheval_id" }).select("cheval_id");
        }
        if (!r || r.error || !r.data || !r.data.length) throw new Error(T("la base a refusé (droits sur ce cheval ?)"));
        var garde = "";
        if (st.fichier) {
          var f = st.fichier, ext = (String(f.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (/pdf/i.test(f.type) ? "pdf" : "jpg");
          var chemin = String(chId) + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
          var up = await supa.storage.from("sante").upload(chemin, f, { contentType: f.type || undefined, upsert: false });
          if (!(up && up.error)) {
            var rd = await supa.from("cheval_documents").insert({ cheval_id: chId, type: "autre", titre: mv.sens === "entree" ? "Arrivée à l'écurie" : "Départ de l'écurie", date_doc: mv.date, chemin: chemin, mime: f.type || null, taille: f.size || null }).select("id");
            if (rd && !rd.error && rd.data && rd.data.length) garde = " " + T("Le document est rangé dans la page Santé du cheval.");
          }
        }
        maj({ busy: false, etape: "fini", ok: cree + T("✓ Inscrit au registre des chevaux de l’écurie.") + garde + " " + T("Pense à le déclarer aussi sur ton espace IFCE (Gestion des mouvements des équidés), si tu l’utilises.") });
      } catch (eM) { maj({ busy: false, err: T("Pas enregistré : ") + String((eM && eM.message) || eM) }); }
    }

    function choixCheval() {
      return h("select", { value: st.chevalId, onChange: function (e) { maj({ chevalId: e.target.value }); }, style: { marginTop: 8, width: "100%", background: "rgba(255,255,255,.04)", color: "#F3EEE4", border: "1px solid rgba(243,238,228,.16)", borderRadius: 12, padding: "9px 10px", font: "inherit", fontSize: 13 } },
        h("option", { value: "" }, T("— Quel cheval ? —")),
        chevaux.map(function (c) { return h("option", { key: c.id, value: c.id }, c.nom); }));
    }

    var corps;
    if (st.etape === "choix") {
      corps = h("div", null,
        blocAValider(),
        h("div", { className: "hod-k" }, T("Un document, une info ?")),
        h("div", { className: "hod-titre" }, T("Que souhaites-tu enregistrer ?")),
        h("div", { className: "hod-note" }, T("Tu peux me transmettre une photo, une capture ou un PDF, ou simplement me le dire en vocal. Je te poserai une question si j’ai un doute.")),
        h("textarea", { className: "hod-ta", value: st.note, placeholder: T("Par exemple : « Enregistre les horaires : départ 6 h 30, embarquement 7 h, reco à 8 h pour la Club 3 »"), onChange: function (e) { maj({ note: e.target.value }); } }),
        h("div", { style: { display: "flex", gap: 8, marginTop: 8, alignItems: "center" } },
          h(Micro, { texte: function (t) { setSt(function (x) { return Object.assign({}, x, { note: (String(x.note || "").trim() ? x.note + " " : "") + t }); }); }, aide: function (m) { maj({ err: m }); } }),
          h("button", { type: "button", className: "hod-btn sec", style: { flex: 1 }, disabled: !String(st.note || "").trim(), onClick: function () { setSt(function (x) { return Object.assign({}, x, { fichier: null, images: [], echanges: [], fil: [{ qui: "moi", t: x.note }] }); }); setTimeout(function () { lire(null, []); }, 0); } }, T("Envoyer sans document"))),
        boutonVoix(),
        h("input", { ref: refFic, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: choisir }),
        h("div", { className: "hod-bas" },
          h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")),
          h("button", { type: "button", className: "hod-btn", onClick: function () { try { refFic.current.click(); } catch (e) { } } }, T("＋ Choisir le document"))),
        st.err ? h("div", { className: "hod-err" }, st.err) : null);
    } else if (st.etape === "lecture") {
      corps = h("div", { style: { textAlign: "center", padding: "26px 0" } },
        h("div", { className: "hod-k" }, T("Je lis ton document")),
        h("div", { className: "hod-titre" }, T("Un instant…")),
        h("div", { className: "hod-note" }, T("Ça prend en général 1 à 2 minutes. Reste sur cette fenêtre.")));
    } else if (st.etape === "fini") {
      corps = h("div", { style: { textAlign: "center", padding: "18px 0" } },
        h("div", { className: "hod-ok", style: { fontSize: 15 } }, st.ok),
        h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn", onClick: props.fermer }, T("Fermer"))));
    } else {
      var lu = st.lu || {}, type = lu.type;
      var action = null;
      if (type === "liste_soins") {
        action = h("div", { className: "hod-bloc" },
          h("div", { className: "hod-k", style: { marginBottom: 6 } }, T("Les soins à enregistrer")),
          st.lignes.length ? st.lignes.map(function (l, i) {
            function ml(o) { var L = st.lignes.slice(); L[i] = Object.assign({}, l, o); maj({ lignes: L }); }
            return h("div", { key: l.k, className: "hod-ligne" },
              h("input", { type: "checkbox", checked: l.coche, onChange: function (e) { ml({ coche: e.target.checked }); } }),
              h("div", null,
                h("div", { style: { fontSize: 12, color: "rgba(243,238,228,.55)" } }, T("Lu : « ") + (l.nomLu || "?") + " »" + (l.detail ? " · " + l.detail : "")),
                h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 5 } },
                  h("select", { value: l.chevalId, onChange: function (e) { ml({ chevalId: e.target.value }); } }, h("option", { value: "" }, T("— cheval ? —")), chevaux.map(function (c) { return h("option", { key: c.id, value: c.id }, c.nom); })),
                  h("select", { value: l.soin, onChange: function (e) { ml({ soin: e.target.value }); } }, TYPES_SOIN.map(function (t) { return h("option", { key: t[0], value: t[0] }, T(t[1])); })),
                  h("input", { type: "date", value: l.date, onChange: function (e) { ml({ date: e.target.value }); } }))));
          }) : h("div", { className: "hod-note" }, T("Je n’ai trouvé aucune ligne de soin.")),
          h("div", { className: "hod-bas" },
            h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")),
            h("button", { type: "button", className: "hod-btn", disabled: st.busy, onClick: enregistrerSoins }, st.busy ? "…" : T("Enregistrer les soins cochés"))));
      } else if (type === "carnet_vaccins") {
        action = h("div", { className: "hod-bloc" }, h("div", { className: "hod-note" }, T("Je l’ouvre dans la page Santé du cheval et je lis les vaccins (tu valideras chaque date).")), choixCheval(),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")), h("button", { type: "button", className: "hod-btn", onClick: allerCarnet }, T("Lire le carnet"))));
      } else if (type === "programme" || type === "ordre_passage") {
        action = h("div", { className: "hod-bloc" }, h("div", { className: "hod-note" }, type === "programme" ? T("Je le lis dans le Jour J du concours (horaires, recos, pistes) et je le garde dans le Dossier du concours.") : T("Je le lis dans les Engagements du concours (numéros et heures de passage) et je le garde dans le Dossier du concours.")),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")), h("button", { type: "button", className: "hod-btn", onClick: function () { allerConcours(type); } }, T("Continuer"))));
      } else if (type === "horaires_concours") {
        var hz = lu.horaires || {}, lignesH = Array.isArray(hz.lignes) ? hz.lignes.filter(function (x) { return x && x.heure; }) : [];
        var libT = { reco: T("Reco"), debut: T("Début"), autre: T("Autre") };
        action = h("div", { className: "hod-bloc" },
          h("div", { className: "hod-k", style: { marginBottom: 6 } }, T("Les horaires à enregistrer")),
          hz.depart ? h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "4px 0" } }, h("span", { style: { color: "rgba(243,238,228,.6)" } }, T("Départ")), h("b", { style: { fontWeight: 500 } }, hz.depart)) : null,
          hz.embarquement ? h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "4px 0" } }, h("span", { style: { color: "rgba(243,238,228,.6)" } }, T("Embarquement")), h("b", { style: { fontWeight: 500 } }, hz.embarquement)) : null,
          lignesH.map(function (x, i) { return h("div", { key: "h" + i, style: { display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "4px 0" } }, h("span", { style: { color: "rgba(243,238,228,.6)" } }, (x.type === "autre" ? (x.lib || libT.autre) : (libT[x.type] || libT.autre)) + (x.epreuve ? " · " + x.epreuve : "")), h("b", { style: { fontWeight: 500 } }, x.heure)); }),
          !props.concoursId ? h("div", { className: "hod-note", style: { marginTop: 8 } }, T("Ouvre d’abord la fiche du concours, puis redonne-moi le document en bas de la page.")) : null,
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")),
            h("button", { type: "button", className: "hod-btn", disabled: st.busy || !props.concoursId, onClick: enregistrerHoraires }, st.busy ? "…" : T("Enregistrer les horaires"))));
      } else if (type === "mouvement_cheval") {
        var mv = st.mv || {};
        function mm(o) { maj({ mv: Object.assign({}, mv, o) }); }
        var stIn = { width: "100%", marginTop: 6, background: "rgba(255,255,255,.04)", color: "#F3EEE4", border: "1px solid rgba(243,238,228,.16)", borderRadius: 12, padding: "9px 10px", font: "inherit", fontSize: 13, boxSizing: "border-box" };
        var lab = function (t) { return h("div", { style: { fontSize: 12, color: "rgba(243,238,228,.55)", marginTop: 10 } }, t); };
        action = h("div", { className: "hod-bloc" },
          h("div", { className: "hod-k", style: { marginBottom: 6 } }, T("Registre des chevaux")),
          h("select", { value: mv.sens || "entree", onChange: function (e) { mm({ sens: e.target.value }); }, style: stIn },
            h("option", { value: "entree" }, T("Arrivée à l’écurie")),
            h("option", { value: "sortie" }, T("Départ définitif")),
            h("option", { value: "sortie_provisoire" }, T("Sortie provisoire (concours, stage, vétérinaire…)"))),
          lab(T("Cheval")),
          h("select", { value: st.chevalId, onChange: function (e) { maj({ chevalId: e.target.value }); }, style: stIn },
            h("option", { value: "" }, mv.sens === "entree" ? T("＋ Nouveau cheval : je crée sa fiche") : T("— Quel cheval ? —")),
            chevaux.map(function (c) { return h("option", { key: c.id, value: c.id }, c.nom); })),
          (!st.chevalId && mv.sens === "entree") ? h("div", null,
            lab(T("Nom du cheval")), h("input", { value: mv.nom || "", placeholder: T("Son nom, comme sur ses papiers"), onChange: function (e) { mm({ nom: e.target.value }); }, style: stIn }),
            mesClubs.length > 1 ? lab(T("Écurie")) : null,
            mesClubs.length > 1 ? h("select", { value: mv.club || mesClubs[0], onChange: function (e) { mm({ club: e.target.value }); }, style: stIn }, mesClubs.map(function (k) { return h("option", { key: k, value: k }, k); })) : null,
            h("div", { className: "hod-note", style: { fontSize: 11.5 } }, T("Tu pourras compléter sa fiche ensuite (photo, papiers…)."))) :
          (!st.chevalId ? h("div", { className: "hod-note", style: { fontSize: 11.5 } }, T("Le cheval doit déjà avoir sa fiche dans Hype.")) : null),
          lab(mv.sens === "entree" ? T("Arrivé le") : T("Parti le")), h("input", { type: "date", value: mv.date || "", onChange: function (e) { mm({ date: e.target.value }); }, style: stIn }),
          mv.sens === "sortie_provisoire" ? lab(T("Retour le")) : null,
          mv.sens === "sortie_provisoire" ? h("input", { type: "date", value: mv.date_retour || "", onChange: function (e) { mm({ date_retour: e.target.value }); }, style: stIn }) : null,
          lab(mv.sens === "entree" ? T("Venant de") : T("Destination")), h("input", { value: mv.lieu || "", placeholder: mv.sens === "entree" ? T("Adresse ou élevage d’origine") : T("Adresse ou écurie de destination"), onChange: function (e) { mm({ lieu: e.target.value }); }, style: stIn }),
          lab(T("Motif")), h("input", { value: mv.motif || "", placeholder: mv.sens === "entree" ? T("Achat, prêt, pension, naissance…") : mv.sens === "sortie" ? T("Vente, prêt, retour propriétaire, retraite…") : T("Concours, stage, vétérinaire…"), onChange: function (e) { mm({ motif: e.target.value }); }, style: stIn }),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")),
            h("button", { type: "button", className: "hod-btn", disabled: st.busy, onClick: enregistrerMouvement }, st.busy ? "…" : ((!st.chevalId && mv.sens === "entree") ? T("Créer sa fiche et l’inscrire") : T("Inscrire au registre")))));
      } else if (type === "liste_chevaux") {
        action = manquants().length || nv.fait || propositions().length || mj.fait ? null : h("div", { className: "hod-bloc" }, h("div", { className: "hod-note" }, T("Tous ces chevaux ont déjà leur fiche dans Hype.")),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn", onClick: props.fermer }, T("Fermer"))));
      } else if (type === "resultats") {
        action = h("div", { className: "hod-bloc" }, h("div", { className: "hod-note" }, T("Les résultats se lisent encore depuis la carte « Résultats » de la fiche du concours : je les brancherai ici à la prochaine étape.")),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn", onClick: props.fermer }, T("Fermer"))));
      } else {
        var typeDoc = type === "ordonnance" ? "ordonnance" : type === "facture" ? "facture" : "autre";
        var p = lu.papiers || {};
        var champs = (type === "papiers_cheval" && fiche) ? champsPapiers(p, fiche) : [];
        action = h("div", { className: "hod-bloc" },
          type === "papiers_cheval" ? h("div", { style: { marginBottom: 12 } },
            h("div", { className: "hod-k", style: { marginBottom: 6 } }, T("Compléter la fiche du cheval")),
            !st.chevalId ? h("div", { className: "hod-note" }, T("Choisis d’abord le cheval ci-dessous.")) :
            !fiche ? h("div", { className: "hod-note" }, "…") :
            champs.length ? champs.map(function (c) {
              return h("label", { key: c.k, className: "hod-ligne", style: { cursor: c.pareil ? "default" : "pointer" } },
                h("input", { type: "checkbox", disabled: c.pareil, checked: c.pareil || !!coches[c.k], onChange: function (e) { var x = Object.assign({}, coches); x[c.k] = e.target.checked; setCoches(x); } }),
                h("div", null,
                  h("div", { style: { display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 } }, h("span", { style: { color: "rgba(243,238,228,.6)" } }, c.lib), h("b", { style: { fontWeight: 500 } }, c.lu)),
                  c.pareil ? h("div", { style: { fontSize: 11.5, color: "#96CDAA" } }, (c.k === "puce" || c.k === "proprietaire") ? T("✓ déjà au registre") : T("✓ déjà sur la fiche")) :
                  c.diff ? h("div", { style: { fontSize: 11.5, color: "#E8D3A8" } }, T("Différent de la fiche : ") + c.fiche + T(" — coche pour remplacer")) :
                  h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,.5)" } }, (c.k === "puce" || c.k === "proprietaire") ? T("vide au registre") : T("vide sur la fiche"))));
            }) : h("div", { className: "hod-note" }, T("Je n’ai rien lu d’utile pour la fiche."))) : null,
          h("div", { className: "hod-note" }, T("Je le range dans les documents de la page Santé du cheval :")), choixCheval(),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")), h("button", { type: "button", className: "hod-btn", disabled: st.busy, onClick: function () { rangerDoc(typeDoc); } }, st.busy ? "…" : (type === "papiers_cheval" ? T("Compléter et ranger") : T("Ranger le document")))));
      }
      corps = h("div", null,
        h("div", { className: "hod-hero" },
          h("img", { src: "images/portrait-defaut-noir.webp", alt: "" }), h("div", { className: "hod-poignee" }),
          h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 34 C 120 34, 220 6, 400 10", fill: "none", stroke: "rgba(201,166,107,.55)", strokeWidth: 1 })),
          h("div", { className: "hod-hero-t" },
            h("div", { className: "hod-k" }, T("Ce que j’ai compris")),
            h("div", { className: "hod-titre" }, (function () { var x = T(NOMS_TYPE[type] || NOMS_TYPE.autre); return x.charAt(0).toUpperCase() + x.slice(1) + "."; })()))),
        h("div", { className: "hod-fil" },
          st.fil.map(function (m, i) { return h("div", { key: "m" + i, className: "hod-bulle " + (m.qui === "moi" ? "moi" : "hype") }, m.t); }),
          st.reflechit ? h("div", { className: "hod-bulle hype" }, "…") : null),
        h("textarea", { className: "hod-ta", value: st.reponse, placeholder: T("Réponds-lui, corrige-le ou pose-lui une question"), onChange: function (e) { maj({ reponse: e.target.value }); } }),
        h("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 } },
          h(Micro, { texte: function (t) { setSt(function (x) { return Object.assign({}, x, { reponse: (String(x.reponse || "").trim() ? x.reponse + " " : "") + t }); }); }, aide: function (m) { maj({ err: m }); } }),
          h("button", { type: "button", className: "hod-btn", disabled: !String(st.reponse || "").trim() || st.reflechit, onClick: function () { repondre(); } }, T("Envoyer"))),
        boutonVoix(),
        blocNouveaux(),
        blocMaj(),
        action,
        st.err ? h("div", { className: "hod-err" }, st.err) : null);
    }
    return h("div", { className: "hod-voile", onClick: function (e) { if (e.target === e.currentTarget && st.etape !== "lecture") props.fermer(); } },
      h("div", { className: "hod-feuille", role: "dialog" }, st.etape === "compris" ? null : h("div", { className: "hod-poignee" }), corps));
  }

  function Encart(props) {
    cssOutil();
    var _o = React.useState(false); var ouv = _o[0], setOuv = _o[1];
    var _f = React.useState(false); var feuille = _f[0], setFeuille = _f[1];
    var _c = React.useState(null); var chevaux = _c[0], setChevaux = _c[1];
    var _u = React.useState(null); var moi = _u[0], setMoi = _u[1];
    React.useEffect(function () {
      var vif = true;
      (async function () {
        try { var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (vif) setMoi(u || false); } catch (e) { if (vif) setMoi(false); }
      })();
      return function () { vif = false; };
    }, []);
    async function ouvrir() {
      setFeuille(true);
      if (chevaux) return;
      try {
        var r = await supa.from("chevaux").select("id, nom, alias").is("supprime_le", null).order("nom", { ascending: true }).limit(2000);
        setChevaux((r && !r.error && r.data) || []);
      } catch (e) { setChevaux([]); }
    }
    if (!moi) return null;   /* visiteur sans compte : pas d'outil */
    var chevalCtx = null; try { chevalCtx = props.ecran === "sante-cheval" ? window.__santeCheval : null; } catch (e1) { }
    var concoursId = null; try { concoursId = ["concours", "engagements", "jour-j", "dossier-concours", "liste-van"].indexOf(props.ecran) >= 0 ? (window.__concoursId || window.__engagementsId || null) : null; } catch (e2) { }
    return h("div", { className: "hod-enc" },
      h("div", { className: "hod-carte" },
        h("div", { className: "hod-ph" }, h("img", { src: "images/sante-fond-defaut.webp", alt: "", loading: "lazy" })),
        h("div", { className: "hod-tx" },
          h("div", { className: "hod-k" }, T("Un document, une info ?")),
          h("h3", null, T("Hype s’occupe du reste.")),
          h("p", null, T("Photo ou PDF : il le lit, le range et remplit les bonnes pages.")),
          h("button", { type: "button", className: "hod-btn", onClick: ouvrir }, T("＋ Ajouter un document")),
          h("div", null, h("button", { type: "button", className: "hod-plus" + (ouv ? " ouv" : ""), onClick: function () { setOuv(!ouv); } }, T("Tout ce qu’il sait lire "), h("span", null, "⌄"))),
          ouv ? h("div", { className: "hod-liste" }, T("Papiers du cheval et n° SIRE · carnet de vaccins · listes de soins (maréchal, vermifuge, dentiste…), même écrites à la main · ordonnances · factures · programme, ordre de passage et horaires — il reconnaît le cheval, te pose une question s’il a un doute, et range tout au même endroit.")) : null)),
      feuille ? h(Feuille, { fermer: function () { setFeuille(false); }, chevaux: chevaux || [], chevalId: chevalCtx && chevalCtx.id, chevalNom: chevalCtx && chevalCtx.nom, concoursId: concoursId }) : null);
  }

  window.HypeOutilDoc = { Encart: Encart };
})();
