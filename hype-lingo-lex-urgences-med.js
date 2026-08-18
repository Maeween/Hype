/* hype-lingo-lex-urgences-med.js — Hype Linguae · « Les urgences du cavalier »
   ==================================================================
   38 CONCEPTS, UNE SEULE LEÇON. Ville : ÉDIMBOURG.

   🟥 POURQUOI CE FICHIER EXISTE — 16 août 2026, session 214.
   L'ancien `hype-lingo-lex-urgences.js` mélangeait les urgences DU
   CHEVAL et celles DU CAVALIER dans un seul chapitre de 42 mots,
   réparti sur quatre leçons entre Kildare et Édimbourg — dont Kildare
   recevait TROIS, ce qui a fait perdre des mots à Blandine en vol.
   Décision de Blandine : *« j'aurais séparé urgence vétérinaire et
   urgence médicale »*, puis *« Kildare va garder les urgences vét et
   Édimbourg celles médicales »*.
   ⚠️ L'AUTRE FICHIER EST `hype-lingo-lex-urgences-vet.js` (Kildare).
   NE PAS refusionner les deux chapitres.

   ⚠️ ÉDIMBOURG PORTAIT « LES DIALOGUES » comme chapitre. À trancher
   avec Blandine : soit elle change de chapitre, soit elle en porte
   deux. NON DÉCIDÉ — ne pas trancher seul.

   🟥 UNE SEULE LEÇON, comme toutes les villes. NE PAS redécouper.

   🟥 LE CHAPITRE OÙ UNE PHRASE MAL APPRISE PEUT COÛTER UNE VIE.
   Les phrases sont COURTES et DIRECTES : aucune politesse, aucun
   conditionnel. Une phrase trop longue ne se dit pas quand les mains
   tremblent. ⚠️ La reconnaissance vocale ne devrait rien sanctionner
   ici : quelqu'un qui répète une phrase d'urgence a besoin qu'elle soit
   juste, pas d'être noté.

   ═══ DIX-HUIT PHRASES SUR VINGT-ET-UNE SONT DE BLANDINE ═══
   Dictées le 16/08. Ce sont elles qui font ce chapitre, et elles
   suivent l'ORDRE RÉEL d'un examen sur place — ce qu'aucun lexique
   n'apprend : on vérifie la respiration AVANT de demander où ça fait
   mal, on demande le souvenir de la chute AVANT le prénom, on ne
   touche pas au casque.
   ⚠️ NE PAS RÉORDONNER LES TEMPS 2 À 4 : la séquence EST le contenu.

   ⚠️ ÉCARTÉ SUR SA DEMANDE : la déclaration d'accident et `l'assurance`
   — *« non, ils auront le temps de voir ça après »*. Ce chapitre est
   celui de l'urgence ; l'administratif n'y a pas sa place.
   NE PAS les remettre.
   ⚠️ Elle a limité l'expression de la douleur à DEUX PHRASES (*« ok
   mais deux phrases max »*) : la nuque et le dos d'un côté, la douleur
   à la respiration de l'autre. Ce sont les deux qui décident si l'on
   bouge quelqu'un. NE PAS en ajouter.

   ⚠️ `le sang` et `les points de suture` sont AUSSI dans le fichier
   vétérinaire, sur sa décision : soigner un humain ou un cheval, on
   décrit la blessure de la même façon.

   ⚠️ RELECTURE NATIVE INDISPENSABLE. Les entrées marquées `// ??` sont
   celles dont Claude est le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["urgences-med"] = {
  ref: "urgences-med",
  chapitre: 14,
  titre: { fr:"Les urgences du cavalier", en:"Rider emergencies", es:"Urgencias del jinete",
           it:"Le urgenze del cavaliere", de:"Notfälle beim Reiter", ja:"騎手の緊急事態" },
  lecons: 1,

  concepts: [

  /* ---------- appeler ---------- */

  { ref:"urgence", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'urgence"}, en:{m:"the emergency", p:"i-meur-djeune-si"},
           es:{m:"la urgencia"}, it:{m:"l'urgenza"},
           de:{m:"der Notfall", p:"nôte-fall"}, ja:{m:"緊急", p:"kinkyū"} },
    def:{ fr:"⚠️ En anglais, **an emergency** est le mot pour les secours ; « urgency » existe mais veut dire « caractère pressant », pas « urgence médicale ». Dire *it's an emergency* déclenche une réponse ; *it's urgent* n'en déclenche aucune.",
          en:"« An emergency » is the word. « Urgency » exists but means pressingness, not a medical emergency. « It's an emergency » gets a response; « it's urgent » doesn't.",
          es:"En inglés se dice « an emergency ». « Urgency » existe pero significa carácter apremiante.",
          it:"In inglese si dice « an emergency ». « Urgency » esiste ma indica la pressione del tempo.",
          de:"Englisch sagt « an emergency ». « Urgency » heißt Dringlichkeit, nicht Notfall.",
          ja:"英語では an emergency と言います。urgency は「緊急性」という抽象語で、救急を呼ぶ言葉ではありません。" } },

  { ref:"secours", lecon:1, coll:"alerte",
    mots:{ fr:{m:"les secours"}, en:{m:"the emergency services", p:"seur-vi-sizz", var:"the paramedics"},
           es:{m:"los servicios de emergencia"}, it:{m:"i soccorsi"},
           de:{m:"der Rettungsdienst", p:"rè-toungs-dinnste"}, ja:{m:"救急", p:"kyūkyū"} },
    def:{ fr:"⚠️ En anglais courant on dit surtout **the paramedics** pour ceux qui arrivent, et *the emergency services* pour l'institution. Et souvent on ne les nomme pas du tout : on dit simplement *call 999* ou *call an ambulance*.",
          en:"Everyday English says « the paramedics » for the people, « the emergency services » for the institution. Often you name neither: you just say « call 999 ».",
          es:"En inglés se dice « the paramedics » para los que llegan. A menudo no se les nombra: « call 999 ».",
          it:"In inglese si dice « the paramedics » per chi arriva. Spesso non li si nomina: « call 999 ».",
          de:"Englisch sagt « the paramedics » für die Leute. Oft nennt man sie gar nicht: « call 999 ».",
          ja:"英語では現場に来る人を the paramedics と呼びます。実際には名前を言わず call 999 と言うことが多いのです。" } },

  { ref:"numero-urgence", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le numéro d'urgence"}, en:{m:"the emergency number", p:"neum-beur"},
           es:{m:"el número de emergencias"}, it:{m:"il numero d'emergenza"},
           de:{m:"die Notrufnummer", p:"nôte-rouf-nou-meur"}, ja:{m:"緊急通報番号", p:"kinkyū tsūhō bangō"} },
    def:{ fr:"🟥 **À ÉDIMBOURG : 999 OU 112**, les deux fonctionnent au Royaume-Uni. Et **112 — TOUTE L'EUROPE**, Union comprise, plus le Royaume-Uni, l'Irlande, la Suisse, la Norvège et la Turquie. Il fonctionne depuis n'importe quel portable, **même sans carte SIM, même verrouillé, même sans crédit**, et il bascule sur le réseau d'un autre opérateur si le tien ne capte pas. C'est le seul numéro à retenir en voyage.\\nLes autres pays du voyage : **999** Royaume-Uni et Irlande (le numéro historique, encore le plus utilisé) · **911** États-Unis, Canada, Mexique · **000** Australie · **119** Japon (ambulance et pompiers ; le 110 est la police) · **107** Argentine · **998** Émirats arabes unis · **192** Brésil · **10177** Afrique du Sud.",
          en:"112 works across all of Europe, including the UK and Ireland, from any mobile — with no SIM, locked, out of credit — and it will hop onto another network if yours has no signal. Elsewhere: 999 UK and Ireland, 911 US and Canada, 000 Australia, 119 Japan, 107 Argentina, 998 UAE, 192 Brazil, 10177 South Africa.",
          es:"El 112 funciona en toda Europa desde cualquier móvil, incluso sin SIM, bloqueado o sin saldo. Además: 999 Reino Unido e Irlanda, 911 EE. UU. y Canadá, 000 Australia, 119 Japón, 107 Argentina, 998 Emiratos, 192 Brasil, 10177 Sudáfrica.",
          it:"Il 112 funziona in tutta Europa da qualsiasi cellulare, anche senza SIM, bloccato o senza credito. Inoltre: 999 Regno Unito e Irlanda, 911 USA e Canada, 000 Australia, 119 Giappone, 107 Argentina, 998 Emirati, 192 Brasile, 10177 Sudafrica.",
          de:"Die 112 gilt in ganz Europa, von jedem Handy — ohne SIM, gesperrt, ohne Guthaben — und wechselt notfalls ins Netz eines anderen Anbieters. Sonst: 999 Großbritannien und Irland, 911 USA und Kanada, 000 Australien, 119 Japan, 107 Argentinien, 998 VAE, 192 Brasilien, 10177 Südafrika.",
          ja:"112 はヨーロッパ全域で使えます。SIM がなくても、画面がロックされていても、残高がなくてもかかり、自分の回線が圏外なら他社の電波に切り替わります。その他：イギリスとアイルランド 999、アメリカとカナダ 911、オーストラリア 000、日本 119（救急・消防。110 は警察）、アルゼンチン 107、UAE 998、ブラジル 192、南アフリカ 10177。" } },

  { ref:"appeler", lecon:1, coll:"alerte",
    mots:{ fr:{m:"appeler"}, en:{m:"to call", p:"kol", var:"to ring (UK)"},
           es:{m:"llamar"}, it:{m:"chiamare"},
           de:{m:"anrufen", p:"ann-rou-feune"}, ja:{m:"呼ぶ", p:"yobu"} },
    def:{ fr:"⚠️ Les Britanniques disent aussi **to ring** — *ring an ambulance*. Et l'allemand *anrufen* est un verbe à particule séparable : « ich rufe den Notarzt AN », la particule part à la fin.",
          en:"British English also says « to ring » — ring an ambulance. German « anrufen » is separable: the « an » goes to the end.",
          es:"El inglés británico dice también « to ring ». El alemán « anrufen » es un verbo separable.",
          it:"L'inglese britannico dice anche « to ring ». Il tedesco « anrufen » è separabile.",
          de:"Britisches Englisch sagt auch « to ring ». « Anrufen » ist trennbar: das « an » wandert ans Ende.",
          ja:"イギリス英語では to ring も使います。ドイツ語の anrufen は分離動詞で、an が文末に移ります。" } },

  { ref:"ambulance", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'ambulance"}, en:{m:"the ambulance", p:"am-biou-leunss"},
           es:{m:"la ambulancia"}, it:{m:"l'ambulanza"},
           de:{m:"der Krankenwagen", p:"kran-keune-va-gueune"}, ja:{m:"救急車", p:"kyūkyūsha"} },
    def:{ fr:"Cinq langues sur six se reconnaissent — l'allemand fait bande à part avec *Krankenwagen*, « voiture des malades ». ⚠️ Sur un concours ou dans un grand centre, on ne demande pas une ambulance mais **le médecin de secours** : il est déjà sur place.",
          en:"Five of six languages look alike; German goes its own way with « Krankenwagen », the sick people's car. At a show or a big centre, don't ask for an ambulance — ask for the medic on site.",
          es:"Cinco de seis lenguas se parecen; el alemán va aparte. En un concurso, se pide el médico de guardia, ya está allí.",
          it:"Cinque lingue su sei si somigliano; il tedesco va per conto suo. In gara si chiede il medico di servizio, è già sul posto.",
          de:"Fünf von sechs Sprachen ähneln sich; Deutsch geht mit « Krankenwagen » eigene Wege. Auf dem Turnier fragt man nach dem Sanitäter vor Ort.",
          ja:"六言語のうち五つは似ていますが、ドイツ語だけ Krankenwagen（病人の車）と言います。競技会や大きな施設では、救急車ではなく常駐の医師を呼びます。" } },

  { ref:"hopital", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'hôpital"}, en:{m:"the hospital", p:"hoss-pi-teul"},
           es:{m:"el hospital"}, it:{m:"l'ospedale"},
           de:{m:"das Krankenhaus", p:"kran-keune-haouss"}, ja:{m:"病院", p:"byōin"} },
    def:{ fr:"Utile surtout pour comprendre où l'on t'emmène. ⚠️ En anglais on dit **to go to hospital** sans article en Grande-Bretagne, mais **to the hospital** aux États-Unis. Petite différence, mais elle s'entend.",
          en:"Mostly useful for understanding where you're being taken. British English says « to hospital » with no article; American English says « to the hospital ».",
          es:"Útil sobre todo para entender adónde te llevan.",
          it:"Utile soprattutto per capire dove ti portano.",
          de:"Vor allem nützlich, um zu verstehen, wohin man gebracht wird.",
          ja:"どこへ運ばれるのかを理解するために役立ちます。イギリス英語では to hospital と冠詞をつけません。" } },

  { ref:"medecin", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le médecin"}, en:{m:"the doctor", p:"dok-teur"},
           es:{m:"el médico"}, it:{m:"il medico"},
           de:{m:"der Arzt", p:"artst"}, ja:{m:"医師", p:"ishi"} },
    def:{ fr:"⚠️ Sur un concours, celui qu'on cherche s'appelle **le médecin de secours** ou le secouriste : *the medic*, *the first-aider*. Demander « a doctor » peut faire chercher un cabinet en ville.",
          en:"At a show, the person you want is « the medic » or « the first-aider ». Asking for « a doctor » may send someone looking for a surgery in town.",
          es:"En un concurso se busca al médico de guardia o al socorrista.",
          it:"In gara si cerca il medico di servizio o il soccorritore.",
          de:"Auf dem Turnier sucht man den Sanitäter, nicht einen Arzt in der Stadt.",
          ja:"競技会で探すのは会場の救護担当（medic）です。doctor と言うと町の診療所を探されることがあります。" } },

  { ref:"aide", lecon:1, coll:"alerte",
    mots:{ fr:{m:"à l'aide !"}, en:{m:"help !", p:"hèlp"},
           es:{m:"¡ socorro !"}, it:{m:"aiuto !"},
           de:{m:"Hilfe !", p:"hil-fe"}, ja:{m:"助けて !", p:"tasukete"} },
    def:{ fr:"🟥 LE PREMIER MOT, celui qu'on crie avant d'expliquer. ⚠️ En espagnol on crie **¡socorro!** et non « ¡ayuda! » : le second veut dire « aide » au sens général. Ce mot est aussi dans le chapitre vétérinaire — on crie pareil pour un cheval échappé.",
          en:"The first word, shouted before you explain. Spanish shouts « ¡socorro! », not « ¡ayuda! ». This word is in the equine chapter too.",
          es:"La primera palabra. « ¡ Socorro ! » y no « ¡ ayuda ! », que es la ayuda en general.",
          it:"La prima parola. In spagnolo si grida « ¡socorro! », non « ¡ayuda! ».",
          de:"Das erste Wort. Spanisch ruft « ¡socorro! », nicht « ¡ayuda! ».",
          ja:"説明の前に叫ぶ最初のひとこと。スペイン語では ¡ayuda! ではなく ¡socorro! です。" } },

  { ref:"adresse", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'adresse"}, en:{m:"the address", p:"e-drèss"},
           es:{m:"la dirección"}, it:{m:"l'indirizzo"},
           de:{m:"die Adresse", p:"a-drè-sse"}, ja:{m:"住所", p:"jūsho"} },
    def:{ fr:"🟥 LA PREMIÈRE CHOSE QUE DEMANDENT LES SECOURS, avant même l'état de la victime — sans adresse, ils ne partent pas. ⚠️ À l'étranger, la savoir par cœur est illusoire : le vrai réflexe est de la **noter dans son téléphone** avant de monter, ou de savoir dire « je vous envoie ma position ».",
          en:"The first thing the emergency services ask, before the casualty's condition — without an address they don't set off. Abroad, don't rely on memory: save it in your phone before you ride, or know how to say « I'll send you my location ».",
          es:"Lo primero que piden los servicios de emergencia. En el extranjero, hay que guardarla en el móvil antes de montar.",
          it:"La prima cosa che chiedono i soccorsi. All'estero, salvarla nel telefono prima di montare.",
          de:"Das Erste, was der Rettungsdienst fragt. Im Ausland vorher ins Handy schreiben.",
          ja:"救急がまず尋ねるのは住所です。これがないと出動できません。海外では暗記に頼らず、乗る前に携帯に保存しておきます。" } },

  { ref:"telephone", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le téléphone"}, en:{m:"the phone", p:"fône"},
           es:{m:"el teléfono"}, it:{m:"il telefono"},
           de:{m:"das Handy", p:"hèn-di"}, ja:{m:"携帯電話", p:"keitai denwa"} },
    def:{ fr:"⚠️ L'ALLEMAND DIT **DAS HANDY** pour un portable — un faux anglicisme qui n'existe pas en anglais : dire « my handy » à un Anglais ne veut rien dire. L'anglais dit *my phone* ou *my mobile*. 🟥 On monte toujours avec son téléphone sur soi, jamais dans la sacoche de la selle : un cheval qui part emporte le téléphone avec lui.",
          en:"German says « das Handy » for a mobile — a false anglicism that means nothing in English. Always ride with your phone ON you, never in the saddle bag: a horse that gets away takes the phone with him.",
          es:"El alemán dice « das Handy », un falso anglicismo. Se monta siempre con el móvil encima, nunca en la alforja.",
          it:"Il tedesco dice « das Handy », un falso anglicismo. Si monta sempre con il telefono addosso, mai nella borsa della sella.",
          de:"« Handy » gibt es im Englischen nicht — dort heißt es « mobile » oder « phone ». Das Telefon immer am Körper tragen, nie in der Satteltasche.",
          ja:"ドイツ語では携帯を das Handy と言いますが、英語には存在しない語です。電話は必ず身につけて乗ります。鞍の鞄に入れると、馬が逃げたときに一緒に消えます。" } },

  { ref:"trousse-secours", lecon:1, coll:"alerte",
    mots:{ fr:{m:"la trousse de secours"}, en:{m:"the first aid kit", p:"feurst éïd kite"},
           es:{m:"el botiquín"}, it:{m:"la cassetta del pronto soccorso"},
           de:{m:"der Verbandskasten", p:"feur-bannts-kass-teune"}, ja:{m:"救急箱", p:"kyūkyūbako"} },
    def:{ fr:"⚠️ Toute écurie doit en avoir une, et savoir demander **où elle est** vaut mieux que savoir ce qu'elle contient. En anglais **first aid kit** est figé : jamais « emergency kit », jamais « care kit ». L'espagnol a un mot unique, *el botiquín*, qui ne ressemble à rien d'autre.",
          en:"Every yard must have one, and knowing how to ask WHERE IT IS beats knowing what's in it. « First aid kit » is fixed — never « emergency kit ».",
          es:"Toda cuadra debe tener uno. « El botiquín » es una palabra única que no se parece a ninguna otra.",
          it:"Ogni scuderia deve averne una. Saper chiedere DOV'È vale più che sapere cosa contiene.",
          de:"Jeder Stall muss einen haben. Zu wissen, WO er ist, hilft mehr als zu wissen, was drin ist.",
          ja:"どの厩舎にも備えがあります。中身を知るより「どこにあるか」を尋ねられることが大切です。スペイン語の botiquín は他に似た語のない単語です。" } },

  /* ---------- la chute ---------- */

  { ref:"chute", lecon:1, coll:"chute",
    mots:{ fr:{m:"la chute"}, en:{m:"the fall", p:"fol"},
           es:{m:"la caída"}, it:{m:"la caduta"},
           de:{m:"der Sturz", p:"chtourts"}, ja:{m:"落馬", p:"rakuba"} },
    def:{ fr:"⚠️ LE JAPONAIS A UN MOT PROPRE AU CHEVAL : 落馬 (rakuba), littéralement « tomber du cheval » — il ne s'emploie pour rien d'autre. Les cinq autres langues utilisent le mot général de la chute.",
          en:"Japanese has a horse-specific word, 落馬 (rakuba), « falling from a horse », used for nothing else. The other five use the general word.",
          es:"El japonés tiene una palabra propia del caballo: 落馬, que no se usa para nada más.",
          it:"Il giapponese ha una parola specifica del cavallo: 落馬, che non si usa per altro.",
          de:"Japanisch hat ein eigenes Wort fürs Pferd: 落馬, das für nichts anderes gilt.",
          ja:"落馬という語は馬から落ちることだけを指し、他の言語にはこうした専用語がありません。" } },

  { ref:"tomber", lecon:1, coll:"chute",
    mots:{ fr:{m:"tomber de cheval"}, en:{m:"to come off", p:"keum off", var:"to fall off"},
           es:{m:"caerse del caballo"}, it:{m:"cadere da cavallo"},
           de:{m:"vom Pferd fallen", p:"fom pfèrt fa-leune"}, ja:{m:"落馬する", p:"rakuba suru"} },
    def:{ fr:"🟥 EN ANGLAIS D'ÉCURIE ON DIT **TO COME OFF**, pas « to fall » : *she came off at the third fence*. « To fall down » se dit d'un humain qui trébuche à pied, jamais d'un cavalier. ⚠️ Et il y a une nuance entre *to come off* (le cavalier tombe seul) et *to have a fall* (chute avec le cheval).",
          en:"Stable English says « to come off », not « to fall »: she came off at the third fence. « To fall down » is for someone tripping on foot.",
          es:"En inglés de cuadra se dice « to come off », no « to fall ».",
          it:"Nell'inglese di scuderia si dice « to come off », non « to fall ».",
          de:"Im Stallenglisch sagt man « to come off », nicht « to fall ».",
          ja:"厩舎英語では to fall ではなく to come off と言います。to fall down は歩いていて転ぶ人に使い、騎手には使いません。" } },

  { ref:"commotion", lecon:1, coll:"chute",
    mots:{ fr:{m:"la commotion cérébrale"}, en:{m:"concussion", p:"keune-keu-cheune"},
           es:{m:"la conmoción cerebral"}, it:{m:"la commozione cerebrale"},
           de:{m:"die Gehirnerschütterung", p:"gué-hirn-èr-chu-te-roung"}, ja:{m:"脳震盪", p:"nōshintō"} },
    def:{ fr:"🟥 LA BLESSURE LA PLUS FRÉQUENTE ET LA PLUS SOUS-ESTIMÉE. Elle n'exige NI perte de connaissance NI choc violent : un cavalier qui se relève seul, parle normalement et se sent bien peut être commotionné.\n\n**LES SIGNES D'ALERTE APRÈS UN CHOC À LA TÊTE** — perte de connaissance · ne pas se rappeler la chute · confusion · répéter les mêmes questions · vomissements répétés · somnolence croissante · troubles de l'équilibre · vision double ou trouble · difficulté à parler ou à marcher · convulsion · aggravation de l'état de conscience.\n\n🟥 **PAS DE RETOUR À CHEVAL LE JOUR MÊME**, et la reprise se fait selon avis médical. La règle du monde équestre est : *if in doubt, sit them out*.",
          en:"The commonest and most underestimated injury. It needs NEITHER loss of consciousness NOR a violent blow: a rider who gets up alone, talks normally and feels fine can be concussed.\n\nWARNING SIGNS AFTER A BLOW TO THE HEAD — loss of consciousness · not remembering the fall · confusion · repeated questions · repeated vomiting · increasing drowsiness · balance problems · double or blurred vision · difficulty speaking or walking · seizure · worsening level of consciousness.\n\nNo getting back on that day, and return to riding follows medical advice. « If in doubt, sit them out. »",
          es:"La lesión más frecuente y más subestimada. No requiere pérdida de conocimiento ni golpe violento: quien se levanta solo, habla con normalidad y se siente bien puede tener una conmoción.\n\n**SEÑALES DE ALERTA TRAS UN GOLPE EN LA CABEZA** — pérdida de conocimiento · no recordar la caída · confusión · repetir las mismas preguntas · vómitos repetidos · somnolencia creciente · problemas de equilibrio · visión doble o borrosa · dificultad para hablar o andar · convulsión · empeoramiento del nivel de conciencia.\n\n🟥 **No se vuelve a montar ese día**, y la reanudación sigue el criterio médico.",
          it:"La lesione più frequente e più sottovalutata. Non richiede né perdita di coscienza né un colpo violento: chi si rialza da solo, parla normalmente e si sente bene può avere una commozione.\n\n**SEGNALI D'ALLARME DOPO UN COLPO ALLA TESTA** — perdita di coscienza · non ricordare la caduta · confusione · ripetere le stesse domande · vomito ripetuto · sonnolenza crescente · problemi di equilibrio · vista doppia o offuscata · difficoltà a parlare o camminare · convulsione · peggioramento dello stato di coscienza.\n\n🟥 **Non si rimonta quel giorno**, e la ripresa segue il parere medico.",
          de:"Die häufigste und am meisten unterschätzte Verletzung. Sie braucht weder Bewusstlosigkeit noch einen heftigen Schlag: wer allein aufsteht, normal spricht und sich gut fühlt, kann eine Gehirnerschütterung haben.\n\n**WARNZEICHEN NACH EINEM SCHLAG AUF DEN KOPF** — Bewusstlosigkeit · keine Erinnerung an den Sturz · Verwirrtheit · wiederholte gleiche Fragen · wiederholtes Erbrechen · zunehmende Schläfrigkeit · Gleichgewichtsstörungen · Doppelbilder oder verschwommenes Sehen · Sprech- oder Gehschwierigkeiten · Krampfanfall · sich verschlechterndes Bewusstsein.\n\n🟥 **An diesem Tag wird nicht wieder aufgestiegen**, und die Rückkehr richtet sich nach ärztlichem Rat.",
          ja:"最も多く、最も軽視される怪我。意識を失う必要も、強い衝撃も必要ありません。自分で立ち上がり、普通に話し、本人は大丈夫だと言っても脳震盪のことがあります。\n\n**頭部を打ったあとの警告サイン** — 意識を失う・落馬を覚えていない・混乱・同じ質問を繰り返す・繰り返す嘔吐・眠気が増していく・平衡感覚の異常・物が二重に見える、ぼやける・話しにくい、歩きにくい・けいれん・意識の状態が悪くなっていく。\n\n🟥 **その日は馬に乗りません。** 再開は医師の判断に従います。" } },

  { ref:"perdre-connaissance", lecon:1, coll:"chute",
    mots:{ fr:{m:"perdre connaissance"}, en:{m:"to be knocked out", p:"nokt aoute", var:"to lose consciousness"},
           es:{m:"perder el conocimiento"}, it:{m:"perdere conoscenza"},
           de:{m:"das Bewusstsein verlieren", p:"be-vousst-zaïn"}, ja:{m:"意識を失う", p:"ishiki o ushinau"} },
    def:{ fr:"🟥 CE QUI DÉCLENCHE L'APPEL, même de quelques secondes, même si la personne va bien après. ⚠️ L'anglais courant dit **knocked out** — *she was knocked out for a few seconds* ; « unconscious » est le mot écrit, celui du rapport. Et ce n'est pas la victime qui le dit : c'est le témoin.",
          en:"What triggers the call — even a few seconds, even if the person seems fine afterwards. Everyday English is « knocked out »; « unconscious » is the written word. And the casualty can't tell you: the witness must.",
          es:"Lo que desencadena la llamada, aunque sean unos segundos y la persona parezca bien después.",
          it:"Ciò che fa scattare la chiamata, anche solo per qualche secondo.",
          de:"Was den Anruf auslöst — auch nur ein paar Sekunden, auch wenn es der Person danach gut geht.",
          ja:"たとえ数秒でも、あとで本人が元気に見えても、救急を呼ぶ理由になります。英語では knocked out が日常語で、unconscious は書き言葉です。本人には言えないので、周りの人が伝えます。" } },

  { ref:"perte-memoire", lecon:1, coll:"chute",
    mots:{ fr:{m:"la perte de mémoire"}, en:{m:"memory loss", p:"mè-me-ri loss", var:"she doesn't remember"},
           es:{m:"la pérdida de memoria"}, it:{m:"la perdita di memoria"},
           de:{m:"der Gedächtnisverlust", p:"gué-dèch-tniss-feur-lousst"}, ja:{m:"記憶の喪失", p:"kioku no sōshitsu"} },
    def:{ fr:"🟥 À DISTINGUER DE LA PERTE DE CONNAISSANCE : on peut ne pas s'être évanoui et ne rien se rappeler. C'est le signe le PLUS FRÉQUENT de la commotion, et le plus trompeur — la personne se sent bien, marche, parle, et ne sait pas comment elle est arrivée là. ⚠️ En pratique on ne dit pas « memory loss » mais **she doesn't remember the fall**.",
          en:"Not the same as being knocked out: you can stay conscious and remember nothing. It's the commonest sign of concussion and the most deceptive — the person feels fine, walks, talks, and has no idea how they got there. In practice you say « she doesn't remember the fall ».",
          es:"No es lo mismo que perder el conocimiento: se puede seguir consciente y no recordar nada. Es el signo más frecuente de la conmoción.",
          it:"Non è la stessa cosa della perdita di coscienza: si può restare coscienti e non ricordare nulla. È il segno più frequente della commozione.",
          de:"Nicht dasselbe wie Bewusstlosigkeit: man kann bei Bewusstsein bleiben und sich an nichts erinnern. Das häufigste Zeichen einer Gehirnerschütterung.",
          ja:"意識喪失とは別です。気を失わなくても何も覚えていないことがあります。脳震盪の最も多い兆候で、最も紛らわしいものです。本人は元気で歩き、話し、どうしてここにいるのか分からないのです。" } },

  { ref:"evanouir", lecon:1, coll:"chute",
    mots:{ fr:{m:"s'évanouir"}, en:{m:"to faint", p:"féïnte", var:"to pass out"},
           es:{m:"desmayarse"}, it:{m:"svenire"},
           de:{m:"ohnmächtig werden", p:"ône-mèch-tich"}, ja:{m:"気を失う", p:"ki o ushinau"} },
    def:{ fr:"⚠️ Différent de la perte de connaissance sur choc : un évanouissement peut venir de la douleur, de la chaleur ou de la vue du sang, sans traumatisme. L'anglais dit **to faint** ou *to pass out* — le second est plus familier et plus fréquent à l'oral.",
          en:"Different from being knocked out: fainting can come from pain, heat or the sight of blood, with no trauma. « To pass out » is the more colloquial and commoner spoken form.",
          es:"Distinto de la pérdida de conocimiento por golpe: se puede desmayar por dolor, calor o al ver sangre.",
          it:"Diverso dalla perdita di coscienza da urto: si può svenire per dolore, caldo o alla vista del sangue.",
          de:"Anders als Bewusstlosigkeit nach einem Schlag: Ohnmacht kann von Schmerz, Hitze oder Blut kommen.",
          ja:"衝撃による意識喪失とは別です。痛み、暑さ、血を見たことでも気を失います。英語では to faint、口語では to pass out。" } },

  { ref:"fracture", lecon:1, coll:"chute",
    mots:{ fr:{m:"la fracture"}, en:{m:"a broken bone", p:"brô-keune bône", var:"a fracture"},
           es:{m:"la fractura"}, it:{m:"la frattura"},
           de:{m:"der Bruch", p:"brourr"}, ja:{m:"骨折", p:"kossetsu"} },
    def:{ fr:"⚠️ EN ANGLAIS ORDINAIRE ON DIT **a broken bone**, ou *I've broken my arm* : « a fracture » est le mot du médecin et de la radio. 🟥 SUR UN ACCIDENT, ON NE DIAGNOSTIQUE PAS : on décrit ce qu'on voit — membre déformé, douleur importante, impossibilité de prendre appui. On ne force pas le mouvement et on attend l'évaluation médicale. La bonne formule est *I think her arm's broken*, jamais une certitude.",
          en:"Everyday English says « a broken bone » or « I've broken my arm »: « a fracture » is the doctor's word. At the scene you do not diagnose — you describe what you see: a deformed limb, severe pain, unable to bear weight. Don't force the movement, and wait for medical assessment. « I think her arm's broken » is the right phrasing, never a certainty.",
          es:"En inglés corriente se dice « a broken bone »; « a fracture » es la palabra del médico. 🟥 En un accidente no se diagnostica: se describe lo que se ve — miembro deformado, dolor importante, imposibilidad de apoyar. No se fuerza el movimiento y se espera la evaluación médica.",
          it:"In inglese corrente si dice « a broken bone »; « a fracture » è la parola del medico. 🟥 Su un incidente non si diagnostica: si descrive quello che si vede — arto deformato, dolore importante, impossibilità di appoggiare. Non si forza il movimento e si attende la valutazione medica.",
          de:"Alltagsenglisch sagt « a broken bone »; « a fracture » ist das Arztwort. 🟥 Am Unfallort stellt man keine Diagnose: man beschreibt, was man sieht — verformtes Glied, starke Schmerzen, kein Auftreten möglich. Die Bewegung nicht erzwingen und die ärztliche Beurteilung abwarten.",
          ja:"日常英語では a broken bone、または I've broken my arm と言います。a fracture は医師や画像診断の語です。🟥 事故の現場では診断しません。見えることを述べます — 手足の変形、強い痛み、体重をかけられない。動きを無理に確かめず、医師の評価を待ちます。" } },

  { ref:"entorse", lecon:1, coll:"chute",
    mots:{ fr:{m:"l'entorse"}, en:{m:"a sprain", p:"spréïne"},
           es:{m:"el esguince"}, it:{m:"la distorsione"},
           de:{m:"die Verstauchung", p:"feur-chtaou-roung"}, ja:{m:"捻挫", p:"nenza"} },
    def:{ fr:"🟥 LA BLESSURE CLASSIQUE DU PIED COINCÉ DANS L'ÉTRIER, et souvent confondue avec une fracture sur le moment : ça enfle, ça ne porte plus, on ne peut pas trancher sans radio. ⚠️ Aucune des six langues ne se ressemble ici : entorse, sprain, esguince, distorsione, Verstauchung, 捻挫.",
          en:"The classic injury from a foot caught in the stirrup, and often taken for a break at the time: it swells, it won't bear weight, and you can't tell without an X-ray. No two of the six languages look alike.",
          es:"La lesión clásica del pie atrapado en el estribo, a menudo confundida con una fractura.",
          it:"La lesione classica del piede bloccato nella staffa, spesso confusa con una frattura.",
          de:"Die klassische Verletzung, wenn der Fuß im Bügel hängen bleibt, oft mit einem Bruch verwechselt.",
          ja:"鐙に足が挟まったときの典型的な怪我で、その場では骨折と区別できません。六言語がまったく似ていない語です。" } },

  { ref:"douleur", lecon:1, coll:"chute",
    mots:{ fr:{m:"la douleur"}, en:{m:"the pain", p:"péïne"},
           es:{m:"el dolor"}, it:{m:"il dolore"},
           de:{m:"der Schmerz", p:"chmèrts"}, ja:{m:"痛み", p:"itami"} },
    def:{ fr:"⚠️ En anglais, **it hurts** est bien plus employé que « I have pain » : *my neck hurts*, *it hurts when I breathe*. Le nom sert au médecin, le verbe sert à la victime.",
          en:"« It hurts » is far commoner than « I have pain »: my neck hurts, it hurts when I breathe. The noun is for the doctor, the verb for the casualty.",
          es:"En inglés « it hurts » se usa mucho más que « I have pain ».",
          it:"In inglese « it hurts » si usa molto più di « I have pain ».",
          de:"« It hurts » ist viel gebräuchlicher als « I have pain ».",
          ja:"英語では I have pain より it hurts をはるかによく使います。名詞は医師のため、動詞は当人のためです。" } },

  { ref:"sang", lecon:1, coll:"chute",
    mots:{ fr:{m:"le sang"}, en:{m:"the blood", p:"bleudd"},
           es:{m:"la sangre"}, it:{m:"il sangue"},
           de:{m:"das Blut", p:"bloute"}, ja:{m:"血", p:"chi"} },
    def:{ fr:"⚠️ CE MOT EST DANS LES DEUX CHAPITRES D'URGENCE, sur décision de Blandine : un cheval qui saigne et un cavalier qui saigne, ce n'est pas la même urgence, mais c'est le même mot à savoir dire. L'anglais **blood** se prononce « bleudd », pas « blouud ».",
          en:"This word is in both emergency chapters. English « blood » rhymes with « mud », not with « food ».",
          es:"Esta palabra está en los dos capítulos de urgencias.",
          it:"Questa parola è nei due capitoli d'urgenza.",
          de:"Dieses Wort steht in beiden Notfall-Kapiteln.",
          ja:"この語は緊急の二つの章の両方にあります。" } },

  { ref:"plaie", lecon:1, coll:"chute",
    mots:{ fr:{m:"la plaie"}, en:{m:"the wound", p:"ouound", var:"the cut"},
           es:{m:"la herida"}, it:{m:"la ferita"},
           de:{m:"die Wunde", p:"voun-de"}, ja:{m:"傷", p:"kizu"} },
    def:{ fr:"⚠️ Sur un humain, l'anglais courant dit plus souvent **a cut** que « a wound » — ce dernier sonne grave ou militaire. Pour une plaie de cavalier on dira *she's got a nasty cut on her head*.",
          en:"On a person, everyday English says « a cut » more often than « a wound », which sounds grave or military: « she's got a nasty cut on her head ».",
          es:"En una persona, el inglés dice más « a cut » que « a wound ».",
          it:"Su una persona, l'inglese dice più spesso « a cut » che « a wound ».",
          de:"Bei einem Menschen sagt Englisch öfter « a cut » als « a wound ».",
          ja:"人については、英語では a wound より a cut をよく使います。wound は重々しく、軍事的に響きます。" } },

  { ref:"points-de-suture", lecon:1, coll:"chute",
    mots:{ fr:{m:"les points de suture"}, en:{m:"stitches", p:"stit-chizz"},
           es:{m:"los puntos de sutura"}, it:{m:"i punti di sutura"},
           de:{m:"die Stiche", p:"chti-che"}, ja:{m:"縫合", p:"hōgō"} },
    def:{ fr:"⚠️ CE MOT EST AUSSI DANS LE CHAPITRE VÉTÉRINAIRE : une plaie se décrit de la même façon sur un homme et sur un cheval. L'anglais courant dit **stitches** ; *sutures* est le mot du chirurgien.",
          en:"This word is in the equine chapter too — a wound is described the same way on a person and on a horse. « Stitches » in everyday English; « sutures » is the surgeon's word.",
          es:"Esta palabra está también en el capítulo veterinario. El inglés corriente dice « stitches ».",
          it:"Questa parola è anche nel capitolo veterinario. L'inglese corrente dice « stitches ».",
          de:"Dieses Wort steht auch im Tier-Kapitel. Alltagsenglisch sagt « stitches ».",
          ja:"この語は獣医の章にもあります。傷の説明は人でも馬でも同じです。英語では日常語で stitches と言います。" } },

  /* ---------- le corps ---------- */

  { ref:"nuque", lecon:1, coll:"corps",
    mots:{ fr:{m:"la nuque"}, en:{m:"the neck", p:"nèk"},
           es:{m:"la nuca"}, it:{m:"la nuca"},
           de:{m:"der Nacken", p:"na-keune"}, ja:{m:"首の後ろ", p:"kubi no ushiro"} },
    def:{ fr:"🟥 LA ZONE QUI DÉCIDE SI L'ON BOUGE QUELQU'UN OU PAS. Une douleur à la nuque après une chute impose de ne PLUS bouger la personne du tout et d'attendre les secours. ⚠️ L'anglais n'a qu'un mot, **neck**, pour le cou et la nuque : *my neck hurts* suffit et se comprend.",
          en:"The area that decides whether you move someone. Neck pain after a fall means don't move them at all and wait for help. English has one word for both cou and nuque: « my neck hurts » is enough.",
          es:"La zona que decide si se mueve a alguien o no. Un dolor de nuca tras una caída obliga a no moverla.",
          it:"La zona che decide se muovere qualcuno. Un dolore alla nuca dopo una caduta impone di non muoverla.",
          de:"Die Zone, die entscheidet, ob man jemanden bewegt. Nackenschmerz nach einem Sturz heißt: nicht bewegen.",
          ja:"人を動かしてよいかを決める部位。落馬後に首の後ろが痛むなら、まったく動かさず救急を待ちます。英語では首も後頸部も neck の一語です。" } },

  { ref:"dos", lecon:1, coll:"corps",
    mots:{ fr:{m:"le dos"}, en:{m:"the back", p:"bak"},
           es:{m:"la espalda"}, it:{m:"la schiena"},
           de:{m:"der Rücken", p:"ru-keune"}, ja:{m:"背中", p:"senaka"} },
    def:{ fr:"⚠️ Comme la nuque : une douleur au dos après une chute interdit de relever la personne. On la laisse exactement où elle est, on la couvre, et on attend. 🟥 Le réflexe de « l'asseoir pour qu'elle soit mieux » est ce qui aggrave les lésions vertébrales.",
          en:"Like the neck: back pain after a fall means don't sit them up. Leave them exactly where they are, keep them warm, and wait. The instinct to « sit them up so they're comfier » is what worsens spinal injuries.",
          es:"Como la nuca: un dolor de espalda tras una caída prohíbe levantar a la persona.",
          it:"Come la nuca: un dolore alla schiena dopo una caduta vieta di rialzare la persona.",
          de:"Wie der Nacken: Rückenschmerz nach einem Sturz heißt, die Person nicht aufzurichten.",
          ja:"首と同様、落馬後に背中が痛むなら起こしてはいけません。そのままの位置に留め、保温して待ちます。「楽になるよう座らせる」という反応が脊椎の損傷を悪化させます。" } },

  { ref:"respirer", lecon:1, coll:"corps",
    mots:{ fr:{m:"respirer"}, en:{m:"to breathe", p:"briize"},
           es:{m:"respirar"}, it:{m:"respirare"},
           de:{m:"atmen", p:"at-meune"}, ja:{m:"呼吸する", p:"kokyū suru"} },
    def:{ fr:"🟥 LA PREMIÈRE CHOSE QU'ON VÉRIFIE, avant toute question. ⚠️ Piège de prononciation en anglais : le VERBE **to breathe** se dit « briize » avec un z, le NOM *breath* se dit « brèss » avec un s. Deux mots, deux sons.",
          en:"The first thing you check, before any question. Pronunciation trap: the verb « breathe » ends in a z sound, the noun « breath » in an s.",
          es:"Lo primero que se comprueba, antes de cualquier pregunta.",
          it:"La prima cosa che si verifica, prima di qualsiasi domanda.",
          de:"Das Erste, was man prüft, vor jeder Frage.",
          ja:"どんな質問よりも先に確認すること。英語では動詞 breathe は「ブリーズ」、名詞 breath は「ブレス」と、音が違います。" } },

  /* ---------- ce qu'on fait, ce qu'on ne fait pas ---------- */

  { ref:"bouger-pas", lecon:1, coll:"geste",
    mots:{ fr:{m:"ne pas bouger"}, en:{m:"don't move", p:"dônte mouve"},
           es:{m:"no moverse"}, it:{m:"non muoversi"},
           de:{m:"sich nicht bewegen", p:"be-vé-gueune"}, ja:{m:"動かない", p:"ugokanai"} },
    def:{ fr:"🟥 LA CONSIGNE LA PLUS IMPORTANTE DU CHAPITRE, et celle qui va contre tous les réflexes : quelqu'un qui vient de tomber veut se relever pour montrer que ça va. ⚠️ On ne relève JAMAIS quelqu'un qui a mal à la nuque ou au dos, et on ne le laisse pas se relever seul. 🟥 ET ON NE LUI DEMANDE PAS DE « TESTER » SES MOUVEMENTS : bouger un membre pour voir si ça marche est exactement ce qu'il ne faut pas faire. On interroge les SENSATIONS — fourmillements, engourdissements — et on attend les secours, sauf danger immédiat.",
          en:"The most important instruction here, and it goes against every instinct: someone who's just fallen wants to get up to show they're fine. Never sit up or stand up anyone with neck or back pain. And never ask them to test their movements: moving a limb to see whether it works is exactly what not to do. Ask about sensation instead — tingling, numbness — and wait for the paramedics, unless there is immediate danger.",
          es:"La consigna más importante, y va contra todos los reflejos: quien acaba de caer quiere levantarse para demostrar que está bien. ⚠️ Nunca se levanta a alguien con dolor de cuello o espalda, y no se le pide que « pruebe » sus movimientos: mover un miembro para ver si funciona es justo lo que no hay que hacer. Se pregunta por las sensaciones — hormigueo, entumecimiento — y se espera a los servicios de emergencia, salvo peligro inmediato.",
          it:"La consegna più importante, e va contro ogni riflesso: chi è appena caduto vuole rialzarsi per mostrare che sta bene. ⚠️ Non si rialza mai chi ha male al collo o alla schiena, e non gli si chiede di « provare » i movimenti: muovere un arto per vedere se funziona è proprio ciò che non va fatto. Si chiede delle sensazioni — formicolii, intorpidimento — e si aspettano i soccorsi, salvo pericolo immediato.",
          de:"Die wichtigste Anweisung hier, und sie widerspricht jedem Reflex: wer gerade gestürzt ist, will aufstehen. ⚠️ Niemanden mit Hals- oder Rückenschmerzen aufrichten, und ihn seine Bewegungen nicht « testen » lassen: ein Glied zu bewegen, um zu sehen, ob es geht, ist genau das Falsche. Man fragt nach dem Gefühl — Kribbeln, Taubheit — und wartet auf den Rettungsdienst, außer bei unmittelbarer Gefahr.",
          ja:"この章で最も重要な指示。そして本能に反します。落ちた人は「大丈夫」と示すために立ち上がろうとします。首や背中が痛い人は、絶対に起こさず、自分で立たせません。🟥 そして動きを「試させて」はいけません。手足を動かして確かめるのは、まさにやってはいけないことです。感覚を尋ねます — ぴりぴり感、しびれ — そして差し迫った危険がなければ、救急を待ちます。" } },

  { ref:"ne-pas-retirer-bombe", lecon:1, coll:"geste",
    mots:{ fr:{m:"ne pas retirer la bombe"}, en:{m:"don't take the hat off", p:"téïk ze hatt off"},
           es:{m:"no quitar el casco"}, it:{m:"non togliere il cap"},
           de:{m:"die Kappe nicht abnehmen", p:"app-né-meune"}, ja:{m:"ヘルメットを外さない", p:"herumetto o hazusanai"} },
    def:{ fr:"🟥 LA CONSIGNE QU'ON OUBLIE, ET LA PLUS DANGEREUSE À IGNORER. Après une chute avec suspicion de traumatisme crânien ou cervical, ne retire pas inutilement la bombe et évite de bouger la tête ou le cou : ce seul geste peut faire le mal. Laisse-la en place en attendant les secours **si la personne respire normalement**. ⚠️ SI LES VOIES AÉRIENNES SONT MENACÉES OU SI ELLE NE RESPIRE PAS NORMALEMENT, la respiration devient prioritaire. Après un choc important, le casque doit être contrôlé et généralement remplacé, selon les recommandations du fabricant.",
          en:"The instruction people forget, and the most dangerous to ignore. After a fall with a suspected head or neck injury, don't remove the riding hat unnecessarily and avoid moving the head or neck — that one movement can do the damage. Leave it in place while waiting for help if the casualty is breathing normally. If the airway is compromised or the casualty is not breathing normally, airway and breathing take priority. After a significant impact, the hat should be checked and usually replaced according to the manufacturer's guidance.",
          es:"La consigna que se olvida y la más peligrosa de ignorar. Tras una caída con sospecha de lesión craneal o cervical, no quites el casco innecesariamente y evita mover la cabeza o el cuello. Déjalo puesto mientras esperas a los servicios de emergencia **si la persona respira normalmente**. ⚠️ Si la vía aérea está comprometida o no respira con normalidad, la vía aérea y la respiración son prioritarias. Tras un impacto importante, el casco debe revisarse y en general sustituirse según las indicaciones del fabricante.",
          it:"La consegna che si dimentica e la più pericolosa da ignorare. Dopo una caduta con sospetto trauma cranico o cervicale, non togliere il cap inutilmente ed evita di muovere la testa o il collo. Lascialo in sede aspettando i soccorsi **se la persona respira normalmente**. ⚠️ Se le vie aeree sono compromesse o se non respira normalmente, vie aeree e respirazione hanno la priorità. Dopo un impatto importante il cap va controllato e di norma sostituito, secondo le indicazioni del produttore.",
          de:"Die Anweisung, die man vergisst, und die gefährlichste. Nach einem Sturz mit Verdacht auf Kopf- oder Halsverletzung den Helm nicht unnötig abnehmen und Kopf und Hals nicht bewegen. Er bleibt drauf, bis Hilfe kommt — **wenn die Person normal atmet**. ⚠️ Sind die Atemwege bedroht oder atmet sie nicht normal, haben Atemwege und Atmung Vorrang. Nach einem starken Aufprall muss der Helm überprüft und in der Regel ersetzt werden, nach den Angaben des Herstellers.",
          ja:"忘れられがちで、無視すると最も危険な指示。頭部や首の受傷が疑われる落馬のあとは、ヘルメットを不必要に外さず、頭や首を動かさないこと。その動作だけで損傷が起きることがあります。**呼吸が正常なら**、救急が来るまでそのままにします。⚠️ 気道が脅かされている、あるいは呼吸が正常でない場合は、気道と呼吸が優先します。強い衝撃を受けたあとのヘルメットは点検し、製造元の指示に従って通常は交換します。" } },

  { ref:"ne-pas-remonter", lecon:1, coll:"geste",
    mots:{ fr:{m:"ne pas remonter"}, en:{m:"not to get back on", p:"guètt bak onn"},
           es:{m:"no volver a montar"}, it:{m:"non rimontare"},
           de:{m:"nicht wieder aufsteigen", p:"aouf-chtaï-gueune"}, ja:{m:"再騎乗しない", p:"saikijō shinai"} },
    def:{ fr:"🟥 CONTRE LA TRADITION ÉQUESTRE, et volontairement. « Il faut toujours remonter » est vrai pour la confiance, faux après un choc à la tête. ⚠️ Toute fédération applique aujourd'hui la même règle : après une commotion suspectée, on ne remonte pas ce jour-là, et on ne reprend qu'avec un avis médical. *If in doubt, sit them out.*",
          en:"Against the tradition, deliberately. « You should always get back on » is true for confidence, false after a blow to the head. Every federation now applies the same rule: suspected concussion means no riding that day, and no return without medical clearance.",
          es:"Contra la tradición, a propósito. « Hay que volver a montar » es cierto para la confianza, falso tras un golpe en la cabeza.",
          it:"Contro la tradizione, volutamente. « Bisogna sempre rimontare » è vero per la fiducia, falso dopo un colpo alla testa.",
          de:"Absichtlich gegen die Tradition. « Man muss immer wieder aufsteigen » gilt fürs Vertrauen, nicht nach einem Schlag auf den Kopf.",
          ja:"あえて伝統に反します。「必ず乗り直せ」は自信のためには正しくても、頭を打ったあとには誤りです。現在どの連盟も同じ規則を適用しています。脳震盪が疑われる日は乗りません。" } },

  { ref:"rester-calme", lecon:1, coll:"geste",
    mots:{ fr:{m:"rester calme"}, en:{m:"to stay calm", p:"stéï kam"},
           es:{m:"mantener la calma"}, it:{m:"restare calmi"},
           de:{m:"ruhig bleiben", p:"rou-ich blaï-beune"}, ja:{m:"落ち着く", p:"ochitsuku"} },
    def:{ fr:"⚠️ L'anglais **calm** ne prononce pas le L : « kam ». Et le mot sert aussi bien à la victime qu'à ceux qui l'entourent — un attroupement affolé empêche les secours d'approcher et effraie le cheval.",
          en:"« Calm » has a silent L: « kam ». And it's for the bystanders as much as the casualty — a panicking crowd stops help getting through and frightens the horse.",
          es:"Sirve tanto para la víctima como para los que la rodean: un grupo agitado impide llegar a los socorros.",
          it:"Serve tanto per la vittima quanto per chi la circonda: una folla agitata impedisce ai soccorsi di arrivare.",
          de:"Gilt für die Umstehenden so wie für den Verletzten — eine aufgeregte Menge hält die Hilfe auf.",
          ja:"英語の calm は L を発音せず「カーム」です。この語は本人だけでなく周囲にも向けられます。人が騒げば救急が近づけず、馬も怯えます。" } },

  { ref:"reculer", lecon:1, coll:"geste",
    mots:{ fr:{m:"reculer"}, en:{m:"to stand back", p:"stannd bak"},
           es:{m:"echarse atrás"}, it:{m:"farsi indietro"},
           de:{m:"zurücktreten", p:"tsou-ruk-tré-teune"}, ja:{m:"下がる", p:"sagaru"} },
    def:{ fr:"⚠️ EN ANGLAIS ON DIT **STAND BACK**, jamais « go back » ni « reverse ». Et le mot vient de Kildare, où il servait face à un cheval : ici c'est pour écarter la foule. 🟥 Donner la RAISON fait reculer les gens : « reculez » se discute, « laissez-lui de la place pour respirer » ne se discute pas.",
          en:"« Stand back », never « go back ». Giving the reason is what makes people move: « stand back » can be argued with, « give her space so she can breathe » cannot.",
          es:"En inglés « stand back ». Dar la razón es lo que hace retroceder a la gente.",
          it:"In inglese « stand back ». Dare la ragione è ciò che fa indietreggiare la gente.",
          de:"Englisch « stand back ». Der Grund ist es, der die Leute zurücktreten lässt.",
          ja:"英語では stand back と言います。理由を言うと人は本当に下がります。「下がって」は議論されますが、「呼吸できるように場所を空けて」は議論されません。" } },

  { ref:"ca-va", lecon:1, coll:"geste",
    mots:{ fr:{m:"est-ce que ça va ?"}, en:{m:"are you all right ?", p:"ol raïte"},
           es:{m:"¿ estás bien ?"}, it:{m:"tutto bene ?"},
           de:{m:"alles in Ordnung ?", p:"ord-noung"}, ja:{m:"大丈夫ですか", p:"daijōbu desu ka"} },
    def:{ fr:"⚠️ LA QUESTION QUI NE RENSEIGNE SUR RIEN — tout le monde répond « oui ». Elle sert seulement à vérifier que la personne PARLE : une réponse en phrase entière prouve qu'elle respire et qu'elle est consciente. Le vrai examen commence après, avec les questions du dialogue.",
          en:"The question that tells you nothing — everyone says yes. Its only use is to check the person TALKS: a full-sentence answer proves they're breathing and conscious. The real assessment starts after.",
          es:"La pregunta que no informa de nada: todos dicen que sí. Solo sirve para comprobar que la persona habla.",
          it:"La domanda che non informa di niente: tutti dicono sì. Serve solo a verificare che la persona parli.",
          de:"Die Frage, die nichts verrät — alle sagen ja. Sie prüft nur, ob die Person SPRICHT.",
          ja:"何も分からない質問です。誰でも「はい」と答えます。唯一の意味は、その人が「話せる」ことの確認です。文章で答えられれば、呼吸と意識があります。" } },

  { ref:"danger", lecon:1, coll:"geste",
    mots:{ fr:{m:"le danger"}, en:{m:"the danger", p:"déïn-djeur"},
           es:{m:"el peligro"}, it:{m:"il pericolo"},
           de:{m:"die Gefahr", p:"gué-far"}, ja:{m:"危険", p:"kiken"} },
    def:{ fr:"🟥 LA PREMIÈRE RÈGLE DE TOUT SECOURISME : on protège avant de soigner. Sur un accident équestre, le danger est le cheval qui reste sur place, la circulation si c'est en extérieur, et les autres chevaux du groupe. ⚠️ On ne se penche pas sur un blessé avec un cheval libre à côté.",
          en:"The first rule of first aid: make it safe before you treat. In a riding accident the danger is the horse still there, traffic if you're out, and the other horses in the group. Don't kneel over a casualty with a loose horse beside you.",
          es:"La primera regla del socorrismo: proteger antes de curar. El peligro es el caballo que sigue ahí, el tráfico y los demás caballos.",
          it:"La prima regola del soccorso: proteggere prima di curare. Il pericolo è il cavallo ancora lì, il traffico, gli altri cavalli.",
          de:"Die erste Regel der Ersten Hilfe: sichern, bevor man hilft. Die Gefahr ist das Pferd, der Verkehr, die anderen Pferde.",
          ja:"救急の第一原則は「治療より先に安全確保」。馬術の事故では、その場に残る馬、外なら交通、そして群れの他の馬が危険です。馬が放れている横で負傷者にかがみ込んではいけません。" } },

  /* ---------- le mécanisme de la chute ---------- */

  { ref:"par-dessus-epaule", lecon:1, coll:"mecanisme",
    mots:{ fr:{m:"passer par-dessus l'épaule"}, en:{m:"to go over his shoulder", p:"chôl-deur"},
           es:{m:"salir por encima del hombro"}, it:{m:"passare sopra la spalla"},
           de:{m:"über die Schulter abgehen", p:"choul-teur"}, ja:{m:"肩越しに前へ落ちる", p:"katagoshi ni mae e ochiru"} },
    def:{ fr:"La chute la plus fréquente, et souvent la moins grave : le cheval s'arrête ou refuse, le cavalier continue tout seul. ⚠️ C'est la PREMIÈRE QUESTION des secours — le mécanisme dit la gravité probable avant tout examen. En anglais, on dit aussi *she went out the front door*.",
          en:"The commonest fall and often the least serious: the horse stops or refuses and the rider carries on alone. It's the first question the paramedics ask — the mechanism suggests the severity before any examination.",
          es:"La caída más frecuente y a menudo la menos grave: el caballo se para y el jinete sigue solo. Es la primera pregunta de los socorros.",
          it:"La caduta più frequente e spesso la meno grave: il cavallo si ferma e il cavaliere continua da solo.",
          de:"Der häufigste Sturz und oft der leichteste: das Pferd hält an, der Reiter fliegt weiter.",
          ja:"最も多く、たいてい最も軽い落馬。馬が止まったり拒んだりして、騎手だけが前に飛びます。救急が最初に尋ねるのはこの「落ち方」で、診察の前に重症度の見当がつきます。" } },

  { ref:"cheval-tombe-dessus", lecon:1, coll:"mecanisme",
    mots:{ fr:{m:"le cheval est tombé sur elle"}, en:{m:"the horse came down on her", p:"kéïm daoune"},
           es:{m:"el caballo cayó sobre ella"}, it:{m:"il cavallo le è caduto addosso"},
           de:{m:"das Pferd ist auf sie gestürzt", p:"gue-chtourtst"}, ja:{m:"馬が上に倒れてきた", p:"uma ga ue ni taorete kita"} },
    def:{ fr:"🟥 LE MÉCANISME LE PLUS GRAVE, et celui qui change tout pour les secours : un demi-tonne sur un thorax ou un bassin, c'est une urgence vitale même si la personne parle. ⚠️ À dire IMMÉDIATEMENT au téléphone : les secours envoient d'autres moyens. En anglais on dit *the horse came down on top of her* ou *she was crushed*.",
          en:"The most serious mechanism, and the one that changes everything: half a tonne on a chest or a pelvis is life-threatening even if the person is talking. Say it immediately on the phone — they send different resources.",
          es:"El mecanismo más grave: media tonelada sobre el tórax o la pelvis es una urgencia vital aunque la persona hable. Decirlo de inmediato por teléfono.",
          it:"Il meccanismo più grave: mezza tonnellata sul torace o sul bacino è un'urgenza vitale anche se la persona parla.",
          de:"Der schwerste Mechanismus: eine halbe Tonne auf Brustkorb oder Becken ist lebensbedrohlich, auch wenn die Person spricht.",
          ja:"最も重い落ち方で、救急の対応が変わります。半トンの体重が胸や骨盤にかかれば、本人が話していても生命の危機です。電話では即座に伝えます。派遣される救助資源が変わるからです。" } },

  /* ---------- autour ---------- */

  { ref:"responsable", lecon:1, coll:"autour",
    mots:{ fr:{m:"le responsable de l'écurie"}, en:{m:"the yard manager", p:"yarde ma-ni-djeur"},
           es:{m:"el responsable de la cuadra"}, it:{m:"il responsabile della scuderia"},
           de:{m:"der Stallleiter", p:"chtall-laï-teur"}, ja:{m:"厩舎の責任者", p:"kyūsha no sekininsha"} },
    def:{ fr:"🟥 LA PERSONNE À CHERCHER EN PREMIER, avant même d'appeler : elle connaît l'adresse exacte, le chemin d'accès pour une ambulance, l'emplacement de la trousse, et souvent les antécédents du cavalier. ⚠️ En anglais **the yard manager** — *yard* est l'écurie au sens du lieu de travail.",
          en:"The first person to find, before you even call: they know the exact address, the access route for an ambulance, where the kit is, and often the rider's history.",
          es:"La primera persona a buscar, antes incluso de llamar: conoce la dirección exacta y el acceso para una ambulancia.",
          it:"La prima persona da cercare, prima ancora di chiamare: conosce l'indirizzo esatto e l'accesso per un'ambulanza.",
          de:"Die erste Person, die man sucht, noch vor dem Anruf: sie kennt die genaue Adresse und die Zufahrt.",
          ja:"電話の前に、まず探すべき人。正確な住所、救急車の進入路、救急箱の場所、そして本人の既往歴まで知っていることが多いのです。" } },

  { ref:"tenir-cheval", lecon:1, coll:"autour",
    mots:{ fr:{m:"récupérer le cheval"}, en:{m:"to catch the horse", p:"katch"},
           es:{m:"coger el caballo"}, it:{m:"riprendere il cavallo"},
           de:{m:"das Pferd einfangen", p:"aïn-fann-gueune"}, ja:{m:"馬を捕まえる", p:"uma o tsukamaeru"} },
    def:{ fr:"🟥 LE GESTE QU'ON OUBLIE : tout le monde se penche sur le cavalier, et le cheval part en liberté, rênes pendantes, souvent affolé. ⚠️ L'anglais dit **to catch**, jamais « to take ». Et ce n'est pas de la sollicitude pour le cheval : c'est écarter le danger de l'accident, et éviter une seconde urgence sur la route.",
          en:"The thing everyone forgets: all eyes are on the rider while the horse leaves, reins dangling, often frightened. English says « to catch », never « to take ». It isn't kindness to the horse: it's removing the danger.",
          es:"El gesto que se olvida: todos se inclinan sobre el jinete y el caballo se va libre. No es amabilidad con el caballo: es apartar el peligro.",
          it:"Il gesto che si dimentica: tutti si chinano sul cavaliere e il cavallo se ne va libero. Non è gentilezza: è togliere il pericolo.",
          de:"Was alle vergessen: alle beugen sich über den Reiter, und das Pferd geht los. Es ist keine Fürsorge fürs Pferd, sondern Gefahrenabwehr.",
          ja:"誰もが忘れる動作。全員が騎手にかがみ込む間に、馬は手綱を引きずって離れていきます。馬を気遣うためではなく、事故現場の危険を除くためです。" } },

  /* ==================================================================
     LA SÉQUENCE APRÈS UNE CHUTE — 38e notion, ajoutée le 18/08/2026 sur
     demande de Blandine (« créer un encart pédagogique dans le chapitre »).

     🟥 POURQUOI C'EST UN CONCEPT ET PAS UN ENCART. Le moteur ne lit que
     `ref`, `mots`, `def`, `lecon`, `coll` et `v` — il n'existe AUCUN champ
     d'encart, et `lingo.html` n'en rendrait aucun. Vérifié dans le code le
     18/08. Un vrai encart affiché demanderait de toucher l'écran de leçon :
     c'est un chantier à part, noté au SUIVI.
     La séquence vit donc dans une entrée de lexique, ce qui a un avantage :
     elle passe au quiz comme le reste, donc elle se révise.
     ⚠️ SES `mots` NE SONT PAS UN TERME À APPRENDRE mais un intitulé. Si le
     champ d'encart existe un jour, cette entrée s'y déplace.

     🟥 LES SIX FORMULATIONS SONT PRUDENTES, ET C'EST VOLONTAIRE. Aucune
     n'ordonne un geste technique : « si formé », « suivre les consignes des
     secours », « ne pas tester ». Les joueuses ont dix à quinze ans.
     Références pédagogiques : NHS — first aid after an incident, priorité
     airway/breathing · St John Ambulance — spinal injury, head injury,
     fractures · British Eventing — concussion et retour à cheval.
     ⚠️ NE PAS transformer cette entrée en protocole autonome, et ne jamais
     y écrire d'URL : les sources restent dans ce commentaire.
  ================================================================== */
  { ref:"apres-une-chute", lecon:1, coll:"geste",
    mots:{ fr:{m:"après une chute"}, en:{m:"after a fall", p:"af-teur e fol"},
           es:{m:"después de una caída"}, it:{m:"dopo una caduta"},
           de:{m:"nach einem Sturz", p:"nakh aï-nem chtourts"},
           ja:{m:"落馬のあと", p:"rakuba no ato"} },
    def:{ fr:"🟥 LA SÉQUENCE À CONNAÎTRE PAR CŒUR : **protéger · vérifier la réponse · vérifier la respiration · ne pas déplacer · appeler · continuer à surveiller.**\n\n1. Sécuriser la zone : cheval libre, autres chevaux, circulation, obstacles.\n2. Vérifier si la personne répond.\n3. Vérifier si elle respire normalement.\n4. En cas de suspicion de lésion du dos ou de la nuque, ne pas la déplacer inutilement et ne pas lui demander de tester ses mouvements.\n5. Ne pas retirer inutilement la bombe si elle respire normalement et qu'un traumatisme cervical ou crânien est possible.\n6. Si elle ne respire pas normalement, les voies aériennes et la respiration deviennent prioritaires : suivre les consignes des secours, et pratiquer les gestes de réanimation seulement si l'on est formé.\n7. Appeler le 999 ou le 112 au Royaume-Uni.\n8. Continuer à surveiller respiration et état de conscience jusqu'à l'arrivée des secours.\n9. Après un choc à la tête avec suspicion de commotion : pas de retour à cheval le jour même.\n10. Fracture suspectée : ne pas « tester » le membre et ne pas forcer le mouvement.",
          en:"The sequence to know by heart: protect · check response · check breathing · don't move · call for help · keep monitoring.\n\n1. Make the area safe: loose horse, other horses, traffic, obstacles.\n2. Check whether the person responds.\n3. Check whether they are breathing normally.\n4. If a back or neck injury is suspected, don't move them unnecessarily and don't ask them to test their movements.\n5. Don't remove the riding hat unnecessarily if they are breathing normally and a head or neck injury is possible.\n6. If they are not breathing normally, airway and breathing take priority: follow the instructions of the emergency services, and only perform resuscitation if you are trained.\n7. Call 999 or 112 in the UK.\n8. Keep checking breathing and level of response until help arrives.\n9. After a blow to the head with suspected concussion: no getting back on that day.\n10. Suspected broken bone: don't test the limb and don't force the movement.",
          es:"🟥 LA SECUENCIA QUE HAY QUE SABER DE MEMORIA: **proteger · comprobar la respuesta · comprobar la respiración · no mover · llamar · seguir vigilando.**\n\n1. Asegurar la zona: caballo suelto, otros caballos, tráfico, obstáculos.\n2. Comprobar si la persona responde.\n3. Comprobar si respira con normalidad.\n4. Si se sospecha lesión de espalda o cuello, no moverla innecesariamente y no pedirle que pruebe sus movimientos.\n5. No quitar el casco innecesariamente si respira con normalidad y es posible una lesión craneal o cervical.\n6. Si no respira con normalidad, la vía aérea y la respiración son prioritarias: seguir las indicaciones de los servicios de emergencia, y practicar la reanimación solo si se está formado.\n7. Llamar al 999 o al 112 en el Reino Unido.\n8. Seguir vigilando respiración y nivel de conciencia hasta que llegue la ayuda.\n9. Tras un golpe en la cabeza con sospecha de conmoción: no se vuelve a montar ese día.\n10. Sospecha de fractura: no « probar » el miembro ni forzar el movimiento.",
          it:"🟥 LA SEQUENZA DA SAPERE A MEMORIA: **proteggere · verificare la risposta · verificare il respiro · non spostare · chiamare · continuare a sorvegliare.**\n\n1. Mettere in sicurezza la zona: cavallo libero, altri cavalli, traffico, ostacoli.\n2. Verificare se la persona risponde.\n3. Verificare se respira normalmente.\n4. Se si sospetta una lesione alla schiena o al collo, non spostarla inutilmente e non chiederle di provare i movimenti.\n5. Non togliere inutilmente il cap se respira normalmente ed è possibile un trauma cranico o cervicale.\n6. Se non respira normalmente, vie aeree e respirazione hanno la priorità: seguire le indicazioni dei soccorsi, e praticare la rianimazione solo se formati.\n7. Chiamare il 999 o il 112 nel Regno Unito.\n8. Continuare a controllare respiro e stato di coscienza fino all'arrivo dei soccorsi.\n9. Dopo un colpo alla testa con sospetta commozione: non si rimonta quel giorno.\n10. Sospetta frattura: non « provare » l'arto e non forzare il movimento.",
          de:"🟥 DIE REIHENFOLGE, DIE MAN AUSWENDIG KENNEN MUSS: **schützen · Reaktion prüfen · Atmung prüfen · nicht bewegen · Hilfe rufen · weiter überwachen.**\n\n1. Die Stelle sichern: freies Pferd, andere Pferde, Verkehr, Hindernisse.\n2. Prüfen, ob die Person reagiert.\n3. Prüfen, ob sie normal atmet.\n4. Bei Verdacht auf Rücken- oder Halsverletzung nicht unnötig bewegen und nicht ihre Bewegungen testen lassen.\n5. Den Helm nicht unnötig abnehmen, wenn sie normal atmet und eine Kopf- oder Halsverletzung möglich ist.\n6. Atmet sie nicht normal, haben Atemwege und Atmung Vorrang: den Anweisungen des Rettungsdienstes folgen, und Wiederbelebung nur durchführen, wenn man geschult ist.\n7. In Großbritannien 999 oder 112 rufen.\n8. Atmung und Bewusstsein weiter überwachen, bis Hilfe kommt.\n9. Nach einem Schlag auf den Kopf mit Verdacht auf Gehirnerschütterung: an diesem Tag nicht wieder aufsteigen.\n10. Verdacht auf Bruch: das Glied nicht « testen » und die Bewegung nicht erzwingen.",
          ja:"🟥 暗記しておく手順 — **安全を確保する・反応を確かめる・呼吸を確かめる・動かさない・救急を呼ぶ・観察を続ける。**\n\n1. 現場の安全を確保する。放れ馬、ほかの馬、交通、障害物。\n2. 本人に反応があるか確かめる。\n3. 呼吸が正常かどうか確かめる。\n4. 背中や首の受傷が疑われる場合、不必要に動かさず、動きを試させない。\n5. 呼吸が正常で、頭部や首の受傷の可能性があるなら、ヘルメットを不必要に外さない。\n6. 呼吸が正常でない場合は気道と呼吸が優先。救急の指示に従い、心肺蘇生は訓練を受けている場合にのみ行う。\n7. イギリスでは 999 または 112 に電話する。\n8. 救急が到着するまで、呼吸と意識の状態を観察し続ける。\n9. 頭を打って脳震盪が疑われるときは、その日は馬に乗らない。\n10. 骨折が疑われるときは、手足を「試さず」、動きを無理に確かめない。" } }

  ],

  /* ==================================================================
     LES PHRASES D'EXERCICE — quatre.
  ================================================================== */
  phrases: [

    { ref:"ph-med-tombee", lecon:1, mots:["chute","tomber"],
      fr:"Elle est tombée de cheval.",
      en:"She's come off her horse.",
      es:"Se ha caído del caballo.",
      it:"È caduta da cavallo.",
      de:"Sie ist vom Pferd gefallen.",
      ja:"彼女 が 落馬 し まし た。" },

    { ref:"ph-med-ambulance", lecon:1, mots:["ambulance","appeler"],
      fr:"Appelez une ambulance.",
      en:"Call an ambulance.",
      es:"Llamen a una ambulancia.",
      it:"Chiamate un'ambulanza.",
      de:"Rufen Sie einen Krankenwagen.",
      ja:"救急車 を 呼ん で ください。" },

    { ref:"ph-med-pas-bouger", lecon:1, mots:["bouger-pas"],
      fr:"Ne la bougez pas.",
      en:"Don't move her.",
      es:"No la muevan.",
      it:"Non muovetela.",
      de:"Bewegen Sie sie nicht.",
      ja:"動かさ ない で ください。" },

    { ref:"ph-med-tete", lecon:1, mots:["commotion","ne-pas-remonter"],
      fr:"Sa tête a tapé : elle ne remonte pas aujourd'hui.",
      en:"She hit her head — she's not getting back on today.",
      es:"Se ha golpeado la cabeza: hoy no vuelve a montar.",
      it:"Ha battuto la testa: oggi non rimonta.",
      de:"Sie hat sich den Kopf gestoßen: heute steigt sie nicht wieder auf.",
      ja:"頭 を 打ち まし た。 今日 は もう 乗り ませ ん。" }

  ],

  /* ==================================================================
     LE DIALOGUE D'ÉDIMBOURG — 16 août 2026, session 214.

     LA SCÈNE : une cavalière vient de tomber. On l'examine sur place,
     on appelle, on gère autour. 28 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT-ET-UNE SONT DE BLANDINE.
     🟥 ET L'ORDRE EST LE CONTENU. Ses questions suivent la séquence
     réelle d'un examen sur place, ce qu'aucun lexique n'enseigne :
       1. la RESPIRATION d'abord, avant toute autre question ;
       2. où ça fait mal, et si la douleur est localisée ;
       3. si la personne peut BOUGER — sans le lui faire faire ;
       4. si la TÊTE A TAPÉ ;
       5. le SOUVENIR de la chute (le test de la commotion) ;
       6. l'ORIENTATION : quel jour, ton prénom ;
       7. les ANTÉCÉDENTS médicaux ;
       8. le CONSENTEMENT : veux-tu qu'on appelle ;
       9. la PERSONNE À PRÉVENIR.
     ⚠️ NE PAS RÉORDONNER LES TEMPS 2 À 4.

     ⚠️ « Surtout ne retire pas ta bombe pour l'instant. Respire, et
     essaie de ne pas bouger. » — LA phrase du chapitre. Le réflexe de
     celui qui tombe est exactement l'inverse : retirer ce qui serre,
     se relever, montrer que ça va.

     ⚠️ « Laissez-lui de la place pour qu'elle puisse respirer » — elle
     donne LA RAISON, et c'est ce qui fait vraiment reculer les gens.
     ⚠️ « Est-ce que quelqu'un peut récupérer le cheval et s'en
     occuper ? » — le geste qu'on oublie, et le lien avec Kildare.
     ⚠️ L'appel aux secours est en DEUX phrases sur sa demande (« tu peux
     séparer en deux phrases ») : on expose, on laisse une seconde, puis
     on demande. NE PAS refusionner.
     ⚠️ Les numéros d'urgence du monde entier sont dans la DÉFINITION de
     `numero-urgence`, pas dans la phrase — sa décision : une phrase
     dicible, une définition qui se lit.

     `dit` : "joueuse" = elle produit · "club" = la personne au sol, ou
     un témoin.
  ================================================================== */
  dialogue: {
    ville: "edimbourg", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · les premières secondes ---- */
      /* 🟥 LA phrase du chapitre. Contre tous les réflexes. */
      { ref:"dm-pas-la-bombe", temps:1, dit:"joueuse", mots:["ne-pas-retirer-bombe","respirer","bouger-pas"],
        fr:"Surtout ne retire pas ta bombe pour l'instant. Respire, et essaie de ne pas bouger.",
        en:"Whatever you do, don't take your hat off yet. Breathe, and try not to move.",
        es:"Sobre todo no te quites el casco por ahora. Respira, e intenta no moverte.",
        it:"Soprattutto non toglierti il cap per ora. Respira, e cerca di non muoverti.",
        de:"Nimm vor allem die Kappe noch nicht ab. Atme, und versuch dich nicht zu bewegen.",
        ja:"今 は ヘルメット を 外さ ない で。 息 を し て、 動か ない よう に し て ください。" },

      { ref:"dm-mal-a-respirer", temps:1, dit:"joueuse", mots:["respirer"],
        fr:"Est-ce que tu as du mal à respirer ?",
        en:"Are you having trouble breathing?",
        es:"¿Te cuesta respirar?",
        it:"Fai fatica a respirare?",
        de:"Hast du Mühe zu atmen?",
        ja:"息 が し にくい です か ?" },

      { ref:"dm-r-mal-quand-respire", temps:1, dit:"club", mots:["douleur","respirer"],
        fr:"J'ai mal quand je respire.",
        en:"It hurts when I breathe.",
        es:"Me duele al respirar.",
        it:"Mi fa male quando respiro.",
        de:"Es tut weh, wenn ich atme.",
        ja:"息 を する と 痛い です。" },

      /* ---- temps 2 · où ça fait mal ---- */
      { ref:"dm-ou-tu-as-mal", temps:2, dit:"joueuse", mots:["douleur"],
        fr:"Peux-tu nous dire où tu as mal ?",
        en:"Can you tell us where it hurts?",
        es:"¿Puedes decirnos dónde te duele?",
        it:"Puoi dirci dove ti fa male?",
        de:"Kannst du uns sagen, wo es weh tut?",
        ja:"どこ が 痛い か 教え られ ます か ?" },

      { ref:"dm-douleurs-particulier", temps:2, dit:"joueuse", mots:["douleur"],
        fr:"As-tu des douleurs en particulier dans le corps ?",
        en:"Have you got any pain anywhere in particular?",
        es:"¿Tienes dolores en algún sitio en particular?",
        it:"Hai dolori in qualche punto in particolare?",
        de:"Hast du irgendwo besonders Schmerzen?",
        ja:"体 の どこ か に とくに 痛み は あり ます か ?" },

      { ref:"dm-r-nuque-et-dos", temps:2, dit:"club", mots:["nuque","dos"],
        fr:"J'ai mal à la nuque et au dos.",
        en:"My neck and my back hurt.",
        es:"Me duele la nuca y la espalda.",
        it:"Mi fanno male la nuca e la schiena.",
        de:"Mein Nacken und mein Rücken tun weh.",
        ja:"首 の 後ろ と 背中 が 痛い です。" },

      /* 🟥🟥 PHRASE SUPPRIMÉE LE 18/08/2026 SUR DEMANDE DE BLANDINE, et c'est
         la correction la plus importante de ce lot.
         L'ANCIENNE DISAIT : « Est-ce que tu peux bouger toutes les parties de
         ton corps ? » — `ref` `dm-bouger-tout`. On NE DEMANDE PAS à une victime
         avec suspicion de lésion cervicale ou rachidienne de tester ses
         mouvements : c'est exactement le geste à éviter.
         REMPLACÉE PAR DEUX QUESTIONS DE SENSATION, qui donnent la même
         information sans faire bouger personne, plus la consigne d'attente.
         Référence pédagogique : St John Ambulance — spinal injury.
         ⚠️ NE JAMAIS réintroduire `dm-bouger-tout`. */
      { ref:"dm-sens-bras-jambes", temps:2, dit:"joueuse", mots:["bouger-pas","douleur"],
        fr:"Est-ce que tu sens normalement tes bras et tes jambes ?",
        en:"Can you feel your arms and legs normally?",
        es:"¿Sientes con normalidad los brazos y las piernas?",
        it:"Senti normalmente le braccia e le gambe?",
        de:"Spürst du Arme und Beine normal?",
        ja:"腕 と 脚 は 普通 に 感じ ます か ?" },

      { ref:"dm-fourmillements", temps:2, dit:"joueuse", mots:["bouger-pas","nuque","dos"],
        fr:"Est-ce que tu as des fourmillements ou des engourdissements ?",
        en:"Have you got any tingling or numbness?",
        es:"¿Tienes hormigueo o entumecimiento?",
        it:"Hai formicolii o intorpidimento?",
        de:"Hast du ein Kribbeln oder Taubheitsgefühl?",
        ja:"ぴりぴり する 感じ や、 しびれ は あり ます か ?" },

      { ref:"dm-r-ne-bouge-pas", temps:2, dit:"club", mots:["bouger-pas","secours"],
        fr:"Ne bouge pas. On attend les secours.",
        en:"Don't move. We'll wait for the paramedics.",
        es:"No te muevas. Esperamos a los servicios de emergencia.",
        it:"Non ti muovere. Aspettiamo i soccorsi.",
        de:"Beweg dich nicht. Wir warten auf den Rettungsdienst.",
        ja:"動か ない で。 救急 を 待ち ます。" },

      /* ---- temps 3 · la tête ---- */
      { ref:"dm-tete-a-tape", temps:3, dit:"joueuse", mots:["commotion"],
        fr:"Est-ce que ta tête a tapé ?",
        en:"Did you hit your head?",
        es:"¿Te has golpeado la cabeza?",
        it:"Hai battuto la testa?",
        de:"Hast du dir den Kopf gestoßen?",
        ja:"頭 を 打ち まし た か ?" },

      { ref:"dm-tu-te-rappelles", temps:3, dit:"joueuse", mots:["perte-memoire"],
        fr:"Tu te rappelles de ce qui s'est passé ?",
        en:"Do you remember what happened?",
        es:"¿Te acuerdas de lo que ha pasado?",
        it:"Ti ricordi che cosa è successo?",
        de:"Erinnerst du dich, was passiert ist?",
        ja:"何 が あっ た か 覚え て い ます か ?" },

      { ref:"dm-quel-jour-prenom", temps:3, dit:"joueuse", mots:["commotion"],
        fr:"Tu peux me dire quel jour on est, et ton prénom ?",
        en:"Can you tell me what day it is, and your name?",
        es:"¿Puedes decirme qué día es hoy y tu nombre?",
        it:"Puoi dirmi che giorno è oggi, e il tuo nome?",
        de:"Kannst du mir sagen, welcher Tag heute ist, und deinen Namen?",
        ja:"今日 が 何日 か、 名前 を 言え ます か ?" },

      { ref:"dm-r-perdu-connaissance", temps:3, dit:"club", mots:["perdre-connaissance"],
        fr:"Elle a perdu connaissance quelques secondes.",
        en:"She was knocked out for a few seconds.",
        es:"Ha perdido el conocimiento unos segundos.",
        it:"Ha perso conoscenza per qualche secondo.",
        de:"Sie war ein paar Sekunden ohne Bewusstsein.",
        ja:"数 秒 間、 意識 が あり ませ ん でし た。" },

      /* 🟥 Deux phrases de Blandine, 18/08. La perte de mémoire de la chute est
         le signe de commotion le plus fiable, et le plus facile à vérifier sans
         toucher à personne. */
      { ref:"dm-r-ne-rappelle-pas", temps:3, dit:"club", mots:["perte-memoire","chute"],
        fr:"Elle ne se rappelle pas de sa chute.",
        en:"She doesn't remember the fall.",
        es:"No se acuerda de la caída.",
        it:"Non si ricorda della caduta.",
        de:"Sie erinnert sich nicht an den Sturz.",
        ja:"彼女 は 落馬 を 覚え て い ませ ん。" },

      { ref:"dm-pas-remonter-aujourdhui", temps:3, dit:"joueuse", mots:["ne-pas-remonter","commotion"],
        fr:"Sa tête a tapé : elle ne remonte pas aujourd'hui.",
        en:"She hit her head — she's not getting back on today.",
        es:"Se ha golpeado la cabeza: hoy no vuelve a montar.",
        it:"Ha battuto la testa: oggi non rimonta.",
        de:"Sie hat sich den Kopf gestoßen — heute steigt sie nicht wieder auf.",
        ja:"頭 を 打ち まし た。 今日 は もう 乗り ませ ん。" },

      /* ---- temps 4 · les antécédents et le consentement ---- */
      { ref:"dm-problemes-medicaux", temps:4, dit:"joueuse", mots:[],
        fr:"Est-ce que tu as des problèmes médicaux en particulier à signaler ?",
        en:"Have you got any medical conditions we should know about?",
        es:"¿Tienes algún problema médico que debamos saber?",
        it:"Hai problemi medici particolari da segnalare?",
        de:"Hast du Vorerkrankungen, die wir wissen sollten?",
        ja:"伝え て おく べき 病気 や 治療 は あり ます か ?" },

      /* 🟥 PHRASE SUPPRIMÉE LE 18/08 SUR DEMANDE DE BLANDINE : « Est-ce que tu
         souhaites qu'on appelle les urgences ? » — `ref` `dm-souhaites-urgences`.
         Quand les signes d'urgence sont déjà là, on n'attend pas l'accord de la
         victime pour appeler. Posée à quelqu'un de confus après un choc à la
         tête, la question retarde l'appel.
         REMPLACÉE par la question des médicaments, utile aux secours.
         ⚠️ NE PAS la réintroduire. */
      { ref:"dm-medicaments", temps:4, dit:"joueuse", mots:["medecin"],
        fr:"Est-ce que tu prends des médicaments ?",
        en:"Are you on any medication?",
        es:"¿Tomas algún medicamento?",
        it:"Prendi dei farmaci?",
        de:"Nimmst du Medikamente?",
        ja:"何 か 薬 を 飲ん で い ます か ?" },

      { ref:"dm-personne-a-prevenir", temps:4, dit:"joueuse", mots:["telephone"],
        fr:"Où peut-on trouver les coordonnées d'une personne à prévenir ?",
        en:"Where can we find someone's details to call?",
        es:"¿Dónde podemos encontrar los datos de alguien a quien avisar?",
        it:"Dove possiamo trovare i contatti di qualcuno da avvertire?",
        de:"Wo finden wir die Kontaktdaten einer Person, die wir verständigen sollen?",
        ja:"連絡 する べき 人 の 連絡先 は どこ に あり ます か ?" },

      /* ---- temps 5 · j'appelle ---- */
      { ref:"dm-appelle-secours", temps:5, dit:"joueuse", mots:["secours","appeler"],
        fr:"Appelle les secours d'urgence.",
        en:"Call the emergency services.",
        es:"Llama a los servicios de emergencia.",
        it:"Chiama i soccorsi.",
        de:"Ruf den Rettungsdienst.",
        ja:"救急 に 電話 し て ください。" },

      /* 🟥 18/08 : REMPLACE « est-ce que quelqu'un peut composer le numéro
         d'urgence médicale ? », trop vague dans une urgence. À Édimbourg, 999 et
         112 fonctionnent tous les deux. Les autres numéros du monde restent dans
         la DÉFINITION de `numero-urgence`, pas dans les phrases — demande de
         Blandine. */
      { ref:"dm-999-112", temps:5, dit:"joueuse", mots:["numero-urgence","appeler"],
        fr:"Compose le 999 ou le 112.",
        en:"Dial 999 or 112.",
        es:"Marca el 999 o el 112.",
        it:"Chiama il 999 o il 112.",
        de:"Wähle 999 oder 112.",
        ja:"999 か 112 に かけ て。" },

      /* 🟥 L'appel, en deux phrases sur sa demande. */
      /* 🟥 18/08 — L'APPEL EST DÉCOUPÉ, sur demande de Blandine : « l'appel doit
         rester découpé en plusieurs phrases courtes, ne pas refusionner tout en
         une phrase longue ».
         L'ancienne `dm-appel-1` enchaînait la chute, la respiration, le choc à la
         tête et la perte de mémoire dans une seule réplique — impossible à dire
         au téléphone, et impossible à réutiliser.
         ⚠️ NE PAS LES REFUSIONNER. */
      { ref:"dm-appel-tombee", temps:5, dit:"joueuse", mots:["tomber","respirer"],
        fr:"Une cavalière est tombée de cheval. Elle a du mal à respirer.",
        en:"A rider has come off her horse. She's having trouble breathing.",
        es:"Una jinete se ha caído del caballo. Le cuesta respirar.",
        it:"Una cavallerizza è caduta da cavallo. Fa fatica a respirare.",
        de:"Eine Reiterin ist vom Pferd gestürzt. Sie hat Mühe zu atmen.",
        ja:"騎手 が 落馬 し まし た。 呼吸 が 苦し そう です。" },

      { ref:"dm-appel-tete-memoire", temps:5, dit:"joueuse", mots:["commotion","perte-memoire"],
        fr:"Elle a tapé la tête et elle ne se rappelle pas de sa chute.",
        en:"She hit her head and she doesn't remember the fall.",
        es:"Se ha golpeado la cabeza y no se acuerda de la caída.",
        it:"Ha battuto la testa e non si ricorda della caduta.",
        de:"Sie hat sich den Kopf gestoßen und erinnert sich nicht an den Sturz.",
        ja:"頭 を 打ち、 落馬 を 覚え て い ませ ん。" },

      { ref:"dm-appel-adresse", temps:5, dit:"joueuse", mots:["adresse"],
        fr:"Nous sommes aux écuries. Je vous donne l'adresse exacte.",
        en:"We're at the stables. I'll give you the exact address.",
        es:"Estamos en las cuadras. Le doy la dirección exacta.",
        it:"Siamo alle scuderie. Le do l'indirizzo esatto.",
        de:"Wir sind am Stall. Ich gebe Ihnen die genaue Adresse.",
        ja:"厩舎 に い ます。 正確な 住所 を お伝え し ます。" },

      { ref:"dm-appel-2", temps:5, dit:"joueuse", mots:["ambulance","adresse"],
        fr:"Il faut envoyer une ambulance rapidement aux écuries.",
        en:"We need an ambulance at the stables quickly.",
        es:"Hay que enviar una ambulancia rápido a las cuadras.",
        it:"Bisogna mandare un'ambulanza in fretta alle scuderie.",
        de:"Wir brauchen schnell einen Krankenwagen zum Stall.",
        ja:"厩舎 に 救急車 を 早く 送っ て ください。" },

      /* ---- temps 6 · autour de la blessée ---- */
      /* 🟥 Phrase de Blandine : LA RAISON fait reculer les gens. */
      { ref:"dm-de-la-place", temps:6, dit:"joueuse", mots:["reculer","respirer"],
        fr:"Laissez-lui de la place pour qu'elle puisse respirer.",
        en:"Give her some space so she can breathe.",
        es:"Dejadle sitio para que pueda respirar.",
        it:"Lasciatele spazio perché possa respirare.",
        de:"Lasst ihr Platz, damit sie atmen kann.",
        ja:"呼吸 でき る よう に、 場所 を 空け て ください。" },

      /* 🟥 Phrase de Blandine : le geste qu'on oublie. */
      { ref:"dm-recuperer-cheval", temps:6, dit:"joueuse", mots:["tenir-cheval","danger"],
        fr:"Est-ce que quelqu'un peut récupérer le cheval et s'en occuper ?",
        en:"Can someone catch the horse and look after him?",
        es:"¿Puede alguien coger el caballo y ocuparse de él?",
        it:"Qualcuno può riprendere il cavallo e occuparsene?",
        de:"Kann jemand das Pferd einfangen und sich um es kümmern?",
        ja:"誰か 馬 を 捕まえ て、 見 て い て もらえ ます か ?" },

      /* 🟥 18/08 : LA SURVEILLANCE CONTINUE, phrase de Blandine. C'est le geste
         qu'on oublie une fois l'appel passé — et le seul qui permette de dire aux
         secours que l'état s'aggrave. */
      { ref:"dm-surveiller", temps:6, dit:"joueuse", mots:["respirer","perdre-connaissance"],
        fr:"Continue à surveiller sa respiration et son état de conscience.",
        en:"Keep checking her breathing and level of response.",
        es:"Sigue vigilando su respiración y su nivel de conciencia.",
        it:"Continua a controllare il respiro e lo stato di coscienza.",
        de:"Überwache weiter ihre Atmung und ihr Bewusstsein.",
        ja:"呼吸 と 意識 の 状態 を 見 続け て。" },

      /* 🟥 18/08 : RÉÉCRITE sur demande de Blandine. L'ancienne disait « il se
         peut qu'il y ait besoin de quelques points de suture » — un PRONOSTIC,
         alors que le geste utile sur place est la PRESSION DIRECTE.
         `points-de-suture` reste au lexique et garde son intérêt de langue
         (stitches courant / sutures médical).
         Référence pédagogique : St John Ambulance — bleeding, direct pressure.
         ⚠️ NE PAS y remettre de pronostic médical. */
      { ref:"dm-plaie-pression", temps:6, dit:"joueuse", mots:["plaie","sang"],
        fr:"La plaie est ouverte et elle saigne. Maintenez une pression directe dessus.",
        en:"The cut is open and bleeding. Keep direct pressure on it.",
        es:"La herida está abierta y sangra. Mantén una presión directa encima.",
        it:"La ferita è aperta e sanguina. Mantieni una pressione diretta sopra.",
        de:"Die Wunde ist offen und blutet. Halte direkten Druck darauf.",
        ja:"傷 が 開い て 出血 し て い ます。 直接 圧迫 を 続け て ください。" }
    ]
  }
};
