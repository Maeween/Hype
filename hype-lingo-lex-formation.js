/* hype-lingo-lex-formation.js — Hype Linguae · Warendorf · « La formation »
   ==================================================================
   17 CONCEPTS, UNE LEÇON. Ville : WARENDORF.

   🟥 POURQUOI CE FICHIER EXISTE — 17 août 2026, session 214.
   Warendorf utilisait la LEÇON 4 DE `materiel` : son chapitre s'appelle
   « La formation » et on lui servait du vocabulaire d'équipement. Rien
   à voir. Décision de Blandine : *« crée formation à Warendorf »*, et
   *« on fera materiel ailleurs plus tard »* — la leçon 4 de `materiel`
   reste donc LIBRE pour une autre ville.
   ⚠️ `ETAPE_SRC` a été modifié le même jour : `warendorf: [["formation",1]]`.
   NE PAS le rebrancher sur `materiel`.

   🟥 LA NOTION AU CENTRE DU CHAPITRE, posée par Blandine :
   **ON FORME LE COUPLE, PAS SEULEMENT LE CAVALIER.**
     rider development + horse development = the partnership
   Et la progression allemande, en trois temps :
     **FOUNDATIONS → CONSISTENCY → PERFORMANCE**
     les bases → la régularité → la performance
   ⚠️ C'est ce qui distingue Warendorf de Saumur : Saumur enseigne À
   ENSEIGNER, Warendorf enseigne À PROGRESSER. Et de Santa Ynez, qui
   enseigne à SENTIR. Trois villes de pédagogie, trois angles.

   🟥 LE PIÈGE DE LANGUE DU CHAPITRE, et il est excellent :
   **SQUAD ≠ TEAM.** « He is in the German squad » ne veut pas dire
   « he is in the German team ». Le *squad* est le groupe de cavaliers
   sélectionnés et suivis dans la filière ; la *team* est l'équipe de
   quatre qui part au championnat. On peut être dans le squad toute sa
   carrière sans jamais entrer dans la team.
   ⚠️ Et l'allemand dit **der Kader**, mot qu'on croise partout à
   Warendorf : les *Kaderangehörige* sont les membres des cadres.
   NE PAS traduire « Kader » par « team ».

   ⚠️ LE CENTRE FÉDÉRAL FORME AUSSI DES PROFESSIONNELS — le métier de
   **Pferdewirt**, dans les spécialités équitation, élevage et soins.
   D'où la double lecture du chapitre : ici on apprend à devenir
   cavalier, mais aussi à devenir professionnel.
   ⚠️ Le mot n'a AUCUN équivalent français : « Pferdewirt » se traduirait
   par « gestionnaire de chevaux », ce qui ne se dit pas. C'est un
   diplôme d'État allemand, pas une profession libre.

   ⚠️ AUCUN CENTRE ÉQUESTRE PRIVÉ FRANÇAIS N'EST CITÉ, ici ni ailleurs —
   décision de Blandine du 8 août 2026. Warendorf est un centre FÉDÉRAL,
   ce qui autorise la mention.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE, en particulier sur l'espagnol et
   l'italien du vocabulaire de filière sportive : les structures
   nationales ne se recoupent pas, et les mots suivent les structures.
   Les entrées marquées // ?? sont celles dont je suis le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.formation = {
  ref: "formation",
  chapitre: 24,
  titre: { fr:"La formation", en:"Training and education", es:"La formación",
           it:"La formazione", de:"Die Ausbildung", ja:"育成" },
  lecons: 1,

  concepts: [

  { ref:"la-formation", lecon:1, coll:"filiere",
    mots:{ fr:{m:"la formation"}, en:{m:"training", p:"tré-ninng", var:"education"},
           es:{m:"la formación"}, it:{m:"la formazione"},
           de:{m:"die Ausbildung", p:"aouss-bil-doung"}, ja:{m:"育成", p:"ikusei"} },
    def:{ fr:"⚠️ EN ANGLAIS UN SEUL MOT POUR DEUX CHOSES : **training** dit à la fois la formation d'un cavalier et l'entraînement d'un cheval. Le français les sépare — on forme un cavalier, on entraîne un cheval — et l'allemand aussi : *Ausbildung* pour l'un, *Training* pour l'autre. 🟥 Ce chapitre porte les deux ensemble, parce que le système allemand forme LE COUPLE.",
          en:"One word for two things: « training » covers both a rider's education and a horse's work. French separates them, and so does German: Ausbildung for one, Training for the other. This chapter carries both, because the German system develops the PARTNERSHIP.",
          es:"El inglés usa una sola palabra para las dos cosas. El español separa: formación del jinete, entrenamiento del caballo. Este capítulo lleva las dos juntas.",
          it:"L'inglese usa una sola parola per due cose. L'italiano separa: formazione del cavaliere, allenamento del cavallo. Questo capitolo porta entrambe.",
          de:"Englisch hat ein Wort für zwei Dinge. Deutsch trennt: Ausbildung für den Reiter, Training für das Pferd. Dieses Kapitel trägt beides.",
          ja:"英語では一語で二つを指します。training は騎手の育成と馬の調教の両方を意味します。フランス語もドイツ語も分けて言います。この章は両方を扱います。ドイツの制度が「人馬」を育てるからです。" } },

  { ref:"entrainement", lecon:1, coll:"filiere",
    mots:{ fr:{m:"l'entraînement"}, en:{m:"training", p:"tré-ninng"},
           es:{m:"el entrenamiento"}, it:{m:"l'allenamento"},
           de:{m:"das Training", p:"trè-ninng"}, ja:{m:"訓練", p:"kunren"} },
    def:{ fr:"Le travail régulier, séance après séance. ⚠️ À distinguer de la formation : on s'entraîne pour maintenir et progresser, on se forme pour apprendre un métier ou obtenir un diplôme. En anglais le même mot couvre les deux, ce qui oblige à préciser par le contexte.",
          en:"The regular work, session after session. Distinct from education: you train to maintain and improve, you are educated to learn a trade. English uses one word for both, so context has to carry the difference.",
          es:"El trabajo regular, sesión tras sesión. Distinto de la formación: se entrena para mantener y progresar, se forma para aprender un oficio.",
          it:"Il lavoro regolare, seduta dopo seduta. Distinto dalla formazione: si allena per mantenere e progredire, si forma per imparare un mestiere.",
          de:"Die regelmäßige Arbeit, Einheit für Einheit. Zu unterscheiden von der Ausbildung: man trainiert, um zu erhalten und zu verbessern.",
          ja:"一回一回積み重ねる日常の稽古。育成とは区別します。訓練は維持と向上のため、育成は職を身につけるためです。" } },

  { ref:"entraineur", lecon:1, coll:"filiere",
    mots:{ fr:{m:"l'entraîneur"}, en:{m:"the trainer", p:"tré-neur", var:"the coach"},
           es:{m:"el entrenador"}, it:{m:"l'allenatore"},
           de:{m:"der Trainer", p:"trè-neur"}, ja:{m:"コーチ", p:"kōchi"} },
    def:{ fr:"⚠️ **TRAINER** ET **COACH** NE SONT PAS INTERCHANGEABLES EN ANGLAIS : le *trainer* travaille le cheval, le *coach* travaille le cavalier. Beaucoup de cavaliers ont les deux, et ce ne sont pas les mêmes personnes. Le français dit « entraîneur » pour les deux, l'allemand aussi.",
          en:"« Trainer » and « coach » are not interchangeable: the trainer works the horse, the coach works the rider. Many riders have both, and they are not the same people. French and German use one word for both.",
          es:"En inglés « trainer » y « coach » no son intercambiables: el trainer trabaja al caballo, el coach al jinete.",
          it:"In inglese « trainer » e « coach » non sono interscambiabili: il trainer lavora il cavallo, il coach il cavaliere.",
          de:"Im Englischen sind « trainer » und « coach » nicht dasselbe: der Trainer arbeitet das Pferd, der Coach den Reiter.",
          ja:"英語の trainer と coach は同じではありません。trainer は馬を調教し、coach は騎手を指導します。両方いる騎手も多く、別人です。" } },

  { ref:"stage", lecon:1, coll:"filiere",
    mots:{ fr:{m:"le stage"}, en:{m:"the training camp", p:"tré-ninng kamp", var:"the clinic"},
           es:{m:"el curso intensivo"}, it:{m:"lo stage"},
           de:{m:"der Lehrgang", p:"lèr-gann"}, ja:{m:"合宿", p:"gasshuku"} },
    def:{ fr:"🟥 FAUX AMI REDOUTABLE : « stage » en anglais veut dire ESTRADE ou ÉTAPE, jamais un stage de formation. On dit **a training camp** pour plusieurs jours, **a clinic** pour un ou deux jours avec un intervenant. Dire « I'm doing a stage » ne veut rien dire. ⚠️ L'allemand dit *Lehrgang*, « le parcours d'enseignement » — et à Warendorf environ deux mille cavaliers et quatre mille chevaux y passent chaque année.",
          en:"A dangerous false friend: French « stage » means a course, but English « stage » means a platform or a step. Say « a training camp » for several days, « a clinic » for one or two with a visiting instructor.",
          es:"Falso amigo temible: el francés « stage » significa curso, pero el inglés « stage » es un escenario o una etapa. Se dice « training camp » o « clinic ».",
          it:"Falso amico temibile: il francese « stage » significa corso, ma l'inglese « stage » è un palco o una tappa. Si dice « training camp » o « clinic ».",
          de:"Gefährlicher falscher Freund: das französische « stage » heißt Lehrgang, das englische « stage » aber Bühne oder Etappe. Man sagt « training camp » oder « clinic ».",
          ja:"危険な偽の友。フランス語の stage は「講習」ですが、英語の stage は「舞台」「段階」です。数日なら training camp、一〜二日なら clinic と言います。ヴァレンドルフでは年間約二千人の騎手と四千頭の馬が講習に参加します。" } },

  { ref:"cavalier-formation", lecon:1, coll:"filiere",
    mots:{ fr:{m:"le cavalier en formation"}, en:{m:"the trainee rider", p:"tré-nii raï-deur"},
           es:{m:"el jinete en formación"}, it:{m:"il cavaliere in formazione"},
           de:{m:"der Auszubildende", p:"aouss-tsou-bil-den-de"}, ja:{m:"研修中の騎手", p:"kenshūchū no kishu"} },
    def:{ fr:"⚠️ L'allemand *Auszubildende* — abrégé partout en **Azubi** — désigne quelqu'un en formation professionnelle reconnue, avec un contrat et un examen d'État. Ce n'est pas un stagiaire : c'est un apprenti diplômant. Le mot n'a pas d'équivalent exact en français.",
          en:"German « Auszubildende », shortened everywhere to « Azubi », means someone in recognised vocational training, with a contract and a state examination. Not an intern: an apprentice on a qualifying path.",
          es:"El alemán « Azubi » designa a alguien en formación profesional reconocida, con contrato y examen de Estado. No es un becario.",
          it:"Il tedesco « Azubi » indica qualcuno in formazione professionale riconosciuta, con contratto ed esame di Stato. Non è uno stagista.",
          de:"Auszubildende, überall zu « Azubi » verkürzt: jemand in anerkannter Berufsausbildung, mit Vertrag und staatlicher Prüfung. Kein Praktikant.",
          ja:"ドイツ語の Azubi は、契約と国家試験を伴う正式な職業訓練生を指します。インターンではなく、資格取得を目指す見習いです。" } },

  { ref:"pferdewirt", lecon:1, coll:"filiere",
    mots:{ fr:{m:"le métier du cheval"}, en:{m:"the horse professional", p:"prô-fè-cheu-neul"},
           es:{m:"el profesional del caballo"}, it:{m:"il professionista del cavallo"},
           de:{m:"der Pferdewirt", p:"pfèr-de-virt"}, ja:{m:"馬の専門職", p:"uma no senmonshoku"} },
    def:{ fr:"🟥 UN MOT ALLEMAND SANS ÉQUIVALENT NULLE PART. **Pferdewirt** est un diplôme d'État — trois ans, contrat d'apprentissage, examen — avec des spécialités : équitation, élevage, soins, courses. Mot à mot « gestionnaire de chevaux », ce qui ne se dit pas. ⚠️ Le centre fédéral de Warendorf participe à cette formation professionnelle : ici on n'apprend pas seulement à monter, on apprend un métier.",
          en:"A German word with no equivalent anywhere. « Pferdewirt » is a state qualification — three years, an apprenticeship contract, an examination — with specialisms: riding, breeding, care, racing. Warendorf takes part in this vocational training: here you don't only learn to ride, you learn a trade.",
          es:"Una palabra alemana sin equivalente. « Pferdewirt » es un título de Estado de tres años, con contrato de aprendizaje y examen, con especialidades.",
          it:"Una parola tedesca senza equivalenti. « Pferdewirt » è un titolo di Stato di tre anni, con contratto di apprendistato ed esame.",
          de:"Ein Staatsberuf: drei Jahre, Ausbildungsvertrag, Prüfung, mit den Fachrichtungen Reiten, Pferdezucht, Pferdehaltung, Rennreiten. Das Bundesleistungszentrum ist daran beteiligt.",
          ja:"どの言語にも対応語のないドイツ語。Pferdewirt は三年の見習い契約と国家試験を伴う公的資格で、騎乗、繁殖、飼養管理、競走の専門分野があります。ここでは乗ることだけでなく、職を学びます。" } },

  { ref:"jeune-cheval", lecon:1, coll:"couple",
    mots:{ fr:{m:"le jeune cheval"}, en:{m:"the young horse", p:"yeunng hors"},
           es:{m:"el caballo joven"}, it:{m:"il cavallo giovane"},
           de:{m:"das junge Pferd", p:"youn-gue pfèrt"}, ja:{m:"若馬", p:"wakauma"} },
    def:{ fr:"⚠️ EN ALLEMAGNE LES JEUNES CHEVAUX ONT LEURS PROPRES ÉPREUVES, distinctes du sport : on ne les fait pas concourir contre des chevaux faits. C'est le principe de la filière — chaque âge a son niveau, et un jeune cheval qui saute trop haut trop tôt est un cheval perdu. 🟥 « Ce jeune cheval n'est pas encore prêt pour ce niveau » n'est pas un aveu de faiblesse : c'est une décision de formation.",
          en:"In Germany young horses have their own classes, separate from sport: they don't compete against made horses. Each age has its level, and a young horse jumping too big too soon is a horse lost. Saying « he isn't ready for this level » isn't an admission of weakness — it's a training decision.",
          es:"En Alemania los caballos jóvenes tienen sus propias pruebas, separadas del deporte: no compiten contra caballos hechos. Cada edad tiene su nivel.",
          it:"In Germania i cavalli giovani hanno le loro prove, separate dallo sport: non gareggiano contro cavalli fatti. Ogni età ha il suo livello.",
          de:"In Deutschland haben junge Pferde ihre eigenen Prüfungen, getrennt vom Sport: sie starten nicht gegen fertige Pferde. Jedes Alter hat sein Niveau.",
          ja:"ドイツでは若馬に専用の競技があり、完成した馬とは競わせません。年齢ごとに水準があり、早すぎる高さを飛ばされた若馬は失われます。「この馬はまだこの水準ではない」は弱さの告白ではなく、育成上の判断です。" } },

  { ref:"les-bases", lecon:1, coll:"progression",
    mots:{ fr:{m:"les bases"}, en:{m:"the basics", p:"bé-siks", var:"the foundations"},
           es:{m:"las bases"}, it:{m:"le basi"},
           de:{m:"die Grundlagen", p:"grount-la-gueune"}, ja:{m:"基礎", p:"kiso"} },
    def:{ fr:"🟥 LE PREMIER DES TROIS TEMPS ALLEMANDS : **les bases → la régularité → la performance**. On ne demande davantage qu'une fois les bases consolidées, et « consolider » veut dire refaire longtemps ce qu'on sait déjà faire. ⚠️ En anglais **the basics** au pluriel, jamais « the base ». *The foundations* est plus solennel et s'emploie pour l'ensemble d'une éducation.",
          en:"The first of the three German stages: basics, then consistency, then performance. You only ask for more once the basics hold, and « establishing » them means doing what you already can for a long time. Always « the basics », plural.",
          es:"El primero de los tres tiempos alemanes: las bases, la regularidad, el rendimiento. No se pide más hasta que las bases estén consolidadas.",
          it:"Il primo dei tre tempi tedeschi: le basi, la regolarità, la prestazione. Non si chiede di più finché le basi non sono consolidate.",
          de:"Die erste der drei Stufen: Grundlagen, Gleichmäßigkeit, Leistung. Mehr verlangt man erst, wenn die Grundlagen sitzen.",
          ja:"ドイツ式三段階の第一。基礎 → 安定 → 成績。基礎が固まるまで、それ以上は求めません。「固める」とは、すでにできることを長く繰り返すことです。" } },

  { ref:"progression", lecon:1, coll:"progression",
    mots:{ fr:{m:"la progression"}, en:{m:"progression", p:"prô-grè-cheune", var:"development"},
           es:{m:"la progresión"}, it:{m:"la progressione"},
           de:{m:"die Entwicklung", p:"ènt-vik-loung"}, ja:{m:"進歩", p:"shinpo"} },
    def:{ fr:"🟥 ON FORME LE COUPLE, PAS SEULEMENT LE CAVALIER : *rider development + horse development = the partnership*. Les deux progressent, jamais au même rythme, et le travail consiste à ne pas laisser l'un devancer l'autre. ⚠️ « Brûler les étapes » se dit **to rush the process** en anglais, jamais « to burn the steps ».",
          en:"You develop the partnership, not just the rider: rider development plus horse development equals the partnership. Both progress, never at the same speed, and the job is to keep one from outrunning the other. « To rush the process », not « to burn the steps ».",
          es:"Se forma la pareja, no solo al jinete. Los dos progresan, nunca al mismo ritmo, y el trabajo consiste en que uno no se adelante al otro.",
          it:"Si forma il binomio, non solo il cavaliere. Entrambi progrediscono, mai allo stesso ritmo, e il lavoro sta nel non lasciare che uno superi l'altro.",
          de:"Man bildet das Paar aus, nicht nur den Reiter. Beide entwickeln sich, nie im gleichen Tempo, und die Arbeit besteht darin, dass keiner dem anderen vorausläuft.",
          ja:"育てるのは騎手だけでなく「人馬」です。二者はともに進歩しますが、決して同じ速さではありません。一方が他方を追い越さないようにすることが仕事です。" } },

  { ref:"position", lecon:1, coll:"progression",
    mots:{ fr:{m:"la position"}, en:{m:"the position", p:"pe-zi-cheune", var:"the seat"},
           es:{m:"la posición"}, it:{m:"la posizione"},
           de:{m:"der Sitz", p:"zitts"}, ja:{m:"姿勢", p:"shisei"} },
    def:{ fr:"⚠️ L'ALLEMAND DIT **DER SITZ**, « l'assiette », et c'est plus juste que « position » : il ne s'agit pas de tenir une forme mais de s'asseoir juste. L'anglais dit *the seat* dans le même sens. 🟥 Le premier objet de tout stage allemand est le haut du corps : un buste stable rend tout le reste possible.",
          en:"German says « der Sitz », the seat, which is truer than « position »: it isn't about holding a shape but about sitting correctly. The first object of any German clinic is the upper body — a stable torso makes everything else possible.",
          es:"El alemán dice « der Sitz », el asiento, más exacto que « posición »: no se trata de mantener una forma sino de sentarse bien.",
          it:"Il tedesco dice « der Sitz », l'assetto, più giusto di « posizione »: non si tratta di tenere una forma ma di sedersi bene.",
          de:"Der Sitz ist treffender als « Position »: es geht nicht darum, eine Form zu halten, sondern richtig zu sitzen. Der Oberkörper kommt zuerst.",
          ja:"ドイツ語の der Sitz（座り）は position より的確です。形を保つことではなく、正しく座ることだからです。ドイツの講習が最初に扱うのは上体で、安定した胴体が他のすべてを可能にします。" } },

  { ref:"equilibre", lecon:1, coll:"progression",
    mots:{ fr:{m:"l'équilibre"}, en:{m:"balance", p:"ba-leunss"},
           es:{m:"el equilibrio"}, it:{m:"l'equilibrio"},
           de:{m:"das Gleichgewicht", p:"glaïch-gue-vicht"}, ja:{m:"バランス", p:"baransu"} },
    def:{ fr:"Ce qui se voit avant tout le reste, et ce qui change le plus vite en stage : un cheval équilibré porte sa tête sans qu'on la lui tienne. ⚠️ En anglais **balance** sans article : *he has more balance today*, jamais « a balance ».",
          en:"What shows before anything else, and what changes fastest at a camp: a balanced horse carries his own head. Note « balance » with no article: he has more balance today.",
          es:"Lo que se ve antes que nada, y lo que cambia más rápido en un curso: un caballo equilibrado lleva su cabeza solo.",
          it:"Ciò che si vede prima di tutto, e ciò che cambia più in fretta in uno stage: un cavallo in equilibrio porta la testa da sé.",
          de:"Was man zuerst sieht und was sich im Lehrgang am schnellsten ändert: ein ausbalanciertes Pferd trägt seinen Kopf selbst.",
          ja:"何よりも先に目に見えるもの。そして講習で最も早く変わるもの。バランスの取れた馬は、自分で頭を支えます。" } },

  { ref:"regularite", lecon:1, coll:"progression",
    mots:{ fr:{m:"la régularité"}, en:{m:"consistency", p:"keune-siss-teune-si"},
           es:{m:"la regularidad"}, it:{m:"la costanza"},
           de:{m:"die Gleichmäßigkeit", p:"glaïch-mè-ssich-kaït"}, ja:{m:"安定性", p:"anteisei"} },
    def:{ fr:"🟥 LE DEUXIÈME DES TROIS TEMPS, et le plus long. Faire bien une fois n'est rien ; faire pareil dix fois de suite est tout. ⚠️ **CONSISTENCY** est un mot que le français rend mal : « régularité » évoque un rythme, l'anglais dit la fiabilité — être le même chaque jour. C'est le vrai critère de sélection dans une filière.",
          en:"The second of the three stages, and the longest. Doing it well once is nothing; doing it the same ten times running is everything. « Consistency » means reliability — being the same every day. That's what selection really looks at.",
          es:"El segundo de los tres tiempos, y el más largo. Hacerlo bien una vez no es nada; hacerlo igual diez veces seguidas lo es todo.",
          it:"Il secondo dei tre tempi, e il più lungo. Farlo bene una volta è niente; farlo uguale dieci volte di seguito è tutto.",
          de:"Die zweite der drei Stufen, und die längste. Einmal gut ist nichts; zehnmal gleich ist alles.",
          ja:"三段階の第二で、最も長い段階。一度うまくできても意味はなく、十度続けて同じにできることがすべてです。英語の consistency は「毎日同じであること」という信頼性を指します。選抜が本当に見るのはこれです。" } },

  { ref:"objectif", lecon:1, coll:"progression",
    mots:{ fr:{m:"l'objectif"}, en:{m:"the objective", p:"ob-djèk-tive", var:"the goal"},
           es:{m:"el objetivo"}, it:{m:"l'obiettivo"},
           de:{m:"das Ziel", p:"tsil"}, ja:{m:"目標", p:"mokuhyō"} },
    def:{ fr:"⚠️ CHAQUE SÉANCE EN A UN, ET UN SEUL. Une séance sans objectif est une promenade ; une séance avec trois objectifs n'en atteint aucun. C'est ce que le cavalier doit savoir dire avant de monter, et redire après — voir `bilan`.",
          en:"Every session has one, and only one. A session without an objective is a hack; a session with three reaches none. It's what the rider should be able to state before mounting, and again afterwards.",
          es:"Cada sesión tiene uno, y solo uno. Una sesión sin objetivo es un paseo; una con tres no alcanza ninguno.",
          it:"Ogni seduta ne ha uno, e uno solo. Una seduta senza obiettivo è una passeggiata; una con tre non ne raggiunge nessuno.",
          de:"Jede Einheit hat eines, und nur eines. Eine Einheit ohne Ziel ist ein Ausritt; eine mit drei erreicht keines.",
          ja:"一回の稽古に目標はひとつだけ。目標のない稽古は散歩であり、三つある稽古はどれにも届きません。乗る前に言えること、そして終わってからもう一度言えることが求められます。" } },

  { ref:"bilan", lecon:1, coll:"progression",
    mots:{ fr:{m:"le bilan de séance"}, en:{m:"the debrief", p:"di-brif", var:"the session review"},
           es:{m:"el balance de la sesión"}, it:{m:"il bilancio della seduta"},
           de:{m:"die Nachbesprechung", p:"nakh-be-chpré-roung"}, ja:{m:"振り返り", p:"furikaeri"} },
    def:{ fr:"🟥 CE QUI FAIT LA DIFFÉRENCE DU SYSTÈME ALLEMAND : la séance ne s'arrête pas quand on descend. On la revoit — parfois en vidéo — et **le cavalier doit être capable d'expliquer ce qu'il vient de faire**. Un cavalier qui a bien monté sans savoir pourquoi n'a rien appris. ⚠️ En anglais **to debrief** est un verbe emprunté au vocabulaire militaire et aérien.",
          en:"What sets the German system apart: the session doesn't end when you get off. You review it — sometimes on video — and the rider must be able to explain what they have just done. A rider who went well without knowing why has learnt nothing.",
          es:"Lo que distingue al sistema alemán: la sesión no acaba al bajarse. Se revisa, a veces en vídeo, y el jinete debe poder explicar lo que acaba de hacer.",
          it:"Ciò che distingue il sistema tedesco: la seduta non finisce quando si scende. Si rivede, a volte in video, e il cavaliere deve saper spiegare cosa ha appena fatto.",
          de:"Was das deutsche System auszeichnet: die Einheit endet nicht beim Absteigen. Sie wird nachbesprochen, manchmal per Video, und der Reiter muss erklären können, was er getan hat.",
          ja:"ドイツ式の要。稽古は下馬した時点で終わりません。ときには映像で振り返り、騎手は「今何をしたか」を説明できなければなりません。理由を知らずにうまく乗れた騎手は、何も学んでいないのです。" } },

  { ref:"condition-physique", lecon:1, coll:"progression",
    mots:{ fr:{m:"la condition physique du cavalier"}, en:{m:"the rider's fitness", p:"fitt-nèss"},
           es:{m:"la condición física del jinete"}, it:{m:"la condizione fisica del cavaliere"},
           de:{m:"die Fitness des Reiters", p:"fitt-nèss"}, ja:{m:"騎手の体力", p:"kishu no tairyoku"} },
    def:{ fr:"⚠️ ON L'OUBLIE TOUJOURS, et l'Allemagne la travaille depuis longtemps : un cavalier fatigué se tient mal, et un cavalier qui se tient mal gêne son cheval. Le sport a mis du temps à l'admettre — monter n'est pas seulement s'asseoir.",
          en:"Always forgotten, and long addressed in Germany: a tired rider sits badly, and a rider who sits badly hinders the horse. The sport was slow to admit it — riding isn't only sitting.",
          es:"Siempre se olvida, y en Alemania se trabaja desde hace tiempo: un jinete cansado se sienta mal, y quien se sienta mal molesta al caballo.",
          it:"Sempre dimenticata, e in Germania curata da tempo: un cavaliere stanco sta male in sella, e chi sta male disturba il cavallo.",
          de:"Immer vergessen, in Deutschland längst berücksichtigt: ein müder Reiter sitzt schlecht, und wer schlecht sitzt, stört sein Pferd.",
          ja:"いつも忘れられ、ドイツでは早くから取り組まれてきたこと。疲れた騎手は姿勢が崩れ、姿勢が崩れた騎手は馬の邪魔をします。乗ることは座ることだけではありません。" } },

  { ref:"selection", lecon:1, coll:"cadre",
    mots:{ fr:{m:"la sélection"}, en:{m:"selection", p:"si-lèk-cheune"},
           es:{m:"la selección"}, it:{m:"la selezione"},
           de:{m:"die Sichtung", p:"zich-toung"}, ja:{m:"選抜", p:"senbatsu"} },
    def:{ fr:"⚠️ L'ALLEMAND A UN MOT PROPRE : **die Sichtung**, « le repérage » — l'observation régulière des jeunes cavaliers en stage, avant toute sélection formelle. On est vu longtemps avant d'être choisi. 🟥 Et ce sont les COUPLES qui sont sélectionnés, pas les cavaliers seuls : *the best combinations may be selected*.",
          en:"German has its own word: « die Sichtung », the spotting — the regular observation of young riders at camps, long before any formal selection. You are watched long before you are chosen. And it's combinations that get selected, not riders alone.",
          es:"El alemán tiene su palabra: « Sichtung », la observación regular de los jóvenes jinetes en los cursos, antes de cualquier selección formal.",
          it:"Il tedesco ha la sua parola: « Sichtung », l'osservazione regolare dei giovani cavalieri negli stage, prima di ogni selezione formale.",
          de:"Die Sichtung: die regelmäßige Beobachtung junger Reiter im Lehrgang, lange vor jeder formellen Nominierung. Und ausgewählt werden Paare, nicht Reiter allein.",
          ja:"ドイツには専用の語があります。Sichtung（見極め）— 正式な選抜の前に、講習で若手騎手を継続的に観察すること。選ばれるずっと前から見られているのです。選ばれるのは人馬のコンビであり、騎手単独ではありません。" } },

  { ref:"cadre-national", lecon:1, coll:"cadre",
    mots:{ fr:{m:"le cadre national"}, en:{m:"the national squad", p:"na-cheu-neul skouode"},
           es:{m:"el equipo nacional de tecnificación"}, it:{m:"la squadra nazionale"}, // ?? es it
           de:{m:"der Kader", p:"ka-deur"}, ja:{m:"強化指定選手", p:"kyōka shitei senshu"} },
    def:{ fr:"🟥🟥 LE PIÈGE DU CHAPITRE : **SQUAD N'EST PAS TEAM.** « He is in the German squad » ne veut PAS dire « he is in the German team ». Le *squad* est le groupe de cavaliers repérés, suivis et entraînés dans la filière ; la *team* est l'équipe de quatre qui part au championnat. On peut être dans le squad des années sans jamais entrer dans la team.\\n⚠️ L'allemand dit **der Kader**, mot qu'on entend partout à Warendorf : les *Kaderangehörige* sont les membres des cadres, et le centre fédéral organise leurs stages. NE JAMAIS traduire « Kader » par « team ».",
          en:"The trap of this chapter: SQUAD IS NOT TEAM. « He is in the German squad » does not mean he is in the German team. The squad is the group of riders spotted, followed and trained within the pathway; the team is the four who go to the championship. You can be in the squad for years without ever making the team. German says « der Kader ».",
          es:"La trampa del capítulo: « squad » no es « team ». El squad es el grupo de jinetes seguidos y entrenados en la estructura; el team son los cuatro que van al campeonato.",
          it:"La trappola del capitolo: « squad » non è « team ». Lo squad è il gruppo di cavalieri seguiti e allenati nella filiera; il team sono i quattro che vanno al campionato.",
          de:"Die Falle dieses Kapitels: « squad » ist nicht « team ». Der Kader ist die Gruppe der gesichteten und geförderten Reiter; die Mannschaft sind die vier, die zur Meisterschaft fahren.",
          ja:"この章の落とし穴。squad は team ではありません。squad は育成の枠組みで見極められ、指導を受ける騎手の集団。team は選手権に出る四人。何年も squad にいながら team に入らないこともあります。ドイツ語では der Kader と言い、ヴァレンドルフで最もよく聞く語です。" } }

  ],

  phrases: [

    { ref:"ph-form-bases", lecon:1, mots:["les-bases","progression"],
      fr:"Il faut consolider les bases avant de demander davantage.",
      en:"We need to establish the basics before asking for more.",
      es:"Hay que consolidar las bases antes de pedir más.",
      it:"Bisogna consolidare le basi prima di chiedere di più.",
      de:"Die Grundlagen müssen sitzen, bevor man mehr verlangt.",
      ja:"もっと 求める 前 に、 基礎 を 固め なけれ ば なり ませ ん。" },

    { ref:"ph-form-objectif", lecon:1, mots:["objectif"],
      fr:"Chaque séance doit avoir un objectif précis.",
      en:"Every training session should have a clear objective.",
      es:"Cada sesión debe tener un objetivo preciso.",
      it:"Ogni seduta deve avere un obiettivo preciso.",
      de:"Jede Einheit braucht ein klares Ziel.",
      ja:"稽古 に は 毎回、 はっきり し た 目標 が 必要 です。" },

    { ref:"ph-form-squad", lecon:1, mots:["cadre-national","selection"],
      fr:"Les meilleurs couples peuvent être sélectionnés pour le cadre national.",
      en:"The best combinations may be selected for the national squad.",
      es:"Las mejores parejas pueden ser seleccionadas para el equipo nacional.",
      it:"I migliori binomi possono essere selezionati per la squadra nazionale.",
      de:"Die besten Paare können in den Kader berufen werden.",
      ja:"最も 優れ た 人馬 は、 強化 指定 に 選ば れる こと が あり ます。" },

    { ref:"ph-form-jamais-fini", lecon:1, mots:["la-formation"],
      fr:"La formation ne s'arrête jamais, même au plus haut niveau.",
      en:"Training never really stops, even at the highest level.",
      es:"La formación no se detiene nunca, ni en el máximo nivel.",
      it:"La formazione non finisce mai, nemmeno al massimo livello.",
      de:"Ausbildung hört nie auf, auch nicht auf höchstem Niveau.",
      ja:"育成 が 終わる こと は あり ませ ん。 最高 峰 で さえ。" }

  ],

  /* ==================================================================
     LE DIALOGUE DE WARENDORF — 17 août 2026, session 214.

     LA SCÈNE : un stage au centre fédéral. 20 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT SONT DE BLANDINE, avec leur traduction
     anglaise. Sa notion centrale structure les temps :
     **ON FORME LE COUPLE, PAS SEULEMENT LE CAVALIER**, et la progression
     allemande en trois temps — FOUNDATIONS → CONSISTENCY → PERFORMANCE.

     ⚠️ CE QUI DISTINGUE WARENDORF DES DEUX AUTRES VILLES DE PÉDAGOGIE :
     · SAUMUR enseigne à ENSEIGNER (chapitre `enseignant`) ;
     · SANTA YNEZ enseigne à SENTIR (chapitre `horsemanship`) ;
     · WARENDORF enseigne à PROGRESSER — la filière, l'objectif, le
       bilan, la sélection.
     NE PAS mélanger leurs vocabulaires : ce sont trois angles distincts.

     🟥 LE PIÈGE **SQUAD ≠ TEAM** est au temps 6, dans la phrase de la
     sélection. Voir la `def` de `cadre-national`. NE PAS traduire
     « der Kader » par « team ».

     ⚠️ ET LE BILAN DE SÉANCE EST LE CŒUR DU CHAPITRE : « le cavalier doit
     être capable d'expliquer ce qu'il vient de faire ». Un cavalier qui a
     bien monté sans savoir pourquoi n'a rien appris. C'est ce qui rend ce
     chapitre utile même à quelqu'un qui ne visera jamais un cadre.

     `dit` : "joueuse" = elle produit · "club" = l'entraîneur.
  ================================================================== */
  dialogue: {
    ville: "warendorf", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive en stage ---- */
      { ref:"dw-depuis-combien", temps:1, dit:"club", mots:["la-formation","cavalier-formation"],
        fr:"Depuis combien de temps suivez-vous cette formation ?",
        en:"How long have you been in this training programme?",
        es:"¿Cuánto tiempo lleva en esta formación?",
        it:"Da quanto tempo segue questa formazione?",
        de:"Wie lange sind Sie schon in dieser Ausbildung?",
        ja:"この 育成 課程 に は どれ くらい 前 から 参加 し て い ます か ?" },

      { ref:"dw-plusieurs-fois", temps:1, dit:"joueuse", mots:["entrainement","stage"],
        fr:"Je m'entraîne ici plusieurs fois par semaine.",
        en:"I train here several times a week.",
        es:"Entreno aquí varias veces por semana.",
        it:"Mi alleno qui più volte alla settimana.",
        de:"Ich trainiere hier mehrmals pro Woche.",
        ja:"ここ で 週 に 何 度 か 練習 し て い ます。" },

      { ref:"dw-regarder-hier", temps:1, dit:"club", mots:["bilan","stage"],
        fr:"Nous allons d'abord regarder ta séance d'hier.",
        en:"We're going to review yesterday's session first.",
        es:"Primero vamos a ver tu sesión de ayer.",
        it:"Prima rivediamo la tua seduta di ieri.",
        de:"Wir schauen uns zuerst deine Einheit von gestern an.",
        ja:"まず 昨日 の 稽古 を 見直し ましょう。" },

      /* ---- temps 2 · ma position ---- */
      { ref:"dw-travail-position", temps:2, dit:"joueuse", mots:["position","objectif"],
        fr:"Aujourd'hui, le travail porte surtout sur ma position.",
        en:"Today, we're mainly working on my position.",
        es:"Hoy el trabajo se centra sobre todo en mi posición.",
        it:"Oggi il lavoro riguarda soprattutto la mia posizione.",
        de:"Heute arbeiten wir vor allem an meinem Sitz.",
        ja:"今日 は おもに 姿勢 の 稽古 です。" },

      { ref:"dw-haut-du-corps", temps:2, dit:"joueuse", mots:["position","entraineur"],
        fr:"Mon entraîneur veut que je sois plus stable dans mon haut du corps.",
        en:"My trainer wants me to be more stable through my upper body.",
        es:"Mi entrenador quiere que esté más estable en el tren superior.",
        it:"Il mio allenatore vuole che sia più stabile nella parte alta del corpo.",
        de:"Mein Trainer möchte, dass ich im Oberkörper stabiler werde.",
        ja:"コーチ から は、 上体 を もっと 安定 さ せる よう 言わ れ て い ます。" },

      { ref:"dw-condition-physique", temps:2, dit:"club", mots:["condition-physique"],
        fr:"Nous travaillons aussi la condition physique du cavalier.",
        en:"We also work on the rider's physical fitness.",
        es:"También trabajamos la condición física del jinete.",
        it:"Lavoriamo anche sulla condizione fisica del cavaliere.",
        de:"Wir arbeiten auch an der Fitness des Reiters.",
        ja:"騎手 の 体力 づくり も 行い ます。" },

      /* ---- temps 3 · le jeune cheval, et les étapes ---- */
      { ref:"dw-sans-bruler", temps:3, dit:"club", mots:["progression","les-bases"],
        fr:"Le cheval doit progresser sans brûler les étapes.",
        en:"The horse needs to progress without rushing the process.",
        es:"El caballo debe progresar sin quemar etapas.",
        it:"Il cavallo deve progredire senza saltare le tappe.",
        de:"Das Pferd muss sich entwickeln, ohne Stufen zu überspringen.",
        ja:"馬 は 段階 を 飛ばさ ず に 進歩 し なけれ ば なり ませ ん。" },

      { ref:"dw-pas-encore-pret", temps:3, dit:"club", mots:["jeune-cheval"],
        fr:"Ce jeune cheval n'est pas encore prêt pour ce niveau.",
        en:"This young horse isn't ready for this level yet.",
        es:"Este caballo joven todavía no está listo para este nivel.",
        it:"Questo cavallo giovane non è ancora pronto per questo livello.",
        de:"Dieses junge Pferd ist für dieses Niveau noch nicht bereit.",
        ja:"この 若馬 は、 まだ この 水準 に は 達し て い ませ ん。" },

      { ref:"dw-adapter-age", temps:3, dit:"club", mots:["jeune-cheval","progression"],
        fr:"Nous adaptons le travail à l'âge et à l'expérience du cheval.",
        en:"We adapt the training to the horse's age and experience.",
        es:"Adaptamos el trabajo a la edad y la experiencia del caballo.",
        it:"Adattiamo il lavoro all'età e all'esperienza del cavallo.",
        de:"Wir passen die Arbeit an Alter und Erfahrung des Pferdes an.",
        ja:"馬 の 年齢 と 経験 に 合わせ て 稽古 を 組み ます。" },

      { ref:"dw-consolider-bases", temps:3, dit:"club", mots:["les-bases","progression"],
        fr:"Il faut consolider les bases avant de demander davantage.",
        en:"We need to establish the basics before asking for more.",
        es:"Hay que consolidar las bases antes de pedir más.",
        it:"Bisogna consolidare le basi prima di chiedere di più.",
        de:"Die Grundlagen müssen sitzen, bevor man mehr verlangt.",
        ja:"もっと 求める 前 に、 基礎 を 固め なけれ ば なり ませ ん。" },

      /* ---- temps 4 · expliquer ce qu'on a fait ---- */
      { ref:"dw-expliquer", temps:4, dit:"club", mots:["bilan","cavalier-formation"],
        fr:"Le cavalier doit être capable d'expliquer ce qu'il vient de faire.",
        en:"The rider should be able to explain what they have just done.",
        es:"El jinete debe ser capaz de explicar lo que acaba de hacer.",
        it:"Il cavaliere deve essere in grado di spiegare ciò che ha appena fatto.",
        de:"Der Reiter muss erklären können, was er gerade getan hat.",
        ja:"騎手 は、 今 何 を し た の か 説明 できる 必要 が あり ます。" },

      { ref:"dw-objectif-precis", temps:4, dit:"club", mots:["objectif"],
        fr:"Chaque séance doit avoir un objectif précis.",
        en:"Every training session should have a clear objective.",
        es:"Cada sesión debe tener un objetivo preciso.",
        it:"Ogni seduta deve avere un obiettivo preciso.",
        de:"Jede Einheit braucht ein klares Ziel.",
        ja:"稽古 に は 毎回、 はっきり し た 目標 が 必要 です。" },

      { ref:"dw-bilan-apres", temps:4, dit:"joueuse", mots:["bilan","entraineur"],
        fr:"Après la séance, nous faisons un bilan avec l'entraîneur.",
        en:"After the session, we debrief with the trainer.",
        es:"Después de la sesión hacemos un balance con el entrenador.",
        it:"Dopo la seduta facciamo un bilancio con l'allenatore.",
        de:"Nach der Einheit machen wir eine Nachbesprechung mit dem Trainer.",
        ja:"稽古 の あと、 コーチ と 振り返り を し ます。" },

      /* ---- temps 5 · ce qui a progressé ---- */
      { ref:"dw-plus-equilibre", temps:5, dit:"club", mots:["equilibre","stage"],
        fr:"Ton cheval est plus équilibré aujourd'hui qu'en début de stage.",
        en:"Your horse is more balanced today than at the beginning of the training camp.",
        es:"Tu caballo está más equilibrado hoy que al principio del curso.",
        it:"Il tuo cavallo è più equilibrato oggi che all'inizio dello stage.",
        de:"Dein Pferd ist heute ausbalancierter als am Anfang des Lehrgangs.",
        ja:"あなた の 馬 は、 講習 の 初日 より 今日 の ほう が バランス が 良い です。" },

      { ref:"dw-gagner-regularite", temps:5, dit:"club", mots:["regularite","objectif"],
        fr:"Le prochain objectif est de gagner en régularité.",
        en:"The next goal is to become more consistent.",
        es:"El próximo objetivo es ganar en regularidad.",
        it:"Il prossimo obiettivo è guadagnare in costanza.",
        de:"Das nächste Ziel ist mehr Gleichmäßigkeit.",
        ja:"次 の 目標 は、 安定 性 を 高める こと です。" },

      { ref:"dw-je-comprends-mieux", temps:5, dit:"joueuse", mots:["bilan","progression"],
        fr:"Je comprends mieux ce que je dois travailler maintenant.",
        en:"I understand better what I need to work on now.",
        es:"Ahora entiendo mejor lo que tengo que trabajar.",
        it:"Adesso capisco meglio su cosa devo lavorare.",
        de:"Jetzt verstehe ich besser, woran ich arbeiten muss.",
        ja:"これ から 何 を 練習 すべき か、 前 より よく わかり まし た。" },

      /* ---- temps 6 · la sélection, et le cadre ---- */
      { ref:"dw-observes-stages", temps:6, dit:"club", mots:["selection","stage","cavalier-formation"],
        fr:"Les jeunes cavaliers sont régulièrement observés lors des stages.",
        en:"Young riders are regularly assessed during training camps.",
        es:"Los jinetes jóvenes son observados regularmente en los cursos.",
        it:"I giovani cavalieri sono osservati regolarmente durante gli stage.",
        de:"Junge Reiter werden bei Lehrgängen regelmäßig gesichtet.",
        ja:"若手 騎手 は、 講習 の 場 で 定期的 に 観察 さ れ ます。" },

      /* 🟥 LE PIÈGE SQUAD ≠ TEAM. Voir la def de `cadre-national`. */
      { ref:"dw-selectionnes-cadre", temps:6, dit:"club", mots:["cadre-national","selection"],
        fr:"Les meilleurs couples peuvent être sélectionnés pour le cadre national.",
        en:"The best combinations may be selected for the national squad.",
        es:"Las mejores parejas pueden ser seleccionadas para el equipo nacional.",
        it:"I migliori binomi possono essere selezionati per la squadra nazionale.",
        de:"Die besten Paare können in den Kader berufen werden.",
        ja:"最も 優れ た 人馬 は、 強化 指定 に 選ば れる こと が あり ます。" },

      { ref:"dw-squad-pas-team", temps:6, dit:"joueuse", mots:["cadre-national"],
        fr:"Être dans le cadre, ce n'est pas encore être dans l'équipe.",
        en:"Being in the squad isn't the same as being in the team.",
        es:"Estar en el equipo de tecnificación no es todavía estar en el equipo.",
        it:"Essere nella squadra nazionale non è ancora essere nel team.",
        de:"Im Kader zu sein heißt noch nicht, in der Mannschaft zu sein.",
        ja:"強化 指定 に 入る こと は、 まだ 代表 チーム に 入る こと で は あり ませ ん。" },

      { ref:"dw-jamais-fini", temps:6, dit:"club", mots:["la-formation","progression"],
        fr:"La formation ne s'arrête jamais, même au plus haut niveau.",
        en:"Training never really stops, even at the highest level.",
        es:"La formación no se detiene nunca, ni en el máximo nivel.",
        it:"La formazione non finisce mai, nemmeno al massimo livello.",
        de:"Ausbildung hört nie auf, auch nicht auf höchstem Niveau.",
        ja:"育成 が 終わる こと は あり ませ ん。 最高 峰 で さえ。" }
    ]
  }
};
