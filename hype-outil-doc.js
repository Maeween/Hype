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
"Je t’écoute.": ["I’m listening.", "Te escucho.", "Ti ascolto.", "聞いています。", "Ich höre dir zu.", "أنا أستمع إليك.", "我在听。", "Ik luister.", "Estou a ouvir-te.", "Jag lyssnar.", "Я слушаю.", "Słucham cię.", "듣고 있어요.", "گوش می‌دهم."],
"Je t’écoute…": ["Listening…", "Te escucho…", "Ti ascolto…", "聞いています…", "Ich höre zu…", "أستمع…", "正在听……", "Ik luister…", "Estou a ouvir…", "Jag lyssnar…", "Слушаю…", "Słucham…", "듣고 있어요…", "گوش می‌دهم…"],
"Conversation à la voix : activée": ["Voice conversation: on", "Conversación por voz: activada", "Conversazione a voce: attiva", "音声会話：オン", "Sprachgespräch: aktiv", "المحادثة الصوتية: مفعّلة", "语音对话：已开启", "Spraakgesprek: aan", "Conversa por voz: ativada", "Röstsamtal: på", "Голосовой разговор: включён", "Rozmowa głosowa: włączona", "음성 대화: 켜짐", "گفتگوی صوتی: فعال"],
"Parler avec Hype à la voix": ["Talk with Hype by voice", "Hablar con Hype por voz", "Parla con Hype a voce", "Hypeと音声で話す", "Mit Hype sprechen", "تحدّث مع Hype صوتيًا", "用语音和 Hype 对话", "Praat met Hype", "Falar com o Hype por voz", "Prata med Hype", "Говорить с Hype голосом", "Rozmawiaj z Hype głosem", "Hype와 음성으로 대화", "با Hype صوتی حرف بزن"],

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
      ".hod-feuille{width:100%;max-width:640px;max-height:88vh;overflow:auto;background:#0D110F;border-top:1px solid rgba(201,166,107,.35);border-radius:24px 24px 0 0;padding:16px 20px calc(26px + env(safe-area-inset-bottom));color:#F3EEE4;font-family:Montserrat,system-ui,sans-serif}",
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
      ".hod-ok{margin-top:10px;font-size:13px;color:#96CDAA}"
    ].join("\n");
    document.head.appendChild(st);
  }

  var TYPES_SOIN_FR = [["ferrure", "Maréchal (ferrure)"], ["parage", "Maréchal (parage)"], ["vermifuge", "Vermifuge"], ["vaccin", "Vaccin"], ["dentiste", "Dentiste"], ["osteopathe", "Ostéopathe"], ["veterinaire", "Vétérinaire"], ["traitement", "Traitement"], ["autre", "Autre soin"]];
  var TYPES_SOIN = TYPES_SOIN_FR;   /* libellés traduits à l'affichage : T(t[1]) */
  var NOMS_TYPE = { liste_soins: "une liste de soins", carnet_vaccins: "un carnet de vaccination", papiers_cheval: "les papiers du cheval (document d'identification)", ordonnance: "une ordonnance", facture: "une facture", programme: "le programme d'un concours", ordre_passage: "un ordre de passage", horaires_concours: "les horaires d'un concours", resultats: "des résultats de concours", autre: "un document" };

  function norm(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function trouverCheval(nom, chevaux) {
    var n = norm(nom); if (!n) return null;
    var exact = null, part = null;
    (chevaux || []).forEach(function (c) {
      var noms = [c.nom, c.alias].filter(Boolean).map(norm);
      noms.forEach(function (x) { if (!x) return; if (x === n) exact = exact || c; else if (x.indexOf(n) >= 0 || n.indexOf(x) >= 0 || x.split(" ")[0] === n.split(" ")[0]) part = part || c; });
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
      + "1) Dis ce que c'est (type) parmi : liste_soins (dates de soins pour un ou plusieurs chevaux : marechal, vermifuge, vaccin, dentiste, osteopathe, veterinaire... meme une simple liste de noms de chevaux avec une consigne de la personne), carnet_vaccins (pages de vaccination d'un livret), papiers_cheval (document d'identification, SIRE, pedigree), ordonnance, facture, programme (programme d'un concours), ordre_passage (liste de depart d'un concours), resultats (resultats d'un concours), horaires_concours (horaires d'un concours donnes par la personne, ex. « depart 6h30, embarquement 7h, reco 8h pour la Club 3 »), autre. Parfois il n'y a AUCUNE image : seulement ce que la personne dit ou ecrit ; lis alors sa phrase. "
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
      + "\"papiers\":{\"sire\":\"\",\"ueln\":\"\",\"naissance\":\"AAAA-MM-JJ ou vide\",\"sexe\":\"\",\"robe\":\"\",\"race\":\"\",\"pere\":\"\",\"mere\":\"\",\"naisseur\":\"\"}}. "
      + "soins : seulement pour liste_soins (une ligne par cheval et par soin). papiers : seulement pour papiers_cheval. horaires : seulement pour horaires_concours (« reco » = reconnaissance ; « depart » = depart de l'ecurie). N'invente RIEN : ce qui est illisible reste vide.";
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
    return { message: String(o.message || "").trim(), horaires: o.horaires || {}, type: String(o.type || "autre"), resume: String(o.resume || ""), question: String(o.question || "").trim(), cheval: String(o.cheval || ""), soins: Array.isArray(o.soins) ? o.soins : [], papiers: o.papiers || {} };
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
        var c1 = trouverCheval(lu.cheval, chevaux);
        var dit = lu.message || [lu.resume, lu.question].filter(Boolean).join(" ");
        setSt(function (x) { return Object.assign({}, x, { etape: "compris", images: imgs, lu: lu, lignes: lignes, chevalId: (c1 && c1.id) || x.chevalId || props.chevalId || "", reponse: "", reflechit: false, fil: x.fil.concat(dit ? [{ qui: "hype", t: dit }] : []) }); });
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
        voix ? (ecoute ? "● " + T("Je t’écoute…") : "🎧 " + T("Conversation à la voix : activée")) : "🎧 " + T("Parler avec Hype à la voix"));
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
        ["naisseur", T("Naisseur"), String(o.naisseur || ""), String(p.naisseur || "")]
      ].filter(function (c) { return c[3]; }).map(function (c) {
        var pareil = norm(c[2]) === norm(c[3]);
        return { k: c[0], lib: c[1], fiche: c[2], lu: c[3], pareil: pareil, diff: !!c[2] && !pareil };
      });
    }
    React.useEffect(function () {
      if (!st.lu || st.lu.type !== "papiers_cheval" || !st.chevalId) { setFiche(null); return; }
      var vif = true;
      supa.from("chevaux").select("id, nom, race, age, origines").eq("id", st.chevalId).maybeSingle().then(function (r) {
        if (!vif) return;
        var f = (r && !r.error && r.data) || null; setFiche(f);
        var ck = {}; champsPapiers(st.lu.papiers || {}, f).forEach(function (c) { ck[c.k] = !c.pareil && !c.diff; }); setCoches(ck);
      });
      return function () { vif = false; };
    }, [st.chevalId, st.lu]);
    async function completerFiche() {
      if (!fiche) return true;
      var champs = champsPapiers((st.lu && st.lu.papiers) || {}, fiche).filter(function (c) { return coches[c.k] && !c.pareil; });
      if (!champs.length) return true;
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
      return champs.length;
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

    function choixCheval() {
      return h("select", { value: st.chevalId, onChange: function (e) { maj({ chevalId: e.target.value }); }, style: { marginTop: 8, width: "100%", background: "rgba(255,255,255,.04)", color: "#F3EEE4", border: "1px solid rgba(243,238,228,.16)", borderRadius: 12, padding: "9px 10px", font: "inherit", fontSize: 13 } },
        h("option", { value: "" }, T("— Quel cheval ? —")),
        chevaux.map(function (c) { return h("option", { key: c.id, value: c.id }, c.nom); }));
    }

    var corps;
    if (st.etape === "choix") {
      corps = h("div", null,
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
                  c.pareil ? h("div", { style: { fontSize: 11.5, color: "#96CDAA" } }, T("✓ déjà sur la fiche")) :
                  c.diff ? h("div", { style: { fontSize: 11.5, color: "#E8D3A8" } }, T("Différent de la fiche : ") + c.fiche + T(" — coche pour remplacer")) :
                  h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,.5)" } }, T("vide sur la fiche"))));
            }) : h("div", { className: "hod-note" }, T("Je n’ai rien lu d’utile pour la fiche."))) : null,
          h("div", { className: "hod-note" }, T("Je le range dans les documents de la page Santé du cheval :")), choixCheval(),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")), h("button", { type: "button", className: "hod-btn", disabled: st.busy, onClick: function () { rangerDoc(typeDoc); } }, st.busy ? "…" : (type === "papiers_cheval" ? T("Compléter et ranger") : T("Ranger le document")))));
      }
      corps = h("div", null,
        h("div", { className: "hod-k" }, T("Ce que j’ai compris")),
        h("div", { className: "hod-titre" }, (function () { var x = T(NOMS_TYPE[type] || NOMS_TYPE.autre); return x.charAt(0).toUpperCase() + x.slice(1) + "."; })()),
        h("div", { className: "hod-fil" },
          st.fil.map(function (m, i) { return h("div", { key: "m" + i, className: "hod-bulle " + (m.qui === "moi" ? "moi" : "hype") }, m.t); }),
          st.reflechit ? h("div", { className: "hod-bulle hype" }, "…") : null),
        h("textarea", { className: "hod-ta", value: st.reponse, placeholder: T("Réponds-lui, corrige-le ou pose-lui une question"), onChange: function (e) { maj({ reponse: e.target.value }); } }),
        h("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 } },
          h(Micro, { texte: function (t) { setSt(function (x) { return Object.assign({}, x, { reponse: (String(x.reponse || "").trim() ? x.reponse + " " : "") + t }); }); }, aide: function (m) { maj({ err: m }); } }),
          h("button", { type: "button", className: "hod-btn", disabled: !String(st.reponse || "").trim() || st.reflechit, onClick: function () { repondre(); } }, T("Envoyer"))),
        boutonVoix(),
        action,
        st.err ? h("div", { className: "hod-err" }, st.err) : null);
    }
    return h("div", { className: "hod-voile", onClick: function (e) { if (e.target === e.currentTarget && st.etape !== "lecture") props.fermer(); } },
      h("div", { className: "hod-feuille", role: "dialog" }, h("div", { className: "hod-poignee" }), corps));
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
        var r = await supa.from("chevaux").select("id, nom, alias").is("supprime_le", null).order("nom", { ascending: true }).limit(400);
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
