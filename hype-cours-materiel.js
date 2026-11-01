/* HYPE ▸ hype-cours-materiel.js — 01/11/2026 (Blandine, 00h28 « Pour le cours g1 le matériel » + 00h29 « Idem pour la selle »)
   Cours g1-c8 « Le matériel de base » : le licol, le filet et la selle deviennent des photos interactives.
   6 numéros par photo : un tap sur un numéro (ou sur une ligne) surligne la pièce et affiche son nom + une courte explication.
   Les fiches photos d'origine restent dans les données (images/hi/…) : elles sont seulement remplacées à l'affichage.
   Les pièces de la liste d'origine sans numéro sur la photo (plaque nominative, têtière du filet, contre-sanglons, étrier)
   restent affichées en dessous : rien n'est supprimé. Textes dans les 14 langues. */
(function () {
  var VERSION = 4;   /* 01/11 18h55 : ligne choisie plus lisible (fond sombre, titre champagne) */
  /* v3 : */   /* 01/11 18h : téléphone — licol, filet, selle en blocs séparés (bleu pétrole / noir) */
  /* v2 : */   /* 01/11 : selle — n° 6 = l étrier ; l étrivière dans « À connaître aussi » */
  var LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
  function tt() { var o = {}; for (var i = 0; i < LGS.length; i++) o[LGS[i]] = arguments[i]; return o; }
  function pk(o, lg) { return o ? (o[lg] || o.en || o.fr) : ""; }

  var UI = {
    aide: tt("Touche un numéro pour découvrir chaque pièce.", "Tap a number to discover each part.", "Toca un número para descubrir cada pieza.", "Tocca un numero per scoprire ogni parte.", "番号をタップして、それぞれの部分を見てみよう。", "Tippe auf eine Nummer, um jedes Teil zu entdecken.", "اضغط على رقم لتكتشف كل جزء.", "点一个数字，认识每个部件。", "Tik op een nummer om elk onderdeel te ontdekken.", "Toque num número para descobrir cada peça.", "Tryck på en siffra för att upptäcka varje del.", "Нажми на номер, чтобы узнать каждую часть.", "Dotknij numeru, aby poznać każdą część.", "번호를 눌러 각 부분을 알아봐."),
    aussi: tt("À connaître aussi", "Also good to know", "También conviene saber", "Da sapere anche", "これも覚えよう", "Auch gut zu wissen", "يجب معرفته أيضًا", "也要知道", "Ook goed om te weten", "Também é bom saber", "Bra att känna till också", "Также нужно знать", "Warto też wiedzieć", "이것도 알아 두자")
  };

  /* p = [n° , point sur la pièce (x,y), centre du numéro (x,y)] en pixels de l'image ; n° 0 = pas sur la photo */
  var M = {};
  M["images/hi/569e1082ea0d498253fa.jpg"] = {
    img: "images/cours-g1-c8-licol.webp", w: 1045, h: 850,
    titre: tt("Les parties du licol", "The parts of the headcollar", "Las partes de la cabezada de cuadra", "Le parti della cavezza", "無口（むくち）の各部", "Die Teile des Halfters", "أجزاء الرسن", "笼头的各个部分", "De onderdelen van het halster", "As partes do cabresto", "Grimmans delar", "Части недоуздка", "Części kantara", "굴레(홀터)의 각 부분"),
    p: [
      [1, 555, 192, 455, 178, tt("La têtière", "The headpiece", "La testera", "La testiera", "うなじ革", "Das Genickstück", "القطعة العلوية (خلف الأذنين)", "顶革", "Het kopstuk", "A testeira", "Nackstycket", "Нащёчно-затылочный ремень (затылочный)", "Nagłówek", "정수리끈"),
        tt("Elle passe derrière les oreilles.", "It goes behind the ears.", "Pasa por detrás de las orejas.", "Passa dietro le orecchie.", "耳のうしろを通る部分。", "Es verläuft hinter den Ohren.", "تمرّ خلف الأذنين.", "从耳朵后面绕过。", "Het loopt achter de oren langs.", "Passa por trás das orelhas.", "Den går bakom öronen.", "Проходит за ушами.", "Przechodzi za uszami.", "귀 뒤로 지나가는 부분이야.")],
      [2, 550, 318, 453, 307, tt("La boucle de réglage", "The adjusting buckle", "La hebilla de ajuste", "La fibbia di regolazione", "調節用のバックル", "Die Verstellschnalle", "إبزيم الضبط", "调节扣", "De verstelgesp", "A fivela de ajuste", "Justeringsspännet", "Регулировочная пряжка", "Sprzączka regulacyjna", "조절 버클"),
        tt("Elle permet d'ajuster la taille de la têtière.", "It lets you adjust the length of the headpiece.", "Permite ajustar el tamaño de la testera.", "Permette di regolare la misura della testiera.", "うなじ革の長さを合わせるためのもの。", "Damit stellst du die Länge des Genickstücks ein.", "تسمح بضبط طول القطعة العلوية.", "用来调节顶革的长短。", "Hiermee stel je de lengte van het kopstuk in.", "Permite ajustar o tamanho da testeira.", "Med det justerar du nackstyckets längd.", "Позволяет подогнать длину затылочного ремня.", "Pozwala dopasować długość nagłówka.", "정수리끈의 길이를 맞춰 줘.")],
      [3, 577, 492, 500, 470, tt("La sous-gorge", "The throatlatch", "El ahogadero", "Il sottogola", "のど革", "Der Kehlriemen", "حزام الحلق", "喉革", "De keelriem", "A afogadeira", "Halsremmen", "Подшейный ремень", "Podgardle", "목끈"),
        tt("Lanière sous la gorge qui se ferme avec une boucle.", "A strap under the throat that fastens with a buckle.", "Correa bajo la garganta que se cierra con una hebilla.", "Cinghia sotto la gola che si chiude con una fibbia.", "のどの下を通り、バックルでとめる革。", "Riemen unter der Kehle, der mit einer Schnalle geschlossen wird.", "حزام تحت الحلق يُغلق بإبزيم.", "从喉部下方经过、用扣子扣上的皮带。", "Riem onder de keel die met een gesp sluit.", "Correia por baixo da garganta que fecha com uma fivela.", "Rem under halsen som stängs med ett spänne.", "Ремень под горлом, застёгивается на пряжку.", "Pasek pod gardłem zapinany na sprzączkę.", "목 아래를 지나 버클로 잠그는 끈이야.")],
      [4, 938, 551, 1010, 530, tt("La muserolle", "The noseband", "La muserola", "La capezzina", "鼻革", "Der Nasenriemen", "حزام الأنف", "鼻革", "De neusriem", "A focinheira", "Nosgrimmet", "Капсюль (носовой ремень)", "Nachrapnik", "코끈"),
        tt("Lanière qui fait le tour du museau.", "A strap that goes around the muzzle.", "Correa que rodea el hocico.", "Cinghia che fa il giro del muso.", "鼻づらをぐるりと囲む革。", "Riemen, der um das Maul herumführt.", "حزام يلتفّ حول الخطم.", "绕口鼻一圈的皮带。", "Riem die rond de neus loopt.", "Correia que dá a volta ao focinho.", "Rem som går runt mulen.", "Ремень вокруг морды.", "Pasek otaczający pysk.", "주둥이를 한 바퀴 감싸는 끈이야.")],
      [5, 706, 548, 662, 622, tt("Le montant", "The cheekpiece", "La quijera", "Il montante", "ほお革", "Das Backenstück", "القطعة الجانبية (الخدّ)", "颊革", "Het bakstuk", "A face", "Sidostycket", "Нащёчный ремень", "Policzek", "뺨끈"),
        tt("Lanière qui descend de la têtière jusqu'à l'anneau du museau.", "A strap that runs down from the headpiece to the ring on the muzzle.", "Correa que baja de la testera hasta la anilla del hocico.", "Cinghia che scende dalla testiera fino all'anello del muso.", "うなじ革から鼻のリングまでおりる革。", "Riemen vom Genickstück hinunter bis zum Ring am Maul.", "حزام ينزل من القطعة العلوية حتى حلقة الخطم.", "从顶革一直下到口鼻处圆环的皮带。", "Riem die van het kopstuk naar de ring bij de neus loopt.", "Correia que desce da testeira até à argola do focinho.", "Rem som går från nackstycket ner till ringen vid mulen.", "Ремень от затылочного ремня до кольца на морде.", "Pasek biegnący od nagłówka do kółka przy pysku.", "정수리끈에서 주둥이 고리까지 내려오는 끈이야.")],
      [6, 682, 766, 592, 780, tt("L'anneau d'attache", "The tie ring", "La anilla de atar", "L'anello di attacco", "つなぎ用のリング", "Der Anbindering", "حلقة الربط", "拴系环", "De aanbindring", "A argola de prender", "Uppbindningsringen", "Кольцо для привязи", "Kółko do wiązania", "묶는 고리"),
        tt("Anneau sous le museau où s'attache le mousqueton de la longe.", "The ring under the muzzle where the lead rope's clip attaches.", "Anilla bajo el hocico donde se engancha el mosquetón del ramal.", "Anello sotto il muso dove si aggancia il moschettone della lunghina.", "鼻の下にあるリングで、引き手のフックをつける。", "Ring unter dem Maul, in den der Karabiner des Führstricks eingehakt wird.", "حلقة تحت الخطم يُعلَّق فيها مشبك حبل القيادة.", "口鼻下方的圆环，用来扣牵绳的钩子。", "Ring onder de neus waar de musketonhaak van het touw aan vastgaat.", "Argola por baixo do focinho onde se prende o mosquetão da guia.", "Ring under mulen där grimskaftets hake fästs.", "Кольцо под мордой, к которому пристёгивается карабин чомбура.", "Kółko pod pyskiem, do którego przypina się karabińczyk uwiązu.", "주둥이 아래 고리로, 리드줄의 고리를 걸어.")],
      [0, 0, 0, 0, 0, tt("La plaque nominative", "The name plate", "La placa con el nombre", "La targhetta col nome", "名前プレート", "Das Namensschild", "لوحة الاسم", "名牌", "Het naamplaatje", "A placa com o nome", "Namnbrickan", "Именная табличка", "Tabliczka z imieniem", "이름표"),
        tt("Plaque sur laquelle est inscrit le nom du cheval.", "A plate engraved with the horse's name.", "Placa en la que está escrito el nombre del caballo.", "Targhetta su cui è scritto il nome del cavallo.", "馬の名前が書かれたプレート。", "Schild, auf dem der Name des Pferdes steht.", "لوحة مكتوب عليها اسم الحصان.", "写着马名字的小牌。", "Plaatje met de naam van het paard erop.", "Placa onde está escrito o nome do cavalo.", "Bricka med hästens namn.", "Табличка с именем лошади.", "Tabliczka z wypisanym imieniem konia.", "말의 이름이 적힌 판이야.")]
    ]
  };
  M["images/hi/1e680b10c70084ffedc9.jpg"] = {
    img: "images/cours-g1-c8-filet.webp", w: 824, h: 605,
    titre: tt("Les parties du filet", "The parts of the bridle", "Las partes de la cabezada", "Le parti della briglia", "頭絡（とうらく）の各部", "Die Teile der Trense", "أجزاء اللجام", "水勒的各个部分", "De onderdelen van het hoofdstel", "As partes da cabeçada", "Tränsets delar", "Части уздечки", "Części ogłowia", "굴레의 각 부분"),
    p: [
      [1, 368, 155, 303, 148, tt("Le frontal", "The browband", "La frontalera", "Il frontalino", "額革", "Der Stirnriemen", "حزام الجبهة", "额革", "De frontriem", "A testeira frontal", "Pannbandet", "Налобный ремень", "Naczółek", "이마끈"),
        tt("Partie située sur le front, entre les oreilles.", "The part across the forehead, between the ears.", "Parte situada en la frente, entre las orejas.", "Parte che si trova sulla fronte, tra le orecchie.", "額の上、耳と耳のあいだにある部分。", "Teil auf der Stirn, zwischen den Ohren.", "جزء يقع على الجبهة بين الأذنين.", "位于额头、两耳之间的部分。", "Deel op het voorhoofd, tussen de oren.", "Parte situada na testa, entre as orelhas.", "Del som sitter över pannan, mellan öronen.", "Ремень на лбу, между ушами.", "Część na czole, między uszami.", "이마 위, 두 귀 사이에 있는 부분이야.")],
      [2, 385, 270, 323, 263, tt("Les montants", "The cheekpieces", "Las quijeras", "I montanti", "ほお革", "Die Backenstücke", "القطع الجانبية (الخدّان)", "颊革", "De bakstukken", "As faces", "Sidostyckena", "Нащёчные ремни", "Policzki", "뺨끈"),
        tt("Lanières qui descendent de la têtière jusqu'au mors, de chaque côté.", "Straps running down from the headpiece to the bit, on each side.", "Correas que bajan de la testera hasta el bocado, a cada lado.", "Cinghie che scendono dalla testiera fino all'imboccatura, da ogni lato.", "うなじ革からハミまで、左右におりる革。", "Riemen, die auf beiden Seiten vom Genickstück bis zum Gebiss reichen.", "أحزمة تنزل من القطعة العلوية حتى الشكيمة على كل جانب.", "两侧从顶革一直连到衔铁的皮带。", "Riemen die aan beide kanten van het kopstuk naar het bit lopen.", "Correias que descem da testeira até ao freio, de cada lado.", "Remmar som går från nackstycket ner till bettet på varje sida.", "Ремни с каждой стороны от затылочного ремня до трензеля.", "Paski biegnące z obu stron od nagłówka do wędzidła.", "정수리끈에서 재갈까지 양쪽으로 내려오는 끈이야.")],
      [3, 633, 370, 695, 368, tt("La muserolle", "The noseband", "La muserola", "La capezzina", "鼻革", "Der Nasenriemen", "حزام الأنف", "鼻革", "De neusriem", "A focinheira", "Nosgrimmet", "Капсюль (носовой ремень)", "Nachrapnik", "코끈"),
        tt("Lanière qui fait le tour du nez du cheval.", "A strap that goes around the horse's nose.", "Correa que rodea la nariz del caballo.", "Cinghia che fa il giro del naso del cavallo.", "馬の鼻をぐるりと囲む革。", "Riemen, der um die Nase des Pferdes führt.", "حزام يلتفّ حول أنف الحصان.", "绕马鼻子一圈的皮带。", "Riem die rond de neus van het paard loopt.", "Correia que dá a volta ao nariz do cavalo.", "Rem som går runt hästens nos.", "Ремень вокруг носа лошади.", "Pasek otaczający nos konia.", "말의 코를 한 바퀴 감싸는 끈이야.")],
      [4, 518, 511, 580, 527, tt("Le mors", "The bit", "El bocado", "L'imboccatura", "ハミ", "Das Gebiss", "الشكيمة (اللجام المعدني)", "衔铁", "Het bit", "O freio", "Bettet", "Трензель (удила)", "Wędzidło", "재갈"),
        tt("Partie que le cheval prend dans la bouche.", "The part the horse holds in its mouth.", "Parte que el caballo lleva en la boca.", "Parte che il cavallo tiene in bocca.", "馬が口にくわえる部分。", "Teil, das das Pferd im Maul trägt.", "الجزء الذي يضعه الحصان في فمه.", "马含在嘴里的部分。", "Deel dat het paard in de mond heeft.", "Parte que o cavalo leva na boca.", "Delen som hästen har i munnen.", "Часть, которую лошадь держит во рту.", "Część, którą koń trzyma w pysku.", "말이 입에 무는 부분이야.")],
      [5, 372, 462, 305, 455, tt("La sous-gorge", "The throatlatch", "El ahogadero", "Il sottogola", "のど革", "Der Kehlriemen", "حزام الحلق", "喉革", "De keelriem", "A afogadeira", "Halsremmen", "Подшейный ремень", "Podgardle", "목끈"),
        tt("Lanière sous la gorge qui empêche le filet de reculer.", "A strap under the throat that stops the bridle sliding back.", "Correa bajo la garganta que impide que la cabezada se deslice hacia atrás.", "Cinghia sotto la gola che impedisce alla briglia di scivolare indietro.", "のどの下を通り、頭絡がうしろにずれないようにする革。", "Riemen unter der Kehle, der verhindert, dass die Trense nach hinten rutscht.", "حزام تحت الحلق يمنع اللجام من الانزلاق إلى الخلف.", "从喉部下方经过、防止水勒向后滑的皮带。", "Riem onder de keel die voorkomt dat het hoofdstel naar achteren schuift.", "Correia por baixo da garganta que impede a cabeçada de escorregar para trás.", "Rem under halsen som hindrar tränset från att glida bakåt.", "Ремень под горлом, не даёт уздечке сползти назад.", "Pasek pod gardłem, który nie pozwala ogłowiu zsunąć się do tyłu.", "목 아래를 지나 굴레가 뒤로 밀리지 않게 해 줘.")],
      [6, 396, 572, 338, 555, tt("Les rênes", "The reins", "Las riendas", "Le redini", "手綱（たづな）", "Die Zügel", "الأعنّة", "缰绳", "De teugels", "As rédeas", "Tyglarna", "Поводья", "Wodze", "고삐"),
        tt("Lanières tenues par le cavalier pour diriger le cheval.", "Straps the rider holds to guide the horse.", "Correas que sujeta el jinete para dirigir al caballo.", "Cinghie tenute dal cavaliere per guidare il cavallo.", "乗り手が持って、馬を導くための革。", "Riemen, die der Reiter hält, um das Pferd zu lenken.", "أحزمة يمسكها الفارس لتوجيه الحصان.", "骑手握着用来引导马的皮带。", "Riemen die de ruiter vasthoudt om het paard te sturen.", "Correias que o cavaleiro segura para dirigir o cavalo.", "Remmar som ryttaren håller för att styra hästen.", "Ремни, которые всадник держит, чтобы управлять лошадью.", "Paski, które jeździec trzyma, by kierować koniem.", "기수가 쥐고 말을 이끄는 끈이야.")],
      [0, 0, 0, 0, 0, tt("La têtière", "The headpiece", "La testera", "La testiera", "うなじ革", "Das Genickstück", "القطعة العلوية (خلف الأذنين)", "顶革", "Het kopstuk", "A testeira", "Nackstycket", "Затылочный ремень", "Nagłówek", "정수리끈"),
        tt("Lanière qui passe derrière les oreilles et maintient le filet en place.", "A strap that goes behind the ears and holds the bridle in place.", "Correa que pasa por detrás de las orejas y mantiene la cabezada en su sitio.", "Cinghia che passa dietro le orecchie e tiene la briglia al suo posto.", "耳のうしろを通り、頭絡をささえる革。", "Riemen hinter den Ohren, der die Trense an ihrem Platz hält.", "حزام يمرّ خلف الأذنين ويثبّت اللجام في مكانه.", "从耳后绕过、把水勒固定住的皮带。", "Riem die achter de oren loopt en het hoofdstel op zijn plaats houdt.", "Correia que passa por trás das orelhas e mantém a cabeçada no lugar.", "Rem som går bakom öronen och håller tränset på plats.", "Ремень за ушами, удерживает уздечку на месте.", "Pasek przechodzący za uszami, który utrzymuje ogłowie na miejscu.", "귀 뒤로 지나가며 굴레를 제자리에 잡아 줘.")]
    ]
  };
  M["images/hi/143661a16a3c66e2350f.jpg"] = {
    img: "images/cours-g1-c8-selle.webp", w: 1000, h: 850,
    titre: tt("Les parties de la selle", "The parts of the saddle", "Las partes de la silla", "Le parti della sella", "鞍（くら）の各部", "Die Teile des Sattels", "أجزاء السرج", "马鞍的各个部分", "De onderdelen van het zadel", "As partes da sela", "Sadelns delar", "Части седла", "Części siodła", "안장의 각 부분"),
    p: [
      [1, 602, 180, 622, 65, tt("Le siège", "The seat", "El asiento", "Il seggio", "座面", "Der Sitz", "المقعد", "鞍座", "De zit", "O assento", "Sitsen", "Сиденье (ленчик)", "Siedzisko", "시트"),
        tt("Partie où le cavalier est assis.", "Where the rider sits.", "Parte donde se sienta el jinete.", "Parte su cui siede il cavaliere.", "乗り手がすわる部分。", "Hier sitzt der Reiter.", "الجزء الذي يجلس عليه الفارس.", "骑手坐的地方。", "Het deel waar de ruiter op zit.", "Parte onde o cavaleiro se senta.", "Där ryttaren sitter.", "Место, где сидит всадник.", "Część, na której siedzi jeździec.", "기수가 앉는 부분이야.")],
      [2, 252, 160, 182, 118, tt("Le pommeau", "The pommel", "El borrén delantero", "Il pomo", "前橋（まえぼね）", "Der Vorderzwiesel", "مقدّمة السرج", "前鞍桥", "De voorboom", "O santo-antónio", "Framvalvet", "Передняя лука", "Przedni łęk", "앞테"),
        tt("Partie avant de la selle, qui délimite l'avant de l'assise.", "The front of the saddle, marking the front of the seat.", "Parte delantera de la silla, que marca el inicio del asiento.", "Parte anteriore della sella, che delimita il davanti del seggio.", "鞍の前の部分で、座面の前のはしになる。", "Vorderer Teil des Sattels, der den Sitz vorne begrenzt.", "الجزء الأمامي من السرج، يحدّ مقدّمة المقعد.", "马鞍前部，是鞍座的前边界。", "Voorkant van het zadel, die de zit aan de voorkant afsluit.", "Parte da frente da sela, que limita a frente do assento.", "Sadelns främre del, som avgränsar sitsen framtill.", "Передняя часть седла, ограничивает сиденье спереди.", "Przednia część siodła, ograniczająca siedzisko z przodu.", "안장의 앞부분으로, 시트의 앞쪽 끝이야.")],
      [3, 858, 128, 935, 115, tt("Le troussequin", "The cantle", "El borrén trasero", "La paletta", "後橋（あとぼね）", "Der Hinterzwiesel", "مؤخّرة السرج", "后鞍桥", "De achterboom", "A patilha", "Bakvalvet", "Задняя лука", "Tylny łęk", "뒤테"),
        tt("Partie arrière haute de la selle.", "The raised back of the saddle.", "Parte trasera y alta de la silla.", "Parte posteriore rialzata della sella.", "鞍のうしろの高くなった部分。", "Hoher hinterer Teil des Sattels.", "الجزء الخلفي المرتفع من السرج.", "马鞍后部翘起的部分。", "Het hoge achterste deel van het zadel.", "Parte de trás, mais alta, da sela.", "Sadelns höga bakre del.", "Высокая задняя часть седла.", "Wysoka tylna część siodła.", "안장 뒤쪽의 높은 부분이야.")],
      [4, 622, 435, 728, 410, tt("Le quartier", "The flap", "El faldón", "Il quartiere", "あおり革", "Das Sattelblatt", "جناح السرج", "鞍翼", "De zadelflap", "A aba", "Sadelbladet", "Крыло седла", "Tybinka", "날개"),
        tt("Partie de la selle sur laquelle le cavalier pose sa jambe.", "The part of the saddle the rider's leg rests on.", "Parte de la silla sobre la que el jinete apoya la pierna.", "Parte della sella su cui il cavaliere appoggia la gamba.", "乗り手が脚をそえる部分。", "Teil des Sattels, an dem das Bein des Reiters liegt.", "جزء السرج الذي يضع عليه الفارس ساقه.", "骑手腿部贴靠的部分。", "Deel van het zadel waar het been van de ruiter tegenaan ligt.", "Parte da sela onde o cavaleiro apoia a perna.", "Den del av sadeln där ryttarens ben vilar.", "Часть седла, на которую всадник кладёт ногу.", "Część siodła, o którą jeździec opiera nogę.", "기수가 다리를 대는 부분이야.")],
      [5, 288, 525, 318, 478, tt("Le taquet", "The knee roll", "El taco", "Il cuscinetto per il ginocchio", "ニーロール", "Die Pausche", "مسند الركبة", "膝托", "Het kniestuk", "O taco", "Knäpelaren", "Упор для колена", "Klocek kolanowy", "니롤(무릎받이)"),
        tt("Petit renfort avant sur lequel le cavalier peut s'appuyer.", "A small padded block at the front the rider can lean the knee against.", "Pequeño refuerzo delantero en el que el jinete puede apoyarse.", "Piccolo rinforzo anteriore su cui il cavaliere può appoggiarsi.", "前にある小さなふくらみで、乗り手がひざを当てられる。", "Kleines Polster vorne, an das sich der Reiter anlehnen kann.", "حشوة أمامية صغيرة يمكن للفارس أن يستند إليها.", "前方的小垫块，骑手可以靠在上面。", "Kleine verdikking aan de voorkant waar de ruiter steun aan heeft.", "Pequeno reforço da frente onde o cavaleiro se pode apoiar.", "Liten förstärkning framtill som ryttaren kan stötta mot.", "Небольшой передний валик, в который может упираться всадник.", "Małe wzmocnienie z przodu, o które jeździec może się oprzeć.", "앞쪽의 작은 받침으로, 기수가 기댈 수 있어.")],
      /* 01/11 (audit ChatGPT confirmé) : le n° 6 de la photo montre l'ÉTRIER métallique, pas l'étrivière */
      [6, 626, 708, 703, 693, tt("L'étrier", "The stirrup", "El estribo", "La staffa", "あぶみ", "Der Steigbügel", "الركاب", "马镫", "De stijgbeugel", "O estribo", "Stigbygeln", "Стремя", "Strzemię", "등자"),
        tt("Pièce dans laquelle le cavalier place son pied.", "The piece the rider puts their foot in.", "Pieza en la que el jinete coloca el pie.", "Pezzo in cui il cavaliere appoggia il piede.", "乗り手が足を入れる金具。", "Teil, in das der Reiter seinen Fuß stellt.", "القطعة التي يضع فيها الفارس قدمه.", "骑手放脚的部件。", "Onderdeel waarin de ruiter zijn voet zet.", "Peça onde o cavaleiro coloca o pé.", "Delen som ryttaren sätter foten i.", "Деталь, в которую всадник ставит ногу.", "Element, w którym jeździec opiera stopę.", "기수가 발을 넣는 부분이야.")],
      [0, 0, 0, 0, 0, tt("Les contre-sanglons", "The girth straps", "Los latiguillos", "I sottopancia (cinghie)", "腹帯止め革", "Die Gurtstrippen", "أحزمة الحزام", "肚带扣带", "De singelstrippen", "As látegos", "Gjordstroppar", "Приструги", "Przystuły", "복대끈"),
        tt("Lanières sous les quartiers qui fixent la sangle.", "Straps under the flaps that hold the girth.", "Correas bajo los faldones que sujetan la cincha.", "Cinghie sotto i quartieri che fissano il sottopancia.", "あおり革の下にあり、腹帯をとめる革。", "Riemen unter den Sattelblättern, an denen der Gurt befestigt wird.", "أحزمة تحت جناحَي السرج تثبّت الحزام.", "鞍翼下面固定肚带的皮带。", "Riemen onder de zadelflappen waaraan de singel vastzit.", "Correias por baixo das abas que prendem a cilha.", "Remmar under sadelbladen som håller gjorden.", "Ремни под крыльями, к которым крепится подпруга.", "Paski pod tybinkami, do których przypina się popręg.", "날개 아래에서 복대를 고정하는 끈이야.")],
      [0, 0, 0, 0, 0, tt("L'étrivière", "The stirrup leather", "La ación", "Lo staffile", "あぶみ革", "Der Steigbügelriemen", "سير الركاب", "镫革", "De stijgbeugelriem", "O loro", "Stigläderet", "Путлище", "Puśliska", "등자끈"),
        tt("Lanière qui relie l'étrier à la selle.", "The strap that connects the stirrup to the saddle.", "Correa que une el estribo a la silla.", "Cinghia che collega la staffa alla sella.", "あぶみと鞍をつなぐ革ひも。", "Riemen, der den Steigbügel mit dem Sattel verbindet.", "سير يربط الركاب بالسرج.", "把马镫连到马鞍上的带子。", "Riem die de stijgbeugel aan het zadel verbindt.", "Correia que liga o estribo à sela.", "Rem som fäster stigbygeln vid sadeln.", "Ремень, соединяющий стремя с седлом.", "Pasek łączący strzemię z siodłem.", "등자를 안장에 연결하는 끈이야.")]
    ]
  };

  var CSS =
    ".hmat{margin:4px 0 6px;color:#efe7d6}" +
    ".hmat .aide{font-size:13px;opacity:.75;margin:0 0 10px}" +
    ".hmat .ph{position:relative;direction:ltr;border-radius:14px;overflow:hidden;border:1px solid rgba(214,180,120,.35);box-shadow:0 10px 30px rgba(0,0,0,.35)}" +
    ".hmat .ph img{display:block;width:100%;height:auto}" +
    /* 01/11 : zone de touche agrandie (au moins 40 px sur téléphone ; 44 px ferait se chevaucher 2 numéros du licol et du filet) */ ".hmat .hs{position:absolute;width:max(9%,40px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:0;background:transparent;cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent}" +
    ".hmat .hs.on{box-shadow:0 0 0 3px #e6c27a,0 0 18px 6px rgba(230,194,122,.75);animation:hmatP 1.6s ease-in-out infinite}" +
    ".hmat .pt{position:absolute;width:7%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(255,226,160,.55) 0,rgba(255,226,160,.18) 45%,transparent 70%);box-shadow:0 0 0 2px rgba(255,226,160,.9);animation:hmatP 1.6s ease-in-out infinite}" +
    "@keyframes hmatP{0%,100%{opacity:1}50%{opacity:.45}}" +
    ".hmat .lst{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}" +
    ".hmat .lst>li{padding:0!important;margin:0!important;list-style:none!important;background:none!important;border:0!important}.hmat .lst>li::before,.hmat .lst>li::marker{content:none!important;display:none!important}" +
    ".hmat .lig{display:flex;align-items:center;gap:12px;width:100%;text-align:start;background:rgba(10,22,24,.72);border:1px solid rgba(214,180,120,.28);border-radius:14px;padding:8px 8px 8px 10px;color:inherit;font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    /* 01/11 18h55 (Blandine : « quand tu sélectionnes un des onglets on le lit mal ») : ligne choisie sur fond sombre, titre champagne, explication ivoire pleine */
    ".hmat .lig.on{border-color:#e6c27a;background:#070A08;box-shadow:0 0 0 1px rgba(230,194,122,.45),0 8px 22px rgba(0,0,0,.45)}" +
    ".hmat .lig.on .nm{color:#E8C98E}.hmat .lig.on .ex{opacity:1;color:#F3EEE4;font-size:14.5px}" +
    ".hmat .num{flex:0 0 auto;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:16px;color:#1a1408;background:#e8d3a6}" +
    ".hmat .lig.on .num{background:#e6c27a}" +
    ".hmat .tx{flex:1;min-width:0}" +
    ".hmat .nm{display:block;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.25}" +
    ".hmat .ex{display:block;font-size:13.5px;line-height:1.4;opacity:.85;margin-top:3px}" +
    ".hmat .mi{flex:0 0 auto;width:84px;height:56px;border-radius:10px;background-repeat:no-repeat;border:1px solid rgba(214,180,120,.3)}" +
    ".hmat .aus{margin:16px 0 6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#d6b478}" +
    ".hmat .lig.z{cursor:default;padding:8px 12px}" +
    "@media (min-width:900px){.hmat .mi{width:96px;height:62px}}" +
    ".hce-mobile-unit.hmat-bloc{margin:18px -16px;padding:22px 16px 20px;border-top:1px solid rgba(201,166,107,.22);border-bottom:1px solid rgba(201,166,107,.22)}" +
    ".hce-mobile-unit.hmat-bloc.pet{background:rgba(16,29,34,.5);box-shadow:inset 0 24px 32px -18px rgba(0,0,0,.75),inset 0 -24px 32px -18px rgba(0,0,0,.75)}" +
    ".hce-mobile-unit.hmat-bloc.noir{background:#070A08}";

  function Module(props) {
    var h = React.createElement, cfg = props.cfg, lg = props.lg || "fr";
    var st = React.useState(1), act = st[0], setAct = st[1];
    /* 01/11 18h (Blandine : « sépare les parties du licol, de la selle et du filet, une bleue une noire une bleue ») :
       sur téléphone, chaque fiche (titre compris) est un bloc à part, fonds alternés bleu pétrole semi-transparent / noir */
    var racine = React.useRef(null);
    React.useEffect(function () {
      try {
        var el = racine.current, bloc = el && el.closest(".hce-mobile-unit"); if (!bloc) return;
        var tous = Array.prototype.slice.call(document.querySelectorAll(".hmat")), i = tous.indexOf(el);
        bloc.classList.add("hmat-bloc", i % 2 ? "noir" : "pet");
      } catch (e) { }
    });
    var nums = cfg.p.filter(function (q) { return q[0] > 0; }), autres = cfg.p.filter(function (q) { return q[0] === 0; });
    var pc = function (v, t) { return (v / t * 100) + "%"; };
    var mini = function (q) {
      var Z = Math.round(cfg.w * 0.3), x = Math.min(Math.max(q[1] - Z / 2, 0), cfg.w - Z), y = Math.min(Math.max(q[2] - Z / 3, 0), cfg.h - Z * 2 / 3);
      return { backgroundImage: "url(" + cfg.img + ")", backgroundSize: (cfg.w / Z * 100) + "% auto", backgroundPosition: (x / (cfg.w - Z) * 100) + "% " + (y / (cfg.h - Z * 2 / 3) * 100) + "%" };
    };
    var courant = nums.filter(function (q) { return q[0] === act; })[0];
    return h("div", { className: "hmat", ref: racine },
      h("style", null, CSS),
      h("p", { className: "aide" }, pk(UI.aide, lg)),
      h("div", { className: "ph" },
        h("img", { src: cfg.img, alt: pk(cfg.titre, lg), loading: "lazy", width: cfg.w, height: cfg.h }),
        courant ? h("span", { className: "pt", style: { left: pc(courant[1], cfg.w), top: pc(courant[2], cfg.h) } }) : null,
        nums.map(function (q) {
          return h("button", { key: q[0], type: "button", className: "hs" + (q[0] === act ? " on" : ""), "aria-label": q[0] + " · " + pk(q[5], lg),
            style: { left: pc(q[3], cfg.w), top: pc(q[4], cfg.h) }, onClick: function () { setAct(q[0]); } });
        })),
      h("ul", { className: "lst" }, nums.map(function (q) {
        var on = q[0] === act;
        return h("li", { key: q[0] }, h("button", { type: "button", className: "lig" + (on ? " on" : ""), "aria-expanded": on, onClick: function () { setAct(q[0]); } },
          h("span", { className: "num" }, q[0]),
          h("span", { className: "tx" }, h("span", { className: "nm" }, pk(q[5], lg)), on ? h("span", { className: "ex" }, pk(q[6], lg)) : null),
          h("span", { className: "mi", style: mini(q), "aria-hidden": "true" })));
      })),
      autres.length ? h("p", { className: "aus" }, pk(UI.aussi, lg)) : null,
      autres.length ? h("ul", { className: "lst" }, autres.map(function (q, i) {
        return h("li", { key: i }, h("div", { className: "lig z" }, h("span", { className: "tx" }, h("span", { className: "nm" }, pk(q[5], lg)), h("span", { className: "ex" }, pk(q[6], lg)))));
      })) : null);
  }

  window.HypeMateriel = {
    version: VERSION,
    /* src d'origine (fiche photo du cours) -> configuration, ou null */
    pour: function (src) { return (src && M[src]) || null; },
    titre: function (src, lg) { var c = M[src]; return c ? pk(c.titre, lg) : null; },
    Module: Module
  };
})();
