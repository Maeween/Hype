/* hype-lingo-lex-badminton.js — Hype Lingo · Chapitre « Le concours »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-concours.js, leçon 2
   — AUCUNE définition, AUCUNE phrase modifiée. Le nom de la clé de
   chapitre change : `concours` devient `badminton`. Le dialogue
   `dialogue` est conservé sous le même nom (un seul dialogue ici).

   🟥 18/08 : CINQ CONCEPTS REJOIGNENT BADMINTON DEPUIS LA LEÇON 3
   ORPHELINE (« le jour J »), sur décision de Blandine : `speaker`,
   `appel`, `resultat`, `remise-prix`, `groom`. Les deux phrases qui
   les emploient (`tu-passes`, `resultats-ou`) suivent avec eux — elles
   utilisent littéralement ces mots. `trac`, `van`, `embarquer` et
   `tableau` restent en réserve, sans ville, dans
   `hype-lingo-lex-concours-reserve.js`.

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE.

   CONTENU : leçon 2 (16 concepts, dont `formats-complet` qui nomme
   Badminton dans sa définition) + les 5 concepts déplacés = 21 mots.

   Les leçons 1 (Oliva), 3 (réserve) et 4 (Rome) sont déplacées
   séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.badminton = {
  ref: "badminton",
  titre: { fr:"Le concours", en:"The show", es:"El concurso", it:"Il concorso", de:"Das Turnier", ja:"競技会" },
  lecons: 1,

  concepts: [

  { ref:"concours-complet", lecon:2, coll:"complet",
    mots:{ fr:{m:"le concours complet"}, en:{m:"eventing", p:"i-vèn-ting", var:"horse trials · three-day event"},
           es:{m:"el concurso completo"}, it:{m:"il completo"},
           de:{m:"die Vielseitigkeit", p:"fil-zaï-tirh-kaïte"}, ja:{m:"総合馬術", p:"sōgō bajutsu"} },
    def:{ fr:"Trois tests, un cheval, un cavalier : dressage, cross, obstacle. ⚠️ Aucun mot commun entre les langues. L'anglais dit **eventing**, l'allemand « la polyvalence », le japonais « l'art équestre complet ». Traduire « complete competition » ne sera pas compris.",
          en:"Three tests, one horse, one rider. No shared word: English says eventing, German « versatility », Japanese « complete equestrian art ».",
          es:"Tres tests, un caballo, un jinete: doma, cross, salto. ⚠️ Ninguna palabra común entre lenguas. El inglés dice **eventing**, el alemán « la polivalencia », el japonés « el arte ecuestre completo ». Traducir « complete competition » no será entendido.",
          it:"Tre test, un cavallo, un cavaliere: dressage, cross, salto. ⚠️ Nessuna parola comune tra le lingue. L'inglese dice **eventing**, il tedesco « la versatilità », il giapponese « l'arte equestre completa ». Tradurre « complete competition » non sarà capito.",
          de:"Drei Teilprüfungen, ein Pferd, ein Reiter: Dressur, Gelände, Springen. ⚠️ Kein gemeinsames Wort: Englisch **eventing**, Deutsch die Vielseitigkeit, Japanisch « die vollständige Reitkunst ». « Complete competition » versteht niemand.",
          ja:"三つの競技、一頭の馬、ひとりの騎手 — 馬場、クロス、障害。⚠️ 言語間に共通語はありません。英語は **eventing**、ドイツ語は「多才さ」、日本語は「総合馬術」。« complete competition » と直訳しても通じません。" } },

  { ref:"cross", lecon:2, coll:"complet",
    mots:{ fr:{m:"le cross"}, en:{m:"the cross-country", p:"kross-keune-tri", var:"XC"},
           es:{m:"el cross"}, it:{m:"il cross"},
           de:{m:"das Gelände", p:"gue-lèn-de"}, ja:{m:"クロスカントリー", p:"kurosu kantorī"} },
    def:{ fr:"Le test de fond, sur obstacles fixes en terrain naturel. ⚠️ L'allemand est le seul à ne rien emprunter : **das Gelände**, « le terrain ». Et les Britanniques abrègent tout en **XC**, y compris à l'écrit sur les horaires.",
          en:"The endurance test, over fixed fences in open country. German borrows nothing: das Gelände, « the terrain ». The British write it XC.",
          es:"El test de fondo, sobre obstáculos fijos en terreno natural. ⚠️ El alemán es el único que no toma nada prestado: **das Gelände**, « el terreno ». Y los británicos lo abrevian todo en **XC**, incluso por escrito en los horarios.",
          it:"Il test di fondo, su ostacoli fissi in terreno naturale. ⚠️ Il tedesco è l'unico a non prendere in prestito nulla: **das Gelände**, « il terreno ». E i britannici abbreviano tutto in **XC**, anche per iscritto sugli orari.",
          de:"Die Ausdauerprüfung über feste Hindernisse im Gelände. ⚠️ Nur das Deutsche entlehnt nichts: das Gelände. Und die Briten kürzen alles zu **XC** — auch schriftlich im Zeitplan.",
          ja:"自然の地形に置かれた固定障害を跳ぶ、持久力の競技。⚠️ 何も借用しないのはドイツ語だけです — **das Gelände**、「地形」。そしてイギリス人はすべてを **XC** と略します。時間割の表記までも。" } },

  { ref:"trot-presentation", lecon:2, coll:"complet",
    mots:{ fr:{m:"le trot de présentation"}, en:{m:"the trot-up", p:"trot-eup", var:"the horse inspection"},
           es:{m:"la inspección veterinaria"}, it:{m:"l'ispezione veterinaria"},
           de:{m:"die Verfassungsprüfung", p:"fèr-fa-soungs-pru-foung"}, ja:{m:"馬体検査", p:"batai kensa"} }, // ??
    def:{ fr:"Le cheval présenté en main devant un jury vétérinaire, tressé et lustré, qui vérifie qu'il est apte à concourir. On le fait avant le concours et, en complet international, encore le matin de l'obstacle.",
          en:"The horse shown in hand to a veterinary panel, plaited and gleaming, to check it is fit to compete.",
          es:"El caballo presentado de la mano ante un jurado veterinario, trenzado y lustrado, que verifica que está apto para competir. Se hace antes del concurso y, en completo internacional, otra vez la mañana del salto.",
          it:"Il cavallo presentato a mano davanti a una giuria veterinaria, intrecciato e lucidato, che verifica che sia idoneo a gareggiare. Si fa prima del concorso e, nel completo internazionale, ancora la mattina del salto.",
          de:"Das Pferd wird an der Hand einer Verfassungsprüfung vorgeführt, eingeflochten und glänzend — sie prüft die Startfähigkeit. Vor dem Turnier, im internationalen Complet noch einmal am Morgen des Springens.",
          ja:"獣医審査団の前で、編み込みと磨き上げを施した馬を引いて見せ、出場に適うかを確かめる検査。大会前に行い、国際総合馬術では障害の日の朝にもう一度行います。" } },

  { ref:"obstacle-fixe", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'obstacle fixe"}, en:{m:"a fixed fence", p:"fikst fènce", var:"solid fence"},
           es:{m:"el obstáculo fijo"}, it:{m:"l'ostacolo fisso"},
           de:{m:"das feste Hindernis", p:"fès-te hin-deur-niss"}, ja:{m:"固定障害", p:"kotei shōgai"} }, // ??
    def:{ fr:"Il ne tombe pas. C'est toute la différence avec l'obstacle de concours hippique, et c'est la raison pour laquelle le gilet de protection et le casque aux normes sont obligatoires au cross, partout.",
          en:"It does not fall. That is the whole difference from show jumping, and why a body protector and a standard-approved hat are compulsory.",
          es:"No cae. Esa es toda la diferencia con el obstáculo de salto, y la razón por la que el chaleco de protección y el casco homologado son obligatorios en el cross, en todas partes.",
          it:"Non cade. È tutta la differenza con l'ostacolo di salto ostacoli, ed è la ragione per cui il gilet di protezione e il casco a norma sono obbligatori in cross, ovunque.",
          de:"Es fällt nicht. Das ist der ganze Unterschied zum Springhindernis — und der Grund, warum Schutzweste und geprüfter Helm im Gelände überall Pflicht sind.",
          ja:"倒れない障害。障害馬術の障害との違いはそこにあり、クロスでプロテクターベストと規格ヘルメットが世界じゅう義務である理由もそこにあります。" } },

  { ref:"option", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'option"}, en:{m:"the long route", p:"long route", var:"the alternative"},
           es:{m:"la opción"}, it:{m:"l'opzione"},
           de:{m:"der Umweg", p:"oum-vék", var:"der Alternativweg"}, ja:{m:"迂回ルート", p:"ukai rūto"} }, /* de precise (rapport 07/08) */
    def:{ fr:"Le chemin plus long et plus sûr, autorisé sur les combinaisons de cross. Prendre l'option coûte des secondes, jamais de pénalités — et un cavalier expérimenté la choisit sans hésiter quand son cheval doute.",
          en:"The longer, safer way through a cross-country combination. It costs seconds, never penalties.",
          es:"El camino más largo y más seguro, autorizado en las combinaciones de cross. Tomar la opción cuesta segundos, jamás penalizaciones — y un jinete experimentado la elige sin dudar cuando su caballo duda.",
          it:"La strada più lunga e più sicura, autorizzata sulle combinazioni di cross. Prendere l'opzione costa secondi, mai penalità — e un cavaliere esperto la sceglie senza esitare quando il suo cavallo dubita.",
          de:"Der längere, sicherere Weg, an Geländekombinationen erlaubt. Die Option kostet Sekunden, nie Strafpunkte — und ein erfahrener Reiter wählt sie ohne Zögern, wenn sein Pferd zweifelt.",
          ja:"クロスの連続障害で認められている、遠回りで安全な経路。選べば失うのは秒数だけで、減点は決してありません — そして経験ある騎手は、馬が迷った瞬間、ためらわずこちらを選びます。" } },

  { ref:"temps-optimum", lecon:2, coll:"complet",
    mots:{ fr:{m:"le temps optimum"}, en:{m:"the optimum time", p:"op-ti-meum taïm"},
           es:{m:"el tiempo óptimo"}, it:{m:"il tempo ottimale"},
           de:{m:"die Idealzeit", p:"i-dé-al-tsaïte"}, ja:{m:"規定タイム", p:"kitei taimu"} }, // ??
    def:{ fr:"Le temps de référence du cross, calculé sur la distance et la vitesse imposée. Au-delà, on prend des pénalités seconde par seconde. Ce n'est donc pas une course : c'est un exercice de régularité, chronomètre au poignet.",
          en:"The reference time for cross-country, from distance and required speed. Beyond it, penalties accrue per second — so it is regularity, not racing.",
          es:"El tiempo de referencia del cross, calculado sobre distancia y velocidad impuesta. Más allá, se toman penalizaciones segundo a segundo. No es pues una carrera: es un ejercicio de regularidad, cronómetro en la muñeca.",
          it:"Il tempo di riferimento del cross, calcolato su distanza e velocità imposta. Oltre, si prendono penalità secondo per secondo. Non è dunque una corsa: è un esercizio di regolarità, cronometro al polso.",
          de:"Die Referenzzeit des Geländes, aus Distanz und vorgegebenem Tempo errechnet. Darüber gibt es Strafpunkte Sekunde für Sekunde. Kein Rennen also — eine Übung in Gleichmaß, mit der Uhr am Handgelenk.",
          ja:"距離と規定速度から計算される、クロスの基準タイム。超えれば一秒ごとに減点。つまり競走ではなく、腕時計を頼りに刻む、一定さの試験なのです。" } },

  /* ================================================================
     QUATRE ENTRÉES POUR BADMINTON — 17/08/2026, demandées par Blandine
     après le départ du talus, du contre-bas et du gué vers Burghley :
     « on va en rajouter à Badminton alors — reprise de dressage
     justement ? parcours d'obstacle ? quel est le barème sur le
     parcours d'obstacle ? protocole de dressage ? », puis
     « classement provisoire à l'issue du dressage ».

     🟥 SA CONSIGNE SUR LES DÉFINITIONS : « une bonne occasion pour
     t'apprendre tout ça à ce moment-là ». Ces définitions n'expliquent
     donc pas seulement les mots, elles enseignent LE SYSTÈME du
     complet — le seul sport où l'on additionne trois épreuves et où
     LE SCORE LE PLUS BAS GAGNE.

     ⚠️ AUCUN CHIFFRE DE BARÈME N'EST DONNÉ. Ils changent selon le
     niveau, la fédération et l'année, et Claude ne les connaît pas avec
     certitude. Consigne de Blandine, après trois fautes de fond sur
     Windsor : « invente surtout pas des trucs ». Les phrases POSENT la
     question du barème ; elles n'y répondent pas.
     ⚠️ NE PAS ajouter de chiffres sans source vérifiée.
     ================================================================ */

  { ref:"reprise-dressage", lecon:2, coll:"complet",
    mots:{ fr:{m:"la reprise de dressage"}, en:{m:"the dressage test", p:"drè-sadj tèst"},
           es:{m:"la prueba de doma"}, it:{m:"la ripresa di dressage"},
           de:{m:"die Dressurprüfung", p:"drè-sour-pru-foung"}, ja:{m:"馬場馬術の課目", p:"bababajutsu no kamoku"} },
    def:{ fr:"La PREMIÈRE des trois épreuves du complet, et celle qui donne le score de départ. 🟥 Elle ne se note pas en points gagnés mais CONVERTIE EN PÉNALITÉS : mieux on la fait, moins on en a. C'est ce qui déroute tout le monde au début — au complet, on cherche le score le plus BAS. ⚠️ « La reprise » ici désigne l'ÉPREUVE ; à Windsor le même mot désigne le protocole, et à Aberystwyth le groupe d'élèves. Trois sens, un mot.",
          en:"The first of the three phases, and the one that sets your starting score. It isn't marked in points won but CONVERTED INTO PENALTIES: the better you go, the fewer you carry. In eventing you want the LOWEST score.",
          es:"La primera de las tres pruebas, y la que fija la puntuación de partida. No se anota en puntos ganados sino CONVERTIDA EN PENALIZACIONES: cuanto mejor, menos se arrastra.",
          it:"La prima delle tre prove, quella che fissa il punteggio di partenza. Non si segna in punti guadagnati ma CONVERTITA IN PENALITÀ: meglio si fa, meno se ne porta.",
          de:"Die erste der drei Teilprüfungen, und die, die den Startwert festlegt. Sie wird nicht in Gewinnpunkten gewertet, sondern IN STRAFPUNKTE UMGERECHNET: je besser, desto weniger.",
          ja:"三つの競技の最初で、出発点の得点を決めます。得点ではなく減点に換算されるため、良く走れば減点が少なくなります。総合馬術では最も低い点が勝ちます。" } },

  { ref:"parcours-obstacle", lecon:2, coll:"complet",
    mots:{ fr:{m:"le parcours d'obstacle"}, en:{m:"the showjumping round", p:"chô-djeum-pinng raound", var:"the showjumping"},
           es:{m:"el recorrido de salto"}, it:{m:"il percorso di salto ostacoli"},
           de:{m:"das Springen", p:"chprin-gueune"}, ja:{m:"障害飛越の走行", p:"shōgai hietsu no sōkō"} },
    def:{ fr:"⚠️ LA DERNIÈRE ÉPREUVE, et c'est voulu : elle se court après le cross, sur un cheval fatigué, et c'est là que les classements se retournent. ⚠️ En anglais on dit **showjumping** en un mot pour la discipline, jamais « obstacle » — et au complet on dit souvent simplement *the jumping*.",
          en:"The last phase, and deliberately so: it's ridden after the cross-country, on a tired horse, and that's where placings turn over. « Showjumping » is one word; in eventing you often just say « the jumping ».",
          es:"La última prueba, y a propósito: se corre después del cross, con un caballo cansado. Ahí se dan la vuelta las clasificaciones.",
          it:"L'ultima prova, e volutamente: si corre dopo il cross, su un cavallo stanco. È lì che le classifiche si ribaltano.",
          de:"Die letzte Teilprüfung, und das mit Absicht: sie kommt nach dem Geländeritt, auf einem müden Pferd. Dort drehen sich die Platzierungen.",
          ja:"最後の競技。これは意図的で、クロスカントリーのあと、疲れた馬で走ります。ここで順位がひっくり返ります。" } },

  { ref:"bareme", lecon:2, coll:"complet",
    mots:{ fr:{m:"le barème"}, en:{m:"the scoring", p:"skô-rinng", var:"the penalty system"},
           es:{m:"el baremo"}, it:{m:"il barème"}, // ?? it
           de:{m:"die Wertung", p:"vèr-toung"}, ja:{m:"減点方式", p:"genten hōshiki"} },
    def:{ fr:"🟥 LE MOT À SAVOIR POSER EN QUESTION, parce que la réponse change selon le niveau, le pays et l'année : « quel barème s'applique ? » est une question légitime même pour un cavalier expérimenté. ⚠️ Ce que le barème du complet a de particulier : les pénalités des trois épreuves S'ADDITIONNENT, et le total le plus bas gagne. Un sans-faute au cross ne fait pas gagner de points — il n'en fait pas perdre, ce qui n'est pas la même chose.",
          en:"The word to know how to ask about, because the answer changes with the level, the country and the year: « what's the scoring? » is a fair question even for an experienced rider. What makes eventing scoring particular: penalties from all three phases ADD UP, and the lowest total wins.",
          es:"La palabra que hay que saber preguntar, porque la respuesta cambia según el nivel, el país y el año. Lo particular del completo: las penalizaciones de las tres pruebas SE SUMAN y gana el total más bajo.",
          it:"La parola da saper chiedere, perché la risposta cambia col livello, il paese e l'anno. La particolarità del completo: le penalità delle tre prove SI SOMMANO e vince il totale più basso.",
          de:"Das Wort, nach dem man fragen können muss, denn die Antwort ändert sich mit Klasse, Land und Jahr. Das Besondere der Vielseitigkeit: die Strafpunkte aller drei Teilprüfungen ADDIEREN SICH, und der niedrigste Gesamtwert gewinnt.",
          ja:"尋ね方を覚えておくべき語です。答えは級、国、年によって変わるからです。総合馬術の特徴は、三つの競技の減点が合算され、合計が最も低い者が勝つことです。" } },

  { ref:"classement-provisoire", lecon:2, coll:"complet",
    mots:{ fr:{m:"le classement provisoire"}, en:{m:"the leaderboard", p:"lii-deur-bord", var:"the interim standings"},
           es:{m:"la clasificación provisional"}, it:{m:"la classifica provvisoria"},
           de:{m:"die Zwischenwertung", p:"tsvi-cheune-vèr-toung"}, ja:{m:"暫定順位", p:"zantei jun'i"} },
    def:{ fr:"🟥 LA NOTION PROPRE AU COMPLET : on est classé alors que deux épreuves restent à courir. Être troisième après le dressage ne veut presque rien dire — le cross rebat tout. ⚠️ EN ANGLAIS ON NE DIT PAS « I am third » MAIS **I'm lying third** — « je suis couché troisième », une tournure qui surprend et qu'on entend partout sur un concours. *The interim standings* est le terme officiel, *the leaderboard* celui qu'on emploie.",
          en:"The notion that belongs to eventing: you're placed while two phases are still to come. Lying third after the dressage means almost nothing — the cross-country changes everything. Note « I'm lying third », not « I am third ».",
          es:"La noción propia del completo: se está clasificado cuando quedan dos pruebas. Ser tercero después de la doma no significa casi nada.",
          it:"La nozione propria del completo: si è classificati quando restano due prove. Essere terzi dopo il dressage non significa quasi niente.",
          de:"Der Begriff, der zur Vielseitigkeit gehört: man ist platziert, während zwei Teilprüfungen noch kommen. Dritter nach der Dressur heißt fast nichts.",
          ja:"総合馬術ならではの考え方。まだ二つの競技を残した段階での順位です。馬場馬術のあとで三位でも、ほとんど意味がありません。クロスカントリーがすべてを塗り替えます。" } },

  /* ================================================================
     TROIS ENTRÉES DE PLUS POUR BADMINTON — 17/08/2026, tirées de la
     liste de vocabulaire-clé de Blandine (hindquarters, marker, steady
     rhythm, hilly ground, make up time, drop into water, ditch, direct
     route, line, warm-up, clear round, keep the poles up, final
     standings).
     ⚠️ DIX DE CES TREIZE MOTS EXISTAIENT DÉJÀ et s'emploient en
     `motsAilleurs` — c'est voulu, et c'est ce qui fait la révision :
     `engagement` (Versailles, créé le même jour) · `lettre` (Windsor) ·
     `cadence` (Versailles) · `fossé` et `voie-directe` et `ligne`
     (Burghley) · `detente` (Aberystwyth) · `sans-faute` (Wellington) ·
     `classement-provisoire` (ici, créé le même jour).
     ⚠️ NE PAS les redupliquer ici.
     ================================================================ */

  { ref:"terrain-vallonne", lecon:2, coll:"complet",
    mots:{ fr:{m:"le terrain vallonné"}, en:{m:"hilly ground", p:"hi-li graound"},
           es:{m:"el terreno ondulado"}, it:{m:"il terreno mosso"},
           de:{m:"das hügelige Gelände", p:"hu-gue-li-gue gue-lèn-de"}, ja:{m:"起伏のある地形", p:"kifuku no aru chikei"} },
    def:{ fr:"⚠️ CE QUI ÉPUISE UN CHEVAL SUR UN CROSS, bien plus que la hauteur des obstacles. Badminton et Burghley sont des parcs anglais tout en montées et descentes : on économise son cheval au début, on récupère du temps sur le plat. ⚠️ En anglais on dit **hilly ground**, et « the going » pour l'état du sol — deux notions différentes qu'un seul mot français recouvre.",
          en:"What tires a horse on a cross-country course, far more than the height of the fences. Badminton and Burghley are English parks all up and down: you save your horse early and make up time on the flat. Note « hilly ground » for the shape and « the going » for the state of the surface.",
          es:"Lo que agota a un caballo en un cross, mucho más que la altura de los obstáculos. Se economiza el caballo al principio y se recupera tiempo en lo llano.",
          it:"Ciò che sfinisce un cavallo in un cross, molto più dell'altezza degli ostacoli. Si risparmia il cavallo all'inizio e si recupera tempo in piano.",
          de:"Was ein Pferd im Gelände erschöpft, viel mehr als die Höhe der Sprünge. Man schont das Pferd am Anfang und holt die Zeit im Flachen.",
          ja:"クロスカントリーで馬を最も疲れさせるのは、障害の高さではなく起伏です。序盤は馬を節約し、平坦な区間で時間を取り戻します。" } },

  { ref:"rattraper-temps", lecon:2, coll:"complet",
    mots:{ fr:{m:"rattraper du temps"}, en:{m:"to make up time", p:"méïk eup taïm"},
           es:{m:"recuperar tiempo"}, it:{m:"recuperare tempo"},
           de:{m:"Zeit aufholen", p:"tsaïte aouf-hô-leune"}, ja:{m:"時間を取り戻す", p:"jikan o torimodosu"} },
    def:{ fr:"⚠️ On ne rattrape PAS du temps en allant plus vite entre deux obstacles difficiles : on le rattrape sur les longues lignes droites et en ne perdant rien dans les tournants. La formule anglaise **to make up time** s'entend sur tous les crossses du monde, et son contraire est *to be behind the clock*.",
          en:"You don't make up time by going faster between two difficult fences: you make it up on the long straight stretches and by losing nothing in the turns. The opposite is « to be behind the clock ».",
          es:"No se recupera tiempo yendo más rápido entre dos obstáculos difíciles: se recupera en las rectas largas y no perdiendo nada en los giros.",
          it:"Non si recupera tempo andando più veloci tra due ostacoli difficili: si recupera sui lunghi rettilinei e non perdendo niente nelle curve.",
          de:"Zeit holt man nicht auf, indem man zwischen zwei schweren Sprüngen schneller wird, sondern auf den langen Geraden und indem man in den Wendungen nichts verliert.",
          ja:"難しい障害の間で速く走っても時間は取り戻せません。長い直線と、曲がりで一切失わないことで取り戻します。" } },

  { ref:"garder-les-barres", lecon:2, coll:"complet",
    mots:{ fr:{m:"garder les barres"}, en:{m:"to keep the poles up", p:"kiipe ze pôlz eup"},
           es:{m:"no tirar las barras"}, it:{m:"non far cadere le barriere"},
           de:{m:"die Stangen oben halten", p:"chtan-gueune"}, ja:{m:"バーを落とさない", p:"bā o otosanai"} },
    def:{ fr:"🟥 L'ENJEU DU TROISIÈME JOUR, et la formule exacte des coachs : **keep the poles up**. Le parcours d'obstacle d'un complet se court sur un cheval qui a couru le cross la veille — il est fatigué, ses barres tombent plus facilement, et un sans-faute peut retourner tout le classement. ⚠️ Ce n'est pas la même équitation qu'un concours de saut : on ne cherche pas la vitesse, on cherche à ne rien faire tomber.",
          en:"The whole point of the third day, and the coaches' exact phrase. The showjumping of a three-day event is ridden on a horse who ran cross-country the day before — he's tired, poles come down more easily, and a clear round can turn the whole leaderboard over.",
          es:"Lo que se juega el tercer día. El recorrido de salto de un completo se corre sobre un caballo que hizo el cross el día antes: está cansado y las barras caen más fácilmente.",
          it:"La posta in gioco del terzo giorno. Il percorso di salto di un completo si corre su un cavallo che ha fatto il cross il giorno prima: è stanco e le barriere cadono più facilmente.",
          de:"Worum es am dritten Tag geht. Das Springen einer Vielseitigkeit reitet man auf einem Pferd, das am Tag davor das Gelände gelaufen ist — es ist müde, die Stangen fallen leichter.",
          ja:"三日目の勝負どころ。総合馬術の障害飛越は、前日にクロスカントリーを走った馬で行います。疲れているためバーが落ちやすく、クリアラウンドが順位をひっくり返します。" } },

  { ref:"carton-jaune", lecon:2, coll:"complet",
    mots:{ fr:{m:"le carton jaune"}, en:{m:"the yellow warning card", p:"yè-lô ouor-ning karde"},
           es:{m:"la tarjeta amarilla"}, it:{m:"il cartellino giallo"},
           de:{m:"die gelbe Karte", p:"guèl-be kar-te"}, ja:{m:"イエローカード", p:"ierō kādo"} },
    def:{ fr:"Il existe vraiment en équitation, et pas seulement au football : le jury le donne pour équitation dangereuse ou mauvais traitement d'un cheval. Deux cartons en un an et le cavalier est suspendu.",
          en:"It really exists in equestrian sport: the ground jury gives it for dangerous riding or abuse of a horse. Two in a year means suspension.",
          es:"Existe de verdad en equitación, y no solo en fútbol: el jurado lo da por equitación peligrosa o maltrato de un caballo. Dos tarjetas en un año y el jinete queda suspendido.",
          it:"Esiste davvero in equitazione, e non solo nel calcio: la giuria la dà per equitazione pericolosa o maltrattamento di un cavallo. Due cartellini in un anno e il cavaliere è sospeso.",
          de:"Sie existiert wirklich im Reitsport, nicht nur im Fußball: Die Jury zeigt sie für gefährliches Reiten oder schlechte Behandlung eines Pferdes. Zwei Karten in einem Jahr — der Reiter ist gesperrt.",
          ja:"馬術にも本当に存在します。サッカーだけではありません。危険騎乗や馬の虐待に対して審判団が出します。一年に二枚で、騎手は出場停止です。" } },

  { ref:"niveau", lecon:2, coll:"complet",
    mots:{ fr:{m:"le niveau"}, en:{m:"the level", p:"lè-veul", var:"BE90 · Novice · Intermediate (GB)"},
           es:{m:"el nivel"}, it:{m:"il livello"},
           de:{m:"die Klasse", p:"kla-se"}, ja:{m:"レベル", p:"reberu"} },
    def:{ fr:"⚠️ Le vrai casse-tête du cavalier voyageur : les niveaux ne se traduisent pas. La France classe en Club / Amateur / Pro, la Grande-Bretagne en BE90, BE100, Novice, Intermediate, Advanced — où **Novice n'est pas un niveau de débutant** mais déjà 1,10 m. L'Allemagne numérote de E à S. Il faut convertir en hauteur, jamais en mot.",
          en:"Levels do not translate. Britain's « Novice » is not a beginner level but already 1.10 m. Always convert into height, never into words.",
          es:"⚠️ El verdadero rompecabezas del jinete viajero: los niveles no se traducen. Francia clasifica en Club / Amateur / Pro, Gran Bretaña en BE90, BE100, Novice, Intermediate, Advanced — donde **Novice no es un nivel de principiante** sino ya 1,10 m. Alemania numera de E a S. Hay que convertir en altura, jamás en palabra.",
          it:"⚠️ Il vero rompicapo del cavaliere viaggiatore: i livelli non si traducono. La Francia classifica in Club / Amateur / Pro, la Gran Bretagna in BE90, BE100, Novice, Intermediate, Advanced — dove **Novice non è un livello da principiante** ma già 1,10 m. La Germania numera da E a S. Bisogna convertire in altezza, mai in parola.",
          de:"⚠️ Das wahre Kopfzerbrechen des reisenden Reiters: Niveaus lassen sich nicht übersetzen. Frankreich stuft in Club / Amateur / Pro, Großbritannien in BE90, BE100, Novice, Intermediate, Advanced — wobei **Novice kein Anfängerniveau** ist, sondern schon 1,10 m. Deutschland zählt von E bis S. Immer in Höhe umrechnen, nie in Wörter.",
          ja:"⚠️ 旅する騎手の本当の難問：レベルは翻訳できません。フランスは Club / Amateur / Pro、イギリスは BE90、BE100、Novice、Intermediate、Advanced — しかも **Novice は初心者レベルではなく**、もう1.1mの世界。ドイツはEからSまでの等級制。換算するなら高さで。言葉では決して。" } },
  { ref:"speaker", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la sonorisation"}, en:{m:"the tannoy", p:"ta-noï", var:"the announcer · the PA"},
           es:{m:"el locutor", var:"los altavoces"}, it:{m:"lo speaker"},
           de:{m:"der Sprecher", p:"chprè-cheur"}, ja:{m:"アナウンス", p:"anaunsu"} },
    def:{ fr:"⚠️ Mot britannique impossible à deviner : **the tannoy**, du nom d'un fabricant de haut-parleurs, désigne toute la sonorisation d'un concours. « It came over the tannoy » veut dire « ça a été annoncé ».",
          en:"An unguessable British word: the tannoy, from a loudspeaker brand, means the whole PA system.",
          es:"⚠️ Palabra británica imposible de adivinar: **the tannoy**, del nombre de un fabricante de altavoces, designa toda la megafonía de un concurso. « It came over the tannoy » significa « lo anunciaron ».",
          it:"⚠️ Parola britannica impossibile da indovinare: **the tannoy**, dal nome di un fabbricante di altoparlanti, indica tutta la sonorizzazione di un concorso. « It came over the tannoy » vuol dire « è stato annunciato ».",
          de:"⚠️ Britisches Wort, auf das niemand kommt: **the tannoy** — nach einem Lautsprecherhersteller — meint die ganze Turnierbeschallung. « It came over the tannoy » heißt « Es wurde durchgesagt ».",
          ja:"⚠️ 見当のつけようがないイギリス英語：**the tannoy**。スピーカーメーカーの名前がそのまま、競技会の場内放送全体を指す言葉になりました。« It came over the tannoy » は「放送で流れた」の意味です。" } },

  { ref:"appel", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"l'appel"}, en:{m:"the call", p:"kôl", var:"you're next · you're on"},
           es:{m:"la llamada"}, it:{m:"la chiamata"},
           de:{m:"der Aufruf", p:"aouf-rouf"}, ja:{m:"呼び出し", p:"yobidashi"} },
    def:{ fr:"Le moment où le commissaire t'appelle pour entrer en piste. Les deux phrases à reconnaître d'urgence en anglais : **« you're next »** et **« you're on »** — la seconde veut dire maintenant.",
          en:"When the steward calls you in. Two phrases to recognise instantly: « you're next » and « you're on » — the second means now.",
          es:"El momento en que el comisario te llama a pista. Las dos frases a reconocer con urgencia en inglés: **« you're next »** y **« you're on »** — la segunda significa ahora mismo.",
          it:"Il momento in cui il commissario ti chiama in campo. Le due frasi da riconoscere d'urgenza in inglese: **« you're next »** e **« you're on »** — la seconda vuol dire adesso.",
          de:"Der Moment, in dem der Steward dich in die Bahn ruft. Zwei Sätze sofort erkennen: **« you're next »** und **« you're on »** — der zweite heißt JETZT.",
          ja:"係員が入場を告げる瞬間。英語で即座に聞き取るべきふたつのフレーズ — **« you're next »** と **« you're on »**。後者は「今すぐ」という意味です。" } },

  { ref:"resultat", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le résultat"}, en:{m:"the result", p:"ri-zeult", var:"the scores"},
           es:{m:"el resultado"}, it:{m:"il risultato"},
           de:{m:"das Ergebnis", p:"èr-guép-niss"}, ja:{m:"結果", p:"kekka"} },
    def:{ fr:"Affiché au tableau, rarement annoncé. En complet, il s'exprime en points de pénalité cumulés sur les trois tests, et le meilleur score est le plus bas — l'inverse du dressage seul.",
          en:"Posted on the board, rarely announced. In eventing it is cumulative penalties across three tests, and the lowest score wins.",
          es:"Expuesto en el tablón, rara vez anunciado. En completo se expresa en puntos de penalización acumulados en los tres tests, y el mejor score es el más bajo — lo contrario de la doma sola.",
          it:"Affisso al tabellone, raramente annunciato. Nel completo si esprime in punti di penalità cumulati sui tre test, e il punteggio migliore è il più basso — l'inverso del dressage da solo.",
          de:"Am Brett ausgehängt, selten durchgesagt. In der Vielseitigkeit zählt die Summe der Strafpunkte aus drei Teilprüfungen — der beste Wert ist der niedrigste, umgekehrt zur reinen Dressur.",
          ja:"掲示板に貼られ、放送されることはまれです。総合馬術では三競技の減点の合計で表され、最も少ない者が勝ち — 馬場単独とは逆です。" } },

  { ref:"remise-prix", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la remise des prix"}, en:{m:"the prize-giving", p:"praïz-gui-ving"},
           es:{m:"la entrega de premios"}, it:{m:"la premiazione"},
           de:{m:"die Siegerehrung", p:"zi-gueur-é-roung"}, ja:{m:"表彰式", p:"hyōshōshiki"} },
    def:{ fr:"À cheval le plus souvent, cocarde au frontal. Y aller compte : un classé absent fait attendre tout le monde, et c'est très mal vu partout.",
          en:"Usually mounted, rosette on the browband. Turning up matters: a missing placed rider keeps everyone waiting.",
          es:"A caballo la mayoría de las veces, escarapela en la frontalera. Ir cuenta: un clasificado ausente hace esperar a todos, y está muy mal visto en todas partes.",
          it:"A cavallo il più delle volte, coccarda al frontale. Andarci conta: un classificato assente fa aspettare tutti, ed è vistissimo male ovunque.",
          de:"Meist zu Pferd, Schleife am Stirnband. Hinzugehen zählt: Ein fehlender Platzierter lässt alle warten — und das ist überall äußerst schlecht angesehen.",
          ja:"たいていは騎乗のまま、額革にロゼットをつけて行います。出席すること自体が大事 — 入賞者が来なければ全員が待たされ、どこの国でも極めて印象が悪いのです。" } },

  { ref:"groom", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le groom"}, en:{m:"the groom", p:"groum"},
           es:{m:"el mozo de cuadra"}, it:{m:"il groom"},
           de:{m:"der Pfleger", p:"pflé-gueur"}, ja:{m:"厩務員", p:"kyūmuin"} },
    def:{ fr:"⚠️ Piège grammatical parfait : en anglais, **groom** est la *personne* qui s'occupe du cheval, alors que *to groom* est le geste de panser (chapitre 2). « My groom is holding him » ne veut pas dire qu'on le brosse.",
          en:"A perfect trap: « groom » is the person, while « to groom » is the act of brushing. « My groom is holding him » is not about brushing.",
          es:"⚠️ Trampa gramatical perfecta: en inglés, **groom** es la *persona* que cuida del caballo, mientras que *to groom* es el gesto de limpiar (capítulo 2). « My groom is holding him » no significa que lo estén cepillando.",
          it:"⚠️ Trappola grammaticale perfetta: in inglese **groom** è la *persona* che si occupa del cavallo, mentre *to groom* è il gesto di pulire (capitolo 2). « My groom is holding him » non vuol dire che lo stanno spazzolando.",
          de:"⚠️ Die perfekte Grammatikfalle: **groom** ist die *Person*, die das Pferd versorgt — *to groom* ist das Putzen (Kapitel 2). « My groom is holding him » heißt nicht, dass gebürstet wird.",
          ja:"⚠️ 完璧な文法の罠：英語の **groom** は馬の世話をする*人*のこと。動詞 *to groom* は手入れの動作です（第2章）。« My groom is holding him » は、ブラシをかけているという意味ではありません。" } },

  /* ---- ajout du 8 août 2026 (passation S147, demande de Blandine :
     « il faut aussi différencier 3 days event etc, il y a CIC et CCI
     aussi ») : les formats du concours complet, en une seule notion. ---- */

  { ref:"formats-complet", lecon:2, coll:"concours",
    mots:{ fr:{m:"le format"}, en:{m:"the format", p:"for-matt"},
           es:{m:"el formato"}, it:{m:"il formato"},
           de:{m:"das Format"}, ja:{m:"競技形式", p:"kyōgi keishiki"} },
    def:{ fr:"Le complet se court en un jour (**ODE**, one-day event) ou en trois (**le three-day event**). En international : **CCI-S** (court) et **CCI-L** (long) — ⚠️ les anciens sigles **CIC/CCI**, renommés en 2019, s'entendent encore partout. La difficulté se lit aux étoiles, de 1★ à 5★ : Badminton est un 5★, il n'en existe qu'une poignée au monde.",
          en:"Eventing runs over one day (**ODE**, one-day event) or three (**the three-day event**). Internationally: **CCI-S** (short) and **CCI-L** (long) — the old labels **CIC/CCI**, renamed in 2019, are still heard everywhere. Difficulty reads in stars, 1★ to 5★: Badminton is a 5★, and there is only a handful in the world.",
          es:"El completo se corre en un día (**ODE**, one-day event) o en tres (**el three-day event**). En internacional: **CCI-S** (corto) y **CCI-L** (largo) — ⚠️ las siglas antiguas **CIC/CCI**, renombradas en 2019, aún se oyen en todas partes. La dificultad se lee en estrellas, de 1★ a 5★: Badminton es un 5★, y solo hay un puñado en el mundo.",
          it:"Il completo si corre in un giorno (**ODE**, one-day event) o in tre (**il three-day event**). In internazionale: **CCI-S** (corto) e **CCI-L** (lungo) — ⚠️ le vecchie sigle **CIC/CCI**, rinominate nel 2019, si sentono ancora ovunque. La difficoltà si legge nelle stelle, da 1★ a 5★: Badminton è un 5★, e ne esiste una manciata al mondo.",
          de:"Die Vielseitigkeit läuft an einem Tag (**ODE**, one-day event) oder an dreien (**das Three-Day-Event**). International: **CCI-S** (kurz) und **CCI-L** (lang) — ⚠️ die alten Kürzel **CIC/CCI**, 2019 umbenannt, hört man noch überall. Die Schwierigkeit steht in Sternen, 1★ bis 5★: Badminton ist ein 5★ — davon gibt es weltweit eine Handvoll.",
          ja:"総合馬術は一日で行う **ODE**（ワンデイイベント）と、三日間の **three-day event** があります。国際競技では **CCI-S**（ショート）と **CCI-L**（ロング）— ⚠️ 2019年に改称された旧称 **CIC/CCI** も、現場ではまだあちこちで聞こえます。難易度は 1★ から 5★ の星の数で読みます。バドミントンは 5★ — 世界に一握りしかない格付けです。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"niveau-equivalent", lecon:2,
      fr:"Le niveau Novice, quelle hauteur ?",
      en:"What height is Novice ?",
      es:"¿ Qué altura es Novice ?",
      it:"Che altezza è il Novice ?",
      de:"Wie hoch ist Novice ?",
      ja:"ノービス は 高さ いくつ です か ?" },
    { ref:"temps-optimum-cross", lecon:2,
      fr:"Le temps optimum : six minutes vingt.",
      en:"Optimum time: six twenty.",
      es:"Tiempo óptimo: seis veinte.",
      it:"Tempo ottimo: sei e venti.",
      de:"Optimalzeit: sechs zwanzig.",
      ja:"規定 タイム は 六分 二十秒。" },
    { ref:"tu-passes", lecon:3,
      fr:"C'est à toi, on t'appelle !",
      en:"You're on — they're calling you !",
      es:"¡ Te toca, te están llamando !",
      it:"Tocca a te, ti stanno chiamando !",
      de:"Du bist dran, du wirst aufgerufen !",
      ja:"出番 です 、 呼ばれて い ます !" },
    { ref:"resultats-ou", lecon:3,
      fr:"Les résultats sont affichés où ?",
      en:"Where are the results posted ?",
      es:"¿ Dónde están los resultados ?",
      it:"Dove sono affissi i risultati ?",
      de:"Wo hängen die Ergebnisse ?",
      ja:"結果 は どこ に 掲示 され ます か ?" },
  ],

  dialogue: {
    ville: "badminton", lecon: 2, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 27 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive sur le concours ---- */
      { ref:"dbd-secretariat", temps:1, dit:"joueuse", mots:[], motsAilleurs:["secretariat"],
        fr:"Où est le secrétariat ? Je viens retirer mon dossard.",
        en:"Where's the secretary's office? I've come to collect my number.",
        es:"¿Dónde está la secretaría? Vengo a recoger mi dorsal.",
        it:"Dov'è la segreteria? Vengo a ritirare il mio numero.",
        de:"Wo ist das Meldebüro? Ich möchte meine Startnummer holen.",
        ja:"事務局 は どこ です か ? ゼッケン を 受け取り に 来 まし た。" },

      { ref:"dbd-r-licence-passeport", temps:1, dit:"club", mots:[], motsAilleurs:["licence"],
        fr:"Il me faut votre licence et le passeport du cheval.",
        en:"I need your licence and the horse's passport.",
        es:"Necesito su licencia y el pasaporte del caballo.",
        it:"Mi servono la sua licenza e il passaporto del cavallo.",
        de:"Ich brauche Ihre Lizenz und den Pferdepass.",
        ja:"ライセンス と 馬 の パスポート が 必要 です。" },

      { ref:"dbd-licence-etrangere", temps:1, dit:"joueuse", mots:[], motsAilleurs:["licence"],
        fr:"Ma licence est étrangère, est-ce qu'elle est valable ici ?",
        en:"My licence is foreign — is it valid here?",
        es:"Mi licencia es extranjera, ¿es válida aquí?",
        it:"La mia licenza è straniera, è valida qui?",
        de:"Meine Lizenz ist ausländisch — gilt sie hier?",
        ja:"外国 の ライセンス です が、 ここ で 有効 です か ?" },

      { ref:"dbd-epreuves-ou", temps:1, dit:"joueuse", mots:["concours-complet","reprise-dressage","parcours-obstacle","cross"],
        fr:"Savez-vous comment et où vont se dérouler les épreuves de dressage, obstacle et cross ?",
        en:"Do you know how and where the dressage, showjumping and cross-country will be run?",
        es:"¿Sabe cómo y dónde se van a disputar las pruebas de doma, salto y cross?",
        it:"Sa come e dove si svolgeranno le prove di dressage, salto e cross?",
        de:"Wissen Sie, wie und wo Dressur, Springen und Gelände ausgetragen werden?",
        ja:"馬場、 障害、 クロスカントリー の 各 競技 が いつ どこ で 行わ れる か ご存じ です か ?" },

      { ref:"dbd-r-trois-jours", temps:1, dit:"club", mots:["reprise-dressage","cross","parcours-obstacle"],
        fr:"Dressage aujourd'hui, cross demain, obstacle dimanche.",
        en:"Dressage today, cross-country tomorrow, showjumping on Sunday.",
        es:"Doma hoy, cross mañana, salto el domingo.",
        it:"Dressage oggi, cross domani, salto domenica.",
        de:"Heute Dressur, morgen Gelände, Sonntag Springen.",
        ja:"今日 は 馬場、 明日 は クロスカントリー、 日曜 は 障害 です。" },

      /* ---- temps 2 · la reprise de dressage ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-laisse-respirer", temps:2, dit:"club", mots:["reprise-dressage"],
        fr:"Il est un peu tendu, laisse-le respirer avant d'entrer sur le carré.",
        en:"He's a little tense, let him breathe before you enter the arena.",
        es:"Está algo tenso, déjalo respirar antes de entrar en la pista.",
        it:"È un po' teso, lascialo respirare prima di entrare nel quadrato.",
        de:"Er ist etwas angespannt — lass ihn atmen, bevor du ins Viereck reitest.",
        ja:"少し 緊張 し て い ます。 馬場 に 入る 前 に 息 を つか せ て ください。" },

      /* 🟥 Phrase de Blandine. Emploie `lettre`, de Windsor. */
      { ref:"dbd-r-transition-lettre", temps:2, dit:"club", mots:[], motsAilleurs:["lettre"],
        fr:"Prépare ta transition avant la lettre, pas au dernier moment.",
        en:"Prepare your transition before the marker, not at the last second.",
        es:"Prepara la transición antes de la letra, no en el último momento.",
        it:"Prepara la transizione prima della lettera, non all'ultimo momento.",
        de:"Bereite den Übergang vor dem Buchstaben vor, nicht in der letzten Sekunde.",
        ja:"移行 は 文字 の 手前 で 準備 し ます。 直前 で は 遅い です。" },

      /* 🟥 Phrase de Blandine. Emploie `cadence`, de Versailles. */
      { ref:"dbd-r-cadence-reguliere", temps:2, dit:"club", mots:[], motsAilleurs:["cadence"],
        fr:"Garde une cadence régulière et ne le laisse pas accélérer.",
        en:"Keep a steady rhythm and don't let him rush.",
        es:"Mantén una cadencia regular y no le dejes acelerar.",
        it:"Mantieni una cadenza regolare e non lasciarlo accelerare.",
        de:"Halte einen gleichmäßigen Takt und lass ihn nicht eilen.",
        ja:"一定 の リズム を 保ち、 急がせ ない で ください。" },

      /* 🟥 Phrase de Blandine. `engagement` créé le même jour. */
      { ref:"dbd-r-engagement", temps:2, dit:"club", mots:["reprise-dressage"], motsAilleurs:["engagement"],
        fr:"Il faut davantage d'engagement des postérieurs dans cette reprise.",
        en:"We need more engagement from the hindquarters in this test.",
        es:"Hace falta más enganche de los posteriores en esta prueba.",
        it:"Serve più impegno dei posteriori in questa ripresa.",
        de:"In dieser Aufgabe braucht es mehr Untertreten der Hinterhand.",
        ja:"この 課目 で は、 後肢 の 踏み込み を もっと 出す 必要 が あり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-troisieme-provisoire", temps:2, dit:"joueuse", mots:["classement-provisoire","reprise-dressage"],
        fr:"Je suis troisième au classement provisoire après le dressage.",
        en:"I'm lying third after the dressage.",
        es:"Voy tercera en la clasificación provisional después de la doma.",
        it:"Sono terza nella classifica provvisoria dopo il dressage.",
        de:"Nach der Dressur liege ich auf dem dritten Platz.",
        ja:"馬場 の あと、 暫定 三位 です。" },

      /* ---- temps 3 · le cross, l'économie du cheval ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-terrain-vallonne", temps:3, dit:"club", mots:["terrain-vallonne","cross"],
        fr:"Le terrain est vallonné, économise ton cheval au début du cross.",
        en:"The ground is hilly, so save your horse at the beginning of the cross-country.",
        es:"El terreno es ondulado: economiza tu caballo al principio del cross.",
        it:"Il terreno è mosso: risparmia il cavallo all'inizio del cross.",
        de:"Das Gelände ist hügelig — schone dein Pferd am Anfang.",
        ja:"起伏 が ある 地形 です。 クロス の 序盤 は 馬 を 節約 し て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-galoper-recuperer", temps:3, dit:"club", mots:["rattraper-temps"],
        fr:"Laisse-le galoper sur les portions où tu peux récupérer du temps.",
        en:"Let him gallop on the stretches where you can make up time.",
        es:"Déjalo galopar en los tramos donde puedas recuperar tiempo.",
        it:"Lascialo galoppare nei tratti dove puoi recuperare tempo.",
        de:"Lass ihn auf den Strecken galoppieren, wo du Zeit aufholen kannst.",
        ja:"時間 を 取り戻せる 区間 で は 走ら せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-rebalance-galop", temps:3, dit:"club", mots:["obstacle-fixe"],
        fr:"Rééquilibre avant le gros obstacle, mais ne casse pas ton galop.",
        en:"Rebalance before the big fence, but don't kill the gallop.",
        es:"Reequilibra antes del obstáculo grande, pero no rompas el galope.",
        it:"Riequilibra prima dell'ostacolo grande, ma non rompere il galoppo.",
        de:"Balanciere vor dem großen Sprung neu, aber zerstöre den Galopp nicht.",
        ja:"大きな 障害 の 前 で 立て直し ます が、 ギャロップ を 殺さ ない で。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-regarde-suivant", temps:3, dit:"club", mots:[], motsAilleurs:["ligne"],
        fr:"Regarde déjà l'obstacle suivant pendant que tu franchis celui-ci.",
        en:"Look for the next fence while you're jumping this one.",
        es:"Mira ya el obstáculo siguiente mientras saltas este.",
        it:"Guarda già l'ostacolo successivo mentre salti questo.",
        de:"Schau schon zum nächsten Sprung, während du diesen springst.",
        ja:"この 障害 を 飛び ながら、 すでに 次 の 障害 を 見 ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-drop-dans-eau", temps:3, dit:"club", mots:[], motsAilleurs:["contre-bas","complexe-eau"],
        fr:"Il y a un gros contre-bas dans l'eau, reste bien derrière ton cheval.",
        en:"There's a big drop into the water, stay well behind your horse.",
        es:"Hay un gran contrabajo en el agua: quédate bien detrás de tu caballo.",
        it:"C'è un grosso salto in discesa nell'acqua: resta bene dietro al cavallo.",
        de:"Es gibt einen großen Absprung ins Wasser — bleib gut hinter dem Pferd.",
        ja:"水 の 中 へ の 大きな ドロップ が あり ます。 体 を しっかり 後ろ に 残し て。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-jambes-fosse", temps:3, dit:"club", mots:[], motsAilleurs:["fosse"],
        fr:"Garde tes jambes au contact s'il regarde le fossé.",
        en:"Keep your leg on if he looks at the ditch.",
        es:"Mantén las piernas en contacto si mira la zanja.",
        it:"Tieni le gambe in contatto se guarda il fosso.",
        de:"Halte den Schenkel dran, wenn er den Graben anschaut.",
        ja:"溝 を 見 たら、 脚 を つけ た まま に し て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-voie-directe-precision", temps:3, dit:"club", mots:[], motsAilleurs:["voie-directe"],
        fr:"La voie directe est plus rapide, mais elle demande beaucoup de précision.",
        en:"The direct route is quicker, but it requires a lot of accuracy.",
        es:"La vía directa es más rápida, pero exige mucha precisión.",
        it:"La via diretta è più rapida, ma richiede molta precisione.",
        de:"Der direkte Weg ist schneller, verlangt aber viel Präzision.",
        ja:"直線 ルート の ほう が 速い です が、 高い 正確 さ が 必要 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-pas-couper-virage", temps:3, dit:"club", mots:[], motsAilleurs:["ligne"],
        fr:"Ne coupe pas ton virage, tu risques de perdre ta ligne sur le deuxième élément.",
        en:"Don't cut the turn or you might lose your line to the second element.",
        es:"No cortes el giro: puedes perder la línea en el segundo elemento.",
        it:"Non tagliare la curva: rischi di perdere la linea sul secondo elemento.",
        de:"Schneide die Wendung nicht ab, sonst verlierst du die Linie zum zweiten Element.",
        ja:"回転 を 内側 に 切ら ない で。 二番目 の 要素 で ライン を 失い ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-trouve-sa-foulee", temps:3, dit:"club", mots:["obstacle-fixe"],
        fr:"Laisse-le trouver sa foulée devant le gros oxer de cross.",
        en:"Let him find his stride to the big cross-country oxer.",
        es:"Déjalo encontrar su tranco ante el gran óxer de cross.",
        it:"Lascialo trovare la sua falcata davanti al grande oxer da cross.",
        de:"Lass ihn seinen Galoppsprung zum großen Gelände-Oxer selbst finden.",
        ja:"クロス の 大きな オクサー の 前 で は、 馬 に 歩 を 見つけ さ せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-retard-chrono", temps:3, dit:"club", mots:["temps-optimum","rattraper-temps"],
        fr:"On est légèrement en retard sur le chronomètre, il faut avancer maintenant.",
        en:"We're slightly behind the clock, so we need to move on now.",
        es:"Vamos algo retrasados con el cronómetro: hay que avanzar ahora.",
        it:"Siamo leggermente in ritardo sul cronometro: bisogna avanzare adesso.",
        de:"Wir sind leicht hinter der Zeit — jetzt müssen wir vorwärts.",
        ja:"タイム が やや 遅れ て い ます。 今 から 前 へ 出 なけれ ば なり ませ ん。" },

      /* ---- temps 4 · le lendemain, la détente ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-donne-hier", temps:4, dit:"club", mots:[], motsAilleurs:["detente"],
        fr:"Il a beaucoup donné hier, regarde comment il se sent à la détente.",
        en:"He gave a lot yesterday, so see how he feels in the warm-up.",
        es:"Ayer dio mucho: mira cómo se siente en el calentamiento.",
        it:"Ieri ha dato molto: guarda come si sente nel riscaldamento.",
        de:"Er hat gestern viel gegeben — schau, wie er sich beim Abreiten anfühlt.",
        ja:"昨日 は かなり 頑張り まし た。 ウォーミング アップ で 様子 を 見 て ください。" },

      { ref:"dbd-trot-presentation", temps:4, dit:"joueuse", mots:["trot-presentation"],
        fr:"Est-ce qu'il a passé le trot de présentation ?",
        en:"Has he passed the trot-up?",
        es:"¿Ha pasado la inspección al trote?",
        it:"Ha superato la visita al trotto?",
        de:"Hat er die Verfassungsprüfung bestanden?",
        ja:"獣医 検査 の 常歩 速歩 検査 は 通り まし た か ?" },

      /* ---- temps 5 · le parcours d'obstacle, sur un cheval fatigué ---- */
      /* 🟥 Phrase de Blandine. LE cœur du troisième jour. */
      { ref:"dbd-r-garder-les-barres", temps:5, dit:"club", mots:["garder-les-barres","parcours-obstacle","cross"],
        fr:"Aujourd'hui, il faut préserver les barres : le cheval peut être fatigué après le cross.",
        en:"Today we need to keep the poles up; the horse may be tired after the cross-country.",
        es:"Hoy hay que no tirar las barras: el caballo puede estar cansado después del cross.",
        it:"Oggi bisogna non far cadere le barriere: il cavallo può essere stanco dopo il cross.",
        de:"Heute müssen die Stangen oben bleiben — das Pferd kann nach dem Gelände müde sein.",
        ja:"今日 は バー を 落とさ ない こと が 大切 です。 クロス の あと で 馬 は 疲れ て いる かも しれ ませ ん。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-attends-distance", temps:5, dit:"club", mots:["parcours-obstacle"],
        fr:"Attends ta distance et garde-le droit entre tes deux rênes.",
        en:"Wait for your distance and keep him straight between both reins.",
        es:"Espera tu distancia y mantenlo derecho entre las dos riendas.",
        it:"Aspetta la tua distanza e tienilo dritto tra le due redini.",
        de:"Warte auf die Distanz und halte ihn gerade zwischen beiden Zügeln.",
        ja:"距離 を 待っ て、 両手 の 手綱 の 間 で まっすぐ 保っ て ください。" },

      /* ---- temps 6 · le classement final ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-sans-faute-classement", temps:6, dit:"club", mots:["classement-provisoire"], motsAilleurs:["sans-faute"],
        fr:"Un sans-faute aujourd'hui peut complètement changer le classement final.",
        en:"A clear round today could completely change the final standings.",
        es:"Un recorrido sin falta hoy puede cambiar por completo la clasificación final.",
        it:"Un percorso netto oggi può cambiare completamente la classifica finale.",
        de:"Eine Nullrunde heute kann die Endplatzierung völlig verändern.",
        ja:"今日 の クリア ラウンド が、 最終 順位 を まったく 変える こと が あり ます。" },

      { ref:"dbd-points-de-temps", temps:6, dit:"joueuse", mots:["temps-optimum","bareme"],
        fr:"Est-ce que j'ai eu des points de temps ? Quel barème s'applique ici ?",
        en:"Did I get any time penalties? Which scoring applies here?",
        es:"¿He tenido puntos de tiempo? ¿Qué baremo se aplica aquí?",
        it:"Ho preso penalità di tempo? Quale barème si applica qui?",
        de:"Habe ich Zeitfehler bekommen? Welche Wertung gilt hier?",
        ja:"タイム 減点 は あり まし た か ? ここ で は どの 減点 方式 です か ?" },

      { ref:"dbd-r-remise-prix", temps:6, dit:"club", mots:[], motsAilleurs:["trophee"],
        fr:"Remise des prix à seize heures. Tu viendras récupérer ta coupe, ta plaque et ton flot !",
        en:"Prize-giving at four. Come and collect your cup, your plaque and your rosette !",
        es:"Entrega de premios a las cuatro. ¡ Ven a recoger tu copa, tu placa y tu escarapela !",
        it:"Premiazione alle sedici. Vieni a ritirare la coppa, la placca e la coccarda !",
        de:"Siegerehrung um sechzehn Uhr. Hol deinen Pokal, dein Schild und deine Schleife !",
        ja:"表彰式 は 十六 時 です。 カップ、 プレート、 ロゼット を 受け取り に 来 て ください !" }
    ]
  }
};
