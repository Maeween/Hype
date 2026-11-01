/* =====================================================================================
   hype-cours-position.js — SCHÉMA INTERACTIF « LA BONNE POSITION ASSISE » (Galop 1, g1-c5)
   01/11/2026 — brief de Blandine « Nouvelle maquette interactive : la bonne position du cavalier ».
   La photo garde ses cinq médaillons dessinés ; on pose dessus des zones de toucher INVISIBLES (aucun bouton ajouté).
   Le repère choisi s'éclaire d'un fin halo champagne, les autres s'atténuent. Le détail (numéro, nom, explication,
   conseil, Précédent / Suivant, onglets) est à droite sur grand écran, sous la photo sur téléphone ; jamais sur la photo.
   Vient EN PLUS du texte du cours (décision de Blandine : « des gens n'iront pas le lire, garde le texte »).
   Image : images/position-assise-g1.webp (1672 × 941). Textes : 14 langues, arabe de droite à gauche.
   Usage : h(HypePositionAssise.Module, { lg }) — branché par MODULES_COURS dans hype-cours-editorial.js.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement, useState = React.useState, useRef = React.useRef;
var W = 1672, H = 941, IMG = "images/position-assise-g1.webp";
/* médaillons et petits points déjà dessinés dans la photo (pixels de l'image) : [x, y, rayon] et [x, y] */
var REP = [
  { ic: [1197, 81, 60], pt: [889, 87] },   /* regard */
  { ic: [367, 191, 65], pt: [766, 217] },  /* buste */
  { ic: [1465, 246, 62], pt: [953, 304] }, /* mains */
  { ic: [311, 376, 64], pt: [762, 360] },  /* assiette */
  { ic: [1363, 578, 65], pt: [887, 585] }  /* jambes */
];
var L={
fr:{n:"Français",t:["La bonne position","assise"],ref:"Oreille – épaule – hanche – talon : une ligne de repère, jamais une position figée.",c:"Conseil",p:"Précédent",s:"Suivant",h:"Touche un repère sur la photo",
 o:["Regard","Buste","Mains","Assiette","Jambes"],
 nom:["Le regard","Le buste","Les mains","L’assiette","Les jambes et les talons"],
 x:["Regarde loin devant toi, dans la direction où tu souhaites aller. Garde la tête droite et le regard à l’horizontale.","Tiens-toi droit, les épaules ouvertes et détendues, sans cambrer exagérément le dos. Ton buste accompagne souplement les mouvements du cheval.","Garde les mains calmes, proches l’une de l’autre et légèrement au-dessus du garrot. Au pas et au galop, tes coudes se plient et se déplient pour accompagner le balancier de l’encolure.","Assieds-toi au centre de la selle, avec le bassin équilibré. Accompagne naturellement les mouvements du cheval sans te crisper. Au galop, ton bassin accompagne le cheval à chaque foulée.","Laisse les jambes descendre naturellement le long des flancs du cheval. Les chevilles restent souples et les talons légèrement plus bas que la pointe des pieds, sans forcer."],
 k:["Évite de regarder les oreilles ou l’encolure de ton cheval.","Imagine qu’un fil te grandit doucement vers le haut.","Évite les bras tendus et les mains bloquées.","Recherche une assiette stable, mais jamais rigide.","Ne pousse pas artificiellement les talons vers le bas au risque de raidir tes jambes."]},
en:{n:"English",t:["The correct","seated position"],ref:"Ear – shoulder – hip – heel: a reference line, never a frozen pose.",c:"Tip",p:"Previous",s:"Next",h:"Tap a marker on the photo",
 o:["Gaze","Upper body","Hands","Seat","Legs"],
 nom:["Your gaze","Your upper body","Your hands","Your seat","Legs and heels"],
 x:["Look far ahead, in the direction you want to go. Keep your head straight and your eyes level.","Sit tall, shoulders open and relaxed, without over-arching your back. Your upper body follows the horse’s movement smoothly.","Keep your hands quiet, close together and slightly above the withers. At the walk and canter, your elbows bend and open to follow the swing of the neck.","Sit in the centre of the saddle with your pelvis balanced. Follow the horse’s movement naturally, without tensing up. At the canter, your pelvis goes with the horse at every stride.","Let your legs hang naturally along the horse’s sides. Ankles stay supple and heels slightly lower than your toes, without forcing."],
 k:["Avoid looking at your horse’s ears or neck.","Imagine a thread gently drawing you upwards.","Avoid straight arms and blocked hands.","Look for a seat that is stable, but never rigid.","Don’t force your heels down artificially — it stiffens your legs."]},
es:{n:"Español",t:["La buena postura","sentada"],ref:"Oreja – hombro – cadera – talón: una línea de referencia, nunca una postura fija.",c:"Consejo",p:"Anterior",s:"Siguiente",h:"Toca un punto de la foto",
 o:["Mirada","Torso","Manos","Asiento","Piernas"],
 nom:["La mirada","El torso","Las manos","El asiento","Piernas y talones"],
 x:["Mira lejos, hacia donde quieres ir. Mantén la cabeza recta y la mirada horizontal.","Mantente erguido, con los hombros abiertos y relajados, sin arquear demasiado la espalda. Tu torso acompaña con soltura los movimientos del caballo.","Mantén las manos tranquilas, cerca una de la otra y un poco por encima de la cruz. Al paso y al galope, los codos se doblan y se abren para acompañar el balanceo del cuello.","Siéntate en el centro de la silla, con la pelvis equilibrada. Acompaña con naturalidad los movimientos del caballo, sin crisparte. Al galope, tu pelvis acompaña al caballo en cada tranco.","Deja que las piernas bajen con naturalidad a lo largo de los costados del caballo. Los tobillos siguen flexibles y los talones un poco más bajos que la punta del pie, sin forzar."],
 k:["Evita mirar las orejas o el cuello de tu caballo.","Imagina que un hilo te estira suavemente hacia arriba.","Evita los brazos estirados y las manos bloqueadas.","Busca un asiento estable, pero nunca rígido.","No bajes los talones a la fuerza: tus piernas se pondrían rígidas."]},
it:{n:"Italiano",t:["La giusta posizione","seduta"],ref:"Orecchio – spalla – anca – tallone: una linea di riferimento, mai una posizione bloccata.",c:"Consiglio",p:"Precedente",s:"Successivo",h:"Tocca un punto sulla foto",
 o:["Sguardo","Busto","Mani","Assetto","Gambe"],
 nom:["Lo sguardo","Il busto","Le mani","L’assetto","Gambe e talloni"],
 x:["Guarda lontano davanti a te, nella direzione in cui vuoi andare. Tieni la testa dritta e lo sguardo orizzontale.","Stai dritto, con le spalle aperte e rilassate, senza inarcare troppo la schiena. Il busto accompagna morbidamente i movimenti del cavallo.","Tieni le mani ferme, vicine tra loro e poco sopra il garrese. Al passo e al galoppo, i gomiti si piegano e si distendono per accompagnare il bilanciere dell’incollatura.","Siediti al centro della sella, con il bacino in equilibrio. Accompagna con naturalezza i movimenti del cavallo, senza irrigidirti. Al galoppo, il bacino accompagna il cavallo a ogni falcata.","Lascia scendere le gambe in modo naturale lungo i fianchi del cavallo. Le caviglie restano morbide e i talloni un po’ più bassi della punta del piede, senza forzare."],
 k:["Evita di guardare le orecchie o l’incollatura del tuo cavallo.","Immagina un filo che ti allunga dolcemente verso l’alto.","Evita le braccia tese e le mani bloccate.","Cerca un assetto stabile, ma mai rigido.","Non spingere i talloni in basso a forza: irrigidiresti le gambe."]},
de:{n:"Deutsch",t:["Die richtige Position","im Sitzen"],ref:"Ohr – Schulter – Hüfte – Absatz: eine Orientierungslinie, nie eine starre Haltung.",c:"Tipp",p:"Zurück",s:"Weiter",h:"Tippe auf einen Punkt im Foto",
 o:["Blick","Oberkörper","Hände","Sitz","Beine"],
 nom:["Der Blick","Der Oberkörper","Die Hände","Der Sitz","Beine und Absätze"],
 x:["Schau weit nach vorne, dorthin, wo du hinreiten möchtest. Halte den Kopf gerade und den Blick waagerecht.","Sitz aufrecht, die Schultern offen und locker, ohne ein übertriebenes Hohlkreuz. Dein Oberkörper geht geschmeidig mit den Bewegungen des Pferdes mit.","Halte die Hände ruhig, nah beieinander und etwas über dem Widerrist. Im Schritt und im Galopp beugen und öffnen sich deine Ellbogen, um der Nickbewegung des Halses zu folgen.","Setz dich in die Mitte des Sattels, das Becken im Gleichgewicht. Geh natürlich mit den Bewegungen des Pferdes mit, ohne dich zu verkrampfen. Im Galopp schwingt dein Becken bei jedem Sprung mit.","Lass die Beine natürlich an den Seiten des Pferdes herabhängen. Die Fußgelenke bleiben locker und die Absätze etwas tiefer als die Fußspitzen, ohne Zwang."],
 k:["Schau nicht auf die Ohren oder den Hals deines Pferdes.","Stell dir einen Faden vor, der dich sanft nach oben zieht.","Vermeide gestreckte Arme und feste Hände.","Such einen stabilen, aber nie steifen Sitz.","Drück die Absätze nicht künstlich nach unten – sonst werden deine Beine steif."]},
ja:{n:"日本語",t:["座ったときの","正しい姿勢"],ref:"耳・肩・腰・かかと：目安のラインであって、固まった姿勢ではない。",c:"アドバイス",p:"前へ",s:"次へ",h:"写真のマークをタップしよう",
 o:["視線","上体","手","騎座","脚"],
 nom:["視線","上体","手","騎座","脚とかかと"],
 x:["進みたい方向の遠くを見よう。頭はまっすぐ、視線は水平に保とう。","背すじを伸ばし、肩は開いて力を抜き、腰を反らせすぎないように。上体は馬の動きにしなやかについていこう。","手は静かに、左右を近づけて、き甲の少し上に。常歩と駈歩では、首の振り子のような動きについていくように、ひじを曲げたり伸ばしたりしよう。","鞍の中央に座り、骨盤のバランスをとろう。力まずに、馬の動きに自然についていこう。駈歩では、一完歩ごとに骨盤で馬の動きについていこう。","脚は馬体に沿って自然に下ろそう。足首は柔らかく、かかとはつま先より少し低く、無理をせずに。"],
 k:["馬の耳や首を見ないようにしよう。","糸で頭の上からそっと引き上げられているところをイメージしよう。","腕を突っ張ったり、手を固めたりしないように。","安定していて、でも決して硬くない騎座を目指そう。","かかとを無理に押し下げないこと。脚が硬くなってしまうよ。"]},
ar:{n:"العربية",rtl:1,t:["الوضعية الصحيحة","في الجلوس"],ref:"الأذن – الكتف – الورك – الكعب: خط مرجعي، وليس وضعية جامدة.",c:"نصيحة",p:"السابق",s:"التالي",h:"المسي علامة على الصورة",
 o:["النظر","الجذع","اليدان","الجلسة","الساقان"],
 nom:["النظر","الجذع","اليدان","الجلسة","الساقان والكعبان"],
 x:["انظري بعيدا إلى الأمام، في الاتجاه الذي تريدين الذهاب إليه. أبقي رأسك مستقيما ونظرك أفقيا.","اجلسي باستقامة، مع كتفين منفتحين ومرتاحين، دون تقويس ظهرك أكثر من اللازم. يرافق جذعك حركات الحصان بمرونة.","أبقي يديك هادئتين، قريبتين من بعضهما وفوق الحارك بقليل. في المشي والعدو، ينثني المرفقان وينفتحان لمرافقة تأرجح الرقبة.","اجلسي في وسط السرج، مع حوض متوازن. رافقي حركات الحصان بشكل طبيعي دون أن تتشنجي. في العدو، يرافق حوضك الحصان مع كل خطوة.","اتركي ساقيك تنزلان بشكل طبيعي على طول جانبي الحصان. يبقى الكاحلان مرنين والكعبان أخفض قليلا من مقدمة القدم، دون إجبار."],
 k:["تجنبي النظر إلى أذني حصانك أو رقبته.","تخيلي أن خيطا يشدك برفق إلى الأعلى.","تجنبي الذراعين الممدودتين واليدين المتصلبتين.","ابحثي عن جلسة ثابتة، لكن غير متصلبة أبدا.","لا تدفعي كعبيك إلى الأسفل بشكل مصطنع، فقد تتصلب ساقاك."]},
zh:{n:"中文",t:["正确的","坐姿"],ref:"耳朵 – 肩膀 – 髋部 – 脚跟：一条参考线，而不是僵硬的姿势。",c:"建议",p:"上一个",s:"下一个",h:"点一下照片上的标记",
 o:["视线","上身","双手","骑座","双腿"],
 nom:["视线","上身","双手","骑座","双腿与脚跟"],
 x:["看向远处，朝你想去的方向。头保持正直，视线保持水平。","坐直，双肩打开并放松，背部不要过度塌腰。上身柔和地跟随马的动作。","双手保持安静，彼此靠近，略高于鬐甲。在慢步和跑步时，手肘随着马颈的摆动弯曲和伸展。","坐在马鞍中央，骨盆保持平衡。自然地跟随马的动作，不要紧绷。跑步时，骨盆每一步都跟随马的动作。","让双腿沿着马腹自然下垂。脚踝保持柔软，脚跟略低于脚尖，不要用力。"],
 k:["不要盯着马的耳朵或脖子看。","想象有一根线轻轻把你往上提。","避免手臂伸直、双手僵硬。","追求稳定但绝不僵硬的骑座。","不要刻意把脚跟往下压，否则双腿会变僵。"]},
nl:{n:"Nederlands",t:["De goede","zithouding"],ref:"Oor – schouder – heup – hiel: een richtlijn, nooit een starre houding.",c:"Tip",p:"Vorige",s:"Volgende",h:"Tik op een punt op de foto",
 o:["Blik","Bovenlijf","Handen","Zit","Benen"],
 nom:["De blik","Het bovenlichaam","De handen","De zit","Benen en hielen"],
 x:["Kijk ver vooruit, in de richting waar je heen wilt. Houd je hoofd recht en je blik horizontaal.","Zit rechtop, met open en ontspannen schouders, zonder je rug te hol te maken. Je bovenlichaam volgt soepel de bewegingen van het paard.","Houd je handen rustig, dicht bij elkaar en net boven de schoft. In stap en galop buigen en strekken je ellebogen mee met de knikbeweging van de hals.","Ga midden in het zadel zitten, met je bekken in balans. Volg de bewegingen van het paard natuurlijk, zonder te verkrampen. In galop gaat je bekken bij elke sprong mee met het paard.","Laat je benen natuurlijk langs de flanken van het paard hangen. Je enkels blijven soepel en je hielen iets lager dan je tenen, zonder te forceren."],
 k:["Kijk niet naar de oren of de hals van je paard.","Stel je voor dat een draadje je zachtjes omhoog trekt.","Vermijd gestrekte armen en vaste handen.","Zoek een stabiele zit, maar nooit een stijve.","Duw je hielen niet geforceerd omlaag, anders worden je benen stijf."]},
pt:{n:"Português",t:["A boa posição","sentada"],ref:"Orelha – ombro – quadril – calcanhar: uma linha de referência, nunca uma posição rígida.",c:"Dica",p:"Anterior",s:"Próximo",h:"Toque em um ponto da foto",
 o:["Olhar","Tronco","Mãos","Assento","Pernas"],
 nom:["O olhar","O tronco","As mãos","O assento","Pernas e calcanhares"],
 x:["Olhe bem longe, à frente, na direção para onde você quer ir. Mantenha a cabeça reta e o olhar na horizontal.","Fique ereto, com os ombros abertos e relaxados, sem arquear demais as costas. Seu tronco acompanha com leveza os movimentos do cavalo.","Mantenha as mãos calmas, próximas uma da outra e um pouco acima da cernelha. No passo e no galope, os cotovelos se dobram e se abrem para acompanhar o balanço do pescoço.","Sente-se no centro da sela, com a pelve equilibrada. Acompanhe naturalmente os movimentos do cavalo, sem se contrair. No galope, sua pelve acompanha o cavalo a cada passada.","Deixe as pernas descerem naturalmente ao longo dos flancos do cavalo. Os tornozelos ficam soltos e os calcanhares um pouco mais baixos que a ponta dos pés, sem forçar."],
 k:["Evite olhar para as orelhas ou o pescoço do seu cavalo.","Imagine um fio puxando você suavemente para cima.","Evite braços esticados e mãos travadas.","Busque um assento estável, mas nunca rígido.","Não force os calcanhares para baixo: isso enrijece as pernas."]},
sv:{n:"Svenska",t:["Rätt","sittande ridställning"],ref:"Öra – axel – höft – häl: en riktlinje, aldrig en låst ställning.",c:"Tips",p:"Föregående",s:"Nästa",h:"Tryck på en punkt i bilden",
 o:["Blick","Överkropp","Händer","Sits","Ben"],
 nom:["Blicken","Överkroppen","Händerna","Sitsen","Ben och hälar"],
 x:["Titta långt framåt, åt det håll du vill rida. Håll huvudet rakt och blicken vågrät.","Sitt upprätt med öppna, avslappnade axlar, utan att svanka för mycket. Överkroppen följer mjukt med i hästens rörelser.","Håll händerna stilla, nära varandra och strax ovanför manken. I skritt och galopp böjs och sträcks armbågarna för att följa halsens nickrörelse.","Sitt mitt i sadeln med bäckenet i balans. Följ naturligt med i hästens rörelser utan att spänna dig. I galopp följer bäckenet med hästen i varje språng.","Låt benen hänga naturligt längs hästens sidor. Fotlederna är mjuka och hälarna lite lägre än tårna, utan att tvinga."],
 k:["Undvik att titta på hästens öron eller hals.","Tänk dig att en tråd försiktigt drar dig uppåt.","Undvik raka armar och låsta händer.","Sök en stabil sits, men aldrig en stel.","Tryck inte ner hälarna konstlat – då blir benen stela."]},
ru:{n:"Русский",t:["Правильная посадка","сидя в седле"],ref:"Ухо – плечо – бедро – пятка: ориентир, а не застывшая поза.",c:"Совет",p:"Назад",s:"Далее",h:"Коснись отметки на фото",
 o:["Взгляд","Корпус","Руки","Посадка","Ноги"],
 nom:["Взгляд","Корпус","Руки","Посадка в седле","Ноги и пятки"],
 x:["Смотри далеко вперёд, туда, куда хочешь ехать. Держи голову прямо, а взгляд — горизонтально.","Сиди прямо, плечи раскрыты и расслаблены, без лишнего прогиба в спине. Корпус мягко следует за движениями лошади.","Держи руки спокойно, близко друг к другу и чуть выше холки. На шагу и галопе локти сгибаются и разгибаются, следуя за качанием шеи.","Садись в центр седла, таз в равновесии. Естественно следуй за движениями лошади, не зажимаясь. На галопе таз следует за лошадью на каждом темпе.","Позволь ногам естественно опуститься вдоль боков лошади. Голеностопы остаются мягкими, а пятки — чуть ниже носков, без усилия."],
 k:["Не смотри на уши или шею лошади.","Представь, что тебя мягко тянет вверх невидимая нить.","Избегай прямых рук и зажатых кистей.","Ищи устойчивую, но никогда не жёсткую посадку.","Не опускай пятки вниз через силу: ноги станут жёсткими."]},
pl:{n:"Polski",t:["Dobry","pełny dosiad"],ref:"Ucho – bark – biodro – pięta: linia odniesienia, nigdy zastygła pozycja.",c:"Rada",p:"Wstecz",s:"Dalej",h:"Dotknij punktu na zdjęciu",
 o:["Wzrok","Tułów","Ręce","Dosiad","Nogi"],
 nom:["Wzrok","Tułów","Ręce","Dosiad","Nogi i pięty"],
 x:["Patrz daleko przed siebie, w kierunku, w którym chcesz jechać. Trzymaj głowę prosto, a wzrok poziomo.","Siedź prosto, z otwartymi i rozluźnionymi barkami, bez nadmiernego wyginania pleców. Tułów miękko podąża za ruchami konia.","Trzymaj ręce spokojnie, blisko siebie i trochę nad kłębem. W stępie i galopie łokcie zginają się i prostują, by podążać za ruchem szyi.","Usiądź na środku siodła, z miednicą w równowadze. Podążaj naturalnie za ruchami konia, bez spinania się. W galopie miednica podąża za koniem przy każdym skoku.","Pozwól nogom swobodnie opaść wzdłuż boków konia. Kostki pozostają miękkie, a pięty trochę niżej niż palce, bez wysiłku."],
 k:["Nie patrz na uszy ani na szyję konia.","Wyobraź sobie nitkę, która delikatnie wyciąga cię w górę.","Unikaj wyprostowanych rąk i zablokowanych dłoni.","Szukaj dosiadu stabilnego, ale nigdy sztywnego.","Nie wciskaj pięt w dół na siłę – nogi zrobią się sztywne."]},
ko:{n:"한국어",t:["좋은","앉은 자세"],ref:"귀 – 어깨 – 엉덩이 – 발뒤꿈치: 기준선일 뿐, 굳은 자세가 아니에요.",c:"조언",p:"이전",s:"다음",h:"사진의 표시를 눌러 보세요",
 o:["시선","상체","손","앉기","다리"],
 nom:["시선","상체","손","앉는 자세","다리와 발뒤꿈치"],
 x:["가고 싶은 방향으로 멀리 앞을 보세요. 머리는 곧게, 시선은 수평으로 유지해요.","어깨를 펴고 힘을 뺀 채 곧게 앉되, 허리를 너무 젖히지 마세요. 상체는 말의 움직임을 부드럽게 따라가요.","손은 조용히, 서로 가깝게, 기갑보다 살짝 위에 두세요. 평보와 구보에서는 목의 흔들림을 따라 팔꿈치를 굽혔다 폈다 해요.","안장 한가운데에 앉고 골반의 균형을 잡으세요. 몸에 힘을 주지 말고 말의 움직임을 자연스럽게 따라가요. 구보에서는 매 걸음마다 골반이 말의 움직임을 따라가요.","다리는 말의 옆구리를 따라 자연스럽게 내려 두세요. 발목은 부드럽게, 발뒤꿈치는 발끝보다 살짝 낮게, 억지로 힘주지 말고요."],
 k:["말의 귀나 목을 내려다보지 마세요.","실 하나가 나를 위로 살며시 끌어올린다고 상상해 보세요.","팔을 쭉 펴거나 손을 굳히지 마세요.","안정적이지만 절대 딱딱하지 않은 자세를 찾아요.","발뒤꿈치를 억지로 내리누르지 마세요. 다리가 굳어 버려요."]}
};
function pk(lg) { return L[lg] || L.fr; }
var pc = function (v, t) { return (v / t * 100) + "%"; };
var CSS = [
".hpa{--n:#070A08;--pp:#0B1113;--iv:#F3EEE4;--ch:#C9A66B;--ivd:rgba(243,238,228,.78);--ivp:rgba(243,238,228,.52);--fil:rgba(201,166,107,.26);container-type:inline-size;color:var(--iv);font-family:'Montserrat',system-ui,sans-serif}",
".hpa h3{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-weight:500;font-size:clamp(28px,5cqw,42px);line-height:1.1;margin:0 0 6px;text-wrap:balance}",
".hpa h3 em{color:var(--ch);font-style:italic}",
".hpa .aide{font-size:12.5px;color:var(--ivp);margin:0 0 18px}",
".hpa .sc{display:grid;grid-template-columns:minmax(0,1fr);gap:0}",
".hpa .ph{position:relative;margin:0}",
".hpa .ph img{display:block;width:100%;height:auto;border-radius:4px}",
".hpa .ph:after{content:'';position:absolute;inset:0;border:1px solid var(--fil);border-radius:4px;pointer-events:none}",
".hpa .rp{position:absolute;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;aspect-ratio:1;transition:background .45s ease,box-shadow .45s ease,transform .45s ease}",
".hpa .rp.ic{background:rgba(7,10,8,.5)}.hpa .rp.po{background:rgba(7,10,8,.55)}",
".hpa .rp.on{background:rgba(201,166,107,.10);mix-blend-mode:screen}",
".hpa .rp.ic.on{box-shadow:0 0 0 1px rgba(201,166,107,.85),0 0 22px 2px rgba(201,166,107,.35);transform:translate(-50%,-50%) scale(1.07)}",
".hpa .rp.po.on{box-shadow:0 0 14px 3px rgba(201,166,107,.6)}",
".hpa .zt{position:absolute;transform:translate(-50%,-50%);border-radius:50%;aspect-ratio:1;min-width:40px;background:transparent;border:0;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}",
".hpa .zt:focus-visible{outline:1px dashed var(--ch);outline-offset:2px}",
".hpa .pa{display:flex;flex-direction:column;padding:22px 2px 0}",
".hpa .cp{font-size:11px;letter-spacing:.22em;color:var(--ch);font-weight:500;margin-bottom:6px}",
".hpa .nu{display:none;font-family:'Cormorant Garamond',serif;font-variant-numeric:lining-nums;font-size:60px;line-height:.9;color:var(--ch);margin:12px 0 4px;font-weight:500}",
".hpa h4{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-weight:600;font-size:29px;line-height:1.1;margin:0 0 12px}",
".hpa .tx{font-size:15px;line-height:1.68;color:var(--ivd);margin:0}",
".hpa .cs{margin-top:18px;padding-top:14px;border-top:1px solid var(--fil)}",
".hpa .cl{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--ch);font-weight:600}",
".hpa .ct{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;line-height:1.4;margin:8px 0 0}",
".hpa .fd{transition:opacity .28s ease,transform .28s ease}.hpa .fd.out{opacity:0;transform:translateY(6px)}",
".hpa .bs{margin-top:auto;padding-top:22px}",
".hpa .nv{display:flex;gap:10px}",
".hpa .nv button{flex:1;background:transparent;border:1px solid var(--fil);border-radius:999px;padding:11px 12px;font:500 13px 'Montserrat',sans-serif;color:var(--iv);cursor:pointer}",
".hpa .nv button:disabled{opacity:.3;cursor:default}",
".hpa .og{display:flex;gap:18px;margin:18px 0 0;padding:0;list-style:none;overflow-x:auto;scrollbar-width:none}",
".hpa .og::-webkit-scrollbar{display:none}",
".hpa .og button{background:none;border:0;border-bottom:1px solid transparent;padding:6px 2px 7px;font:400 12.5px 'Montserrat',sans-serif;color:var(--ivp);cursor:pointer;white-space:nowrap}",
".hpa .og button[aria-selected=true]{color:var(--ch);border-bottom-color:var(--ch)}",
".hpa[dir=rtl] .pa{text-align:right}",
".hpa[dir=rtl] h3,.hpa[dir=rtl] h4{font-family:'Noto Sans Arabic','Montserrat',sans-serif;font-weight:500}",
".hpa[dir=rtl] h3 em{font-style:normal}",
".hpa[dir=rtl] .cp,.hpa[dir=rtl] .cl{letter-spacing:0;font-size:12.5px}",
".hpa[dir=rtl] .ct{font-family:'Noto Sans Arabic','Montserrat',sans-serif;font-style:normal;font-size:16px}",
"@media (prefers-reduced-motion:reduce){.hpa .rp,.hpa .fd{transition:none}}",
"@container (min-width:900px){.hpa .sc{grid-template-columns:minmax(0,68fr) minmax(0,32fr);gap:28px;align-items:stretch}.hpa .ph{align-self:center}.hpa .pa{background:var(--pp);border:1px solid var(--fil);border-radius:4px;padding:32px 28px 24px}.hpa .nu{display:block}.hpa .og{justify-content:space-between;gap:4px}}"
].join("");

