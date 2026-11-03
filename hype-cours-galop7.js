/* =====================================================================================
   hype-cours-galop7.js — GALOP 7 (cours + quiz)
   21/10/2026 : séparé de hype-cours-galops-sup.js (Blandine : « sépare les ») pour que chaque Galop ne se
   charge que quand on l'ouvre (voir hypeChargerGalop dans index.html). Table copiée À L'IDENTIQUE.
   À chaque livraison : incrémenter COURS_GALOP7_VERSION ci-dessous ET sa clé ?v= dans HYPE_COURS_FICHIERS (index.html).
   ===================================================================================== */
(function () {
"use strict";
var COURS_GALOP7_VERSION = 7; /* 03/11 : corrections ciblées (relecture ChatGPT) des 16 cours g7n */ /* 02/11 16h56 : branchés */ /* 02/11 16h41 : g7n-03 longe enrênée 30 à 40 min */ /* 02/11 : 16 nouveaux cours g7n-01 … g7n-16 ajoutés à la fin (non branchés) */ /* précédente : 2 — 21/10 : suédois (11e langue) */
var HYPE_IMGS = (typeof window !== "undefined" && window.HYPE_IMGS) || {};
const COURS_GALOP7_FR = [
    {
        id: "g7-c1", icone: "🎯", type: {"fr":"pratique","en":"practical","de":"Praxis","es":"práctico","it":"pratica","ja":"実技","ar":"تطبيقي", "zh": "实践", "nl": "praktijk", "pt": "prática", "sv": "praktik", "ru": "практика", "pl": "praktyczna", "ko": "실습"}, duree: {"fr":"11 min","en":"11 min","es":"11 min","it":"11 min","ja":"11分","de":"11 Min.","ar":"11 دقيقة", "zh": "11 分钟", "nl": "11 min", "pt": "11 min", "sv": "11 min", "ru": "11 мин", "pl": "11 min", "ko": "11분"},
        titre: {"fr":"Le cheval sur la main et la rectitude","en":"Horse on the bit and straightness","es":"El caballo en la mano y la rectitud","it":"Il cavallo in mano e la dirittura","ja":"ハミ受けと真直性","de":"Das Pferd an den Hilfen und die Geraderichtung","ar":"وضع الحصان على اليد والاستقامة", "zh": "上手与端正性", "nl": "Het paard aan het bit en de rechtgerichtheid", "pt": "O cavalo na mão e a retidão", "sv": "Hästen på handen och rakriktning", "ru": "Лошадь на контакте и прямолинейность", "pl": "Koń na wędzidle i prostość", "ko": "말을 손에 가볍게 올리기와 직진성"},
        blocs: [
            { type: "intro", texte: {"fr":"Au Galop 7, on met son cheval sur la main aux trois allures, on le rend rond et bas au pas et au trot, et on recherche la rectitude.","en":"At Galop 7, you put your horse on the bit in all three gaits, make it round and low at walk and trot, and seek straightness.","es":"En el Galop 7, pones a tu caballo en la mano en los tres aires, lo haces redondo y bajo al paso y al trote, y buscas la rectitud.","it":"Al Galop 7 metti il tuo cavallo in mano nelle tre andature, lo fai lavorare rotondo e basso al passo e al trotto e cerchi la dirittura.","ja":"ギャロップ7では、3種の歩法で馬をハミ受けさせ、常歩と速歩で丸く低い姿勢をとらせ、真直性を追求します。","de":"Im Galopp 7 stellst du dein Pferd in allen drei Grundgangarten an die Hilfen, lässt es im Schritt und Trab rund und tief gehen und arbeitest an der Geraderichtung.","ar":"في الغالوب 7، تضعين حصانك على اليد في المشيات الثلاث، وتجعلينه مستديرا ومنخفض الرأس في المشي والخبب، وتسعين إلى تحقيق الاستقامة.", "zh": "在 Galop 7，要让马在三种步伐中上手，在慢步和快步中让它圆润低头，并追求端正性。", "nl": "Bij Galop 7 breng je je paard in drie gangen aan het bit, maak je het rond en laag in stap en draf, en zoek je de rechtgerichtheid.", "pt": "No Galop 7, coloca-se o cavalo na mão nos três andamentos, deixa-se redondo e baixo ao passo e ao trote, e busca-se a retidão.", "sv": "I Galop 7 sätter man sin häst på handen i alla tre gångarterna, gör den rund och låg i skritt och trav, och strävar efter rakriktning.", "ru": "На Galop 7 всадник ставит лошадь на контакт на трёх аллюрах, добивается круглой и низкой формы шагом и рысью и работает над прямолинейностью.", "pl": "Na poziomie Galop 7 ustawiasz konia na wędzidle we wszystkich trzech chodach, sprowadzasz go do pozycji okrągłej i niskiej w stępie i kłusie oraz szukasz prostości.", "ko": "Galop 7에서는 세 가지 걸음으로 말을 재갈에 가볍게 올리고, 평보와 속보에서 둥글고 낮은 자세를 만들고, 직진성을 찾아가요."} },
            { type: "schema", emoji: "🎯", titre: {"fr":"La mise sur la main","en":"Putting the horse on the bit","es":"Poner el caballo en la mano","it":"La messa in mano","ja":"ハミ受けさせる","de":"Das Anlehnen an die Hilfen","ar":"وضع الحصان على اليد", "zh": "上手", "nl": "Aan het bit brengen", "pt": "Colocar o cavalo na mão", "sv": "Anlutningen", "ru": "Постановка на контакт", "pl": "Ustawienie konia na wędzidle", "ko": "재갈에 올리기"}, description: {"fr":"Un cheval sur la main accepte un contact moelleux et constant : il tend son dos, engage les postérieurs sous la masse et place sa nuque comme point le plus haut, le chanfrein proche de la verticale. L'impulsion vient de l'arrière vers la main, jamais l'inverse.","en":"A horse on the bit accepts a soft, steady contact: it lifts its back, engages its hind legs under its body and carries its poll as the highest point, with the nose close to the vertical. Impulsion comes from behind towards the hand, never the other way round.","es":"Un caballo en la mano acepta un contacto suave y constante: estira el dorso, remete los posteriores bajo la masa y coloca la nuca como punto más alto, con el perfil cerca de la vertical. La impulsión va de atrás hacia la mano, nunca al revés.","it":"Un cavallo in mano accetta un contatto morbido e costante: tende il dorso, impegna i posteriori sotto la massa e porta la nuca come punto più alto, con il frontale vicino alla verticale. L'impulso va da dietro verso la mano, mai il contrario.","ja":"ハミ受けした馬は、柔らかく一定したコンタクトを受け入れます。背中を張り、後肢を体の下に踏み込ませ、項（うなじ）を最も高い位置に保ち、鼻梁は垂直に近くなります。推進力は後ろから手へと向かうもので、決してその逆ではありません。","de":"Ein Pferd an den Hilfen nimmt eine weiche, gleichmäßige Anlehnung an: Es wölbt den Rücken auf, tritt mit den Hinterbeinen unter den Schwerpunkt und trägt das Genick als höchsten Punkt, die Stirn-Nasen-Linie nahe der Senkrechten. Der Schwung kommt von hinten zur Hand, niemals umgekehrt.","ar":"الحصان الموضوع على اليد يقبل اتصالا لينا وثابتا: يمد ظهره، ويدخل قائمتيه الخلفيتين تحت جسمه، ويجعل قفاه أعلى نقطة، مع اقتراب جبهته وأنفه من الوضع العمودي. الاندفاع يأتي من الخلف نحو اليد، وليس العكس أبدا.", "zh": "上手的马接受柔和而稳定的接触：它拱起背部，让后肢踏进身体重心之下，把颈后（枕部）放在最高点，鼻梁接近垂直。冲力从后面传向手，绝不能反过来。", "nl": "Een paard dat aan het bit staat, accepteert een soepel en constant contact: het spant zijn rug aan, brengt de achterbenen onder de massa en plaatst zijn nek als hoogste punt, met de neusrug bijna verticaal. De impuls gaat van achter naar de hand, nooit andersom.", "pt": "Um cavalo na mão aceita um contato macio e constante: ele estica o dorso, engaja os posteriores sob a massa e posiciona a nuca como ponto mais alto, com o nariz próximo da vertical. A impulsão vem de trás para a mão, nunca o contrário.", "sv": "En häst i anlutning accepterar en mjuk och jämn kontakt: den spänner ryggen, för bakbenen in under tyngdpunkten och bär nacken som högsta punkt, med nosryggen nära lodlinjen. Framåtbjudningen kommer bakifrån mot handen, aldrig tvärtom.", "ru": "Лошадь на контакте принимает мягкий и постоянный контакт: она поднимает спину, заводит задние ноги под корпус и несёт затылок самой высокой точкой, а носовая линия близка к вертикали. Импульсия идёт сзади к руке, никогда наоборот.", "pl": "Koń na wędzidle akceptuje miękki, stały kontakt: wypręża grzbiet, podstawia zad pod masę ciała i niesie potylicę jako najwyższy punkt, z nosem zbliżonym do pionu. Impulsja płynie od tyłu do ręki, nigdy odwrotnie.", "ko": "재갈에 올라온 말은 부드럽고 일정한 접촉을 받아들여요. 등을 쭉 펴고, 뒷다리를 몸 아래로 들여놓고, 목덜미를 가장 높은 지점으로 두고, 코 앞면이 수직에 가깝게 놓여요. 추진력은 뒤에서 손 쪽으로 오지, 절대 그 반대가 아니에요."} },
            { type: "schema", emoji: "📏", titre: {"fr":"La rectitude","en":"Straightness","es":"La rectitud","it":"La dirittura","ja":"真直性","de":"Die Geraderichtung","ar":"الاستقامة", "zh": "端正性", "nl": "De rechtgerichtheid", "pt": "A retidão", "sv": "Rakriktningen", "ru": "Прямолинейность", "pl": "Prostość", "ko": "직진성"}, description: {"fr":"Un cheval droit aligne ses postérieurs dans la trace de ses antérieurs, sur les lignes droites comme sur les courbes. La rectitude permet une poussée égale des deux postérieurs et conditionne l'équilibre et la qualité des mouvements.","en":"A straight horse places its hind feet in the tracks of its forefeet, on straight lines as well as on curves. Straightness allows both hind legs to push equally and determines balance and the quality of the movements.","es":"Un caballo recto alinea sus posteriores en la huella de sus anteriores, tanto en las líneas rectas como en las curvas. La rectitud permite un empuje igual de ambos posteriores y condiciona el equilibrio y la calidad de los movimientos.","it":"Un cavallo dritto allinea i posteriori sulla traccia degli anteriori, sia sulle linee rette sia sulle curve. La dirittura permette una spinta uguale dei due posteriori e condiziona l'equilibrio e la qualità dei movimenti.","ja":"真っ直ぐな馬は、直線でも曲線でも、後肢を前肢の踏跡に沿わせます。真直性によって左右の後肢が均等に推進でき、それがバランスと運動の質を左右します。","de":"Ein gerades Pferd spurt mit den Hinterbeinen in die Spur der Vorderbeine, auf geraden wie auf gebogenen Linien. Die Geraderichtung ermöglicht eine gleichmäßige Schubkraft beider Hinterbeine und ist die Voraussetzung für Gleichgewicht und Qualität der Lektionen.","ar":"الحصان المستقيم يضع قائمتيه الخلفيتين في أثر قائمتيه الأماميتين، على الخطوط المستقيمة كما على المنحنيات. تتيح الاستقامة دفعا متساويا من القائمتين الخلفيتين، وتحدد التوازن وجودة الحركات.", "zh": "端正的马无论走直线还是弯道，后肢都踩在前肢的轨迹上。端正性让两条后肢的推力均等，决定了平衡和动作的质量。", "nl": "Een recht paard zet zijn achterbenen in het spoor van zijn voorbenen, zowel op rechte lijnen als in bochten. Rechtgerichtheid zorgt voor een gelijke afdruk van beide achterbenen en bepaalt het evenwicht en de kwaliteit van de bewegingen.", "pt": "Um cavalo reto alinha os posteriores na pista dos anteriores, tanto nas linhas retas quanto nas curvas. A retidão permite um impulso igual dos dois posteriores e condiciona o equilíbrio e a qualidade dos movimentos.", "sv": "En rakriktad häst sätter bakbenen i frambenens spår, på raka linjer såväl som på böjda. Rakriktningen ger lika kraftigt tryck från båda bakbenen och avgör balansen och rörelsernas kvalitet.", "ru": "Прямая лошадь ставит задние ноги в след передних — и на прямых линиях, и на дугах. Прямолинейность даёт равный толчок обеих задних ног и определяет равновесие и качество движений.", "pl": "Koń prosty ustawia tylne nogi w śladzie przednich, zarówno na liniach prostych, jak i na łukach. Prostość pozwala na równe odpychanie się obiema tylnymi nogami i decyduje o równowadze oraz jakości ruchów.", "ko": "곧은 말은 직선에서도 곡선에서도 뒷다리를 앞다리가 지난 자리에 맞춰 정렬해요. 직진성이 있으면 양쪽 뒷다리가 고르게 밀어 주고, 균형과 움직임의 질이 좋아져요."} },
            { type: "astuce", texte: {"fr":"On ne met pas un cheval sur la main en tirant sur la bouche : on l'obtient par l'impulsion et l'engagement de l'arrière-main, la main se contentant de recevoir et de canaliser.","en":"You don't put a horse on the bit by pulling on its mouth: you achieve it through impulsion and the engagement of the hindquarters, with the hand simply receiving and channelling.","es":"No se pone a un caballo en la mano tirando de la boca: se consigue mediante la impulsión y el remetimiento del tercio posterior, y la mano se limita a recibir y canalizar.","it":"Non si mette un cavallo in mano tirando sulla bocca: lo si ottiene con l'impulso e l'impegno del posteriore, mentre la mano si limita a ricevere e canalizzare.","ja":"手綱で口を引いて馬をハミ受けさせることはできません。推進力と後躯の踏み込みによって得るもので、手はそれを受け止めて導くだけです。","de":"Man stellt ein Pferd nicht an die Hilfen, indem man am Maul zieht: Man erreicht es durch Schwung und Untertreten der Hinterhand, wobei die Hand nur annimmt und kanalisiert.","ar":"لا يوضع الحصان على اليد بالشد على فمه: بل يتحقق ذلك بالاندفاع وإدخال المؤخرة، بينما تكتفي اليد بالاستقبال والتوجيه.", "zh": "不能靠拉嘴让马上手：要靠冲力和后躯的踏进来获得，手只负责接收和引导。", "nl": "Je brengt een paard niet aan het bit door aan de bek te trekken: je krijgt het door impuls en het onderzetten van de achterhand, terwijl de hand alleen ontvangt en kanaliseert.", "pt": "Não se coloca um cavalo na mão puxando a boca: obtém-se pela impulsão e pelo engajamento do posterior, com a mão apenas recebendo e canalizando.", "sv": "Man får inte en häst i anlutning genom att dra i munnen: man uppnår det med framåtbjudning och underställning av bakdelen, medan handen bara tar emot och leder.", "ru": "Лошадь не ставят на контакт, дёргая за рот: этого добиваются импульсией и заведением задних ног, а рука лишь принимает и направляет.", "pl": "Konia nie ustawia się na wędzidle, ciągnąc za pysk: uzyskuje się to dzięki impulsji i podstawieniu zadu, a ręka tylko przyjmuje i kieruje.", "ko": "입을 당겨서 말을 재갈에 올리는 게 아니에요. 추진력과 후구의 깊은 들어옴으로 얻고, 손은 받아서 흘려 보내기만 해요."} },
        ],
        quiz: [
            { type: "qcm", question: {"fr":"La mise sur la main s'obtient avant tout…","en":"Putting the horse on the bit is achieved above all…","es":"Poner el caballo en la mano se consigue ante todo…","it":"La messa in mano si ottiene prima di tutto…","ja":"ハミ受けが得られるのは、何よりもまず…","de":"Die Anlehnung an die Hilfen erreicht man vor allem …","ar":"يتحقق وضع الحصان على اليد قبل كل شيء…", "zh": "上手首先要靠……", "nl": "Aan het bit brengen krijg je vooral…", "pt": "Colocar o cavalo na mão se obtém antes de tudo…", "sv": "Anlutning får man framför allt…", "ru": "Постановка на контакт достигается прежде всего…", "pl": "Ustawienie konia na wędzidle uzyskuje się przede wszystkim…", "ko": "재갈에 올리기는 무엇보다…"}, options: {"fr":["En tirant sur les rênes","Par l'impulsion et l'engagement des postérieurs","En levant la tête du cheval","En allongeant les rênes"],"en":["By pulling on the reins","Through impulsion and the engagement of the hind legs","By raising the horse's head","By lengthening the reins"],"es":["Tirando de las riendas","Mediante la impulsión y el remetimiento de los posteriores","Levantando la cabeza del caballo","Alargando las riendas"],"it":["Tirando le redini","Con l'impulso e l'impegno dei posteriori","Alzando la testa del cavallo","Allungando le redini"],"ja":["手綱を引くことによって","推進力と後肢の踏み込みによって","馬の頭を上げることによって","手綱を伸ばすことによって"],"de":["durch Ziehen an den Zügeln","durch Schwung und Untertreten der Hinterbeine","durch Anheben des Pferdekopfes","durch Verlängern der Zügel"],"ar":["بالشد على اللجام","بالاندفاع وإدخال القائمتين الخلفيتين","برفع رأس الحصان","بإطالة اللجام"], "zh": ["拉缰绳", "冲力和后肢的踏进", "抬高马的头", "放长缰绳"], "nl": ["Door aan de teugels te trekken", "Door impuls en het onderzetten van de achterbenen", "Door het hoofd van het paard omhoog te brengen", "Door de teugels te verlengen"], "pt": ["Puxando as rédeas", "Pela impulsão e pelo engajamento dos posteriores", "Levantando a cabeça do cavalo", "Alongando as rédeas"], "sv": ["Genom att dra i tyglarna", "Genom framåtbjudning och underställning av bakbenen", "Genom att lyfta hästens huvud", "Genom att förlänga tyglarna"], "ru": ["Натягиванием поводьев", "Импульсией и заведением задних ног", "Поднятием головы лошади", "Удлинением поводьев"], "pl": ["Ciągnąc za wodze", "Dzięki impulsji i podstawieniu zadu", "Podnosząc głowę konia", "Wydłużając wodze"], "ko": ["고삐를 당겨서", "추진력과 뒷다리의 깊은 들어옴으로", "말의 머리를 들어 올려서", "고삐를 늘려서"]}, correct: 1, explication: {"fr":"C'est l'arrière-main qui pousse vers une main qui reçoit : la mise sur la main vient de derrière, jamais de la traction.","en":"The hindquarters push towards a receiving hand: putting the horse on the bit comes from behind, never from pulling.","es":"Es el tercio posterior el que empuja hacia una mano que recibe: poner el caballo en la mano viene de atrás, nunca de la tracción.","it":"È il posteriore che spinge verso una mano che riceve: la messa in mano viene da dietro, mai dalla trazione.","ja":"後躯が、受け止める手に向かって推進します。ハミ受けは後ろから生まれるもので、引っ張ることからは決して生まれません。","de":"Die Hinterhand schiebt zu einer annehmenden Hand hin: Die Anlehnung an die Hilfen kommt von hinten, niemals durch Ziehen.","ar":"المؤخرة هي التي تدفع نحو يد تستقبل: وضع الحصان على اليد يأتي من الخلف، وليس من الشد أبدا.", "zh": "是后躯向着一只接收的手推送：上手来自后面，绝不是靠拉扯。", "nl": "De achterhand duwt naar een hand die ontvangt: aan het bit komen gebeurt van achteren, nooit door trekken.", "pt": "É o posterior que empurra em direção a uma mão que recebe: colocar na mão vem de trás, nunca da tração.", "sv": "Det är bakdelen som skjuter mot en hand som tar emot: anlutningen kommer bakifrån, aldrig av drag.", "ru": "Задняя часть толкает вперёд к принимающей руке: постановка на контакт идёт сзади, а не от натяжения.", "pl": "To zad pcha w kierunku ręki, która przyjmuje: ustawienie na wędzidle bierze się z tyłu, nigdy z ciągnięcia.", "ko": "후구가 받아 주는 손을 향해 밀어 주는 거예요. 재갈에 올리기는 뒤에서 오는 거지, 당겨서 되는 게 아니에요."} },
            { type: "vrai-faux", question: {"fr":"Un cheval droit aligne ses postérieurs dans la trace de ses antérieurs.","en":"A straight horse places its hind feet in the tracks of its forefeet.","es":"Un caballo recto alinea sus posteriores en la huella de sus anteriores.","it":"Un cavallo dritto allinea i posteriori sulla traccia degli anteriori.","ja":"真っ直ぐな馬は、後肢を前肢の踏跡に沿わせます。","de":"Ein gerades Pferd spurt mit den Hinterbeinen in die Spur der Vorderbeine.","ar":"الحصان المستقيم يضع قائمتيه الخلفيتين في أثر قائمتيه الأماميتين.", "zh": "端正的马后肢踩在前肢的轨迹上。", "nl": "Een recht paard zet zijn achterbenen in het spoor van zijn voorbenen.", "pt": "Um cavalo reto alinha os posteriores na pista dos anteriores.", "sv": "En rakriktad häst sätter bakbenen i frambenens spår.", "ru": "Прямая лошадь ставит задние ноги в след передних.", "pl": "Koń prosty ustawia tylne nogi w śladzie przednich.", "ko": "곧은 말은 뒷다리를 앞다리가 지난 자리에 맞춰 정렬해요."}, correct: true, explication: {"fr":"C'est la définition de la rectitude : l'arrière-main suit l'avant-main, ce qui équilibre la poussée.","en":"This is the definition of straightness: the hindquarters follow the forehand, which balances the push.","es":"Es la definición de la rectitud: el tercio posterior sigue al anterior, lo que equilibra el empuje.","it":"È la definizione della dirittura: il posteriore segue l'anteriore, il che equilibra la spinta.","ja":"これが真直性の定義です。後躯が前躯の後に続くことで、推進力のバランスがとれます。","de":"Das ist die Definition der Geraderichtung: Die Hinterhand folgt der Vorhand, wodurch die Schubkraft ausgeglichen wird.","ar":"هذا هو تعريف الاستقامة: المؤخرة تتبع المقدمة، مما يوازن الدفع.", "zh": "这就是端正性的定义：后躯跟随前躯，使推力保持平衡。", "nl": "Dat is de definitie van rechtgerichtheid: de achterhand volgt de voorhand, waardoor de afdruk in evenwicht is.", "pt": "Essa é a definição de retidão: o posterior segue o anterior, o que equilibra o impulso.", "sv": "Det här är definitionen av rakriktning: bakdelen följer framdelen, vilket balanserar trycket.", "ru": "Это определение прямолинейности: задняя часть следует за передней, и толчок получается уравновешенным.", "pl": "To definicja prostości: zad podąża za przodem, co równoważy odpychanie.", "ko": "이것이 직진성의 정의예요. 후구가 전구를 따라가서 미는 힘의 균형이 맞아요."} },
        ],
    },
    {
        id: "g7-c2", icone: "↘️", type: {"fr":"pratique","en":"practical","de":"Praxis","es":"práctico","it":"pratica","ja":"実技","ar":"تطبيقي", "zh": "实践", "nl": "praktijk", "pt": "prática", "sv": "praktik", "ru": "практика", "pl": "praktyczna", "ko": "실습"}, duree: {"fr":"11 min","en":"11 min","es":"11 min","it":"11 min","ja":"11分","de":"11 Min.","ar":"11 دقيقة", "zh": "11 分钟", "nl": "11 min", "pt": "11 min", "sv": "11 min", "ru": "11 мин", "pl": "11 min", "ko": "11분"},
        titre: {"fr":"L'épaule en dedans","en":"Shoulder-in","es":"La espalda adentro","it":"La spalla in dentro","ja":"ショルダーイン","de":"Das Schulterherein","ar":"الكتف إلى الداخل", "zh": "肩内", "nl": "Schouderbinnenwaarts", "pt": "O ombro para dentro", "sv": "Skulder-in", "ru": "Плечо внутрь", "pl": "Łopatka do wewnątrz", "ko": "숄더인"},
        blocs: [
            { type: "intro", texte: {"fr":"L'épaule en dedans est le mouvement latéral phare du Galop 7. On la réalise au pas et au trot, des deux côtés.","en":"Shoulder-in is the key lateral movement of Galop 7. It is ridden at walk and trot, on both reins.","es":"La espalda adentro es el movimiento lateral estrella del Galop 7. Se realiza al paso y al trote, a ambas manos.","it":"La spalla in dentro è il movimento laterale simbolo del Galop 7. Si esegue al passo e al trotto, su entrambe le mani.","ja":"ショルダーインはギャロップ7を代表する側方運動です。常歩と速歩で、左右両手前で行います。","de":"Das Schulterherein ist die zentrale Seitengangslektion im Galopp 7. Man reitet es im Schritt und im Trab, auf beiden Händen.","ar":"الكتف إلى الداخل هي الحركة الجانبية الأبرز في الغالوب 7. تنفذ في المشي والخبب، في الاتجاهين.", "zh": "肩内是 Galop 7 最具代表性的横向动作，要在慢步和快步中向两侧完成。", "nl": "Schouderbinnenwaarts is de belangrijkste zijwaartse oefening van Galop 7. Je rijdt het in stap en draf, naar beide kanten.", "pt": "O ombro para dentro é o movimento lateral de destaque do Galop 7. Faz-se ao passo e ao trote, para os dois lados.", "sv": "Skulder-in är den främsta sidoförflyttningen i Galop 7. Man rider den i skritt och trav, åt båda hållen.", "ru": "Плечо внутрь — главное боковое движение Galop 7. Его выполняют шагом и рысью в обе стороны.", "pl": "Łopatka do wewnątrz to najważniejszy ruch boczny na poziomie Galop 7. Wykonuje się ją w stępie i kłusie, na obie strony.", "ko": "숄더인은 Galop 7의 대표적인 옆걸음 동작이에요. 평보와 속보에서 양쪽으로 해요."} },
            { type: "schema", emoji: "↘️", titre: {"fr":"Qu'est-ce que l'épaule en dedans ?","en":"What is shoulder-in?","es":"¿Qué es la espalda adentro?","it":"Che cos'è la spalla in dentro?","ja":"ショルダーインとは？","de":"Was ist Schulterherein?","ar":"ما هي حركة الكتف إلى الداخل؟", "zh": "什么是肩内？", "nl": "Wat is schouderbinnenwaarts?", "pt": "O que é o ombro para dentro?", "sv": "Vad är skulder-in?", "ru": "Что такое плечо внутрь?", "pl": "Czym jest łopatka do wewnątrz?", "ko": "숄더인이란 무엇일까요?"}, description: {"fr":"Le cheval est légèrement plié autour de la jambe intérieure du cavalier et avance sur trois pistes : les épaules sont rentrées vers l'intérieur tandis que les hanches restent sur la piste. Le cheval regarde à l'opposé de la direction où il se déplace.","en":"The horse is slightly bent around the rider's inside leg and moves on three tracks: the shoulders are brought in while the hips stay on the track. The horse looks away from the direction in which it is moving.","es":"El caballo está ligeramente incurvado alrededor de la pierna interior del jinete y avanza sobre tres pistas: las espaldas entran hacia el interior mientras las caderas permanecen en la pista. El caballo mira en sentido opuesto a la dirección en la que se desplaza.","it":"Il cavallo è leggermente flesso attorno alla gamba interna del cavaliere e avanza su tre piste: le spalle sono portate verso l'interno mentre le anche restano sulla pista. Il cavallo guarda dalla parte opposta alla direzione in cui si sposta.","ja":"馬は騎乗者の内方脚を中心にわずかに屈曲し、3本の蹄跡上を進みます。肩は内側に入り、腰は蹄跡上に残ります。馬は進行方向とは反対側を向いています。","de":"Das Pferd ist leicht um den inneren Schenkel des Reiters gebogen und bewegt sich auf drei Hufschlaglinien: Die Schultern werden nach innen geführt, während die Hüften auf dem Hufschlag bleiben. Das Pferd schaut entgegengesetzt zur Bewegungsrichtung.","ar":"يكون الحصان منحنيا قليلا حول ساق الفارسة الداخلية ويتقدم على ثلاثة مسارات: يدخل الكتفان نحو الداخل بينما يبقى الوركان على المسار. وينظر الحصان في الجهة المعاكسة للاتجاه الذي يتحرك فيه.", "zh": "马围绕骑手的内侧腿微微弯曲，沿三条蹄迹前进：肩膀向内收，而臀部仍留在原来的轨迹上。马的视线朝向与前进方向相反的一侧。", "nl": "Het paard is licht gebogen rond het binnenbeen van de ruiter en gaat op drie sporen: de schouders komen naar binnen terwijl de heupen op het spoor blijven. Het paard kijkt de andere kant op dan de richting waarin het beweegt.", "pt": "O cavalo fica ligeiramente flexionado em torno da perna interna do cavaleiro e avança em três pistas: os ombros são trazidos para dentro enquanto as ancas permanecem na pista. O cavalo olha na direção oposta àquela em que se desloca.", "sv": "Hästen är lätt böjd runt ryttarens innerskänkel och går på tre spår: skuldrorna förs in medan hoppen stannar kvar på spåret. Hästen tittar bort från den riktning den rör sig i.", "ru": "Лошадь слегка изогнута вокруг внутренней ноги всадника и идёт на трёх следах: плечи смещены внутрь, а бёдра остаются на стенке манежа. Лошадь смотрит в сторону, противоположную направлению движения.", "pl": "Koń jest lekko zgięty wokół wewnętrznej łydki jeźdźca i porusza się na trzech śladach: łopatki są wprowadzone do wewnątrz, podczas gdy biodra pozostają na ścianie. Koń patrzy w stronę przeciwną do kierunku, w którym się porusza.", "ko": "말이 기수의 안쪽 다리를 감싸듯 살짝 굽은 채 세 줄의 자국을 그리며 나아가요. 어깨는 안쪽으로 들어오고 엉덩이는 트랙 위에 남아 있어요. 말은 가는 방향의 반대쪽을 바라봐요."} },
            { type: "liste", titre: {"fr":"Pourquoi la travailler","en":"Why work on it","es":"Por qué trabajarla","it":"Perché lavorarla","ja":"練習する理由","de":"Warum man es übt","ar":"لماذا نتدرب عليها", "zh": "为什么要练它", "nl": "Waarom oefenen", "pt": "Por que trabalhá-lo", "sv": "Varför träna den", "ru": "Зачем его отрабатывать", "pl": "Po co ją ćwiczyć", "ko": "왜 연습할까요"}, items: {"fr":["C'est l'exercice d'assouplissement et de rassembler par excellence","Elle engage et muscle l'arrière-main","Elle améliore la rectitude et le contrôle des épaules","Elle prépare les mouvements latéraux plus avancés"],"en":["It is the suppling and collecting exercise par excellence","It engages and builds up the hindquarters","It improves straightness and control of the shoulders","It prepares more advanced lateral movements"],"es":["Es el ejercicio de flexibilización y reunión por excelencia","Remete y muscula el tercio posterior","Mejora la rectitud y el control de las espaldas","Prepara los movimientos laterales más avanzados"],"it":["È l'esercizio di scioglimento e di riunione per eccellenza","Impegna e muscola il posteriore","Migliora la dirittura e il controllo delle spalle","Prepara i movimenti laterali più avanzati"],"ja":["柔軟性を高め、収縮を促す代表的な運動です","後躯を踏み込ませ、筋肉を鍛えます","真直性と肩のコントロールを向上させます","より高度な側方運動への準備になります"],"de":["Sie ist die Lösungs- und Versammlungsübung schlechthin","Sie aktiviert und bemuskelt die Hinterhand","Sie verbessert die Geraderichtung und die Kontrolle der Schultern","Sie bereitet anspruchsvollere Seitengänge vor"],"ar":["إنه تمرين التليين والتجميع بامتياز","يعمل على إدخال المؤخرة وتقوية عضلاتها","يحسن الاستقامة والتحكم في الكتفين","يمهد للحركات الجانبية الأكثر تقدما"], "zh": ["它是放松和集中的首选练习", "它能锻炼后躯并使其踏进、长肌肉", "它能改善端正性和对肩膀的控制", "它为更高级的横向动作做准备"], "nl": ["Het is dé oefening voor soepelheid en verzameling", "Het laat de achterhand onderzetten en bouwt spieren op", "Het verbetert de rechtgerichtheid en de controle over de schouders", "Het bereidt voor op moeilijkere zijwaartse bewegingen"], "pt": ["É o exercício de flexibilização e de reunião por excelência", "Ele engaja e desenvolve a musculatura do posterior", "Ele melhora a retidão e o controle dos ombros", "Ele prepara os movimentos laterais mais avançados"], "sv": ["Det är den bästa övningen för att mjuka upp och samla hästen", "Den får bakdelen att kliva under och bygger muskler", "Den förbättrar rakriktningen och kontrollen över skuldrorna", "Den förbereder mer avancerade sidoförflyttningar"], "ru": ["Это упражнение на расслабление и собранность по преимуществу", "Оно заводит и укрепляет задние ноги", "Оно улучшает прямолинейность и контроль плеч", "Оно готовит к более сложным боковым движениям"], "pl": ["To ćwiczenie rozluźniające i zbierające par excellence", "Angażuje i wzmacnia zad", "Poprawia prostość i kontrolę nad łopatkami", "Przygotowuje do bardziej zaawansowanych ruchów bocznych"], "ko": ["몸을 풀어 주고 집중(수축)시키는 대표적인 운동이에요", "후구를 깊이 들어오게 하고 근육을 키워 줘요", "직진성과 어깨 조절을 좋아지게 해요", "더 어려운 옆걸음 동작을 준비시켜 줘요"]} },
            { type: "astuce", texte: {"fr":"On demande peu d'angle au début : trois pistes bien nettes valent mieux qu'un grand angle désordonné. La régularité de l'allure prime sur l'amplitude du déplacement.","en":"Ask for little angle at first: three clear tracks are better than a big, disorderly angle. The regularity of the gait matters more than the amount of sideways movement.","es":"Al principio pide poco ángulo: tres pistas bien claras valen más que un ángulo grande y desordenado. La regularidad del aire prima sobre la amplitud del desplazamiento.","it":"All'inizio chiedi poco angolo: tre piste ben nette valgono più di un grande angolo disordinato. La regolarità dell'andatura conta più dell'ampiezza dello spostamento.","ja":"最初は角度を小さく求めましょう。乱れた大きな角度よりも、はっきりした3本の蹄跡のほうが大切です。移動の幅よりも歩法の規則正しさが優先されます。","de":"Verlange anfangs nur wenig Abstellung: Drei klare Hufschlaglinien sind besser als ein großer, ungeordneter Winkel. Der gleichmäßige Takt hat Vorrang vor dem Ausmaß der Seitwärtsbewegung.","ar":"اطلبي زاوية صغيرة في البداية: ثلاثة مسارات واضحة أفضل من زاوية كبيرة وغير منتظمة. انتظام المشية أهم من مدى التحرك الجانبي.", "zh": "一开始角度要小：三条清晰的蹄迹，胜过一个很大却混乱的角度。步伐的规律比位移的幅度更重要。", "nl": "Je vraagt in het begin weinig hoek: drie duidelijke sporen zijn beter dan een grote, rommelige hoek. De regelmaat van de gang gaat voor op de grootte van de verplaatsing.", "pt": "No início, pede-se pouco ângulo: três pistas bem nítidas valem mais que um grande ângulo desordenado. A regularidade do andamento vale mais que a amplitude do deslocamento.", "sv": "Man ber om liten vinkel i början: tre tydliga spår är bättre än en stor oordnad vinkel. Gångartens regelbundenhet går före rörelsens omfång.", "ru": "Сначала просят небольшой угол: три чётких следа лучше, чем большой беспорядочный угол. Ровность аллюра важнее величины бокового смещения.", "pl": "Na początku proś o mały kąt: trzy wyraźne ślady są lepsze niż duży, nieuporządkowany kąt. Regularność chodu jest ważniejsza niż wielkość przesunięcia.", "ko": "처음에는 각도를 조금만 요구해요. 큰 각도로 흐트러지는 것보다 세 줄이 또렷한 게 더 좋아요. 이동 폭보다 걸음의 규칙성이 우선이에요."} },
        ],
        quiz: [
            { type: "qcm", question: {"fr":"Dans l'épaule en dedans, le cheval regarde…","en":"In shoulder-in, the horse looks…","es":"En la espalda adentro, el caballo mira…","it":"Nella spalla in dentro, il cavallo guarda…","ja":"ショルダーインでは、馬の視線は…","de":"Im Schulterherein schaut das Pferd…","ar":"في حركة الكتف إلى الداخل، ينظر الحصان…", "zh": "做肩内时，马看向……", "nl": "Bij schouderbinnenwaarts kijkt het paard…", "pt": "No ombro para dentro, o cavalo olha…", "sv": "I skulder-in tittar hästen…", "ru": "В плече внутрь лошадь смотрит…", "pl": "W łopatce do wewnątrz koń patrzy…", "ko": "숄더인에서 말은 어디를 바라볼까요?"}, options: {"fr":["Dans la direction où il avance","À l'opposé de sa direction de déplacement","Vers le bas","Vers le ciel"],"en":["In the direction it is moving","Away from its direction of travel","Down","Up at the sky"],"es":["En la dirección en la que avanza","En sentido contrario a su dirección de desplazamiento","Hacia abajo","Hacia el cielo"],"it":["Nella direzione in cui avanza","In senso opposto alla sua direzione di spostamento","Verso il basso","Verso il cielo"],"ja":["進んでいる方向","進行方向とは反対側","下の方","空の方"],"de":["In die Richtung, in die es sich bewegt","Entgegen seiner Bewegungsrichtung","Nach unten","In den Himmel"],"ar":["في الاتجاه الذي يتقدم فيه","عكس اتجاه تقدمه","إلى الأسفل","نحو السماء"], "zh": ["它前进的方向", "与它位移方向相反的一侧", "下方", "天空"], "nl": ["In de richting waarin het gaat", "Van zijn bewegingsrichting af", "Naar beneden", "Naar de hemel"], "pt": ["Na direção em que avança", "Para o lado oposto à sua direção de deslocamento", "Para baixo", "Para o céu"], "sv": ["I den riktning den går", "Bort från den riktning den rör sig i", "Nedåt", "Mot himlen"], "ru": ["В ту сторону, куда идёт", "В сторону, противоположную направлению движения", "Вниз", "В небо"], "pl": ["W kierunku, w którym idzie", "W stronę przeciwną do kierunku ruchu", "W dół", "W niebo"], "ko": ["나아가는 방향", "이동하는 방향의 반대쪽", "아래쪽", "하늘"]}, correct: 1, explication: {"fr":"Plié autour de la jambe intérieure, le cheval est incurvé à l'opposé de son sens de déplacement, sur trois pistes.","en":"Bent around the inside leg, the horse is flexed away from its direction of travel, on three tracks.","es":"Incurvado alrededor de la pierna interior, el caballo está flexionado en sentido contrario a su dirección de desplazamiento, sobre tres pistas.","it":"Piegato attorno alla gamba interna, il cavallo è incurvato in senso opposto alla sua direzione di spostamento, su tre piste.","ja":"内方脚を中心に屈曲し、馬は進行方向とは反対側に湾曲して、3蹄跡で進みます。","de":"Um den inneren Schenkel gebogen, ist das Pferd entgegen seiner Bewegungsrichtung gestellt, auf drei Hufschlaglinien.","ar":"ينثني الحصان حول الساق الداخلية، فيكون مقوسا عكس اتجاه تقدمه، على ثلاثة مسارات.", "zh": "马围绕内侧腿弯曲，弯向与位移方向相反的一侧，沿三条蹄迹前进。", "nl": "Gebogen rond het binnenbeen is het paard gebogen tegengesteld aan zijn bewegingsrichting, op drie sporen.", "pt": "Flexionado em torno da perna interna, o cavalo fica curvado para o lado oposto ao seu sentido de deslocamento, em três pistas.", "sv": "Böjd runt innerskänkeln är hästen krökt bort från rörelseriktningen, på tre spår.", "ru": "Изогнувшись вокруг внутренней ноги, лошадь согнута в сторону, противоположную направлению движения, на трёх следах.", "pl": "Zgięty wokół wewnętrznej łydki, koń jest ustawiony w stronę przeciwną do kierunku ruchu, na trzech śladach.", "ko": "안쪽 다리를 감싸듯 굽은 말은 이동 방향의 반대쪽으로 휘어 세 줄의 자국을 그려요."} },
        ],
    },
    {
        id: "g7-c3", icone: "🔄", type: {"fr":"pratique","en":"practical","de":"Praxis","es":"práctico","it":"pratica","ja":"実技","ar":"تطبيقي", "zh": "实践", "nl": "praktijk", "pt": "prática", "sv": "praktik", "ru": "практика", "pl": "praktyczna", "ko": "실습"}, duree: {"fr":"10 min","en":"10 min","de":"10 Min.","es":"10 min","it":"10 min","ja":"10分","ar":"10 دقائق", "zh": "10 分钟", "nl": "10 min", "pt": "10 min", "sv": "10 min", "ru": "10 мин", "pl": "10 min", "ko": "10분"},
        titre: {"fr":"Contre-galop et transitions avancées","en":"Counter-canter and advanced transitions","es":"Galope en trocado y transiciones avanzadas","it":"Galoppo rovescio e transizioni avanzate","ja":"反対駈歩と高度な移行","de":"Außengalopp und anspruchsvolle Übergänge","ar":"العدو المعاكس والانتقالات المتقدمة", "zh": "反跑步与高级转换", "nl": "Tegengalop en gevorderde overgangen", "pt": "Contragalope e transições avançadas", "sv": "Kontergalopp och avancerade övergångar", "ru": "Контргалоп и сложные переходы", "pl": "Kontrgalop i zaawansowane przejścia", "ko": "카운터 캔터와 고급 전이"},
        blocs: [
            { type: "intro", texte: {"fr":"Au Galop 7, on part au contre-galop depuis le pas, on réalise des courbes de 20 m au contre-galop, et on enchaîne des transitions galop-pas-galop.","en":"At Galop 7, you strike off into counter-canter from walk, ride 20 m curves in counter-canter, and link canter-walk-canter transitions.","es":"En el Galop 7, sales a galope en trocado desde el paso, haces curvas de 20 m en galope en trocado y encadenas transiciones galope-paso-galope.","it":"Al Galop 7, parti al galoppo rovescio dal passo, esegui curve di 20 m al galoppo rovescio e concateni transizioni galoppo-passo-galoppo.","ja":"ギャロップ7では、常歩から反対駈歩を発進し、反対駈歩で直径20 mの曲線を描き、駈歩・常歩・駈歩の移行を連続して行います。","de":"Im Galopp 7 galoppierst du aus dem Schritt im Außengalopp an, reitest 20-m-Bögen im Außengalopp und verbindest Übergänge Galopp-Schritt-Galopp.","ar":"في الغالوب 7، تنطلقين في العدو المعاكس من المشي، وتنفذين منحنيات بقطر 20 م في العدو المعاكس، وتتابعين انتقالات عدو-مشي-عدو.", "zh": "在 Galop 7，要从慢步起反跑步，在反跑步中做 20 米的弯道，并连续做跑步—慢步—跑步的转换。", "nl": "Bij Galop 7 spring je aan in tegengalop vanuit stap, rijd je volten van 20 m in tegengalop en maak je overgangen galop-stap-galop.", "pt": "No Galop 7, parte-se em contragalope a partir do passo, fazem-se curvas de 20 m em contragalope e encadeiam-se transições galope-passo-galope.", "sv": "I Galop 7 galopperar man av i kontergalopp från skritt, rider 20 m-volter i kontergalopp och kopplar ihop övergångar galopp–skritt–galopp.", "ru": "На Galop 7 всадник начинает контргалоп с шага, выполняет дуги по 20 м в контргалопе и делает переходы галоп–шаг–галоп.", "pl": "Na poziomie Galop 7 zagalopowujesz w kontrgalop ze stępa, jeździsz łuki o średnicy 20 m w kontrgalopie i łączysz przejścia galop-stęp-galop.", "ko": "Galop 7에서는 평보에서 카운터 캔터로 출발하고, 카운터 캔터로 20m 곡선을 돌고, 구보-평보-구보 전이를 이어서 해요."} },
            { type: "liste", titre: {"fr":"Les mouvements du Galop 7","en":"The Galop 7 movements","es":"Los movimientos del Galop 7","it":"I movimenti del Galop 7","ja":"ギャロップ7の運動","de":"Die Lektionen im Galopp 7","ar":"حركات الغالوب 7", "zh": "Galop 7 的动作", "nl": "De bewegingen van Galop 7", "pt": "Os movimentos do Galop 7", "sv": "Rörelserna i Galop 7", "ru": "Движения Galop 7", "pl": "Ruchy na poziomie Galop 7", "ko": "Galop 7의 동작"}, items: {"fr":["Transitions galop-pas-galop sur des points précis, sans étape de trot","Départ au contre-galop à partir du pas","Courbes de 20 m de diamètre maintenues au contre-galop","Reculer de 3 à 5 pas en repartant immédiatement en avant"],"en":["Canter-walk-canter transitions at precise points, with no trot steps","Counter-canter strike-off from walk","20 m diameter curves held in counter-canter","Rein back 3 to 5 steps, then move straight forward again"],"es":["Transiciones galope-paso-galope en puntos precisos, sin pasar por el trote","Salida a galope en trocado desde el paso","Curvas de 20 m de diámetro mantenidas en galope en trocado","Paso atrás de 3 a 5 pasos y salir inmediatamente hacia delante"],"it":["Transizioni galoppo-passo-galoppo su punti precisi, senza passare dal trotto","Partenza al galoppo rovescio dal passo","Curve di 20 m di diametro mantenute al galoppo rovescio","Rinculare di 3-5 passi ripartendo subito in avanti"],"ja":["決められた地点で、速歩を挟まずに駈歩・常歩・駈歩の移行","常歩からの反対駈歩発進","反対駈歩を保ったまま直径20 mの曲線","3〜5歩後退し、すぐに前進に移る"],"de":["Übergänge Galopp-Schritt-Galopp an genauen Punkten, ohne Trabtritte","Angaloppieren im Außengalopp aus dem Schritt","Bögen mit 20 m Durchmesser im Außengalopp beibehalten","3 bis 5 Tritte rückwärtsrichten und sofort wieder vorwärts reiten"],"ar":["انتقالات عدو-مشي-عدو عند نقاط محددة، دون المرور بالخبب","الانطلاق في العدو المعاكس من المشي","منحنيات بقطر 20 م مع المحافظة على العدو المعاكس","الرجوع إلى الخلف من 3 إلى 5 خطوات ثم التقدم فورا إلى الأمام"], "zh": ["在精确的点上做跑步—慢步—跑步的转换，中间不经过快步", "从慢步起反跑步", "在反跑步中保持直径 20 米的弯道", "后退 3 到 5 步，然后立刻重新向前"], "nl": ["Overgangen galop-stap-galop op precieze punten, zonder tussenstap in draf", "Aanspringen in tegengalop vanuit stap", "Bochten van 20 m diameter aanhouden in tegengalop", "3 tot 5 passen achteruit gaan en direct weer vooruit gaan"], "pt": ["Transições galope-passo-galope em pontos precisos, sem passos de trote", "Partida em contragalope a partir do passo", "Curvas de 20 m de diâmetro mantidas em contragalope", "Recuar de 3 a 5 passos e voltar imediatamente para a frente"], "sv": ["Övergångar galopp–skritt–galopp på bestämda punkter, utan travsteg", "Avgalopp i kontergalopp från skritt", "Volter på 20 m diameter hållna i kontergalopp", "Backa 3 till 5 steg och genast gå framåt igen"], "ru": ["Переходы галоп–шаг–галоп в точно заданных местах, без шагов рыси", "Начало контргалопа с шага", "Дуги диаметром 20 м, удерживаемые в контргалопе", "Отступить на 3–5 шагов и сразу снова пойти вперёд"], "pl": ["Przejścia galop-stęp-galop w precyzyjnych punktach, bez kroków kłusa", "Zagalopowanie w kontrgalop ze stępa", "Łuki o średnicy 20 m utrzymane w kontrgalopie", "Cofnąć 3 do 5 kroków i od razu ruszyć z powrotem do przodu"], "ko": ["속보 단계 없이 정해진 지점에서 구보-평보-구보 전이", "평보에서 카운터 캔터로 출발", "지름 20m 곡선을 카운터 캔터로 유지", "3~5걸음 후진한 뒤 곧바로 다시 앞으로 출발"]} },
            { type: "schema", emoji: "🎚️", titre: {"fr":"Galop-pas-galop","en":"Canter-walk-canter","es":"Galope-paso-galope","it":"Galoppo-passo-galoppo","ja":"駈歩・常歩・駈歩","de":"Galopp-Schritt-Galopp","ar":"عدو-مشي-عدو", "zh": "跑步—慢步—跑步", "nl": "Galop-stap-galop", "pt": "Galope-passo-galope", "sv": "Galopp–skritt–galopp", "ru": "Галоп–шаг–галоп", "pl": "Galop-stęp-galop", "ko": "구보-평보-구보"}, description: {"fr":"La transition galop-pas demande un cheval équilibré et porté par l'arrière-main : il passe directement au pas sans trotter. Le départ au galop suivant confirme la disponibilité et la mise en main du cheval. C'est un test d'équilibre et de soumission aux aides.","en":"The canter-walk transition requires a balanced horse carried by its hindquarters: it goes straight into walk without trotting. The following canter strike-off confirms the horse's responsiveness and acceptance of the contact. It is a test of balance and submission to the aids.","es":"La transición galope-paso exige un caballo equilibrado y apoyado en el tercio posterior: pasa directamente al paso sin trotar. La salida a galope siguiente confirma la disponibilidad y la puesta en mano del caballo. Es una prueba de equilibrio y de sumisión a las ayudas.","it":"La transizione galoppo-passo richiede un cavallo equilibrato e portato dal posteriore: passa direttamente al passo senza trottare. La partenza al galoppo successiva conferma la disponibilità e la messa in mano del cavallo. È una prova di equilibrio e di sottomissione agli aiuti.","ja":"駈歩から常歩への移行には、後躯に乗ったバランスのよい馬が必要です。馬は速歩を挟まず、直接常歩に移ります。続く駈歩発進で、馬の反応のよさとハミ受けが確かめられます。これはバランスと扶助への従順さのテストです。","de":"Der Übergang Galopp-Schritt verlangt ein ausbalanciertes Pferd, das von der Hinterhand getragen wird: Es geht direkt in den Schritt, ohne zu traben. Das anschließende Angaloppieren bestätigt die Durchlässigkeit und Anlehnung des Pferdes. Es ist ein Test für Gleichgewicht und Gehorsam gegenüber den Hilfen.","ar":"يتطلب الانتقال من العدو إلى المشي حصانا متوازنا تحمله مؤخرته: فينتقل مباشرة إلى المشي دون أن يخب. ويؤكد الانطلاق التالي في العدو استجابة الحصان وقبوله لليد. إنه اختبار للتوازن وللانقياد للمساعدات.", "zh": "跑步转慢步的转换需要一匹平衡、由后躯承载的马：它不经快步，直接变成慢步。接下来的跑步起步，则证明了马的听从和上手。这是对平衡和服从扶助的考验。", "nl": "De overgang galop-stap vraagt een paard in evenwicht dat door de achterhand gedragen wordt: het gaat direct over naar stap zonder te draven. Het aanspringen daarna bevestigt de beschikbaarheid en de aanleuning van het paard. Het is een test van evenwicht en gehoorzaamheid aan de hulpen.", "pt": "A transição galope-passo exige um cavalo equilibrado e carregado pelo posterior: ele passa direto ao passo sem trotar. A partida no galope seguinte confirma a disponibilidade e a aceitação da mão pelo cavalo. É um teste de equilíbrio e de submissão às ajudas.", "sv": "Övergången galopp–skritt kräver en balanserad häst som bärs av bakdelen: den går direkt till skritt utan att trava. Nästa galoppfattning bekräftar att hästen är tillgänglig och i handen. Det är ett test av balans och lydnad för hjälperna.", "ru": "Переход с галопа на шаг требует уравновешенной лошади, которую несёт задняя часть: она переходит сразу на шаг, не переходя на рысь. Следующий старт в галоп подтверждает отзывчивость лошади и принятие контакта. Это проверка равновесия и подчинения помощам.", "pl": "Przejście galop-stęp wymaga konia zrównoważonego i niesionego przez zad: przechodzi prosto do stępa, bez kłusowania. Następne zagalopowanie potwierdza czujność konia i jego akceptację kontaktu. To test równowagi i podporządkowania pomocom.", "ko": "구보에서 평보로 가는 전이는 균형 잡히고 후구로 몸을 받치는 말이 필요해요. 속보를 거치지 않고 곧장 평보로 넘어가요. 이어지는 구보 출발은 말이 준비돼 있고 손에 올라와 있음을 확인해 줘요. 균형과 부조에 대한 순응을 보여 주는 시험이에요."} },
        ],
        quiz: [
            { type: "vrai-faux", question: {"fr":"La transition galop-pas du Galop 7 passe par une étape de trot.","en":"The Galop 7 canter-walk transition goes through a trot phase.","es":"La transición galope-paso del Galop 7 pasa por una fase de trote.","it":"La transizione galoppo-passo del Galop 7 passa per una fase di trotto.","ja":"ギャロップ7の駈歩から常歩への移行では、途中で速歩を挟む。","de":"Der Übergang Galopp-Schritt im Galopp 7 geht über eine Trabphase.","ar":"يمر الانتقال من العدو إلى المشي في الغالوب 7 بمرحلة خبب.", "zh": "Galop 7 中跑步转慢步的转换要经过一步快步。", "nl": "De overgang galop-stap van Galop 7 gaat via een stap in draf.", "pt": "A transição galope-passo do Galop 7 passa por uma fase de trote.", "sv": "Övergången galopp–skritt i Galop 7 går via ett travsteg.", "ru": "Переход с галопа на шаг на Galop 7 проходит через несколько шагов рыси.", "pl": "Przejście galop-stęp na poziomie Galop 7 przechodzi przez kilka kroków kłusa.", "ko": "Galop 7의 구보에서 평보로의 전이는 속보 단계를 거쳐요."}, correct: false, explication: {"fr":"Elle est directe : du galop au pas sans trotter, ce qui exige équilibre et engagement de l'arrière-main.","en":"It is direct: from canter to walk without trotting, which requires balance and engagement of the hindquarters.","es":"Es directa: del galope al paso sin trotar, lo que exige equilibrio e impulsión del tercio posterior.","it":"È diretta: dal galoppo al passo senza trottare, il che richiede equilibrio e impegno del posteriore.","ja":"移行は直接行います。速歩を挟まずに駈歩から常歩へ移るため、バランスと後躯の踏み込みが求められます。","de":"Er erfolgt direkt: vom Galopp in den Schritt ohne Trabtritte, was Gleichgewicht und eine aktive Hinterhand erfordert.","ar":"إنه انتقال مباشر: من العدو إلى المشي دون خبب، وهو ما يتطلب التوازن وانخراط المؤخرة.", "zh": "是直接转换：从跑步直接到慢步，不经过快步，这需要平衡和后躯的踏进。", "nl": "Ze is direct: van galop naar stap zonder te draven, wat evenwicht en het onderzetten van de achterhand vraagt.", "pt": "Ela é direta: do galope ao passo sem trotar, o que exige equilíbrio e engajamento do posterior.", "sv": "Den är direkt: från galopp till skritt utan att trava, vilket kräver balans och underställning av bakdelen.", "ru": "Он прямой: с галопа на шаг без рыси, что требует равновесия и заведения задних ног.", "pl": "Jest bezpośrednie: z galopu do stępa bez kłusowania, co wymaga równowagi i podstawienia zadu.", "ko": "곧장 이어져요. 속보 없이 구보에서 평보로 가요. 그러려면 균형과 후구의 깊은 들어옴이 필요해요."} },
        ],
    },
    {
        id: "g7-c4", icone: "🎚️", type: {"fr":"soins","en":"care","es":"cuidados","it":"cure","ja":"ケア","de":"Pflege","ar":"عناية", "zh": "护理", "nl": "behandelingen", "pt": "cuidados", "sv": "vårdposter", "ru": "записей", "pl": "zabiegi", "ko": "케어"}, duree: {"fr":"10 min","en":"10 min","de":"10 Min.","es":"10 min","it":"10 min","ja":"10分","ar":"10 دقائق", "zh": "10 分钟", "nl": "10 min", "pt": "10 min", "sv": "10 min", "ru": "10 мин", "pl": "10 min", "ko": "10분"},
        titre: {"fr":"La bride : montage, réglage, action","en":"The double bridle: fitting, adjustment, action","es":"La doble embocadura: montaje, ajuste, acción","it":"La briglia: montaggio, regolazione, azione","ja":"大勒：組み立て、調整、作用","de":"Die Kandare: Verschnallen, Anpassen, Wirkung","ar":"اللجام المزدوج: التركيب، الضبط، التأثير", "zh": "大勒：装配、调整、作用", "nl": "De kandaar: opzetten, instellen, werking", "pt": "A cabeçada de freio e filete: montagem, regulagem, ação", "sv": "Kandaren: sätta ihop, justera, verkan", "ru": "Мундштучное оголовье: сборка, регулировка, действие", "pl": "Ogłowie z dwoma wędzidłami: zakładanie, regulacja, działanie", "ko": "더블 브라이들: 장착, 조절, 작용"},
        blocs: [
            { type: "intro", texte: {"fr":"Au Galop 7, on monte en bride et on sait démonter, remonter et ajuster une bride.","en":"At Galop 7, you ride in a double bridle and know how to take apart, reassemble and adjust one.","es":"En el Galop 7, montas con doble embocadura y sabes desmontarla, volver a montarla y ajustarla.","it":"Al Galop 7, monti in briglia e sai smontare, rimontare e regolare una briglia.","ja":"ギャロップ7では大勒で騎乗し、大勒を分解・組み立て・調整できるようにします。","de":"Im Galopp 7 reitest du auf Kandare und kannst einen Kandarenzaum auseinandernehmen, wieder zusammensetzen und anpassen.","ar":"في الغالوب 7، تركبين باللجام المزدوج وتعرفين كيف تفكينه وتعيدين تركيبه وتضبطينه.", "zh": "在 Galop 7，要会骑大勒，并会拆卸、重新装上和调整大勒。", "nl": "Bij Galop 7 rijd je op kandaar en weet je een kandaar af te doen, weer op te zetten en af te stellen.", "pt": "No Galop 7, monta-se com cabeçada de freio e filete e sabe-se desmontar, remontar e ajustar essa cabeçada.", "sv": "I Galop 7 rider man på kandar och kan ta isär, sätta ihop och justera en kandar.", "ru": "На Galop 7 всадник ездит на мундштучном оголовье и умеет разбирать, собирать и регулировать его.", "pl": "Na poziomie Galop 7 jeździsz na ogłowiu z dwoma wędzidłami i umiesz je rozebrać, złożyć i wyregulować.", "ko": "Galop 7에서는 더블 브라이들로 타고, 더블 브라이들을 벗기고, 다시 씌우고, 조절할 줄 알아요."} },
            { type: "schema", emoji: "🪡", titre: {"fr":"La bride à deux mors","en":"The double bridle with two bits","es":"La doble embocadura con dos bocados","it":"La briglia a due imboccature","ja":"2本のハミを使う大勒","de":"Die Kandare mit zwei Gebissen","ar":"اللجام المزدوج ذو الشكيمتين", "zh": "双衔铁的大勒", "nl": "De kandaar met twee bitten", "pt": "A cabeçada com dois bocais", "sv": "Kandaren med två bett", "ru": "Оголовье с двумя удилами", "pl": "Ogłowie z dwoma wędzidłami", "ko": "재갈이 두 개인 더블 브라이들"}, description: {"fr":"La bride comporte deux mors : le filet (mors de bridon), proche de l'action du filet classique, et le mors de bride (à branches), qui agit par effet de levier sur les barres et la nuque. Le cavalier tient quatre rênes, deux par main, ce qui demande une main très précise.","en":"The double bridle has two bits: the bridoon (snaffle bit), which acts much like a classic snaffle, and the curb bit (with shanks), which acts by leverage on the bars and the poll. The rider holds four reins, two in each hand, which demands a very precise hand.","es":"La doble embocadura tiene dos bocados: el bridón (filete), de acción parecida a la del filete clásico, y el bocado de palanca (con camas), que actúa por efecto de palanca sobre las barras y la nuca. El jinete sujeta cuatro riendas, dos en cada mano, lo que exige una mano muy precisa.","it":"La briglia ha due imboccature: il filetto (filetto da briglia), dall'azione vicina a quella del filetto classico, e il morso (a leve), che agisce per effetto leva sulle barre e sulla nuca. Il cavaliere tiene quattro redini, due per mano, il che richiede una mano molto precisa.","ja":"大勒には2本のハミがあります。通常の水勒に近い作用をする小勒ハミ（ブリドゥーン）と、てこの作用で歯槽間縁と項に働きかける大勒ハミ（シャンク付き）です。騎乗者は片手に2本ずつ、計4本の手綱を持つため、非常に正確な拳が求められます。","de":"Die Kandare hat zwei Gebisse: die Unterlegtrense, die ähnlich wie eine klassische Trense wirkt, und das Kandarengebiss (mit Anzügen), das über Hebelwirkung auf die Laden und das Genick einwirkt. Der Reiter hält vier Zügel, zwei in jeder Hand, was eine sehr feine Hand erfordert.","ar":"يتكون اللجام المزدوج من شكيمتين: الشكيمة البسيطة (شكيمة البريدون)، وتأثيرها قريب من تأثير الشكيمة البسيطة التقليدية، وشكيمة الكبح (ذات الذراعين)، التي تعمل بمفعول الرافعة على لثة الفك وعلى مؤخرة الرأس. تمسك الفارسة أربعة أعنة، اثنين في كل يد، مما يتطلب يدا دقيقة جدا.", "zh": "大勒有两个衔铁：水勒衔铁（小衔铁），作用接近普通水勒；以及大勒衔铁（带长柄），通过杠杆作用于牙床和颈后。骑手手里握四根缰绳，每只手两根，这需要非常精确的手。", "nl": "De kandaar heeft twee bitten: het trensbit (bridon), dicht bij de werking van een gewone trens, en het kandaarbit (met schenkels), dat met een hefboomwerking op de laden en de nek werkt. De ruiter houdt vier teugels vast, twee per hand, wat een heel precieze hand vraagt.", "pt": "Essa cabeçada tem dois bocais: o filete (bridão), próximo da ação do filete clássico, e o freio (de hastes), que age por efeito de alavanca sobre as barras e a nuca. O cavaleiro segura quatro rédeas, duas em cada mão, o que exige uma mão muito precisa.", "sv": "Kandaren har två bett: trensbettet, som liknar en vanlig trens i sin verkan, och kandarbettet (med skänklar), som verkar med hävstångseffekt på käkbenen och nacken. Ryttaren håller fyra tyglar, två i varje hand, vilket kräver en mycket exakt hand.", "ru": "В мундштучном оголовье два удила: трензель (удила трензеля), по действию близкий к обычному трензелю, и мундштук (с рычагами), который действует рычагом на беззубый край и затылок. Всадник держит четыре повода, по два в каждой руке, поэтому нужна очень точная рука.", "pl": "Takie ogłowie ma dwa wędzidła: wędzidło zwykłe (trensa), działające podobnie jak klasyczne wędzidło, oraz munsztuk (z ramionami), który działa na zasadzie dźwigni na bezzębie i potylicę. Jeździec trzyma cztery wodze, po dwie w każdej ręce, co wymaga bardzo precyzyjnej ręki.", "ko": "더블 브라이들에는 재갈이 두 개 있어요. 일반 스내플과 비슷하게 작용하는 빗츠(스내플 재갈)와, 지렛대 효과로 하악과 목덜미에 작용하는 커브 재갈(긴 갈래 달린 재갈)이에요. 기수는 한 손에 두 개씩 고삐 네 개를 잡아서 아주 정교한 손이 필요해요."} },
            { type: "liste", titre: {"fr":"Régler une bride","en":"Adjusting a double bridle","es":"Ajustar una doble embocadura","it":"Regolare una briglia","ja":"大勒の調整","de":"Eine Kandare anpassen","ar":"ضبط اللجام المزدوج", "zh": "调整大勒", "nl": "Een kandaar afstellen", "pt": "Regular a cabeçada de freio e filete", "sv": "Justera en kandar", "ru": "Регулировка мундштучного оголовья", "pl": "Regulacja ogłowia z dwoma wędzidłami", "ko": "더블 브라이들 조절하기"}, items: {"fr":["Le filet vient au-dessus du mors de bride dans la bouche","La gourmette se règle pour agir avec mesure, sans pincer","Hauteur, largeur des mors et muserolle ajustées au cheval","On ne monte en bride qu'avec une main confirmée et indépendante"],"en":["The bridoon sits above the curb bit in the mouth","The curb chain is adjusted to act with restraint, without pinching","Height and width of the bits and the noseband fitted to the horse","Only ride in a double bridle with an established, independent hand"],"es":["El bridón va por encima del bocado en la boca","La barbada se ajusta para actuar con mesura, sin pellizcar","Altura y anchura de los bocados y muserola ajustadas al caballo","Solo se monta con doble embocadura con una mano segura e independiente"],"it":["Il filetto si trova sopra il morso nella bocca","Il barbozzale si regola per agire con misura, senza pizzicare","Altezza e larghezza delle imboccature e capezzina adattate al cavallo","Si monta in briglia solo con una mano esperta e indipendente"],"ja":["口の中で小勒ハミは大勒ハミの上に来る","グルメット（大勒くさり）は挟まずに適度に作用するよう調整する","ハミの高さと幅、鼻革を馬に合わせる","大勒での騎乗は、確かで独立した拳を持ってから"],"de":["Die Unterlegtrense liegt im Maul über dem Kandarengebiss","Die Kinnkette wird so verschnallt, dass sie maßvoll wirkt, ohne zu kneifen","Höhe und Breite der Gebisse sowie das Reithalfter an das Pferd angepasst","Auf Kandare reitet man nur mit einer gefestigten, unabhängigen Hand"],"ar":["تكون الشكيمة البسيطة فوق شكيمة الكبح داخل الفم","تضبط سلسلة الذقن لتعمل باعتدال، دون أن تقرص","ارتفاع الشكيمتين وعرضهما وشريط الأنف مضبوطة حسب الحصان","لا يركب باللجام المزدوج إلا بيد متمرسة ومستقلة"], "zh": ["水勒衔铁位于大勒衔铁上方，放在口中", "下颚链要调整到作用适度，不夹肉", "衔铁的高度、宽度和鼻带都要与马匹相适应", "只有手法稳定、独立的人才能骑大勒"], "nl": ["Het trensbit ligt boven het kandaarbit in de bek", "De kinketting stel je zo af dat hij met mate werkt, zonder te knijpen", "Hoogte, breedte van de bitten en neusriem afgestemd op het paard", "Je rijdt alleen op kandaar met een ervaren en zelfstandige hand"], "pt": ["O filete fica acima do freio dentro da boca", "A barbela é regulada para agir com medida, sem beliscar", "Altura, largura dos bocais e focinheira ajustadas ao cavalo", "Só se monta com freio e filete tendo uma mão experiente e independente"], "sv": ["Trensbettet sitter ovanför kandarbettet i munnen", "Kindkedjan justeras så att den verkar med måtta, utan att nypa", "Höjd, bettens bredd och nosgrimma anpassade efter hästen", "Man rider bara på kandar med en säker och oberoende hand"], "ru": ["Трензель во рту лежит выше мундштука", "Цепочку регулируют так, чтобы она действовала умеренно, не защемляя", "Высота и ширина удил и нащёчный ремень подогнаны под лошадь", "На мундштучном оголовье ездят только с опытной и независимой рукой"], "pl": ["Wędzidło zwykłe znajduje się w pysku nad munsztukiem", "Łańcuszek podbródkowy reguluje się tak, by działał z umiarem, bez uciskania", "Wysokość, szerokość wędzideł i nachrapnik dopasowane do konia", "Na takim ogłowiu jeździ się tylko z pewną i niezależną ręką"], "ko": ["입 안에서 빗츠가 커브 재갈 위에 놓여요", "턱끈은 조이지 않고 적당히 작용하도록 조절해요", "재갈의 높이와 너비, 코밴드를 말에게 맞춰요", "더블 브라이들은 숙련되고 독립적인 손이 있을 때만 타요"]} },
            { type: "astuce", texte: {"fr":"La bride affine la communication mais amplifie aussi les erreurs de main : elle se mérite. On ne l'utilise que lorsque l'assiette est totalement indépendante des mains.","en":"The double bridle refines communication but also amplifies hand errors: it has to be earned. Only use it once the seat is completely independent of the hands.","es":"La doble embocadura afina la comunicación, pero también amplifica los errores de mano: hay que merecerla. Solo se utiliza cuando el asiento es totalmente independiente de las manos.","it":"La briglia affina la comunicazione ma amplifica anche gli errori di mano: bisogna meritarsela. Si usa solo quando l'assetto è totalmente indipendente dalle mani.","ja":"大勒はコミュニケーションを繊細にしますが、拳の誤りも増幅します。大勒は実力で手にするものです。騎座が拳から完全に独立してから使いましょう。","de":"Die Kandare verfeinert die Kommunikation, verstärkt aber auch Fehler der Hand: Man muss sie sich verdienen. Setze sie erst ein, wenn dein Sitz völlig unabhängig von den Händen ist.","ar":"يجعل اللجام المزدوج التواصل أدق، لكنه يضخم أيضا أخطاء اليد: إنه امتياز يكتسب. لا تستعمليه إلا عندما تكون جلستك مستقلة تماما عن يديك.", "zh": "大勒让沟通更细腻，但也会放大手上的错误：它是要靠实力去赢得的。只有当骑坐完全独立于手时才能使用。", "nl": "De kandaar maakt de communicatie fijner, maar versterkt ook de fouten van de hand: je moet hem verdienen. Je gebruikt hem alleen als je zit volledig onafhankelijk is van de handen.", "pt": "A cabeçada de freio e filete refina a comunicação, mas também amplifica os erros de mão: é preciso merecê-la. Só se usa quando o assento está totalmente independente das mãos.", "sv": "Kandaren förfinar kommunikationen men förstärker också handens fel: den måste man förtjäna. Den används bara när sitsen är helt oberoende av händerna.", "ru": "Мундштучное оголовье уточняет общение, но и усиливает ошибки руки: его нужно заслужить. Им пользуются, только когда посадка полностью независима от рук.", "pl": "Ogłowie z dwoma wędzidłami doprecyzowuje porozumienie, ale też wzmacnia błędy ręki: trzeba na nie zasłużyć. Używasz go dopiero wtedy, gdy dosiad jest całkowicie niezależny od rąk.", "ko": "더블 브라이들은 소통을 섬세하게 해 주지만 손의 실수도 키워요. 자격을 갖춰야 쓸 수 있어요. 좌골이 손과 완전히 독립됐을 때만 써요."} },
        ],
        quiz: [
            { type: "qcm", question: {"fr":"Combien de mors comporte une bride ?","en":"How many bits does a double bridle have?","es":"¿Cuántos bocados tiene una doble embocadura?","it":"Quante imboccature ha una briglia?","ja":"大勒にはハミが何本ありますか？","de":"Wie viele Gebisse hat eine Kandare?","ar":"كم شكيمة في اللجام المزدوج؟", "zh": "大勒有几个衔铁？", "nl": "Hoeveel bitten heeft een kandaar?", "pt": "Quantos bocais tem uma cabeçada de freio e filete?", "sv": "Hur många bett har en kandar?", "ru": "Сколько удил в мундштучном оголовье?", "pl": "Ile wędzideł ma ogłowie z dwoma wędzidłami?", "ko": "더블 브라이들에는 재갈이 몇 개 있을까요?"}, options: {"fr":["Un seul","Deux : un filet et un mors de bride","Trois","Aucun"],"en":["Just one","Two: a bridoon and a curb bit","Three","None"],"es":["Solo uno","Dos: un bridón y un bocado","Tres","Ninguno"],"it":["Una sola","Due: un filetto e un morso","Tre","Nessuna"],"ja":["1本だけ","2本：小勒ハミと大勒ハミ","3本","なし"],"de":["Nur eines","Zwei: eine Unterlegtrense und ein Kandarengebiss","Drei","Keines"],"ar":["واحدة فقط","اثنتان: شكيمة بسيطة وشكيمة كبح","ثلاث","ولا واحدة"], "zh": ["只要一只", "两个：一个水勒衔铁和一个大勒衔铁", "三拍", "无"], "nl": ["Maar één", "Twee: een trensbit en een kandaarbit", "Drie", "Geen"], "pt": ["Só um", "Dois: um filete e um freio", "Três", "Nenhum"], "sv": ["Bara en", "Två: ett trensbett och ett kandarbett", "Tre", "Inga"], "ru": ["Только одну", "Двое: трензель и мундштук", "Три", "Нет"], "pl": ["Tylko jedną", "Dwa: wędzidło zwykłe i munsztuk", "Trzech", "Brak"], "ko": ["하나만", "두 개: 빗츠 하나와 커브 재갈 하나", "세 박자", "없음"]}, correct: 1, explication: {"fr":"La bride associe un filet et un mors de bride à branches : le cavalier tient donc quatre rênes.","en":"The double bridle combines a bridoon and a curb bit with shanks: so the rider holds four reins.","es":"La doble embocadura combina un bridón y un bocado con camas: por eso el jinete sujeta cuatro riendas.","it":"La briglia unisce un filetto e un morso a leve: il cavaliere tiene quindi quattro redini.","ja":"大勒は小勒ハミとシャンク付きの大勒ハミを組み合わせたものです。そのため騎乗者は4本の手綱を持ちます。","de":"Die Kandare kombiniert eine Unterlegtrense mit einem Kandarengebiss mit Anzügen: Der Reiter hält daher vier Zügel.","ar":"يجمع اللجام المزدوج بين شكيمة بسيطة وشكيمة كبح ذات ذراعين: لذلك تمسك الفارسة أربعة أعنة.", "zh": "大勒结合了水勒衔铁和带长柄的大勒衔铁：所以骑手要握四根缰绳。", "nl": "De kandaar combineert een trensbit en een kandaarbit met schenkels: de ruiter houdt dus vier teugels vast.", "pt": "Essa cabeçada reúne um filete e um freio de hastes: o cavaleiro segura, portanto, quatro rédeas.", "sv": "Kandaren kombinerar ett trensbett och ett kandarbett med skänklar: ryttaren håller alltså fyra tyglar.", "ru": "Мундштучное оголовье сочетает трензель и мундштук с рычагами: поэтому всадник держит четыре повода.", "pl": "Takie ogłowie łączy wędzidło zwykłe i munsztuk z ramionami: jeździec trzyma więc cztery wodze.", "ko": "더블 브라이들은 빗츠와 갈래 달린 커브 재갈을 함께 써요. 그래서 기수는 고삐 네 개를 잡아요."} },
        ],
    },
    {
        id: "g7-c5", icone: "🎪", type: {"fr":"à pied","en":"groundwork","es":"pie a tierra","it":"da terra","ja":"グランドワーク","de":"Bodenarbeit","ar":"العمل من الأرض", "zh": "徒手", "nl": "grondwerk", "pt": "a pé", "sv": "till fots", "ru": "с земли", "pl": "z ziemi", "ko": "지상"}, duree: {"fr":"9 min","en":"9 min","es":"9 min","it":"9 min","ja":"9分","de":"9 Min.","ar":"9 دقائق", "zh": "9 分钟", "nl": "9 min", "pt": "9 min", "sv": "9 min", "ru": "9 мин", "pl": "9 min", "ko": "9분"},
        titre: {"fr":"Travail à la longe enrêné et longues rênes","en":"Lungeing with side reins and long-reining","es":"Trabajo a la cuerda con riendas auxiliares y riendas largas","it":"Lavoro alla corda con redini ausiliarie e redini lunghe","ja":"補助手綱を使った調馬索運動と長手綱","de":"Longieren mit Hilfszügeln und Arbeit am langen Zügel","ar":"العمل بحبل الترسين مع أعنة مساعدة والأعنة الطويلة", "zh": "带辅助缰的圆圈牵引与长缰绳", "nl": "Longeren met hulpteugels en lange teugels", "pt": "Trabalho na guia com rédeas auxiliares e rédeas longas", "sv": "Longering med hjälptyglar och långtyglar", "ru": "Работа на корде с боковыми вожжами и длинные вожжи", "pl": "Praca na lonży z wypinaczami i długie wodze", "ko": "보조 고삐를 단 론지 운동과 롱레인"},
        blocs: [
            { type: "intro", texte: {"fr":"Au Galop 7, on travaille à la longe un cheval enrêné et on utilise les longues rênes au pas et au trot, en cercle et en ligne droite, en changeant de main.","en":"At Galop 7, you lunge a horse with side reins and use long reins at walk and trot, on a circle and in a straight line, changing rein.","es":"En el Galop 7, trabajas a la cuerda un caballo con riendas auxiliares y usas las riendas largas al paso y al trote, en círculo y en línea recta, cambiando de mano.","it":"Al Galop 7, lavori alla corda un cavallo con redini ausiliarie e usi le redini lunghe al passo e al trotto, in circolo e in linea retta, cambiando di mano.","ja":"ギャロップ7では、補助手綱を付けた馬を調馬索で運動させ、常歩と速歩で、輪乗りと直線で、手前を替えながら長手綱を使います。","de":"Im Galopp 7 longierst du ein Pferd mit Hilfszügeln und arbeitest am langen Zügel im Schritt und Trab, auf dem Zirkel und auf gerader Linie, mit Handwechsel.","ar":"في الغالوب 7، تعملين الحصان بحبل الترسين وهو مزود بأعنة مساعدة، وتستعملين الأعنة الطويلة في المشي والخبب، على دائرة وفي خط مستقيم، مع تغيير الاتجاه.", "zh": "在 Galop 7，要牵引一匹戴辅助缰的马，并在慢步和快步中使用长缰绳，在圆圈和直线上，并且换手。", "nl": "Bij Galop 7 longeer je een paard met hulpteugels en gebruik je de lange teugels in stap en draf, op de cirkel en op de rechte lijn, met handwisselingen.", "pt": "No Galop 7, trabalha-se na guia um cavalo com rédeas auxiliares e usam-se as rédeas longas ao passo e ao trote, em círculo e em linha reta, mudando de mão.", "sv": "I Galop 7 longerar man en häst med hjälptyglar och använder långtyglar i skritt och trav, på cirkel och på rak linje, med handbyten.", "ru": "На Galop 7 всадник работает на корде с лошадью в боковых вожжах и использует длинные вожжи шагом и рысью, по кругу и по прямой, со сменой направления.", "pl": "Na poziomie Galop 7 lonżujesz konia z wypinaczami i używasz długich wodzy w stępie i kłusie, na kole i po linii prostej, zmieniając kierunek.", "ko": "Galop 7에서는 보조 고삐를 단 말을 론지 운동하고, 평보와 속보에서 원과 직선으로, 방향을 바꾸며 롱레인을 써요."} },
            { type: "schema", emoji: "🪢", titre: {"fr":"Un cheval enrêné","en":"A horse in side reins","es":"Un caballo con riendas auxiliares","it":"Un cavallo con redini ausiliarie","ja":"補助手綱を付けた馬","de":"Ein Pferd mit Hilfszügeln","ar":"حصان مزود بأعنة مساعدة", "zh": "戴辅助缰的马", "nl": "Een paard met hulpteugels", "pt": "Um cavalo com rédeas auxiliares", "sv": "En häst med hjälptyglar", "ru": "Лошадь в боковых вожжах", "pl": "Koń z wypinaczami", "ko": "보조 고삐를 단 말"}, description: {"fr":"Un enrênement est un dispositif (élastique, rênes allemandes, gogue…) qui aide à orienter l'attitude du cheval pendant le travail à la longe. Il s'utilise avec discernement : un enrênement mal réglé contraint le cheval au lieu de l'aider.","en":"A training aid is a device (elastic side reins, German reins, gogue…) that helps shape the horse's outline during lungeing. It should be used with discernment: a badly adjusted training aid constrains the horse instead of helping it.","es":"Las riendas auxiliares son un dispositivo (elásticos, riendas alemanas, gogue…) que ayuda a orientar la actitud del caballo durante el trabajo a la cuerda. Se usan con criterio: unas riendas auxiliares mal ajustadas obligan al caballo en lugar de ayudarlo.","it":"Le redini ausiliarie sono un dispositivo (elastici, redini tedesche, gogue…) che aiuta a orientare l'atteggiamento del cavallo durante il lavoro alla corda. Si usano con discernimento: redini ausiliarie mal regolate costringono il cavallo invece di aiutarlo.","ja":"補助手綱とは、調馬索運動中に馬の姿勢を導く助けとなる器具（ゴム手綱、ジャーマンレーン、ゴーグなど）です。使い方には判断力が必要です。調整を誤った補助手綱は、馬を助けるどころか無理を強いてしまいます。","de":"Ein Hilfszügel ist eine Vorrichtung (Gummiausbinder, Schlaufzügel, Gogue…), die hilft, die Haltung des Pferdes beim Longieren zu lenken. Er wird mit Bedacht eingesetzt: Ein falsch verschnallter Hilfszügel zwingt das Pferd, statt ihm zu helfen.","ar":"الأعنة المساعدة أداة (أربطة مطاطية، أعنة ألمانية، غوغ…) تساعد على توجيه وضعية الحصان أثناء العمل بحبل الترسين. تستعمل بتبصر: فالأعنة المساعدة المضبوطة بشكل سيئ تقيد الحصان بدلا من مساعدته.", "zh": "辅助缰是一种装置（橡皮筋、德式缰、戈格……），在圆圈牵引时帮助引导马的姿态。使用时要谨慎：调整不当的辅助缰会束缚马，而不是帮助它。", "nl": "Een hulpteugel is een hulpmiddel (elastiek, Duitse teugels, gogue…) dat helpt de houding van het paard te sturen tijdens het longeren. Je gebruikt hem met beleid: een verkeerd afgestelde hulpteugel dwingt het paard in plaats van het te helpen.", "pt": "Uma rédea auxiliar é um dispositivo (elástico, rédeas alemãs, gogue…) que ajuda a orientar a postura do cavalo durante o trabalho na guia. Deve ser usada com discernimento: uma rédea auxiliar mal regulada constrange o cavalo em vez de ajudá-lo.", "sv": "Hjälptyglar är en anordning (gummiband, tyska tyglar, gogue…) som hjälper till att styra hästens hållning under longeringen. De används med omdöme: felinställda hjälptyglar tvingar hästen i stället för att hjälpa den.", "ru": "Вспомогательные поводья — это приспособление (эластичные боковые вожжи, немецкие вожжи, гог…), которое помогает задать положение лошади во время работы на корде. Ими пользуются с умом: плохо отрегулированные вспомогательные поводья стесняют лошадь вместо того, чтобы помогать.", "pl": "Wypinacz to urządzenie (elastyczne, wodze niemieckie, gogue…), które pomaga kształtować postawę konia podczas pracy na lonży. Używa się go z rozwagą: źle wyregulowany wypinacz krępuje konia zamiast mu pomagać.", "ko": "보조 고삐는 론지 운동 중에 말의 자세를 잡아 주는 도구예요(고무줄, 저먼 레인, 고그 등). 신중하게 써야 해요. 잘못 조절하면 말을 돕기는커녕 옥죄게 돼요."} },
            { type: "liste", titre: {"fr":"Les longues rênes avancées","en":"Advanced long-reining","es":"Las riendas largas avanzadas","it":"Le redini lunghe avanzate","ja":"長手綱の応用","de":"Fortgeschrittene Arbeit am langen Zügel","ar":"الأعنة الطويلة: المستوى المتقدم", "zh": "进阶长缰绳", "nl": "De gevorderde lange teugels", "pt": "As rédeas longas avançadas", "sv": "Avancerade långtyglar", "ru": "Длинные вожжи: продвинутый уровень", "pl": "Zaawansowane długie wodze", "ko": "심화 롱레인"}, items: {"fr":["Diriger au pas et au trot, en cercle et en ligne droite","Se placer de côté ou derrière le cheval, changer de main proprement","Rechercher une mise en main élémentaire depuis le sol","Connaître le but et les effets des principaux enrênements"],"en":["Steer at walk and trot, on a circle and in a straight line","Position yourself beside or behind the horse, change rein cleanly","Seek a basic acceptance of the contact from the ground","Know the purpose and effects of the main training aids"],"es":["Dirigir al paso y al trote, en círculo y en línea recta","Colocarte al lado o detrás del caballo, cambiar de mano con limpieza","Buscar una puesta en mano elemental desde el suelo","Conocer el objetivo y los efectos de las principales riendas auxiliares"],"it":["Dirigere al passo e al trotto, in circolo e in linea retta","Posizionarti di lato o dietro al cavallo, cambiare di mano in modo pulito","Cercare una messa in mano elementare da terra","Conoscere lo scopo e gli effetti delle principali redini ausiliarie"],"ja":["常歩と速歩で、輪乗りと直線で馬を誘導する","馬の横または後ろに立ち、きれいに手前を替える","地上から基本的なハミ受けを求める","主な補助手綱の目的と効果を知る"],"de":["Im Schritt und Trab lenken, auf dem Zirkel und auf gerader Linie","Sich seitlich oder hinter dem Pferd positionieren, sauber die Hand wechseln","Vom Boden aus eine grundlegende Anlehnung erarbeiten","Zweck und Wirkung der wichtigsten Hilfszügel kennen"],"ar":["التوجيه في المشي والخبب، على دائرة وفي خط مستقيم","الوقوف بجانب الحصان أو خلفه، وتغيير الاتجاه بإتقان","السعي إلى قبول أولي لليد انطلاقا من الأرض","معرفة الغرض من أهم الأعنة المساعدة وتأثيراتها"], "zh": ["在慢步和快步中，在圆圈和直线上指引马", "站在马的侧面或后面，干净利落地换手", "在地面上追求基础的上手", "了解主要辅助缰的目的和作用"], "nl": ["Sturen in stap en draf, op de cirkel en op de rechte lijn", "Naast of achter het paard gaan staan, netjes van hand wisselen", "Vanaf de grond een elementaire aanleuning zoeken", "Het doel en de effecten van de belangrijkste hulpteugels kennen"], "pt": ["Dirigir ao passo e ao trote, em círculo e em linha reta", "Posicionar-se ao lado ou atrás do cavalo, mudar de mão com limpeza", "Buscar uma aceitação básica da mão a partir do chão", "Conhecer a finalidade e os efeitos das principais rédeas auxiliares"], "sv": ["Styra i skritt och trav, på cirkel och på rak linje", "Ställa sig vid sidan av eller bakom hästen, byta hand på ett rent sätt", "Söka en enkel anlutning från marken", "Känna till syftet med och effekterna av de viktigaste hjälptyglarna"], "ru": ["Управлять шагом и рысью, по кругу и по прямой", "Становиться сбоку или сзади от лошади, чисто менять направление", "Добиваться начального принятия контакта с земли", "Знать цель и действие основных вспомогательных поводьев"], "pl": ["Kierować w stępie i kłusie, na kole i po linii prostej", "Ustawiać się z boku lub za koniem, czysto zmieniać kierunek", "Szukać podstawowej akceptacji kontaktu z ziemi", "Znać cel i działanie głównych wypinaczy"], "ko": ["평보와 속보에서 원과 직선으로 이끌기", "말의 옆이나 뒤에 서고, 방향을 깔끔하게 바꾸기", "지면에서 기본적인 재갈에 올리기 찾아보기", "주요 보조 고삐의 목적과 효과 알기"]} },
        ],
        quiz: [
            { type: "qcm", question: {"fr":"À quoi sert un enrênement au travail à la longe ?","en":"What is the purpose of a training aid when lungeing?","es":"¿Para qué sirven las riendas auxiliares en el trabajo a la cuerda?","it":"A cosa servono le redini ausiliarie nel lavoro alla corda?","ja":"調馬索運動で補助手綱は何のために使いますか？","de":"Wozu dient ein Hilfszügel beim Longieren?","ar":"ما فائدة الأعنة المساعدة في العمل بحبل الترسين؟", "zh": "辅助缰在圆圈牵引中有什么用？", "nl": "Waar dient een hulpteugel voor bij het longeren?", "pt": "Para que serve uma rédea auxiliar no trabalho na guia?", "sv": "Vad används hjälptyglar till vid longering?", "ru": "Для чего нужны вспомогательные поводья при работе на корде?", "pl": "Do czego służy wypinacz w pracy na lonży?", "ko": "론지 운동에서 보조 고삐는 무엇에 쓸까요?"}, options: {"fr":["À aller plus vite","À aider à orienter l'attitude du cheval","À décorer","À remplacer le mors"],"en":["To go faster","To help shape the horse's outline","For decoration","To replace the bit"],"es":["Para ir más rápido","Para ayudar a orientar la actitud del caballo","Para decorar","Para sustituir el bocado"],"it":["Ad andare più veloce","Ad aiutare a orientare l'atteggiamento del cavallo","A decorare","A sostituire l'imboccatura"],"ja":["速く進むため","馬の姿勢を導く助けとするため","飾りのため","ハミの代わりにするため"],"de":["Um schneller zu werden","Um die Haltung des Pferdes zu formen","Zur Dekoration","Um das Gebiss zu ersetzen"],"ar":["للإسراع أكثر","للمساعدة على توجيه وضعية الحصان","للزينة","لتعويض اللجام الحديدي"], "zh": ["跑得更快", "帮助引导马的姿态", "用来装饰", "替代衔铁"], "nl": ["Om sneller te gaan", "Om de houding van het paard te helpen sturen", "Om te versieren", "Om het bit te vervangen"], "pt": ["Para ir mais rápido", "Para ajudar a orientar a postura do cavalo", "Para decorar", "Para substituir o freio"], "sv": ["För att gå fortare", "För att hjälpa till att styra hästens hållning", "Som dekoration", "För att ersätta bettet"], "ru": ["Чтобы идти быстрее", "Чтобы помогать задавать положение лошади", "Для украшения", "Чтобы заменить удила"], "pl": ["Żeby iść szybciej", "Żeby pomagać kształtować postawę konia", "Do dekoracji", "Żeby zastąpić wędzidło"], "ko": ["더 빨리 가게 하려고", "말의 자세를 잡아 주려고", "장식하려고", "재갈을 대신하려고"]}, correct: 1, explication: {"fr":"L'enrênement aide à orienter l'attitude, à condition d'être bien réglé et utilisé avec discernement.","en":"Auxiliary reins help shape the horse's outline, provided they are correctly adjusted and used with good judgement.","es":"Las riendas auxiliares ayudan a orientar la actitud del caballo, siempre que estén bien ajustadas y se usen con criterio.","it":"Le redini ausiliarie aiutano a orientare l'atteggiamento del cavallo, a patto di essere ben regolate e usate con discernimento.","ja":"補助手綱は、正しく調整され、適切な判断のもとで使われれば、馬の姿勢を導く助けになります。","de":"Hilfszügel helfen, die Haltung des Pferdes zu formen – vorausgesetzt, sie sind richtig verschnallt und werden mit Bedacht eingesetzt.","ar":"تساعد الأعنة المساعدة على توجيه وضعية الحصان، بشرط أن تكون مضبوطة جيدا وأن تستخدم بحكمة.", "zh": "辅助缰有助于引导姿态，前提是调整得当、使用谨慎。", "nl": "De hulpteugel helpt de houding te sturen, op voorwaarde dat hij goed is afgesteld en met beleid wordt gebruikt.", "pt": "A rédea auxiliar ajuda a orientar a postura, desde que seja bem regulada e usada com discernimento.", "sv": "Hjälptyglar hjälper till att styra hållningen, förutsatt att de är rätt inställda och används med omdöme.", "ru": "Вспомогательные поводья помогают задавать положение при условии, что они хорошо отрегулированы и используются с умом.", "pl": "Wypinacz pomaga kształtować postawę, o ile jest dobrze wyregulowany i używany z rozwagą.", "ko": "보조 고삐는 잘 조절하고 신중하게 쓰면 자세를 잡는 데 도움이 돼요."} },
        ],
    },
    {
        id: "g7-c6", icone: "📋", type: {"fr":"théorie","en":"theory","es":"teoría","it":"teoria","ja":"理論","de":"Theorie","ar":"نظري", "zh": "理论", "nl": "theorie", "pt": "teoria", "sv": "teori", "ru": "теория", "pl": "teoria", "ko": "이론"}, duree: {"fr":"10 min","en":"10 min","de":"10 Min.","es":"10 min","it":"10 min","ja":"10分","ar":"10 دقائق", "zh": "10 分钟", "nl": "10 min", "pt": "10 min", "sv": "10 min", "ru": "10 мин", "pl": "10 min", "ko": "10분"},
        titre: {"fr":"Aplombs, rationnement et bien-être","en":"Conformation of the limbs, feeding and welfare","es":"Aplomos, racionamiento y bienestar","it":"Appiombi, razionamento e benessere","ja":"肢勢、飼料設計とウェルフェア","de":"Gliedmaßenstellung, Fütterung und Wohlbefinden","ar":"استقامة الأطراف والتغذية ورفاهية الحصان", "zh": "肢势、饲喂和福利", "nl": "Beenstand, voeding en welzijn", "pt": "Aprumos, alimentação e bem-estar", "sv": "Benställning, utfodring och välmående", "ru": "Постановка конечностей, кормление и благополучие", "pl": "Postawa kończyn, żywienie i dobrostan", "ko": "다리 자세, 급식, 복지"},
        blocs: [
            { type: "intro", texte: {"fr":"Au Galop 7, on identifie les défauts d'aplombs des membres, on explique les grands principes du rationnement et l'impact des transports sur le bien-être.","en":"At Galop 7, you identify faults in the conformation of the limbs, explain the main principles of feeding and the impact of transport on welfare.","es":"En el Galop 7, identificas los defectos de aplomos de las extremidades, explicas los grandes principios del racionamiento y el impacto del transporte en el bienestar.","it":"Al Galop 7 si riconoscono i difetti di appiombo degli arti, si spiegano i grandi principi del razionamento e l'impatto dei trasporti sul benessere.","ja":"ギャロップ7では、肢勢の欠点を見分け、飼料設計の基本原則と輸送がウェルフェアに与える影響を説明します。","de":"Im Galopp 7 erkennst du Fehlstellungen der Gliedmaßen und erklärst die Grundsätze der Fütterung sowie die Auswirkungen des Transports auf das Wohlbefinden.","ar":"في الغالوب 7، تتعرفين على عيوب استقامة الأطراف، وتشرحين المبادئ الكبرى للتغذية وتأثير النقل على رفاهية الحصان.", "zh": "在 Galop 7，要辨认四肢的肢势缺陷，讲解饲喂的主要原则，以及运输对福利的影响。", "nl": "Bij Galop 7 herken je gebreken in de beenstand, leg je de grote principes van het voeren uit en de invloed van transport op het welzijn.", "pt": "No Galop 7, identificam-se os defeitos de aprumo dos membros, explicam-se os grandes princípios da alimentação e o impacto dos transportes no bem-estar.", "sv": "I Galop 7 identifierar man fel i benställningen, förklarar utfodringens grundprinciper och transporternas inverkan på välmåendet.", "ru": "На Galop 7 всадник определяет недостатки постановки конечностей, объясняет основные принципы кормления и влияние перевозок на благополучие.", "pl": "Na poziomie Galop 7 rozpoznajesz wady postawy kończyn, wyjaśniasz główne zasady żywienia i wpływ transportu na dobrostan.", "ko": "Galop 7에서는 다리의 자세 결함을 찾아내고, 급식의 큰 원칙과 운송이 복지에 미치는 영향을 설명해요."} },
            { type: "schema", emoji: "🦵", titre: {"fr":"Les aplombs","en":"Limb conformation","es":"Los aplomos","it":"Gli appiombi","ja":"肢勢","de":"Die Gliedmaßenstellung","ar":"استقامة الأطراف", "zh": "肢势", "nl": "De beenstand", "pt": "Os aprumos", "sv": "Benställningen", "ru": "Постановка конечностей", "pl": "Postawa kończyn", "ko": "다리 자세"}, description: {"fr":"Les aplombs décrivent l'orientation des membres vus de face et de profil. Un bon aplomb répartit le poids correctement. Les défauts (panard, cagneux, membres trop ouverts ou serrés) fatiguent les articulations et peuvent causer des boiteries à l'usage.","en":"Limb conformation describes the alignment of the legs seen from the front and from the side. Good conformation distributes the weight correctly. Faults (toed out, toed in, legs too wide or too close) strain the joints and can cause lameness over time.","es":"Los aplomos describen la orientación de las extremidades vistas de frente y de perfil. Un buen aplomo reparte el peso correctamente. Los defectos (cascos hacia fuera o hacia dentro, extremidades demasiado abiertas o cerradas) fatigan las articulaciones y pueden causar cojeras con el uso.","it":"Gli appiombi descrivono l'orientamento degli arti visti di fronte e di profilo. Un buon appiombo distribuisce correttamente il peso. I difetti (mancino, cagnolo, arti troppo aperti o troppo stretti) affaticano le articolazioni e con l'uso possono causare zoppie.","ja":"肢勢とは、正面および側面から見た肢の向きのことです。良い肢勢は体重を正しく分散させます。欠点(外向肢勢、内向肢勢、肢の開きすぎや狭すぎ)は関節に負担をかけ、使ううちに跛行の原因になることがあります。","de":"Die Gliedmaßenstellung beschreibt die Ausrichtung der Beine von vorn und von der Seite betrachtet. Eine gute Stellung verteilt das Gewicht richtig. Fehlstellungen (zehenweit, zeheneng, zu breit oder zu eng gestellte Beine) belasten die Gelenke und können mit der Zeit zu Lahmheiten führen.","ar":"تصف استقامة الأطراف اتجاه القوائم عند النظر إليها من الأمام ومن الجانب. الاستقامة الجيدة توزع الوزن بشكل صحيح. أما العيوب (انفراج الحوافر إلى الخارج، أو اتجاهها إلى الداخل، أو تباعد القوائم أو تقاربها أكثر من اللازم) فترهق المفاصل وقد تسبب العرج مع الاستعمال.", "zh": "肢势描述的是从正面和侧面看四肢的朝向。好的肢势能让体重分布得当。缺陷（外八字、内八字、四肢过开或过紧）会使关节疲劳，使用久了可能导致跛行。", "nl": "De beenstand beschrijft de stand van de benen van voren en van opzij gezien. Een goede beenstand verdeelt het gewicht goed. Gebreken (hoefwijkend, tenen naar binnen, te wijd of te nauw staande benen) vermoeien de gewrichten en kunnen bij gebruik kreupelheid veroorzaken.", "pt": "Os aprumos descrevem a orientação dos membros vistos de frente e de perfil. Um bom aprumo distribui o peso corretamente. Os defeitos (aberto de pontas, fechado de pontas, membros muito abertos ou muito juntos) cansam as articulações e podem causar claudicações com o uso.", "sv": "Benställningen beskriver benens riktning sedd framifrån och från sidan. En bra benställning fördelar vikten rätt. Felen (tåvid, tåtrång, för vida eller för trånga ben) sliter på lederna och kan med tiden ge hälta.", "ru": "Постановка конечностей описывает положение ног при взгляде спереди и сбоку. Правильная постановка верно распределяет вес. Недостатки (косолапость, плоскостопие, слишком широко или слишком узко поставленные ноги) утомляют суставы и со временем могут вызвать хромоту.", "pl": "Postawa kończyn opisuje ustawienie nóg widzianych z przodu i z boku. Dobra postawa prawidłowo rozkłada ciężar. Wady (szpotawość, koślawość, kończyny zbyt rozstawione lub zbyt zbliżone) przeciążają stawy i z czasem mogą powodować kulawizny.", "ko": "다리 자세는 앞과 옆에서 본 다리의 방향을 말해요. 좋은 자세는 체중을 알맞게 나눠 줘요. 결함(외향 발굽, 내향 발굽, 너무 벌어지거나 좁은 다리)은 관절을 피로하게 하고, 쓰다 보면 절뚝거림이 생길 수 있어요."} },
            { type: "liste", titre: {"fr":"Les principes du rationnement","en":"Principles of feeding","es":"Los principios del racionamiento","it":"I principi del razionamento","ja":"飼料設計の原則","de":"Grundsätze der Fütterung","ar":"مبادئ التغذية", "zh": "饲喂的原则", "nl": "De principes van het voeren", "pt": "Os princípios da alimentação", "sv": "Utfodringens principer", "ru": "Принципы кормления", "pl": "Zasady żywienia", "ko": "급식의 원칙"}, items: {"fr":["Adapter la ration au poids, à l'âge et au travail du cheval","Donner la priorité aux fourrages et fractionner les repas","Toute transition alimentaire se fait progressivement","Eau propre en permanence, et compléments selon les besoins réels"],"en":["Adapt the ration to the horse's weight, age and workload","Prioritise forage and split the feed into several meals","Any change in diet is made gradually","Clean water at all times, and supplements according to actual needs"],"es":["Adaptar la ración al peso, la edad y el trabajo del caballo","Dar prioridad a los forrajes y fraccionar las comidas","Toda transición alimentaria se hace de forma progresiva","Agua limpia en todo momento, y complementos según las necesidades reales"],"it":["Adattare la razione al peso, all'età e al lavoro del cavallo","Dare la priorità ai foraggi e frazionare i pasti","Ogni cambio di alimentazione avviene in modo graduale","Acqua pulita sempre a disposizione e integratori secondo le reali necessità"],"ja":["馬の体重、年齢、運動量に合わせて飼料の量を調整する","粗飼料を優先し、食事を数回に分ける","飼料の切り替えはすべて段階的に行う","清潔な水を常に用意し、サプリメントは実際の必要に応じて与える"],"de":["Die Ration an Gewicht, Alter und Arbeit des Pferdes anpassen","Raufutter den Vorrang geben und die Mahlzeiten aufteilen","Jede Futterumstellung erfolgt schrittweise","Ständig sauberes Wasser, Ergänzungsfutter nach tatsächlichem Bedarf"],"ar":["تكييف الحصة الغذائية مع وزن الحصان وعمره وعمله","إعطاء الأولوية للأعلاف الخشنة وتقسيم الوجبات","كل تغيير في النظام الغذائي يتم بشكل تدريجي","ماء نظيف في كل الأوقات، ومكملات حسب الاحتياجات الفعلية"], "zh": ["根据马的体重、年龄和工作量来调整饲料量", "以粗饲料为主，并分多次喂", "任何饲料的更换都要循序渐进", "随时有干净的水，并根据实际需要补充营养品"], "nl": ["De ration afstemmen op het gewicht, de leeftijd en het werk van het paard", "Voorrang geven aan ruwvoer en de maaltijden verdelen", "Elke overgang in voeding gebeurt geleidelijk", "Altijd schoon water, en supplementen naar de werkelijke behoeften"], "pt": ["Adaptar a ração ao peso, à idade e ao trabalho do cavalo", "Dar prioridade aos volumosos e fracionar as refeições", "Qualquer mudança de alimentação é feita de forma progressiva", "Água limpa o tempo todo, e suplementos conforme as necessidades reais"], "sv": ["Anpassa foderstaten efter hästens vikt, ålder och arbete", "Prioritera grovfoder och dela upp måltiderna", "Alla foderbyten sker gradvis", "Rent vatten hela tiden, och tillskott efter verkligt behov"], "ru": ["Подбирать рацион под вес, возраст и нагрузку лошади", "Отдавать приоритет грубым кормам и делить корм на несколько приёмов", "Любой переход на другой корм делают постепенно", "Постоянно чистая вода и добавки по реальным потребностям"], "pl": ["Dostosować dawkę do wagi, wieku i pracy konia", "Dawać pierwszeństwo paszom objętościowym i dzielić posiłki na kilka porcji", "Każdą zmianę diety wprowadza się stopniowo", "Stały dostęp do czystej wody, a suplementy zgodnie z rzeczywistymi potrzebami"], "ko": ["말의 몸무게, 나이, 운동량에 맞춰 사료량 조절하기", "조사료를 우선으로 하고 식사를 여러 번 나눠 주기", "사료를 바꿀 때는 항상 서서히 바꾸기", "깨끗한 물을 항상 주고, 보충제는 실제 필요에 따라 주기"]} },
            { type: "liste", titre: {"fr":"Transport et bien-être","en":"Transport and welfare","es":"Transporte y bienestar","it":"Trasporto e benessere","ja":"輸送とウェルフェア","de":"Transport und Wohlbefinden","ar":"النقل والرفاهية", "zh": "运输与福利", "nl": "Transport en welzijn", "pt": "Transporte e bem-estar", "sv": "Transport och välmående", "ru": "Перевозка и благополучие", "pl": "Transport i dobrostan", "ko": "운송과 복지"}, items: {"fr":["Le transport est une source de stress et de fatigue : il faut le préparer","Protéger les membres, assurer une bonne ventilation, éviter les longs trajets sans pause","Surveiller l'hydratation et l'état du cheval à l'arrivée"],"en":["Transport is a source of stress and fatigue: it must be prepared for","Protect the legs, ensure good ventilation, avoid long journeys without breaks","Monitor hydration and the horse's condition on arrival"],"es":["El transporte es una fuente de estrés y de cansancio: hay que prepararlo","Proteger las extremidades, asegurar una buena ventilación, evitar los trayectos largos sin pausa","Vigilar la hidratación y el estado del caballo a la llegada"],"it":["Il trasporto è fonte di stress e fatica: va preparato","Proteggere gli arti, assicurare una buona ventilazione, evitare lunghi tragitti senza pause","Controllare l'idratazione e le condizioni del cavallo all'arrivo"],"ja":["輸送はストレスと疲労の原因となるため、準備が必要です","肢を保護し、十分な換気を確保し、休憩なしの長距離移動を避ける","到着時に馬の水分状態と体調を確認する"],"de":["Der Transport bedeutet Stress und Ermüdung: Er muss vorbereitet werden","Beine schützen, für gute Belüftung sorgen, lange Fahrten ohne Pause vermeiden","Bei der Ankunft Flüssigkeitshaushalt und Zustand des Pferdes überprüfen"],"ar":["النقل مصدر للتوتر والتعب: يجب التحضير له","حماية القوائم، وضمان تهوية جيدة، وتجنب الرحلات الطويلة دون توقف","مراقبة ترطيب الحصان وحالته عند الوصول"], "zh": ["运输会带来压力和疲劳：必须提前做好准备", "保护四肢，保证良好通风，避免长途不休息", "留意马的饮水情况，以及到达时的状态"], "nl": ["Transport is een bron van stress en vermoeidheid: je moet het voorbereiden", "De benen beschermen, zorgen voor goede ventilatie, lange ritten zonder pauze vermijden", "Letten op de hydratatie en de toestand van het paard bij aankomst"], "pt": ["O transporte é fonte de estresse e de cansaço: é preciso prepará-lo", "Proteger os membros, garantir boa ventilação, evitar longos trajetos sem pausa", "Vigiar a hidratação e o estado do cavalo na chegada"], "sv": ["Transport är en källa till stress och trötthet: den måste förberedas", "Skydda benen, se till att ventilationen är bra, undvik långa resor utan paus", "Kontrollera vätskebalansen och hästens tillstånd när den kommer fram"], "ru": ["Перевозка — источник стресса и усталости: к ней нужно готовиться", "Защитить ноги, обеспечить хорошую вентиляцию, избегать долгих поездок без остановок", "Следить за водным балансом и состоянием лошади по прибытии"], "pl": ["Transport to źródło stresu i zmęczenia: trzeba się do niego przygotować", "Chronić nogi, zapewnić dobrą wentylację, unikać długich podróży bez przerw", "Kontrolować nawodnienie i stan konia po przyjeździe"], "ko": ["운송은 스트레스와 피로의 원인이라서 미리 준비해야 해요", "다리를 보호하고, 환기를 잘 시키고, 쉬지 않고 오래 가는 일은 피하기", "수분 섭취와 도착했을 때 말의 상태 살피기"]} },
        ],
        quiz: [
            { type: "vrai-faux", question: {"fr":"Un défaut d'aplomb peut entraîner des boiteries à l'usage.","en":"A conformation fault in the limbs can lead to lameness over time.","es":"Un defecto de aplomo puede provocar cojeras con el uso.","it":"Un difetto di appiombo può provocare zoppie con l'uso.","ja":"肢勢の欠点は、使ううちに跛行を引き起こすことがある。","de":"Eine Fehlstellung der Gliedmaßen kann mit der Zeit zu Lahmheiten führen.","ar":"قد يؤدي عيب في استقامة الأطراف إلى العرج مع الاستعمال.", "zh": "肢势缺陷使用久了可能导致跛行。", "nl": "Een gebrek in de beenstand kan bij gebruik tot kreupelheid leiden.", "pt": "Um defeito de aprumo pode causar claudicações com o uso.", "sv": "Ett fel i benställningen kan med tiden leda till hälta.", "ru": "Недостаток постановки конечностей может со временем привести к хромоте.", "pl": "Wada postawy kończyn może z czasem prowadzić do kulawizn.", "ko": "다리 자세 결함은 쓰다 보면 절뚝거림으로 이어질 수 있어요."}, correct: true, explication: {"fr":"Un mauvais aplomb répartit mal le poids et sollicite anormalement les articulations, ce qui favorise l'usure et les boiteries.","en":"Poor conformation distributes the weight badly and puts abnormal strain on the joints, which promotes wear and lameness.","es":"Un mal aplomo reparte mal el peso y sobrecarga de forma anormal las articulaciones, lo que favorece el desgaste y las cojeras.","it":"Un cattivo appiombo distribuisce male il peso e sollecita in modo anomalo le articolazioni, favorendo usura e zoppie.","ja":"悪い肢勢は体重をうまく分散できず、関節に異常な負担をかけるため、摩耗や跛行につながりやすくなります。","de":"Eine schlechte Stellung verteilt das Gewicht ungünstig und belastet die Gelenke übermäßig, was Verschleiß und Lahmheiten begünstigt.","ar":"الاستقامة السيئة توزع الوزن بشكل خاطئ وتجهد المفاصل بشكل غير طبيعي، مما يزيد من التآكل والعرج.", "zh": "不良的肢势会让体重分布不均，使关节承受异常的压力，容易造成磨损和跛行。", "nl": "Een slechte beenstand verdeelt het gewicht slecht en belast de gewrichten abnormaal, wat slijtage en kreupelheid in de hand werkt.", "pt": "Um mau aprumo distribui mal o peso e sobrecarrega as articulações de forma anormal, o que favorece o desgaste e as claudicações.", "sv": "En dålig benställning fördelar vikten fel och belastar lederna onormalt, vilket ger slitage och hälta.", "ru": "Плохая постановка неправильно распределяет вес и ненормально нагружает суставы, что способствует износу и хромоте.", "pl": "Zła postawa źle rozkłada ciężar i nienormalnie obciąża stawy, co sprzyja zużyciu i kulawiznom.", "ko": "좋지 않은 자세는 체중을 잘못 나눠서 관절에 무리를 주고, 그래서 관절이 닳고 절뚝거리기 쉬워요."} },
            { type: "qcm", question: {"fr":"Comment réalise-t-on une transition alimentaire ?","en":"How do you make a change in diet?","es":"¿Cómo se hace una transición alimentaria?","it":"Come si effettua un cambio di alimentazione?","ja":"飼料の切り替えはどのように行いますか?","de":"Wie wird eine Futterumstellung durchgeführt?","ar":"كيف يتم تغيير النظام الغذائي؟", "zh": "饲料应该怎样更换？", "nl": "Hoe voer je een voederovergang uit?", "pt": "Como se faz uma transição alimentar?", "sv": "Hur gör man ett foderbyte?", "ru": "Как делают переход на другой корм?", "pl": "Jak wprowadza się zmianę diety?", "ko": "사료는 어떻게 바꿔야 할까요?"}, options: {"fr":["Brutalement","Progressivement","En supprimant l'eau","En doublant les concentrés"],"en":["Abruptly","Gradually","By withholding water","By doubling the concentrates"],"es":["De golpe","Progresivamente","Quitando el agua","Duplicando los concentrados"],"it":["Bruscamente","Gradualmente","Togliendo l'acqua","Raddoppiando i concentrati"],"ja":["急に","段階的に","水を与えないで","濃厚飼料を倍にして"],"de":["Abrupt","Schrittweise","Durch Wasserentzug","Durch Verdoppeln des Kraftfutters"],"ar":["بشكل مفاجئ","بشكل تدريجي","بمنع الماء","بمضاعفة الأعلاف المركزة"], "zh": ["突然更换", "循序渐进", "断水", "精料加倍"], "nl": ["Bruut", "Geleidelijk", "Door het water weg te halen", "Door het krachtvoer te verdubbelen"], "pt": ["Bruscamente", "Progressivamente", "Cortando a água", "Dobrando os concentrados"], "sv": ["Tvärt", "Gradvis", "Genom att ta bort vattnet", "Genom att fördubbla kraftfodret"], "ru": ["Резко", "Постепенно", "Убрав воду", "Удвоив концентраты"], "pl": ["Gwałtownie", "Stopniowo", "Odstawiając wodę", "Podwajając paszę treściwą"], "ko": ["갑자기", "서서히", "물을 끊고", "농후사료를 두 배로 늘려서"]}, correct: 1, explication: {"fr":"Toute modification de ration se fait progressivement pour préserver l'équilibre digestif et éviter les coliques.","en":"Any change to the ration is made gradually to preserve digestive balance and avoid colic.","es":"Cualquier cambio de ración se hace de forma progresiva para preservar el equilibrio digestivo y evitar los cólicos.","it":"Ogni modifica della razione avviene gradualmente per preservare l'equilibrio digestivo ed evitare le coliche.","ja":"消化のバランスを保ち、疝痛を防ぐため、飼料の変更はすべて段階的に行います。","de":"Jede Änderung der Ration erfolgt schrittweise, um das Verdauungsgleichgewicht zu erhalten und Koliken zu vermeiden.","ar":"كل تعديل في الحصة الغذائية يتم تدريجيا للحفاظ على توازن الجهاز الهضمي وتجنب المغص.", "zh": "任何饲料的改变都要循序渐进，以保护消化平衡、避免疝痛。", "nl": "Elke aanpassing van de ration gebeurt geleidelijk om het evenwicht van de spijsvertering te behouden en koliek te vermijden.", "pt": "Qualquer mudança de ração é feita de forma progressiva para preservar o equilíbrio digestivo e evitar cólicas.", "sv": "Alla ändringar av foderstaten sker gradvis för att skydda matsmältningens balans och undvika kolik.", "ru": "Любое изменение рациона делают постепенно, чтобы сохранить баланс пищеварения и избежать колик.", "pl": "Każdą zmianę dawki wprowadza się stopniowo, by zachować równowagę trawienną i uniknąć kolki.", "ko": "소화 균형을 지키고 산통을 막으려면 사료는 항상 서서히 바꿔야 해요."} },
        ],
    },
];
window.COURS_GALOP7_FR = COURS_GALOP7_FR;
window.COURS_GALOP7_VERSION = COURS_GALOP7_VERSION;
})();

/* =====================================================================================
   GALOP 7 : LES 16 NOUVEAUX COURS (g7n-01 … g7n-16), écrits le 02/11/2026 (modèle éditorial des Galops 1 à 5)
   Demande de Blandine (02/11 15h37) : « appuie toi sur le plan fédéral de progression de la FFE et de la théorie galop 7
   officielle… fais les différentes répartitions des cours puis écris-les en suivant le même modèle et design que les galop 1 à 3 ».
   Répartition validée (15h41 « Ok vas y ») : I. Vie équestre 01-04 · II. Connaissance du cheval 05-08 · III. Pratique équestre 09-15 · IV. Culture équestre 16.
   15h45 : « prépare et écris tout, mets en ligne et en design SANS BRANCHER pour l'instant ; utilise en attendant les photos temporaires ».
   16h56 « Branche les » : BRANCHÉS (voir la fin du bloc) ; le Galop 7 reste « Prochainement » : cours ouverts aux seules modératrices.
   Brouillons d'origine g7-c1 … g7-c6 (au-dessus) gardés tels quels ; leur contenu est repris, vérifié et enrichi ici.
   ÉTAT : FRANÇAIS SEUL, EN RELECTURE (Blandine + ChatGPT). Traductions après validation.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined") return;
var S = function (titre, sous, puces) { var o = { k: "section", titre: titre }; if (sous) o.sous = sous; if (puces) o.puces = puces.map(function (p) { return typeof p === "string" ? { texte: p } : p; }); return o; };
var P = function (texte) { return { k: "para", texte: texte }; };
var E = function (emoji, titre, texte) { var o = { k: "encadre", emoji: emoji, texte: texte }; if (titre) o.titre = titre; return o; };
var B = function (titre, contenu) { return { type: "texte-riche", aere: true, titre: { fr: titre }, contenu: { fr: contenu } }; };
var Q = function (question, options, correct, explication) { return { type: "qcm", question: { fr: question }, options: { fr: options }, correct: correct, explication: { fr: explication } }; };

var COURS = [

/* ---------------------------------------------------------------------------------
   g7n-01 — LA BRIDE   (programme FFE Galop 7 : expliquer le rôle et l'effet de la bride ;
   démonter, remonter et ajuster une bride ; monter en bride)
   — reprend le brouillon g7-c4 (La bride : montage, réglage, action)
   --------------------------------------------------------------------------------- */
{ id: "g7n-01", icone: "⛓️", type: { fr: "soins" }, duree: { fr: "11 min" }, titre: { fr: "La bride" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-emb-bride-v2.webp", couv: {} },

    B("Rôle et effet de la bride", [
      P("Au Galop 5, tu as rencontré la bride parmi les embouchures, juste pour aller plus loin. Au Galop 7, tu montes en bride : tu dois savoir à quoi elle sert, comment elle agit, et savoir la démonter, la remonter et l'ajuster toi-même. La bride réunit deux embouchures dans la bouche du cheval, chacune avec sa paire de rênes : tu tiens donc quatre rênes."),
      S("🧩 Deux embouchures, deux effets", null, [
        { gras: "Le filet de bride (ou bridon) :", texte: "un filet fin, à petits anneaux. Il agit sur les commissures des lèvres et sur la langue. Son effet est releveur : il garde le contact franc et sert à diriger, comme le filet que tu connais." },
        { gras: "Le mors de bride :", texte: "un mors à branches, avec une gourmette. Quand sa rêne se tend, les branches pivotent vers l'arrière : le canon appuie sur la langue et les barres, la gourmette se serre dans le creux du menton et la têtière appuie sur la nuque. Son effet est abaisseur : il incite le cheval à céder de la nuque." }
      ]),
      S("⚖️ Pourquoi monter en bride ?", null, [
        "Les deux mors ont des effets différents, presque opposés : tu les doses séparément, avec tes doigts.",
        "La bride permet des demandes plus discrètes et plus précises, sur un cheval déjà bien dressé au filet.",
        "Le mors de bride ne s'utilise jamais seul : il travaille toujours avec le filet.",
        "Elle ne remplace pas le dressage : elle ne règle ni un cheval qui tire, ni un cheval qui n'avance pas. Au contraire, elle amplifie chaque erreur de main."
      ]),
      E("🔭", "Pour aller plus loin", "Le mors de bride agit comme un levier. Plus la branche du bas est longue, plus son action est puissante. Le canon peut être droit ou avoir une liberté de langue, une petite courbe au milieu qui laisse de la place à la langue.")
    ]),

    B("Les pièces, le démontage et le remontage", [
      S("🧩 Les pièces de la bride", null, [
        "La têtière et le frontal, avec la sous-gorge.",
        "Les montants de bride, qui portent le mors de bride.",
        "Le passe-filet : une fine têtière à part, qui porte le filet de bride.",
        "La muserolle française (une muserolle simple), avec sa propre têtière.",
        "Les rênes de filet et les rênes de bride.",
        "La gourmette, avec ses deux crochets, et la fausse gourmette."
      ]),
      E("💡", "Le savais-tu ?", "On reconnaît souvent les rênes au toucher : les rênes de filet sont en général plus larges et reliées par une boucle au milieu, les rênes de bride plus fines et cousues. C'est bien pratique pour ne pas les confondre, à cheval comme au remontage."),
      S("🔧 Démonter la bride", "Avant de commencer, observe bien la bride montée, ou prends-la en photo : tu sauras où remettre chaque pièce et à quel trou.", [
        "Décroche la gourmette et la fausse gourmette.",
        "Défais les rênes de filet, le filet de bride, puis le passe-filet.",
        "Défais les rênes de bride, le mors de bride, puis ses montants.",
        "Retire la muserolle, puis sépare le frontal de la têtière.",
        "Nettoie chaque cuir, rince les mors et vérifie les coutures et les boucles."
      ]),
      S("🔁 Remonter la bride", null, [
        "Glisse la têtière dans le frontal, la boucle de la sous-gorge à gauche.",
        "Boucle les montants de bride, puis le mors de bride, le canon dans le bon sens (la liberté de langue tournée vers le haut), puis les rênes de bride.",
        "Passe le passe-filet dans le frontal, accroche le filet de bride, puis les rênes de filet.",
        "Remets la muserolle, sa têtière passée dans le frontal.",
        "Accroche la gourmette d'un seul côté : tu fermeras l'autre côté quand la bride sera sur la tête du cheval.",
        "Compare avec ta photo : chaque boucle revient au même trou."
      ])
    ]),

    B("Ajuster la bride", [
      S("📏 Les réglages, cheval bridé", null, [
        { gras: "Le frontal :", texte: "il ne pince pas la base des oreilles et ne baille pas." },
        { gras: "La sous-gorge :", texte: "un poing passe entre elle et la ganache." },
        { gras: "La muserolle :", texte: "un à deux travers de doigt sous la saillie de l'os de la joue ; tu contrôles le serrage sur le dessus du chanfrein : deux doigts passent dessous." },
        { gras: "Le filet de bride :", texte: "c'est le plus haut des deux mors. Il touche la commissure des lèvres en faisant un ou deux petits plis." },
        { gras: "Le mors de bride :", texte: "juste en dessous du filet, posé sur les barres. Les deux mors ne se chevauchent pas et le mors de bride ne touche pas les crochets, les dents que portent surtout les mâles." },
        { gras: "La largeur :", texte: "chaque mors dépasse de quelques millimètres de chaque côté de la bouche, sans pincer les lèvres." }
      ]),
      S("⛓️ La gourmette", null, [
        "Tourne-la sur elle-même jusqu'à ce que tous ses maillons soient à plat, puis accroche le deuxième côté.",
        "Elle repose à plat dans le creux du menton, qu'on appelle la barbe.",
        "Bon réglage : quand la rêne de bride se tend, les branches pivotent de 30 à 45° environ avant que la gourmette ne vienne serrer.",
        "Trop serrée, elle agit tout de suite, les branches pivotent à peine et le mors devient dur. Trop lâche, les branches dépassent 45° et le mors agit mal.",
        "La fausse gourmette passe dans l'anneau du milieu de la gourmette : elle la retient si elle se décroche et empêche le cheval d'attraper les branches avec ses lèvres."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Ne serre jamais la gourmette pour « avoir plus de frein » : ce n'est pas un réglage plus dur qui rend un cheval attentif. Tant que tu apprends, fais vérifier chaque réglage par ton enseignant avant de monter.")
    ]),

    B("Monter en bride", [
      S("✋ Tenir les quatre rênes", "Il existe plusieurs tenues. Voici la tenue à l'allemande ; ton enseignant peut t'en montrer une autre.", [
        "Dans chaque main, la rêne de filet passe sous le petit doigt.",
        "La rêne de bride passe entre l'annulaire et le petit doigt.",
        "Les deux rênes ressortent ensemble entre le pouce et l'index ; le pouce les bloque par-dessus.",
        "La rêne de bride est un peu moins tendue que la rêne de filet."
      ]),
      S("🎯 Utiliser la bride", null, [
        "Tu diriges et tu gardes le contact avec le filet, comme d'habitude.",
        "La rêne de bride agit par de petites actions de doigts, puis rend aussitôt.",
        "Réajuste souvent tes rênes : on a tendance à raccourcir la bride plus que le filet, et le cheval s'encapuchonne.",
        "Tes mains restent stables et douces, avec une assiette indépendante : la bride se mérite."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Placer le mors de bride trop haut ou le filet trop bas : les deux mors se chevauchent dans la bouche.",
        "Accrocher une gourmette tordue : elle pince et blesse le menton.",
        "Inverser les rênes au remontage : les rênes de filet sur le mors de bride.",
        "Agir fort sur le filet et la bride en même temps, en tirant vers l'arrière.",
        "Ranger la bride sans rincer les mors : la salive sèche et durcit dessus."
      ]),
      S("🏇 Le défi du cavalier", "Prouve que tu maîtrises ta bride, du démontage à la selle.", [
        "Démonte une bride, puis remonte-la seul, et fais-la vérifier par ton enseignant.",
        "Ajuste-la sur ton cheval : filet, mors de bride, gourmette à plat, muserolle et sous-gorge.",
        "À cheval, tiens tes quatre rênes et réajuste-les au pas et au trot sans perdre le contact du filet."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle différence entre un pelham et une bride ?",
        "Comment savoir si mon cheval est prêt à être monté en bride ?",
        "Pourquoi le mors de bride a-t-il un effet abaisseur ?",
        "Comment entretenir une gourmette ?",
        "Quelles autres tenues des quatre rênes existent ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Deux mors, quatre rênes.",
        "Filet releveur, bride abaisseur.",
        "Le filet en haut, la bride juste dessous.",
        "Gourmette à plat, branches entre 30 et 45°.",
        "Le filet guide, la bride affine."
      ]),
      E("", "", "La bride ne parle pas plus fort que le filet : elle parle plus bas.")
    ])
  ],
  lexique: { fr: [
    ["Bride", "Harnachement de tête à deux embouchures (un filet de bride et un mors de bride) et quatre rênes."],
    ["Filet de bride", "Filet fin à petits anneaux, aussi appelé bridon, placé au-dessus du mors de bride. Effet releveur."],
    ["Mors de bride", "Mors à branches avec gourmette, qui agit par levier sur la langue, les barres, le menton et la nuque. Effet abaisseur."],
    ["Gourmette", "Chaînette accrochée au mors de bride, posée à plat dans le creux du menton."],
    ["Fausse gourmette", "Petite lanière qui passe dans l'anneau du milieu de la gourmette et la retient."],
    ["Passe-filet", "Fine têtière à part qui porte le filet de bride."],
    ["Barres", "Partie de la mâchoire sans dents, entre les incisives et les molaires, où repose le mors."],
    ["Encapuchonner (s')", "Pour un cheval, rentrer le nez derrière la verticale pour fuir le contact."]
  ] },
  quiz: [
    Q("Combien d'embouchures et de rênes comporte une bride ?", ["Une embouchure, deux rênes", "Deux embouchures, deux rênes", "Deux embouchures, quatre rênes", "Trois embouchures, quatre rênes"], 2, "La bride réunit un filet de bride et un mors de bride, chacun avec sa paire de rênes : quatre rênes en tout."),
    Q("Quel est l'effet du filet de bride ?", ["Abaisseur, sur la nuque", "Il n'a aucun effet, il sert juste à tenir le mors", "Il agit uniquement sur le menton", "Releveur, sur les commissures des lèvres"], 3, "Le filet de bride agit sur les commissures et la langue : son effet est releveur."),
    Q("Quand la rêne de bride se tend, que se passe-t-il ?", ["Le mors remonte dans la bouche", "Les branches pivotent : action sur les barres, le menton et la nuque", "La muserolle se resserre", "Le filet de bride se bloque"], 1, "Les branches pivotent comme un levier : le canon appuie sur la langue et les barres, la gourmette sur le menton et la têtière sur la nuque."),
    Q("Dans la bouche, où se place le filet de bride ?", ["Au-dessus du mors de bride", "En dessous du mors de bride", "Au même niveau, collé au mors de bride", "Sur les crochets"], 0, "Le filet de bride est le plus haut des deux mors ; le mors de bride se place juste en dessous, sans le chevaucher."),
    Q("Comment se pose la gourmette ?", ["À plat, dans le creux du menton", "Tordue, pour qu'elle agisse plus vite", "Sous la mâchoire, contre la ganache", "Par-dessus la muserolle"], 0, "Elle se tourne jusqu'à être bien à plat et repose dans le creux du menton. Tordue, elle pince et blesse."),
    Q("Ta gourmette est bien réglée si, quand la rêne de bride se tend, les branches pivotent d'environ…", ["10°", "30 à 45°", "90°", "Elles ne doivent pas pivoter du tout"], 1, "Le repère est de 30 à 45° quand la rêne de bride se tend : un angle sous 45° n'est donc pas forcément trop serré. Si les branches pivotent à peine, la gourmette est trop serrée ; au-delà de 45°, elle est trop lâche."),
    Q("À quoi sert la fausse gourmette ?", ["À serrer davantage la gourmette", "À remplacer la sous-gorge", "À attacher les rênes de bride", "À retenir la gourmette et empêcher le cheval d'attraper les branches"], 3, "Elle passe dans l'anneau du milieu de la gourmette : elle la retient si elle se décroche et gêne le cheval qui voudrait attraper les branches avec ses lèvres."),
    Q("Dans la tenue à l'allemande, où passe la rêne de filet ?", ["Entre le pouce et l'index uniquement", "Entre l'index et le majeur", "Sous le petit doigt", "Entre l'annulaire et le majeur"], 2, "La rêne de filet passe sous le petit doigt, la rêne de bride entre l'annulaire et le petit doigt ; les deux ressortent entre le pouce et l'index."),
    Q("En bride, quelle rêne garde le contact principal ?", ["La rêne de bride", "La rêne de filet", "Les deux, avec exactement la même tension", "Aucune, on monte rênes longues"], 1, "C'est le filet qui garde le contact et qui dirige ; la rêne de bride, un peu moins tendue, affine par de petites actions de doigts."),
    Q("Ton cheval ne t'écoute pas bien en bride. Que fais-tu ?", ["Je serre la gourmette d'un ou deux maillons", "Je raccourcis les rênes de bride", "Je vérifie ma main et j'en parle à mon enseignant", "Je monte avec le mors de bride seul"], 2, "La bride ne remplace pas le dressage : serrer la gourmette ou raccourcir la bride rend l'action plus dure sans rien régler.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-02 — LES BANDES DE POLO   (programme FFE Galop 7 : poser des bandes de polo et expliquer leur rôle et leur usage)
   — pas de brouillon g7-c* sur ce thème (sujet évoqué en « Pour aller plus loin » dans g5n-05)
   --------------------------------------------------------------------------------- */
{ id: "g7n-02", icone: "🌀", type: { fr: "soins" }, duree: { fr: "10 min" }, titre: { fr: "Les bandes de polo" },
  blocs: [
    { type: "couv-affiche", src: "images/securite-g1-bandes.webp", couv: {} },

    B("Rôle et usage des bandes de polo", [
      P("Au Galop 5, tu as appris à poser des bandes de repos, au box ou pour le transport. Les bandes de polo, elles, se posent pour le travail. Au Galop 7, tu dois savoir les poser, et expliquer à quoi elles servent et quand les utiliser… ou pas."),
      S("🧣 Qu'est-ce qu'une bande de polo ?", null, [
        "Une bande en polaire, épaisse et douce, posée du dessous du genou (ou du jarret) jusqu'au boulet.",
        "Elle se ferme par une bande auto-agrippante (un velcro).",
        "Elle se pose directement sur le membre, sans sous-bande.",
        "On les pose par paire : sur les antérieurs, sur les postérieurs ou sur les quatre membres."
      ]),
      S("🛡️ Leur rôle", null, [
        "Protéger le bas du membre des petits coups et des frottements, par exemple quand le cheval se touche en travaillant.",
        "Elles soutiennent peu le tendon : ce sont des protections légères, pas un soin."
      ]),
      S("📅 Quand les utiliser ?", null, [
        { gras: "Oui :", texte: "pour le travail sur le plat ou à la longe, au manège ou en carrière, sur un sol sec." },
        { gras: "Non, sous la pluie ou sur un sol mouillé :", texte: "la polaire boit l'eau et s'alourdit." },
        { gras: "Non, à l'obstacle et en cross :", texte: "les guêtres, plus rigides, protègent mieux des chocs." }
      ]),
      E("💡", "Le savais-tu ?", "Les bandes de polo tiennent leur nom du polo, un sport où les chevaux jouent les membres bandés, pour les protéger des coups pendant le jeu.")
    ]),

    B("Poser une bande de polo", [
      S("🧰 Avant de commencer", null, [
        "Ton cheval est attaché et tu travailles accroupi à côté du membre, en chaussures fermées.",
        "Brosse le bas du membre dans le sens du poil : aucun grain de sable, aucune brindille.",
        "Prends une bande bien roulée, le velcro au centre du rouleau."
      ]),
      S("🔁 Les étapes", "Commence par un antérieur.", [
        "Pose le début de la bande à l'extérieur du membre, juste sous le genou (sous le jarret pour un postérieur).",
        "Enroule de l'avant vers l'arrière, en passant par l'extérieur : ainsi, la bande serre contre l'os du canon et ne tire pas sur le tendon.",
        "Descends de quelques centimètres à chaque tour, pour que chaque tour recouvre largement le précédent, avec une tension égale et sans pli.",
        "Au boulet, descends en passant sous l'arrière du boulet pour l'envelopper, comme dans un hamac : en remontant, la bande forme un V à l'avant du boulet.",
        "Remonte de la même façon jusque sous le genou.",
        "Ferme le velcro à l'extérieur du membre, de l'avant vers l'arrière, jamais sur le tendon ni sur l'os du devant."
      ]),
      E("⚠️", "Bander un postérieur", "Avant de bander un postérieur, vérifie que le cheval est bien en appui dessus. S'il le laisse au repos, posé sur la pince, la bande sera mal tendue. Reste toujours sur le côté du membre.")
    ]),

    B("Contrôler, retirer et ranger", [
      E("👨‍🏫", "Le conseil du coach", "Contrôle ta bande en haut, au milieu et en bas : la tension doit être la même partout. Lâche, elle glisse et peut se dérouler pendant le travail, et le cheval risque de marcher dessus. Trop serrée, elle gêne la circulation et peut marquer le tendon. Pendant la séance, jette un œil à tes bandes : si l'une a glissé ou se défait, arrête-toi et fais-la refaire."),
      S("✋ Retirer les bandes", null, [
        "Ouvre le velcro et déroule la bande en la passant d'une main à l'autre, sans tirer et sans la laisser tomber par terre.",
        "Passe la main sur chaque membre : ni chaleur, ni gonflement, ni frottement."
      ]),
      S("🌀 Ranger les bandes", null, [
        "Replie le velcro sur lui-même et roule la bande en partant de là, serrée et droite.",
        "Coince le bout dans le dernier tour pour que le rouleau ne se défasse pas.",
        "Remplace une bande qui a perdu sa souplesse : elle ne tient plus bien."
      ]),
      E("🔭", "Pour aller plus loin", "Il existe aussi des bandes de travail élastiques, posées sur une sous-bande, qui soutiennent davantage le tendon. Elles sont plus délicates à poser : un tour trop serré peut blesser. Leur usage se décide avec ton enseignant.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Laisser les bandes de polo au box ou au pré après la séance.",
        "Reposer une bande sale ou encore humide : elle irrite la peau.",
        "Rattraper un tour raté en tirant plus fort par-dessus : défais la bande et recommence.",
        "Laisser dépasser le bout de la bande ou fermer le velcro de travers : il peut s'ouvrir pendant le travail.",
        "Poser les bandes d'une même paire avec des tensions différentes."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais protéger les membres de ton cheval.", [
        "Pose deux bandes de polo sur les antérieurs, sans pli, velcro à l'extérieur, et fais-les vérifier.",
        "Explique en deux phrases leur rôle et dans quels cas tu ne les mets pas.",
        "Après la séance, retire-les, vérifie les membres et roule les bandes."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Bandes de polo ou guêtres : que choisir pour le travail sur le plat ?",
        "Pourquoi une bande lâche est-elle dangereuse ?",
        "Comment laver mes bandes de polo sans les abîmer ?",
        "Pourquoi ne pas mettre de bandes de polo au cross ?",
        "Quelle différence entre une bande de polo et une bande de repos ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Polaire, pour le travail sur sol sec.",
        "Protection légère, pas un soin.",
        "De l'avant vers l'arrière, par l'extérieur.",
        "Le boulet enveloppé, un V devant.",
        "Retirées dès la fin de la séance."
      ]),
      E("", "", "Une paire de bandes bien posée protège deux membres du premier au dernier tour de piste, sans qu'on y pense.")
    ])
  ],
  lexique: { fr: [
    ["Bande de polo", "Bande en polaire posée sans sous-bande pour protéger le bas du membre pendant le travail."],
    ["Velcro", "Fermeture auto-agrippante de la bande."],
    ["Ergot", "Petite corne à l'arrière du boulet."],
    ["Pince", "Partie avant du sabot."],
    ["Guêtre", "Protection plus rigide du membre, préférée à l'obstacle et en cross."],
    ["Se toucher", "Pour un cheval, se donner un coup avec un autre membre en se déplaçant."],
    ["Bande de travail", "Bande élastique posée sur une sous-bande, qui soutient davantage le tendon."]
  ] },
  quiz: [
    Q("En quelle matière est une bande de polo ?", ["En polaire", "En coton rigide", "En caoutchouc", "En cuir"], 0, "La bande de polo est en polaire, épaisse et douce."),
    Q("Quel est le rôle principal d'une bande de polo ?", ["Soigner un tendon blessé", "Protéger le bas du membre des petits coups et frottements", "Remplacer les fers", "Empêcher le cheval de transpirer"], 1, "C'est une protection légère pour le travail : elle protège des petits coups et frottements, elle ne soigne pas."),
    Q("Dans quelle situation peux-tu mettre des bandes de polo ?", ["Pour un parcours de cross", "Pour une séance sur le plat en carrière, par temps sec", "Pour une balade sous la pluie", "Pour passer un gué"], 1, "Elles conviennent au travail sur le plat ou à la longe, sur sol sec. Mouillées, elles s'alourdissent."),
    Q("Pourquoi préfère-t-on les guêtres à l'obstacle ?", ["Parce qu'elles sont plus jolies", "Parce qu'elles sont plus rigides et protègent mieux des chocs", "Parce que les bandes de polo sont interdites", "Parce qu'elles tiennent chaud"], 1, "Les guêtres, plus rigides, protègent mieux des chocs contre les barres ou les obstacles fixes."),
    Q("Où commences-tu à poser une bande de polo sur un antérieur ?", ["Sur le paturon", "Au milieu du boulet", "À l'extérieur du membre, juste sous le genou", "Sur le tendon, à l'arrière"], 2, "On commence à l'extérieur, juste sous le genou, puis on descend vers le boulet."),
    Q("Pourquoi enrouler de l'avant vers l'arrière, par l'extérieur ?", ["Pour que la bande serre contre l'os du canon et ne tire pas sur le tendon", "Pour aller plus vite", "Parce que le velcro ne colle que dans ce sens", "Pour que la bande dépasse sous le boulet"], 0, "Dans ce sens, la bande serre contre l'os du canon ; dans l'autre, elle tire sur le tendon."),
    Q("Comment passes-tu le boulet ?", ["Je m'arrête au-dessus du boulet", "Je passe sous l'arrière du boulet pour l'envelopper, avec un V à l'avant", "Je descends jusqu'au sabot", "Je fais trois tours serrés autour du boulet"], 1, "La bande passe sous l'arrière du boulet pour l'envelopper, puis remonte en formant un V à l'avant."),
    Q("Où ferme-t-on le velcro ?", ["Sur le tendon", "Devant, sur l'os du canon", "À l'extérieur du membre", "À l'intérieur du membre"], 2, "Le velcro se ferme à l'extérieur, de l'avant vers l'arrière, jamais sur le tendon ni sur l'os du devant."),
    Q("Avant de bander un postérieur, que vérifies-tu ?", ["Que le cheval est en appui sur ce membre", "Que le cheval a mangé", "Que le membre est posé sur la pince", "Que la queue est tressée"], 0, "Si le cheval laisse le membre au repos, posé sur la pince, la bande sera mal tendue."),
    Q("Une bande de polo s'est défaite pendant ta séance. Que fais-tu ?", ["Je continue, je la referai après", "Je la coince dans ma botte", "Je passe au galop pour finir plus vite", "Je m'arrête et je la fais refaire"], 3, "Une bande qui se défait peut s'enrouler autour du membre ou faire trébucher le cheval : on s'arrête tout de suite.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-03 — LA LONGE AVEC ENRÊNEMENT   (programme FFE Galop 7 : connaître les principaux enrênements du travail en longe,
   expliquer leur rôle et leur effet ; travailler un cheval ou un poney à la longe avec un enrênement)
   — reprend le brouillon g7-c5 (partie enrênement)
   --------------------------------------------------------------------------------- */
{ id: "g7n-03", icone: "🪢", type: { fr: "à pied" }, duree: { fr: "11 min" }, titre: { fr: "La longe avec enrênement" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-10-palomino-rond.webp", couv: {} },

    B("À quoi sert un enrênement ?", [
      P("Au Galop 6, tu longes un cheval détendu aux trois allures. Au Galop 7, tu le longes enrêné, et tu dois connaître les principaux enrênements du travail en longe, leur rôle et leur effet. Ce travail se fait toujours encadré par ton enseignant."),
      S("🎯 Le rôle d'un enrênement", null, [
        "C'est un dispositif mécanique, relié au mors, qui guide l'attitude du cheval : la position de sa tête et de son encolure.",
        "Il l'aide à étendre l'encolure, à se tendre vers le mors et à arrondir son dos, au lieu de lever la tête et de creuser le dos.",
        "Il complète tes aides de longeur, la voix, ton corps et la chambrière : il ne les remplace pas.",
        "Il s'utilise de temps en temps, sur un cheval adulte, et c'est ton enseignant qui choisit lequel et comment le régler."
      ]),
      S("📐 Le bon résultat", null, [
        "Le chanfrein reste légèrement en avant de la verticale, jamais derrière.",
        "Le cheval avance franchement : sans activité, il s'enroule ou creuse le dos, et l'enrênement ne sert à rien.",
        "Il se décontracte : il garde une cadence régulière, souffle, et peut mâchonner son mors. Seul, le mâchonnement ne suffit pas : regarde aussi la régularité et la souplesse."
      ])
    ]),

    B("Les principaux enrênements", [
      S("🧰 Quatre enrênements à connaître", "Ils s'attachent à un surfaix posé sur un tapis, et aux anneaux du mors.", [
        { gras: "Les rênes élastiques :", texte: "une rêne de chaque côté, du surfaix aux anneaux du mors (on parle de rênes fixes quand elles sont tout en cuir). Effet : elles stabilisent la tête et l'encolure et invitent le cheval à prendre un contact régulier sur le mors. À la longe, la rêne extérieure se règle un peu plus longue que l'intérieure, pour laisser le cheval s'incurver sur le cercle." },
        { gras: "Le gogue :", texte: "une courroie part de la sangle, entre les antérieurs ; des cordelettes montent dans des poulies fixées à la têtière, redescendent dans les anneaux du mors et reviennent s'attacher à la courroie, au niveau du poitrail. Effet : si le cheval lève trop la tête, il agit sur la nuque et sur la bouche. Il l'incite à baisser la tête, à étendre l'encolure et à arrondir le dos, en fermant un peu l'angle entre la tête et l'encolure." },
        { gras: "Le chambon :", texte: "il part de la sangle, entre les antérieurs, passe dans des poulies sur la têtière au niveau de la nuque, puis s'accroche aux anneaux du mors. Effet : quand le cheval lève la tête, il appuie sur la nuque et tire sur les commissures des lèvres ; il se détend dès que le cheval baisse la tête. Il l'incite à descendre l'encolure en avant et vers le bas, sans fermer l'angle de la tête, ce qui étire et muscle le dos. Dans ce cours, on l'utilise à la longe, au pas et au trot." },
        { gras: "Le Pessoa :", texte: "un système de cordes et de poulies fixé au surfaix, avec une corde qui passe autour de l'arrière-main. Effet : il relie l'arrière-main à la bouche et incite le cheval à engager ses postérieurs sous lui, à arrondir le dos et à baisser la tête. Il est contraignant : on l'emploie seulement à la longe, sur un cheval habitué, pour des séances courtes." }
      ]),
      E("💡", "Le savais-tu ?", "Le Pessoa porte le nom de Nelson Pessoa, grand cavalier brésilien de saut d'obstacles, qui a mis au point ce système pour travailler ses chevaux à la longe."),
      E("🔭", "Pour aller plus loin", "Tu entendras aussi parler des rênes allemandes. Elles partent de la sangle, passent dans les anneaux du mors et reviennent dans la main du cavalier : on les utilise surtout monté. Leur action est puissante ; elles sont réservées aux cavaliers confirmés, à la main très calme.")
    ]),

    B("Longer un cheval enrêné", [
      S("🧰 Préparer le cheval", null, [
        "Un surfaix sur un tapis, bien sanglé, et un filet simple. Si une selle est posée, remonte les étriers et attache-les pour qu'ils ne battent pas.",
        "Le caveçon se met par-dessus le filet ; la longe s'accroche à l'anneau du milieu de sa muserolle.",
        "Des protections aux membres, choisies avec ton enseignant. Sur un sol sec, tes bandes de polo conviennent.",
        "Mène ton cheval jusqu'au lieu de travail sans enrênement accroché au mors."
      ]),
      S("⏱️ Le déroulement de la séance", null, [
        "Détente d'abord, sans enrênement ou avec un enrênement très lâche : quelques minutes au pas, puis au trot et au galop, sur les deux mains.",
        "Arrête le cheval sur le cercle et va vers lui pour accrocher l'enrênement. Règle-le selon les consignes de ton enseignant : il adapte la longueur à ton cheval et à sa réponse, et peut la modifier.",
        "Remets ton cheval franchement en avant, avec ta voix et ta chambrière, et demande des transitions pour entretenir son activité.",
        "Change de main régulièrement. La séance reste courte : 30 à 40 minutes au maximum, détente comprise, avec des pauses au pas.",
        "Pour finir, décroche l'enrênement et laisse le cheval marcher, encolure étendue, pour récupérer."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Regarde ton cheval, pas l'enrênement. Si son chanfrein passe derrière la verticale, s'il ralentit, s'enroule ou se défend, l'enrênement est trop court ou ton cheval manque d'activité. Arrête-le, rallonge l'enrênement et demande l'avis de ton enseignant.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Mettre un enrênement sur un mors fort ou compliqué : il s'utilise sur un filet simple.",
        "Laisser un cheval enrêné seul, attaché ou au box.",
        "Faire sauter un cheval enrêné.",
        "Sangler le surfaix trop lâche : il tourne et l'enrênement tire de travers.",
        "Laisser une courroie ou une cordelette pendre assez bas pour que le cheval y passe un pied."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais longer un cheval enrêné en sécurité.", [
        "Prépare ton cheval : surfaix, caveçon, longe, protections et l'enrênement choisi par ton enseignant, puis fais tout vérifier.",
        "Longe-le d'abord détendu, puis enrêné sur les deux mains, en gardant un cercle régulier et un cheval actif.",
        "Nomme les quatre enrênements du cours et explique l'effet de celui que tu as utilisé."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle différence entre un gogue et un chambon ?",
        "Pourquoi régler la rêne élastique extérieure plus longue ?",
        "Comment voir qu'un enrênement est trop court ?",
        "Pourquoi travailler le chambon au pas et au trot ?",
        "Combien de séances faut-il pour habituer un cheval au Pessoa ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "L'enrênement aide, il ne remplace pas.",
        "Détente d'abord, enrênement ensuite.",
        "Un réglage adapté à chaque cheval.",
        "Chanfrein en avant de la verticale.",
        "Sans activité, aucun enrênement ne marche."
      ]),
      E("", "", "Un enrênement bien réglé ne se voit presque pas : c'est le cheval qu'on regarde.")
    ])
  ],
  lexique: { fr: [
    ["Enrênement", "Dispositif mécanique relié au mors qui guide l'attitude de la tête et de l'encolure du cheval."],
    ["Rênes élastiques", "Paire de rênes reliant le surfaix aux anneaux du mors, qui stabilisent la tête et l'encolure."],
    ["Gogue", "Enrênement passant par la têtière et le mors, qui incite le cheval à baisser la tête et étendre l'encolure."],
    ["Chambon", "Enrênement agissant sur la nuque et les commissures, qui incite le cheval à descendre l'encolure en avant et vers le bas."],
    ["Pessoa", "Système de cordes et de poulies relié à l'arrière-main, qui incite le cheval à engager ses postérieurs."],
    ["Surfaix", "Sangle munie d'anneaux, posée sur un tapis, où s'attachent les enrênements."],
    ["Chanfrein", "Devant de la tête du cheval, entre le front et les naseaux."],
    ["Attitude", "Position de la tête et de l'encolure du cheval."]
  ] },
  quiz: [
    Q("À quoi sert un enrênement au travail à la longe ?", ["À faire aller le cheval plus vite", "À guider l'attitude de la tête et de l'encolure", "À remplacer la chambrière", "À empêcher le cheval de tourner"], 1, "L'enrênement guide l'attitude ; il complète tes aides de longeur sans les remplacer."),
    Q("Où doit se trouver le chanfrein d'un cheval bien enrêné ?", ["Derrière la verticale", "Légèrement en avant de la verticale", "À l'horizontale", "Peu importe"], 1, "Le chanfrein reste légèrement en avant de la verticale. Derrière, l'enrênement est trop court ou le cheval manque d'activité."),
    Q("À la longe, comment règle-t-on les rênes élastiques ?", ["L'intérieure plus longue que l'extérieure", "Les deux très courtes", "L'extérieure un peu plus longue que l'intérieure", "Une seule rêne, côté intérieur"], 2, "L'extérieure un peu plus longue laisse le cheval s'incurver sur le cercle."),
    Q("Dans ce cours, à quelles allures travailles-tu ton cheval au chambon ?", ["Au galop seulement", "À l'arrêt seulement", "À l'obstacle", "Au pas et au trot"], 3, "Le cadre retenu dans ce cours pour le chambon est la longe, au pas et au trot."),
    Q("Quel enrênement passe derrière l'arrière-main ?", ["Le gogue", "Le chambon", "Le Pessoa", "Les rênes élastiques"], 2, "Le Pessoa a une corde qui passe derrière l'arrière-main : il relie l'arrière-main à la bouche."),
    Q("Quelle est la différence principale entre gogue et chambon ?", ["Le gogue se met sur le caveçon, le chambon sur le licol", "Le chambon laisse le nez partir en avant et vers le bas ; le gogue ferme un peu l'angle de la tête", "Le chambon s'utilise monté, le gogue jamais", "Il n'y en a aucune"], 1, "Les deux incitent à baisser la tête ; le gogue ferme un peu l'angle entre la tête et l'encolure, le chambon non."),
    Q("Quand accroches-tu l'enrênement ?", ["Au box, avant de partir", "Après la détente, cheval arrêté sur le cercle", "Dès le premier tour de pas", "Au moment de passer au galop"], 1, "La détente se fait sans enrênement ou très lâche ; tu l'accroches ensuite, cheval arrêté sur le cercle."),
    Q("Comment se règle l'enrênement de ton cheval ?", ["Court tout de suite, pour qu'il comprenne", "Selon les consignes de ton enseignant, adapté à la réponse de ton cheval", "Plus court d'un côté pour l'incurver fort", "Au hasard, puis on voit"], 1, "Il n'y a pas de réglage automatique : ton enseignant adapte la longueur à ton cheval et à sa réponse."),
    Q("Ton cheval enrêné ralentit et passe derrière la verticale. Que fais-tu ?", ["Je raccourcis l'enrênement", "Je le laisse faire, il va se calmer", "Je l'arrête, je rallonge l'enrênement et je demande l'avis de mon enseignant", "Je passe au galop"], 2, "C'est le signe d'un enrênement trop court ou d'un manque d'activité : on rallonge et on remet le cheval en avant."),
    Q("Que fais-tu à la fin de la séance ?", ["Je laisse l'enrênement pour le retour au box", "Je raccourcis l'enrênement pour les derniers tours", "Je décroche l'enrênement et je laisse le cheval marcher, encolure étendue", "Je l'attache enrêné au box pour qu'il garde l'attitude"], 2, "On décroche l'enrênement et on laisse le cheval s'étirer au pas pour récupérer.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-04 — LONGUES RÊNES ET TRAVAIL EN MAIN   (programme FFE Galop 7 : utiliser les longues rênes au pas et au trot,
   en cercle et en ligne droite, de côté ou derrière et changer de main ; marcher et trotter en main avec le cheval dans une mise en main)
   — reprend le brouillon g7-c5 (partie longues rênes et mise en main depuis le sol)
   --------------------------------------------------------------------------------- */
{ id: "g7n-04", icone: "🚶", type: { fr: "à pied" }, duree: { fr: "11 min" }, titre: { fr: "Longues rênes et travail en main" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-11-gris-pommele-rond.webp", couv: {} },

    B("Les longues rênes : matériel et tenue", [
      P("Au Galop 6, tu as travaillé aux longues rênes sur le cercle. Au Galop 7, tu le mènes aussi en ligne droite, en te plaçant de côté ou derrière lui, et tu changes de main. Tu apprends aussi à marcher et trotter en main avec ton cheval dans une mise en main. Ce travail se fait toujours encadré par ton enseignant, sur un cheval habitué et dans un endroit clos."),
      S("🧰 Le matériel", null, [
        "Deux longues rênes, un surfaix sur un tapis, et un filet ou un caveçon.",
        "Une chambrière ou un stick, auquel le cheval est habitué.",
        "Des gants, et des protections aux membres du cheval."
      ]),
      S("🪢 Tenir les longues rênes", null, [
        "Chaque rêne passe dans un anneau du surfaix, puis s'accroche à l'anneau du mors de son côté.",
        "Chaque main tient une rêne ; l'excédent se tient en boucles, jamais enroulé autour de la main.",
        "Sur le cercle, la rêne intérieure est dans la main du côté où va le cheval ; la chambrière est dans l'autre main, avec la rêne extérieure.",
        "Le contact reste moelleux. Pour ralentir, ferme les doigts, puis relâche dès que le cheval répond. Ta voix reste ta première aide."
      ])
    ]),

    B("Sur le cercle et en ligne droite", [
      S("⭕ Sur le cercle", null, [
        "Tu marches à l'intérieur du cercle, en léger retrait par rapport au cheval, hors de portée de ses postérieurs.",
        "La rêne extérieure contourne l'arrière-main, au-dessus des jarrets : elle empêche les hanches de s'échapper vers l'extérieur.",
        "Au trot, garde le même placement : ta voix et ta chambrière entretiennent l'activité."
      ]),
      S("➡️ En ligne droite, de côté ou derrière", null, [
        { gras: "De côté :", texte: "tu marches à hauteur de la hanche du cheval, légèrement en retrait et à distance. Tu vois tout le cheval et tu restes hors de portée d'une ruade." },
        { gras: "Derrière :", texte: "tu marches dans son axe, à une bonne distance de sécurité ; les deux rênes forment un couloir qui l'aide à rester droit. Ne te place jamais directement derrière un cheval que tu ne connais pas bien." },
        "Pour tourner, la rêne du côté où tu vas guide le cheval ; l'autre rend, sans perdre le contact.",
        "Au trot en ligne droite, tu dois suivre : choisis des portions courtes, puis reviens au pas."
      ]),
      E("💡", "Le savais-tu ?", "Au Cadre Noir de Saumur, les écuyers présentent des chevaux aux longues rênes jusqu'aux airs les plus difficiles du dressage. C'est un travail très ancien, qui demande beaucoup de finesse.")
    ]),

    B("Changer de main", [
      S("🔄 Changer de main aux longues rênes", "Avant tout, le cheval doit accepter les rênes sur sa croupe et derrière ses cuisses sans s'inquiéter.", [
        "Prévois ton tracé avant de commencer : par exemple, une diagonale ou une demi-volte.",
        "Place-toi derrière le cheval, à bonne distance, et guide-le sur ce tracé.",
        "Ajuste tes rênes en même temps : la nouvelle rêne intérieure se raccourcit, l'autre glisse sur la croupe et devient la rêne extérieure.",
        "C'est le cheval qui change de côté, pas toi qui tournes autour de lui. Une fois sur la nouvelle main, reprends ta place, de côté ou à l'intérieur du cercle.",
        "Passe la chambrière dans la main de la nouvelle rêne extérieure.",
        "Fais tes premiers changements de main au pas ; le trot viendra quand le geste sera fluide."
      ])
    ]),

    B("Marcher et trotter en main dans une mise en main", [
      P("Pour la FFE, la mise en main, c'est la décontraction de la bouche et de la nuque : le cheval cède de la nuque, qui reste le point le plus haut de son encolure, et son chanfrein est légèrement en avant de la verticale. À pied, tu la recherches en marchant puis en trottant avec ton cheval, au filet."),
      S("🚶 Ta position", "Voici une méthode possible, à appliquer comme ton enseignant te la montre : il en existe d'autres.", [
        "Place-toi à gauche du cheval, entre sa tête et son épaule, en regardant devant toi.",
        "Les rênes restent sur l'encolure. Ta main droite tient les deux rênes à une dizaine de centimètres du mors, séparées par un doigt.",
        "Ta main gauche tient un stick, pointé vers l'arrière, pour activer le cheval si besoin."
      ]),
      S("🎯 Obtenir la mise en main", null, [
        "Marche d'un pas actif : ton cheval avance de lui-même à côté de toi, sans traîner ni te dépasser.",
        "Prends un contact léger et égal sur les deux rênes.",
        "S'il se raidit ou lève la tête, ferme doucement les doigts, sans tirer vers l'arrière, et cède dès qu'il relâche sa mâchoire ou descend le nez.",
        "Il est mis en main quand sa nuque cède souplement et que son encolure se détend ; il peut alors mâchonner doucement son mors.",
        "Au trot : prends un peu d'élan au pas, trotte avec lui quelques foulées en gardant le même contact, puis reviens au pas avec ta voix et ton corps qui ralentit, avant tes doigts."
      ]),
      E("👨‍🏫", "Le conseil du coach", "La mise en main commence par les pieds du cheval, pas par tes doigts. S'il traîne, oublie tes rênes un instant : remets-le en avant avec ta voix et ton stick, puis reprends le contact. Un cheval actif et décontracté se met en main presque tout seul.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Marcher trop lentement en ligne droite : les rênes se tendent et tu tires sur la bouche sans le vouloir.",
        "Laisser traîner une rêne au sol pendant un changement de main : le cheval peut marcher dessus.",
        "Regarder tes mains au lieu de regarder où tu vas.",
        "En main, tirer la tête vers le bas pour la placer : c'est le contraire d'une mise en main.",
        "Te mettre devant la tête du cheval en main : tu le bloques."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais diriger ton cheval depuis le sol.", [
        "Aux longues rênes, mène ton cheval au pas et au trot sur le cercle, puis en ligne droite, de côté et derrière.",
        "Change de main aux longues rênes sans que les rênes touchent le sol.",
        "En main, marche puis trotte quelques foulées avec ton cheval mis en main, et reviens au pas sans tirer."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment vérifier qu'un cheval est bien habitué aux rênes sur sa croupe ?",
        "Quand se placer derrière plutôt que de côté aux longues rênes ?",
        "Que faire si mon cheval s'arrête et se retourne aux longues rênes ?",
        "Comment savoir si mon cheval mâchonne parce qu'il est décontracté ?",
        "À quoi sert le travail en main pour le travail monté ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Une rêne par main, l'excédent en boucles.",
        "De côté : à la hanche. Derrière : à distance.",
        "Au changement de main, c'est le cheval qui passe.",
        "La mise en main vient de l'activité.",
        "Doigts qui ferment, doigts qui cèdent."
      ]),
      E("", "", "Diriger un cheval sans être dessus, c'est découvrir tout ce que tes mains disent… et tout ce que ton corps raconte.")
    ])
  ],
  lexique: { fr: [
    ["Longues rênes", "Deux longues rênes passées dans les anneaux d'un surfaix, pour diriger le cheval à pied, de côté ou derrière lui."],
    ["Mise en main", "Décontraction de la bouche et de la nuque du cheval, nuque au point le plus haut, chanfrein légèrement en avant de la verticale."],
    ["Mâchonner", "Pour un cheval, remuer doucement la bouche sur son mors. Cela peut accompagner la décontraction, mais à lui seul, ce n'est pas la preuve d'une mise en main correcte."],
    ["Nuque", "Haut de l'encolure, juste derrière les oreilles."],
    ["Stick", "Badine courte, utilisée à pied pour activer le cheval."],
    ["Changement de main", "Passage d'une main à l'autre : le cheval tourne dans l'autre sens."]
  ] },
  quiz: [
    Q("Au Galop 7, que dois-tu savoir faire de plus aux longues rênes ?", ["Les utiliser seulement au pas sur le cercle", "Les utiliser aussi en ligne droite, de côté ou derrière, et changer de main", "Les utiliser au galop sur des obstacles", "Les utiliser monté"], 1, "Le Galop 7 ajoute la ligne droite, de côté ou derrière, et les changements de main, au pas et au trot."),
    Q("Sur le cercle, dans quelle main est la chambrière ?", ["Dans la main de la rêne intérieure", "Sous le bras", "Posée au centre du cercle", "Dans la main de la rêne extérieure"], 3, "La rêne intérieure est dans la main du côté où va le cheval ; la chambrière est dans l'autre main, avec la rêne extérieure."),
    Q("Où passe la rêne extérieure sur le cercle ?", ["Sous la queue", "Au niveau des paturons", "Autour de l'arrière-main, au-dessus des jarrets", "Par-dessus le garrot"], 2, "Elle contourne l'arrière-main au-dessus des jarrets et empêche les hanches de s'échapper."),
    Q("En ligne droite, de côté, où te places-tu ?", ["À hauteur de sa hanche, légèrement en retrait et à distance", "À hauteur de la tête du cheval", "Collé à son épaule", "Devant lui"], 0, "À hauteur de la hanche et un peu en retrait, tu vois tout le cheval et tu restes hors de portée d'une ruade."),
    Q("À quoi sert la position derrière le cheval en ligne droite ?", ["Les deux rênes forment un couloir qui l'aide à rester droit", "À pouvoir le toucher avec la main", "À le faire reculer", "À rien, elle est interdite"], 0, "Derrière, à bonne distance, les deux rênes encadrent le cheval comme un couloir."),
    Q("Pendant un changement de main aux longues rênes…", ["Tu fais le tour du cheval en courant", "C'est le cheval qui change de côté, pendant que tu ajustes tes rênes", "Tu lâches une rêne", "Tu passes devant sa tête"], 1, "Tu restes derrière, à distance : le cheval change de direction et les rênes glissent sur sa croupe."),
    Q("Que doit accepter le cheval avant les changements de main aux longues rênes ?", ["Les rênes sur sa croupe et derrière ses cuisses", "Un mors de bride", "Un enrênement", "Le galop à faux"], 0, "Pendant le changement de main, une rêne glisse sur la croupe : le cheval doit l'accepter calmement."),
    Q("Pour la FFE, qu'est-ce que la mise en main ?", ["Le cheval qui baisse la tête jusqu'au sol", "Le cheval qui tire sur les rênes", "Le cheval tenu court au licol", "La décontraction de la bouche et de la nuque, chanfrein légèrement en avant de la verticale"], 3, "La mise en main, c'est la décontraction de la bouche et de la nuque ; la nuque reste le point le plus haut."),
    Q("En main, ton cheval lève la tête et se raidit. Que fais-tu ?", ["Je tire vers le bas", "Je ferme doucement les doigts et je cède dès qu'il relâche", "Je lâche les rênes", "Je m'arrête et je le recule"], 1, "On ferme doucement les doigts sans tirer, puis on cède dès que le cheval relâche sa mâchoire ou descend le nez."),
    Q("Ton cheval traîne pendant le travail en main. Que fais-tu d'abord ?", ["Je reprends plus de contact sur les rênes", "Je me place devant lui", "Je le remets en avant avec ma voix et mon stick", "Je raccourcis les rênes"], 2, "La mise en main vient de l'activité : on remet d'abord le cheval en avant, puis on reprend le contact.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-05 — LES DÉFAUTS D'APLOMBS   (programme FFE Galop 7 : identifier et nommer les défauts d'aplombs des membres)
   — reprend le brouillon g7-c6 (partie « Les aplombs »)
   --------------------------------------------------------------------------------- */
{ id: "g7n-05", icone: "🦵", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "Les défauts d'aplombs" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-03-bai-aplombs.webp", couv: {} },

    B("Observer les aplombs", [
      P("Les aplombs, c'est la façon dont les membres sont placés par rapport au corps et au sol. Des aplombs réguliers répartissent bien le poids sur les articulations, les tendons et les pieds. Au Galop 7, tu apprends à repérer les défauts d'aplombs et à les nommer avec les mots justes."),
      S("👀 Bien regarder", "On juge les aplombs d'un cheval arrêté, posé sur ses quatre membres, sur un sol plat et dur.", [
        "De face, pour les antérieurs.",
        "De profil, des deux côtés, pour les antérieurs et les postérieurs.",
        "De derrière, pour les postérieurs : à bonne distance, hors de portée d'un coup de pied, pendant qu'une autre personne tient le cheval.",
        "Puis en mouvement, au pas et au trot en ligne droite : on regarde comment chaque pied se lève et se pose."
      ]),
      S("📏 Les lignes d'aplomb", "Pour juger, on imagine un fil à plomb : une ligne verticale qui tombe d'un point repère du corps.", [
        { gras: "Antérieurs vus de face :", texte: "la verticale qui part de la pointe de l'épaule coupe le membre en deux moitiés égales, jusqu'au milieu du pied." },
        { gras: "Antérieurs vus de profil :", texte: "la verticale qui part de la pointe de l'épaule tombe un peu en avant de la pince." },
        { gras: "Postérieurs vus de profil :", texte: "la verticale qui part de la pointe de la fesse touche la pointe du jarret et longe l'arrière du canon." },
        { gras: "Postérieurs vus de derrière :", texte: "la verticale qui part de la pointe de la fesse coupe le membre en deux moitiés égales." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Avant de juger, place bien ton cheval : arrêté carré, la tête dans l'axe. Un cheval mal arrêté peut paraître campé ou sous lui alors que ses aplombs sont réguliers.")
    ]),

    B("Les défauts des antérieurs", [
      S("🔲 Vus de face", null, [
        { gras: "Ouvert du devant :", texte: "les membres s'écartent vers l'extérieur de la ligne d'aplomb." },
        { gras: "Serré du devant :", texte: "les membres se rapprochent vers l'intérieur : le cheval risque de se toucher." },
        { gras: "Panard :", texte: "les pinces sont tournées vers l'extérieur." },
        { gras: "Cagneux :", texte: "les pinces sont tournées vers l'intérieur." }
      ]),
      E("🔭", "Pour aller plus loin", "De face, c'est parfois le genou lui-même qui est dévié : on parle de genoux de bœuf quand ils se rapprochent vers l'intérieur, de genoux cambrés quand ils partent vers l'extérieur."),
      S("◀️ Vus de profil", null, [
        { gras: "Campé du devant :", texte: "le membre est placé en avant de la ligne d'aplomb ; le bas du membre et le pied risquent d'encaisser davantage les chocs." },
        { gras: "Sous lui du devant :", texte: "le membre est placé en arrière de la ligne d'aplomb, sous le corps ; les allures risquent d'être plus courtes et l'équilibre moins bon." },
        { gras: "Brassicourt ou arqué :", texte: "le genou est porté en avant de la ligne d'aplomb. On dit brassicourt quand le cheval est né ainsi, arqué quand le défaut vient de l'usure ou de l'âge." },
        { gras: "Genou creux :", texte: "le genou est en arrière de la ligne d'aplomb ; les tendons peuvent être davantage sollicités." },
        { gras: "Bouleté :", texte: "le boulet est porté en avant de la ligne d'aplomb ; les allures peuvent devenir raides." }
      ]),
      S("🦶 Le paturon", "De profil, on regarde aussi la longueur et l'inclinaison du paturon.", [
        { gras: "Long-jointé, bas-jointé :", texte: "le paturon est trop long (long-jointé) ou trop incliné, le boulet descendant vers le sol (bas-jointé). Les allures sont souvent souples, mais les tendons risquent de se fatiguer davantage." },
        { gras: "Court-jointé, droit-jointé :", texte: "le paturon est trop court (court-jointé) ou trop droit (droit-jointé). Il amortit moins bien les chocs : les allures risquent d'être dures et les articulations plus sollicitées." }
      ])
    ]),

    B("Les défauts des postérieurs", [
      S("◀️ Vus de profil", null, [
        { gras: "Campé du derrière :", texte: "le membre est placé en arrière de la ligne d'aplomb ; l'arrière-main risque de moins bien pousser et les jarrets de se fatiguer." },
        { gras: "Sous lui du derrière :", texte: "le membre est placé en avant de la ligne d'aplomb, sous le corps ; le cheval peut avoir tendance à forger." },
        { gras: "Jarret coudé :", texte: "l'angle du jarret est trop fermé : le canon s'incline vers l'avant et le pied se place sous le corps ; le jarret peut être plus exposé aux tares." },
        { gras: "Jarret droit :", texte: "l'angle du jarret est trop ouvert ; le jarret plie moins et le cheval peut manquer de détente." }
      ]),
      S("🔲 Vus de derrière", null, [
        { gras: "Ouvert du derrière :", texte: "les membres s'écartent vers l'extérieur de la ligne d'aplomb." },
        { gras: "Serré du derrière :", texte: "les membres se rapprochent vers l'intérieur : le cheval risque de se toucher." },
        { gras: "Jarrets clos :", texte: "les jarrets se rapprochent et se tournent l'un vers l'autre ; les pieds partent souvent vers l'extérieur. Tu liras parfois « jarrets crochus », mais ce mot n'a pas le même sens selon les auteurs : préfère « jarrets clos »." },
        { gras: "Jarrets cambrés :", texte: "les jarrets s'écartent vers l'extérieur ; l'articulation peut vaciller et se fatiguer." },
        "Panard et cagneux se rencontrent aussi aux postérieurs."
      ])
    ]),

    B("Pourquoi les aplombs comptent", [
      S("⚖️ Les risques d'un défaut", "Un défaut n'a pas toujours de conséquence : tout dépend de sa nature et de son importance. Quand il répartit mal le poids, certaines zones du membre travaillent plus que d'autres.", [
        "Le poser du pied peut changer : le pied se pose de travers et s'use plus d'un côté.",
        "Certaines articulations et certains tendons peuvent être surchargés : des tares, puis des boiteries, risquent d'apparaître à l'usage.",
        "Le cheval peut se toucher : il risque de se donner des atteintes, de se couper ou de forger.",
        "Les allures peuvent être moins régulières ou moins amples."
      ]),
      S("🧰 Ce que l'on peut faire", null, [
        "Chez le poulain, qui grandit encore, le vétérinaire et le maréchal-ferrant peuvent améliorer certains défauts s'ils interviennent tôt.",
        "Chez l'adulte, la conformation ne change plus : un parage et une ferrure adaptés l'aident à mieux poser ses pieds et soulagent ses membres.",
        "Des protections adaptées limitent les blessures d'un cheval qui se touche.",
        "On tient compte de ses aplombs dans le choix du travail et des sols, avec l'enseignant."
      ]),
      E("💡", "Le savais-tu ?", "Les fers gardent la trace des aplombs. Un fer usé nettement plus d'un côté que de l'autre montre que le pied se pose de travers : le maréchal-ferrant le regarde à chaque visite.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Juger un cheval sur un sol en pente, ou dans une litière épaisse ou une herbe haute qui cachent les pieds.",
        "Regarder un seul côté : un défaut peut ne toucher qu'un membre.",
        "Confondre campé et sous lui : repère toujours la ligne d'aplomb avant de nommer le défaut.",
        "Confondre panard et cagneux : regarde où pointe la pince."
      ]),
      S("🏇 Le défi du cavalier", "Avec ton enseignant, deviens l'œil de l'écurie.", [
        "Place un cheval du club arrêté carré sur un sol plat et observe-le de face, des deux profils et de derrière, à bonne distance.",
        "Nomme au moins un défaut d'aplomb, ou explique pourquoi ses aplombs sont réguliers, en montrant la ligne d'aplomb que tu utilises.",
        "Pendant qu'on le présente au trot en ligne droite, dis si ses pieds se posent droit ou s'ils partent vers l'intérieur ou l'extérieur."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon cheval est panard ou cagneux ?",
        "Un cheval aux aplombs imparfaits peut-il faire de la compétition ?",
        "Pourquoi un paturon trop long fatigue-t-il les tendons ?",
        "Quelle est la différence entre un jarret coudé et un jarret droit ?",
        "Comment le maréchal-ferrant peut-il aider un cheval qui a un défaut d'aplomb ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "De face, de profil, de derrière, à l'arrêt puis en mouvement.",
        "Panard : pinces dehors. Cagneux : pinces dedans.",
        "Campé : le membre s'éloigne du corps. Sous lui : il passe dessous.",
        "Brassicourt de naissance, arqué par l'usure.",
        "Jarrets clos : rapprochés. Jarrets cambrés : écartés."
      ]),
      E("", "", "Savoir lire les membres d'un cheval, c'est déjà savoir les protéger.")
    ])
  ],
  lexique: { fr: [
    ["Aplombs", "Direction des membres par rapport au corps et au sol."],
    ["Ligne d'aplomb", "Verticale imaginaire qui sert de repère pour juger un membre."],
    ["Panard", "Cheval dont les pinces sont tournées vers l'extérieur."],
    ["Cagneux", "Cheval dont les pinces sont tournées vers l'intérieur."],
    ["Campé", "Membre placé trop en avant (antérieur) ou trop en arrière (postérieur) de la ligne d'aplomb."],
    ["Sous lui", "Membre placé trop sous le corps, vu de profil."],
    ["Brassicourt", "Genou porté en avant de la ligne d'aplomb, de naissance (arqué s'il vient de l'usure)."],
    ["Jarrets clos", "Jarrets rapprochés et tournés l'un vers l'autre, vus de derrière."]
  ] },
  quiz: [
    Q("Comment juge-t-on correctement les aplombs d'un cheval ?", ["Monté, au galop", "Arrêté sur un sol plat, de face, de profil et de derrière, puis en mouvement", "Uniquement de profil, côté gauche", "Dans son box, sur la litière"], 1, "On observe le cheval arrêté carré sur un sol plat et dur, sous tous les angles, puis au pas et au trot en ligne droite."),
    Q("Un cheval dont les pinces sont tournées vers l'extérieur est…", ["Cagneux", "Serré du devant", "Panard", "Campé"], 2, "Panard : les pinces partent vers l'extérieur. Cagneux, c'est l'inverse."),
    Q("Vu de profil, un antérieur placé en avant de la ligne d'aplomb est…", ["Campé du devant", "Sous lui du devant", "Bouleté", "Genou creux"], 0, "Campé du devant : le membre s'éloigne du corps vers l'avant, et le bas du membre risque d'encaisser davantage les chocs."),
    Q("D'où part la ligne d'aplomb d'un postérieur vu de derrière ?", ["De la pointe de la hanche", "Du grasset", "De la pointe de la fesse", "Du milieu de la croupe"], 2, "La verticale part de la pointe de la fesse et doit couper le membre en deux moitiés égales."),
    Q("Quelle est la différence entre brassicourt et arqué ?", ["Il n'y en a aucune, ce sont deux défauts des jarrets", "Brassicourt : de naissance ; arqué : dû à l'usure ou à l'âge", "Brassicourt : genou en arrière ; arqué : genou en avant", "Brassicourt concerne les postérieurs, arqué les antérieurs"], 1, "Dans les deux cas, le genou est porté en avant de la ligne d'aplomb. Le mot change selon l'origine du défaut."),
    Q("Un paturon trop long, c'est un cheval…", ["Court-jointé", "Droit-jointé", "Long-jointé", "Bouleté"], 2, "Long-jointé : les allures sont souvent souples, mais les tendons risquent de se fatiguer davantage."),
    Q("Quel défaut amortit mal les chocs et rend les allures dures ?", ["Un paturon court et droit", "Un paturon long et incliné", "Des membres ouverts du devant", "Un genou creux"], 0, "Un paturon court ou trop droit joue moins bien son rôle d'amortisseur : les articulations risquent d'être plus sollicitées."),
    Q("Vus de derrière, des jarrets rapprochés et tournés l'un vers l'autre sont des jarrets…", ["Cambrés", "Droits", "Coudés", "Clos"], 3, "Ce sont des jarrets clos. Des jarrets écartés vers l'extérieur sont dits cambrés."),
    Q("Un postérieur placé sous le corps, en avant de la ligne d'aplomb, est…", ["Campé du derrière", "Sous lui du derrière", "Jarret droit", "Ouvert du derrière"], 1, "Sous lui du derrière : le membre passe sous le corps et le cheval peut avoir tendance à forger."),
    Q("Chez un cheval adulte, que peut faire le maréchal-ferrant face à un défaut d'aplomb ?", ["Le faire disparaître en une ferrure", "Rien du tout", "Adapter le parage et la ferrure pour soulager le cheval", "Raccourcir le paturon"], 2, "La conformation d'un adulte ne change plus, mais un parage et une ferrure adaptés l'aident à mieux poser ses pieds.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-06 — IDENTIFIER UN CHEVAL   (programme FFE Galop 7 : identifier un cheval à l'aide des outils si nécessaire ;
   lire un livret signalétique et vérifier le signalement d'un cheval). Cours progressif : court rappel des Galops 4 et 5
   (g4-identite, g5-identite : signalement en 5 regards, SIRE, puce), puis la pratique du Galop 7. Pas de brouillon g7-c* sur ce thème.
   --------------------------------------------------------------------------------- */
{ id: "g7n-06", icone: "🔍", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Identifier un cheval" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-17-pie-portrait.webp", couv: {} },

    B("Ce que tu sais déjà", [
      P("Aux Galops 4 et 5, tu as appris le signalement en 5 regards (sexe, robe, marques en tête, balzanes, épis), le rôle du document d'identification, du numéro SIRE et de la puce électronique. Au Galop 7, tu passes à la pratique : lire un livret en entier, vérifier qu'il correspond bien au cheval présenté, et utiliser les outils quand l'œil ne suffit pas.")
    ]),

    B("Lire un livret signalétique", [
      S("📗 Les grandes parties du livret", "Le document d'identification suit un modèle européen : ses pages sont rangées en sections.", [
        { gras: "L'identification :", texte: "nom, numéro SIRE, numéro de transpondeur, sexe, robe, date et lieu de naissance, naisseur, origines, puis le signalement." },
        { gras: "Les modifications :", texte: "castration, vérifications du signalement, rectifications et ajouts notés par un identificateur." },
        { gras: "Les médicaments :", texte: "la page qui indique si le cheval peut, ou non, être destiné un jour à la consommation humaine." },
        { gras: "Les contrôles d'identité :", texte: "chaque contrôle y est daté et signé." },
        { gras: "Les vaccinations :", texte: "une section pour la grippe équine, une autre pour les autres vaccins." }
      ]),
      S("✏️ Le signalement dessiné", "C'est le signalement graphique : un schéma du cheval vu des deux côtés, avec la tête de face et des vues des membres. Il est rempli par un identificateur. Depuis 2024, c'est lui qui sert de référence pour les nouvelles identifications.", [
        "Les marques blanches sont dessinées en rouge.",
        "Les épis sont marqués d'une petite croix, en noir.",
        "Les cicatrices sont signalées par une petite flèche.",
        { gras: "Et le signalement écrit ?", texte: "il n'est pas toujours présent. Depuis 2024, l'IFCE a supprimé le signalement littéral, rédigé en phrases, des nouvelles identifications SIRE. Un livret plus ancien peut en comporter un : il doit alors concorder avec le dessin." }
      ]),
      E("💡", "Le savais-tu ?", "Un cheval sans aucune marque blanche et avec très peu d'épis peut être reconnu grâce à ses châtaignes, ces plaques de corne à l'intérieur des membres. Leur forme est propre à chaque cheval, un peu comme une empreinte digitale : le livret prévoit une page pour les dessiner.")
    ]),

    B("Vérifier le signalement", [
      S("🔎 La méthode", "On vérifie toujours avec le livret ouvert, devant le cheval.", [
        "Le cheval est propre, tenu au licol, sur un sol plat, à la lumière du jour.",
        "Compare d'abord le sexe et la robe, puis la tête : marques blanches et épis du front.",
        "Passe aux membres un par un, en les nommant : antérieur gauche, antérieur droit, postérieur gauche, postérieur droit.",
        "Termine par les épis du corps (encolure, poitrail, flancs) et les cicatrices dessinées."
      ]),
      S("📡 Utiliser le lecteur de puce", "Quand l'œil ne suffit pas (cheval sans marques, deux chevaux qui se ressemblent, doute), on lit la puce. Le numéro seul ne suffit pas : il doit concorder avec le document, et le sexe, la robe et le signalement doivent concorder avec le cheval.", [
        "Allume le lecteur et approche-le calmement : certains chevaux se méfient de l'appareil ou de son bip.",
        "Passe-le lentement, en balayant, sur le côté gauche de l'encolure, à mi-chemin entre la nuque et le garrot, juste sous la crinière.",
        "Compare chiffre par chiffre le numéro affiché avec celui inscrit dans le livret.",
        "Si rien ne s'affiche, recommence plus lentement, puis préviens ton enseignant."
      ]),
      E("⚠️", "Un écart ?", "Un cheval gris blanchit avec l'âge, une cicatrice peut apparaître, un entier peut être castré : certains changements sont normaux, et c'est un identificateur (vétérinaire ou agent de l'IFCE) qui les note dans le livret. Toi, tu n'écris jamais dans un livret : tu signales l'écart à ton enseignant ou au propriétaire."),
      E("👨‍🏫", "Le conseil du coach", "Pour ne pas t'emmêler, mets-toi à la place du cheval : la vue de gauche du schéma, c'est son côté gauche. Place-toi à sa gauche pour comparer avec cette vue, puis change de côté pour la vue de droite.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Se fier au nom sur la porte du box ou sur le licol : seuls le livret et la puce prouvent l'identité.",
        "Comparer seulement les derniers chiffres de la puce.",
        "Oublier les épis : sur un cheval sans marques, ce sont souvent eux qui permettent de le reconnaître.",
        "Lire l'identité et oublier les vaccinations : en concours, on vérifie aussi que la vaccination contre la grippe est à jour."
      ]),
      S("🏇 Le défi du cavalier", "Avec ton enseignant, mène un vrai contrôle d'identité.", [
        "Ouvre le livret d'un cheval du club et retrouve chaque partie : identification, signalement dessiné, vaccinations, contrôles d'identité.",
        "Vérifie son signalement sur le cheval, membre par membre, en nommant chaque marque et chaque épi.",
        "Si le club a un lecteur, lis sa puce et compare le numéro, chiffre par chiffre, avec le livret."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment lire le signalement dessiné d'un livret ?",
        "Que faire si le signalement ne correspond pas au cheval ?",
        "Pourquoi les marques blanches sont-elles dessinées en rouge ?",
        "Que contient la page des médicaments du livret ?",
        "Comment reconnaître un cheval qui n'a aucune marque blanche ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Livret ouvert, devant le cheval, à la lumière du jour.",
        "Rouge : marques blanches. Croix : épis. Flèche : cicatrices.",
        "Gauche et droite : ceux du cheval.",
        "Puce, livret, sexe, robe, signalement : tout doit concorder.",
        "Un écart se signale, il ne se corrige pas soi-même."
      ]),
      E("", "", "Un cheval ne peut pas dire son nom : c'est à toi de savoir le lire.")
    ])
  ],
  lexique: { fr: [
    ["Livret signalétique", "Autre nom du document d'identification, qui réunit l'identité et le signalement du cheval."],
    ["Signalement graphique", "Schéma du cheval sur lequel sont dessinées ses marques, ses épis et ses cicatrices."],
    ["Signalement descriptif", "Description écrite du cheval. Le signalement littéral, rédigé en phrases, n'est plus établi pour les nouvelles identifications depuis 2024 ; dans un ancien livret, il doit concorder avec le dessin."],
    ["Transpondeur", "Autre nom de la puce électronique placée dans l'encolure."],
    ["Lecteur de transpondeur", "Appareil qui affiche le numéro de la puce quand on le passe près de l'encolure."],
    ["Épi", "Endroit où les poils changent de direction ; dessiné par une croix."],
    ["Châtaigne", "Plaque de corne à l'intérieur des membres, propre à chaque cheval."],
    ["Contrôle d'identité", "Vérification que le cheval présenté est bien celui du livret."]
  ] },
  quiz: [
    Q("Sur le signalement dessiné, en quelle couleur sont tracées les marques blanches ?", ["En rouge", "En bleu", "En noir", "En vert"], 0, "Les marques blanches sont dessinées en rouge ; les épis sont marqués d'une croix."),
    Q("Comment un épi est-il représenté sur le schéma ?", ["Il n'est pas dessiné", "Par un rond rouge", "Par une flèche", "Par une petite croix"], 3, "L'épi est marqué d'une petite croix. La flèche sert à localiser une cicatrice."),
    Q("Sur le schéma, la vue de gauche correspond…", ["À ta gauche quand tu regardes le livret", "Toujours à l'antérieur gauche seulement", "Au côté gauche du cheval", "À la vue de face"], 2, "Gauche et droite sont toujours ceux du cheval."),
    Q("Dans quelles conditions vérifie-t-on un signalement ?", ["Dans le box, le soir", "Cheval propre, au licol, sur un sol plat, à la lumière du jour", "Cheval monté, au pas", "Cheval mouillé après la douche"], 1, "Un cheval propre et bien éclairé permet de voir chaque marque et chaque épi."),
    Q("Deux chevaux se ressemblent et n'ont aucune marque. Quel outil t'aide à les identifier ?", ["Le licol avec le nom", "Le carnet de travail", "La couleur de la crinière", "Le lecteur de puce"], 3, "Le numéro lu doit concorder avec le livret, et le sexe, la robe et le signalement avec le cheval : c'est cet ensemble qui confirme son identité."),
    Q("Comment compares-tu le numéro de la puce avec le livret ?", ["Chiffre par chiffre, en entier", "Les trois derniers chiffres suffisent", "Seulement les premiers chiffres", "On compare le numéro SIRE avec la puce"], 0, "On compare tout le numéro, chiffre par chiffre : deux numéros peuvent se terminer de la même façon."),
    Q("Le signalement ne correspond pas tout à fait au cheval. Que fais-tu ?", ["Je corrige le dessin au stylo", "Je n'en parle à personne", "Je signale l'écart à mon enseignant ou au propriétaire", "Je déchire la page"], 2, "Seul un identificateur (vétérinaire ou agent de l'IFCE) peut noter une rectification dans le livret."),
    Q("Que trouve-t-on dans la page des médicaments du livret ?", ["Les résultats en concours", "Le numéro de licence du cavalier", "Le nom du propriétaire", "Si le cheval peut ou non être destiné à la consommation humaine"], 3, "Cette page indique notamment si le cheval est exclu ou non de la consommation humaine."),
    Q("Pourquoi un cheval gris peut-il sembler différent de son livret ?", ["Parce que sa robe blanchit avec l'âge", "Parce que la robe grise n'est jamais notée", "Parce que sa puce a changé", "Parce que ses épis disparaissent"], 0, "Un cheval gris blanchit en vieillissant : c'est un changement normal, à signaler sans s'inquiéter."),
    Q("À quoi peuvent servir les châtaignes ?", ["À connaître l'âge du cheval", "À savoir s'il est ferré", "À reconnaître un cheval sans marques", "À rien, on les coupe"], 2, "Leur forme est propre à chaque cheval : le livret prévoit une page pour les dessiner chez un cheval sans marques et avec très peu d'épis.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-07 — LE TRANSPORT ET LE BIEN-ÊTRE   (programme FFE Galop 7 : expliquer l'impact des transports sur la santé
   et le bien-être du cheval) — reprend le brouillon g7-c6 (partie « Transport et bien-être ») ;
   l'embarquement, les protections et la conduite sont au Galop 5 (g5n-07) : rappel seulement.
   --------------------------------------------------------------------------------- */
{ id: "g7n-07", icone: "🚛", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Le transport et le bien-être" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-19-ecurie-couchant.webp", couv: {} },

    B("Ce que le voyage fait au cheval", [
      P("Tu sais déjà embarquer un cheval et le protéger pour la route. Au Galop 7, tu comprends ce que le transport fait à son corps et à son moral, pour mieux préparer le voyage et surveiller ton cheval ensuite."),
      S("😟 Un moment stressant", "Pour un animal de fuite, être enfermé dans un petit espace qui bouge est inquiétant.", [
        "Le chargement est le moment le plus stressant. Le stress baisse pendant le trajet, mais ne revient au calme qu'après le débarquement.",
        "Son cœur bat plus vite qu'au repos pendant tout le voyage.",
        "Un cheval habitué au transport stresse moins qu'un jeune cheval qui le découvre."
      ]),
      S("💪 Un vrai effort physique", null, [
        "Debout, le cheval contracte sans cesse ses muscles pour garder son équilibre dans les virages, les freinages et les accélérations.",
        "Il écarte un peu ses membres pour se stabiliser : cet effort continu le fatigue.",
        "Plus le trajet est long, plus la fatigue s'accumule."
      ]),
      E("💡", "Le savais-tu ?", "Pendant un transport, un cheval peut perdre environ un demi pour cent de son poids par heure, surtout en eau : jusqu'à une trentaine de kilos pour un cheval de 500 kg après 12 heures de route. Il lui faut ensuite quelques jours pour les reprendre.")
    ]),

    B("Les risques pour sa santé", [
      S("🩺 Ce que le transport peut provoquer", null, [
        { gras: "La déshydratation :", texte: "il boit peu pendant le trajet et transpire, surtout quand il fait chaud." },
        { gras: "Les troubles digestifs :", texte: "perte d'appétit, coliques, ulcères d'estomac favorisés par le stress et les longues heures sans manger." },
        { gras: "Les troubles respiratoires :", texte: "dans un espace fermé, la poussière du foin et de la litière irrite ses voies respiratoires." },
        { gras: "Les blessures :", texte: "de l'embarquement au débarquement, surtout à côté d'un voisin inconnu ou agité." },
        { gras: "Les maladies contagieuses :", texte: "dans un véhicule mal nettoyé ou au contact d'autres chevaux, il peut attraper la grippe ou la gourme." }
      ]),
      S("🌡️ La fièvre du transport", "C'est une infection des voies respiratoires profondes qui peut apparaître après un long voyage et devenir grave : on parle alors de pleuropneumonie.", [
        "Attaché, le cheval ne peut pas baisser la tête : le mucus et la poussière s'évacuent mal de ses voies respiratoires et les microbes descendent vers les poumons.",
        "Le risque augmente avec la durée du trajet et le stress.",
        "Les signes apparaissent souvent dans les trois jours qui suivent : fièvre, toux, jetage, respiration rapide, cheval abattu qui mange moins. On appelle le vétérinaire."
      ])
    ]),

    B("Limiter l'impact du voyage", [
      S("🧭 Avant le départ", null, [
        "On ne transporte pas un cheval malade ou blessé. S'il doit aller se faire soigner, le vétérinaire dit d'abord s'il est apte au voyage et quelles précautions prendre.",
        "Un véhicule propre et désinfecté, bien aéré, sans courant d'air froid.",
        "Un foin de bonne qualité, peu poussiéreux, et une litière qui fait peu de poussière, comme les copeaux.",
        "Assez d'eau et un seau pour toute la durée du voyage."
      ]),
      S("🛣️ Pendant le trajet", null, [
        "Le cheval est attaché assez long pour pouvoir baisser un peu la tête, sans pouvoir passer sous la barre de poitrail.",
        "Une pause au moins toutes les 4 à 6 heures pour lui proposer à boire.",
        "Pendant les pauses, de l'eau et du foin, que l'on peut humidifier pour l'aider à se réhydrater.",
        "Plus le voyage est long, plus les risques augmentent : on ne fait pas durer le trajet plus que nécessaire, et un très long voyage se coupe d'une étape."
      ]),
      S("🏁 Après l'arrivée", null, [
        "Après un long trajet (plus de 8 heures), prends sa température matin et soir et surveille sa respiration pendant 2 à 3 jours.",
        "Vérifie qu'il boit, mange et fait ses crottins normalement.",
        "Compte quelques jours avant qu'il retrouve son poids et sa pleine forme après un très long voyage."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Habitue ton cheval à boire dans le seau que tu emporteras, et fais-le boire avant le départ. Un cheval qui refuse l'eau pendant les pauses se déshydrate beaucoup plus vite.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Donner un repas de concentrés juste avant le départ ou pendant les pauses : le stress perturbe déjà la digestion.",
        "Trop couvrir le cheval : dans un véhicule fermé, il a vite trop chaud et transpire.",
        "Faire voyager côte à côte deux chevaux qui ne s'entendent pas.",
        "Demander un effort intense dès la descente du camion, sans laisser le cheval récupérer."
      ]),
      S("🏇 Le défi du cavalier", "Avec ton enseignant, prépare et suis un déplacement comme un vrai groom.", [
        "Prépare la liste du voyage : eau, seau, foin peu poussiéreux, thermomètre, document d'identification.",
        "Prends la température de ton cheval la veille du départ et le lendemain du retour, puis compare-les.",
        "Au retour, observe s'il boit, mange et fait ses crottins normalement, et raconte à ton enseignant ce que tu as vu."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi le transport fatigue-t-il autant un cheval ?",
        "Qu'est-ce que la fièvre du transport ?",
        "Comment éviter que mon cheval se déshydrate pendant un long trajet ?",
        "Que faut-il surveiller après un long voyage ?",
        "Comment savoir si mon cheval supporte mal le transport ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Le transport stresse et fatigue, même sans bouger.",
        "Déshydratation, coliques, poussière : les risques du voyage.",
        "Tête qui peut baisser, air sans poussière.",
        "De l'eau au moins toutes les 4 à 6 heures.",
        "Après un long trajet : température 2 à 3 jours."
      ]),
      E("", "", "Un bon voyage ne se mesure pas à l'heure d'arrivée, mais à l'état du cheval le lendemain.")
    ])
  ],
  lexique: { fr: [
    ["Stress", "Réaction du corps face à une situation inquiétante ou fatigante."],
    ["Déshydratation", "Manque d'eau dans le corps."],
    ["Fièvre du transport", "Infection des voies respiratoires profondes qui peut suivre un long voyage."],
    ["Pleuropneumonie", "Forme grave de la fièvre du transport, qui touche les poumons et l'enveloppe qui les entoure."],
    ["Voies respiratoires", "Le chemin de l'air : naseaux, gorge, trachée, poumons."],
    ["Jetage", "Écoulement par les naseaux."],
    ["Gourme", "Maladie contagieuse qui touche la gorge et les ganglions du cheval."]
  ] },
  quiz: [
    Q("Quel est le moment le plus stressant du transport pour le cheval ?", ["Le chargement", "Le milieu du trajet", "Les pauses", "Le lendemain du voyage"], 0, "Le stress est au plus haut au chargement, puis baisse pendant le trajet sans revenir au calme avant le débarquement."),
    Q("Pourquoi un cheval est-il fatigué après un trajet, même s'il n'a pas travaillé ?", ["Parce qu'il a dormi debout", "Parce qu'il a trop mangé", "Parce qu'il contracte sans cesse ses muscles pour garder l'équilibre", "Parce que les protections le serrent"], 2, "Rester debout dans un véhicule qui freine et tourne demande un effort musculaire continu."),
    Q("Pendant un long trajet, un cheval peut perdre…", ["Rien du tout", "Quelques grammes", "La moitié de son poids", "Plusieurs dizaines de kilos, surtout en eau"], 3, "Environ un demi pour cent de son poids par heure : jusqu'à une trentaine de kilos en 12 heures pour un cheval de 500 kg."),
    Q("Pourquoi la tête attachée haute favorise-t-elle la fièvre du transport ?", ["Parce que le cheval ne voit pas la route", "Parce que le mucus et la poussière s'évacuent mal de ses voies respiratoires", "Parce qu'il ne peut pas manger son foin", "Parce que le licol le serre"], 1, "Baisser la tête aide le cheval à dégager ses voies respiratoires. Attaché court et haut, il n'y arrive plus."),
    Q("Quel signe, dans les jours qui suivent un voyage, doit faire appeler le vétérinaire ?", ["Il se roule au paddock", "Il hennit en arrivant", "Il a de la fièvre, tousse et mange moins", "Il boit beaucoup le soir du retour"], 2, "Fièvre, toux, jetage, respiration rapide et abattement peuvent signaler une fièvre du transport."),
    Q("Toutes les combien d'heures, au minimum, fait-on boire un cheval sur un long trajet ?", ["Toutes les 12 heures", "Toutes les 4 à 6 heures", "Une seule fois, à l'arrivée", "Toutes les 30 minutes"], 1, "Une pause au moins toutes les 4 à 6 heures permet de proposer de l'eau et limite la déshydratation."),
    Q("Que lui donne-t-on pendant les pauses ?", ["Un repas de céréales", "Des friandises en quantité", "Rien, pour ne pas le salir", "De l'eau et du foin, éventuellement humidifié"], 3, "De l'eau et du foin humidifié aident à le réhydrater ; les concentrés sont évités."),
    Q("Quelle litière limite la poussière dans le véhicule ?", ["Une paille poussiéreuse", "Les copeaux", "Du sable", "Aucune litière"], 1, "Les copeaux font peu de poussière ; avec un foin de qualité, ils protègent ses voies respiratoires."),
    Q("Après un trajet de plus de 8 heures, que surveilles-tu pendant 2 à 3 jours ?", ["Sa température et sa respiration", "La couleur de sa robe", "La longueur de sa crinière", "Ses fers seulement"], 0, "Une fièvre ou une respiration anormale après un long voyage doit alerter."),
    Q("Quelles maladies contagieuses un cheval peut-il attraper en voyage ou en concours ?", ["La fourbure", "Les coliques", "La grippe et la gourme", "Les défauts d'aplombs"], 2, "Au contact d'autres chevaux ou dans un véhicule mal nettoyé, grippe et gourme peuvent se transmettre.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-08 — LE RATIONNEMENT ET LES ALIMENTS   (programme FFE Galop 7 : expliquer les principes de rationnement pour la santé
   et le bien-être du cheval ; connaître les noms des produits pour l'alimentation et la complémentation du cheval)
   — reprend le brouillon g7-c6 (partie « Les principes du rationnement ») ; les bases (fourrage, eau, digestion) sont aux Galops 4 et 5.
   --------------------------------------------------------------------------------- */
{ id: "g7n-08", icone: "🌾", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "Le rationnement et les aliments" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-14-bai-brun-portrait.webp", couv: {} },

    B("Les principes du rationnement", [
      P("Tu sais déjà que le fourrage est la base de l'alimentation et que l'eau ne doit jamais manquer. Au Galop 7, tu comprends comment on établit une ration : ce dont le cheval a besoin, ce que chaque aliment lui apporte, et comment ajuster l'un à l'autre."),
      S("📊 Les besoins du cheval", "Rationner, c'est couvrir les besoins du cheval, sans manque ni excès.", [
        { gras: "L'énergie :", texte: "elle se compte en UFC, l'unité fourragère cheval. 1 UFC, c'est l'énergie apportée par 1 kg d'orge." },
        { gras: "Les protéines :", texte: "elles se comptent en grammes de MADC, les matières azotées digestibles cheval. Elles servent notamment à construire et entretenir les muscles." },
        { gras: "Les minéraux et les vitamines :", texte: "calcium, phosphore, sel, oligo-éléments et vitamines." },
        { gras: "L'eau :", texte: "de 20 à 80 litres par jour, selon la chaleur, le travail et la ration." }
      ]),
      S("🔢 Entretien et production", null, [
        "Le besoin d'entretien, c'est ce qu'il faut à un cheval au repos pour garder son poids et sa santé. Il dépend surtout de son poids.",
        "S'y ajoutent les besoins de production : le travail, la croissance, la gestation, l'allaitement.",
        "Exemple : un cheval de 600 kg à l'entretien a besoin d'environ 4,8 UFC par jour. Une dizaine de kilos de bon foin les lui apporte."
      ]),
      E("🔭", "Pour aller plus loin", "Sur l'étiquette d'un aliment, tu lis souvent MAT, les matières azotées totales : c'est toute la quantité de protéines de l'aliment. La MADC, utilisée pour calculer la ration, ne compte que la part que le cheval digère vraiment.")
    ]),

    B("Construire et distribuer la ration", [
      S("🧮 Dans quel ordre ?", null, [
        "D'abord le fourrage, en quantité suffisante : à l'entretien, un cheval de 600 kg mange environ 10 kg de foin par jour.",
        "Ensuite les concentrés, seulement si le fourrage ne couvre pas les besoins : travail, croissance, gestation.",
        "Enfin le sel et, si la ration en manque, un CMV pour équilibrer les minéraux et les vitamines.",
        "Puis on vérifie : poids et état corporel, et on ajuste la ration si besoin."
      ]),
      S("⏰ Les règles de distribution", null, [
        "Les concentrés en au moins deux repas, à heures fixes. Repère de l'IFCE : pas plus de 2 kg bruts ou 4 litres par repas. C'est un plafond, pas une dose : la portion dépend du cheval et de l'aliment, et ta mesure doit être pesée.",
        "Le fourrage avant les concentrés, autant que possible.",
        "Une bonne part du foin le soir : la nuit est longue.",
        "Pas plus de 4 heures sans rien à mâcher."
      ]),
      S("🔄 Les transitions alimentaires", "Tout changement se fait progressivement, même un nouveau lot de foin.", [
        "Compte une dizaine de jours de transition à chaque changement d'aliment, fourrages compris.",
        "On mélange l'ancien et le nouvel aliment, en augmentant peu à peu la part du nouveau.",
        "Un changement brutal dérègle les micro-organismes de l'intestin : coliques, diarrhée, voire fourbure."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Regarde ton cheval plus que le tableau de rations : la ration est bonne s'il garde un bon état, ni maigre ni gras, et l'énergie que demande son travail. Si son état change, parles-en au responsable des soins avant de toucher à quoi que ce soit.")
    ]),

    B("Les produits pour nourrir le cheval", [
      S("🌾 Les fourrages", null, [
        { gras: "L'herbe :", texte: "le fourrage naturel du cheval, riche en eau." },
        { gras: "Le foin :", texte: "de l'herbe fauchée puis séchée, la base de la ration à l'écurie. Il sent bon, sans poussière ni moisissure." },
        { gras: "La paille :", texte: "les tiges sèches des céréales. Pauvre en énergie, elle occupe le cheval et apporte des fibres ; elle reste une petite part du fourrage, environ un tiers au plus." },
        { gras: "L'enrubanné :", texte: "de l'herbe séchée en partie puis emballée sous plastique. Plus humide que le foin et peu poussiéreux, il se consomme vite une fois ouvert ; une balle percée peut moisir." },
        { gras: "La luzerne :", texte: "un fourrage riche en protéines et en calcium, donné en foin ou déshydraté." }
      ]),
      S("🥣 Les concentrés", null, [
        { gras: "L'avoine :", texte: "la céréale traditionnelle du cheval, un peu moins énergétique que l'orge." },
        { gras: "L'orge :", texte: "la céréale de référence (1 UFC par kg), souvent aplatie ou floconnée pour être mieux digérée." },
        { gras: "Le maïs :", texte: "la plus énergétique des trois et la plus riche en amidon, souvent donné floconné." },
        { gras: "Le son :", texte: "l'enveloppe du grain de blé, utilisée surtout dans les mash. Riche en phosphore, il se donne en petite quantité." },
        { gras: "Les aliments du commerce :", texte: "leur étiquette indique leur fonction. Un aliment complet est conçu pour assurer à lui seul la ration du jour. Un aliment complémentaire de fourrages complète une ration à base de foin ou d'herbe. Un aliment complémentaire de céréales rééquilibre une ration riche en céréales." },
        { gras: "Granulés ou floconnés :", texte: "c'est seulement leur présentation, pas leur fonction. Granulés : aliment broyé puis pressé en petits bâtonnets. Floconnés : céréales cuites à la vapeur puis aplaties, souvent mélangées." }
      ]),
      S("💊 La complémentation", null, [
        { gras: "L'AMV, couramment appelé CMV :", texte: "l'aliment minéral vitaminé. Il apporte minéraux, oligo-éléments et vitamines. On le donne pour combler les manques de la ration : il est souvent utile avec une ration faite seulement de fourrage et de céréales." },
        { gras: "La pierre à sel :", texte: "un bloc de sel à disposition en permanence, à l'abri de la pluie et des crottins." },
        { gras: "Les électrolytes :", texte: "des sels minéraux donnés après un effort long et intense, quand le cheval a beaucoup transpiré." },
        { gras: "Les compléments alimentaires :", texte: "pour les articulations, les sabots, le poil… seulement sur conseil du vétérinaire, en vérifiant qu'ils ne contiennent aucune substance interdite en compétition." }
      ]),
      E("💡", "Le savais-tu ?", "Le sel est le seul minéral que le cheval sait doser tout seul : il va lécher sa pierre à sel quand il en a besoin. Pour le calcium ou le phosphore, il n'a pas ce réflexe : c'est la ration qui doit les apporter.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Distribuer les concentrés au litre sans savoir combien ils pèsent : un litre d'avoine ne pèse pas autant qu'un litre de granulés.",
        "Ajouter un CMV à un aliment du commerce qui en contient déjà : trop de minéraux n'est pas mieux.",
        "Donner un foin poussiéreux ou moisi, ou un enrubanné d'une balle percée.",
        "Garder la même ration quand le travail s'arrête (vacances, blessure) : au repos, le cheval a besoin de moins d'énergie."
      ]),
      S("🏇 Le défi du cavalier", "Avec le responsable des soins, mène l'enquête sur la ration d'un cheval.", [
        "Relève sa ration : quels fourrages, quels concentrés, quels compléments, et combien de repas par jour.",
        "Pèse un litre de son concentré et calcule combien de kilos il en reçoit par jour.",
        "Lis l'étiquette d'un sac d'aliment et retrouve sa dénomination (complet ou complémentaire), sa teneur en protéines (MAT) et, si elle est indiquée, sa valeur en UFC."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qu'est-ce qu'une UFC ?",
        "Comment calculer la ration de mon cheval ?",
        "Quelle différence entre le foin et l'enrubanné ?",
        "Mon cheval a-t-il besoin d'un CMV ?",
        "Comment faire une transition alimentaire ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Énergie en UFC, protéines en MADC.",
        "Fourrage d'abord, puis concentrés et CMV selon les manques.",
        "Concentrés : 2 kg au plus par repas, mesure pesée.",
        "Une dizaine de jours pour changer d'aliment.",
        "L'état du cheval dit si la ration est juste."
      ]),
      E("", "", "Une bonne ration ne se lit pas dans un tableau : elle se voit sur le cheval.")
    ])
  ],
  lexique: { fr: [
    ["Ration", "Ensemble des aliments donnés au cheval en une journée."],
    ["UFC", "Unité fourragère cheval : l'unité d'énergie ; 1 UFC = l'énergie d'1 kg d'orge."],
    ["MADC", "Matières azotées digestibles cheval : les protéines que le cheval digère, en grammes."],
    ["Besoin d'entretien", "Ce qu'il faut à un cheval au repos pour garder son poids et sa santé."],
    ["Enrubanné", "Herbe en partie séchée puis emballée sous plastique."],
    ["Floconné", "Céréale cuite à la vapeur puis aplatie, plus digeste."],
    ["AMV (CMV)", "Aliment minéral vitaminé, couramment appelé CMV : il apporte minéraux, oligo-éléments et vitamines."],
    ["Transition alimentaire", "Passage progressif d'un aliment à un autre, sur une dizaine de jours."]
  ] },
  quiz: [
    Q("En quelle unité compte-t-on l'énergie de la ration du cheval ?", ["En calories par repas", "En UFC", "En MADC", "En litres"], 1, "L'énergie se compte en UFC, l'unité fourragère cheval ; les protéines en grammes de MADC."),
    Q("1 UFC correspond à l'énergie apportée par…", ["1 kg de foin", "1 kg de paille", "1 litre d'avoine", "1 kg d'orge"], 3, "L'orge sert de référence : 1 kg d'orge apporte 1 UFC."),
    Q("Que mesure la MADC ?", ["Les protéines que le cheval digère vraiment", "Le sucre de la ration", "L'eau bue dans la journée", "Les fibres du foin"], 0, "MADC : matières azotées digestibles cheval, c'est-à-dire les protéines réellement digérées."),
    Q("Dans quel ordre construit-on une ration ?", ["Concentrés, puis fourrage, puis sel", "CMV, puis concentrés, puis fourrage", "Fourrage, puis concentrés si besoin, puis CMV et sel", "Peu importe l'ordre"], 2, "Le fourrage est la base ; les concentrés comblent ce qui manque en énergie et en protéines ; le CMV, si besoin, et le sel équilibrent minéraux et vitamines."),
    Q("Quel repère l'IFCE donne-t-il pour les concentrés à chaque repas ?", ["500 g au plus", "2 kg bruts ou 4 litres au plus", "5 kg au moins", "Autant qu'il en veut"], 1, "C'est un plafond, pas une dose à atteindre : la portion dépend du cheval et de l'aliment, et on pèse sa mesure pour savoir ce que l'on donne vraiment."),
    Q("Combien de temps compte-t-on pour une transition alimentaire ?", ["Un repas", "Deux jours", "Une dizaine de jours", "Six mois"], 2, "On mélange l'ancien et le nouvel aliment sur une dizaine de jours, fourrages compris."),
    Q("Qu'est-ce que l'enrubanné ?", ["De l'herbe en partie séchée puis emballée sous plastique", "De la paille hachée", "Un mélange de céréales", "Un complément vitaminé"], 0, "Plus humide que le foin et peu poussiéreux, il se consomme vite une fois la balle ouverte."),
    Q("Laquelle de ces céréales est la plus énergétique ?", ["L'avoine", "L'orge", "Le maïs", "Le son"], 2, "Le maïs est la plus énergétique et la plus riche en amidon ; l'avoine l'est un peu moins que l'orge."),
    Q("À quoi sert le CMV ?", ["À remplacer le foin", "À soigner les coliques", "À donner de l'énergie rapide", "À apporter minéraux, oligo-éléments et vitamines"], 3, "L'aliment minéral vitaminé, couramment appelé CMV, comble les manques de la ration en minéraux, oligo-éléments et vitamines."),
    Q("Pourquoi met-on une pierre à sel à disposition ?", ["Pour occuper le cheval", "Parce que le sel est le seul minéral qu'il sait doser lui-même", "Pour remplacer l'eau", "Pour l'empêcher de boire trop"], 1, "Le cheval lèche sa pierre à sel selon ses besoins ; les autres minéraux doivent venir de la ration.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-09 — LE CHEVAL SUR LA MAIN   (programme FFE Galop 7 : avoir le cheval sur la main aux trois allures ;
   mettre le cheval rond et bas au pas et au trot ; varier l'amplitude aux trois allures et enchaîner des transitions ;
   enchaîner des mouvements en gardant une cadence régulière ; reculer de 3 à 5 pas et repartir immédiatement)
   — reprend le brouillon g7-c1 (partie mise sur la main) et le brouillon g7-c3 (le reculer)
   --------------------------------------------------------------------------------- */
{ id: "g7n-09", icone: "🤝", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Le cheval sur la main" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-06-alezan-rond.webp", couv: {} },

    B("Qu'est-ce qu'un cheval sur la main ?", [
      P("Au Galop 7, tu ne te contentes plus d'un cheval qui avance et qui tourne : tu le veux disponible, à l'écoute de tes aides, aux trois allures. C'est ce qu'on appelle un cheval sur la main. Tout le reste du travail sur le plat s'appuie sur cette base."),
      S("📖 La définition de la FFE", "Un cheval est sur la main lorsque, ses allures étant correctes, il est souple, garde un contact fidèle et moelleux et accepte les actions de la main sans résister.", [
        { gras: "Des allures correctes :", texte: "régulières, actives, sans précipitation." },
        { gras: "Souple :", texte: "son dos et son encolure ne sont pas raides, il se laisse incurver." },
        { gras: "Un contact fidèle et moelleux :", texte: "la tension des rênes reste constante et légère ; le cheval ne tire pas et ne lâche pas le mors." },
        { gras: "Perméable :", texte: "quand tu fermes les doigts, il cède dans sa bouche et sa nuque au lieu de se raidir." }
      ]),
      S("🔁 Comment l'obtenir ?", "Un cheval sur la main, ça ne s'obtient jamais en tirant sur la bouche : l'énergie part de l'arrière et arrive dans ta main.", [
        "Tes jambes entretiennent l'activité : les postérieurs poussent, le dos transmet, la bouche reçoit.",
        "Ta main reste fixe et moelleuse : elle reçoit cette énergie, elle ne la retient pas.",
        "Si le cheval résiste, tes doigts se ferment, sans reculer la main ; dès qu'il cède, ils se relâchent.",
        "Le cheval se place alors de lui-même dans l'attitude du ramener : la nuque reste le point le plus haut et le chanfrein s'approche de la verticale, sans passer derrière."
      ]),
      S("🎠 Aux trois allures", null, [
        { gras: "Au pas :", texte: "le cheval balance son encolure à chaque foulée. Ta main suit ce mouvement, sinon il raccourcit son pas." },
        { gras: "Au trot :", texte: "l'encolure bouge peu. Tes mains restent stables, avec un contact égal sur les deux rênes." },
        { gras: "Au galop :", texte: "l'encolure monte et descend à chaque foulée ; tes bras accompagnent ce mouvement d'avant en arrière, pour garder le même contact." }
      ])
    ]),

    B("Rond et bas", [
      S("🦒 De quoi s'agit-il ?", "Le cheval étend son encolure vers l'avant et vers le bas, en gardant le contact. Son dos se tend et s'arrondit sous ta selle.", [
        "Le nez reste en avant de la verticale et la nuque ne se casse pas : le cheval s'étire, il ne s'enroule pas.",
        "Il garde la même allure, la même cadence et le même équilibre.",
        "Au Galop 6, tu as découvert l'extension d'encolure au trot enlevé sur le cercle. Au Galop 7, tu mets ton cheval rond et bas au pas et au trot, et tu sais le reprendre ensuite."
      ]),
      S("🧭 Comment faire ?", "Pars d'un cheval sur la main, actif, au pas ou au trot.", [
        "Garde tes jambes au contact pour entretenir l'activité.",
        "Ouvre progressivement les doigts et avance un peu les mains : les rênes s'allongent et le cheval suit le mors vers le bas.",
        "Garde un contact léger tout le long : le cheval doit chercher la main en descendant, pas seulement tomber sur ses épaules.",
        "Pour revenir, raccourcis tes rênes petit à petit, jambes présentes : le cheval remonte son encolure sans perdre son activité."
      ]),
      E("💡", "Le savais-tu ?", "Pour la FFE, le cheval qui étend son encolure vers l'avant et vers le bas, sans peser plus sur la main ni changer d'allure ou d'équilibre, prouve que son contact est bon et qu'il est décontracté. C'est pourquoi on retrouve ce test dans les reprises de dressage.")
    ]),

    B("Amplitude, transitions et cadence", [
      S("🎵 Deux notions à garder en tête", "Tu les as vues au Galop 5 : la cadence, c'est le tempo des foulées ; l'amplitude, c'est leur longueur. Au Galop 7, tu fais varier la seconde sans toucher à la première.", [
        "La cadence doit rester bonne et stable dans chaque allure.",
        "Tant que tu ne demandes pas de changement, l'amplitude reste la même : c'est le signe d'une poussée régulière des postérieurs."
      ]),
      S("↕️ Varier l'amplitude aux trois allures", null, [
        { gras: "Allonger :", texte: "tes jambes demandent plus d'énergie aux postérieurs et tes mains laissent l'encolure s'allonger un peu. Les foulées s'agrandissent, la cadence ne change pas." },
        { gras: "Raccourcir :", texte: "grandis-toi, ferme les doigts sans tirer, et garde tes jambes au contact pour conserver l'activité. Les foulées se raccourcissent mais restent énergiques. Dès que le cheval répond, relâche tes doigts." },
        { gras: "Au pas :", texte: "c'est l'allure où l'encolure s'allonge le plus nettement. Ne pousse pas trop fort : un pas pressé perd sa régularité." }
      ]),
      S("🔗 Enchaîner les transitions et les mouvements", "Pour la FFE, la cadence et l'énergie doivent être maintenues jusqu'au moment précis où l'allure ou le mouvement change.", [
        "Le cheval reste sur la main pendant toute la transition : pas de tête qui monte, pas de bouche qui s'ouvre.",
        "Après la transition, retrouve tout de suite une cadence régulière adaptée à la nouvelle allure.",
        "Quand tu enchaînes cercle, ligne droite, allongement et transition, garde une cadence régulière d'une figure à l'autre."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Compte dans ta tête, ou fredonne un air au rythme des foulées. Si ton compte s'accélère quand tu allonges, ton cheval se précipite ; s'il ralentit quand tu raccourcis, il perd son activité. Le bon allongement, c'est le même tempo avec de plus grandes foulées.")
    ]),

    B("Reculer de 3 à 5 pas et repartir", [
      S("↩️ Le reculer, rappel", "Le reculer est à la fois un assouplissement et un mouvement de présentation. Le cheval recule en diagonal, à deux temps, sans moment de suspension : chaque diagonal se lève et se pose à son tour.", [
        "Il reste sur la main et droit : ses postérieurs reculent dans la trace des antérieurs.",
        "Ses pieds se lèvent nettement, sans traîner.",
        "On compte un pas chaque fois qu'un antérieur recule."
      ]),
      S("🦵 Demander le reculer", "Le reculer est une réponse que le cheval a apprise : on le demande à un cheval éduqué, avec les aides que ton enseignant te montre. Pars d'un arrêt bien droit et immobile.", [
        "Ferme tes jambes au contact et, en même temps, ferme tes doigts sur les rênes, sans tirer ni reculer la main.",
        "Reste droit, sans te pencher en arrière ni peser dans la selle.",
        "Dès que le cheval recule d'un pas, cède : tes doigts et tes jambes se relâchent.",
        "Puis redemande le pas suivant, en comptant jusqu'à 3, 4 ou 5."
      ]),
      S("▶️ Repartir immédiatement", "Au Galop 7, le cheval ne s'arrête pas entre le reculer et le départ : il repart franchement, dans l'allure demandée.", [
        "Au dernier pas, ouvre les doigts et avance un peu les mains : tu ouvres la porte de devant.",
        "Dans le même temps, tes jambes demandent l'avant.",
        "Le cheval repart en avant, sur la main, sans hésiter et sans se précipiter."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tirer sur les rênes pour placer la tête : le cheval se raidit et n'est plus sur la main.",
        "Jeter les rênes pour obtenir le rond et bas : le cheval tombe sur ses épaules et perd le contact.",
        "Allonger en accélérant les foulées au lieu de les agrandir.",
        "Reculer en tirant vers soi : le cheval lève la tête, creuse son dos et traîne les pieds.",
        "Laisser le cheval reculer de travers ou trop vite, sans compter les pas."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que ton cheval est disponible.", [
        "Au trot, sur un cercle de 20 m, mets ton cheval rond et bas pendant un tour, puis reprends-le sur la main, sans changer de cadence.",
        "Sur un grand côté, allonge le trot, puis raccourcis-le sur le petit côté suivant, en comptant les foulées.",
        "Arrête-toi à une lettre, recule de 4 pas bien droits et repars immédiatement au pas."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon cheval est vraiment sur la main ?",
        "Pourquoi mon cheval accélère-t-il quand je lui demande de descendre l'encolure ?",
        "Quelle différence entre rond et bas et rênes longues ?",
        "Comment allonger le pas sans que mon cheval se dépêche ?",
        "Que faire si mon cheval refuse de reculer ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Sur la main : souple, contact moelleux, perméable.",
        "L'énergie va des jambes vers la main.",
        "Rond et bas : nez en avant de la verticale.",
        "Varier l'amplitude, garder la cadence.",
        "Reculer droit, compter, repartir sans s'arrêter."
      ]),
      E("", "", "Un cheval sur la main, c'est une conversation où chacun écoute l'autre.")
    ])
  ],
  lexique: { fr: [
    ["Sur la main", "Cheval aux allures correctes, souple, au contact fidèle et moelleux, qui accepte les actions de la main sans résister."],
    ["Contact", "Lien entre la bouche du cheval et la main du cavalier quand les rênes sont ajustées."],
    ["Perméable", "Se dit d'un cheval qui accepte les aides et y répond sans se raidir."],
    ["Ramener", "Attitude où la tête se rapproche de la verticale, la nuque restant le point le plus haut."],
    ["Rond et bas", "Attitude où le cheval étend son encolure vers l'avant et vers le bas, au contact, le dos arrondi."],
    ["Cadence", "Tempo des foulées ; elle doit rester bonne et stable dans chaque allure."],
    ["Reculer", "Déplacement vers l'arrière en diagonal, à deux temps, sans suspension."],
    ["Diagonal", "Un antérieur et le postérieur opposé, qui se lèvent et se posent ensemble."]
  ] },
  quiz: [
    Q("Selon la FFE, un cheval sur la main est…", ["Un cheval qui a la tête basse", "Un cheval aux allures correctes, souple, au contact fidèle et moelleux", "Un cheval qui tire sur les rênes", "Un cheval qui avance sans contact"], 1, "La FFE parle d'allures correctes, de souplesse, d'un contact fidèle et moelleux, et d'un cheval qui accepte les actions de la main."),
    Q("D'où vient la mise sur la main ?", ["Des mains qui ramènent la tête", "De l'enrênement", "De l'énergie des postérieurs, reçue par une main fixe et moelleuse", "Du mors, plus il est fort, mieux c'est"], 2, "Les jambes entretiennent l'activité, l'énergie traverse le dos et arrive dans la main, qui la reçoit sans tirer."),
    Q("Dans le ramener, quel est le point le plus haut du cheval ?", ["La nuque", "Le garrot", "Le chanfrein", "Le milieu de l'encolure"], 0, "La nuque reste le point le plus haut et le chanfrein s'approche de la verticale, sans passer derrière."),
    Q("Au pas, pourquoi ta main doit-elle suivre le mouvement de l'encolure ?", ["Elle ne doit pas bouger du tout", "Pour faire accélérer le cheval", "Pour que le cheval baisse la tête", "Parce que le cheval balance son encolure à chaque foulée"], 3, "Au pas, l'encolure balance. Une main bloquée raccourcit le pas du cheval."),
    Q("Dans l'attitude rond et bas, le nez du cheval…", ["Passe derrière la verticale", "Touche le poitrail", "Reste en avant de la verticale", "Monte plus haut que la nuque"], 2, "Le cheval s'étire vers l'avant et vers le bas, le nez en avant de la verticale. S'il s'enroule, il ne s'étire plus."),
    Q("Pour mettre ton cheval rond et bas, tu…", ["Lâches complètement les rênes", "Tires les rênes vers le bas", "Arrêtes tes jambes", "Ouvres progressivement les doigts en gardant un contact léger et tes jambes actives"], 3, "Les rênes s'allongent progressivement, le cheval suit le mors vers le bas, et tes jambes gardent l'activité."),
    Q("Tu allonges le trot. Qu'est-ce qui doit rester identique ?", ["La longueur des foulées", "La cadence", "La vitesse", "La position de l'encolure"], 1, "Allonger, c'est agrandir les foulées : la cadence, elle, ne change pas."),
    Q("Pendant une transition, le cheval…", ["Reste sur la main, sans tête qui monte ni bouche qui s'ouvre", "Peut lever la tête, c'est normal", "Doit ralentir juste avant", "Doit changer de cadence avant de changer d'allure"], 0, "La cadence et l'énergie sont maintenues jusqu'au moment du changement, et le cheval reste sur la main."),
    Q("Comment se déplacent les membres au reculer ?", ["Par bipèdes latéraux, comme à l'amble", "Un membre après l'autre, à quatre temps", "En diagonal, à deux temps, sans suspension", "Par bonds, avec une suspension"], 2, "Le reculer se fait en diagonal, à deux temps : chaque diagonal se lève et se pose à son tour, sans suspension."),
    Q("Après tes 4 pas de reculer, que demande le Galop 7 ?", ["Un arrêt de quelques secondes avant de repartir", "Encore 4 pas de reculer", "Un demi-tour", "Repartir immédiatement en avant, sans s'arrêter"], 3, "Le cheval repart immédiatement, franchement, dans l'allure demandée : tu ouvres les doigts et tes jambes demandent l'avant.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-10 — LA DÉTENTE ET LA POSITION   (programme FFE Galop 7 : réaliser la détente du cheval en respectant les consignes
   de l'enseignant ; être dans une position juste, dynamique et adaptée au travail) — pas de brouillon g7-c* sur ce thème
   (le Galop 6, brouillon g6-c7, parlait déjà de la détente : on ne reprend que l'essentiel)
   --------------------------------------------------------------------------------- */
{ id: "g7n-10", icone: "🌡️", type: { fr: "pratique" }, duree: { fr: "10 min" }, titre: { fr: "La détente et la position" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-02-detente-couvre-reins.webp", couv: {} },

    B("À quoi sert la détente ?", [
      P("La détente, c'est le début de chaque séance. Au Galop 6, tu as appris à détendre ton cheval. Au Galop 7, tu la réalises en suivant les consignes de ton enseignant : il l'adapte au cheval, au jour et au travail qui suit, et tu dois savoir l'appliquer avec précision."),
      S("🎯 Les deux objectifs", "Pour la FFE, la détente sert d'abord à obtenir la décontraction du cheval et à échauffer progressivement ses muscles.", [
        { gras: "La décontraction :", texte: "un cheval calme, sans inquiétude ni nervosité, qui se laisse aller dans ses allures." },
        { gras: "L'échauffement :", texte: "les muscles, les tendons et les articulations se préparent à l'effort, petit à petit." }
      ]),
      S("👀 Les signes d'une détente réussie", "Aucun signe ne suffit à lui seul : tu les observes ensemble.", [
        "Ses allures deviennent régulières et souples.",
        "Il accepte le contact et se laisse incurver des deux côtés.",
        "Il répond à des aides légères, sans se précipiter : il est disponible.",
        "Il peut aussi s'ébrouer, mâchonner son mors et relâcher son encolure : ces signes accompagnent souvent la détente, mais seuls, ils ne la prouvent pas."
      ]),
      E("💡", "Le savais-tu ?", "Un cheval qui sort de son box n'a presque pas bougé depuis des heures : ses muscles, ses tendons et ses articulations ont besoin de plusieurs minutes de pas pour se préparer. Le pas du début de séance n'est jamais du temps perdu.")
    ]),

    B("Détendre selon les consignes", [
      S("📋 Une progression type", "L'enseignant fixe l'ordre et la durée. Voici le principe le plus courant : on commence lentement, puis on demande de plus en plus.", [
        { gras: "Le pas :", texte: "plusieurs minutes de pas actif, rênes longues ou au contact léger, sur de grandes lignes." },
        { gras: "Le trot :", texte: "au trot enlevé, sur de grandes courbes et des lignes droites, dans une attitude ronde et basse pour étirer le dos." },
        { gras: "Le galop :", texte: "sur les deux mains, en équilibre, pour libérer le dos et activer le cheval." },
        { gras: "Les transitions :", texte: "elles rendent le cheval plus réactif aux jambes et à la main." },
        { gras: "Puis le travail :", texte: "contact plus présent, courbes plus serrées, incurvation, avant les exercices de la séance." }
      ]),
      S("🔄 L'adapter au cheval et au jour", "Ton enseignant peut modifier cette progression. Écoute pourquoi, pour savoir le faire plus tard.", [
        "Par temps froid, le pas dure plus longtemps.",
        "Un cheval vif ou au dos raide peut être galopé plus tôt, calmement, pour se libérer.",
        "Avant un parcours d'obstacles ou de cross, la détente se termine par quelques sauts, choisis par l'enseignant.",
        "Un cheval âgé ou raide des articulations demande un échauffement plus long et plus progressif."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pendant la détente, sois curieux : demande-toi comment est ton cheval aujourd'hui. Plus raide d'un côté ? Plus froid aux jambes ? Plus inquiet ? Dis-le à ton enseignant : c'est ce qui lui permet d'ajuster ses consignes, et c'est ce qui fera de toi un cavalier autonome.")
    ]),

    B("Une position juste et dynamique", [
      S("📐 Juste", "Une position juste, c'est une position qui laisse le cheval libre et te permet d'agir avec précision.", [
        "Assis au milieu de la selle, sur tes deux fesses, le buste droit.",
        "Sur le plat, une ligne verticale passe par ton oreille, ton épaule, ta hanche et ton talon.",
        "Tes jambes descendent le long du cheval, le talon plus bas que la pointe du pied, le genou souple.",
        "Tes coudes sont près du corps ; ta main et ton avant-bras prolongent la rêne jusqu'à la bouche.",
        "Ton regard est loin devant, vers l'endroit où tu vas."
      ]),
      S("⚡ Dynamique", "Dynamique ne veut pas dire raide ni agité : c'est être tonique et prêt à agir.", [
        "Ton dos est tonique sans être bloqué : ton bassin suit le mouvement du cheval. C'est ce qu'on appelle le liant.",
        "Tes aides sont prêtes : tu agis au bon moment, puis tu cesses dès que le cheval a répondu.",
        "Tu anticipes : tu prépares chaque figure et chaque transition avant d'y arriver.",
        "Sur une courbe, tes épaules suivent celles du cheval et tes hanches suivent ses hanches."
      ])
    ]),

    B("Adapter sa position au travail", [
      S("🔀 Trois façons d'être à cheval", "Au Galop 7, tu passes d'une position à l'autre selon l'exercice, sans perdre ton équilibre.", [
        { gras: "La position assise :", texte: "pour le travail sur le plat, le dressage, les transitions et les mouvements comme l'épaule en dedans. Étriers plus longs, assiette en contact avec la selle." },
        { gras: "Le trot enlevé :", texte: "pour la détente et le travail au trot sans fatiguer le dos du cheval. Tu te lèves et tu te rassois en souplesse, sans retomber lourdement." },
        { gras: "La position en équilibre :", texte: "pour l'obstacle, le cross et les galops de détente. Étriers raccourcis, buste incliné vers l'avant, fesses au-dessus de la selle ; ton poids descend dans tes talons, tes genoux et tes chevilles amortissent." }
      ]),
      S("📏 La longueur des étriers", null, [
        "On raccourcit les étriers pour l'obstacle et le cross : l'angle des genoux se ferme, l'équilibre devient plus stable au-dessus des étriers.",
        "On les rallonge pour le plat : la jambe descend mieux et l'assiette est plus profonde.",
        "Vérifie toujours que tes deux étriers sont à la même longueur avant de partir."
      ]),
      E("⚠️", "Un changement à faire à l'arrêt", "Change la longueur de tes étriers cheval arrêté, ou au pas sur un cheval calme et seulement si ton enseignant le permet, en gardant tes rênes en main.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Commencer directement par le travail exigeant, sur un cheval encore froid.",
        "Faire toujours la même détente, quel que soit le cheval ou le temps.",
        "Ne pas écouter les consignes jusqu'au bout et passer à l'étape suivante trop tôt.",
        "Confondre dynamique et agité : bouger les jambes ou les mains sans arrêt.",
        "Garder la même position pour le plat et pour l'obstacle."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais préparer ton cheval.", [
        "Réalise la détente qu'il te donne, dans l'ordre et la durée prévus, puis dis-lui ce que tu as ressenti chez ton cheval.",
        "Passe de la position assise au trot enlevé puis à la position en équilibre au galop, sans perdre ta stabilité.",
        "Fais-toi filmer de profil au trot assis et vérifie l'alignement oreille, épaule, hanche, talon."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Combien de temps doit durer le pas au début de la séance ?",
        "Comment détendre un cheval froid en hiver ?",
        "Pourquoi raccourcir mes étriers pour sauter ?",
        "Comment savoir si mon cheval est décontracté ?",
        "Comment être tonique à cheval sans être raide ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Détente : décontraction et échauffement.",
        "Du lent vers le plus exigeant.",
        "Les consignes de l'enseignant, à la lettre.",
        "Juste : oreille, épaule, hanche, talon.",
        "Assis, enlevé ou en équilibre selon le travail."
      ]),
      E("", "", "Une bonne séance se gagne dans les dix premières minutes.")
    ])
  ],
  lexique: { fr: [
    ["Détente", "Début de séance qui vise la décontraction du cheval et l'échauffement progressif de ses muscles."],
    ["Décontraction", "État d'un cheval calme, sans inquiétude ni nervosité."],
    ["Rênes longues", "Rênes allongées : le cheval a l'encolure libre."],
    ["Échauffement", "Préparation progressive des muscles, des tendons et des articulations du cheval à l'effort."],
    ["S'ébrouer", "Souffler fort par les naseaux ; chez un cheval au travail, cela accompagne souvent la détente, sans la prouver à lui seul."],
    ["Tonicité", "Tenue du corps à la fois ferme et souple, ni raide ni avachie."],
    ["Position en équilibre", "Position où le cavalier est au-dessus de la selle, le buste incliné, le poids descendu dans les talons."],
    ["Liant", "Qualité du cavalier qui suit le mouvement du cheval sans être déséquilibré."]
  ] },
  quiz: [
    Q("Selon la FFE, à quoi sert d'abord la détente ?", ["À fatiguer le cheval pour qu'il soit calme", "À obtenir la décontraction du cheval et à l'échauffer progressivement", "À sauter le plus haut possible", "À travailler les mouvements difficiles en premier"], 1, "La détente vise la décontraction du cheval et un échauffement progressif de ses muscles."),
    Q("Au Galop 7, comment réalises-tu la détente ?", ["Comme tu veux, sans consigne", "Toujours sans étriers", "Toujours au galop", "En suivant les consignes de ton enseignant"], 3, "Le programme du Galop 7 demande de réaliser la détente en respectant les consignes de l'enseignant."),
    Q("Par quoi commence le plus souvent une détente ?", ["Un galop rapide", "Des sauts", "Plusieurs minutes de pas actif", "Une épaule en dedans"], 2, "On commence lentement, par le pas, puis on demande progressivement davantage."),
    Q("Comment juges-tu qu'un cheval s'est décontracté pendant la détente ?", ["Il s'est ébroué une fois : cela suffit", "Ses allures sont régulières et souples, il accepte le contact et répond à des aides légères", "Il lève la tête et se raidit", "Il accélère sans qu'on le demande"], 1, "S'ébrouer ou mâchonner peut accompagner la détente, mais ne suffit pas : tu l'apprécies avec la régularité, la souplesse, le contact et la disponibilité du cheval."),
    Q("Par temps froid, que fait-on souvent pendant la détente ?", ["On supprime le pas", "On galope tout de suite", "On fait durer le pas plus longtemps au début", "On longe le cheval avec un enrênement serré"], 2, "Par temps froid, les muscles mettent plus de temps à se réveiller : le pas du début dure plus longtemps."),
    Q("Sur le plat, quelle ligne verticale vérifie une position juste ?", ["Genou, pied, oreille, main", "Oreille, épaule, hanche, talon", "Main, coude, genou, pied", "Tête, main, pied, étrier"], 1, "Sur le plat, une verticale passe par l'oreille, l'épaule, la hanche et le talon."),
    Q("Une position dynamique, c'est…", ["Être tonique et prêt à agir, sans raideur", "Bouger sans arrêt les jambes", "Se pencher en avant", "Serrer les genoux"], 0, "Dynamique ne veut pas dire agité : le cavalier est tonique, son bassin suit le mouvement et ses aides sont prêtes."),
    Q("En position en équilibre, où va ton poids ?", ["Dans la selle", "Dans tes mains", "Il descend dans tes talons", "Sur l'encolure du cheval"], 2, "En équilibre, les fesses sont au-dessus de la selle et le poids descend dans les talons ; genoux et chevilles amortissent."),
    Q("Pourquoi raccourcit-on les étriers pour l'obstacle et le cross ?", ["Pour être plus stable en position en équilibre", "Pour s'asseoir plus profondément", "Pour mieux pousser avec les talons", "Pour que le cheval aille moins vite"], 0, "L'angle des genoux se ferme : le cavalier est plus stable au-dessus de ses étriers."),
    Q("Sur une courbe, tes épaules…", ["Restent face à la piste", "Tournent dans le sens opposé", "Se penchent vers l'intérieur", "Suivent les épaules du cheval"], 3, "Tes épaules suivent celles du cheval et tes hanches suivent ses hanches : ta posture correspond à la sienne.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-11 — INCURVATION ET RECTITUDE   (programme FFE Galop 7 : incurver le cheval sur des courbes et des inversions de courbes ;
   incurver le cheval sur des cercles et des serpentines de 10 m de diamètre au trot ; incurver le cheval sur des cercles de 15 m
   de diamètre au galop ; expliquer la rectitude et la mettre en pratique) — reprend le brouillon g7-c1 (partie rectitude)
   --------------------------------------------------------------------------------- */
{ id: "g7n-11", icone: "〰️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Incurvation et rectitude" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-09-gris-fonce.webp", couv: {} },

    B("Des courbes plus serrées", [
      P("Au Galop 5, tu as appris à incurver ton cheval sur des cercles de 12 à 20 m. Au Galop 7, les courbes se resserrent : 10 m au trot, de 10 à 15 m au galop. Plus la courbe est petite, plus le cheval doit être souple, équilibré et droit."),
      S("📏 Les figures du Galop 7", "Le chiffre donne toujours le diamètre du cercle, ou de chaque boucle.", [
        { gras: "Au trot :", texte: "cercles et serpentines de 10 m de diamètre. Un cercle de 10 m s'appelle une volte." },
        { gras: "Au galop :", texte: "cercles de 10 à 15 m de diamètre." }
      ]),
      S("🌀 La volte de 10 m au trot", null, [
        "Raccourcis un peu le trot avant d'entrer dans la volte, sans perdre l'activité ni la cadence.",
        "Ta jambe intérieure, à la sangle, garde l'activité et c'est autour d'elle que le cheval s'incurve ; ta jambe extérieure, un peu en arrière, empêche les hanches de sortir.",
        "Ta rêne extérieure contrôle l'épaule extérieure et la taille de la volte ; ta rêne intérieure garde un léger pli.",
        "Repère ton point de sortie : la volte se referme exactement là où elle a commencé."
      ]),
      S("🎠 Les cercles de 10 à 15 m au galop", null, [
        "Garde un galop actif : sur une courbe serrée, un galop qui s'éteint finit au trot ou désuni.",
        "Au galop, le cheval a tendance à rentrer ses hanches vers l'intérieur. Ta jambe extérieure reculée, si elle agit seule, les pousse encore plus vers l'intérieur : pour corriger, replace plutôt ses épaules devant ses hanches (voir « Le redresser »).",
        "Reste assis(e) au milieu de ta selle, ton bassin suit chaque foulée."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Une petite courbe se prépare sur la grande. Fais d'abord un cercle de 20 m bien incurvé, puis resserre-le peu à peu jusqu'à la taille demandée. Si ton cheval perd son équilibre ou sa cadence, regagne un peu de place : la qualité compte plus que la taille.")
    ]),

    B("Les inversions de courbes", [
      S("🔀 Changer d'incurvation", "Une inversion de courbe, c'est passer d'une courbe à gauche à une courbe à droite, ou l'inverse. Tu l'as vu au Galop 5 : le cheval passe droit un court instant, puis prend le nouveau pli.", [
        "Avant le changement, redresse ton cheval sur une ou deux foulées.",
        "Change toutes tes aides : nouvelle jambe intérieure à la sangle, nouvelle jambe extérieure un peu en arrière, nouveau pli.",
        "Tes épaules et ton regard tournent vers la nouvelle courbe."
      ]),
      S("〰️ Les figures pour s'entraîner", null, [
        { gras: "La serpentine à boucles de 10 m :", texte: "des demi-voltes qui s'enchaînent de part et d'autre d'une ligne, avec un changement d'incurvation à chaque passage sur cette ligne." },
        { gras: "La demi-volte :", texte: "une demi-volte de 10 m suivie d'une oblique qui te ramène sur la piste, sur l'autre main : le cheval change d'incurvation en retrouvant la piste." }
      ])
    ]),

    B("La rectitude", [
      S("📖 La définition de la FFE", "« Un cheval est droit lorsqu'il peut s'incurver et se déplacer d'une égale manière des deux côtés dans les trois allures. »", [
        "Être droit, ce n'est donc pas seulement aller tout droit : c'est être aussi souple à gauche qu'à droite.",
        "Sur les lignes droites comme sur les courbes, ses postérieurs marchent dans la trace de ses antérieurs.",
        "Il prend un contact égal sur ses deux rênes."
      ]),
      S("💪 Pourquoi c'est si important ?", "Seul un cheval droit peut pousser de la même façon avec ses deux postérieurs.", [
        "Ses deux postérieurs travaillent autant l'un que l'autre : un côté ne se fatigue pas plus que l'autre.",
        "Il est plus équilibré dans les courbes, les transitions et à l'abord des obstacles.",
        "Ses mouvements deviennent symétriques : une volte à gauche ressemble à une volte à droite."
      ]),
      E("💡", "Le savais-tu ?", "Tous les chevaux sont naturellement un peu de travers, comme nous sommes droitiers ou gauchers : ils ont un côté plus souple et un côté plus raide. C'est pour ça que la rectitude se travaille à chaque séance, et jamais une fois pour toutes.")
    ]),

    B("Mettre la rectitude en pratique", [
      S("🔍 Reconnaître un cheval de travers", null, [
        "Ses hanches se décalent vers l'intérieur de la piste, surtout au galop.",
        "Il s'appuie plus sur une rêne que sur l'autre.",
        "Il s'incurve facilement d'un côté et reste raide de l'autre.",
        "Ses arrêts ne sont pas d'aplomb : un postérieur reste en arrière."
      ]),
      S("🛠️ Le redresser", "On redresse un cheval en replaçant ses épaules devant ses hanches, pas en poussant ses hanches de côté.", [
        "Si les hanches se sont décalées d'un côté, tes deux mains, ensemble, amènent un peu les épaules de ce même côté ; ta jambe intérieure, à la sangle, garde l'activité ; ta jambe extérieure reste au contact, sans pousser. Dès que les épaules sont revenues devant les hanches, tes aides se relâchent.",
        "Quitte la piste : sur la ligne du milieu ou la ligne du quart, le mur ne t'aide plus et tu vois tout de suite si ton cheval reste droit.",
        "Fixe un point devant toi et dirige ton cheval vers lui, entre tes deux jambes et tes deux rênes, comme dans un couloir.",
        "Travaille autant les deux mains, et un peu plus le côté raide, sur des cercles et des voltes.",
        "Vérifie tes propres aides : un cavalier assis de travers met souvent son cheval de travers."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tirer sur la rêne intérieure pour faire une petite volte : le cheval tourne la tête, son épaule extérieure s'échappe et la volte se déforme.",
        "Se pencher vers l'intérieur de la courbe au lieu de rester assis au milieu de la selle.",
        "Changer d'incurvation sans repasser par un cheval droit.",
        "Ne travailler que la main facile de son cheval.",
        "Pousser les hanches avec la jambe pour redresser un cheval traversé, au lieu de replacer ses épaules."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que ton cheval est souple et droit.", [
        "Au trot, fais une volte de 10 m à chaque main et compare : sont-elles de la même taille, avec la même incurvation ?",
        "Fais une serpentine à boucles de 10 m au trot en redressant ton cheval à chaque passage sur la ligne.",
        "Remonte la ligne du milieu au pas puis au trot : ton enseignant, placé face à toi, vérifie que les postérieurs suivent les antérieurs."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir quel est le côté raide de mon cheval ?",
        "Pourquoi mes voltes à droite sont-elles plus grandes qu'à gauche ?",
        "Pourquoi mon cheval met-il ses hanches à l'intérieur au galop ?",
        "Comment réussir une serpentine à boucles de 10 m au trot ?",
        "Quels exercices pour rendre mon cheval plus droit ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Volte de 10 m au trot, cercle de 10 à 15 m au galop.",
        "Droit un instant, puis nouveau pli.",
        "Droit : aussi souple des deux côtés.",
        "Les postérieurs dans la trace des antérieurs.",
        "On redresse les épaules devant les hanches."
      ]),
      E("", "", "Un cheval droit, c'est un cheval qui a deux bons côtés.")
    ])
  ],
  lexique: { fr: [
    ["Rectitude", "Qualité d'un cheval qui s'incurve et se déplace de la même manière des deux côtés, aux trois allures."],
    ["Cheval traversé", "Cheval dont les hanches ne suivent pas les épaules et se décalent sur le côté."],
    ["Volte", "Cercle de 10 m de diamètre au plus."],
    ["Symétrique", "Pareil des deux côtés ; un cheval droit est symétrique."],
    ["Demi-volte", "Moitié d'une volte, suivie d'une oblique qui ramène sur la piste en changeant de main."],
    ["Inversion de courbe", "Passage d'une courbe à une courbe dans l'autre sens, avec changement d'incurvation."],
    ["Ligne du quart", "Ligne parallèle au grand côté, à 5 m de la piste."],
    ["Côté raide", "Le côté sur lequel le cheval s'incurve le moins facilement."]
  ] },
  quiz: [
    Q("Quelle taille de cercle au trot au Galop 7 ?", ["20 m", "15 m", "12 m", "10 m"], 3, "Au Galop 7, on incurve le cheval sur des cercles et des serpentines de 10 m de diamètre au trot."),
    Q("Quelle taille de cercle au galop au Galop 7 ?", ["20 m uniquement", "De 10 à 15 m", "Moins de 8 m", "Au moins 25 m"], 1, "Le programme détaillé du Galop 7 indique des cercles de 10 à 15 m de diamètre au galop."),
    Q("Comment appelle-t-on un cercle de 10 m ?", ["Une volte", "Une serpentine", "Une demi-pirouette", "Un doublé"], 0, "Une volte est un cercle de 10 m de diamètre au plus."),
    Q("Au galop sur un cercle, ta jambe extérieure reculée agit seule. Vers où tend-elle à déplacer les hanches ?", ["Vers l'extérieur du cercle", "Vers l'intérieur du cercle", "Elle ne les déplace pas", "Elle les fait seulement avancer"], 1, "Une jambe reculée pousse les hanches du côté opposé, donc vers l'intérieur : elle ne corrige pas des hanches déjà rentrées. On replace plutôt les épaules devant les hanches."),
    Q("Que fais-tu juste avant de changer d'incurvation ?", ["Je redresse mon cheval sur une ou deux foulées", "Je tire sur la nouvelle rêne intérieure", "Je m'arrête", "Je me penche vers la nouvelle courbe"], 0, "Le cheval passe droit un court instant, puis tu changes toutes tes aides pour le nouveau pli."),
    Q("Selon la FFE, un cheval est droit lorsqu'il…", ["Va toujours en ligne droite", "Garde la tête droite", "Peut s'incurver et se déplacer de la même manière des deux côtés, aux trois allures", "Ne s'incurve jamais"], 2, "C'est la définition de la FFE : la rectitude, c'est la symétrie du cheval, à gauche comme à droite."),
    Q("Pourquoi la rectitude est-elle si importante ?", ["Parce qu'elle permet aux deux postérieurs de pousser de la même façon", "Parce qu'elle fait aller le cheval plus vite", "Parce qu'elle remplace l'impulsion", "Parce qu'elle sert seulement en concours"], 0, "Seul un cheval droit pousse symétriquement avec ses postérieurs, avec un contact égal sur les deux rênes."),
    Q("Ton cheval avance sur la ligne du milieu, ses hanches décalées vers la droite. Comment le redresses-tu ?", ["En poussant fort ses hanches avec ma jambe droite", "En accélérant", "En tirant sur la rêne gauche", "En replaçant ses épaules devant ses hanches"], 3, "On redresse un cheval en replaçant ses épaules devant ses hanches : ici, en amenant un peu les épaules vers la droite."),
    Q("Pourquoi travailler la rectitude sur la ligne du milieu ou la ligne du quart ?", ["Parce que le sol y est meilleur", "Parce que le mur n'aide plus le cheval à rester droit", "Parce que c'est plus court", "Parce que le cheval y va plus vite"], 1, "Loin du mur, le cheval ne peut plus s'appuyer dessus : tu vois tout de suite s'il reste droit."),
    Q("Dans une serpentine à boucles de 10 m, où changes-tu d'incurvation ?", ["Au milieu de chaque boucle", "Jamais", "À chaque passage sur la ligne qui sépare les boucles", "À la fin de la figure"], 2, "À chaque passage sur la ligne, le cheval passe droit un instant, puis prend le nouveau pli.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-12 — L'ÉPAULE EN DEDANS   (programme FFE Galop 7 : définir une épaule en dedans et expliquer les qualités et défauts
   d'exécution ; réaliser une épaule en dedans, contre-épaule en dedans au pas, au trot, des deux côtés)
   — reprend le brouillon g7-c2
   --------------------------------------------------------------------------------- */
{ id: "g7n-12", icone: "↘️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "L'épaule en dedans" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-05-gris-rond.webp", couv: {} },

    B("Qu'est-ce que l'épaule en dedans ?", [
      P("L'épaule en dedans est le grand exercice de travail sur le plat du Galop 7. Tu dois savoir la définir, expliquer ses qualités et ses défauts, et la réaliser au pas et au trot, des deux côtés, ainsi que la contre-épaule en dedans."),
      S("📖 La définition", "Pour la FFE, c'est un exercice d'assouplissement dans lequel les épaules du cheval sont maintenues sur une piste intérieure à celle de ses hanches.", [
        "Le cheval est légèrement incurvé, de façon régulière, autour de la jambe intérieure du cavalier.",
        "Il avance le long de la piste et se déplace vers le côté opposé à son incurvation : il regarde à l'opposé de la direction où il va.",
        "Ses hanches restent sur la piste, ses épaules sont rentrées vers l'intérieur du manège."
      ]),
      S("🐾 Trois pistes, environ 30°", "Vu de face, on doit voir trois lignes de membres. L'angle entre le cheval et la piste est d'environ 30°, pas plus.", [
        { gras: "Contre le mur :", texte: "le postérieur extérieur." },
        { gras: "Au milieu :", texte: "le postérieur intérieur et l'antérieur extérieur, l'un derrière l'autre." },
        { gras: "La piste la plus à l'intérieur :", texte: "l'antérieur intérieur." },
        "Les antérieurs se croisent : l'antérieur intérieur passe devant l'extérieur. Les postérieurs ne se croisent pas : le postérieur intérieur avance sous la masse."
      ]),
      S("💪 Pourquoi la travailler ?", null, [
        "Elle assouplit le cheval sur le côté et libère ses épaules.",
        "Elle fait travailler et muscler le postérieur intérieur, qui avance sous la masse.",
        "Elle améliore la rectitude : tu apprends à placer les épaules devant les hanches.",
        "Elle prépare les mouvements de deux pistes plus avancés, que tu découvriras dans les Galops suivants."
      ]),
      E("💡", "Le savais-tu ?", "L'épaule en dedans a été décrite par François Robichon de La Guérinière, écuyer du roi Louis XV, dans son livre « École de cavalerie » (1733). Il la considérait comme la première et la dernière de toutes les leçons. Trois siècles plus tard, elle est toujours au cœur du dressage.")
    ]),

    B("Réaliser une épaule en dedans", [
      S("🦵 Les aides (exemple : à main droite)", "Toutes tes aides agissent ensemble, et se relâchent dès que le cheval répond.", [
        { gras: "La jambe droite (intérieure), à la sangle :", texte: "c'est autour d'elle que le cheval s'incurve ; elle entretient l'activité et fait avancer le postérieur intérieur sous la masse." },
        { gras: "La jambe gauche (extérieure), un peu en arrière :", texte: "elle garde les hanches sur la piste." },
        { gras: "La rêne gauche (extérieure) :", texte: "avec la main intérieure, elle amène les épaules vers l'intérieur ; ensuite, elle règle l'angle, limite le pli de l'encolure et contrôle l'allure." },
        { gras: "La rêne droite (intérieure) :", texte: "en fermant les doigts, sans tirer, elle garde un léger pli, juste assez pour voir l'œil droit." },
        { gras: "Ton assiette :", texte: "assis(e) au milieu de la selle, le buste vertical." }
      ]),
      S("🧭 Pas à pas", null, [
        "Dans un coin, fais une volte de 10 m bien incurvée.",
        "En terminant la volte, au moment où les épaules quittent le cercle pour revenir vers la piste, garde l'incurvation : les épaules restent à l'intérieur, les hanches reviennent sur la piste.",
        "Continue quelques foulées le long de la piste, puis récompense.",
        "Pour finir, ramène les épaules devant les hanches, sur la piste, avant le coin suivant.",
        "Commence au pas, puis au trot, et travaille autant à main gauche qu'à main droite."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Demande peu d'angle au début : trois pistes bien nettes valent mieux qu'un grand angle désordonné. Quelques foulées réussies suffisent, puis tu repars droit et tu caresses. La régularité de l'allure passe avant l'angle.")
    ]),

    B("Les qualités et les défauts d'exécution", [
      S("✅ Ce qu'on attend", null, [
        "Une incurvation régulière, de la nuque aux hanches, autour de la jambe intérieure.",
        "Un angle d'environ 30°, le même du début à la fin : on voit nettement trois pistes.",
        "La même cadence et la même activité qu'avant le mouvement.",
        "Un cheval sur la main, avec un contact égal.",
        "Un mouvement précis : il commence et se termine aux endroits demandés."
      ]),
      S("❌ Les défauts à reconnaître", null, [
        { gras: "Seule l'encolure est pliée :", texte: "le cheval tourne la tête, mais son corps reste droit ou presque sur la piste." },
        { gras: "Les hanches quittent leur ligne :", texte: "elles ne restent plus sur la piste ; l'épaule en dedans est déformée." },
        { gras: "Trop d'angle :", texte: "le cheval passe sur quatre pistes et tombe sur ses épaules." },
        { gras: "Un angle qui change :", texte: "les épaules rentrent puis ressortent, la ligne n'est plus régulière." },
        { gras: "Une allure qui se dégrade :", texte: "le cheval ralentit, perd son activité, ou au contraire se précipite." },
        { gras: "Des résistances :", texte: "la nuque qui bascule, la tête qui monte, la bouche qui s'ouvre." }
      ])
    ]),

    B("La contre-épaule en dedans", [
      S("🔄 Le même exercice, tourné vers le mur", "Dans la contre-épaule en dedans, ce sont les épaules qui restent sur la piste, et les hanches qui sont sur une piste intérieure. Le cheval est incurvé vers le mur.", [
        "Il garde trois pistes et le même angle, mais de l'autre côté de la piste.",
        "Le mur, devant sa tête, l'aide à ne pas partir en avant : l'exercice est souvent plus facile pour commencer.",
        "C'est une bonne préparation à l'épaule en dedans, surtout pour un cheval qui ne la connaît pas encore."
      ]),
      S("🦵 Les aides (exemple : à main droite, cheval plié à gauche, vers le mur)", "Ce sont les aides de l'épaule en dedans, mais ton côté « intérieur » est celui du mur, puisque c'est de ce côté que le cheval est plié.", [
        { gras: "La jambe gauche, côté mur, à la sangle :", texte: "le cheval s'incurve autour d'elle ; elle garde l'activité et pousse le cheval à avancer en biais, les hanches vers l'intérieur du manège." },
        { gras: "La jambe droite, côté manège, un peu en arrière :", texte: "elle contrôle les hanches : elle les empêche de trop s'écarter de la piste, pour garder l'angle." },
        { gras: "La rêne gauche :", texte: "elle garde un léger pli vers le mur, sans tirer." },
        { gras: "La rêne droite :", texte: "elle garde les épaules sur la piste et règle l'angle." }
      ]),
      E("🔭", "Pour aller plus loin", "Ces deux exercices peuvent aussi se faire sur un cercle. En épaule en dedans, ce sont alors les hanches, à l'extérieur, qui parcourent le plus grand chemin ; en contre-épaule en dedans, ce sont les épaules. Au Galop 7, travaille-les d'abord sur des lignes droites, le long de la piste.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tout demander avec la rêne intérieure en tirant dessus.",
        "Se pencher vers l'intérieur ou s'asseoir de travers pour pousser le cheval.",
        "Oublier sa jambe extérieure : plus rien ne tient les hanches.",
        "Faire durer l'exercice trop longtemps, sans récompenser.",
        "Ne travailler que la main facile de son cheval."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises les deux exercices.", [
        "À chaque main, au trot, enchaîne une volte de 10 m et une épaule en dedans sur la moitié du grand côté, puis redresse avant le coin.",
        "Au pas, à chaque main, fais une contre-épaule en dedans d'une lettre à l'autre.",
        "Demande à ton enseignant de se placer face à toi : voit-il bien trois pistes ?"
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon cheval est bien sur trois pistes ?",
        "Pourquoi mon cheval ralentit-il en épaule en dedans ?",
        "Quelle différence entre épaule en dedans et cession à la jambe ?",
        "Pourquoi commencer par la contre-épaule en dedans ?",
        "Combien de foulées demander au début ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Épaules dedans, hanches sur la piste.",
        "Trois pistes, environ 30°.",
        "Incurvé autour de la jambe intérieure.",
        "Angle, incurvation et cadence réguliers.",
        "Contre-épaule : épaules sur la piste, pli vers le mur."
      ]),
      E("", "", "Trois siècles après La Guérinière, l'épaule en dedans continue d'assouplir les chevaux, et de rendre les cavaliers plus précis.")
    ])
  ],
  lexique: { fr: [
    ["Épaule en dedans", "Exercice d'assouplissement où les épaules du cheval sont sur une piste intérieure à celle des hanches, le cheval incurvé autour de la jambe intérieure."],
    ["Contre-épaule en dedans", "Même exercice où les épaules restent sur la piste et les hanches sont sur une piste intérieure, le cheval incurvé vers le mur."],
    ["Piste", "Trace laissée par une ligne de membres ; en épaule en dedans, le cheval marche sur trois pistes."],
    ["Angle", "Écart entre l'axe du cheval et la ligne qu'il suit ; environ 30° en épaule en dedans."],
    ["Postérieur intérieur", "Le postérieur du côté de l'incurvation ; en épaule en dedans, il avance sous la masse."],
    ["Cession à la jambe", "Mouvement où le cheval, presque droit, avance en se déplaçant de côté, en s'éloignant de la jambe qui agit."],
    ["Deux pistes", "Mouvements où les postérieurs ne suivent pas la trace des antérieurs, comme l'épaule en dedans ou la cession à la jambe."],
    ["Antérieur intérieur", "L'antérieur du côté de l'incurvation ; en épaule en dedans, il croise devant l'antérieur extérieur."]
  ] },
  quiz: [
    Q("Selon la FFE, l'épaule en dedans est…", ["Un exercice d'assouplissement où les épaules sont sur une piste intérieure à celle des hanches", "Un déplacement de côté, le cheval presque droit", "Une figure de saut", "Un exercice où les hanches rentrent vers l'intérieur"], 0, "C'est un exercice d'assouplissement : les épaules sont maintenues sur une piste intérieure à celle suivie par les hanches."),
    Q("Dans l'épaule en dedans, le cheval regarde…", ["Dans la direction où il avance", "Droit devant, sans pli", "Vers le sol", "À l'opposé de la direction où il se déplace"], 3, "Incurvé autour de la jambe intérieure, il se déplace vers le côté opposé à son incurvation."),
    Q("Sur combien de pistes se fait l'épaule en dedans au Galop 7 ?", ["Une", "Deux", "Trois", "Cinq"], 2, "Vu de face, on voit trois pistes : postérieur extérieur, puis postérieur intérieur et antérieur extérieur, puis antérieur intérieur."),
    Q("Quel est l'angle d'une épaule en dedans ?", ["Environ 10°", "Environ 30°", "Environ 60°", "90°"], 1, "L'angle est d'environ 30° et ne doit pas le dépasser ; plus d'angle fait passer le cheval sur quatre pistes."),
    Q("Quels membres se trouvent sur la même piste, au milieu ?", ["Les deux antérieurs", "Le postérieur intérieur et l'antérieur extérieur", "Les deux postérieurs", "L'antérieur intérieur et le postérieur extérieur"], 1, "Le postérieur intérieur avance dans la trace de l'antérieur extérieur : c'est la piste du milieu."),
    Q("Quel est le rôle de la jambe extérieure, un peu en arrière ?", ["Demander le pli", "Faire accélérer", "Garder les hanches sur la piste", "Faire reculer le cheval"], 2, "Elle empêche les hanches de quitter la piste ; sans elle, les hanches quittent leur ligne et l'épaule en dedans est déformée."),
    Q("Le cheval tourne la tête vers l'intérieur mais son corps reste sur la piste. C'est…", ["Une épaule en dedans réussie", "Une qualité recherchée", "Une contre-épaule en dedans", "Un défaut : seule l'encolure est pliée"], 3, "Une épaule en dedans demande une incurvation régulière de tout le corps, pas seulement de l'encolure."),
    Q("Comment entrer simplement en épaule en dedans ?", ["En partant d'une volte dans un coin et en gardant l'incurvation en revenant sur la piste", "En tirant la rêne intérieure au milieu du grand côté", "En partant d'un arrêt", "En passant au galop"], 0, "La volte place l'incurvation ; en revenant vers la piste, on garde les épaules à l'intérieur pendant que les hanches regagnent la piste."),
    Q("Dans la contre-épaule en dedans, le cheval est incurvé…", ["Vers l'intérieur du manège", "Vers le mur", "Il n'est pas incurvé", "Vers le haut"], 1, "Les épaules restent sur la piste, les hanches sont sur une piste intérieure et le cheval est plié vers le mur."),
    Q("Pourquoi la contre-épaule en dedans est-elle souvent plus facile au début ?", ["Parce que le cheval va plus vite", "Parce qu'elle se fait sans aides", "Parce que le mur devant sa tête l'aide à ne pas partir en avant", "Parce qu'elle ne demande aucune incurvation"], 2, "Le mur canalise le cheval : c'est une bonne préparation à l'épaule en dedans.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-13 — LE TRAVAIL AU GALOP   (programme FFE Galop 7 : effectuer des transitions galop–pas–galop ;
   partir au contre-galop à partir du pas ; réaliser des courbes de 20 m au contre-galop)
   — reprend le brouillon g7-c3 (le reculer de 3 à 5 pas est traité dans g7n-09)
   --------------------------------------------------------------------------------- */
{ id: "g7n-13", icone: "🔄", type: { fr: "pratique" }, duree: { fr: "10 min" }, titre: { fr: "Le travail au galop" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-01-gris-galop.webp", couv: {} },

    B("Les transitions galop-pas-galop", [
      P("Au Galop 7, ton galop devient un outil de travail : tu passes du galop au pas sans trotter, tu repars au galop directement du pas, et tu galopes volontairement sur l'autre pied, au contre-galop. Ces exercices montrent que ton cheval est équilibré, attentif et disponible."),
      S("⬇️ Du galop au pas, sans trotter", "La transition est directe : le cheval passe du galop au pas sans aucune foulée de trot entre les deux.", [
        "Quelques foulées avant ton point, raccourcis un peu le galop en te grandissant : ton cheval doit être bien équilibré, porté par ses postérieurs, et non lancé sur les épaules.",
        "Au point, ton bassin cesse d'accompagner le galop et tes doigts se ferment sur les rênes, sans tirer vers toi.",
        "Tes jambes restent au contact : elles empêchent le cheval de se traîner et l'aident à marcher tout de suite d'un pas actif.",
        "Dès qu'il marche, tes doigts se rouvrent : c'est sa récompense."
      ]),
      S("⬆️ Du pas au galop", "Le pas qui suit doit rester actif et régulier : c'est lui qui prépare le départ suivant.", [
        "Garde quelques foulées d'un pas franc, le cheval droit et attentif.",
        "Place tes aides du galop : la jambe extérieure se recule pour tenir les hanches et appeler le postérieur externe ; ta main intérieure garde un léger pli, sans tirer ; ta jambe intérieure, à la sangle, donne le signal.",
        "Reste assis(e) et grand(e) : ton buste ne bascule pas en avant au départ."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Si ton cheval trotte avant de marcher, ne tire pas plus fort : observe ta préparation. Son galop était-il assez court et équilibré, ou trop rapide et sur les épaules ? Tes aides étaient-elles coordonnées, ton bassin, tes doigts et tes jambes au même moment ? Corrige ce qui manquait, puis redemande. La transition se prépare dans les foulées d'avant, pas au moment du point.")
    ]),

    B("Le départ au contre-galop", [
      S("🔁 Ce que tu sais déjà (Galop 6)", null, [
        "Au Galop 6, tu as galopé à faux sur une courbe large : galoper volontairement sur le pied opposé à la main où tu tournes.",
        "Le contre-galop, c'est ce même galop volontaire. Le cheval garde un léger pli du côté de son pied de galop : ce n'est pas une erreur, c'est un exercice."
      ]),
      S("🧭 Intérieur et extérieur au contre-galop", "Au contre-galop, « intérieur » et « extérieur » se règlent sur le pied de galop, pas sur le manège.", [
        "Exemple : tu es à main gauche et tu veux galoper sur le pied droit. Ta jambe et ta main « intérieures » sont celles de droite, du côté du mur.",
        "Ta jambe « extérieure » est la gauche, du côté du centre du manège."
      ]),
      S("🦵 Partir au contre-galop depuis le pas", "Exemple : à main gauche, sur la piste, départ au galop à droite.", [
        "Un pas actif, le cheval droit le long de la piste : il ne doit pas pousser ses hanches vers le centre.",
        "Demande un léger pli à droite, vers le mur, avec la rêne droite, sans tirer la tête.",
        "La jambe extérieure se recule pour tenir les hanches et appeler le postérieur externe : ici, ta jambe gauche.",
        "Ta jambe droite, à la sangle, donne le signal. Ton poids reste au milieu de la selle, un peu du côté du pied de galop, sans te pencher."
      ]),
      E("💡", "Le savais-tu ?", "Un cheval part plus facilement sur le pied qu'on lui demande quand il est déjà plié de ce côté. C'est pour ça qu'on commence souvent le contre-galop sur une ligne droite, le long de la piste, plutôt que sur une courbe.")
    ]),

    B("Les courbes de 20 m au contre-galop", [
      S("⭕ Garder le contre-galop sur une courbe", "Au Galop 7, tu tiens le contre-galop sur des courbes de 20 m, comme les demi-cercles des reprises Club 1.", [
        "Le léger pli reste du côté du pied de galop pendant toute la courbe : tu ne plies pas le cheval vers l'intérieur du cercle.",
        "Ton regard et tes épaules suivent la courbe ; tes deux mains guident ensemble les épaules du cheval sur le tracé.",
        "Ta jambe reculée reste en place : elle empêche les hanches de s'échapper et garde le cheval sur son pied.",
        "Garde la même cadence du début à la fin : un contre-galop qui ralentit finit souvent au trot."
      ]),
      S("📈 Pour progresser", null, [
        "Commence par une boucle peu profonde le long du grand côté, puis passe aux demi-cercles de 20 m.",
        "Travaille autant sur un pied que sur l'autre : la plupart des chevaux ont un côté plus facile.",
        "Après le contre-galop, fais une transition au pas, puis repars : tu vérifies que ton cheval reste calme et à l'écoute."
      ]),
      E("🔭", "Pour aller plus loin", "Si ton cheval change de pied tout seul au contre-galop, ou s'il galope désuni (un pied devant, l'autre derrière), c'est souvent qu'il a perdu son équilibre ou que ses hanches se sont échappées. Repasse au pas, rééquilibre-le, et reprends sur une courbe plus large.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tirer sur les rênes pour passer au pas : le cheval se contracte, creuse son dos et trotte quand même.",
        "Laisser le pas se traîner après la transition : le départ au galop suivant devient impossible.",
        "Plier le cheval vers l'intérieur de la courbe au contre-galop : il change de pied ou se désunit.",
        "Te pencher vers l'intérieur du cercle au contre-galop : ton poids déséquilibre le cheval.",
        "Pousser en continu avec les jambes au lieu d'une aide nette au moment du départ."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que ton galop t'obéit.", [
        "Enchaîne galop-pas-galop sur deux lettres choisies par ton enseignant, sans aucune foulée de trot.",
        "À chaque main, pars au contre-galop depuis le pas, le long de la piste, à la lettre demandée.",
        "Tiens un demi-cercle de 20 m au contre-galop à chaque main, à la même cadence du début à la fin."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi mon cheval trotte-t-il avant de passer au pas ?",
        "Comment savoir si mon galop est assez équilibré pour une transition au pas ?",
        "Pourquoi mon cheval change-t-il de pied au contre-galop ?",
        "Quelle est la différence entre contre-galop et galop désuni ?",
        "Comment préparer mon cheval au contre-galop sur un cercle ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Galop-pas : direct, sans trot.",
        "Un galop équilibré avant, un pas actif après.",
        "Au contre-galop, le pli suit le pied de galop.",
        "La jambe reculée garde les hanches.",
        "Même cadence sur toute la courbe."
      ]),
      E("", "", "Un cheval qui passe du galop au pas et repart sans hésiter, c'est un cheval qui t'attend à chaque foulée.")
    ])
  ],
  lexique: { fr: [
    ["Contre-galop", "Galop volontaire sur le pied opposé à la main ou à la courbe, le cheval gardant un léger pli du côté de son pied de galop."],
    ["Pied de galop", "Le côté sur lequel galope le cheval : au galop à droite, l'antérieur droit avance plus loin que le gauche."],
    ["Transition directe", "Passage d'une allure à une autre en sautant l'allure intermédiaire, par exemple du galop au pas."],
    ["Galop désuni", "Faute d'allure : le cheval galope sur un pied devant et sur l'autre derrière."],
    ["Changement de pied spontané", "Le cheval change de pied de lui-même, sans que le cavalier l'ait demandé."],
    ["Demi-cercle de 20 m", "Moitié d'un cercle de 20 m de diamètre ; au contre-galop, il est demandé dans les reprises Club 1."],
    ["Postérieur externe", "Le postérieur du côté opposé au pied de galop ; il donne le premier temps du galop."]
  ] },
  quiz: [
    Q("Dans une transition galop-pas du Galop 7, le cheval…", ["Fait deux ou trois foulées de trot", "S'arrête puis repart au pas", "Passe directement au pas, sans trotter", "Ralentit au galop pendant tout un tour"], 2, "La transition est directe : du galop au pas, sans aucune foulée de trot."),
    Q("Comment prépares-tu une transition galop-pas ?", ["Dans les foulées d'avant : un galop plus court et équilibré, puis des aides coordonnées", "Au point seulement, en tirant fort sur les rênes", "En accélérant juste avant le point", "En lâchant le contact pour que le cheval ralentisse seul"], 0, "La transition se prépare avant le point : un galop équilibré et des aides coordonnées. Si le cheval trotte, on vérifie l'un et l'autre avant de redemander."),
    Q("Après une transition galop-pas, le pas doit être…", ["Lent et traînant, pour que le cheval se repose", "Le plus rapide possible", "Rênes longues, contact abandonné", "Actif et régulier, pour préparer le départ suivant"], 3, "Un pas actif et régulier prépare le départ au galop qui suit."),
    Q("Au départ au galop, que fait la jambe extérieure ?", ["Elle reste à la sangle", "Elle se recule pour tenir les hanches et appeler le postérieur externe", "Elle se décolle du cheval", "Elle donne un coup de talon"], 1, "La jambe extérieure se recule pour tenir les hanches et appeler le postérieur externe, qui donne le premier temps du galop."),
    Q("À main gauche, tu pars au contre-galop sur le pied droit. Quelle est ta jambe extérieure ?", ["La jambe droite, côté mur", "Les deux jambes, à la sangle", "La jambe gauche, côté centre du manège", "Aucune, on n'utilise que les mains"], 2, "Au contre-galop, l'extérieur se règle sur le pied de galop : pour un galop à droite, la jambe extérieure est la gauche."),
    Q("Au contre-galop, de quel côté est le léger pli du cheval ?", ["Du côté du pied de galop", "Vers l'intérieur de la courbe", "Il n'y a jamais de pli", "Il change à chaque foulée"], 0, "Le cheval garde un léger pli du côté de son pied de galop, même si la courbe tourne de l'autre côté."),
    Q("Où commence-t-on souvent le contre-galop ?", ["Sur un petit cercle de 10 m", "Dans un coin serré", "Sur une diagonale, au milieu", "Le long de la piste, sur une ligne droite"], 3, "Sur la ligne droite, le cheval est plus facile à plier du côté du pied demandé ; on passe ensuite aux courbes."),
    Q("Pendant une courbe de 20 m au contre-galop, ton poids…", ["Penche vers l'intérieur du cercle", "Reste au milieu de la selle, sans te pencher", "Part vers l'arrière", "Se porte sur l'encolure"], 1, "Te pencher vers l'intérieur du cercle déséquilibre le cheval : tu restes au milieu, un peu du côté du pied de galop."),
    Q("Ton cheval change de pied tout seul au contre-galop. Que fais-tu ?", ["Tu repasses au pas, tu le rééquilibres et tu reprends sur une courbe plus large", "Tu continues sur le nouveau pied", "Tu tires sur la rêne intérieure", "Tu accélères pour qu'il reste sur son pied"], 0, "Le changement spontané vient souvent d'une perte d'équilibre ou de hanches qui s'échappent : on rééquilibre et on simplifie."),
    Q("Un galop désuni, c'est…", ["Un galop sur le pied opposé à la main, demandé par le cavalier", "Un galop trop lent", "Un galop sur un pied devant et sur l'autre derrière", "Un galop rênes longues"], 2, "Le galop désuni est une faute d'allure ; le contre-galop, lui, est un galop correct, demandé volontairement.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-14 — LE CSO   (programme FFE Galop 7 : être stable et liant sur des sauts rapprochés ; adapter l'amplitude des
   foulées en fonction de l'enchaînement et du tracé du parcours ; changer de pied dans le mouvement sur la courbe ;
   diriger pour franchir des combinaisons — les obstacles directionnels et le saut de biais sont traités dans g7n-15)
   Sauts rapprochés d'environ 1,10 m et enchaînements à 1 m : repères du programme détaillé (correction du 03/11)
   --------------------------------------------------------------------------------- */
{ id: "g7n-14", icone: "🏆", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Le CSO : enchaîner et diriger" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-18-saut-couchant.webp", couv: {} },

    B("Stable et liant sur des sauts rapprochés", [
      P("Au Galop 7, sauter ne suffit plus : tu choisis tes foulées, tu changes de pied sans casser ton parcours et tu enchaînes les combinaisons. Tout repose sur une position stable et un galop que tu sais régler."),
      S("🔁 Les sauts rapprochés", "Plusieurs sauts séparés par aucune, une ou deux foulées, plus exigeants qu'au Galop 6 : ton équilibre est mis à l'épreuve à chaque réception.", [
        { gras: "Stable :", texte: "tu restes au-dessus de tes pieds, le poids dans les talons, sans te faire projeter à chaque saut." },
        { gras: "Liant :", texte: "ton corps accompagne le cheval sans le gêner ; tes mains suivent l'encolure à chaque saut et retrouvent le contact entre les sauts." },
        { gras: "Patient :", texte: "tu attends que le cheval saute : ton buste ne part pas en avant avant lui." },
        "Repères du programme : des sauts rapprochés d'environ 1,10 m, et des enchaînements de parcours à 1 m."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Dans une ligne de sauts rapprochés, ton seul travail est de rester au milieu de ton cheval, la jambe au contact. Les distances sont réglées pour lui : si tu essaies de l'aider à chaque saut, tu le déséquilibres.")
    ]),

    B("Régler ses foulées", [
      S("📏 Adapter l'amplitude", "Entre deux obstacles, tu peux faire plus ou moins de foulées. C'est l'enchaînement et le tracé qui décident.", [
        { gras: "Allonger :", texte: "tes jambes demandent des foulées plus grandes et tes mains laissent l'encolure s'étendre ; ton assiette reste légère, sans accélérer la cadence." },
        { gras: "Raccourcir :", texte: "tu te grandis, tes doigts se ferment et tes jambes restent présentes : les foulées deviennent plus courtes mais toujours actives." },
        "Dans les deux cas, la cadence reste la même : tu changes la longueur des foulées, pas leur rythme."
      ]),
      S("🛤️ Le tracé change le nombre de foulées", null, [
        "Une ligne droite entre deux obstacles donne un nombre de foulées précis : tu le comptes pendant la reconnaissance.",
        "Un tracé plus arrondi rallonge le chemin : il laisse la place à une foulée de plus. Un tracé plus direct le raccourcit.",
        "Décide avant d'entrer en piste : tu sais où tu allonges, où tu raccourcis, où tu tournes."
      ]),
      E("💡", "Le savais-tu ?", "Dans une combinaison, si ton cheval refuse le deuxième ou le troisième élément, tu dois revenir et ressauter toute la combinaison depuis le premier élément. Chaque élément est jugé séparément : une barre tombée sur le A et une autre sur le B font deux fautes.")
    ]),

    B("Changer de pied dans le mouvement", [
      S("🔀 De quoi s'agit-il ?", "Sur un parcours, la courbe change souvent de sens entre deux obstacles. Changer de pied dans le mouvement, c'est faire changer ton cheval de pied de galop à ce moment-là, sans casser le rythme de ton parcours.", [
        "Sur un cheval qui le sait, c'est un changement de pied en l'air : il change de pied dans le temps de suspension du galop, sans trotter.",
        "Pendant l'apprentissage, ton enseignant peut te faire passer par une ou deux foulées de trot pour repartir sur le nouveau pied, ou pour retrouver un galop correct. C'est une étape : demande-lui ce qui sera accepté à l'examen."
      ]),
      S("🦵 Les aides, au moment où la courbe change de sens", null, [
        "Redresse ton cheval sur une ou deux foulées droites, sans l'accélérer.",
        "Change le léger pli vers le nouveau côté, avec la main du nouveau côté, sans tirer.",
        "Demande le nouveau pied comme un départ au galop : la jambe extérieure se recule pour tenir les hanches et appeler le postérieur externe ; la nouvelle jambe intérieure, à la sangle, donne le signal.",
        "Ton regard est déjà sur le prochain obstacle : il prépare la nouvelle courbe."
      ]),
      E("⚠️", "Attention", "Ne te penche pas vers le nouveau côté pour forcer le changement : ton cheval perd son équilibre, il change devant mais pas derrière et galope désuni. Si c'est le cas, repasse au trot et repars sur le bon pied.")
    ]),

    B("Les combinaisons", [
      P("Le saut de biais fait aussi partie du programme : il est expliqué dans le cours sur le cross, et les mêmes règles valent en carrière."),
      S("🧩 Les combinaisons", "Un double ou un triple : deux ou trois obstacles séparés par une ou deux foulées, qu'on appelle A, B et C.", [
        "Aborde le premier élément droit et au milieu, avec un galop actif : c'est lui qui règle tout le reste.",
        "Entre les éléments, garde la jambe au contact et reste en équilibre : pas de main qui tire, pas de buste qui tombe en avant.",
        "Regarde au bout de la combinaison, pas l'élément sur lequel tu es."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Accélérer pour allonger : le cheval se met sur les épaules au lieu d'agrandir ses foulées.",
        "Tirer pour raccourcir : il se raidit et perd son activité.",
        "Couper un virage sans l'avoir prévu : les foulées ne tombent plus.",
        "Regarder la barre au lieu du prochain obstacle : ta courbe se dessine trop tard.",
        "Arriver mou sur le premier élément d'une combinaison."
      ]),
      S("🏇 Le défi du cavalier", "Prouve à ton enseignant que tu choisis tes foulées.", [
        "Sur une ligne choisie par ton enseignant, fais le même nombre de foulées deux fois de suite, puis une foulée de plus.",
        "Sur un tracé de parcours choisi par ton enseignant, change de pied dans le mouvement à chaque changement de courbe.",
        "Enchaîne une ligne de sauts rapprochés puis un double, en restant au milieu de ton cheval."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir combien de foulées faire entre deux obstacles ?",
        "Comment allonger sans que mon cheval accélère ?",
        "Pourquoi mon cheval change-t-il devant et pas derrière ?",
        "Comment rester stable sur une ligne de sauts rapprochés ?",
        "Comment aborder un triple sans me jeter en avant ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Stable au-dessus de tes pieds, liant avec tes mains.",
        "Même cadence, foulées plus longues ou plus courtes.",
        "Le tracé décide du nombre de foulées.",
        "Changement de pied : redresser, changer le pli, demander.",
        "Combinaison : premier élément droit, regard au bout."
      ]),
      E("", "", "Un parcours se dessine dans ta tête avant de se courir sur la piste.")
    ])
  ],
  lexique: { fr: [
    ["Sauts rapprochés", "Plusieurs obstacles séparés par aucune, une ou deux foulées."],
    ["Amplitude", "La longueur des foulées du cheval."],
    ["Allonger", "Agrandir les foulées sans accélérer la cadence."],
    ["Raccourcir", "Rendre les foulées plus courtes, en gardant l'activité."],
    ["Changement de pied en l'air", "Le cheval change de pied de galop pendant le temps de suspension, sans trotter."],
    ["Combinaison", "Double ou triple : obstacles séparés par une ou deux foulées, appelés A, B et C."],
    ["Droit (vertical)", "Obstacle dont les barres sont dans un même plan, sans largeur."]
  ] },
  quiz: [
    Q("Être « liant » sur des sauts rapprochés, c'est…", ["Accompagner le cheval sans le gêner, les mains qui suivent à chaque saut", "Rester figé pour ne pas gêner le cheval", "Pousser fort avant chaque saut", "Raccourcir les rênes entre chaque saut"], 0, "Liant, c'est accompagner le mouvement : les mains suivent l'encolure à chaque saut et retrouvent le contact entre les sauts."),
    Q("Pour allonger les foulées, tu…", ["Accélères la cadence", "Tires sur les rênes", "Demandes des foulées plus grandes avec les jambes et laisses l'encolure s'étendre", "Te penches loin en avant"], 2, "Allonger, c'est agrandir les foulées sans accélérer : la cadence reste la même."),
    Q("Pour raccourcir les foulées, tu…", ["Tires sur les rênes jusqu'au trot", "Lâches le contact", "Retires tes jambes", "Te grandis, fermes les doigts et gardes les jambes présentes"], 3, "Tu te grandis et fermes les doigts, mais les jambes restent présentes pour garder l'activité."),
    Q("Un tracé plus arrondi entre deux obstacles…", ["Ne change rien au nombre de foulées", "Rallonge le chemin et laisse la place à une foulée de plus", "Supprime une foulée", "Oblige à sauter de biais"], 1, "Le tracé change la distance réelle parcourue, donc le nombre de foulées."),
    Q("Changer de pied dans le mouvement, c'est…", ["Changer de pied de galop quand la courbe change de sens, sans casser le rythme", "S'arrêter pour repartir sur l'autre pied", "Galoper volontairement à faux tout le parcours", "Faire une volte avant chaque obstacle"], 0, "On change de pied au moment où la courbe change de sens, en gardant le rythme du parcours."),
    Q("Un changement de pied en l'air se fait…", ["Au moment où le cheval passe au trot", "À l'arrêt", "Au-dessus de chaque obstacle obligatoirement", "Pendant le temps de suspension du galop"], 3, "Le cheval change de pied pendant le temps de suspension, sans trotter."),
    Q("Ton cheval change de pied devant mais pas derrière. Quelle est souvent la cause ?", ["Il galope trop lentement", "Tes étriers sont trop longs", "Tu t'es penché(e) vers le nouveau côté et il a perdu l'équilibre", "Il a trop de pli"], 2, "Le cavalier qui se penche déséquilibre le cheval : il change devant, pas derrière, et galope désuni."),
    Q("Passer par une ou deux foulées de trot pour changer de pied, c'est…", ["Interdit à l'entraînement", "Une étape d'apprentissage, ou un moyen de retrouver un galop correct", "Toujours la même chose qu'un changement de pied en l'air", "Une faute qui élimine du parcours"], 1, "Ces foulées de trot aident pendant l'apprentissage ; ce qui sera accepté à l'examen, c'est ton enseignant qui te le dit."),
    Q("Ton cheval refuse le B d'un double. Que dois-tu faire ?", ["Sauter seulement le B", "Passer à l'obstacle suivant", "Sauter le B puis revenir au A", "Ressauter toute la combinaison depuis le A"], 3, "Après un refus dans une combinaison, on ressaute toute la combinaison depuis le premier élément."),
    Q("Dans une combinaison, où regardes-tu ?", ["Au bout de la combinaison", "L'élément sur lequel tu es", "Le sol à la réception", "L'encolure de ton cheval"], 0, "Ton regard au bout de la combinaison t'aide à rester droit et en équilibre.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-15 — LE CROSS   (programme FFE Galop 7 : être stable et adapter son équilibre sur des sauts en terrain varié ;
   contrôler, varier et adapter la vitesse selon le terrain et le profil des obstacles ; diriger pour franchir
   des obstacles directionnels, de biais et des combinaisons — en cross)
   --------------------------------------------------------------------------------- */
{ id: "g7n-15", icone: "🌲", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Le cross : terrain, vitesse et précision" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c12-cross.webp", couv: {} },

    B("Adapter son équilibre au terrain", [
      P("Aux Galops précédents, tu as appris à rester en équilibre en montée et en descente et à sauter des profils variés. Au Galop 7, tu sautes sur des terrains plus variés : un obstacle en haut d'une butte, un contre-bas dans une descente, un gué après une combinaison. Ton équilibre doit changer à chaque profil, sans jamais gêner ton cheval."),
      S("⛰️ Les profils d'obstacles", null, [
        { gras: "Le contre-haut :", texte: "le cheval saute pour monter sur une marche. Accompagne la montée avec ton bassin, le buste redressé, sans te jeter en avant ; tes mains laissent l'encolure libre et ta jambe garde l'impulsion jusqu'au bout." },
        { gras: "Le contre-bas :", texte: "le cheval descend une marche. Ton buste ne plonge pas en avant ; ta jambe reste fixe, un peu en avant ; tu laisses glisser les rênes pour lui donner l'encolure, puis tu les reprends à la réception." },
        { gras: "Le gué :", texte: "l'eau freine le cheval. Tu entres à vitesse réduite, le buste assez droit, l'assiette et les jambes qui maintiennent l'activité." },
        { gras: "Le fossé :", texte: "ton poids descend dans tes talons, ta jambe reste au contact, ton regard va loin devant et tu gardes un galop franc." }
      ]),
      E("⚠️", "Toujours encadré", "En cross, le gilet de protection aux normes et le casque aux normes, bien attaché, sont obligatoires. Tu ne sautes jamais seul(e) : ton enseignant choisit les obstacles et l'ordre de progression.")
    ]),

    B("Varier la vitesse selon le profil", [
      S("🎚️ Plus vite ou moins vite ?", "En cross, il n'y a pas une seule bonne vitesse. Chaque type d'obstacle demande la sienne.", [
        { gras: "Moins de vitesse, plus d'activité :", texte: "contre-haut, gué, obstacles directionnels. Le cheval doit être équilibré et attentif." },
        { gras: "Moins de vitesse et moins d'amplitude :", texte: "contre-bas. Le cheval doit pouvoir regarder où il va se poser." },
        { gras: "Un galop plus franc :", texte: "fossé et obstacles larges. Le cheval a besoin d'élan." }
      ]),
      S("🌧️ Selon le terrain", null, [
        "En montée, le cheval fatigue : garde de l'impulsion, sans accélérer.",
        "En descente, il prend de la vitesse tout seul : ralentis assez tôt.",
        "Sur un sol glissant, lourd ou dur, réduis ta vitesse et évite les virages serrés."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Prépare ta vitesse tôt, loin de l'obstacle : ton cheval a le temps de comprendre ce que tu lui demandes. À l'abord, tu gardes l'équilibre, le regard et la jambe. Certains abords demandent des foulées qui s'allongent ou se raccourcissent progressivement : ton enseignant te montre où et comment.")
    ]),

    B("Diriger avec précision", [
      S("🎯 Les obstacles directionnels", "Ce sont des obstacles étroits ou en angle, qui laissent peu de place au cheval. Ils se jouent sur la précision.", [
        { gras: "L'obstacle étroit :", texte: "un front de saut de quelques mètres seulement. Tu arrives droit, au milieu, à vitesse réduite, avec plus de contact et plus de jambe." },
        { gras: "Le coin (ou angle) :", texte: "deux faces qui forment un V. On le saute perpendiculaire à la ligne qui coupe l'angle en deux, du côté étroit, sans être sur la pointe." },
        "Tes deux mains et tes deux jambes forment un couloir : le cheval ne doit trouver aucune porte de sortie.",
        "Ton regard reste sur un point au-delà de l'obstacle."
      ]),
      S("↗️ Sauter de biais", "Sauter de biais, c'est franchir un obstacle sur une ligne qui n'est pas perpendiculaire à son front. On le fait pour raccourcir un tracé ou enchaîner deux obstacles. Ces règles valent aussi en carrière.", [
        "Choisis ta ligne pendant la reconnaissance : un point d'entrée et un point d'arrivée.",
        "Sur les dernières foulées, ton cheval reste bien droit sur ta ligne : de biais, il lui est plus facile de dérober.",
        "Un obstacle sans largeur se saute plus facilement de biais qu'un obstacle large : de biais, un obstacle large devient encore plus large.",
        "En cross, les obstacles sont fixes : choisis un biais modéré, que ton cheval peut lire sans hésiter, et garde ton regard sur ton point d'arrivée."
      ]),
      S("🧩 Les combinaisons de cross", "Plusieurs obstacles qui se suivent sur quelques foulées, souvent avec un changement de profil : une butte puis un tronc, un contre-bas puis l'eau.", [
        "Pendant la reconnaissance à pied, marche ta ligne et repère les points où tu changes d'équilibre.",
        "Entre les éléments, adapte vite ton équilibre au profil suivant : le prochain saut arrive tout de suite.",
        "Sur les combinaisons à plusieurs chemins, décide avant de partir lequel tu prends."
      ]),
      E("💡", "Le savais-tu ?", "En cross, les obstacles qui forment une combinaison portent le même numéro, suivi des lettres A, B, C. Si tu recoupes ta trace entre deux éléments, ou si tu contournes un élément, c'est compté comme une désobéissance.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Arriver vite sur un contre-bas : le cheval ne voit pas où il se pose.",
        "Regarder au fond du fossé : ton buste plonge et ton cheval hésite.",
        "Garder les rênes tendues au contre-bas, ce qui empêche le cheval de s'étendre.",
        "Regarder le drapeau d'un obstacle étroit : le cheval dérobe de ce côté.",
        "Freiner ou accélérer brusquement juste devant l'obstacle : ton cheval s'arrête ou saute à plat."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu lis le terrain.", [
        "Saute un contre-haut puis un contre-bas en annonçant à voix haute la vitesse que tu choisis pour chacun.",
        "Saute un obstacle étroit ou un coin choisi par ton enseignant, sans dérobé.",
        "Enchaîne une combinaison de cross en gardant ton équilibre entre les éléments."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment laisser glisser les rênes au contre-bas ?",
        "Pourquoi faut-il ralentir avant un obstacle étroit ?",
        "Comment trouver la bonne ligne sur un coin ?",
        "Quelle vitesse adopter avant un fossé ?",
        "Comment reconnaître à pied une combinaison de cross ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Chaque profil a son équilibre.",
        "Chaque obstacle a sa vitesse.",
        "Vitesse préparée tôt, sans changement brusque.",
        "Étroit et coin : un couloir de mains et de jambes.",
        "Combinaison : reconnais-la avant de la sauter."
      ]),
      E("", "", "En cross, la vitesse impressionne ; c'est la précision qui fait passer.")
    ])
  ],
  lexique: { fr: [
    ["Profil", "La forme d'un obstacle ou du terrain : montant, descendant, droit, large, dans l'eau."],
    ["Contre-haut", "Obstacle qui fait monter le cheval sur une marche."],
    ["Contre-bas", "Obstacle qui fait descendre le cheval d'une marche."],
    ["Sauter de biais", "Franchir un obstacle sur une ligne qui n'est pas perpendiculaire à son front."],
    ["Obstacle directionnel", "Obstacle étroit ou en angle, qui demande une conduite très précise."],
    ["Coin", "Obstacle en forme de V, sauté du côté étroit, perpendiculaire à la ligne qui partage l'angle en deux."],
    ["Laisser glisser les rênes", "Ouvrir les doigts pour que les rênes s'allongent et donnent l'encolure au cheval, puis les reprendre."],
    ["Dérobé", "Le cheval évite l'obstacle par le côté."]
  ] },
  quiz: [
    Q("Au contre-bas, que fais-tu de tes rênes ?", ["Tu les raccourcis pour retenir le cheval", "Tu les lâches complètement", "Tu les laisses glisser pour donner l'encolure, puis tu les reprends", "Tu les tiens tendues pour le guider"], 2, "Le cheval a besoin de son encolure pour descendre : les rênes glissent, puis tu reprends le contact à la réception."),
    Q("Au contre-bas, ton buste…", ["Plonge vers l'avant", "Ne plonge pas en avant, la jambe reste fixe, un peu en avant", "Se couche sur l'encolure", "Se tourne vers le côté"], 1, "En plongeant vers l'avant, tu risques de passer par-dessus l'encolure à la réception."),
    Q("Quel obstacle demande en général un galop plus franc ?", ["Le fossé", "Le contre-bas", "Le gué", "L'obstacle étroit"], 0, "Le fossé et les obstacles larges demandent de l'élan ; le contre-bas, le gué et les directionnels se sautent à vitesse réduite."),
    Q("Comment entres-tu dans un gué ?", ["Au grand galop pour éclabousser", "En t'arrêtant au bord", "Rênes lâchées, jambes décollées", "À vitesse réduite, le buste assez droit, en gardant l'activité"], 3, "L'eau freine le cheval : on entre à vitesse réduite, en gardant l'activité avec l'assiette et les jambes."),
    Q("Comment gères-tu ta vitesse avant un obstacle de cross ?", ["Tu la changes brusquement au dernier moment", "Tu la prépares tôt et tu évites les changements brusques à l'abord", "Tu accélères toujours juste avant l'obstacle", "Tu ne t'en occupes qu'après la réception"], 1, "Une vitesse préparée tôt laisse au cheval le temps de comprendre ; certains abords demandent des foulées qui varient progressivement, jamais un changement brusque."),
    Q("Un obstacle directionnel, c'est…", ["Un obstacle très large", "Un obstacle dans l'eau", "Un obstacle étroit ou en angle, qui demande une conduite précise", "Un obstacle qui indique la direction de l'arrivée"], 2, "Étroit ou en angle, il laisse peu de place au cheval et demande une grande précision."),
    Q("Comment saute-t-on un coin ?", ["Perpendiculaire à la ligne qui coupe l'angle en deux, du côté étroit", "Sur la pointe", "Du côté le plus large", "En longeant une des deux faces"], 0, "On saute perpendiculaire à la ligne qui partage l'angle, du côté étroit mais sans être sur la pointe."),
    Q("Devant un obstacle étroit, où regardes-tu ?", ["Le drapeau", "Le sol devant l'obstacle", "L'encolure de ton cheval", "Un point au-delà de l'obstacle"], 3, "Regarder le drapeau attire le cheval de ce côté, et il risque de dérober."),
    Q("En descente, la vitesse de ton cheval…", ["Diminue toute seule", "Augmente toute seule : tu ralentis assez tôt", "Ne change pas", "Doit être augmentée"], 1, "En descente, le cheval prend de la vitesse tout seul : il faut ralentir à l'avance."),
    Q("Entre deux éléments d'une combinaison de cross, tu recoupes ta trace. C'est…", ["Autorisé si tu as le temps", "Conseillé pour te réorganiser", "Compté comme une désobéissance", "Sans conséquence"], 2, "Recouper sa trace entre deux éléments d'une combinaison, ou contourner un élément, compte comme une désobéissance.")
  ]
},

/* ---------------------------------------------------------------------------------
   g7n-16 — L'EXAMEN DU GALOP 7   (programme FFE Galop 7 : réaliser une reprise de dressage de niveau Club 1 ;
   enchaîner un parcours de CSO et de cross de niveau Club 1 ; + déroulement de l'examen)
   Repères du programme (CSO 1 m, sauts rapprochés vers 1,10 m, cross 90 cm) distincts des cotes de compétition Club 1 (règlements de saison)
   — le vocabulaire du Galop 7 est dans les lexiques des cours, pas ici
   --------------------------------------------------------------------------------- */
{ id: "g7n-16", icone: "🎓", type: { fr: "culture" }, duree: { fr: "10 min" }, titre: { fr: "L'examen du Galop 7" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-tmp-07-cremello-rond.webp", couv: {} },

    B("Comment se passe l'examen", [
      P("Le Galop 7 vérifie que tu es un cavalier complet et autonome : tu connais ton cheval, tu sais t'en occuper, tu le travailles à pied, et tu montes en dressage, en CSO et en cross au niveau Club 1."),
      S("👩‍🏫 Qui le fait passer ?", null, [
        "Un enseignant diplômé, licencié à la FFE pour l'année en cours, avec un code examinateur actif qui l'autorise à valider le Galop 7.",
        "Il peut t'évaluer pendant une session d'examen, ou petit à petit, pendant tes cours et tes stages.",
        "Si tu as moins de 18 ans, ton Galop 6 doit être entièrement validé avant que le module spécifique de ton Galop 7 puisse l'être."
      ]),
      S("🧾 Ce qui est évalué", "L'examen est organisé en trois modules, qui regroupent les compétences du programme.", [
        "Les connaissances et les soins : le vocabulaire, la connaissance du cheval (aplombs, identification, transport, rationnement, aliments) et s'occuper du cheval (bride, bandes de polo, enrênements).",
        "La pratique à pied : longe avec enrênement, longues rênes, travail en main.",
        "La pratique à cheval : le travail sur le plat, la reprise Club 1, le CSO et le cross.",
        "Ton Galop 7 n'est délivré que lorsque les trois modules sont validés."
      ]),
      E("💡", "Le savais-tu ?", "Une fois ton Galop validé, ton enseignant l'enregistre en ligne : il apparaît dans ton espace cavalier sur le site de la FFE, d'où tu peux imprimer ton diplôme.")
    ]),

    B("La reprise de dressage Club 1", [
      S("📋 La reprise", "Tu présentes une reprise de niveau Club 1, choisie par ton enseignant. Un bon exemple : la « Club 1 Grand Prix » (version du 1er septembre 2025), sur un rectangle de 60 m sur 20 m.", [
        "Au trot : cercles de 10 m, cessions à la jambe, trot moyen sur la diagonale.",
        "Au pas : pas moyen et pas allongé.",
        "Au galop : départs du pas, cercles de 12 m, demi-cercles de 20 m au contre-galop, et un demi-cercle où tu avances les mains pour rompre le contact pendant 2 à 3 foulées.",
        "Entrée, arrêt et salut au début et à la fin.",
        "En plus de la reprise, le programme prévoit un enchaînement de mouvements du type de la reprise « Préliminaire Club 1 »."
      ]),
      S("⚖️ La notation", null, [
        "Chaque mouvement est noté sur 10.",
        "S'y ajoutent des notes d'ensemble : allures, impulsion, disponibilité, position et emploi des aides, tracé et passage des coins.",
        "La disponibilité, la position et l'emploi des aides, le tracé et le passage des coins comptent double."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Apprends ta reprise à pied avant de la monter : marche-la dans la carrière, lettre par lettre. Le jour de l'examen, tu n'auras plus à y penser et toute ton attention ira à ton cheval.")
    ]),

    B("Le parcours de CSO Club 1", [
      S("🏁 Ce qui t'attend", "Un parcours de niveau Club 1. Repères du programme : des enchaînements à 1 m et des sauts rapprochés d'environ 1,10 m.", [
        "Tu reconnais le parcours à pied : l'ordre, les lignes, le nombre de foulées, les changements de pied.",
        "Tu détends ton cheval sur le plat, puis sur quelques sauts.",
        "Tu enchaînes avec fluidité, en gardant la même cadence."
      ]),
      S("👀 Ce que l'examinateur regarde", null, [
        "Ta stabilité et ton équilibre, à l'abord, au saut et à la réception.",
        "Un tracé précis et des foulées adaptées.",
        "Un cheval qui reste calme et sur le bon pied."
      ]),
      E("🔭", "Pour aller plus loin", "Les hauteurs du programme sont des repères d'examen. En compétition, les cotes des épreuves Club 1 (hauteur, largeur) sont fixées par le règlement de chaque discipline, qui peut changer à chaque saison : pour 2025-2026, ce sont les règlements CSO et CCE applicables au 1er septembre 2025. Ton enseignant te dit ce qu'ils prévoient.")
    ]),

    B("Le parcours de cross Club 1", [
      S("🌲 Ce qui t'attend", "Un parcours de cross de niveau Club 1. Repère du programme : des obstacles de 90 cm.", [
        "Tu le reconnais à pied, en regardant les abords, les réceptions et le terrain.",
        "Tu portes un gilet de protection aux normes, obligatoire en cross, et un casque aux normes, bien attaché.",
        "L'examinateur regarde ta stabilité, l'adaptation de ton équilibre au terrain et aux profils, ta conduite et une vitesse adaptée, toujours sous contrôle."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Ne travailler que la pratique à cheval et oublier les connaissances, les soins et le travail à pied.",
        "Découvrir sa reprise le jour de l'examen.",
        "Partir en cross sans avoir vérifié son gilet et son casque.",
        "Courir le cross comme une course de vitesse."
      ]),
      S("🏇 Le défi du cavalier", "Prépare ton examen comme un vrai concours.", [
        "Récite ta reprise Club 1 à ton enseignant, mouvement par mouvement, sans la feuille.",
        "Monte ta reprise en entier devant ton enseignant, qui te note sur 10 trois mouvements de son choix.",
        "Reconnais un parcours à pied et explique à ton enseignant où tu changeras de pied."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment apprendre une reprise de dressage rapidement ?",
        "Que veut dire la note « disponibilité » en dressage ?",
        "Comment bien reconnaître un parcours de CSO ?",
        "Comment gérer mon stress le jour de l'examen ?",
        "Quelle tenue et quel matériel prévoir pour l'examen ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Un examinateur licencié, avec un code actif.",
        "Trois modules, tous à valider.",
        "Une reprise Club 1, apprise par cœur.",
        "CSO : 1 m, sauts rapprochés vers 1,10 m.",
        "Cross : 90 cm, gilet obligatoire."
      ]),
      E("", "", "Le Galop 7 ne récompense pas un parcours réussi : il récompense tout le chemin parcouru avec ton cheval.")
    ])
  ],
  lexique: { fr: [
    ["Examinateur", "Enseignant diplômé, licencié FFE pour l'année en cours, avec un code actif qui lui permet de valider les Galops."],
    ["Reprise", "Suite de mouvements de dressage imposés, présentés dans un ordre précis."],
    ["Rectangle de dressage", "Carrière de dressage avec ses lettres ; ici 60 m sur 20 m."],
    ["Notes d'ensemble", "Notes données à la fin d'une reprise sur les allures, l'impulsion, la disponibilité, la position et le tracé."],
    ["Rompre le contact", "Avancer les mains vers la bouche du cheval pour qu'il galope quelques foulées sans contact, en gardant son attitude."],
    ["Club 1", "Niveau des compétitions Club visé au Galop 7 ; ses cotes sont fixées par le règlement de chaque discipline."],
    ["Reconnaissance", "Visite du parcours à pied avant l'épreuve."]
  ] },
  quiz: [
    Q("Qui peut faire passer le Galop 7 ?", ["N'importe quel cavalier titulaire du Galop 7", "Seulement un juge de dressage", "Le propriétaire du cheval", "Un enseignant diplômé, licencié FFE pour l'année, avec un code examinateur actif"], 3, "Le Galop 7 est validé par un enseignant diplômé, licencié à la FFE pour l'année en cours, dont le code actif l'autorise à valider ce Galop."),
    Q("Si tu as moins de 18 ans, que dois-tu avoir obtenu avant le Galop 7 ?", ["Le Galop 5", "Le Galop 6", "Une licence de compétition", "Rien de particulier"], 1, "Avant 18 ans, ton Galop 6 doit être entièrement validé avant le module spécifique du Galop 7."),
    Q("Quand ton Galop 7 est-il délivré ?", ["Dès que la pratique à cheval est réussie", "Quand tu as fait un parcours sans faute", "Quand les trois modules sont validés", "Quand ta reprise dépasse 60 %"], 2, "Le Galop 7 n'est délivré que lorsque ses trois modules sont validés : connaissances et soins, pratique à pied, pratique à cheval."),
    Q("Quelle est la taille du rectangle de la reprise Club 1 Grand Prix ?", ["60 m sur 20 m", "40 m sur 20 m", "20 m sur 20 m", "80 m sur 40 m"], 0, "La Club 1 Grand Prix se présente sur un rectangle de 60 m sur 20 m."),
    Q("Quel mouvement au galop figure dans la reprise Club 1 Grand Prix ?", ["Des changements de pied au temps", "Des demi-cercles de 20 m au contre-galop", "Une pirouette", "Un appuyer au galop"], 1, "La reprise comprend des demi-cercles de 20 m au contre-galop, en plus des cercles de 12 m."),
    Q("Dans la reprise, quand tu « romps le contact » pendant 2 à 3 foulées, le cheval doit…", ["Accélérer", "Passer au trot", "Baisser la tête jusqu'au sol", "Garder son attitude et son galop"], 3, "Le cheval doit garder son attitude, sa cadence et ses foulées, sans heurt à l'avancée des mains ni à la reprise du contact."),
    Q("Quelles notes d'ensemble comptent double dans la reprise ?", ["Allures et impulsion", "Toutes les notes", "Disponibilité, position et emploi des aides, tracé et passage des coins", "Aucune"], 2, "La disponibilité, la position et l'emploi des aides, le tracé et le passage des coins ont un coefficient 2 ; les allures et l'impulsion, un coefficient 1."),
    Q("D'après le programme du Galop 7, les sauts rapprochés en CSO font environ…", ["1,10 m", "70 cm", "80 cm", "1,30 m"], 0, "C'est un repère du programme des Galops pour l'examen, pas une cote de compétition."),
    Q("Où trouves-tu les cotes exactes d'une épreuve Club 1 en compétition ?", ["Dans le programme des Galops", "Dans le règlement de la discipline pour la saison en cours", "Sur le livret de ton cheval", "Nulle part : elles ne changent jamais"], 1, "Les cotes de compétition sont fixées par les règlements CSO et CCE de chaque saison ; le programme des Galops donne seulement des repères d'examen."),
    Q("Que regarde l'examinateur en cross ?", ["Que tu ailles le plus vite possible", "Que ton cheval soit tressé", "Que tu sautes chaque obstacle de biais", "Ta stabilité, ton équilibre, ta conduite et une vitesse adaptée"], 3, "En cross, on juge la stabilité, l'adaptation de l'équilibre, la conduite et une vitesse adaptée, toujours contrôlée.")
  ]
}
];

/* titres des 16 cours en 14 langues (liste de la page du Galop 7, sommaire) ; le contenu reste en français jusqu'à validation */
var TITRES = {
"g7n-01": {"fr":"La bride","en":"The double bridle","es":"La brida","it":"Il morso e filetto","ja":"ダブルブライドル","de":"Die Kandare","ar":"اللجام المزدوج","zh":"双缰勒","nl":"Het stangbit","pt":"A brida","sv":"Kandaret","ru":"Мундштучное оголовье","pl":"Munsztuk","ko":"더블 브라이들"},
"g7n-02": {"fr":"Les bandes de polo","en":"Polo bandages","es":"Las vendas de polo","it":"Le fasce da lavoro","ja":"ポロバンデージ","de":"Fleecebandagen","ar":"أربطة البولو","zh":"运动绷带","nl":"Fleecebandages","pt":"As ligaduras de polo","sv":"Fleecelindor","ru":"Флисовые бинты","pl":"Bandaże polarowe","ko":"폴로 붕대"},
"g7n-03": {"fr":"La longe avec enrênement","en":"Lunging with training aids","es":"La cuerda con riendas auxiliares","it":"La corda con redini ausiliarie","ja":"補助手綱をつけた調馬索","de":"Longieren mit Hilfszügeln","ar":"العمل بالحبل مع الأعنّة المساعدة","zh":"使用辅助缰的打圈","nl":"Longeren met hulpteugels","pt":"A guia com rédeas auxiliares","sv":"Longering med hjälptyglar","ru":"Работа на корде с вспомогательным поводом","pl":"Lonżowanie z wypinaczami","ko":"보조 고삐를 단 조마삭 운동"},
"g7n-04": {"fr":"Longues rênes et travail en main","en":"Long-reining and in-hand work","es":"Riendas largas y trabajo a la mano","it":"Redini lunghe e lavoro alla mano","ja":"長手綱とハンドワーク","de":"Doppellonge und Handarbeit","ar":"الأعنّة الطويلة والعمل باليد","zh":"长缰与牵手调教","nl":"Lange teugels en werk aan de hand","pt":"Rédeas longas e trabalho à mão","sv":"Långtömmar och handarbete","ru":"Длинные вожжи и работа в руках","pl":"Długie wodze i praca z ręki","ko":"긴 고삐와 핸드 워크"},
"g7n-05": {"fr":"Les défauts d'aplombs","en":"Conformation faults of the limbs","es":"Los defectos de aplomos","it":"I difetti di appiombo","ja":"肢勢の欠点","de":"Stellungsfehler der Gliedmaßen","ar":"عيوب استقامة الأطراف","zh":"肢势缺陷","nl":"Afwijkingen in de beenstand","pt":"Os defeitos de aprumos","sv":"Benställningsfel","ru":"Пороки постановки конечностей","pl":"Wady postawy kończyn","ko":"지세 결점"},
"g7n-06": {"fr":"Identifier un cheval","en":"Identifying a horse","es":"Identificar un caballo","it":"Identificare un cavallo","ja":"馬を識別する","de":"Ein Pferd identifizieren","ar":"التعرّف على هوية الحصان","zh":"识别一匹马","nl":"Een paard identificeren","pt":"Identificar um cavalo","sv":"Identifiera en häst","ru":"Идентификация лошади","pl":"Identyfikacja konia","ko":"말 식별하기"},
"g7n-07": {"fr":"Le transport et le bien-être","en":"Transport and welfare","es":"El transporte y el bienestar","it":"Il trasporto e il benessere","ja":"輸送とウェルフェア","de":"Transport und Wohlbefinden","ar":"النقل والرفاهية","zh":"运输与福利","nl":"Vervoer en welzijn","pt":"O transporte e o bem-estar","sv":"Transport och välbefinnande","ru":"Перевозка и благополучие","pl":"Transport i dobrostan","ko":"수송과 복지"},
"g7n-08": {"fr":"Le rationnement et les aliments","en":"Rationing and feedstuffs","es":"El racionamiento y los alimentos","it":"Il razionamento e gli alimenti","ja":"飼料設計と飼料","de":"Rationsgestaltung und Futtermittel","ar":"تقنين العلف والأغذية","zh":"日粮配给与饲料","nl":"Rantsoenering en voeders","pt":"O racionamento e os alimentos","sv":"Utfodring och fodermedel","ru":"Рацион и корма","pl":"Dawkowanie paszy i pasze","ko":"사료 배합과 사료"},
"g7n-09": {"fr":"Le cheval sur la main","en":"The horse on the bit","es":"El caballo en la mano","it":"Il cavallo in mano","ja":"ハミ受け","de":"Das Pferd an den Hilfen","ar":"الحصان على اليد","zh":"上手","nl":"Het paard aan het bit","pt":"O cavalo na mão","sv":"Hästen på handen","ru":"Лошадь на поводу","pl":"Koń na wędzidle","ko":"말을 손에 올리기"},
"g7n-10": {"fr":"La détente et la position","en":"Warming up and position","es":"El calentamiento y la posición","it":"Il riscaldamento e la posizione","ja":"準備運動と騎座","de":"Die Lösungsphase und der Sitz","ar":"الإحماء ووضعية الفارس","zh":"热身与骑姿","nl":"Het losrijden en de zit","pt":"O aquecimento e a posição","sv":"Uppvärmning och sits","ru":"Разминка и посадка","pl":"Rozprężenie i dosiad","ko":"워밍업과 자세"},
"g7n-11": {"fr":"Incurvation et rectitude","en":"Bend and straightness","es":"Incurvación y rectitud","it":"Incurvamento e dirittura","ja":"湾曲と真直性","de":"Biegung und Geraderichtung","ar":"التقوّس والاستقامة","zh":"弯曲与端正性","nl":"Buiging en rechtgerichtheid","pt":"Incurvação e retidão","sv":"Böjning och rakriktning","ru":"Сгибание и прямолинейность","pl":"Zgięcie i prostość","ko":"휨과 직진성"},
"g7n-12": {"fr":"L'épaule en dedans","en":"Shoulder-in","es":"La espalda adentro","it":"La spalla in dentro","ja":"肩を内へ","de":"Das Schulterherein","ar":"الكتف إلى الداخل","zh":"肩向内","nl":"Schouderbinnenwaarts","pt":"A espádua a dentro","sv":"Öppna","ru":"Плечо внутрь","pl":"Łopatka do wewnątrz","ko":"숄더인"},
"g7n-13": {"fr":"Le travail au galop","en":"Work at the canter","es":"El trabajo al galope","it":"Il lavoro al galoppo","ja":"駈歩の運動","de":"Die Arbeit im Galopp","ar":"العمل في العدو","zh":"跑步练习","nl":"Het werk in galop","pt":"O trabalho a galope","sv":"Arbete i galopp","ru":"Работа галопом","pl":"Praca w galopie","ko":"구보 운동"},
"g7n-14": {"fr":"Le CSO : enchaîner et diriger","en":"Show jumping: linking and steering","es":"Salto de obstáculos: encadenar y dirigir","it":"Salto ostacoli: concatenare e dirigere","ja":"障害飛越：連続飛越とライン取り","de":"Springen: verbinden und lenken","ar":"قفز الحواجز: الربط والتوجيه","zh":"场地障碍：连续跳跃与控线","nl":"Springen: aaneenschakelen en sturen","pt":"Saltos: encadear e dirigir","sv":"Hoppning: koppla ihop och styra","ru":"Конкур: связки и управление","pl":"Skoki: łączenie i prowadzenie","ko":"장애물 비월: 연결과 방향 잡기"},
"g7n-15": {"fr":"Le cross : terrain, vitesse et précision","en":"Cross-country: terrain, speed and accuracy","es":"El cross: terreno, velocidad y precisión","it":"Il cross: terreno, velocità e precisione","ja":"クロスカントリー：地形、スピード、正確さ","de":"Gelände: Terrain, Tempo und Präzision","ar":"الكروس: التضاريس والسرعة والدقة","zh":"越野：地形、速度与精准","nl":"Cross: terrein, snelheid en precisie","pt":"O cross: terreno, velocidade e precisão","sv":"Terräng: underlag, fart och precision","ru":"Кросс: рельеф, скорость и точность","pl":"Cross: teren, tempo i precyzja","ko":"크로스컨트리: 지형, 속도, 정확성"},
"g7n-16": {"fr":"L'examen du Galop 7","en":"The Galop 7 exam","es":"El examen del Galop 7","it":"L'esame del Galop 7","ja":"Galop 7の試験","de":"Die Prüfung zum Galopp 7","ar":"امتحان الغالوب 7","zh":"Galop 7 考试","nl":"Het examen van Galop 7","pt":"O exame do Galop 7","sv":"Examen för Galop 7","ru":"Экзамен Galop 7","pl":"Egzamin Galop 7","ko":"Galop 7 시험"}
};
COURS.forEach(function (c) { if (TITRES[c.id]) c.titre = TITRES[c.id]; });
window.COURS_GALOP7_NOUVEAUX = COURS;
/* 02/11 16h56 (Blandine « Branche les ») : BRANCHÉS — les 16 cours remplacent les 6 brouillons dans la liste du Galop 7.
   Brouillons g7-c1 … g7-c6 gardés dans window.COURS_GALOP7_BROUILLONS (rien de perdu). Galop 7 = « Prochainement » :
   seules les modératrices ouvrent les cours (HYPE_GALOP_PROCHAIN_DES dans index.html). */
window.COURS_GALOP7_BROUILLONS = window.COURS_GALOP7_BROUILLONS || (window.COURS_GALOP7_FR || []).filter(function (c) { return c && !/^g7n-/.test(c.id); });
window.COURS_GALOP7_FR = COURS;
/* petit lexique de chaque cours, montré sur la page « Révise en 2 minutes » (comme le Galop 5) */
window.HYPE_LEXIQUE_EXTRA = window.HYPE_LEXIQUE_EXTRA || {};
COURS.forEach(function (c) { if (c.lexique && c.lexique.fr) window.HYPE_LEXIQUE_EXTRA[c.id] = { fr: { titre: "Petit lexique", mots: c.lexique.fr } }; });
window.COURS_GALOP7_NOUVEAUX_PARTIES = { vie: ["g7n-01", "g7n-02", "g7n-03", "g7n-04"], connaissance: ["g7n-05", "g7n-06", "g7n-07", "g7n-08"], technique: ["g7n-09", "g7n-10", "g7n-11", "g7n-12", "g7n-13", "g7n-14", "g7n-15"], culture: ["g7n-16"] };
})();
