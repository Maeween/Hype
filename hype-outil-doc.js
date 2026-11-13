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
      ".hod-err{margin-top:10px;font-size:12.5px;color:#E8A0A0}",
      ".hod-ok{margin-top:10px;font-size:13px;color:#96CDAA}"
    ].join("\n");
    document.head.appendChild(st);
  }

  var TYPES_SOIN_FR = [["ferrure", "Maréchal (ferrure)"], ["parage", "Maréchal (parage)"], ["vermifuge", "Vermifuge"], ["vaccin", "Vaccin"], ["dentiste", "Dentiste"], ["osteopathe", "Ostéopathe"], ["veterinaire", "Vétérinaire"], ["traitement", "Traitement"], ["autre", "Autre soin"]];
  var TYPES_SOIN = TYPES_SOIN_FR;   /* libellés traduits à l'affichage : T(t[1]) */
  var NOMS_TYPE = { liste_soins: "une liste de soins", carnet_vaccins: "un carnet de vaccination", papiers_cheval: "les papiers du cheval (document d'identification)", ordonnance: "une ordonnance", facture: "une facture", programme: "le programme d'un concours", ordre_passage: "un ordre de passage", resultats: "des résultats de concours", autre: "un document" };

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
      + "1) Dis ce que c'est (type) parmi : liste_soins (dates de soins pour un ou plusieurs chevaux : marechal, vermifuge, vaccin, dentiste, osteopathe, veterinaire... meme une simple liste de noms de chevaux avec une consigne de la personne), carnet_vaccins (pages de vaccination d'un livret), papiers_cheval (document d'identification, SIRE, pedigree), ordonnance, facture, programme (programme d'un concours), ordre_passage (liste de depart d'un concours), resultats (resultats d'un concours), autre. "
      + "2) Extrais ce qui sert. 3) Si tu as un VRAI doute (type, cheval, date, soin), pose UNE question courte et precise a la personne, en la tutoyant (ex. « Est-ce bien les dates de marechalerie de Cirrus, Ecolo et Elfe ? »). Tiens compte de ce que la personne a deja repondu. "
      + "Chevaux de la personne (pour reconnaitre les noms, meme mal ecrits) : " + JSON.stringify((contexte.chevaux || []).slice(0, 150).map(function (c) { return c.nom + (c.alias ? " (" + c.alias + ")" : ""); })) + ". "
      + (contexte.cheval ? "La personne est sur la page du cheval : " + contexte.cheval + ". " : "")
      + (contexte.concours ? "La personne est sur la page d'un concours. " : "")
      + "Ecris resume et question dans cette langue (code) : " + langue() + ". "
      + "Date du jour : " + new Date().toISOString().slice(0, 10) + ". Si l'annee n'est pas ecrite, prends la plus logique (jamais dans le futur pour un soin deja fait). "
      + "Reponds UNIQUEMENT en JSON : {\"type\":\"...\",\"resume\":\"une phrase simple qui dit ce que tu as compris\",\"question\":\"ta question s'il y a un doute, sinon vide\","
      + "\"cheval\":\"nom du cheval concerne si un seul, sinon vide\",\"soins\":[{\"cheval\":\"nom\",\"soin\":\"ferrure|parage|vermifuge|vaccin|dentiste|osteopathe|veterinaire|traitement|autre\",\"date\":\"AAAA-MM-JJ ou vide\",\"detail\":\"precision courte ou vide\"}],"
      + "\"papiers\":{\"sire\":\"\",\"ueln\":\"\",\"naissance\":\"AAAA-MM-JJ ou vide\",\"sexe\":\"\",\"robe\":\"\",\"race\":\"\",\"pere\":\"\",\"mere\":\"\",\"naisseur\":\"\"}}. "
      + "soins : seulement pour liste_soins (une ligne par cheval et par soin). papiers : seulement pour papiers_cheval. N'invente RIEN : ce qui est illisible reste vide.";
    var blocs = images.map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
    var txt = images.length > 1 ? "Ces images sont les pages d'un meme document." : "Voici le document.";
    if (contexte.note) txt += " La personne precise : « " + contexte.note + " ».";
    (echanges || []).forEach(function (e) { txt += " Tu avais demande : « " + e.q + " ». La personne a repondu : « " + e.r + " »."; });
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
    return { type: String(o.type || "autre"), resume: String(o.resume || ""), question: String(o.question || "").trim(), cheval: String(o.cheval || ""), soins: Array.isArray(o.soins) ? o.soins : [], papiers: o.papiers || {} };
  }

  function Feuille(props) {
    var app = (typeof useApp === "function") ? useApp() : {};
    var _e = React.useState({ etape: "choix", note: "", fichier: null, images: null, lu: null, echanges: [], reponse: "", lignes: [], chevalId: "", err: "", ok: "", busy: false });
    var st = _e[0], setSt = _e[1];
    function maj(o) { setSt(function (x) { return Object.assign({}, x, o); }); }
    var refFic = React.useRef(null);
    var chevaux = props.chevaux || [];

    async function lire(f, echanges) {
      maj({ etape: "lecture", err: "", ok: "" });
      try {
        var imgs = st.images && !f ? st.images : await imagesDe(f || st.fichier);
        var lu = await lireDocument(imgs, { chevaux: chevaux, cheval: props.chevalNom, concours: !!props.concoursId, note: st.note }, echanges || st.echanges);
        var lignes = (lu.soins || []).map(function (s, i) {
          var c = trouverCheval(s.cheval, chevaux);
          var soin = TYPES_SOIN.some(function (t) { return t[0] === s.soin; }) ? s.soin : "autre";
          return { k: "l" + i, nomLu: String(s.cheval || ""), chevalId: c ? c.id : "", soin: soin, date: /^\d{4}-\d{2}-\d{2}$/.test(String(s.date || "")) ? s.date : "", detail: String(s.detail || ""), coche: !!c && /^\d{4}-\d{2}-\d{2}$/.test(String(s.date || "")) };
        });
        var c1 = trouverCheval(lu.cheval, chevaux);
        maj({ etape: "compris", images: imgs, lu: lu, lignes: lignes, chevalId: (c1 && c1.id) || props.chevalId || "", reponse: "" });
      } catch (eL) { maj({ etape: "choix", err: T("Lecture impossible : ") + String((eL && eL.message) || eL) }); }
    }
    function choisir(e) {
      var f = e && e.target && e.target.files && e.target.files[0];
      try { e.target.value = ""; } catch (eV) { }
      if (!f) return;
      maj({ fichier: f, images: null, echanges: [] });
      setTimeout(function () { lire(f, []); }, 0);
    }
    function repondre() {
      var r = String(st.reponse || "").trim(); if (!r) return;
      var ech = st.echanges.concat([{ q: (st.lu && st.lu.question) || "C'est bien ça ?", r: r }]);
      maj({ echanges: ech });
      lire(null, ech);
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
    async function rangerDoc(typeDoc) {
      var f = st.fichier; var chId = st.chevalId;
      if (!f || !chId) { maj({ err: T("Choisis le cheval concerné.") }); return; }
      maj({ busy: true, err: "" });
      try {
        var ext = (String(f.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (/pdf/i.test(f.type) ? "pdf" : "jpg");
        var chemin = String(chId) + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
        var up = await supa.storage.from("sante").upload(chemin, f, { contentType: f.type || undefined, upsert: false });
        if (up && up.error) throw up.error;
        var titre = typeDoc === "autre" && st.lu && st.lu.type === "papiers_cheval" ? "Papiers du cheval" : null;
        var r = await supa.from("cheval_documents").insert({ cheval_id: chId, type: typeDoc, titre: titre, date_doc: new Date().toISOString().slice(0, 10), chemin: chemin, mime: f.type || null, taille: f.size || null }).select("id");
        if ((r && r.error) || !r || !r.data || !r.data.length) { try { await supa.storage.from("sante").remove([chemin]); } catch (eR) { } throw (r && r.error) || new Error(T("la base a refusé (droits sur ce cheval ?)")); }
        maj({ busy: false, etape: "fini", ok: T("✓ Document rangé dans la page Santé de ") + ((chevaux.filter(function (c) { return c.id === chId; })[0] || {}).nom || T("ce cheval")) + "." });
      } catch (eD) { maj({ busy: false, err: T("Pas rangé : ") + String((eD && eD.message) || eD) }); }
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
        h("div", { className: "hod-k" }, T("Un document ?")),
        h("div", { className: "hod-titre" }, T("Donne-le moi.")),
        h("div", { className: "hod-note" }, T("Photo, capture d’écran ou PDF — même écrit à la main. Tu peux me dire en deux mots ce que c’est (avec le micro du clavier si tu préfères parler).")),
        h("textarea", { className: "hod-ta", value: st.note, placeholder: T("Facultatif : « Cirrus, Ecolo et Elfe ont vu le maréchal ce matin »"), onChange: function (e) { maj({ note: e.target.value }); } }),
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
      } else if (type === "resultats") {
        action = h("div", { className: "hod-bloc" }, h("div", { className: "hod-note" }, T("Les résultats se lisent encore depuis la carte « Résultats » de la fiche du concours : je les brancherai ici à la prochaine étape.")),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn", onClick: props.fermer }, T("Fermer"))));
      } else {
        var typeDoc = type === "ordonnance" ? "ordonnance" : type === "facture" ? "facture" : "autre";
        var p = lu.papiers || {};
        var infos = type === "papiers_cheval" ? [[T("N° SIRE"), p.sire], ["UELN", p.ueln], [T("Naissance"), p.naissance], [T("Sexe"), p.sexe], [T("Robe"), p.robe], [T("Race"), p.race], [T("Père"), p.pere], [T("Mère"), p.mere], [T("Naisseur"), p.naisseur]].filter(function (x) { return x[1]; }) : [];
        action = h("div", { className: "hod-bloc" },
          infos.length ? h("div", { style: { marginBottom: 10 } }, h("div", { className: "hod-k", style: { marginBottom: 6 } }, T("Ce que j’ai lu")),
            infos.map(function (x) { return h("div", { key: x[0], style: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, padding: "3px 0" } }, h("span", { style: { color: "rgba(243,238,228,.6)" } }, x[0]), h("span", null, x[1])); }),
            h("div", { className: "hod-note", style: { marginTop: 6 } }, T("Bientôt : je compléterai la fiche du cheval avec ces infos (avec ton accord). Pour l’instant, je range le document."))) : null,
          h("div", { className: "hod-note" }, T("Je le range dans les documents de la page Santé du cheval :")), choixCheval(),
          h("div", { className: "hod-bas" }, h("button", { type: "button", className: "hod-btn sec", onClick: props.fermer }, T("Annuler")), h("button", { type: "button", className: "hod-btn", disabled: st.busy, onClick: function () { rangerDoc(typeDoc); } }, st.busy ? "…" : T("Ranger le document"))));
      }
      corps = h("div", null,
        h("div", { className: "hod-k" }, T("Ce que j’ai compris")),
        h("div", { className: "hod-titre" }, T("C’est ") + T(NOMS_TYPE[type] || NOMS_TYPE.autre) + "."),
        lu.resume ? h("div", { className: "hod-note" }, lu.resume) : null,
        h("div", { className: "hod-q" },
          lu.question || T("Si je me suis trompé, dis-le-moi : je relis avec ta réponse."),
          h("textarea", { className: "hod-ta", value: st.reponse, placeholder: T("Ta réponse (tu peux dicter avec le micro du clavier)"), onChange: function (e) { maj({ reponse: e.target.value }); } }),
          h("div", { style: { textAlign: "end", marginTop: 8 } }, h("button", { type: "button", className: "hod-btn", disabled: !String(st.reponse || "").trim(), onClick: repondre }, T("Répondre et relire")))),
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
          h("div", { className: "hod-k" }, T("Un document ?")),
          h("h3", null, T("Hype s’occupe du reste.")),
          h("p", null, T("Photo ou PDF : il le lit, le range et remplit les bonnes pages.")),
          h("button", { type: "button", className: "hod-btn", onClick: ouvrir }, T("＋ Ajouter un document")),
          h("div", null, h("button", { type: "button", className: "hod-plus" + (ouv ? " ouv" : ""), onClick: function () { setOuv(!ouv); } }, T("Tout ce qu’il sait lire "), h("span", null, "⌄"))),
          ouv ? h("div", { className: "hod-liste" }, T("Papiers du cheval et n° SIRE · carnet de vaccins · listes de soins (maréchal, vermifuge, dentiste…), même écrites à la main · ordonnances · factures · programme, ordre de passage et horaires — il reconnaît le cheval, te pose une question s’il a un doute, et range tout au même endroit.")) : null)),
      feuille ? h(Feuille, { fermer: function () { setFeuille(false); }, chevaux: chevaux || [], chevalId: chevalCtx && chevalCtx.id, chevalNom: chevalCtx && chevalCtx.nom, concoursId: concoursId }) : null);
  }

  window.HypeOutilDoc = { Encart: Encart };
})();