function Module(props) {
  var lg = props.lg || "fr", T = pk(lg), rtl = !!T.rtl;
  var _i = useState(0), idx = _i[0], setIdx = _i[1];
  var _o = useState(false), out = _o[0], setOut = _o[1];
  var tm = useRef(null);
  var aller = function (i) {
    if (i < 0 || i > 4 || i === idx) return;
    setOut(true); clearTimeout(tm.current);
    tm.current = setTimeout(function () { setIdx(i); setOut(false); }, 200);
  };
  var clavier = function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); aller(idx + (rtl ? -1 : 1)); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); aller(idx + (rtl ? 1 : -1)); }
  };
  var fl = rtl ? ["→", "←"] : ["←", "→"];
  return h("div", { className: "hpa", dir: rtl ? "rtl" : undefined, onKeyDown: clavier },
    h("style", null, CSS),
    h("h3", null, T.t[0] + " ", h("em", null, T.t[1])),
    h("p", { className: "aide" }, T.h),
    h("div", { className: "sc" },
      h("figure", { className: "ph", dir: "ltr" },
        h("img", { src: IMG, alt: "", width: W, height: H, loading: "lazy" }),
        REP.map(function (r, i) {
          return [
            h("div", { key: "a" + i, className: "rp ic" + (i === idx ? " on" : ""), style: { left: pc(r.ic[0], W), top: pc(r.ic[1], H), width: pc(r.ic[2] * 2 + 6, W) } }),
            h("div", { key: "b" + i, className: "rp po" + (i === idx ? " on" : ""), style: { left: pc(r.pt[0], W), top: pc(r.pt[1], H), width: pc(24, W) } }),
            h("button", { key: "c" + i, type: "button", className: "zt", "aria-label": T.nom[i], "aria-pressed": i === idx ? "true" : "false", style: { left: pc(r.ic[0], W), top: pc(r.ic[1], H), width: pc(r.ic[2] * 2 + 40, W) }, onClick: function () { aller(i); } }),
            h("button", { key: "d" + i, type: "button", className: "zt", tabIndex: -1, "aria-hidden": "true", style: { left: pc(r.pt[0], W), top: pc(r.pt[1], H), width: pc(96, W) }, onClick: function () { aller(i); } })
          ];
        })),
      h("div", { className: "pa", "aria-live": "polite" },
        h("div", { className: "fd" + (out ? " out" : "") },
          h("div", { className: "cp", dir: "ltr", style: { textAlign: rtl ? "right" : undefined } }, (idx + 1) + " / 5"),
          h("div", { className: "nu" }, "0" + (idx + 1)),
          h("h4", null, T.nom[idx]),
          h("p", { className: "tx" }, T.x[idx]),
          h("div", { className: "cs" }, h("div", { className: "cl" }, T.c), h("p", { className: "ct" }, T.k[idx]))),
        h("div", { className: "bs" },
          h("div", { className: "nv" },
            h("button", { type: "button", disabled: idx === 0, onClick: function () { aller(idx - 1); } }, fl[0] + "  " + T.p),
            h("button", { type: "button", disabled: idx === 4, onClick: function () { aller(idx + 1); } }, T.s + "  " + fl[1])),
          h("ul", { className: "og", role: "tablist" }, T.o.map(function (o, i) {
            return h("li", { key: i }, h("button", { type: "button", role: "tab", "aria-selected": i === idx ? "true" : "false", onClick: function () { aller(i); } }, o));
          }))))));
}
window.HypePositionAssise = { Module: Module, titre: function (lg) { var T = pk(lg); return T.t[0] + " " + T.t[1]; }, img: IMG, version: 1 };
})();
