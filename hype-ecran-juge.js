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
    "Position et assiette du cavalier, effet des aides": ["Rider's position and seat, effect of the aids", "Posición y asiento del jinete, efecto de las ayudas", "Posizione e assetto del cavaliere, effetto degli aiuti", "騎乗者の姿勢と騎座、扶助の効果", "Sitz und Haltung des Reiters, Einwirkung der Hilfen", "وضعية الفارس وجلسته، وأثر المساعدات", "骑手姿势与坐姿、辅助效果", "Houding en zit van de ruiter, effect van de hulpen", "Posição e assento do cavaleiro, efeito das ajudas", "Ryttarens sits och hållning, hjälpernas verkan", "Посадка всадника, действие средств управления", "Dosiad i postawa jeźdźca, działanie pomocy", "기수의 자세와 시트, 부조의 효과", "وضعیت و نشست سوارکار، اثر کمک‌ها"],
    "connecte-toi d’abord": ["sign in first", "inicia sesión primero", "accedi prima", "先にログインしてください", "melde dich zuerst an", "سجّل الدخول أولاً", "请先登录", "log eerst in", "entra primeiro", "logga in först", "сначала войди", "najpierw się zaloguj", "먼저 로그인해 줘", "اول وارد شو"],
    "enregistrement refusé": ["saving refused", "guardado rechazado", "salvataggio rifiutato", "保存が拒否されました", "Speichern abgelehnt", "تم رفض الحفظ", "保存被拒绝", "opslaan geweigerd", "gravação recusada", "sparandet nekades", "сохранение отклонено", "zapis odrzucony", "저장이 거부됨", "ذخیره رد شد"],
    "résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums.": ["results published: they appear on the show page, in performances and on the podiums.", "resultados publicados: aparecen en la ficha del concurso, los rendimientos y los podios.", "risultati pubblicati: compaiono nella scheda del concorso, nelle prestazioni e sui podi.", "件の結果を公開しました：大会ページ、成績、表彰台に表示されます。", "Ergebnisse veröffentlicht: Sie erscheinen auf der Turnierseite, in den Leistungen und auf den Podien.", "نتائج منشورة: تظهر في صفحة المسابقة والأداء ومنصات التتويج.", "条成绩已发布：显示在比赛页面、成绩和领奖台上。", "uitslagen gepubliceerd: ze verschijnen op de wedstrijdpagina, bij de prestaties en op de podia.", "resultados publicados: aparecem na ficha do concurso, nos desempenhos e nos pódios.", "resultat publicerade: de visas på tävlingssidan, i prestationerna och på pallen.", "результатов опубликовано: они появятся на странице соревнования, в выступлениях и на пьедесталах.", "wyników opublikowano: pojawiają się na stronie zawodów, w osiągnięciach i na podium.", "개 결과 게시됨: 대회 페이지, 성적, 시상대에 표시돼.", "نتیجه منتشر شد: در صفحه مسابقه، عملکردها و سکوها نمایش داده می‌شوند."],
    "Publication impossible : ": ["Publishing failed: ", "Publicación imposible: ", "Pubblicazione impossibile: ", "公開できません：", "Veröffentlichen nicht möglich: ", "تعذّر النشر: ", "无法发布：", "Publiceren mislukt: ", "Publicação impossível: ", "Publicering misslyckades: ", "Не удалось опубликовать: ", "Publikacja niemożliwa: ", "게시할 수 없어: ", "انتشار ممکن نشد: "],
    "départagé par les notes d’ensemble": ["tie broken by the collective marks", "desempate por las notas de conjunto", "spareggio con i voti d’insieme", "総合点で順位決定", "durch die Gesamtnoten entschieden", "حُسم التعادل بالدرجات العامة", "按综合分决出名次", "beslist op de algemene punten", "desempatado pelas notas de conjunto", "avgjort av helhetsbetygen", "решено по общим оценкам", "rozstrzygnięte notami ogólnymi", "종합 점수로 순위 결정", "با نمره‌های کلی تعیین شد"],
    "Éliminé : trois erreurs de tracé": ["Eliminated: three errors of course", "Eliminado: tres errores de recorrido", "Eliminato: tre errori di percorso", "失格：経路違反3回", "Ausgeschieden: drei Verreiter", "مُقصى: ثلاثة أخطاء في المسار", "淘汰：三次路线错误", "Uitgesloten: drie keer verkeerd gereden", "Eliminado: três erros de percurso", "Utesluten: tre felridningar", "Исключён: три ошибки схемы", "Wyeliminowany: trzy błędy trasy", "실격: 경로 오류 3회", "حذف: سه خطای مسیر"],
    "Le classement se met à jour tout seul à chaque feuille signée. Égalité sur les trois premières places : les notes d’ensemble départagent ; ensuite, ex æquo (règlement Dressage, art. 9.1 C).": ["The ranking updates itself with each signed sheet. Tie for the top three places: the collective marks decide; after that, tied (Dressage rules, art. 9.1 C).", "La clasificación se actualiza sola con cada hoja firmada. Empate en los tres primeros puestos: deciden las notas de conjunto; después, ex aequo (reglamento de Doma, art. 9.1 C).", "La classifica si aggiorna da sola a ogni scheda firmata. Parità nei primi tre posti: decidono i voti d’insieme; dopo, ex aequo (regolamento Dressage, art. 9.1 C).", "署名された採点表ごとに順位が自動更新されます。上位3位の同点は総合点で決定、それ以降は同順位（馬場馬術規程 9.1 C）。", "Die Rangliste aktualisiert sich mit jedem unterschriebenen Bogen. Gleichstand auf den ersten drei Plätzen: die Gesamtnoten entscheiden; danach gleichplatziert (Dressurreglement, Art. 9.1 C).", "يتحدّث الترتيب تلقائياً مع كل ورقة موقّعة. عند التعادل في المراكز الثلاثة الأولى تحسم الدرجات العامة، وبعدها تعادل (لائحة الترويض، المادة 9.1 C).", "每签署一张评分表，排名自动更新。前三名同分时以综合分决定；之后并列（盛装舞步规则第9.1 C条）。", "Het klassement werkt zichzelf bij met elk getekend protocol. Gelijke stand op de eerste drie plaatsen: de algemene punten beslissen; daarna ex aequo (dressuurreglement, art. 9.1 C).", "A classificação atualiza-se sozinha a cada folha assinada. Empate nos três primeiros lugares: decidem as notas de conjunto; depois, ex aequo (regulamento de Dressage, art. 9.1 C).", "Placeringen uppdateras själv för varje signerat protokoll. Lika på de tre första platserna: helhetsbetygen avgör; därefter delad placering (dressyrreglementet, art. 9.1 C).", "Классификация обновляется сама с каждым подписанным протоколом. Равенство на первых трёх местах решают общие оценки; дальше — дележ мест (правила выездки, ст. 9.1 C).", "Klasyfikacja aktualizuje się sama z każdym podpisanym protokołem. Remis na trzech pierwszych miejscach: decydują noty ogólne; dalej ex aequo (regulamin ujeżdżenia, art. 9.1 C).", "서명된 채점표마다 순위가 자동으로 갱신돼. 상위 3위 동점은 종합 점수로 결정하고, 그 이후는 공동 순위야(마장마술 규정 9.1 C).", "رده‌بندی با هر برگه امضاشده خودکار به‌روز می‌شود. تساوی در سه رتبه اول: نمره‌های کلی تعیین می‌کنند؛ بعد از آن، هم‌رتبه (مقررات درساژ، ماده 9.1 C)."],
    "Publication…": ["Publishing…", "Publicando…", "Pubblicazione…", "公開中…", "Wird veröffentlicht…", "جارٍ النشر…", "发布中…", "Publiceren…", "A publicar…", "Publicerar…", "Публикация…", "Publikowanie…", "게시 중…", "در حال انتشار…"],
    "Touche encore pour confirmer": ["Tap again to confirm", "Toca otra vez para confirmar", "Tocca di nuovo per confermare", "もう一度タップして確定", "Zum Bestätigen erneut tippen", "اضغط مرة أخرى للتأكيد", "再点一次确认", "Tik nogmaals om te bevestigen", "Toca outra vez para confirmar", "Tryck igen för att bekräfta", "Нажми ещё раз для подтверждения", "Dotknij ponownie, aby potwierdzić", "확인하려면 다시 눌러", "برای تأیید دوباره بزن"],
    "Publier le classement": ["Publish the ranking", "Publicar la clasificación", "Pubblica la classifica", "順位を公開", "Rangliste veröffentlichen", "نشر الترتيب", "发布排名", "Klassement publiceren", "Publicar a classificação", "Publicera placeringen", "Опубликовать классификацию", "Opublikuj klasyfikację", "순위 게시", "انتشار رده‌بندی"],
    "La feuille de notes": ["The score sheet", "La hoja de notas", "La scheda dei voti", "採点表", "Der Notenbogen", "ورقة الدرجات", "评分表", "Het protocol", "A folha de notas", "Protokollet", "Протокол оценок", "Protokół ocen", "채점표", "برگه نمره"],
    "Reprise de dressage": ["Dressage test", "Reprise de doma", "Ripresa di dressage", "馬場馬術経路", "Dressuraufgabe", "اختبار الترويض", "盛装舞步测试", "Dressuurproef", "Reprise de dressage", "Dressyrprogram", "Тест по выездке", "Program ujeżdżenia", "마장마술 과제", "آزمون درساژ"],
    "Chargement…": ["Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Wird geladen…", "جارٍ التحميل…", "加载中…", "Laden…", "A carregar…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…", "در حال بارگذاری…"],
    "Aucune feuille signée pour ce couple dans ce concours.": ["No signed sheet for this pair at this show.", "Ninguna hoja firmada para esta pareja en este concurso.", "Nessuna scheda firmata per questo binomio in questo concorso.", "この大会でこのペアの署名済み採点表はありません。", "Kein unterschriebener Bogen für dieses Paar bei diesem Turnier.", "لا توجد ورقة موقّعة لهذا الثنائي في هذه المسابقة.", "此比赛中该组合没有已签署的评分表。", "Geen getekend protocol voor deze combinatie op deze wedstrijd.", "Nenhuma folha assinada para este conjunto neste concurso.", "Inget signerat protokoll för ekipaget på den här tävlingen.", "Нет подписанного протокола для этой пары на этом соревновании.", "Brak podpisanego protokołu dla tej pary na tych zawodach.", "이 대회에서 이 콤비의 서명된 채점표가 없어.", "برگه امضاشده‌ای برای این زوج در این مسابقه نیست."],
    "Éliminé": ["Eliminated", "Eliminado", "Eliminato", "失格", "Ausgeschieden", "مُقصى", "淘汰", "Uitgesloten", "Eliminado", "Utesluten", "Исключён", "Wyeliminowany", "실격", "حذف"],
    "Erreurs": ["Errors", "Errores", "Errori", "エラー", "Fehler", "الأخطاء", "错误", "Fouten", "Erros", "Fel", "Ошибки", "Błędy", "오류", "خطاها"],
    "de tracé": ["of course", "de recorrido", "di percorso", "経路違反", "Verreiten", "في المسار", "路线错误", "verkeerd gereden", "de percurso", "felridning", "схемы", "trasy", "경로", "مسیر"],
    "d’exécution": ["of execution", "de ejecución", "di esecuzione", "実施ミス", "Ausführung", "في التنفيذ", "执行错误", "uitvoering", "de execução", "utförande", "исполнения", "wykonania", "실행", "اجرا"],
    "Les commentaires sont ceux que le juge a dictés pendant ta reprise. Relis-les avec ton coach pour préparer la prochaine.": ["These are the comments the judge dictated during your test. Read them with your coach to prepare the next one.", "Son los comentarios que el juez dictó durante tu reprise. Reléelos con tu entrenador para preparar la próxima.", "Sono i commenti che il giudice ha dettato durante la tua ripresa. Rileggili con il tuo istruttore per preparare la prossima.", "審査員が経路中に口述したコメントです。コーチと読み返して次に備えよう。", "Das sind die Kommentare, die der Richter während deiner Aufgabe diktiert hat. Lies sie mit deinem Trainer, um die nächste vorzubereiten.", "هذه تعليقات الحكم التي أملاها أثناء اختبارك. اقرأها مع مدرّبك للتحضير للاختبار القادم.", "这些是裁判在你的测试中口述的评语。和教练一起读，为下一次做准备。", "Dit zijn de opmerkingen die de jury tijdens je proef dicteerde. Lees ze met je trainer om de volgende voor te bereiden.", "São os comentários que o juiz ditou durante a tua reprise. Relê-os com o teu treinador para preparar a próxima.", "Det här är kommentarerna domaren dikterade under ditt program. Läs dem med din tränare inför nästa.", "Это комментарии, которые судья продиктовал во время твоего теста. Перечитай их с тренером, чтобы подготовиться к следующему.", "To komentarze, które sędzia podyktował podczas twojego programu. Przeczytaj je z trenerem, by przygotować następny.", "심사위원이 과제 중에 말한 코멘트야. 코치와 다시 읽고 다음을 준비해.", "این‌ها نظرهایی است که داور در طول آزمونت گفت. با مربی‌ات بخوان تا برای بعدی آماده شوی."],
    "Erreurs de tracé": ["Errors of course", "Errores de recorrido", "Errori di percorso", "経路違反", "Verreiter", "أخطاء المسار", "路线错误", "Verkeerd gereden", "Erros de percurso", "Felridningar", "Ошибки схемы", "Błędy trasy", "경로 오류", "خطاهای مسیر"],
    "−1 % chacune, la 3e élimine": ["−1% each, the 3rd eliminates", "−1 % cada uno, el 3.º elimina", "−1 % ciascuno, il 3° elimina", "各−1％、3回目で失格", "je −1 %, der 3. führt zum Ausschluss", "‎−1٪ لكل خطأ، والثالث يُقصي", "每次−1%，第3次淘汰", "elk −1 %, de 3e sluit uit", "−1 % cada, o 3.º elimina", "−1 % var, den 3:e utesluter", "−1 % за каждую, 3-я — исключение", "−1% każdy, 3. eliminuje", "각 −1%, 3번째는 실격", "هرکدام −۱٪، سومی حذف"],
    "Erreurs d’exécution": ["Errors of execution", "Errores de ejecución", "Errori di esecuzione", "実施ミス", "Ausführungsfehler", "أخطاء التنفيذ", "执行错误", "Uitvoeringsfouten", "Erros de execução", "Utförandefel", "Ошибки исполнения", "Błędy wykonania", "실행 오류", "خطاهای اجرا"],
    "−2 points chacune": ["−2 points each", "−2 puntos cada uno", "−2 punti ciascuno", "各−2点", "je −2 Punkte", "‎−2 نقطة لكل خطأ", "每次−2分", "elk −2 punten", "−2 pontos cada", "−2 poäng var", "−2 балла за каждую", "−2 pkt każdy", "각 −2점", "هرکدام −۲ امتیاز"],
    "Jury de CSO": ["Show jumping jury", "Jurado de salto", "Giuria di salto ostacoli", "障害飛越の審判", "Springrichter", "لجنة تحكيم القفز", "障碍赛裁判", "Springjury", "Júri de saltos", "Hoppningsjury", "Жюри конкура", "Jury skoków", "장애물 심판", "داوری پرش"],
    "Barème A au chrono": ["Table A against the clock", "Baremo A al cronómetro", "Tabella A a tempo", "A基準・タイム計測", "Wertung A mit Zeit", "جدول A بالتوقيت", "A表计时", "Tabel A op tijd", "Tabela A ao cronómetro", "Bedömning A på tid", "Таблица A на время", "Tabela A na czas", "A 기준 시간 측정", "جدول A با زمان"],
    "Barème A sans chrono": ["Table A not against the clock", "Baremo A sin cronómetro", "Tabella A senza tempo", "A基準・タイムなし", "Wertung A ohne Zeit", "جدول A بدون توقيت", "A表不计时", "Tabel A niet op tijd", "Tabela A sem cronómetro", "Bedömning A utan tid", "Таблица A без времени", "Tabela A bez czasu", "A 기준 시간 미측정", "جدول A بدون زمان"],
    "Barème C": ["Table C", "Baremo C", "Tabella C", "C基準", "Wertung C", "جدول C", "C表", "Tabel C", "Tabela C", "Bedömning C", "Таблица C", "Tabela C", "C 기준", "جدول C"],
    "Dicter les résultats": ["Dictate the results", "Dictar los resultados", "Dettare i risultati", "結果を口述", "Ergebnisse diktieren", "إملاء النتائج", "口述成绩", "Uitslagen dicteren", "Ditar os resultados", "Diktera resultaten", "Продиктовать результаты", "Dyktuj wyniki", "결과 말하기", "دیکته نتایج"],
    "Le jury dit le résultat de chaque couple : Hype compte les points, le temps et fait le classement.": ["The jury says each pair’s result: Hype counts the points and time and makes the ranking.", "El jurado dice el resultado de cada pareja: Hype cuenta los puntos y el tiempo y hace la clasificación.", "La giuria dice il risultato di ogni binomio: Hype conta punti e tempo e fa la classifica.", "審判が各ペアの結果を言うと、Hypeが減点とタイムを計算して順位を出します。", "Die Jury sagt das Ergebnis jedes Paares: Hype zählt Punkte und Zeit und erstellt die Rangliste.", "تقول لجنة التحكيم نتيجة كل ثنائي: يحسب Hype النقاط والوقت ويضع الترتيب.", "裁判说出每个组合的成绩：Hype 计算罚分和时间并排名。", "De jury zegt de uitslag van elke combinatie: Hype telt punten en tijd en maakt het klassement.", "O júri diz o resultado de cada conjunto: a Hype conta os pontos e o tempo e faz a classificação.", "Juryn säger varje ekipages resultat: Hype räknar poäng och tid och gör placeringen.", "Жюри называет результат каждой пары: Hype считает очки и время и составляет классификацию.", "Jury podaje wynik każdej pary: Hype liczy punkty i czas i robi klasyfikację.", "심판이 각 콤비의 결과를 말하면 Hype가 점수와 시간을 계산해 순위를 매겨.", "داور نتیجه هر زوج را می‌گوید: Hype امتیاز و زمان را حساب می‌کند و رده‌بندی را می‌سازد."],
    "Épreuve": ["Class", "Prueba", "Prova", "競技", "Prüfung", "المسابقة", "赛项", "Rubriek", "Prova", "Klass", "Маршрут", "Konkurs", "경기", "رقابت"],
    "ex. Club 2 Grand Prix": ["e.g. Club 2 Grand Prix", "p. ej. Club 2 Grand Prix", "es. Club 2 Grand Prix", "例：Club 2 Grand Prix", "z. B. Club 2 Grand Prix", "مثلاً Club 2 Grand Prix", "例如 Club 2 Grand Prix", "bijv. Club 2 Grand Prix", "ex. Club 2 Grand Prix", "t.ex. Club 2 Grand Prix", "напр. Club 2 Grand Prix", "np. Club 2 Grand Prix", "예: Club 2 Grand Prix", "مثلاً Club 2 Grand Prix"],
    "Barème": ["Table", "Baremo", "Tabella", "基準", "Wertung", "الجدول", "评分表", "Tabel", "Tabela", "Bedömning", "Таблица", "Tabela", "기준", "جدول"],
    "Temps accordé (secondes)": ["Time allowed (seconds)", "Tiempo concedido (segundos)", "Tempo accordato (secondi)", "規定タイム（秒）", "Erlaubte Zeit (Sekunden)", "الوقت المسموح (ثوانٍ)", "规定时间（秒）", "Toegestane tijd (seconden)", "Tempo concedido (segundos)", "Tillåten tid (sekunder)", "Норма времени (секунды)", "Czas normowy (sekundy)", "제한 시간(초)", "زمان مجاز (ثانیه)"],
    "sur le plan du parcours, ex. 72": ["on the course plan, e.g. 72", "en el plano del recorrido, p. ej. 72", "sul piano del percorso, es. 72", "コース図に記載、例：72", "auf dem Parcoursplan, z. B. 72", "على مخطط المسار، مثلاً 72", "见路线图，例如 72", "op het parcoursplan, bijv. 72", "no plano do percurso, ex. 72", "på banskissen, t.ex. 72", "на схеме маршрута, напр. 72", "na planie parkuru, np. 72", "코스도에 표시, 예: 72", "روی نقشه مسیر، مثلاً ۷۲"],
    "Barème C : le temps du parcours plus 4 secondes par barre. Trois désobéissances ou une chute : éliminé.": ["Table C: the round time plus 4 seconds per knock-down. Three disobediences or a fall: eliminated.", "Baremo C: el tiempo del recorrido más 4 segundos por derribo. Tres desobediencias o una caída: eliminado.", "Tabella C: il tempo del percorso più 4 secondi per abbattimento. Tre disobbedienze o una caduta: eliminato.", "C基準：走行タイム＋落下1回につき4秒。反抗3回または落馬で失格。", "Wertung C: Rittzeit plus 4 Sekunden pro Abwurf. Drei Ungehorsame oder ein Sturz: ausgeschieden.", "الجدول C: وقت المسار زائد 4 ثوانٍ لكل إسقاط. ثلاثة عصيانات أو سقوط: إقصاء.", "C表：完成时间加每次落杆4秒。三次抗拒或一次摔落：淘汰。", "Tabel C: de parcourstijd plus 4 seconden per afworp. Drie ongehoorzaamheden of een val: uitgesloten.", "Tabela C: o tempo do percurso mais 4 segundos por derrube. Três desobediências ou uma queda: eliminado.", "Bedömning C: rundans tid plus 4 sekunder per nedslag. Tre olydnader eller ett fall: utesluten.", "Таблица C: время маршрута плюс 4 секунды за повал. Три неповиновения или падение: исключение.", "Tabela C: czas przejazdu plus 4 sekundy za zrzutkę. Trzy nieposłuszeństwa lub upadek: eliminacja.", "C 기준: 주행 시간 + 낙봉 1회당 4초. 반항 3회 또는 낙마: 실격.", "جدول C: زمان مسیر به‌علاوه ۴ ثانیه برای هر انداختن مانع. سه نافرمانی یا یک سقوط: حذف."],
    "Barème A : 4 points par barre et par désobéissance, 1 point par tranche de 4 secondes entamée au-delà du temps accordé. Trois désobéissances, une chute ou le double du temps accordé : éliminé.": ["Table A: 4 points per knock-down and per disobedience, 1 point for each started 4 seconds over the time allowed. Three disobediences, a fall or twice the time allowed: eliminated.", "Baremo A: 4 puntos por derribo y por desobediencia, 1 punto por cada 4 segundos empezados por encima del tiempo concedido. Tres desobediencias, una caída o el doble del tiempo concedido: eliminado.", "Tabella A: 4 punti per abbattimento e per disobbedienza, 1 punto per ogni 4 secondi iniziati oltre il tempo accordato. Tre disobbedienze, una caduta o il doppio del tempo accordato: eliminato.", "A基準：落下・反抗1回につき4点、規定タイム超過は4秒ごとに1点。反抗3回、落馬、規定タイムの2倍で失格。", "Wertung A: 4 Punkte pro Abwurf und Ungehorsam, 1 Punkt je angefangene 4 Sekunden über der erlaubten Zeit. Drei Ungehorsame, ein Sturz oder die doppelte erlaubte Zeit: ausgeschieden.", "الجدول A: 4 نقاط لكل إسقاط ولكل عصيان، ونقطة لكل 4 ثوانٍ بدأت فوق الوقت المسموح. ثلاثة عصيانات أو سقوط أو ضعف الوقت المسموح: إقصاء.", "A表：每次落杆和抗拒罚4分，超出规定时间每开始4秒罚1分。三次抗拒、摔落或超过规定时间两倍：淘汰。", "Tabel A: 4 punten per afworp en per ongehoorzaamheid, 1 punt per begonnen 4 seconden boven de toegestane tijd. Drie ongehoorzaamheden, een val of het dubbele van de toegestane tijd: uitgesloten.", "Tabela A: 4 pontos por derrube e por desobediência, 1 ponto por cada 4 segundos começados acima do tempo concedido. Três desobediências, uma queda ou o dobro do tempo concedido: eliminado.", "Bedömning A: 4 poäng per nedslag och per olydnad, 1 poäng per påbörjade 4 sekunder över tillåten tid. Tre olydnader, ett fall eller dubbla tillåtna tiden: utesluten.", "Таблица A: 4 очка за повал и за неповиновение, 1 очко за каждые начатые 4 секунды сверх нормы. Три неповиновения, падение или двойная норма времени: исключение.", "Tabela A: 4 pkt za zrzutkę i za nieposłuszeństwo, 1 pkt za każde rozpoczęte 4 sekundy ponad czas normowy. Trzy nieposłuszeństwa, upadek lub podwójny czas normowy: eliminacja.", "A 기준: 낙봉·반항 1회당 4점, 제한 시간 초과는 4초마다 1점. 반항 3회, 낙마, 제한 시간의 2배: 실격.", "جدول A: ۴ امتیاز برای هر انداختن مانع و هر نافرمانی، ۱ امتیاز برای هر ۴ ثانیه آغازشده بیش از زمان مجاز. سه نافرمانی، سقوط یا دو برابر زمان مجاز: حذف."],
    "Commencer l’épreuve": ["Start the class", "Empezar la prueba", "Inizia la prova", "競技を開始", "Prüfung starten", "بدء المسابقة", "开始赛项", "Rubriek starten", "Começar a prova", "Starta klassen", "Начать маршрут", "Rozpocznij konkurs", "경기 시작", "شروع رقابت"],
    "La dictée n’est pas disponible ici : utilise les boutons et le temps.": ["Dictation isn’t available here: use the buttons and the time field.", "El dictado no está disponible aquí: usa los botones y el tiempo.", "La dettatura non è disponibile qui: usa i pulsanti e il tempo.", "ここでは音声入力が使えません：ボタンとタイム欄を使ってください。", "Diktieren ist hier nicht verfügbar: nutze die Tasten und das Zeitfeld.", "الإملاء غير متاح هنا: استخدم الأزرار وخانة الوقت.", "此处无法语音输入：请使用按钮和时间栏。", "Dicteren is hier niet beschikbaar: gebruik de knoppen en het tijdveld.", "O ditado não está disponível aqui: usa os botões e o tempo.", "Diktering finns inte här: använd knapparna och tidsfältet.", "Диктовка здесь недоступна: используй кнопки и поле времени.", "Dyktowanie nie jest tu dostępne: użyj przycisków i pola czasu.", "여기서는 음성 입력이 안 돼: 버튼과 시간 칸을 써.", "دیکته اینجا در دسترس نیست: از دکمه‌ها و زمان استفاده کن."],
    "Je n’ai rien compris : redis par exemple « sans faute, 32 secondes 45 » ou « une barre, 40 secondes 10 ».": ["I didn’t catch that: say for example “clear, 32 seconds 45” or “one knock-down, 40 seconds 10”.", "No entendí nada: di por ejemplo «sin faltas, 32 segundos 45» o «un derribo, 40 segundos 10».", "Non ho capito: ridì per esempio «percorso netto, 32 secondi 45» o «un abbattimento, 40 secondi 10».", "聞き取れませんでした。例：「減点なし、32秒45」「落下1、40秒10」。", "Ich habe nichts verstanden: sag z. B. „fehlerfrei, 32 Sekunden 45“ oder „ein Abwurf, 40 Sekunden 10“.", "لم أفهم: قل مثلاً «بدون أخطاء، 32 ثانية 45» أو «إسقاط واحد، 40 ثانية 10».", "没听懂：比如说“零罚分，32秒45”或“一次落杆，40秒10”。", "Ik heb niets begrepen: zeg bijvoorbeeld „foutloos, 32 seconden 45” of „één afworp, 40 seconden 10”.", "Não percebi: diz por exemplo «sem faltas, 32 segundos 45» ou «um derrube, 40 segundos 10».", "Jag förstod inte: säg t.ex. ”felfritt, 32 sekunder 45” eller ”ett nedslag, 40 sekunder 10”.", "Не понял: скажи, например, «чисто, 32 секунды 45» или «один повал, 40 секунд 10».", "Nie zrozumiałem: powiedz np. „czysto, 32 sekundy 45” albo „jedna zrzutka, 40 sekund 10”.", "못 알아들었어: 예를 들어 “무감점, 32초 45” 또는 “낙봉 1회, 40초 10”이라고 말해.", "متوجه نشدم: مثلاً بگو «بدون خطا، ۳۲ ثانیه ۴۵» یا «یک مانع افتاد، ۴۰ ثانیه ۱۰»."],
    "est classé.": ["is ranked.", "está clasificado.", "è classificato.", "の順位が出ました。", "ist platziert.", "تم ترتيبه.", "已排名。", "is geklasseerd.", "está classificado.", "är placerad.", "в классификации.", "jest sklasyfikowany.", "순위에 올랐어.", "رده‌بندی شد."],
    "Abandon": ["Retired", "Abandono", "Ritirato", "棄権", "Aufgegeben", "انسحاب", "弃权", "Opgegeven", "Abandono", "Utgått", "Сход", "Rezygnacja", "기권", "انصراف"],
    "Non partant": ["Non-starter", "No presentado", "Non partito", "不出走", "Nicht gestartet", "لم يشارك", "未出场", "Niet gestart", "Não partiu", "Ej start", "Не стартовал", "Nie wystartował", "미출전", "شرکت نکرد"],
    "barres": ["knock-downs", "derribos", "abbattimenti", "落下", "Abwürfe", "إسقاطات", "落杆", "afworpen", "derrubes", "nedslag", "повала", "zrzutki", "낙봉", "مانع افتاده"],
    "barre": ["knock-down", "derribo", "abbattimento", "落下", "Abwurf", "إسقاط", "落杆", "afworp", "derrube", "nedslag", "повал", "zrzutka", "낙봉", "مانع افتاده"],
    "Sans faute": ["Clear", "Sin faltas", "Netto", "減点なし", "Fehlerfrei", "بدون أخطاء", "零罚分", "Foutloos", "Sem faltas", "Felfritt", "Чисто", "Czysto", "무감점", "بدون خطا"],
    "pts": ["pts", "pts", "pt", "点", "Pkt.", "نقاط", "分", "ptn", "pts", "p", "оч.", "pkt", "점", "امتیاز"],
    "pt": ["pt", "pt", "pt", "点", "Pkt.", "نقطة", "分", "pt", "pt", "p", "оч.", "pkt", "점", "امتیاز"],
    "ouvre cet outil depuis la fiche du concours": ["open this tool from the show page", "abre esta herramienta desde la ficha del concurso", "apri questo strumento dalla scheda del concorso", "大会ページからこのツールを開いてください", "öffne dieses Werkzeug über die Turnierseite", "افتح هذه الأداة من صفحة المسابقة", "请从比赛页面打开此工具", "open deze tool vanaf de wedstrijdpagina", "abre esta ferramenta a partir da ficha do concurso", "öppna verktyget från tävlingssidan", "открой этот инструмент со страницы соревнования", "otwórz to narzędzie ze strony zawodów", "대회 페이지에서 이 도구를 열어", "این ابزار را از صفحه مسابقه باز کن"],
    "temps accordé": ["time allowed", "tiempo concedido", "tempo accordato", "規定タイム", "erlaubte Zeit", "الوقت المسموح", "规定时间", "toegestane tijd", "tempo concedido", "tillåten tid", "норма времени", "czas normowy", "제한 시간", "زمان مجاز"],
    "passés": ["done", "pasados", "passati", "完了", "gestartet", "مرّوا", "已出场", "gereden", "passaram", "klara", "прошли", "przejechało", "완료", "رفته‌اند"],
    "EN PISTE": ["IN THE RING", "EN PISTA", "IN CAMPO", "走行中", "IM PARCOURS", "في الحلبة", "场上", "IN DE RING", "EM PISTA", "PÅ BANAN", "НА МАРШРУТЕ", "NA PARKURZE", "경기 중", "در میدان"],
    "Dicter le résultat": ["Dictate the result", "Dictar el resultado", "Dettare il risultato", "結果を口述", "Ergebnis diktieren", "إملاء النتيجة", "口述成绩", "Uitslag dicteren", "Ditar o resultado", "Diktera resultatet", "Продиктовать результат", "Dyktuj wynik", "결과 말하기", "دیکته نتیجه"],
    "Touche et dis le résultat : « sans faute, 32 secondes 45 »": ["Tap and say the result: “clear, 32 seconds 45”", "Toca y di el resultado: «sin faltas, 32 segundos 45»", "Tocca e di’ il risultato: «netto, 32 secondi 45»", "タップして結果を言う：「減点なし、32秒45」", "Tippe und sag das Ergebnis: „fehlerfrei, 32 Sekunden 45“", "اضغط وقل النتيجة: «بدون أخطاء، 32 ثانية 45»", "点击并说出成绩：“零罚分，32秒45”", "Tik en zeg de uitslag: „foutloos, 32 seconden 45”", "Toca e diz o resultado: «sem faltas, 32 segundos 45»", "Tryck och säg resultatet: ”felfritt, 32 sekunder 45”", "Нажми и скажи результат: «чисто, 32 секунды 45»", "Dotknij i powiedz wynik: „czysto, 32 sekundy 45”", "누르고 결과를 말해: “무감점, 32초 45”", "بزن و نتیجه را بگو: «بدون خطا، ۳۲ ثانیه ۴۵»"],
    "temps retenu": ["final time", "tiempo retenido", "tempo considerato", "採用タイム", "gewertete Zeit", "الوقت المعتمد", "计入时间", "gerekende tijd", "tempo considerado", "räknad tid", "итоговое время", "czas zaliczony", "최종 시간", "زمان نهایی"],
    "points": ["points", "puntos", "punti", "減点", "Punkte", "نقاط", "罚分", "punten", "pontos", "poäng", "очки", "punkty", "점수", "امتیاز"],
    "Temps du parcours": ["Round time", "Tiempo del recorrido", "Tempo del percorso", "走行タイム", "Rittzeit", "وقت المسار", "完成时间", "Parcourstijd", "Tempo do percurso", "Rundans tid", "Время маршрута", "Czas przejazdu", "주행 시간", "زمان مسیر"],
    "dont": ["including", "incluidos", "di cui", "うち", "davon", "منها", "其中", "waarvan", "dos quais", "varav", "в т. ч.", "w tym", "그중", "شامل"],
    "pts de temps": ["time pts", "pts de tiempo", "punti di tempo", "点（タイム）", "Zeitpunkte", "نقاط وقت", "时间罚分", "tijdpunten", "pts de tempo", "tidspoäng", "оч. за время", "pkt za czas", "시간 감점", "امتیاز زمان"],
    "pt de temps": ["time pt", "pt de tiempo", "punto di tempo", "点（タイム）", "Zeitpunkt", "نقطة وقت", "时间罚分", "tijdpunt", "pt de tempo", "tidspoäng", "оч. за время", "pkt za czas", "시간 감점", "امتیاز زمان"],
    "Barres": ["Knock-downs", "Derribos", "Abbattimenti", "落下", "Abwürfe", "الإسقاطات", "落杆", "Afworpen", "Derrubes", "Nedslag", "Повалы", "Zrzutki", "낙봉", "موانع افتاده"],
    "Désobéissances": ["Disobediences", "Desobediencias", "Disobbedienze", "反抗", "Ungehorsame", "العصيانات", "抗拒", "Ongehoorzaamheden", "Desobediências", "Olydnader", "Неповиновения", "Nieposłuszeństwa", "반항", "نافرمانی‌ها"],
    "Valider et couple suivant": ["Confirm, next pair", "Validar y siguiente pareja", "Conferma e binomio successivo", "確定して次のペアへ", "Bestätigen, nächstes Paar", "تأكيد والثنائي التالي", "确认，下一组", "Bevestigen, volgende combinatie", "Validar e conjunto seguinte", "Bekräfta, nästa ekipage", "Подтвердить, следующая пара", "Zatwierdź, następna para", "확인하고 다음 콤비", "تأیید و زوج بعدی"],
    "Tous les couples sont passés": ["All pairs have gone", "Todas las parejas han pasado", "Tutti i binomi sono passati", "全ペアが走行しました", "Alle Paare sind gestartet", "مرّ جميع الثنائيات", "所有组合都已出场", "Alle combinaties zijn gereden", "Todos os conjuntos passaram", "Alla ekipage har ridit", "Все пары прошли", "Wszystkie pary przejechały", "모든 콤비가 끝났어", "همه زوج‌ها رفته‌اند"],
    "Vérifie le classement, puis publie-le.": ["Check the ranking, then publish it.", "Revisa la clasificación y publícala.", "Controlla la classifica, poi pubblicala.", "順位を確認して公開しよう。", "Prüfe die Rangliste und veröffentliche sie.", "تحقق من الترتيب ثم انشره.", "检查排名后发布。", "Controleer het klassement en publiceer het.", "Verifica a classificação e publica-a.", "Kontrollera placeringen och publicera den.", "Проверь классификацию и опубликуй её.", "Sprawdź klasyfikację i ją opublikuj.", "순위를 확인하고 게시해.", "رده‌بندی را بررسی کن، بعد منتشرش کن."],
    "L’ordre de passage": ["Starting order", "El orden de salida", "L’ordine di partenza", "出走順", "Die Startreihenfolge", "ترتيب الانطلاق", "出场顺序", "De startvolgorde", "A ordem de partida", "Startordningen", "Порядок выступления", "Kolejność startu", "출전 순서", "ترتیب ورود"],
    "en piste": ["in the ring", "en pista", "in campo", "走行中", "im Parcours", "في الحلبة", "场上", "in de ring", "em pista", "på banan", "на маршруте", "na parkurze", "경기 중", "در میدان"],
    "à venir": ["to come", "por venir", "in attesa", "これから", "folgt", "قادم", "待出场", "komt nog", "a seguir", "kommer", "впереди", "w kolejce", "대기", "در راه"],
    "Ajouter un couple": ["Add a pair", "Añadir una pareja", "Aggiungi un binomio", "ペアを追加", "Paar hinzufügen", "إضافة ثنائي", "添加组合", "Combinatie toevoegen", "Adicionar um conjunto", "Lägg till ekipage", "Добавить пару", "Dodaj parę", "콤비 추가", "افزودن زوج"],
    "Ajouter": ["Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가", "افزودن"],
    "Sans chrono : à points égaux, les couples sont ex æquo.": ["Not against the clock: on equal points, pairs are tied.", "Sin cronómetro: a igualdad de puntos, las parejas quedan ex aequo.", "Senza tempo: a parità di punti, i binomi sono ex aequo.", "タイムなし：同点のペアは同順位。", "Ohne Zeit: bei Punktgleichheit sind die Paare gleichplatziert.", "بدون توقيت: عند تساوي النقاط يتعادل الثنائيون.", "不计时：同分组合并列。", "Niet op tijd: bij gelijke punten zijn de combinaties ex aequo.", "Sem cronómetro: com pontos iguais, os conjuntos ficam ex aequo.", "Utan tid: vid lika poäng delar ekipagen placering.", "Без времени: при равных очках пары делят место.", "Bez czasu: przy równych punktach pary są ex aequo.", "시간 미측정: 동점이면 공동 순위야.", "بدون زمان: با امتیاز برابر، زوج‌ها هم‌رتبه‌اند."],
    "Barème C : le plus petit temps (barres comprises) gagne ; à temps égal, ex æquo.": ["Table C: the lowest time (knock-downs included) wins; on equal time, tied.", "Baremo C: gana el menor tiempo (derribos incluidos); a igual tiempo, ex aequo.", "Tabella C: vince il tempo più basso (abbattimenti compresi); a parità di tempo, ex aequo.", "C基準：最短タイム（落下加算込み）が勝ち。同タイムは同順位。", "Wertung C: die kürzeste Zeit (Abwürfe eingerechnet) gewinnt; bei gleicher Zeit gleichplatziert.", "الجدول C: يفوز أقل وقت (مع الإسقاطات)؛ وعند تساوي الوقت تعادل.", "C表：用时最短（含落杆加时）者胜；时间相同则并列。", "Tabel C: de kortste tijd (afworpen inbegrepen) wint; bij gelijke tijd ex aequo.", "Tabela C: ganha o menor tempo (derrubes incluídos); com tempo igual, ex aequo.", "Bedömning C: kortaste tid (nedslag inräknade) vinner; vid lika tid delad placering.", "Таблица C: побеждает наименьшее время (с повалами); при равном времени — дележ места.", "Tabela C: wygrywa najkrótszy czas (z doliczonymi zrzutkami); przy równym czasie ex aequo.", "C 기준: 가장 짧은 시간(낙봉 포함)이 이겨; 같은 시간이면 공동 순위.", "جدول C: کمترین زمان (با موانع افتاده) برنده است؛ با زمان برابر، هم‌رتبه."],
    "Au chrono : à points égaux, le plus rapide passe devant ; à points et temps égaux, ex æquo.": ["Against the clock: on equal points the fastest goes ahead; on equal points and time, tied.", "Al cronómetro: a igualdad de puntos, el más rápido pasa delante; a igualdad de puntos y tiempo, ex aequo.", "A tempo: a parità di punti passa avanti il più veloce; a parità di punti e tempo, ex aequo.", "タイム計測：同点なら速い方が上位。同点同タイムは同順位。", "Mit Zeit: bei Punktgleichheit liegt der Schnellere vorn; bei gleichen Punkten und gleicher Zeit gleichplatziert.", "بالتوقيت: عند تساوي النقاط يتقدّم الأسرع؛ وعند تساوي النقاط والوقت تعادل.", "计时：同分时更快者在前；同分同时间则并列。", "Op tijd: bij gelijke punten gaat de snelste voor; bij gelijke punten en tijd ex aequo.", "Ao cronómetro: com pontos iguais passa à frente o mais rápido; com pontos e tempo iguais, ex aequo.", "På tid: vid lika poäng går den snabbaste före; vid lika poäng och tid delad placering.", "На время: при равных очках впереди самый быстрый; при равных очках и времени — дележ места.", "Na czas: przy równych punktach wyżej jest najszybszy; przy równych punktach i czasie ex aequo.", "시간 측정: 동점이면 더 빠른 쪽이 앞서; 점수와 시간이 같으면 공동 순위.", "با زمان: با امتیاز برابر، سریع‌تر جلوتر است؛ با امتیاز و زمان برابر، هم‌رتبه."],
    "Touche encore : tout effacer": ["Tap again: erase everything", "Toca otra vez: borrar todo", "Tocca di nuovo: cancella tutto", "もう一度タップ：すべて消去", "Erneut tippen: alles löschen", "اضغط مرة أخرى: مسح الكل", "再点一次：全部清除", "Tik nogmaals: alles wissen", "Toca outra vez: apagar tudo", "Tryck igen: radera allt", "Нажми ещё раз: стереть всё", "Dotknij ponownie: usuń wszystko", "다시 누르면 전부 지워", "دوباره بزن: همه پاک شود"],
    "Nouvelle épreuve": ["New class", "Nueva prueba", "Nuova prova", "新しい競技", "Neue Prüfung", "مسابقة جديدة", "新赛项", "Nieuwe rubriek", "Nova prova", "Ny klass", "Новый маршрут", "Nowy konkurs", "새 경기", "رقابت جدید"],
    "Dis le résultat dès que le couple a franchi la ligne d’arrivée : « sans faute, 32 secondes 45 », « une barre et un refus, 41 secondes 10 », « éliminé ». Tu peux corriger avec les boutons. Tout est gardé sur ton téléphone ; touche un couple de la liste pour revenir dessus.": ["Say the result as soon as the pair crosses the finish line: “clear, 32 seconds 45”, “one knock-down and a refusal, 41 seconds 10”, “eliminated”. You can correct it with the buttons. Everything is kept on your phone; tap a pair in the list to go back to it.", "Di el resultado en cuanto la pareja cruce la línea de llegada: «sin faltas, 32 segundos 45», «un derribo y un rehúse, 41 segundos 10», «eliminado». Puedes corregir con los botones. Todo se guarda en tu teléfono; toca una pareja de la lista para volver a ella.", "Di’ il risultato appena il binomio taglia il traguardo: «netto, 32 secondi 45», «un abbattimento e un rifiuto, 41 secondi 10», «eliminato». Puoi correggere con i pulsanti. Tutto resta sul tuo telefono; tocca un binomio nell’elenco per tornarci.", "ペアがゴールを越えたらすぐ結果を言おう：「減点なし、32秒45」「落下1、反抗1、41秒10」「失格」。ボタンで修正できます。すべてスマホに保存され、リストのペアをタップすると戻れます。", "Sag das Ergebnis, sobald das Paar die Ziellinie überquert: „fehlerfrei, 32 Sekunden 45“, „ein Abwurf und eine Verweigerung, 41 Sekunden 10“, „ausgeschieden“. Mit den Tasten kannst du korrigieren. Alles bleibt auf deinem Handy; tippe auf ein Paar in der Liste, um zurückzugehen.", "قل النتيجة بمجرد عبور الثنائي خط النهاية: «بدون أخطاء، 32 ثانية 45»، «إسقاط ورفض، 41 ثانية 10»، «إقصاء». يمكنك التصحيح بالأزرار. يُحفظ كل شيء على هاتفك؛ اضغط على ثنائي في القائمة للرجوع إليه.", "组合一过终点线就说出成绩：“零罚分，32秒45”“一次落杆一次拒跳，41秒10”“淘汰”。可用按钮修改。所有内容保存在你的手机上；点列表中的组合可返回。", "Zeg de uitslag zodra de combinatie over de finish is: „foutloos, 32 seconden 45”, „één afworp en een weigering, 41 seconden 10”, „uitgesloten”. Je kunt verbeteren met de knoppen. Alles blijft op je telefoon; tik op een combinatie in de lijst om terug te gaan.", "Diz o resultado assim que o conjunto passa a linha de chegada: «sem faltas, 32 segundos 45», «um derrube e uma recusa, 41 segundos 10», «eliminado». Podes corrigir com os botões. Tudo fica no teu telemóvel; toca num conjunto da lista para voltar a ele.", "Säg resultatet så fort ekipaget passerat mållinjen: ”felfritt, 32 sekunder 45”, ”ett nedslag och en vägran, 41 sekunder 10”, ”utesluten”. Du kan rätta med knapparna. Allt sparas på din telefon; tryck på ett ekipage i listan för att gå tillbaka.", "Говори результат, как только пара пересекла финиш: «чисто, 32 секунды 45», «один повал и закидка, 41 секунда 10», «исключён». Исправить можно кнопками. Всё хранится в телефоне; нажми на пару в списке, чтобы вернуться к ней.", "Podaj wynik, gdy tylko para przekroczy linię mety: „czysto, 32 sekundy 45”, „jedna zrzutka i odmowa, 41 sekund 10”, „wyeliminowany”. Możesz poprawić przyciskami. Wszystko zostaje w telefonie; dotknij pary na liście, by do niej wrócić.", "콤비가 결승선을 넘자마자 결과를 말해: “무감점, 32초 45”, “낙봉 1회와 거부 1회, 41초 10”, “실격”. 버튼으로 고칠 수 있어. 모든 건 휴대폰에 저장되고, 목록에서 콤비를 누르면 돌아갈 수 있어.", "به‌محض عبور زوج از خط پایان نتیجه را بگو: «بدون خطا، ۳۲ ثانیه ۴۵»، «یک مانع و یک امتناع، ۴۱ ثانیه ۱۰»، «حذف». با دکمه‌ها می‌توانی اصلاح کنی. همه‌چیز روی گوشی‌ات می‌ماند؛ روی یک زوج در فهرست بزن تا به آن برگردی."],
    "Le règlement": ["The rules", "El reglamento", "Il regolamento", "規程", "Das Reglement", "اللائحة", "规则", "Het reglement", "O regulamento", "Reglementet", "Правила", "Regulamin", "규정", "مقررات"],
    "Liens officiels FFE et mémo du jury": ["Official FFE links and jury memo", "Enlaces oficiales FFE y memo del jurado", "Link ufficiali FFE e promemoria della giuria", "FFE公式リンクと審判メモ", "Offizielle FFE-Links und Richter-Merkblatt", "روابط FFE الرسمية ومذكرة الحكام", "FFE官方链接和裁判备忘", "Officiële FFE-links en jurymemo", "Links oficiais FFE e memo do júri", "Officiella FFE-länkar och jurymemo", "Официальные ссылки FFE и памятка жюри", "Oficjalne linki FFE i notatka dla jury", "FFE 공식 링크와 심판 메모", "پیوندهای رسمی FFE و یادداشت داوری"],
    "Liens officiels FFE": ["Official FFE links", "Enlaces oficiales FFE", "Link ufficiali FFE", "FFE公式リンク", "Offizielle FFE-Links", "روابط FFE الرسمية", "FFE官方链接", "Officiële FFE-links", "Links oficiais FFE", "Officiella FFE-länkar", "Официальные ссылки FFE", "Oficjalne linki FFE", "FFE 공식 링크", "پیوندهای رسمی FFE"],
    "Dressage": ["Dressage", "Doma", "Dressage", "馬場馬術", "Dressur", "الترويض", "盛装舞步", "Dressuur", "Dressage", "Dressyr", "Выездка", "Ujeżdżenie", "마장마술", "درساژ"],
    "Concours complet": ["Eventing", "Concurso completo", "Concorso completo", "総合馬術", "Vielseitigkeit", "المسابقة الكاملة", "三项赛", "Eventing", "Concurso completo", "Fälttävlan", "Троеборье", "WKKW", "종합마술", "سه‌گانه"],
    "Saut d’obstacles": ["Show jumping", "Salto de obstáculos", "Salto ostacoli", "障害飛越", "Springreiten", "قفز الحواجز", "场地障碍", "Springen", "Saltos de obstáculos", "Hoppning", "Конкур", "Skoki przez przeszkody", "장애물 비월", "پرش با اسب"],
    "Un règlement par discipline, pour toutes les divisions": ["One rulebook per discipline, for all divisions", "Un reglamento por disciplina, para todas las divisiones", "Un regolamento per disciplina, per tutte le divisioni", "種目ごとに1つの規程、全ディビジョン共通", "Ein Reglement pro Disziplin, für alle Divisionen", "لائحة واحدة لكل تخصص ولجميع الفئات", "每个项目一套规则，适用于所有级别", "Eén reglement per discipline, voor alle divisies", "Um regulamento por disciplina, para todas as divisões", "Ett reglemente per gren, för alla divisioner", "Одни правила на дисциплину, для всех дивизионов", "Jeden regulamin na dyscyplinę, dla wszystkich dywizji", "종목마다 하나의 규정, 모든 디비전 공통", "یک مقررات برای هر رشته، برای همه بخش‌ها"],
    "Complet": ["Eventing", "Completo", "Completo", "総合", "Vielseitigkeit", "الكاملة", "三项赛", "Eventing", "Completo", "Fälttävlan", "Троеборье", "WKKW", "종합", "سه‌گانه"],
    "Règlement général (toutes disciplines)": ["General rules (all disciplines)", "Reglamento general (todas las disciplinas)", "Regolamento generale (tutte le discipline)", "一般規程（全種目）", "Allgemeines Reglement (alle Disziplinen)", "اللائحة العامة (جميع التخصصات)", "通用规则（所有项目）", "Algemeen reglement (alle disciplines)", "Regulamento geral (todas as disciplinas)", "Allmänt reglemente (alla grenar)", "Общие правила (все дисциплины)", "Regulamin ogólny (wszystkie dyscypliny)", "일반 규정(전 종목)", "مقررات عمومی (همه رشته‌ها)"],
    "Règlement CSO": ["Show jumping rules", "Reglamento de salto", "Regolamento salto ostacoli", "障害飛越規程", "Springreglement", "لائحة القفز", "障碍赛规则", "Springreglement", "Regulamento de saltos", "Hoppreglemente", "Правила конкура", "Regulamin skoków", "장애물 규정", "مقررات پرش"],
    "La FFE demande de se connecter avec son compte FFE pour l’ouvrir.": ["The FFE asks you to sign in with your FFE account to open it.", "La FFE pide iniciar sesión con tu cuenta FFE para abrirlo.", "La FFE chiede di accedere con il proprio account FFE per aprirlo.", "開くにはFFEアカウントでのログインが必要です。", "Die FFE verlangt zum Öffnen eine Anmeldung mit dem FFE-Konto.", "تطلب FFE تسجيل الدخول بحسابك في FFE لفتحه.", "FFE 要求用 FFE 账户登录才能打开。", "De FFE vraagt om in te loggen met je FFE-account om het te openen.", "A FFE pede para entrar com a conta FFE para o abrir.", "FFE kräver inloggning med ditt FFE-konto för att öppna den.", "FFE просит войти в аккаунт FFE, чтобы открыть его.", "FFE wymaga zalogowania się kontem FFE, aby go otworzyć.", "열려면 FFE 계정으로 로그인해야 해.", "FFE برای باز کردنش ورود با حساب FFE را می‌خواهد."],
    "Règlement Dressage": ["Dressage rules", "Reglamento de Doma", "Regolamento Dressage", "馬場馬術規程", "Dressurreglement", "لائحة الترويض", "盛装舞步规则", "Dressuurreglement", "Regulamento de Dressage", "Dressyrreglemente", "Правила выездки", "Regulamin ujeżdżenia", "마장마술 규정", "مقررات درساژ"],
    "Règlement Concours complet": ["Eventing rules", "Reglamento de Concurso completo", "Regolamento Concorso completo", "総合馬術規程", "Vielseitigkeitsreglement", "لائحة المسابقة الكاملة", "三项赛规则", "Eventingreglement", "Regulamento de Concurso completo", "Fälttävlansreglemente", "Правила троеборья", "Regulamin WKKW", "종합마술 규정", "مقررات سه‌گانه"],
    "Mémo du jury de CSO": ["Show jumping jury memo", "Memo del jurado de salto", "Promemoria della giuria di salto", "障害飛越審判メモ", "Merkblatt für Springrichter", "مذكرة حكام القفز", "障碍赛裁判备忘", "Memo voor de springjury", "Memo do júri de saltos", "Memo för hoppjuryn", "Памятка жюри конкура", "Notatka dla jury skoków", "장애물 심판 메모", "یادداشت داوری پرش"],
    "Articles de la version 2025-2026 du règlement CSO ; les pénalités sont les mêmes en 2026-2027. En cas de doute, c’est le règlement en vigueur qui fait foi.": ["Articles from the 2025-2026 show jumping rules; penalties are the same in 2026-2027. If in doubt, the rules in force prevail.", "Artículos de la versión 2025-2026 del reglamento de salto; las penalizaciones son las mismas en 2026-2027. En caso de duda, prevalece el reglamento vigente.", "Articoli della versione 2025-2026 del regolamento di salto; le penalità sono le stesse nel 2026-2027. In caso di dubbio fa fede il regolamento in vigore.", "条文番号は2025-2026年版の障害飛越規程。減点は2026-2027年も同じ。疑わしい場合は現行規程が優先。", "Artikel aus der Fassung 2025-2026 des Springreglements; die Strafen sind 2026-2027 gleich. Im Zweifel gilt das gültige Reglement.", "مواد نسخة 2025-2026 من لائحة القفز؛ العقوبات نفسها في 2026-2027. عند الشك تُعتمد اللائحة السارية.", "条款编号来自2025-2026版障碍赛规则；2026-2027年罚则相同。如有疑问，以现行规则为准。", "Artikelen uit de versie 2025-2026 van het springreglement; de strafpunten zijn in 2026-2027 gelijk. Bij twijfel geldt het geldende reglement.", "Artigos da versão 2025-2026 do regulamento de saltos; as penalizações são as mesmas em 2026-2027. Em caso de dúvida, prevalece o regulamento em vigor.", "Artiklar från 2025-2026 års hoppreglemente; straffen är desamma 2026-2027. Vid tvekan gäller gällande reglemente.", "Статьи из версии правил конкура 2025-2026; штрафы те же в 2026-2027. В случае сомнений действуют текущие правила.", "Artykuły z wersji 2025-2026 regulaminu skoków; kary są takie same w 2026-2027. W razie wątpliwości obowiązuje regulamin w mocy.", "조항 번호는 2025-2026 장애물 규정 기준이고 감점은 2026-2027도 같아. 애매하면 현행 규정이 우선이야.", "ماده‌ها از نسخه ۲۰۲۵-۲۰۲۶ مقررات پرش است؛ جریمه‌ها در ۲۰۲۶-۲۰۲۷ همان است. در صورت تردید، مقررات جاری ملاک است."],
    "Le temps": ["Time", "El tiempo", "Il tempo", "タイム", "Die Zeit", "الوقت", "时间", "De tijd", "O tempo", "Tiden", "Время", "Czas", "시간", "زمان"],
    "Temps accordé = distance ÷ vitesse × 60 (en secondes).": ["Time allowed = distance ÷ speed × 60 (in seconds).", "Tiempo concedido = distancia ÷ velocidad × 60 (en segundos).", "Tempo accordato = distanza ÷ velocità × 60 (in secondi).", "規定タイム＝距離÷速度×60（秒）。", "Erlaubte Zeit = Distanz ÷ Tempo × 60 (in Sekunden).", "الوقت المسموح = المسافة ÷ السرعة × 60 (بالثواني).", "规定时间 = 距离 ÷ 速度 × 60（秒）。", "Toegestane tijd = afstand ÷ snelheid × 60 (in seconden).", "Tempo concedido = distância ÷ velocidade × 60 (em segundos).", "Tillåten tid = distans ÷ hastighet × 60 (i sekunder).", "Норма времени = дистанция ÷ скорость × 60 (в секундах).", "Czas normowy = dystans ÷ tempo × 60 (w sekundach).", "제한 시간 = 거리 ÷ 속도 × 60(초).", "زمان مجاز = مسافت ÷ سرعت × ۶۰ (ثانیه)."],
    "Temps limite = le double du temps accordé. Dépassé : éliminé.": ["Time limit = twice the time allowed. Exceeded: eliminated.", "Tiempo límite = el doble del tiempo concedido. Superado: eliminado.", "Tempo limite = il doppio del tempo accordato. Superato: eliminato.", "制限タイム＝規定タイムの2倍。超過で失格。", "Höchstzeit = doppelte erlaubte Zeit. Überschritten: ausgeschieden.", "الوقت الأقصى = ضعف الوقت المسموح. تجاوزه: إقصاء.", "限制时间 = 规定时间的两倍。超过则淘汰。", "Maximale tijd = het dubbele van de toegestane tijd. Overschreden: uitgesloten.", "Tempo limite = o dobro do tempo concedido. Ultrapassado: eliminado.", "Maxtid = dubbla tillåtna tiden. Överskriden: utesluten.", "Предельное время = двойная норма. Превышено: исключение.", "Czas maksymalny = podwójny czas normowy. Przekroczony: eliminacja.", "최대 시간 = 제한 시간의 2배. 넘으면 실격.", "زمان حد = دو برابر زمان مجاز. اگر بگذرد: حذف."],
    "Barème C : pas de temps accordé, seulement un temps limite (3 min si le parcours fait 600 m ou plus, 2 min en dessous).": ["Table C: no time allowed, only a time limit (3 min if the course is 600 m or more, 2 min below).", "Baremo C: sin tiempo concedido, solo un tiempo límite (3 min si el recorrido mide 600 m o más, 2 min por debajo).", "Tabella C: nessun tempo accordato, solo un tempo limite (3 min se il percorso è di 600 m o più, 2 min sotto).", "C基準：規定タイムなし、制限タイムのみ（コース600m以上は3分、未満は2分）。", "Wertung C: keine erlaubte Zeit, nur eine Höchstzeit (3 Min. ab 600 m Parcourslänge, darunter 2 Min.).", "الجدول C: لا وقت مسموح، فقط وقت أقصى (3 دقائق إذا كان المسار 600 م أو أكثر، ودقيقتان دون ذلك).", "C表：无规定时间，只有限制时间（路线600米及以上为3分钟，以下为2分钟）。", "Tabel C: geen toegestane tijd, alleen een maximale tijd (3 min bij een parcours van 600 m of meer, 2 min daaronder).", "Tabela C: sem tempo concedido, só um tempo limite (3 min se o percurso tiver 600 m ou mais, 2 min abaixo).", "Bedömning C: ingen tillåten tid, bara en maxtid (3 min om banan är 600 m eller mer, 2 min under).", "Таблица C: нормы времени нет, только предельное (3 мин при маршруте от 600 м, 2 мин — меньше).", "Tabela C: brak czasu normowego, tylko czas maksymalny (3 min przy parkurze od 600 m, 2 min poniżej).", "C 기준: 제한 시간 없이 최대 시간만(코스 600m 이상 3분, 미만 2분).", "جدول C: زمان مجاز ندارد، فقط زمان حد (۳ دقیقه اگر مسیر ۶۰۰ متر یا بیشتر باشد، ۲ دقیقه کمتر از آن)."],
    "Les pénalités au barème A": ["Table A penalties", "Las penalizaciones del baremo A", "Le penalità della tabella A", "A基準の減点", "Strafen nach Wertung A", "عقوبات الجدول A", "A表罚则", "Strafpunten bij tabel A", "As penalizações da tabela A", "Straff enligt bedömning A", "Штрафы по таблице A", "Kary w tabeli A", "A 기준 감점", "جریمه‌های جدول A"],
    "Barre tombée ou faute à la rivière : 4 points.": ["Knock-down or water fault: 4 points.", "Derribo o falta en la ría: 4 puntos.", "Abbattimento o errore alla riviera: 4 punti.", "落下または水濠の過失：4点。", "Abwurf oder Fehler am Wassergraben: 4 Punkte.", "إسقاط أو خطأ عند حوض الماء: 4 نقاط.", "落杆或水障失误：4分。", "Afworp of fout bij de sloot: 4 punten.", "Derrube ou falta na ria: 4 pontos.", "Nedslag eller fel vid vattengraven: 4 poäng.", "Повал или ошибка на канаве: 4 очка.", "Zrzutka lub błąd na rowie z wodą: 4 pkt.", "낙봉 또는 물 장애물 과실: 4점.", "انداختن مانع یا خطا در جوی آب: ۴ امتیاز."],
    "1re et 2e désobéissance : 4 points chacune. 3e désobéissance : éliminé.": ["1st and 2nd disobedience: 4 points each. 3rd disobedience: eliminated.", "1.ª y 2.ª desobediencia: 4 puntos cada una. 3.ª desobediencia: eliminado.", "1ª e 2ª disobbedienza: 4 punti ciascuna. 3ª disobbedienza: eliminato.", "反抗1回目・2回目：各4点。3回目：失格。", "1. und 2. Ungehorsam: je 4 Punkte. 3. Ungehorsam: ausgeschieden.", "العصيان الأول والثاني: 4 نقاط لكل منهما. العصيان الثالث: إقصاء.", "第1、2次抗拒：各4分。第3次抗拒：淘汰。", "1e en 2e ongehoorzaamheid: elk 4 punten. 3e ongehoorzaamheid: uitgesloten.", "1.ª e 2.ª desobediência: 4 pontos cada. 3.ª desobediência: eliminado.", "1:a och 2:a olydnad: 4 poäng var. 3:e olydnaden: utesluten.", "1-е и 2-е неповиновение: по 4 очка. 3-е неповиновение: исключение.", "1. i 2. nieposłuszeństwo: po 4 pkt. 3. nieposłuszeństwo: eliminacja.", "1·2번째 반항: 각 4점. 3번째 반항: 실격.", "نافرمانی اول و دوم: هرکدام ۴ امتیاز. نافرمانی سوم: حذف."],
    "Désobéissance avec destruction : 4 points + 6 secondes ajoutées au temps.": ["Disobedience with knock-down: 4 points + 6 seconds added to the time.", "Desobediencia con derribo: 4 puntos + 6 segundos añadidos al tiempo.", "Disobbedienza con abbattimento: 4 punti + 6 secondi aggiunti al tempo.", "障害破壊を伴う反抗：4点＋タイムに6秒加算。", "Ungehorsam mit Zerstörung: 4 Punkte + 6 Sekunden Zeitzuschlag.", "عصيان مع إسقاط: 4 نقاط + 6 ثوانٍ تُضاف إلى الوقت.", "伴随破坏障碍的抗拒：4分＋计时加6秒。", "Ongehoorzaamheid met afbraak: 4 punten + 6 seconden bij de tijd.", "Desobediência com destruição: 4 pontos + 6 segundos somados ao tempo.", "Olydnad med nedrivning: 4 poäng + 6 sekunder läggs till tiden.", "Неповиновение с разрушением: 4 очка + 6 секунд к времени.", "Nieposłuszeństwo z rozbiciem: 4 pkt + 6 sekund do czasu.", "장애물 파손을 동반한 반항: 4점 + 시간 6초 추가.", "نافرمانی همراه با خراب کردن مانع: ۴ امتیاز + ۶ ثانیه به زمان."],
    "Chute du cheval ou du cavalier : éliminé.": ["Fall of horse or rider: eliminated.", "Caída del caballo o del jinete: eliminado.", "Caduta del cavallo o del cavaliere: eliminato.", "馬または騎手の落馬・転倒：失格。", "Sturz von Pferd oder Reiter: ausgeschieden.", "سقوط الحصان أو الفارس: إقصاء.", "马或骑手摔倒：淘汰。", "Val van paard of ruiter: uitgesloten.", "Queda do cavalo ou do cavaleiro: eliminado.", "Fall för häst eller ryttare: utesluten.", "Падение лошади или всадника: исключение.", "Upadek konia lub jeźdźca: eliminacja.", "말 또는 기수의 낙마·전도: 실격.", "سقوط اسب یا سوارکار: حذف."],
    "Temps accordé dépassé (parcours initial, 2e manche) : 1 point par tranche de 4 secondes entamée. Au barrage final : 1 point par seconde entamée.": ["Time allowed exceeded (initial round, 2nd round): 1 point for each started 4 seconds. In the final jump-off: 1 point per started second.", "Tiempo concedido superado (recorrido inicial, 2.ª manga): 1 punto por cada 4 segundos empezados. En el desempate final: 1 punto por segundo empezado.", "Tempo accordato superato (percorso iniziale, 2ª manche): 1 punto per ogni 4 secondi iniziati. Al barrage finale: 1 punto per secondo iniziato.", "規定タイム超過（第1走行・第2ラウンド）：4秒ごとに1点。最終ジャンプオフ：1秒ごとに1点。", "Erlaubte Zeit überschritten (Umlauf, 2. Umlauf): 1 Punkt je angefangene 4 Sekunden. Im Schlussstechen: 1 Punkt je angefangene Sekunde.", "تجاوز الوقت المسموح (الجولة الأولى، الجولة الثانية): نقطة لكل 4 ثوانٍ بدأت. في جولة الحسم النهائية: نقطة لكل ثانية بدأت.", "超出规定时间（初赛、第二轮）：每开始4秒罚1分。最终附加赛：每开始1秒罚1分。", "Toegestane tijd overschreden (eerste omloop, 2e omloop): 1 punt per begonnen 4 seconden. In de laatste barrage: 1 punt per begonnen seconde.", "Tempo concedido ultrapassado (percurso inicial, 2.ª mão): 1 ponto por cada 4 segundos começados. No desempate final: 1 ponto por segundo começado.", "Tillåten tid överskriden (grundomgång, 2:a omgång): 1 poäng per påbörjade 4 sekunder. I sista omhoppningen: 1 poäng per påbörjad sekund.", "Превышение нормы (основной маршрут, 2-й гит): 1 очко за каждые начатые 4 секунды. В финальной перепрыжке: 1 очко за каждую начатую секунду.", "Przekroczenie czasu normowego (przejazd podstawowy, 2. nawrót): 1 pkt za każde rozpoczęte 4 sekundy. W rozgrywce końcowej: 1 pkt za każdą rozpoczętą sekundę.", "제한 시간 초과(1라운드·2라운드): 4초마다 1점. 최종 점프오프: 1초마다 1점.", "تجاوز از زمان مجاز (دور اول، دور دوم): ۱ امتیاز برای هر ۴ ثانیه آغازشده. در جامپ‌آف نهایی: ۱ امتیاز برای هر ثانیه آغازشده."],
    "Erreur de parcours non rectifiée : éliminé.": ["Uncorrected error of course: eliminated.", "Error de recorrido no rectificado: eliminado.", "Errore di percorso non corretto: eliminato.", "訂正しないコース違反：失格。", "Nicht korrigierter Verreiter: ausgeschieden.", "خطأ في المسار دون تصحيح: إقصاء.", "未纠正的路线错误：淘汰。", "Niet hersteld verkeerd parcours: uitgesloten.", "Erro de percurso não corrigido: eliminado.", "Okorrigerad felridning: utesluten.", "Неисправленная ошибка маршрута: исключение.", "Nieskorygowany błąd trasy: eliminacja.", "바로잡지 않은 코스 오류: 실격.", "خطای مسیر اصلاح‌نشده: حذف."],
    "Le barème C": ["Table C", "El baremo C", "La tabella C", "C基準", "Wertung C", "الجدول C", "C表", "Tabel C", "A tabela C", "Bedömning C", "Таблица C", "Tabela C", "C 기준", "جدول C"],
    "Résultat en secondes = temps du parcours + 4 secondes par barre (3 secondes au barrage ou en 2e phase).": ["Result in seconds = round time + 4 seconds per knock-down (3 seconds in a jump-off or 2nd phase).", "Resultado en segundos = tiempo del recorrido + 4 segundos por derribo (3 segundos en desempate o 2.ª fase).", "Risultato in secondi = tempo del percorso + 4 secondi per abbattimento (3 secondi al barrage o in 2ª fase).", "結果（秒）＝走行タイム＋落下1回につき4秒（ジャンプオフ・第2フェーズは3秒）。", "Ergebnis in Sekunden = Rittzeit + 4 Sekunden pro Abwurf (3 Sekunden im Stechen oder in der 2. Phase).", "النتيجة بالثواني = وقت المسار + 4 ثوانٍ لكل إسقاط (3 ثوانٍ في جولة الحسم أو المرحلة الثانية).", "结果（秒）= 完成时间 + 每次落杆4秒（附加赛或第二阶段为3秒）。", "Resultaat in seconden = parcourstijd + 4 seconden per afworp (3 seconden in de barrage of 2e fase).", "Resultado em segundos = tempo do percurso + 4 segundos por derrube (3 segundos no desempate ou 2.ª fase).", "Resultat i sekunder = rundans tid + 4 sekunder per nedslag (3 sekunder i omhoppning eller 2:a fas).", "Результат в секундах = время маршрута + 4 секунды за повал (3 секунды в перепрыжке или 2-й фазе).", "Wynik w sekundach = czas przejazdu + 4 sekundy za zrzutkę (3 sekundy w rozgrywce lub 2. fazie).", "결과(초) = 주행 시간 + 낙봉 1회당 4초(점프오프·2단계는 3초).", "نتیجه به ثانیه = زمان مسیر + ۴ ثانیه برای هر مانع افتاده (۳ ثانیه در جامپ‌آف یا مرحله دوم)."],
    "Désobéissances : pas de pénalité, mais la 3e élimine. Désobéissance avec destruction : 6 secondes.": ["Disobediences: no penalty, but the 3rd eliminates. Disobedience with knock-down: 6 seconds.", "Desobediencias: sin penalización, pero la 3.ª elimina. Desobediencia con derribo: 6 segundos.", "Disobbedienze: nessuna penalità, ma la 3ª elimina. Disobbedienza con abbattimento: 6 secondi.", "反抗：減点なし、ただし3回目で失格。障害破壊を伴う反抗：6秒。", "Ungehorsam: keine Strafe, aber der 3. führt zum Ausschluss. Ungehorsam mit Zerstörung: 6 Sekunden.", "العصيانات: بلا عقوبة، لكن الثالث يُقصي. عصيان مع إسقاط: 6 ثوانٍ.", "抗拒：不罚分，但第3次淘汰。伴随破坏的抗拒：6秒。", "Ongehoorzaamheden: geen straf, maar de 3e sluit uit. Ongehoorzaamheid met afbraak: 6 seconden.", "Desobediências: sem penalização, mas a 3.ª elimina. Desobediência com destruição: 6 segundos.", "Olydnader: inget straff, men den 3:e utesluter. Olydnad med nedrivning: 6 sekunder.", "Неповиновения: без штрафа, но 3-е — исключение. Неповиновение с разрушением: 6 секунд.", "Nieposłuszeństwa: bez kary, ale 3. eliminuje. Nieposłuszeństwo z rozbiciem: 6 sekund.", "반항: 감점 없음, 단 3번째는 실격. 장애물 파손 반항: 6초.", "نافرمانی‌ها: بدون جریمه، اما سومی حذف می‌کند. نافرمانی با خراب کردن مانع: ۶ ثانیه."],
    "Au chrono : à points égaux, le plus rapide passe devant.": ["Against the clock: on equal points, the fastest goes ahead.", "Al cronómetro: a igualdad de puntos, el más rápido pasa delante.", "A tempo: a parità di punti passa avanti il più veloce.", "タイム計測：同点なら速い方が上位。", "Mit Zeit: bei Punktgleichheit liegt der Schnellere vorn.", "بالتوقيت: عند تساوي النقاط يتقدّم الأسرع.", "计时：同分时更快者在前。", "Op tijd: bij gelijke punten gaat de snelste voor.", "Ao cronómetro: com pontos iguais passa à frente o mais rápido.", "På tid: vid lika poäng går den snabbaste före.", "На время: при равных очках впереди самый быстрый.", "Na czas: przy równych punktach wyżej jest najszybszy.", "시간 측정: 동점이면 더 빠른 쪽이 앞서.", "با زمان: با امتیاز برابر، سریع‌تر جلوتر است."],
    "Sans chrono : à points égaux, les couples sont ex æquo. S’il y a un barrage prévu, il se court au chrono pour départager la 1re place.": ["Not against the clock: on equal points, pairs are tied. If a jump-off is planned, it is ridden against the clock to decide 1st place.", "Sin cronómetro: a igualdad de puntos, las parejas quedan ex aequo. Si hay desempate previsto, se corre al cronómetro para decidir el 1.er puesto.", "Senza tempo: a parità di punti i binomi sono ex aequo. Se è previsto un barrage, si corre a tempo per decidere il 1° posto.", "タイムなし：同点は同順位。ジャンプオフがある場合は1位決定のためタイム計測で行う。", "Ohne Zeit: bei Punktgleichheit sind die Paare gleichplatziert. Ist ein Stechen vorgesehen, wird es um Platz 1 mit Zeit geritten.", "بدون توقيت: عند تساوي النقاط يتعادل الثنائيون. إن كانت جولة حسم مقررة تُجرى بالتوقيت لحسم المركز الأول.", "不计时：同分组合并列。如设附加赛，则计时进行以决出第一名。", "Niet op tijd: bij gelijke punten zijn de combinaties ex aequo. Is er een barrage voorzien, dan wordt die op tijd gereden voor de 1e plaats.", "Sem cronómetro: com pontos iguais, os conjuntos ficam ex aequo. Se houver desempate previsto, corre-se ao cronómetro para decidir o 1.º lugar.", "Utan tid: vid lika poäng delar ekipagen placering. Är en omhoppning planerad rids den på tid om 1:a platsen.", "Без времени: при равных очках пары делят место. Если предусмотрена перепрыжка, её проходят на время за 1-е место.", "Bez czasu: przy równych punktach pary są ex aequo. Jeśli przewidziano rozgrywkę, odbywa się ona na czas o 1. miejsce.", "시간 미측정: 동점이면 공동 순위. 점프오프가 있으면 1위를 가리려고 시간 측정으로 해.", "بدون زمان: با امتیاز برابر، زوج‌ها هم‌رتبه‌اند. اگر جامپ‌آف پیش‌بینی شده باشد، برای رتبه اول با زمان برگزار می‌شود."],
    "Barème C : à temps égal pour la 1re place, ex æquo sauf barrage prévu.": ["Table C: on equal time for 1st place, tied unless a jump-off is planned.", "Baremo C: a igual tiempo por el 1.er puesto, ex aequo salvo desempate previsto.", "Tabella C: a parità di tempo per il 1° posto, ex aequo salvo barrage previsto.", "C基準：1位が同タイムなら、ジャンプオフがない限り同順位。", "Wertung C: bei gleicher Zeit um Platz 1 gleichplatziert, außer ein Stechen ist vorgesehen.", "الجدول C: عند تساوي الوقت على المركز الأول تعادل، ما لم تكن جولة حسم مقررة.", "C表：第一名时间相同则并列，除非设有附加赛。", "Tabel C: bij gelijke tijd voor de 1e plaats ex aequo, tenzij een barrage voorzien is.", "Tabela C: com tempo igual para o 1.º lugar, ex aequo salvo desempate previsto.", "Bedömning C: vid lika tid om 1:a platsen delad placering, om ingen omhoppning är planerad.", "Таблица C: при равном времени за 1-е место — дележ, если не предусмотрена перепрыжка.", "Tabela C: przy równym czasie o 1. miejsce ex aequo, chyba że przewidziano rozgrywkę.", "C 기준: 1위가 같은 시간이면 점프오프가 없는 한 공동 순위.", "جدول C: با زمان برابر برای رتبه اول، هم‌رتبه مگر جامپ‌آف پیش‌بینی شده باشد."],
    "Le barème Club": ["The Club table", "El baremo Club", "La tabella Club", "クラブ基準", "Die Club-Wertung", "جدول النادي", "俱乐部评分表", "De Club-tabel", "A tabela Club", "Klubbedömningen", "Таблица «Клуб»", "Tabela Club", "클럽 기준", "جدول باشگاهی"],
    "Temps = le double du temps prévu pour la distance. Obstacle franchi correctement : 2 points. Barre tombée, ou obstacle franchi après un refus : 1 point. Obstacle non sauté : 0.": ["Time = twice the time set for the distance. Obstacle cleared correctly: 2 points. Knock-down, or obstacle cleared after a refusal: 1 point. Obstacle not jumped: 0.", "Tiempo = el doble del previsto para la distancia. Obstáculo superado correctamente: 2 puntos. Derribo u obstáculo superado tras un rehúse: 1 punto. Obstáculo no saltado: 0.", "Tempo = il doppio di quello previsto per la distanza. Ostacolo superato correttamente: 2 punti. Abbattimento, o ostacolo superato dopo un rifiuto: 1 punto. Ostacolo non saltato: 0.", "タイム＝距離に対する規定の2倍。正しく飛越：2点。落下、または拒止後の飛越：1点。飛ばなかった障害：0点。", "Zeit = doppelte Zeit für die Distanz. Hindernis korrekt überwunden: 2 Punkte. Abwurf oder Hindernis nach Verweigerung: 1 Punkt. Hindernis nicht gesprungen: 0.", "الوقت = ضعف الوقت المقرر للمسافة. حاجز مُجتاز بشكل صحيح: نقطتان. إسقاط أو حاجز مُجتاز بعد رفض: نقطة. حاجز لم يُقفز: 0.", "时间 = 该距离规定时间的两倍。正确跳过障碍：2分。落杆或拒跳后跳过：1分。未跳障碍：0分。", "Tijd = het dubbele van de tijd voor de afstand. Hindernis correct genomen: 2 punten. Afworp of hindernis genomen na een weigering: 1 punt. Hindernis niet gesprongen: 0.", "Tempo = o dobro do previsto para a distância. Obstáculo transposto corretamente: 2 pontos. Derrube, ou obstáculo transposto após uma recusa: 1 ponto. Obstáculo não saltado: 0.", "Tid = dubbla tiden för distansen. Hinder rätt hoppat: 2 poäng. Nedslag, eller hinder hoppat efter vägran: 1 poäng. Hinder inte hoppat: 0.", "Время = двойная норма для дистанции. Препятствие пройдено правильно: 2 очка. Повал или препятствие после закидки: 1 очко. Не прыгнутое препятствие: 0.", "Czas = podwójny czas przewidziany na dystans. Przeszkoda pokonana poprawnie: 2 pkt. Zrzutka lub przeszkoda pokonana po odmowie: 1 pkt. Przeszkoda nieskoczona: 0.", "시간 = 거리에 대한 기준 시간의 2배. 정확히 넘은 장애물: 2점. 낙봉 또는 거부 후 넘은 장애물: 1점. 넘지 않은 장애물: 0점.", "زمان = دو برابر زمان پیش‌بینی‌شده برای مسافت. مانع درست پریده‌شده: ۲ امتیاز. مانع افتاده، یا مانع پریده‌شده پس از امتناع: ۱ امتیاز. مانع پریده‌نشده: ۰."],
    "Le plus de points gagne. Au chrono, à points égaux, le plus rapide passe devant.": ["The most points wins. Against the clock, on equal points the fastest goes ahead.", "Gana quien tiene más puntos. Al cronómetro, a igualdad de puntos, el más rápido pasa delante.", "Vince chi ha più punti. A tempo, a parità di punti passa avanti il più veloce.", "最多得点が勝ち。タイム計測なら同点時は速い方が上位。", "Die meisten Punkte gewinnen. Mit Zeit liegt bei Punktgleichheit der Schnellere vorn.", "الأكثر نقاطاً يفوز. بالتوقيت، عند تساوي النقاط يتقدّم الأسرع.", "得分最多者胜。计时时，同分则更快者在前。", "De meeste punten winnen. Op tijd gaat bij gelijke punten de snelste voor.", "Ganha quem tem mais pontos. Ao cronómetro, com pontos iguais passa à frente o mais rápido.", "Flest poäng vinner. På tid går den snabbaste före vid lika poäng.", "Побеждает набравший больше очков. На время при равных очках впереди самый быстрый.", "Wygrywa najwięcej punktów. Na czas przy równych punktach wyżej jest najszybszy.", "점수가 가장 많은 쪽이 이겨. 시간 측정이면 동점일 때 더 빠른 쪽이 앞서.", "بیشترین امتیاز برنده است. با زمان، با امتیاز برابر سریع‌تر جلوتر است."],
    "Mémo du jury de dressage": ["Dressage jury memo", "Memo del jurado de doma", "Promemoria della giuria di dressage", "馬場馬術審判メモ", "Merkblatt für Dressurrichter", "مذكرة حكام الترويض", "盛装舞步裁判备忘", "Memo voor de dressuurjury", "Memo do júri de dressage", "Memo för dressyrdomare", "Памятка судей выездки", "Notatka dla sędziów ujeżdżenia", "마장마술 심판 메모", "یادداشت داوری درساژ"],
    "Règlement Dressage applicable au 1er septembre 2026. En cas de doute, c’est le règlement en vigueur qui fait foi.": ["Dressage rules applicable from 1 September 2026. If in doubt, the rules in force prevail.", "Reglamento de Doma aplicable desde el 1 de septiembre de 2026. En caso de duda, prevalece el reglamento vigente.", "Regolamento Dressage in vigore dal 1° settembre 2026. In caso di dubbio fa fede il regolamento in vigore.", "2026年9月1日適用の馬場馬術規程。疑わしい場合は現行規程が優先。", "Dressurreglement gültig ab 1. September 2026. Im Zweifel gilt das gültige Reglement.", "لائحة الترويض السارية منذ 1 سبتمبر 2026. عند الشك تُعتمد اللائحة السارية.", "2026年9月1日起适用的盛装舞步规则。如有疑问，以现行规则为准。", "Dressuurreglement van toepassing vanaf 1 september 2026. Bij twijfel geldt het geldende reglement.", "Regulamento de Dressage aplicável a partir de 1 de setembro de 2026. Em caso de dúvida, prevalece o regulamento em vigor.", "Dressyrreglemente som gäller från 1 september 2026. Vid tvekan gäller gällande reglemente.", "Правила выездки, действующие с 1 сентября 2026 г. В случае сомнений действуют текущие правила.", "Regulamin ujeżdżenia obowiązujący od 1 września 2026. W razie wątpliwości obowiązuje regulamin w mocy.", "2026년 9월 1일부터 적용되는 마장마술 규정. 애매하면 현행 규정이 우선이야.", "مقررات درساژ از ۱ سپتامبر ۲۰۲۶. در صورت تردید، مقررات جاری ملاک است."],
    "La note": ["The score", "La nota", "Il voto", "得点", "Die Note", "الدرجة", "得分", "Het cijfer", "A nota", "Betyget", "Оценка", "Ocena", "점수", "نمره"],
    "Chaque juge additionne ses notes multipliées par leurs coefficients, retire les pénalités en points, convertit en pourcentage, puis retire les pénalités en pourcentage.": ["Each judge adds up their marks multiplied by the coefficients, deducts point penalties, converts to a percentage, then deducts percentage penalties.", "Cada juez suma sus notas multiplicadas por los coeficientes, resta las penalizaciones en puntos, convierte a porcentaje y luego resta las penalizaciones en porcentaje.", "Ogni giudice somma i voti moltiplicati per i coefficienti, toglie le penalità in punti, converte in percentuale, poi toglie le penalità in percentuale.", "各審査員は係数を掛けた点を合計し、点の減点を引き、％に換算してから％の減点を引く。", "Jeder Richter addiert seine Noten mal Koeffizient, zieht Punktstrafen ab, rechnet in Prozent um und zieht dann Prozentstrafen ab.", "يجمع كل حكم درجاته مضروبة في معاملاتها، ويطرح عقوبات النقاط، ويحوّلها إلى نسبة مئوية، ثم يطرح العقوبات بالنسبة المئوية.", "每位裁判把分数乘以系数后相加，扣除分值罚则，换算为百分比，再扣除百分比罚则。", "Elke jurylid telt zijn cijfers maal de coëfficiënten op, trekt strafpunten af, rekent om naar een percentage en trekt dan procentstraffen af.", "Cada juiz soma as notas multiplicadas pelos coeficientes, retira as penalizações em pontos, converte em percentagem e depois retira as penalizações em percentagem.", "Varje domare summerar betygen gånger koefficienterna, drar av poängavdrag, räknar om till procent och drar sedan av procentavdrag.", "Каждый судья суммирует оценки с коэффициентами, вычитает штрафы в баллах, переводит в проценты, затем вычитает штрафы в процентах.", "Każdy sędzia sumuje noty pomnożone przez współczynniki, odejmuje kary punktowe, przelicza na procent, a potem odejmuje kary procentowe.", "각 심사위원은 계수를 곱한 점수를 더하고, 점수 감점을 빼고, 퍼센트로 바꾼 뒤 퍼센트 감점을 빼.", "هر داور نمره‌ها را ضرب در ضریب جمع می‌کند، جریمه‌های امتیازی را کم می‌کند، به درصد تبدیل می‌کند و بعد جریمه‌های درصدی را کم می‌کند."],
    "Plusieurs juges : le résultat est la moyenne des pourcentages de chaque juge.": ["Several judges: the result is the average of each judge’s percentage.", "Varios jueces: el resultado es la media de los porcentajes de cada juez.", "Più giudici: il risultato è la media delle percentuali di ciascun giudice.", "審査員が複数の場合：各審査員の％の平均が結果。", "Mehrere Richter: Ergebnis ist der Durchschnitt der Prozentwerte jedes Richters.", "عدة حكام: النتيجة هي متوسط النسب المئوية لكل حكم.", "多名裁判：结果为各裁判百分比的平均值。", "Meerdere juryleden: het resultaat is het gemiddelde van de percentages van elk jurylid.", "Vários juízes: o resultado é a média das percentagens de cada juiz.", "Flera domare: resultatet är medelvärdet av varje domares procent.", "Несколько судей: результат — среднее процентов каждого судьи.", "Kilku sędziów: wynik to średnia procentów każdego sędziego.", "심사위원이 여럿이면 각 심사위원 퍼센트의 평균이 결과야.", "چند داور: نتیجه میانگین درصد هر داور است."],
    "Les notes vont de 0 à 10, au demi-point.": ["Marks go from 0 to 10, in half points.", "Las notas van de 0 a 10, por medios puntos.", "I voti vanno da 0 a 10, a mezzi punti.", "得点は0〜10、0.5点刻み。", "Die Noten gehen von 0 bis 10, in halben Punkten.", "الدرجات من 0 إلى 10 بأنصاف النقاط.", "分数为0至10分，以0.5分为单位。", "De cijfers gaan van 0 tot 10, per halve punt.", "As notas vão de 0 a 10, a meio ponto.", "Betygen går från 0 till 10, i halva poäng.", "Оценки от 0 до 10, с шагом 0,5.", "Noty od 0 do 10, co pół punktu.", "점수는 0~10점, 0.5점 단위야.", "نمره‌ها از ۰ تا ۱۰، با نیم‌امتیاز."],
    "Les erreurs": ["Errors", "Los errores", "Gli errori", "エラー", "Die Fehler", "الأخطاء", "错误", "De fouten", "Os erros", "Felen", "Ошибки", "Błędy", "오류", "خطاها"],
    "Erreur de tracé : 1re = −1 %, 2e = −1 %, 3e = éliminé.": ["Error of course: 1st = −1%, 2nd = −1%, 3rd = eliminated.", "Error de recorrido: 1.º = −1 %, 2.º = −1 %, 3.º = eliminado.", "Errore di percorso: 1° = −1 %, 2° = −1 %, 3° = eliminato.", "経路違反：1回目−1％、2回目−1％、3回目失格。", "Verreiten: 1. = −1 %, 2. = −1 %, 3. = ausgeschieden.", "خطأ المسار: الأول −1٪، الثاني −1٪، الثالث إقصاء.", "路线错误：第1次−1%，第2次−1%，第3次淘汰。", "Verkeerd gereden: 1e = −1 %, 2e = −1 %, 3e = uitgesloten.", "Erro de percurso: 1.º = −1 %, 2.º = −1 %, 3.º = eliminado.", "Felridning: 1:a = −1 %, 2:a = −1 %, 3:e = utesluten.", "Ошибка схемы: 1-я = −1 %, 2-я = −1 %, 3-я = исключение.", "Błąd trasy: 1. = −1%, 2. = −1%, 3. = eliminacja.", "경로 오류: 1회 −1%, 2회 −1%, 3회 실격.", "خطای مسیر: اول −۱٪، دوم −۱٪، سوم حذف."],
    "Erreur d’exécution : −2 points.": ["Error of execution: −2 points.", "Error de ejecución: −2 puntos.", "Errore di esecuzione: −2 punti.", "実施ミス：−2点。", "Ausführungsfehler: −2 Punkte.", "خطأ التنفيذ: −2 نقطة.", "执行错误：−2分。", "Uitvoeringsfout: −2 punten.", "Erro de execução: −2 pontos.", "Utförandefel: −2 poäng.", "Ошибка исполнения: −2 балла.", "Błąd wykonania: −2 pkt.", "실행 오류: −2점.", "خطای اجرا: −۲ امتیاز."],
    "Entrée en piste plus de 45 secondes après la cloche, ou avant la cloche : −2 points. Le juge en C sonne la cloche.": ["Entering the arena more than 45 seconds after the bell, or before the bell: −2 points. The judge at C rings the bell.", "Entrar en pista más de 45 segundos después de la campana, o antes: −2 puntos. El juez en C toca la campana.", "Entrata in campo oltre 45 secondi dopo la campana, o prima: −2 punti. Il giudice in C suona la campana.", "ベルから45秒を超えて、またはベル前に入場：−2点。ベルはCの審査員が鳴らす。", "Einritt mehr als 45 Sekunden nach der Glocke oder vor der Glocke: −2 Punkte. Der Richter bei C läutet.", "الدخول إلى الحلبة بعد أكثر من 45 ثانية من الجرس أو قبله: −2 نقطة. حكم C يقرع الجرس.", "铃响后超过45秒或铃响前入场：−2分。由C位裁判鸣铃。", "Binnenkomen meer dan 45 seconden na de bel, of vóór de bel: −2 punten. Het jurylid bij C luidt de bel.", "Entrar em pista mais de 45 segundos depois da campainha, ou antes: −2 pontos. O juiz em C toca a campainha.", "Inridning mer än 45 sekunder efter klockan, eller före: −2 poäng. Domaren vid C ringer.", "Въезд позже 45 секунд после колокола или до него: −2 балла. Колокол даёт судья в C.", "Wjazd ponad 45 sekund po dzwonku lub przed nim: −2 pkt. Dzwoni sędzia w C.", "벨 후 45초가 지나 입장하거나 벨 전에 입장: −2점. 벨은 C 심사위원이 울려.", "ورود بیش از ۴۵ ثانیه بعد از زنگ، یا قبل از زنگ: −۲ امتیاز. داور C زنگ را می‌زند."],
    "Seules les reprises en musique (Libre, Pas de deux, Carrousel) sont chronométrées.": ["Only tests to music (Freestyle, Pas de deux, Quadrille) are timed.", "Solo se cronometran las reprises con música (Libre, Pas de deux, Carrusel).", "Solo le riprese in musica (Libera, Pas de deux, Carosello) sono cronometrate.", "計時されるのは音楽付き経路（自由演技、パ・ド・ドゥ、カドリーユ）のみ。", "Nur Aufgaben mit Musik (Kür, Pas de deux, Quadrille) werden gestoppt.", "لا يُوقَّت إلا الاختبارات مع الموسيقى (الحر، الثنائي، الكاروسيل).", "只有配乐测试（自由演绎、双人舞、团体）计时。", "Alleen proeven op muziek (Kür, Pas de deux, Quadrille) worden getimed.", "Só as reprises com música (Livre, Pas de deux, Carrossel) são cronometradas.", "Bara program till musik (Kür, Pas de deux, Kadrilj) tidtas.", "По времени судятся только тесты под музыку (произвольная, па-де-де, карусель).", "Mierzone są tylko programy z muzyką (dowolny, pas de deux, kadryl).", "음악 과제(자유연기, 파드되, 카루셀)만 시간을 재.", "فقط آزمون‌های با موسیقی (آزاد، پادودو، کاروسل) زمان‌گیری می‌شوند."],
    "Les égalités": ["Ties", "Los empates", "Le parità", "同点", "Gleichstände", "التعادلات", "同分", "Gelijke standen", "Os empates", "Lika resultat", "Равенство", "Remisy", "동점", "تساوی‌ها"],
    "Pour les trois premières places, à pourcentage égal, les notes d’ensemble les plus élevées décident. En Libre : la note artistique.": ["For the top three places, on equal percentage, the highest collective marks decide. In a Freestyle: the artistic mark.", "Para los tres primeros puestos, a igual porcentaje, deciden las notas de conjunto más altas. En Libre: la nota artística.", "Per i primi tre posti, a parità di percentuale, decidono i voti d’insieme più alti. Nella Libera: il voto artistico.", "上位3位で％が同じ場合、総合点の高い方が上位。自由演技では芸術点。", "Für die ersten drei Plätze entscheiden bei gleichem Prozentwert die höheren Gesamtnoten. In der Kür: die künstlerische Note.", "في المراكز الثلاثة الأولى، عند تساوي النسبة تحسم الدرجات العامة الأعلى. في الحر: الدرجة الفنية.", "前三名百分比相同时，综合分高者胜。自由演绎：艺术分。", "Voor de eerste drie plaatsen beslissen bij gelijk percentage de hoogste algemene punten. In de Kür: het artistieke cijfer.", "Para os três primeiros lugares, com percentagem igual, decidem as notas de conjunto mais altas. Na Livre: a nota artística.", "För de tre första platserna avgör de högsta helhetsbetygen vid lika procent. I kür: det konstnärliga betyget.", "Для первых трёх мест при равном проценте решают более высокие общие оценки. В произвольной — артистическая оценка.", "Na trzech pierwszych miejscach przy równym procencie decydują wyższe noty ogólne. W programie dowolnym: nota artystyczna.", "상위 3위에서 퍼센트가 같으면 종합 점수가 높은 쪽이 앞서. 자유연기는 예술 점수.", "برای سه رتبه اول، با درصد برابر، نمره‌های کلی بالاتر تعیین می‌کنند. در آزاد: نمره هنری."],
    "Pour les places suivantes : ex æquo.": ["For the following places: tied.", "Para los puestos siguientes: ex aequo.", "Per i posti successivi: ex aequo.", "それ以降は同順位。", "Für die folgenden Plätze: gleichplatziert.", "للمراكز التالية: تعادل.", "之后的名次：并列。", "Voor de volgende plaatsen: ex aequo.", "Para os lugares seguintes: ex aequo.", "För följande platser: delad placering.", "Для следующих мест — дележ.", "Dla kolejnych miejsc: ex aequo.", "그다음 순위는 공동 순위.", "برای رتبه‌های بعدی: هم‌رتبه."],
    "En direct : l’écurie voit le classement sur son téléphone.": ["Live: the stable sees the ranking on their phones.", "En directo: la cuadra ve la clasificación en su teléfono.", "In diretta: la scuderia vede la classifica sul telefono.", "ライブ：厩舎のみんながスマホで順位を見られます。", "Live: der Stall sieht die Rangliste auf dem Handy.", "مباشر: يرى الإسطبل الترتيب على هواتفهم.", "直播中：马房成员可在手机上看到排名。", "Live: de stal ziet het klassement op de telefoon.", "Em direto: a cavalariça vê a classificação no telemóvel.", "Live: stallet ser placeringen i telefonen.", "Онлайн: конюшня видит классификацию в телефоне.", "Na żywo: stajnia widzi klasyfikację w telefonie.", "실시간: 마구간 사람들이 휴대폰으로 순위를 봐.", "زنده: اصطبل رده‌بندی را روی گوشی می‌بیند."],
    "Le direct ne passe pas (réseau ?) : le passage est gardé sur ce téléphone.": ["The live feed isn’t getting through (network?): the round is kept on this phone.", "El directo no pasa (¿red?): el recorrido se guarda en este teléfono.", "La diretta non passa (rete?): il percorso resta su questo telefono.", "ライブが送信できません（通信？）：この走行はこのスマホに保存されています。", "Live kommt nicht durch (Netz?): der Ritt bleibt auf diesem Handy gespeichert.", "البث المباشر لا يصل (الشبكة؟): تُحفظ الجولة على هذا الهاتف.", "直播未送达（网络？）：本轮成绩保存在此手机上。", "Live komt niet door (netwerk?): de omloop blijft op deze telefoon bewaard.", "O direto não passa (rede?): o percurso fica guardado neste telemóvel.", "Livesändningen går inte fram (nätet?): rundan sparas på den här telefonen.", "Онлайн не проходит (сеть?): маршрут сохранён на этом телефоне.", "Transmisja nie dochodzi (sieć?): przejazd zostaje w tym telefonie.", "실시간 전송이 안 돼(네트워크?): 이 주행은 이 휴대폰에 저장돼 있어.", "پخش زنده نمی‌رسد (شبکه؟): این دور روی همین گوشی نگه داشته شد."],
    "En direct": ["Live", "En directo", "In diretta", "ライブ", "Live", "مباشر", "直播", "Live", "Em direto", "Live", "Онлайн", "Na żywo", "실시간", "زنده"],
    "Pas encore de passage : le classement apparaît dès que le jury valide le premier couple.": ["No round yet: the ranking appears as soon as the jury confirms the first pair.", "Aún no hay recorridos: la clasificación aparece en cuanto el jurado valida la primera pareja.", "Nessun percorso ancora: la classifica appare appena la giuria conferma il primo binomio.", "まだ走行はありません：審判が最初のペアを確定すると順位が表示されます。", "Noch kein Ritt: die Rangliste erscheint, sobald die Jury das erste Paar bestätigt.", "لا جولة بعد: يظهر الترتيب بمجرد أن تؤكد اللجنة أول ثنائي.", "尚无成绩：裁判确认第一组后即显示排名。", "Nog geen omloop: het klassement verschijnt zodra de jury de eerste combinatie bevestigt.", "Ainda sem percursos: a classificação aparece assim que o júri valida o primeiro conjunto.", "Ingen runda än: placeringen visas så fort juryn bekräftar första ekipaget.", "Ещё нет маршрутов: классификация появится, как только жюри подтвердит первую пару.", "Jeszcze brak przejazdów: klasyfikacja pojawi się, gdy jury zatwierdzi pierwszą parę.", "아직 주행이 없어: 심판이 첫 콤비를 확정하면 순위가 나와.", "هنوز دوری نیست: رده‌بندی به‌محض تأیید اولین زوج توسط داور ظاهر می‌شود."],
    "dernier passage": ["latest round", "último recorrido", "ultimo percorso", "最新の走行", "letzter Ritt", "آخر جولة", "最新一轮", "laatste omloop", "último percurso", "senaste rundan", "последний маршрут", "ostatni przejazd", "최근 주행", "آخرین دور"],
    "Mis à jour toutes les 10 secondes. Classement provisoire : le résultat officiel est celui que l’équipe publie.": ["Updated every 10 seconds. Provisional ranking: the official result is the one the team publishes.", "Se actualiza cada 10 segundos. Clasificación provisional: el resultado oficial es el que publica el equipo.", "Aggiornata ogni 10 secondi. Classifica provvisoria: il risultato ufficiale è quello pubblicato dalla squadra.", "10秒ごとに更新。暫定順位です：正式結果はチームが公開するものです。", "Alle 10 Sekunden aktualisiert. Vorläufige Rangliste: offiziell ist das Ergebnis, das das Team veröffentlicht.", "يُحدَّث كل 10 ثوانٍ. ترتيب مؤقت: النتيجة الرسمية هي التي ينشرها الفريق.", "每10秒更新。暂定排名：以团队发布的成绩为准。", "Elke 10 seconden bijgewerkt. Voorlopig klassement: de officiële uitslag is die het team publiceert.", "Atualizada a cada 10 segundos. Classificação provisória: o resultado oficial é o que a equipa publica.", "Uppdateras var 10:e sekund. Preliminär placering: det officiella resultatet är det laget publicerar.", "Обновляется каждые 10 секунд. Предварительная классификация: официален результат, опубликованный командой.", "Aktualizacja co 10 sekund. Klasyfikacja wstępna: oficjalny jest wynik opublikowany przez zespół.", "10초마다 갱신돼. 임시 순위야: 공식 결과는 팀이 게시한 거야.", "هر ۱۰ ثانیه به‌روز می‌شود. رده‌بندی موقت: نتیجه رسمی همان است که تیم منتشر می‌کند."]
  };
  function T(fr) { try { var lg = window.__hypeLangue || "fr"; var t = TXT[fr]; var L = ["en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko", "fa"]; var i = L.indexOf(lg); return (t && i >= 0 && t[i]) || fr; } catch (e) { return fr; } }

  function css() {
    if (document.getElementById("hype-juge-css")) return;
    var s = document.createElement("style"); s.id = "hype-juge-css";
    s.textContent = [
      ".hj{min-height:100vh;background:#070A08;color:#F3EEE4;font-family:Montserrat,system-ui,sans-serif;padding-bottom:40px}",
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
      /* 14/11 10h26 (Blandine : « ton protocole, il est toujours illisible ») : tous les chiffres (notes, totaux, places,
         numéros de figure) en Montserrat droit à chasse fixe — les chiffres Cormorant / Cinzel (le 1 ressemble à un I) gênaient */
      ".hj-note,.hj-li .v,.hj-total b,.hj-pod em,.hj-cpt-b b,.hj-li .n,.hj-rang{font-family:Montserrat,system-ui,sans-serif!important;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0}",
      ".hj-note{font-weight:500;font-size:38px}.hj-li .v{font-weight:600;font-size:19px}.hj-total b{font-weight:500;font-size:30px}.hj-pod em{font-weight:600;font-size:20px!important}.hj-cpt-b b{font-weight:500;font-size:26px}",
      ".hj-li .n{font-weight:500;font-size:14px;color:#ECE6DA}.hj-rang{font-weight:600;font-size:15px}",
      /* en-tête façon Vidéothèque */
      ".hj-hv{position:relative;padding-top:calc(env(safe-area-inset-top) + 54px);max-width:1240px;margin:0 auto}",
      ".hj-hv .hj-ret{top:calc(env(safe-area-inset-top) + 12px)}",
      ".hj-cb{position:absolute;left:0;right:0;width:100%;height:70px;pointer-events:none;z-index:2}",
      ".hj-cb.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}",
      ".hj-cb.c2{position:relative;display:block;height:64px;margin-top:-58px}",
      "[dir=rtl] .hj-cb{transform:scaleX(-1)}",
      ".hj-hv-ph{position:relative;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 78%,transparent 100%),linear-gradient(90deg,transparent 0,#000 10%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 78%,transparent 100%),linear-gradient(90deg,transparent 0,#000 10%,#000 100%);mask-composite:intersect}",
      ".hj-hv-ph img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain}",
      ".hj-tt{text-align:end;margin-top:-10px;position:relative;z-index:3}",
      ".hj-tt .hj-k{margin-bottom:6px}",
      ".hj-tt h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(40px,11vw,60px);line-height:1.02;margin:0;color:#F3EEE4}",
      ".hj-tt-s{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:20px;line-height:1.35;margin:10px 0 0;color:#F3EEE4;opacity:.92}",
      ".hj-tt-s .hj-sous{font-family:inherit;font-size:inherit;color:inherit}.hj-tt-s .hj-sous b{font-weight:600}",
      /* cartes comme la Vidéothèque (noir graphite, dégradé, ombre) */
      ".hj-live,.hj-encart,.hj-total,.hj-cp,.hj-pod,.hj-cpt,.hj-res{background:linear-gradient(180deg,rgba(26,27,27,.97),rgba(17,18,18,.98));border-color:rgba(243,238,228,.09);box-shadow:0 14px 30px -18px rgba(0,0,0,.95)}",
      ".hj-h2{font-weight:500;font-size:clamp(28px,7.4vw,34px)}",
      /* 14/11 10h35 (Blandine : « ton protocole, il est toujours illisible ») : tous les chiffres (notes, totaux, places,
         numéros de figure) en Montserrat, chiffres droits et de même largeur — le « 1 » de Cormorant ressemblait à un « I » */
      ".hj-note,.hj-li .v,.hj-li .n,.hj-total b,.hj-pod em,.hj-cpt-b b,.hj-rang{font-family:Montserrat,system-ui,sans-serif!important;font-variant-numeric:lining-nums tabular-nums;letter-spacing:0}",
      ".hj-note{font-size:38px!important;font-weight:600!important}.hj-li .v{font-size:19px!important;font-weight:600!important}.hj-li .n{font-size:14px!important;font-weight:500}",
      ".hj-total b{font-size:28px!important;font-weight:600!important}.hj-pod em{font-size:21px!important;font-weight:600!important}.hj-cpt-b b{font-size:24px!important;font-weight:600!important}.hj-rang{font-size:14px!important;font-weight:600}",
      /* jury CSO : compteurs barres / désobéissances */
      ".hj-cpts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}",
      ".hj-cpt{border:1px solid rgba(243,238,228,.12);border-radius:16px;padding:10px 12px;background:#000}",
      ".hj-cpt-b{display:flex;align-items:center;justify-content:space-between;margin-top:8px}.hj-cpt-b b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:30px}.hj-cpt-b .hj-pill{width:44px;padding:0;font-size:20px}"      ,
      /* 14/11 — feuille de jugement en protocole (maquette validée) : noir et ivoire, chiffres Montserrat à chasse fixe */
      ".hp-page{padding-bottom:calc(150px + env(safe-area-inset-bottom))}",
      ".hp-num{font-family:Montserrat,system-ui,sans-serif!important;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0}",
      ".hp-id{margin-top:18px;display:flex;flex-direction:column;gap:12px}",
      ".hp-id-g{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px}",
      ".hp-id-g span{display:block;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:" + IV2 + "}",
      ".hp-id-g b{display:block;font-weight:600;font-size:17px;line-height:1.3;color:#F3EEE4;margin-top:2px}",
      ".hp-id-b{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}",
      ".hp-etat{font-size:14px;color:#F3EEE4;border:1px solid rgba(243,238,228,.45);border-radius:999px;padding:5px 12px}",
      ".hp-etat:before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:" + ORT + ";margin-right:8px;vertical-align:1px}",
      ".hp-etat.ok:before{background:#96CDAA}",
      ".hp-prog{font-size:14px;color:" + IV2 + "}.hp-prog b{color:#F3EEE4;font-weight:600}",
      ".hp-tab{margin-top:18px;border:1px solid rgba(243,238,228,.16);border-radius:16px;overflow:hidden;background:linear-gradient(180deg,rgba(22,23,23,.97),rgba(14,15,15,.98))}",
      ".hp-r{display:grid;grid-template-columns:30px minmax(0,1fr) 58px 34px;column-gap:8px;align-items:center;padding:11px 10px;border-top:1px solid rgba(243,238,228,.08)}",
      ".hp-r.tap{cursor:pointer}",
      ".hp-th{border-top:none;background:rgba(243,238,228,.04);padding:10px}",
      ".hp-th span{font-size:13px;font-weight:600;color:#F3EEE4;letter-spacing:.02em}",
      ".hp-r .n{font-size:15px;font-weight:500;color:#ECE6DA;text-align:center}",
      ".hp-r .f{font-size:15px;line-height:1.42;color:#F3EEE4;overflow-wrap:anywhere}",
      ".hp-r .v{text-align:center}.hp-r .c{text-align:center;font-size:15px;color:#ECE6DA}",
      ".hp-th .v,.hp-th .c{text-align:center}",
      ".hp-r .rq{display:none}",
      ".rq-m{display:block;margin-top:5px;font-size:14px;line-height:1.45;color:" + IV2 + "}.rq-m.vide{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:16px;color:rgba(236,230,218,.7)}",
      ".hp-nb{display:inline-flex;align-items:center;justify-content:center;min-width:46px;height:34px;padding:0 4px;box-sizing:border-box;border-radius:9px;border:1px solid rgba(243,238,228,.42);font-size:17px;font-weight:600;color:#F3EEE4}",
      ".hp-nb.vide{border-color:transparent;color:rgba(236,230,218,.55);font-weight:400}",
      ".hp-li.cur{background:rgba(243,238,228,.075);box-shadow:inset 3px 0 0 #F3EEE4}",
      ".hp-li.cur .hp-nb.vide{border:1px dashed rgba(243,238,228,.5);color:#F3EEE4}",
      ".hp-ens{padding:12px 12px 10px;border-top:1px solid rgba(243,238,228,.2);font-family:'Cinzel',Georgia,serif;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:" + ORT + ";background:rgba(243,238,228,.03)}",
      ".hp-ed{padding:4px 10px 14px 12px}",".hp-ed .hj-pills{gap:5px!important}.hp-ed .hj-pill.hp-num{padding:0;font-size:15px;min-height:42px}",
      ".hp-ed-l{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:" + IV2 + ";margin-top:12px}",
      ".hp-ed-row{display:flex;align-items:center;justify-content:space-between;margin-top:12px}",
      ".hp-ta{display:block;width:100%;box-sizing:border-box;margin-top:6px;min-height:64px;background:#000;border:1px solid rgba(243,238,228,.2);border-radius:12px;color:#F3EEE4;font:inherit;font-size:16px;line-height:1.5;padding:10px 12px;resize:vertical}",
      ".hp-lien{margin-top:10px;background:none;border:none;padding:6px 0;color:" + IV2 + ";font:inherit;font-size:14px;text-decoration:underline}",
      ".hp-recap{margin-top:22px;border:1px solid rgba(243,238,228,.16);border-radius:18px;padding:16px;background:linear-gradient(180deg,rgba(26,27,27,.97),rgba(17,18,18,.98))}",
      ".hp-recap-t{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:24px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}",
      ".hp-prov{font-family:Montserrat,sans-serif;font-size:13px;font-weight:500;color:" + ORT + ";border:1px solid rgba(232,203,148,.5);border-radius:999px;padding:3px 10px}",
      ".hp-recap-g{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}",
      ".hp-recap-g span,.hp-recap-l span{display:block;font-size:14px;color:" + IV2 + "}",
      ".hp-recap-g b{display:block;font-size:24px;font-weight:600;margin-top:4px;color:#F3EEE4}",
      ".hp-recap-l{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(243,238,228,.08)}",
      ".hp-recap-l b{font-size:17px;font-weight:600;color:#F3EEE4;white-space:nowrap}",
      ".hp-recap-l.fort b{font-size:26px}",
      ".hp-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;background:linear-gradient(180deg,rgba(7,10,8,0),rgba(7,10,8,.96) 22%);padding:16px 12px calc(10px + env(safe-area-inset-bottom))}",
      ".hp-bar-in{max-width:720px;margin:0 auto;display:grid;grid-template-columns:90px minmax(0,1fr) 90px;align-items:end;gap:8px}",
      ".hp-bb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:64px;border-radius:16px;border:1px solid rgba(243,238,228,.35);background:rgba(10,10,10,.92);color:#F3EEE4;font:inherit;font-size:14px;line-height:1.2;padding:6px 4px;text-align:center}",
      ".hp-bb.pret{border-color:" + OR + ";color:" + ORT + "}.hp-bb:disabled{opacity:.5}",
      ".hp-bb-i{font-size:18px;line-height:1}",
      ".hp-mic{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0}",
      ".hp-rond{width:64px;height:64px;border-radius:50%;border:1px solid rgba(243,238,228,.6);background:rgba(10,10,10,.92);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 7px rgba(243,238,228,.06)}",
      ".hp-rond.on{border-color:#F3EEE4;box-shadow:0 0 0 7px rgba(243,238,228,.16),0 0 0 14px rgba(243,238,228,.06)}",
      ".hp-mic-t{font-size:14px;line-height:1.35;color:#ECE6DA;text-align:center;max-height:4.1em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}",
      ".hp-mic-t.err{color:#F0B0B0}",
      "@media (min-width:700px){.hp-r{grid-template-columns:40px minmax(0,1.5fr) 72px 56px minmax(0,1fr);column-gap:12px;padding:12px 14px}.hp-r .rq{display:block;font-size:15px;line-height:1.45;color:#ECE6DA;border-left:1px solid rgba(243,238,228,.1);padding-left:12px;align-self:stretch;display:flex;align-items:center}.hp-r .rq.vide{color:rgba(236,230,218,.55)}.hp-li.cur .rq.vide{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:17px;color:rgba(236,230,218,.8)}.rq-m{display:none}.hp-r .f,.hp-r .n,.hp-r .c{font-size:16px}.hp-id-g{grid-template-columns:repeat(4,1fr)}.hp-ed{padding-left:66px;padding-right:20px}}"
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
  /* 14/11 10h01 (Blandine : « garder vraiment le design comme on a sur la page Vidéothèque ») : même en-tête que la
     Vidéothèque — courbe champagne en haut à droite, grande photo fondue dans le noir (entière, jamais recadrée),
     courbe du bas, titre en grand Cormorant aligné à droite sous la photo, sous-titre en italique. */
  function courbeV(cls, d) {
    return h("svg", { className: "hj-cb " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hjg-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#hjg-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  function heroV(img, retour, kick, titre, sous) {
    return h("div", { className: "hj-hv" },
      h("button", { type: "button", className: "hj-ret", onClick: retour }, "‹ " + T("Retour")),
      courbeV("c1", "M250 4 C 330 8, 385 40, 400 96"),
      h("div", { className: "hj-hv-ph" }, h("img", { src: img, alt: "" })),
      courbeV("c2", "M0 92 C 130 90, 240 62, 400 8"),
      h("div", { className: "hj-in" }, h("div", { className: "hj-tt" }, kick ? h("div", { className: "hj-k" }, kick) : null, h("h1", null, titre), sous ? h("div", { className: "hj-tt-s" }, sous) : null)));
  }
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
    function placeTxt(n) { return n === 1 ? "1er" : n + "e"; }   /* texte enregistré dans les résultats : format FFE */
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
    /* 14/11 refonte du protocole : la feuille suit la figure en cours, sauf si le juge vient de faire défiler lui-même */
    var doigtRef = React.useRef(0), autoRef = React.useRef(false);
    React.useEffect(function () {
      function m() { doigtRef.current = Date.now(); }
      window.addEventListener("touchmove", m, { passive: true }); window.addEventListener("wheel", m, { passive: true });
      return function () { window.removeEventListener("touchmove", m); window.removeEventListener("wheel", m); };
    }, []);
    React.useEffect(function () {
      if (!f || !autoRef.current) return; autoRef.current = false;
      if (Date.now() - doigtRef.current < 4000) return;
      try { var el = document.querySelector("[data-hp-cur='1']"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (x) { }
    }, [f ? f.cur : -1]);

    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } setEcran(ctx.agenda_id ? "concours" : "accueil"); }
    function hero(titre, sous, kick) {
      return heroV("images/theme-position-cavalier-noir.webp", retour, kick || T("Juger une reprise"), titre, sous);
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
                tableProtocole(LL, {}),
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
              return h("button", { key: k, type: "button", className: "hj-cp" + (on ? " on" : ""), style: seul ? { gridColumn: "1 / -1", display: "flex", alignItems: "stretch" } : null, onClick: function () { setChoix(Object.assign({}, choix, { cavalier: c.cavalier, cheval: c.cheval, cavalier_id: c.cavalier_id, cheval_id: c.cheval_id, epreuve: c.epreuve || "" })); } },
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
            setF({ reprise: choix.reprise, titre: R.niveauFFE || R.titre, max: max, cavalier: choix.cavalier.trim(), cheval: choix.cheval.trim(), cavalier_id: choix.cavalier_id || null, cheval_id: choix.cheval_id || null, epreuve: choix.epreuve || "", juge: choix.juge, cur: 0,
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
          if (lu.note != null && ff.cur < n.lignes.length - 1) { n.cur = ff.cur + 1; autoRef.current = true; }
          if (lu.note != null) n.ouv = null;
          try { localStorage.setItem(cle, JSON.stringify(n)); } catch (x) { }
          return n;
        });
        if (lu.note == null) setE(function (x) { return Object.assign({}, x, { err: T("Je n’ai pas entendu de note : redis-la au début de la phrase, ou touche-la.") }); });
        else setE(function (x) { return Object.assign({}, x, { reconnu: fmtN(lu.note) + (lu.com ? " · " + lu.com : "") }); });
      };
      setE(Object.assign({}, e, { ecoute: true, dit: "", err: "", reconnu: "" }));
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
    var Rf = REP[f.reprise] || {};
    var manque = []; L.forEach(function (l, k) { if (l.note == null) manque.push(k + 1); });
    var brut = L.reduce(function (a, l) { return a + (l.note != null ? l.note * l.coef : 0); }, 0);
    /* place provisoire : comparée aux feuilles déjà SIGNÉES de la même reprise ; rien n'est publié tant que la feuille n'est pas signée */
    var autres = {}; (feuilles || []).forEach(function (x) { if (x.reprise !== f.reprise || x.pourcentage == null) return; var c = (x.cavalier_id || String(x.cavalier || "").toLowerCase()) + "|" + (x.cheval_id || String(x.cheval || "").toLowerCase()); (autres[c] = autres[c] || []).push(+x.pourcentage); });
    var moi = (f.cavalier_id || String(f.cavalier || "").toLowerCase()) + "|" + (f.cheval_id || String(f.cheval || "").toLowerCase());
    var moys = Object.keys(autres).filter(function (c) { return c !== moi; }).map(function (c) { var a = autres[c]; return a.reduce(function (x, y) { return x + y; }, 0) / a.length; });
    var placeP = (pct != null && !elim) ? 1 + moys.filter(function (m) { return m > pct; }).length : null;
    function ouvrir(k) { var n = Object.assign({}, f, { cur: k, ouv: (f.ouv === k && i === k) ? null : k }); setF(n); setE(Object.assign({}, e, { dit: "", err: "", reconnu: "" })); }
    function signer() {
      if (manque.length) { setE(Object.assign({}, e, { err: T("Il manque encore la note de :") + " " + manque.slice(0, 8).join(", ") + (manque.length > 8 ? "…" : "") + "." })); autoRef.current = true; doigtRef.current = 0; setF(Object.assign({}, f, { cur: manque[0] - 1 })); return; }
      envoyer();
    }
    function editeur(k) {
      var l = L[k];
      return h("div", { className: "hp-ed", key: "ed" + k, onClick: function (ev) { ev.stopPropagation(); } },
        h("div", { className: "hp-ed-l" }, T("Note")),
        h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(" + (notes.length === 21 ? 7 : 6) + ", minmax(0,1fr))", marginTop: 6 } }, notes.map(function (n) { return h("button", { key: n, type: "button", className: "hj-pill hp-num" + (l.note === n ? " on" : ""), onClick: function () { maj({ note: n }); } }, fmtN(n)); })),
        h("div", { className: "hp-ed-row" },
          h("div", { className: "hp-ed-l", style: { margin: 0 } }, T("Coefficient")),
          h("div", { className: "hj-cpt-b", style: { margin: 0, gap: 14 } },
            h("button", { type: "button", className: "hj-pill", style: { width: 44, padding: 0 }, onClick: function () { maj({ coef: Math.max(1, l.coef - 1) }); } }, "−"),
            h("b", { className: "hp-num" }, String(l.coef)),
            h("button", { type: "button", className: "hj-pill", style: { width: 44, padding: 0 }, onClick: function () { maj({ coef: Math.min(5, l.coef + 1) }); } }, "+"))),
        h("div", { className: "hp-ed-l" }, T("Remarques")),
        h("textarea", { className: "hp-ta", value: l.com || "", placeholder: T("Ton commentaire"), onChange: function (ev) { maj({ com: ev.target.value }); } }),
        l.note != null ? h("button", { type: "button", className: "hp-lien", onClick: function () { maj({ note: null }); } }, T("Retirer la note")) : null);
    }
    var etat = manque.length ? T("En cours") : T("Complète, à signer");

    return h("div", { className: "hj hp-page" },
      hero(T("Juger une reprise à la voix"), null, T("Concours de dressage")),
      h("div", { className: "hj-in hp-in" },
        h("div", { className: "hp-id" },
          h("div", { className: "hp-id-g" },
            h("div", null, h("span", null, T("Cavalier")), h("b", null, f.cavalier || "—")),
            h("div", null, h("span", null, T("Cheval")), h("b", null, f.cheval || "—")),
            h("div", null, h("span", null, T("Épreuve")), h("b", null, f.epreuve || Rf.niveauFFE || "—")),
            h("div", null, h("span", null, T("Reprise")), h("b", null, Rf.titre || f.titre || "—"))),
          h("div", { className: "hp-id-b" },
            h("span", { className: "hp-etat" + (manque.length ? "" : " ok") }, etat),
            h("span", { className: "hp-prog" }, h("b", { className: "hp-num" }, String(L.length - manque.length)), " " + T("figures notées sur") + " ", h("b", { className: "hp-num" }, String(L.length))),
            h("span", { className: "hp-prog" }, T("juge en") + " " + f.juge + " · " + T("notes sur") + " " + f.max))),
        tableProtocole(L, { cur: i, ouv: f.ouv, onRow: ouvrir, editeur: editeur }),
        h("div", { className: "hp-recap" },
          h("div", { className: "hp-recap-t" }, T("Récapitulatif de la feuille"), manque.length ? h("span", { className: "hp-prov" }, T("provisoire")) : null),
          h("div", { className: "hp-recap-g" },
            h("div", null, h("span", null, T("Total des points")), h("b", { className: "hp-num" }, fmt(brut) + " / " + fmt(possibleTout))),
            h("div", null, h("span", null, manque.length ? T("Pourcentage des figures notées") : T("Pourcentage")), h("b", { className: "hp-num" }, (possible ? fmt(Math.round(10000 * brut / possible) / 100) + " %" : "—")))),
          h("div", { className: "hj-cpts" }, compteurErr(T("Erreurs de tracé"), "errT", T("−1 % chacune, la 3e élimine")), compteurErr(T("Erreurs d’exécution"), "errE", T("−2 points chacune"))),
          h("div", { className: "hp-recap-l" }, h("span", null, T("Pénalités")), h("b", { className: "hp-num" }, (errT || errE) ? [errE ? "−" + (2 * errE) + " pts" : "", errT ? "−" + errT + " %" : ""].filter(Boolean).join(" · ") : "0")),
          h("div", { className: "hp-recap-l fort" }, h("span", null, manque.length ? T("Résultat provisoire") : T("Résultat final")), h("b", { className: "hp-num" }, elim ? T("Éliminé") : pct == null ? "—" : fmt(Math.round(pct * 100) / 100) + " %")),
          placeP ? h("div", { className: "hp-recap-l" }, h("span", null, T("Place provisoire parmi les feuilles signées")), h("b", { className: "hp-num" }, placeP + (placeP === 1 ? "er" : "e") + " / " + (moys.length + 1))) : null),
        e.msg ? h("div", { className: "hj-msg" }, e.msg) : null,
        h("div", { className: "hj-bas" },
          h("button", { type: "button", className: "hj-btn sec", onClick: function () { if (!e.efface) { setE(Object.assign({}, e, { efface: true })); return; } try { localStorage.removeItem(cle); } catch (x) { } setE(Object.assign({}, e, { efface: false })); setF0(null); } }, e.efface ? T("Touche encore pour effacer") : T("Nouvelle feuille"))),
        h("div", { id: "hp-classement" }, blocClassement()),
        blocRegl("dressage", reglOuv, function () { setReglOuv(!reglOuv); }),
        h("div", { className: "hj-astuce" }, T("Dis la note puis ton commentaire, comme à un secrétaire : Hype écrit tout et passe à la figure suivante. Touche une ligne pour la corriger : note, coefficient et remarque. La feuille est gardée sur ton téléphone à chaque note."))),
      /* commande fixe : le micro reste à portée même quand le juge fait défiler la feuille */
      h("div", { className: "hp-bar" },
        h("div", { className: "hp-bar-in" },
          h("button", { type: "button", className: "hp-bb", onClick: function () { try { document.getElementById("hp-classement").scrollIntoView({ behavior: "smooth", block: "start" }); } catch (x) { } } }, h("span", { className: "hp-bb-i" }, "☰"), T("Classement")),
          h("div", { className: "hp-mic" },
            h("button", { type: "button", className: "hp-rond" + (e.ecoute ? " on" : ""), "aria-label": T("Dicter la note et le commentaire"), onClick: dicter },
              h("svg", { width: 22, height: 30, viewBox: "0 0 30 40" }, h("rect", { x: 9, y: 2, width: 12, height: 22, rx: 6, fill: "none", stroke: "#F3EEE4", strokeWidth: 2 }), h("path", { d: "M4 18c0 6 5 11 11 11s11-5 11-11M15 29v8M9 37h12", fill: "none", stroke: "#F3EEE4", strokeWidth: 2, strokeLinecap: "round" }))),
            h("div", { className: "hp-mic-t" + (e.err ? " err" : "") },
              e.err ? e.err
              : e.ecoute ? (e.dit ? "« " + e.dit + " »" : "● " + T("JE T’ÉCOUTE…"))
              : e.reconnu ? "✓ " + T("Reconnu :") + " " + e.reconnu
              : T("Touche et dis la note, puis ton commentaire"))),
          h("button", { type: "button", className: "hp-bb" + (manque.length ? "" : " pret"), disabled: e.busy, onClick: signer }, h("span", { className: "hp-bb-i" }, "✎"), e.busy ? "…" : T("Signer et envoyer")))));
  }

  /* ── 14/11 (refonte d'après la maquette validée) : le protocole en tableau N° · Figure · Note · Coef. · Remarques.
     Sert au juge (o.onRow) et à la lecture par le cavalier (sans o.onRow : aucune commande). ── */
  function fmtN(n) { return n == null ? "—" : (Math.round(n * 10) / 10).toFixed(1).replace(".", ","); }
  function tableProtocole(L, o) {
    o = o || {};
    var figs = [], ens = [];
    L.forEach(function (l, k) { if (!l || l.err) return; (l.ens ? ens : figs).push(k); });
    function entete() {
      return h("div", { className: "hp-r hp-th" }, h("span", { className: "n" }, "N°"), h("span", { className: "f" }, T("Figure")), h("span", { className: "v" }, T("Note")), h("span", { className: "c" }, T("Coef.")), h("span", { className: "rq" }, T("Remarques")));
    }
    function ligne(k) {
      var l = L[k], cur = !!o.onRow && k === o.cur, vide = l.note == null;
      return h("div", { key: k, className: "hp-li" + (cur ? " cur" : "") },
        h("div", { className: "hp-r" + (o.onRow ? " tap" : ""), "data-hp-cur": cur ? "1" : null, onClick: o.onRow ? function () { o.onRow(k); } : null },
          h("span", { className: "n hp-num" }, String(k + 1)),
          h("span", { className: "f" }, l.t || "", (l.com || cur) ? h("span", { className: "rq-m" + (l.com ? "" : " vide") }, l.com ? l.com : T("À noter…")) : null),
          h("span", { className: "v" }, h("span", { className: "hp-nb hp-num" + (vide ? " vide" : "") }, vide ? "—" : fmtN(l.note))),
          h("span", { className: "c hp-num" }, (l.ens ? "× " : "") + String(l.coef || 1)),
          h("span", { className: "rq" + (l.com ? "" : " vide") }, l.com ? l.com : (cur ? T("À noter…") : "—"))),
        (o.editeur && o.ouv === k) ? o.editeur(k) : null);
    }
    return h("div", { className: "hp-tab" },
      entete(), figs.map(ligne),
      ens.length ? h("div", { className: "hp-ens" }, T("Notes d’ensemble")) : null,
      ens.map(ligne));
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
      return heroV("images/portrait-defaut-noir.webp", retour, T("Jury de CSO"), titre, sous);
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
            var st0 = { cfg: { epreuve: cfg0.epreuve.trim(), bareme: cfg0.bareme, ta: cfg0.ta }, couples: cps, passages: [], cur: cps.length ? 0 : -1, saisie: { barres: null, refus: null, temps: "", etat: "" } };
            setSt(st0);
            /* passages déjà enregistrés pour cette épreuve (autre téléphone du jury, page rechargée) : on les reprend */
            if (ctx.agenda_id) try { supa.from("cso_passages").select("cavalier, cavalier_id, cheval, cheval_id, etat, barres, refus, temps").eq("agenda_id", ctx.agenda_id).eq("epreuve", st0.cfg.epreuve).limit(300).then(function (r) {
              var L = (r && !r.error && r.data) || []; if (!L.length) return;
              setSt0(function (s0) { if (!s0) return s0; var s1 = Object.assign({}, s0), cs = s0.couples.slice();
                L.forEach(function (x) { if (!cs.some(function (c) { return c.cavalier === x.cavalier && (c.cheval || "") === (x.cheval || ""); })) cs.push({ cavalier: x.cavalier, cheval: x.cheval, cavalier_id: x.cavalier_id, cheval_id: x.cheval_id }); });
                s1.couples = cs; s1.passages = L.map(function (x) { return { cavalier: x.cavalier, cheval: x.cheval, cavalier_id: x.cavalier_id, cheval_id: x.cheval_id, etat: x.etat || "", barres: x.barres || 0, refus: x.refus || 0, temps: x.temps == null ? null : Number(x.temps) }; });
                var k = cs.findIndex(function (c) { return !s1.passages.some(function (p) { return p.cavalier === c.cavalier && (p.cheval || "") === (c.cheval || ""); }); }); s1.cur = k;
                try { localStorage.setItem(cle, JSON.stringify(s1)); } catch (x) { } return s1; });
            }, function () { }); } catch (x) { }
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
      envoyerDirect(pa, st.couples.indexOf(cp));
    }
    /* 14/11 (Blandine : « on pourrait carrément faire un live ») : chaque passage validé part dans cso_passages → classement en
       direct sur les téléphones de l'écurie. Si ça échoue (réseau), le passage reste sur ce téléphone et on le dit. */
    async function envoyerDirect(pa, ordre) {
      if (!ctx.agenda_id) return;
      try {
        var r = await supa.from("cso_passages").upsert({ agenda_id: ctx.agenda_id, epreuve: cfg.epreuve, bareme: cfg.bareme, temps_accorde: cfg.ta ? Number(cfg.ta) : null, ordre: ordre >= 0 ? ordre + 1 : null,
          cavalier: pa.cavalier, cavalier_id: pa.cavalier_id || null, cheval: pa.cheval || "", cheval_id: pa.cheval_id || null, etat: pa.etat || "", barres: Math.min(50, pa.barres || 0), refus: Math.min(3, pa.refus || 0), temps: pa.temps, maj_le: new Date().toISOString() },
          { onConflict: "agenda_id,epreuve,cavalier,cheval" }).select("id");
        if (!r || r.error || !r.data || !r.data.length) throw new Error((r && r.error && r.error.message) || "x");
        setE(function (x) { return Object.assign({}, x, { direct: "ok" }); });
      } catch (eD) { setE(function (x) { return Object.assign({}, x, { direct: "ko" }); }); }
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
            epreuve: cfg.epreuve, place: pl, partants: pa, classement: (pl ? (pl === 1 ? "1er" : pl + "e") : c.etat) + " / " + pa,
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
        e.direct === "ok" ? h("div", { className: "hj-astuce", style: { marginTop: 6 } }, "● " + T("En direct : l’écurie voit le classement sur son téléphone.")) : e.direct === "ko" ? h("div", { className: "hj-err" }, T("Le direct ne passe pas (réseau ?) : le passage est gardé sur ce téléphone.")) : null,
        h("div", { className: "hj-encart" }, h("div", { className: "hj-k" }, T("L’ordre de passage")),
          st.couples.map(function (c, k) {
            var d = null; CL.forEach(function (x) { if (x.cavalier === c.cavalier && x.cheval === c.cheval) d = x; });
            return h("div", { key: k, className: "hj-li" + (k === st.cur ? " cur" : ""), onClick: function () { choisir(k); } },
              h("span", { className: "n" }, String(k + 1)),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, c.cavalier), c.cheval ? " · " + c.cheval : "", h("span", { className: "c" }, d ? resume(d, d.c) : (k === st.cur ? T("en piste") : T("à venir")))),
              h("span", { className: "v", style: { fontSize: 18 } }, d && !d.c.etat ? (((window.__hypeLangue || "fr") === "fr") ? (d.place === 1 ? "1er" : d.place + "e") : String(d.place)) : ""));
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
    equifun: { t: "Règlement Equifun", u: "https://www.ffe.com/system/files/disciplines-equifun/reglements/reglement-equifun-2027-applicable-au-01-09-2026_2.pdf" },
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
    equifun: { titre: "Mémo du jury d’Equifun", blocs: [
      ["Le chronomètre", [
        ["Le temps court de la ligne de départ à la ligne d’arrivée. Arrivée à 6 minutes ou plus : éliminé.", "art. V, VI"],
        ["Un essai compte dès que le cavalier passe la porte d’entrée du dispositif. Il peut recommencer sans pénalité tant qu’il réussit le dispositif et reste sous les 6 minutes ; après le 2e essai, il peut l’abandonner mais doit passer la porte de sortie.", "art. V"]]],
      ["Les pénalités (en secondes ajoutées au temps)", [
        ["1re faute sur un dispositif : 20 s. Fautes suivantes sur le même dispositif : 5 s chacune.", "art. VI"],
        ["Dispositif détruit et infranchissable : 40 s au 1er essai, 20 s au 2e essai ou plus.", "art. VI"],
        ["Dispositif non réalisé ou erreur de tracé, non recommencé : 40 s au 1er essai, 20 s après 2 essais.", "art. VI"],
        ["Porte d’entrée ou porte de sortie non franchie : 20 s. Aide de complaisance : 10 s.", "art. VI"],
        ["Une volte dans un dispositif compte comme une erreur de parcours, sauf entre le dernier élément et la porte de sortie.", "art. VI"]]],
      ["Les éliminations", [
        ["Erreur de parcours, 1re chute, 3 dispositifs rendus infranchissables, intervention physique du coach, arrivée à 6 minutes ou plus.", "art. VI"]]],
      ["Le classement", [
        ["Individuel : temps + pénalités, le plus petit total gagne.", "art. VII"],
        ["Par équipes : somme des 3 meilleurs totaux ; l’équipe n’est classée qu’avec 3 cavaliers à l’arrivée.", "art. VII"]]]
    ], note: "Règlement Equifun applicable au 1er septembre 2026. Il ne prévoit pas de départage des égalités. En cas de doute, c’est le règlement en vigueur qui fait foi." },
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
    var d = ["dressage", "cce", "equifun"].indexOf(disc) >= 0 ? disc : "cso", M = MEMO[d];
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
    var d = ["dressage", "cce", "equifun"].indexOf(ctx.disc) >= 0 ? ctx.disc : "cso";
    return h("div", { className: "hj" },
      heroV(d === "dressage" ? "images/theme-position-cavalier-noir.webp" : "images/portrait-defaut-noir.webp", retour, T("Le règlement"), d === "dressage" ? T("Dressage") : d === "cce" ? T("Concours complet") : d === "equifun" ? "Equifun" : T("Saut d’obstacles"), T("Un règlement par discipline, pour toutes les divisions")),
      h("div", { className: "hj-in" },
        h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", marginTop: 16 } }, [["cso", "CSO"], ["dressage", T("Dressage")], ["equifun", "Equifun"], ["cce", T("Complet")]].map(function (z) {
          return h("button", { key: z[0], type: "button", className: "hj-pill" + (d === z[0] ? " on" : ""), onClick: function () { try { window.__juger = Object.assign({}, ctx, { disc: z[0] }); } catch (x) { } setOuv(function (v) { return v === true ? 1 : true; }); } }, z[1]); })),
        blocRegl(d, true, function () { }),
        h("div", { style: { height: 30 } })));
  }

  /* ═══ 14/11 — CLASSEMENT CSO EN DIRECT (pour toute l'écurie) : lit cso_passages toutes les 10 s ═══ */
  function PageLive() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var _l = React.useState(null), lignes = _l[0], setLignes = _l[1];
    var _lj = React.useState([]), lignesJ = _lj[0], setLignesJ = _lj[1];   /* Equifun (jury_passages) */
    var _r = React.useState(false), reglOuv = _r[0], setReglOuv = _r[1];
    React.useEffect(function () {
      try { window.scrollTo(0, 0); } catch (x) { }
      var vif = true;
      function lire() { try { supa.from("cso_passages").select("epreuve, bareme, temps_accorde, ordre, cavalier, cavalier_id, cheval, cheval_id, etat, barres, refus, temps, maj_le").eq("agenda_id", ctx.agenda_id).limit(1000).then(function (r) { if (vif) setLignes((r && !r.error && r.data) || []); }, function () { if (vif) setLignes([]); }); } catch (x) { setLignes([]); }
        try { supa.from("jury_passages").select("discipline, epreuve, cavalier, cheval, equipe, etat, temps, penalites, maj_le").eq("agenda_id", ctx.agenda_id).eq("discipline", "equifun").limit(1000).then(function (r) { if (vif && r && !r.error) setLignesJ(r.data || []); }, function () { }); } catch (x) { } }
      lire(); var t = setInterval(lire, 10000);
      return function () { vif = false; clearInterval(t); };
    }, []);
    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } (app.setEcran || function () { })(ctx.agenda_id ? "concours" : "accueil"); }
    var NOMS = { A: T("Barème A au chrono"), A0: T("Barème A sans chrono"), C: T("Barème C") };
    function ptsTxt(n) { return n === 0 ? T("Sans faute") : n + " " + (n > 1 ? T("pts") : T("pt")); }
    var eps = {}, ordreEp = [], dernier = null;
    (lignes || []).forEach(function (x) { if (!eps[x.epreuve]) { eps[x.epreuve] = []; ordreEp.push(x.epreuve); } eps[x.epreuve].push(x); if (!dernier || x.maj_le > dernier.maj_le) dernier = x; });
    var epsJ = {}, ordreJ = [];
    (lignesJ || []).forEach(function (x) { if (!epsJ[x.epreuve]) { epsJ[x.epreuve] = []; ordreJ.push(x.epreuve); } epsJ[x.epreuve].push(x); if (!dernier || x.maj_le > dernier.maj_le) dernier = x; });
    return h("div", { className: "hj" },
      heroV("images/portrait-defaut-noir.webp", retour, "● " + T("En direct"), T("Le classement"), ctx.concours || ""),
      h("div", { className: "hj-in" },
        lignes === null ? h("div", { className: "hj-astuce" }, T("Chargement…"))
        : !(ordreEp.length || ordreJ.length) ? h("div", { className: "hj-astuce" }, T("Pas encore de passage : le classement apparaît dès que le jury valide le premier couple."))
        : ordreJ.map(function (ep) {
          var CL = classerEF(epsJ[ep].map(function (x) { var P = x.penalites || {}; return { cavalier: x.cavalier, cheval: x.cheval, equipe: x.equipe || "", etat: x.etat || "", motif: P.motif || "", temps: x.temps == null ? null : Number(x.temps), pen: P }; }));
          var pod = CL.filter(function (x) { return !x.c.etat; }), EQ = equipesEF(CL);
          return h("div", { key: "ef" + ep },
            COURBE(),
            h("div", { className: "hj-h2", style: { marginTop: 8 } }, ep, h("span", null, "Equifun · " + epsJ[ep].length + " " + T("passés"))),
            pod.length >= 2 ? h("div", { className: "hj-podium" }, [1, 0, 2].filter(function (n) { return pod[n]; }).map(function (n) {
              var o = pod[n];
              return h("div", { key: n, className: "hj-pod" + (o.place === 1 ? " p1" : "") }, h("div", { className: "hj-rang" }, String(o.place)), h("b", null, o.cavalier), h("span", null, o.cheval || ""), h("em", null, fmtMin(o.c.total)), h("span", { style: { marginTop: 2 } }, o.c.pen ? "+" + o.c.pen + " s" : T("sans pénalité")));
            })) : null,
            CL.map(function (o, n) {
              var neuf = dernier && dernier.epreuve === ep && dernier.cavalier === o.cavalier && dernier.cheval === o.cheval;
              return h("div", { key: n, className: "hj-li" + (neuf ? " cur" : ""), style: { cursor: "default", gridTemplateColumns: "26px 1fr 96px" } },
                h("span", { className: "n" }, o.c.etat ? "–" : String(o.place)),
                h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "", h("span", { className: "c" }, (o.c.etat ? T("Éliminé") + (o.motif ? " · " + T(o.motif) : "") : fmtMin(o.temps) + (o.c.pen ? " + " + o.c.pen + " s" : " · " + T("sans pénalité"))) + (neuf ? " · " + T("dernier passage") : ""))),
                h("span", { className: "v", style: { fontSize: 16 } }, o.c.etat ? "" : fmtMin(o.c.total)));
            }),
            EQ.length ? EQ.map(function (t, n) { return h("div", { key: "t" + n, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "26px 1fr 96px" } }, h("span", { className: "n" }, t.classee ? String(t.place) : "–"), h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, T("Équipe") + " " + t.nom), h("span", { className: "c" }, t.classee ? T("somme des 3 meilleurs temps") : T("pas classée : moins de 3 cavaliers à l’arrivée"))), h("span", { className: "v", style: { fontSize: 16 } }, t.classee ? fmtMin(t.total) : "")); }) : null);
        }).concat(ordreEp.map(function (ep) {
          var L0 = eps[ep], cfg = { bareme: L0[0].bareme || "A", ta: L0[0].temps_accorde };
          var CL = classerCSO(L0.map(function (x) { return Object.assign({}, x, { temps: x.temps == null ? null : Number(x.temps) }); }), cfg);
          var pod = CL.filter(function (x) { return !x.c.etat; });
          return h("div", { key: ep },
            COURBE(),
            h("div", { className: "hj-h2", style: { marginTop: 8 } }, ep, h("span", null, NOMS[cfg.bareme] + " · " + L0.length + " " + T("passés"))),
            pod.length >= 2 ? h("div", { className: "hj-podium" }, [1, 0, 2].filter(function (n) { return pod[n]; }).map(function (n) {
              var o = pod[n];
              return h("div", { key: n, className: "hj-pod" + (o.place === 1 ? " p1" : "") }, h("div", { className: "hj-rang" }, String(o.place)), h("b", null, o.cavalier), h("span", null, o.cheval || ""), h("em", { style: { fontSize: 24 } }, cfg.bareme === "C" ? fmtT(o.c.total) : cfg.bareme === "A0" ? ptsTxt(o.c.pts) : fmtT(o.temps)), cfg.bareme === "A" ? h("span", { style: { marginTop: 2 } }, ptsTxt(o.c.pts)) : null);
            })) : null,
            CL.map(function (o, n) {
              var neuf = dernier && dernier.epreuve === ep && dernier.cavalier === o.cavalier && dernier.cheval === o.cheval;
              var etatTxt = { "El.": T("Éliminé"), "Ab.": T("Abandon"), "NP": T("Non partant") }[o.c.etat] || o.c.etat;
              return h("div", { key: n, className: "hj-li" + (neuf ? " cur" : ""), style: { cursor: "default", gridTemplateColumns: "26px 1fr 70px" } },
                h("span", { className: "n" }, o.c.etat ? "–" : String(o.place)),
                h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "",
                  h("span", { className: "c" }, (o.c.etat ? etatTxt : (cfg.bareme === "C" ? fmtT(o.c.total) : ptsTxt(o.c.pts) + (o.temps != null ? " · " + fmtT(o.temps) : ""))) + (neuf ? " · " + T("dernier passage") : ""))),
                h("span", { className: "v", style: { fontSize: 18 } }, o.c.etat ? "" : cfg.bareme === "C" ? fmtT(o.c.total) : (o.c.pts === 0 ? "SF" : o.c.pts + " pts")));
            }));
        })),
        h("div", { className: "hj-astuce" }, T("Mis à jour toutes les 10 secondes. Classement provisoire : le résultat officiel est celui que l’équipe publie.")),
        blocRegl("cso", reglOuv, function () { setReglOuv(!reglOuv); }),
        h("div", { style: { height: 30 } })));
  }
  /* ═══ 14/11 — PLAN DU PARCOURS EN PHOTO ═══
     Blandine (10h16) : « prendre une photo du plan… que ça calcule, en fonction des distances, le nombre de foulées… tout ce
     qui peut être utile au cavalier… et que ça lui refasse le plan, bien écrit ». Lecture par hey-baby-vision (même service
     que l'outil documents), plan redessiné en SVG (positions estimées par la lecture : schéma, pas un plan à l'échelle).
     Foulées : repères courants (cheval 3,50 m ; poney D 3,30 m ; C 3,10 m ; B 2,90 m) — nb de foulées = distance ÷ foulée − 1
     (la foulée « en plus » = réception + battue). Temps accordé = longueur ÷ vitesse × 60 (règlement CSO, art. 6.1 B). */
  var GABARITS = [["cheval", "Cheval", 3.5], ["D", "Poney D", 3.3], ["C", "Poney C", 3.1], ["B", "Poney B", 2.9]];
  function foulees(d, f) {
    var x = d / f - 1; if (!(x > 0)) return null;
    var n = Math.round(x), r = x - n;
    return { n: Math.max(0, n), ecart: r, txt: Math.abs(r) < 0.15 ? "juste" : (r > 0 ? "longue" : "courte") };
  }
  function cleObs(n) { var m = String(n || "").match(/^(\d+)\s*([a-z])?/i); return m ? Number(m[1]) * 10 + (m[2] ? m[2].toLowerCase().charCodeAt(0) - 96 : 0) : 9999; }
  async function lirePlan(images) {
    var sess = await supa.auth.getSession(); var sv = sess && sess.data && sess.data.session;
    if (!sv || !sv.access_token) throw new Error(T("connecte-toi d’abord"));
    var system = "Tu lis le plan d'un parcours de saut d'obstacles (photo ou PDF). Reponds UNIQUEMENT en JSON : "
      + "{\"epreuve\":\"nom de l'epreuve ou vide\",\"hauteur\":\"hauteur en cm ou vide\",\"longueur_m\":\"longueur du parcours en metres ou vide\",\"vitesse\":\"vitesse en m/min ou vide\",\"temps_accorde\":\"temps accorde en secondes ou vide\",\"temps_limite\":\"temps limite en secondes ou vide\",\"bareme\":\"bareme ecrit ou vide\","
      + "\"obstacles\":[{\"num\":\"numero tel qu'ecrit (1, 2, 5a, 5b...)\",\"type\":\"vertical|oxer|triple_barre|riviere|mur|autre\",\"x\":0,\"y\":0,\"angle\":0}],"
      + "\"distances\":[{\"de\":\"numero\",\"a\":\"numero\",\"metres\":0}],\"depart\":{\"x\":0,\"y\":0},\"arrivee\":{\"x\":0,\"y\":0},\"remarques\":\"ce qui est ecrit d'utile (sens, barrage, obstacles du barrage...) ou vide\"}. "
      + "x et y : position du centre de l'obstacle sur le plan, en pourcentage de la largeur (x, de gauche a droite) et de la hauteur (y, de haut en bas) de la piste dessinee. angle : orientation de la barre en degres (0 = barre horizontale sur le plan). "
      + "distances : seulement celles ECRITES sur le plan (entre deux obstacles d'une ligne ou d'une combinaison), en metres ; n'invente aucune distance. N'invente aucun obstacle. Si un nombre n'est pas lisible, laisse vide.";
    var blocs = (images || []).map(function (du) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: String(du).slice(String(du).indexOf(",") + 1) } }; });
    blocs.push({ type: "text", text: "Voici le plan." });
    var rep = await fetch(String(SUPABASE_URL).replace(/\/+$/, "") + "/functions/v1/hey-baby-vision", { method: "POST", headers: { "Content-Type": "application/json", "apikey": CLE_PUBLISHABLE, "Authorization": "Bearer " + sv.access_token }, body: JSON.stringify({ mode: "perception", stream: false, differe: true, system: system, messages: [{ role: "user", content: blocs }] }) });
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
    } else if (rep.ok && data && data.ok && data.content) texte = (data.content || []).map(function (b) { return (b && b.text) || ""; }).join("");
    else { if (data && data.code === "PREMIUM_REQUIRED") throw new Error(T("la lecture des documents est réservée aux abonnés Premium")); throw new Error("HTTP " + rep.status); }
    var m = texte.match(/\{[\s\S]*\}/); var o = JSON.parse(m ? m[0] : texte) || {};
    o.obstacles = (Array.isArray(o.obstacles) ? o.obstacles : []).filter(function (x) { return x && x.num; });
    o.distances = (Array.isArray(o.distances) ? o.distances : []).filter(function (x) { return x && Number(x.metres) > 0; });
    return o;
  }
  function dessinPlan(p, gab) {
    var W = 100, H = 62, M = 5;
    var obs = (p.obstacles || []).slice().sort(function (a, b) { return cleObs(a.num) - cleObs(b.num); });
    function X(v) { return M + (Math.max(0, Math.min(100, Number(v) || 0)) / 100) * (W - 2 * M); }
    function Y(v) { return M + (Math.max(0, Math.min(100, Number(v) || 0)) / 100) * (H - 2 * M); }
    var parN = {}; obs.forEach(function (o) { parN[String(o.num).toLowerCase()] = o; });
    var trace = obs.map(function (o) { return X(o.x).toFixed(1) + "," + Y(o.y).toFixed(1); }).join(" ");
    function barre(o, k) {
      var cx = X(o.x), cy = Y(o.y), a = Number(o.angle) || 0, L = 6, t = String(o.type || "");
      var n = t === "oxer" ? 2 : t === "triple_barre" ? 3 : 1, gap = 1.1;
      return h("g", { key: "o" + k, transform: "rotate(" + a + " " + cx + " " + cy + ")" },
        t === "riviere" ? h("rect", { x: cx - L / 2, y: cy - 1.4, width: L, height: 2.8, rx: .6, fill: "rgba(243,238,228,.06)", stroke: "#F3EEE4", strokeWidth: .35, strokeDasharray: ".8 .6" })
          : Array.apply(null, Array(n)).map(function (_, i) { var dy = (i - (n - 1) / 2) * gap; return h("line", { key: i, x1: cx - L / 2, y1: cy + dy, x2: cx + L / 2, y2: cy + dy, stroke: "#F3EEE4", strokeWidth: t === "mur" ? 1.2 : .7, strokeLinecap: "round" }); }),
        h("circle", { cx: cx, cy: cy - 3.6 - (n - 1) * gap / 2, r: 2.7, fill: "#070A08", stroke: "rgba(201,166,107,.8)", strokeWidth: .3 }),
        h("text", { x: cx, y: cy - 3.6 - (n - 1) * gap / 2 + 1.1, textAnchor: "middle", fontSize: 3, fontFamily: "Montserrat, sans-serif", fontWeight: 600, fill: "#F3EEE4", transform: "rotate(" + (-a) + " " + cx + " " + (cy - 3.6 - (n - 1) * gap / 2) + ")" }, String(o.num)));
    }
    return h("svg", { viewBox: "0 0 " + W + " " + H, style: { width: "100%", height: "auto", display: "block" }, "aria-label": T("Plan du parcours") },
      h("rect", { x: 1, y: 1, width: W - 2, height: H - 2, rx: 2, fill: "rgba(243,238,228,.025)", stroke: "rgba(243,238,228,.28)", strokeWidth: .3 }),
      obs.length > 1 ? h("polyline", { points: trace, fill: "none", stroke: "rgba(201,166,107,.6)", strokeWidth: .35, strokeDasharray: "1.2 1", strokeLinejoin: "round" }) : null,
      (p.distances || []).map(function (d, k) {
        var a = parN[String(d.de).toLowerCase()], b = parN[String(d.a).toLowerCase()]; if (!a || !b) return null;
        var fo = foulees(Number(d.metres), gab), mx = (X(a.x) + X(b.x)) / 2, my = (Y(a.y) + Y(b.y)) / 2;
        if (Math.hypot(X(a.x) - X(b.x), Y(a.y) - Y(b.y)) < 14) mx += mx > 70 ? -14 : 14;   /* combinaison : l'étiquette à côté, pas sur les obstacles */
        return h("g", { key: "d" + k },
          h("rect", { x: mx - 8.4, y: my - 2.7, width: 16.8, height: 5.4, rx: 2.7, fill: "#070A08", stroke: "rgba(243,238,228,.35)", strokeWidth: .25 }),
          h("text", { x: mx, y: my + 1, textAnchor: "middle", fontSize: 2.9, fontFamily: "Montserrat, sans-serif", fill: "#F3EEE4" }, String(d.metres).replace(".", ",") + " m" + (fo ? " · " + fo.n + " f" : "")));
      }),
      obs.map(barre));
  }
  function PagePlan() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var _p = React.useState(function () { try { return JSON.parse(localStorage.getItem("hype_plan_dernier") || "null"); } catch (e) { return null; } }), plan = _p[0], setPlan0 = _p[1];
    function setPlan(p) { setPlan0(p); try { localStorage.setItem("hype_plan_dernier", JSON.stringify(p)); } catch (e) { } }
    var _g = React.useState("cheval"), gab = _g[0], setGab = _g[1];
    var _f = React.useState(""), maFoulee = _f[0], setMaFoulee = _f[1];
    var _e = React.useState({ busy: false, err: "" }), e = _e[0], setE = _e[1];
    var refF = React.useRef(null);
    async function lire(imgs) {
      setE({ busy: true, err: "" });
      try { var p = await lirePlan(imgs); if (!p.obstacles.length) throw new Error(T("je ne vois pas d’obstacles numérotés sur cette image")); p.lu_le = new Date().toISOString(); setPlan(p); setE({ busy: false, err: "" }); }
      catch (x) { setE({ busy: false, err: T("Lecture impossible : ") + String((x && x.message) || x) }); }
    }
    React.useEffect(function () {
      try { window.scrollTo(0, 0); } catch (x) { }
      var im = ctx.images; if (im && im.length) { try { window.__juger = Object.assign({}, ctx, { images: null }); } catch (x) { } lire(im); }
    }, []);
    async function fichier(ev) {
      var f = ev && ev.target && ev.target.files && ev.target.files[0]; if (!f) return;
      try {
        var pdf = /pdf/i.test(String(f.type || "")) || /\.pdf$/i.test(String(f.name || ""));
        var imgs = pdf ? (await hypePdfEnImages(f, 1, 2400)).images : [await hypeImageEnJpeg(f, 2400)];
        lire(imgs);
      } catch (x) { setE({ busy: false, err: T("Lecture impossible : ") + String((x && x.message) || x) }); }
      try { ev.target.value = ""; } catch (x) { }
    }
    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } (app.setEcran || function () { })("accueil"); }
    var G = GABARITS.filter(function (g) { return g[0] === gab; })[0] || GABARITS[0];
    var fl = parseFloat(String(maFoulee).replace(",", ".")); var foul = fl > 1.5 && fl < 5 ? fl : G[2];
    var p = plan || {};
    var obs = (p.obstacles || []).slice().sort(function (a, b) { return cleObs(a.num) - cleObs(b.num); });
    var nObs = {}; obs.forEach(function (o) { nObs[String(o.num).replace(/[a-z]$/i, "")] = 1; });
    var combis = {}; obs.forEach(function (o) { var m = String(o.num).match(/^(\d+)\s*([a-z])$/i); if (m) (combis[m[1]] = combis[m[1]] || []).push(o.num); });
    var L = parseFloat(p.longueur_m), V = parseFloat(p.vitesse), TAc = (L > 0 && V > 0) ? Math.round(L / V * 60) : null, TAe = parseFloat(p.temps_accorde);
    var TA = TAe > 0 ? TAe : TAc;
    var ficIn = h("input", { ref: refF, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: fichier });
    return h("div", { className: "hj" },
      heroV("images/portrait-defaut-noir.webp", retour, T("Plan du parcours"), p.epreuve || T("Le plan, au propre"), T("Photographie le plan affiché au paddock : Hype le redessine et calcule les foulées.")),
      h("div", { className: "hj-in" },
        ficIn,
        h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: e.busy, onClick: function () { try { refF.current && refF.current.click(); } catch (x) { } } }, e.busy ? T("Lecture du plan… (1 à 2 min)") : plan ? T("Photographier un autre plan") : T("Photographier le plan"))),
        e.err ? h("div", { className: "hj-err" }, e.err) : null,
        plan ? h("div", null,
          h("div", { className: "hj-encart", style: { padding: 6, marginLeft: -12, marginRight: -12 } }, dessinPlan(p, foul)),
          h("div", { className: "hj-astuce", style: { marginTop: 8 } }, T("Schéma redessiné d’après la photo : les positions sont approximatives, les numéros et les distances sont ceux écrits sur le plan.")),
          COURBE(),
          h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Les foulées")),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))" } }, GABARITS.map(function (g) { return h("button", { key: g[0], type: "button", className: "hj-pill" + (gab === g[0] && !(fl > 1.5 && fl < 5) ? " on" : ""), onClick: function () { setGab(g[0]); setMaFoulee(""); } }, T(g[1])); })),
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Ou la foulée de ton cheval (m)")),
          h("input", { className: "hj-sel", inputMode: "decimal", value: maFoulee, placeholder: String(G[2]).replace(".", ","), onChange: function (ev) { setMaFoulee(ev.target.value); } }),
          (p.distances || []).length ? (p.distances || []).map(function (d, k) {
            var fo = foulees(Number(d.metres), foul);
            var conseil = !fo ? "" : fo.txt === "juste" ? T("distance juste") : fo.txt === "longue" ? T("un peu longue : galop à allonger") : T("un peu courte : galop à raccourcir");
            return h("div", { key: k, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "64px 1fr 70px" } },
              h("span", { className: "n", style: { fontSize: 15 } }, d.de + " → " + d.a),
              h("span", { className: "t" }, String(d.metres).replace(".", ",") + " m", h("span", { className: "c" }, conseil)),
              h("span", { className: "v", style: { fontSize: 20 } }, fo ? fo.n + " f" : "—"));
          }) : h("div", { className: "hj-astuce" }, T("Aucune distance n’est écrite sur ce plan : demande-les au chef de piste ou mesure-les à pied (1 grand pas ≈ 1 m).")),
          h("div", { className: "hj-astuce" }, T("Repères courants : foulée de galop d’un cheval 3,50 m ; poney D 3,30 m ; C 3,10 m ; B 2,90 m. Nombre de foulées = distance ÷ foulée − 1 (une foulée part dans la réception et la battue). Adapte selon ton cheval, et marche toujours le parcours.")),
          COURBE(),
          h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Le parcours")),
          [[T("Épreuve"), [p.epreuve, p.hauteur ? p.hauteur + " cm" : ""].filter(Boolean).join(" · ")],
           [T("Obstacles"), obs.length ? Object.keys(nObs).length + " " + T("obstacles") + " · " + obs.length + " " + T("sauts") : ""],
           [T("Combinaisons"), Object.keys(combis).map(function (k) { return combis[k].join("-"); }).join(" · ")],
           [T("Longueur"), L > 0 ? L + " m" : ""], [T("Vitesse"), V > 0 ? V + " m/min" : ""],
           [T("Temps accordé"), TA ? TA + " s" + (TAe > 0 && TAc && Math.abs(TAe - TAc) > 1 ? " (" + T("calcul : ") + TAc + " s)" : (!(TAe > 0) && TAc ? " (" + T("calculé") + ")" : "")) : ""],
           [T("Temps limite"), TA ? (parseFloat(p.temps_limite) > 0 ? parseFloat(p.temps_limite) : 2 * TA) + " s" : ""],
           [T("Au plan"), p.remarques || ""]].filter(function (r) { return r[1]; }).map(function (r, k) {
            return h("div", { key: k, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "120px 1fr" } }, h("span", { className: "c", style: { margin: 0, fontStyle: "normal" } }, r[0]), h("span", { className: "t" }, r[1]));
          }),
          TA ? h("div", { className: "hj-astuce" }, T("Au barème A : 1 point par tranche de 4 secondes entamée au-delà du temps accordé ; au-delà du temps limite, éliminé.")) : null) : null,
        h("div", { style: { height: 30 } })));
  }
  /* ═══ 14/11 — JURY D'EQUIFUN À LA VOIX ═══
     Blandine (10h23) : « la même chose pour l'Equifun ». Règlement FFE Equifun applicable au 1er septembre 2026, VI et VII :
     tout se compte en secondes ajoutées au temps ; 1re faute sur un dispositif 20 s, suivantes 5 s ; détruit et infranchissable
     40 s (1er essai) / 20 s (2e essai ou plus) ; non réalisé ou erreur de tracé non recommencé 40 s / 20 s ; porte d'entrée ou de
     sortie non franchie 20 s ; aide de complaisance 10 s ; éliminé : erreur de parcours, ligne d'arrivée à 6 min ou plus, 1re
     chute, 3 dispositifs infranchissables, intervention physique du coach. Classement individuel : temps + pénalités, le plus
     petit gagne ; par équipes : somme des 3 meilleurs, équipe classée seulement avec 3 cavaliers à l'arrivée.
     Le règlement ne dit rien des égalités : ex æquo. */
  var PEN_EF = [["f1", "1re faute sur un dispositif", 20], ["fs", "Faute suivante sur le même dispositif", 5], ["d1", "Dispositif détruit au 1er essai, infranchissable", 40], ["d2", "Détruit au 2e essai ou plus, infranchissable", 20],
    ["n1", "Non réalisé ou erreur de tracé au 1er essai, non recommencé", 40], ["n2", "Non réalisé ou erreur de tracé après 2 essais, non recommencé", 20], ["pe", "Porte d’entrée non franchie", 20], ["ps", "Porte de sortie non franchie", 20], ["ai", "Aide de complaisance", 10]];
  var ELIM_EF = ["Erreur de parcours", "Arrivée à 6 minutes ou plus", "Chute", "3 dispositifs infranchissables", "Intervention du coach"];
  function lireTempsEF(phrase) {
    var p = String(phrase || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/-/g, " ");
    var o = { etat: "", temps: null, f1: null };
    if (/elimin/.test(p)) o.etat = "El."; else if (/abandon/.test(p)) o.etat = "Ab."; else if (/non partant|forfait/.test(p)) o.etat = "NP";
    var mm = p.match(/(\d+)\s*(?:min(?:utes?)?|')\s*(?:et\s*)?(\d{1,2})?\s*(?:s|sec|secondes?)?\s*(?:et\s*)?(\d{1,2})?/);
    if (mm) { var c = mm[3] || ""; o.temps = Number(mm[1]) * 60 + (mm[2] ? Number(mm[2]) : 0) + (c ? Number(c) / (c.length === 1 ? 10 : 100) : 0); }
    else { var l = lireCSO(p.replace(/(\d+)\s*fautes?/g, " ")); o.temps = l.temps; }
    var mf = p.match(/(\d+|une?|deux|trois|quatre|cinq)\s*fautes?/); if (mf) o.f1 = MOTS_N[mf[1]] != null ? MOTS_N[mf[1]] : Number(mf[1]);
    if (/sans faute|sans penalite/.test(p)) o.f1 = 0;
    return o;
  }
  function calculEF(pa) {
    var pen = 0, P = pa.pen || {}; PEN_EF.forEach(function (x) { pen += (Number(P[x[0]]) || 0) * x[2]; });
    var etat = pa.etat || "", t = pa.temps == null || pa.temps === "" ? null : Number(pa.temps);
    if (!etat && t != null && t >= 360) etat = "El.";
    if (!etat && ((Number(P.d1) || 0) + (Number(P.d2) || 0)) >= 3) etat = "El.";
    return { etat: etat, pen: pen, total: (t == null || etat) ? null : Math.round((t + pen) * 100) / 100 };
  }
  function classerEF(passages) {
    var L = passages.map(function (p) { return Object.assign({}, p, { c: calculEF(p) }); });
    var ok = L.filter(function (x) { return !x.c.etat && x.c.total != null; }).sort(function (a, b) { return a.c.total - b.c.total; });
    var prec = null, place = 0; ok.forEach(function (x, i) { if (x.c.total !== prec) { place = i + 1; prec = x.c.total; } x.place = place; });
    return ok.concat(L.filter(function (x) { return ok.indexOf(x) < 0; }));
  }
  function equipesEF(CL) {
    var E = {}; CL.forEach(function (x) { var k = String(x.equipe || "").trim(); if (!k) return; (E[k] = E[k] || []).push(x); });
    var T0 = Object.keys(E).map(function (k) {
      var fin = E[k].filter(function (x) { return x.c.total != null; }).sort(function (a, b) { return a.c.total - b.c.total; });
      return { nom: k, membres: E[k], classee: fin.length >= 3, total: fin.length >= 3 ? Math.round(fin.slice(0, 3).reduce(function (a, x) { return a + x.c.total; }, 0) * 100) / 100 : null };
    });
    var ok = T0.filter(function (t) { return t.classee; }).sort(function (a, b) { return a.total - b.total; });
    var prec = null, place = 0; ok.forEach(function (t, i) { if (t.total !== prec) { place = i + 1; prec = t.total; } t.place = place; });
    return ok.concat(T0.filter(function (t) { return !t.classee; }));
  }
  function fmtMin(t) { if (t == null || t === "") return "—"; t = Number(t); var m = Math.floor(t / 60), s = t - m * 60; return (m ? m + " min " : "") + (Math.round(s * 100) / 100).toFixed(2).replace(".", ",") + " s"; }

  function JuryEquifun() {
    css();
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    var ctx = (function () { try { return window.__juger || {}; } catch (e) { return {}; } })();
    var cle = "hype_ef_" + (ctx.agenda_id || "libre");
    var _s = React.useState(function () { try { return JSON.parse(localStorage.getItem(cle) || "null"); } catch (e) { return null; } }), st = _s[0], setSt0 = _s[1];
    function setSt(n) { setSt0(n); try { localStorage.setItem(cle, JSON.stringify(n)); } catch (e) { } }
    var eps = []; (ctx.couples || []).forEach(function (c) { if (c.epreuve && eps.indexOf(c.epreuve) < 0) eps.push(c.epreuve); });
    var _c = React.useState({ epreuve: eps[0] || "", equipes: false }), cfg0 = _c[0], setCfg0 = _c[1];
    var _e = React.useState({ ecoute: false, dit: "", msg: "", err: "", busy: false, ok: false }), e = _e[0], setE = _e[1];
    var _m = React.useState({ cavalier: "", cheval: "", equipe: "" }), man = _m[0], setMan = _m[1];
    var _rg = React.useState(false), reglOuv = _rg[0], setReglOuv = _rg[1];
    var recRef = React.useRef(null);
    React.useEffect(function () { try { window.scrollTo(0, 0); } catch (x) { } return function () { try { recRef.current && recRef.current.abort(); } catch (x) { } }; }, []);
    function retour() { try { if (app.histLen && app.retourEcran) { app.retourEcran(); return; } } catch (x) { } setEcran(ctx.agenda_id ? "concours" : "accueil"); }
    var VIDE = { pen: {}, temps: "", etat: "", motif: "" };

    if (!st) {
      return h("div", { className: "hj" },
        heroV("images/portrait-defaut-noir.webp", retour, T("Jury d’Equifun"), T("Dicter les résultats"), T("Le jury dit le temps de chaque couple et compte les pénalités : Hype additionne et fait le classement.")),
        h("div", { className: "hj-in" },
          h("div", { className: "hj-l", style: { marginTop: 18 } }, T("Épreuve")),
          eps.length > 1 ? h("div", { className: "hj-pills" }, eps.map(function (x) { return h("button", { key: x, type: "button", className: "hj-pill" + (cfg0.epreuve === x ? " on" : ""), onClick: function () { setCfg0(Object.assign({}, cfg0, { epreuve: x })); } }, x); })) : null,
          h("input", { className: "hj-sel", value: cfg0.epreuve, placeholder: T("ex. Club Poney Benjamin"), onChange: function (ev) { setCfg0(Object.assign({}, cfg0, { epreuve: ev.target.value })); } }),
          h("div", { className: "hj-l", style: { marginTop: 16 } }, T("Classement")),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
            h("button", { type: "button", className: "hj-pill" + (!cfg0.equipes ? " on" : ""), onClick: function () { setCfg0(Object.assign({}, cfg0, { equipes: false })); } }, T("Individuel")),
            h("button", { type: "button", className: "hj-pill" + (cfg0.equipes ? " on" : ""), onClick: function () { setCfg0(Object.assign({}, cfg0, { equipes: true })); } }, T("Par équipes"))),
          h("div", { className: "hj-astuce" }, T("Tout se compte en secondes ajoutées au temps : 1re faute sur un dispositif 20 s, fautes suivantes 5 s, portes non franchies 20 s, aide de complaisance 10 s… Arrivée à 6 minutes ou plus, chute ou erreur de parcours : éliminé.")),
          blocRegl("equifun", reglOuv, function () { setReglOuv(!reglOuv); }),
          h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: !String(cfg0.epreuve).trim(), onClick: function () {
            var cps = (ctx.couples || []).filter(function (c) { return !c.epreuve || !cfg0.epreuve || c.epreuve === cfg0.epreuve; }).map(function (c) { return { cavalier: c.cavalier, cheval: c.cheval, cavalier_id: c.cavalier_id || null, cheval_id: c.cheval_id || null, equipe: "" }; });
            var st0 = { cfg: { epreuve: cfg0.epreuve.trim(), equipes: cfg0.equipes }, couples: cps, passages: [], cur: cps.length ? 0 : -1, saisie: VIDE };
            setSt(st0);
            if (ctx.agenda_id) try { supa.from("jury_passages").select("cavalier, cavalier_id, cheval, cheval_id, equipe, etat, temps, penalites").eq("agenda_id", ctx.agenda_id).eq("discipline", "equifun").eq("epreuve", st0.cfg.epreuve).limit(300).then(function (r) {
              var L = (r && !r.error && r.data) || []; if (!L.length) return;
              setSt0(function (s0) { if (!s0) return s0; var s1 = Object.assign({}, s0), cs = s0.couples.slice();
                L.forEach(function (x) { var c0 = cs.filter(function (c) { return c.cavalier === x.cavalier && (c.cheval || "") === (x.cheval || ""); })[0]; if (c0) c0.equipe = x.equipe || c0.equipe; else cs.push({ cavalier: x.cavalier, cheval: x.cheval, cavalier_id: x.cavalier_id, cheval_id: x.cheval_id, equipe: x.equipe || "" }); });
                s1.couples = cs; s1.passages = L.map(function (x) { var P = x.penalites || {}; return { cavalier: x.cavalier, cheval: x.cheval, cavalier_id: x.cavalier_id, cheval_id: x.cheval_id, equipe: x.equipe || "", etat: x.etat || "", motif: P.motif || "", temps: x.temps == null ? null : Number(x.temps), pen: P }; });
                s1.cur = cs.findIndex(function (c) { return !s1.passages.some(function (p) { return p.cavalier === c.cavalier && (p.cheval || "") === (c.cheval || ""); }); });
                try { localStorage.setItem(cle, JSON.stringify(s1)); } catch (x) { } return s1; });
            }, function () { }); } catch (x) { }
          } }, T("Commencer l’épreuve"))),
          h("div", { style: { height: 30 } })));
    }

    var cfg = st.cfg, cp = st.cur >= 0 ? st.couples[st.cur] : null, sa = st.saisie || VIDE;
    var calc = calculEF(sa), CL = classerEF(st.passages.map(function (p) { var c = st.couples.filter(function (x) { return x.cavalier === p.cavalier && x.cheval === p.cheval; })[0]; return Object.assign({}, p, { equipe: (c && c.equipe) || p.equipe || "" }); }));
    function majSaisie(o) { setSt(Object.assign({}, st, { saisie: Object.assign({}, sa, o) })); setE(Object.assign({}, e, { err: "", msg: "" })); }
    function majPen(k, v) { var P = Object.assign({}, sa.pen || {}); P[k] = Math.max(0, v); majSaisie({ pen: P }); }
    function dicter() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { setE(Object.assign({}, e, { err: T("La dictée n’est pas disponible ici : utilise les boutons et le temps.") })); return; }
      if (e.ecoute) { try { recRef.current && recRef.current.stop(); } catch (x) { } return; }
      var r = new SR(); recRef.current = r; r.lang = "fr-FR"; r.interimResults = true; r.continuous = false; var fin = "";
      r.onresult = function (ev) { var t = ""; for (var k = 0; k < ev.results.length; k++) t += ev.results[k][0].transcript; fin = t; setE(function (x) { return Object.assign({}, x, { dit: t }); }); };
      r.onerror = function () { setE(function (x) { return Object.assign({}, x, { ecoute: false }); }); };
      r.onend = function () {
        setE(function (x) { return Object.assign({}, x, { ecoute: false }); });
        if (!fin) return; var lu = lireTempsEF(fin);
        setSt0(function (s0) { var s1 = Object.assign({}, s0), a = Object.assign({}, s0.saisie || VIDE); a.pen = Object.assign({}, a.pen || {});
          if (lu.etat) a.etat = lu.etat; if (lu.temps != null) a.temps = String(Math.round(lu.temps * 100) / 100); if (lu.f1 != null) a.pen.f1 = lu.f1;
          s1.saisie = a; try { localStorage.setItem(cle, JSON.stringify(s1)); } catch (x) { } return s1; });
        if (!lu.etat && lu.temps == null && lu.f1 == null) setE(function (x) { return Object.assign({}, x, { err: T("Je n’ai rien compris : redis par exemple « 1 minute 12 secondes 30, deux fautes ».") }); });
      };
      setE(Object.assign({}, e, { ecoute: true, dit: "", err: "", msg: "" }));
      try { r.start(); } catch (x) { setE(Object.assign({}, e, { ecoute: false })); }
    }
    async function envoyerDirect(pa, ordre) {
      if (!ctx.agenda_id) return;
      var c = calculEF(pa);
      try {
        var r = await supa.from("jury_passages").upsert({ agenda_id: ctx.agenda_id, discipline: "equifun", epreuve: cfg.epreuve, ordre: ordre >= 0 ? ordre + 1 : null, cavalier: pa.cavalier, cavalier_id: pa.cavalier_id || null, cheval: pa.cheval || "", cheval_id: pa.cheval_id || null,
          equipe: pa.equipe || "", etat: c.etat || "", temps: pa.temps, penalites: Object.assign({}, pa.pen || {}, pa.motif ? { motif: pa.motif } : {}), total: c.total, maj_le: new Date().toISOString() }, { onConflict: "agenda_id,discipline,epreuve,cavalier,cheval" }).select("id");
        if (!r || r.error || !r.data || !r.data.length) throw new Error("x");
        setE(function (x) { return Object.assign({}, x, { direct: "ok" }); });
      } catch (eD) { setE(function (x) { return Object.assign({}, x, { direct: "ko" }); }); }
    }
    function valider() {
      if (!cp) return;
      var pa = { cavalier: cp.cavalier, cheval: cp.cheval, cavalier_id: cp.cavalier_id, cheval_id: cp.cheval_id, equipe: cp.equipe || "", etat: sa.etat || "", motif: sa.etat ? (sa.motif || "") : "", pen: Object.assign({}, sa.pen || {}), temps: sa.temps === "" || sa.temps == null ? null : Number(String(sa.temps).replace(",", ".")) };
      var ps = st.passages.filter(function (x) { return !(x.cavalier === pa.cavalier && x.cheval === pa.cheval); }).concat([pa]);
      var suiv = -1; for (var k = 1; k <= st.couples.length; k++) { var j = (st.cur + k) % st.couples.length; var c2 = st.couples[j]; if (!ps.some(function (x) { return x.cavalier === c2.cavalier && x.cheval === c2.cheval; })) { suiv = j; break; } }
      setSt(Object.assign({}, st, { passages: ps, cur: suiv, saisie: VIDE }));
      setE(Object.assign({}, e, { dit: "", err: "", msg: "✓ " + pa.cavalier + " " + T("est classé.") }));
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (x) { }
      envoyerDirect(pa, st.couples.indexOf(cp));
    }
    function choisir(k) {
      var c = st.couples[k], d = null; st.passages.forEach(function (x) { if (x.cavalier === c.cavalier && x.cheval === c.cheval) d = x; });
      setSt(Object.assign({}, st, { cur: k, saisie: d ? { pen: Object.assign({}, d.pen || {}), temps: d.temps == null ? "" : String(d.temps), etat: d.etat, motif: d.motif || "" } : VIDE }));
      setE(Object.assign({}, e, { dit: "", err: "", msg: "" }));
    }
    function majEquipe(k, v) { var cs = st.couples.slice(); cs[k] = Object.assign({}, cs[k], { equipe: v }); setSt(Object.assign({}, st, { couples: cs })); }
    function resume(x, c) {
      if (c.etat) return ({ "El.": T("Éliminé"), "Ab.": T("Abandon"), "NP": T("Non partant") }[c.etat] || c.etat) + (x.motif ? " · " + T(x.motif) : "");
      return fmtMin(x.temps) + (c.pen ? " + " + c.pen + " s" : " · " + T("sans pénalité"));
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
            epreuve: cfg.epreuve, place: pl, partants: pa, classement: (pl ? (pl === 1 ? "1er" : pl + "e") : c.etat) + " / " + pa,
            penalites: c.etat ? null : String(c.pen), temps: x.temps == null ? null : String(Math.round(x.temps * 100) / 100), mention: (!c.etat && !c.pen) ? "SF" : null,
            cavalier: x.cavalier, cavalier_id: x.cavalier_id || null, cheval_id: x.cheval_id || null, statut: "saisie", visible: true, maj_par: u.id, maj_le: maint };
          var avant = null; deja.forEach(function (d) { if (!avant && ((x.cavalier_id && d.cavalier_id === x.cavalier_id) || (!x.cavalier_id && String(d.cavalier || "").toLowerCase() === String(x.cavalier || "").toLowerCase())) && (!x.cheval_id || !d.cheval_id || d.cheval_id === x.cheval_id)) avant = d; });
          var r = avant ? await supa.from("resultats").update(ligne).eq("id", avant.id).select("id") : await supa.from("resultats").insert(Object.assign({ user_id: u.id, origine: "juge" }, ligne)).select("id");
          if (!r || r.error || !r.data || !r.data.length) throw new Error((r && r.error && r.error.message) || T("enregistrement refusé"));
          n++;
        }
        setE(Object.assign({}, e, { busy: false, ok: false, msg: "✓ " + n + " " + T("résultats publiés : ils apparaissent sur la fiche du concours, les performances et les podiums.") }));
      } catch (eP) { setE(Object.assign({}, e, { busy: false, ok: false, err: T("Publication impossible : ") + String((eP && eP.message) || eP) })); }
    }
    var pod = CL.filter(function (x) { return !x.c.etat; }), EQ = cfg.equipes ? equipesEF(CL) : [];
    var nPen = PEN_EF.length;

    return h("div", { className: "hj" },
      heroV("images/portrait-defaut-noir.webp", retour, T("Jury d’Equifun"), cfg.epreuve, (cfg.equipes ? T("Par équipes") : T("Individuel")) + " · " + st.passages.length + " / " + st.couples.length + " " + T("passés")),
      h("div", { className: "hj-in" },
        h("div", { className: "hj-prog" }, st.couples.map(function (c, k) { var fait = st.passages.some(function (x) { return x.cavalier === c.cavalier && x.cheval === c.cheval; }); return h("i", { key: k, className: k === st.cur ? "c" : (fait ? "f" : "") }); })),
        cp ? h("div", { className: "hj-live" },
          h("div", { className: "hj-row" }, h("span", { className: "hj-pas" }, T("EN PISTE")), h("span", { className: "hj-coef", style: { border: "none" } }, (st.cur + 1) + " / " + st.couples.length)),
          h("div", { style: { marginTop: 12 } }, h("div", { className: "hj-fig", style: { margin: 0 } }, cp.cavalier), h("div", { className: "hj-sous" }, [cp.cheval, cp.equipe ? T("équipe") + " " + cp.equipe : ""].filter(Boolean).join(" · "))),
          h("div", { className: "hj-mic" },
            h("button", { type: "button", className: "hj-rond" + (e.ecoute ? " on" : ""), "aria-label": T("Dicter le résultat"), onClick: dicter },
              h("svg", { width: 30, height: 40, viewBox: "0 0 30 40" }, h("rect", { x: 9, y: 2, width: 12, height: 22, rx: 6, fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6 }), h("path", { d: "M4 18c0 6 5 11 11 11s11-5 11-11M15 29v8M9 37h12", fill: "none", stroke: "#F3EEE4", strokeWidth: 1.6, strokeLinecap: "round" }))),
            h("div", { className: "hj-ecoute" }, e.ecoute ? "● " + T("JE T’ÉCOUTE…") : T("Touche et dis le temps : « 1 minute 12 secondes 30, deux fautes »"))),
          e.dit ? h("div", { className: "hj-dit" }, "« " + e.dit + " »") : null,
          h("div", { className: "hj-res", style: { alignItems: "center" } },
            h("div", { className: "hj-note", style: { fontSize: calc.etat ? 26 : 30 } }, calc.etat ? T("Éliminé") : calc.total != null ? fmtMin(calc.total) : "—", h("small", null, calc.etat ? "" : T("temps retenu"))),
            h("div", { style: { flex: 1 } },
              h("span", { className: "hj-l" }, T("Temps du parcours (secondes)")),
              h("input", { className: "hj-sel", style: { marginTop: 2 }, inputMode: "decimal", value: sa.temps == null ? "" : String(sa.temps).replace(".", ","), placeholder: "72,30", onChange: function (ev) { majSaisie({ temps: ev.target.value.replace(",", ".") }); } }),
              calc.pen ? h("div", { className: "hj-astuce", style: { marginTop: 6 } }, T("dont") + " " + calc.pen + " s " + T("de pénalités")) : null)),
          h("div", { className: "hj-cpts" }, PEN_EF.map(function (x, k) {
            var v = Number((sa.pen || {})[x[0]]) || 0;
            return h("div", { key: x[0], className: "hj-cpt", style: (k === nPen - 1 && nPen % 2 === 1) ? { gridColumn: "1 / -1" } : null },
              h("span", { style: { display: "block", fontSize: 14, lineHeight: 1.35, color: "#F3EEE4", minHeight: 38 } }, T(x[1])),
              h("span", { style: { display: "block", fontSize: 13, color: IV2, marginTop: 2 } }, "+" + x[2] + " s"),
              h("div", { className: "hj-cpt-b" }, h("button", { type: "button", className: "hj-pill", onClick: function () { majPen(x[0], v - 1); } }, "−"), h("b", null, String(v)), h("button", { type: "button", className: "hj-pill", onClick: function () { majPen(x[0], v + 1); } }, "+")));
          })),
          h("div", { className: "hj-l", style: { marginTop: 16 } }, T("Élimination")),
          h("div", { className: "hj-pills", style: { display: "grid", gridTemplateColumns: "1fr 1fr" } }, ELIM_EF.concat(["Abandon"]).map(function (m) {
            var on = m === "Abandon" ? sa.etat === "Ab." : (sa.etat === "El." && sa.motif === m);
            return h("button", { key: m, type: "button", className: "hj-pill" + (on ? " on" : ""), style: { fontSize: 14 }, onClick: function () { if (on) majSaisie({ etat: "", motif: "" }); else majSaisie(m === "Abandon" ? { etat: "Ab.", motif: "" } : { etat: "El.", motif: m }); } }, T(m));
          })),
          e.err ? h("div", { className: "hj-err" }, e.err) : null,
          h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: !sa.etat && (sa.temps === "" || sa.temps == null), onClick: valider }, T("Valider et couple suivant")))) :
          h("div", { className: "hj-live" }, h("div", { className: "hj-fig", style: { margin: 0 } }, T("Tous les couples sont passés")), h("div", { className: "hj-sous", style: { marginTop: 6 } }, T("Vérifie le classement, puis publie-le."))),
        e.msg ? h("div", { className: "hj-msg" }, e.msg) : null,
        e.direct === "ok" ? h("div", { className: "hj-astuce", style: { marginTop: 6 } }, "● " + T("En direct : l’écurie voit le classement sur son téléphone.")) : e.direct === "ko" ? h("div", { className: "hj-err" }, T("Le direct ne passe pas (réseau ?) : le passage est gardé sur ce téléphone.")) : null,
        h("div", { className: "hj-encart" }, h("div", { className: "hj-k" }, T("L’ordre de passage")),
          st.couples.map(function (c, k) {
            var d = null; CL.forEach(function (x) { if (x.cavalier === c.cavalier && x.cheval === c.cheval) d = x; });
            return h("div", { key: k },
              h("div", { className: "hj-li" + (k === st.cur ? " cur" : ""), style: { gridTemplateColumns: "26px 1fr 60px" }, onClick: function () { choisir(k); } },
                h("span", { className: "n" }, String(k + 1)),
                h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, c.cavalier), c.cheval ? " · " + c.cheval : "", h("span", { className: "c" }, d ? resume(d, d.c) : (k === st.cur ? T("en piste") : T("à venir")))),
                h("span", { className: "v", style: { fontSize: 16 } }, d && !d.c.etat ? String(d.place) : "")),
              cfg.equipes ? h("input", { className: "hj-sel", style: { margin: "0 0 10px 36px", width: "calc(100% - 36px)", padding: "9px 12px", fontSize: 15 }, value: c.equipe || "", placeholder: T("Équipe"), onChange: function (ev) { majEquipe(k, ev.target.value); } }) : null);
          }),
          h("div", { className: "hj-l", style: { marginTop: 14 } }, T("Ajouter un couple")),
          h("div", { style: { display: "flex", gap: 8 } },
            h("input", { className: "hj-sel", style: { flex: 1, minWidth: 0 }, value: man.cavalier, placeholder: T("Cavalier"), onChange: function (ev) { setMan(Object.assign({}, man, { cavalier: ev.target.value })); } }),
            h("input", { className: "hj-sel", style: { flex: 1, minWidth: 0 }, value: man.cheval, placeholder: T("Cheval"), onChange: function (ev) { setMan(Object.assign({}, man, { cheval: ev.target.value })); } })),
          h("div", { className: "hj-bas", style: { marginBottom: 10 } }, h("button", { type: "button", className: "hj-btn sec", disabled: !String(man.cavalier).trim(), onClick: function () {
            var cs = st.couples.concat([{ cavalier: man.cavalier.trim(), cheval: man.cheval.trim(), cavalier_id: null, cheval_id: null, equipe: "" }]);
            setSt(Object.assign({}, st, { couples: cs, cur: cs.length - 1, saisie: VIDE })); setMan({ cavalier: "", cheval: "", equipe: "" });
          } }, T("Ajouter")))),
        pod.length ? h("div", null,
          COURBE(),
          h("div", { className: "hj-h2", style: { marginTop: 8 } }, T("Le classement"), h("span", null, cfg.epreuve)),
          pod.length >= 2 ? h("div", { className: "hj-podium" }, [1, 0, 2].filter(function (n) { return pod[n]; }).map(function (n) {
            var o = pod[n];
            return h("div", { key: n, className: "hj-pod" + (o.place === 1 ? " p1" : "") }, h("div", { className: "hj-rang" }, String(o.place)), h("b", null, o.cavalier), h("span", null, o.cheval || ""), h("em", null, fmtMin(o.c.total)), h("span", { style: { marginTop: 2 } }, o.c.pen ? "+" + o.c.pen + " s" : T("sans pénalité")));
          })) : null,
          CL.map(function (o, n) {
            return h("div", { key: n, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "26px 1fr 96px" } },
              h("span", { className: "n" }, o.c.etat ? "–" : String(o.place)),
              h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, o.cavalier), o.cheval ? " · " + o.cheval : "", h("span", { className: "c" }, resume(o, o.c))),
              h("span", { className: "v", style: { fontSize: 16 } }, o.c.etat ? "" : fmtMin(o.c.total)));
          }),
          EQ.length ? h("div", null,
            h("div", { className: "hj-h2", style: { marginTop: 22, fontSize: 26 } }, T("Les équipes")),
            EQ.map(function (t, n) {
              return h("div", { key: n, className: "hj-li", style: { cursor: "default", gridTemplateColumns: "26px 1fr 96px" } },
                h("span", { className: "n" }, t.classee ? String(t.place) : "–"),
                h("span", { className: "t" }, h("b", { style: { fontWeight: 500 } }, t.nom), h("span", { className: "c" }, t.classee ? T("somme des 3 meilleurs temps") : T("pas classée : moins de 3 cavaliers à l’arrivée"))),
                h("span", { className: "v", style: { fontSize: 16 } }, t.classee ? fmtMin(t.total) : ""));
            })) : null,
          h("div", { className: "hj-astuce" }, T("Le plus petit temps (pénalités comprises) gagne ; à égalité, ex æquo (le règlement ne prévoit pas de départage).")),
          ctx.agenda_id ? h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn", disabled: e.busy, onClick: publier }, e.busy ? T("Publication…") : e.ok ? T("Touche encore pour confirmer") : T("Publier le classement"))) : null) : null,
        h("div", { className: "hj-bas" }, h("button", { type: "button", className: "hj-btn sec", onClick: function () { if (!e.efface) { setE(Object.assign({}, e, { efface: true })); return; } try { localStorage.removeItem(cle); } catch (x) { } setE({ ecoute: false, dit: "", msg: "", err: "", busy: false, ok: false }); setSt0(null); } }, e.efface ? T("Touche encore : tout effacer") : T("Nouvelle épreuve"))),
        blocRegl("equifun", reglOuv, function () { setReglOuv(!reglOuv); }),
        h("div", { style: { height: 30 } })));
  }
  /* 14/11 : un seul écran « juger » → reprise de dressage, jury de CSO (mode « cso ») ou règlement (mode « regl ») */
  function Juge() { var m = ""; try { m = (window.__juger || {}).mode || ""; } catch (x) { } return h(m === "cso" ? JuryCSO : m === "regl" ? PageRegl : m === "live" ? PageLive : m === "plan" ? PagePlan : m === "equifun" ? JuryEquifun : EcranJuge); }
  window.HypeJuge = { Juge: Juge, lireNote: lireNote, lireCSO: lireCSO, classerCSO: classerCSO };
})();
