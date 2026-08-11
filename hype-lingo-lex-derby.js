/* hype-lingo-lex-derby.js — Hype Linguae · Hickstead · « Le derby »
   ==================================================================
   17 CONCEPTS, UNE LEÇON. PREMIER CHAPITRE DU NOUVEAU FORMAT (11/08/2026,
   décision de Blandine) : 15-18 mots, phrases entières plus nombreuses,
   dont des RAPPELS À DEUX MOTS (champ `rappel:[ref,ref]`), et au moins un
   vocal garanti par le quota du moteur (Hickstead est niveau 2 : « dire »
   y entre déjà).

   POURQUOI CE CHAPITRE. Blandine, 11/08 : « Hickstead, on s'attend à
   apprendre des termes en rapport au derby — là il n'y a pas un seul terme
   en rapport avec le derby ». Exact : l'obstacle générique (vertical,
   oxer…) s'apprendra dans TOUTES les villes de CSO ; Hickstead est la
   seule qui puisse enseigner LE DERBY — la banque, les obstacles fixes et
   naturels, l'esprit cross dans un parcours de saut. L'ancien chapitre
   `obstacle` part en réserve pour la future ville californienne (« garde
   le vocabulaire que tu avais mis à Hickstead pour là-bas »).

   ⚠️ AUCUNE MARQUE, AUCUN ORGANISME PRIVÉ (règle du 8 août). Le Derby de
   Hickstead est nommé comme épreuve et comme lieu, jamais par un sponsor.

   ⚠️ AUDIT DES COLLISIONS FAIT (11/08, 24 lexiques) : `talus` et `gue`
   sont à lex-concours, `mur` à lex-obstacle, `descendre` et `assiette` à
   lex-cours. Ici : `berge`, `passagedeau`, `murderby`, `descendrebanque`,
   `equilibredescente` — notions distinctes, refs distincts.

   ⚠️ FORMAT DES PHRASES : À PLAT ({lecon:1, fr:"…"}). Jamais p:{…}.
   ⚠️ RELECTURE NATIVE RECOMMANDÉE sur DE et JA pour le vocabulaire du
   derby (Bank, Wall, Drop) — l'anglais est la langue d'origine, il est sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.derby = {
  ref: "derby",
  chapitre: 11,
  titre: { fr:"Le derby", en:"The derby", es:"El derby",
           it:"Il derby", de:"Das Derby", ja:"ダービー" },
  lecons: 1,

  concepts: [

  /* ---------- l'épreuve ---------- */

  { ref:"parcoursderby", lecon:1, coll:"derby",
    mots:{ fr:{m:"le derby"}, en:{m:"the derby", p:"deur-bi"},
           es:{m:"el derby"}, it:{m:"il derby"},
           de:{m:"das Derby", p:"dèr-bi"}, ja:{m:"ダービー", p:"dābī"} },
    def:{ fr:"Une épreuve de saut longue et sans détour : plus d'obstacles qu'un parcours ordinaire, des profils naturels et fixes, et un chrono qui compte moins que le courage. On ne gagne pas un derby en allant vite, on le gagne en passant partout.",
          en:"A long, honest jumping class: more fences than an ordinary course, natural and permanent profiles, and a clock that matters less than courage. You do not win a derby by going fast — you win it by getting everywhere.",
          es:"Una prueba de salto larga y sin rodeos: más obstáculos que un recorrido normal, perfiles naturales y fijos, y un crono que cuenta menos que el coraje. Un derby no se gana yendo rápido, se gana pasando por todas partes.",
          it:"Una prova di salto lunga e senza giri di parole: più ostacoli di un percorso normale, profili naturali e fissi, e un cronometro che conta meno del coraggio. Un derby non si vince andando veloci, si vince passando ovunque.",
          de:"Eine lange, ehrliche Springprüfung: mehr Hindernisse als ein gewöhnlicher Parcours, natürliche und feste Profile, und eine Uhr, die weniger zählt als Mut. Ein Derby gewinnt man nicht mit Tempo — man gewinnt es, indem man überall durchkommt.",
          ja:"長く、ごまかしのきかない障害飛越競技。通常のコースより障害が多く、自然な形や固定の障害が並び、タイムより勇気が問われる。ダービーは速さでは勝てない。すべてを越えた者が勝つ。" } },

  { ref:"banque", lecon:1, coll:"derby",
    mots:{ fr:{m:"la banque"}, en:{m:"the bank", p:"bank"},
           es:{m:"el banco de tierra"}, it:{m:"la banchina"},
           de:{m:"der Wall", p:"val"}, ja:{m:"バンク", p:"banku"} },
    def:{ fr:"Une butte de terre qu'on monte, qu'on traverse, et d'où l'on redescend. La plus célèbre fait plus de trois mètres : on ne la saute pas, on la descend au pas de sa foulée, assiette en arrière, rênes longues. C'est l'obstacle qui a fait la légende du lieu.",
          en:"A mound of earth you climb, cross, and come down from. The most famous one stands over ten feet: you do not jump it, you walk down it in your own stride, seat back, reins long. It is the fence that made this place a legend.",
          es:"Un montículo de tierra que se sube, se cruza y se baja. El más famoso mide más de tres metros: no se salta, se baja al ritmo del caballo, asiento atrás, riendas largas. Es el obstáculo que hizo la leyenda del lugar.",
          it:"Un rialzo di terra che si sale, si attraversa e si scende. La più celebre supera i tre metri: non si salta, si scende al ritmo della propria falcata, assetto indietro, redini lunghe. È l'ostacolo che ha fatto la leggenda del posto.",
          de:"Ein Erdwall, den man hinaufreitet, überquert und wieder hinunterkommt. Der berühmteste misst über drei Meter: man springt ihn nicht, man geht ihn im eigenen Rhythmus hinunter, Gewicht zurück, Zügel lang. Das Hindernis, das diesen Ort zur Legende machte.",
          ja:"登り、渡り、降りる土の丘。最も有名なものは高さ三メートルを超える。飛ぶのではなく、馬の歩幅で降りる。体重は後ろへ、手綱は長く。この地を伝説にした障害である。" } },

  { ref:"descendrebanque", lecon:1, coll:"derby", v:true,
    mots:{ fr:{m:"descendre la banque"}, en:{m:"to drop down", p:"tou drop daoun"},
           es:{m:"bajar el banco"}, it:{m:"scendere la banchina"},
           de:{m:"den Wall hinunterreiten", p:"hi-noun-teur-raï-teune"},
           ja:{m:"バンクを降りる", p:"banku o oriru"} },
    def:{ fr:"Le geste monté le plus particulier du derby : on laisse le cheval glisser-descendre la pente raide, buste en arrière, jambes en avant, mains qui suivent. Celui qui se penche en avant passe par-dessus l'encolure. On ne dirige presque pas : on accompagne.",
          en:"The most particular piece of riding in a derby: you let the horse slide-walk down the steep face, upper body back, legs forward, hands following. Lean forward and you go over his neck. You barely steer — you go with him.",
          es:"El gesto montado más particular del derby: se deja al caballo deslizarse por la pendiente, busto atrás, piernas adelante, manos que siguen. Quien se inclina adelante pasa por encima del cuello. Casi no se dirige: se acompaña.",
          it:"Il gesto montato più particolare del derby: si lascia il cavallo scivolare lungo la discesa ripida, busto indietro, gambe avanti, mani che seguono. Chi si piega in avanti finisce oltre l'incollatura. Non si guida quasi: si accompagna.",
          de:"Der eigenwilligste Moment des Derbys im Sattel: man lässt das Pferd die steile Wand hinabrutschen, Oberkörper zurück, Beine vor, Hände folgen. Wer sich vorbeugt, fliegt über den Hals. Man lenkt kaum — man geht mit.",
          ja:"ダービーで最も独特な騎乗の瞬間。急な斜面を馬に滑り降りさせる。上体は後ろ、脚は前、手は馬に従う。前傾すれば首の向こうへ放り出される。ほとんど操作はしない。ただ馬に付いていく。" } },

  { ref:"butteirlandaise", lecon:1, coll:"derby",
    mots:{ fr:{m:"la butte irlandaise"}, en:{m:"the Irish bank", p:"aï-rich bank"},
           es:{m:"el banco irlandés"}, it:{m:"la banchina irlandese"},
           de:{m:"die irische Bank", p:"i-ri-che bank"},
           ja:{m:"アイリッシュバンク", p:"airisshu banku"} },
    def:{ fr:"Une butte étroite dont on touche le sommet : le cheval saute dessus, se ramasse en un temps, et ressaute aussitôt de l'autre côté. Héritée de la chasse irlandaise, où les talus séparent les champs. Deux sauts en un, et une leçon d'équilibre.",
          en:"A narrow bank the horse actually touches: he jumps onto the top, gathers himself in one beat, and jumps straight off the far side. Inherited from Irish hunting country, where banks divide the fields. Two jumps in one, and a lesson in balance.",
          es:"Un banco estrecho cuya cima se toca: el caballo salta encima, se recoge en un tiempo y vuelve a saltar al otro lado. Heredado de la caza irlandesa, donde los taludes separan los campos. Dos saltos en uno, y una lección de equilibrio.",
          it:"Una banchina stretta di cui si tocca la cima: il cavallo ci salta sopra, si raccoglie in un tempo e risalta subito dall'altra parte. Ereditata dalla caccia irlandese, dove i terrapieni dividono i campi. Due salti in uno, e una lezione di equilibrio.",
          de:"Eine schmale Bank, deren Krone berührt wird: das Pferd springt hinauf, sammelt sich in einem Takt und springt sofort auf der anderen Seite ab. Ein Erbe der irischen Jagd, wo Wälle die Felder trennen. Zwei Sprünge in einem — und eine Lektion in Balance.",
          ja:"頂上に一度触れる細いバンク。馬は上に跳び乗り、一拍で体勢を整え、すぐ向こう側へ跳び降りる。畑を土手が仕切るアイルランドの狩猟の伝統から来た。一つで二つの跳躍、そして釣り合いの教え。" } },

  /* ---------- les obstacles du derby ---------- */

  { ref:"fixe", lecon:1, coll:"derby",
    mots:{ fr:{m:"l'obstacle fixe"}, en:{m:"a permanent fence", p:"peur-ma-nènt fènss"},
           es:{m:"el obstáculo fijo"}, it:{m:"l'ostacolo fisso"},
           de:{m:"das feste Hindernis", p:"fès-te hin-deur-niss"},
           ja:{m:"固定障害", p:"kotei shōgai"} },
    def:{ fr:"Un obstacle qui ne tombe pas : bâti dans le terrain, il est là toute l'année et le sera encore dans vingt ans. Il ne pardonne pas la barre touchée — alors on le saute autrement : plus rond, plus juste, avec du respect. C'est lui qui donne au derby son sérieux.",
          en:"A fence that does not fall: built into the ground, there all year and still there in twenty years. It does not forgive a tapped rail — so you jump it differently: rounder, truer, with respect. It is what gives a derby its seriousness.",
          es:"Un obstáculo que no cae: construido en el terreno, está ahí todo el año y seguirá en veinte. No perdona la barra tocada — así que se salta de otra manera: más redondo, más justo, con respeto. Es lo que da al derby su seriedad.",
          it:"Un ostacolo che non cade: costruito nel terreno, c'è tutto l'anno e ci sarà ancora fra vent'anni. Non perdona la barriera toccata — quindi lo si salta diversamente: più rotondo, più giusto, con rispetto. È lui a dare serietà al derby.",
          de:"Ein Hindernis, das nicht fällt: ins Gelände gebaut, das ganze Jahr da und in zwanzig Jahren noch. Es verzeiht keine berührte Stange — also springt man es anders: runder, ehrlicher, mit Respekt. Es gibt dem Derby seinen Ernst.",
          ja:"落ちない障害。地面に築かれ、一年中そこにあり、二十年後もそこにある。バーへの接触を許さない。だから跳び方が変わる。より丸く、より正確に、敬意をもって。ダービーに重みを与えるのはこの障害だ。" } },

  { ref:"naturel", lecon:1, coll:"derby",
    mots:{ fr:{m:"l'obstacle naturel"}, en:{m:"a natural fence", p:"na-tcheu-rol fènss"},
           es:{m:"el obstáculo natural"}, it:{m:"l'ostacolo naturale"},
           de:{m:"das Naturhindernis", p:"na-tour-hin-deur-niss"},
           ja:{m:"自然障害", p:"shizen shōgai"} },
    def:{ fr:"Fait de ce que le terrain offre : la terre, l'eau, le bois vivant, la pente. Le cheval le lit autrement qu'un obstacle de couleur — il le comprend d'instinct, parce que c'est le monde pour lequel il est fait. Le derby en est plein, et c'est ce qui lui donne son goût de dehors.",
          en:"Made of what the land offers: earth, water, living wood, slope. A horse reads it differently from a painted fence — he understands it by instinct, because it is the world he was made for. A derby is full of them, and that is what gives it its taste of the outdoors.",
          es:"Hecho de lo que ofrece el terreno: tierra, agua, madera viva, pendiente. El caballo lo lee distinto a un obstáculo de colores — lo entiende por instinto, porque es el mundo para el que está hecho. El derby está lleno de ellos, y eso le da su sabor a campo.",
          it:"Fatto di ciò che offre il terreno: terra, acqua, legno vivo, pendenza. Il cavallo lo legge diversamente da un ostacolo colorato — lo capisce d'istinto, perché è il mondo per cui è fatto. Il derby ne è pieno, ed è questo a dargli il suo sapore di fuori.",
          de:"Gebaut aus dem, was das Gelände hergibt: Erde, Wasser, lebendes Holz, Hang. Ein Pferd liest es anders als ein buntes Hindernis — es versteht es instinktiv, weil es die Welt ist, für die es gemacht wurde. Ein Derby ist voll davon, und genau das gibt ihm seinen Geschmack von draußen.",
          ja:"土地が与えるものでできた障害。土、水、生きた木、斜面。馬は色つきの障害とは違う読み方をする。本能で理解する。それが馬の生まれついた世界だからだ。ダービーはこの障害に満ち、それが野外の味わいを与えている。" } },

  { ref:"murderby", lecon:1, coll:"derby",
    mots:{ fr:{m:"le mur du derby"}, en:{m:"the derby wall", p:"deur-bi ouol"},
           es:{m:"el muro del derby"}, it:{m:"il muro del derby"},
           de:{m:"die Derby-Mauer", p:"dèr-bi-mao-eur"},
           ja:{m:"ダービーの壁", p:"dābī no kabe"} },
    def:{ fr:"Un vrai mur, blanc et plein, sans jour entre les éléments : le cheval ne voit pas au travers, et saute donc un peu plus haut que nécessaire, par prudence. On le présente bien droit, bien au milieu — un mur pardonne encore moins qu'un fixe les abordages de biais.",
          en:"A real wall, white and solid, no daylight through it: the horse cannot see beyond, so he jumps a little bigger than he needs to, out of caution. You present it straight and dead centre — a wall forgives a crooked approach even less than a permanent fence does.",
          es:"Un muro de verdad, blanco y macizo, sin luz entre los elementos: el caballo no ve a través, así que salta un poco más alto de lo necesario, por prudencia. Se presenta recto y al centro — un muro perdona los abordajes sesgados aún menos que un fijo.",
          it:"Un muro vero, bianco e pieno, senza luce fra gli elementi: il cavallo non vede oltre, e quindi salta un po' più alto del necessario, per prudenza. Lo si presenta dritto e al centro — un muro perdona gli approcci storti ancora meno di un fisso.",
          de:"Eine echte Mauer, weiß und massiv, kein Licht dazwischen: das Pferd sieht nicht hindurch und springt darum aus Vorsicht etwas höher als nötig. Man reitet sie gerade und mittig an — eine Mauer verzeiht schiefe Anritte noch weniger als ein festes Hindernis.",
          ja:"本物の壁。白く、隙間なく積まれ、向こうが見えない。だから馬は用心して必要より少し高く跳ぶ。まっすぐ、真ん中に向ける。斜めの進入を、壁は固定障害よりさらに許さない。" } },

  { ref:"haie", lecon:1, coll:"derby",
    mots:{ fr:{m:"la haie vive"}, en:{m:"the hedge", p:"hèdj"},
           es:{m:"el seto"}, it:{m:"la siepe"},
           de:{m:"die Hecke", p:"hè-ke"}, ja:{m:"生け垣", p:"ikegaki"} },
    def:{ fr:"Un obstacle qui pousse : taillé chaque année, vivant, un peu brossant — le cheval peut le frôler du ventre sans faute. Certains cachent une barre dans le vert, d'autres non ; le cavalier ne le sait pas toujours, et c'est voulu. On saute la haie large et devant soi.",
          en:"A fence that grows: trimmed every year, alive, a little brushable — a horse may skim it with his belly at no cost. Some hide a rail in the green, some do not; the rider does not always know, and that is intended. You ride a hedge forward and in front of you.",
          es:"Un obstáculo que crece: podado cada año, vivo, algo rozable — el caballo puede rozarlo con el vientre sin falta. Algunos esconden una barra en el verde, otros no; el jinete no siempre lo sabe, y es a propósito. El seto se salta amplio y hacia delante.",
          it:"Un ostacolo che cresce: potato ogni anno, vivo, un po' sfiorabile — il cavallo può sfiorarlo col ventre senza penalità. Alcuni nascondono una barriera nel verde, altri no; il cavaliere non sempre lo sa, ed è voluto. La siepe si salta ampia e davanti a sé.",
          de:"Ein Hindernis, das wächst: jedes Jahr geschnitten, lebendig, ein wenig streifbar — das Pferd darf es mit dem Bauch touchieren, ohne Fehler. Manche verbergen eine Stange im Grün, manche nicht; der Reiter weiß es nicht immer, und das ist gewollt. Eine Hecke reitet man vorwärts und geradeaus.",
          ja:"育つ障害。毎年刈り込まれ、生きていて、少し掠っても許される。馬が腹で触れても減点はない。緑の中にバーを隠すものもあれば、ないものもある。騎手には分からないこともあり、それは意図されたことだ。生け垣は前へ、大きく跳ぶ。" } },

  { ref:"passagedeau", lecon:1, coll:"derby",
    mots:{ fr:{m:"le passage d'eau"}, en:{m:"the water splash", p:"ouo-teur splach"},
           es:{m:"el paso de agua"}, it:{m:"il passaggio d'acqua"},
           de:{m:"die Wasserdurchfahrt", p:"va-sseur-dourch-fart"},
           ja:{m:"水濠通過", p:"suigō tsūka"} },
    def:{ fr:"On n'y saute pas par-dessus : on entre DEDANS. Le cheval traverse au trot ou au galop, l'eau aux genoux, et ressort de l'autre côté. Ce qui compte est l'entrée — franche, sans regarder — parce qu'un cheval qui doute devant l'eau doute ensuite devant tout.",
          en:"You do not jump over it: you go IN. The horse crosses at trot or canter, water to his knees, and comes out the far side. What matters is the way in — bold, without staring — because a horse who doubts at water doubts at everything after.",
          es:"No se salta por encima: se entra DENTRO. El caballo cruza al trote o al galope, el agua a las rodillas, y sale por el otro lado. Lo que cuenta es la entrada — franca, sin mirar — porque un caballo que duda ante el agua luego duda ante todo.",
          it:"Non ci si salta sopra: ci si entra DENTRO. Il cavallo attraversa al trotto o al galoppo, l'acqua alle ginocchia, ed esce dall'altra parte. Ciò che conta è l'ingresso — franco, senza fissare — perché un cavallo che dubita davanti all'acqua poi dubita davanti a tutto.",
          de:"Man springt nicht darüber: man reitet HINEIN. Das Pferd durchquert im Trab oder Galopp, Wasser bis zu den Knien, und kommt drüben heraus. Was zählt, ist der Einritt — entschlossen, ohne Starren — denn ein Pferd, das am Wasser zweifelt, zweifelt danach an allem.",
          ja:"上を跳ぶのではない。中に入るのだ。馬は速歩か駈歩で、膝まで水に浸かって渡り、向こう岸へ出る。大事なのは入り方。ためらわず、覗き込まず。水の前で迷う馬は、その後すべての前で迷うからだ。" } },

  { ref:"berge", lecon:1, coll:"derby",
    mots:{ fr:{m:"la berge"}, en:{m:"the slope", p:"slôp", var:"the grass bank"},
           es:{m:"la cuesta de hierba"}, it:{m:"la scarpata"},
           de:{m:"die Böschung", p:"beu-choung"}, ja:{m:"草の斜面", p:"kusa no shamen"} },
    def:{ fr:"Les pentes d'herbe du parcours, montées et descentes, qui font du derby un terrain et non une carrière plate. On y règle son galop : plus assis dans les descentes, plus allant dans les montées. Le terrain travaille pour toi si tu le lis, contre toi si tu l'ignores.",
          en:"The grass gradients of the course, up and down, that make a derby a piece of country rather than a flat arena. You adjust your canter on them: more seated downhill, more forward uphill. The ground works for you if you read it, against you if you ignore it.",
          es:"Las cuestas de hierba del recorrido, subidas y bajadas, que hacen del derby un terreno y no una pista llana. En ellas se ajusta el galope: más sentado en las bajadas, más adelante en las subidas. El terreno trabaja a tu favor si lo lees, en tu contra si lo ignoras.",
          it:"Le pendenze erbose del percorso, salite e discese, che fanno del derby un terreno e non un campo piatto. Ci si regola il galoppo: più seduti in discesa, più avanti in salita. Il terreno lavora per te se lo leggi, contro di te se lo ignori.",
          de:"Die Grashänge des Kurses, bergauf und bergab, die ein Derby zu Gelände machen statt zu einem flachen Viereck. Dort regelt man den Galopp: sitzender bergab, vorwärtsdenkender bergauf. Der Boden arbeitet für dich, wenn du ihn liest — gegen dich, wenn du ihn ignorierst.",
          ja:"コースの草の登り降り。これがダービーを平らな馬場ではなく「地形」にする。ここで駈歩を整える。下りではより深く座り、上りではより前へ。地形を読めば味方になり、無視すれば敵になる。" } },

  /* ---------- monter un derby ---------- */

  { ref:"liredessol", lecon:1, coll:"derby", v:true,
    mots:{ fr:{m:"lire le terrain"}, en:{m:"to read the ground", p:"tou riide ze graound"},
           es:{m:"leer el terreno"}, it:{m:"leggere il terreno"},
           de:{m:"den Boden lesen", p:"dén bô-den lé-zeune"},
           ja:{m:"地面を読む", p:"jimen o yomu"} },
    def:{ fr:"Savoir, en marchant son parcours, où l'herbe est grasse, où elle est usée, où ça glisse et où ça tient. Les cavaliers de derby marchent leur tracé comme les cavaliers de cross : penchés vers le sol, à toucher l'herbe. C'est là que le parcours se gagne, avant de monter.",
          en:"Knowing, as you walk your course, where the grass is lush, where it is worn, where it slips and where it holds. Derby riders walk their track the way cross-country riders do: bent to the ground, almost touching the grass. That is where the course is won, before you ever mount.",
          es:"Saber, al andar el recorrido, dónde la hierba está fresca, dónde gastada, dónde resbala y dónde agarra. Los jinetes de derby andan su trazado como los de cross: inclinados al suelo, casi tocando la hierba. Ahí se gana el recorrido, antes de montar.",
          it:"Sapere, camminando il percorso, dove l'erba è grassa, dove è consumata, dove scivola e dove tiene. I cavalieri di derby camminano il tracciato come quelli di cross: chinati verso terra, quasi a toccare l'erba. È lì che il percorso si vince, prima di montare.",
          de:"Beim Abgehen des Parcours wissen, wo das Gras saftig ist, wo abgenutzt, wo es rutscht und wo es hält. Derby-Reiter gehen ihre Linie ab wie Geländereiter: zum Boden gebeugt, fast das Gras berührend. Dort wird der Parcours gewonnen — bevor man aufsitzt.",
          ja:"下見で歩きながら知ること。草が豊かな場所、擦り切れた場所、滑る場所、踏ん張れる場所。ダービーの騎手はクロスカントリーの騎手と同じように歩く。地面に身をかがめ、草に触れるほどに。コースは騎乗の前に、ここで勝負が決まる。" } },

  { ref:"galopderby", lecon:1, coll:"derby",
    mots:{ fr:{m:"le galop de derby"}, en:{m:"the hunting canter", p:"heun-ting kan-teur"},
           es:{m:"el galope de derby"}, it:{m:"il galoppo da derby"},
           de:{m:"der Jagdgalopp", p:"yakt-ga-lop"}, ja:{m:"ダービーの駈歩", p:"dābī no kakeashi"} },
    def:{ fr:"Un galop plus long et plus tranquille que celui d'une épreuve ordinaire : le parcours dure deux fois plus, il faut durer avec lui. Hérité de la chasse — d'où son nom anglais — il couvre du terrain sans brûler le cheval. On le règle une fois au départ, et on n'y touche plus.",
          en:"A longer, quieter canter than an ordinary round asks for: the course lasts twice as long, and you must last with it. Inherited from the hunting field — hence its name — it covers ground without burning the horse. You set it once at the start, then leave it alone.",
          es:"Un galope más largo y más tranquilo que el de una prueba normal: el recorrido dura el doble, y hay que durar con él. Heredado de la caza — de ahí su nombre inglés — cubre terreno sin quemar al caballo. Se ajusta una vez al salir, y no se toca más.",
          it:"Un galoppo più lungo e più tranquillo di quello di una prova normale: il percorso dura il doppio, e bisogna durare con lui. Ereditato dalla caccia — da cui il nome inglese — copre terreno senza bruciare il cavallo. Lo si regola una volta alla partenza, e non lo si tocca più.",
          de:"Ein längerer, ruhigerer Galopp, als eine gewöhnliche Prüfung verlangt: der Kurs dauert doppelt so lang, und man muss mit ihm durchhalten. Aus der Jagd ererbt — daher der Name — deckt er Boden ab, ohne das Pferd zu verbrennen. Man stellt ihn am Start einmal ein und lässt ihn dann in Ruhe.",
          ja:"通常の競技より長く、静かな駈歩。コースは二倍の長さがあり、最後までもたせなければならない。狩猟から受け継がれ（英名の由来）、馬を消耗させずに距離を稼ぐ。スタートで一度整えたら、あとは触らない。" } },

  { ref:"equilibredescente", lecon:1, coll:"derby",
    mots:{ fr:{m:"l'équilibre en descente"}, en:{m:"downhill balance", p:"daoun-hil ba-lènss"},
           es:{m:"el equilibrio en bajada"}, it:{m:"l'equilibrio in discesa"},
           de:{m:"das Gleichgewicht bergab", p:"glaïch-gué-vicht bèrk-ap"},
           ja:{m:"下りのバランス", p:"kudari no baransu"} },
    def:{ fr:"Buste en arrière, jambes descendues, mains basses qui laissent l'encolure jouer : le cavalier s'efface pour que le cheval retrouve son propre équilibre dans la pente. Toute la banque tient dans ce mot. On ne retient pas un cheval qui descend — on le laisse s'organiser.",
          en:"Upper body back, legs long, hands low and letting the neck work: the rider gets out of the way so the horse can find his own balance on the slope. The whole bank lives inside this word. You do not hold a horse going downhill — you let him organise himself.",
          es:"Busto atrás, piernas largas, manos bajas que dejan jugar el cuello: el jinete se aparta para que el caballo encuentre su propio equilibrio en la pendiente. Todo el banco cabe en esta palabra. No se sujeta a un caballo que baja — se le deja organizarse.",
          it:"Busto indietro, gambe lunghe, mani basse che lasciano lavorare l'incollatura: il cavaliere si fa da parte perché il cavallo ritrovi il proprio equilibrio nella discesa. Tutta la banchina sta in questa parola. Non si trattiene un cavallo che scende — lo si lascia organizzarsi.",
          de:"Oberkörper zurück, Beine lang, Hände tief, damit der Hals arbeiten kann: der Reiter nimmt sich zurück, damit das Pferd am Hang sein eigenes Gleichgewicht findet. Der ganze Wall steckt in diesem Wort. Ein Pferd bergab hält man nicht fest — man lässt es sich ordnen.",
          ja:"上体は後ろ、脚は長く、手は低く、首の動きを許す。騎手は身を引き、馬が斜面で自分のバランスを取り戻せるようにする。バンクのすべてはこの言葉の中にある。下る馬を抑えてはいけない。馬自身に整えさせるのだ。" } },

  { ref:"laisserfaire", lecon:1, coll:"derby", v:true,
    mots:{ fr:{m:"laisser faire le cheval"}, en:{m:"to leave the horse alone", p:"tou liive a-lône"},
           es:{m:"dejar hacer al caballo"}, it:{m:"lasciar fare al cavallo"},
           de:{m:"das Pferd machen lassen", p:"ma-cheune la-sseune"},
           ja:{m:"馬に任せる", p:"uma ni makaseru"} },
    def:{ fr:"La grande leçon du derby, et la plus dure pour un cavalier de carrière : devant la banque, l'eau, la butte, le cheval sait mieux que toi. On amène droit, dans le bon galop — et puis on ne fait plus rien. Les fautes de derby sont presque toutes des fautes de cavalier qui a trop fait.",
          en:"The great derby lesson, and the hardest for an arena rider: at the bank, the water, the mound, the horse knows better than you. You bring him straight, in the right canter — and then you do nothing. Derby faults are nearly all faults of a rider who did too much.",
          es:"La gran lección del derby, y la más dura para un jinete de pista: ante el banco, el agua, el montículo, el caballo sabe más que tú. Se llega recto, en el galope justo — y luego no se hace nada. Las faltas de derby son casi todas de jinetes que hicieron demasiado.",
          it:"La grande lezione del derby, e la più dura per un cavaliere da campo: davanti alla banchina, all'acqua, al rialzo, il cavallo ne sa più di te. Lo si porta dritto, nel galoppo giusto — e poi non si fa più niente. Gli errori da derby sono quasi tutti di cavalieri che hanno fatto troppo.",
          de:"Die große Derby-Lektion, und die schwerste für einen Platzreiter: vor Wall, Wasser und Bank weiß das Pferd es besser als du. Man bringt es gerade hin, im richtigen Galopp — und dann tut man nichts mehr. Derby-Fehler sind fast immer Fehler eines Reiters, der zu viel getan hat.",
          ja:"ダービー最大の教えであり、馬場の騎手には最も難しい教え。バンクの前で、水の前で、丘の前で、馬はあなたより分かっている。まっすぐ、正しい駈歩で連れて行く。そして何もしない。ダービーの失敗のほとんどは、やりすぎた騎手の失敗である。" } },

  { ref:"appelmontee", lecon:1, coll:"derby",
    mots:{ fr:{m:"l'appel en montée"}, en:{m:"an uphill take-off", p:"eup-hil téïk-of"},
           es:{m:"la batida en subida"}, it:{m:"lo stacco in salita"},
           de:{m:"der Absprung bergauf", p:"ap-chproung bèrk-aof"},
           ja:{m:"上りの踏み切り", p:"nobori no fumikiri"} },
    def:{ fr:"Sauter un obstacle posé dans une montée : le cheval a besoin de plus d'élan, parce que la pente lui a déjà pris une partie de sa force. On arrive avec du galop en réserve, jambes présentes, et on ne se jette pas en avant à l'appel — la montée s'en charge.",
          en:"Jumping a fence set on rising ground: the horse needs more engine, because the slope has already taken part of his power. You arrive with canter in reserve, legs on, and you do not throw yourself forward at take-off — the hill does that for you.",
          es:"Saltar un obstáculo colocado en subida: el caballo necesita más impulso, porque la cuesta ya le ha quitado parte de su fuerza. Se llega con galope de reserva, piernas presentes, y no hay que lanzarse adelante en la batida — la subida ya se encarga.",
          it:"Saltare un ostacolo posto in salita: il cavallo ha bisogno di più slancio, perché la pendenza gli ha già preso parte della forza. Si arriva con galoppo di riserva, gambe presenti, e non ci si butta in avanti allo stacco — ci pensa la salita.",
          de:"Ein Hindernis am ansteigenden Boden springen: das Pferd braucht mehr Schub, weil der Hang ihm schon einen Teil seiner Kraft genommen hat. Man kommt mit Galopp in Reserve an, Beine dran, und wirft sich beim Absprung nicht nach vorn — das erledigt der Hang.",
          ja:"上り坂に置かれた障害を跳ぶこと。斜面がすでに力の一部を奪っているため、馬にはより多くの推進力が要る。駈歩に余力を残して到達し、脚を添え、踏み切りで前へ身を投げない。それは坂がやってくれる。" } },

  { ref:"foulecolline", lecon:1, coll:"derby",
    mots:{ fr:{m:"la foule sur la colline"}, en:{m:"the crowd on the hill", p:"kraoud on ze hil"},
           es:{m:"el público en la colina"}, it:{m:"la folla sulla collina"},
           de:{m:"die Menge am Hang", p:"mèn-gue am hang"},
           ja:{m:"丘の観衆", p:"oka no kanshū"} },
    def:{ fr:"Le derby se regarde allongé dans l'herbe, en famille, avec un panier : la foule couvre la colline qui domine le parcours, et son murmure monte quand un cheval aborde la banque. Un jeune cheval l'entend ; un cavalier de derby apprend à monter dedans.",
          en:"A derby is watched lying on the grass, families and picnic baskets: the crowd covers the hill above the course, and its murmur rises when a horse turns to the bank. A young horse hears it; a derby rider learns to ride inside it.",
          es:"El derby se mira tumbado en la hierba, en familia, con cesta: el público cubre la colina que domina el recorrido, y su murmullo sube cuando un caballo aborda el banco. Un caballo joven lo oye; un jinete de derby aprende a montar dentro de él.",
          it:"Il derby si guarda sdraiati sull'erba, in famiglia, col cestino: la folla copre la collina che domina il percorso, e il suo mormorio sale quando un cavallo affronta la banchina. Un cavallo giovane lo sente; un cavaliere da derby impara a montarci dentro.",
          de:"Ein Derby schaut man im Gras liegend, mit Familie und Picknickkorb: die Menge bedeckt den Hang über dem Kurs, und ihr Raunen schwillt an, wenn ein Pferd zum Wall abbiegt. Ein junges Pferd hört es; ein Derby-Reiter lernt, darin zu reiten.",
          ja:"ダービーは草の上に寝転んで、家族と、バスケットを持って観るもの。観衆はコースを見下ろす丘を覆い、馬がバンクに向かうとどよめきが上がる。若い馬はそれを聞く。ダービーの騎手は、その中で乗ることを学ぶ。" } },

  { ref:"veteran", lecon:1, coll:"derby",
    mots:{ fr:{m:"le cheval de derby"}, en:{m:"a derby horse", p:"deur-bi horss"},
           es:{m:"el caballo de derby"}, it:{m:"il cavallo da derby"},
           de:{m:"das Derby-Pferd", p:"dèr-bi-pfèrt"}, ja:{m:"ダービーホース", p:"dābī hōsu"} },
    def:{ fr:"Un spécialiste, souvent plus très jeune, qui revient chaque année et connaît la banque mieux que son cavalier. Les mêmes chevaux gagnent le derby des années de suite — parce qu'ici l'expérience compte plus que le brillant. C'est l'épreuve où les vieux sages battent les jeunes talents.",
          en:"A specialist, often no longer young, who comes back every year and knows the bank better than his rider. The same horses win derbies for years running — because here experience counts for more than brilliance. It is the class where the wise old ones beat the young stars.",
          es:"Un especialista, a menudo ya no tan joven, que vuelve cada año y conoce el banco mejor que su jinete. Los mismos caballos ganan el derby años seguidos — porque aquí la experiencia cuenta más que el brillo. Es la prueba donde los viejos sabios ganan a los jóvenes talentos.",
          it:"Uno specialista, spesso non più giovanissimo, che torna ogni anno e conosce la banchina meglio del suo cavaliere. Gli stessi cavalli vincono il derby per anni di fila — perché qui l'esperienza conta più della brillantezza. È la prova dove i vecchi saggi battono i giovani talenti.",
          de:"Ein Spezialist, oft nicht mehr jung, der jedes Jahr wiederkommt und den Wall besser kennt als sein Reiter. Dieselben Pferde gewinnen das Derby jahrelang hintereinander — weil hier Erfahrung mehr zählt als Glanz. Es ist die Prüfung, in der die weisen Alten die jungen Talente schlagen.",
          ja:"スペシャリスト。もう若くないことも多く、毎年戻ってきて、騎手よりもバンクを知っている。同じ馬が何年も続けてダービーを勝つ。ここでは輝きより経験がものを言うからだ。老練が若い才能を打ち負かす競技である。" } },

  { ref:"tourdhonneurderby", lecon:1, coll:"derby",
    mots:{ fr:{m:"le retour à la banque"}, en:{m:"the lap of honour", p:"lap ov o-neur"},
           es:{m:"la vuelta de honor"}, it:{m:"il giro d'onore"},
           de:{m:"die Ehrenrunde", p:"é-rène-roun-de"},
           ja:{m:"ウイニングラン", p:"uiningu ran"} },
    def:{ fr:"Le vainqueur d'un derby refait un tour au galop devant la colline — et par tradition, il salue en repassant au pied de la banque, là où tout s'est joué. La foule se lève pour un cheval qu'elle a vu descendre la pente sans une hésitation. C'est le plus beau tour d'honneur du saut.",
          en:"A derby winner canters one more lap before the hill — and by tradition salutes as he passes the foot of the bank, where everything was decided. The crowd rises for a horse they watched come down that face without one hesitation. It is jumping's finest lap of honour.",
          es:"El ganador de un derby da una vuelta más al galope ante la colina — y por tradición saluda al pasar al pie del banco, donde todo se decidió. El público se levanta por un caballo al que vio bajar la pendiente sin una vacilación. Es la vuelta de honor más bella del salto.",
          it:"Il vincitore di un derby fa un altro giro al galoppo davanti alla collina — e per tradizione saluta ripassando ai piedi della banchina, dove tutto si è deciso. La folla si alza per un cavallo che ha visto scendere quella parete senza un'esitazione. È il più bel giro d'onore del salto ostacoli.",
          de:"Der Sieger eines Derbys galoppiert noch eine Runde vor dem Hang — und grüßt nach alter Sitte am Fuß des Walls, wo sich alles entschied. Die Menge erhebt sich für ein Pferd, das sie diese Wand ohne ein Zögern hat herunterkommen sehen. Es ist die schönste Ehrenrunde des Springsports.",
          ja:"ダービーの勝者は丘の前をもう一周駈歩で回る。そして伝統として、すべてが決まったバンクの足元で敬礼する。あの斜面を一度のためらいもなく降りた馬のために、観衆は立ち上がる。障害飛越で最も美しいウイニングランである。" } }

  ],

  /* 10 phrases · règle des 7 mots · FORMAT À PLAT.
     `rappel:[refA,refB]` marque une phrase de RÉVISION qui teste DEUX mots
     (décision de Blandine, 11/08) : le quota du moteur les comptera pour
     deux. */
  phrases: [

  { lecon:1, fr:"Assieds-toi, elle descend toute seule.",
             en:"Sit back, she comes down by herself.",
             es:"Siéntate atrás, ella baja sola.",
             it:"Siediti indietro, scende da sola.",
             de:"Setz dich zurück, sie kommt allein hinunter.",
             ja:"深く座って。馬は自分で降りる。" },

  { lecon:1, fr:"Entre dans l'eau sans la regarder.",
             en:"Go into the water without staring at it.",
             es:"Entra en el agua sin mirarla.",
             it:"Entra nell'acqua senza fissarla.",
             de:"Reite ins Wasser, ohne hinzustarren.",
             ja:"水を見つめずに、中へ入る。" },

  { lecon:1, fr:"Le mur, bien droit, bien au milieu.",
             en:"The wall: dead straight, dead centre.",
             es:"El muro: recto y al centro.",
             it:"Il muro: dritto e al centro.",
             de:"Die Mauer: ganz gerade, genau mittig.",
             ja:"壁はまっすぐ、真ん中に。" },

  { lecon:1, rappel:["banque","equilibredescente"],
             fr:"Sur la banque, garde ton équilibre en arrière.",
             en:"On the bank, keep your balance back.",
             es:"En el banco, guarda tu equilibrio atrás.",
             it:"Sulla banchina, tieni l'equilibrio indietro.",
             de:"Auf dem Wall das Gleichgewicht nach hinten halten.",
             ja:"バンクではバランスを後ろに保つ。" },

  { lecon:1, rappel:["galopderby","liredessol"],
             fr:"Règle ton galop et lis ton terrain.",
             en:"Set your canter and read your ground.",
             es:"Ajusta tu galope y lee tu terreno.",
             it:"Regola il galoppo e leggi il terreno.",
             de:"Stell deinen Galopp ein und lies den Boden.",
             ja:"駈歩を整え、地面を読む。" },

  { lecon:1, rappel:["naturel","laisserfaire"],
             fr:"Devant le naturel, laisse faire ton cheval.",
             en:"At the natural fence, leave your horse alone.",
             es:"Ante el natural, deja hacer a tu caballo.",
             it:"Davanti al naturale, lascia fare al cavallo.",
             de:"Am Naturhindernis lass dein Pferd machen.",
             ja:"自然障害の前では、馬に任せる。" },

  { lecon:1, fr:"La haie se saute large et devant soi.",
             en:"Ride the hedge big and in front of you.",
             es:"El seto se salta amplio y hacia delante.",
             it:"La siepe si salta ampia e davanti a sé.",
             de:"Die Hecke groß und geradeaus springen.",
             ja:"生け垣は大きく、前へ跳ぶ。" },

  { lecon:1, rappel:["fixe","appelmontee"],
             fr:"Un fixe en montée : garde du galop en réserve.",
             en:"A permanent fence uphill: keep canter in reserve.",
             es:"Un fijo en subida: guarda galope de reserva.",
             it:"Un fisso in salita: tieni galoppo di riserva.",
             de:"Festes Hindernis bergauf: Galopp in Reserve halten.",
             ja:"上りの固定障害。駈歩に余力を残す。" },

  { lecon:1, fr:"La butte irlandaise, c'est deux sauts en un.",
             en:"The Irish bank is two jumps in one.",
             es:"El banco irlandés son dos saltos en uno.",
             it:"La banchina irlandese è due salti in uno.",
             de:"Die irische Bank ist zwei Sprünge in einem.",
             ja:"アイリッシュバンクは一つで二つの跳躍。" },

  { lecon:1, fr:"Ici, les vieux sages battent les jeunes talents.",
             en:"Here, the wise old ones beat the young stars.",
             es:"Aquí, los viejos sabios ganan a los jóvenes talentos.",
             it:"Qui i vecchi saggi battono i giovani talenti.",
             de:"Hier schlagen die weisen Alten die jungen Talente.",
             ja:"ここでは老練が若い才能を打ち負かす。" }

  ]
};
