/* hype-lingo-lex-endurance.js — Hype Linguae · l'endurance
   ==================================================================
   Écrit le 6 août 2026 pour Dubaï (Émirats arabes unis), étape 24.
   Prévu par hype-linguae-production-suite.txt : « Dubaï — l'endurance :
   le kilomètre, le contrôle vétérinaire, le rythme cardiaque, le relais,
   l'abandon ».

   POURQUOI CE CHAPITRE. L'endurance est la seule discipline olympique du
   cheval où l'on parle en kilomètres et en battements par minute, et rien
   de tout cela n'existait dans le module. C'est aussi la seule où
   l'abandon n'est pas un échec mais une décision de soin.

   ⚠️ UN MOT DU PLAN A ÉTÉ CHANGÉ, et il faut le dire. Le plan écrivait
   « le relais » : ça n'existe pas en endurance, il n'y a pas de passage de
   relais entre cavaliers. Ce que le plan décrivait est L'ASSISTANCE —
   l'équipe qui attend au contrôle avec l'eau et les seaux. Le concept est
   gardé, le mot est corrigé. VALIDÉ PAR BLANDINE le 17 août 2026, qui a
   fourni les deux mots séparés : `l'équipe d'assistance` (the crew) et
   `le point d'assistance` (the crew point).

   ✔ 17 AOÛT 2026 — LOT BLANDINE. Elle a fourni sa propre liste de mots et
   dix-huit phrases, et tranché le doute qui bloquait ce fichier depuis le
   6 août : `le contrôle vétérinaire` = « the veterinary inspection »
   (l'examen), `le Vet Gate` = le lieu, deux entrées distinctes. Ajoutés :
   le point d'assistance, le Vet Gate, le temps de repos obligatoire,
   apte à continuer, FTQ, économiser son cheval, le sable profond,
   présenter au vétérinaire. Décisions de Blandine, ses mots :
   « Une seule leçon » · « allure dehors » · `la ligne d'arrivée` laissée
   EN ATTENTE (elle existe peut-être déjà dans un autre chapitre, un `ref`
   inventé ferait un doublon au lieu d'un rappel) · « oui et oui ».
   Le mot `l'allure` / pace a été ÉCARTÉ : en français équestre « allure »
   désigne le pas, le trot et le galop, et les cours l'emploient dans ce
   sens — deux définitions du même mot dans l'app. `la vitesse moyenne`
   couvre déjà l'idée.

   ⚠️ AUCUN RAPPEL DANS CE FICHIER. « la boiterie » et « le vétérinaire »
   auraient dû en être, mais `hype-lingo-lex-urgences.js` n'a pas été
   fourni dans cette conversation : impossible de vérifier leurs `ref`, et
   un `ref` inventé créerait un doublon au lieu d'un rappel. À ajouter plus
   tard, une fois le fichier sous les yeux.

   ✔ MÉCANISME DU CHRONO VÉRIFIÉ dans le règlement FEI Endurance avant
   d'écrire la définition de `la récupération` (art. 813 et 816). Le Vet
   Gate contient trois zones successives : recovery area (le cheval
   redescend), Vetting Area (l'examen), hold area (le repos obligatoire).
   Le temps de récupération court de la ligne de fin de boucle jusqu'à
   l'entrée dans la Vetting Area, et il est compté au cavalier — puis le
   Hold Time se déroule. Récupérer vite = repartir plus tôt. C'est
   exactement ce que Blandine décrivait. Le Hold Time minimum est de
   quarante minutes dans la plupart des épreuves.

   ⚠️ VINGT ENTRÉES JAMAIS RELUES PAR UN NATIF. Trois allemands sont des
   reconstructions, pas des mots entendus sur un terrain : `der
   Betreuungspunkt`, `die Pflichtpause`, et la tournure de la phrase 12
   avec « fit to continue ». Sur le terrain l'anglais s'impose souvent tel
   quel, même en Allemagne et en Espagne, pour `hold time`, `crew point`
   et `fit to continue` : ces trois-là sont donnés en langue locale ici,
   mais l'usage réel peut être l'anglais. Reste aussi à confirmer
   `l'abandon` (l'anglais distingue « to retire », choisi par le cavalier,
   de « to be eliminated », décidé par le jury).
   À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.endurance = {
  ref: "endurance",
  chapitre: 14,
  titre: { fr:"L'endurance", en:"Endurance", es:"El raid", it:"L'endurance",
           de:"Die Distanzreiterei", ja:"エンデュランス" },
  lecons: 1,

  /* ⚠️ CHAMP NEUF, PAS ENCORE AFFICHÉ. `intro` n'existait dans aucun autre
     lexique : le moteur ne le lit pas encore, donc cette phrase ne
     s'affichera nulle part tant que `lingo.html` ne va pas la chercher.
     Le fichier ne m'a pas été fourni, je n'ai donc rien touché de ce
     côté. Le texte anglais est celui de Blandine, mot pour mot. */
  intro: { fr:"Ce n'est pas une question de vitesse. C'est ramener son cheval en pleine forme.",
           en:"It's not just about speed. It's about bringing your horse home fit.",
           es:"No es una cuestión de velocidad. Es devolver el caballo en plena forma.",
           it:"Non è una questione di velocità. È riportare il cavallo in piena forma.",
           de:"Es geht nicht um Tempo. Es geht darum, das Pferd gesund heimzubringen.",
           ja:"速さを競うのではありません。馬を無事に連れて帰るための競技です。" },

  concepts: [

  /* ============ LEÇON 1 · L'ENDURANCE ============ */

  { ref:"endurance", lecon:1, coll:"endurance",
    mots:{ fr:{m:"l'endurance"}, en:{m:"endurance riding", p:"ènn-diou-reunss"},
           es:{m:"el raid"}, it:{m:"l'endurance"},
           de:{m:"die Distanzreiterei", p:"diss-tannts-raï-te-raï"},
           ja:{m:"エンデュランス", p:"endyuransu"} },
    def:{ fr:"Courir longtemps sans abîmer le cheval. ⚠️ L'espagnol ne traduit pas : il dit « el raid ». L'allemand parle de distance, pas d'endurance.",
          en:"Covering long distances without damaging the horse. Spanish does not translate it: « el raid ». German speaks of distance rather than endurance.",
          es:"Correr mucho tiempo sin dañar al caballo. ⚠️ El español no traduce: dice « el raid ». El alemán habla de distancia, no de resistencia.",
          it:"Correre a lungo senza rovinare il cavallo. ⚠️ Lo spagnolo non traduce: dice « el raid ». Il tedesco parla di distanza, non di resistenza.",
          de:"Lange laufen, ohne das Pferd zu verschleißen. ⚠️ Das Spanische übersetzt nicht: « el raid ». Das Deutsche spricht von Distanz, nicht von Ausdauer.",
          ja:"馬を痛めずに、長く走り続けること。⚠️ スペイン語は訳さず « el raid » と言い、ドイツ語は「持久」ではなく「距離」で呼びます。" } },

  { ref:"pur-sang-arabe", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le pur-sang arabe"}, en:{m:"the Arabian", p:"a-rè-bieune"},
           es:{m:"el pura sangre árabe"}, it:{m:"il puro sangue arabo"},
           de:{m:"der Araber", p:"a-ra-beur"}, ja:{m:"アラブ種", p:"arabushu"} },
    def:{ fr:"La race de l'endurance, presque sans partage : tête fine au profil concave, encolure arquée, queue portée haute. Sa capacité à récupérer vite est ce qui fait la différence, pas sa vitesse.",
          en:"The breed of endurance, almost exclusively: a fine head with a concave profile, arched neck, high-set tail. What makes the difference is how fast it recovers, not how fast it runs.",
          es:"La raza del raid, casi sin excepción: cabeza fina de perfil cóncavo, cuello arqueado, cola alta. Lo que marca la diferencia es su capacidad de recuperar rápido, no su velocidad.",
          it:"La razza dell'endurance, quasi senza eccezioni: testa fine dal profilo concavo, incollatura arcuata, coda portata alta. Ciò che fa la differenza è la capacità di recuperare in fretta, non la velocità.",
          de:"Die Rasse des Distanzsports, fast konkurrenzlos: feiner Kopf mit konkavem Profil, gebogener Hals, hoch getragener Schweif. Den Unterschied macht die schnelle Erholung — nicht das Tempo.",
          ja:"エンデュランスをほぼ独占する馬種。凹んだ横顔の繊細な頭、弓なりの首、高く掲げた尾。差をつけるのは速さではなく、回復の早さです。" } },

  { ref:"kilometre", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le kilomètre"}, en:{m:"the kilometre", p:"ki-lo-mi-teur"},
           es:{m:"el kilómetro"}, it:{m:"il chilometro"},
           de:{m:"der Kilometer", p:"ki-lo-mé-teur"}, ja:{m:"キロ", p:"kiro"} },
    def:{ fr:"L'unité de la discipline. Une épreuve va de vingt à cent soixante kilomètres en un jour. ⚠️ Les Américains comptent en milles : « a hundred-mile ride » n'est pas cent kilomètres mais cent soixante.",
          en:"The unit of the sport. A ride runs from twenty to a hundred and sixty kilometres in a day. Americans count in miles: a hundred-mile ride is a hundred and sixty kilometres.",
          es:"La unidad de la disciplina. Una prueba va de veinte a ciento sesenta kilómetros en un día. ⚠️ Los americanos cuentan en millas: « a hundred-mile ride » no son cien kilómetros sino ciento sesenta.",
          it:"L'unità della disciplina. Una prova va da venti a centosessanta chilometri in un giorno. ⚠️ Gli americani contano in miglia: « a hundred-mile ride » non sono cento chilometri ma centosessanta.",
          de:"Die Einheit der Disziplin. Ein Ritt geht über zwanzig bis hundertsechzig Kilometer an einem Tag. ⚠️ Amerikaner zählen in Meilen: « a hundred-mile ride » sind nicht hundert, sondern hundertsechzig Kilometer.",
          ja:"この競技の単位。一日で走るのは二十から百六十キロ。⚠️ アメリカはマイルで数えます。« a hundred-mile ride » は百キロではなく、百六十キロです。" } },

  { ref:"boucle", lecon:1, coll:"endurance",
    mots:{ fr:{m:"la boucle"}, en:{m:"the loop", p:"loupe"},
           es:{m:"la vuelta"}, it:{m:"il giro"},
           de:{m:"die Schleife", p:"chlaï-fe"}, ja:{m:"ループ", p:"rūpu"} },
    def:{ fr:"Une portion du parcours, qui ramène toujours au même point. On ne part pas d'un endroit pour arriver ailleurs : on repasse au contrôle après chaque boucle.",
          en:"A section of the course that always returns to the same point. You do not go from one place to another: you come back through the vet gate after every loop.",
          es:"Una porción del recorrido, que siempre vuelve al mismo punto. No se va de un lugar a otro: se pasa por el control después de cada vuelta.",
          it:"Una porzione del percorso, che riporta sempre allo stesso punto. Non si va da un posto a un altro: si ripassa al controllo dopo ogni giro.",
          de:"Ein Abschnitt der Strecke, der immer zum selben Punkt zurückführt. Man reitet nicht von A nach B: Nach jeder Schleife geht es durch die Vetgate.",
          ja:"コースの一区間。必ず同じ地点へ戻ってきます。どこかからどこかへ行くのではなく、ループのたびに獣医検査を通り直すのです。" } },

  { ref:"sable-profond", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le sable profond"}, en:{m:"the deep sand", p:"dipp sannde"},
           es:{m:"la arena profunda"}, it:{m:"la sabbia profonda"},
           de:{m:"der Tiefsand", p:"tif-zannte"}, ja:{m:"深い砂", p:"fukai suna"} },
    def:{ fr:"Le terrain de Dubaï. Le pied s'enfonce, le cheval pousse deux fois plus pour avancer autant : on y ralentit sans discuter, sinon on paye les tendons au contrôle suivant.",
          en:"The going in Dubai. The foot sinks in and the horse pushes twice as hard for the same distance: you slow down there without arguing, or you pay for the tendons at the next inspection.",
          es:"El terreno de Dubái. El pie se hunde, el caballo empuja el doble para avanzar lo mismo: allí se baja el ritmo sin discutir, o se pagan los tendones en el control siguiente.",
          it:"Il terreno di Dubai. Il piede affonda, il cavallo spinge il doppio per avanzare altrettanto: lì si rallenta senza discutere, altrimenti si pagano i tendini al controllo dopo.",
          de:"Der Boden von Dubai. Der Fuß sinkt ein, das Pferd drückt doppelt so stark für dieselbe Strecke: Dort wird ohne Diskussion langsamer geritten, sonst zahlt man an der nächsten Untersuchung mit den Sehnen.",
          ja:"ドバイの地面。脚が沈み、同じ距離を進むのに馬は二倍押します。ここでは議論せずペースを落とすもの。さもなければ、次の検査で腱の代償を払います。" } },

  { ref:"economiser-cheval", lecon:1, coll:"endurance",
    mots:{ fr:{m:"économiser son cheval"}, en:{m:"to save your horse", p:"séïve"},
           es:{m:"reservar al caballo"}, it:{m:"risparmiare il cavallo"},
           de:{m:"das Pferd schonen", p:"cho-neune"}, ja:{m:"馬を温存する", p:"uma o onzon suru" } },
    def:{ fr:"Le verbe central de la discipline. On n'économise pas ses forces à soi mais celles du cheval, et chaque kilomètre gagné trop tôt est un kilomètre perdu à la fin.",
          en:"The central verb of the sport. You are not saving your own strength but the horse's, and every kilometre won too early is a kilometre lost at the end.",
          es:"El verbo central de la disciplina. No se reservan las propias fuerzas sino las del caballo, y cada kilómetro ganado demasiado pronto es un kilómetro perdido al final.",
          it:"Il verbo centrale della disciplina. Non si risparmiano le proprie forze ma quelle del cavallo, e ogni chilometro guadagnato troppo presto è un chilometro perso alla fine.",
          de:"Das zentrale Verb der Disziplin. Geschont werden nicht die eigenen Kräfte, sondern die des Pferdes — und jeder zu früh gewonnene Kilometer ist am Ende ein verlorener.",
          ja:"この競技の中心にある動詞。惜しむのは自分の力ではなく馬の力です。早く稼いだ一キロは、終わりで失う一キロになります。" } },

  { ref:"controle-veterinaire", lecon:1, coll:"endurance",
    /* ⚠️ ANGLAIS CHANGÉ le 17 août 2026 sur la liste de Blandine. Portait
       « the vet gate », qui désigne le lieu et non l'examen : le doute
       signalé le 6 août est tranché. Le lieu part dans son entrée à lui,
       `vet-gate`, juste en dessous. */
    mots:{ fr:{m:"le contrôle vétérinaire"}, en:{m:"the veterinary inspection", p:"vè-tri-neu-ri"},
           es:{m:"el control veterinario"}, it:{m:"il controllo veterinario"},
           de:{m:"die Verfassungsprüfung", p:"fèr-fass-oungs-pru-foung"},
           ja:{m:"獣医検査", p:"jūi kensa"} },
    def:{ fr:"L'examen obligatoire après chaque boucle : cœur, allures, hydratation, dos. ⚠️ C'est l'examen lui-même — le lieu où il se passe s'appelle le Vet Gate, et ce n'est pas le même mot.",
          en:"The compulsory examination after each loop: heart, gaits, hydration, back. This is the examination itself — the place where it happens is called the Vet Gate, which is a different word.",
          es:"El examen obligatorio tras cada vuelta: corazón, aires, hidratación, dorso. ⚠️ Es el examen en sí — el lugar donde ocurre se llama Vet Gate, y no es la misma palabra.",
          it:"L'esame obbligatorio dopo ogni giro: cuore, andature, idratazione, dorso. ⚠️ È l'esame in sé — il luogo dove avviene si chiama Vet Gate, e non è la stessa parola.",
          de:"Die Pflichtuntersuchung nach jeder Schleife: Herz, Gänge, Hydrierung, Rücken. ⚠️ Das ist die Untersuchung selbst — der Ort dafür heißt Vetgate, und das ist ein anderes Wort.",
          ja:"ループごとに義務づけられた検査。心臓、歩様、水分、背中。⚠️ これは検査そのものを指します。行われる場所は「ベットゲート」と呼ばれ、別の語です。" } },

  { ref:"vet-gate", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le Vet Gate"}, en:{m:"the Vet Gate", p:"vètt guéïte"},
           es:{m:"el Vet Gate"}, it:{m:"il Vet Gate"},
           de:{m:"die Vetgate", p:"vètt-guéïte"},
           ja:{m:"ベットゲート", p:"bettogēto"} },
    def:{ fr:"Le lieu, et son nom ne se traduit dans aucune langue. Le règlement y distingue trois zones qu'on traverse dans l'ordre : la recovery area où le cheval redescend, la vetting area où il est examiné, la hold area où il attend son temps de repos.",
          en:"The place — and its name is not translated in any language. The rules set out three areas crossed in order: the recovery area where the horse comes down, the vetting area where it is examined, the hold area where it waits out its rest.",
          es:"El lugar, y su nombre no se traduce en ningún idioma. El reglamento distingue tres zonas que se cruzan en orden: la recovery area donde el caballo baja, la vetting area donde se le examina, la hold area donde espera su descanso.",
          it:"Il luogo, e il suo nome non si traduce in nessuna lingua. Il regolamento distingue tre zone che si attraversano in ordine: la recovery area dove il cavallo scende, la vetting area dove viene esaminato, la hold area dove aspetta la sosta.",
          de:"Der Ort — und sein Name wird in keiner Sprache übersetzt. Das Reglement unterscheidet drei Zonen in dieser Reihenfolge: recovery area, wo das Pferd herunterkommt, vetting area, wo es untersucht wird, hold area, wo es die Pause absitzt.",
          ja:"場所そのもの。この名前はどの言語でも訳されません。規則は通過順に三つの区域を分けています。馬が心拍を下げる recovery area、検査を受ける vetting area、休憩時間を過ごす hold area です。" } },

  { ref:"rythme-cardiaque", lecon:1, coll:"endurance",
    /* ⚠️ Le `ref` reste "rythme-cardiaque" alors que le mot affiché devient
       « la fréquence cardiaque » : changer un `ref` casserait la progression
       déjà enregistrée par les joueuses sur cette entrée. L'ancien mot est
       gardé en `var`, il n'est pas faux. */
    mots:{ fr:{m:"la fréquence cardiaque", var:"le rythme cardiaque"}, en:{m:"the heart rate", p:"harte réïte"},
           es:{m:"la frecuencia cardíaca"}, it:{m:"la frequenza cardiaca"},
           de:{m:"die Herzfrequenz", p:"hèrts-fré-kouènts"},
           ja:{m:"心拍数", p:"shinpakusū"} },
    def:{ fr:"Le chiffre qui décide de tout. Le cheval doit redescendre sous un seuil fixé — souvent 64 battements par minute — pour être autorisé à repartir.",
          en:"The number that decides everything. The horse must come back down below a set threshold — often 64 beats per minute — to be allowed to continue.",
          es:"La cifra que lo decide todo. El caballo debe bajar de un umbral fijado — a menudo 64 pulsaciones por minuto — para estar autorizado a seguir.",
          it:"La cifra che decide tutto. Il cavallo deve scendere sotto una soglia fissata — spesso 64 battiti al minuto — per essere autorizzato a ripartire.",
          de:"Die Zahl, die alles entscheidet. Das Pferd muss unter eine festgelegte Schwelle fallen — oft 64 Schläge pro Minute —, um weiterreiten zu dürfen.",
          ja:"すべてを決める数字。定められた基準 — 多くは毎分64拍 — を下回らなければ、馬は先へ進ませてもらえません。" } },

  { ref:"recuperation", lecon:1, coll:"endurance",
    mots:{ fr:{m:"la récupération"}, en:{m:"the recovery", p:"ri-ka-ve-ri"},
           es:{m:"la recuperación"}, it:{m:"il recupero"},
           de:{m:"die Erholung", p:"èr-hô-loung"}, ja:{m:"回復", p:"kaifuku"} },
    def:{ fr:"Le temps qu'il faut au cheval pour redescendre sous le seuil. ⚠️ Le chrono ne s'arrête pas à la fin de la boucle, comme on l'imagine : il court jusqu'à la présentation au contrôle. Récupérer vite, c'est repartir plus tôt — la récupération est une stratégie, pas une pause.",
          en:"The time the horse takes to come back below the threshold. The clock does not stop at the end of the loop, as you might assume: it runs until you present for inspection. Recovering fast means starting again sooner — recovery is a strategy, not a break.",
          es:"El tiempo que necesita el caballo para bajar del umbral. ⚠️ El cronómetro no se para al final de la vuelta, como se imagina: corre hasta la presentación al control. Recuperar rápido es volver a salir antes — la recuperación es una estrategia, no una pausa.",
          it:"Il tempo che serve al cavallo per scendere sotto la soglia. ⚠️ Il cronometro non si ferma alla fine del giro, come si crede: corre fino alla presentazione al controllo. Recuperare in fretta vuol dire ripartire prima — il recupero è una strategia, non una pausa.",
          de:"Die Zeit, die das Pferd braucht, um unter die Schwelle zu kommen. ⚠️ Die Uhr stoppt nicht am Ende der Schleife, wie man meint: Sie läuft bis zum Vorstellen zur Untersuchung. Schnell erholen heißt früher weiterreiten — Erholung ist Strategie, keine Pause.",
          ja:"基準値まで下がるのにかかる時間。⚠️ 思われているように、時計はループの終わりで止まりません。検査に呈示するまで動き続けます。速く回復することは、早く出発することです。回復は休みではなく、戦略なのです。" } },

  { ref:"refroidir", lecon:1, coll:"endurance",
    mots:{ fr:{m:"refroidir le cheval"}, en:{m:"to cool the horse", p:"koul"},
           es:{m:"refrescar al caballo"}, it:{m:"rinfrescare il cavallo"},
           de:{m:"das Pferd kühlen", p:"ku-leune"}, ja:{m:"馬を冷やす", p:"uma o hiyasu"} },
    def:{ fr:"Verser de l'eau sur l'encolure et les membres dès l'arrivée, sans attendre. C'est le geste qui fait redescendre le cœur, et sous un climat chaud il conditionne tout le reste.",
          en:"Pouring water over the neck and legs the moment you arrive, without waiting. It is the action that brings the heart rate down, and in a hot climate everything else depends on it.",
          es:"Verter agua sobre el cuello y las extremidades nada más llegar, sin esperar. Es el gesto que hace bajar el corazón, y con calor condiciona todo lo demás.",
          it:"Versare acqua su incollatura e arti appena arrivati, senza aspettare. È il gesto che fa scendere il cuore, e col caldo condiziona tutto il resto.",
          de:"Sofort nach Ankunft Wasser über Hals und Beine gießen, ohne zu warten. Dieser Handgriff senkt den Puls — und bei Hitze hängt alles Übrige davon ab.",
          ja:"着いたらすぐ、待たずに首と脚へ水をかけること。心拍を下げるのはこの動作であり、暑い土地では他のすべてがこれにかかっています。" } },

  { ref:"assistance", lecon:1, coll:"endurance",
    /* ⚠️ `ref` gardé ("assistance") pour ne pas casser la progression, mot
       affiché précisé le 17 août 2026 sur la liste de Blandine. */
    mots:{ fr:{m:"l'équipe d'assistance", var:"l'assistance"}, en:{m:"the crew", p:"krou"},
           es:{m:"el equipo de asistencia"}, it:{m:"la squadra di assistenza"},
           de:{m:"die Betreuung", p:"be-troï-oung"}, ja:{m:"サポート", p:"sapōto"} },
    def:{ fr:"L'équipe qui attend au contrôle avec l'eau, les seaux et le ravitaillement. ⚠️ Le plan de production disait « le relais » : il n'y a pas de relais en endurance, personne ne prend la suite. C'est une assistance, pas un relais.",
          en:"The team waiting at the vet gate with water, buckets and food. There is no relay in endurance — nobody takes over. It is a crew, not a relay.",
          es:"El equipo que espera en el control con el agua, los cubos y el avituallamiento. ⚠️ El plan de producción decía « el relevo »: no hay relevo en el raid, nadie toma el testigo. Es una asistencia, no un relevo.",
          it:"La squadra che aspetta al controllo con l'acqua, i secchi e il rifornimento. ⚠️ Il piano di produzione diceva « la staffetta »: non c'è staffetta nell'endurance, nessuno prende il cambio. È un'assistenza, non una staffetta.",
          de:"Das Team, das an der Vetgate mit Wasser, Eimern und Verpflegung wartet. ⚠️ Der Produktionsplan sagte « die Stafette »: Es gibt keine Stafette im Distanzreiten, niemand übernimmt. Es ist eine Crew, kein Wechsel.",
          ja:"水とバケツと補給を持って検査地点で待つチーム。⚠️ 制作プランには「リレー」とありましたが、エンデュランスにリレーはなく、誰も交代しません。これは支援であって、引き継ぎではないのです。" } },

  { ref:"point-assistance", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le point d'assistance"}, en:{m:"the crew point", p:"krou poïnnte"},
           es:{m:"el punto de asistencia"}, it:{m:"il punto di assistenza"},
           /* ⚠️ reconstruction, jamais entendue sur un terrain allemand : là-bas
              l'anglais « crew point » s'emploie souvent tel quel. À confirmer. */
           de:{m:"der Betreuungspunkt", p:"be-troï-oungs-pounnkte"},
           ja:{m:"サポート地点", p:"sapōto chiten"} },
    def:{ fr:"L'endroit du parcours, marqué sur le plan, où l'équipe a le droit d'attendre avec l'eau. Ailleurs, aider est interdit : c'est le lieu qui rend l'assistance légale, pas le geste.",
          en:"The spot on the course, marked on the map, where the crew is allowed to wait with water. Anywhere else, helping is forbidden: it is the place that makes assistance legal, not the act.",
          es:"El punto del recorrido, marcado en el plano, donde el equipo tiene derecho a esperar con el agua. En otro lugar, ayudar está prohibido: es el sitio lo que hace legal la asistencia, no el gesto.",
          it:"Il punto del percorso, segnato sulla piantina, dove la squadra ha diritto di aspettare con l'acqua. Altrove aiutare è vietato: è il luogo che rende lecita l'assistenza, non il gesto.",
          de:"Die auf dem Streckenplan markierte Stelle, an der das Team mit Wasser warten darf. Überall sonst ist Hilfe verboten: Der Ort macht die Betreuung erlaubt, nicht der Handgriff.",
          ja:"コース図に記された、チームが水を持って待つことを許された地点。ほかの場所での援助は禁止です。支援を合法にするのは行為ではなく、場所なのです。" } },

  { ref:"presenter-veterinaire", lecon:1, coll:"endurance",
    mots:{ fr:{m:"présenter au vétérinaire"}, en:{m:"to present to the vet", p:"pri-zènnte"},
           es:{m:"presentar al veterinario"}, it:{m:"presentare al veterinario"},
           de:{m:"dem Tierarzt vorstellen", p:"for-chte-leune"},
           ja:{m:"獣医に呈示する", p:"jūi ni teiji suru" } },
    def:{ fr:"Amener le cheval en main devant le vétérinaire, au moment que l'on choisit. C'est le cavalier qui décide quand il présente, et cette décision est la moitié de la stratégie.",
          en:"Bringing the horse in hand before the vet, at a moment you choose. The rider decides when to present, and that decision is half the strategy.",
          es:"Llevar al caballo de la mano ante el veterinario, en el momento que se elige. El jinete decide cuándo presenta, y esa decisión es la mitad de la estrategia.",
          it:"Portare il cavallo a mano davanti al veterinario, nel momento che si sceglie. È il cavaliere a decidere quando presentare, e quella decisione è metà della strategia.",
          de:"Das Pferd an der Hand vor den Tierarzt führen, im selbst gewählten Moment. Der Reiter entscheidet, wann er vorstellt — und diese Entscheidung ist die halbe Strategie.",
          ja:"自分で選んだ時に、馬を引いて獣医の前へ出すこと。いつ呈示するかを決めるのは騎手であり、その判断が戦略の半分です。" } },

  { ref:"temps-repos-obligatoire", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le temps de repos obligatoire"}, en:{m:"the hold time", p:"hôlde taïme"},
           es:{m:"la parada obligatoria"}, it:{m:"la sosta obbligatoria"},
           /* ⚠️ reconstruction. Sur le terrain, même hors des pays anglophones,
              on entend le plus souvent « le hold » ou « the hold time » tel quel,
              y compris en français. À confirmer. */
           de:{m:"die Pflichtpause", p:"pflikht-paou-ze"},
           ja:{m:"義務休憩", p:"gimu kyūkei"} },
    def:{ fr:"Le repos imposé après chaque contrôle réussi, avant de repartir : quarante minutes au minimum dans la plupart des épreuves. Il est le même pour tout le monde — c'est le temps de récupération, lui, qui se gagne.",
          en:"The rest imposed after each successful inspection, before setting off again: forty minutes at least in most events. It is the same for everyone — the time you can win is the recovery time, not this.",
          es:"El descanso impuesto tras cada control superado, antes de volver a salir: cuarenta minutos como mínimo en la mayoría de las pruebas. Es igual para todos — lo que se gana es el tiempo de recuperación, no éste.",
          it:"Il riposo imposto dopo ogni controllo superato, prima di ripartire: quaranta minuti minimo nella maggior parte delle prove. È uguale per tutti — quello che si guadagna è il tempo di recupero, non questo.",
          de:"Die vorgeschriebene Ruhe nach jeder bestandenen Untersuchung, vor dem Weiterreiten: mindestens vierzig Minuten in den meisten Prüfungen. Sie ist für alle gleich — gewinnen lässt sich die Erholungszeit, nicht diese.",
          ja:"検査を通過してから再出発するまでに課される休憩。多くの競技で最低四十分。これは全員同じです。稼げるのは回復時間のほうで、こちらではありません。" } },

  { ref:"apte-a-continuer", lecon:1, coll:"endurance",
    mots:{ fr:{m:"apte à continuer"}, en:{m:"fit to continue", p:"fitt tou keunn-ti-niou"},
           es:{m:"apto para continuar"}, it:{m:"idoneo a continuare"},
           /* ⚠️ l'allemand emploie très largement l'anglais « fit to continue »
              tel quel, jusque dans les feuilles de notation. À confirmer. */
           de:{m:"fit to continue", p:"fitt tou keunn-ti-niou"},
           ja:{m:"継続可", p:"keizoku ka"} },
    def:{ fr:"Les trois mots que l'on attend au contrôle. Ce n'est pas « en bonne santé » : c'est jugé apte à repartir maintenant, sur ce parcours, par cette chaleur.",
          en:"The three words you wait for at the inspection. It does not mean healthy: it means judged able to go on now, on this course, in this heat.",
          es:"Las tres palabras que se esperan en el control. No significa « sano »: significa juzgado capaz de seguir ahora, en este recorrido, con este calor.",
          it:"Le tre parole che si aspettano al controllo. Non vuol dire « sano »: vuol dire giudicato in grado di ripartire adesso, su questo percorso, con questo caldo.",
          de:"Die drei Wörter, auf die man an der Untersuchung wartet. Es heißt nicht « gesund »: Es heißt für fähig befunden, jetzt weiterzureiten, auf dieser Strecke, bei dieser Hitze.",
          ja:"検査で待ちわびる三語。「健康」という意味ではありません。このコースを、この暑さのなかで、今から進めると判断されたということです。" } },

  { ref:"vitesse-moyenne", lecon:1, coll:"endurance",
    mots:{ fr:{m:"la vitesse moyenne"}, en:{m:"the average speed", p:"a-ve-ridj"},
           es:{m:"la velocidad media"}, it:{m:"la velocità media"},
           de:{m:"die Durchschnittsgeschwindigkeit", p:"dourch-chnitts-gue-chvinn-dikh-kaïte"},
           ja:{m:"平均速度", p:"heikin sokudo"} },
    def:{ fr:"Ce qu'on gère, et non la vitesse de pointe. Elle se calcule sur le temps total, arrêts aux contrôles compris — d'où l'importance de la récupération.",
          en:"What you manage, rather than top speed. It is worked out over the total time, including the halts at the vet gates — hence the importance of recovery.",
          es:"Lo que se gestiona, y no la velocidad punta. Se calcula sobre el tiempo total, paradas en los controles incluidas — de ahí la importancia de la recuperación.",
          it:"Ciò che si gestisce, e non la velocità di punta. Si calcola sul tempo totale, soste ai controlli comprese — da cui l'importanza del recupero.",
          de:"Was man managt — nicht die Spitzengeschwindigkeit. Berechnet über die Gesamtzeit, Halte an den Vetgates inklusive: daher das Gewicht der Erholung.",
          ja:"管理すべきは最高速度ではなくこちら。検査での停止時間も含めた総時間で計算されます — 回復が大事な理由も、そこにあります。" } },

  { ref:"abandon", lecon:1, coll:"endurance",
    mots:{ fr:{m:"l'abandon"}, en:{m:"to retire", p:"ri-taï-eur"},
           es:{m:"la retirada"}, it:{m:"il ritiro"},
           /* ⚠️ ALIGNE SUR hype-lingo-lex-obstacle.js le 6 aout 2026 : cette
              entree porte le meme `ref` que celle du chapitre obstacle, donc
              c'est un RAPPEL et les mots doivent etre identiques. J'avais
              ecrit « der Aufgabe », qui est en plus faux — Aufgabe est
              feminin, et la forme juste est le verbe substantive neutre
              « das Aufgeben », deja utilisee dans l'autre fichier. */
           de:{m:"das Aufgeben", p:"aouf-gué-beune"},
           /* ⚠️ le japonais aussi doit correspondre a l'entree du chapitre
              obstacle : 棄権 (kiken), et non リタイア. Meme `ref` = memes mots,
              sinon l'exercice teste une traduction que le joueur n'a jamais
              vue. Trouve par le controle automatique, langue par langue. */
           ja:{m:"棄権", p:"kiken"} },
    def:{ fr:"Arrêter avant la fin. ⚠️ En endurance ce n'est pas un échec mais une décision de soin, et la culture de la discipline le respecte. L'anglais distingue « to retire », choisi par le cavalier, de « to be eliminated », décidé par le jury.",
          en:"Stopping before the end. In endurance this is not a failure but a care decision, and the sport's culture respects it. English separates « to retire », the rider's choice, from « to be eliminated », the jury's.",
          es:"Parar antes del final. ⚠️ En el raid no es un fracaso sino una decisión de cuidado, y la cultura de la disciplina lo respeta. El inglés distingue « to retire », elegido por el jinete, de « to be eliminated », decidido por el jurado.",
          it:"Fermarsi prima della fine. ⚠️ Nell'endurance non è un fallimento ma una decisione di cura, e la cultura della disciplina lo rispetta. L'inglese distingue « to retire », scelto dal cavaliere, da « to be eliminated », deciso dalla giuria.",
          de:"Vor dem Ende anhalten. ⚠️ Im Distanzsport ist das kein Scheitern, sondern eine Fürsorge-Entscheidung — und die Kultur der Disziplin achtet sie. Das Englische trennt « to retire », vom Reiter gewählt, von « to be eliminated », von der Jury verhängt.",
          ja:"終わりを待たずにやめること。⚠️ エンデュランスでは失敗ではなく、馬をいたわる決断であり、この競技の文化はそれを敬います。英語は騎手が選ぶ « to retire » と、審査団が下す « to be eliminated » を区別します。" } },

  { ref:"elimine-boiterie", lecon:1, coll:"endurance",
    mots:{ fr:{m:"éliminé pour boiterie"}, en:{m:"eliminated for lameness", p:"lèïm-nèss"},
           es:{m:"eliminado por cojera"}, it:{m:"eliminato per zoppia"},
           de:{m:"wegen Lahmheit ausgeschlossen", p:"la-hmm-haïte"},
           ja:{m:"歩様不良で失格", p:"hoyō furyō de shikkaku"} },
    def:{ fr:"La sortie la plus fréquente. Le vétérinaire fait trotter le cheval en main sur quelques mètres : s'il n'est pas régulier, la course s'arrête là, sans discussion.",
          en:"The most common way out. The vet has the horse trotted up in hand for a few metres: if it is not level, the ride ends there, without discussion.",
          es:"La salida más frecuente. El veterinario hace trotar al caballo de la mano unos metros: si no va regular, la carrera termina ahí, sin discusión.",
          it:"L'uscita più frequente. Il veterinario fa trottare il cavallo a mano per qualche metro: se non è regolare, la corsa finisce lì, senza discussione.",
          de:"Der häufigste Ausgang. Der Tierarzt lässt das Pferd ein paar Meter an der Hand vortraben: Geht es nicht klar, endet der Ritt dort — ohne Diskussion.",
          ja:"いちばん多い終わり方。獣医が馬を引いて数メートル速歩させ、歩様が揃っていなければ、そこで競技は終わりです。議論の余地なく。" } },

  { ref:"ftq", lecon:1, coll:"endurance",
    mots:{ fr:{m:"FTQ"}, en:{m:"failed to qualify", p:"èff-ti-kiou"},
           es:{m:"FTQ"}, it:{m:"FTQ"},
           de:{m:"FTQ", p:"èff-té-kou"}, ja:{m:"FTQ", p:"efu tī kyū"} },
    def:{ fr:"Le code du règlement, écrit tel quel sur les résultats dans tous les pays : le cheval n'a pas passé un contrôle. C'est le mot générique — la boiterie n'en est qu'une des causes, à côté du cœur et du métabolisme.",
          en:"The rulebook code, written as is on results sheets in every country: the horse did not pass an inspection. It is the generic term — lameness is only one cause, alongside heart rate and metabolic issues.",
          es:"El código del reglamento, escrito tal cual en los resultados en todos los países: el caballo no pasó un control. Es el término genérico — la cojera es sólo una de las causas, junto al corazón y al metabolismo.",
          it:"Il codice del regolamento, scritto così com'è sui risultati in tutti i paesi: il cavallo non ha superato un controllo. È il termine generico — la zoppia è solo una delle cause, insieme al cuore e al metabolismo.",
          de:"Der Code aus dem Reglement, in jedem Land so auf den Ergebnislisten: Das Pferd hat eine Untersuchung nicht bestanden. Der Oberbegriff — Lahmheit ist nur eine Ursache, neben Herzfrequenz und Stoffwechsel.",
          ja:"規則の略号。どの国でも結果表にこのまま書かれます。馬が検査を通らなかったという意味です。総称であり、歩様不良はその原因の一つ。心拍や代謝も同じ欄に入ります。" } }

  ],

  phrases: [

  { ref:"ph-endurance-cardiaque", lecon:1,
      fr:"Il est descendu à combien ?",
      en:"What did he come down to ?",
      es:"¿ A cuánto bajó ?",
      it:"A quanto è sceso ?",
      de:"Auf wie viel ist er runter ?",
      ja:"心拍 は いくつ です か ?" },

  { ref:"ph-endurance-boucle", lecon:1,
      fr:"Il reste combien de kilomètres ?",
      en:"How many kilometres are left ?",
      es:"¿ Cuántos kilómetros quedan ?",
      it:"Quanti chilometri restano ?",
      de:"Wie viele Kilometer bleiben ?",
      ja:"あと 何 キロ 残っ て い ます か ?" },

  { ref:"ph-endurance-eau", lecon:1,
      fr:"De l'eau, il faut le refroidir !",
      en:"Water — he needs cooling now !",
      es:"¡ Agua, hay que refrescarlo !",
      it:"Acqua, bisogna rinfrescarlo !",
      de:"Wasser — er muss gekühlt werden !",
      ja:"水 を ! すぐ 冷やし ます。" },

  { ref:"ph-endurance-abandon", lecon:1,
      fr:"Je préfère abandonner, il n'est pas régulier.",
      en:"I would rather retire, he is not level.",
      es:"Prefiero retirarme, no está regular.",
      it:"Preferisco ritirarmi, non è regolare.",
      de:"Ich gebe lieber auf, er geht nicht klar.",
      ja:"棄権 し ます。 歩様 が 揃っ て い ませ ん。" },

  /* ================================================================
     LES DIX-HUIT PHRASES DE BLANDINE — 17 août 2026.
     Le français et l'anglais sont ses mots, repris sans y toucher.
     L'espagnol, l'italien, l'allemand et le japonais sont de moi.
     Japonais espacé par groupes : `attendue.split(" ")` en fait les
     tuiles. Les virgules japonaises 、 sont collées au groupe qui
     précède, sinon elles deviennent une tuile toute seule.
     Les quatre phrases au-dessus sont gardées : deux ressemblent
     à celles-ci (les kilomètres restants, l'eau) mais aucune n'est
     un doublon, l'une est une question et l'autre une affirmation.
     À retirer d'un mot si tu préfères.
     ================================================================ */

  { ref:"ph-endurance-160km", lecon:1,
      fr:"La course fait cent soixante kilomètres et elle est divisée en plusieurs boucles.",
      en:"The ride is one hundred and sixty kilometres long and is divided into several loops.",
      es:"La carrera es de ciento sesenta kilómetros y está dividida en varias vueltas.",
      it:"La gara è di centosessanta chilometri ed è divisa in più giri.",
      de:"Der Ritt geht über hundertsechzig Kilometer und ist in mehrere Schleifen geteilt.",
      ja:"レース は 百六十キロ で、 複数の ループ に 分かれています。" },

  { ref:"ph-endurance-depart", lecon:1,
      fr:"Ne pars pas trop vite, la journée va être très longue.",
      en:"Don't start too fast; it's going to be a very long day.",
      es:"No salgas demasiado rápido, el día va a ser muy largo.",
      it:"Non partire troppo veloce, la giornata sarà molto lunga.",
      de:"Reite nicht zu schnell los, der Tag wird sehr lang.",
      ja:"最初から 飛ばさないで。 今日は とても 長い 一日 に なります。" },

  { ref:"ph-endurance-rythme", lecon:1,
      fr:"Trouve un rythme régulier que ton cheval peut maintenir sans se fatiguer.",
      en:"Find a steady pace that your horse can maintain without getting tired.",
      es:"Busca un ritmo regular que tu caballo pueda mantener sin cansarse.",
      it:"Trova un ritmo regolare che il tuo cavallo possa mantenere senza affaticarsi.",
      de:"Finde ein gleichmäßiges Tempo, das dein Pferd halten kann, ohne zu ermüden.",
      ja:"馬が 疲れずに 続けられる 一定の ペース を 見つけて ください。" },

  { ref:"ph-endurance-crewpoint", lecon:1,
      fr:"Nous arrivons au point d'assistance, préparez l'eau pour le refroidir.",
      en:"We're coming into the crew point; get the water ready to cool him down.",
      es:"Llegamos al punto de asistencia, preparad el agua para refrescarlo.",
      it:"Stiamo arrivando al punto di assistenza, preparate l'acqua per rinfrescarlo.",
      de:"Wir kommen zum Betreuungspunkt, macht das Wasser bereit, um ihn zu kühlen.",
      ja:"サポート地点 に 入ります。 冷やす ため の 水 を 用意して ください。" },

  { ref:"ph-endurance-boire", lecon:1,
      fr:"Fais-le boire dès qu'il en a envie, surtout avec cette chaleur.",
      en:"Let him drink whenever he wants to, especially in this heat.",
      es:"Déjalo beber cuando quiera, sobre todo con este calor.",
      it:"Fallo bere ogni volta che ne ha voglia, soprattutto con questo caldo.",
      de:"Lass ihn trinken, wann er will, besonders bei dieser Hitze.",
      ja:"飲みたがったら いつでも 飲ませて ください。 この 暑さ です から。" },

  { ref:"ph-endurance-restekm", lecon:1,
      fr:"Il reste encore vingt kilomètres avant la fin de cette boucle.",
      en:"There are still twenty kilometres to go before the end of this loop.",
      es:"Todavía quedan veinte kilómetros antes del final de esta vuelta.",
      it:"Restano ancora venti chilometri prima della fine di questo giro.",
      de:"Es bleiben noch zwanzig Kilometer bis zum Ende dieser Schleife.",
      ja:"この ループ の 終わり まで あと 二十キロ あります。" },

  { ref:"ph-endurance-sable", lecon:1,
      fr:"Ralentis dans le sable profond pour économiser ses membres.",
      en:"Slow down in the deep sand to save his legs.",
      es:"Reduce el ritmo en la arena profunda para cuidar sus miembros.",
      it:"Rallenta nella sabbia profonda per risparmiare i suoi arti.",
      de:"Werde im Tiefsand langsamer, um seine Beine zu schonen.",
      ja:"深い砂 では ペース を 落として 脚 を 守って ください。" },

  { ref:"ph-endurance-fc-descendre", lecon:1,
      fr:"Sa fréquence cardiaque doit redescendre avant de pouvoir entrer au Vet Gate.",
      en:"His heart rate needs to come down before we can enter the Vet Gate.",
      es:"Su frecuencia cardíaca tiene que bajar antes de poder entrar al Vet Gate.",
      it:"La sua frequenza cardiaca deve scendere prima di poter entrare al Vet Gate.",
      de:"Seine Herzfrequenz muss sinken, bevor wir in die Vetgate dürfen.",
      ja:"ベットゲート に 入る 前 に 心拍数 を 下げなければ なりません。" },

  { ref:"ph-endurance-recupere-vite", lecon:1,
      fr:"Il récupère très vite, nous pouvons le présenter au vétérinaire maintenant.",
      en:"He's recovering very quickly; we can present him to the vet now.",
      es:"Recupera muy rápido, podemos presentarlo al veterinario ahora.",
      it:"Recupera molto in fretta, possiamo presentarlo al veterinario adesso.",
      de:"Er erholt sich sehr schnell, wir können ihn jetzt dem Tierarzt vorstellen.",
      ja:"回復 が とても 速い です。 今 獣医 に 呈示 できます。" },

  { ref:"ph-endurance-controle-quoi", lecon:1,
      fr:"Le vétérinaire va contrôler son cœur, son état général et ses allures.",
      en:"The vet will check his heart rate, general condition and gait.",
      es:"El veterinario va a controlar su corazón, su estado general y sus aires.",
      it:"Il veterinario controllerà il cuore, lo stato generale e le andature.",
      de:"Der Tierarzt prüft Herzfrequenz, Allgemeinzustand und Gänge.",
      ja:"獣医 が 心拍 と 全身の状態 と 歩様 を 調べます。" },

  { ref:"ph-endurance-trotter", lecon:1,
      fr:"Fais-le trotter en ligne droite pour le contrôle vétérinaire.",
      en:"Trot him in a straight line for the veterinary inspection.",
      es:"Hazlo trotar en línea recta para el control veterinario.",
      it:"Fallo trottare in linea retta per il controllo veterinario.",
      de:"Lass ihn für die Verfassungsprüfung geradeaus vortraben.",
      ja:"検査 の ため に 直線 で 速歩 を させて ください。" },

  { ref:"ph-endurance-apte", lecon:1,
      fr:"Le cheval est déclaré apte à continuer la course.",
      en:"The horse has been declared fit to continue.",
      es:"El caballo es declarado apto para continuar la carrera.",
      it:"Il cavallo è dichiarato idoneo a continuare la gara.",
      de:"Das Pferd darf weiterreiten — es ist fit to continue.",
      ja:"馬 は 継続可 と 判定 されました。" },

  { ref:"ph-endurance-hold", lecon:1,
      fr:"Nous avons un temps de repos obligatoire avant de repartir.",
      en:"We have a mandatory hold time before we can start again.",
      es:"Tenemos una parada obligatoria antes de volver a salir.",
      it:"Abbiamo una sosta obbligatoria prima di ripartire.",
      de:"Wir haben eine Pflichtpause, bevor wir wieder losreiten.",
      ja:"出発 の 前 に 義務休憩 が あります。" },

  { ref:"ph-endurance-pause-boire", lecon:1,
      fr:"Profite de la pause pour le faire boire et manger un peu.",
      en:"Use the break to let him drink and eat a little.",
      es:"Aprovecha la parada para que beba y coma un poco.",
      it:"Approfitta della sosta per farlo bere e mangiare un po'.",
      de:"Nutze die Pause, um ihn trinken und etwas fressen zu lassen.",
      ja:"休憩の間 に 水 と 餌 を 少し あげて ください。" },

  { ref:"ph-endurance-bien-place", lecon:1,
      fr:"Nous sommes bien placés, mais il ne faut pas accélérer trop tôt.",
      en:"We're in a good position, but we mustn't speed up too early.",
      es:"Vamos bien colocados, pero no hay que acelerar demasiado pronto.",
      it:"Siamo ben piazzati, ma non bisogna accelerare troppo presto.",
      de:"Wir liegen gut, aber wir dürfen nicht zu früh zulegen.",
      ja:"順位 は 良い です が、 早すぎる 加速 は いけません。" },

  { ref:"ph-endurance-derniere-boucle", lecon:1,
      fr:"Sur la dernière boucle, nous pourrons augmenter progressivement l'allure s'il se sent bien.",
      en:"On the final loop, we can gradually increase the pace if he feels good.",
      es:"En la última vuelta podremos aumentar el ritmo poco a poco si se siente bien.",
      it:"Nell'ultimo giro potremo aumentare gradualmente il ritmo se sta bene.",
      de:"Auf der letzten Schleife können wir das Tempo langsam steigern, wenn er sich gut anfühlt.",
      ja:"最後の ループ で 調子 が 良ければ 少しずつ ペース を 上げられます。" },

  { ref:"ph-endurance-controle-final", lecon:1,
      fr:"Il faut encore passer le contrôle vétérinaire final pour être classé.",
      en:"We still have to pass the final veterinary inspection to be classified.",
      es:"Todavía hay que pasar el control veterinario final para ser clasificado.",
      it:"Bisogna ancora superare il controllo veterinario finale per essere classificati.",
      de:"Wir müssen noch die Schlussuntersuchung bestehen, um platziert zu werden.",
      ja:"完走 と 認められる に は 最終検査 に 合格 しなければ なりません。" },

  { ref:"ph-endurance-termine", lecon:1,
      fr:"Nous avons terminé les cent soixante kilomètres et le cheval est en parfaite condition.",
      en:"We've completed the one hundred and sixty kilometres and the horse is in excellent condition.",
      es:"Hemos terminado los ciento sesenta kilómetros y el caballo está en perfecto estado.",
      it:"Abbiamo finito i centosessanta chilometri e il cavallo è in perfette condizioni.",
      de:"Wir haben die hundertsechzig Kilometer geschafft und das Pferd ist in bester Verfassung.",
      ja:"百六十キロ を 走りきり、 馬 は 完璧な 状態 です。" }

  ]
};
