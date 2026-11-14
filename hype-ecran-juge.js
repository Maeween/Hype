/* ═══════════════════════════════════════════════════════════════════════════════════════════════════
   HYPE — « JUGER UNE REPRISE » (14/11/2026)
   Blandine (13/11 23h25 → 14/11 01h01) : « si les juges pouvaient avoir juste à dicter à chaque figure et que Hey Baby
   écrive la note et le commentaire, ce serait juste ouf » ; « plus besoin de lapins » ; « ça fait tous les calculs, le
   classement par cavalier, sa note globale ». Maquette montrée le 13/11 (maq_juge).
   Hypothèses prises (à confirmer par Blandine, questions posées) : concours internes / Challenge / entraînements ;
   le coach ou l'équipe de l'écurie juge ; ouverture depuis les Passages d'un concours ou depuis l'outil ; notes
   d'ensemble dictées comme les figures.
   - Reprises : REPRISES_FFE (index.html), ordre ORDRE_REPRISES_FFE. Les fiches condensées n'ont pas les coefficients :
     coefficient 1 par défaut, réglable figure par figure (×2…) — À VÉRIFIER sur le protocole officiel.
   - Dictée : reconnaissance vocale du navigateur ; la note est lue dans la phrase (« six et demi », « 6,5 », « sept
     virgule cinq »…), le reste devient le commentaire. On passe tout seul à la figure suivante.
   - Calculs : note × coefficient, total, total possible, pourcentage ; brouillon gardé sur le téléphone à chaque note.
   - Envoi : table dressage_feuilles (si elle existe en base) ; sinon la feuille reste en brouillon et on le DIT.
   Design : héros façon Vidéothèque (photo entière, courbe dorée, titre en dessous), noir et ivoire, boutons à contour.
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */
(function () {
  var h = React.createElement;
  var OR = "#C9A66B";
  /* 14/11 09h35 (Blandine : « au niveau couleurs ce n'est pas lisible ») : textes en ivoire plein, doré plus clair pour les textes, plus d'italique fin */
  var ORT = "#E8CB94", IV2 = "#ECE6DA";
  var TXT = {
    "Le classement": ["Ranking", "Clasificación", "Classifica", "順位", "Rangliste", "الترتيب", "排名", "Klassement", "Classificação", "Placering", "Классификация", "Klasyfikacja", "순위", "رده‌بندی"],
    "Moyenne de ": ["Average of ", "Media de ", "Media di ", "平均：", "Durchschnitt von ", "متوسط ", "平均：", "Gemiddelde van ", "Média de ", "Medel av ", "Среднее ", "Średnia z ", "평균: ", "میانگین "],
    " juges": [" judges", " jueces", " giudici", "人の審査員", " Richtern", " حكام", "位裁判", " juryleden", " juízes", " domare", " судей", " sędziów", "명의 심판", " داور"],
    "Juge en": ["Judge at", "Juez en", "Giudice in", "審査員", "Richter bei", "الحكم في", "裁判位置", "Jury bij", "Juiz em", "Domare vid", "Судья в", "Sędzia w", "심판 위치", "داور در"],
    "Le classement se met à jour tout seul à chaque feuille signée. En cas d’égalité, départage selon le règlement de la FFE.": ["The ranking updates itself with each signed sheet. In case of a tie, the FFE rules decide.", "La clasificación se actualiza sola con cada hoja firmada. En caso de empate, se desempata según el reglamento de la FFE.", "La classifica si aggiorna da sola a ogni foglio firmato. In caso di parità, spareggio secondo il regolamento FFE.", "署名された用紙ごとに順位が自動更新されます。同点の場合はFFE規則で決めます。", "Die Rangliste aktualisiert sich bei jedem unterschriebenen Blatt. Bei Gleichstand entscheidet das FFE-Reglement.", "يتحدّث الترتيب تلقائيًا مع كل ورقة موقّعة. في حال التعادل، يُحسم حسب لوائح FFE.", "每签署一张评分表，排名自动更新。如有并列，按 FFE 规则决定。", "Het klassement werkt zichzelf bij na elk getekend blad. Bij gelijkstand beslist het FFE-reglement.", "A classificação atualiza-se sozinha a cada folha assinada. Em caso de empate, desempata-se segundo o regulamento da FFE.", "Placeringen uppdateras själv för varje signerat protokoll. Vid lika avgör FFE:s regler.", "Классификация обновляется сама с каждым подписанным протоколом. При равенстве решают правила FFE.", "Klasyfikacja aktualizuje się sama po każdym podpisanym protokole. Przy remisie decyduje regulamin FFE.", "서명된 채점표마다 순위가 자동으로 갱신돼. 동점이면 FFE 규정에 따라 가려.", "رده‌بندی با هر برگهٔ امضاشده خودکار به‌روز می‌شود. در تساوی، طبق مقررات FFE تعیین می‌شود."],
    "Retour": ["Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로", "بازگشت"],
    "Juger une reprise": ["Judge a test", "Juzgar una reprise", "Giudicare una ripresa", "課目を審査する", "Eine Aufgabe richten", "تحكيم اختبار", "评判一套考核", "Een proef jureren", "Julgar uma reprise", "Döma ett program", "Судить езду", "Sędziować program", "과목 심사하기", "داوری یک برنامه"],
    "Nouvelle feuille": ["New sheet", "Nueva hoja", "Nuovo foglio", "新しい採点用紙", "Neues Protokoll", "ورقة جديدة", "新评分表", "Nieuw protocol", "Nova folha", "Nytt protokoll", "Новый протокол", "Nowy protokół", "새 채점표", "برگهٔ تازه"],
    "Choisis la reprise et le couple, puis dicte chaque figure.": ["Choose the test and the pair, then dictate each movement.", "Elige la reprise y la pareja, y dicta cada figura.", "Scegli la ripresa e il binomio, poi detta ogni figura.", "課目とペアを選び、各運動を口述してね。", "Wähle Aufgabe und Paar, dann diktiere jede Lektion.", "اختر الاختبار والثنائي، ثم أملِ كل حركة.", "选择考核和人马组合，然后逐项口述。", "Kies de proef en de combinatie, dicteer dan elke oefening.", "Escolhe a reprise e o conjunto, depois dita cada figura.", "Välj program och ekipage och diktera sedan varje rörelse.", "Выбери езду и пару, затем диктуй каждое упражнение.", "Wybierz program i parę, potem dyktuj każdy ruch.", "과목과 콤비를 고른 뒤 동작마다 불러 줘.", "برنامه و زوج را انتخاب کن، بعد هر حرکت را دیکته کن."],
    "Reprise": ["Test", "Reprise", "Ripresa", "課目", "Aufgabe", "الاختبار", "考核", "Proef", "Reprise", "Program", "Езда", "Program", "과목", "برنامه"],
    "— Quelle reprise ? —": ["— Which test? —", "— ¿Qué reprise? —", "— Quale ripresa? —", "— どの課目？ —", "— Welche Aufgabe? —", "— أي اختبار؟ —", "— 哪套考核？ —", "— Welke proef? —", "— Que reprise? —", "— Vilket program? —", "— Какая езда? —", "— Który program? —", "— 어떤 과목? —", "— کدام برنامه؟ —"],
    "Les couples engagés": ["Entered pairs", "Parejas inscritas", "Binomi iscritti", "エントリーしたペア", "Genannte Paare", "الثنائيات المسجلة", "已报名组合", "Ingeschreven combinaties", "Conjuntos inscritos", "Anmälda ekipage", "Заявленные пары", "Zgłoszone pary", "참가 콤비", "زوج‌های ثبت‌نام‌شده"],
    "Cavalier": ["Rider", "Jinete", "Cavaliere", "ライダー", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수", "سوارکار"],
    "Cheval": ["Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말", "اسب"],
    "Ta place de juge": ["Your judge position", "Tu posición de juez", "La tua posizione di giudice", "審査員の位置", "Dein Richterplatz", "موقعك كحَكَم", "你的裁判位置", "Jouw jurypositie", "A tua posição de juiz", "Din domarplats", "Твоё место судьи", "Twoje miejsce sędziego", "심판 위치", "جایگاه داوری‌ات"],
    "Commencer la feuille": ["Start the sheet", "Empezar la hoja", "Inizia il foglio", "採点を始める", "Protokoll beginnen", "ابدأ الورقة", "开始评分", "Protocol starten", "Começar a folha", "Starta protokollet", "Начать протокол", "Rozpocznij protokół", "채점 시작", "شروع برگه"],
    "La dictée n’est pas disponible ici : utilise le micro du clavier dans le commentaire, et touche la note.": ["Dictation isn't available here: use the keyboard mic in the comment, and tap the mark.", "El dictado no está disponible aquí: usa el micro del teclado en el comentario y toca la nota.", "La dettatura non è disponibile qui: usa il microfono della tastiera nel commento e tocca il voto.", "ここでは音声入力が使えません：コメント欄でキーボードのマイクを使い、点数をタップしてね。", "Diktat ist hier nicht verfügbar: Nutze das Tastaturmikro im Kommentar und tippe die Note an.", "الإملاء غير متاح هنا: استخدم ميكروفون لوحة المفاتيح في التعليق، واضغط على العلامة.", "此处无法语音输入：在评语中使用键盘麦克风，并点选分数。", "Dicteren kan hier niet: gebruik de microfoon van het toetsenbord in de opmerking en tik het cijfer aan.", "O ditado não está disponível aqui: usa o microfone do teclado no comentário e toca na nota.", "Diktering fungerar inte här: använd tangentbordets mikrofon i kommentaren och tryck på poängen.", "Диктовка здесь недоступна: используй микрофон клавиатуры в комментарии и нажми оценку.", "Dyktowanie nie działa tutaj: użyj mikrofonu klawiatury w komentarzu i dotknij oceny.", "여기서는 받아쓰기가 안 돼: 코멘트에서 키보드 마이크를 쓰고 점수를 눌러 줘.", "دیکته اینجا در دسترس نیست: در توضیح از میکروفون صفحه‌کلید استفاده کن و نمره را بزن."],
    "Je n’ai pas entendu de note : redis-la au début de la phrase, ou touche-la.": ["I didn't hear a mark: say it again at the start of the sentence, or tap it.", "No he oído la nota: repítela al principio de la frase o tócala.", "Non ho sentito il voto: ripetilo all'inizio della frase o toccalo.", "点数が聞き取れませんでした：文の最初にもう一度言うか、タップしてね。", "Ich habe keine Note gehört: sag sie am Satzanfang noch einmal oder tippe sie an.", "لم أسمع علامة: أعدها في بداية الجملة أو اضغط عليها.", "没听到分数：请在句首再说一次，或直接点选。", "Ik hoorde geen cijfer: zeg het opnieuw aan het begin van de zin of tik het aan.", "Não ouvi a nota: repete-a no início da frase ou toca nela.", "Jag hörde ingen poäng: säg den igen i början av meningen eller tryck på den.", "Я не услышал оценку: повтори её в начале фразы или нажми.", "Nie usłyszałem oceny: powtórz ją na początku zdania albo dotknij.", "점수를 못 들었어: 문장 처음에 다시 말하거나 눌러 줘.", "نمره را نشنیدم: آن را اول جمله دوباره بگو یا رویش بزن."],
    "✓ Feuille signée et envoyée. Au couple suivant !": ["✓ Sheet signed and sent. On to the next pair!", "✓ Hoja firmada y enviada. ¡A la siguiente pareja!", "✓ Foglio firmato e inviato. Al prossimo binomio!", "✓ 署名して送信しました。次のペアへ！", "✓ Protokoll unterschrieben und gesendet. Zum nächsten Paar!", "✓ وُقّعت الورقة وأُرسلت. إلى الثنائي التالي!", "✓ 评分表已签署并发送。下一组！", "✓ Protocol getekend en verzonden. Op naar de volgende combinatie!", "✓ Folha assinada e enviada. Próximo conjunto!", "✓ Protokollet är signerat och skickat. Nästa ekipage!", "✓ Протокол подписан и отправлен. Следующая пара!", "✓ Protokół podpisany i wysłany. Następna para!", "✓ 서명하고 보냈어. 다음 콤비로!", "✓ برگه امضا و فرستاده شد. زوج بعدی!"],
    "Pas encore envoyée : la feuille reste sur ce téléphone. ": ["Not sent yet: the sheet stays on this phone. ", "Aún no enviada: la hoja queda en este teléfono. ", "Non ancora inviato: il foglio resta su questo telefono. ", "まだ送信されていません：用紙はこの端末に残ります。", "Noch nicht gesendet: das Protokoll bleibt auf diesem Telefon. ", "لم تُرسل بعد: تبقى الورقة على هذا الهاتف. ", "尚未发送：评分表保留在此手机上。", "Nog niet verzonden: het protocol blijft op deze telefoon. ", "Ainda não enviada: a folha fica neste telemóvel. ", "Inte skickat än: protokollet finns kvar på telefonen. ", "Ещё не отправлен: протокол остаётся на этом телефоне. ", "Jeszcze nie wysłano: protokół zostaje na tym telefonie. ", "아직 안 보냄: 채점표는 이 폰에 남아 있어. ", "هنوز فرستاده نشد: برگه روی همین گوشی می‌ماند. "],
    "juge en": ["judge at", "juez en", "giudice in", "審査位置", "Richter bei", "حكم في", "裁判位置", "jury bij", "juiz em", "domare vid", "судья в", "sędzia w", "심판 위치", "داور در"],
    "notes sur": ["marks out of", "notas sobre", "voti su", "点満点：", "Noten aus", "العلامات من", "满分", "cijfers op", "notas em", "poäng av", "оценки из", "oceny na", "만점", "نمره از"],
    "NOTE D’ENSEMBLE": ["COLLECTIVE MARK", "NOTA DE CONJUNTO", "VOTO D'INSIEME", "総合点", "GESAMTNOTE", "العلامة الإجمالية", "总体评分", "ALGEMENE INDRUK", "NOTA DE CONJUNTO", "HELHETSBETYG", "ОБЩАЯ ОЦЕНКА", "OCENA OGÓLNA", "종합 점수", "نمرهٔ کلی"],
    "FIGURE": ["MOVEMENT", "FIGURA", "FIGURA", "運動", "LEKTION", "الحركة", "动作", "OEFENING", "FIGURA", "RÖRELSE", "УПРАЖНЕНИЕ", "RUCH", "동작", "حرکت"],
    "coefficient": ["coefficient", "coeficiente", "coefficiente", "係数", "Koeffizient", "المعامل", "系数", "coëfficiënt", "coeficiente", "koefficient", "коэффициент", "współczynnik", "가중치", "ضریب"],
    "Dicter la note et le commentaire": ["Dictate the mark and comment", "Dictar la nota y el comentario", "Detta voto e commento", "点数とコメントを口述", "Note und Kommentar diktieren", "إملاء العلامة والتعليق", "口述分数和评语", "Cijfer en opmerking dicteren", "Ditar a nota e o comentário", "Diktera poäng och kommentar", "Продиктовать оценку и комментарий", "Podyktuj ocenę i komentarz", "점수와 코멘트 말하기", "دیکتهٔ نمره و توضیح"],
    "JE T’ÉCOUTE…": ["LISTENING…", "TE ESCUCHO…", "TI ASCOLTO…", "聞いています…", "ICH HÖRE ZU…", "أستمع…", "正在听……", "IK LUISTER…", "ESTOU A OUVIR…", "JAG LYSSNAR…", "СЛУШАЮ…", "SŁUCHAM…", "듣고 있어…", "گوش می‌دهم…"],
    "Touche et dis la note, puis ton commentaire": ["Tap and say the mark, then your comment", "Toca y di la nota, luego tu comentario", "Tocca e di' il voto, poi il commento", "タップして点数、続けてコメントを言ってね", "Tippe und sag die Note, dann deinen Kommentar", "اضغط وقل العلامة ثم تعليقك", "点一下，先说分数，再说评语", "Tik en zeg het cijfer, dan je opmerking", "Toca e diz a nota, depois o comentário", "Tryck och säg poängen, sedan din kommentar", "Нажми и скажи оценку, затем комментарий", "Dotknij i powiedz ocenę, potem komentarz", "눌러서 점수, 그다음 코멘트를 말해", "بزن و نمره را بگو، بعد توضیحت را"],
    "note": ["mark", "nota", "voto", "点数", "Note", "العلامة", "分数", "cijfer", "nota", "poäng", "оценка", "ocena", "점수", "نمره"],
    "Commentaire": ["Comment", "Comentario", "Commento", "コメント", "Kommentar", "التعليق", "评语", "Opmerking", "Comentário", "Kommentar", "Комментарий", "Komentarz", "코멘트", "توضیح"],
    "Ton commentaire": ["Your comment", "Tu comentario", "Il tuo commento", "コメント", "Dein Kommentar", "تعليقك", "你的评语", "Je opmerking", "O teu comentário", "Din kommentar", "Твой комментарий", "Twój komentarz", "네 코멘트", "توضیح تو"],
    "La feuille": ["The sheet", "La hoja", "Il foglio", "採点用紙", "Das Protokoll", "الورقة", "评分表", "Het protocol", "A folha", "Protokollet", "Протокол", "Protokół", "채점표", "برگه"],
    "notées": ["marked", "puntuadas", "valutate", "採点済み", "benotet", "مُقيّمة", "已评", "beoordeeld", "avaliadas", "bedömda", "оценено", "ocenionych", "채점됨", "نمره‌داده‌شده"],
    "Total": ["Total", "Total", "Totale", "合計", "Summe", "المجموع", "总分", "Totaal", "Total", "Totalt", "Итого", "Suma", "합계", "جمع"],
    "Moyenne": ["Average", "Media", "Media", "平均", "Durchschnitt", "المتوسط", "平均", "Gemiddelde", "Média", "Medel", "Среднее", "Średnia", "평균", "میانگین"],
    "Touche encore pour effacer": ["Tap again to clear", "Toca otra vez para borrar", "Tocca di nuovo per cancellare", "もう一度タップで消去", "Zum Löschen erneut tippen", "اضغط مرة أخرى للمسح", "再点一次清除", "Tik nogmaals om te wissen", "Toca outra vez para apagar", "Tryck igen för att rensa", "Нажми ещё раз, чтобы стереть", "Dotknij ponownie, aby wyczyścić", "한 번 더 누르면 지워져", "دوباره بزن تا پاک شود"],
    "Signer et envoyer": ["Sign and send", "Firmar y enviar", "Firma e invia", "署名して送信", "Unterschreiben und senden", "وقّع وأرسل", "签署并发送", "Tekenen en verzenden", "Assinar e enviar", "Signera och skicka", "Подписать и отправить", "Podpisz i wyślij", "서명하고 보내기", "امضا و ارسال"],
    "Dis la note puis ton commentaire, comme à un secrétaire : Hype écrit tout et passe à la figure suivante. Touche une ligne pour la corriger. Les coefficients se règlent en touchant « coefficient ». La feuille est gardée sur ton téléphone à chaque note.": ["Say the mark then your comment, as to a scribe: Hype writes it all and moves to the next movement. Tap a line to correct it. Set coefficients by tapping “coefficient”. The sheet is saved on your phone with every mark.", "Di la nota y luego tu comentario, como a un secretario: Hype lo escribe todo y pasa a la figura siguiente. Toca una línea para corregirla. Los coeficientes se ajustan tocando «coeficiente». La hoja se guarda en tu teléfono con cada nota.", "Di' il voto e poi il commento, come a un segretario: Hype scrive tutto e passa alla figura successiva. Tocca una riga per correggerla. I coefficienti si regolano toccando «coefficiente». Il foglio viene salvato sul telefono a ogni voto.", "書記に伝えるように点数、続けてコメントを言ってね：Hypeがすべて書き、次の運動へ進みます。行をタップすると修正できます。係数は「係数」をタップして設定。採点ごとに端末へ保存されます。", "Sag die Note und dann deinen Kommentar, wie zu einem Schreiber: Hype schreibt alles und geht zur nächsten Lektion. Tippe eine Zeile an, um sie zu korrigieren. Koeffizienten stellst du über „Koeffizient“ ein. Das Protokoll wird bei jeder Note auf deinem Telefon gespeichert.", "قل العلامة ثم تعليقك، كأنك تملي على كاتب: يكتب Hype كل شيء وينتقل إلى الحركة التالية. اضغط على سطر لتصحيحه. تُضبط المعاملات بالضغط على «المعامل». تُحفظ الورقة على هاتفك مع كل علامة.", "像对书记员一样先说分数再说评语：Hype 会全部记下并进入下一个动作。点某一行可修改。点「系数」可设置系数。每打一分都会保存在手机上。", "Zeg het cijfer en dan je opmerking, zoals tegen een schrijver: Hype schrijft alles op en gaat naar de volgende oefening. Tik op een regel om hem te verbeteren. Coëfficiënten stel je in via „coëfficiënt”. Het protocol wordt bij elk cijfer op je telefoon bewaard.", "Diz a nota e depois o comentário, como a um secretário: o Hype escreve tudo e passa à figura seguinte. Toca numa linha para a corrigir. Os coeficientes ajustam-se tocando em «coeficiente». A folha fica guardada no telemóvel a cada nota.", "Säg poängen och sedan din kommentar, som till en sekreterare: Hype skriver allt och går vidare till nästa rörelse. Tryck på en rad för att rätta den. Koefficienter ställs in via ”koefficient”. Protokollet sparas på telefonen vid varje poäng.", "Скажи оценку, затем комментарий, как секретарю: Hype всё запишет и перейдёт к следующему упражнению. Нажми на строку, чтобы исправить. Коэффициенты меняются нажатием на «коэффициент». Протокол сохраняется на телефоне после каждой оценки.", "Powiedz ocenę, a potem komentarz, jak do sekretarza: Hype wszystko zapisze i przejdzie do następnego ruchu. Dotknij wiersza, by go poprawić. Współczynniki ustawiasz, dotykając „współczynnik”. Protokół zapisuje się na telefonie przy każdej ocenie.", "서기에게 말하듯 점수, 그다음 코멘트를 말해: Hype가 다 적고 다음 동작으로 넘어가. 줄을 누르면 고칠 수 있어. 가중치는 「가중치」를 눌러 정해. 점수마다 폰에 저장돼.", "نمره و بعد توضیحت را بگو، مثل دیکته به یک منشی: Hype همه را می‌نویسد و به حرکت بعد می‌رود. برای اصلاح، روی یک ردیف بزن. ضریب‌ها با زدن «ضریب» تنظیم می‌شوند. برگه با هر نمره روی گوشی‌ات ذخیره می‌شود."],
    "Allures": ["Paces", "Aires", "Andature", "歩様", "Grundgangarten", "المشيات", "步法", "Gangen", "Andamentos", "Gångarter", "Аллюры", "Chody", "보법", "گام‌ها"],
    "Impulsion": ["Impulsion", "Impulsión", "Impulso", "推進力", "Schwung", "الاندفاع", "推进", "Impulsie", "Impulsão", "Framåtbjudning", "Импульс", "Impuls", "추진력", "تکانه"],
    "Soumission": ["Submission", "Sumisión", "Sottomissione", "従順性", "Durchlässigkeit", "الطاعة", "顺从", "Gehoorzaamheid", "Submissão", "Lydnad", "Подчинение", "Posłuszeństwo", "순종", "فرمان‌پذیری"],
    "Position et assiette du cavalier, effet des aides": ["Rider's position and seat, effect of the aids", "Posición y asiento del jinete, efecto de las ayudas", "Posizione e assetto del cavaliere, effetto degli aiuti", "騎乗者の姿勢と騎座、扶助の効果", "Sitz und Haltung des Reiters, Einwirkung der Hilfen", "وضعية الفارس وجلسته، وأثر المساعدات", "骑手姿势与坐姿、辅助效果", "Houding en zit van de ruiter, effect van de hulpen", "Posição e assento do cavaleiro, efeito das ajudas", "Ryttarens sits och hållning, hjälpernas verkan", "Посадка всадника, действие средств управления", "Dosiad i postawa jeźdźca, działanie pomocy", "기수의 자세와 시트, 부조의 효과", "وضعیت و نشست سوارکار، اثر کمک‌ها"]
  };
  function T(fr) { try { var lg = window.__hypeLangue || "fr"; var t = TXT[fr]; var L = ["en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko", "fa"]; var i = L.indexOf(lg); return (t && i >= 0 && t[i]) || fr; } catch (e) { return fr; } }

  function css() {
    if (document.getElementById("hype-juge-css")) return;
    var s = document.createElement("style"); s.id = "hype-juge-css";
    s.textContent = [
      ".hj{min-height:100vh;background:#050505;color:#F3EEE4;font-family:Montserrat,system-ui,sans-serif;padding-bottom:40px}",
      ".hj-hero{position:relative;background:#000;max-width:760px;margin:0 auto}",
      ".hj-hero img{display:block;width:100%;height:auto}",
      ".hj-hero:after{content:'';position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(180deg,rgba(0,0,0,0),#050505)}",
      ".hj-hero svg{position:absolute;left:0;right:0;bottom:-6px;width:100%;height:34px;z-index:2}",
      ".hj-ret{position:absolute;top:calc(env(safe-area-inset-top) + 12px);left:16px;z-index:3;font:inherit;font-size:14px;color:" + IV2 + ";border:1px solid rgba(243,238,228,.25);border-radius:999px;padding:6px 12px;background:rgba(0,0,0,.4)}",
      ".hj-in{max-width:720px;margin:0 auto;padding:0 20px}",
      ".hj-k{font-family:'Cinzel',Georgia,serif;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:" + ORT + "}",
      ".hj-h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:34px;line-height:1.05;margin:8px 0 6px}",
      ".hj-sous{font-size:15px;line-height:1.45;color:" + IV2 + "}.hj-sous b{color:#F3EEE4;font-weight:500}",
      ".hj-prog{display:flex;gap:3px;margin:18px 0 0}.hj-prog i{flex:1;height:3px;border-radius:3px;background:rgba(243,238,228,.12)}.hj-prog i.f{background:rgba(243,238,228,.45)}.hj-prog i.c{background:#F3EEE4}",
      ".hj-live{margin-top:18px;border:1px solid rgba(243,238,228,.14);border-radius:22px;padding:18px 16px 16px;background:#0A0A0A}",
      ".hj-row{display:flex;justify-content:space-between;align-items:center;gap:10px}",
      ".hj-pas{font-family:'Cinzel',Georgia,serif;font-size:12px;letter-spacing:.1em;color:#F3EEE4;border:1px solid rgba(243,238,228,.3);border-radius:999px;padding:4px 10px}",
      ".hj-coef{font:inherit;font-size:13px;color:" + IV2 + ";background:transparent;border:1px solid rgba(243,238,228,.2);border-radius:999px;padding:4px 10px}",
      ".hj-fig{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:27px;line-height:1.2;margin:12px 0 4px}",
      ".hj-mic{display:flex;flex-direction:column;align-items:center;margin:22px 0 6px}",
      ".hj-rond{width:92px;height:92px;border-radius:50%;border:1px solid rgba(243,238,228,.55);display:flex;align-items:center;justify-content:center;position:relative;background:transparent}",
      ".hj-rond:before{content:'';position:absolute;inset:-9px;border-radius:50%;border:1px solid rgba(243,238,228,.14)}",
      ".hj-rond:after{content:'';position:absolute;inset:-18px;border-radius:50%;border:1px solid rgba(243,238,228,.06)}",
      ".hj-rond.on{box-shadow:0 0 0 6px rgba(243,238,228,.1);border-color:#F3EEE4}",
      ".hj-ecoute{margin-top:18px;font-size:14.5px;letter-spacing:.02em;color:" + IV2 + ";text-align:center}",
      ".hj-dit{margin-top:14px;padding:12px 14px;border-radius:16px;background:rgba(243,238,228,.05);border:1px solid rgba(243,238,228,.14);font-size:17px;line-height:1.5;color:#F3EEE4}",
      ".hj-res{display:flex;gap:14px;align-items:flex-start;margin-top:14px;padding:12px 14px;border-radius:16px;background:#000;border:1px solid rgba(243,238,228,.08)}",
      ".hj-note{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:44px;line-height:1;min-width:64px}",
      ".hj-note small{display:block;font-family:Montserrat,sans-serif;font-size:12px;letter-spacing:.08em;color:" + IV2 + ";margin-top:4px;text-transform:uppercase}",
      ".hj-l{font-family:'Cinzel',Georgia,serif;font-size:12px;letter-spacing:.12em;color:" + IV2 + ";text-transform:uppercase;display:block;margin-bottom:4px}",
      ".hj-ta{width:100%;box-sizing:border-box;min-height:60px;background:transparent;border:none;color:#F3EEE4;font:inherit;font-size:16px;line-height:1.5;resize:vertical;padding:0;outline:none}",
      ".hj-pills{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}",
      ".hj-pill{font:inherit;font-size:16px;min-width:0;min-height:42px;padding:7px 10px;border-radius:999px;border:1px solid rgba(243,238,228,.28);background:transparent;color:#F3EEE4}",
      ".hj-pill.on{border-color:#F3EEE4;color:#F3EEE4;background:rgba(243,238,228,.14);box-shadow:0 0 0 1px #F3EEE4;font-weight:600}",
      ".hj-bas{display:flex;gap:10px;margin-top:16px}",
      ".hj-btn{flex:1;display:flex;align-items:center;justify-content:center;min-height:50px;border-radius:999px;border:1px solid " + OR + ";color:" + ORT + ";font:inherit;font-size:16px;background:transparent;padding:0 14px}",
      ".hj-btn.sec{border-color:rgba(243,238,228,.4);color:" + IV2 + "}.hj-btn:disabled{opacity:.45}",
      ".hj-h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:24px;margin:30px 0 6px;display:flex;justify-content:space-between;align-items:baseline}",
      ".hj-h2 span{font-family:Montserrat,sans-serif;font-size:14px;font-weight:400;color:" + IV2 + "}",
      ".hj-li{display:grid;grid-template-columns:26px 1fr 48px;gap:10px;padding:11px 4px;border-bottom:1px solid rgba(243,238,228,.07);align-items:start;cursor:pointer}",
      ".hj-li .n{font-family:'Cinzel',Georgia,serif;font-size:14px;color:" + IV2 + ";padding-top:2px}",
      ".hj-li .t{font-size:15px;line-height:1.45}.hj-li .c{display:block;font-size:14px;color:" + IV2 + ";margin-top:4px}",
      ".hj-li .v{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:25px;text-align:right}",
      ".hj-li.cur{background:rgba(243,238,228,.06);border-radius:10px}.hj-li.af{opacity:.8}",
      ".hj-total{margin-top:18px;border:1px solid rgba(243,238,228,.1);border-radius:18px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;background:#0A0A0A}",
      ".hj-total b{font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;font-weight:600}.hj-total span{font-size:14px;color:" + IV2 + "}",
      ".hj-astuce{margin-top:14px;font-size:14px;line-height:1.6;color:" + IV2 + "}",
      ".hj-sel{display:block;width:100%;box-sizing:border-box;margin-top:8px;background:#000;color:#F3EEE4;border:1px solid rgba(243,238,228,.24);border-radius:12px;padding:13px 14px;font:inherit;font-size:16px;color-scheme:dark}",
      ".hj-msg{margin-top:12px;font-size:15px;color:#96CDAA}.hj-err{margin-top:12px;font-size:15px;color:#F0B0B0}",
      /* 14/11 01h12 (Blandine : « garde bien le design, c'est un peu tristounet ») : carrière dessinée, couples en cartes photo, podium */
      ".hj-arene{display:flex;justify-content:center;margin:14px 0 2px}",
      ".hj-arene svg{width:130px;height:auto;overflow:visible}",
      ".hj-figwrap{display:flex;gap:14px;align-items:center}",
      ".hj-figwrap .hj-fig{flex:1;margin:0}",
      ".hj-encart{margin-top:22px;border:1px solid rgba(243,238,228,.12);border-radius:20px;padding:14px 14px 6px;background:#0A0A0A}",
      ".hj-encart .hj-k{margin-bottom:6px}",
      ".hj-couples{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}",
      ".hj-cp{position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.1);background:#000;text-align:left;padding:0;font:inherit;color:#F3EEE4;cursor:pointer}",
      ".hj-cp.on{border-color:#F3EEE4;box-shadow:0 0 0 1px #F3EEE4}",
      ".hj-cp-ph{aspect-ratio:4/3;background:#000;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;color:" + IV2 + "}",
      ".hj-cp-ph img{width:100%;height:100%;object-fit:contain;display:block}",
      ".hj-cp-t{padding:10px 12px 12px}.hj-cp-t b{display:block;font-weight:500;font-size:15px}.hj-cp-t span{display:block;font-size:13.5px;color:" + IV2 + ";margin-top:2px}",
      ".hj-podium{display:flex;gap:10px;align-items:flex-end;margin:12px 0 6px}",
      ".hj-pod{flex:1;text-align:center;border-radius:16px;border:1px solid rgba(243,238,228,.1);background:#000;padding:12px 6px 10px}",
      ".hj-pod.p1{border-color:rgba(243,238,228,.5);padding-top:18px}",
      ".hj-rang{width:34px;height:34px;margin:0 auto 6px;border-radius:50%;border:1px solid rgba(243,238,228,.4);display:flex;align-items:center;justify-content:center;font-family:'Cinzel',Georgia,serif;font-size:14px;color:#F3EEE4}",
      ".hj-pod b{display:block;font-weight:500;font-size:14px;line-height:1.25}.hj-pod span{display:block;font-size:13px;color:" + IV2 + ";margin-top:3px}",
      ".hj-pod em{display:block;font-style:normal;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:26px;margin-top:6px}",
      ".hj-sep{display:block;width:100%;height:20px;margin:18px 0 0}",
      /* jury CSO : compteurs barres / désobéissances */
      ".hj-cpts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}",
      ".hj-cpt{border:1px solid rgba(243,238,228,.12);border-radius:16px;padding:10px 12px;background:#000}",
      ".hj-cpt-b{display:flex;align-items:center;justify-content:space-between;margin-top:8px}.hj-cpt-b b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:30px}.hj-cpt-b .hj-pill{width:44px;padding:0;font-size:20px}"
    ].join("\n");
    document.head.appendChild(s);
  }

  /* ── lecture de la note dans une phrase dictée ── */
  var MOTS = { "zero": 0, "zéro": 0, "un": 1, "une": 1, "deux": 2, "trois": 3, "quatre": 4, "cinq": 5, "six": 6, "sept": 7, "huit": 8, "neuf": 9, "dix": 10 };
  function lireNote(phrase, max) {
    var p = String(phrase || "").trim(), bas = p.toLowerCase();
    var m = bas.match(/^\s*(\d{1,2})(?:\s*(?:[,.]|virgule)\s*(\d))?/), note = null, reste = p;
    if (m) { note = Number(m[1]) + (m[2] ? Number(m[2]) / 10 : 0); reste = p.slice(m[0].length); }
    else {
      var m2 = bas.match(/^\s*(z[ée]ro|une?|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\b(\s*(et demie?|virgule cinq|,\s*5))?/);
      if (m2) { note = MOTS[m2[1]] + (m2[2] ? .5 : 0); reste = p.slice(m2[0].length); }
    }
    if (note == null || note > max) return { note: null, com: p };
    note = Math.round(note * 2) / 2;
    reste = reste.replace(/^[\s.,;:!—–-]+/, "").trim();
    if (reste) reste = reste.charAt(0).toUpperCase() + reste.slice(1);
    return { note: note, com: reste };
  }
  function fmt(n) { return n == null || n === "" ? "—" : String(Math.round(n * 100) / 100).replace(".", ","); }

  /* carrière de dressage dessinée : 20 × 40 (A K E H C M B F) ou 20 × 60 si la figure cite V S R P ; lettres de la figure en or, reliées */
  var POS40 = { A: [50, 200], K: [6, 168], E: [6, 100], H: [6, 32], C: [50, 0], M: [94, 32], B: [94, 100], F: [94, 168], X: [50, 100], G: [50, 32], D: [50, 168] };
  var POS60 = { A: [50, 300], K: [6, 270], V: [6, 210], E: [6, 150], S: [6, 90], H: [6, 30], C: [50, 0], M: [94, 30], R: [94, 90], B: [94, 150], P: [94, 210], F: [94, 270], X: [50, 150], G: [50, 30], D: [50, 270], L: [50, 210], I: [50, 90] };
  function arene(texte) {
    var toks = (String(texte || "").match(/\b[A-Z]{1,4}\b/g) || []).filter(function (t) { return /^[AKVESHCMRBPFXGDLI]+$/.test(t); });
    var grand = toks.some(function (t) { return /[VSRPLI]/.test(t); });
    var P = grand ? POS60 : POS40, H = grand ? 300 : 200;
    var seq = []; toks.forEach(function (t) { t.split("").forEach(function (l) { if (P[l] && seq[seq.length - 1] !== l) seq.push(l); }); });
    var on = {}; seq.forEach(function (l) { on[l] = 1; });
    var pts = seq.map(function (l) { return P[l][0] + "," + P[l][1]; }).join(" ");
    return h("svg", { viewBox: "-20 -20 140 " + (H + 42), "aria-hidden": "true" },
      h("rect", { x: 6, y: 0, width: 88, height: H, fill: "rgba(243,238,228,.02)", stroke: "rgba(243,238,228,.28)", strokeWidth: 1 }),
      seq.length > 1 ? h("polyline", { points: pts, fill: "none", stroke: "rgba(243,238,228,.75)", strokeWidth: 1.4, strokeLinejoin: "round", strokeLinecap: "round", opacity: .9 }) : null,
      Object.keys(P).filter(function (l) { return !/[XGDLI]/.test(l) || on[l]; }).map(function (l) {
        var x = P[l][0], y = P[l][1], bord = x === 6 ? -12 : x === 94 ? 12 : 0, dy = y === 0 ? -8 : y === H ? 15 : 4;
        return h("g", { key: l },
          on[l] ? h("circle", { cx: x, cy: y, r: 3.2, fill: "#F3EEE4" }) : null,
          h("text", { x: x + bord, y: y + (bord ? 3 : dy), textAnchor: "middle", fontFamily: "Cinzel, Georgia, serif", fontSize: on[l] ? 15 : 11, fontWeight: on[l] ? 700 : 400, fill: on[l] ? "#F3EEE4" : "#D8D2C6" }, l));
      }));
  }
  var COURBE = function () { return h("svg", { className: "hj-sep", viewBox: "0 0 400 20", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 16 C 140 16, 240 4, 400 6", fill: "none", stroke: "rgba(201,166,107,.45)", strokeWidth: 1 })); };
  var ENSEMBLE = ["Allures", "Impulsion", "Soumission", "Position et assiette du cavalier, effet des aides"];

  function EcranJuge() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var REP = (typeof REPRISES_FFE !== "undefined") ? REPRISES_FFE : {};
    var ORDRE = (typeof ORDRE_REPRISES_FFE !== "undefined") ? ORDRE_REPRISES_FFE.filter(function (k) { return REP[k]; }) : Object.keys(REP);
    var cle = "hype_juge_" + (ctx.agenda_id || "libre");   /* une feuille en cours par concours : « Nouvelle feuille » pour le couple suivant */
    var _f = React.useState(function () { try { return JSON.parse(localStorage.getItem(cle) || "null"); } catch (e) { return null; } });
    var f = _f[0], setF0 = _f[1];
    function setF(n) { setF0(n); try { localStorage.setItem(cle, JSON.stringify(n)); } catch (e) { } }
    var _r = React.useState({ cavalier: ctx.cavalier || "", cheval: ctx.cheval || "", reprise: ctx.reprise || "", juge: "C" }), choix = _r[0], setChoix = _r[1];
    var _e = React.useState({ ecoute: false, dit: "", msg: "", err: "", busy: false }), e = _e[0], setE = _e[1];
    var recRef = React.useRef(null);
    var _ph = React.useState({}), photos = _ph[0], setPhotos = _ph[1];
    var _rg = React.useState(false), reglOuv = _rg[0], setReglOuv = _rg[1];
    React.useEffect(function () {
      var ids = (ctx.couples || []).map(function (c) { return c.cheval_id; }).filter(Boolean);
      if (!ids.length) return;
      try { supa.from("chevaux").select("id, photo_url").in("id", ids.slice(0, 100)).then(function (r) { var o = {}; ((r && !r.error && r.data) || []).forEach(function (c) { o[c.id] = c.photo_url || ""; }); setPhotos(o); }, function () { }); } catch (x) { }
    }, []);
    /* classement en direct : toutes les feuilles signées de ce concours, relues toutes les 15 s ; plusieurs juges = moyenne */
    var _c = React.useState([]), feuilles = _c[0], setFeuilles = _c[1];
    React.useEffect(function () {
      if (!ctx.agenda_id) return undefined;
      var vif = true;
      function lire() { try { supa.from("dressage_feuilles").select("id, reprise, cavalier, cavalier_id, cheval, cheval_id, juge_place, pourcentage, total, possible, lignes, created_at").eq("agenda_id", ctx.agenda_id).eq("statut", "signee").limit(1000).then(function (r) { if (vif && r && !r.error) setFeuilles(r.data || []); }, function () { }); } catch (x) { } }
      lire(); var t = setInterval(lire, 15000);
      return function () { vif = false; clearInterval(t); };
    }, [ctx.agenda_id, e.msg]);
    /* 14/11 09h50 : le cavalier consulte sa feuille (ouverte depuis son résultat du concours) — lecture seule, une feuille par juge.
       La base ne montre une feuille qu'au juge, au cavalier, à l'équipe qui gère le concours et à la modératrice. */
    var _v = React.useState(null), vues = _v[0], setVues = _v[1];
    React.useEffect(function () {
      var w = ctx.voir; if (!w || !ctx.agenda_id) return;
      try {
        var q = supa.from("dressage_feuilles").select("id, reprise, cavalier, cheval, juge_place, lignes, total, possible, pourcentage, created_at").eq("agenda_id", ctx.agenda_id).eq("statut", "signee");
        q = w.cavalier_id ? q.eq("cavalier_id", w.cavalier_id) : q.eq("cavalier", w.cavalier || "");
        if (w.cheval_id) q = q.eq("cheval_id", w.cheval_id);
        q.limit(20).then(function (r) { setVues((r && !r.error && r.data) || []); }, function () { setVues([]); });
      } catch (x) { setVues([]); }
    }, []);
    /* 14/11 09h45 : « Publier le classement » → table resultats (origine « juge », statut « saisie »), rattaché au concours,
       au cavalier et au cheval : il apparaît sur la fiche du concours, les performances et les podiums. Republier met à jour
       les mêmes lignes au lieu d'en créer de nouvelles. Égalité de pourcentage = même place (départage FFE à brancher). */
    var _pb = React.useState({}), pub = _pb[0], setPub = _pb[1];
    function placeTxt(n) { return n === 1 ? T("1er") : n + T("e"); }
    async function publierClassement(k, L, epreuve) {
      if (pub[k] !== "ok?") { var o1 = Object.assign({}, pub); o1[k] = "ok?"; setPub(o1); return; }
      var o2 = Object.assign({}, pub); o2[k] = "busy"; setPub(o2);
      try {
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (!u || !u.id) throw new Error(T("connecte-toi d’abord"));
        var ex = await supa.from("resultats").select("id, cavalier_id, cheval_id, cavalier").eq("agenda_id", ctx.agenda_id).eq("origine", "juge").eq("epreuve", epreuve).limit(400);
        var deja = (ex && !ex.error && ex.data) || [];
        var maint = new Date().toISOString(), pa = L.length, n = 0;
        for (var i = 0; i < L.length; i++) {
          var o = L[i], pc = o.moy == null ? null : Math.round(o.moy * 100) / 100, place = o.moy == null ? null : o.place;
          var ligne = { agenda_id: ctx.agenda_id, concours: ctx.concours || null, date_epreuve: String(ctx.date || "").slice(0, 10) || null, annee: String(ctx.date || "").slice(0, 4) || null,
            epreuve: epreuve, place: place, partants: pa, classement: place ? placeTxt(place) + " / " + pa + " · " + fmt(pc) + " %" : "El. / " + pa,
            cavalier: o.cavalier, cavalier_id: o.cavalier_id, cheval_id: o.cheval_id, statut: "saisie", visible: true, maj_par: u.id, maj_le: maint };
          var avant = null; deja.forEach(function (d) { if (!avant && ((o.cavalier_id && d.cavalier_id === o.cavalier_id) || (!o.cavalier_id && String(d.cavalier || "").toLowerCase() === String(o.cavalier || "").toLowerCase())) && (!o.cheval_id || !d.cheval_id || d.cheval_id === o.cheval_id)) avant = d; });
          var r = avant ? await supa.from("resultats").update(ligne).eq("id", avant.id).select("id")
            : await supa.from("resultats").insert(Object.assign({ user_id: u.id, origine: "juge" }, ligne)).select("id");
          if (!r || r.error || !r.data || !r.data.length) throw new Error((r && r.error && r.error.message) || T("enregistrement refusé"));
          n++;
        }
        var o3 = Object.assign({}, pub); o3[k] = "✓ " + n + " " + T("résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums."); setPub(o3);
      } catch (eP) { var o4 = Object.assign({}, pub); o4[k] = "!" + T("Publication impossible : ") + String((eP && eP.message) || eP); setPub(o4); }
    }
    function blocClassement() {
      if (!feuilles.length) return null;
      var parRep = {};
      feuilles.forEach(function (x) {
        var k = x.reprise, c = (x.cavalier_id || String(x.cavalier).toLowerCase()) + "|" + (x.cheval_id || String(x.cheval || "").toLowerCase());
        var g = parRep[k] = parRep[k] || {}; var o = g[c] = g[c] || { cavalier: x.cavalier, cheval: x.cheval, cavalier_id: x.cavalier_id || null, cheval_id: x.cheval_id || null, pcts: [], juges: [], ens: [], elim: false };
        if (x.pourcentage != null) { o.pcts.push(+x.pourcentage); o.juges.push(x.juge_place || ""); o.ens.push((Array.isArray(x.lignes) ? x.lignes : []).reduce(function (a, l) { return a + (l && l.ens && l.note != null ? l.note * (l.coef || 1) : 0); }, 0)); }
        else o.elim = true;   /* 3 erreurs de tracé (art. 7.8 A) */
      });
      return h("div", null, Object.keys(parRep).map(function (k) {
        var L = Object.keys(parRep[k]).map(function (c) { var o = parRep[k][c]; o.moy = o.pcts.length ? o.pcts.reduce(function (a, b) { return a + b; }, 0) / o.pcts.length : null; return o; })
          .filter(function (o) { return o.moy != null; });
        /* départage (règlement Dressage, art. 9.1 C) : pour les 3 premières places, à pourcentage égal, les notes d'ensemble
           les plus élevées décident ; ensuite, ex æquo */
        L.forEach(function (o) { o.pc = Math.round(o.moy * 1000) / 1000; o.ensM = o.ens.length ? o.ens.reduce(function (a, b) { return a + b; }, 0) / o.ens.length : 0; });
        L.sort(function (a, b) { return (b.pc - a.pc) || (b.ensM - a.ensM); });
        L.forEach(function (o, i) { var p0 = L[i - 1]; o.place = (p0 && p0.pc === o.pc && (p0.place > 3 || p0.ensM === o.ensM)) ? p0.place : i + 1; o.depart = p0 && p0.pc === o.pc && o.place !== p0.place; if (o.depart) p0.depart = true; });
        var Lel = Object.keys(parRep[k]).map(function (c) { return parRep[k][c]; }).filter(function (o) { return o.moy == null && o.elim; });
        var R = REP[k] || {};
        return h("div", { key: k },
          COURBE(),
          h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Le classement"), h("span", null, R.niveauFFE || R.titre || k)),
          L.length >= 2 ? h("div", { className: "hj-podium" }, [1, 0, 2].filter(function (n) { return L[n]; }).map(function (n) {
            var o = L[n];
            return h("div", { key: n, className: "hj-pod" + (o.place === 1 ? " p1" : "") }, h("div", { className: "hj-rang" }, String(o.place)), h("b", null, o.cavalier), h("span", null, o.cheval || ""), h("em", null, fmt(Math.round(o.moy * 100) / 100) + " %"));
          })) : null,
          L.map(function (o, n) {
            return h("div", { key: n, className: "hj-li", style: { cursor: "default" } },
              h("span", { className: "n" }, String(o.place)),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "", h("span", { className: "c" }, (o.pcts.length > 1 ? T("Moyenne de ") + o.pcts.length + T(" juges") + " (" + o.juges.join(", ") + ")" : T("Juge en") + " " + (o.juges[0] || "?")) + (o.depart ? " · " + T("départagé par les notes d’ensemble") + " (" + fmt(Math.round(o.ensM * 10) / 10) + ")" : ""))),
              h("span", { className: "v", style: { fontSize: 18 } }, fmt(Math.round(o.moy * 100) / 100) + " %"));
          }),
          Lel.map(function (o, n) {
            return h("div", { key: "e" + n, className: "hj-li", style: { cursor: "default" } }, h("span", { className: "n" }, "–"),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "", h("span", { className: "c" }, T("Éliminé : trois erreurs de tracé"))), h("span", { className: "v" }, ""));
          }),
          h("div", { className: "hj-astuce" }, T("Le classement se met à jour tout seul à chaque feuille signée. Égalité sur les trois premières places : les notes d’ensemble départagent ; ensuite, ex æquo (règlement Dressage, art. 9.1 C).")),
          (ctx.agenda_id && L.length) ? h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: pub[k] === "busy", onClick: function () { publierClassement(k, L.concat(Lel), R.niveauFFE || R.titre || k); } },
            pub[k] === "busy" ? T("Publication…") : pub[k] === "ok?" ? T("Touche encore pour confirmer") : T("Publier le classement"))) : null,
          (pub[k] && pub[k] !== "busy" && pub[k] !== "ok?") ? h("div", { className: pub[k].charAt(0) === "!" ? "hj-err" : "hj-msg" }, pub[k].charAt(0) === "!" ? pub[k].slice(1) : pub[k]) : null);
      }));
    }
    React.useEffect(function () { try { window.scrollTo(0, 0); } catch (x) { } return function () { try { recRef.current && recRef.current.abort(); } catch (x) { } }; }, []);

    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } setEcran(ctx.agenda_id ? "concours" : "accueil"); }
    function hero(titre, sous, kick) {
      return h("div", null,
        h("div", { className: "hj-hero" },
          h("img", { src: "images/theme-position-cavalier-noir.webp", alt: "" }),
          h("button", { type: "button", className: "hj-ret", onClick: retour }, "‹ " + T("Retour")),
          h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 34 C 120 34, 220 6, 400 10", fill: "none", stroke: "rgba(201,166,107,.55)", strokeWidth: 1 }))),
        h("div", { className: "hj-in", style: { paddingTop: 16 } }, h("div", { className: "hj-k" }, kick || T("Juger une reprise")), h("div", { className: "hj-h1" }, titre), sous));
    }

    /* ── 0. lecture d'une feuille signée (cavalier) ── */
    if (ctx.voir) {
      var w = ctx.voir, V = vues || [];
      var Vp = V.filter(function (x) { return x.pourcentage != null; }), moyV = Vp.length ? Vp.reduce(function (a, x) { return a + (+x.pourcentage || 0); }, 0) / Vp.length : null;
      var Rv = V.length ? (REP[V[0].reprise] || {}) : {};
      return h("div", { className: "hj" },
        hero(T("La feuille de notes"), h("div", { className: "hj-sous" }, h("b", null, w.cavalier || (V[0] && V[0].cavalier) || ""), (w.cheval || (V[0] && V[0].cheval)) ? " · " + (w.cheval || V[0].cheval) : "", (Rv.niveauFFE || Rv.titre) ? " · " + (Rv.niveauFFE || Rv.titre) : ""), T("Reprise de dressage")),
        h("div", { className: "hj-in" },
          vues === null ? h("div", { className: "hj-astuce" }, T("Chargement…"))
          : !V.length ? h("div", { className: "hj-astuce" }, T("Aucune feuille signée pour ce couple dans ce concours."))
          : [
            h("div", { key: "tot", className: "hj-total" }, h("div", null, h("span", null, V.length > 1 ? T("Moyenne de ") + V.length + T(" juges") : T("Juge en") + " " + (V[0].juge_place || "?"))), h("div", { style: { textAlign: "right" } }, h("b", null, moyV == null ? T("Éliminé") : fmt(Math.round(moyV * 100) / 100) + " %"))),
            V.map(function (x) {
              var LL0 = Array.isArray(x.lignes) ? x.lignes : [], LL = LL0.filter(function (l) { return !(l && l.err); }), ER = (LL0.filter(function (l) { return l && l.err; })[0] || {}).err;
              return h("div", { key: x.id },
                COURBE(),
                h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Juge en") + " " + (x.juge_place || "?"), h("span", null, fmt(x.total) + " / " + fmt(x.possible) + " · " + (x.pourcentage == null ? T("Éliminé") : fmt(x.pourcentage) + " %"))),
                LL.map(function (l, k) {
                  return h("div", { key: k, className: "hj-li", style: { cursor: "default" } },
                    h("span", { className: "n" }, String(k + 1)),
                    h("span", { className: "t" }, (l.t || "") + (l.coef > 1 ? " (×" + l.coef + ")" : ""), l.com ? h("span", { className: "c" }, l.com) : null),
                    h("span", { className: "v" }, fmt(l.note)));
                }),
                (ER && (ER.trace || ER.exec)) ? h("div", { className: "hj-li", style: { cursor: "default", gridTemplateColumns: "1fr" } }, h("span", { className: "t" }, T("Erreurs"), h("span", { className: "c" }, [ER.trace ? ER.trace + " " + T("de tracé") + " (−" + ER.trace + " %)" : "", ER.exec ? ER.exec + " " + T("d’exécution") + " (−" + (2 * ER.exec) + " pts)" : ""].filter(Boolean).join(" · ")))) : null);
            })
          ],
          h("div", { className: "hj-astuce" }, T("Les commentaires sont ceux que le juge a dictés pendant ta reprise. Relis-les avec ton coach pour préparer la prochaine."))));
    }

    /* ── 1. préparer la feuille ── */
    if (!f) {
      return h("div", { className: "hj" },
        hero(T("Nouvelle feuille"), h("div", { className: "hj-sous" }, T("Choisis la reprise et le couple, puis dicte chaque figure."))),
        h("div", { className: "hj-in" },
          h("div", { className: "hj-l", style: { marginTop: 18 } }, T("Reprise")),
          h("select", { className: "hj-sel", value: choix.reprise, onChange: function (ev) { setChoix(Object.assign({}, choix, { reprise: ev.target.value })); } },
            h("option", { value: "" }, T("— Quelle reprise ? —")),
            ORDRE.map(function (k) { return h("option", { key: k, value: k }, (REP[k].niveauFFE || REP[k].titre)); })),
          (ctx.couples || []).length ? h("div", { className: "hj-encart" }, h("div", { className: "hj-k" }, T("Les couples engagés")),
            h("div", { className: "hj-couples" }, ctx.couples.map(function (c, k) {
              var on = choix.cavalier === c.cavalier && choix.cheval === c.cheval, ph = c.cheval_id && photos[c.cheval_id];
              /* règle d'équilibre (09/11) : jamais une ligne à moitié vide → le dernier d'un nombre impair prend toute la largeur */
              var seul = ctx.couples.length % 2 === 1 && k === ctx.couples.length - 1;
              return h("button", { key: k, type: "button", className: "hj-cp" + (on ? " on" : ""), style: seul ? { gridColumn: "1 / -1", display: "flex", alignItems: "stretch" } : null, onClick: function () { setChoix(Object.assign({}, choix, { cavalier: c.cavalier, cheval: c.cheval, cavalier_id: c.cavalier_id, cheval_id: c.cheval_id })); } },
                h("div", { className: "hj-cp-ph", style: seul ? { width: "46%", flex: "0 0 46%" } : null }, ph ? h("img", { src: ph, alt: "" }) : String(c.cheval || c.cavalier || "?").charAt(0).toUpperCase()),
                h("div", { className: "hj-cp-t", style: seul ? { alignSelf: "center", padding: "10px 14px" } : null }, h("b", null, c.cavalier), h("span", null, c.cheval || ""), c.epreuve ? h("span", { style: { display: "block" } }, c.epreuve) : null));
            })), h("div", { style: { height: 8 } })) : null,
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Cavalier")),
          h("input", { className: "hj-sel", value: choix.cavalier, onChange: function (ev) { setChoix(Object.assign({}, choix, { cavalier: ev.target.value, cavalier_id: null })); } }),
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Cheval")),
          h("input", { className: "hj-sel", value: choix.cheval, onChange: function (ev) { setChoix(Object.assign({}, choix, { cheval: ev.target.value, cheval_id: null })); } }),
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Ta place de juge")),
          h("div", { className: "hj-pills" }, ["E", "H", "C", "M", "B"].map(function (p) { return h("button", { key: p, type: "button", className: "hj-pill" + (choix.juge === p ? " on" : ""), onClick: function () { setChoix(Object.assign({}, choix, { juge: p })); } }, p); })),
          blocRegl("dressage", reglOuv, function () { setReglOuv(!reglOuv); }),
          h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: !choix.reprise || !String(choix.cavalier).trim(), onClick: function () {
            var R = REP[choix.reprise] || { figures: [] }; var max = /sur 5/.test(String(R.note || "")) ? 5 : 10;
            setF({ reprise: choix.reprise, titre: R.niveauFFE || R.titre, max: max, cavalier: choix.cavalier.trim(), cheval: choix.cheval.trim(), cavalier_id: choix.cavalier_id || null, cheval_id: choix.cheval_id || null, juge: choix.juge, cur: 0,
              lignes: (R.figures || []).map(function (x) { var lg = window.__hypeLangue || "fr"; return { t: (x && (x[lg] || x.fr || (x.t && (x.t[lg] || x.t.fr)))) || "", coef: 1, note: null, com: "" }; }).concat(ENSEMBLE.map(function (l) { return { t: T(l), coef: 1, note: null, com: "", ens: true }; })) });
          } }, T("Commencer la feuille"))),
          blocClassement()));
    }

    /* ── 2. juger ── */
    var L = f.lignes, i = Math.min(f.cur, L.length - 1), cur = L[i];
    var total = 0, possible = 0, nb = 0;
    L.forEach(function (l) { if (l.note != null) { total += l.note * l.coef; possible += f.max * l.coef; nb++; } });
    /* erreurs (règlement Dressage, art. 7.8) : exécution −2 points ; tracé −1 % chacune, la 3e élimine */
    var errT = f.errT || 0, errE = f.errE || 0, elim = errT >= 3;
    total = Math.max(0, total - 2 * errE);
    var pct = possible && !elim ? Math.round(1000 * total / possible) / 10 - errT : null;
    var possibleTout = L.reduce(function (a, l) { return a + f.max * l.coef; }, 0);
    function compteurErr(lab, k, sous) {
      var v = f[k] || 0;
      return h("div", { className: "hj-cpt" }, h("span", { className: "hj-l", style: { margin: 0 } }, lab), h("span", { style: { display: "block", fontSize: 13, color: IV2, marginTop: 2 } }, sous),
        h("div", { className: "hj-cpt-b" }, h("button", { type: "button", className: "hj-pill", onClick: function () { var n = Object.assign({}, f); n[k] = Math.max(0, v - 1); setF(n); } }, "−"), h("b", null, String(v)), h("button", { type: "button", className: "hj-pill", onClick: function () { var n = Object.assign({}, f); n[k] = Math.min(k === "errT" ? 3 : 20, v + 1); setF(n); } }, "+")));
    }
    function maj(o) { var n = Object.assign({}, f); n.lignes = L.slice(); n.lignes[i] = Object.assign({}, cur, o); setF(n); }
    function aller(k) { var n = Object.assign({}, f, { cur: Math.max(0, Math.min(L.length - 1, k)) }); setF(n); setE(Object.assign({}, e, { dit: "", err: "" })); }
    function dicter() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { setE(Object.assign({}, e, { err: T("La dictée n’est pas disponible ici : utilise le micro du clavier dans le commentaire, et touche la note.") })); return; }
      if (e.ecoute) { try { recRef.current && recRef.current.stop(); } catch (x) { } return; }
      var r = new SR(); recRef.current = r; r.lang = "fr-FR"; r.interimResults = true; r.continuous = false;
      var fin = "";
      r.onresult = function (ev) { var t = ""; for (var k = 0; k < ev.results.length; k++) t += ev.results[k][0].transcript; fin = t; setE(function (x) { return Object.assign({}, x, { dit: t }); }); };
      r.onerror = function () { setE(function (x) { return Object.assign({}, x, { ecoute: false }); }); };
      r.onend = function () {
        setE(function (x) { return Object.assign({}, x, { ecoute: false }); });
        if (!fin) return;
        var lu = lireNote(fin, f.max);
        setF0(function (ff) {
          var n = Object.assign({}, ff); n.lignes = ff.lignes.slice(); var c0 = n.lignes[ff.cur];
          n.lignes[ff.cur] = Object.assign({}, c0, { note: lu.note != null ? lu.note : c0.note, com: lu.com || c0.com });
          if (lu.note != null && ff.cur < n.lignes.length - 1) n.cur = ff.cur + 1;
          try { localStorage.setItem(cle, JSON.stringify(n)); } catch (x) { }
          return n;
        });
        if (lu.note == null) setE(function (x) { return Object.assign({}, x, { err: T("Je n’ai pas entendu de note : redis-la au début de la phrase, ou touche-la.") }); });
      };
      setE(Object.assign({}, e, { ecoute: true, dit: "", err: "" }));
      try { r.start(); } catch (x) { setE(Object.assign({}, e, { ecoute: false })); }
    }
    async function envoyer() {
      setE(Object.assign({}, e, { busy: true, err: "", msg: "" }));
      try {
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        var ligne = { agenda_id: ctx.agenda_id || null, reprise: f.reprise, cavalier: f.cavalier, cavalier_id: f.cavalier_id || null, cheval: f.cheval, cheval_id: f.cheval_id || null, juge_place: f.juge,
          lignes: (errT || errE) ? L.concat([{ t: "Erreurs", err: { trace: errT, exec: errE } }]) : L, total: Math.round(total * 100) / 100, possible: possibleTout, pourcentage: (possibleTout && !elim) ? Math.round(10000 * total / possibleTout) / 100 - errT : null, statut: "signee", juge_id: u ? u.id : null };
        var r = await supa.from("dressage_feuilles").insert(ligne).select("id");
        if (!r || r.error || !r.data || !r.data.length) throw new Error((r && r.error && r.error.message) || "x");
        try { localStorage.removeItem(cle); } catch (x) { }
        setE(Object.assign({}, e, { busy: false, msg: T("✓ Feuille signée et envoyée. Au couple suivant !") }));
        setTimeout(function () { setF0(null); }, 1800);
      } catch (eS) { setE(Object.assign({}, e, { busy: false, err: T("Pas encore envoyée : la feuille reste sur ce téléphone. ") + String((eS && eS.message) || "") })); }
    }
    var notes = []; for (var v = 0; v <= f.max; v += .5) notes.push(v);

    return h("div", { className: "hj" },
      hero(f.titre, h("div", { className: "hj-sous" }, h("b", null, f.cavalier), f.cheval ? " · " + f.cheval : "", " · " + T("juge en") + " " + f.juge + " · " + T("notes sur") + " " + f.max)),
      h("div", { className: "hj-in" },
        h("div", { className: "hj-prog" }, L.map(function (l, k) { return h("i", { key: k, className: k === i ? "c" : (l.note != null ? "f" : "") }); })),
        h("div", { className: "hj-live" },
          h("div", { className: "hj-row" }, h("span", { className: "hj-pas" }, (cur.ens ? T("NOTE D’ENSEMBLE") : T("FIGURE")) + " " + (i + 1) + " / " + L.length),
            h("button", { type: "button", className: "hj-coef", onClick: function () { maj({ coef: cur.coef >= 3 ? 1 : cur.coef + 1 }); } }, T("coefficient") + " " + cur.coef)),
          cur.ens ? h("div", { className: "hj-fig" }, cur.t) : h("div", { className: "hj-figwrap", style: { marginTop: 10 } }, h("div", { className: "hj-fig" }, cur.t), h("div", { className: "hj-arene", style: { margin: 0 } }, arene(cur.t))),
          h("div", { className: "hj-mic" },
            h("button", { type: "button", className: "hj-rond" + (e.ecoute ? " on" : ""), "aria-label": T("Dicter la note et le commentaire"), onClick: dicter },
              h("svg", { width: 30, height: 40, viewBox: "0 0 30 40" }, h("rect", { x: 9, y: 2, width: 12, height: 22, rx: 6, fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6 }), h("path", { d: "M4 18c0 6 5 11 11 11s11-5 11-11M15 29v8M9 37h12", fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6, strokeLinecap: "round" }))),
            h("div", { className: "hj-ecoute" }, e.ecoute ? "● " + T("JE T’ÉCOUTE…") : T("Touche et dis la note, puis ton commentaire"))),
          e.dit ? h("div", { className: "hj-dit" }, "« " + e.dit + " »") : null,
          h("div", { className: "hj-res" },
            h("div", { className: "hj-note" }, fmt(cur.note), h("small", null, T("note"))),
            h("div", { style: { flex: 1 } }, h("span", { className: "hj-l" }, T("Commentaire")), h("textarea", { className: "hj-ta", value: cur.com || "", placeholder: T("Ton commentaire"), onChange: function (ev) { maj({ com: ev.target.value }); } }))),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(" + (notes.length === 21 ? 7 : 6) + ", minmax(0,1fr))" } }, notes.map(function (n) { return h("button", { key: n, type: "button", className: "hj-pill" + (cur.note === n ? " on" : ""), onClick: function () { maj({ note: n }); } }, fmt(n)); })),
          e.err ? h("div", { className: "hj-err" }, e.err) : null,
          h("div", { className: "hj-bas" },
            h("button", { type: "button", className: "hj-btn sec", disabled: i === 0, onClick: function () { aller(i - 1); } }, "‹ " + (i > 0 ? String(i) : "")),
            h("button", { type: "button", className: "hj-btn", disabled: i >= L.length - 1, onClick: function () { aller(i + 1); } }, (i < L.length - 1 ? String(i + 2) : "") + " ›"))),
        COURBE(),
        h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("La feuille"), h("span", null, nb + " / " + L.length + " " + T("notées"))),
        L.map(function (l, k) {
          return h("div", { key: k, className: "hj-li" + (k === i ? " cur" : (l.note == null ? " af" : "")), onClick: function () { aller(k); } },
            h("span", { className: "n" }, String(k + 1)),
            h("span", { className: "t" }, l.t + (l.coef > 1 ? " (×" + l.coef + ")" : ""), l.com ? h("span", { className: "c" }, l.com) : null),
            h("span", { className: "v" }, fmt(l.note)));
        }),
        h("div", { className: "hj-cpts", style: { marginTop: 18 } }, compteurErr(T("Erreurs de tracé"), "errT", T("−1 % chacune, la 3e élimine")), compteurErr(T("Erreurs d’exécution"), "errE", T("−2 points chacune"))),
        h("div", { className: "hj-total" }, h("div", null, h("span", null, T("Total")), h("br"), h("b", null, fmt(total) + " / " + fmt(possibleTout))), h("div", { style: { textAlign: "right" } }, h("span", null, T("Moyenne")), h("br"), h("b", null, elim ? T("Éliminé") : pct == null ? "—" : fmt(Math.round(pct * 100) / 100) + " %"))),
        h("div", { className: "hj-bas" },
          h("button", { type: "button", className: "hj-btn sec", onClick: function () { if (!e.efface) { setE(Object.assign({}, e, { efface: true })); return; } try { localStorage.removeItem(cle); } catch (x) { } setE(Object.assign({}, e, { efface: false })); setF0(null); } }, e.efface ? T("Touche encore pour effacer") : T("Nouvelle feuille")),
          h("button", { type: "button", className: "hj-btn", disabled: e.busy || nb < L.length, onClick: envoyer }, e.busy ? "…" : T("Signer et envoyer"))),
        e.msg ? h("div", { className: "hj-msg" }, e.msg) : null,
        blocClassement(),
        blocRegl("dressage", reglOuv, function () { setReglOuv(!reglOuv); }),
        h("div", { className: "hj-astuce" }, T("Dis la note puis ton commentaire, comme à un secrétaire : Hype écrit tout et passe à la figure suivante. Touche une ligne pour la corriger. Les coefficients se règlent en touchant « coefficient ». La feuille est gardée sur ton téléphone à chaque note."))));
  }


  /* ═══ 14/11 10h — JURY CSO À LA VOIX ═══
     Blandine (14/11 00h45) : « on pourrait faire la même chose en concours… le jury dicte : sans faute, 30 secondes 20…
     et ça fait le classement ». Règles : règlement FFE CSO 2026 (dispositions spécifiques, applicable au 01/09/2025), art. 8.2 :
     - Barème A : barre / faute à la rivière = 4 pts ; 1re et 2e désobéissance = 4 pts ; 3e désobéissance = élimination ;
       chute = élimination ; dépassement du temps accordé (parcours initial) = 1 pt par tranche de 4 secondes entamée ;
       temps limite (= double du temps accordé) dépassé = élimination. Classement : points, puis temps si « au chrono » ;
       « sans chrono » : ex æquo à points égaux.
     - Barème C : temps + 4 s par barre ; désobéissances sans pénalité (3e = élimination) ; ex æquo à temps égal.
     - Barrages, deux phases, désobéissance avec destruction (+6 s) : pas encore (à saisir à la main dans le temps).
     Le classement est gardé sur le téléphone du jury ; « Publier le classement » l'envoie dans les résultats du concours. */
  var MOTS_N = { "zero": 0, "un": 1, "une": 1, "deux": 2, "trois": 3, "quatre": 4, "cinq": 5, "six": 6, "sept": 7, "huit": 8, "neuf": 9, "dix": 10, "onze": 11, "douze": 12, "seize": 16, "vingt": 20 };
  function lireCSO(phrase) {
    var p = String(phrase || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/-/g, " ");
    var o = { etat: "", barres: null, refus: null, temps: null };
    if (/elimin/.test(p)) o.etat = "El.";
    else if (/abandon/.test(p)) o.etat = "Ab.";
    else if (/non partant|forfait/.test(p)) o.etat = "NP";
    if (/sans faute|zero faute|clean/.test(p)) { o.barres = 0; o.refus = 0; }
    var N = "(\\d+|un|une|deux|trois|quatre|cinq|six)";
    var mb = p.match(new RegExp(N + "\\s*(barres?|fautes?|perches?|tombees?)")); if (mb) o.barres = MOTS_N[mb[1]] != null ? MOTS_N[mb[1]] : Number(mb[1]);
    var mr = p.match(new RegExp(N + "\\s*(refus|desobeissances?|derobes?|derobades?)")); if (mr) o.refus = MOTS_N[mr[1]] != null ? MOTS_N[mr[1]] : Number(mr[1]);
    else if (/\b(refus|desobeissance|derobe)\b/.test(p)) o.refus = 1;
    var mp = p.match(/(\d+)\s*points?/); if (mp && o.barres == null) { o.barres = Math.floor(Number(mp[1]) / 4); if (o.refus == null) o.refus = 0; }
    var sansPts = p.replace(/(\d+)\s*(points?|barres?|fautes?|perches?|refus|desobeissances?)/g, " ");
    var mt = sansPts.match(/(\d+)\s*(?:secondes?|sec|s)\b\s*(?:et\s*)?(\d{1,2})?/) || sansPts.match(/(\d+)\s*(?:[,.]|virgule)\s*(\d{1,2})/) || sansPts.match(/\ben\s+(\d+)\s+(\d{1,2})\b/);
    if (mt) { var c = mt[2] || ""; o.temps = Number(mt[1]) + (c ? Number(c) / (c.length === 1 ? 10 : 100) : 0); }
    if (o.barres != null && o.refus == null) o.refus = 0;
    return o;
  }
  function calculCSO(pa, cfg) {   /* → { pts, penT, total, etat } */
    var etat = pa.etat || "", b = Number(pa.barres) || 0, r = Number(pa.refus) || 0, t = pa.temps != null && pa.temps !== "" ? Number(pa.temps) : null, ta = Number(cfg.ta) || 0;
    if (!etat && r >= 3) etat = "El.";
    if (!etat && t != null && ta && t > 2 * ta) etat = "El.";
    if (cfg.bareme === "C") return { etat: etat, pts: 0, penT: 0, total: t != null ? Math.round((t + 4 * b) * 100) / 100 : null };
    var penT = (t != null && ta && t > ta) ? Math.ceil((t - ta) / 4 - 1e-9) : 0;
    return { etat: etat, pts: 4 * b + 4 * r + penT, penT: penT, total: null };
  }
  function classerCSO(passages, cfg) {
    var L = passages.map(function (p) { return Object.assign({}, p, { c: calculCSO(p, cfg) }); });
    var ok = L.filter(function (x) { return !x.c.etat && (cfg.bareme === "C" ? x.c.total != null : true); }), ko = L.filter(function (x) { return ok.indexOf(x) < 0; });
    function cle(x) { return cfg.bareme === "C" ? [x.c.total] : cfg.bareme === "A0" ? [x.c.pts] : [x.c.pts, x.temps == null || x.temps === "" ? 9999 : Number(x.temps)]; }
    ok.sort(function (a, b) { var A = cle(a), B = cle(b); for (var i = 0; i < A.length; i++) if (A[i] !== B[i]) return A[i] - B[i]; return 0; });
    var prec = null, place = 0; ok.forEach(function (x, i) { var k = JSON.stringify(cle(x)); if (k !== prec) { place = i + 1; prec = k; } x.place = place; });
    return ok.concat(ko);
  }
  function fmtT(t) { return t == null || t === "" ? "—" : (Math.round(Number(t) * 100) / 100).toFixed(2).replace(".", ",") + " s"; }

  function JuryCSO() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var cle = "hype_cso_" + (ctx.agenda_id || "libre");
    var _s = React.useState(function () { try { return JSON.parse(localStorage.getItem(cle) || "null"); } catch (e) { return null; } }), st = _s[0], setSt0 = _s[1];
    function setSt(n) { setSt0(n); try { localStorage.setItem(cle, JSON.stringify(n)); } catch (e) { } }
    var eps = []; (ctx.couples || []).forEach(function (c) { if (c.epreuve && eps.indexOf(c.epreuve) < 0) eps.push(c.epreuve); });
    var _c = React.useState({ epreuve: eps[0] || "", bareme: "A", ta: "" }), cfg0 = _c[0], setCfg0 = _c[1];
    var _e = React.useState({ ecoute: false, dit: "", msg: "", err: "", busy: false, ok: false }), e = _e[0], setE = _e[1];
    var _m = React.useState({ cavalier: "", cheval: "" }), man = _m[0], setMan = _m[1];
    var recRef = React.useRef(null);
    var _ph = React.useState({}), photos = _ph[0], setPhotos = _ph[1];
    var _rg = React.useState(false), reglOuv = _rg[0], setReglOuv = _rg[1];
    React.useEffect(function () {
      try { window.scrollTo(0, 0); } catch (x) { }
      var ids = (ctx.couples || []).map(function (c) { return c.cheval_id; }).filter(Boolean);
      if (ids.length) try { supa.from("chevaux").select("id, photo_url").in("id", ids.slice(0, 100)).then(function (r) { var o = {}; ((r && !r.error && r.data) || []).forEach(function (c) { o[c.id] = c.photo_url || ""; }); setPhotos(o); }, function () { }); } catch (x) { }
      return function () { try { recRef.current && recRef.current.abort(); } catch (x) { } };
    }, []);
    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } setEcran(ctx.agenda_id ? "concours" : "accueil"); }
    function hero(titre, sous) {
      return h("div", null,
        h("div", { className: "hj-hero" },
          h("img", { src: "images/portrait-defaut-noir.webp", alt: "" }),
          h("button", { type: "button", className: "hj-ret", onClick: retour }, "‹ " + T("Retour")),
          h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 34 C 120 34, 220 6, 400 10", fill: "none", stroke: "rgba(201,166,107,.55)", strokeWidth: 1 }))),
        h("div", { className: "hj-in", style: { paddingTop: 16 } }, h("div", { className: "hj-k" }, T("Jury de CSO")), h("div", { className: "hj-h1" }, titre), sous));
    }
    var NOMS_B = { A: T("Barème A au chrono"), A0: T("Barème A sans chrono"), C: T("Barème C") };

    /* ── 1. réglages de l'épreuve ── */
    if (!st) {
      return h("div", { className: "hj" },
        hero(T("Dicter les résultats"), h("div", { className: "hj-sous" }, T("Le jury dit le résultat de chaque couple : Hype compte les points, le temps et fait le classement."))),
        h("div", { className: "hj-in" },
          h("div", { className: "hj-l", style: { marginTop: 18 } }, T("Épreuve")),
          eps.length > 1 ? h("div", { className: "hj-pills" }, eps.map(function (x) { return h("button", { key: x, type: "button", className: "hj-pill" + (cfg0.epreuve === x ? " on" : ""), onClick: function () { setCfg0(Object.assign({}, cfg0, { epreuve: x })); } }, x); })) : null,
          h("input", { className: "hj-sel", value: cfg0.epreuve, placeholder: T("ex. Club 2 Grand Prix"), onChange: function (ev) { setCfg0(Object.assign({}, cfg0, { epreuve: ev.target.value })); } }),
          h("div", { className: "hj-l", style: { marginTop: 16 } }, T("Barème")),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "1fr" } }, ["A", "A0", "C"].map(function (b) { return h("button", { key: b, type: "button", className: "hj-pill" + (cfg0.bareme === b ? " on" : ""), onClick: function () { setCfg0(Object.assign({}, cfg0, { bareme: b })); } }, NOMS_B[b]); })),
          cfg0.bareme !== "C" ? [h("div", { key: "l", className: "hj-l", style: { marginTop: 16 } }, T("Temps accordé (secondes)")),
            h("input", { key: "i", className: "hj-sel", inputMode: "decimal", value: cfg0.ta, placeholder: T("sur le plan du parcours, ex. 72"), onChange: function (ev) { setCfg0(Object.assign({}, cfg0, { ta: ev.target.value.replace(",", ".") })); } })] : null,
          h("div", { className: "hj-astuce" }, cfg0.bareme === "C" ? T("Barème C : le temps du parcours plus 4 secondes par barre. Trois désobéissances ou une chute : éliminé.")
            : T("Barème A : 4 points par barre et par désobéissance, 1 point par tranche de 4 secondes entamée au-delà du temps accordé. Trois désobéissances, une chute ou le double du temps accordé : éliminé.")),
          blocRegl("cso", reglOuv, function () { setReglOuv(!reglOuv); }),
          h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: !String(cfg0.epreuve).trim(), onClick: function () {
            var cps = (ctx.couples || []).filter(function (c) { return !c.epreuve || !cfg0.epreuve || c.epreuve === cfg0.epreuve; }).map(function (c) { return { cavalier: c.cavalier, cheval: c.cheval, cavalier_id: c.cavalier_id || null, cheval_id: c.cheval_id || null }; });
            setSt({ cfg: { epreuve: cfg0.epreuve.trim(), bareme: cfg0.bareme, ta: cfg0.ta }, couples: cps, passages: [], cur: cps.length ? 0 : -1, saisie: { barres: null, refus: null, temps: "", etat: "" } });
          } }, T("Commencer l’épreuve"))),
          h("div", { style: { height: 30 } })));
    }

    var cfg = st.cfg, cp = st.cur >= 0 ? st.couples[st.cur] : null, sa = st.saisie || {};
    var calc = calculCSO(sa, cfg), CL = classerCSO(st.passages, cfg);
    function majSaisie(o) { setSt(Object.assign({}, st, { saisie: Object.assign({}, sa, o) })); setE(Object.assign({}, e, { err: "", msg: "" })); }
    function dicter() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { setE(Object.assign({}, e, { err: T("La dictée n’est pas disponible ici : utilise les boutons et le temps.") })); return; }
      if (e.ecoute) { try { recRef.current && recRef.current.stop(); } catch (x) { } return; }
      var r = new SR(); recRef.current = r; r.lang = "fr-FR"; r.interimResults = true; r.continuous = false; var fin = "";
      r.onresult = function (ev) { var t = ""; for (var k = 0; k < ev.results.length; k++) t += ev.results[k][0].transcript; fin = t; setE(function (x) { return Object.assign({}, x, { dit: t }); }); };
      r.onerror = function () { setE(function (x) { return Object.assign({}, x, { ecoute: false }); }); };
      r.onend = function () {
        setE(function (x) { return Object.assign({}, x, { ecoute: false }); });
        if (!fin) return; var lu = lireCSO(fin);
        setSt0(function (s0) {
          var s1 = Object.assign({}, s0), a = Object.assign({}, s0.saisie || {});
          if (lu.etat) a.etat = lu.etat; if (lu.barres != null) a.barres = lu.barres; if (lu.refus != null) a.refus = lu.refus; if (lu.temps != null) a.temps = String(lu.temps);
          s1.saisie = a; try { localStorage.setItem(cle, JSON.stringify(s1)); } catch (x) { } return s1;
        });
        if (!lu.etat && lu.barres == null && lu.temps == null) setE(function (x) { return Object.assign({}, x, { err: T("Je n’ai rien compris : redis par exemple « sans faute, 32 secondes 45 » ou « une barre, 40 secondes 10 ».") }); });
      };
      setE(Object.assign({}, e, { ecoute: true, dit: "", err: "", msg: "" }));
      try { r.start(); } catch (x) { setE(Object.assign({}, e, { ecoute: false })); }
    }
    function valider() {
      if (!cp) return;
      var pa = { cavalier: cp.cavalier, cheval: cp.cheval, cavalier_id: cp.cavalier_id, cheval_id: cp.cheval_id, etat: sa.etat || "", barres: Number(sa.barres) || 0, refus: Number(sa.refus) || 0, temps: sa.temps === "" || sa.temps == null ? null : Number(String(sa.temps).replace(",", ".")) };
      var ps = st.passages.filter(function (x) { return !(x.cavalier === pa.cavalier && x.cheval === pa.cheval); }).concat([pa]);
      var suiv = -1; for (var k = 1; k <= st.couples.length; k++) { var j = (st.cur + k) % st.couples.length; var c2 = st.couples[j]; if (!ps.some(function (x) { return x.cavalier === c2.cavalier && x.cheval === c2.cheval; })) { suiv = j; break; } }
      setSt(Object.assign({}, st, { passages: ps, cur: suiv, saisie: { barres: null, refus: null, temps: "", etat: "" } }));
      setE(Object.assign({}, e, { dit: "", err: "", msg: "✓ " + pa.cavalier + " " + T("est classé.") }));
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (x) { }
    }
    function choisir(k) {
      var c = st.couples[k], d = null; st.passages.forEach(function (x) { if (x.cavalier === c.cavalier && x.cheval === c.cheval) d = x; });
      setSt(Object.assign({}, st, { cur: k, saisie: d ? { barres: d.barres, refus: d.refus, temps: d.temps == null ? "" : String(d.temps), etat: d.etat } : { barres: null, refus: null, temps: "", etat: "" } }));
      setE(Object.assign({}, e, { dit: "", err: "", msg: "" }));
    }
    function ajouterCouple() {
      if (!String(man.cavalier).trim()) return;
      var cs = st.couples.concat([{ cavalier: man.cavalier.trim(), cheval: man.cheval.trim(), cavalier_id: null, cheval_id: null }]);
      setSt(Object.assign({}, st, { couples: cs, cur: cs.length - 1, saisie: { barres: null, refus: null, temps: "", etat: "" } })); setMan({ cavalier: "", cheval: "" });
    }
    function resume(x, c) {
      if (c.etat) return { "El.": T("Éliminé"), "Ab.": T("Abandon"), "NP": T("Non partant") }[c.etat] || c.etat;
      if (cfg.bareme === "C") return fmtT(c.total) + (x.barres ? " · " + x.barres + " " + (x.barres > 1 ? T("barres") : T("barre")) : "");
      return (c.pts === 0 ? T("Sans faute") : c.pts + " " + (c.pts > 1 ? T("pts") : T("pt"))) + (cfg.bareme === "A" || x.temps != null ? " · " + fmtT(x.temps) : "");
    }
    async function publier() {
      if (!e.ok) { setE(Object.assign({}, e, { ok: true })); return; }
      setE(Object.assign({}, e, { busy: true, ok: false, err: "", msg: "" }));
      try {
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (!u || !u.id) throw new Error(T("connecte-toi d’abord"));
        if (!ctx.agenda_id) throw new Error(T("ouvre cet outil depuis la fiche du concours"));
        var ex = await supa.from("resultats").select("id, cavalier_id, cheval_id, cavalier").eq("agenda_id", ctx.agenda_id).eq("origine", "juge").eq("epreuve", cfg.epreuve).limit(400);
        var deja = (ex && !ex.error && ex.data) || [], maint = new Date().toISOString(), pa = CL.length, n = 0;
        for (var i = 0; i < CL.length; i++) {
          var x = CL[i], c = x.c, pl = c.etat ? null : x.place;
          var ligne = { agenda_id: ctx.agenda_id, concours: ctx.concours || null, date_epreuve: String(ctx.date || "").slice(0, 10) || null, annee: String(ctx.date || "").slice(0, 4) || null,
            epreuve: cfg.epreuve, place: pl, partants: pa, classement: (pl ? (pl === 1 ? T("1er") : pl + T("e")) : c.etat) + " / " + pa,
            penalites: c.etat ? null : (cfg.bareme === "C" ? String(4 * (x.barres || 0)) : String(c.pts)), temps: x.temps == null ? null : String(Math.round(x.temps * 100) / 100),
            mention: (!c.etat && ((cfg.bareme !== "C" && c.pts === 0) || (cfg.bareme === "C" && !x.barres))) ? "SF" : null,
            cavalier: x.cavalier, cavalier_id: x.cavalier_id || null, cheval_id: x.cheval_id || null, statut: "saisie", visible: true, maj_par: u.id, maj_le: maint };
          var avant = null; deja.forEach(function (d) { if (!avant && ((x.cavalier_id && d.cavalier_id === x.cavalier_id) || (!x.cavalier_id && String(d.cavalier || "").toLowerCase() === String(x.cavalier || "").toLowerCase())) && (!x.cheval_id || !d.cheval_id || d.cheval_id === x.cheval_id)) avant = d; });
          var r = avant ? await supa.from("resultats").update(ligne).eq("id", avant.id).select("id") : await supa.from("resultats").insert(Object.assign({ user_id: u.id, origine: "juge" }, ligne)).select("id");
          if (!r || r.error || !r.data || !r.data.length) throw new Error((r && r.error && r.error.message) || T("enregistrement refusé"));
          n++;
        }
        setE(Object.assign({}, e, { busy: false, ok: false, msg: "✓ " + n + " " + T("résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums.") }));
      } catch (eP) { setE(Object.assign({}, e, { busy: false, ok: false, err: T("Publication impossible : ") + String((eP && eP.message) || eP) })); }
    }
    function compteur(lab, k) {
      var v = Number(sa[k]) || 0;
      return h("div", { className: "hj-cpt" }, h("span", { className: "hj-l", style: { margin: 0 } }, lab),
        h("div", { className: "hj-cpt-b" }, h("button", { type: "button", className: "hj-pill", onClick: function () { var o = {}; o[k] = Math.max(0, v - 1); majSaisie(o); } }, "−"), h("b", null, String(v)), h("button", { type: "button", className: "hj-pill", onClick: function () { var o = {}; o[k] = v + 1; majSaisie(o); } }, "+")));
    }
    function ptsTxt(n) { return n === 0 ? T("Sans faute") : n + " " + (n > 1 ? T("pts") : T("pt")); }
    var podium = CL.filter(function (x) { return !x.c.etat; });

    return h("div", { className: "hj" },
      hero(cfg.epreuve, h("div", { className: "hj-sous" }, NOMS_B[cfg.bareme] + (cfg.bareme !== "C" && cfg.ta ? " · " + T("temps accordé") + " " + String(cfg.ta).replace(".", ",") + " s" : "") + " · " + st.passages.length + " / " + st.couples.length + " " + T("passés"))),
      h("div", { className: "hj-in" },
        h("div", { className: "hj-prog" }, st.couples.map(function (c, k) { var fait = st.passages.some(function (x) { return x.cavalier === c.cavalier && x.cheval === c.cheval; }); return h("i", { key: k, className: k === st.cur ? "c" : (fait ? "f" : "") }); })),
        cp ? h("div", { className: "hj-live" },
          h("div", { className: "hj-row" }, h("span", { className: "hj-pas" }, T("EN PISTE")), h("span", { className: "hj-coef", style: { border: "none" } }, (st.cur + 1) + " / " + st.couples.length)),
          h("div", { className: "hj-figwrap", style: { marginTop: 12 } },
            (cp.cheval_id && photos[cp.cheval_id]) ? h("img", { src: photos[cp.cheval_id], alt: "", style: { width: 84, height: 84, objectFit: "contain", borderRadius: 14, background: "#000", border: "1px solid rgba(243,238,228,.12)" } }) : null,
            h("div", { style: { flex: 1 } }, h("div", { className: "hj-fig", style: { margin: 0 } }, cp.cavalier), h("div", { className: "hj-sous" }, cp.cheval || ""))),
          h("div", { className: "hj-mic" },
            h("button", { type: "button", className: "hj-rond" + (e.ecoute ? " on" : ""), "aria-label": T("Dicter le résultat"), onClick: dicter },
              h("svg", { width: 30, height: 40, viewBox: "0 0 30 40" }, h("rect", { x: 9, y: 2, width: 12, height: 22, rx: 6, fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6 }), h("path", { d: "M4 18c0 6 5 11 11 11s11-5 11-11M15 29v8M9 37h12", fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6, strokeLinecap: "round" }))),
            h("div", { className: "hj-ecoute" }, e.ecoute ? "● " + T("JE T’ÉCOUTE…") : T("Touche et dis le résultat : « sans faute, 32 secondes 45 »"))),
          e.dit ? h("div", { className: "hj-dit" }, "« " + e.dit + " »") : null,
          h("div", { className: "hj-res", style: { alignItems: "center" } },
            h("div", { className: "hj-note", style: { fontSize: calc.etat ? 30 : 40 } }, calc.etat ? resume(sa, calc) : cfg.bareme === "C" ? fmtT(calc.total) : (calc.pts === 0 && sa.barres != null ? "0" : String(calc.pts)), h("small", null, calc.etat ? "" : cfg.bareme === "C" ? T("temps retenu") : T("points"))),
            h("div", { style: { flex: 1 } },
              h("span", { className: "hj-l" }, T("Temps du parcours")),
              h("input", { className: "hj-sel", style: { marginTop: 2 }, inputMode: "decimal", value: sa.temps == null ? "" : String(sa.temps).replace(".", ","), placeholder: "00,00", onChange: function (ev) { majSaisie({ temps: ev.target.value.replace(",", ".") }); } }),
              calc.penT ? h("div", { className: "hj-astuce", style: { marginTop: 6 } }, T("dont") + " " + calc.penT + " " + (calc.penT > 1 ? T("pts de temps") : T("pt de temps"))) : null)),
          h("div", { className: "hj-cpts" }, compteur(T("Barres"), "barres"), compteur(T("Désobéissances"), "refus")),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))" } }, [["El.", T("Éliminé")], ["Ab.", T("Abandon")], ["NP", T("Non partant")]].map(function (z) {
            return h("button", { key: z[0], type: "button", className: "hj-pill" + (sa.etat === z[0] ? " on" : ""), onClick: function () { majSaisie({ etat: sa.etat === z[0] ? "" : z[0] }); } }, z[1]); })),
          e.err ? h("div", { className: "hj-err" }, e.err) : null,
          h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: !sa.etat && sa.barres == null && (sa.temps === "" || sa.temps == null), onClick: valider }, T("Valider et couple suivant")))) : 
          h("div", { className: "hj-live" }, h("div", { className: "hj-fig", style: { margin: 0 } }, T("Tous les couples sont passés")), h("div", { className: "hj-sous", style: { marginTop: 6 } }, T("Vérifie le classement, puis publie-le."))),
        e.msg ? h("div", { className: "hj-msg" }, e.msg) : null,
        h("div", { className: "hj-encart" }, h("div", { className: "hj-k" }, T("L’ordre de passage")),
          st.couples.map(function (c, k) {
            var d = null; CL.forEach(function (x) { if (x.cavalier === c.cavalier && x.cheval === c.cheval) d = x; });
            return h("div", { key: k, className: "hj-li" + (k === st.cur ? " cur" : ""), onClick: function () { choisir(k); } },
              h("span", { className: "n" }, String(k + 1)),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, c.cavalier), c.cheval ? " · " + c.cheval : "", h("span", { className: "c" }, d ? resume(d, d.c) : (k === st.cur ? T("en piste") : T("à venir")))),
              h("span", { className: "v", style: { fontSize: 18 } }, d && !d.c.etat ? (d.place === 1 ? T("1er") : d.place + T("e")) : ""));
          }),
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Ajouter un couple")),
          h("div", { style: { display: "flex", gap: 8 } },
            h("input", { className: "hj-sel", style: { flex: 1, minWidth: 0 }, value: man.cavalier, placeholder: T("Cavalier"), onChange: function (ev) { setMan(Object.assign({}, man, { cavalier: ev.target.value })); } }),
            h("input", { className: "hj-sel", style: { flex: 1, minWidth: 0 }, value: man.cheval, placeholder: T("Cheval"), onChange: function (ev) { setMan(Object.assign({}, man, { cheval: ev.target.value })); } })),
          h("div", { className: "hj-bas", style: { marginBottom: 10 } }, h("button", { type: "button", className: "hj-btn sec", disabled: !String(man.cavalier).trim(), onClick: ajouterCouple }, T("Ajouter")))),
        podium.length ? h("div", null,
          COURBE(),
          h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Le classement"), h("span", null, cfg.epreuve)),
          podium.length >= 2 ? h("div", { className: "hj-podium" }, [1, 0, 2].filter(function (n) { return podium[n]; }).map(function (n) {
            var o = podium[n];
            return h("div", { key: n, className: "hj-pod" + (o.place === 1 ? " p1" : "") }, h("div", { className: "hj-rang" }, String(o.place)), h("b", null, o.cavalier), h("span", null, o.cheval || ""), h("em", { style: { fontSize: 24 } }, cfg.bareme === "C" ? fmtT(o.c.total) : cfg.bareme === "A0" ? ptsTxt(o.c.pts) : fmtT(o.temps)), cfg.bareme === "A" ? h("span", { style: { marginTop: 2 } }, ptsTxt(o.c.pts)) : null);
          })) : null,
          CL.map(function (o, n) {
            return h("div", { key: n, className: "hj-li", style: { cursor: "default" } },
              h("span", { className: "n" }, o.c.etat ? "–" : String(o.place)),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "", h("span", { className: "c" }, resume(o, o.c))),
              h("span", { className: "v", style: { fontSize: 18 } }, o.c.etat ? "" : cfg.bareme === "C" ? fmtT(o.c.total) : (o.c.pts === 0 ? "SF" : o.c.pts + " pts")));
          }),
          h("div", { className: "hj-astuce" }, cfg.bareme === "A0" ? T("Sans chrono : à points égaux, les couples sont ex æquo.") : cfg.bareme === "C" ? T("Barème C : le plus petit temps (barres comprises) gagne ; à temps égal, ex æquo.") : T("Au chrono : à points égaux, le plus rapide passe devant ; à points et temps égaux, ex æquo.")),
          ctx.agenda_id ? h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: e.busy, onClick: publier }, e.busy ? T("Publication…") : e.ok ? T("Touche encore pour confirmer") : T("Publier le classement"))) : null) : null,
        h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn sec", onClick: function () { if (!e.efface) { setE(Object.assign({}, e, { efface: true })); return; } try { localStorage.removeItem(cle); } catch (x) { } setE({ ecoute: false, dit: "", msg: "", err: "", busy: false, ok: false }); setSt0(null); } }, e.efface ? T("Touche encore : tout effacer") : T("Nouvelle épreuve"))),
        blocRegl("cso", reglOuv, function () { setReglOuv(!reglOuv); }),
        h("div", { className: "hj-astuce" }, T("Dis le résultat dès que le couple a franchi la ligne d’arrivée : « sans faute, 32 secondes 45 », « une barre et un refus, 41 secondes 10 », « éliminé ». Tu peux corriger avec les boutons. Tout est gardé sur ton téléphone ; touche un couple de la liste pour revenir dessus.")),
        h("div", { style: { height: 30 } })));
  }


  /* ═══ 14/11 10h — LE RÈGLEMENT + MÉMO DU JURY ═══
     Blandine (14/11 09h49) : « mettre le règlement en ligne… ils galèrent… les règlements de chaque discipline… et si tu
     trouves des trucs propres au jury… accessible d'un clic quand ils sont sur la page où ils font ça ».
     La FFE publie UN règlement par discipline (toutes divisions : Club, Poney, Amateur, Pro) + un règlement général ;
     pas de mémo officiel pour les jurys trouvé → « Mémo du jury » rédigé par Hype à partir des règlements, chaque règle
     avec son article. À RELIRE À CHAQUE SAISON (nouveaux règlements au 1er septembre ; liens à mettre à jour). */
  var REGL = {
    general: { t: "Règlement général (toutes disciplines)", u: "https://www.ffe.com/system/files/disciplines/reglement-general-2027-applicable-au-01-09-2026_6.pdf" },
    cso: { t: "Règlement CSO", u: "https://www.ffe.com/system/files/disciplines/reglement-cso-2027-version-de-travail-applicable-au-01-09-2026.pdf", n: "La FFE demande de se connecter avec son compte FFE pour l’ouvrir." },
    dressage: { t: "Règlement Dressage", u: "https://www.ffe.com/system/files/disciplines-dressage/reglements/reglement-dressage-2027-applicable-au-01-09-2026_4.pdf" },
    cce: { t: "Règlement Concours complet", u: "https://www.ffe.com/system/files/disciplines-cce/reglements/reglement-cce-2027-version-de-travail-applicable-au-01-09-2026_0.pdf" }
  };
  var MEMO = {
    cso: { titre: "Mémo du jury de CSO", blocs: [
      ["Le temps", [
        ["Temps accordé = distance ÷ vitesse × 60 (en secondes).", "art. 6.1 B"],
        ["Temps limite = le double du temps accordé. Dépassé : éliminé.", "art. 6.1 C"],
        ["Barème C : pas de temps accordé, seulement un temps limite (3 min si le parcours fait 600 m ou plus, 2 min en dessous).", "art. 8.2 A"]]],
      ["Les pénalités au barème A", [
        ["Barre tombée ou faute à la rivière : 4 points.", "art. 8.2 A"],
        ["1re et 2e désobéissance : 4 points chacune. 3e désobéissance : éliminé.", "art. 8.2 A, 8.3"],
        ["Désobéissance avec destruction : 4 points + 6 secondes ajoutées au temps.", "art. 8.2 A"],
        ["Chute du cheval ou du cavalier : éliminé.", "art. 8.2 A, 8.3"],
        ["Temps accordé dépassé (parcours initial, 2e manche) : 1 point par tranche de 4 secondes entamée. Au barrage final : 1 point par seconde entamée.", "art. 8.2 A"],
        ["Erreur de parcours non rectifiée : éliminé.", "art. 8.3"]]],
      ["Le barème C", [
        ["Résultat en secondes = temps du parcours + 4 secondes par barre (3 secondes au barrage ou en 2e phase).", "art. 8.2 C"],
        ["Désobéissances : pas de pénalité, mais la 3e élimine. Désobéissance avec destruction : 6 secondes.", "art. 8.2 A"]]],
      ["Le classement", [
        ["Au chrono : à points égaux, le plus rapide passe devant.", "art. 8.2 B"],
        ["Sans chrono : à points égaux, les couples sont ex æquo. S’il y a un barrage prévu, il se court au chrono pour départager la 1re place.", "art. 8.2 B"],
        ["Barème C : à temps égal pour la 1re place, ex æquo sauf barrage prévu.", "art. 8.2 C"]]],
      ["Le barème Club", [
        ["Temps = le double du temps prévu pour la distance. Obstacle franchi correctement : 2 points. Barre tombée, ou obstacle franchi après un refus : 1 point. Obstacle non sauté : 0.", "art. 8.2 D"],
        ["Le plus de points gagne. Au chrono, à points égaux, le plus rapide passe devant.", "art. 8.2 D"]]]
    ], note: "Articles de la version 2025-2026 du règlement CSO ; les pénalités sont les mêmes en 2026-2027. En cas de doute, c’est le règlement en vigueur qui fait foi." },
    dressage: { titre: "Mémo du jury de dressage", blocs: [
      ["La note", [
        ["Chaque juge additionne ses notes multipliées par leurs coefficients, retire les pénalités en points, convertit en pourcentage, puis retire les pénalités en pourcentage.", "art. 9.1 A"],
        ["Plusieurs juges : le résultat est la moyenne des pourcentages de chaque juge.", "art. 9.1 B"],
        ["Les notes vont de 0 à 10, au demi-point.", "art. 6.3"]]],
      ["Les erreurs", [
        ["Erreur de tracé : 1re = −1 %, 2e = −1 %, 3e = éliminé.", "art. 7.8 A"],
        ["Erreur d’exécution : −2 points.", "art. 7.8 B"],
        ["Entrée en piste plus de 45 secondes après la cloche, ou avant la cloche : −2 points. Le juge en C sonne la cloche.", "tableau des pénalités"],
        ["Seules les reprises en musique (Libre, Pas de deux, Carrousel) sont chronométrées.", "art. 6.2"]]],
      ["Les égalités", [
        ["Pour les trois premières places, à pourcentage égal, les notes d’ensemble les plus élevées décident. En Libre : la note artistique.", "art. 9.1 C"],
        ["Pour les places suivantes : ex æquo.", "art. 9.1 C"]]]
    ], note: "Règlement Dressage applicable au 1er septembre 2026. En cas de doute, c’est le règlement en vigueur qui fait foi." }
  };
  function blocRegl(disc, ouvert, basculer) {
    var d = disc === "dressage" ? "dressage" : disc === "cce" ? "cce" : "cso", M = MEMO[d];
    return h("div", { className: "hj-encart", style: { marginTop: 16, paddingBottom: ouvert ? 14 : 6 } },
      h("button", { type: "button", onClick: basculer, style: { all: "unset", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" } },
        h("span", null, h("span", { className: "hj-k", style: { display: "block" } }, T("Le règlement")), h("span", { style: { display: "block", fontSize: 15, marginTop: 4, marginBottom: 8, color: "#F3EEE4" } }, M ? T("Liens officiels FFE et mémo du jury") : T("Liens officiels FFE"))),
        h("span", { "aria-hidden": "true", style: { fontSize: 20, color: "#ECE6DA" } }, ouvert ? "−" : "+")),
      ouvert ? h("div", null,
        [REGL[d], REGL.general].map(function (r, k) {
          return h("a", { key: k, href: r.u, target: "_blank", rel: "noopener", className: "hj-li", style: { textDecoration: "none", color: "#F3EEE4", gridTemplateColumns: "1fr 24px" } },
            h("span", { className: "t" }, T(r.t), r.n ? h("span", { className: "c" }, T(r.n)) : null), h("span", { className: "v", style: { fontSize: 18 } }, "↗"));
        }),
        M ? h("div", null,
          h("div", { className: "hj-h2", style: { marginTop: 18, fontSize: 22 } }, T(M.titre)),
          M.blocs.map(function (b, i) {
            return h("div", { key: i, style: { marginTop: 10 } },
              h("span", { className: "hj-l" }, T(b[0])),
              b[1].map(function (r, j) { return h("div", { key: j, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "1fr" } }, h("span", { className: "t" }, T(r[0]), h("span", { className: "c" }, r[1]))); }));
          }),
          h("div", { className: "hj-astuce" }, T(M.note))) : null) : null);
  }
  function PageRegl() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var _o = React.useState(true), ouv = _o[0], setOuv = _o[1];
    React.useEffect(function () { try { window.scrollTo(0, 0); } catch (x) { } }, []);
    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } (app.setEcran || function () { })(ctx.agenda_id ? "concours" : "accueil"); }
    var d = ctx.disc === "dressage" ? "dressage" : ctx.disc === "cce" ? "cce" : "cso";
    return h("div", { className: "hj" },
      h("div", { className: "hj-hero" }, h("img", { src: d === "dressage" ? "images/theme-position-cavalier-noir.webp" : "images/portrait-defaut-noir.webp", alt: "" }),
        h("button", { type: "button", className: "hj-ret", onClick: retour }, "‹ " + T("Retour")),
        h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true" }, h("path", { d: "M0 34 C 120 34, 220 6, 400 10", fill: "none", stroke: "rgba(201,166,107,.55)", strokeWidth: 1 }))),
      h("div", { className: "hj-in", style: { paddingTop: 16 } },
        h("div", { className: "hj-k" }, T("Le règlement")),
        h("div", { className: "hj-h1" }, d === "dressage" ? T("Dressage") : d === "cce" ? T("Concours complet") : T("Saut d’obstacles")),
        h("div", { className: "hj-sous" }, T("Un seul règlement par discipline, pour toutes les divisions (Club, Poney, Amateur, Pro), plus le règlement général.")),
        h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", marginTop: 16 } }, [["cso", "CSO"], ["dressage", T("Dressage")], ["cce", T("Complet")]].map(function (z) {
          return h("button", { key: z[0], type: "button", className: "hj-pill" + (d === z[0] ? " on" : ""), onClick: function () { try { window.__juger = Object.assign({}, ctx, { disc: z[0] }); } catch (x) { } setOuv(function (v) { return v === true ? 1 : true; }); } }, z[1]); })),
        blocRegl(d, true, function () { }),
        h("div", { style: { height: 30 } })));
  }

  /* 14/11 : un seul écran « juger » → reprise de dressage, jury de CSO (mode « cso ») ou règlement (mode « regl ») */
  function Juge() { var m = ""; try { m = (window.__juger || {}).mode || ""; } catch (x) { } return h(m === "cso" ? JuryCSO : m === "regl" ? PageRegl : EcranJuge); }
  window.HypeJuge = { Juge: Juge, lireNote: lireNote, lireCSO: lireCSO, classerCSO: classerCSO };
})();
