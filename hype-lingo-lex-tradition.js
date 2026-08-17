/* hype-lingo-lex-tradition.js — Hype Linguae · la tradition et le respect
   ==================================================================
   Écrit le 6 août 2026 pour Tokyo (Japon).
   Prévu par hype-linguae-production-suite.txt : « Tokyo — la tradition et
   le respect : le salut, l'ordre, le silence, l'apprentissage, le maître ».

   ⚠️ CE CHAPITRE EST DIFFÉRENT DES AUTRES, et c'est voulu. Partout
   ailleurs on apprend à nommer des objets et des gestes. Ici on apprend
   des CONVENTIONS — ce qu'on fait, dans quel ordre, et ce qu'on ne fait
   pas. Un mot mal placé n'est pas une faute de vocabulaire, c'est une
   impolitesse. D'où le niveau 3.

   ⚠️ LE PIÈGE CENTRAL, et la raison pour laquelle ce chapitre valait
   d'être écrit : en anglais, `le salut` (la révérence) et `l'arc` (l'arme)
   sont LE MÊME MOT, « bow ». Les deux sont dans ce chapitre, à quelques
   lignes d'écart, parce que le yabusame les met côte à côte. C'est le seul
   endroit du module où deux mots français distincts se confondent en
   anglais — à ne pas séparer dans deux leçons.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif, et c'est ici que
   ça compte le plus : le japonais de ce chapitre porte sur la politesse,
   où le registre change tout. Les plus à confirmer : `稽古` (keiko) pour
   l'apprentissage, qui désigne l'entraînement sous un maître et non
   l'apprentissage en général ; `先生` (sensei) pour le maître, qui
   s'emploie comme titre après le nom et non comme nom commun ; et les
   formules de remerciement, dont le degré doit être vérifié.
   À reporter dans hype-linguae-doutes.md, EN PRIORITÉ.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.tradition = {
  ref: "tradition",
  chapitre: 17,
  titre: { fr:"La tradition", en:"Tradition", es:"La tradición", it:"La tradizione",
           de:"Die Tradition", ja:"伝統" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LA TRADITION ET LE RESPECT ============ */

  /* ================================================================
     TROIS ENTRÉES AJOUTÉES le 17/08/2026, d'après le lexique fourni par
     Blandine pour Tokyo. Le chapitre n'avait que douze mots — et il lui
     manquait son mot-titre.
     🟥 SA LECTURE DU CHAPITRE, à garder en tête pour tout ce qu'on y
     écrira : *« ici le vocabulaire seul ne suffit pas. Il faut
     comprendre QUAND faire les choses et DANS QUEL ORDRE. Une erreur
     peut devenir une maladresse de comportement, pas seulement une
     faute de langue. »*
     🟥 L'ORDRE QU'ELLE A POSÉ, et qui structure le dialogue :
     **entrer → saluer → observer → attendre son tour → pratiquer →
     remercier → saluer en partant.**
     ⚠️ NE PAS réordonner les temps du dialogue : la séquence EST le
     contenu, comme pour l'examen d'Édimbourg.
     ================================================================ */

  { ref:"tradition", lecon:1, coll:"tradition",
    mots:{ fr:{m:"la tradition"}, en:{m:"tradition", p:"tra-di-cheune"},
           es:{m:"la tradición"}, it:{m:"la tradizione"},
           de:{m:"die Tradition", p:"tra-di-tsione"}, ja:{m:"伝統", p:"dentō"} },
    def:{ fr:"🟥 LE MOT-TITRE DU CHAPITRE, et il ne veut pas dire ici ce qu'il veut dire en Europe. Une tradition occidentale se raconte ; une tradition japonaise SE FAIT — on la transmet par le geste répété, pas par l'explication. C'est pourquoi on observe avant d'essayer, et pourquoi le maître montre plus qu'il ne parle. ⚠️ Dans ce chapitre, ignorer la tradition n'est pas une faute de langue mais une maladresse de comportement.",
          en:"The chapter's key word, and it doesn't mean here what it means in Europe. A Western tradition is told; a Japanese tradition is DONE — passed on by the repeated gesture, not by explanation. That's why you watch before you try, and why the master shows more than he speaks.",
          es:"La palabra clave del capítulo, y no significa aquí lo que significa en Europa. Una tradición occidental se cuenta; una tradición japonesa SE HACE — se transmite por el gesto repetido.",
          it:"La parola chiave del capitolo, e qui non significa quel che significa in Europa. Una tradizione occidentale si racconta; una tradizione giapponese SI FA — si trasmette col gesto ripetuto.",
          de:"Das Schlüsselwort des Kapitels, und es bedeutet hier nicht dasselbe wie in Europa. Eine westliche Tradition wird erzählt; eine japanische Tradition wird GETAN — weitergegeben durch die wiederholte Bewegung.",
          ja:"この章の中心となる語。ヨーロッパでの意味とは異なります。西洋の伝統は語られるものですが、日本の伝統は「行う」もの。説明ではなく、繰り返される所作によって受け継がれます。だから試す前に見るのであり、師は語るより示すのです。" } },

  { ref:"attendre-son-tour", lecon:1, coll:"tradition",
    mots:{ fr:{m:"respecter son tour"}, en:{m:"to wait your turn", p:"ouéïte your teurne"},
           es:{m:"respetar su turno"}, it:{m:"rispettare il proprio turno"},
           de:{m:"warten, bis man dran ist", p:"var-teune"}, ja:{m:"順番を待つ", p:"junban o matsu"} },
    def:{ fr:"⚠️ CE N'EST PAS DE LA POLITESSE, C'EST LA STRUCTURE MÊME DE LA SÉANCE. L'ordre de passage n'est ni annoncé ni tiré au sort : il se lit — l'ancienneté, la place dans le rang, un signe du maître. Prendre son tour trop tôt est plus grave qu'un mauvais geste. 🟥 Le mot `attendre` traverse quatre villes de l'app : attendre un saut à Wellington et Hickstead, attendre son moniteur à Aberystwyth, attendre son tour ici. Même verbe, quatre sens.",
          en:"Not politeness but the structure of the session. The running order is neither announced nor drawn: you read it — seniority, your place in the line, a sign from the master. Taking your turn too early is worse than a poor movement.",
          es:"No es cortesía, es la estructura misma de la sesión. El orden no se anuncia ni se sortea: se lee — la antigüedad, el lugar en la fila, una señal del maestro.",
          it:"Non è cortesia, è la struttura stessa della seduta. L'ordine non si annuncia né si sorteggia: si legge — l'anzianità, il posto nella fila, un segno del maestro.",
          de:"Keine Höflichkeit, sondern die Struktur der Übungsstunde selbst. Die Reihenfolge wird nicht angekündigt und nicht ausgelost: man liest sie — Dienstalter, Platz in der Reihe, ein Zeichen des Meisters.",
          ja:"礼儀ではなく、稽古そのものの構造です。順番は告げられも抽選されもしません。年功、列の位置、師の合図から読み取ります。順番を先取りすることは、動作の不出来より重い過ちです。" } },

  { ref:"repeter", lecon:1, coll:"tradition",
    mots:{ fr:{m:"répéter le geste"}, en:{m:"to practise", p:"prak-tiss", var:"to practice (US)"},
           es:{m:"repetir el gesto"}, it:{m:"ripetere il gesto"},
           de:{m:"üben", p:"u-beune"}, ja:{m:"稽古する", p:"keiko suru"} },
    def:{ fr:"🟥 LE CŒUR DU CHAPITRE, ET LE CŒUR DU MOT KEIKO. On ne répète pas pour progresser mais pour que le geste cesse d'être une décision — jusqu'à ce qu'il devienne naturel. ⚠️ Piège d'orthographe anglaise : le VERBE s'écrit **to practise** avec un s en Grande-Bretagne, **to practice** avec un c aux États-Unis ; le NOM s'écrit *practice* des deux côtés. Une des rares différences orthographiques qui change selon la fonction du mot.",
          en:"The heart of the chapter and of the word keiko. You don't repeat to improve but so the movement stops being a decision — until it feels natural. Spelling trap: the verb is « to practise » with an s in Britain, « to practice » with a c in America; the noun is « practice » in both.",
          es:"El corazón del capítulo y de la palabra keiko. No se repite para progresar, sino para que el gesto deje de ser una decisión, hasta que resulte natural.",
          it:"Il cuore del capitolo e della parola keiko. Non si ripete per progredire, ma perché il gesto smetta di essere una decisione, fino a diventare naturale.",
          de:"Das Herz des Kapitels und des Wortes Keiko. Man wiederholt nicht, um besser zu werden, sondern damit die Bewegung keine Entscheidung mehr ist — bis sie natürlich wird.",
          ja:"この章の、そして「稽古」という語の核心。上達のために繰り返すのではありません。その動作が判断を要さなくなるまで、自然になるまで繰り返すのです。" } },

  { ref:"salut", lecon:1, coll:"tradition",
    mots:{ fr:{m:"le salut"}, en:{m:"the bow", p:"baou"},
           es:{m:"el saludo"}, it:{m:"il saluto"},
           de:{m:"die Verbeugung", p:"fèr-boï-goung"}, ja:{m:"お辞儀", p:"ojigi"} },
    def:{ fr:"L'inclinaison du buste, en entrant et en sortant. ⚠️ En anglais « bow » se prononce « baou » pour le salut, mais « bô » pour l'arc — même orthographe, deux mots. On salue le lieu autant que les personnes.",
          en:"The bend of the body, on entering and leaving. « Bow » is said « baou » for this, but « boh » for the weapon: same spelling, two words.",
          es:"La inclinación del busto, al entrar y al salir. ⚠️ En inglés « bow » se pronuncia « bau » para el saludo, pero « bou » para el arco — misma grafía, dos palabras. Se saluda al lugar tanto como a las personas.",
          it:"L'inclinazione del busto, entrando e uscendo. ⚠️ In inglese « bow » si pronuncia « bau » per il saluto, ma « bou » per l'arco — stessa grafia, due parole. Si saluta il luogo quanto le persone.",
          de:"Die Verneigung des Oberkörpers, beim Betreten und beim Gehen. ⚠️ « Bow » spricht sich « bau » für den Gruß, aber « boh » für den Bogen — gleiche Schreibung, zwei Wörter. Man grüßt den Ort ebenso wie die Menschen.",
          ja:"入るときと出るときの、上体のお辞儀。⚠️ 英語の « bow » はお辞儀なら「バウ」、弓なら「ボウ」— 綴りは同じで、別の言葉です。人にだけでなく、場所そのものにも礼をします。" } },

  { ref:"maitre", lecon:1, coll:"tradition",
    mots:{ fr:{m:"le maître"}, en:{m:"the master", p:"mass-teur"},
           es:{m:"el maestro"}, it:{m:"il maestro"},
           de:{m:"der Meister", p:"maïss-teur"}, ja:{m:"先生", p:"sensei"} },
    def:{ fr:"Celui qui enseigne. ⚠️ En japonais « sensei » se place APRÈS le nom, comme un titre — Tanaka-sensei — et ne s'emploie pas seul pour parler de quelqu'un à la troisième personne.",
          en:"The one who teaches. In Japanese « sensei » follows the name, as a title — Tanaka-sensei — and is not used alone in the third person.",
          es:"El que enseña. ⚠️ En japonés « sensei » se coloca DESPUÉS del nombre, como un título — Tanaka-sensei — y no se emplea solo para hablar de alguien en tercera persona.",
          it:"Chi insegna. ⚠️ In giapponese « sensei » si mette DOPO il nome, come un titolo — Tanaka-sensei — e non si usa da solo per parlare di qualcuno in terza persona.",
          de:"Wer lehrt. ⚠️ Im Japanischen steht « sensei » NACH dem Namen, wie ein Titel — Tanaka-sensei — und wird nicht allein gebraucht, um in der dritten Person über jemanden zu sprechen.",
          ja:"教える人のこと。⚠️ 「先生」は田中先生のように名前のあとに置く敬称で、第三者について語るとき単独では使いません。" } },

  { ref:"apprentissage", lecon:1, coll:"tradition",
    mots:{ fr:{m:"l'apprentissage"}, en:{m:"the practice", p:"prak-tiss", var:"the training"},
           es:{m:"el aprendizaje"}, it:{m:"l'apprendistato"},
           de:{m:"die Lehre", p:"lé-re"}, ja:{m:"稽古", p:"keiko"} },
    def:{ fr:"⚠️ « Keiko » ne veut pas dire apprendre en général : c'est l'entraînement répété sous l'œil d'un maître, la même chose refaite jusqu'à ce qu'elle cesse d'être une décision. Le mot porte l'idée de répétition, pas de progression.",
          en:"« Keiko » is not learning in general: it is repeated training under a master's eye, the same thing done until it stops being a decision.",
          es:"⚠️ « Keiko » no significa aprender en general: es el entrenamiento repetido bajo la mirada de un maestro, lo mismo rehecho hasta que deja de ser una decisión. La palabra lleva la idea de repetición, no de progresión.",
          it:"⚠️ « Keiko » non vuol dire imparare in generale: è l'allenamento ripetuto sotto l'occhio di un maestro, la stessa cosa rifatta finché smette di essere una decisione. La parola porta l'idea di ripetizione, non di progressione.",
          de:"⚠️ « Keiko » heißt nicht Lernen im Allgemeinen: Es ist das wiederholte Üben unter dem Auge eines Meisters — dasselbe, so lange getan, bis es keine Entscheidung mehr ist. Das Wort trägt die Wiederholung in sich, nicht den Fortschritt.",
          ja:"⚠️ 「稽古」は一般に「学ぶ」ことではありません。師の目の下で繰り返す鍛錬 — 同じことを、決断でなくなるまでやり直すこと。この言葉が担うのは反復であって、上達ではないのです。" } },

  { ref:"observer", lecon:1, coll:"tradition",
    mots:{ fr:{m:"observer d'abord"}, en:{m:"to watch first", p:"ouotch feurst"},
           es:{m:"observar primero"}, it:{m:"osservare prima"},
           de:{m:"zuerst zusehen", p:"tsou-érst tsou-zé-eune"},
           ja:{m:"まず見る", p:"mazu miru"} },
    def:{ fr:"Le premier geste de l'élève : ne pas toucher, regarder. Dans beaucoup d'écuries japonaises, on passe des semaines à observer avant d'être autorisé à faire — et poser une question trop tôt est mal vu.",
          en:"The pupil's first act: not to touch, but to watch. In many Japanese yards you observe for weeks before being allowed to do — and asking too early is frowned upon.",
          es:"El primer gesto del alumno: no tocar, mirar. En muchas cuadras japonesas se pasan semanas observando antes de estar autorizado a hacer — y preguntar demasiado pronto está mal visto.",
          it:"Il primo gesto dell'allievo: non toccare, guardare. In molte scuderie giapponesi si passano settimane a osservare prima di essere autorizzati a fare — e fare domande troppo presto è malvisto.",
          de:"Die erste Handlung des Schülers: nicht anfassen, zusehen. In vielen japanischen Ställen schaut man wochenlang zu, bevor man tun darf — und zu früh zu fragen gilt als unhöflich.",
          ja:"弟子の最初の仕事。触らず、見ること。日本の厩舎では、やらせてもらえるまで何週間も見て過ごすことが多く、早すぎる質問はよく思われません。" } },

  { ref:"silence", lecon:1, coll:"tradition",
    mots:{ fr:{m:"le silence"}, en:{m:"the silence", p:"saï-leunss"},
           es:{m:"el silencio"}, it:{m:"il silenzio"},
           de:{m:"die Stille", p:"chti-le"}, ja:{m:"静けさ", p:"shizukesa"} },
    def:{ fr:"Ce n'est pas l'absence de bruit, c'est une manière de travailler. On ne commente pas, on ne se félicite pas à voix haute, on ne remplit pas les blancs — et le cheval y gagne autant que les gens.",
          en:"Not the absence of noise but a way of working. You do not comment, you do not congratulate out loud, you do not fill the gaps — and the horse gains as much as the people.",
          es:"No es la ausencia de ruido, es una manera de trabajar. No se comenta, no se felicita en voz alta, no se rellenan los huecos — y el caballo gana tanto como las personas.",
          it:"Non è l'assenza di rumore, è un modo di lavorare. Non si commenta, non ci si congratula ad alta voce, non si riempiono i vuoti — e il cavallo ci guadagna quanto le persone.",
          de:"Nicht die Abwesenheit von Lärm, sondern eine Art zu arbeiten. Man kommentiert nicht, lobt nicht laut, füllt keine Pausen — und das Pferd gewinnt dabei so viel wie die Menschen.",
          ja:"音がないことではなく、働き方そのもの。口を挟まず、声高に褒めず、間を埋めない — その静けさで得をするのは、人と同じだけ馬なのです。" } },

  { ref:"ordre", lecon:1, coll:"tradition",
    mots:{ fr:{m:"l'ordre"}, en:{m:"the order", p:"or-deur"},
           es:{m:"el orden"}, it:{m:"l'ordine"},
           de:{m:"die Reihenfolge", p:"raï-eune-fol-gue"},
           ja:{m:"順番", p:"junban"} },
    def:{ fr:"Qui passe avant qui, et pourquoi. L'ordre suit l'ancienneté, pas le niveau : on ne se met pas devant quelqu'un qui est arrivé avant soi, même si l'on monte mieux.",
          en:"Who goes before whom, and why. Order follows seniority, not ability: you do not go ahead of someone who arrived before you, even if you ride better.",
          es:"Quién pasa antes que quién, y por qué. El orden sigue la antigüedad, no el nivel: no te pones delante de alguien que llegó antes que tú, aunque montes mejor.",
          it:"Chi passa prima di chi, e perché. L'ordine segue l'anzianità, non il livello: non ti metti davanti a chi è arrivato prima di te, anche se monti meglio.",
          de:"Wer vor wem geht, und warum. Die Reihenfolge folgt dem Dienstalter, nicht dem Können: Man stellt sich nicht vor jemanden, der vor einem kam — auch wenn man besser reitet.",
          ja:"誰が誰より先か、そしてなぜか。順番が従うのは在籍の長さであって、腕前ではありません。自分のほうが上手でも、先に来た人の前には出ないのです。" } },

  { ref:"dechausser", lecon:1, coll:"tradition",
    mots:{ fr:{m:"se déchausser"}, en:{m:"to take off your shoes", p:"tèk off"},
           es:{m:"descalzarse"}, it:{m:"togliersi le scarpe"},
           de:{m:"die Schuhe ausziehen", p:"chou-e aouss-tsi-eune"},
           ja:{m:"靴を脱ぐ", p:"kutsu o nugu"} },
    def:{ fr:"À l'entrée du bureau, du club-house, de toute pièce à plancher. ⚠️ Ça vaut aussi en bottes d'équitation, et c'est le premier faux pas d'un cavalier étranger — on cherche un chausse-pied, il n'y en a pas.",
          en:"At the entrance of the office, the clubhouse, any room with a floor. It applies in riding boots too, and it is a visiting rider's first mistake.",
          es:"A la entrada de la oficina, del club, de toda pieza con suelo de madera. ⚠️ Vale también con botas de montar, y es el primer tropiezo del jinete extranjero — buscas un calzador, no lo hay.",
          it:"All'ingresso dell'ufficio, del club, di ogni stanza col pavimento. ⚠️ Vale anche con gli stivali da equitazione, ed è il primo passo falso del cavaliere straniero — cerchi un calzascarpe, non c'è.",
          de:"Am Eingang des Büros, des Clubhauses, jedes Raums mit Boden. ⚠️ Das gilt auch in Reitstiefeln — und es ist der erste Fehltritt des fremden Reiters: Man sucht einen Schuhlöffel, es gibt keinen.",
          ja:"事務所でも、クラブハウスでも、床のある部屋なら入り口で。⚠️ 乗馬ブーツでも同じです。外国から来た騎手が最初につまずくのがここ — 靴べらを探しても、ないのです。" } },

  { ref:"remercier", lecon:1, coll:"tradition",
    mots:{ fr:{m:"remercier"}, en:{m:"to thank", p:"thannk"},
           es:{m:"agradecer"}, it:{m:"ringraziare"},
           de:{m:"danken", p:"dann-keune"},
           ja:{m:"ありがとうございました", p:"arigatō gozaimashita"} },
    def:{ fr:"⚠️ En japonais on remercie AU PASSÉ à la fin d'une séance — « arigatō gozaimashita » — parce qu'on remercie de ce qui a eu lieu. Dire la forme au présent en partant sonne comme si l'on n'avait pas fini.",
          en:"In Japanese you thank in the PAST tense at the end of a session — arigatō gozaimashita — because you thank for what has happened.",
          es:"⚠️ En japonés se agradece EN PASADO al final de una sesión — « arigatō gozaimashita » — porque se agradece lo que ha tenido lugar. Decir la forma en presente al irse suena como si no hubieras terminado.",
          it:"⚠️ In giapponese si ringrazia AL PASSATO alla fine di una seduta — « arigatō gozaimashita » — perché si ringrazia per ciò che ha avuto luogo. Dire la forma al presente andandosene suona come se non avessi finito.",
          de:"⚠️ Im Japanischen dankt man am Ende einer Einheit in der VERGANGENHEIT — « arigatō gozaimashita » —, weil man für das dankt, was stattgefunden hat. Die Gegenwartsform beim Gehen klingt, als wäre man nicht fertig.",
          ja:"⚠️ 稽古の終わりのお礼は過去形で —「ありがとうございました」。すでに起こったことへの感謝だからです。帰りぎわに現在形で言うと、まだ終わっていないように響きます。" } },

  { ref:"tenue-ceremonie", lecon:1, coll:"tradition",
    mots:{ fr:{m:"la tenue de cérémonie"}, en:{m:"the ceremonial dress", p:"sé-ri-mo-nial"},
           es:{m:"el traje ceremonial"}, it:{m:"l'abito da cerimonia"},
           de:{m:"die Festtracht", p:"fèst-trakht"},
           ja:{m:"装束", p:"shōzoku"} },
    def:{ fr:"L'habit des cérémonies équestres, hérité des cavaliers du Moyen Âge japonais : chapeau plat, manches larges, jambières. On ne le porte pas pour monter tous les jours.",
          en:"The dress of equestrian ceremonies, inherited from medieval Japanese horsemen: flat hat, wide sleeves, leggings. It is not everyday riding kit.",
          es:"El traje de las ceremonias ecuestres, heredado de los jinetes del Japón medieval: sombrero plano, mangas anchas, perneras. No se lleva para montar a diario.",
          it:"L'abito delle cerimonie equestri, ereditato dai cavalieri del Giappone medievale: cappello piatto, maniche larghe, gambali. Non si porta per montare tutti i giorni.",
          de:"Das Gewand der Reiterzeremonien, ererbt von den Reitern des japanischen Mittelalters: flacher Hut, weite Ärmel, Beinlinge. Zum Alltagsreiten trägt man es nicht.",
          ja:"馬上の儀式のための装い。中世日本の騎手たちから受け継がれたものです — 平たい笠、広い袖、行縢。ふだんの騎乗で着るものではありません。" } },

  { ref:"yabusame", lecon:1, coll:"tradition",
    mots:{ fr:{m:"le yabusame"}, en:{m:"yabusame", p:"ya-bou-sa-mé"},
           es:{m:"el yabusame"}, it:{m:"lo yabusame"},
           de:{m:"das Yabusame"}, ja:{m:"流鏑馬", p:"yabusame"} },
    def:{ fr:"Le tir à l'arc à cheval, au galop, sur des cibles placées le long d'une piste droite. C'est un rite avant d'être un sport : il se court dans un sanctuaire, et la précision compte moins que la tenue.",
          en:"Mounted archery at the gallop, at targets set along a straight track. It is a rite before it is a sport: it is run at a shrine, and bearing counts more than accuracy.",
          es:"El tiro con arco a caballo, al galope, sobre blancos colocados a lo largo de una pista recta. Es un rito antes que un deporte: se corre en un santuario, y el porte cuenta más que la precisión.",
          it:"Il tiro con l'arco a cavallo, al galoppo, su bersagli posti lungo una pista dritta. È un rito prima che uno sport: si corre in un santuario, e il contegno conta più della precisione.",
          de:"Bogenschießen zu Pferd, im Galopp, auf Ziele entlang einer geraden Bahn. Es ist ein Ritus, bevor es ein Sport ist: geritten im Schrein — und die Haltung zählt mehr als die Treffer.",
          ja:"直線の馬場に沿って置かれた的を、駈歩のまま射抜く騎射。スポーツである前に神事です。走るのは神社の境内 — そして的中よりも、所作が重んじられます。" } },

  { ref:"arc", lecon:1, coll:"tradition",
    mots:{ fr:{m:"l'arc"}, en:{m:"the bow", p:"bô"},
           es:{m:"el arco"}, it:{m:"l'arco"},
           de:{m:"der Bogen", p:"bô-gueune"}, ja:{m:"弓", p:"yumi"} },
    def:{ fr:"⚠️ Même mot que le salut en anglais, prononcé autrement : « bô ». L'arc japonais est très long et se tient asymétriquement, la main basse au tiers — on ne le tend pas comme un arc occidental.",
          en:"The same spelling as the bow you make, said « boh ». The Japanese bow is very long and held asymmetrically, the hand a third of the way up.",
          es:"⚠️ La misma palabra que el saludo en inglés, pronunciada de otro modo: « bou ». El arco japonés es muy largo y se sujeta asimétricamente, la mano baja al tercio — no se tiende como un arco occidental.",
          it:"⚠️ La stessa parola del saluto in inglese, pronunciata diversamente: « bou ». L'arco giapponese è molto lungo e si tiene asimmetricamente, la mano bassa a un terzo — non si tende come un arco occidentale.",
          de:"⚠️ Dasselbe Wort wie der Gruß im Englischen, anders gesprochen: « boh ». Der japanische Bogen ist sehr lang und wird asymmetrisch gehalten, die Hand im unteren Drittel — gespannt wird er nicht wie ein westlicher Bogen.",
          ja:"⚠️ 英語ではお辞儀と同じ綴りで、発音だけが違います —「ボウ」。和弓はとても長く、握りは下から三分の一という非対称の位置。西洋の弓のようには引きません。" } },

  { ref:"cible", lecon:1, coll:"tradition",
    mots:{ fr:{m:"la cible"}, en:{m:"the target", p:"tar-guette"},
           es:{m:"el blanco"}, it:{m:"il bersaglio"},
           de:{m:"das Ziel", p:"tsile"}, ja:{m:"的", p:"mato"} },
    def:{ fr:"La planche de bois qui se brise quand la flèche touche. Le bruit sec du bois est ce que la foule attend : on entend le résultat avant de le voir.",
          en:"The wooden board that shatters when the arrow lands. The crack of the wood is what the crowd waits for: you hear the result before you see it.",
          es:"La tabla de madera que se rompe cuando la flecha acierta. El chasquido seco de la madera es lo que espera la multitud: el resultado se oye antes de verse.",
          it:"La tavola di legno che si spezza quando la freccia colpisce. Lo schiocco secco del legno è ciò che la folla aspetta: il risultato si sente prima di vederlo.",
          de:"Das Holzbrett, das zerbricht, wenn der Pfeil trifft. Das trockene Krachen des Holzes ist es, worauf die Menge wartet: Man hört das Ergebnis, bevor man es sieht.",
          ja:"矢が当たると割れる木の板。群衆が待っているのは、あの乾いた木の音です。結果は、目に見えるより先に耳に届くのです。" } }

  ],

  phrases: [

  { ref:"ph-tradition-chausser", lecon:1,
      fr:"On se déchausse avant d'entrer ?",
      en:"Do we take our shoes off before going in ?",
      es:"¿ Nos descalzamos antes de entrar ?",
      it:"Ci togliamo le scarpe prima di entrare ?",
      de:"Ziehen wir die Schuhe aus, bevor wir hineingehen ?",
      ja:"入る 前 に 靴 を 脱ぎ ます か ?" },

  { ref:"ph-tradition-regarder", lecon:1,
      fr:"Je peux regarder avant d'essayer ?",
      en:"May I watch before I try ?",
      es:"¿ Puedo mirar antes de probar ?",
      it:"Posso guardare prima di provare ?",
      de:"Darf ich zusehen, bevor ich es versuche ?",
      ja:"やっ て みる 前 に 見 て も いい です か ?" },

  { ref:"ph-tradition-ordre", lecon:1,
      fr:"Dans quel ordre passe-t-on ?",
      en:"In what order do we go ?",
      es:"¿ En qué orden pasamos ?",
      it:"In che ordine passiamo ?",
      de:"In welcher Reihenfolge gehen wir ?",
      ja:"どの 順番 で 進み ます か ?" },

  { ref:"ph-tradition-merci", lecon:1,
      fr:"Merci de m'avoir accueillie.",
      en:"Thank you for having me.",
      es:"Gracias por acogerme.",
      it:"Grazie per avermi accolta.",
      de:"Danke, dass ich dabei sein durfte.",
      ja:"受け入れ て くださり ありがとう ござい まし た。" }

  ],

  /* ==================================================================
     LE DIALOGUE DE TOKYO — 17 août 2026, session 214.

     LA SCÈNE : une séance de yabusame, du seuil au remerciement.
     20 phrases, 7 temps.

     🟥 LA LECTURE DE BLANDINE, qui commande tout le chapitre :
     *« ici le vocabulaire seul ne suffit pas. Il faut comprendre QUAND
     faire les choses et DANS QUEL ORDRE. Une erreur peut devenir une
     maladresse de comportement, pas seulement une faute de langue. »*
     🟥 ET L'ORDRE QU'ELLE A POSÉ, qui EST la structure des temps :
     **entrer → saluer → observer → attendre son tour → pratiquer →
     remercier → saluer en partant.**
     ⚠️ NE PAS RÉORDONNER LES TEMPS. C'est le seul chapitre de l'app,
     avec l'examen d'Édimbourg, où la séquence est le contenu.

     🟥 DIX-HUIT PHRASES SUR VINGT SONT DE BLANDINE, avec leur traduction
     anglaise. Les quatre premières existaient déjà comme phrases
     d'exercice dans ce fichier — elles deviennent le socle du dialogue.

     ⚠️ CE QUE CE CHAPITRE A D'UNIQUE DANS L'APP : presque tout est
     PRODUIT par la joueuse, et presque tout est une QUESTION sur la
     conduite à tenir — « est-ce que je dois saluer », « est-ce que je
     peux me placer ici », « dois-je remercier ». Ailleurs elle demande
     des choses ; ici elle demande la permission.

     🟥 LE PIÈGE DU CHAPITRE, déjà dans le lexique et employé deux fois
     dans le dialogue : **BOW** s'écrit pareil pour LE SALUT et POUR
     L'ARC, et ne se prononce pas pareil — « baou » pour l'inclinaison,
     « bô » pour l'arc. Deux phrases le mettent côte à côte exprès
     (temps 2 et temps 6). ⚠️ NE PAS les séparer.

     ⚠️ ET LE KEIKO : `repeter` ne veut pas dire progresser. On répète
     jusqu'à ce que le geste cesse d'être une décision. La phrase « je
     vais recommencer jusqu'à ce que le geste devienne naturel » est
     exactement cela, et elle vient d'elle.

     `dit` : "joueuse" = elle produit · "club" = le maître ou un élève.
  ================================================================== */
  dialogue: {
    ville: "tokyo", lecon: 1, temps: 7, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · le seuil ---- */
      { ref:"dt-dechausser", temps:1, dit:"joueuse", mots:["dechausser"],
        fr:"On se déchausse avant d'entrer ?",
        en:"Do we take our shoes off before going in?",
        es:"¿Nos descalzamos antes de entrar?",
        it:"Ci si toglie le scarpe prima di entrare?",
        de:"Zieht man die Schuhe aus, bevor man hineingeht?",
        ja:"入る 前 に 靴 を 脱ぎ ます か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-saluer-avant", temps:1, dit:"joueuse", mots:["salut"],
        fr:"Est-ce que je dois saluer avant d'entrer ?",
        en:"Should I bow before going in?",
        es:"¿Debo saludar antes de entrar?",
        it:"Devo salutare prima di entrare?",
        de:"Soll ich mich verbeugen, bevor ich hineingehe?",
        ja:"入る 前 に 礼 を し た ほう が いい です か ?" },

      /* ---- temps 2 · le salut, et le piège du mot ---- */
      /* 🟥 Phrase de Blandine. Le premier des deux « bow ». */
      { ref:"dt-saluer-sortant", temps:2, dit:"joueuse", mots:["salut"],
        fr:"Est-ce que je dois également saluer en sortant ?",
        en:"Should I bow when I leave as well?",
        es:"¿Debo saludar también al salir?",
        it:"Devo salutare anche uscendo?",
        de:"Soll ich mich auch beim Hinausgehen verbeugen?",
        ja:"出る とき も 礼 を し ます か ?" },

      { ref:"dt-r-on-salue-le-lieu", temps:2, dit:"club", mots:["salut","tradition"],
        fr:"On salue le lieu autant que les personnes, en entrant et en sortant.",
        en:"You bow to the place as much as to the people, coming in and going out.",
        es:"Se saluda al lugar tanto como a las personas, al entrar y al salir.",
        it:"Si saluta il luogo tanto quanto le persone, entrando e uscendo.",
        de:"Man verbeugt sich vor dem Ort so wie vor den Menschen, beim Kommen und beim Gehen.",
        ja:"人 に 対し て と 同じ よう に、 場 に 対し て も 礼 を し ます。 入る とき も 出る とき も。" },

      /* ---- temps 3 · observer avant de faire ---- */
      { ref:"dt-regarder-avant", temps:3, dit:"joueuse", mots:["observer"],
        fr:"Je peux regarder avant d'essayer ?",
        en:"May I watch before I try?",
        es:"¿Puedo mirar antes de intentarlo?",
        it:"Posso guardare prima di provare?",
        de:"Darf ich zuschauen, bevor ich es versuche?",
        ja:"やっ て みる 前 に、 見 て い て も いい です か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-observer-une-fois", temps:3, dit:"joueuse", mots:["observer","apprentissage"],
        fr:"Je préfère observer une première fois avant de le faire moi-même.",
        en:"I'd rather watch once before doing it myself.",
        es:"Prefiero observar una primera vez antes de hacerlo yo misma.",
        it:"Preferisco osservare una prima volta prima di farlo io.",
        de:"Ich schaue lieber erst einmal zu, bevor ich es selbst mache.",
        ja:"自分 で やる 前 に、 一 度 見 て おき たい です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-suivre-les-autres", temps:3, dit:"joueuse", mots:["observer","tradition"],
        fr:"Je vais suivre ce que font les autres.",
        en:"I'll follow what the others do.",
        es:"Voy a seguir lo que hacen los demás.",
        it:"Seguirò quello che fanno gli altri.",
        de:"Ich mache das nach, was die anderen tun.",
        ja:"ほか の 方 の やり方 に 従い ます。" },

      /* ---- temps 4 · l'ordre et le silence ---- */
      { ref:"dt-quel-ordre", temps:4, dit:"joueuse", mots:["ordre"],
        fr:"Dans quel ordre passe-t-on ?",
        en:"In what order do we go?",
        es:"¿En qué orden pasamos?",
        it:"In che ordine si passa?",
        de:"In welcher Reihenfolge geht es?",
        ja:"どの 順番 で 行い ます か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-me-placer-ici", temps:4, dit:"joueuse", mots:["attendre-son-tour","ordre"],
        fr:"Est-ce que je peux me placer ici, ou dois-je attendre mon tour ?",
        en:"May I stand here, or should I wait for my turn?",
        es:"¿Puedo colocarme aquí o debo esperar mi turno?",
        it:"Posso mettermi qui, o devo aspettare il mio turno?",
        de:"Darf ich mich hierhin stellen, oder soll ich warten, bis ich dran bin?",
        ja:"ここ に 立っ て い て も いい です か。 それとも 順番 を 待ち ます か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-qui-passe-premier", temps:4, dit:"joueuse", mots:["ordre","attendre-son-tour"],
        fr:"Qui passe en premier ?",
        en:"Who goes first?",
        es:"¿Quién pasa primero?",
        it:"Chi passa per primo?",
        de:"Wer ist zuerst dran?",
        ja:"最初 に 行う の は どなた です か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-rester-silencieux", temps:4, dit:"joueuse", mots:["silence"],
        fr:"Est-ce qu'on doit rester silencieux pendant la séance ?",
        en:"Should we remain quiet during the session?",
        es:"¿Hay que permanecer en silencio durante la sesión?",
        it:"Bisogna restare in silenzio durante la seduta?",
        de:"Soll man während der Übungsstunde still bleiben?",
        ja:"稽古 の 間 は 静か に し て いる べき です か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-pas-interrompre", temps:4, dit:"joueuse", mots:["silence","maitre"],
        fr:"Je ne veux pas interrompre le maître pendant qu'il explique.",
        en:"I don't want to interrupt the instructor while he is explaining.",
        es:"No quiero interrumpir al maestro mientras explica.",
        it:"Non voglio interrompere il maestro mentre spiega.",
        de:"Ich möchte den Meister nicht unterbrechen, während er erklärt.",
        ja:"師 が 説明 し て いる 間 は、 遮り たく あり ませ ん。" },

      /* ---- temps 5 · pratiquer, le keiko ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dt-montrer-encore", temps:5, dit:"joueuse", mots:["maitre","repeter"],
        fr:"Pouvez-vous me montrer le geste une nouvelle fois ?",
        en:"Could you show me the movement one more time?",
        es:"¿Puede mostrarme el gesto una vez más?",
        it:"Può mostrarmi il gesto ancora una volta?",
        de:"Könnten Sie mir die Bewegung noch einmal zeigen?",
        ja:"もう一度 その 動き を 見せ て いただけ ます か ?" },

      /* 🟥 Phrase de Blandine : C'EST LA DÉFINITION DU KEIKO. */
      { ref:"dt-jusqua-naturel", temps:5, dit:"joueuse", mots:["repeter","apprentissage"],
        fr:"Je vais recommencer jusqu'à ce que le geste devienne naturel.",
        en:"I'll keep practising until the movement feels natural.",
        es:"Voy a repetirlo hasta que el gesto resulte natural.",
        it:"Ricomincerò finché il gesto non diventerà naturale.",
        de:"Ich übe weiter, bis die Bewegung natürlich wird.",
        ja:"自然 に できる よう に なる まで、 繰り返し 稽古 し ます。" },

      { ref:"dt-r-keiko", temps:5, dit:"club", mots:["repeter","maitre","apprentissage"],
        fr:"C'est cela, le keiko : refaire la même chose jusqu'à ce qu'elle cesse d'être une décision.",
        en:"That is keiko: doing the same thing until it stops being a decision.",
        es:"Eso es el keiko: repetir lo mismo hasta que deje de ser una decisión.",
        it:"Questo è il keiko: rifare la stessa cosa finché non smette di essere una decisione.",
        de:"Das ist Keiko: dasselbe tun, bis es keine Entscheidung mehr ist.",
        ja:"それ が 稽古 です。 同じ こと を、 判断 で なく なる まで 繰り返す こと。" },

      /* ---- temps 6 · le yabusame, et le second « bow » ---- */
      /* 🟥 Phrase de Blandine. Le second des deux « bow ». */
      { ref:"dt-tenir-arc", temps:6, dit:"joueuse", mots:["arc","yabusame"],
        fr:"Comment tient-on cet arc à cheval ?",
        en:"How do you hold this bow on horseback?",
        es:"¿Cómo se sostiene este arco a caballo?",
        it:"Come si tiene questo arco a cavallo?",
        de:"Wie hält man diesen Bogen zu Pferd?",
        ja:"馬上 で この 弓 は どう 持ち ます か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-toujours-galop", temps:6, dit:"joueuse", mots:["yabusame","cible"],
        fr:"Le yabusame se pratique-t-il toujours au galop ?",
        en:"Is yabusame always performed at the gallop?",
        es:"¿El yabusame se practica siempre al galope?",
        it:"Lo yabusame si pratica sempre al galoppo?",
        de:"Wird Yabusame immer im Galopp geritten?",
        ja:"流鏑馬 は いつも 駈歩 で 行う の です か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dt-tenue-ceremonies", temps:6, dit:"joueuse", mots:["tenue-ceremonie"],
        fr:"Est-ce que cette tenue est réservée aux cérémonies ?",
        en:"Is this outfit only worn for ceremonies?",
        es:"¿Esta indumentaria se lleva solo en las ceremonias?",
        it:"Questo abito si porta solo per le cerimonie?",
        de:"Wird diese Tracht nur zu Zeremonien getragen?",
        ja:"この 装束 は 儀式 の とき だけ 着る もの です か ?" },

      /* ---- temps 7 · remercier, et saluer en partant ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dt-remercier-maitre", temps:7, dit:"joueuse", mots:["remercier","maitre"],
        fr:"Dois-je remercier le maître à la fin de la séance ?",
        en:"Should I thank the instructor at the end of the session?",
        es:"¿Debo dar las gracias al maestro al final de la sesión?",
        it:"Devo ringraziare il maestro alla fine della seduta?",
        de:"Soll ich mich am Ende der Stunde beim Meister bedanken?",
        ja:"稽古 の 最後 に、 師 に お礼 を 言う べき です か ?" },

      { ref:"dt-merci-accueillie", temps:7, dit:"joueuse", mots:["remercier","salut"],
        fr:"Merci de m'avoir accueillie.",
        en:"Thank you for having me.",
        es:"Gracias por acogerme.",
        it:"Grazie per avermi accolta.",
        de:"Vielen Dank, dass ich dabei sein durfte.",
        ja:"お迎え いただき、 ありがとう ござい まし た。" }
    ]
  }
};
