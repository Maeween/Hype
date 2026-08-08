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
   gardé, le mot est corrigé. À valider par Blandine.

   ⚠️ AUCUN RAPPEL DANS CE FICHIER. « la boiterie » et « le vétérinaire »
   auraient dû en être, mais `hype-lingo-lex-urgences.js` n'a pas été
   fourni dans cette conversation : impossible de vérifier leurs `ref`, et
   un `ref` inventé créerait un doublon au lieu d'un rappel. À ajouter plus
   tard, une fois le fichier sous les yeux.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif. Les plus à
   confirmer : `le contrôle vétérinaire` (l'anglais dit « the vet gate »,
   qui désigne le lieu autant que l'examen), `la récupération` (« the
   recovery », mesurée en minutes pour redescendre sous un seuil de
   battements), et `l'abandon` (l'anglais distingue « to retire », choisi
   par le cavalier, de « to be eliminated », décidé par le jury).
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

  { ref:"controle-veterinaire", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le contrôle vétérinaire"}, en:{m:"the vet gate", p:"vètt guéïte"},
           es:{m:"el control veterinario"}, it:{m:"il controllo veterinario"},
           de:{m:"die Vetgate", p:"vètt-guéïte", var:"die Verfassungsprüfung"},
           ja:{m:"獣医検査", p:"jūi kensa"} },
    def:{ fr:"L'examen obligatoire après chaque boucle : cœur, allures, hydratation, dos. ⚠️ « The vet gate » désigne le lieu autant que l'examen — on dit « at the vet gate », pas « during ».",
          en:"The compulsory examination after each loop: heart, gaits, hydration, back. « The vet gate » is the place as much as the check — you say « at the vet gate », not « during ».",
          es:"El examen obligatorio tras cada vuelta: corazón, aires, hidratación, dorso. ⚠️ « The vet gate » designa el lugar tanto como el examen — se dice « at the vet gate », no « during ».",
          it:"L'esame obbligatorio dopo ogni giro: cuore, andature, idratazione, dorso. ⚠️ « The vet gate » indica il luogo quanto l'esame — si dice « at the vet gate », non « during ».",
          de:"Die Pflichtuntersuchung nach jeder Schleife: Herz, Gänge, Hydrierung, Rücken. ⚠️ « The vet gate » meint den Ort ebenso wie die Prüfung — man sagt « at the vet gate », nicht « during ».",
          ja:"ループごとに義務づけられた検査。心臓、歩様、水分、背中。⚠️ « the vet gate » は検査であると同時に場所の名でもあり、« at the vet gate » と言います。« during » ではなく。" } },

  { ref:"rythme-cardiaque", lecon:1, coll:"endurance",
    mots:{ fr:{m:"le rythme cardiaque"}, en:{m:"the heart rate", p:"harte réïte"},
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
    def:{ fr:"Le temps qu'il faut au cheval pour redescendre sous le seuil. Il compte dans le classement : arriver premier ne sert à rien si l'on met vingt minutes à récupérer.",
          en:"The time the horse takes to come back below the threshold. It counts in the placings: arriving first is worth nothing if recovery takes twenty minutes.",
          es:"El tiempo que necesita el caballo para bajar del umbral. Cuenta en la clasificación: llegar primero no sirve de nada si se tarda veinte minutos en recuperar.",
          it:"Il tempo che serve al cavallo per scendere sotto la soglia. Conta in classifica: arrivare primi non serve a nulla se il recupero prende venti minuti.",
          de:"Die Zeit, die das Pferd braucht, um unter die Schwelle zu kommen. Sie zählt für die Platzierung: Als Erster anzukommen nützt nichts, wenn die Erholung zwanzig Minuten dauert.",
          ja:"基準値まで下がるのにかかる時間。これが順位に響きます。回復に二十分かかるなら、一着で戻っても意味がないのです。" } },

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
    mots:{ fr:{m:"l'assistance"}, en:{m:"the crew", p:"krou"},
           es:{m:"la asistencia"}, it:{m:"l'assistenza"},
           de:{m:"die Betreuung", p:"be-troï-oung"}, ja:{m:"サポート", p:"sapōto"} },
    def:{ fr:"L'équipe qui attend au contrôle avec l'eau, les seaux et le ravitaillement. ⚠️ Le plan de production disait « le relais » : il n'y a pas de relais en endurance, personne ne prend la suite. C'est une assistance, pas un relais.",
          en:"The team waiting at the vet gate with water, buckets and food. There is no relay in endurance — nobody takes over. It is a crew, not a relay.",
          es:"El equipo que espera en el control con el agua, los cubos y el avituallamiento. ⚠️ El plan de producción decía « el relevo »: no hay relevo en el raid, nadie toma el testigo. Es una asistencia, no un relevo.",
          it:"La squadra che aspetta al controllo con l'acqua, i secchi e il rifornimento. ⚠️ Il piano di produzione diceva « la staffetta »: non c'è staffetta nell'endurance, nessuno prende il cambio. È un'assistenza, non una staffetta.",
          de:"Das Team, das an der Vetgate mit Wasser, Eimern und Verpflegung wartet. ⚠️ Der Produktionsplan sagte « die Stafette »: Es gibt keine Stafette im Distanzreiten, niemand übernimmt. Es ist eine Crew, kein Wechsel.",
          ja:"水とバケツと補給を持って検査地点で待つチーム。⚠️ 制作プランには「リレー」とありましたが、エンデュランスにリレーはなく、誰も交代しません。これは支援であって、引き継ぎではないのです。" } },

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
          ja:"いちばん多い終わり方。獣医が馬を引いて数メートル速歩させ、歩様が揃っていなければ、そこで競技は終わりです。議論の余地なく。" } }

  ],

  phrases: [

  { ref:"ph-endurance-cardiaque", lecon:1,
      fr:"Il est descendu à combien au contrôle ?",
      en:"What did his heart rate come down to at the vet gate ?",
      es:"¿ A cuánto bajó en el control ?",
      it:"A quanto è sceso al controllo ?",
      de:"Auf wie viel ist er an der Vetgate gefallen ?",
      ja:"獣医 検査 で 心拍数 は いくつ まで 下がり まし た か ?" },

  { ref:"ph-endurance-boucle", lecon:1,
      fr:"Il reste combien de kilomètres sur cette boucle ?",
      en:"How many kilometres are left on this loop ?",
      es:"¿ Cuántos kilómetros quedan en esta vuelta ?",
      it:"Quanti chilometri restano su questo giro ?",
      de:"Wie viele Kilometer bleiben auf dieser Schleife ?",
      ja:"この ループ は あと 何 キロ 残っ て い ます か ?" },

  { ref:"ph-endurance-eau", lecon:1,
      fr:"Apporte-moi de l'eau, il faut le refroidir tout de suite.",
      en:"Bring me water, he needs cooling right now.",
      es:"Tráeme agua, hay que refrescarlo ahora mismo.",
      it:"Portami dell'acqua, bisogna rinfrescarlo subito.",
      de:"Bring mir Wasser, er muss sofort gekühlt werden.",
      ja:"水 を 持っ て き て。 すぐ に 冷やさ ない と いけ ませ ん。" },

  { ref:"ph-endurance-abandon", lecon:1,
      fr:"Je préfère abandonner, il n'est pas régulier.",
      en:"I would rather retire, he is not level.",
      es:"Prefiero retirarme, no está regular.",
      it:"Preferisco ritirarmi, non è regolare.",
      de:"Ich gebe lieber auf, er geht nicht klar.",
      ja:"棄権 し ます。 歩様 が 揃っ て い ませ ん。" }

  ]
};
